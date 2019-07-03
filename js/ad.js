'use strict';

(function () {
  var mapAdPins = document.querySelector('.map__pins');

  var renderPins = function (pins) {
    mapAdPins.appendChild(pins);
  };

  var createAdPin = function (pin, ad) {
    var pinPhoto = pin.querySelector('img');
    var pinCoordX = 'left: ' + ad.location.x + 'px;';
    var pinCoordY = 'top: ' + ad.location.y + 'px;';

    pin.style = pinCoordX + ' ' + pinCoordY;
    pinPhoto.src = ad.author.avatar;
    pinPhoto.alt = ad.offer.type;

    return pin;
  };

  var createAdPins = function (ads) {
    var fragmentForPins = document.createDocumentFragment();
    var sourcePin = document.querySelector('#pin')
                            .content
                            .querySelector('.map__pin');

    for (var i = 0; i < ads.length; i++) {
      var newPin = sourcePin.cloneNode(true);

      fragmentForPins.appendChild(createAdPin(newPin, ads[i]));
    }

    renderPins(fragmentForPins);
  };

  var onXHRSuccess = function (data) {
    createAdPins(data);
  };

  window.ad = {
    fetchServerData: function () {
      window.load('https://js.dump.academy/keksobooking/data', onXHRSuccess);
    },
  };
})();
