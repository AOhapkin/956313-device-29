let mapShowButton = document.querySelector(".map-show-button");
let modalMap = document.querySelector(".modal-map");
let mapClose = modalMap.querySelector(".modal-close");
let writeUsShowButton = document.querySelector(".write-us-button");
let modalWriteUs = document.querySelector(".modal-write-us");
let writeUsClose = modalWriteUs.querySelector(".modal-close");
let writeUsForm = modalWriteUs.querySelector(".modal-form");
let modalInputName = writeUsForm.querySelector(".modal-input-name");
let modalInputEmail = writeUsForm.querySelector(".modal-input-email");
let modalTextarea = writeUsForm.querySelector(".modal-textarea-message");
let promoSlides = document.querySelectorAll(".promo-list-item");
let promoControls = document.querySelectorAll(".promo-slider-button");
let serviceButtons = document.querySelectorAll(".services-button");
let serviceCards = document.querySelectorAll(".services-cards-item");
let isStorageSupport = true;
let storage = "";

// map

mapShowButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalMap.classList.add("modal-show");
});

mapClose.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalMap.classList.remove("modal-show");
});

// write us

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
    modalWriteUs.classList.remove("modal-error");
    writeUsForm.offsetWidth = writeUsForm.offsetWidth;
    modalWriteUs.classList.add("modal-error");
  } else {
    localStorage.setItem("user-name", modalInputName.value);
    localStorage.setItem("user-mail", modalInputEmail.value);
  }
});

// promo slider

let clickHandlerPromo = function (control, slide) {
  control.addEventListener("click", function() {
    for (let i=0; i < promoSlides.length; i++) {
      promoSlides[i].classList.remove("current-promo-item");
      promoControls[i].classList.remove("current-slider-button");
    }
    slide.classList.add("current-promo-item");
    control.classList.add("current-slider-button");
  });
}

for (let i=0; i<promoSlides.length; i++){
  clickHandlerPromo(promoControls[i], promoSlides[i]);
}

let clickHandlerService = function (control, slide) {
  control.addEventListener("click", function(evt) {
    evt.preventDefault();
    for (let i=0; i < promoSlides.length; i++) {
      serviceCards[i].classList.remove("current-services-cards-item");
      serviceButtons[i].classList.remove("current-services-button");
    }
    slide.classList.add("current-services-cards-item");
    control.classList.add("current-services-button");
  });
}

for (let i=0; i<serviceCards.length; i++){
  clickHandlerService(serviceButtons[i], serviceCards[i]);
}
