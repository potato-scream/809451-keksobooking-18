'use strict';
(function () {
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

      if (advertisement.offer.type === 'flat') {
        popupType.innerText = 'Квартира';
      } else if (advertisement.offer.type === 'bungalo') {
        popupType.innerText = 'Бунгало';
      } else if (advertisement.offer.type === 'house') {
        popupType.innerText = 'Дом';
      } else if (advertisement.offer.type === 'palace') {
        popupType.innerText = 'Дворец';
      }

      popupTextCapacity.innerText = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';

      popupTime.innerText = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

      popupFeatures.innerHTML = '';

      var featuresFragment = document.createDocumentFragment();
      for (var y = 0; y < advertisement.offer.features.length; y++) {
        var li = document.createElement('li');
        li.classList.add('popup__feature');
        li.classList.add('popup__feature--' + advertisement.offer.features[y]);
        featuresFragment.appendChild(li);
      }

      popupFeatures.appendChild(featuresFragment);

      popupDescription.innerText = advertisement.offer.description;

      var photosFragment = document.createDocumentFragment();
      for (var u = 0; u < advertisement.offer.photos.length; u++) {
        var photo = popupPhoto.cloneNode();
        photo.setAttribute('src', advertisement.offer.photos[u]);
        photosFragment.appendChild(photo);
      }
      popupPhotos.innerHTML = '';
      popupPhotos.appendChild(photosFragment);

      popupAvatar.setAttribute('src', advertisement.author.avatar);
      return popup;
    }
  };
})();
