import Transport from "./score/transport.js";
import Safety from "./score/safety.js";

let Hotel = {
    city: "",
    cityName: "",

    init: function(cid, name){
        $(".cityName").html(name).attr("id", cid);
        $(".cityCodeView").addClass("displayNone");
        $(".hotel").removeClass("displayNone");

        firebase.database().ref('cities/'+cid).once('value', snap =>{
            var data = snap.val();
            this.city = cid;
            this.cityName = name;

            this.score(data);
        })
    },

    score: function (data){
        if(data.status){
            if(!data.status.hotels){
                //stauts는 있는데 호텔에 대한 status 데이터가 없으면 만들어 넣는다.
                data.status.hotels = {
                    transport: false,
                    safety: false,
                    facility: false,
                    theme:false
                }
            }
        }else{
            // status 데이터 자체가 없으면 만들어 넣는다.
            data.status = {
                hotels:{
                    transport: false,
                    safety: false,
                    facility: false,
                    theme: false
                }
            }
        }

        var status = data.status.hotels;

        //점수 체계가 완성되어있는지 검사하고 없으면 점수를 부여한다.
        //각 객체 안에서 점수를 계산해 데이터베이스에 업로드하며, return값으로는 값을 계산할 수 있었다/없었다라는 문구가 반환된다.
        if(status.transport){
            $("#status_transport").html("정보가 이미 존재합니다.")
        }else{
            $("#status_transport").html(Transport.init(data));
        }

        if(status.safety){
            $("#status_safety").html("정보가 이미 존재합니다.")
        }else{
            $("#status_safety").html(Safety.init(data));
        }

        // if(status.facility){
        //     $("#status_facility").html("정보가 존재합니다.")
        // }else{
        //     this.score_facility();
        // }

        // if(status.theme){
        //     this.score_theme();
        // }
    },

    score_facility: function(){
        var data = data;

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
        
    },

    score_transport: function(){
        let city = this.city

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

        var lowerpolyCoor = [{ lat: 40.7139396, lng: -74.0083909 }, { lat: 40.7146715, lng: -74.014678 }, { lat: 40.7101824, lng: -74.0157294 }, { lat: 40.7093935, lng: -74.0155256 }, { lat: 40.7089787, lng: -74.0146458 }, { lat: 40.7081085, lng: -74.011749 }, { lat: 40.7139396, lng: -74.0083909 }]
        var polygon = new google.maps.Polygon({
            paths: lowerpolyCoor
        });

        var promenade = [
            {
                lat: 40.6955013,
                lng: -73.9983004
            },
            {
                lat: 40.6965059,
                lng: -73.9978069
            },
            {
                lat: 40.6985029,
                lng: -73.9968467
            },
            {
                lat: 40.6997636,
                lng: -73.9956236
            }
        ]

        var dumbo = {
            lat: 40.7032205,
            lng: -73.989594
        }
        var bridge = [
            {
                lat: 40.7004896,
                lng: -73.9897388
            },
            {
                lat: 40.6961765,
                lng: -73.9887357
            }
        ]

        var largeStreet = ['Water', 'Church', 'West', 'Wall'];
        var largeStreetKo = ['워터', '처치', '웨스트', '월']




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


            

            themeArray = [];
            summary = "";
            score = 0;

            var hotel = data.hotels[hid];
            var txt = '';

            var hasLowerTheme = false;

            if (hotel.area === 22) {
                score += 8;
                //금융지구
                txt = '뉴욕의 <strong>가장 현대적인 모습을 곳곳에서 느낄 수 있는</strong> 금융지구 안에 위치한 숙소'
                themeArray.push(txt);

                var address = hotel.address.toLowerCase();
                var nearSomething = false;
                var coor = new google.maps.LatLng(hotel.coor.lat, hotel.coor.lng)
                if (google.maps.geometry.poly.containsLocation(coor, polygon)) {
                    score += 1.7;
                    txt = '금융지구 뿐만 아니라 <strong>뉴욕 내에서 가장 높은 원 월드 트레이드 센터</strong> 부근에 위치함'
                    themeArray.push(txt);
                    summary = '뉴욕의 가장 현대적인 모습을 느낄 수 있는 <strong>금융지구 안, 원 월드 트레이드 센터 부근</strong>에 위치함'
                    nearSomething = true;
                } else {
                    for (let i = 0; i < largeStreet.length; i++) {
                        if (hotel.address.includes(largeStreet[i])) {
                            score += 1.5;
                            nearSomething = true;
                            txt = '금융지구 내에서도 <strong>아름다운 건물들이 늘어선 ' + largeStreetKo[i] + ' 스트리트</strong>에 위치함'
                            themeArray.push(txt);
                            summary = '뉴욕의 가장 현대적인 모습을 느낄 수 있는 <strong>금융지구 안, 그 안에서도 아름다운 건물들이 늘어선 ' + largeStreetKo[i] + ' 스트리트</strong>에 위치함'
                        }
                    }

                    if (!nearSomething) {
                        summary = '뉴욕의 <strong>가장 현대적인 모습을 곳곳에서 느낄 수 있는</strong> 금융지구 안에 위치한 숙소'
                    }
                }
                hasLowerTheme = true;
                hotel.summary.theme.lower = summary;
            }
            if (hotel.area === 23) {
                score += 8;
                //브루클린
                txt = '<strong>뉴욕의 아름다운 스카이라인을 감상하기 가장 좋은</strong> 브루클린 헤이츠/비네거 힐 안에 위치한 숙소'
                themeArray.push(txt);

                var nearSomething = false;
                var somethingTxtArr = [];
                var pdif = 800;
                var nearPromenade = false;
                var summary = '';

                for (let i = 0; i < promenade.length; i++) {
                    var coor = promenade[i];
                    var dif = calculateDif(coor, hotel.coor);
                    if (dif < 800 && dif < pdif) {
                        pdif = dif;
                        nearPromenade = true;
                    }
                }

                if (nearPromenade) {
                    score += 0.6;
                    var difdif = bdif / 700
                    score += (1 - difdif.toFixed(1) * 1);
                    txt = '맨해튼 스카이라인을 감상할 수 있는 <strong>최고 명소 중 하나인 브루클린 헤이츠 산책로</strong>까지 ' + difToMinWord(pdif);
                    themeArray.push(txt);
                    nearSomething = true;
                    somethingTxtArr.push('브루클린 헤이츠 산책로');
                }

                var ddif = calculateDif(dumbo, hotel.coor);

                if (ddif < 800) {
                    score += 0.6;
                    var difdif = bdif / 600
                    score += (1 - difdif.toFixed(1) * 1);
                    txt = 'MBC 예능 <strong>무한도전의 달력 화보 촬영지로도 유명한 덤보 포토존</strong>까지 ' + difToMinWord(ddif);
                    themeArray.push(txt);
                    nearSomething = true;
                    somethingTxtArr.push('덤보 포토존');
                }

                themeArray.push(txt);
                var bdif = 900;
                var nearBridge = false;
                for (let i = 0; i < bridge.length; i++) {
                    var coor = bridge[i];
                    var dif = calculateDif(coor, hotel.coor);
                    if (dif < 800 && dif < bdif) {
                        bdif = dif;
                        nearBridge = true;
                        nearSomething = true;
                    }
                }

                if (nearBridge) {
                    score += 0.6;
                    var difdif = bdif / 600
                    score += (1 - difdif.toFixed(1) * 1);
                    txt = '맨해튼의 아름다운 스카이라인을 보며 직접 건널 수 있는 <strong>브루클린 브릿지의 입구</strong>까지 ' + difToMinWord(pdif);
                    themeArray.push(txt);
                    somethingTxtArr.push('브루클린 브릿지 입구');
                }
                if (nearSomething) {
                    if (somethingTxtArr.length > 1) {
                        summary = '<strong>뉴욕 스카이라인을 감상하기 좋은 브루클린 헤이츠/비네거 힐</strong> 안에 위치해 있으면서, 스카이라인 감상 명소들인 <strong>'
                        summary += somethingTxtArr.join(', ') + '</strong>에서 가까운 위치'
                    } else {
                        summary = '<strong>뉴욕 스카이라인을 감상하기 좋은 브루클린 헤이츠/비네거 힐</strong> 안에 위치해 있으면서, 스카이라인 감상 명소인 <strong>'
                        summary += somethingTxtArr[0] + '</strong>에서 가까운 위치'
                    }
                } else {
                    summary = '<strong>뉴욕의 아름다운 스카이라인을 감상하기 가장 좋은</strong> 브루클린 헤이츠/비네거 힐 안에 위치한 숙소'
                }

                hotel.summary.theme.lower = summary;

                hasLowerTheme = true;
            }

            if (!hasLowerTheme) {
                themeArray = ['로워 맨해튼 부근에 위치하지는 않지만 다른 이유들로 인해 추천된 숙소'];
                hotel.summary.theme.lower = '로워 맨해튼 부근에 위치하지는 않지만 다른 이유들로 인해 추천된 숙소'
            }
            score = (score.toFixed(1) * 1);
            scoreArray.push(score)
            if (score < 8) {
                score = 6;
            }

            hotel.explain.theme.lower = themeArray;
            hotel.assessment.theme.lower = score;



        }

        broadScoreArray.sort((a, b) => b - a)
        console.log(broadScoreArray)

        firebase.database().ref("cities/"+city).update(data)
    }
}

export default Hotel;
