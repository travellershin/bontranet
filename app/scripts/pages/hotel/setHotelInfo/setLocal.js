import Config_Local from "../config/local.js";

var SetLocal = {
    statistic:{},

    init: function (data, cid, kind) {
        this.data = data;
        this.kind = kind;

        this.s1_setHotels(); //호텔들을 돌며 로컬 데이터를 집어넣음;
        this.s2_byAreas();
        console.log(this.data);
    },

    s2_byAreas: function(){
        var area = this.data.area;

        for (let i = 0; i < area.length; i++) {
            if(!area[i].notArea){
                var sum = 0;

            }

            
        }
    },

    s1_setHotels: function(){
        var hotels = this.data.hotels;
        var kind = this.kind;

        var setHotel = function(arr, kind, type){
            for (var hid in hotels) {
                var hotel = hotels[hid];

                for (let i = 0; i < arr.length; i++) {
                    var obj = arr[i];
                    var dif = calculateDif(hotel.coor, obj.coor);

                    if(arguments.length === 2){
                        var std = Config_Local[kind].nearStd; //얼마나 가까워야 가까운걸로 인정하는지
                        if(dif<std){
                            obj.dif = dif;
                            if(hotel.temp){
                                if(hotel.temp[kind]){
                                    hotel.temp[kind].push(obj);
                                }else{
                                    hotel.temp[kind] = [obj];
                                }
                            }else{
                                hotel.temp = {};
                                hotel.temp[kind] = [obj];
                            }
                        }
                    
                    }else if(arguments.length === 3){
                        var std = Config_Local[kind].nearStd[type]; //얼마나 가까워야 가까운걸로 인정하는지
                        if(dif<std){
                            obj.dif = dif;
                            if(hotel.temp){
                                if(hotel.temp[kind]){
                                    if(hotel.temp[kind][type]){
                                        hotel.temp[kind][type].push(obj);
                                    }else{
                                        hotel.temp[kind][type] = [obj];
                                    }
                                }else{
                                    hotel.temp[kind] = {};
                                    hotel.temp[kind][type] = [obj];
                                }
                            }else{
                                hotel.temp = {};
                                hotel.temp[kind] = {};
                                hotel.temp[kind][type] = [obj];
                            }
                        }
                    }
                }


                if(arguments.length === 2){
                    hotel.temp[kind].sort((a, b) => a.dif - b.dif);

                }else if(arguments.length === 3){
                    hotel.temp[kind][type].sort((a, b) => a.dif - b.dif);
                }


            }
        }

        var local = this.data.local[kind];

        if(local){
            if(kind !== "atm"){ //atm은 숙소마다 이미 박혀있음
                if(kind === "metro"){ // metro는 별도의 하위 카테고리가 없음
                    setHotel(local, kind);
                }else{ // 하위 카테고리가 존재하는 나머지(food)
                    for (var type in local) {   // 하위 카테고리마다 수행해준다.
                        setHotel(local[type], kind, type);
                    }
                }
            }
        }else{
            toast(`도시에 ${kind}데이터가 없어서 작업을 진행할 수 없습니다.`)
            return false;
        }
    },


};

export default SetLocal;