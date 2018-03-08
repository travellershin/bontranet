let Spots = {
    list: [],
    inf:[],
    count: 0,  //몇 개 선택되었는지 카운트
    showAll:true, //false인경우 체크된 것만 보기

    init: function(data){
        for (let i = 0; i < data.length; i++) {
            data[i].checked = true;

            data[i].marker = new google.maps.Marker({
                position: data[i].coor,
                map: map,
                icon: './assets/pin-map.png'
            });
            let rank = 0;
            if (data[i].rank < 9) {
                rank = "0" + (data[i].rank + 1);
            } else {
                rank += data[i].rank + 1;
            }
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
    },

    hotelTest: function(data){
        for (let i = 0; i < 15; i++) {
            let mk = new google.maps.Marker({
                position: data[i],
                map: map,
                icon: './assets/pin-map.png'
            });
        }
    },

    inflate: function(){
        let txt = ""
        if (this.showAll) {
            for (let i = 0; i < this.list.length; i++) {
                let info = this.inf[i];
                let rank = 0;
                if(info.rank < 9){
                    rank = "0" + (info.rank+1);
                }else{
                    rank += info.rank+1;
                }
                if (this.list[info.rank].checked) {
                    txt += '<div class="ib_box" idx='+info.rank+'><span class="ib_pin"></span>';
                    txt += '<p class="ib_rank">' + rank +'</p><p class="ib_name">'+info.name+'</p></div>'
                }else{
                    txt += '<div class="ib_box unSelected" idx=' + info.rank +'><span class="ib_pin"></span>';
                    txt += '<p class="ib_rank">' + rank + '</p><p class="ib_name">' + info.name + '</p></div>'
                }
            }
        }
        this.updateCount();
        $(".selector_infoBox").html(txt);
    },
    
    checked: function(i){
        if(this.list[i].checked){
            this.list[i].checked = false;
            this.list[i].marker.setIcon("./assets/pin-map-off.png");
            $(".ib_box[idx='"+i+"']").addClass("unSelected");
            this.count--
        }else{
            this.list[i].checked = true;
            this.list[i].marker.setIcon("./assets/pin-map.png");
            $(".ib_box[idx='" + i + "']").removeClass("unSelected");
            this.count++
        }
        this.updateCount();
    },
    
    mouseOver: function(i){
        this.list[i].infowindow.open(map, this.list[i].marker)
    },

    mouseOut: function (i){
        this.list[i].infowindow.close(map, this.list[i].marker)
    },

    updateCount: function(){
        $("label[for='reco_4']").html("<span></span>관광지 접근성 - 선택된 "+ this.count +"개 관광지")
    },

    checkAll: function(){
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].checked = true;
            this.list[i].marker.setIcon("./assets/pin-map.png");
            this.list[i].infowindow.close(map, this.list[i].marker);
            $(".ib_box[idx='" + i + "']").removeClass("unSelected");
        }
        this.count = this.list.length;
        this.updateCount();
    }, 

    unCheckAll: function(){
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].checked = false;
            this.list[i].marker.setIcon("./assets/pin-map-off.png");
            $(".ib_box[idx='" + i + "']").addClass("unSelected");
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
        console.log(this.list);

        for (let j = 0; j < 58; j++) {
            let atCoor = this.list[j].coor;
            this.list[j].metro = false;

            for (let i = 0; i < 473; i++) {
                let metroName = metro[i][0];
                let latDif = Math.pow((atCoor.lat - metro[i][1][1])*111034,2);
                let lngDif = Math.pow((atCoor.lng - metro[i][1][0]) * 85397, 2);
                let dif = Math.sqrt(latDif+lngDif)

                if(dif<500){
                    console.log(this.list[j].name + " 관광지는 " + metroName + " 지하철역에서 " + dif + "m 떨어져있다.")
                    this.list[j].metro = true;
                }
                // console.log(( ((atCoor.lat - metro[i][1][1]) * 111000) ^ 2 + ((atCoor.lng - metro[i][1][0]) * 85000) ^ 2))
                
            }
            if(!this.list[j].metro){
                console.log(this.list[j].name + " 관광지는 가까운 지하철역이 없다.")
            }
        }
    }
}

export default Spots;