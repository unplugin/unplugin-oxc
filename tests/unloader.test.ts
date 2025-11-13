import process from 'node:process'
import { exec } from 'tinyexec'
import { describe, expect, test } from 'vitest'

describe.skipIf(process.version.startsWith('v20'))('unloader', () => {
  test('unloader async', async () => {
    const { exitCode } = await exec(
      'node',
      ['--import', 'unloader/register', 'tests/fixtures/unloader.ts'],
      { nodeOptions: { stdio: 'inherit' } },
    )
    expect(exitCode).toBe(0)
  })

  test('unloader sync', async () => {
    const { exitCode } = await exec(
      'node',
      ['--require', 'unloader/register-sync', 'tests/fixtures/unloader.cts'],
      { nodeOptions: { stdio: 'inherit' } },
    )
    expect(exitCode).toBe(0)
  })
})
