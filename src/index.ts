import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { toArray } from '@antfu/utils'
import { ResolverFactory } from 'oxc-resolver'
import { transformSync as oxcTransformSync } from 'oxc-transform'
import { createUnplugin, type UnpluginInstance } from 'unplugin'
import { resolveOptions, type Options } from './core/options'
import { getModuleFormat } from './core/utils'
import type { RenderedChunk } from 'rollup'
import type { Plugin as UnloaderPlugin } from 'unloader'

export const Oxc: UnpluginInstance<Options | undefined, false> = createUnplugin(
  (rawOptions = {}, { framework }) => {
    const options = resolveOptions(rawOptions, framework)

    const resolveId =
      options.resolve === false
        ? undefined
        : (id: string, importer?: string, resolveOptions?: any) => {
            if (
              !options.resolveNodeModules &&
              id[0] !== '.' &&
              !path.isAbsolute(id)
            )
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
              moduleType: true,
              ...options.resolve,
            })
            const directory = importer ? path.dirname(importer) : process.cwd()
            const resolved = resolver.sync(directory, id)
            if (resolved.error?.startsWith('Builtin module')) {
              return {
                id,
                external: true,
                moduleSideEffects: false,
              }
            }

            if (resolved.path) {
              const format =
                getModuleFormat(resolved.path) ||
                resolved.moduleType ||
                'commonjs'
              return {
                id: resolved.path,
                format,
              }
            }
          }

    const transform =
      options.transform === false
        ? undefined
        : (code: string, id: string, ...args: any[]) => {
            const [transformOptions] = args
            const result = oxcTransformSync(id, code, {
              ...options.transform,
              sourceType: guessSourceType(id, transformOptions?.format),
              sourcemap: options.sourcemap,
            })

            if (result.errors.length) {
              throw new SyntaxError(
                result.errors.map((error) => error.message).join('\n'),
              )
            }
            return { code: result.code, map: result.map }
          }

    const renderChunk: any =
      options.minify === false
        ? undefined
        : async (code: string, chunk: RenderedChunk) => {
            const { minify } = await import('oxc-minify')
            const result = await minify(chunk.fileName, code, {
              ...(options.minify === true ? {} : options.minify),
              sourcemap: options.sourcemap,
            })
            return {
              code: result.code,
              map: result.map,
            }
          }

    const unloader: Partial<UnloaderPlugin> = {
      options(config) {
        config.sourcemap ||= options.sourcemap
      },
      load: {
        filter: {
          id: {
            include: [/\.json$/, ...toArray(options.include)],
            exclude: options.exclude,
          },
        },
        handler(id) {
          if (id.endsWith('.json')) {
            let code = readFileSync(id, 'utf8')

            const json = JSON.parse(code)
            code = `const json = ${code}\nexport default json\n`
            const i = 0
            for (const key of Object.keys(json)) {
              const sanitizedKey = `_${key.replaceAll(/\W/g, '_')}${i}`
              code +=
                `\nconst ${sanitizedKey} = json[${JSON.stringify(key)}]\n` +
                `export { ${sanitizedKey} as ${JSON.stringify(key)} }\n`
            }
            return { code, format: 'module' }
          }

          const contents = readFileSync(id, 'utf8')
          return contents
        },
      },
    }

    return {
      name: 'unplugin-oxc',
      enforce: options.enforce,

      resolveId,
      transform: transform
        ? {
            filter: {
              id: { include: options.include, exclude: options.exclude },
            },
            handler: transform,
          }
        : undefined,

      rollup: { renderChunk },
      rolldown: { renderChunk },
      vite: { renderChunk },
      unloader,
    }
  },
)

function guessSourceType(
  id: string,
  format?: string,
): 'module' | 'script' | undefined {
  if (format === 'module' || format === 'module-typescript') {
    return 'module'
  } else if (format === 'commonjs' || format === 'commonjs-typescript') {
    return 'script'
  }
  const moduleFormat = getModuleFormat(id)
  if (moduleFormat) return moduleFormat === 'module' ? 'module' : 'script'
}
