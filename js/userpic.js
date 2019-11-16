'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var userpicUpload = document.querySelector('#avatar');
  var userpicPreview = document.querySelector('.ad-form-header__preview img');

  var accUpload = document.querySelector('#images');
  var accPreview = document.querySelector('.ad-form__photo');

  userpicUpload.addEventListener('change', function () {
    var file = userpicUpload.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        userpicPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  accUpload.addEventListener('change', function () {
    var file = accUpload.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var accPic = document.createElement('img');
        accPic.setAttribute('width', '70px');
        accPic.setAttribute('height', '70px');
        accPic.src = reader.result;

        if (accPreview.firstChild && accPreview.firstChild.tagName === 'IMG') {
          var adFormPhoto = document.createElement('div');
          var accContainer = document.querySelector('.ad-form__photo-container');
          accContainer.appendChild(adFormPhoto);
          adFormPhoto.setAttribute('class', 'ad-form__photo');
          adFormPhoto.appendChild(accPic);
        } else {
          accPreview.appendChild(accPic);
        }
      });

      reader.readAsDataURL(file);
    }
  });

})();
