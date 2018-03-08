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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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

        var _loop = function _loop(i) {
            data[i].checked = true;

            data[i].marker = new google.maps.Marker({
                position: data[i].coor,
                map: map,
                icon: './assets/pin-map.png'
            });
            var rank = 0;
            if (data[i].rank < 9) {
                rank = "0" + (data[i].rank + 1);
            } else {
                rank += data[i].rank + 1;
            }
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
    },

    hotelTest: function hotelTest(data) {
        for (var i = 0; i < 15; i++) {
            var mk = new google.maps.Marker({
                position: data[i],
                map: map,
                icon: './assets/pin-map.png'
            });
        }
    },

    inflate: function inflate() {
        var txt = "";
        if (this.showAll) {
            for (var i = 0; i < this.list.length; i++) {
                var info = this.inf[i];
                var _rank = 0;
                if (info.rank < 9) {
                    _rank = "0" + (info.rank + 1);
                } else {
                    _rank += info.rank + 1;
                }
                if (this.list[info.rank].checked) {
                    txt += '<div class="ib_box" idx=' + info.rank + '><span class="ib_pin"></span>';
                    txt += '<p class="ib_rank">' + _rank + '</p><p class="ib_name">' + info.name + '</p></div>';
                } else {
                    txt += '<div class="ib_box unSelected" idx=' + info.rank + '><span class="ib_pin"></span>';
                    txt += '<p class="ib_rank">' + _rank + '</p><p class="ib_name">' + info.name + '</p></div>';
                }
            }
        }
        this.updateCount();
        $(".selector_infoBox").html(txt);
    },

    checked: function checked(i) {
        if (this.list[i].checked) {
            this.list[i].checked = false;
            this.list[i].marker.setIcon("./assets/pin-map-off.png");
            $(".ib_box[idx='" + i + "']").addClass("unSelected");
            this.count--;
        } else {
            this.list[i].checked = true;
            this.list[i].marker.setIcon("./assets/pin-map.png");
            $(".ib_box[idx='" + i + "']").removeClass("unSelected");
            this.count++;
        }
        this.updateCount();
    },

    mouseOver: function mouseOver(i) {
        this.list[i].infowindow.open(map, this.list[i].marker);
    },

    mouseOut: function mouseOut(i) {
        this.list[i].infowindow.close(map, this.list[i].marker);
    },

    updateCount: function updateCount() {
        $("label[for='reco_4']").html("<span></span>관광지 접근성 - 선택된 " + this.count + "개 관광지");
    },

    checkAll: function checkAll() {
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].checked = true;
            this.list[i].marker.setIcon("./assets/pin-map.png");
            this.list[i].infowindow.close(map, this.list[i].marker);
            $(".ib_box[idx='" + i + "']").removeClass("unSelected");
        }
        this.count = this.list.length;
        this.updateCount();
    },

    unCheckAll: function unCheckAll() {
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].checked = false;
            this.list[i].marker.setIcon("./assets/pin-map-off.png");
            $(".ib_box[idx='" + i + "']").addClass("unSelected");
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
        console.log(this.list);

        for (var j = 0; j < 58; j++) {
            var atCoor = this.list[j].coor;
            this.list[j].metro = false;

            for (var i = 0; i < 473; i++) {
                var metroName = metro[i][0];
                var latDif = Math.pow((atCoor.lat - metro[i][1][1]) * 111034, 2);
                var lngDif = Math.pow((atCoor.lng - metro[i][1][0]) * 85397, 2);
                var dif = Math.sqrt(latDif + lngDif);

                if (dif < 500) {
                    console.log(this.list[j].name + " 관광지는 " + metroName + " 지하철역에서 " + dif + "m 떨어져있다.");
                    this.list[j].metro = true;
                }
                // console.log(( ((atCoor.lat - metro[i][1][1]) * 111000) ^ 2 + ((atCoor.lng - metro[i][1][0]) * 85000) ^ 2))
            }
            if (!this.list[j].metro) {
                console.log(this.list[j].name + " 관광지는 가까운 지하철역이 없다.");
            }
        }
    }
};

exports.default = Spots;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _spots = __webpack_require__(0);

var _spots2 = _interopRequireDefault(_spots);

var _area = __webpack_require__(2);

