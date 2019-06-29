'use strict';

(function () {
  var AD_PIN_SIZE = {
    width: 50,
    height: 70,
  };

  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

  var getNumberWithLeadZero = function (i) {
    return i < 10 ? '0' + i : i;
  };

  var getRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.createAd = function (i) {
    var photoNumber = getNumberWithLeadZero(i + 1);

    var newPinDatas = {
      author: {
        avatar: 'img/avatars/user' + photoNumber + '.png',
      },

      offer: {
        type: OFFER_TYPES[getRandomNum(0, OFFER_TYPES.length - 1)],
      },

      location: {
        x: getRandomNum(AD_PIN_SIZE.width, window.map.WIDTH - (AD_PIN_SIZE.width)),
        y: getRandomNum(window.map.DIMENSIONS.y.start + AD_PIN_SIZE.height, window.map.DIMENSIONS.y.end),
      }
    };

    return newPinDatas;
  };
})();
