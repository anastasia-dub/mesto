import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageTitle = this._popup.querySelector('.popup__image-title');
    }

    open(data) {
        this._popupImage.src = data.link;
        this._popupImage.alt = `Фотография ${data.name}`;
        this._popupImageTitle.textContent = data.name;
        super.open();
    }
}

export default PopupWithImage;
