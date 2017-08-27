'use strict';

var offerDialog = document.querySelector('#offer-dialog');
var dialogClose = offerDialog.querySelector('.dialog__close');

// закрытие попапа по клику на крестик
dialogClose.addEventListener('click', function () {
  window.card.close();
});

// закрытие попапа по esc на кнопке закрытия
dialogClose.addEventListener('keydown', window.card.closeOnESC);

// вписываем все метки объявлений
window.pin.paste();
// функция добавления слушания клика по пину
window.pin.addListener();

// вписываем попап с описанием объявления
window.card.changeContent(window.data[0]);
