$(function() {
  $('#distanceslider').slider({
    value:0
  });
  
  $('#distanceslider').on('slide', function(event, ui) {
    $('#distancedisplay').html("£" + ui.value);
  });
  
  $('#priceslider').slider({
    value:0
  });
  
  $('#priceslider').on('slide', function(event, ui) {
    $('#pricedisplay').html("£" + ui.value);
  });
});
