const imgUploadPreview = document.querySelector('.img-upload__preview');
const radioButtonsEffects = document.querySelectorAll('.effects__radio');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderEffectElement = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');

sliderEffectElement.classList.add('hidden');

const clearTheEffect = () => {
  imgUploadPreview.className = 'img-upload__preview';
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }
  imgUploadPreview.style.filter = '';
};

const applyEffectNone = () => {
  clearTheEffect();
  imgUploadPreview.classList.add('effects__preview--none');
  sliderEffectElement.classList.toggle('hidden');
};

// Хром
const applyEffectChrome = () => {
  clearTheEffect();
  imgUploadPreview.classList.add('effects__preview--chrome');
  sliderEffectElement.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
  });
};

// Сепия
const applyEffectSepia = () => {
  clearTheEffect();
  imgUploadPreview.classList.add('effects__preview--sepia');
  sliderEffectElement.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
  });
};

// Марвин
const applyEffectMarvin = () => {
  clearTheEffect();
  imgUploadPreview.classList.add('effects__preview--marvin');
  sliderEffectElement.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return `${value}%`;
      },
      from: function (value) {
        return parseInt(value.replace('%', ''), 10);
      },
    },
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get().replace('%', '');
    imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
  });
};

// Фобос
const applyEffectPhobos = () => {
  clearTheEffect();
  imgUploadPreview.classList.add('effects__preview--phobos');
  sliderEffectElement.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        return `${value}px`;
      },
      from: function (value) {
        return parseInt(value.replace('px', ''), 10);
      },
    },
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get().replace('px', '');
    imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
  });
};

// Зной
const applyEffectHeat = () => {
  clearTheEffect();
  imgUploadPreview.classList.add('effects__preview--heat');
  sliderEffectElement.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
  });
};

// Кпопки эффектов
radioButtonsEffects.forEach((effectsRadioButton) => {
  effectsRadioButton.addEventListener('change', () => {
    if (effectsRadioButton.checked) {
      const effectId = effectsRadioButton.id;
      switch (effectId) {
        case 'effect-none':
          applyEffectNone();
          break;
        case 'effect-chrome':
          applyEffectChrome();
          break;
        case 'effect-sepia':
          applyEffectSepia();
          break;
        case 'effect-marvin':
          applyEffectMarvin();
          break;
        case 'effect-phobos':
          applyEffectPhobos();
          break;
        case 'effect-heat':
          applyEffectHeat();
          break;
      }
    }
  });
});
