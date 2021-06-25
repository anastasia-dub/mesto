class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationSelectors = validationConfig;
        this._formElement = formElement;
    }

     _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
      }

     _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._validationSelectors.inactiveButtonClass);
          buttonElement.disabled = true;
        } else {
          buttonElement.classList.remove(this._validationSelectors.inactiveButtonClass);
          buttonElement.disabled = false;
      
        }
      }

     _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationSelectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationSelectors.errorClass);
      }
      
     _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validationSelectors.inputErrorClass);

        errorElement.classList.remove(this._validationSelectors.errorClass);
        errorElement.textContent = '';
      }


     _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
      }

     _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._validationSelectors.inputSelector));
        const buttonElement = this._formElement.querySelector(this._validationSelectors.submitButtonSelector);
      
        this._toggleButtonState(inputList, buttonElement);
      
        inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
           this._checkInputValidity(inputElement);
           this._toggleButtonState(inputList, buttonElement);
         });
       });
      }

    enableValidation() {
      this._setEventListeners();
    }

    resetFormValidity() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._validationSelectors.inputSelector));
        const buttonElement = this._formElement.querySelector(this._validationSelectors.submitButtonSelector);
      
        inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
      
          this._toggleButtonState(inputList, buttonElement);
      
        })
      }
}

export default FormValidator;
