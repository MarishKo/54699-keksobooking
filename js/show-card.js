'use strict';

(function () {
  function showCard(adElement) {
    var offerDialog = document.querySelector('#offer-dialog');
    var oldDialogPanel = offerDialog.querySelector('.dialog__panel');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.create(adElement));
    offerDialog.replaceChild(fragment, oldDialogPanel);
    offerDialog.classList.remove('hidden');
    document.addEventListener('keydown', window.card.closeOnESC);
  }

  window.showCard = showCard;
})();
