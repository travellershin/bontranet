let Rank = {
    init: function(cityCode){
        $(".postAction").addClass("displayNone");
        $(".combine").addClass("displayNone");
        $(".rankDiv").removeClass("displayNone");
        $("header>.nav>p").removeClass("selected");
        $(".spot_rank").addClass("selected");

        firebase.database().ref(cityCode+"/spots/combined").on("value", snap => {
            let data = snap.val();
            console.log(data)

            let txt = '';

            let sortArray = [];

            for (var sid in data) {
                let spot = data[sid];
                let array = [];
                let minRank = 200;

                for (var site in spot.rank) {
                    let indRank = spot.rank[site];
                    array.push(indRank);
                    if(minRank>indRank){
                        minRank = indRank
                    };
                }
                let score = (180 - minRank)*Math.sqrt(Math.sqrt(array.length));
                for (var i = 0; i < array.length; i++) {
                    score -= array[i]
                }
                score-= minRank*1.5
                if(array.length === 1){
                    score -= 120;
                    score -= minRank
                    if(spot.rank.nv){
                        score+=50;
                    }
                }
                if(array.length === 3){
                    score += (160 - minRank)
                }
                if(array.length === 4){
                    score += 160
                }

                sortArray.push({sid:sid,score:score})
            }

            sortArray.sort(function(a, b){
                return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
            })

            for (var i = 0; i < sortArray.length; i++) {
                let sid = sortArray[i].sid;
                let url = ""
                if(data[sid].url){
                    url = data[sid].url
                }
                let ranking = {
                    gg:"",
                    nv:"",
                    lp:"",
                    ta:""
                }
                for (var site in data[sid].rank) {
                    ranking[site] = data[sid].rank[site]
                }
                txt+= '<div class="result_box" id="'+sid+'"><p class="result_rank">'+(i+1)+'</p>';
                txt+= '<input class="result_name" value="'+data[sid].name.ko+"--"+data[sid].name.en+'">'
                txt+= '<input class="result_url" value="'+url+'">';
                txt+= '<p class="result_gg">'+ranking.gg+'</p>';
                txt+= '<p class="result_nv">'+ranking.nv+'</p>';
                txt+= '<p class="result_lp">'+ranking.lp+'</p>';
                txt+= '<p class="result_ta">'+ranking.ta+'</p>';
                txt+= '<p class="result_save save_spot">저장</p>';
                txt+= '<p class="result_remove remove_spot">삭제</p></div>';
            }
            $(".result").html(txt)
        })
    }
}

export default Rank;
