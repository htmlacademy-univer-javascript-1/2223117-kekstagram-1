import { showErrorMessage, showSuccessMessage } from './util.js';
import { changeScale, deleteScaleHandlers } from './form-scale.js';
import { chooseEffects, deleteSlider } from './effects.js';
import { sendData } from './api.js';

const MAX_CHARACTERS_COUNT = 140;
const MAX_HASHTAGS_COUNT = 5;

const imgUploadForm = document.querySelector('.img-upload__form');
const fileUploadInput = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const descriptionElement = imgUploadForm.querySelector('.text__description');
const hashTagsElement = imgUploadForm.querySelector('.text__hashtags');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

let closeUploudFileElement = null;

function addNewImage() {
  function openUploudFileElement() {
    const formUploadImage = imgUploadForm.querySelector(
      '.img-upload__preview img'
    );
    const effectPreviewImage =
      imgUploadForm.querySelectorAll('.effects__preview');
    const uploadFile = fileUploadInput.files[0];
    formUploadImage.src = URL.createObjectURL(uploadFile);

    effectPreviewImage.forEach((element) => {
      element.style.backgroundImage = `url(${URL.createObjectURL(uploadFile)})`;
    });

    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }

  closeUploudFileElement = function () {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    fileUploadInput.value = '';
    hashTagsElement.value = '';
    descriptionElement.value = '';
    submitButton.disabled = false;
    document.removeEventListener('keydown', onModalEscKeydown);
    uploadCancel.removeEventListener('click', onCloseButtonClick);
    deleteSlider();
    deleteScaleHandlers();
  };

  function onModalEscKeydown(evt) {
    if (evt.key === 'Escape') {
      if (evt.target !== hashTagsElement && evt.target !== descriptionElement) {
        closeUploudFileElement();
      }
    }
  }

  function onCloseButtonClick() {
    closeUploudFileElement();
  }

  fileUploadInput.addEventListener('change', () => {
    openUploudFileElement();
    uploadCancel.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onModalEscKeydown);

    changeScale();
    chooseEffects();
  });
}

function validateForm() {
  const pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'text-error',
  });

  function validateHashtags(value) {
    if (value === '') {
      return true;
    }
    const regularExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
    const hashTagsArray = value.trim().split(' ');
    const checkValidation = hashTagsArray.every((arrayElement) =>
      regularExpression.test(arrayElement)
    );
    return checkValidation;
  }

  function isNoMoreThanFiveElements(value) {
    const hashTagsArray = value.trim().split(' ');
    return hashTagsArray.length <= MAX_HASHTAGS_COUNT;
  }

  function areSameElements(value) {
    value = String(value).toLowerCase();
    const hashTagsArray = value.trim().split(' ');
    const set = new Set(hashTagsArray);
    return set.size === hashTagsArray.length;
  }

  function validateCommentMaxLength(value) {
    return value.length <= MAX_CHARACTERS_COUNT;
  }

  pristine.addValidator(
    hashTagsElement,
    validateHashtags,
    'Хештег должен быть от 2 до 20 символов, начинаться с решетки и состоять из букв и цифр'
  );
  pristine.addValidator(
    hashTagsElement,
    isNoMoreThanFiveElements,
    'Вы можете указать не больше 5 хэштегов'
  );
  pristine.addValidator(
    hashTagsElement,
    areSameElements,
    'Хэштеги не должны повторяться'
  );
  pristine.addValidator(
    descriptionElement,
    validateCommentMaxLength,
    'Длина комментария может быть не более 140 символов'
  );

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      submitButton.disabled = true;
      sendData(
        () => {
          showSuccessMessage();
          closeUploudFileElement();
          submitButton.disabled = false;

          const successMessage = document.querySelector('.success');
          const successMessageCloseButton =
            document.querySelector('.success__button');

          function onSuccessMessageCloseButtonClick() {
            successMessage.classList.add('hidden');
            successMessage.remove();
            successMessageCloseButton.removeEventListener(
              'click',
              onSuccessMessageCloseButtonClick
            );
          }
          successMessageCloseButton.addEventListener(
            'click',
            onSuccessMessageCloseButtonClick
          );
        },

        () => {
          showErrorMessage();
          submitButton.disabled = false;
          imgUploadOverlay.classList.add('hidden');

          const errorMessage = document.querySelector('.error');
          const errorMessageCloseButton =
            document.querySelector('.error__button');

          function onErrorMessageCloseButtonClick() {
            imgUploadOverlay.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            errorMessage.remove();
            errorMessageCloseButton.removeEventListener(
              'click',
              onErrorMessageCloseButtonClick
            );
          }
          errorMessageCloseButton.addEventListener(
            'click',
            onErrorMessageCloseButtonClick
          );
        },

        new FormData(evt.target)
      );
    }
  });
}

export { addNewImage, validateForm };
