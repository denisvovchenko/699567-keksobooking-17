'use strict';

(function () {
  var HOUSING_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var roomsCapacity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  var form = document.querySelector('.ad-form');
  var housingType = form.querySelector('#type');
  var roomsSelect = form.querySelector('#room_number');
  var guestsSelect = form.querySelector('#capacity');

  var popupTemplate = {
    success: document.querySelector('#success').content.querySelector('.success'),
    error: document.querySelector('#error').content.querySelector('.error'),
  };

  var synchronizeTimein = function () {
    var timeInSelect = document.querySelector('#timein');
    var timeOutSelect = document.querySelector('#timeout');
    var timeSelects = [timeInSelect, timeOutSelect];

    timeSelects.forEach(function (currentSelect) {
      currentSelect.addEventListener('change', function () {
        var dependentSelect = (currentSelect === timeInSelect) ? timeOutSelect : timeInSelect;

        dependentSelect.value = currentSelect.value;
      });
    });
  };

  var changeMinPriceValue = function (housingTypeValue) {
    var housingPriceInput = document.querySelector('#price');
    var minPrice = HOUSING_PRICES[housingTypeValue];

    housingPriceInput.setAttribute('min', minPrice);
    housingPriceInput.setAttribute('placeholder', minPrice);
  };

  var getHousingTypeValue = function () {
    return housingType.value;
  };

  var addHousingTypeChangesListener = function () {
    housingType.addEventListener('change', function () {
      changeMinPriceValue(getHousingTypeValue());
    });
  };

  var toggleFormElements = (function () {
    var formElements = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');

    return function () {
      formElements.forEach(function (formElement) {
        formElement.disabled = !formElement.disabled;
      });
    };
  })();

  var enableAdForm = function () {
    form.classList.remove('ad-form--disabled');

    toggleFormElements();
  };

  var disableAdForm = function () {
    form.classList.add('ad-form--disabled');

    toggleFormElements();
  };

  var resetAdForm = function () {
    form.reset();
  };

  var setAddressInputValue = function () {
    var addressInput = document.querySelector('#address');
    var mainPinDimensions = window.mainPin.getCoords();

    addressInput.value = mainPinDimensions.x + ',' + mainPinDimensions.y;
  };

  var getCorrectOptions = function (roomsCount) {
    return roomsCapacity[roomsCount].map(function (guestsOptionNumber) {
      return document.querySelector('#capacity option[value="' + guestsOptionNumber + '"]').textContent;
    }, '').join(', ');
  };

  var validateRoomsCapacity = function () {
    var roomsCount = parseInt(roomsSelect.value, 10);
    var guestsCount = parseInt(guestsSelect.value, 10);

    if (roomsCapacity[roomsCount].indexOf(guestsCount) === -1) {
      var errorString = 'Выбрано неверное количество мест. Для выбранного количества комнат возможны следующие варианты количества мест: ' + getCorrectOptions(parseInt(roomsSelect.value, 10));

    } else {
      errorString = '';
    }

    guestsSelect.setCustomValidity(errorString);
  };

  var setFormValidation = function () {
    validateRoomsCapacity();

    roomsSelect.addEventListener('change', validateRoomsCapacity);
    guestsSelect.addEventListener('change', validateRoomsCapacity);
  };

  var showResultPopup = function (result) {
    var resultPopup = popupTemplate[result];

    document.body.appendChild(resultPopup);

    var onEscapeKeydown = function (evt) {
      if (window.isEscapeKey(evt)) {
        resultPopup.remove();
      }

      document.removeEventListener('keydown', onEscapeKeydown);
    };

    var onMouseClick = function () {
      resultPopup.remove();

      document.removeEventListener('click', onMouseClick);
    };

    document.addEventListener('keydown', onEscapeKeydown);
    document.addEventListener('click', onMouseClick);

    if (result === 'success') {
      window.app.reset();
    }
  };

  var setFormSending = function () {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();

      window.upload(form.action, form.enctype, showResultPopup);
    });
  };

  var setFormReseting = function () {
    form.addEventListener('reset', function () {
      setTimeout(function () {
        setAddressInputValue();

        changeMinPriceValue(getHousingTypeValue());
      }, 4);
    });
  };

  var formInit = function () {
    toggleFormElements();

    synchronizeTimein();

    addHousingTypeChangesListener();

    setAddressInputValue();

    setFormValidation();

    setFormSending();

    setFormReseting();
  };

  formInit();

  window.form = {
    enable: enableAdForm,
    disable: disableAdForm,
    reset: resetAdForm,
    setAddressInputValue: setAddressInputValue,
  };
})();
