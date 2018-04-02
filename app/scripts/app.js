import Spots from "./modules/spots.js";
import Hotels from "./modules/hotels.js"
import DatePicker from "./modules/DatePicker.js"

let db = {}

$(document).ready(function(){
    let idx = 0
    firebase.database().ref("ny").once("value", snap => {
        db = snap.val();
        DatePicker.init();
        Hotels.init(db.hotels);
        if(idx > 58){
            Spots.init(db.spots)
        }
    })

    let count = function(i){
        if(i<59){
            setTimeout(function () {
                i++;
                idx++;
                $(".general .citySpot_total").html(i);
                $(".general .counter .total").html(" / "+i);
                count(i)
            }, (i*1.8+15));
        }else{
            if(db.spots){
                Spots.init(db.spots);
            }
        }
    }
    count(0);

})
if(db.spots){
    console.log("hi")
}else{
    console.log("no")
}


$("body").click(function(){
    $(".closeWhenBodyClick").addClass("displayNone")
})

$(".spot_wrap .icon--info").click(function(){
    $(".spot_wrap .spot_hint").toggleClass("displayNone");
    return false;
})
$(".share").click(function(){
    $(".shareBox").toggleClass("displayNone");
    return false;
})

$(".spots").on("click", ".spotBox", function(){
    Spots.checked($(this).attr("idx"));
})
$(".cardBox").on("click", ".spotCardWrapper", function(){
    Spots.checked($(this).attr("idx"));
})
$(".cardBox").on("mouseover", ".spotCardWrapper", function(){
    Spots.cardOver($(this).attr("idx"));
})
$(".spots").on("mouseover", ".spotBox", function () {
    Spots.mouseOver($(this).attr("idx"));
})
$(".cardBox").on("mouseenter", ".spotCardWrapper", function(){
    Spots.cardOver_scroll($(this).attr("idx"));
})
$(".cardBox").on("mouseout", ".spotCardWrapper", function(){
    Spots.cardOut($(this).attr("idx"));
})
$(".spots").on("mouseout", ".spotBox", function () {
    Spots.mouseOut($(this).attr("idx"));
})
$(".hotelsDiv").on("mouseover", ".hotelCardWrap", function(){
    Hotels.mouseOver($(this).attr("id"))
})
$(".hotelsDiv").on("mouseout", ".hotelCardWrap", function(){
    Hotels.mouseOut($(this).attr("id"))
})
$(".view_all").click(function(){
    $(".filterName").html($(this).html())
    $(".selected").show();
    $(".unSelected").show();
    Spots.show = "all";
    Spots.updateCount();
})
$(".view_select").click(function(){
    $(".filterName").html($(this).html())
    $(".unSelected").hide();
    $(".selected").show();
    Spots.show = "selected"
    Spots.updateCount();
})
$(".view_unSelect").click(function(){
    $(".filterName").html($(this).html())
    $(".selected").hide();
    $(".unSelected").show();
    Spots.show = "unSelected";
    Spots.updateCount();

})
$(".ob_rank").click(function(){
    Spots.sort("rank");
    $(".orderName").html("인기순");
})
$(".ob_name").click(function () {
    Spots.sort("name");
    $(".orderName").html("가나다순");
})
$(".showCard").click(function(){
    $(".m").addClass("displayNone");
    $(".cv").removeClass("displayNone");
    $(".showCard").addClass("displayNone");
})
$(".showMap").click(function(){
    $(".m").removeClass("displayNone");
    $(".cv").addClass("displayNone");
    $(".showCard").removeClass("displayNone");
})

$(".showSpot").click(function(){
    $(".wrapper").removeClass("hotel");
    $(".wrapper").addClass("spot");
    $(".cv").removeClass("displayNone");
    $(".m").addClass("displayNone");
    $(".showCard").addClass("displayNone");
    $(".showMap").removeClass("displayNone");
})

$(".showAcco").click(function(){
    $(".wrapper").addClass("hotel");
    $(".wrapper").removeClass("spot");
    $(".cv").addClass("displayNone");
    $(".m").removeClass("displayNone");
    $(".showCard").addClass("displayNone");
    $(".showMap").addClass("displayNone");

    $(".showSpot").addClass("displayNone")
    $(".hotelsDiv").addClass("displayNone")
    $(".hotels_setter").addClass("displayNone");
    $(".hotelsLoader").removeClass("displayNone");
    Hotels.calculate(Spots.selected,Spots.list);
})
$(".restore").click(function(){
    Spots.restore();
})
$(".setter .filter").click(function(){
    $(".drop_filter").toggleClass("displayNone")
    return false;
})
$(".setter .order").click(function(){
    $(".drop_order").toggleClass("displayNone")
    return false;
})
$(".drop_filter>p, .drop_order>p").click(function(){
    $(".drop_filter").addClass("displayNone")
    $(".drop_order").addClass("displayNone")
    return false;
})

$(".spot_wrap .counter").on("click",".ab_select",function(){
    Spots.checkAll($(this));
})
$(".spot_wrap .counter").on("click",".ab_unSelect",function(){
    Spots.unCheckAll($(this));
})

$(".hotelsDiv").on("click",".hotelCardWrap",function(){
    Hotels.showDetail($(this).attr("id"), $(".hotelCardWrap").index($(this)), Spots.selected, DatePicker.firstDateTxt, DatePicker.secondDateTxt);
    return false;
})
$(".closeHotelDetail").click(function(){
    $(".wrap_hotelDetail").addClass("displayNone")
})
$("header .peopleWrap .dropBox").change(function(){
    Hotels.peopleNo = $("header .peopleWrap .dropBox").val()
    $(".hd_sidebar>.std>span").eq(2).html($("header .peopleWrap .dropBox").val())
})
$(".hotelDetail").on("click",".moreFoot",function(){
    Hotels.moreFoot();
    $(this).addClass("displayNone");
})
$(".hotelDetail").on("click",".moreMetro",function(){
    Hotels.moreMetro();
    $(this).addClass("displayNone");
})
$(".wrap_hotelDetail .iconRight").click(function(){
    return false;
})
$(".wrap_hotelDetail .iconLeft").click(function(){
    return false;
})
$(".hotelDetail").click(function(){
    return false;
})
