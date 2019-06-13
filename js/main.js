'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAP = document.querySelector('.map');
var MAP_WIDTH = MAP.offsetWidth;
var MOCKS_LENGTH = 8;
var MOCKS = fillMocks(MOCKS_LENGTH);

// временно
MAP.classList.remove('map--faded');

function fillMocks(count) {
  var mocks = [];
  var photoNumbers = getRandomNumsArrayWithoutRepeat(count);

  for (var i = 0; i < count; i++) {
    var photoNumber = getTwoPositionNumber(photoNumbers[i]);

    mocks[i] = {
      author: {
        avatar: 'img/avatars/user' + photoNumber + '.png',
      },

      offer: {
        type: OFFER_TYPES[getRandomNum(0, OFFER_TYPES.length - 1)],
      },

      location: {
        x: getRandomNum(0, MAP_WIDTH),
        y: getRandomNum(130, 630),
      }
    };
  }

  return mocks;
}

function getTwoPositionNumber(i) {
  return i < 10 ? '0' + i : i;
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNumsArrayWithoutRepeat(count) {
  var randomNumbers = [];

  for (var i = 0; i < count; i++) {

    do {
      var randomNumber = getRandomNum(1, count);
    } while (randomNumbers.indexOf(randomNumber) !== -1);

    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}
