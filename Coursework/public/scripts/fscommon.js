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