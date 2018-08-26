import View_Metro from "./view/metro.js";
import View_Spot from "./view/spot.js";

let View = {
    map:{},
    data:{},

    inflateCity: function(cid){
        firebase.database().ref("cities/"+cid).once("value", snap => {
            let data = snap.val();
            View_Metro.init(data);
            View_Spot.init(data);
            this.data = data;
            toast("도시정보 로딩 완료");
        });
    },

    listener:function(){
        $(".view").on("click", ".metro_full", function(){
            View_Metro.full();
        });
        $(".view").on("click", ".metro_disable", function(){
            View_Metro.disable();
        });
        $(".view").on("click", ".click_metro", function(){
            View_Metro.clickMode();
        });
        $(".view").on("click", ".click_metroSpot", function(){
            View_Metro.clickSpotMode();
        });
        $(".view").on("focusout", ".setter__radius__input", function(){
            View_Metro.changeRadius();
        });
        $(".view").on("click", ".spot_full", function(){
            View_Spot.full();
        });
        $(".view").on("click", ".spot_core", function(){
            View_Spot.core();
        });
        $(".view").on("click", ".spot_disable", function(){
            View_Spot.disable();
        });
    },

    init: function(){
        this.inflateCity("nyc");
        let txt = "";
        txt += "<div class='wrapper'>";
        txt +=     "<div class='left' id='map'>";
        txt +=     "</div>";
        txt +=     "<div class='right'>";
        txt +=          "<div class='header'><ul>";
        txt +=          "</ul></div>";
        txt +=          "<div class='setter'><h3></h3><div class='setter__content'></div></div>";
        txt +=          "<div class='viewer'></div>";
        txt +=     "</div>";
        txt += "</div>";
        $(".pages.view").html(txt);

        let header = {
            "메트로":[
                {ko:"지우기", en:"metro_disable"},
                {ko:"전체 노선", en:"metro_full"},
                {ko:"핵심 노선", en:"metro_core"}
            ],
            "관광지":[
                {ko:"지우기", en:"spot_disable"},
                {ko:"전체 관광지", en:"spot_full"},
                {ko:"핵심 관광지", en:"spot_core"}
            ],
            "클릭 추적":[
                {ko:"지하철 노선만",en:"click_metro"},
                {ko:"지하철과 관광지", en:"click_metroSpot"}
            ]
        };

        let hTxt = '';
        for (let item in header) {
            hTxt += '<li class="dropdown">';
            hTxt +=     '<p class="dropbtn">'+item+'</p>';
            hTxt +=     '<div class="dropdown__content">';

            for (let i = 0; i < header[item].length; i++) {
                hTxt +=     '<p class="'+header[item][i].en+'">'+header[item][i].ko+'</p>';
            }
            hTxt +=     '</div>';
            hTxt += '</li>';
        }
        $(".view .header").html(hTxt);

        this.listener();


        this.map = new google.maps.Map(document.getElementById('map'), {
            center:{lat:40.7516,lng:-73.9887},
            zoom:13,
            disableDefaultUI: true,
            styles:[
                {
                  "featureType": "administrative",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "administrative.land_parcel",
                  "elementType": "labels",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "stylers": [
                    {
                      "visibility": "on"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "labels.icon",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "road.local",
                  "elementType": "labels",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "transit",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                }
              ]
        });

        View_Metro.map = this.map;
        View_Spot.map = this.map;
    }
};

export default View;