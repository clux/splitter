var Transform = require('stream').Transform;

function Splitter(matcher, opts) {
  if (!(this instanceof Splitter)) {
    return new Splitter(matcher, opts);
  }
  Transform.call(this, opts);
  this.matcher = matcher || '\n';
  this.buffer = '';
}
Splitter.prototype = Object.create(Transform.prototype);

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
