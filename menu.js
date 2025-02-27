let popup = document.getElementById("popup");
let congrats = document.getElementById("congratulations");
let menu = document.getElementById("menuscrn");
let loser = document.getElementById("loser");
const closebtn = document.getElementById("closebtn");

function openPopup() {
    popup.classList.add("open-popup");
}

function closePopup() {
    popup.classList.remove("open-popup");
}

function closeCongrats() {
    congrats.classList.remove("open-popup");
    document.getElementById("overlay").classList.remove("show");
}

function openMenu() {
    menu.classList.add("open-popup");
    document.getElementById("overlay").classList.add("show");
}

function closeMenu() {
    menu.classList.remove("open-popup");
    document.getElementById("overlay").classList.remove("show");
}

function closeLoser() {
    loser.classList.remove("open-popup");
    document.getElementById("overlay").classList.remove("show");
}

function openGame() {
    window.open('loading.html');

    
}