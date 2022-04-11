'use strict';

//Selecting the elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNewEl = document.querySelector('.btn--new');
const rollDiceEl = document.querySelector('.btn--roll');

const btnHoldEl = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let currentScore,scores,playing,activePlayer;

const diceEL = document.querySelector('.dice');

const init = () =>{
   currentScore = 0;
   scores = [0,0];
   playing = true;
   activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEL.classList.add('hidden');
  player0El.classList.remove('player--winner');
  diceEL.classList.add('hidden');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  
};

init();


//Initializing the scores to zero
  

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  if (player0El.classList.contains('player--active')) {
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  } else {
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
  }
};





//Rolling dice functionality

rollDiceEl.addEventListener('click', () => {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    //If the dice is not 1 then add the score to the current score
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHoldEl.addEventListener('click', () => {
  
  if(playing){

  //Global score
  scores[activePlayer] = scores[activePlayer] + currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  //If the score is greater than 100 then the player is winner

  if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add('hidden');
      
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
}
});

//Resetting the game
btnNewEl.addEventListener('click', init);
