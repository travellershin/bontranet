let View_Metro = {
    map:{},
    polyLine:{},
    data:{},
    markerSet: [],

    init: function(data){
        this.data = data;
        console.log(data);
        let metroLine = data.metroLine;
        for (let line in metroLine) {
            if(metroLine[line].stn){
                let polyLine = [];
                for (let i = 0; i < metroLine[line].stn.length; i++) {
                    if(metroLine[line].stn[i].coor){
                        polyLine.push(metroLine[line].stn[i].coor);
                    }   
                }
                this.polyLine[line] = new google.maps.Polyline({
                    path:polyLine,
                    strokeColor:metroLine[line].color,
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
            }
        }
    },

    full: function(){
        if(this.marker){    //기존 마커 초기화
            this.marker.setMap(null);
        }
        google.maps.event.clearListeners(this.map, 'click');

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(this.map);
        }
    },

    disable: function(){
        if(this.marker){    //기존 마커 초기화
            this.marker.setMap(null);
        }
        google.maps.event.clearListeners(this.map, 'click');

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(null);
        }
    },

    clickMode: function(){
        let that = this;

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(null);
        }
        this.map.addListener('click', function(e){
            that.findMetro(e);
        });
    },

    findMetro: function(e){
        let lineObj = {};  //key:라인명, value:{stn:station, dif:dif}

        let clickCoor = {
            lat:e.latLng.lat(),
            lng:e.latLng.lng()
        };
        let metros = this.data.local.metro;

        if(this.marker){    //기존 마커 초기화
            this.marker.setMap(null);
        }
        for (var line in this.polyLine) {   //기존 그려져있던 폴리라인 초기화
            this.polyLine[line].setMap(null);
        }
        for (let i = 0; i < this.markerSet.length; i++) {
            this.markerSet[i].setMap(null);
        }
        this.markerSet = [];

        this.marker = new google.maps.Marker({
            position: e.latLng,
            map: this.map
        });

        for (let i = 0; i < metros.length; i++) {
            let metro = metros[i];
            let dif = calculateDif(clickCoor, metro.coor);

            if(dif<500){
                for (let j = 0; j < metro.line.length; j++) {
                    let line = metro.line[j];

                    if(lineObj[line]){  //이미 있으면 짧은 거리로 업데이트
                        if(dif < lineObj[line].dif){
                            lineObj[line] = {
                                stn:metro,
                                dif:dif
                            };
                        }
                    }else{ //없으면 새로 추가
                        lineObj[line] = {
                            stn:metro,
                            dif:dif
                        };
                    }
                }
            }
        }

        let txt = '';
        txt+='<div class="metro__info">';

        for (let line in lineObj) {
            this.polyLine[line].setMap(this.map);

            let stn = lineObj[line].stn;
            let marker = new google.maps.Marker({
                position: stn.coor,
                map:this.map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeColor: this.data.metroLine[line].color,
                    scale: 7,
                    strokeWeight:5
                },
            });
            txt+='<div class="metro__info__line">';
            txt+=   '<p class="metro__info__lineName" style="background:'+this.data.metroLine[line].color+'">'+line+'</p>';
            txt+=   '<p class="metro__info__dif">'+ Math.round(lineObj[line].dif) + 'm</p>';
            txt+=   '<p class="metro__info__stnName">'+ stn.name + '역</p>';
            txt+='</div>';

            this.markerSet.push(marker);
        }

        txt += '</div>';

        $(".view .viewer").html(txt);

    }
};

export default View_Metro;