'use strict';

(function () {

  function getAdsArray(data) {
    window.data = data;
    // вписываем все метки объявлений
    window.pin.paste();
    // функция добавления слушания клика по пину
    window.pin.addListener();

    // вписываем попап с описанием объявления
    window.showCard(window.data[0]);
    document.querySelectorAll('.pin')[1].classList.add('pin--active');
  }

  window.backend.load(getAdsArray, window.backend.showError);

})();
