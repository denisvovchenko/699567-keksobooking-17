'use strict';

// Constants and variables

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAP = document.querySelector('.map');
var MAP_WIDTH = MAP.offsetWidth;
var ADS_COUNT = 8;

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

var MAIN_PIN_SIZE = {
  width: 65,
  height: 65,
};

var PIN_SIZE = {
  width: 65,
  height: 65,
};

var HOUSING_PRICES = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

var mainPin = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');

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

var toggleFormElements = (function () {
  var formElements = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');

  return function () {
    formElements.forEach(function (formElement) {
      formElement.disabled = !formElement.disabled;
    });
  };
})();

function addMainPinEventListeners() {
  mainPin.addEventListener('click', onMainPinClick);

  mainPin.addEventListener('mouseup', onMainPinMouseUp);
}

function getMainPinCoords() {
  return {
    x: parseInt(window.getComputedStyle(mainPin).left, 10),
    y: parseInt(window.getComputedStyle(mainPin).top, 10),
  };
}

function setAddressInputValue() {
  var addressInput = document.querySelector('#address');
  var mainPinDimensions = getMainPinCoords();

  var addressCoordX = Math.floor(mainPinDimensions.x + (MAIN_PIN_SIZE.width / 2));
  var addressCoordY = Math.floor(mainPinDimensions.y + (MAIN_PIN_SIZE.height / 2));

  addressInput.value = addressCoordX + ',' + addressCoordY;
}

function enableMap() {
  var mapForm = document.querySelector('.map');
  mapForm.classList.remove('map--faded');
}

function enableAdForm() {
  var adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
}

function enableForms() {
  enableMap();

  enableAdForm();
}

function onMainPinClick() {
  toggleFormElements();

  enableForms();

  addPins();

  mainPin.removeEventListener('click', onMainPinClick);
}

function onMainPinMouseUp(evt) {
  setAddressInputValue(evt);
}

function synchronizeTimeIn() {
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var timeSelects = [timeInSelect, timeOutSelect];

  timeSelects.forEach(function (currentSelect) {
    currentSelect.addEventListener('change', function () {
      var dependentSelect = (currentSelect === timeInSelect) ? timeOutSelect : timeInSelect;

      dependentSelect.value = currentSelect.value;
    });
  });
}

function changeMinPriceValue(housingType) {
  var housingPriceInput = document.querySelector('#price');

  var minPrice = HOUSING_PRICES[housingType];

  housingPriceInput.setAttribute('min', minPrice);
  housingPriceInput.setAttribute('placeholder', minPrice);
}

function addHousingTypeChangesListener() {
  var housingTypes = document.querySelector('#type');

  housingTypes.addEventListener('change', function () {
    changeMinPriceValue(housingTypes.value);
  });
}

setAddressInputValue();

toggleFormElements();

addMainPinEventListeners();

synchronizeTimeIn();

addHousingTypeChangesListener();
