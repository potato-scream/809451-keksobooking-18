'use strict';
(function () {
  var ESCAPE = 27;

  var form = document.querySelector('.ad-form');
  var adFormFields = document.querySelectorAll('.ad-form .ad-form__element, .ad-form .ad-form-header');
  var formTitle = form.querySelector('#title');
  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var formRoom = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');
  var formDescription = form.querySelector('#description');
  var formTimein = form.querySelector('#timein');
  var formTimeout = form.querySelector('#timeout');
  var checkboxes = form.querySelectorAll('.feature__checkbox');
  var mapFilters = document.querySelector('.map__filters').children;
  var resetButton = document.querySelector('.ad-form__reset');
  var main = document.querySelector('main');

  var mapFiltersInputs = document.querySelectorAll('.map__filters .map__filter, .map__features .map__checkbox');

  var disableForm = function () {
    form.classList.add('ad-form--disabled');

    Array.from(adFormFields).forEach(function (item) {
      item.disabled = true;
    });

    Array.from(mapFilters).forEach(function (item) {
      item.disabled = true;
    });
  };

  var setDefaultValue = function () {
    formTitle.value = '';
    formType.value = 'flat';
    formPrice.value = '';
    formRoom.value = '1';
    formCapacity.value = '1';
    formDescription.value = '';
    formTimein.value = '12:00';
    formTimeout.value = '12:00';

    Array.from(mapFiltersInputs).forEach(function (item) {
      item.value = 'any';
    });
  };

  var removeChecked = function () {
    Array.from(checkboxes).forEach(function (item) {
      item.checked = false;
    });
  };

  var deletePreviews = function () {
    var userpicPreview = document.querySelector('.ad-form-header__preview img');
    userpicPreview.src = 'img/muffin-grey.svg';

    var accPreviewContainer = document.querySelector('.ad-form__photo-container');
    var accPreviewImages = accPreviewContainer.querySelectorAll('.ad-form__photo');

    Array.from(accPreviewImages).forEach(function (item) {
      accPreviewContainer.removeChild(item);
    });

    var adFormPhoto = document.createElement('div');
    adFormPhoto.setAttribute('class', 'ad-form__photo');
    accPreviewContainer.appendChild(adFormPhoto);
  };

  var clearForm = function () {
    setDefaultValue();
    removeChecked();
    deletePreviews();
  };

  formTimein.addEventListener('change', function () {
    formTimeout.value = formTimein.value;
  });
  formTimeout.addEventListener('change', function () {
    formTimein.value = formTimeout.value;
  });

  var onGuestsSelectClick = function (evt) {
    window.formUtil.disableFormCapacity(evt.target);
  };

  formRoom.addEventListener('change', onGuestsSelectClick);
  formType.addEventListener('change', window.formUtil.changeMinValue);


  var delSuccessMessage = function () {
    var successSubmit = document.querySelector('.success');

    if (successSubmit) {
      main.removeChild(successSubmit);
      successSubmit.removeEventListener('click', delSuccessMessage);
    }
  };

  var showSuccessMessage = function () {
    var submitMessageTemplate = document.querySelector('#success').content;
    var submitMessage = submitMessageTemplate.cloneNode(true);

    main.appendChild(submitMessage);

    document.addEventListener('keydown', function (event) {
      if (event.keyCode === ESCAPE) {
        delSuccessMessage();
      }
    });

    var successSubmit = document.querySelector('.success');

    successSubmit.addEventListener('click', delSuccessMessage);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);

    window.apiUtil.submitData(formData, function () {
      clearForm();
      window.mapUtil.clearMap();
      disableForm();
      showSuccessMessage();
    },
    window.errorUtil.showErrorMessage);
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    clearForm();
    window.mapUtil.clearMap();
    disableForm();
  });

  disableForm();
  window.formUtil.fillAddress();
})();
