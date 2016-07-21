const StreamReadable = require('stream').Readable;
const inherits = require('util').inherits;

// Options by itself makes the events work but
// when it's content, options, the content works but doesn't do eents
function Readable(content, options) {
  if (!(this instanceof Readable))
    return new Readable(content, options);

  console.log('[CONSTRUCTOR] Readable Content: ', content, 'Options: ', options);

  this.content = content;
  StreamReadable.call(this, options);
}

inherits(Readable, StreamReadable);

Readable.prototype._read = function (size) {
  var self = this;
  console.log('[Flip][_read] File-Stream got _read, size: ', this.content.size, 'Content is: ', this.content);

  if (this.content.size === 0) {
    console.log('[Flip][_read] End of data through file-stream');
    return this.push(null);
  } else {
    console.log('[Flip][_read] Sending data through file-stream');

    var chunkBlob = this.content.slice(0, size);
	  this.content = this.content.slice(size);

    console.log('[Flip][_read] this.content: ', this.content);

		//blobToBuffer(chunkBlob, function (err, chunkBuffer) {
		blobToBuffer(chunkBlob, function(err, chunkBuffer) {
			self.push(chunkBuffer);
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

    if (e.error) {
      cb(e.error);
    } else {
      var readerString = String.fromCharCode.apply(null, new Uint8Array(reader.result));

      console.log('[Flip][blobToBuffer] FileReader read chunk from file: %s', readerString);

      cb(null, new Buffer(reader.result));
    }
  }

  reader.addEventListener('loadend', onLoadEnd, false);
  reader.readAsArrayBuffer(blob);
}

module.exports = Readable;
