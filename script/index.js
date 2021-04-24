const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');

const hearts = document.querySelectorAll('.card__like');

const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__form-button_close');
const popupForm = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__form-input_name');
const inputAbout = document.querySelector('.popup__form-input_about');

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

  const formData = new FormData(popupForm);
  profileTitle.textContent = formData.get('input_name');
  profileSubtitle.textContent = formData.get('input_about');
  popupForm.reset();
  closePopup();
}

function handleLikeClick(e) {
  e.target.classList.toggle('card__like_active');
}

profileEditButton.addEventListener('click', showPopup);

closePopupButton.addEventListener('click', closePopup);

popupForm.addEventListener('submit', handleSubmit);

for (let i = 0; i < hearts.length; i++) {
  hearts[i].addEventListener('click', handleLikeClick);
}
