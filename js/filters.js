import { getRandomArrayElement, showAlert, debounce } from "./util.js";
import { renderThumbnails } from "./create-images.js";
import { getData } from "./api.js";

const RANDOM_IMAGES_COUNT = 10;
const TIME_DELAY_FOR_DEBOUNCE = 500;

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

  function applyFilterRandom(images) {
    const imagesArrayFull = images.slice();

    const set = new Set();
    while (set.size < RANDOM_IMAGES_COUNT) {
      set.add(getRandomArrayElement(imagesArrayFull));
    }
    const filteredPhotos = Array.from(set);
    renderThumbnails(filteredPhotos);
  }

  function applyFilterDiscussed(images) {
    const imagesArray = images.slice();
    const filteredPhotos = imagesArray.sort(compareCommentsCount);
    renderThumbnails(filteredPhotos);
  }

  function filterHandling(evt) {
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
    debounce((evt) => filterHandling(evt), TIME_DELAY_FOR_DEBOUNCE)
  );
}

export { applyFilter };
