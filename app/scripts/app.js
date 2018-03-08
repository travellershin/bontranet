import Spots from "./modules/spots.js";
import Area from "./modules/area.js";

let db = {}

firebase.database().ref("ny").once("value", snap => {
    db = snap.val();
    console.log(db)
    Area.init(db.areas.agoda);
    Spots.init(db.spots);
    Area.calculate();
    Spots.hotelTest(db.tests);
    Spots.metroTest(db.metro);
})

$(".selector_infoBox").on("click", ".ib_box", function(){
    Spots.checked($(this).attr("idx"));
    Area.calculate();
})
$(".selector_infoBox").on("mouseover", ".ib_box", function () {
    Spots.mouseOver($(this).attr("idx"));
})
$(".selector_infoBox").on("mouseout", ".ib_box", function () {
    Spots.mouseOut($(this).attr("idx"));
})
$(".reco_filter_checkBoxDiv>input").change(function(){
    Area.calculate();
})
$(".ab_select").click(function(){
    Spots.checkAll();
    Area.calculate();
})
$(".ab_unSelect").click(function () {
    Spots.unCheckAll();
    Area.calculate();
})
$(".ob_rank").click(function(){
    Spots.sort("rank")
})
$(".ob_name").click(function () {
    Spots.sort("name")
})

// let hi = {
//     "criteria": {
//         "cityId": 9395,
//         "area": {
//             "id": 0,
//             "cityId": 0
//         },
//         "landmarkId": 0,
//         "checkInDate": "2017-09-02",
//         "checkOutDate": "2017-09-03",
//         "additional": {
//             "language": "en-us",
//             "sortBy": "PriceAsc",
//             "maxResult": 10,
//             "discountOnly": false,
//             "minimumStarRating": 0,
//             "minimumReviewScore": 0,
//             "dailyRate": {
//                 "minimum": 1,
//                 "maximum": 100
//             },
//             "occupancy": {
//                 "numberOfAdult": 2,
//                 "numberOfChildren": 1
//             },
//             "currency": "USD"
//         }
//     }
// }

// $.ajax({
//     method: 'POST',
//     headers: {
//         'Authorization': '1799898:79c9455c-0649-402b-a5da-565d8faad17e'
//     },
//     url: 'http://affiliateapi7643.agoda.com/affiliateservice',
//     data:JSON.stringify(hi),
//     contentType:'application/json',
//     dataType:'json',
//     success: function (data) {
//         console.log(data);
//     }

// })