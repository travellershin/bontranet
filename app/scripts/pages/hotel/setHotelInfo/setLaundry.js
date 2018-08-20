import Config from "../config.js";

var SetLaundry = {
    statistic:{nearest:[]},

    init: function(data, cityName){
        this.data = data;
        this.cityName = cityName;
        this.first_setLaundry();
        this.second_makeScore();
        this.third_wording();
    },

    third_wording: function(){
        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var laundry = hotel.local.laundry;

            if(laundry){
                let dif = difToMin(laundry.nearest.dif);
                hotel.assessment.word.laundry = `숙소에서 도보 ${dif} 거리에 세탁소가 있음`;
            }else{
                hotel.assessment.word.laundry = '숙소 도보 10분거리 이내에 세탁소는 존재하지 않아 긴 여행시 불편할 수 있음';
            }
        }
    },

    second_makeScore: function(){
        let scoreArray = [];

        for (let hid in this.data.hotels) {
            let hotel = this.data.hotels[hid];
            let laundry = hotel.local.laundry;

            if(laundry){
                let score = (500 - laundry.nearest.dif);
                scoreArray.push({hid:hid,score:score});
            }
        }

        scoreArray.sort((a, b) => b.score - a.score);

        var total = scoreArray.length;

        var rankSys = Config.laundry.score.percentile;

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
                    hotel.assessment.score.laundry = score;
                }else{
                    hotel.assessment.score = {laundry:score};
                }
            }else{
                hotel.assessment = {
                    score:{laundry:score},
                    word:{laundry:""}
                };
            }
        }

        for (let hid in this.data.hotels) {
            let hotel = this.data.hotels[hid];
            let laundry = hotel.local.laundry;

            if(!laundry){
                if(hotel.assessment){
                    if(hotel.assessment.score){
                        hotel.assessment.score.laundry = 5;
                    }else{
                        hotel.assessment.score = {laundry:5};
                    }
                }else{
                    hotel.assessment = {
                        score:{laundry:5},
                        word:{laundry:""}
                    };
                }
            }
        }
    },

    first_setLaundry: function(){
        for (var hid in this.data.hotels) {
            let hotel = this.data.hotels[hid];
            if(hotel.local){
                hotel.local.laundry = {
                    nearest:{dif:Config.laundry.nearStd}
                };
            }

            var ldArr = this.data.local.laundry;
            let hasLD = false;

            for (let i = 0; i < ldArr.length; i++) {
                let laundry = ldArr[i];
                let dif = calculateDif(hotel.coor, laundry.coor);

                if(dif<Config.laundry.nearStd){
                    hasLD = true;
                    var laundry_c = {
                        coor:laundry.coor,
                        name:laundry.name,
                        dif:dif.toFixed(0)*1
                    };
                    if(dif<hotel.local.laundry.nearest.dif){
                        hotel.local.laundry.nearest = laundry_c;
                    }
                }
            }
            if(!hasLD){
                hotel.local.laundry = false;
            }else{
                this.statistic.nearest.push(hotel.local.laundry.nearest.dif);
            }
        }
    }
};

export default SetLaundry;