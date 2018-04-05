/*!
 * bqliu
 * the logger manager
 */

import getFormattedTime from './helpers/get-formatted-time'
import localConsoleCoreLogger from './plugins/local-console'

const levels = [ 'DEBUG', 'INFO', 'WARN', 'ERROR' ]

const loggers = { }

const logCore = function (time, level, module, content, logFn) {
  try {
    logFn.apply(this, time, level, module, content)
  } catch(e) {
    /* Ignore */
  }
}

const logger = {
  addCoreLogger (type, logFn) {
    // bind
    loggers[type] = { }
    levels.forEach((level) => loggers[type][level] = (module, content) => logFn.call(this, getFormattedTime(), level, module, content))
  },
  removeCoreLogger (type, logFn) {
    delete loggers[type]
  },
  getCoreLogger (type) {
    return loggers[type]
  }
}

logger.addCoreLogger('localConsole', localConsoleCoreLogger)

levels.forEach((level) => {
  logger[level] = function (module, content) {
    logger.getCoreLogger('localConsole')[level].apply(this, arguments)
  }
})

export default logger
