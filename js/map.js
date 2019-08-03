'use strict';

(function () {
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

  var DRAGGING_LIMITS = {
    top: 130,
    right: MAP.offsetWidth,
    bottom: 630,
    left: 0,
  };

  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters');
  var mapFilterElements = mapFilter.querySelectorAll('select, fieldset');

  var toggleMapFilter = function () {
    mapFilterElements.forEach(function (mapFilterElement) {
      mapFilterElement.disabled = !mapFilterElement.disabled;
    });
  };

  var enableMapFilter = function () {
    toggleMapFilter();
  };

  var disableMapFilter = function () {
    toggleMapFilter();
  };

  var isMapActivated = function () {
    return !MAP.classList.contains('map--faded');
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
  };

  var disableMap = function () {
    map.classList.add('map--faded');

    disableMapFilter();

    mapFilter.reset();
  };

  toggleMapFilter();

  window.map = {
    DIMENSIONS: MAP_DIMENSIONS,
    LIMITS: DRAGGING_LIMITS,
    WIDTH: MAP_WIDTH,

    isActivated: isMapActivated,
    enable: enableMap,
    disable: disableMap,

    enableFilter: enableMapFilter,
  };
})();
