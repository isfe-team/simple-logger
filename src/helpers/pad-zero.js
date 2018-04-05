/*!
 * bqliu
 * simple function that pad several zero in the left
 * use to tranform time, e.g. '2018-04-05 01:02:58.009'
 */

import truthy from './truthy'

const padZero = (x, xCnt = 1, pred = truthy, direction = 'left') => {
  const n = Number(x)

  let zeros = ''

  for (let i = 1; i <= xCnt; ++i) {
    zeros += '0'
  }

  if (pred(x)) {
    return direction === 'left'
           ? `${zeros}${x}`
           : direction === 'right'
             ? `${x}${zeros}`
             : String(x)
  }

  return String(x)
}

export const padZeroLeft = padZero

export const padZeroRight = (x, xCnt, pred) => padZero(x, xCnt, pred, 'right')
