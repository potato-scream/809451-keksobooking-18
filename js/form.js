'use strict';
// модуль, который работает с формой объявления.
(function () {
  var form = document.querySelector('.ad-form');
  var adFormFields = document.querySelectorAll('.ad-form .ad-form__element');
  var formTitle = form.querySelector('#title');
  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var formRoom = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');
  var formDescription = form.querySelector('#description');
  var formTimein = form.querySelector('#timein');
  var formTimeout = form.querySelector('#timeout');
  var checkboxes = form.querySelectorAll('.feature__checkbox');
  var mapFiltersSelect = document.querySelectorAll('.map__filters .map__filter');
  var mapFiltersFields = document.querySelectorAll('.map__filters .map__features');
  var resetButton = document.querySelector('.ad-form__reset');
  var main = document.querySelector('main');

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
  window.enableForm = function () {
    form.classList.remove('ad-form--disabled');
  };

  var disableForm = function () {
    form.classList.add('ad-form--disabled');

    for (var i = 0; i < adFormFields.length; i++) {
      adFormFields[i].disabled = true;
    }

    for (var j = 0; j < mapFiltersSelect.length; j++) {
      mapFiltersSelect[j].disabled = true;
    }

    for (var k = 0; k < mapFiltersFields.length; k++) {
      mapFiltersFields[k].disabled = true;
    }
  };

  // БЛОКТИРУЕТ ЭЛЕМЕНТЫ ФОРМЫ В СОСТОЯНИИ ПО УМОЛЧАНИЮ
  disableForm();
  window.fillAddress();

  // Функция блокирует и разблокирует элементы селекта выбора кол-ва комнат
  window.disableFormCapacity = function () {
    if (+formRoom.value === 100) {
      for (var r = 0; r < formCapacity.options.length; r++) {
        if (formCapacity.options[r].value === '0') {
          formCapacity.options[r].removeAttribute('disabled');
        } else {
          formCapacity.options[r].setAttribute('disabled', 'disabled');
        }
      }
    } else {
      for (var t = 0; t < formCapacity.options.length; t++) {
        if (+formCapacity.options[t].value <= formRoom.value && +formCapacity.options[t].value > 0) {
          formCapacity.options[t].removeAttribute('disabled');
        } else {
          formCapacity.options[t].setAttribute('disabled', 'disabled');
        }
      }
    }
  };

  var clearForm = function () {
    formTitle.value = '';
    formType.value = 'flat';
    formPrice.value = '';
    formRoom.value = '1';
    formCapacity.value = '1';
    formDescription.value = '';
    formTimein.value = '12:00';
    formTimeout.value = '12:00';

    for (var a = 0; a < checkboxes.length; a++) {
      checkboxes[a].checked = false;
    }

    var userpicPreview = document.querySelector('.ad-form-header__preview img');
    userpicPreview.src = 'img/muffin-grey.svg';

    var accPreviewContainer = document.querySelector('.ad-form__photo-container');
    var accPreviewImages = accPreviewContainer.querySelectorAll('.ad-form__photo');

    for (var b = 0; b < accPreviewImages.length; b++) {
      accPreviewContainer.removeChild(accPreviewImages[b]);
    }

    var adFormPhoto = document.createElement('div');
    adFormPhoto.setAttribute('class', 'ad-form__photo');
    accPreviewContainer.appendChild(adFormPhoto);
  };

  // ФУНКЦИЯ МЕНЯЕТ МИНИМАЛЬНОЕ ЗНАЧЕНИЕ ЦЕНЫ В ЗАВИСИМОСТИ ОТ ТИПА ЖИЛЬЯ
  window.changeMinValue = function () {
    if (formType.value === 'bungalo') {
      formPrice.setAttribute('min', 0);
      formPrice.setAttribute('placeholder', 0);
    }
    if (formType.value === 'flat') {
      formPrice.setAttribute('min', 1000);
      formPrice.setAttribute('placeholder', 1000);
    }
    if (formType.value === 'house') {
      formPrice.setAttribute('min', 5000);
      formPrice.setAttribute('placeholder', 5000);
    }
    if (formType.value === 'palace') {
      formPrice.setAttribute('min', 10000);
      formPrice.setAttribute('placeholder', 10000);
    }
  };

  // Поля «Время заезда» и «Время выезда» синхронизированы: при изменении значения одного поля, во втором выделяется соответствующее ему.
  // Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.
  // ФУНКЦИЯ МЕНЯЕТ ЗНАЧЕНИЕ ПОЛЯ ВРЕМЯ ЗАЕЗДА В ЗАВИСИМОСТИ ОТ  ВРЕМЕНИ ВЫЕЗДА И наоборот=
  formTimein.addEventListener('change', function () {
    formTimeout.value = formTimein.value;
  });
  formTimeout.addEventListener('change', function () {
    formTimein.value = formTimeout.value;
  });

  var onGuestsSelectClick = function (evt) {
    window.disableFormCapacity(evt.target);
  };

  formRoom.addEventListener('change', onGuestsSelectClick);
  formType.addEventListener('change', window.changeMinValue);


  var delSuccessMessage = function () {
    var successSubmit = document.querySelector('.success');

    if (successSubmit) {
      main.removeChild(successSubmit);
    }
  };

  var showSuccessMessage = function () {
    var submitMessageTemplate = document.querySelector('#success').content;
    var submitMessage = submitMessageTemplate.cloneNode(true);

    main.appendChild(submitMessage);

    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
        delSuccessMessage();
      }
    });

    var successSubmit = document.querySelector('.success');

    successSubmit.addEventListener('click', function () {
      delSuccessMessage();
    });
  };

  var delErrorMessage = function () {
    var error = document.querySelector('.error');

    if (error) {
      main.removeChild(error);
    }
  };

  var showErrorMessage = function () {
    var errorMessageTemplate = document.querySelector('#error').content;
    var errorMessage = errorMessageTemplate.cloneNode(true);
    var error = document.querySelector('.error');
    var errorButton = error.querySelector('.error__button');

    main.appendChild(errorMessage);

    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
        delErrorMessage();
      }
    });

    error.addEventListener('click', function () {
      delErrorMessage();
    });

    errorButton.addEventListener('click', function () {
      delErrorMessage();
    });
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);

    window.submitData(formData, function () {
      clearForm();
      window.clearMap();
      disableForm();
      showSuccessMessage();
    },
    function () {
      showErrorMessage();
    });
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    clearForm();
    window.clearMap();
    disableForm();
  });
})();
