var SetATM = {
    statistic: {
        overall:[], //반경 140m 내에 ATM이 몇 개 있는지 도시 전체 평균을 내기 위한 데이터
        byArea: [], //반경 140m 내에 ATM이 몇 개 있는지 지역별로 평균을 내기 위한 데이터
        nearest:[], //가장 가까운 ATM은 몇 m 거리에 있는지 도시 전체 평균을 내기 위한 데이터
        bank24:[]   //24시간 운영하는 은행 소유 거리에 있는지 도시 전체 평균을 내기 위한 데이터
    },

    init: function (hotels) {
        var errNo = 0;
        var totalNo = 0;

        for (const hid in hotels) {
            var hotel = hotels[hid];
            if (hotel.local) {
                var atmArr = hotel.local.atm;
                var atmObj = {
                    nearest: atmArr[0],
                    bank24: false,
                    in140: 0
                };

                atmObj.nearest.dif = calculateDif(atmArr[0].coor, hotel.coor).toFixed(4);

                if (atmArr) {
                    for (var i = 0; i < atmArr.length; i++) {
                        var atm = atmArr[i];
                        var dif = calculateDif(atm.coor, hotel.coor);

                        if (dif < 140.1) {
                            atmObj.in140++;
                        }

                        if (dif < 200) {
                            if (atm.owner.includes("BANK") && atm.is24) {
                                if (!atmObj.bank24) {
                                    atmObj.bank24 = atm;
                                    atmObj.bank24.dif = dif.toFixed(4);
                                }
                            }
                        }
                    }

                    //가장 가까운 ATM과 24시간 운영하는 ATM이 평균적으로 얼마나 떨어져있는지 알아보기 위함
                    this.statistic.nearest.push(atmObj.nearest.dif);
                    if (atmObj.bank24) {
                        this.statistic.bank24.push(atmObj.bank24.dif);
                    } else {
                        this.statistic.bank24.push(210);
                    }

                } else {
                    errNo++;
                }
                hotel.local.atm = atmObj;

                //160m 반경에 평균적으로 몇 개 ATM이 있는지 알아보기 위함
                if (this.statistic.byArea[hotel.area]) {
                    this.statistic.byArea[hotel.area].push(atmObj.in140);
                } else {
                    this.statistic.byArea[hotel.area] = [atmObj.in140];
                }
                this.statistic.overall.push(atmObj.in140);

            } else {
                errNo++;
            }
            totalNo++;
        }

        this.statistic.nearest.sort((a, b) => a - b);
        this.statistic.bank24.sort((a, b) => a - b);

        console.log(this.statistic.byArea);
        console.log(this.statistic.bank24);
        console.log(this.statistic.nearest);

        if (errNo > 2) { //VISA ATM finder가 중간에 끊겼을 가능성 높음
            toast(`${totalNo} 개의 호텔 중 ${errNo} 개의 호텔에 VISA ATM 정보가 없습니다. 확인 후 재시도해주세요`);
        }
    }
};

export default SetATM;