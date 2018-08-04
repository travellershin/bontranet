let ManualCombine = {
    map: {},
    marker: {
        prime:{},
        target:[]
    },
    data:{},
    remain:0,

    listener: function(){
        let that = this;

        $(".combine__target").on("click", ".combine__target__div", function(){
            $(this).children(".combine__target__check").toggleClass("combine__target__checked");
        })

        $(".combine__main").on("click",".combine__nextStep", function(){
            that.nextStep();
        })
    },

    nextStep: function(){
        let city = $(".cityName").attr("id");

        let mainData = this.data.combining[$(".combine__main").attr("id")];

        for (var i = 0; i < $(".combine__target__checked").length; i++) {
            let tid = $(".combine__target__checked").eq(i).attr("sid")
            let targetData = mainData.combine[tid];

            //합쳐질 대상의 rank를 maindData의 rank로 통합하는 작업
            for (var site in targetData.rank) {
                if(mainData.rank[site]){
                    if(mainData.rank[site] > targetData.rank[site]){
                        mainData.rank[site] = targetData.rank[site];
                    }
                }else{
                    mainData.rank[site] = targetData.rank[site];
                }
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

            delete this.data.combining[tid];
            if(this.data.combined[tid]){
                delete this.data.combined[tid];
            }
        }
        mainData.name.ko = $("#name_ko").val();
        mainData.name.en = $("#name_en").val();

        delete mainData.combine;

        this.data.combined[$(".combine__main").attr("id")] = this.data.combining[$(".combine__main").attr("id")];
        delete this.data.combining[$(".combine__main").attr("id")];

        firebase.database().ref("cities/"+city+"/spots").update(this.data);


        if(Object.keys(this.data.combining).length>0){
            this.inflate();
        }else{
            firebase.database().ref("cities/"+city+"/status/spots").set("verifying")
            firebase.database().ref("cities/"+city+"/spots/combining").remove();
            toast("합치기 작업이 완료되었습니다! 2초 후 페이지를 새로고침합니다.")
            setTimeout(function () {
                location.reload();
            }, 2000);
        }
    },

    init: function(data){
        this.data = data;

        let that = this;

        $(".spot__page").addClass("displayNone");
        $(".spot__page.combine").removeClass("displayNone");
        $(".header__status").html("관광지 합치기");

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.74844, lng: -73.98566 },
            zoom: 17,
            mapTypeControl: false,
            scaleControl: true,
            fullscreenControl: false
        });

        this.map.addListener('click', function(e){
            that.chooseCoordinate(e);
        })

        this.inflate();
        this.listener();
    },

    chooseCoordinate: function(e){
        $(".combine__coordinate").html(e.latLng.lat()+","+e.latLng.lng());

        this.marker.prime.setMap(null)
        this.marker.prime = new google.maps.Marker({
            position: e.latLng,
            map: this.map
        })
    },

    inflate: function(){
        let data = this.data.combining;
        let txt = ''
        //기존에 찍혀있던 마커를 제거한다

        let keys = Object.keys(data);
        this.remain = keys.length;
        let spot = data[keys[0]];
        $(".combine__main").attr("id", keys[0]);

        console.log(spot)
        //이름 관련 정보 표시
        if(spot.name.ko.length>0){
            txt+='<p class="combine__name__prime">기준 장소명: '+ spot.name.ko +'</p>';
        }else{
            txt+='<p class="combine__name__prime">기준 장소명: '+ spot.name.en +'</p>';
        }
        txt+='<div class="combine__prime">'
        txt+=   '<div class="combine__prime__left">'
        txt+=      '<div class="combine__line">';
        txt+=        '<p class="combine__subTitle">한글명</p>';
        txt+=         '<input class="combine__input" id="name_ko" value="'+spot.name.ko+'">'
        txt+=      '</div>'
        txt+=      '<div class="combine__line">';
        txt+=         '<p class="combine__subTitle">영문명</p>';
        txt+=         '<input class="combine__input" id="name_en" value="'+spot.name.en+'">'
        txt+=     '</div>'
        txt+=   '</div>'
        txt+=   '<p class="combine__nextStep">다음</p>'
        txt+='</div>'


        //좌표 관련 정보 표시
        spot.coor.lat = spot.coor.lat*1;
        spot.coor.lng = spot.coor.lng*1;
        this.marker.prime = new google.maps.Marker({
            position: spot.coor,
            map: this.map
        });
        this.map.panTo(spot.coor);
        txt+='<div class="combine__line">';
        txt+=   '<p class="combine__subTitle">좌표';
        txt+=   '<p class="combine__coordinate">'+ spot.coor.lat +","+spot.coor.lng +'</p>';
        txt+='</div>';

        $(".combine__main").html(txt);

        txt='';
        let idx = 0;

        for (var sid in spot.combine) {
            idx++;
            let tSpot = spot.combine[sid];

            let latlng = {
                lat: tSpot.coor.lat*1,
                lng: tSpot.coor.lng*1
            }
            let tMarker = new google.maps.Marker({
                position:latlng,
                map: this.map,
                label: idx.toString()
            });
            this.marker.target.push(tMarker);

            //본명으로 한글명 영어명이 없을 경우를 체크해서 넣어준다.
            if($("#name_ko").val().length === 0){
                $("#name_ko").val(tSpot.name.ko)
            }
            if($("#name_en").val().length === 0){
                $("#name_en").val(tSpot.name.en)
            }

            txt+='<div class="combine__target__div">'
            txt+=   '<p class="combine__target__number">'+idx+'</p>'
            txt+=   '<div class="combine__target__check" sid="'+sid+'"></div>'
            txt+=   '<p class="combine__target__name">'+tSpot.name.ko+" "+tSpot.name.en+'</p>'
            txt+='</div>'
        }

        $(".combine__target").html(txt);
    }
}

export default ManualCombine;
