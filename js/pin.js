'use strict';

(function () {
  var MAIN_PIN_SIZE = {
    width: 65,
    height: 65,
  };

  var MAIN_PIN_TAIL_HEIGHT = 16;

  var mainPin = document.querySelector('.map__pin--main');

  var getMainPinCoords = function () {
    var mainPinX = parseInt(window.getComputedStyle(mainPin).left, 10) + (MAIN_PIN_SIZE.width / 2);
    var mainPinY = parseInt(window.getComputedStyle(mainPin).top, 10) + MAIN_PIN_SIZE.height + MAIN_PIN_TAIL_HEIGHT;

    if (!window.map.isActivated()) {
      mainPinY = parseInt(window.getComputedStyle(mainPin).top, 10) + (MAIN_PIN_SIZE.height / 2);
    }

    return {
      x: Math.floor(mainPinX),
      y: Math.floor(mainPinY),
    };
  };

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    function onMainPinMouseMove(moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var leftCoord = Math.max(window.map.LIMITS.left, Math.min(window.map.LIMITS.right - MAIN_PIN_SIZE.width, (mainPin.offsetLeft - shift.x)));
      var topCoord = Math.max(window.map.LIMITS.top - MAIN_PIN_SIZE.height, Math.min(window.map.LIMITS.bottom - MAIN_PIN_SIZE.height, (mainPin.offsetTop - shift.y)));

      mainPin.style.left = leftCoord + 'px';
      mainPin.style.top = topCoord + 'px';

      window.app.init();
      window.form.setAddressInputValue(moveEvt);
    }

    function onMainPinMouseUp(upEvt) {
      upEvt.preventDefault();

      window.app.init();
      window.form.setAddressInputValue(upEvt);

      document.removeEventListener('mousemove', onMainPinMouseMove);
      document.removeEventListener('mouseup', onMainPinMouseUp);
    }

    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  };

  var addMainPinEventListeners = function () {
    mainPin.addEventListener('mousedown', onMainPinMouseDown);
  };

  addMainPinEventListeners();

  window.pin = {
    getMainPinCoords: getMainPinCoords,
  };
})();
