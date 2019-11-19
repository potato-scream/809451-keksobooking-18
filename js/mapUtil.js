'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var removePins = function () {
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.from(pins).forEach(function (item) {
      mapPins.removeChild(item);
    });
  };

  var removeCardPopup = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      var popupClose = card.querySelector('.popup__close');
      popupClose.removeEventListener('mousedown', window.mapUtil.onPopupClose);

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

      Array.from(adsList).forEach(function (item) {
        var advertisement = item;
        var card = window.pinUtil.createPinElement(advertisement);
        cardsFragment.appendChild(card);
      });

      mapPins.appendChild(cardsFragment);
    },
    onPopupClose: function () {
      var popupElement = document.querySelector('.popup');
      if (popupElement) {
        popupElement.remove();
      }
    },
  };
})();
