const isProduction: boolean = process.env.NODE_ENV === 'production'
const prefix = 'Assertion error'

function assert(
  condition: unknown,
  message?: string | (() => string),
): asserts condition {
  if (condition)
    return

  if (isProduction)
    throw new Error(prefix)

  const provided: string | undefined = typeof message === 'function' ? message() : message
  const value: string = provided ? `${prefix}: ${provided}` : prefix
  throw new Error(value)
}

namespace assert {
  export const exists: ((value: unknown, message?: string | (() => string)) => asserts value) = assert
  export function unreachable(..._: never[]): never {
    throw new Error('Expected unreachable')
  }
  export function number(x: unknown): asserts x is number {
    assert(typeof x === 'number')
  }
}

export default assert
