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
