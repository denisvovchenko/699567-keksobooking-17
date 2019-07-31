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
  var roomsSelect = form.querySelector('#room_number');
  var guestsSelect = form.querySelector('#capacity');

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

  var changeMinPriceValue = function (housingType) {
    var housingPriceInput = document.querySelector('#price');
    var minPrice = HOUSING_PRICES[housingType];

    housingPriceInput.setAttribute('min', minPrice);
    housingPriceInput.setAttribute('placeholder', minPrice);
  };

  var addHousingTypeChangesListener = function () {
    var housingTypes = document.querySelector('#type');

    housingTypes.addEventListener('change', function () {
      changeMinPriceValue(housingTypes.value);
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
    var adForm = document.querySelector('.ad-form');
    adForm.classList.remove('ad-form--disabled');

    toggleFormElements();
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

  var showSuccessPopup = function () {

  };

  var showErrorPopup = function () {

  };

  var setFormSending = function () {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();

      window.upload(form.action, form.enctype, showSuccessPopup, showErrorPopup);
    });
  };

  var formInit = function () {
    toggleFormElements();
    synchronizeTimein();
    addHousingTypeChangesListener();
    setAddressInputValue();
    setFormValidation();
    setFormSending();
  };

  formInit();

  window.form = {
    enable: enableAdForm,
    setAddressInputValue: setAddressInputValue,
  };
})();
