var Safety = {
    area: {},
    local: {},
    spot: {},
    
    init: function(data){
        var cityName = $(".cityName").html();
        var city = $(".cityName").attr('id');
        var orderArray = [];
        this.area = data.area;
        if(data.local){
            this.local = data.local;
        }else{
            return '지역 데이터가 없어 치안 계산을 할 수 없습니다.'
        }

        var atmDistance = this.preprocess.atm;
        //top15, top30으로 이루어진 객체. 30번째 atm이 가까이 있는 순으로 상위 15%, 30%녀석이 얼마나 가까운지


        
        //지역 내 atm들이 얼마나 몰려있는지, 편의점들이 얼마나 가까이 있는지 등 평균치들을 계산
        


        var scoreArray = [];

        for (var hid in data.hotels) {
            var hotel = data.hotels[hid];
            
            var safe_txt = [];
            var txt = '';
            var summary = '';
            var sum = 0;

            var score = {
                general:0,       //지역의 일반적인 치안 수준
                floating:{
                    atm:0,       //주변에 ATM이 다른 곳 대비 특출나게 많아 유동인구가 많은 곳이라는 추정이 될 정도
                    spot:0,      //주변에 유명 관광명소가 가까이 있는지(0:없음, 1:있음, 2:여러개)
                    grocery:0,   //식료품점 또는 편의점이 주변에 얼마나 많은지 -> 다른지역 대비 확실히 많아야 린정
                    area: false //뉴욕의 타임스퀘어 일대, 오사카의 도톤보리 부근처럼 유동인구가 별나게 많은 특정 area에 속하는지 여부
                },
                metro:0,        //지하철역(지하철순위 하위 30% 제외)이 얼마나 가까운지로 결정되는 안전도
                mainStreet: false   //확연한 대로변에 위치했는지 여부
            }

            //지역의 일반적인 치안 수준을 계산하고 설명함
            score.general = this.general.score(this.area[hotel.area].safety);
            txt = this.general.txt(hotel.area);
            safe_txt.push(txt);


            //유동인구에 따른 치안 수준을 계산하고 설명함
            score.floating = this.floating.score(hotel);


            var atm30th = hotel.local.atm[29].location.score; //(visa atm찾기 도구는 호텔에 직접 atm을 때려박음) 30번째 atm이 몇 마일 떨어져있는지

            if (atm30th < 0.084) {
                score.floating.atm = 2
            } else if (atm30th < 0.12) {
                score.floating.atm = 1
            }

            score += Math.max((0.15 - atm30th), 0) * 5

            hotel.spot = {
                walkable: []
            }
            hotel.local.spot = [];
            hotel.local.grocery = [];

            for (var i = 0; i < data.spots.ranked.length; i++) {
                var spot = data.spots.ranked[i];

                if (spot.enterance) {
                    for (var j = 0; j < spot.enterance.length; j++) {
                        var dif = calculateDif(hotel.coor, spot.enterance[j])
                        if (dif < 500) {
                            hotel.spot.walkable.push({
                                rank: i,
                                sid: spot.sid
                            })
                            if (dif < 200) {
                                if (score.floating.spot === 0) {
                                    score.floating.spot = 1
                                }
                            }

                            if (dif < 80) {
                                hotel.local.spot.push(spot)
                                score.floating.spot = 2
                            }
                        }
                    }
                } else {
                    var dif = calculateDif(hotel.coor, spot.coor)
                    if (dif < 500) {
                        hotel.spot.walkable.push({
                            rank: i,
                            sid: spot.sid
                        })
                        if (dif < 200) {
                            if (score.floating.spot === 0) {
                                score.floating.spot = 1
                            }

                            score += (250 - dif) / 200
                        }

                        if (dif < 150) {
                            hotel.local.spot.push(spot)
                            score.floating.spot = 2
                        }
                    }
                }
            }
            hotel.local.grocery = []

            hotel.local.nearestMetro = {
                distance: 1000
            }
            for (var line in hotel.metroInfo) {
                var metro = hotel.metroInfo[line];

                if (metro.distance < hotel.local.nearestMetro.distance) {
                    hotel.local.nearestMetro = metro;
                    hotel.local.nearestMetro.line = line;
                }
            }

            for (var i = 0; i < data.local.local.grocery.length; i++) {
                var grocery = data.local.local.grocery[i];
                var dif = calculateDif(hotel.coor, grocery)

                if (dif < 110) {
                    hotel.local.grocery.push(dif);
                }
            }

            score += Math.min((hotel.local.grocery.length / 6), 0.7)

            if (hotel.local.grocery.length > 3) {
                score.floating.grocery = 2;
            } else if (hotel.local.grocery.length > 1) {
                score.floating.grocery = 1;
            }


            var areaScore = Math.round((areaSafety.score * 1 + (areaSafety.misdemeanor / 3) * 1) * 10) / 10


            var localTxt = '';
            var localGood = false;

            if (score.floating.area) {
                localTxt += '맨해튼 한복판에 위치해 유동인구가 매우 많'
                summary += '유동인구가 매우 많은 맨해튼 한복판에 위치하고, 지하철도 가까워 <strong>밤 늦게까지 안전하지만 소매치기 등 경범죄에는 조심해야 함</strong>'
            } else {
                if (hotel.local.spot.length > 0) {
                    if (score.floating.grocery > 0) {
                        if (score.floating.atm > 0) {
                            localTxt += '주변 상업시설, 편의시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구가 매우 많음.</strong>'
                            localGood = true;
                        } else {
                            localTxt += '주변 편의시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구 많음.</strong>'
                            localGood = true;
                        }
                    } else {
                        if (score.floating.atm > 0) {
                            localTxt += '주변 상업시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구 많음.</strong>'
                            localGood = true;
                        } else {
                            localTxt += hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구가 많음.</strong>'
                            localGood = true;
                        }
                    }
                } else {
                    if (score.floating.grocery > 0) {
                        if (score.floating.atm > 0) {
                            localTxt += '주변 상업시설, 편의시설이 잘 갖추어져 있어 <strong>유동인구가 많음.</strong>'
                            localGood = true;
                        } else {

                        }
                    } else {
                        if (score.floating.atm > 0) {

                        } else {

                        }
                    }
                }
            }

            if (areaScore > 7.5) {
                if (!score.floating.area) {
                    summary += '전반적으로 치안이 좋은 <b>' + areaName + '</b>지역에 위치하고 있'
                }

                if (localGood) {
                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 주변 <strong>유동인구가 많고 지하철이 가까워 밤 늦게까지도 매우 안전</strong>함.'
                        } else {
                            summary += '으며, 주변 유동인구가 많아 <strong>지역 내에서도 더 안전</strong>한 편.'
                        }
                    }

                } else {
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 아주 많지는 않은 편.'

                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 지하철이 가까워 <strong>밤 늦게 귀가할 때도 안전</strong>한 편.'
                        } else {
                            summary += '지만 <strong>너무 밤 늦게 돌아다니는 것은 삼가는 것</strong>이 좋음.'
                        }
                    }
                }
            } else if (areaScore > 6.8) {

                if (!score.floating.area) {
                    summary += '치안이 좋은 편인 <b>' + areaName + '</b>지역에 위치하고 있'
                }

                if (localGood) {

                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 주변 유동인구가 많고 지하철이 가까워 <strong>밤 늦게까지도 안전</strong>한 편.'
                        } else {
                            summary += '으며, 주변 유동인구가 많아 <strong>지역 내에서도 안전</strong>한 편.'
                        }
                    }

                } else {
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 아주 많지는 않은 편.'

                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 지하철이 가까워 <strong>밤 늦게 귀가할 때도 안전</strong>한 편.'
                        } else {
                            summary += '지만 너무 <strong>밤 늦게 돌아다니는 것은 삼가는 것</strong>이 좋음.'
                        }
                    }
                }

            } else if (areaScore > 6) {
                if (!score.floating.area) {
                    summary += '일반적인 치안 수준의 <b>' + areaName + '</b> 지역에 위치하고 있'
                }

                if (localGood) {
                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 주변 유동인구가 많고 지하철이 가까워 <strong>밤 늦게 귀가할 때도 안전</strong>한 편.'
                        } else {
                            summary += '으며, 주변 유동인구가 많아 <strong>안전한 편이지만 너무 밤 늦게 귀가하는 것은 삼가</strong>는 것이 좋음.'
                        }
                    }

                } else {
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 많지는 않은 편에 속함.'

                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, <strong>지하철이 가깝지만 너무 밤 늦게 귀가하는 것은 삼가</strong>는 것이 좋음.'
                        } else {
                            summary += '으며, 주변 유동인구가 아주 많은 편은 아니므로 <strong>밤 늦게 돌아다니지 않는</strong> 것이 좋음.'
                        }
                    }
                }
            } else {
                if (!score.floating.area) {
                    summary += '전반적으로 치안이 좋지 않은 편인 <b>' + areaName + '</b> 지역에 위치하고 있'
                }

                if (localGood) {
                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 유동인구가 많고 지하철이 가까워 <strong>지역 내에서는 안전한 편이지만 늦은 시간 귀가는 삼가는 것</strong>이 좋음.'
                        } else {
                            summary += '으며, 주변 유동인구가 많은 편이지만 <strong>늦은 시간에 귀가하지 않는 것</strong>이 좋음.'
                        }
                    }
                } else {
                    localTxt += '주변에 많은 시설이 있거나 유명한 관광지가 있지 않아 유동인구가 지역 내에서도 많지 않은 편.'
                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 지하철이 가깝지만 유동인구가 많지 않은 편이므로 <strong>안전에 유의해야 함</strong>.'
                        } else {
                            summary += '으며, 유동인구가 많지 않아 <strong>안전에 유의해야 함</strong>.'
                        }
                    }
                }
            }

            safe_txt.push(localTxt);

            var met = hotel.local.nearestMetro;
            var metDis = met.distance;
            var metTxt = '가장 가까운 지하철 역은 <b>' + met.line + '호선 ' + met.name + '역</b>으로, 도보로 약 <strong>' + (Math.floor(metDis / 75) + 1) + '분</strong> 거리에 있';

            if (metDis < 200) {
                metTxt += '어 <strong>늦은 밤에 귀가하기 좋음</strong>.'
            } else if (metDis < 500) {
                metTxt += '음.'
            } else {
                metTxt += '어 <strong>너무 늦은 밤에는 지하철로 귀가하기 부담</strong>스러울 수 있음'
            }

            var metScore = Math.max(Math.round((300 - metDis) / 300), 0);

            score += metScore

            if (score > 9.2) {
                score = 9.2 + (score - 9.2) / 4
            }

            score = Math.min(Math.round(score * 7.92 + 22) / 10, 9.9);

            safe_txt.push(metTxt);

            hotel.assessment.safety = {
                score: score
            }

            scoreArray.push(score)

            if (score > 9.4) {
                safe_txt.push('전반적으로 ' + cityName + ' 숙소들 중에서도 <strong>치안으로는 최상위권</strong>에 속해 여행을 즐기기 좋음.')
            } else if (score > 9) {
                safe_txt.push('' + cityName + ' 숙소들 중에서도 전반적으로 <strong>상당히 좋은 치안</strong>을 자랑함.')
            } else if (score > 8.5) {
                safe_txt.push('<strong>전반적으로 주변 치안이 안정</strong>되어 여행하기에 좋음.')
            } else if (score > 7.9) {
                safe_txt.push('밤 늦게 돌아다니지 않고 <strong>조심한다면 전반적으로 여행하기에 안전</strong>한 편.')
            } else if (score > 7.3) {
                safe_txt.push('전반적으로 <strong>' + cityName + ' 평균 정도의 치안 수준</strong>을 보이며, 조심히 다닐 필요는 있음.')
            } else if (score > 6.9) {
                safe_txt.push('치안이 아주 나쁘지는 않지만 <strong>조심히 다니는 것이 좋음</strong>.')
            } else {
                safe_txt.push('치안이 좋은 편은 아니므로 <strong>안전한 숙소를 원한다면 좋은 선택은 아님.</strong>')
            }

            hotel.explain.safety = safe_txt;

            if (hotel.summary) {
                hotel.summary.safety = summary;
            } else {
                hotel.summary = {
                    safety: summary
                };
            }
        }

        scoreArray.sort();

        data.status.hotels.safety = true;

        // firebase.database().ref('cities/'+this.city).update(data)
    },

    general: {
        score: function(safety){
            var score = (safety.score*0.8 + safety.misdemeanor*0.2 + 9)/4; //2.5~4 사이의 값을 가짐

            return score;
        },
        txt: function(idx){

            var scoreWord = ["", "매우 나빠 조심해야 함.", "좋지 않은 편.", "좋지 않은 편.", "나쁘지 않은 편.", "좋은 편.", "매우 좋은 편.", "매우 좋은 편."];
            //일반치안과 경범죄치안이 비슷한 경우 요 워딩

            //일반치안은 좋은데 경범죄치안은 나쁜 경우 아래 워딩을 'but' 접속사로 연결해 사용
            var scoreWord_connect = ["", "매우 나쁘", "좋지 않으", "좋지 않은 편이", "나쁘지 않은 편이", "좋은 편이", "매우 좋은 편이", "매우 좋으"];
            var misdemeanorWord = ["", "소매치기 등 경범죄에는 주의해야 함.", "소매치기 등 경범죄에는 주의해야 함.", "경범죄에는 주의해야 함.", "", "", "", ""]

            var safety = this.area[idx].safety;

            var txt = this.area[idx].name + ' 지역에 위치한 숙소로, 지역의 전반적인 치안은 ';

            if (safety.score > 4 && safety.misdemeanor < 4) {
                txt += scoreWord_connect[safety.score] + '지만 ' + misdemeanorWord[safety.misdemeanor];
            } else {
                txt += scoreWord[safety.score]
            }

            return txt;
        }
    },

    preprocess: {
        atm: function() {
            var atmArray = [];

            for (var hid in data.hotels) {
                var atm = data.hotels[hid].local.atm[29].location.score;
                atmArray.push(atm);
            }
            atmArray.sort((a, b) => a - b);

            var top15 = Math.floor(atmArray.length*0.15);
            var top30 = Math.floor(atmArray.length*0.3);

            var atmDistance = {
                top15: atmArray[top15],
                top30: atmArray[top30]
            }
        }
    },

    floating: {
        score: function(hotel){
            var floating = {
                area: false,
                atm: 0,
                spot: 0,
                grocery: 0
            }

            // 유동인구가 별나게 많은 특정 area에 속하는 여부
            //TODO: local -> area에 인구밀도가 높은 area 배열로 넣어놓기 [뉴욕의 경우 6, 7, 8, 10 area]
            if(this.local.area){
                if(this.local.area.includes(hotel.area)){
                    floating.area = true;
                }
            }


        },
        txt: function(){

        }
    }
}

export default Safety;