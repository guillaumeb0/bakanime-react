import { getRangeForDisplay, getRangeForPreload } from './range'

describe('getRangeForDisplay', () => {
  test('returns a range of `length` starting at `start` when the limit is not reached', () => {
    expect(getRangeForDisplay({start: 0, length: 6, limit: 10})).toEqual([0, 1, 2, 3, 4, 5])
  })

  test('returns a range of `length` with the last array item set to `limit` when the limit is reached', () => {
    expect(getRangeForDisplay({start: 6, length: 6, limit: 10})).toEqual([5, 6, 7, 8, 9, 10])
  })

  test('returns a range from 0 to `limit + 1` when limit < start + length - 1', () => {
    expect(getRangeForDisplay({start: 5, length: 6, limit: 4})).toEqual([0, 1, 2, 3, 4])
  })
})

describe('getRangeForPreload', () => {
  test('returns a range of `length` starting at `start` when the limit is not reached', () => {
    expect(getRangeForPreload({start: 0, length: 6, limit: 10})).toEqual([0, 1, 2, 3, 4, 5])
  })

  test('returns a range of `length` with the last array item set to `limit` when the limit is reached', () => {
    expect(getRangeForPreload({start: 6, length: 6, limit: 10})).toEqual([6, 7, 8, 9, 10])
  })

  test('raises an error when limit < start + length - 1', () => {
    expect(() => getRangeForPreload({start: 5, length: 6, limit: 4})).toThrow('Not possible')
  })
})

