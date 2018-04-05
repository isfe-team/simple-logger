/*!
 * bqliu
 * default local console logger
 */

import isNode from '../helpers/is-node'

const inNodeEnv = isNode()

const localConsole = inNodeEnv
                     ? console
                     : typeof window.console !== 'undefined'
                       ? window.console
                       : null

const config = {
  DEBUG: { color: 'black' },
  INFO: { color: 'blue' },
  WARN: { color: 'orange' },
  ERROR: { color: 'red' }
}

const formatStyle = style => {
  return Object.keys(style)
    .reduce((acc, prop) => acc.concat(`${prop}: ${style[prop]}`), [ ])
    .join(';')
}

export default (time, level, module, content) => {
  const style = config[level]
  if (localConsole) {
    if (inNodeEnv) {
      // now we can easily log it without color
      localConsole.log(`[${time}] [${level}] [${module}] - ${content}`)
      return
    }
    localConsole.log(
      `%c[${time}] [${level}] [${module}] %c- ${content}`,
      formatStyle(style),
      'color: black'
    )
  }
}
