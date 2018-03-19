//spot을 40.1442,-70.123 형태 인자로 받는다.
function findMetro(lat, lng){
    let metroInfo = []

    for (let i = 0; i < 473; i++) {
        let metroName = db.metro[i][0];
        let latDif = Math.pow((lat - db.metro[i][1][1])*111034,2);
        let lngDif = Math.pow((lng - db.metro[i][1][0]) * 85397, 2);
        let dif = Math.round(Math.sqrt(latDif+lngDif))

        if(dif<700){
            for (let k = 0; k < db.metro[i][2].length; k++) {
                if (db.metro[i][2][k].length > 2){
                    db.metro[i][2].splice(k,1)
                }
            }
            console.log("확인하려는 관광지는 " + metroName + " 지하철역에서 " + dif + "m 떨어져있다. - " + db.metro[i][2] + "호선");
            console.log(i)
            metroInfo.push({
                name: metroName,
                distance: dif,
                line: db.metro[i][2]
            })
        }
    }
    //아래는 파이어베이스에 메트로 정보를 업데이트하기위한 그런거
    //firebase.database().ref("ny/spots/"+j+"/metro").set(db.spots[j].metro);
}
