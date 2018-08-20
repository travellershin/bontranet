import Config from "../config.js";

var SetConvinience = {
    init: function(data, cityName){
        let scoreArray = [];
        for (var hid in data.hotels) {
            let hotel = data.hotels[hid];

            let score = 0;
            let word = [];

            for (var type in hotel.assessment.score) {
                if(type === "safety" || type === "transport"){

                }else{
                    let indiWord = hotel.assessment.word[type];
                    let indiScore = hotel.assessment.score[type];
                    word.push(indiWord);
                    score += indiScore;
                    delete hotel.assessment.score[type];
                    delete hotel.assessment.word[type];
                }
            }
            scoreArray.push({hid:hid,score:score});
            hotel.assessment.word.convinience = word;
        }

        scoreArray.sort((a, b) => b.score - a.score);

        var total = scoreArray.length;
        var rankSys = Config.atm.score.percentile;

        for (let i = 0; i < scoreArray.length; i++) {
            let hid = scoreArray[i].hid;
            let score = 0;
            var rank = ((i+1) / total); // 백분위
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
            hotel.assessment.score.convinience = score;
            
            if(score>9){
                hotel.assessment.word.convinience.push(`${cityName} 내 다른 숙소들 대비 주변 편의시설이 굉장히 잘 형성되어 편리하게 여행할 수 있음`);
            }else if(score>8){
                hotel.assessment.word.convinience.push(`${cityName} 내 다른 숙소들 대비 주변 편의시설이 잘 형성된 편이라 편리하게 여행할 수 있음`);
            }else if(score>7){
                hotel.assessment.word.convinience.push(`${cityName} 내에서 주변 편의시설은 평균 이상 정도로 잘 갖추어져 있음`);
            }else if(score>6){
                hotel.assessment.word.convinience.push(`${cityName} 내에서 주변 편의시설은 평균에서 약간 못 미치는 정도로 형성되어 있음`);
            }else if(score>5){
                hotel.assessment.word.convinience.push(`${cityName} 내 다른 숙소들 대비 주변 편의시설은 조금씩 거리가 있는 편`);
            }else{
                hotel.assessment.word.convinience.push(`${cityName} 내 다른 숙소들 대비 주변 편의시설들은 멀리 있는 편`);
            }
        }
    }
};

export default SetConvinience;