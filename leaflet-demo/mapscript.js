// mapscript.js
const map = L.map('map', {
    center: [40, -83],  // [latitude, longitude]
    zoom: 12            // 0 = whole world, ~18-19 = street level
});

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri'
}).addTo(map);
