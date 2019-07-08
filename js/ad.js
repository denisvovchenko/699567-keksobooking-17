'use strict';

(function () {
  var ADS_MAX_COUNT = 5;

  var renderTimer;
  var ads;
  var mapAdPins = document.querySelector('.map__pins');

  var sourcePin = document.querySelector('#pin')
                          .content
                          .querySelector('.map__pin');

  var removeOldPins = function () {
    var oldPins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)'));

    oldPins.forEach(function (oldPin) {
      oldPin.remove();
    });
  };

  var renderPins = function (pins) {
    removeOldPins();

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

  var rankAds = function (ad) {
    var adProperties = ad.offer;
    var filterProperties = window.filter.properties;
    var filterHousing = window.filter.housing;

    ad.offer.rank = filterProperties.reduce(function (rank, prop) {
      if (prop === 'features') {
        var features = adProperties[prop];

        filterHousing.features.reduce(function (featuresRank, feature) {
          if (features.indexOf(feature) !== -1) {
            rank++;
          }
        }, 0);
      }

      if (String(adProperties[prop]) === String(filterHousing[prop]) &&
          String(adProperties[prop]) !== '') {

        return (rank += 2);
      }

      return rank;
    }, 0);
  };

  var sortAdsByRank = function (leftElement, rightElement) {
    var rankDiff = rightElement.offer.rank - leftElement.offer.rank;

    if (rankDiff !== 0) {
      return rankDiff;
    }

    if (leftElement.offer.title < rightElement.offer.title) {
      return -1;

    } else if (leftElement.offer.title > rightElement.offer.title) {
      return 1;

    } else {
      return 0;
    }
  };

  var convertAdPrice = function (ad) {
    if (ad.offer.price < 10000) {
      ad.offer.price = 'low';

    } else if (ad.offer.price > 50000) {
      ad.offer.price = 'high';

    } else {
      ad.offer.price = 'middle';
    }
  };

  var updateAdPins = function () {
    var fragmentForPins = document.createDocumentFragment();

    ads.forEach(function (ad) {
      rankAds(ad);
      convertAdPrice(ad);
    });

    var filteredAds = ads.slice()
                         .sort(sortAdsByRank);

    for (var i = 0; i < ADS_MAX_COUNT; i++) {
      if (!filteredAds[i]) {
        break;
      }

      var newPin = sourcePin.cloneNode(true);

      fragmentForPins.appendChild(createAdPin(newPin, filteredAds[i]));
    }

    if (renderTimer) {
      clearTimeout(renderTimer);
    }

    renderTimer = setTimeout(function () {
      renderPins(fragmentForPins);
    }, 500);
  };

  var onXHRSuccess = function (data) {
    ads = data;

    updateAdPins();
  };

  window.ad = {
    updatePins: updateAdPins,

    fetchServerData: function () {
      window.load('https://js.dump.academy/keksobooking/data', onXHRSuccess);
    },
  };
})();
