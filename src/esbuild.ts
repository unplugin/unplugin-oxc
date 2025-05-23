/**
 * This entry file is for esbuild plugin. Requires esbuild >= 0.15
 *
 * @module
 */

import { Oxc } from './index'

/**
 * Esbuild plugin
 *
 * @example
 * ```ts
 * import { build } from 'esbuild'
 * import Oxc from 'unplugin-oxc/esbuild'
 * 
 * build({ plugins: [Oxc()] })
```
 */
const esbuild = Oxc.esbuild as typeof Oxc.esbuild
export default esbuild
export { esbuild as 'module.exports' }
