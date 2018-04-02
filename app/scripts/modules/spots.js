let Spots = {
    list: [],
    inf:[],
    count: 0,  //몇 개 선택되었는지 카운트
    show:"all", //false인경우 체크된 것만 보기
    restoreArray:[],
    selected: [],

    init: function(data){
        $(".showCard").removeClass("displayNone");
        $(".showAcco").removeClass("displayNone");
        let that = this;

        for (let i = 0; i < data.length; i++) {
            data[i].checked = false;
            this.selected.push(false);

            data[i].marker = new google.maps.Marker({
                position: data[i].coor,
                map: map,
                icon:"./assets/pin-map-off.svg"
            });

            let rank = data[i].rank + 1;

            let txt = '<div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png"><div class="infoImage ny_'+i+'"></div></div><p class="rank">'+rank+'위</p><div class="contents">'
            txt+= '<p class="name_ko ko">'+data[i].name+'</p><p class="name_en">'+data[i].tag+'</p><p class="description">'+data[i].description+'</p></div></div>'

            data[i].infowindow = new google.maps.InfoWindow({
                content: txt
            })

            data[i].marker.addListener('mouseover', function () {
                data[i].infowindow.open(map, data[i].marker);
                $(".spotBox[idx='" + i + "']").addClass("spotFriendOver");
                if(that.list[i].checked){
                    $(".spotCardWrapper[idx='" + i + "']").find('.hintOut').css("display","inline");
                }else{
                    $(".spotCardWrapper[idx='" + i + "']").find('.hint').css("display","inline");
                }

                let totalHeight = $(".spots").height()
                let targetScroll = $(".spotBox[idx='" + i + "']").position().top
                let currentScroll = $(".spots").scrollTop()
                if(targetScroll > totalHeight - 100){
                    $(".spots").stop().animate({scrollTop:currentScroll + targetScroll - 100}, 300);
                }else if(targetScroll<0){
                    $(".spots").stop().animate({scrollTop:currentScroll + targetScroll - 100}, 300);
                }
            });

            data[i].marker.addListener('mouseout', function () {
                data[i].infowindow.close(map, data[i].marker);

                $(".spotBox[idx='" + i + "']").removeClass("spotFriendOver");
                if(that.list[i].checked){
                    $(".spotCardWrapper[idx='" + i + "']").find('.hintOut').css("display","none");
                }else{
                    $(".spotCardWrapper[idx='" + i + "']").find('.hint').css("display","none");
                }
            });


            let that = this;
            data[i].marker.addListener('click', function () {
                that.checked(i)
            });

            this.list.push(data[i]);
            this.inf.push(data[i]);
        }
        this.count = 0;
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
        let txt = "";
        let card = "";
        for (let i = 0; i < this.list.length; i++) {
            let info = this.inf[i];
            let rank = (info.rank+1);

            if (this.list[info.rank].checked) {
                if(this.show === "unSelected"){
                    txt += '<div class="spotBox selected" idx="'+info.rank+'" style="display: none;"><div class="pinDiv"><span class="pincenter"></span>'
                    card += '<div class="spotCardWrapper selected" idx="'+info.rank+'" style="display: none;"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                }else{
                    txt += '<div class="spotBox selected" idx="'+info.rank+'"><div class="pinDiv"><span class="pincenter"></span>'
                    card += '<div class="spotCardWrapper selected" idx="'+info.rank+'"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                }
                card += '<div class="infoImage ny_'+info.rank+'"></div></div><p class="rank">'+rank+'위</p><div class="contents">';

            }else{
                if(this.show === "selected"){
                    txt += '<div class="spotBox unSelected" idx="'+info.rank+'" style="display: none;"><div class="pinDiv"><span class="pincenter"></span>'
                    card += '<div class="spotCardWrapper unSelected" idx="'+info.rank+'" style="display: none;"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                }else{
                    txt += '<div class="spotBox unSelected" idx="'+info.rank+'"><div class="pinDiv"><span class="pincenter"></span>'
                    card += '<div class="spotCardWrapper unSelected" idx="'+info.rank+'"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                }
                card += '<div class="infoImage ny_'+info.rank+'"></div></div><p class="rank">'+rank+'위</p><div class="contents">';
            }

            txt += '<span class="pin"></span></div><div class="info"><p class="rank">'+rank+'위</p>'
            txt += '<p class="name_ko ko">'+info.name+'</p><p class="name_en">'+info.tag+'</p></div></div>'
            card += '<p class="name_ko ko">'+info.name+'</p><p class="name_en">'+info.tag+'</p><p class="description">'+info.description+'</p></div>'
            card += '<div class="footer"><span class="pincenter"></span><span class="pin"></span>'
            card += '<span class="hint">클릭해서 선택</span><span class="hintOut">클릭해서 선택 해제</span></div></div><div class="neonSign"></div></div>'
        }
        this.updateCount();
        $(".spots").html(txt);
        $(".cardBox").html(card);
        this.checkResult();
    },

    checked: function(i){
        if(this.list[i].checked){
            this.list[i].checked = false;
            this.selected[i] = false;
            this.list[i].marker.setIcon("./assets/pin-map-off.svg");
            $(".spotBox[idx='" + i + "']").removeClass("selected");
            $(".spotCardWrapper[idx='" + i + "']").removeClass("selected");
            $(".spotBox[idx='" + i + "']").addClass("unSelected");
            $(".spotCardWrapper[idx='" + i + "']").addClass("unSelected");
            $(".hint").css("display","none");
            $(".hintOut").css("display","none");
            if(this.show === "selected"){
                $(".spotBox[idx='" + i + "']").hide(200);
                $(".spotCardWrapper[idx='" + i + "']").hide(200);
            }
            this.count--
        }else{
            this.list[i].checked = true;
            this.selected[i] = true;
            this.list[i].marker.setIcon("./assets/pin-map-on.svg");
            $(".spotBox[idx='" + i + "']").addClass("selected");
            $(".spotCardWrapper[idx='" + i + "']").addClass("selected");
            $(".spotBox[idx='" + i + "']").removeClass("unSelected");
            $(".spotCardWrapper[idx='" + i + "']").removeClass("unSelected");
            $(".hint").css("display","none")
            $(".hintOut").css("display","none")
            if(this.show === "unSelected"){
                $(".spotBox[idx='" + i + "']").hide(200);
                $(".spotCardWrapper[idx='" + i + "']").hide(200);
            }
            this.count++
        }
        this.updateCount();
        $(".restore").addClass("displayNone")
        $(".spot_wrap .pincenter").removeClass("off");
        this.checkResult();
    },

    mouseOver: function(i){
        this.list[i].infowindow.open(map, this.list[i].marker);
        this.list[i].marker.setAnimation(google.maps.Animation.BOUNCE);
        $(".spotCardWrapper[idx='" + i + "']").addClass("cardFriendOver");
        if(this.list[i].checked){
            $(".spotCardWrapper[idx='" + i + "']").find('.hintOut').css("display","inline");
        }else{
            $(".spotCardWrapper[idx='" + i + "']").find('.hint').css("display","inline");
        }
    },

    cardOver: function(i){
        $(".spotBox[idx='" + i + "']").addClass("spotFriendOver");
        if(this.list[i].checked){
            $(".spotCardWrapper[idx='" + i + "']").find('.hintOut').css("display","inline");
        }else{
            $(".spotCardWrapper[idx='" + i + "']").find('.hint').css("display","inline");
        }
    },

    cardOver_scroll: function(i){
        let totalHeight = $(".spots").height()
        let targetScroll = $(".spotBox[idx='" + i + "']").position().top
        let currentScroll = $(".spots").scrollTop()
        if(targetScroll > totalHeight - 100){
            $(".spots").stop().animate({scrollTop:currentScroll + targetScroll - 100}, 300);
        }else if(targetScroll<0){
            $(".spots").stop().animate({scrollTop:currentScroll + targetScroll - 100}, 300);
        }
    },

    cardOut: function(i){
        $(".spotBox[idx='" + i + "']").removeClass("spotFriendOver");
        if(this.list[i].checked){
            $(".spotCardWrapper[idx='" + i + "']").find('.hintOut').css("display","none");
        }else{
            $(".spotCardWrapper[idx='" + i + "']").find('.hint').css("display","none");
        }
    },

    mouseOut: function (i){
        this.list[i].infowindow.close(map, this.list[i].marker);
        this.list[i].marker.setAnimation(null);
        $(".spotCardWrapper[idx='" + i + "']").removeClass("cardFriendOver");
        if(this.list[i].checked){
            $(".spotCardWrapper[idx='" + i + "']").find('.hintOut').css("display","none");
        }else{
            $(".spotCardWrapper[idx='" + i + "']").find('.hint').css("display","none");
        }
    },

    updateCount: function(){
        $(".count_selected").html(this.count)
        $(".spotSelected").html(this.count)
        $(".hotel_wrap .number").html(this.count)
        $(".hotelDetail .counter .number").html(this.count)
        this.checkResult();
    },

    checkAll: function(listen){
        this.restoreArray = [];
        for (let i = 0; i < this.list.length; i++) {
            if(this.list[i].checked){
                this.restoreArray.push(i)
            }else{
                this.selected[i] = true;
                this.list[i].checked = true;
                this.list[i].marker.setIcon("./assets/pin-map-on.svg");
                this.list[i].infowindow.close(map, this.list[i].marker);
                $(".spotBox[idx='" + i + "']").addClass("selected");

                $(".spotCardWrapper[idx='" + i + "']").addClass("selected");
                $(".spotBox[idx='" + i + "']").removeClass("unSelected");
                $(".spotCardWrapper[idx='" + i + "']").removeClass("unSelected");
                $(".hint").css("display","none")
                $(".hintOut").css("display","none")
                if(this.show === "unSelected"){
                    $(".spotBox[idx='" + i + "']").hide();
                    $(".spotCardWrapper[idx='" + i + "']").hide();
                }else if(this.show === "selected"){
                    $(".spotBox[idx='" + i + "']").show();
                    $(".spotCardWrapper[idx='" + i + "']").show();
                }
            }
        }
        $(".restore").removeClass("displayNone");
        this.count = this.list.length;
        this.updateCount();
        listen.removeClass("ab_select");
        listen.addClass("ab_unSelect");
        $(".spot_wrap .pincenter").removeClass("off");
    },

    unCheckAll: function(listen){
        this.restoreArray = []
        for (let i = 0; i < this.list.length; i++) {
            if(this.list[i].checked){
                this.restoreArray.push(i)
                this.selected[i] = false;
                this.list[i].checked = false;
                this.list[i].marker.setIcon("./assets/pin-map-off.svg");
                $(".spotBox[idx='" + i + "']").removeClass("selected");
                $(".spotCardWrapper[idx='" + i + "']").removeClass("selected");
                $(".spotBox[idx='" + i + "']").addClass("unSelected");
                $(".spotCardWrapper[idx='" + i + "']").addClass("unSelected");
                $(".hint").css("display","none");
                $(".hintOut").css("display","none");
                if(this.show === "selected"){
                    $(".spotBox[idx='" + i + "']").hide();
                    $(".spotCardWrapper[idx='" + i + "']").hide();
                }else if(this.show === "unSelected"){
                    $(".spotBox[idx='" + i + "']").show();
                    $(".spotCardWrapper[idx='" + i + "']").show();
                }
            }
        }
        $(".restore").removeClass("displayNone");
        this.count = 0;
        this.updateCount();
        listen.addClass("ab_select")
        listen.removeClass("ab_unSelect");
        $(".spot_wrap .pincenter").addClass("off");
    },

    checkResult: function(){
        $(".noResult").addClass("displayNone")
        if(this.show === "selected" && this.count === 0){
            $(".noResult").removeClass("displayNone")
            $(".noResult p").html("선택한 관광지가 없습니다")
        }else if(this.show === "unSelected" && this.count === this.list.length){
            $(".noResult").removeClass("displayNone")
            $(".noResult p").html("선택 안 한 관광지가 없습니다")
        }
    },


    sort: function(std){
        this.inf.sort(function (a, b) {
            return a[std] < b[std] ? -1 : a[std] > b[std] ? 1 : 0;
        })
        this.inflate();
    }
}

export default Spots;
