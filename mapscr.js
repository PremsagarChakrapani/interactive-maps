var map = L.map('map').setView([0, 0], 2); // Default view

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to add a marker based on user input
function addMarker() {
    var latitude = parseFloat(document.getElementById('latitude').value);
    var longitude = parseFloat(document.getElementById('longitude').value);
    var message = document.getElementById('message').value;

    // Check if the input is valid
    if (isNaN(latitude) || isNaN(longitude)) {
        alert('Please enter valid coordinates.');
        return;
    }

    // Add a marker to the map
    var marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup(`<b>${message}</b><br>Lattitude: ${latitude} Lng: ${longitude}`).openPopup();
}

// Function to get user's current location automatically and set initial map view
function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userLatitude = position.coords.latitude;
            var userLongitude = position.coords.longitude;

            // Set the initial map view to the user's location
            map.setView([userLatitude, userLongitude], 13);

            // Add a marker for the user's location
            var userMarker = L.marker([userLatitude, userLongitude]).addTo(map);
            userMarker.bindPopup(`<b>Your Location</b><br>Lat: ${userLatitude}, Lng: ${userLongitude}`).openPopup();
        }, function (error) {
            alert('Error getting your location: ' + error.message);
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Call getUserLocation when the page loads
window.onload = getUserLocation;


//to get coordinates of clicked location
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);