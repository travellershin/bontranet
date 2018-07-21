let Hotel = {
    data: {},
    city: "",
    cityName: "",

    init: function(data, cid, name){
        $(".cityName").html(name).attr("id", cid);
        $(".cityCodeView").addClass("displayNone");
        $(".hotel").removeClass("displayNone");
        this.data = data;
        this.city = cid;
        this.cityName = name;
        console.log(data)

        this.score();
        //점수 부여를 실시한다.
    },

    score: function(){
        let status = false;

        if(this.data.status){
            if(!this.data.status.hotels){
                //stauts는 있는데 호텔에 대한 status 데이터가 없으면 만들어 넣는다.
                this.data.status.hotels = {
                    transport: false,
                    safety: false,
                    facility: false,
                    costEff: false
                }
            }
        }else{
            // status 데이터 자체가 없으면 만들어 넣는다.
            this.data.status = {
                hotels:{
                    transport: false,
                    safety: false,
                    facility: false,
                    costEff: false
                }
            }
        }

        status = this.data.status.hotels;

        //점수 체계가 완성되어있는지 검사하고 없으면 점수를 부여하는 함수를 실행한다
        if(status.transport){
            $("#status_transport").html("정보가 존재합니다.")
        }else{
            if(this.data.metro&&this.data.metroLine){
                $("#status_transport").html("대중교통 정보 발견. 교통 편의성을 계산합니다.")
                this.score_transport();
            }else{
                $("#status_transport").html("대중교통 정보가 입력되지 않아 교통 편의성을 계산할 수 없습니다. 데이터를 입력해주세요.")
            }
        }

        if(status.safety){
            $("#status_safety").html("정보가 존재합니다.")
        }else{
            this.score_safety();
        }

        if(status.facility){
            $("#status_facility").html("정보가 존재합니다.")
        }else{
            this.score_facility();
        }
        if(status.costEff){

        }
    },

    score_facility: function(){
        var data = this.data;

        var scoreArray = [];

        for (var hid in data.hotels) {
            var hotel = data.hotels[hid];
            var atm = hotel.local.atm;

            hotel.assessment.convenience = {
                score:0
            }

            var localScore = hotel.assessment.convenience.score;

            var groceryScore = 0;
            var citiScore = 0;
            var atmScore = 0;

            hotel.explain.local = [];

            var summary = '';
            var groceryTxt = ''

            if(hotel.local.grocery){
                hotel.local.grocery.sort(function(a, b){
                    return a-b;
                })

                var grocery75 = [];
                var grocery150 = [];
                var grocery225 = [];
                var grocery300 = [];

                localScore += Math.max((200 - hotel.local.grocery[0])/60, 0)

                for (var i = 0; i < hotel.local.grocery.length; i++) {
                    var dif = hotel.local.grocery[i];
                    if(dif<75){
                        grocery75.push(dif)
                        localScore+=0.1
                    }
                    if(dif<150){
                        grocery150.push(dif)
                        localScore+=0.025
                    }
                    if(dif<225){
                        grocery225.push(dif)
                        localScore+=0.005
                    }
                    if(dif<300){
                        grocery300.push(dif)
                        localScore+=0.0001
                    }
                }

                groceryScore+= (400 - hotel.local.nearest.grocery)/2
                groceryScore+=grocery75.length*3;
                groceryScore+=grocery150.length;
                groceryScore+=grocery225.length/2;

                if(hotel.local.nearest.grocery<60){

                    var groceryTime = (Math.round(hotel.local.nearest.grocery/14)+1)*10
                    groceryTxt+= '<strong>'+ groceryTime+'초 거리</strong>'

                    if(grocery75.length>1){
                        groceryTxt+= '의 가장 가까운 식료품점을 포함해 <strong>단 1분 거리에 '+grocery75.length+'개</strong>의 식료품점 위치.'
                    }else if(grocery150.length>1){
                        groceryTxt+= '의 가장 가까운 식료품점을 포함해 <strong>2분 거리에 '+grocery150.length+'개</strong>의 식료품점이 위치.'
                    }else if(grocery225.length>1){
                        groceryTxt+= '의 가장 가까운 식료품점을 포함해 <strong>3분 거리에 '+grocery225.length+'개</strong>의 식료품점이 위치.'
                    }else{
                        groceryTxt+= '에 가장 가까운 식료품점이 위치'
                    }
                }else if(grocery75.length>0){
                    groceryTxt+= '<strong>1분 거리</strong>'

                    if(grocery150.length>1){
                        groceryTxt+= '의 가장 가까운 식료품점을 포함해 <strong>2분 거리에 '+grocery150.length+'개</strong>의 식료품점이 위치.'
                    }else if(grocery225.length>1){
                        groceryTxt+= '의 가장 가까운 식료품점을 포함해 <strong>3분 거리에 '+grocery225.length+'개</strong>의 식료품점이 위치.'
                    }else{
                        groceryTxt+= '에 가장 가까운 식료품점이 위치'
                    }
                }else if(grocery150.length>0){
                    groceryTxt+= '<strong>2분 거리</strong>'

                    if(grocery225.length>1){
                        groceryTxt+= '의 가장 가까운 식료품점을 포함해 <strong>3분 거리에 '+grocery225.length+'개</strong>의 식료품점이 위치.'
                    }else if(grocery300.length>1){
                        groceryTxt+= '의 가장 가까운 식료품점을 포함해 <strong>4분 거리에 '+grocery300.length+'개</strong>의 식료품점이 위치.'
                    }else{
                        groceryTxt+= '에 가장 가까운 식료품점이 위치'
                    }
                }else if(grocery225.length>0){
                    groceryTxt+= '<strong>3분 거리</strong>'

                    if(grocery300.length>1){
                        groceryTxt+= '의 가장 가까운 식료품점을 포함해 <strong>4분 거리에 '+grocery300.length+'개</strong>의 식료품점이 위치.'
                    }else{
                        groceryTxt+= '에 가장 가까운 식료품점이 위치'
                    }
                }else{
                    if(hotel.local.grocery.length>1){
                        groceryTxt+= '<strong>5분 거리에 '+ hotel.local.grocery.length + '개</strong>의 식료품점이 위치'
                    }else{
                        groceryTxt+= '가장 가까운 식료품점이 5분거리에 위치'
                    }
                }

                hotel.explain.local.push(groceryTxt)

                if(groceryScore>210){
                    groceryTxt = '가볍고 저렴하게 아침식사를 해결하거나 간단한 요기거리를 사서 저녁에 숙소로 돌아오기 굉장히 편리함.'
                    hotel.explain.local.push(groceryTxt)
                }else if(groceryScore>180){
                    groceryTxt = '가볍고 저렴하게 아침식사를 해결하거나 간단한 요기거리를 사서 저녁에 숙소로 돌아오기 편리함.'
                    hotel.explain.local.push(groceryTxt)
                }else if(hotel.local.nearest.grocery<225){
                    groceryTxt = '가볍고 저렴하게 아침식사를 해결하거나 간단한 요기거리를 사서 저녁에 숙소로 돌아오기 편리한 편.'
                    hotel.explain.local.push(groceryTxt)
                }
            }else{
                groceryTxt += '숙소 주변에 식료품점이 없어 조금 불편할 수 있음.'
                hotel.explain.local.push(groceryTxt);
            }


            var open24CitiArray = [];

            if(atm.citi){
                atm.citi.sort(function(a, b){
                    return a.dif<b.dif ? -1 : a.dif >b.dif ? 1 : 0
                })
                var citidif = atm.citi[0].dif;

                for (var i = 0; i < atm.citi.length; i++) {
                    if(atm.citi[i].openHour === 'Open 24 hours a day'){
                        open24CitiArray.push({
                            dif:atm.citi[i].dif,
                            address:atm.citi[i].address,
                            coor:atm.citi[i].coor
                        })
                    }
                }

                open24CitiArray.sort(function(a, b){
                    return a.dif > b.dif ? 1 : a.dif < b.dif ? -1 : 0
                })

                var citiWord = ''

                if(citidif<60){
                    if(open24CitiArray.length>0){
                        var min = Math.floor(open24CitiArray[0].dif/75);
                        if(citidif === open24CitiArray[0].dif){
                            //24시간 오픈하는 씨티ATM이 1분거리
                            localScore+= 0.75;
                            citiWord+= '24시간 운영하는 씨티은행 ATM이 <strong>도보 단 1분거리</strong>에 있어 늦은 시간까지 안전하게 현금인출 가능'
                        }else{
                            //1분거리에 씨티ATM. 추가로 24시간 오픈하는 ATM이 있음
                            localScore+= 0.5;
                            citiWord+= '씨티은행 ATM이 <strong>도보 단 1분거리</strong>에 있고, ' + (min+1) + '~' + (min+2)+'분 거리에 24시간 운영하는 씨티 ATM이 있어 늦은 시간까지 비교적 안전하게 현금 인출 가능'
                        }
                    }else{
                        //씨티ATM이 1분거리
                        citiWord += '씨티은행 ATM이 <strong>도보 단 1분거리</strong>에 있어 씨티카드 이용자는 굉장히 편리하게 현금인출 가능'
                    }

                }else if(citidif<150){
                    if(open24CitiArray.length>0){
                        var min = Math.floor(open24CitiArray[0].dif/75);
                        if(citidif === open24CitiArray[0].dif){
                            //24시간 오픈하는 씨티ATM이 2분거리
                            localScore+= 0.4;
                            citiWord+= '24시간 운영하는 씨티은행 ATM이 <strong>도보 단 2~3분거리</strong>에 있어 늦은 시간까지 비교적 안전하게 현금인출 가능'
                        }else{
                            //2~3분거리에 씨티ATM. 추가로 24시간 오픈하는 ATM이 있음
                            citiWord+= '씨티은행 ATM이 <strong>도보 2~3분거리</strong>에 있고, ' + (min+1) + '~' + (min+2)+'분 거리에 24시간 운영하는 씨티 ATM이 있어 늦은 시간까지 비교적 안전하게 현금 인출 가능'
                        }
                    }else{
                        //씨티ATM이 2~3분거리
                        citiWord += '씨티은행 ATM이 <strong>도보 2~3분거리</strong>에 있어 씨티카드 이용자가 편리하게 현금인출 가능'
                    }
                }else if(citidif<225){
                    if(open24CitiArray.length>0){
                        var min = Math.floor(open24CitiArray[0].dif/75);
                        if(citidif === open24CitiArray[0].dif){
                            //24시간 오픈하는 씨티ATM이 4~5분거리
                            citiWord+= '24시간 운영하는 씨티은행 ATM이 <strong>도보 4~5분거리</strong>에 있어 비교적 편리하게 현금인출 가능'
                        }else{
                            //4~5분거리에 씨티ATM. 추가로 24시간 오픈하는 ATM이 있음
                            citiWord+= '씨티은행 ATM이 <strong>도보 4~5분거리</strong>에 있고, 도보로 걸어갈 만한 거리에 24시간 운영하는 씨티 ATM이 있음'
                        }
                    }else{
                        //24시간 오픈하는 씨티ATM이 2~3분거리
                        citiWord += '씨티은행 ATM이 도보 4~5분거리에 있어 씨티카드 이용자가 현금 인출 가능'
                    }
                    citiWord += '씨티은행 ATM이 도보 4~5분거리에 있어 씨티카드 이용자가 현금 인출 가능'
                }else{
                    citiWord += '씨티은행 ATM이 도보로 걸어갈 만한 거리에 위치함'
                }
                hotel.explain.local.push(citiWord);

            }



            if(atm.visa){
                var visaArray = [];
                var bankArray = [];
                for (var i = 0; i < atm.visa.length; i++) {
                    if(atm.visa[i].openHour){
                        if(atm.visa[i].openHour === 'A' && atm.visa[i].dif<240 && atm.visa[i].placeName.includes('BANK')){
                            visaArray.push({
                                address:atm.visa[i].address,
                                coor:atm.visa[i].coor,
                                name:atm.visa[i].placeName,
                                dif:atm.visa[i].dif
                            })
                        }
                    }
                }

                var visaMin = 0

                if(visaArray.length>0){
                    var visaWord = ''
                    visaMin = Math.floor(visaArray[0].dif/75) + 1;
                    localScore += Math.max((250 - visaArray[0].dif)/120, 0)
                    visaWord+='24시간 운영하는 은행 소속 VISA, MASTERCARD 제휴 ATM이 ' + visaMin + '~' + (visaMin+1)+ '분 거리에 있어 늦은 시간까지 편리하게 출금 가능'

                    hotel.explain.local.push(visaWord);
                }
            }

            localScore = Math.min(Math.round(localScore*10 + 45),99)/10;
            hotel.assessment.convenience.score = localScore;
            scoreArray.push({hid:hid, score:localScore});


            if(grocery75.length>0){
                if(visaMin){
                    if(visaMin < 3){
                        summary='식료품점, 24시간 오픈 은행소속 ATM 등이 모두 숙소에서 도보 1~2분 거리 내에 있어 여행하기 매우 편리함'
                    }else if(visaMin < 5){
                        summary='도보 1~2분 거리의 식료품점, 3~4분 거리의 24시간 오픈 은행소속 ATM 등이 숙소 부근에 있어 여행하기 매우 편리함'
                    }else{
                        summary='식료품점이 숙소에서 도보로 단 1~2분 거리에 있어 간단히 식사를 해결하거나 저녁에 요깃거리를 사오기 편리함'
                    }
                }else{
                    summary='식료품점이 숙소에서 도보로 단 1~2분 거리에 있어 간단히 식사를 해결하거나 저녁에 요깃거리를 사오기 편리함'
                }

            }else if(grocery150.length>0){
                if(visaMin){
                    if(visaMin < 3){
                        summary='도보 2~3분 거리의 식료품점, 1~2분 거리의 24시간 오픈 은행소속 ATM 등이 숙소 부근에 있어 여행하기 매우 편리함'
                    }else if(visaMin < 5){
                        summary='식료품점, 24시간 오픈 은행소속 ATM 등이 모두 숙소에서 도보 3~4분 거리 내에 있어 여행하기 편리함'
                    }else{
                        summary='식료품점이 숙소에서 도보로 단 3~4분 거리에 있어 간단히 식사를 해결하거나 저녁에 요깃거리를 사오기 편리함'
                    }
                }else{
                    summary='식료품점이 숙소에서 도보로 단 3~4분 거리에 있어 간단히 식사를 해결하거나 저녁에 요깃거리를 사오기 편리함'
                }
            }else if(grocery225.length>0){
                if(visaMin){
                    if(visaMin < 3){
                        summary='도보 1~2분 거리의 24시간 오픈 은행소속 ATM, 도보 3~4분 거리의 식료품점 등이 숙소 부근에 있어 여행하기 편리한 편'
                    }else if(visaMin < 5){
                        summary='식료품점, 24시간 오픈 은행소속 ATM 등이 모두 숙소에서 도보 4~5분 거리 내에 있어 여행하기 편리한 편'
                    }else{
                        summary='식료품점이 숙소에서 도보로 약 5~6분 거리에 있어 간단히 식사를 해결하거나 저녁에 요깃거리를 사오기 편리함'
                    }
                }else{
                    summary='식료품점이 숙소에서 도보로 약 5~6분 거리에 있어 간단히 식사를 해결하거나 저녁에 요깃거리를 사오기 편리함'
                }
            }else{
                if(visaMin){
                    if(visaMin < 3){
                        summary='24시간 오픈 은행소속 ATM이 숙소 1~2분 거리에 있음. 그 외의 편의시설은 부족한 편.'
                    }else if(visaMin < 5){
                        summary='24시간 오픈 은행소속 ATM이 숙소 3~4분 거리에 있음. 그 외의 편의시설은 부족한 편.'
                    }else{
                        summary='숙소 부근 편의시설이 잘 발달되지는 않은 편.'
                    }
                }else{
                    summary='숙소 부근 편의시설이 잘 발달되지는 않은 편.'
                }
            }

            hotel.summary.convenience = summary;

            var groceryTemp = [];

            if(hotel.local.grocery){
                if(hotel.local.grocery.length>3){
                    hotel.local.grocery.length = 3
                }
                groceryTemp = hotel.local.grocery;
            }

            hotel.local = {
                atm: {
                    citi: false,
                    other: false
                },
                grocery:groceryTemp
            }

            if(open24CitiArray.length>0){
                hotel.local.atm.citi = open24CitiArray[0];
            }

            if(visaArray.length>0){
                hotel.local.atm.other = visaArray[0];
            }

            hotel.ota = {
                agoda:{
                    star:hotel.star,
                    rating:hotel.grade_avg,
                    reviews:hotel.grade_no
                }
            }
            delete hotel.star;
            delete hotel.grade_avg;
            delete hotel.grade_no;


        }

        scoreArray.sort(function(a, b){
            return a.score>b.score ? -1 : a.score<b.score ? 1 : 0
        })

        firebase.

        data.status.hotels.facility = true;

        firebase.database().ref("cities/"+city).update(data)



    },

    score_safety: function(){
        let city = this.city;
        let orderArray = [];

        var scoreWord_connect = ["매우 나쁘","매우 나쁘","좋지 않으","좋지 않은 편이","나쁘지 않은 편이","좋은 편이","매우 좋은 편이","매우 좋으"];
        var scoreWord = ["매우 나빠 조심해야 함.","매우 나빠 조심해야 함.","좋지 않은 편.","좋지 않은 편.","나쁘지 않은 편.","좋은 편.","매우 좋은 편.","매우 좋은 편."];
        var misdemeanorWord = ["소매치기 등 경범죄에는 주의해야 함.","소매치기 등 경범죄에는 주의해야 함.", "소매치기 등 경범죄에는 주의해야 함.", "경범죄에는 주의해야 함.","","","",""]


        var scoreArray = [];

        for (var hid in this.data.hotels) {
            let hotel = this.data.hotels[hid];

            var shortTxt = '';

            let safe_txt = [];
            var score = 0;

            var areaName = this.data.area[hotel.area].name;
            var areaSafety = this.data.area[hotel.area].safety;

            score+= areaSafety.score*1 + (areaSafety.misdemeanor/3)*1;

            var txt = areaName+' 지역에 위치한 숙소로, 지역의 전반적인 치안은 ';

            if(areaSafety.score>4&&areaSafety.misdemeanor<4){
                txt += scoreWord_connect[areaSafety.score] + '지만 ' + misdemeanorWord[areaSafety.misdemeanor];
            }else{
                txt += scoreWord[areaSafety.score]
            }

            safe_txt.push(txt);


            var safety_local = {  //유동인구에 따른 치안
                atm:0, //0:별로 1:보통 2:좋음
                spot:0,
                grocery:0,
                area:false
            }

            if(hotel.area>5&&hotel.area<9){
                safety_local.area = true;
            }else if(hotel.area === 10){
                safety_local.area = true;
            }

            var atm30th = hotel.local.atm[29].location.score; //30번째 atm이 몇 마일 떨어져있는지

            if(atm30th<0.084){
                safety_local.atm = 2
            }else if(atm30th<0.12){
                safety_local.atm = 1
            }

            score += Math.max((0.15 - atm30th), 0)*5

            hotel.spot = {
                walkable: []
            }
            hotel.local.spot = [];
            hotel.local.grocery = [];

            for (var i = 0; i < this.data.spots.ranked.length; i++) {
                var spot = this.data.spots.ranked[i];

                if(spot.enterance){
                    for (var j = 0; j < spot.enterance.length; j++) {
                        var dif = calculateDif(hotel.coor, spot.enterance[j])
                        if(dif < 500){
                            hotel.spot.walkable.push({
                                rank:i,
                                sid:spot.sid
                            })
                            if(dif<200){
                                if(safety_local.spot === 0){
                                    safety_local.spot = 1
                                }
                            }

                            if(dif < 80){
                                hotel.local.spot.push(spot)
                                safety_local.spot = 2
                            }
                        }
                    }
                }else{
                    var dif = calculateDif(hotel.coor, spot.coor)
                    if(dif < 500){
                        hotel.spot.walkable.push({
                            rank:i,
                            sid:spot.sid
                        })
                        if(dif<200){
                            if(safety_local.spot === 0){
                                safety_local.spot = 1
                            }

                            score += (250 - dif)/200
                        }

                        if(dif < 150){
                            hotel.local.spot.push(spot)
                            safety_local.spot = 2
                        }
                    }
                }
            }
            hotel.local.grocery = []

            hotel.local.nearestMetro = {
                distance: 1000
            }
            for (var line in hotel.metroInfo) {
                var metro = hotel.metroInfo[line];

                if(metro.distance<hotel.local.nearestMetro.distance){
                    hotel.local.nearestMetro = metro;
                    hotel.local.nearestMetro.line = line;
                }
            }

            for (var i = 0; i < this.data.local.local.grocery.length; i++) {
                var grocery = this.data.local.local.grocery[i];
                var dif = calculateDif(hotel.coor, grocery)

                if(dif<110){
                    hotel.local.grocery.push(dif);
                }
            }

            score += Math.min((hotel.local.grocery.length / 6), 0.7)

            if(hotel.local.grocery.length>3){
                safety_local.grocery = 2;
            }else if(hotel.local.grocery.length>1){
                safety_local.grocery = 1;
            }


            var areaScore = Math.round((areaSafety.score*1 + (areaSafety.misdemeanor/3)*1)*10)/10


            var localTxt = '';
            var localGood = false;

            if(safety_local.area){
                localTxt += '맨해튼 한복판에 위치해 유동인구가 매우 많'
                shortTxt += '유동인구가 매우 많은 맨해튼 한복판에 위치하고, 지하철도 가까워 <strong>밤 늦게까지 안전하지만 소매치기 등 경범죄에는 조심해야 함</strong>'
            }else{
                if(hotel.local.spot.length>0){
                    if(safety_local.grocery>0){
                        if(safety_local.atm>0){
                            localTxt += '주변 상업시설, 편의시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구가 매우 많음.</strong>'
                            localGood = true;
                        }else{
                            localTxt += '주변 편의시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구 많음.</strong>'
                            localGood = true;
                        }
                    }else{
                        if(safety_local.atm>0){
                            localTxt += '주변 상업시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구 많음.</strong>'
                            localGood = true;
                        }else{
                            localTxt +=  hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구가 많음.</strong>'
                            localGood = true;
                        }
                    }
                }else{
                    if(safety_local.grocery>0){
                        if(safety_local.atm>0){
                            localTxt += '주변 상업시설, 편의시설이 잘 갖추어져 있어 <strong>유동인구가 많음.</strong>'
                            localGood = true;
                        }else{

                        }
                    }else{
                        if(safety_local.atm>0){

                        }else{

                        }
                    }
                }
            }

            if(areaScore>7.5){
                if(!safety_local.area){
                    shortTxt += '전반적으로 치안이 좋은 <b>'+areaName+'</b>지역에 위치하고 있'
                }

                if(localGood){
                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 주변 <strong>유동인구가 많고 지하철이 가까워 밤 늦게까지도 매우 안전</strong>함.'
                        }else{
                            shortTxt += '으며, 주변 유동인구가 많아 <strong>지역 내에서도 더 안전</strong>한 편.'
                        }
                    }

                }else{
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 아주 많지는 않은 편.'

                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 지하철이 가까워 <strong>밤 늦게 귀가할 때도 안전</strong>한 편.'
                        }else{
                            shortTxt += '지만 <strong>너무 밤 늦게 돌아다니는 것은 삼가는 것</strong>이 좋음.'
                        }
                    }
                }
            }else if(areaScore>6.8){

                if(!safety_local.area){
                    shortTxt += '치안이 좋은 편인 <b>'+areaName+'</b>지역에 위치하고 있'
                }

                if(localGood){

                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 주변 유동인구가 많고 지하철이 가까워 <strong>밤 늦게까지도 안전</strong>한 편.'
                        }else{
                            shortTxt += '으며, 주변 유동인구가 많아 <strong>지역 내에서도 안전</strong>한 편.'
                        }
                    }

                }else{
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 아주 많지는 않은 편.'

                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 지하철이 가까워 <strong>밤 늦게 귀가할 때도 안전</strong>한 편.'
                        }else{
                            shortTxt += '지만 너무 <strong>밤 늦게 돌아다니는 것은 삼가는 것</strong>이 좋음.'
                        }
                    }
                }

            }else if(areaScore>6){
                if(!safety_local.area){
                    shortTxt+='일반적인 치안 수준의 <b>'+ areaName+ '</b> 지역에 위치하고 있'
                }

                if(localGood){
                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 주변 유동인구가 많고 지하철이 가까워 <strong>밤 늦게 귀가할 때도 안전</strong>한 편.'
                        }else{
                            shortTxt += '으며, 주변 유동인구가 많아 <strong>안전한 편이지만 너무 밤 늦게 귀가하는 것은 삼가</strong>는 것이 좋음.'
                        }
                    }

                }else{
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 많지는 않은 편에 속함.'

                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, <strong>지하철이 가깝지만 너무 밤 늦게 귀가하는 것은 삼가</strong>는 것이 좋음.'
                        }else{
                            shortTxt += '으며, 주변 유동인구가 아주 많은 편은 아니므로 <strong>밤 늦게 돌아다니지 않는</strong> 것이 좋음.'
                        }
                    }
                }
            }else{
                if(!safety_local.area){
                    shortTxt+='전반적으로 치안이 좋지 않은 편인 <b>'+areaName+ '</b> 지역에 위치하고 있'
                }

                if(localGood){
                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 유동인구가 많고 지하철이 가까워 <strong>지역 내에서는 안전한 편이지만 늦은 시간 귀가는 삼가는 것</strong>이 좋음.'
                        }else{
                            shortTxt += '으며, 주변 유동인구가 많은 편이지만 <strong>늦은 시간에 귀가하지 않는 것</strong>이 좋음.'
                        }
                    }
                }else{
                    localTxt += '주변에 많은 시설이 있거나 유명한 관광지가 있지 않아 유동인구가 지역 내에서도 많지 않은 편.'
                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 지하철이 가깝지만 유동인구가 많지 않은 편이므로 <strong>안전에 유의해야 함</strong>.'
                        }else{
                            shortTxt += '으며, 유동인구가 많지 않아 <strong>안전에 유의해야 함</strong>.'
                        }
                    }
                }
            }

            safe_txt.push(localTxt);

            var met = hotel.local.nearestMetro;
            var metDis = met.distance;
            var metTxt = '가장 가까운 지하철 역은 <b>' + met.line + '호선 ' + met.name + '역</b>으로, 도보로 약 <strong>' +(Math.floor(metDis/75) + 1)+'분</strong> 거리에 있';

            if(metDis<200){
                metTxt += '어 <strong>늦은 밤에 귀가하기 좋음</strong>.'
            }else if(metDis<500){
                metTxt += '음.'
            }else{
                metTxt += '어 <strong>너무 늦은 밤에는 지하철로 귀가하기 부담</strong>스러울 수 있음'
            }

            var metScore = Math.max(Math.round((300 - metDis)/300),0);

            score+= metScore

            if(score>9.2){
                score = 9.2 + (score-9.2)/4
            }

            score = Math.min(Math.round(score*7.92+22)/10,9.9);

            safe_txt.push(metTxt);

            hotel.assessment.safety = {
                score: score
            }

            scoreArray.push(score)

            if(score>9.4){
                safe_txt.push('전반적으로 뉴욕의 숙소들 중에서도 <strong>치안으로는 최상위권</strong>에 속해 여행을 즐기기 좋음.')
            }else if(score>9){
                safe_txt.push('뉴욕 숙소들 중에서도 전반적으로 <strong>상당히 좋은 치안</strong>을 자랑함.')
            }else if(score>8.5){
                safe_txt.push('<strong>전반적으로 주변 치안이 안정</strong>되어 여행하기에 좋음.')
            }else if(score>7.9){
                safe_txt.push('밤 늦게 돌아다니지 않고 <strong>조심한다면 전반적으로 여행하기에 안전</strong>한 편.')
            }else if(score>7.3){
                safe_txt.push('전반적으로 <strong>뉴욕 평균 정도의 치안 수준</strong>을 보이며, 조심히 다닐 필요는 있음.')
            }else if(score>6.9){
                safe_txt.push('치안이 아주 나쁘지는 않지만 <strong>조심히 다니는 것이 좋음</strong>.')
            }else{
                safe_txt.push('치안이 좋은 편은 아니므로 <strong>안전한 숙소를 원한다면 좋은 선택은 아님.</strong>')
            }

            hotel.explain.safety = safe_txt;

            if(hotel.summary){
                hotel.summary.safety = shortTxt;
            }else{
                hotel.summary = {
                    safety: shortTxt
                };
            }
        }

        scoreArray.sort();

        this.data.status.hotels.safety = true;

        // firebase.database().ref('cities/'+this.city).update(this.data)
    },

    score_transport: function(){
        let city = this.city
        let orderArray = [];

        for (var hid in this.data.hotels) {
            let hotel = this.data.hotels[hid];

            let transport_txt = [];

            let score = 0;
            //교통 편의성 점수부여용
            let goodLine = [];
            //좋은 지하철 라인들 Array
            let visitable = [];
            //환승 없이 갈 수 있는 관광지 목록
            let nearest = {distance:1000, name:"", code:""};
            //가장 가까운 지하철
            let lineNo = 0

            var summary = '';

            if(hotel.metroInfo){
                lineNo = Object.keys(hotel.metroInfo).length
            }
            //10분거리 이내의 지하철  노선 개수


            for (var metLine in hotel.metroInfo) {

                if(hotel.metroInfo[metLine].distance < nearest.distance){
                    nearest = hotel.metroInfo[metLine]
                    //가장 가까운 지하철 갱신
                }

                if(this.data.metroLine[metLine].score>80){
                    goodLine.push(metLine)
                    //좋은 라인이면 푸시함
                }

                for (var i = 0; i < this.data.metroLine[metLine].spot.length; i++) {
                    let spot = this.data.metroLine[metLine].spot[i]
                    if(!visitable.includes(spot.name)){
                        visitable.push(spot.name)
                    }
                }
            }

            if(Math.ceil((nearest.distance)/70)<4){
                transport_txt.push('가장 가까운 지하철 역은 <b>' + nearest.name + "</b> 역으로, <strong>도보 단 "+ Math.ceil((nearest.distance)/70) +"분 거리</strong>");
            }else{
                transport_txt.push('가장 가까운 지하철 역은 <b>' + nearest.name + "</b> 역으로, 도보 "+ Math.ceil((nearest.distance)/70) +"분 거리");
            }
            transport_txt.push('숙소에서 도보 10분거리 이내에 <b>지하철 ' + lineNo + '개 노선</b>이 지남');

            if(goodLine.length>0){
                if(goodLine.length>1){
                    transport_txt.push('그 중에서도 실질적으로 '+this.cityName+' 관광에 편리한 <strong>'+ goodLine + '호선</strong>이 지나는 <b>초 역세권</b>');
                }else{
                    transport_txt.push('그 중에서도 실질적으로 '+this.cityName+' 관광에 편리한 <strong>'+ goodLine + '호선</strong>이 지나는 <b> 역세권</b>');
                }
            }

            let spotNo = visitable.length;
            if(spotNo>0){
                // TODO: 100대 관광지 -> 뉴욕 실제 spot 데이터 길이
                if(spotNo>90){
                    transport_txt.push('<b>' + this.cityName + ' 100대 관광지 중 '+spotNo+'개</b>를 환승 없이 방문할 수 있는 <strong>최고의 교통 요지</strong>');
                }else if(spotNo>75){
                    transport_txt.push('<b>' + this.cityName + ' 100대 관광지 중 '+spotNo+'개</b>를 환승 없이 방문할 수 있는 <strong>교통 요지</strong>');
                }else{
                    transport_txt.push(this.cityName + ' 100대 관광지 중 '+spotNo+'개를 환승 없이 방문 가능');
                }
            }


            var min = Math.ceil(nearest.distance/70);
            if(min<2){
                if(lineNo>18){
                    summary = '가장 가까운 지하철역이 <strong>도보 단 '+min+'~'+(min+1)+'분 거리</strong>에 있고, 도보 10분 거리에 <strong>지하철 '+lineNo+'개 노선</strong>이 지나는 <b>최상의 역세권</b>'
                }else if(lineNo>14){
                    summary = '가장 가까운 지하철역이 <strong>도보 단 '+min+'~'+(min+1)+'분 거리</strong>에 있고, 도보 10분 거리에 <strong>지하철 '+lineNo+'개 노선</strong>이 지나는 <b>굉장히 훌륭한 역세권</b>'
                }else{
                    if(goodLine.length>3){
                        summary = '가장 가까운 지하철역이 <strong>도보 단 '+min+'~'+(min+1)+'분 거리</strong>에 있고, 관광에 편리한 <strong>'+ goodLine + '호선</strong>이 지나는 <b>훌륭한 역세권</b>'
                    }else if(goodLine.length>0){
                        summary = '가장 가까운 지하철역이 <strong>도보 단 '+min+'~'+(min+1)+'분 거리</strong>에 있고, 관광에 편리한 <strong>'+ goodLine + '호선</strong>이 지나는 <b>좋은 역세권</b>'
                    }
                }
            }else if(min<4){
                if(lineNo>18){
                    summary = '가장 가까운 지하철역이 <strong>도보 '+(min+1)+'~'+(min+2)+'분 거리</strong>에 있고, 도보 10분 거리에 <strong>지하철 '+lineNo+'개 노선</strong>이 지나는 <b>굉장히 훌륭한 역세권</b>'
                }else if(lineNo>14){
                    summary = '가장 가까운 지하철역이 <strong>도보 '+(min+1)+'~'+(min+2)+'분 거리</strong>에 있고, 도보 10분 거리에 <strong>지하철 '+lineNo+'개 노선</strong>이 지나는 <b>훌륭한 역세권</b>'
                }else{
                    if(goodLine.length>2){
                        summary = '가장 가까운 지하철역이 <strong>도보 '+(min+1)+'~'+(min+2)+'분 거리</strong>에 있고, 관광에 편리한 <strong>'+ goodLine + '호선</strong>이 지나는 <b>역세권</b>'
                    }else if(goodLine.length>0){
                        summary = '가장 가까운 지하철역이 <strong>도보 '+(min+1)+'~'+(min+2)+'분 거리</strong>에 있고, 관광에 편리한 <strong>'+ goodLine + '호선</strong>이 지남'
                    }
                }
            }else if(min<7){
                if(lineNo>19){
                    summary = '가장 가까운 지하철역이 <strong>도보 '+(min+2)+'~'+(min+3)+'분 거리</strong>로 약간 멀지만, 도보 10분 거리에 <strong>지하철 '+lineNo+'개 노선</strong>이 지나는 <b>좋은 역세권</b>'
                }else if(lineNo>15){
                    summary = '가장 가까운 지하철역이 <strong>도보 '+(min+2)+'~'+(min+3)+'분 거리</strong>로 약간 멀지만, 도보 10분 거리에 <strong>지하철 '+lineNo+'개 노선</strong>이 지나는 <b>역세권</b>'
                }else{
                    if(goodLine.length>2){
                        summary = '가장 가까운 지하철역이 <strong>도보 '+(min+2)+'~'+(min+3)+'분 거리</strong>로 약간 멀지만, 관광에 편리한 <strong>'+ goodLine + '호선</strong>이 지남'
                    }else{
                        summary = '가장 가까운 지하철역이 <strong>도보 '+(min+2)+'~'+(min+3)+'분 거리</strong>로 약간 떨어져 있어 다소 불편할 수 있음'
                    }
                }
            }else{
                summary = '가장 가까운 지하철역이 <strong>도보 '+(min+3)+'~'+(min+5)+'분 거리</strong>로 조금 떨어져 있어 불편할 수 있음'
            }

            hotel.summary.transport = summary;


            for (var metLine in hotel.metroInfo) {
                let metDistance = hotel.metroInfo[metLine].distance;
                score += (10000 - metDistance)*this.data.metroLine[metLine].score;
            }

            orderArray.push({
                score: score,
                hid: hid
            })

            if(hotel.explain){
                hotel.explain.transport = transport_txt;
            }else{
                hotel.explain = {
                    transport:transport_txt
                }
            }
        }

        orderArray.sort(function(a, b){
            return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
        })

        for (var i = 0, len = orderArray.length; i < len; i++) {
            let hotel = this.data.hotels[orderArray[i].hid];
            let score = Math.round((1 - (i/len)*(i/len))*60)/10  + 4
             //4.0 ~ 10.0 사이의 점수를 소수점 1자리까지 부여한다.
             //높은 점수가 더 많당

            if(hotel.assessment){
                hotel.assessment.transport = {
                    score: score
                }
            }else{
                hotel.assessment = {
                    transport:{
                        score:score
                    }
                }
            }
        }

        $("#status_transport").html("대중교통 정보 발견. 교통 편의성을 계산합니다. - 계산을 완료했습니다.");
        this.data.status.hotels.transport = true;

        var musical = [{
                name:"위키드",
                theater:"거슈윈 극장",
                coor:{
                    lat:40.7623832,
                    lng:-73.9851616
                }
            },
            {
                name:"라이온 킹",
                theater:"민스코프 극장",
                coor:{
                    lat:40.7580277,
                    lng:-73.9861418
                }
            },
            {
                name:"킹키 부츠",
                theater:"알 허쉬펠드 극장",
                coor:{
                    lat:40.759261,
                    lng:-73.9913897
                }
            },
            {
                name:'시카고',
                theatre:'앰배서더 극장',
                coor:{
                    lat:40.7612489,
                    lng:-73.9866237
                }
            },
            {
                name:"알라딘",
                theater:"뉴 암스테르담 극장",
                coor:{
                    lat:40.7560871,
                    lng:-73.9901257
                }
            },
            {
                name:"TKTS",
                theater:"TKTS",
                coor:{
                    lat:40.7591959,
                    lng:-73.9870814
                }
            }]

        var ticket = {
            name:"TKTS",
            theater:"TKTS",
            coor:{
                lat:40.7591959,
                lng:-73.9870814
            }
        }

        var centralNearestPoly = [{lat:40.7692643,lng:-73.9838648},{lat:40.7667291,lng:-73.9828348},{lat:40.7628611,lng:-73.9739513},{lat:40.7638363,lng:-73.970046},{lat:40.7957804,lng:-73.9469576},{lat:40.7981845,lng:-73.9482451},{lat:40.8019205,lng:-73.9571286},{lat:40.8015631,lng:-73.9601326},{lat:40.7692643,lng:-73.9838648}]
        var centralNearPoly = [{lat:40.7699032,lng:-73.9862647},{lat:40.7647029,lng:-73.9842686},{lat:40.7608674,lng:-73.9752778},{lat:40.7628499,lng:-73.9676824},{lat:40.7948758,lng:-73.9444867},{lat:40.7999117,lng:-73.9470126},{lat:40.803745,lng:-73.9558932},{lat:40.802478,lng:-73.9626718},{lat:40.7699032,lng:-73.9862647}]
        var centralMidPoly = [{lat:40.8034148,lng:-73.9648533},{lat:40.7708569,lng:-73.9882851},{lat:40.7629912,lng:-73.9855385},{lat:40.7593505,lng:-73.9763546},{lat:40.762016,lng:-73.9662266},{lat:40.7939935,lng:-73.9427948},{lat:40.8013358,lng:-73.9460564},{lat:40.805104,lng:-73.9551544},{lat:40.8034148,lng:-73.9648533}]
        var centralFarPoly = [{lat:40.7572701,lng:-73.9780283},{lat:40.7606833,lng:-73.9642525},{lat:40.7937336,lng:-73.940134},{lat:40.8026027,lng:-73.9451122},{lat:40.8075078,lng:-73.9567423},{lat:40.8048767,lng:-73.9685011},{lat:40.7721894,lng:-73.9916325},{lat:40.7609433,lng:-73.9871264},{lat:40.7572701,lng:-73.9780283}]

        var centralNearest = new google.maps.Polygon({
            paths: centralNearestPoly
          });
        var centralMid = new google.maps.Polygon({
          paths: centralMidPoly
        });
        var centralNear = new google.maps.Polygon({
          paths: centralNearPoly
        });
        var centralFar = new google.maps.Polygon({
          paths: centralFarPoly
        });

        var centralSpots = [{
            coor:{
                lat:40.7724169,
                lng:-73.9671385
            },
            explain:'센트럴 파크 내에서도 아름다운 경관을 자랑하는 베데스다 테라스와 호수로 바로 통하는 입구'
        },
        {
            coor:{
                lat:40.7777304,
                lng:-73.9748311
            },
            explain:'센트럴 파크 내에서도 아름다운 경관을 자랑하는 베데스다 테라스와 호수로 바로 통하는 입구'
        },
        {
            coor:{
                lat:40.7652014,
                lng:-73.9750671
            },
            explain:'미드타운 맨해튼의 건물들이 아름답게 비치는 남단 호수가'
        },
        {
            coor:{
                lat:40.7657215,
                lng:-73.9720416
            },
            explain:'미드타운 맨해튼의 건물들이 아름답게 비치는 남단 호수가'
        },
        {
            coor:{
                lat:40.7820525,
                lng:-73.9717412
            },
            explain:'센트럴 파크 내에서도 상징물로 꼽히는 벨디비어 성, 델라코르테 극장 등으로 통하는 입구'
        },
        {
            coor:{
                lat:40.7772024,
                lng:-73.9636409
            },
            explain:'센트럴 파크 내에서도 상징물로 꼽히는 벨디비어 성, 델라코르테 극장 등으로 통하는 입구'
        },
        {
            coor:{
                lat:40.7810939,
                lng:-73.9607924
            },
            explain:'센트럴 파크 북단 호수, 러닝트랙으로 통하는 입구'
        },
        {
            coor:{
                lat:40.784124,
                lng:-73.9585876
            },
            explain:'센트럴 파크 북단 호수, 러닝트랙으로 통하는 입구'
        },
        {
            coor:{
                lat:40.7879177,
                lng:-73.9557821
            },
            explain:'센트럴 파크 북단 호수, 러닝트랙으로 통하는 입구'
        },
        {
            coor:{
                lat:40.7934574,
                lng:-73.9517212
            },
            explain:'센트럴 파크 북부의 컨서버토리 가든'
        },
        {
            coor:{
                lat:40.7881451,
                lng:-73.9672351
            },
            explain:'센트럴 파크 북단 호수, 러닝트랙으로 통하는 입구'
        },
        {
            coor:{
                lat:40.7852816,
                lng:-73.9693594
            },
            explain:'센트럴 파크 북단 호수, 러닝트랙으로 통하는 입구'
        }]


        var centralScoreArray = [];

        var theme = {   //explain의 항목으로 들어갈 녀석
                broadway:[],
                lower:[],
                central:[]
        }
        var summary_theme = {
            broadway:'',
            lower:'',
            central:''
        }

        console.log(data)

        for (var i = 0; i < musical.length; i++) {
            musical[i].metro = {};

            for (var j = 0; j < data.metro.length; j++) {
                var metro = data.metro[j];

                var dif = calculateDif(musical[i].coor, metro.coor);

                if(dif<300){
                    for (var k = 0; k < metro.line.length; k++) {
                        var line = metro.line[k][0];

                        if(musical[i].metro[line]){
                            if(musical[i].metro[line].dif > dif){
                                musical[i].metro[line] = {
                                    dif: dif,
                                    name: metro.name,
                                    coor: metro.coor
                                }
                            }
                        }else{
                            musical[i].metro[line] = {
                                dif: dif,
                                name: metro.name,
                                coor: metro.coor
                            }
                        }
                    }
                }
            }
        }

        console.log(musical)
        var scoreObj = {};


        for (var hid in data.hotels) {
            var hotel = data.hotels[hid];

            var broadWord = [];


            hotel.assessment.theme = {
                broad:{
                    score:0
                }
            }
            var walkable = false;
            var hasLine = false;

            for (var i = 0; i < musical.length; i++) {
                var txt = ''
                var dif = calculateDif(hotel.coor, musical[i].coor);

                if(dif<600){
                    var broadDifScore = (600 - dif)/400
                    if(scoreObj[hid]){
                        scoreObj[hid] += 1 + broadDifScore
                    }else{
                        scoreObj[hid] = 1 + broadDifScore;
                        txt = '유명 극장들이 몰려있는 브로드웨이, 타임스퀘어 부근에서 가까움'
                        broadWord.push(txt);
                    }

                    if(musical[i].name === 'TKTS'){
                        txt = '당일 뮤지컬 티켓을 저렴하게 예매할 수 있는 TKTS 티켓판매부스까지 도보로 약 ' + (Math.floor(dif/60)+1) + '분';
                        broadWord.push(txt);
                    }else{
                        txt = '뮤지컬 ' + musical[i].name + ' 공연이 열리는 ' + musical[i].theater + '까지 도보로 약 ' + (Math.floor(dif/60)+1) + '분';
                        broadWord.push(txt);
                    }

                    walkable = true;
                }
            }
            if(walkable){
                scoreObj[hid] += 4;
                if(broadWord.length>4){
                    txt = '뮤지컬을 여러 편 볼 생각이라면, 밤 늦게 끝나는 뮤지컬을 보고 안전하게 숙소로 귀가하기 매우 좋은 숙소.'
                    broadWord.push(txt);
                }else if(broadWord.length>2){
                    txt = '뮤지컬을 여러 편 볼 생각이라면, 밤 늦게 끝나는 뮤지컬을 보고 안전하게 숙소로 귀가하기 좋은 숙소.'
                    broadWord.push(txt);
                }else{
                    txt = '일반적으로 밤 늦게 끝나는 뮤지컬을 보고 안전하게 숙소로 귀가하기 좋은 편에 속하는 숙소.'
                    broadWord.push(txt);
                }
            }else{

                var lineObj = {
                    sum:999
                }

                for (var line in data.spots.ranked[9].metroInfo) {
                    var metroInf = data.spots.ranked[9].metroInfo[line];
                    var walkDif = metroInf.distance;
                    var metName = metroInf.name;
                    var hotelMetName = ''
                    var metroDif = 0

                    if(hotel.metroInfo){
                        if(Object.keys(hotel.metroInfo).includes(line)){
                            walkDif += hotel.metroInfo[line].distance;
                            hotelMetName = hotel.metroInfo[line].name;
                            metroDif = calculateDif(data.metro[metroInf.code].coor, data.metro[hotel.metroInfo[line].code].coor);

                            if(lineObj.sum > walkDif/75 + metroDif/400){
                                lineObj = {
                                    metro: metroDif/400,
                                    walk : walkDif/75,
                                    sum : walkDif/75 + metroDif/400
                                }
                                hasLine = true;
                            }
                        }
                    }
                }

                if(hasLine){

                    scoreObj[hid] = Math.max((16 - lineObj.sum)/2.9, 0) + Math.max((6-lineObj.walk)/1.8, 0);

                    txt = '타임스퀘어 부근은 아니지만 <strong>타임스퀘어까지 지하철로 환승 없이 빠르게</strong> 이동할 수 있는 숙소.'
                    broadWord.push(txt);

                    if(lineObj.walk < 5){
                        if(lineObj.sum<12){
                            txt = '지하철이 매우 가까워 도보 이동시간 단 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이면 타임스퀘어 부근의 주요 극장들까지 갈 수 있음'

                        }else if(lineObj.sum<16){
                            txt = '도보 이동시간 단 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이면 타임스퀘어 부근의 주요 극장들까지 갈 수 있음'
                        }else{
                            txt = '타임스퀘어 부근의 주요 극장들까지는 도보 이동시간 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이 소요됨.'
                        }
                    }else if(lineObj.walk < 7){
                        if(lineObj.sum<12){
                            txt = '지하철이 매우 가까워 도보 이동시간 약 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이면 타임스퀘어 부근의 주요 극장들까지 갈 수 있음'

                        }else if(lineObj.sum<16){
                            txt = '도보 이동시간 약 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이면 타임스퀘어 부근의 주요 극장들까지 갈 수 있음'
                        }else{
                            txt = '타임스퀘어 부근의 주요 극장들까지는 도보 이동시간 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이 소요됨.'
                        }
                    }else{
                        if(lineObj.sum<12){
                            txt = '지하철이 매우 가까워 도보 이동시간 약 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이면 타임스퀘어 부근의 주요 극장들까지 갈 수 있음'

                        }else if(lineObj.sum<16){
                            txt = '도보 이동시간 약 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이면 타임스퀘어 부근의 주요 극장들까지 갈 수 있음'
                        }else{
                            txt = '타임스퀘어 부근의 주요 극장들까지는 도보 이동시간 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이 소요됨.'
                        }
                    }

                    broadWord.push(txt);
                }
            }

            hotel.explain.theme = {
                broad:broadWord
            }
        }
        var broadScoreArray = []
        for (var hid in scoreObj) {
            var sc = scoreObj[hid];
            if(sc>9){
                sc = Math.round(sc/0.385)/10 + 6.5
                if(sc>10.2){
                    sc = 9.9
                }else if(sc>10){
                    sc = 9.8
                }else if(sc>9.8){
                    sc = 9.7
                }else if(sc>9.5){
                    sc = 9.6
                }
            }else if(sc>4){
                sc = Math.round((sc+27)/0.4)/10
            }else{
                sc = Math.round(sc*10+40)/10
            }
            if(sc<8){
                sc = Math.round(sc*5)/10 + 4
            }

            broadScoreArray.push(sc)
            data.hotels[hid].assessment.theme.broad = sc;




            var centralWord = [];

            var centralSummary = ''
            let coor = new google.maps.LatLng(hotel.coor.lat, hotel.coor.lng)

            var score = 0

            var hasSpot = false;
            var centralNearSpot = {
                dif:700,
                explain:""
            }
            txt = ''
            var secondtxt = ''

            for (var i = 0; i < centralSpots.length; i++) {
                var spotCoor = centralSpots[i].coor;
                var dif = calculateDif(spotCoor, hotel.coor);

                if(dif<centralNearSpot.dif){
                    score = (i+30)/40 + Math.min((700 - dif)/450,1)
                    centralNearSpot.dif = dif;
                    centralNearSpot.explain = centralSpots[i].explain
                    hasSpot = false;
                }
            }

            if(hasSpot){
                secondtxt = '또한 <strong>'+centralNearSpot.explain;

                if(centralNearSpot.dif<150){
                    secondtxt+= '에서 단 1~2분 거리</strong>에 있어 센트럴파크를 더 즐기기 좋음.'
                }else if(centralNearSpot.dif<300){
                    secondtxt+= '에서 3~4분 거리</strong>에 있어 센트럴파크를 더 즐기기 좋음.'
                }else{
                    secondtxt+= '</strong>에서 가까워 센트럴파크를 더 즐기기 좋음.'
                }
            }

            if(google.maps.geometry.poly.containsLocation(coor, centralNearest)){
                txt = '센트럴파크와 <strong>도보 단 2~3분 거리</strong>로, 산책을 좋아하는 사람에게 안성맞춤'
                score += 9;

                if(hasSpot){
                    centralSummary = '센트럴파크와 <strong>도보 단 2~3분거리</strong>로 매우 가까울 뿐만 아니라, 특히 <strong>'+centralNearSpot.explain+'</strong>에서 가까워 센트럴파크를 더 즐기기 좋음'
                }else{
                    centralSummary = txt;
                }
            }else if(google.maps.geometry.poly.containsLocation(coor, centralNear)){
                score += 8.65;
                txt = '센트럴파크와 <strong>도보 4~5분 거리</strong>로, 산책을 좋아하는 사람에게 안성맞춤'
                if(hasSpot){
                    centralSummary = '센트럴파크와 <strong>도보 4~5분거리</strong>로 매우 가까울 뿐만 아니라, 특히 <strong>'+centralNearSpot.explain+'</strong>에서 가까워 센트럴파크를 더 즐기기 좋음'
                }else{
                    centralSummary = txt;
                }
            }else if(google.maps.geometry.poly.containsLocation(coor, centralMid)){
                score += 8.25;
                txt = '센트럴파크에서 <strong>도보 6~7분 거리</strong>로, 산책을 좋아하는 사람에게 좋음'
                if(hasSpot){
                    centralSummary = '센트럴파크와 도보 6~7분 거리로 가까울 뿐만 아니라, 특히 <strong>'+centralNearSpot.explain+'</strong>에서 가까워 센트럴파크를 더 즐기기 좋음'
                }else{
                    centralSummary = txt;
                }
            }else if(google.maps.geometry.poly.containsLocation(coor, centralFar)){
                score += 8;
                txt = '센트럴파크에서 <strong>도보 10분 이내 거리</strong>로, 산책을 좋아하는 사람에게 좋음'
                if(hasSpot){
                    centralSummary = '센트럴파크와 도보 10분 이내 거리로 가까울 뿐만 아니라, 특히 <strong>'+centralNearSpot.explain+'</strong>에서 가까워 센트럴파크를 더 즐기기 좋음'
                }else{
                    centralSummary = txt;
                }
            }




            if(score>7.9){
                score = (score-8)/1.5 + 8;
                centralWord.push(txt);
                if(hasSpot){
                    centralWord.push(secondtxt);
                }
            }else{
                //이제 지하철을 찾아보자

                var lineObj = {
                    sum:999
                }
                var hasLine = false

                for (var line in data.spots.ranked[4].metroInfo) {
                    var metroInf = data.spots.ranked[4].metroInfo[line];
                    var walkDif = metroInf.distance;
                    var metName = metroInf.name;
                    var hotelMetName = ''
                    var metroDif = 0

                    if(hotel.metroInfo){
                        if(Object.keys(hotel.metroInfo).includes(line)){
                            walkDif += hotel.metroInfo[line].distance;
                            hotelMetName = hotel.metroInfo[line].name;
                            metroDif = calculateDif(data.metro[metroInf.code].coor, data.metro[hotel.metroInfo[line].code].coor);

                            if(lineObj.sum > walkDif/75 + metroDif/400){
                                lineObj = {
                                    metro: metroDif/400,
                                    walk : walkDif/75,
                                    sum : walkDif/75 + metroDif/400
                                }
                                if(lineObj.sum < 16){
                                    hasLine = true;
                                }

                            }
                        }
                    }
                }

                if(hasLine){
                    txt = '이 숙소는 센트럴파크 부근은 아니지만 센트럴파크까지 지하철로 환승 없이 빠르게 갈 수 있음.'
                    centralWord.push(txt);

                    if(lineObj.walk < 4){
                        score = 7.5 + Math.round((12 - lineObj.sum/2))/10
                        if(lineObj.sum<12){
                            txt = '지하철이 매우 가까워 도보 이동시간 단 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이면 센트럴파크에 도달 가능.'
                            centralSummary = '센트럴파크 부근은 아니지만 지하철이 매우 가까워 약 ' + (Math.round(lineObj.sum)+2) + '분이면 센트럴파크 도착.';
                        }else if(lineObj.sum<16){
                            txt = '도보 이동시간 단 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이면 센트럴파크 도착'
                            centralSummary = '센트럴파크 부근은 아니지만 지하철이 매우 가까워 약 ' + (Math.round(lineObj.sum)+2) + '분이면 센트럴파크 도착.';
                        }
                    }else if(lineObj.walk < 7){
                        score = 7 + Math.round((12 - lineObj.sum/2))/10
                        if(lineObj.sum<12){
                            txt = '지하철이 매우 가까워 도보 이동시간 약 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이면 센트럴파크에 도달 가능.'
                            centralSummary = '센트럴파크 부근은 아니지만 지하철이 매우 가까워 약 ' + (Math.round(lineObj.sum)+2) + '분이면 센트럴파크 도착.';

                        }else if(lineObj.sum<16){
                            txt = '도보 이동시간 약 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이면 센트럴파크에 도달 가능.'
                            centralSummary = '센트럴파크 부근은 아니지만 지하철이 매우 가까워 약 ' + (Math.round(lineObj.sum)+2) + '분이면 센트럴파크 도착.';
                        }
                    }else{
                        score = 6.5 + Math.round((12 - lineObj.sum/2))/10
                        if(lineObj.sum<12){
                            txt = '지하철이 매우 가까워 도보 이동시간 약 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이면 센트럴파크에 도달 가능.'
                            centralSummary = '센트럴파크 부근은 아니지만 지하철이 매우 가까워 약 ' + (Math.round(lineObj.sum)+2) + '분이면 센트럴파크 도착.';

                        }else if(lineObj.sum<16){
                            txt = '도보 이동시간 약 '+ Math.round(lineObj.walk) +'분을 포함해 약 ' + (Math.round(lineObj.sum)+2) + '분이면 센트럴파크에 도달 가능.'
                            centralSummary = '센트럴파크 부근은 아니지만 지하철이 매우 가까워 약 ' + (Math.round(lineObj.sum)+2) + '분이면 센트럴파크 도착.';
                        }
                    }

                    centralWord.push(txt);
                }else{
                    txt = '이 숙소는 센트럴파크와 가까이 있지는 않지만 다른 장점들 때문에 추천됨.'
                    centralSummary = txt;
                    centralWord.push(txt);
                    score = 6
                }
            }

            score = Math.floor(score*10)/10;
            centralScoreArray.push(score);
            if(hotel.explain.theme){
                hotel.explain.theme.central = centralWord;
            }else{
                hotel.explain.theme = {
                    central : centralWord
                }
            }
        }

        broadScoreArray.sort((a, b) => b - a)
        console.log(broadScoreArray)

        firebase.database().ref("cities/"+city).update(this.data)
    }
}

export default Hotel;
