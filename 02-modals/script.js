'use strict';
let modal = document.querySelector(".modal"); // div hidden at the beginning
let overlay = document.querySelector(".overlay"); // div hidden at the beginning
let btnClose = document.querySelector(".close-modal"); // close button
let buttons = document.querySelectorAll(".show-modal");

//open model
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

buttons.forEach((button) => {
  button.addEventListener("click", openModal);
});

//close modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnClose.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

//close modal on keydown event
document.addEventListener("keydown", (e)=> {
    if(e.key === "Escape" && !modal.classList.contains("hidden")) {closeModal()}
        
})