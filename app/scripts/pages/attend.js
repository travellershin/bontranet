var Attend = {
    mobile: false,

    id: "",

    viewID: "",
    //관리자가 다른 사람의 ID 확인중

    attendObj: {},

    salary: {},


    weekdays: ["일", "월", "화", "수", "목", "금", "토", "일"],

    init: function(u_i){
        let that = this;
        var grade = u_i.grade;
        var id = u_i.id;

        this.id = id;

        var txt = '';
        txt+='<select class="worker_selector"></select>';
        txt+='<div class="attend__top">';
        txt +=   '<div id="calendar" class="attend__calendar"></div>';
        txt +=   '<div class="attend__week"></div>';
        txt +='</div>';
        txt +='<div class="attend__month"></div>';

        $(".pages.attend").html(txt).removeClass("displayNone");

        firebase.database().ref("account/salary").once("value", snap =>{
            that.salary = snap.val();
            if(grade === 5){
                $(".worker_selector").removeClass("displayNone");
                firebase.database().ref("users").once("value", snap =>{
                    $(".loadingView").addClass("displayNone");
                    let users = snap.val();
                    let txt = '';
                    for (var mailID in users) {
                        if(users[mailID].grade*1<5){
                            txt += '<option value="' + mailID + '">' + users[mailID].name + '</option>';
                        }
                    }
                    $(".worker_selector").html(txt).val(id).prop("selected", true);
                });
            }else{
                firebase.database().ref("attend/"+this.id).on("value", snap => {
                    $(".loadingView").addClass("displayNone");
                    this.attendObj = snap.val();
                    console.log(this.attendObj);
                    that.inflate_calendar(that.attendObj);

                    if(!$(".fc-header-toolbar").length){
                        $('#calendar').fullCalendar({
                            height: 564,
                            firstDay: 1,
                            viewRender : function (view, element) {
                                that.inflate_calendar(that.attendObj);
                            },
                            dayClick: function(date){
                                that.inputWorkHour(date);
                            }
                        });
                    }
                });
            }
        });

        this.listener();
    },

    listener: function(){
        let that = this;

        $(".modal").on("click", ".confirm", function(){
            if(!$(".attend").hasClass('displayNone')){
                that.setWorkHour($(this).attr("did"));
                $(".inputWindow input").val("");
            }
        });
        $(".modal").on("click", ".close", function(){
            if (!$(".attend").hasClass('displayNone')) {
                $(".blackScreen").addClass("displayNone");
                $(".inputWindow input").val("");
            }
        });
        $("body").keyup(function(e){
            if (!$(".attend").hasClass('displayNone')) {
                if ($(".modal .confirm").length) {
                    var code = e.which; // recommended to use e.which, it's normalized across browsers
                    if (code == 13) {
                        if ($("#first_from").val().length > 0) {
                            that.setWorkHour($(".modal .confirm").attr("did"));
                        }
                    }
                }
            }
        });

        $(".worker_selector").change(function(){
            let id = $(this).val();

            that.view_worker(id);
        });
    },

    view_worker: function(id){
        let that = this;

        if(id === that.id){
            $(".attend__calendar").addClass("displayNone");
            $(".attend__week").html("");
            $(".attend__month").html("");
        }else{
            $(".attend__calendar").removeClass("displayNone");
            if(that.viewID.length>0){
                firebase.database().ref("attend/"+that.viewID).off();
            }

            firebase.database().ref("attend/"+id).on("value", snap => {
                that.attendObj = snap.val();
                let yo = that.viewID;
                that.viewID = id;

                if(yo.length === 0){
                    $('#calendar').fullCalendar({
                        height: 564,
                        firstDay: 1,
                        viewRender : function (view, element) {
                            if(that.id !== that.viewID){
                                that.inflate_calendar(that.attendObj);
                            }
                        },
                        dayClick: function(date){
                            that.inputWorkHour(date);
                        }
                    });
                }else{
                    that.inflate_calendar(that.attendObj);
                }


            })
        }


    },

    inflate_calendar: function(data){
        $(".attend").removeClass("displayNone");
        $(".fc-day").html("");

        if(data.attend){
            data = data.attend;
            for (var date in data) {
                let dateID = date.slice(0,4)+"-"+date.slice(4,6)+"-"+date.slice(6,8);
                let dif = 0;
                let txt = '<p>'+data[date][0].from+"~"+data[date][0].to+'</p>';
                //두타임 나눠서 근무했어도 달력에 표시되는 것은 첫타임 근무시간만

                for (var i = 0; i < data[date].length; i++) {
                    dif += data[date][i].dif;
                }

                txt+='<p>' + Math.floor(dif/60) + "시간 "+ dif%60 +"분"+'</p>';
                $('.attend .fc-day[data-date="'+dateID+'"]').html(txt);
            }
            let durMon = 0;
            let thisMonth = '';
            for (var i = 0; i < $(".attend .fc-day").length; i++) {
                let dateDom = $(".attend .fc-day").eq(i);
                if(!dateDom.hasClass("fc-other-month")){
                    let date = dateDom.attr("data-date").split("-");
                    thisMonth = date[0]+date[1];
                    date = date[0]+date[1]+date[2];

                    if(data[date]){
                        for (var j = 0; j < data[date].length; j++) {
                            durMon += data[date][j].dif;
                        }
                    }
                }
            }

            let txt = '';

            if($(".attend .fc-view-container").length){
                for (var i = 0; i < 6; i++) {   //무조건 6주
                    let weekDom = $(".attend .fc-week").eq(i);
                    let weekDur = 0;

                    for (var j = 0; j < 7; j++) {
                        let dayDom = weekDom.find(".fc-day").eq(j);
                        let date = dayDom.attr("data-date").split("-");
                        date = date[0]+date[1]+date[2];
                        if(data[date]){
                            for (var k = 0; k < data[date].length; k++) {
                                weekDur += data[date][k].dif;
                            }
                        }
                    }
                    if(weekDur>0){
                        txt+='<p class="attend__week__hour">'+ Math.floor(weekDur/60)+'시간 '+weekDur%60+'분' +'</p>';
                    }else{
                        txt+='<p class="attend__week__hour"></p>';
                    }
                }

                $(".attend__week").html(txt);
            }

            if ($(".attend .fc-left").children("h2.durMonth").length){
                $(".attend h2.durMonth").html(' ('+Math.floor(durMon/60)+'시간 '+durMon%60+'분)');
            }else{
                $(".attend .fc-left").append('<h2 class="durMonth"> ('+Math.floor(durMon/60)+'시간 '+durMon%60+'분)</h2>');
            }

            txt = '';   //var 빼먹은거 아님. 위에서 선언 했음!

            let fullMonthBonus = 30400;
            let insuranceFee = 0;
            let basic = Math.round(durMon/60*7600);
            let fullWeekBunus = Math.round((durMon/60*7600)*0.2);

            // if(this.id === this.viewID){
            //     //본인 모드
            //     firebase.database().ref("account/salary/"+thisMonth+"/"+this.id).update({
            //         basic: basic,
            //         fullWeekBunus: fullWeekBunus,
            //         fullMonthBonus: fullMonthBonus
            //     });
            // }else{
            //     firebase.database().ref("account/salary/"+thisMonth+"/"+this.viewID).update({
            //         basic: basic,
            //         fullWeekBunus: fullWeekBunus,
            //         fullMonthBonus: fullMonthBonus
            //     });
            // }

            txt+='<div class="attend__month__line">';
            txt+=   '<p class="attend__month__category">기본급</p>';
            txt+=   '<p class="attend__month__value">'+ comma(basic)+ "원</p>";
            txt+=   '<p class="attend__month__explain">근무시간 X 7,600원</p>';
            txt+='</div>';

            txt+='<div class="attend__month__line">';
            txt+=   '<p class="attend__month__category">주휴수당</p>';
            txt+=   '<p class="attend__month__value">'+ comma(fullWeekBunus) +"원</p>";
            txt+=   '<p class="attend__month__explain">기본급의 20%</p>';
            txt+='</div>';

            txt+='<div class="attend__month__line">';
            txt+=   '<p class="attend__month__category">연차수당</p>';
            txt+=   '<p class="attend__month__value">'+ comma(fullMonthBonus) +"원</p>";
            txt+=   '<p class="attend__month__explain">5시간 상당 기본급</p>';
            txt+='</div>';

            txt+='<div class="attend__month__line attend__month__line--red">';
            txt+=   '<p class="attend__month__category">사회보험료</p>';
            txt+=   '<p class="attend__month__value">'+ comma(insuranceFee) +"원</p>";
            txt+=   '<p class="attend__month__explain">국민연금/고용보험/건강보험 청구액</p>';
            txt+='</div>';

            txt+='<div class="attend__month__line attend__month__line--sum">';
            txt+=   '<p class="attend__month__category">합계</p>';
            txt+=   '<p class="attend__month__value">'+ comma(basic + fullWeekBunus + fullMonthBonus - insuranceFee) +"원</p>";
            txt+=   '<p class="attend__month__explain">기본급 + 주휴수당 + 연차수당 - 사회보험료</p>';
            txt+='</div>';

            $(".attend__month").html(txt);
        }
    },

    inputWorkHour: function(dateObj){
        // css: modules/attend.css
        let dateShort = moment(dateObj).format("MM/DD");
        let dateID = moment(dateObj).format("YYYYMMDD");

        let data = {};
        if(this.attendObj.attend[dateID]){
            data = this.attendObj.attend[dateID];
        }

        let txt = '';

        txt+='<div class="blackScreen">';
        txt+=   '<div class="inputWindow">';
        txt+=       '<p class="title">'+dateShort+' 근무시간</p>';
        txt+=       '<div class="line clearfix">';
        if(data[0]){
            txt+=       '<input id="first_from" value="'+data[0].from+'"><p class="word">부터</p><input id="first_to" value="'+data[0].to+'"><p class="word">까지</p>';
        }else{
            txt+=       '<input id="first_from"><p class="word">부터</p><input id="first_to"><p class="word">까지</p>';
        }
        txt+=       '</div>';
        txt+=       '<div class="line clearfix">';
        if(data[1]){
            txt+=       '<input id="second_from" value="'+data[1].from+'"><p class="word">부터</p><input id="second_to" value="'+data[1].to+'"><p class="word">까지</p>';
        }else{
            txt+=       '<input id="second_from"><p class="word">부터</p><input id="second_to"><p class="word">까지</p>';
        }
        txt+=       '</div>';
        txt+=       '<div class="bottom">';
        txt+=           '<p class="confirm" did="'+dateID+'">확인</p>';
        txt+=           '<p class="close">취소</p>';
        txt+=       '</div>';
        txt+=   '</div>';
        txt+='</div>';

        $(".modal").html(txt);

        if(this.mobile){
            $(".inputWindow input").AnyPicker({
                dateTimeFormat:"HH:mm"
            });
        }

        $("#first_from").focus();
    },

    setWorkHour: function(date){

        let work = [];

        let allEmpty = true;
        for (var i = 0; i < $(".inputWindow input").length; i++) {
            if($(".inputWindow input").eq(i).val().length>1){
                allEmpty = false;
            }
        }

        if(allEmpty){
            if(this.viewID.length>0){
                firebase.database().ref("attend/"+this.viewID+"/attend/"+date).remove();
            }else{
                firebase.database().ref("attend/"+this.id+"/attend/"+date).remove();
            }

            $(".modal").html("");
            let dateID = date.slice(0,4) + "-"+date.slice(4,6) + "-"+date.slice(6,8);
            $('.fc-day[data-date="'+dateID+'"]').html("");
            return false;
        }


        if($("#first_from").val()<"23:59"&&$("#first_from").val()>"08:00"){
            //시작시간이 잘 입력되었나 확인

            if(date<moment().format("YYYYMMDD")){
                //오늘 이전 일의 날짜를 다루고 있을 경우 - 근무 종료시간이 입력되지 않으면 안 됨
                if($("#first_to").val()<"23:59"&&$("#first_to").val()>"08:00"){

                }else{
                    alert("근무 종료시간을 HH:MM 형식으로 입력해주세요.");
                    return false;
                }

            }else{
                //이전일이 아니더라도 예상 근무시간이라도 입력해야 함
                if($("#first_to").val()<"23:59"&&$("#first_to").val()>"08:00"){

                }else{
                    alert("예상 근무 종료시간을 HH:MM 형식으로 입력해주세요.");
                    return false;
                }
            }
            let from = $("#first_from").val();
            let to = $("#first_to").val();

            let fromA = from.split(":");
            let toA = to.split(":");
            let dif = (toA[0]*1 - fromA[0]*1)*60 + (toA[1]*1 - fromA[1]*1);


            work.push({
                from: from,
                to: to,
                dif: dif
            });

        }else{
            alert("근무시간이 잘못 입력되었습니다. HH:MM 형식으로 입력해주세요");
            return false;
        }

        if($("#second_from").val().length>0){
            if($("#second_from").val()<"23:59"&&$("#second_from").val()>"08:00"){

                if(date<moment().format("YYYYMMDD")){
                    //오늘 이전 일의 날짜를 다루고 있을 경우 - 근무 종료시간이 입력되지 않으면 안 됨
                    if($("#second_to").val()<"23:59"&&$("#second_to").val()>"08:00"){

                    }else{
                        alert("두 번째 근무의 근무 종료시간을 HH:MM 형식으로 입력해주세요.");
                        return false;
                    }

                }else{
                    //이전일이 아니더라도 예상 근무시간이라도 입력해야 함
                    if($("#second_to").val()<"23:59"&&$("#second_to").val()>"08:00"){

                    }else{
                        alert("두 번째 근무의 예상 근무 종료시간을 HH:MM 형식으로 입력해주세요.");
                        return false;
                    }
                }

                let from = $("#second_from").val();
                let to = $("#second_to").val();

                let fromA = from.split(":");
                let toA = to.split(":");
                let dif = (toA[0]*1 - fromA[0]*1)*60 + (toA[1]*1 - fromA[1]*1);

                work.push({
                    from: from,
                    to: to,
                    dif: dif
                });
            }else{
                alert("두 번째 근무의 근무시간이 잘못 입력되었습니다. HH:MM 형식으로 입력해주세요");
                return false;
            }
        }
        if(this.viewID.length>0){
            firebase.database().ref("attend/"+this.viewID+"/attend/"+date).set(work);
        }else{
            firebase.database().ref("attend/"+this.id+"/attend/"+date).set(work);
        }

        $(".modal").html("");
    }
};

export default Attend;
