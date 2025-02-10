import path from 'node:path'
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

      async resolveId(id, importer) {
        if (!importer) return
        const resolver = new ResolverFactory({
          extensions: ['.ts', '.mts', '.cts', '.tsx'],
          ...options.resolve,
        })
        const directory = path.dirname(importer)
        const resolved = await resolver.async(directory, id)

        if (resolved.path) return resolved.path
      },

      transformInclude(id) {
        return filter(id)
      },

      transform(code, id) {
        const result = transform(id, code, options.transform)

        return {
          code: result.code,
          map: result.map,
        }
      },
    }
  },
)
