import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { ResolverFactory } from 'oxc-resolver'
import { transform } from 'oxc-transform'
import { createUnplugin, type UnpluginInstance } from 'unplugin'
import { createFilter } from 'unplugin-utils'
import { resolveOptions, type Options } from './core/options'
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
          ? async (id, importer) => {
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
                conditionNames: [
                  'import',
                  'require',
                  'browser',
                  'node',
                  'default',
                ],
                builtinModules: true,
                ...options.resolve,
              })
              const directory = importer
                ? path.dirname(importer)
                : process.cwd()
              const resolved = await resolver.async(directory, id)
              if (resolved.error?.startsWith('Builtin module')) {
                return { id, external: true }
              }

              if (resolved.path) return resolved.path
            }
          : undefined,

      transformInclude(id) {
        return filter(id)
      },

      transform:
        options.transform !== false
          ? (code, id) => {
              const result = transform(id, code, {
                ...options.transform,
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
        async load(id) {
          if (!filter(id)) return
          const contents = await readFile(id, 'utf8')
          return contents
        },
      },
    }
  },
)
