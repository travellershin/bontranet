var SetLocal = {

    data: { //데이터 구조 파악하기 위해 가져다놓은녀석. 사용하지 말것!
        overall: {
            atm: 0, //호텔 당 반경 160미터 내 평균적으로 ATM이 몇 개 있는지
            metro: {
                distance: 0, //호텔 별 가장 가까운 지하철역이 평균 몇 M 떨어져있는지
                number: 0, //호텔 별 반경 500m 내 지하철역이 몇 개 있는지
            },
            food: {
                distance: 0, //호텔 별 가장 식료품점이 평균 몇 M 떨어져있는지
                number: 0, //호텔 별 반경 500m 내 식료품점이 몇 개 있는지
            }
        },
        byArea: [] //위 정보를 지역별로 담음
    },

    visaATM: function(hotels){
        var atm_overall = [];
        var atm_byArea = [];

        var errNo = 0;
        var totalNo = 0;

        for (const hid in hotels) {
            var hotel = hotels[hid];
            if(hotel.local){
                var atmArr = hotel.local.atm;
                var atmObj = {
                    nearest: atmArr[0],
                    bank24:false,
                    in160:0
                };

                atmObj.nearest.dif = calculateDif(atmArr[0].coor, hotel.coor);

                if(atmArr){
                    for (var i = 0; i < atmArr.length; i++) {
                        var atm = atmArr[i];
                        var dif = calculateDif(atm.coor, hotel.coor);
                        
                        if(dif<160.1){
                            atmObj.in160++;

                            if(atm.owner.includes("BANK")&&atm.is24){
                                if(!atmObj.bank24){
                                    atmObj.bank24 = atm;
                                    atmObj.bank24.dif = dif;
                                }
                            }
                        }
                    }
                } else { 
                    errNo++;
                }

                hotel.local.atm = atmObj;

                if (atm_byArea[hotel.area]) {
                    atm_byArea[hotel.area].push(atmObj.in160);
                } else {
                    atm_byArea[hotel.area] = [atmObj.in160];
                }
                atm_overall.push(atmObj.in160);

            } else {
                errNo++;
            }
            totalNo++;
        }

        console.log(hotels);
        console.log(atm_byArea);

        if (errNo > 2) { //VISA ATM finder가 중간에 끊겼을 가능성 높음
            toast(`${totalNo} 개의 호텔 중 ${errNo} 개의 호텔에 VISA ATM 정보가 없습니다. 확인 후 재시도해주세요`);
        }
    },
    
};

export default SetLocal;