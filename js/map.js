'use strict';

var offerDialog = document.querySelector('#offer-dialog');
var dialogClose = offerDialog.querySelector('.dialog__close');

// закрытие попапа по клику на крестик
dialogClose.addEventListener('click', function () {
  window.card.close();
});

// закрытие попапа по esc на кнопке закрытия
dialogClose.addEventListener('keydown', window.card.closeOnESC);

var mainPin = document.querySelector('.pin__main');

// ограничиваем переставкивание пина за края карты
var draggMinX = 0;
var draggMaxX = 1130;
var draggMinY = 100;
var draggMaxY = 500;

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  // начальные координаты
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var newCoords = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    if (newCoords.y < draggMaxY && newCoords.y > draggMinY && newCoords.x < draggMaxX && newCoords.x > draggMinX) {
      mainPin.style.top = newCoords.y + 'px';
      mainPin.style.left = newCoords.x + 'px';

      syncMainCoord(mainPin.offsetLeft, mainPin.offsetTop);
    }
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

function syncMainCoord(x, y) {
  var adress = document.querySelector('#address');
  adress.value = (x + (mainPin.offsetWidth / 2)) + ', ' + (y + mainPin.offsetHeight);
}

syncMainCoord(mainPin.offsetLeft, mainPin.offsetTop);
