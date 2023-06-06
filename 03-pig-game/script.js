'use strict';
//select the buttons
const btnCloseNew=document.querySelector(".btn--new");
const btnRoll=document.querySelector(".btn--roll");
const btnHold=document.querySelector(".btn--hold");
//select image
const imgDice=document.querySelector(".dice");
//current score paragraphs
const playerOneCurrent=document.getElementById("current--0");
const playerTwoCurrent = document.getElementById("current--1");
//total score elements
const playerOneTotal = document.getElementById("score--0");
const playerTwoTotal = document.getElementById("score--1");
//players sections
const sectionPlayerOne= document.querySelector(".player.player--0");
const sectionPlayerTwo = document.querySelector(".player.player--1");


//starting conditions
playerOneCurrent.textContent=0;
playerTwoCurrent.textContent=0;
playerOneTotal.textContent = 0;
playerTwoTotal.textContent = 0;
imgDice.classList.add("hidden");
let playing=true; //or disable the buttons
let current_score=0;
let activePlayer=0;   //set initial active active player as player 1; 
const scores=[0, 0]; //the final scores accumulated by both players
//change player function
function changePlayer() {
    document.getElementById(`current--${activePlayer}`).textContent =0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        current_score=0;
        sectionPlayerOne.classList.toggle("player--active");
        sectionPlayerTwo.classList.toggle("player--active");
}

//rolling dice functionality
btnRoll.addEventListener("click", ()=> {
    //generate a random dice roll
    let randomValue = Math.trunc(Math.random() * 6) + 1;
    //display dice
    imgDice.classList.remove("hidden");
    imgDice.src=`/03-pig-game/images/dice-${randomValue}.png`;
    //check for rolled 1: if true, switch to the next player
    if(randomValue === 1) {
        //change the player
        changePlayer()
    } else {
    current_score+=randomValue;
    document.getElementById(`current--${activePlayer}`).textContent=current_score;
    }
    
}) 


btnHold.addEventListener("click", () => {
    //add current score to active player's score
    scores[activePlayer] += current_score;
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
    current_score=0;
    document.getElementById(`current--${activePlayer}`).textContent = current_score;
    //check if score is at least 100
    if(scores[activePlayer] >= 10) {
      //if so, finish the game
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
      imgDice.classList.add("hidden");
      btnHold.disable=true;
      btnRoll.disabled=true;
    } else {
      //if not, change the player
      changePlayer();
    }
})


btnCloseNew.addEventListener("click", ()=> {
    btnHold.disable = false;
    btnRoll.disabled = false;
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
    activePlayer=0;
    document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
    playerOneCurrent.textContent=0;
    playerTwoCurrent.textContent =0;
    playerOneTotal.textContent=0;
    playerTwoTotal.textContent=0;
})





