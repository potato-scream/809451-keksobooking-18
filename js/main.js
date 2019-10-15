'use strict';

var CARDS_NUMBER = 8;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var mainPin = document.querySelector('.map__pin--main');
var roomSelect = document.querySelector('#room_number');
var map = document.querySelector('.map');

// ГЕНЕРИРУЕТ МАССИВ ОБЪЯВЛЕНИЙ
var generateAds = function () {
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
        'title': 'Объявление №1',
        'address': locationX + ', ' + locationY,
        'price': 0,
        'type': accTypes[Math.floor(Math.random() * (accTypes.length - 1))],
        'rooms': 0,
        'guests': 0,
        'checkin': checkinTimes[Math.floor(Math.random() * (checkinTimes.length - 1))],
        'checkout': checkoutTimes[Math.floor(Math.random() * (checkoutTimes.length - 1))],
        'features': randomFeaturesArray,
        'description': 'Описание моё описание',
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

var ads = generateAds();

// СОЗДАЕТ 1 МАЛЕНЬКИЙ ПИН
var createPinElement = function (ad) {
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

// ДОБАВЛЯЕТ КАРТОЧКУ ОБЪЯВЛЕНИЯ
var addPopupElement = function (ad) {
  var popupTemplate = document.querySelector('#card').content;
  var popup = popupTemplate.cloneNode(true);

  var popupTitle = popup.querySelector('.popup__title');
  popupTitle.innerText = ad.offer.title;

  var popupAddress = popup.querySelector('.popup__text--address');
  popupAddress.innerText = ad.offer.address;

  var popupPrice = popup.querySelector('.popup__text--price');
  popupPrice.innerText = ad.offer.price + '₽/ночь';

  var popupType = popup.querySelector('.popup__type');

  var accTypes = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  popupType.innerText = accTypes[ad.offer.type];

  var popupTextCapacity = popup.querySelector('.popup__text--price');
  popupTextCapacity.innerText = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';

  var popupTime = popup.querySelector('.popup__text--time');
  popupTime.innerText = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  var popupFeatures = popup.querySelector('.popup__features');
  popupFeatures.innerHTML = '';

  var featuresFragment = document.createDocumentFragment();
  for (var y = 0; y < ad.offer.features.length; y++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + ad.offer.features[y]);
    featuresFragment.appendChild(li);
  }
  popupFeatures.appendChild(featuresFragment);

  var popupDescription = popup.querySelector('.popup__description');
  popupDescription.innerText = ad.offer.description;

  var popupPhoto = popup.querySelector('.popup__photo');

  var popupPhotos = popup.querySelector('.popup__photos');

  var photosFragment = document.createDocumentFragment();
  for (var u = 0; u < ad.offer.photos.length; u++) {
    var photo = popupPhoto.cloneNode();
    photo.setAttribute('src', ad.offer.photos[u]);
    photosFragment.appendChild(photo);
  }
  popupPhotos.innerHTML = '';
  popupPhotos.appendChild(photosFragment);

  var popupAvatar = popup.querySelector('.popup__avatar');
  popupAvatar.setAttribute('src', ad.author.avatar);

  var mapFilters = document.querySelector('.map__filters-container');
  map.insertBefore(popup, mapFilters);
};

// ДОБАВЛЯЕТ ПИНЫ ОБЪЯВЛЕНИЙ НА КАРТУ

var addPinsToMap = function () {
  map.classList.remove('map--faded');

  var cardsFragment = document.createDocumentFragment();

  for (var h = 0; h < CARDS_NUMBER; h++) {
    var ad = ads[h];

    var card = createPinElement(ad);
    cardsFragment.appendChild(card);
  }

  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(cardsFragment);
};

// АКТИВИРУЕТ ФОРМУ

var formEnable = function () {
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

// ДОБАВЛЯЕТ ЗНАЧЕНИЕ КООРДИНАТ БОЛЬШОГО ПИНА ПО КЛИКУ НА НЕГО В ПОЛЕ АДРЕСА
var fillAddress = function () {
  var address = document.querySelector('#address');
  var MAIN_PIN_SIZE = 65;
  var PIN_POINTER_HEIGHT = 22;

  if (map.classList.contains('map--faded')) {
    address.value = Math.floor(mainPin.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.floor(mainPin.offsetTop + MAIN_PIN_SIZE / 2);
  } else {
    address.value = Math.floor(mainPin.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.floor(mainPin.offsetTop + MAIN_PIN_SIZE + PIN_POINTER_HEIGHT);
  }
};

fillAddress();
addPopupElement(ads[0]);

// Функция блокирует и разблокирует элементы селекта выбора кол-ва комнат
var dasableFormCapacity = function (formElement) {
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

// РАЗБЛОКИРУЕТ СТРАНИЦУ ПО НАЖАТИЮ НА БОЛЬШОЙ ПИН
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

  addPinsToMap();
  formEnable();
  fillAddress();
  dasableFormCapacity(roomSelect);
};

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    onMainPinMousedown();
  }
});

mainPin.addEventListener('mousedown', onMainPinMousedown);

var onGuestsSelectClick = function (evt) {
  dasableFormCapacity(evt.target);
};

roomSelect.addEventListener('change', onGuestsSelectClick);

