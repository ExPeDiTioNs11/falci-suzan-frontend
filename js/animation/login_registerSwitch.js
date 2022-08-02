
// show register container
function registerShow() {
    var loginElement = document.getElementById("loginElement"); // login div
    var registerElement = document.getElementById("registerElement"); // register div

    loginElement.style.display = 'none'; // display close for login div
    registerElement.style.display = 'flex'; // display show for register div
}


// show login container
function loginShow() {
    var loginElement = document.getElementById("loginElement"); // login div
    var registerElement = document.getElementById("registerElement"); // register div

    loginElement.style.display = 'block'; // display show for login div
    registerElement.style.display = 'none'; // display close for register div
}
