'use strict';

(function () {

  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  var offerParams = {
    'TITLES': [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    'TYPES': [
      'flat',
      'house',
      'bungalo'
    ],
    'CHECKIN_TIMES': [
      '12:00',
      '13:00',
      '14:00'
    ],
    'CHECKOUT_TIMES': [
      '12:00',
      '13:00',
      '14:00'
    ],
    'FEATURES': [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ]
  };


  var ADS_LENGTH = 8;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 15;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var locationXMin = 300;
  var locationXMax = 900;
  var locationYMin = 100;
  var locationYMax = 500;

  // функция создания элемента объявления
  function createAdItem(index) {
    var locationX = getRandomNumber(locationXMin, locationXMax);
    var locationY = getRandomNumber(locationYMin, locationYMax);

    var AdItem = {
      'author': {
        'avatar': 'img/avatars/user0' + [index + 1] + '.png',
      },
      'offer': {
        'title': offerParams.TITLES[index],
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': offerParams.TYPES[getRandomNumber(0, offerParams.TYPES.length - 1)],
        'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        'checkin': offerParams.CHECKIN_TIMES[getRandomNumber(0, offerParams.CHECKIN_TIMES.length - 1)],
        'checkout': offerParams.CHECKOUT_TIMES[getRandomNumber(0, offerParams.CHECKOUT_TIMES.length - 1)],
        'features': offerParams.FEATURES.slice(0, getRandomNumber(1, offerParams.FEATURES.length)),
        'description': '',
        'photos': []
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };

    return AdItem;
  }

  // функция создания массива объявлений
  function createAdArray() {
    var ads = [];

    for (var i = 0; i < ADS_LENGTH; i++) {
      ads.push(createAdItem(i));
    }

    return ads;
  }

  // функция получения случайного числа в заданных пределах
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

  window.data = createAdArray();

})();
