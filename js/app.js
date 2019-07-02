'use strict';

(function () {
  var init = function () {
    if (!window.map.isActivated()) {
      window.form.enable();

      window.map.enable();

      window.ad.download();
    }
  };

  window.app = {
    init: init,
  };
})();
