//KAHVE FORMU

// Webcam ya da Bilgisayar secenegine gore ilgili fotograf yukleme div'ini goster

const radInputs = document.querySelectorAll('input[name="upload-options"]');

radInputs.forEach((input) => {
  input.addEventListener("click", () => {
    if (input.id === "option-webcam") {
      document.getElementById("computer").style.display = "none";
      document.getElementById("webcam").style.display = "block";
    } else {
      document.getElementById("computer").style.display = "block";
      document.getElementById("webcam").style.display = "none";
    }
  });
});

// Bilgisayardan Fotograf Yukleme

const uploadPhotoEl = document.querySelectorAll(".photo-upload1");

uploadPhotoEl.forEach((photo) => {
  photo.addEventListener("change", handleFileSelect, false);
});

function handleFileSelect(e) {
  for (const file of e.target.files) {
    const src = URL.createObjectURL(file);
    const preview = document.getElementById(e.target.getAttribute("data-id"));
    preview.src = src;
  }
}

// WebCam

(() => {
  const width = 320; // We will scale the photo width to this
  let height = 0; // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  let streaming = false;

  const buttons = document.querySelectorAll(".photo-upload2");

  buttons.forEach((button) => {
    button.addEventListener("click", startup, false);
  });

  const reset = document.getElementById("reset");
  reset.addEventListener("click", clearphoto);

  let video = null;
  let canvas = null;
  let photo = null;
  let startbutton = null;
  const cameraButtons = document.querySelector(".camera-buttons");

  function showViewLiveResultButton() {
    return false;
  }

  function startup(e) {
    photo = e.target;

    if (showViewLiveResultButton()) {
      return;
    }

    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    startbutton = document.getElementById("startbutton");

    setTimeout(() => {
      cameraButtons.style.display = "block";
    }, 500);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });

    video.addEventListener(
      "canplay",
      (ev) => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.

          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false
    );

    startbutton.addEventListener(
      "click",
      (ev) => {
        takepicture();
        ev.preventDefault();
      },
      false
    );
  }
  function clearphoto() {
    photo.setAttribute("src", "assets/images/add-photo.png");
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    const context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    } else {
      clearphoto();
    }
  }
})();

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
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
