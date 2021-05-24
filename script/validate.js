let validationSelectors = {};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSelectors.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationSelectors.inactiveButtonClass);
    buttonElement.disabled = false;

  }
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSelectors.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSelectors.inputErrorClass);
  errorElement.classList.remove(validationSelectors.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const checkFormValidity = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSelectors.inputSelector));

  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
  })
}

const resetFormValidity = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSelectors.inputSelector));
  const buttonElement = formElement.querySelector(validationSelectors.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);

    toggleButtonState(inputList, buttonElement);

  })
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSelectors.inputSelector));
  const buttonElement = formElement.querySelector(validationSelectors.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
   inputElement.addEventListener('input', function () {
     checkInputValidity(formElement, inputElement);
     toggleButtonState(inputList, buttonElement);
   });
 });
}

const enableValidation = (validationConfig) => {
  validationSelectors = validationConfig;
  const formList = Array.from(document.querySelectorAll(validationSelectors.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}
