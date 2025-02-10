/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { Oxc } from './index'

/**
 * Rollup plugin
 *
 * @example
 * ```ts
 * // rollup.config.js
 * import Oxc from 'unplugin-oxc/rollup'
 *
 * export default {
 *   plugins: [Oxc()],
 * }
 * ```
 */
const rollup = Oxc.rollup as typeof Oxc.rollup
export default rollup
export { rollup as 'module.exports' }
