/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _spots = __webpack_require__(1);

var _spots2 = _interopRequireDefault(_spots);

var _hotels = __webpack_require__(2);

var _hotels2 = _interopRequireDefault(_hotels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = {};

firebase.database().ref("ny").once("value", function (snap) {
    db = snap.val();
    _spots2.default.init(db.spots);
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
});

$(".spots").on("click", ".spotBox", function () {
    _spots2.default.checked($(this).attr("idx"));
});
$(".spots").on("mouseover", ".spotBox", function () {
    _spots2.default.mouseOver($(this).attr("idx"));
});
$(".spots").on("mouseout", ".spotBox", function () {
    _spots2.default.mouseOut($(this).attr("idx"));
});
$(".ab_select").click(function () {
    _spots2.default.checkAll();
});
$(".ab_unSelect").click(function () {
    _spots2.default.unCheckAll();
});
$(".ob_rank").click(function () {
    _spots2.default.sort("rank");
});
$(".ob_name").click(function () {
    _spots2.default.sort("name");
});

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Spots = {
    list: [],
    inf: [],
    count: 0, //몇 개 선택되었는지 카운트
    showAll: true, //false인경우 체크된 것만 보기

    init: function init(data) {
        var _this = this;

        console.log(data);

        var _loop = function _loop(i) {
            data[i].checked = true;

            data[i].marker = new google.maps.Marker({
                position: data[i].coor,
                map: map,
                icon: "./assets/pin-map-on.svg"
            });

            var rank = data[i].rank + 1;

            var ct = '<div class="infowindow"><div class="infoImage ny_' + i + '"></div>';
            ct += '<p class="infoTitle">' + rank + " " + data[i].name + '</p><p class="infoDesc">' + data[i].description + '</p></div>';

            data[i].infowindow = new google.maps.InfoWindow({
                content: ct
            });

            data[i].marker.addListener('mouseover', function () {
                data[i].infowindow.open(map, data[i].marker);
            });

            data[i].marker.addListener('mouseout', function () {
                data[i].infowindow.close(map, data[i].marker);
            });

            var that = _this;
            data[i].marker.addListener('click', function () {
                that.checked(i);
            });

            _this.list.push(data[i]);
            _this.inf.push(data[i]);
        };

        for (var i = 0; i < data.length; i++) {
            _loop(i);
        }
        this.count = data.length;
        this.inflate();
        this.iconWell(3);
    },

    iconWell: function iconWell(size) {
        var hi = size;
        var that = this;
        if (hi > 18) {
            hi = 3;
        } else {
            hi += 1;
        }
    },

    inflate: function inflate() {
        var txt = "";
        if (this.showAll) {
            for (var i = 0; i < this.list.length; i++) {
                var info = this.inf[i];
                var rank = info.rank + 1;

                if (this.list[info.rank].checked) {
                    txt += '<div class="spotBox selected" idx=' + info.rank + '><div class="pinDiv"><span class="pincenter"></span>';
                    txt += '<span class="pin"></span></div><div class="info"><p class="rank">' + rank + '위</p>';
                    txt += '<p class="name_ko ko">' + info.name + '</p><p class="name_en">' + info.name + '</p></div></div>';
                } else {
                    txt += '<div class="spotBox" idx=' + info.rank + '><div class="pinDiv"><span class="pincenter"></span>';
                    txt += '<span class="pin"></span></div><div class="info"><p class="rank">' + rank + '위</p>';
                    txt += '<p class="name_ko ko">' + info.name + '</p><p class="name_en">' + info.name + '</p></div></div>';
                }
            }
        }
        this.updateCount();
        $(".spots").html(txt);
    },

    checked: function checked(i) {
        if (this.list[i].checked) {
            this.list[i].checked = false;
            this.list[i].marker.setIcon("./assets/pin-map-off.svg");
            $(".spotBox[idx='" + i + "']").removeClass("selected");
            this.count--;
        } else {
            this.list[i].checked = true;
            this.list[i].marker.setIcon("./assets/pin-map-on.svg");
            $(".spotBox[idx='" + i + "']").addClass("selected");
            this.count++;
        }
        this.updateCount();
    },

    mouseOver: function mouseOver(i) {
        this.list[i].infowindow.open(map, this.list[i].marker);
        this.list[i].marker.setAnimation(google.maps.Animation.BOUNCE);
    },

    mouseOut: function mouseOut(i) {
        this.list[i].infowindow.close(map, this.list[i].marker);
        this.list[i].marker.setAnimation(null);
    },

    updateCount: function updateCount() {
        $("label[for='reco_4']").html("<span></span>관광지 접근성 - 선택된 " + this.count + "개 관광지");
    },

    checkAll: function checkAll() {
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].checked = true;
            this.list[i].marker.setIcon("./assets/pin-map-on.svg");
            this.list[i].infowindow.close(map, this.list[i].marker);
            $(".spotBox[idx='" + i + "']").addClass("selected");
        }
        this.count = this.list.length;
        this.updateCount();
    },

    unCheckAll: function unCheckAll() {
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].checked = false;
            this.list[i].marker.setIcon("./assets/pin-map-off.svg");
            $(".spotBox[idx='" + i + "']").removeClass("selected");
        }
        this.count = 0;
        this.updateCount();
    },

    sort: function sort(std) {
        this.inf.sort(function (a, b) {
            return a[std] < b[std] ? -1 : a[std] > b[std] ? 1 : 0;
        });
        this.inflate();
    },

    metroTest: function metroTest(metro) {

        for (var j = 0; j < 58; j++) {
            var atCoor = this.list[j].coor;
            this.list[j].metro = [];

            for (var i = 0; i < 473; i++) {
                var metroName = metro[i][0];
                var latDif = Math.pow((atCoor.lat - metro[i][1][1]) * 111034, 2);
                var lngDif = Math.pow((atCoor.lng - metro[i][1][0]) * 85397, 2);
                var dif = Math.round(Math.sqrt(latDif + lngDif));

                if (dif < 500) {
                    for (var k = 0; k < metro[i][2].length; k++) {
                        if (metro[i][2][k].length > 2) {
                            metro[i][2].splice(k, 1);
                        }
                    }
                    console.log(this.list[j].name + " 관광지는 " + metroName + " 지하철역에서 " + dif + "m 떨어져있다. - " + metro[i][2] + "호선");

                    this.list[j].metro.push({
                        name: metroName,
                        distance: dif,
                        line: metro[i][2]
                    });
                }
            }
            if (this.list[j].metro.length < 1) {
                console.log(this.list[j].name + " 관광지는 가까운 지하철역이 없다.");
            }

            //아래는 파이어베이스에 메트로 정보를 업데이트하기위한 그런거
            // firebase.database().ref("ny/spots/"+j+"/metro").set(this.list[j].metro);
        }
    }
};

