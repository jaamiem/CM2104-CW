// Creates a new map, centres it on Aberdeen and places it in the element with the ID 'map'
function initMap() {
	var abz = {lat:57.1497, lng:-2.0943};
	return new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: abz
	});

}

// This function places a marker on the passed map at the given location.
function placeMarker(map, parkingName, location){
	var marker = new google.maps.Marker({
		position: location,
		title: parkingName,
		map: map
	});
}

// Get the spots from EJS through node and mongo
//var spots = $.getJSON('query.json');

// Store the map itself
var map;

// These functions synchronise the value of labels with the value of their respective sliders
function updateDistanceLabel() {
	$('#distanceDisplay').html($('#distanceSlider').val() + 'km');
}

function updatePriceLabel() {
	$('#priceDisplay').html('£' + $('#priceSlider').val());
}

$(function() {
	var map = initMap();

	var count = 0;
	spots.forEach(function(item) {
		placeMarker(count, map, item.name, {lat: item.lat, lng: item.long});
		count++;
	});

	// Listeners for changes in the value of the distance and price sliders.
	// In the event of a change, they update text displayed near the slider with a clear value.
	$('#distanceSlider').change(function(event) {
		updateDistanceLabel();
	});

	$('#priceSlider').change(function(event) {
		updatePriceLabel();
	});

	$('.btn-expand-collapse').click(function(e) {
		$('.navbar-primary').toggleClass('collapsed');
	});

	updatePriceLabel();
	updateDistanceLabel();
});

// Geolocating
var infoWindow = new google.maps.InfoWindow;
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		var pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};

		infoWindow.setPosition(pos);
		infoWindow.setContent('Location found.');
		infoWindow.open(map);
		map.setCenter(pos);
	}, function() {
		handleLocationError(true, infoWindow, map.getCenter());
	});
	
} else {
	// Browser doesn't support Geolocation
	handleLocationError(false, infoWindow, map.getCenter());
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
						'Error: The Geolocation service failed.' :
						'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}
