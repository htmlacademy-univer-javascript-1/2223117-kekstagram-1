import { showAlert } from './util.js';
import { renderThumbnails } from './create-images.js';
import { showBigPicture } from './big-pictures.js';
import { addNewImage, validateForm } from './form.js';
import { getData } from './api.js';
import { applyFilter } from './filters.js';

getData(renderThumbnails, showAlert);
getData(showBigPicture, showAlert);
addNewImage();
validateForm();
applyFilter();
