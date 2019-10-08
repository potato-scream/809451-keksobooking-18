
'use strict';
var CARDS_NUMBER = 8;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var mainPin = document.querySelector('.map__pin--main');

var generateCards = function () {
  var adsArray = [];

  for (var i = 0; i < CARDS_NUMBER; i++) {
    var locationX = Math.floor(Math.random() * 1200);
    var locationY = Math.floor(Math.random() * 500) + 130;
    var accTypes = ['palace', 'flat', 'house', 'bungalo'];
    var checkinTimes = ['12:00', '13:00', '14:00'];
    var checkoutTimes = ['12:00', '13:00', '14:00'];
    var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    var randomFeaturesArray = [];

    var randomArrayLength = Math.floor(Math.random() * (featuresArray.length - 1) + 1);

    for (var j = 0; j < randomArrayLength; j++) {
      var randomIndex = Math.floor(Math.random() * (featuresArray.length - 1));
      var randomElement = featuresArray[randomIndex];

      if (!randomFeaturesArray.includes(randomElement)) {
        randomFeaturesArray.push(randomElement);
      }
    }

    var photosArrayLenth = Math.floor(Math.random() * 10) + 1; // 1
    var photos = [];

    for (var k = 0; k < photosArrayLenth; k++) {
      photos.push('http://o0.github.io/assets/images/tokyo/hotel' + (k + 1) + '.jpg');
    }

    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': '',
        'address': locationX + ', ' + locationY,
        'price': 0,
        'type': accTypes[Math.floor(Math.random() * (accTypes.length - 1))],
        'rooms': 0,
        'guests': 0,
        'checkin': checkinTimes[Math.floor(Math.random() * (checkinTimes.length - 1))],
        'checkout': checkoutTimes[Math.floor(Math.random() * (checkoutTimes.length - 1))],
        'features': randomFeaturesArray,
        'description': '',
        'photos': photos
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    adsArray.push(ad);
  }

  return adsArray;
};

var createCardElement = function (ad) {
  var pinTemplate = document.querySelector('#pin').content;
  var card = pinTemplate.cloneNode(true);

  var mapPin = card.querySelector('.map__pin');
  var x = ad.location.x - PIN_WIDTH / 2;
  var y = ad.location.y - PIN_HEIGHT;


  mapPin.setAttribute('style', 'left: ' + x + 'px; top: ' + y + 'px;');

  var avatar = card.querySelector('img');
  avatar.setAttribute('src', ad.author.avatar);
  avatar.setAttribute('alt', ad.offer.title);

  return card;
};

// ФУНКЦИЯ ОТРИСОВКИ ПИНОВ КАРТОЧЕК
var addCardsToMap = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  var cardsFragment = document.createDocumentFragment();

  var ads = generateCards();

  for (var h = 0; h < CARDS_NUMBER; h++) {
    var ad = ads[h];

    var card = createCardElement(ad);
    cardsFragment.appendChild(card);
  }

  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(cardsFragment);
};

var formEnabled = function () {
  var form = document.querySelector('.ad-form');
  form.classList.remove('ad-form--disabled');
};


// Блок с картой .map содержит класс map--faded;
// Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
// Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled,
//  добавленного на них или на их родительские блоки fieldset;
// Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;

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

var fillAddress = function () {
  var address = document.querySelector('#address');
  var map = document.querySelector('.map');
  var MAIN_PIN_SIZE = 65;
  var PIN_POINTER_HEIGHT = 22;

  if (map.classList.contains('map--faded')) {
    address.value = Math.floor(mainPin.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.floor(mainPin.offsetTop + MAIN_PIN_SIZE / 2);
  } else {
    address.value = Math.floor(mainPin.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.floor(mainPin.offsetTop + MAIN_PIN_SIZE + PIN_POINTER_HEIGHT);
  }
};

fillAddress();
// Единственное доступное действие в неактивном состоянии — перемещение метки .map__pin--main,
//  являющейся контролом указания адреса объявления.
// Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние.
var onMainPinMousedown = function () {
  for (var a = 0; a < adFormFields.length; a++) {
    adFormFields[a].disabled = false;
  }

  for (var b = 0; b < mapFiltersSelect.length; b++) {
    mapFiltersSelect[b].disabled = false;
  }

  for (var c = 0; c < mapFiltersFields.length; c++) {
    mapFiltersFields[c].disabled = false;
  }


  addCardsToMap();
  formEnabled();
  fillAddress();
};

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    onMainPinMousedown();
  }
});

mainPin.addEventListener('mousedown', onMainPinMousedown);

var roomSelect = document.querySelector('#room_number');

var onGuestsSelectClick = function (evt) {
  var formElement = evt.target;
  var formCapacity = document.querySelector('#capacity');

  if (+formElement.value !== 100) {
    for (var r = 0; r < formCapacity.options.length; r++) {
      if (formCapacity.options[r].value === '0') {
        formCapacity.removeAttribute('disabled');
      } else {
        formCapacity.setAttribute('disabled', 'disabled');
      }
    }
  } else {
    for (var t = 0; t < formCapacity.options.length; t++) {
      if (+formCapacity.options[t].value <= formElement.value) {
        formCapacity.removeAttribute('disabled');
      } else {
        formCapacity.setAttribute('disabled', 'disabled');
      }
    }
  }
};

roomSelect.addEventListener('change', onGuestsSelectClick);

// при переходе страницы в активное состояние в поле адреса подставляются координаты острого конца метки;
// при перемещении (mousemove) метки в поле адреса подставляются координаты острого конца метки
// 4.2. Формат значения поля адреса: {{x}}, {{y}}, где {{x}} и {{y}} это координаты,
// на которые метка указывает своим острым концом. Например, если метка .map__pin--main имеет CSS-координаты
//  top: 200px; left: 300px, то в поле адрес должно быть записано значение 300 + расстояние до острого конца по горизонтали,
//  200 + расстояние до острого конца по вертикали. Координаты не должны быть дробными.
// 4.3. Для удобства пользователей значение Y-координаты адреса должно быть ограничено интервалом от 130 до 630.
// Значение X-координаты адреса должно быть ограничено размерами блока, в котором перемещается метка.
// 4.4. При ограничении перемещения метки по горизонтали её острый конец должен указывать на крайнюю точку блока.
//  При выходе за границы блока часть метки скрывается. Скрытие реализовано стилями блока.

