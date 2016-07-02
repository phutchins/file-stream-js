const Readable = require('stream').Readable;
const inherits = require('util').inherits;

// Options by itself makes the events work but
// when it's content, options, the content works but doesn't do eents
function FileStream(content, options) {
  if (!(this instanceof FileStream))
    return new FileStream(content, options);

  console.log('FileStream Content: ', content, 'Options: ', options);

  Readable.call(this, options);

  this.content = content;
}

inherits(FileStream, Readable);

FileStream.prototype._read = function (size) {
  var self = this;
  console.log('File-Stream got _read, size: %s', size);

  if (!this.content) {
    console.log('End of data through file-stream');
    this.push(null);
  } else {
    console.log('Sending data through file-stream');
    var chunkBlob = this.content.slice(0, size);

		blobToBuffer(chunkBlob, function (err, chunkBuffer) {
			self.push(chunkBuffer);
			self.content = self.content.slice(size);
    });
  }
};

function blobToBuffer (blob, cb) {
  if (typeof Blob === 'undefined' || !(blob instanceof Blob)) {
    throw new Error('first argument must be a Blob');
  }
  if (typeof cb !== 'function') {
    throw new Error('second argument must be a function');
  }

  var reader = new FileReader();

  function onLoadEnd (e) {
    reader.removeEventListener('loadend', onLoadEnd, false);
    if (e.error) cb(e.error);
    else cb(null, new Buffer(reader.result));
  }

  reader.addEventListener('loadend', onLoadEnd, false);
  reader.readAsArrayBuffer(blob);
}

module.exports = FileStream;
