import ManualCombine from "./manualCombine.js";
import Verify from "./spot/verifying.js";
import { totalmem } from "os";

//Spot의 단계는 총 4단계 - 데이터 수집/1차검증 -> 데이터 합치기 -> 데이터 선별/2차검증 -> 완료

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

        $(".spot .check").on("click", ".check__remainLargeData", function(){
            that.setRemainNumber($(this).parent().attr("id"), $(this).parent().children(".check__remainNumber").val());
        })

        $(".spot .check").on("click", ".check__nodata", function(){
            var sid = $(this).attr('sid');
            that.siteNodata(sid);
            toast('데이터 공백 처리')
        })
    },


    init: function(status, cid, name){
        var that = this;
        firebase.database().ref('cities/' + cid).once("value", snap => {
            $(".loadingView").addClass("displayNone")

            var data = snap.val()
            this.data = snap.val();
            
            if(status == 4){

            } else if(status == 3){
                Verify.init(data.spots.combined);
            } else if (status == 2) {
                ManualCombine.init(data.spots);
            } else if (status == 1) {
                this.firstCheck(data.spots)
            } else {

            }

            this.listener();

            $(".cityCodeView").addClass("displayNone");
            $(".city .spot").removeClass("displayNone");
            $(".cityName").html(name).attr("id", cid);
        })

    },

    autoCombine__spotRestructure: function(){
        let city = $(".cityName").attr("cid");
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
                        if(data[site][i]&&!data[site][i].deleted){
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

        let city = $(".cityName").attr("cid");

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
                    if(!tSpot.deleted){
                        let dif = calculateDif(spot.coor, tSpot.coor)

                        if(dif<250){
                            combineObj[code].combine[tCode] = tSpot;
                            hasCombined = true;
                        }
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
        let city = $(".cityName").attr("cid");
        let site = sid.split("_")[0];
        let no = sid.split("_")[1];

        if(confirm(name + " 장소를 제거합니다. 계속할까요?")){
            firebase.database().ref("cities/"+ city + "/spots/" + site + "/" + no ).set({deleted: true});
            $("#"+sid).remove();
            toast("장소가 제거되었습니다.")
        }
    },

    inputCoordinate: function(sid, coorTxt){
        let city = $(".cityName").attr("cid");
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
    }
}

export default Spot;
