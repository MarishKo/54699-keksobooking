'use strict';

(function () {
  // объект для соответствия количество комнат и гостей, которые могут там разместиться
  var ROOM_GUESTS = {
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3],
    '100': [0]
  };

  var TIMEIN_VALUES = ['12:00', '13:00', '14:00'];
  var TIMEOUT_VALUES = ['12:00', '13:00', '14:00'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo', 'palace'];
  var OFFER_PRICES = [1000, 5000, 0, 10000];

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var offerTypeChoice = document.querySelector('#type');
  var offerCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var priceRoom = document.querySelector('#price');
  var noticeForm = document.querySelector('.notice__form');
  var mainPin = document.querySelector('.pin__main');

  function syncFields(element, value) {
    element.value = value;
  }

  function syncValueWithMin(element, value) {
    element.min = value;
  }

  // синхронизируем поля выезда и заезда
  syncFields(timeOut, timeIn.value);
  window.synchronizeField(timeIn, timeOut, TIMEIN_VALUES, TIMEOUT_VALUES, syncFields);
  window.synchronizeField(timeOut, timeIn, TIMEOUT_VALUES, TIMEIN_VALUES, syncFields);
  window.synchronizeField(offerTypeChoice, priceRoom, OFFER_TYPES, OFFER_PRICES, syncValueWithMin);

  // функция изменения селекта для выбора количества гостей в зависимости от количества комнат
  function toggleOptions(showOptions) {
    for (var i = 0; i < offerCapacity.options.length; i++) {
      offerCapacity.options[i].hidden = !(showOptions.indexOf(+offerCapacity.options[i].value) > -1);
    }
  }

  // функция проверки количества гостей в зависимости от комнат
  function checkGuestsInRoom(evt) {
    var currentType = evt ? evt.currentTarget : roomNumber;
    toggleOptions(ROOM_GUESTS[currentType.value]);
    offerCapacity.value = ROOM_GUESTS[currentType.value][0];
  }

  // подписываемся на изменение количества комнат в селекте
  roomNumber.addEventListener('change', checkGuestsInRoom);

  noticeForm.addEventListener('submit', sendForm);

  function checkValidityForm() {
    var offerTypeIndex = OFFER_TYPES.indexOf(offerTypeChoice.value);
    var validity = true;
    if (+priceRoom.value < OFFER_PRICES[offerTypeIndex]) {
      window.backend.showError('Цена должна быть не меньше ' + OFFER_PRICES[offerTypeIndex]);
      validity = false;
    }
    if (ROOM_GUESTS[roomNumber.value].indexOf(+offerCapacity.value) < 0) {
      window.backend.showError('Количество комнат не соответсвует количеству гостей');
      validity = false;
    }
    return validity;
  }

  function sendForm(event) {
    event.preventDefault();
    var validateForm = checkValidityForm();
    if (validateForm) {
      window.backend.save(new FormData(noticeForm), function () {
        noticeForm.reset();
        window.map.syncMainCoord(mainPin.offsetLeft, mainPin.offsetTop);
        window.backend.showSuccess('Форма успешно отправлена!', 'success');
      }, window.backend.showError);
    }
  }

})();
