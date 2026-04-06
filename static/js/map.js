// Map Initialize karna (Default location Ahmedabad rakhi hai)
const map = L.map('map').setView([23.0225, 72.5714], 13);

// Advanced Dark Mode Map Tiles (Ye bohot cool dikhta hai safety app mein)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// 1. USER KI LIVE LOCATION (Blue Pulse Dot)
let userMarker, userCircle;

function trackUser() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // Purana marker hatana taaki naya ban sake
            if (userMarker) map.removeLayer(userMarker);
            if (userCircle) map.removeLayer(userCircle);

            // Naya Blue Marker (User)
            userMarker = L.circleMarker([lat, lng], {
                radius: 8,
                fillColor: "#3b82f6",
                color: "#fff",
                weight: 2,
                opacity: 1,
                fillOpacity: 0.9
            }).addTo(map).bindPopup("Aap Yahan Hain").openPopup();

            // Accuracy Circle (Halka blue area)
            userCircle = L.circle([lat, lng], {
                radius: position.coords.accuracy,
                color: '#3b82f6',
                fillOpacity: 0.1,
                weight: 1
            }).addTo(map);

            // Map ko user par focus karna
            map.setView([lat, lng], 16);

        }, (err) => {
            console.error("Location error:", err);
            alert("Please enable GPS/Location to see yourself on map!");
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    }
}

// 2. SAFE ZONES (Green Areas)
// Aap yahan apne hisaab se Lat/Lng badal sakte hain
const safeZones = [
    { name: "Police Station - Sector 1", lat: 23.025, lng: 72.575 },
    { name: "Safe Hub - Community Center", lat: 23.030, lng: 72.585 },
    { name: "Women Help Desk", lat: 23.015, lng: 72.565 }
];

safeZones.forEach(zone => {
    // Green Circle for Safe Zone
    L.circle([zone.lat, zone.lng], {
        color: '#22c55e',      // Green border
        fillColor: '#22c55e',  // Green fill
        fillOpacity: 0.3,
        radius: 400            // 400 meters radius
    }).addTo(map).bindPopup(`<b>Safe Zone:</b> ${zone.name}`);

    // Green Marker icon
    L.marker([zone.lat, zone.lng]).addTo(map);
});

// Location tracking start karna
trackUser();
