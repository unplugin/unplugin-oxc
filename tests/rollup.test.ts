import path from 'node:path'
import { rollupBuild, testFixtures } from '@sxzz/test-utils'
import { describe } from 'vitest'
import UnpluginOxc from '../src/rollup'

describe('rollup', async () => {
  const { dirname } = import.meta
  await testFixtures(
    '*.ts',
    async (args, id) => {
      const { snapshot } = await rollupBuild(id, [
        UnpluginOxc({
          transform: {
            target: 'es2015',
          },
        }),
      ])
      return snapshot
    },
    { cwd: path.resolve(dirname, 'fixtures'), promise: true },
  )
})
