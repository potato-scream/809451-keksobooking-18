'use strict';
// модуль, который отвечает за создание пина — метки на карте;
(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  window.createPinElement = function (ad) {
    var pinTemplate = document.querySelector('#pin').content;
    var pin = pinTemplate.cloneNode(true);

    var mapPin = pin.querySelector('.map__pin');
    var x = ad.location.x - PIN_WIDTH / 2;
    var y = ad.location.y - PIN_HEIGHT;


    mapPin.setAttribute('style', 'left: ' + x + 'px; top: ' + y + 'px;');

    var avatar = pin.querySelector('img');
    avatar.setAttribute('src', ad.author.avatar);
    avatar.setAttribute('alt', ad.offer.title);

    return pin;
  };
})();
