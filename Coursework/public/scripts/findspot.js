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
	//console.log(location);

	var marker = new google.maps.Marker({
		position: location,
		title: parkingName,
		map: map
	});
}

// These functions synchronise the value of labels with the value of their respective sliders
function updateRatingLabel() {
	$('#ratingDisplay').html($('#ratingSlider').val());
}
function updatePriceLabel() {
	$('#priceDisplay').html('£' + $('#priceSlider').val());
}


// Get the spots from EJS through node and mongo
var urlParams = location.href.substring(location.href.indexOf("?"));

// Store the map itself
var map;

$(function() {
	map = initMap();

	$('.btn-expand-collapse').click(function(e) {
		$('.navbar-primary').toggleClass('collapsed');
	});

	if (urlParams.charAt(0) === "?") {
		$.getJSON('/json/query.json' + urlParams, function(result) {
			//console.log(result);

			var count = 0;
			result.forEach(function(item) {
				placeMarker(map, item.name, {lat: item.lat, lng: item.long});
				count++;
			});
		});
	}



	// Listeners for changes in the value of the rating and price sliders.
	// In the event of a change, they update text displayed near the slider with a clear value.
	$('#ratingSlider').change(function(event) {
		updateRatingLabel();
	});

	$('#priceSlider').change(function(event) {
		updatePriceLabel();
	});

	updatePriceLabel();
	updateRatingLabel();

	// Geolocating
	var infoWindow = new google.maps.InfoWindow();
	var pos;
	
	// place Libary nearby search code places location marker of user on map
	// further options need to be included.
	var request = {
		location: pos,
		radius: '50',
		type: ['locations']
	};

	service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request);
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			pos = {
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


});
