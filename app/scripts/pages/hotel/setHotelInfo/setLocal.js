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
    }
};

export default SetLocal;