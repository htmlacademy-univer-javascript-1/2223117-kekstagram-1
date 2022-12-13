const ALERT_SHOW_TIME = 4000;

const isEscapeKey = (evt) => evt.key === "Escape";

function showErrorMessage() {
  const fragment = document.createDocumentFragment();
  const messageContainer = document.querySelector("body");
  const templateFragment = document.querySelector("#error").content;
  const template = templateFragment.querySelector(".error");
  const templateElement = template.cloneNode(true);
  fragment.appendChild(templateElement);
  messageContainer.appendChild(fragment);
}

function showSuccessMessage() {
  const fragment = document.createDocumentFragment();
  const messageContainer = document.querySelector("body");
  const templateFragment = document.querySelector("#success").content;
  const template = templateFragment.querySelector(".success");
  const templateElement = template.cloneNode(true);
  fragment.appendChild(templateElement);
  messageContainer.appendChild(fragment);
}

const showAlert = (message) => {
  const alertContainer = document.createElement("div");
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = "absolute";
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = "10px 3px";
  alertContainer.style.fontSize = "15px";
  alertContainer.style.textAlign = "center";
  alertContainer.style.backgroundColor = "red";

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { isEscapeKey, showErrorMessage, showSuccessMessage, showAlert };
