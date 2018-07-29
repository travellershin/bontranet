var First_Check = {
    init: function(data){
        var that = this;
        this.inflate(data)
    },

    siteNodata: function (sid) {
        var city = $(".cityName").attr("cid");
        console.log(city);
        firebase.database().ref("cities/" + city + "/spots/" + sid + "/nodata").set(true)
    },

    setRemainNumber: function (site, number) {
        let city = $(".cityName").attr("cid");
        let cutNo = number.trim() * 1;
        console.log(this.data)

        if (cutNo < 100) {
            toast("100개 이상의 장소를 유지해주세요");
        } else {
            if (confirm("순위 " + cutNo + "위 미만 장소를 모두 제거합니다. 맞습니까?")) {
                let cutObj = this.data.spots[site];
                cutObj.length = cutNo;

                firebase.database().ref("cities/" + city + "/spots/" + site).set(cutObj);
            } else {
                return false;
            }
        }
    },

    inflate: function(data){
        $(".header").append('<p class="return">돌아가기</p>')

        let hasProblem = false;
        let txt = ''
        let searchUrl = 'https://www.google.co.kr/maps/place/' + $(".cityName").html() + "+";

        let siteObj = {
            gg: "구글",
            nv: "네이버",
            ta: "트립어드바이저",
            lp: "론리플래닛"
        }
        console.log(data)

        for (var site in siteObj) {

            let siteHasProblem = false;
            let noCoor = false;
            let noCoorTxt = '<p class="check__subTitle">좌표가 입력되지 않은 관광지가 있습니다</p>';
            let noSpot = false;
            let noSpotTxt = '<p class="check__subTitle">비어있는 관광지가 있습니다</p>';

            if (data[site]) {
                txt += '<p class="check__title">' + siteObj[site] + ' 데이터 확인</p>'
                if (!data[site].nodata) {
                    for (var i = 0; i < data[site].length; i++) {
                        let spot = data[site][i];
                        if (spot) {
                            let hasCoor = true;
                            if (spot.deleted) {
                                //일부러 삭제한 관광지 -> 넘어간다
                            } else {
                                if (spot.coor) {
                                    if (spot.coor.lng) {
                                        if (isNaN(spot.coor.lng * 1)) {
                                            hasCoor = false;
                                        }
                                    } else {
                                        hasCoor = false;
                                    }

                                    if (spot.coor.lat) {
                                        if (isNaN(spot.coor.lat * 1)) {
                                            hasCoor = false;
                                        }
                                    } else {
                                        hasCoor = false;
                                    }
                                } else {
                                    hasCoor = false;
                                }

                                if (!hasCoor) {
                                    noCoorTxt += '<div class="check__line" id="' + site + '_' + i + '">'
                                    noCoorTxt += '<a class="check__spotName" href="' + searchUrl + spot.name + '" target="_blank">' + spot.name + '</a>'
                                    noCoorTxt += '<input class="check__spotCoor" placeholder="xx.xxxxx, xx.xxxxx 형태 입력">'
                                    noCoorTxt += '<p class="check__confirm">좌표 입력</p><p class="check__spotDelete">장소 삭제</p>'
                                    noCoorTxt += '</div>'
                                    hasProblem = true;
                                    siteHasProblem = true;
                                    noCoor = true;
                                }
                            }

                        } else {
                            noSpotTxt += '<div class="check__line" id="' + site + '_' + i + '">'
                            noSpotTxt += '<p class="check__txt">' + i + ' 번 관광지</p>'
                            noSpotTxt += '<p class="check__spotDelete">장소 삭제</p>'
                            noSpotTxt += '</div>'
                            hasProblem = true;
                            siteHasProblem = true;
                            noSpot = true;
                        }
                    }

                    if (noCoor) {
                        txt += noCoorTxt;
                    }
                    if (noSpot) {
                        txt += noSpotTxt;
                    }

                    if (data[site].length > 150) {
                        let largeOK = true;
                        if (data.largeData) {
                            if (data.largeData[site]) {
                                //150개 이상의 데이터를 보유하려면 도시명/spots/largeData/사이트명이 true라고 부여되어야 함
                            } else {
                                largeOK = false;
                            }
                        } else {
                            largeOK = false;
                        }

                        if (!largeOK) {
                            hasProblem = true;
                            siteHasProblem = true;
                            txt += '<p class="check__subTitle">' + siteObj[site] + ' 장소 데이터가 150개를 초과(' + data[site].length + '개)합니다.</p>'
                            txt += '<div class="check__line" id="' + site + '">'
                            txt += '<input class="check__remainNumber" value="' + data[site].length + '">'
                            txt += '<p class="check__remainLargeData">개의 장소 유지하기</p>'
                            txt += '</div>'
                        }

                    }
                }


            } else {
                txt += '<p class="check__title">' + siteObj[site] + ' 데이터가 존재하지 않습니다.</p>'
                txt += '<p class="check__subTitle check__nodata" sid="' + site + '">데이터가 원래 없을 경우 클릭해주세욥</p>'
                hasProblem = true;
                siteHasProblem = true;

                // TODO: 원래 사이트 데이터가 존재하지 않는 경우를 대비한 버튼을 만들고 site 값으로 nodata: true를 넣어준다.
            }
            if (!siteHasProblem) {
                txt += '<p class="check__subTitle">발견된 문제가 없습니다</p>'
            }
        }

        if (hasProblem) {
            txt += '<p class="check__finish">검사를 모두 마쳤습니다</p>'
            $(".spot .wrapper").html(txt);
        } else {
            toast("발견된 문제가 없어 데이터 병합을 실시합니다.")
            // this.autoCombine__spotRestructure();
        }

        $(".wrap").scrollTop(0)
    }
}

export default First_Check;