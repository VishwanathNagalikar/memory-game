//let array = ["apple","apple","ball","ball","cat","cat","dog","dog","energy","energy","fan","fan","god","god","hut","hut"];
let cardList = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let openCards = [];
let memory_tile_ids = [];
let shuffledArray = [];
let tilesFlipped = 0;

// declaring variables for no of moves
let moves=0;
let numOfMoves=document.querySelector('.moves');

// stars
let stars = document.querySelectorAll(".fa-star");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 let modal = document.getElementById("popup1");


 // New Game 
function newGame() {
    tilesFlipped = 0;
    let output = '';
    shuffledArray = shuffle(cardList);
    for (var i = 0; i < shuffledArray.length; i++) {
        let passingElement = shuffledArray[i];
        output += '<li id="tile_' + i + '" onclick="flipTile(this,\'' + shuffledArray[i] + '\')"></li>';
        //output += '<li id="tile_'+i+'" shuffledArray[i].addEventListene(\'click\',flipTile(this,\''+shuffledArray[i]+'\'))"></li>';

    }
    document.getElementById('deck').innerHTML = output;
}

 // Reset the Game
 function resetGame(){
    moves = 0;
    numOfMoves.innerHTML = moves;
    // reset stars
    for (var i= 0; i < stars.length; i++){
        stars[i].className = "fa fa-star";
    }
    //reset GameTime
    second = 0;
    minute = 0; 
     let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    newGame();
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function flipTile(card, value) {

    // element.add("show");
    // element.classList.add("open");

    if (card.innerHTML == "" && openCards.length < 2) {
        //flipping happens here when clciked
        card.style.color = '#FFF';
        card.innerHTML = getimage(value);
        // console.log("working");
        if (openCards.length == 0) {
            openCards.push(value);
            memory_tile_ids.push(card.id);
        } else if (openCards.length == 1) {
            openCards.push(value);
            memory_tile_ids.push(card.id);
            moveCounter();


            if (openCards[0] == openCards[1]) {
                tilesFlipped += 2;
                // increase counter and Clear both arrays
                                openCards = [];
                memory_tile_ids = [];

                // Check to see if the whole tiles are flipped is
                if (tilesFlipped == shuffledArray.length) {
                     winner();
                    //alert("Board cleared... generating new Game");
                    //document.getElementById('deck').innerHTML = "";
                    
                    //newGame();
                }
            } else {
                function flipBack() {
                    // flipping the non-matched tiles back 
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);

                    
                    tile_1.innerHTML = "";

                    tile_2.innerHTML = "";
                    // Clear both arrays

                    openCards = [];
                    memory_tile_ids = [];
                }
                setTimeout(flipBack, 300);
            }
        }
    }


}

// this function gets the images which appear on the tiles
function getimage(image){
    let string=""
    switch(image){
        case 'A':  return string+=`<i class="fa fa-diamond"></i>`;
                    break;
        case 'B':  return string+=`<i class="fa fa-paper-plane-o"></i>`;
                    break;
        case 'C':  return string+=`<i class="fa fa-anchor"></i>`;
                    break;
        case 'D':  return string+=`<i class="fa fa-bolt"></i>`;
                    break;
        case 'E':  return string+=`<i class="fa fa-cube"></i>`;
                    break;
        case 'F':  return string+=`<i class="fa fa-leaf"></i>`;
                    break;
        case 'G':  return string+=`<i class="fa fa-bicycle"></i>`;
                    break;
        case 'H':  return string+=`<i class="fa fa-bomb"></i>`;
                    break;
        default : return string+="";            
    }
}

// track Game Time
let second = 0, minute = 0; 
let timer = document.querySelector(".timer");
let interval;
function startGameTime(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
    },1000);
}

// moves calculation
function moveCounter(){
    moves++;
    numOfMoves.innerHTML = moves;
    if(moves == 1){
        second = 0;
        minute = 0; 
        startGameTime();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 16){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].className = "fa fa-star-o";
            }
        }
    }
    else if (moves > 17){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].className = "fa fa-star-o";
            }
        }
    }
}

// A popup modal to that appears when the user wins the game.
function winner(){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        modal.classList.add("show");

        let starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
}

function playAgain(){
    modal.classList.remove("show");
    resetGame();  // should be resetGame();
}
window.addEventListener('onload', newGame());