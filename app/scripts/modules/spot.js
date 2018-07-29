import Spot_Status from "./spot/status.js"
import First_check from "./spot/first_check.js";

var Spot = {
    cities: {},
    current:"", //현재 보고있는 도시 cid - firebase ref에 off 달기위해

    init: function (u_i){
        var that = this;

        firebase.database().ref('setting/cities').on("value", snap => {
            var data = snap.val()
            this.cities = data;

            Spot_Status.order = u_i.setting.spot.order;

            Spot_Status.data = data;
            Spot_Status.inflate();
        })

        Spot_Status.init(u_i);

        $(".spot").on("click", ".active", function () {
            var cid = $(this).parent().parent().attr('id');
            var status = that.cities[cid].status.spot;

            that.inflate_city(cid, status)
        })

        $(".spot").on("click", ".return", function () {
            Spot_Status.inflate();
        })

        $(".spot").on("click", ".check__remainLargeData", function () {
            First_check.setRemainNumber($(this).parent().attr("id"), $(this).parent().children(".check__remainNumber").val());
        })

        $(".spot").on("click", ".check__nodata", function () {
            var sid = $(this).attr('sid');
            First_check.siteNodata(sid);
            toast('데이터 공백 처리')
        })
    },

    inflate_city: function (cid, status){
        console.log(cid);
        var that = this;

        firebase.database().ref('cities/' + that.current).off("value");

        firebase.database().ref('cities/' + cid).on("value", snap => {
            that.current = cid;
            var data = snap.val();

            if (data) {
                var cityName = that.cities[cid].name;
                if (status === 0) {   //현재 정보수집상태 검증
                    $(".header").html('<h2>' + cityName + ' 정보검증</h2>').attr('cid', cid).addClass("cityName");
                    First_check.init(data.spots);
                } else if (status === 1) { //합치기작업

                } else {  //2차검증화면과 완료화면은 따로 차이가 없음

                }
            }else{
                toast('아무런 데이터가 없습니다. 데이터 수집을 먼저 진행해주세요.')
            }
        })
    }
}

export default Spot;