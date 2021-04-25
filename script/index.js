const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__form-button-close');
const popupForm = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__form-input[name=name]');
const inputAbout = document.querySelector('.popup__form-input[name=about]');

function showPopup() {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  popupForm.reset();
  closePopup();
}

profileEditButton.addEventListener('click', showPopup);

closePopupButton.addEventListener('click', closePopup);

popupForm.addEventListener('submit', handleSubmit);
