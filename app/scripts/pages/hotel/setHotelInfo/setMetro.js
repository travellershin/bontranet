import Config from "../config.js";

var SetMetro = {
    statistic:{nearest:[]},

    init: function(data, cityName){
        this.data = data;
        this.cityName = cityName;
        this.first_setMetro(); //숙소별로 지하철을 때려넣음
        this.second_byAreas();
        this.third_makeScore();
        this.fourth_wording();
    },

    fourth_wording: function(){
        
        var cityName = this.cityName;
        var totalLine = Object.keys(this.data.metroLine).length;

        for (var hid in this.data.hotels) {
            let hotel = this.data.hotels[hid];
            let txtArr = [];

            let metro = hotel.local.metro;
            if(metro){
                var nearestDif = difToMin(metro.nearest.dif);
                var nearestStn = metro.nearest.name;
                var lineNo = Object.keys(metro.byLine).length;
                var spotNo = Object.keys(metro.spot).length;
                var score = hotel.assessment.score.transport;
                var avgTime = difToMin(metro.avgDif);
                txtArr.push(`숙소에서 가장 가까운 지하철역은 도보 ${nearestDif} 거리의 ${nearestStn}역`);
                txtArr.push(`도보 10분거리 이내에 ${totalLine}개의 ${cityName} 전체 지하철 노선 중 ${lineNo}개 노선이 지남`);
                txtArr.push(`${cityName} 100대 관광지 중 ${spotNo}개를 지하철 환승 없이 평균 ${avgTime}의 도보 이동으로 방문 가능`);
                if(score>8.9){
                    txtArr.push('지하철을 이용해 관광하기 매우 편리한 대중교통의 최고 요지에 위치함');
                }else if(score>7.9){
                    txtArr.push('지하철을 이용해 관광하기 편리한 대중교통의 요지에 위치함');
                }else if(score>6.9){
                    txtArr.push('지하철을 이용해 관광하기 나쁘지 않은 위치에 있음');
                }else if(score>5.9){
                    txtArr.push('지하철을 이용해 관광하기에 아주 좋은 위치는 아님');
                }else{
                    txtArr.push('대중교통 편의성은 약간 낮은 편으로, 관광이 조금 불편할 수 있음');
                }
            }else{
                hotel.assessment.score.transport = 4;
                txtArr = ["이 숙소 도보 15분 이내 거리에 지하철 역이 없어서 대중교통을 이용하기 불편할 수 있음"];
            }
            hotel.assessment.word.transport = txtArr;
        }
    },

    third_makeScore: function(){
        var scoreArray = [];
        //1개 관광지를 갈 수 있을 때마다 1800 - dif합계(호텔에서, 내려서)점만큼 추가

        for (var hid in this.data.hotels) {
            let hotel = this.data.hotels[hid];
            let metro = hotel.local.metro;
            let spots = this.data.spots.ranked;
            let score = 0;
            let metroLineObj = this.data.metroLine;
            let spotObj = {};

            if(metro){
                metro.spot = [];
                for (let lineName in metro.byLine) {
                    let line = metro.byLine[lineName];
                    let difHotel = line.dif;
                    for (let i = 0; i < metroLineObj[lineName].spot.length; i++) {
                        let spot = metroLineObj[lineName].spot[i];
                        let difSpot = spot.dif;
                        if(spotObj[spot.rank]){
                            if(difSpot + difHotel < spotObj[spot.rank].dif){
                                spotObj[spot.rank] = {dif: (difSpot + difHotel), line:lineName};
                            }
                        }else{
                            spotObj[spot.rank] = {dif: (difSpot + difHotel), line:lineName};
                        }
                    }
                }
                var avg = 0;

                for (let rank in spotObj) {
                    score += (1800 - spotObj[rank].dif);
                    avg += spotObj[rank].dif;
                    let hotelSpot = {
                        coor: spots[rank].coor,
                        line: spotObj[rank].line,
                        name:spots[rank].name,
                        spotMetroName:spots[rank].metroInfo[spotObj[rank].line].name,
                        rank:rank
                    };
                    metro.spot.push(hotelSpot);
                }
                avg = Math.round((avg / Object.keys(spotObj).length));
                metro.avgDiftoSpot = avg;
                scoreArray.push({hid:hid,score:score});
            }

        }

        scoreArray.sort((a, b) => b.score - a.score);

        var total = scoreArray.length;

        var rankSys = Config.metro.score.percentile;

        for (let i = 0; i < scoreArray.length; i++) {
            let hid = scoreArray[i].hid;
            let score = 0;
            let rank = ((i+1) / total); // 백분위 - 0~1 (높을수록 0에 가까움)
            var percentile = 0;

            var isRanked = false;

            for (let j = 0; j < rankSys.length; j++) {
                if(!isRanked){
                    var minus = percentile;
                    percentile += rankSys[j];

                    if(rank<percentile){  //35% 안에 들면
                        rank -= minus;   //rank를 0~0.2로 맞춰줌
                        score = (10-j) - Math.ceil((rank/rankSys[j])*10)/10; //rank(0~0.2)를 0.2로 나눈값*10/10 -> 0~0.9가 나옴
                        isRanked = true;
                    }
                }
            }

            let hotel = this.data.hotels[hid];

            if(hotel.assessment){
                if(hotel.assessment.score){
                    hotel.assessment.score.transport = score;
                }else{
                    hotel.assessment.score = {transport:score};
                }
            }else{
                hotel.assessment = {
                    score:{transport:score},
                    word:{transport:""}
                };
            }
        }
    },

    second_byAreas: function(){
        //다른 local들과는 달리 지하철 역을 Area별로 나눔 - 지역별로 어떤 노선들이 지나가는지 체크;
        let areaArr = this.data.area;
        let metroArr = this.data.local.metro;
        
        for (let i = 0; i < areaArr.length; i++) {
            let area = areaArr[i];
            if(!area.notArea){
                for (let j = 0; j < metroArr.length; j++) {
                    let metro = metroArr[j];
                    if(isInArea(metro.coor, area.coor)){
                        for (let k = 0; k < metro.line.length; k++) {
                            var line = metro.line[k];

                            if(area.local){
                                if(area.local.metro){
                                    if(area.local.metro[line]){
                                        area.local.metro[line] ++;
                                    }else{
                                        area.local.metro[line] = 1;
                                    }
                                }else{
                                    area.local.metro = {};
                                    area.local.metro[line] = 1;
                                }
                            }else{
                                area.local = {metro:{}};
                                area.local.metro[line] = 1;
                            }
                        }
                    }
                }
            }
        }
    },

    first_setMetro: function(){
        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            if(hotel.local){
                hotel.local.metro = {
                    nearest:{dif:Config.metro.nearStd},
                    near:[],
                    byLine:{}
                };
            }

            var metroArr = this.data.local.metro;
            var byLine = hotel.local.metro.byLine;
            let hasMetro = false;

            for (let i = 0; i < metroArr.length; i++) {
                var metro = metroArr[i];
                var dif = calculateDif(hotel.coor, metro.coor);

                if(dif<Config.metro.nearStd){
                    hasMetro = true;
                    var metro_c = {
                        coor:metro.coor,
                        line:metro.line,
                        name:metro.name,
                        dif:dif.toFixed(0)*1
                    };
                    hotel.local.metro.near.push(metro_c);

                    if(dif<hotel.local.metro.nearest.dif){
                        hotel.local.metro.nearest = metro_c;
                    }

                    for (let j = 0; j < metro.line.length; j++) {
                        var line = metro.line[j];

                        if(byLine[line]){
                            if(byLine[line].dif > metro_c.dif){
                                byLine[line] = metro_c;
                            }
                        }else{
                            byLine[line] = metro_c;
                        }
                    }
                }
            }

            if(hasMetro){
                this.statistic.nearest.push(hotel.local.metro.nearest.dif);
            }else{
                hotel.local.metro = false;
            }

            
        }
    }
};

export default SetMetro;