'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

var ADS_LENGTH = 8;
var MIN_GUESTS = 1;
var MAX_GUESTS = 15;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var lodgeTemplate = document.querySelector('#lodge-template').content;
var pinMapList = document.querySelector('.tokyo__pin-map');
var offerDialog = document.querySelector('#offer-dialog');

// функция получения случайного числа в заданных пределах
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

// функция создания элемента объявления
function createAdItem(index) {
  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(100, 500);

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

// функция создания метки на карте
function createImgPin(element, index) {
  var img = {
    'WIDTH': 40,
    'HEIGHT': 40,
    'CLASS_NAME': 'rounded'
  };
  var div = document.createElement('div');
  var imgEl = document.createElement('img');

  div.classList.add('pin');
  div.style.left = element.location.x - (div.offsetWidth / 2) + 'px';
  div.style.top = element.location.y - div.offsetHeight + 'px';
  div.setAttribute('data-index', index);
  div.tabIndex = 0;

  imgEl.src = element.author.avatar;
  imgEl.classList.add(img.CLASS_NAME);
  imgEl.style.width = img.WIDTH + 'px';
  imgEl.style.height = img.HEIGHT + 'px';

  div.appendChild(imgEl);

  return div;
}

// функция получения всех пинов
function getPinsImg(array) {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < array.length; j++) {
    fragment.appendChild(createImgPin(array[j], j));
  }
  return fragment;
}

// функция создания попапа с описание объявления
function createDialogPanel(ad) {
  var dialogPanel = lodgeTemplate.cloneNode(true);
  var lodgeFeaturesList = dialogPanel.querySelector('.lodge__features');
  dialogPanel.querySelector('.lodge__title').textContent = ad.offer.title;
  dialogPanel.querySelector('.lodge__address').textContent = ad.offer.address;
  dialogPanel.querySelector('.lodge__price').textContent = ad.offer.price + ' \u20BD/ночь';
  dialogPanel.querySelector('.lodge__type').textContent = ad.offer.type in OFFER_TYPES ? OFFER_TYPES[ad.offer.type].title : '';
  dialogPanel.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах';
  dialogPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  dialogPanel.querySelector('.lodge__description').textContent = ad.offer.description;

  (ad.offer.features).forEach(function (feature) {
    var lodgeFeature = document.createElement('span');

    lodgeFeature.className = 'feature__image feature__image--' + feature;
    lodgeFeaturesList.appendChild(lodgeFeature);
  });

  document.querySelector('.dialog__title img').src = ad.author.avatar;

  return dialogPanel;
}

// фунция изменения содержания попапа
function changeDialogPopup(adElement) {
  var oldDialogPanel = offerDialog.querySelector('.dialog__panel');
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createDialogPanel(adElement));

  offerDialog.replaceChild(fragment, oldDialogPanel);
}

var dialogClose = offerDialog.querySelector('.dialog__close');
var activePin = null;

// функция открытия попапа
function openDialog() {
  offerDialog.classList.remove('hidden');
  document.addEventListener('keydown', onDialogEscPress);
}

// функция закрытия попапа
function closeDialog() {
  offerDialog.classList.add('hidden');
  activePin.classList.remove('pin--active');
  document.removeEventListener('keydown', onDialogEscPress);
}

// закрытие попапа по ESC
function onDialogEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeDialog();
  }
}

// функция переключения активного пина и показ соответвующего попапа
function showClickedPin(evt) {
  if (activePin) {
    activePin.classList.remove('pin--active');
  }
  activePin = evt.currentTarget;
  activePin.classList.add('pin--active');
  var activePinIndex = activePin.getAttribute('data-index');

  changeDialogPopup(adsArray[activePinIndex]);
  openDialog();
}

// функция добавления слушания клика по пину
function addPinListener() {
  var pinElements = pinMapList.querySelectorAll('.pin');

  for (var k = 0; k < pinElements.length; k++) {
    if (!pinElements[k].classList.contains('pin__main')) {
      pinElements[k].addEventListener('click', showClickedPin);
      pinElements[k].addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          showClickedPin(evt);
        }
      });
    }
  }
}

// закрытие попапа по клику на крестик
dialogClose.addEventListener('click', function () {
  closeDialog();
});

// закрытие попапа по esc на кнопке закрытия
dialogClose.addEventListener('keydown', onDialogEscPress);

// вписываем все метки объявлений
var adsArray = createAdArray();
pinMapList.appendChild(getPinsImg(adsArray));
addPinListener();

// вписываем попап с описанием объявления
changeDialogPopup(adsArray[0]);


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
