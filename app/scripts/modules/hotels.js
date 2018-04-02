import Spots from "./spots.js";

let Hotels = {

    hotels: {},
    scoreArray: [],
    scoreSumObj:{},
    marker:{},
    spotScoreObj:{},
    spotScoreArray:{},
    peopleNo: 1,

    init(db){
        this.hotels = db;
    },

    calculate(selected,spots){
        for (var hid in this.hotels) {
            this.scoreSumObj[hid] = this.hotels[hid].scoreSum;
            this.spotScoreObj[hid] = 0;
        }

        for (var i = 0, max = selected.length; i < max; i++) {
            if(selected[i]){
                if(spots[i].hotels){
                    let spotScore = spots[i].hotels;
                    if(spotScore.foot){
                        for (var j = 0; j < spotScore.foot.length; j++) {
                            this.scoreSumObj[spotScore.foot[j].id] += (1500 - spotScore.foot[j].distance)/2000;
                            // TODO: 여기는 id라고 해놓고
                            this.spotScoreObj[spotScore.foot[j].id] += (1500 - spotScore.foot[j].distance)/1000;
                        }
                    }
                    if(spotScore.transport){
                        let len = Math.min(spotScore.transport.length,150);
                        for (var j = 0; j < len; j++) {
                            this.scoreSumObj[spotScore.transport[j].hid] += (20000 - spotScore.transport[j].distance)/25000;
                            // TODO: 여기는 hid라고 해놓았으니 리팩토링때 반드시 수정할것
                            this.spotScoreObj[spotScore.transport[j].hid] += (20000 - spotScore.transport[j].distance)/15000;
                        }
                    }
                }
            }
        }
        this.spotScoreArray = [];
        this.scoreArray = [];
        for (var hid in this.spotScoreObj) {
            this.spotScoreArray.push({hid:hid,score:this.spotScoreObj[hid]})
        }
        for (var hid in this.scoreSumObj) {
            this.scoreArray.push({hid:hid,score:this.scoreSumObj[hid]})
        }
        this.scoreArray.sort(function(a, b){
            return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
        })
        this.spotScoreArray.sort(function(a, b){
            return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
        })

        let gradeCut = [0,25,70,131,191,251,301,336,361];
        let grade = [5,4.5,4,3.5,3,2.5,2,1.5]
        // TODO: 이렇게 막 하는 대신 호텔 비율 나누는것도 자동화하기

        for (var j = 0; j < 8; j++) {
            for (var i = gradeCut[j]; i < (gradeCut[j+1]); i++) {
                this.hotels[this.spotScoreArray[i].hid].score.spot = grade[j]
            }
        }
        this.loading();
    },

    mouseOver: function(i){
        this.hotels[i].infowindow.open(map, this.hotels[i].marker);
    },
    mouseOut: function (i){
        this.hotels[i].infowindow.close(map, this.hotels[i].marker);
    },

    loading: function(){
        let that = this;
        let stepIdx = 0;
        let loadArray = [
            '<span class="icon icon--score-spot"></span>선택한 관광지에 대한 경로 분석중',
            '<span class="icon icon--score-transit"></span>주변 대중교통 정보 분석중',
            '<span class="icon icon--score-safety"></span>주변 치안 분석중',
            '<span class="icon icon--score-facility"></span>주변 편의시설 분석중'
        ]
        let dotArray = ["&nbsp;&nbsp;",".&nbsp;","..","&nbsp;&nbsp;",".&nbsp;",".."]
        let loading = function(idx){
            $(".hotelLoadingWord").html(loadArray[Math.floor(idx/6)] + dotArray[idx%6]);
            idx++;
            if(idx<24){
                setTimeout(function () {
                    loading(idx)
                }, 250+(idx%2)*100);
            }else{
                $(".showSpot").removeClass("displayNone")
                $(".hotelsDiv").removeClass("displayNone")
                $(".hotels_setter").removeClass("displayNone");
                $(".hotelsLoader").addClass("displayNone");
                that.inflate();
            }
        }
        loading(0)
    },

    inflate(){
        let txt = '';
        let hidArray = [];

        for (var i = 0; i < 15; i++) {
            if(this.marker[i]){
                this.marker[i].setMap(null)
            }
            let hotel = this.hotels[this.scoreArray[i].hid];
            hidArray.push(this.scoreArray[i].hid);

            let rank = (i+1);
            let korName = hotel.name.ko;
            let engName = hotel.name.en;
            let star = hotel.star;
            let halfStar = false;
            if(star%1 === 0.5){
                star -= 0.5;
                halfStar = true;
            }

            let ratingScore = hotel.grade_avg;
            let currentPrice = "144,802";
            let crossedOutPrice = "199,900";
            let score = {facility:hotel.score.facility, safety:hotel.score.safety, transit: hotel.score.transit, spot: hotel.score.spot}

            let imgUrl = hotel.photo[0]
            if(!imgUrl){
                console.log("이미지없다")
            }
            txt+='<div class="hotelCardWrap" id="'+this.scoreArray[i].hid+'"><div class="hotelCard"><div class="basicInfo"><div class="hotel_rank"><img src="./assets/label.svg"><p>';
            txt+= rank + '위</p></div><div class="thumbFrame"><img class="hotelThumb" src="' + imgUrl + '" alt="호텔 사진"></div><div class="textInfo">';
            txt+= '<h3 class="ko">' + korName + '</h3><p class="hotelName_en">' + engName + '</p><div class="rating"><p class="subTitle ko">성급</p>';
            for (var j = 0; j < 5; j++) {
                if(j<star){
                    txt+='<span class="icon icon--stars-full"></span>'
                }else if(j===star && halfStar){
                    txt+='<span class="icon icon--stars-half"></span>'
                }else{
                    txt+='<span class="icon icon--stars-empty"></span>'
                }
            }
            txt+='<p class="subTitle ko">평점</p><p class="ratingScore">'+ratingScore+'</p></div><div class="hotel_price"><p class="current"></p>'
            txt+= '<p class="crossedOut"></p></div></div></div><div class="scoreInfo">'
            txt+= '<div class="line"><span class="icon icon--score-spot"></span><p class="infoTxt ko">관광지 접근성</p><p class="score ko score_spot">'
            txt+= score.spot + '</p><span class="icon icon--score-transit"></span><p class="infoTxt ko">대중교통</p><p class="score ko score_transit">'
            txt+= score.transit + '</p><span class="icon icon--score-safety"></span><p class="infoTxt ko">치안</p><p class="score ko score_safety">'
            txt+= score.safety + '</p></div><div class="line"><span class="icon icon--score-facility"></span><p class="infoTxt ko">주변편의시설</p><p class="score ko score_facility">'
            txt+= score.facility + '</p><p class="hint">*5.0 만점</p></div></div></div></div>'

            let iwTxt = '<div class="hotelCard_map"><div class="imgSizer"><img src="'+imgUrl+'"></div><div class="iw_rank"><img src="./assets/label.svg"><p class="rank">'+rank+'위</p></div><div class="contents">'
            iwTxt+= '<p class="name_ko ko">'+korName+'</p><p class="name_en">'+engName+'</p><div class="infoinfo"><div class="liner"><p class="subTitle ko">성급</p>'
            for (var j = 0; j < 5; j++) {
                if(j<star){
                    iwTxt+='<span class="icon icon--stars-full"></span>'
                }else if(j===star && halfStar){
                    iwTxt+='<span class="icon icon--stars-half"></span>'
                }else{
                    iwTxt+='<span class="icon icon--stars-empty"></span>'
                }
            }

            iwTxt+='</div><div class="liner"><p class="subTitle ko">평점</p><p class="ratingScore">'+ratingScore+'</p></div>'

            iwTxt+='<div class="hotel_price" id="iw_'+this.scoreArray[i].hid+'"><p class="current"></p><p class="crossedOut"></p></div></div></div></div></div>'

            hotel.infowindow = new google.maps.InfoWindow({
                content: iwTxt
            })
        }
        $(".hotelsDiv").html(txt);

        console.log(hidArray)
        let postData = {
            hotelId : hidArray,
        	checkIn:"2018-04-04",
        	checkOut:"2018-04-05",
        	adult:2
        }

        $.ajax({
            method: 'POST',
            url: '/agoda',
            data:JSON.stringify(postData),
            contentType:'application/json',
            dataType:'json',
            success: function (data) {
                console.log(data)
                for (var i = 0; i < data.results.length; i++) {
                    let crossPrice = ""

                    if(data.results[i].crossedOutRate>0){
                        crossPrice += '&#8361;'+data.results[i].crossedOutRate
                    }
                    let curPrice = "&#8361;" + data.results[i].dailyRate

                    let id = data.results[i].hotelId;

                    $("#"+id+" .current").html(curPrice);
                    $("#"+id+" .crossedOut").html(crossPrice);
                    $("#iw_"+id+" .current").html(curPrice);
                    $("#iw_"+id+" .crossedOut").html(crossPrice);
                }

            }
        })
        let that = this;

        let showCard = function(showIdx){
            let hotel = that.hotels[that.scoreArray[showIdx].hid];
            let hid = that.scoreArray[showIdx].hid;
            let xOrigin = 13
            if(showIdx>8){
                xOrigin = 12
            }
            if(showIdx === 0){
                map.setZoom(14);
                map.setCenter(hotel.coor);
            }

            if(showIdx<15){
                $(".hotelCardWrap").eq(showIdx).addClass("normalScale");
                showIdx++
                $(".noOfHotel").html(showIdx)
                setTimeout(function () {
                    showCard(showIdx);
                    hotel.marker = new google.maps.Marker({
                        position: hotel.coor,
                        map: map,
                        zIndex: 100 - showIdx,
                        icon:{
                            url: "./assets/hotelpin-map.svg",
                            labelOrigin: new google.maps.Point(xOrigin, 15)
                        },
                        label:{
                            text:""+(showIdx)+"위",
                            color:"white",
                            fontSize: '11px',
                            letterSpacing:'-1px'
                        }
                    });

                    hotel.marker.addListener('mouseover', function () {
                        hotel.infowindow.open(map, hotel.marker);
                        $(".hotelCardWrap[id='" + hid + "']").addClass("hotelFriendOver");
                        let totalHeight = $(".hotels").height();
                        let targetScroll = $(".hotelCardWrap[id='" + hid + "']").position().top;
                        let currentScroll = $(".hotels").scrollTop();

                        if(targetScroll > totalHeight - 100){
                            $(".hotels").stop().animate({scrollTop:currentScroll + targetScroll - 100}, 300);
                        }else if(targetScroll<0){
                            $(".hotels").stop().animate({scrollTop:currentScroll + targetScroll - 100}, 300);
                        }
                    });

                    hotel.marker.addListener('mouseout', function () {
                        hotel.infowindow.close(map, hotel.marker);
                        $(".hotelCardWrap[id='" + hid + "']").removeClass("hotelFriendOver");
                    });




                }, 200);
            }
        }
        setTimeout(function () {
            showCard(0)
        }, 100);

    },

    showDetail: function(hid, rank, selected, checkIn, checkOut){
        console.log(rank)
        $(".hotelDetail .info").html("")
        $(".wrap_hotelDetail").removeClass("displayNone");
        let hotel = this.hotels[hid];

        let star = hotel.star;
        let halfStar = false;
        if(star%1 === 0.5){
            star -= 0.5;
            halfStar = true;
        }

        $(".hotelDetail .rank").html((rank+1)+"위");
        $(".hotelDetail .hotelName_ko").html(hotel.name.ko);
        $(".hotelDetail .hotelName_en").html(hotel.name.en);
        $(".starAndRating>.icon").removeClass("icon--stars-half icon--stars-empty icon--stars-full")

        for (var j = 0; j < 5; j++) {
            if(j<star){
                $(".starAndRating>.icon").eq(j).addClass("icon--stars-full");
            }else if(j===star && halfStar){
                $(".starAndRating>.icon").eq(j).addClass("icon--stars-half");
            }else{
                $(".starAndRating>.icon").eq(j).addClass("icon--stars-empty");
            }
        }
        $(".hotelDetail .ratingScore").html(hotel.grade_avg);
        $(".hotelDetail .hotelImg").attr("src",hotel.photo[0]);
        if(!hotel.photo){
            // TODO: 이미지 없는경우
            console.log("이미지없다")
        }
        $(".scoreOval").removeClass("so_full so_half")

        if(star%1 === 0.5){
            star -= 0.5;
            halfStar = true;
        }

        for (var criteria in hotel.score) {
            let halfScore = false;
            let score = hotel.score[criteria];
            if(score%1 === 0.5){
                score -= 0.5;
                halfScore = true;
            }
            $(".hotelDetail .score_"+criteria).html(hotel.score[criteria])

            for (var i = 0; i < 5; i++) {
                if(i<score){
                    $("."+criteria+">.scoreOval").eq(i).addClass("so_full");
                }else if(i===score && halfScore){
                    $("."+criteria+">.scoreOval").eq(i).addClass("so_half");
                }
            }
        }
        let seltArray = [];
        for (var i = 0; i < selected.length; i++) {
            if(selected[i]){
                seltArray.push(i)
            }
        }
        let footArray = [];
        let footDistanceArray = [];
        let transitArray = [];

        if(hotel.spots.foot){
            for (var i = 0; i < hotel.spots.foot.length; i++) {
                let sid = hotel.spots.foot[i].id;
                if(seltArray.includes(sid)){
                    footArray.push(sid)
                    footDistanceArray.push(hotel.spots.foot[i].distance)
                }
            }
        }
        for (var i = 0; i < seltArray.length; i++) {
            let sid = seltArray[i]
            if(hotel.spots.transport[sid]){
                if(!footArray.includes(sid)){
                    transitArray.push(sid)
                }
            }
        }


        let text_spot = ""

        if(footArray.length>0){
            text_spot += "선택한 " + seltArray.length + "개 중 " + footArray.length+"개의 관광지가 도보 20분거리 이내에 위치하고 있고, ";
            text_spot += "나머지 "+(seltArray.length - footArray.length) +"개 중 "+transitArray.length+"개의 관광지를 지하철로 환승 없이 갈 수 있습니다."
        }else if(transitArray.length>0){
            text_spot += "선택한 " + seltArray.length + "개의 관광지 중 도보로 갈 수 있는 관광지는 없지만 ";
            text_spot += transitArray.length+"개의 관광지를 지하철로 환승 없이 갈 수 있습니다."
        }else{
            text_spot += "선택한 관광지가 너무 적어 관광지 접근성을 계산할 수 없습니다."
        }

        let text_transit = "";

        if(hotel.metro){
            let metArray = Object.keys(hotel.ownMetro);
            text_transit += "도보 10분거리 이내에 "+hotel.metro.length+"개의 지하철 역이 있고, 지나는 노선은 "

            for (var i = 0; i < metArray.length; i++) {
                text_transit += '<span class="lineName ln_'+metArray[i]+'">'+metArray[i]+'</span>'
            }

            text_transit +=" 입니다. "
        }else{
            text_transit += "주변에 지하철 역이 없습니다!"
        };

        switch (hotel.score.transit) {
            case 5:
                text_transit+="대중교통의 최고 요지에 위치한 숙소입니다."
                break;

            case 4.5:
                text_transit+="대중교통을 이용하기 매우 편리한 위치에 있는 숙소입니다."
                break;

            case 4:
                text_transit+="주변 대중교통이 잘 발달된 편입니다."
                break;

            default:
            text_transit+=""
        }

        let text_safety = "";

        switch (hotel.area){
            case 7:
                text_safety+="뉴욕 맨해튼 내에서도 유동인구가 가장 많은 타임스퀘어 부근에 위치한 숙소입니다. "
                break;

            case 0:
                text_safety+="뉴욕 맨해튼 내에서도 안전한 편에 속하는 금융지구에 위치한 숙소입니다. "
                break;

            case 9:
                text_safety+="뉴욕 내 최상류층이 거주하는 어퍼 이스트 사이드에 위치한 숙소입니다. "
                break;

            default:
            text_safety+=""
        }

        if(hotel.score.safety>4.4){
            if(hotel.score.facilicy>4.4){
                if(hotel.local.policeStation){
                    text_safety+="주변에 상점이 많이 있으며 경찰서가 가까운 곳에 있어 굉장히 안전합니다."
                }else if(hotel.score.transit > 4.4){
                    text_safety+="주변에 상점이 많고 지하철역이 가까운 곳에 있어 밤 늦게 다니기에도 나쁘지 않습니다."
                }else{
                    "주변에 상점 등 편의시설이 잘 갖추어져 있어 전반적으로 치안이 좋습니다."
                }
            }else if(hotel.local.policeStation){
                text_safety+="경찰서가 가까운 곳에 있어 굉장히 안전합니다."
            }else if(hotel.score.transit > 4.4){
                text_safety+="지하철역이 가까운 곳에 있어 밤 늦게 다니기에도 나쁘지 않습니다."
            }else{
                text_safety+="치안이 좋은 편입니다."
            }
        }else if(hotel.score.safety>3.4){
            if(hotel.score.facilicy>4.4){
                if(hotel.score.transit > 4.4){
                    text_safety+="주변에 상점이 많고 지하철역이 가까운 곳에 있어 치안이 괜찮은 편입니다."
                }else{
                    text_safety+="주변에 편의시설이 잘 갖추어진 편이라 치안이 괜찮은 편입니다."
                }
            }else if(hotel.score.transit > 4.4){
                text_safety+="지하철역이 가까운 곳에 있어 치안이 괜찮은 편입니다."
            }else{
                text_safety+="치안이 나쁘지는 않습니다."
            }
        }else{
            text_safety+="이 숙소 주변지역의 치안은 보통 수준입니다."
        }

        let text_facility = "";

        if(hotel.score.facility > 4.4){
            text_facility += "주변 편의시설이 잘 형성되어 있습니다. "
            if(hotel.local.grocery.nearest<150){
                text_facility += "가장 가까운 식료품점이 도보 1~2분거리 내에 위치하고 있습니다."
            }else if(hotel.local.grocery.nearest<200){
                text_facility += "가장 가까운 식료품점이 도보 3~4분거리 내에 위치하고 있습니다."
            }else{
                text_facility += "숙소 주변에 많은 식료품점들이 있습니다."
            }
        }else if(hotel.score.facility === 4){
            text_facility += "주변 편의시설이 잘 형성된 편입니다. "
            if(hotel.local.grocery.nearest<150){
                text_facility += "가장 가까운 식료품점이 도보 1~2분거리 내에 위치하고 있습니다."
            }else if(hotel.local.grocery.nearest<200){
                text_facility += "가장 가까운 식료품점이 도보 3~4분거리 내에 위치하고 있습니다."
            }else{
                text_facility += "숙소 주변에 식료품점들이 있습니다."
            }
        }else{
            text_facility += "이 숙소 주변지역의 편의시설은 보통 수준입니다."
        }

        $(".hotelDetail .infoTxt").eq(0).html(text_spot)
        $(".hotelDetail .infoTxt").eq(1).html(text_transit)
        $(".hotelDetail .infoTxt").eq(2).html(text_safety)
        $(".hotelDetail .infoTxt").eq(3).html(text_facility)

        console.log(hotel);



        let footTxt = "";
        let metroTxt = "";

        if(footArray.length>0){
            for (var i = 0; i < footArray.length; i++) {
                let data = Spots.list[footArray[i]];

                footTxt += '<div class="spotCardWrapper selected"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                footTxt += '<div class="infoImage ny_'+footArray[i]+'"></div></div><p class="rank">'+(data.rank+1)+'위</p><div class="contents">';
                footTxt += '<p class="name_ko ko">'+data.name+'</p><p class="name_en">'+data.name+'</p><p class="description">'+data.description+'</p></div>'
                footTxt += '<div class="footer"><p>숙소로부터 '+footDistanceArray[i]+'m</p></div></div></div>'

            }
        }
        if(hotel.spots.foot){
            for (var i = 0; i < hotel.spots.foot.length; i++) {
                let sid = hotel.spots.foot[i].id;
                let distance = hotel.spots.foot[i].distance;
                if(!footArray.includes(sid)){
                    let data = Spots.list[sid]

                    footTxt += '<div class="spotCardWrapper unSelected"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                    footTxt += '<div class="infoImage ny_'+sid+'"></div></div><p class="rank">'+(data.rank+1)+'위</p><div class="contents">';
                    footTxt += '<p class="name_ko ko">'+data.name+'</p><p class="name_en">'+data.name+'</p><p class="description">'+data.description+'</p></div>'
                    footTxt += '<div class="footer"><p>숙소로부터 '+distance+'m</p></div></div></div>'
                }
            }
        }

        if(transitArray.length>0){
            for (var j = 0; j < transitArray.length; j++) {
                let sid = transitArray[j];

                let data = Spots.list[transitArray[j]];

                let howToGo = ""
                let line = hotel.spots.transport[sid].line;

                let metroDistance = 0
                let nearMetroFromHotel = ""
                let howFarFromHotel = 2000;
                let lineName = ""
                for (var i = 0; i < line.length; i++) {
                    if(hotel.ownMetro[line[i]].distance<howFarFromHotel){
                        howFarFromHotel = hotel.ownMetro[line[i]].distance;
                        nearMetroFromHotel = hotel.ownMetro[line[i]].name;
                        lineName = line[i];
                        metroDistance = hotel.spots.transport[sid].distance
                    }
                }

                let metrotime = 1 + Math.round(metroDistance/400)
                let timeFromHotel = Math.round(howFarFromHotel/70)
                let tSpot = Spots.list[sid].metro;

                let nearMetroFromSpot = ""
                let howFarFromSpot = 2000

                for (var i = 0; i < tSpot.length; i++) {
                    if(tSpot[i].line.includes(lineName)){
                        if(tSpot[i].distance < howFarFromSpot){
                            nearMetroFromSpot = tSpot[i].name;
                            howFarFromSpot = tSpot[i].distance
                        }
                    }
                }
                let timeFromSpot = Math.round(howFarFromSpot/70)
                let totalTime = timeFromSpot + metrotime + timeFromHotel;

                howToGo+='<p>숙소에서 <span class="lineName ln_'+lineName+'">'+lineName+'</span> '+nearMetroFromHotel+'까지 도보이동(약 '+timeFromHotel+'분, '+howFarFromHotel+'m)'+'</p>'
                howToGo+='<p><span class="lineName ln_'+lineName+'">'+lineName+'</span> '+nearMetroFromSpot+'에서 하차 (약 '+metrotime+'분)'+'</p>'
                howToGo+='<p>'+data.name+'까지 도보이동(약 '+timeFromSpot+'분, '+howFarFromSpot+'m)'+'</p>'

                metroTxt += '<div class="spotCardWrapper selected"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                metroTxt += '<div class="infoImage ny_'+transitArray[j]+'"></div></div><p class="rank">'+(data.rank+1)+'위</p><div class="contents">';
                metroTxt += '<p class="name_ko ko">'+data.name+'</p><p class="name_en">'+data.name+'</p><div class="description">'+howToGo+'</div></div>'
                metroTxt += '<div class="footer"><p>약 '+totalTime+'분 소요</p></div></div></div>'

            }
        }
        if(hotel.spots.transport){
            for (var j = 0; j < Object.keys(hotel.spots.transport).length; j++) {
                let sid =  Object.keys(hotel.spots.transport)[j]*1
                if(!transitArray.includes(sid)&&!footArray.includes(sid)){
                    let data = Spots.list[sid]

                    let howToGo = ""
                    let line = hotel.spots.transport[sid].line;

                    let metroDistance = 0
                    let nearMetroFromHotel = ""
                    let howFarFromHotel = 2000;
                    let lineName = ""
                    for (var i = 0; i < line.length; i++) {
                        if(hotel.ownMetro[line[i]].distance<howFarFromHotel){
                            howFarFromHotel = hotel.ownMetro[line[i]].distance;
                            nearMetroFromHotel = hotel.ownMetro[line[i]].name;
                            lineName = line[i];
                            metroDistance = hotel.spots.transport[sid].distance
                        }
                    }

                    let metrotime = 1 + Math.round(metroDistance/400)
                    let timeFromHotel = Math.round(howFarFromHotel/70)
                    let tSpot = Spots.list[sid].metro;

                    let nearMetroFromSpot = ""
                    let howFarFromSpot = 2000

                    for (var i = 0; i < tSpot.length; i++) {
                        if(tSpot[i].line.includes(lineName)){
                            if(tSpot[i].distance < howFarFromSpot){
                                nearMetroFromSpot = tSpot[i].name;
                                howFarFromSpot = tSpot[i].distance
                            }
                        }
                    }
                    let timeFromSpot = Math.round(howFarFromSpot/70)
                    let totalTime = timeFromSpot + metrotime + timeFromHotel;

                    howToGo+='<p>숙소에서 <span class="lineName ln_'+lineName+'">'+lineName+'</span> '+nearMetroFromHotel+'까지 도보이동(약 '+timeFromHotel+'분, '+howFarFromHotel+'m)'+'</p>'
                    howToGo+='<p><span class="lineName ln_'+lineName+'">'+lineName+'</span> '+nearMetroFromSpot+'에서 하차 (약 '+metrotime+'분)'+'</p>'
                    howToGo+='<p>'+data.name+'까지 도보이동(약 '+timeFromSpot+'분, '+howFarFromSpot+'m)'+'</p>'


                    metroTxt += '<div class="spotCardWrapper unSelected"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                    metroTxt += '<div class="infoImage ny_'+sid+'"></div></div><p class="rank">'+(data.rank+1)+'위</p><div class="contents">';
                    metroTxt += '<p class="name_ko ko">'+data.name+'</p><p class="name_en">'+data.name+'</p><div class="description">'+howToGo+'</div></div>'
                    metroTxt += '<div class="footer"><p>약 '+totalTime+'분 소요</p></div></div></div>'
                }
            }
        }

        $(".hotel_foot").html(footTxt);
        $(".hotel_metro").html(metroTxt);

        $(".goReservation>a").attr("href",'https://www.agoda.com/partners/partnersearch.aspx?cid=1799898&pcs=1&hid='+hid+'&checkin='+checkIn+'&checkout='+checkOut+'&h1=ko&adults='+this.peopleNo)

    }


}

export default Hotels;
