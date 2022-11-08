import { isEscapeKey, checkLength } from './util.js';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 140;

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashTagsElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormEditImg();
  }
};


function openUploadImg() {
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeFormEditImg() {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.imgUploadForm.reset();
  document.removeEventListener('keydown', onPopupEscKeydown);
}

uploadCancel.addEventListener('click', () => {
  closeFormEditImg();
});

uploadFile.addEventListener('change', () => {
  openUploadImg();
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
});

//отменить обработчик Esc при фокусе
hashTagsElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});
descriptionElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

// Валидация хэштегов и комментариев
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const hashtags = function (value) {
  value.toLowerCase().split(' ');
};

pristine.addValidator(hashTagsElement, (value) => hashtags(value).length <= MAX_HASHTAGS,
  'нельзя указать больше пяти хэш-тегов');

const isHashtagValid = (value) => {
  const RegExp = /^#[A-Za-z0-9А-Яа-яЁё]{1,19}$/;
  const array = value.split(' ');
  for (const arrayElement of array) {
    if (!RegExp.test(arrayElement) && arrayElement !== '') {
      return false;
    }
  } return true;
};
pristine.addValidator(hashTagsElement,
  (value) => isHashtagValid(value),
  'хэш-тег начинается с символа #, длиной от 2 до 20 символов, состоит из букв и чисел'
);

pristine.addValidator(descriptionElement,
  (value) => checkLength(value, MAX_SYMBOLS),
  'длина комментария не больше 140 символов'
);

imgUploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (isValid) {
    evt.preventDefault();
  }
});
