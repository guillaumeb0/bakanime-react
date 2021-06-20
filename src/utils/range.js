export const getNextRangeForDisplay = ({start, length, limit}) => {
  const end = start + length - 1

  if (limit < length - 1) {
    return Array.from({length: limit + 1}, (_, i) => i)
  }

  const realStart = (end <= limit) ? start : limit - length + 1

  return Array.from({length}, (_, i) => realStart + i)
}

export const getPreviousRangeForDisplay = ({end, length, limit}) => {
  if (limit < length - 1) {
    throw new Error('Not possible')
  }

  if (end === -1) {
    return Array.from({length}, (_, i) => limit - length + 1 + i)
  } else if (end < length - 1) {
    return Array.from({length}, (_, i) => i)
  } else {
    return Array.from({length}, (_, i) => end - length + 1 + i)
  }
}

export const getNextRangeForPreload = ({start, length, limit}) => {
  if (start < 0) {
    throw new Error('start cannot be lower than 0')
  }
  if (limit < 0) {
    throw new Error('limit cannot be lower than 0')
  }
  if (length < 1) {
    throw new Error('length cannot be lower than 1')
  }

  if (start + length - 1 < limit) {
    return Array.from({length: length}, (_, i) => start + i)
  }

  if (start + length - 1 >= limit && start <= limit) {
    return Array.from({length: limit - start + 1}, (_, i) => start + i)
  }

  if (start > limit) {
    return Array.from({length: length}, (_, i) => i)
  }
}

export const getPreviousRangeForPreload = ({end, length, limit}) => {
  if (end === -1) {
    return Array.from({length}, (_, i) => limit - length + 1 + i)
  } else if (end < length - 1) {
    return Array.from({length: end + 1}, (_, i) => i)
  } else {
    return Array.from({length}, (_, i) => end - length + 1 + i)
  }
}

export const getInitialRanges = ({start, length, limit}) => {
  const displayedRange = getNextRangeForDisplay({start, length, limit})
  const displayedRangeEnd = displayedRange[displayedRange.length - 1]
  const preloadedAfterRange = getNextRangeForPreload({start: displayedRangeEnd + 1, length, limit})

  return {
    displayedRange,
    preloadedAfterRange
  }
}

export const getNextRanges = ({start, length, limit}) => {
  const currDisplayedRange = getNextRangeForDisplay({start, length, limit})
  const currDisplayedRangeEnd = currDisplayedRange[currDisplayedRange.length - 1]

  let nextDisplayedRange
  if (currDisplayedRangeEnd === limit) {
    nextDisplayedRange = getNextRangeForDisplay({start: 0, length, limit})
  } else {
    nextDisplayedRange = getNextRangeForDisplay({start: currDisplayedRangeEnd + 1, length, limit})
  }
  const nextDisplayedRangeStart = nextDisplayedRange[0]
  const nextDisplayedRangeEnd = nextDisplayedRange[nextDisplayedRange.length - 1]

  let previousPreloadedRange = getPreviousRangeForPreload({end: nextDisplayedRangeStart - 1, length, limit})

  let nextPreloadedRange
  if (nextDisplayedRangeEnd === limit) {
    nextPreloadedRange = getNextRangeForPreload({start: 0, length, limit})
  } else {
    nextPreloadedRange = getNextRangeForPreload({start: nextDisplayedRangeEnd + 1, length, limit})
  }

  return {
    futurePreloadedBeforeRange: previousPreloadedRange,
    futureDisplayedRange: nextDisplayedRange,
    futurePreloadedAfterRange: nextPreloadedRange
  }
}

export const getPreviousRanges = ({start, length, limit}) => {
  const futureDisplayedRange = getPreviousRangeForDisplay({end: start - 1, length, limit})
  const futureDisplayedRangeEnd = futureDisplayedRange[futureDisplayedRange.length - 1]

  const futurePreloadedBeforeRangeEnd = futureDisplayedRange[0] - 1
  const futurePreloadedBeforeRange = getPreviousRangeForPreload({end: futurePreloadedBeforeRangeEnd, length, limit})

  const nextPreloadedRange = getNextRangeForPreload({start: futureDisplayedRangeEnd + 1, length, limit})

  return {
    previousRange: futurePreloadedBeforeRange,
    currentRange: futureDisplayedRange,
    nextRange: nextPreloadedRange
  }
}
