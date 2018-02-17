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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _area = __webpack_require__(1);

var _area2 = _interopRequireDefault(_area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spots = {
    marker: [],
    marked: [],
    infoArray: [],

    mark: function mark(sdata) {
        var _this = this;

        var _loop = function _loop(i) {
            var mk = new google.maps.Marker({
                position: sdata[i].coor,
                map: map,
                icon: markerImg
            });
            var infowindow = new google.maps.InfoWindow({
                content: '<p class="mkTitle">' + sdata[i].name + '</p>'
            });
            mk.addListener('mouseover', function () {
                infowindow.open(map, mk);
            });
            mk.addListener('mouseout', function () {
                infowindow.close(map, mk);
            });
            var that = _this;
            mk.addListener('click', function () {
                that.moveToList(i);
            });
            _this.marker.push(mk);
            _this.marked.push(true);
            _this.infoArray.push(infowindow);
        };

        for (var i = 0; i < sdata.length; i++) {
            _loop(i);
        }
    },
    //좌측 리스트에서 스팟을 클릭해 선택/해제하는 경우
    clicked: function clicked(idx) {
        if (this.marked[idx]) {
            this.marker[idx].setMap(null);
            this.marked[idx] = false;
            document.querySelector("#spot_" + idx).classList.add("unSelected");
            _area2.default.calculate();
        } else {
            this.marker[idx].setMap(map);
            this.marked[idx] = true;
            document.querySelector("#spot_" + idx).classList.remove("unSelected");
            _area2.default.calculate();
        }
    },
    //좌측 리스트에 마우스 오버하는경우
    enter: function enter(idx) {
        this.infoArray[idx].open(map, this.marker[idx]);
        map.setCenter(this.marker[idx].getPosition());
    },
    //좌측 리스트에서 마우스 떠나는경우
    leave: function leave(idx) {
        this.infoArray[idx].close(map, this.marker[idx]);
    },
    //지도 위 마커를 클릭하는 경우 -> 좌측 리스트에서 찾기
    moveToList: function moveToList(idx) {
        var div = document.querySelector(".selector_infoBox");
        div.scrollTop = 60 * (idx - 4);
        var obj = document.querySelector("#spot_" + idx);
        obj.style.color = '#5d85ff';
        obj.style.backgroundColor = '#edf2ff';
        setTimeout(function () {
            obj.style.color = '#333333';
            obj.style.backgroundColor = '#fafafa';
        }, 3000);
    },
    allSelect: function allSelect() {
        for (var i = 0; i < this.marker.length; i++) {
            if (!this.marked[i]) {
                this.marker[i].setMap(map);
                this.marked[i] = true;
                document.querySelector("#spot_" + i).classList.remove("unSelected");
            }
            //전체해제 후 좌측 리스트에 마우스오버하다가 전체선택하면 화면에 infoArray들이 가득
            //표시되는 오류를 없애기 위해 한 번 다 닫아준다.
            this.infoArray[i].close(map, this.marker[i]);
        }
        _area2.default.calculate();
    },
    allUnSelect: function allUnSelect() {
        for (var i = 0; i < this.marker.length; i++) {
            if (this.marked[i]) {
                this.marker[i].setMap(null);
                this.marked[i] = false;
                document.querySelector("#spot_" + i).classList.add("unSelected");
            }
        }
        _area2.default.calculate();
    }
};

exports.default = Spots;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _spots = __webpack_require__(0);

var _spots2 = _interopRequireDefault(_spots);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Area = {
    selected: "agoda",
    colorSet: ["#f15721", "#fc961a", "#f2c939", "#b9c242", "#5c9850", "#10825d", "#11abca", "#4783f5", "#9a1c48", "#7c3893", "#3f5ca8", "#795547"],
    where: [],
    name: [],
    polygons: [],
    score: [],
    scoreObjArray: [],

    create: function create(data) {
        //agoda 또는 booking.com 기준 데이터 하나만 선택
        var sData = data.areas[this.selected];
        if (this.selected === "agoda") {
            for (var i = 0; i < data.spots.length; i++) {
                this.where.push(data.spots[i].area[0]);
            }
        }
        for (var _i = 0; _i < sData.length; _i++) {
            var pg = new google.maps.Polygon({
                paths: sData[_i].coor,
                fillColor: this.colorSet[_i],
                fillOpacity: 0.2,
                strokeWeight: 1.2,
                strokeColor: this.colorSet[_i]
            });
            for (var _i2 = 0; _i2 < sData[_i2].score.length; _i2++) {
                var mdScore = void 0;
            }
            this.polygons.push(pg);
            this.score.push(sData[_i].score);
            this.name.push(sData[_i].name);
        }
    },

    calculate: function calculate() {
        var standards = [false, false, false, false, false];
        for (var i = 0; i < 5; i++) {
            if (document.querySelector("#reco_" + i).checked) {
                standards[i] = true;
            }
        }

        this.scoreObjArray = [];
        for (var _i3 = 0; _i3 < this.score.length; _i3++) {
            //score 4번째 요소가 관광지 점수!
            this.score[_i3][4] = 0;
        }
        var len = this.where.length;
        for (var _i4 = 0; _i4 < len; _i4++) {
            if (_spots2.default.marked[_i4]) {
                if (typeof this.where[_i4] === 'number') {
                    this.score[this.where[_i4]][4] += 1.1;
                } else {
                    for (var j = 0; j < this.where.length; j++) {
                        if (typeof this.where[_i4][j] === 'number') {
                            this.score[this.where[_i4][j]][4] += 1.1;
                        }
                    }
                }
            }
        }
        for (var _i5 = 0; _i5 < this.score.length; _i5++) {
            var scoreSum = 0;
            if (standards[0]) {
                //0번째 요소는 공항평점 - 일단 0번째로 고정(jfk임)
                scoreSum += this.score[_i5][0][0];
            }
            for (var _j = 1; _j < this.score[_i5].length; _j++) {
                if (standards[_j]) {
                    scoreSum += this.score[_i5][_j];
                }
            }
            this.scoreObjArray.push({ areaNo: _i5, score: scoreSum });
        }
        this.scoreObjArray.sort(function (a, b) {
            return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
        });
        this.result([this.scoreObjArray[0].areaNo, this.scoreObjArray[1].areaNo, this.scoreObjArray[2].areaNo]);
    },

    result: function result(rArray) {
        for (var i = 0; i < this.polygons.length; i++) {
            if (!rArray.includes(i)) {
                this.polygons[i].setMap(null);
            }
        }

        for (var _i6 = 0; _i6 < rArray.length; _i6++) {
            this.polygons[rArray[_i6]].setMap(map);
            document.querySelector("#areaName_" + _i6).innerHTML = this.name[rArray[_i6]];
            document.querySelector("#areaBox_" + _i6).style.backgroundColor = this.colorSet[rArray[_i6]];
        }
    }
};

exports.default = Area;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _citySelector = __webpack_require__(3);

var _citySelector2 = _interopRequireDefault(_citySelector);

var _spots = __webpack_require__(0);

var _spots2 = _interopRequireDefault(_spots);

var _recommend = __webpack_require__(4);

var _recommend2 = _interopRequireDefault(_recommend);

var _area = __webpack_require__(1);

var _area2 = _interopRequireDefault(_area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component('city-selector', _citySelector2.default);

var main = new Vue({
    el: '#app',
    data: {
        db: {},
        spots: [],
        noOfSpot: 0,
        finalResult: []
    },
    mounted: function mounted() {
        var _this = this;

        firebase.database().ref("ny").once("value", function (snap) {
            _this.db = snap.val();
            _this.spots = _this.db.spots;
            //list를 인자로 받아 spot을 지도에 마킹한다.
            _spots2.default.mark(_this.db.spots);
            _area2.default.create(_this.db);
            _area2.default.calculate();
            _this.calculateNoOfSpot();
            _this.finalResult = _area2.default.finalResult;
        });
    },
    methods: {
        spotClicked: function spotClicked() {
            //클릭된 박스 번호를 인자로 받아 spot의 상태표시를 변경한다.
            _spots2.default.clicked(event.target.getAttribute("idx"));
            this.calculateNoOfSpot();
            this.finalResult = _area2.default.finalResult;
        },
        spotEnter: function spotEnter() {
            _spots2.default.enter(event.target.getAttribute("idx"));
            this.calculateNoOfSpot();
        },
        spotLeave: function spotLeave() {
            _spots2.default.leave(event.target.getAttribute("idx"));
            this.calculateNoOfSpot();
        },
        allSelect: function allSelect() {
            _spots2.default.allSelect();
            this.calculateNoOfSpot();
            this.finalResult = _area2.default.finalResult;
        },
        allUnSelect: function allUnSelect() {
            _spots2.default.allUnSelect();
            this.calculateNoOfSpot();
            this.finalResult = _area2.default.finalResult;
        },
        calculateNoOfSpot: function calculateNoOfSpot() {
            this.noOfSpot = this.spots.length - document.querySelectorAll(".unSelected").length;
        },
        standChecked: function standChecked() {
            _area2.default.calculate();
            this.finalResult = _area2.default.finalResult;
        }
    }
});

exports.default = main;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var citySelector = Vue.extend({
    template: '#city-selector',
    data: function data() {
        return {
            cityNameKo: "뉴욕",
            cityNameEn: "NEW YORK"
        };
    },
    methods: {
        changeCity: function changeCity() {
            this.cityNameKo = "오사카";
        }
    }
});

exports.default = citySelector;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Recommend = {
    con: function con() {
        console.log("hi");
    }
};

exports.default = Recommend;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTk1MGJhMmI4MWI1MjE5MjAyNTMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zcG90cy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2FyZWEuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvYXBwLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvcmVjb21tZW5kLmpzIl0sIm5hbWVzIjpbIlNwb3RzIiwibWFya2VyIiwibWFya2VkIiwiaW5mb0FycmF5IiwibWFyayIsInNkYXRhIiwiaSIsIm1rIiwiZ29vZ2xlIiwibWFwcyIsIk1hcmtlciIsInBvc2l0aW9uIiwiY29vciIsIm1hcCIsImljb24iLCJtYXJrZXJJbWciLCJpbmZvd2luZG93IiwiSW5mb1dpbmRvdyIsImNvbnRlbnQiLCJuYW1lIiwiYWRkTGlzdGVuZXIiLCJvcGVuIiwiY2xvc2UiLCJ0aGF0IiwibW92ZVRvTGlzdCIsInB1c2giLCJsZW5ndGgiLCJjbGlja2VkIiwiaWR4Iiwic2V0TWFwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2FsY3VsYXRlIiwicmVtb3ZlIiwiZW50ZXIiLCJzZXRDZW50ZXIiLCJnZXRQb3NpdGlvbiIsImxlYXZlIiwiZGl2Iiwic2Nyb2xsVG9wIiwib2JqIiwic3R5bGUiLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsInNldFRpbWVvdXQiLCJhbGxTZWxlY3QiLCJhbGxVblNlbGVjdCIsIkFyZWEiLCJzZWxlY3RlZCIsImNvbG9yU2V0Iiwid2hlcmUiLCJwb2x5Z29ucyIsInNjb3JlIiwic2NvcmVPYmpBcnJheSIsImNyZWF0ZSIsImRhdGEiLCJzRGF0YSIsImFyZWFzIiwic3BvdHMiLCJhcmVhIiwicGciLCJQb2x5Z29uIiwicGF0aHMiLCJmaWxsQ29sb3IiLCJmaWxsT3BhY2l0eSIsInN0cm9rZVdlaWdodCIsInN0cm9rZUNvbG9yIiwibWRTY29yZSIsInN0YW5kYXJkcyIsImNoZWNrZWQiLCJsZW4iLCJqIiwic2NvcmVTdW0iLCJhcmVhTm8iLCJzb3J0IiwiYSIsImIiLCJyZXN1bHQiLCJyQXJyYXkiLCJpbmNsdWRlcyIsImlubmVySFRNTCIsIlZ1ZSIsImNvbXBvbmVudCIsIm1haW4iLCJlbCIsImRiIiwibm9PZlNwb3QiLCJmaW5hbFJlc3VsdCIsIm1vdW50ZWQiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwicmVmIiwib25jZSIsInNuYXAiLCJ2YWwiLCJjYWxjdWxhdGVOb09mU3BvdCIsIm1ldGhvZHMiLCJzcG90Q2xpY2tlZCIsImV2ZW50IiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwic3BvdEVudGVyIiwic3BvdExlYXZlIiwicXVlcnlTZWxlY3RvckFsbCIsInN0YW5kQ2hlY2tlZCIsImNpdHlTZWxlY3RvciIsImV4dGVuZCIsInRlbXBsYXRlIiwiY2l0eU5hbWVLbyIsImNpdHlOYW1lRW4iLCJjaGFuZ2VDaXR5IiwiUmVjb21tZW5kIiwiY29uIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7O0FB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L0RmLElBQUlzQixlQUFleEIsSUFBSXlCLE1BQUosQ0FBVztBQUMxQkMsY0FBVSxnQkFEZ0I7QUFFMUJwRCxVQUFNLGdCQUFVO0FBQ1osZUFBTztBQUNIcUQsd0JBQVksSUFEVDtBQUVIQyx3QkFBWTtBQUZULFNBQVA7QUFJSCxLQVB5QjtBQVExQmIsYUFBUztBQUNMYyxvQkFBWSxzQkFBVTtBQUNsQixpQkFBS0YsVUFBTCxHQUFrQixLQUFsQjtBQUNIO0FBSEk7QUFSaUIsQ0FBWCxDQUFuQjs7a0JBZWVILFk7Ozs7Ozs7Ozs7OztBQ2ZmLElBQUlNLFlBQVk7QUFDWkMsU0FBSyxlQUFVO0FBQ1hDLGdCQUFRQyxHQUFSLENBQVksSUFBWjtBQUNIO0FBSFcsQ0FBaEI7O2tCQU1lSCxTIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGE5NTBiYTJiODFiNTIxOTIwMjUzIiwiaW1wb3J0IEFyZWEgZnJvbSAnLi9hcmVhJztcclxuXHJcbmxldCBTcG90cyA9IHtcclxuICAgIG1hcmtlcjpbXSxcclxuICAgIG1hcmtlZDpbXSxcclxuICAgIGluZm9BcnJheTpbXSxcclxuICAgIFxyXG4gICAgbWFyazogZnVuY3Rpb24oc2RhdGEpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1rID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogc2RhdGFbaV0uY29vcixcclxuICAgICAgICAgICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogbWFya2VySW1nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgaW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICc8cCBjbGFzcz1cIm1rVGl0bGVcIj4nICsgc2RhdGFbaV0ubmFtZSArICc8L3A+J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBtay5hZGRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGluZm93aW5kb3cub3BlbihtYXAsIG1rKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1rLmFkZExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpbmZvd2luZG93LmNsb3NlKG1hcCwgbWspO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIG1rLmFkZExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubW92ZVRvTGlzdChpKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLm1hcmtlci5wdXNoKG1rKTtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZWQucHVzaCh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5pbmZvQXJyYXkucHVzaChpbmZvd2luZG93KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/soozsuKEg66as7Iqk7Yq47JeQ7IScIOyKpO2Mn+ydhCDtgbTrpq3tlbQg7ISg7YOdL+2VtOygnO2VmOuKlCDqsr3smrBcclxuICAgIGNsaWNrZWQ6IGZ1bmN0aW9uKGlkeCl7XHJcbiAgICAgICAgaWYodGhpcy5tYXJrZWRbaWR4XSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyW2lkeF0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtlZFtpZHhdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3BvdF9cIitpZHgpLmNsYXNzTGlzdC5hZGQoXCJ1blNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBBcmVhLmNhbGN1bGF0ZSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtlcltpZHhdLnNldE1hcChtYXApXHJcbiAgICAgICAgICAgIHRoaXMubWFya2VkW2lkeF0gPSB0cnVlO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Nwb3RfXCIgKyBpZHgpLmNsYXNzTGlzdC5yZW1vdmUoXCJ1blNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBBcmVhLmNhbGN1bGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+yijOy4oSDrpqzsiqTtirjsl5Ag66eI7Jqw7IqkIOyYpOuyhO2VmOuKlOqyveyasFxyXG4gICAgZW50ZXI6IGZ1bmN0aW9uKGlkeCl7XHJcbiAgICAgICAgdGhpcy5pbmZvQXJyYXlbaWR4XS5vcGVuKG1hcCwgdGhpcy5tYXJrZXJbaWR4XSk7XHJcbiAgICAgICAgbWFwLnNldENlbnRlcih0aGlzLm1hcmtlcltpZHhdLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgfSxcclxuICAgIC8v7KKM7LihIOumrOyKpO2KuOyXkOyEnCDrp4jsmrDsiqQg65ag64KY64qU6rK97JqwXHJcbiAgICBsZWF2ZTogZnVuY3Rpb24oaWR4KXtcclxuICAgICAgICB0aGlzLmluZm9BcnJheVtpZHhdLmNsb3NlKG1hcCwgdGhpcy5tYXJrZXJbaWR4XSk7XHJcbiAgICB9LFxyXG4gICAgLy/sp4Drj4Qg7JyEIOuniOy7pOulvCDtgbTrpq3tlZjripQg6rK97JqwIC0+IOyijOy4oSDrpqzsiqTtirjsl5DshJwg7LC+6riwXHJcbiAgICBtb3ZlVG9MaXN0OiBmdW5jdGlvbihpZHgpe1xyXG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdG9yX2luZm9Cb3hcIik7XHJcbiAgICAgICAgZGl2LnNjcm9sbFRvcCA9IDYwKihpZHgtNCk7XHJcbiAgICAgICAgbGV0IG9iaiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3BvdF9cIitpZHgpO1xyXG4gICAgICAgIG9iai5zdHlsZS5jb2xvciA9ICcjNWQ4NWZmJztcclxuICAgICAgICBvYmouc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNlZGYyZmYnO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBvYmouc3R5bGUuY29sb3IgPSAnIzMzMzMzMydcclxuICAgICAgICAgICAgb2JqLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmFmYWZhJztcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgIH0sXHJcbiAgICBhbGxTZWxlY3Q6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1hcmtlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZighdGhpcy5tYXJrZWRbaV0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJbaV0uc2V0TWFwKG1hcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlZFtpXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Nwb3RfXCIgKyBpKS5jbGFzc0xpc3QucmVtb3ZlKFwidW5TZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+yghOyytO2VtOygnCDtm4Qg7KKM7LihIOumrOyKpO2KuOyXkCDrp4jsmrDsiqTsmKTrsoTtlZjri6TqsIAg7KCE7LK07ISg7YOd7ZWY66m0IO2ZlOuptOyXkCBpbmZvQXJyYXnrk6TsnbQg6rCA65OdXHJcbiAgICAgICAgICAgIC8v7ZGc7Iuc65CY64qUIOyYpOulmOulvCDsl4bslaDquLAg7JyE7ZW0IO2VnCDrsogg64ukIOuLq+yVhOykgOuLpC5cclxuICAgICAgICAgICAgdGhpcy5pbmZvQXJyYXlbaV0uY2xvc2UobWFwLCB0aGlzLm1hcmtlcltpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFyZWEuY2FsY3VsYXRlKCk7XHJcbiAgICB9LFxyXG4gICAgYWxsVW5TZWxlY3Q6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1hcmtlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLm1hcmtlZFtpXSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcltpXS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlZFtpXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzcG90X1wiICsgaSkuY2xhc3NMaXN0LmFkZChcInVuU2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQXJlYS5jYWxjdWxhdGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BvdHM7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zcG90cy5qcyIsImltcG9ydCBTcG90cyBmcm9tICcuL3Nwb3RzJztcclxuXHJcbmxldCBBcmVhID0ge1xyXG4gICAgc2VsZWN0ZWQ6IFwiYWdvZGFcIixcclxuICAgIGNvbG9yU2V0OiBbXCIjZjE1NzIxXCIsIFwiI2ZjOTYxYVwiLCBcIiNmMmM5MzlcIiwgXCIjYjljMjQyXCIsIFxyXG4gICAgICAgIFwiIzVjOTg1MFwiLCBcIiMxMDgyNWRcIiwgXCIjMTFhYmNhXCIsIFwiIzQ3ODNmNVwiLCBcclxuICAgICAgICBcIiM5YTFjNDhcIiwgXCIjN2MzODkzXCIsIFwiIzNmNWNhOFwiLCBcIiM3OTU1NDdcIlxyXG4gICAgXSxcclxuICAgIHdoZXJlOiBbXSxcclxuICAgIG5hbWU6W10sXHJcbiAgICBwb2x5Z29uczpbXSxcclxuICAgIHNjb3JlOltdLFxyXG4gICAgc2NvcmVPYmpBcnJheTogW10sXHJcblxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAvL2Fnb2RhIOuYkOuKlCBib29raW5nLmNvbSDquLDspIAg642w7J207YSwIO2VmOuCmOunjCDshKDtg51cclxuICAgICAgICBsZXQgc0RhdGEgPSBkYXRhLmFyZWFzW3RoaXMuc2VsZWN0ZWRdO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkID09PSBcImFnb2RhXCIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnNwb3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndoZXJlLnB1c2goZGF0YS5zcG90c1tpXS5hcmVhWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwZyA9IG5ldyBnb29nbGUubWFwcy5Qb2x5Z29uKHtcclxuICAgICAgICAgICAgICAgIHBhdGhzOiBzRGF0YVtpXS5jb29yLFxyXG4gICAgICAgICAgICAgICAgZmlsbENvbG9yOiB0aGlzLmNvbG9yU2V0W2ldLFxyXG4gICAgICAgICAgICAgICAgZmlsbE9wYWNpdHk6MC4yLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OjEuMixcclxuICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOnRoaXMuY29sb3JTZXRbaV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzRGF0YVtpXS5zY29yZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1kU2NvcmVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb25zLnB1c2gocGcpO1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlLnB1c2goc0RhdGFbaV0uc2NvcmUpO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUucHVzaChzRGF0YVtpXS5uYW1lKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2FsY3VsYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBzdGFuZGFyZHMgPSBbZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVjb19cIitpKS5jaGVja2VkKXtcclxuICAgICAgICAgICAgICAgIHN0YW5kYXJkc1tpXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2NvcmVPYmpBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zY29yZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvL3Njb3JlIDTrsojsp7gg7JqU7IaM6rCAIOq0gOq0keyngCDsoJDsiJghXHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmVbaV1bNF0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuID0gdGhpcy53aGVyZS5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBpZihTcG90cy5tYXJrZWRbaV0pe1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLndoZXJlW2ldID09PSAnbnVtYmVyJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZVt0aGlzLndoZXJlW2ldXVs0XSs9MS4xO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLndoZXJlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLndoZXJlW2ldW2pdID09PSAnbnVtYmVyJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlW3RoaXMud2hlcmVbaV1bal1dWzRdKz0xLjE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNjb3JlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzY29yZVN1bSA9IDA7XHJcbiAgICAgICAgICAgIGlmIChzdGFuZGFyZHNbMF0pe1xyXG4gICAgICAgICAgICAgICAgLy8w67KI7Ke4IOyalOyGjOuKlCDqs7Xtla3tj4nsoJAgLSDsnbzri6ggMOuyiOynuOuhnCDqs6DsoJUoamZr7J6EKVxyXG4gICAgICAgICAgICAgICAgc2NvcmVTdW0gKz0gdGhpcy5zY29yZVtpXVswXVswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IHRoaXMuc2NvcmVbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGFuZGFyZHNbal0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlU3VtICs9IHRoaXMuc2NvcmVbaV1bal1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNjb3JlT2JqQXJyYXkucHVzaCh7YXJlYU5vOmksc2NvcmU6c2NvcmVTdW19KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjb3JlT2JqQXJyYXkuc29ydChmdW5jdGlvbihhLGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5zY29yZTxiLnNjb3JlID8gMSA6IGEuc2NvcmUgPiBiLnNjb3JlID8gLTEgOiAwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5yZXN1bHQoW3RoaXMuc2NvcmVPYmpBcnJheVswXS5hcmVhTm8sIHRoaXMuc2NvcmVPYmpBcnJheVsxXS5hcmVhTm8sIHRoaXMuc2NvcmVPYmpBcnJheVsyXS5hcmVhTm9dKVxyXG4gICAgfSxcclxuXHJcbiAgICByZXN1bHQ6IGZ1bmN0aW9uKHJBcnJheSl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvbHlnb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghckFycmF5LmluY2x1ZGVzKGkpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbnNbaV0uc2V0TWFwKG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgckFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9seWdvbnNbckFycmF5W2ldXS5zZXRNYXAobWFwKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcmVhTmFtZV9cIitpKS5pbm5lckhUTUwgPSB0aGlzLm5hbWVbckFycmF5W2ldXTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcmVhQm94X1wiICsgaSkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvclNldFtyQXJyYXlbaV1dXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcmVhO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvYXJlYS5qcyIsImltcG9ydCBjaXR5U2VsZWN0b3IgZnJvbSAnLi9tb2R1bGVzL2NpdHlTZWxlY3Rvcic7XHJcbmltcG9ydCBTcG90cyBmcm9tICcuL21vZHVsZXMvc3BvdHMnO1xyXG5pbXBvcnQgUmVjb21tZW5kIGZyb20gJy4vbW9kdWxlcy9yZWNvbW1lbmQnO1xyXG5pbXBvcnQgQXJlYSBmcm9tICcuL21vZHVsZXMvYXJlYSc7XHJcblxyXG5WdWUuY29tcG9uZW50KCdjaXR5LXNlbGVjdG9yJywgY2l0eVNlbGVjdG9yKTtcclxuXHJcblxyXG5sZXQgbWFpbiA9IG5ldyBWdWUoe1xyXG4gICAgZWw6ICcjYXBwJyxcclxuICAgIGRhdGE6e1xyXG4gICAgICAgIGRiOnt9LFxyXG4gICAgICAgIHNwb3RzOltdLFxyXG4gICAgICAgIG5vT2ZTcG90OjAsXHJcbiAgICAgICAgZmluYWxSZXN1bHQ6W11cclxuICAgIH0sXHJcbiAgICBtb3VudGVkOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwibnlcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRiID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgdGhpcy5zcG90cyA9IHRoaXMuZGIuc3BvdHM7XHJcbiAgICAgICAgICAgIC8vbGlzdOulvCDsnbjsnpDroZwg67Cb7JWEIHNwb3TsnYQg7KeA64+E7JeQIOuniO2Cue2VnOuLpC5cclxuICAgICAgICAgICAgU3BvdHMubWFyayh0aGlzLmRiLnNwb3RzKTtcclxuICAgICAgICAgICAgQXJlYS5jcmVhdGUodGhpcy5kYik7XHJcbiAgICAgICAgICAgIEFyZWEuY2FsY3VsYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlTm9PZlNwb3QoKTtcclxuICAgICAgICAgICAgdGhpcy5maW5hbFJlc3VsdCA9IEFyZWEuZmluYWxSZXN1bHQ7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgc3BvdENsaWNrZWQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIC8v7YG066at65CcIOuwleyKpCDrsojtmLjrpbwg7J247J6Q66GcIOuwm+yVhCBzcG907J2YIOyDge2DnO2RnOyLnOulvCDrs4Dqsr3tlZzri6QuXHJcbiAgICAgICAgICAgIFNwb3RzLmNsaWNrZWQoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImlkeFwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlTm9PZlNwb3QoKTtcclxuICAgICAgICAgICAgdGhpcy5maW5hbFJlc3VsdCA9IEFyZWEuZmluYWxSZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzcG90RW50ZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIFNwb3RzLmVudGVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJpZHhcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZU5vT2ZTcG90KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzcG90TGVhdmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgU3BvdHMubGVhdmUoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImlkeFwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlTm9PZlNwb3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFsbFNlbGVjdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgU3BvdHMuYWxsU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlTm9PZlNwb3QoKTtcclxuICAgICAgICAgICAgdGhpcy5maW5hbFJlc3VsdCA9IEFyZWEuZmluYWxSZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbGxVblNlbGVjdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBTcG90cy5hbGxVblNlbGVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZU5vT2ZTcG90KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmluYWxSZXN1bHQgPSBBcmVhLmZpbmFsUmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FsY3VsYXRlTm9PZlNwb3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vT2ZTcG90ID0gdGhpcy5zcG90cy5sZW5ndGggLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnVuU2VsZWN0ZWRcIikubGVuZ3RoXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFuZENoZWNrZWQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIEFyZWEuY2FsY3VsYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmluYWxSZXN1bHQgPSBBcmVhLmZpbmFsUmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYWluO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvYXBwLmpzIiwidmFyIGNpdHlTZWxlY3RvciA9IFZ1ZS5leHRlbmQoe1xyXG4gICAgdGVtcGxhdGU6ICcjY2l0eS1zZWxlY3RvcicsXHJcbiAgICBkYXRhOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNpdHlOYW1lS286IFwi64m07JqVXCIsXHJcbiAgICAgICAgICAgIGNpdHlOYW1lRW46IFwiTkVXIFlPUktcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgY2hhbmdlQ2l0eTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5jaXR5TmFtZUtvID0gXCLsmKTsgqzsubRcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjaXR5U2VsZWN0b3I7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5U2VsZWN0b3IuanMiLCJsZXQgUmVjb21tZW5kID0ge1xyXG4gICAgY29uOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGlcIilcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVjb21tZW5kO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvcmVjb21tZW5kLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==