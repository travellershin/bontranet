let City = {
    data: {},

    listener: function(){
        let that = this;

        $(".city").on("click", ".refresh", function(){
            if (confirm("데이터를 많이 잡아먹습니다! 정말 최신화하시겠습니까?")) {
                that.refreshStatus();
            }
        });
    },

    inflate: function(data){
        let txt = '';

        txt+= '<div class="header">';
            txt += '<h2>도시 데이터 확보현황</h2>';
            txt += '<p class="refresh">최신화</p>';
        txt+= '</div>';

        txt+= '<div class="wrapper">';

        txt+= '<div class="line top">';
        txt+=      '<p class="name">도시명</p>';
        txt+=      '<p class="city__hotels">숙소</p>';
        txt+=      '<p class="city__spots">관광지 정리</p>';
        txt+=      '<p class="city__transport">교통</p>';
        txt+=      '<p class="city__area">지역</p>';
        txt+=      '<p class="city__price">물가</p>';
        txt+= '</div>';
        
        for (var code in data) {
            var city = data[code];
            var status = city.status;

            txt += '<div class="line" id="' + city.code + '"><p class="name">' + city.name + '</p>';

            if (status.hotel === 2) {
                txt += '<p class="city__hotels weight--bold">평가 완료</p>';
            } else if (status.hotel === 1) {
                txt += '<p class="city__hotels">데이터 있음</p>';
            } else {
                txt += '<p class="city__hotels color--red">데이터 없음</p>';
            }

            if (status.spot === 4) {
                txt += '<p class="city__spots weight--bold">정보검증 완료</p>';
            } else if (status.spot === 3) {
                txt += '<p class="city__spots">2차검증</p>';
            } else if (status.spot === 2) {
                txt += '<p class="city__spots">합치기</p>';
            } else if (status.spot === 1) {
                txt += '<p class="city__spots">정보 검증중</p>';
            } else {
                txt += '<p class="city__spots color--red">정보 없음</p>';
            }

            if (status.transport === 2) {
                txt += '<p class="city__transport weight--bold">대중교통 완료</p>';
            } else if (status.transport === 1) {
                txt += '<p class="city__transport">데이터 있음</p>';
            } else {
                txt += '<p class="city__transport color--red">데이터 없음</p>';
            }

            if (status.area) {
                txt += '<p class="city__area">O</p>';
            } else {
                txt += '<p class="city__area color--red">X</p>';
            }

            if (status.price) {
                txt += '<p class="city__price">O</p>';
            } else {
                txt += '<p class="city__price color--red">X</p>';
            }
            txt += '</div>';
        }

        txt += '</div>'; //close wrapper

        $(".city").html(txt);

    },

    init: function(){
        this.listener();

        firebase.database().ref('setting/cities').once("value", snap =>{
            var data = snap.val();
            this.data = data;
            this.inflate(data);
        });
    },

    refreshStatus: function(){
        var that = this;

        firebase.database().ref('cities').once("value", snap=>{
            var data = snap.val();
            for (var cid in that.data) {

                var status = {};

                var city = data[cid];

                if(city){
                    status = {
                        hotel: 0, //0:데이터없음, 1:숙소데이터만 있음, 2:평가데이터(워딩) 있음
                        spot: that.data[cid].status.spot,
                        area: 0,
                        transport: 0, //데이터없음, 1:메트로데이터만 있음, 2:가공데이터(라인별..등) 있음
                        price: 0
                    };

                    if (city.area) {
                        status.area = 1;
                    }

                    if(city.hotels){
                        var hotel = city.hotels[Object.keys(city.hotels)[0]];

                        if(hotel.assessment){
                            status.hotel = 2;
                        }else{
                            status.hotel = 1;
                        }

                        if(hotel.area){
                            status.area = 2;
                        }else if(hotel.area === 1){
                            status.area = 2;

                            if(city.status){
                                city.status.area = true;
                            }else{
                                city.status = {
                                    area: true
                                };
                            }

                        }else{
                            if (city.status) {
                                city.status.area = false;
                            } else {
                                city.status = {
                                    area: false
                                };
                            }
                        }
                        firebase.database().ref('cities/' + cid + '/status').update(city.status);
                    }

                    if(city.metro){
                        if(city.metroLine){
                            status.transport = 2;
                        }else{
                            status.transport = 1;
                        }
                    }

                    if(city.price){
                        status.price = 1;
                    }
                }else{
                    status = {
                        hotel: 0, //0:데이터없음, 1:숙소데이터만 있음, 2:평가데이터(워딩) 있음
                        spot: 0,
                        area: 0,
                        transport: 0, //데이터없음, 1:메트로데이터만 있음, 2:가공데이터(라인별..등) 있음
                        price: 0
                    };
                }

                this.data[cid].status = status;
            }
            firebase.database().ref('setting/cities').set(that.data).then(() => {
                that.inflate(that.data);
                toast('최신화 완료');
            });
        });
    }
};

export default City;
