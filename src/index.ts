import path from 'node:path'
import remapping from '@ampproject/remapping'
import { minify } from 'oxc-minify'
import { ResolverFactory } from 'oxc-resolver'
import { transform } from 'oxc-transform'
import { createUnplugin, type UnpluginInstance } from 'unplugin'
import { createFilter } from 'unplugin-utils'
import { resolveOptions, type Options } from './core/options'

export const Oxc: UnpluginInstance<Options | undefined, false> = createUnplugin(
  (rawOptions = {}) => {
    const options = resolveOptions(rawOptions)
    const filter = createFilter(options.include, options.exclude)

    const name = 'unplugin-oxc'
    return {
      name,
      enforce: options.enforce,

      resolveId:
        options.resolve !== false
          ? async (id, importer) => {
              if (!importer) return
              if (!options.resolveNodeModules && id[0] !== '.' && id[0] !== '/')
                return

              const resolver = new ResolverFactory({
                extensions: ['.ts', '.mts', '.cts', '.tsx'],
                ...options.resolve,
              })
              const directory = path.dirname(importer)
              const resolved = await resolver.async(directory, id)

              if (resolved.path) return resolved.path
            }
          : undefined,

      transformInclude(id) {
        return filter(id)
      },

      transform:
        options.transform !== false || options.minify !== false
          ? (code, id) => {
              let map
              if (options.transform !== false) {
                const result = transform(id, code, {
                  ...options.transform,
                  sourcemap: options.sourcemap,
                })
                code = result.code
                map = result.map
              }

              if (options.minify !== false) {
                const result = minify(id, code, {
                  ...options.minify,
                  sourcemap: options.sourcemap,
                })
                code = result.code
                if (map && result.map) {
                  map = remapping([result.map, map], () => null, {})
                } else {
                  map = result.map
                }
              }

              return { code, map }
            }
          : undefined,
    }
  },
)
