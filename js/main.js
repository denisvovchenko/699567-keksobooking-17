'use strict';

function createPin(pin, ad) {
  var pinPhoto = pin.querySelector('img');
  var pinCoordX = 'left: ' + ad.location.x + 'px;';
  var pinCoordY = 'top: ' + ad.location.y + 'px;';

  pin.style = pinCoordX + ' ' + pinCoordY;
  pinPhoto.src = ad.author.avatar;
  pinPhoto.alt = ad.offer.type;

  return pin;
}

function renderPins(pins) {
  mapPins.appendChild(pins);
}

function addPins() {
  var fragmentForPins = document.createDocumentFragment();
  var ads = [];

  var sourcePin = document.querySelector('#pin')
                    .content
                    .querySelector('.map__pin');

  for (var i = 0; i < ADS_COUNT; i++) {
    var newPin = sourcePin.cloneNode(true);
    ads[i] = createAd(i);

    fragmentForPins.appendChild(createPin(newPin, ads[i]));
  }

  renderPins(fragmentForPins);
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

function createAd(i) {
  var photoNumber = getNumberWithLeadZero(i + 1);

  var newPinDatas = {
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

  return newPinDatas;
}

function showMap() {
  MAP.classList.remove('map--faded');
}

// Variables and constants

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

var ADS_COUNT = 8;

// временно
showMap();

addPins();
