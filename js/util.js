const TIME_DELAY = 4000;

function getRandomNumber(minNumber, maxNumber) {
  if (minNumber >= 0 && maxNumber >= 0) {
    return Math.round((maxNumber - minNumber) * Math.random() + minNumber);
  }
  throw new Error('Введены отрицательные числа');
}

function getRandomArrayElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function showErrorMessage() {
  const fragment = document.createDocumentFragment();
  const messageContainer = document.querySelector('body');
  const templateFragment = document.querySelector('#error').content;
  const template = templateFragment.querySelector('.error');
  const templateElement = template.cloneNode(true);
  fragment.appendChild(templateElement);
  messageContainer.appendChild(fragment);
}

function showSuccessMessage() {
  const fragment = document.createDocumentFragment();
  const messageContainer = document.querySelector('body');
  const templateFragment = document.querySelector('#success').content;
  const template = templateFragment.querySelector('.success');
  const templateElement = template.cloneNode(true);
  fragment.appendChild(templateElement);
  messageContainer.appendChild(fragment);
}

function showAlert() {
  const messageContainer = document.createElement('div');

  messageContainer.style.zIndex = '10';
  messageContainer.style.position = 'absolute';
  messageContainer.style.left = '0';
  messageContainer.style.top = '0';
  messageContainer.style.right = '0';
  messageContainer.style.padding = '16px 12px';
  messageContainer.style.fontSize = '20px';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.backgroundColor = 'red';
  messageContainer.textContent = 'Ошибка загрузки изображений';

  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, TIME_DELAY);
}

function debounce(callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getRandomArrayElement,
  showErrorMessage,
  showSuccessMessage,
  showAlert,
  debounce,
};
