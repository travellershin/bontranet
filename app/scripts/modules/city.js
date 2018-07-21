import Spot from "./city/spot.js";
//관광지 정리
import Hotel from "./city/hotel.js";
//호텔정보 관련
import Area from "./city/area.js";
//지역 데이터 입력

let City = {
    codeData: {},
    cityData: {},

    listener: function(){
        let that = this;

        $(".cityCodeView").on("click", ".spots", function(){
            let cid = $(this).parent().attr("id");
            let name = $(this).parent().children(".name").html();
            Spot.init(that.cityData[cid], cid, name);
        })
        $(".cityCodeView").on("click", ".hotels", function(){
            let cid = $(this).parent().attr("id");
            let name = $(this).parent().children(".name").html();
            Hotel.init(that.cityData[cid], cid, name);
        })
        $(".cityCodeView").on("click", ".area", function(){
            let cid = $(this).parent().attr("id");
            let name = $(this).parent().children(".name").html();
            Area.init(that.cityData[cid], cid, name);
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

        this.inflate_cityCodeView(this.codeData, this.cityData)
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


    inflate_cityCodeView: function(codeData,data){
        let txt = '<div class="line top"><p class="name">도시명</p><p class="hotels">숙소</p><p class="spots">관광지 정리</p><p class="area">지역</p><p class="transport">교통</p><p class="price">물가</p></div>'
        for (var i = 0; i < codeData.length; i++) {
            let city = codeData[i];
            if(data[city.code]){
                txt+='<div class="line" id="'+city.code+'"><p class="name">'+city.name+'</p>'

                if(data[city.code].hotels){
                    txt+= '<p class="hotels">O</p>'
                }else{
                    txt+= '<p class="hotels">X</p>'
                }

                if(data[city.code].spots){
                    let spot = data[city.code].spots;

                    if(data[city.code].status){
                        if(data[city.code].status.spots === "finished"){
                            txt+= '<p class="spots">데이터 확보 완료</p>'
                        }else if(data[city.code].status.spots === "verifying"){
                            txt+= '<p class="spots">데이터 선별, 2차 검증중</p>'
                        }else if(spot.combining){
                            txt+= '<p class="spots">데이터 합치기 작업중</p>'
                        }else{
                            txt+= '<p class="spots">데이터 수집, 1차 검증중</p>'
                        }
                    }else if(spot.combining){
                        txt+= '<p class="spots">데이터 합치기 작업중</p>'
                    }else{
                        txt+= '<p class="spots">데이터 수집, 1차 검증중</p>'
                    }
                }

                if(!data[city.code].status){
                    firebase.database().ref("cities/"+ city.code + "/status").set({
                        spots:false
                    })
                }

                if(data[city.code].area){
                    txt+= '<p class="area">O</p>'
                }else{
                    txt+= '<p class="area">X</p>'
                }
                if(data[city.code].metro){
                    txt+= '<p class="transport">O</p>'
                }else{
                    txt+= '<p class="transport">X</p>'
                }

                if(data[city.code].price){
                    txt+= '<p class="price">O</p>'
                }else{
                    txt+= '<p class="price">X</p>'
                }

                txt+= '</div>'

            }else{
                txt+='<div class="line" id="'+city.code+'"><p class="name nodata">'+city.name+'</p>'
                txt += '<p class="hotels">X</p><p class="spots">데이터 없음</p><p class="area">X</p><p class="transport">X</p><p class="price">X</p></div>'
            }
        }

        $(".cityCodeView").html(txt)

    },

    init: function(id, name, grade){
        let that = this;
        this.listener();

        // firebase.database().ref().once("value", snap =>{
        //     $(".loadingView").addClass("displayNone")
        //     let codeData = snap.val().setting.cities;
        //     let data = snap.val().cities
        //     this.cityData = data;
        //     this.codeData = codeData;
        //     this.inflate_cityCodeView(codeData, data)
        //     console.log(data)
        // })
        console.log('init')
        firebase.database().ref('cities/nyc').once("value", snap =>{
            var data = snap.val();
            console.log(data);



        })

    }

}

export default City;
