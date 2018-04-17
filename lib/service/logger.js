'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLogger;

var _jmLog4js = require('jm-log4js');

var _jmLog4js2 = _interopRequireDefault(_jmLog4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLine() {
  var e = new Error();
  // now magic will happen: get line number from callstack
  var line = e.stack.split('\n')[3].split(':')[1];
  return line;
}

function colorizeStart(style) {
  return style ? '\x1B[' + styles[style][0] + 'm' : '';
}

function colorizeEnd(style) {
  return style ? '\x1B[' + styles[style][1] + 'm' : '';
}
/**
 * Taken from masylum's fork (https://github.com/masylum/log4js-node)
 */
function colorize(str, style) {
  return colorizeStart(style) + str + colorizeEnd(style);
}

var styles = {
  // styles
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  // grayscale
  'white': [37, 39],
  'grey': [90, 39],
  'black': [90, 39],
  // colors
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
};

var colours = {
  'all': 'grey',
  'trace': 'blue',
  'debug': 'cyan',
  'info': 'green',
  'warn': 'yellow',
  'error': 'red',
  'fatal': 'magenta',
  'off': 'grey'
};

function getLogger(categoryName) {
  var args = arguments;
  var prefix = '';
  for (var i = 1; i < args.length; i++) {
    if (i !== args.length - 1) {
      prefix = prefix + args[i] + '] [';
    } else {
      prefix = prefix + args[i];
    }
  }
  if (typeof categoryName === 'string') {
    // category name is __filename then cut the prefix path
    categoryName = categoryName.replace(process.cwd(), '');
  }
  var logger = _jmLog4js2.default.getLogger(categoryName);
  var pLogger = {};
  for (var key in logger) {
    pLogger[key] = logger[key];
  }

  ['log', 'debug', 'info', 'warn', 'error', 'trace', 'fatal'].forEach(function (item) {
    pLogger[item] = function () {
      var p = '';
      if (!process.env.RAW_MESSAGE) {
        if (args.length > 1) {
          p = '[' + prefix + '] ';
        }
        if (args.length && process.env.LOGGER_LINE) {
          p = getLine() + ': ' + p;
        }
        p = colorize(p, colours[item]);
      }

      if (args.length) {
        arguments[0] = p + arguments[0];
      }
      logger[item].apply(logger, arguments);
    };
  });
  return pLogger;
}
module.exports = exports['default'];