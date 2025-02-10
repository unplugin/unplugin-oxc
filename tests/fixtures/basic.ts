export * from './tsx'

export const num: number = 10

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
