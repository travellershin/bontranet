let Spots = {
    list: [],
    inf:[],
    count: 0,  //몇 개 선택되었는지 카운트
    showAll:true, //false인경우 체크된 것만 보기

    init: function(data){
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            data[i].checked = true;

            data[i].marker = new google.maps.Marker({
                position: data[i].coor,
                map: map,
                icon:"./assets/pin-map-on.svg"
            });

            let rank = data[i].rank + 1;

            let ct = '<div class="infowindow"><div class="infoImage ny_'+i+'"></div>'
            ct += '<p class="infoTitle">'+ rank + " " + data[i].name + '</p><p class="infoDesc">' + data[i].description + '</p></div>'

            data[i].infowindow = new google.maps.InfoWindow({
                content: ct
            })

            data[i].marker.addListener('mouseover', function () {
                data[i].infowindow.open(map, data[i].marker);
            });

            data[i].marker.addListener('mouseout', function () {
                data[i].infowindow.close(map, data[i].marker);
            });

            let that = this;
            data[i].marker.addListener('click', function () {
                that.checked(i)
            });

            this.list.push(data[i]);
            this.inf.push(data[i]);
        }
        this.count = data.length;
        this.inflate();
        this.iconWell(3)
    },

    iconWell: function(size){
        let hi = size
        let that = this;
        if(hi>18){
            hi = 3;
        }else{
            hi+=1;
        }
    },

    inflate: function(){
        let txt = ""
        if (this.showAll) {
            for (let i = 0; i < this.list.length; i++) {
                let info = this.inf[i];
                let rank = (info.rank+1);

                if (this.list[info.rank].checked) {
                    txt += '<div class="spotBox selected" idx='+info.rank+'><div class="pinDiv"><span class="pincenter"></span>'
                    txt += '<span class="pin"></span></div><div class="info"><p class="rank">'+rank+'위</p>'
                    txt += '<p class="name_ko ko">'+info.name+'</p><p class="name_en">'+info.name+'</p></div></div>'
                }else{
                    txt += '<div class="spotBox" idx='+info.rank+'><div class="pinDiv"><span class="pincenter"></span>'
                    txt += '<span class="pin"></span></div><div class="info"><p class="rank">'+rank+'위</p>'
                    txt += '<p class="name_ko ko">'+info.name+'</p><p class="name_en">'+info.name+'</p></div></div>'
                }
            }
        }
        this.updateCount();
        $(".spots").html(txt);
    },

    checked: function(i){
        if(this.list[i].checked){
            this.list[i].checked = false;
            this.list[i].marker.setIcon("./assets/pin-map-off.svg");
            $(".spotBox[idx='" + i + "']").removeClass("selected");
            this.count--
        }else{
            this.list[i].checked = true;
            this.list[i].marker.setIcon("./assets/pin-map-on.svg");
            $(".spotBox[idx='" + i + "']").addClass("selected");
            this.count++
        }
        this.updateCount();
    },

    mouseOver: function(i){
        this.list[i].infowindow.open(map, this.list[i].marker);
        this.list[i].marker.setAnimation(google.maps.Animation.BOUNCE);
    },

    mouseOut: function (i){
        this.list[i].infowindow.close(map, this.list[i].marker)
        this.list[i].marker.setAnimation(null);
    },

    updateCount: function(){
        $("label[for='reco_4']").html("<span></span>관광지 접근성 - 선택된 "+ this.count +"개 관광지")
    },

    checkAll: function(){
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].checked = true;
            this.list[i].marker.setIcon("./assets/pin-map-on.svg");
            this.list[i].infowindow.close(map, this.list[i].marker);
            $(".spotBox[idx='" + i + "']").addClass("selected");
        }
        this.count = this.list.length;
        this.updateCount();
    },

    unCheckAll: function(){
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].checked = false;
            this.list[i].marker.setIcon("./assets/pin-map-off.svg");
            $(".spotBox[idx='" + i + "']").removeClass("selected");
        }
        this.count = 0;
        this.updateCount();
    },

    sort: function(std){
        this.inf.sort(function (a, b) {
            return a[std] < b[std] ? -1 : a[std] > b[std] ? 1 : 0;
        })
        this.inflate();
    },


    metroTest: function(metro){

        for (let j = 0; j < 58; j++) {
            let atCoor = this.list[j].coor;
            this.list[j].metro = [];

            for (let i = 0; i < 473; i++) {
                let metroName = metro[i][0];
                let latDif = Math.pow((atCoor.lat - metro[i][1][1])*111034,2);
                let lngDif = Math.pow((atCoor.lng - metro[i][1][0]) * 85397, 2);
                let dif = Math.round(Math.sqrt(latDif+lngDif))

                if(dif<500){
                    for (let k = 0; k < metro[i][2].length; k++) {
                        if (metro[i][2][k].length > 2){
                            metro[i][2].splice(k,1)
                        }
                    }
                    console.log(this.list[j].name + " 관광지는 " + metroName + " 지하철역에서 " + dif + "m 떨어져있다. - " + metro[i][2] + "호선");

                    this.list[j].metro.push({
                        name: metroName,
                        distance: dif,
                        line: metro[i][2]
                    })
                }
            }
            if(this.list[j].metro.length<1){
                console.log(this.list[j].name + " 관광지는 가까운 지하철역이 없다.")
            }

            //아래는 파이어베이스에 메트로 정보를 업데이트하기위한 그런거
            // firebase.database().ref("ny/spots/"+j+"/metro").set(this.list[j].metro);
        }

    }
}

export default Spots;
