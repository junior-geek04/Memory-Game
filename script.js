const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var count=0;
var temp=0;
var startTime, endTime, seconds;

function start() {
  startTime = new Date();
};

start();

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime; 

  timeDiff /= 1000;

  seconds = Math.round(timeDiff);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
  
    hasFlippedCard = false;
    secondCard = this;

    
    checkForMatch();
}

function checkForMatch() {


    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unFlipCards();


}

function disableCards() {
count++;
temp++
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
if(count==6){
end();
var min, sec, time;
min=Math.floor(seconds % 3600 / 60);
sec=Math.floor(seconds % 3600 % 60);
time=min+" min : "+sec+" sec";
document.getElementById("answer").value=count;
document.getElementById("flips").value= temp;
document.getElementById("timo").value= time;
alert("Congratulations Your score is "+ count +" in total count of "+temp+" and time taken is "+ min+" min : "+sec+" sec");

}
}

function unFlipCards() {
temp++;
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard))
