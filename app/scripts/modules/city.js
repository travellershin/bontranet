import Spot from "./city/spot.js";

let City = {
    codeData: {},

    cityData: {},

    listener: function(){
        let that = this;

        $(".cityCodeView").on("click", ".spots", function(){
            let cid = $(this).parent().attr("id")
            let name = $(this).parent().children(".name").html();
            Spot.init(that.cityData[cid], cid, name);
        })

        $(".header__return").click(function(){
            that.returnToCityView();
        })

        $(".spot .check").on("click", ".check__remainLargeData", function(){
            that.setRemainNumber($(this).parent().attr("id"), $(this).parent().children(".check__remainNumber").val());
        })
    },

    setRemainNumber: function(site, number){
        let city = $(".cityName").attr("id");
        let cutNo = number.trim()*1;

        if(cutNo<100){
            toast("100개 이상의 장소를 유지해주세요");
        }else{
            if(confirm("순위 "+ cutNo + "위 미만 장소를 모두 제거합니다. 맞습니까?")){
                let cutObj = this.cityData[city].spots[site];
                cutObj.length = cutNo;

                firebase.database().ref("cities/"+ city + "/spots/" + site).set(cutObj);
            }
        }
    },


    returnToCityView: function(){
        $(".cityCodeView").removeClass("displayNone");
        $(".city .spot").addClass("displayNone");
        $(".city .spot .check").html("")

        this.inflate_cityCodeView(this.codeData, this.cityData)
    },


    inflate_cityCodeView: function(codeData,data){
        let txt = '<div class="line top"><p class="name">도시명</p><p class="hotels">숙소</p><p class="spots">관광지 정리</p><p class="area">지역</p><p class="price">물가</p></div>'
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
                    let spot = data[city.code].spots
                    if(spot.combined&&!spot.combining){
                        txt+= '<p class="spots">1차 자료정리 완료</p>'
                    }else if(spot.combining){
                        txt+= '<p class="spots">데이터 합치기 작업중</p>'
                    }else{
                        txt+= '<p class="spots">데이터 수집, 검증중</p>'
                    }
                }

                if(data[city.code].area){
                    txt+= '<p class="area">O</p>'
                }else{
                    txt+= '<p class="area">X</p>'
                }

                if(data[city.code].price){
                    txt+= '<p class="price">O</p>'
                }else{
                    txt+= '<p class="price">X</p>'
                }

                txt+= '</div>'

            }else{
                txt+='<div class="line" id="'+city.code+'"><p class="name nodata">'+city.name+'</p>'
                txt += '<p class="hotels">X</p><p class="spots">데이터 없음</p><p class="area">X</p><p class="price">X</p></div>'
            }
        }

        $(".cityCodeView").html(txt)

    },

    init: function(id, name, grade){
        let that = this;
        this.listener();

        firebase.database().ref().once("value", snap =>{
            $(".loadingView").addClass("displayNone")
            let codeData = snap.val().setting.cities;
            let data = snap.val().cities
            this.cityData = data;
            this.codeData = codeData;
            this.inflate_cityCodeView(codeData, data)
        })
    }
}

export default City;
