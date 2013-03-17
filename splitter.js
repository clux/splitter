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

Splitter.prototype._transform = function (chunk, encoding, cb) {
  var pieces = (this.buffer + chunk).split(this.matcher);
  this.buffer = pieces.pop();
  for (var i = 0; i < pieces.length; i += 1) {
    this.push(pieces[i]);
  }
  cb();
};

Splitter.prototype._flush = function (cb) {
  this.push(this.buffer);
  cb();
};

module.exports = Splitter;
