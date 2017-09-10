'use strict';

(function () {
  var OFFER_TYPES = {
    'flat': {
      'title': 'Квартира'
    },
    'house': {
      'title': 'Дом'
    },
    'bungalo': {
      'title': 'Бунгало'
    },
    'palace': {
      'title': 'Дворец'
    }
  };

  window.card = {
    create: function (ad) {
      var lodgeTemplate = document.querySelector('#lodge-template').content;
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
    },
    close: function () {
      var offerDialog = document.querySelector('#offer-dialog');
      offerDialog.classList.add('hidden');
      window.pin.removeActivePin();
      document.removeEventListener('keydown', this.closeOnESC);
    },
    closeOnESC: function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.card.close();
      }
    }
  };
})();
