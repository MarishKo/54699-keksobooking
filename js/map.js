'use strict';

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_TYPES_NAME = {
  flat: function () {
    return 'Квартира';
  },
  house: function () {
    return 'Дом';
  },
  bungalo: function () {
    return 'Бунгало';
  }
};
var OFFER_CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var MIN_GUESTS = 1;
var MAX_GUESTS = 15;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var PIN_HEIGHT = 75;
var PIN_WIDTH = 94;
var ads = [];
var lodgeTemplate = document.querySelector('#lodge-template').content;
var pinMapList = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();
var offerDialog = document.querySelector('#offer-dialog');
var oldDialogPanel = offerDialog.querySelector('.dialog__panel');
// функция получения случайного числа в заданных пределах
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
// функция создания элемента объявления
function createAdItem(index) {
  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(100, 500);

  return {
    'author': {
      'avatar': 'img/avatars/user0' + [index + 1] + '.png',
    },
    'offer': {
      'title': OFFER_TITLES[index],
      'address': locationX + ', ' + locationY,
      'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
      'type': OFFER_TYPES[getRandomNumber(0, OFFER_TYPES.length - 1)],
      'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      'guests': getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      'checkin': OFFER_CHECKIN_TIMES[getRandomNumber(0, OFFER_CHECKIN_TIMES.length - 1)],
      'checkout': OFFER_CHECKOUT_TIMES[getRandomNumber(0, OFFER_CHECKOUT_TIMES.length - 1)],
      'features': OFFER_FEATURES.slice(0, getRandomNumber(1, OFFER_FEATURES.length)),
      'description': '',
      'photos': []
    },
    'location': {
      'x': locationX - (PIN_WIDTH / 2),
      'y': locationY - PIN_HEIGHT
    }
  };
}

for (var i = 0; i < 8; i++) {
  ads.push(createAdItem(i));
}

// функция создания метки на карте
function createImgPin(element) {
  var div = document.createElement('div');
  var img = document.createElement('img');

  div.classList.add('pin');
  div.style.left = element.location.x + 'px';
  div.style.top = element.location.y + 'px';

  img.src = element.author.avatar;
  img.classList.add('rounded');
  img.style.width = 40 + 'px';
  img.style.height = 40 + 'px';

  div.appendChild(img);

  return div;
}

for (var j = 0; j < ads.length; j++) {
  fragment.appendChild(createImgPin(ads[j]));
}
// вписываем все метки объявлений
pinMapList.appendChild(fragment);

// функция создания попапа с описание объявления
function createDialogPanel(ad) {
  var dialogPanel = lodgeTemplate.cloneNode(true);
  dialogPanel.querySelector('.lodge__title').textContent = ad.offer.title;
  dialogPanel.querySelector('.lodge__address').textContent = ad.offer.address;
  dialogPanel.querySelector('.lodge__price').textContent = ad.offer.price + ' \u20BD/ночь';
  dialogPanel.querySelector('.lodge__type').textContent = ad.offer.type in OFFER_TYPES_NAME ? OFFER_TYPES_NAME[ad.offer.type]() : '';
  dialogPanel.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах';
  dialogPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  var lodgeFeaturesList = dialogPanel.querySelector('.lodge__features');
  (ad.offer.features).forEach(function (feature) {
    var lodgeFeature = document.createElement('span');
    lodgeFeature.className = 'feature__image feature__image--' + feature;
    lodgeFeaturesList.appendChild(lodgeFeature);
  });
  dialogPanel.querySelector('.lodge__description').textContent = ad.offer.description;
  document.querySelector('.dialog__title img').src = ad.author.avatar;

  return dialogPanel;
}
// вписываем попап с описанием объявления
offerDialog.replaceChild(createDialogPanel(ads[0]), oldDialogPanel);
