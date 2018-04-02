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
    show: "all", //false인경우 체크된 것만 보기
    restoreArray: [],
    selected: [],

    init: function init(data) {
        var _this = this;

        $(".showCard").removeClass("displayNone");
        $(".showAcco").removeClass("displayNone");
        var that = this;

        var _loop = function _loop(i) {
            data[i].checked = false;
            _this.selected.push(false);

            data[i].marker = new google.maps.Marker({
                position: data[i].coor,
                map: map,
                icon: "./assets/pin-map-off.svg"
            });

            var rank = data[i].rank + 1;

            var txt = '<div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png"><div class="infoImage ny_' + i + '"></div></div><p class="rank">' + rank + '위</p><div class="contents">';
            txt += '<p class="name_ko ko">' + data[i].name + '</p><p class="name_en">' + data[i].tag + '</p><p class="description">' + data[i].description + '</p></div></div>';

            data[i].infowindow = new google.maps.InfoWindow({
                content: txt
            });

            data[i].marker.addListener('mouseover', function () {
                data[i].infowindow.open(map, data[i].marker);
                $(".spotBox[idx='" + i + "']").addClass("spotFriendOver");
                if (that.list[i].checked) {
                    $(".spotCardWrapper[idx='" + i + "']").find('.hintOut').css("display", "inline");
                } else {
                    $(".spotCardWrapper[idx='" + i + "']").find('.hint').css("display", "inline");
                }

                var totalHeight = $(".spots").height();
                var targetScroll = $(".spotBox[idx='" + i + "']").position().top;
                var currentScroll = $(".spots").scrollTop();
                if (targetScroll > totalHeight - 100) {
                    $(".spots").stop().animate({ scrollTop: currentScroll + targetScroll - 100 }, 300);
                } else if (targetScroll < 0) {
                    $(".spots").stop().animate({ scrollTop: currentScroll + targetScroll - 100 }, 300);
                }
            });

            data[i].marker.addListener('mouseout', function () {
                data[i].infowindow.close(map, data[i].marker);

                $(".spotBox[idx='" + i + "']").removeClass("spotFriendOver");
                if (that.list[i].checked) {
                    $(".spotCardWrapper[idx='" + i + "']").find('.hintOut').css("display", "none");
                } else {
                    $(".spotCardWrapper[idx='" + i + "']").find('.hint').css("display", "none");
                }
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
        this.count = 0;
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
        var card = "";
        for (var i = 0; i < this.list.length; i++) {
            var info = this.inf[i];
            var rank = info.rank + 1;

            if (this.list[info.rank].checked) {
                if (this.show === "unSelected") {
                    txt += '<div class="spotBox selected" idx="' + info.rank + '" style="display: none;"><div class="pinDiv"><span class="pincenter"></span>';
                    card += '<div class="spotCardWrapper selected" idx="' + info.rank + '" style="display: none;"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                } else {
                    txt += '<div class="spotBox selected" idx="' + info.rank + '"><div class="pinDiv"><span class="pincenter"></span>';
                    card += '<div class="spotCardWrapper selected" idx="' + info.rank + '"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                }
                card += '<div class="infoImage ny_' + info.rank + '"></div></div><p class="rank">' + rank + '위</p><div class="contents">';
            } else {
                if (this.show === "selected") {
                    txt += '<div class="spotBox unSelected" idx="' + info.rank + '" style="display: none;"><div class="pinDiv"><span class="pincenter"></span>';
                    card += '<div class="spotCardWrapper unSelected" idx="' + info.rank + '" style="display: none;"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                } else {
                    txt += '<div class="spotBox unSelected" idx="' + info.rank + '"><div class="pinDiv"><span class="pincenter"></span>';
                    card += '<div class="spotCardWrapper unSelected" idx="' + info.rank + '"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                }
                card += '<div class="infoImage ny_' + info.rank + '"></div></div><p class="rank">' + rank + '위</p><div class="contents">';
            }

            txt += '<span class="pin"></span></div><div class="info"><p class="rank">' + rank + '위</p>';
            txt += '<p class="name_ko ko">' + info.name + '</p><p class="name_en">' + info.tag + '</p></div></div>';
            card += '<p class="name_ko ko">' + info.name + '</p><p class="name_en">' + info.tag + '</p><p class="description">' + info.description + '</p></div>';
            card += '<div class="footer"><span class="pincenter"></span><span class="pin"></span>';
            card += '<span class="hint">클릭해서 선택</span><span class="hintOut">클릭해서 선택 해제</span></div></div><div class="neonSign"></div></div>';
        }
        this.updateCount();
        $(".spots").html(txt);
        $(".cardBox").html(card);
        this.checkResult();
    },

    checked: function checked(i) {
        if (this.list[i].checked) {
            this.list[i].checked = false;
            this.selected[i] = false;
            this.list[i].marker.setIcon("./assets/pin-map-off.svg");
            $(".spotBox[idx='" + i + "']").removeClass("selected");
            $(".spotCardWrapper[idx='" + i + "']").removeClass("selected");
            $(".spotBox[idx='" + i + "']").addClass("unSelected");
            $(".spotCardWrapper[idx='" + i + "']").addClass("unSelected");
            $(".hint").css("display", "none");
            $(".hintOut").css("display", "none");
            if (this.show === "selected") {
                $(".spotBox[idx='" + i + "']").hide(200);
                $(".spotCardWrapper[idx='" + i + "']").hide(200);
            }
            this.count--;
        } else {
            this.list[i].checked = true;
            this.selected[i] = true;
            this.list[i].marker.setIcon("./assets/pin-map-on.svg");
            $(".spotBox[idx='" + i + "']").addClass("selected");
            $(".spotCardWrapper[idx='" + i + "']").addClass("selected");
            $(".spotBox[idx='" + i + "']").removeClass("unSelected");
            $(".spotCardWrapper[idx='" + i + "']").removeClass("unSelected");
            $(".hint").css("display", "none");
            $(".hintOut").css("display", "none");
            if (this.show === "unSelected") {
                $(".spotBox[idx='" + i + "']").hide(200);
                $(".spotCardWrapper[idx='" + i + "']").hide(200);
            }
            this.count++;
        }
        this.updateCount();
        $(".restore").addClass("displayNone");
        $(".spot_wrap .pincenter").removeClass("off");
        this.checkResult();
    },

    mouseOver: function mouseOver(i) {
        this.list[i].infowindow.open(map, this.list[i].marker);
        this.list[i].marker.setAnimation(google.maps.Animation.BOUNCE);
        $(".spotCardWrapper[idx='" + i + "']").addClass("cardFriendOver");
        if (this.list[i].checked) {
            $(".spotCardWrapper[idx='" + i + "']").find('.hintOut').css("display", "inline");
        } else {
            $(".spotCardWrapper[idx='" + i + "']").find('.hint').css("display", "inline");
        }
    },

    cardOver: function cardOver(i) {
        $(".spotBox[idx='" + i + "']").addClass("spotFriendOver");
        if (this.list[i].checked) {
            $(".spotCardWrapper[idx='" + i + "']").find('.hintOut').css("display", "inline");
        } else {
            $(".spotCardWrapper[idx='" + i + "']").find('.hint').css("display", "inline");
        }
    },

    cardOver_scroll: function cardOver_scroll(i) {
        var totalHeight = $(".spots").height();
        var targetScroll = $(".spotBox[idx='" + i + "']").position().top;
        var currentScroll = $(".spots").scrollTop();
        if (targetScroll > totalHeight - 100) {
            $(".spots").stop().animate({ scrollTop: currentScroll + targetScroll - 100 }, 300);
        } else if (targetScroll < 0) {
            $(".spots").stop().animate({ scrollTop: currentScroll + targetScroll - 100 }, 300);
        }
    },

    cardOut: function cardOut(i) {
        $(".spotBox[idx='" + i + "']").removeClass("spotFriendOver");
        if (this.list[i].checked) {
            $(".spotCardWrapper[idx='" + i + "']").find('.hintOut').css("display", "none");
        } else {
            $(".spotCardWrapper[idx='" + i + "']").find('.hint').css("display", "none");
        }
    },

    mouseOut: function mouseOut(i) {
        this.list[i].infowindow.close(map, this.list[i].marker);
        this.list[i].marker.setAnimation(null);
        $(".spotCardWrapper[idx='" + i + "']").removeClass("cardFriendOver");
        if (this.list[i].checked) {
            $(".spotCardWrapper[idx='" + i + "']").find('.hintOut').css("display", "none");
        } else {
            $(".spotCardWrapper[idx='" + i + "']").find('.hint').css("display", "none");
        }
    },

    updateCount: function updateCount() {
        $(".count_selected").html(this.count);
        $(".spotSelected").html(this.count);
        $(".hotel_wrap .number").html(this.count);
        $(".hotelDetail .counter .number").html(this.count);
        this.checkResult();
    },

    checkAll: function checkAll(listen) {
        this.restoreArray = [];
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].checked) {
                this.restoreArray.push(i);
            } else {
                this.selected[i] = true;
                this.list[i].checked = true;
                this.list[i].marker.setIcon("./assets/pin-map-on.svg");
                this.list[i].infowindow.close(map, this.list[i].marker);
                $(".spotBox[idx='" + i + "']").addClass("selected");

                $(".spotCardWrapper[idx='" + i + "']").addClass("selected");
                $(".spotBox[idx='" + i + "']").removeClass("unSelected");
                $(".spotCardWrapper[idx='" + i + "']").removeClass("unSelected");
                $(".hint").css("display", "none");
                $(".hintOut").css("display", "none");
                if (this.show === "unSelected") {
                    $(".spotBox[idx='" + i + "']").hide();
                    $(".spotCardWrapper[idx='" + i + "']").hide();
                } else if (this.show === "selected") {
                    $(".spotBox[idx='" + i + "']").show();
                    $(".spotCardWrapper[idx='" + i + "']").show();
                }
            }
        }
        $(".restore").removeClass("displayNone");
        this.count = this.list.length;
        this.updateCount();
        listen.removeClass("ab_select");
        listen.addClass("ab_unSelect");
        $(".spot_wrap .pincenter").removeClass("off");
    },

    unCheckAll: function unCheckAll(listen) {
        this.restoreArray = [];
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].checked) {
                this.restoreArray.push(i);
                this.selected[i] = false;
                this.list[i].checked = false;
                this.list[i].marker.setIcon("./assets/pin-map-off.svg");
                $(".spotBox[idx='" + i + "']").removeClass("selected");
                $(".spotCardWrapper[idx='" + i + "']").removeClass("selected");
                $(".spotBox[idx='" + i + "']").addClass("unSelected");
                $(".spotCardWrapper[idx='" + i + "']").addClass("unSelected");
                $(".hint").css("display", "none");
                $(".hintOut").css("display", "none");
                if (this.show === "selected") {
                    $(".spotBox[idx='" + i + "']").hide();
                    $(".spotCardWrapper[idx='" + i + "']").hide();
                } else if (this.show === "unSelected") {
                    $(".spotBox[idx='" + i + "']").show();
                    $(".spotCardWrapper[idx='" + i + "']").show();
                }
            }
        }
        $(".restore").removeClass("displayNone");
        this.count = 0;
        this.updateCount();
        listen.addClass("ab_select");
        listen.removeClass("ab_unSelect");
        $(".spot_wrap .pincenter").addClass("off");
    },

    checkResult: function checkResult() {
        $(".noResult").addClass("displayNone");
        if (this.show === "selected" && this.count === 0) {
            $(".noResult").removeClass("displayNone");
            $(".noResult p").html("선택한 관광지가 없습니다");
        } else if (this.show === "unSelected" && this.count === this.list.length) {
            $(".noResult").removeClass("displayNone");
            $(".noResult p").html("선택 안 한 관광지가 없습니다");
        }
    },

    sort: function sort(std) {
        this.inf.sort(function (a, b) {
            return a[std] < b[std] ? -1 : a[std] > b[std] ? 1 : 0;
        });
        this.inflate();
    }
};

exports.default = Spots;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _spots = __webpack_require__(0);

var _spots2 = _interopRequireDefault(_spots);

var _hotels = __webpack_require__(2);

var _hotels2 = _interopRequireDefault(_hotels);

var _DatePicker = __webpack_require__(3);

