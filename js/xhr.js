'use strict';

(function () {
  var load = function (url, onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('GET', url);
    xhr.send();
  };

  var upload = function (url, responseType, cb) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = responseType;

    xhr.addEventListener('load', function () {
      cb('success');
    });

    xhr.addEventListener('error', function () {
      cb('error');
    });

    xhr.open('POST', url);
    xhr.send();
  };

  window.load = load;
  window.upload = upload;
})();
