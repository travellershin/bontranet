var stat = { //통계같은 자료
    local: {
        atm: {
            nearest: 0, //호텔별 가장 가까운 ATM은 평균 몇 m 거리에 있는지
            in130: 0, //호텔 당 반경 140미터 내 평균적으로 ATM이 몇 개 있는지
            bank24: 0 //호텔별 가장 가까운 은행 소유 24시간 ATM은 평균 몇 m 거리에 있는지
        },
        metro: {
            distance: 0, //호텔 별 가장 가까운 지하철역이 평균 몇 M 떨어져있는지
            line: 0 //호텔별 반경 500m 내 지하철 노선이 평균 몇 개(역 갯수가 몇개인지는 노의미) no meaning
        },
        food: {
            distance: 0, //호텔 별 가장 가까운 식료품점이 평균 몇 M 떨어져있는지
            number: 0, //호텔 별 반경 300m 내 식료품점이 몇 개 있는지
        }
    }
};

var hotel = {
    local: { //이하 항목들은 coor값 제공
        atm: {
            citi:{},  // 가장 가까운 CITI은행 ATM(북미한정)
            nearest:{}, //무조건 가장 가까운 ATM
            bank24:{}   //은행에서 운영하는 24시간 ATM (없으면 false)
        },
        food:{
            large:{},   //홀세일, 이마트, 코스트코급 등 (있는 국가만)
            grocery:{}, //식료품점(일본, 동남아 일부 국가는 없을수도)
            cvs:{},     //편의점(아시아권 국가)
            bakery:{}   //베이커리(유럽, 북미 등)
        },
        metro:{
            byLine:{ //노선별 지하철 - 예 {2호선 - (50미터,선릉역), 3호선 - (70미터,압구정역)} - 관광지별 최단거리 산출하려면 이놈이 필요
                노선명:{
                    di:0, //거리
                    name:"14st" //역명
                }
            },
            byStn:[ //역별 지하철 - 예 {압구정,위치,[3호선]}, {잠실,위치,[2호선,8호선]} - 지도에 찍으려면 이놈이 필요
                {
                    name:"역명",
                    coor:{},
                    line:[]
                }
            ]
        }
    },
    assessment:{
        score:{

        },
        summary:{

        },
        word:{
            convenience:{
                atm:""
            }
        }
    }
}