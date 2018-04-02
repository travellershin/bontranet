for (var hotelID in db.hotels) {
    let hotel = db.hotels[hotelID];
    hotel.spots = {"foot":[],"transport":[],"transport_after":{}}

    for (let i = 0; i < 59; i++) {
        let spot = db.spots[i];

        let latDif = Math.pow((hotel.coor.lat - spot.coor.lat)*111034,2);
        let lngDif = Math.pow((hotel.coor.lng - spot.coor.lng) * 85397, 2);
        let dif = Math.round(Math.sqrt(latDif+lngDif))

        if(dif<1500){
            //console.log(hotelID +" 호텔은 " + spot.name + " 에서("+i+") " + dif + "m 떨어져있다. - " + "호선");
            console.log(spot)
            hotel.spots.foot.push({id:i,distance:dif})
            spot.hotels.foot.push({id:hotelID,distance:dif})
        }
        if(dif>500){
            if(db.spots[i].ownMetro){
                for (var j = 0; j < db.spots[i].ownMetro.length; j++) {
                    let spotMetro = db.spots[i].ownMetro[j];

                    for (var hotelMetro in hotel.ownMetro) {
                        if(spotMetro === hotelMetro){
                            hotel.spots.transport.push({id:i,distance:dif,line:hotelMetro})
                        }
                    }
                }
            }
        }
    }
    hotel.spots.foot.sort(function(a,b){
        return a.distance > b.distance ? 1 : a.distance < b.distance ? -1 : 0;
    })
    hotel.spots.transport.sort(function(a,b){
        return a.distance > b.distance ? 1 : a.distance < b.distance ? -1 : 0;
    })
    if(hotel.spots.transport){
        for (var i = 0; i < hotel.spots.transport.length; i++) {
            let trans = hotel.spots.transport[i];
            if(hotel.spots.transport_after[trans.id]){
                hotel.spots.transport_after[trans.id].line.push(trans.line)
                if(db.spots[trans.id].hotels.transport.distance>trans.distance){
                    db.spots[trans.id].hotels.transport[hotelID] = [{"hid":hotelID,"distance":trans.distance}]
                }
            }else{
                hotel.spots.transport_after[trans.id] = {"distance":trans.distance,"line":[trans.line]};
                db.spots[trans.id].hotels.transport[hotelID] = [{"hid":hotelID,"distance":trans.distance}]
            }
        }
    }
    hotel.spots.transport = hotel.spots.transport_after;
    delete hotel.spots.transport_after
}
