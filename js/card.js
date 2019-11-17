'use strict';
// СОЗДАЕТ КАРТОЧКУ ПОПАП
(function () {
  window.createPopupElement = function (ad) {
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

    popupTitle.innerText = ad.offer.title;
    popupAddress.innerText = ad.offer.address;
    popupPrice.innerText = ad.offer.price + '₽/ночь';

    if (ad.offer.type === 'flat') {
      popupType.innerText = 'Квартира';
    } else if (ad.offer.type === 'bungalo') {
      popupType.innerText = 'Бунгало';
    } else if (ad.offer.type === 'house') {
      popupType.innerText = 'Дом';
    } else if (ad.offer.type === 'palace') {
      popupType.innerText = 'Дворец';
    }

    popupTextCapacity.innerText = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';

    popupTime.innerText = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    popupFeatures.innerHTML = '';

    var featuresFragment = document.createDocumentFragment();
    for (var y = 0; y < ad.offer.features.length; y++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add('popup__feature--' + ad.offer.features[y]);
      featuresFragment.appendChild(li);
    }

    popupFeatures.appendChild(featuresFragment);

    popupDescription.innerText = ad.offer.description;

    var photosFragment = document.createDocumentFragment();
    for (var u = 0; u < ad.offer.photos.length; u++) {
      var photo = popupPhoto.cloneNode();
      photo.setAttribute('src', ad.offer.photos[u]);
      photosFragment.appendChild(photo);
    }
    popupPhotos.innerHTML = '';
    popupPhotos.appendChild(photosFragment);

    popupAvatar.setAttribute('src', ad.author.avatar);
    return popup;
  };
})();
