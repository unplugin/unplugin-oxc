/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import { Oxc } from './index'

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import Oxc from 'unplugin-oxc/vite'
 *
 * export default defineConfig({
 *   plugins: [Oxc()],
 * })
 * ```
 */
const vite = Oxc.vite as typeof Oxc.vite
export default vite
export { vite as 'module.exports' }
