import { getRandomArrayElement, showAlert, eliminationRattle } from "./util.js";
import { renderThumbnails } from "./create-images.js";
import { getData } from "./api.js";

function applyFilter() {
  const filtersElement = document.querySelector(".img-filters");
  filtersElement.classList.remove("img-filters--inactive");

  const filtersContainer = filtersElement.querySelector(".img-filters__form");
  const filterDefault = filtersElement.querySelector("#filter-default");
  const filterRandom = filtersElement.querySelector("#filter-random");
  const filterDiscussed = filtersElement.querySelector("#filter-discussed");

  const allFilters = [filterDefault, filterRandom, filterDiscussed];

  function applyToActiveFilter(evt) {
    allFilters.forEach((element) => {
      element.classList.remove("img-filters__button--active");
    });
    evt.target.classList.add("img-filters__button--active");
  }

  function compareCommentsCount(imageA, imageB) {
    const CommentsCountA = imageA.comments.length;
    const CommentsCountB = imageB.comments.length;

    return CommentsCountB - CommentsCountA;
  }

  function applyFilterDiscussed(images) {
    const imagesArray = images.slice();

    imagesArray.sort(compareCommentsCount);

    const photoListSection = document.querySelector(".pictures");
    const templateFragment = document.querySelector("#picture").content;
    const template = templateFragment.querySelector(".picture");
    const fragment = document.createDocumentFragment();
    const imagesToDelete = document.querySelectorAll(".picture");
    imagesToDelete.forEach((image) => image.remove());

    for (let i = 0; i < imagesArray.length; i++) {
      const templateElement = template.cloneNode(true);
      const templateImage = templateElement.querySelector(".picture__img");
      const templateDescription =
        templateElement.querySelector(".picture__img");
      const templateComments =
        templateElement.querySelector(".picture__comments");
      const templateLikes = templateElement.querySelector(".picture__likes");

      templateImage.src += imagesArray[i].url;
      templateComments.textContent = imagesArray[i].comments.length;
      templateLikes.textContent = imagesArray[i].likes;
      templateDescription.alt = imagesArray[i].description;
      templateImage.dataset.id = imagesArray[i].id;

      fragment.appendChild(templateElement);
    }

    photoListSection.appendChild(fragment);
  }

  function applyFilterRandom(images) {
    const copyOfArray = images.slice();

    const set = new Set();
    while (set.size < 10) {
      set.add(getRandomArrayElement(copyOfArray));
    }
    const imagesArray = Array.from(set);

    const photoListSection = document.querySelector(".pictures");
    const templateFragment = document.querySelector("#picture").content;
    const template = templateFragment.querySelector(".picture");
    const fragment = document.createDocumentFragment();

    const imagesToDelete = document.querySelectorAll(".picture");
    imagesToDelete.forEach((image) => image.remove());

    for (let i = 0; i < imagesArray.length; i++) {
      const templateElement = template.cloneNode(true);
      const templateImage = templateElement.querySelector(".picture__img");
      const templateDescription =
        templateElement.querySelector(".picture__img");
      const templateComments =
        templateElement.querySelector(".picture__comments");
      const templateLikes = templateElement.querySelector(".picture__likes");

      templateImage.src += imagesArray[i].url;
      templateComments.textContent = imagesArray[i].comments.length;
      templateLikes.textContent = imagesArray[i].likes;
      templateDescription.alt = imagesArray[i].description;
      templateImage.dataset.id = imagesArray[i].id;

      fragment.appendChild(templateElement);
    }

    photoListSection.appendChild(fragment);
  }

  function filterHandler(evt) {
    evt.preventDefault();
    switch (evt.target.id) {
      case "filter-discussed":
        applyToActiveFilter(evt);
        getData(applyFilterDiscussed, showAlert);
        break;
      case "filter-random":
        applyToActiveFilter(evt);
        getData(applyFilterRandom, showAlert);
        break;
      case "filter-default":
      default:
        applyToActiveFilter(evt);
        getData(renderThumbnails, showAlert);
    }
  }

  filtersContainer.addEventListener(
    "click",
    eliminationRattle((evt) => filterHandler(evt), 500)
  );
}

export { applyFilter };
