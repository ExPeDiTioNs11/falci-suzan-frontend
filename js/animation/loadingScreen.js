const preloader = document.getElementById("preloader");
const eventButtons = document.querySelectorAll(".site_name");
const myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {
  keyboard: false,
});

eventButtons.forEach((button) => {
  button.addEventListener("click", playPreloader);
});

function closePreloader() {
  myModal.toggle();
}

function playPreloader(e) {
  e.preventDefault();
  myModal.toggle();
  setTimeout(closePreloader, 10000);
}
