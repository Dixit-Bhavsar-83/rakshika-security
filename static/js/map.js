// Map Initialize karna (Default location Ahmedabad rakhi hai)
const map = L.map('map').setView([23.0225, 72.5714], 13);

// Advanced Dark Mode Map Tiles (Ye bohot cool dikhta hai safety app mein)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
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

// 1. SHARE LOCATION: WhatsApp par coordinates bhejne ke liye
function shareLocation() {
    if (userMarker) {
        const lat = userMarker.getLatLng().lat;
        const lng = userMarker.getLatLng().lng;
        const message = `Main musibat mein hoon! Meri live location ye hai: https://www.google.com/maps?q=${lat},${lng}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    } else {
        alert("Pehle GPS location fix hone dein!");
    }
}

// 2. FIND NEAREST SAFE ZONE: Sabse paas wala rasta dikhane ke liye
function findNearestSafeZone() {
    if (!userMarker) return alert("Aapki location nahi mil rahi!");

    let nearest = null;
    let minDistance = Infinity;

    // Sabse paas wala safe zone dhoondna
    safeZones.forEach(zone => {
        const dist = map.distance(userMarker.getLatLng(), [zone.lat, zone.lng]);
        if (dist < minDistance) {
            minDistance = dist;
            nearest = zone;
        }
    });

    if (nearest) {
        alert(`Sabse paas ${nearest.name} hai. Google Maps par rasta khul raha hai...`);
        // Google Maps Navigation kholna
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${nearest.lat},${nearest.lng}&travelmode=walking`, '_blank');
    }
}

// 3. FAKE CALL: Fake call page par bhejne ke liye
function triggerFakeCall() {
    // Agar aapka fake call ka alag page hai (e.g. fake-call.html)
    window.location.href = "/fake-call"; 
    // Ya phir audio play kar sakte hain:
    // let audio = new Audio('/static/audio/fake_call.mp3');
    // audio.play();
}

// Location tracking start karna
trackUser();
