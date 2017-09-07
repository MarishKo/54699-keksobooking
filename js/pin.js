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
    paste: function () {
      pinMapList.appendChild(this.create(window.data));
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
    toggleActive: function (evt) {
      var activePin = document.querySelector('.pin--active');
      if (activePin) {
        activePin.classList.remove('pin--active');
      }
      activePin = evt.currentTarget;
      activePin.classList.add('pin--active');
      var activePinIndex = activePin.getAttribute('data-index');

      window.showCard(window.data[activePinIndex]);
    },
    addListener: function () {
      var pinElements = pinMapList.querySelectorAll('.pin');
      var pinObj = this;

      for (var k = 0; k < pinElements.length; k++) {
        if (!pinElements[k].classList.contains('pin__main')) {
          pinElements[k].addEventListener('click', this.toggleActive);
          pinElements[k].addEventListener('keydown', function (evt) {
            if (evt.keyCode === window.util.ENTER_KEYCODE) {
              pinObj.toggleActive(evt);
            }
          });
        }
      }
    }
  };
})();
