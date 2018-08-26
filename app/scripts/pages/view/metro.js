let View_Metro = {
    map:{},
    polyLine:{},
    data:{},
    markerSet: [],
    radius:500,

    init: function(data){
        this.data = data;

        //기존 세팅 초기화
        for (var line in this.polyLine) {
            this.polyLine[line].setMap(null);
        }
        this.polyLine = {};
        if(this.marker){    //기존 마커 초기화
            this.marker.setMap(null);
        }
        for (let i = 0; i < this.markerSet.length; i++) {
            this.markerSet[i].setMap(null);
        }
        this.markerSet = [];


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
        $(".view .setter h3").html('전체 노선');
        $(".view .setter__content").html('');
        $(".view .viewer").html('');
        if(this.marker){    //기존 마커 초기화
            this.marker.setMap(null);
        }
        google.maps.event.clearListeners(this.map, 'click');

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(this.map);
        }
        for (let i = 0; i < this.markerSet.length; i++) {
            this.markerSet[i].setMap(null);
        }
        this.markerSet = [];
    },

    disable: function(){
        $(".view .setter h3").html('');
        $(".view .setter__content").html('');
        $(".view .viewer").html('');
        if(this.marker){    //기존 마커 초기화
            this.marker.setMap(null);
        }
        google.maps.event.clearListeners(this.map, 'click');

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(null);
        }
        for (let i = 0; i < this.markerSet.length; i++) {
            this.markerSet[i].setMap(null);
        }
        this.markerSet = [];
    },

    clickMode: function(){
        $(".view .setter h3").html('클릭 추적 - 지하철 노선만');
        let that = this;

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(null);
        }
        google.maps.event.clearListeners(this.map, 'click');
        this.map.addListener('click', function(e){
            that.findMetro(e);
        });

        let txt = '';
        txt += '<div class="setter__radius">';
        txt +=     '<span class="setter__txt">탐색반경 </span>';
        txt +=     '<input class="setter__radius__input" value="'+this.radius+'">';
        txt += '</div>';

        $(".view .setter__content").html(txt);
    },

    clickSpotMode: function(){
        $(".view .setter h3").html('클릭 추적 - 지하철 노선과 연관 관광지');
        let that = this;

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(null);
        }
        google.maps.event.clearListeners(this.map, 'click');
        this.map.addListener('click', function(e){
            that.findMetroSpot(e);
        });

        let txt = '';
        txt += '<div class="setter__radius">';
        txt +=     '<span class="setter__txt">탐색반경 </span>';
        txt +=     '<input class="setter__radius__input" value="'+this.radius+'">';
        txt += '</div>';

        $(".view .setter__content").html(txt);
    },
    changeRadius: function(){
        let input = $(".setter__radius__input").val()*1;
        if(isNaN(input)){
            toast("숫자만 입력해주세요");
        }else if(input>100&&input<601){
            this.radius = input;
        }else{
            toast("100~600 사이로 입력해주세요");
        }
    },

    findMetroSpot: function(e){
        let lineObj = {};  //key:라인명, value:{stn:station, dif:dif}
        let stnArr = [];
        let spotObj = {};

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
            metro.dif = dif;

            if(dif<this.radius){
                stnArr.push(metro);

                for (let j = 0; j < metro.line.length; j++) {
                    let line = metro.line[j];

                    if(lineObj[line]){  //이미 있으면 짧을 때만 덮어씌움
                        if(dif < lineObj[line].dif){
                            lineObj[line] = metro;
                        }
                    }else{ //없으면 새로 추가
                        lineObj[line] = metro;
                    }
                }
            }
        }

        stnArr.sort((a, b) => a.dif - b.dif);

        let txt = '';
        txt+='<div class="metro__info">';

        for (let i = 0; i < stnArr.length; i++) {
            let stn = stnArr[i];

            txt+='<div class="metro__info__stn">';

            txt+=   '<p class="metro__info__stn__name">'+ stn.name + '역</p>';
            txt+=   '<div class="metro__info__stn__line">';

            for (let j = 0; j < stn.line.length; j++) {
                let line = stn.line[j];
                let color = this.data.metroLine[line].color;
                let fontColor = "#fff";
                if(this.data.metroLine[line].fontColor){
                    fontColor = this.data.metroLine[line].fontColor;
                }

                let marker = new google.maps.Marker({
                    position: stn.coor,
                    map:this.map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        strokeColor: color,
                        scale: (8-j*2),
                        strokeWeight:2
                    },
                });
                this.markerSet.push(marker);

                txt+=   '<p class="metro__info__lineName" style="background:'+color+'; color:'+fontColor+'">'+line+'</p>';
            }
            txt+=   '<p class="metro__info__stn__dif">'+ Math.round(stn.dif) + 'm</p>';

            txt+=   '</div>';
            txt+='</div>';
        }
        console.log(lineObj);

        for (let line in lineObj) {
            if(this.polyLine[line]){
                this.polyLine[line].setMap(this.map);
                let dif = lineObj[line].dif;
                let spots = this.data.metroLine[line].spot;

                for (let i = 0; i < spots.length; i++) {
                    let rank = spots[i].rank;

                    if(this.radius > spots[i].dif){
                        if(spotObj[rank]){
                            let oldDif = spotObj[rank].dif.hotel + spotObj[rank].dif.spot;
                            let newDif = spots[i].dif + dif;
    
                            if(oldDif > newDif){
                                spotObj[rank] = spots[i];
                                spotObj[rank].stn = {
                                    spot: spots[i].stn.name,
                                    hotel: lineObj[line].name
                                };
                                spotObj[rank].line = line;
                                spotObj[rank].dif = {
                                    hotel:dif,          //숙소에서 가까운 메트로까지의 dif
                                    spot:spots[i].dif   //메트로에서 스팟까지의 dif
                                };
                            }
                        }else{
                            spotObj[rank] = spots[i];
                            spotObj[rank].stn = {
                                spot: spots[i].stn.name,
                                hotel: lineObj[line].name
                            };
                            spotObj[rank].line = line;
                            spotObj[rank].dif = {
                                hotel:dif,          //숙소에서 가까운 메트로까지의 dif
                                spot:spots[i].dif   //메트로에서 스팟까지의 dif
                            };
                        }
                    }

                }
            }
        }
        console.log(spotObj);

        txt += '<div class="spot__info">';

        txt += '<div class="spot__info__line">';
        txt += '<p class="spot__info__name">관광지명</p>';
        txt += `<p class="spot__info__lineName--txt">노선</p>`;
        txt += `<p class="spot__info__stnName">역명</p>`;
        txt += `<p class="spot__info__distance">역에서 거리</p>`;
        txt += '</div>';


        for (let rank in spotObj) {
            let spot = spotObj[rank];
            let line = spot.line;
            
            let color = this.data.metroLine[line].color;
            let fontColor = "#fff";
            if(this.data.metroLine[line].fontColor){
                fontColor = this.data.metroLine[line].fontColor;
            }
            let dif = Math.round(spot.dif.spot);

            txt += '<div class="spot__info__line">';
            txt += '<p class="spot__info__name">'+spot.name.ko+'</p>';
            txt += `<p class="spot__info__lineName" style="background:${color}; color:${fontColor}">${line}</p>`;
            txt += `<p class="spot__info__stnName">${spot.stn.spot}역</p>`;
            txt += `<p class="spot__info__distance">${dif}</p>`;
            txt += '</div>';
        }

        txt += '</div>';

        $(".view .viewer").html(txt); 
    },

    findMetro: function(e){
        let lineObj = {};  //key:라인명, value:{stn:station, dif:dif}
        let stnArr = [];

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
            metro.dif = dif;

            if(dif<this.radius){
                stnArr.push(metro);

                for (let j = 0; j < metro.line.length; j++) {
                    let line = metro.line[j];

                    if(lineObj[line]){  //이미 있으면 짧을 때만 덮어씌움
                        if(dif < lineObj[line].dif){
                            lineObj[line] = metro;
                        }
                    }else{ //없으면 새로 추가
                        lineObj[line] = metro;
                    }
                }
            }
        }

        stnArr.sort((a, b) => a.dif - b.dif);

        let txt = '';
        txt+='<div class="metro__info">';

        for (let i = 0; i < stnArr.length; i++) {
            let stn = stnArr[i];

            txt+='<div class="metro__info__stn">';

            txt+=   '<p class="metro__info__stn__name">'+ stn.name + '역</p>';
            txt+=   '<div class="metro__info__stn__line">';

            for (let j = 0; j < stn.line.length; j++) {
                let line = stn.line[j];
                let color = this.data.metroLine[line].color;
                let fontColor = "#fff";
                if(this.data.metroLine[line].fontColor){
                    fontColor = this.data.metroLine[line].fontColor;
                }

                let marker = new google.maps.Marker({
                    position: stn.coor,
                    map:this.map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        strokeColor: color,
                        scale: (8-j*2),
                        strokeWeight:2
                    },
                });
                this.markerSet.push(marker);

                txt+=   '<p class="metro__info__lineName" style="background:'+color+'; color:'+fontColor+'">'+line+'</p>';
            }
            txt+=   '<p class="metro__info__stn__dif">'+ Math.round(stn.dif) + 'm</p>';

            txt+=   '</div>';
            txt+='</div>';
        }

        for (let line in lineObj) {
            if(this.polyLine[line]){
                this.polyLine[line].setMap(this.map);
            }
        }

        $(".view .viewer").html(txt);

    }
};

export default View_Metro;