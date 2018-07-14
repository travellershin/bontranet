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

        console.log(this.data.hotels)
    },

    score_safety: function(){
        let city = this.city;
        let orderArray = [];

        for (var hid in this.data.hotels) {
            let hotel = this.data.hotels[hid];

            let safe_txt = [];
            let score = 0;
            //교통 편의성 점수부여용
        }
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
