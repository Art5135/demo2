// Function to update KM values next to the sliders

window.reservedStationMarker = null;

function updateKmValues() {
    document.getElementById('distance-value').textContent = document.getElementById('distance-from-route').value + ' KM';
    document.getElementById('stations-value').textContent = document.getElementById('show-stations-every').value + ' KM';
  }
  
  // Update KM values on input change
  document.getElementById('distance-from-route').addEventListener('input', updateKmValues);
  document.getElementById('show-stations-every').addEventListener('input', updateKmValues);
  
  // Initialize KM values
  updateKmValues();
  
  // Manufacturers and car models data structure
  const carData = {
    'Manufacturer 1': ['Model 1-1', 'Model 1-2', 'Model 1-3', 'Model 1-4', 'Model 1-5'],
    'Manufacturer 2': ['Model 2-1', 'Model 2-2', 'Model 2-3', 'Model 2-4', 'Model 2-5'],
    // ... Add more manufacturers and models as necessary
  };
  
  // Populate manufacturers dropdown
  const manufacturerSelect = document.getElementById('manufacturer');
  for (const manufacturer in carData) {
    const option = document.createElement('option');
    option.value = manufacturer;
    option.textContent = manufacturer;
    manufacturerSelect.appendChild(option);
  }
  
  // Function to populate car models based on selected manufacturer
  function populateCarModels() {
    const selectedManufacturer = manufacturerSelect.value;
    const models = carData[selectedManufacturer];
    const modelSelect = document.getElementById('car-model');
    modelSelect.innerHTML = ''; // Clear previous options
    models.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
    modelSelect.disabled = false; // Enable the model select
  }
  
  // Event listener for manufacturer selection change
  manufacturerSelect.addEventListener('change', populateCarModels);
  
  // "Allow Location" button functionality
  document.getElementById('location-button').addEventListener('click', function() {
    const yourLocationInput = document.getElementById('your-location');
    const locationButton = document.getElementById('location-button');
    
    // Check if the input is disabled, if so, enable it and clear its value
    if (yourLocationInput.disabled) {
      yourLocationInput.disabled = false;
      yourLocationInput.classList.remove('disabled');
      yourLocationInput.value = '';
      locationButton.textContent = 'Allow Location';
    } else {
      // If not disabled, try to get the geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          yourLocationInput.value = `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`;
          yourLocationInput.classList.add('disabled');
          yourLocationInput.disabled = true;
          locationButton.textContent = 'Clear Location';
        }, function() {
          alert('Unable to retrieve your location.');
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    }
  });

  // ... existing JavaScript code ...

  function showStations() {
    var bounds = new google.maps.LatLngBounds();
    var infoWindow = new google.maps.InfoWindow();

    stations.forEach(station => {
        var position = new google.maps.LatLng(station.lat, station.lng);
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: station.name
        });

        // Listener to show an info window when the marker is clicked
        google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
                var contentString = '<div><h3>' + station.name + '</h3><p>Charging Speed: ' + station.chargingSpeed + '</p><p>Distance: ' + station.distance + ' KM</p><p>City: ' + station.city + '</p></div>';
                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);
            }
        })(marker));

        bounds.extend(position);
    });

    map.fitBounds(bounds); // Adjusts the map view to include all markers
}


// Load Google Maps
function loadGoogleMaps() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCEx5vImm5w1SKAYFwQrRpikPKx3_xU28Q&callback=initMap";
  document.body.appendChild(script);
}

window.onload = loadGoogleMaps;

// ... rest of your JavaScript code ...

var map;  // Global variable for the map

function initMap() {
    // Initialize the map with default center
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.397, lng: 150.644}, // Default center
        zoom: 8
    
      
      });
}

function centerMapOnUser() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          var userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };
          map.setCenter(userLocation);
          // Optionally add a marker at the user's location
      }, function(error) {
          console.error("Error Centering Map: ", error);
          alert('Error: The Geolocation service failed.');
      });
  } else {
      alert('Error: Your browser doesn\'t support geolocation.');
  }
}

