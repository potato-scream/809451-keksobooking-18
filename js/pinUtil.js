'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  window.pinUtil = {
    createPinElement: function (advertisement) {
      var pinTemplate = document.querySelector('#pin').content;
      var pin = pinTemplate.cloneNode(true);

      var mapPin = pin.querySelector('.map__pin');
      var x = advertisement.location.x - PIN_WIDTH / 2;
      var y = advertisement.location.y - PIN_HEIGHT;


      mapPin.setAttribute('style', 'left: ' + x + 'px; top: ' + y + 'px;');

      var avatar = pin.querySelector('img');
      avatar.setAttribute('src', advertisement.author.avatar);
      avatar.setAttribute('alt', advertisement.offer.title);

      return pin;
    }
  };
})();
