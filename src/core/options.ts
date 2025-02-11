import type { MinifyOptions } from 'oxc-minify'
import type { NapiResolveOptions } from 'oxc-resolver'
import type { TransformOptions } from 'oxc-transform'
import type { UnpluginContextMeta } from 'unplugin'
import type { FilterPattern } from 'unplugin-utils'

export interface Options {
  /**
   * @default [/\.[cm]?[jt]sx?$/],
   */
  include?: FilterPattern
  /**
   * @default [/node_modules/],
   */
  exclude?: FilterPattern
  enforce?: 'pre' | 'post' | undefined
  /**
   * Transform options passed to `oxc-transform`
   */
  transform?: Omit<TransformOptions, 'sourcemap'> | false
  /**
   * Resolve options passed to `oxc-resolver`
   */
  resolve?: NapiResolveOptions | false
  /**
   * The plugin will skip resolving node_modules by default.
   * Set this to `true` to resolve node_modules.
   * @default false
   */
  resolveNodeModules?: boolean
  /**
   * Minify options passed to `oxc-minify`
   */
  minify?: Omit<MinifyOptions, 'sourcemap'> | false
  /**
   * Default: `true` on unloader, `false` on others.
   */
  sourcemap?: boolean
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type OptionsResolved = Overwrite<
  Required<Options>,
  Pick<Options, 'enforce'>
>

export function resolveOptions(
  options: Options,
  framework: UnpluginContextMeta['framework'],
): OptionsResolved {
  return {
    include: options.include || [/\.[cm]?[jt]sx?$/],
    exclude: options.exclude || [/node_modules/],
    enforce: 'enforce' in options ? options.enforce : 'pre',
    transform: options.transform || {},
    resolve: options.resolve || {},
    resolveNodeModules: options.resolveNodeModules || false,
    minify: options.minify || false,
    sourcemap: options.sourcemap ?? framework === 'unloader',
  }
}
