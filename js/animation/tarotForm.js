const tarotOptions = document.querySelectorAll(".tarot-reading-option");
const cards = document.querySelectorAll(".all-cards");
const totalCards = document.querySelector(".total-cards");
const selectCards = document.querySelector(".all-cards-remaining");

const wrapper = document.querySelector(".all-cards-wrapper");
// const selectCardsAlternative = document.querySelector(
//   ".all-cards-remaining-alternative"
// );
// const cardsSpread = document.querySelectorAll(".all-cards-alternative");
// const totalCardsAlternative = document.querySelector(
//   ".total-cards-alternative"
// );

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
//Tarot kartlari icin ters ya da duz olma halini rastgele belirle

function shuffleCards() {
  cards.forEach((card) => {
    if (card.classList.contains("selected")) {
      card.classList.remove("selected");
    }
    if (card.classList.contains("tarot")) {
      const reverseOrNot = ["reverse", "not-reverse"];
      const random =
        reverseOrNot[Math.floor(Math.random() * reverseOrNot.length)];
      if (random === "reverse") card.classList.add("reverse");
    }

    selectedCardsArray = [];
    remainingCards = 7;
    selectCards.textContent = remainingCards;
    let randomPosition = Math.floor(Math.random() * cards.length);
    card.style.order = randomPosition;
  });
}
shuffleCards();

//Spread Alternative Cards

// cardsSpread.forEach((card) => {
//   let randomPosition = Math.floor(Math.random() * cardsSpread.length);
//   card.style.order = randomPosition;
//   cardShuffled = true;
//   spreadCards();
// });

// totalCardsAlternative.textContent = cardsSpread.length;

// function spreadCards() {
//   let leftPosition = 0;
//   let rotateDegree = -9;
//   let translateDegree = 0;

//   cardsSpread.forEach((card, index) => {
//     card.style.left = `${leftPosition}px`;
//     leftPosition +=
//       (wrapper.clientWidth - card.clientWidth) / cardsSpread.length;
//     card.style.transform = `rotate(${rotateDegree}deg)`;
//     rotateDegree += 0.25;

//     if (index <= 38) {
//       card.style.transform += `translateY(${translateDegree}rem)`;
//       translateDegree -= 0.012;
//     } else if (index > 38) {
//       card.style.transform += `translateY(${translateDegree}rem)`;
//       translateDegree += 0.012;
//     }
//   });
// }

// let res;
// window.onresize = function () {
//   if (res) {
//     clearTimeout(res);
//   }
//   res = setTimeout(spreadCards, 100);
// };

//OnClick Animation

cards.forEach((card) => {
  card.addEventListener("click", function () {
    if (remainingCards > 0) {
      if (card.classList.contains("selected")) {
        card.classList.remove("selected");
        selectedCardsArray = selectedCardsArray.filter(
          (e) => e !== card.id && e !== `R${card.id}`
        );
        remainingCards++;
      } else {
        card.classList.add("selected");
        card.classList.contains("reverse")
          ? selectedCardsArray.push(`R${card.id}`)
          : selectedCardsArray.push(`${card.id}`);
        remainingCards--;
      }
    } else if (remainingCards === 0 && card.classList.contains("selected")) {
      card.classList.remove("selected");
      selectedCardsArray = selectedCardsArray.filter(
        (e) => e !== card.id && e !== `R${card.id}`
      );
      remainingCards++;
    }
    console.log("array " + selectedCardsArray);
    selectedCardsData.value = selectedCardsArray;
    console.log("data " + selectedCardsArray);
    selectCards.textContent = remainingCards;

    if (card.classList.contains("tarot")) {
      cardType = "tarot";
    } else if (card.classList.contains("katina")) {
      cardType = "katina";
    } else if (card.classList.contains("iskambil")) {
      cardType = "iskambil";
    }
    matchWithImages(cardType);
  });
});

function matchWithImages(cardType) {
  selectedCardsArray.forEach(function (value, index) {
    const finalImage = document.getElementById(`card${index}`);
    if (value.includes("R")) {
      let source = value.replace("R", "");
      finalImage.src = `../../assets/images/${cardType}-kartlari/${source}.png`;
      finalImage.classList.add("reverse-rotate");
    } else {
      finalImage.src = `../../assets/images/${cardType}-kartlari/${value}.png`;
      finalImage.classList.remove("reverse-rotate");
    }
  });
}

//Yorumcuya gonderilecek kisim

//Gosterme amacli button
document.querySelector(".show-div").addEventListener("click", () => {
  document.querySelector(".display-all-cards").style.display = "block";
});

// Alternative Versiyon icin

// cardsSpread.forEach((card) => {
//   if (cardShuffled) {
//     card.addEventListener("click", function () {
//       if (remainingCards > 0) {
//         if (card.classList.contains("selected-alternative")) {
//           card.classList.remove("selected-alternative");
//           remainingCards++;
//         } else {
//           card.classList.add("selected-alternative");
//           remainingCards--;
//         }
//       } else if (
//         remainingCards === 0 &&
//         card.classList.contains("selected-alternative")
//       ) {
//         card.classList.remove("selected-alternative");
//         remainingCards++;
//       }
//       selectCardsAlternative.textContent = remainingCards;
//     });
//   }
// });

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
            .getElementById("all-cards-remaining-text")
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
