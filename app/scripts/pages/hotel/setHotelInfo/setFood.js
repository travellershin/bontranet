import GeoCode from "../../../modules/geoCode.js";
import Config from "../config.js";

var SetFood = {
    data:{},

    statistic:{
        nearest:[],
        in250:[]
    },
    byArea:{},

    init: function(data, cid){
        this.data = data;
        if(this.first_geoCode(cid)){    //지오코딩 할 게 없으면 second부터 진행함
            this.second_setFood();  //숙소별로 식료품점들을 때려넣음
            this.third_byAreas(); //통계값을 만들어냄
            this.fourth_makeStats(); //통계값을 만들어냄 - cid/stat/local/food 라고 들어갈것임
            this.fifth_makeRank();

            console.log(this.data)
        }
    },

    fifth_makeRank: function(){

        this.statistic.nearest.sort((a, b) => a - b);
        this.statistic.in250.sort((a, b) => b - a);

        var total = Object.keys(this.data.hotels).length;

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];

            //todo:!!!! food는 종류가 여러가지 있기 때문에 key값별로 줘야 함. Score에서는 large 근처에 있는 녀석만 9점이상을 주는게 좋을듯

            // var food = hotel.local.food;
            // var rank = {
            //     nearest: total,
            //     in250: total
            // };

            // for (var key in rank) {
            //     if(key === "in250"){
            //         if(food[key]){
            //             rank[key] = this.statistic[key].indexOf(food[key])+1;
            //         }
            //     }else{
            //         if(food[key]){
            //             rank[key] = this.statistic[key].indexOf(food[key].dif)+1;
            //         }
            //     }
                
            // }
            // if(hotel.rank){
            //     hotel.rank.food = rank;
            // }else{
            //     hotel.rank = {food:rank};
            // }

        }
    },

    fourth_makeStats: function(){
        var stat = {
            nearest: 0,
            in250:0
        }

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

            for (var type in this.data.local.food) {
                var groArr = this.data.local.food[type];
                var std = Config.food.nearStd;

                for (let i = 0; i < groArr.length; i++) {
                    var food = groArr[i];
                    var dif = calculateDif(hotel.coor, food.coor);

                    if(dif<std[type]){
                        isSomeFood = true;
                        food.dif = dif;

                        if(hotel.local){
                            if(hotel.local.food){
                                if(hotel.local.food[type]){
                                    hotel.local.food[type].push(food);
                                }else{
                                    hotel.local.food[type] = [food];
                                }
                            }else{
                                hotel.local.food = {};
                                hotel.local.food[type] = [food];
                            }
                        }else{
                            hotel.local = {
                                food:{}
                            };
                            hotel.local.food[type] = [food];
                        }
                    }
                }
            }

            if(!isSomeFood){
                hotel.local.food = false;
            }else{

                for (var type in hotel.local.food) {
                    if(type !== "large"){
                        hotel.local.food[type].sort((a, b) => a.dif - b.dif);
                        var deepArr = [];

                        for (let i = 0; i < hotel.local.food[type].length; i++) {  //깊은 복사를 반드시 해야함
                            var hotelObj = hotel.local.food[type][i];

                            var deep = {
                                address: hotelObj.address,
                                coor:{
                                    lat: hotelObj.coor.lat,
                                    lng: hotelObj.coor.lng
                                },
                                dif:hotelObj.dif,
                                name:hotelObj.name
                            }
                            deepArr.push(deep)
                        }

                        var in250 = deepArr.length;
                        this.statistic.nearest.push(deepArr[0].dif);
                        this.statistic.in250.push(in250);

                        if(this.byArea[hotel.area]){//지역별 food 밀집도를 확인하는 그런 녀석
                            this.byArea[hotel.area].push(in250);
                        }else{
                            this.byArea[hotel.area] = [in250];
                        }
                        

                        if(deepArr.length>5){
                            deepArr.length = 5;
                        }

                        this.data.hotels[hid].local.food[type] = {
                            in250: hotel.local.food[type].length,
                            near5: deepArr,
                            nearest: deepArr[0]
                        };

                    }
                }
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
            var ref = "cities/"+cid+"/local/food/grocery"
            GeoCode.init(geoArr, ref);
            return false;
        }else{
            return true;
        }
    }
};

export default SetFood;