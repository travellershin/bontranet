import Spots from "./modules/spots.js";
import Hotels from "./modules/hotels.js"

let db = {}

firebase.database().ref("ny").once("value", snap => {
    db = snap.val();
    Spots.init(db.spots);
    //Hotels.conv(db);
    //Hotels.metro(db);



    // let addSpot = [40.7156368, -73.9985153];
    // let metroInfo = []
    //
    // for (let i = 0; i < 474; i++) {
    //     let metroName = db.metro[i][0];
    //     let latDif = Math.pow((addSpot[0] - db.metro[i][1][1])*111034,2);
    //     let lngDif = Math.pow((addSpot[1] - db.metro[i][1][0]) * 85397, 2);
    //     let dif = Math.round(Math.sqrt(latDif+lngDif))
    //
    //     if(dif<500){
    //         for (let k = 0; k < db.metro[i][2].length; k++) {
    //             if (db.metro[i][2][k].length > 2){
    //                 db.metro[i][2].splice(k,1)
    //             }
    //         }
    //         console.log("확인하려는 관광지는 " + metroName + " 지하철역에서 " + dif + "m 떨어져있다. - " + db.metro[i][2] + "호선");
    //         console.log(i)
    //         metroInfo.push({
    //             name: metroName,
    //             distance: dif,
    //             line: db.metro[i][2]
    //         })
    //     }
    // }
    // //아래는 파이어베이스에 메트로 정보를 업데이트하기위한 그런거
    // //firebase.database().ref("ny/spots/"+j+"/metro").set(db.spots[j].metro);
    //
    // for (var i = 0; i < db.spots.length; i++) {
    //     if(!db.spots[i].metro){
    //         console.log(db.spots[i])
    //     }
    // }



    // console.log(db)
    // let lineArray = []
    // let popularLine = {}
    // for (var k = 0; k < db.spots.length; k++) {
    //     console.log(db.spots[k])
    //     //현재는 가장 가까운 지하철역이 입력 안 된 경우가 있음
    //     for (var i = 0; i < db.spots[k].metro.length; i++) {
    //         for (var j = 0; j < db.spots[k].metro[i].line.length; j++) {
    //             let lineName = db.spots[k].metro[i].line[j]
    //             if(lineArray.includes(lineName)){
    //                 popularLine[lineName]++
    //             }else{
    //                 lineArray.push(lineName);
    //                 popularLine[lineName] = 1
    //             }
    //         }
    //     }
    // }
    // console.log(popularLine)

})

$(".spots").on("click", ".spotBox", function(){
    Spots.checked($(this).attr("idx"));
})
$(".spots").on("mouseover", ".spotBox", function () {
    Spots.mouseOver($(this).attr("idx"));
})
$(".spots").on("mouseout", ".spotBox", function () {
    Spots.mouseOut($(this).attr("idx"));
})
$(".ab_select").click(function(){
    Spots.checkAll();
})
$(".ab_unSelect").click(function () {
    Spots.unCheckAll();
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
