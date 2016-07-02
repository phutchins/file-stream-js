const Readable = require('stream').Readable;
const inherits = require('util').inherits;

function FileStream(content, options) {
  Readable.call(this, options);
  this.content = content;
}

inherits(FileStream, Readable);

FileStream.prototype._read = function (size) {
  var self = this;

  console.log('File-Stream got _read, size: %s this.curIndex: %s  ', size, this.curIndex);

  if (this.counter-- === 0) {
    console.log('END OF DATA STREAM');
  }

  if (!self.content) {
    // ******************
    // The problem is that this is never getting called!
    // ******************
    console.log('End of data through file-stream');
    self.push(null);
  } else {
    console.log('Sending data through file-stream');
    var chunkBlob = self.content.slice(0, size);

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
