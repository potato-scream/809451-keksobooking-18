
'use strict';
var generateCards = function () {
  var adsArray = [];

  for (var i = 0; i < 8; i++) {
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
  var x = ad.location.x - 50 / 2;
  var y = ad.location.y - 70;


  mapPin.setAttribute('style', 'left: ' + x + 'px; top: ' + y + 'px;');

  var avatar = card.querySelector('img');
  avatar.setAttribute('src', ad.author.avatar);
  avatar.setAttribute('alt', ad.offer.title);

  return card;
};

var addCardsToMap = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  var cardsFragment = document.createDocumentFragment();

  var ads = generateCards();

  for (var h = 0; h < 8; h++) {
    var ad = ads[h];

    var card = createCardElement(ad);
    cardsFragment.appendChild(card);
  }

  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(cardsFragment);
};

addCardsToMap();
