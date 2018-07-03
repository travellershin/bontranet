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


var _attend = __webpack_require__(1);

var _attend2 = _interopRequireDefault(_attend);

var _city = __webpack_require__(2);

var _city2 = _interopRequireDefault(_city);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uninflated = {
    attend: true,
    city: true
};

var u_i = {
    mail: "",
    name: "",
    grade: 0
};

$("#nav_attend").click(function () {
    $("header li").removeClass("--selected");
    $(this).addClass("--selected");
    $(".pages").addClass("displayNone");
    $(".pages.attend").removeClass("displayNone");
    if (uninflated.attend) {
        _attend2.default.init(u_i.mail, u_i.name, u_i.grade);
        uninflated.attend = false;
    }
});
$("#nav_city").click(function () {
    $("header li").removeClass("--selected");
    $(this).addClass("--selected");
    $(".pages").addClass("displayNone");
    $(".pages.city").removeClass("displayNone");
    if (uninflated.city) {
        _city2.default.init(u_i.mail, u_i.name, u_i.grade);
        uninflated.city = false;
    }
});

$(document).ready(function () {

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userMail = user.email.split('@')[0];
            firebase.database().ref("users").once("value", function (snap) {
                var userData = snap.val();
                if (userData[userMail]) {
                    if (userData[userMail].uid = user.uid) {
                        u_i.mail = userMail;
                        u_i.name = user.displayName;
                        u_i.grade = userData[userMail].grade * 1;
                        _attend2.default.init(u_i.mail, u_i.name, u_i.grade);
                        // City.init(u_i.mail, u_i.name, u_i.grade);
                        uninflated.attend = false;
                        login(u_i.name);
                    } else {
                        alert("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요");
                    }
                } else {
                    alert("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요");
                }
            });
            // User is signed in.
        } else {
            // No user is signed in.
            firebase.auth().signInWithPopup(provider).then(function (result) {
                user = result.user;
                var userMail = user.email.split('@')[0];
                firebase.database().ref("users").once("value", function (snap) {
                    var userData = snap.val();
                    if (userData[userMail]) {
                        if (userData[userMail].uid = user.uid) {
                            u_i.mail = userMail;
                            u_i.name = user.displayName;
                            u_i.grade = userData[userMail].grade * 1;
                            _attend2.default.init(u_i.mail, u_i.name, u_i.grade);
                            uninflated.attend = false;
                            login(u_i.name);
                        } else {
                            alert("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요");
                        }
                    } else {
                        alert("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요");
                    }
                });
                // ...
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        }
    });
});

