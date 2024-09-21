var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Example route: You can dynamically generate this based on the Dijkstra result from the backend
var dynamicRoute = window.pathCoordinates;

var polyline = L.polyline(dynamicRoute, {color: 'blue'}).addTo(map);
map.fitBounds(polyline.getBounds());