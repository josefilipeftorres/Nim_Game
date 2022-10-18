var username;
var password;

function logIN() {
    if (username && password) return;

    username = prompt("Enter your username:");
    while (!username) {
        if (username == null) return;
        username = prompt("Enter your username:");   
    }

    password = prompt("Enter your password:");
    while (!password) {
        if (password == null) return;
        password = prompt("Enter your password:");
    }
    
    document.getElementById("logResult").innerHTML = "Hello, " + username + "!";
    document.getElementById("logResult").style.textDecoration = "none";

    // Change button
    document.getElementById("buttonIN").style.display = 'none';
    document.getElementById("buttonCont").style.display = 'inline-block';
    document.getElementById("buttonOUT").style.display = 'inline-block';
}

function logOUT() {
    if (!username || !password ) return;
    if (confirm("Are you sure you want to leave?")) {
        username = undefined;
        password = undefined;
        document.getElementById("logResult").innerHTML = "Press start to log in";
        alert("Bye!");
        // Change button
        document.getElementById('buttonIN').style.display = 'inline-block';
        document.getElementById("buttonOUT").style.display = 'none';
        window.location.reload();
    }
}

// Collect form data

var data = new FormData();

function saveData() {
    var elem = document.getElementById('game');
    elem.scrollIntoView({behavior: "smooth"});

    // document.getElementById('game').innerHTML = "Hi";
}