function login(name) {
    $(".helloWorld").html(name[1] + "하!");
    $(".helloWorld").attr("title", name + "님 안녕하세요!");
    $(".helloWorld").click(function () {
        if (confirm(name + "님 로그아웃 하시겠습니까?")) {
            firebase.auth().signOut().then(function () {
                window.location.reload();
            }).catch(function (error) {
                // An error happened.
            });
        }
    });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Attend = {
    mobile: false,

    id: "",

    attendObj: {},

    weekdays: ["일", "월", "화", "수", "목", "금", "토", "일"],

    init: function init(id, name, grade) {
        var _this = this;

        var that = this;

        this.id = id;

        if (grade === 5) {
            $(".worker_selector").removeClass("displayNone");
            firebase.database().ref("users").once("value", function (snap) {
                $(".loadingView").addClass("displayNone");
                var users = snap.val();
                var txt = '';
                for (var mailID in users) {
                    txt += '<option value="' + mailID + '">' + mailID + '</option>';
                }
                $(".worker_selector").html(txt);
            });
        } else {
            firebase.database().ref("attend/" + this.id).on("value", function (snap) {
                $(".loadingView").addClass("displayNone");
                _this.attendObj = snap.val();
            });
            $('#calendar').fullCalendar({
                height: 552,
                firstDay: 1,
                viewRender: function viewRender(view, element) {
                    that.inflate_calendar(that.attendObj);
                }
            });
        }

        this.listener();
    },

    listener: function listener() {
        var that = this;

        $(".attendView_input").click(function () {
            that.inflate_input(that.attendObj);
        });
        $(".attendView_Show").click(function () {
            that.inflate_calendar(that.attendObj);
        });
    },

    inflate_calendar: function inflate_calendar(data) {
        $(".attendView_Show").addClass("selected");
        $(".attendView_input").removeClass("selected");
        $(".attend .input").addClass("displayNone");
        $(".calendarView").removeClass("displayNone");

        if (data.attend) {
            data = data.attend;
            for (var date in data) {
                var dateID = date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
                var dif = 0;
                for (var i = 0; i < data[date].length; i++) {
                    dif += data[date][i].dif;
                }
                var hour = Math.floor(dif / 60);
                var min = dif % 60;
                $('.fc-day[data-date="' + dateID + '"]').html(hour + "시간 " + min + "분");
            }
            var durMon = 0;

            for (var i = 0; i < $(".fc-day").length; i++) {
                var dateDom = $(".fc-day").eq(i);
                if (!dateDom.hasClass("fc-other-month")) {
                    var _date = dateDom.attr("data-date").split("-");
                    _date = _date[0] + _date[1] + _date[2];
                    if (data[_date]) {
                        for (var j = 0; j < data[_date].length; j++) {
                            durMon += data[_date][j].dif;
                        }
                    }
                }
            }
            var txt = $(".fc-left>h2").html();
            if (durMon > 0) {
                txt += ' (' + Math.floor(durMon / 60) + '시간 ' + durMon % 60 + '분)';
            }
            $(".fc-left>h2").html(txt);
        }
    },

    inflate_input: function inflate_input(data) {
        $(".attendView_Show").removeClass("selected");
        $(".attendView_input").addClass("selected");
        $(".attend .input").removeClass("displayNone");
        $(".calendarView").addClass("displayNone");

        var m = moment().day(-8);

        var pastWeek = '<p class="title pastTitle"></p><div class="weekPlan pastWeek clearfix">';
        var thisWeek = '<p class="title thisTitle"></p><div class="weekPlan thisWeek clearfix">';
        var nextWeek = '<p class="title nextTitle"></p><div class="weekPlan nextWeek clearfix">';

        var durData = {};
        var pastDur = 0;
        var thisDur = 0;
        var nextDur = 0;

        if (data.attend) {
            durData = data.attend;
        }

        for (var i = 0; i < 21; i++) {
            var _date2 = m.add(1, "days").format("MM-DD");
            var dateID = m.format("YYYYMMDD");
            var txt = '<div class="day"><p class="text"><span class="monthDay">' + _date2 + '</span>(' + this.weekdays[i % 7] + ')</p><div class="workHour" id="d_' + dateID + '"></div></div>';
            var dif = 0;

            if (durData[dateID]) {
                for (var j = 0; j < durData[dateID].length; j++) {
                    dif = durData[dateID][j].dif;
                }
            }

            if (i < 7) {
                pastWeek += txt;
                pastDur += dif;
            } else if (i < 14) {
                thisWeek += txt;
                thisDur += dif;
            } else {
                nextWeek += txt;
                nextDur += dif;
            }
        }
        pastWeek += '</div>';
        thisWeek += '</div>';
        nextWeek += '</div>';

        $(".attend .input").html(pastWeek + thisWeek + nextWeek);

        var that = this;
        $(".attend .input").on("click", ".workHour", function () {
            that.inputWorkHour($(this).attr("id"));
        });
        $(".pastTitle").html("지난주 근무 일정 (" + Math.floor(pastDur / 60) + "시간 " + pastDur % 60 + "분)");
        $(".thisTitle").html("이번주 근무 일정 (" + Math.floor(thisDur / 60) + "시간 " + thisDur % 60 + "분)");
        $(".nextTitle").html("다음주 근무 일정 (" + Math.floor(nextDur / 60) + "시간 " + nextDur % 60 + "분)");

        if (data.attend) {
            data = data.attend;
            for (var date in data) {
                var _txt = '';
                for (var i = 0; i < data[date].length; i++) {
                    var from = data[date][i].from;
                    var to = data[date][i].to;

                    _txt += '<p>' + from + " ~ " + to + '</p>';
                }
                $("#d_" + date).html(_txt);
            }
        }
    },

    inputWorkHour: function inputWorkHour(date) {
        // css: modules/attend.css
        if (!document.querySelector(".inputWindow")) {
            var inputWindow = '<div class="blackScreen"><div class="inputWindow">';
            inputWindow += '<p class="title">' + date.slice(6, 8) + "/" + date.slice(8) + ' 근무시간</p>';
            inputWindow += '<div class="line clearfix"><input id="first_from"><p class="word">부터</p><input id="first_to"><p class="word">까지</p></div>';
            inputWindow += '<div class="line clearfix"><input id="second_from"><p class="word">부터</p><input id="second_to"><p class="word">까지</p></div>';

            inputWindow += '<div class="bottom"><p class="confirm" id="' + date + '">확인</p><p class="close">취소</p></div></div></div>';

            $("body").append(inputWindow);

            if (this.mobile) {
                $(".inputWindow input").AnyPicker({
                    dateTimeFormat: "HH:mm"
                });
            }

            var that = this;
            $("body").on("click", ".confirm", function () {
                that.setWorkHour($(this).attr("id"));
                $(".inputWindow input").val("");
            });
            $("body").on("click", ".close", function () {
                $(".blackScreen").addClass("displayNone");
                $(".inputWindow input").val("");
            });
        } else {
            $(".blackScreen").removeClass("displayNone");
        }
    },

    setWorkHour: function setWorkHour(date) {
        var work = [];
        if ($("#first_from").val() < "23:59" && $("#first_from").val() > "08:00") {
            //시작시간이 잘 입력되었나 확인

            if (date < moment().format("MM-DD")) {
                //오늘 이전 일의 날짜를 다루고 있을 경우 - 근무 종료시간이 입력되지 않으면 안 됨
                if ($("#first_to").val() < "23:59" && $("#first_to").val() > "08:00") {} else {
                    alert("근무 종료시간을 HH:MM 형식으로 입력해주세요.");
                    return false;
                }
            } else {
                //이전일이 아니더라도 예상 근무시간이라도 입력해야 함
                if ($("#first_to").val() < "23:59" && $("#first_to").val() > "08:00") {} else {
                    alert("예상 근무 종료시간을 HH:MM 형식으로 입력해주세요.");
                    return false;
                }
            }
            var from = $("#first_from").val();
            var to = $("#first_to").val();

            var fromA = from.split(":");
            var toA = to.split(":");
            var dif = (toA[0] * 1 - fromA[0] * 1) * 60 + (toA[1] * 1 - fromA[1] * 1);

            work.push({
                from: from,
                to: to,
                dif: dif
            });
        } else {
            alert("근무시간이 잘못 입력되었습니다. HH:MM 형식으로 입력해주세요");
            return false;
        };

        if ($("#second_from").val().length > 0) {
            if ($("#second_from").val() < "23:59" && $("#second_from").val() > "08:00") {

                if (date < moment().format("MM-DD")) {
                    //오늘 이전 일의 날짜를 다루고 있을 경우 - 근무 종료시간이 입력되지 않으면 안 됨
                    if ($("#second_to").val() < "23:59" && $("#second_to").val() > "08:00") {} else {
                        alert("두 번째 근무의 근무 종료시간을 HH:MM 형식으로 입력해주세요.");
                        return false;
                    }
                } else {
                    //이전일이 아니더라도 예상 근무시간이라도 입력해야 함
                    if ($("#second_to").val() < "23:59" && $("#second_to").val() > "08:00") {} else {
                        alert("두 번째 근무의 예상 근무 종료시간을 HH:MM 형식으로 입력해주세요.");
                        return false;
                    }
                }

                var _from = $("#second_from").val();
                var _to = $("#second_to").val();

                var _fromA = _from.split(":");
                var _toA = _to.split(":");
                var _dif = (_toA[0] * 1 - _fromA[0] * 1) * 60 + (_toA[1] * 1 - _fromA[1] * 1);

                work.push({
                    from: _from,
                    to: _to,
                    dif: _dif
                });
            } else {
                alert("두 번째 근무의 근무시간이 잘못 입력되었습니다. HH:MM 형식으로 입력해주세요");
                return false;
            }
        }

        firebase.database().ref("attend/" + this.id + "/attend/" + date.slice(2)).set(work);
        $(".blackScreen").addClass("displayNone");
    },

    initInput: function initInput() {
        //근무시간 입력창을 초기화한다
    }
};

exports.default = Attend;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _spot = __webpack_require__(3);

var _spot2 = _interopRequireDefault(_spot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var City = {
    codeData: {},

    cityData: {},

    listener: function listener() {
        var that = this;

        $(".cityCodeView").on("click", ".spots", function () {
            var cid = $(this).parent().attr("id");
            var name = $(this).parent().children(".name").html();
            _spot2.default.init(that.cityData[cid], cid, name);
        });

        $(".header__return").click(function () {
            that.returnToCityView();
        });

        $(".spot .check").on("click", ".check__remainLargeData", function () {
            that.setRemainNumber($(this).parent().attr("id"), $(this).parent().children(".check__remainNumber").val());
        });
    },

    setRemainNumber: function setRemainNumber(site, number) {
        var city = $(".cityName").attr("id");
        var cutNo = number.trim() * 1;

        if (cutNo < 100) {
            toast("100개 이상의 장소를 유지해주세요");
        } else {
            if (confirm("순위 " + cutNo + "위 미만 장소를 모두 제거합니다. 맞습니까?")) {
                var cutObj = this.cityData[city].spots[site];
                cutObj.length = cutNo;

                firebase.database().ref("cities/" + city + "/spots/" + site).set(cutObj);
            }
        }
    },

    returnToCityView: function returnToCityView() {
        $(".cityCodeView").removeClass("displayNone");
        $(".city .spot").addClass("displayNone");
        $(".city .spot .check").html("");

        this.inflate_cityCodeView(this.codeData, this.cityData);
    },

    inflate_cityCodeView: function inflate_cityCodeView(codeData, data) {
        var txt = '<div class="line top"><p class="name">도시명</p><p class="hotels">숙소</p><p class="spots">관광지 정리</p><p class="area">지역</p><p class="price">물가</p></div>';
        for (var i = 0; i < codeData.length; i++) {
            var city = codeData[i];
            if (data[city.code]) {
                txt += '<div class="line" id="' + city.code + '"><p class="name">' + city.name + '</p>';

                if (data[city.code].hotels) {
                    txt += '<p class="hotels">O</p>';
                } else {
                    txt += '<p class="hotels">X</p>';
                }

                if (data[city.code].spots) {
                    var spot = data[city.code].spots;
                    if (spot.combined && !spot.combining) {
                        txt += '<p class="spots">1차 자료정리 완료</p>';
                    } else if (spot.combining) {
                        txt += '<p class="spots">데이터 합치기 작업중</p>';
                    } else {
                        txt += '<p class="spots">데이터 수집, 검증중</p>';
                    }
                }

                if (data[city.code].area) {
                    txt += '<p class="area">O</p>';
                } else {
                    txt += '<p class="area">X</p>';
                }

                if (data[city.code].price) {
                    txt += '<p class="price">O</p>';
                } else {
                    txt += '<p class="price">X</p>';
                }

                txt += '</div>';
            } else {
                txt += '<div class="line" id="' + city.code + '"><p class="name nodata">' + city.name + '</p>';
                txt += '<p class="hotels">X</p><p class="spots">데이터 없음</p><p class="area">X</p><p class="price">X</p></div>';
            }
        }

        $(".cityCodeView").html(txt);
    },

    init: function init(id, name, grade) {
        var _this = this;

        var that = this;
        this.listener();

        firebase.database().ref().once("value", function (snap) {
            $(".loadingView").addClass("displayNone");
            var codeData = snap.val().setting.cities;
            var data = snap.val().cities;
            _this.cityData = data;
            _this.codeData = codeData;
            _this.inflate_cityCodeView(codeData, data);
        });
    }
};

exports.default = City;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _manualCombine = __webpack_require__(4);

var _manualCombine2 = _interopRequireDefault(_manualCombine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spot = {

    data: {},

    listener: function listener() {
        var that = this;

        $(".spot .check").on("click", ".check__confirm", function () {
            that.inputCoordinate($(this).parent().attr("id"), $(this).parent().children(".check__spotCoor").val());
        });

        $(".spot .check").on("click", ".check__spotDelete", function () {
            that.deleteSpot($(this).parent().attr("id"), $(this).parent().children(".check__spotName").html());
        });
    },

    init: function init(data, cid, name) {
        this.listener();
        this.data = data;

        $(".cityCodeView").addClass("displayNone");
        $(".city .spot").removeClass("displayNone");
        $(".cityName").html(name).attr("id", cid);

        if (data.spots.combined && !data.spots.combining) {
            console.log("1차 자료정리 완료");
            //combined가 있고 combining이 없으면 1차 자료정리 완료라는 뜻
        } else if (data.spots.combining) {
            console.log("합치기 작업중");
            //combining이 있으면 합치기 작업중이라는 뜻
            _manualCombine2.default.init(data.spots);
        } else {
            this.firstCheck(data.spots); //combining, combined가 없으면 데이터 수집, 검증중이라는 뜻
            //firstcheck를 통과하면 this.autoCombine을 통해 data.spots.combining이 만들어짐
        }
    },

    autoCombine__spotRestructure: function autoCombine__spotRestructure() {
        var city = $(".cityName").attr("id");
        var siteArr = ["gg", "lp", "nv", "ta"];
        var combining = {};
        var counter = 0;
        var data = this.data.spots;

        for (var j = 0; j < siteArr.length; j++) {
            var site = siteArr[j];
            if (data[site]) {
                if (data[site].noData) {} else {

                    for (var i = 0; i < data[site].length; i++) {
                        if (data[site][i]) {
                            var oldSpot = data[site][i];
                            //기존 정보를 oldSpot이라고 하자. 새로운 스팟정보에는 이름을 한/영으로 분할하고 랭킹을 부여할 것이다.

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
                                combining["s00" + counter] = spot;
                            } else if (counter < 100) {
                                combining["s0" + counter] = spot;
                            } else {
                                combining["s" + counter] = spot;
                            }
                            counter++;
                        }
                    } //한바퀴 돌았당
                }
            }
        }

        this.autoCombine__combine(combining);
    },

    autoCombine__combine: function autoCombine__combine(combining) {
        // TODO: 끝나면 합치기 작업 화면 inflate하기

        var city = $(".cityName").attr("id");

        var combineObj = {};
        var combined = {};

        for (var code in combining) {
            var spot = combining[code];
            combineObj[code] = spot;
            combineObj[code].combine = {};
            var hasCombined = false;
            //합칠 것이 없으면 바로 combined 쪽으로 보낸다.

            for (var tCode in combining) {
                if (code < tCode) {
                    var tSpot = {};
                    for (var key in combining[tCode]) {
                        tSpot[key] = combining[tCode][key];
                    }

                    var dif = calculateDif(spot.coor, tSpot.coor);

                    if (dif < 250) {
                        combineObj[code].combine[tCode] = tSpot;
                        hasCombined = true;
                    }
                }
            }

            if (!hasCombined) {
                combined[code] = combineObj[code];
                delete combineObj[code];
            }
        }

        firebase.database().ref("cities/" + city + "/spots").set({
            combining: combineObj,
            combined: combined
        });

        _manualCombine2.default.init({
            combining: combineObj,
            combined: combined
        });
    },

    deleteSpot: function deleteSpot(sid, name) {
        var city = $(".cityName").attr("id");
        var site = sid.split("_")[0];
        var no = sid.split("_")[1];

        if (confirm(name + " 장소를 제거합니다. 계속할까요?")) {
            firebase.database().ref("cities/" + city + "/spots/" + site + "/" + no).set({ deleted: true });
            $("#" + sid).remove();
            toast("장소가 제거되었습니다.");
        }
    },

    inputCoordinate: function inputCoordinate(sid, coorTxt) {
        var city = $(".cityName").attr("id");
        var site = sid.split("_")[0];
        var no = sid.split("_")[1];
        var coor = {};

        if (coorTxt.split(",").length === 2) {
            var lat = coorTxt.split(",")[0].trim() * 1;
            var lng = coorTxt.split(",")[1].trim() * 1;

            if (isNaN(lat) || isNaN(lng)) {
                //좌표 중 하나가
                toast("좌표가 부정확하게 입력되었습니다");
            } else {
                coor = {
                    lat: lat,
                    lng: lng
                };
                toast("좌표가 입력되었습니다");
                $("#" + sid).remove();
                firebase.database().ref("cities/" + city + "/spots/" + site + "/" + no + "/coor").set(coor);
            }
        } else {
            toast("좌표가 부정확하게 입력되었습니다");
        }
    },

    firstCheck: function firstCheck(data) {

        $(".header__status").html("데이터 검증중");
        var hasProblem = false;
        var txt = '';
        var searchUrl = 'https://www.google.co.kr/maps/place/' + $(".cityName").html() + "+";

        var siteObj = {
            gg: "구글",
            nv: "네이버",
            ta: "트립어드바이저",
            lp: "론리플래닛"
        };

        for (var site in siteObj) {
            var siteHasProblem = false;
            var noCoor = false;
            var noCoorTxt = '<p class="check__subTitle">좌표가 입력되지 않은 관광지가 있습니다</p>';
            var noSpot = false;
            var noSpotTxt = '<p class="check__subTitle">비어있는 관광지가 있습니다</p>';

            if (data[site]) {
                txt += '<p class="check__title">' + siteObj[site] + ' 데이터 확인</p>';
                for (var i = 0; i < data[site].length; i++) {
                    var spot = data[site][i];
                    if (spot) {
                        var hasCoor = true;
                        if (spot.deleted) {
                            //일부러 삭제한 관광지 -> 넘어간다
                        } else {
                            if (spot.coor) {
                                if (spot.coor.lng) {
                                    if (isNaN(spot.coor.lng * 1)) {
                                        hasCoor = false;
                                    }
                                } else {
                                    hasCoor = false;
                                }

                                if (spot.coor.lat) {
                                    if (isNaN(spot.coor.lat * 1)) {
                                        hasCoor = false;
                                    }
                                } else {
                                    hasCoor = false;
                                }
                            } else {
                                hasCoor = false;
                            }

                            if (!hasCoor) {
                                noCoorTxt += '<div class="check__line" id="' + site + '_' + i + '">';
                                noCoorTxt += '<a class="check__spotName" href="' + searchUrl + spot.name + '" target="_blank">' + spot.name + '</a>';
                                noCoorTxt += '<input class="check__spotCoor" placeholder="xx.xxxxx, xx.xxxxx 형태 입력">';
                                noCoorTxt += '<p class="check__confirm">좌표 입력</p><p class="check__spotDelete">장소 삭제</p>';
                                noCoorTxt += '</div>';
                                hasProblem = true;
                                siteHasProblem = true;
                                noCoor = true;
                            }
                        }
                    } else {
                        noSpotTxt += '<div class="check__line" id="' + site + '_' + i + '">';
                        noSpotTxt += '<p class="check__txt">' + i + ' 번 관광지</p>';
                        noSpotTxt += '<p class="check__spotDelete">장소 삭제</p>';
                        noSpotTxt += '</div>';
                        hasProblem = true;
                        siteHasProblem = true;
                        noSpot = true;
                    }
                }

                if (noCoor) {
                    txt += noCoorTxt;
                }
                if (noSpot) {
                    txt += noSpotTxt;
                }

                if (data[site].length > 150) {
                    var largeOK = true;
                    if (data.largeData) {
                        if (data.largeData[site]) {
                            //150개 이상의 데이터를 보유하려면 도시명/spots/largeData/사이트명이 true라고 부여되어야 함
                        } else {
                            largeOK = false;
                        }
                    } else {
                        largeOK = false;
                    }

                    if (!largeOK) {
                        hasProblem = true;
                        siteHasProblem = true;
                        txt += '<p class="check__subTitle">' + siteObj[site] + ' 장소 데이터가 150개를 초과(' + data[site].length + '개)합니다.</p>';
                        txt += '<div class="check__line" id="' + site + '">';
                        txt += '<input class="check__remainNumber" value="' + data[site].length + '">';
                        txt += '<p class="check__remainLargeData">개의 장소 유지하기</p>';
                        txt += '</div>';
                    }
                }
            } else {
                txt += '<p class="check__title">' + siteObj[site] + ' 데이터가 존재하지 않습니다.</p>';
                hasProblem = true;
                siteHasProblem = true;

                // TODO: 원래 사이트 데이터가 존재하지 않는 경우를 대비한 버튼을 만들고 site 값으로 nodata: true를 넣어준다.
            }
            if (!siteHasProblem) {
                txt += '<p class="check__subTitle">발견된 문제가 없습니다</p>';
            }
        }

        if (hasProblem) {
            txt += '<p class="check__finish">검사를 모두 마쳤습니다</p>';
            $(".spot .check").html(txt);
        } else {
            toast("발견된 문제가 없어 데이터 병합을 실시합니다.");
            this.autoCombine__spotRestructure();
        }
    }
};

exports.default = Spot;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var ManualCombine = {
    map: {},
    marker: {
        prime: {},
        target: []
    },
    data: {},
    remain: 0,

    listener: function listener() {
        var that = this;

        $(".combine__target").on("click", ".combine__target__div", function () {
            $(this).children(".combine__target__check").toggleClass("combine__target__checked");
        });

        $(".combine__main").on("click", ".combine__nextStep", function () {
            that.nextStep();
        });
    },

    nextStep: function nextStep() {
        var city = $(".cityName").attr("id");

        var mainData = this.data.combining[$(".combine__main").attr("id")];

        for (var i = 0; i < $(".combine__target__checked").length; i++) {
            var tid = $(".combine__target__checked").eq(i).attr("sid");
            var targetData = mainData.combine[tid];

            //합쳐질 대상의 rank를 maindData의 rank로 통합하는 작업
            for (var site in targetData.rank) {
                if (mainData.rank[site]) {
                    if (mainData.rank[site] > targetData.rank[site]) {
                        mainData.rank[site] = targetData.rank[site];
                    }
                } else {
                    mainData.rank[site] = targetData.rank[site];
                }
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

            delete this.data.combining[tid];
        }
        mainData.name.ko = $("#name_ko").val();
        mainData.name.en = $("#name_en").val();

        delete mainData.combine;

        this.data.combined[$(".combine__main").attr("id")] = this.data.combining[$(".combine__main").attr("id")];
        delete this.data.combining[$(".combine__main").attr("id")];

        firebase.database().ref("cities/" + city + "/spots").update(this.data);

        this.remain--;
        if (this.remain > 0) {
            this.inflate();
        } else {
            console.log("작업완료!");
            // TODO: 작업완료했으면 데이터정리 들어가기
        }
    },

    init: function init(data) {
        this.data = data;

        var that = this;

        $(".spot__page").addClass("displayNone");
        $(".spot__page.combine").removeClass("displayNone");
        $(".header__status").html("관광지 합치기");

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.74844, lng: -73.98566 },
            zoom: 17,
            mapTypeControl: false,
            scaleControl: true,
            fullscreenControl: false
        });

        this.map.addListener('click', function (e) {
            that.chooseCoordinate(e);
        });

        this.inflate();
        this.listener();
    },

    chooseCoordinate: function chooseCoordinate(e) {
        $(".combine__coordinate").html(e.latLng.lat() + "," + e.latLng.lng());

        this.marker.prime.setMap(null);
        this.marker.prime = new google.maps.Marker({
            position: e.latLng,
            map: this.map
        });
    },

    inflate: function inflate() {
        var data = this.data.combining;
        var txt = '';
        //기존에 찍혀있던 마커를 제거한다

        var keys = Object.keys(data);
        this.remain = keys.length;
        var spot = data[keys[0]];
        $(".combine__main").attr("id", keys[0]);

        console.log(spot);
        //이름 관련 정보 표시
        if (spot.name.ko.length > 0) {
            txt += '<p class="combine__name__prime">기준 장소명: ' + spot.name.ko + '</p>';
        } else {
            txt += '<p class="combine__name__prime">기준 장소명: ' + spot.name.en + '</p>';
        }
        txt += '<div class="combine__prime">';
        txt += '<div class="combine__prime__left">';
        txt += '<div class="combine__line">';
        txt += '<p class="combine__subTitle">한글명</p>';
        txt += '<input class="combine__input" id="name_ko" value="' + spot.name.ko + '">';
        txt += '</div>';
        txt += '<div class="combine__line">';
        txt += '<p class="combine__subTitle">영문명</p>';
        txt += '<input class="combine__input" id="name_en" value="' + spot.name.en + '">';
        txt += '</div>';
        txt += '</div>';
        txt += '<p class="combine__nextStep">다음</p>';
        txt += '</div>';

        //좌표 관련 정보 표시
        spot.coor.lat = spot.coor.lat * 1;
        spot.coor.lng = spot.coor.lng * 1;
        this.marker.prime = new google.maps.Marker({
            position: spot.coor,
            map: this.map
        });
        this.map.panTo(spot.coor);
        txt += '<div class="combine__line">';
        txt += '<p class="combine__subTitle">좌표';
        txt += '<p class="combine__coordinate">' + spot.coor.lat + "," + spot.coor.lng + '</p>';
        txt += '</div>';

        $(".combine__main").html(txt);

        txt = '';
        var idx = 0;

        for (var sid in spot.combine) {
            idx++;
            var tSpot = spot.combine[sid];

            var latlng = {
                lat: tSpot.coor.lat * 1,
                lng: tSpot.coor.lng * 1
            };
            var tMarker = new google.maps.Marker({
                position: latlng,
                map: this.map,
                label: idx.toString()
            });
            this.marker.target.push(tMarker);

            //본명으로 한글명 영어명이 없을 경우를 체크해서 넣어준다.
            if ($("#name_ko").val().length === 0) {
                $("#name_ko").val(tSpot.name.ko);
            }
            if ($("#name_en").val().length === 0) {
                $("#name_en").val(tSpot.name.en);
            }

            txt += '<div class="combine__target__div">';
            txt += '<p class="combine__target__number">' + idx + '</p>';
            txt += '<div class="combine__target__check" sid="' + sid + '"></div>';
            txt += '<p class="combine__target__name">' + tSpot.name.ko + " " + tSpot.name.en + '</p>';
            txt += '</div>';
        }

        $(".combine__target").html(txt);
    }
};

