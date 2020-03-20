
const helpModal = document.getElementById('helpModal');
var diffvalue;
var picvalue;


function init()
{
picvalue=document.getElementById('pictures').value;
  
if(picvalue==10)
{
 document.getElementById("row5").disabled = false;
 var result_style = document.getElementById('row5').style;
 result_style.display = '';
 changeclass5();
}
if(picvalue==12)
{
 var result_style1 = document.getElementById('row5').style;
 result_style1.display = '';
 var result_style2 = document.getElementById('row6').style;
 result_style2.display = '';
 changeclass5();
 changeclass6();
}
  
  startGame();
}

function changeclass5()
{
 var NAME = document.getElementById("r51");
 NAME.className="game-card";
 
 var NAME = document.getElementById("r52");
 NAME.className="game-card";

 var NAME = document.getElementById("r53");
 NAME.className="game-card";

 var NAME = document.getElementById("r54");
 NAME.className="game-card";

 var NAME1 = document.getElementById("game-card-img51");
 NAME1.className="game-card-img";
 
 var NAME1 = document.getElementById("game-card-img52");
 NAME1.className="game-card-img";

 var NAME1 = document.getElementById("game-card-img53");
 NAME1.className="game-card-img";
 
 var NAME1 = document.getElementById("game-card-img54");
 NAME1.className="game-card-img";
}


function changeclass6()
{
 var NAME = document.getElementById("r61");
 NAME.className="game-card";
 
 var NAME = document.getElementById("r62");
 NAME.className="game-card";

 var NAME = document.getElementById("r63");
 NAME.className="game-card";

 var NAME = document.getElementById("r64");
 NAME.className="game-card";

 var NAME1 = document.getElementById("game-card-img61");
 NAME1.className="game-card-img";
 
 var NAME1 = document.getElementById("game-card-img62");
 NAME1.className="game-card-img";

 var NAME1 = document.getElementById("game-card-img63");
 NAME1.className="game-card-img";
 
 var NAME1 = document.getElementById("game-card-img64");
 NAME1.className="game-card-img";
}

function openHelpModal() {
    helpModal.classList.add('show-modal');
}

function closeHelpModal() {
    helpModal.classList.remove('show-modal');
}

// Main Game Play

var cardElements;
var cardElementsArray;
var imgElements;
var imgElementsArray;
let starElements = document.getElementsByClassName('star');
let starElementsArray = [...starElements];
let counter = document.getElementById('moveCounter');
let timer = document.getElementById('timer');
let modalElement = document.getElementById('gameOverModal');
let totalGameMovesElement = document.getElementById('totalGameMoves');
let totalGameTimeElement = document.getElementById('totalGameTime');
let finalStarRatingElement = document.getElementById('finalStarRating');
let closeModalIcon = document.getElementById('closeModal');
let openedCards = [];
let matchedCards =  [];
let moves;
let second = 0,
    minute = 0,
    hour = 0,
    interval,
    totalGameTime,
    starRating;
 
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !==0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startGame() {

cardElements = document.getElementsByClassName('game-card');
cardElementsArray = [...cardElements];
imgElements = document.getElementsByClassName('game-card-img');
imgElementsArray = [...imgElements];

    //shuffle cards
    let shuffledImages = shuffle(imgElementsArray);


    for(i=0; i<shuffledImages.length; i++) {
        //remove all images from previous games from each card (if any)
        cardElements[i].innerHTML = "";

        //add the shuffled images to each card
        cardElements[i].appendChild(shuffledImages[i]);
        cardElements[i].type = `${shuffledImages[i].alt}`;

        //remove all extra classes for game play
        cardElements[i].classList.remove("show", "open", "match", "disabled");
        cardElements[i].children[0].classList.remove("show-img");
    }

    //listen for events on the cards
    for(let i = 0; i < cardElementsArray.length; i++) {
        cardElementsArray[i].addEventListener("click", displayCard)
    }

    //when game starts show all the cards for a split second
    flashCards();

    //reset moves
    moves = 0;
    counter.innerText = `${moves} move(s)`;

    //reset star rating
    for(let i=0; i<starElementsArray.length; i++) {
        starElementsArray[i].style.opacity = 1;
    }

    //Reset Timer on game reset
    timer.innerHTML = '0 mins 0 secs';
    clearInterval(interval);
}

function flashCards() {

   var diffvalue=document.getElementById('difficulty').value; 

    for(i=0; i<cardElements.length; i++) {
        cardElements[i].children[0].classList.add("show-img")
    }
    if(diffvalue==3)
    {
    setTimeout(function(){
        for(i=0; i<cardElements.length; i++) {
            cardElements[i].children[0].classList.remove("show-img")
        }
    }, 3000)
   }
   else if(diffvalue==5)
   {
     setTimeout(function(){
        for(i=0; i<cardElements.length; i++) {
            cardElements[i].children[0].classList.remove("show-img")
        }
    }, 5000)

   }
   else
   {
 setTimeout(function(){
        for(i=0; i<cardElements.length; i++) {
            cardElements[i].children[0].classList.remove("show-img")
        }
    }, 10000)

  }
}

