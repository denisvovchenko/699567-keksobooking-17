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

  var isMapActivated = function () {
    return !MAP.classList.contains('map--faded');
  };

  var enableMap = function () {
    var mapForm = document.querySelector('.map');

    mapForm.classList.remove('map--faded');
  };

  window.map = {
    DIMENSIONS: MAP_DIMENSIONS,
    LIMITS: DRAGGING_LIMITS,
    WIDTH: MAP_WIDTH,

    isActivated: isMapActivated,
    enable: enableMap,
  };
})();
