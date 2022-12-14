const imagePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const slider = document.querySelector('.img-upload__effect-level');
const sliderValue = slider.querySelector('.effect-level__value');
const sliderBar = slider.querySelector('.effect-level__slider');

let chooseEffectContainer = null;

function chooseEffects() {
  function cleareffect() {
    slider.classList.remove('hidden');
    imagePreview.style.filter = '';
    imagePreview.classList = '';
  }

  function onImageEffectUpdate(effectValue) {
    sliderValue.value = sliderBar.noUiSlider.get();
    imagePreview.style.filter = effectValue;
  }

  function onImageChromeEffectUpdate() {
    onImageEffectUpdate(`grayscale(${sliderValue.value})`);
  }

  function onImageSepiaEffectUpdate() {
    onImageEffectUpdate(`sepia(${sliderValue.value})`);
  }

  function onImageMarvinEffectUpdate() {
    onImageEffectUpdate(`invert(${sliderValue.value}%)`);
  }

  function onImagePhobosEffectUpdate() {
    onImageEffectUpdate(`blur(${sliderValue.value}px)`);
  }

  function onImageHeatEffectUpdate() {
    onImageEffectUpdate(`brightness(${sliderValue.value})`);
  }

  chooseEffectContainer = function chooseEffect(evt) {
    if (evt.target.id === 'effect-none') {
      cleareffect();
      slider.classList.add('hidden');
      imagePreview.classList.add('effects__preview--none');
    }

    if (evt.target.id === 'effect-chrome') {
      sliderBar.noUiSlider.updateOptions({
        start: 1,
        step: 0.1,
        range: {
          min: 0,
          max: 1,
        },
        connect: 'lower',
      });

      cleareffect();
      imagePreview.classList.add('effects__preview--chrome');
      sliderBar.noUiSlider.on('update', onImageChromeEffectUpdate);
    }

    if (evt.target.id === 'effect-sepia') {
      sliderBar.noUiSlider.updateOptions({
        start: 1,
        step: 0.1,
        range: {
          min: 0,
          max: 1,
        },
        connect: 'lower',
      });

      cleareffect();
      imagePreview.classList.add('effects__preview--sepia');
      sliderBar.noUiSlider.on('update', onImageSepiaEffectUpdate);
    }

    if (evt.target.id === 'effect-marvin') {
      sliderBar.noUiSlider.updateOptions({
        start: 100,
        step: 1,
        range: {
          min: 0,
          max: 100,
        },
        connect: 'lower',
      });

      cleareffect();
      imagePreview.classList.add('effects__preview--marvin');
      sliderBar.noUiSlider.on('update', onImageMarvinEffectUpdate);
    }

    if (evt.target.id === 'effect-phobos') {
      sliderBar.noUiSlider.updateOptions({
        start: 3,
        step: 0.1,
        range: {
          min: 0,
          max: 3,
        },
        connect: 'lower',
      });

      cleareffect();
      imagePreview.classList.add('effects__preview--phobos');
      sliderBar.noUiSlider.on('update', onImagePhobosEffectUpdate);
    }

    if (evt.target.id === 'effect-heat') {
      sliderBar.noUiSlider.updateOptions({
        start: 3,
        step: 0.1,
        range: {
          min: 1,
          max: 3,
        },
        connect: 'lower',
      });

      cleareffect();
      imagePreview.classList.add('effects__preview--heat');
      sliderBar.noUiSlider.on('update', onImageHeatEffectUpdate);
    }
  };

  cleareffect();
  slider.classList.add('hidden');

  noUiSlider.create(sliderBar, {
    start: 100,
    step: 1,
    range: {
      min: 0,
      max: 100,
    },
    connect: 'lower',
  });

  effectsList.addEventListener('click', chooseEffectContainer);
}

function deleteSlider() {
  effectsList.removeEventListener('click', chooseEffectContainer);
  sliderBar.noUiSlider.destroy();
}

export { chooseEffects, deleteSlider };
