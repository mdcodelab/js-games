'use strict';
//selecting elements
const guess=document.querySelector(".guess"); //input
const check=document.querySelector(".check"); //button
const message=document.querySelector(".message"); //paragraph
const number=document.querySelector(".number")//div displays the correct number
const score=document.querySelector(".score")//span
const again=document.querySelector(".again"); //reset button
const highestScore =document.querySelector(".highscore"); //span displays highest score 

//generate random number
let randomNum=Math.trunc(Math.random()*20 + 1 );

//initial scores
let scoreResult=20;
score.textContent=scoreResult;
let highest=0;
highestScore.textContent=highest;

//event adn game logic
check.addEventListener("click", ()=> {
   const guessNum = Number(guess.value);
//console.log(guessNumber);
//when there is no input
if(!guessNum) {
message.textContent="You must insert a number..."} 
//when player wins
else if (guessNum === randomNum) {
    message.textContent="Correct number!"
    scoreResult +=1;
    score.textContent = scoreResult;
    number.textContent = guessNum;
    document.querySelector("body").style.backgroundColor="green";
    number.style.width="30rem";
        if(score.textContent> highestScore.textContent) {
            highestScore.textContent=score.textContent;
        }
    //when guess is too low
}  else if (guessNum < randomNum) {
        if (scoreResult > 1) {
             message.textContent = "Your number is too low!";
             scoreResult -= 1;
             score.textContent = scoreResult;
              check.classList.add("disabled"); 
        } else {
            message.textContent="You lost the game!";
            scoreResult=20;
            score.textContent=scoreResult;
             check.disabled = true;
        }
//when guess is too high
} else if(guessNum > randomNum) {
    if (scoreResult > 1) {
        message.textContent = "Your number is too high!";
        scoreResult -= 1;
        score.textContent = scoreResult;
         
    } else {
        message.textContent = "You lost the game!";
        scoreResult -= 1;
        score.textContent = scoreResult;
         check.disabled = true;
    }
}

again.addEventListener("click", ()=> {
scoreResult=20;
score.innerHTML = scoreResult;  //set score=0;
randomNum = Math.trunc(Math.random() * 20 + 1); //reset number num
message.textContent="Start guessing..." //reset the message
guess.value = "";
document.querySelector("body").style.backgroundColor="#222";
number.textContent="?"
number.style.width = "15rem";
})



})
