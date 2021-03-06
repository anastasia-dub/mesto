import './index.css';

import { validatorConfig } from '../utils/constants.js';
import { cardsSettings } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const updateAvatarButtonElement = document.querySelector('.profile__avatar-edit-button');

const popupConfirmSelector = '.popup_name_confirm';

const popupUpdateAvatarSelector = '.popup_name_update-avatar';

const profileEditPopupSelector = '.popup_name_edit-profile';

const userAvatarSelector = '.profile__avatar';
const userInfoSelector = '.profile__subtitle';
const userNameSelector = '.profile__title';

const profileEditPopupElement = document.querySelector(profileEditPopupSelector);

const profileEditPopupForm = profileEditPopupElement.querySelector('.popup__form');
const profileEditPopupInputName = profileEditPopupElement.querySelector('.popup__form-input[name=name]');
const profileEditPopupInputAbout = profileEditPopupElement.querySelector('.popup__form-input[name=about]');

const cardTemplateSelector = '#card';

const addCardPopupSelector = '.popup_name_add-card';

const avatarPopupSelector = '.popup_name_update-avatar';

const addCardPopupElement = document.querySelector(addCardPopupSelector);

const avatarPopupElement = document.querySelector(avatarPopupSelector);

const addCardPopupForm = addCardPopupElement.querySelector('.popup__form');

const avatarPopupForm = avatarPopupElement.querySelector('.popup__form');

const profileFormValidator = new FormValidator(validatorConfig, profileEditPopupForm);
const addCardFormValidator = new FormValidator(validatorConfig, addCardPopupForm);
const avatarFormValidator = new FormValidator(validatorConfig, avatarPopupForm);

let cardToDelete = null;
let ownerId = null;

const cardsList = new Section({
  renderer: (data) => {
    const card = createNewCard(data);
    const cardElement = card.generateCard();
    card.setLikeCount(data);
    cardsList.addItem(cardElement, 'append');
  }
}, '.cards');

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const createNewCard = (data) => {
  const card = new Card(data, cardTemplateSelector, cardsSettings, ownerId, {
    handleCardClick: (data) => {
      popupWithImage.open(data);
    },
    handleCardDelete: () => {
      cardToDelete = card;
      popupConfirm.open(data);
    },
    setLike: (data) => {
      api.setLike(data)
        .then((data) => {
          card.setLikeCount(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    deleteLike: (data) => {
      api.deleteLike(data)
        .then((data) => {
          card.setLikeCount(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
  });
  return card;
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    Authorization: '278fac41-4fca-42d8-b991-ed853233cc11',
    'Content-Type': 'application/json'
  }
});

api.getInitialData()
  .then((data) => {
    const [userData, cardsData] = data;
    ownerId = userData._id;
    userInfo.setUserInfo(userData);
    cardsList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

const popupConfirm = new PopupConfirm(popupConfirmSelector, {
  submit: (data) => {
    api.deleteCard(data)
      .then(() => {
        cardToDelete.deleteCard();
      })
      .then(() => {
        cardToDelete = null;
        popupConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
});

popupConfirm.setEventListeners();


const addCardPopup = new PopupWithForm(addCardPopupSelector, {
  submit: (data) => {
    addCardPopup.renderLoading(true);
    api.postCard(data)
      .then((res) => {
        const card = createNewCard(res);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement, 'prepend');
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addCardPopup.renderLoading(false);
      })
  }
});

addCardPopup.setEventListeners();

const popupInfoForm = new PopupWithForm(profileEditPopupSelector, {
  submit: (data) => {
    popupInfoForm.renderLoading(true, '????????????????...');
    api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupInfoForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupInfoForm.renderLoading(false);
      })
  }
});

popupInfoForm.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_name_show-image'); 
popupWithImage.setEventListeners();

const popupWithUpdateAvatarForm = new PopupWithForm(popupUpdateAvatarSelector, {
  submit: (data) => {
    popupWithUpdateAvatarForm.renderLoading(true);
    api.setUserAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupWithUpdateAvatarForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithUpdateAvatarForm.renderLoading(false);
      })
  }
});

popupWithUpdateAvatarForm.setEventListeners();

const userInfo = new UserInfo({ userNameSelector, userInfoSelector, userAvatarSelector });

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
  const userData = userInfo.getUserInfo();
  profileEditPopupInputName.value = userData.name;
  profileEditPopupInputAbout.value = userData.about;
  popupInfoForm.open();
});


// addCardPopup handlers
profileAddButton.addEventListener('click', () => {
  addCardFormValidator.resetFormValidity();
  addCardPopup.open();
});

// updateAvatar
updateAvatarButtonElement.addEventListener('click', () => {
  avatarFormValidator.resetFormValidity();
  popupWithUpdateAvatarForm.open();
})
