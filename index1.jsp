<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Trip Planner</title>
<!--<link rel="stylesheet" href="roadtripStyle.css">-->
<link rel="stylesheet" type="text/css" href="/demo2/roadtripStyle.css">

</head>
<body>

<form class="trip-form">
    <h1>Trip Planner </h1>
  <p>Charging Speed </p>
  <div class="checkbox-group">
    <label>
        <input type="checkbox" name="charging_speed" value="regular">
        Regular
      </label>
      <label>
        <input type="checkbox" name="charging_speed" value="semi_fast">
        Semi Fast
      </label>
      <label>
        <input type="checkbox" name="charging_speed" value="fast">
        Fast
      </label>
      <input type="number" id="max-distance" name="max_distance" placeholder="Max Distance (KM)">
<input type="text" id="city" name="city" placeholder="City">

      
  </div>
<br>
  <div class="form-group">
    <label for="manufacturer">Car Manufacturer</label>
    <select id="manufacturer" name="manufacturer">
      <!-- Car manufacturer options will be populated by JavaScript -->
    </select>
  </div>

  <div class="form-group">
    <label for="car-model">Car Model</label>
    <select id="car-model" name="car_model" disabled>
      <!-- Car model options will be populated based on manufacturer selection -->
    </select>
  </div>

  <div class="form-group">
    <label for="your-location">Your Location</label>
    <input type="text" id="your-location" name="your_location" placeholder="Enter your location">
    <button type="button" id="location-button" class="location-button">Allow Location</button>
  </div>

  <div class="form-group">
    <label for="end">End</label>
    <input type="text" id="end" name="end" placeholder="Boston, MA, United States">
  </div>

  <div class="form-group">
    <label for="distance-from-route">Distance from route</label>
    <input type="range" id="distance-from-route" name="distance_from_route" min="0" max="50" class="range-input">
    <span id="distance-value" class="range-value">0 KM</span>
  </div>

  <div class="form-group">
    <label for="show-stations-every">Show stations every</label>
    <input type="range" id="show-stations-every" name="show_stations_every" min="0" max="200" class="range-input">
    <span id="stations-value" class="range-value">0 KM</span>
  </div>

  <!-- ... existing HTML content ... -->

  <button type="button" class="button" onclick="showFilteredStations()">Find Stations!</button>



<!-- Container for Google Map -->
<div id="map-container" style="display: none; margin-top: 20px;">
  <h2>Map View</h2>
<div id="map-container">
  <div id="map" style="height: 400px; width: 100%;"></div>
  <button id="center-map" onclick="centerMapOnUser()">Center Map on My Location</button>
</div>
<div id="stations-table-container"></div>
</div>
<div id="map-container" style="display:none;">
    <div id="map" style="height: 400px; width: 100%;"></div>
</div>

<!-- ... rest of your HTML content ... -->

</form>

<!--<script src="theScript.js"></script>-->
<script src="/demo2/theScript.js"></script>
<!---<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCEx5vImm5w1SKAYFwQrRpikPKx3_xU28Q&callback=initMap" async defer></script>-->

</body>
</html>
