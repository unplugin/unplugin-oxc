/**
 * This entry file is for Unloader plugin.
 *
 * @module
 */

import { Oxc } from './index'

/**
 * Unloader plugin
 *
 * @example
 * ```ts
 * // unloader.config.js
 * import Oxc from 'unplugin-oxc/unloader'
 *
 * export default {
 *   plugins: [Oxc()],
 * }
 * ```
 */
const unloader = Oxc.unloader as typeof Oxc.unloader

export default unloader
export { unloader as 'module.exports' }
