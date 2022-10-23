var mainGame;
var gamePlaying = false;
var username;
var password;
var majorSections = ["intro", "info", "configuration", "game"];
var confDivs = ["gameForm", "howToPlay", "gameRules", "showTable"];

function loadMainPage(){
	for(var i=0; i<majorSections.length; i++)
		document.getElementById(majorSections[i]).style.display = "none";

	document.getElementById("intro").style.display = "flex";
	// document.getElementById("info").style.display = "none";
	// document.getElementById("configuration").style.display = "none";
	// document.getElementById("game").style.display = "none";
    document.getElementById("header").style.background = "transparent";
}
function showInfo(){
	for(var i=0; i<majorSections.length; i++)
		document.getElementById(majorSections[i]).style.display = "none";

	document.getElementById("info").style.display = "flex";
    document.getElementById("header").style.background = "transparent";

}
function showGame(){
	for(var i=0; i<majorSections.length; i++)
		document.getElementById(majorSections[i]).style.display = "none";
        
    document.getElementById("configuration").style.display = "flex";
	document.getElementById("game").style.display = "flex";
    document.getElementById("header").style.background = "#5468FF";
    
    document.getElementById("howToPlay").style.display = "none";
    document.getElementById("gameRules").style.display = "none";
    document.getElementById("showTable").style.display = "none";
}

function loginBox() {
    document.getElementById("showLogin").style.display = 'block';
    document.getElementById("playButton").style.display = 'none';
}
function logIn() {
    username = document.getElementById("userInput").value;
	password = document.getElementById("passwordInput").value;
    
    if (!username || !password) {
        alert("Fill the username/password camps!");
    } else {
        document.getElementById("userInputForm").reset();
        
        document.getElementById("welcome").innerHTML = "Welcome, " + username + "!";

        document.getElementById("showLogin").style.display = 'none';
        document.getElementById("buttonCont").style.display = 'inline-block';
        document.getElementById("buttonLeave").style.display = 'inline-block';
        
        document.getElementById("gameButton").style.display = 'inline-block';
        document.getElementById("buttonLeave").style.display = 'inline-block';
        
        document.getElementById("userName").innerHTML = username.slice(0,12);
    }
}
function logOut() {
    // if (!username || !password) return;
    if (confirm("Are you sure you want to leave?")) {
        username = undefined;
        password = undefined;
        loadMainPage();
        
        document.getElementById("playButton").style.display = 'inline-block';
        document.getElementById("welcome").innerHTML = "";
        document.getElementById("showLogin").style.display ='none';
        document.getElementById("gameButton").style.display = 'none';
        document.getElementById("buttonLeave").style.display ='none';
        document.getElementById("buttonCont").style.display ='none';
        document.getElementById("classificationButton").style.display = "none";

        document.getElementById("userName").innerHTML = "";
    }
}
function contButton() {
    for(var i=0; i<majorSections.length; i++)
		document.getElementById(majorSections[i]).style.display = "none";

	document.getElementById("info").style.display = "flex";
}

