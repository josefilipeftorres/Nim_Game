var majorSections = ["intro", "info", "configuration", "game"];
var confDivs = ["gameForm", "howToPlay", "gameRules", "showTable"];

// Major Divs
function loadMainPage(){
	for(var i=0; i<majorSections.length; i++)
		document.getElementById(majorSections[i]).style.display = "none";

	document.getElementById("intro").style.display = "flex";
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
    for(var i = 0; i < confDivs.length; i++)
		document.getElementById(confDivs[i]).style.display = "none"    
	
    document.getElementById("configuration").style.display = "flex";
	document.getElementById("game").style.display = "flex";
    document.getElementById("gameForm").style.display = "block";
	
    document.getElementById("header").style.background = "#5468FF";
}

// Login Div
function loginBox() {
    document.getElementById("showLogin").style.display = 'block';
    document.getElementById("playButton").style.display = 'none';
}

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
		document.getElementById(classTableDiv).innerHTML = "0";
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
    if(confirm("Are you sure you want to give up?"))
        game.endGame(true);  
    else return;
}


var buttonDiv = ["playButton", "gameButton", "buttonLeave", "buttonCont", 
				 "classificationButton", "playAgainButton"]
function logOut() {
    if (confirm("Are you sure you want to leave?")) {
        // username = undefined;
        // password = undefined;
        loadMainPage();
        
		for (var i = 0; i < buttonDiv.length; i++)
			document.getElementById(buttonDiv[i]).style.display = "none"
		
		document.getElementById("playButton").style.display = 'inline-block';

        document.getElementById("showLogin").style.display ='none';
        document.getElementById("gameMessages").style.display = "none";
        document.getElementById("welcome").innerHTML = "";
        document.getElementById("userName").innerHTML = "";
        resetTable();
    }
}