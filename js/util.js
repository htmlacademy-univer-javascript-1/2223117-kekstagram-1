const ALERT_SHOW_TIME = 4000;

function getRandomNumber(minNumber, maxNumber) {
  if (minNumber >= 0 && maxNumber >= 0) {
    return Math.round((maxNumber - minNumber) * Math.random() + minNumber);
  }
  throw new Error("Введены отрицательные числа");
}

function getRandomArrayElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function showErrorMessage() {
  const fragment = document.createDocumentFragment();
  const alertContainer = document.querySelector("body");
  const templateFragment = document.querySelector("#error").content;
  const template = templateFragment.querySelector(".error");
  const templateElement = template.cloneNode(true);
  fragment.appendChild(templateElement);
  alertContainer.appendChild(fragment);
}

function showSuccessMessage() {
  const fragment = document.createDocumentFragment();
  const alertContainer = document.querySelector("body");
  const templateFragment = document.querySelector("#success").content;
  const template = templateFragment.querySelector(".success");
  const templateElement = template.cloneNode(true);
  fragment.appendChild(templateElement);
  alertContainer.appendChild(fragment);
}

function showAlert() {
  const alertContainer = document.createElement("div");
  alertContainer.style.zIndex = "10";
  alertContainer.style.position = "absolute";
  alertContainer.style.left = "0";
  alertContainer.style.top = "0";
  alertContainer.style.right = "0";
  alertContainer.style.padding = "16px 12px";
  alertContainer.style.fontSize = "20px";
  alertContainer.style.textAlign = "center";
  alertContainer.style.backgroundColor = "red";
  alertContainer.textContent = "Не удалось загрузить изображения с сервера";

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

function eliminationRattle(callback, timeoutDelay) {
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
  eliminationRattle,
};
