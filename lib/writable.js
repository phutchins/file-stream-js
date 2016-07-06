const Writable = require('stream').Writable;
const inherits = require('util').inherits;

function FlipWritable(content, options) {
  if (!(this instanceof FlipWritable))
    return new FlipWritable(content, options);
}

inherits(FlipWritable, Writable);

module.exports = FlipWritable;
