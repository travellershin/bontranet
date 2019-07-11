//initialize
let isCalendarInit = false;
window.onload = setInterval(clock,1000);

$("#nav_attend").click(function(){
    $(".nav__item").removeClass("nav__item--selected");
    $(this).addClass("nav__item--selected");
    $(".page").addClass("displayNone");
    $("#attend").removeClass("displayNone");
});

$("#nav_calendar").click(function(){
    $(".nav__item").removeClass("nav__item--selected");
    $(this).addClass("nav__item--selected");
    //캘린더 페이지 열기
    $(".page").addClass("displayNone");
    $("#calendar").removeClass("displayNone");

    if(!isCalendarInit){
        isCalendarInit = true;
        //최초 캘린더 실행
        var calendarEl = document.getElementById('calendar');
        
        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: [ 'dayGrid', 'interaction' ],
    
            dateClick: function(info) {
            alert('Date: ' + info.dateStr);
            console.log(info);
            }
        });
    
        calendar.render();
    }
});

//출근버튼누름
$("#at__btn").click(function(){
   push_come(); 
});

$("#at__btn-tg").click(function(){
    push_leave(); 
 });

 Date.prototype.ymd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
};

 function push_come(){
    $("#at__btn").addClass("displayNone");
    $("#at__btn-tg").removeClass("displayNone");
    $("#at__box__clock").removeClass("displayNone");
    localStorage.isCome = "true";

    let d = new Date();

    var hour =d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    if(hour<10){
        hour = "0"+hour;
    }
    if(min<10){
        min = "0"+min;
    }

    let time = hour+":"+min
    localStorage.comeTime = time;

    d = d.ymd();
    let user = localStorage.user;

    firebase.database().ref(`attend/${user}/${d}`).set({
        come:time,
        leave:"",
        length:""
    });
 }

 function push_leave(){
     if(confirm("퇴근합니까?")){
        $("#at__btn").removeClass("displayNone");
        $("#at__btn-tg").addClass("displayNone");
        localStorage.isCome = "false";


        let d = new Date();

        var hour =d.getHours();
        var min = d.getMinutes();
        if(hour<10){
            hour = "0"+hour;
        }
        if(min<10){
            min = "0"+min;
        }

        let time = hour+":"+min;
        
        d = d.ymd();
        let user = localStorage.user;
        let length = $("#clock-left").html();
        length = length.split(":")[0]*60 + length.split(":")[1]*1;

        firebase.database().ref(`attend/${user}/${d}`).set({
            come:localStorage.comeTime,
            leave:time,
            length:length
        });
        $("#clock-left").html("00:00");
     }
 }


function clock(){
    var d = new Date();

    var hour =d.getHours();
    var min = d.getMinutes();
    if(hour<10){
        hour = "0"+hour;
    }
    if(min<10){
        min = "0"+min;
    }

    var time = hour+":"+min;

    document.getElementById("clock").innerHTML=time;

    if(localStorage.isCome === "true"){
        calcLength(time);
    }

}

function calcLength(now){
    var come = localStorage.comeTime;
    var comeH = come.split(":")[0]*1;
    var comeM = come.split(":")[1]*1;

    var nowH = now.split(":")[0]*1;
    var nowM = now.split(":")[1]*1;

    var dif = (nowH - comeH)*60 + (nowM - comeM);

    var difH = Math.floor(dif/60,0);
    var difM = dif - (difH*60);

    if(difH<10){
        difH = "0"+difH;
    }

    if(difM<10){
        difM = "0"+difM;
    }

    var time = difH+":"+difM;

    document.getElementById("clock-left").innerHTML=time;
}