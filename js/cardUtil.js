'use strict';
(function () {
  var BUNGALO = 'bungalo';
  var FLAT = 'flat';
  var HOUSE = 'house';
  var PALACE = 'palace';

  var FLAT_RU = 'Квартира';
  var BUNGALO_RU = 'Бунгало';
  var HOUSE_RU = 'Дом';
  var PALACE_RU = 'Дворец';

  window.cardUtil = {
    createPopupElement: function (advertisement) {
      var popupTemplate = document.querySelector('#card').content;
      var popup = popupTemplate.cloneNode(true);

      var popupTitle = popup.querySelector('.popup__title');
      var popupAddress = popup.querySelector('.popup__text--address');
      var popupPrice = popup.querySelector('.popup__text--price');
      var popupType = popup.querySelector('.popup__type');
      var popupTextCapacity = popup.querySelector('.popup__text--price');
      var popupTime = popup.querySelector('.popup__text--time');
      var popupFeatures = popup.querySelector('.popup__features');
      var popupDescription = popup.querySelector('.popup__description');
      var popupPhoto = popup.querySelector('.popup__photo');
      var popupPhotos = popup.querySelector('.popup__photos');
      var popupAvatar = popup.querySelector('.popup__avatar');

      popupTitle.innerText = advertisement.offer.title;
      popupAddress.innerText = advertisement.offer.address;
      popupPrice.innerText = advertisement.offer.price + '₽/ночь';

      if (advertisement.offer.type === FLAT) {
        popupType.innerText = FLAT_RU;
      } else if (advertisement.offer.type === BUNGALO) {
        popupType.innerText = BUNGALO_RU;
      } else if (advertisement.offer.type === HOUSE) {
        popupType.innerText = HOUSE_RU;
      } else if (advertisement.offer.type === PALACE) {
        popupType.innerText = PALACE_RU;
      }

      popupTextCapacity.innerText = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';

      popupTime.innerText = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

      popupFeatures.innerHTML = '';

      var featuresFragment = document.createDocumentFragment();
      advertisement.offer.features.forEach(function (feature) {
        var li = document.createElement('li');
        li.classList.add('popup__feature');
        li.classList.add('popup__feature--' + feature);
        featuresFragment.appendChild(li);
      });

      popupFeatures.appendChild(featuresFragment);

      popupDescription.innerText = advertisement.offer.description;

      var photosFragment = document.createDocumentFragment();
      advertisement.offer.photos.forEach(function (item) {
        var photo = popupPhoto.cloneNode();
        photo.setAttribute('src', item);
        photosFragment.appendChild(photo);
      });
      popupPhotos.innerHTML = '';
      popupPhotos.appendChild(photosFragment);

      popupAvatar.setAttribute('src', advertisement.author.avatar);
      return popup;
    }
  };
})();
