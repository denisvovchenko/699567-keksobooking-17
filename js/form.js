'use strict';

(function () {
  var HOUSING_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
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
    var mainPinDimensions = window.pin.getMainPinCoords();

    addressInput.value = mainPinDimensions.x + ',' + mainPinDimensions.y;
  };

  toggleFormElements();
  synchronizeTimein();
  addHousingTypeChangesListener();
  setAddressInputValue();

  window.form = {
    enable: enableAdForm,
    setAddressInputValue: setAddressInputValue,
  };
})();
