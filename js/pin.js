'use strict';

(function () {

  var Coordinates = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var MainPin = function () {
    this.html = document.querySelector('.map__pin--main');
    this.width = 65;
    this.height = 65;
    this.tailHeight = 16;

    this.initialCoordinates = new Coordinates(this.html.style.left, this.html.style.top);
  };

  MainPin.prototype.getCoords = function () {
    var mainPinX = parseInt(window.getComputedStyle(this.html).left, 10) + (this.width / 2);
    var mainPinY = parseInt(window.getComputedStyle(this.html).top, 10) + this.height + this.tailHeight;

    if (!window.map.isActivated()) {
      mainPinY = parseInt(window.getComputedStyle(this.html).top, 10) + (this.height / 2);
    }

    return new Coordinates(Math.floor(mainPinX), Math.floor(mainPinY));
  };

  MainPin.prototype.addEventListeners = function () {
    this.onMouseDownBinded = this.onMouseDown.bind(this);

    this.html.addEventListener('mousedown', this.onMouseDownBinded);
  };

  MainPin.prototype.onMouseDown = function (evt) {
    evt.preventDefault();

    this.startCoords = new Coordinates(evt.clientX, evt.clientY);

    window.testThis = this;

    this.bindedOnMouseMove = this.onMouseMove.bind(this);
    this.bindedOnMouseUp = this.onMouseUp.bind(this);

    document.addEventListener('mousemove', this.bindedOnMouseMove);
    document.addEventListener('mouseup', this.bindedOnMouseUp);
  };

  MainPin.prototype.onMouseMove = function (moveEvt) {
    var shiftX = this.startCoords.x - moveEvt.clientX;
    var shiftY = this.startCoords.y - moveEvt.clientY;

    var shift = new Coordinates(shiftX, shiftY);

    this.startCoords = new Coordinates(moveEvt.clientX, moveEvt.clientY);

    var leftCoord = Math.max(window.map.LIMITS.left, Math.min(window.map.LIMITS.right - this.width, (this.html.offsetLeft - shift.x)));

    var topCoord = Math.max(window.map.LIMITS.top - this.height, Math.min(window.map.LIMITS.bottom - this.height, (this.html.offsetTop - shift.y)));

    this.html.style.left = leftCoord + 'px';
    this.html.style.top = topCoord + 'px';

    window.app.init();
    window.form.setAddressInputValue(moveEvt);
  };

  MainPin.prototype.onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    window.app.init();
    window.form.setAddressInputValue(upEvt);

    document.removeEventListener('mousemove', this.bindedOnMouseMove);
    document.removeEventListener('mouseup', this.bindedOnMouseUp);
  };

  MainPin.prototype.reset = function () {
    this.html.style.left = this.initialCoordinates.x;
    this.html.style.top = this.initialCoordinates.y;

    window.form.setAddressInputValue();

    this.html.removeEventListener('mousedown', this.onMouseDownBinded);

    this.addEventListeners();
  };

  var mainPin = new MainPin();

  mainPin.addEventListeners();

  window.mainPin = mainPin;
})();
