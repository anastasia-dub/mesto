import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__form-button-submit');
        this._initialValueSubmitButton = this._submitButton.textContent;
        this._inputs = this._form.querySelectorAll('.popup__form-input');
    }

    renderLoading(isLoading, initialDownloadMessage = 'Cохранение...') {
        if (isLoading) {
          this._submitButton.textContent = initialDownloadMessage;
        } else {
          this._submitButton.textContent = this._initialValueSubmitButton;
        }
      }

    _getInputValues() {
        const result = {};

        this._inputs.forEach(input => {
          result[input.name] = input.value;
        });

        return result;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = this._getInputValues();
            this._submit(formData);
          });
    }

    close() {
        super.close();

        this._form.reset();
    }
}

export default PopupWithForm;
