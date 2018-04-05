/*!
 * bqliu
 * simple logger for isfe usage
 * aim to build a simpler and customizable logger
 * but customizable log format is not meaningful at the time
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.$$logger = factory());
}(this, (function () { 'use strict';

  /*!
   * bqliu
   * simple function that always return true
   */

  function truthy () { return true; }

  /*!
   * bqliu
   * simple function that pad several zero in the left
   * use to tranform time, e.g. '2018-04-05 01:02:58.009'
   */

  var padZero = function (x, xCnt, pred, direction) {
    if ( xCnt === void 0 ) xCnt = 1;
    if ( pred === void 0 ) pred = truthy;
    if ( direction === void 0 ) direction = 'left';

    var zeros = '';

    for (var i = 1; i <= xCnt; ++i) {
      zeros += '0';
    }

    if (pred(x)) {
      return direction === 'left'
             ? ("" + zeros + x)
             : direction === 'right'
               ? ("" + x + zeros)
               : String(x)
    }

    return String(x)
  };

  var padZeroLeft = padZero;

  /*!
   * bqliu
   * use to get current formatted time
   */

  var r0To10 = function (x) { return x >= 0 && x < 10; };

  var processMilliseconds = function (ms) { return (ms / 1000).toFixed(3).slice(2); };

  var formatTime = function (time) {
    var t = Object.keys(time)
      .reduce(function (acc, prop) {
        acc[prop] = prop === 'milliseconds'
                  ? processMilliseconds(time[prop])
                  : padZeroLeft(time[prop], 1, r0To10);
        return acc
      }, { });

    return ((t.year) + "-" + (t.month) + "-" + (t.date) + " " + (t.hours) + ":" + (t.miniutes) + ":" + (t.seconds) + "." + (t.milliseconds))
  };

  var getTime = function () {
    var now = new Date();

    return {
      year: now.getFullYear(),
      month: now.getMonth(),
      date: now.getDate(),
      hours: now.getHours(),
      miniutes: now.getMinutes(),
      seconds: now.getSeconds(),
      milliseconds: now.getMilliseconds()
    }
  };

  function getFormattedTime () { return formatTime(getTime()); }

  /*!
   * bqliu
   * use to test the runtime env
   * simple test only
   */

  function isNode () { return typeof process === 'object'; }

  /*!
   * bqliu
   * default local console logger
   */

  var inNodeEnv = isNode();

  var localConsole = inNodeEnv
                       ? console
                       : typeof window.console !== 'undefined'
                         ? window.console
                         : null;

  var config = {
    DEBUG: { color: 'black' },
    INFO: { color: 'blue' },
    WARN: { color: 'orange' },
    ERROR: { color: 'red' }
  };

  var formatStyle = function (style) {
    return Object.keys(style)
      .reduce(function (acc, prop) { return acc.concat((prop + ": " + (style[prop]))); }, [ ])
      .join(';')
  };

  function localConsoleCoreLogger (time, level, module, content) {
    var style = config[level];
    if (localConsole) {
      if (inNodeEnv) {
        // now we can easily log it without color
        localConsole.log(("[" + time + "] [" + level + "] [" + module + "] - " + content));
        return
      }
      localConsole.log(
        ("%c[" + time + "] [" + level + "] [" + module + "] %c- " + content),
        formatStyle(style),
        'color: black'
      );
    }
  }

  /*!
   * bqliu
   * the logger manager
   */

  var levels = [ 'DEBUG', 'INFO', 'WARN', 'ERROR' ];

  var loggers = { };

  var logger = {
    addCoreLogger: function addCoreLogger (type, logFn) {
      var this$1 = this;

      // bind
      loggers[type] = { };
      levels.forEach(function (level) { return loggers[type][level] = function (module, content) { return logFn.call(this$1, getFormattedTime(), level, module, content); }; });
    },
    removeCoreLogger: function removeCoreLogger (type, logFn) {
      delete loggers[type];
    },
    getCoreLogger: function getCoreLogger (type) {
      return loggers[type]
    }
  };

  logger.addCoreLogger('localConsole', localConsoleCoreLogger);

  levels.forEach(function (level) {
    logger[level] = function (module, content) {
      logger.getCoreLogger('localConsole')[level].apply(this, arguments);
    };
  });

  return logger;

})));

//# sourceMappingURL=logger.umd.js.map
