import { isEscapeKey } from "./util.js";

function showBigPicture(generatedImagesArray) {
  const bigPicture = document.querySelector(".big-picture");
  const commentList = bigPicture.querySelector(".social__comments");
  const commentsCount = bigPicture.querySelector(".comments-count");
  const bigPictureCancel = bigPicture.querySelector(".big-picture__cancel");
  const bigPictureImg = bigPicture.querySelector(".big-picture__img > img");
  const likesCount = bigPicture.querySelector(".likes-count");
  const socialCaption = bigPicture.querySelector(".social__caption");
  const commentsLoader = bigPicture.querySelector(".comments-loader");
  const pictures = document.querySelector(".pictures");

  let addDefiniteComments = null;

  function openBigPicture(image) {
    bigPicture.classList.remove("hidden");
    document.body.classList.add("modal-open");
    commentsLoader.classList.remove("hidden");
    bigPictureImg.src = image.url;
    likesCount.textContent = image.likes;
    commentsCount.textContent = image.comments.length;
    socialCaption.textContent = image.description;
    clearComments();
    renderComments(image.comments);
    document.addEventListener("keydown", onEscapeButtonClick);
    bigPictureCancel.addEventListener("click", closeBigPicture);
  }

  function closeBigPicture(evt) {
    evt.preventDefault();
    bigPicture.classList.add("hidden");
    document.body.classList.remove("modal-open");
    clearComments();
    document.removeEventListener("keydown", onEscapeButtonClick);
    bigPictureCancel.removeEventListener("click", closeBigPicture);
    commentsLoader.removeEventListener("click", addDefiniteComments);
  }

  const onEscapeButtonClick = (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPicture();
    }
  };

  function clearComments() {
    commentList.textContent = "";
  }

  function createAllComments(comments) {
    const templateFragment = document.querySelector("#comment").content;
    const photoTemplate = templateFragment.querySelector(".social__comment");
    const fragment = document.createDocumentFragment();

    comments.forEach((element) => {
      const photo = photoTemplate.cloneNode(true);
      const templatePicture = photo.querySelector(".social__picture");
      const templateText = photo.querySelector(".social__text");
      templatePicture.src = element.avatar;
      templatePicture.alt = element.name;
      templateText.textContent = element.message;

      fragment.appendChild(photo);
    });
    commentList.appendChild(fragment);
  }

  function renderComments(comments) {
    const commentsArrayCopy = comments.slice();

    if (commentsArrayCopy.length <= 5) {
      createAllComments(commentsArrayCopy);
      commentsLoader.classList.add("hidden");
      return;
    }

    addDefiniteComments = function createDefiniteComments() {
      createAllComments(commentsArrayCopy.splice(0, 5));

      if (commentsArrayCopy.length === 0) {
        commentsLoader.classList.add("hidden");
        commentsLoader.removeEventListener("click", addDefiniteComments);
      }
    };

    createAllComments(commentsArrayCopy.splice(0, 5));
    commentsLoader.classList.remove("hidden");
    commentsLoader.addEventListener("click", addDefiniteComments);
  }

  pictures.addEventListener("click", (evt) => {
    if (evt.target.dataset.id) {
      evt.preventDefault();
      const id = evt.target.dataset.id;
      const image = generatedImagesArray.find((item) => +id === item.id);
      openBigPicture(image);
    }
  });
}

export { showBigPicture };
