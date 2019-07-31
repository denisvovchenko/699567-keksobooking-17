'use strict';

(function () {
  var load = function (url, onSuccess) {
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

  var upload = function (url, responseType, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = responseType;

    xhr.addEventListener('load', onSuccess);
    xhr.addEventListener('error', onError);

    xhr.open('POST', url);
    xhr.send();
  };

  window.load = load;
  window.upload = upload;
})();
