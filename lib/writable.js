const StreamWritable = require('stream').Writable;
const inherits = require('util').inherits;

function Writable(content, options) {
  if (!(this instanceof Writable))
    return new Writable(content, options);
}

inherits(Writable, StreamWritable);

module.exports = Writable;
