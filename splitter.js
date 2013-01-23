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

Splitter.prototype._transform = function (chunk, output, done) {
  var pieces = (this.buffer + chunk.toString()).split(this.matcher);
  this.buffer = pieces.pop();
  for (var i = 0; i < pieces.length; i += 1) {
    output(null, pieces[i]);
  }
  done();
};

// no _flush method as anything left in buffer should be discarded

module.exports = Splitter;
