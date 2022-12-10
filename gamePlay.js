class createBoardGame {
    constructor(size) {
        this.boardPieces = [];
        
        //tamanhos de colunas e linhas
        //no caso do x nos tentamos fazer a expressão algébrica para que o tabuleiro fosse apenas com números impares no entanto acabamos por não conseguir
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

function resetGame() {
    const gameDiv = document.getElementById("showGame");
    while (gameDiv.firstChild) {
        gameDiv.removeChild(gameDiv.firstChild);
    }
}

// Offline Game
class Game {
    constructor(difficulty, startingPlayer, size) {
        this.difficulty = difficulty;
        this.firstPlayer = startingPlayer;

        this.board;
        this.moves;
        this.pc;

        //jogo começa aqui
        this.begin = function () {
            this.board = new createBoardGame(size);
            this.pc = new AI(this.difficulty);
            this.moves = 0;

            gamePlaying = true;

            //remove tudo o que existia anteriormente no tabuleiro
            var elem = document.getElementById("showGame");
            while (elem.firstChild) {
                elem.removeChild(elem.firstChild);
                // console.log(elem + "| teste");
            }
            //cria o tabuleiro
            this.board.createBoard();

            //update as mensagens do jogo
            this.changeGameMessages();

            if (this.firstPlayer == "pc") {
                setTimeout(() => { this.pc.play(); }, 2000);
            }

        };
        //verifica se o jogador pode jogar
        this.validPlayerPlay = function () {
            if((this.moves % 2 == 0 && this.firstPlayer == "player") || (this.moves % 2 != 0 && this.firstPlayer != "player")) {
                return true;
            }
            return false;
        }
        //verifica se o pc pode jogar
        this.validPCPlay = function () {
            if((this.moves % 2 == 0 && this.firstPlayer == "pc") || (this.moves % 2 != 0 && this.firstPlayer != "pc")) {
                return true;
            }
            return false;
        }

        //update das mensagens conforme as funções anteriores
        this.changeGameMessages = function () {
            let gMessage = document.getElementById("gameMessages");
            //console.log("gMessage: " + gMessage);
            if (this.validPlayerPlay()) {
                gMessage.innerHTML = "<h1>" + user.username + "'s going to play now!</h1>";
            }
            else {
                gMessage.innerHTML = "<h1>Computer is playing...</h1>";
            }
        };

        //elimina a peça do tabuleiro através do seu indice
        this.deletePiece = function (x, y) {
            for (var i = y; i < this.board.boardPieces[x]; i++) {
                document.getElementById("piece x-" + x + "y:" + i).className = "pieceDeleted";
            }

            //coloca no array o numero de peças que restam
            this.board.boardPieces[x] = y;
            
            //verifica se o jogo acabou
            if (this.checkGameOver() == true) {
                this.endGame(false);
                return;
            }

            //incrementa moves que serve para ver os turnos
            this.moves++;

            //atualiza o tabuleiro
            if (gamePlaying == true) this.changeGameMessages();

            if (this.validPCPlay() && gamePlaying == true) {
                setTimeout(() => { this.pc.play(); }, 2000);
            }
        };

        //percorre array de peças e verifica se esta vazio
        this.checkGameOver = function () {
            for (var i = 0; i < this.board.boardPieces.length; i++) {
                if (this.board.boardPieces[i] > 0)
                    return false;
            }
            return true;
        };

        //termina o jogo e atualiza as classificações no caso do jogador ter ganho, o pc ter ganho ou jogador desistiu
        this.endGame = function (giveUp) {
            if(giveUp == true) {
                document.getElementById("gameMessages").innerHTML = "<h1>"+ user.username + " gave up!<br>The Computer won!</h1>";
                var tdId = document.getElementById("pcTable" + this.difficulty);
                var modeTotal = document.getElementById("gameModeTotal" + this.difficulty);
                var total = document.getElementById("pcTableTotal");
                tdId.innerHTML = ++tdId.innerHTML;
                modeTotal.innerHTML = ++modeTotal.innerHTML;
                total.innerHTML = ++total.innerHTML;
            }
            else if ((this.moves % 2 == 0 && this.firstPlayer == "player") || (this.moves % 2 != 0 && this.firstPlayer != "player")) {
                document.getElementById("gameMessages").innerHTML = "<h1>" + user.username + " won!</h1>";
                // var tempId = "userTable" + this.difficulty; 
                var tdId = document.getElementById("userTable" + this.difficulty);
                var modeTotal = document.getElementById("gameModeTotal" + this.difficulty);
                var total = document.getElementById("userTableTotal");
                

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
// End of Offline Game


// Online Game
class onlineGame {
    constructor(gameId, size) {
        this.gameId = gameId;
        this.size = size;

        this.turn;
        this.board;
        
        this.begin = function (firstPlayer) {
            this.board = new createBoardGame(this.size);
            this.board.createBoard();


            this.turn = firstPlayer;
            this.changeGameMessages();

        };

        this.changeGameMessages = function() {
            clearTimeout(timeOutMessage);
            let gameMessages = document.getElementById("gameMessages");
            gameMessages.innerHTML = "It's " + this.turn + "'s turn";
        };

        this.deletePiece = function (x, y) {
            const notifyData = {
                'nick': username,
                'password': password,
                'game': this.gameId,
                "stack": x,
                "pieces": y
            };
            const notifyDatajson = JSON.stringify(notifyData);
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url + "notify", true);
            
            xhr.onreadystatechange = function() {
                if (xhr.status == 400) {
                    var response = JSON.parse(xhr.responseText);
                    if (response["error"]) {
                        const gameMessages = document.getElementById("gameMessages");
                        gameMessages.innerHTML = response["error"] + "!";
                        timeoutMessage = setTimeout("this.changeGameMessages", 2000);
                    }
                }
            }
            xhr.send(notifyDatajson);
        };

        this.deletePieceInGame = function (x, y) {
            for (var i = y; i < this.board.boardPieces[x]; i++) {
                document.getElementById("piece x-" + x + "y:" + i).className = "pieceDeleted";
            }
            
            this.board.boardPieces[x] = y;
        };

        this.checkGameOver = function () {
            this.checkGameOver = function () {
                for (var i = 0; i < this.board.boardPieces.length; i++) {
                    if (this.board.boardPieces[i] > 0)
                        return false;
                }
                return true;
            };
        };

        this.endGame = function (winner) {
            gamePlaying = false;
        
            document.getElementById("gameMessages").innerHTML = "The Game is Over! Congratulations " + winner + " won!"; 
            document.getElementById("leaveGame").style.display = "none";
            document.getElementById("playAgainButton").style.display = "inline-block";
            document.getElementById("timer").style.display = "none";
            clearTimeout(timer);
            eventSource.close();
        };

        this.leaveGame = function () {
            const leaveData = {
                "nick": username,
                "password": password,
                "game": this.gameId
            }
            const leaveDatajson = JSON.stringify(leaveData);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", url + "leave", true);
            
            xhr.onreadystatechange = function() {
                if (xhr.status == 400) {
                    clearTimeout(timeOutMessage);
                    document.getElementById("gameMessages").innerHTML = "Error! Bad Request.";
                }
            }
            xhr.send(leaveDatajson);

            clearInterval(timer);
        };
    }
}
// End of Online Game

