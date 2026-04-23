import { exec } from 'tinyexec'
import { describe, expect, test } from 'vitest'

describe('unloader', () => {
  test('unloader sync', async () => {
    const { exitCode } = await exec(
      'node',
      ['--require', 'unloader/register', 'tests/fixtures/unloader.cts'],
      { nodeOptions: { stdio: 'inherit' } },
    )
    expect(exitCode).toBe(0)
  })
})
