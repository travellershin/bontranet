import Action from "./action.js"

let Combine = {
    map: {},
    marker: [],
    init: function(data){
        $("header>.nav>p").removeClass("selected");
        $(".spot_work").addClass("selected")
        $(".postAction").addClass("displayNone");
        $(".combine").removeClass("displayNone");

        if(data.combining){
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 40.74844, lng: -73.98566 },
                zoom: 18,
                mapTypeControl: false,
                scaleControl: true,
                fullscreenControl: false
            });

            this.map.addListener('click', function(e){
                Action.clickMap(e);
            })

            this.inflate(data.combining);
            //합치기 작업 중인 목록이 있으면 불러와서 작업을 이어한다.
        }else{
            let cityCode = $("header>.cityName").attr("cid");

            let siteArray = ["gg","nv","lp","ta"];
            let combinedObj = {};
            let counter = 0

            for (var j = 0; j < siteArray.length; j++) {
                let site = siteArray[j];
                if(data[site]){
                    for (var i = 0; i < data[site].length; i++) {
                        if(data[site][i]){
                            let oldSpot = data[site][i]

                            let spot = {
                                name:{
                                    ko:"",
                                    en:""
                                },
                                coor: oldSpot.coor,
                                rank:{

                                },
                            }

                            if (/[가-힣]/.test(oldSpot.name)) {
                                spot.name.ko = oldSpot.name;
                            } else {
                                spot.name.en = oldSpot.name;
                            }
                            spot.rank[site] = i;

                            if(oldSpot.url){
                                spot.url = oldSpot.url;
                            }
                            if(oldSpot.tag){
                                spot.tag = oldSpot.tag;
                            }

                            if(counter<10){
                                combinedObj["s00"+counter] = spot;
                                console.log("s00"+counter)
                            }else if(counter<100){
                                combinedObj["s0"+counter] = spot;
                                console.log("s0"+counter)
                            }else{
                                combinedObj["s"+counter] = spot;
                                console.log("s"+counter)
                            }
                            counter++
                        }
                    }
                }
            }
            this.difCheck(combinedObj)
        }

    },

    difCheck: function(data){
        let cityCode = $("header>.cityName").attr("cid");

        let counter = 0;

        let combineObj = {}

        for (var code in data) {
            let spot = data[code];
            combineObj[code] = spot
            combineObj[code].combine = {};

            for (var tCode in data) {
                if(code<tCode){
                    let tSpot = {};
                    for (var key in data[tCode]) {
                        tSpot[key] = data[tCode][key]
                    }

                    let latDif = Math.pow((spot.coor.lat - tSpot.coor.lat)*111034,2);
                    let lngDif = Math.pow((spot.coor.lng - tSpot.coor.lng) * 85397, 2);
                    let dif = Math.round(Math.sqrt(latDif+lngDif))

                    if(dif<200){
                        counter++
                        combineObj[code].combine[tCode] = tSpot;
                    }
                }
            }
        }
        console.log("막판")
        console.log(combineObj)

        firebase.database().ref(cityCode+"/spots/combining").set(combineObj)

        this.inflate(combineObj)
    },

    inflate: function(data){
        this.marker = [];

        let keys = Object.keys(data);
        $(".noOfData").html(keys.length)
        let spot = data[keys[0]];

        $(".original").attr("oid", keys[0])

        if(spot.name.ko.length>0){
            $("#name_prime").html(spot.name.ko);
        }else{
            $("#name_prime").html(spot.name.en);
        }
        $("#name_ko").val(spot.name.ko);
        $("#name_en").val(spot.name.en);
        if(spot.name.local){
            $("#name_local").val(spot.name.local);
        }
        spot.coor.lat = spot.coor.lat*1;
        spot.coor.lng = spot.coor.lng*1

        let marker = new google.maps.Marker({
            position: spot.coor,
            map: this.map
        });

        Action.marker.main = marker;

        this.map.panTo(spot.coor)
        $(".coordinate_main").html(spot.coor.lat+","+spot.coor.lng)

        this.marker.push(marker)

        let targetTxt = "";
        let targetNo = 0;

        for (var sid in spot.combine) {
            let tSpot = spot.combine[sid];
            targetNo++;

            let latlng = {
                lat: tSpot.coor.lat*1,
                lng: tSpot.coor.lng*1
            }

            let tMarker = new google.maps.Marker({
                position:latlng,
                map: this.map,
                label: targetNo.toString()
            });

            this.marker.push(tMarker);

            //본명으로 한글명 영어명이 없을 경우를 체크해서 넣어준다.
            if($("#name_ko").val().length === 0){
                $("#name_ko").val(tSpot.name.ko)
            }
            if($("#name_en").val().length === 0){
                $("#name_en").val(tSpot.name.en)
            }

            targetTxt += '<div class="spotBox"><p class="number">'+targetNo+'</p><div class="checkBox" sid="'+sid+'"></div><div class="right">'
            targetTxt += '<p class="name_ko">'+tSpot.name.ko+'</p><p class="name_en">'+tSpot.name.en+'</p>'
            if(tSpot.name.local){
                targetTxt += '<p class="name_local">'+tSpot.name.local+'</p>'
            }
            targetTxt += '</div></div>'
        }

        $(".combine .target").html(targetTxt);
    }

}

export default Combine;
