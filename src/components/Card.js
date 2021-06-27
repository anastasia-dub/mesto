 class Card {
     constructor(text, image, templateSelector, handleCardClick) {
        this._text = text;
        this._image = image;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
     }

     _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true); 

        return cardElement;
     }
     
     _remove() {
        this._element.remove();
        this._element = null;
     }
     
     _toggleLike() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
     }

     _setEventListeners() {
        this._element.querySelector('.card__image').addEventListener('click', () => {
           this._handleCardClick(this._text, this._image);
        });

        this._element.querySelector('.card__like').addEventListener('click', () => {
           this._toggleLike();
        });

        this._element.querySelector('.card__remove').addEventListener('click', () => {
           this._remove();
        });
     }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__image').style.backgroundImage = `url(${this._image})`;
        this._element.querySelector('.card__text').textContent = this._text;
        
        this._setEventListeners();
        
        return this._element;
	 }
 }

 export default Card;
 