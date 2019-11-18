'use strict';

(function () {
  var ESCAPE = 27;
  var LOW_PRICE_LIMIT = 10000;
  var HIGH_PRICE_LIMIT = 50000;
  var ANY = 'any';
  var map = document.querySelector('.map');
  var advertisements = [];
  var accomodationTypeFilter = ANY;
  var priceFilter = ANY;
  var roomsFilter = ANY;
  var guestsFilter = ANY;
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
  var MAIN_PIN_SIZE = 65;
  var PIN_POINTER_HEIGHT = 22;

  accFilterSelect.addEventListener('change', function (event) {
    accomodationTypeFilter = event.target.value;
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
    featuresCheckboxes[i].addEventListener('change', updatePins);
  }

  var wrapperClick = function (pin, advertisement) {
    pin.addEventListener('click', function () {
      if (document.querySelector('.popup')) {
        onPopupClose();
      }

      var activePin = document.querySelector('.map__pin.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }

      pin.classList.add('map__pin--active');

      var popup = window.cardUtil.createPopupElement(advertisement);
      var mapFilters = document.querySelector('.map__filters-container');
      map.insertBefore(popup, mapFilters);

      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('mousedown', onPopupClose);
    });
  };

  var filterAds = function (adsList) {
    var filteredAds = adsList
      .filter(function (item) {
        return accomodationTypeFilter === ANY ? true : item.offer.type === accomodationTypeFilter;
      })
      .filter(function (item) {
        if (priceFilter === ANY) {
          return true;
        }
        if (priceFilter === 'low') {
          return item.offer.price <= LOW_PRICE_LIMIT;
        }
        if (priceFilter === 'middle') {
          return item.offer.price > LOW_PRICE_LIMIT && item.offer.price < HIGH_PRICE_LIMIT;
        }
        if (priceFilter === 'high') {
          return item.offer.price >= HIGH_PRICE_LIMIT;
        }
        return false;
      })
      .filter(function (item) {
        return roomsFilter === ANY ? true : item.offer.rooms === +roomsFilter;
      })
      .filter(function (item) {
        return guestsFilter === ANY ? true : item.offer.guests === +guestsFilter;
      })
      .filter(function (item) {
        return checkboxWifi.checked ? item.offer.features.includes('wifi') : true;
      })
      .filter(function (item) {
        return checkboxDishwasher.checked ? item.offer.features.includes('dishwasher') : true;
      })
      .filter(function (item) {
        return checkboxParking.checked ? item.offer.features.includes('parking') : true;
      })
      .filter(function (item) {
        return checkboxWasher.checked ? item.offer.features.includes('washer') : true;
      })
      .filter(function (item) {
        return checkboxElevator.checked ? item.offer.features.includes('elevator') : true;
      })
      .filter(function (item) {
        return checkboxConditioner.checked ? item.offer.features.includes('conditioner') : true;
      });

    return filteredAds.slice(0, PINS_NUMBER);
  };

  var updatePins = window.debounceUtil.debounce(function () {
    window.mapUtil.clearMap();

    var filteredAds = filterAds(advertisements);

    window.mapUtil.addPinsToMap(filteredAds);
    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var p = 0; p < pinList.length; p++) {
      wrapperClick(pinList[p], filteredAds[p]);
    }
  });

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

    window.apiUtil.getData(function (data) {
      advertisements = data
        .filter(function (item) {
          return item.offer;
        });

      updatePins();
    }, showErrorMessage);

    window.formUtil.enableForm();
    window.formUtil.changeMinValue();
    window.formUtil.fillAddress();
    window.formUtil.disableFormCapacity();
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESCAPE) {
      onPopupClose();
    }
  });

  mainPin.addEventListener('keydown', enableMap);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    enableMap();

    var lastPositionX = event.clientX;
    var lastPositionY = event.pageY;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var pinLeft = mainPin.offsetLeft;
      var pinTop = mainPin.offsetTop;

      var positionX = event.clientX;
      var positionY = event.pageY;

      var deltaX = lastPositionX - positionX;
      var deltaY = lastPositionY - positionY;

      if (pinLeft - deltaX >= MIN_MAP_WIDTH && pinLeft + MAIN_PIN_SIZE - deltaX <= MAX_MAP_WIDTH) {
        mainPin.style.left = pinLeft - deltaX + 'px';
        lastPositionX = positionX;
      }

      if (pinTop - deltaY > MIN_MAP_HEIGHT && pinTop + MAIN_PIN_SIZE + PIN_POINTER_HEIGHT - deltaY < MAX_MAP_HEIGHT) {
        mainPin.style.top = pinTop - deltaY + 'px';
        lastPositionY = positionY;
      }

      window.formUtil.fillAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.formUtil.fillAddress();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

