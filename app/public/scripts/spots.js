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

var _action = __webpack_require__(1);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Combine = {
    map: {},
    marker: [],
    init: function init(data) {
        $("header>.nav>p").removeClass("selected");
        $(".spot_work").addClass("selected");
        $(".postAction").addClass("displayNone");
        $(".combine").removeClass("displayNone");

        if (data.combining) {
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 40.74844, lng: -73.98566 },
                zoom: 18,
                mapTypeControl: false,
                scaleControl: true,
                fullscreenControl: false
            });

            this.map.addListener('click', function (e) {
                _action2.default.clickMap(e);
            });

            this.inflate(data.combining);
            //합치기 작업 중인 목록이 있으면 불러와서 작업을 이어한다.
        } else {
            var cityCode = $("header>.cityName").attr("cid");

            var siteArray = ["gg", "nv", "lp", "ta"];
            var combinedObj = {};
            var counter = 0;

            for (var j = 0; j < siteArray.length; j++) {
                var site = siteArray[j];
                if (data[site]) {
                    for (var i = 0; i < data[site].length; i++) {
                        if (data[site][i]) {
                            var oldSpot = data[site][i];

                            var spot = {
                                name: {
                                    ko: "",
                                    en: ""
                                },
                                coor: oldSpot.coor,
                                rank: {}
                            };

                            if (/[가-힣]/.test(oldSpot.name)) {
                                spot.name.ko = oldSpot.name;
                            } else {
                                spot.name.en = oldSpot.name;
                            }
                            spot.rank[site] = i;

                            if (oldSpot.url) {
                                spot.url = oldSpot.url;
                            }
                            if (oldSpot.tag) {
                                spot.tag = oldSpot.tag;
                            }

                            if (counter < 10) {
                                combinedObj["s00" + counter] = spot;
                                console.log("s00" + counter);
                            } else if (counter < 100) {
                                combinedObj["s0" + counter] = spot;
                                console.log("s0" + counter);
                            } else {
                                combinedObj["s" + counter] = spot;
                                console.log("s" + counter);
                            }
                            counter++;
                        }
                    }
                }
            }
            this.difCheck(combinedObj);
        }
    },

    difCheck: function difCheck(data) {
        var cityCode = $("header>.cityName").attr("cid");

        var counter = 0;

        var combineObj = {};

        for (var code in data) {
            var spot = data[code];
            combineObj[code] = spot;
            combineObj[code].combine = {};

            for (var tCode in data) {
                if (code < tCode) {
                    var tSpot = {};
                    for (var key in data[tCode]) {
                        tSpot[key] = data[tCode][key];
                    }

                    var latDif = Math.pow((spot.coor.lat - tSpot.coor.lat) * 111034, 2);
                    var lngDif = Math.pow((spot.coor.lng - tSpot.coor.lng) * 85397, 2);
                    var dif = Math.round(Math.sqrt(latDif + lngDif));

                    if (dif < 200) {
                        counter++;
                        combineObj[code].combine[tCode] = tSpot;
                    }
                }
            }
        }
        console.log("막판");
        console.log(combineObj);

        firebase.database().ref(cityCode + "/spots/combining").set(combineObj);

        this.inflate(combineObj);
    },

    inflate: function inflate(data) {
        this.marker = [];

        var keys = Object.keys(data);
        $(".noOfData").html(keys.length);
        var spot = data[keys[0]];

        $(".original").attr("oid", keys[0]);

        if (spot.name.ko.length > 0) {
            $("#name_prime").html(spot.name.ko);
        } else {
            $("#name_prime").html(spot.name.en);
        }
        $("#name_ko").val(spot.name.ko);
        $("#name_en").val(spot.name.en);
        if (spot.name.local) {
            $("#name_local").val(spot.name.local);
        }
        spot.coor.lat = spot.coor.lat * 1;
        spot.coor.lng = spot.coor.lng * 1;

        var marker = new google.maps.Marker({
            position: spot.coor,
            map: this.map
        });

        _action2.default.marker.main = marker;

        this.map.panTo(spot.coor);
        $(".coordinate_main").html(spot.coor.lat + "," + spot.coor.lng);

        this.marker.push(marker);

        var targetTxt = "";
        var targetNo = 0;

        for (var sid in spot.combine) {
            var tSpot = spot.combine[sid];
            targetNo++;

            var latlng = {
                lat: tSpot.coor.lat * 1,
                lng: tSpot.coor.lng * 1
            };

            var tMarker = new google.maps.Marker({
                position: latlng,
                map: this.map,
                label: targetNo.toString()
            });

            this.marker.push(tMarker);

            //본명으로 한글명 영어명이 없을 경우를 체크해서 넣어준다.
            if ($("#name_ko").val().length === 0) {
                $("#name_ko").val(tSpot.name.ko);
            }
            if ($("#name_en").val().length === 0) {
                $("#name_en").val(tSpot.name.en);
            }

            targetTxt += '<div class="spotBox"><p class="number">' + targetNo + '</p><div class="checkBox" sid="' + sid + '"></div><div class="right">';
            targetTxt += '<p class="name_ko">' + tSpot.name.ko + '</p><p class="name_en">' + tSpot.name.en + '</p>';
            if (tSpot.name.local) {
                targetTxt += '<p class="name_local">' + tSpot.name.local + '</p>';
            }
            targetTxt += '</div></div>';
        }

        $(".combine .target").html(targetTxt);
    }

};

exports.default = Combine;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _combine = __webpack_require__(0);

