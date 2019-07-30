'use strict';

(function () {
  var ADS_MAX_COUNT = 5;

  var KEYCODE = {
    ESC: 27,
    ENTER: 13,
  };

  var renderTimer;
  var ads;
  var mapAdPins = document.querySelector('.map__pins');

  var sourcePin = document.querySelector('#pin')
                          .content
                          .querySelector('.map__pin');


  var adCardTemplate = document.querySelector('#card')
                               .content
                               .querySelector('.map__card');

  var accomodationType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var convertAdsPrice = function () {
    ads.forEach(function (ad) {
      ad.offer.priceAmount = ad.offer.price;

      if (ad.offer.price < 10000) {
        ad.offer.price = 'low';

      } else if (ad.offer.price > 50000) {
        ad.offer.price = 'high';

      } else if (ad.offer.price) {
        ad.offer.price = 'middle';
      }
    });
  };

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
    pin.style.transform = 'translate(-50%, -100%)';

    pinPhoto.src = ad.author.avatar;
    pinPhoto.alt = ad.offer.type;

    pin.addEventListener('click', function () {
      var adCard = new AdCard(ad);

      adCard.render(ad);
    });

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

      } else if (adProperties[prop] === filterHousing[prop]) {

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

  var updateAdPins = function () {
    var fragmentForPins = document.createDocumentFragment();

    ads.forEach(function (ad) {
      rankAds(ad);
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

  var isEscapeKey = function (evt) {
    return evt.keyCode === KEYCODE.ESC;
  };

  var onEscKeydown = function (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();

      document.querySelector('.map__card').remove();

      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  var closeWithEsc = function () {
    document.addEventListener('keydown', onEscKeydown);
  };

  var AdField = function (selector, text) {
    this.selector = selector;
    this.text = text;
  };

  var AdCard = function (ad) {
    this.data = ad;
    this.html = adCardTemplate.cloneNode(true);

    var adFields = this.getAdFields();

    this.writeCommonAdFields(adFields);

    this.renderAdCardFeatures();

    this.renderAdCardPhotos();

    this.renderAdCardAvatar();

    this.addEventListeners();
  };

  AdCard.prototype.getAdFields = function () {
    var priceText = this.data.offer.priceAmount + '₽/ночь';
    var capacityText = this.data.offer.rooms + ' комнаты для ' + this.data.offer.guests + ' гостей';
    var timeText = 'Заезд после ' + this.data.offer.checkin + ', выезд до ' + this.data.offer.checkout;

    return [
      new AdField('.popup__title', this.data.offer.title),
      new AdField('.popup__text--address', this.data.offer.address),
      new AdField('.popup__text--price', priceText),
      new AdField('.popup__type', accomodationType[this.data.offer.type]),
      new AdField('.popup__text--capacity', capacityText),
      new AdField('.popup__text--time', timeText),
      new AdField('.popup__description', this.data.offer.description),
    ];
  };

  AdCard.prototype.writeCommonAdFields = function (fields) {
    var self = this;

    fields.forEach(function (field) {
      self.html.querySelector(field.selector).textContent = field.text;
    });
  };

  AdCard.prototype.renderAdCardFeatures = function () {
    var adFeatures = this.html.querySelector('.popup__features');

    Array.from(adFeatures.children).forEach(function (adFeature) {
      adFeature.style.display = 'none';
    });

    this.data.offer.features.forEach(function (feature) {
      var featureElement = adFeatures.querySelector('.popup__feature--' + feature);

      if (featureElement) {
        featureElement.style.display = 'inline-block';
      }
    });
  };

  AdCard.prototype.renderAdCardPhotos = function () {
    var adPhotos = this.html.querySelector('.popup__photos');
    var adPhotoTemplate = adPhotos.querySelector('.popup__photo');
    var photos = this.data.offer.photos;

    var photosFragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      var img = adPhotoTemplate.cloneNode(true);

      img.src = photo;

      photosFragment.appendChild(img);
    });

    adPhotoTemplate.remove();

    adPhotos.appendChild(photosFragment);
  };

  AdCard.prototype.renderAdCardAvatar = function () {
    var adAvatar = this.html.querySelector('.popup__avatar');
    adAvatar.src = this.data.author.avatar;
  };

  AdCard.prototype.addTo = function (parent) {
    parent.appendChild(this.html);
  };

  AdCard.prototype.render = function () {
    var oldAdCard = document.querySelector('.map__card');

    if (oldAdCard) {
      oldAdCard.remove();
    }

    var map = document.querySelector('.map');
    var mapFilterContainer = map.querySelector('.map__filters-container');

    map.insertBefore(this.html, mapFilterContainer);
  };

  AdCard.prototype.onMouseClick = function (evt) {
    evt.preventDefault();

    this.remove();

    this.closeBtn.removeEventListener('click', this.onMouseClickBinded);
  };

  AdCard.prototype.closeWithButton = function () {
    this.closeBtn = this.html.querySelector('.popup__close');

    this.onMouseClickBinded = this.onMouseClick.bind(this);

    this.closeBtn.addEventListener('click', this.onMouseClickBinded);
  };

  AdCard.prototype.addEventListeners = function () {
    closeWithEsc();
    this.closeWithButton();
  };

  AdCard.prototype.remove = function () {
    this.html.remove();
  };

  var onXHRSuccess = function (data) {
    ads = data;

    convertAdsPrice();

    updateAdPins();
  };

  window.ad = {
    updatePins: updateAdPins,

    fetchServerData: function () {
      window.load('https://js.dump.academy/keksobooking/data', onXHRSuccess);
    },
  };
})();
