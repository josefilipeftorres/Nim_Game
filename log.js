var username;
var password;
var group = 20;

function logIn() {
    username = document.getElementById("userInput").value;
    password = document.getElementById("passwordInput").value;

    if (!username || !password) {
        document.getElementById("messageBox").innerHTML = "Please fill the username/password camps!";
        return;
    }

    var logData = {
        'nick': username,
        'password': password
    };
    var logDatajson = JSON.stringify(logData);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url + 'register', true);
    xhr.onreadystatechange = function() {
        if (this.readyState < 4) {
            return;
        } else if (this.status == 200) {
            document.getElementById("buttonIn").style.display = "block";
            
            const mBox = document.getElementById("messageBox");
            mBox.innerHTML = "User registered!";
            mBox.style.color = "#98ff98";
            
            // document.getElementById("logBackPage").style.display = "none";

            loginFlag = true;

            if (localStorage.getItem('username') == null) {
                const userData = {
                    'victories': 0,
                    'games': 0
                }
                const userDatajson = JSON.stringify(userData);
                localStorage.setItem('username', username) = userDatajson;
            }

            document.getElementById("welcome").innerHTML = "Welcome, " + username + "!";
    
            document.getElementById("showLogin").style.display = 'none';
            document.getElementById("buttonCont").style.display = 'inline-block';
            document.getElementById("buttonLeave").style.display = 'inline-block';
            document.getElementById("onlineRanks").style.display = 'inline-block';
            document.getElementById("gameButton").style.display = 'inline-block';

        } else if (this.status == 400) {
            const response = JSON.parse(xhr.responseText);
            const mBox = document.getElementById("messageBox");
            
            mBox.innerHTML = response["error"];
            document.getElementById("userInputForm").reset();
        }
    }
    xhr.send(logDatajson);
}