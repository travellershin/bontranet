import ManualCombine from "./manualCombine.js";

let Spot = {

    data:{},

    listener: function(){
        let that = this;

        $(".spot .check").on("click", ".check__confirm", function(){
            that.inputCoordinate($(this).parent().attr("id"), $(this).parent().children(".check__spotCoor").val());
        })

        $(".spot .check").on("click", ".check__spotDelete", function(){
            that.deleteSpot($(this).parent().attr("id"), $(this).parent().children(".check__spotName").html());
        })


    },

    init: function(data, cid, name){
        this.listener();
        this.data = data;

        $(".cityCodeView").addClass("displayNone");
        $(".city .spot").removeClass("displayNone");
        $(".cityName").html(name).attr("id", cid);

        if(data.spots.combined && !data.spots.combining){
            console.log("1차 자료정리 완료")
            //combined가 있고 combining이 없으면 1차 자료정리 완료라는 뜻

        }else if (data.spots.combining) {
            console.log("합치기 작업중")
            //combining이 있으면 합치기 작업중이라는 뜻
            ManualCombine.init(data.spots);
        }else{
            this.firstCheck(data.spots); //combining, combined가 없으면 데이터 수집, 검증중이라는 뜻
            //firstcheck를 통과하면 this.autoCombine을 통해 data.spots.combining이 만들어짐
        }
    },

    autoCombine__spotRestructure: function(){
        let city = $(".cityName").attr("id");
        let siteArr = ["gg","lp","nv","ta"];
        let combining = {};
        let counter = 0;
        let data = this.data.spots;

        for (var j = 0; j < siteArr.length; j++) {
            let site = siteArr[j];
            if(data[site]){
                if(data[site].noData){

                }else{

                    for (var i = 0; i < data[site].length; i++) {
                        if(data[site][i]){
                            let oldSpot = data[site][i];
                            //기존 정보를 oldSpot이라고 하자. 새로운 스팟정보에는 이름을 한/영으로 분할하고 랭킹을 부여할 것이다.

                            let spot = {
                                name:{
                                    ko:"",
                                    en:""
                                },
                                coor: oldSpot.coor,
                                rank:{

                                },
                            }

                            if (/[가-힣]/.test(oldSpot.name)) {
                                spot.name.ko = oldSpot.name;
                            } else {
                                spot.name.en = oldSpot.name;
                            }
                            spot.rank[site] = i;

                            if(oldSpot.url){
                                spot.url = oldSpot.url;
                            }
                            if(oldSpot.tag){
                                spot.tag = oldSpot.tag;
                            }

                            if(counter<10){
                                combining["s00"+counter] = spot;
                            }else if(counter<100){
                                combining["s0"+counter] = spot;
                            }else{
                                combining["s"+counter] = spot;
                            }
                            counter++
                        }
                    } //한바퀴 돌았당

                }
            }
        }

        this.autoCombine__combine(combining);
    },

    autoCombine__combine: function(combining){
        // TODO: 끝나면 합치기 작업 화면 inflate하기

        let city = $(".cityName").attr("id");

        let combineObj = {}
        let combined = {}

        for (var code in combining) {
            let spot = combining[code];
            combineObj[code] = spot
            combineObj[code].combine = {};
            let hasCombined = false;
            //합칠 것이 없으면 바로 combined 쪽으로 보낸다.

            for (var tCode in combining) {
                if(code<tCode){
                    let tSpot = {};
                    for (var key in combining[tCode]) {
                        tSpot[key] = combining[tCode][key]
                    }

                    let dif = calculateDif(spot.coor, tSpot.coor)

                    if(dif<250){
                        combineObj[code].combine[tCode] = tSpot;
                        hasCombined = true;
                    }
                }
            }

            if(!hasCombined){
                combined[code] = combineObj[code];
                delete combineObj[code];
            }
        }

        firebase.database().ref("cities/"+city+"/spots").set({
            combining:combineObj,
            combined:combined
        })

        ManualCombine.init({
            combining:combineObj,
            combined:combined
        });

    },

    deleteSpot: function(sid, name){
        let city = $(".cityName").attr("id");
        let site = sid.split("_")[0];
        let no = sid.split("_")[1];

        if(confirm(name + " 장소를 제거합니다. 계속할까요?")){
            firebase.database().ref("cities/"+ city + "/spots/" + site + "/" + no ).set({deleted: true});
            $("#"+sid).remove();
            toast("장소가 제거되었습니다.")
        }
    },

    inputCoordinate: function(sid, coorTxt){
        let city = $(".cityName").attr("id");
        let site = sid.split("_")[0];
        let no = sid.split("_")[1];
        let coor = {};

        if(coorTxt.split(",").length === 2){
            let lat = coorTxt.split(",")[0].trim()*1;
            let lng = coorTxt.split(",")[1].trim()*1;

            if(isNaN(lat)||isNaN(lng)){
                //좌표 중 하나가
                toast("좌표가 부정확하게 입력되었습니다")
            }else{
                coor = {
                    lat: lat,
                    lng: lng
                }
                toast("좌표가 입력되었습니다");
                $("#"+sid).remove();
                firebase.database().ref("cities/"+ city + "/spots/" + site + "/" + no + "/coor").set(coor);
            }
        }else{
            toast("좌표가 부정확하게 입력되었습니다")
        }
    },

    firstCheck: function(data){

        $(".header__status").html("데이터 검증중")
        let hasProblem= false;
        let txt = ''
        let searchUrl = 'https://www.google.co.kr/maps/place/' + $(".cityName").html() +"+"

        let siteObj = {
            gg: "구글",
            nv: "네이버",
            ta: "트립어드바이저",
            lp: "론리플래닛"
        }

        for (var site in siteObj) {
            let siteHasProblem = false;
            let noCoor = false;
            let noCoorTxt = '<p class="check__subTitle">좌표가 입력되지 않은 관광지가 있습니다</p>';
            let noSpot = false;
            let noSpotTxt = '<p class="check__subTitle">비어있는 관광지가 있습니다</p>';

            if(data[site]){
                txt+='<p class="check__title">'+siteObj[site]+' 데이터 확인</p>'
                for (var i = 0; i < data[site].length; i++) {
                    let spot = data[site][i];
                    if(spot){
                        let hasCoor = true;
                        if(spot.deleted){
                            //일부러 삭제한 관광지 -> 넘어간다
                        }else{
                            if(spot.coor){
                                if(spot.coor.lng){
                                    if(isNaN(spot.coor.lng*1)){
                                        hasCoor = false;
                                    }
                                }else{
                                    hasCoor = false;
                                }

                                if(spot.coor.lat){
                                    if(isNaN(spot.coor.lat*1)){
                                        hasCoor = false;
                                    }
                                }else{
                                    hasCoor = false;
                                }
                            }else{
                                hasCoor = false;
                            }

                            if(!hasCoor){
                                noCoorTxt+='<div class="check__line" id="'+site+'_'+i+'">'
                                noCoorTxt+=   '<a class="check__spotName" href="'+searchUrl+spot.name+'" target="_blank">'+spot.name+'</a>'
                                noCoorTxt+=   '<input class="check__spotCoor" placeholder="xx.xxxxx, xx.xxxxx 형태 입력">'
                                noCoorTxt+=   '<p class="check__confirm">좌표 입력</p><p class="check__spotDelete">장소 삭제</p>'
                                noCoorTxt+='</div>'
                                hasProblem = true;
                                siteHasProblem = true;
                                noCoor = true;
                            }
                        }

                    }else{
                        noSpotTxt+='<div class="check__line" id="'+site+'_'+i+'">'
                        noSpotTxt+=   '<p class="check__txt">'+i+' 번 관광지</p>'
                        noSpotTxt+=   '<p class="check__spotDelete">장소 삭제</p>'
                        noSpotTxt+='</div>'
                        hasProblem = true;
                        siteHasProblem = true;
                        noSpot = true;
                    }
                }

                if(noCoor){
                    txt += noCoorTxt;
                }
                if(noSpot){
                    txt += noSpotTxt;
                }

                if(data[site].length>150){
                    let largeOK = true;
                    if(data.largeData){
                        if(data.largeData[site]){
                            //150개 이상의 데이터를 보유하려면 도시명/spots/largeData/사이트명이 true라고 부여되어야 함
                        }else{
                            largeOK = false;
                        }
                    }else{
                        largeOK = false;
                    }

                    if(!largeOK){
                        hasProblem = true;
                        siteHasProblem = true;
                        txt+='<p class="check__subTitle">'+siteObj[site]+' 장소 데이터가 150개를 초과('+data[site].length+'개)합니다.</p>'
                        txt+='<div class="check__line" id="'+site+'">'
                        txt+=   '<input class="check__remainNumber" value="'+data[site].length+'">'
                        txt+=   '<p class="check__remainLargeData">개의 장소 유지하기</p>'
                        txt+='</div>'
                    }

                }

            }else{
                txt+='<p class="check__title">'+siteObj[site]+' 데이터가 존재하지 않습니다.</p>'
                hasProblem = true;
                siteHasProblem = true;

                // TODO: 원래 사이트 데이터가 존재하지 않는 경우를 대비한 버튼을 만들고 site 값으로 nodata: true를 넣어준다.
            }
            if(!siteHasProblem){
                txt+= '<p class="check__subTitle">발견된 문제가 없습니다</p>'
            }
        }

        if(hasProblem){
            txt += '<p class="check__finish">검사를 모두 마쳤습니다</p>'
            $(".spot .check").html(txt);
        }else{
            toast("발견된 문제가 없어 데이터 병합을 실시합니다.")
            this.autoCombine__spotRestructure();
        }
    }
}

export default Spot;
