var Spot_Status = {

    order: "",
    user: "",
    data:{},

    inflate: function () {
        var data = this.data;

        var txt = ''
        txt += '<div class="header">'
        txt +=      '<h2>관광지 데이터 정리 현황</h2>';
        txt +=      '<p class="order" id="abc">가나다순</p>'
        txt +=      '<p class="order" id="changed">수정시간순</p>'
        txt += '</div>';
        txt += '<div class="wrapper">'
        txt +=      '<div class="liner liner--header">'
        txt +=              '<p class="liner__cityName">도시명</p>'
        txt +=              '<p class="liner__status">상태</p>'
        txt +=              '<p class="liner__charge">담당자</p>'
        txt +=      '</div>'

        var orderArray = [];
        console.log(data)

        for (var cid in data) {
            var city = data[cid];

            if (this.order === "abc") {
                orderArray.push({ cid: cid, idx: city.name })
            } else if (this.order === "changed") {
                orderArray.push({ cid: cid, idx: city.order.changed })
            }
        }

        orderArray = this.orderList(orderArray);
        var statusArray = [
            '<p class="liner__status"><span class="active">정보검증</span> > <span>합치기</span> > <span>2차검증</span> > <span>완료</span></p>',
            '<p class="liner__status"><span>정보검증</span> > <span class="active">합치기</span> > <span>2차검증</span> > <span>완료</span></p>',
            '<p class="liner__status"><span>정보검증</span> > <span>합치기</span> > <span class="active">2차검증</span> > <span>완료</span></p>',
            '<p class="liner__status"><span>정보검증</span> > <span>합치기</span> > <span>2차검증</span> > <span class="active">완료</span></p>'
        ]

        for (let i = 0; i < orderArray.length; i++) {
            var cid = orderArray[i].cid;
            var city = data[cid];

            txt += '<div class="liner" id="'+cid+'">';
            txt +=      '<p class="liner__cityName">' + city.name + '</p>';
            txt +=      statusArray[city.status.spot];
            txt +=      '<p class="liner__charge">담당자</p>';
            txt += '</div>';
        }
        txt += '</div>';//wrapper 닫기

        $(".pages.spot").html(txt);
        $("#"+this.order).addClass("order--selected");
    },

    init: function (u_i, data){
        var that = this;
        this.data = data;

        $(".spot").on("click", ".order", function(){
            that.order = $(this).attr("id");
            var uid = that.user.mail;
            firebase.database().ref('users/'+uid+"/setting/spot/order").set(that.order);
            that.inflate();
        })
    },

    orderList: function (orderArray) {
        orderArray.sort(function(a, b){
            return a.idx > b.idx ? 1 : a.idx < b.idx ? -1 : 0
        })

        return orderArray;
    }

}

export default Spot_Status;