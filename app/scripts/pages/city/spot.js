import ManualCombine from "./manualCombine.js";
import Verify from "./spot/verifying.js";

//Spot의 단계는 총 4단계 - 데이터 수집/1차검증 -> 데이터 합치기 -> 데이터 선별/2차검증 -> 완료

let Spot = {

    data:{},

    listener: function(){
        let that = this;

        $(".spot .check").on("click", ".check__confirm", function(){
            that.inputCoordinate($(this).parent().attr("id"), $(this).parent().children(".check__spotCoor").val());
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

    }
}

export default Spot;
