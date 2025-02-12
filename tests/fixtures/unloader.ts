/* eslint-disable unicorn/prefer-node-protocol */

import assert from 'assert'
import path from 'node:path'

assert(path)

globalThis.h = (tag) => {
  assert(tag === 'div')
}
await import('./entry-basic')
