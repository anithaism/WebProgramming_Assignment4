var guess;
var correct; 
var turns;

var output;
var txtGuess;
var btnAgain;
var second;

var timer={secs:0, mins:0};

function init(){
   
    output = document.getElementById("display");
    txtGuess = document.getElementById("txtGuess");
    btnAgain = document.getElementById("again");
    btnAgain.style.display = "none";
    
    turns = 0;
    startTimerold();

    output.innerHTML = "Guess a number between 0 and 100. ";
    output.innerHTML += "I will tell you if it is high, low or correct. ";
    output.innerHTML += "You are allowed only 7 guesses!!! .";

    correct = parseInt(Math.random() * 100);
    console.log(correct);

   //  document.getElementById("txtGuess").addEventListener("click",startTimerold);
    
    new Audio('waves.mp3').play();
    txtGuess.focus();
  }

function startTimerold()
{
  d=new Date();
  d.setMinutes(0);
  d.setSeconds(0, 0);
  setInterval(function() {
  document.getElementById("min").innerHTML=d.getMinutes();
  document.getElementById("sec").innerHTML=d.getSeconds();
  d.setTime(d.getTime()+1000);
},1000);
    
}


function checkGuess(){
      turns++;
    if(turns<=7)
    {
    
    response = "Attempt No : "+ turns + " -  ";
    guess = parseInt(txtGuess.value);
    if (guess < correct){
      response += "The number is low";
      new Audio('wrong.mp3').play();
    } else if (guess > correct){
      response += "The number is high";
       new Audio('wrong.mp3').play();
    } else if (guess == correct){
      response += "Correct! It is the Secret number!!";
       new Audio('correct.mp3').play();
      btnAgain.style.display = "block";
    } else {
      response += "Please enter a number between 1 and 100";
    } 
    output.innerHTML = response;

   }
   else
   {
     output.innerHTML = "You LOST!!Your guess limit exceeded! The secret number is " +correct+"";;
     btnAgain.style.display = "block";
   }
  } 