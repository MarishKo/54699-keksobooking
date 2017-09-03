'use strict';

(function () {
  // обработка формы
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var offerTypeChoice = document.querySelector('#type');
  var offerCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var priceRoom = document.querySelector('#price');

  // синхронизиоуем поля выезда и заезда

  window.synchronizeField(timeIn, timeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncFields);
  window.synchronizeField(timeOut, timeIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncFields);

  function syncFields(element, value) {
    element.value = value;
  }

  function syncValueWithMin(element, value) {
    element.min = value;
  }

  window.synchronizeField(offerTypeChoice, priceRoom, ['flat', 'house', 'bungalo', 'palace'], [1000, 5000, 0, 10000], syncValueWithMin);

  // объект для соответствия количество комнат и гостей, которые могут там разместиться
  var roomGuests = {
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3],
    '100': [0]
  };

  // функция изменения селекта для выбора количества гостей в зависимости от количества комнат
  function toggleOptions(showOptions) {
    for (var i = 0; i < offerCapacity.options.length; i++) {
      offerCapacity.options[i].hidden = !(showOptions.indexOf(+offerCapacity.options[i].value) > -1);
    }
  }

  // функция проверки количества гостей в зависимости от комнат
  function checkGuestsInRoom(evt) {
    var currentType = evt.currentTarget;
    toggleOptions(roomGuests[currentType.value]);
    offerCapacity.value = roomGuests[currentType.value][0];
  }

  // подписываемся на изменение кодичества комнат в селекте
  roomNumber.addEventListener('change', checkGuestsInRoom);

})();
