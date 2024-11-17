let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/
let isAutoPlaying=false;
let intervalId;
//const autoPlay=()=>{
   
//};
function autoPlay(){
  if(!isAutoPlaying){
    intervalId=setInterval(()=> {
    const playerMove=pickComputerMove();
    playGame(playerMove);
  },1000);
  isAutoPlaying=true;
} else{
  clearInterval(intervalId);
  isAutoPlaying=false;
}
}

document.body.addEventListener('keydown',(event)=>{
  if(event.key==='r'){
     playGame('rock');
  }
  else if(event.key==='p'){
    playGame('paper');
  }
  else if(event.key==='s'){
    playGame('scissors');
  }
 
});


function playGame(playerMove) {
  const computerMove = pickComputerMove();

  document.querySelector('.js-rock-button').addEventListener('click',()=>{
     playGame('rock');
  });
  document.querySelector('.js-paper-button').addEventListener('click',()=>{
    playGame('paper');
 });
 document.querySelector('.js-scissors-button').addEventListener('click',()=>{
  playGame('scissors');
});


      const Moves = {
        ROCK: 'rock',
        PAPER: 'paper',
        SCISSORS: 'scissors',
      };

      const Results = {
        WIN: 'You win.',
        LOSE: 'You lose.',
        TIE: 'Tie.',
      };
      const rules = {
        [Moves.ROCK]: { [Moves.ROCK]: Results.TIE, [Moves.PAPER]: Results.LOSE, [Moves.SCISSORS]: Results.WIN },
        [Moves.PAPER]: { [Moves.ROCK]: Results.WIN, [Moves.PAPER]: Results.TIE, [Moves.SCISSORS]: Results.LOSE },
        [Moves.SCISSORS]: { [Moves.ROCK]: Results.LOSE, [Moves.PAPER]: Results.WIN, [Moves.SCISSORS]: Results.TIE },
      };

    const result = rules[playerMove][computerMove];

    if (result === Results.WIN) {
      score.wins += 1;
    } else if (result === Results.LOSE) {
      score.losses += 1;
    } else if (result === Results.TIE) {
      score.ties += 1;
    }


  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML =`You <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.floor(Math.random() * 3); 
  let computerMove = '';
  if (randomNumber === 0) {
    computerMove = 'rock';
  } else if (randomNumber === 1) {
    computerMove = 'paper';
  } else if (randomNumber === 2) {
    computerMove = 'scissors';
  }

  return computerMove;
}
