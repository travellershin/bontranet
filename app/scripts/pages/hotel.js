import SetHotelInfo from "./hotel/setHotelInfo";
import SetArea from "./hotel/setHotelInfo/setArea";

var Hotel = {


    //inflate하면 호텔을 만들어내기 위한 정보 수집 상태가 표시됨 -> 

    init: function(){
        var that = this;

        firebase.database().ref('setting/cities').on("value", snap =>{
            var data = snap.val();
            this.inflate_status(data);
        });

        $(".hotel").on("click", ".status__make__hotel", function () {
            var cid = $(this).attr('cid');
            var cityName = $(this).parent().children('.status__city').html();
            that.inflate_city(cid, cityName);
        });
        $(".hotel").on("click", ".hotel__alert__confirm", function () {
            $(".hotel__alert__wrap").remove();
        });

        $(".hotel").on("click", ".cityArea__finish", function () {  //setArea를 끝낼때
            var cid = $(this).attr('cid');
            firebase.database().ref('cities/'+cid+'/hotels').once('value', snap =>{
                var data = snap.val();
                for (var hid in data) {
                    if(!data[hid].area){
                        if(data[hid].area === 0){
                            
                        }else{
                            delete data[hid];
                        }
                    }
                }

                 firebase.database().ref('cities/'+cid+'/hotels').set(data);
                 firebase.database().ref('setting/cities/' + cid + '/status/area').set(2);
                 firebase.database().ref('cities/' + cid + '/status/area').set(true);
            });

           
        });
    },

    inflate_city: function(cid, cityName){

        firebase.database().ref('cities/'+cid).once('value', snap =>{
            var data = snap.val();
            var check = true;
            var alertModal = '';
            alertModal += '<div class="hotel__alert__wrap">';
            alertModal +=     '<div class="hotel__alert">';

            if(!data){
                alertModal += '<p>관광지 정보가 아직 정리되지 않았습니다.</p>';
                alertModal += '<p>대중교통 정보가 없습니다.</p>';
                alertModal += '<p>편의시설 정보가 없습니다.</p>';
                alertModal += '<p>지역구분 정보가 없습니다.</p>';
                check = false;
            }else{
                if(data.spots){
                    if (!data.spots.ranked) {
                        alertModal += '<p>관광지 정보가 아직 정리되지 않았습니다.</p>';
                        check = false;
                    }
                }else{
                    alertModal += '<p>관광지 정보가 아직 정리되지 않았습니다.</p>';
                    check = false;
                }
                
                if (!data.metro) {
                    alertModal += '<p>대중교통 정보가 없습니다.</p>';
                    check = false;
                }else if(!data.metroLine){
                    alertModal += '<p>대중교통 정보가 정리되지 않았습니다(metroLine 없음).</p>';
                    check = false;
                }

                if (!data.local) {
                    alertModal += '<p>편의시설 정보가 없습니다.</p>';
                    check = false;
                }
                if (!data.area) {
                    alertModal += '<p>지역구분 정보가 없습니다.</p>';
                    check = false;
                }else if (!data.status.area){
                    SetArea.inflate(cityName, cid);
                    check = false;
                    toast('지역 설정을 먼저 진행합니다');
                }
            }

            
            alertModal += '<div class="hotel__alert__confirm">확인</div>';

            alertModal += '</div></div>';

            if(check){
                SetHotelInfo.init(data, cid, cityName);
            }else{
                $(".hotel").append(alertModal);
            }
        });
    },

    inflate_status: function(data){
        console.log(data);
        var txt = '';
        txt += '<div class="header">';
        txt +=      '<h2>숙소 리스트</h2>';
        txt += '</div>';
        txt += '<div class="wrapper">';

        txt += '<div class="status__liner">';
        txt +=      '<p class="status__name">도시명</p>';
        txt +=      '<p class="status__make">숙소 데이터</p>';
        txt +=      '<p class="status__hotel">기본 호텔데이터</p>';
        txt +=      '<p class="status__area">지역정보</p>';
        txt +=      '<p class="status__spot">관광지정보</p>';
        txt +=      '<p class="status__transport">대중교통정보</p>';
        txt += '</div>';

        for (var cid in data) {
            var city = data[cid];
            var status = city.status;
                txt += '<div class="status__liner">';
                txt +=      '<p class="status__city">'+city.name+'</p>';

                if(status.hotel === 2){
                    txt += '<p class="status__make">있음</p>';
                }else {
                    txt += '<p class="status__make status__make__hotel"  cid="' + city.code + '">없음 (클릭해 만들기)</p>';
                }

                if(status.hotel>0){
                    txt += '<p class="status__hotel">O</p>';
                }else{
                    txt += '<p class="status__hotel">X</p>';
                }

                if(status.area){
                    txt += '<p class="status__area">O</p>';
                }else{
                    txt += '<p class="status__area">X</p>';
                }

                if (status.spot > 2) {
                    txt += '<p class="status__spot">O</p>';
                } else {
                    txt += '<p class="status__spot">X</p>';
                }

                if (status.transport === 2) {
                    txt += '<p class="status__transport">O</p>';
                } else {
                    txt += '<p class="status__transport">X</p>';
                }
                txt += '</div>';
        }
        txt += '</div>';

        $(".pages.hotel").html(txt);
    }

}

export default Hotel;