exports.default = Spots;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Hotels = {

    conv: function conv(db) {
        var grocery = db.local.grocery;
        var min = 0;

        for (var no in db.hotel) {
            var hotel = db.hotel[no];
            var m150 = 0;
            hotel.grocery = [];

            for (var i = 0; i < grocery.length; i++) {
                var latDif = Math.pow((hotel.coor.lat - grocery[i].lat) * 111034, 2);
                var lngDif = Math.pow((hotel.coor.lng - grocery[i].lng) * 85397, 2);
                var dif = Math.round(Math.sqrt(latDif + lngDif));

                if (dif < 150) {
                    m150++;
                }
                hotel.grocery.push(dif);
            }
            hotel.grocery.sort(function (a, b) {
                return a - b;
            });
            hotel.gro = { nearest: hotel.grocery[0], within: m150 };

            //firebase.database().ref("ny/hotel/"+no+"/local/grocery").set(hotel.gro)
        }
        console.log(db.hotel);
    },

    metro: function metro(db) {
        var metro = db.metro;
        for (var no in db.hotel) {
            var hotel = db.hotel[no];
            hotel.metro = [];

            for (var i = 0; i < 473; i++) {
                var metroName = metro[i][0];
                var latDif = Math.pow((hotel.coor.lat - metro[i][1][1]) * 111034, 2);
                var lngDif = Math.pow((hotel.coor.lng - metro[i][1][0]) * 85397, 2);
                var dif = Math.round(Math.sqrt(latDif + lngDif));

                if (dif < 500) {
                    for (var k = 0; k < metro[i][2].length; k++) {
                        if (metro[i][2][k].length > 2) {
                            metro[i][2].splice(k, 1);
                        }
                    }
                    console.log(hotel.name.ko + " 호텔은 " + metroName + " 지하철역에서 " + dif + "m 떨어져있다. - " + metro[i][2] + "호선");

                    hotel.metro.push({
                        name: metroName,
                        distance: dif,
                        line: metro[i][2]
                    });
                }
            }
            //메트로정보 업데이트
            //firebase.database().ref("ny/hotel/"+no+"/metro").set(hotel.metro);
        }
    }
};