function showHTP() {
    if (document.getElementById("howToPlay").style.display != "none") {
        document.getElementById("howToPlay").style.display = "none";
        document.getElementById("gameForm").style.display = "block";
        return;
    }

    for(var i=0; i<confDivs.length; i++)
		document.getElementById(confDivs[i]).style.display = "none";

    
    document.getElementById("howToPlay").style.display = "block";
    // document.getElementById("buttonClose").style.visibility = 'visible';
    // document.getElementById("gameRules").style.display = "none";
    // document.getElementById("showTable").style.display = "none";
    // document.getElementById("gameForm").style.display = "none";
}
function showGRL() {
    if (document.getElementById("gameRules").style.display != "none") {
        document.getElementById("gameRules").style.display = "none";
        document.getElementById("gameForm").style.display = "block";
        return;
    }

    for(var i=0; i<confDivs.length; i++) document.getElementById(confDivs[i]).style.display = "none";

    document.getElementById("gameRules").style.display = "block";
}
function showTable() {
    if (document.getElementById("showTable").style.display != "none") {
        document.getElementById("showTable").style.display = "none";
        document.getElementById("gameForm").style.display = "block";
        return;
    }

    for(var i=0; i<confDivs.length; i++) document.getElementById(confDivs[i]).style.display = "none";

    document.getElementById("showTable").style.display = "block";
}
function closeHTP() {
    document.getElementById("howToPlay").style.display = "none";
    // document.getElementById("buttonClose").style.visibility = 'hidden';
    document.getElementById("gameForm").style.display = "block";
}
function closeGRL() {
    document.getElementById("gameRules").style.display = "none";
    // document.getElementById("buttonClose").style.visibility = 'hidden';
    document.getElementById("gameForm").style.display = "block";
}
function closeTBL() {
    document.getElementById("showTable").style.display = "none";
    // document.getElementById("buttonClose").style.visibility = 'hidden';
    document.getElementById("gameForm").style.display = "block";
}

function singlePlayerForm() {
	document.getElementById("singlePlayerForm").style.display = "block";
}
function multiPlayerForm() {
    alert("Sorry but this option is not available.\nPlease choose singleplayer mode if you want to play!");

    // Change later for MultiPlayer Mode
    document.getElementById("gameTypeForm").gameOptions[0].checked = true;
	// document.getElementById("singlePlayerForm").style.display = "none";
}

function playGame() {
    if (document.getElementById("gameTypeForm").gameOptions.value == "singleplayer") {
        var difficulty      = document.getElementById("difficultyForm").difficultyOptions.value;
        var startingPlayer  = document.getElementById("startingForm").startingOptions.value;
        var boardSize       = document.getElementById("boardSizeForm").boardSizeInput.value;
        
        // console.log(difficulty + "|" + startingPlayer + "|" + boardSize);
    
        if (boardSize%1 != 0 || boardSize <= 0) { // Float or <= 0
            // console.log(boardSize%1);
            alert("Invalid board size!");
            return;
        }

        document.getElementById("classificationButton").style.display = "inline-block";
        mainGame = new nimGame(difficulty, startingPlayer, boardSize);
        mainGame.startGame();
    } 
    // else {
    //     // Multiplayer Mode
    // }
}

