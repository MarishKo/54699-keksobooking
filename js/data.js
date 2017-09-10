'use strict';

(function () {

  function getAdsArray(data) {
    window.data = data;
    // вписываем все метки объявлений
    window.pin.paste(window.data.slice(0, 3));
    // функция добавления слушания клика по пину
    window.pin.addListener(window.data.slice(0, 3));

    // вписываем попап с описанием объявления
    window.map.updateActiveCard(window.data);
  }

  window.backend.load(getAdsArray, window.backend.showError);

})();
