import path from 'node:path'
import { rollupBuild, testFixtures } from '@sxzz/test-utils'
import { describe } from 'vitest'
import UnpluginOxc from '../src/rollup'

describe('rollup', async () => {
  const { dirname } = import.meta
  await testFixtures(
    'entry-*.ts',
    async (args, id) => {
      const { snapshot } = await rollupBuild(
        id,
        [
          UnpluginOxc({
            sourcemap: id.includes('minify'),
            transform: { target: 'es2015' },
            minify: id.includes('minify')
              ? { compress: { target: 'es2015' } }
              : false,
          }),
        ],
        undefined,
        { sourcemap: id.includes('minify') },
      )
      return snapshot
    },
    { cwd: path.resolve(dirname, 'fixtures'), promise: true },
  )
})
