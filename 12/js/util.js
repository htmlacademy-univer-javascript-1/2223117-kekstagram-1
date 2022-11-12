//Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

//Функция для проверки максимальной длины строки
function checkLength(str, maxLength) {
  return str.length <= maxLength;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

export {
  getRandomIntInclusive, checkLength, isEscapeKey, isEnterKey
};
