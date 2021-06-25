import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        return new FormData(this._form);
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = this._getInputValues();
            this._handleSubmit(formData);
          });
    }

    close() {
        super.close();

        this._form.reset();
    }
}

export default PopupWithForm;
