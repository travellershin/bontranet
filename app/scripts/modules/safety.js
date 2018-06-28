let Safety = {
    area:[],

    basic:{},

    hotels:{},

    data:{
        area:{},
        specific:{}
    },
    intro: [
        ["이 숙소는 ","<지역명>"," 에 위치하고 있습니다. 이 지역은 "],
        ["이 숙소가 위치한 ","<지역명>","(은)는"]
    ],

    init: function(data){
        this.hotels = data.hotels;
        for (var hid in data.hotels) {
            this.test(hid)
        }
    },

    test: function(hid){
        let hotel = this.hotels[hid]

        let area = hotel.area;

        let rnd = function (min, max) {
            var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
            return ranNum;
        }

        let spotList = ["센트럴 파크", "메트로폴리탄 미술관", "구겐하임 미술관", "록펠러 센터"];
        let metroStn = ["68st Station", "33st Station", "5th ave Station", "Clark St", "103st", "Galaxy Station"];

        let hotelData = {
            hasSpot:false,
            spot:"",
            spotDistance:0,
            nearMetro:false,
            distance:10,
            metroStn:""
        }

        let spotRnd = rnd(0,6)

        if(spotRnd < 4){
            hotelData.hasSpot = true;
            hotelData.spot = spotList[spotRnd];
        }

        let metroRnd = rnd(0,5);
        hotelData.metroStn = metroStn[metroRnd];

        let distanceRnd = rnd(0,6)+rnd(0,6);
        hotelData.distance = distanceRnd;

        if(distanceRnd<6){
            hotelData.nearMetro = true;
        }

        let txt = ""

        let introRnd = rnd(0,1);
        if(introRnd === 0){
            txt+=this.basic.intro[0][0]+ " " + area.name + this.basic.intro[0][1]+ " ";
        }else{
            txt+=this.basic.intro[1][0]+ " " + area.name + area.josa[0]+ " ";
        }

        let length = area.intro.length

        let areaIntroRnd = rnd(0,length-1);
        txt+= area.intro[areaIntroRnd];


        let safety = "unsafe"

        if(area.score>4){
            safety = "safe"
        }else if(area.score>2){
            safety = "normal"
        }

        let wordObj = this.data.specific[safety];

        let spotTypeRnd = rnd(0,1)

        if(hotelData.hasSpot){
            hotelData.spotDistance = rnd(2,5);

            if(spotTypeRnd === 0){
                let first = wordObj.spot.type1.first;
                let firstRnd = rnd(0,first.length-1)

                let second = wordObj.spot.type1.second;
                let secondRnd = rnd(0,second.length-1)

                txt+= "<br>"+ first[firstRnd] + " " + second[secondRnd]
            }else{
                let first = wordObj.spot.type2.first;
                let firstRnd = rnd(0,first.length-1)

                let second = wordObj.spot.type2.second;
                let secondRnd = rnd(0,second.length-1)

                txt+= "<br>"+ first[firstRnd] + " " + second[secondRnd]
            }

            txt = txt.replace("[관광지]",hotelData.spot);
            txt = txt.replace("[분]",hotelData.spotDistance+"분");
            txt = txt.replace("[지역]",area.name);
        }

        let transTypeRnd = rnd(0,1);


        let target = {}

        if(hotelData.nearMetro){
            if(hotelData.hasSpot){
                target = wordObj.transit.near.hasSpot;
            }else{
                target = wordObj.transit.near.noSpot;
            }
        }else{
            if(hotelData.hasSpot){
                target = wordObj.transit.far.hasSpot;
            }else{
                target = wordObj.transit.far.noSpot;
            }
        }

        if ('type1' in target){
            if(transTypeRnd === 0){
                target = target.type1
            }else{
                target = target.type2
            }
        }

        let tfirst = target.first;
        let tfirstRnd = rnd(0,tfirst.length-1)

        let tsecond = target.second;
        let tsecondRnd = rnd(0,tsecond.length-1)

        txt+= "<br>"+ tfirst[tfirstRnd] + " " + tsecond[tsecondRnd]

        txt = txt.replace("[역]",hotelData.metroStn+" 역");
        txt = txt.replace("[분]",hotelData.distance+"분");

        $(".testWord").html(txt)
    },

    save: function(){
        for (var i = 0; i < $(".inputBox").length; i++) {
            let path = $(".inputBox").eq(i).attr("id").slice(4).split("_");
            let inputArray = $(".inputBox").eq(i).children("input");
            let txtArray = []
            for (var j = 0; j < inputArray.length; j++) {
                if(inputArray.eq(j).val().length>0){
                    txtArray.push(inputArray.eq(j).val())
                }
            }
            if(path.length === 4){
                this.data.specific[path[0]][path[1]][path[2]][path[3]] = txtArray
            }else if(path.length === 5){
                this.data.specific[path[0]][path[1]][path[2]][path[3]][path[4]] = txtArray
            }else{
                this.data.specific[path[0]][path[1]][path[2]][path[3]][path[4]][path[5]] = txtArray
            }
        }

        for (var i = 0; i < $(".txt_safety_box").length; i++) {
            let inputArray = $(".safety_basic_box").eq(i).find("input");
            let score = $(".safetyScore").eq(i).val()*1;
            this.data.area[i].intro = [];
            this.data.area[i].score = score;
            for (var j = 0; j < inputArray.length; j++) {
                if(inputArray.eq(j).val().length>0){
                    this.data.area[i].intro.push(inputArray.eq(j).val())
                }
            }
        }

        firebase.database().ref("nyc/word/area").set(this.data.area);
        firebase.database().ref("nyc/word/specific").set(this.data.specific);
    },

    initArea: function(data){
        this.data.area = data;
        let txt_intro = "";
        for (var i = 0; i < this.intro.length; i++) {
            txt_intro += '<div class="txt_intro_box"><input class="txt_intro" value = "'+ this.intro[i][0] +'">';
            txt_intro += '<p class="txt_intro">&lt;지역명&gt;</p>';
            txt_intro += '<input class="txt_intro" value = "'+ this.intro[i][2] +'"></div>';
        }
        $(".main .intro").html(txt_intro)

        let txt_safety = "";

        for (var k = 0; k < data.length; k++) {
            let area = data[k];
            let score = 0;
            if(area.score){
                score = area.score;
            }

            txt_safety += '<div class="txt_safety_box"><div class="area_header"><input class="safetyScore" type="number" value="'+score+'">'
            txt_safety += '<h4 class="area_name">'+area.name+'</h4><div class="wordTest" areaNo ="'+k+'">테스트</div></div>'
            txt_safety += '<div class="data"><div class="safety_basic_box">'

            if(area.intro){
                for (var i = 0; i < area.intro.length; i++) {
                    txt_safety += '<input class="txt_basic" value = "'+ area.intro[i] +'" placeholder="지역의 기본 치안 설명을 입력해주세요">'
                }
            }
            txt_safety += '</div><div class="add_safety">기본 워딩 추가</div>'


            txt_safety += '</div></div>'
        }

        $(".main .safety_area").html(txt_safety)
    },

    initSpecific: function(data){
        this.data.specific = data;
        for (var safety in data) {
            let spot = data[safety].spot;
            let transit = data[safety].transit;

            for (var type in spot) {
                //spot 워딩 타입
                for (var order in spot[type]) {
                    let wordArray = spot[type][order];
                    let txt = ""
                    for (var i = 0; i < wordArray.length; i++) {
                        txt+='<input value="'+wordArray[i]+'">'
                    }
                    $("#box_"+safety+"_spot_"+type+"_"+order).html(txt)
                }
            }

            for (var distance in transit) {
                for (var hasSpot in transit[distance]) {
                    let transit_spot = transit[distance][hasSpot];

                    if ('type1' in transit_spot){
                        for (var type in transit_spot) {
                            for (var order in transit_spot[type]) {
                                let wordArray = transit_spot[type][order];
                                let txt = ""
                                for (var i = 0; i < wordArray.length; i++) {
                                    txt+='<input value="'+wordArray[i]+'">'
                                }
                                $("#box_"+safety+"_transit_"+distance+"_"+hasSpot+"_"+type+"_"+order).html(txt)
                            }
                        }
                    }else{
                        for (var order in transit_spot) {
                            let wordArray = transit_spot[order];
                            let txt = ""
                            for (var i = 0; i < wordArray.length; i++) {
                                txt+='<input value="'+wordArray[i]+'">'
                            }
                            $("#box_"+safety+"_transit_"+distance+"_"+hasSpot+"_"+order).html(txt)
                        }
                    }
                }
            }
        }
    }
}

export default Safety
