//  Полноэкранный показ изображения
const bigPicture = document.querySelector('.big-picture');
// Комментарии к изображению
const commentList = document.querySelector('.social__comments');
const commentItem = commentList.querySelector('.social__comment').cloneNode(true);
const socialCommentCount = document.querySelector('.social__comment-count');
// Загрузка новых комментариев
const commentsLoader = document.querySelector('.comments-loader');
// Просмотр изображения
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
// Лайки действующего изображения
const likesCount = bigPicture.querySelector('.likes-count');
// Подпись к действующему изображению
const socialCaption = bigPicture.querySelector('.social__caption');
// Комментарии к действующему изображению
const commentsCount = bigPicture.querySelector('.comments-count');
// Выход из полноэкранного просмотра изображения
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const createComment = ({ avatar, name, message }) => {
  const commentElement = commentItem.cloneNode(true);
  const socialPicture = commentElement.querySelector('.social__picture');
  socialPicture.src = avatar;
  socialPicture.alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.appendChild(commentElement);
  });
  commentList.appendChild(fragment);
};

const showBigPicture = ({ url, likes, description, comments }) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  socialCommentCount.classList.add('hidden');
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
  commentsCount.textContent = comments.length;
  bigPictureCancel.addEventListener('click', () => {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  });

  renderComments(comments);
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
});

export { showBigPicture };
