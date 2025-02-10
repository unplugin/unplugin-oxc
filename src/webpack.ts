/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import { Oxc } from './index'

/**
 * Webpack plugin
 *
 * @example
 * ```js
 * // webpack.config.js
 * import UnpluginOxc from 'unplugin-oxc/webpack'
 *
 * default export {
 *  plugins: [UnpluginOxc()],
 * }
 * ```
 */
const webpack = Oxc.webpack as typeof Oxc.webpack
export default webpack
export { webpack as 'module.exports' }
