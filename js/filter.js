'use strict';

(function () {
  var updatePinsOnChange = function (element) {
    element.addEventListener('change', function () {
      window.updateAdPins();
    });
  };

  var housingFilterSelects = Array.from(document.querySelectorAll('.map__filter'));
  var housingFilterCheckboxes = Array.from(document.querySelectorAll('.map__checkbox'));

  var housingFilter = {
    features: housingFilterCheckboxes.map(function (checkbox) {
      updatePinsOnChange(checkbox);

      return checkbox.value;
    }),
  };

  var filterProperties = housingFilterSelects.map(function (select) {
    var filterName = select.name.split('-')[1];

    housingFilter[filterName] = select.value;

    updatePinsOnChange(select);

    return filterName;
  });

  window.filter = {
    properties: filterProperties.concat(['features']),
    housing: housingFilter,
  };
})();
