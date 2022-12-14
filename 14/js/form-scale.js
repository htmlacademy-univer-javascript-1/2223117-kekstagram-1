const imagePreview = document.querySelector(".img-upload__preview img");
const scale = document.querySelector(".img-upload__scale");
const scaleSmallerButton = scale.querySelector(".scale__control--smaller");
const scaleBiggerButton = scale.querySelector(".scale__control--bigger");
const scaleField = scale.querySelector(".scale__control--value");

let onSmallerScaleButtonClick = null;
let onBiggerScaleButtonClick = null;

function changeScale() {
  const scaleStep = 0.25;
  let scaleCurrent = 1;
  scaleField.value = "100%";
  imagePreview.style.transform = "scale(1)";

  function scaleTransform() {
    scaleField.value = `${scaleCurrent * 100}%`;
    imagePreview.style.transform = `scale(${scaleCurrent})`;
    imagePreview.style.transition = "0.2s";
  }

  onSmallerScaleButtonClick = function decreaseScale() {
    if (scaleCurrent > 0.25) {
      scaleCurrent -= scaleStep;
      scaleTransform();
    }
  };

  onBiggerScaleButtonClick = function increaseScale() {
    if (scaleCurrent < 1) {
      scaleCurrent += scaleStep;
      scaleTransform();
    }
  };

  scaleSmallerButton.addEventListener("click", onSmallerScaleButtonClick);
  scaleBiggerButton.addEventListener("click", onBiggerScaleButtonClick);
}

function deleteScaleHandlers() {
  scaleSmallerButton.removeEventListener("click", onSmallerScaleButtonClick);
  scaleBiggerButton.removeEventListener("click", onBiggerScaleButtonClick);
}

export { changeScale, deleteScaleHandlers };
