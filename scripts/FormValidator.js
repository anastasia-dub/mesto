class FormValidator {
    constructor(validationConfig) {
        this._validationSelectors = validationConfig;
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

     _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationSelectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationSelectors.errorClass);
      }
      
     _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validationSelectors.inputErrorClass);
        errorElement.classList.remove(this._validationSelectors.errorClass);
        errorElement.textContent = '';
      }


     _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(formElement, inputElement);
        }
      }

     _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._validationSelectors.inputSelector));
        const buttonElement = formElement.querySelector(this._validationSelectors.submitButtonSelector);
      
        this._toggleButtonState(inputList, buttonElement);
      
        inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
           this._checkInputValidity(formElement, inputElement);
           this._toggleButtonState(inputList, buttonElement);
         });
       });
      }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._validationSelectors.formSelector));
        formList.forEach((formElement) => {
          this._setEventListeners(formElement);
        });
    }

    resetFormValidity(formElement) {
        console.log('resetFormValidity');
        const inputList = Array.from(formElement.querySelectorAll(this._validationSelectors.inputSelector));
        const buttonElement = formElement.querySelector(this._validationSelectors.submitButtonSelector);
      
        inputList.forEach((inputElement) => {
          this._hideInputError(formElement, inputElement);
      
          this._toggleButtonState(inputList, buttonElement);
      
        })
        console.log('inputList', inputList);
      }
}

export default FormValidator;
