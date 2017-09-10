'use strict';

(function () {
  var DATA_URL = 'https://1510.dump.academy/keksobooking/data';
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var XHR_TIMEOUT = 10000;
  var NOTICES_TIMEOUT = 5000;
  var ERROR_LOAD_MESSAGE = 'Произошла ошибка при загрузке данных';
  var ERROR_TIMEOUT_MESSAGE = 'Запрос не успел выполниться за ' + XHR_TIMEOUT + 'мс';
  var ERROR_CONNECTING_MESSAGE = 'Произошла ошибка соединения';

  function loadData(onLoad, onError) {
    var loader = document.createElement('script');
    loader.src = DATA_URL + '?callback=__jsonpCallback';

    loader.addEventListener('error', function () {
      onError(ERROR_LOAD_MESSAGE);
    });
    window.__jsonpCallback = function (data) {
      onLoad(data);
    };
    document.body.append(loader);
  }

  function saveData(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ERROR_CONNECTING_MESSAGE);
    });
    xhr.addEventListener('timeout', function () {
      onError(ERROR_TIMEOUT_MESSAGE);
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  }

  function showNotice(message, status) {
    var statusClass = status || 'error';
    var divError = document.createElement('div');
    divError.textContent = message;
    divError.className = 'notices notices--' + statusClass;
    document.body.insertAdjacentElement('afterbegin', divError);
    setTimeout(function () {
      document.body.removeChild(divError);
    }, NOTICES_TIMEOUT);

  }

  window.backend = {
    load: loadData,
    save: saveData,
    showError: showNotice,
    showSuccess: showNotice
  };
})();
