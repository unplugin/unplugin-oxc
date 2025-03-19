import process from 'node:process'
import { exec } from 'tinyexec'
import { expect, test } from 'vitest'

test('unloader async', async () => {
  const { exitCode } = await exec('node', [
    '--import',
    'unloader/register',
    'tests/fixtures/unloader.ts',
  ])
  expect(exitCode).toBe(0)
})

test.skipIf(!process.version.startsWith('v23'))('unloader sync', async () => {
  const { exitCode } = await exec('node', [
    '--require',
    'unloader/register-sync',
    'tests/fixtures/unloader.cts',
  ])
  expect(exitCode).toBe(0)
})
