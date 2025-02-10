/**
 * This entry file is for Farm plugin.
 *
 * @module
 */

import { Oxc } from './index'

/**
 * Farm plugin
 *
 * @example
 * ```ts
 * // farm.config.js
 * import Oxc from 'unplugin-oxc/farm'
 *
 * export default {
 *   plugins: [Oxc()],
 * }
 * ```
 */
const farm = Oxc.farm as typeof Oxc.farm
export default farm
export { farm as 'module.exports' }
