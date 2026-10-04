
// create a map in the "map" div
const map = L.map('map', { 
    center: [40, -83], 
    zoom: 13
});

const streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
}).addTo(map);   // on by default

const topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
});

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
});

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

L.control.layers({ 
    "Streets": streets, 
    "Topographic": topo, 
    "Satellite": satellite,
    "OpenStreetMap": osm
}).addTo(map);

// run the geolocation routine
mapLocation();

function mapLocation() {
    const options = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 100000
    };
    if (window.navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    } else {
	    alert("Your web browser does not support W3C geolocation.");
    }
}

function successCallback(position) {
    // get the location detected
    let myLatLng = L.latLng(position.coords.latitude, position.coords.longitude);
    // use the detected location as the center and show the map
    map.setView(myLatLng, 15);

    // create the content used in the popup window
    let msg = `<strong>My location</strong><br/>
        Longitude: ${myLatLng.lng.toFixed(7)}&deg;<br/>
        Latitude: ${myLatLng.lat.toFixed(7)}&deg;<br/>
        Accuracy: ${position.coords.accuracy.toFixed(2)} meters<br/>
        Time: ${new Date(position.timestamp).toLocaleString()}<br/>` // watch out spelling of locale

    if (position.coords.altitude)
        msg += `Altitude: ${position.coords.altitude.toFixed(2)} meters<br/>`
    if (position.coords.altitudeAccuracy)
    	msg += `Altitude Accuracy: ${position.coords.altitudeAccuracy)} meters<br/>`
    if (position.coords.heading)
    	msg += `Heading: ${position.coords.heading}&deg;<br/>`
    if (position.coords.speed) {
    	msg += `Speed: ${position.coords.speed} m/s`;
    }

    // create a Leaflet marker and add it to the map
    var myMarker = L.marker(myLatLng);
    myMarker.bindPopup(msg);
    myMarker.addTo(map);
}

function errorCallback(error) {
    // if geolocation goes wrong, set the map center and show it
    map.setView([40, -83], 15);
    // in the following code, we use the brackets because 
    // JavaScript object literal syntax does not allow 
    // raw dot-notation paths (like error.POSITION_UNAVAILABLE) 
    // directly as key names
    // 
    // Using [ ] tells JavaScript to evaluate the expression first 
    // and use the resulting value (e.g., 1, 2 or 3) as the key.
    const msgs = { 
        [error.PERMISSION_DENIED]: 'Permission denied',
        [error.POSITION_UNAVAILABLE]: 'Position unavailable',
        [error.TIMEOUT]: 'Request timeout',
        [error.UNKNOWN_ERROR]: 'Unknown error'
    };
    alert("Error: " + msgs[error.code]);
}
