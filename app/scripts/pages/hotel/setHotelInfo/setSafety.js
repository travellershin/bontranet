import Config_Safety from "../config/safety.js";

var SetSafety = {
    init: function(data, cityName){
        console.log(data);
        this.first_fromArea(data, cityName);
    },

    first_fromArea: function(data, cityName){
        let scoreArray = [];

        let areas = data.area;
        let hotels = data.hotels;
        for (var hid in hotels) {
            let hotel = hotels[hid];
            hotel.assessment.word.safety = [];
            let word = hotel.assessment.word.safety;

            let score = 0;

            //AREA로 인한 치안
            let area = areas[hotel.area];
            score += area.safety.score*3;
            let config_word = Config_Safety.word[area.safety.score];
            if(area.safety.score>3&&area.safety.misdemeanor<3){
                config_word = Config_Safety.word[6];    //치안은 좋지만 경범죄율이 좀 높음
            }
            word.push(`${cityName}${config_word} ${area.name} 지역에 위치하고 있음`);

            //METRO로 인한 치안
            if(hotel.local.metro){
                let metro = hotel.local.metro;
                let dif = metro.nearest.dif;
                let min = difToMin(dif);
                let condif = Config_Safety.metDif;
                let noDif = true;

                for (let i = 0; i < condif.length; i++) {
                    let metDif = condif[i].std;
                    let metWord = condif[i].word;
                    if(noDif){
                        if(dif<(metDif*1)){
                            noDif = false;
                            score += condif[i].score;
                            word.push(`가장 가까운 지하철 역은 도보 ${min} 거리${metWord}`);
                        }
                    }
                }
            }

            //유동인구로 인한 치안
            let floatScore = hotel.assessment.score.transport + hotel.assessment.score.food + hotel.assessment.score.atm;
            let minSpotDif = 150;

            for (let i = 0; i < data.spots.ranked.length; i++) {
                let spot = data.spots.ranked[i];
                let dif = calculateDif(spot.coor, hotel.coor);
                if(dif<minSpotDif){
                    minSpotDif = dif;
                }
            }
            if(minSpotDif<50){
                floatScore += 3;
            }else if(minSpotDif<100){
                floatScore += 2;
            }else if(minSpotDif<150){
                floatScore += 1;
            }

            let float = Config_Safety.floating;
            let notYet = true;

            for (let i = 0; i < float.length; i++) {
                let std = float[i].std;
                let floatWord = float[i].word;
                if(notYet){
                    if(floatScore>std){
                        notYet = false;
                        score += float[i].score;
                        word.push(`${cityName}${floatWord}`);
                    }
                }
            }

            let final = Config_Safety.finalSafety;
            notYet = true;

            for (let i = 0; i < final.length; i++) {
                let std = final[i].std;
                let finalWord = final[i].word;
                if(notYet){
                    if(score>std){
                        notYet = false;
                        word.push(`${finalWord}`);
                    }
                }
            }
            scoreArray.push({hid:hid,score:score});
        }

        scoreArray.sort((a, b) => b.score - a.score);

        var total = scoreArray.length;

        var rankSys = Config_Safety.score.percentile;

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

            let hotel = data.hotels[hid];
            hotel.assessment.score.safety = score;
        }
    }
};

export default SetSafety;