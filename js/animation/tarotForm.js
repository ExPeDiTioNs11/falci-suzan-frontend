const cards = document.querySelectorAll(".tarot-cards");
const wrapper = document.querySelector(".tarot-cards-wrapper");
const totalCards = document.querySelector(".total-cards");
const selectCards = document.querySelector(".tarot-cards-remaining");
const cardsSpread = document.querySelectorAll(".tarot-cards-alternative");
const totalCardsAlternative = document.querySelector(
  ".total-cards-alternative"
);

totalCards.textContent = cards.length;

let remainingCards = 7;

//console.log(wrapper.clientWidth);

//Spread Cards

totalCardsAlternative.textContent = cardsSpread.length;
let leftPosition = 0;

cardsSpread.forEach((card) => {
  // console.log(card.clientWidth);
  card.style.left = `${leftPosition}px`;
  leftPosition += parseInt(wrapper.clientWidth) / cardsSpread.length;
});

//OnClick Animation

cardsSpread.forEach((card) => {
  card.addEventListener("click", function () {
    if (remainingCards > 0) {
      if (card.classList.contains("selected")) {
        card.classList.remove("selected");
        remainingCards++;
      } else {
        card.classList.add("selected");
        remainingCards--;
      }
      selectCards.textContent = remainingCards;
      document.getElementsByClassName("selected").length;
    }
  });
});