var _DatePicker2 = _interopRequireDefault(_DatePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = {};

$(document).ready(function () {
    var idx = 0;
    firebase.database().ref("ny").once("value", function (snap) {
        db = snap.val();
        _DatePicker2.default.init();
        _hotels2.default.init(db.hotels);
        if (idx > 58) {
            _spots2.default.init(db.spots);
        }
    });

    var count = function count(i) {
        if (i < 59) {
            setTimeout(function () {
                i++;
                idx++;
                $(".general .citySpot_total").html(i);
                $(".general .counter .total").html(" / " + i);
                count(i);
            }, i * 1.8 + 15);
        } else {
            if (db.spots) {
                _spots2.default.init(db.spots);
            }
        }
    };
    count(0);
});
if (db.spots) {
    console.log("hi");
} else {
    console.log("no");
}

$("body").click(function () {
    $(".closeWhenBodyClick").addClass("displayNone");
});

$(".spot_wrap .icon--info").click(function () {
    $(".spot_wrap .spot_hint").toggleClass("displayNone");
    return false;
});
$(".share").click(function () {
    $(".shareBox").toggleClass("displayNone");
    return false;
});

$(".spots").on("click", ".spotBox", function () {
    _spots2.default.checked($(this).attr("idx"));
});
$(".cardBox").on("click", ".spotCardWrapper", function () {
    _spots2.default.checked($(this).attr("idx"));
});
$(".cardBox").on("mouseover", ".spotCardWrapper", function () {
    _spots2.default.cardOver($(this).attr("idx"));
});
$(".spots").on("mouseover", ".spotBox", function () {
    _spots2.default.mouseOver($(this).attr("idx"));
});
$(".cardBox").on("mouseenter", ".spotCardWrapper", function () {
    _spots2.default.cardOver_scroll($(this).attr("idx"));
});
$(".cardBox").on("mouseout", ".spotCardWrapper", function () {
    _spots2.default.cardOut($(this).attr("idx"));
});
$(".spots").on("mouseout", ".spotBox", function () {
    _spots2.default.mouseOut($(this).attr("idx"));
});
$(".hotelsDiv").on("mouseover", ".hotelCardWrap", function () {
    _hotels2.default.mouseOver($(this).attr("id"));
});
$(".hotelsDiv").on("mouseout", ".hotelCardWrap", function () {
    _hotels2.default.mouseOut($(this).attr("id"));
});
$(".view_all").click(function () {
    $(".filterName").html($(this).html());
    $(".selected").show();
    $(".unSelected").show();
    _spots2.default.show = "all";
    _spots2.default.updateCount();
});
$(".view_select").click(function () {
    $(".filterName").html($(this).html());
    $(".unSelected").hide();
    $(".selected").show();
    _spots2.default.show = "selected";
    _spots2.default.updateCount();
});
$(".view_unSelect").click(function () {
    $(".filterName").html($(this).html());
    $(".selected").hide();
    $(".unSelected").show();
    _spots2.default.show = "unSelected";
    _spots2.default.updateCount();
});
$(".ob_rank").click(function () {
    _spots2.default.sort("rank");
    $(".orderName").html("인기순");
});
$(".ob_name").click(function () {
    _spots2.default.sort("name");
    $(".orderName").html("가나다순");
});
$(".showCard").click(function () {
    $(".m").addClass("displayNone");
    $(".cv").removeClass("displayNone");
    $(".showCard").addClass("displayNone");
});
$(".showMap").click(function () {
    $(".m").removeClass("displayNone");
    $(".cv").addClass("displayNone");
    $(".showCard").removeClass("displayNone");
});

$(".showSpot").click(function () {
    $(".wrapper").removeClass("hotel");
    $(".wrapper").addClass("spot");
    $(".cv").removeClass("displayNone");
    $(".m").addClass("displayNone");
    $(".showCard").addClass("displayNone");
    $(".showMap").removeClass("displayNone");
});

$(".showAcco").click(function () {
    $(".wrapper").addClass("hotel");
    $(".wrapper").removeClass("spot");
    $(".cv").addClass("displayNone");
    $(".m").removeClass("displayNone");
    $(".showCard").addClass("displayNone");
    $(".showMap").addClass("displayNone");

    $(".showSpot").addClass("displayNone");
    $(".hotelsDiv").addClass("displayNone");
    $(".hotels_setter").addClass("displayNone");
    $(".hotelsLoader").removeClass("displayNone");
    _hotels2.default.calculate(_spots2.default.selected, _spots2.default.list);
});
$(".restore").click(function () {
    _spots2.default.restore();
});
$(".setter .filter").click(function () {
    $(".drop_filter").toggleClass("displayNone");
    return false;
});
$(".setter .order").click(function () {
    $(".drop_order").toggleClass("displayNone");
    return false;
});
$(".drop_filter>p, .drop_order>p").click(function () {
    $(".drop_filter").addClass("displayNone");
    $(".drop_order").addClass("displayNone");
    return false;
});

$(".spot_wrap .counter").on("click", ".ab_select", function () {
    _spots2.default.checkAll($(this));
});
$(".spot_wrap .counter").on("click", ".ab_unSelect", function () {
    _spots2.default.unCheckAll($(this));
});

$(".hotelsDiv").on("click", ".hotelCardWrap", function () {
    _hotels2.default.showDetail($(this).attr("id"), $(".hotelCardWrap").index($(this)), _spots2.default.selected, _DatePicker2.default.firstDateTxt, _DatePicker2.default.secondDateTxt);
});
$(".closeHotelDetail").click(function () {
    $(".wrap_hotelDetail").addClass("displayNone");
});
$("header .peopleWrap .dropBox").change(function () {
    _hotels2.default.peopleNo = $("header .peopleWrap .dropBox").val();
    $(".hd_sidebar>.std>span").eq(2).html($("header .peopleWrap .dropBox").val());
});

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

var Hotels = {

    hotels: {},
    scoreArray: [],
    scoreSumObj: {},
    marker: {},
    spotScoreObj: {},
    spotScoreArray: {},
    peopleNo: 1,

    init: function init(db) {
        this.hotels = db;
    },
    calculate: function calculate(selected, spots) {
        for (var hid in this.hotels) {
            this.scoreSumObj[hid] = this.hotels[hid].scoreSum;
            this.spotScoreObj[hid] = 0;
        }

        for (var i = 0, max = selected.length; i < max; i++) {
            if (selected[i]) {
                if (spots[i].hotels) {
                    var spotScore = spots[i].hotels;
                    if (spotScore.foot) {
                        for (var j = 0; j < spotScore.foot.length; j++) {
                            this.scoreSumObj[spotScore.foot[j].id] += (1500 - spotScore.foot[j].distance) / 2000;
                            // TODO: 여기는 id라고 해놓고
                            this.spotScoreObj[spotScore.foot[j].id] += (1500 - spotScore.foot[j].distance) / 1000;
                        }
                    }
                    if (spotScore.transport) {
                        var len = Math.min(spotScore.transport.length, 150);
                        for (var j = 0; j < len; j++) {
                            this.scoreSumObj[spotScore.transport[j].hid] += (20000 - spotScore.transport[j].distance) / 25000;
                            // TODO: 여기는 hid라고 해놓았으니 리팩토링때 반드시 수정할것
                            this.spotScoreObj[spotScore.transport[j].hid] += (20000 - spotScore.transport[j].distance) / 15000;
                        }
                    }
                }
            }
        }
        this.spotScoreArray = [];
        this.scoreArray = [];
        for (var hid in this.spotScoreObj) {
            this.spotScoreArray.push({ hid: hid, score: this.spotScoreObj[hid] });
        }
        for (var hid in this.scoreSumObj) {
            this.scoreArray.push({ hid: hid, score: this.scoreSumObj[hid] });
        }
        this.scoreArray.sort(function (a, b) {
            return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
        });
        this.spotScoreArray.sort(function (a, b) {
            return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
        });

        var gradeCut = [0, 25, 70, 131, 191, 251, 301, 336, 361];
        var grade = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5];
        // TODO: 이렇게 막 하는 대신 호텔 비율 나누는것도 자동화하기

        for (var j = 0; j < 8; j++) {
            for (var i = gradeCut[j]; i < gradeCut[j + 1]; i++) {
                this.hotels[this.spotScoreArray[i].hid].score.spot = grade[j];
            }
        }
        this.loading();
    },


    mouseOver: function mouseOver(i) {
        this.hotels[i].infowindow.open(map, this.hotels[i].marker);
    },
    mouseOut: function mouseOut(i) {
        this.hotels[i].infowindow.close(map, this.hotels[i].marker);
    },

    loading: function loading() {
        var that = this;
        var stepIdx = 0;
        var loadArray = ['<span class="icon icon--score-spot"></span>선택한 관광지에 대한 경로 분석중', '<span class="icon icon--score-transit"></span>주변 대중교통 정보 분석중', '<span class="icon icon--score-safety"></span>주변 치안 분석중', '<span class="icon icon--score-facility"></span>주변 편의시설 분석중'];
        var dotArray = ["&nbsp;&nbsp;", ".&nbsp;", "..", "&nbsp;&nbsp;", ".&nbsp;", ".."];
        var loading = function loading(idx) {
            $(".hotelLoadingWord").html(loadArray[Math.floor(idx / 6)] + dotArray[idx % 6]);
            idx++;
            if (idx < 24) {
                setTimeout(function () {
                    loading(idx);
                }, 250 + idx % 2 * 100);
            } else {
                $(".showSpot").removeClass("displayNone");
                $(".hotelsDiv").removeClass("displayNone");
                $(".hotels_setter").removeClass("displayNone");
                $(".hotelsLoader").addClass("displayNone");
                that.inflate();
            }
        };
        loading(0);
    },

    inflate: function inflate() {
        var txt = '';
        var hidArray = [];

        for (var i = 0; i < 15; i++) {
            if (this.marker[i]) {
                this.marker[i].setMap(null);
            }
            var hotel = this.hotels[this.scoreArray[i].hid];
            hidArray.push(this.scoreArray[i].hid);

            var rank = i + 1;
            var korName = hotel.name.ko;
            var engName = hotel.name.en;
            var star = hotel.star;
            var halfStar = false;
            if (star % 1 === 0.5) {
                star -= 0.5;
                halfStar = true;
            }

            var ratingScore = hotel.grade_avg;
            var currentPrice = "144,802";
            var crossedOutPrice = "199,900";
            var score = { facility: hotel.score.facility, safety: hotel.score.safety, transit: hotel.score.transit, spot: hotel.score.spot };

            var imgUrl = hotel.photo[0];
            if (!imgUrl) {
                console.log("이미지없다");
            }
            txt += '<div class="hotelCardWrap" id="' + this.scoreArray[i].hid + '"><div class="hotelCard"><div class="basicInfo"><div class="hotel_rank"><img src="./assets/label.svg"><p>';
            txt += rank + '위</p></div><div class="thumbFrame"><img class="hotelThumb" src="' + imgUrl + '" alt="호텔 사진"></div><div class="textInfo">';
            txt += '<h3 class="ko">' + korName + '</h3><p class="hotelName_en">' + engName + '</p><div class="rating"><p class="subTitle ko">성급</p>';
            for (var j = 0; j < 5; j++) {
                if (j < star) {
                    txt += '<span class="icon icon--stars-full"></span>';
                } else if (j === star && halfStar) {
                    txt += '<span class="icon icon--stars-half"></span>';
                } else {
                    txt += '<span class="icon icon--stars-empty"></span>';
                }
            }
            txt += '<p class="subTitle ko">평점</p><p class="ratingScore">' + ratingScore + '</p></div><div class="hotel_price"><p class="current"></p>';
            txt += '<p class="crossedOut"></p></div></div></div><div class="scoreInfo">';
            txt += '<div class="line"><span class="icon icon--score-spot"></span><p class="infoTxt ko">관광지 접근성</p><p class="score ko score_spot">';
            txt += score.spot + '</p><span class="icon icon--score-transit"></span><p class="infoTxt ko">대중교통</p><p class="score ko score_transit">';
            txt += score.transit + '</p><span class="icon icon--score-safety"></span><p class="infoTxt ko">치안</p><p class="score ko score_safety">';
            txt += score.safety + '</p></div><div class="line"><span class="icon icon--score-facility"></span><p class="infoTxt ko">주변편의시설</p><p class="score ko score_facility">';
            txt += score.facility + '</p><p class="hint">*5.0 만점</p></div></div></div></div>';

            var iwTxt = '<div class="hotelCard_map"><div class="imgSizer"><img src="' + imgUrl + '"></div><div class="iw_rank"><img src="./assets/label.svg"><p class="rank">' + rank + '위</p></div><div class="contents">';
            iwTxt += '<p class="name_ko ko">' + korName + '</p><p class="name_en">' + engName + '</p><div class="infoinfo"><div class="liner"><p class="subTitle ko">성급</p>';
            for (var j = 0; j < 5; j++) {
                if (j < star) {
                    iwTxt += '<span class="icon icon--stars-full"></span>';
                } else if (j === star && halfStar) {
                    iwTxt += '<span class="icon icon--stars-half"></span>';
                } else {
                    iwTxt += '<span class="icon icon--stars-empty"></span>';
                }
            }

            iwTxt += '</div><div class="liner"><p class="subTitle ko">평점</p><p class="ratingScore">' + ratingScore + '</p></div>';

            iwTxt += '<div class="hotel_price" id="iw_' + this.scoreArray[i].hid + '"><p class="current"></p><p class="crossedOut"></p></div></div></div></div></div>';

            hotel.infowindow = new google.maps.InfoWindow({
                content: iwTxt
            });
        }
        $(".hotelsDiv").html(txt);

        console.log(hidArray);
        var postData = {
            hotelId: hidArray,
            checkIn: "2018-04-04",
            checkOut: "2018-04-05",
            adult: 2
        };

        $.ajax({
            method: 'POST',
            url: '/agoda',
            data: JSON.stringify(postData),
            contentType: 'application/json',
            dataType: 'json',
            success: function success(data) {
                console.log(data);
                for (var i = 0; i < data.results.length; i++) {
                    var crossPrice = "";

                    if (data.results[i].crossedOutRate > 0) {
                        crossPrice += '&#8361;' + data.results[i].crossedOutRate;
                    }
                    var curPrice = "&#8361;" + data.results[i].dailyRate;

                    var id = data.results[i].hotelId;

                    $("#" + id + " .current").html(curPrice);
                    $("#" + id + " .crossedOut").html(crossPrice);
                    $("#iw_" + id + " .current").html(curPrice);
                    $("#iw_" + id + " .crossedOut").html(crossPrice);
                }
            }
        });
        var that = this;

        var showCard = function showCard(showIdx) {
            var hotel = that.hotels[that.scoreArray[showIdx].hid];
            var hid = that.scoreArray[showIdx].hid;
            var xOrigin = 13;
            if (showIdx > 8) {
                xOrigin = 12;
            }
            if (showIdx === 0) {
                map.setZoom(14);
                map.setCenter(hotel.coor);
            }

            if (showIdx < 15) {
                $(".hotelCardWrap").eq(showIdx).addClass("normalScale");
                showIdx++;
                $(".noOfHotel").html(showIdx);
                setTimeout(function () {
                    showCard(showIdx);
                    hotel.marker = new google.maps.Marker({
                        position: hotel.coor,
                        map: map,
                        zIndex: 100 - showIdx,
                        icon: {
                            url: "./assets/hotelpin-map.svg",
                            labelOrigin: new google.maps.Point(xOrigin, 15)
                        },
                        label: {
                            text: "" + showIdx + "위",
                            color: "white",
                            fontSize: '11px',
                            letterSpacing: '-1px'
                        }
                    });

                    hotel.marker.addListener('mouseover', function () {
                        hotel.infowindow.open(map, hotel.marker);
                        $(".hotelCardWrap[id='" + hid + "']").addClass("hotelFriendOver");
                        var totalHeight = $(".hotels").height();
                        var targetScroll = $(".hotelCardWrap[id='" + hid + "']").position().top;
                        var currentScroll = $(".hotels").scrollTop();

                        if (targetScroll > totalHeight - 100) {
                            $(".hotels").stop().animate({ scrollTop: currentScroll + targetScroll - 100 }, 300);
                        } else if (targetScroll < 0) {
                            $(".hotels").stop().animate({ scrollTop: currentScroll + targetScroll - 100 }, 300);
                        }
                    });

                    hotel.marker.addListener('mouseout', function () {
                        hotel.infowindow.close(map, hotel.marker);
                        $(".hotelCardWrap[id='" + hid + "']").removeClass("hotelFriendOver");
                    });
                }, 200);
            }
        };
        setTimeout(function () {
            showCard(0);
        }, 100);
    },


    showDetail: function showDetail(hid, rank, selected, checkIn, checkOut) {
        console.log(rank);
        $(".hotelDetail .info").html("");
        $(".wrap_hotelDetail").removeClass("displayNone");
        var hotel = this.hotels[hid];

        var star = hotel.star;
        var halfStar = false;
        if (star % 1 === 0.5) {
            star -= 0.5;
            halfStar = true;
        }

        $(".hotelDetail .rank").html(rank + 1 + "위");
        $(".hotelDetail .hotelName_ko").html(hotel.name.ko);
        $(".hotelDetail .hotelName_en").html(hotel.name.en);
        $(".starAndRating>.icon").removeClass("icon--stars-half icon--stars-empty icon--stars-full");

        for (var j = 0; j < 5; j++) {
            if (j < star) {
                $(".starAndRating>.icon").eq(j).addClass("icon--stars-full");
            } else if (j === star && halfStar) {
                $(".starAndRating>.icon").eq(j).addClass("icon--stars-half");
            } else {
                $(".starAndRating>.icon").eq(j).addClass("icon--stars-empty");
            }
        }
        $(".hotelDetail .ratingScore").html(hotel.grade_avg);
        $(".hotelDetail .hotelImg").attr("src", hotel.photo[0]);
        if (!hotel.photo) {
            // TODO: 이미지 없는경우
            console.log("이미지없다");
        }
        $(".scoreOval").removeClass("so_full so_half");

        if (star % 1 === 0.5) {
            star -= 0.5;
            halfStar = true;
        }

        for (var criteria in hotel.score) {
            var halfScore = false;
            var score = hotel.score[criteria];
            if (score % 1 === 0.5) {
                score -= 0.5;
                halfScore = true;
            }
            $(".hotelDetail .score_" + criteria).html(hotel.score[criteria]);

            for (var i = 0; i < 5; i++) {
                if (i < score) {
                    $("." + criteria + ">.scoreOval").eq(i).addClass("so_full");
                } else if (i === score && halfScore) {
                    $("." + criteria + ">.scoreOval").eq(i).addClass("so_half");
                }
            }
        }
        var seltArray = [];
        for (var i = 0; i < selected.length; i++) {
            if (selected[i]) {
                seltArray.push(i);
            }
        }
        var footArray = [];
        var footDistanceArray = [];
        var transitArray = [];

        if (hotel.spots.foot) {
            for (var i = 0; i < hotel.spots.foot.length; i++) {
                var sid = hotel.spots.foot[i].id;
                if (seltArray.includes(sid)) {
                    footArray.push(sid);
                    footDistanceArray.push(hotel.spots.foot[i].distance);
                }
            }
        }
        for (var i = 0; i < seltArray.length; i++) {
            var _sid = seltArray[i];
            if (hotel.spots.transport[_sid]) {
                if (!footArray.includes(_sid)) {
                    transitArray.push(_sid);
                }
            }
        }

        var text_spot = "";

        if (footArray.length > 0) {
            text_spot += "선택한 " + seltArray.length + "개 중 " + footArray.length + "개의 관광지가 도보 20분거리 이내에 위치하고 있고, ";
            text_spot += "나머지 " + (seltArray.length - footArray.length) + "개 중 " + transitArray.length + "개의 관광지를 지하철로 환승 없이 갈 수 있습니다.";
        } else if (transitArray.length > 0) {
            text_spot += "선택한 " + seltArray.length + "개의 관광지 중 도보로 갈 수 있는 관광지는 없지만 ";
            text_spot += transitArray.length + "개의 관광지를 지하철로 환승 없이 갈 수 있습니다.";
        } else {
            text_spot += "선택한 관광지가 너무 적어 관광지 접근성을 계산할 수 없습니다.";
        }

        var text_transit = "";

        if (hotel.metro) {
            var metArray = Object.keys(hotel.ownMetro);
            text_transit += "도보 10분거리 이내에 " + hotel.metro.length + "개의 지하철 역이 있고, 지나는 노선은 ";

            for (var i = 0; i < metArray.length; i++) {
                text_transit += '<span class="lineName ln_' + metArray[i] + '">' + metArray[i] + '</span>';
            }

            text_transit += " 입니다. ";
        } else {
            text_transit += "주변에 지하철 역이 없습니다!";
        };

        switch (hotel.score.transit) {
            case 5:
                text_transit += "대중교통의 최고 요지에 위치한 숙소입니다.";
                break;

            case 4.5:
                text_transit += "대중교통을 이용하기 매우 편리한 위치에 있는 숙소입니다.";
                break;

            case 4:
                text_transit += "주변 대중교통이 잘 발달된 편입니다.";
                break;

            default:
                text_transit += "";
        }

        var text_safety = "";

        switch (hotel.area) {
            case 7:
                text_safety += "뉴욕 맨해튼 내에서도 유동인구가 가장 많은 타임스퀘어 부근에 위치한 숙소입니다. ";
                break;

            case 0:
                text_safety += "뉴욕 맨해튼 내에서도 안전한 편에 속하는 금융지구에 위치한 숙소입니다. ";
                break;

            case 9:
                text_safety += "뉴욕 내 최상류층이 거주하는 어퍼 이스트 사이드에 위치한 숙소입니다. ";
                break;

            default:
                text_safety += "";
        }

        if (hotel.score.safety > 4.4) {
            if (hotel.score.facilicy > 4.4) {
                if (hotel.local.policeStation) {
                    text_safety += "주변에 상점이 많이 있으며 경찰서가 가까운 곳에 있어 굉장히 안전합니다.";
                } else if (hotel.score.transit > 4.4) {
                    text_safety += "주변에 상점이 많고 지하철역이 가까운 곳에 있어 밤 늦게 다니기에도 나쁘지 않습니다.";
                } else {
                    "주변에 상점 등 편의시설이 잘 갖추어져 있어 전반적으로 치안이 좋습니다.";
                }
            } else if (hotel.local.policeStation) {
                text_safety += "경찰서가 가까운 곳에 있어 굉장히 안전합니다.";
            } else if (hotel.score.transit > 4.4) {
                text_safety += "지하철역이 가까운 곳에 있어 밤 늦게 다니기에도 나쁘지 않습니다.";
            } else {
                text_safety += "치안이 좋은 편입니다.";
            }
        } else if (hotel.score.safety > 3.4) {
            if (hotel.score.facilicy > 4.4) {
                if (hotel.score.transit > 4.4) {
                    text_safety += "주변에 상점이 많고 지하철역이 가까운 곳에 있어 치안이 괜찮은 편입니다.";
                } else {
                    text_safety += "주변에 편의시설이 잘 갖추어진 편이라 치안이 괜찮은 편입니다.";
                }
            } else if (hotel.score.transit > 4.4) {
                text_safety += "지하철역이 가까운 곳에 있어 치안이 괜찮은 편입니다.";
            } else {
                text_safety += "치안이 나쁘지는 않습니다.";
            }
        } else {
            text_safety += "이 숙소 주변지역의 치안은 보통 수준입니다.";
        }

        var text_facility = "";

        if (hotel.score.facility > 4.4) {
            text_facility += "주변 편의시설이 잘 형성되어 있습니다. ";
            if (hotel.local.grocery.nearest < 150) {
                text_facility += "가장 가까운 식료품점이 도보 1~2분거리 내에 위치하고 있습니다.";
            } else if (hotel.local.grocery.nearest < 200) {
                text_facility += "가장 가까운 식료품점이 도보 3~4분거리 내에 위치하고 있습니다.";
            } else {
                text_facility += "숙소 주변에 많은 식료품점들이 있습니다.";
            }
        } else if (hotel.score.facility === 4) {
            text_facility += "주변 편의시설이 잘 형성된 편입니다. ";
            if (hotel.local.grocery.nearest < 150) {
                text_facility += "가장 가까운 식료품점이 도보 1~2분거리 내에 위치하고 있습니다.";
            } else if (hotel.local.grocery.nearest < 200) {
                text_facility += "가장 가까운 식료품점이 도보 3~4분거리 내에 위치하고 있습니다.";
            } else {
                text_facility += "숙소 주변에 식료품점들이 있습니다.";
            }
        } else {
            text_facility += "이 숙소 주변지역의 편의시설은 보통 수준입니다.";
        }

        $(".hotelDetail .infoTxt").eq(0).html(text_spot);
        $(".hotelDetail .infoTxt").eq(1).html(text_transit);
        $(".hotelDetail .infoTxt").eq(2).html(text_safety);
        $(".hotelDetail .infoTxt").eq(3).html(text_facility);

        console.log(hotel);

        var footTxt = "";
        var metroTxt = "";

        if (footArray.length > 0) {
            for (var i = 0; i < footArray.length; i++) {
                var data = _spots2.default.list[footArray[i]];

                footTxt += '<div class="spotCardWrapper selected"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                footTxt += '<div class="infoImage ny_' + footArray[i] + '"></div></div><p class="rank">' + (data.rank + 1) + '위</p><div class="contents">';
                footTxt += '<p class="name_ko ko">' + data.name + '</p><p class="name_en">' + data.name + '</p><p class="description">' + data.description + '</p></div>';
                footTxt += '<div class="footer"><p>숙소로부터 ' + footDistanceArray[i] + 'm</p></div></div></div>';
            }
        }
        if (hotel.spots.foot) {
            for (var i = 0; i < hotel.spots.foot.length; i++) {
                var _sid2 = hotel.spots.foot[i].id;
                var distance = hotel.spots.foot[i].distance;
                if (!footArray.includes(_sid2)) {
                    var _data = _spots2.default.list[_sid2];

                    footTxt += '<div class="spotCardWrapper unSelected"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                    footTxt += '<div class="infoImage ny_' + _sid2 + '"></div></div><p class="rank">' + (_data.rank + 1) + '위</p><div class="contents">';
                    footTxt += '<p class="name_ko ko">' + _data.name + '</p><p class="name_en">' + _data.name + '</p><p class="description">' + _data.description + '</p></div>';
                    footTxt += '<div class="footer"><p>숙소로부터 ' + distance + 'm</p></div></div></div>';
                }
            }
        }

        if (transitArray.length > 0) {
            for (var j = 0; j < transitArray.length; j++) {
                var _sid3 = transitArray[j];

                var _data2 = _spots2.default.list[transitArray[j]];

                var howToGo = "";
                var line = hotel.spots.transport[_sid3].line;

                var metroDistance = 0;
                var nearMetroFromHotel = "";
                var howFarFromHotel = 2000;
                var lineName = "";
                for (var i = 0; i < line.length; i++) {
                    if (hotel.ownMetro[line[i]].distance < howFarFromHotel) {
                        howFarFromHotel = hotel.ownMetro[line[i]].distance;
                        nearMetroFromHotel = hotel.ownMetro[line[i]].name;
                        lineName = line[i];
                        metroDistance = hotel.spots.transport[_sid3].distance;
                    }
                }

                var metrotime = 1 + Math.round(metroDistance / 400);
                var timeFromHotel = Math.round(howFarFromHotel / 70);
                var tSpot = _spots2.default.list[_sid3].metro;

                var nearMetroFromSpot = "";
                var howFarFromSpot = 2000;

                for (var i = 0; i < tSpot.length; i++) {
                    if (tSpot[i].line.includes(lineName)) {
                        if (tSpot[i].distance < howFarFromSpot) {
                            nearMetroFromSpot = tSpot[i].name;
                            howFarFromSpot = tSpot[i].distance;
                        }
                    }
                }
                var timeFromSpot = Math.round(howFarFromSpot / 70);
                var totalTime = timeFromSpot + metrotime + timeFromHotel;

                howToGo += '<p>숙소에서 <span class="lineName ln_' + lineName + '">' + lineName + '</span> ' + nearMetroFromHotel + '까지 도보이동(약 ' + timeFromHotel + '분, ' + howFarFromHotel + 'm)' + '</p>';
                howToGo += '<p><span class="lineName ln_' + lineName + '">' + lineName + '</span> ' + nearMetroFromSpot + '에서 하차 (약 ' + metrotime + '분)' + '</p>';
                howToGo += '<p>' + _data2.name + '까지 도보이동(약 ' + timeFromSpot + '분, ' + howFarFromSpot + 'm)' + '</p>';

                metroTxt += '<div class="spotCardWrapper selected"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                metroTxt += '<div class="infoImage ny_' + transitArray[j] + '"></div></div><p class="rank">' + (_data2.rank + 1) + '위</p><div class="contents">';
                metroTxt += '<p class="name_ko ko">' + _data2.name + '</p><p class="name_en">' + _data2.name + '</p><div class="description">' + howToGo + '</div></div>';
                metroTxt += '<div class="footer"><p>약 ' + totalTime + '분 소요</p></div></div></div>';
            }
        }
        if (hotel.spots.transport) {
            for (var j = 0; j < Object.keys(hotel.spots.transport).length; j++) {
                var _sid4 = Object.keys(hotel.spots.transport)[j] * 1;
                if (!transitArray.includes(_sid4) && !footArray.includes(_sid4)) {
                    var _data3 = _spots2.default.list[_sid4];

                    var _howToGo = "";
                    var _line = hotel.spots.transport[_sid4].line;

                    var _metroDistance = 0;
                    var _nearMetroFromHotel = "";
                    var _howFarFromHotel = 2000;
                    var _lineName = "";
                    for (var i = 0; i < _line.length; i++) {
                        if (hotel.ownMetro[_line[i]].distance < _howFarFromHotel) {
                            _howFarFromHotel = hotel.ownMetro[_line[i]].distance;
                            _nearMetroFromHotel = hotel.ownMetro[_line[i]].name;
                            _lineName = _line[i];
                            _metroDistance = hotel.spots.transport[_sid4].distance;
                        }
                    }

                    var _metrotime = 1 + Math.round(_metroDistance / 400);
                    var _timeFromHotel = Math.round(_howFarFromHotel / 70);
                    var _tSpot = _spots2.default.list[_sid4].metro;

                    var _nearMetroFromSpot = "";
                    var _howFarFromSpot = 2000;

                    for (var i = 0; i < _tSpot.length; i++) {
                        if (_tSpot[i].line.includes(_lineName)) {
                            if (_tSpot[i].distance < _howFarFromSpot) {
                                _nearMetroFromSpot = _tSpot[i].name;
                                _howFarFromSpot = _tSpot[i].distance;
                            }
                        }
                    }
                    var _timeFromSpot = Math.round(_howFarFromSpot / 70);
                    var _totalTime = _timeFromSpot + _metrotime + _timeFromHotel;

                    _howToGo += '<p>숙소에서 <span class="lineName ln_' + _lineName + '">' + _lineName + '</span> ' + _nearMetroFromHotel + '까지 도보이동(약 ' + _timeFromHotel + '분, ' + _howFarFromHotel + 'm)' + '</p>';
                    _howToGo += '<p><span class="lineName ln_' + _lineName + '">' + _lineName + '</span> ' + _nearMetroFromSpot + '에서 하차 (약 ' + _metrotime + '분)' + '</p>';
                    _howToGo += '<p>' + _data3.name + '까지 도보이동(약 ' + _timeFromSpot + '분, ' + _howFarFromSpot + 'm)' + '</p>';

                    metroTxt += '<div class="spotCardWrapper unSelected"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                    metroTxt += '<div class="infoImage ny_' + _sid4 + '"></div></div><p class="rank">' + (_data3.rank + 1) + '위</p><div class="contents">';
                    metroTxt += '<p class="name_ko ko">' + _data3.name + '</p><p class="name_en">' + _data3.name + '</p><div class="description">' + _howToGo + '</div></div>';
                    metroTxt += '<div class="footer"><p>약 ' + _totalTime + '분 소요</p></div></div></div>';
                }
            }
        }

        $(".hotel_foot").html(footTxt);
        $(".hotel_metro").html(metroTxt);

        $(".goReservation>a").attr("href", 'https://www.agoda.com/partners/partnersearch.aspx?cid=1799898&pcs=1&hid=' + hid + '&checkin=' + checkIn + '&checkout=' + checkOut + '&h1=ko&adults=' + this.peopleNo);
    }

};

