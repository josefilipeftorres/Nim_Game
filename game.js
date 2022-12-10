var game,size;
var gamePlaying = false;

const url = 'http://twserver.alunos.dcc.fc.up.pt:8008/';

var timeLeft;
var timeOutMessage;
var timer;

var eventSource;

function play() {
    const gameType = document.getElementById("gameTypeForm").gameOptions.value;
    const size = document.getElementById("boardSizeForm").boardSizeInput.value;
    
    if (size % 1 != 0 || size <= 0) {   // Verificar se é inteiro
        alert("Please insert a valid board size!");
        return;
    }

    if (gameType == "singleplayer") {
        var difficulty  = document.getElementById("difficultyForm").difficultyOptions.value;
        var starter  = document.getElementById("startingForm").startingOptions.value;
    
        document.getElementById("classificationButton").style.display = "inline-block";
        document.getElementById("playAgainButton").style.display = "none"; 
        document.getElementById("leaveGame").style.display = "block";
        document.getElementById("gameMessages").style.display = "block";
    
        document.getElementById("userName").innerHTML = username.slice(0,7);

        game = new Game(difficulty, starter, size);
        game.begin();
    } else {
        resetGame();
        setTimer();
        join(size);
    }
}

function join(size) {
    const joinData = {
        'group':    group,
        'nick':     username,
        'password': password,
        'size':     size
    };
    const joinDatajson = JSON.stringify(joinData);
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url + 'join', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const response = JSON.parse(xhr.responseText)['game'];
            // console.log(response);
            
            initiateEventSource(response);
            gamePlaying = true;

            const gameMessages = document.getElementById("gameMessages");
            gameMessages.innerHTML = "Waiting for another player to join...";

            // Create a button to leave the queue

            game = new onlineGame(response, size); 
            // game.begin(username);
        }
        else if (xhr.status == 400) {
            const response = JSON.parse(xhr.responseText);
            const gameMessages = document.getElementById("gameMessages");
            if (response["error"] == "Invalid size")
                gameMessages.innerHTML = "Invalid size";
            else 
                gameMessages.innerHTML = "You need another player to join";
        }
    }
    xhr.send(joinDatajson);
}

function setTimer() {
    timeLeft = 120000;
    clearInterval(timer);
    timer = setInterval(function() {
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Criar div para timer
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("gameMessages").innerHTML = "Time to find an opponent has expired";

            document.getElementById("leaveGame").style.display = "none";
            document.getElementById("playAgainButton").style.display = "inline-block";

            // if (document.getElementById("showGame") != null)
            //     document.getElementById("showGame").style.display = "none";
            gamePlaying = false;
            game.leaveGame();
        }
        timeLeft = timeLeft - 1000;
    }, 1000);
}

function initiateEventSource(gameId) {
    eventSource = new EventSource(url + 'update?nick=' + username + "&game=" + gameId);
    
    eventSource.onmessage = function(event) {
        var response = JSON.parse(event.data);
        // console.log(response);

        if(response["turn"] != null) { 
            if (response["stack"] != null) { 
                var x = response["stack"];
                var y = response["pieces"];

                game.deletePieceInGame(x, y);
                game.turn = response["turn"];
                game.changeGameMessages();

                if (game.turn == username) {
                    setTimer();
                } else {
                    clearInterval(timer);
                    document.getElementById("timer").innerHTML = "02:00"; 
                }
            } else {
                var firstPlayer = response["turn"];
                game.begin(firstPlayer);
                if (firstPlayer == username) setTimer();
                else {
                    clearInterval(timer);
                    document.getElementById("timer").innerHTML = "02:00"; 
                }
            }
        } else if (response["winner"] != null) {
            game.endGame(response["winner"]);
        } 
        else if (response["error"]) { 
            clearTimeout(timeOutMessage);
            document.getElementById("gameMessages").innerHTML = response["error"];
        } 
        else if (response["winner"] == null) {
            if (timeLeft <= 0) {
                setTimeout(function() {
                    gamePlaying = false;
                    game.endGame("timeout");
                    eventSource.close();
                }, 3000);
            } else {
                gamePlaying = false;
                eventSource.close();
            }
        }
    }
}