class createBoardGame {
    constructor(boardSize) {
        this.boardPieces = [];
        
        this.xSide = boardSize;
        this.ySide = boardSize;
        this.boardPlace;

        this.createBoard = function () {
            this.boardPlace = document.createElement("div");
            this.boardPlace.className = "boardDiv";
            this.boardPlace.id = "boardDiv";
            this.boardPlace.style.width = "" + (90 * this.xSide) + "px";
            document.getElementById("showGame").appendChild(this.boardPlace);

            for (var i = 0; i < this.ySide; i++) {
                this.boardPieces.push(i + 1);
                var tempDiv = document.createElement("div");
                tempDiv.id = "cellDiv" + i;
                tempDiv.className = "cellDiv";
                for (var j = i; j >= 0; j--) {
                    var piece = new Piece(i, j);
                    tempDiv.appendChild(piece.html);
                }
                this.boardPlace.appendChild(tempDiv);
            }
        };
    }
}
class nimGame {
    constructor(difficulty, startingPlayer, boardSize) {
        this.dif = difficulty;
        this.firstPlayer = startingPlayer;
        this.boardSize = boardSize;

        this.board;
        this.moves;
        this.pc;

        document.getElementById("playAgain").style.display = "none";
        this.startGame = function () {
            this.board = new createBoardGame(this.boardSize, this.boardSize);
            this.pc = new AI(this.dif);
            this.moves = 0;

            gamePlaying = true;

            var elem = document.getElementById("showGame");
            while (elem.firstChild) {
                elem.removeChild(elem.firstChild);
                // console.log(elem + "| teste");
            }

            this.board.createBoard();

            document.getElementById("leaveGame").style.display = "block";

            this.changeGameMessages();

            if (this.firstPlayer == "pc") {
                // setTimeout(function() {this.pc.move(); }, 1500);
                setTimeout(() => { this.pc.move(); }, 2000);
                // this.firstPlayer = "player";
                // console.log("O BACANO ESTÁ A JOGAR SOZINHO ?????");
                // console.log("Posso jogar agora??");
            }
        };
        this.changeGameMessages = function () {
            if ((this.moves % 2 == 0 && this.firstPlayer == "player") || (this.moves % 2 != 0 && this.firstPlayer != "player")) {
                // if (this.firstPlayer == "player") {
                document.getElementById("gameMessages").innerHTML = "<h1>" + username + "'s turn</h1>";
            }
            else {
                document.getElementById("gameMessages").innerHTML = "<h1>Computer's turn</h1>";
            }
        };

        this.deletePiece = function (x, y) {
            for (var i = y; i < this.board.boardPieces[x]; i++)
                document.getElementById("piece" + x + "|" + i).className = "pieceDeleted";

            this.board.boardPieces[x] = y;

            if (this.checkGameOver() == true) {
                this.endGame();
                return;
            }

            this.moves++;

            if (gamePlaying == true) this.changeGameMessages();

            if ((this.moves % 2 == 0 && this.firstPlayer == "pc") || (this.moves % 2 != 0 && this.firstPlayer != "pc")) {
                // console.log("pc move TESTE");
                // if (this.firstPlayer == "pc") {
                // console.log("pc move TESTE AFTER IF");
                setTimeout(() => { this.pc.move(); }, 2000);
                // console.log("O BACANO ESTÁ A JOGAR SOZINHO ????? 222");
            }
        };

        this.checkGameOver = function () {
            for (var i = 0; i < this.board.boardPieces.length; i++) {
                if (this.board.boardPieces[i] > 0)
                    return false;
            }

            return true;
        };

        this.endGame = function () {
            if ((this.moves % 2 == 0 && this.firstPlayer == "player") || (this.moves % 2 != 0 && this.firstPlayer != "player")) {
                document.getElementById("gameMessages").innerHTML = "<h1>" + username + " won!</h1>";
                // var tempId = "userTable" + this.dif; 
                var tdId = document.getElementById("userTable" + this.dif);
                var modeTotal = document.getElementById("gameModeTotal" + this.dif);
                var total = document.getElementById("userTableTotal");
                
                // console.log(tdId);
                // var val = ++tdId.innerHTML;
                tdId.innerHTML = ++tdId.innerHTML;
                modeTotal.innerHTML = ++modeTotal.innerHTML;
                total.innerHTML = ++total.innerHTML;
            }
            else {
                document.getElementById("gameMessages").innerHTML = "<h1>The Computer won!</h1>";
                var tdId = document.getElementById("pcTable" + this.dif);
                var modeTotal = document.getElementById("gameModeTotal" + this.dif);
                var total = document.getElementById("pcTableTotal");
                tdId.innerHTML = ++tdId.innerHTML;
                modeTotal.innerHTML = ++modeTotal.innerHTML;
                total.innerHTML = ++total.innerHTML;
            }

            gamePlaying = false;

            document.getElementById("playAgain").style.display = "block";
            document.getElementById("boardDiv").style.display = "none";
            document.getElementById("leaveGame").style.display = "none";
        };
    }
}
function buttonLeave() {
    if(confirm("Are you sure you want to give up?")) {
        gamePlaying = false;
        document.getElementById("gameMessages").innerHTML = "<h1>" + username + " gave up!<br></h1>";
        mainGame.endGame();
        document.getElementById("playAgain").style.display = "block";
        document.getElementById("boardDiv").style.display = "none";
        document.getElementById("leaveGame").style.display = "none";    
    }
    else return;
}
class AI {
    constructor(dif) {
        this.dif = dif;

        this.easyMove = function () {
            while (true) {
                var x = Math.floor(Math.random() * mainGame.board.boardPieces.length);
                if (mainGame.board.boardPieces[x] > 0) {
                    var y = Math.floor(Math.random() * mainGame.board.boardPieces[x]);

                    mainGame.deletePiece(x, y);

                    break;
                }
            }
        };

        this.hardMove = function () {
            for (var i = 0; i < mainGame.board.boardPieces.length; i++) {
                for (var j = 0; j < mainGame.board.boardPieces[i]; j++) {
                    var oldValue = mainGame.board.boardPieces[i];
                    mainGame.board.boardPieces[i] = j;
                    if (this.xor() != 0) {
                        mainGame.board.boardPieces[i] = oldValue;
                    }
                    else {
                        mainGame.board.boardPieces[i] = oldValue;
                        mainGame.deletePiece(i, j);

                        return;
                    }
                }
            }
            var x = Math.floor(Math.random() * mainGame.board.boardPieces.length);
            while (mainGame.board.boardPieces[x] == 0)
                x = Math.floor(Math.random() * mainGame.board.boardPieces.length);
            mainGame.deletePiece(x, mainGame.board.boardPieces[x] - 1);
        };

        this.xor = function () {
            var value = 0;
            for (var i = 0; i < mainGame.board.boardPieces.length; i++)
                value ^= mainGame.board.boardPieces[i];

            return value;
        };

        this.move = function () {
            if (this.dif == "Easy") {
                this.easyMove();
            } else if (this.dif == "Medium") {
                var randomN = Math.floor(Math.random() * 2);
                if (randomN == 0)
                    this.easyMove();
                else
                    this.hardMove();
            } else {
                this.hardMove();
            }
        };
    }
}
class Piece {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.html = document.createElement("img");
        this.html.className = "piece";
        this.html.id = "piece" + x + "|" + y;
        this.html.src = "piece.png";

