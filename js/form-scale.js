const SCALE_MIN = 0.25;
const SCALE_MAX = 1;
const SCALE_STEP = 0.25;

const imagePreview = document.querySelector('.img-upload__preview img');
const scale = document.querySelector('.img-upload__scale');
const scaleSmallerButton = scale.querySelector('.scale__control--smaller');
const scaleBiggerButton = scale.querySelector('.scale__control--bigger');
const scaleField = scale.querySelector('.scale__control--value');

let onSmallerScaleButtonClick = null;
let onBiggerScaleButtonClick = null;

function changeScale() {
  let scaleCurrent = 1;

  scaleField.value = '100%';
  imagePreview.style.transform = 'scale(1)';

  function scaleTransform() {
    scaleField.value = `${scaleCurrent * 100}%`;
    imagePreview.style.transform = `scale(${scaleCurrent})`;
    imagePreview.style.transition = '0.2s';
  }

  onSmallerScaleButtonClick = function decreaseScale() {
    if (scaleCurrent > SCALE_MIN) {
      scaleCurrent -= SCALE_STEP;
      scaleTransform();
    }
  };

  onBiggerScaleButtonClick = function increaseScale() {
    if (scaleCurrent < SCALE_MAX) {
      scaleCurrent += SCALE_STEP;
      scaleTransform();
    }
  };

  scaleSmallerButton.addEventListener('click', onSmallerScaleButtonClick);
  scaleBiggerButton.addEventListener('click', onBiggerScaleButtonClick);
}

function deleteScaleHandlers() {
  scaleSmallerButton.removeEventListener('click', onSmallerScaleButtonClick);
  scaleBiggerButton.removeEventListener('click', onBiggerScaleButtonClick);
}

export { changeScale, deleteScaleHandlers };
