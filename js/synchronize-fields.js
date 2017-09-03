'use strict';
(function () {
  function synchronizeField(firstElement, secondElement, fisrtElValues, secondElValues, cb) {
    if (typeof cb === 'function') {
      firstElement.addEventListener('change', function () {
        var choosenIndex = fisrtElValues.indexOf(firstElement.value);
        cb(secondElement, secondElValues[choosenIndex]);
      });
    }
  }
  window.synchronizeField = synchronizeField;
})();
