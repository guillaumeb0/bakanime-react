export const getRangeForDisplay = ({start, length, limit}) => {
  const end = start + length - 1

  if (limit < length - 1) {
    return Array.from({length: limit + 1}, (_, i) => i)
  }

  const realStart = (end <= limit) ? start :  limit - length + 1

  return Array.from({length: length}, (_, i) => realStart + i)
}

export const getRangeForPreload = ({start, length, limit}) => {
  const end = start + length - 1

  if (limit < length - 1) {
    throw new Error('Not possible')
  }

  const realLength = (end <= limit) ? length : limit - start + 1

  return Array.from({length: realLength}, (_, i) => start + i)
}
