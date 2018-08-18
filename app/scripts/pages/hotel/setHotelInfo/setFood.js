import GeoCode from "../../../modules/geoCode.js";
import Config from "../config.js";

var SetFood = {
    data:{},

    statistic:{
        nearest:[],
        nearby:[]
    },
    byArea:{},

    init: function(data, cid){
        this.data = data;
        console.log(this.data);
        if(this.first_geoCode(cid)){    //지오코딩 할 게 없으면 second부터 진행함
            this.second_setFood();  //숙소별로 식료품점들을 때려넣음
            this.third_byAreas(); //통계값을 만들어냄
            this.fourth_makeStats(); //통계값을 만들어냄 - cid/stat/local/food 라고 들어갈것임
            this.fifth_makeScore();
            this.sixth_wording();
        }
    },
    sixth_wording: function(){
        //!todo!!! 지금은 뉴욕 기준으로 되어있음 -> 도시별로 나누기(예-편의점 있는 도시용)

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var txt = '';

            if(hotel.local){
                if(hotel.local.food){
                    var food = hotel.local.food;
                    if(food.grocery){
                        if(food.large){ //둘 다 있는 케이스
                            let dif = difToMin(food.large.nearest.dif);
                            let josa = food.large.nearest.josa;
                            let name = food.large.nearest.name;
                            if(food.large.nearest.dif < food.grocery.nearest.dif + 50){
                                txt = `각종 식료품을 살 수 있는 대형 마트인 ${name}${josa} 도보 ${dif} 거리에 있음`;
                            }else{
                                var gdif = difToMin(food.grocery.nearest.dif);
                                txt = `간단한 먹거리를 살 수 있는 식료품점이 도보 ${gdif} 거리에 있고, 각종 음식들을 살 수 있는 대형 마트 ${name}${josa} 도보 ${dif} 거리에 있음`;
                            }
                        }else{  //grocery만 있는 케이스
                            let dif = difToMin(food.grocery.nearest.dif);
                            txt = `간단한 먹거리를 살 수 있는 식료품점이 도보 ${dif} 거리에 있음`;
                        }
                    }else if(food.large){ ///주변에 grocery는 없는데 large만 있는 특이케이스
                        let dif = difToMin(food.large.nearest.dif);
                        let name = food.large.nearest.name;
                        let josa = food.large.nearest.josa;
                        txt = `각종 식료품을 살 수 있는 대형 마트 ${name}${josa} 도보 ${dif} 거리에 있음`;
                    }
                }else{
                    txt = '식료품을 살 만한 곳은 주변 5분거리 이내에 없음';
                }
            }else{
                txt = '식료품을 살 만한 곳은 주변 5분거리 이내에 없음';
            }

            if(hotel.assessment.word){
                hotel.assessment.word.food = txt;
            }else{
                hotel.assessment.word = {food:txt};
            }
        }
    },

    fifth_makeScore: function(){
        var scoreArray = [];
        for (let hid in this.data.hotels) {
            let hotel = this.data.hotels[hid];
            let score = 0;
            if(hotel.local){
                if(hotel.local.food){
                    for (var kind in hotel.local.food) {
                        var food = hotel.local.food[kind];
                        var nearestDif = food.nearest.dif;
                        
                        score += (Config.food.kind[kind].std - nearestDif);
                        if(Config.food.kind[kind].multiple){
                            score = score * Config.food.kind[kind].multiple;
                        }
                        score += food.nearby*2;
                    }
                }
            }
            scoreArray.push({score:score,hid:hid});
        }
        scoreArray.sort((a, b) => b.score - a.score); //높을수록 좋음

        var total = scoreArray.length;

        var rankSys = Config.food.score.percentile;

        for (let i = 0; i < scoreArray.length; i++) {
            let hid = scoreArray[i].hid;
            let score = 0;
            var rank = (i / total); // 백분위
            var percentile = 0;

            var isRanked = false;

            for (let j = 0; j < rankSys.length; j++) {
                if(!isRanked){
                    var minus = percentile;
                    percentile += rankSys[j];

                    if(rank<percentile){  //35% 안에 들면
                        rank -= minus;   //rank를 0~0.2로 맞춰줌
                        score = (9-j) + Math.floor((rank/rankSys[j])*10)/10; //rank(0~0.2)를 0.2로 나눈값*10/10 -> 0~0.9가 나옴
                        isRanked = true;
                    }
                }
            }

            let hotel = this.data.hotels[hid];

            if(hotel.assessment){
                if(hotel.assessment.score){
                    hotel.assessment.score.food = score;
                }else{
                    hotel.assessment.score = {food:score};
                }
            }else{
                hotel.assessment = {
                    score:{food:score},
                    word:{food:""}
                };
            }
        }
    },

    fourth_makeStats: function(){
        var stat = {
            nearest: 0,
            nearby:0
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
                this.data.stat.local.food = stat;
            }else{
                this.data.stat.local = {
                    food: stat
                };
            }
        }else{
            this.data.stat = {
                local:{food:stat}
            };
        }
    },

    third_byAreas: function(){
        var area = this.data.area;

        for (let i = 0; i < area.length; i++) {
            var sum = 0;

            if(!area[i].notArea){
                if(this.byArea[i]){
                    var foods = this.byArea[i];

                    for (let j = 0; j < foods.length; j++) {
                        sum += foods[j];
                    }
                    var minus = 0;
                    if(foods.length < 10){
                        minus = -1;
                    }
                    foods = (sum/(foods.length) + foods.length/10) + minus;
                    if(area[i].local){
                        area[i].local.food = foods.toFixed(2)*1;
                    }else{
                        area[i].local = {
                            food: foods.toFixed(2)*1
                        };
                    }
                }else{
                    if(area[i].local){
                        area[i].local.food = 0;
                    }else{
                        area[i].local = {
                            food: 0
                        };
                    }
                }
            }
        }
    },

    second_setFood: function(){
        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var isSomeFood = false;

            for (let type in this.data.local.food) {
                var groArr = this.data.local.food[type];
                var std = Config.food.kind[type].std;

                for (let i = 0; i < groArr.length; i++) {
                    var food = groArr[i];
                    var dif = calculateDif(hotel.coor, food.coor);

                    if(dif<std){
                        isSomeFood = true;
                        food.dif = dif;
                        food.type = type;

                        if(hotel.temp){
                            if(hotel.temp.food){
                                if(hotel.temp.food[type]){
                                    hotel.temp.food[type].push(food);
                                }else{
                                    hotel.temp.food[type] = [food];
                                }
                            }else{
                                hotel.temp.food = {};
                                hotel.temp.food[type] = [food];
                            }
                        }else{
                            hotel.temp = {
                                food:{}
                            };
                            hotel.temp.food[type] = [food];
                        }
                    }
                }
            }

            if(!isSomeFood){
                hotel.temp.food = false;
            }else{
                var nearby = 0;
                var nearest = {dif:999};

                for (let type in hotel.temp.food) {
                    hotel.temp.food[type].sort((a, b) => a.dif - b.dif);
                    
                    var foodArr = [];
                    for (let i = 0; i <  hotel.temp.food[type].length; i++) {
                        let copy = $.extend(true,{},hotel.temp.food[type][i]);
                        foodArr.push(copy);
                    }

                    nearby += foodArr.length;

                    if(foodArr[0].dif < nearest.dif){
                        nearest = foodArr[0];
                    }

                    if(foodArr.length>5){
                        foodArr.length = 5;
                    }

                    if(hotel.local){
                        if(hotel.local.food){
                            hotel.local.food[type] = {
                                nearby: hotel.temp.food[type].length,
                                near5: foodArr,
                                nearest: foodArr[0]
                            };
                        }else{
                            hotel.local.food = {};
                            hotel.local.food[type] = {
                                nearby: hotel.temp.food[type].length,
                                near5: foodArr,
                                nearest: foodArr[0]
                            };
                        }
                    }else{
                        hotel.local = {food:{}};
                        hotel.local.local.food[type] = {
                            nearby: hotel.temp.food[type].length,
                            near5: foodArr,
                            nearest: foodArr[0]
                        };
                    }
                }

                if(this.byArea[hotel.area]){//지역별 food 밀집도를 확인하는 그런 녀석
                    this.byArea[hotel.area].push(nearby);
                }else{
                    this.byArea[hotel.area] = [nearby];
                }

                this.statistic.nearest.push(nearest.dif);
                this.statistic.nearby.push(nearby);
            }
        }
    },

    first_geoCode: function(cid){
        var groArr = this.data.local.food.grocery;
        var geoArr = [];
        var isGeoNeeded = false;

        for (let i = 0; i < groArr.length; i++) {
            var grocery = groArr[i];
            if(!grocery.coor){
                geoArr.push({address:grocery.address, aid:i});
                isGeoNeeded = true;
            }else{
                if(!grocery.coor.lat){
                    geoArr.push({address:grocery.address, aid:i});
                    isGeoNeeded = true;
                }
            }
        }
        if(isGeoNeeded){
            var ref = "cities/"+cid+"/local/food/grocery";
            GeoCode.init(geoArr, ref);
            return false;
        }else{
            return true;
        }
    }
};

export default SetFood;