const fs = require('fs');
const http = require('http');

console.log('this line of code is executing');

setTimeout(() => {
  console.log('this line is after the timeout');
}, 3000);

fs.readFile('async.js', (err, file) => {
  console.log(file);
  
});

http.createServer((req, res) => {
  console.log('http request!');
  res.end('hello!');
}).listen(3100);

console.log('so is this line of code');

[1, 2, 3].map(x => console.log(x));

