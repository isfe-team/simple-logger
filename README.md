# @isfe/logger

## Author

[@bqliu](https://github.com/bq-hentai) [@isfe](https://github.com/fe-sm)

## Purpose

We always need to log something. Sometimes in local console, sometimes post some message to backend server.

And several teamates has created some `logger` util, but when use, they always mix each other.

So, I create this library to unify it.

This library is simple but customizable.

## Usage

### Install

```shell
$ npm i -S @isfe/logger
```

### Simple usage

```javascript
const logger = require('@isfe/logger')

;[ 'DEBUG', 'INFO', 'WARN', 'ERROR' ].forEach(levelName => logger[levelName]('module', 'content'))
```

### Customize example

```javascript
const logger = require('@isfe/logger')

const logFn = function (time, level, module, content) {
  (new Image()).src = `http://example.com/log?${content}`
}

logger.addCoreLogger('toBackEnd', logFn)

const toBackEnd = logger.getCoreLogger('toBackEnd')

toBackEnd.DEBUG('module', 'content')
```

## Note

This lib is very simple, but it is enough for common usage now.

Of course, we are looking for better idea.
