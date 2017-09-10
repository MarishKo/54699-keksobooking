'use strict';

(function () {
  var filtersForm = document.querySelector('.tokyo__filters');
  var housingType = filtersForm.querySelector('#housing_type');
  var housingPrice = filtersForm.querySelector('#housing_price');
  var housingRoom = filtersForm.querySelector('#housing_room-number');
  var housingGuests = filtersForm.querySelector('#housing_guests-number');
  var housingFeatures = filtersForm.querySelectorAll('input[name="feature"]');

  var housingFeaturesValues = [].filter.call(housingFeatures, function (el) {
    return el.checked;
  }).map(function (item) {
    return item.value;
  });

  var filters = {
    housingType: housingType.value,
    housingPrice: housingPrice.value,
    housingRoom: housingRoom.value,
    housingGuests: housingGuests.value,
    housingFeatures: housingFeaturesValues
  };

  function updateFilters(filterKey, filterValue) {
    filters[filterKey] = filterValue;
    window.pin.filter(filters);
  }

  housingType.addEventListener('change', function (evt) {
    updateFilters('housingType', evt.currentTarget.value);
  });
  housingPrice.addEventListener('change', function (evt) {
    updateFilters('housingPrice', evt.currentTarget.value);
  });
  housingRoom.addEventListener('change', function (evt) {
    updateFilters('housingRoom', evt.currentTarget.value);
  });
  housingGuests.addEventListener('change', function (evt) {
    updateFilters('housingGuests', evt.currentTarget.value);
  });
  housingFeatures.forEach(function (feature) {
    feature.addEventListener('change', findChosenFeatures);
  });

  function findChosenFeatures() {
    var checkedValues = [].map.call(filtersForm.querySelectorAll('input[name="feature"]:checked'), function (item) {
      return item.value;
    });
    updateFilters('housingFeatures', checkedValues);
  }
})();
