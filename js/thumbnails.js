import { createPhotos } from './object-generator.js';
import { showBigPictureAndRender } from './big-pictures.js';

const renderThumbnails = () => {
  // Находим внутри шаблона элемент для фотографий
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // Создаем переменную для создания фотографий
  const photos = createPhotos();

  // Находим место для фотографий
  const photoListSection = document.querySelector('.pictures');
  // Создаём блок для фотографий
  const photosListFragment = document.createDocumentFragment();

  // Создаёс массив фотографий с лайками и комментариями
  photos.forEach((picture) => {
    const { url, likes, comments } = picture;
    // Создаём копию
    const photo = photoTemplate.cloneNode(true);
    photo.querySelector('.picture__img').src = url;
    photo.querySelector('.picture__likes').textContent = likes;
    photo.querySelector('.picture__comments').textContent = comments.length;
    photosListFragment.appendChild(photo);

    photo.addEventListener('click', () => {
      showBigPictureAndRender(picture);
    });
  });

  // Добавление фотографий в блок
  photoListSection.appendChild(photosListFragment);
};

export { renderThumbnails };
