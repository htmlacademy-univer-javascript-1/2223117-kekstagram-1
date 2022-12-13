import { renderThumbnails } from "./create-images.js";
import { showBigPicture } from "./big-pictures.js";
import { addNewImage, validateForm } from "./form.js";
import { getData } from "./api.js";

getData(renderThumbnails);
getData(showBigPicture);
addNewImage();
validateForm();
