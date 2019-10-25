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


    window.addPinsToMap(ads);
    window.formEnable();
    window.fillAddress();
    window.changeMinValue();
    window.disableFormCapacity();

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
  window.addPinsToMap = function (adsList) {
    map.classList.remove('map--faded');

    var cardsFragment = document.createDocumentFragment();

    for (var h = 0; h < adsList.length; h++) {
      var ad = adsList[h];
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

  mainPin.addEventListener('click', onMainPinMousedown);

  var MIN_MAP_WIDTH = 0;
  var MAX_MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var MIN_MAP_HEIGHT = 130;
  var MAX_MAP_HEIGHT = 630;


  var address = document.querySelector('#address');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordX = evt.clientX;
    var startCoordY = evt.clientY;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordX - moveEvt.clientX;
      var shiftY = startCoordY - moveEvt.clientY;

      var mainPinLeft = (mainPin.offsetLeft - shiftX);
      var mainPinTop = (mainPin.offsetTop - shiftY);

      if (mainPinTop >= MIN_MAP_HEIGHT && mainPinTop <= (MAX_MAP_HEIGHT)) {
        mainPin.style.top = mainPinTop + 'px';
      } else if (mainPinTop < MIN_MAP_HEIGHT) {
        mainPin.style.top = MIN_MAP_HEIGHT + 'px';
      } else if (mainPinTop > (MAX_MAP_HEIGHT)) {
        mainPin.style.top = (MAX_MAP_HEIGHT) + 'px';
      }

      if (mainPinLeft >= MIN_MAP_WIDTH && mainPinLeft <= MAX_MAP_WIDTH) {
        mainPin.style.left = mainPinLeft + 'px';
      } else if (mainPinLeft < MIN_MAP_WIDTH) {
        mainPin.style.left = MIN_MAP_WIDTH + 'px';
      } else if (mainPinLeft > MAX_MAP_WIDTH) {
        mainPin.style.left = MAX_MAP_WIDTH + 'px';
      }

      address.value = mainPin.offsetLeft + ',' + mainPin.offsetTop;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      address.value = mainPin.offsetLeft + ',' + mainPin.offsetTop;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

