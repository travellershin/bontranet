import Config from "./config.js";

var Third_finalize = {
    temp:false,
    spotObj:{},

    remove_spot: function(sid){
        let cid = $(".cityName").attr("cid");
        let spotName = $("#"+sid).children(".result_name_ko").val();
        if(confirm(`${spotName} 관광지를 제거합니다. 확실한가요?`)){
            this.temp = this.spotObj[sid];

            firebase.database().ref("cities/"+cid+"/spots/combined/"+sid).remove();
            toast("관광지가 제거되었습니다.");

        }
    },

    redo_remove: function(){
        let cid = $(".cityName").attr("cid");
        let sid = this.temp.sid;
        firebase.database().ref("cities/"+cid+"/spots/combined/"+sid).set(this.temp);
        $(".redo_remove").remove();

        this.temp = false;
    },


    inflate: function(data){
        $(".header").append('<p class="return">돌아가기</p>');
        
        if(this.temp){
            $(".header").append('<p class="redo_remove">마지막 제거 취소</p>');
        }

        let spotObj = data.spots.combined;
        this.spotObj = spotObj;
        console.log(spotObj);
        let rankArr = [];
        let spotTotal = Object.keys(spotObj).length;
        let txt = '';

        for (let sid in spotObj) {
            let spot = spotObj[sid];
            let score = 0;

            let individualArr = [];

            for (let site in spot.rank) {
                let rank = spot.rank[site];
                individualArr.push(rank);
                score -= rank;
            }

            individualArr.sort((a, b) => a - b);

            let minRank = individualArr[0];
            score += (spotTotal + 100 - minRank)*Math.sqrt(Math.sqrt(spotTotal));
            score -= minRank;

            if(individualArr.length === 1){
                score -= 120;
                score -= minRank;
                if(spot.rank.nv){
                    score += 50;
                }
            }else if(individualArr.length === 3){
                score += (160 - minRank);
            }else if(individualArr.length === 4){
                score += 160;
            }
            
            rankArr.push({sid:sid, score:score});
        }

        rankArr.sort((a, b) => b.score - a.score);

        for (var i = 0; i < rankArr.length; i++) {
            let sid = rankArr[i].sid;
            let spot = spotObj[sid];
            let url = "";
            if(spot.url){
                url = spot.url;
            }
            let ranking = {
                gg:"",
                nv:"",
                lp:"",
                ta:""
            };
            for (var site in spot.rank) {
                ranking[site] = spot.rank[site];
            }
            txt+= '<div class="result_box" id="'+sid+'"><p class="result_rank">'+(i+1)+'</p>';
            txt+= '<input class="result_name_ko" value="'+spot.name.ko+'">';
            txt+= '<input class="result_name_en" value="'+spot.name.en+'">';
            txt+= '<input class="result_url" value="'+url+'">';
            txt+= '<p class="result_gg">'+ranking.gg+'</p>';
            txt+= '<p class="result_nv">'+ranking.nv+'</p>';
            txt+= '<p class="result_lp">'+ranking.lp+'</p>';
            txt+= '<p class="result_ta">'+ranking.ta+'</p>';
            txt+= '<p class="result_save save_spot">저장</p>';
            txt+= '<p class="result_remove remove_spot">삭제</p></div>';
        }

        $(".pages.spot .wrapper").html(txt);

   }
};
export default Third_finalize;