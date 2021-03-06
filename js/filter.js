'use strict';

(function () {
  var updatePinsOnChange = function (element, filterName) {
    element.addEventListener('change', function () {
      if (element.tagName === 'SELECT') {
        housingFilter[filterName] = isNaN(parseInt(element.value, 10)) ? element.value : parseInt(element.value, 10);

      } else if (element.tagName === 'INPUT') {

        if (element.checked) {
          housingFilter.features.push(element.value);

        } else {
          housingFilter.features.splice(housingFilter.features.indexOf(element.value), 1);
        }
      }

      window.ad.updatePins();
    });
  };

  var housingFilterSelects = Array.from(document.querySelectorAll('.map__filter'));
  var housingFilterCheckboxes = Array.from(document.querySelectorAll('.map__checkbox'));

  housingFilterCheckboxes.forEach(function (checkbox) {
    updatePinsOnChange(checkbox);
  });

  var housingFilter = {
    features: [],
  };

  var filterProperties = housingFilterSelects.map(function (select) {
    var filterName = select.name.split('-')[1];

    housingFilter[filterName] = select.value;

    updatePinsOnChange(select, filterName);

    return filterName;
  });

  var reset = function () {
    for (var filterItem in window.filter.housing) {
      if (filterItem !== 'features') {
        window.filter.housing[filterItem] = 'any';
      }
    }

    window.filter.housing.features = [];
  };

  window.filter = {
    properties: filterProperties.concat(['features']),
    housing: housingFilter,
    reset: reset,
  };
})();
