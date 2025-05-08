// @ts-nocheck
export * from './tsx'
export * from './mod'

export const num: number = 10

const fn = () => {}

export enum Color {
  Red = 1,
  Green = 2,
  Blue = 3,
}

class Test {
  constructor(public field = 10) {}
}

namespace NS {
  export const foo = 1
}

export let optionalChain = NS?.foo
