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

 	// Create the search box and link it to the UI element.
        var input = document.getElementById('locationSearch');
        var searchBox = new google.maps.places.SearchBox(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	
	 // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });



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
	var abz = {lat:57.1497, lng:-2.0943};
	// place Libary nearby search code places location marker of user on map
	// further options need to be included.
	var request = {
		location: abz,
		radius: '10000',
		type: ['parking']
		};

	service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
			
	function callback(result, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < result.length; i++) {
      var place = result[i];
      createMarker(result[i]);
    }
  }
}
	

	
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
