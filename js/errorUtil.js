'use strict';

(function () {
  var ESCAPE = 27;
  var main = document.querySelector('main');

  var delErrorMessage = function () {
    var error = document.querySelector('.error');

    if (error) {
      var errorButton = error.querySelector('.error__button');
      error.addEventListener('click', delErrorMessage);
      errorButton.addEventListener('click', delErrorMessage);

      main.removeChild(error);
    }
  };

  window.errorUtil = {
    showErrorMessage: function (message) {
      var errorMessageTemplate = document.querySelector('#error').content;
      var errorMessage = errorMessageTemplate.cloneNode(true);
      var error = errorMessage.querySelector('.error');
      var errorButton = errorMessage.querySelector('.error__button');
      var errorText = error.querySelector('.error__message');

      if (message) {
        errorText.innerText = message;
      }

      main.appendChild(errorMessage);

      document.addEventListener('keydown', function (event) {
        if (event.keyCode === ESCAPE) {
          delErrorMessage();
        }
      });

      error.addEventListener('click', delErrorMessage);

      errorButton.addEventListener('click', delErrorMessage);
    }
  };
})();
