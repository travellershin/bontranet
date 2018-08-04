let Area = {
    data:{},
    city:"",
    cityName:"",

    listener: function(){
        let that = this;
        $(".area__page").on("change", ".area__line input", function(){
            that.scoreChange($(this))
        })
    },

    init: function(data, cid, name){
        $(".cityName").html(name).attr("id", cid);
        $(".cityCodeView").addClass("displayNone");
        $(".city__pages ").addClass("displayNone");
        $(".area").removeClass("displayNone");
        this.data = data;
        this.city = cid;
        this.cityName = name;
        console.log(data)

        this.listener();
        this.inflate();
    },

    scoreChange: function(div){

        if(isNaN(div.val()*1)){
            toast("숫자로만 입력해주세요");
            div.val(0);
        }else{
            if(div.val()>10||div.val()<1){
                toast("1~10 사이의 숫자를 입력해주세요");
                div.val(0);
            }else{
                if(div.hasClass("input__score")){
                    let idx = $(".input__score").index(div);
                    div.val(div.val()*1)
                    toast(this.data.area[idx].name+"의 치안점수가 "+div.val()*1+"점으로 변경되었습니다.");
                    firebase.database().ref("cities/"+this.city+"/area/"+idx+"/safety/score").set(div.val())
                }else if(div.hasClass("input__misdemeanor")){
                    let idx = $(".input__misdemeanor").index(div);
                    div.val(div.val()*1)
                    toast(this.data.area[idx].name+"의 경범죄 점수가 "+div.val()*1+"점으로 변경되었습니다.");
                    firebase.database().ref("cities/"+this.city+"/area/"+idx+"/safety/misdemeanor").set(div.val())
                }
            }
        }
    },

    inflate: function(){
        let txt = '';
        let areadata = {}

        if(this.data.area){
            for (var i = 0; i < this.data.area.length; i++) {
                let area = this.data.area[i];
                console.log(area)
                if(!area.notArea){
                    //브로드웨이, 센트럴파크 등 넓은 지역을 차지하는 관광지도 area 취급하기 때문에 걸러내기
                    txt+='<div class="area__div">'
                    txt+=   '<div class="area__line">'
                    txt+=       '<p class="area__name">'+area.name+'</p>'


                    if(area.safety){
                        txt+=   '<p class="area__line__subTitle">치안점수</p>'
                        if(area.safety.score){
                            txt+='<input class="area__line__input--short input__score" value="'+area.safety.score+'">'
                        }else{
                            txt+='<input class="area__line__input--short input__score" value="0">'
                        }

                        txt+=   '<p class="area__line__subTitle">경범죄점수</p>'
                        if(area.safety.misdemeanor){
                            txt+='<input class="area__line__input--short input__misdemeanor" value="'+area.safety.misdemeanor+'">'
                        }else{
                            txt+='<input class="area__line__input--short input__misdemeanor" value="0">'
                        }
                    }else{
                        txt+=   '<p class="area__line__subTitle">치안점수</p>'
                        txt+=   '<input class="area__line__input--short input__score" value="0">'
                        txt+=   '<p class="area__line__subTitle">경범죄점수</p>'
                        txt+=   '<input class="area__line__input--short input__misdemeanor" value="0">'
                    }

                    txt+=   '</div>'
                    txt+='</div>'
                }
            }
        }

        $(".area__page").html(txt);
    }

}

export default Area;
