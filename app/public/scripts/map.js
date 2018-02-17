var map;
var markerImg;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.74844, lng: -73.98566 },
        zoom: 13,
        mapTypeControl: false
    });
    markerImg = new google.maps.MarkerImage('./assets/pin-map.png',
        new google.maps.Size(22, 22),
        new google.maps.Point(0, 0),
        new google.maps.Point(11, 11));
}