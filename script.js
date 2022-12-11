var majorSections = ["intro", "info", "configuration", "game", "onlineRanksDiv"];
var confDivs = ["gameForm", "howToPlay", "gameRules", "showTable"];

// Major Divs
function loadMainPage(){
	for(var i=0; i<majorSections.length; i++)
		document.getElementById(majorSections[i]).style.display = "none";

	document.getElementById("intro").style.display = "flex";
    document.getElementById("header").style.background = "transparent";
    document.getElementById("userInputForm").reset();
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
    for(var i = 0; i < confDivs.length; i++)
		document.getElementById(confDivs[i]).style.display = "none"    
	
    document.getElementById("configuration").style.display = "flex";
	document.getElementById("game").style.display = "flex";
    document.getElementById("gameForm").style.display = "block";
	
    document.getElementById("header").style.background = "#5468FF";
}

// Login Div
// function loginBox() {
//     document.getElementById("showLogin").style.display = 'block';
//     // document.getElementById("playButton").style.display = 'none';
// }

// function logIn() {
    // document.getElementById("welcome").innerHTML = "Welcome, " + user.username + "!";
    
    // document.getElementById("showLogin").style.display = 'none';
    // document.getElementById("buttonCont").style.display = 'inline-block';
    // document.getElementById("buttonLeave").style.display = 'inline-block';
    
    // document.getElementById("gameButton").style.display = 'inline-block';
    // document.getElementById("buttonLeave").style.display = 'inline-block';
// }

// Tabela de classificações
var classTableDiv = ["userTableEasy", "userTableMedium", "userTableHard", "userTableTotal",
					 "pcTableEasy", "pcTableMedium", "pcTableHard", "pcTableTotal",
					 "gameModeTotalEasy", "gameModeTotalMedium", "gameModeTotalHard", "gameModeTotal"
					]
function resetTable() {
	for(var i = 0; i < classTableDiv.length; i++)
		document.getElementById(classTableDiv[i]).innerHTML = "0";
}

// HowToPlay, GameRules, ClassTable - Game DIV
function showHTP() {
	const htp = document.getElementById("howToPlay");
    if (htp.style.display != "none") {
        htp.style.display = "none";
        document.getElementById("gameForm").style.display = "block";
        return;
    }

    for(var i=0; i<confDivs.length; i++)
		document.getElementById(confDivs[i]).style.display = "none";

	htp.style.display = "block";
}
function showGRL() {
	const grl = document.getElementById("gameRules");
    if (grl.style.display != "none") {
        grl.style.display = "none";
        document.getElementById("gameForm").style.display = "block";
        return;
    }

    for(var i=0; i<confDivs.length; i++) 
		document.getElementById(confDivs[i]).style.display = "none";

    grl.style.display = "block";
}
function showTable() {
	const classTable = document.getElementById("showTable"); 
    if (classTable.style.display != "none") {
        classTable.style.display = "none";
        document.getElementById("gameForm").style.display = "block";
        return;
    }

    for(var i=0; i<confDivs.length; i++) 
		document.getElementById(confDivs[i]).style.display = "none";

    classTable.style.display = "block";
}
function closeHTP() {
    document.getElementById("howToPlay").style.display = "none";
    document.getElementById("gameForm").style.display = "block";
}
function closeGRL() {
    document.getElementById("gameRules").style.display = "none";
    document.getElementById("gameForm").style.display = "block";
}
function closeTBL() {
    document.getElementById("showTable").style.display = "none";
    document.getElementById("gameForm").style.display = "block";
}

// Player Form option
function singlePlayerForm() {
	document.getElementById("singlePlayerOptions").style.display = "block";
}
function multiPlayerForm() {
	document.getElementById("singlePlayerOptions").style.display = "none";
}

// Buttons
function contButton() {
    for(var i=0; i<majorSections.length; i++)
		document.getElementById(majorSections[i]).style.display = "none";

	document.getElementById("info").style.display = "flex";
}

function buttonLeave() {
    if (gameType == 0) {
        if(confirm("Are you sure you want to give up?"))
            game.endGame(true);  
        else 
            return;
    }
    else {
        game.leaveGame();
    }
    // if (gamePlaying == true) {
    //     if(confirm("Are you sure you want to give up?"))
    //         game.endGame(true);  
    //     else 
    //         return;
    // } else {
    //     if(confirm("Are you sure you want to leave?"))
    //         game.endGame("leaveQueue");
    //     else 
    //         return;
    // } 
}

var buttonDiv = ["gameButton", "buttonLeave", "buttonCont", 
				 "classificationButton", "playAgainButton"]
function logOut() {
    if (confirm("Are you sure you want to leave?")) {
        // username = undefined;
        // password = undefined;
        loadMainPage();
        
		for (var i = 0; i < buttonDiv.length; i++)
			document.getElementById(buttonDiv[i]).style.display = "none"
		
        document.getElementById("showLogin").style.display ='block';
        document.getElementById("gameMessages").style.display = "none";
        document.getElementById("welcome").innerHTML = "";
        document.getElementById("userName").innerHTML = "";
        document.getElementById("messageBox").innerHTML = "";
        document.getElementById("onlineRanks").style.display = "none";
        resetTable();
    }
}

function logBackPage() {
    document.getElementById("showLogin").style.display = "block";
    document.getElementById("buttonIn").style.display = "block";
    document.getElementById("registerPara").style.display = "block";
    document.getElementById("logBackPage").style.display = "none";
}

function showOnlineRanks() {
    for(var i=0; i<majorSections.length; i++)
		document.getElementById(majorSections[i]).style.display = "none";

    document.getElementById("header").style.background = "transparent";
    document.getElementById("onlineRanksDiv").style.display = "block";

    const rankingData = {
        "group": group,
        "size": 4
    }
    const rankingDataJSON = JSON.stringify(rankingData);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url + "ranking", true);

    var tb = "<tr>" +
                "<th>Player</th>" +
                "<th>Games</th>" +
                "<th>Wins</th>" +
                "<th>Losses</th>" +
            "</tr>";

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText)["ranking"];
            if (response != null) {
                for (var i = 0; i < response.length; i++) {
                    tb += "<tr>";
                    tb += "<td>" + response[i]["nick"] + "</td>";
                    tb += "<td>" + response[i]["games"] + "</td>";
                    tb += "<td>" + response[i]["victories"] + "</td>";
                    tb += "<td>" + (response[i]["games"] - response[i]["victories"]) + "</td>";
                    tb += "</tr>";
                    
                    // var obj = document.createElement("tr");
                    // obj.innerHTML = tb;
                    // document.getElementById("onlineRanksTable").appendChild(obj);
                }
            }
            document.getElementById("onlineRanksTable").innerHTML = tb;
        }
    }
    xhr.send(rankingDataJSON);
}
