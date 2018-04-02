var map;
var markerImg;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.74844, lng: -73.98566 },
        zoom: 13,
        mapTypeControl: false,
        scaleControl: true,
        fullscreenControl: false
    });
    var sc = document.createElement('script'); sc.id = 'vxscript'; sc.type = 'text/javascript'; sc.async = 'async'; sc.src = 'https://m.avuxiapis.com/v1/s/72b5ee5385014?callback=avapil&ln=en'; document.body.appendChild(sc);
}
function avapil() {
    AVUXI.MapStart(map, '72b5ee53f774f');
};
initMap();
// function calcRoute() {
//     var directionsService = new google.maps.DirectionsService();
//   var request = {
//     origin: "John F. Kennedy International Airport",
//     destination: {lat:40.755905,lng:-73.970947},
//     travelMode: 'TRANSIT'
//   };
//   directionsService.route(request, function(result, status) {
//     if (status == 'OK') {
//       console.log(result)
//     }
//   });
// }
