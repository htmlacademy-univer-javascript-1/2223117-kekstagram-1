import { getRandomIntInclusive, checkLength } from './util.js';

const NAMES = [
  'Кекс',
  'Александр',
  'Митя',
  'Дмитрий',
  'Жираф',
  'Крот',
  'Пеликан',
  'Покемон',
  'Месси',
  'Стив',
  'Роналду',
  'Руни',
  'Адам',
  'Ян',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Ну какая прелесть',
  'Однозначно лайк',
  'Ты вообще кто?',
  'Отдам всё ради этой фотографии',
  'Мне бы такую)',
  'Кабачок?',
  'Бог в помощь',
  'Продам гараж недорого!'
];

function createPhotos(count = 25) {
  const structureOfObjects = [];

  for (let i = 0; i < count; i++) {
    structureOfObjects[i] = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: `Описание ${i + 1}`,
      likes: getRandomIntInclusive(15, 200),
      comments: getComments(getRandomIntInclusive(1, 6))
    };
  }
  return structureOfObjects;
}

function getComments(count) {
  const structureOfObjects = [];
  const commentsOffset = getRandomIntInclusive(0, 1000);

  for (let i = 0; i < count; i++) {
    structureOfObjects[i] = {
      id: i + commentsOffset,
      avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
      message: MESSAGES[getRandomIntInclusive(0, MESSAGES.length - 1)],
      name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)],
    };
  }

  return structureOfObjects;
}

checkLength('', 1);
export { createPhotos };

