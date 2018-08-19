import Config from "../config.js";

var SetATM = {
    statistic: {
        nearest:[], //가장 가까운 ATM은 몇 m 거리에 있는지 도시 전체 평균을 내기 위한 데이터
        bank24:[],   //24시간 운영하는 은행 소유 거리에 있는지 도시 전체 평균을 내기 위한 데이터
        in130:[] //반경 130m 내에 ATM이 몇 개 있는지 도시 전체 평균을 내기 위한 데이터
    },
    byArea: {}, //in130 stat을 지역별로 평균내기 위한 객체

    data:{},

    init: function (data, cid) {
        this.data = data;

        this.first_byHotels(); //호텔들을 돌며 가장 가까운 ATM, 은행소유 24시간 ATM, 130m안에 몇 개 ATM 있는지를 찾아내고 통계에도 기록
        this.second_byAreas(); //지역별로 130m 내에 있는 ATM 갯수 평균을 냄 -> 지역 상업 발전도를 나중에 체크하기 위해 만들었음.
        this.third_makeStats(); //first에서 기록한 통계 내용을 가지고 통계값들을 산출해냄.
        this.fourth_makeRank(); //통계에 기록된 값을 바탕으로 호텔별 atm편의성 랭킹을 계산함(예-ATM가까운 정도는 뉴욕 내 7위...)
        this.fifth_makeScore();
        this.sixth_wording();
    },

    first_byHotels: function(){
        var hotels = this.data.hotels;

        for (const hid in hotels) {
            var hotel = hotels[hid];
            if (hotel.temp) { //hotel.temp로 바꿀것임
                var atmArr = hotel.temp.atm;
                var atmObj = {
                    nearest: atmArr[0],
                    in130: 0,
                    bank24: false
                };

                atmObj.nearest.dif = calculateDif(atmArr[0].coor, hotel.coor); //숙소별 가장 가까운 atm 담음

                if (atmArr) {
                    for (var i = 0; i < atmArr.length; i++) {
                        var atm = atmArr[i];
                        var dif = calculateDif(atm.coor, hotel.coor);

                        if (dif < 130.1) { //숙소별 130m거리 atm 갯수 체크
                            atmObj.in130++;
                        }

                        if (!atmObj.bank24) {//기본적으로 거리순 정렬 되어있어서 이미 들어가있으면 그놈이 더 가까운놈
                            if (dif < 230) { //숙소별 은행 소유 24시간 atm 담음
                                if ((atm.owner.includes("BANK")||atm.placeName.includes("BANK")) && atm.is24) {
                                    atmObj.bank24 = atm;
                                    atmObj.bank24.dif = dif;
                                }
                            }
                        }
                    }
                    //통계에 기록하기

                    this.statistic.nearest.push(atmObj.nearest.dif);
                    if (atmObj.bank24) {
                        this.statistic.bank24.push(atmObj.bank24.dif);
                    } else {
                        this.statistic.bank24.push(230);
                    }

                } else {
                    errNo++;
                }
                if(hotel.local){
                    hotel.local.atm = atmObj;
                }else{
                    hotel.local = {atm: atmObj};
                }

                //in130은 호텔을 한 번 다 돈 다음에 통계에 기록할 수 있음
                this.statistic.in130.push(atmObj.in130);

                if(this.byArea[hotel.area]){//지역별 atm 밀집도를 확인하는 그런 녀석
                    this.byArea[hotel.area].push(atmObj.in130);
                }else{
                    this.byArea[hotel.area] = [atmObj.in130];
                }

            } else {
                toast(`VISA ATM 정보가 없는 호텔이 있습니다. 확인 후 재시도해주세요`);
                return false;
            }
        }
    },

    second_byAreas: function(){
        var area = this.data.area;

        for (let i = 0; i < area.length; i++) {
            var sum = 0;

            if(!area[i].notArea){
                if(this.byArea[i]){
                    var atms = this.byArea[i];

                    for (let j = 0; j < atms.length; j++) {
                        sum += atms[j];
                    }
                    var minus = 0;
                    if(atms.length < 10){
                        minus = -1;
                    }
                    atms = (sum/(atms.length) + atms.length/10) + minus;
                    if(area[i].local){
                        area[i].local.atm = atms.toFixed(2)*1;
                    }else{
                        area[i].local = {
                            atm: atms.toFixed(2)*1
                        };
                    }
                }else{
                    if(area[i].local){
                        area[i].local.atm = 0;
                    }else{
                        area[i].local = {
                            atm: 0
                        };
                    }
                }
            }
        }
    },

    third_makeStats: function(){
        var stat = {
            nearest: 0,
            in130: 0,
            bank24: 0
        };

        for (var id in stat) {
            var sum = 0;
            for (let k = 0; k < this.statistic[id].length; k++) {
                sum += this.statistic[id][k];
            }
            stat[id] = sum/this.statistic[id].length;
            stat[id] = stat[id].toFixed(2)*1;
        }

        if(this.data.stat){
            if(this.data.stat.local){
                this.data.stat.local.atm = stat;
            }else{
                this.data.stat.local = {
                    atm: stat
                };
            }
        }else{
            this.data.stat = {
                local:{atm:stat}
            };
        }
    },

    fourth_makeRank: function(){

        this.statistic.nearest.sort((a, b) => a - b);
        this.statistic.bank24.sort((a, b) => a - b);
        this.statistic.in130.sort((a, b) => b - a);

        var total = Object.keys(this.data.hotels).length;

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var atm = hotel.local.atm;
            var rank = { //꼴지 랭크를 부여함 -> 혹시 hotel에 각 내용들이 없다면 랭크는 꼴찌
                bank24: total,
                nearest: total,
                in130: total
            };

            for (var key in rank) {
                if(key === "in130"){
                    if(atm[key]){
                        rank[key] = this.statistic[key].indexOf(atm[key])+1;
                    }
                }else{
                    if(atm[key]){
                        rank[key] = this.statistic[key].indexOf(atm[key].dif)+1;
                    }
                }
                
            }
            if(hotel.rank){
                hotel.rank.atm = rank;
            }else{
                hotel.rank = {atm:rank};
            }
        }
    },

    fifth_makeScore: function(){

        var scoreArray = [];

        for (let hid in this.data.hotels) {
            let hotel = this.data.hotels[hid];
            var atm = hotel.rank.atm;
            var weight = Config.atm.score.weight;
            let score = (atm.bank24*weight.bank24 + atm.nearest*weight.nearest + atm.in130*weight.in130);

            scoreArray.push({score:score,hid:hid});
        }
        scoreArray.sort((a, b) => a.score - b.score); //낮을수록 좋음


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

            let hotel = this.data.hotels[hid];

            if(hotel.assessment){
                if(hotel.assessment.score){
                    hotel.assessment.score.atm = score;
                }else{
                    hotel.assessment.score = {atm:score};
                }
            }else{
                hotel.assessment = {
                    score:{atm:score},
                    word:{atm:""}
                };
            }
        }
    },

    tfc: function(type, hotel){    //text from config

        var total = Object.keys(this.data.hotels).length;

        var rank = 0;
        if(type === "integrate"){
            rank = (hotel.rank.atm.bank24 / total);
        }else{
            rank = (hotel.rank.atm[type] / total);
        }

        var config = Config.atm.word;
        var txt = '';
        let inStd = false;

        for (let i = 0; i < config[type].std.length; i++) {   //n분 거리에 있다.
            if(!inStd){
                if(rank < config[type].std[i]){
                    txt += config[type].word[i];
                    inStd = true;
                }
            }
        }
        if(!inStd){
            txt += config[type].word[config[type].std.length];
        }

        return txt;
    },

    sixth_wording: function(){
        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var txt = '';
            var atm = hotel.local.atm;

            // 1. 가장 가까운 ATM이 24시간 영업하는 ATM이거나, 거리 차이가 50m 이내인 경우 -> 24시간 ATM 워딩으로 통합
            // 2. 1이 아닐 경우 가장 가까운 ATM은 도보 단 N분거리에 있고, 24시간 오픈 ATM도 도보로 N분거리에 있어서 ~
            // 3. 은행소유 24시간 ATM이 없는 경우 -> 가장 가까운 ATM은 도보 N분거리, 은행 소유 24시간 ATM은 없음

            if(atm.bank24){
                if(atm.bank24.dif < atm.nearest.dif + 50){ //시나리오1
                    let dif = difToMin(atm.bank24.dif);
                    txt = `24시간 영업하는 은행 소유 ATM이 ${dif}`;
                    txt += this.tfc('integrate', hotel);

                }else{ //시나리오 2
                    let dif = difToMin(atm.nearest.dif);
                    let dif24 = difToMin(atm.bank24.dif);
                    txt += `가장 가까운 ATM은 도보 ${dif} 거리에 있고, 은행이 소유한 24시간 오픈 ATM도 도보 ${dif24}`;
                    txt += this.tfc('nearest', hotel);
                }
            }else{
                let dif = difToMin(atm.nearest.dif);
                txt += `가장 가까운 ATM은 도보 ${dif} 거리에 있음.`;
            }


            if(hotel.assessment.word){
                hotel.assessment.word.atm = txt;
            }else{
                hotel.assessment.word = {atm:txt};
            }
        }
    }
};

export default SetATM;