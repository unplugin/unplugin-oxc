/* eslint-disable unicorn/prefer-node-protocol */

import assert from 'assert'
import path from 'node:path'
import pkg from '../../package.json'

assert(path)
assert(pkg.version)

globalThis.h = (tag) => {
  assert(tag === 'div')
}
await import('./entry-basic')
