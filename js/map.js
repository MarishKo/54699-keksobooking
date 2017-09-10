'use strict';

(function () {
  // ограничиваем переставкивание пина за края карты
  var DRAGG_MIN_X = 0;
  var DRAGG_MAX_X = 1130;
  var DRAGG_MIN_Y = 100;
  var DRAGG_MAX_Y = 500;

  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var mainPin = document.querySelector('.pin__main');

  window.map = {
    updateActiveCard: function (data) {
      window.showCard(data[0]);
      document.querySelectorAll('.pin:not(.pin__main)')[0].classList.add('pin--active');
    },
    syncMainCoord: function (x, y) {
      var adress = document.querySelector('#address');
      adress.value = (x + (mainPin.offsetWidth / 2)) + ', ' + (y + mainPin.offsetHeight);
    }
  };

  // закрытие попапа по клику на крестик
  dialogClose.addEventListener('click', function () {
    window.card.close();
  });

  // закрытие попапа по esc на кнопке закрытия
  dialogClose.addEventListener('keydown', window.card.closeOnEsc);

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

      if (newCoords.y < DRAGG_MAX_Y && newCoords.y > DRAGG_MIN_Y && newCoords.x < DRAGG_MAX_X && newCoords.x > DRAGG_MIN_X) {
        mainPin.style.top = newCoords.y + 'px';
        mainPin.style.left = newCoords.x + 'px';

        window.map.syncMainCoord(mainPin.offsetLeft, mainPin.offsetTop);
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

  window.map.syncMainCoord(mainPin.offsetLeft, mainPin.offsetTop);
})();
