import path from 'node:path'
import { rollupBuild, testFixtures } from '@sxzz/test-utils'
import { describe } from 'vitest'
import Oxc from '../src/rollup'

describe('rollup', async () => {
  const { dirname } = import.meta
  await testFixtures(
    'entry-*.ts',
    async (args, id) => {
      const { snapshot } = await rollupBuild(
        id,
        [
          Oxc({
            resolveNodeModules: id.includes('resolve'),
            sourcemap: id.includes('minify'),
            transform: {
              target: 'es5',
              jsx: {
                runtime: 'classic',
              },
            },
            minify: id.includes('minify')
              ? { compress: { target: 'es2015' } }
              : false,
          }),
        ],
        { onwarn: undefined },
        { sourcemap: id.includes('minify') },
      )
      return snapshot
    },
    { cwd: path.resolve(dirname, 'fixtures'), promise: true },
  )
})
