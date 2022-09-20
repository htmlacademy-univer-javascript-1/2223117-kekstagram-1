//Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

//Функция для проверки максимальной длины строки
function CheckLength(str, maxLength) {
  return str.length <= maxLength;
}


getRandomIntInclusive(1, 2);
CheckLength('', 1);
