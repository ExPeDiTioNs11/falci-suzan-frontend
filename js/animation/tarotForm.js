const tarotOptions = document.querySelectorAll(".tarot-reading-option");
const cards = document.querySelectorAll(".tarot-cards");
const totalCards = document.querySelector(".total-cards");
const selectCards = document.querySelector(".tarot-cards-remaining");

const wrapper = document.querySelector(".tarot-cards-wrapper");
const selectCardsAlternative = document.querySelector(
  ".tarot-cards-remaining-alternative"
);
const cardsSpread = document.querySelectorAll(".tarot-cards-alternative");
const totalCardsAlternative = document.querySelector(
  ".total-cards-alternative"
);

const selectedCardsData = document.querySelector(
  'input[name$="selected-cards"]'
);

totalCards.textContent = cards.length;

tarotOptions.forEach((option) => {
  option.addEventListener("change", () => {
    shuffleCards();
  });
});

let remainingCards;
let selectedCardsArray;

// Kartlarin yerini rastgele belirle
function shuffleCards() {
  cards.forEach((card) => {
    if (card.classList.contains("selected")) {
      card.classList.remove("selected");
    }
    const randomDegrees = [0, 90];
    const randomDegree =
      randomDegrees[Math.floor(Math.random() * randomDegrees.length)];
    card.style.transform = `rotate(${randomDegree}deg)`;
    selectedCardsArray = [];
    remainingCards = 7;
    selectCards.textContent = remainingCards;
    let randomPosition = Math.floor(Math.random() * cards.length);
    card.style.order = randomPosition;
  });
}
shuffleCards();

cardsSpread.forEach((card) => {
  let randomPosition = Math.floor(Math.random() * cardsSpread.length);
  card.style.order = randomPosition;
  cardShuffled = true;
  spreadCards();
});

//Spread Alternative Cards

totalCardsAlternative.textContent = cardsSpread.length;

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
    if (remainingCards > 0) {
      if (card.classList.contains("selected")) {
        card.classList.remove("selected");
        selectedCardsArray = selectedCardsArray.filter((e) => e !== card.id);
        remainingCards++;
      } else {
        card.classList.add("selected");
        selectedCardsArray.push(card.id + "t");
        remainingCards--;
      }
    } else if (remainingCards === 0 && card.classList.contains("selected")) {
      card.classList.remove("selected");
      selectedCardsArray = selectedCardsArray.filter((e) => e !== card.id);
      remainingCards++;
    }
    selectCards.textContent = remainingCards;
    matchWithImages();
  });
});

function matchWithImages() {
  selectedCardsArray.forEach(function (value, index) {
    const finalImage = document.getElementById(`card${index}`);
    finalImage.src = `../../assets/images/tarot-kartlari/${value}.png`;
    if (value === `${value}t`) console.log("workinnngs");
  });
  selectedCardsData.value = selectedCardsArray;
  // console.log(selectedCardsData.value);
}
// function matchWithImages() {
//   selectedCardsArray.forEach(function (value, index) {
//     const randomDegrees = [0, 180];
//     const randomDegree =
//       randomDegrees[Math.floor(Math.random() * randomDegrees.length)];
//     const finalImage = document.getElementById(`card${index}`);
//     finalImage.src = `../../assets/images/tarot-kartlari/${value}.png`;
//     finalImage.style.transform = `rotate(${randomDegree}deg)`;
//   });
//   selectedCardsData.value = selectedCardsArray;
//   console.log(selectedCardsData.value);
// }

//Yorumcuya gonderilecek kisim

//Gosterme amacli button
document.querySelector(".show-div").addEventListener("click", () => {
  document.querySelector(".display-tarot-cards").style.display = "block";
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
        event.preventDefault();
        event.stopPropagation();
        if (!form.checkValidity()) {
        } else if (remainingCards !== 0) {
          selectCards.scrollIntoView();
          const notification = document.createElement("p");
          notification.appendChild(
            document.createTextNode(
              "Eksik kart seçtin. Lütfen kart seçimini tamamla!"
            )
          );
          notification.style.color = "red";
          document
            .getElementById("tarot-cards-remaining-text")
            .appendChild(notification);
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

//Redirect to Homepage on closing form modal (after submitting form)
const myModal = document.getElementById("submitFormModal");

myModal.addEventListener("hidden.bs.modal", function () {
  location.href = "user_index.html";
});
