function renderThumbnails(images) {
  const imagesArray = images;

  const photoListSection = document.querySelector(".pictures");
  const templateFragment = document.querySelector("#picture").content;
  const phototemplate = templateFragment.querySelector(".picture");
  const photosListFragment = document.createDocumentFragment();

  for (let i = 0; i < imagesArray.length; i++) {
    const photo = phototemplate.cloneNode(true);
    const templateImage = photo.querySelector(".picture__img");
    const templateDescription = photo.querySelector(".picture__img");
    const templateComments = photo.querySelector(".picture__comments");
    const templateLikes = photo.querySelector(".picture__likes");

    templateImage.src += imagesArray[i].url;
    templateComments.textContent = imagesArray[i].comments.length;
    templateLikes.textContent = imagesArray[i].likes;
    templateDescription.alt = imagesArray[i].description;
    templateImage.dataset.id = imagesArray[i].id;

    photosListFragment.appendChild(photo);
  }

  photoListSection.appendChild(photosListFragment);

  return photoListSection;
}

export { renderThumbnails };
