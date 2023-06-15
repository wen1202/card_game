const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var score = 0;


function flipCard() {
  // 剛剛沒配對成功的話，就把牌蓋起來
  if (lockBoard) return;

  // 避免翻同一張牌當做第二張
  if (this === firstCard) return;
  
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this; // this => the clicked card
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  // 如果牌組配對成功 => isMatch
  // 就不可以再點擊那組牌 => disableCards()
  // 配對錯誤就把該牌組蓋起來 => unflipCards()
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if(isMatch){
    score+=1;
    disableCards();
    updateScore();
  }else{
    unflipCards();
  }
}
 function updateScore() {
      var scoreElement = document.getElementById('score');
      scoreElement.textContent = score;
    }
function disableCards() {
  // 移除監聽事件，釋放記憶體
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  // 把牌蓋起來
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 500);
}

var timer = null;
// 顯示數字圖片
function displayClock(num) {
  var dig = parseInt(num/10);
  var timetag="<img src='" + dig + ".gif'>";
  dig = num%10;
  timetag +="<img src='" + dig + ".gif'>";
  return timetag;
}
// 停止計時
function stopClock() {
   clearTimeout(timer);
}
// 開始計時
function startClock() {
   var time = new Date();
   // 取得時間
   var hours = displayClock(time.getHours()) +" ";
   var minutes = displayClock(time.getMinutes()) +" ";
   var seconds = displayClock(time.getSeconds());
   var show = document.getElementById("show");
   show.innerHTML = hours + minutes + seconds;
   timer = setTimeout("startClock()",1000);
}

var sec=0;
var min=0;
var intervalID = setInterval(function() {
  var scoreElement = document.getElementById('sc');
  sec++;
  if(sec>=60){
      min++;
      sec-=60;
  }
  var tim="";
  if(min<10){
    tim+="0";
  }
  tim+=min+":";
  if(sec<10){
    tim+="0";
  }
  tim+=sec;
  scoreElement.textContent =tim;
}, 1000);


function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 28);
    card.style.order = randomPos;
  });
})();


cards.forEach(card => card.addEventListener('click', flipCard));