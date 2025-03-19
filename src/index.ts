import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { ResolverFactory } from 'oxc-resolver'
import { transform } from 'oxc-transform'
import { createUnplugin, type UnpluginInstance } from 'unplugin'
import { createFilter } from 'unplugin-utils'
import { resolveOptions, type Options } from './core/options'
import { getModuleFormat } from './core/utils'
import type { RenderedChunk } from 'rollup'

export const Oxc: UnpluginInstance<Options | undefined, false> = createUnplugin(
  (rawOptions = {}, { framework }) => {
    const options = resolveOptions(rawOptions, framework)
    const filter = createFilter(options.include, options.exclude)

    const renderChunk: any =
      options.minify !== false
        ? async (code: string, chunk: RenderedChunk) => {
            const { minify } = await import('oxc-minify')
            const result = minify(chunk.fileName, code, {
              ...(options.minify === true ? {} : options.minify),
              sourcemap: options.sourcemap,
            })
            return {
              code: result.code,
              map: result.map,
            }
          }
        : undefined

    return {
      name: 'unplugin-oxc',
      enforce: options.enforce,

      resolveId:
        options.resolve !== false
          ? (id, importer, resolveOptions: any) => {
              if (!options.resolveNodeModules && id[0] !== '.' && id[0] !== '/')
                return

              const resolver = new ResolverFactory({
                extensions: [
                  '.mjs',
                  '.js',
                  '.ts',
                  '.jsx',
                  '.tsx',
                  '.json',
                  '.node',
                ],
                conditionNames: resolveOptions?.conditions
                  ? Array.from(resolveOptions.conditions)
                  : ['import', 'require', 'browser', 'node', 'default'],
                builtinModules: true,
                ...options.resolve,
              })
              const directory = importer
                ? path.dirname(importer)
                : process.cwd()
              const resolved = resolver.sync(directory, id)
              if (resolved.error?.startsWith('Builtin module')) {
                return {
                  id,
                  external: true,
                  moduleSideEffects: false,
                }
              }

              if (resolved.path) {
                return {
                  id: resolved.path,
                  format: getModuleFormat(resolved.path, resolved.moduleType),
                }
              }
            }
          : undefined,

      transformInclude(id) {
        return filter(id)
      },

      transform:
        options.transform !== false
          ? (code: string, id: string, ...args: any[]) => {
              const [transformOptions] = args
              const format: 'module' | 'commonjs' =
                transformOptions?.format || getModuleFormat(id, 'commonjs')
              const result = transform(id, code, {
                ...options.transform,
                sourceType: format === 'module' ? 'module' : 'script',
                sourcemap: options.sourcemap,
              })
              if (result.errors.length)
                throw new SyntaxError(
                  result.errors.map((error) => error.message).join('\n'),
                )
              return { code: result.code, map: result.map }
            }
          : undefined,

      rollup: { renderChunk },
      rolldown: { renderChunk },
      vite: { renderChunk },
      unloader: {
        options(config) {
          config.sourcemap ||= options.sourcemap
        },
        load(id) {
          if (!filter(id)) return
          const contents = readFileSync(id, 'utf8')
          return contents
        },
      },
    }
  },
)
