import { isEscapeKey } from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadForm.querySelector('#upload-cancel');
const descriptionElement = imgUploadForm.querySelector('.text__description');
const hashTagsElement = imgUploadForm.querySelector('.text__hashtags');

//Нажатие на ESC
const onEscapeKeydownForm = (evt) => {

  if (isEscapeKey(evt)) {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const onEscapeKeydownFormFocus = (evt) => {

  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

// Изменение поля #upload-file
uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeKeydownForm);
});

//Закрытие окна загрузки
const closeUploudFileElement = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadForm.reset();
  document.removeEventListener('keydown', onEscapeKeydownForm);
};

//Закрытие по кнопке
uploadCancel.addEventListener('click', () => {
  closeUploudFileElement();
});

//Обработчики по полям хэштег и описание
descriptionElement.addEventListener('keydown', onEscapeKeydownFormFocus);
hashTagsElement.addEventListener('keydown', onEscapeKeydownFormFocus);

export { imgUploadForm, descriptionElement, hashTagsElement };
