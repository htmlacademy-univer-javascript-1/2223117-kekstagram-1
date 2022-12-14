function showBigPicture(generatedImagesArray) {
  const bigPicture = document.querySelector(".big-picture");
  const commentList = bigPicture.querySelector(".social__comments");
  const commentsCount = bigPicture.querySelector(".comments-count");
  const bigPictureCancel = bigPicture.querySelector(".big-picture__cancel");
  const bigPictureImg = bigPicture.querySelector(".big-picture__img > img");
  const likesCount = bigPicture.querySelector(".likes-count");
  const socialCaption = bigPicture.querySelector(".social__caption");
  const commentsLoader = bigPicture.querySelector(".comments-loader");
  const commentsBlock = bigPicture.querySelector(".social__comment-count");
  const pictures = document.querySelector(".pictures");

  let addDefiniteComments = null;
  let commentsCounter = 0;

  function openBigPicture(image) {
    bigPicture.classList.remove("hidden");
    document.body.classList.add("modal-open");
    commentsLoader.classList.remove("hidden");
    bigPictureImg.src = image.url;
    likesCount.textContent = image.likes;
    commentsCount.textContent = image.comments.length;
    socialCaption.textContent = image.description;
    clearComments();
    commentsCounter = 0;
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

  function onEscapeButtonClick(evt) {
    if (evt.key === "Escape") {
      closeBigPicture(evt);
    }
  }

  function clearComments() {
    commentList.textContent = "";
  }

  function createAllComments(comments, totalComments) {
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
      commentsCounter++;
    });

    commentList.appendChild(fragment);
    commentsBlock.textContent = `${commentsCounter} из ${totalComments} комментариев`;
  }

  function renderComments(comments) {
    const commentsArrayCopy = comments.slice();
    const totalComments = comments.length;

    if (commentsArrayCopy.length <= 5) {
      createAllComments(commentsArrayCopy, totalComments);
      commentsLoader.classList.add("hidden");
      return;
    }

    addDefiniteComments = function createDefiniteComments() {
      createAllComments(commentsArrayCopy.splice(0, 5), totalComments);

      if (commentsArrayCopy.length === 0) {
        commentsLoader.classList.add("hidden");
        commentsLoader.removeEventListener("click", addDefiniteComments);
      }
    };

    createAllComments(commentsArrayCopy.splice(0, 5), totalComments);
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
