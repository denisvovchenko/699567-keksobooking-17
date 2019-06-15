'use strict';

function createPin(pin, i) {
  var pinPhoto = pin.querySelector('img');
  var pinProps = MOCKS_FOR_PINS[i];
  var pinCoordX = 'left: ' + pinProps.location.x + 'px;';
  var pinCoordY = 'top: ' + pinProps.location.y + 'px;';

  pin.style = pinCoordX + ' ' + pinCoordY;
  pinPhoto.src = pinProps.author.avatar;
  pinPhoto.alt = pinProps.offer.type;

  return pin;
}

function renderPins(pins) {
  mapPins.appendChild(pins);
}

function addPins() {
  var fragentForPins = document.createDocumentFragment();
  var sourcePin = document.querySelector('#pin')
                    .content
                    .querySelector('.map__pin');

  for (var i = 0; i < MOCKS_FOR_PINS_LENGTH; i++) {
    var newPin = sourcePin.cloneNode(true);

    fragentForPins.appendChild(createPin(newPin, i));
  }

  renderPins(fragentForPins);
}

function getPinProps(prop) {
  var element = document.querySelector('#pin')
                        .content
                        .querySelector('.map__pin')
                        .cloneNode(true);

  body.appendChild(element);

  var propValue = window.getComputedStyle(element).getPropertyValue(prop);

  body.removeChild(element);

  return propValue ? propValue : '';
}

function getNumberWithLeadZero(i) {
  return i < 10 ? '0' + i : i;
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPinMock(i) {
  var photoNumber = getNumberWithLeadZero(i + 1);

  var newPinMock = {
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

  return newPinMock;
}

function fillMocks(count) {
  var mocksArray = [];

  for (var i = 0; i < count; i++) {
    mocksArray[i] = createPinMock(i);
  }

  return mocksArray;
}

// Variables

var body = document.querySelector('body');

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

var mapPins = document.querySelector('.map__pins');

var PIN_SIZE = {
  width: parseInt(getPinProps('width'), 10),
  height: parseInt(getPinProps('height'), 10),
};

var MOCKS_FOR_PINS_LENGTH = 8;
var MOCKS_FOR_PINS = fillMocks(MOCKS_FOR_PINS_LENGTH);

// временно
MAP.classList.remove('map--faded');

addPins();
