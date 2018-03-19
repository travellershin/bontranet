let Hotels = {

    conv: function(db){
        let grocery = db.local.grocery;
        let min = 0;

        for (let no in db.hotel) {
            let hotel = db.hotel[no];
            let m150 = 0;
            hotel.grocery = [];

            for (let i = 0; i < grocery.length; i++) {
                let latDif = Math.pow((hotel.coor.lat - grocery[i].lat)*111034,2);
                let lngDif = Math.pow((hotel.coor.lng - grocery[i].lng) * 85397, 2);
                let dif = Math.round(Math.sqrt(latDif+lngDif))

                if(dif<150){
                    m150++
                }
                hotel.grocery.push(dif);
            }
            hotel.grocery.sort(function(a, b){return a-b});
            hotel.gro = {nearest:hotel.grocery[0],within:m150};

            //firebase.database().ref("ny/hotel/"+no+"/local/grocery").set(hotel.gro)
        }
        console.log(db.hotel);
    },

    metro: function(db){
        let metro = db.metro
        for (let no in db.hotel) {
            let hotel = db.hotel[no];
            hotel.metro = [];

            for (let i = 0; i < 473; i++) {
                let metroName = metro[i][0];
                let latDif = Math.pow((hotel.coor.lat - metro[i][1][1])*111034,2);
                let lngDif = Math.pow((hotel.coor.lng - metro[i][1][0]) * 85397, 2);
                let dif = Math.round(Math.sqrt(latDif+lngDif))

                if(dif<500){
                    for (let k = 0; k < metro[i][2].length; k++) {
                        if (metro[i][2][k].length > 2){
                            metro[i][2].splice(k,1)
                        }
                    }
                    console.log(hotel.name.ko + " 호텔은 " + metroName + " 지하철역에서 " + dif + "m 떨어져있다. - " + metro[i][2] + "호선");

                    hotel.metro.push({
                        name: metroName,
                        distance: dif,
                        line: metro[i][2]
                    })
                }
            }
            //메트로정보 업데이트
            //firebase.database().ref("ny/hotel/"+no+"/metro").set(hotel.metro);
        }
    }
}

export default Hotels;
