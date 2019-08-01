'use strict';

(function () {
  var init = function () {
    if (!window.map.isActivated()) {
      window.form.enable();

      window.map.enable();

      window.ad.fetchServerData();
    }
  };

  var reset = function () {
    window.form.reset();
    window.form.disable();

    window.map.disable();

    window.mainPin.reset();

    window.ad.remove();

    window.filter.reset();
  };

  window.app = {
    init: init,
    reset: reset,
  };
})();
