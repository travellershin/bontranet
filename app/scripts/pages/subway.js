let Subway = {
    map:{},
    marker:false,
    metro:[],

    init: function(){
        let that = this;
        console.log("ylo")

        firebase.database().ref("cities/nyc/metro").once("value", snap => {
            that.metro = snap.val();

            that.map = new google.maps.Map(document.getElementById('subwayMap'), {
                center: { lat: 40.74844, lng: -73.98566 },
                zoom: 13,
                mapTypeControl: false,
                scaleControl: true,
                fullscreenControl: false
            });

            that.map.addListener('click', function(e){
                that.findSubway(e);
            })
        })
    },

    findSubway: function(e){
        let coor = {
            lat:e.latLng.lat(),
            lng:e.latLng.lng()
        }

        if(this.marker){
            this.marker.setMap(null)
        }

        this.marker = new google.maps.Marker({
            position: e.latLng,
            map: this.map
        });

        let txt = ''
        let metroInfo = {}
        let metroByStn = {};

        for (let i = 0; i < 473; i++) {
            let metroName = this.metro[i].name;

            let dif = Math.round(calculateDif(coor,this.metro[i].coor));

            if(dif<700){
                for (let k = 0; k < this.metro[i].line.length; k++) {
                    let line = this.metro[i].line[k].slice(0,1);

                    if(metroInfo[line]){
                        if(dif<metroInfo[line].dif){
                            metroInfo[line] = {
                                dif: dif,
                                name: metroName
                            }
                        }
                    }else{
                        metroInfo[line] = {
                            dif: dif,
                            name: metroName
                        }
                    }
                }

                if(metroByStn[metroName]){
                    metroByStn[metroName].line = metroByStn[metroName].line.concat(this.metro[i].line)
                }else{
                    metroByStn[metroName] = {
                        dif: dif,
                        line: this.metro[i].line
                    }
                }

            }
        }
        let metArray = [];
        for (var line in metroInfo) {
            metArray.push({
                line:line,
                name:metroInfo[line].name,
                dif:metroInfo[line].dif
            });
        }

        let metStnArray = [];
        for (var name in metroByStn) {
            metStnArray.push({
                line:metroByStn[name].line,
                name:name,
                dif:metroByStn[name].dif
            });
        }

        metArray.sort(function(a, b){
            return a.dif > b.dif ? 1 : a.dif < b.dif ? -1 : 0;
        })
        metStnArray.sort(function(a, b){
            return a.dif > b.dif ? 1 : a.dif < b.dif ? -1 : 0;
        })

        txt+='<p class="subway__info__title">역별</p>'
        txt+='<div class="subway__info__div">'
        for (var i = 0; i < metStnArray.length; i++) {
            txt+='<div class="subway__info__line">'
            txt+=   '<p class="subway__info__byStn__stnName">'+ metStnArray[i].name + '역</p>'
            txt+=   '<p class="subway__info__byStn__dif">'+ Math.ceil(metStnArray[i].dif/80) + '분 거리</p>'
            txt+=   '<div class="subway__info__byStn__lineLine">'
            for (var k = 0; k < metStnArray[i].line.length; k++) {
                if(metStnArray[i].line[k].length === 1){
                    txt+=   '<p class="subway__info__byStn__lineName ln_'+metStnArray[i].line[k]+'">'+metStnArray[i].line[k] + '</p>'
                }
            }
            txt+=   '</div>'

            txt+='</div>'
        }
        txt+='</div>'

        txt+='<p class="subway__info__title">노선별</p>'
        txt+='<div class="subway__info__div">'
        for (var i = 0; i < metArray.length; i++) {
            txt+='<div class="subway__info__line">'
            txt+=   '<p class="subway__info__lineName ln_'+metArray[i].line+'">'+metArray[i].line + '</p>'
            txt+=   '<p class="subway__info__dif">'+ Math.ceil(metArray[i].dif/80) + '분 거리</p>'
            txt+=   '<p class="subway__info__stnName">'+ metArray[i].name + '역</p>'
            txt+='</div>'
        }
        txt+='</div>'

        $(".subway__info").html(txt);
    }
}

export default Subway;
