var Verify = {
    data:{},

    listener: function(){
        let that = this;

        $(".verifying__box").on("click", ".result_rank", function(){
            that.check($(this))
        })
        $("#verifying__control__merge").click(function(){
            that.merge();
        })
        $("#verifying__control__remove").click(function(){
            that.removeAll();
        })

    },

    removeAll: function(){
        if(confirm("제거할까요?")){
            for (var i = 0; i < $(".result_rank.selected").length; i++) {
                let tid = $(".result_rank.selected").eq(i).parent().attr("id");
                delete this.data[tid];
            }
            $(".verifying__control").addClass("displayNone");
            firebase.database().ref("cities/"+$(".cityName").attr("id")+"/spots/combined").set(this.data);
            this.rank();
        }

    },

    merge: function(){
        if($(".result_rank.selected").length>1){
            let sid = $(".result_rank.selected").eq(0).parent().attr("id");
            let mainData = this.data[sid];

            for (var i = 1; i < $(".result_rank.selected").length; i++) {
                let tid = $(".result_rank.selected").eq(i).parent().attr("id")
                let targetData = this.data[tid];

                //합쳐질 대상의 rank를 maindData의 rank로 통합하는 작업
                for (var site in targetData.rank) {
                    if(mainData.rank[site]){
                        if(mainData.rank[site] > targetData.rank[site]){
                            mainData.rank[site] = targetData.rank[site];
                        }
                    }else{
                        mainData.rank[site] = targetData.rank[site];
                    }
                }

                //합쳐질 대상의 태그를 mainData의 tag로 통합하는 작업
                if(targetData.tag){
                    for (var j = 0; j < targetData.tag.length; j++) {
                        if(mainData.tag){
                            if(!mainData.tag.includes(targetData.tag[j])){
                                mainData.tag.push(targetData.tag[j])
                            }
                        }else{
                            mainData.tag = targetData.tag
                        }
                    }
                }

                //합쳐질 대상에게 url이 입력되어 있다면 mainData에 통합하는 작업
                if(!mainData.url){
                    if(targetData.url){
                        mainData.url = targetData.url;
                    }
                }

                delete this.data[tid];

                if(confirm("병합할까요?")){
                    $(".verifying__control").addClass("displayNone");
                    firebase.database().ref("cities/"+$(".cityName").attr("id")+"/spots/combined").set(this.data);
                    this.rank();
                }
            }
        }else{
            toast("선택된 관광지가 하나입니다")
        }
    },

    check: function(div){
        div.toggleClass("selected");
        let sid = div.parent().attr("id");

        if($(".result_rank.selected").length>0){
            $(".verifying__control").removeClass("displayNone");
        }else{
            $(".verifying__control").addClass("displayNone");
        }
    },

    rank: function(){
        var config = {
            maxScore: 200,  //1위는 200점 ~ 180위는 20점
            oneMinus:-600,  //1개 사이트에만 소개된 관광지일 경우 차감되는 점수
            twoMunus:-300, //2개 사이트에만 소개된 관광지일 경우 차감되는 점수
            nvAdd:100  //네이버에만 소개된 관광지일 경우 부여되는 추가점
        }
        var rankArray = [];
        console.log(this.data)

        for (var sid in this.data) {
            let spot = this.data[sid];
            spot.sid = sid;
            let numSite = Object.keys(spot.rank).length; //등재된 사이트 갯수
            let score = 0
            let avg = 0
            let bestRank = Object.keys(this.data).length + 50 //가장 높은(숫자로서 낮은) 랭킹이 부여된 사이트 랭킹

            for (var site in spot.rank) {
                if(bestRank>spot.rank[site]){
                    bestRank = spot.rank[site] //bestRank를 갱신한다
                }
                if(spot.rank[site]<Object.keys(this.data).length){
                    //예 - 관광지가 100위인데 론리플래닛에서 103위 소개 -> 없는 것 취급
                    score+= (config.maxScore - spot.rank[site]);
                    avg+= (config.maxScore - spot.rank[site]);
                }else{
                    if(numSite>1){
                        numSite--;
                    }
                }
            }
            score-= bestRank*5;
            avg = avg / numSite;

            score+= avg*25;

            if(numSite === 1){
                score += config.oneMinus;
                if(spot.rank.nv){
                    score+= config.nvAdd;
                }
            }
            if(numSite === 2){
                score += config.twoMunus;
            }

            rankArray.push({sid:sid,score:score})
        }

        rankArray.sort(function(a, b){
            return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
        })
        let txt = ''

        var spotArray = [];

        for (var i = 0; i < rankArray.length; i++) {
            let data = this.data

            spotArray.push(this.data[rankArray[i].sid])

            let sid = rankArray[i].sid;
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
            if (data[sid].name.ko.includes('<div class') || data[sid].name.ko.includes('<div class')){
                delete data[sid]
            }else{
                txt += '<div class="result_box" id="' + sid + '">'
                txt += '<p class="result_rank">' + (i + 1) + '</p>';
                txt += '<input class="result_name" value="' + data[sid].name.ko + "--" + data[sid].name.en + '">'
                txt += '<input class="result_url" value="' + url + '">';
                txt += '<p class="result_gg">' + ranking.gg + '</p>';
                txt += '<p class="result_nv">' + ranking.nv + '</p>';
                txt += '<p class="result_lp">' + ranking.lp + '</p>';
                txt += '<p class="result_ta">' + ranking.ta + '</p>';
                txt += '<p class="result_save save_spot">저장</p>';
                txt += '<p class="result_remove remove_spot">삭제</p>'
                txt += '</div>';
            }
            
        }
        $(".verifying__box").html(txt)

        firebase.database().ref("cities/"+$('.cityName').attr('id')+"/spots/ranked").set(spotArray);
        console.log(spotArray)
    },

    init: function(data){
        this.data = data;
        this.listener();

        $(".spot__page").addClass("displayNone");
        $(".spot__page.verifying").removeClass("displayNone");
        $(".header__status").html("관광지 2차 검증");

        if(!data.ranked){
            this.rank();//랭킹 데이터가 없으면 만든다
            console.log("yolo?")
        }else{
            console.log(data.ranked);
        }

    }
}

export default Verify;
