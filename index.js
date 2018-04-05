/*!
 * bqliu
 * export & test
 */

const logger = require('./dist/logger.umd')

// ;[ 'DEBUG', 'INFO', 'WARN', 'ERROR' ].forEach(levelName => logger[levelName]('module', 'content'))

module.export = logger
