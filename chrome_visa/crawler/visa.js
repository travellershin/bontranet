let parse_visa = {
    index: 0,

    hotels:{},

    array:{},

    init: function(){
        cid = "nyc";
        firebase.database().ref('setting/cities').once("value", snap => {
            var data = snap.val();
            var status = data[cid].status.hotel;
            if(status>0){
                firebase.database().ref("cities/"+cid+"/hotels").once("value", snap => {
                    this.hotels[cid] = snap.val();
                    this.array[cid] = Object.keys(this.hotels[cid]);

                    this.checkATM(0, cid);
                });
            }
        })

        
    },



    makeUrl: function(idx, cid){
        let txt = '{"wsRequestHeaderV2":{"applicationId":"VATMLOC","requestMessageId":"test12345678","userId":"CDISIUserID","userBid":"10000108","correlationId":"909420141104053819418"},'
        txt+='"requestData":{"culture":"en-US","distance":null,"distanceUnit":"mi","metaDataOptions":0,"location":{"address":null,"placeName":"","geocodes":{"latitude":"'
        txt+=this.hotels[cid][this.array[cid][idx]].coor.lat + '","longitude":"' + this.hotels[cid][this.array[cid][idx]].coor.lng;
        txt+='"}},"options":{"sort":{"primary":"distance","direction":"asc"},"range":{"start":0,"count":';
        txt+=30;
        txt+='},"operationName":"and","useFirstAmbiguous":true}}}';

        return encodeURI(txt)
    },

    checkATM: function (idx, cid) {
        let url = 'https://www.visa.com/atmlocator_services/rest/findNearByATMs?callback=jQuery1124018670284300449302_1530957634024&request='
        url += this.makeUrl(idx, cid) + '%26_%3D1530957634028';

        let that = this;

        let request = new XMLHttpRequest();
        request.open("GET",url,false);
        //url에 get 요청을 보낼 것이며, 비동기 방식으로 실행될것이다(3번째 파라미터 async : true)
        request.onreadystatechange = function(){
            if(request.readyState === 4 && request.status === 200){
                //제대로 통신 되었는지를 확인한다.

                       let txt = (request.responseText);
                       //데이터 타입이 텍스트가 맞다면 받아온 데이터를 txt라는 변수에 넣는다.

                       txt = txt.split('jQuery1124018670284300449302_1530957634024(')[1];
                       txt = txt.slice(0,-1);

                       let data = JSON.parse(txt);
                       let setData = data.responseData[0].foundATMLocations;

                       if(!that.hotels[cid][that.array[cid][idx]].temp){
                           if(data.responseData){
                                firebase.database().ref("cities/" + cid + "/hotels/" + that.array[cid][idx] + "/local/atm").set(setData)
                                console.log("cities/" + cid + "/hotels/" + that.array[cid][idx] + "/local/atm");
                                console.log(setData)
                           }
                       }else{
                           if (!that.hotels[cid][that.array[cid][idx]].temp.atm) {
                               if(data.responseData){
                                    firebase.database().ref("cities/"+cid+"/hotels/"+that.array[cid][idx]+"/local/atm").set(setData)
                               }
                           }
                       }

             }else{
                 console.log(request.status)
                 console.log('사이트 응답 지연중');
                 //비동기 방식의 특성상, 이 로그는 서버 응답이 아무리 빨라도 몇 차례 뜰 것이다.
             }
         };
         request.send(null)

         idx++;

         setTimeout(function () {
             if(idx<that.array[cid].length){
                 that.checkATM(idx, cid);
                 $(".site").html("호텔번호 - "+that.array[cid][idx] + " 처리중");
             }
         }, 1000);


    }
};