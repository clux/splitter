var Transform = require('stream').Transform;
var inherits = require('util').inherits;

function Splitter(matcher, opts) {
  if (!(this instanceof Splitter)) {
    return new Splitter(matcher, opts);
  }
  Transform.call(this, opts);
  this.matcher = matcher || '\n';
  this.buffer = '';
}
inherits(Splitter, Transform);

Splitter.prototype._transform = function (chunk, output, cb) {
  var pieces = (this.buffer + chunk).split(this.matcher);
  this.buffer = pieces.pop();
  for (var i = 0; i < pieces.length; i += 1) {
    output(pieces[i]);
  }
  cb();
};

Splitter.prototype._flush = function (output, cb) {
  output(this.buffer);
  cb();
};

module.exports = Splitter;

if (module === require.main) {
  process.stdin.pipe(Splitter()).pipe(process.stdout);
}
