const map = L.map('map', {
    center: [40, -83],  // [latitude, longitude]
    zoom: 12            // 0 = whole world, ~18-19 = street level
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
