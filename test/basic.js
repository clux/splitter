var test = require('tap').test
  , splitter = require('../')
  , stream = require('stream');

// basic read stream that will emit data given
function Pumper(data) {
  stream.Readable.call(this, {});
  this.data = data;
}
Pumper.prototype = Object.create(stream.Readable.prototype);
Pumper.prototype._read = function (size) {
  if (!this.data.length) {
    this.push(null);
    return null;
  }
  var out = this.data.slice(0, size);
  this.push(out);
  this.data = this.data.slice(size);
  return out.length;
};

// collect stream that will buffer on the other end
function Collector(onFinish) {
  stream.Writable.call(this);
  this.buf = '';
  this.on('finish', function () {
    onFinish(this.buf);
  });
}
Collector.prototype = Object.create(stream.Writable.prototype);
Collector.prototype._write = function (chunk, encoding, cb) {
  this.buf += chunk;
  cb(null);
};

test("sample buffer", function (t) {
  t.plan(1);

  // dont end in newline so we know _flush works
  var buff = "hi there miss\nnice to meat you\n!!";
  var onFinish = function (res) {
    t.equal(buff.split('\n').join(''), res, "output == split input");
  };

  var pump = new Pumper(buff);
  var collect = new Collector(onFinish);

  pump.pipe(splitter()).pipe(collect);
});