function displayCard() {
    this.children[0].classList.toggle('show-img');
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
    cardOpen(this);
}

function cardOpen(card) {
    openedCards.push(card);
    let len = openedCards.length;
    if(len === 2) {
        moveCounter();
        if(openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}

function matched() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    matchedCards.push(openedCards[0]);
    matchedCards.push(openedCards[1]);
    openedCards = [];
    if(picvalue==8)
    {
    if(matchedCards.length == 16) {
        endGame();
    }
   }
   else if(picvalue==10)
    {
    if(matchedCards.length == 20) {
        endGame();
    }
   }
   if(picvalue==12)
    {
    if(matchedCards.length == 24) {
        endGame();
    }
   }
}

function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        openedCards[0].children[0].classList.remove('show-img');
        openedCards[1].children[0].classList.remove('show-img');
        enable();
        openedCards = [];
        
    }, 1100)
}

function disable() {
    cardElementsArray.filter((card, i, cardElementsArray) => {
        card.classList.add('disabled');
    })
}

function enable() {
    cardElementsArray.filter((card, i, cardElementsArray) => {
        card.classList.remove('disabled');
        for(let i=0; i<matchedCards.length; i++) {
            matchedCards[i].classList.add('disabled');
        }
    })
}

function moveCounter() {
    moves++;
    counter.innerHTML = `${moves} move(s)`;

    if(moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }

    //setting rating based on moves
    if(moves > 8 && moves <= 12) {
        for(let i=0; i<5; i++) {
            starElementsArray[i].opacity = 1; 
        }
    } else if(moves > 12 && moves <= 16) {
        for(let i=0; i<5; i++) {
            if(i > 3) {
                starElementsArray[i].style.opacity = 0.1;
            }
        }
    } else if(moves > 16 && moves <= 20) {
        for(let i=0; i<5; i++) {
            if(i > 2) {
                starElementsArray[i].style.opacity = 0.1;
            }
        }
    } else if(moves > 20 && moves <= 24) {
        for(let i=0; i<5; i++) {
            if(i > 1) {
                starElementsArray[i].style.opacity = 0.1;
            }
        }
    } else if(moves > 24){
        for(let i=0; i<5; i++) {
            if(i > 0) {
                starElementsArray[i].style.opacity = 0.1;
            }
        }
    }
}

function startTimer() {
  if(picvalue==8)
{
    interval = setInterval(function(){
        timer.innerHTML = `${second} secs`;
        second++;
       if(second>120)
       {
          stopGame();
        }
       }, 1000)
}

else if(picvalue==10)
{
    interval = setInterval(function(){
        timer.innerHTML = `${second} secs`;
        second++;
       if(second>150)
       {
          stopGame();
        }
       }, 1000)
}
else
{
    interval = setInterval(function(){
        timer.innerHTML = `${second} secs`;
        second++;
       if(second>180)
       {
          stopGame();
        }
       }, 1000)

}


}

function stopGame() {
 clearInterval(interval);
 totalGameTime = timer.innerHTML;

 var timeovermsg="You have exceeded the time limit!!!";
 document.getElementById('msg').innerHTML=timeovermsg;

 var notmsg="You didn't complete the Game!!Try Next time";
  document.getElementById('not').innerHTML=notmsg;

 starRating=0;

 //show modal on game end
    modalElement.classList.add("show-modal");

   finalStarRatingElement.innerHTML = starRating;
    
    matchedCards = [];
    closeModal();

}



function endGame() {
    clearInterval(interval);
    totalGameTime = timer.innerHTML;
    starRating = document.querySelector('.rating').innerHTML;

    //show modal on game end
    modalElement.classList.add("show-modal");
    
    //show totalGameTime, moves and finalStarRating in Modal
    totalGameTimeElement.innerHTML = totalGameTime;
    totalGameMovesElement.innerHTML = moves;
    finalStarRatingElement.innerHTML = starRating;

    matchedCards = [];
    closeModal();
}

function closeModal() {
    closeModalIcon.addEventListener("click", function() {
        modalElement.classList.remove("show-modal");
        startGame();
    })
}

function playAgain() {
    modalElement.classList.remove("show-modal");
    startGame();
}

// wait for some milliseconds before game starts
//window.onload = function () {
//   setTimeout(function() {
//      init()
//    }, 1000);
//}

