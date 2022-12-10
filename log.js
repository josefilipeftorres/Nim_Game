var username;
var password;
var group = 20;

var user = new User(null, null, '20');
function User(username, password, group) {
    this.username = username;
    this.password = password;
    this.group = group;
}

function registerButton() {
    document.getElementById("buttonIn").style.display = "none";
    document.getElementById("registerPara").style.display = "none";
    document.getElementById("logBackPage").style.display = "block";

    const button = document.getElementById("registerButton");
    button.addEventListener('click', () => {
        const _username = document.getElementById("userInput").value;
	    const _password = document.getElementById("passwordInput").value;
        
        if(!_username || !_password) {
            document.getElementById("messageBox").innerHTML = "Please fill the username/password camps!";
            return;
        } else {
            document.getElementById("messageBox").innerHTML = "";
            
            const logData = {
                'nick': _username,
                'password': _password
            };
            const logDatajson = JSON.stringify(logData);

            const xhr = new XMLHttpRequest();
            xhr.open("POST", url + 'register', true);

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const response = JSON.parse(xhr.responseText);
                    // if(response.status == 'ok') {                // Com isto dá os erros que o professor queria, mas dá erro no login
                        document.getElementById("buttonIn").style.display = "block";

                        const mBox = document.getElementById("messageBox");
                        mBox.innerHTML = "User registered!";
                        mBox.style.color = "#98ff98";
                        document.getElementById("logBackPage").style.display = "none";
                        var newUser = new User(_username, _password, '20');
                        login(newUser);
                    } else {
                        document.getElementById("messageBox").innerHTML = "User already exists!";
                        document.getElementById("userInputForm").reset();
                        document.getElementById("logBackPage").style.display = "block";
                    // }
                }
            }
            xhr.send(logDatajson);
        }
        document.getElementById("logBackPage").style.display = "none";
    });
}

function logIn() {
}

function login(_user) {
    const logInButton = document.getElementById("buttonIn");

    logInButton.addEventListener('click', () => {
        if(_user.username == document.getElementById("userInput").value && _user.password == document.getElementById("passwordInput").value) {
            user.username = _user.username;
            user.password = _user.password;

            document.getElementById("welcome").innerHTML = "Welcome, " + user.username + "!";
    
            document.getElementById("showLogin").style.display = 'none';
            document.getElementById("buttonCont").style.display = 'inline-block';
            document.getElementById("buttonLeave").style.display = 'inline-block';
            
            document.getElementById("gameButton").style.display = 'inline-block';

            username = user.username;
            password = user.password;
            
        } else {
            alert("Error");
        }
    });
}