'use strict';
// модуль, который работает с формой объявления.
(function () {
  var roomSelect = document.querySelector('#room_number');

  // ДОБАВЛЯЕТ ЗНАЧЕНИЕ КООРДИНАТ БОЛЬШОГО ПИНА ПО КЛИКУ НА НЕГО В ПОЛЕ АДРЕСА
  window.fillAddress = function () {
    var address = document.querySelector('#address');
    var MAIN_PIN_SIZE = 65;
    var PIN_POINTER_HEIGHT = 22;
    var map = document.querySelector('.map');
    var mainPin = document.querySelector('.map__pin--main');

    if (map.classList.contains('map--faded')) {
      address.value = Math.floor(mainPin.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.floor(mainPin.offsetTop + MAIN_PIN_SIZE / 2);
    } else {
      address.value = Math.floor(mainPin.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.floor(mainPin.offsetTop + MAIN_PIN_SIZE + PIN_POINTER_HEIGHT);
    }
  };

  // АКТИВИРУЕТ ФОРМУ
  window.formEnable = function () {
    var form = document.querySelector('.ad-form');
    form.classList.remove('ad-form--disabled');
  };

  // БЛОКТИРУЕТ ЭЛЕМЕНТЫ ФОРМЫ В СОСТОЯНИИ ПО УМОЛЧАНИЮ
  var adFormFields = document.querySelectorAll('.ad-form .ad-form__element');
  for (var i = 0; i < adFormFields.length; i++) {
    adFormFields[i].disabled = true;
  }

  var mapFiltersSelect = document.querySelectorAll('.map__filters .map__filter');
  for (var j = 0; j < mapFiltersSelect.length; j++) {
    mapFiltersSelect[j].disabled = true;
  }

  var mapFiltersFields = document.querySelectorAll('.map__filters .map__features');
  for (var k = 0; k < mapFiltersFields.length; k++) {
    mapFiltersFields[k].disabled = true;
  }

  window.fillAddress();

  // Функция блокирует и разблокирует элементы селекта выбора кол-ва комнат
  window.dasableFormCapacity = function (formElement) {
    var formCapacity = document.querySelector('#capacity');

    if (+formElement.value === 100) {
      for (var r = 0; r < formCapacity.options.length; r++) {
        if (formCapacity.options[r].value === '0') {
          formCapacity.options[r].removeAttribute('disabled');
        } else {
          formCapacity.options[r].setAttribute('disabled', 'disabled');
        }
      }
    } else {
      for (var t = 0; t < formCapacity.options.length; t++) {
        if (+formCapacity.options[t].value <= formElement.value && +formCapacity.options[t].value > 0) {
          formCapacity.options[t].removeAttribute('disabled');
        } else {
          formCapacity.options[t].setAttribute('disabled', 'disabled');
        }
      }
    }
  };

  // ФУНКЦИЯ МЕНЯЕТ МИНИМАЛЬНОЕ ЗНАЧЕНИЕ ЦЕНЫ В ЗАВИСИМОСТИ ОТ ТИПА ЖИЛЬЯ
  var selectType = document.querySelector('#type');
  window.changeMinValue = function () {
    var pricePerNight = document.querySelector('#price');
    if (selectType.value === 'bungalo') {
      pricePerNight.setAttribute('min', 0);
      pricePerNight.setAttribute('placeholder', 0);
    }
    if (selectType.value === 'flat') {
      pricePerNight.setAttribute('min', 1000);
      pricePerNight.setAttribute('placeholder', 1000);
    }
    if (selectType.value === 'house') {
      pricePerNight.setAttribute('min', 5000);
      pricePerNight.setAttribute('placeholder', 5000);
    }
    if (selectType.value === 'palace') {
      pricePerNight.setAttribute('min', 10000);
      pricePerNight.setAttribute('placeholder', 10000);
    }
  };

  // Поля «Время заезда» и «Время выезда» синхронизированы: при изменении значения одного поля, во втором выделяется соответствующее ему.
  // Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.
  // ФУНКЦИЯ МЕНЯЕТ ЗНАЧЕНИЕ ПОЛЯ ВРЕМЯ ЗАЕЗДА В ЗАВИСИМОСТИ ОТ  ВРЕМЕНИ ВЫЕЗДА И наоборот=
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');

  checkinTime.addEventListener('change', function () {
    checkoutTime.value = checkinTime.value;
  });
  checkoutTime.addEventListener('change', function () {
    checkinTime.value = checkoutTime.value;
  });

  var onGuestsSelectClick = function (evt) {
    window.dasableFormCapacity(evt.target);
  };

  roomSelect.addEventListener('change', onGuestsSelectClick);
  selectType.addEventListener('change', window.changeMinValue);
})();
