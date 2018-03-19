function fsadsade(){
    for (var hotel in db.hotel) {
        if(db.hotel[hotel].area === 0 || db.hotel[hotel].area === 6 ||db.hotel[hotel].area === 7 ||db.hotel[hotel].area === 8 ||db.hotel[hotel].area === 9){
            db.hotel[hotel].safe = 5;
        }else if(db.hotel[hotel].area === 1 || db.hotel[hotel].area === 2 ||db.hotel[hotel].area === 3){
            db.hotel[hotel].safe = 4.75
        }else if(db.hotel[hotel].area === 11){
            db.hotel[hotel].safe = 3.75
        }else{
            db.hotel[hotel].safe = 4.5
        }

        let within = 0;
        let min = 0;
        let sortArray = [];

        for (let i = 0; i < db.metro.length; i++) {
            let latDif = Math.pow((db.hotel[hotel].coor.lat - db.metro[i][1][1])*111034,2); //위도 변화하면 가중치값이 바뀌어야 함
            let lngDif = Math.pow((db.hotel[hotel].coor.lng - db.metro[i][1][0]) * 85397, 2);
            let dif = Math.round(Math.sqrt(latDif+lngDif))

            sortArray.push(dif);
        }
        sortArray.sort(function(a, b){return a-b});

        for (var i = 0; i < db.local.police.length; i++) {
            let latDif = Math.pow((db.hotel[hotel].coor.lat - db.local.police[i].lat)*111034,2); //위도 변화하면 가중치값이 바뀌어야 함
            let lngDif = Math.pow((db.hotel[hotel].coor.lng - db.local.police[i].lng) * 85397, 2);
            let dif = Math.round(Math.sqrt(latDif+lngDif))

            if(dif<350){
                db.hotel[hotel].safe += (350-dif)/250;
            }
        }

        for (var i = 0; i < db.spots.length; i++) {
            let latDif = Math.pow((db.hotel[hotel].coor.lat - db.spots[i].coor.lat)*111034,2); //위도 변화하면 가중치값이 바뀌어야 함
            let lngDif = Math.pow((db.hotel[hotel].coor.lng - db.spots[i].coor.lng) * 85397, 2);
            let dif = Math.round(Math.sqrt(latDif+lngDif))

            if(dif<120){
                db.hotel[hotel].safe += (250-dif)/300;
                console.log(db.hotel[hotel].name.ko + " 숙소는 "+db.spots[i].name+"에서 "+dif+"m 거리라 치안 점수가 "+Math.round((250-dif)/3)/100 +"만큼 보정되었습니다.")
            }
        }
        db.hotel[hotel].safe -= sortArray[0]/800

        firebase.database().ref("ny/hotel/"+hotel+"/safety").set(db.hotel[hotel].safe);
    }
    console.log(db)
}
