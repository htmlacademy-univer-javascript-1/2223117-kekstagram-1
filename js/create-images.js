function renderThumbnails(images) {
  const imagesArray = images;

  const photoListSection = document.querySelector(".pictures");
  const templateFragment = document.querySelector("#picture").content;
  const phototemplate = templateFragment.querySelector(".picture");
  const photosListFragment = document.createDocumentFragment();

  const photosTodelete = document.querySelectorAll(".picture");
  photosTodelete.forEach((image) => image.remove());

  for (let i = 0; i < imagesArray.length; i++) {
    const templateElement = phototemplate.cloneNode(true);
    const templateImage = templateElement.querySelector(".picture__img");
    const templateDescription = templateElement.querySelector(".picture__img");
    const templateComments =
      templateElement.querySelector(".picture__comments");
    const templateLikes = templateElement.querySelector(".picture__likes");

    templateImage.src += imagesArray[i].url;
    templateComments.textContent = imagesArray[i].comments.length;
    templateLikes.textContent = imagesArray[i].likes;
    templateDescription.alt = imagesArray[i].description;
    templateImage.dataset.id = imagesArray[i].id;

    photosListFragment.appendChild(templateElement);
  }

  photoListSection.appendChild(photosListFragment);
}

export { renderThumbnails };
