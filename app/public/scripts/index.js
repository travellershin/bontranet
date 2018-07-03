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
                that.inflate_calendar(that.attendObj);

                $('#calendar').fullCalendar({
                    height: 564,
                    firstDay: 1,
                    viewRender: function viewRender(view, element) {
                        that.inflate_calendar(that.attendObj);
                    },
                    dayClick: function dayClick(date) {
                        console.log(date);
                        that.inputWorkHour(date);
                    }
                });
            });
        }

        this.listener();
    },

    listener: function listener() {
        var that = this;

        $(".attendView_input").click(function () {
            that.inflate_input();
        });
        $(".attendView_Show").click(function () {
            that.inflate_calendar(that.attendObj);
        });

        $("body").on("click", ".confirm", function () {
            that.setWorkHour($(this).attr("did"));
            $(".inputWindow input").val("");
        });
        $("body").on("click", ".close", function () {
            $(".blackScreen").addClass("displayNone");
            $(".inputWindow input").val("");
        });
        $("body").keyup(function (e) {
            if ($(".modal .confirm").length) {
                var code = e.which; // recommended to use e.which, it's normalized across browsers
                if (code == 13) {
                    if ($("#first_from").val().length > 0) {
                        that.setWorkHour($(".modal .confirm").attr("did"));
                    }
                }
            }
        });
    },

    inflate_calendar: function inflate_calendar(data) {
        $(".attend").removeClass("displayNone");

        if (data.attend) {
            data = data.attend;
            for (var date in data) {
                var dateID = date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
                var dif = 0;
                var _txt = '<p>' + data[date][0].from + "~" + data[date][0].to + '</p>';
                //두타임 나눠서 근무했어도 달력에 표시되는 것은 첫타임 근무시간만

                for (var i = 0; i < data[date].length; i++) {
                    dif += data[date][i].dif;
                }

                _txt += '<p>' + Math.floor(dif / 60) + "시간 " + dif % 60 + "분" + '</p>';
                $('.fc-day[data-date="' + dateID + '"]').html(_txt);
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
            var txt = '';

            if ($(".fc-view-container").length) {
                for (var i = 0; i < 6; i++) {
                    //무조건 6주
                    var weekDom = $(".fc-week").eq(i);
                    var weekDur = 0;

                    for (var j = 0; j < 7; j++) {
                        var dayDom = weekDom.find(".fc-day").eq(j);
                        var _date2 = dayDom.attr("data-date").split("-");
                        _date2 = _date2[0] + _date2[1] + _date2[2];
                        if (data[_date2]) {
                            for (var k = 0; k < data[_date2].length; k++) {
                                weekDur += data[_date2][k].dif;
                            }
                        }
                    }
                    if (weekDur > 0) {
                        txt += '<p class="attend__week__hour">' + Math.floor(weekDur / 60) + '시간 ' + weekDur % 60 + '분' + '</p>';
                    } else {
                        txt += '<p class="attend__week__hour"></p>';
                    }
                }

                $(".attend__week").html(txt);
            }

            if ($(".fc-left").children("h2.durMonth").length) {
                $("h2.durMonth").html(' (' + Math.floor(durMon / 60) + '시간 ' + durMon % 60 + '분)');
            } else {
                $(".fc-left").append('<h2 class="durMonth"> (' + Math.floor(durMon / 60) + '시간 ' + durMon % 60 + '분)</h2>');
            }

            txt = ''; //var 빼먹은거 아님. 위에서 선언 했음!

            var fullMonthBonus = 30400;
            var insuranceFee = 0;
            var basic = Math.round(durMon / 60 * 7600);
            var fullWeekBunus = Math.round(durMon / 60 * 7600 * 0.2);

            txt += '<div class="attend__month__line">';
            txt += '<p class="attend__month__category">기본급</p>';
            txt += '<p class="attend__month__value">' + comma(basic) + "원</p>";
            txt += '<p class="attend__month__explain">근무시간 X 7,600원</p>';
            txt += '</div>';

            txt += '<div class="attend__month__line">';
            txt += '<p class="attend__month__category">주휴수당</p>';
            txt += '<p class="attend__month__value">' + comma(fullWeekBunus) + "원</p>";
            txt += '<p class="attend__month__explain">기본급의 20%</p>';
            txt += '</div>';

            txt += '<div class="attend__month__line">';
            txt += '<p class="attend__month__category">연차수당</p>';
            txt += '<p class="attend__month__value">' + comma(fullMonthBonus) + "원</p>";
            txt += '<p class="attend__month__explain">5시간 상당 기본급</p>';
            txt += '</div>';

            txt += '<div class="attend__month__line attend__month__line--red">';
            txt += '<p class="attend__month__category">사회보험료</p>';
            txt += '<p class="attend__month__value">' + comma(insuranceFee) + "원</p>";
            txt += '<p class="attend__month__explain">국민연금/고용보험/건강보험 청구액</p>';
            txt += '</div>';

            txt += '<div class="attend__month__line attend__month__line--sum">';
            txt += '<p class="attend__month__category">합계</p>';
            txt += '<p class="attend__month__value">' + comma(basic + fullWeekBunus + fullMonthBonus - insuranceFee) + "원</p>";
            txt += '<p class="attend__month__explain">기본급 + 주휴수당 + 연차수당 - 사회보험료</p>';
            txt += '</div>';

            $(".attend__month").html(txt);
        }
    },

    inputWorkHour: function inputWorkHour(dateObj) {
        // css: modules/attend.css
        var dateShort = moment(dateObj).format("MM/DD");
        var dateID = moment(dateObj).format("YYYYMMDD");

        var data = {};
        if (this.attendObj.attend[dateID]) {
            data = this.attendObj.attend[dateID];
        }

        var txt = '';

        txt += '<div class="blackScreen">';
        txt += '<div class="inputWindow">';
        txt += '<p class="title">' + dateShort + ' 근무시간</p>';
        txt += '<div class="line clearfix">';
        if (data[0]) {
            txt += '<input id="first_from" value="' + data[0].from + '"><p class="word">부터</p><input id="first_to" value="' + data[0].to + '"><p class="word">까지</p>';
        } else {
            txt += '<input id="first_from"><p class="word">부터</p><input id="first_to"><p class="word">까지</p>';
        }
        txt += '</div>';
        txt += '<div class="line clearfix">';
        if (data[1]) {
            txt += '<input id="second_from" value="' + data[1].from + '"><p class="word">부터</p><input id="second_to" value="' + data[1].to + '"><p class="word">까지</p>';
        } else {
            txt += '<input id="second_from"><p class="word">부터</p><input id="second_to"><p class="word">까지</p>';
        }
        txt += '</div>';
        txt += '<div class="bottom">';
        txt += '<p class="confirm" did="' + dateID + '">확인</p>';
        txt += '<p class="close">취소</p>';
        txt += '</div>';
        txt += '</div>';
        txt += '</div>';

        $(".modal").html(txt);

        if (this.mobile) {
            $(".inputWindow input").AnyPicker({
                dateTimeFormat: "HH:mm"
            });
        }

        $("#first_from").focus();

        var that = this;
    },

    setWorkHour: function setWorkHour(date) {

        var work = [];

        var allEmpty = true;
        for (var i = 0; i < $(".inputWindow input").length; i++) {
            if ($(".inputWindow input").eq(i).val().length > 1) {
                allEmpty = false;
            }
        }

        if (allEmpty) {
            firebase.database().ref("attend/" + this.id + "/attend/" + date).remove();
            $(".modal").html("");
            var dateID = date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
            $('.fc-day[data-date="' + dateID + '"]').html("");
            return false;
        }

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

        firebase.database().ref("attend/" + this.id + "/attend/" + date).set(work);
        $(".modal").html("");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzJhOTE2OGM5N2U1NDcyMDAyZmIiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hdHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9tYW51YWxDb21iaW5lLmpzIl0sIm5hbWVzIjpbInVuaW5mbGF0ZWQiLCJhdHRlbmQiLCJjaXR5IiwidV9pIiwibWFpbCIsIm5hbWUiLCJncmFkZSIsIiQiLCJjbGljayIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJpbml0IiwiZG9jdW1lbnQiLCJyZWFkeSIsInByb3ZpZGVyIiwiZmlyZWJhc2UiLCJhdXRoIiwiR29vZ2xlQXV0aFByb3ZpZGVyIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwidXNlciIsInVzZXJNYWlsIiwiZW1haWwiLCJzcGxpdCIsImRhdGFiYXNlIiwicmVmIiwib25jZSIsInVzZXJEYXRhIiwic25hcCIsInZhbCIsInVpZCIsImRpc3BsYXlOYW1lIiwibG9naW4iLCJhbGVydCIsInNpZ25JbldpdGhQb3B1cCIsInRoZW4iLCJyZXN1bHQiLCJjYXRjaCIsImVycm9yIiwiZXJyb3JDb2RlIiwiY29kZSIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjcmVkZW50aWFsIiwiaHRtbCIsImF0dHIiLCJjb25maXJtIiwic2lnbk91dCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiQXR0ZW5kIiwibW9iaWxlIiwiaWQiLCJhdHRlbmRPYmoiLCJ3ZWVrZGF5cyIsInRoYXQiLCJ1c2VycyIsInR4dCIsIm1haWxJRCIsIm9uIiwiaW5mbGF0ZV9jYWxlbmRhciIsImZ1bGxDYWxlbmRhciIsImhlaWdodCIsImZpcnN0RGF5Iiwidmlld1JlbmRlciIsInZpZXciLCJlbGVtZW50IiwiZGF5Q2xpY2siLCJkYXRlIiwiY29uc29sZSIsImxvZyIsImlucHV0V29ya0hvdXIiLCJsaXN0ZW5lciIsImluZmxhdGVfaW5wdXQiLCJzZXRXb3JrSG91ciIsImtleXVwIiwiZSIsImxlbmd0aCIsIndoaWNoIiwiZGF0YSIsImRhdGVJRCIsInNsaWNlIiwiZGlmIiwiZnJvbSIsInRvIiwiaSIsIk1hdGgiLCJmbG9vciIsImR1ck1vbiIsImRhdGVEb20iLCJlcSIsImhhc0NsYXNzIiwiaiIsIndlZWtEb20iLCJ3ZWVrRHVyIiwiZGF5RG9tIiwiZmluZCIsImsiLCJjaGlsZHJlbiIsImFwcGVuZCIsImZ1bGxNb250aEJvbnVzIiwiaW5zdXJhbmNlRmVlIiwiYmFzaWMiLCJyb3VuZCIsImZ1bGxXZWVrQnVudXMiLCJjb21tYSIsImRhdGVPYmoiLCJkYXRlU2hvcnQiLCJtb21lbnQiLCJmb3JtYXQiLCJBbnlQaWNrZXIiLCJkYXRlVGltZUZvcm1hdCIsImZvY3VzIiwid29yayIsImFsbEVtcHR5IiwicmVtb3ZlIiwiZnJvbUEiLCJ0b0EiLCJwdXNoIiwic2V0IiwiQ2l0eSIsImNvZGVEYXRhIiwiY2l0eURhdGEiLCJjaWQiLCJwYXJlbnQiLCJyZXR1cm5Ub0NpdHlWaWV3Iiwic2V0UmVtYWluTnVtYmVyIiwic2l0ZSIsIm51bWJlciIsImN1dE5vIiwidHJpbSIsInRvYXN0IiwiY3V0T2JqIiwic3BvdHMiLCJpbmZsYXRlX2NpdHlDb2RlVmlldyIsImhvdGVscyIsInNwb3QiLCJjb21iaW5lZCIsImNvbWJpbmluZyIsImFyZWEiLCJwcmljZSIsInNldHRpbmciLCJjaXRpZXMiLCJTcG90IiwiaW5wdXRDb29yZGluYXRlIiwiZGVsZXRlU3BvdCIsImZpcnN0Q2hlY2siLCJhdXRvQ29tYmluZV9fc3BvdFJlc3RydWN0dXJlIiwic2l0ZUFyciIsImNvdW50ZXIiLCJub0RhdGEiLCJvbGRTcG90Iiwia28iLCJlbiIsImNvb3IiLCJyYW5rIiwidGVzdCIsInVybCIsInRhZyIsImF1dG9Db21iaW5lX19jb21iaW5lIiwiY29tYmluZU9iaiIsImNvbWJpbmUiLCJoYXNDb21iaW5lZCIsInRDb2RlIiwidFNwb3QiLCJrZXkiLCJjYWxjdWxhdGVEaWYiLCJzaWQiLCJubyIsImRlbGV0ZWQiLCJjb29yVHh0IiwibGF0IiwibG5nIiwiaXNOYU4iLCJoYXNQcm9ibGVtIiwic2VhcmNoVXJsIiwic2l0ZU9iaiIsImdnIiwibnYiLCJ0YSIsImxwIiwic2l0ZUhhc1Byb2JsZW0iLCJub0Nvb3IiLCJub0Nvb3JUeHQiLCJub1Nwb3QiLCJub1Nwb3RUeHQiLCJoYXNDb29yIiwibGFyZ2VPSyIsImxhcmdlRGF0YSIsIk1hbnVhbENvbWJpbmUiLCJtYXAiLCJtYXJrZXIiLCJwcmltZSIsInRhcmdldCIsInJlbWFpbiIsInRvZ2dsZUNsYXNzIiwibmV4dFN0ZXAiLCJtYWluRGF0YSIsInRpZCIsInRhcmdldERhdGEiLCJpbmNsdWRlcyIsInVwZGF0ZSIsImluZmxhdGUiLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiZ2V0RWxlbWVudEJ5SWQiLCJjZW50ZXIiLCJ6b29tIiwibWFwVHlwZUNvbnRyb2wiLCJzY2FsZUNvbnRyb2wiLCJmdWxsc2NyZWVuQ29udHJvbCIsImFkZExpc3RlbmVyIiwiY2hvb3NlQ29vcmRpbmF0ZSIsImxhdExuZyIsInNldE1hcCIsIk1hcmtlciIsInBvc2l0aW9uIiwia2V5cyIsIk9iamVjdCIsInBhblRvIiwiaWR4IiwibGF0bG5nIiwidE1hcmtlciIsImxhYmVsIiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LENBQXdCeUcsT0FBeEI7O0FBRUE7QUFDQSxnQkFBR3hOLEVBQUUsVUFBRixFQUFjcUIsR0FBZCxHQUFvQmlELE1BQXBCLEtBQStCLENBQWxDLEVBQW9DO0FBQ2hDdEUsa0JBQUUsVUFBRixFQUFjcUIsR0FBZCxDQUFrQndJLE1BQU0vSixJQUFOLENBQVdtSixFQUE3QjtBQUNIO0FBQ0QsZ0JBQUdqSixFQUFFLFVBQUYsRUFBY3FCLEdBQWQsR0FBb0JpRCxNQUFwQixLQUErQixDQUFsQyxFQUFvQztBQUNoQ3RFLGtCQUFFLFVBQUYsRUFBY3FCLEdBQWQsQ0FBa0J3SSxNQUFNL0osSUFBTixDQUFXb0osRUFBN0I7QUFDSDs7QUFFRGhHLG1CQUFLLG9DQUFMO0FBQ0FBLG1CQUFRLHdDQUFzQ29LLEdBQXRDLEdBQTBDLE1BQWxEO0FBQ0FwSyxtQkFBUSw4Q0FBNEM4RyxHQUE1QyxHQUFnRCxVQUF4RDtBQUNBOUcsbUJBQVEsc0NBQW9DMkcsTUFBTS9KLElBQU4sQ0FBV21KLEVBQS9DLEdBQWtELEdBQWxELEdBQXNEWSxNQUFNL0osSUFBTixDQUFXb0osRUFBakUsR0FBb0UsTUFBNUU7QUFDQWhHLG1CQUFLLFFBQUw7QUFDSDs7QUFFRGxELFVBQUUsa0JBQUYsRUFBc0JvQyxJQUF0QixDQUEyQmMsR0FBM0I7QUFDSDtBQXRNZSxDQUFwQjs7a0JBeU1lb0ksYSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGMyYTkxNjhjOTdlNTQ3MjAwMmZiIiwiaW1wb3J0IEF0dGVuZCBmcm9tIFwiLi9tb2R1bGVzL2F0dGVuZC5qc1wiO1xyXG5pbXBvcnQgQ2l0eSBmcm9tIFwiLi9tb2R1bGVzL2NpdHkuanNcIjtcclxuXHJcbmxldCB1bmluZmxhdGVkID0ge1xyXG4gICAgYXR0ZW5kOnRydWUsXHJcbiAgICBjaXR5OnRydWVcclxufVxyXG5cclxubGV0IHVfaSA9IHtcclxuICAgIG1haWw6XCJcIixcclxuICAgIG5hbWU6XCJcIixcclxuICAgIGdyYWRlOjBcclxufVxyXG5cclxuJChcIiNuYXZfYXR0ZW5kXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiaGVhZGVyIGxpXCIpLnJlbW92ZUNsYXNzKFwiLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5wYWdlcy5hdHRlbmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgaWYodW5pbmZsYXRlZC5hdHRlbmQpe1xyXG4gICAgICAgIEF0dGVuZC5pbml0KHVfaS5tYWlsLCB1X2kubmFtZSwgdV9pLmdyYWRlKTtcclxuICAgICAgICB1bmluZmxhdGVkLmF0dGVuZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59KVxyXG4kKFwiI25hdl9jaXR5XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiaGVhZGVyIGxpXCIpLnJlbW92ZUNsYXNzKFwiLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5wYWdlcy5jaXR5XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgIGlmKHVuaW5mbGF0ZWQuY2l0eSl7XHJcbiAgICAgICAgQ2l0eS5pbml0KHVfaS5tYWlsLCB1X2kubmFtZSwgdV9pLmdyYWRlKTtcclxuICAgICAgICB1bmluZmxhdGVkLmNpdHkgPSBmYWxzZTtcclxuICAgIH1cclxufSlcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgdmFyIHByb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uKHVzZXIpIHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgIGxldCB1c2VyTWFpbCA9IHVzZXIuZW1haWwuc3BsaXQoJ0AnKVswXVxyXG4gICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgbGV0IHVzZXJEYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICBpZih1c2VyRGF0YVt1c2VyTWFpbF0pe1xyXG4gICAgICAgICAgICAgICAgICBpZih1c2VyRGF0YVt1c2VyTWFpbF0udWlkID0gdXNlci51aWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdV9pLm1haWwgPSB1c2VyTWFpbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHVfaS5uYW1lID0gdXNlci5kaXNwbGF5TmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgIHVfaS5ncmFkZSA9IHVzZXJEYXRhW3VzZXJNYWlsXS5ncmFkZSoxXHJcbiAgICAgICAgICAgICAgICAgICAgICBBdHRlbmQuaW5pdCh1X2kubWFpbCwgdV9pLm5hbWUsIHVfaS5ncmFkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBDaXR5LmluaXQodV9pLm1haWwsIHVfaS5uYW1lLCB1X2kuZ3JhZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdW5pbmZsYXRlZC5hdHRlbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgIGxvZ2luKHVfaS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAvLyBVc2VyIGlzIHNpZ25lZCBpbi5cclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gTm8gdXNlciBpcyBzaWduZWQgaW4uXHJcbiAgICAgICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhQb3B1cChwcm92aWRlcikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgdXNlciA9IHJlc3VsdC51c2VyO1xyXG4gICAgICAgICAgICBsZXQgdXNlck1haWwgPSB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlckRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYodXNlckRhdGFbdXNlck1haWxdKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih1c2VyRGF0YVt1c2VyTWFpbF0udWlkID0gdXNlci51aWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1X2kubWFpbCA9IHVzZXJNYWlsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1X2kubmFtZSA9IHVzZXIuZGlzcGxheU5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVfaS5ncmFkZSA9IHVzZXJEYXRhW3VzZXJNYWlsXS5ncmFkZSoxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dGVuZC5pbml0KHVfaS5tYWlsLCB1X2kubmFtZSwgdV9pLmdyYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pbmZsYXRlZC5hdHRlbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9naW4odV9pLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAvLyAuLi5cclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgLy8gSGFuZGxlIEVycm9ycyBoZXJlLlxyXG4gICAgICAgICAgdmFyIGVycm9yQ29kZSA9IGVycm9yLmNvZGU7XHJcbiAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgIC8vIFRoZSBlbWFpbCBvZiB0aGUgdXNlcidzIGFjY291bnQgdXNlZC5cclxuICAgICAgICAgIHZhciBlbWFpbCA9IGVycm9yLmVtYWlsO1xyXG4gICAgICAgICAgLy8gVGhlIGZpcmViYXNlLmF1dGguQXV0aENyZWRlbnRpYWwgdHlwZSB0aGF0IHdhcyB1c2VkLlxyXG4gICAgICAgICAgdmFyIGNyZWRlbnRpYWwgPSBlcnJvci5jcmVkZW50aWFsO1xyXG4gICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSlcclxuXHJcbmZ1bmN0aW9uIGxvZ2luKG5hbWUpe1xyXG4gICAgJChcIi5oZWxsb1dvcmxkXCIpLmh0bWwobmFtZVsxXStcIu2VmCFcIik7XHJcbiAgICAkKFwiLmhlbGxvV29ybGRcIikuYXR0cihcInRpdGxlXCIsbmFtZStcIuuLmCDslYjrhZXtlZjshLjsmpQhXCIpO1xyXG4gICAgJChcIi5oZWxsb1dvcmxkXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoY29uZmlybShuYW1lK1wi64uYIOuhnOq3uOyVhOybgyDtlZjsi5zqsqDsirXri4jquYw/XCIpKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgIC8vIEFuIGVycm9yIGhhcHBlbmVkLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL2luZGV4LmpzIiwidmFyIEF0dGVuZCA9IHtcclxuICAgIG1vYmlsZTogZmFsc2UsXHJcblxyXG4gICAgaWQ6IFwiXCIsXHJcblxyXG4gICAgYXR0ZW5kT2JqOiB7fSxcclxuXHJcbiAgICB3ZWVrZGF5czogW1wi7J28XCIsIFwi7JuUXCIsIFwi7ZmUXCIsIFwi7IiYXCIsIFwi66qpXCIsIFwi6riIXCIsIFwi7YagXCIsIFwi7J28XCJdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGlkLCBuYW1lLCBncmFkZSl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcblxyXG4gICAgICAgIGlmKGdyYWRlID09PSA1KXtcclxuICAgICAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgICAgICQoXCIubG9hZGluZ1ZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJzID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbWFpbElEIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8b3B0aW9uIHZhbHVlPVwiJyttYWlsSUQrJ1wiPicrbWFpbElEKyc8L29wdGlvbj4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmdWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0ZW5kT2JqID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iailcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTY0LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRXb3JrSG91cihkYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLmF0dGVuZFZpZXdfaW5wdXRcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2lucHV0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiLmF0dGVuZFZpZXdfU2hvd1wiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuY29uZmlybVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LnNldFdvcmtIb3VyKCQodGhpcykuYXR0cihcImRpZFwiKSk7XHJcbiAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5jbG9zZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiLmJsYWNrU2NyZWVuXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChcImJvZHlcIikua2V5dXAoZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGlmKCQoXCIubW9kYWwgLmNvbmZpcm1cIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIHZhciBjb2RlID0gZS53aGljaDsgLy8gcmVjb21tZW5kZWQgdG8gdXNlIGUud2hpY2gsIGl0J3Mgbm9ybWFsaXplZCBhY3Jvc3MgYnJvd3NlcnNcclxuICAgICAgICAgICAgICAgIGlmKGNvZGU9PTEzKXtcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFdvcmtIb3VyKCQoXCIubW9kYWwgLmNvbmZpcm1cIikuYXR0cihcImRpZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jYWxlbmRhcjogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5hdHRlbmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICAgICAgaWYoZGF0YS5hdHRlbmQpe1xyXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5hdHRlbmRcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF0ZSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZUlEID0gZGF0ZS5zbGljZSgwLDQpK1wiLVwiK2RhdGUuc2xpY2UoNCw2KStcIi1cIitkYXRlLnNsaWNlKDYsOCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gMFxyXG4gICAgICAgICAgICAgICAgbGV0IHR4dCA9ICc8cD4nK2RhdGFbZGF0ZV1bMF0uZnJvbStcIn5cIitkYXRhW2RhdGVdWzBdLnRvKyc8L3A+J1xyXG4gICAgICAgICAgICAgICAgLy/rkZDtg4DsnoQg64KY64ig7IScIOq3vOustO2WiOyWtOuPhCDri6zroKXsl5Ag7ZGc7Iuc65CY64qUIOqyg+ydgCDssqvtg4DsnoQg6re866y07Iuc6rCE66eMXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW2RhdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlmICs9IGRhdGFbZGF0ZV1baV0uZGlmXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHh0Kz0nPHA+JyArIE1hdGguZmxvb3IoZGlmLzYwKSArIFwi7Iuc6rCEIFwiKyBkaWYlNjAgK1wi67aEXCIrJzwvcD4nXHJcbiAgICAgICAgICAgICAgICAkKCcuZmMtZGF5W2RhdGEtZGF0ZT1cIicrZGF0ZUlEKydcIl0nKS5odG1sKHR4dClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZHVyTW9uID0gMDtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5mYy1kYXlcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlRG9tID0gJChcIi5mYy1kYXlcIikuZXEoaSk7XHJcbiAgICAgICAgICAgICAgICBpZighZGF0ZURvbS5oYXNDbGFzcyhcImZjLW90aGVyLW1vbnRoXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGRhdGVEb20uYXR0cihcImRhdGEtZGF0ZVwiKS5zcGxpdChcIi1cIilcclxuICAgICAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZVswXStkYXRlWzFdK2RhdGVbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyTW9uICs9IGRhdGFbZGF0ZV1bal0uZGlmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHR4dCA9ICcnXHJcblxyXG4gICAgICAgICAgICBpZigkKFwiLmZjLXZpZXctY29udGFpbmVyXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykgeyAgIC8v66y07KGw6rG0IDbso7xcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla0RvbSA9ICQoXCIuZmMtd2Vla1wiKS5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla0R1ciA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXlEb20gPSB3ZWVrRG9tLmZpbmQoXCIuZmMtZGF5XCIpLmVxKGopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gZGF5RG9tLmF0dHIoXCJkYXRhLWRhdGVcIikuc3BsaXQoXCItXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlWzBdK2RhdGVbMV0rZGF0ZVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrRHVyICs9IGRhdGFbZGF0ZV1ba10uZGlmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2Vla0R1cj4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj4nKyBNYXRoLmZsb29yKHdlZWtEdXIvNjApKyfsi5zqsIQgJyt3ZWVrRHVyJTYwKyfrtoQnICsnPC9wPidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj48L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKHR4dClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoJChcIi5mYy1sZWZ0XCIpLmNoaWxkcmVuKFwiaDIuZHVyTW9udGhcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICQoXCJoMi5kdXJNb250aFwiKS5odG1sKCcgKCcrTWF0aC5mbG9vcihkdXJNb24vNjApKyfsi5zqsIQgJytkdXJNb24lNjArJ+u2hCknKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuZmMtbGVmdFwiKS5hcHBlbmQoJzxoMiBjbGFzcz1cImR1ck1vbnRoXCI+ICgnK01hdGguZmxvb3IoZHVyTW9uLzYwKSsn7Iuc6rCEICcrZHVyTW9uJTYwKyfrtoQpPC9oMj4nKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQgPSAnJzsgICAvL3ZhciDrubzrqLnsnYDqsbAg7JWE64uYLiDsnITsl5DshJwg7ISg7Ja4IO2WiOydjCFcclxuXHJcbiAgICAgICAgICAgIGxldCBmdWxsTW9udGhCb251cyA9IDMwNDAwO1xyXG4gICAgICAgICAgICBsZXQgaW5zdXJhbmNlRmVlID0gMDtcclxuICAgICAgICAgICAgbGV0IGJhc2ljID0gTWF0aC5yb3VuZChkdXJNb24vNjAqNzYwMClcclxuICAgICAgICAgICAgbGV0IGZ1bGxXZWVrQnVudXMgPSBNYXRoLnJvdW5kKChkdXJNb24vNjAqNzYwMCkqMC4yKVxyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7quLDrs7jquIk8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoYmFzaWMpKyBcIuybkDwvcD5cIlxyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7qt7zrrLTsi5zqsIQgWCA3LDYwMOybkDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7KO87Zy07IiY64u5PC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGZ1bGxXZWVrQnVudXMpICtcIuybkDwvcD5cIlxyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7quLDrs7jquInsnZggMjAlPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7sl7DssKjsiJjri7k8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoZnVsbE1vbnRoQm9udXMpICtcIuybkDwvcD5cIlxyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj417Iuc6rCEIOyDgeuLuSDquLDrs7jquIk8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZSBhdHRlbmRfX21vbnRoX19saW5lLS1yZWRcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7sgqztmozrs7Ttl5jro4w8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoaW5zdXJhbmNlRmVlKSArXCLsm5A8L3A+XCJcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6rWt66+87Jew6riIL+qzoOyaqeuztO2XmC/qsbTqsJXrs7Ttl5gg7LKt6rWs7JWhPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmUgYXR0ZW5kX19tb250aF9fbGluZS0tc3VtXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7ZWp6rOEPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGJhc2ljICsgZnVsbFdlZWtCdW51cyArIGZ1bGxNb250aEJvbnVzIC0gaW5zdXJhbmNlRmVlKSArXCLsm5A8L3A+XCJcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6riw67O46riJICsg7KO87Zy07IiY64u5ICsg7Jew7LCo7IiY64u5IC0g7IKs7ZqM67O07ZeY66OMPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX21vbnRoXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0V29ya0hvdXI6IGZ1bmN0aW9uKGRhdGVPYmope1xyXG4gICAgICAgIC8vIGNzczogbW9kdWxlcy9hdHRlbmQuY3NzXHJcbiAgICAgICAgbGV0IGRhdGVTaG9ydCA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoXCJNTS9ERFwiKTtcclxuICAgICAgICBsZXQgZGF0ZUlEID0gbW9tZW50KGRhdGVPYmopLmZvcm1hdChcIllZWVlNTUREXCIpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHt9XHJcbiAgICAgICAgaWYodGhpcy5hdHRlbmRPYmouYXR0ZW5kW2RhdGVJRF0pe1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5hdHRlbmRPYmouYXR0ZW5kW2RhdGVJRF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG5cclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYmxhY2tTY3JlZW5cIj4nXHJcbiAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cImlucHV0V2luZG93XCI+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8cCBjbGFzcz1cInRpdGxlXCI+JytkYXRlU2hvcnQrJyDqt7zrrLTsi5zqsIQ8L3A+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPidcclxuICAgICAgICBpZihkYXRhWzBdKXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cImZpcnN0X2Zyb21cIiB2YWx1ZT1cIicrZGF0YVswXS5mcm9tKydcIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwiZmlyc3RfdG9cIiB2YWx1ZT1cIicrZGF0YVswXS50bysnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPidcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cImZpcnN0X2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwiZmlyc3RfdG9cIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+J1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPidcclxuICAgICAgICBpZihkYXRhWzFdKXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCIgdmFsdWU9XCInK2RhdGFbMV0uZnJvbSsnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiIHZhbHVlPVwiJytkYXRhWzFdLnRvKydcIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+J1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwic2Vjb25kX2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwic2Vjb25kX3RvXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImJvdHRvbVwiPidcclxuICAgICAgICB0eHQrPSAgICAgICAgICAgJzxwIGNsYXNzPVwiY29uZmlybVwiIGRpZD1cIicrZGF0ZUlEKydcIj7tmZXsnbg8L3A+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgICAnPHAgY2xhc3M9XCJjbG9zZVwiPuy3qOyGjDwvcD4nXHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICc8L2Rpdj4nXHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tb2JpbGUpe1xyXG4gICAgICAgICAgICAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLkFueVBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICBkYXRlVGltZUZvcm1hdDpcIkhIOm1tXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjZmlyc3RfZnJvbVwiKS5mb2N1cygpO1xyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFdvcmtIb3VyOiBmdW5jdGlvbihkYXRlKXtcclxuXHJcbiAgICAgICAgbGV0IHdvcmsgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IGFsbEVtcHR5ID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5lcShpKS52YWwoKS5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgICAgICBhbGxFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihhbGxFbXB0eSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQrXCIvYXR0ZW5kL1wiK2RhdGUpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgIGxldCBkYXRlSUQgPSBkYXRlLnNsaWNlKDAsNCkgKyBcIi1cIitkYXRlLnNsaWNlKDQsNikgKyBcIi1cIitkYXRlLnNsaWNlKDYsOClcclxuICAgICAgICAgICAgJCgnLmZjLWRheVtkYXRhLWRhdGU9XCInK2RhdGVJRCsnXCJdJykuaHRtbChcIlwiKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYoJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcbiAgICAgICAgICAgIC8v7Iuc7J6R7Iuc6rCE7J20IOyemCDsnoXroKXrkJjsl4jrgpgg7ZmV7J24XHJcblxyXG4gICAgICAgICAgICBpZihkYXRlPG1vbWVudCgpLmZvcm1hdChcIk1NLUREXCIpKXtcclxuICAgICAgICAgICAgICAgIC8v7Jik64qYIOydtOyghCDsnbzsnZgg64Kg7Kec66W8IOuLpOujqOqzoCDsnojsnYQg6rK97JqwIC0g6re866y0IOyiheujjOyLnOqwhOydtCDsnoXroKXrkJjsp4Ag7JWK7Jy866m0IOyViCDrkKhcclxuICAgICAgICAgICAgICAgIGlmKCQoXCIjZmlyc3RfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL+ydtOyghOydvOydtCDslYTri4jrjZTrnbzrj4Qg7JiI7IOBIOq3vOustOyLnOqwhOydtOudvOuPhCDsnoXroKXtlbTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi7JiI7IOBIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZyb20gPSAkKFwiI2ZpcnN0X2Zyb21cIikudmFsKClcclxuICAgICAgICAgICAgbGV0IHRvID0gJChcIiNmaXJzdF90b1wiKS52YWwoKVxyXG5cclxuICAgICAgICAgICAgbGV0IGZyb21BID0gZnJvbS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgIGxldCB0b0EgPSB0by5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgIGxldCBkaWYgPSAodG9BWzBdKjEgLSBmcm9tQVswXSoxKSo2MCArICh0b0FbMV0qMSAtIGZyb21BWzFdKjEpXHJcblxyXG5cclxuICAgICAgICAgICAgd29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZyb206IGZyb20sXHJcbiAgICAgICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgICAgICBkaWY6IGRpZlxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYWxlcnQoXCLqt7zrrLTsi5zqsITsnbQg7J6Y66q7IOyeheugpeuQmOyXiOyKteuLiOuLpC4gSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmKCQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBpZigkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGU8bW9tZW50KCkuZm9ybWF0KFwiTU0tRERcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7Jik64qYIOydtOyghCDsnbzsnZgg64Kg7Kec66W8IOuLpOujqOqzoCDsnojsnYQg6rK97JqwIC0g6re866y0IOyiheujjOyLnOqwhOydtCDsnoXroKXrkJjsp4Ag7JWK7Jy866m0IOyViCDrkKhcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI3NlY29uZF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL+ydtOyghOydvOydtCDslYTri4jrjZTrnbzrj4Qg7JiI7IOBIOq3vOustOyLnOqwhOydtOudvOuPhCDsnoXroKXtlbTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDsmIjsg4Eg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmcm9tID0gJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKVxyXG4gICAgICAgICAgICAgICAgbGV0IHRvID0gJChcIiNzZWNvbmRfdG9cIikudmFsKClcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZnJvbUEgPSBmcm9tLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCB0b0EgPSB0by5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gKHRvQVswXSoxIC0gZnJvbUFbMF0qMSkqNjAgKyAodG9BWzFdKjEgLSBmcm9tQVsxXSoxKVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGZyb206IGZyb20sXHJcbiAgICAgICAgICAgICAgICAgICAgdG86IHRvLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpZjogZGlmXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg6re866y07Iuc6rCE7J20IOyemOuquyDsnoXroKXrkJjsl4jsirXri4jri6QuIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQrXCIvYXR0ZW5kL1wiK2RhdGUpLnNldCh3b3JrKTtcclxuICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwoXCJcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF0dGVuZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hdHRlbmQuanMiLCJpbXBvcnQgU3BvdCBmcm9tIFwiLi9jaXR5L3Nwb3QuanNcIjtcclxuXHJcbmxldCBDaXR5ID0ge1xyXG4gICAgY29kZURhdGE6IHt9LFxyXG5cclxuICAgIGNpdHlEYXRhOiB7fSxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLm9uKFwiY2xpY2tcIiwgXCIuc3BvdHNcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGNpZCA9ICQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpXHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5uYW1lXCIpLmh0bWwoKTtcclxuICAgICAgICAgICAgU3BvdC5pbml0KHRoYXQuY2l0eURhdGFbY2lkXSwgY2lkLCBuYW1lKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLmhlYWRlcl9fcmV0dXJuXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQucmV0dXJuVG9DaXR5VmlldygpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCIuc3BvdCAuY2hlY2tcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fcmVtYWluTGFyZ2VEYXRhXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0UmVtYWluTnVtYmVyKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19yZW1haW5OdW1iZXJcIikudmFsKCkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFJlbWFpbk51bWJlcjogZnVuY3Rpb24oc2l0ZSwgbnVtYmVyKXtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG4gICAgICAgIGxldCBjdXRObyA9IG51bWJlci50cmltKCkqMTtcclxuXHJcbiAgICAgICAgaWYoY3V0Tm88MTAwKXtcclxuICAgICAgICAgICAgdG9hc3QoXCIxMDDqsJwg7J207IOB7J2YIOyepeyGjOulvCDsnKDsp4DtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGNvbmZpcm0oXCLsiJzsnIQgXCIrIGN1dE5vICsgXCLsnIQg66+466eMIOyepeyGjOulvCDrqqjrkZAg7KCc6rGw7ZWp64uI64ukLiDrp57sirXri4jquYw/XCIpKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXRPYmogPSB0aGlzLmNpdHlEYXRhW2NpdHldLnNwb3RzW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgY3V0T2JqLmxlbmd0aCA9IGN1dE5vO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlKS5zZXQoY3V0T2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIHJldHVyblRvQ2l0eVZpZXc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJChcIi5jaXR5Q29kZVZpZXdcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmNpdHkgLnNwb3RcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmNpdHkgLnNwb3QgLmNoZWNrXCIpLmh0bWwoXCJcIilcclxuXHJcbiAgICAgICAgdGhpcy5pbmZsYXRlX2NpdHlDb2RlVmlldyh0aGlzLmNvZGVEYXRhLCB0aGlzLmNpdHlEYXRhKVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgaW5mbGF0ZV9jaXR5Q29kZVZpZXc6IGZ1bmN0aW9uKGNvZGVEYXRhLGRhdGEpe1xyXG4gICAgICAgIGxldCB0eHQgPSAnPGRpdiBjbGFzcz1cImxpbmUgdG9wXCI+PHAgY2xhc3M9XCJuYW1lXCI+64+E7Iuc66qFPC9wPjxwIGNsYXNzPVwiaG90ZWxzXCI+7IiZ7IaMPC9wPjxwIGNsYXNzPVwic3BvdHNcIj7qtIDqtJHsp4Ag7KCV66asPC9wPjxwIGNsYXNzPVwiYXJlYVwiPuyngOyXrTwvcD48cCBjbGFzcz1cInByaWNlXCI+66y86rCAPC9wPjwvZGl2PidcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvZGVEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaXR5ID0gY29kZURhdGFbaV07XHJcbiAgICAgICAgICAgIGlmKGRhdGFbY2l0eS5jb2RlXSl7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwibGluZVwiIGlkPVwiJytjaXR5LmNvZGUrJ1wiPjxwIGNsYXNzPVwibmFtZVwiPicrY2l0eS5uYW1lKyc8L3A+J1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbY2l0eS5jb2RlXS5ob3RlbHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cImhvdGVsc1wiPk88L3A+J1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwiaG90ZWxzXCI+WDwvcD4nXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVtjaXR5LmNvZGVdLnNwb3RzKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IGRhdGFbY2l0eS5jb2RlXS5zcG90c1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwb3QuY29tYmluZWQmJiFzcG90LmNvbWJpbmluZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInNwb3RzXCI+MeywqCDsnpDro4zsoJXrpqwg7JmE66OMPC9wPidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihzcG90LmNvbWJpbmluZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInNwb3RzXCI+642w7J207YSwIO2Vqey5mOq4sCDsnpHsl4XspJE8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJzcG90c1wiPuuNsOydtO2EsCDsiJjsp5EsIOqygOymneykkTwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbY2l0eS5jb2RlXS5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJhcmVhXCI+TzwvcD4nXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJhcmVhXCI+WDwvcD4nXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVtjaXR5LmNvZGVdLnByaWNlKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJwcmljZVwiPk88L3A+J1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicHJpY2VcIj5YPC9wPidcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0eHQrPSAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwibGluZVwiIGlkPVwiJytjaXR5LmNvZGUrJ1wiPjxwIGNsYXNzPVwibmFtZSBub2RhdGFcIj4nK2NpdHkubmFtZSsnPC9wPidcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJob3RlbHNcIj5YPC9wPjxwIGNsYXNzPVwic3BvdHNcIj7rjbDsnbTthLAg7JeG7J2MPC9wPjxwIGNsYXNzPVwiYXJlYVwiPlg8L3A+PHAgY2xhc3M9XCJwcmljZVwiPlg8L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5odG1sKHR4dClcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGlkLCBuYW1lLCBncmFkZSl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgJChcIi5sb2FkaW5nVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICAgICAgICAgIGxldCBjb2RlRGF0YSA9IHNuYXAudmFsKCkuc2V0dGluZy5jaXRpZXM7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKS5jaXRpZXNcclxuICAgICAgICAgICAgdGhpcy5jaXR5RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuY29kZURhdGEgPSBjb2RlRGF0YTtcclxuICAgICAgICAgICAgdGhpcy5pbmZsYXRlX2NpdHlDb2RlVmlldyhjb2RlRGF0YSwgZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaXR5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkuanMiLCJpbXBvcnQgTWFudWFsQ29tYmluZSBmcm9tIFwiLi9tYW51YWxDb21iaW5lLmpzXCI7XHJcblxyXG5sZXQgU3BvdCA9IHtcclxuXHJcbiAgICBkYXRhOnt9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19jb25maXJtXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuaW5wdXRDb29yZGluYXRlKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19zcG90Q29vclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19zcG90RGVsZXRlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsZXRlU3BvdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fc3BvdE5hbWVcIikuaHRtbCgpKTtcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEsIGNpZCwgbmFtZSl7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5jaXR5IC5zcG90XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5jaXR5TmFtZVwiKS5odG1sKG5hbWUpLmF0dHIoXCJpZFwiLCBjaWQpO1xyXG5cclxuICAgICAgICBpZihkYXRhLnNwb3RzLmNvbWJpbmVkICYmICFkYXRhLnNwb3RzLmNvbWJpbmluZyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiMeywqCDsnpDro4zsoJXrpqwg7JmE66OMXCIpXHJcbiAgICAgICAgICAgIC8vY29tYmluZWTqsIAg7J6I6rOgIGNvbWJpbmluZ+ydtCDsl4bsnLzrqbQgMeywqCDsnpDro4zsoJXrpqwg7JmE66OM652864qUIOucu1xyXG5cclxuICAgICAgICB9ZWxzZSBpZiAoZGF0YS5zcG90cy5jb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLtlansuZjquLAg7J6R7JeF7KSRXCIpXHJcbiAgICAgICAgICAgIC8vY29tYmluaW5n7J20IOyeiOycvOuptCDtlansuZjquLAg7J6R7JeF7KSR7J20652864qUIOucu1xyXG4gICAgICAgICAgICBNYW51YWxDb21iaW5lLmluaXQoZGF0YS5zcG90cyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RDaGVjayhkYXRhLnNwb3RzKTsgLy9jb21iaW5pbmcsIGNvbWJpbmVk6rCAIOyXhuycvOuptCDrjbDsnbTthLAg7IiY7KeRLCDqsoDspp3spJHsnbTrnbzripQg65y7XHJcbiAgICAgICAgICAgIC8vZmlyc3RjaGVja+ulvCDthrXqs7ztlZjrqbQgdGhpcy5hdXRvQ29tYmluZeydhCDthrXtlbQgZGF0YS5zcG90cy5jb21iaW5pbmfsnbQg66eM65Ok7Ja07KeQXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhdXRvQ29tYmluZV9fc3BvdFJlc3RydWN0dXJlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGVBcnIgPSBbXCJnZ1wiLFwibHBcIixcIm52XCIsXCJ0YVwiXTtcclxuICAgICAgICBsZXQgY29tYmluaW5nID0ge307XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhLnNwb3RzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpdGVBcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpdGUgPSBzaXRlQXJyW2pdO1xyXG4gICAgICAgICAgICBpZihkYXRhW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbc2l0ZV0ubm9EYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbc2l0ZV1baV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFNwb3QgPSBkYXRhW3NpdGVdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/quLDsobQg7KCV67O066W8IG9sZFNwb3TsnbTrnbzqs6Ag7ZWY7J6QLiDsg4jroZzsmrQg7Iqk7Yyf7KCV67O07JeQ64qUIOydtOumhOydhCDtlZwv7JiB7Jy866GcIOu2hO2VoO2VmOqzoCDrnq3tgrnsnYQg67aA7Jes7ZWgIOqyg+ydtOuLpC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga286XCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW46XCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcjogb2xkU3BvdC5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6e1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvW+qwgC3tnqNdLy50ZXN0KG9sZFNwb3QubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm5hbWUua28gPSBvbGRTcG90Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5lbiA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QucmFua1tzaXRlXSA9IGk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYob2xkU3BvdC51cmwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudXJsID0gb2xkU3BvdC51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvbGRTcG90LnRhZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC50YWcgPSBvbGRTcG90LnRhZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb3VudGVyPDEwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzMDBcIitjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjb3VudGVyPDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczBcIitjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzXCIrY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IC8v7ZWc67CU7YC0IOuPjOyVmOuLuVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hdXRvQ29tYmluZV9fY29tYmluZShjb21iaW5pbmcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhdXRvQ29tYmluZV9fY29tYmluZTogZnVuY3Rpb24oY29tYmluaW5nKXtcclxuICAgICAgICAvLyBUT0RPOiDrgZ3rgpjrqbQg7ZWp7LmY6riwIOyekeyXhSDtmZTrqbQgaW5mbGF0Ze2VmOq4sFxyXG5cclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG5cclxuICAgICAgICBsZXQgY29tYmluZU9iaiA9IHt9XHJcbiAgICAgICAgbGV0IGNvbWJpbmVkID0ge31cclxuXHJcbiAgICAgICAgZm9yICh2YXIgY29kZSBpbiBjb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSBjb21iaW5pbmdbY29kZV07XHJcbiAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0gPSBzcG90XHJcbiAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0uY29tYmluZSA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgaGFzQ29tYmluZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy/tlansuaAg6rKD7J20IOyXhuycvOuptCDrsJTroZwgY29tYmluZWQg7Kq97Jy866GcIOuztOuCuOuLpC5cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHRDb2RlIGluIGNvbWJpbmluZykge1xyXG4gICAgICAgICAgICAgICAgaWYoY29kZTx0Q29kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRTcG90ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbWJpbmluZ1t0Q29kZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdFNwb3Rba2V5XSA9IGNvbWJpbmluZ1t0Q29kZV1ba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGNhbGN1bGF0ZURpZihzcG90LmNvb3IsIHRTcG90LmNvb3IpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRpZjwyNTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmVbdENvZGVdID0gdFNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NvbWJpbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFoYXNDb21iaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb21iaW5lZFtjb2RlXSA9IGNvbWJpbmVPYmpbY29kZV07XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29tYmluZU9ialtjb2RlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2l0eStcIi9zcG90c1wiKS5zZXQoe1xyXG4gICAgICAgICAgICBjb21iaW5pbmc6Y29tYmluZU9iaixcclxuICAgICAgICAgICAgY29tYmluZWQ6Y29tYmluZWRcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBNYW51YWxDb21iaW5lLmluaXQoe1xyXG4gICAgICAgICAgICBjb21iaW5pbmc6Y29tYmluZU9iaixcclxuICAgICAgICAgICAgY29tYmluZWQ6Y29tYmluZWRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZVNwb3Q6IGZ1bmN0aW9uKHNpZCwgbmFtZSl7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICBsZXQgc2l0ZSA9IHNpZC5zcGxpdChcIl9cIilbMF07XHJcbiAgICAgICAgbGV0IG5vID0gc2lkLnNwbGl0KFwiX1wiKVsxXTtcclxuXHJcbiAgICAgICAgaWYoY29uZmlybShuYW1lICsgXCIg7J6l7IaM66W8IOygnOqxsO2VqeuLiOuLpC4g6rOE7IaN7ZWg6rmM7JqUP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubyApLnNldCh7ZGVsZXRlZDogdHJ1ZX0pO1xyXG4gICAgICAgICAgICAkKFwiI1wiK3NpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi7J6l7IaM6rCAIOygnOqxsOuQmOyXiOyKteuLiOuLpC5cIilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0Q29vcmRpbmF0ZTogZnVuY3Rpb24oc2lkLCBjb29yVHh0KXtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlID0gc2lkLnNwbGl0KFwiX1wiKVswXTtcclxuICAgICAgICBsZXQgbm8gPSBzaWQuc3BsaXQoXCJfXCIpWzFdO1xyXG4gICAgICAgIGxldCBjb29yID0ge307XHJcblxyXG4gICAgICAgIGlmKGNvb3JUeHQuc3BsaXQoXCIsXCIpLmxlbmd0aCA9PT0gMil7XHJcbiAgICAgICAgICAgIGxldCBsYXQgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVswXS50cmltKCkqMTtcclxuICAgICAgICAgICAgbGV0IGxuZyA9IGNvb3JUeHQuc3BsaXQoXCIsXCIpWzFdLnRyaW0oKSoxO1xyXG5cclxuICAgICAgICAgICAgaWYoaXNOYU4obGF0KXx8aXNOYU4obG5nKSl7XHJcbiAgICAgICAgICAgICAgICAvL+yijO2RnCDspJEg7ZWY64KY6rCAXHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyijO2RnOqwgCDrtoDsoJXtmZXtlZjqsowg7J6F66Cl65CY7JeI7Iq164uI64ukXCIpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29vciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6IGxhdCxcclxuICAgICAgICAgICAgICAgICAgICBsbmc6IGxuZ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg7J6F66Cl65CY7JeI7Iq164uI64ukXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNcIitzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUgKyBcIi9cIiArIG5vICsgXCIvY29vclwiKS5zZXQoY29vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg67aA7KCV7ZmV7ZWY6rKMIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlyc3RDaGVjazogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG4gICAgICAgICQoXCIuaGVhZGVyX19zdGF0dXNcIikuaHRtbChcIuuNsOydtO2EsCDqsoDspp3spJFcIilcclxuICAgICAgICBsZXQgaGFzUHJvYmxlbT0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgbGV0IHNlYXJjaFVybCA9ICdodHRwczovL3d3dy5nb29nbGUuY28ua3IvbWFwcy9wbGFjZS8nICsgJChcIi5jaXR5TmFtZVwiKS5odG1sKCkgK1wiK1wiXHJcblxyXG4gICAgICAgIGxldCBzaXRlT2JqID0ge1xyXG4gICAgICAgICAgICBnZzogXCLqtazquIBcIixcclxuICAgICAgICAgICAgbnY6IFwi64Sk7J2067KEXCIsXHJcbiAgICAgICAgICAgIHRhOiBcIu2KuOumveyWtOuTnOuwlOydtOyggFwiLFxyXG4gICAgICAgICAgICBscDogXCLroaDrpqztlIzrnpjri5tcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiBzaXRlT2JqKSB7XHJcbiAgICAgICAgICAgIGxldCBzaXRlSGFzUHJvYmxlbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub0Nvb3JUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7sooztkZzqsIAg7J6F66Cl65CY7KeAIOyViuydgCDqtIDqtJHsp4DqsIAg7J6I7Iq164uI64ukPC9wPic7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vU3BvdFR4dCA9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZVwiPuu5hOyWtOyeiOuKlCDqtIDqtJHsp4DqsIAg7J6I7Iq164uI64ukPC9wPic7XHJcblxyXG4gICAgICAgICAgICBpZihkYXRhW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiY2hlY2tfX3RpdGxlXCI+JytzaXRlT2JqW3NpdGVdKycg642w7J207YSwIO2ZleyduDwvcD4nXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbc2l0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IGRhdGFbc2l0ZV1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3BvdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYXNDb29yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BvdC5kZWxldGVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v7J2867aA65+sIOyCreygnO2VnCDqtIDqtJHsp4AgLT4g64SY7Ja06rCE64ukXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BvdC5jb29yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzcG90LmNvb3IubG5nKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNOYU4oc3BvdC5jb29yLmxuZyoxKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BvdC5jb29yLmxhdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzTmFOKHNwb3QuY29vci5sYXQqMSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWhhc0Nvb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCs9JzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJytzaXRlKydfJytpKydcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0Kz0gICAnPGEgY2xhc3M9XCJjaGVja19fc3BvdE5hbWVcIiBocmVmPVwiJytzZWFyY2hVcmwrc3BvdC5uYW1lKydcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nK3Nwb3QubmFtZSsnPC9hPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQrPSAgICc8aW5wdXQgY2xhc3M9XCJjaGVja19fc3BvdENvb3JcIiBwbGFjZWhvbGRlcj1cInh4Lnh4eHh4LCB4eC54eHh4eCDtmJXtg5wg7J6F66ClXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCs9ICAgJzxwIGNsYXNzPVwiY2hlY2tfX2NvbmZpcm1cIj7sooztkZwg7J6F66ClPC9wPjxwIGNsYXNzPVwiY2hlY2tfX3Nwb3REZWxldGVcIj7snqXshowg7IKt7KCcPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZUhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCs9JzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJytzaXRlKydfJytpKydcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCs9ICAgJzxwIGNsYXNzPVwiY2hlY2tfX3R4dFwiPicraSsnIOuyiCDqtIDqtJHsp4A8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQrPSAgICc8cCBjbGFzcz1cImNoZWNrX19zcG90RGVsZXRlXCI+7J6l7IaMIOyCreygnDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCs9JzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobm9Db29yKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gbm9Db29yVHh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobm9TcG90KXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gbm9TcG90VHh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbc2l0ZV0ubGVuZ3RoPjE1MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhcmdlT0sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEubGFyZ2VEYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5sYXJnZURhdGFbc2l0ZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8xNTDqsJwg7J207IOB7J2YIOuNsOydtO2EsOulvCDrs7TsnKDtlZjroKTrqbQg64+E7Iuc66qFL3Nwb3RzL2xhcmdlRGF0YS/sgqzsnbTtirjrqoXsnbQgdHJ1ZeudvOqzoCDrtoDsl6zrkJjslrTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFyZ2VPSyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFsYXJnZU9LKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj4nK3NpdGVPYmpbc2l0ZV0rJyDsnqXshowg642w7J207YSw6rCAIDE1MOqwnOulvCDstIjqs7woJytkYXRhW3NpdGVdLmxlbmd0aCsn6rCcKe2VqeuLiOuLpC48L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicrc2l0ZSsnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8aW5wdXQgY2xhc3M9XCJjaGVja19fcmVtYWluTnVtYmVyXCIgdmFsdWU9XCInK2RhdGFbc2l0ZV0ubGVuZ3RoKydcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiPuqwnOydmCDsnqXshowg7Jyg7KeA7ZWY6riwPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiY2hlY2tfX3RpdGxlXCI+JytzaXRlT2JqW3NpdGVdKycg642w7J207YSw6rCAIOyhtOyerO2VmOyngCDslYrsirXri4jri6QuPC9wPidcclxuICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2l0ZUhhc1Byb2JsZW0gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IOybkOuemCDsgqzsnbTtirgg642w7J207YSw6rCAIOyhtOyerO2VmOyngCDslYrripQg6rK97Jqw66W8IOuMgOu5hO2VnCDrsoTtirzsnYQg66eM65Ok6rOgIHNpdGUg6rCS7Jy866GcIG5vZGF0YTogdHJ1ZeulvCDrhKPslrTspIDri6QuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXNpdGVIYXNQcm9ibGVtKXtcclxuICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZVwiPuuwnOqyrOuQnCDrrLjsoJzqsIAg7JeG7Iq164uI64ukPC9wPidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaGFzUHJvYmxlbSl7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fZmluaXNoXCI+6rKA7IKs66W8IOuqqOuRkCDrp4jss6TsirXri4jri6Q8L3A+J1xyXG4gICAgICAgICAgICAkKFwiLnNwb3QgLmNoZWNrXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9hc3QoXCLrsJzqsqzrkJwg66y47KCc6rCAIOyXhuyWtCDrjbDsnbTthLAg67OR7ZWp7J2EIOyLpOyLnO2VqeuLiOuLpC5cIilcclxuICAgICAgICAgICAgdGhpcy5hdXRvQ29tYmluZV9fc3BvdFJlc3RydWN0dXJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcG90O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvc3BvdC5qcyIsImxldCBNYW51YWxDb21iaW5lID0ge1xyXG4gICAgbWFwOiB7fSxcclxuICAgIG1hcmtlcjoge1xyXG4gICAgICAgIHByaW1lOnt9LFxyXG4gICAgICAgIHRhcmdldDpbXVxyXG4gICAgfSxcclxuICAgIGRhdGE6e30sXHJcbiAgICByZW1haW46MCxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuY29tYmluZV9fdGFyZ2V0XCIpLm9uKFwiY2xpY2tcIiwgXCIuY29tYmluZV9fdGFyZ2V0X19kaXZcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcIi5jb21iaW5lX190YXJnZXRfX2NoZWNrXCIpLnRvZ2dsZUNsYXNzKFwiY29tYmluZV9fdGFyZ2V0X19jaGVja2VkXCIpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCIuY29tYmluZV9fbWFpblwiKS5vbihcImNsaWNrXCIsXCIuY29tYmluZV9fbmV4dFN0ZXBcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5uZXh0U3RlcCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIG5leHRTdGVwOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIik7XHJcblxyXG4gICAgICAgIGxldCBtYWluRGF0YSA9IHRoaXMuZGF0YS5jb21iaW5pbmdbJChcIi5jb21iaW5lX19tYWluXCIpLmF0dHIoXCJpZFwiKV07XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5jb21iaW5lX190YXJnZXRfX2NoZWNrZWRcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRpZCA9ICQoXCIuY29tYmluZV9fdGFyZ2V0X19jaGVja2VkXCIpLmVxKGkpLmF0dHIoXCJzaWRcIilcclxuICAgICAgICAgICAgbGV0IHRhcmdldERhdGEgPSBtYWluRGF0YS5jb21iaW5lW3RpZF07XHJcblxyXG4gICAgICAgICAgICAvL+2VqeyzkOyniCDrjIDsg4HsnZggcmFua+ulvCBtYWluZERhdGHsnZggcmFua+uhnCDthrXtlantlZjripQg7J6R7JeFXHJcbiAgICAgICAgICAgIGZvciAodmFyIHNpdGUgaW4gdGFyZ2V0RGF0YS5yYW5rKSB7XHJcbiAgICAgICAgICAgICAgICBpZihtYWluRGF0YS5yYW5rW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihtYWluRGF0YS5yYW5rW3NpdGVdID4gdGFyZ2V0RGF0YS5yYW5rW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEucmFua1tzaXRlXSA9IHRhcmdldERhdGEucmFua1tzaXRlXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS5yYW5rW3NpdGVdID0gdGFyZ2V0RGF0YS5yYW5rW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+2VqeyzkOyniCDrjIDsg4HsnZgg7YOc6re466W8IG1haW5EYXRh7J2YIHRhZ+uhnCDthrXtlantlZjripQg7J6R7JeFXHJcbiAgICAgICAgICAgIGlmKHRhcmdldERhdGEudGFnKXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGFyZ2V0RGF0YS50YWcubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihtYWluRGF0YS50YWcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighbWFpbkRhdGEudGFnLmluY2x1ZGVzKHRhcmdldERhdGEudGFnW2pdKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS50YWcucHVzaCh0YXJnZXREYXRhLnRhZ1tqXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS50YWcgPSB0YXJnZXREYXRhLnRhZ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7JeQ6rKMIHVybOydtCDsnoXroKXrkJjslrQg7J6I64uk66m0IG1haW5EYXRh7JeQIO2Gte2Vqe2VmOuKlCDsnpHsl4VcclxuICAgICAgICAgICAgaWYoIW1haW5EYXRhLnVybCl7XHJcbiAgICAgICAgICAgICAgICBpZih0YXJnZXREYXRhLnVybCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudXJsID0gdGFyZ2V0RGF0YS51cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEuY29tYmluaW5nW3RpZF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1haW5EYXRhLm5hbWUua28gPSAkKFwiI25hbWVfa29cIikudmFsKCk7XHJcbiAgICAgICAgbWFpbkRhdGEubmFtZS5lbiA9ICQoXCIjbmFtZV9lblwiKS52YWwoKTtcclxuXHJcbiAgICAgICAgZGVsZXRlIG1haW5EYXRhLmNvbWJpbmU7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YS5jb21iaW5lZFskKFwiLmNvbWJpbmVfX21haW5cIikuYXR0cihcImlkXCIpXSA9IHRoaXMuZGF0YS5jb21iaW5pbmdbJChcIi5jb21iaW5lX19tYWluXCIpLmF0dHIoXCJpZFwiKV07XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZGF0YS5jb21iaW5pbmdbJChcIi5jb21iaW5lX19tYWluXCIpLmF0dHIoXCJpZFwiKV07XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpdHkrXCIvc3BvdHNcIikudXBkYXRlKHRoaXMuZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVtYWluIC0tO1xyXG4gICAgICAgIGlmKHRoaXMucmVtYWluPjApe1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGUoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLsnpHsl4XsmYTro4whXCIpXHJcbiAgICAgICAgICAgIC8vIFRPRE86IOyekeyXheyZhOujjO2WiOycvOuptCDrjbDsnbTthLDsoJXrpqwg65Ok7Ja06rCA6riwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZVwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZS5jb21iaW5lXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5oZWFkZXJfX3N0YXR1c1wiKS5odG1sKFwi6rSA6rSR7KeAIO2Vqey5mOq4sFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiA0MC43NDg0NCwgbG5nOiAtNzMuOTg1NjYgfSxcclxuICAgICAgICAgICAgem9vbTogMTcsXHJcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHRoYXQuY2hvb3NlQ29vcmRpbmF0ZShlKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmluZmxhdGUoKTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNob29zZUNvb3JkaW5hdGU6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQoXCIuY29tYmluZV9fY29vcmRpbmF0ZVwiKS5odG1sKGUubGF0TG5nLmxhdCgpK1wiLFwiK2UubGF0TG5nLmxuZygpKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXIucHJpbWUuc2V0TWFwKG51bGwpXHJcbiAgICAgICAgdGhpcy5tYXJrZXIucHJpbWUgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGUubGF0TG5nLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YS5jb21iaW5pbmc7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgLy/quLDsobTsl5Ag7LCN7ZiA7J6I642YIOuniOy7pOulvCDsoJzqsbDtlZzri6RcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcclxuICAgICAgICB0aGlzLnJlbWFpbiA9IGtleXMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBzcG90ID0gZGF0YVtrZXlzWzBdXTtcclxuICAgICAgICAkKFwiLmNvbWJpbmVfX21haW5cIikuYXR0cihcImlkXCIsIGtleXNbMF0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhzcG90KVxyXG4gICAgICAgIC8v7J2066aEIOq0gOugqCDsoJXrs7Qg7ZGc7IucXHJcbiAgICAgICAgaWYoc3BvdC5uYW1lLmtvLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJjb21iaW5lX19uYW1lX19wcmltZVwiPuq4sOykgCDsnqXshozrqoU6ICcrIHNwb3QubmFtZS5rbyArJzwvcD4nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImNvbWJpbmVfX25hbWVfX3ByaW1lXCI+6riw7KSAIOyepeyGjOuqhTogJysgc3BvdC5uYW1lLmVuICsnPC9wPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJjb21iaW5lX19wcmltZVwiPidcclxuICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwiY29tYmluZV9fcHJpbWVfX2xlZnRcIj4nXHJcbiAgICAgICAgdHh0Kz0gICAgICAnPGRpdiBjbGFzcz1cImNvbWJpbmVfX2xpbmVcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPu2VnOq4gOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImNvbWJpbmVfX2lucHV0XCIgaWQ9XCJuYW1lX2tvXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5rbysnXCI+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICAgICc8ZGl2IGNsYXNzPVwiY29tYmluZV9fbGluZVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPuyYgeusuOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImNvbWJpbmVfX2lucHV0XCIgaWQ9XCJuYW1lX2VuXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5lbisnXCI+J1xyXG4gICAgICAgIHR4dCs9ICAgICAnPC9kaXY+J1xyXG4gICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNvbWJpbmVfX25leHRTdGVwXCI+64uk7J2MPC9wPidcclxuICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG5cclxuICAgICAgICAvL+yijO2RnCDqtIDroKgg7KCV67O0IO2RnOyLnFxyXG4gICAgICAgIHNwb3QuY29vci5sYXQgPSBzcG90LmNvb3IubGF0KjE7XHJcbiAgICAgICAgc3BvdC5jb29yLmxuZyA9IHNwb3QuY29vci5sbmcqMTtcclxuICAgICAgICB0aGlzLm1hcmtlci5wcmltZSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogc3BvdC5jb29yLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tYXAucGFuVG8oc3BvdC5jb29yKTtcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY29tYmluZV9fbGluZVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPuyijO2RnCc7XHJcbiAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJjb21iaW5lX19jb29yZGluYXRlXCI+Jysgc3BvdC5jb29yLmxhdCArXCIsXCIrc3BvdC5jb29yLmxuZyArJzwvcD4nO1xyXG4gICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIuY29tYmluZV9fbWFpblwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgICAgIHR4dD0nJztcclxuICAgICAgICBsZXQgaWR4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2lkIGluIHNwb3QuY29tYmluZSkge1xyXG4gICAgICAgICAgICBpZHgrKztcclxuICAgICAgICAgICAgbGV0IHRTcG90ID0gc3BvdC5jb21iaW5lW3NpZF07XHJcblxyXG4gICAgICAgICAgICBsZXQgbGF0bG5nID0ge1xyXG4gICAgICAgICAgICAgICAgbGF0OiB0U3BvdC5jb29yLmxhdCoxLFxyXG4gICAgICAgICAgICAgICAgbG5nOiB0U3BvdC5jb29yLmxuZyoxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHRNYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOmxhdGxuZyxcclxuICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogaWR4LnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnRhcmdldC5wdXNoKHRNYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgLy/rs7jrqoXsnLzroZwg7ZWc6riA66qFIOyYgeyWtOuqheydtCDsl4bsnYQg6rK97Jqw66W8IOyytO2BrO2VtOyEnCDrhKPslrTspIDri6QuXHJcbiAgICAgICAgICAgIGlmKCQoXCIjbmFtZV9rb1wiKS52YWwoKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYW1lX2tvXCIpLnZhbCh0U3BvdC5uYW1lLmtvKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCQoXCIjbmFtZV9lblwiKS52YWwoKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYW1lX2VuXCIpLnZhbCh0U3BvdC5uYW1lLmVuKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY29tYmluZV9fdGFyZ2V0X19kaXZcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiY29tYmluZV9fdGFyZ2V0X19udW1iZXJcIj4nK2lkeCsnPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cImNvbWJpbmVfX3RhcmdldF9fY2hlY2tcIiBzaWQ9XCInK3NpZCsnXCI+PC9kaXY+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNvbWJpbmVfX3RhcmdldF9fbmFtZVwiPicrdFNwb3QubmFtZS5rbytcIiBcIit0U3BvdC5uYW1lLmVuKyc8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmNvbWJpbmVfX3RhcmdldFwiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbnVhbENvbWJpbmU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9tYW51YWxDb21iaW5lLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==