let Data = {
    spotObj: {},
    //도시의 전체 스팟 데이터를 받아와 집어넣는다.
    metro: [],
    metroObj: {},
    metroScore:{},
    hotelObj:{},
    areaArray:[],
    //도시의 전체 메트로 데이터를 받아와 넣는다. Array 안에는 object로 coor(lat, lng obj), line(Array), name이 들어있다.

    init: function(data){
        //combined data를 받아서 작업들을 시작한다.
        this.spotObj = data.spots;

        this.hotelObj = data.hotels;
        this.metroObj = data.metro;
        this.metroScore = data.metroLine;
        this.areaArray = data.area;
        let cityCode = $(".cityName").attr("cid");

        this.hotel_data();
        this.area()

        // this.data_metro_process();
        //메트로 집어넣는 작업을 실시한다.

        // this.data_findbestMetro();
        //도시 내 최고의 메트로를 선정하자
    },

    area: function(){
        // console.log(this.areaArray)


        for (var hid in this.hotelObj) {
            // this.searchInPolygon(hid, map)
            
        }

    },

    searchInPolygon: function(hid, map){
        let label = 0

        let coor = new google.maps.LatLng(this.hotelObj[hid].coor.lat, this.hotelObj[hid].coor.lng)
        for (var i = 0; i < 25; i++) {
            let polygon = new google.maps.Polygon({
                paths: this.areaArray[i].coor
              });
            if(google.maps.geometry.poly.containsLocation(coor, polygon)){
                this.hotelObj[hid].area = i
            }
        }

    },


    hotel_data: function(){
        console.log(this.spotObj)
        console.log(this.hotelObj)
        console.log(this.metroObj)

        for (var hid in this.hotelObj) {
            let hotel = this.hotelObj[hid];



        }

    },

    data_findbestMetro: function(){
        let metroRankObj = {};
        let metroRankArray = [];
        console.log(this.spotObj)
        let spotRank = 0
        for (var sid in this.spotObj) {
            let spot = this.spotObj[sid];
            spotRank++;

            for (var line in spot.metroInfo) {
                let distance = spot.metroInfo[line].distance;

                if(metroRankObj[line]){
                    metroRankObj[line].score += (3000 - distance*2 - spotRank*3.5);
                    metroRankObj[line].spot.push({name: spot.name.ko, distance: distance});
                }else{
                    metroRankObj[line] = {
                        score: (3000 - distance*2 - spotRank*3.5),
                        spot:[{name: spot.name.ko, distance: distance}]
                    }
                }
            }
        }

        for (var line in metroRankObj) {
            metroRankObj[line].score = Math.round(metroRankObj[line].score/138)/10
            // TODO: 위의 값은 1위를 100으로 한 지수 형태기 때문에 138이라는 숫자는 도시에 맞게 변형해 쓸것
            metroRankArray.push({
                line:line,
                score:metroRankObj[line].score,
                spot:metroRankObj[line].spot
            })
        }

        metroRankArray.sort(function(a, b){
            return a.score > b.score ? -1 : a.score < b.score ? 1 : 0
        })

        // firebase.database().ref("nyc/metroLine").set(metroRankObj)

        console.log(metroRankArray)
        console.log(metroRankObj)
    },

    data_metro_process: function(){
        let that = this;
        let cityCode = $(".cityName").attr("cid");

        firebase.database().ref(cityCode+"/metro").once("value", snap => {
            let data = snap.val();

            that.metro = data;

            for (var sid in this.spotObj) {
                let spot = this.spotObj[sid];

                that.metro_process_findMetro(sid, spot.coor);
                if(spot.enterance){
                    for (var i = 0; i < spot.enterance.length; i++) {
                        that.metro_process_findMetro(sid, spot.enterance[i]);
                    }
                }
                //스팟 기본 위치와 enterance 모두에 대해 가장 가까운 메트로를 찾는다.
            }
            // firebase.database().ref(cityCode+"/spots/combined").update(this.spotObj);


            firebase.database().ref(cityCode+"/hotels").once("value", snap => {
                that.hotelObj = snap.val();

                for (var hid in that.hotelObj) {
                    that.hotel_process_findMetro(hid);
                }
                console.log(that.hotelObj)

                // firebase.database().ref("nyc/hotels").set(that.hotelObj)
            })

        })

    },

    hotel_process_findMetro: function(hid){
        let hotel = this.hotelObj[hid];
        let coor = hotel.coor
        console.log(coor)

        if(!hotel.metroInfo){
            hotel.metroInfo = {}
        }

        for (let i = 0, max = this.metro.length ; i < max; i++) {
            let metro = this.metro[i]
            let name = metro.name;

            let latDif = Math.pow((coor.lat - metro.coor.lat)*111034,2);
            let lngDif = Math.pow((coor.lng - metro.coor.lng) * 85397, 2);
            // TODO: 위도 경도에 따른 보정값은 도시마다 달라져야 한다.
            let dif = Math.round(Math.sqrt(latDif+lngDif))

            if(dif<700){
                // TODO: 700미터가 적절한 거리인지는 논의가 필요하다.

                for (let k = 0; k < metro.line.length; k++) {
                    if (metro.line[k].length === 1){
                    // TODO: 뉴욕 한정 - 익스프레스 라인을 제거하기 위한 것

                        let line = metro.line[k];
                        //라인명

                        if(hotel.metroInfo[line]){
                            if(hotel.metroInfo[line].distance > dif){
                                //이미 존재할 경우 새로 추가하려는 역이 원래보다 더 가까운 경우에만 추가

                                hotel.metroInfo[line] = {
                                    name: name,
                                    distance: dif,
                                    code: i
                                    // TODO: 지금은 metro Array 순서 자체를 코드로 사용하고 있다.
                                    //코드 체계를 어떻게 구성할지 생각이 필요할 것.
                                }
                            }
                        }else{
                            hotel.metroInfo[line] = {
                                name: name,
                                distance: dif,
                                code: i
                            }
                        }
                    }
                }
            }
        }
    },

    metro_process_findMetro: function(sid, coor){
        //스팟 코드와 좌표를 받아온다. 좌표는 enterance좌표, 스팟 자체 좌표 두 종류가 있기 때문에 따로 받아옴.
        let spot = this.spotObj[sid];

        if(!spot.metroInfo){
            spot.metroInfo = {}
        }

        for (let i = 0, max = this.metro.length ; i < max; i++) {
            let metro = this.metro[i]
            let name = metro.name;

            let latDif = Math.pow((coor.lat - metro.coor.lat)*111034,2);
            let lngDif = Math.pow((coor.lng - metro.coor.lng) * 85397, 2);
            // TODO: 위도 경도에 따른 보정값은 도시마다 달라져야 한다.
            let dif = Math.round(Math.sqrt(latDif+lngDif))

            if(dif<700){
                // TODO: 700미터가 적절한 거리인지는 논의가 필요하다.

                for (let k = 0; k < metro.line.length; k++) {
                    if (metro.line[k].length === 1){
                    // TODO: 뉴욕 한정 - 익스프레스 라인을 제거하기 위한 것

                        let line = metro.line[k];
                        //라인명

                        if(spot.metroInfo[line]){
                            if(spot.metroInfo[line].distance > dif){
                                //이미 존재할 경우 새로 추가하려는 역이 원래보다 더 가까운 경우에만 추가

                                spot.metroInfo[line] = {
                                    name: name,
                                    distance: dif,
                                    code: i
                                    // TODO: 지금은 metro Array 순서 자체를 코드로 사용하고 있다.
                                    //코드 체계를 어떻게 구성할지 생각이 필요할 것.
                                }
                            }
                        }else{
                            spot.metroInfo[line] = {
                                name: name,
                                distance: dif,
                                code: i
                            }
                        }
                    }
                }
            }
        }
    }
}

export default Data
