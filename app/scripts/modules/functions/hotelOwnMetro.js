for (var hid in db.hotel) {
    let ownMetro = {}
    let hotel = db.hotel[hid];

    for (var i = 0; i < hotel.metro.length; i++) {
        let distance = hotel.metro[i].distance;
        let name = hotel.metro[i].name;
        for (var j = 0; j < hotel.metro[i].line.length; j++) {
            let line = hotel.metro[i].line[j]

            if(ownMetro[line]){
                if(ownMetro[line].distance > distance){
                    ownMetro[line].distance = distance
                }
            }else{
                ownMetro[line] = {distance:distance,name:name}
            }
        }
    }
    hotel.ownMetro = ownMetro;
    //firebase.database().ref("ny/hotel/"+hid+"/ownMetro").set(ownMetro)
}
