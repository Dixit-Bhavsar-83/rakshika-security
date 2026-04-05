// static/js/map.js
document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([23.0225, 72.5714], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Safe Zone (Green)
    L.circle([23.0225, 72.5714], { 
        color: 'green', 
        fillColor: '#0f0', 
        fillOpacity: 0.2, 
        radius: 500 
    }).addTo(map).bindPopup("Safe Zone: Police Patrol Nearby");

    // Alert Zone (Red)
    L.circle([23.0300, 72.5800], { 
        color: 'red', 
        fillColor: '#f00', 
        fillOpacity: 0.3, 
        radius: 400 
    }).addTo(map).bindPopup("Alert: High Crime Rate Area");
});