        this.html.onmouseover = function () {
            if (this.className != "pieceDeleted" && ((mainGame.moves % 2 == 0 && mainGame.firstPlayer == "player") || (mainGame.moves % 2 != 0 && mainGame.firstPlayer != "player"))) {
                this.className = "pieceHovered";
                var length = this.id.length;
                var temp = this.id.indexOf("|");
                var x = parseInt(this.id.slice(5, temp));
                var y = parseInt(this.id.slice(temp + 1, length));
                for (; y < mainGame.board.boardPieces[x]; y++)
                    document.getElementById("piece" + x + "|" + y).className = "pieceHovered";
            }
        };

        this.html.onmouseleave = function () {
            if (this.className != "pieceDeleted" && ((mainGame.moves % 2 == 0 && mainGame.firstPlayer == "player") || (mainGame.moves % 2 != 0 && mainGame.firstPlayer != "player"))) {
                this.className = "piece";
                var length = this.id.length;
                var temp = this.id.indexOf("|");
                var x = parseInt(this.id.slice(5, temp));
                var y = parseInt(this.id.slice(temp + 1, length));
                for (; y < mainGame.board.boardPieces[x]; y++)
                    document.getElementById("piece" + x + "|" + y).className = "piece";
            }
        };

        this.html.onclick = function () {
            if (this.className != "pieceDeleted" && ((mainGame.moves % 2 == 0 && mainGame.firstPlayer == "player") || (mainGame.moves % 2 != 0 && mainGame.firstPlayer != "player"))) {
                this.deletePiece();
            }
        };

        this.html.deletePiece = function () {
            var length = this.id.length;
            var temp = this.id.indexOf("|");
            var x = parseInt(this.id.slice(5, temp));
            var y = parseInt(this.id.slice(temp + 1, length));

            mainGame.deletePiece(x, y);
        };
    }
}
