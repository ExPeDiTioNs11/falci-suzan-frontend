const preloader = document.getElementById("preloader");
const eventButtons = document.querySelectorAll(".site_name");

const MyTimeout = setTimeout(closePreloader, 20000);

eventButtons.forEach((button) => {
  button.addEventListener("click", playPreloader);
});

function closePreloader() {
  preloader.style.display = "none";
}

function playPreloader(e) {
  e.preventDefault();
  preloader.style.display = "block";
  MyTimeout;
}

//clearTimeout(closePreloader);
