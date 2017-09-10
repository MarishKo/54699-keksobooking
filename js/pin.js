'use strict';

(function () {
  var pinMapList = document.querySelector('.tokyo__pin-map');

  window.pin = {
    create: function (array) {
      var fragment = document.createDocumentFragment();

      for (var j = 0; j < array.length; j++) {
        fragment.appendChild(this.createImg(array[j], j));
      }

      return fragment;
    },
    paste: function (arrayData) {
      pinMapList.appendChild(this.create(arrayData));
    },
    createImg: function (element, index) {
      var img = {
        'WIDTH': 40,
        'HEIGHT': 40,
        'CLASS_NAME': 'rounded'
      };
      var DIV_SIZES = {
        width: 56,
        height: 75
      };
      var div = document.createElement('div');
      var imgEl = document.createElement('img');

      div.classList.add('pin');
      div.style.left = element.location.x - (DIV_SIZES.width / 2) + 'px';
      div.style.top = element.location.y - DIV_SIZES.height + 'px';
      div.setAttribute('data-index', index);
      div.tabIndex = 0;

      imgEl.src = element.author.avatar;
      imgEl.classList.add(img.CLASS_NAME);
      imgEl.style.width = img.WIDTH + 'px';
      imgEl.style.height = img.HEIGHT + 'px';

      div.appendChild(imgEl);

      return div;
    },
    removeActivePin: function () {
      var activePin = document.querySelector('.pin--active');
      if (activePin) {
        activePin.classList.remove('pin--active');
      }
    },
    toggleActive: function (evt, arrayData) {
      this.removeActivePin();
      var activePin = evt.currentTarget;
      var activePinIndex = activePin.getAttribute('data-index');
      activePin.classList.add('pin--active');

      window.showCard(arrayData[activePinIndex]);
    },
    addListener: function (arrayData) {
      var pinElements = pinMapList.querySelectorAll('.pin:not(.pin__main)');
      var pinObj = this;

      for (var k = 0; k < pinElements.length; k++) {
        pinElements[k].addEventListener('click', function (evt) {
          pinObj.toggleActive(evt, arrayData);
        });
        pinElements[k].addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.util.ENTER_KEYCODE) {
            pinObj.toggleActive(evt, arrayData);
          }
        });
      }
    },
    deleteAllPins: function () {
      var showenPinsList = document.querySelectorAll('.pin:not(.pin__main)');

      for (var i = 0; i < showenPinsList.length; i++) {
        showenPinsList[i].parentNode.removeChild(showenPinsList[i]);
      }
    },
    filter: function (filters) {
      var filterArray = window.data.filter(function (ad) {
        var filter = true;
        if (filter && filters.housingType !== 'any') {
          filter = ad.offer.type === filters.housingType;
        }
        if (filter && filters.housingPrice !== 'any') {
          switch (filters.housingPrice) {
            case 'middle':
              filter = (+ad.offer.price >= 10000) && (+ad.offer.price <= 50000);
              break;
            case 'low':
              filter = +ad.offer.price < 10000;
              break;
            case 'high':
              filter = +ad.offer.price > 50000;
              break;
          }
        }

        if (filter && filters.housingRoom !== 'any') {
          filter = +filters.housingRoom === ad.offer.rooms;
        }

        if (filter && filters.housingGuests !== 'any') {
          filter = +filters.housingGuests === ad.offer.guests;
        }

        if (filter && filters.housingFeatures.length > 0) {
          var diffFeaturesArr = filters.housingFeatures.filter(function (adFeature) {
            return ad.offer.features.indexOf(adFeature) < 0;
          });
          filter = diffFeaturesArr.length === 0;
        }

        return filter;
      });

      window.util.debounce(this.update(filterArray));
    },
    update: function (filteredArr) {
      this.deleteAllPins();
      this.paste(filteredArr);
      this.addListener(filteredArr);

      if (filteredArr.length > 0) {
        window.map.updateActiveCard(filteredArr);
      } else {
        window.card.close();
      }
    }
  };
})();
