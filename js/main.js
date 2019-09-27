
'use strict';
var CARDS_NUMBER = 8;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;

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

// addCardsToMap();

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

// Единственное доступное действие в неактивном состоянии — перемещение метки .map__pin--main,
//  являющейся контролом указания адреса объявления.
// Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние.
var mainPin = document.querySelector('.map__pin--main');
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

};


document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    onMainPinMousedown();
  }
});

mainPin.addEventListener('mousedown', onMainPinMousedown);

// Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
//  что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:
// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».
// Допускаются разные способы ограничения допустимых значений поля «Количество мест»:
//  удаление из разметки соответствующих элементов option, добавление элементам option состояния disabled
//  или другие способы ограничения, например, с помощью метода setCustomValidity.
// . Вы пишите код проверки соответствия и если выбранное количество гостей не подходит под количество комнат,
// вызываете метод setCustomValidity.

var roomSelect = document.querySelector('#housing-rooms');
roomSelect.addEventListener('change', function (evt) {
  console.log(evt);
});
