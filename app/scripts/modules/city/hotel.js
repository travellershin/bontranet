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

        }
        if(status.costEff){

        }
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
                shortTxt += '유동인구가 매우 많은 맨해튼 한복판에 위치하고, 지하철도 가까워 밤 늦게까지 안전하지만 소매치기 등 경범죄에는 조심해야 함'
            }else{
                if(hotel.local.spot.length>0){
                    if(safety_local.grocery>0){
                        if(safety_local.atm>0){
                            localTxt += '주변 상업시설, 편의시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 유동인구가 매우 많음.'
                            localGood = true;
                        }else{
                            localTxt += '주변 편의시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 유동인구 많음.'
                            localGood = true;
                        }
                    }else{
                        if(safety_local.atm>0){
                            localTxt += '주변 상업시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 유동인구 많음.'
                            localGood = true;
                        }else{
                            localTxt +=  hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 유동인구가 많음.'
                            localGood = true;
                        }
                    }
                }else{
                    if(safety_local.grocery>0){
                        if(safety_local.atm>0){
                            localTxt += '주변 상업시설, 편의시설이 잘 갖추어져 있어 유동인구가 많음.'
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
                    shortTxt += '전반적으로 치안이 좋은 '+areaName+' 지역에 위치하고 있'
                }

                if(localGood){
                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 주변 유동인구가 많고 지하철이 가까워 밤 늦게까지도 매우 안전함.'
                        }else{
                            shortTxt += '으며, 주변 유동인구가 많아 지역 내에서도 더 안전한 편.'
                        }
                    }

                }else{
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 아주 많지는 않은 편.'

                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 지하철이 가까워 밤 늦게 귀가할 때도 안전한 편.'
                        }else{
                            shortTxt += '지만 너무 밤 늦게 돌아다니는 것은 삼가는 것이 좋음.'
                        }
                    }
                }
            }else if(areaScore>6.8){

                if(!safety_local.area){
                    shortTxt += '치안이 좋은 편인 '+areaName+' 지역에 위치하고 있'
                }

                if(localGood){

                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 주변 유동인구가 많고 지하철이 가까워 밤 늦게까지도 안전한 편.'
                        }else{
                            shortTxt += '으며, 주변 유동인구가 많아 지역 내에서도 안전한 편.'
                        }
                    }

                }else{
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 아주 많지는 않은 편.'

                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 지하철이 가까워 밤 늦게 귀가할 때도 안전한 편.'
                        }else{
                            shortTxt += '지만 너무 밤 늦게 돌아다니는 것은 삼가는 것이 좋음.'
                        }
                    }
                }

            }else if(areaScore>6){
                if(!safety_local.area){
                    shortTxt+= areaName+ ' 지역에 위치하고 있'
                }

                if(localGood){
                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 주변 유동인구가 많고 지하철이 가까워 밤 늦게 귀가할 때도 안전한 편.'
                        }else{
                            shortTxt += '으며, 주변 유동인구가 많아 안전한 편이지만 너무 밤 늦게 귀가하는 것은 삼가는 것이 좋음.'
                        }
                    }

                }else{
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 많지는 않은 편에 속함.'

                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 지하철이 가깝지만 너무 밤 늦게 귀가하는 것은 삼가는 것이 좋음.'
                        }else{
                            shortTxt += '으며, 주변 유동인구가 아주 많은 편은 아니므로 밤 늦게 돌아다니지 않는 것이 좋음.'
                        }
                    }
                }
            }else{
                if(!safety_local.area){
                    shortTxt+='전반적으로 치안이 좋지 않은 편인 '+areaName+ ' 지역에 위치하고 있'
                }

                if(localGood){
                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 유동인구가 많고 지하철이 가까워 지역 내에서는 안전한 편이지만 늦은 시간 귀가는 삼가는 것이 좋음.'
                        }else{
                            shortTxt += '으며, 주변 유동인구가 많은 편이지만 늦은 시간 귀가하지 않는 것이 좋음.'
                        }
                    }
                }else{
                    localTxt += '주변에 많은 시설이 있거나 유명한 관광지가 있지 않아 유동인구가 지역 내에서도 많지 않은 편.'
                    if(!safety_local.area){
                        if(hotel.local.nearestMetro.distance<100){
                            shortTxt += '으며, 지하철이 가깝지만 유동인구가 많지 않은 편이므로 안전에 유의해야 함.'
                        }else{
                            shortTxt += '으며, 유동인구가 많지 않아 안전에 유의해야 함.'
                        }
                    }
                }
            }

            safe_txt.push(localTxt);

            var met = hotel.local.nearestMetro;
            var metDis = met.distance;
            var metTxt = '가장 가까운 지하철 역은 ' + met.line + '호선 ' + met.name + '역으로, 도보로 약 ' +(Math.floor(metDis/75) + 1)+'분 거리에 있';

            if(metDis<200){
                metTxt += '어 늦은 밤에 귀가하기 좋음.'
            }else if(metDis<500){
                metTxt += '음.'
            }else{
                metTxt += '어 너무 늦은 밤에는 지하철로 귀가하기 부담스러울 수 있음'
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
                safe_txt.push('전반적으로 뉴욕의 숙소들 중에서도 치안으로는 최상위권에 속해 여행을 즐기기 좋음.')
            }else if(score>9){
                safe_txt.push('뉴욕 숙소들 중에서도 전반적으로 상당히 좋은 치안을 자랑함.')
            }else if(score>8.5){
                safe_txt.push('전반적으로 주변 치안이 안정되어 여행하기에 좋음.')
            }else if(score>7.9){
                safe_txt.push('밤 늦게 돌아다니지 않고 조심한다면 전반적으로 여행하기에 안전한 편.')
            }else if(score>7.3){
                safe_txt.push('전반적으로 뉴욕 평균 정도의 치안 수준을 보이며, 조심히 다닐 필요는 있음.')
            }else if(score>6.9){
                safe_txt.push('치안이 아주 나쁘지는 않지만 조심히 다니는 것이 좋음.')
            }else{
                safe_txt.push('치안이 좋은 편은 아니므로 안전한 숙소를 원한다면 좋은 선택은 아님.')
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

        console.log(scoreArray)

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

        firebase.database().ref("cities/"+city).update(this.data)
    },

    score_facility: function(){

    }
}

export default Hotel;
