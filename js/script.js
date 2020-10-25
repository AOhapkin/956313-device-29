let catalogToggle = document.querySelector(".catalog-togle");
let catalogMenu = document.querySelector(".catalog-menu");

// header catalog

catalogToggle.addEventListener("click", function(evt) {
  evt.preventDefault();
  catalogMenu.classList.toggle("catalog-menu-show");
});

// map

let mapShowButton = document.querySelector(".map-show-button");
let modalMap = document.querySelector(".modal-map");
let mapClose = modalMap.querySelector(".modal-close");

mapShowButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalMap.classList.add("modal-show");
});

mapClose.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalMap.classList.remove("modal-show");
});

// write us

let writeUsShowButton = document.querySelector(".write-us-button");
let modalWriteUs = document.querySelector(".modal-write-us");
let writeUsClose = modalWriteUs.querySelector(".modal-close");
let writeUsForm = modalWriteUs.querySelector(".modal-form");
let modalInputName = writeUsForm.querySelector(".modal-input-name");
let modalInputEmail = writeUsForm.querySelector(".modal-input-email");
let modalTextarea = writeUsForm.querySelector(".modal-textarea-message");

let isStorageSupport = true;
let storage = "";

try {
  storage = localStorage.getItem("number-adults");
} catch (err) {
  isStorageSupport = false;
}

writeUsShowButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalWriteUs.classList.add("modal-show");

  if (storage) {
    modalInputName.value = storage;
    modalInputEmail.focus();
    if (modalInputEmail.value) {
      modalTextarea.focus();
    }
  } else {
    modalInputName.focus();
  }
});

writeUsClose.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalWriteUs.classList.remove("modal-show");
  modalWriteUs.classList.remove("modal-error");
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (modalMap.classList.contains("modal-show") || modalWriteUs.classList.contains("modal-show")) {
      evt.preventDefault();
      modalMap.classList.remove("modal-show");
      modalWriteUs.classList.remove("modal-show");
      modalWriteUs.classList.remove("modal-error");
    }
  }
});

writeUsForm.addEventListener("submit", function(evt) {
  if (!modalInputName.value || !modalInputEmail.value || !modalTextarea.value) {
    evt.preventDefault();
    console.log("пустая форма");
    modalWriteUs.classList.remove("modal-error");
    writeUsForm.offsetWidth = writeUsForm.offsetWidth;
    modalWriteUs.classList.add("modal-error");
  } else {
    localStorage.setItem("user-name", modalInputName.value);
    localStorage.setItem("user-mail", modalInputEmail.value);
  }
});

// promo slider

let promoSlides = document.querySelectorAll(".promo-list-item");
let promoControls = document.querySelectorAll(".promo-slider-button")

var clickHandler = function (control, slide) {
  control.addEventListener("click", function() {
    for (var i=0; i < promoSlides.length; i++) {
      promoSlides[i].classList.remove("current-promo-item");
      promoControls[i].classList.remove("current-slider-button");
    }
    slide.classList.add("current-promo-item");
    control.classList.add("current-slider-button");
  });
}

for (var i=0; i<promoSlides.length; i++){
  clickHandler(promoControls[i], promoSlides[i]);
}