exports.default = Hotels;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var DatePicker = {
    text: "",
    isFirst: true,
    weekArray: ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"],
    firstDate: {},
    secondDate: {},
    firstDateTxt: "",
    secondDateTxt: "",
    tempDate: "",

    init: function init() {
        var that = this;
        $(".datePicker").datepicker({
            defaultDate: "+1w",

            onSelect: function onSelect() {
                that.chooseDate($(".datePicker").datepicker("getDate"));
            },

            onClose: function onClose() {
                //앞자리만 선택하고 닫힌 경우 초기화해준다.
                if (!that.isFirst) {
                    $(this).data('datepicker').inline = false;
                    that.isFirst = true;

                    var originDate = that.firstDate;
                    that.text = originDate.getMonth() + 1 + "월 " + originDate.getDate() + "일" + that.weekArray[originDate.getDay()] + " - ";
                    originDate = that.secondDate;
                    that.text += originDate.getMonth() + 1 + "월 " + originDate.getDate() + "일" + that.weekArray[originDate.getDay()];
                    $(".dateShower").html(that.text);
                    $(".hd_sidebar>.std>span").eq(0).html(that.text);
                }
            }
        });
        this.firstDate = new Date(Date.now() + 2 * 1000 * 60 * 60 * 24);
        this.secondDate = new Date(Date.now() + 3 * 1000 * 60 * 60 * 24);
        console.log(this.firstDate);
        this.firstDateTxt = this.formatter(this.firstDate);
        this.secondDateTxt = this.formatter(this.secondDate);

        var date = this.firstDate;
        this.text = date.getMonth() + 1 + "월 " + date.getDate() + "일" + this.weekArray[date.getDay()] + " - ";
        date = this.secondDate;
        this.text += date.getMonth() + 1 + "월 " + date.getDate() + "일" + this.weekArray[date.getDay()];
        $(".dateShower").html(this.text);
        $(".hd_sidebar>.std>span").eq(0).html(this.text);
    },

    chooseDate: function chooseDate(date) {
        if (this.isFirst) {
            $(".datePicker").data('datepicker').inline = true;
            this.text = date.getMonth() + 1 + "월 " + date.getDate() + "일" + this.weekArray[date.getDay()] + " - ";
            this.tempDate = date;
            $(".dateShower").html(this.text);
            this.isFirst = false;
        } else {
            $(".datePicker").data('datepicker').inline = false;
            this.text += date.getMonth() + 1 + "월 " + date.getDate() + "일" + this.weekArray[date.getDay()];
            $(".dateShower").html(this.text);
            $(".hd_sidebar>.std>span").eq(0).html(this.text);
            this.firstDate = this.tempDate;
            this.secondDate = date;
            this.isFirst = true;

            //최종적으로 날짜 검사
            if (this.firstDate > this.secondDate) {
                this.reverseDate();
                return;
            } else if (this.firstDate.getTime() === this.secondDate.getTime()) {
                // TODO: 토스트 띄우기
                $(".dateShower").html("체크인-아웃 날짜가 같습니다");
                console.log("같은 날짜를 선택하셨습니다.");
                return;
            }

            this.firstDateTxt = this.formatter(this.firstDate);
            this.secondDateTxt = this.formatter(this.secondDate);

            var night = (this.secondDate - this.firstDate) / (1000 * 60 * 60 * 24);
            $("header .dateRange").html(night + "박 " + (night + 1) + "일");
            $(".hotelDetail .std>span").eq(1).html(night + "박 " + (night + 1) + "일");
        }
    },
    reverseDate: function reverseDate() {
        var tempDate = this.firstDate;
        this.firstDate = this.secondDate;
        this.secondDate = tempDate;
        var text = $(".dateShower").html().split(" - ");
        text = text[1] + " - " + text[0];
        $(".dateShower").html(text);
        $(".hd_sidebar>.std>span").eq(0).html(this.text);
        this.firstDateTxt = this.formatter(this.firstDate);
        this.secondDateTxt = this.formatter(this.secondDate);

        var night = (this.secondDate - this.firstDate) / (1000 * 60 * 60 * 24);
        $("header .dateRange").html(night + "박 " + (night + 1) + "일");
        $(".hotelDetail .std>span").eq(1).html(night + "박 " + (night + 1) + "일");
    },


    formatter: function formatter(date) {
        var month = "";
        var day = "";
        if (date.getMonth() + 1 < 10) {
            month = "0" + (date.getMonth() + 1);
        } else {
            month = date.getMonth() + 1;
        }
        if (date.getDate() < 10) {
            day = "0" + date.getDate();
        } else {
            day = date.getDate();
        }
        return date.getFullYear() + "-" + month + "-" + day;
    }
};