exports.default = ManualCombine;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmNmMDdiNTcxZTI2ZDJlZTgwMzQiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hdHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9tYW51YWxDb21iaW5lLmpzIl0sIm5hbWVzIjpbInVuaW5mbGF0ZWQiLCJhdHRlbmQiLCJjaXR5IiwidV9pIiwibWFpbCIsIm5hbWUiLCJncmFkZSIsIiQiLCJjbGljayIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJpbml0IiwiZG9jdW1lbnQiLCJyZWFkeSIsInByb3ZpZGVyIiwiZmlyZWJhc2UiLCJhdXRoIiwiR29vZ2xlQXV0aFByb3ZpZGVyIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwidXNlciIsInVzZXJNYWlsIiwiZW1haWwiLCJzcGxpdCIsImRhdGFiYXNlIiwicmVmIiwib25jZSIsInVzZXJEYXRhIiwic25hcCIsInZhbCIsInVpZCIsImRpc3BsYXlOYW1lIiwibG9naW4iLCJhbGVydCIsInNpZ25JbldpdGhQb3B1cCIsInRoZW4iLCJyZXN1bHQiLCJjYXRjaCIsImVycm9yIiwiZXJyb3JDb2RlIiwiY29kZSIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjcmVkZW50aWFsIiwiaHRtbCIsImF0dHIiLCJjb25maXJtIiwic2lnbk91dCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiQXR0ZW5kIiwibW9iaWxlIiwiaWQiLCJhdHRlbmRPYmoiLCJ3ZWVrZGF5cyIsInRoYXQiLCJ1c2VycyIsInR4dCIsIm1haWxJRCIsIm9uIiwiZnVsbENhbGVuZGFyIiwiaGVpZ2h0IiwiZmlyc3REYXkiLCJ2aWV3UmVuZGVyIiwidmlldyIsImVsZW1lbnQiLCJpbmZsYXRlX2NhbGVuZGFyIiwibGlzdGVuZXIiLCJpbmZsYXRlX2lucHV0IiwiZGF0YSIsImRhdGUiLCJkYXRlSUQiLCJzbGljZSIsImRpZiIsImkiLCJsZW5ndGgiLCJob3VyIiwiTWF0aCIsImZsb29yIiwibWluIiwiZHVyTW9uIiwiZGF0ZURvbSIsImVxIiwiaGFzQ2xhc3MiLCJqIiwibSIsIm1vbWVudCIsImRheSIsInBhc3RXZWVrIiwidGhpc1dlZWsiLCJuZXh0V2VlayIsImR1ckRhdGEiLCJwYXN0RHVyIiwidGhpc0R1ciIsIm5leHREdXIiLCJhZGQiLCJmb3JtYXQiLCJpbnB1dFdvcmtIb3VyIiwiZnJvbSIsInRvIiwicXVlcnlTZWxlY3RvciIsImlucHV0V2luZG93IiwiYXBwZW5kIiwiQW55UGlja2VyIiwiZGF0ZVRpbWVGb3JtYXQiLCJzZXRXb3JrSG91ciIsIndvcmsiLCJmcm9tQSIsInRvQSIsInB1c2giLCJzZXQiLCJpbml0SW5wdXQiLCJDaXR5IiwiY29kZURhdGEiLCJjaXR5RGF0YSIsImNpZCIsInBhcmVudCIsImNoaWxkcmVuIiwicmV0dXJuVG9DaXR5VmlldyIsInNldFJlbWFpbk51bWJlciIsInNpdGUiLCJudW1iZXIiLCJjdXRObyIsInRyaW0iLCJ0b2FzdCIsImN1dE9iaiIsInNwb3RzIiwiaW5mbGF0ZV9jaXR5Q29kZVZpZXciLCJob3RlbHMiLCJzcG90IiwiY29tYmluZWQiLCJjb21iaW5pbmciLCJhcmVhIiwicHJpY2UiLCJzZXR0aW5nIiwiY2l0aWVzIiwiU3BvdCIsImlucHV0Q29vcmRpbmF0ZSIsImRlbGV0ZVNwb3QiLCJjb25zb2xlIiwibG9nIiwiZmlyc3RDaGVjayIsImF1dG9Db21iaW5lX19zcG90UmVzdHJ1Y3R1cmUiLCJzaXRlQXJyIiwiY291bnRlciIsIm5vRGF0YSIsIm9sZFNwb3QiLCJrbyIsImVuIiwiY29vciIsInJhbmsiLCJ0ZXN0IiwidXJsIiwidGFnIiwiYXV0b0NvbWJpbmVfX2NvbWJpbmUiLCJjb21iaW5lT2JqIiwiY29tYmluZSIsImhhc0NvbWJpbmVkIiwidENvZGUiLCJ0U3BvdCIsImtleSIsImNhbGN1bGF0ZURpZiIsInNpZCIsIm5vIiwiZGVsZXRlZCIsInJlbW92ZSIsImNvb3JUeHQiLCJsYXQiLCJsbmciLCJpc05hTiIsImhhc1Byb2JsZW0iLCJzZWFyY2hVcmwiLCJzaXRlT2JqIiwiZ2ciLCJudiIsInRhIiwibHAiLCJzaXRlSGFzUHJvYmxlbSIsIm5vQ29vciIsIm5vQ29vclR4dCIsIm5vU3BvdCIsIm5vU3BvdFR4dCIsImhhc0Nvb3IiLCJsYXJnZU9LIiwibGFyZ2VEYXRhIiwiTWFudWFsQ29tYmluZSIsIm1hcCIsIm1hcmtlciIsInByaW1lIiwidGFyZ2V0IiwicmVtYWluIiwidG9nZ2xlQ2xhc3MiLCJuZXh0U3RlcCIsIm1haW5EYXRhIiwidGlkIiwidGFyZ2V0RGF0YSIsImluY2x1ZGVzIiwidXBkYXRlIiwiaW5mbGF0ZSIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJnZXRFbGVtZW50QnlJZCIsImNlbnRlciIsInpvb20iLCJtYXBUeXBlQ29udHJvbCIsInNjYWxlQ29udHJvbCIsImZ1bGxzY3JlZW5Db250cm9sIiwiYWRkTGlzdGVuZXIiLCJlIiwiY2hvb3NlQ29vcmRpbmF0ZSIsImxhdExuZyIsInNldE1hcCIsIk1hcmtlciIsInBvc2l0aW9uIiwia2V5cyIsIk9iamVjdCIsInBhblRvIiwiaWR4IiwibGF0bG5nIiwidE1hcmtlciIsImxhYmVsIiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtB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LEdBQXNEWSxNQUFNMUosSUFBTixDQUFXK0ksRUFBakUsR0FBb0UsTUFBNUU7QUFDQTNGLG1CQUFLLFFBQUw7QUFDSDs7QUFFRGxELFVBQUUsa0JBQUYsRUFBc0JvQyxJQUF0QixDQUEyQmMsR0FBM0I7QUFDSDtBQXRNZSxDQUFwQjs7a0JBeU1lZ0ksYSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDZjZjA3YjU3MWUyNmQyZWU4MDM0IiwiaW1wb3J0IEF0dGVuZCBmcm9tIFwiLi9tb2R1bGVzL2F0dGVuZC5qc1wiO1xyXG5pbXBvcnQgQ2l0eSBmcm9tIFwiLi9tb2R1bGVzL2NpdHkuanNcIjtcclxuXHJcbmxldCB1bmluZmxhdGVkID0ge1xyXG4gICAgYXR0ZW5kOnRydWUsXHJcbiAgICBjaXR5OnRydWVcclxufVxyXG5cclxubGV0IHVfaSA9IHtcclxuICAgIG1haWw6XCJcIixcclxuICAgIG5hbWU6XCJcIixcclxuICAgIGdyYWRlOjBcclxufVxyXG5cclxuJChcIiNuYXZfYXR0ZW5kXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiaGVhZGVyIGxpXCIpLnJlbW92ZUNsYXNzKFwiLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5wYWdlcy5hdHRlbmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgaWYodW5pbmZsYXRlZC5hdHRlbmQpe1xyXG4gICAgICAgIEF0dGVuZC5pbml0KHVfaS5tYWlsLCB1X2kubmFtZSwgdV9pLmdyYWRlKTtcclxuICAgICAgICB1bmluZmxhdGVkLmF0dGVuZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59KVxyXG4kKFwiI25hdl9jaXR5XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiaGVhZGVyIGxpXCIpLnJlbW92ZUNsYXNzKFwiLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5wYWdlcy5jaXR5XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgIGlmKHVuaW5mbGF0ZWQuY2l0eSl7XHJcbiAgICAgICAgQ2l0eS5pbml0KHVfaS5tYWlsLCB1X2kubmFtZSwgdV9pLmdyYWRlKTtcclxuICAgICAgICB1bmluZmxhdGVkLmNpdHkgPSBmYWxzZTtcclxuICAgIH1cclxufSlcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgdmFyIHByb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uKHVzZXIpIHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgIGxldCB1c2VyTWFpbCA9IHVzZXIuZW1haWwuc3BsaXQoJ0AnKVswXVxyXG4gICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgbGV0IHVzZXJEYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICBpZih1c2VyRGF0YVt1c2VyTWFpbF0pe1xyXG4gICAgICAgICAgICAgICAgICBpZih1c2VyRGF0YVt1c2VyTWFpbF0udWlkID0gdXNlci51aWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdV9pLm1haWwgPSB1c2VyTWFpbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHVfaS5uYW1lID0gdXNlci5kaXNwbGF5TmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgIHVfaS5ncmFkZSA9IHVzZXJEYXRhW3VzZXJNYWlsXS5ncmFkZSoxXHJcbiAgICAgICAgICAgICAgICAgICAgICBBdHRlbmQuaW5pdCh1X2kubWFpbCwgdV9pLm5hbWUsIHVfaS5ncmFkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBDaXR5LmluaXQodV9pLm1haWwsIHVfaS5uYW1lLCB1X2kuZ3JhZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdW5pbmZsYXRlZC5hdHRlbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgIGxvZ2luKHVfaS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAvLyBVc2VyIGlzIHNpZ25lZCBpbi5cclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gTm8gdXNlciBpcyBzaWduZWQgaW4uXHJcbiAgICAgICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhQb3B1cChwcm92aWRlcikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgdXNlciA9IHJlc3VsdC51c2VyO1xyXG4gICAgICAgICAgICBsZXQgdXNlck1haWwgPSB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlckRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYodXNlckRhdGFbdXNlck1haWxdKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih1c2VyRGF0YVt1c2VyTWFpbF0udWlkID0gdXNlci51aWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1X2kubWFpbCA9IHVzZXJNYWlsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1X2kubmFtZSA9IHVzZXIuZGlzcGxheU5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVfaS5ncmFkZSA9IHVzZXJEYXRhW3VzZXJNYWlsXS5ncmFkZSoxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dGVuZC5pbml0KHVfaS5tYWlsLCB1X2kubmFtZSwgdV9pLmdyYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pbmZsYXRlZC5hdHRlbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9naW4odV9pLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAvLyAuLi5cclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgLy8gSGFuZGxlIEVycm9ycyBoZXJlLlxyXG4gICAgICAgICAgdmFyIGVycm9yQ29kZSA9IGVycm9yLmNvZGU7XHJcbiAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgIC8vIFRoZSBlbWFpbCBvZiB0aGUgdXNlcidzIGFjY291bnQgdXNlZC5cclxuICAgICAgICAgIHZhciBlbWFpbCA9IGVycm9yLmVtYWlsO1xyXG4gICAgICAgICAgLy8gVGhlIGZpcmViYXNlLmF1dGguQXV0aENyZWRlbnRpYWwgdHlwZSB0aGF0IHdhcyB1c2VkLlxyXG4gICAgICAgICAgdmFyIGNyZWRlbnRpYWwgPSBlcnJvci5jcmVkZW50aWFsO1xyXG4gICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSlcclxuXHJcbmZ1bmN0aW9uIGxvZ2luKG5hbWUpe1xyXG4gICAgJChcIi5oZWxsb1dvcmxkXCIpLmh0bWwobmFtZVsxXStcIu2VmCFcIik7XHJcbiAgICAkKFwiLmhlbGxvV29ybGRcIikuYXR0cihcInRpdGxlXCIsbmFtZStcIuuLmCDslYjrhZXtlZjshLjsmpQhXCIpO1xyXG4gICAgJChcIi5oZWxsb1dvcmxkXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoY29uZmlybShuYW1lK1wi64uYIOuhnOq3uOyVhOybgyDtlZjsi5zqsqDsirXri4jquYw/XCIpKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgIC8vIEFuIGVycm9yIGhhcHBlbmVkLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL2luZGV4LmpzIiwidmFyIEF0dGVuZCA9IHtcclxuICAgIG1vYmlsZTogZmFsc2UsXHJcblxyXG4gICAgaWQ6IFwiXCIsXHJcblxyXG4gICAgYXR0ZW5kT2JqOiB7fSxcclxuXHJcbiAgICB3ZWVrZGF5czogW1wi7J28XCIsIFwi7JuUXCIsIFwi7ZmUXCIsIFwi7IiYXCIsIFwi66qpXCIsIFwi6riIXCIsIFwi7YagXCIsIFwi7J28XCJdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGlkLCBuYW1lLCBncmFkZSl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcblxyXG4gICAgICAgIGlmKGdyYWRlID09PSA1KXtcclxuICAgICAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgICAgICQoXCIubG9hZGluZ1ZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJzID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbWFpbElEIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8b3B0aW9uIHZhbHVlPVwiJyttYWlsSUQrJ1wiPicrbWFpbElEKyc8L29wdGlvbj4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmdWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0ZW5kT2JqID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNTUyLFxyXG4gICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5hdHRlbmRWaWV3X2lucHV0XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9pbnB1dCh0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiLmF0dGVuZFZpZXdfU2hvd1wiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfY2FsZW5kYXI6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICQoXCIuYXR0ZW5kVmlld19TaG93XCIpLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgJChcIi5hdHRlbmRWaWV3X2lucHV0XCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgJChcIi5hdHRlbmQgLmlucHV0XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5jYWxlbmRhclZpZXdcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICAgICAgaWYoZGF0YS5hdHRlbmQpe1xyXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5hdHRlbmRcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF0ZSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZUlEID0gZGF0ZS5zbGljZSgwLDQpK1wiLVwiK2RhdGUuc2xpY2UoNCw2KStcIi1cIitkYXRlLnNsaWNlKDYsOCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gMFxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW2RhdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlmICs9IGRhdGFbZGF0ZV1baV0uZGlmXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgaG91ciA9IE1hdGguZmxvb3IoZGlmLzYwKTtcclxuICAgICAgICAgICAgICAgIGxldCBtaW4gPSBkaWYlNjA7XHJcbiAgICAgICAgICAgICAgICAkKCcuZmMtZGF5W2RhdGEtZGF0ZT1cIicrZGF0ZUlEKydcIl0nKS5odG1sKGhvdXIrXCLsi5zqsIQgXCIrbWluK1wi67aEXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGR1ck1vbiA9IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuZmMtZGF5XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZURvbSA9ICQoXCIuZmMtZGF5XCIpLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgaWYoIWRhdGVEb20uaGFzQ2xhc3MoXCJmYy1vdGhlci1tb250aFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBkYXRlRG9tLmF0dHIoXCJkYXRhLWRhdGVcIikuc3BsaXQoXCItXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGVbMF0rZGF0ZVsxXStkYXRlWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbZGF0ZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1ck1vbiArPSBkYXRhW2RhdGVdW2pdLmRpZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0eHQgPSAkKFwiLmZjLWxlZnQ+aDJcIikuaHRtbCgpO1xyXG4gICAgICAgICAgICBpZihkdXJNb24+MCl7XHJcbiAgICAgICAgICAgICAgICB0eHQrPScgKCcrTWF0aC5mbG9vcihkdXJNb24vNjApKyfsi5zqsIQgJytkdXJNb24lNjArJ+u2hCknXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJChcIi5mYy1sZWZ0PmgyXCIpLmh0bWwodHh0KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9pbnB1dDogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5hdHRlbmRWaWV3X1Nob3dcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAkKFwiLmF0dGVuZFZpZXdfaW5wdXRcIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAkKFwiLmF0dGVuZCAuaW5wdXRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmNhbGVuZGFyVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICAgICB2YXIgbSA9IG1vbWVudCgpLmRheSgtOCk7XHJcblxyXG4gICAgICAgIHZhciBwYXN0V2VlayA9ICc8cCBjbGFzcz1cInRpdGxlIHBhc3RUaXRsZVwiPjwvcD48ZGl2IGNsYXNzPVwid2Vla1BsYW4gcGFzdFdlZWsgY2xlYXJmaXhcIj4nO1xyXG4gICAgICAgIHZhciB0aGlzV2VlayA9ICc8cCBjbGFzcz1cInRpdGxlIHRoaXNUaXRsZVwiPjwvcD48ZGl2IGNsYXNzPVwid2Vla1BsYW4gdGhpc1dlZWsgY2xlYXJmaXhcIj4nO1xyXG4gICAgICAgIHZhciBuZXh0V2VlayA9ICc8cCBjbGFzcz1cInRpdGxlIG5leHRUaXRsZVwiPjwvcD48ZGl2IGNsYXNzPVwid2Vla1BsYW4gbmV4dFdlZWsgY2xlYXJmaXhcIj4nO1xyXG5cclxuICAgICAgICBsZXQgZHVyRGF0YSA9IHt9XHJcbiAgICAgICAgbGV0IHBhc3REdXIgPSAwO1xyXG4gICAgICAgIGxldCB0aGlzRHVyID0gMDtcclxuICAgICAgICBsZXQgbmV4dER1ciA9IDA7XHJcblxyXG4gICAgICAgIGlmKGRhdGEuYXR0ZW5kKXtcclxuICAgICAgICAgICAgZHVyRGF0YSA9IGRhdGEuYXR0ZW5kXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDIxOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRhdGUgPSAgbS5hZGQoMSwgXCJkYXlzXCIpLmZvcm1hdChcIk1NLUREXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0ZUlEID0gbS5mb3JtYXQoXCJZWVlZTU1ERFwiKTtcclxuICAgICAgICAgICAgbGV0IHR4dCA9ICc8ZGl2IGNsYXNzPVwiZGF5XCI+PHAgY2xhc3M9XCJ0ZXh0XCI+PHNwYW4gY2xhc3M9XCJtb250aERheVwiPicrZGF0ZSsnPC9zcGFuPignK3RoaXMud2Vla2RheXNbaSU3XSsnKTwvcD48ZGl2IGNsYXNzPVwid29ya0hvdXJcIiBpZD1cImRfJytkYXRlSUQrJ1wiPjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgICAgIGxldCBkaWYgPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYoZHVyRGF0YVtkYXRlSURdKXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZHVyRGF0YVtkYXRlSURdLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlmID0gZHVyRGF0YVtkYXRlSURdW2pdLmRpZlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihpPDcpe1xyXG4gICAgICAgICAgICAgICAgcGFzdFdlZWsgKz0gdHh0O1xyXG4gICAgICAgICAgICAgICAgcGFzdER1ciArPSBkaWZcclxuICAgICAgICAgICAgfWVsc2UgaWYoaTwxNCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzV2VlayArPSB0eHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzRHVyICs9IGRpZlxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG5leHRXZWVrICs9IHR4dDtcclxuICAgICAgICAgICAgICAgIG5leHREdXIgKz0gZGlmXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcGFzdFdlZWsrPSAnPC9kaXY+JztcclxuICAgICAgICB0aGlzV2Vlays9ICc8L2Rpdj4nO1xyXG4gICAgICAgIG5leHRXZWVrKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIuYXR0ZW5kIC5pbnB1dFwiKS5odG1sKHBhc3RXZWVrK3RoaXNXZWVrK25leHRXZWVrKTtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICQoXCIuYXR0ZW5kIC5pbnB1dFwiKS5vbihcImNsaWNrXCIsIFwiLndvcmtIb3VyXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuaW5wdXRXb3JrSG91cigkKHRoaXMpLmF0dHIoXCJpZFwiKSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiLnBhc3RUaXRsZVwiKS5odG1sKFwi7KeA64Kc7KO8IOq3vOustCDsnbzsoJUgKFwiK01hdGguZmxvb3IocGFzdER1ci82MCkrXCLsi5zqsIQgXCIrcGFzdER1ciU2MCtcIuu2hClcIilcclxuICAgICAgICAkKFwiLnRoaXNUaXRsZVwiKS5odG1sKFwi7J2067KI7KO8IOq3vOustCDsnbzsoJUgKFwiK01hdGguZmxvb3IodGhpc0R1ci82MCkrXCLsi5zqsIQgXCIrdGhpc0R1ciU2MCtcIuu2hClcIilcclxuICAgICAgICAkKFwiLm5leHRUaXRsZVwiKS5odG1sKFwi64uk7J2M7KO8IOq3vOustCDsnbzsoJUgKFwiK01hdGguZmxvb3IobmV4dER1ci82MCkrXCLsi5zqsIQgXCIrbmV4dER1ciU2MCtcIuu2hClcIilcclxuXHJcblxyXG4gICAgICAgIGlmKGRhdGEuYXR0ZW5kKXtcclxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuYXR0ZW5kXHJcbiAgICAgICAgICAgIGZvciAodmFyIGRhdGUgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IGRhdGFbZGF0ZV1baV0uZnJvbTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG8gPSBkYXRhW2RhdGVdW2ldLnRvO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwPicrZnJvbStcIiB+IFwiK3RvKyc8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJChcIiNkX1wiK2RhdGUpLmh0bWwodHh0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dFdvcmtIb3VyOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAvLyBjc3M6IG1vZHVsZXMvYXR0ZW5kLmNzc1xyXG4gICAgICAgIGlmKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmlucHV0V2luZG93XCIpKXtcclxuICAgICAgICAgICAgbGV0IGlucHV0V2luZG93ID0gJzxkaXYgY2xhc3M9XCJibGFja1NjcmVlblwiPjxkaXYgY2xhc3M9XCJpbnB1dFdpbmRvd1wiPic7XHJcbiAgICAgICAgICAgIGlucHV0V2luZG93Kz0gJzxwIGNsYXNzPVwidGl0bGVcIj4nK2RhdGUuc2xpY2UoNiw4KStcIi9cIitkYXRlLnNsaWNlKDgpKycg6re866y07Iuc6rCEPC9wPidcclxuICAgICAgICAgICAgaW5wdXRXaW5kb3crPSAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj48aW5wdXQgaWQ9XCJmaXJzdF9mcm9tXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cImZpcnN0X3RvXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPjwvZGl2PidcclxuICAgICAgICAgICAgaW5wdXRXaW5kb3crPSAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj48aW5wdXQgaWQ9XCJzZWNvbmRfZnJvbVwiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJzZWNvbmRfdG9cIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+PC9kaXY+J1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlucHV0V2luZG93ICs9ICc8ZGl2IGNsYXNzPVwiYm90dG9tXCI+PHAgY2xhc3M9XCJjb25maXJtXCIgaWQ9XCInK2RhdGUrJ1wiPu2ZleyduDwvcD48cCBjbGFzcz1cImNsb3NlXCI+7Leo7IaMPC9wPjwvZGl2PjwvZGl2PjwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hcHBlbmQoaW5wdXRXaW5kb3cpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5tb2JpbGUpe1xyXG4gICAgICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5BbnlQaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lRm9ybWF0OlwiSEg6bW1cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmNvbmZpcm1cIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJCh0aGlzKS5hdHRyKFwiaWRcIikpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2xvc2VcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICQoXCIuYmxhY2tTY3JlZW5cIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKFwiLmJsYWNrU2NyZWVuXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2V0V29ya0hvdXI6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgIGxldCB3b3JrID0gW11cclxuICAgICAgICBpZigkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuICAgICAgICAgICAgLy/si5zsnpHsi5zqsITsnbQg7J6YIOyeheugpeuQmOyXiOuCmCDtmZXsnbhcclxuXHJcbiAgICAgICAgICAgIGlmKGRhdGU8bW9tZW50KCkuZm9ybWF0KFwiTU0tRERcIikpe1xyXG4gICAgICAgICAgICAgICAgLy/smKTripgg7J207KCEIOydvOydmCDrgqDsp5zrpbwg64uk66Oo6rOgIOyeiOydhCDqsr3smrAgLSDqt7zrrLQg7KKF66OM7Iuc6rCE7J20IOyeheugpeuQmOyngCDslYrsnLzrqbQg7JWIIOuQqFxyXG4gICAgICAgICAgICAgICAgaWYoJChcIiNmaXJzdF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgIGlmKCQoXCIjZmlyc3RfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLsmIjsg4Eg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZnJvbSA9ICQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKVxyXG4gICAgICAgICAgICBsZXQgdG8gPSAkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpXHJcblxyXG4gICAgICAgICAgICBsZXQgZnJvbUEgPSBmcm9tLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSlcclxuXHJcblxyXG4gICAgICAgICAgICB3b3JrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgIGRpZjogZGlmXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhbGVydChcIuq3vOustOyLnOqwhOydtCDsnpjrqrsg7J6F66Cl65CY7JeI7Iq164uI64ukLiBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0ZTxtb21lbnQoKS5mb3JtYXQoXCJNTS1ERFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/smKTripgg7J207KCEIOydvOydmCDrgqDsp5zrpbwg64uk66Oo6rOgIOyeiOydhCDqsr3smrAgLSDqt7zrrLQg7KKF66OM7Iuc6rCE7J20IOyeheugpeuQmOyngCDslYrsnLzrqbQg7JWIIOuQqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI3NlY29uZF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOyYiOyDgSDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb20gPSAkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpXHJcbiAgICAgICAgICAgICAgICBsZXQgdG8gPSAkKFwiI3NlY29uZF90b1wiKS52YWwoKVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmcm9tQSA9IGZyb20uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAodG9BWzBdKjEgLSBmcm9tQVswXSoxKSo2MCArICh0b0FbMV0qMSAtIGZyb21BWzFdKjEpXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgICAgICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLTsi5zqsITsnbQg7J6Y66q7IOyeheugpeuQmOyXiOyKteuLiOuLpC4gSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCtcIi9hdHRlbmQvXCIrZGF0ZS5zbGljZSgyKSkuc2V0KHdvcmspO1xyXG4gICAgICAgICQoXCIuYmxhY2tTY3JlZW5cIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRJbnB1dDogZnVuY3Rpb24oKXtcclxuICAgICAgICAvL+q3vOustOyLnOqwhCDsnoXroKXssL3snYQg7LSI6riw7ZmU7ZWc64ukXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF0dGVuZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hdHRlbmQuanMiLCJpbXBvcnQgU3BvdCBmcm9tIFwiLi9jaXR5L3Nwb3QuanNcIjtcclxuXHJcbmxldCBDaXR5ID0ge1xyXG4gICAgY29kZURhdGE6IHt9LFxyXG5cclxuICAgIGNpdHlEYXRhOiB7fSxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLm9uKFwiY2xpY2tcIiwgXCIuc3BvdHNcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGNpZCA9ICQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpXHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5uYW1lXCIpLmh0bWwoKTtcclxuICAgICAgICAgICAgU3BvdC5pbml0KHRoYXQuY2l0eURhdGFbY2lkXSwgY2lkLCBuYW1lKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLmhlYWRlcl9fcmV0dXJuXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQucmV0dXJuVG9DaXR5VmlldygpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCIuc3BvdCAuY2hlY2tcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fcmVtYWluTGFyZ2VEYXRhXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0UmVtYWluTnVtYmVyKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19yZW1haW5OdW1iZXJcIikudmFsKCkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFJlbWFpbk51bWJlcjogZnVuY3Rpb24oc2l0ZSwgbnVtYmVyKXtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG4gICAgICAgIGxldCBjdXRObyA9IG51bWJlci50cmltKCkqMTtcclxuXHJcbiAgICAgICAgaWYoY3V0Tm88MTAwKXtcclxuICAgICAgICAgICAgdG9hc3QoXCIxMDDqsJwg7J207IOB7J2YIOyepeyGjOulvCDsnKDsp4DtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGNvbmZpcm0oXCLsiJzsnIQgXCIrIGN1dE5vICsgXCLsnIQg66+466eMIOyepeyGjOulvCDrqqjrkZAg7KCc6rGw7ZWp64uI64ukLiDrp57sirXri4jquYw/XCIpKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXRPYmogPSB0aGlzLmNpdHlEYXRhW2NpdHldLnNwb3RzW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgY3V0T2JqLmxlbmd0aCA9IGN1dE5vO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlKS5zZXQoY3V0T2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIHJldHVyblRvQ2l0eVZpZXc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJChcIi5jaXR5Q29kZVZpZXdcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmNpdHkgLnNwb3RcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmNpdHkgLnNwb3QgLmNoZWNrXCIpLmh0bWwoXCJcIilcclxuXHJcbiAgICAgICAgdGhpcy5pbmZsYXRlX2NpdHlDb2RlVmlldyh0aGlzLmNvZGVEYXRhLCB0aGlzLmNpdHlEYXRhKVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgaW5mbGF0ZV9jaXR5Q29kZVZpZXc6IGZ1bmN0aW9uKGNvZGVEYXRhLGRhdGEpe1xyXG4gICAgICAgIGxldCB0eHQgPSAnPGRpdiBjbGFzcz1cImxpbmUgdG9wXCI+PHAgY2xhc3M9XCJuYW1lXCI+64+E7Iuc66qFPC9wPjxwIGNsYXNzPVwiaG90ZWxzXCI+7IiZ7IaMPC9wPjxwIGNsYXNzPVwic3BvdHNcIj7qtIDqtJHsp4Ag7KCV66asPC9wPjxwIGNsYXNzPVwiYXJlYVwiPuyngOyXrTwvcD48cCBjbGFzcz1cInByaWNlXCI+66y86rCAPC9wPjwvZGl2PidcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvZGVEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaXR5ID0gY29kZURhdGFbaV07XHJcbiAgICAgICAgICAgIGlmKGRhdGFbY2l0eS5jb2RlXSl7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwibGluZVwiIGlkPVwiJytjaXR5LmNvZGUrJ1wiPjxwIGNsYXNzPVwibmFtZVwiPicrY2l0eS5uYW1lKyc8L3A+J1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbY2l0eS5jb2RlXS5ob3RlbHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cImhvdGVsc1wiPk88L3A+J1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwiaG90ZWxzXCI+WDwvcD4nXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVtjaXR5LmNvZGVdLnNwb3RzKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IGRhdGFbY2l0eS5jb2RlXS5zcG90c1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwb3QuY29tYmluZWQmJiFzcG90LmNvbWJpbmluZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInNwb3RzXCI+MeywqCDsnpDro4zsoJXrpqwg7JmE66OMPC9wPidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihzcG90LmNvbWJpbmluZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInNwb3RzXCI+642w7J207YSwIO2Vqey5mOq4sCDsnpHsl4XspJE8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJzcG90c1wiPuuNsOydtO2EsCDsiJjsp5EsIOqygOymneykkTwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbY2l0eS5jb2RlXS5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJhcmVhXCI+TzwvcD4nXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJhcmVhXCI+WDwvcD4nXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVtjaXR5LmNvZGVdLnByaWNlKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJwcmljZVwiPk88L3A+J1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicHJpY2VcIj5YPC9wPidcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0eHQrPSAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwibGluZVwiIGlkPVwiJytjaXR5LmNvZGUrJ1wiPjxwIGNsYXNzPVwibmFtZSBub2RhdGFcIj4nK2NpdHkubmFtZSsnPC9wPidcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJob3RlbHNcIj5YPC9wPjxwIGNsYXNzPVwic3BvdHNcIj7rjbDsnbTthLAg7JeG7J2MPC9wPjxwIGNsYXNzPVwiYXJlYVwiPlg8L3A+PHAgY2xhc3M9XCJwcmljZVwiPlg8L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5odG1sKHR4dClcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGlkLCBuYW1lLCBncmFkZSl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgJChcIi5sb2FkaW5nVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICAgICAgICAgIGxldCBjb2RlRGF0YSA9IHNuYXAudmFsKCkuc2V0dGluZy5jaXRpZXM7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKS5jaXRpZXNcclxuICAgICAgICAgICAgdGhpcy5jaXR5RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuY29kZURhdGEgPSBjb2RlRGF0YTtcclxuICAgICAgICAgICAgdGhpcy5pbmZsYXRlX2NpdHlDb2RlVmlldyhjb2RlRGF0YSwgZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaXR5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkuanMiLCJpbXBvcnQgTWFudWFsQ29tYmluZSBmcm9tIFwiLi9tYW51YWxDb21iaW5lLmpzXCI7XHJcblxyXG5sZXQgU3BvdCA9IHtcclxuXHJcbiAgICBkYXRhOnt9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19jb25maXJtXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuaW5wdXRDb29yZGluYXRlKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19zcG90Q29vclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19zcG90RGVsZXRlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsZXRlU3BvdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fc3BvdE5hbWVcIikuaHRtbCgpKTtcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEsIGNpZCwgbmFtZSl7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5jaXR5IC5zcG90XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5jaXR5TmFtZVwiKS5odG1sKG5hbWUpLmF0dHIoXCJpZFwiLCBjaWQpO1xyXG5cclxuICAgICAgICBpZihkYXRhLnNwb3RzLmNvbWJpbmVkICYmICFkYXRhLnNwb3RzLmNvbWJpbmluZyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiMeywqCDsnpDro4zsoJXrpqwg7JmE66OMXCIpXHJcbiAgICAgICAgICAgIC8vY29tYmluZWTqsIAg7J6I6rOgIGNvbWJpbmluZ+ydtCDsl4bsnLzrqbQgMeywqCDsnpDro4zsoJXrpqwg7JmE66OM652864qUIOucu1xyXG5cclxuICAgICAgICB9ZWxzZSBpZiAoZGF0YS5zcG90cy5jb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLtlansuZjquLAg7J6R7JeF7KSRXCIpXHJcbiAgICAgICAgICAgIC8vY29tYmluaW5n7J20IOyeiOycvOuptCDtlansuZjquLAg7J6R7JeF7KSR7J20652864qUIOucu1xyXG4gICAgICAgICAgICBNYW51YWxDb21iaW5lLmluaXQoZGF0YS5zcG90cyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RDaGVjayhkYXRhLnNwb3RzKTsgLy9jb21iaW5pbmcsIGNvbWJpbmVk6rCAIOyXhuycvOuptCDrjbDsnbTthLAg7IiY7KeRLCDqsoDspp3spJHsnbTrnbzripQg65y7XHJcbiAgICAgICAgICAgIC8vZmlyc3RjaGVja+ulvCDthrXqs7ztlZjrqbQgdGhpcy5hdXRvQ29tYmluZeydhCDthrXtlbQgZGF0YS5zcG90cy5jb21iaW5pbmfsnbQg66eM65Ok7Ja07KeQXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhdXRvQ29tYmluZV9fc3BvdFJlc3RydWN0dXJlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGVBcnIgPSBbXCJnZ1wiLFwibHBcIixcIm52XCIsXCJ0YVwiXTtcclxuICAgICAgICBsZXQgY29tYmluaW5nID0ge307XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhLnNwb3RzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpdGVBcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpdGUgPSBzaXRlQXJyW2pdO1xyXG4gICAgICAgICAgICBpZihkYXRhW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbc2l0ZV0ubm9EYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbc2l0ZV1baV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFNwb3QgPSBkYXRhW3NpdGVdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/quLDsobQg7KCV67O066W8IG9sZFNwb3TsnbTrnbzqs6Ag7ZWY7J6QLiDsg4jroZzsmrQg7Iqk7Yyf7KCV67O07JeQ64qUIOydtOumhOydhCDtlZwv7JiB7Jy866GcIOu2hO2VoO2VmOqzoCDrnq3tgrnsnYQg67aA7Jes7ZWgIOqyg+ydtOuLpC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga286XCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW46XCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcjogb2xkU3BvdC5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6e1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvW+qwgC3tnqNdLy50ZXN0KG9sZFNwb3QubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm5hbWUua28gPSBvbGRTcG90Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5lbiA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QucmFua1tzaXRlXSA9IGk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYob2xkU3BvdC51cmwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudXJsID0gb2xkU3BvdC51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvbGRTcG90LnRhZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC50YWcgPSBvbGRTcG90LnRhZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb3VudGVyPDEwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzMDBcIitjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjb3VudGVyPDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczBcIitjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzXCIrY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IC8v7ZWc67CU7YC0IOuPjOyVmOuLuVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hdXRvQ29tYmluZV9fY29tYmluZShjb21iaW5pbmcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhdXRvQ29tYmluZV9fY29tYmluZTogZnVuY3Rpb24oY29tYmluaW5nKXtcclxuICAgICAgICAvLyBUT0RPOiDrgZ3rgpjrqbQg7ZWp7LmY6riwIOyekeyXhSDtmZTrqbQgaW5mbGF0Ze2VmOq4sFxyXG5cclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG5cclxuICAgICAgICBsZXQgY29tYmluZU9iaiA9IHt9XHJcbiAgICAgICAgbGV0IGNvbWJpbmVkID0ge31cclxuXHJcbiAgICAgICAgZm9yICh2YXIgY29kZSBpbiBjb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSBjb21iaW5pbmdbY29kZV07XHJcbiAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0gPSBzcG90XHJcbiAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0uY29tYmluZSA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgaGFzQ29tYmluZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy/tlansuaAg6rKD7J20IOyXhuycvOuptCDrsJTroZwgY29tYmluZWQg7Kq97Jy866GcIOuztOuCuOuLpC5cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHRDb2RlIGluIGNvbWJpbmluZykge1xyXG4gICAgICAgICAgICAgICAgaWYoY29kZTx0Q29kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRTcG90ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbWJpbmluZ1t0Q29kZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdFNwb3Rba2V5XSA9IGNvbWJpbmluZ1t0Q29kZV1ba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGNhbGN1bGF0ZURpZihzcG90LmNvb3IsIHRTcG90LmNvb3IpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRpZjwyNTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmVbdENvZGVdID0gdFNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NvbWJpbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFoYXNDb21iaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb21iaW5lZFtjb2RlXSA9IGNvbWJpbmVPYmpbY29kZV07XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29tYmluZU9ialtjb2RlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2l0eStcIi9zcG90c1wiKS5zZXQoe1xyXG4gICAgICAgICAgICBjb21iaW5pbmc6Y29tYmluZU9iaixcclxuICAgICAgICAgICAgY29tYmluZWQ6Y29tYmluZWRcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBNYW51YWxDb21iaW5lLmluaXQoe1xyXG4gICAgICAgICAgICBjb21iaW5pbmc6Y29tYmluZU9iaixcclxuICAgICAgICAgICAgY29tYmluZWQ6Y29tYmluZWRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZVNwb3Q6IGZ1bmN0aW9uKHNpZCwgbmFtZSl7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICBsZXQgc2l0ZSA9IHNpZC5zcGxpdChcIl9cIilbMF07XHJcbiAgICAgICAgbGV0IG5vID0gc2lkLnNwbGl0KFwiX1wiKVsxXTtcclxuXHJcbiAgICAgICAgaWYoY29uZmlybShuYW1lICsgXCIg7J6l7IaM66W8IOygnOqxsO2VqeuLiOuLpC4g6rOE7IaN7ZWg6rmM7JqUP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubyApLnNldCh7ZGVsZXRlZDogdHJ1ZX0pO1xyXG4gICAgICAgICAgICAkKFwiI1wiK3NpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi7J6l7IaM6rCAIOygnOqxsOuQmOyXiOyKteuLiOuLpC5cIilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0Q29vcmRpbmF0ZTogZnVuY3Rpb24oc2lkLCBjb29yVHh0KXtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlID0gc2lkLnNwbGl0KFwiX1wiKVswXTtcclxuICAgICAgICBsZXQgbm8gPSBzaWQuc3BsaXQoXCJfXCIpWzFdO1xyXG4gICAgICAgIGxldCBjb29yID0ge307XHJcblxyXG4gICAgICAgIGlmKGNvb3JUeHQuc3BsaXQoXCIsXCIpLmxlbmd0aCA9PT0gMil7XHJcbiAgICAgICAgICAgIGxldCBsYXQgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVswXS50cmltKCkqMTtcclxuICAgICAgICAgICAgbGV0IGxuZyA9IGNvb3JUeHQuc3BsaXQoXCIsXCIpWzFdLnRyaW0oKSoxO1xyXG5cclxuICAgICAgICAgICAgaWYoaXNOYU4obGF0KXx8aXNOYU4obG5nKSl7XHJcbiAgICAgICAgICAgICAgICAvL+yijO2RnCDspJEg7ZWY64KY6rCAXHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyijO2RnOqwgCDrtoDsoJXtmZXtlZjqsowg7J6F66Cl65CY7JeI7Iq164uI64ukXCIpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29vciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6IGxhdCxcclxuICAgICAgICAgICAgICAgICAgICBsbmc6IGxuZ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg7J6F66Cl65CY7JeI7Iq164uI64ukXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNcIitzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUgKyBcIi9cIiArIG5vICsgXCIvY29vclwiKS5zZXQoY29vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg67aA7KCV7ZmV7ZWY6rKMIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlyc3RDaGVjazogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG4gICAgICAgICQoXCIuaGVhZGVyX19zdGF0dXNcIikuaHRtbChcIuuNsOydtO2EsCDqsoDspp3spJFcIilcclxuICAgICAgICBsZXQgaGFzUHJvYmxlbT0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgbGV0IHNlYXJjaFVybCA9ICdodHRwczovL3d3dy5nb29nbGUuY28ua3IvbWFwcy9wbGFjZS8nICsgJChcIi5jaXR5TmFtZVwiKS5odG1sKCkgK1wiK1wiXHJcblxyXG4gICAgICAgIGxldCBzaXRlT2JqID0ge1xyXG4gICAgICAgICAgICBnZzogXCLqtazquIBcIixcclxuICAgICAgICAgICAgbnY6IFwi64Sk7J2067KEXCIsXHJcbiAgICAgICAgICAgIHRhOiBcIu2KuOumveyWtOuTnOuwlOydtOyggFwiLFxyXG4gICAgICAgICAgICBscDogXCLroaDrpqztlIzrnpjri5tcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiBzaXRlT2JqKSB7XHJcbiAgICAgICAgICAgIGxldCBzaXRlSGFzUHJvYmxlbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub0Nvb3JUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7sooztkZzqsIAg7J6F66Cl65CY7KeAIOyViuydgCDqtIDqtJHsp4DqsIAg7J6I7Iq164uI64ukPC9wPic7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vU3BvdFR4dCA9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZVwiPuu5hOyWtOyeiOuKlCDqtIDqtJHsp4DqsIAg7J6I7Iq164uI64ukPC9wPic7XHJcblxyXG4gICAgICAgICAgICBpZihkYXRhW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiY2hlY2tfX3RpdGxlXCI+JytzaXRlT2JqW3NpdGVdKycg642w7J207YSwIO2ZleyduDwvcD4nXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbc2l0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IGRhdGFbc2l0ZV1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3BvdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYXNDb29yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BvdC5kZWxldGVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v7J2867aA65+sIOyCreygnO2VnCDqtIDqtJHsp4AgLT4g64SY7Ja06rCE64ukXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BvdC5jb29yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzcG90LmNvb3IubG5nKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNOYU4oc3BvdC5jb29yLmxuZyoxKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BvdC5jb29yLmxhdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzTmFOKHNwb3QuY29vci5sYXQqMSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWhhc0Nvb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCs9JzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJytzaXRlKydfJytpKydcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0Kz0gICAnPGEgY2xhc3M9XCJjaGVja19fc3BvdE5hbWVcIiBocmVmPVwiJytzZWFyY2hVcmwrc3BvdC5uYW1lKydcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nK3Nwb3QubmFtZSsnPC9hPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQrPSAgICc8aW5wdXQgY2xhc3M9XCJjaGVja19fc3BvdENvb3JcIiBwbGFjZWhvbGRlcj1cInh4Lnh4eHh4LCB4eC54eHh4eCDtmJXtg5wg7J6F66ClXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCs9ICAgJzxwIGNsYXNzPVwiY2hlY2tfX2NvbmZpcm1cIj7sooztkZwg7J6F66ClPC9wPjxwIGNsYXNzPVwiY2hlY2tfX3Nwb3REZWxldGVcIj7snqXshowg7IKt7KCcPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZUhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCs9JzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJytzaXRlKydfJytpKydcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCs9ICAgJzxwIGNsYXNzPVwiY2hlY2tfX3R4dFwiPicraSsnIOuyiCDqtIDqtJHsp4A8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQrPSAgICc8cCBjbGFzcz1cImNoZWNrX19zcG90RGVsZXRlXCI+7J6l7IaMIOyCreygnDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCs9JzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobm9Db29yKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gbm9Db29yVHh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobm9TcG90KXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gbm9TcG90VHh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbc2l0ZV0ubGVuZ3RoPjE1MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhcmdlT0sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEubGFyZ2VEYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5sYXJnZURhdGFbc2l0ZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8xNTDqsJwg7J207IOB7J2YIOuNsOydtO2EsOulvCDrs7TsnKDtlZjroKTrqbQg64+E7Iuc66qFL3Nwb3RzL2xhcmdlRGF0YS/sgqzsnbTtirjrqoXsnbQgdHJ1ZeudvOqzoCDrtoDsl6zrkJjslrTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFyZ2VPSyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFsYXJnZU9LKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj4nK3NpdGVPYmpbc2l0ZV0rJyDsnqXshowg642w7J207YSw6rCAIDE1MOqwnOulvCDstIjqs7woJytkYXRhW3NpdGVdLmxlbmd0aCsn6rCcKe2VqeuLiOuLpC48L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicrc2l0ZSsnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8aW5wdXQgY2xhc3M9XCJjaGVja19fcmVtYWluTnVtYmVyXCIgdmFsdWU9XCInK2RhdGFbc2l0ZV0ubGVuZ3RoKydcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiPuqwnOydmCDsnqXshowg7Jyg7KeA7ZWY6riwPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiY2hlY2tfX3RpdGxlXCI+JytzaXRlT2JqW3NpdGVdKycg642w7J207YSw6rCAIOyhtOyerO2VmOyngCDslYrsirXri4jri6QuPC9wPidcclxuICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2l0ZUhhc1Byb2JsZW0gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IOybkOuemCDsgqzsnbTtirgg642w7J207YSw6rCAIOyhtOyerO2VmOyngCDslYrripQg6rK97Jqw66W8IOuMgOu5hO2VnCDrsoTtirzsnYQg66eM65Ok6rOgIHNpdGUg6rCS7Jy866GcIG5vZGF0YTogdHJ1ZeulvCDrhKPslrTspIDri6QuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXNpdGVIYXNQcm9ibGVtKXtcclxuICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZVwiPuuwnOqyrOuQnCDrrLjsoJzqsIAg7JeG7Iq164uI64ukPC9wPidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaGFzUHJvYmxlbSl7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fZmluaXNoXCI+6rKA7IKs66W8IOuqqOuRkCDrp4jss6TsirXri4jri6Q8L3A+J1xyXG4gICAgICAgICAgICAkKFwiLnNwb3QgLmNoZWNrXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9hc3QoXCLrsJzqsqzrkJwg66y47KCc6rCAIOyXhuyWtCDrjbDsnbTthLAg67OR7ZWp7J2EIOyLpOyLnO2VqeuLiOuLpC5cIilcclxuICAgICAgICAgICAgdGhpcy5hdXRvQ29tYmluZV9fc3BvdFJlc3RydWN0dXJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcG90O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvc3BvdC5qcyIsImxldCBNYW51YWxDb21iaW5lID0ge1xyXG4gICAgbWFwOiB7fSxcclxuICAgIG1hcmtlcjoge1xyXG4gICAgICAgIHByaW1lOnt9LFxyXG4gICAgICAgIHRhcmdldDpbXVxyXG4gICAgfSxcclxuICAgIGRhdGE6e30sXHJcbiAgICByZW1haW46MCxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuY29tYmluZV9fdGFyZ2V0XCIpLm9uKFwiY2xpY2tcIiwgXCIuY29tYmluZV9fdGFyZ2V0X19kaXZcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcIi5jb21iaW5lX190YXJnZXRfX2NoZWNrXCIpLnRvZ2dsZUNsYXNzKFwiY29tYmluZV9fdGFyZ2V0X19jaGVja2VkXCIpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCIuY29tYmluZV9fbWFpblwiKS5vbihcImNsaWNrXCIsXCIuY29tYmluZV9fbmV4dFN0ZXBcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5uZXh0U3RlcCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIG5leHRTdGVwOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIik7XHJcblxyXG4gICAgICAgIGxldCBtYWluRGF0YSA9IHRoaXMuZGF0YS5jb21iaW5pbmdbJChcIi5jb21iaW5lX19tYWluXCIpLmF0dHIoXCJpZFwiKV07XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5jb21iaW5lX190YXJnZXRfX2NoZWNrZWRcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRpZCA9ICQoXCIuY29tYmluZV9fdGFyZ2V0X19jaGVja2VkXCIpLmVxKGkpLmF0dHIoXCJzaWRcIilcclxuICAgICAgICAgICAgbGV0IHRhcmdldERhdGEgPSBtYWluRGF0YS5jb21iaW5lW3RpZF07XHJcblxyXG4gICAgICAgICAgICAvL+2VqeyzkOyniCDrjIDsg4HsnZggcmFua+ulvCBtYWluZERhdGHsnZggcmFua+uhnCDthrXtlantlZjripQg7J6R7JeFXHJcbiAgICAgICAgICAgIGZvciAodmFyIHNpdGUgaW4gdGFyZ2V0RGF0YS5yYW5rKSB7XHJcbiAgICAgICAgICAgICAgICBpZihtYWluRGF0YS5yYW5rW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihtYWluRGF0YS5yYW5rW3NpdGVdID4gdGFyZ2V0RGF0YS5yYW5rW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEucmFua1tzaXRlXSA9IHRhcmdldERhdGEucmFua1tzaXRlXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS5yYW5rW3NpdGVdID0gdGFyZ2V0RGF0YS5yYW5rW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+2VqeyzkOyniCDrjIDsg4HsnZgg7YOc6re466W8IG1haW5EYXRh7J2YIHRhZ+uhnCDthrXtlantlZjripQg7J6R7JeFXHJcbiAgICAgICAgICAgIGlmKHRhcmdldERhdGEudGFnKXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGFyZ2V0RGF0YS50YWcubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihtYWluRGF0YS50YWcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighbWFpbkRhdGEudGFnLmluY2x1ZGVzKHRhcmdldERhdGEudGFnW2pdKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS50YWcucHVzaCh0YXJnZXREYXRhLnRhZ1tqXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS50YWcgPSB0YXJnZXREYXRhLnRhZ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7JeQ6rKMIHVybOydtCDsnoXroKXrkJjslrQg7J6I64uk66m0IG1haW5EYXRh7JeQIO2Gte2Vqe2VmOuKlCDsnpHsl4VcclxuICAgICAgICAgICAgaWYoIW1haW5EYXRhLnVybCl7XHJcbiAgICAgICAgICAgICAgICBpZih0YXJnZXREYXRhLnVybCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudXJsID0gdGFyZ2V0RGF0YS51cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEuY29tYmluaW5nW3RpZF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1haW5EYXRhLm5hbWUua28gPSAkKFwiI25hbWVfa29cIikudmFsKCk7XHJcbiAgICAgICAgbWFpbkRhdGEubmFtZS5lbiA9ICQoXCIjbmFtZV9lblwiKS52YWwoKTtcclxuXHJcbiAgICAgICAgZGVsZXRlIG1haW5EYXRhLmNvbWJpbmU7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YS5jb21iaW5lZFskKFwiLmNvbWJpbmVfX21haW5cIikuYXR0cihcImlkXCIpXSA9IHRoaXMuZGF0YS5jb21iaW5pbmdbJChcIi5jb21iaW5lX19tYWluXCIpLmF0dHIoXCJpZFwiKV07XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZGF0YS5jb21iaW5pbmdbJChcIi5jb21iaW5lX19tYWluXCIpLmF0dHIoXCJpZFwiKV07XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpdHkrXCIvc3BvdHNcIikudXBkYXRlKHRoaXMuZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVtYWluIC0tO1xyXG4gICAgICAgIGlmKHRoaXMucmVtYWluPjApe1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGUoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLsnpHsl4XsmYTro4whXCIpXHJcbiAgICAgICAgICAgIC8vIFRPRE86IOyekeyXheyZhOujjO2WiOycvOuptCDrjbDsnbTthLDsoJXrpqwg65Ok7Ja06rCA6riwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZVwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZS5jb21iaW5lXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5oZWFkZXJfX3N0YXR1c1wiKS5odG1sKFwi6rSA6rSR7KeAIO2Vqey5mOq4sFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiA0MC43NDg0NCwgbG5nOiAtNzMuOTg1NjYgfSxcclxuICAgICAgICAgICAgem9vbTogMTcsXHJcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHRoYXQuY2hvb3NlQ29vcmRpbmF0ZShlKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmluZmxhdGUoKTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNob29zZUNvb3JkaW5hdGU6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQoXCIuY29tYmluZV9fY29vcmRpbmF0ZVwiKS5odG1sKGUubGF0TG5nLmxhdCgpK1wiLFwiK2UubGF0TG5nLmxuZygpKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXIucHJpbWUuc2V0TWFwKG51bGwpXHJcbiAgICAgICAgdGhpcy5tYXJrZXIucHJpbWUgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGUubGF0TG5nLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YS5jb21iaW5pbmc7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgLy/quLDsobTsl5Ag7LCN7ZiA7J6I642YIOuniOy7pOulvCDsoJzqsbDtlZzri6RcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcclxuICAgICAgICB0aGlzLnJlbWFpbiA9IGtleXMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBzcG90ID0gZGF0YVtrZXlzWzBdXTtcclxuICAgICAgICAkKFwiLmNvbWJpbmVfX21haW5cIikuYXR0cihcImlkXCIsIGtleXNbMF0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhzcG90KVxyXG4gICAgICAgIC8v7J2066aEIOq0gOugqCDsoJXrs7Qg7ZGc7IucXHJcbiAgICAgICAgaWYoc3BvdC5uYW1lLmtvLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJjb21iaW5lX19uYW1lX19wcmltZVwiPuq4sOykgCDsnqXshozrqoU6ICcrIHNwb3QubmFtZS5rbyArJzwvcD4nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImNvbWJpbmVfX25hbWVfX3ByaW1lXCI+6riw7KSAIOyepeyGjOuqhTogJysgc3BvdC5uYW1lLmVuICsnPC9wPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJjb21iaW5lX19wcmltZVwiPidcclxuICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwiY29tYmluZV9fcHJpbWVfX2xlZnRcIj4nXHJcbiAgICAgICAgdHh0Kz0gICAgICAnPGRpdiBjbGFzcz1cImNvbWJpbmVfX2xpbmVcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPu2VnOq4gOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImNvbWJpbmVfX2lucHV0XCIgaWQ9XCJuYW1lX2tvXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5rbysnXCI+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICAgICc8ZGl2IGNsYXNzPVwiY29tYmluZV9fbGluZVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPuyYgeusuOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImNvbWJpbmVfX2lucHV0XCIgaWQ9XCJuYW1lX2VuXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5lbisnXCI+J1xyXG4gICAgICAgIHR4dCs9ICAgICAnPC9kaXY+J1xyXG4gICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNvbWJpbmVfX25leHRTdGVwXCI+64uk7J2MPC9wPidcclxuICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG5cclxuICAgICAgICAvL+yijO2RnCDqtIDroKgg7KCV67O0IO2RnOyLnFxyXG4gICAgICAgIHNwb3QuY29vci5sYXQgPSBzcG90LmNvb3IubGF0KjE7XHJcbiAgICAgICAgc3BvdC5jb29yLmxuZyA9IHNwb3QuY29vci5sbmcqMTtcclxuICAgICAgICB0aGlzLm1hcmtlci5wcmltZSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogc3BvdC5jb29yLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tYXAucGFuVG8oc3BvdC5jb29yKTtcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY29tYmluZV9fbGluZVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPuyijO2RnCc7XHJcbiAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJjb21iaW5lX19jb29yZGluYXRlXCI+Jysgc3BvdC5jb29yLmxhdCArXCIsXCIrc3BvdC5jb29yLmxuZyArJzwvcD4nO1xyXG4gICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIuY29tYmluZV9fbWFpblwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgICAgIHR4dD0nJztcclxuICAgICAgICBsZXQgaWR4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2lkIGluIHNwb3QuY29tYmluZSkge1xyXG4gICAgICAgICAgICBpZHgrKztcclxuICAgICAgICAgICAgbGV0IHRTcG90ID0gc3BvdC5jb21iaW5lW3NpZF07XHJcblxyXG4gICAgICAgICAgICBsZXQgbGF0bG5nID0ge1xyXG4gICAgICAgICAgICAgICAgbGF0OiB0U3BvdC5jb29yLmxhdCoxLFxyXG4gICAgICAgICAgICAgICAgbG5nOiB0U3BvdC5jb29yLmxuZyoxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHRNYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOmxhdGxuZyxcclxuICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogaWR4LnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnRhcmdldC5wdXNoKHRNYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgLy/rs7jrqoXsnLzroZwg7ZWc6riA66qFIOyYgeyWtOuqheydtCDsl4bsnYQg6rK97Jqw66W8IOyytO2BrO2VtOyEnCDrhKPslrTspIDri6QuXHJcbiAgICAgICAgICAgIGlmKCQoXCIjbmFtZV9rb1wiKS52YWwoKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYW1lX2tvXCIpLnZhbCh0U3BvdC5uYW1lLmtvKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCQoXCIjbmFtZV9lblwiKS52YWwoKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYW1lX2VuXCIpLnZhbCh0U3BvdC5uYW1lLmVuKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY29tYmluZV9fdGFyZ2V0X19kaXZcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiY29tYmluZV9fdGFyZ2V0X19udW1iZXJcIj4nK2lkeCsnPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cImNvbWJpbmVfX3RhcmdldF9fY2hlY2tcIiBzaWQ9XCInK3NpZCsnXCI+PC9kaXY+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNvbWJpbmVfX3RhcmdldF9fbmFtZVwiPicrdFNwb3QubmFtZS5rbytcIiBcIit0U3BvdC5uYW1lLmVuKyc8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmNvbWJpbmVfX3RhcmdldFwiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbnVhbENvbWJpbmU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9tYW51YWxDb21iaW5lLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==