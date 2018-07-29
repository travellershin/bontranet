import Spot from "./city/spot.js";
//관광지 정리
import Hotel from "./city/hotel.js";
//호텔정보 관련
import Area from "./city/area.js";
//지역 데이터 입력

let City = {
    codeData: {},

    listener: function(){
        let that = this;

        $(".cityCodeView").on("click", ".spots", function(){
            let cid = $(this).parent().attr("id");
            let name = $(this).parent().children(".name").html();
            Spot.init($(this).attr('status'), cid, name);
        })
        $(".cityCodeView").on("click", ".hotels", function(){
            let cid = $(this).parent().attr("id");
            let name = $(this).parent().children(".name").html();
            Hotel.init(cid, name);
        })
        $(".cityCodeView").on("click", ".area", function(){
            let cid = $(this).parent().attr("id");
            let name = $(this).parent().children(".name").html();
            Area.init(cid, name);
        })

        $(".cityCodeView").on("click", ".transport", function(){
            that.metroAdjust($(this).parent().attr("id"));
            //도시별로 메트로 정보를 다듬는데 사용
        })

        $(".header__return").click(function(){
            that.returnToCityView();
        })
    },

    returnToCityView: function(){
        $(".city__pages").addClass("displayNone");
        $(".cityCodeView").removeClass("displayNone");
        $(".city .spot .check").html("");

        this.inflate_cityCodeView(this.codeData)
    },

    metroAdjust: function(cid){
        if(this.cityData[cid].metro){
            let data = this.cityData[cid].metro
            let nameArray = [];
            for (var i = 0; i < data.length; i++) {
                let metro = data[i];
                if(!metro.line){
                    console.log(metro.name)

                }
            }
            console.log(data)
            // firebase.database().ref("cities/"+cid+"/metro").update(data);
        }
    },


    inflate_cityCodeView: function(data){
        let txt = '<div class="line top"><p class="name">도시명</p><p class="hotels">숙소</p><p class="spots">관광지 정리</p><p class="area">지역</p><p class="transport">교통</p><p class="price">물가</p></div>'
        
        for (var code in data) {
            var city = data[code];
            var status = city.status;

            txt += '<div class="line" id="' + city.code + '"><p class="name">' + city.name + '</p>'

            if (status.hotel) {
                txt += '<p class="hotels">O</p>'
            } else {
                txt += '<p class="hotels">X</p>'
            }
            console.log(status)
            if (status.spot === 4) {
                txt += '<p class="spots" status="'+status.spot+'">데이터 확보 완료</p>'
            } else if (status.spot === 3) {
                txt += '<p class="spots" status="' + status.spot +'">데이터 선별, 2차 검증중</p>'
            } else if (status.spot === 2) {
                txt += '<p class="spots" status="' + status.spot +'">데이터 합치기 작업중</p>'
            } else if (status.spot === 1) {
                txt += '<p class="spots" status="' + status.spot +'">데이터 수집, 1차 검증중</p>'
            } else {
                txt += '<p class="spots" status="' + status.spot +'">데이터 없음</p>'
            }

            if (status.area) {
                txt += '<p class="area">O</p>'
            } else {
                txt += '<p class="area">X</p>'
            }

            if (status.transport) {
                txt += '<p class="transport">O</p>'
            } else {
                txt += '<p class="transport">X</p>'
            }

            if (status.prices) {
                txt += '<p class="price">O</p>'
            } else {
                txt += '<p class="price">X</p>'
            }
            txt += '</div>'
        }

        $(".cityCodeView").html(txt)

    },

    init: function(){
        this.listener();

        firebase.database().ref('setting/cities').on("value", snap =>{
            $(".loadingView").addClass("displayNone")

            var data = snap.val()
            this.inflate_cityCodeView(data)
            this.codeData = data;
        })

    }

}

export default City;
