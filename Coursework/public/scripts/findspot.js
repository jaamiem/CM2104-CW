var parkingMap;
var searchBox;

$(function() {
  $('#distanceslider').slider({
    value:0
  });
  
  $('#distanceslider').on('slide', function(event, ui) {
    updateDistanceLabel(ui.value);
  });
  
  $('#priceslider').slider({
    value:0
  });
  
  $('#priceslider').on('slide', function(event, ui) {
    updatePriceLabel(ui.value);
  });
  
  updateDistanceLabel(0);
  updatePriceLabel(0);
});

function updateDistanceLabel(newValue) {
  $('#distancedisplay').html(newValue + " km");
}

function updatePriceLabel(newValue) {
  $('#pricedisplay').html("£" + newValue);
}

function initMap() {
  parkingMap = new google.maps.Map(document.getElementById('mappanel'), {
    center: {lat: 55.0, lng: 0},
    zoom: 5
  });
  
  searchBox = new google.maps.places.SearchBox(document.getElementById('searchtext'));
}
