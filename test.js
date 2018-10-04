const http = require('http');
const fs = require('fs');


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
let path = __dirname+ req.url;
console.log(path);
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
	if (req.url=='/it'){
  		res.end('Ciao Mondo\n');		  
	} 

  if (fs.existSync(path)) {
    fs.openSync(path,'r')
  }
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});