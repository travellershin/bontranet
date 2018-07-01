var Attend = {
    mobile: false,

    id: "",

    attendObj: {},

    weekdays: ["일", "월", "화", "수", "목", "금", "토", "일"],

    init: function(id, name, grade){
        let that = this;
        $(".helloWorld").html(name[1]+"하!");
        $(".helloWorld").attr("title",name+"님 안녕하세요!");
        this.id = id;

        if(grade === 5){
            $(".worker_selector").removeClass("displayNone");
            firebase.database().ref("users").once("value", snap =>{
                let users = snap.val();
                let txt = ''
                for (var mailID in users) {
                    txt += '<option value="'+mailID+'">'+mailID+'</option>'
                }
                $(".worker_selector").html(txt);
            })
        }else{
            firebase.database().ref("attend/"+this.id).on("value", snap => {
                this.attendObj = snap.val();
                $('#calendar').fullCalendar({
                    height: 552,
                    firstDay: 1,
                    viewRender : function (view, element) {
                        that.inflate_calendar(that.attendObj)
                    }
                });
            })
        }


        this.listener();
    },

    listener: function(){
        let that = this;

        $(".attendView_input").click(function(){
            that.inflate_input(that.attendObj);
        })
        $(".attendView_Show").click(function(){
            that.inflate_calendar(that.attendObj);
        })
    },

    inflate_calendar: function(data){
        $(".attendView_Show").addClass("selected");
        $(".attendView_input").removeClass("selected");
        $(".attend .input").addClass("displayNone");
        $(".calendarView").removeClass("displayNone");

        if(data.attend){
            data = data.attend
            for (var date in data) {
                let dateID = date.slice(0,4)+"-"+date.slice(4,6)+"-"+date.slice(6,8);
                let dif = 0
                for (var i = 0; i < data[date].length; i++) {
                    dif += data[date][i].dif
                }
                let hour = Math.floor(dif/60);
                let min = dif%60;
                $('.fc-day[data-date="'+dateID+'"]').html(hour+"시간 "+min+"분")
            }
            let durMon = 0;

            for (var i = 0; i < $(".fc-day").length; i++) {
                let dateDom = $(".fc-day").eq(i);
                if(!dateDom.hasClass("fc-other-month")){
                    let date = dateDom.attr("data-date").split("-")
                    date = date[0]+date[1]+date[2];
                    if(data[date]){
                        for (var j = 0; j < data[date].length; j++) {
                            durMon += data[date][j].dif
                        }
                    }
                }
            }
            let txt = $(".fc-left>h2").html();
            if(durMon>0){
                txt+=' ('+Math.floor(durMon/60)+'시간 '+durMon%60+'분)'
            }
            $(".fc-left>h2").html(txt)
        }



    },

    inflate_input: function(data){
        $(".attendView_Show").removeClass("selected");
        $(".attendView_input").addClass("selected");
        $(".attend .input").removeClass("displayNone");
        $(".calendarView").addClass("displayNone");

        var m = moment().day(-8);

        var pastWeek = '<p class="title pastTitle"></p><div class="weekPlan pastWeek clearfix">';
        var thisWeek = '<p class="title thisTitle"></p><div class="weekPlan thisWeek clearfix">';
        var nextWeek = '<p class="title nextTitle"></p><div class="weekPlan nextWeek clearfix">';

        let durData = {}
        let pastDur = 0;
        let thisDur = 0;
        let nextDur = 0;

        if(data.attend){
            durData = data.attend
        }

        for (var i = 0; i < 21; i++) {
            let date =  m.add(1, "days").format("MM-DD");
            let dateID = m.format("YYYYMMDD");
            let txt = '<div class="day"><p class="text"><span class="monthDay">'+date+'</span>('+this.weekdays[i%7]+')</p><div class="workHour" id="d_'+dateID+'"></div></div>';
            let dif = 0;

            if(durData[dateID]){
                for (var j = 0; j < durData[dateID].length; j++) {
                    dif = durData[dateID][j].dif
                }
            }

            if(i<7){
                pastWeek += txt;
                pastDur += dif
            }else if(i<14){
                thisWeek += txt;
                thisDur += dif
            }else{
                nextWeek += txt;
                nextDur += dif
            }
        }
        pastWeek+= '</div>';
        thisWeek+= '</div>';
        nextWeek+= '</div>';

        $(".attend .input").html(pastWeek+thisWeek+nextWeek);

        let that = this;
        $(".attend .input").on("click", ".workHour", function(){
            that.inputWorkHour($(this).attr("id"));
        })
        $(".pastTitle").html("지난주 근무 일정 ("+Math.floor(pastDur/60)+"시간 "+pastDur%60+"분)")
        $(".thisTitle").html("이번주 근무 일정 ("+Math.floor(thisDur/60)+"시간 "+thisDur%60+"분)")
        $(".nextTitle").html("다음주 근무 일정 ("+Math.floor(nextDur/60)+"시간 "+nextDur%60+"분)")


        if(data.attend){
            data = data.attend
            for (var date in data) {
                let txt = ''
                for (var i = 0; i < data[date].length; i++) {
                    let from = data[date][i].from;
                    let to = data[date][i].to;

                    txt += '<p>'+from+" ~ "+to+'</p>'
                }
                $("#d_"+date).html(txt)
            }
        }
    },

    inputWorkHour: function(date){
        // css: modules/attend.css
        if(!document.querySelector(".inputWindow")){
            let inputWindow = '<div class="blackScreen"><div class="inputWindow">';
            inputWindow+= '<p class="title">'+date.slice(6,8)+"/"+date.slice(8)+' 근무시간</p>'
            inputWindow+= '<div class="line clearfix"><input id="first_from"><p class="word">부터</p><input id="first_to"><p class="word">까지</p></div>'
            inputWindow+= '<div class="line clearfix"><input id="second_from"><p class="word">부터</p><input id="second_to"><p class="word">까지</p></div>'


            inputWindow += '<div class="bottom"><p class="confirm" id="'+date+'">확인</p><p class="close">취소</p></div></div></div>';

            $("body").append(inputWindow);

            if(this.mobile){
                $(".inputWindow input").AnyPicker({
                    dateTimeFormat:"HH:mm"
                })
            }

            let that = this;
            $("body").on("click", ".confirm", function(){
                that.setWorkHour($(this).attr("id"));
                $(".inputWindow input").val("");
            })
            $("body").on("click", ".close", function(){
                $(".blackScreen").addClass("displayNone");
                $(".inputWindow input").val("");
            })
        }else{
            $(".blackScreen").removeClass("displayNone");
        }

    },

    setWorkHour: function(date){
        let work = []
        if($("#first_from").val()<"23:59"&&$("#first_from").val()>"08:00"){
            //시작시간이 잘 입력되었나 확인

            if(date<moment().format("MM-DD")){
                //오늘 이전 일의 날짜를 다루고 있을 경우 - 근무 종료시간이 입력되지 않으면 안 됨
                if($("#first_to").val()<"23:59"&&$("#first_to").val()>"08:00"){

                }else{
                    alert("근무 종료시간을 HH:MM 형식으로 입력해주세요.")
                    return false;
                }

            }else{
                //이전일이 아니더라도 예상 근무시간이라도 입력해야 함
                if($("#first_to").val()<"23:59"&&$("#first_to").val()>"08:00"){

                }else{
                    alert("예상 근무 종료시간을 HH:MM 형식으로 입력해주세요.")
                    return false;
                }
            }
            let from = $("#first_from").val()
            let to = $("#first_to").val()

            let fromA = from.split(":");
            let toA = to.split(":");
            let dif = (toA[0]*1 - fromA[0]*1)*60 + (toA[1]*1 - fromA[1]*1)


            work.push({
                from: from,
                to: to,
                dif: dif
            })

        }else{
            alert("근무시간이 잘못 입력되었습니다. HH:MM 형식으로 입력해주세요");
            return false;
        };

        if($("#second_from").val().length>0){
            if($("#second_from").val()<"23:59"&&$("#second_from").val()>"08:00"){

                if(date<moment().format("MM-DD")){
                    //오늘 이전 일의 날짜를 다루고 있을 경우 - 근무 종료시간이 입력되지 않으면 안 됨
                    if($("#second_to").val()<"23:59"&&$("#second_to").val()>"08:00"){

                    }else{
                        alert("두 번째 근무의 근무 종료시간을 HH:MM 형식으로 입력해주세요.")
                        return false;
                    }

                }else{
                    //이전일이 아니더라도 예상 근무시간이라도 입력해야 함
                    if($("#second_to").val()<"23:59"&&$("#second_to").val()>"08:00"){

                    }else{
                        alert("두 번째 근무의 예상 근무 종료시간을 HH:MM 형식으로 입력해주세요.")
                        return false;
                    }
                }

                let from = $("#second_from").val()
                let to = $("#second_to").val()

                let fromA = from.split(":");
                let toA = to.split(":");
                let dif = (toA[0]*1 - fromA[0]*1)*60 + (toA[1]*1 - fromA[1]*1)


                work.push({
                    from: from,
                    to: to,
                    dif: dif
                })
            }else{
                alert("두 번째 근무의 근무시간이 잘못 입력되었습니다. HH:MM 형식으로 입력해주세요");
                return false;
            }
        }

        firebase.database().ref("attend/"+this.id+"/attend/"+date.slice(2)).set(work);
        $(".blackScreen").addClass("displayNone");

    },

    initInput: function(){
        //근무시간 입력창을 초기화한다
    }
}

export default Attend;
