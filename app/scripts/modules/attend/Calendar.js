var Calendar = {
    weekdays: ["일", "월", "화", "수", "목", "금", "토", "일"],

    init: function(){
        $('#calendar').fullCalendar({
            height: 550,
            firstDay: 1
        })

        this.inflate_week_planner();
    },

    inflate_week_planner: function(){
        var m = moment();

        var thisWeek = "";
        var nextWeek = "";

        for (var i = 1; i < 8; i++) {
            let thisDate = m.day(i).format("MM-DD");
            let nextDate = moment(thisDate).add(7, "days").format("MM-DD")

            thisWeek += '<div class="day"><p class="text"><span class="monthDay">'+thisDate+'</span>('+this.weekdays[i]+')</p>';
            thisWeek += '<div class="workHour" id="'+thisDate+'"></div></div>';

            nextWeek += '<div class="day"><p class="text"><span class="monthDay">'+nextDate+'</span>('+this.weekdays[i]+')</p>';
            nextWeek += '<div class="workHour" id="'+nextDate+'"></div></div>';
        }
        $(".weekPlan.thisWeek").html(thisWeek);
        $(".weekPlan.nextWeek").html(nextWeek);

        $(".weekPlan").on("click", ".workHour", function(){
            var n = moment();
            console.log($(this).attr("id"))
            console.log(n.format("MM-DD"))
            if($(this).attr("id")<n.format("MM-DD")){
                console.log("지난 근무시간 입력")
            }else{
                console.log("추후 근무일정 입력")
            }
        })
    }
}

export default Calendar
