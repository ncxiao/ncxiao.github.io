let options = {
    enableHighAccuracy: true,
    timeout: 45000
};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
} else {
    alert('Your browser does not natively support geolocation.');
}

function successCallback(position) {
    let msg = `<strong>My location</strong><br/>
        Longitude: ${position.coords.longitude.toFixed(7)}&deg;<br/>
        Latitude: ${position.coords.latitude.toFixed(7)}&deg;<br/>
        Accuracy: ${position.coords.accuracy.toFixed(2)} meters<br/>
        Time: ${new Date(position.timestamp).toLocaleString()}<br/>` // watch out spelling of locale

    if (position.coords.altitude)
        msg += `Altitude: ${position.coords.altitude.toFixed(2)} meters<br/>`
    if (position.coords.altitudeAccuracy)
    	msg += `Altitude Accuracy: ${position.coords.altitudeAccuracy} meters<br/>`
    if (position.coords.heading)
    	msg += `Heading: ${position.coords.heading}&deg;<br/>`
    if (position.coords.speed) {
    	msg += `Speed: ${position.coords.speed} m/s`;
    }
    document.getElementById("log").innerHTML = msg;
}

function errorCallback(error) {
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
    document.getElementById("log").innerHTML = `Error: ${msgs[error.code]}`;
}
