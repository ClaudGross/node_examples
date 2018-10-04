var http = require('http');
const scanner = require('local-network-scanner');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(41018); //the server object listens on port 8080


/*var s = require('net').Socket();
var ip = '172.20.211.'; 

for (var i = 0; i <255 ; i++) {

ip = ip+i.toString();
s.connect(41018, ip);

//s.write('GET http://www.google.com/ HTTP/1.1\n\n');

s.on('data', function(d){
    console.log(d.toString());
});

s.end();
}*/