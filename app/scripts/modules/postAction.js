//6단계에 걸쳐 전처리 작업이 필요한지를 검증하고, 전처리하는 객체다.
let PostAction = {
    data : {},

    process: function(data){
        this.data = data;
        let that = this;

        //앞으로 6단계에 걸친 무결성 검증을 통과하면 전처리 작업은 끝났다고 간주되고, 마지막에 combine 단계로 넘어간다.
        let isPerfect = true;

        //이하 4개 이벤트 리스너는 구글 관광지에 대한 수동 좌표입력 관련 이벤트 리스너다.
        $(".coorZone").on("click", ".input",function(){
            that.inputCoor($(this).parent())
        })
        $(".coorZone").on("click", ".remove",function(){
            that.removeSpot($(this).parent().attr("idx"))
        })
        $(".coorZone").on("click", ".coor_spotName",function(){
            that.searchSpot($(this).html())
        })
        $(".passNaver").click(function(){
            that.reArrayNaver(that.data.nv);
        })
        $(".saveSpotData").click(function(){
            that.saveSpotData($(this).attr("sid"));
        })

        let noData = false;
        let dataTxt = ""

        //트립어드바이저 데이터가 없거나 70개 미만이면 문제가 있는 것
        if(!data.ta){
            isPerfect = false;
            noData = true;
            dataTxt += '트립어드바이저, '
        }else if(data.ta.length<70){
            isPerfect = false;
            $(".taHint").removeClass("displayNone")
        }

        //론리플래닛 데이터가 없으면 문제가 있는 것
        if(!data.lp){
            isPerfect = false;
            noData = true;
            dataTxt += '론리플래닛, '
        }

        //네이버 데이터가 있는지, 있더라도 중간에 빠진 번호가 있는지 체크.
        if(!data.nv){
            isPerfect = false;
            noData = true;
            dataTxt += '네이버, '
        }else{
            let isAnyEmpty = false;
            let eTxt = ""
            for (var i = 0; i < data.nv.length; i++) {
                if(!data.nv[i]){
                    isAnyEmpty = true;
                    isPerfect = false;
                    eTxt += (i+1)+", "
                }
            }
            eTxt = eTxt.slice(0,eTxt.length-2)
            eTxt+= "위 관광지들이 빠졌습니다. 다시 추출해주세요."
            if(isAnyEmpty){
                $(".naverNoInfo").removeClass("displayNone");
                $(".naverNoInfo .hintTxt").html(eTxt)
            }


            let noOfCrack = 0;

            let txt = ""
            for (var i = 0; i < data.nv.length; i++) {
                //좌표가 없거나 종종 이상한 좌표가 입력된 경우가 있어 아래와 같이 체
                if(data.nv[i]){
                    if(!data.nv[i].coor){
                        noOfCrack++;
                        txt+='<div class="coor_spot" sid="nv" idx='+i+'><p class="coor_spotName">'+data.nv[i].name+'</p><input class="coord" placeholder="xx.xxxx, oo.oooo 형태로 좌표 입력"><p class="input">입력</p><p class="remove">제거</p></div>'
                    }
                }
            }
            if(noOfCrack>0){
                isPerfect = false;
                $(".naverAction").removeClass("displayNone");
            }
            $(".naverAction .mainTxt").html("네이버에서 추출된 장소 중 "+noOfCrack+ "개의 장소에 대한 수동 좌표 입력이 필요합니다");
            $(".coorZone.naver_coorZone").html(txt);
        }

        //구글 데이터가 있는지, 있더라도 좌표가 이상하게 입력된 것이 있는지 체크
        if(!data.gg){
            isPerfect = false;
            noData = true;
            dataTxt += '구글, '
        }else{
            let noOfCrack = 0;

            let txt = ""
            for (var i = 0; i < data.gg.length; i++) {
                //좌표가 없거나 종종 이상한 좌표가 입력된 경우가 있어 아래와 같이 체
                if(data.gg[i]){
                    if(!data.gg[i].coor){
                        noOfCrack++;
                        txt+='<div class="coor_spot" sid="gg" idx='+i+'><p class="coor_spotName">'+data.gg[i].name+'</p><input class="coord" placeholder="xx.xxxx, oo.oooo 형태로 좌표 입력"><p class="input">입력</p><p class="remove">제거</p></div>'
                    }
                }

            }
            if(noOfCrack>0){
                isPerfect = false;
                $(".googleAction").removeClass("displayNone");
            }
            $(".googleAction .mainTxt").html("구글에서 추출된 장소 중 "+noOfCrack+ "개의 장소에 대한 수동 좌표 입력이 필요합니다");
            $(".coorZone.google_coorZone").html(txt);
        }
        if(noData){
            dataTxt = dataTxt.slice(0, dataTxt.length-2);
            dataTxt += ' 관광지 추출이 제대로 진행되지 않았습니다. 다시 진행해주세요. 원래 관광지 목록이 없다면 문의'
            $(".noData").html(dataTxt)
        }

        if(isPerfect){
            return true;
        }


    },

    inputCoor: function(dom){
        let cityCode = $("header>.cityName").attr("cid");
        let coor = dom.children(".coord").val();
        let sid = dom.attr("sid");
        let idx = dom.attr("idx");
        coor = coor.split(",");
        if(coor[1]){
            this.data[sid][idx].coor = {
                lat:coor[0]*1,
                lng:coor[1]*1
            }
            this.toast("관광지 좌표가 입력되었습니다.")

        }else{
            alert("좌표가 부정확하게 입력되었습니다.")
        }
    },

    removeSpot: function(idx){
        let spotName = $(".coor_spot[idx="+idx+"]").children(".coor_spotName").html()
        let coor = $(".coor_spot[idx="+idx+"]").children(".coord").val()
        let cityCode = $("header>.cityName").attr("cid");
        let canIDelete = false;

        if(coor.length>0){
            if(confirm(spotName + " 에 입력된 좌표도 사라집니다. 괜찮습니까?")){
                canIDelete = true;
            }
        }else{
            if(confirm(spotName + " 정보를 제거합니다. 괜찮습니까?")){
                canIDelete = true;
            }
        }
        if(canIDelete){
            delete this.data.gg[idx];
            $(".coor_spot[idx="+idx+"]").addClass("displayNone")
        }
    },

    searchSpot(spotName){
        let cityName = $("header>.cityName").html();
        window.open(
            'https://www.google.com/search?q='+cityName+"+"+spotName,
            '_blank'
        );
    },

    saveSpotData(sid){
        let cityCode = $("header>.cityName").attr("cid");
        if(confirm("지금까지의 작업 내용을 저장할까요?")){
            let newArray = [];
            for (var i = 0; i < this.data[sid].length; i++) {
                if(this.data[sid][i]){
                    newArray.push(this.data[sid][i])
                }
            }
            firebase.database().ref("cities/"+cityCode+"/spots/"+sid).set(newArray)
        }

    },

    reArrayNaver(nvData){

        let cityCode = $("header>.cityName").attr("cid");

        if(confirm("빠진 관광지들을 삭제할까요?")){
            let newNvArray = [];
            for (var i = 0; i < nvData.length; i++) {
                if(nvData[i]){
                    newNvArray.push(nvData[i])
                }
            }
            $(".naverAction .mainTxt").html("네이버 관광지들을 재편성했습니다.")
            $(".naverAction .hintTxt").addClass("displayNone");
            $(".naverAction .right").addClass("displayNone");

            firebase.database().ref("cities/"+cityCode+"/spots/nv").set(newNvArray)
        }
    },

    toast(txt){
        if($(".snackbar").length>0){
            $(".snackbar").remove();
        }
        $("body").append('<div class="snackbar">'+txt+'</div>');
        $(".snackbar").addClass("show");
        $(".snackbar").css("animation")

        setTimeout(function () {
            $(".snackbar").removeClass("show")
        }, 3000);
    }

}

export default PostAction;
