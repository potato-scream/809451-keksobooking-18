'use strict';
// модуль, который управляет карточками объявлений и пинами:
// добавляет на страницу нужную карточку, отрисовывает пины
// и осуществляет взаимодействие карточки и метки на карте;

(function () {
  var map = document.querySelector('.map');
  var ads = window.generateAds();

  // ЗАКРЫВАЕТ ПОПАП
  var onPopupClose = function () {
    var popupElement = document.querySelector('.popup');
    if (popupElement) {
      popupElement.remove();
    }
  };

  var onMainPinMousedown = function () {

    if (!map.classList.contains('map--faded')) {
      return;
    }

    var adFormFields = document.querySelectorAll('.ad-form .ad-form__element');
    for (var a = 0; a < adFormFields.length; a++) {
      adFormFields[a].disabled = false;
    }

    var mapFiltersSelect = document.querySelectorAll('.map__filters .map__filter');
    for (var b = 0; b < mapFiltersSelect.length; b++) {
      mapFiltersSelect[b].disabled = false;
    }

    var mapFiltersFields = document.querySelectorAll('.map__filters .map__features');
    for (var c = 0; c < mapFiltersFields.length; c++) {
      mapFiltersFields[c].disabled = false;
    }

    var roomSelect = document.querySelector('#room_number');

    addPinsToMap();
    window.formEnable();
    window.fillAddress();
    window.changeMinValue();
    window.dasableFormCapacity(roomSelect);

    // ДОБАВЛЯЕТ ПОПАП
    var wrapperClick = function (pin, pinNumber) {
      pin.addEventListener('click', function () {
        if (document.querySelector('.popup')) {
          onPopupClose();
        }

        var popup = window.createPopupElement(ads[pinNumber]);
        var mapFilters = document.querySelector('.map__filters-container');
        map.insertBefore(popup, mapFilters);

        var popupClose = document.querySelector('.popup__close');
        popupClose.addEventListener('mousedown', onPopupClose);
      });
    };

    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var p = 0; p < pinList.length; p++) {
      wrapperClick(pinList[p], p);
    }
  };

  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('click', onMainPinMousedown);

  // ДОБАВЛЯЕТ ПИНЫ ОБЪЯВЛЕНИЙ НА КАРТУ
  var addPinsToMap = function () {
    map.classList.remove('map--faded');

    var cardsFragment = document.createDocumentFragment();

    for (var h = 0; h < ads.length; h++) {
      var ad = ads[h];
      var card = window.createPinElement(ad);
      cardsFragment.appendChild(card);
    }

    var mapPins = document.querySelector('.map__pins');
    mapPins.appendChild(cardsFragment);
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      onPopupClose();
    }
  });
})();

