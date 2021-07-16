 class Card {
     constructor(data, templateSelector, directions, ownerId, {handleCardClick, handleCardDelete, deleteLike, setLike}) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._directions = directions;
        this._ownerId = ownerId;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._setLike = setLike;
        this._deleteLike = deleteLike;
     }

     _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true); 

        return cardElement;
     }
     
     deleteCard() {
      this._deleteElement(this._element);
     }
  
     _deleteElement(elem) {
      elem.remove();
      elem = null;
     }

     _like(data) {
      this._addLikedClass();
      this._setLike(data);
    }

    _dislike(data) {
      this._removeLikedClass();
      this._deleteLike(data);
    }

     _addLikedClass() {
      this._likeButton.classList.add(this._directions.cardLikedButtonClass);
    }

    _removeLikedClass() {
      this._likeButton.classList.remove(this._directions.cardLikedButtonClass);
    }

    setLikeCount(data) {
      this._cardLikeCount.textContent = String(data.likes.length);
    }

    _checkIsMasterCard() {
      if (this._data.owner._id !== this._ownerId) {
        this._deleteElement(this._deleteButton);
      }
    }

    _checkLikedStatus() {
      this._data.likes.forEach((likeOwner) => {
        if (likeOwner._id === this._ownerId) {
          this._addLikedClass();
        }
      });
    }

     _setEventListeners() {
      this._cardImage.addEventListener('click', () => {
         this._handleCardClick(this._data);
       });
       this._likeButton.addEventListener('click', () => {
         if (this._likeButton.classList.contains(this._directions.cardLikedButtonClass)) {
           this._dislike(this._data);
         } else {
           this._like(this._data);
         }
       });
       this._deleteButton.addEventListener('click', this._handleCardDelete);
     }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(this._directions.cardImageSelector);
        this._cardText = this._element.querySelector(this._directions.cardTextSelector);
        this._likeButton = this._element.querySelector(this._directions.cardLikeButtonSelector);
        this._cardLikeCount = this._element.querySelector(this._directions.cardLikeCountSelector);
        this._deleteButton = this._element.querySelector(this._directions.cardDeleteButtonSelector);


        this._cardImage.style.backgroundImage = `url(${this._data.link})`;
        this._cardImage.alt = `Фотография ${this._data.name}`;
        this._cardText.textContent = this._data.name;
        this.setLikeCount(this._data);
        this._setEventListeners();
        this._checkIsMasterCard();
        this._checkLikedStatus();

        return this._element;
	 }
 }

 export default Card;
 