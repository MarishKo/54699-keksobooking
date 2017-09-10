'use strict';

(function () {
  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    debounce: function (callFunction) {
      var DEBOUNCE_TIME = 500;
      var lastInterval;

      if (lastInterval) {
        window.clearTimeout(lastInterval);
      }
      lastInterval = window.setTimeout(callFunction, DEBOUNCE_TIME);
    }
  };

})();
