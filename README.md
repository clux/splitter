# Splitter [![Build Status](https://secure.travis-ci.org/clux/splitter.png)](http://travis-ci.org/clux/splitter) [![Dependency Status](https://david-dm.org/clux/splitter.png)](https://david-dm.org/clux/splitter)

Splitter is a more or less direct port of the old streams module `split` using streams2, and is thus dependency free (apart from node ~0.10 and its core libs).

## Usage
Pipe things through it. It's a `Transform` stream.

```js
var splitter = require('splitter');
process.stdin.pipe(splitter()).process.stdout();
```

This will split by the default '\n' character and send data by line to stdout.

First argument to splitter is the thing to split by, which can either be a string or a regex.

## Running tests
Install development dependencies

```bash
$ npm install
```

Run the tests

```bash
$ npm test
```

## License
MIT-Licensed. See LICENSE file for details.
