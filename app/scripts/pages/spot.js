import First_check from "./spot/first_check.js";
import Second_combine from "./spot/seond_combine.js"

var Spot = {
    cities: {},
    order:"",
    data: {},
    current:"", //현재 보고있는 도시 cid - firebase ref에 off 달기위해

    init: function (u_i){
        var that = this;
        First_check.init();

        this.order = u_i.setting.order;

        firebase.database().ref('setting/cities').on("value", snap => {
            var data = snap.val()
            that.cities = data;
            that.order = u_i.setting.order;
            that.data = data;
            that.inflate_status();
        })

        $(".spot").on("click", ".active", function () {
            var cid = $(this).parent().parent().attr('id');
            var status = that.cities[cid].status.spot;

            that.inflate_city(cid, status)
        })

        $(".spot").on("click", ".order", function () {
            that.order = $(this).attr("id");
            var uid = u_i.mail;
            firebase.database().ref('users/' + uid + "/setting/order").set(that.order);
            that.inflate_status();
        })

        $(".spot").on("click", ".return", function () {
            that.inflate_status();
        })
    },

    inflate_status: function(){
        var data = this.data;

        var txt = '';
        txt += '<div class="header">';
        txt += '<h2>관광지 데이터 정리 현황</h2>';
        txt += '<p class="order" id="abc">가나다순</p>';
        txt += '<p class="order" id="changed">수정시간순</p>';
        txt += '</div>';
        txt += '<div class="wrapper">';
        txt += '<div class="liner liner--header">';
        txt += '<p class="liner__cityName">도시명</p>';
        txt += '<p class="liner__status">상태</p>';
        txt += '<p class="liner__charge">담당자</p>';
        txt += '</div>';

        var orderArray = [];
        console.log(data);

        for (var cid in data) {
            var city = data[cid];

            if (this.order === "abc") {
                orderArray.push({ cid: cid, idx: city.name })
            } else if (this.order === "changed") {
                orderArray.push({ cid: cid, idx: city.order.changed })
            }
        }

        orderArray.sort(function (a, b) {
            return a.idx > b.idx ? 1 : a.idx < b.idx ? -1 : 0
        })

        var statusArray = [
            '<p class="liner__status"><span class="active">정보수집</span> > <span>정보검증</span> > <span>합치기</span> > <span>2차검증</span> > <span>완료</span></p>',
            '<p class="liner__status"><span>정보수집</span> > <span class="active">정보검증</span> > <span>합치기</span> > <span>2차검증</span> > <span>완료</span></p>',
            '<p class="liner__status"><span>정보수집</span> > <span>정보검증</span> > <span class="active">합치기</span> > <span>2차검증</span> > <span>완료</span></p>',
            '<p class="liner__status"><span>정보수집</span> > <span>정보검증</span> > <span>합치기</span> > <span class="active">2차검증</span> > <span>완료</span></p>',
            '<p class="liner__status"><span>정보수집</span> > <span>정보검증</span> > <span>합치기</span> > <span>2차검증</span> > <span class="active">완료</span></p>'
        ]

        for (let i = 0; i < orderArray.length; i++) {
            var cid = orderArray[i].cid;
            var city = data[cid];

            txt += '<div class="liner" id="' + cid + '">';
            txt += '<p class="liner__cityName">' + city.name + '</p>';
            txt += statusArray[city.status.spot];
            txt += '<p class="liner__charge">담당자</p>';
            txt += '</div>';
        }
        txt += '</div>';//wrapper 닫기

        $(".pages.spot").html(txt);
        $("#" + this.order).addClass("order--selected");
    },

    inflate_city: function (cid, status){
        var that = this;

        firebase.database().ref('cities/' + that.current).off("value");

        firebase.database().ref('cities/' + cid).on("value", snap => {
            that.current = cid;
            var data = snap.val();

            if (data) {
                var cityName = that.cities[cid].name;
                if (status === 1) {   //현재 정보수집상태 검증
                    $(".header").html('<h2>' + cityName + ' 정보검증</h2>').attr('cid', cid).attr('cityName',cityName).addClass("cityName");
                    First_check.inflate(data.spots);
                } else if (status === 2) { //합치기작업
                    Second_combine.init()
                } else {  //2차검증화면과 완료화면은 따로 차이가 없음

                }
            }else{
                toast('아무런 데이터가 없습니다. 데이터 수집을 먼저 진행해주세요.')
            }
        })

        $(".nav__item").click(function () {
            if($(this).hasClass('nav__item--hasDrawer')){
                return false;
            }
            firebase.database().ref('cities/' + that.current).off("value");
        })

        $(".nav__drawer__item ").click(function () {
            if ($(this).attr('id') === 'nav_spot') {
                return false;
            }
            firebase.database().ref('cities/' + that.current).off("value");
        })
    }
}

export default Spot;