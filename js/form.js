'use strict';

(function () {
  var OFFER_TYPES = {
    'flat': {
      'title': 'Квартира',
      'minPrice': 1000
    },
    'house': {
      'title': 'Дом',
      'minPrice': 5000
    },
    'bungalo': {
      'title': 'Бунгало',
      'minPrice': 0
    },
    'palace': {
      'title': 'Дворец',
      'minPrice': 10000
    }
  };

  // обработка формы
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var offerTypeChoice = document.querySelector('#type');
  var offerCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var priceRoom = document.querySelector('#price');

  // подписываемся на изменение даты заезда и меняем дату выезда
  timeIn.addEventListener('change', function (evt) {
    timeOut.value = evt.currentTarget.value;
  });

  // подписываемся на изменение даты выезда и меняем дату заезда
  timeOut.addEventListener('change', function (evt) {
    timeIn.value = evt.currentTarget.value;
  });

  // при изменении выбора типа жилья, меняем минимальную стоимость
  function checkMinPrice() {
    var minLength = OFFER_TYPES[offerTypeChoice.value].minPrice;
    priceRoom.setAttribute('min', minLength);
  }

  offerTypeChoice.addEventListener('change', checkMinPrice);

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
