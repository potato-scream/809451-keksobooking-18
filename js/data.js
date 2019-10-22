'use strict';
// модуль, который создаёт данные;

(function () {
  var CARDS_NUMBER = 8;
  window.generateAds = function () {
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

      var photosArrayLenth = Math.floor(Math.random() * 3) + 1; // 1
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
})();
