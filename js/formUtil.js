'use strict';

(function () {
  var MAIN_PIN_SIZE = 65;
  var PIN_POINTER_HEIGHT = 22;

  var BUNGALO = 'bungalo';
  var FLAT = 'flat';
  var HOUSE = 'house';
  var PALACE = 'palace';

  var ZERO_PRICE = 0;
  var ONE_THOUSAND_PRICE = 1000;
  var FIVE_THOUSANDS_PRICE = 5000;
  var TEN_THOUSANDS_PRICE = 10000;

  var HUNDRED_ROOMS = 100;

  var form = document.querySelector('.ad-form');

  window.formUtil = {
    fillAddress: function () {
      var address = document.querySelector('#address');
      var map = document.querySelector('.map');
      var mainPin = document.querySelector('.map__pin--main');

      if (map.classList.contains('map--faded')) {
        address.value = Math.floor(mainPin.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.floor(mainPin.offsetTop + MAIN_PIN_SIZE / 2);
      } else {
        address.value = Math.floor(mainPin.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.floor(mainPin.offsetTop + MAIN_PIN_SIZE + PIN_POINTER_HEIGHT);
      }
    },

    disableFormCapacity: function () {
      var formRoom = form.querySelector('#room_number');
      var formCapacity = form.querySelector('#capacity');

      if (+formRoom.value === HUNDRED_ROOMS) {
        Array.from(formCapacity.options).forEach(function (item) {
          if (item.value === '0') {
            item.removeAttribute('disabled');
          } else {
            item.setAttribute('disabled', true);
          }
        });
      } else {
        Array.from(formCapacity.options).forEach(function (item) {
          if (+item.value <= formRoom.value && +item.value > 0) {
            item.removeAttribute('disabled');
          } else {
            item.setAttribute('disabled', true);
          }
        });
      }
    },

    enableForm: function () {
      var adFormFields = document.querySelectorAll('.ad-form .ad-form__element, .ad-form .ad-form-header');
      var mapFilters = document.querySelector('.map__filters').children;

      form.classList.remove('ad-form--disabled');

      Array.from(adFormFields).forEach(function (item) {
        item.disabled = false;
      });

      Array.from(mapFilters).forEach(function (item) {
        item.disabled = false;
      });
    },

    changeMinValue: function () {
      var formType = form.querySelector('#type');
      var formPrice = form.querySelector('#price');

      if (formType.value === BUNGALO) {
        formPrice.setAttribute('min', ZERO_PRICE);
        formPrice.setAttribute('placeholder', ZERO_PRICE);
      }
      if (formType.value === FLAT) {
        formPrice.setAttribute('min', ONE_THOUSAND_PRICE);
        formPrice.setAttribute('placeholder', ONE_THOUSAND_PRICE);
      }
      if (formType.value === HOUSE) {
        formPrice.setAttribute('min', FIVE_THOUSANDS_PRICE);
        formPrice.setAttribute('placeholder', FIVE_THOUSANDS_PRICE);
      }
      if (formType.value === PALACE) {
        formPrice.setAttribute('min', TEN_THOUSANDS_PRICE);
        formPrice.setAttribute('placeholder', TEN_THOUSANDS_PRICE);
      }
    }
  };

})();
