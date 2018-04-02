//전체 노선을 확인하고 어떤 노선이 가장 많은 관광지를 거치는지, 어떤 관광지는 어떤 노선으로 갈 수 있는지 반환한다

let lineArray = []
let popularLine = {}
for (var k = 0; k < db.spots.length; k++) {
    let spotOwnMetro = [];
    console.log(db.spots[k].name)

    //지하철로 접근 가능한 관광지만 지하철을 확인한다
    if(db.spots[k].metro){
        for (var i = 0; i < db.spots[k].metro.length; i++) {
            for (var j = 0; j < db.spots[k].metro[i].line.length; j++) {
                //모든 라인명에 대해 수행
                let lineName = db.spots[k].metro[i].line[j];
                if(spotOwnMetro.includes(lineName)){
                    console.log("중복")
                }else{
                    if(lineArray.includes(lineName)){
                        popularLine[lineName]++
                    }else{
                        lineArray.push(lineName);
                        popularLine[lineName] = 1
                    }
                    spotOwnMetro.push(lineName)
                }

            }
        }
    }
    //firebase.database().ref("ny/spots/"+k+"/ownMetro").set(spotOwnMetro)
}
console.log(popularLine)
