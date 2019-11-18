'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var removePins = function () {
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var b = 0; b < pins.length; b++) {
      mapPins.removeChild(pins[b]);
    }
  };

  var removeCardPopup = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      map.removeChild(card);
    }
  };

  window.mapUtil = {
    clearMap: function () {
      var mainPin = document.querySelector('.map__pin--main');

      removePins();
      removeCardPopup();

      map.classList.add('map--faded');

      mainPin.setAttribute('style', 'left: 570px; top: 375px;');
      window.formUtil.fillAddress();
    },
    addPinsToMap: function (adsList) {
      map.classList.remove('map--faded');

      var cardsFragment = document.createDocumentFragment();

      for (var h = 0; h < adsList.length; h++) {
        var advertisement = adsList[h];
        var card = window.pinUtil.createPinElement(advertisement);
        cardsFragment.appendChild(card);
      }

      mapPins.appendChild(cardsFragment);
    }
  };
})();