var _combine2 = _interopRequireDefault(_combine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Action = {
    data: {},
    marker: {
        main: {},
        enterance: {}
    },

    init: function init(data) {
        this.data = data;
    },

    check: function check(sid) {
        $(".checkBox[sid=" + sid + "]").toggleClass("checked");
    },

    toNext: function toNext() {
        var mainData = this.data[$(".original").attr("oid")];

        if ($(".nav_spot").hasClass("selected")) {
            //첫번재 -> 두번째 탭으로 이동;
            for (var i = 0; i < $(".checked").length; i++) {
                var tid = $(".checked").eq(i).attr("sid");
                var targetData = mainData.combine[tid];

                //합쳐질 대상의 rank를 maindData의 rank로 통합하는 작업
                for (var site in targetData.rank) {
                    if (!mainData.rank[site] < targetData.rank[site]) mainData.rank[site] = targetData.rank[site];
                }

                //합쳐질 대상의 태그를 mainData의 tag로 통합하는 작업
                if (targetData.tag) {
                    for (var j = 0; j < targetData.tag.length; j++) {
                        if (mainData.tag) {
                            if (!mainData.tag.includes(targetData.tag[j])) {
                                mainData.tag.push(targetData.tag[j]);
                            }
                        } else {
                            mainData.tag = targetData.tag;
                        }
                    }
                }

                //합쳐질 대상에게 url이 입력되어 있다면 mainData에 통합하는 작업
                if (!mainData.url) {
                    if (targetData.url) {
                        mainData.url = targetData.url;
                    }
                }

                delete this.data[tid];
            }
            mainData.name.ko = $("#name_ko").val();
            mainData.name.en = $("#name_en").val();
            mainData.name.local = $("#name_local").val();

            delete mainData.combine;

            $(".nav_spot").removeClass("selected");
            $(".nav_theme").addClass("selected");
            $(".target").addClass("displayNone");
            $(".theme").removeClass("displayNone");

            this.inflateTheme(mainData);
        } else if ($(".nav_theme").hasClass("selected")) {
            var data = this.data[$(".original").attr("oid")];
            var tagArray = [];

            for (var i = 0; i < $(".tagZone>input").length; i++) {
                var tag = $(".tagZone>input").eq(i).val();

                if (tag.length > 0) {
                    tagArray.push(tag);
                }
            }

            data.tag = tagArray;

            $(".nav_theme").removeClass("selected");
            $(".nav_enterance").addClass("selected");
            $(".theme").addClass("displayNone");
            $(".enterance").removeClass("displayNone");
            $(".toNext").html("저장");
        } else if ($(".nav_enterance").hasClass("selected")) {
            var sid = $(".original").attr("oid");
            var _mainData = this.data[sid];

            var coor = $(".coordinate_main").html().split(",");
            coor = {
                lat: coor[0] * 1,
                lng: coor[1] * 1
            };
            var enteranceArray = [];

            for (var i = 0; i < $(".enterance_box>.liner").length; i++) {
                var line = $(".enterance_box>.liner").eq(i);

                if (line.children(".coordinate").html().length > 0) {
                    var entCoor = line.children(".coordinate").html().split(",");
                    entCoor = {
                        lat: entCoor[0] * 1,
                        lng: entCoor[1] * 1
                    };
                    enteranceArray.push(entCoor);
                }
            }
            _mainData.coor = coor;
            _mainData.enterance = enteranceArray;

            var cityCode = "nyc";
            // TODO: 이게 당연히 바뀌어야 함

            firebase.database().ref(cityCode + "/spots/combined/" + sid).set(_mainData);

            delete this.data[sid];
            firebase.database().ref(cityCode + "/spots/combining").set(this.data);
            $(".enterance_box").html("");
            $(".toNext").html("다음");
            for (var marker in this.marker.enterance) {
                if (this.marker.enterance[marker]) {
                    this.marker.enterance[marker].setMap(null);
                }
            }
            if (this.marker.main) {
                this.marker.main.setMap(null);
            }
            this.marker = {
                main: {},
                enterance: {}
            };

            _combine2.default.inflate(this.data);

            $(".nav_enterance").removeClass("selected");
            $(".nav_spot").addClass("selected");
            $(".target").removeClass("displayNone");
            $(".enterance").addClass("displayNone");
        }
    },

    addEnterance: function addEnterance() {
        var key = firebase.database().ref("forKey").push().key;
        var txt = '<div class="liner" id="' + key + '"><p class="subtitle">입구</p><p class="coordinate_enterance coordinate"></p>';
        txt += '<p class="select">선택</p><p class="remove">제거</p></div>';
        $(".enterance_box").append(txt);
    },

    inflateTheme: function inflateTheme(data) {
        var txt = "";

        if (data.tag) {
            for (var i = 0; i < data.tag.length; i++) {
                txt += '<input value="' + data.tag[i] + '">';
            }
            $(".tagZone").html(txt);
        }
    },

    selectCoor: function selectCoor(div) {
        if (div.hasClass("selecting")) {
            div.removeClass("selecting");
            div.parent().children(".select").removeClass("active");
        } else {
            $(".coordinate").removeClass("selecting");
            div.addClass("selecting");
            $(".enterance .select").removeClass("active");
            div.parent().children(".select").addClass("active");
        }
    },

    removeEnterance: function removeEnterance(key) {
        if (this.marker.enterance[key]) {
            this.marker.enterance[key].setMap(null);
        }

        $("#" + key).remove();
    },

    clickMap: function clickMap(e) {
        $(".selecting").html(e.latLng.lat() + "," + e.latLng.lng());
        $(".selecting").parent().children(".select").removeClass("active");
        if ($(".selecting").hasClass("coordinate_main")) {
            this.marker.main.setMap(null);
            this.marker.main = new google.maps.Marker({
                position: e.latLng,
                map: _combine2.default.map
            });
        } else if ($(".selecting").hasClass("coordinate_enterance")) {
            var marker = new google.maps.Marker({
                position: e.latLng,
                map: _combine2.default.map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });
            var key = $(".selecting").parent().attr("id");

            if (this.marker.enterance[key]) {
                this.marker.enterance[key].setMap(null);
            }
            this.marker.enterance[key] = marker;
        }

        $(".selecting").removeClass("selecting");
    },

    saveSpot: function saveSpot(sid) {
        var cityCode = $(".cityName").attr("cid");
        var data = {
            name: {
                ko: "",
                en: "",
                local: ""
            },
            url: ""
        };
        console.log(sid);

        var name = $("#" + sid).children(".result_name").val().split("--");
        data.name.ko = name[0];
        data.name.en = name[1];
        data.url = $("#" + sid).children(".result_url").val();
        console.log(data);
        firebase.database().ref(cityCode + "/spots/combined/" + sid).update(data);
    },

    removeSpot: function removeSpot(sid) {
        var cityCode = $(".cityName").attr("cid");
        var name = $("#" + sid).children(".result_name").val().split("--")[0];
        if (confirm(name + " 관광지를 삭제하시겠습니까?")) {
            firebase.database().ref(cityCode + "/spots/combined/" + sid).remove();
        }
    }
};

exports.default = Action;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _combine = __webpack_require__(0);

var _combine2 = _interopRequireDefault(_combine);

var _postAction = __webpack_require__(3);

var _postAction2 = _interopRequireDefault(_postAction);

var _action = __webpack_require__(1);

var _action2 = _interopRequireDefault(_action);

var _rank = __webpack_require__(4);

var _rank2 = _interopRequireDefault(_rank);

var _tag = __webpack_require__(5);

var _tag2 = _interopRequireDefault(_tag);

var _data = __webpack_require__(6);

var _data2 = _interopRequireDefault(_data);

var _safety = __webpack_require__(7);

var _safety2 = _interopRequireDefault(_safety);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cityCode = "nyc";

$(document).ready(function () {
    firebase.database().ref(cityCode).once("value", function (snap) {
        var data = snap.val();
        $("header>.cityName").attr("cid", cityCode);
        console.log("hi");

        //전처리 검증, 완벽하면 true를 반환함 -> Combine 진행
        if (_postAction2.default.process(data.spots)) {
            _combine2.default.init(data.spots);
            _action2.default.init(data.spots.combining);
            if (data.spots.combined) {
                _tag2.default.init(data.spots.combined);

                // Data.init(data);
                _safety2.default.init(data);
                // 지역 분류하기 / 메트로 정보 집어넣기 /
            }
        }
    });

    firebase.database().ref("citylist").once("value", function (snap) {
        var list = snap.val();
        var txt = "";
        for (var i = 0; i < list.length; i++) {
            txt += '<p class="cityList_name" id="' + list[i].code + '">' + list[i].name + '</p>';
        }
        $(".cityList").html(txt);
    });
});
$(".nav>.spot_rank").click(function () {
    _rank2.default.init(cityCode);
});

$(".target").on("click", ".spotBox", function () {
    _action2.default.check($(this).children(".checkBox").attr("sid"));
});
$(".combine").on("click", ".toNext", function () {
    _action2.default.toNext();
});
$(".enterance").on("click", ".select", function () {
    _action2.default.selectCoor($(this).parent().children(".coordinate"));
});
$(".enterance").on("click", ".remove", function () {
    _action2.default.removeEnterance($(this).parent().attr("id"));
});
$(".addEnterance").click(function () {
    _action2.default.addEnterance();
});
$(".cityName").click(function () {
    $(".lightBox").removeClass("displayNone");
});
$(".rankDiv").on("click", ".save_spot", function () {
    _action2.default.saveSpot($(this).parent().attr("id"));
});
$(".rankDiv").on("click", ".remove_spot", function () {
    _action2.default.removeSpot($(this).parent().attr("id"));
});

$(".cityList").on("click", ".cityList_name", function () {
    cityCode = $(this).attr("id");
    $("header>.cityName").attr("cid", cityCode);

    firebase.database().ref(cityCode + "/spots").once("value", function (snap) {
        var data = snap.val();
        $("header>.cityName").attr("cid", cityCode);
        $(".lightBox").addClass("displayNone");

        //전처리 검증, 완벽하면 true를 반환함 -> Combine 진행
        if (_postAction2.default.process(data)) {
            _combine2.default.init(data);
            _action2.default.init(data.combining);
        }
    });
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//6단계에 걸쳐 전처리 작업이 필요한지를 검증하고, 전처리하는 객체다.
var PostAction = {
    data: {},

    process: function process(data) {
        this.data = data;
        var that = this;

        //앞으로 6단계에 걸친 무결성 검증을 통과하면 전처리 작업은 끝났다고 간주되고, 마지막에 combine 단계로 넘어간다.
        var isPerfect = true;

        //이하 4개 이벤트 리스너는 구글 관광지에 대한 수동 좌표입력 관련 이벤트 리스너다.
        $(".coorZone").on("click", ".input", function () {
            that.inputCoor($(this).parent());
        });
        $(".coorZone").on("click", ".remove", function () {
            that.removeSpot($(this).parent().attr("idx"));
        });
        $(".coorZone").on("click", ".coor_spotName", function () {
            that.searchSpot($(this).html());
        });
        $(".passNaver").click(function () {
            that.reArrayNaver(that.data.nv);
        });
        $(".saveSpotData").click(function () {
            that.saveSpotData($(this).attr("sid"));
        });

        var noData = false;
        var dataTxt = "";

        //트립어드바이저 데이터가 없거나 70개 미만이면 문제가 있는 것
        if (!data.ta) {
            isPerfect = false;
            noData = true;
            dataTxt += '트립어드바이저, ';
        } else if (data.ta.length < 70) {
            isPerfect = false;
            $(".taHint").removeClass("displayNone");
        }

        //론리플래닛 데이터가 없으면 문제가 있는 것
        if (!data.lp) {
            isPerfect = false;
            noData = true;
            dataTxt += '론리플래닛, ';
        }

        //네이버 데이터가 있는지, 있더라도 중간에 빠진 번호가 있는지 체크.
        if (!data.nv) {
            isPerfect = false;
            noData = true;
            dataTxt += '네이버, ';
        } else {
            var isAnyEmpty = false;
            var eTxt = "";
            for (var i = 0; i < data.nv.length; i++) {
                if (!data.nv[i]) {
                    isAnyEmpty = true;
                    isPerfect = false;
                    eTxt += i + 1 + ", ";
                }
            }
            eTxt = eTxt.slice(0, eTxt.length - 2);
            eTxt += "위 관광지들이 빠졌습니다. 다시 추출해주세요.";
            if (isAnyEmpty) {
                $(".naverNoInfo").removeClass("displayNone");
                $(".naverNoInfo .hintTxt").html(eTxt);
            }

            var noOfCrack = 0;

            var txt = "";
            for (var i = 0; i < data.nv.length; i++) {
                //좌표가 없거나 종종 이상한 좌표가 입력된 경우가 있어 아래와 같이 체
                if (data.nv[i]) {
                    if (!data.nv[i].coor) {
                        noOfCrack++;
                        txt += '<div class="coor_spot" sid="nv" idx=' + i + '><p class="coor_spotName">' + data.nv[i].name + '</p><input class="coord" placeholder="xx.xxxx, oo.oooo 형태로 좌표 입력"><p class="input">입력</p><p class="remove">제거</p></div>';
                    }
                }
            }
            if (noOfCrack > 0) {
                isPerfect = false;
                $(".naverAction").removeClass("displayNone");
            }
            $(".naverAction .mainTxt").html("네이버에서 추출된 장소 중 " + noOfCrack + "개의 장소에 대한 수동 좌표 입력이 필요합니다");
            $(".coorZone.naver_coorZone").html(txt);
        }

        //구글 데이터가 있는지, 있더라도 좌표가 이상하게 입력된 것이 있는지 체크
        if (!data.gg) {
            isPerfect = false;
            noData = true;
            dataTxt += '구글, ';
        } else {
            var _noOfCrack = 0;

            var _txt = "";
            for (var i = 0; i < data.gg.length; i++) {
                //좌표가 없거나 종종 이상한 좌표가 입력된 경우가 있어 아래와 같이 체
                if (data.gg[i]) {
                    if (!data.gg[i].coor) {
                        _noOfCrack++;
                        _txt += '<div class="coor_spot" sid="gg" idx=' + i + '><p class="coor_spotName">' + data.gg[i].name + '</p><input class="coord" placeholder="xx.xxxx, oo.oooo 형태로 좌표 입력"><p class="input">입력</p><p class="remove">제거</p></div>';
                    }
                }
            }
            if (_noOfCrack > 0) {
                isPerfect = false;
                $(".googleAction").removeClass("displayNone");
            }
            $(".googleAction .mainTxt").html("구글에서 추출된 장소 중 " + _noOfCrack + "개의 장소에 대한 수동 좌표 입력이 필요합니다");
            $(".coorZone.google_coorZone").html(_txt);
        }
        if (noData) {
            dataTxt = dataTxt.slice(0, dataTxt.length - 2);
            dataTxt += ' 관광지 추출이 제대로 진행되지 않았습니다. 다시 진행해주세요. 원래 관광지 목록이 없다면 문의';
            $(".noData").html(dataTxt);
        }

        if (isPerfect) {
            return true;
        }
    },

    inputCoor: function inputCoor(dom) {
        var cityCode = $("header>.cityName").attr("cid");
        var coor = dom.children(".coord").val();
        var sid = dom.attr("sid");
        var idx = dom.attr("idx");
        coor = coor.split(",");
        if (coor[1]) {
            this.data[sid][idx].coor = {
                lat: coor[0] * 1,
                lng: coor[1] * 1
            };
            this.toast("관광지 좌표가 입력되었습니다.");
        } else {
            alert("좌표가 부정확하게 입력되었습니다.");
        }
    },

    removeSpot: function removeSpot(idx) {
        var spotName = $(".coor_spot[idx=" + idx + "]").children(".coor_spotName").html();
        var coor = $(".coor_spot[idx=" + idx + "]").children(".coord").val();
        var cityCode = $("header>.cityName").attr("cid");
        var canIDelete = false;

        if (coor.length > 0) {
            if (confirm(spotName + " 에 입력된 좌표도 사라집니다. 괜찮습니까?")) {
                canIDelete = true;
            }
        } else {
            if (confirm(spotName + " 정보를 제거합니다. 괜찮습니까?")) {
                canIDelete = true;
            }
        }
        if (canIDelete) {
            delete this.data.gg[idx];
            $(".coor_spot[idx=" + idx + "]").addClass("displayNone");
        }
    },

    searchSpot: function searchSpot(spotName) {
        var cityName = $("header>.cityName").html();
        window.open('https://www.google.com/search?q=' + cityName + "+" + spotName, '_blank');
    },
    saveSpotData: function saveSpotData(sid) {
        var cityCode = $("header>.cityName").attr("cid");
        if (confirm("지금까지의 작업 내용을 저장할까요?")) {
            var newArray = [];
            for (var i = 0; i < this.data[sid].length; i++) {
                if (this.data[sid][i]) {
                    newArray.push(this.data[sid][i]);
                }
            }
            firebase.database().ref("cities/" + cityCode + "/spots/" + sid).set(newArray);
        }
    },
    reArrayNaver: function reArrayNaver(nvData) {

        var cityCode = $("header>.cityName").attr("cid");

        if (confirm("빠진 관광지들을 삭제할까요?")) {
            var newNvArray = [];
            for (var i = 0; i < nvData.length; i++) {
                if (nvData[i]) {
                    newNvArray.push(nvData[i]);
                }
            }
            $(".naverAction .mainTxt").html("네이버 관광지들을 재편성했습니다.");
            $(".naverAction .hintTxt").addClass("displayNone");
            $(".naverAction .right").addClass("displayNone");

            firebase.database().ref("cities/" + cityCode + "/spots/nv").set(newNvArray);
        }
    },
    toast: function toast(txt) {
        if ($(".snackbar").length > 0) {
            $(".snackbar").remove();
        }
        $("body").append('<div class="snackbar">' + txt + '</div>');
        $(".snackbar").addClass("show");
        $(".snackbar").css("animation");

        setTimeout(function () {
            $(".snackbar").removeClass("show");
        }, 3000);
    }
};

exports.default = PostAction;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Rank = {
    init: function init(cityCode) {
        $(".postAction").addClass("displayNone");
        $(".combine").addClass("displayNone");
        $(".rankDiv").removeClass("displayNone");
        $("header>.nav>p").removeClass("selected");
        $(".spot_rank").addClass("selected");

        firebase.database().ref(cityCode + "/spots/combined").on("value", function (snap) {
            var data = snap.val();
            console.log(data);

            var txt = '';

            var sortArray = [];

            for (var sid in data) {
                var spot = data[sid];
                var array = [];
                var minRank = 200;

                for (var site in spot.rank) {
                    var indRank = spot.rank[site];
                    array.push(indRank);
                    if (minRank > indRank) {
                        minRank = indRank;
                    };
                }
                var score = (180 - minRank) * Math.sqrt(Math.sqrt(array.length));
                for (var i = 0; i < array.length; i++) {
                    score -= array[i];
                }
                score -= minRank * 1.5;
                if (array.length === 1) {
                    score -= 120;
                    score -= minRank;
                    if (spot.rank.nv) {
                        score += 50;
                    }
                }
                if (array.length === 3) {
                    score += 160 - minRank;
                }
                if (array.length === 4) {
                    score += 160;
                }

                sortArray.push({ sid: sid, score: score });
            }

            sortArray.sort(function (a, b) {
                return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
            });

            for (var i = 0; i < sortArray.length; i++) {
                var _sid = sortArray[i].sid;
                var url = "";
                if (data[_sid].url) {
                    url = data[_sid].url;
                }
                var ranking = {
                    gg: "",
                    nv: "",
                    lp: "",
                    ta: ""
                };
                for (var site in data[_sid].rank) {
                    ranking[site] = data[_sid].rank[site];
                }
                txt += '<div class="result_box" id="' + _sid + '"><p class="result_rank">' + (i + 1) + '</p>';
                txt += '<input class="result_name" value="' + data[_sid].name.ko + "--" + data[_sid].name.en + '">';
                txt += '<input class="result_url" value="' + url + '">';
                txt += '<p class="result_gg">' + ranking.gg + '</p>';
                txt += '<p class="result_nv">' + ranking.nv + '</p>';
                txt += '<p class="result_lp">' + ranking.lp + '</p>';
                txt += '<p class="result_ta">' + ranking.ta + '</p>';
                txt += '<p class="result_save save_spot">저장</p>';
                txt += '<p class="result_remove remove_spot">삭제</p></div>';
            }
            $(".result").html(txt);
        });
    }
};

exports.default = Rank;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Tag = {
    init: function init(data) {
        var tagObj = {};
        var tagRankArray = [];

        for (var sid in data) {
            if (data[sid].tag) {
                var tags = data[sid].tag;

                for (var i = 0; i < tags.length; i++) {
                    if (tagObj[tags[i]]) {
                        tagObj[tags[i]].score++;
                        tagObj[tags[i]].spot.push(data[sid].name.ko);
                    } else {
                        tagObj[tags[i]] = {
                            score: 1,
                            spot: [data[sid].name.ko]
                        };
                    }
                }
            }
        }

        for (var tag in tagObj) {
            tagRankArray.push({
                name: tag,
                score: tagObj[tag].score,
                spot: tagObj[tag].spot
            });
        }
        tagRankArray.sort(function (a, b) {
            return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
        });
    }
};

exports.default = Tag;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Data = {
    spotObj: {},
    //도시의 전체 스팟 데이터를 받아와 집어넣는다.
    metro: [],
    metroObj: {},
    metroScore: {},
    hotelObj: {},
    areaArray: [],
    //도시의 전체 메트로 데이터를 받아와 넣는다. Array 안에는 object로 coor(lat, lng obj), line(Array), name이 들어있다.

    init: function init(data) {
        //combined data를 받아서 작업들을 시작한다.
        this.spotObj = data.spots;

        this.hotelObj = data.hotels;
        this.metroObj = data.metro;
        this.metroScore = data.metroLine;
        this.areaArray = data.area;
        var cityCode = $(".cityName").attr("cid");

        this.hotel_data();
        this.area();

        // this.data_metro_process();
        //메트로 집어넣는 작업을 실시한다.

        // this.data_findbestMetro();
        //도시 내 최고의 메트로를 선정하자
    },

    area: function area() {
        // console.log(this.areaArray)


        for (var hid in this.hotelObj) {
            // this.searchInPolygon(hid, map)

        }
    },

    searchInPolygon: function searchInPolygon(hid, map) {
        var label = 0;

        var coor = new google.maps.LatLng(this.hotelObj[hid].coor.lat, this.hotelObj[hid].coor.lng);
        for (var i = 0; i < 25; i++) {
            var polygon = new google.maps.Polygon({
                paths: this.areaArray[i].coor
            });
            if (google.maps.geometry.poly.containsLocation(coor, polygon)) {
                this.hotelObj[hid].area = i;
            }
        }
    },

    hotel_data: function hotel_data() {
        console.log(this.spotObj);
        console.log(this.hotelObj);
        console.log(this.metroObj);

        for (var hid in this.hotelObj) {
            var hotel = this.hotelObj[hid];
        }
    },

    data_findbestMetro: function data_findbestMetro() {
        var metroRankObj = {};
        var metroRankArray = [];
        console.log(this.spotObj);
        var spotRank = 0;
        for (var sid in this.spotObj) {
            var spot = this.spotObj[sid];
            spotRank++;

            for (var line in spot.metroInfo) {
                var distance = spot.metroInfo[line].distance;

                if (metroRankObj[line]) {
                    metroRankObj[line].score += 3000 - distance * 2 - spotRank * 3.5;
                    metroRankObj[line].spot.push({ name: spot.name.ko, distance: distance });
                } else {
                    metroRankObj[line] = {
                        score: 3000 - distance * 2 - spotRank * 3.5,
                        spot: [{ name: spot.name.ko, distance: distance }]
                    };
                }
            }
        }

        for (var line in metroRankObj) {
            metroRankObj[line].score = Math.round(metroRankObj[line].score / 138) / 10;
            // TODO: 위의 값은 1위를 100으로 한 지수 형태기 때문에 138이라는 숫자는 도시에 맞게 변형해 쓸것
            metroRankArray.push({
                line: line,
                score: metroRankObj[line].score,
                spot: metroRankObj[line].spot
            });
        }

        metroRankArray.sort(function (a, b) {
            return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
        });

        // firebase.database().ref("nyc/metroLine").set(metroRankObj)

        console.log(metroRankArray);
        console.log(metroRankObj);
    },

    data_metro_process: function data_metro_process() {
        var _this = this;

        var that = this;
        var cityCode = $(".cityName").attr("cid");

        firebase.database().ref(cityCode + "/metro").once("value", function (snap) {
            var data = snap.val();

            that.metro = data;

            for (var sid in _this.spotObj) {
                var spot = _this.spotObj[sid];

                that.metro_process_findMetro(sid, spot.coor);
                if (spot.enterance) {
                    for (var i = 0; i < spot.enterance.length; i++) {
                        that.metro_process_findMetro(sid, spot.enterance[i]);
                    }
                }
                //스팟 기본 위치와 enterance 모두에 대해 가장 가까운 메트로를 찾는다.
            }
            // firebase.database().ref(cityCode+"/spots/combined").update(this.spotObj);


            firebase.database().ref(cityCode + "/hotels").once("value", function (snap) {
                that.hotelObj = snap.val();

                for (var hid in that.hotelObj) {
                    that.hotel_process_findMetro(hid);
                }
                console.log(that.hotelObj);

                // firebase.database().ref("nyc/hotels").set(that.hotelObj)
            });
        });
    },

    hotel_process_findMetro: function hotel_process_findMetro(hid) {
        var hotel = this.hotelObj[hid];
        var coor = hotel.coor;
        console.log(coor);

        if (!hotel.metroInfo) {
            hotel.metroInfo = {};
        }

        for (var i = 0, max = this.metro.length; i < max; i++) {
            var metro = this.metro[i];
            var name = metro.name;

            var latDif = Math.pow((coor.lat - metro.coor.lat) * 111034, 2);
            var lngDif = Math.pow((coor.lng - metro.coor.lng) * 85397, 2);
            // TODO: 위도 경도에 따른 보정값은 도시마다 달라져야 한다.
            var dif = Math.round(Math.sqrt(latDif + lngDif));

            if (dif < 700) {
                // TODO: 700미터가 적절한 거리인지는 논의가 필요하다.

                for (var k = 0; k < metro.line.length; k++) {
                    if (metro.line[k].length === 1) {
                        // TODO: 뉴욕 한정 - 익스프레스 라인을 제거하기 위한 것

                        var line = metro.line[k];
                        //라인명

                        if (hotel.metroInfo[line]) {
                            if (hotel.metroInfo[line].distance > dif) {
                                //이미 존재할 경우 새로 추가하려는 역이 원래보다 더 가까운 경우에만 추가

                                hotel.metroInfo[line] = {
                                    name: name,
                                    distance: dif,
                                    code: i
                                    // TODO: 지금은 metro Array 순서 자체를 코드로 사용하고 있다.
                                    //코드 체계를 어떻게 구성할지 생각이 필요할 것.
                                };
                            }
                        } else {
                            hotel.metroInfo[line] = {
                                name: name,
                                distance: dif,
                                code: i
                            };
                        }
                    }
                }
            }
        }
    },

    metro_process_findMetro: function metro_process_findMetro(sid, coor) {
        //스팟 코드와 좌표를 받아온다. 좌표는 enterance좌표, 스팟 자체 좌표 두 종류가 있기 때문에 따로 받아옴.
        var spot = this.spotObj[sid];

        if (!spot.metroInfo) {
            spot.metroInfo = {};
        }

        for (var i = 0, max = this.metro.length; i < max; i++) {
            var metro = this.metro[i];
            var name = metro.name;

            var latDif = Math.pow((coor.lat - metro.coor.lat) * 111034, 2);
            var lngDif = Math.pow((coor.lng - metro.coor.lng) * 85397, 2);
            // TODO: 위도 경도에 따른 보정값은 도시마다 달라져야 한다.
            var dif = Math.round(Math.sqrt(latDif + lngDif));

            if (dif < 700) {
                // TODO: 700미터가 적절한 거리인지는 논의가 필요하다.

                for (var k = 0; k < metro.line.length; k++) {
                    if (metro.line[k].length === 1) {
                        // TODO: 뉴욕 한정 - 익스프레스 라인을 제거하기 위한 것

                        var line = metro.line[k];
                        //라인명

                        if (spot.metroInfo[line]) {
                            if (spot.metroInfo[line].distance > dif) {
                                //이미 존재할 경우 새로 추가하려는 역이 원래보다 더 가까운 경우에만 추가

                                spot.metroInfo[line] = {
                                    name: name,
                                    distance: dif,
                                    code: i
                                    // TODO: 지금은 metro Array 순서 자체를 코드로 사용하고 있다.
                                    //코드 체계를 어떻게 구성할지 생각이 필요할 것.
                                };
                            }
                        } else {
                            spot.metroInfo[line] = {
                                name: name,
                                distance: dif,
                                code: i
                            };
                        }
                    }
                }
            }
        }
    }
};

exports.default = Data;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Safety = {
    area: [],

    basic: {},

    hotels: {},

    data: {
        area: {},
        specific: {}
    },
    intro: [["이 숙소는 ", "<지역명>", " 에 위치하고 있습니다. 이 지역은 "], ["이 숙소가 위치한 ", "<지역명>", "(은)는"]],

    init: function init(data) {
        this.hotels = data.hotels;
        for (var hid in data.hotels) {
            this.test(hid);
        }
    },

    test: function test(hid) {
        var hotel = this.hotels[hid];

        var area = hotel.area;

        var rnd = function rnd(min, max) {
            var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
            return ranNum;
        };

        var spotList = ["센트럴 파크", "메트로폴리탄 미술관", "구겐하임 미술관", "록펠러 센터"];
        var metroStn = ["68st Station", "33st Station", "5th ave Station", "Clark St", "103st", "Galaxy Station"];

        var hotelData = {
            hasSpot: false,
            spot: "",
            spotDistance: 0,
            nearMetro: false,
            distance: 10,
            metroStn: ""
        };

        var spotRnd = rnd(0, 6);

        if (spotRnd < 4) {
            hotelData.hasSpot = true;
            hotelData.spot = spotList[spotRnd];
        }

        var metroRnd = rnd(0, 5);
        hotelData.metroStn = metroStn[metroRnd];

        var distanceRnd = rnd(0, 6) + rnd(0, 6);
        hotelData.distance = distanceRnd;

        if (distanceRnd < 6) {
            hotelData.nearMetro = true;
        }

        var txt = "";

        var introRnd = rnd(0, 1);
        if (introRnd === 0) {
            txt += this.basic.intro[0][0] + " " + area.name + this.basic.intro[0][1] + " ";
        } else {
            txt += this.basic.intro[1][0] + " " + area.name + area.josa[0] + " ";
        }

        var length = area.intro.length;

        var areaIntroRnd = rnd(0, length - 1);
        txt += area.intro[areaIntroRnd];

        var safety = "unsafe";

        if (area.score > 4) {
            safety = "safe";
        } else if (area.score > 2) {
            safety = "normal";
        }

        var wordObj = this.data.specific[safety];

        var spotTypeRnd = rnd(0, 1);

        if (hotelData.hasSpot) {
            hotelData.spotDistance = rnd(2, 5);

            if (spotTypeRnd === 0) {
                var first = wordObj.spot.type1.first;
                var firstRnd = rnd(0, first.length - 1);

                var second = wordObj.spot.type1.second;
                var secondRnd = rnd(0, second.length - 1);

                txt += "<br>" + first[firstRnd] + " " + second[secondRnd];
            } else {
                var _first = wordObj.spot.type2.first;
                var _firstRnd = rnd(0, _first.length - 1);

                var _second = wordObj.spot.type2.second;
                var _secondRnd = rnd(0, _second.length - 1);

                txt += "<br>" + _first[_firstRnd] + " " + _second[_secondRnd];
            }

            txt = txt.replace("[관광지]", hotelData.spot);
            txt = txt.replace("[분]", hotelData.spotDistance + "분");
            txt = txt.replace("[지역]", area.name);
        }

        var transTypeRnd = rnd(0, 1);

        var target = {};

        if (hotelData.nearMetro) {
            if (hotelData.hasSpot) {
                target = wordObj.transit.near.hasSpot;
            } else {
                target = wordObj.transit.near.noSpot;
            }
        } else {
            if (hotelData.hasSpot) {
                target = wordObj.transit.far.hasSpot;
            } else {
                target = wordObj.transit.far.noSpot;
            }
        }

        if ('type1' in target) {
            if (transTypeRnd === 0) {
                target = target.type1;
            } else {
                target = target.type2;
            }
        }

        var tfirst = target.first;
        var tfirstRnd = rnd(0, tfirst.length - 1);

        var tsecond = target.second;
        var tsecondRnd = rnd(0, tsecond.length - 1);

        txt += "<br>" + tfirst[tfirstRnd] + " " + tsecond[tsecondRnd];

        txt = txt.replace("[역]", hotelData.metroStn + " 역");
        txt = txt.replace("[분]", hotelData.distance + "분");

        $(".testWord").html(txt);
    },

    save: function save() {
        for (var i = 0; i < $(".inputBox").length; i++) {
            var path = $(".inputBox").eq(i).attr("id").slice(4).split("_");
            var inputArray = $(".inputBox").eq(i).children("input");
            var txtArray = [];
            for (var j = 0; j < inputArray.length; j++) {
                if (inputArray.eq(j).val().length > 0) {
                    txtArray.push(inputArray.eq(j).val());
                }
            }
            if (path.length === 4) {
                this.data.specific[path[0]][path[1]][path[2]][path[3]] = txtArray;
            } else if (path.length === 5) {
                this.data.specific[path[0]][path[1]][path[2]][path[3]][path[4]] = txtArray;
            } else {
                this.data.specific[path[0]][path[1]][path[2]][path[3]][path[4]][path[5]] = txtArray;
            }
        }

        for (var i = 0; i < $(".txt_safety_box").length; i++) {
            var _inputArray = $(".safety_basic_box").eq(i).find("input");
            var score = $(".safetyScore").eq(i).val() * 1;
            this.data.area[i].intro = [];
            this.data.area[i].score = score;
            for (var j = 0; j < _inputArray.length; j++) {
                if (_inputArray.eq(j).val().length > 0) {
                    this.data.area[i].intro.push(_inputArray.eq(j).val());
                }
            }
        }

        firebase.database().ref("nyc/word/area").set(this.data.area);
        firebase.database().ref("nyc/word/specific").set(this.data.specific);
    },

    initArea: function initArea(data) {
        this.data.area = data;
        var txt_intro = "";
        for (var i = 0; i < this.intro.length; i++) {
            txt_intro += '<div class="txt_intro_box"><input class="txt_intro" value = "' + this.intro[i][0] + '">';
            txt_intro += '<p class="txt_intro">&lt;지역명&gt;</p>';
            txt_intro += '<input class="txt_intro" value = "' + this.intro[i][2] + '"></div>';
        }
        $(".main .intro").html(txt_intro);

        var txt_safety = "";

        for (var k = 0; k < data.length; k++) {
            var area = data[k];
            var score = 0;
            if (area.score) {
                score = area.score;
            }

            txt_safety += '<div class="txt_safety_box"><div class="area_header"><input class="safetyScore" type="number" value="' + score + '">';
            txt_safety += '<h4 class="area_name">' + area.name + '</h4><div class="wordTest" areaNo ="' + k + '">테스트</div></div>';
            txt_safety += '<div class="data"><div class="safety_basic_box">';

            if (area.intro) {
                for (var i = 0; i < area.intro.length; i++) {
                    txt_safety += '<input class="txt_basic" value = "' + area.intro[i] + '" placeholder="지역의 기본 치안 설명을 입력해주세요">';
                }
            }
            txt_safety += '</div><div class="add_safety">기본 워딩 추가</div>';

            txt_safety += '</div></div>';
        }

        $(".main .safety_area").html(txt_safety);
    },

    initSpecific: function initSpecific(data) {
        this.data.specific = data;
        for (var safety in data) {
            var spot = data[safety].spot;
            var transit = data[safety].transit;

            for (var type in spot) {
                //spot 워딩 타입
                for (var order in spot[type]) {
                    var wordArray = spot[type][order];
                    var txt = "";
                    for (var i = 0; i < wordArray.length; i++) {
                        txt += '<input value="' + wordArray[i] + '">';
                    }
                    $("#box_" + safety + "_spot_" + type + "_" + order).html(txt);
                }
            }

            for (var distance in transit) {
                for (var hasSpot in transit[distance]) {
                    var transit_spot = transit[distance][hasSpot];

                    if ('type1' in transit_spot) {
                        for (var type in transit_spot) {
                            for (var order in transit_spot[type]) {
                                var _wordArray = transit_spot[type][order];
                                var _txt = "";
                                for (var i = 0; i < _wordArray.length; i++) {
                                    _txt += '<input value="' + _wordArray[i] + '">';
                                }
                                $("#box_" + safety + "_transit_" + distance + "_" + hasSpot + "_" + type + "_" + order).html(_txt);
                            }
                        }
                    } else {
                        for (var order in transit_spot) {
                            var _wordArray2 = transit_spot[order];
                            var _txt2 = "";
                            for (var i = 0; i < _wordArray2.length; i++) {
                                _txt2 += '<input value="' + _wordArray2[i] + '">';
                            }
                            $("#box_" + safety + "_transit_" + distance + "_" + hasSpot + "_" + order).html(_txt2);
                        }
                    }
                }
            }
        }
    }
};

exports.default = Safety;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTljNmZkZWY5OWMyYzUyYjRiNDQiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jb21iaW5lLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvYWN0aW9uLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3Nwb3RzLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvcG9zdEFjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9tb2R1bGVzL3JhbmsuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy90YWcuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9kYXRhLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvc2FmZXR5LmpzIl0sIm5hbWVzIjpbIkNvbWJpbmUiLCJtYXAiLCJtYXJrZXIiLCJpbml0IiwiZGF0YSIsIiQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY29tYmluaW5nIiwiZ29vZ2xlIiwibWFwcyIsIk1hcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjZW50ZXIiLCJsYXQiLCJsbmciLCJ6b29tIiwibWFwVHlwZUNvbnRyb2wiLCJzY2FsZUNvbnRyb2wiLCJmdWxsc2NyZWVuQ29udHJvbCIsImFkZExpc3RlbmVyIiwiZSIsImNsaWNrTWFwIiwiaW5mbGF0ZSIsImNpdHlDb2RlIiwiYXR0ciIsInNpdGVBcnJheSIsImNvbWJpbmVkT2JqIiwiY291bnRlciIsImoiLCJsZW5ndGgiLCJzaXRlIiwiaSIsIm9sZFNwb3QiLCJzcG90IiwibmFtZSIsImtvIiwiZW4iLCJjb29yIiwicmFuayIsInRlc3QiLCJ1cmwiLCJ0YWciLCJjb25zb2xlIiwibG9nIiwiZGlmQ2hlY2siLCJjb21iaW5lT2JqIiwiY29kZSIsImNvbWJpbmUiLCJ0Q29kZSIsInRTcG90Iiwia2V5IiwibGF0RGlmIiwiTWF0aCIsInBvdyIsImxuZ0RpZiIsImRpZiIsInJvdW5kIiwic3FydCIsImZpcmViYXNlIiwiZGF0YWJhc2UiLCJyZWYiLCJzZXQiLCJrZXlzIiwiT2JqZWN0IiwiaHRtbCIsInZhbCIsImxvY2FsIiwiTWFya2VyIiwicG9zaXRpb24iLCJtYWluIiwicGFuVG8iLCJwdXNoIiwidGFyZ2V0VHh0IiwidGFyZ2V0Tm8iLCJzaWQiLCJsYXRsbmciLCJ0TWFya2VyIiwibGFiZWwiLCJ0b1N0cmluZyIsIkFjdGlvbiIsImVudGVyYW5jZSIsImNoZWNrIiwidG9nZ2xlQ2xhc3MiLCJ0b05leHQiLCJtYWluRGF0YSIsImhhc0NsYXNzIiwidGlkIiwiZXEiLCJ0YXJnZXREYXRhIiwiaW5jbHVkZXMiLCJpbmZsYXRlVGhlbWUiLCJ0YWdBcnJheSIsInNwbGl0IiwiZW50ZXJhbmNlQXJyYXkiLCJsaW5lIiwiY2hpbGRyZW4iLCJlbnRDb29yIiwic2V0TWFwIiwiYWRkRW50ZXJhbmNlIiwidHh0IiwiYXBwZW5kIiwic2VsZWN0Q29vciIsImRpdiIsInBhcmVudCIsInJlbW92ZUVudGVyYW5jZSIsInJlbW92ZSIsImxhdExuZyIsImljb24iLCJzYXZlU3BvdCIsInVwZGF0ZSIsInJlbW92ZVNwb3QiLCJjb25maXJtIiwicmVhZHkiLCJvbmNlIiwic25hcCIsInByb2Nlc3MiLCJzcG90cyIsImNvbWJpbmVkIiwibGlzdCIsImNsaWNrIiwib24iLCJQb3N0QWN0aW9uIiwidGhhdCIsImlzUGVyZmVjdCIsImlucHV0Q29vciIsInNlYXJjaFNwb3QiLCJyZUFycmF5TmF2ZXIiLCJudiIsInNhdmVTcG90RGF0YSIsIm5vRGF0YSIsImRhdGFUeHQiLCJ0YSIsImxwIiwiaXNBbnlFbXB0eSIsImVUeHQiLCJzbGljZSIsIm5vT2ZDcmFjayIsImdnIiwiZG9tIiwiaWR4IiwidG9hc3QiLCJhbGVydCIsInNwb3ROYW1lIiwiY2FuSURlbGV0ZSIsImNpdHlOYW1lIiwid2luZG93Iiwib3BlbiIsIm5ld0FycmF5IiwibnZEYXRhIiwibmV3TnZBcnJheSIsImNzcyIsInNldFRpbWVvdXQiLCJSYW5rIiwic29ydEFycmF5IiwiYXJyYXkiLCJtaW5SYW5rIiwiaW5kUmFuayIsInNjb3JlIiwic29ydCIsImEiLCJiIiwicmFua2luZyIsIlRhZyIsInRhZ09iaiIsInRhZ1JhbmtBcnJheSIsInRhZ3MiLCJEYXRhIiwic3BvdE9iaiIsIm1ldHJvIiwibWV0cm9PYmoiLCJtZXRyb1Njb3JlIiwiaG90ZWxPYmoiLCJhcmVhQXJyYXkiLCJob3RlbHMiLCJtZXRyb0xpbmUiLCJhcmVhIiwiaG90ZWxfZGF0YSIsImhpZCIsInNlYXJjaEluUG9seWdvbiIsIkxhdExuZyIsInBvbHlnb24iLCJQb2x5Z29uIiwicGF0aHMiLCJnZW9tZXRyeSIsInBvbHkiLCJjb250YWluc0xvY2F0aW9uIiwiaG90ZWwiLCJkYXRhX2ZpbmRiZXN0TWV0cm8iLCJtZXRyb1JhbmtPYmoiLCJtZXRyb1JhbmtBcnJheSIsInNwb3RSYW5rIiwibWV0cm9JbmZvIiwiZGlzdGFuY2UiLCJkYXRhX21ldHJvX3Byb2Nlc3MiLCJtZXRyb19wcm9jZXNzX2ZpbmRNZXRybyIsImhvdGVsX3Byb2Nlc3NfZmluZE1ldHJvIiwibWF4IiwiayIsIlNhZmV0eSIsImJhc2ljIiwic3BlY2lmaWMiLCJpbnRybyIsInJuZCIsIm1pbiIsInJhbk51bSIsImZsb29yIiwicmFuZG9tIiwic3BvdExpc3QiLCJtZXRyb1N0biIsImhvdGVsRGF0YSIsImhhc1Nwb3QiLCJzcG90RGlzdGFuY2UiLCJuZWFyTWV0cm8iLCJzcG90Um5kIiwibWV0cm9SbmQiLCJkaXN0YW5jZVJuZCIsImludHJvUm5kIiwiam9zYSIsImFyZWFJbnRyb1JuZCIsInNhZmV0eSIsIndvcmRPYmoiLCJzcG90VHlwZVJuZCIsImZpcnN0IiwidHlwZTEiLCJmaXJzdFJuZCIsInNlY29uZCIsInNlY29uZFJuZCIsInR5cGUyIiwicmVwbGFjZSIsInRyYW5zVHlwZVJuZCIsInRhcmdldCIsInRyYW5zaXQiLCJuZWFyIiwibm9TcG90IiwiZmFyIiwidGZpcnN0IiwidGZpcnN0Um5kIiwidHNlY29uZCIsInRzZWNvbmRSbmQiLCJzYXZlIiwicGF0aCIsImlucHV0QXJyYXkiLCJ0eHRBcnJheSIsImZpbmQiLCJpbml0QXJlYSIsInR4dF9pbnRybyIsInR4dF9zYWZldHkiLCJpbml0U3BlY2lmaWMiLCJ0eXBlIiwib3JkZXIiLCJ3b3JkQXJyYXkiLCJ0cmFuc2l0X3Nwb3QiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7OztBQUVBLElBQUlBLFVBQVU7QUFDVkMsU0FBSyxFQURLO0FBRVZDLFlBQVEsRUFGRTtBQUdWQyxVQUFNLGNBQVNDLElBQVQsRUFBYztBQUNoQkMsVUFBRSxlQUFGLEVBQW1CQyxXQUFuQixDQUErQixVQUEvQjtBQUNBRCxVQUFFLFlBQUYsRUFBZ0JFLFFBQWhCLENBQXlCLFVBQXpCO0FBQ0FGLFVBQUUsYUFBRixFQUFpQkUsUUFBakIsQ0FBMEIsYUFBMUI7QUFDQUYsVUFBRSxVQUFGLEVBQWNDLFdBQWQsQ0FBMEIsYUFBMUI7O0FBRUEsWUFBR0YsS0FBS0ksU0FBUixFQUFrQjtBQUNkLGlCQUFLUCxHQUFMLEdBQVcsSUFBSVEsT0FBT0MsSUFBUCxDQUFZQyxHQUFoQixDQUFvQkMsU0FBU0MsY0FBVCxDQUF3QixLQUF4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QUFqQixHQUE4QixJQUFuQztBQUNIO0FBQ0Q1QixrQ0FBRSxVQUFRd04sTUFBUixHQUFlLFdBQWYsR0FBMkIzQixRQUEzQixHQUFvQyxHQUFwQyxHQUF3Q2tCLE9BQXhDLEdBQWdELEdBQWhELEdBQW9Ec0MsSUFBcEQsR0FBeUQsR0FBekQsR0FBNkRDLEtBQS9ELEVBQXNFekwsSUFBdEUsQ0FBMkVtQyxJQUEzRTtBQUNIO0FBQ0o7QUFDSixxQkFYRCxNQVdLO0FBQ0QsNkJBQUssSUFBSXNKLEtBQVQsSUFBa0JFLFlBQWxCLEVBQWdDO0FBQzVCLGdDQUFJRCxjQUFZQyxhQUFhRixLQUFiLENBQWhCO0FBQ0EsZ0NBQUl0SixRQUFNLEVBQVY7QUFDQSxpQ0FBSyxJQUFJcEUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJMk4sWUFBVTdOLE1BQTlCLEVBQXNDRSxHQUF0QyxFQUEyQztBQUN2Q29FLHlDQUFLLG1CQUFpQnVKLFlBQVUzTixDQUFWLENBQWpCLEdBQThCLElBQW5DO0FBQ0g7QUFDRDVCLDhCQUFFLFVBQVF3TixNQUFSLEdBQWUsV0FBZixHQUEyQjNCLFFBQTNCLEdBQW9DLEdBQXBDLEdBQXdDa0IsT0FBeEMsR0FBZ0QsR0FBaEQsR0FBb0R1QyxLQUF0RCxFQUE2RHpMLElBQTdELENBQWtFbUMsS0FBbEU7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQUNKO0FBQ0o7QUFsUlEsQ0FBYjs7a0JBcVJlbUcsTSIsImZpbGUiOiJzcG90cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE5YzZmZGVmOTljMmM1MmI0YjQ0IiwiaW1wb3J0IEFjdGlvbiBmcm9tIFwiLi9hY3Rpb24uanNcIlxyXG5cclxubGV0IENvbWJpbmUgPSB7XHJcbiAgICBtYXA6IHt9LFxyXG4gICAgbWFya2VyOiBbXSxcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICQoXCJoZWFkZXI+Lm5hdj5wXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgJChcIi5zcG90X3dvcmtcIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKVxyXG4gICAgICAgICQoXCIucG9zdEFjdGlvblwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuY29tYmluZVwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICAgICBpZihkYXRhLmNvbWJpbmluZyl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcjogeyBsYXQ6IDQwLjc0ODQ0LCBsbmc6IC03My45ODU2NiB9LFxyXG4gICAgICAgICAgICAgICAgem9vbTogMTgsXHJcbiAgICAgICAgICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzY2FsZUNvbnRyb2w6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIEFjdGlvbi5jbGlja01hcChlKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZShkYXRhLmNvbWJpbmluZyk7XHJcbiAgICAgICAgICAgIC8v7ZWp7LmY6riwIOyekeyXhSDspJHsnbgg66qp66Gd7J20IOyeiOycvOuptCDrtojrn6zsmYDshJwg7J6R7JeF7J2EIOydtOyWtO2VnOuLpC5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGNpdHlDb2RlID0gJChcImhlYWRlcj4uY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzaXRlQXJyYXkgPSBbXCJnZ1wiLFwibnZcIixcImxwXCIsXCJ0YVwiXTtcclxuICAgICAgICAgICAgbGV0IGNvbWJpbmVkT2JqID0ge307XHJcbiAgICAgICAgICAgIGxldCBjb3VudGVyID0gMFxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXRlQXJyYXkubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzaXRlID0gc2l0ZUFycmF5W2pdO1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVtzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbc2l0ZV1baV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFNwb3QgPSBkYXRhW3NpdGVdW2ldXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtvOlwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuOlwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IG9sZFNwb3QuY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5rOntcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoL1vqsIAt7Z6jXS8udGVzdChvbGRTcG90Lm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC5uYW1lLmtvID0gb2xkU3BvdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm5hbWUuZW4gPSBvbGRTcG90Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90LnJhbmtbc2l0ZV0gPSBpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9sZFNwb3QudXJsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90LnVybCA9IG9sZFNwb3QudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYob2xkU3BvdC50YWcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudGFnID0gb2xkU3BvdC50YWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY291bnRlcjwxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluZWRPYmpbXCJzMDBcIitjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzMDBcIitjb3VudGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY291bnRlcjwxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkT2JqW1wiczBcIitjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzMFwiK2NvdW50ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lZE9ialtcInNcIitjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzXCIrY291bnRlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXIrK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGlmQ2hlY2soY29tYmluZWRPYmopXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZGlmQ2hlY2s6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGxldCBjaXR5Q29kZSA9ICQoXCJoZWFkZXI+LmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcblxyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgbGV0IGNvbWJpbmVPYmogPSB7fVxyXG5cclxuICAgICAgICBmb3IgKHZhciBjb2RlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSBkYXRhW2NvZGVdO1xyXG4gICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdID0gc3BvdFxyXG4gICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmUgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHRDb2RlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmKGNvZGU8dENvZGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0U3BvdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBkYXRhW3RDb2RlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0U3BvdFtrZXldID0gZGF0YVt0Q29kZV1ba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhdERpZiA9IE1hdGgucG93KChzcG90LmNvb3IubGF0IC0gdFNwb3QuY29vci5sYXQpKjExMTAzNCwyKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbG5nRGlmID0gTWF0aC5wb3coKHNwb3QuY29vci5sbmcgLSB0U3BvdC5jb29yLmxuZykgKiA4NTM5NywgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IE1hdGgucm91bmQoTWF0aC5zcXJ0KGxhdERpZitsbmdEaWYpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihkaWY8MjAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0uY29tYmluZVt0Q29kZV0gPSB0U3BvdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLrp4ntjJBcIilcclxuICAgICAgICBjb25zb2xlLmxvZyhjb21iaW5lT2JqKVxyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihjaXR5Q29kZStcIi9zcG90cy9jb21iaW5pbmdcIikuc2V0KGNvbWJpbmVPYmopXHJcblxyXG4gICAgICAgIHRoaXMuaW5mbGF0ZShjb21iaW5lT2JqKVxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICB0aGlzLm1hcmtlciA9IFtdO1xyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpO1xyXG4gICAgICAgICQoXCIubm9PZkRhdGFcIikuaHRtbChrZXlzLmxlbmd0aClcclxuICAgICAgICBsZXQgc3BvdCA9IGRhdGFba2V5c1swXV07XHJcblxyXG4gICAgICAgICQoXCIub3JpZ2luYWxcIikuYXR0cihcIm9pZFwiLCBrZXlzWzBdKVxyXG5cclxuICAgICAgICBpZihzcG90Lm5hbWUua28ubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAkKFwiI25hbWVfcHJpbWVcIikuaHRtbChzcG90Lm5hbWUua28pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKFwiI25hbWVfcHJpbWVcIikuaHRtbChzcG90Lm5hbWUuZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKFwiI25hbWVfa29cIikudmFsKHNwb3QubmFtZS5rbyk7XHJcbiAgICAgICAgJChcIiNuYW1lX2VuXCIpLnZhbChzcG90Lm5hbWUuZW4pO1xyXG4gICAgICAgIGlmKHNwb3QubmFtZS5sb2NhbCl7XHJcbiAgICAgICAgICAgICQoXCIjbmFtZV9sb2NhbFwiKS52YWwoc3BvdC5uYW1lLmxvY2FsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3BvdC5jb29yLmxhdCA9IHNwb3QuY29vci5sYXQqMTtcclxuICAgICAgICBzcG90LmNvb3IubG5nID0gc3BvdC5jb29yLmxuZyoxXHJcblxyXG4gICAgICAgIGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHNwb3QuY29vcixcclxuICAgICAgICAgICAgbWFwOiB0aGlzLm1hcFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBBY3Rpb24ubWFya2VyLm1haW4gPSBtYXJrZXI7XHJcblxyXG4gICAgICAgIHRoaXMubWFwLnBhblRvKHNwb3QuY29vcilcclxuICAgICAgICAkKFwiLmNvb3JkaW5hdGVfbWFpblwiKS5odG1sKHNwb3QuY29vci5sYXQrXCIsXCIrc3BvdC5jb29yLmxuZylcclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXIucHVzaChtYXJrZXIpXHJcblxyXG4gICAgICAgIGxldCB0YXJnZXRUeHQgPSBcIlwiO1xyXG4gICAgICAgIGxldCB0YXJnZXRObyA9IDA7XHJcblxyXG4gICAgICAgIGZvciAodmFyIHNpZCBpbiBzcG90LmNvbWJpbmUpIHtcclxuICAgICAgICAgICAgbGV0IHRTcG90ID0gc3BvdC5jb21iaW5lW3NpZF07XHJcbiAgICAgICAgICAgIHRhcmdldE5vKys7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGF0bG5nID0ge1xyXG4gICAgICAgICAgICAgICAgbGF0OiB0U3BvdC5jb29yLmxhdCoxLFxyXG4gICAgICAgICAgICAgICAgbG5nOiB0U3BvdC5jb29yLmxuZyoxXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0TWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjpsYXRsbmcsXHJcbiAgICAgICAgICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHRhcmdldE5vLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1hcmtlci5wdXNoKHRNYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgLy/rs7jrqoXsnLzroZwg7ZWc6riA66qFIOyYgeyWtOuqheydtCDsl4bsnYQg6rK97Jqw66W8IOyytO2BrO2VtOyEnCDrhKPslrTspIDri6QuXHJcbiAgICAgICAgICAgIGlmKCQoXCIjbmFtZV9rb1wiKS52YWwoKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYW1lX2tvXCIpLnZhbCh0U3BvdC5uYW1lLmtvKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCQoXCIjbmFtZV9lblwiKS52YWwoKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYW1lX2VuXCIpLnZhbCh0U3BvdC5uYW1lLmVuKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0YXJnZXRUeHQgKz0gJzxkaXYgY2xhc3M9XCJzcG90Qm94XCI+PHAgY2xhc3M9XCJudW1iZXJcIj4nK3RhcmdldE5vKyc8L3A+PGRpdiBjbGFzcz1cImNoZWNrQm94XCIgc2lkPVwiJytzaWQrJ1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJyaWdodFwiPidcclxuICAgICAgICAgICAgdGFyZ2V0VHh0ICs9ICc8cCBjbGFzcz1cIm5hbWVfa29cIj4nK3RTcG90Lm5hbWUua28rJzwvcD48cCBjbGFzcz1cIm5hbWVfZW5cIj4nK3RTcG90Lm5hbWUuZW4rJzwvcD4nXHJcbiAgICAgICAgICAgIGlmKHRTcG90Lm5hbWUubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0VHh0ICs9ICc8cCBjbGFzcz1cIm5hbWVfbG9jYWxcIj4nK3RTcG90Lm5hbWUubG9jYWwrJzwvcD4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGFyZ2V0VHh0ICs9ICc8L2Rpdj48L2Rpdj4nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmNvbWJpbmUgLnRhcmdldFwiKS5odG1sKHRhcmdldFR4dCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21iaW5lO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NvbWJpbmUuanMiLCJpbXBvcnQgQ29tYmluZSBmcm9tIFwiLi9jb21iaW5lLmpzXCJcclxuXHJcbmxldCBBY3Rpb24gPSB7XHJcbiAgICBkYXRhOiB7fSxcclxuICAgIG1hcmtlcjp7XHJcbiAgICAgICAgbWFpbjp7fSxcclxuICAgICAgICBlbnRlcmFuY2U6e31cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2s6IGZ1bmN0aW9uKHNpZCl7XHJcbiAgICAgICAgJChcIi5jaGVja0JveFtzaWQ9XCIrc2lkK1wiXVwiKS50b2dnbGVDbGFzcyhcImNoZWNrZWRcIilcclxuICAgIH0sXHJcblxyXG4gICAgdG9OZXh0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBtYWluRGF0YSA9IHRoaXMuZGF0YVskKFwiLm9yaWdpbmFsXCIpLmF0dHIoXCJvaWRcIildO1xyXG5cclxuICAgICAgICBpZigkKFwiLm5hdl9zcG90XCIpLmhhc0NsYXNzKFwic2VsZWN0ZWRcIikpe1xyXG4gICAgICAgICAgICAvL+yyq+uyiOyerCAtPiDrkZDrsojsp7gg7YOt7Jy866GcIOydtOuPmTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLmNoZWNrZWRcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aWQgPSAkKFwiLmNoZWNrZWRcIikuZXEoaSkuYXR0cihcInNpZFwiKVxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldERhdGEgPSBtYWluRGF0YS5jb21iaW5lW3RpZF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7J2YIHJhbmvrpbwgbWFpbmREYXRh7J2YIHJhbmvroZwg7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiB0YXJnZXREYXRhLnJhbmspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZighbWFpbkRhdGEucmFua1tzaXRlXSA8IHRhcmdldERhdGEucmFua1tzaXRlXSlcclxuICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS5yYW5rW3NpdGVdID0gdGFyZ2V0RGF0YS5yYW5rW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8v7ZWp7LOQ7KeIIOuMgOyDgeydmCDtg5zqt7jrpbwgbWFpbkRhdGHsnZggdGFn66GcIO2Gte2Vqe2VmOuKlCDsnpHsl4VcclxuICAgICAgICAgICAgICAgIGlmKHRhcmdldERhdGEudGFnKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRhcmdldERhdGEudGFnLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1haW5EYXRhLnRhZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighbWFpbkRhdGEudGFnLmluY2x1ZGVzKHRhcmdldERhdGEudGFnW2pdKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnLnB1c2godGFyZ2V0RGF0YS50YWdbal0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnID0gdGFyZ2V0RGF0YS50YWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL+2VqeyzkOyniCDrjIDsg4Hsl5DqsowgdXJs7J20IOyeheugpeuQmOyWtCDsnojri6TrqbQgbWFpbkRhdGHsl5Ag7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICAgICAgaWYoIW1haW5EYXRhLnVybCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGFyZ2V0RGF0YS51cmwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS51cmwgPSB0YXJnZXREYXRhLnVybDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YVt0aWRdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWFpbkRhdGEubmFtZS5rbyA9ICQoXCIjbmFtZV9rb1wiKS52YWwoKTtcclxuICAgICAgICAgICAgbWFpbkRhdGEubmFtZS5lbiA9ICQoXCIjbmFtZV9lblwiKS52YWwoKTtcclxuICAgICAgICAgICAgbWFpbkRhdGEubmFtZS5sb2NhbCA9ICQoXCIjbmFtZV9sb2NhbFwiKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGRlbGV0ZSBtYWluRGF0YS5jb21iaW5lO1xyXG5cclxuICAgICAgICAgICAgJChcIi5uYXZfc3BvdFwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiLm5hdl90aGVtZVwiKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiLnRhcmdldFwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAkKFwiLnRoZW1lXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGVUaGVtZShtYWluRGF0YSk7XHJcblxyXG4gICAgICAgIH1lbHNlIGlmKCQoXCIubmF2X3RoZW1lXCIpLmhhc0NsYXNzKFwic2VsZWN0ZWRcIikpe1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YVskKFwiLm9yaWdpbmFsXCIpLmF0dHIoXCJvaWRcIildO1xyXG4gICAgICAgICAgICBsZXQgdGFnQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi50YWdab25lPmlucHV0XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFnID0gJChcIi50YWdab25lPmlucHV0XCIpLmVxKGkpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRhZy5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnQXJyYXkucHVzaCh0YWcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhdGEudGFnID0gdGFnQXJyYXlcclxuXHJcbiAgICAgICAgICAgICQoXCIubmF2X3RoZW1lXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICQoXCIubmF2X2VudGVyYW5jZVwiKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiLnRoZW1lXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICQoXCIuZW50ZXJhbmNlXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICQoXCIudG9OZXh0XCIpLmh0bWwoXCLsoIDsnqVcIilcclxuXHJcbiAgICAgICAgfWVsc2UgaWYoJChcIi5uYXZfZW50ZXJhbmNlXCIpLmhhc0NsYXNzKFwic2VsZWN0ZWRcIikpe1xyXG4gICAgICAgICAgICBsZXQgc2lkID0gJChcIi5vcmlnaW5hbFwiKS5hdHRyKFwib2lkXCIpXHJcbiAgICAgICAgICAgIGxldCBtYWluRGF0YSA9IHRoaXMuZGF0YVtzaWRdO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvb3IgPSAkKFwiLmNvb3JkaW5hdGVfbWFpblwiKS5odG1sKCkuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgICAgICBjb29yID0ge1xyXG4gICAgICAgICAgICAgICAgbGF0OiBjb29yWzBdKjEsXHJcbiAgICAgICAgICAgICAgICBsbmc6IGNvb3JbMV0qMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBlbnRlcmFuY2VBcnJheSA9IFtdXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuZW50ZXJhbmNlX2JveD4ubGluZXJcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lID0gJChcIi5lbnRlcmFuY2VfYm94Pi5saW5lclwiKS5lcShpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihsaW5lLmNoaWxkcmVuKFwiLmNvb3JkaW5hdGVcIikuaHRtbCgpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZW50Q29vciA9IGxpbmUuY2hpbGRyZW4oXCIuY29vcmRpbmF0ZVwiKS5odG1sKCkuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVudENvb3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogZW50Q29vclswXSoxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsbmc6IGVudENvb3JbMV0qMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbnRlcmFuY2VBcnJheS5wdXNoKGVudENvb3IpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWFpbkRhdGEuY29vciA9IGNvb3I7XHJcbiAgICAgICAgICAgIG1haW5EYXRhLmVudGVyYW5jZSA9IGVudGVyYW5jZUFycmF5XHJcblxyXG4gICAgICAgICAgICBsZXQgY2l0eUNvZGUgPSBcIm55Y1wiO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDsnbTqsowg64u57Jew7Z6IIOuwlOuAjOyWtOyVvCDtlahcclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGNpdHlDb2RlK1wiL3Nwb3RzL2NvbWJpbmVkL1wiK3NpZCkuc2V0KG1haW5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGFbc2lkXTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoY2l0eUNvZGUrXCIvc3BvdHMvY29tYmluaW5nXCIpLnNldCh0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICAkKFwiLmVudGVyYW5jZV9ib3hcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgJChcIi50b05leHRcIikuaHRtbChcIuuLpOydjFwiKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgbWFya2VyIGluIHRoaXMubWFya2VyLmVudGVyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5tYXJrZXIuZW50ZXJhbmNlW21hcmtlcl0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyLmVudGVyYW5jZVttYXJrZXJdLnNldE1hcChudWxsKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMubWFya2VyLm1haW4pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIubWFpbi5zZXRNYXAobnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1hcmtlciA9IHtcclxuICAgICAgICAgICAgICAgIG1haW46e30sXHJcbiAgICAgICAgICAgICAgICBlbnRlcmFuY2U6e31cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgQ29tYmluZS5pbmZsYXRlKHRoaXMuZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiLm5hdl9lbnRlcmFuY2VcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgJChcIi5uYXZfc3BvdFwiKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiLnRhcmdldFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmVudGVyYW5jZVwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGFkZEVudGVyYW5jZTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQga2V5ID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJmb3JLZXlcIikucHVzaCgpLmtleVxyXG4gICAgICAgIGxldCB0eHQgPSAnPGRpdiBjbGFzcz1cImxpbmVyXCIgaWQ9XCInK2tleSsnXCI+PHAgY2xhc3M9XCJzdWJ0aXRsZVwiPuyeheq1rDwvcD48cCBjbGFzcz1cImNvb3JkaW5hdGVfZW50ZXJhbmNlIGNvb3JkaW5hdGVcIj48L3A+J1xyXG4gICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzZWxlY3RcIj7shKDtg508L3A+PHAgY2xhc3M9XCJyZW1vdmVcIj7soJzqsbA8L3A+PC9kaXY+J1xyXG4gICAgICAgICQoXCIuZW50ZXJhbmNlX2JveFwiKS5hcHBlbmQodHh0KVxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlVGhlbWU6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGxldCB0eHQgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZihkYXRhLnRhZyl7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS50YWcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHR4dCs9JzxpbnB1dCB2YWx1ZT1cIicrZGF0YS50YWdbaV0rJ1wiPidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKFwiLnRhZ1pvbmVcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNlbGVjdENvb3I6IGZ1bmN0aW9uKGRpdil7XHJcbiAgICAgICAgaWYoZGl2Lmhhc0NsYXNzKFwic2VsZWN0aW5nXCIpKXtcclxuICAgICAgICAgICAgZGl2LnJlbW92ZUNsYXNzKFwic2VsZWN0aW5nXCIpO1xyXG4gICAgICAgICAgICBkaXYucGFyZW50KCkuY2hpbGRyZW4oXCIuc2VsZWN0XCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKFwiLmNvb3JkaW5hdGVcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RpbmdcIik7XHJcbiAgICAgICAgICAgIGRpdi5hZGRDbGFzcyhcInNlbGVjdGluZ1wiKVxyXG4gICAgICAgICAgICAkKFwiLmVudGVyYW5jZSAuc2VsZWN0XCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgICAgIGRpdi5wYXJlbnQoKS5jaGlsZHJlbihcIi5zZWxlY3RcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVFbnRlcmFuY2U6IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgaWYodGhpcy5tYXJrZXIuZW50ZXJhbmNlW2tleV0pe1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtlci5lbnRlcmFuY2Vba2V5XS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiI1wiK2tleSkucmVtb3ZlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrTWFwOiBmdW5jdGlvbihlKXtcclxuICAgICAgICAkKFwiLnNlbGVjdGluZ1wiKS5odG1sKGUubGF0TG5nLmxhdCgpK1wiLFwiK2UubGF0TG5nLmxuZygpKTtcclxuICAgICAgICAkKFwiLnNlbGVjdGluZ1wiKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5zZWxlY3RcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgaWYoJChcIi5zZWxlY3RpbmdcIikuaGFzQ2xhc3MoXCJjb29yZGluYXRlX21haW5cIikpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtlci5tYWluLnNldE1hcChudWxsKVxyXG4gICAgICAgICAgICB0aGlzLm1hcmtlci5tYWluID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogZS5sYXRMbmcsXHJcbiAgICAgICAgICAgICAgICBtYXA6IENvbWJpbmUubWFwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2UgaWYoJChcIi5zZWxlY3RpbmdcIikuaGFzQ2xhc3MoXCJjb29yZGluYXRlX2VudGVyYW5jZVwiKSl7XHJcbiAgICAgICAgICAgIGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBlLmxhdExuZyxcclxuICAgICAgICAgICAgICAgIG1hcDogQ29tYmluZS5tYXAsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnaHR0cDovL21hcHMuZ29vZ2xlLmNvbS9tYXBmaWxlcy9tcy9pY29ucy9ncmVlbi1kb3QucG5nJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IGtleSA9ICQoXCIuc2VsZWN0aW5nXCIpLnBhcmVudCgpLmF0dHIoXCJpZFwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMubWFya2VyLmVudGVyYW5jZVtrZXldKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyLmVudGVyYW5jZVtrZXldLnNldE1hcChudWxsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLmVudGVyYW5jZVtrZXldID0gbWFya2VyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5zZWxlY3RpbmdcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RpbmdcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIHNhdmVTcG90OiBmdW5jdGlvbihzaWQpe1xyXG4gICAgICAgIGxldCBjaXR5Q29kZSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgbmFtZTp7XHJcbiAgICAgICAgICAgICAgICBrbzpcIlwiLFxyXG4gICAgICAgICAgICAgICAgZW46XCJcIixcclxuICAgICAgICAgICAgICAgIGxvY2FsOlwiXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXJsOlwiXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coc2lkKVxyXG5cclxuICAgICAgICBsZXQgbmFtZSA9ICQoXCIjXCIrc2lkKS5jaGlsZHJlbihcIi5yZXN1bHRfbmFtZVwiKS52YWwoKS5zcGxpdChcIi0tXCIpO1xyXG4gICAgICAgIGRhdGEubmFtZS5rbyA9IG5hbWVbMF07XHJcbiAgICAgICAgZGF0YS5uYW1lLmVuID0gbmFtZVsxXTtcclxuICAgICAgICBkYXRhLnVybCA9ICQoXCIjXCIrc2lkKS5jaGlsZHJlbihcIi5yZXN1bHRfdXJsXCIpLnZhbCgpXHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihjaXR5Q29kZStcIi9zcG90cy9jb21iaW5lZC9cIitzaWQpLnVwZGF0ZShkYXRhKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZVNwb3Q6IGZ1bmN0aW9uKHNpZCl7XHJcbiAgICAgICAgbGV0IGNpdHlDb2RlID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBuYW1lID0gJChcIiNcIitzaWQpLmNoaWxkcmVuKFwiLnJlc3VsdF9uYW1lXCIpLnZhbCgpLnNwbGl0KFwiLS1cIilbMF07XHJcbiAgICAgICAgaWYoY29uZmlybShuYW1lK1wiIOq0gOq0keyngOulvCDsgq3soJztlZjsi5zqsqDsirXri4jquYw/XCIpKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoY2l0eUNvZGUrXCIvc3BvdHMvY29tYmluZWQvXCIrc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjdGlvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hY3Rpb24uanMiLCJsZXQgY2l0eUNvZGUgPSBcIm55Y1wiO1xyXG5cclxuaW1wb3J0IENvbWJpbmUgZnJvbSBcIi4vbW9kdWxlcy9jb21iaW5lLmpzXCI7XHJcbmltcG9ydCBQb3N0QWN0aW9uIGZyb20gXCIuL21vZHVsZXMvcG9zdEFjdGlvbi5qc1wiO1xyXG5pbXBvcnQgQWN0aW9uIGZyb20gXCIuL21vZHVsZXMvYWN0aW9uLmpzXCI7XHJcbmltcG9ydCBSYW5rIGZyb20gXCIuL21vZHVsZXMvcmFuay5qc1wiO1xyXG5pbXBvcnQgVGFnIGZyb20gXCIuL21vZHVsZXMvdGFnLmpzXCI7XHJcbmltcG9ydCBEYXRhIGZyb20gXCIuL21vZHVsZXMvZGF0YS5qc1wiO1xyXG5pbXBvcnQgU2FmZXR5IGZyb20gXCIuL21vZHVsZXMvc2FmZXR5LmpzXCI7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoY2l0eUNvZGUpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICBsZXQgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgJChcImhlYWRlcj4uY2l0eU5hbWVcIikuYXR0cihcImNpZFwiLCBjaXR5Q29kZSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcImhpXCIpXHJcblxyXG4gICAgICAgIC8v7KCE7LKY66asIOqygOymnSwg7JmE67K97ZWY66m0IHRydWXrpbwg67CY7ZmY7ZWoIC0+IENvbWJpbmUg7KeE7ZaJXHJcbiAgICAgICAgaWYoUG9zdEFjdGlvbi5wcm9jZXNzKGRhdGEuc3BvdHMpKXtcclxuICAgICAgICAgICAgQ29tYmluZS5pbml0KGRhdGEuc3BvdHMpXHJcbiAgICAgICAgICAgIEFjdGlvbi5pbml0KGRhdGEuc3BvdHMuY29tYmluaW5nKTtcclxuICAgICAgICAgICAgaWYoZGF0YS5zcG90cy5jb21iaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBUYWcuaW5pdChkYXRhLnNwb3RzLmNvbWJpbmVkKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIERhdGEuaW5pdChkYXRhKTtcclxuICAgICAgICAgICAgICAgIFNhZmV0eS5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy8g7KeA7JetIOu2hOulmO2VmOq4sCAvIOuplO2KuOuhnCDsoJXrs7Qg7KeR7Ja064Sj6riwIC9cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0eWxpc3RcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgIGxldCBsaXN0ID0gc25hcC52YWwoKTtcclxuICAgICAgICBsZXQgdHh0ID0gXCJcIlxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJjaXR5TGlzdF9uYW1lXCIgaWQ9XCInK2xpc3RbaV0uY29kZSsnXCI+JytsaXN0W2ldLm5hbWUrJzwvcD4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIuY2l0eUxpc3RcIikuaHRtbCh0eHQpXHJcbiAgICB9KVxyXG59KVxyXG4kKFwiLm5hdj4uc3BvdF9yYW5rXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICBSYW5rLmluaXQoY2l0eUNvZGUpXHJcbn0pXHJcblxyXG4kKFwiLnRhcmdldFwiKS5vbihcImNsaWNrXCIsIFwiLnNwb3RCb3hcIiwgZnVuY3Rpb24oKXtcclxuICAgIEFjdGlvbi5jaGVjaygkKHRoaXMpLmNoaWxkcmVuKFwiLmNoZWNrQm94XCIpLmF0dHIoXCJzaWRcIikpO1xyXG59KVxyXG4kKFwiLmNvbWJpbmVcIikub24oXCJjbGlja1wiLCBcIi50b05leHRcIiwgZnVuY3Rpb24oKXtcclxuICAgIEFjdGlvbi50b05leHQoKTtcclxufSlcclxuJChcIi5lbnRlcmFuY2VcIikub24oXCJjbGlja1wiLCBcIi5zZWxlY3RcIiwgZnVuY3Rpb24oKXtcclxuICAgIEFjdGlvbi5zZWxlY3RDb29yKCQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIuY29vcmRpbmF0ZVwiKSk7XHJcbn0pXHJcbiQoXCIuZW50ZXJhbmNlXCIpLm9uKFwiY2xpY2tcIiwgXCIucmVtb3ZlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBBY3Rpb24ucmVtb3ZlRW50ZXJhbmNlKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpKTtcclxufSlcclxuJChcIi5hZGRFbnRlcmFuY2VcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIEFjdGlvbi5hZGRFbnRlcmFuY2UoKTtcclxufSlcclxuJChcIi5jaXR5TmFtZVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgJChcIi5saWdodEJveFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbn0pXHJcbiQoXCIucmFua0RpdlwiKS5vbihcImNsaWNrXCIsIFwiLnNhdmVfc3BvdFwiLCBmdW5jdGlvbigpe1xyXG4gICAgQWN0aW9uLnNhdmVTcG90KCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpKVxyXG59KVxyXG4kKFwiLnJhbmtEaXZcIikub24oXCJjbGlja1wiLCBcIi5yZW1vdmVfc3BvdFwiLCBmdW5jdGlvbigpe1xyXG4gICAgQWN0aW9uLnJlbW92ZVNwb3QoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIikpXHJcbn0pXHJcblxyXG4kKFwiLmNpdHlMaXN0XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2l0eUxpc3RfbmFtZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgY2l0eUNvZGUgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICQoXCJoZWFkZXI+LmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIiwgY2l0eUNvZGUpO1xyXG5cclxuICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGNpdHlDb2RlK1wiL3Nwb3RzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICBsZXQgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgJChcImhlYWRlcj4uY2l0eU5hbWVcIikuYXR0cihcImNpZFwiLCBjaXR5Q29kZSlcclxuICAgICAgICAkKFwiLmxpZ2h0Qm94XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuXHJcbiAgICAgICAgLy/soITsspjrpqwg6rKA7KadLCDsmYTrsr3tlZjrqbQgdHJ1ZeulvCDrsJjtmZjtlaggLT4gQ29tYmluZSDsp4TtlolcclxuICAgICAgICBpZihQb3N0QWN0aW9uLnByb2Nlc3MoZGF0YSkpe1xyXG4gICAgICAgICAgICBDb21iaW5lLmluaXQoZGF0YSk7XHJcbiAgICAgICAgICAgIEFjdGlvbi5pbml0KGRhdGEuY29tYmluaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59KVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9zcG90cy5qcyIsIi8vNuuLqOqzhOyXkCDqsbjss5Ag7KCE7LKY66asIOyekeyXheydtCDtlYTsmpTtlZzsp4Drpbwg6rKA7Kad7ZWY6rOgLCDsoITsspjrpqztlZjripQg6rCd7LK064ukLlxyXG5sZXQgUG9zdEFjdGlvbiA9IHtcclxuICAgIGRhdGEgOiB7fSxcclxuXHJcbiAgICBwcm9jZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy/slZ7snLzroZwgNuuLqOqzhOyXkCDqsbjsuZwg66y06rKw7ISxIOqygOymneydhCDthrXqs7ztlZjrqbQg7KCE7LKY66asIOyekeyXheydgCDrgZ3rgqzri6Tqs6Ag6rCE7KO865CY6rOgLCDrp4jsp4Drp4nsl5AgY29tYmluZSDri6jqs4TroZwg64SY7Ja06rCE64ukLlxyXG4gICAgICAgIGxldCBpc1BlcmZlY3QgPSB0cnVlO1xyXG5cclxuICAgICAgICAvL+ydtO2VmCA06rCcIOydtOuypO2KuCDrpqzsiqTrhIjripQg6rWs6riAIOq0gOq0keyngOyXkCDrjIDtlZwg7IiY64+ZIOyijO2RnOyeheugpSDqtIDroKgg7J2067Kk7Yq4IOumrOyKpOuEiOuLpC5cclxuICAgICAgICAkKFwiLmNvb3Jab25lXCIpLm9uKFwiY2xpY2tcIiwgXCIuaW5wdXRcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LmlucHV0Q29vcigkKHRoaXMpLnBhcmVudCgpKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChcIi5jb29yWm9uZVwiKS5vbihcImNsaWNrXCIsIFwiLnJlbW92ZVwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQucmVtb3ZlU3BvdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZHhcIikpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiLmNvb3Jab25lXCIpLm9uKFwiY2xpY2tcIiwgXCIuY29vcl9zcG90TmFtZVwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuc2VhcmNoU3BvdCgkKHRoaXMpLmh0bWwoKSlcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCIucGFzc05hdmVyXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQucmVBcnJheU5hdmVyKHRoYXQuZGF0YS5udik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiLnNhdmVTcG90RGF0YVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LnNhdmVTcG90RGF0YSgkKHRoaXMpLmF0dHIoXCJzaWRcIikpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxldCBub0RhdGEgPSBmYWxzZTtcclxuICAgICAgICBsZXQgZGF0YVR4dCA9IFwiXCJcclxuXHJcbiAgICAgICAgLy/tirjrpr3slrTrk5zrsJTsnbTsoIAg642w7J207YSw6rCAIOyXhuqxsOuCmCA3MOqwnCDrr7jrp4zsnbTrqbQg66y47KCc6rCAIOyeiOuKlCDqsoNcclxuICAgICAgICBpZighZGF0YS50YSl7XHJcbiAgICAgICAgICAgIGlzUGVyZmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBub0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICBkYXRhVHh0ICs9ICftirjrpr3slrTrk5zrsJTsnbTsoIAsICdcclxuICAgICAgICB9ZWxzZSBpZihkYXRhLnRhLmxlbmd0aDw3MCl7XHJcbiAgICAgICAgICAgIGlzUGVyZmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkKFwiLnRhSGludFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+uhoOumrO2UjOuemOuLmyDrjbDsnbTthLDqsIAg7JeG7Jy866m0IOusuOygnOqwgCDsnojripQg6rKDXHJcbiAgICAgICAgaWYoIWRhdGEubHApe1xyXG4gICAgICAgICAgICBpc1BlcmZlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgbm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGF0YVR4dCArPSAn66Gg66as7ZSM656Y64ubLCAnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+uEpOydtOuyhCDrjbDsnbTthLDqsIAg7J6I64qU7KeALCDsnojrjZTrnbzrj4Qg7KSR6rCE7JeQIOu5oOynhCDrsojtmLjqsIAg7J6I64qU7KeAIOyytO2BrC5cclxuICAgICAgICBpZighZGF0YS5udil7XHJcbiAgICAgICAgICAgIGlzUGVyZmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBub0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICBkYXRhVHh0ICs9ICfrhKTsnbTrsoQsICdcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGlzQW55RW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGVUeHQgPSBcIlwiXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5udi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWRhdGEubnZbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQW55RW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzUGVyZmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVUeHQgKz0gKGkrMSkrXCIsIFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZVR4dCA9IGVUeHQuc2xpY2UoMCxlVHh0Lmxlbmd0aC0yKVxyXG4gICAgICAgICAgICBlVHh0Kz0gXCLsnIQg6rSA6rSR7KeA65Ok7J20IOu5oOyhjOyKteuLiOuLpC4g64uk7IucIOy2lOy2nO2VtOyjvOyEuOyalC5cIlxyXG4gICAgICAgICAgICBpZihpc0FueUVtcHR5KXtcclxuICAgICAgICAgICAgICAgICQoXCIubmF2ZXJOb0luZm9cIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIubmF2ZXJOb0luZm8gLmhpbnRUeHRcIikuaHRtbChlVHh0KVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IG5vT2ZDcmFjayA9IDA7XHJcblxyXG4gICAgICAgICAgICBsZXQgdHh0ID0gXCJcIlxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubnYubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8v7KKM7ZGc6rCAIOyXhuqxsOuCmCDsooXsooUg7J207IOB7ZWcIOyijO2RnOqwgCDsnoXroKXrkJwg6rK97Jqw6rCAIOyeiOyWtCDslYTrnpjsmYAg6rCZ7J20IOyytFxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5udltpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWRhdGEubnZbaV0uY29vcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vT2ZDcmFjaysrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY29vcl9zcG90XCIgc2lkPVwibnZcIiBpZHg9JytpKyc+PHAgY2xhc3M9XCJjb29yX3Nwb3ROYW1lXCI+JytkYXRhLm52W2ldLm5hbWUrJzwvcD48aW5wdXQgY2xhc3M9XCJjb29yZFwiIHBsYWNlaG9sZGVyPVwieHgueHh4eCwgb28ub29vbyDtmJXtg5zroZwg7KKM7ZGcIOyeheugpVwiPjxwIGNsYXNzPVwiaW5wdXRcIj7snoXroKU8L3A+PHAgY2xhc3M9XCJyZW1vdmVcIj7soJzqsbA8L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihub09mQ3JhY2s+MCl7XHJcbiAgICAgICAgICAgICAgICBpc1BlcmZlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICQoXCIubmF2ZXJBY3Rpb25cIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKFwiLm5hdmVyQWN0aW9uIC5tYWluVHh0XCIpLmh0bWwoXCLrhKTsnbTrsoTsl5DshJwg7LaU7Lac65CcIOyepeyGjCDspJEgXCIrbm9PZkNyYWNrKyBcIuqwnOydmCDsnqXshozsl5Ag64yA7ZWcIOyImOuPmSDsooztkZwg7J6F66Cl7J20IO2VhOyalO2VqeuLiOuLpFwiKTtcclxuICAgICAgICAgICAgJChcIi5jb29yWm9uZS5uYXZlcl9jb29yWm9uZVwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+q1rOq4gCDrjbDsnbTthLDqsIAg7J6I64qU7KeALCDsnojrjZTrnbzrj4Qg7KKM7ZGc6rCAIOydtOyDge2VmOqyjCDsnoXroKXrkJwg6rKD7J20IOyeiOuKlOyngCDssrTtgaxcclxuICAgICAgICBpZighZGF0YS5nZyl7XHJcbiAgICAgICAgICAgIGlzUGVyZmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBub0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICBkYXRhVHh0ICs9ICfqtazquIAsICdcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IG5vT2ZDcmFjayA9IDA7XHJcblxyXG4gICAgICAgICAgICBsZXQgdHh0ID0gXCJcIlxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEuZ2cubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8v7KKM7ZGc6rCAIOyXhuqxsOuCmCDsooXsooUg7J207IOB7ZWcIOyijO2RnOqwgCDsnoXroKXrkJwg6rK97Jqw6rCAIOyeiOyWtCDslYTrnpjsmYAg6rCZ7J20IOyytFxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5nZ1tpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWRhdGEuZ2dbaV0uY29vcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vT2ZDcmFjaysrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY29vcl9zcG90XCIgc2lkPVwiZ2dcIiBpZHg9JytpKyc+PHAgY2xhc3M9XCJjb29yX3Nwb3ROYW1lXCI+JytkYXRhLmdnW2ldLm5hbWUrJzwvcD48aW5wdXQgY2xhc3M9XCJjb29yZFwiIHBsYWNlaG9sZGVyPVwieHgueHh4eCwgb28ub29vbyDtmJXtg5zroZwg7KKM7ZGcIOyeheugpVwiPjxwIGNsYXNzPVwiaW5wdXRcIj7snoXroKU8L3A+PHAgY2xhc3M9XCJyZW1vdmVcIj7soJzqsbA8L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobm9PZkNyYWNrPjApe1xyXG4gICAgICAgICAgICAgICAgaXNQZXJmZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmdvb2dsZUFjdGlvblwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoXCIuZ29vZ2xlQWN0aW9uIC5tYWluVHh0XCIpLmh0bWwoXCLqtazquIDsl5DshJwg7LaU7Lac65CcIOyepeyGjCDspJEgXCIrbm9PZkNyYWNrKyBcIuqwnOydmCDsnqXshozsl5Ag64yA7ZWcIOyImOuPmSDsooztkZwg7J6F66Cl7J20IO2VhOyalO2VqeuLiOuLpFwiKTtcclxuICAgICAgICAgICAgJChcIi5jb29yWm9uZS5nb29nbGVfY29vclpvbmVcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihub0RhdGEpe1xyXG4gICAgICAgICAgICBkYXRhVHh0ID0gZGF0YVR4dC5zbGljZSgwLCBkYXRhVHh0Lmxlbmd0aC0yKTtcclxuICAgICAgICAgICAgZGF0YVR4dCArPSAnIOq0gOq0keyngCDstpTstpzsnbQg7KCc64yA66GcIOynhO2WieuQmOyngCDslYrslZjsirXri4jri6QuIOuLpOyLnCDsp4TtlontlbTso7zshLjsmpQuIOybkOuemCDqtIDqtJHsp4Ag66qp66Gd7J20IOyXhuuLpOuptCDrrLjsnZgnXHJcbiAgICAgICAgICAgICQoXCIubm9EYXRhXCIpLmh0bWwoZGF0YVR4dClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGlzUGVyZmVjdCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dENvb3I6IGZ1bmN0aW9uKGRvbSl7XHJcbiAgICAgICAgbGV0IGNpdHlDb2RlID0gJChcImhlYWRlcj4uY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgY29vciA9IGRvbS5jaGlsZHJlbihcIi5jb29yZFwiKS52YWwoKTtcclxuICAgICAgICBsZXQgc2lkID0gZG9tLmF0dHIoXCJzaWRcIik7XHJcbiAgICAgICAgbGV0IGlkeCA9IGRvbS5hdHRyKFwiaWR4XCIpO1xyXG4gICAgICAgIGNvb3IgPSBjb29yLnNwbGl0KFwiLFwiKTtcclxuICAgICAgICBpZihjb29yWzFdKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhW3NpZF1baWR4XS5jb29yID0ge1xyXG4gICAgICAgICAgICAgICAgbGF0OmNvb3JbMF0qMSxcclxuICAgICAgICAgICAgICAgIGxuZzpjb29yWzFdKjFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KFwi6rSA6rSR7KeAIOyijO2RnOqwgCDsnoXroKXrkJjsl4jsirXri4jri6QuXCIpXHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhbGVydChcIuyijO2RnOqwgCDrtoDsoJXtmZXtlZjqsowg7J6F66Cl65CY7JeI7Iq164uI64ukLlwiKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlU3BvdDogZnVuY3Rpb24oaWR4KXtcclxuICAgICAgICBsZXQgc3BvdE5hbWUgPSAkKFwiLmNvb3Jfc3BvdFtpZHg9XCIraWR4K1wiXVwiKS5jaGlsZHJlbihcIi5jb29yX3Nwb3ROYW1lXCIpLmh0bWwoKVxyXG4gICAgICAgIGxldCBjb29yID0gJChcIi5jb29yX3Nwb3RbaWR4PVwiK2lkeCtcIl1cIikuY2hpbGRyZW4oXCIuY29vcmRcIikudmFsKClcclxuICAgICAgICBsZXQgY2l0eUNvZGUgPSAkKFwiaGVhZGVyPi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBjYW5JRGVsZXRlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmKGNvb3IubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBpZihjb25maXJtKHNwb3ROYW1lICsgXCIg7JeQIOyeheugpeuQnCDsooztkZzrj4Qg7IKs65287KeR64uI64ukLiDqtJzssK7sirXri4jquYw/XCIpKXtcclxuICAgICAgICAgICAgICAgIGNhbklEZWxldGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGNvbmZpcm0oc3BvdE5hbWUgKyBcIiDsoJXrs7Trpbwg7KCc6rGw7ZWp64uI64ukLiDqtJzssK7sirXri4jquYw/XCIpKXtcclxuICAgICAgICAgICAgICAgIGNhbklEZWxldGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNhbklEZWxldGUpe1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmdnW2lkeF07XHJcbiAgICAgICAgICAgICQoXCIuY29vcl9zcG90W2lkeD1cIitpZHgrXCJdXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlYXJjaFNwb3Qoc3BvdE5hbWUpe1xyXG4gICAgICAgIGxldCBjaXR5TmFtZSA9ICQoXCJoZWFkZXI+LmNpdHlOYW1lXCIpLmh0bWwoKTtcclxuICAgICAgICB3aW5kb3cub3BlbihcclxuICAgICAgICAgICAgJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jb20vc2VhcmNoP3E9JytjaXR5TmFtZStcIitcIitzcG90TmFtZSxcclxuICAgICAgICAgICAgJ19ibGFuaydcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICBzYXZlU3BvdERhdGEoc2lkKXtcclxuICAgICAgICBsZXQgY2l0eUNvZGUgPSAkKFwiaGVhZGVyPi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGlmKGNvbmZpcm0oXCLsp4DquIjquYzsp4DsnZgg7J6R7JeFIOuCtOyaqeydhCDsoIDsnqXtlaDquYzsmpQ/XCIpKXtcclxuICAgICAgICAgICAgbGV0IG5ld0FycmF5ID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kYXRhW3NpZF0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZGF0YVtzaWRdW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICBuZXdBcnJheS5wdXNoKHRoaXMuZGF0YVtzaWRdW2ldKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpdHlDb2RlK1wiL3Nwb3RzL1wiK3NpZCkuc2V0KG5ld0FycmF5KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlQXJyYXlOYXZlcihudkRhdGEpe1xyXG5cclxuICAgICAgICBsZXQgY2l0eUNvZGUgPSAkKFwiaGVhZGVyPi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG5cclxuICAgICAgICBpZihjb25maXJtKFwi67mg7KeEIOq0gOq0keyngOuTpOydhCDsgq3soJztlaDquYzsmpQ/XCIpKXtcclxuICAgICAgICAgICAgbGV0IG5ld052QXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudkRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKG52RGF0YVtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3TnZBcnJheS5wdXNoKG52RGF0YVtpXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKFwiLm5hdmVyQWN0aW9uIC5tYWluVHh0XCIpLmh0bWwoXCLrhKTsnbTrsoQg6rSA6rSR7KeA65Ok7J2EIOyerO2OuOyEse2WiOyKteuLiOuLpC5cIilcclxuICAgICAgICAgICAgJChcIi5uYXZlckFjdGlvbiAuaGludFR4dFwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAkKFwiLm5hdmVyQWN0aW9uIC5yaWdodFwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2l0eUNvZGUrXCIvc3BvdHMvbnZcIikuc2V0KG5ld052QXJyYXkpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB0b2FzdCh0eHQpe1xyXG4gICAgICAgIGlmKCQoXCIuc25hY2tiYXJcIikubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAkKFwiLnNuYWNrYmFyXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKFwiYm9keVwiKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJzbmFja2JhclwiPicrdHh0Kyc8L2Rpdj4nKTtcclxuICAgICAgICAkKFwiLnNuYWNrYmFyXCIpLmFkZENsYXNzKFwic2hvd1wiKTtcclxuICAgICAgICAkKFwiLnNuYWNrYmFyXCIpLmNzcyhcImFuaW1hdGlvblwiKVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChcIi5zbmFja2JhclwiKS5yZW1vdmVDbGFzcyhcInNob3dcIilcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBvc3RBY3Rpb247XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvcG9zdEFjdGlvbi5qcyIsImxldCBSYW5rID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oY2l0eUNvZGUpe1xyXG4gICAgICAgICQoXCIucG9zdEFjdGlvblwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuY29tYmluZVwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIucmFua0RpdlwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCJoZWFkZXI+Lm5hdj5wXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgJChcIi5zcG90X3JhbmtcIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoY2l0eUNvZGUrXCIvc3BvdHMvY29tYmluZWRcIikub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG5cclxuICAgICAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNvcnRBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgc2lkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcG90ID0gZGF0YVtzaWRdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluUmFuayA9IDIwMDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzaXRlIGluIHNwb3QucmFuaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRSYW5rID0gc3BvdC5yYW5rW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goaW5kUmFuayk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWluUmFuaz5pbmRSYW5rKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluUmFuayA9IGluZFJhbmtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gKDE4MCAtIG1pblJhbmspKk1hdGguc3FydChNYXRoLnNxcnQoYXJyYXkubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgLT0gYXJyYXlbaV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNjb3JlLT0gbWluUmFuayoxLjVcclxuICAgICAgICAgICAgICAgIGlmKGFycmF5Lmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgLT0gMTIwO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlIC09IG1pblJhbmtcclxuICAgICAgICAgICAgICAgICAgICBpZihzcG90LnJhbmsubnYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSs9NTA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoYXJyYXkubGVuZ3RoID09PSAzKXtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZSArPSAoMTYwIC0gbWluUmFuaylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGFycmF5Lmxlbmd0aCA9PT0gNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gMTYwXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc29ydEFycmF5LnB1c2goe3NpZDpzaWQsc2NvcmU6c2NvcmV9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzb3J0QXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhLnNjb3JlID4gYi5zY29yZSA/IC0xIDogYS5zY29yZSA8IGIuc2NvcmUgPyAxIDogMDtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc29ydEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2lkID0gc29ydEFycmF5W2ldLnNpZDtcclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW3NpZF0udXJsKXtcclxuICAgICAgICAgICAgICAgICAgICB1cmwgPSBkYXRhW3NpZF0udXJsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFua2luZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBnZzpcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG52OlwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbHA6XCJcIixcclxuICAgICAgICAgICAgICAgICAgICB0YTpcIlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzaXRlIGluIGRhdGFbc2lkXS5yYW5rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFua2luZ1tzaXRlXSA9IGRhdGFbc2lkXS5yYW5rW3NpdGVdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cInJlc3VsdF9ib3hcIiBpZD1cIicrc2lkKydcIj48cCBjbGFzcz1cInJlc3VsdF9yYW5rXCI+JysoaSsxKSsnPC9wPic7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSAnPGlucHV0IGNsYXNzPVwicmVzdWx0X25hbWVcIiB2YWx1ZT1cIicrZGF0YVtzaWRdLm5hbWUua28rXCItLVwiK2RhdGFbc2lkXS5uYW1lLmVuKydcIj4nXHJcbiAgICAgICAgICAgICAgICB0eHQrPSAnPGlucHV0IGNsYXNzPVwicmVzdWx0X3VybFwiIHZhbHVlPVwiJyt1cmwrJ1wiPic7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfZ2dcIj4nK3JhbmtpbmcuZ2crJzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X252XCI+JytyYW5raW5nLm52Kyc8L3A+JztcclxuICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInJlc3VsdF9scFwiPicrcmFua2luZy5scCsnPC9wPic7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfdGFcIj4nK3JhbmtpbmcudGErJzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X3NhdmUgc2F2ZV9zcG90XCI+7KCA7J6lPC9wPic7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfcmVtb3ZlIHJlbW92ZV9zcG90XCI+7IKt7KCcPC9wPjwvZGl2Pic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJChcIi5yZXN1bHRcIikuaHRtbCh0eHQpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmFuaztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9yYW5rLmpzIiwibGV0IFRhZyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGxldCB0YWdPYmogPSB7fTtcclxuICAgICAgICBsZXQgdGFnUmFua0FycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIHNpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKGRhdGFbc2lkXS50YWcpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhZ3MgPSBkYXRhW3NpZF0udGFnO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRhZ09ialt0YWdzW2ldXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ09ialt0YWdzW2ldXS5zY29yZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdPYmpbdGFnc1tpXV0uc3BvdC5wdXNoKGRhdGFbc2lkXS5uYW1lLmtvKVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdPYmpbdGFnc1tpXV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6IFtkYXRhW3NpZF0ubmFtZS5rb11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgdGFnIGluIHRhZ09iaikge1xyXG4gICAgICAgICAgICB0YWdSYW5rQXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOnRhZyxcclxuICAgICAgICAgICAgICAgIHNjb3JlOnRhZ09ialt0YWddLnNjb3JlLFxyXG4gICAgICAgICAgICAgICAgc3BvdDp0YWdPYmpbdGFnXS5zcG90XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhZ1JhbmtBcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5zY29yZSA+IGIuc2NvcmUgPyAtMSA6IGEuc2NvcmUgPCBiLnNjb3JlID8gMSA6IDA7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL3RhZy5qcyIsImxldCBEYXRhID0ge1xyXG4gICAgc3BvdE9iajoge30sXHJcbiAgICAvL+uPhOyLnOydmCDsoITssrQg7Iqk7YyfIOuNsOydtO2EsOulvCDrsJvslYTsmYAg7KeR7Ja064Sj64qU64ukLlxyXG4gICAgbWV0cm86IFtdLFxyXG4gICAgbWV0cm9PYmo6IHt9LFxyXG4gICAgbWV0cm9TY29yZTp7fSxcclxuICAgIGhvdGVsT2JqOnt9LFxyXG4gICAgYXJlYUFycmF5OltdLFxyXG4gICAgLy/rj4Tsi5zsnZgg7KCE7LK0IOuplO2KuOuhnCDrjbDsnbTthLDrpbwg67Cb7JWE7JmAIOuEo+uKlOuLpC4gQXJyYXkg7JWI7JeQ64qUIG9iamVjdOuhnCBjb29yKGxhdCwgbG5nIG9iaiksIGxpbmUoQXJyYXkpLCBuYW1l7J20IOuTpOyWtOyeiOuLpC5cclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAvL2NvbWJpbmVkIGRhdGHrpbwg67Cb7JWE7IScIOyekeyXheuTpOydhCDsi5zsnpHtlZzri6QuXHJcbiAgICAgICAgdGhpcy5zcG90T2JqID0gZGF0YS5zcG90cztcclxuXHJcbiAgICAgICAgdGhpcy5ob3RlbE9iaiA9IGRhdGEuaG90ZWxzO1xyXG4gICAgICAgIHRoaXMubWV0cm9PYmogPSBkYXRhLm1ldHJvO1xyXG4gICAgICAgIHRoaXMubWV0cm9TY29yZSA9IGRhdGEubWV0cm9MaW5lO1xyXG4gICAgICAgIHRoaXMuYXJlYUFycmF5ID0gZGF0YS5hcmVhO1xyXG4gICAgICAgIGxldCBjaXR5Q29kZSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5ob3RlbF9kYXRhKCk7XHJcbiAgICAgICAgdGhpcy5hcmVhKClcclxuXHJcbiAgICAgICAgLy8gdGhpcy5kYXRhX21ldHJvX3Byb2Nlc3MoKTtcclxuICAgICAgICAvL+uplO2KuOuhnCDsp5HslrTrhKPripQg7J6R7JeF7J2EIOyLpOyLnO2VnOuLpC5cclxuXHJcbiAgICAgICAgLy8gdGhpcy5kYXRhX2ZpbmRiZXN0TWV0cm8oKTtcclxuICAgICAgICAvL+uPhOyLnCDrgrQg7LWc6rOg7J2YIOuplO2KuOuhnOulvCDshKDsoJXtlZjsnpBcclxuICAgIH0sXHJcblxyXG4gICAgYXJlYTogZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmFyZWFBcnJheSlcclxuXHJcblxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmhvdGVsT2JqKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2VhcmNoSW5Qb2x5Z29uKGhpZCwgbWFwKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZWFyY2hJblBvbHlnb246IGZ1bmN0aW9uKGhpZCwgbWFwKXtcclxuICAgICAgICBsZXQgbGFiZWwgPSAwXHJcblxyXG4gICAgICAgIGxldCBjb29yID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLmhvdGVsT2JqW2hpZF0uY29vci5sYXQsIHRoaXMuaG90ZWxPYmpbaGlkXS5jb29yLmxuZylcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHBvbHlnb24gPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbih7XHJcbiAgICAgICAgICAgICAgICBwYXRoczogdGhpcy5hcmVhQXJyYXlbaV0uY29vclxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZihnb29nbGUubWFwcy5nZW9tZXRyeS5wb2x5LmNvbnRhaW5zTG9jYXRpb24oY29vciwgcG9seWdvbikpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbE9ialtoaWRdLmFyZWEgPSBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgaG90ZWxfZGF0YTogZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNwb3RPYmopXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ob3RlbE9iailcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1ldHJvT2JqKVxyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5ob3RlbE9iaikge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmhvdGVsT2JqW2hpZF07XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZGF0YV9maW5kYmVzdE1ldHJvOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBtZXRyb1JhbmtPYmogPSB7fTtcclxuICAgICAgICBsZXQgbWV0cm9SYW5rQXJyYXkgPSBbXTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNwb3RPYmopXHJcbiAgICAgICAgbGV0IHNwb3RSYW5rID0gMFxyXG4gICAgICAgIGZvciAodmFyIHNpZCBpbiB0aGlzLnNwb3RPYmopIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSB0aGlzLnNwb3RPYmpbc2lkXTtcclxuICAgICAgICAgICAgc3BvdFJhbmsrKztcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGxpbmUgaW4gc3BvdC5tZXRyb0luZm8pIHtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHNwb3QubWV0cm9JbmZvW2xpbmVdLmRpc3RhbmNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKG1ldHJvUmFua09ialtsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9SYW5rT2JqW2xpbmVdLnNjb3JlICs9ICgzMDAwIC0gZGlzdGFuY2UqMiAtIHNwb3RSYW5rKjMuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9SYW5rT2JqW2xpbmVdLnNwb3QucHVzaCh7bmFtZTogc3BvdC5uYW1lLmtvLCBkaXN0YW5jZTogZGlzdGFuY2V9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldHJvUmFua09ialtsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6ICgzMDAwIC0gZGlzdGFuY2UqMiAtIHNwb3RSYW5rKjMuNSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6W3tuYW1lOiBzcG90Lm5hbWUua28sIGRpc3RhbmNlOiBkaXN0YW5jZX1dXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBsaW5lIGluIG1ldHJvUmFua09iaikge1xyXG4gICAgICAgICAgICBtZXRyb1JhbmtPYmpbbGluZV0uc2NvcmUgPSBNYXRoLnJvdW5kKG1ldHJvUmFua09ialtsaW5lXS5zY29yZS8xMzgpLzEwXHJcbiAgICAgICAgICAgIC8vIFRPRE86IOychOydmCDqsJLsnYAgMeychOulvCAxMDDsnLzroZwg7ZWcIOyngOyImCDtmJXtg5zquLAg65WM66y47JeQIDEzOOydtOudvOuKlCDsiKvsnpDripQg64+E7Iuc7JeQIOunnuqyjCDrs4DtmJXtlbQg7JO46rKDXHJcbiAgICAgICAgICAgIG1ldHJvUmFua0FycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbGluZTpsaW5lLFxyXG4gICAgICAgICAgICAgICAgc2NvcmU6bWV0cm9SYW5rT2JqW2xpbmVdLnNjb3JlLFxyXG4gICAgICAgICAgICAgICAgc3BvdDptZXRyb1JhbmtPYmpbbGluZV0uc3BvdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWV0cm9SYW5rQXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuc2NvcmUgPiBiLnNjb3JlID8gLTEgOiBhLnNjb3JlIDwgYi5zY29yZSA/IDEgOiAwXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJueWMvbWV0cm9MaW5lXCIpLnNldChtZXRyb1JhbmtPYmopXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKG1ldHJvUmFua0FycmF5KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKG1ldHJvUmFua09iailcclxuICAgIH0sXHJcblxyXG4gICAgZGF0YV9tZXRyb19wcm9jZXNzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgY2l0eUNvZGUgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGNpdHlDb2RlK1wiL21ldHJvXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tZXRybyA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBzaWQgaW4gdGhpcy5zcG90T2JqKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IHRoaXMuc3BvdE9ialtzaWRdO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQubWV0cm9fcHJvY2Vzc19maW5kTWV0cm8oc2lkLCBzcG90LmNvb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYoc3BvdC5lbnRlcmFuY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BvdC5lbnRlcmFuY2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tZXRyb19wcm9jZXNzX2ZpbmRNZXRybyhzaWQsIHNwb3QuZW50ZXJhbmNlW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+yKpO2MnyDquLDrs7gg7JyE7LmY7JmAIGVudGVyYW5jZSDrqqjrkZDsl5Ag64yA7ZW0IOqwgOyepSDqsIDquYzsmrQg66mU7Yq466Gc66W8IOywvuuKlOuLpC5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihjaXR5Q29kZStcIi9zcG90cy9jb21iaW5lZFwiKS51cGRhdGUodGhpcy5zcG90T2JqKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihjaXR5Q29kZStcIi9ob3RlbHNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ob3RlbE9iaiA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoYXQuaG90ZWxPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmhvdGVsX3Byb2Nlc3NfZmluZE1ldHJvKGhpZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGF0LmhvdGVsT2JqKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwibnljL2hvdGVsc1wiKS5zZXQodGhhdC5ob3RlbE9iailcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGhvdGVsX3Byb2Nlc3NfZmluZE1ldHJvOiBmdW5jdGlvbihoaWQpe1xyXG4gICAgICAgIGxldCBob3RlbCA9IHRoaXMuaG90ZWxPYmpbaGlkXTtcclxuICAgICAgICBsZXQgY29vciA9IGhvdGVsLmNvb3JcclxuICAgICAgICBjb25zb2xlLmxvZyhjb29yKVxyXG5cclxuICAgICAgICBpZighaG90ZWwubWV0cm9JbmZvKXtcclxuICAgICAgICAgICAgaG90ZWwubWV0cm9JbmZvID0ge31cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLm1ldHJvLmxlbmd0aCA7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbWV0cm8gPSB0aGlzLm1ldHJvW2ldXHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gbWV0cm8ubmFtZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBsYXREaWYgPSBNYXRoLnBvdygoY29vci5sYXQgLSBtZXRyby5jb29yLmxhdCkqMTExMDM0LDIpO1xyXG4gICAgICAgICAgICBsZXQgbG5nRGlmID0gTWF0aC5wb3coKGNvb3IubG5nIC0gbWV0cm8uY29vci5sbmcpICogODUzOTcsIDIpO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDsnITrj4Qg6rK964+E7JeQIOuUsOuluCDrs7TsoJXqsJLsnYAg64+E7Iuc66eI64ukIOuLrOudvOyguOyVvCDtlZzri6QuXHJcbiAgICAgICAgICAgIGxldCBkaWYgPSBNYXRoLnJvdW5kKE1hdGguc3FydChsYXREaWYrbG5nRGlmKSlcclxuXHJcbiAgICAgICAgICAgIGlmKGRpZjw3MDApe1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogNzAw66+47YSw6rCAIOyggeygiO2VnCDqsbDrpqzsnbjsp4DripQg64W87J2Y6rCAIO2VhOyalO2VmOuLpC5cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1ldHJvLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWV0cm8ubGluZVtrXS5sZW5ndGggPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IOuJtOyalSDtlZzsoJUgLSDsnbXsiqTtlITroIjsiqQg65287J247J2EIOygnOqxsO2VmOq4sCDsnITtlZwg6rKDXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IG1ldHJvLmxpbmVba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v65287J2466qFXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5tZXRyb0luZm9bbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwubWV0cm9JbmZvW2xpbmVdLmRpc3RhbmNlID4gZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ydtOuvuCDsobTsnqztlaAg6rK97JqwIOyDiOuhnCDstpTqsIDtlZjroKTripQg7Jet7J20IOybkOuemOuztOuLpCDrjZQg6rCA6rmM7Jq0IOqyveyasOyXkOunjCDstpTqsIBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubWV0cm9JbmZvW2xpbmVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTogZGlmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IOyngOq4iOydgCBtZXRybyBBcnJheSDsiJzshJwg7J6Q7LK066W8IOy9lOuTnOuhnCDsgqzsmqntlZjqs6Ag7J6I64ukLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+y9lOuTnCDssrTqs4Trpbwg7Ja065a76rKMIOq1rOyEse2VoOyngCDsg53qsIHsnbQg7ZWE7JqU7ZWgIOqygy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubWV0cm9JbmZvW2xpbmVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2U6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1ldHJvX3Byb2Nlc3NfZmluZE1ldHJvOiBmdW5jdGlvbihzaWQsIGNvb3Ipe1xyXG4gICAgICAgIC8v7Iqk7YyfIOy9lOuTnOyZgCDsooztkZzrpbwg67Cb7JWE7Jio64ukLiDsooztkZzripQgZW50ZXJhbmNl7KKM7ZGcLCDsiqTtjJ8g7J6Q7LK0IOyijO2RnCDrkZAg7KKF66WY6rCAIOyeiOq4sCDrlYzrrLjsl5Ag65Sw66GcIOuwm+yVhOyYtC5cclxuICAgICAgICBsZXQgc3BvdCA9IHRoaXMuc3BvdE9ialtzaWRdO1xyXG5cclxuICAgICAgICBpZighc3BvdC5tZXRyb0luZm8pe1xyXG4gICAgICAgICAgICBzcG90Lm1ldHJvSW5mbyA9IHt9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy5tZXRyby5sZW5ndGggOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvID0gdGhpcy5tZXRyb1tpXVxyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IG1ldHJvLm5hbWU7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGF0RGlmID0gTWF0aC5wb3coKGNvb3IubGF0IC0gbWV0cm8uY29vci5sYXQpKjExMTAzNCwyKTtcclxuICAgICAgICAgICAgbGV0IGxuZ0RpZiA9IE1hdGgucG93KChjb29yLmxuZyAtIG1ldHJvLmNvb3IubG5nKSAqIDg1Mzk3LCAyKTtcclxuICAgICAgICAgICAgLy8gVE9ETzog7JyE64+EIOqyveuPhOyXkCDrlLDrpbgg67O07KCV6rCS7J2AIOuPhOyLnOuniOuLpCDri6zrnbzsoLjslbwg7ZWc64ukLlxyXG4gICAgICAgICAgICBsZXQgZGlmID0gTWF0aC5yb3VuZChNYXRoLnNxcnQobGF0RGlmK2xuZ0RpZikpXHJcblxyXG4gICAgICAgICAgICBpZihkaWY8NzAwKXtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IDcwMOuvuO2EsOqwgCDsoIHsoIjtlZwg6rGw66as7J247KeA64qUIOuFvOydmOqwgCDtlYTsmpTtlZjri6QuXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtZXRyby5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldHJvLmxpbmVba10ubGVuZ3RoID09PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiDribTsmpUg7ZWc7KCVIC0g7J217Iqk7ZSE66CI7IqkIOudvOyduOydhCDsoJzqsbDtlZjquLAg7JyE7ZWcIOqyg1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmUgPSBtZXRyby5saW5lW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+udvOyduOuqhVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BvdC5tZXRyb0luZm9bbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BvdC5tZXRyb0luZm9bbGluZV0uZGlzdGFuY2UgPiBkaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v7J2066+4IOyhtOyerO2VoCDqsr3smrAg7IOI66GcIOy2lOqwgO2VmOugpOuKlCDsl63snbQg7JuQ656Y67O064ukIOuNlCDqsIDquYzsmrQg6rK97Jqw7JeQ66eMIOy2lOqwgFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm1ldHJvSW5mb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2U6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiDsp4DquIjsnYAgbWV0cm8gQXJyYXkg7Iic7IScIOyekOyytOulvCDsvZTrk5zroZwg7IKs7Jqp7ZWY6rOgIOyeiOuLpC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/svZTrk5wg7LK06rOE66W8IOyWtOuWu+qyjCDqtazshLHtlaDsp4Ag7IOd6rCB7J20IO2VhOyalO2VoCDqsoMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubWV0cm9JbmZvW2xpbmVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2U6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhdGFcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9kYXRhLmpzIiwibGV0IFNhZmV0eSA9IHtcclxuICAgIGFyZWE6W10sXHJcblxyXG4gICAgYmFzaWM6e30sXHJcblxyXG4gICAgaG90ZWxzOnt9LFxyXG5cclxuICAgIGRhdGE6e1xyXG4gICAgICAgIGFyZWE6e30sXHJcbiAgICAgICAgc3BlY2lmaWM6e31cclxuICAgIH0sXHJcbiAgICBpbnRybzogW1xyXG4gICAgICAgIFtcIuydtCDsiJnshozripQgXCIsXCI87KeA7Jet66qFPlwiLFwiIOyXkCDsnITsuZjtlZjqs6Ag7J6I7Iq164uI64ukLiDsnbQg7KeA7Jet7J2AIFwiXSxcclxuICAgICAgICBbXCLsnbQg7IiZ7IaM6rCAIOychOy5mO2VnCBcIixcIjzsp4Dsl63rqoU+XCIsXCIo7J2AKeuKlFwiXVxyXG4gICAgXSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICB0aGlzLmhvdGVscyA9IGRhdGEuaG90ZWxzO1xyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiBkYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB0aGlzLnRlc3QoaGlkKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGVzdDogZnVuY3Rpb24oaGlkKXtcclxuICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmhvdGVsc1toaWRdXHJcblxyXG4gICAgICAgIGxldCBhcmVhID0gaG90ZWwuYXJlYTtcclxuXHJcbiAgICAgICAgbGV0IHJuZCA9IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG4gICAgICAgICAgICB2YXIgcmFuTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihtYXgtbWluKzEpKSArIG1pbjtcclxuICAgICAgICAgICAgcmV0dXJuIHJhbk51bTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzcG90TGlzdCA9IFtcIuyEvO2KuOuftCDtjIztgaxcIiwgXCLrqZTtirjroZztj7Trpqztg4Qg66+47Iig6rSAXCIsIFwi6rWs6rKQ7ZWY7J6EIOuvuOyIoOq0gFwiLCBcIuuhne2OoOufrCDshLzthLBcIl07XHJcbiAgICAgICAgbGV0IG1ldHJvU3RuID0gW1wiNjhzdCBTdGF0aW9uXCIsIFwiMzNzdCBTdGF0aW9uXCIsIFwiNXRoIGF2ZSBTdGF0aW9uXCIsIFwiQ2xhcmsgU3RcIiwgXCIxMDNzdFwiLCBcIkdhbGF4eSBTdGF0aW9uXCJdO1xyXG5cclxuICAgICAgICBsZXQgaG90ZWxEYXRhID0ge1xyXG4gICAgICAgICAgICBoYXNTcG90OmZhbHNlLFxyXG4gICAgICAgICAgICBzcG90OlwiXCIsXHJcbiAgICAgICAgICAgIHNwb3REaXN0YW5jZTowLFxyXG4gICAgICAgICAgICBuZWFyTWV0cm86ZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc3RhbmNlOjEwLFxyXG4gICAgICAgICAgICBtZXRyb1N0bjpcIlwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3BvdFJuZCA9IHJuZCgwLDYpXHJcblxyXG4gICAgICAgIGlmKHNwb3RSbmQgPCA0KXtcclxuICAgICAgICAgICAgaG90ZWxEYXRhLmhhc1Nwb3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBob3RlbERhdGEuc3BvdCA9IHNwb3RMaXN0W3Nwb3RSbmRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1ldHJvUm5kID0gcm5kKDAsNSk7XHJcbiAgICAgICAgaG90ZWxEYXRhLm1ldHJvU3RuID0gbWV0cm9TdG5bbWV0cm9SbmRdO1xyXG5cclxuICAgICAgICBsZXQgZGlzdGFuY2VSbmQgPSBybmQoMCw2KStybmQoMCw2KTtcclxuICAgICAgICBob3RlbERhdGEuZGlzdGFuY2UgPSBkaXN0YW5jZVJuZDtcclxuXHJcbiAgICAgICAgaWYoZGlzdGFuY2VSbmQ8Nil7XHJcbiAgICAgICAgICAgIGhvdGVsRGF0YS5uZWFyTWV0cm8gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHR4dCA9IFwiXCJcclxuXHJcbiAgICAgICAgbGV0IGludHJvUm5kID0gcm5kKDAsMSk7XHJcbiAgICAgICAgaWYoaW50cm9SbmQgPT09IDApe1xyXG4gICAgICAgICAgICB0eHQrPXRoaXMuYmFzaWMuaW50cm9bMF1bMF0rIFwiIFwiICsgYXJlYS5uYW1lICsgdGhpcy5iYXNpYy5pbnRyb1swXVsxXSsgXCIgXCI7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHR4dCs9dGhpcy5iYXNpYy5pbnRyb1sxXVswXSsgXCIgXCIgKyBhcmVhLm5hbWUgKyBhcmVhLmpvc2FbMF0rIFwiIFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IGFyZWEuaW50cm8ubGVuZ3RoXHJcblxyXG4gICAgICAgIGxldCBhcmVhSW50cm9SbmQgPSBybmQoMCxsZW5ndGgtMSk7XHJcbiAgICAgICAgdHh0Kz0gYXJlYS5pbnRyb1thcmVhSW50cm9SbmRdO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHNhZmV0eSA9IFwidW5zYWZlXCJcclxuXHJcbiAgICAgICAgaWYoYXJlYS5zY29yZT40KXtcclxuICAgICAgICAgICAgc2FmZXR5ID0gXCJzYWZlXCJcclxuICAgICAgICB9ZWxzZSBpZihhcmVhLnNjb3JlPjIpe1xyXG4gICAgICAgICAgICBzYWZldHkgPSBcIm5vcm1hbFwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgd29yZE9iaiA9IHRoaXMuZGF0YS5zcGVjaWZpY1tzYWZldHldO1xyXG5cclxuICAgICAgICBsZXQgc3BvdFR5cGVSbmQgPSBybmQoMCwxKVxyXG5cclxuICAgICAgICBpZihob3RlbERhdGEuaGFzU3BvdCl7XHJcbiAgICAgICAgICAgIGhvdGVsRGF0YS5zcG90RGlzdGFuY2UgPSBybmQoMiw1KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHNwb3RUeXBlUm5kID09PSAwKXtcclxuICAgICAgICAgICAgICAgIGxldCBmaXJzdCA9IHdvcmRPYmouc3BvdC50eXBlMS5maXJzdDtcclxuICAgICAgICAgICAgICAgIGxldCBmaXJzdFJuZCA9IHJuZCgwLGZpcnN0Lmxlbmd0aC0xKVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzZWNvbmQgPSB3b3JkT2JqLnNwb3QudHlwZTEuc2Vjb25kO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlY29uZFJuZCA9IHJuZCgwLHNlY29uZC5sZW5ndGgtMSlcclxuXHJcbiAgICAgICAgICAgICAgICB0eHQrPSBcIjxicj5cIisgZmlyc3RbZmlyc3RSbmRdICsgXCIgXCIgKyBzZWNvbmRbc2Vjb25kUm5kXVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBmaXJzdCA9IHdvcmRPYmouc3BvdC50eXBlMi5maXJzdDtcclxuICAgICAgICAgICAgICAgIGxldCBmaXJzdFJuZCA9IHJuZCgwLGZpcnN0Lmxlbmd0aC0xKVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzZWNvbmQgPSB3b3JkT2JqLnNwb3QudHlwZTIuc2Vjb25kO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlY29uZFJuZCA9IHJuZCgwLHNlY29uZC5sZW5ndGgtMSlcclxuXHJcbiAgICAgICAgICAgICAgICB0eHQrPSBcIjxicj5cIisgZmlyc3RbZmlyc3RSbmRdICsgXCIgXCIgKyBzZWNvbmRbc2Vjb25kUm5kXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQgPSB0eHQucmVwbGFjZShcIlvqtIDqtJHsp4BdXCIsaG90ZWxEYXRhLnNwb3QpO1xyXG4gICAgICAgICAgICB0eHQgPSB0eHQucmVwbGFjZShcIlvrtoRdXCIsaG90ZWxEYXRhLnNwb3REaXN0YW5jZStcIuu2hFwiKTtcclxuICAgICAgICAgICAgdHh0ID0gdHh0LnJlcGxhY2UoXCJb7KeA7JetXVwiLGFyZWEubmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHJhbnNUeXBlUm5kID0gcm5kKDAsMSk7XHJcblxyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0ID0ge31cclxuXHJcbiAgICAgICAgaWYoaG90ZWxEYXRhLm5lYXJNZXRybyl7XHJcbiAgICAgICAgICAgIGlmKGhvdGVsRGF0YS5oYXNTcG90KXtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IHdvcmRPYmoudHJhbnNpdC5uZWFyLmhhc1Nwb3Q7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gd29yZE9iai50cmFuc2l0Lm5lYXIubm9TcG90O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGhvdGVsRGF0YS5oYXNTcG90KXtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IHdvcmRPYmoudHJhbnNpdC5mYXIuaGFzU3BvdDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB3b3JkT2JqLnRyYW5zaXQuZmFyLm5vU3BvdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCd0eXBlMScgaW4gdGFyZ2V0KXtcclxuICAgICAgICAgICAgaWYodHJhbnNUeXBlUm5kID09PSAwKXtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC50eXBlMVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC50eXBlMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGZpcnN0ID0gdGFyZ2V0LmZpcnN0O1xyXG4gICAgICAgIGxldCB0Zmlyc3RSbmQgPSBybmQoMCx0Zmlyc3QubGVuZ3RoLTEpXHJcblxyXG4gICAgICAgIGxldCB0c2Vjb25kID0gdGFyZ2V0LnNlY29uZDtcclxuICAgICAgICBsZXQgdHNlY29uZFJuZCA9IHJuZCgwLHRzZWNvbmQubGVuZ3RoLTEpXHJcblxyXG4gICAgICAgIHR4dCs9IFwiPGJyPlwiKyB0Zmlyc3RbdGZpcnN0Um5kXSArIFwiIFwiICsgdHNlY29uZFt0c2Vjb25kUm5kXVxyXG5cclxuICAgICAgICB0eHQgPSB0eHQucmVwbGFjZShcIlvsl61dXCIsaG90ZWxEYXRhLm1ldHJvU3RuK1wiIOyXrVwiKTtcclxuICAgICAgICB0eHQgPSB0eHQucmVwbGFjZShcIlvrtoRdXCIsaG90ZWxEYXRhLmRpc3RhbmNlK1wi67aEXCIpO1xyXG5cclxuICAgICAgICAkKFwiLnRlc3RXb3JkXCIpLmh0bWwodHh0KVxyXG4gICAgfSxcclxuXHJcbiAgICBzYXZlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5pbnB1dEJveFwiKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGF0aCA9ICQoXCIuaW5wdXRCb3hcIikuZXEoaSkuYXR0cihcImlkXCIpLnNsaWNlKDQpLnNwbGl0KFwiX1wiKTtcclxuICAgICAgICAgICAgbGV0IGlucHV0QXJyYXkgPSAkKFwiLmlucHV0Qm94XCIpLmVxKGkpLmNoaWxkcmVuKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIGxldCB0eHRBcnJheSA9IFtdXHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5wdXRBcnJheS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoaW5wdXRBcnJheS5lcShqKS52YWwoKS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0QXJyYXkucHVzaChpbnB1dEFycmF5LmVxKGopLnZhbCgpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHBhdGgubGVuZ3RoID09PSA0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zcGVjaWZpY1twYXRoWzBdXVtwYXRoWzFdXVtwYXRoWzJdXVtwYXRoWzNdXSA9IHR4dEFycmF5XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHBhdGgubGVuZ3RoID09PSA1KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zcGVjaWZpY1twYXRoWzBdXVtwYXRoWzFdXVtwYXRoWzJdXVtwYXRoWzNdXVtwYXRoWzRdXSA9IHR4dEFycmF5XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNwZWNpZmljW3BhdGhbMF1dW3BhdGhbMV1dW3BhdGhbMl1dW3BhdGhbM11dW3BhdGhbNF1dW3BhdGhbNV1dID0gdHh0QXJyYXlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLnR4dF9zYWZldHlfYm94XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dEFycmF5ID0gJChcIi5zYWZldHlfYmFzaWNfYm94XCIpLmVxKGkpLmZpbmQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gJChcIi5zYWZldHlTY29yZVwiKS5lcShpKS52YWwoKSoxO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuYXJlYVtpXS5pbnRybyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuYXJlYVtpXS5zY29yZSA9IHNjb3JlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGlucHV0QXJyYXkubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGlucHV0QXJyYXkuZXEoaikudmFsKCkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5hcmVhW2ldLmludHJvLnB1c2goaW5wdXRBcnJheS5lcShqKS52YWwoKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJueWMvd29yZC9hcmVhXCIpLnNldCh0aGlzLmRhdGEuYXJlYSk7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJueWMvd29yZC9zcGVjaWZpY1wiKS5zZXQodGhpcy5kYXRhLnNwZWNpZmljKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdEFyZWE6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIHRoaXMuZGF0YS5hcmVhID0gZGF0YTtcclxuICAgICAgICBsZXQgdHh0X2ludHJvID0gXCJcIjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW50cm8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHh0X2ludHJvICs9ICc8ZGl2IGNsYXNzPVwidHh0X2ludHJvX2JveFwiPjxpbnB1dCBjbGFzcz1cInR4dF9pbnRyb1wiIHZhbHVlID0gXCInKyB0aGlzLmludHJvW2ldWzBdICsnXCI+JztcclxuICAgICAgICAgICAgdHh0X2ludHJvICs9ICc8cCBjbGFzcz1cInR4dF9pbnRyb1wiPiZsdDvsp4Dsl63rqoUmZ3Q7PC9wPic7XHJcbiAgICAgICAgICAgIHR4dF9pbnRybyArPSAnPGlucHV0IGNsYXNzPVwidHh0X2ludHJvXCIgdmFsdWUgPSBcIicrIHRoaXMuaW50cm9baV1bMl0gKydcIj48L2Rpdj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKFwiLm1haW4gLmludHJvXCIpLmh0bWwodHh0X2ludHJvKVxyXG5cclxuICAgICAgICBsZXQgdHh0X3NhZmV0eSA9IFwiXCI7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZGF0YS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICBsZXQgYXJlYSA9IGRhdGFba107XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIGlmKGFyZWEuc2NvcmUpe1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgPSBhcmVhLnNjb3JlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHRfc2FmZXR5ICs9ICc8ZGl2IGNsYXNzPVwidHh0X3NhZmV0eV9ib3hcIj48ZGl2IGNsYXNzPVwiYXJlYV9oZWFkZXJcIj48aW5wdXQgY2xhc3M9XCJzYWZldHlTY29yZVwiIHR5cGU9XCJudW1iZXJcIiB2YWx1ZT1cIicrc2NvcmUrJ1wiPidcclxuICAgICAgICAgICAgdHh0X3NhZmV0eSArPSAnPGg0IGNsYXNzPVwiYXJlYV9uYW1lXCI+JythcmVhLm5hbWUrJzwvaDQ+PGRpdiBjbGFzcz1cIndvcmRUZXN0XCIgYXJlYU5vID1cIicraysnXCI+7YWM7Iqk7Yq4PC9kaXY+PC9kaXY+J1xyXG4gICAgICAgICAgICB0eHRfc2FmZXR5ICs9ICc8ZGl2IGNsYXNzPVwiZGF0YVwiPjxkaXYgY2xhc3M9XCJzYWZldHlfYmFzaWNfYm94XCI+J1xyXG5cclxuICAgICAgICAgICAgaWYoYXJlYS5pbnRybyl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZWEuaW50cm8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHRfc2FmZXR5ICs9ICc8aW5wdXQgY2xhc3M9XCJ0eHRfYmFzaWNcIiB2YWx1ZSA9IFwiJysgYXJlYS5pbnRyb1tpXSArJ1wiIHBsYWNlaG9sZGVyPVwi7KeA7Jet7J2YIOq4sOuzuCDsuZjslYgg7ISk66qF7J2EIOyeheugpe2VtOyjvOyEuOyalFwiPidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHRfc2FmZXR5ICs9ICc8L2Rpdj48ZGl2IGNsYXNzPVwiYWRkX3NhZmV0eVwiPuq4sOuzuCDsm4zrlKkg7LaU6rCAPC9kaXY+J1xyXG5cclxuXHJcbiAgICAgICAgICAgIHR4dF9zYWZldHkgKz0gJzwvZGl2PjwvZGl2PidcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIubWFpbiAuc2FmZXR5X2FyZWFcIikuaHRtbCh0eHRfc2FmZXR5KVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0U3BlY2lmaWM6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIHRoaXMuZGF0YS5zcGVjaWZpYyA9IGRhdGE7XHJcbiAgICAgICAgZm9yICh2YXIgc2FmZXR5IGluIGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSBkYXRhW3NhZmV0eV0uc3BvdDtcclxuICAgICAgICAgICAgbGV0IHRyYW5zaXQgPSBkYXRhW3NhZmV0eV0udHJhbnNpdDtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHR5cGUgaW4gc3BvdCkge1xyXG4gICAgICAgICAgICAgICAgLy9zcG90IOybjOuUqSDtg4DsnoVcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG9yZGVyIGluIHNwb3RbdHlwZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd29yZEFycmF5ID0gc3BvdFt0eXBlXVtvcmRlcl07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR4dCA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmRBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8aW5wdXQgdmFsdWU9XCInK3dvcmRBcnJheVtpXSsnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2JveF9cIitzYWZldHkrXCJfc3BvdF9cIit0eXBlK1wiX1wiK29yZGVyKS5odG1sKHR4dClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgZGlzdGFuY2UgaW4gdHJhbnNpdCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaGFzU3BvdCBpbiB0cmFuc2l0W2Rpc3RhbmNlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0cmFuc2l0X3Nwb3QgPSB0cmFuc2l0W2Rpc3RhbmNlXVtoYXNTcG90XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCd0eXBlMScgaW4gdHJhbnNpdF9zcG90KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdHlwZSBpbiB0cmFuc2l0X3Nwb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG9yZGVyIGluIHRyYW5zaXRfc3BvdFt0eXBlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3b3JkQXJyYXkgPSB0cmFuc2l0X3Nwb3RbdHlwZV1bb3JkZXJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0eHQgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3JkQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPGlucHV0IHZhbHVlPVwiJyt3b3JkQXJyYXlbaV0rJ1wiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNib3hfXCIrc2FmZXR5K1wiX3RyYW5zaXRfXCIrZGlzdGFuY2UrXCJfXCIraGFzU3BvdCtcIl9cIit0eXBlK1wiX1wiK29yZGVyKS5odG1sKHR4dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBvcmRlciBpbiB0cmFuc2l0X3Nwb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3b3JkQXJyYXkgPSB0cmFuc2l0X3Nwb3Rbb3JkZXJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHR4dCA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPGlucHV0IHZhbHVlPVwiJyt3b3JkQXJyYXlbaV0rJ1wiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjYm94X1wiK3NhZmV0eStcIl90cmFuc2l0X1wiK2Rpc3RhbmNlK1wiX1wiK2hhc1Nwb3QrXCJfXCIrb3JkZXIpLmh0bWwodHh0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTYWZldHlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zYWZldHkuanMiXSwic291cmNlUm9vdCI6IiJ9