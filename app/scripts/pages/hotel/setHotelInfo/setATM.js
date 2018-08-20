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
        this.fifth_makeScore();
        this.sixth_wording();
    },

    first_byHotels: function(){
        var hotels = this.data.hotels;

        for (const hid in hotels) {
            var hotel = hotels[hid];
            if (hotel.temp.atm) {
                var atmArr = hotel.temp.atm;
                var atmObj = {
                    nearest: {dif:2000},
                    in130: 0,
                };

                for (var i = 0; i < atmArr.length; i++) {
                    var atm = atmArr[i];
                    var dif = calculateDif(atm.coor, hotel.coor);

                    if (dif < 130.1) { //숙소별 130m거리 atm 갯수 체크
                        atmObj.in130++;
                    }

                    if (!atmObj.bank24) {//기본적으로 거리순 정렬 되어있어서 이미 들어가있으면 그놈이 더 가까운놈
                        if (dif < atmObj.nearest.dif) { //숙소별 은행 소유 24시간 atm 담음
                            if ((atm.owner.includes("BANK")||atm.placeName.includes("BANK"))) {
                                atmObj.nearest = atm;
                                atmObj.nearest.dif = dif;
                                delete atmObj.nearest.score;
                            }
                        }
                    }
                }
                //통계에 기록하기

                this.statistic.nearest.push(atmObj.nearest.dif);


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

    fifth_makeScore: function(){

        var scoreArray = [];

        for (let hid in this.data.hotels) {
            let hotel = this.data.hotels[hid];
            var score = hotel.local.atm.nearest.dif;
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

    sixth_wording: function(){
        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var dif = difToMin(hotel.local.atm.nearest.dif);
            var txt = `가장 가까운 은행 소유 ATM은 도보 ${dif} 거리에 있음`;

            if(hotel.assessment.word){
                hotel.assessment.word.atm = txt;
            }else{
                hotel.assessment.word = {atm:txt};
            }
        }
    }
};

export default SetATM;