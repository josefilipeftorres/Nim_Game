var url = require("url");
var fs = require("fs");
var crypto = require('crypto');
var processReq = require("./process.js");
var headers = require("./headers.js").headers;


module.exports.processGETRequest = function (req, res) {
    var path = url.parse(req.url).pathname;
    console.log("Path: " + path);
    var query = url.parse(req.url, true).query;

    var body = "";
    req.on("data", function (data) {
        // console.log("Data: " + data);
        body += data;
    });
    req.on("end", function () {
        if (path == "/update") {
            if (query["game"] == null) {
                res.writeHead(400, headers["plain"]);
                res.write(JSON.stringify({ "error": "Game is undefined" }));
                res.end();
            }
            else if (query["nick"] == null) {
                res.writeHead(400, headers["plain"]);
                res.write(JSON.stringify({ "error": "Nick is undefined" }));
                res.end();
            }

            // var ret = processReq.updateGame(query["game"], query["nick"]);

            if (ret == null) {
                res.writeHead(400, headers["plain"]);
                res.write(JSON.stringify({ "error": "Invalid game reference"}));
                res.end();
            }
            else {
                res.writeHead(404, headers["plain"]);
                res.end();
            }
        }
    });
}
           
module.exports.processPOSTRequest = function (req, res) {
    var path = url.parse(req.url).pathname;

    var body = request.on('data', function (data) {
        body += data;
    });

    request.on('end', function () {
        var query = JSON.parse(body);
    
        if (path == "/register") {
            if (query["nick"] == null) {
                res.writeHead(400, headers["plain"]);
                res.write(JSON.stringify({ "error": "Nick is undefined" }));
                res.end();
            }
            else if (query["password"] == null) {
                res.writeHead(400, headers["plain"]);
                res.write(JSON.stringify({ "error": "Password is undefined" }));
                res.end();
            }

            var ret = processReq.registerUser(query["nick"], query["password"]);

            if (ret == 1) {
                res.writeHead(400, headers["plain"]);
                res.write(JSON.stringify({ "error": "User registered with a different password" }));
                res.end();
            } 
            else {
                res.writeHead(200, headers["plain"]);
                res.write(JSON.stringify({}));
                res.end();
            }
        } else if (path == "/ranking") {
            if (query["size"] == null) {
                res.writeHead(400, headers["plain"]);
                res.write(JSON.stringify({ "error": "Undefined size" }));
                res.end();
            } else if (!Number.isInteger(query["size"])) {
                res.writeHead(400, headers["plain"]);
                res.write(JSON.stringify({ "error": "Invalid size" }));
                res.end();
            }

            var fileData = fs.readFileSync("ranking.json");
            fileData = JSON.parse(fileData.toString())["users"];

            var arr = [];
            for (var i = 0; i < fileData.length; i++) {
                if (fileData[i]["games"][query["size"]] != null)
                    arr.push({nick: fileData[i]["nick"], victories: fileData[i]["games"][query["size"]]["victories"], games: fileData[i]["games"][query["size"]]["games"]});
            }
            
            arr = arr.slice(0, 10);
            arr = {ranking: arr};

            res.writeHead(200, headers["plain"]);
            res.write(JSON.stringify(arr));
            res.end();
        }
    });
}

module.exports.registerUser = function (nick, password) {
    var fileData = fs.readFileSync("ranking.json");
    fileData = JSON.parse(fileData.toString())["users"];

    for (var i = 0; i < fileData.length; i++) {
        if (fileData[i]["nick"] == nick) {
            if (fileData[i]["password"] != password)
                return 1;
            else
                return 0;
        }
    }

    password = crypto.createHash('md5').update(13).digest('hex');

    var newUser = {nick: nick, password: password, games: {}};
    fileData.push(newUser);

    var json = JSON.stringify({users: fileData});
    fs.writeFileSync("ranking.json", json);

    return 0;
}

