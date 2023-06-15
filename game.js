var cards = Array.from(document.querySelectorAll('.card'));
var flippedCards = [];
var matchedCards = [];
var score = 0;
var canFlip = true;

// 獲取所有的牌元素
var cardsContainer = document.getElementById('card-container');

// 洗牌函數
function shuffleCards() {
  var cardss = Array.from(document.querySelectorAll('.card'));
  var currentIndex = cardss.length;
  var temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    // 隨機選擇一個剩餘的索引位置
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // 交換當前索引位置與隨機索引位置的元素
    temporaryValue = cardss[currentIndex].innerHTML;
    cardss[currentIndex].innerHTML = cardss[randomIndex].innerHTML;
    cardss[randomIndex].innerHTML = temporaryValue;
  }
}

// 在網頁載入完成後執行洗牌
window.onload = function() {
  shuffleCards();
};



function flipCard(card) {
  if (!canFlip || card.classList.contains('card-flipped') || card.classList.contains('matched')) {
    return;
  }
  card.classList.toggle('card-flipped');
  //setTimeout(function(){window.location.reload();}, 1000);
  if (flippedCards.length === 2) return;
  var img = card.querySelector('.card-front img');
  var cardValue = img.getAttribute('data-card');
  var cardSuit = img.getAttribute('data-suit');
  
  flippedCards.push({ card, value: cardValue, suit: cardSuit });
  
  if (flippedCards.length === 2) {
    canFlip = false;
    
    if (flippedCards[0].value === flippedCards[1].value && flippedCards[0].suit === flippedCards[1].suit) {
      // Matched same suit
      flippedCards.forEach(function(flippedCard) {
        flippedCard.card.classList.add('card-flipped');
        flippedCard.card.classList.add('matched');
        matchedCards.push(flippedCard.card);
      });
      score += 1;
      flippedCards = [];
      updateScore();
      checkGameEnd();
    } else {
      // Not matched
      setTimeout(function() {
        flippedCards.forEach(function(flippedCard) {
          flippedCard.card.classList.remove('card-flipped');
        });
        flippedCards = [];
        canFlip = true;
        updateScore();
      }, 500);
      updateScore();
    }
  }
}

function updateScore() {
  var scoreElement = document.getElementById('score');
  scoreElement.textContent = score;
}

// Check if the game has ended
function checkGameEnd() {
  var unmatchedCards = Array.from(document.querySelectorAll('.card:not(.matched)'));
  if (unmatchedCards.length === 0) {
    // Game ended
    showCongratulations();
  } else {
    canFlip = true;
  }
}

// Flip unmatched cards back to their original state
function flipUnmatchedCardsBack() {
  flippedCards.forEach(function(flippedCard) {
    flippedCard.card.classList.remove('card-flipped');
  });
  flippedCards = [];
  canFlip = true;
}

// Show congratulations message
function showCongratulations() {
  var congratulationsElement = document.getElementById('congratulations');
  congratulationsElement.style.display = 'block';
}

// Hide congratulations message
function hideCongratulations() {
  var congratulationsElement = document.getElementById('congratulations');
  congratulationsElement.style.display = 'none';
}