const stations = [
  { name: "Station 1", lat: 32.222, lng: -1322.4194, chargingSpeed: "Regular", distance: 10, city: "San Francisco" },
  { name: "Station 2", lat: 33.3449, lng: -154.4294, chargingSpeed: "Semi Fast", distance: 15, city: "Los Angeles" },
  { name: "Station 3", lat: 35.3455, lng: -221.434, chargingSpeed: "Fast", distance: 20, city: "San Diego" },
  // ... more stations ...
];
function generateStationsTable(stations) {
  var container = document.getElementById('stations-table-container');
  container.innerHTML = ''; // Clear previous content

  var table = document.createElement('table');
  table.className = 'stations-table'; // Add a class for styling

  // Create table header
  var thead = table.createTHead();
  var headerRow = thead.insertRow();
  var headers = ["Name", "Latitude", "Longitude", "Charging Speed", "Distance", "City", "Action"]; // Added "Action" for the button column
  headers.forEach(headerText => {
      var headerCell = document.createElement('th');
      headerCell.textContent = headerText;
      headerRow.appendChild(headerCell);
  });

  // Create table body
  var tbody = table.createTBody();
  stations.forEach(station => {
      var row = tbody.insertRow();
      Object.values(station).forEach(text => {
          var cell = row.insertCell();
          cell.textContent = text;
      });

      // Add a cell with a button at the end of each row
      var reserveCell = row.insertCell();
      var reserveButton = document.createElement('button');
      reserveButton.textContent = 'Reserve Station';
      reserveButton.className = 'reserve-button'; // For styling
      reserveButton.onclick = function() { reserveStation(stations); }; // Assuming you have a function to handle reservation
      reserveCell.appendChild(reserveButton);
  });

  container.appendChild(table);
}

function reserveStation(station) {
  // Clear existing reserved station marker if needed
  if (window.reservedStationMarker) {
      window.reservedStationMarker.setMap(null);
  }

  // Create a marker for the reserved station
  var position = new google.maps.LatLng(station.lat, station.lng);
  var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: station.name,
      icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" // Red marker icon
      }
  });

  // Save the marker in case we need to clear it later
  window.reservedStationMarker = marker;

  // Optionally, center the map on the reserved station
  map.setCenter(position);
}



function showFilteredStations() {
  // Get user inputs
  var userChargingSpeeds = Array.from(document.querySelectorAll('input[name="charging_speed"]:checked')).map(input => input.value);
  var userMaxDistance = parseInt(document.getElementById('max-distance').value, 10);
  var userCity = document.getElementById('city').value;

  // Clear existing markers
  clearMapMarkers();

  // Filter and display stations
  var bounds = new google.maps.LatLngBounds();
  var infoWindow = new google.maps.InfoWindow();

  stations.filter(station => 
      userChargingSpeeds.includes(station.chargingSpeed) &&
      station.distance <= userMaxDistance &&
      station.city === userCity
  ).forEach(station => {
      var position = new google.maps.LatLng(station.lat, station.lng);
      var marker = new google.maps.Marker({
          position: position,
          map: map,
          title: station.name
      });

      google.maps.event.addListener(marker, 'click', (function(marker) {
          return function() {
              var contentString = `<div><h3>${station.name}</h3><p>Charging Speed: ${station.chargingSpeed}</p><p>Distance: ${station.distance} KM</p><p>City: ${station.city}</p></div>`;
              infoWindow.setContent(contentString);
              infoWindow.open(map, marker);
          }
      })(marker));

      bounds.extend(position);
  });

  map.fitBounds(bounds); // Adjusts the map view to include all markers
  document.getElementById('map-container').style.display = 'block'; // Make sure the map container is visible

  generateStationsTable(stations);

}

function clearMapMarkers() {
  // Implement logic to remove all markers from the map
}



function addMarker(lat, lng, title) {
  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
      title: title
  });
}
