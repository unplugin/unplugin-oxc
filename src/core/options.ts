import type { MinifyOptions } from 'oxc-minify'
import type { NapiResolveOptions } from 'oxc-resolver'
import type { TransformOptions } from 'oxc-transform'
import type { FilterPattern } from 'unplugin-utils'

export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
  enforce?: 'pre' | 'post' | undefined
  transform?: Omit<TransformOptions, 'sourcemap'> | false
  resolve?: NapiResolveOptions | false
  resolveNodeModules?: boolean
  minify?: Omit<MinifyOptions, 'sourcemap'> | false
  sourcemap?: boolean
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type OptionsResolved = Overwrite<
  Required<Options>,
  Pick<Options, 'enforce'>
>

export function resolveOptions(options: Options): OptionsResolved {
  return {
    include: options.include || [/\.[cm]?[jt]sx?$/],
    exclude: options.exclude || [/node_modules/],
    enforce: 'enforce' in options ? options.enforce : 'pre',
    transform: options.transform || {},
    resolve: options.resolve || {},
    resolveNodeModules: options.resolveNodeModules || false,
    minify: options.minify || false,
    sourcemap: options.sourcemap || false,
  }
}
