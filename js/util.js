'use strict';

(function () {
  var getNumberWithLeadZero = function (i) {
    return i < 10 ? '0' + i : i;
  };

  var getRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.util = {
    getNumberWithLeadZero: getNumberWithLeadZero,
    getRandomNum: getRandomNum,
  };
})();
