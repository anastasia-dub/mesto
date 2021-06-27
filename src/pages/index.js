import './index.css';

import { validatorConfig } from '../utils/constants.js';
import initialCards from '../utils/initial-cards.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const profileEditPopupElement = document.querySelector('.popup.popup_name_edit-profile');
const profileEditPopupForm = profileEditPopupElement.querySelector('.popup__form');
const profileEditPopupInputName = profileEditPopupElement.querySelector('.popup__form-input[name=name]');
const profileEditPopupInputAbout = profileEditPopupElement.querySelector('.popup__form-input[name=about]');

const addCardPopupElement = document.querySelector('.popup.popup_name_add-card');
const addCardPopupForm = addCardPopupElement.querySelector('.popup__form');

const profileFormValidator = new FormValidator(validatorConfig, profileEditPopupForm);
const addCardFormValidator = new FormValidator(validatorConfig, addCardPopupForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();


function createNewCard(data) {
  const card = new Card(data.name, data.link, '#card', (text, image) => {
    popupWithImage.open(text, image);
  });

  return card.generateCard();
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const cardElement = createNewCard(item);
    cardList.addItem(cardElement);
  }
}, '.cards'); 

cardList.renderItems(); 

const popupWithImage = new PopupWithImage('.popup_name_show-image'); 
popupWithImage.setEventListeners();

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const profileEditPopup = new PopupWithForm('.popup_name_edit-profile', (formData) => {
  userInfo.setUserInfo(formData.get('name'), formData.get('about'));
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm('.popup_name_add-card', (formData) => {
  const newCard = createNewCard({
    name: formData.get('name'),
    link: formData.get('link')
  });

  cardList.addItem(newCard);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

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
  profileFormValidator.resetFormValidity();
  
  const { name, info } = userInfo.getUserInfo();

  profileEditPopupInputName.value = name;
  profileEditPopupInputAbout.value = info;

  profileEditPopup.open();
});

// addCardPopup handlers
profileAddButton.addEventListener('click', () => {
  addCardFormValidator.resetFormValidity();
  addCardPopup.open();
});
