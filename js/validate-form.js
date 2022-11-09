import { checkLength } from './util.js';
import { imgUploadForm, descriptionElement, hashTagsElement } from './form.js'

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 5;
const regExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const messageFormError = {
  HASHTAG_FORMAT: 'Хештег должен быть от 2 до 20 символов, начинаться с решетки и состоять из букв и цифр ',
  HASHTAG_LENGTH: `Вы можете указать не больше ${HASHTAG_MAX_LENGTH} хэштегов`,
  HASHTAG_DUPLICATION: 'Хэштеги не должны повторяться',
  COMMENT_LENGTH: `Длина комментария может быть не более ${COMMENT_MAX_LENGTH} символов`,
};

// Проверка хэштегов
const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().trim().split(' ');
  return hashtags.every((hashTag) => regExp.test(hashTag));
};

// Проверка количества хэштегов
const checkingTheNumberOfHashtags = (value) => {
  const hashtags = value.toLowerCase().trim().split(' ');
  return hashtags.length <= HASHTAG_MAX_LENGTH;
};

// Проверка уникальности хэштегов
const checkingUniqueness = (value) => {
  const hashtags = value.toLowerCase().trim().split(' ');
  return hashtags.length === (new Set(hashtags)).size;
};


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper'
});

// Добавляем валидаторы
pristine.addValidator(descriptionElement, (value) => checkLength(value, COMMENT_MAX_LENGTH), messageFormError.COMMENT_LENGTH);
pristine.addValidator(hashTagsElement, validateHashtags, messageFormError.HASHTAG_FORMAT);
pristine.addValidator(hashTagsElement, checkingUniqueness, messageFormError.HASHTAG_DUPLICATION);
pristine.addValidator(hashTagsElement, checkingTheNumberOfHashtags, messageFormError.HASHTAG_LENGTH);


imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
