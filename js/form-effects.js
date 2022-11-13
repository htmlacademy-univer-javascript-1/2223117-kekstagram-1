const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;


const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadPreviewElement = imgUploadOverlayElement.querySelector('.img-upload__preview').querySelector('img');


scaleControlValueElement.value = `${DEFAULT_SCALE_VALUE}%`;

const getTransformValue = () => parseInt(scaleControlValueElement.value, 10);

const getScaleImgTransform = () => {
  imgUploadPreviewElement.style.transform = `scale(${(parseInt(scaleControlValueElement.value, 10) / 100)})`;
};


const getLowerValueScale = () => {
  let resultValue = getTransformValue() - SCALE_STEP;
  if (resultValue < MIN_SCALE_VALUE) {
    resultValue = MIN_SCALE_VALUE;
  } else {
    scaleControlValueElement.value = `${resultValue}%`;
  }
};


const getHigherValueScale = () => {
  let resultValue = getTransformValue() + SCALE_STEP;
  if (resultValue > MAX_SCALE_VALUE) {
    resultValue = MAX_SCALE_VALUE;
  }
  scaleControlValueElement.value = `${resultValue}%`;
};

const onMinButtonClick = () => {
  getLowerValueScale();
  getScaleImgTransform();
};


const onMaxButtonClick = () => {
  getHigherValueScale();
  getScaleImgTransform();
};


scaleControlSmallerElement.addEventListener('click', onMinButtonClick);
scaleControlBiggerElement.addEventListener('click', onMaxButtonClick);
