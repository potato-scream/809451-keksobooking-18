'use strict';
// модуль, который управляет карточками объявлений и пинами:
// добавляет на страницу нужную карточку, отрисовывает пины
// и осуществляет взаимодействие карточки и метки на карте;

(function () {
  var map = document.querySelector('.map');
  var ads = [];
  var accTypeFilter = 'any';
  var priceFilter = 'any';
  var roomsFilter = 'any';
  var guestsFilter = 'any';
  var PINS_NUMBER = 5;
  var mainPin = document.querySelector('.map__pin--main');
  var accFilterSelect = document.querySelector('#housing-type');
  var priceFilterSelect = document.querySelector('#housing-price');
  var roomsFilterSelect = document.querySelector('#housing-rooms');
  var guestsFilterSelect = document.querySelector('#housing-guests');
  var featuresCheckboxes = document.querySelectorAll('.map__checkbox');

  var checkboxWifi = document.querySelector('#filter-wifi');
  var checkboxDishwasher = document.querySelector('#filter-dishwasher');
  var checkboxParking = document.querySelector('#filter-parking');
  var checkboxWasher = document.querySelector('#filter-washer');
  var checkboxElevator = document.querySelector('#filter-elevator');
  var checkboxConditioner = document.querySelector('#filter-conditioner');

  var MIN_MAP_WIDTH = 0;
  var MAX_MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var MIN_MAP_HEIGHT = 130;
  var MAX_MAP_HEIGHT = 630;


  window.clearMap = function () {
    var mapPins = document.querySelector('.map__pins');
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var b = 0; b < pins.length; b++) {
      mapPins.removeChild(pins[b]);
    }

    var card = document.querySelector('.map__card');
    if (card) {
      map.removeChild(card);
    }

    map.classList.add('map--faded');

    mainPin.setAttribute('style', 'left: 570px; top: 375px;');
    window.fillAddress();
  };

  accFilterSelect.addEventListener('change', function (event) {
    accTypeFilter = event.target.value;
    updatePins();
  });

  priceFilterSelect.addEventListener('change', function (event) {
    priceFilter = event.target.value;
    updatePins();
  });

  roomsFilterSelect.addEventListener('change', function (event) {
    roomsFilter = event.target.value;
    updatePins();
  });

  guestsFilterSelect.addEventListener('change', function (event) {
    guestsFilter = event.target.value;
    updatePins();
  });

  for (var i = 0; i < featuresCheckboxes.length; i++) {
    featuresCheckboxes[i].addEventListener('change', function () {
      updatePins();
    });
  }

  // ДОБАВЛЯЕТ ПОПАП
  var wrapperClick = function (pin, ad) {
    pin.addEventListener('click', function () {
      if (document.querySelector('.popup')) {
        onPopupClose();
      }

      var activePin = document.querySelector('.map__pin.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }

      pin.classList.add('map__pin--active');

      var popup = window.createPopupElement(ad);
      var mapFilters = document.querySelector('.map__filters-container');
      map.insertBefore(popup, mapFilters);

      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('mousedown', onPopupClose);
    });
  };

  var filterAds = function (adsList) {
    var filteredAds = adsList
      .filter(function (item) {
        if (accTypeFilter === 'any') {
          return true;
        }
        return item.offer.type === accTypeFilter;
      })
      .filter(function (item) {
        if (priceFilter === 'any') {
          return true;
        }
        if (priceFilter === 'low') {
          return item.offer.price <= 10000;
        }
        if (priceFilter === 'middle') {
          return item.offer.price > 10000 && item.offer.price < 50000;
        }
        if (priceFilter === 'high') {
          return item.offer.price >= 50000;
        }
        return false;
      })
      .filter(function (item) {
        if (roomsFilter === 'any') {
          return true;
        }
        return item.offer.rooms === +roomsFilter;
      })
      .filter(function (item) {
        if (guestsFilter === 'any') {
          return true;
        }
        return item.offer.guests === +guestsFilter;
      })
      .filter(function (item) {
        if (checkboxWifi.checked) {
          return item.offer.features.includes('wifi');
        }
        return true;
      })
      .filter(function (item) {
        if (checkboxDishwasher.checked) {
          return item.offer.features.includes('dishwasher');
        }
        return true;
      })
      .filter(function (item) {
        if (checkboxParking.checked) {
          return item.offer.features.includes('parking');
        }
        return true;
      })
      .filter(function (item) {
        if (checkboxWasher.checked) {
          return item.offer.features.includes('washer');
        }
        return true;
      })
      .filter(function (item) {
        if (checkboxElevator.checked) {
          return item.offer.features.includes('elevator');
        }
        return true;
      })
      .filter(function (item) {
        if (checkboxConditioner.checked) {
          return item.offer.features.includes('conditioner');
        }
        return true;
      });

    return filteredAds.slice(0, PINS_NUMBER);
  };

  var updatePins = window.debounce(function () {
    window.clearMap();

    var filteredAds = filterAds(ads);

    window.addPinsToMap(filteredAds);
    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var p = 0; p < pinList.length; p++) {
      wrapperClick(pinList[p], filteredAds[p]);
    }
  });

  // ЗАКРЫВАЕТ ПОПАП
  var onPopupClose = function () {
    var popupElement = document.querySelector('.popup');
    if (popupElement) {
      popupElement.remove();
    }
  };

  var showErrorMessage = function () {
    var errorTemplate = document.querySelector('#error').content;
    var errorMessage = errorTemplate.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(errorMessage);
  };

  var enableMap = function () {
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

    window.getData(function (data) {
      ads = data
        .filter(function (item) {
          return item.offer;
        });

      updatePins();
    }, function () {
      showErrorMessage();
    });

    window.enableForm();
    window.fillAddress();
    window.changeMinValue();
    window.disableFormCapacity();
  };

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

  mainPin.addEventListener('click', enableMap);

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

      window.fillAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.fillAddress();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