exports.default = Hotels;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmY3NDJlYjg5ZDkxNWRkMmI0OWIiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvYXBwLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvc3BvdHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9ob3RlbHMuanMiXSwibmFtZXMiOlsiZGIiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwicmVmIiwib25jZSIsInNuYXAiLCJ2YWwiLCJpbml0Iiwic3BvdHMiLCIkIiwib24iLCJjaGVja2VkIiwiYXR0ciIsIm1vdXNlT3ZlciIsIm1vdXNlT3V0IiwiY2xpY2siLCJjaGVja0FsbCIsInVuQ2hlY2tBbGwiLCJzb3J0IiwiU3BvdHMiLCJsaXN0IiwiaW5mIiwiY291bnQiLCJzaG93QWxsIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJpIiwibWFya2VyIiwiZ29vZ2xlIiwibWFwcyIsIk1hcmtlciIsInBvc2l0aW9uIiwiY29vciIsIm1hcCIsImljb24iLCJyYW5rIiwiY3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJpbmZvd2luZG93IiwiSW5mb1dpbmRvdyIsImNvbnRlbnQiLCJhZGRMaXN0ZW5lciIsIm9wZW4iLCJjbG9zZSIsInRoYXQiLCJwdXNoIiwibGVuZ3RoIiwiaW5mbGF0ZSIsImljb25XZWxsIiwic2l6ZSIsImhpIiwidHh0IiwiaW5mbyIsInVwZGF0ZUNvdW50IiwiaHRtbCIsInNldEljb24iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwic2V0QW5pbWF0aW9uIiwiQW5pbWF0aW9uIiwiQk9VTkNFIiwic3RkIiwiYSIsImIiLCJtZXRyb1Rlc3QiLCJtZXRybyIsImoiLCJhdENvb3IiLCJtZXRyb05hbWUiLCJsYXREaWYiLCJNYXRoIiwicG93IiwibGF0IiwibG5nRGlmIiwibG5nIiwiZGlmIiwicm91bmQiLCJzcXJ0IiwiayIsInNwbGljZSIsImRpc3RhbmNlIiwibGluZSIsIkhvdGVscyIsImNvbnYiLCJncm9jZXJ5IiwibG9jYWwiLCJtaW4iLCJubyIsImhvdGVsIiwibTE1MCIsImdybyIsIm5lYXJlc3QiLCJ3aXRoaW4iLCJrbyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLEtBQUssRUFBVDs7QUFFQUMsU0FBU0MsUUFBVCxHQUFvQkMsR0FBcEIsQ0FBd0IsSUFBeEIsRUFBOEJDLElBQTlCLENBQW1DLE9BQW5DLEVBQTRDLGdCQUFRO0FBQ2hESixTQUFLSyxLQUFLQyxHQUFMLEVBQUw7QUFDQSxvQkFBTUMsSUFBTixDQUFXUCxHQUFHUSxLQUFkO0FBQ0E7QUFDQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFSCxDQS9ERDs7QUFp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QWlCO0FBQ2JULDhCQUFNZ0MsU0FETztBQUViWSxrQ0FBVUwsR0FGRztBQUdiTSw4QkFBTWhCLE1BQU14QyxDQUFOLEVBQVMsQ0FBVDtBQUhPLHFCQUFqQjtBQUtIO0FBQ0o7QUFDRDtBQUNBO0FBQ0g7QUFDSjtBQTNEUSxDQUFiOztrQkE4RGV5RCxNIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJmNzQyZWI4OWQ5MTVkZDJiNDliIiwiaW1wb3J0IFNwb3RzIGZyb20gXCIuL21vZHVsZXMvc3BvdHMuanNcIjtcclxuaW1wb3J0IEhvdGVscyBmcm9tIFwiLi9tb2R1bGVzL2hvdGVscy5qc1wiXHJcblxyXG5sZXQgZGIgPSB7fVxyXG5cclxuZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJueVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICBkYiA9IHNuYXAudmFsKCk7XHJcbiAgICBTcG90cy5pbml0KGRiLnNwb3RzKTtcclxuICAgIC8vSG90ZWxzLmNvbnYoZGIpO1xyXG4gICAgLy9Ib3RlbHMubWV0cm8oZGIpO1xyXG5cclxuXHJcblxyXG4gICAgLy8gbGV0IGFkZFNwb3QgPSBbNDAuNzE1NjM2OCwgLTczLjk5ODUxNTNdO1xyXG4gICAgLy8gbGV0IG1ldHJvSW5mbyA9IFtdXHJcbiAgICAvL1xyXG4gICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCA0NzQ7IGkrKykge1xyXG4gICAgLy8gICAgIGxldCBtZXRyb05hbWUgPSBkYi5tZXRyb1tpXVswXTtcclxuICAgIC8vICAgICBsZXQgbGF0RGlmID0gTWF0aC5wb3coKGFkZFNwb3RbMF0gLSBkYi5tZXRyb1tpXVsxXVsxXSkqMTExMDM0LDIpO1xyXG4gICAgLy8gICAgIGxldCBsbmdEaWYgPSBNYXRoLnBvdygoYWRkU3BvdFsxXSAtIGRiLm1ldHJvW2ldWzFdWzBdKSAqIDg1Mzk3LCAyKTtcclxuICAgIC8vICAgICBsZXQgZGlmID0gTWF0aC5yb3VuZChNYXRoLnNxcnQobGF0RGlmK2xuZ0RpZikpXHJcbiAgICAvL1xyXG4gICAgLy8gICAgIGlmKGRpZjw1MDApe1xyXG4gICAgLy8gICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGRiLm1ldHJvW2ldWzJdLmxlbmd0aDsgaysrKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAoZGIubWV0cm9baV1bMl1ba10ubGVuZ3RoID4gMil7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgZGIubWV0cm9baV1bMl0uc3BsaWNlKGssMSlcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIu2ZleyduO2VmOugpOuKlCDqtIDqtJHsp4DripQgXCIgKyBtZXRyb05hbWUgKyBcIiDsp4DtlZjssqDsl63sl5DshJwgXCIgKyBkaWYgKyBcIm0g65ao7Ja07KC47J6I64ukLiAtIFwiICsgZGIubWV0cm9baV1bMl0gKyBcIu2YuOyEoFwiKTtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coaSlcclxuICAgIC8vICAgICAgICAgbWV0cm9JbmZvLnB1c2goe1xyXG4gICAgLy8gICAgICAgICAgICAgbmFtZTogbWV0cm9OYW1lLFxyXG4gICAgLy8gICAgICAgICAgICAgZGlzdGFuY2U6IGRpZixcclxuICAgIC8vICAgICAgICAgICAgIGxpbmU6IGRiLm1ldHJvW2ldWzJdXHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgLy8gLy/slYTrnpjripQg7YyM7J207Ja067Kg7J207Iqk7JeQIOuplO2KuOuhnCDsoJXrs7Trpbwg7JeF642w7J207Yq47ZWY6riw7JyE7ZWcIOq3uOufsOqxsFxyXG4gICAgLy8gLy9maXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcIm55L3Nwb3RzL1wiK2orXCIvbWV0cm9cIikuc2V0KGRiLnNwb3RzW2pdLm1ldHJvKTtcclxuICAgIC8vXHJcbiAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IGRiLnNwb3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAvLyAgICAgaWYoIWRiLnNwb3RzW2ldLm1ldHJvKXtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZGIuc3BvdHNbaV0pXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuXHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coZGIpXHJcbiAgICAvLyBsZXQgbGluZUFycmF5ID0gW11cclxuICAgIC8vIGxldCBwb3B1bGFyTGluZSA9IHt9XHJcbiAgICAvLyBmb3IgKHZhciBrID0gMDsgayA8IGRiLnNwb3RzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coZGIuc3BvdHNba10pXHJcbiAgICAvLyAgICAgLy/tmITsnqzripQg6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqDsl63snbQg7J6F66ClIOyViCDrkJwg6rK97Jqw6rCAIOyeiOydjFxyXG4gICAgLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGIuc3BvdHNba10ubWV0cm8ubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkYi5zcG90c1trXS5tZXRyb1tpXS5saW5lLmxlbmd0aDsgaisrKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbGluZU5hbWUgPSBkYi5zcG90c1trXS5tZXRyb1tpXS5saW5lW2pdXHJcbiAgICAvLyAgICAgICAgICAgICBpZihsaW5lQXJyYXkuaW5jbHVkZXMobGluZU5hbWUpKXtcclxuICAgIC8vICAgICAgICAgICAgICAgICBwb3B1bGFyTGluZVtsaW5lTmFtZV0rK1xyXG4gICAgLy8gICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGluZUFycmF5LnB1c2gobGluZU5hbWUpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHBvcHVsYXJMaW5lW2xpbmVOYW1lXSA9IDFcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIC8vIGNvbnNvbGUubG9nKHBvcHVsYXJMaW5lKVxyXG5cclxufSlcclxuXHJcbiQoXCIuc3BvdHNcIikub24oXCJjbGlja1wiLCBcIi5zcG90Qm94XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBTcG90cy5jaGVja2VkKCQodGhpcykuYXR0cihcImlkeFwiKSk7XHJcbn0pXHJcbiQoXCIuc3BvdHNcIikub24oXCJtb3VzZW92ZXJcIiwgXCIuc3BvdEJveFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBTcG90cy5tb3VzZU92ZXIoJCh0aGlzKS5hdHRyKFwiaWR4XCIpKTtcclxufSlcclxuJChcIi5zcG90c1wiKS5vbihcIm1vdXNlb3V0XCIsIFwiLnNwb3RCb3hcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgU3BvdHMubW91c2VPdXQoJCh0aGlzKS5hdHRyKFwiaWR4XCIpKTtcclxufSlcclxuJChcIi5hYl9zZWxlY3RcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIFNwb3RzLmNoZWNrQWxsKCk7XHJcbn0pXHJcbiQoXCIuYWJfdW5TZWxlY3RcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgU3BvdHMudW5DaGVja0FsbCgpO1xyXG59KVxyXG4kKFwiLm9iX3JhbmtcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIFNwb3RzLnNvcnQoXCJyYW5rXCIpXHJcbn0pXHJcbiQoXCIub2JfbmFtZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBTcG90cy5zb3J0KFwibmFtZVwiKVxyXG59KVxyXG5cclxuLy8gbGV0IGhpID0ge1xyXG4vLyAgICAgXCJjcml0ZXJpYVwiOiB7XHJcbi8vICAgICAgICAgXCJjaXR5SWRcIjogOTM5NSxcclxuLy8gICAgICAgICBcImFyZWFcIjoge1xyXG4vLyAgICAgICAgICAgICBcImlkXCI6IDAsXHJcbi8vICAgICAgICAgICAgIFwiY2l0eUlkXCI6IDBcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIFwibGFuZG1hcmtJZFwiOiAwLFxyXG4vLyAgICAgICAgIFwiY2hlY2tJbkRhdGVcIjogXCIyMDE3LTA5LTAyXCIsXHJcbi8vICAgICAgICAgXCJjaGVja091dERhdGVcIjogXCIyMDE3LTA5LTAzXCIsXHJcbi8vICAgICAgICAgXCJhZGRpdGlvbmFsXCI6IHtcclxuLy8gICAgICAgICAgICAgXCJsYW5ndWFnZVwiOiBcImVuLXVzXCIsXHJcbi8vICAgICAgICAgICAgIFwic29ydEJ5XCI6IFwiUHJpY2VBc2NcIixcclxuLy8gICAgICAgICAgICAgXCJtYXhSZXN1bHRcIjogMTAsXHJcbi8vICAgICAgICAgICAgIFwiZGlzY291bnRPbmx5XCI6IGZhbHNlLFxyXG4vLyAgICAgICAgICAgICBcIm1pbmltdW1TdGFyUmF0aW5nXCI6IDAsXHJcbi8vICAgICAgICAgICAgIFwibWluaW11bVJldmlld1Njb3JlXCI6IDAsXHJcbi8vICAgICAgICAgICAgIFwiZGFpbHlSYXRlXCI6IHtcclxuLy8gICAgICAgICAgICAgICAgIFwibWluaW11bVwiOiAxLFxyXG4vLyAgICAgICAgICAgICAgICAgXCJtYXhpbXVtXCI6IDEwMFxyXG4vLyAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICBcIm9jY3VwYW5jeVwiOiB7XHJcbi8vICAgICAgICAgICAgICAgICBcIm51bWJlck9mQWR1bHRcIjogMixcclxuLy8gICAgICAgICAgICAgICAgIFwibnVtYmVyT2ZDaGlsZHJlblwiOiAxXHJcbi8vICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgIFwiY3VycmVuY3lcIjogXCJVU0RcIlxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuLy8gJC5hamF4KHtcclxuLy8gICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4vLyAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICdBdXRob3JpemF0aW9uJzogJzE3OTk4OTg6NzljOTQ1NWMtMDY0OS00MDJiLWE1ZGEtNTY1ZDhmYWFkMTdlJ1xyXG4vLyAgICAgfSxcclxuLy8gICAgIHVybDogJ2h0dHA6Ly9hZmZpbGlhdGVhcGk3NjQzLmFnb2RhLmNvbS9hZmZpbGlhdGVzZXJ2aWNlJyxcclxuLy8gICAgIGRhdGE6SlNPTi5zdHJpbmdpZnkoaGkpLFxyXG4vLyAgICAgY29udGVudFR5cGU6J2FwcGxpY2F0aW9uL2pzb24nLFxyXG4vLyAgICAgZGF0YVR5cGU6J2pzb24nLFxyXG4vLyAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuLy8gICAgIH1cclxuXHJcbi8vIH0pXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL2FwcC5qcyIsImxldCBTcG90cyA9IHtcclxuICAgIGxpc3Q6IFtdLFxyXG4gICAgaW5mOltdLFxyXG4gICAgY291bnQ6IDAsICAvL+uqhyDqsJwg7ISg7YOd65CY7JeI64qU7KeAIOy5tOyatO2KuFxyXG4gICAgc2hvd0FsbDp0cnVlLCAvL2ZhbHNl7J246rK97JqwIOyytO2BrOuQnCDqsoPrp4wg67O06riwXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZGF0YVtpXS5jaGVja2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGRhdGFbaV0ubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogZGF0YVtpXS5jb29yLFxyXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgICAgICAgICBpY29uOlwiLi9hc3NldHMvcGluLW1hcC1vbi5zdmdcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCByYW5rID0gZGF0YVtpXS5yYW5rICsgMTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdCA9ICc8ZGl2IGNsYXNzPVwiaW5mb3dpbmRvd1wiPjxkaXYgY2xhc3M9XCJpbmZvSW1hZ2UgbnlfJytpKydcIj48L2Rpdj4nXHJcbiAgICAgICAgICAgIGN0ICs9ICc8cCBjbGFzcz1cImluZm9UaXRsZVwiPicrIHJhbmsgKyBcIiBcIiArIGRhdGFbaV0ubmFtZSArICc8L3A+PHAgY2xhc3M9XCJpbmZvRGVzY1wiPicgKyBkYXRhW2ldLmRlc2NyaXB0aW9uICsgJzwvcD48L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICBkYXRhW2ldLmluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBjdFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgZGF0YVtpXS5tYXJrZXIuYWRkTGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbaV0uaW5mb3dpbmRvdy5vcGVuKG1hcCwgZGF0YVtpXS5tYXJrZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGRhdGFbaV0ubWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbaV0uaW5mb3dpbmRvdy5jbG9zZShtYXAsIGRhdGFbaV0ubWFya2VyKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGRhdGFbaV0ubWFya2VyLmFkZExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2hlY2tlZChpKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKGRhdGFbaV0pO1xyXG4gICAgICAgICAgICB0aGlzLmluZi5wdXNoKGRhdGFbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50ID0gZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5pbmZsYXRlKCk7XHJcbiAgICAgICAgdGhpcy5pY29uV2VsbCgzKVxyXG4gICAgfSxcclxuXHJcbiAgICBpY29uV2VsbDogZnVuY3Rpb24oc2l6ZSl7XHJcbiAgICAgICAgbGV0IGhpID0gc2l6ZVxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBpZihoaT4xOCl7XHJcbiAgICAgICAgICAgIGhpID0gMztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaGkrPTE7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0eHQgPSBcIlwiXHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd0FsbCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZm8gPSB0aGlzLmluZltpXTtcclxuICAgICAgICAgICAgICAgIGxldCByYW5rID0gKGluZm8ucmFuaysxKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5saXN0W2luZm8ucmFua10uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cInNwb3RCb3ggc2VsZWN0ZWRcIiBpZHg9JytpbmZvLnJhbmsrJz48ZGl2IGNsYXNzPVwicGluRGl2XCI+PHNwYW4gY2xhc3M9XCJwaW5jZW50ZXJcIj48L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHNwYW4gY2xhc3M9XCJwaW5cIj48L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cImluZm9cIj48cCBjbGFzcz1cInJhbmtcIj4nK3JhbmsrJ+ychDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cIm5hbWVfa28ga29cIj4nK2luZm8ubmFtZSsnPC9wPjxwIGNsYXNzPVwibmFtZV9lblwiPicraW5mby5uYW1lKyc8L3A+PC9kaXY+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwic3BvdEJveFwiIGlkeD0nK2luZm8ucmFuaysnPjxkaXYgY2xhc3M9XCJwaW5EaXZcIj48c3BhbiBjbGFzcz1cInBpbmNlbnRlclwiPjwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8c3BhbiBjbGFzcz1cInBpblwiPjwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwiaW5mb1wiPjxwIGNsYXNzPVwicmFua1wiPicrcmFuaysn7JyEPC9wPidcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibmFtZV9rbyBrb1wiPicraW5mby5uYW1lKyc8L3A+PHAgY2xhc3M9XCJuYW1lX2VuXCI+JytpbmZvLm5hbWUrJzwvcD48L2Rpdj48L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb3VudCgpO1xyXG4gICAgICAgICQoXCIuc3BvdHNcIikuaHRtbCh0eHQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja2VkOiBmdW5jdGlvbihpKXtcclxuICAgICAgICBpZih0aGlzLmxpc3RbaV0uY2hlY2tlZCl7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS5tYXJrZXIuc2V0SWNvbihcIi4vYXNzZXRzL3Bpbi1tYXAtb2ZmLnN2Z1wiKTtcclxuICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50LS1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5saXN0W2ldLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0ubWFya2VyLnNldEljb24oXCIuL2Fzc2V0cy9waW4tbWFwLW9uLnN2Z1wiKTtcclxuICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50KytcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb3VudCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBtb3VzZU92ZXI6IGZ1bmN0aW9uKGkpe1xyXG4gICAgICAgIHRoaXMubGlzdFtpXS5pbmZvd2luZG93Lm9wZW4obWFwLCB0aGlzLmxpc3RbaV0ubWFya2VyKTtcclxuICAgICAgICB0aGlzLmxpc3RbaV0ubWFya2VyLnNldEFuaW1hdGlvbihnb29nbGUubWFwcy5BbmltYXRpb24uQk9VTkNFKTtcclxuICAgIH0sXHJcblxyXG4gICAgbW91c2VPdXQ6IGZ1bmN0aW9uIChpKXtcclxuICAgICAgICB0aGlzLmxpc3RbaV0uaW5mb3dpbmRvdy5jbG9zZShtYXAsIHRoaXMubGlzdFtpXS5tYXJrZXIpXHJcbiAgICAgICAgdGhpcy5saXN0W2ldLm1hcmtlci5zZXRBbmltYXRpb24obnVsbCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUNvdW50OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoXCJsYWJlbFtmb3I9J3JlY29fNCddXCIpLmh0bWwoXCI8c3Bhbj48L3NwYW4+6rSA6rSR7KeAIOygkeq3vOyEsSAtIOyEoO2DneuQnCBcIisgdGhpcy5jb3VudCArXCLqsJwg6rSA6rSR7KeAXCIpXHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrQWxsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5saXN0W2ldLm1hcmtlci5zZXRJY29uKFwiLi9hc3NldHMvcGluLW1hcC1vbi5zdmdcIik7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS5pbmZvd2luZG93LmNsb3NlKG1hcCwgdGhpcy5saXN0W2ldLm1hcmtlcik7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IHRoaXMubGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb3VudCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1bkNoZWNrQWxsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS5tYXJrZXIuc2V0SWNvbihcIi4vYXNzZXRzL3Bpbi1tYXAtb2ZmLnN2Z1wiKTtcclxuICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNvcnQ6IGZ1bmN0aW9uKHN0ZCl7XHJcbiAgICAgICAgdGhpcy5pbmYuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYVtzdGRdIDwgYltzdGRdID8gLTEgOiBhW3N0ZF0gPiBiW3N0ZF0gPyAxIDogMDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgbWV0cm9UZXN0OiBmdW5jdGlvbihtZXRybyl7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNTg7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgYXRDb29yID0gdGhpcy5saXN0W2pdLmNvb3I7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtqXS5tZXRybyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0NzM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldHJvTmFtZSA9IG1ldHJvW2ldWzBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhdERpZiA9IE1hdGgucG93KChhdENvb3IubGF0IC0gbWV0cm9baV1bMV1bMV0pKjExMTAzNCwyKTtcclxuICAgICAgICAgICAgICAgIGxldCBsbmdEaWYgPSBNYXRoLnBvdygoYXRDb29yLmxuZyAtIG1ldHJvW2ldWzFdWzBdKSAqIDg1Mzk3LCAyKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSBNYXRoLnJvdW5kKE1hdGguc3FydChsYXREaWYrbG5nRGlmKSlcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkaWY8NTAwKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1ldHJvW2ldWzJdLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRyb1tpXVsyXVtrXS5sZW5ndGggPiAyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvW2ldWzJdLnNwbGljZShrLDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5saXN0W2pdLm5hbWUgKyBcIiDqtIDqtJHsp4DripQgXCIgKyBtZXRyb05hbWUgKyBcIiDsp4DtlZjssqDsl63sl5DshJwgXCIgKyBkaWYgKyBcIm0g65ao7Ja07KC47J6I64ukLiAtIFwiICsgbWV0cm9baV1bMl0gKyBcIu2YuOyEoFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0W2pdLm1ldHJvLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyb05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IG1ldHJvW2ldWzJdXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmxpc3Rbal0ubWV0cm8ubGVuZ3RoPDEpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5saXN0W2pdLm5hbWUgKyBcIiDqtIDqtJHsp4DripQg6rCA6rmM7Jq0IOyngO2VmOyyoOyXreydtCDsl4bri6QuXCIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v7JWE656Y64qUIO2MjOydtOyWtOuyoOydtOyKpOyXkCDrqZTtirjroZwg7KCV67O066W8IOyXheuNsOydtO2KuO2VmOq4sOychO2VnCDqt7jrn7DqsbBcclxuICAgICAgICAgICAgLy8gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJueS9zcG90cy9cIitqK1wiL21ldHJvXCIpLnNldCh0aGlzLmxpc3Rbal0ubWV0cm8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwb3RzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL3Nwb3RzLmpzIiwibGV0IEhvdGVscyA9IHtcclxuXHJcbiAgICBjb252OiBmdW5jdGlvbihkYil7XHJcbiAgICAgICAgbGV0IGdyb2NlcnkgPSBkYi5sb2NhbC5ncm9jZXJ5O1xyXG4gICAgICAgIGxldCBtaW4gPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBubyBpbiBkYi5ob3RlbCkge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSBkYi5ob3RlbFtub107XHJcbiAgICAgICAgICAgIGxldCBtMTUwID0gMDtcclxuICAgICAgICAgICAgaG90ZWwuZ3JvY2VyeSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm9jZXJ5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGF0RGlmID0gTWF0aC5wb3coKGhvdGVsLmNvb3IubGF0IC0gZ3JvY2VyeVtpXS5sYXQpKjExMTAzNCwyKTtcclxuICAgICAgICAgICAgICAgIGxldCBsbmdEaWYgPSBNYXRoLnBvdygoaG90ZWwuY29vci5sbmcgLSBncm9jZXJ5W2ldLmxuZykgKiA4NTM5NywgMik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gTWF0aC5yb3VuZChNYXRoLnNxcnQobGF0RGlmK2xuZ0RpZikpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGlmPDE1MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbTE1MCsrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBob3RlbC5ncm9jZXJ5LnB1c2goZGlmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBob3RlbC5ncm9jZXJ5LnNvcnQoZnVuY3Rpb24oYSwgYil7cmV0dXJuIGEtYn0pO1xyXG4gICAgICAgICAgICBob3RlbC5ncm8gPSB7bmVhcmVzdDpob3RlbC5ncm9jZXJ5WzBdLHdpdGhpbjptMTUwfTtcclxuXHJcbiAgICAgICAgICAgIC8vZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJueS9ob3RlbC9cIitubytcIi9sb2NhbC9ncm9jZXJ5XCIpLnNldChob3RlbC5ncm8pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGRiLmhvdGVsKTtcclxuICAgIH0sXHJcblxyXG4gICAgbWV0cm86IGZ1bmN0aW9uKGRiKXtcclxuICAgICAgICBsZXQgbWV0cm8gPSBkYi5tZXRyb1xyXG4gICAgICAgIGZvciAobGV0IG5vIGluIGRiLmhvdGVsKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IGRiLmhvdGVsW25vXTtcclxuICAgICAgICAgICAgaG90ZWwubWV0cm8gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDczOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRyb05hbWUgPSBtZXRyb1tpXVswXTtcclxuICAgICAgICAgICAgICAgIGxldCBsYXREaWYgPSBNYXRoLnBvdygoaG90ZWwuY29vci5sYXQgLSBtZXRyb1tpXVsxXVsxXSkqMTExMDM0LDIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxuZ0RpZiA9IE1hdGgucG93KChob3RlbC5jb29yLmxuZyAtIG1ldHJvW2ldWzFdWzBdKSAqIDg1Mzk3LCAyKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSBNYXRoLnJvdW5kKE1hdGguc3FydChsYXREaWYrbG5nRGlmKSlcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkaWY8NTAwKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1ldHJvW2ldWzJdLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRyb1tpXVsyXVtrXS5sZW5ndGggPiAyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvW2ldWzJdLnNwbGljZShrLDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaG90ZWwubmFtZS5rbyArIFwiIO2YuO2FlOydgCBcIiArIG1ldHJvTmFtZSArIFwiIOyngO2VmOyyoOyXreyXkOyEnCBcIiArIGRpZiArIFwibSDrlqjslrTsoLjsnojri6QuIC0gXCIgKyBtZXRyb1tpXVsyXSArIFwi7Zi47ISgXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5tZXRyby5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbWV0cm9OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTogZGlmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiBtZXRyb1tpXVsyXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/rqZTtirjroZzsoJXrs7Qg7JeF642w7J207Yq4XHJcbiAgICAgICAgICAgIC8vZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJueS9ob3RlbC9cIitubytcIi9tZXRyb1wiKS5zZXQoaG90ZWwubWV0cm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSG90ZWxzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2hvdGVscy5qcyJdLCJzb3VyY2VSb290IjoiIn0=