// Полный список похожих объявлений загружается после перехода страницы в активное состояние с сервера
//  https://js.dump.academy/keksobooking/data. Каждое из объявлений показывается
//   на карте в виде специальной метки: блока, имеющего класс map__pin. Шаблонный элемент для метки .map__pin
//    находится в шаблоне template. Разметка каждой из меток должна создаваться по аналогии с шаблонным элементом.
//    Данные с сервера могут быть получены не в полном объеме.
//    Если данных для заполнения не хватает, соответствующий блок
//    арточке скрывается. Например, если в объявлении не указано никаких удобств, нужно скрыть блок
//    .popup__features. При отсутствии полей не должно возникать ошибок.
//  Если в объекте с описанием объявления отсутствует поле offer, то метка объявления не должна отображаться на карте.
'use strict';
(function () {
  window.getData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', onError);
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  window.submitData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', onError);
    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);
  };
})();
