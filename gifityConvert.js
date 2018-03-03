var fs = require('fs');
var gifify = require('gifify');
var path = require('path');

var input = path.join(__dirname, 'JavaScript.mp4');
var output = path.join(__dirname, 'JavaScript.gif');

var gif = fs.createWriteStream(output);

var options = {
  resize: '200:-1',
  from: 30,
  to: 35
};

gifify(input, options).pipe(gif);