'use strict';
(function () {
  var GET = 'GET';
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var POST = 'POST';
  var FORM_URL = 'https://js.dump.academy/keksobooking';

  window.apiUtil = {
    getData: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError();
        }
      });
      xhr.addEventListener('error', onError);
      xhr.open(GET, DATA_URL);
      xhr.send();
    },
    submitData: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError();
        }
      });
      xhr.addEventListener('error', onError);
      xhr.open(POST, FORM_URL);
      xhr.send(data);
    }
  };
})();
