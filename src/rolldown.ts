/**
 * This entry file is for Rolldown plugin.
 *
 * @module
 */

import { Oxc } from './index'

/**
 * Rolldown plugin
 *
 * @example
 * ```ts
 * // rolldown.config.js
 * import Oxc from 'unplugin-oxc/rolldown'
 *
 * export default {
 *   plugins: [Oxc()],
 * }
 * ```
 */
const rolldown = Oxc.rolldown as typeof Oxc.rolldown
export default rolldown
export { rolldown as 'module.exports' }
