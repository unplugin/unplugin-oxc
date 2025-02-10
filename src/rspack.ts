/**
 * This entry file is for Rspack plugin.
 *
 * @module
 */

import { Oxc } from './index'

/**
 * Rspack plugin
 *
 * @example
 * ```js
 * // rspack.config.js
 * import Oxc from 'unplugin-oxc/rspack'
 *
 * default export {
 *  plugins: [Oxc()],
 * }
 * ```
 */
const rspack = Oxc.rspack as typeof Oxc.rspack
export default rspack
export { rspack as 'module.exports' }
