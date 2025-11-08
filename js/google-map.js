var google;

function init() {
    // Basic options for a simple Google Map
    var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 7,

        // The latitude and longitude to center the map (always required)
        center: myLatlng,

        // How you would like to style the map. 
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    { "visibility": "simplified" },
                    { "hue": "#ff0000" }
                ]
            }
        ]
    };

    // Get the HTML DOM element that will contain your map 
    var mapElement = document.getElementById('map');

    // SAFETY CHECK: If the element is not found, exit silently. 
    // This prevents the error message if the script accidentally loads on a non-map page.
    if (mapElement === null) {
        // console.error("Map initialization skipped: HTML element with id='map' not found.");
        return; 
    }

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    
    var addresses = ['New York'];

    for (var x = 0; x < addresses.length; x++) {
        $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+addresses[x]+'&sensor=false', null, function (data) {
            if (data.results && data.results.length > 0) {
                var p = data.results[0].geometry.location
                var latlng = new google.maps.LatLng(p.lat, p.lng);
                new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: 'images/loc.png'
                });
            }
        });
    }
}

// NOTE: The $(document).ready(init); line has been REMOVED.
// The Google Maps API will call init() automatically.