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
    return false;
});
$(".closeHotelDetail").click(function () {
    $(".wrap_hotelDetail").addClass("displayNone");
});
$("header .peopleWrap .dropBox").change(function () {
    _hotels2.default.peopleNo = $("header .peopleWrap .dropBox").val();
    $(".hd_sidebar>.std>span").eq(2).html($("header .peopleWrap .dropBox").val());
});
$(".hotelDetail").on("click", ".moreFoot", function () {
    _hotels2.default.moreFoot();
    $(this).addClass("displayNone");
});
$(".hotelDetail").on("click", ".moreMetro", function () {
    _hotels2.default.moreMetro();
    $(this).addClass("displayNone");
});
$(".wrap_hotelDetail .iconRight").click(function () {
    return false;
});
$(".wrap_hotelDetail .iconLeft").click(function () {
    return false;
});
$(".hotelDetail").click(function () {
    return false;
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
        var moreFootCount = 0;
        footTxt += '<div class="spotCardWrapper moreFoot displayNone"><p class="moreCount"></p><p>선택 안한 카드 더 보기</p></div>';
        if (hotel.spots.foot) {
            for (var i = 0; i < hotel.spots.foot.length; i++) {
                var _sid2 = hotel.spots.foot[i].id;
                var distance = hotel.spots.foot[i].distance;
                if (!footArray.includes(_sid2)) {
                    var _data = _spots2.default.list[_sid2];
                    moreFootCount++;
                    footTxt += '<div class="spotCardWrapper unSelected displayNone"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
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
        metroTxt += '<div class="spotCardWrapper moreMetro displayNone"><p class="moreCount"></p><p>선택 안한 카드 더 보기</p></div>';
        var moreMetroCount = 0;

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

                    moreMetroCount++;

                    _howToGo += '<p>숙소에서 <span class="lineName ln_' + _lineName + '">' + _lineName + '</span> ' + _nearMetroFromHotel + '까지 도보이동(약 ' + _timeFromHotel + '분, ' + _howFarFromHotel + 'm)' + '</p>';
                    _howToGo += '<p><span class="lineName ln_' + _lineName + '">' + _lineName + '</span> ' + _nearMetroFromSpot + '에서 하차 (약 ' + _metrotime + '분)' + '</p>';
                    _howToGo += '<p>' + _data3.name + '까지 도보이동(약 ' + _timeFromSpot + '분, ' + _howFarFromSpot + 'm)' + '</p>';

                    metroTxt += '<div class="spotCardWrapper unSelected displayNone"><div class="spotCard"><div class="imgSizer"><img class="imgOut" src="./assets/image-out.png">';
                    metroTxt += '<div class="infoImage ny_' + _sid4 + '"></div></div><p class="rank">' + (_data3.rank + 1) + '위</p><div class="contents">';
                    metroTxt += '<p class="name_ko ko">' + _data3.name + '</p><p class="name_en">' + _data3.name + '</p><div class="description">' + _howToGo + '</div></div>';
                    metroTxt += '<div class="footer"><p>약 ' + _totalTime + '분 소요</p></div></div></div>';
                }
            }
        }

        $(".hotel_foot").html(footTxt);
        $(".hotel_metro").html(metroTxt);

        if (moreFootCount > 0) {
            $(".moreFoot").removeClass("displayNone");
            $(".moreFoot .moreCount").html("+ " + moreFootCount);
        }
        if (moreMetroCount > 0) {
            $(".moreMetro").removeClass("displayNone");
            $(".moreMetro .moreCount").html("+ " + moreMetroCount);
        }

        $(".goReservation>a").attr("href", 'https://www.agoda.com/partners/partnersearch.aspx?cid=1799898&pcs=1&hid=' + hid + '&checkin=' + checkIn + '&checkout=' + checkOut + '&h1=ko&adults=' + this.peopleNo);
    },

    moreFoot: function moreFoot() {
        $(".hotel_foot .unSelected").removeClass("displayNone");
    },

    moreMetro: function moreMetro() {
        $(".hotel_metro .unSelected").removeClass("displayNone");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjllOTU2ZWQxYjAzYWUyNmZlMzkiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zcG90cy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9ob3RlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9EYXRlUGlja2VyLmpzIl0sIm5hbWVzIjpbIlNwb3RzIiwibGlzdCIsImluZiIsImNvdW50Iiwic2hvdyIsInJlc3RvcmVBcnJheSIsInNlbGVjdGVkIiwiaW5pdCIsImRhdGEiLCIkIiwicmVtb3ZlQ2xhc3MiLCJ0aGF0IiwiaSIsImNoZWNrZWQiLCJwdXNoIiwibWFya2VyIiwiZ29vZ2xlIiwibWFwcyIsIk1hcmtlciIsInBvc2l0aW9uIiwiY29vciIsIm1hcCIsImljb24iLCJyYW5rIiwidHh0IiwibmFtZSIsInRhZyIsImRlc2NyaXB0aW9uIiwiaW5mb3dpbmRvdyIsIkluZm9XaW5kb3ciLCJjb250ZW50IiwiYWRkTGlzdGVuZXIiLCJvcGVuIiwiYWRkQ2xhc3MiLCJmaW5kIiwiY3NzIiwidG90YWxIZWlnaHQiLCJoZWlnaHQiLCJ0YXJnZXRTY3JvbGwiLCJ0b3AiLCJjdXJyZW50U2Nyb2xsIiwic2Nyb2xsVG9wIiwic3RvcCIsImFuaW1hdGUiLCJjbG9zZSIsImxlbmd0aCIsImluZmxhdGUiLCJpY29uV2VsbCIsInNpemUiLCJoaSIsImNhcmQiLCJpbmZvIiwidXBkYXRlQ291bnQiLCJodG1sIiwiY2hlY2tSZXN1bHQiLCJzZXRJY29uIiwiaGlkZSIsIm1vdXNlT3ZlciIsInNldEFuaW1hdGlvbiIsIkFuaW1hdGlvbiIsIkJPVU5DRSIsImNhcmRPdmVyIiwiY2FyZE92ZXJfc2Nyb2xsIiwiY2FyZE91dCIsIm1vdXNlT3V0IiwiY2hlY2tBbGwiLCJsaXN0ZW4iLCJ1bkNoZWNrQWxsIiwic29ydCIsInN0ZCIsImEiLCJiIiwiZGIiLCJkb2N1bWVudCIsInJlYWR5IiwiaWR4IiwiZmlyZWJhc2UiLCJkYXRhYmFzZSIsInJlZiIsIm9uY2UiLCJzbmFwIiwidmFsIiwiaG90ZWxzIiwic3BvdHMiLCJzZXRUaW1lb3V0IiwiY29uc29sZSIsImxvZyIsImNsaWNrIiwidG9nZ2xlQ2xhc3MiLCJvbiIsImF0dHIiLCJjYWxjdWxhdGUiLCJyZXN0b3JlIiwic2hvd0RldGFpbCIsImluZGV4IiwiZmlyc3REYXRlVHh0Iiwic2Vjb25kRGF0ZVR4dCIsImNoYW5nZSIsInBlb3BsZU5vIiwiZXEiLCJtb3JlRm9vdCIsIm1vcmVNZXRybyIsIkhvdGVscyIsInNjb3JlQXJyYXkiLCJzY29yZVN1bU9iaiIsInNwb3RTY29yZU9iaiIsInNwb3RTY29yZUFycmF5IiwiaGlkIiwic2NvcmVTdW0iLCJtYXgiLCJzcG90U2NvcmUiLCJmb290IiwiaiIsImlkIiwiZGlzdGFuY2UiLCJ0cmFuc3BvcnQiLCJsZW4iLCJNYXRoIiwibWluIiwic2NvcmUiLCJncmFkZUN1dCIsImdyYWRlIiwic3BvdCIsImxvYWRpbmciLCJzdGVwSWR4IiwibG9hZEFycmF5IiwiZG90QXJyYXkiLCJmbG9vciIsImhpZEFycmF5Iiwic2V0TWFwIiwiaG90ZWwiLCJrb3JOYW1lIiwia28iLCJlbmdOYW1lIiwiZW4iLCJzdGFyIiwiaGFsZlN0YXIiLCJyYXRpbmdTY29yZSIsImdyYWRlX2F2ZyIsImN1cnJlbnRQcmljZSIsImNyb3NzZWRPdXRQcmljZSIsImZhY2lsaXR5Iiwic2FmZXR5IiwidHJhbnNpdCIsImltZ1VybCIsInBob3RvIiwiaXdUeHQiLCJwb3N0RGF0YSIsImhvdGVsSWQiLCJjaGVja0luIiwiY2hlY2tPdXQiLCJhZHVsdCIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJKU09OIiwic3RyaW5naWZ5IiwiY29udGVudFR5cGUiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJyZXN1bHRzIiwiY3Jvc3NQcmljZSIsImNyb3NzZWRPdXRSYXRlIiwiY3VyUHJpY2UiLCJkYWlseVJhdGUiLCJzaG93Q2FyZCIsInNob3dJZHgiLCJ4T3JpZ2luIiwic2V0Wm9vbSIsInNldENlbnRlciIsInpJbmRleCIsImxhYmVsT3JpZ2luIiwiUG9pbnQiLCJsYWJlbCIsInRleHQiLCJjb2xvciIsImZvbnRTaXplIiwibGV0dGVyU3BhY2luZyIsImNyaXRlcmlhIiwiaGFsZlNjb3JlIiwic2VsdEFycmF5IiwiZm9vdEFycmF5IiwiZm9vdERpc3RhbmNlQXJyYXkiLCJ0cmFuc2l0QXJyYXkiLCJzaWQiLCJpbmNsdWRlcyIsInRleHRfc3BvdCIsInRleHRfdHJhbnNpdCIsIm1ldHJvIiwibWV0QXJyYXkiLCJPYmplY3QiLCJrZXlzIiwib3duTWV0cm8iLCJ0ZXh0X3NhZmV0eSIsImFyZWEiLCJmYWNpbGljeSIsImxvY2FsIiwicG9saWNlU3RhdGlvbiIsInRleHRfZmFjaWxpdHkiLCJncm9jZXJ5IiwibmVhcmVzdCIsImZvb3RUeHQiLCJtZXRyb1R4dCIsIm1vcmVGb290Q291bnQiLCJob3dUb0dvIiwibGluZSIsIm1ldHJvRGlzdGFuY2UiLCJuZWFyTWV0cm9Gcm9tSG90ZWwiLCJob3dGYXJGcm9tSG90ZWwiLCJsaW5lTmFtZSIsIm1ldHJvdGltZSIsInJvdW5kIiwidGltZUZyb21Ib3RlbCIsInRTcG90IiwibmVhck1ldHJvRnJvbVNwb3QiLCJob3dGYXJGcm9tU3BvdCIsInRpbWVGcm9tU3BvdCIsInRvdGFsVGltZSIsIm1vcmVNZXRyb0NvdW50IiwiRGF0ZVBpY2tlciIsImlzRmlyc3QiLCJ3ZWVrQXJyYXkiLCJmaXJzdERhdGUiLCJzZWNvbmREYXRlIiwidGVtcERhdGUiLCJkYXRlcGlja2VyIiwiZGVmYXVsdERhdGUiLCJvblNlbGVjdCIsImNob29zZURhdGUiLCJvbkNsb3NlIiwiaW5saW5lIiwib3JpZ2luRGF0ZSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldERheSIsIkRhdGUiLCJub3ciLCJmb3JtYXR0ZXIiLCJkYXRlIiwicmV2ZXJzZURhdGUi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QUFWO0FBQ0EsWUFBR04sS0FBS04sUUFBTCxLQUFnQixDQUFoQixHQUFrQixFQUFyQixFQUF3QjtBQUNwQlcsb0JBQVEsT0FBS0wsS0FBS04sUUFBTCxLQUFnQixDQUFyQixDQUFSO0FBQ0gsU0FGRCxNQUVLO0FBQ0RXLG9CQUFTTCxLQUFLTixRQUFMLEtBQWdCLENBQXpCO0FBQ0g7QUFDRCxZQUFHTSxLQUFLTCxPQUFMLEtBQWUsRUFBbEIsRUFBcUI7QUFDakJXLGtCQUFNLE1BQUlOLEtBQUtMLE9BQUwsRUFBVjtBQUNILFNBRkQsTUFFSztBQUNEVyxrQkFBTU4sS0FBS0wsT0FBTCxFQUFOO0FBQ0g7QUFDRCxlQUFPSyxLQUFLTyxXQUFMLEtBQW1CLEdBQW5CLEdBQXVCRixLQUF2QixHQUE2QixHQUE3QixHQUFpQ0MsR0FBeEM7QUFDSDtBQXBIWSxDQUFqQjs7a0JBdUhlekIsVSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyOWU5NTZlZDFiMDNhZTI2ZmUzOSIsImxldCBTcG90cyA9IHtcclxuICAgIGxpc3Q6IFtdLFxyXG4gICAgaW5mOltdLFxyXG4gICAgY291bnQ6IDAsICAvL+uqhyDqsJwg7ISg7YOd65CY7JeI64qU7KeAIOy5tOyatO2KuFxyXG4gICAgc2hvdzpcImFsbFwiLCAvL2ZhbHNl7J246rK97JqwIOyytO2BrOuQnCDqsoPrp4wg67O06riwXHJcbiAgICByZXN0b3JlQXJyYXk6W10sXHJcbiAgICBzZWxlY3RlZDogW10sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5zaG93Q2FyZFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuc2hvd0FjY29cIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBkYXRhW2ldLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIGRhdGFbaV0ubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogZGF0YVtpXS5jb29yLFxyXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgICAgICAgICBpY29uOlwiLi9hc3NldHMvcGluLW1hcC1vZmYuc3ZnXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmFuayA9IGRhdGFbaV0ucmFuayArIDE7XHJcblxyXG4gICAgICAgICAgICBsZXQgdHh0ID0gJzxkaXYgY2xhc3M9XCJzcG90Q2FyZFwiPjxkaXYgY2xhc3M9XCJpbWdTaXplclwiPjxpbWcgY2xhc3M9XCJpbWdPdXRcIiBzcmM9XCIuL2Fzc2V0cy9pbWFnZS1vdXQucG5nXCI+PGRpdiBjbGFzcz1cImluZm9JbWFnZSBueV8nK2krJ1wiPjwvZGl2PjwvZGl2PjxwIGNsYXNzPVwicmFua1wiPicrcmFuaysn7JyEPC9wPjxkaXYgY2xhc3M9XCJjb250ZW50c1wiPidcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwibmFtZV9rbyBrb1wiPicrZGF0YVtpXS5uYW1lKyc8L3A+PHAgY2xhc3M9XCJuYW1lX2VuXCI+JytkYXRhW2ldLnRhZysnPC9wPjxwIGNsYXNzPVwiZGVzY3JpcHRpb25cIj4nK2RhdGFbaV0uZGVzY3JpcHRpb24rJzwvcD48L2Rpdj48L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICBkYXRhW2ldLmluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0eHRcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGRhdGFbaV0ubWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2ldLmluZm93aW5kb3cub3BlbihtYXAsIGRhdGFbaV0ubWFya2VyKTtcclxuICAgICAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikuYWRkQ2xhc3MoXCJzcG90RnJpZW5kT3ZlclwiKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoYXQubGlzdFtpXS5jaGVja2VkKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuZmluZCgnLmhpbnRPdXQnKS5jc3MoXCJkaXNwbGF5XCIsXCJpbmxpbmVcIik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuZmluZCgnLmhpbnQnKS5jc3MoXCJkaXNwbGF5XCIsXCJpbmxpbmVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRvdGFsSGVpZ2h0ID0gJChcIi5zcG90c1wiKS5oZWlnaHQoKVxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFNjcm9sbCA9ICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikucG9zaXRpb24oKS50b3BcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U2Nyb2xsID0gJChcIi5zcG90c1wiKS5zY3JvbGxUb3AoKVxyXG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0U2Nyb2xsID4gdG90YWxIZWlnaHQgLSAxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc3BvdHNcIikuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcDpjdXJyZW50U2Nyb2xsICsgdGFyZ2V0U2Nyb2xsIC0gMTAwfSwgMzAwKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRhcmdldFNjcm9sbDwwKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNwb3RzXCIpLnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3A6Y3VycmVudFNjcm9sbCArIHRhcmdldFNjcm9sbCAtIDEwMH0sIDMwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZGF0YVtpXS5tYXJrZXIuYWRkTGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtpXS5pbmZvd2luZG93LmNsb3NlKG1hcCwgZGF0YVtpXS5tYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikucmVtb3ZlQ2xhc3MoXCJzcG90RnJpZW5kT3ZlclwiKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoYXQubGlzdFtpXS5jaGVja2VkKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuZmluZCgnLmhpbnRPdXQnKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmZpbmQoJy5oaW50JykuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBkYXRhW2ldLm1hcmtlci5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNoZWNrZWQoaSlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxpc3QucHVzaChkYXRhW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5pbmYucHVzaChkYXRhW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5pbmZsYXRlKCk7XHJcbiAgICAgICAgdGhpcy5pY29uV2VsbCgzKVxyXG4gICAgfSxcclxuXHJcbiAgICBpY29uV2VsbDogZnVuY3Rpb24oc2l6ZSl7XHJcbiAgICAgICAgbGV0IGhpID0gc2l6ZVxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBpZihoaT4xOCl7XHJcbiAgICAgICAgICAgIGhpID0gMztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaGkrPTE7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0eHQgPSBcIlwiO1xyXG4gICAgICAgIGxldCBjYXJkID0gXCJcIjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IHRoaXMuaW5mW2ldO1xyXG4gICAgICAgICAgICBsZXQgcmFuayA9IChpbmZvLnJhbmsrMSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5saXN0W2luZm8ucmFua10uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zaG93ID09PSBcInVuU2VsZWN0ZWRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwic3BvdEJveCBzZWxlY3RlZFwiIGlkeD1cIicraW5mby5yYW5rKydcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+PGRpdiBjbGFzcz1cInBpbkRpdlwiPjxzcGFuIGNsYXNzPVwicGluY2VudGVyXCI+PC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICBjYXJkICs9ICc8ZGl2IGNsYXNzPVwic3BvdENhcmRXcmFwcGVyIHNlbGVjdGVkXCIgaWR4PVwiJytpbmZvLnJhbmsrJ1wiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj48ZGl2IGNsYXNzPVwic3BvdENhcmRcIj48ZGl2IGNsYXNzPVwiaW1nU2l6ZXJcIj48aW1nIGNsYXNzPVwiaW1nT3V0XCIgc3JjPVwiLi9hc3NldHMvaW1hZ2Utb3V0LnBuZ1wiPic7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJzcG90Qm94IHNlbGVjdGVkXCIgaWR4PVwiJytpbmZvLnJhbmsrJ1wiPjxkaXYgY2xhc3M9XCJwaW5EaXZcIj48c3BhbiBjbGFzcz1cInBpbmNlbnRlclwiPjwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZCArPSAnPGRpdiBjbGFzcz1cInNwb3RDYXJkV3JhcHBlciBzZWxlY3RlZFwiIGlkeD1cIicraW5mby5yYW5rKydcIj48ZGl2IGNsYXNzPVwic3BvdENhcmRcIj48ZGl2IGNsYXNzPVwiaW1nU2l6ZXJcIj48aW1nIGNsYXNzPVwiaW1nT3V0XCIgc3JjPVwiLi9hc3NldHMvaW1hZ2Utb3V0LnBuZ1wiPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXJkICs9ICc8ZGl2IGNsYXNzPVwiaW5mb0ltYWdlIG55XycraW5mby5yYW5rKydcIj48L2Rpdj48L2Rpdj48cCBjbGFzcz1cInJhbmtcIj4nK3JhbmsrJ+ychDwvcD48ZGl2IGNsYXNzPVwiY29udGVudHNcIj4nO1xyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNob3cgPT09IFwic2VsZWN0ZWRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwic3BvdEJveCB1blNlbGVjdGVkXCIgaWR4PVwiJytpbmZvLnJhbmsrJ1wiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj48ZGl2IGNsYXNzPVwicGluRGl2XCI+PHNwYW4gY2xhc3M9XCJwaW5jZW50ZXJcIj48L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcmQgKz0gJzxkaXYgY2xhc3M9XCJzcG90Q2FyZFdyYXBwZXIgdW5TZWxlY3RlZFwiIGlkeD1cIicraW5mby5yYW5rKydcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+PGRpdiBjbGFzcz1cInNwb3RDYXJkXCI+PGRpdiBjbGFzcz1cImltZ1NpemVyXCI+PGltZyBjbGFzcz1cImltZ091dFwiIHNyYz1cIi4vYXNzZXRzL2ltYWdlLW91dC5wbmdcIj4nO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwic3BvdEJveCB1blNlbGVjdGVkXCIgaWR4PVwiJytpbmZvLnJhbmsrJ1wiPjxkaXYgY2xhc3M9XCJwaW5EaXZcIj48c3BhbiBjbGFzcz1cInBpbmNlbnRlclwiPjwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZCArPSAnPGRpdiBjbGFzcz1cInNwb3RDYXJkV3JhcHBlciB1blNlbGVjdGVkXCIgaWR4PVwiJytpbmZvLnJhbmsrJ1wiPjxkaXYgY2xhc3M9XCJzcG90Q2FyZFwiPjxkaXYgY2xhc3M9XCJpbWdTaXplclwiPjxpbWcgY2xhc3M9XCJpbWdPdXRcIiBzcmM9XCIuL2Fzc2V0cy9pbWFnZS1vdXQucG5nXCI+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhcmQgKz0gJzxkaXYgY2xhc3M9XCJpbmZvSW1hZ2UgbnlfJytpbmZvLnJhbmsrJ1wiPjwvZGl2PjwvZGl2PjxwIGNsYXNzPVwicmFua1wiPicrcmFuaysn7JyEPC9wPjxkaXYgY2xhc3M9XCJjb250ZW50c1wiPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPHNwYW4gY2xhc3M9XCJwaW5cIj48L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cImluZm9cIj48cCBjbGFzcz1cInJhbmtcIj4nK3JhbmsrJ+ychDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJuYW1lX2tvIGtvXCI+JytpbmZvLm5hbWUrJzwvcD48cCBjbGFzcz1cIm5hbWVfZW5cIj4nK2luZm8udGFnKyc8L3A+PC9kaXY+PC9kaXY+J1xyXG4gICAgICAgICAgICBjYXJkICs9ICc8cCBjbGFzcz1cIm5hbWVfa28ga29cIj4nK2luZm8ubmFtZSsnPC9wPjxwIGNsYXNzPVwibmFtZV9lblwiPicraW5mby50YWcrJzwvcD48cCBjbGFzcz1cImRlc2NyaXB0aW9uXCI+JytpbmZvLmRlc2NyaXB0aW9uKyc8L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICBjYXJkICs9ICc8ZGl2IGNsYXNzPVwiZm9vdGVyXCI+PHNwYW4gY2xhc3M9XCJwaW5jZW50ZXJcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJwaW5cIj48L3NwYW4+J1xyXG4gICAgICAgICAgICBjYXJkICs9ICc8c3BhbiBjbGFzcz1cImhpbnRcIj7tgbTrpq3tlbTshJwg7ISg7YOdPC9zcGFuPjxzcGFuIGNsYXNzPVwiaGludE91dFwiPu2BtOumre2VtOyEnCDshKDtg50g7ZW07KCcPC9zcGFuPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJuZW9uU2lnblwiPjwvZGl2PjwvZGl2PidcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb3VudCgpO1xyXG4gICAgICAgICQoXCIuc3BvdHNcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgICQoXCIuY2FyZEJveFwiKS5odG1sKGNhcmQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tSZXN1bHQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tlZDogZnVuY3Rpb24oaSl7XHJcbiAgICAgICAgaWYodGhpcy5saXN0W2ldLmNoZWNrZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0uY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkW2ldID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS5tYXJrZXIuc2V0SWNvbihcIi4vYXNzZXRzL3Bpbi1tYXAtb2ZmLnN2Z1wiKTtcclxuICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5hZGRDbGFzcyhcInVuU2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5hZGRDbGFzcyhcInVuU2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICQoXCIuaGludFwiKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmhpbnRPdXRcIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgICAgICAgICAgaWYodGhpcy5zaG93ID09PSBcInNlbGVjdGVkXCIpe1xyXG4gICAgICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5oaWRlKDIwMCk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuaGlkZSgyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY291bnQtLVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0uY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRbaV0gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0ubWFya2VyLnNldEljb24oXCIuL2Fzc2V0cy9waW4tbWFwLW9uLnN2Z1wiKTtcclxuICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcInVuU2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcInVuU2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICQoXCIuaGludFwiKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpXHJcbiAgICAgICAgICAgICQoXCIuaGludE91dFwiKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpXHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvdyA9PT0gXCJ1blNlbGVjdGVkXCIpe1xyXG4gICAgICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5oaWRlKDIwMCk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuaGlkZSgyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY291bnQrK1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50KCk7XHJcbiAgICAgICAgJChcIi5yZXN0b3JlXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICAgICAkKFwiLnNwb3Rfd3JhcCAucGluY2VudGVyXCIpLnJlbW92ZUNsYXNzKFwib2ZmXCIpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tSZXN1bHQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgbW91c2VPdmVyOiBmdW5jdGlvbihpKXtcclxuICAgICAgICB0aGlzLmxpc3RbaV0uaW5mb3dpbmRvdy5vcGVuKG1hcCwgdGhpcy5saXN0W2ldLm1hcmtlcik7XHJcbiAgICAgICAgdGhpcy5saXN0W2ldLm1hcmtlci5zZXRBbmltYXRpb24oZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkJPVU5DRSk7XHJcbiAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmFkZENsYXNzKFwiY2FyZEZyaWVuZE92ZXJcIik7XHJcbiAgICAgICAgaWYodGhpcy5saXN0W2ldLmNoZWNrZWQpe1xyXG4gICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuZmluZCgnLmhpbnRPdXQnKS5jc3MoXCJkaXNwbGF5XCIsXCJpbmxpbmVcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5maW5kKCcuaGludCcpLmNzcyhcImRpc3BsYXlcIixcImlubGluZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNhcmRPdmVyOiBmdW5jdGlvbihpKXtcclxuICAgICAgICAkKFwiLnNwb3RCb3hbaWR4PSdcIiArIGkgKyBcIiddXCIpLmFkZENsYXNzKFwic3BvdEZyaWVuZE92ZXJcIik7XHJcbiAgICAgICAgaWYodGhpcy5saXN0W2ldLmNoZWNrZWQpe1xyXG4gICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuZmluZCgnLmhpbnRPdXQnKS5jc3MoXCJkaXNwbGF5XCIsXCJpbmxpbmVcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5maW5kKCcuaGludCcpLmNzcyhcImRpc3BsYXlcIixcImlubGluZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNhcmRPdmVyX3Njcm9sbDogZnVuY3Rpb24oaSl7XHJcbiAgICAgICAgbGV0IHRvdGFsSGVpZ2h0ID0gJChcIi5zcG90c1wiKS5oZWlnaHQoKVxyXG4gICAgICAgIGxldCB0YXJnZXRTY3JvbGwgPSAkKFwiLnNwb3RCb3hbaWR4PSdcIiArIGkgKyBcIiddXCIpLnBvc2l0aW9uKCkudG9wXHJcbiAgICAgICAgbGV0IGN1cnJlbnRTY3JvbGwgPSAkKFwiLnNwb3RzXCIpLnNjcm9sbFRvcCgpXHJcbiAgICAgICAgaWYodGFyZ2V0U2Nyb2xsID4gdG90YWxIZWlnaHQgLSAxMDApe1xyXG4gICAgICAgICAgICAkKFwiLnNwb3RzXCIpLnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3A6Y3VycmVudFNjcm9sbCArIHRhcmdldFNjcm9sbCAtIDEwMH0sIDMwMCk7XHJcbiAgICAgICAgfWVsc2UgaWYodGFyZ2V0U2Nyb2xsPDApe1xyXG4gICAgICAgICAgICAkKFwiLnNwb3RzXCIpLnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3A6Y3VycmVudFNjcm9sbCArIHRhcmdldFNjcm9sbCAtIDEwMH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjYXJkT3V0OiBmdW5jdGlvbihpKXtcclxuICAgICAgICAkKFwiLnNwb3RCb3hbaWR4PSdcIiArIGkgKyBcIiddXCIpLnJlbW92ZUNsYXNzKFwic3BvdEZyaWVuZE92ZXJcIik7XHJcbiAgICAgICAgaWYodGhpcy5saXN0W2ldLmNoZWNrZWQpe1xyXG4gICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuZmluZCgnLmhpbnRPdXQnKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuZmluZCgnLmhpbnQnKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW91c2VPdXQ6IGZ1bmN0aW9uIChpKXtcclxuICAgICAgICB0aGlzLmxpc3RbaV0uaW5mb3dpbmRvdy5jbG9zZShtYXAsIHRoaXMubGlzdFtpXS5tYXJrZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdFtpXS5tYXJrZXIuc2V0QW5pbWF0aW9uKG51bGwpO1xyXG4gICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcImNhcmRGcmllbmRPdmVyXCIpO1xyXG4gICAgICAgIGlmKHRoaXMubGlzdFtpXS5jaGVja2VkKXtcclxuICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmZpbmQoJy5oaW50T3V0JykuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLmZpbmQoJy5oaW50JykuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUNvdW50OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoXCIuY291bnRfc2VsZWN0ZWRcIikuaHRtbCh0aGlzLmNvdW50KVxyXG4gICAgICAgICQoXCIuc3BvdFNlbGVjdGVkXCIpLmh0bWwodGhpcy5jb3VudClcclxuICAgICAgICAkKFwiLmhvdGVsX3dyYXAgLm51bWJlclwiKS5odG1sKHRoaXMuY291bnQpXHJcbiAgICAgICAgJChcIi5ob3RlbERldGFpbCAuY291bnRlciAubnVtYmVyXCIpLmh0bWwodGhpcy5jb3VudClcclxuICAgICAgICB0aGlzLmNoZWNrUmVzdWx0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrQWxsOiBmdW5jdGlvbihsaXN0ZW4pe1xyXG4gICAgICAgIHRoaXMucmVzdG9yZUFycmF5ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5saXN0W2ldLmNoZWNrZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlQXJyYXkucHVzaChpKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRbaV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0W2ldLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0W2ldLm1hcmtlci5zZXRJY29uKFwiLi9hc3NldHMvcGluLW1hcC1vbi5zdmdcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RbaV0uaW5mb3dpbmRvdy5jbG9zZShtYXAsIHRoaXMubGlzdFtpXS5tYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcInVuU2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikucmVtb3ZlQ2xhc3MoXCJ1blNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5oaW50XCIpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIilcclxuICAgICAgICAgICAgICAgICQoXCIuaGludE91dFwiKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNob3cgPT09IFwidW5TZWxlY3RlZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNwb3RCb3hbaWR4PSdcIiArIGkgKyBcIiddXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5zaG93ID09PSBcInNlbGVjdGVkXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgJChcIi5yZXN0b3JlXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IHRoaXMubGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb3VudCgpO1xyXG4gICAgICAgIGxpc3Rlbi5yZW1vdmVDbGFzcyhcImFiX3NlbGVjdFwiKTtcclxuICAgICAgICBsaXN0ZW4uYWRkQ2xhc3MoXCJhYl91blNlbGVjdFwiKTtcclxuICAgICAgICAkKFwiLnNwb3Rfd3JhcCAucGluY2VudGVyXCIpLnJlbW92ZUNsYXNzKFwib2ZmXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1bkNoZWNrQWxsOiBmdW5jdGlvbihsaXN0ZW4pe1xyXG4gICAgICAgIHRoaXMucmVzdG9yZUFycmF5ID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLmxpc3RbaV0uY2hlY2tlZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmVBcnJheS5wdXNoKGkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkW2ldID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RbaV0uY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0W2ldLm1hcmtlci5zZXRJY29uKFwiLi9hc3NldHMvcGluLW1hcC1vZmYuc3ZnXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5zcG90Qm94W2lkeD0nXCIgKyBpICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5zcG90Q2FyZFdyYXBwZXJbaWR4PSdcIiArIGkgKyBcIiddXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnNwb3RCb3hbaWR4PSdcIiArIGkgKyBcIiddXCIpLmFkZENsYXNzKFwidW5TZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5hZGRDbGFzcyhcInVuU2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmhpbnRcIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaGludE91dFwiKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zaG93ID09PSBcInNlbGVjdGVkXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc3BvdEJveFtpZHg9J1wiICsgaSArIFwiJ11cIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc3BvdENhcmRXcmFwcGVyW2lkeD0nXCIgKyBpICsgXCInXVwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLnNob3cgPT09IFwidW5TZWxlY3RlZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNwb3RCb3hbaWR4PSdcIiArIGkgKyBcIiddXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNwb3RDYXJkV3JhcHBlcltpZHg9J1wiICsgaSArIFwiJ11cIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIucmVzdG9yZVwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgIHRoaXMuY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ291bnQoKTtcclxuICAgICAgICBsaXN0ZW4uYWRkQ2xhc3MoXCJhYl9zZWxlY3RcIilcclxuICAgICAgICBsaXN0ZW4ucmVtb3ZlQ2xhc3MoXCJhYl91blNlbGVjdFwiKTtcclxuICAgICAgICAkKFwiLnNwb3Rfd3JhcCAucGluY2VudGVyXCIpLmFkZENsYXNzKFwib2ZmXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja1Jlc3VsdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAkKFwiLm5vUmVzdWx0XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICAgICBpZih0aGlzLnNob3cgPT09IFwic2VsZWN0ZWRcIiAmJiB0aGlzLmNvdW50ID09PSAwKXtcclxuICAgICAgICAgICAgJChcIi5ub1Jlc3VsdFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICAgICAgICAgICQoXCIubm9SZXN1bHQgcFwiKS5odG1sKFwi7ISg7YOd7ZWcIOq0gOq0keyngOqwgCDsl4bsirXri4jri6RcIilcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLnNob3cgPT09IFwidW5TZWxlY3RlZFwiICYmIHRoaXMuY291bnQgPT09IHRoaXMubGlzdC5sZW5ndGgpe1xyXG4gICAgICAgICAgICAkKFwiLm5vUmVzdWx0XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICAgICAgICAgJChcIi5ub1Jlc3VsdCBwXCIpLmh0bWwoXCLshKDtg50g7JWIIO2VnCDqtIDqtJHsp4DqsIAg7JeG7Iq164uI64ukXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgc29ydDogZnVuY3Rpb24oc3RkKXtcclxuICAgICAgICB0aGlzLmluZi5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhW3N0ZF0gPCBiW3N0ZF0gPyAtMSA6IGFbc3RkXSA+IGJbc3RkXSA/IDEgOiAwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5pbmZsYXRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwb3RzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL3Nwb3RzLmpzIiwiaW1wb3J0IFNwb3RzIGZyb20gXCIuL21vZHVsZXMvc3BvdHMuanNcIjtcclxuaW1wb3J0IEhvdGVscyBmcm9tIFwiLi9tb2R1bGVzL2hvdGVscy5qc1wiXHJcbmltcG9ydCBEYXRlUGlja2VyIGZyb20gXCIuL21vZHVsZXMvRGF0ZVBpY2tlci5qc1wiXHJcblxyXG5sZXQgZGIgPSB7fVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgIGxldCBpZHggPSAwXHJcbiAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcIm55XCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICBkYiA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgRGF0ZVBpY2tlci5pbml0KCk7XHJcbiAgICAgICAgSG90ZWxzLmluaXQoZGIuaG90ZWxzKTtcclxuICAgICAgICBpZihpZHggPiA1OCl7XHJcbiAgICAgICAgICAgIFNwb3RzLmluaXQoZGIuc3BvdHMpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBsZXQgY291bnQgPSBmdW5jdGlvbihpKXtcclxuICAgICAgICBpZihpPDU5KXtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICBpZHgrKztcclxuICAgICAgICAgICAgICAgICQoXCIuZ2VuZXJhbCAuY2l0eVNwb3RfdG90YWxcIikuaHRtbChpKTtcclxuICAgICAgICAgICAgICAgICQoXCIuZ2VuZXJhbCAuY291bnRlciAudG90YWxcIikuaHRtbChcIiAvIFwiK2kpO1xyXG4gICAgICAgICAgICAgICAgY291bnQoaSlcclxuICAgICAgICAgICAgfSwgKGkqMS44KzE1KSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGRiLnNwb3RzKXtcclxuICAgICAgICAgICAgICAgIFNwb3RzLmluaXQoZGIuc3BvdHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY291bnQoMCk7XHJcblxyXG59KVxyXG5pZihkYi5zcG90cyl7XHJcbiAgICBjb25zb2xlLmxvZyhcImhpXCIpXHJcbn1lbHNle1xyXG4gICAgY29uc29sZS5sb2coXCJub1wiKVxyXG59XHJcblxyXG5cclxuJChcImJvZHlcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQoXCIuY2xvc2VXaGVuQm9keUNsaWNrXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxufSlcclxuXHJcbiQoXCIuc3BvdF93cmFwIC5pY29uLS1pbmZvXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiLnNwb3Rfd3JhcCAuc3BvdF9oaW50XCIpLnRvZ2dsZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pXHJcbiQoXCIuc2hhcmVcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQoXCIuc2hhcmVCb3hcIikudG9nZ2xlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSlcclxuXHJcbiQoXCIuc3BvdHNcIikub24oXCJjbGlja1wiLCBcIi5zcG90Qm94XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBTcG90cy5jaGVja2VkKCQodGhpcykuYXR0cihcImlkeFwiKSk7XHJcbn0pXHJcbiQoXCIuY2FyZEJveFwiKS5vbihcImNsaWNrXCIsIFwiLnNwb3RDYXJkV3JhcHBlclwiLCBmdW5jdGlvbigpe1xyXG4gICAgU3BvdHMuY2hlY2tlZCgkKHRoaXMpLmF0dHIoXCJpZHhcIikpO1xyXG59KVxyXG4kKFwiLmNhcmRCb3hcIikub24oXCJtb3VzZW92ZXJcIiwgXCIuc3BvdENhcmRXcmFwcGVyXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBTcG90cy5jYXJkT3ZlcigkKHRoaXMpLmF0dHIoXCJpZHhcIikpO1xyXG59KVxyXG4kKFwiLnNwb3RzXCIpLm9uKFwibW91c2VvdmVyXCIsIFwiLnNwb3RCb3hcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgU3BvdHMubW91c2VPdmVyKCQodGhpcykuYXR0cihcImlkeFwiKSk7XHJcbn0pXHJcbiQoXCIuY2FyZEJveFwiKS5vbihcIm1vdXNlZW50ZXJcIiwgXCIuc3BvdENhcmRXcmFwcGVyXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBTcG90cy5jYXJkT3Zlcl9zY3JvbGwoJCh0aGlzKS5hdHRyKFwiaWR4XCIpKTtcclxufSlcclxuJChcIi5jYXJkQm94XCIpLm9uKFwibW91c2VvdXRcIiwgXCIuc3BvdENhcmRXcmFwcGVyXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBTcG90cy5jYXJkT3V0KCQodGhpcykuYXR0cihcImlkeFwiKSk7XHJcbn0pXHJcbiQoXCIuc3BvdHNcIikub24oXCJtb3VzZW91dFwiLCBcIi5zcG90Qm94XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIFNwb3RzLm1vdXNlT3V0KCQodGhpcykuYXR0cihcImlkeFwiKSk7XHJcbn0pXHJcbiQoXCIuaG90ZWxzRGl2XCIpLm9uKFwibW91c2VvdmVyXCIsIFwiLmhvdGVsQ2FyZFdyYXBcIiwgZnVuY3Rpb24oKXtcclxuICAgIEhvdGVscy5tb3VzZU92ZXIoJCh0aGlzKS5hdHRyKFwiaWRcIikpXHJcbn0pXHJcbiQoXCIuaG90ZWxzRGl2XCIpLm9uKFwibW91c2VvdXRcIiwgXCIuaG90ZWxDYXJkV3JhcFwiLCBmdW5jdGlvbigpe1xyXG4gICAgSG90ZWxzLm1vdXNlT3V0KCQodGhpcykuYXR0cihcImlkXCIpKVxyXG59KVxyXG4kKFwiLnZpZXdfYWxsXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiLmZpbHRlck5hbWVcIikuaHRtbCgkKHRoaXMpLmh0bWwoKSlcclxuICAgICQoXCIuc2VsZWN0ZWRcIikuc2hvdygpO1xyXG4gICAgJChcIi51blNlbGVjdGVkXCIpLnNob3coKTtcclxuICAgIFNwb3RzLnNob3cgPSBcImFsbFwiO1xyXG4gICAgU3BvdHMudXBkYXRlQ291bnQoKTtcclxufSlcclxuJChcIi52aWV3X3NlbGVjdFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgJChcIi5maWx0ZXJOYW1lXCIpLmh0bWwoJCh0aGlzKS5odG1sKCkpXHJcbiAgICAkKFwiLnVuU2VsZWN0ZWRcIikuaGlkZSgpO1xyXG4gICAgJChcIi5zZWxlY3RlZFwiKS5zaG93KCk7XHJcbiAgICBTcG90cy5zaG93ID0gXCJzZWxlY3RlZFwiXHJcbiAgICBTcG90cy51cGRhdGVDb3VudCgpO1xyXG59KVxyXG4kKFwiLnZpZXdfdW5TZWxlY3RcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQoXCIuZmlsdGVyTmFtZVwiKS5odG1sKCQodGhpcykuaHRtbCgpKVxyXG4gICAgJChcIi5zZWxlY3RlZFwiKS5oaWRlKCk7XHJcbiAgICAkKFwiLnVuU2VsZWN0ZWRcIikuc2hvdygpO1xyXG4gICAgU3BvdHMuc2hvdyA9IFwidW5TZWxlY3RlZFwiO1xyXG4gICAgU3BvdHMudXBkYXRlQ291bnQoKTtcclxuXHJcbn0pXHJcbiQoXCIub2JfcmFua1wiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgU3BvdHMuc29ydChcInJhbmtcIik7XHJcbiAgICAkKFwiLm9yZGVyTmFtZVwiKS5odG1sKFwi7J246riw7IicXCIpO1xyXG59KVxyXG4kKFwiLm9iX25hbWVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgU3BvdHMuc29ydChcIm5hbWVcIik7XHJcbiAgICAkKFwiLm9yZGVyTmFtZVwiKS5odG1sKFwi6rCA64KY64uk7IicXCIpO1xyXG59KVxyXG4kKFwiLnNob3dDYXJkXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiLm1cIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIuY3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIuc2hvd0NhcmRcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxufSlcclxuJChcIi5zaG93TWFwXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiLm1cIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIuY3ZcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIuc2hvd0NhcmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxufSlcclxuXHJcbiQoXCIuc2hvd1Nwb3RcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQoXCIud3JhcHBlclwiKS5yZW1vdmVDbGFzcyhcImhvdGVsXCIpO1xyXG4gICAgJChcIi53cmFwcGVyXCIpLmFkZENsYXNzKFwic3BvdFwiKTtcclxuICAgICQoXCIuY3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIubVwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5zaG93Q2FyZFwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5zaG93TWFwXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbn0pXHJcblxyXG4kKFwiLnNob3dBY2NvXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiLndyYXBwZXJcIikuYWRkQ2xhc3MoXCJob3RlbFwiKTtcclxuICAgICQoXCIud3JhcHBlclwiKS5yZW1vdmVDbGFzcyhcInNwb3RcIik7XHJcbiAgICAkKFwiLmN2XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLm1cIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIuc2hvd0NhcmRcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIuc2hvd01hcFwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICQoXCIuc2hvd1Nwb3RcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgJChcIi5ob3RlbHNEaXZcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgJChcIi5ob3RlbHNfc2V0dGVyXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLmhvdGVsc0xvYWRlclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgSG90ZWxzLmNhbGN1bGF0ZShTcG90cy5zZWxlY3RlZCxTcG90cy5saXN0KTtcclxufSlcclxuJChcIi5yZXN0b3JlXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICBTcG90cy5yZXN0b3JlKCk7XHJcbn0pXHJcbiQoXCIuc2V0dGVyIC5maWx0ZXJcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQoXCIuZHJvcF9maWx0ZXJcIikudG9nZ2xlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KVxyXG4kKFwiLnNldHRlciAub3JkZXJcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQoXCIuZHJvcF9vcmRlclwiKS50b2dnbGVDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pXHJcbiQoXCIuZHJvcF9maWx0ZXI+cCwgLmRyb3Bfb3JkZXI+cFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgJChcIi5kcm9wX2ZpbHRlclwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICAkKFwiLmRyb3Bfb3JkZXJcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KVxyXG5cclxuJChcIi5zcG90X3dyYXAgLmNvdW50ZXJcIikub24oXCJjbGlja1wiLFwiLmFiX3NlbGVjdFwiLGZ1bmN0aW9uKCl7XHJcbiAgICBTcG90cy5jaGVja0FsbCgkKHRoaXMpKTtcclxufSlcclxuJChcIi5zcG90X3dyYXAgLmNvdW50ZXJcIikub24oXCJjbGlja1wiLFwiLmFiX3VuU2VsZWN0XCIsZnVuY3Rpb24oKXtcclxuICAgIFNwb3RzLnVuQ2hlY2tBbGwoJCh0aGlzKSk7XHJcbn0pXHJcblxyXG4kKFwiLmhvdGVsc0RpdlwiKS5vbihcImNsaWNrXCIsXCIuaG90ZWxDYXJkV3JhcFwiLGZ1bmN0aW9uKCl7XHJcbiAgICBIb3RlbHMuc2hvd0RldGFpbCgkKHRoaXMpLmF0dHIoXCJpZFwiKSwgJChcIi5ob3RlbENhcmRXcmFwXCIpLmluZGV4KCQodGhpcykpLCBTcG90cy5zZWxlY3RlZCwgRGF0ZVBpY2tlci5maXJzdERhdGVUeHQsIERhdGVQaWNrZXIuc2Vjb25kRGF0ZVR4dCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pXHJcbiQoXCIuY2xvc2VIb3RlbERldGFpbFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgJChcIi53cmFwX2hvdGVsRGV0YWlsXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxufSlcclxuJChcImhlYWRlciAucGVvcGxlV3JhcCAuZHJvcEJveFwiKS5jaGFuZ2UoZnVuY3Rpb24oKXtcclxuICAgIEhvdGVscy5wZW9wbGVObyA9ICQoXCJoZWFkZXIgLnBlb3BsZVdyYXAgLmRyb3BCb3hcIikudmFsKClcclxuICAgICQoXCIuaGRfc2lkZWJhcj4uc3RkPnNwYW5cIikuZXEoMikuaHRtbCgkKFwiaGVhZGVyIC5wZW9wbGVXcmFwIC5kcm9wQm94XCIpLnZhbCgpKVxyXG59KVxyXG4kKFwiLmhvdGVsRGV0YWlsXCIpLm9uKFwiY2xpY2tcIixcIi5tb3JlRm9vdFwiLGZ1bmN0aW9uKCl7XHJcbiAgICBIb3RlbHMubW9yZUZvb3QoKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxufSlcclxuJChcIi5ob3RlbERldGFpbFwiKS5vbihcImNsaWNrXCIsXCIubW9yZU1ldHJvXCIsZnVuY3Rpb24oKXtcclxuICAgIEhvdGVscy5tb3JlTWV0cm8oKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxufSlcclxuJChcIi53cmFwX2hvdGVsRGV0YWlsIC5pY29uUmlnaHRcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSlcclxuJChcIi53cmFwX2hvdGVsRGV0YWlsIC5pY29uTGVmdFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KVxyXG4kKFwiLmhvdGVsRGV0YWlsXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL2FwcC5qcyIsImltcG9ydCBTcG90cyBmcm9tIFwiLi9zcG90cy5qc1wiO1xyXG5cclxubGV0IEhvdGVscyA9IHtcclxuXHJcbiAgICBob3RlbHM6IHt9LFxyXG4gICAgc2NvcmVBcnJheTogW10sXHJcbiAgICBzY29yZVN1bU9iajp7fSxcclxuICAgIG1hcmtlcjp7fSxcclxuICAgIHNwb3RTY29yZU9iajp7fSxcclxuICAgIHNwb3RTY29yZUFycmF5Ont9LFxyXG4gICAgcGVvcGxlTm86IDEsXHJcblxyXG4gICAgaW5pdChkYil7XHJcbiAgICAgICAgdGhpcy5ob3RlbHMgPSBkYjtcclxuICAgIH0sXHJcblxyXG4gICAgY2FsY3VsYXRlKHNlbGVjdGVkLHNwb3RzKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5ob3RlbHMpIHtcclxuICAgICAgICAgICAgdGhpcy5zY29yZVN1bU9ialtoaWRdID0gdGhpcy5ob3RlbHNbaGlkXS5zY29yZVN1bTtcclxuICAgICAgICAgICAgdGhpcy5zcG90U2NvcmVPYmpbaGlkXSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gc2VsZWN0ZWQubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgaWYoc2VsZWN0ZWRbaV0pe1xyXG4gICAgICAgICAgICAgICAgaWYoc3BvdHNbaV0uaG90ZWxzKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdFNjb3JlID0gc3BvdHNbaV0uaG90ZWxzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwb3RTY29yZS5mb290KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzcG90U2NvcmUuZm9vdC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZVN1bU9ialtzcG90U2NvcmUuZm9vdFtqXS5pZF0gKz0gKDE1MDAgLSBzcG90U2NvcmUuZm9vdFtqXS5kaXN0YW5jZSkvMjAwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IOyXrOq4sOuKlCBpZOudvOqzoCDtlbTrhpPqs6BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BvdFNjb3JlT2JqW3Nwb3RTY29yZS5mb290W2pdLmlkXSArPSAoMTUwMCAtIHNwb3RTY29yZS5mb290W2pdLmRpc3RhbmNlKS8xMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwb3RTY29yZS50cmFuc3BvcnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGVuID0gTWF0aC5taW4oc3BvdFNjb3JlLnRyYW5zcG9ydC5sZW5ndGgsMTUwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsZW47IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZVN1bU9ialtzcG90U2NvcmUudHJhbnNwb3J0W2pdLmhpZF0gKz0gKDIwMDAwIC0gc3BvdFNjb3JlLnRyYW5zcG9ydFtqXS5kaXN0YW5jZSkvMjUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiDsl6zquLDripQgaGlk65286rOgIO2VtOuGk+yVmOycvOuLiCDrpqztjKnthqDrp4HrlYwg67CY65Oc7IucIOyImOygle2VoOqyg1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcG90U2NvcmVPYmpbc3BvdFNjb3JlLnRyYW5zcG9ydFtqXS5oaWRdICs9ICgyMDAwMCAtIHNwb3RTY29yZS50cmFuc3BvcnRbal0uZGlzdGFuY2UpLzE1MDAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3BvdFNjb3JlQXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLnNjb3JlQXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5zcG90U2NvcmVPYmopIHtcclxuICAgICAgICAgICAgdGhpcy5zcG90U2NvcmVBcnJheS5wdXNoKHtoaWQ6aGlkLHNjb3JlOnRoaXMuc3BvdFNjb3JlT2JqW2hpZF19KVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5zY29yZVN1bU9iaikge1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlQXJyYXkucHVzaCh7aGlkOmhpZCxzY29yZTp0aGlzLnNjb3JlU3VtT2JqW2hpZF19KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjb3JlQXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuc2NvcmUgPCBiLnNjb3JlID8gMSA6IGEuc2NvcmUgPiBiLnNjb3JlID8gLTEgOiAwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zcG90U2NvcmVBcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5zY29yZSA8IGIuc2NvcmUgPyAxIDogYS5zY29yZSA+IGIuc2NvcmUgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGV0IGdyYWRlQ3V0ID0gWzAsMjUsNzAsMTMxLDE5MSwyNTEsMzAxLDMzNiwzNjFdO1xyXG4gICAgICAgIGxldCBncmFkZSA9IFs1LDQuNSw0LDMuNSwzLDIuNSwyLDEuNV1cclxuICAgICAgICAvLyBUT0RPOiDsnbTroIfqsowg66eJIO2VmOuKlCDrjIDsi6Ag7Zi47YWUIOu5hOycqCDrgpjriITripTqsoPrj4Qg7J6Q64+Z7ZmU7ZWY6riwXHJcblxyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBncmFkZUN1dFtqXTsgaSA8IChncmFkZUN1dFtqKzFdKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsc1t0aGlzLnNwb3RTY29yZUFycmF5W2ldLmhpZF0uc2NvcmUuc3BvdCA9IGdyYWRlW2pdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdXNlT3ZlcjogZnVuY3Rpb24oaSl7XHJcbiAgICAgICAgdGhpcy5ob3RlbHNbaV0uaW5mb3dpbmRvdy5vcGVuKG1hcCwgdGhpcy5ob3RlbHNbaV0ubWFya2VyKTtcclxuICAgIH0sXHJcbiAgICBtb3VzZU91dDogZnVuY3Rpb24gKGkpe1xyXG4gICAgICAgIHRoaXMuaG90ZWxzW2ldLmluZm93aW5kb3cuY2xvc2UobWFwLCB0aGlzLmhvdGVsc1tpXS5tYXJrZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsb2FkaW5nOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgc3RlcElkeCA9IDA7XHJcbiAgICAgICAgbGV0IGxvYWRBcnJheSA9IFtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLS1zY29yZS1zcG90XCI+PC9zcGFuPuyEoO2Dne2VnCDqtIDqtJHsp4Dsl5Ag64yA7ZWcIOqyveuhnCDrtoTshJ3spJEnLFxyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJpY29uIGljb24tLXNjb3JlLXRyYW5zaXRcIj48L3NwYW4+7KO867OAIOuMgOykkeq1kO2GtSDsoJXrs7Qg67aE7ISd7KSRJyxcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLS1zY29yZS1zYWZldHlcIj48L3NwYW4+7KO867OAIOy5mOyViCDrtoTshJ3spJEnLFxyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJpY29uIGljb24tLXNjb3JlLWZhY2lsaXR5XCI+PC9zcGFuPuyjvOuzgCDtjrjsnZjsi5zshKQg67aE7ISd7KSRJ1xyXG4gICAgICAgIF1cclxuICAgICAgICBsZXQgZG90QXJyYXkgPSBbXCImbmJzcDsmbmJzcDtcIixcIi4mbmJzcDtcIixcIi4uXCIsXCImbmJzcDsmbmJzcDtcIixcIi4mbmJzcDtcIixcIi4uXCJdXHJcbiAgICAgICAgbGV0IGxvYWRpbmcgPSBmdW5jdGlvbihpZHgpe1xyXG4gICAgICAgICAgICAkKFwiLmhvdGVsTG9hZGluZ1dvcmRcIikuaHRtbChsb2FkQXJyYXlbTWF0aC5mbG9vcihpZHgvNildICsgZG90QXJyYXlbaWR4JTZdKTtcclxuICAgICAgICAgICAgaWR4Kys7XHJcbiAgICAgICAgICAgIGlmKGlkeDwyNCl7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nKGlkeClcclxuICAgICAgICAgICAgICAgIH0sIDI1MCsoaWR4JTIpKjEwMCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJChcIi5zaG93U3BvdFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICAgICAgICAgICAgICAkKFwiLmhvdGVsc0RpdlwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICAgICAgICAgICAgICAkKFwiLmhvdGVsc19zZXR0ZXJcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaG90ZWxzTG9hZGVyXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsb2FkaW5nKDApXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGUoKXtcclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcbiAgICAgICAgbGV0IGhpZEFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTU7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLm1hcmtlcltpXSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcltpXS5zZXRNYXAobnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmhvdGVsc1t0aGlzLnNjb3JlQXJyYXlbaV0uaGlkXTtcclxuICAgICAgICAgICAgaGlkQXJyYXkucHVzaCh0aGlzLnNjb3JlQXJyYXlbaV0uaGlkKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByYW5rID0gKGkrMSk7XHJcbiAgICAgICAgICAgIGxldCBrb3JOYW1lID0gaG90ZWwubmFtZS5rbztcclxuICAgICAgICAgICAgbGV0IGVuZ05hbWUgPSBob3RlbC5uYW1lLmVuO1xyXG4gICAgICAgICAgICBsZXQgc3RhciA9IGhvdGVsLnN0YXI7XHJcbiAgICAgICAgICAgIGxldCBoYWxmU3RhciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZihzdGFyJTEgPT09IDAuNSl7XHJcbiAgICAgICAgICAgICAgICBzdGFyIC09IDAuNTtcclxuICAgICAgICAgICAgICAgIGhhbGZTdGFyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHJhdGluZ1Njb3JlID0gaG90ZWwuZ3JhZGVfYXZnO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFByaWNlID0gXCIxNDQsODAyXCI7XHJcbiAgICAgICAgICAgIGxldCBjcm9zc2VkT3V0UHJpY2UgPSBcIjE5OSw5MDBcIjtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0ge2ZhY2lsaXR5OmhvdGVsLnNjb3JlLmZhY2lsaXR5LCBzYWZldHk6aG90ZWwuc2NvcmUuc2FmZXR5LCB0cmFuc2l0OiBob3RlbC5zY29yZS50cmFuc2l0LCBzcG90OiBob3RlbC5zY29yZS5zcG90fVxyXG5cclxuICAgICAgICAgICAgbGV0IGltZ1VybCA9IGhvdGVsLnBob3RvWzBdXHJcbiAgICAgICAgICAgIGlmKCFpbWdVcmwpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLsnbTrr7jsp4Dsl4bri6RcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiaG90ZWxDYXJkV3JhcFwiIGlkPVwiJyt0aGlzLnNjb3JlQXJyYXlbaV0uaGlkKydcIj48ZGl2IGNsYXNzPVwiaG90ZWxDYXJkXCI+PGRpdiBjbGFzcz1cImJhc2ljSW5mb1wiPjxkaXYgY2xhc3M9XCJob3RlbF9yYW5rXCI+PGltZyBzcmM9XCIuL2Fzc2V0cy9sYWJlbC5zdmdcIj48cD4nO1xyXG4gICAgICAgICAgICB0eHQrPSByYW5rICsgJ+ychDwvcD48L2Rpdj48ZGl2IGNsYXNzPVwidGh1bWJGcmFtZVwiPjxpbWcgY2xhc3M9XCJob3RlbFRodW1iXCIgc3JjPVwiJyArIGltZ1VybCArICdcIiBhbHQ9XCLtmLjthZQg7IKs7KeEXCI+PC9kaXY+PGRpdiBjbGFzcz1cInRleHRJbmZvXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxoMyBjbGFzcz1cImtvXCI+JyArIGtvck5hbWUgKyAnPC9oMz48cCBjbGFzcz1cImhvdGVsTmFtZV9lblwiPicgKyBlbmdOYW1lICsgJzwvcD48ZGl2IGNsYXNzPVwicmF0aW5nXCI+PHAgY2xhc3M9XCJzdWJUaXRsZSBrb1wiPuyEseq4iTwvcD4nO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDU7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoajxzdGFyKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSc8c3BhbiBjbGFzcz1cImljb24gaWNvbi0tc3RhcnMtZnVsbFwiPjwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihqPT09c3RhciAmJiBoYWxmU3Rhcil7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHNwYW4gY2xhc3M9XCJpY29uIGljb24tLXN0YXJzLWhhbGZcIj48L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHNwYW4gY2xhc3M9XCJpY29uIGljb24tLXN0YXJzLWVtcHR5XCI+PC9zcGFuPidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cInN1YlRpdGxlIGtvXCI+7Y+J7KCQPC9wPjxwIGNsYXNzPVwicmF0aW5nU2NvcmVcIj4nK3JhdGluZ1Njb3JlKyc8L3A+PC9kaXY+PGRpdiBjbGFzcz1cImhvdGVsX3ByaWNlXCI+PHAgY2xhc3M9XCJjdXJyZW50XCI+PC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwiY3Jvc3NlZE91dFwiPjwvcD48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwic2NvcmVJbmZvXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cImxpbmVcIj48c3BhbiBjbGFzcz1cImljb24gaWNvbi0tc2NvcmUtc3BvdFwiPjwvc3Bhbj48cCBjbGFzcz1cImluZm9UeHQga29cIj7qtIDqtJHsp4Ag7KCR6re87ISxPC9wPjxwIGNsYXNzPVwic2NvcmUga28gc2NvcmVfc3BvdFwiPidcclxuICAgICAgICAgICAgdHh0Kz0gc2NvcmUuc3BvdCArICc8L3A+PHNwYW4gY2xhc3M9XCJpY29uIGljb24tLXNjb3JlLXRyYW5zaXRcIj48L3NwYW4+PHAgY2xhc3M9XCJpbmZvVHh0IGtvXCI+64yA7KSR6rWQ7Ya1PC9wPjxwIGNsYXNzPVwic2NvcmUga28gc2NvcmVfdHJhbnNpdFwiPidcclxuICAgICAgICAgICAgdHh0Kz0gc2NvcmUudHJhbnNpdCArICc8L3A+PHNwYW4gY2xhc3M9XCJpY29uIGljb24tLXNjb3JlLXNhZmV0eVwiPjwvc3Bhbj48cCBjbGFzcz1cImluZm9UeHQga29cIj7suZjslYg8L3A+PHAgY2xhc3M9XCJzY29yZSBrbyBzY29yZV9zYWZldHlcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9IHNjb3JlLnNhZmV0eSArICc8L3A+PC9kaXY+PGRpdiBjbGFzcz1cImxpbmVcIj48c3BhbiBjbGFzcz1cImljb24gaWNvbi0tc2NvcmUtZmFjaWxpdHlcIj48L3NwYW4+PHAgY2xhc3M9XCJpbmZvVHh0IGtvXCI+7KO867OA7Y647J2Y7Iuc7ISkPC9wPjxwIGNsYXNzPVwic2NvcmUga28gc2NvcmVfZmFjaWxpdHlcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9IHNjb3JlLmZhY2lsaXR5ICsgJzwvcD48cCBjbGFzcz1cImhpbnRcIj4qNS4wIOunjOygkDwvcD48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICBsZXQgaXdUeHQgPSAnPGRpdiBjbGFzcz1cImhvdGVsQ2FyZF9tYXBcIj48ZGl2IGNsYXNzPVwiaW1nU2l6ZXJcIj48aW1nIHNyYz1cIicraW1nVXJsKydcIj48L2Rpdj48ZGl2IGNsYXNzPVwiaXdfcmFua1wiPjxpbWcgc3JjPVwiLi9hc3NldHMvbGFiZWwuc3ZnXCI+PHAgY2xhc3M9XCJyYW5rXCI+JytyYW5rKyfsnIQ8L3A+PC9kaXY+PGRpdiBjbGFzcz1cImNvbnRlbnRzXCI+J1xyXG4gICAgICAgICAgICBpd1R4dCs9ICc8cCBjbGFzcz1cIm5hbWVfa28ga29cIj4nK2tvck5hbWUrJzwvcD48cCBjbGFzcz1cIm5hbWVfZW5cIj4nK2VuZ05hbWUrJzwvcD48ZGl2IGNsYXNzPVwiaW5mb2luZm9cIj48ZGl2IGNsYXNzPVwibGluZXJcIj48cCBjbGFzcz1cInN1YlRpdGxlIGtvXCI+7ISx6riJPC9wPidcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA1OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGo8c3Rhcil7XHJcbiAgICAgICAgICAgICAgICAgICAgaXdUeHQrPSc8c3BhbiBjbGFzcz1cImljb24gaWNvbi0tc3RhcnMtZnVsbFwiPjwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihqPT09c3RhciAmJiBoYWxmU3Rhcil7XHJcbiAgICAgICAgICAgICAgICAgICAgaXdUeHQrPSc8c3BhbiBjbGFzcz1cImljb24gaWNvbi0tc3RhcnMtaGFsZlwiPjwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpd1R4dCs9JzxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLS1zdGFycy1lbXB0eVwiPjwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGl3VHh0Kz0nPC9kaXY+PGRpdiBjbGFzcz1cImxpbmVyXCI+PHAgY2xhc3M9XCJzdWJUaXRsZSBrb1wiPu2PieygkDwvcD48cCBjbGFzcz1cInJhdGluZ1Njb3JlXCI+JytyYXRpbmdTY29yZSsnPC9wPjwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIGl3VHh0Kz0nPGRpdiBjbGFzcz1cImhvdGVsX3ByaWNlXCIgaWQ9XCJpd18nK3RoaXMuc2NvcmVBcnJheVtpXS5oaWQrJ1wiPjxwIGNsYXNzPVwiY3VycmVudFwiPjwvcD48cCBjbGFzcz1cImNyb3NzZWRPdXRcIj48L3A+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgaG90ZWwuaW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGl3VHh0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIuaG90ZWxzRGl2XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coaGlkQXJyYXkpXHJcbiAgICAgICAgbGV0IHBvc3REYXRhID0ge1xyXG4gICAgICAgICAgICBob3RlbElkIDogaGlkQXJyYXksXHJcbiAgICAgICAgXHRjaGVja0luOlwiMjAxOC0wNC0wNFwiLFxyXG4gICAgICAgIFx0Y2hlY2tPdXQ6XCIyMDE4LTA0LTA1XCIsXHJcbiAgICAgICAgXHRhZHVsdDoyXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgdXJsOiAnL2Fnb2RhJyxcclxuICAgICAgICAgICAgZGF0YTpKU09OLnN0cmluZ2lmeShwb3N0RGF0YSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOidhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6J2pzb24nLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5yZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNyb3NzUHJpY2UgPSBcIlwiXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEucmVzdWx0c1tpXS5jcm9zc2VkT3V0UmF0ZT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3Jvc3NQcmljZSArPSAnJiM4MzYxOycrZGF0YS5yZXN1bHRzW2ldLmNyb3NzZWRPdXRSYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJQcmljZSA9IFwiJiM4MzYxO1wiICsgZGF0YS5yZXN1bHRzW2ldLmRhaWx5UmF0ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSBkYXRhLnJlc3VsdHNbaV0uaG90ZWxJZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNcIitpZCtcIiAuY3VycmVudFwiKS5odG1sKGN1clByaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI1wiK2lkK1wiIC5jcm9zc2VkT3V0XCIpLmh0bWwoY3Jvc3NQcmljZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpd19cIitpZCtcIiAuY3VycmVudFwiKS5odG1sKGN1clByaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2l3X1wiK2lkK1wiIC5jcm9zc2VkT3V0XCIpLmh0bWwoY3Jvc3NQcmljZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxldCBzaG93Q2FyZCA9IGZ1bmN0aW9uKHNob3dJZHgpe1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGF0LmhvdGVsc1t0aGF0LnNjb3JlQXJyYXlbc2hvd0lkeF0uaGlkXTtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IHRoYXQuc2NvcmVBcnJheVtzaG93SWR4XS5oaWQ7XHJcbiAgICAgICAgICAgIGxldCB4T3JpZ2luID0gMTNcclxuICAgICAgICAgICAgaWYoc2hvd0lkeD44KXtcclxuICAgICAgICAgICAgICAgIHhPcmlnaW4gPSAxMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHNob3dJZHggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgbWFwLnNldFpvb20oMTQpO1xyXG4gICAgICAgICAgICAgICAgbWFwLnNldENlbnRlcihob3RlbC5jb29yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoc2hvd0lkeDwxNSl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmhvdGVsQ2FyZFdyYXBcIikuZXEoc2hvd0lkeCkuYWRkQ2xhc3MoXCJub3JtYWxTY2FsZVwiKTtcclxuICAgICAgICAgICAgICAgIHNob3dJZHgrK1xyXG4gICAgICAgICAgICAgICAgJChcIi5ub09mSG90ZWxcIikuaHRtbChzaG93SWR4KVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NhcmQoc2hvd0lkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBob3RlbC5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMDAgLSBzaG93SWR4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIuL2Fzc2V0cy9ob3RlbHBpbi1tYXAuc3ZnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbE9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KHhPcmlnaW4sIDE1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OlwiXCIrKHNob3dJZHgpK1wi7JyEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjpcIndoaXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzExcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzonLTFweCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5tYXJrZXIuYWRkTGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuaW5mb3dpbmRvdy5vcGVuKG1hcCwgaG90ZWwubWFya2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5ob3RlbENhcmRXcmFwW2lkPSdcIiArIGhpZCArIFwiJ11cIikuYWRkQ2xhc3MoXCJob3RlbEZyaWVuZE92ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b3RhbEhlaWdodCA9ICQoXCIuaG90ZWxzXCIpLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0U2Nyb2xsID0gJChcIi5ob3RlbENhcmRXcmFwW2lkPSdcIiArIGhpZCArIFwiJ11cIikucG9zaXRpb24oKS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U2Nyb2xsID0gJChcIi5ob3RlbHNcIikuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0YXJnZXRTY3JvbGwgPiB0b3RhbEhlaWdodCAtIDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmhvdGVsc1wiKS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wOmN1cnJlbnRTY3JvbGwgKyB0YXJnZXRTY3JvbGwgLSAxMDB9LCAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0YXJnZXRTY3JvbGw8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmhvdGVsc1wiKS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wOmN1cnJlbnRTY3JvbGwgKyB0YXJnZXRTY3JvbGwgLSAxMDB9LCAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLm1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmluZm93aW5kb3cuY2xvc2UobWFwLCBob3RlbC5tYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmhvdGVsQ2FyZFdyYXBbaWQ9J1wiICsgaGlkICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcImhvdGVsRnJpZW5kT3ZlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzaG93Q2FyZCgwKVxyXG4gICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93RGV0YWlsOiBmdW5jdGlvbihoaWQsIHJhbmssIHNlbGVjdGVkLCBjaGVja0luLCBjaGVja091dCl7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmFuaylcclxuICAgICAgICAkKFwiLmhvdGVsRGV0YWlsIC5pbmZvXCIpLmh0bWwoXCJcIilcclxuICAgICAgICAkKFwiLndyYXBfaG90ZWxEZXRhaWxcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmhvdGVsc1toaWRdO1xyXG5cclxuICAgICAgICBsZXQgc3RhciA9IGhvdGVsLnN0YXI7XHJcbiAgICAgICAgbGV0IGhhbGZTdGFyID0gZmFsc2U7XHJcbiAgICAgICAgaWYoc3RhciUxID09PSAwLjUpe1xyXG4gICAgICAgICAgICBzdGFyIC09IDAuNTtcclxuICAgICAgICAgICAgaGFsZlN0YXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5ob3RlbERldGFpbCAucmFua1wiKS5odG1sKChyYW5rKzEpK1wi7JyEXCIpO1xyXG4gICAgICAgICQoXCIuaG90ZWxEZXRhaWwgLmhvdGVsTmFtZV9rb1wiKS5odG1sKGhvdGVsLm5hbWUua28pO1xyXG4gICAgICAgICQoXCIuaG90ZWxEZXRhaWwgLmhvdGVsTmFtZV9lblwiKS5odG1sKGhvdGVsLm5hbWUuZW4pO1xyXG4gICAgICAgICQoXCIuc3RhckFuZFJhdGluZz4uaWNvblwiKS5yZW1vdmVDbGFzcyhcImljb24tLXN0YXJzLWhhbGYgaWNvbi0tc3RhcnMtZW1wdHkgaWNvbi0tc3RhcnMtZnVsbFwiKVxyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDU7IGorKykge1xyXG4gICAgICAgICAgICBpZihqPHN0YXIpe1xyXG4gICAgICAgICAgICAgICAgJChcIi5zdGFyQW5kUmF0aW5nPi5pY29uXCIpLmVxKGopLmFkZENsYXNzKFwiaWNvbi0tc3RhcnMtZnVsbFwiKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoaj09PXN0YXIgJiYgaGFsZlN0YXIpe1xyXG4gICAgICAgICAgICAgICAgJChcIi5zdGFyQW5kUmF0aW5nPi5pY29uXCIpLmVxKGopLmFkZENsYXNzKFwiaWNvbi0tc3RhcnMtaGFsZlwiKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnN0YXJBbmRSYXRpbmc+Lmljb25cIikuZXEoaikuYWRkQ2xhc3MoXCJpY29uLS1zdGFycy1lbXB0eVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAkKFwiLmhvdGVsRGV0YWlsIC5yYXRpbmdTY29yZVwiKS5odG1sKGhvdGVsLmdyYWRlX2F2Zyk7XHJcbiAgICAgICAgJChcIi5ob3RlbERldGFpbCAuaG90ZWxJbWdcIikuYXR0cihcInNyY1wiLGhvdGVsLnBob3RvWzBdKTtcclxuICAgICAgICBpZighaG90ZWwucGhvdG8pe1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDsnbTrr7jsp4Ag7JeG64qU6rK97JqwXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi7J2066+47KeA7JeG64ukXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIuc2NvcmVPdmFsXCIpLnJlbW92ZUNsYXNzKFwic29fZnVsbCBzb19oYWxmXCIpXHJcblxyXG4gICAgICAgIGlmKHN0YXIlMSA9PT0gMC41KXtcclxuICAgICAgICAgICAgc3RhciAtPSAwLjU7XHJcbiAgICAgICAgICAgIGhhbGZTdGFyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNyaXRlcmlhIGluIGhvdGVsLnNjb3JlKSB7XHJcbiAgICAgICAgICAgIGxldCBoYWxmU2NvcmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gaG90ZWwuc2NvcmVbY3JpdGVyaWFdO1xyXG4gICAgICAgICAgICBpZihzY29yZSUxID09PSAwLjUpe1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgLT0gMC41O1xyXG4gICAgICAgICAgICAgICAgaGFsZlNjb3JlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKFwiLmhvdGVsRGV0YWlsIC5zY29yZV9cIitjcml0ZXJpYSkuaHRtbChob3RlbC5zY29yZVtjcml0ZXJpYV0pXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoaTxzY29yZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5cIitjcml0ZXJpYStcIj4uc2NvcmVPdmFsXCIpLmVxKGkpLmFkZENsYXNzKFwic29fZnVsbFwiKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGk9PT1zY29yZSAmJiBoYWxmU2NvcmUpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuXCIrY3JpdGVyaWErXCI+LnNjb3JlT3ZhbFwiKS5lcShpKS5hZGRDbGFzcyhcInNvX2hhbGZcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlbHRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZWN0ZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoc2VsZWN0ZWRbaV0pe1xyXG4gICAgICAgICAgICAgICAgc2VsdEFycmF5LnB1c2goaSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZm9vdEFycmF5ID0gW107XHJcbiAgICAgICAgbGV0IGZvb3REaXN0YW5jZUFycmF5ID0gW107XHJcbiAgICAgICAgbGV0IHRyYW5zaXRBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBpZihob3RlbC5zcG90cy5mb290KXtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob3RlbC5zcG90cy5mb290Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2lkID0gaG90ZWwuc3BvdHMuZm9vdFtpXS5pZDtcclxuICAgICAgICAgICAgICAgIGlmKHNlbHRBcnJheS5pbmNsdWRlcyhzaWQpKXtcclxuICAgICAgICAgICAgICAgICAgICBmb290QXJyYXkucHVzaChzaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdERpc3RhbmNlQXJyYXkucHVzaChob3RlbC5zcG90cy5mb290W2ldLmRpc3RhbmNlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsdEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzaWQgPSBzZWx0QXJyYXlbaV1cclxuICAgICAgICAgICAgaWYoaG90ZWwuc3BvdHMudHJhbnNwb3J0W3NpZF0pe1xyXG4gICAgICAgICAgICAgICAgaWYoIWZvb3RBcnJheS5pbmNsdWRlcyhzaWQpKXtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0QXJyYXkucHVzaChzaWQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgdGV4dF9zcG90ID0gXCJcIlxyXG5cclxuICAgICAgICBpZihmb290QXJyYXkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICB0ZXh0X3Nwb3QgKz0gXCLshKDtg53tlZwgXCIgKyBzZWx0QXJyYXkubGVuZ3RoICsgXCLqsJwg7KSRIFwiICsgZm9vdEFycmF5Lmxlbmd0aCtcIuqwnOydmCDqtIDqtJHsp4DqsIAg64+E67O0IDIw67aE6rGw66asIOydtOuCtOyXkCDsnITsuZjtlZjqs6Ag7J6I6rOgLCBcIjtcclxuICAgICAgICAgICAgdGV4dF9zcG90ICs9IFwi64KY66i47KeAIFwiKyhzZWx0QXJyYXkubGVuZ3RoIC0gZm9vdEFycmF5Lmxlbmd0aCkgK1wi6rCcIOykkSBcIit0cmFuc2l0QXJyYXkubGVuZ3RoK1wi6rCc7J2YIOq0gOq0keyngOulvCDsp4DtlZjssqDroZwg7ZmY7Iq5IOyXhuydtCDqsIgg7IiYIOyeiOyKteuLiOuLpC5cIlxyXG4gICAgICAgIH1lbHNlIGlmKHRyYW5zaXRBcnJheS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIHRleHRfc3BvdCArPSBcIuyEoO2Dne2VnCBcIiArIHNlbHRBcnJheS5sZW5ndGggKyBcIuqwnOydmCDqtIDqtJHsp4Ag7KSRIOuPhOuztOuhnCDqsIgg7IiYIOyeiOuKlCDqtIDqtJHsp4DripQg7JeG7KeA66eMIFwiO1xyXG4gICAgICAgICAgICB0ZXh0X3Nwb3QgKz0gdHJhbnNpdEFycmF5Lmxlbmd0aCtcIuqwnOydmCDqtIDqtJHsp4Drpbwg7KeA7ZWY7LKg66GcIO2ZmOyKuSDsl4bsnbQg6rCIIOyImCDsnojsirXri4jri6QuXCJcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGV4dF9zcG90ICs9IFwi7ISg7YOd7ZWcIOq0gOq0keyngOqwgCDrhIjrrLQg7KCB7Ja0IOq0gOq0keyngCDsoJHqt7zshLHsnYQg6rOE7IKw7ZWgIOyImCDsl4bsirXri4jri6QuXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0ZXh0X3RyYW5zaXQgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZihob3RlbC5tZXRybyl7XHJcbiAgICAgICAgICAgIGxldCBtZXRBcnJheSA9IE9iamVjdC5rZXlzKGhvdGVsLm93bk1ldHJvKTtcclxuICAgICAgICAgICAgdGV4dF90cmFuc2l0ICs9IFwi64+E67O0IDEw67aE6rGw66asIOydtOuCtOyXkCBcIitob3RlbC5tZXRyby5sZW5ndGgrXCLqsJzsnZgg7KeA7ZWY7LKgIOyXreydtCDsnojqs6AsIOyngOuCmOuKlCDrhbjshKDsnYAgXCJcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0QXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRleHRfdHJhbnNpdCArPSAnPHNwYW4gY2xhc3M9XCJsaW5lTmFtZSBsbl8nK21ldEFycmF5W2ldKydcIj4nK21ldEFycmF5W2ldKyc8L3NwYW4+J1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0ZXh0X3RyYW5zaXQgKz1cIiDsnoXri4jri6QuIFwiXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRleHRfdHJhbnNpdCArPSBcIuyjvOuzgOyXkCDsp4DtlZjssqAg7Jet7J20IOyXhuyKteuLiOuLpCFcIlxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHN3aXRjaCAoaG90ZWwuc2NvcmUudHJhbnNpdCkge1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICB0ZXh0X3RyYW5zaXQrPVwi64yA7KSR6rWQ7Ya17J2YIOy1nOqzoCDsmpTsp4Dsl5Ag7JyE7LmY7ZWcIOyImeyGjOyeheuLiOuLpC5cIlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIDQuNTpcclxuICAgICAgICAgICAgICAgIHRleHRfdHJhbnNpdCs9XCLrjIDspJHqtZDthrXsnYQg7J207Jqp7ZWY6riwIOunpOyasCDtjrjrpqztlZwg7JyE7LmY7JeQIOyeiOuKlCDsiJnshozsnoXri4jri6QuXCJcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgdGV4dF90cmFuc2l0Kz1cIuyjvOuzgCDrjIDspJHqtZDthrXsnbQg7J6YIOuwnOuLrOuQnCDtjrjsnoXri4jri6QuXCJcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGV4dF90cmFuc2l0Kz1cIlwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGV4dF9zYWZldHkgPSBcIlwiO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGhvdGVsLmFyZWEpe1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICB0ZXh0X3NhZmV0eSs9XCLribTsmpUg66eo7ZW07Yq8IOuCtOyXkOyEnOuPhCDsnKDrj5nsnbjqtazqsIAg6rCA7J6lIOunjuydgCDtg4DsnoTsiqTtgJjslrQg67aA6re87JeQIOychOy5mO2VnCDsiJnshozsnoXri4jri6QuIFwiXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHRleHRfc2FmZXR5Kz1cIuuJtOyalSDrp6jtlbTtirwg64K07JeQ7ISc64+EIOyViOyghO2VnCDtjrjsl5Ag7IaN7ZWY64qUIOq4iOycteyngOq1rOyXkCDsnITsuZjtlZwg7IiZ7IaM7J6F64uI64ukLiBcIlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICB0ZXh0X3NhZmV0eSs9XCLribTsmpUg64K0IOy1nOyDgeulmOy4teydtCDqsbDso7ztlZjripQg7Ja07Y28IOydtOyKpO2KuCDsgqzsnbTrk5zsl5Ag7JyE7LmY7ZWcIOyImeyGjOyeheuLiOuLpC4gXCJcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGV4dF9zYWZldHkrPVwiXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGhvdGVsLnNjb3JlLnNhZmV0eT40LjQpe1xyXG4gICAgICAgICAgICBpZihob3RlbC5zY29yZS5mYWNpbGljeT40LjQpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwucG9saWNlU3RhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dF9zYWZldHkrPVwi7KO867OA7JeQIOyDgeygkOydtCDrp47snbQg7J6I7Jy866mwIOqyveywsOyEnOqwgCDqsIDquYzsmrQg6rOz7JeQIOyeiOyWtCDqtYnsnqXtnogg7JWI7KCE7ZWp64uI64ukLlwiXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihob3RlbC5zY29yZS50cmFuc2l0ID4gNC40KXtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0X3NhZmV0eSs9XCLso7zrs4Dsl5Ag7IOB7KCQ7J20IOunjuqzoCDsp4DtlZjssqDsl63snbQg6rCA6rmM7Jq0IOqzs+yXkCDsnojslrQg67CkIOuKpuqyjCDri6Tri4jquLDsl5Drj4Qg64KY7IGY7KeAIOyViuyKteuLiOuLpC5cIlxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgXCLso7zrs4Dsl5Ag7IOB7KCQIOuTsSDtjrjsnZjsi5zshKTsnbQg7J6YIOqwluy2lOyWtOyguCDsnojslrQg7KCE67CY7KCB7Jy866GcIOy5mOyViOydtCDsoovsirXri4jri6QuXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYoaG90ZWwubG9jYWwucG9saWNlU3RhdGlvbil7XHJcbiAgICAgICAgICAgICAgICB0ZXh0X3NhZmV0eSs9XCLqsr3ssLDshJzqsIAg6rCA6rmM7Jq0IOqzs+yXkCDsnojslrQg6rWJ7J6l7Z6IIOyViOyghO2VqeuLiOuLpC5cIlxyXG4gICAgICAgICAgICB9ZWxzZSBpZihob3RlbC5zY29yZS50cmFuc2l0ID4gNC40KXtcclxuICAgICAgICAgICAgICAgIHRleHRfc2FmZXR5Kz1cIuyngO2VmOyyoOyXreydtCDqsIDquYzsmrQg6rOz7JeQIOyeiOyWtCDrsKQg64qm6rKMIOuLpOuLiOq4sOyXkOuPhCDrgpjsgZjsp4Ag7JWK7Iq164uI64ukLlwiXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGV4dF9zYWZldHkrPVwi7LmY7JWI7J20IOyii+ydgCDtjrjsnoXri4jri6QuXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmKGhvdGVsLnNjb3JlLnNhZmV0eT4zLjQpe1xyXG4gICAgICAgICAgICBpZihob3RlbC5zY29yZS5mYWNpbGljeT40LjQpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwuc2NvcmUudHJhbnNpdCA+IDQuNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dF9zYWZldHkrPVwi7KO867OA7JeQIOyDgeygkOydtCDrp47qs6Ag7KeA7ZWY7LKg7Jet7J20IOqwgOq5jOyatCDqs7Psl5Ag7J6I7Ja0IOy5mOyViOydtCDqtJzssK7snYAg7Y647J6F64uI64ukLlwiXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0X3NhZmV0eSs9XCLso7zrs4Dsl5Ag7Y647J2Y7Iuc7ISk7J20IOyemCDqsJbstpTslrTsp4Qg7Y647J206528IOy5mOyViOydtCDqtJzssK7snYAg7Y647J6F64uI64ukLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGhvdGVsLnNjb3JlLnRyYW5zaXQgPiA0LjQpe1xyXG4gICAgICAgICAgICAgICAgdGV4dF9zYWZldHkrPVwi7KeA7ZWY7LKg7Jet7J20IOqwgOq5jOyatCDqs7Psl5Ag7J6I7Ja0IOy5mOyViOydtCDqtJzssK7snYAg7Y647J6F64uI64ukLlwiXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGV4dF9zYWZldHkrPVwi7LmY7JWI7J20IOuCmOyBmOyngOuKlCDslYrsirXri4jri6QuXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0ZXh0X3NhZmV0eSs9XCLsnbQg7IiZ7IaMIOyjvOuzgOyngOyXreydmCDsuZjslYjsnYAg67O07Ya1IOyImOykgOyeheuLiOuLpC5cIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRleHRfZmFjaWxpdHkgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZihob3RlbC5zY29yZS5mYWNpbGl0eSA+IDQuNCl7XHJcbiAgICAgICAgICAgIHRleHRfZmFjaWxpdHkgKz0gXCLso7zrs4Ag7Y647J2Y7Iuc7ISk7J20IOyemCDtmJXshLHrkJjslrQg7J6I7Iq164uI64ukLiBcIlxyXG4gICAgICAgICAgICBpZihob3RlbC5sb2NhbC5ncm9jZXJ5Lm5lYXJlc3Q8MTUwKXtcclxuICAgICAgICAgICAgICAgIHRleHRfZmFjaWxpdHkgKz0gXCLqsIDsnqUg6rCA6rmM7Jq0IOyLneujjO2SiOygkOydtCDrj4Trs7QgMX4y67aE6rGw66asIOuCtOyXkCDsnITsuZjtlZjqs6Ag7J6I7Iq164uI64ukLlwiXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGhvdGVsLmxvY2FsLmdyb2NlcnkubmVhcmVzdDwyMDApe1xyXG4gICAgICAgICAgICAgICAgdGV4dF9mYWNpbGl0eSArPSBcIuqwgOyepSDqsIDquYzsmrQg7Iud66OM7ZKI7KCQ7J20IOuPhOuztCAzfjTrtoTqsbDrpqwg64K07JeQIOychOy5mO2VmOqzoCDsnojsirXri4jri6QuXCJcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0ZXh0X2ZhY2lsaXR5ICs9IFwi7IiZ7IaMIOyjvOuzgOyXkCDrp47snYAg7Iud66OM7ZKI7KCQ65Ok7J20IOyeiOyKteuLiOuLpC5cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYoaG90ZWwuc2NvcmUuZmFjaWxpdHkgPT09IDQpe1xyXG4gICAgICAgICAgICB0ZXh0X2ZhY2lsaXR5ICs9IFwi7KO867OAIO2OuOydmOyLnOyEpOydtCDsnpgg7ZiV7ISx65CcIO2OuOyeheuLiOuLpC4gXCJcclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwuZ3JvY2VyeS5uZWFyZXN0PDE1MCl7XHJcbiAgICAgICAgICAgICAgICB0ZXh0X2ZhY2lsaXR5ICs9IFwi6rCA7J6lIOqwgOq5jOyatCDsi53ro4ztkojsoJDsnbQg64+E67O0IDF+Muu2hOqxsOumrCDrgrTsl5Ag7JyE7LmY7ZWY6rOgIOyeiOyKteuLiOuLpC5cIlxyXG4gICAgICAgICAgICB9ZWxzZSBpZihob3RlbC5sb2NhbC5ncm9jZXJ5Lm5lYXJlc3Q8MjAwKXtcclxuICAgICAgICAgICAgICAgIHRleHRfZmFjaWxpdHkgKz0gXCLqsIDsnqUg6rCA6rmM7Jq0IOyLneujjO2SiOygkOydtCDrj4Trs7QgM34067aE6rGw66asIOuCtOyXkCDsnITsuZjtlZjqs6Ag7J6I7Iq164uI64ukLlwiXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGV4dF9mYWNpbGl0eSArPSBcIuyImeyGjCDso7zrs4Dsl5Ag7Iud66OM7ZKI7KCQ65Ok7J20IOyeiOyKteuLiOuLpC5cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRleHRfZmFjaWxpdHkgKz0gXCLsnbQg7IiZ7IaMIOyjvOuzgOyngOyXreydmCDtjrjsnZjsi5zshKTsnYAg67O07Ya1IOyImOykgOyeheuLiOuLpC5cIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5ob3RlbERldGFpbCAuaW5mb1R4dFwiKS5lcSgwKS5odG1sKHRleHRfc3BvdClcclxuICAgICAgICAkKFwiLmhvdGVsRGV0YWlsIC5pbmZvVHh0XCIpLmVxKDEpLmh0bWwodGV4dF90cmFuc2l0KVxyXG4gICAgICAgICQoXCIuaG90ZWxEZXRhaWwgLmluZm9UeHRcIikuZXEoMikuaHRtbCh0ZXh0X3NhZmV0eSlcclxuICAgICAgICAkKFwiLmhvdGVsRGV0YWlsIC5pbmZvVHh0XCIpLmVxKDMpLmh0bWwodGV4dF9mYWNpbGl0eSlcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coaG90ZWwpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGxldCBmb290VHh0ID0gXCJcIjtcclxuICAgICAgICBsZXQgbWV0cm9UeHQgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZihmb290QXJyYXkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZvb3RBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBTcG90cy5saXN0W2Zvb3RBcnJheVtpXV07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9vdFR4dCArPSAnPGRpdiBjbGFzcz1cInNwb3RDYXJkV3JhcHBlciBzZWxlY3RlZFwiPjxkaXYgY2xhc3M9XCJzcG90Q2FyZFwiPjxkaXYgY2xhc3M9XCJpbWdTaXplclwiPjxpbWcgY2xhc3M9XCJpbWdPdXRcIiBzcmM9XCIuL2Fzc2V0cy9pbWFnZS1vdXQucG5nXCI+JztcclxuICAgICAgICAgICAgICAgIGZvb3RUeHQgKz0gJzxkaXYgY2xhc3M9XCJpbmZvSW1hZ2UgbnlfJytmb290QXJyYXlbaV0rJ1wiPjwvZGl2PjwvZGl2PjxwIGNsYXNzPVwicmFua1wiPicrKGRhdGEucmFuaysxKSsn7JyEPC9wPjxkaXYgY2xhc3M9XCJjb250ZW50c1wiPic7XHJcbiAgICAgICAgICAgICAgICBmb290VHh0ICs9ICc8cCBjbGFzcz1cIm5hbWVfa28ga29cIj4nK2RhdGEubmFtZSsnPC9wPjxwIGNsYXNzPVwibmFtZV9lblwiPicrZGF0YS5uYW1lKyc8L3A+PHAgY2xhc3M9XCJkZXNjcmlwdGlvblwiPicrZGF0YS5kZXNjcmlwdGlvbisnPC9wPjwvZGl2PidcclxuICAgICAgICAgICAgICAgIGZvb3RUeHQgKz0gJzxkaXYgY2xhc3M9XCJmb290ZXJcIj48cD7siJnshozroZzrtoDthLAgJytmb290RGlzdGFuY2VBcnJheVtpXSsnbTwvcD48L2Rpdj48L2Rpdj48L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtb3JlRm9vdENvdW50ID0gMDtcclxuICAgICAgICBmb290VHh0Kz0nPGRpdiBjbGFzcz1cInNwb3RDYXJkV3JhcHBlciBtb3JlRm9vdCBkaXNwbGF5Tm9uZVwiPjxwIGNsYXNzPVwibW9yZUNvdW50XCI+PC9wPjxwPuyEoO2DnSDslYjtlZwg7Lm065OcIOuNlCDrs7TquLA8L3A+PC9kaXY+J1xyXG4gICAgICAgIGlmKGhvdGVsLnNwb3RzLmZvb3Qpe1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvdGVsLnNwb3RzLmZvb3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzaWQgPSBob3RlbC5zcG90cy5mb290W2ldLmlkO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gaG90ZWwuc3BvdHMuZm9vdFtpXS5kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgIGlmKCFmb290QXJyYXkuaW5jbHVkZXMoc2lkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBTcG90cy5saXN0W3NpZF1cclxuICAgICAgICAgICAgICAgICAgICBtb3JlRm9vdENvdW50KytcclxuICAgICAgICAgICAgICAgICAgICBmb290VHh0ICs9ICc8ZGl2IGNsYXNzPVwic3BvdENhcmRXcmFwcGVyIHVuU2VsZWN0ZWQgZGlzcGxheU5vbmVcIj48ZGl2IGNsYXNzPVwic3BvdENhcmRcIj48ZGl2IGNsYXNzPVwiaW1nU2l6ZXJcIj48aW1nIGNsYXNzPVwiaW1nT3V0XCIgc3JjPVwiLi9hc3NldHMvaW1hZ2Utb3V0LnBuZ1wiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdFR4dCArPSAnPGRpdiBjbGFzcz1cImluZm9JbWFnZSBueV8nK3NpZCsnXCI+PC9kaXY+PC9kaXY+PHAgY2xhc3M9XCJyYW5rXCI+JysoZGF0YS5yYW5rKzEpKyfsnIQ8L3A+PGRpdiBjbGFzcz1cImNvbnRlbnRzXCI+JztcclxuICAgICAgICAgICAgICAgICAgICBmb290VHh0ICs9ICc8cCBjbGFzcz1cIm5hbWVfa28ga29cIj4nK2RhdGEubmFtZSsnPC9wPjxwIGNsYXNzPVwibmFtZV9lblwiPicrZGF0YS5uYW1lKyc8L3A+PHAgY2xhc3M9XCJkZXNjcmlwdGlvblwiPicrZGF0YS5kZXNjcmlwdGlvbisnPC9wPjwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICBmb290VHh0ICs9ICc8ZGl2IGNsYXNzPVwiZm9vdGVyXCI+PHA+7IiZ7IaM66Gc67aA7YSwICcrZGlzdGFuY2UrJ208L3A+PC9kaXY+PC9kaXY+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYodHJhbnNpdEFycmF5Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0cmFuc2l0QXJyYXkubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzaWQgPSB0cmFuc2l0QXJyYXlbal07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBTcG90cy5saXN0W3RyYW5zaXRBcnJheVtqXV07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhvd1RvR28gPSBcIlwiXHJcbiAgICAgICAgICAgICAgICBsZXQgbGluZSA9IGhvdGVsLnNwb3RzLnRyYW5zcG9ydFtzaWRdLmxpbmU7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1ldHJvRGlzdGFuY2UgPSAwXHJcbiAgICAgICAgICAgICAgICBsZXQgbmVhck1ldHJvRnJvbUhvdGVsID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgbGV0IGhvd0ZhckZyb21Ib3RlbCA9IDIwMDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGluZU5hbWUgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5vd25NZXRyb1tsaW5lW2ldXS5kaXN0YW5jZTxob3dGYXJGcm9tSG90ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3dGYXJGcm9tSG90ZWwgPSBob3RlbC5vd25NZXRyb1tsaW5lW2ldXS5kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVhck1ldHJvRnJvbUhvdGVsID0gaG90ZWwub3duTWV0cm9bbGluZVtpXV0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZU5hbWUgPSBsaW5lW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0Rpc3RhbmNlID0gaG90ZWwuc3BvdHMudHJhbnNwb3J0W3NpZF0uZGlzdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1ldHJvdGltZSA9IDEgKyBNYXRoLnJvdW5kKG1ldHJvRGlzdGFuY2UvNDAwKVxyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVGcm9tSG90ZWwgPSBNYXRoLnJvdW5kKGhvd0ZhckZyb21Ib3RlbC83MClcclxuICAgICAgICAgICAgICAgIGxldCB0U3BvdCA9IFNwb3RzLmxpc3Rbc2lkXS5tZXRybztcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmVhck1ldHJvRnJvbVNwb3QgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICBsZXQgaG93RmFyRnJvbVNwb3QgPSAyMDAwXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0U3BvdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRTcG90W2ldLmxpbmUuaW5jbHVkZXMobGluZU5hbWUpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodFNwb3RbaV0uZGlzdGFuY2UgPCBob3dGYXJGcm9tU3BvdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyTWV0cm9Gcm9tU3BvdCA9IHRTcG90W2ldLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3dGYXJGcm9tU3BvdCA9IHRTcG90W2ldLmRpc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgdGltZUZyb21TcG90ID0gTWF0aC5yb3VuZChob3dGYXJGcm9tU3BvdC83MClcclxuICAgICAgICAgICAgICAgIGxldCB0b3RhbFRpbWUgPSB0aW1lRnJvbVNwb3QgKyBtZXRyb3RpbWUgKyB0aW1lRnJvbUhvdGVsO1xyXG5cclxuICAgICAgICAgICAgICAgIGhvd1RvR28rPSc8cD7siJnshozsl5DshJwgPHNwYW4gY2xhc3M9XCJsaW5lTmFtZSBsbl8nK2xpbmVOYW1lKydcIj4nK2xpbmVOYW1lKyc8L3NwYW4+ICcrbmVhck1ldHJvRnJvbUhvdGVsKyfquYzsp4Ag64+E67O07J2064+ZKOyVvSAnK3RpbWVGcm9tSG90ZWwrJ+u2hCwgJytob3dGYXJGcm9tSG90ZWwrJ20pJysnPC9wPidcclxuICAgICAgICAgICAgICAgIGhvd1RvR28rPSc8cD48c3BhbiBjbGFzcz1cImxpbmVOYW1lIGxuXycrbGluZU5hbWUrJ1wiPicrbGluZU5hbWUrJzwvc3Bhbj4gJytuZWFyTWV0cm9Gcm9tU3BvdCsn7JeQ7IScIO2VmOywqCAo7JW9ICcrbWV0cm90aW1lKyfrtoQpJysnPC9wPidcclxuICAgICAgICAgICAgICAgIGhvd1RvR28rPSc8cD4nK2RhdGEubmFtZSsn6rmM7KeAIOuPhOuztOydtOuPmSjslb0gJyt0aW1lRnJvbVNwb3QrJ+u2hCwgJytob3dGYXJGcm9tU3BvdCsnbSknKyc8L3A+J1xyXG5cclxuICAgICAgICAgICAgICAgIG1ldHJvVHh0ICs9ICc8ZGl2IGNsYXNzPVwic3BvdENhcmRXcmFwcGVyIHNlbGVjdGVkXCI+PGRpdiBjbGFzcz1cInNwb3RDYXJkXCI+PGRpdiBjbGFzcz1cImltZ1NpemVyXCI+PGltZyBjbGFzcz1cImltZ091dFwiIHNyYz1cIi4vYXNzZXRzL2ltYWdlLW91dC5wbmdcIj4nO1xyXG4gICAgICAgICAgICAgICAgbWV0cm9UeHQgKz0gJzxkaXYgY2xhc3M9XCJpbmZvSW1hZ2UgbnlfJyt0cmFuc2l0QXJyYXlbal0rJ1wiPjwvZGl2PjwvZGl2PjxwIGNsYXNzPVwicmFua1wiPicrKGRhdGEucmFuaysxKSsn7JyEPC9wPjxkaXYgY2xhc3M9XCJjb250ZW50c1wiPic7XHJcbiAgICAgICAgICAgICAgICBtZXRyb1R4dCArPSAnPHAgY2xhc3M9XCJuYW1lX2tvIGtvXCI+JytkYXRhLm5hbWUrJzwvcD48cCBjbGFzcz1cIm5hbWVfZW5cIj4nK2RhdGEubmFtZSsnPC9wPjxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPicraG93VG9HbysnPC9kaXY+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgbWV0cm9UeHQgKz0gJzxkaXYgY2xhc3M9XCJmb290ZXJcIj48cD7slb0gJyt0b3RhbFRpbWUrJ+u2hCDshozsmpQ8L3A+PC9kaXY+PC9kaXY+PC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBtZXRyb1R4dCs9JzxkaXYgY2xhc3M9XCJzcG90Q2FyZFdyYXBwZXIgbW9yZU1ldHJvIGRpc3BsYXlOb25lXCI+PHAgY2xhc3M9XCJtb3JlQ291bnRcIj48L3A+PHA+7ISg7YOdIOyViO2VnCDsubTrk5wg642UIOuztOq4sDwvcD48L2Rpdj4nXHJcbiAgICAgICAgbGV0IG1vcmVNZXRyb0NvdW50ID0gMDtcclxuXHJcbiAgICAgICAgaWYoaG90ZWwuc3BvdHMudHJhbnNwb3J0KXtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBPYmplY3Qua2V5cyhob3RlbC5zcG90cy50cmFuc3BvcnQpLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2lkID0gIE9iamVjdC5rZXlzKGhvdGVsLnNwb3RzLnRyYW5zcG9ydClbal0qMVxyXG4gICAgICAgICAgICAgICAgaWYoIXRyYW5zaXRBcnJheS5pbmNsdWRlcyhzaWQpJiYhZm9vdEFycmF5LmluY2x1ZGVzKHNpZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gU3BvdHMubGlzdFtzaWRdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBob3dUb0dvID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gaG90ZWwuc3BvdHMudHJhbnNwb3J0W3NpZF0ubGluZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1ldHJvRGlzdGFuY2UgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5lYXJNZXRyb0Zyb21Ib3RlbCA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaG93RmFyRnJvbUhvdGVsID0gMjAwMDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZU5hbWUgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLm93bk1ldHJvW2xpbmVbaV1dLmRpc3RhbmNlPGhvd0ZhckZyb21Ib3RlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3dGYXJGcm9tSG90ZWwgPSBob3RlbC5vd25NZXRyb1tsaW5lW2ldXS5kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJNZXRyb0Zyb21Ib3RlbCA9IGhvdGVsLm93bk1ldHJvW2xpbmVbaV1dLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lTmFtZSA9IGxpbmVbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0Rpc3RhbmNlID0gaG90ZWwuc3BvdHMudHJhbnNwb3J0W3NpZF0uZGlzdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1ldHJvdGltZSA9IDEgKyBNYXRoLnJvdW5kKG1ldHJvRGlzdGFuY2UvNDAwKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lRnJvbUhvdGVsID0gTWF0aC5yb3VuZChob3dGYXJGcm9tSG90ZWwvNzApXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRTcG90ID0gU3BvdHMubGlzdFtzaWRdLm1ldHJvO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmVhck1ldHJvRnJvbVNwb3QgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhvd0ZhckZyb21TcG90ID0gMjAwMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRTcG90Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRTcG90W2ldLmxpbmUuaW5jbHVkZXMobGluZU5hbWUpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRTcG90W2ldLmRpc3RhbmNlIDwgaG93RmFyRnJvbVNwb3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJNZXRyb0Zyb21TcG90ID0gdFNwb3RbaV0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3dGYXJGcm9tU3BvdCA9IHRTcG90W2ldLmRpc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVGcm9tU3BvdCA9IE1hdGgucm91bmQoaG93RmFyRnJvbVNwb3QvNzApXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvdGFsVGltZSA9IHRpbWVGcm9tU3BvdCArIG1ldHJvdGltZSArIHRpbWVGcm9tSG90ZWw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1vcmVNZXRyb0NvdW50KytcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaG93VG9Hbys9JzxwPuyImeyGjOyXkOyEnCA8c3BhbiBjbGFzcz1cImxpbmVOYW1lIGxuXycrbGluZU5hbWUrJ1wiPicrbGluZU5hbWUrJzwvc3Bhbj4gJytuZWFyTWV0cm9Gcm9tSG90ZWwrJ+q5jOyngCDrj4Trs7TsnbTrj5ko7JW9ICcrdGltZUZyb21Ib3RlbCsn67aELCAnK2hvd0ZhckZyb21Ib3RlbCsnbSknKyc8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgIGhvd1RvR28rPSc8cD48c3BhbiBjbGFzcz1cImxpbmVOYW1lIGxuXycrbGluZU5hbWUrJ1wiPicrbGluZU5hbWUrJzwvc3Bhbj4gJytuZWFyTWV0cm9Gcm9tU3BvdCsn7JeQ7IScIO2VmOywqCAo7JW9ICcrbWV0cm90aW1lKyfrtoQpJysnPC9wPidcclxuICAgICAgICAgICAgICAgICAgICBob3dUb0dvKz0nPHA+JytkYXRhLm5hbWUrJ+q5jOyngCDrj4Trs7TsnbTrj5ko7JW9ICcrdGltZUZyb21TcG90KyfrtoQsICcraG93RmFyRnJvbVNwb3QrJ20pJysnPC9wPidcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1ldHJvVHh0ICs9ICc8ZGl2IGNsYXNzPVwic3BvdENhcmRXcmFwcGVyIHVuU2VsZWN0ZWQgZGlzcGxheU5vbmVcIj48ZGl2IGNsYXNzPVwic3BvdENhcmRcIj48ZGl2IGNsYXNzPVwiaW1nU2l6ZXJcIj48aW1nIGNsYXNzPVwiaW1nT3V0XCIgc3JjPVwiLi9hc3NldHMvaW1hZ2Utb3V0LnBuZ1wiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9UeHQgKz0gJzxkaXYgY2xhc3M9XCJpbmZvSW1hZ2UgbnlfJytzaWQrJ1wiPjwvZGl2PjwvZGl2PjxwIGNsYXNzPVwicmFua1wiPicrKGRhdGEucmFuaysxKSsn7JyEPC9wPjxkaXYgY2xhc3M9XCJjb250ZW50c1wiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9UeHQgKz0gJzxwIGNsYXNzPVwibmFtZV9rbyBrb1wiPicrZGF0YS5uYW1lKyc8L3A+PHAgY2xhc3M9XCJuYW1lX2VuXCI+JytkYXRhLm5hbWUrJzwvcD48ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj4nK2hvd1RvR28rJzwvZGl2PjwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb1R4dCArPSAnPGRpdiBjbGFzcz1cImZvb3RlclwiPjxwPuyVvSAnK3RvdGFsVGltZSsn67aEIOyGjOyalDwvcD48L2Rpdj48L2Rpdj48L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIuaG90ZWxfZm9vdFwiKS5odG1sKGZvb3RUeHQpO1xyXG4gICAgICAgICQoXCIuaG90ZWxfbWV0cm9cIikuaHRtbChtZXRyb1R4dCk7XHJcblxyXG4gICAgICAgIGlmKG1vcmVGb290Q291bnQ+MCl7XHJcbiAgICAgICAgICAgICQoXCIubW9yZUZvb3RcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgJChcIi5tb3JlRm9vdCAubW9yZUNvdW50XCIpLmh0bWwoXCIrIFwiK21vcmVGb290Q291bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtb3JlTWV0cm9Db3VudD4wKXtcclxuICAgICAgICAgICAgJChcIi5tb3JlTWV0cm9cIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgICAgICAgICAkKFwiLm1vcmVNZXRybyAubW9yZUNvdW50XCIpLmh0bWwoXCIrIFwiK21vcmVNZXRyb0NvdW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIuZ29SZXNlcnZhdGlvbj5hXCIpLmF0dHIoXCJocmVmXCIsJ2h0dHBzOi8vd3d3LmFnb2RhLmNvbS9wYXJ0bmVycy9wYXJ0bmVyc2VhcmNoLmFzcHg/Y2lkPTE3OTk4OTgmcGNzPTEmaGlkPScraGlkKycmY2hlY2tpbj0nK2NoZWNrSW4rJyZjaGVja291dD0nK2NoZWNrT3V0KycmaDE9a28mYWR1bHRzPScrdGhpcy5wZW9wbGVObylcclxuICAgIH0sXHJcblxyXG5cclxuICAgIG1vcmVGb290OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoXCIuaG90ZWxfZm9vdCAudW5TZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICB9LFxyXG5cclxuICAgIG1vcmVNZXRybzogZnVuY3Rpb24oKXtcclxuICAgICAgICAkKFwiLmhvdGVsX21ldHJvIC51blNlbGVjdGVkXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb3RlbHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvaG90ZWxzLmpzIiwibGV0IERhdGVQaWNrZXIgPSB7XHJcbiAgICB0ZXh0OiBcIlwiLFxyXG4gICAgaXNGaXJzdDogdHJ1ZSxcclxuICAgIHdlZWtBcnJheTogW1wiKOydvClcIiwgXCIo7JuUKVwiLCBcIijtmZQpXCIsIFwiKOyImClcIiwgXCIo66qpKVwiLCBcIijquIgpXCIsIFwiKO2GoClcIl0sXHJcbiAgICBmaXJzdERhdGU6e30sXHJcbiAgICBzZWNvbmREYXRlOnt9LFxyXG4gICAgZmlyc3REYXRlVHh0OlwiXCIsXHJcbiAgICBzZWNvbmREYXRlVHh0OlwiXCIsXHJcbiAgICB0ZW1wRGF0ZTpcIlwiLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICQoXCIuZGF0ZVBpY2tlclwiKS5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgZGVmYXVsdERhdGU6IFwiKzF3XCIsXHJcblxyXG4gICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2hvb3NlRGF0ZSgkKFwiLmRhdGVQaWNrZXJcIikuZGF0ZXBpY2tlcihcImdldERhdGVcIikpXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIC8v7JWe7J6Q66as66eMIOyEoO2Dne2VmOqzoCDri6vtnowg6rK97JqwIOy0iOq4sO2ZlO2VtOykgOuLpC5cclxuICAgICAgICAgICAgICAgIGlmKCF0aGF0LmlzRmlyc3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGF0YSgnZGF0ZXBpY2tlcicpLmlubGluZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNGaXJzdCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvcmlnaW5EYXRlID0gdGhhdC5maXJzdERhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50ZXh0ID0gKG9yaWdpbkRhdGUuZ2V0TW9udGgoKSsxKStcIuyblCBcIitvcmlnaW5EYXRlLmdldERhdGUoKStcIuydvFwiK3RoYXQud2Vla0FycmF5W29yaWdpbkRhdGUuZ2V0RGF5KCldK1wiIC0gXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luRGF0ZSA9IHRoYXQuc2Vjb25kRGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRleHQgKz0gKG9yaWdpbkRhdGUuZ2V0TW9udGgoKSsxKStcIuyblCBcIitvcmlnaW5EYXRlLmdldERhdGUoKStcIuydvFwiK3RoYXQud2Vla0FycmF5W29yaWdpbkRhdGUuZ2V0RGF5KCldO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuZGF0ZVNob3dlclwiKS5odG1sKHRoYXQudGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5oZF9zaWRlYmFyPi5zdGQ+c3BhblwiKS5lcSgwKS5odG1sKHRoYXQudGV4dClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5maXJzdERhdGUgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgMiAqIDEwMDAgKiA2MCAqIDYwICogMjQpXHJcbiAgICAgICAgdGhpcy5zZWNvbmREYXRlID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIDMgKiAxMDAwICogNjAgKiA2MCAqIDI0KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmlyc3REYXRlKVxyXG4gICAgICAgIHRoaXMuZmlyc3REYXRlVHh0ID0gdGhpcy5mb3JtYXR0ZXIodGhpcy5maXJzdERhdGUpXHJcbiAgICAgICAgdGhpcy5zZWNvbmREYXRlVHh0ID0gdGhpcy5mb3JtYXR0ZXIodGhpcy5zZWNvbmREYXRlKVxyXG5cclxuICAgICAgICBsZXQgZGF0ZSA9IHRoaXMuZmlyc3REYXRlO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IChkYXRlLmdldE1vbnRoKCkrMSkrXCLsm5QgXCIrZGF0ZS5nZXREYXRlKCkrXCLsnbxcIit0aGlzLndlZWtBcnJheVtkYXRlLmdldERheSgpXStcIiAtIFwiO1xyXG4gICAgICAgIGRhdGUgPSB0aGlzLnNlY29uZERhdGU7XHJcbiAgICAgICAgdGhpcy50ZXh0ICs9IChkYXRlLmdldE1vbnRoKCkrMSkrXCLsm5QgXCIrZGF0ZS5nZXREYXRlKCkrXCLsnbxcIit0aGlzLndlZWtBcnJheVtkYXRlLmdldERheSgpXTtcclxuICAgICAgICAkKFwiLmRhdGVTaG93ZXJcIikuaHRtbCh0aGlzLnRleHQpO1xyXG4gICAgICAgICQoXCIuaGRfc2lkZWJhcj4uc3RkPnNwYW5cIikuZXEoMCkuaHRtbCh0aGlzLnRleHQpXHJcbiAgICB9LFxyXG5cclxuICAgIGNob29zZURhdGUoZGF0ZSl7XHJcbiAgICAgICAgaWYodGhpcy5pc0ZpcnN0KXtcclxuICAgICAgICAgICAgJChcIi5kYXRlUGlja2VyXCIpLmRhdGEoJ2RhdGVwaWNrZXInKS5pbmxpbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgPSAoZGF0ZS5nZXRNb250aCgpKzEpK1wi7JuUIFwiK2RhdGUuZ2V0RGF0ZSgpK1wi7J28XCIrdGhpcy53ZWVrQXJyYXlbZGF0ZS5nZXREYXkoKV0rXCIgLSBcIjtcclxuICAgICAgICAgICAgdGhpcy50ZW1wRGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgICQoXCIuZGF0ZVNob3dlclwiKS5odG1sKHRoaXMudGV4dClcclxuICAgICAgICAgICAgdGhpcy5pc0ZpcnN0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKFwiLmRhdGVQaWNrZXJcIikuZGF0YSgnZGF0ZXBpY2tlcicpLmlubGluZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgKz0gKGRhdGUuZ2V0TW9udGgoKSsxKStcIuyblCBcIitkYXRlLmdldERhdGUoKStcIuydvFwiK3RoaXMud2Vla0FycmF5W2RhdGUuZ2V0RGF5KCldO1xyXG4gICAgICAgICAgICAkKFwiLmRhdGVTaG93ZXJcIikuaHRtbCh0aGlzLnRleHQpO1xyXG4gICAgICAgICAgICAkKFwiLmhkX3NpZGViYXI+LnN0ZD5zcGFuXCIpLmVxKDApLmh0bWwodGhpcy50ZXh0KVxyXG4gICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZSA9IHRoaXMudGVtcERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kRGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaXJzdCA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICAgICAgLy/stZzsooXsoIHsnLzroZwg64Kg7KecIOqygOyCrFxyXG4gICAgICAgICAgICBpZih0aGlzLmZpcnN0RGF0ZT50aGlzLnNlY29uZERhdGUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXZlcnNlRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmZpcnN0RGF0ZS5nZXRUaW1lKCkgPT09IHRoaXMuc2Vjb25kRGF0ZS5nZXRUaW1lKCkpe1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzog7Yag7Iqk7Yq4IOudhOyasOq4sFxyXG4gICAgICAgICAgICAgICAgJChcIi5kYXRlU2hvd2VyXCIpLmh0bWwoXCLssrTtgazsnbgt7JWE7JuDIOuCoOynnOqwgCDqsJnsirXri4jri6RcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuqwmeydgCDrgqDsp5zrpbwg7ISg7YOd7ZWY7IWo7Iq164uI64ukLlwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZVR4dCA9ICB0aGlzLmZvcm1hdHRlcih0aGlzLmZpcnN0RGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kRGF0ZVR4dCA9IHRoaXMuZm9ybWF0dGVyKHRoaXMuc2Vjb25kRGF0ZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmlnaHQgPSAodGhpcy5zZWNvbmREYXRlIC0gdGhpcy5maXJzdERhdGUpLygxMDAwICogNjAgKiA2MCAqIDI0KTtcclxuICAgICAgICAgICAgJChcImhlYWRlciAuZGF0ZVJhbmdlXCIpLmh0bWwobmlnaHQrXCLrsJUgXCIrKG5pZ2h0KzEpK1wi7J28XCIpO1xyXG4gICAgICAgICAgICAkKFwiLmhvdGVsRGV0YWlsIC5zdGQ+c3BhblwiKS5lcSgxKS5odG1sKG5pZ2h0K1wi67CVIFwiKyhuaWdodCsxKStcIuydvFwiKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmV2ZXJzZURhdGUoKXtcclxuICAgICAgICBsZXQgdGVtcERhdGUgPSB0aGlzLmZpcnN0RGF0ZTtcclxuICAgICAgICB0aGlzLmZpcnN0RGF0ZSA9IHRoaXMuc2Vjb25kRGF0ZTtcclxuICAgICAgICB0aGlzLnNlY29uZERhdGUgPSB0ZW1wRGF0ZTtcclxuICAgICAgICBsZXQgdGV4dCA9ICQoXCIuZGF0ZVNob3dlclwiKS5odG1sKCkuc3BsaXQoXCIgLSBcIik7XHJcbiAgICAgICAgdGV4dCA9IHRleHRbMV0gKyBcIiAtIFwiICsgdGV4dFswXTtcclxuICAgICAgICAkKFwiLmRhdGVTaG93ZXJcIikuaHRtbCh0ZXh0KTtcclxuICAgICAgICAkKFwiLmhkX3NpZGViYXI+LnN0ZD5zcGFuXCIpLmVxKDApLmh0bWwodGhpcy50ZXh0KVxyXG4gICAgICAgIHRoaXMuZmlyc3REYXRlVHh0ID0gIHRoaXMuZm9ybWF0dGVyKHRoaXMuZmlyc3REYXRlKTtcclxuICAgICAgICB0aGlzLnNlY29uZERhdGVUeHQgPSB0aGlzLmZvcm1hdHRlcih0aGlzLnNlY29uZERhdGUpO1xyXG5cclxuICAgICAgICBsZXQgbmlnaHQgPSAodGhpcy5zZWNvbmREYXRlIC0gdGhpcy5maXJzdERhdGUpLygxMDAwICogNjAgKiA2MCAqIDI0KTtcclxuICAgICAgICAkKFwiaGVhZGVyIC5kYXRlUmFuZ2VcIikuaHRtbChuaWdodCtcIuuwlSBcIisobmlnaHQrMSkrXCLsnbxcIik7XHJcbiAgICAgICAgJChcIi5ob3RlbERldGFpbCAuc3RkPnNwYW5cIikuZXEoMSkuaHRtbChuaWdodCtcIuuwlSBcIisobmlnaHQrMSkrXCLsnbxcIilcclxuICAgIH0sXHJcblxyXG4gICAgZm9ybWF0dGVyOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICBsZXQgbW9udGggPSBcIlwiO1xyXG4gICAgICAgIGxldCBkYXkgPSBcIlwiO1xyXG4gICAgICAgIGlmKGRhdGUuZ2V0TW9udGgoKSsxPDEwKXtcclxuICAgICAgICAgICAgbW9udGggPSBcIjBcIisoZGF0ZS5nZXRNb250aCgpKzEpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG1vbnRoID0gKGRhdGUuZ2V0TW9udGgoKSsxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRlLmdldERhdGUoKTwxMCl7XHJcbiAgICAgICAgICAgIGRheSA9IFwiMFwiK2RhdGUuZ2V0RGF0ZSgpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF0ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCkrXCItXCIrbW9udGgrXCItXCIrZGF5O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXRlUGlja2VyO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL0RhdGVQaWNrZXIuanMiXSwic291cmNlUm9vdCI6IiJ9