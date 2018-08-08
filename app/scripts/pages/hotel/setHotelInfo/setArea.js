var SetArea = {
    map:{},
    marker:{},

    inflate: function (cityName, cid) {

        firebase.database().ref('cities/'+cid).once('value', snap =>{
            var data = snap.val();

            for (var hid in this.marker) {
                this.marker[hid].setMap(null);
            }
            this.marker = {};

            var txt = "";

            txt += '<div class="header">';
            txt += '<h2>' + cityName + ' 숙소 지역 구분</h2>';
            txt += '</div>';
            txt += '<div class="cityArea__wrap">';
            txt += '<div id="cityArea__map"></div>';
            txt += '<div class=""cityArea>';
            txt += '<p class="cityArea__word"></p>';
            txt += '<p cid="' + cid + '" class="cityArea__finish">완료처리</p>';
            txt += '</div>';
            txt += '</div>'; //close wrapper

            $(".pages.hotel").html(txt);



            this.map = new google.maps.Map(document.getElementById('cityArea__map'), {
                center: {
                    lat: 40.743195793,
                    lng: -73.98917954
                },
                zoom: 13
            });

            console.log(data);

            for (var hid in data.hotels) {
                var hotel = data.hotels[hid];
                var noArea = true;

                if (!hotel.area) {
                    for (let i = 0; i < data.area.length; i++) {
                        var areaCoor = data.area[i].coor;

                        if (isInArea(hotel.coor, areaCoor)) {
                            hotel.area = i;
                            noArea = false;
                        }
                    }

                    if (noArea) {
                        this.marker[hid] = new google.maps.Marker({
                            position: hotel.coor,
                            map: this.map,
                            label: '' + hid
                        });
                    }
                }
            }

            firebase.database().ref('cities/' + cid + '/hotels').update(data.hotels);
        });
    }
};

export default SetArea;
