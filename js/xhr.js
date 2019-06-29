'use strict';

(function () {
  window.load = function (url, onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.addEventListener('error', function () {
      var main = document.querySelector('main');
      var notice = document.querySelector('.notice');

      var errorMessage = document.querySelector('#error')
                                  .content
                                  .querySelector('.error')
                                  .cloneNode(true);

      main.insertBefore(errorMessage, notice);
    });

    xhr.open('GET', url);
    xhr.send();
  };
})();
