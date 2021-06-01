import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initial-cards.js';

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.cards');
const popups = Array.from(document.querySelectorAll('.popup'));

const profileEditPopup = document.querySelector('.popup.popup_name_edit-profile');
const profileEditPopupButtonClose = profileEditPopup.querySelector('.popup__form-button-close');
const profileEditPopupForm = profileEditPopup.querySelector('.popup__form');
const profileEditPopupInputName = profileEditPopup.querySelector('.popup__form-input[name=name]');
const profileEditPopupInputAbout = profileEditPopup.querySelector('.popup__form-input[name=about]');

const addCardPopup = document.querySelector('.popup.popup_name_add-card');
const addCardPopupButtonClose = addCardPopup.querySelector('.popup__form-button-close');
const addCardPopupForm = addCardPopup.querySelector('.popup__form');
const addCardPopupInputName = addCardPopup.querySelector('.popup__form-input[name=name]');
const addCardPopupInputLink = addCardPopup.querySelector('.popup__form-input[name=link]');

const imagePopup = document.querySelector('.popup.popup_name_show-image');
const imagePopupButtonClose = imagePopup.querySelector('.popup__form-button-close');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__image-title');

let popupEscapeListener = null;

const formValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button-submit',
  inactiveButtonClass: 'popup__form-button-submit_inactive',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__form-input-error_active'
});

formValidator.enableValidation();

function addPopupEscapeListener(popup) {
  popupEscapeListener = function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  }

  document.addEventListener('keydown', popupEscapeListener);
}

function removePopupEscapeListener() {
  document.removeEventListener('keydown', popupEscapeListener);
}


function showPopup(popup) {
  popup.classList.add('popup_opened');
  addPopupEscapeListener(popup);
}

function resetForm(formElement) {
  formElement.reset();
  formValidator.resetFormValidity(formElement);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removePopupEscapeListener();
}

function createNewCard(data) {
  const card = new Card(data.name, data.link, '#card', (text, image) => {
    imagePopupImage.src = image;
    imagePopupImage.alt = text;
    imagePopupTitle.textContent = text;

    showPopup(imagePopup);
  });

  return card.generateCard();
}

function renderCard(card) {
  cardsContainer.prepend(card);
}


// popup animation handlers
document.addEventListener('animationstart', function (e) {
  if (e.animationName === 'fade-in') {
      e.target.classList.add('popup_faded-in');
  }
});

document.addEventListener('animationend', function (e) {
  if (e.animationName === 'fade-out') {
      e.target.classList.remove('popup_faded-in');
   }
});


// editProfilePopup handlers

profileEditButton.addEventListener('click', () => {
  resetForm(profileEditPopupForm);
  
  profileEditPopupInputName.value = profileTitle.textContent;
  profileEditPopupInputAbout.value = profileSubtitle.textContent;

  showPopup(profileEditPopup);
});

function handleEditProfileFormSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = profileEditPopupInputName.value;
  profileSubtitle.textContent = profileEditPopupInputAbout.value;
  closePopup(profileEditPopup);
}

profileEditPopupButtonClose.addEventListener('click', () => {
  closePopup(profileEditPopup);
});

profileEditPopupForm.addEventListener('submit', handleEditProfileFormSubmit);


// addCardPopup handlers

profileAddButton.addEventListener('click', () => {
  resetForm(addCardPopupForm);
  showPopup(addCardPopup);
});

function hadleAddCardFormSubmit(e) {
  e.preventDefault();

  const newCard = createNewCard({
    name: addCardPopupInputName.value,
    link: addCardPopupInputLink.value
  });

  renderCard(newCard);
  closePopup(addCardPopup);
}

addCardPopupButtonClose.addEventListener('click', () => {
  closePopup(addCardPopup);
});

addCardPopupForm.addEventListener('submit', hadleAddCardFormSubmit);

// imagePopup handlers

imagePopupButtonClose.addEventListener('click', () => {
  closePopup(imagePopup);
});


popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);
    }
  })
})


initialCards.forEach(cardData => renderCard(createNewCard(cardData)));



