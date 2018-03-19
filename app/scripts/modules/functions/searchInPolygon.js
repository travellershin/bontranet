function searchInPolygon(){
    for (var hotel in db.hotel) {
        let label = 0
        let coor = new google.maps.LatLng(db.hotel[hotel].coor.lat, db.hotel[hotel].coor.lng)
        for (var i = 0; i < area.length; i++) {
            let polygon = new google.maps.Polygon({
                paths: area[i].coor,
                map: map
              });
            if(google.maps.geometry.poly.containsLocation(coor, polygon)){
                //firebase.database().ref("ny/hotel/"+hotel+"/area").set(i)
            }
        }
    }
}
