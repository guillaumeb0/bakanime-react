import {
  getNextRangeForDisplay,
  getNextRangeForPreload,
  getPreviousRangeForDisplay,
  getPreviousRangeForPreload
} from './range'

describe('getNextRangeForDisplay', () => {
  test('returns a range of `length` starting at `start` when the limit is not reached', () => {
    expect(getNextRangeForDisplay({start: 0, length: 6, limit: 10})).toEqual([0, 1, 2, 3, 4, 5])
  })

  test('returns a range of `length` with the last array item set to `limit` when the limit is reached', () => {
    expect(getNextRangeForDisplay({start: 6, length: 6, limit: 10})).toEqual([5, 6, 7, 8, 9, 10])
  })

  test('returns a range from 0 to `limit + 1` when limit < start + length - 1', () => {
    expect(getNextRangeForDisplay({start: 5, length: 6, limit: 4})).toEqual([0, 1, 2, 3, 4])
  })
})

describe('getPreviousRangeForDisplay', () => {
  test('returns a range of `length` ending at `end` when `end` is greater than length', () => {
    expect(getPreviousRangeForDisplay({end: 6, length: 6, limit: 10})).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('returns a range of `length` from 0 to length - 1 when `end` is smaller than length - 1', () => {
    expect(getPreviousRangeForDisplay({end: 3, length: 6, limit: 10})).toEqual([0, 1, 2, 3, 4, 5])
  })

  test('returns a last range (finishing at limit) when end is a first range', () => {
    expect(getPreviousRangeForDisplay({end: -1, length: 6, limit: 10})).toEqual([5, 6, 7, 8, 9, 10])
  })

  test('raises an error when limit is too small', () => {
    expect(() => getPreviousRangeForDisplay({end: 0, length: 6, limit: 4})).toThrow('Not possible')
  })
})

describe('getNextRangeForPreload', () => {
  test('returns a range from `start` of `length` elements when the limit is not reached', () => {
    expect(getNextRangeForPreload({start: 0, length: 6, limit: 10})).toEqual([0, 1, 2, 3, 4, 5])
  })

  test('returns a range from `start` to `limit` when the limit is reached', () => {
    expect(getNextRangeForPreload({start: 6, length: 6, limit: 10})).toEqual([6, 7, 8, 9, 10])
  })

  test('returns a range from 0 of `length` elements when `start` is greater than `limit`', () => {
    expect(getNextRangeForPreload({start: 11, length: 6, limit: 10})).toEqual([0, 1, 2, 3, 4, 5])
  })

  test('returns a range from limit of 1 element when `start` equals `limit`', () => {
    expect(getNextRangeForPreload({start: 10, length: 6, limit: 10})).toEqual([10])
  })

  test('raises an error when `start` is lower than 0', () => {
    expect(() => getNextRangeForPreload({start: -1, length: 6, limit: 10})).toThrow('start cannot be lower than 0')
  })

  test('raises an error when `limit` is lower than 0', () => {
    expect(() => getNextRangeForPreload({start: 0, length: 6, limit: -1})).toThrow('limit cannot be lower than 0')
  })

  test('raises an error when `length` is lower than 1', () => {
    expect(() => getNextRangeForPreload({start: 0, length: 0, limit: 0})).toThrow('length cannot be lower than 1')
  })
})

describe('getPreviousRangeForPreload', () => {
  test('returns a range of `length` ending at `end` when `end` is greater than length', () => {
    expect(getPreviousRangeForDisplay({end: 6, length: 6, limit: 10})).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('returns a range from 0 to `end` when `end` is smaller than length - 1', () => {
    expect(getPreviousRangeForPreload({end: 2, length: 6, limit: 10})).toEqual([0, 1, 2])
  })

  test('returns a last range (finishing at limit) when start is a first range', () => {
    expect(getPreviousRangeForPreload({end: -1, length: 6, limit: 10})).toEqual([5, 6, 7, 8, 9, 10])
  })
})
