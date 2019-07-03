'use strict';

(function () {
  var ADS_MAX_COUNT = 5;

  var ads;
  var mapAdPins = document.querySelector('.map__pins');

  var sourcePin = document.querySelector('#pin')
                          .content
                          .querySelector('.map__pin');

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

  var getAdRank = function (ad) {
    var adProperties = ad.offer;
    var filterProperties = window.filter.properties;
    var filterHousing = window.filter.housing;

    return filterProperties.reduce(function (rank, prop) {
      if (Array.isArray(adProperties[prop])) {
        var features = adProperties[prop];

        filterHousing.features.reduce(function (featuresRank, feature) {
          if (features.indexOf(feature) !== -1) {
            rank++;
          }
        }, 0);
      }

      if (adProperties[prop] === filterHousing[prop]) {
        return (rank += 2);
      }

      return rank;
    }, 0);
  };

  var filterAdsByRank = function (ad) {
    var rank = getAdRank(ad);

    return rank;
  };

  var sortAdsByRank = function (leftElement, rightElement) {
    var rankDiff = getAdRank(rightElement) - getAdRank(leftElement);

    if (rankDiff > 0) {
      return rankDiff;
    }

    if (leftElement < rightElement) {
      return 1;
    } else if (leftElement > rightElement) {
      return -1;
    } else {
      return 0;
    }
  };

  window.updateAdPins = function () {
    var fragmentForPins = document.createDocumentFragment();

    var filteredAds = ads.slice()
                         .filter(filterAdsByRank)
                         .sort(sortAdsByRank);

    for (var i = 0; i < ADS_MAX_COUNT; i++) {
      if (!filteredAds[i]) {
        break;
      }

      var newPin = sourcePin.cloneNode(true);

      fragmentForPins.appendChild(createAdPin(newPin, filteredAds[i]));
    }

    renderPins(fragmentForPins);
  };

  var onXHRSuccess = function (data) {
    ads = data;

    window.updateAdPins();
  };

  window.ad = {
    fetchServerData: function () {
      window.load('https://js.dump.academy/keksobooking/data', onXHRSuccess);
    },
  };
})();
