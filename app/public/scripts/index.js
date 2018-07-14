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

var _subway = __webpack_require__(8);

var _subway2 = _interopRequireDefault(_subway);

var _account = __webpack_require__(9);

var _account2 = _interopRequireDefault(_account);

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
$("#nav_subway").click(function () {
    $("header li").removeClass("--selected");
    $(this).addClass("--selected");
    $(".pages").addClass("displayNone");
    $(".pages.subway").removeClass("displayNone");
    _subway2.default.init();
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
                        if (u_i.grade === 5) {
                            _account2.default.init(user.mail);
                        }
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

    viewID: "",
    //관리자가 다른 사람의 ID 확인중

    attendObj: {},

    salary: {},

    weekdays: ["일", "월", "화", "수", "목", "금", "토", "일"],

    init: function init(id, name, grade) {
        var _this = this;

        var that = this;

        this.id = id;

        firebase.database().ref("account/salary").once("value", function (snap) {
            that.salary = snap.val();

            if (grade === 5) {
                $(".worker_selector").removeClass("displayNone");
                firebase.database().ref("users").once("value", function (snap) {
                    $(".loadingView").addClass("displayNone");
                    var users = snap.val();
                    var txt = '';
                    for (var mailID in users) {
                        txt += '<option value="' + mailID + '">' + users[mailID].name + '</option>';
                    }
                    $(".worker_selector").html(txt).val(id).prop("selected", true);
                });
            } else {
                firebase.database().ref("attend/" + _this.id).on("value", function (snap) {
                    $(".loadingView").addClass("displayNone");
                    _this.attendObj = snap.val();
                    that.inflate_calendar(that.attendObj);

                    if (!$(".fc-header-toolbar").length) {
                        $('#calendar').fullCalendar({
                            height: 564,
                            firstDay: 1,
                            viewRender: function viewRender(view, element) {
                                that.inflate_calendar(that.attendObj);
                            },
                            dayClick: function dayClick(date) {
                                that.inputWorkHour(date);
                            }
                        });
                    }
                });
            }
        });

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

        $(".worker_selector").change(function () {
            var id = $(this).val();

            that.view_worker(id);
        });
    },

    view_worker: function view_worker(id) {
        var that = this;

        if (id === that.id) {
            $(".attend__calendar").addClass("displayNone");
            $(".attend__week").html("");
            $(".attend__month").html("");
        } else {
            $(".attend__calendar").removeClass("displayNone");
            if (that.viewID.length > 0) {
                firebase.database().ref("attend/" + that.viewID).off();
            }

            firebase.database().ref("attend/" + id).on("value", function (snap) {
                that.attendObj = snap.val();
                var yo = that.viewID;
                that.viewID = id;

                if (yo.length === 0) {
                    $('#calendar').fullCalendar({
                        height: 564,
                        firstDay: 1,
                        viewRender: function viewRender(view, element) {
                            if (that.id !== that.viewID) {
                                that.inflate_calendar(that.attendObj);
                            }
                        },
                        dayClick: function dayClick(date) {
                            that.inputWorkHour(date);
                        }
                    });
                } else {
                    that.inflate_calendar(that.attendObj);
                }
            });
        }
    },

    inflate_calendar: function inflate_calendar(data) {
        $(".attend").removeClass("displayNone");
        $(".fc-day").html("");

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
            var thisMonth = '';
            for (var i = 0; i < $(".attend .fc-day").length; i++) {
                var dateDom = $(".attend .fc-day").eq(i);
                if (!dateDom.hasClass("fc-other-month")) {
                    var _date = dateDom.attr("data-date").split("-");
                    thisMonth = _date[0] + _date[1];
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

            // if(this.id === this.viewID){
            //     //본인 모드
            //     firebase.database().ref("account/salary/"+thisMonth+"/"+this.id).update({
            //         basic: basic,
            //         fullWeekBunus: fullWeekBunus,
            //         fullMonthBonus: fullMonthBonus
            //     });
            // }else{
            //     firebase.database().ref("account/salary/"+thisMonth+"/"+this.viewID).update({
            //         basic: basic,
            //         fullWeekBunus: fullWeekBunus,
            //         fullMonthBonus: fullMonthBonus
            //     });
            // }

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
            if (this.viewID.length > 0) {
                firebase.database().ref("attend/" + this.viewID + "/attend/" + date).remove();
            } else {
                firebase.database().ref("attend/" + this.id + "/attend/" + date).remove();
            }

            $(".modal").html("");
            var dateID = date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
            $('.fc-day[data-date="' + dateID + '"]').html("");
            return false;
        }

        if ($("#first_from").val() < "23:59" && $("#first_from").val() > "08:00") {
            //시작시간이 잘 입력되었나 확인

            if (date < moment().format("YYYYMMDD")) {
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

                if (date < moment().format("YYYYMMDD")) {
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
        if (this.viewID.length > 0) {
            firebase.database().ref("attend/" + this.viewID + "/attend/" + date).set(work);
        } else {
            firebase.database().ref("attend/" + this.id + "/attend/" + date).set(work);
        }

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

var _hotel = __webpack_require__(6);

var _hotel2 = _interopRequireDefault(_hotel);

var _area = __webpack_require__(7);

var _area2 = _interopRequireDefault(_area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//지역 데이터 입력

//관광지 정리
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
        $(".cityCodeView").on("click", ".hotels", function () {
            var cid = $(this).parent().attr("id");
            var name = $(this).parent().children(".name").html();
            _hotel2.default.init(that.cityData[cid], cid, name);
        });
        $(".cityCodeView").on("click", ".area", function () {
            var cid = $(this).parent().attr("id");
            var name = $(this).parent().children(".name").html();
            _area2.default.init(that.cityData[cid], cid, name);
        });

        $(".cityCodeView").on("click", ".transport", function () {
            that.metroAdjust($(this).parent().attr("id"));
            //도시별로 메트로 정보를 다듬는데 사용
        });

        $(".header__return").click(function () {
            that.returnToCityView();
        });
    },

    returnToCityView: function returnToCityView() {
        $(".city__pages").addClass("displayNone");
        $(".cityCodeView").removeClass("displayNone");
        $(".city .spot .check").html("");

        this.inflate_cityCodeView(this.codeData, this.cityData);
    },

    metroAdjust: function metroAdjust(cid) {
        if (this.cityData[cid].metro) {
            var data = this.cityData[cid].metro;
            var nameArray = [];
            for (var i = 0; i < data.length; i++) {
                var metro = data[i];
                if (!metro.line) {
                    console.log(metro.name);
                }
            }
            console.log(data);
            // firebase.database().ref("cities/"+cid+"/metro").update(data);
        }
    },

    inflate_cityCodeView: function inflate_cityCodeView(codeData, data) {
        var txt = '<div class="line top"><p class="name">도시명</p><p class="hotels">숙소</p><p class="spots">관광지 정리</p><p class="area">지역</p><p class="transport">교통</p><p class="price">물가</p></div>';
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

                    if (data[city.code].status) {
                        if (data[city.code].status.spots === "finished") {
                            txt += '<p class="spots">데이터 확보 완료</p>';
                        } else if (data[city.code].status.spots === "verifying") {
                            txt += '<p class="spots">데이터 선별, 2차 검증중</p>';
                        } else if (spot.combining) {
                            txt += '<p class="spots">데이터 합치기 작업중</p>';
                        } else {
                            txt += '<p class="spots">데이터 수집, 1차 검증중</p>';
                        }
                    } else if (spot.combining) {
                        txt += '<p class="spots">데이터 합치기 작업중</p>';
                    } else {
                        txt += '<p class="spots">데이터 수집, 1차 검증중</p>';
                    }
                }

                if (!data[city.code].status) {
                    firebase.database().ref("cities/" + city.code + "/status").set({
                        spots: false
                    });
                }

                if (data[city.code].area) {
                    txt += '<p class="area">O</p>';
                } else {
                    txt += '<p class="area">X</p>';
                }
                if (data[city.code].metro) {
                    txt += '<p class="transport">O</p>';
                } else {
                    txt += '<p class="transport">X</p>';
                }

                if (data[city.code].price) {
                    txt += '<p class="price">O</p>';
                } else {
                    txt += '<p class="price">X</p>';
                }

                txt += '</div>';
            } else {
                txt += '<div class="line" id="' + city.code + '"><p class="name nodata">' + city.name + '</p>';
                txt += '<p class="hotels">X</p><p class="spots">데이터 없음</p><p class="area">X</p><p class="transport">X</p><p class="price">X</p></div>';
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
            console.log(data);
        });
    }
};
//호텔정보 관련
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

var _verifying = __webpack_require__(5);

var _verifying2 = _interopRequireDefault(_verifying);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Spot의 단계는 총 4단계 - 데이터 수집/1차검증 -> 데이터 합치기 -> 데이터 선별/2차검증 -> 완료

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

        $(".spot .check").on("click", ".check__remainLargeData", function () {
            that.setRemainNumber($(this).parent().attr("id"), $(this).parent().children(".check__remainNumber").val());
        });
    },

    init: function init(data, cid, name) {
        this.listener();
        this.data = data;

        $(".cityCodeView").addClass("displayNone");
        $(".city .spot").removeClass("displayNone");
        $(".cityName").html(name).attr("id", cid);

        if (data.status) {
            if (data.status.spots === "finished") {
                console.log("데이터 확보 완료");
            } else if (data.status.spots === "verifying") {
                console.log("데이터 선별, 2차 검증중");
                _verifying2.default.init(data.spots.combined);
                //combined가 있고 combining이 없으면 1차 자료정리 완료라는 뜻
            } else if (data.spots.combining) {
                console.log("합치기 작업중");
                //combining이 있으면 합치기 작업중이라는 뜻
                _manualCombine2.default.init(data.spots);
            } else {
                this.firstCheck(data.spots); //combining, combined가 없으면 데이터 수집, 검증중이라는 뜻
                //firstcheck를 통과하면 this.autoCombine을 통해 data.spots.combining이 만들어짐
            }
        } else {
            if (data.spots.combining) {
                console.log("합치기 작업중");
                //combining이 있으면 합치기 작업중이라는 뜻
                _manualCombine2.default.init(data.spots);
            } else {
                this.firstCheck(data.spots); //combining, combined가 없으면 데이터 수집, 검증중이라는 뜻
                //firstcheck를 통과하면 this.autoCombine을 통해 data.spots.combining이 만들어짐
            }
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
                        if (data[site][i] && !data[site][i].deleted) {
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
                    if (!tSpot.deleted) {
                        var dif = calculateDif(spot.coor, tSpot.coor);

                        if (dif < 250) {
                            combineObj[code].combine[tCode] = tSpot;
                            hasCombined = true;
                        }
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

    setRemainNumber: function setRemainNumber(site, number) {
        var city = $(".cityName").attr("id");
        var cutNo = number.trim() * 1;

        if (cutNo < 100) {
            toast("100개 이상의 장소를 유지해주세요");
        } else {
            if (confirm("순위 " + cutNo + "위 미만 장소를 모두 제거합니다. 맞습니까?")) {
                var cutObj = this.data.spots[site];
                cutObj.length = cutNo;

                firebase.database().ref("cities/" + city + "/spots/" + site).set(cutObj);
            } else {
                return false;
            }
        }
    },

    firstCheck: function firstCheck(data) {

        $(".spot__page").addClass("displayNone");
        $(".spot__page.check").removeClass("displayNone");

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
            if (this.data.combined[tid]) {
                delete this.data.combined[tid];
            }
        }
        mainData.name.ko = $("#name_ko").val();
        mainData.name.en = $("#name_en").val();

        delete mainData.combine;

        this.data.combined[$(".combine__main").attr("id")] = this.data.combining[$(".combine__main").attr("id")];
        delete this.data.combining[$(".combine__main").attr("id")];

        firebase.database().ref("cities/" + city + "/spots").update(this.data);

        if (Object.keys(this.data.combining).length > 0) {
            this.inflate();
        } else {
            firebase.database().ref("cities/" + city + "/status/spots").set("verifying");
            firebase.database().ref("cities/" + city + "/spots/combining").remove();
            toast("합치기 작업이 완료되었습니다! 2초 후 페이지를 새로고침합니다.");
            setTimeout(function () {
                location.reload();
            }, 2000);
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Verify = {
    data: {},

    listener: function listener() {
        var that = this;

        $(".verifying__box").on("click", ".result_rank", function () {
            that.check($(this));
        });
        $("#verifying__control__merge").click(function () {
            that.merge();
        });
        $("#verifying__control__remove").click(function () {
            that.removeAll();
        });
    },

    removeAll: function removeAll() {
        if (confirm("제거할까요?")) {
            for (var i = 0; i < $(".result_rank.selected").length; i++) {
                var tid = $(".result_rank.selected").eq(i).parent().attr("id");
                delete this.data[tid];
            }
            $(".verifying__control").addClass("displayNone");
            firebase.database().ref("cities/" + $(".cityName").attr("id") + "/spots/combined").set(this.data);
            this.rank();
        }
    },

    merge: function merge() {
        if ($(".result_rank.selected").length > 1) {
            var sid = $(".result_rank.selected").eq(0).parent().attr("id");
            var mainData = this.data[sid];

            for (var i = 1; i < $(".result_rank.selected").length; i++) {
                var tid = $(".result_rank.selected").eq(i).parent().attr("id");
                var targetData = this.data[tid];

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

                delete this.data[tid];

                if (confirm("병합할까요?")) {
                    $(".verifying__control").addClass("displayNone");
                    firebase.database().ref("cities/" + $(".cityName").attr("id") + "/spots/combined").set(this.data);
                    this.rank();
                }
            }
        } else {
            toast("선택된 관광지가 하나입니다");
        }
    },

    check: function check(div) {
        div.toggleClass("selected");
        var sid = div.parent().attr("id");

        if ($(".result_rank.selected").length > 0) {
            $(".verifying__control").removeClass("displayNone");
        } else {
            $(".verifying__control").addClass("displayNone");
        }
    },

    rank: function rank() {
        var config = {
            maxScore: 200, //1위는 200점 ~ 180위는 20점
            oneMinus: -600, //1개 사이트에만 소개된 관광지일 경우 차감되는 점수
            twoMunus: -300, //2개 사이트에만 소개된 관광지일 경우 차감되는 점수
            nvAdd: 100 //네이버에만 소개된 관광지일 경우 부여되는 추가점
        };
        var rankArray = [];
        console.log(this.data);

        for (var sid in this.data) {
            var spot = this.data[sid];
            var numSite = Object.keys(spot.rank).length; //등재된 사이트 갯수
            var score = 0;
            var avg = 0;
            var bestRank = Object.keys(this.data).length + 50; //가장 높은(숫자로서 낮은) 랭킹이 부여된 사이트 랭킹

            for (var site in spot.rank) {
                if (bestRank > spot.rank[site]) {
                    bestRank = spot.rank[site]; //bestRank를 갱신한다
                }
                if (spot.rank[site] < Object.keys(this.data).length) {
                    //예 - 관광지가 100위인데 론리플래닛에서 103위 소개 -> 없는 것 취급
                    score += config.maxScore - spot.rank[site];
                    avg += config.maxScore - spot.rank[site];
                } else {
                    if (numSite > 1) {
                        numSite--;
                    }
                }
            }
            score -= bestRank * 5;
            avg = avg / numSite;

            score += avg * 25;

            if (numSite === 1) {
                score += config.oneMinus;
                if (spot.rank.nv) {
                    score += config.nvAdd;
                }
            }
            if (numSite === 2) {
                score += config.twoMunus;
            }

            rankArray.push({ sid: sid, score: score });
        }

        rankArray.sort(function (a, b) {
            return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
        });
        console.log(rankArray);
        var txt = '';

        for (var i = 0; i < rankArray.length; i++) {
            var data = this.data;

            var _sid = rankArray[i].sid;
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
            txt += '<div class="result_box" id="' + _sid + '">';
            txt += '<p class="result_rank">' + (i + 1) + '</p>';
            txt += '<input class="result_name" value="' + data[_sid].name.ko + "--" + data[_sid].name.en + '">';
            txt += '<input class="result_url" value="' + url + '">';
            txt += '<p class="result_gg">' + ranking.gg + '</p>';
            txt += '<p class="result_nv">' + ranking.nv + '</p>';
            txt += '<p class="result_lp">' + ranking.lp + '</p>';
            txt += '<p class="result_ta">' + ranking.ta + '</p>';
            txt += '<p class="result_save save_spot">저장</p>';
            txt += '<p class="result_remove remove_spot">삭제</p>';
            txt += '</div>';
        }
        $(".verifying__box").html(txt);
    },

    init: function init(data) {
        this.data = data;
        this.listener();

        $(".spot__page").addClass("displayNone");
        $(".spot__page.verifying").removeClass("displayNone");
        $(".header__status").html("관광지 2차 검증");

        if (!data.ranked) {
            this.rank(); //랭킹 데이터가 없으면 만든다
            console.log("yolo?");
        }
    }
};

exports.default = Verify;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Hotel = {
    data: {},
    city: "",
    cityName: "",

    init: function init(data, cid, name) {
        $(".cityName").html(name).attr("id", cid);
        $(".cityCodeView").addClass("displayNone");
        $(".hotel").removeClass("displayNone");
        this.data = data;
        this.city = cid;
        this.cityName = name;
        console.log(data);

        this.score();
        //점수 부여를 실시한다.
    },

    score: function score() {
        var status = false;

        if (this.data.status) {
            if (!this.data.status.hotels) {
                //stauts는 있는데 호텔에 대한 status 데이터가 없으면 만들어 넣는다.
                this.data.status.hotels = {
                    transport: false,
                    safety: false,
                    facility: false,
                    costEff: false
                };
            }
        } else {
            // status 데이터 자체가 없으면 만들어 넣는다.
            this.data.status = {
                hotels: {
                    transport: false,
                    safety: false,
                    facility: false,
                    costEff: false
                }
            };
        }

        status = this.data.status.hotels;

        //점수 체계가 완성되어있는지 검사하고 없으면 점수를 부여하는 함수를 실행한다
        if (status.transport) {
            $("#status_transport").html("정보가 존재합니다.");
        } else {
            if (this.data.metro && this.data.metroLine) {
                $("#status_transport").html("대중교통 정보 발견. 교통 편의성을 계산합니다.");
                this.score_transport();
            } else {
                $("#status_transport").html("대중교통 정보가 입력되지 않아 교통 편의성을 계산할 수 없습니다. 데이터를 입력해주세요.");
            }
        }

        if (status.safety) {
            $("#status_safety").html("정보가 존재합니다.");
        } else {
            this.score_safety();
        }

        if (status.facility) {}
        if (status.costEff) {}

        console.log(this.data.hotels);
    },

    score_safety: function score_safety() {
        var city = this.city;
        var orderArray = [];

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];

            var safe_txt = [];
            var score = 0;
            //교통 편의성 점수부여용
        }
    },

    score_transport: function score_transport() {
        var city = this.city;
        var orderArray = [];

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];

            var transport_txt = [];

            var score = 0;
            //교통 편의성 점수부여용
            var goodLine = [];
            //좋은 지하철 라인들 Array
            var visitable = [];
            //환승 없이 갈 수 있는 관광지 목록
            var nearest = { distance: 1000, name: "", code: "" };
            //가장 가까운 지하철
            var lineNo = 0;

            if (hotel.metroInfo) {
                lineNo = Object.keys(hotel.metroInfo).length;
            }
            //10분거리 이내의 지하철  노선 개수


            for (var metLine in hotel.metroInfo) {

                if (hotel.metroInfo[metLine].distance < nearest.distance) {
                    nearest = hotel.metroInfo[metLine];
                    //가장 가까운 지하철 갱신
                }

                if (this.data.metroLine[metLine].score > 80) {
                    goodLine.push(metLine);
                    //좋은 라인이면 푸시함
                }

                for (var i = 0; i < this.data.metroLine[metLine].spot.length; i++) {
                    var spot = this.data.metroLine[metLine].spot[i];
                    if (!visitable.includes(spot.name)) {
                        visitable.push(spot.name);
                    }
                }
            }

            if (Math.ceil(nearest.distance / 70) < 4) {
                transport_txt.push('가장 가까운 지하철 역은 <b>' + nearest.name + "</b> 역으로, <strong>도보 단 " + Math.ceil(nearest.distance / 70) + "분 거리</strong>");
            } else {
                transport_txt.push('가장 가까운 지하철 역은 <b>' + nearest.name + "</b> 역으로, 도보 " + Math.ceil(nearest.distance / 70) + "분 거리");
            }
            transport_txt.push('숙소에서 도보 10분거리 이내에 <b>지하철 ' + lineNo + '개 노선</b>이 지남');

            if (goodLine.length > 0) {
                if (goodLine.length > 1) {
                    transport_txt.push('그 중에서도 실질적으로 ' + this.cityName + ' 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지나는 <b>초 역세권</b>');
                } else {
                    transport_txt.push('그 중에서도 실질적으로 ' + this.cityName + ' 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지나는 <b> 역세권</b>');
                }
            }

            var spotNo = visitable.length;
            if (spotNo > 0) {
                // TODO: 100대 관광지 -> 뉴욕 실제 spot 데이터 길이
                if (spotNo > 90) {
                    transport_txt.push('<b>' + this.cityName + ' 100대 관광지 중 ' + spotNo + '개</b>를 환승 없이 방문할 수 있는 <strong>최고의 교통 요지</strong>');
                } else if (spotNo > 75) {
                    transport_txt.push('<b>' + this.cityName + ' 100대 관광지 중 ' + spotNo + '개</b>를 환승 없이 방문할 수 있는 <strong>교통 요지</strong>');
                } else {
                    transport_txt.push(this.cityName + ' 100대 관광지 중 ' + spotNo + '개를 환승 없이 방문 가능');
                }
            }

            for (var metLine in hotel.metroInfo) {
                var metDistance = hotel.metroInfo[metLine].distance;
                score += (10000 - metDistance) * this.data.metroLine[metLine].score;
            }

            orderArray.push({
                score: score,
                hid: hid
            });

            if (hotel.explain) {
                hotel.explain.transport = transport_txt;
            } else {
                hotel.explain = {
                    transport: transport_txt
                };
            }
        }

        orderArray.sort(function (a, b) {
            return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
        });

        for (var i = 0, len = orderArray.length; i < len; i++) {
            var _hotel = this.data.hotels[orderArray[i].hid];
            var _score = Math.round((1 - i / len * (i / len)) * 60) / 10 + 4;
            //4.0 ~ 10.0 사이의 점수를 소수점 1자리까지 부여한다.
            //높은 점수가 더 많당

            if (_hotel.assessment) {
                _hotel.assessment.transport = {
                    score: _score
                };
            } else {
                _hotel.assessment = {
                    transport: {
                        score: _score
                    }
                };
            }
        }

        $("#status_transport").html("대중교통 정보 발견. 교통 편의성을 계산합니다. - 계산을 완료했습니다.");
        this.data.status.hotels.transport = true;

        firebase.database().ref("cities/" + city).update(this.data);
    },

    score_facility: function score_facility() {}
};

exports.default = Hotel;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Area = {
    data: {},
    city: "",
    cityName: "",

    listener: function listener() {
        var that = this;
        $(".area__page").on("change", ".area__line input", function () {
            that.scoreChange($(this));
        });
    },

    init: function init(data, cid, name) {
        $(".cityName").html(name).attr("id", cid);
        $(".cityCodeView").addClass("displayNone");
        $(".city__pages ").addClass("displayNone");
        $(".area").removeClass("displayNone");
        this.data = data;
        this.city = cid;
        this.cityName = name;
        console.log(data);

        this.listener();
        this.inflate();
    },

    scoreChange: function scoreChange(div) {

        if (isNaN(div.val() * 1)) {
            toast("숫자로만 입력해주세요");
            div.val(0);
        } else {
            if (div.val() > 10 || div.val() < 1) {
                toast("1~10 사이의 숫자를 입력해주세요");
                div.val(0);
            } else {
                if (div.hasClass("input__score")) {
                    var idx = $(".input__score").index(div);
                    div.val(div.val() * 1);
                    toast(this.data.area[idx].name + "의 치안점수가 " + div.val() * 1 + "점으로 변경되었습니다.");
                    firebase.database().ref("cities/" + this.city + "/area/" + idx + "/safety/score").set(div.val());
                } else if (div.hasClass("input__misdemeanor")) {
                    var _idx = $(".input__misdemeanor").index(div);
                    div.val(div.val() * 1);
                    toast(this.data.area[_idx].name + "의 경범죄 점수가 " + div.val() * 1 + "점으로 변경되었습니다.");
                    firebase.database().ref("cities/" + this.city + "/area/" + _idx + "/safety/misdemeanor").set(div.val());
                }
            }
        }
    },

    inflate: function inflate() {
        var txt = '';
        var areadata = {};

        if (this.data.area) {
            for (var i = 0; i < this.data.area.length; i++) {
                var area = this.data.area[i];
                console.log(area);
                if (!area.notArea) {
                    //브로드웨이, 센트럴파크 등 넓은 지역을 차지하는 관광지도 area 취급하기 때문에 걸러내기
                    txt += '<div class="area__div">';
                    txt += '<div class="area__line">';
                    txt += '<p class="area__name">' + area.name + '</p>';

                    if (area.safety) {
                        txt += '<p class="area__line__subTitle">치안점수</p>';
                        if (area.safety.score) {
                            txt += '<input class="area__line__input--short input__score" value="' + area.safety.score + '">';
                        } else {
                            txt += '<input class="area__line__input--short input__score" value="0">';
                        }

                        txt += '<p class="area__line__subTitle">경범죄점수</p>';
                        if (area.safety.misdemeanor) {
                            txt += '<input class="area__line__input--short input__misdemeanor" value="' + area.safety.misdemeanor + '">';
                        } else {
                            txt += '<input class="area__line__input--short input__misdemeanor" value="0">';
                        }
                    } else {
                        txt += '<p class="area__line__subTitle">치안점수</p>';
                        txt += '<input class="area__line__input--short input__score" value="0">';
                        txt += '<p class="area__line__subTitle">경범죄점수</p>';
                        txt += '<input class="area__line__input--short input__misdemeanor" value="0">';
                    }

                    txt += '</div>';
                    txt += '</div>';
                }
            }
        }

        $(".area__page").html(txt);
    }

};

exports.default = Area;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Subway = {
    map: {},
    marker: false,
    metro: [],

    init: function init() {
        var that = this;
        console.log("ylo");

        firebase.database().ref("cities/nyc/metro").once("value", function (snap) {
            that.metro = snap.val();

            that.map = new google.maps.Map(document.getElementById('subwayMap'), {
                center: { lat: 40.74844, lng: -73.98566 },
                zoom: 13,
                mapTypeControl: false,
                scaleControl: true,
                fullscreenControl: false
            });

            that.map.addListener('click', function (e) {
                that.findSubway(e);
            });
        });
    },

    findSubway: function findSubway(e) {
        var coor = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };

        if (this.marker) {
            this.marker.setMap(null);
        }

        this.marker = new google.maps.Marker({
            position: e.latLng,
            map: this.map
        });

        var txt = '';
        var metroInfo = {};
        var metroByStn = {};

        for (var _i = 0; _i < 473; _i++) {
            var metroName = this.metro[_i].name;

            var dif = Math.round(calculateDif(coor, this.metro[_i].coor));

            if (dif < 700) {
                for (var _k = 0; _k < this.metro[_i].line.length; _k++) {
                    var _line = this.metro[_i].line[_k].slice(0, 1);

                    if (metroInfo[_line]) {
                        if (dif < metroInfo[_line].dif) {
                            metroInfo[_line] = {
                                dif: dif,
                                name: metroName
                            };
                        }
                    } else {
                        metroInfo[_line] = {
                            dif: dif,
                            name: metroName
                        };
                    }
                }

                if (metroByStn[metroName]) {
                    metroByStn[metroName].line = metroByStn[metroName].line.concat(this.metro[_i].line);
                } else {
                    metroByStn[metroName] = {
                        dif: dif,
                        line: this.metro[_i].line
                    };
                }
            }
        }
        var metArray = [];
        for (var line in metroInfo) {
            metArray.push({
                line: line,
                name: metroInfo[line].name,
                dif: metroInfo[line].dif
            });
        }

        var metStnArray = [];
        for (var name in metroByStn) {
            metStnArray.push({
                line: metroByStn[name].line,
                name: name,
                dif: metroByStn[name].dif
            });
        }

        metArray.sort(function (a, b) {
            return a.dif > b.dif ? 1 : a.dif < b.dif ? -1 : 0;
        });
        metStnArray.sort(function (a, b) {
            return a.dif > b.dif ? 1 : a.dif < b.dif ? -1 : 0;
        });

        txt += '<p class="subway__info__title">역별</p>';
        txt += '<div class="subway__info__div">';
        for (var i = 0; i < metStnArray.length; i++) {
            txt += '<div class="subway__info__line">';
            txt += '<p class="subway__info__byStn__stnName">' + metStnArray[i].name + '역</p>';
            txt += '<p class="subway__info__byStn__dif">' + Math.ceil(metStnArray[i].dif / 80) + '분 거리</p>';
            txt += '<div class="subway__info__byStn__lineLine">';
            for (var k = 0; k < metStnArray[i].line.length; k++) {
                if (metStnArray[i].line[k].length === 1) {
                    txt += '<p class="subway__info__byStn__lineName ln_' + metStnArray[i].line[k] + '">' + metStnArray[i].line[k] + '</p>';
                }
            }
            txt += '</div>';

            txt += '</div>';
        }
        txt += '</div>';

        txt += '<p class="subway__info__title">노선별</p>';
        txt += '<div class="subway__info__div">';
        for (var i = 0; i < metArray.length; i++) {
            txt += '<div class="subway__info__line">';
            txt += '<p class="subway__info__lineName ln_' + metArray[i].line + '">' + metArray[i].line + '</p>';
            txt += '<p class="subway__info__dif">' + Math.ceil(metArray[i].dif / 80) + '분 거리</p>';
            txt += '<p class="subway__info__stnName">' + metArray[i].name + '역</p>';
            txt += '</div>';
        }
        txt += '</div>';

        $(".subway__info").html(txt);
    }
};

exports.default = Subway;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Account = {
    user: {},
    init: function init(id) {
        var _this = this;

        var that = this;

        firebase.database().ref("users").once("value", function (snap) {
            var data = snap.val();

            for (var uid in data) {
                if (uid !== id) {
                    _this.user[uid] = {
                        name: data[uid].name
                    };
                }
            }
            $("header ul").prepend('<li id="nav_account">회계</li>');

            $("header ul").on("click", "#nav_account", function () {
                $("header li").removeClass("--selected");
                $(this).addClass("--selected");
                $(".pages").addClass("displayNone");
                $(".pages.account").removeClass("displayNone");
            });

            $('#accountCalendar').fullCalendar({
                height: 564,
                firstDay: 1,
                viewRender: function viewRender(view, element) {
                    that.inflate();
                },
                dayClick: function dayClick(date) {
                    console.log(date);
                }
            });

            _this.inflate();
        });
    },

    inflate: function inflate() {}

};

exports.default = Account;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjE3OWNkMDVkYmNiODU5MWVkZmIiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hdHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9tYW51YWxDb21iaW5lLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9zcG90L3ZlcmlmeWluZy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvaG90ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5L2FyZWEuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zdWJ3YXkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbInVuaW5mbGF0ZWQiLCJhdHRlbmQiLCJjaXR5IiwidV9pIiwibWFpbCIsIm5hbWUiLCJncmFkZSIsIiQiLCJjbGljayIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJpbml0IiwiZG9jdW1lbnQiLCJyZWFkeSIsInByb3ZpZGVyIiwiZmlyZWJhc2UiLCJhdXRoIiwiR29vZ2xlQXV0aFByb3ZpZGVyIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwidXNlciIsInVzZXJNYWlsIiwiZW1haWwiLCJzcGxpdCIsImRhdGFiYXNlIiwicmVmIiwib25jZSIsInVzZXJEYXRhIiwic25hcCIsInZhbCIsInVpZCIsImRpc3BsYXlOYW1lIiwibG9naW4iLCJhbGVydCIsInNpZ25JbldpdGhQb3B1cCIsInRoZW4iLCJyZXN1bHQiLCJjYXRjaCIsImVycm9yIiwiZXJyb3JDb2RlIiwiY29kZSIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjcmVkZW50aWFsIiwiaHRtbCIsImF0dHIiLCJjb25maXJtIiwic2lnbk91dCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiQXR0ZW5kIiwibW9iaWxlIiwiaWQiLCJ2aWV3SUQiLCJhdHRlbmRPYmoiLCJzYWxhcnkiLCJ3ZWVrZGF5cyIsInRoYXQiLCJ1c2VycyIsInR4dCIsIm1haWxJRCIsInByb3AiLCJvbiIsImluZmxhdGVfY2FsZW5kYXIiLCJsZW5ndGgiLCJmdWxsQ2FsZW5kYXIiLCJoZWlnaHQiLCJmaXJzdERheSIsInZpZXdSZW5kZXIiLCJ2aWV3IiwiZWxlbWVudCIsImRheUNsaWNrIiwiZGF0ZSIsImlucHV0V29ya0hvdXIiLCJsaXN0ZW5lciIsImluZmxhdGVfaW5wdXQiLCJzZXRXb3JrSG91ciIsImtleXVwIiwiZSIsIndoaWNoIiwiY2hhbmdlIiwidmlld193b3JrZXIiLCJvZmYiLCJ5byIsImRhdGEiLCJkYXRlSUQiLCJzbGljZSIsImRpZiIsImZyb20iLCJ0byIsImkiLCJNYXRoIiwiZmxvb3IiLCJkdXJNb24iLCJ0aGlzTW9udGgiLCJkYXRlRG9tIiwiZXEiLCJoYXNDbGFzcyIsImoiLCJ3ZWVrRG9tIiwid2Vla0R1ciIsImRheURvbSIsImZpbmQiLCJrIiwiY2hpbGRyZW4iLCJhcHBlbmQiLCJmdWxsTW9udGhCb251cyIsImluc3VyYW5jZUZlZSIsImJhc2ljIiwicm91bmQiLCJmdWxsV2Vla0J1bnVzIiwiY29tbWEiLCJkYXRlT2JqIiwiZGF0ZVNob3J0IiwibW9tZW50IiwiZm9ybWF0IiwiQW55UGlja2VyIiwiZGF0ZVRpbWVGb3JtYXQiLCJmb2N1cyIsIndvcmsiLCJhbGxFbXB0eSIsInJlbW92ZSIsImZyb21BIiwidG9BIiwicHVzaCIsInNldCIsIkNpdHkiLCJjb2RlRGF0YSIsImNpdHlEYXRhIiwiY2lkIiwicGFyZW50IiwibWV0cm9BZGp1c3QiLCJyZXR1cm5Ub0NpdHlWaWV3IiwiaW5mbGF0ZV9jaXR5Q29kZVZpZXciLCJtZXRybyIsIm5hbWVBcnJheSIsImxpbmUiLCJjb25zb2xlIiwibG9nIiwiaG90ZWxzIiwic3BvdHMiLCJzcG90Iiwic3RhdHVzIiwiY29tYmluaW5nIiwiYXJlYSIsInByaWNlIiwic2V0dGluZyIsImNpdGllcyIsIlNwb3QiLCJpbnB1dENvb3JkaW5hdGUiLCJkZWxldGVTcG90Iiwic2V0UmVtYWluTnVtYmVyIiwiY29tYmluZWQiLCJmaXJzdENoZWNrIiwiYXV0b0NvbWJpbmVfX3Nwb3RSZXN0cnVjdHVyZSIsInNpdGVBcnIiLCJjb3VudGVyIiwic2l0ZSIsIm5vRGF0YSIsImRlbGV0ZWQiLCJvbGRTcG90Iiwia28iLCJlbiIsImNvb3IiLCJyYW5rIiwidGVzdCIsInVybCIsInRhZyIsImF1dG9Db21iaW5lX19jb21iaW5lIiwiY29tYmluZU9iaiIsImNvbWJpbmUiLCJoYXNDb21iaW5lZCIsInRDb2RlIiwidFNwb3QiLCJrZXkiLCJjYWxjdWxhdGVEaWYiLCJzaWQiLCJubyIsInRvYXN0IiwiY29vclR4dCIsImxhdCIsInRyaW0iLCJsbmciLCJpc05hTiIsIm51bWJlciIsImN1dE5vIiwiY3V0T2JqIiwiaGFzUHJvYmxlbSIsInNlYXJjaFVybCIsInNpdGVPYmoiLCJnZyIsIm52IiwidGEiLCJscCIsInNpdGVIYXNQcm9ibGVtIiwibm9Db29yIiwibm9Db29yVHh0Iiwibm9TcG90Iiwibm9TcG90VHh0IiwiaGFzQ29vciIsImxhcmdlT0siLCJsYXJnZURhdGEiLCJNYW51YWxDb21iaW5lIiwibWFwIiwibWFya2VyIiwicHJpbWUiLCJ0YXJnZXQiLCJyZW1haW4iLCJ0b2dnbGVDbGFzcyIsIm5leHRTdGVwIiwibWFpbkRhdGEiLCJ0aWQiLCJ0YXJnZXREYXRhIiwiaW5jbHVkZXMiLCJ1cGRhdGUiLCJPYmplY3QiLCJrZXlzIiwiaW5mbGF0ZSIsInNldFRpbWVvdXQiLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiZ2V0RWxlbWVudEJ5SWQiLCJjZW50ZXIiLCJ6b29tIiwibWFwVHlwZUNvbnRyb2wiLCJzY2FsZUNvbnRyb2wiLCJmdWxsc2NyZWVuQ29udHJvbCIsImFkZExpc3RlbmVyIiwiY2hvb3NlQ29vcmRpbmF0ZSIsImxhdExuZyIsInNldE1hcCIsIk1hcmtlciIsInBvc2l0aW9uIiwicGFuVG8iLCJpZHgiLCJsYXRsbmciLCJ0TWFya2VyIiwibGFiZWwiLCJ0b1N0cmluZyIsIlZlcmlmeSIsImNoZWNrIiwibWVyZ2UiLCJyZW1vdmVBbGwiLCJkaXYiLCJjb25maWciLCJtYXhTY29yZSIsIm9uZU1pbnVzIiwidHdvTXVudXMiLCJudkFkZCIsInJhbmtBcnJheSIsIm51bVNpdGUiLCJzY29yZSIsImF2ZyIsImJlc3RSYW5rIiwic29ydCIsImEiLCJiIiwicmFua2luZyIsInJhbmtlZCIsIkhvdGVsIiwiY2l0eU5hbWUiLCJ0cmFuc3BvcnQiLCJzYWZldHkiLCJmYWNpbGl0eSIsImNvc3RFZmYiLCJtZXRyb0xpbmUiLCJzY29yZV90cmFuc3BvcnQiLCJzY29yZV9zYWZldHkiLCJvcmRlckFycmF5IiwiaGlkIiwiaG90ZWwiLCJzYWZlX3R4dCIsInRyYW5zcG9ydF90eHQiLCJnb29kTGluZSIsInZpc2l0YWJsZSIsIm5lYXJlc3QiLCJkaXN0YW5jZSIsImxpbmVObyIsIm1ldHJvSW5mbyIsIm1ldExpbmUiLCJjZWlsIiwic3BvdE5vIiwibWV0RGlzdGFuY2UiLCJleHBsYWluIiwibGVuIiwiYXNzZXNzbWVudCIsInNjb3JlX2ZhY2lsaXR5IiwiQXJlYSIsInNjb3JlQ2hhbmdlIiwiaW5kZXgiLCJhcmVhZGF0YSIsIm5vdEFyZWEiLCJtaXNkZW1lYW5vciIsIlN1YndheSIsImZpbmRTdWJ3YXkiLCJtZXRyb0J5U3RuIiwibWV0cm9OYW1lIiwiY29uY2F0IiwibWV0QXJyYXkiLCJtZXRTdG5BcnJheSIsIkFjY291bnQiLCJwcmVwZW5kIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QkFBRSxRQUFGLEVBQVlHLFFBQVosQ0FBcUIsYUFBckI7QUFDQUgsa0JBQUUsZ0JBQUYsRUFBb0JFLFdBQXBCLENBQWdDLGFBQWhDO0FBQ0gsYUFMRDs7QUFPQUYsY0FBRSxrQkFBRixFQUFzQjBELFlBQXRCLENBQW1DO0FBQy9CQyx3QkFBUSxHQUR1QjtBQUUvQkMsMEJBQVUsQ0FGcUI7QUFHL0JDLDRCQUFhLG9CQUFVQyxJQUFWLEVBQWdCQyxPQUFoQixFQUF5QjtBQUNsQ2IseUJBQUtnSyxPQUFMO0FBQ0gsaUJBTDhCO0FBTS9CbEosMEJBQVUsa0JBQVNDLElBQVQsRUFBYztBQUNwQmlFLDRCQUFRQyxHQUFSLENBQVlsRSxJQUFaO0FBQ0g7QUFSOEIsYUFBbkM7O0FBV0Esa0JBQUtpSixPQUFMO0FBQ0gsU0FoQ0Q7QUFpQ0gsS0F0Q1M7O0FBd0NWQSxhQUFTLG1CQUFVLENBRWxCOztBQTFDUyxDQUFkOztrQkE4Q2VvRixPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjE3OWNkMDVkYmNiODU5MWVkZmIiLCJpbXBvcnQgQXR0ZW5kIGZyb20gXCIuL21vZHVsZXMvYXR0ZW5kLmpzXCI7XHJcbmltcG9ydCBDaXR5IGZyb20gXCIuL21vZHVsZXMvY2l0eS5qc1wiO1xyXG5pbXBvcnQgU3Vid2F5IGZyb20gXCIuL21vZHVsZXMvc3Vid2F5LmpzXCI7XHJcbmltcG9ydCBBY2NvdW50IGZyb20gXCIuL21vZHVsZXMvYWNjb3VudC5qc1wiO1xyXG5cclxubGV0IHVuaW5mbGF0ZWQgPSB7XHJcbiAgICBhdHRlbmQ6dHJ1ZSxcclxuICAgIGNpdHk6dHJ1ZVxyXG59XHJcblxyXG5sZXQgdV9pID0ge1xyXG4gICAgbWFpbDpcIlwiLFxyXG4gICAgbmFtZTpcIlwiLFxyXG4gICAgZ3JhZGU6MFxyXG59XHJcblxyXG4kKFwiI25hdl9hdHRlbmRcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQoXCJoZWFkZXIgbGlcIikucmVtb3ZlQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIi0tc2VsZWN0ZWRcIik7XHJcbiAgICAkKFwiLnBhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLnBhZ2VzLmF0dGVuZFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICBpZih1bmluZmxhdGVkLmF0dGVuZCl7XHJcbiAgICAgICAgQXR0ZW5kLmluaXQodV9pLm1haWwsIHVfaS5uYW1lLCB1X2kuZ3JhZGUpO1xyXG4gICAgICAgIHVuaW5mbGF0ZWQuYXR0ZW5kID0gZmFsc2U7XHJcbiAgICB9XHJcbn0pXHJcbiQoXCIjbmF2X2NpdHlcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQoXCJoZWFkZXIgbGlcIikucmVtb3ZlQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIi0tc2VsZWN0ZWRcIik7XHJcbiAgICAkKFwiLnBhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLnBhZ2VzLmNpdHlcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgaWYodW5pbmZsYXRlZC5jaXR5KXtcclxuICAgICAgICBDaXR5LmluaXQodV9pLm1haWwsIHVfaS5uYW1lLCB1X2kuZ3JhZGUpO1xyXG4gICAgICAgIHVuaW5mbGF0ZWQuY2l0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG59KVxyXG4kKFwiI25hdl9zdWJ3YXlcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQoXCJoZWFkZXIgbGlcIikucmVtb3ZlQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIi0tc2VsZWN0ZWRcIik7XHJcbiAgICAkKFwiLnBhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLnBhZ2VzLnN1YndheVwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICBTdWJ3YXkuaW5pdCgpO1xyXG59KVxyXG5cclxuXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgIHZhciBwcm92aWRlciA9IG5ldyBmaXJlYmFzZS5hdXRoLkdvb2dsZUF1dGhQcm92aWRlcigpO1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbih1c2VyKSB7XHJcbiAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICBsZXQgdXNlck1haWwgPSB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF1cclxuICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCB1c2VyRGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgaWYodXNlckRhdGFbdXNlck1haWxdKXtcclxuICAgICAgICAgICAgICAgICAgaWYodXNlckRhdGFbdXNlck1haWxdLnVpZCA9IHVzZXIudWlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgIHVfaS5tYWlsID0gdXNlck1haWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICB1X2kubmFtZSA9IHVzZXIuZGlzcGxheU5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICB1X2kuZ3JhZGUgPSB1c2VyRGF0YVt1c2VyTWFpbF0uZ3JhZGUqMVxyXG4gICAgICAgICAgICAgICAgICAgICAgQXR0ZW5kLmluaXQodV9pLm1haWwsIHVfaS5uYW1lLCB1X2kuZ3JhZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gQ2l0eS5pbml0KHVfaS5tYWlsLCB1X2kubmFtZSwgdV9pLmdyYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmKHVfaS5ncmFkZSA9PT0gNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjb3VudC5pbml0KHVzZXIubWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB1bmluZmxhdGVkLmF0dGVuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgbG9naW4odV9pLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIilcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIC8vIFVzZXIgaXMgc2lnbmVkIGluLlxyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBObyB1c2VyIGlzIHNpZ25lZCBpbi5cclxuICAgICAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aFBvcHVwKHByb3ZpZGVyKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB1c2VyID0gcmVzdWx0LnVzZXI7XHJcbiAgICAgICAgICAgIGxldCB1c2VyTWFpbCA9IHVzZXIuZW1haWwuc3BsaXQoJ0AnKVswXVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VyRGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBpZih1c2VyRGF0YVt1c2VyTWFpbF0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHVzZXJEYXRhW3VzZXJNYWlsXS51aWQgPSB1c2VyLnVpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVfaS5tYWlsID0gdXNlck1haWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVfaS5uYW1lID0gdXNlci5kaXNwbGF5TmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdV9pLmdyYWRlID0gdXNlckRhdGFbdXNlck1haWxdLmdyYWRlKjFcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXR0ZW5kLmluaXQodV9pLm1haWwsIHVfaS5uYW1lLCB1X2kuZ3JhZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmluZmxhdGVkLmF0dGVuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dpbih1X2kubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIC8vIC4uLlxyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBIYW5kbGUgRXJyb3JzIGhlcmUuXHJcbiAgICAgICAgICB2YXIgZXJyb3JDb2RlID0gZXJyb3IuY29kZTtcclxuICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgLy8gVGhlIGVtYWlsIG9mIHRoZSB1c2VyJ3MgYWNjb3VudCB1c2VkLlxyXG4gICAgICAgICAgdmFyIGVtYWlsID0gZXJyb3IuZW1haWw7XHJcbiAgICAgICAgICAvLyBUaGUgZmlyZWJhc2UuYXV0aC5BdXRoQ3JlZGVudGlhbCB0eXBlIHRoYXQgd2FzIHVzZWQuXHJcbiAgICAgICAgICB2YXIgY3JlZGVudGlhbCA9IGVycm9yLmNyZWRlbnRpYWw7XHJcbiAgICAgICAgICAvLyAuLi5cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59KVxyXG5cclxuZnVuY3Rpb24gbG9naW4obmFtZSl7XHJcbiAgICAkKFwiLmhlbGxvV29ybGRcIikuaHRtbChuYW1lWzFdK1wi7ZWYIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5hdHRyKFwidGl0bGVcIixuYW1lK1wi64uYIOyViOuFle2VmOyEuOyalCFcIik7XHJcbiAgICAkKFwiLmhlbGxvV29ybGRcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihjb25maXJtKG5hbWUrXCLri5gg66Gc6re47JWE7JuDIO2VmOyLnOqyoOyKteuLiOq5jD9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgLy8gQW4gZXJyb3IgaGFwcGVuZWQuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ2YXIgQXR0ZW5kID0ge1xyXG4gICAgbW9iaWxlOiBmYWxzZSxcclxuXHJcbiAgICBpZDogXCJcIixcclxuXHJcbiAgICB2aWV3SUQ6IFwiXCIsXHJcbiAgICAvL+q0gOumrOyekOqwgCDri6Trpbgg7IKs656M7J2YIElEIO2ZleyduOykkVxyXG5cclxuICAgIGF0dGVuZE9iajoge30sXHJcblxyXG4gICAgc2FsYXJ5OiB7fSxcclxuXHJcblxyXG4gICAgd2Vla2RheXM6IFtcIuydvFwiLCBcIuyblFwiLCBcIu2ZlFwiLCBcIuyImFwiLCBcIuuqqVwiLCBcIuq4iFwiLCBcIu2GoFwiLCBcIuydvFwiXSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihpZCwgbmFtZSwgZ3JhZGUpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImFjY291bnQvc2FsYXJ5XCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB0aGF0LnNhbGFyeSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBpZihncmFkZSA9PT0gNSl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmdWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlcnMgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG1haWxJRCBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxvcHRpb24gdmFsdWU9XCInK21haWxJRCsnXCI+Jyt1c2Vyc1ttYWlsSURdLm5hbWUrJzwvb3B0aW9uPidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikuaHRtbCh0eHQpLnZhbChpZCkucHJvcChcInNlbGVjdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIubG9hZGluZ1ZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ZW5kT2JqID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCEkKFwiLmZjLWhlYWRlci10b29sYmFyXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld1JlbmRlciA6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheUNsaWNrOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0V29ya0hvdXIoZGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLmF0dGVuZFZpZXdfaW5wdXRcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2lucHV0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiLmF0dGVuZFZpZXdfU2hvd1wiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuY29uZmlybVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LnNldFdvcmtIb3VyKCQodGhpcykuYXR0cihcImRpZFwiKSk7XHJcbiAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5jbG9zZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiLmJsYWNrU2NyZWVuXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChcImJvZHlcIikua2V5dXAoZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGlmKCQoXCIubW9kYWwgLmNvbmZpcm1cIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIHZhciBjb2RlID0gZS53aGljaDsgLy8gcmVjb21tZW5kZWQgdG8gdXNlIGUud2hpY2gsIGl0J3Mgbm9ybWFsaXplZCBhY3Jvc3MgYnJvd3NlcnNcclxuICAgICAgICAgICAgICAgIGlmKGNvZGU9PTEzKXtcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFdvcmtIb3VyKCQoXCIubW9kYWwgLmNvbmZpcm1cIikuYXR0cihcImRpZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikuY2hhbmdlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCBpZCA9ICQodGhpcykudmFsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXdfd29ya2VyKGlkKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICB2aWV3X3dvcmtlcjogZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYoaWQgPT09IHRoYXQuaWQpe1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fY2FsZW5kYXJcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX3dlZWtcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX21vbnRoXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19jYWxlbmRhclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICBpZih0aGF0LnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGF0LnZpZXdJRCkub2ZmKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK2lkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hdHRlbmRPYmogPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlvID0gdGhhdC52aWV3SUQ7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdJRCA9IGlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHlvLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoYXQuaWQgIT09IHRoYXQudmlld0lEKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheUNsaWNrOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRXb3JrSG91cihkYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfY2FsZW5kYXI6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICQoXCIuYXR0ZW5kXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5mYy1kYXlcIikuaHRtbChcIlwiKTtcclxuXHJcbiAgICAgICAgaWYoZGF0YS5hdHRlbmQpe1xyXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5hdHRlbmRcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF0ZSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZUlEID0gZGF0ZS5zbGljZSgwLDQpK1wiLVwiK2RhdGUuc2xpY2UoNCw2KStcIi1cIitkYXRlLnNsaWNlKDYsOCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gMFxyXG4gICAgICAgICAgICAgICAgbGV0IHR4dCA9ICc8cD4nK2RhdGFbZGF0ZV1bMF0uZnJvbStcIn5cIitkYXRhW2RhdGVdWzBdLnRvKyc8L3A+J1xyXG4gICAgICAgICAgICAgICAgLy/rkZDtg4DsnoQg64KY64ig7IScIOq3vOustO2WiOyWtOuPhCDri6zroKXsl5Ag7ZGc7Iuc65CY64qUIOqyg+ydgCDssqvtg4DsnoQg6re866y07Iuc6rCE66eMXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW2RhdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlmICs9IGRhdGFbZGF0ZV1baV0uZGlmXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHh0Kz0nPHA+JyArIE1hdGguZmxvb3IoZGlmLzYwKSArIFwi7Iuc6rCEIFwiKyBkaWYlNjAgK1wi67aEXCIrJzwvcD4nXHJcbiAgICAgICAgICAgICAgICAkKCcuZmMtZGF5W2RhdGEtZGF0ZT1cIicrZGF0ZUlEKydcIl0nKS5odG1sKHR4dClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZHVyTW9uID0gMDtcclxuICAgICAgICAgICAgbGV0IHRoaXNNb250aCA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuYXR0ZW5kIC5mYy1kYXlcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlRG9tID0gJChcIi5hdHRlbmQgLmZjLWRheVwiKS5lcShpKTtcclxuICAgICAgICAgICAgICAgIGlmKCFkYXRlRG9tLmhhc0NsYXNzKFwiZmMtb3RoZXItbW9udGhcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gZGF0ZURvbS5hdHRyKFwiZGF0YS1kYXRlXCIpLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzTW9udGggPSBkYXRlWzBdK2RhdGVbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGVbMF0rZGF0ZVsxXStkYXRlWzJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2RhdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkYXRhW2RhdGVdLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJNb24gKz0gZGF0YVtkYXRlXVtqXS5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0eHQgPSAnJ1xyXG5cclxuICAgICAgICAgICAgaWYoJChcIi5mYy12aWV3LWNvbnRhaW5lclwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHsgICAvL+ustOyhsOqxtCA27KO8XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWtEb20gPSAkKFwiLmZjLXdlZWtcIikuZXEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWtEdXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDc7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF5RG9tID0gd2Vla0RvbS5maW5kKFwiLmZjLWRheVwiKS5lcShqKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGRheURvbS5hdHRyKFwiZGF0YS1kYXRlXCIpLnNwbGl0KFwiLVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZVswXStkYXRlWzFdK2RhdGVbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbZGF0ZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBkYXRhW2RhdGVdLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Vla0R1ciArPSBkYXRhW2RhdGVdW2tdLmRpZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHdlZWtEdXI+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiYXR0ZW5kX193ZWVrX19ob3VyXCI+JysgTWF0aC5mbG9vcih3ZWVrRHVyLzYwKSsn7Iuc6rCEICcrd2Vla0R1ciU2MCsn67aEJyArJzwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiYXR0ZW5kX193ZWVrX19ob3VyXCI+PC9wPidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIi5hdHRlbmRfX3dlZWtcIikuaHRtbCh0eHQpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCQoXCIuZmMtbGVmdFwiKS5jaGlsZHJlbihcImgyLmR1ck1vbnRoXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAkKFwiaDIuZHVyTW9udGhcIikuaHRtbCgnICgnK01hdGguZmxvb3IoZHVyTW9uLzYwKSsn7Iuc6rCEICcrZHVyTW9uJTYwKyfrtoQpJylcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmZjLWxlZnRcIikuYXBwZW5kKCc8aDIgY2xhc3M9XCJkdXJNb250aFwiPiAoJytNYXRoLmZsb29yKGR1ck1vbi82MCkrJ+yLnOqwhCAnK2R1ck1vbiU2MCsn67aEKTwvaDI+JylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHh0ID0gJyc7ICAgLy92YXIg67m866i57J2A6rGwIOyVhOuLmC4g7JyE7JeQ7IScIOyEoOyWuCDtlojsnYwhXHJcblxyXG4gICAgICAgICAgICBsZXQgZnVsbE1vbnRoQm9udXMgPSAzMDQwMDtcclxuICAgICAgICAgICAgbGV0IGluc3VyYW5jZUZlZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBiYXNpYyA9IE1hdGgucm91bmQoZHVyTW9uLzYwKjc2MDApXHJcbiAgICAgICAgICAgIGxldCBmdWxsV2Vla0J1bnVzID0gTWF0aC5yb3VuZCgoZHVyTW9uLzYwKjc2MDApKjAuMik7XHJcblxyXG4gICAgICAgICAgICAvLyBpZih0aGlzLmlkID09PSB0aGlzLnZpZXdJRCl7XHJcbiAgICAgICAgICAgIC8vICAgICAvL+uzuOyduCDrqqjrk5xcclxuICAgICAgICAgICAgLy8gICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnkvXCIrdGhpc01vbnRoK1wiL1wiK3RoaXMuaWQpLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYmFzaWM6IGJhc2ljLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxXZWVrQnVudXM6IGZ1bGxXZWVrQnVudXMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbE1vbnRoQm9udXM6IGZ1bGxNb250aEJvbnVzXHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImFjY291bnQvc2FsYXJ5L1wiK3RoaXNNb250aCtcIi9cIit0aGlzLnZpZXdJRCkudXBkYXRlKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBiYXNpYzogYmFzaWMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbFdlZWtCdW51czogZnVsbFdlZWtCdW51cyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsTW9udGhCb251czogZnVsbE1vbnRoQm9udXNcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7quLDrs7jquIk8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGJhc2ljKSsgXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq3vOustOyLnOqwhCBYIDcsNjAw7JuQPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7so7ztnLTsiJjri7k8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGZ1bGxXZWVrQnVudXMpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6riw67O46riJ7J2YIDIwJTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7Jew7LCo7IiY64u5PC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShmdWxsTW9udGhCb251cykgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj417Iuc6rCEIOyDgeuLuSDquLDrs7jquIk8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmUgYXR0ZW5kX19tb250aF9fbGluZS0tcmVkXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuyCrO2ajOuztO2XmOujjDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoaW5zdXJhbmNlRmVlKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq1reuvvOyXsOq4iC/qs6Dsmqnrs7Ttl5gv6rG06rCV67O07ZeYIOyyreq1rOyVoTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZSBhdHRlbmRfX21vbnRoX19saW5lLS1zdW1cIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7ZWp6rOEPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShiYXNpYyArIGZ1bGxXZWVrQnVudXMgKyBmdWxsTW9udGhCb251cyAtIGluc3VyYW5jZUZlZSkgK1wi7JuQPC9wPlwiXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq4sOuzuOq4iSArIOyjvO2ctOyImOuLuSArIOyXsOywqOyImOuLuSAtIOyCrO2ajOuztO2XmOujjDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19tb250aFwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dFdvcmtIb3VyOiBmdW5jdGlvbihkYXRlT2JqKXtcclxuICAgICAgICAvLyBjc3M6IG1vZHVsZXMvYXR0ZW5kLmNzc1xyXG4gICAgICAgIGxldCBkYXRlU2hvcnQgPSBtb21lbnQoZGF0ZU9iaikuZm9ybWF0KFwiTU0vRERcIik7XHJcbiAgICAgICAgbGV0IGRhdGVJRCA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoXCJZWVlZTU1ERFwiKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fVxyXG4gICAgICAgIGlmKHRoaXMuYXR0ZW5kT2JqLmF0dGVuZFtkYXRlSURdKXtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuYXR0ZW5kT2JqLmF0dGVuZFtkYXRlSURdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHh0ID0gJydcclxuXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImJsYWNrU2NyZWVuXCI+J1xyXG4gICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJpbnB1dFdpbmRvd1wiPidcclxuICAgICAgICB0eHQrPSAgICAgICAnPHAgY2xhc3M9XCJ0aXRsZVwiPicrZGF0ZVNob3J0Kycg6re866y07Iuc6rCEPC9wPidcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj4nXHJcbiAgICAgICAgaWYoZGF0YVswXSl7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJmaXJzdF9mcm9tXCIgdmFsdWU9XCInK2RhdGFbMF0uZnJvbSsnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cImZpcnN0X3RvXCIgdmFsdWU9XCInK2RhdGFbMF0udG8rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJmaXJzdF9mcm9tXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cImZpcnN0X3RvXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj4nXHJcbiAgICAgICAgaWYoZGF0YVsxXSl7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJzZWNvbmRfZnJvbVwiIHZhbHVlPVwiJytkYXRhWzFdLmZyb20rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJzZWNvbmRfdG9cIiB2YWx1ZT1cIicrZGF0YVsxXS50bysnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPidcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9ICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxkaXYgY2xhc3M9XCJib3R0b21cIj4nXHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAgICc8cCBjbGFzcz1cImNvbmZpcm1cIiBkaWQ9XCInK2RhdGVJRCsnXCI+7ZmV7J24PC9wPidcclxuICAgICAgICB0eHQrPSAgICAgICAgICAgJzxwIGNsYXNzPVwiY2xvc2VcIj7st6jshow8L3A+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgdHh0Kz0gICAnPC9kaXY+J1xyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubW9iaWxlKXtcclxuICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5BbnlQaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgZGF0ZVRpbWVGb3JtYXQ6XCJISDptbVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiI2ZpcnN0X2Zyb21cIikuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRXb3JrSG91cjogZnVuY3Rpb24oZGF0ZSl7XHJcblxyXG4gICAgICAgIGxldCB3b3JrID0gW107XHJcblxyXG4gICAgICAgIGxldCBhbGxFbXB0eSA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKCQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikuZXEoaSkudmFsKCkubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgYWxsRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWxsRW1wdHkpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLnZpZXdJRCtcIi9hdHRlbmQvXCIrZGF0ZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCtcIi9hdHRlbmQvXCIrZGF0ZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoXCIubW9kYWxcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgbGV0IGRhdGVJRCA9IGRhdGUuc2xpY2UoMCw0KSArIFwiLVwiK2RhdGUuc2xpY2UoNCw2KSArIFwiLVwiK2RhdGUuc2xpY2UoNiw4KVxyXG4gICAgICAgICAgICAkKCcuZmMtZGF5W2RhdGEtZGF0ZT1cIicrZGF0ZUlEKydcIl0nKS5odG1sKFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZigkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuICAgICAgICAgICAgLy/si5zsnpHsi5zqsITsnbQg7J6YIOyeheugpeuQmOyXiOuCmCDtmZXsnbhcclxuXHJcbiAgICAgICAgICAgIGlmKGRhdGU8bW9tZW50KCkuZm9ybWF0KFwiWVlZWU1NRERcIikpe1xyXG4gICAgICAgICAgICAgICAgLy/smKTripgg7J207KCEIOydvOydmCDrgqDsp5zrpbwg64uk66Oo6rOgIOyeiOydhCDqsr3smrAgLSDqt7zrrLQg7KKF66OM7Iuc6rCE7J20IOyeheugpeuQmOyngCDslYrsnLzrqbQg7JWIIOuQqFxyXG4gICAgICAgICAgICAgICAgaWYoJChcIiNmaXJzdF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgIGlmKCQoXCIjZmlyc3RfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLsmIjsg4Eg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZnJvbSA9ICQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKVxyXG4gICAgICAgICAgICBsZXQgdG8gPSAkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpXHJcblxyXG4gICAgICAgICAgICBsZXQgZnJvbUEgPSBmcm9tLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSlcclxuXHJcblxyXG4gICAgICAgICAgICB3b3JrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgIGRpZjogZGlmXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhbGVydChcIuq3vOustOyLnOqwhOydtCDsnpjrqrsg7J6F66Cl65CY7JeI7Iq164uI64ukLiBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0ZTxtb21lbnQoKS5mb3JtYXQoXCJZWVlZTU1ERFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/smKTripgg7J207KCEIOydvOydmCDrgqDsp5zrpbwg64uk66Oo6rOgIOyeiOydhCDqsr3smrAgLSDqt7zrrLQg7KKF66OM7Iuc6rCE7J20IOyeheugpeuQmOyngCDslYrsnLzrqbQg7JWIIOuQqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI3NlY29uZF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOyYiOyDgSDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb20gPSAkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpXHJcbiAgICAgICAgICAgICAgICBsZXQgdG8gPSAkKFwiI3NlY29uZF90b1wiKS52YWwoKVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmcm9tQSA9IGZyb20uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAodG9BWzBdKjEgLSBmcm9tQVswXSoxKSo2MCArICh0b0FbMV0qMSAtIGZyb21BWzFdKjEpXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgICAgICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLTsi5zqsITsnbQg7J6Y66q7IOyeheugpeuQmOyXiOyKteuLiOuLpC4gSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMudmlld0lEK1wiL2F0dGVuZC9cIitkYXRlKS5zZXQod29yayk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQrXCIvYXR0ZW5kL1wiK2RhdGUpLnNldCh3b3JrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIubW9kYWxcIikuaHRtbChcIlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXR0ZW5kO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2F0dGVuZC5qcyIsImltcG9ydCBTcG90IGZyb20gXCIuL2NpdHkvc3BvdC5qc1wiO1xyXG4vL+q0gOq0keyngCDsoJXrpqxcclxuaW1wb3J0IEhvdGVsIGZyb20gXCIuL2NpdHkvaG90ZWwuanNcIjtcclxuLy/tmLjthZTsoJXrs7Qg6rSA66CoXHJcbmltcG9ydCBBcmVhIGZyb20gXCIuL2NpdHkvYXJlYS5qc1wiO1xyXG4vL+yngOyXrSDrjbDsnbTthLAg7J6F66ClXHJcblxyXG5sZXQgQ2l0eSA9IHtcclxuICAgIGNvZGVEYXRhOiB7fSxcclxuICAgIGNpdHlEYXRhOiB7fSxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLm9uKFwiY2xpY2tcIiwgXCIuc3BvdHNcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGNpZCA9ICQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpO1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9ICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIubmFtZVwiKS5odG1sKCk7XHJcbiAgICAgICAgICAgIFNwb3QuaW5pdCh0aGF0LmNpdHlEYXRhW2NpZF0sIGNpZCwgbmFtZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5vbihcImNsaWNrXCIsIFwiLmhvdGVsc1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgY2lkID0gJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5uYW1lXCIpLmh0bWwoKTtcclxuICAgICAgICAgICAgSG90ZWwuaW5pdCh0aGF0LmNpdHlEYXRhW2NpZF0sIGNpZCwgbmFtZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5vbihcImNsaWNrXCIsIFwiLmFyZWFcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGNpZCA9ICQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpO1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9ICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIubmFtZVwiKS5odG1sKCk7XHJcbiAgICAgICAgICAgIEFyZWEuaW5pdCh0aGF0LmNpdHlEYXRhW2NpZF0sIGNpZCwgbmFtZSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5jaXR5Q29kZVZpZXdcIikub24oXCJjbGlja1wiLCBcIi50cmFuc3BvcnRcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5tZXRyb0FkanVzdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSk7XHJcbiAgICAgICAgICAgIC8v64+E7Iuc67OE66GcIOuplO2KuOuhnCDsoJXrs7Trpbwg64uk65Os64qU642wIOyCrOyaqVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCIuaGVhZGVyX19yZXR1cm5cIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5yZXR1cm5Ub0NpdHlWaWV3KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgcmV0dXJuVG9DaXR5VmlldzogZnVuY3Rpb24oKXtcclxuICAgICAgICAkKFwiLmNpdHlfX3BhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5jaXR5Q29kZVZpZXdcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmNpdHkgLnNwb3QgLmNoZWNrXCIpLmh0bWwoXCJcIik7XHJcblxyXG4gICAgICAgIHRoaXMuaW5mbGF0ZV9jaXR5Q29kZVZpZXcodGhpcy5jb2RlRGF0YSwgdGhpcy5jaXR5RGF0YSlcclxuICAgIH0sXHJcblxyXG4gICAgbWV0cm9BZGp1c3Q6IGZ1bmN0aW9uKGNpZCl7XHJcbiAgICAgICAgaWYodGhpcy5jaXR5RGF0YVtjaWRdLm1ldHJvKXtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmNpdHlEYXRhW2NpZF0ubWV0cm9cclxuICAgICAgICAgICAgbGV0IG5hbWVBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRybyA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICBpZighbWV0cm8ubGluZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWV0cm8ubmFtZSlcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgLy8gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkK1wiL21ldHJvXCIpLnVwZGF0ZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBpbmZsYXRlX2NpdHlDb2RlVmlldzogZnVuY3Rpb24oY29kZURhdGEsZGF0YSl7XHJcbiAgICAgICAgbGV0IHR4dCA9ICc8ZGl2IGNsYXNzPVwibGluZSB0b3BcIj48cCBjbGFzcz1cIm5hbWVcIj7rj4Tsi5zrqoU8L3A+PHAgY2xhc3M9XCJob3RlbHNcIj7siJnshow8L3A+PHAgY2xhc3M9XCJzcG90c1wiPuq0gOq0keyngCDsoJXrpqw8L3A+PHAgY2xhc3M9XCJhcmVhXCI+7KeA7JetPC9wPjxwIGNsYXNzPVwidHJhbnNwb3J0XCI+6rWQ7Ya1PC9wPjxwIGNsYXNzPVwicHJpY2VcIj7rrLzqsIA8L3A+PC9kaXY+J1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZURhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNpdHkgPSBjb2RlRGF0YVtpXTtcclxuICAgICAgICAgICAgaWYoZGF0YVtjaXR5LmNvZGVdKXtcclxuICAgICAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJsaW5lXCIgaWQ9XCInK2NpdHkuY29kZSsnXCI+PHAgY2xhc3M9XCJuYW1lXCI+JytjaXR5Lm5hbWUrJzwvcD4nXHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVtjaXR5LmNvZGVdLmhvdGVscyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwiaG90ZWxzXCI+TzwvcD4nXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJob3RlbHNcIj5YPC9wPidcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW2NpdHkuY29kZV0uc3BvdHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcG90ID0gZGF0YVtjaXR5LmNvZGVdLnNwb3RzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2NpdHkuY29kZV0uc3RhdHVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtjaXR5LmNvZGVdLnN0YXR1cy5zcG90cyA9PT0gXCJmaW5pc2hlZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInNwb3RzXCI+642w7J207YSwIO2ZleuztCDsmYTro4w8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihkYXRhW2NpdHkuY29kZV0uc3RhdHVzLnNwb3RzID09PSBcInZlcmlmeWluZ1wiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInNwb3RzXCI+642w7J207YSwIOyEoOuzhCwgMuywqCDqsoDspp3spJE8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihzcG90LmNvbWJpbmluZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJzcG90c1wiPuuNsOydtO2EsCDtlansuZjquLAg7J6R7JeF7KSRPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJzcG90c1wiPuuNsOydtO2EsCDsiJjsp5EsIDHssKgg6rKA7Kad7KSRPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNwb3QuY29tYmluaW5nKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwic3BvdHNcIj7rjbDsnbTthLAg7ZWp7LmY6riwIOyekeyXheykkTwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInNwb3RzXCI+642w7J207YSwIOyImOynkSwgMeywqCDqsoDspp3spJE8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZighZGF0YVtjaXR5LmNvZGVdLnN0YXR1cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrIGNpdHkuY29kZSArIFwiL3N0YXR1c1wiKS5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcG90czpmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVtjaXR5LmNvZGVdLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cImFyZWFcIj5PPC9wPidcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cImFyZWFcIj5YPC9wPidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbY2l0eS5jb2RlXS5tZXRybyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwidHJhbnNwb3J0XCI+TzwvcD4nXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJ0cmFuc3BvcnRcIj5YPC9wPidcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW2NpdHkuY29kZV0ucHJpY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInByaWNlXCI+TzwvcD4nXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJwcmljZVwiPlg8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHR4dCs9ICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJsaW5lXCIgaWQ9XCInK2NpdHkuY29kZSsnXCI+PHAgY2xhc3M9XCJuYW1lIG5vZGF0YVwiPicrY2l0eS5uYW1lKyc8L3A+J1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsc1wiPlg8L3A+PHAgY2xhc3M9XCJzcG90c1wiPuuNsOydtO2EsCDsl4bsnYw8L3A+PHAgY2xhc3M9XCJhcmVhXCI+WDwvcD48cCBjbGFzcz1cInRyYW5zcG9ydFwiPlg8L3A+PHAgY2xhc3M9XCJwcmljZVwiPlg8L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5odG1sKHR4dClcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGlkLCBuYW1lLCBncmFkZSl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgJChcIi5sb2FkaW5nVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICAgICAgICAgIGxldCBjb2RlRGF0YSA9IHNuYXAudmFsKCkuc2V0dGluZy5jaXRpZXM7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKS5jaXRpZXNcclxuICAgICAgICAgICAgdGhpcy5jaXR5RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuY29kZURhdGEgPSBjb2RlRGF0YTtcclxuICAgICAgICAgICAgdGhpcy5pbmZsYXRlX2NpdHlDb2RlVmlldyhjb2RlRGF0YSwgZGF0YSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaXR5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkuanMiLCJpbXBvcnQgTWFudWFsQ29tYmluZSBmcm9tIFwiLi9tYW51YWxDb21iaW5lLmpzXCI7XHJcbmltcG9ydCBWZXJpZnkgZnJvbSBcIi4vc3BvdC92ZXJpZnlpbmcuanNcIjtcclxuXHJcbi8vU3BvdOydmCDri6jqs4TripQg7LSdIDTri6jqs4QgLSDrjbDsnbTthLAg7IiY7KeRLzHssKjqsoDspp0gLT4g642w7J207YSwIO2Vqey5mOq4sCAtPiDrjbDsnbTthLAg7ISg67OELzLssKjqsoDspp0gLT4g7JmE66OMXHJcblxyXG5sZXQgU3BvdCA9IHtcclxuXHJcbiAgICBkYXRhOnt9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19jb25maXJtXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuaW5wdXRDb29yZGluYXRlKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19zcG90Q29vclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19zcG90RGVsZXRlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsZXRlU3BvdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fc3BvdE5hbWVcIikuaHRtbCgpKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLnNwb3QgLmNoZWNrXCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LnNldFJlbWFpbk51bWJlcigkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fcmVtYWluTnVtYmVyXCIpLnZhbCgpKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaWQsIG5hbWUpe1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuY2l0eSAuc3BvdFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuY2l0eU5hbWVcIikuaHRtbChuYW1lKS5hdHRyKFwiaWRcIiwgY2lkKTtcclxuXHJcbiAgICAgICAgaWYoZGF0YS5zdGF0dXMpe1xyXG4gICAgICAgICAgICBpZihkYXRhLnN0YXR1cy5zcG90cyA9PT0gXCJmaW5pc2hlZFwiKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi642w7J207YSwIO2ZleuztCDsmYTro4xcIik7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGRhdGEuc3RhdHVzLnNwb3RzID09PSBcInZlcmlmeWluZ1wiKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi642w7J207YSwIOyEoOuzhCwgMuywqCDqsoDspp3spJFcIik7XHJcbiAgICAgICAgICAgICAgICBWZXJpZnkuaW5pdChkYXRhLnNwb3RzLmNvbWJpbmVkKTtcclxuICAgICAgICAgICAgICAgIC8vY29tYmluZWTqsIAg7J6I6rOgIGNvbWJpbmluZ+ydtCDsl4bsnLzrqbQgMeywqCDsnpDro4zsoJXrpqwg7JmE66OM652864qUIOucu1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoZGF0YS5zcG90cy5jb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi7ZWp7LmY6riwIOyekeyXheykkVwiKTtcclxuICAgICAgICAgICAgICAgIC8vY29tYmluaW5n7J20IOyeiOycvOuptCDtlansuZjquLAg7J6R7JeF7KSR7J20652864qUIOucu1xyXG4gICAgICAgICAgICAgICAgTWFudWFsQ29tYmluZS5pbml0KGRhdGEuc3BvdHMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGVjayhkYXRhLnNwb3RzKTsgLy9jb21iaW5pbmcsIGNvbWJpbmVk6rCAIOyXhuycvOuptCDrjbDsnbTthLAg7IiY7KeRLCDqsoDspp3spJHsnbTrnbzripQg65y7XHJcbiAgICAgICAgICAgICAgICAvL2ZpcnN0Y2hlY2vrpbwg7Ya16rO87ZWY66m0IHRoaXMuYXV0b0NvbWJpbmXsnYQg7Ya17ZW0IGRhdGEuc3BvdHMuY29tYmluaW5n7J20IOunjOuTpOyWtOynkFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnNwb3RzLmNvbWJpbmluZykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLtlansuZjquLAg7J6R7JeF7KSRXCIpXHJcbiAgICAgICAgICAgICAgICAvL2NvbWJpbmluZ+ydtCDsnojsnLzrqbQg7ZWp7LmY6riwIOyekeyXheykkeydtOudvOuKlCDrnLtcclxuICAgICAgICAgICAgICAgIE1hbnVhbENvbWJpbmUuaW5pdChkYXRhLnNwb3RzKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hlY2soZGF0YS5zcG90cyk7IC8vY29tYmluaW5nLCBjb21iaW5lZOqwgCDsl4bsnLzrqbQg642w7J207YSwIOyImOynkSwg6rKA7Kad7KSR7J20652864qUIOucu1xyXG4gICAgICAgICAgICAgICAgLy9maXJzdGNoZWNr66W8IO2GteqzvO2VmOuptCB0aGlzLmF1dG9Db21iaW5l7J2EIO2Gte2VtCBkYXRhLnNwb3RzLmNvbWJpbmluZ+ydtCDrp4zrk6TslrTsp5BcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBhdXRvQ29tYmluZV9fc3BvdFJlc3RydWN0dXJlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGVBcnIgPSBbXCJnZ1wiLFwibHBcIixcIm52XCIsXCJ0YVwiXTtcclxuICAgICAgICBsZXQgY29tYmluaW5nID0ge307XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhLnNwb3RzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpdGVBcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpdGUgPSBzaXRlQXJyW2pdO1xyXG4gICAgICAgICAgICBpZihkYXRhW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbc2l0ZV0ubm9EYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbc2l0ZV1baV0mJiFkYXRhW3NpdGVdW2ldLmRlbGV0ZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFNwb3QgPSBkYXRhW3NpdGVdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/quLDsobQg7KCV67O066W8IG9sZFNwb3TsnbTrnbzqs6Ag7ZWY7J6QLiDsg4jroZzsmrQg7Iqk7Yyf7KCV67O07JeQ64qUIOydtOumhOydhCDtlZwv7JiB7Jy866GcIOu2hO2VoO2VmOqzoCDrnq3tgrnsnYQg67aA7Jes7ZWgIOqyg+ydtOuLpC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga286XCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW46XCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcjogb2xkU3BvdC5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6e1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvW+qwgC3tnqNdLy50ZXN0KG9sZFNwb3QubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm5hbWUua28gPSBvbGRTcG90Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5lbiA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QucmFua1tzaXRlXSA9IGk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYob2xkU3BvdC51cmwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudXJsID0gb2xkU3BvdC51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvbGRTcG90LnRhZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC50YWcgPSBvbGRTcG90LnRhZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb3VudGVyPDEwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzMDBcIitjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjb3VudGVyPDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczBcIitjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzXCIrY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IC8v7ZWc67CU7YC0IOuPjOyVmOuLuVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hdXRvQ29tYmluZV9fY29tYmluZShjb21iaW5pbmcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhdXRvQ29tYmluZV9fY29tYmluZTogZnVuY3Rpb24oY29tYmluaW5nKXtcclxuICAgICAgICAvLyBUT0RPOiDrgZ3rgpjrqbQg7ZWp7LmY6riwIOyekeyXhSDtmZTrqbQgaW5mbGF0Ze2VmOq4sFxyXG5cclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG5cclxuICAgICAgICBsZXQgY29tYmluZU9iaiA9IHt9XHJcbiAgICAgICAgbGV0IGNvbWJpbmVkID0ge31cclxuXHJcbiAgICAgICAgZm9yICh2YXIgY29kZSBpbiBjb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSBjb21iaW5pbmdbY29kZV07XHJcbiAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0gPSBzcG90XHJcbiAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0uY29tYmluZSA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgaGFzQ29tYmluZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy/tlansuaAg6rKD7J20IOyXhuycvOuptCDrsJTroZwgY29tYmluZWQg7Kq97Jy866GcIOuztOuCuOuLpC5cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHRDb2RlIGluIGNvbWJpbmluZykge1xyXG4gICAgICAgICAgICAgICAgaWYoY29kZTx0Q29kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRTcG90ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbWJpbmluZ1t0Q29kZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdFNwb3Rba2V5XSA9IGNvbWJpbmluZ1t0Q29kZV1ba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZighdFNwb3QuZGVsZXRlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBjYWxjdWxhdGVEaWYoc3BvdC5jb29yLCB0U3BvdC5jb29yKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGlmPDI1MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmVbdENvZGVdID0gdFNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb21iaW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFoYXNDb21iaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb21iaW5lZFtjb2RlXSA9IGNvbWJpbmVPYmpbY29kZV07XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29tYmluZU9ialtjb2RlXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpdHkrXCIvc3BvdHNcIikuc2V0KHtcclxuICAgICAgICAgICAgY29tYmluaW5nOmNvbWJpbmVPYmosXHJcbiAgICAgICAgICAgIGNvbWJpbmVkOmNvbWJpbmVkXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgTWFudWFsQ29tYmluZS5pbml0KHtcclxuICAgICAgICAgICAgY29tYmluaW5nOmNvbWJpbmVPYmosXHJcbiAgICAgICAgICAgIGNvbWJpbmVkOmNvbWJpbmVkXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVTcG90OiBmdW5jdGlvbihzaWQsIG5hbWUpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGUgPSBzaWQuc3BsaXQoXCJfXCIpWzBdO1xyXG4gICAgICAgIGxldCBubyA9IHNpZC5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgICAgIGlmKGNvbmZpcm0obmFtZSArIFwiIOyepeyGjOulvCDsoJzqsbDtlanri4jri6QuIOqzhOyGje2VoOq5jOyalD9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIisgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSArIFwiL1wiICsgbm8gKS5zZXQoe2RlbGV0ZWQ6IHRydWV9KTtcclxuICAgICAgICAgICAgJChcIiNcIitzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB0b2FzdChcIuyepeyGjOqwgCDsoJzqsbDrkJjsl4jsirXri4jri6QuXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dENvb3JkaW5hdGU6IGZ1bmN0aW9uKHNpZCwgY29vclR4dCl7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICBsZXQgc2l0ZSA9IHNpZC5zcGxpdChcIl9cIilbMF07XHJcbiAgICAgICAgbGV0IG5vID0gc2lkLnNwbGl0KFwiX1wiKVsxXTtcclxuICAgICAgICBsZXQgY29vciA9IHt9O1xyXG5cclxuICAgICAgICBpZihjb29yVHh0LnNwbGl0KFwiLFwiKS5sZW5ndGggPT09IDIpe1xyXG4gICAgICAgICAgICBsZXQgbGF0ID0gY29vclR4dC5zcGxpdChcIixcIilbMF0udHJpbSgpKjE7XHJcbiAgICAgICAgICAgIGxldCBsbmcgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVsxXS50cmltKCkqMTtcclxuXHJcbiAgICAgICAgICAgIGlmKGlzTmFOKGxhdCl8fGlzTmFOKGxuZykpe1xyXG4gICAgICAgICAgICAgICAgLy/sooztkZwg7KSRIO2VmOuCmOqwgFxyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg67aA7KCV7ZmV7ZWY6rKMIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvb3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OiBsYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOiBsbmdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIrc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubyArIFwiL2Nvb3JcIikuc2V0KGNvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOu2gOygle2Zle2VmOqyjCDsnoXroKXrkJjsl4jsirXri4jri6RcIilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFJlbWFpbk51bWJlcjogZnVuY3Rpb24oc2l0ZSwgbnVtYmVyKXtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG4gICAgICAgIGxldCBjdXRObyA9IG51bWJlci50cmltKCkqMTtcclxuXHJcbiAgICAgICAgaWYoY3V0Tm88MTAwKXtcclxuICAgICAgICAgICAgdG9hc3QoXCIxMDDqsJwg7J207IOB7J2YIOyepeyGjOulvCDsnKDsp4DtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGNvbmZpcm0oXCLsiJzsnIQgXCIrIGN1dE5vICsgXCLsnIQg66+466eMIOyepeyGjOulvCDrqqjrkZAg7KCc6rGw7ZWp64uI64ukLiDrp57sirXri4jquYw/XCIpKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXRPYmogPSB0aGlzLmRhdGEuc3BvdHNbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICBjdXRPYmoubGVuZ3RoID0gY3V0Tm87XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUpLnNldChjdXRPYmopO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlyc3RDaGVjazogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZVwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZS5jaGVja1wiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICAgICAkKFwiLmhlYWRlcl9fc3RhdHVzXCIpLmh0bWwoXCLrjbDsnbTthLAg6rKA7Kad7KSRXCIpXHJcbiAgICAgICAgbGV0IGhhc1Byb2JsZW09IGZhbHNlO1xyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgIGxldCBzZWFyY2hVcmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmtyL21hcHMvcGxhY2UvJyArICQoXCIuY2l0eU5hbWVcIikuaHRtbCgpICtcIitcIlxyXG5cclxuICAgICAgICBsZXQgc2l0ZU9iaiA9IHtcclxuICAgICAgICAgICAgZ2c6IFwi6rWs6riAXCIsXHJcbiAgICAgICAgICAgIG52OiBcIuuEpOydtOuyhFwiLFxyXG4gICAgICAgICAgICB0YTogXCLtirjrpr3slrTrk5zrsJTsnbTsoIBcIixcclxuICAgICAgICAgICAgbHA6IFwi66Gg66as7ZSM656Y64ubXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIHNpdGUgaW4gc2l0ZU9iaikge1xyXG4gICAgICAgICAgICBsZXQgc2l0ZUhhc1Byb2JsZW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yVHh0ID0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+7KKM7ZGc6rCAIOyeheugpeuQmOyngCDslYrsnYAg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICBsZXQgbm9TcG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3RUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7ruYTslrTsnojripQg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG5cclxuICAgICAgICAgICAgaWYoZGF0YVtzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImNoZWNrX190aXRsZVwiPicrc2l0ZU9ialtzaXRlXSsnIOuNsOydtO2EsCDtmZXsnbg8L3A+J1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBkYXRhW3NpdGVdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwb3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGFzQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3QuZGVsZXRlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ydvOu2gOufrCDsgq3soJztlZwg6rSA6rSR7KeAIC0+IOuEmOyWtOqwhOuLpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3QuY29vcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BvdC5jb29yLmxuZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzTmFOKHNwb3QuY29vci5sbmcqMSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3QuY29vci5sYXQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc05hTihzcG90LmNvb3IubGF0KjEpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFoYXNDb29yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQrPSc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicrc2l0ZSsnXycraSsnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCs9ICAgJzxhIGNsYXNzPVwiY2hlY2tfX3Nwb3ROYW1lXCIgaHJlZj1cIicrc2VhcmNoVXJsK3Nwb3QubmFtZSsnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JytzcG90Lm5hbWUrJzwvYT4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0Kz0gICAnPGlucHV0IGNsYXNzPVwiY2hlY2tfX3Nwb3RDb29yXCIgcGxhY2Vob2xkZXI9XCJ4eC54eHh4eCwgeHgueHh4eHgg7ZiV7YOcIOyeheugpVwiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQrPSAgICc8cCBjbGFzcz1cImNoZWNrX19jb25maXJtXCI+7KKM7ZGcIOyeheugpTwvcD48cCBjbGFzcz1cImNoZWNrX19zcG90RGVsZXRlXCI+7J6l7IaMIOyCreygnDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0Kz0nPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQrPSc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicrc2l0ZSsnXycraSsnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQrPSAgICc8cCBjbGFzcz1cImNoZWNrX190eHRcIj4nK2krJyDrsogg6rSA6rSR7KeAPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90VHh0Kz0gICAnPHAgY2xhc3M9XCJjaGVja19fc3BvdERlbGV0ZVwiPuyepeyGjCDsgq3soJw8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG5vQ29vcil7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vQ29vclR4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKG5vU3BvdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vU3BvdFR4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW3NpdGVdLmxlbmd0aD4xNTApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXJnZU9LID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmxhcmdlRGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEubGFyZ2VEYXRhW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMTUw6rCcIOydtOyDgeydmCDrjbDsnbTthLDrpbwg67O07Jyg7ZWY66Ck66m0IOuPhOyLnOuqhS9zcG90cy9sYXJnZURhdGEv7IKs7J207Yq466qF7J20IHRydWXrnbzqs6Ag67aA7Jes65CY7Ja07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXJnZU9LID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZighbGFyZ2VPSyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+JytzaXRlT2JqW3NpdGVdKycg7J6l7IaMIOuNsOydtO2EsOqwgCAxNTDqsJzrpbwg7LSI6rO8KCcrZGF0YVtzaXRlXS5sZW5ndGgrJ+qwnCntlanri4jri6QuPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInK3NpdGUrJ1wiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPGlucHV0IGNsYXNzPVwiY2hlY2tfX3JlbWFpbk51bWJlclwiIHZhbHVlPVwiJytkYXRhW3NpdGVdLmxlbmd0aCsnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNoZWNrX19yZW1haW5MYXJnZURhdGFcIj7qsJzsnZgg7J6l7IaMIOycoOyngO2VmOq4sDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImNoZWNrX190aXRsZVwiPicrc2l0ZU9ialtzaXRlXSsnIOuNsOydtO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK7Iq164uI64ukLjwvcD4nXHJcbiAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiDsm5Drnpgg7IKs7J207Yq4IOuNsOydtO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK64qUIOqyveyasOulvCDrjIDruYTtlZwg67KE7Yq87J2EIOunjOuTpOqzoCBzaXRlIOqwkuycvOuhnCBub2RhdGE6IHRydWXrpbwg64Sj7Ja07KSA64ukLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFzaXRlSGFzUHJvYmxlbSl7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7rsJzqsqzrkJwg66y47KCc6rCAIOyXhuyKteuLiOuLpDwvcD4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGhhc1Byb2JsZW0pe1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2ZpbmlzaFwiPuqygOyCrOulvCDrqqjrkZAg66eI7LOk7Iq164uI64ukPC9wPidcclxuICAgICAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi67Cc6rKs65CcIOusuOygnOqwgCDsl4bslrQg642w7J207YSwIOuzke2VqeydhCDsi6Tsi5ztlanri4jri6QuXCIpXHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0NvbWJpbmVfX3Nwb3RSZXN0cnVjdHVyZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BvdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5L3Nwb3QuanMiLCJsZXQgTWFudWFsQ29tYmluZSA9IHtcclxuICAgIG1hcDoge30sXHJcbiAgICBtYXJrZXI6IHtcclxuICAgICAgICBwcmltZTp7fSxcclxuICAgICAgICB0YXJnZXQ6W11cclxuICAgIH0sXHJcbiAgICBkYXRhOnt9LFxyXG4gICAgcmVtYWluOjAsXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLmNvbWJpbmVfX3RhcmdldFwiKS5vbihcImNsaWNrXCIsIFwiLmNvbWJpbmVfX3RhcmdldF9fZGl2XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oXCIuY29tYmluZV9fdGFyZ2V0X19jaGVja1wiKS50b2dnbGVDbGFzcyhcImNvbWJpbmVfX3RhcmdldF9fY2hlY2tlZFwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLmNvbWJpbmVfX21haW5cIikub24oXCJjbGlja1wiLFwiLmNvbWJpbmVfX25leHRTdGVwXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQubmV4dFN0ZXAoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBuZXh0U3RlcDogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG5cclxuICAgICAgICBsZXQgbWFpbkRhdGEgPSB0aGlzLmRhdGEuY29tYmluaW5nWyQoXCIuY29tYmluZV9fbWFpblwiKS5hdHRyKFwiaWRcIildO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuY29tYmluZV9fdGFyZ2V0X19jaGVja2VkXCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0aWQgPSAkKFwiLmNvbWJpbmVfX3RhcmdldF9fY2hlY2tlZFwiKS5lcShpKS5hdHRyKFwic2lkXCIpXHJcbiAgICAgICAgICAgIGxldCB0YXJnZXREYXRhID0gbWFpbkRhdGEuY29tYmluZVt0aWRdO1xyXG5cclxuICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7J2YIHJhbmvrpbwgbWFpbmREYXRh7J2YIHJhbmvroZwg7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICBmb3IgKHZhciBzaXRlIGluIHRhcmdldERhdGEucmFuaykge1xyXG4gICAgICAgICAgICAgICAgaWYobWFpbkRhdGEucmFua1tzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWFpbkRhdGEucmFua1tzaXRlXSA+IHRhcmdldERhdGEucmFua1tzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5EYXRhLnJhbmtbc2l0ZV0gPSB0YXJnZXREYXRhLnJhbmtbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEucmFua1tzaXRlXSA9IHRhcmdldERhdGEucmFua1tzaXRlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7J2YIO2DnOq3uOulvCBtYWluRGF0YeydmCB0YWfroZwg7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICBpZih0YXJnZXREYXRhLnRhZyl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRhcmdldERhdGEudGFnLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWFpbkRhdGEudGFnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW1haW5EYXRhLnRhZy5pbmNsdWRlcyh0YXJnZXREYXRhLnRhZ1tqXSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnLnB1c2godGFyZ2V0RGF0YS50YWdbal0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnID0gdGFyZ2V0RGF0YS50YWdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v7ZWp7LOQ7KeIIOuMgOyDgeyXkOqyjCB1cmzsnbQg7J6F66Cl65CY7Ja0IOyeiOuLpOuptCBtYWluRGF0YeyXkCDthrXtlantlZjripQg7J6R7JeFXHJcbiAgICAgICAgICAgIGlmKCFtYWluRGF0YS51cmwpe1xyXG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0RGF0YS51cmwpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5EYXRhLnVybCA9IHRhcmdldERhdGEudXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmNvbWJpbmluZ1t0aWRdO1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuY29tYmluZWRbdGlkXSl7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmNvbWJpbmVkW3RpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbWFpbkRhdGEubmFtZS5rbyA9ICQoXCIjbmFtZV9rb1wiKS52YWwoKTtcclxuICAgICAgICBtYWluRGF0YS5uYW1lLmVuID0gJChcIiNuYW1lX2VuXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICBkZWxldGUgbWFpbkRhdGEuY29tYmluZTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhLmNvbWJpbmVkWyQoXCIuY29tYmluZV9fbWFpblwiKS5hdHRyKFwiaWRcIildID0gdGhpcy5kYXRhLmNvbWJpbmluZ1skKFwiLmNvbWJpbmVfX21haW5cIikuYXR0cihcImlkXCIpXTtcclxuICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmNvbWJpbmluZ1skKFwiLmNvbWJpbmVfX21haW5cIikuYXR0cihcImlkXCIpXTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2l0eStcIi9zcG90c1wiKS51cGRhdGUodGhpcy5kYXRhKTtcclxuXHJcblxyXG4gICAgICAgIGlmKE9iamVjdC5rZXlzKHRoaXMuZGF0YS5jb21iaW5pbmcpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgdGhpcy5pbmZsYXRlKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpdHkrXCIvc3RhdHVzL3Nwb3RzXCIpLnNldChcInZlcmlmeWluZ1wiKVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaXR5K1wiL3Nwb3RzL2NvbWJpbmluZ1wiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdG9hc3QoXCLtlansuZjquLAg7J6R7JeF7J20IOyZhOujjOuQmOyXiOyKteuLiOuLpCEgMuy0iCDtm4Qg7Y6Y7J207KeA66W8IOyDiOuhnOqzoOy5qO2VqeuLiOuLpC5cIilcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZVwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZS5jb21iaW5lXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5oZWFkZXJfX3N0YXR1c1wiKS5odG1sKFwi6rSA6rSR7KeAIO2Vqey5mOq4sFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiA0MC43NDg0NCwgbG5nOiAtNzMuOTg1NjYgfSxcclxuICAgICAgICAgICAgem9vbTogMTcsXHJcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHRoYXQuY2hvb3NlQ29vcmRpbmF0ZShlKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmluZmxhdGUoKTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNob29zZUNvb3JkaW5hdGU6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQoXCIuY29tYmluZV9fY29vcmRpbmF0ZVwiKS5odG1sKGUubGF0TG5nLmxhdCgpK1wiLFwiK2UubGF0TG5nLmxuZygpKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXIucHJpbWUuc2V0TWFwKG51bGwpXHJcbiAgICAgICAgdGhpcy5tYXJrZXIucHJpbWUgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGUubGF0TG5nLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YS5jb21iaW5pbmc7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgLy/quLDsobTsl5Ag7LCN7ZiA7J6I642YIOuniOy7pOulvCDsoJzqsbDtlZzri6RcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcclxuICAgICAgICB0aGlzLnJlbWFpbiA9IGtleXMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBzcG90ID0gZGF0YVtrZXlzWzBdXTtcclxuICAgICAgICAkKFwiLmNvbWJpbmVfX21haW5cIikuYXR0cihcImlkXCIsIGtleXNbMF0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhzcG90KVxyXG4gICAgICAgIC8v7J2066aEIOq0gOugqCDsoJXrs7Qg7ZGc7IucXHJcbiAgICAgICAgaWYoc3BvdC5uYW1lLmtvLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJjb21iaW5lX19uYW1lX19wcmltZVwiPuq4sOykgCDsnqXshozrqoU6ICcrIHNwb3QubmFtZS5rbyArJzwvcD4nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImNvbWJpbmVfX25hbWVfX3ByaW1lXCI+6riw7KSAIOyepeyGjOuqhTogJysgc3BvdC5uYW1lLmVuICsnPC9wPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJjb21iaW5lX19wcmltZVwiPidcclxuICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwiY29tYmluZV9fcHJpbWVfX2xlZnRcIj4nXHJcbiAgICAgICAgdHh0Kz0gICAgICAnPGRpdiBjbGFzcz1cImNvbWJpbmVfX2xpbmVcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPu2VnOq4gOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImNvbWJpbmVfX2lucHV0XCIgaWQ9XCJuYW1lX2tvXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5rbysnXCI+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICAgICc8ZGl2IGNsYXNzPVwiY29tYmluZV9fbGluZVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPuyYgeusuOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImNvbWJpbmVfX2lucHV0XCIgaWQ9XCJuYW1lX2VuXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5lbisnXCI+J1xyXG4gICAgICAgIHR4dCs9ICAgICAnPC9kaXY+J1xyXG4gICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNvbWJpbmVfX25leHRTdGVwXCI+64uk7J2MPC9wPidcclxuICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG5cclxuICAgICAgICAvL+yijO2RnCDqtIDroKgg7KCV67O0IO2RnOyLnFxyXG4gICAgICAgIHNwb3QuY29vci5sYXQgPSBzcG90LmNvb3IubGF0KjE7XHJcbiAgICAgICAgc3BvdC5jb29yLmxuZyA9IHNwb3QuY29vci5sbmcqMTtcclxuICAgICAgICB0aGlzLm1hcmtlci5wcmltZSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogc3BvdC5jb29yLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tYXAucGFuVG8oc3BvdC5jb29yKTtcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY29tYmluZV9fbGluZVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPuyijO2RnCc7XHJcbiAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJjb21iaW5lX19jb29yZGluYXRlXCI+Jysgc3BvdC5jb29yLmxhdCArXCIsXCIrc3BvdC5jb29yLmxuZyArJzwvcD4nO1xyXG4gICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIuY29tYmluZV9fbWFpblwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgICAgIHR4dD0nJztcclxuICAgICAgICBsZXQgaWR4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2lkIGluIHNwb3QuY29tYmluZSkge1xyXG4gICAgICAgICAgICBpZHgrKztcclxuICAgICAgICAgICAgbGV0IHRTcG90ID0gc3BvdC5jb21iaW5lW3NpZF07XHJcblxyXG4gICAgICAgICAgICBsZXQgbGF0bG5nID0ge1xyXG4gICAgICAgICAgICAgICAgbGF0OiB0U3BvdC5jb29yLmxhdCoxLFxyXG4gICAgICAgICAgICAgICAgbG5nOiB0U3BvdC5jb29yLmxuZyoxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHRNYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOmxhdGxuZyxcclxuICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogaWR4LnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnRhcmdldC5wdXNoKHRNYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgLy/rs7jrqoXsnLzroZwg7ZWc6riA66qFIOyYgeyWtOuqheydtCDsl4bsnYQg6rK97Jqw66W8IOyytO2BrO2VtOyEnCDrhKPslrTspIDri6QuXHJcbiAgICAgICAgICAgIGlmKCQoXCIjbmFtZV9rb1wiKS52YWwoKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYW1lX2tvXCIpLnZhbCh0U3BvdC5uYW1lLmtvKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCQoXCIjbmFtZV9lblwiKS52YWwoKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYW1lX2VuXCIpLnZhbCh0U3BvdC5uYW1lLmVuKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY29tYmluZV9fdGFyZ2V0X19kaXZcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiY29tYmluZV9fdGFyZ2V0X19udW1iZXJcIj4nK2lkeCsnPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cImNvbWJpbmVfX3RhcmdldF9fY2hlY2tcIiBzaWQ9XCInK3NpZCsnXCI+PC9kaXY+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNvbWJpbmVfX3RhcmdldF9fbmFtZVwiPicrdFNwb3QubmFtZS5rbytcIiBcIit0U3BvdC5uYW1lLmVuKyc8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmNvbWJpbmVfX3RhcmdldFwiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbnVhbENvbWJpbmU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9tYW51YWxDb21iaW5lLmpzIiwidmFyIFZlcmlmeSA9IHtcclxuICAgIGRhdGE6e30sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLnZlcmlmeWluZ19fYm94XCIpLm9uKFwiY2xpY2tcIiwgXCIucmVzdWx0X3JhbmtcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5jaGVjaygkKHRoaXMpKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChcIiN2ZXJpZnlpbmdfX2NvbnRyb2xfX21lcmdlXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQubWVyZ2UoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCIjdmVyaWZ5aW5nX19jb250cm9sX19yZW1vdmVcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5yZW1vdmVBbGwoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlQWxsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGNvbmZpcm0oXCLsoJzqsbDtlaDquYzsmpQ/XCIpKXtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLnJlc3VsdF9yYW5rLnNlbGVjdGVkXCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlkID0gJChcIi5yZXN1bHRfcmFuay5zZWxlY3RlZFwiKS5lcShpKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhW3RpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJChcIi52ZXJpZnlpbmdfX2NvbnRyb2xcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIikrXCIvc3BvdHMvY29tYmluZWRcIikuc2V0KHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMucmFuaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG1lcmdlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCQoXCIucmVzdWx0X3Jhbmsuc2VsZWN0ZWRcIikubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICBsZXQgc2lkID0gJChcIi5yZXN1bHRfcmFuay5zZWxlY3RlZFwiKS5lcSgwKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIGxldCBtYWluRGF0YSA9IHRoaXMuZGF0YVtzaWRdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAkKFwiLnJlc3VsdF9yYW5rLnNlbGVjdGVkXCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlkID0gJChcIi5yZXN1bHRfcmFuay5zZWxlY3RlZFwiKS5lcShpKS5wYXJlbnQoKS5hdHRyKFwiaWRcIilcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXREYXRhID0gdGhpcy5kYXRhW3RpZF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7J2YIHJhbmvrpbwgbWFpbmREYXRh7J2YIHJhbmvroZwg7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiB0YXJnZXREYXRhLnJhbmspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihtYWluRGF0YS5yYW5rW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobWFpbkRhdGEucmFua1tzaXRlXSA+IHRhcmdldERhdGEucmFua1tzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS5yYW5rW3NpdGVdID0gdGFyZ2V0RGF0YS5yYW5rW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5EYXRhLnJhbmtbc2l0ZV0gPSB0YXJnZXREYXRhLnJhbmtbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8v7ZWp7LOQ7KeIIOuMgOyDgeydmCDtg5zqt7jrpbwgbWFpbkRhdGHsnZggdGFn66GcIO2Gte2Vqe2VmOuKlCDsnpHsl4VcclxuICAgICAgICAgICAgICAgIGlmKHRhcmdldERhdGEudGFnKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRhcmdldERhdGEudGFnLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1haW5EYXRhLnRhZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighbWFpbkRhdGEudGFnLmluY2x1ZGVzKHRhcmdldERhdGEudGFnW2pdKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnLnB1c2godGFyZ2V0RGF0YS50YWdbal0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnID0gdGFyZ2V0RGF0YS50YWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL+2VqeyzkOyniCDrjIDsg4Hsl5DqsowgdXJs7J20IOyeheugpeuQmOyWtCDsnojri6TrqbQgbWFpbkRhdGHsl5Ag7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICAgICAgaWYoIW1haW5EYXRhLnVybCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGFyZ2V0RGF0YS51cmwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS51cmwgPSB0YXJnZXREYXRhLnVybDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YVt0aWRdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNvbmZpcm0oXCLrs5HtlantlaDquYzsmpQ/XCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnZlcmlmeWluZ19fY29udHJvbFwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiKyQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpK1wiL3Nwb3RzL2NvbWJpbmVkXCIpLnNldCh0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFuaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi7ISg7YOd65CcIOq0gOq0keyngOqwgCDtlZjrgpjsnoXri4jri6RcIilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrOiBmdW5jdGlvbihkaXYpe1xyXG4gICAgICAgIGRpdi50b2dnbGVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgIGxldCBzaWQgPSBkaXYucGFyZW50KCkuYXR0cihcImlkXCIpO1xyXG5cclxuICAgICAgICBpZigkKFwiLnJlc3VsdF9yYW5rLnNlbGVjdGVkXCIpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgJChcIi52ZXJpZnlpbmdfX2NvbnRyb2xcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJChcIi52ZXJpZnlpbmdfX2NvbnRyb2xcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJhbms6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgbWF4U2NvcmU6IDIwMCwgIC8vMeychOuKlCAyMDDsoJAgfiAxODDsnITripQgMjDsoJBcclxuICAgICAgICAgICAgb25lTWludXM6LTYwMCwgIC8vMeqwnCDsgqzsnbTtirjsl5Drp4wg7IaM6rCc65CcIOq0gOq0keyngOydvCDqsr3smrAg7LCo6rCQ65CY64qUIOygkOyImFxyXG4gICAgICAgICAgICB0d29NdW51czotMzAwLCAvLzLqsJwg7IKs7J207Yq47JeQ66eMIOyGjOqwnOuQnCDqtIDqtJHsp4Dsnbwg6rK97JqwIOywqOqwkOuQmOuKlCDsoJDsiJhcclxuICAgICAgICAgICAgbnZBZGQ6MTAwICAvL+uEpOydtOuyhOyXkOunjCDshozqsJzrkJwg6rSA6rSR7KeA7J28IOqyveyasCDrtoDsl6zrkJjripQg7LaU6rCA7KCQXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByYW5rQXJyYXkgPSBbXTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXHJcblxyXG4gICAgICAgIGZvciAodmFyIHNpZCBpbiB0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSB0aGlzLmRhdGFbc2lkXTtcclxuICAgICAgICAgICAgbGV0IG51bVNpdGUgPSBPYmplY3Qua2V5cyhzcG90LnJhbmspLmxlbmd0aDsgLy/rk7HsnqzrkJwg7IKs7J207Yq4IOqwr+yImFxyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwXHJcbiAgICAgICAgICAgIGxldCBhdmcgPSAwXHJcbiAgICAgICAgICAgIGxldCBiZXN0UmFuayA9IE9iamVjdC5rZXlzKHRoaXMuZGF0YSkubGVuZ3RoICsgNTAgLy/qsIDsnqUg64aS7J2AKOyIq+yekOuhnOyEnCDrgq7snYApIOuere2CueydtCDrtoDsl6zrkJwg7IKs7J207Yq4IOuere2CuVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiBzcG90LnJhbmspIHtcclxuICAgICAgICAgICAgICAgIGlmKGJlc3RSYW5rPnNwb3QucmFua1tzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdFJhbmsgPSBzcG90LnJhbmtbc2l0ZV0gLy9iZXN0UmFua+ulvCDqsLHsi6DtlZzri6RcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHNwb3QucmFua1tzaXRlXTxPYmplY3Qua2V5cyh0aGlzLmRhdGEpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/smIggLSDqtIDqtJHsp4DqsIAgMTAw7JyE7J24642wIOuhoOumrO2UjOuemOuLm+yXkOyEnCAxMDPsnIQg7IaM6rCcIC0+IOyXhuuKlCDqsoMg7Leo6riJXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUrPSAoY29uZmlnLm1heFNjb3JlIC0gc3BvdC5yYW5rW3NpdGVdKTtcclxuICAgICAgICAgICAgICAgICAgICBhdmcrPSAoY29uZmlnLm1heFNjb3JlIC0gc3BvdC5yYW5rW3NpdGVdKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG51bVNpdGU+MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bVNpdGUtLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2NvcmUtPSBiZXN0UmFuayo1O1xyXG4gICAgICAgICAgICBhdmcgPSBhdmcgLyBudW1TaXRlO1xyXG5cclxuICAgICAgICAgICAgc2NvcmUrPSBhdmcqMjU7XHJcblxyXG4gICAgICAgICAgICBpZihudW1TaXRlID09PSAxKXtcclxuICAgICAgICAgICAgICAgIHNjb3JlICs9IGNvbmZpZy5vbmVNaW51cztcclxuICAgICAgICAgICAgICAgIGlmKHNwb3QucmFuay5udil7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUrPSBjb25maWcubnZBZGQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobnVtU2l0ZSA9PT0gMil7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSBjb25maWcudHdvTXVudXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJhbmtBcnJheS5wdXNoKHtzaWQ6c2lkLHNjb3JlOnNjb3JlfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhbmtBcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5zY29yZSA+IGIuc2NvcmUgPyAtMSA6IGEuc2NvcmUgPCBiLnNjb3JlID8gMSA6IDA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyhyYW5rQXJyYXkpXHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFua0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhXHJcblxyXG4gICAgICAgICAgICBsZXQgc2lkID0gcmFua0FycmF5W2ldLnNpZDtcclxuICAgICAgICAgICAgbGV0IHVybCA9IFwiXCJcclxuICAgICAgICAgICAgaWYoZGF0YVtzaWRdLnVybCl7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBkYXRhW3NpZF0udXJsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHJhbmtpbmcgPSB7XHJcbiAgICAgICAgICAgICAgICBnZzpcIlwiLFxyXG4gICAgICAgICAgICAgICAgbnY6XCJcIixcclxuICAgICAgICAgICAgICAgIGxwOlwiXCIsXHJcbiAgICAgICAgICAgICAgICB0YTpcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiBkYXRhW3NpZF0ucmFuaykge1xyXG4gICAgICAgICAgICAgICAgcmFua2luZ1tzaXRlXSA9IGRhdGFbc2lkXS5yYW5rW3NpdGVdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInJlc3VsdF9ib3hcIiBpZD1cIicrc2lkKydcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwicmVzdWx0X3JhbmtcIj4nKyhpKzEpKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPGlucHV0IGNsYXNzPVwicmVzdWx0X25hbWVcIiB2YWx1ZT1cIicrZGF0YVtzaWRdLm5hbWUua28rXCItLVwiK2RhdGFbc2lkXS5uYW1lLmVuKydcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxpbnB1dCBjbGFzcz1cInJlc3VsdF91cmxcIiB2YWx1ZT1cIicrdXJsKydcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInJlc3VsdF9nZ1wiPicrcmFua2luZy5nZysnPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwicmVzdWx0X252XCI+JytyYW5raW5nLm52Kyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJyZXN1bHRfbHBcIj4nK3JhbmtpbmcubHArJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInJlc3VsdF90YVwiPicrcmFua2luZy50YSsnPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwicmVzdWx0X3NhdmUgc2F2ZV9zcG90XCI+7KCA7J6lPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwicmVzdWx0X3JlbW92ZSByZW1vdmVfc3BvdFwiPuyCreygnDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIudmVyaWZ5aW5nX19ib3hcIikuaHRtbCh0eHQpXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RfX3BhZ2VcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLnNwb3RfX3BhZ2UudmVyaWZ5aW5nXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5oZWFkZXJfX3N0YXR1c1wiKS5odG1sKFwi6rSA6rSR7KeAIDLssKgg6rKA7KadXCIpO1xyXG5cclxuICAgICAgICBpZighZGF0YS5yYW5rZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnJhbmsoKTsvL+uere2CuSDrjbDsnbTthLDqsIAg7JeG7Jy866m0IOunjOuToOuLpFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvbG8/XCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmVyaWZ5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvc3BvdC92ZXJpZnlpbmcuanMiLCJsZXQgSG90ZWwgPSB7XHJcbiAgICBkYXRhOiB7fSxcclxuICAgIGNpdHk6IFwiXCIsXHJcbiAgICBjaXR5TmFtZTogXCJcIixcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaWQsIG5hbWUpe1xyXG4gICAgICAgICQoXCIuY2l0eU5hbWVcIikuaHRtbChuYW1lKS5hdHRyKFwiaWRcIiwgY2lkKTtcclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuaG90ZWxcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2l0eSA9IGNpZDtcclxuICAgICAgICB0aGlzLmNpdHlOYW1lID0gbmFtZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG5cclxuICAgICAgICB0aGlzLnNjb3JlKCk7XHJcbiAgICAgICAgLy/soJDsiJgg67aA7Jes66W8IOyLpOyLnO2VnOuLpC5cclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHN0YXR1cyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZih0aGlzLmRhdGEuc3RhdHVzKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuZGF0YS5zdGF0dXMuaG90ZWxzKXtcclxuICAgICAgICAgICAgICAgIC8vc3RhdXRz64qUIOyeiOuKlOuNsCDtmLjthZTsl5Ag64yA7ZWcIHN0YXR1cyDrjbDsnbTthLDqsIAg7JeG7Jy866m0IOunjOuTpOyWtCDrhKPripTri6QuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RhdHVzLmhvdGVscyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNhZmV0eTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjaWxpdHk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvc3RFZmY6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gc3RhdHVzIOuNsOydtO2EsCDsnpDssrTqsIAg7JeG7Jy866m0IOunjOuTpOyWtCDrhKPripTri6QuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICBob3RlbHM6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2FmZXR5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBmYWNpbGl0eTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY29zdEVmZjogZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdHVzID0gdGhpcy5kYXRhLnN0YXR1cy5ob3RlbHM7XHJcblxyXG4gICAgICAgIC8v7KCQ7IiYIOyytOqzhOqwgCDsmYTshLHrkJjslrTsnojripTsp4Ag6rKA7IKs7ZWY6rOgIOyXhuycvOuptCDsoJDsiJjrpbwg67aA7Jes7ZWY64qUIO2VqOyImOulvCDsi6TtlontlZzri6RcclxuICAgICAgICBpZihzdGF0dXMudHJhbnNwb3J0KXtcclxuICAgICAgICAgICAgJChcIiNzdGF0dXNfdHJhbnNwb3J0XCIpLmh0bWwoXCLsoJXrs7TqsIAg7KG07J6s7ZWp64uI64ukLlwiKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEubWV0cm8mJnRoaXMuZGF0YS5tZXRyb0xpbmUpe1xyXG4gICAgICAgICAgICAgICAgJChcIiNzdGF0dXNfdHJhbnNwb3J0XCIpLmh0bWwoXCLrjIDspJHqtZDthrUg7KCV67O0IOuwnOqyrC4g6rWQ7Ya1IO2OuOydmOyEseydhCDqs4TsgrDtlanri4jri6QuXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlX3RyYW5zcG9ydCgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIjc3RhdHVzX3RyYW5zcG9ydFwiKS5odG1sKFwi64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsnoXroKXrkJjsp4Ag7JWK7JWEIOq1kO2GtSDtjrjsnZjshLHsnYQg6rOE7IKw7ZWgIOyImCDsl4bsirXri4jri6QuIOuNsOydtO2EsOulvCDsnoXroKXtlbTso7zshLjsmpQuXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHN0YXR1cy5zYWZldHkpe1xyXG4gICAgICAgICAgICAkKFwiI3N0YXR1c19zYWZldHlcIikuaHRtbChcIuygleuztOqwgCDsobTsnqztlanri4jri6QuXCIpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmVfc2FmZXR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzdGF0dXMuZmFjaWxpdHkpe1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RhdHVzLmNvc3RFZmYpe1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5ob3RlbHMpXHJcbiAgICB9LFxyXG5cclxuICAgIHNjb3JlX3NhZmV0eTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgY2l0eSA9IHRoaXMuY2l0eTtcclxuICAgICAgICBsZXQgb3JkZXJBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBsZXQgc2FmZV90eHQgPSBbXTtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgLy/qtZDthrUg7Y647J2Y7ISxIOygkOyImOu2gOyXrOyaqVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmVfdHJhbnNwb3J0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gdGhpcy5jaXR5XHJcbiAgICAgICAgbGV0IG9yZGVyQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyYW5zcG9ydF90eHQgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIC8v6rWQ7Ya1IO2OuOydmOyEsSDsoJDsiJjrtoDsl6zsmqlcclxuICAgICAgICAgICAgbGV0IGdvb2RMaW5lID0gW107XHJcbiAgICAgICAgICAgIC8v7KKL7J2AIOyngO2VmOyyoCDrnbzsnbjrk6QgQXJyYXlcclxuICAgICAgICAgICAgbGV0IHZpc2l0YWJsZSA9IFtdO1xyXG4gICAgICAgICAgICAvL+2ZmOyKuSDsl4bsnbQg6rCIIOyImCDsnojripQg6rSA6rSR7KeAIOuqqeuhnVxyXG4gICAgICAgICAgICBsZXQgbmVhcmVzdCA9IHtkaXN0YW5jZToxMDAwLCBuYW1lOlwiXCIsIGNvZGU6XCJcIn07XHJcbiAgICAgICAgICAgIC8v6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqBcclxuICAgICAgICAgICAgbGV0IGxpbmVObyA9IDBcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLm1ldHJvSW5mbyl7XHJcbiAgICAgICAgICAgICAgICBsaW5lTm8gPSBPYmplY3Qua2V5cyhob3RlbC5tZXRyb0luZm8pLmxlbmd0aFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vMTDrtoTqsbDrpqwg7J2064K07J2YIOyngO2VmOyyoCAg64W47ISgIOqwnOyImFxyXG5cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIG1ldExpbmUgaW4gaG90ZWwubWV0cm9JbmZvKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwubWV0cm9JbmZvW21ldExpbmVdLmRpc3RhbmNlIDwgbmVhcmVzdC5kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdCA9IGhvdGVsLm1ldHJvSW5mb1ttZXRMaW5lXVxyXG4gICAgICAgICAgICAgICAgICAgIC8v6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqAg6rCx7IugXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5kYXRhLm1ldHJvTGluZVttZXRMaW5lXS5zY29yZT44MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ29vZExpbmUucHVzaChtZXRMaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgIC8v7KKL7J2AIOudvOyduOydtOuptCDtkbjsi5ztlahcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YS5tZXRyb0xpbmVbbWV0TGluZV0uc3BvdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcG90ID0gdGhpcy5kYXRhLm1ldHJvTGluZVttZXRMaW5lXS5zcG90W2ldXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXZpc2l0YWJsZS5pbmNsdWRlcyhzcG90Lm5hbWUpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRhYmxlLnB1c2goc3BvdC5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoTWF0aC5jZWlsKChuZWFyZXN0LmRpc3RhbmNlKS83MCk8NCl7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnRfdHh0LnB1c2goJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKgIOyXreydgCA8Yj4nICsgbmVhcmVzdC5uYW1lICsgXCI8L2I+IOyXreycvOuhnCwgPHN0cm9uZz7rj4Trs7Qg64uoIFwiKyBNYXRoLmNlaWwoKG5lYXJlc3QuZGlzdGFuY2UpLzcwKSArXCLrtoQg6rGw66asPC9zdHJvbmc+XCIpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydF90eHQucHVzaCgn6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqAg7Jet7J2AIDxiPicgKyBuZWFyZXN0Lm5hbWUgKyBcIjwvYj4g7Jet7Jy866GcLCDrj4Trs7QgXCIrIE1hdGguY2VpbCgobmVhcmVzdC5kaXN0YW5jZSkvNzApICtcIuu2hCDqsbDrpqxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJhbnNwb3J0X3R4dC5wdXNoKCfsiJnshozsl5DshJwg64+E67O0IDEw67aE6rGw66asIOydtOuCtOyXkCA8Yj7sp4DtlZjssqAgJyArIGxpbmVObyArICfqsJwg64W47ISgPC9iPuydtCDsp4DrgqgnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGdvb2RMaW5lLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGlmKGdvb2RMaW5lLmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRfdHh0LnB1c2goJ+q3uCDspJHsl5DshJzrj4Qg7Iuk7KeI7KCB7Jy866GcICcrdGhpcy5jaXR5TmFtZSsnIOq0gOq0keyXkCDtjrjrpqztlZwgPHN0cm9uZz4nKyBnb29kTGluZSArICftmLjshKA8L3N0cm9uZz7snbQg7KeA64KY64qUIDxiPuy0iCDsl63shLjqtow8L2I+Jyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRfdHh0LnB1c2goJ+q3uCDspJHsl5DshJzrj4Qg7Iuk7KeI7KCB7Jy866GcICcrdGhpcy5jaXR5TmFtZSsnIOq0gOq0keyXkCDtjrjrpqztlZwgPHN0cm9uZz4nKyBnb29kTGluZSArICftmLjshKA8L3N0cm9uZz7snbQg7KeA64KY64qUIDxiPiDsl63shLjqtow8L2I+Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzcG90Tm8gPSB2aXNpdGFibGUubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihzcG90Tm8+MCl7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiAxMDDrjIAg6rSA6rSR7KeAIC0+IOuJtOyalSDsi6TsoJwgc3BvdCDrjbDsnbTthLAg6ri47J20XHJcbiAgICAgICAgICAgICAgICBpZihzcG90Tm8+OTApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydF90eHQucHVzaCgnPGI+JyArIHRoaXMuY2l0eU5hbWUgKyAnIDEwMOuMgCDqtIDqtJHsp4Ag7KSRICcrc3BvdE5vKyfqsJw8L2I+66W8IO2ZmOyKuSDsl4bsnbQg67Cp66y47ZWgIOyImCDsnojripQgPHN0cm9uZz7stZzqs6DsnZgg6rWQ7Ya1IOyalOyngDwvc3Ryb25nPicpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoc3BvdE5vPjc1KXtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRfdHh0LnB1c2goJzxiPicgKyB0aGlzLmNpdHlOYW1lICsgJyAxMDDrjIAg6rSA6rSR7KeAIOykkSAnK3Nwb3RObysn6rCcPC9iPuulvCDtmZjsirkg7JeG7J20IOuwqeusuO2VoCDsiJgg7J6I64qUIDxzdHJvbmc+6rWQ7Ya1IOyalOyngDwvc3Ryb25nPicpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0X3R4dC5wdXNoKHRoaXMuY2l0eU5hbWUgKyAnIDEwMOuMgCDqtIDqtJHsp4Ag7KSRICcrc3BvdE5vKyfqsJzrpbwg7ZmY7Iq5IOyXhuydtCDrsKnrrLgg6rCA64qlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIG1ldExpbmUgaW4gaG90ZWwubWV0cm9JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWV0RGlzdGFuY2UgPSBob3RlbC5tZXRyb0luZm9bbWV0TGluZV0uZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSAoMTAwMDAgLSBtZXREaXN0YW5jZSkqdGhpcy5kYXRhLm1ldHJvTGluZVttZXRMaW5lXS5zY29yZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3JkZXJBcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHNjb3JlOiBzY29yZSxcclxuICAgICAgICAgICAgICAgIGhpZDogaGlkXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5leHBsYWluKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4udHJhbnNwb3J0ID0gdHJhbnNwb3J0X3R4dDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5leHBsYWluID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDp0cmFuc3BvcnRfdHh0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9yZGVyQXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuc2NvcmUgPCBiLnNjb3JlID8gMSA6IGEuc2NvcmUgPiBiLnNjb3JlID8gLTEgOiAwO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBvcmRlckFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbb3JkZXJBcnJheVtpXS5oaWRdO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSBNYXRoLnJvdW5kKCgxIC0gKGkvbGVuKSooaS9sZW4pKSo2MCkvMTAgICsgNFxyXG4gICAgICAgICAgICAgLy80LjAgfiAxMC4wIOyCrOydtOydmCDsoJDsiJjrpbwg7IaM7IiY7KCQIDHsnpDrpqzquYzsp4Ag67aA7Jes7ZWc64ukLlxyXG4gICAgICAgICAgICAgLy/rhpLsnYAg7KCQ7IiY6rCAIOuNlCDrp47ri7lcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC50cmFuc3BvcnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6IHNjb3JlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTpzY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIiNzdGF0dXNfdHJhbnNwb3J0XCIpLmh0bWwoXCLrjIDspJHqtZDthrUg7KCV67O0IOuwnOqyrC4g6rWQ7Ya1IO2OuOydmOyEseydhCDqs4TsgrDtlanri4jri6QuIC0g6rOE7IKw7J2EIOyZhOujjO2WiOyKteuLiOuLpC5cIik7XHJcbiAgICAgICAgdGhpcy5kYXRhLnN0YXR1cy5ob3RlbHMudHJhbnNwb3J0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2l0eSkudXBkYXRlKHRoaXMuZGF0YSlcclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmVfZmFjaWxpdHk6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb3RlbDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5L2hvdGVsLmpzIiwibGV0IEFyZWEgPSB7XHJcbiAgICBkYXRhOnt9LFxyXG4gICAgY2l0eTpcIlwiLFxyXG4gICAgY2l0eU5hbWU6XCJcIixcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgJChcIi5hcmVhX19wYWdlXCIpLm9uKFwiY2hhbmdlXCIsIFwiLmFyZWFfX2xpbmUgaW5wdXRcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5zY29yZUNoYW5nZSgkKHRoaXMpKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEsIGNpZCwgbmFtZSl7XHJcbiAgICAgICAgJChcIi5jaXR5TmFtZVwiKS5odG1sKG5hbWUpLmF0dHIoXCJpZFwiLCBjaWQpO1xyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5jaXR5X19wYWdlcyBcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmFyZWFcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2l0eSA9IGNpZDtcclxuICAgICAgICB0aGlzLmNpdHlOYW1lID0gbmFtZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5pbmZsYXRlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNjb3JlQ2hhbmdlOiBmdW5jdGlvbihkaXYpe1xyXG5cclxuICAgICAgICBpZihpc05hTihkaXYudmFsKCkqMSkpe1xyXG4gICAgICAgICAgICB0b2FzdChcIuyIq+yekOuhnOunjCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgIGRpdi52YWwoMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGRpdi52YWwoKT4xMHx8ZGl2LnZhbCgpPDEpe1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCIxfjEwIOyCrOydtOydmCDsiKvsnpDrpbwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgZGl2LnZhbCgwKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihkaXYuaGFzQ2xhc3MoXCJpbnB1dF9fc2NvcmVcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZHggPSAkKFwiLmlucHV0X19zY29yZVwiKS5pbmRleChkaXYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi52YWwoZGl2LnZhbCgpKjEpXHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QodGhpcy5kYXRhLmFyZWFbaWR4XS5uYW1lK1wi7J2YIOy5mOyViOygkOyImOqwgCBcIitkaXYudmFsKCkqMStcIuygkOycvOuhnCDrs4Dqsr3rkJjsl4jsirXri4jri6QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK3RoaXMuY2l0eStcIi9hcmVhL1wiK2lkeCtcIi9zYWZldHkvc2NvcmVcIikuc2V0KGRpdi52YWwoKSlcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGRpdi5oYXNDbGFzcyhcImlucHV0X19taXNkZW1lYW5vclwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkeCA9ICQoXCIuaW5wdXRfX21pc2RlbWVhbm9yXCIpLmluZGV4KGRpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LnZhbChkaXYudmFsKCkqMSlcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdCh0aGlzLmRhdGEuYXJlYVtpZHhdLm5hbWUrXCLsnZgg6rK967KU7KOEIOygkOyImOqwgCBcIitkaXYudmFsKCkqMStcIuygkOycvOuhnCDrs4Dqsr3rkJjsl4jsirXri4jri6QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK3RoaXMuY2l0eStcIi9hcmVhL1wiK2lkeCtcIi9zYWZldHkvbWlzZGVtZWFub3JcIikuc2V0KGRpdi52YWwoKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcbiAgICAgICAgbGV0IGFyZWFkYXRhID0ge31cclxuXHJcbiAgICAgICAgaWYodGhpcy5kYXRhLmFyZWEpe1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YS5hcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJlYSA9IHRoaXMuZGF0YS5hcmVhW2ldO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJlYSlcclxuICAgICAgICAgICAgICAgIGlmKCFhcmVhLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v67iM66Gc65Oc7Juo7J20LCDshLztirjrn7TtjIztgawg65OxIOuEk+ydgCDsp4Dsl63snYQg7LCo7KeA7ZWY64qUIOq0gOq0keyngOuPhCBhcmVhIOy3qOq4ie2VmOq4sCDrlYzrrLjsl5Ag6rG465+s64K06riwXHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImFyZWFfX2RpdlwiPidcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwiYXJlYV9fbGluZVwiPidcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICAgICAnPHAgY2xhc3M9XCJhcmVhX19uYW1lXCI+JythcmVhLm5hbWUrJzwvcD4nXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihhcmVhLnNhZmV0eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXJlYV9fbGluZV9fc3ViVGl0bGVcIj7suZjslYjsoJDsiJg8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVhLnNhZmV0eS5zY29yZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8aW5wdXQgY2xhc3M9XCJhcmVhX19saW5lX19pbnB1dC0tc2hvcnQgaW5wdXRfX3Njb3JlXCIgdmFsdWU9XCInK2FyZWEuc2FmZXR5LnNjb3JlKydcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPGlucHV0IGNsYXNzPVwiYXJlYV9fbGluZV9faW5wdXQtLXNob3J0IGlucHV0X19zY29yZVwiIHZhbHVlPVwiMFwiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhcmVhX19saW5lX19zdWJUaXRsZVwiPuqyveuylOyjhOygkOyImDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZWEuc2FmZXR5Lm1pc2RlbWVhbm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxpbnB1dCBjbGFzcz1cImFyZWFfX2xpbmVfX2lucHV0LS1zaG9ydCBpbnB1dF9fbWlzZGVtZWFub3JcIiB2YWx1ZT1cIicrYXJlYS5zYWZldHkubWlzZGVtZWFub3IrJ1wiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8aW5wdXQgY2xhc3M9XCJhcmVhX19saW5lX19pbnB1dC0tc2hvcnQgaW5wdXRfX21pc2RlbWVhbm9yXCIgdmFsdWU9XCIwXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXJlYV9fbGluZV9fc3ViVGl0bGVcIj7suZjslYjsoJDsiJg8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8aW5wdXQgY2xhc3M9XCJhcmVhX19saW5lX19pbnB1dC0tc2hvcnQgaW5wdXRfX3Njb3JlXCIgdmFsdWU9XCIwXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImFyZWFfX2xpbmVfX3N1YlRpdGxlXCI+6rK967KU7KOE7KCQ7IiYPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPGlucHV0IGNsYXNzPVwiYXJlYV9fbGluZV9faW5wdXQtLXNob3J0IGlucHV0X19taXNkZW1lYW5vclwiIHZhbHVlPVwiMFwiPidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIuYXJlYV9fcGFnZVwiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcmVhO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvYXJlYS5qcyIsImxldCBTdWJ3YXkgPSB7XHJcbiAgICBtYXA6e30sXHJcbiAgICBtYXJrZXI6ZmFsc2UsXHJcbiAgICBtZXRybzpbXSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlsb1wiKVxyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9ueWMvbWV0cm9cIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICB0aGF0Lm1ldHJvID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3Vid2F5TWFwJyksIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcjogeyBsYXQ6IDQwLjc0ODQ0LCBsbmc6IC03My45ODU2NiB9LFxyXG4gICAgICAgICAgICAgICAgem9vbTogMTMsXHJcbiAgICAgICAgICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzY2FsZUNvbnRyb2w6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1hcC5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZFN1YndheShlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBmaW5kU3Vid2F5OiBmdW5jdGlvbihlKXtcclxuICAgICAgICBsZXQgY29vciA9IHtcclxuICAgICAgICAgICAgbGF0OmUubGF0TG5nLmxhdCgpLFxyXG4gICAgICAgICAgICBsbmc6ZS5sYXRMbmcubG5nKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMubWFya2VyKXtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXIuc2V0TWFwKG51bGwpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogZS5sYXRMbmcsXHJcbiAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgbGV0IG1ldHJvSW5mbyA9IHt9XHJcbiAgICAgICAgbGV0IG1ldHJvQnlTdG4gPSB7fTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0NzM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbWV0cm9OYW1lID0gdGhpcy5tZXRyb1tpXS5uYW1lO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRpZiA9IE1hdGgucm91bmQoY2FsY3VsYXRlRGlmKGNvb3IsdGhpcy5tZXRyb1tpXS5jb29yKSk7XHJcblxyXG4gICAgICAgICAgICBpZihkaWY8NzAwKXtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5tZXRyb1tpXS5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmUgPSB0aGlzLm1ldHJvW2ldLmxpbmVba10uc2xpY2UoMCwxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWV0cm9JbmZvW2xpbmVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGlmPG1ldHJvSW5mb1tsaW5lXS5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0cm9JbmZvW2xpbmVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZjogZGlmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldHJvTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvSW5mb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZjogZGlmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbWV0cm9OYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobWV0cm9CeVN0blttZXRyb05hbWVdKXtcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb0J5U3RuW21ldHJvTmFtZV0ubGluZSA9IG1ldHJvQnlTdG5bbWV0cm9OYW1lXS5saW5lLmNvbmNhdCh0aGlzLm1ldHJvW2ldLmxpbmUpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb0J5U3RuW21ldHJvTmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZjogZGlmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLm1ldHJvW2ldLmxpbmVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtZXRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGxpbmUgaW4gbWV0cm9JbmZvKSB7XHJcbiAgICAgICAgICAgIG1ldEFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbGluZTpsaW5lLFxyXG4gICAgICAgICAgICAgICAgbmFtZTptZXRyb0luZm9bbGluZV0ubmFtZSxcclxuICAgICAgICAgICAgICAgIGRpZjptZXRyb0luZm9bbGluZV0uZGlmXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1ldFN0bkFycmF5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBtZXRyb0J5U3RuKSB7XHJcbiAgICAgICAgICAgIG1ldFN0bkFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbGluZTptZXRyb0J5U3RuW25hbWVdLmxpbmUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkaWY6bWV0cm9CeVN0bltuYW1lXS5kaWZcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXRBcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5kaWYgPiBiLmRpZiA/IDEgOiBhLmRpZiA8IGIuZGlmID8gLTEgOiAwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbWV0U3RuQXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZGlmID4gYi5kaWYgPyAxIDogYS5kaWYgPCBiLmRpZiA/IC0xIDogMDtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0eHQrPSc8cCBjbGFzcz1cInN1YndheV9faW5mb19fdGl0bGVcIj7sl63rs4Q8L3A+J1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpdlwiPidcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldFN0bkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2xpbmVcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fc3RuTmFtZVwiPicrIG1ldFN0bkFycmF5W2ldLm5hbWUgKyAn7JetPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19kaWZcIj4nKyBNYXRoLmNlaWwobWV0U3RuQXJyYXlbaV0uZGlmLzgwKSArICfrtoQg6rGw66asPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX2xpbmVMaW5lXCI+J1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IG1ldFN0bkFycmF5W2ldLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKG1ldFN0bkFycmF5W2ldLmxpbmVba10ubGVuZ3RoID09PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX2xpbmVOYW1lIGxuXycrbWV0U3RuQXJyYXlbaV0ubGluZVtrXSsnXCI+JyttZXRTdG5BcnJheVtpXS5saW5lW2tdICsgJzwvcD4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHh0Kz0gICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG4gICAgICAgIHR4dCs9JzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX190aXRsZVwiPuuFuOyEoOuzhDwvcD4nXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fZGl2XCI+J1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0QXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fbGluZVwiPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2xpbmVOYW1lIGxuXycrbWV0QXJyYXlbaV0ubGluZSsnXCI+JyttZXRBcnJheVtpXS5saW5lICsgJzwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19kaWZcIj4nKyBNYXRoLmNlaWwobWV0QXJyYXlbaV0uZGlmLzgwKSArICfrtoQg6rGw66asPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3N0bk5hbWVcIj4nKyBtZXRBcnJheVtpXS5uYW1lICsgJ+yXrTwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICAkKFwiLnN1YndheV9faW5mb1wiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN1YndheTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zdWJ3YXkuanMiLCJsZXQgQWNjb3VudCA9IHtcclxuICAgIHVzZXI6IHt9LFxyXG4gICAgaW5pdDogZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB1aWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYodWlkICE9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyW3VpZF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGRhdGFbdWlkXS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoXCJoZWFkZXIgdWxcIikucHJlcGVuZCgnPGxpIGlkPVwibmF2X2FjY291bnRcIj7tmozqs4Q8L2xpPicpO1xyXG5cclxuICAgICAgICAgICAgJChcImhlYWRlciB1bFwiKS5vbihcImNsaWNrXCIsIFwiI25hdl9hY2NvdW50XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkKFwiaGVhZGVyIGxpXCIpLnJlbW92ZUNsYXNzKFwiLS1zZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5wYWdlcy5hY2NvdW50XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAkKCcjYWNjb3VudENhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNTY0LFxyXG4gICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGUoKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRheUNsaWNrOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hY2NvdW50LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==