var _area2 = _interopRequireDefault(_area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = {};

firebase.database().ref("ny").once("value", function (snap) {
    db = snap.val();
    console.log(db);
    _area2.default.init(db.areas.agoda);
    _spots2.default.init(db.spots);
    _area2.default.calculate();
    _spots2.default.hotelTest(db.tests);
    _spots2.default.metroTest(db.metro);
});

$(".selector_infoBox").on("click", ".ib_box", function () {
    _spots2.default.checked($(this).attr("idx"));
    _area2.default.calculate();
});
$(".selector_infoBox").on("mouseover", ".ib_box", function () {
    _spots2.default.mouseOver($(this).attr("idx"));
});
$(".selector_infoBox").on("mouseout", ".ib_box", function () {
    _spots2.default.mouseOut($(this).attr("idx"));
});
$(".reco_filter_checkBoxDiv>input").change(function () {
    _area2.default.calculate();
});
$(".ab_select").click(function () {
    _spots2.default.checkAll();
    _area2.default.calculate();
});
$(".ab_unSelect").click(function () {
    _spots2.default.unCheckAll();
    _area2.default.calculate();
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _spots = __webpack_require__(0);

var _spots2 = _interopRequireDefault(_spots);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Area = {
    list: [],
    colorSet: ["#f15721", "#fc961a", "#f2c939", "#b9c242", "#5c9850", "#10825d", "#11abca", "#4783f5", "#9a1c48", "#7c3893", "#3f5ca8", "#795547"],

    init: function init(data) {
        for (var i = 0; i < data.length; i++) {
            data[i].polygon = new google.maps.Polygon({
                paths: data[i].coor,
                fillColor: this.colorSet[i],
                fillOpacity: 0.2,
                strokeWeight: 1.2,
                strokeColor: this.colorSet[i]
            });

            this.list.push(data[i]);
        }
    },

    calculate: function calculate() {
        var standards = [false, false, false, false, false];
        for (var i = 0; i < 5; i++) {
            if ($("#reco_" + i).is(":checked")) {
                standards[i] = true;
            }
        }

        for (var _i = 0; _i < this.list.length; _i++) {
            //관광지 점수를 초기화한다.
            this.list[_i].score[4] = 0;
        }

        for (var _i2 = 0; _i2 < _spots2.default.list.length; _i2++) {
            if (_spots2.default.list[_i2].checked) {
                if (typeof _spots2.default.list[_i2].area === 'number') {
                    this.list[_spots2.default.list[_i2].area].score[4] += 1.1;
                } else {
                    for (var j = 0; j < _spots2.default.list[_i2].area.length; j++) {
                        if (typeof _spots2.default.list[_i2].area[j] === 'number') {
                            this.list[_spots2.default.list[_i2].area[j]].score[4] += 1.1;
                        }
                    }
                }
            }
        }

        var scoreSumArray = [];

        for (var _i3 = 0; _i3 < this.list.length; _i3++) {
            var scoreSum = 0;
            if (standards[0]) {
                //0번째 요소는 공항평점 - 일단 0번째로 고정(jfk임)
                scoreSum += this.list[_i3].score[0][0];
            }
            for (var _j = 1; _j < 5; _j++) {
                if (standards[_j]) {
                    scoreSum += this.list[_i3].score[_j];
                }
            }
            scoreSumArray.push({ areaNo: _i3, score: scoreSum });
        }

        scoreSumArray.sort(function (a, b) {
            return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
        });
        this.result([scoreSumArray[0].areaNo, scoreSumArray[1].areaNo, scoreSumArray[2].areaNo]);
    },

    result: function result(resultArray) {
        for (var i = 0; i < this.list.length; i++) {
            if (!resultArray.includes(i)) {
                this.list[i].polygon.setMap(null);
            }
        }

        for (var _i4 = 0; _i4 < resultArray.length; _i4++) {
            var url = "https://www.agoda.com/partners/partnersearch.aspx?cid=1799898&pcs=1&hl=ko&city=318&checkIn=2018-03-13&checkOut=2018-03-15&los=2&rooms=1&adults=1&hotelArea=60866";
            this.list[resultArray[_i4]].polygon.setMap(map);
            document.querySelector("#areaName_" + _i4).innerHTML = this.list[resultArray[_i4]].name;
            document.querySelector("#areaBox_" + _i4).style.backgroundColor = this.colorSet[resultArray[_i4]];
            document.querySelector("#areaUrl_" + _i4).setAttribute("href", "");

            var sc = this.list[resultArray[_i4]].score;

            //공항평점. 공항선택 기능 넣으면 배열 두번째 [0]은 해당 선택 idx
            var air = sc[0][0];
            if (air > 4.4) {
                $("#score_" + _i4 + "_0");
            }

            for (var _i5 = 1; _i5 < 5; _i5++) {}
        }
    }
};

exports.default = Area;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTFkNDc3NWIwMGMzN2MwNDA3MDkiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zcG90cy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hcmVhLmpzIl0sIm5hbWVzIjpbIlNwb3RzIiwibGlzdCIsImluZiIsImNvdW50Iiwic2hvd0FsbCIsImluaXQiLCJkYXRhIiwiaSIsImNoZWNrZWQiLCJtYXJrZXIiLCJnb29nbGUiLCJtYXBzIiwiTWFya2VyIiwicG9zaXRpb24iLCJjb29yIiwibWFwIiwiaWNvbiIsInJhbmsiLCJjdCIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImluZm93aW5kb3ciLCJJbmZvV2luZG93IiwiY29udGVudCIsImFkZExpc3RlbmVyIiwib3BlbiIsImNsb3NlIiwidGhhdCIsInB1c2giLCJsZW5ndGgiLCJpbmZsYXRlIiwiaG90ZWxUZXN0IiwibWsiLCJ0eHQiLCJpbmZvIiwidXBkYXRlQ291bnQiLCIkIiwiaHRtbCIsInNldEljb24iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwibW91c2VPdmVyIiwibW91c2VPdXQiLCJjaGVja0FsbCIsInVuQ2hlY2tBbGwiLCJzb3J0Iiwic3RkIiwiYSIsImIiLCJtZXRyb1Rlc3QiLCJtZXRybyIsImNvbnNvbGUiLCJsb2ciLCJqIiwiYXRDb29yIiwibWV0cm9OYW1lIiwibGF0RGlmIiwiTWF0aCIsInBvdyIsImxhdCIsImxuZ0RpZiIsImxuZyIsImRpZiIsInNxcnQiLCJkYiIsImZpcmViYXNlIiwiZGF0YWJhc2UiLCJyZWYiLCJvbmNlIiwic25hcCIsInZhbCIsImFyZWFzIiwiYWdvZGEiLCJzcG90cyIsImNhbGN1bGF0ZSIsInRlc3RzIiwib24iLCJhdHRyIiwiY2hhbmdlIiwiY2xpY2siLCJBcmVhIiwiY29sb3JTZXQiLCJwb2x5Z29uIiwiUG9seWdvbiIsInBhdGhzIiwiZmlsbENvbG9yIiwiZmlsbE9wYWNpdHkiLCJzdHJva2VXZWlnaHQiLCJzdHJva2VDb2xvciIsInN0YW5kYXJkcyIsImlzIiwic2NvcmUiLCJhcmVhIiwic2NvcmVTdW1BcnJheSIsInNjb3JlU3VtIiwiYXJlYU5vIiwicmVzdWx0IiwicmVzdWx0QXJyYXkiLCJpbmNsdWRlcyIsInNldE1hcCIsInVybCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlubmVySFRNTCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwic2V0QXR0cmlidXRlIiwic2MiLCJhaXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdEQSxJQUFJQSxRQUFRO0FBQ1JDLFVBQU0sRUFERTtBQUVSQyxTQUFJLEVBRkk7QUFHUkMsV0FBTyxDQUhDLEVBR0c7QUFDWEMsYUFBUSxJQUpBLEVBSU07O0FBRWRDLFVBQU0sY0FBU0MsSUFBVCxFQUFjO0FBQUE7O0FBQUEsbUNBQ1BDLENBRE87QUFFWkQsaUJBQUtDLENBQUwsRUFBUUMsT0FBUixHQUFrQixJQUFsQjs7QUFFQUYsaUJBQUtDLENBQUwsRUFBUUUsTUFBUixHQUFpQixJQUFJQyxPQUFPQyxJQUFQLENBQVlDLE1BQWhCLENBQXVCO0FBQ3BDQywwQkFBVVAsS0FBS0MsQ0FBTCxFQUFR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R0FBWixDQUFkLENBQWhFO0FBQ0E4RixxQkFBU0MsYUFBVCxDQUF1QixjQUFjL0YsR0FBckMsRUFBd0NtRyxZQUF4QyxDQUFxRCxNQUFyRCxFQUE2RCxFQUE3RDs7QUFFQSxnQkFBSUMsS0FBSyxLQUFLMUcsSUFBTCxDQUFVZ0csWUFBWTFGLEdBQVosQ0FBVixFQUEwQm9GLEtBQW5DOztBQUVBO0FBQ0EsZ0JBQUlpQixNQUFNRCxHQUFHLENBQUgsRUFBTSxDQUFOLENBQVY7QUFDQSxnQkFBR0MsTUFBSSxHQUFQLEVBQVc7QUFDUHhFLGtCQUFFLFlBQVU3QixHQUFWLEdBQVksSUFBZDtBQUNIOztBQUVELGlCQUFLLElBQUlBLE1BQUksQ0FBYixFQUFnQkEsTUFBSSxDQUFwQixFQUF1QkEsS0FBdkIsRUFBNEIsQ0FHM0I7QUFDSjtBQUNKO0FBakdNLENBQVg7O2tCQW9HZXlFLEkiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTFkNDc3NWIwMGMzN2MwNDA3MDkiLCJsZXQgU3BvdHMgPSB7XHJcbiAgICBsaXN0OiBbXSxcclxuICAgIGluZjpbXSxcclxuICAgIGNvdW50OiAwLCAgLy/rqocg6rCcIOyEoO2DneuQmOyXiOuKlOyngCDsubTsmrTtirhcclxuICAgIHNob3dBbGw6dHJ1ZSwgLy9mYWxzZeyduOqyveyasCDssrTtgazrkJwg6rKD66eMIOuztOq4sFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBkYXRhW2ldLmNoZWNrZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgZGF0YVtpXS5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBkYXRhW2ldLmNvb3IsXHJcbiAgICAgICAgICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICAgICAgICAgIGljb246ICcuL2Fzc2V0cy9waW4tbWFwLnBuZydcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCByYW5rID0gMDtcclxuICAgICAgICAgICAgaWYgKGRhdGFbaV0ucmFuayA8IDkpIHtcclxuICAgICAgICAgICAgICAgIHJhbmsgPSBcIjBcIiArIChkYXRhW2ldLnJhbmsgKyAxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJhbmsgKz0gZGF0YVtpXS5yYW5rICsgMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY3QgPSAnPGRpdiBjbGFzcz1cImluZm93aW5kb3dcIj48ZGl2IGNsYXNzPVwiaW5mb0ltYWdlIG55XycraSsnXCI+PC9kaXY+J1xyXG4gICAgICAgICAgICBjdCArPSAnPHAgY2xhc3M9XCJpbmZvVGl0bGVcIj4nKyByYW5rICsgXCIgXCIgKyBkYXRhW2ldLm5hbWUgKyAnPC9wPjxwIGNsYXNzPVwiaW5mb0Rlc2NcIj4nICsgZGF0YVtpXS5kZXNjcmlwdGlvbiArICc8L3A+PC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgZGF0YVtpXS5pbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coe1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogY3RcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGRhdGFbaV0ubWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2ldLmluZm93aW5kb3cub3BlbihtYXAsIGRhdGFbaV0ubWFya2VyKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBkYXRhW2ldLm1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2ldLmluZm93aW5kb3cuY2xvc2UobWFwLCBkYXRhW2ldLm1hcmtlcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBkYXRhW2ldLm1hcmtlci5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNoZWNrZWQoaSlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxpc3QucHVzaChkYXRhW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5pbmYucHVzaChkYXRhW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBob3RlbFRlc3Q6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbWsgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBkYXRhW2ldLFxyXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnLi9hc3NldHMvcGluLW1hcC5wbmcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdHh0ID0gXCJcIlxyXG4gICAgICAgIGlmICh0aGlzLnNob3dBbGwpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbmZvID0gdGhpcy5pbmZbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFuayA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZihpbmZvLnJhbmsgPCA5KXtcclxuICAgICAgICAgICAgICAgICAgICByYW5rID0gXCIwXCIgKyAoaW5mby5yYW5rKzEpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuayArPSBpbmZvLnJhbmsrMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpc3RbaW5mby5yYW5rXS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaWJfYm94XCIgaWR4PScraW5mby5yYW5rKyc+PHNwYW4gY2xhc3M9XCJpYl9waW5cIj48L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiaWJfcmFua1wiPicgKyByYW5rICsnPC9wPjxwIGNsYXNzPVwiaWJfbmFtZVwiPicraW5mby5uYW1lKyc8L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaWJfYm94IHVuU2VsZWN0ZWRcIiBpZHg9JyArIGluZm8ucmFuayArJz48c3BhbiBjbGFzcz1cImliX3BpblwiPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJpYl9yYW5rXCI+JyArIHJhbmsgKyAnPC9wPjxwIGNsYXNzPVwiaWJfbmFtZVwiPicgKyBpbmZvLm5hbWUgKyAnPC9wPjwvZGl2PidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50KCk7XHJcbiAgICAgICAgJChcIi5zZWxlY3Rvcl9pbmZvQm94XCIpLmh0bWwodHh0KTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGNoZWNrZWQ6IGZ1bmN0aW9uKGkpe1xyXG4gICAgICAgIGlmKHRoaXMubGlzdFtpXS5jaGVja2VkKXtcclxuICAgICAgICAgICAgdGhpcy5saXN0W2ldLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5saXN0W2ldLm1hcmtlci5zZXRJY29uKFwiLi9hc3NldHMvcGluLW1hcC1vZmYucG5nXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmliX2JveFtpZHg9J1wiK2krXCInXVwiKS5hZGRDbGFzcyhcInVuU2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY291bnQtLVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0uY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS5tYXJrZXIuc2V0SWNvbihcIi4vYXNzZXRzL3Bpbi1tYXAucG5nXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmliX2JveFtpZHg9J1wiICsgaSArIFwiJ11cIikucmVtb3ZlQ2xhc3MoXCJ1blNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50KytcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb3VudCgpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgbW91c2VPdmVyOiBmdW5jdGlvbihpKXtcclxuICAgICAgICB0aGlzLmxpc3RbaV0uaW5mb3dpbmRvdy5vcGVuKG1hcCwgdGhpcy5saXN0W2ldLm1hcmtlcilcclxuICAgIH0sXHJcblxyXG4gICAgbW91c2VPdXQ6IGZ1bmN0aW9uIChpKXtcclxuICAgICAgICB0aGlzLmxpc3RbaV0uaW5mb3dpbmRvdy5jbG9zZShtYXAsIHRoaXMubGlzdFtpXS5tYXJrZXIpXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUNvdW50OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoXCJsYWJlbFtmb3I9J3JlY29fNCddXCIpLmh0bWwoXCI8c3Bhbj48L3NwYW4+6rSA6rSR7KeAIOygkeq3vOyEsSAtIOyEoO2DneuQnCBcIisgdGhpcy5jb3VudCArXCLqsJwg6rSA6rSR7KeAXCIpXHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrQWxsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5saXN0W2ldLm1hcmtlci5zZXRJY29uKFwiLi9hc3NldHMvcGluLW1hcC5wbmdcIik7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS5pbmZvd2luZG93LmNsb3NlKG1hcCwgdGhpcy5saXN0W2ldLm1hcmtlcik7XHJcbiAgICAgICAgICAgICQoXCIuaWJfYm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcInVuU2VsZWN0ZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY291bnQgPSB0aGlzLmxpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ291bnQoKTtcclxuICAgIH0sIFxyXG5cclxuICAgIHVuQ2hlY2tBbGw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0W2ldLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5saXN0W2ldLm1hcmtlci5zZXRJY29uKFwiLi9hc3NldHMvcGluLW1hcC1vZmYucG5nXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmliX2JveFtpZHg9J1wiICsgaSArIFwiJ11cIikuYWRkQ2xhc3MoXCJ1blNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNvcnQ6IGZ1bmN0aW9uKHN0ZCl7XHJcbiAgICAgICAgdGhpcy5pbmYuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYVtzdGRdIDwgYltzdGRdID8gLTEgOiBhW3N0ZF0gPiBiW3N0ZF0gPyAxIDogMDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgbWV0cm9UZXN0OiBmdW5jdGlvbihtZXRybyl7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5saXN0KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA1ODsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBhdENvb3IgPSB0aGlzLmxpc3Rbal0uY29vcjtcclxuICAgICAgICAgICAgdGhpcy5saXN0W2pdLm1ldHJvID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ3MzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWV0cm9OYW1lID0gbWV0cm9baV1bMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgbGF0RGlmID0gTWF0aC5wb3coKGF0Q29vci5sYXQgLSBtZXRyb1tpXVsxXVsxXSkqMTExMDM0LDIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxuZ0RpZiA9IE1hdGgucG93KChhdENvb3IubG5nIC0gbWV0cm9baV1bMV1bMF0pICogODUzOTcsIDIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IE1hdGguc3FydChsYXREaWYrbG5nRGlmKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRpZjw1MDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGlzdFtqXS5uYW1lICsgXCIg6rSA6rSR7KeA64qUIFwiICsgbWV0cm9OYW1lICsgXCIg7KeA7ZWY7LKg7Jet7JeQ7IScIFwiICsgZGlmICsgXCJtIOuWqOyWtOyguOyeiOuLpC5cIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3Rbal0ubWV0cm8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coKCAoKGF0Q29vci5sYXQgLSBtZXRyb1tpXVsxXVsxXSkgKiAxMTEwMDApIF4gMiArICgoYXRDb29yLmxuZyAtIG1ldHJvW2ldWzFdWzBdKSAqIDg1MDAwKSBeIDIpKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXRoaXMubGlzdFtqXS5tZXRybyl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxpc3Rbal0ubmFtZSArIFwiIOq0gOq0keyngOuKlCDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IOyXhuuLpC5cIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BvdHM7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zcG90cy5qcyIsImltcG9ydCBTcG90cyBmcm9tIFwiLi9tb2R1bGVzL3Nwb3RzLmpzXCI7XHJcbmltcG9ydCBBcmVhIGZyb20gXCIuL21vZHVsZXMvYXJlYS5qc1wiO1xyXG5cclxubGV0IGRiID0ge31cclxuXHJcbmZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwibnlcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgZGIgPSBzbmFwLnZhbCgpO1xyXG4gICAgY29uc29sZS5sb2coZGIpXHJcbiAgICBBcmVhLmluaXQoZGIuYXJlYXMuYWdvZGEpO1xyXG4gICAgU3BvdHMuaW5pdChkYi5zcG90cyk7XHJcbiAgICBBcmVhLmNhbGN1bGF0ZSgpO1xyXG4gICAgU3BvdHMuaG90ZWxUZXN0KGRiLnRlc3RzKTtcclxuICAgIFNwb3RzLm1ldHJvVGVzdChkYi5tZXRybyk7XHJcbn0pXHJcblxyXG4kKFwiLnNlbGVjdG9yX2luZm9Cb3hcIikub24oXCJjbGlja1wiLCBcIi5pYl9ib3hcIiwgZnVuY3Rpb24oKXtcclxuICAgIFNwb3RzLmNoZWNrZWQoJCh0aGlzKS5hdHRyKFwiaWR4XCIpKTtcclxuICAgIEFyZWEuY2FsY3VsYXRlKCk7XHJcbn0pXHJcbiQoXCIuc2VsZWN0b3JfaW5mb0JveFwiKS5vbihcIm1vdXNlb3ZlclwiLCBcIi5pYl9ib3hcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgU3BvdHMubW91c2VPdmVyKCQodGhpcykuYXR0cihcImlkeFwiKSk7XHJcbn0pXHJcbiQoXCIuc2VsZWN0b3JfaW5mb0JveFwiKS5vbihcIm1vdXNlb3V0XCIsIFwiLmliX2JveFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBTcG90cy5tb3VzZU91dCgkKHRoaXMpLmF0dHIoXCJpZHhcIikpO1xyXG59KVxyXG4kKFwiLnJlY29fZmlsdGVyX2NoZWNrQm94RGl2PmlucHV0XCIpLmNoYW5nZShmdW5jdGlvbigpe1xyXG4gICAgQXJlYS5jYWxjdWxhdGUoKTtcclxufSlcclxuJChcIi5hYl9zZWxlY3RcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIFNwb3RzLmNoZWNrQWxsKCk7XHJcbiAgICBBcmVhLmNhbGN1bGF0ZSgpO1xyXG59KVxyXG4kKFwiLmFiX3VuU2VsZWN0XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIFNwb3RzLnVuQ2hlY2tBbGwoKTtcclxuICAgIEFyZWEuY2FsY3VsYXRlKCk7XHJcbn0pXHJcbiQoXCIub2JfcmFua1wiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgU3BvdHMuc29ydChcInJhbmtcIilcclxufSlcclxuJChcIi5vYl9uYW1lXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIFNwb3RzLnNvcnQoXCJuYW1lXCIpXHJcbn0pXHJcblxyXG4vLyBsZXQgaGkgPSB7XHJcbi8vICAgICBcImNyaXRlcmlhXCI6IHtcclxuLy8gICAgICAgICBcImNpdHlJZFwiOiA5Mzk1LFxyXG4vLyAgICAgICAgIFwiYXJlYVwiOiB7XHJcbi8vICAgICAgICAgICAgIFwiaWRcIjogMCxcclxuLy8gICAgICAgICAgICAgXCJjaXR5SWRcIjogMFxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgXCJsYW5kbWFya0lkXCI6IDAsXHJcbi8vICAgICAgICAgXCJjaGVja0luRGF0ZVwiOiBcIjIwMTctMDktMDJcIixcclxuLy8gICAgICAgICBcImNoZWNrT3V0RGF0ZVwiOiBcIjIwMTctMDktMDNcIixcclxuLy8gICAgICAgICBcImFkZGl0aW9uYWxcIjoge1xyXG4vLyAgICAgICAgICAgICBcImxhbmd1YWdlXCI6IFwiZW4tdXNcIixcclxuLy8gICAgICAgICAgICAgXCJzb3J0QnlcIjogXCJQcmljZUFzY1wiLFxyXG4vLyAgICAgICAgICAgICBcIm1heFJlc3VsdFwiOiAxMCxcclxuLy8gICAgICAgICAgICAgXCJkaXNjb3VudE9ubHlcIjogZmFsc2UsXHJcbi8vICAgICAgICAgICAgIFwibWluaW11bVN0YXJSYXRpbmdcIjogMCxcclxuLy8gICAgICAgICAgICAgXCJtaW5pbXVtUmV2aWV3U2NvcmVcIjogMCxcclxuLy8gICAgICAgICAgICAgXCJkYWlseVJhdGVcIjoge1xyXG4vLyAgICAgICAgICAgICAgICAgXCJtaW5pbXVtXCI6IDEsXHJcbi8vICAgICAgICAgICAgICAgICBcIm1heGltdW1cIjogMTAwXHJcbi8vICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgIFwib2NjdXBhbmN5XCI6IHtcclxuLy8gICAgICAgICAgICAgICAgIFwibnVtYmVyT2ZBZHVsdFwiOiAyLFxyXG4vLyAgICAgICAgICAgICAgICAgXCJudW1iZXJPZkNoaWxkcmVuXCI6IDFcclxuLy8gICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgXCJjdXJyZW5jeVwiOiBcIlVTRFwiXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG4vLyAkLmFqYXgoe1xyXG4vLyAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbi8vICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnMTc5OTg5ODo3OWM5NDU1Yy0wNjQ5LTQwMmItYTVkYS01NjVkOGZhYWQxN2UnXHJcbi8vICAgICB9LFxyXG4vLyAgICAgdXJsOiAnaHR0cDovL2FmZmlsaWF0ZWFwaTc2NDMuYWdvZGEuY29tL2FmZmlsaWF0ZXNlcnZpY2UnLFxyXG4vLyAgICAgZGF0YTpKU09OLnN0cmluZ2lmeShoaSksXHJcbi8vICAgICBjb250ZW50VHlwZTonYXBwbGljYXRpb24vanNvbicsXHJcbi8vICAgICBkYXRhVHlwZTonanNvbicsXHJcbi8vICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gfSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9hcHAuanMiLCJpbXBvcnQgU3BvdHMgZnJvbSBcIi4vc3BvdHMuanNcIjtcclxuXHJcbmxldCBBcmVhID0ge1xyXG4gICAgbGlzdDpbXSxcclxuICAgIGNvbG9yU2V0OiBbXCIjZjE1NzIxXCIsIFwiI2ZjOTYxYVwiLCBcIiNmMmM5MzlcIiwgXCIjYjljMjQyXCIsXHJcbiAgICAgICAgXCIjNWM5ODUwXCIsIFwiIzEwODI1ZFwiLCBcIiMxMWFiY2FcIiwgXCIjNDc4M2Y1XCIsXHJcbiAgICAgICAgXCIjOWExYzQ4XCIsIFwiIzdjMzg5M1wiLCBcIiMzZjVjYThcIiwgXCIjNzk1NTQ3XCJcclxuICAgIF0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRhdGFbaV0ucG9seWdvbiA9IG5ldyBnb29nbGUubWFwcy5Qb2x5Z29uKHtcclxuICAgICAgICAgICAgICAgIHBhdGhzOiBkYXRhW2ldLmNvb3IsXHJcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IHRoaXMuY29sb3JTZXRbaV0sXHJcbiAgICAgICAgICAgICAgICBmaWxsT3BhY2l0eTogMC4yLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiAxLjIsXHJcbiAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogdGhpcy5jb2xvclNldFtpXVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goZGF0YVtpXSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGN1bGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBzdGFuZGFyZHMgPSBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoJChcIiNyZWNvX1wiICsgaSkuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgc3RhbmRhcmRzW2ldID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy/qtIDqtJHsp4Ag7KCQ7IiY66W8IOy0iOq4sO2ZlO2VnOuLpC5cclxuICAgICAgICAgICAgdGhpcy5saXN0W2ldLnNjb3JlWzRdID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU3BvdHMubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoU3BvdHMubGlzdFtpXS5jaGVja2VkKXtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgU3BvdHMubGlzdFtpXS5hcmVhID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdFtTcG90cy5saXN0W2ldLmFyZWFdLnNjb3JlWzRdICs9IDEuMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBTcG90cy5saXN0W2ldLmFyZWEubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBTcG90cy5saXN0W2ldLmFyZWFbal0gPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RbU3BvdHMubGlzdFtpXS5hcmVhW2pdXS5zY29yZVs0XSArPSAxLjE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzY29yZVN1bUFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzY29yZVN1bSA9IDA7XHJcbiAgICAgICAgICAgIGlmIChzdGFuZGFyZHNbMF0pe1xyXG4gICAgICAgICAgICAgICAgLy8w67KI7Ke4IOyalOyGjOuKlCDqs7Xtla3tj4nsoJAgLSDsnbzri6ggMOuyiOynuOuhnCDqs6DsoJUoamZr7J6EKVxyXG4gICAgICAgICAgICAgICAgc2NvcmVTdW0gKz0gdGhpcy5saXN0W2ldLnNjb3JlWzBdWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgNTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhbmRhcmRzW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVTdW0gKz0gdGhpcy5saXN0W2ldLnNjb3JlW2pdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2NvcmVTdW1BcnJheS5wdXNoKHsgYXJlYU5vOiBpLCBzY29yZTogc2NvcmVTdW0gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzY29yZVN1bUFycmF5LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuc2NvcmUgPCBiLnNjb3JlID8gMSA6IGEuc2NvcmUgPiBiLnNjb3JlID8gLTEgOiAwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5yZXN1bHQoW3Njb3JlU3VtQXJyYXlbMF0uYXJlYU5vLCBzY29yZVN1bUFycmF5WzFdLmFyZWFObywgc2NvcmVTdW1BcnJheVsyXS5hcmVhTm9dKVxyXG4gICAgfSxcclxuXHJcbiAgICByZXN1bHQ6IGZ1bmN0aW9uIChyZXN1bHRBcnJheSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghcmVzdWx0QXJyYXkuaW5jbHVkZXMoaSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdFtpXS5wb2x5Z29uLnNldE1hcChudWxsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBcImh0dHBzOi8vd3d3LmFnb2RhLmNvbS9wYXJ0bmVycy9wYXJ0bmVyc2VhcmNoLmFzcHg/Y2lkPTE3OTk4OTgmcGNzPTEmaGw9a28mY2l0eT0zMTgmY2hlY2tJbj0yMDE4LTAzLTEzJmNoZWNrT3V0PTIwMTgtMDMtMTUmbG9zPTImcm9vbXM9MSZhZHVsdHM9MSZob3RlbEFyZWE9NjA4NjZcIjtcclxuICAgICAgICAgICAgdGhpcy5saXN0W3Jlc3VsdEFycmF5W2ldXS5wb2x5Z29uLnNldE1hcChtYXApO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FyZWFOYW1lX1wiICsgaSkuaW5uZXJIVE1MID0gdGhpcy5saXN0W3Jlc3VsdEFycmF5W2ldXS5uYW1lO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FyZWFCb3hfXCIgKyBpKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9yU2V0W3Jlc3VsdEFycmF5W2ldXTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcmVhVXJsX1wiICsgaSkuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzYyA9IHRoaXMubGlzdFtyZXN1bHRBcnJheVtpXV0uc2NvcmU7XHJcblxyXG4gICAgICAgICAgICAvL+qzte2Vre2PieygkC4g6rO17ZWt7ISg7YOdIOq4sOuKpSDrhKPsnLzrqbQg67Cw7Je0IOuRkOuyiOynuCBbMF3snYAg7ZW064u5IOyEoO2DnSBpZHhcclxuICAgICAgICAgICAgbGV0IGFpciA9IHNjWzBdWzBdO1xyXG4gICAgICAgICAgICBpZihhaXI+NC40KXtcclxuICAgICAgICAgICAgICAgICQoXCIjc2NvcmVfXCIraStcIl8wXCIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcmVhO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvYXJlYS5qcyJdLCJzb3VyY2VSb290IjoiIn0=