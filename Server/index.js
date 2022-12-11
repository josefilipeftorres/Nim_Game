var http = require('http');
var process = require('./process.js');
var headers = require('./headers.js');

http.createServer(function (req, res) {
    if (req.method == 'GET') 
        process.processGETRequest(req, res);
    else if (req.method == 'POST')
        process.processPOSTRequest(req, res);
    else {
        res.writeHead(501, headers["plain"]);
        res.end();
    }
}).listen(8020);

console.log("Server running at localhost:8020/");
