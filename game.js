var game,size;
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
    
    document.getElementById("gameForm").style.display = "block";
    document.getElementById("howToPlay").style.display = "none";
    document.getElementById("gameRules").style.display = "none";
    document.getElementById("showTable").style.display = "none";

}

function resetTable() {
    document.getElementById("userTableEasy").innerHTML = "0";
    document.getElementById("userTableMedium").innerHTML = "0";
    document.getElementById("userTableHard").innerHTML = "0";
    document.getElementById("userTableTotal").innerHTML = "0";

    document.getElementById("pcTableEasy").innerHTML = "0";
    document.getElementById("pcTableMedium").innerHTML = "0";
    document.getElementById("pcTableHard").innerHTML = "0";
    document.getElementById("pcTableTotal").innerHTML = "0";

    document.getElementById("gameModeTotalEasy").innerHTML = "0";
    document.getElementById("gameModeTotalMedium").innerHTML = "0";
    document.getElementById("gameModeTotalHard").innerHTML = "0";
    document.getElementById("gameTotal").innerHTML = "0";
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
        document.getElementById("playAgainButton").style.display = "none";
        document.getElementById("gameMessages").style.display = "none";
        document.getElementById("userName").innerHTML = "";
        resetTable();
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

function play() {

    var difficulty  = document.getElementById("difficultyForm").difficultyOptions.value;
    var starter  = document.getElementById("startingForm").startingOptions.value;
    size = document.getElementById("boardSizeForm").boardSizeInput.value;
    
    if (size%1 != 0 || size <= 0) { // Float or <= 0
        // console.log(size%1);
        alert("Invalid board size!");
        return;
    }

    document.getElementById("classificationButton").style.display = "inline-block";
    document.getElementById("playAgainButton").style.display = "none"; 
    document.getElementById("leaveGame").style.display = "block";
    document.getElementById("gameMessages").style.display = "block";


    game = new Game(difficulty, starter, size);
    game.begin();
}

class createBoardGame {
    constructor(size) {
        this.boardPieces = [];
        
        this.xSide = size*2-1;
        this.ySide = size;
        this.boardPlace;

        this.createBoard = function () {
            this.boardPlace = document.createElement("div");
            this.boardPlace.className = "boardDiv";
            this.boardPlace.id = "boardDiv";
          
            let show = document.getElementById("showGame");
            show.appendChild(this.boardPlace);

            for (let i = 0; i < this.ySide; i++) {
                this.boardPieces.push(i + 1);
                let tempDiv = document.createElement("div");
                tempDiv.id = "row:" + i;
                tempDiv.className = "cellDiv";
                for (var j = i; j >= 0; j--) {
                    var piece = new Piece(i, j);
                    tempDiv.appendChild(piece.pieceNewDiv);
                }
                this.boardPlace.appendChild(tempDiv);
            }
        };
    }
}
class Game {
    constructor(difficulty, startingPlayer, size) {
        this.difficulty = difficulty;
        this.firstPlayer = startingPlayer;

        this.board;
        this.moves;
        this.pc;

        this.begin = function () {
            this.board = new createBoardGame(size);
            this.pc = new AI(this.difficulty);
            this.moves = 0;

            gamePlaying = true;

            var elem = document.getElementById("showGame");
            while (elem.firstChild) {
                elem.removeChild(elem.firstChild);
                // console.log(elem + "| teste");
            }

            this.board.createBoard();


            this.changeGameMessages();

            if (this.firstPlayer == "pc") {
                // setTimeout(function() {this.pc.play(); }, 1500);
                setTimeout(() => { this.pc.play(); }, 2000);
                // this.firstPlayer = "player";
                // console.log("O BACANO ESTÁ A JOGAR SOZINHO ?????");
                // console.log("Posso jogar agora??");
            }

        };

        this.validPlayerPlay = function () {
            if((this.moves % 2 == 0 && this.firstPlayer == "player") || (this.moves % 2 != 0 && this.firstPlayer != "player")) {
                return true;
            }
            return false;
        }
        this.validPCPlay = function () {
            if((this.moves % 2 == 0 && this.firstPlayer == "pc") || (this.moves % 2 != 0 && this.firstPlayer != "pc")) {
                return true;
            }
            return false;
        }
        this.changeGameMessages = function () {
            let gMessage = document.getElementById("gameMessages");
            //console.log("gMessage: " + gMessage);
            if (this.validPlayerPlay()) {
                gMessage.innerHTML = "<h1>" + username + "'s going to play now!</h1>";
            }
            else {
                gMessage.innerHTML = "<h1>Computer is playing...</h1>";
            }
        };

        this.deletePiece = function (x, y) {
            for (var i = y; i < this.board.boardPieces[x]; i++) {
                // var toBeDeleted = document.getElementById("piece x-" + x + " y:" + i);
                // toBeDeleted.className = "pieceDeleted";
                // toBeDeleted.style.visibility = "hidden";
                document.getElementById("piece x-" + x + "y:" + i).className = "pieceDeleted";
            }

            this.board.boardPieces[x] = y;
            
            if (this.checkGameOver() == true) {
                this.endGame(false);
                return;
            }


            this.moves++;

            if (gamePlaying == true) this.changeGameMessages();

            if (this.validPCPlay() && gamePlaying == true) {
                // console.log("pc move TESTE");
                // if (this.firstPlayer == "pc") {
                // console.log("pc move TESTE AFTER IF");
                setTimeout(() => { this.pc.play(); }, 2000);
                // console.log("ESTÁ A JOGAR SOZINHO ????? 222");
            }
        };

        this.checkGameOver = function () {
            for (var i = 0; i < this.board.boardPieces.length; i++) {
                if (this.board.boardPieces[i] > 0)
                    return false;
            }
            return true;
        };

        this.endGame = function (giveUp) {
            if(giveUp == true) {
                document.getElementById("gameMessages").innerHTML = "<h1>"+ username + "gave up!<br>The Computer won!</h1>";
                var tdId = document.getElementById("pcTable" + this.difficulty);
                var modeTotal = document.getElementById("gameModeTotal" + this.difficulty);
                var total = document.getElementById("pcTableTotal");
                tdId.innerHTML = ++tdId.innerHTML;
                modeTotal.innerHTML = ++modeTotal.innerHTML;
                total.innerHTML = ++total.innerHTML;
            }
            else if ((this.moves % 2 == 0 && this.firstPlayer == "player") || (this.moves % 2 != 0 && this.firstPlayer != "player")) {
                document.getElementById("gameMessages").innerHTML = "<h1>" + username + " won!</h1>";
                // var tempId = "userTable" + this.difficulty; 
                var tdId = document.getElementById("userTable" + this.difficulty);
                var modeTotal = document.getElementById("gameModeTotal" + this.difficulty);
                var total = document.getElementById("userTableTotal");
                
                // console.log(tdId);
                // var val = ++tdId.innerHTML;
                tdId.innerHTML = ++tdId.innerHTML;
                modeTotal.innerHTML = ++modeTotal.innerHTML;
                total.innerHTML = ++total.innerHTML;
            }
            else {
                document.getElementById("gameMessages").innerHTML = "<h1>The Computer won!</h1>";
                var tdId = document.getElementById("pcTable" + this.difficulty);
                var modeTotal = document.getElementById("gameModeTotal" + this.difficulty);
                var total = document.getElementById("pcTableTotal");
                tdId.innerHTML = ++tdId.innerHTML;
                modeTotal.innerHTML = ++modeTotal.innerHTML;
                total.innerHTML = ++total.innerHTML;
            }

            gamePlaying = false;

            document.getElementById("playAgainButton").style.display = "block";
            document.getElementById("boardDiv").style.display = "none";
            document.getElementById("leaveGame").style.display = "none";        
        };

    }
}

function buttonLeave() {
    if(confirm("Are you sure you want to give up?")) {
        game.endGame(true);  
    }
    else return;
}

class AI {
    constructor(difficulty) {
        this.difficulty = difficulty;

        this.easyPlay = function () {
            while (true) {
                var x = Math.floor(Math.random() * game.board.boardPieces.length);
                if (game.board.boardPieces[x] > 0) {
                    var y = Math.floor(Math.random() * game.board.boardPieces[x]);

                    game.deletePiece(x, y);

                    break;
                }
            }
        };

        this.hardPlay = function () {
            for (var i = 0; i < game.board.boardPieces.length; i++) {
                for (var j = 0; j < game.board.boardPieces[i]; j++) {
                    var temp = game.board.boardPieces[i];
                    game.board.boardPieces[i] = j;
                    if (this.xor() != 0) {
                        game.board.boardPieces[i] = temp;
                    }
                    else {
                        game.board.boardPieces[i] = temp;
                        game.deletePiece(i, j);

                        return;
                    }
                }
            }
            var x = Math.floor(Math.random() * game.board.boardPieces.length);
            while (game.board.boardPieces[x] == 0)
                x = Math.floor(Math.random() * game.board.boardPieces.length);
            game.deletePiece(x, game.board.boardPieces[x] - 1);
        };

        this.xor = function () {
            var value = 0;
            for (var i = 0; i < game.board.boardPieces.length; i++)
                value ^= game.board.boardPieces[i];

            return value;
        };

        this.play = function () {
            if (this.dif == "Easy") {
                this.easyPlay();
            } else if (this.dif == "Medium") {
                var randomN = Math.ceil(Math.random() * 10);
                if (randomN%2 == 0)
                    this.easyPlay();
                else
                    this.hardPlay();
            } else {
                this.hardPlay();
            }
        };
    }
}
class Piece {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.pieceNewDiv = document.createElement("img");
        this.pieceNewDiv.className = "piece";
        this.pieceNewDiv.id = "piece x-" + x + "y:" + y;
        this.pieceNewDiv.src = "piece.png";

        this.pieceNewDiv.onmouseover = function () {
            if (this.className != "pieceDeleted" && this.valid()) {
                this.className = "pieceHovered";
                var length = this.id.length;
                var tempT = this.id.indexOf("-");
                var tempP = this.id.indexOf(":");
                var x = parseInt(this.id.slice(tempT + 1, tempP - 1));
                var y = parseInt(this.id.slice(tempP + 1, length));
                for (; y < game.board.boardPieces[x]; y++) {
                    var tId = "piece x-" + x + "y:" + y;
                    document.getElementById(tId).className = "pieceHovered";
                }
            }
        };

        this.pieceNewDiv.onmouseleave = function () {
            if (this.className != "pieceDeleted" && this.valid()) {
                this.className = "piece";
                var length = this.id.length;
                var tempT = this.id.indexOf("-");
                var tempP = this.id.indexOf(":");
                var x = parseInt(this.id.slice(tempT + 1, tempP - 1));
                var y = parseInt(this.id.slice(tempP + 1, length));
                for (; y < game.board.boardPieces[x]; y++) {
                    var tId = "piece x-" + x + "y:" + y;
                    document.getElementById(tId).className = "piece";
                }
            }
        };

        this.pieceNewDiv.onclick = function () {
            if (this.className != "pieceDeleted" && this.valid()) {
                this.deletePiece();
            }
        };

        this.pieceNewDiv.deletePiece = function () {
            var length = this.id.length;
            var tempT = this.id.indexOf("-");
            var tempP = this.id.indexOf(":");
            var x = parseInt(this.id.slice(tempT + 1, tempP-1));
            var y = parseInt(this.id.slice(tempP + 1, length));

            game.deletePiece(x, y);
        };

        this.pieceNewDiv.valid = function () {
            if ((game.moves%2 == 0 && game.firstPlayer == "player") || (game.moves % 2 != 0 && game.firstPlayer != "player"))
                return true;
            return false
        };
    }
}
