import Combine from "./combine.js"

let Action = {
    data: {},
    marker:{
        main:{},
        enterance:{}
    },

    init: function(data){
        this.data = data;
    },

    check: function(sid){
        $(".checkBox[sid="+sid+"]").toggleClass("checked")
    },

    toNext: function(){
        let mainData = this.data[$(".original").attr("oid")];

        if($(".nav_spot").hasClass("selected")){
            //첫번재 -> 두번째 탭으로 이동;
            for (var i = 0; i < $(".checked").length; i++) {
                let tid = $(".checked").eq(i).attr("sid")
                let targetData = mainData.combine[tid];

                //합쳐질 대상의 rank를 maindData의 rank로 통합하는 작업
                for (var site in targetData.rank) {
                    if(!mainData.rank[site] < targetData.rank[site])
                    mainData.rank[site] = targetData.rank[site];
                }

                //합쳐질 대상의 태그를 mainData의 tag로 통합하는 작업
                if(targetData.tag){
                    for (var j = 0; j < targetData.tag.length; j++) {
                        if(mainData.tag){
                            if(!mainData.tag.includes(targetData.tag[j])){
                                mainData.tag.push(targetData.tag[j])
                            }
                        }else{
                            mainData.tag = targetData.tag
                        }
                    }
                }

                //합쳐질 대상에게 url이 입력되어 있다면 mainData에 통합하는 작업
                if(!mainData.url){
                    if(targetData.url){
                        mainData.url = targetData.url;
                    }
                }

                delete this.data[tid]
            }
            mainData.name.ko = $("#name_ko").val();
            mainData.name.en = $("#name_en").val();
            mainData.name.local = $("#name_local").val();

            delete mainData.combine;

            $(".nav_spot").removeClass("selected");
            $(".nav_theme").addClass("selected");
            $(".target").addClass("displayNone");
            $(".theme").removeClass("displayNone");

            this.inflateTheme(mainData);

        }else if($(".nav_theme").hasClass("selected")){
            let data = this.data[$(".original").attr("oid")];
            let tagArray = [];

            for (var i = 0; i < $(".tagZone>input").length; i++) {
                let tag = $(".tagZone>input").eq(i).val();

                if(tag.length>0){
                    tagArray.push(tag)
                }
            }

            data.tag = tagArray

            $(".nav_theme").removeClass("selected");
            $(".nav_enterance").addClass("selected");
            $(".theme").addClass("displayNone");
            $(".enterance").removeClass("displayNone");
            $(".toNext").html("저장")

        }else if($(".nav_enterance").hasClass("selected")){
            let sid = $(".original").attr("oid")
            let mainData = this.data[sid];

            let coor = $(".coordinate_main").html().split(",");
            coor = {
                lat: coor[0]*1,
                lng: coor[1]*1
            }
            let enteranceArray = []

            for (var i = 0; i < $(".enterance_box>.liner").length; i++) {
                let line = $(".enterance_box>.liner").eq(i);

                if(line.children(".coordinate").html().length>0){
                    let entCoor = line.children(".coordinate").html().split(",");
                    entCoor = {
                        lat: entCoor[0]*1,
                        lng: entCoor[1]*1
                    }
                    enteranceArray.push(entCoor)
                }
            }
            mainData.coor = coor;
            mainData.enterance = enteranceArray

            let cityCode = "nyc";
            // TODO: 이게 당연히 바뀌어야 함

            firebase.database().ref(cityCode+"/spots/combined/"+sid).set(mainData);

            delete this.data[sid];
            firebase.database().ref(cityCode+"/spots/combining").set(this.data);
            $(".enterance_box").html("");
            $(".toNext").html("다음");
            for (var marker in this.marker.enterance) {
                if(this.marker.enterance[marker]){
                    this.marker.enterance[marker].setMap(null)
                }
            }
            if(this.marker.main){
                this.marker.main.setMap(null)
            }
            this.marker = {
                main:{},
                enterance:{}
            }

            Combine.inflate(this.data);

            $(".nav_enterance").removeClass("selected");
            $(".nav_spot").addClass("selected");
            $(".target").removeClass("displayNone");
            $(".enterance").addClass("displayNone");
        }

    },

    addEnterance: function(){
        let key = firebase.database().ref("forKey").push().key
        let txt = '<div class="liner" id="'+key+'"><p class="subtitle">입구</p><p class="coordinate_enterance coordinate"></p>'
        txt += '<p class="select">선택</p><p class="remove">제거</p></div>'
        $(".enterance_box").append(txt)
    },

    inflateTheme: function(data){
        let txt = "";

        if(data.tag){
            for (var i = 0; i < data.tag.length; i++) {
                txt+='<input value="'+data.tag[i]+'">'
            }
            $(".tagZone").html(txt);
        }

    },

    selectCoor: function(div){
        if(div.hasClass("selecting")){
            div.removeClass("selecting");
            div.parent().children(".select").removeClass("active");
        }else{
            $(".coordinate").removeClass("selecting");
            div.addClass("selecting")
            $(".enterance .select").removeClass("active")
            div.parent().children(".select").addClass("active");
        }
    },

    removeEnterance: function(key){
        if(this.marker.enterance[key]){
            this.marker.enterance[key].setMap(null);
        }

        $("#"+key).remove();
    },

    clickMap: function(e){
        $(".selecting").html(e.latLng.lat()+","+e.latLng.lng());
        $(".selecting").parent().children(".select").removeClass("active");
        if($(".selecting").hasClass("coordinate_main")){
            this.marker.main.setMap(null)
            this.marker.main = new google.maps.Marker({
                position: e.latLng,
                map: Combine.map
            })
        }else if($(".selecting").hasClass("coordinate_enterance")){
            let marker = new google.maps.Marker({
                position: e.latLng,
                map: Combine.map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });
            let key = $(".selecting").parent().attr("id");

            if(this.marker.enterance[key]){
                this.marker.enterance[key].setMap(null)
            }
            this.marker.enterance[key] = marker;
        }

        $(".selecting").removeClass("selecting");
    },

    saveSpot: function(sid){
        let cityCode = $(".cityName").attr("cid");
        let data = {
            name:{
                ko:"",
                en:"",
                local:""
            },
            url:""
        }
        console.log(sid)

        let name = $("#"+sid).children(".result_name").val().split("--");
        data.name.ko = name[0];
        data.name.en = name[1];
        data.url = $("#"+sid).children(".result_url").val()
        console.log(data)
        firebase.database().ref(cityCode+"/spots/combined/"+sid).update(data);

    },

    removeSpot: function(sid){
        let cityCode = $(".cityName").attr("cid");
        let name = $("#"+sid).children(".result_name").val().split("--")[0];
        if(confirm(name+" 관광지를 삭제하시겠습니까?")){
            firebase.database().ref(cityCode+"/spots/combined/"+sid).remove();
        }
    }
}

export default Action;