exports.default = DatePicker;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDljN2Q4ZTI5ZjY1Njc2MmFlZWIiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zcG90cy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9ob3RlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9EYXRlUGlja2VyLmpzIl0sIm5hbWVzIjpbIlNwb3RzIiwibGlzdCIsImluZiIsImNvdW50Iiwic2hvdyIsInJlc3RvcmVBcnJheSIsInNlbGVjdGVkIiwiaW5pdCIsImRhdGEiLCIkIiwicmVtb3ZlQ2xhc3MiLCJ0aGF0IiwiaSIsImNoZWNrZWQiLCJwdXNoIiwibWFya2VyIiwiZ29vZ2xlIiwibWFwcyIsIk1hcmtlciIsInBvc2l0aW9uIiwiY29vciIsIm1hcCIsImljb24iLCJyYW5rIiwidHh0IiwibmFtZSIsInRhZyIsImRlc2NyaXB0aW9uIiwiaW5mb3dpbmRvdyIsIkluZm9XaW5kb3ciLCJjb250ZW50IiwiYWRkTGlzdGVuZXIiLCJvcGVuIiwiYWRkQ2xhc3MiLCJmaW5kIiwiY3NzIiwidG90YWxIZWlnaHQiLCJoZWlnaHQiLCJ0YXJnZXRTY3JvbGwiLCJ0b3AiLCJjdXJyZW50U2Nyb2xsIiwic2Nyb2xsVG9wIiwic3RvcCIsImFuaW1hdGUiLCJjbG9zZSIsImxlbmd0aCIsImluZmxhdGUiLCJpY29uV2VsbCIsInNpemUiLCJoaSIsImNhcmQiLCJpbmZvIiwidXBkYXRlQ291bnQiLCJodG1sIiwiY2hlY2tSZXN1bHQiLCJzZXRJY29uIiwiaGlkZSIsIm1vdXNlT3ZlciIsInNldEFuaW1hdGlvbiIsIkFuaW1hdGlvbiIsIkJPVU5DRSIsImNhcmRPdmVyIiwiY2FyZE92ZXJfc2Nyb2xsIiwiY2FyZE91dCIsIm1vdXNlT3V0IiwiY2hlY2tBbGwiLCJsaXN0ZW4iLCJ1bkNoZWNrQWxsIiwic29ydCIsInN0ZCIsImEiLCJiIiwiZGIiLCJkb2N1bWVudCIsInJlYWR5IiwiaWR4IiwiZmlyZWJhc2UiLCJkYXRhYmFzZSIsInJlZiIsIm9uY2UiLCJzbmFwIiwidmFsIiwiaG90ZWxzIiwic3BvdHMiLCJzZXRUaW1lb3V0IiwiY29uc29sZSIsImxvZyIsImNsaWNrIiwidG9nZ2xlQ2xhc3MiLCJvbiIsImF0dHIiLCJjYWxjdWxhdGUiLCJyZXN0b3JlIiwic2hvd0RldGFpbCIsImluZGV4IiwiZmlyc3REYXRlVHh0Iiwic2Vjb25kRGF0ZVR4dCIsImNoYW5nZSIsInBlb3BsZU5vIiwiZXEiLCJIb3RlbHMiLCJzY29yZUFycmF5Iiwic2NvcmVTdW1PYmoiLCJzcG90U2NvcmVPYmoiLCJzcG90U2NvcmVBcnJheSIsImhpZCIsInNjb3JlU3VtIiwibWF4Iiwic3BvdFNjb3JlIiwiZm9vdCIsImoiLCJpZCIsImRpc3RhbmNlIiwidHJhbnNwb3J0IiwibGVuIiwiTWF0aCIsIm1pbiIsInNjb3JlIiwiZ3JhZGVDdXQiLCJncmFkZSIsInNwb3QiLCJsb2FkaW5nIiwic3RlcElkeCIsImxvYWRBcnJheSIsImRvdEFycmF5IiwiZmxvb3IiLCJoaWRBcnJheSIsInNldE1hcCIsImhvdGVsIiwia29yTmFtZSIsImtvIiwiZW5nTmFtZSIsImVuIiwic3RhciIsImhhbGZTdGFyIiwicmF0aW5nU2NvcmUiLCJncmFkZV9hdmciLCJjdXJyZW50UHJpY2UiLCJjcm9zc2VkT3V0UHJpY2UiLCJmYWNpbGl0eSIsInNhZmV0eSIsInRyYW5zaXQiLCJpbWdVcmwiLCJwaG90byIsIml3VHh0IiwicG9zdERhdGEiLCJob3RlbElkIiwiY2hlY2tJbiIsImNoZWNrT3V0IiwiYWR1bHQiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnRlbnRUeXBlIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwicmVzdWx0cyIsImNyb3NzUHJpY2UiLCJjcm9zc2VkT3V0UmF0ZSIsImN1clByaWNlIiwiZGFpbHlSYXRlIiwic2hvd0NhcmQiLCJzaG93SWR4IiwieE9yaWdpbiIsInNldFpvb20iLCJzZXRDZW50ZXIiLCJ6SW5kZXgiLCJsYWJlbE9yaWdpbiIsIlBvaW50IiwibGFiZWwiLCJ0ZXh0IiwiY29sb3IiLCJmb250U2l6ZSIsImxldHRlclNwYWNpbmciLCJjcml0ZXJpYSIsImhhbGZTY29yZSIsInNlbHRBcnJheSIsImZvb3RBcnJheSIsImZvb3REaXN0YW5jZUFycmF5IiwidHJhbnNpdEFycmF5Iiwic2lkIiwiaW5jbHVkZXMiLCJ0ZXh0X3Nwb3QiLCJ0ZXh0X3RyYW5zaXQiLCJtZXRybyIsIm1ldEFycmF5IiwiT2JqZWN0Iiwia2V5cyIsIm93bk1ldHJvIiwidGV4dF9zYWZldHkiLCJhcmVhIiwiZmFjaWxpY3kiLCJsb2NhbCIsInBvbGljZVN0YXRpb24iLCJ0ZXh0X2ZhY2lsaXR5IiwiZ3JvY2VyeSIsIm5lYXJlc3QiLCJmb290VHh0IiwibWV0cm9UeHQiLCJob3dUb0dvIiwibGluZSIsIm1ldHJvRGlzdGFuY2UiLCJuZWFyTWV0cm9Gcm9tSG90ZWwiLCJob3dGYXJGcm9tSG90ZWwiLCJsaW5lTmFtZSIsIm1ldHJvdGltZSIsInJvdW5kIiwidGltZUZyb21Ib3RlbCIsInRTcG90IiwibmVhck1ldHJvRnJvbVNwb3QiLCJob3dGYXJGcm9tU3BvdCIsInRpbWVGcm9tU3BvdCIsInRvdGFsVGltZSIsIkRhdGVQaWNrZXIiLCJpc0ZpcnN0Iiwid2Vla0FycmF5IiwiZmlyc3REYXRlIiwic2Vjb25kRGF0ZSIsInRlbXBEYXRlIiwiZGF0ZXBpY2tlciIsImRlZmF1bHREYXRlIiwib25TZWxlY3QiLCJjaG9vc2VEYXRlIiwib25DbG9zZSIsImlubGluZSIsIm9yaWdpbkRhdGUiLCJnZXRNb250aCIsImdldERhdGUiLCJnZXREYXkiLCJEYXRlIiwibm93IiwiZm9ybWF0dGVyIiwiZGF0ZSIsInJldmVyc2VEYXRlIiwiZ2V0VGltZSIsIm5pZ2h0Iiwic3BsaXQiLCJtb250aCIsImRheSIsImdldEZ1bGxZZWFyIl0s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QjtBQUNIO0FBQ0QsWUFBR00sS0FBS0wsT0FBTCxLQUFlLEVBQWxCLEVBQXFCO0FBQ2pCVyxrQkFBTSxNQUFJTixLQUFLTCxPQUFMLEVBQVY7QUFDSCxTQUZELE1BRUs7QUFDRFcsa0JBQU1OLEtBQUtMLE9BQUwsRUFBTjtBQUNIO0FBQ0QsZUFBT0ssS0FBS08sV0FBTCxLQUFtQixHQUFuQixHQUF1QkYsS0FBdkIsR0FBNkIsR0FBN0IsR0FBaUNDLEdBQXhDO0FBQ0g7QUFwSFksQ0FBakI7O2tCQXVIZXpCLFUiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDljN2Q4ZTI5ZjY1Njc2MmFlZWIiLCJsZXQgU3BvdHMgPSB7XHJcbiAgICBsaXN0OiBbXSxcclxuICAgIGluZjpbXSxcclxuICAgIGNvdW50OiAwLCAgLy/rqocg6rCcIOyEoO2DneuQmOyXiOuKlOyngCDsubTsmrTtirhcclxuICAgIHNob3c6XCJhbGxcIiwgLy9mYWxzZeyduOqyveyasCDssrTtgazrkJwg6rKD66eMIOuztOq4sFxyXG4gICAgcmVzdG9yZUFycmF5OltdLFxyXG4gICAgc2VsZWN0ZWQ6IFtdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICQoXCIuc2hvd0NhcmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLnNob3dBY2NvXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZGF0YVtpXS5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBkYXRhW2ldLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGRhdGFbaV0uY29vcixcclxuICAgICAgICAgICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgICAgICAgICAgaWNvbjpcIi4vYXNzZXRzL3Bpbi1tYXAtb2ZmLnN2Z1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJhbmsgPSBkYXRhW2ldLnJhbmsgKyAxO1xyXG5cclxuICAgICAgICAgICAgbGV0IHR4dCA9ICc8ZGl2IGNsYXNzPVwic3BvdENhcmRcIj48ZGl2IGNsYXNzPVwiaW1nU2l6ZXJcIj48aW1nIGNsYXNzPVwiaW1nT3V0XCIgc3JjPVwiLi9hc3NldHMvaW1hZ2Utb3V0LnBuZ1wiPjxkaXYgY2xhc3M9XCJpbmZvSW1hZ2UgbnlfJytpKydcIj48L2Rpdj48L2Rpdj48cCBjbGFzcz1cInJhbmtcIj4nK3JhbmsrJ+ychDwvcD48ZGl2IGNsYXNzPVwiY29udGVudHNcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cIm5hbWVfa28ga29cIj4nK2RhdGFbaV0ubmFtZSsnPC9wPjxwIGNsYXNzPVwibmFtZV9lblwiPicrZGF0YVtpXS50YWcrJzwvcD48cCBjbGFzcz1cImRlc2NyaXB0aW9uXCI+JytkYXRhW2ldLmRlc2NyaXB0aW9uKyc8L3A+PC9kaXY+PC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgZGF0YVtpXS5pbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coe1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogdHh0XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBkYXRhW2ldLm1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtpXS5pbmZvd2luZG93Lm9wZW4obWFwLCBkYXRhW2ldLm1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnNwb3RCb3hbaWR4PSdcIiArIGkgKyBcIiddXCIpLmFkZENsYXNzKFwic3BvdEZyaWVuZE92ZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZih0aGF0Lmxpc3RbaV0uY2hlY2tlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmZpbmQoJy5oaW50T3V0JykuY3NzKFwiZGlzcGxheVwiLFwiaW5saW5lXCIpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmZpbmQoJy5oaW50JykuY3NzKFwiZGlzcGxheVwiLFwiaW5saW5lXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0b3RhbEhlaWdodCA9ICQoXCIuc3BvdHNcIikuaGVpZ2h0KClcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRTY3JvbGwgPSAkKFwiLnNwb3RCb3hbaWR4PSdcIiArIGkgKyBcIiddXCIpLnBvc2l0aW9uKCkudG9wXHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFNjcm9sbCA9ICQoXCIuc3BvdHNcIikuc2Nyb2xsVG9wKClcclxuICAgICAgICAgICAgICAgIGlmKHRhcmdldFNjcm9sbCA+IHRvdGFsSGVpZ2h0IC0gMTAwKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNwb3RzXCIpLnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3A6Y3VycmVudFNjcm9sbCArIHRhcmdldFNjcm9sbCAtIDEwMH0sIDMwMCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0YXJnZXRTY3JvbGw8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zcG90c1wiKS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wOmN1cnJlbnRTY3JvbGwgKyB0YXJnZXRTY3JvbGwgLSAxMDB9LCAzMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGRhdGFbaV0ubWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbaV0uaW5mb3dpbmRvdy5jbG9zZShtYXAsIGRhdGFbaV0ubWFya2VyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLnNwb3RCb3hbaWR4PSdcIiArIGkgKyBcIiddXCIpLnJlbW92ZUNsYXNzKFwic3BvdEZyaWVuZE92ZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZih0aGF0Lmxpc3RbaV0uY2hlY2tlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmZpbmQoJy5oaW50T3V0JykuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5maW5kKCcuaGludCcpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgZGF0YVtpXS5tYXJrZXIuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jaGVja2VkKGkpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goZGF0YVtpXSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mLnB1c2goZGF0YVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuaWNvbldlbGwoMylcclxuICAgIH0sXHJcblxyXG4gICAgaWNvbldlbGw6IGZ1bmN0aW9uKHNpemUpe1xyXG4gICAgICAgIGxldCBoaSA9IHNpemVcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgaWYoaGk+MTgpe1xyXG4gICAgICAgICAgICBoaSA9IDM7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGhpKz0xO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdHh0ID0gXCJcIjtcclxuICAgICAgICBsZXQgY2FyZCA9IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGluZm8gPSB0aGlzLmluZltpXTtcclxuICAgICAgICAgICAgbGV0IHJhbmsgPSAoaW5mby5yYW5rKzEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubGlzdFtpbmZvLnJhbmtdLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hvdyA9PT0gXCJ1blNlbGVjdGVkXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cInNwb3RCb3ggc2VsZWN0ZWRcIiBpZHg9XCInK2luZm8ucmFuaysnXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPjxkaXYgY2xhc3M9XCJwaW5EaXZcIj48c3BhbiBjbGFzcz1cInBpbmNlbnRlclwiPjwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZCArPSAnPGRpdiBjbGFzcz1cInNwb3RDYXJkV3JhcHBlciBzZWxlY3RlZFwiIGlkeD1cIicraW5mby5yYW5rKydcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+PGRpdiBjbGFzcz1cInNwb3RDYXJkXCI+PGRpdiBjbGFzcz1cImltZ1NpemVyXCI+PGltZyBjbGFzcz1cImltZ091dFwiIHNyYz1cIi4vYXNzZXRzL2ltYWdlLW91dC5wbmdcIj4nO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwic3BvdEJveCBzZWxlY3RlZFwiIGlkeD1cIicraW5mby5yYW5rKydcIj48ZGl2IGNsYXNzPVwicGluRGl2XCI+PHNwYW4gY2xhc3M9XCJwaW5jZW50ZXJcIj48L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcmQgKz0gJzxkaXYgY2xhc3M9XCJzcG90Q2FyZFdyYXBwZXIgc2VsZWN0ZWRcIiBpZHg9XCInK2luZm8ucmFuaysnXCI+PGRpdiBjbGFzcz1cInNwb3RDYXJkXCI+PGRpdiBjbGFzcz1cImltZ1NpemVyXCI+PGltZyBjbGFzcz1cImltZ091dFwiIHNyYz1cIi4vYXNzZXRzL2ltYWdlLW91dC5wbmdcIj4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FyZCArPSAnPGRpdiBjbGFzcz1cImluZm9JbWFnZSBueV8nK2luZm8ucmFuaysnXCI+PC9kaXY+PC9kaXY+PHAgY2xhc3M9XCJyYW5rXCI+JytyYW5rKyfsnIQ8L3A+PGRpdiBjbGFzcz1cImNvbnRlbnRzXCI+JztcclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zaG93ID09PSBcInNlbGVjdGVkXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cInNwb3RCb3ggdW5TZWxlY3RlZFwiIGlkeD1cIicraW5mby5yYW5rKydcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+PGRpdiBjbGFzcz1cInBpbkRpdlwiPjxzcGFuIGNsYXNzPVwicGluY2VudGVyXCI+PC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICBjYXJkICs9ICc8ZGl2IGNsYXNzPVwic3BvdENhcmRXcmFwcGVyIHVuU2VsZWN0ZWRcIiBpZHg9XCInK2luZm8ucmFuaysnXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPjxkaXYgY2xhc3M9XCJzcG90Q2FyZFwiPjxkaXYgY2xhc3M9XCJpbWdTaXplclwiPjxpbWcgY2xhc3M9XCJpbWdPdXRcIiBzcmM9XCIuL2Fzc2V0cy9pbWFnZS1vdXQucG5nXCI+JztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cInNwb3RCb3ggdW5TZWxlY3RlZFwiIGlkeD1cIicraW5mby5yYW5rKydcIj48ZGl2IGNsYXNzPVwicGluRGl2XCI+PHNwYW4gY2xhc3M9XCJwaW5jZW50ZXJcIj48L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcmQgKz0gJzxkaXYgY2xhc3M9XCJzcG90Q2FyZFdyYXBwZXIgdW5TZWxlY3RlZFwiIGlkeD1cIicraW5mby5yYW5rKydcIj48ZGl2IGNsYXNzPVwic3BvdENhcmRcIj48ZGl2IGNsYXNzPVwiaW1nU2l6ZXJcIj48aW1nIGNsYXNzPVwiaW1nT3V0XCIgc3JjPVwiLi9hc3NldHMvaW1hZ2Utb3V0LnBuZ1wiPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXJkICs9ICc8ZGl2IGNsYXNzPVwiaW5mb0ltYWdlIG55XycraW5mby5yYW5rKydcIj48L2Rpdj48L2Rpdj48cCBjbGFzcz1cInJhbmtcIj4nK3JhbmsrJ+ychDwvcD48ZGl2IGNsYXNzPVwiY29udGVudHNcIj4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQgKz0gJzxzcGFuIGNsYXNzPVwicGluXCI+PC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XCJpbmZvXCI+PHAgY2xhc3M9XCJyYW5rXCI+JytyYW5rKyfsnIQ8L3A+J1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibmFtZV9rbyBrb1wiPicraW5mby5uYW1lKyc8L3A+PHAgY2xhc3M9XCJuYW1lX2VuXCI+JytpbmZvLnRhZysnPC9wPjwvZGl2PjwvZGl2PidcclxuICAgICAgICAgICAgY2FyZCArPSAnPHAgY2xhc3M9XCJuYW1lX2tvIGtvXCI+JytpbmZvLm5hbWUrJzwvcD48cCBjbGFzcz1cIm5hbWVfZW5cIj4nK2luZm8udGFnKyc8L3A+PHAgY2xhc3M9XCJkZXNjcmlwdGlvblwiPicraW5mby5kZXNjcmlwdGlvbisnPC9wPjwvZGl2PidcclxuICAgICAgICAgICAgY2FyZCArPSAnPGRpdiBjbGFzcz1cImZvb3RlclwiPjxzcGFuIGNsYXNzPVwicGluY2VudGVyXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwicGluXCI+PC9zcGFuPidcclxuICAgICAgICAgICAgY2FyZCArPSAnPHNwYW4gY2xhc3M9XCJoaW50XCI+7YG066at7ZW07IScIOyEoO2DnTwvc3Bhbj48c3BhbiBjbGFzcz1cImhpbnRPdXRcIj7tgbTrpq3tlbTshJwg7ISg7YOdIO2VtOygnDwvc3Bhbj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwibmVvblNpZ25cIj48L2Rpdj48L2Rpdj4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlQ291bnQoKTtcclxuICAgICAgICAkKFwiLnNwb3RzXCIpLmh0bWwodHh0KTtcclxuICAgICAgICAkKFwiLmNhcmRCb3hcIikuaHRtbChjYXJkKTtcclxuICAgICAgICB0aGlzLmNoZWNrUmVzdWx0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrZWQ6IGZ1bmN0aW9uKGkpe1xyXG4gICAgICAgIGlmKHRoaXMubGlzdFtpXS5jaGVja2VkKXtcclxuICAgICAgICAgICAgdGhpcy5saXN0W2ldLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFtpXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0ubWFya2VyLnNldEljb24oXCIuL2Fzc2V0cy9waW4tbWFwLW9mZi5zdmdcIik7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikuYWRkQ2xhc3MoXCJ1blNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuYWRkQ2xhc3MoXCJ1blNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmhpbnRcIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgICAgICAgICAgJChcIi5oaW50T3V0XCIpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvdyA9PT0gXCJzZWxlY3RlZFwiKXtcclxuICAgICAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikuaGlkZSgyMDApO1xyXG4gICAgICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmhpZGUoMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvdW50LS1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5saXN0W2ldLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkW2ldID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5saXN0W2ldLm1hcmtlci5zZXRJY29uKFwiLi9hc3NldHMvcGluLW1hcC1vbi5zdmdcIik7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikucmVtb3ZlQ2xhc3MoXCJ1blNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikucmVtb3ZlQ2xhc3MoXCJ1blNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmhpbnRcIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKVxyXG4gICAgICAgICAgICAkKFwiLmhpbnRPdXRcIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKVxyXG4gICAgICAgICAgICBpZih0aGlzLnNob3cgPT09IFwidW5TZWxlY3RlZFwiKXtcclxuICAgICAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikuaGlkZSgyMDApO1xyXG4gICAgICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmhpZGUoMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvdW50KytcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb3VudCgpO1xyXG4gICAgICAgICQoXCIucmVzdG9yZVwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICAgICAgJChcIi5zcG90X3dyYXAgLnBpbmNlbnRlclwiKS5yZW1vdmVDbGFzcyhcIm9mZlwiKTtcclxuICAgICAgICB0aGlzLmNoZWNrUmVzdWx0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdXNlT3ZlcjogZnVuY3Rpb24oaSl7XHJcbiAgICAgICAgdGhpcy5saXN0W2ldLmluZm93aW5kb3cub3BlbihtYXAsIHRoaXMubGlzdFtpXS5tYXJrZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdFtpXS5tYXJrZXIuc2V0QW5pbWF0aW9uKGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5CT1VOQ0UpO1xyXG4gICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5hZGRDbGFzcyhcImNhcmRGcmllbmRPdmVyXCIpO1xyXG4gICAgICAgIGlmKHRoaXMubGlzdFtpXS5jaGVja2VkKXtcclxuICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmZpbmQoJy5oaW50T3V0JykuY3NzKFwiZGlzcGxheVwiLFwiaW5saW5lXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuZmluZCgnLmhpbnQnKS5jc3MoXCJkaXNwbGF5XCIsXCJpbmxpbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjYXJkT3ZlcjogZnVuY3Rpb24oaSl7XHJcbiAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5hZGRDbGFzcyhcInNwb3RGcmllbmRPdmVyXCIpO1xyXG4gICAgICAgIGlmKHRoaXMubGlzdFtpXS5jaGVja2VkKXtcclxuICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmZpbmQoJy5oaW50T3V0JykuY3NzKFwiZGlzcGxheVwiLFwiaW5saW5lXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuZmluZCgnLmhpbnQnKS5jc3MoXCJkaXNwbGF5XCIsXCJpbmxpbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjYXJkT3Zlcl9zY3JvbGw6IGZ1bmN0aW9uKGkpe1xyXG4gICAgICAgIGxldCB0b3RhbEhlaWdodCA9ICQoXCIuc3BvdHNcIikuaGVpZ2h0KClcclxuICAgICAgICBsZXQgdGFyZ2V0U2Nyb2xsID0gJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5wb3NpdGlvbigpLnRvcFxyXG4gICAgICAgIGxldCBjdXJyZW50U2Nyb2xsID0gJChcIi5zcG90c1wiKS5zY3JvbGxUb3AoKVxyXG4gICAgICAgIGlmKHRhcmdldFNjcm9sbCA+IHRvdGFsSGVpZ2h0IC0gMTAwKXtcclxuICAgICAgICAgICAgJChcIi5zcG90c1wiKS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wOmN1cnJlbnRTY3JvbGwgKyB0YXJnZXRTY3JvbGwgLSAxMDB9LCAzMDApO1xyXG4gICAgICAgIH1lbHNlIGlmKHRhcmdldFNjcm9sbDwwKXtcclxuICAgICAgICAgICAgJChcIi5zcG90c1wiKS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wOmN1cnJlbnRTY3JvbGwgKyB0YXJnZXRTY3JvbGwgLSAxMDB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2FyZE91dDogZnVuY3Rpb24oaSl7XHJcbiAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcInNwb3RGcmllbmRPdmVyXCIpO1xyXG4gICAgICAgIGlmKHRoaXMubGlzdFtpXS5jaGVja2VkKXtcclxuICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmZpbmQoJy5oaW50T3V0JykuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmZpbmQoJy5oaW50JykuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdXNlT3V0OiBmdW5jdGlvbiAoaSl7XHJcbiAgICAgICAgdGhpcy5saXN0W2ldLmluZm93aW5kb3cuY2xvc2UobWFwLCB0aGlzLmxpc3RbaV0ubWFya2VyKTtcclxuICAgICAgICB0aGlzLmxpc3RbaV0ubWFya2VyLnNldEFuaW1hdGlvbihudWxsKTtcclxuICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikucmVtb3ZlQ2xhc3MoXCJjYXJkRnJpZW5kT3ZlclwiKTtcclxuICAgICAgICBpZih0aGlzLmxpc3RbaV0uY2hlY2tlZCl7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5maW5kKCcuaGludE91dCcpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5maW5kKCcuaGludCcpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVDb3VudDogZnVuY3Rpb24oKXtcclxuICAgICAgICAkKFwiLmNvdW50X3NlbGVjdGVkXCIpLmh0bWwodGhpcy5jb3VudClcclxuICAgICAgICAkKFwiLnNwb3RTZWxlY3RlZFwiKS5odG1sKHRoaXMuY291bnQpXHJcbiAgICAgICAgJChcIi5ob3RlbF93cmFwIC5udW1iZXJcIikuaHRtbCh0aGlzLmNvdW50KVxyXG4gICAgICAgICQoXCIuaG90ZWxEZXRhaWwgLmNvdW50ZXIgLm51bWJlclwiKS5odG1sKHRoaXMuY291bnQpXHJcbiAgICAgICAgdGhpcy5jaGVja1Jlc3VsdCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja0FsbDogZnVuY3Rpb24obGlzdGVuKXtcclxuICAgICAgICB0aGlzLnJlc3RvcmVBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGlzdFtpXS5jaGVja2VkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yZUFycmF5LnB1c2goaSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkW2ldID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdFtpXS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdFtpXS5tYXJrZXIuc2V0SWNvbihcIi4vYXNzZXRzL3Bpbi1tYXAtb24uc3ZnXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0W2ldLmluZm93aW5kb3cuY2xvc2UobWFwLCB0aGlzLmxpc3RbaV0ubWFya2VyKTtcclxuICAgICAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikucmVtb3ZlQ2xhc3MoXCJ1blNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLnJlbW92ZUNsYXNzKFwidW5TZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaGludFwiKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpXHJcbiAgICAgICAgICAgICAgICAkKFwiLmhpbnRPdXRcIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zaG93ID09PSBcInVuU2VsZWN0ZWRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuc2hvdyA9PT0gXCJzZWxlY3RlZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNwb3RCb3hbaWR4PSdcIiArIGkgKyBcIiddXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIucmVzdG9yZVwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgIHRoaXMuY291bnQgPSB0aGlzLmxpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ291bnQoKTtcclxuICAgICAgICBsaXN0ZW4ucmVtb3ZlQ2xhc3MoXCJhYl9zZWxlY3RcIik7XHJcbiAgICAgICAgbGlzdGVuLmFkZENsYXNzKFwiYWJfdW5TZWxlY3RcIik7XHJcbiAgICAgICAgJChcIi5zcG90X3dyYXAgLnBpbmNlbnRlclwiKS5yZW1vdmVDbGFzcyhcIm9mZlwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgdW5DaGVja0FsbDogZnVuY3Rpb24obGlzdGVuKXtcclxuICAgICAgICB0aGlzLnJlc3RvcmVBcnJheSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5saXN0W2ldLmNoZWNrZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlQXJyYXkucHVzaChpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFtpXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0W2ldLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdFtpXS5tYXJrZXIuc2V0SWNvbihcIi4vYXNzZXRzL3Bpbi1tYXAtb2ZmLnN2Z1wiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5hZGRDbGFzcyhcInVuU2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuYWRkQ2xhc3MoXCJ1blNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5oaW50XCIpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmhpbnRPdXRcIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hvdyA9PT0gXCJzZWxlY3RlZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNwb3RCb3hbaWR4PSdcIiArIGkgKyBcIiddXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5zaG93ID09PSBcInVuU2VsZWN0ZWRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAkKFwiLnJlc3RvcmVcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50KCk7XHJcbiAgICAgICAgbGlzdGVuLmFkZENsYXNzKFwiYWJfc2VsZWN0XCIpXHJcbiAgICAgICAgbGlzdGVuLnJlbW92ZUNsYXNzKFwiYWJfdW5TZWxlY3RcIik7XHJcbiAgICAgICAgJChcIi5zcG90X3dyYXAgLnBpbmNlbnRlclwiKS5hZGRDbGFzcyhcIm9mZlwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tSZXN1bHQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJChcIi5ub1Jlc3VsdFwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICAgICAgaWYodGhpcy5zaG93ID09PSBcInNlbGVjdGVkXCIgJiYgdGhpcy5jb3VudCA9PT0gMCl7XHJcbiAgICAgICAgICAgICQoXCIubm9SZXN1bHRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgICAgICAgICAkKFwiLm5vUmVzdWx0IHBcIikuaHRtbChcIuyEoO2Dne2VnCDqtIDqtJHsp4DqsIAg7JeG7Iq164uI64ukXCIpXHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5zaG93ID09PSBcInVuU2VsZWN0ZWRcIiAmJiB0aGlzLmNvdW50ID09PSB0aGlzLmxpc3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgJChcIi5ub1Jlc3VsdFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICAgICAgICAgICQoXCIubm9SZXN1bHQgcFwiKS5odG1sKFwi7ISg7YOdIOyViCDtlZwg6rSA6rSR7KeA6rCAIOyXhuyKteuLiOuLpFwiKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIHNvcnQ6IGZ1bmN0aW9uKHN0ZCl7XHJcbiAgICAgICAgdGhpcy5pbmYuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYVtzdGRdIDwgYltzdGRdID8gLTEgOiBhW3N0ZF0gPiBiW3N0ZF0gPyAxIDogMDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcG90cztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zcG90cy5qcyIsImltcG9ydCBTcG90cyBmcm9tIFwiLi9tb2R1bGVzL3Nwb3RzLmpzXCI7XHJcbmltcG9ydCBIb3RlbHMgZnJvbSBcIi4vbW9kdWxlcy9ob3RlbHMuanNcIlxyXG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tIFwiLi9tb2R1bGVzL0RhdGVQaWNrZXIuanNcIlxyXG5cclxubGV0IGRiID0ge31cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgaWR4ID0gMFxyXG4gICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJueVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgZGIgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgIERhdGVQaWNrZXIuaW5pdCgpO1xyXG4gICAgICAgIEhvdGVscy5pbml0KGRiLmhvdGVscyk7XHJcbiAgICAgICAgaWYoaWR4ID4gNTgpe1xyXG4gICAgICAgICAgICBTcG90cy5pbml0KGRiLnNwb3RzKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgbGV0IGNvdW50ID0gZnVuY3Rpb24oaSl7XHJcbiAgICAgICAgaWYoaTw1OSl7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgaWR4Kys7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmdlbmVyYWwgLmNpdHlTcG90X3RvdGFsXCIpLmh0bWwoaSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmdlbmVyYWwgLmNvdW50ZXIgLnRvdGFsXCIpLmh0bWwoXCIgLyBcIitpKTtcclxuICAgICAgICAgICAgICAgIGNvdW50KGkpXHJcbiAgICAgICAgICAgIH0sIChpKjEuOCsxNSkpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZihkYi5zcG90cyl7XHJcbiAgICAgICAgICAgICAgICBTcG90cy5pbml0KGRiLnNwb3RzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvdW50KDApO1xyXG5cclxufSlcclxuaWYoZGIuc3BvdHMpe1xyXG4gICAgY29uc29sZS5sb2coXCJoaVwiKVxyXG59ZWxzZXtcclxuICAgIGNvbnNvbGUubG9nKFwibm9cIilcclxufVxyXG5cclxuXHJcbiQoXCJib2R5XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiLmNsb3NlV2hlbkJvZHlDbGlja1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbn0pXHJcblxyXG4kKFwiLnNwb3Rfd3JhcCAuaWNvbi0taW5mb1wiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgJChcIi5zcG90X3dyYXAgLnNwb3RfaGludFwiKS50b2dnbGVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KVxyXG4kKFwiLnNoYXJlXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiLnNoYXJlQm94XCIpLnRvZ2dsZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pXHJcblxyXG4kKFwiLnNwb3RzXCIpLm9uKFwiY2xpY2tcIiwgXCIuc3BvdEJveFwiLCBmdW5jdGlvbigpe1xyXG4gICAgU3BvdHMuY2hlY2tlZCgkKHRoaXMpLmF0dHIoXCJpZHhcIikpO1xyXG59KVxyXG4kKFwiLmNhcmRCb3hcIikub24oXCJjbGlja1wiLCBcIi5zcG90Q2FyZFdyYXBwZXJcIiwgZnVuY3Rpb24oKXtcclxuICAgIFNwb3RzLmNoZWNrZWQoJCh0aGlzKS5hdHRyKFwiaWR4XCIpKTtcclxufSlcclxuJChcIi5jYXJkQm94XCIpLm9uKFwibW91c2VvdmVyXCIsIFwiLnNwb3RDYXJkV3JhcHBlclwiLCBmdW5jdGlvbigpe1xyXG4gICAgU3BvdHMuY2FyZE92ZXIoJCh0aGlzKS5hdHRyKFwiaWR4XCIpKTtcclxufSlcclxuJChcIi5zcG90c1wiKS5vbihcIm1vdXNlb3ZlclwiLCBcIi5zcG90Qm94XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIFNwb3RzLm1vdXNlT3ZlcigkKHRoaXMpLmF0dHIoXCJpZHhcIikpO1xyXG59KVxyXG4kKFwiLmNhcmRCb3hcIikub24oXCJtb3VzZWVudGVyXCIsIFwiLnNwb3RDYXJkV3JhcHBlclwiLCBmdW5jdGlvbigpe1xyXG4gICAgU3BvdHMuY2FyZE92ZXJfc2Nyb2xsKCQodGhpcykuYXR0cihcImlkeFwiKSk7XHJcbn0pXHJcbiQoXCIuY2FyZEJveFwiKS5vbihcIm1vdXNlb3V0XCIsIFwiLnNwb3RDYXJkV3JhcHBlclwiLCBmdW5jdGlvbigpe1xyXG4gICAgU3BvdHMuY2FyZE91dCgkKHRoaXMpLmF0dHIoXCJpZHhcIikpO1xyXG59KVxyXG4kKFwiLnNwb3RzXCIpLm9uKFwibW91c2VvdXRcIiwgXCIuc3BvdEJveFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBTcG90cy5tb3VzZU91dCgkKHRoaXMpLmF0dHIoXCJpZHhcIikpO1xyXG59KVxyXG4kKFwiLmhvdGVsc0RpdlwiKS5vbihcIm1vdXNlb3ZlclwiLCBcIi5ob3RlbENhcmRXcmFwXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBIb3RlbHMubW91c2VPdmVyKCQodGhpcykuYXR0cihcImlkXCIpKVxyXG59KVxyXG4kKFwiLmhvdGVsc0RpdlwiKS5vbihcIm1vdXNlb3V0XCIsIFwiLmhvdGVsQ2FyZFdyYXBcIiwgZnVuY3Rpb24oKXtcclxuICAgIEhvdGVscy5tb3VzZU91dCgkKHRoaXMpLmF0dHIoXCJpZFwiKSlcclxufSlcclxuJChcIi52aWV3X2FsbFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgJChcIi5maWx0ZXJOYW1lXCIpLmh0bWwoJCh0aGlzKS5odG1sKCkpXHJcbiAgICAkKFwiLnNlbGVjdGVkXCIpLnNob3coKTtcclxuICAgICQoXCIudW5TZWxlY3RlZFwiKS5zaG93KCk7XHJcbiAgICBTcG90cy5zaG93ID0gXCJhbGxcIjtcclxuICAgIFNwb3RzLnVwZGF0ZUNvdW50KCk7XHJcbn0pXHJcbiQoXCIudmlld19zZWxlY3RcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQoXCIuZmlsdGVyTmFtZVwiKS5odG1sKCQodGhpcykuaHRtbCgpKVxyXG4gICAgJChcIi51blNlbGVjdGVkXCIpLmhpZGUoKTtcclxuICAgICQoXCIuc2VsZWN0ZWRcIikuc2hvdygpO1xyXG4gICAgU3BvdHMuc2hvdyA9IFwic2VsZWN0ZWRcIlxyXG4gICAgU3BvdHMudXBkYXRlQ291bnQoKTtcclxufSlcclxuJChcIi52aWV3X3VuU2VsZWN0XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiLmZpbHRlck5hbWVcIikuaHRtbCgkKHRoaXMpLmh0bWwoKSlcclxuICAgICQoXCIuc2VsZWN0ZWRcIikuaGlkZSgpO1xyXG4gICAgJChcIi51blNlbGVjdGVkXCIpLnNob3coKTtcclxuICAgIFNwb3RzLnNob3cgPSBcInVuU2VsZWN0ZWRcIjtcclxuICAgIFNwb3RzLnVwZGF0ZUNvdW50KCk7XHJcblxyXG59KVxyXG4kKFwiLm9iX3JhbmtcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIFNwb3RzLnNvcnQoXCJyYW5rXCIpO1xyXG4gICAgJChcIi5vcmRlck5hbWVcIikuaHRtbChcIuyduOq4sOyInFwiKTtcclxufSlcclxuJChcIi5vYl9uYW1lXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIFNwb3RzLnNvcnQoXCJuYW1lXCIpO1xyXG4gICAgJChcIi5vcmRlck5hbWVcIikuaHRtbChcIuqwgOuCmOuLpOyInFwiKTtcclxufSlcclxuJChcIi5zaG93Q2FyZFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgJChcIi5tXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLmN2XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLnNob3dDYXJkXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbn0pXHJcbiQoXCIuc2hvd01hcFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgJChcIi5tXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLmN2XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLnNob3dDYXJkXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbn0pXHJcblxyXG4kKFwiLnNob3dTcG90XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiLndyYXBwZXJcIikucmVtb3ZlQ2xhc3MoXCJob3RlbFwiKTtcclxuICAgICQoXCIud3JhcHBlclwiKS5hZGRDbGFzcyhcInNwb3RcIik7XHJcbiAgICAkKFwiLmN2XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLm1cIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIuc2hvd0NhcmRcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIuc2hvd01hcFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG59KVxyXG5cclxuJChcIi5zaG93QWNjb1wiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgJChcIi53cmFwcGVyXCIpLmFkZENsYXNzKFwiaG90ZWxcIik7XHJcbiAgICAkKFwiLndyYXBwZXJcIikucmVtb3ZlQ2xhc3MoXCJzcG90XCIpO1xyXG4gICAgJChcIi5jdlwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5tXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLnNob3dDYXJkXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLnNob3dNYXBcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICAkKFwiLnNob3dTcG90XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICQoXCIuaG90ZWxzRGl2XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICQoXCIuaG90ZWxzX3NldHRlclwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5ob3RlbHNMb2FkZXJcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgIEhvdGVscy5jYWxjdWxhdGUoU3BvdHMuc2VsZWN0ZWQsU3BvdHMubGlzdCk7XHJcbn0pXHJcbiQoXCIucmVzdG9yZVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgU3BvdHMucmVzdG9yZSgpO1xyXG59KVxyXG4kKFwiLnNldHRlciAuZmlsdGVyXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiLmRyb3BfZmlsdGVyXCIpLnRvZ2dsZUNsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgIHJldHVybiBmYWxzZTtcclxufSlcclxuJChcIi5zZXR0ZXIgLm9yZGVyXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiLmRyb3Bfb3JkZXJcIikudG9nZ2xlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KVxyXG4kKFwiLmRyb3BfZmlsdGVyPnAsIC5kcm9wX29yZGVyPnBcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQoXCIuZHJvcF9maWx0ZXJcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgJChcIi5kcm9wX29yZGVyXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgIHJldHVybiBmYWxzZTtcclxufSlcclxuXHJcbiQoXCIuc3BvdF93cmFwIC5jb3VudGVyXCIpLm9uKFwiY2xpY2tcIixcIi5hYl9zZWxlY3RcIixmdW5jdGlvbigpe1xyXG4gICAgU3BvdHMuY2hlY2tBbGwoJCh0aGlzKSk7XHJcbn0pXHJcbiQoXCIuc3BvdF93cmFwIC5jb3VudGVyXCIpLm9uKFwiY2xpY2tcIixcIi5hYl91blNlbGVjdFwiLGZ1bmN0aW9uKCl7XHJcbiAgICBTcG90cy51bkNoZWNrQWxsKCQodGhpcykpO1xyXG59KVxyXG5cclxuJChcIi5ob3RlbHNEaXZcIikub24oXCJjbGlja1wiLFwiLmhvdGVsQ2FyZFdyYXBcIixmdW5jdGlvbigpe1xyXG4gICAgSG90ZWxzLnNob3dEZXRhaWwoJCh0aGlzKS5hdHRyKFwiaWRcIiksICQoXCIuaG90ZWxDYXJkV3JhcFwiKS5pbmRleCgkKHRoaXMpKSwgU3BvdHMuc2VsZWN0ZWQsIERhdGVQaWNrZXIuZmlyc3REYXRlVHh0LCBEYXRlUGlja2VyLnNlY29uZERhdGVUeHQpO1xyXG59KVxyXG4kKFwiLmNsb3NlSG90ZWxEZXRhaWxcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQoXCIud3JhcF9ob3RlbERldGFpbFwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbn0pXHJcbiQoXCJoZWFkZXIgLnBlb3BsZVdyYXAgLmRyb3BCb3hcIikuY2hhbmdlKGZ1bmN0aW9uKCl7XHJcbiAgICBIb3RlbHMucGVvcGxlTm8gPSAkKFwiaGVhZGVyIC5wZW9wbGVXcmFwIC5kcm9wQm94XCIpLnZhbCgpXHJcbiAgICAkKFwiLmhkX3NpZGViYXI+LnN0ZD5zcGFuXCIpLmVxKDIpLmh0bWwoJChcImhlYWRlciAucGVvcGxlV3JhcCAuZHJvcEJveFwiKS52YWwoKSlcclxufSlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvYXBwLmpzIiwiaW1wb3J0IFNwb3RzIGZyb20gXCIuL3Nwb3RzLmpzXCI7XHJcblxyXG5sZXQgSG90ZWxzID0ge1xyXG5cclxuICAgIGhvdGVsczoge30sXHJcbiAgICBzY29yZUFycmF5OiBbXSxcclxuICAgIHNjb3JlU3VtT2JqOnt9LFxyXG4gICAgbWFya2VyOnt9LFxyXG4gICAgc3BvdFNjb3JlT2JqOnt9LFxyXG4gICAgc3BvdFNjb3JlQXJyYXk6e30sXHJcbiAgICBwZW9wbGVObzogMSxcclxuXHJcbiAgICBpbml0KGRiKXtcclxuICAgICAgICB0aGlzLmhvdGVscyA9IGRiO1xyXG4gICAgfSxcclxuXHJcbiAgICBjYWxjdWxhdGUoc2VsZWN0ZWQsc3BvdHMpe1xyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmhvdGVscykge1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlU3VtT2JqW2hpZF0gPSB0aGlzLmhvdGVsc1toaWRdLnNjb3JlU3VtO1xyXG4gICAgICAgICAgICB0aGlzLnNwb3RTY29yZU9ialtoaWRdID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBtYXggPSBzZWxlY3RlZC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihzZWxlY3RlZFtpXSl7XHJcbiAgICAgICAgICAgICAgICBpZihzcG90c1tpXS5ob3RlbHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcG90U2NvcmUgPSBzcG90c1tpXS5ob3RlbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3BvdFNjb3JlLmZvb3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNwb3RTY29yZS5mb290Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlU3VtT2JqW3Nwb3RTY29yZS5mb290W2pdLmlkXSArPSAoMTUwMCAtIHNwb3RTY29yZS5mb290W2pdLmRpc3RhbmNlKS8yMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzog7Jes6riw64qUIGlk65286rOgIO2VtOuGk+qzoFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcG90U2NvcmVPYmpbc3BvdFNjb3JlLmZvb3Rbal0uaWRdICs9ICgxNTAwIC0gc3BvdFNjb3JlLmZvb3Rbal0uZGlzdGFuY2UpLzEwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3BvdFNjb3JlLnRyYW5zcG9ydCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZW4gPSBNYXRoLm1pbihzcG90U2NvcmUudHJhbnNwb3J0Lmxlbmd0aCwxNTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxlbjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlU3VtT2JqW3Nwb3RTY29yZS50cmFuc3BvcnRbal0uaGlkXSArPSAoMjAwMDAgLSBzcG90U2NvcmUudHJhbnNwb3J0W2pdLmRpc3RhbmNlKS8yNTAwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IOyXrOq4sOuKlCBoaWTrnbzqs6Ag7ZW064aT7JWY7Jy864uIIOumrO2Mqe2GoOungeuVjCDrsJjrk5zsi5wg7IiY7KCV7ZWg6rKDXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwb3RTY29yZU9ialtzcG90U2NvcmUudHJhbnNwb3J0W2pdLmhpZF0gKz0gKDIwMDAwIC0gc3BvdFNjb3JlLnRyYW5zcG9ydFtqXS5kaXN0YW5jZSkvMTUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zcG90U2NvcmVBcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2NvcmVBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLnNwb3RTY29yZU9iaikge1xyXG4gICAgICAgICAgICB0aGlzLnNwb3RTY29yZUFycmF5LnB1c2goe2hpZDpoaWQsc2NvcmU6dGhpcy5zcG90U2NvcmVPYmpbaGlkXX0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLnNjb3JlU3VtT2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmVBcnJheS5wdXNoKHtoaWQ6aGlkLHNjb3JlOnRoaXMuc2NvcmVTdW1PYmpbaGlkXX0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2NvcmVBcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5zY29yZSA8IGIuc2NvcmUgPyAxIDogYS5zY29yZSA+IGIuc2NvcmUgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNwb3RTY29yZUFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLnNjb3JlIDwgYi5zY29yZSA/IDEgOiBhLnNjb3JlID4gYi5zY29yZSA/IC0xIDogMDtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBsZXQgZ3JhZGVDdXQgPSBbMCwyNSw3MCwxMzEsMTkxLDI1MSwzMDEsMzM2LDM2MV07XHJcbiAgICAgICAgbGV0IGdyYWRlID0gWzUsNC41LDQsMy41LDMsMi41LDIsMS41XVxyXG4gICAgICAgIC8vIFRPRE86IOydtOugh+qyjCDrp4kg7ZWY64qUIOuMgOyLoCDtmLjthZQg67mE7JyoIOuCmOuIhOuKlOqyg+uPhCDsnpDrj5ntmZTtlZjquLBcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGdyYWRlQ3V0W2pdOyBpIDwgKGdyYWRlQ3V0W2orMV0pOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG90ZWxzW3RoaXMuc3BvdFNjb3JlQXJyYXlbaV0uaGlkXS5zY29yZS5zcG90ID0gZ3JhZGVbal1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWRpbmcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgbW91c2VPdmVyOiBmdW5jdGlvbihpKXtcclxuICAgICAgICB0aGlzLmhvdGVsc1tpXS5pbmZvd2luZG93Lm9wZW4obWFwLCB0aGlzLmhvdGVsc1tpXS5tYXJrZXIpO1xyXG4gICAgfSxcclxuICAgIG1vdXNlT3V0OiBmdW5jdGlvbiAoaSl7XHJcbiAgICAgICAgdGhpcy5ob3RlbHNbaV0uaW5mb3dpbmRvdy5jbG9zZShtYXAsIHRoaXMuaG90ZWxzW2ldLm1hcmtlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRpbmc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzdGVwSWR4ID0gMDtcclxuICAgICAgICBsZXQgbG9hZEFycmF5ID0gW1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJpY29uIGljb24tLXNjb3JlLXNwb3RcIj48L3NwYW4+7ISg7YOd7ZWcIOq0gOq0keyngOyXkCDrjIDtlZwg6rK966GcIOu2hOyEneykkScsXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImljb24gaWNvbi0tc2NvcmUtdHJhbnNpdFwiPjwvc3Bhbj7so7zrs4Ag64yA7KSR6rWQ7Ya1IOygleuztCDrtoTshJ3spJEnLFxyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJpY29uIGljb24tLXNjb3JlLXNhZmV0eVwiPjwvc3Bhbj7so7zrs4Ag7LmY7JWIIOu2hOyEneykkScsXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImljb24gaWNvbi0tc2NvcmUtZmFjaWxpdHlcIj48L3NwYW4+7KO867OAIO2OuOydmOyLnOyEpCDrtoTshJ3spJEnXHJcbiAgICAgICAgXVxyXG4gICAgICAgIGxldCBkb3RBcnJheSA9IFtcIiZuYnNwOyZuYnNwO1wiLFwiLiZuYnNwO1wiLFwiLi5cIixcIiZuYnNwOyZuYnNwO1wiLFwiLiZuYnNwO1wiLFwiLi5cIl1cclxuICAgICAgICBsZXQgbG9hZGluZyA9IGZ1bmN0aW9uKGlkeCl7XHJcbiAgICAgICAgICAgICQoXCIuaG90ZWxMb2FkaW5nV29yZFwiKS5odG1sKGxvYWRBcnJheVtNYXRoLmZsb29yKGlkeC82KV0gKyBkb3RBcnJheVtpZHglNl0pO1xyXG4gICAgICAgICAgICBpZHgrKztcclxuICAgICAgICAgICAgaWYoaWR4PDI0KXtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmcoaWR4KVxyXG4gICAgICAgICAgICAgICAgfSwgMjUwKyhpZHglMikqMTAwKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnNob3dTcG90XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICAgICAgICAgICAgICQoXCIuaG90ZWxzRGl2XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICAgICAgICAgICAgICQoXCIuaG90ZWxzX3NldHRlclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5ob3RlbHNMb2FkZXJcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvYWRpbmcoMClcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZSgpe1xyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuICAgICAgICBsZXQgaGlkQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubWFya2VyW2ldKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyW2ldLnNldE1hcChudWxsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuaG90ZWxzW3RoaXMuc2NvcmVBcnJheVtpXS5oaWRdO1xyXG4gICAgICAgICAgICBoaWRBcnJheS5wdXNoKHRoaXMuc2NvcmVBcnJheVtpXS5oaWQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJhbmsgPSAoaSsxKTtcclxuICAgICAgICAgICAgbGV0IGtvck5hbWUgPSBob3RlbC5uYW1lLmtvO1xyXG4gICAgICAgICAgICBsZXQgZW5nTmFtZSA9IGhvdGVsLm5hbWUuZW47XHJcbiAgICAgICAgICAgIGxldCBzdGFyID0gaG90ZWwuc3RhcjtcclxuICAgICAgICAgICAgbGV0IGhhbGZTdGFyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKHN0YXIlMSA9PT0gMC41KXtcclxuICAgICAgICAgICAgICAgIHN0YXIgLT0gMC41O1xyXG4gICAgICAgICAgICAgICAgaGFsZlN0YXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcmF0aW5nU2NvcmUgPSBob3RlbC5ncmFkZV9hdmc7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJpY2UgPSBcIjE0NCw4MDJcIjtcclxuICAgICAgICAgICAgbGV0IGNyb3NzZWRPdXRQcmljZSA9IFwiMTk5LDkwMFwiO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSB7ZmFjaWxpdHk6aG90ZWwuc2NvcmUuZmFjaWxpdHksIHNhZmV0eTpob3RlbC5zY29yZS5zYWZldHksIHRyYW5zaXQ6IGhvdGVsLnNjb3JlLnRyYW5zaXQsIHNwb3Q6IGhvdGVsLnNjb3JlLnNwb3R9XHJcblxyXG4gICAgICAgICAgICBsZXQgaW1nVXJsID0gaG90ZWwucGhvdG9bMF1cclxuICAgICAgICAgICAgaWYoIWltZ1VybCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuydtOuvuOyngOyXhuuLpFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJob3RlbENhcmRXcmFwXCIgaWQ9XCInK3RoaXMuc2NvcmVBcnJheVtpXS5oaWQrJ1wiPjxkaXYgY2xhc3M9XCJob3RlbENhcmRcIj48ZGl2IGNsYXNzPVwiYmFzaWNJbmZvXCI+PGRpdiBjbGFzcz1cImhvdGVsX3JhbmtcIj48aW1nIHNyYz1cIi4vYXNzZXRzL2xhYmVsLnN2Z1wiPjxwPic7XHJcbiAgICAgICAgICAgIHR4dCs9IHJhbmsgKyAn7JyEPC9wPjwvZGl2PjxkaXYgY2xhc3M9XCJ0aHVtYkZyYW1lXCI+PGltZyBjbGFzcz1cImhvdGVsVGh1bWJcIiBzcmM9XCInICsgaW1nVXJsICsgJ1wiIGFsdD1cIu2YuO2FlCDsgqzsp4RcIj48L2Rpdj48ZGl2IGNsYXNzPVwidGV4dEluZm9cIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPGgzIGNsYXNzPVwia29cIj4nICsga29yTmFtZSArICc8L2gzPjxwIGNsYXNzPVwiaG90ZWxOYW1lX2VuXCI+JyArIGVuZ05hbWUgKyAnPC9wPjxkaXYgY2xhc3M9XCJyYXRpbmdcIj48cCBjbGFzcz1cInN1YlRpdGxlIGtvXCI+7ISx6riJPC9wPic7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihqPHN0YXIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9JzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLS1zdGFycy1mdWxsXCI+PC9zcGFuPidcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGo9PT1zdGFyICYmIGhhbGZTdGFyKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSc8c3BhbiBjbGFzcz1cImljb24gaWNvbi0tc3RhcnMtaGFsZlwiPjwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSc8c3BhbiBjbGFzcz1cImljb24gaWNvbi0tc3RhcnMtZW1wdHlcIj48L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwic3ViVGl0bGUga29cIj7tj4nsoJA8L3A+PHAgY2xhc3M9XCJyYXRpbmdTY29yZVwiPicrcmF0aW5nU2NvcmUrJzwvcD48L2Rpdj48ZGl2IGNsYXNzPVwiaG90ZWxfcHJpY2VcIj48cCBjbGFzcz1cImN1cnJlbnRcIj48L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJjcm9zc2VkT3V0XCI+PC9wPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJzY29yZUluZm9cIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwibGluZVwiPjxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLS1zY29yZS1zcG90XCI+PC9zcGFuPjxwIGNsYXNzPVwiaW5mb1R4dCBrb1wiPuq0gOq0keyngCDsoJHqt7zshLE8L3A+PHAgY2xhc3M9XCJzY29yZSBrbyBzY29yZV9zcG90XCI+J1xyXG4gICAgICAgICAgICB0eHQrPSBzY29yZS5zcG90ICsgJzwvcD48c3BhbiBjbGFzcz1cImljb24gaWNvbi0tc2NvcmUtdHJhbnNpdFwiPjwvc3Bhbj48cCBjbGFzcz1cImluZm9UeHQga29cIj7rjIDspJHqtZDthrU8L3A+PHAgY2xhc3M9XCJzY29yZSBrbyBzY29yZV90cmFuc2l0XCI+J1xyXG4gICAgICAgICAgICB0eHQrPSBzY29yZS50cmFuc2l0ICsgJzwvcD48c3BhbiBjbGFzcz1cImljb24gaWNvbi0tc2NvcmUtc2FmZXR5XCI+PC9zcGFuPjxwIGNsYXNzPVwiaW5mb1R4dCBrb1wiPuy5mOyViDwvcD48cCBjbGFzcz1cInNjb3JlIGtvIHNjb3JlX3NhZmV0eVwiPidcclxuICAgICAgICAgICAgdHh0Kz0gc2NvcmUuc2FmZXR5ICsgJzwvcD48L2Rpdj48ZGl2IGNsYXNzPVwibGluZVwiPjxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLS1zY29yZS1mYWNpbGl0eVwiPjwvc3Bhbj48cCBjbGFzcz1cImluZm9UeHQga29cIj7so7zrs4DtjrjsnZjsi5zshKQ8L3A+PHAgY2xhc3M9XCJzY29yZSBrbyBzY29yZV9mYWNpbGl0eVwiPidcclxuICAgICAgICAgICAgdHh0Kz0gc2NvcmUuZmFjaWxpdHkgKyAnPC9wPjxwIGNsYXNzPVwiaGludFwiPio1LjAg66eM7KCQPC9wPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIGxldCBpd1R4dCA9ICc8ZGl2IGNsYXNzPVwiaG90ZWxDYXJkX21hcFwiPjxkaXYgY2xhc3M9XCJpbWdTaXplclwiPjxpbWcgc3JjPVwiJytpbWdVcmwrJ1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJpd19yYW5rXCI+PGltZyBzcmM9XCIuL2Fzc2V0cy9sYWJlbC5zdmdcIj48cCBjbGFzcz1cInJhbmtcIj4nK3JhbmsrJ+ychDwvcD48L2Rpdj48ZGl2IGNsYXNzPVwiY29udGVudHNcIj4nXHJcbiAgICAgICAgICAgIGl3VHh0Kz0gJzxwIGNsYXNzPVwibmFtZV9rbyBrb1wiPicra29yTmFtZSsnPC9wPjxwIGNsYXNzPVwibmFtZV9lblwiPicrZW5nTmFtZSsnPC9wPjxkaXYgY2xhc3M9XCJpbmZvaW5mb1wiPjxkaXYgY2xhc3M9XCJsaW5lclwiPjxwIGNsYXNzPVwic3ViVGl0bGUga29cIj7shLHquIk8L3A+J1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDU7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoajxzdGFyKXtcclxuICAgICAgICAgICAgICAgICAgICBpd1R4dCs9JzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLS1zdGFycy1mdWxsXCI+PC9zcGFuPidcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGo9PT1zdGFyICYmIGhhbGZTdGFyKXtcclxuICAgICAgICAgICAgICAgICAgICBpd1R4dCs9JzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLS1zdGFycy1oYWxmXCI+PC9zcGFuPidcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGl3VHh0Kz0nPHNwYW4gY2xhc3M9XCJpY29uIGljb24tLXN0YXJzLWVtcHR5XCI+PC9zcGFuPidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXdUeHQrPSc8L2Rpdj48ZGl2IGNsYXNzPVwibGluZXJcIj48cCBjbGFzcz1cInN1YlRpdGxlIGtvXCI+7Y+J7KCQPC9wPjxwIGNsYXNzPVwicmF0aW5nU2NvcmVcIj4nK3JhdGluZ1Njb3JlKyc8L3A+PC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgaXdUeHQrPSc8ZGl2IGNsYXNzPVwiaG90ZWxfcHJpY2VcIiBpZD1cIml3XycrdGhpcy5zY29yZUFycmF5W2ldLmhpZCsnXCI+PHAgY2xhc3M9XCJjdXJyZW50XCI+PC9wPjxwIGNsYXNzPVwiY3Jvc3NlZE91dFwiPjwvcD48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICBob3RlbC5pbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coe1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogaXdUeHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgJChcIi5ob3RlbHNEaXZcIikuaHRtbCh0eHQpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhoaWRBcnJheSlcclxuICAgICAgICBsZXQgcG9zdERhdGEgPSB7XHJcbiAgICAgICAgICAgIGhvdGVsSWQgOiBoaWRBcnJheSxcclxuICAgICAgICBcdGNoZWNrSW46XCIyMDE4LTA0LTA0XCIsXHJcbiAgICAgICAgXHRjaGVja091dDpcIjIwMTgtMDQtMDVcIixcclxuICAgICAgICBcdGFkdWx0OjJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYWdvZGEnLFxyXG4gICAgICAgICAgICBkYXRhOkpTT04uc3RyaW5naWZ5KHBvc3REYXRhKSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6J2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTonanNvbicsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3Jvc3NQcmljZSA9IFwiXCJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5yZXN1bHRzW2ldLmNyb3NzZWRPdXRSYXRlPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcm9zc1ByaWNlICs9ICcmIzgzNjE7JytkYXRhLnJlc3VsdHNbaV0uY3Jvc3NlZE91dFJhdGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1clByaWNlID0gXCImIzgzNjE7XCIgKyBkYXRhLnJlc3VsdHNbaV0uZGFpbHlSYXRlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZCA9IGRhdGEucmVzdWx0c1tpXS5ob3RlbElkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKFwiI1wiK2lkK1wiIC5jdXJyZW50XCIpLmh0bWwoY3VyUHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjXCIraWQrXCIgLmNyb3NzZWRPdXRcIikuaHRtbChjcm9zc1ByaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2l3X1wiK2lkK1wiIC5jdXJyZW50XCIpLmh0bWwoY3VyUHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjaXdfXCIraWQrXCIgLmNyb3NzZWRPdXRcIikuaHRtbChjcm9zc1ByaWNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgbGV0IHNob3dDYXJkID0gZnVuY3Rpb24oc2hvd0lkeCl7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoYXQuaG90ZWxzW3RoYXQuc2NvcmVBcnJheVtzaG93SWR4XS5oaWRdO1xyXG4gICAgICAgICAgICBsZXQgaGlkID0gdGhhdC5zY29yZUFycmF5W3Nob3dJZHhdLmhpZDtcclxuICAgICAgICAgICAgbGV0IHhPcmlnaW4gPSAxM1xyXG4gICAgICAgICAgICBpZihzaG93SWR4Pjgpe1xyXG4gICAgICAgICAgICAgICAgeE9yaWdpbiA9IDEyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoc2hvd0lkeCA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICBtYXAuc2V0Wm9vbSgxNCk7XHJcbiAgICAgICAgICAgICAgICBtYXAuc2V0Q2VudGVyKGhvdGVsLmNvb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzaG93SWR4PDE1KXtcclxuICAgICAgICAgICAgICAgICQoXCIuaG90ZWxDYXJkV3JhcFwiKS5lcShzaG93SWR4KS5hZGRDbGFzcyhcIm5vcm1hbFNjYWxlXCIpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0lkeCsrXHJcbiAgICAgICAgICAgICAgICAkKFwiLm5vT2ZIb3RlbFwiKS5odG1sKHNob3dJZHgpXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93Q2FyZChzaG93SWR4KTtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGhvdGVsLmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDEwMCAtIHNob3dJZHgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi4vYXNzZXRzL2hvdGVscGluLW1hcC5zdmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsT3JpZ2luOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoeE9yaWdpbiwgMTUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6XCJcIisoc2hvd0lkeCkrXCLsnIRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOlwid2hpdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOictMXB4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLm1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5pbmZvd2luZG93Lm9wZW4obWFwLCBob3RlbC5tYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmhvdGVsQ2FyZFdyYXBbaWQ9J1wiICsgaGlkICsgXCInXVwiKS5hZGRDbGFzcyhcImhvdGVsRnJpZW5kT3ZlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvdGFsSGVpZ2h0ID0gJChcIi5ob3RlbHNcIikuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXRTY3JvbGwgPSAkKFwiLmhvdGVsQ2FyZFdyYXBbaWQ9J1wiICsgaGlkICsgXCInXVwiKS5wb3NpdGlvbigpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRTY3JvbGwgPSAkKFwiLmhvdGVsc1wiKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRhcmdldFNjcm9sbCA+IHRvdGFsSGVpZ2h0IC0gMTAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuaG90ZWxzXCIpLnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3A6Y3VycmVudFNjcm9sbCArIHRhcmdldFNjcm9sbCAtIDEwMH0sIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRhcmdldFNjcm9sbDwwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuaG90ZWxzXCIpLnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3A6Y3VycmVudFNjcm9sbCArIHRhcmdldFNjcm9sbCAtIDEwMH0sIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwubWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuaW5mb3dpbmRvdy5jbG9zZShtYXAsIGhvdGVsLm1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuaG90ZWxDYXJkV3JhcFtpZD0nXCIgKyBoaWQgKyBcIiddXCIpLnJlbW92ZUNsYXNzKFwiaG90ZWxGcmllbmRPdmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNob3dDYXJkKDApXHJcbiAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dEZXRhaWw6IGZ1bmN0aW9uKGhpZCwgcmFuaywgc2VsZWN0ZWQsIGNoZWNrSW4sIGNoZWNrT3V0KXtcclxuICAgICAgICBjb25zb2xlLmxvZyhyYW5rKVxyXG4gICAgICAgICQoXCIuaG90ZWxEZXRhaWwgLmluZm9cIikuaHRtbChcIlwiKVxyXG4gICAgICAgICQoXCIud3JhcF9ob3RlbERldGFpbFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgIGxldCBob3RlbCA9IHRoaXMuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgIGxldCBzdGFyID0gaG90ZWwuc3RhcjtcclxuICAgICAgICBsZXQgaGFsZlN0YXIgPSBmYWxzZTtcclxuICAgICAgICBpZihzdGFyJTEgPT09IDAuNSl7XHJcbiAgICAgICAgICAgIHN0YXIgLT0gMC41O1xyXG4gICAgICAgICAgICBoYWxmU3RhciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmhvdGVsRGV0YWlsIC5yYW5rXCIpLmh0bWwoKHJhbmsrMSkrXCLsnIRcIik7XHJcbiAgICAgICAgJChcIi5ob3RlbERldGFpbCAuaG90ZWxOYW1lX2tvXCIpLmh0bWwoaG90ZWwubmFtZS5rbyk7XHJcbiAgICAgICAgJChcIi5ob3RlbERldGFpbCAuaG90ZWxOYW1lX2VuXCIpLmh0bWwoaG90ZWwubmFtZS5lbik7XHJcbiAgICAgICAgJChcIi5zdGFyQW5kUmF0aW5nPi5pY29uXCIpLnJlbW92ZUNsYXNzKFwiaWNvbi0tc3RhcnMtaGFsZiBpY29uLS1zdGFycy1lbXB0eSBpY29uLS1zdGFycy1mdWxsXCIpXHJcblxyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNTsgaisrKSB7XHJcbiAgICAgICAgICAgIGlmKGo8c3Rhcil7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnN0YXJBbmRSYXRpbmc+Lmljb25cIikuZXEoaikuYWRkQ2xhc3MoXCJpY29uLS1zdGFycy1mdWxsXCIpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihqPT09c3RhciAmJiBoYWxmU3Rhcil7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnN0YXJBbmRSYXRpbmc+Lmljb25cIikuZXEoaikuYWRkQ2xhc3MoXCJpY29uLS1zdGFycy1oYWxmXCIpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuc3RhckFuZFJhdGluZz4uaWNvblwiKS5lcShqKS5hZGRDbGFzcyhcImljb24tLXN0YXJzLWVtcHR5XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIuaG90ZWxEZXRhaWwgLnJhdGluZ1Njb3JlXCIpLmh0bWwoaG90ZWwuZ3JhZGVfYXZnKTtcclxuICAgICAgICAkKFwiLmhvdGVsRGV0YWlsIC5ob3RlbEltZ1wiKS5hdHRyKFwic3JjXCIsaG90ZWwucGhvdG9bMF0pO1xyXG4gICAgICAgIGlmKCFob3RlbC5waG90byl7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IOydtOuvuOyngCDsl4bripTqsr3smrBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLsnbTrr7jsp4Dsl4bri6RcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgJChcIi5zY29yZU92YWxcIikucmVtb3ZlQ2xhc3MoXCJzb19mdWxsIHNvX2hhbGZcIilcclxuXHJcbiAgICAgICAgaWYoc3RhciUxID09PSAwLjUpe1xyXG4gICAgICAgICAgICBzdGFyIC09IDAuNTtcclxuICAgICAgICAgICAgaGFsZlN0YXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgY3JpdGVyaWEgaW4gaG90ZWwuc2NvcmUpIHtcclxuICAgICAgICAgICAgbGV0IGhhbGZTY29yZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSBob3RlbC5zY29yZVtjcml0ZXJpYV07XHJcbiAgICAgICAgICAgIGlmKHNjb3JlJTEgPT09IDAuNSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSAtPSAwLjU7XHJcbiAgICAgICAgICAgICAgICBoYWxmU2NvcmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoXCIuaG90ZWxEZXRhaWwgLnNjb3JlX1wiK2NyaXRlcmlhKS5odG1sKGhvdGVsLnNjb3JlW2NyaXRlcmlhXSlcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpPHNjb3JlKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLlwiK2NyaXRlcmlhK1wiPi5zY29yZU92YWxcIikuZXEoaSkuYWRkQ2xhc3MoXCJzb19mdWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoaT09PXNjb3JlICYmIGhhbGZTY29yZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5cIitjcml0ZXJpYStcIj4uc2NvcmVPdmFsXCIpLmVxKGkpLmFkZENsYXNzKFwic29faGFsZlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VsdEFycmF5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3RlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihzZWxlY3RlZFtpXSl7XHJcbiAgICAgICAgICAgICAgICBzZWx0QXJyYXkucHVzaChpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmb290QXJyYXkgPSBbXTtcclxuICAgICAgICBsZXQgZm9vdERpc3RhbmNlQXJyYXkgPSBbXTtcclxuICAgICAgICBsZXQgdHJhbnNpdEFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGlmKGhvdGVsLnNwb3RzLmZvb3Qpe1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvdGVsLnNwb3RzLmZvb3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzaWQgPSBob3RlbC5zcG90cy5mb290W2ldLmlkO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VsdEFycmF5LmluY2x1ZGVzKHNpZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RBcnJheS5wdXNoKHNpZClcclxuICAgICAgICAgICAgICAgICAgICBmb290RGlzdGFuY2VBcnJheS5wdXNoKGhvdGVsLnNwb3RzLmZvb3RbaV0uZGlzdGFuY2UpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWx0QXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpZCA9IHNlbHRBcnJheVtpXVxyXG4gICAgICAgICAgICBpZihob3RlbC5zcG90cy50cmFuc3BvcnRbc2lkXSl7XHJcbiAgICAgICAgICAgICAgICBpZighZm9vdEFycmF5LmluY2x1ZGVzKHNpZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRBcnJheS5wdXNoKHNpZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCB0ZXh0X3Nwb3QgPSBcIlwiXHJcblxyXG4gICAgICAgIGlmKGZvb3RBcnJheS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIHRleHRfc3BvdCArPSBcIuyEoO2Dne2VnCBcIiArIHNlbHRBcnJheS5sZW5ndGggKyBcIuqwnCDspJEgXCIgKyBmb290QXJyYXkubGVuZ3RoK1wi6rCc7J2YIOq0gOq0keyngOqwgCDrj4Trs7QgMjDrtoTqsbDrpqwg7J2064K07JeQIOychOy5mO2VmOqzoCDsnojqs6AsIFwiO1xyXG4gICAgICAgICAgICB0ZXh0X3Nwb3QgKz0gXCLrgpjrqLjsp4AgXCIrKHNlbHRBcnJheS5sZW5ndGggLSBmb290QXJyYXkubGVuZ3RoKSArXCLqsJwg7KSRIFwiK3RyYW5zaXRBcnJheS5sZW5ndGgrXCLqsJzsnZgg6rSA6rSR7KeA66W8IOyngO2VmOyyoOuhnCDtmZjsirkg7JeG7J20IOqwiCDsiJgg7J6I7Iq164uI64ukLlwiXHJcbiAgICAgICAgfWVsc2UgaWYodHJhbnNpdEFycmF5Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgdGV4dF9zcG90ICs9IFwi7ISg7YOd7ZWcIFwiICsgc2VsdEFycmF5Lmxlbmd0aCArIFwi6rCc7J2YIOq0gOq0keyngCDspJEg64+E67O066GcIOqwiCDsiJgg7J6I64qUIOq0gOq0keyngOuKlCDsl4bsp4Drp4wgXCI7XHJcbiAgICAgICAgICAgIHRleHRfc3BvdCArPSB0cmFuc2l0QXJyYXkubGVuZ3RoK1wi6rCc7J2YIOq0gOq0keyngOulvCDsp4DtlZjssqDroZwg7ZmY7Iq5IOyXhuydtCDqsIgg7IiYIOyeiOyKteuLiOuLpC5cIlxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0ZXh0X3Nwb3QgKz0gXCLshKDtg53tlZwg6rSA6rSR7KeA6rCAIOuEiOustCDsoIHslrQg6rSA6rSR7KeAIOygkeq3vOyEseydhCDqs4TsgrDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRleHRfdHJhbnNpdCA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmKGhvdGVsLm1ldHJvKXtcclxuICAgICAgICAgICAgbGV0IG1ldEFycmF5ID0gT2JqZWN0LmtleXMoaG90ZWwub3duTWV0cm8pO1xyXG4gICAgICAgICAgICB0ZXh0X3RyYW5zaXQgKz0gXCLrj4Trs7QgMTDrtoTqsbDrpqwg7J2064K07JeQIFwiK2hvdGVsLm1ldHJvLmxlbmd0aCtcIuqwnOydmCDsp4DtlZjssqAg7Jet7J20IOyeiOqzoCwg7KeA64KY64qUIOuFuOyEoOydgCBcIlxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGV4dF90cmFuc2l0ICs9ICc8c3BhbiBjbGFzcz1cImxpbmVOYW1lIGxuXycrbWV0QXJyYXlbaV0rJ1wiPicrbWV0QXJyYXlbaV0rJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRleHRfdHJhbnNpdCArPVwiIOyeheuLiOuLpC4gXCJcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGV4dF90cmFuc2l0ICs9IFwi7KO867OA7JeQIOyngO2VmOyyoCDsl63snbQg7JeG7Iq164uI64ukIVwiXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChob3RlbC5zY29yZS50cmFuc2l0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHRleHRfdHJhbnNpdCs9XCLrjIDspJHqtZDthrXsnZgg7LWc6rOgIOyalOyngOyXkCDsnITsuZjtlZwg7IiZ7IaM7J6F64uI64ukLlwiXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgNC41OlxyXG4gICAgICAgICAgICAgICAgdGV4dF90cmFuc2l0Kz1cIuuMgOykkeq1kO2GteydhCDsnbTsmqntlZjquLAg66ek7JqwIO2OuOumrO2VnCDsnITsuZjsl5Ag7J6I64qUIOyImeyGjOyeheuLiOuLpC5cIlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICB0ZXh0X3RyYW5zaXQrPVwi7KO867OAIOuMgOykkeq1kO2GteydtCDsnpgg67Cc64us65CcIO2OuOyeheuLiOuLpC5cIlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0ZXh0X3RyYW5zaXQrPVwiXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0ZXh0X3NhZmV0eSA9IFwiXCI7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoaG90ZWwuYXJlYSl7XHJcbiAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgIHRleHRfc2FmZXR5Kz1cIuuJtOyalSDrp6jtlbTtirwg64K07JeQ7ISc64+EIOycoOuPmeyduOq1rOqwgCDqsIDsnqUg66eO7J2AIO2DgOyehOyKpO2AmOyWtCDrtoDqt7zsl5Ag7JyE7LmY7ZWcIOyImeyGjOyeheuLiOuLpC4gXCJcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGV4dF9zYWZldHkrPVwi64m07JqVIOunqO2VtO2KvCDrgrTsl5DshJzrj4Qg7JWI7KCE7ZWcIO2OuOyXkCDsho3tlZjripQg6riI7Jy17KeA6rWs7JeQIOychOy5mO2VnCDsiJnshozsnoXri4jri6QuIFwiXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgIHRleHRfc2FmZXR5Kz1cIuuJtOyalSDrgrQg7LWc7IOB66WY7Li17J20IOqxsOyjvO2VmOuKlCDslrTtjbwg7J207Iqk7Yq4IOyCrOydtOuTnOyXkCDsnITsuZjtlZwg7IiZ7IaM7J6F64uI64ukLiBcIlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0ZXh0X3NhZmV0eSs9XCJcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaG90ZWwuc2NvcmUuc2FmZXR5PjQuNCl7XHJcbiAgICAgICAgICAgIGlmKGhvdGVsLnNjb3JlLmZhY2lsaWN5PjQuNCl7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbC5wb2xpY2VTdGF0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0X3NhZmV0eSs9XCLso7zrs4Dsl5Ag7IOB7KCQ7J20IOunjuydtCDsnojsnLzrqbAg6rK97LCw7ISc6rCAIOqwgOq5jOyatCDqs7Psl5Ag7J6I7Ja0IOq1ieyepe2eiCDslYjsoITtlanri4jri6QuXCJcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGhvdGVsLnNjb3JlLnRyYW5zaXQgPiA0LjQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHRfc2FmZXR5Kz1cIuyjvOuzgOyXkCDsg4HsoJDsnbQg66eO6rOgIOyngO2VmOyyoOyXreydtCDqsIDquYzsmrQg6rOz7JeQIOyeiOyWtCDrsKQg64qm6rKMIOuLpOuLiOq4sOyXkOuPhCDrgpjsgZjsp4Ag7JWK7Iq164uI64ukLlwiXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBcIuyjvOuzgOyXkCDsg4HsoJAg65OxIO2OuOydmOyLnOyEpOydtCDsnpgg6rCW7LaU7Ja07KC4IOyeiOyWtCDsoITrsJjsoIHsnLzroZwg7LmY7JWI7J20IOyii+yKteuLiOuLpC5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihob3RlbC5sb2NhbC5wb2xpY2VTdGF0aW9uKXtcclxuICAgICAgICAgICAgICAgIHRleHRfc2FmZXR5Kz1cIuqyveywsOyEnOqwgCDqsIDquYzsmrQg6rOz7JeQIOyeiOyWtCDqtYnsnqXtnogg7JWI7KCE7ZWp64uI64ukLlwiXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGhvdGVsLnNjb3JlLnRyYW5zaXQgPiA0LjQpe1xyXG4gICAgICAgICAgICAgICAgdGV4dF9zYWZldHkrPVwi7KeA7ZWY7LKg7Jet7J20IOqwgOq5jOyatCDqs7Psl5Ag7J6I7Ja0IOuwpCDriqbqsowg64uk64uI6riw7JeQ64+EIOuCmOyBmOyngCDslYrsirXri4jri6QuXCJcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0ZXh0X3NhZmV0eSs9XCLsuZjslYjsnbQg7KKL7J2AIO2OuOyeheuLiOuLpC5cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYoaG90ZWwuc2NvcmUuc2FmZXR5PjMuNCl7XHJcbiAgICAgICAgICAgIGlmKGhvdGVsLnNjb3JlLmZhY2lsaWN5PjQuNCl7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5zY29yZS50cmFuc2l0ID4gNC40KXtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0X3NhZmV0eSs9XCLso7zrs4Dsl5Ag7IOB7KCQ7J20IOunjuqzoCDsp4DtlZjssqDsl63snbQg6rCA6rmM7Jq0IOqzs+yXkCDsnojslrQg7LmY7JWI7J20IOq0nOywruydgCDtjrjsnoXri4jri6QuXCJcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHRfc2FmZXR5Kz1cIuyjvOuzgOyXkCDtjrjsnZjsi5zshKTsnbQg7J6YIOqwluy2lOyWtOynhCDtjrjsnbTrnbwg7LmY7JWI7J20IOq0nOywruydgCDtjrjsnoXri4jri6QuXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYoaG90ZWwuc2NvcmUudHJhbnNpdCA+IDQuNCl7XHJcbiAgICAgICAgICAgICAgICB0ZXh0X3NhZmV0eSs9XCLsp4DtlZjssqDsl63snbQg6rCA6rmM7Jq0IOqzs+yXkCDsnojslrQg7LmY7JWI7J20IOq0nOywruydgCDtjrjsnoXri4jri6QuXCJcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0ZXh0X3NhZmV0eSs9XCLsuZjslYjsnbQg64KY7IGY7KeA64qUIOyViuyKteuLiOuLpC5cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRleHRfc2FmZXR5Kz1cIuydtCDsiJnshowg7KO867OA7KeA7Jet7J2YIOy5mOyViOydgCDrs7TthrUg7IiY7KSA7J6F64uI64ukLlwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGV4dF9mYWNpbGl0eSA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmKGhvdGVsLnNjb3JlLmZhY2lsaXR5ID4gNC40KXtcclxuICAgICAgICAgICAgdGV4dF9mYWNpbGl0eSArPSBcIuyjvOuzgCDtjrjsnZjsi5zshKTsnbQg7J6YIO2YleyEseuQmOyWtCDsnojsirXri4jri6QuIFwiXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmdyb2NlcnkubmVhcmVzdDwxNTApe1xyXG4gICAgICAgICAgICAgICAgdGV4dF9mYWNpbGl0eSArPSBcIuqwgOyepSDqsIDquYzsmrQg7Iud66OM7ZKI7KCQ7J20IOuPhOuztCAxfjLrtoTqsbDrpqwg64K07JeQIOychOy5mO2VmOqzoCDsnojsirXri4jri6QuXCJcclxuICAgICAgICAgICAgfWVsc2UgaWYoaG90ZWwubG9jYWwuZ3JvY2VyeS5uZWFyZXN0PDIwMCl7XHJcbiAgICAgICAgICAgICAgICB0ZXh0X2ZhY2lsaXR5ICs9IFwi6rCA7J6lIOqwgOq5jOyatCDsi53ro4ztkojsoJDsnbQg64+E67O0IDN+NOu2hOqxsOumrCDrgrTsl5Ag7JyE7LmY7ZWY6rOgIOyeiOyKteuLiOuLpC5cIlxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRleHRfZmFjaWxpdHkgKz0gXCLsiJnshowg7KO867OA7JeQIOunjuydgCDsi53ro4ztkojsoJDrk6TsnbQg7J6I7Iq164uI64ukLlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSBpZihob3RlbC5zY29yZS5mYWNpbGl0eSA9PT0gNCl7XHJcbiAgICAgICAgICAgIHRleHRfZmFjaWxpdHkgKz0gXCLso7zrs4Ag7Y647J2Y7Iuc7ISk7J20IOyemCDtmJXshLHrkJwg7Y647J6F64uI64ukLiBcIlxyXG4gICAgICAgICAgICBpZihob3RlbC5sb2NhbC5ncm9jZXJ5Lm5lYXJlc3Q8MTUwKXtcclxuICAgICAgICAgICAgICAgIHRleHRfZmFjaWxpdHkgKz0gXCLqsIDsnqUg6rCA6rmM7Jq0IOyLneujjO2SiOygkOydtCDrj4Trs7QgMX4y67aE6rGw66asIOuCtOyXkCDsnITsuZjtlZjqs6Ag7J6I7Iq164uI64ukLlwiXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGhvdGVsLmxvY2FsLmdyb2NlcnkubmVhcmVzdDwyMDApe1xyXG4gICAgICAgICAgICAgICAgdGV4dF9mYWNpbGl0eSArPSBcIuqwgOyepSDqsIDquYzsmrQg7Iud66OM7ZKI7KCQ7J20IOuPhOuztCAzfjTrtoTqsbDrpqwg64K07JeQIOychOy5mO2VmOqzoCDsnojsirXri4jri6QuXCJcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0ZXh0X2ZhY2lsaXR5ICs9IFwi7IiZ7IaMIOyjvOuzgOyXkCDsi53ro4ztkojsoJDrk6TsnbQg7J6I7Iq164uI64ukLlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGV4dF9mYWNpbGl0eSArPSBcIuydtCDsiJnshowg7KO867OA7KeA7Jet7J2YIO2OuOydmOyLnOyEpOydgCDrs7TthrUg7IiY7KSA7J6F64uI64ukLlwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmhvdGVsRGV0YWlsIC5pbmZvVHh0XCIpLmVxKDApLmh0bWwodGV4dF9zcG90KVxyXG4gICAgICAgICQoXCIuaG90ZWxEZXRhaWwgLmluZm9UeHRcIikuZXEoMSkuaHRtbCh0ZXh0X3RyYW5zaXQpXHJcbiAgICAgICAgJChcIi5ob3RlbERldGFpbCAuaW5mb1R4dFwiKS5lcSgyKS5odG1sKHRleHRfc2FmZXR5KVxyXG4gICAgICAgICQoXCIuaG90ZWxEZXRhaWwgLmluZm9UeHRcIikuZXEoMykuaHRtbCh0ZXh0X2ZhY2lsaXR5KVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhob3RlbCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgbGV0IGZvb3RUeHQgPSBcIlwiO1xyXG4gICAgICAgIGxldCBtZXRyb1R4dCA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmKGZvb3RBcnJheS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm9vdEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IFNwb3RzLmxpc3RbZm9vdEFycmF5W2ldXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb290VHh0ICs9ICc8ZGl2IGNsYXNzPVwic3BvdENhcmRXcmFwcGVyIHNlbGVjdGVkXCI+PGRpdiBjbGFzcz1cInNwb3RDYXJkXCI+PGRpdiBjbGFzcz1cImltZ1NpemVyXCI+PGltZyBjbGFzcz1cImltZ091dFwiIHNyYz1cIi4vYXNzZXRzL2ltYWdlLW91dC5wbmdcIj4nO1xyXG4gICAgICAgICAgICAgICAgZm9vdFR4dCArPSAnPGRpdiBjbGFzcz1cImluZm9JbWFnZSBueV8nK2Zvb3RBcnJheVtpXSsnXCI+PC9kaXY+PC9kaXY+PHAgY2xhc3M9XCJyYW5rXCI+JysoZGF0YS5yYW5rKzEpKyfsnIQ8L3A+PGRpdiBjbGFzcz1cImNvbnRlbnRzXCI+JztcclxuICAgICAgICAgICAgICAgIGZvb3RUeHQgKz0gJzxwIGNsYXNzPVwibmFtZV9rbyBrb1wiPicrZGF0YS5uYW1lKyc8L3A+PHAgY2xhc3M9XCJuYW1lX2VuXCI+JytkYXRhLm5hbWUrJzwvcD48cCBjbGFzcz1cImRlc2NyaXB0aW9uXCI+JytkYXRhLmRlc2NyaXB0aW9uKyc8L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgZm9vdFR4dCArPSAnPGRpdiBjbGFzcz1cImZvb3RlclwiPjxwPuyImeyGjOuhnOu2gO2EsCAnK2Zvb3REaXN0YW5jZUFycmF5W2ldKydtPC9wPjwvZGl2PjwvZGl2PjwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaG90ZWwuc3BvdHMuZm9vdCl7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaG90ZWwuc3BvdHMuZm9vdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNpZCA9IGhvdGVsLnNwb3RzLmZvb3RbaV0uaWQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBob3RlbC5zcG90cy5mb290W2ldLmRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgaWYoIWZvb3RBcnJheS5pbmNsdWRlcyhzaWQpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IFNwb3RzLmxpc3Rbc2lkXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb290VHh0ICs9ICc8ZGl2IGNsYXNzPVwic3BvdENhcmRXcmFwcGVyIHVuU2VsZWN0ZWRcIj48ZGl2IGNsYXNzPVwic3BvdENhcmRcIj48ZGl2IGNsYXNzPVwiaW1nU2l6ZXJcIj48aW1nIGNsYXNzPVwiaW1nT3V0XCIgc3JjPVwiLi9hc3NldHMvaW1hZ2Utb3V0LnBuZ1wiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdFR4dCArPSAnPGRpdiBjbGFzcz1cImluZm9JbWFnZSBueV8nK3NpZCsnXCI+PC9kaXY+PC9kaXY+PHAgY2xhc3M9XCJyYW5rXCI+JysoZGF0YS5yYW5rKzEpKyfsnIQ8L3A+PGRpdiBjbGFzcz1cImNvbnRlbnRzXCI+JztcclxuICAgICAgICAgICAgICAgICAgICBmb290VHh0ICs9ICc8cCBjbGFzcz1cIm5hbWVfa28ga29cIj4nK2RhdGEubmFtZSsnPC9wPjxwIGNsYXNzPVwibmFtZV9lblwiPicrZGF0YS5uYW1lKyc8L3A+PHAgY2xhc3M9XCJkZXNjcmlwdGlvblwiPicrZGF0YS5kZXNjcmlwdGlvbisnPC9wPjwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICBmb290VHh0ICs9ICc8ZGl2IGNsYXNzPVwiZm9vdGVyXCI+PHA+7IiZ7IaM66Gc67aA7YSwICcrZGlzdGFuY2UrJ208L3A+PC9kaXY+PC9kaXY+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0cmFuc2l0QXJyYXkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRyYW5zaXRBcnJheS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNpZCA9IHRyYW5zaXRBcnJheVtqXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IFNwb3RzLmxpc3RbdHJhbnNpdEFycmF5W2pdXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaG93VG9HbyA9IFwiXCJcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lID0gaG90ZWwuc3BvdHMudHJhbnNwb3J0W3NpZF0ubGluZTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWV0cm9EaXN0YW5jZSA9IDBcclxuICAgICAgICAgICAgICAgIGxldCBuZWFyTWV0cm9Gcm9tSG90ZWwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICBsZXQgaG93RmFyRnJvbUhvdGVsID0gMjAwMDtcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lTmFtZSA9IFwiXCJcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLm93bk1ldHJvW2xpbmVbaV1dLmRpc3RhbmNlPGhvd0ZhckZyb21Ib3RlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvd0ZhckZyb21Ib3RlbCA9IGhvdGVsLm93bk1ldHJvW2xpbmVbaV1dLmRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWFyTWV0cm9Gcm9tSG90ZWwgPSBob3RlbC5vd25NZXRyb1tsaW5lW2ldXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lTmFtZSA9IGxpbmVbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvRGlzdGFuY2UgPSBob3RlbC5zcG90cy50cmFuc3BvcnRbc2lkXS5kaXN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWV0cm90aW1lID0gMSArIE1hdGgucm91bmQobWV0cm9EaXN0YW5jZS80MDApXHJcbiAgICAgICAgICAgICAgICBsZXQgdGltZUZyb21Ib3RlbCA9IE1hdGgucm91bmQoaG93RmFyRnJvbUhvdGVsLzcwKVxyXG4gICAgICAgICAgICAgICAgbGV0IHRTcG90ID0gU3BvdHMubGlzdFtzaWRdLm1ldHJvO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuZWFyTWV0cm9Gcm9tU3BvdCA9IFwiXCJcclxuICAgICAgICAgICAgICAgIGxldCBob3dGYXJGcm9tU3BvdCA9IDIwMDBcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRTcG90Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodFNwb3RbaV0ubGluZS5pbmNsdWRlcyhsaW5lTmFtZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0U3BvdFtpXS5kaXN0YW5jZSA8IGhvd0ZhckZyb21TcG90KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJNZXRyb0Zyb21TcG90ID0gdFNwb3RbaV0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvd0ZhckZyb21TcG90ID0gdFNwb3RbaV0uZGlzdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB0aW1lRnJvbVNwb3QgPSBNYXRoLnJvdW5kKGhvd0ZhckZyb21TcG90LzcwKVxyXG4gICAgICAgICAgICAgICAgbGV0IHRvdGFsVGltZSA9IHRpbWVGcm9tU3BvdCArIG1ldHJvdGltZSArIHRpbWVGcm9tSG90ZWw7XHJcblxyXG4gICAgICAgICAgICAgICAgaG93VG9Hbys9JzxwPuyImeyGjOyXkOyEnCA8c3BhbiBjbGFzcz1cImxpbmVOYW1lIGxuXycrbGluZU5hbWUrJ1wiPicrbGluZU5hbWUrJzwvc3Bhbj4gJytuZWFyTWV0cm9Gcm9tSG90ZWwrJ+q5jOyngCDrj4Trs7TsnbTrj5ko7JW9ICcrdGltZUZyb21Ib3RlbCsn67aELCAnK2hvd0ZhckZyb21Ib3RlbCsnbSknKyc8L3A+J1xyXG4gICAgICAgICAgICAgICAgaG93VG9Hbys9JzxwPjxzcGFuIGNsYXNzPVwibGluZU5hbWUgbG5fJytsaW5lTmFtZSsnXCI+JytsaW5lTmFtZSsnPC9zcGFuPiAnK25lYXJNZXRyb0Zyb21TcG90Kyfsl5DshJwg7ZWY7LCoICjslb0gJyttZXRyb3RpbWUrJ+u2hCknKyc8L3A+J1xyXG4gICAgICAgICAgICAgICAgaG93VG9Hbys9JzxwPicrZGF0YS5uYW1lKyfquYzsp4Ag64+E67O07J2064+ZKOyVvSAnK3RpbWVGcm9tU3BvdCsn67aELCAnK2hvd0ZhckZyb21TcG90KydtKScrJzwvcD4nXHJcblxyXG4gICAgICAgICAgICAgICAgbWV0cm9UeHQgKz0gJzxkaXYgY2xhc3M9XCJzcG90Q2FyZFdyYXBwZXIgc2VsZWN0ZWRcIj48ZGl2IGNsYXNzPVwic3BvdENhcmRcIj48ZGl2IGNsYXNzPVwiaW1nU2l6ZXJcIj48aW1nIGNsYXNzPVwiaW1nT3V0XCIgc3JjPVwiLi9hc3NldHMvaW1hZ2Utb3V0LnBuZ1wiPic7XHJcbiAgICAgICAgICAgICAgICBtZXRyb1R4dCArPSAnPGRpdiBjbGFzcz1cImluZm9JbWFnZSBueV8nK3RyYW5zaXRBcnJheVtqXSsnXCI+PC9kaXY+PC9kaXY+PHAgY2xhc3M9XCJyYW5rXCI+JysoZGF0YS5yYW5rKzEpKyfsnIQ8L3A+PGRpdiBjbGFzcz1cImNvbnRlbnRzXCI+JztcclxuICAgICAgICAgICAgICAgIG1ldHJvVHh0ICs9ICc8cCBjbGFzcz1cIm5hbWVfa28ga29cIj4nK2RhdGEubmFtZSsnPC9wPjxwIGNsYXNzPVwibmFtZV9lblwiPicrZGF0YS5uYW1lKyc8L3A+PGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+Jytob3dUb0dvKyc8L2Rpdj48L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICBtZXRyb1R4dCArPSAnPGRpdiBjbGFzcz1cImZvb3RlclwiPjxwPuyVvSAnK3RvdGFsVGltZSsn67aEIOyGjOyalDwvcD48L2Rpdj48L2Rpdj48L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGhvdGVsLnNwb3RzLnRyYW5zcG9ydCl7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgT2JqZWN0LmtleXMoaG90ZWwuc3BvdHMudHJhbnNwb3J0KS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNpZCA9ICBPYmplY3Qua2V5cyhob3RlbC5zcG90cy50cmFuc3BvcnQpW2pdKjFcclxuICAgICAgICAgICAgICAgIGlmKCF0cmFuc2l0QXJyYXkuaW5jbHVkZXMoc2lkKSYmIWZvb3RBcnJheS5pbmNsdWRlcyhzaWQpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IFNwb3RzLmxpc3Rbc2lkXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgaG93VG9HbyA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IGhvdGVsLnNwb3RzLnRyYW5zcG9ydFtzaWRdLmxpbmU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXRyb0Rpc3RhbmNlID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZWFyTWV0cm9Gcm9tSG90ZWwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhvd0ZhckZyb21Ib3RlbCA9IDIwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmVOYW1lID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5vd25NZXRyb1tsaW5lW2ldXS5kaXN0YW5jZTxob3dGYXJGcm9tSG90ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG93RmFyRnJvbUhvdGVsID0gaG90ZWwub3duTWV0cm9bbGluZVtpXV0uZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyTWV0cm9Gcm9tSG90ZWwgPSBob3RlbC5vd25NZXRyb1tsaW5lW2ldXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZU5hbWUgPSBsaW5lW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0cm9EaXN0YW5jZSA9IGhvdGVsLnNwb3RzLnRyYW5zcG9ydFtzaWRdLmRpc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXRyb3RpbWUgPSAxICsgTWF0aC5yb3VuZChtZXRyb0Rpc3RhbmNlLzQwMClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZUZyb21Ib3RlbCA9IE1hdGgucm91bmQoaG93RmFyRnJvbUhvdGVsLzcwKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0U3BvdCA9IFNwb3RzLmxpc3Rbc2lkXS5tZXRybztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5lYXJNZXRyb0Zyb21TcG90ID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBob3dGYXJGcm9tU3BvdCA9IDIwMDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0U3BvdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0U3BvdFtpXS5saW5lLmluY2x1ZGVzKGxpbmVOYW1lKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0U3BvdFtpXS5kaXN0YW5jZSA8IGhvd0ZhckZyb21TcG90KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyTWV0cm9Gcm9tU3BvdCA9IHRTcG90W2ldLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG93RmFyRnJvbVNwb3QgPSB0U3BvdFtpXS5kaXN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lRnJvbVNwb3QgPSBNYXRoLnJvdW5kKGhvd0ZhckZyb21TcG90LzcwKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3RhbFRpbWUgPSB0aW1lRnJvbVNwb3QgKyBtZXRyb3RpbWUgKyB0aW1lRnJvbUhvdGVsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBob3dUb0dvKz0nPHA+7IiZ7IaM7JeQ7IScIDxzcGFuIGNsYXNzPVwibGluZU5hbWUgbG5fJytsaW5lTmFtZSsnXCI+JytsaW5lTmFtZSsnPC9zcGFuPiAnK25lYXJNZXRyb0Zyb21Ib3RlbCsn6rmM7KeAIOuPhOuztOydtOuPmSjslb0gJyt0aW1lRnJvbUhvdGVsKyfrtoQsICcraG93RmFyRnJvbUhvdGVsKydtKScrJzwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgaG93VG9Hbys9JzxwPjxzcGFuIGNsYXNzPVwibGluZU5hbWUgbG5fJytsaW5lTmFtZSsnXCI+JytsaW5lTmFtZSsnPC9zcGFuPiAnK25lYXJNZXRyb0Zyb21TcG90Kyfsl5DshJwg7ZWY7LCoICjslb0gJyttZXRyb3RpbWUrJ+u2hCknKyc8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgIGhvd1RvR28rPSc8cD4nK2RhdGEubmFtZSsn6rmM7KeAIOuPhOuztOydtOuPmSjslb0gJyt0aW1lRnJvbVNwb3QrJ+u2hCwgJytob3dGYXJGcm9tU3BvdCsnbSknKyc8L3A+J1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9UeHQgKz0gJzxkaXYgY2xhc3M9XCJzcG90Q2FyZFdyYXBwZXIgdW5TZWxlY3RlZFwiPjxkaXYgY2xhc3M9XCJzcG90Q2FyZFwiPjxkaXYgY2xhc3M9XCJpbWdTaXplclwiPjxpbWcgY2xhc3M9XCJpbWdPdXRcIiBzcmM9XCIuL2Fzc2V0cy9pbWFnZS1vdXQucG5nXCI+JztcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb1R4dCArPSAnPGRpdiBjbGFzcz1cImluZm9JbWFnZSBueV8nK3NpZCsnXCI+PC9kaXY+PC9kaXY+PHAgY2xhc3M9XCJyYW5rXCI+JysoZGF0YS5yYW5rKzEpKyfsnIQ8L3A+PGRpdiBjbGFzcz1cImNvbnRlbnRzXCI+JztcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb1R4dCArPSAnPHAgY2xhc3M9XCJuYW1lX2tvIGtvXCI+JytkYXRhLm5hbWUrJzwvcD48cCBjbGFzcz1cIm5hbWVfZW5cIj4nK2RhdGEubmFtZSsnPC9wPjxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPicraG93VG9HbysnPC9kaXY+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldHJvVHh0ICs9ICc8ZGl2IGNsYXNzPVwiZm9vdGVyXCI+PHA+7JW9ICcrdG90YWxUaW1lKyfrtoQg7IaM7JqUPC9wPjwvZGl2PjwvZGl2PjwvZGl2PidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5ob3RlbF9mb290XCIpLmh0bWwoZm9vdFR4dCk7XHJcbiAgICAgICAgJChcIi5ob3RlbF9tZXRyb1wiKS5odG1sKG1ldHJvVHh0KTtcclxuXHJcbiAgICAgICAgJChcIi5nb1Jlc2VydmF0aW9uPmFcIikuYXR0cihcImhyZWZcIiwnaHR0cHM6Ly93d3cuYWdvZGEuY29tL3BhcnRuZXJzL3BhcnRuZXJzZWFyY2guYXNweD9jaWQ9MTc5OTg5OCZwY3M9MSZoaWQ9JytoaWQrJyZjaGVja2luPScrY2hlY2tJbisnJmNoZWNrb3V0PScrY2hlY2tPdXQrJyZoMT1rbyZhZHVsdHM9Jyt0aGlzLnBlb3BsZU5vKVxyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb3RlbHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvaG90ZWxzLmpzIiwibGV0IERhdGVQaWNrZXIgPSB7XHJcbiAgICB0ZXh0OiBcIlwiLFxyXG4gICAgaXNGaXJzdDogdHJ1ZSxcclxuICAgIHdlZWtBcnJheTogW1wiKOydvClcIiwgXCIo7JuUKVwiLCBcIijtmZQpXCIsIFwiKOyImClcIiwgXCIo66qpKVwiLCBcIijquIgpXCIsIFwiKO2GoClcIl0sXHJcbiAgICBmaXJzdERhdGU6e30sXHJcbiAgICBzZWNvbmREYXRlOnt9LFxyXG4gICAgZmlyc3REYXRlVHh0OlwiXCIsXHJcbiAgICBzZWNvbmREYXRlVHh0OlwiXCIsXHJcbiAgICB0ZW1wRGF0ZTpcIlwiLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICQoXCIuZGF0ZVBpY2tlclwiKS5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgZGVmYXVsdERhdGU6IFwiKzF3XCIsXHJcblxyXG4gICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2hvb3NlRGF0ZSgkKFwiLmRhdGVQaWNrZXJcIikuZGF0ZXBpY2tlcihcImdldERhdGVcIikpXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIC8v7JWe7J6Q66as66eMIOyEoO2Dne2VmOqzoCDri6vtnowg6rK97JqwIOy0iOq4sO2ZlO2VtOykgOuLpC5cclxuICAgICAgICAgICAgICAgIGlmKCF0aGF0LmlzRmlyc3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGF0YSgnZGF0ZXBpY2tlcicpLmlubGluZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNGaXJzdCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvcmlnaW5EYXRlID0gdGhhdC5maXJzdERhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50ZXh0ID0gKG9yaWdpbkRhdGUuZ2V0TW9udGgoKSsxKStcIuyblCBcIitvcmlnaW5EYXRlLmdldERhdGUoKStcIuydvFwiK3RoYXQud2Vla0FycmF5W29yaWdpbkRhdGUuZ2V0RGF5KCldK1wiIC0gXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luRGF0ZSA9IHRoYXQuc2Vjb25kRGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRleHQgKz0gKG9yaWdpbkRhdGUuZ2V0TW9udGgoKSsxKStcIuyblCBcIitvcmlnaW5EYXRlLmdldERhdGUoKStcIuydvFwiK3RoYXQud2Vla0FycmF5W29yaWdpbkRhdGUuZ2V0RGF5KCldO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuZGF0ZVNob3dlclwiKS5odG1sKHRoYXQudGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5oZF9zaWRlYmFyPi5zdGQ+c3BhblwiKS5lcSgwKS5odG1sKHRoYXQudGV4dClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5maXJzdERhdGUgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgMiAqIDEwMDAgKiA2MCAqIDYwICogMjQpXHJcbiAgICAgICAgdGhpcy5zZWNvbmREYXRlID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIDMgKiAxMDAwICogNjAgKiA2MCAqIDI0KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmlyc3REYXRlKVxyXG4gICAgICAgIHRoaXMuZmlyc3REYXRlVHh0ID0gdGhpcy5mb3JtYXR0ZXIodGhpcy5maXJzdERhdGUpXHJcbiAgICAgICAgdGhpcy5zZWNvbmREYXRlVHh0ID0gdGhpcy5mb3JtYXR0ZXIodGhpcy5zZWNvbmREYXRlKVxyXG5cclxuICAgICAgICBsZXQgZGF0ZSA9IHRoaXMuZmlyc3REYXRlO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IChkYXRlLmdldE1vbnRoKCkrMSkrXCLsm5QgXCIrZGF0ZS5nZXREYXRlKCkrXCLsnbxcIit0aGlzLndlZWtBcnJheVtkYXRlLmdldERheSgpXStcIiAtIFwiO1xyXG4gICAgICAgIGRhdGUgPSB0aGlzLnNlY29uZERhdGU7XHJcbiAgICAgICAgdGhpcy50ZXh0ICs9IChkYXRlLmdldE1vbnRoKCkrMSkrXCLsm5QgXCIrZGF0ZS5nZXREYXRlKCkrXCLsnbxcIit0aGlzLndlZWtBcnJheVtkYXRlLmdldERheSgpXTtcclxuICAgICAgICAkKFwiLmRhdGVTaG93ZXJcIikuaHRtbCh0aGlzLnRleHQpO1xyXG4gICAgICAgICQoXCIuaGRfc2lkZWJhcj4uc3RkPnNwYW5cIikuZXEoMCkuaHRtbCh0aGlzLnRleHQpXHJcbiAgICB9LFxyXG5cclxuICAgIGNob29zZURhdGUoZGF0ZSl7XHJcbiAgICAgICAgaWYodGhpcy5pc0ZpcnN0KXtcclxuICAgICAgICAgICAgJChcIi5kYXRlUGlja2VyXCIpLmRhdGEoJ2RhdGVwaWNrZXInKS5pbmxpbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgPSAoZGF0ZS5nZXRNb250aCgpKzEpK1wi7JuUIFwiK2RhdGUuZ2V0RGF0ZSgpK1wi7J28XCIrdGhpcy53ZWVrQXJyYXlbZGF0ZS5nZXREYXkoKV0rXCIgLSBcIjtcclxuICAgICAgICAgICAgdGhpcy50ZW1wRGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgICQoXCIuZGF0ZVNob3dlclwiKS5odG1sKHRoaXMudGV4dClcclxuICAgICAgICAgICAgdGhpcy5pc0ZpcnN0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKFwiLmRhdGVQaWNrZXJcIikuZGF0YSgnZGF0ZXBpY2tlcicpLmlubGluZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgKz0gKGRhdGUuZ2V0TW9udGgoKSsxKStcIuyblCBcIitkYXRlLmdldERhdGUoKStcIuydvFwiK3RoaXMud2Vla0FycmF5W2RhdGUuZ2V0RGF5KCldO1xyXG4gICAgICAgICAgICAkKFwiLmRhdGVTaG93ZXJcIikuaHRtbCh0aGlzLnRleHQpO1xyXG4gICAgICAgICAgICAkKFwiLmhkX3NpZGViYXI+LnN0ZD5zcGFuXCIpLmVxKDApLmh0bWwodGhpcy50ZXh0KVxyXG4gICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZSA9IHRoaXMudGVtcERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kRGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaXJzdCA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICAgICAgLy/stZzsooXsoIHsnLzroZwg64Kg7KecIOqygOyCrFxyXG4gICAgICAgICAgICBpZih0aGlzLmZpcnN0RGF0ZT50aGlzLnNlY29uZERhdGUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXZlcnNlRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmZpcnN0RGF0ZS5nZXRUaW1lKCkgPT09IHRoaXMuc2Vjb25kRGF0ZS5nZXRUaW1lKCkpe1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzog7Yag7Iqk7Yq4IOudhOyasOq4sFxyXG4gICAgICAgICAgICAgICAgJChcIi5kYXRlU2hvd2VyXCIpLmh0bWwoXCLssrTtgazsnbgt7JWE7JuDIOuCoOynnOqwgCDqsJnsirXri4jri6RcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuqwmeydgCDrgqDsp5zrpbwg7ISg7YOd7ZWY7IWo7Iq164uI64ukLlwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZVR4dCA9ICB0aGlzLmZvcm1hdHRlcih0aGlzLmZpcnN0RGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kRGF0ZVR4dCA9IHRoaXMuZm9ybWF0dGVyKHRoaXMuc2Vjb25kRGF0ZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmlnaHQgPSAodGhpcy5zZWNvbmREYXRlIC0gdGhpcy5maXJzdERhdGUpLygxMDAwICogNjAgKiA2MCAqIDI0KTtcclxuICAgICAgICAgICAgJChcImhlYWRlciAuZGF0ZVJhbmdlXCIpLmh0bWwobmlnaHQrXCLrsJUgXCIrKG5pZ2h0KzEpK1wi7J28XCIpO1xyXG4gICAgICAgICAgICAkKFwiLmhvdGVsRGV0YWlsIC5zdGQ+c3BhblwiKS5lcSgxKS5odG1sKG5pZ2h0K1wi67CVIFwiKyhuaWdodCsxKStcIuydvFwiKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmV2ZXJzZURhdGUoKXtcclxuICAgICAgICBsZXQgdGVtcERhdGUgPSB0aGlzLmZpcnN0RGF0ZTtcclxuICAgICAgICB0aGlzLmZpcnN0RGF0ZSA9IHRoaXMuc2Vjb25kRGF0ZTtcclxuICAgICAgICB0aGlzLnNlY29uZERhdGUgPSB0ZW1wRGF0ZTtcclxuICAgICAgICBsZXQgdGV4dCA9ICQoXCIuZGF0ZVNob3dlclwiKS5odG1sKCkuc3BsaXQoXCIgLSBcIik7XHJcbiAgICAgICAgdGV4dCA9IHRleHRbMV0gKyBcIiAtIFwiICsgdGV4dFswXTtcclxuICAgICAgICAkKFwiLmRhdGVTaG93ZXJcIikuaHRtbCh0ZXh0KTtcclxuICAgICAgICAkKFwiLmhkX3NpZGViYXI+LnN0ZD5zcGFuXCIpLmVxKDApLmh0bWwodGhpcy50ZXh0KVxyXG4gICAgICAgIHRoaXMuZmlyc3REYXRlVHh0ID0gIHRoaXMuZm9ybWF0dGVyKHRoaXMuZmlyc3REYXRlKTtcclxuICAgICAgICB0aGlzLnNlY29uZERhdGVUeHQgPSB0aGlzLmZvcm1hdHRlcih0aGlzLnNlY29uZERhdGUpO1xyXG5cclxuICAgICAgICBsZXQgbmlnaHQgPSAodGhpcy5zZWNvbmREYXRlIC0gdGhpcy5maXJzdERhdGUpLygxMDAwICogNjAgKiA2MCAqIDI0KTtcclxuICAgICAgICAkKFwiaGVhZGVyIC5kYXRlUmFuZ2VcIikuaHRtbChuaWdodCtcIuuwlSBcIisobmlnaHQrMSkrXCLsnbxcIik7XHJcbiAgICAgICAgJChcIi5ob3RlbERldGFpbCAuc3RkPnNwYW5cIikuZXEoMSkuaHRtbChuaWdodCtcIuuwlSBcIisobmlnaHQrMSkrXCLsnbxcIilcclxuICAgIH0sXHJcblxyXG4gICAgZm9ybWF0dGVyOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICBsZXQgbW9udGggPSBcIlwiO1xyXG4gICAgICAgIGxldCBkYXkgPSBcIlwiO1xyXG4gICAgICAgIGlmKGRhdGUuZ2V0TW9udGgoKSsxPDEwKXtcclxuICAgICAgICAgICAgbW9udGggPSBcIjBcIisoZGF0ZS5nZXRNb250aCgpKzEpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG1vbnRoID0gKGRhdGUuZ2V0TW9udGgoKSsxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRlLmdldERhdGUoKTwxMCl7XHJcbiAgICAgICAgICAgIGRheSA9IFwiMFwiK2RhdGUuZ2V0RGF0ZSgpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF0ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCkrXCItXCIrbW9udGgrXCItXCIrZGF5O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXRlUGlja2VyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL0RhdGVQaWNrZXIuanMiXSwic291cmNlUm9vdCI6IiJ9