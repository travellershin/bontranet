var Transport = {
    init: function(){

        var cityName = $(".cityName").html();
        var city = $(".cityName").attr('id');
        let orderArray = [];

        if(!data.metro||!data.metroLine){
            return '대중교통 정보가 입력되지 않아 교통 편의성을 계산할 수 없습니다.'
        }

        for (var hid in data.hotels) {
            var hotel = data.hotels[hid];

            var transport_txt = [];

            var score = 0;
            //교통 편의성 점수부여용
            var goodLine = [];
            //좋은 지하철 라인들 Array
            var visitable = [];
            //환승 없이 갈 수 있는 관광지 목록
            var nearest = { distance: 1200, name: "", code: "" };
            //가장 가까운 지하철
            var lineNo = 0
            //10분거리 이내의 지하철  노선 개수
            if (hotel.metroInfo) {
                lineNo = Object.keys(hotel.metroInfo).length
            }

            for (var metLine in hotel.metroInfo) {

                if (hotel.metroInfo[metLine].distance < nearest.distance) {
                    nearest = hotel.metroInfo[metLine]
                    //가장 가까운 지하철 갱신
                }

                if (data.metroLine[metLine].score > 80) {
                    goodLine.push(metLine)
                    //좋은 라인이면 목록에 포함
                }

                for (var i = 0; i < data.metroLine[metLine].spot.length; i++) {
                    let spot = data.metroLine[metLine].spot[i]
                    if (!visitable.includes(spot.name)) {
                        visitable.push(spot.name)
                        //환승 없이 갈 수 있는 관광지면 목록에 포함
                    }
                }
            }
            if(nearest.name.length>0){
                transport_txt.push('가장 가까운 지하철 역은 <b>' + nearest.name + '</b> 역으로, ' + difToMinWord(nearest.distance))
            }
            if(lineNo>0){
                transport_txt.push('숙소에서 도보 10분거리 이내에 <b>지하철 ' + lineNo + '개 노선</b>이 지남');
            }

            if (goodLine.length > 0) {
                if (goodLine.length > 1) {
                    transport_txt.push('그 중에서도 실질적으로 ' + cityName + ' 관광에 편리한 <strong>' + goodLine.join(', ') + '호선</strong>이 지나는 <b>초 역세권</b>');
                } else {
                    transport_txt.push('그 중에서도 실질적으로 ' + cityName + ' 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지나는 <b> 역세권</b>');
                }
            }

            if (visitable.length > 0) {
                // TODO: 100대 관광지 -> 뉴욕 실제 spot 데이터 길이
                if (visitable.length > 90) {
                    transport_txt.push('<b>' + cityName + ' 100대 관광지 중 ' + spotNo + '개</b>를 환승 없이 방문할 수 있는 <strong>최고의 교통 요지</strong>');
                } else if (visitable.length > 75) {
                    transport_txt.push('<b>' + cityName + ' 100대 관광지 중 ' + spotNo + '개</b>를 환승 없이 방문할 수 있는 <strong>교통 요지</strong>');
                } else {
                    transport_txt.push(cityName + ' 100대 관광지 중 ' + spotNo + '개를 환승 없이 방문 가능');
                }
            }


            var min = Math.ceil(nearest.distance / 70);

            if(hotel.summary){
                hotel.summary.transport = this.summary(min, lineNo);
            }else{
                hotel.summary = {
                    transport: this.summary(min, lineNo)
                }
            }
            

            for (var metLine in hotel.metroInfo) {
                let metDistance = hotel.metroInfo[metLine].distance;
                score += (10000 - metDistance) * data.metroLine[metLine].score;
            }

            orderArray.push({
                score: score,
                hid: hid
            })

            if (hotel.explain) {
                hotel.explain.transport = transport_txt;
            } else {
                hotel.explain = {
                    transport: transport_txt
                }
            }
        }

        orderArray.sort(function (a, b) {
            return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
        })

        for (var i = 0, len = orderArray.length; i < len; i++) {
            let hotel = data.hotels[orderArray[i].hid];
            let score = Math.round((1 - (i / len) * (i / len)) * 60) / 10 + 4
            //4.0 ~ 10.0 사이의 점수를 소수점 1자리까지 부여한다.
            //높은 점수가 더 많당

            if (hotel.assessment) {
                hotel.assessment.transport = {
                    score: score
                }
            } else {
                hotel.assessment = {
                    transport: {
                        score: score
                    }
                }
            }
        }

        data.status.hotels.transport = true;
        firebase.database().ref("cities/" + city).update(data)

        return '대중교통 정보 발견. 교통 편의성을 계산했습니다.'
    },

    summary: function(min, lineNo){
        var summary = '';

        if (min < 2) {
            if (lineNo > 18) {
                summary = '가장 가까운 지하철역이 <strong>도보 단 ' + min + '~' + (min + 1) + '분 거리</strong>에 있고, 도보 10분 거리에 <strong>지하철 ' + lineNo + '개 노선</strong>이 지나는 <b>최상의 역세권</b>'
            } else if (lineNo > 14) {
                summary = '가장 가까운 지하철역이 <strong>도보 단 ' + min + '~' + (min + 1) + '분 거리</strong>에 있고, 도보 10분 거리에 <strong>지하철 ' + lineNo + '개 노선</strong>이 지나는 <b>굉장히 훌륭한 역세권</b>'
            } else {
                if (goodLine.length > 3) {
                    summary = '가장 가까운 지하철역이 <strong>도보 단 ' + min + '~' + (min + 1) + '분 거리</strong>에 있고, 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지나는 <b>훌륭한 역세권</b>'
                } else if (goodLine.length > 0) {
                    summary = '가장 가까운 지하철역이 <strong>도보 단 ' + min + '~' + (min + 1) + '분 거리</strong>에 있고, 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지나는 <b>좋은 역세권</b>'
                }
            }
        } else if (min < 4) {
            if (lineNo > 18) {
                summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 1) + '~' + (min + 2) + '분 거리</strong>에 있고, 도보 10분 거리에 <strong>지하철 ' + lineNo + '개 노선</strong>이 지나는 <b>굉장히 훌륭한 역세권</b>'
            } else if (lineNo > 14) {
                summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 1) + '~' + (min + 2) + '분 거리</strong>에 있고, 도보 10분 거리에 <strong>지하철 ' + lineNo + '개 노선</strong>이 지나는 <b>훌륭한 역세권</b>'
            } else {
                if (goodLine.length > 2) {
                    summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 1) + '~' + (min + 2) + '분 거리</strong>에 있고, 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지나는 <b>역세권</b>'
                } else if (goodLine.length > 0) {
                    summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 1) + '~' + (min + 2) + '분 거리</strong>에 있고, 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지남'
                }
            }
        } else if (min < 7) {
            if (lineNo > 19) {
                summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 2) + '~' + (min + 3) + '분 거리</strong>로 약간 멀지만, 도보 10분 거리에 <strong>지하철 ' + lineNo + '개 노선</strong>이 지나는 <b>좋은 역세권</b>'
            } else if (lineNo > 15) {
                summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 2) + '~' + (min + 3) + '분 거리</strong>로 약간 멀지만, 도보 10분 거리에 <strong>지하철 ' + lineNo + '개 노선</strong>이 지나는 <b>역세권</b>'
            } else {
                if (goodLine.length > 2) {
                    summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 2) + '~' + (min + 3) + '분 거리</strong>로 약간 멀지만, 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지남'
                } else {
                    summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 2) + '~' + (min + 3) + '분 거리</strong>로 약간 떨어져 있어 다소 불편할 수 있음'
                }
            }
        } else {
            summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 3) + '~' + (min + 5) + '분 거리</strong>로 조금 떨어져 있어 불편할 수 있음'
        }

        return summary;
    }
}

export default Transport;