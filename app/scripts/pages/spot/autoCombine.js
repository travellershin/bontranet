//first_check에서만 imported 되고 사용됨

var AutoCombine = {
    init: function (data) {

        let cid = $(".cityName").attr("cid");
        let siteArr = ["gg", "lp", "nv", "ta"];
        let combining = {};
        let counter = 0;

        for (var j = 0; j < siteArr.length; j++) {
            let site = siteArr[j];
            if (data[site]) {
                if (data[site].noData) {

                } else {

                    for (var i = 0; i < data[site].length; i++) {
                        if (data[site][i] && !data[site][i].deleted) {
                            let oldSpot = data[site][i];
                            //기존 정보를 oldSpot이라고 하자. 새로운 스팟정보에는 이름을 한/영으로 분할하고 랭킹을 부여할 것이다.

                            let spot = {
                                name: {
                                    ko: "",
                                    en: ""
                                },
                                coor: oldSpot.coor,
                                rank: {

                                },
                            }

                            if (/[가-힣]/.test(oldSpot.name)) {
                                spot.name.ko = oldSpot.name;
                            } else {
                                spot.name.en = oldSpot.name;
                            }
                            spot.rank[site] = i;

                            if (oldSpot.url) {
                                spot.url = oldSpot.url;
                            }
                            if (oldSpot.tag) {
                                spot.tag = oldSpot.tag;
                            }

                            if (counter < 10) {
                                combining["s00" + counter] = spot;
                            } else if (counter < 100) {
                                combining["s0" + counter] = spot;
                            } else {
                                combining["s" + counter] = spot;
                            }
                            counter++
                        }
                    } //한바퀴 돌았당

                }
            }
        }


        let combineObj = {}
        let combined = {}

        for (var code in combining) {
            let spot = combining[code];
            combineObj[code] = spot
            combineObj[code].combine = {};
            let hasCombined = false;
            //합칠 것이 없으면 바로 combined 쪽으로 보낸다.

            for (var tCode in combining) {
                if (code < tCode) {
                    let tSpot = {};
                    for (var key in combining[tCode]) {
                        tSpot[key] = combining[tCode][key]
                    }
                    if (!tSpot.deleted) {
                        let dif = calculateDif(spot.coor, tSpot.coor)

                        if (dif < 250) {
                            combineObj[code].combine[tCode] = tSpot;
                            hasCombined = true;
                        }
                    }
                }
            }

            if (!hasCombined) {
                combined[code] = combineObj[code];
                delete combineObj[code];
            }

        }

        firebase.database().ref("cities/" + cid + "/spots").set({
            combining: combineObj,
            combined: combined
        })

        firebase.database().ref('setting/cities/' + cid + '/status/spot').set(1);
    }
}

export default AutoCombine;