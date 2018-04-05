/*!
 * bqliu
 * use to get current formatted time
 */

import { padZeroLeft } from './pad-zero'

const r0To10 = (x) => x >= 0 && x < 10
const r10To100 = (x) => x >= 10 && x < 100

const processMilliseconds = (ms) => (ms / 1000).toFixed(3).slice(2)

const formatTime = (time) => {
  const t = Object.keys(time)
    .reduce((acc, prop) => {
      acc[prop] = prop === 'milliseconds'
                ? processMilliseconds(time[prop])
                : padZeroLeft(time[prop], 1, r0To10)
      return acc
    }, { })

  return `${t.year}-${t.month}-${t.date} ${t.hours}:${t.miniutes}:${t.seconds}.${t.milliseconds}`
}

const getTime = () => {
  const now = new Date()

  return {
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
    hours: now.getHours(),
    miniutes: now.getMinutes(),
    seconds: now.getSeconds(),
    milliseconds: now.getMilliseconds()
  }
}

export default () => formatTime(getTime())
