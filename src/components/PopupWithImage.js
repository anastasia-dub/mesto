import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageTitle = this._popup.querySelector('.popup__image-title');
    }

    open(text, image) {
        this._popupImage.src = image;
        this._popupImage.alt = text;
        this._popupImageTitle.textContent = text;
        super.open();
    }
}

export default PopupWithImage;
