import { exec } from 'tinyexec'
import { expect, test } from 'vitest'

test('unloader', async () => {
  const { exitCode } = await exec('node', [
    '--import',
    'unloader/register',
    'tests/fixtures/unloader.ts',
  ])
  expect(exitCode).toBe(0)
})
