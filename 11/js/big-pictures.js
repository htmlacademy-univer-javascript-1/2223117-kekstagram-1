import { isEscapeKey } from './util.js';

const MIN_COMMENTS_COUNT = 5;

//  Полноэкранный показ изображения
const bigPicture = document.querySelector('.big-picture');
// Комментарии к изображению
const commentList = document.querySelector('.social__comments');
const commentItem = commentList.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
// Загрузка новых комментариев
const commentsLoader = document.querySelector('.social__comments-loader');
// Просмотр изображения
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
// Лайки действующего изображения
const likesCount = bigPicture.querySelector('.likes-count');
// Подпись к действующему изображению
const socialCaption = bigPicture.querySelector('.social__caption');
// Выход из полноэкранного просмотра изображения
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const showBigPicture = (picture) => {
  const allCommentsCount = picture.comments.length;
  let countCommentsShown = allCommentsCount >= MIN_COMMENTS_COUNT ? MIN_COMMENTS_COUNT : allCommentsCount;

  // Рендер комментариев
  const renderComments = (comments, currentCount) => {
    socialCommentCount.textContent = `${currentCount} из ${allCommentsCount} комметариев`;

    if (currentCount >= allCommentsCount) {
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', clickingTheLoadMoreButton);
    }

    const fragment = document.createDocumentFragment();

    comments.forEach((comment) => {
      const commentElement = commentItem.cloneNode(true);
      const avatarElement = commentElement.querySelector('img');
      const commentTextElement = commentElement.querySelector('p');

      avatarElement.src = comment.avatar;
      avatarElement.alt = comment.name;
      commentTextElement.textContent = comment.message;

      fragment.append(commentElement);
    });


    commentList.append(fragment);
  };

  // обработчик для загрузки комментариев
  function clickingTheLoadMoreButton() {
    let nextCommentsCount = countCommentsShown + MIN_COMMENTS_COUNT;
    if (nextCommentsCount > allCommentsCount) {
      nextCommentsCount = allCommentsCount;
    }

    renderComments(picture.comments.slice(countCommentsShown, nextCommentsCount), nextCommentsCount);
    countCommentsShown = nextCommentsCount;
  }

  // Открытие/закрытие по клику
  const onCancelButtonClick = () => {
    closeBigPicture();
  };

  // Открытие/закрытие по Esc
  const onEscapeButtonClick = (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPicture();
    }
  };

  // Открытие большого изображения
  const openBigPicture = () => {
    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');

    bigPictureCancel.addEventListener('click', onCancelButtonClick);
    document.addEventListener('keydown', onEscapeButtonClick);
    commentsLoader.addEventListener('click', clickingTheLoadMoreButton);
  };

  // Закрытие большого изображения
  function closeBigPicture() {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    commentsLoader.classList.remove('hidden');

    bigPictureCancel.removeEventListener('click', onCancelButtonClick);
    document.removeEventListener('keydown', onEscapeButtonClick);
    commentsLoader.removeEventListener('click', clickingTheLoadMoreButton);
  }

  // устанавливаем значения в разметку
  bigPictureImg.src = picture.url;
  socialCaption.textContent = picture.description;
  likesCount.textContent = picture.likes;
  commentList.innerHTML = '';
  // рендерим первые комментарии
  renderComments(picture.comments.slice(0, countCommentsShown), countCommentsShown);
  // открываем окно
  openBigPicture();
};

export { showBigPicture };
