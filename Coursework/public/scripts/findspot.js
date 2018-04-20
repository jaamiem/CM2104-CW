var map = L.map('map', {
	center: [-2.0943, 57.1497],
	zoom: 8
});

var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ', maxZoom: 16 });
Esri_WorldGrayCanvas.addTo(map);
var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {maxZoom: 17, attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'});
OpenTopoMap.addTo(map);
