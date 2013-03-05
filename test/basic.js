var test = require('tap').test
  , splitter = require('../')
  , stream = require('stream')
  , inherits = require('util').inherits;


// basic read stream that will emit data given
function Pumper(data) {
  stream.Readable.call(this, {});
  this.data = data;
}
inherits(Pumper, stream.Readable);

Pumper.prototype._read = function (size) {
  var out = this.data.slice(0, size);
  this.push(out);
  this.data = this.data.slice(size);
};

// collect stream that will buffer on the other end
function Collector(onEnd) {
  stream.Writable.call(this);
  this.buf = '';
  this.on('end', onEnd)
}
inherits(Collector, stream.Writable);

Collector.prototype._write = function (chunk, cb) {
  this.buf += chunk;
  console.log('got buf now', this.buf);
  cb(null);
};

//test("all at once", function (t) {
  // TODO: make a readable stream to read from
  var buff = "hi there miss\nnice to meat you\n!!";

  var pmp = new Pumper(buff);
  var clct = new Collector(function () {
    console.log('done!');
  });
  //pmp.pipe(process.stdout)
  pmp.pipe(splitter()).pipe(clct);

  //pmp.pipe(splitter()).pipe(process.stdout);
  // TODO: make a writable stream to pipe to (that collects)
//  t.ok(true, 'woo');
//  t.end();
//});
