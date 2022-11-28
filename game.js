var game,size;
var gamePlaying = false;

const url = 'http://twserver.alunos.dcc.fc.up.pt:8008'

var user = new User(null, null, '20');
function User(username, password, group) {
    this.username = username;
    this.password = password;
    this.group = group;
}

function registerButton() {
    document.getElementById("buttonIn").style.display = "none";
    document.getElementById("registerPara").style.display = "none";

    const button = document.getElementById("registerButton");
    button.addEventListener('click', () => {
        const _username = document.getElementById("userInput").value;
	    const _password = document.getElementById("passwordInput").value;
        
        if(!_username || !_password) {
            document.getElementById("messageBox").innerHTML = "Please fill the username/password camps!";
            return;
        } else {
            document.getElementById("messageBox").innerHTML = "";
            
            logData = {
                'nick': _username,
                'password': _password
            };
    
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url + '/register', false);
            xhr.send(JSON.stringify(logData));
    
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById("buttonIn").style.display = "block";
                document.getElementById("successMessage").style.display = "block";
                newUser = new User(document.getElementById("userInput").value, document.getElementById("passwordInput").value);
                // logIn(newUser);
            } else {
                alert(xhr.responseText);
                document.getElementById("userInputForm").reset();
                return;
            }
        }

    });
}

function logIn(_user) {
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
            
        } else {
            alert("Error");
        }
    });
}


function play() {
    const gameType = document.getElementById("gameTypeForm").gameOptions.value;
    // console.log(gameType);
    
    if (gameType == "singleplayer") {
        //recebe valores das configuracoes
        var difficulty  = document.getElementById("difficultyForm").difficultyOptions.value;
        var starter  = document.getElementById("startingForm").startingOptions.value;
        size = document.getElementById("boardSizeForm").boardSizeInput.value;
        
        // Verifica se o tamanho do tabuleiro é válido
        if (size%1 != 0 || size <= 0) { // Float or <= 0
            alert("Invalid board size!");
            return;
        }
    
        // Prepara os displays corretamente para o jogo
        document.getElementById("classificationButton").style.display = "inline-block";
        document.getElementById("playAgainButton").style.display = "none"; 
        document.getElementById("leaveGame").style.display = "block";
        document.getElementById("gameMessages").style.display = "block";
    
        document.getElementById("userName").innerHTML = user.username.slice(0,7);

        //cria o objeto jogo e começa
        game = new Game(difficulty, starter, size);
        game.begin();
    } else {
        size = document.getElementById("boardSizeForm").boardSizeInput.value;
        join(size);
    }
}
function join(size) {
    joinData = {
        'group': user.group,
        'nick': user.username,
        'password': user.password,
        'size': size
    };
        
    fetch(url + '/join', {
        method: 'POST',
        body:   JSON.stringify(joinData)
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
}
  
function _join(response) {
    //console.log(response.game);
    game.gameID = response.game;
    //console.log(game.gameID);
}
  
class createBoardGame {
    constructor(size) {
        //variavel para guardar a quantidade de peças por linha
        this.boardPieces = [];
        
        //tamanhos de colunas e linhas
        //no caso do x nos tentamos fazer a expressão algébrica para que o tabuleiro fosse apenas com números impares no entanto acabamos por não conseguir
        this.xSide = size*2-1;
        this.ySide = size;
        
        //boardPlace guarda toda a div do tabuleiro
        this.boardPlace;

        this.createBoard = function () {
            this.boardPlace = document.createElement("div");
            this.boardPlace.className = "boardDiv";
            this.boardPlace.id = "boardDiv";
          
            let show = document.getElementById("showGame");
            show.appendChild(this.boardPlace);

            //o for loop aqui serve para criar as linhas do tabuleiro
            for (let i = 0; i < this.ySide; i++) {
                //e colocamos o numero correto de peças nesssa linha no array
                this.boardPieces.push(i + 1);
                //criamos a div que vai conter as peças da linha
                let tempDiv = document.createElement("div");
                //damos um indice a essa div
                tempDiv.id = "row:" + i;
                tempDiv.className = "cellDiv";
                for (var j = i; j >= 0; j--) {
                    //criamos as peças
                    var piece = new Piece(i, j);
                    tempDiv.appendChild(piece.pieceNewDiv);
                }
                this.boardPlace.appendChild(tempDiv);
            }
        };
    }
}

//objeto jogo
class Game {
    constructor(difficulty, startingPlayer, size, gameID) {
        this.difficulty = difficulty;
        this.firstPlayer = startingPlayer;

        this.board;
        this.moves;
        this.pc;
        this.gameID;

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
                // setTimeout(function() {this.pc.play(); }, 1500);
                setTimeout(() => { this.pc.play(); }, 2000);
                // this.firstPlayer = "player";
                // console.log("O BACANO ESTÁ A JOGAR SOZINHO ?????");
                // console.log("Posso jogar agora??");
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
                // var toBeDeleted = document.getElementById("piece x-" + x + " y:" + i);
                // toBeDeleted.className = "pieceDeleted";
                // toBeDeleted.style.visibility = "hidden";
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
                // console.log("pc move TESTE");
                // if (this.firstPlayer == "pc") {
                // console.log("pc move TESTE AFTER IF");
                setTimeout(() => { this.pc.play(); }, 2000);
                // console.log("ESTÁ A JOGAR SOZINHO ????? 222");
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

class AI {
    constructor(difficulty) {
        this.difficulty = difficulty;

        //na easyPlay temos apenas um numero aleatorio entre entre 0 e numero linhas e depois entre esse numero e o numero de peças na linha
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
