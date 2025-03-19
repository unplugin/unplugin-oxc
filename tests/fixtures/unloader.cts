/* eslint-disable unicorn/prefer-node-protocol */

const assert = require('assert')
const path = require('node:path')

assert(path)

globalThis.h = (tag) => {
  assert(tag === 'div')
}
require('./entry-basic')
