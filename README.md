# Stream from HTML5 File objects

## Usage

### Readable
The readable portion of this module allows you to pass in an HTML5 file object and treat it as a NodeJS stream.

```
var FlipStream = require('flip-stream-js')
var stream = ... // Some type of NodeJS style stream, like a BinaryJS stream
var file = document.getElementById('fileinput').addEventListener('change', function() {
  var reader = FlipStream.Readable(file);
  reader.pipe(stream);
});
```

### Writable
This has not been implemented yet but will allow you to take an incoming stream and pipe it to a file being saved in the browser. The goal is to avoid holding the entire file in memory while you are receiving it.

## ToDo:
+ Add writable stream for saving files to disk in browser as a stream
+ Add some usage documentation
+ Add logger and debug mode for all existing logging
