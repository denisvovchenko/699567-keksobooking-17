'use strict';

var BODY = document.querySelector('body');
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAP = document.querySelector('.map');
var MAP_WIDTH = MAP.offsetWidth;

var MAP_DIMENSIONS = {
  x: {
    start: 0,
    end: MAP_WIDTH,
  },

  y: {
    start: 130,
    end: 630,
  },
};

var MAP_PINS = document.querySelector('.map__pins');

var PIN_SIZE = {
  width: parseInt(getPinProps('width'), 10),
  height: parseInt(getPinProps('height'), 10),
};

var MOCKS_LENGTH = 8;
var MOCKS = fillMocks(MOCKS_LENGTH);

// временно
MAP.classList.remove('map--faded');

createPins();

// Functions

function getPinProps(prop) {
  var element = document.querySelector('#pin')
                        .content
                        .querySelector('.map__pin')
                        .cloneNode(true);

  BODY.appendChild(element);

  var value = window.getComputedStyle(element).getPropertyValue(prop);

  BODY.removeChild(element);

  return value ? value : '';
}

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
        x: getRandomNum(PIN_SIZE.width, MAP_WIDTH - (PIN_SIZE.width)),
        y: getRandomNum(MAP_DIMENSIONS.y.start + PIN_SIZE.height, MAP_DIMENSIONS.y.end),
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

function createPins() {
  var pins = document.createDocumentFragment();

  for (var i = 0; i < MOCKS_LENGTH; i++) {
    var pin = document.querySelector('#pin')
                      .content
                      .querySelector('.map__pin')
                      .cloneNode(true);
    var pinPhoto = pin.querySelector('img');
    var pinProps = MOCKS[i];
    var pinCoordX = 'left: ' + pinProps.location.x + 'px;';
    var pinCoordY = 'top: ' + pinProps.location.y + 'px;';

    pin.style = pinCoordX + ' ' + pinCoordY;
    pinPhoto.src = pinProps.author.avatar;
    pinPhoto.alt = pinProps.offer.type;

    pins.appendChild(pin);
  }

  renderPins(pins);
}

function renderPins(pins) {
  MAP_PINS.appendChild(pins);
}
