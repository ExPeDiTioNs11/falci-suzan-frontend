const cards = document.querySelectorAll(".tarot-cards");
const wrapper = document.querySelector(".tarot-cards-wrapper");
const totalCards = document.querySelector(".total-cards");
const selectCardsAlternative = document.querySelector(
  ".tarot-cards-remaining-alternative"
);
const selectCards = document.querySelector(".tarot-cards-remaining");
const cardsSpread = document.querySelectorAll(".tarot-cards-alternative");
const totalCardsAlternative = document.querySelector(
  ".total-cards-alternative"
);

totalCards.textContent = cards.length;

let remainingCards = 7;

cards.forEach((card) => {
  let randomPosition = Math.floor(Math.random() * cards.length);
  card.style.order = randomPosition;
});
cardsSpread.forEach((card) => {
  let randomPosition = Math.floor(Math.random() * cardsSpread.length);
  card.style.order = randomPosition;
  cardShuffled = true;
  spreadCards();
});

//Spread Alternative Cards

totalCardsAlternative.textContent = cardsSpread.length;

//window.onload = shuffle();
//spreadCards();

function spreadCards() {
  let leftPosition = 0;
  let rotateDegree = -9;
  let translateDegree = 0;

  cardsSpread.forEach((card, index) => {
    card.style.left = `${leftPosition}px`;
    leftPosition +=
      (wrapper.clientWidth - card.clientWidth) / cardsSpread.length;
    card.style.transform = `rotate(${rotateDegree}deg)`;
    rotateDegree += 0.25;

    if (index <= 38) {
      card.style.transform += `translateY(${translateDegree}rem)`;
      translateDegree -= 0.012;
    } else if (index > 38) {
      card.style.transform += `translateY(${translateDegree}rem)`;
      translateDegree += 0.012;
    }
  });
}

let res;
window.onresize = function () {
  if (res) {
    clearTimeout(res);
  }
  res = setTimeout(spreadCards, 100);
};

//OnClick Animation

cardsSpread.forEach((card) => {
  if (cardShuffled) {
    card.addEventListener("click", function () {
      if (remainingCards > 0) {
        if (card.classList.contains("selected-alternative")) {
          card.classList.remove("selected-alternative");
          remainingCards++;
        } else {
          card.classList.add("selected-alternative");
          remainingCards--;
        }
      } else if (
        remainingCards === 0 &&
        card.classList.contains("selected-alternative")
      ) {
        card.classList.remove("selected-alternative");
        remainingCards++;
      }
      selectCardsAlternative.textContent = remainingCards;
    });
  }
});

cards.forEach((card) => {
  card.addEventListener("click", function () {
    console.log(`card id ${card.id} and order ${card.style.order}`);
    if (remainingCards > 0) {
      if (card.classList.contains("selected")) {
        card.classList.remove("selected");
        remainingCards++;
      } else {
        card.classList.add("selected");
        remainingCards--;
      }
    } else if (remainingCards === 0 && card.classList.contains("selected")) {
      card.classList.remove("selected");
      remainingCards++;
    }
    selectCards.textContent = remainingCards;
  });
});

// Form Validasyon

(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          const myModal = new bootstrap.Modal(
            document.getElementById("submitFormModal"),
            {
              keyboard: false,
            }
          );
          myModal.toggle();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
