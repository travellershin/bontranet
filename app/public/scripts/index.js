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

var _spot = __webpack_require__(3);

var _spot2 = _interopRequireDefault(_spot);

var _account = __webpack_require__(7);

var _account2 = _interopRequireDefault(_account);

var _subway = __webpack_require__(8);

var _subway2 = _interopRequireDefault(_subway);

var _hotel = __webpack_require__(9);

var _hotel2 = _interopRequireDefault(_hotel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialized = {};

var u_i = {};

var Nav_function = {
    attend: function attend() {
        _attend2.default.init(u_i);
        initialized.attend = true;
    },
    todo: function todo() {},
    city: function city() {
        _city2.default.init(u_i);
        initialized.city = true;
    },
    map: function map() {
        _subway2.default.init();
    },
    account: function account() {},
    spot: function spot() {
        _spot2.default.init(u_i);
        initialized.spot = true;
    },
    calc: function calc() {},
    hotel: function hotel() {
        _hotel2.default.init();
    },
    link: function link() {}
};

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

$(document).ready(function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var mail = user.email.split('@')[0];

            firebase.database().ref("users").once("value", function (snap) {
                var data = snap.val();

                //아래 내용을 바꾸면 if (!isUser) 부분에도 반드시 반영해줄것
                // for (var gid in data) {
                //     data[gid].
                // }

                // firebase.database().ref("users").update(data);

                if (data[mail]) {
                    u_i = data[mail];
                    var grade = u_i.grade * 1;

                    if (grade > 0) {
                        _attend2.default.init(data[mail]);
                        if (grade === 5) {
                            _account2.default.init(mail);
                            initialized.account = true;
                        }
                        initialized.attend = true;
                        login(u_i.name);
                    } else {
                        toast("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요");
                    }
                } else {
                    toast("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요");
                }
            });
            // User is signed in.
        } else {
            // No user is signed in.
            firebase.auth().signInWithPopup(provider).then(function (result) {
                user = result.user;
                var userMail = user.email.split('@')[0];

                firebase.database.ref("users").once("value", function (snap) {
                    var data = snap.val();

                    if (data[userMail]) {
                        u_i = data[userMail];
                        var grade = u_i.grade * 1;

                        if (grade > 0) {
                            _attend2.default.init(data[userMail]);
                            if (grade === 5) {
                                _account2.default.init(userMail);
                                initialized.account = true;
                            }
                            initialized.attend = true;
                            login(u_i.name);
                        } else {
                            toast("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요");
                        }
                    } else {
                        firebase.database().ref('users/' + userMail).set({
                            grade: 0,
                            name: user.displayName,
                            mail: userMail,
                            setting: {
                                order: "abc"
                            }

                        });
                        toast("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요");
                    }
                });
            }).catch(function (error) {
                toast('code:' + error.code + ' - 일시적인 문제가 발생했습니다. 관리자에게 문의해주세요.');
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

$(".nav__item").click(function () {
    if (!$(this).hasClass('nav__item--hasDrawer')) {
        var item = $(this).attr("id").split("_")[1];

        $(".nav>*").removeClass("nav__item--selected");
        $(this).addClass("nav__item--selected");

        $(".pages").addClass("displayNone");
        $(".pages." + item).removeClass("displayNone");

        if (!initialized[item]) {
            Nav_function[item]();
        }
    }
});

$(".nav__drawer__item").click(function () {
    var item = $(this).attr("id").split("_")[1];

    $(".nav>*").removeClass("nav__item--selected");
    $(this).parent().parent().addClass("nav__item--selected");

    $(".nav__drawer__item").removeClass("nav__drawer__item--selected");
    $(this).addClass("nav__drawer__item--selected");

    $(".pages").addClass("displayNone");
    $(".pages." + item).removeClass("displayNone");

    if (!initialized[item]) {
        Nav_function[item]();
    }
});

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

    init: function init(u_i) {
        var _this = this;

        var that = this;
        var grade = u_i.grade;
        var id = u_i.id;

        this.id = id;

        var txt = '';
        txt += '<select class="worker_selector"></select>';
        txt += '<div class="attend__top">';
        txt += '<div id="calendar" class="attend__calendar"></div>';
        txt += '<div class="attend__week"></div>';
        txt += '</div>';
        txt += '<div class="attend__month"></div>';

        $(".pages.attend").html(txt).removeClass("displayNone");

        firebase.database().ref("account/salary").once("value", function (snap) {
            that.salary = snap.val();
            if (grade === 5) {
                $(".worker_selector").removeClass("displayNone");
                firebase.database().ref("users").once("value", function (snap) {
                    $(".loadingView").addClass("displayNone");
                    var users = snap.val();
                    var txt = '';
                    for (var mailID in users) {
                        if (users[mailID].grade * 1 < 5) {
                            txt += '<option value="' + mailID + '">' + users[mailID].name + '</option>';
                        }
                    }
                    $(".worker_selector").html(txt).val(id).prop("selected", true);
                });
            } else {
                firebase.database().ref("attend/" + _this.id).on("value", function (snap) {
                    $(".loadingView").addClass("displayNone");
                    _this.attendObj = snap.val();
                    console.log(_this.attendObj);
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

        $(".modal").on("click", ".confirm", function () {
            if (!$(".attend").hasClass('displayNone')) {
                that.setWorkHour($(this).attr("did"));
                $(".inputWindow input").val("");
            }
        });
        $(".modal").on("click", ".close", function () {
            if (!$(".attend").hasClass('displayNone')) {
                $(".blackScreen").addClass("displayNone");
                $(".inputWindow input").val("");
            }
        });
        $("body").keyup(function (e) {
            if (!$(".attend").hasClass('displayNone')) {
                if ($(".modal .confirm").length) {
                    var code = e.which; // recommended to use e.which, it's normalized across browsers
                    if (code == 13) {
                        if ($("#first_from").val().length > 0) {
                            that.setWorkHour($(".modal .confirm").attr("did"));
                        }
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
                $('.attend .fc-day[data-date="' + dateID + '"]').html(_txt);
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

            if ($(".attend .fc-view-container").length) {
                for (var i = 0; i < 6; i++) {
                    //무조건 6주
                    var weekDom = $(".attend .fc-week").eq(i);
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

            if ($(".attend .fc-left").children("h2.durMonth").length) {
                $(".attend h2.durMonth").html(' (' + Math.floor(durMon / 60) + '시간 ' + durMon % 60 + '분)');
            } else {
                $(".attend .fc-left").append('<h2 class="durMonth"> (' + Math.floor(durMon / 60) + '시간 ' + durMon % 60 + '분)</h2>');
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
        }

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
var City = {
    data: {},

    listener: function listener() {
        var that = this;

        $(".city").on("click", ".refresh", function () {
            if (confirm("데이터를 많이 잡아먹습니다! 정말 최신화하시겠습니까?")) {
                that.refreshStatus();
            }
        });
    },

    inflate: function inflate(data) {
        var txt = '';

        txt += '<div class="header">';
        txt += '<h2>도시 데이터 확보현황</h2>';
        txt += '<p class="refresh">최신화</p>';
        txt += '</div>';

        txt += '<div class="wrapper">';

        txt += '<div class="line top">';
        txt += '<p class="name">도시명</p>';
        txt += '<p class="city__hotels">숙소</p>';
        txt += '<p class="city__spots">관광지 정리</p>';
        txt += '<p class="city__transport">교통</p>';
        txt += '<p class="city__area">지역</p>';
        txt += '<p class="city__price">물가</p>';
        txt += '</div>';

        for (var code in data) {
            var city = data[code];
            var status = city.status;

            txt += '<div class="line" id="' + city.code + '"><p class="name">' + city.name + '</p>';

            if (status.hotel === 2) {
                txt += '<p class="city__hotels weight--bold">평가 완료</p>';
            } else if (status.hotel === 1) {
                txt += '<p class="city__hotels">데이터 있음</p>';
            } else {
                txt += '<p class="city__hotels color--red">데이터 없음</p>';
            }

            if (status.spot === 4) {
                txt += '<p class="city__spots weight--bold">정보검증 완료</p>';
            } else if (status.spot === 3) {
                txt += '<p class="city__spots">2차검증</p>';
            } else if (status.spot === 2) {
                txt += '<p class="city__spots">합치기</p>';
            } else if (status.spot === 1) {
                txt += '<p class="city__spots">정보 검증중</p>';
            } else {
                txt += '<p class="city__spots color--red">정보 없음</p>';
            }

            if (status.transport === 2) {
                txt += '<p class="city__transport weight--bold">대중교통 완료</p>';
            } else if (status.transport === 1) {
                txt += '<p class="city__transport">데이터 있음</p>';
            } else {
                txt += '<p class="city__transport color--red">데이터 없음</p>';
            }

            if (status.area) {
                txt += '<p class="city__area">O</p>';
            } else {
                txt += '<p class="city__area color--red">X</p>';
            }

            if (status.price) {
                txt += '<p class="city__price">O</p>';
            } else {
                txt += '<p class="city__price color--red">X</p>';
            }
            txt += '</div>';
        }

        txt += '</div>'; //close wrapper

        $(".city").html(txt);
    },

    init: function init() {
        var _this = this;

        this.listener();

        firebase.database().ref('setting/cities').once("value", function (snap) {
            var data = snap.val();
            _this.data = data;
            _this.inflate(data);
        });
    },

    refreshStatus: function refreshStatus() {
        var _this2 = this;

        var that = this;

        firebase.database().ref('cities').once("value", function (snap) {
            var data = snap.val();
            for (var cid in that.data) {

                var status = {};

                var city = data[cid];

                if (city) {
                    status = {
                        hotel: 0, //0:데이터없음, 1:숙소데이터만 있음, 2:평가데이터(워딩) 있음
                        spot: that.data[cid].status.spot,
                        area: 0,
                        transport: 0, //데이터없음, 1:메트로데이터만 있음, 2:가공데이터(라인별..등) 있음
                        price: 0
                    };

                    if (city.area) {
                        status.area = 1;
                    }

                    if (city.hotels) {
                        var hotel = city.hotels[Object.keys(city.hotels)[0]];

                        if (hotel.assessment) {
                            status.hotel = 2;
                        } else {
                            status.hotel = 1;
                        }

                        if (hotel.area) {
                            status.area = 2;
                        } else if (hotel.area === 1) {
                            status.area = 2;

                            if (city.status) {
                                city.status.area = true;
                            } else {
                                city.status = {
                                    area: true
                                };
                            }
                        } else {
                            if (city.status) {
                                city.status.area = false;
                            } else {
                                city.status = {
                                    area: false
                                };
                            }
                        }
                        firebase.database().ref('cities/' + cid + '/status').update(city.status);
                    }

                    if (city.metro) {
                        if (city.metroLine) {
                            status.transport = 2;
                        } else {
                            status.transport = 1;
                        }
                    }

                    if (city.price) {
                        status.price = 1;
                    }
                } else {
                    status = {
                        hotel: 0, //0:데이터없음, 1:숙소데이터만 있음, 2:평가데이터(워딩) 있음
                        spot: 0,
                        area: 0,
                        transport: 0, //데이터없음, 1:메트로데이터만 있음, 2:가공데이터(라인별..등) 있음
                        price: 0
                    };
                }

                _this2.data[cid].status = status;
            }
            firebase.database().ref('setting/cities').set(that.data).then(function () {
                that.inflate(that.data);
                toast('최신화 완료');
            });
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

var _first_check = __webpack_require__(4);

var _first_check2 = _interopRequireDefault(_first_check);

var _seond_combine = __webpack_require__(6);

var _seond_combine2 = _interopRequireDefault(_seond_combine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spot = {
    cities: {},
    order: "",
    data: {},
    current: "", //현재 보고있는 도시 cid - firebase ref에 off 달기위해

    init: function init(u_i) {
        var that = this;
        _first_check2.default.init();

        this.order = u_i.setting.order;

        firebase.database().ref('setting/cities').on("value", function (snap) {
            var data = snap.val();
            that.cities = data;
            that.order = u_i.setting.order;
            that.data = data;
            that.inflate_status();
        });

        $(".spot").on("click", ".active", function () {
            var cid = $(this).parent().parent().attr('id');
            var status = that.cities[cid].status.spot;

            that.inflate_city(cid, status);
        });

        $(".spot").on("click", ".order", function () {
            that.order = $(this).attr("id");
            var uid = u_i.mail;
            firebase.database().ref('users/' + uid + "/setting/order").set(that.order);
            that.inflate_status();
        });

        $(".spot").on("click", ".return", function () {
            that.inflate_status();
        });
    },

    inflate_status: function inflate_status() {
        var data = this.data;

        var txt = '';
        txt += '<div class="header">';
        txt += '<h2>관광지 데이터 정리 현황</h2>';
        txt += '<p class="order" id="abc">가나다순</p>';
        txt += '<p class="order" id="changed">수정시간순</p>';
        txt += '</div>';
        txt += '<div class="wrapper">';
        txt += '<div class="liner liner--header">';
        txt += '<p class="liner__cityName">도시명</p>';
        txt += '<p class="liner__status">상태</p>';
        txt += '<p class="liner__charge">담당자</p>';
        txt += '</div>';

        var orderArray = [];
        console.log(data);

        for (var cid in data) {
            var city = data[cid];

            if (this.order === "abc") {
                orderArray.push({ cid: cid, idx: city.name });
            } else if (this.order === "changed") {
                orderArray.push({ cid: cid, idx: city.order.changed });
            }
        }

        orderArray.sort(function (a, b) {
            return a.idx > b.idx ? 1 : a.idx < b.idx ? -1 : 0;
        });

        var statusArray = ['<p class="liner__status"><span class="active">정보수집</span> > <span>정보검증</span> > <span>합치기</span> > <span>2차검증</span> > <span>완료</span></p>', '<p class="liner__status"><span>정보수집</span> > <span class="active">정보검증</span> > <span>합치기</span> > <span>2차검증</span> > <span>완료</span></p>', '<p class="liner__status"><span>정보수집</span> > <span>정보검증</span> > <span class="active">합치기</span> > <span>2차검증</span> > <span>완료</span></p>', '<p class="liner__status"><span>정보수집</span> > <span>정보검증</span> > <span>합치기</span> > <span class="active">2차검증</span> > <span>완료</span></p>', '<p class="liner__status"><span>정보수집</span> > <span>정보검증</span> > <span>합치기</span> > <span>2차검증</span> > <span class="active">완료</span></p>'];

        for (var i = 0; i < orderArray.length; i++) {
            var cid = orderArray[i].cid;
            var city = data[cid];

            txt += '<div class="liner" id="' + cid + '">';
            txt += '<p class="liner__cityName">' + city.name + '</p>';
            txt += statusArray[city.status.spot];
            txt += '<p class="liner__charge">담당자</p>';
            txt += '</div>';
        }
        txt += '</div>'; //wrapper 닫기

        $(".pages.spot").html(txt);
        $("#" + this.order).addClass("order--selected");
    },

    inflate_city: function inflate_city(cid, status) {
        var that = this;

        firebase.database().ref('cities/' + that.current).off("value");

        firebase.database().ref('cities/' + cid).on("value", function (snap) {
            that.current = cid;
            var data = snap.val();

            if (data) {
                var cityName = that.cities[cid].name;
                if (status === 1) {
                    //현재 정보수집상태 검증
                    $(".header").html('<h2>' + cityName + ' 정보검증</h2>').attr('cid', cid).attr('cityName', cityName).addClass("cityName");
                    _first_check2.default.inflate(data.spots);
                } else if (status === 2) {
                    //합치기작업
                    _seond_combine2.default.init();
                } else {//2차검증화면과 완료화면은 따로 차이가 없음

                }
            } else {
                toast('아무런 데이터가 없습니다. 데이터 수집을 먼저 진행해주세요.');
            }
        });

        $(".nav__item").click(function () {
            if ($(this).hasClass('nav__item--hasDrawer')) {
                return false;
            }
            firebase.database().ref('cities/' + that.current).off("value");
        });

        $(".nav__drawer__item ").click(function () {
            if ($(this).attr('id') === 'nav_spot') {
                return false;
            }
            firebase.database().ref('cities/' + that.current).off("value");
        });
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

var _autoCombine = __webpack_require__(5);

var _autoCombine2 = _interopRequireDefault(_autoCombine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var First_Check = {
    init: function init() {
        var that = this;

        $(".spot").on("click", ".check__remainLargeData", function () {
            that.setRemainNumber($(this).parent().attr("id"), $(this).parent().children(".check__remainNumber").val());
        });

        $(".spot").on("click", ".check__nodata", function () {
            var sid = $(this).attr('sid');
            that.siteNodata(sid);
            toast('데이터 공백 처리');
        });

        //좌표 없는 관광지의 좌표를 입력함
        $(".spot").on("click", ".check__spotDelete", function () {
            that.deleteSpot($(this).parent().attr("id"), $(this).parent().children(".check__spotName").html());
        });

        //좌표 없는 관광지의 좌표를 입력함
        $(".spot").on("click", ".check__confirm", function () {
            console.log('yolo');
            that.inputCoordinate($(this).parent().attr("id"), $(this).parent().children(".check__spotCoor").val());
        });
    },

    siteNodata: function siteNodata(sid) {
        var city = $(".cityName").attr("cid");

        if (confirm("데이터를 정말 없앱니까!?")) {
            firebase.database().ref("cities/" + city + "/spots/" + sid + "/nodata").set(true);
        }
    },

    setRemainNumber: function setRemainNumber(site, number) {
        var city = $(".cityName").attr("cid");
        var cutNo = number.trim() * 1;
        console.log(this.data);

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

    deleteSpot: function deleteSpot(sid, name) {
        var city = $(".cityName").attr("cid");
        var site = sid.split("_")[0];
        var no = sid.split("_")[1];

        if (name) {
            if (confirm(name + " 장소를 제거합니다. 계속할까요?")) {
                firebase.database().ref("cities/" + city + "/spots/" + site + "/" + no).set({ deleted: true });
                $("#" + sid).remove();
                toast("장소가 제거되었습니다.");
            }
        } else {
            if (confirm(no + "번 장소를 제거합니다. 계속할까요?")) {
                firebase.database().ref("cities/" + city + "/spots/" + site + "/" + no).set({ deleted: true });
                $("#" + sid).remove();
                toast("장소가 제거되었습니다.");
            }
        }
    },

    inputCoordinate: function inputCoordinate(sid, coorTxt) {
        var city = $(".cityName").attr("cid");
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

    inflate: function inflate(data) {
        $(".header").append('<p class="return">돌아가기</p>');

        var hasProblem = false;
        var txt = '';
        var searchUrl = 'https://www.google.co.kr/maps/place/' + $(".cityName").attr('cityName') + "+";

        var siteObj = {
            gg: "구글",
            nv: "네이버",
            ta: "트립어드바이저",
            lp: "론리플래닛"
        };
        console.log(data);

        for (var site in siteObj) {

            var siteHasProblem = false;
            var noCoor = false;
            var noCoorTxt = '<p class="check__subTitle">좌표가 입력되지 않은 관광지가 있습니다</p>';
            var noSpot = false;
            var noSpotTxt = '<p class="check__subTitle">비어있는 관광지가 있습니다</p>';

            if (data[site]) {
                txt += '<p class="check__title">' + siteObj[site] + ' 데이터 확인</p>';
                if (!data[site].nodata) {
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
                }
            } else {
                txt += '<p class="check__title">' + siteObj[site] + ' 데이터가 존재하지 않습니다.</p>';
                txt += '<p class="check__subTitle check__nodata" sid="' + site + '">데이터가 원래 없을 경우 클릭해주세욥</p>';
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
            $(".spot .wrapper").html(txt);
        } else {
            var cid = $(".cityName").attr('cid');
            toast("발견된 문제가 없어 데이터 병합을 실시합니다.");

            _autoCombine2.default.init(data);
        }

        $(".wrap").scrollTop(0);
    }
};

exports.default = First_Check;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//first_check에서만 imported 되고 사용됨

var AutoCombine = {
    init: function init(data) {

        var cid = $(".cityName").attr("cid");
        var siteArr = ["gg", "lp", "nv", "ta"];
        var combining = {};
        var counter = 0;

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

        var combineObj = {};
        var combined = {};

        for (var code in combining) {
            var _spot = combining[code];
            combineObj[code] = _spot;
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
                        var dif = calculateDif(_spot.coor, tSpot.coor);

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

        firebase.database().ref("cities/" + cid + "/spots").set({
            combining: combineObj,
            combined: combined
        });

        firebase.database().ref('setting/cities/' + cid + '/status/spot').set(1);
    }
};

exports.default = AutoCombine;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Second_combine = {};

exports.default = Second_combine;

/***/ }),
/* 7 */
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
        var txt = '';
        txt += '<div id="accountCalendar" class="account__calendar">';
        txt += '</div>';

        $(".account").html(txt);

        firebase.database().ref("users").once("value", function (snap) {
            var data = snap.val();

            for (var uid in data) {
                if (uid !== id) {
                    _this.user[uid] = {
                        name: data[uid].name
                    };
                }
            }

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

var _setHotelInfo = __webpack_require__(10);

var _setHotelInfo2 = _interopRequireDefault(_setHotelInfo);

var _setArea = __webpack_require__(12);

var _setArea2 = _interopRequireDefault(_setArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hotel = {

    //inflate하면 호텔을 만들어내기 위한 정보 수집 상태가 표시됨 -> 

    init: function init() {
        var _this = this;

        var that = this;

        firebase.database().ref('setting/cities').on("value", function (snap) {
            var data = snap.val();
            _this.inflate_status(data);
        });

        $(".hotel").on("click", ".status__make__hotel", function () {
            var cid = $(this).attr('cid');
            var cityName = $(this).parent().children('.status__city').html();
            that.inflate_city(cid, cityName);
        });
        $(".hotel").on("click", ".hotel__alert__confirm", function () {
            $(".hotel__alert__wrap").remove();
        });

        $(".hotel").on("click", ".cityArea__finish", function () {
            //setArea를 끝낼때
            var cid = $(this).attr('cid');
            firebase.database().ref('cities/' + cid + '/hotels').once('value', function (snap) {
                var data = snap.val();
                for (var hid in data) {
                    if (!data[hid].area) {
                        if (data[hid].area === 0) {} else {
                            delete data[hid];
                        }
                    }
                }

                firebase.database().ref('cities/' + cid + '/hotels').set(data);
                firebase.database().ref('setting/cities/' + cid + '/status/area').set(2);
                firebase.database().ref('cities/' + cid + '/status/area').set(true);
            });
        });
    },

    inflate_city: function inflate_city(cid, cityName) {

        firebase.database().ref('cities/' + cid).once('value', function (snap) {
            var data = snap.val();
            var check = true;
            var alertModal = '';
            alertModal += '<div class="hotel__alert__wrap">';
            alertModal += '<div class="hotel__alert">';

            if (!data) {
                alertModal += '<p>관광지 정보가 아직 정리되지 않았습니다.</p>';
                alertModal += '<p>대중교통 정보가 없습니다.</p>';
                alertModal += '<p>편의시설 정보가 없습니다.</p>';
                alertModal += '<p>지역구분 정보가 없습니다.</p>';
                check = false;
            } else {
                if (data.spots) {
                    if (!data.spots.ranked) {
                        alertModal += '<p>관광지 정보가 아직 정리되지 않았습니다.</p>';
                        check = false;
                    }
                } else {
                    alertModal += '<p>관광지 정보가 아직 정리되지 않았습니다.</p>';
                    check = false;
                }

                if (!data.metro) {
                    alertModal += '<p>대중교통 정보가 없습니다.</p>';
                    check = false;
                } else if (!data.metroLine) {
                    alertModal += '<p>대중교통 정보가 정리되지 않았습니다(metroLine 없음).</p>';
                    check = false;
                }

                if (!data.local) {
                    alertModal += '<p>편의시설 정보가 없습니다.</p>';
                    check = false;
                }
                if (!data.area) {
                    alertModal += '<p>지역구분 정보가 없습니다.</p>';
                    check = false;
                } else if (!data.status.area) {
                    _setArea2.default.inflate(cityName, cid);
                    check = false;
                    toast('지역 설정을 먼저 진행합니다');
                }
            }

            alertModal += '<div class="hotel__alert__confirm">확인</div>';

            alertModal += '</div></div>';

            if (check) {
                _setHotelInfo2.default.init(data, cid, cityName);
            } else {
                $(".hotel").append(alertModal);
            }
        });
    },

    inflate_status: function inflate_status(data) {
        console.log(data);
        var txt = '';
        txt += '<div class="header">';
        txt += '<h2>숙소 리스트</h2>';
        txt += '</div>';
        txt += '<div class="wrapper">';

        txt += '<div class="status__liner">';
        txt += '<p class="status__name">도시명</p>';
        txt += '<p class="status__make">숙소 데이터</p>';
        txt += '<p class="status__hotel">기본 호텔데이터</p>';
        txt += '<p class="status__area">지역정보</p>';
        txt += '<p class="status__spot">관광지정보</p>';
        txt += '<p class="status__transport">대중교통정보</p>';
        txt += '</div>';

        for (var cid in data) {
            var city = data[cid];
            var status = city.status;
            txt += '<div class="status__liner">';
            txt += '<p class="status__city">' + city.name + '</p>';

            if (status.hotel === 2) {
                txt += '<p class="status__make">있음</p>';
            } else {
                txt += '<p class="status__make status__make__hotel"  cid="' + city.code + '">없음 (클릭해 만들기)</p>';
            }

            if (status.hotel > 0) {
                txt += '<p class="status__hotel">O</p>';
            } else {
                txt += '<p class="status__hotel">X</p>';
            }

            if (status.area) {
                txt += '<p class="status__area">O</p>';
            } else {
                txt += '<p class="status__area">X</p>';
            }

            if (status.spot > 2) {
                txt += '<p class="status__spot">O</p>';
            } else {
                txt += '<p class="status__spot">X</p>';
            }

            if (status.transport === 2) {
                txt += '<p class="status__transport">O</p>';
            } else {
                txt += '<p class="status__transport">X</p>';
            }
            txt += '</div>';
        }
        txt += '</div>';

        $(".pages.hotel").html(txt);
    }

};

exports.default = Hotel;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setATM = __webpack_require__(11);

var _setATM2 = _interopRequireDefault(_setATM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SetHotelInfo = {
    init: function init(data, cid, cityName) {
        //statusCheck 진행
        var checkTxt = '';

        var hotel = data.hotels[Object.keys(data.hotels)[0]];

        var status = {
            local: {
                atm: { //0: 데이터 없음, 1: 만들 수 있음, 2: 존재함
                    visa: 0,
                    citi: 0
                },
                food: 0,
                metro: 0,
                spot: 0
            },

            assessment: {
                transport: 0,
                safety: 0,
                theme: 0,
                convenience: 0
            }
        };

        if (hotel.local) {
            if (hotel.local.atm) {
                if (Array.isArray(hotel.local.atm)) {
                    //VISA ATM이 정리되지 않은 형태로 들어가있는 상태
                    status.local.atm.visa = 1;
                } else {
                    //atm객체를 가지고 있는 상태 - 반드시 visa atm이 들어가 있어야 함
                    status.local.atm.visa = 2;

                    if (hotel.local.atm.citi) {
                        status.local.atm.citi = 2;
                    } else if (data.local.atm) {
                        status.local.atm.citi = 1;
                        //중요: CITI작업은 VISA작업 후에 이루어져야 함
                    }
                }
            } else {
                //local에 atm이 없음 -> 비자 추출된 적이 없음
                status.local.atm.visa = 0;

                if (data.local.atm) {
                    //그 경우에도 CITI는 RAW데이터로 존재할 수 있음
                    status.local.atm.citi = 1;
                    //중요: CITI작업은 VISA작업 후에 이루어져야 함
                }
            }

            if (hotel.local.food) {
                status.local.food = 2;
            } else {
                if (data.local.food) {
                    status.local.food = 1;
                } else {
                    status.local.food = 0;
                }
            }

            if (hotel.local.metro) {
                status.local.metro = 2;
            } else {
                if (data.metroLine) {
                    status.local.metro = 1;
                } else {
                    status.local.metro = 0;
                }
            }

            if (hotel.local.spot) {
                status.local.spot = 2;
            } else {
                if (data.spots.ranked) {
                    status.local.spot = 1;
                } else {
                    status.local.spot = 0;
                }
            }
        } else {
            status.local.atm.visa = 0; //VISA는 무조건 호텔 로컬에 직접 들어가므로 호텔 로컬 경로가 없다는 것은 VISA가 없다는 것.

            if (data.local.atm) {
                //citi나 visa는 호텔 로컬이 아닌 도시 로컬에 저장될 수 있음.
                status.local.atm.citi = 1;
            }

            if (data.local.food) {
                status.local.food = 1;
            } else {
                status.local.food = 0;
            }

            if (data.metroLine) {
                status.local.metro = 1;
            } else {
                status.local.metro = 0;
            }

            if (data.spots.ranked) {
                status.local.spot = 1;
            } else {
                status.local.spot = 0;
            }
        }

        checkTxt += '<h2 class="hotel__status__title">호텔 주변정보</h2>';

        if (status.local.atm.visa === 2) {
            checkTxt += '<p class="hotel__status__txt">OK - 정리된 VISA ATM정보 확인.</p>';
        } else if (status.local.atm.visa === 1) {
            _setATM2.default.init(data.hotels);
            checkTxt += '<p class="hotel__status__txt">Making - RAW VISA ATM정보 확인. 호텔별로 가장 가까운 ATM과 24시간 ATM을 추출합니다.</p>';
        } else if (status.local.atm.visa === 0) {
            checkTxt += '<p class="hotel__status__txt color--red">No Data - VISA ATM정보가 없습니다. VISA ATM locator에서 정보를 먼저 크롤링해주세요.</p>';
        }

        if (status.local.atm.citi === 2) {
            checkTxt += '<p class="hotel__status__txt">OK - 정리된 CITI ATM정보 확인.</p>';
        } else if (status.local.atm.citi === 1) {
            checkTxt += '<p class="hotel__status__txt">Making - RAW CITI ATM정보 확인. 가장 가까운 CITI ATM을 추출합니다.</p>';
        } // citi status 0은 없음.

        if (status.local.food === 2) {
            checkTxt += '<p class="hotel__status__txt">OK - 정리된 식료품점/편의점 정보 확인.</p>';
        } else if (status.local.food === 1) {
            checkTxt += '<p class="hotel__status__txt">Making - RAW 식료품점/편의점 정보 확인. 호텔별로 가까운 식료품점 추출.</p>';
        } else if (status.local.food === 0) {
            checkTxt += '<p class="hotel__status__txt color--red">No Data - 도시 식료품점/편의점 정보가 없습니다. 먼저 정보를 입력해주세요.</p>';
        }

        if (status.local.metro === 2) {
            checkTxt += '<p class="hotel__status__txt">OK - 정리된 지하철/대중교통 정보 확인.</p>';
        } else if (status.local.metro === 1) {
            checkTxt += '<p class="hotel__status__txt">Making - RAW 지하철/대중교통 정보 확인. 호텔별로 가까운 지하철 추출.</p>';
        } else if (status.local.metro === 0) {
            checkTxt += '<p class="hotel__status__txt color--red">No Data - 도시 지하철/대중교통 정보가 없습니다. 먼저 정보를 입력해주세요.</p>';
        }

        if (status.local.spot === 2) {
            checkTxt += '<p class="hotel__status__txt">OK - 정리된 관광지 정보 확인.</p>';
        } else if (status.local.spot === 1) {
            checkTxt += '<p class="hotel__status__txt">Making - RAW 관광지 정보 확인. 호텔별로 가까운 관광지 추출.</p>';
        } else if (status.local.spot === 0) {
            checkTxt += '<p class="hotel__status__txt color--red">No Data - 도시 관광지 순위가 아직 확정되지 않았습니다. 먼저 확인해주세요.</p>';
        }

        console.log(checkTxt);
    }
};

exports.default = SetHotelInfo;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var SetATM = {
    statistic: {
        overall: [], //반경 140m 내에 ATM이 몇 개 있는지 도시 전체 평균을 내기 위한 데이터
        byArea: [], //반경 140m 내에 ATM이 몇 개 있는지 지역별로 평균을 내기 위한 데이터
        nearest: [], //가장 가까운 ATM은 몇 m 거리에 있는지 도시 전체 평균을 내기 위한 데이터
        bank24: [] //24시간 운영하는 은행 소유 거리에 있는지 도시 전체 평균을 내기 위한 데이터
    },

    init: function init(hotels) {
        var errNo = 0;
        var totalNo = 0;

        for (var hid in hotels) {
            var hotel = hotels[hid];
            if (hotel.local) {
                var atmArr = hotel.local.atm;
                var atmObj = {
                    nearest: atmArr[0],
                    bank24: false,
                    in140: 0
                };

                atmObj.nearest.dif = calculateDif(atmArr[0].coor, hotel.coor).toFixed(4);

                if (atmArr) {
                    for (var i = 0; i < atmArr.length; i++) {
                        var atm = atmArr[i];
                        var dif = calculateDif(atm.coor, hotel.coor);

                        if (dif < 140.1) {
                            atmObj.in140++;
                        }

                        if (dif < 200) {
                            if (atm.owner.includes("BANK") && atm.is24) {
                                if (!atmObj.bank24) {
                                    atmObj.bank24 = atm;
                                    atmObj.bank24.dif = dif.toFixed(4);
                                }
                            }
                        }
                    }

                    //가장 가까운 ATM과 24시간 운영하는 ATM이 평균적으로 얼마나 떨어져있는지 알아보기 위함
                    this.statistic.nearest.push(atmObj.nearest.dif);
                    if (atmObj.bank24) {
                        this.statistic.bank24.push(atmObj.bank24.dif);
                    } else {
                        this.statistic.bank24.push(210);
                    }
                } else {
                    errNo++;
                }
                hotel.local.atm = atmObj;

                //160m 반경에 평균적으로 몇 개 ATM이 있는지 알아보기 위함
                if (this.statistic.byArea[hotel.area]) {
                    this.statistic.byArea[hotel.area].push(atmObj.in140);
                } else {
                    this.statistic.byArea[hotel.area] = [atmObj.in140];
                }
                this.statistic.overall.push(atmObj.in140);
            } else {
                errNo++;
            }
            totalNo++;
        }

        this.statistic.nearest.sort(function (a, b) {
            return a - b;
        });
        this.statistic.bank24.sort(function (a, b) {
            return a - b;
        });

        console.log(this.statistic.byArea);
        console.log(this.statistic.bank24);
        console.log(this.statistic.nearest);

        if (errNo > 2) {
            //VISA ATM finder가 중간에 끊겼을 가능성 높음
            toast(totalNo + " \uAC1C\uC758 \uD638\uD154 \uC911 " + errNo + " \uAC1C\uC758 \uD638\uD154\uC5D0 VISA ATM \uC815\uBCF4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uD655\uC778 \uD6C4 \uC7AC\uC2DC\uB3C4\uD574\uC8FC\uC138\uC694");
        }
    }
};

exports.default = SetATM;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var SetArea = {
    map: {},
    marker: {},

    inflate: function inflate(cityName, cid) {
        var _this = this;

        firebase.database().ref('cities/' + cid).once('value', function (snap) {
            var data = snap.val();

            for (var hid in _this.marker) {
                _this.marker[hid].setMap(null);
            }
            _this.marker = {};

            var txt = "";

            txt += '<div class="header">';
            txt += '<h2>' + cityName + ' 숙소 지역 구분</h2>';
            txt += '</div>';
            txt += '<div class="cityArea__wrap">';
            txt += '<div id="cityArea__map"></div>';
            txt += '<div class=""cityArea>';
            txt += '<p class="cityArea__word"></p>';
            txt += '<p cid="' + cid + '" class="cityArea__finish">완료처리</p>';
            txt += '</div>';
            txt += '</div>'; //close wrapper

            $(".pages.hotel").html(txt);

            _this.map = new google.maps.Map(document.getElementById('cityArea__map'), {
                center: {
                    lat: 40.743195793,
                    lng: -73.98917954
                },
                zoom: 13
            });

            console.log(data);

            var area = {};

            for (var hid in data.hotels) {
                var hotel = data.hotels[hid];
                var noArea = true;

                for (var i = 0; i < data.area.length; i++) {
                    if (!data.area[i].notArea) {
                        var areaCoor = data.area[i].coor;

                        if (isInArea(hotel.coor, areaCoor)) {
                            hotel.area = i;
                            noArea = false;
                            if (area[i]) {
                                area[i]++;
                            } else {
                                area[i] = 1;
                            }
                        }
                    }
                }

                if (noArea) {
                    _this.marker[hid] = new google.maps.Marker({
                        position: hotel.coor,
                        map: _this.map,
                        label: '' + hid
                    });
                }
            }
            console.log(area);

            firebase.database().ref('cities/' + cid + '/hotels').update(data.hotels);
        });
    }
};

exports.default = SetArea;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2ZkOWY2NGIyYjQyMmViZDIwMDYiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvYXR0ZW5kLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2NpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2ZpcnN0X2NoZWNrLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvYXV0b0NvbWJpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9zZW9uZF9jb21iaW5lLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2FjY291bnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3Vid2F5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0QVRNLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhLmpzIl0sIm5hbWVzIjpbImluaXRpYWxpemVkIiwidV9pIiwiTmF2X2Z1bmN0aW9uIiwiYXR0ZW5kIiwiaW5pdCIsInRvZG8iLCJjaXR5IiwibWFwIiwiYWNjb3VudCIsInNwb3QiLCJjYWxjIiwiaG90ZWwiLCJsaW5rIiwibG9naW4iLCJuYW1lIiwiJCIsImh0bWwiLCJhdHRyIiwiY2xpY2siLCJjb25maXJtIiwiZmlyZWJhc2UiLCJhdXRoIiwic2lnbk91dCIsInRoZW4iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImNhdGNoIiwiZXJyb3IiLCJkb2N1bWVudCIsInJlYWR5IiwicHJvdmlkZXIiLCJHb29nbGVBdXRoUHJvdmlkZXIiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJ1c2VyIiwibWFpbCIsImVtYWlsIiwic3BsaXQiLCJkYXRhYmFzZSIsInJlZiIsIm9uY2UiLCJkYXRhIiwic25hcCIsInZhbCIsImdyYWRlIiwidG9hc3QiLCJzaWduSW5XaXRoUG9wdXAiLCJyZXN1bHQiLCJ1c2VyTWFpbCIsInNldCIsImRpc3BsYXlOYW1lIiwic2V0dGluZyIsIm9yZGVyIiwiY29kZSIsImVycm9yQ29kZSIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjcmVkZW50aWFsIiwiaGFzQ2xhc3MiLCJpdGVtIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInBhcmVudCIsIkF0dGVuZCIsIm1vYmlsZSIsImlkIiwidmlld0lEIiwiYXR0ZW5kT2JqIiwic2FsYXJ5Iiwid2Vla2RheXMiLCJ0aGF0IiwidHh0IiwidXNlcnMiLCJtYWlsSUQiLCJwcm9wIiwib24iLCJjb25zb2xlIiwibG9nIiwiaW5mbGF0ZV9jYWxlbmRhciIsImxlbmd0aCIsImZ1bGxDYWxlbmRhciIsImhlaWdodCIsImZpcnN0RGF5Iiwidmlld1JlbmRlciIsInZpZXciLCJlbGVtZW50IiwiZGF5Q2xpY2siLCJkYXRlIiwiaW5wdXRXb3JrSG91ciIsImxpc3RlbmVyIiwic2V0V29ya0hvdXIiLCJrZXl1cCIsImUiLCJ3aGljaCIsImNoYW5nZSIsInZpZXdfd29ya2VyIiwib2ZmIiwieW8iLCJkYXRlSUQiLCJzbGljZSIsImRpZiIsImZyb20iLCJ0byIsImkiLCJNYXRoIiwiZmxvb3IiLCJkdXJNb24iLCJ0aGlzTW9udGgiLCJkYXRlRG9tIiwiZXEiLCJqIiwid2Vla0RvbSIsIndlZWtEdXIiLCJkYXlEb20iLCJmaW5kIiwiayIsImNoaWxkcmVuIiwiYXBwZW5kIiwiZnVsbE1vbnRoQm9udXMiLCJpbnN1cmFuY2VGZWUiLCJiYXNpYyIsInJvdW5kIiwiZnVsbFdlZWtCdW51cyIsImNvbW1hIiwiZGF0ZU9iaiIsImRhdGVTaG9ydCIsIm1vbWVudCIsImZvcm1hdCIsIkFueVBpY2tlciIsImRhdGVUaW1lRm9ybWF0IiwiZm9jdXMiLCJ3b3JrIiwiYWxsRW1wdHkiLCJyZW1vdmUiLCJhbGVydCIsImZyb21BIiwidG9BIiwicHVzaCIsIkNpdHkiLCJyZWZyZXNoU3RhdHVzIiwiaW5mbGF0ZSIsInN0YXR1cyIsInRyYW5zcG9ydCIsImFyZWEiLCJwcmljZSIsImNpZCIsImhvdGVscyIsIk9iamVjdCIsImtleXMiLCJhc3Nlc3NtZW50IiwidXBkYXRlIiwibWV0cm8iLCJtZXRyb0xpbmUiLCJTcG90IiwiY2l0aWVzIiwiY3VycmVudCIsImluZmxhdGVfc3RhdHVzIiwiaW5mbGF0ZV9jaXR5IiwidWlkIiwib3JkZXJBcnJheSIsImlkeCIsImNoYW5nZWQiLCJzb3J0IiwiYSIsImIiLCJzdGF0dXNBcnJheSIsImNpdHlOYW1lIiwic3BvdHMiLCJGaXJzdF9DaGVjayIsInNldFJlbWFpbk51bWJlciIsInNpZCIsInNpdGVOb2RhdGEiLCJkZWxldGVTcG90IiwiaW5wdXRDb29yZGluYXRlIiwic2l0ZSIsIm51bWJlciIsImN1dE5vIiwidHJpbSIsImN1dE9iaiIsIm5vIiwiZGVsZXRlZCIsImNvb3JUeHQiLCJjb29yIiwibGF0IiwibG5nIiwiaXNOYU4iLCJoYXNQcm9ibGVtIiwic2VhcmNoVXJsIiwic2l0ZU9iaiIsImdnIiwibnYiLCJ0YSIsImxwIiwic2l0ZUhhc1Byb2JsZW0iLCJub0Nvb3IiLCJub0Nvb3JUeHQiLCJub1Nwb3QiLCJub1Nwb3RUeHQiLCJub2RhdGEiLCJoYXNDb29yIiwibGFyZ2VPSyIsImxhcmdlRGF0YSIsInNjcm9sbFRvcCIsIkF1dG9Db21iaW5lIiwic2l0ZUFyciIsImNvbWJpbmluZyIsImNvdW50ZXIiLCJub0RhdGEiLCJvbGRTcG90Iiwia28iLCJlbiIsInJhbmsiLCJ0ZXN0IiwidXJsIiwidGFnIiwiY29tYmluZU9iaiIsImNvbWJpbmVkIiwiY29tYmluZSIsImhhc0NvbWJpbmVkIiwidENvZGUiLCJ0U3BvdCIsImtleSIsImNhbGN1bGF0ZURpZiIsIlNlY29uZF9jb21iaW5lIiwiQWNjb3VudCIsIlN1YndheSIsIm1hcmtlciIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJnZXRFbGVtZW50QnlJZCIsImNlbnRlciIsInpvb20iLCJtYXBUeXBlQ29udHJvbCIsInNjYWxlQ29udHJvbCIsImZ1bGxzY3JlZW5Db250cm9sIiwiYWRkTGlzdGVuZXIiLCJmaW5kU3Vid2F5IiwibGF0TG5nIiwic2V0TWFwIiwiTWFya2VyIiwicG9zaXRpb24iLCJtZXRyb0luZm8iLCJtZXRyb0J5U3RuIiwibWV0cm9OYW1lIiwibGluZSIsImNvbmNhdCIsIm1ldEFycmF5IiwibWV0U3RuQXJyYXkiLCJjZWlsIiwiSG90ZWwiLCJoaWQiLCJjaGVjayIsImFsZXJ0TW9kYWwiLCJyYW5rZWQiLCJsb2NhbCIsIlNldEhvdGVsSW5mbyIsImNoZWNrVHh0IiwiYXRtIiwidmlzYSIsImNpdGkiLCJmb29kIiwic2FmZXR5IiwidGhlbWUiLCJjb252ZW5pZW5jZSIsIkFycmF5IiwiaXNBcnJheSIsIlNldEFUTSIsInN0YXRpc3RpYyIsIm92ZXJhbGwiLCJieUFyZWEiLCJuZWFyZXN0IiwiYmFuazI0IiwiZXJyTm8iLCJ0b3RhbE5vIiwiYXRtQXJyIiwiYXRtT2JqIiwiaW4xNDAiLCJ0b0ZpeGVkIiwib3duZXIiLCJpbmNsdWRlcyIsImlzMjQiLCJTZXRBcmVhIiwibm9BcmVhIiwibm90QXJlYSIsImFyZWFDb29yIiwiaXNJbkFyZWEiLCJsYWJlbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FB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QixHQUF0QyxFQUEyQztBQUN2Qyx3QkFBRyxDQUFDOUQsS0FBS3NHLElBQUwsQ0FBVXhDLENBQVYsRUFBYXFMLE9BQWpCLEVBQXlCO0FBQ3JCLDRCQUFJQyxXQUFXcFAsS0FBS3NHLElBQUwsQ0FBVXhDLENBQVYsRUFBYStFLElBQTVCOztBQUVBLDRCQUFJd0csU0FBU25SLE1BQU0ySyxJQUFmLEVBQXFCdUcsUUFBckIsQ0FBSixFQUFvQztBQUNoQ2xSLGtDQUFNb0ksSUFBTixHQUFheEMsQ0FBYjtBQUNBb0wscUNBQVMsS0FBVDtBQUNBLGdDQUFHNUksS0FBS3hDLENBQUwsQ0FBSCxFQUFXO0FBQ1B3QyxxQ0FBS3hDLENBQUw7QUFDSCw2QkFGRCxNQUVLO0FBQ0R3QyxxQ0FBS3hDLENBQUwsSUFBVSxDQUFWO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBRUQsb0JBQUlvTCxNQUFKLEVBQVk7QUFDUiwwQkFBS3pELE1BQUwsQ0FBWXlCLEdBQVosSUFBbUIsSUFBSXhCLE9BQU9DLElBQVAsQ0FBWVksTUFBaEIsQ0FBdUI7QUFDdENDLGtDQUFVdE8sTUFBTTJLLElBRHNCO0FBRXRDL0ssNkJBQUssTUFBS0EsR0FGNEI7QUFHdEN3UiwrQkFBTyxLQUFLcEM7QUFIMEIscUJBQXZCLENBQW5CO0FBS0g7QUFDSjtBQUNEL0ssb0JBQVFDLEdBQVIsQ0FBWWtFLElBQVo7O0FBRUEzSCxxQkFBU2tCLFFBQVQsR0FBb0JDLEdBQXBCLENBQXdCLFlBQVkwRyxHQUFaLEdBQWtCLFNBQTFDLEVBQXFESyxNQUFyRCxDQUE0RDdHLEtBQUt5RyxNQUFqRTtBQUNILFNBcEVEO0FBcUVIO0FBM0VTLENBQWQ7O2tCQThFZXdJLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3ZmQ5ZjY0YjJiNDIyZWJkMjAwNiIsImltcG9ydCBBdHRlbmQgZnJvbSBcIi4vcGFnZXMvYXR0ZW5kLmpzXCI7XHJcbmltcG9ydCBDaXR5IGZyb20gXCIuL3BhZ2VzL2NpdHkuanNcIjtcclxuaW1wb3J0IFNwb3QgZnJvbSBcIi4vcGFnZXMvc3BvdC5qc1wiO1xyXG5pbXBvcnQgQWNjb3VudCBmcm9tIFwiLi9wYWdlcy9hY2NvdW50LmpzXCI7XHJcbmltcG9ydCBTdWJ3YXkgZnJvbSBcIi4vcGFnZXMvc3Vid2F5LmpzXCI7XHJcbmltcG9ydCBIb3RlbCBmcm9tIFwiLi9wYWdlcy9ob3RlbC5qc1wiO1xyXG5cclxudmFyIGluaXRpYWxpemVkID0ge307XHJcblxyXG52YXIgdV9pID0ge307XHJcblxyXG52YXIgTmF2X2Z1bmN0aW9uID0ge1xyXG4gICAgYXR0ZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgQXR0ZW5kLmluaXQodV9pKTtcclxuICAgICAgICBpbml0aWFsaXplZC5hdHRlbmQgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIHRvZG86IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgY2l0eTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIENpdHkuaW5pdCh1X2kpO1xyXG4gICAgICAgIGluaXRpYWxpemVkLmNpdHkgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIG1hcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFN1YndheS5pbml0KCk7XHJcbiAgICB9LFxyXG4gICAgYWNjb3VudDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBzcG90OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgU3BvdC5pbml0KHVfaSk7XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQuc3BvdCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgY2FsYzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBob3RlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEhvdGVsLmluaXQoKTtcclxuICAgIH0sXHJcbiAgICBsaW5rOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gbG9naW4obmFtZSl7XHJcbiAgICAkKFwiLmhlbGxvV29ybGRcIikuaHRtbChuYW1lWzFdK1wi7ZWYIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5hdHRyKFwidGl0bGVcIixuYW1lK1wi64uYIOyViOuFle2VmOyEuOyalCFcIik7XHJcbiAgICAkKFwiLmhlbGxvV29ybGRcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihjb25maXJtKG5hbWUrXCLri5gg66Gc6re47JWE7JuDIO2VmOyLnOqyoOyKteuLiOq5jD9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgIC8vIEFuIGVycm9yIGhhcHBlbmVkLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHByb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgbGV0IG1haWwgPSB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF07XHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL+yVhOuemCDrgrTsmqnsnYQg67CU6r6466m0IGlmICghaXNVc2VyKSDrtoDrtoTsl5Drj4Qg67CY65Oc7IucIOuwmOyYge2VtOykhOqyg1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yICh2YXIgZ2lkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBkYXRhW2dpZF0uXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS51cGRhdGUoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbbWFpbF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB1X2kgPSBkYXRhW21haWxdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBncmFkZSA9IHVfaS5ncmFkZSAqIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmFkZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXR0ZW5kLmluaXQoZGF0YVttYWlsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmFkZSA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjb3VudC5pbml0KG1haWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZWQuYWNjb3VudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZWQuYXR0ZW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9naW4odV9pLm5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gVXNlciBpcyBzaWduZWQgaW4uXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE5vIHVzZXIgaXMgc2lnbmVkIGluLlxyXG4gICAgICAgICAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aFBvcHVwKHByb3ZpZGVyKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHVzZXIgPSByZXN1bHQudXNlcjtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VyTWFpbCA9IHVzZXIuZW1haWwuc3BsaXQoJ0AnKVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVt1c2VyTWFpbF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdV9pID0gZGF0YVt1c2VyTWFpbF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmFkZSA9IHVfaS5ncmFkZSAqIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBdHRlbmQuaW5pdChkYXRhW3VzZXJNYWlsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGUgPT09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2NvdW50LmluaXQodXNlck1haWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmFjY291bnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZWQuYXR0ZW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luKHVfaS5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigndXNlcnMvJyArIHVzZXJNYWlsKS5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLmRpc3BsYXlOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbDogdXNlck1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IFwiYWJjXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoJ2NvZGU6JyArIGVycm9yLmNvZGUgKyAnIC0g7J287Iuc7KCB7J24IOusuOygnOqwgCDrsJzsg53tlojsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpQuJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgRXJyb3JzIGhlcmUuXHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JDb2RlID0gZXJyb3IuY29kZTtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGVtYWlsIG9mIHRoZSB1c2VyJ3MgYWNjb3VudCB1c2VkLlxyXG4gICAgICAgICAgICAgICAgdmFyIGVtYWlsID0gZXJyb3IuZW1haWw7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZmlyZWJhc2UuYXV0aC5BdXRoQ3JlZGVudGlhbCB0eXBlIHRoYXQgd2FzIHVzZWQuXHJcbiAgICAgICAgICAgICAgICB2YXIgY3JlZGVudGlhbCA9IGVycm9yLmNyZWRlbnRpYWw7XHJcbiAgICAgICAgICAgICAgICAvLyAuLi5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbiQoXCIubmF2X19pdGVtXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKCEkKHRoaXMpLmhhc0NsYXNzKCduYXZfX2l0ZW0tLWhhc0RyYXdlcicpKXtcclxuICAgICAgICB2YXIgaXRlbSA9ICQodGhpcykuYXR0cihcImlkXCIpLnNwbGl0KFwiX1wiKVsxXTtcclxuXHJcbiAgICAgICAgJChcIi5uYXY+KlwiKS5yZW1vdmVDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcblxyXG4gICAgICAgICQoXCIucGFnZXNcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLnBhZ2VzLlwiICsgaXRlbSkucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICAgICAgaWYoIWluaXRpYWxpemVkW2l0ZW1dKXtcclxuICAgICAgICAgICAgTmF2X2Z1bmN0aW9uW2l0ZW1dKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbiQoXCIubmF2X19kcmF3ZXJfX2l0ZW1cIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIHZhciBpdGVtID0gJCh0aGlzKS5hdHRyKFwiaWRcIikuc3BsaXQoXCJfXCIpWzFdO1xyXG5cclxuICAgICQoXCIubmF2PipcIikucmVtb3ZlQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcblxyXG4gICAgJChcIi5uYXZfX2RyYXdlcl9faXRlbVwiKS5yZW1vdmVDbGFzcyhcIm5hdl9fZHJhd2VyX19pdGVtLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJuYXZfX2RyYXdlcl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcblxyXG4gICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5wYWdlcy5cIiArIGl0ZW0pLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgaWYgKCFpbml0aWFsaXplZFtpdGVtXSkge1xyXG4gICAgICAgIE5hdl9mdW5jdGlvbltpdGVtXSgpO1xyXG4gICAgfVxyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9pbmRleC5qcyIsInZhciBBdHRlbmQgPSB7XHJcbiAgICBtb2JpbGU6IGZhbHNlLFxyXG5cclxuICAgIGlkOiBcIlwiLFxyXG5cclxuICAgIHZpZXdJRDogXCJcIixcclxuICAgIC8v6rSA66as7J6Q6rCAIOuLpOuluCDsgqzrnozsnZggSUQg7ZmV7J247KSRXHJcblxyXG4gICAgYXR0ZW5kT2JqOiB7fSxcclxuXHJcbiAgICBzYWxhcnk6IHt9LFxyXG5cclxuXHJcbiAgICB3ZWVrZGF5czogW1wi7J28XCIsIFwi7JuUXCIsIFwi7ZmUXCIsIFwi7IiYXCIsIFwi66qpXCIsIFwi6riIXCIsIFwi7YagXCIsIFwi7J28XCJdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKHVfaSl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHZhciBncmFkZSA9IHVfaS5ncmFkZTtcclxuICAgICAgICB2YXIgaWQgPSB1X2kuaWQ7XHJcblxyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuXHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCs9JzxzZWxlY3QgY2xhc3M9XCJ3b3JrZXJfc2VsZWN0b3JcIj48L3NlbGVjdD4nO1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX3RvcFwiPic7XHJcbiAgICAgICAgdHh0ICs9ICAgJzxkaXYgaWQ9XCJjYWxlbmRhclwiIGNsYXNzPVwiYXR0ZW5kX19jYWxlbmRhclwiPjwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9ICAgJzxkaXYgY2xhc3M9XCJhdHRlbmRfX3dlZWtcIj48L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aFwiPjwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIucGFnZXMuYXR0ZW5kXCIpLmh0bWwodHh0KS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImFjY291bnQvc2FsYXJ5XCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB0aGF0LnNhbGFyeSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIGlmKGdyYWRlID09PSA1KXtcclxuICAgICAgICAgICAgICAgICQoXCIud29ya2VyX3NlbGVjdG9yXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIubG9hZGluZ1ZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlcnMgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eHQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBtYWlsSUQgaW4gdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodXNlcnNbbWFpbElEXS5ncmFkZSoxPDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIG1haWxJRCArICdcIj4nICsgdXNlcnNbbWFpbElEXS5uYW1lICsgJzwvb3B0aW9uPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikuaHRtbCh0eHQpLnZhbChpZCkucHJvcChcInNlbGVjdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCkub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmdWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRPYmogPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXR0ZW5kT2JqKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZighJChcIi5mYy1oZWFkZXItdG9vbGJhclwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5Q2xpY2s6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRXb3JrSG91cihkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIubW9kYWxcIikub24oXCJjbGlja1wiLCBcIi5jb25maXJtXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKCEkKFwiLmF0dGVuZFwiKS5oYXNDbGFzcygnZGlzcGxheU5vbmUnKSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFdvcmtIb3VyKCQodGhpcykuYXR0cihcImRpZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIubW9kYWxcIikub24oXCJjbGlja1wiLCBcIi5jbG9zZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAoISQoXCIuYXR0ZW5kXCIpLmhhc0NsYXNzKCdkaXNwbGF5Tm9uZScpKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmJsYWNrU2NyZWVuXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmtleXVwKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBpZiAoISQoXCIuYXR0ZW5kXCIpLmhhc0NsYXNzKCdkaXNwbGF5Tm9uZScpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIi5tb2RhbCAuY29uZmlybVwiKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29kZSA9IGUud2hpY2g7IC8vIHJlY29tbWVuZGVkIHRvIHVzZSBlLndoaWNoLCBpdCdzIG5vcm1hbGl6ZWQgYWNyb3NzIGJyb3dzZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFdvcmtIb3VyKCQoXCIubW9kYWwgLmNvbmZpcm1cIikuYXR0cihcImRpZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikuY2hhbmdlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCBpZCA9ICQodGhpcykudmFsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXdfd29ya2VyKGlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgdmlld193b3JrZXI6IGZ1bmN0aW9uKGlkKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmKGlkID09PSB0aGF0LmlkKXtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX2NhbGVuZGFyXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX193ZWVrXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19tb250aFwiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fY2FsZW5kYXJcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgaWYodGhhdC52aWV3SUQubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhhdC52aWV3SUQpLm9mZigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIitpZCkub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYXR0ZW5kT2JqID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgIGxldCB5byA9IHRoYXQudmlld0lEO1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3SUQgPSBpZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih5by5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTY0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld1JlbmRlciA6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGF0LmlkICE9PSB0aGF0LnZpZXdJRCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5Q2xpY2s6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFdvcmtIb3VyKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfY2FsZW5kYXI6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICQoXCIuYXR0ZW5kXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5mYy1kYXlcIikuaHRtbChcIlwiKTtcclxuXHJcbiAgICAgICAgaWYoZGF0YS5hdHRlbmQpe1xyXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5hdHRlbmQ7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGRhdGUgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGVJRCA9IGRhdGUuc2xpY2UoMCw0KStcIi1cIitkYXRlLnNsaWNlKDQsNikrXCItXCIrZGF0ZS5zbGljZSg2LDgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHh0ID0gJzxwPicrZGF0YVtkYXRlXVswXS5mcm9tK1wiflwiK2RhdGFbZGF0ZV1bMF0udG8rJzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgLy/rkZDtg4DsnoQg64KY64ig7IScIOq3vOustO2WiOyWtOuPhCDri6zroKXsl5Ag7ZGc7Iuc65CY64qUIOqyg+ydgCDssqvtg4DsnoQg6re866y07Iuc6rCE66eMXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW2RhdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlmICs9IGRhdGFbZGF0ZV1baV0uZGlmO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHR4dCs9JzxwPicgKyBNYXRoLmZsb29yKGRpZi82MCkgKyBcIuyLnOqwhCBcIisgZGlmJTYwICtcIuu2hFwiKyc8L3A+JztcclxuICAgICAgICAgICAgICAgICQoJy5hdHRlbmQgLmZjLWRheVtkYXRhLWRhdGU9XCInK2RhdGVJRCsnXCJdJykuaHRtbCh0eHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBkdXJNb24gPSAwO1xyXG4gICAgICAgICAgICBsZXQgdGhpc01vbnRoID0gJyc7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5hdHRlbmQgLmZjLWRheVwiKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGVEb20gPSAkKFwiLmF0dGVuZCAuZmMtZGF5XCIpLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgaWYoIWRhdGVEb20uaGFzQ2xhc3MoXCJmYy1vdGhlci1tb250aFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBkYXRlRG9tLmF0dHIoXCJkYXRhLWRhdGVcIikuc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNNb250aCA9IGRhdGVbMF0rZGF0ZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZVswXStkYXRlWzFdK2RhdGVbMl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbZGF0ZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1ck1vbiArPSBkYXRhW2RhdGVdW2pdLmRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgaWYoJChcIi5hdHRlbmQgLmZjLXZpZXctY29udGFpbmVyXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykgeyAgIC8v66y07KGw6rG0IDbso7xcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla0RvbSA9ICQoXCIuYXR0ZW5kIC5mYy13ZWVrXCIpLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3ZWVrRHVyID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA3OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRheURvbSA9IHdlZWtEb20uZmluZChcIi5mYy1kYXlcIikuZXEoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gZGF5RG9tLmF0dHIoXCJkYXRhLWRhdGVcIikuc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZVswXStkYXRlWzFdK2RhdGVbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbZGF0ZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBkYXRhW2RhdGVdLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Vla0R1ciArPSBkYXRhW2RhdGVdW2tdLmRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZih3ZWVrRHVyPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImF0dGVuZF9fd2Vla19faG91clwiPicrIE1hdGguZmxvb3Iod2Vla0R1ci82MCkrJ+yLnOqwhCAnK3dlZWtEdXIlNjArJ+u2hCcgKyc8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIi5hdHRlbmRfX3dlZWtcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJChcIi5hdHRlbmQgLmZjLWxlZnRcIikuY2hpbGRyZW4oXCJoMi5kdXJNb250aFwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgJChcIi5hdHRlbmQgaDIuZHVyTW9udGhcIikuaHRtbCgnICgnK01hdGguZmxvb3IoZHVyTW9uLzYwKSsn7Iuc6rCEICcrZHVyTW9uJTYwKyfrtoQpJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJChcIi5hdHRlbmQgLmZjLWxlZnRcIikuYXBwZW5kKCc8aDIgY2xhc3M9XCJkdXJNb250aFwiPiAoJytNYXRoLmZsb29yKGR1ck1vbi82MCkrJ+yLnOqwhCAnK2R1ck1vbiU2MCsn67aEKTwvaDI+Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHR4dCA9ICcnOyAgIC8vdmFyIOu5vOuoueydgOqxsCDslYTri5guIOychOyXkOyEnCDshKDslrgg7ZaI7J2MIVxyXG5cclxuICAgICAgICAgICAgbGV0IGZ1bGxNb250aEJvbnVzID0gMzA0MDA7XHJcbiAgICAgICAgICAgIGxldCBpbnN1cmFuY2VGZWUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgYmFzaWMgPSBNYXRoLnJvdW5kKGR1ck1vbi82MCo3NjAwKTtcclxuICAgICAgICAgICAgbGV0IGZ1bGxXZWVrQnVudXMgPSBNYXRoLnJvdW5kKChkdXJNb24vNjAqNzYwMCkqMC4yKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmKHRoaXMuaWQgPT09IHRoaXMudmlld0lEKXtcclxuICAgICAgICAgICAgLy8gICAgIC8v67O47J24IOuqqOuTnFxyXG4gICAgICAgICAgICAvLyAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhY2NvdW50L3NhbGFyeS9cIit0aGlzTW9udGgrXCIvXCIrdGhpcy5pZCkudXBkYXRlKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBiYXNpYzogYmFzaWMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbFdlZWtCdW51czogZnVsbFdlZWtCdW51cyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsTW9udGhCb251czogZnVsbE1vbnRoQm9udXNcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnkvXCIrdGhpc01vbnRoK1wiL1wiK3RoaXMudmlld0lEKS51cGRhdGUoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJhc2ljOiBiYXNpYyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsV2Vla0J1bnVzOiBmdWxsV2Vla0J1bnVzLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxNb250aEJvbnVzOiBmdWxsTW9udGhCb251c1xyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuq4sOuzuOq4iTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoYmFzaWMpKyBcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6re866y07Iuc6rCEIFggNyw2MDDsm5A8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuyjvO2ctOyImOuLuTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoZnVsbFdlZWtCdW51cykgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7quLDrs7jquInsnZggMjAlPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7sl7DssKjsiJjri7k8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGZ1bGxNb250aEJvbnVzKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPjXsi5zqsIQg7IOB64u5IOq4sOuzuOq4iTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmUgYXR0ZW5kX19tb250aF9fbGluZS0tcmVkXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuyCrO2ajOuztO2XmOujjDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoaW5zdXJhbmNlRmVlKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq1reuvvOyXsOq4iC/qs6Dsmqnrs7Ttl5gv6rG06rCV67O07ZeYIOyyreq1rOyVoTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmUgYXR0ZW5kX19tb250aF9fbGluZS0tc3VtXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPu2VqeqzhDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoYmFzaWMgKyBmdWxsV2Vla0J1bnVzICsgZnVsbE1vbnRoQm9udXMgLSBpbnN1cmFuY2VGZWUpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6riw67O46riJICsg7KO87Zy07IiY64u5ICsg7Jew7LCo7IiY64u5IC0g7IKs7ZqM67O07ZeY66OMPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fbW9udGhcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5wdXRXb3JrSG91cjogZnVuY3Rpb24oZGF0ZU9iail7XHJcbiAgICAgICAgLy8gY3NzOiBtb2R1bGVzL2F0dGVuZC5jc3NcclxuICAgICAgICBsZXQgZGF0ZVNob3J0ID0gbW9tZW50KGRhdGVPYmopLmZvcm1hdChcIk1NL0REXCIpO1xyXG4gICAgICAgIGxldCBkYXRlSUQgPSBtb21lbnQoZGF0ZU9iaikuZm9ybWF0KFwiWVlZWU1NRERcIik7XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0ge307XHJcbiAgICAgICAgaWYodGhpcy5hdHRlbmRPYmouYXR0ZW5kW2RhdGVJRF0pe1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5hdHRlbmRPYmouYXR0ZW5kW2RhdGVJRF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcblxyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJibGFja1NjcmVlblwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cImlucHV0V2luZG93XCI+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPHAgY2xhc3M9XCJ0aXRsZVwiPicrZGF0ZVNob3J0Kycg6re866y07Iuc6rCEPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxkaXYgY2xhc3M9XCJsaW5lIGNsZWFyZml4XCI+JztcclxuICAgICAgICBpZihkYXRhWzBdKXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cImZpcnN0X2Zyb21cIiB2YWx1ZT1cIicrZGF0YVswXS5mcm9tKydcIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwiZmlyc3RfdG9cIiB2YWx1ZT1cIicrZGF0YVswXS50bysnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPic7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJmaXJzdF9mcm9tXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cImZpcnN0X3RvXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9ICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPic7XHJcbiAgICAgICAgaWYoZGF0YVsxXSl7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJzZWNvbmRfZnJvbVwiIHZhbHVlPVwiJytkYXRhWzFdLmZyb20rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJzZWNvbmRfdG9cIiB2YWx1ZT1cIicrZGF0YVsxXS50bysnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPic7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJzZWNvbmRfZnJvbVwiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJzZWNvbmRfdG9cIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxkaXYgY2xhc3M9XCJib3R0b21cIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgICAnPHAgY2xhc3M9XCJjb25maXJtXCIgZGlkPVwiJytkYXRlSUQrJ1wiPu2ZleyduDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgICAnPHAgY2xhc3M9XCJjbG9zZVwiPuy3qOyGjDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCs9ICAgJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubW9iaWxlKXtcclxuICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5BbnlQaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgZGF0ZVRpbWVGb3JtYXQ6XCJISDptbVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIiNmaXJzdF9mcm9tXCIpLmZvY3VzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFdvcmtIb3VyOiBmdW5jdGlvbihkYXRlKXtcclxuXHJcbiAgICAgICAgbGV0IHdvcmsgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IGFsbEVtcHR5ID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5lcShpKS52YWwoKS5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgICAgICBhbGxFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihhbGxFbXB0eSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMudmlld0lEK1wiL2F0dGVuZC9cIitkYXRlKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkK1wiL2F0dGVuZC9cIitkYXRlKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJChcIi5tb2RhbFwiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0ZUlEID0gZGF0ZS5zbGljZSgwLDQpICsgXCItXCIrZGF0ZS5zbGljZSg0LDYpICsgXCItXCIrZGF0ZS5zbGljZSg2LDgpO1xyXG4gICAgICAgICAgICAkKCcuZmMtZGF5W2RhdGEtZGF0ZT1cIicrZGF0ZUlEKydcIl0nKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYoJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcbiAgICAgICAgICAgIC8v7Iuc7J6R7Iuc6rCE7J20IOyemCDsnoXroKXrkJjsl4jrgpgg7ZmV7J24XHJcblxyXG4gICAgICAgICAgICBpZihkYXRlPG1vbWVudCgpLmZvcm1hdChcIllZWVlNTUREXCIpKXtcclxuICAgICAgICAgICAgICAgIC8v7Jik64qYIOydtOyghCDsnbzsnZgg64Kg7Kec66W8IOuLpOujqOqzoCDsnojsnYQg6rK97JqwIC0g6re866y0IOyiheujjOyLnOqwhOydtCDsnoXroKXrkJjsp4Ag7JWK7Jy866m0IOyViCDrkKhcclxuICAgICAgICAgICAgICAgIGlmKCQoXCIjZmlyc3RfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy/snbTsoITsnbzsnbQg7JWE64uI642U652864+EIOyYiOyDgSDqt7zrrLTsi5zqsITsnbTrnbzrj4Qg7J6F66Cl7ZW07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgaWYoJChcIiNmaXJzdF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuyYiOyDgSDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZnJvbSA9ICQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKTtcclxuICAgICAgICAgICAgbGV0IHRvID0gJChcIiNmaXJzdF90b1wiKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmcm9tQSA9IGZyb20uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICBsZXQgdG9BID0gdG8uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICBsZXQgZGlmID0gKHRvQVswXSoxIC0gZnJvbUFbMF0qMSkqNjAgKyAodG9BWzFdKjEgLSBmcm9tQVsxXSoxKTtcclxuXHJcblxyXG4gICAgICAgICAgICB3b3JrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgIGRpZjogZGlmXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYWxlcnQoXCLqt7zrrLTsi5zqsITsnbQg7J6Y66q7IOyeheugpeuQmOyXiOyKteuLiOuLpC4gSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0ZTxtb21lbnQoKS5mb3JtYXQoXCJZWVlZTU1ERFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/smKTripgg7J207KCEIOydvOydmCDrgqDsp5zrpbwg64uk66Oo6rOgIOyeiOydhCDqsr3smrAgLSDqt7zrrLQg7KKF66OM7Iuc6rCE7J20IOyeheugpeuQmOyngCDslYrsnLzrqbQg7JWIIOuQqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL+ydtOyghOydvOydtCDslYTri4jrjZTrnbzrj4Qg7JiI7IOBIOq3vOustOyLnOqwhOydtOudvOuPhCDsnoXroKXtlbTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDsmIjsg4Eg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZnJvbSA9ICQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG8gPSAkKFwiI3NlY29uZF90b1wiKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZnJvbUEgPSBmcm9tLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCB0b0EgPSB0by5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gKHRvQVswXSoxIC0gZnJvbUFbMF0qMSkqNjAgKyAodG9BWzFdKjEgLSBmcm9tQVsxXSoxKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGZyb206IGZyb20sXHJcbiAgICAgICAgICAgICAgICAgICAgdG86IHRvLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpZjogZGlmXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOq3vOustOyLnOqwhOydtCDsnpjrqrsg7J6F66Cl65CY7JeI7Iq164uI64ukLiBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy52aWV3SUQrXCIvYXR0ZW5kL1wiK2RhdGUpLnNldCh3b3JrKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCtcIi9hdHRlbmQvXCIrZGF0ZSkuc2V0KHdvcmspO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5odG1sKFwiXCIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXR0ZW5kO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9hdHRlbmQuanMiLCJsZXQgQ2l0eSA9IHtcclxuICAgIGRhdGE6IHt9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5jaXR5XCIpLm9uKFwiY2xpY2tcIiwgXCIucmVmcmVzaFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShcIuuNsOydtO2EsOulvCDrp47snbQg7J6h7JWE66i57Iq164uI64ukISDsoJXrp5Ag7LWc7Iug7ZmU7ZWY7Iuc6rKg7Iq164uI6rmMP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoU3RhdHVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGgyPuuPhOyLnCDrjbDsnbTthLAg7ZmV67O07ZiE7ZmpPC9oMj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwicmVmcmVzaFwiPuy1nOyLoO2ZlDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cIndyYXBwZXJcIj4nO1xyXG5cclxuICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cImxpbmUgdG9wXCI+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cIm5hbWVcIj7rj4Tsi5zrqoU8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX2hvdGVsc1wiPuyImeyGjDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHNcIj7qtIDqtJHsp4Ag7KCV66asPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X190cmFuc3BvcnRcIj7qtZDthrU8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX2FyZWFcIj7sp4Dsl608L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX3ByaWNlXCI+66y86rCAPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gJzwvZGl2Pic7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yICh2YXIgY29kZSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjb2RlXTtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGNpdHkuc3RhdHVzO1xyXG5cclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwibGluZVwiIGlkPVwiJyArIGNpdHkuY29kZSArICdcIj48cCBjbGFzcz1cIm5hbWVcIj4nICsgY2l0eS5uYW1lICsgJzwvcD4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5ob3RlbCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2hvdGVscyB3ZWlnaHQtLWJvbGRcIj7tj4nqsIAg7JmE66OMPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmhvdGVsID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzXCI+642w7J207YSwIOyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2hvdGVscyBjb2xvci0tcmVkXCI+642w7J207YSwIOyXhuydjDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLnNwb3QgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90cyB3ZWlnaHQtLWJvbGRcIj7soJXrs7TqsoDspp0g7JmE66OMPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnNwb3QgPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90c1wiPjLssKjqsoDspp08L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+7ZWp7LmY6riwPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnNwb3QgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90c1wiPuygleuztCDqsoDspp3spJE8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90cyBjb2xvci0tcmVkXCI+7KCV67O0IOyXhuydjDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLnRyYW5zcG9ydCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydCB3ZWlnaHQtLWJvbGRcIj7rjIDspJHqtZDthrUg7JmE66OMPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnRyYW5zcG9ydCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydFwiPuuNsOydtO2EsCDsnojsnYw8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X190cmFuc3BvcnQgY29sb3ItLXJlZFwiPuuNsOydtO2EsCDsl4bsnYw8L3A+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fYXJlYVwiPk88L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19hcmVhIGNvbG9yLS1yZWRcIj5YPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMucHJpY2UpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19wcmljZVwiPk88L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19wcmljZSBjb2xvci0tcmVkXCI+WDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JzsgLy9jbG9zZSB3cmFwcGVyXHJcblxyXG4gICAgICAgICQoXCIuY2l0eVwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzJykub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5pbmZsYXRlKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWZyZXNoU3RhdHVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcycpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwPT57XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgY2lkIGluIHRoYXQuZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2l0eSA9IGRhdGFbY2lkXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihjaXR5KXtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsOiAwLCAvLzA6642w7J207YSw7JeG7J2MLCAxOuyImeyGjOuNsOydtO2EsOunjCDsnojsnYwsIDI67Y+J6rCA642w7J207YSwKOybjOuUqSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6IHRoYXQuZGF0YVtjaWRdLnN0YXR1cy5zcG90LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IDAsIC8v642w7J207YSw7JeG7J2MLCAxOuuplO2KuOuhnOuNsOydtO2EsOunjCDsnojsnYwsIDI66rCA6rO1642w7J207YSwKOudvOyduOuzhC4u65OxKSDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDBcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2l0eS5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5hcmVhID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNpdHkuaG90ZWxzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhvdGVsID0gY2l0eS5ob3RlbHNbT2JqZWN0LmtleXMoY2l0eS5ob3RlbHMpWzBdXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmhvdGVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuaG90ZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5hcmVhID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoaG90ZWwuYXJlYSA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuYXJlYSA9IDI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5zdGF0dXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuc3RhdHVzLmFyZWEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5zdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2l0eS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5LnN0YXR1cy5hcmVhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuc3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgY2lkICsgJy9zdGF0dXMnKS51cGRhdGUoY2l0eS5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5tZXRybyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdHkubWV0cm9MaW5lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy50cmFuc3BvcnQgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy50cmFuc3BvcnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihjaXR5LnByaWNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnByaWNlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsOiAwLCAvLzA6642w7J207YSw7JeG7J2MLCAxOuyImeyGjOuNsOydtO2EsOunjCDsnojsnYwsIDI67Y+J6rCA642w7J207YSwKOybjOuUqSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogMCwgLy/rjbDsnbTthLDsl4bsnYwsIDE666mU7Yq466Gc642w7J207YSw66eMIOyeiOydjCwgMjrqsIDqs7XrjbDsnbTthLAo65287J2467OELi7rk7EpIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogMFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhW2NpZF0uc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLnNldCh0aGF0LmRhdGEpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlKHRoYXQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgn7LWc7Iug7ZmUIOyZhOujjCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENpdHk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2NpdHkuanMiLCJpbXBvcnQgRmlyc3RfY2hlY2sgZnJvbSBcIi4vc3BvdC9maXJzdF9jaGVjay5qc1wiO1xyXG5pbXBvcnQgU2Vjb25kX2NvbWJpbmUgZnJvbSBcIi4vc3BvdC9zZW9uZF9jb21iaW5lLmpzXCJcclxuXHJcbnZhciBTcG90ID0ge1xyXG4gICAgY2l0aWVzOiB7fSxcclxuICAgIG9yZGVyOlwiXCIsXHJcbiAgICBkYXRhOiB7fSxcclxuICAgIGN1cnJlbnQ6XCJcIiwgLy/tmITsnqwg67O06rOg7J6I64qUIOuPhOyLnCBjaWQgLSBmaXJlYmFzZSByZWbsl5Agb2ZmIOuLrOq4sOychO2VtFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh1X2kpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBGaXJzdF9jaGVjay5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMub3JkZXIgPSB1X2kuc2V0dGluZy5vcmRlcjtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzJykub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpXHJcbiAgICAgICAgICAgIHRoYXQuY2l0aWVzID0gZGF0YTtcclxuICAgICAgICAgICAgdGhhdC5vcmRlciA9IHVfaS5zZXR0aW5nLm9yZGVyO1xyXG4gICAgICAgICAgICB0aGF0LmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfc3RhdHVzKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuYWN0aXZlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHRoYXQuY2l0aWVzW2NpZF0uc3RhdHVzLnNwb3Q7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIHN0YXR1cylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5vcmRlclwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQub3JkZXIgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICAgICAgdmFyIHVpZCA9IHVfaS5tYWlsO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigndXNlcnMvJyArIHVpZCArIFwiL3NldHRpbmcvb3JkZXJcIikuc2V0KHRoYXQub3JkZXIpO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfc3RhdHVzKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIucmV0dXJuXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX3N0YXR1cygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfc3RhdHVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5kYXRhO1xyXG5cclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzxoMj7qtIDqtJHsp4Ag642w7J207YSwIOygleumrCDtmITtmak8L2gyPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cIm9yZGVyXCIgaWQ9XCJhYmNcIj7qsIDrgpjri6TsiJw8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwib3JkZXJcIiBpZD1cImNoYW5nZWRcIj7siJjsoJXsi5zqsITsiJw8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwid3JhcHBlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwibGluZXIgbGluZXItLWhlYWRlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaXR5TmFtZVwiPuuPhOyLnOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+7IOB7YOcPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaGFyZ2VcIj7ri7Tri7nsnpA8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIHZhciBvcmRlckFycmF5ID0gW107XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXIgPT09IFwiYWJjXCIpIHtcclxuICAgICAgICAgICAgICAgIG9yZGVyQXJyYXkucHVzaCh7IGNpZDogY2lkLCBpZHg6IGNpdHkubmFtZSB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IFwiY2hhbmdlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBvcmRlckFycmF5LnB1c2goeyBjaWQ6IGNpZCwgaWR4OiBjaXR5Lm9yZGVyLmNoYW5nZWQgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3JkZXJBcnJheS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmlkeCA+IGIuaWR4ID8gMSA6IGEuaWR4IDwgYi5pZHggPyAtMSA6IDBcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB2YXIgc3RhdHVzQXJyYXkgPSBbXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3Bhbj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuPuyZhOujjDwvc3Bhbj48L3A+JyxcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuyZhOujjDwvc3Bhbj48L3A+J1xyXG4gICAgICAgIF1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmRlckFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSBvcmRlckFycmF5W2ldLmNpZDtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcblxyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJsaW5lclwiIGlkPVwiJyArIGNpZCArICdcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NpdHlOYW1lXCI+JyArIGNpdHkubmFtZSArICc8L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9IHN0YXR1c0FycmF5W2NpdHkuc3RhdHVzLnNwb3RdO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NoYXJnZVwiPuuLtOuLueyekDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JzsvL3dyYXBwZXIg64ur6riwXHJcblxyXG4gICAgICAgICQoXCIucGFnZXMuc3BvdFwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgJChcIiNcIiArIHRoaXMub3JkZXIpLmFkZENsYXNzKFwib3JkZXItLXNlbGVjdGVkXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX2NpdHk6IGZ1bmN0aW9uIChjaWQsIHN0YXR1cyl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyB0aGF0LmN1cnJlbnQpLm9mZihcInZhbHVlXCIpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyBjaWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQuY3VycmVudCA9IGNpZDtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaXR5TmFtZSA9IHRoYXQuY2l0aWVzW2NpZF0ubmFtZTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDEpIHsgICAvL+2YhOyerCDsoJXrs7TsiJjsp5Hsg4Htg5wg6rKA7KadXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuaHRtbCgnPGgyPicgKyBjaXR5TmFtZSArICcg7KCV67O06rKA7KadPC9oMj4nKS5hdHRyKCdjaWQnLCBjaWQpLmF0dHIoJ2NpdHlOYW1lJyxjaXR5TmFtZSkuYWRkQ2xhc3MoXCJjaXR5TmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBGaXJzdF9jaGVjay5pbmZsYXRlKGRhdGEuc3BvdHMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IDIpIHsgLy/tlansuZjquLDsnpHsl4VcclxuICAgICAgICAgICAgICAgICAgICBTZWNvbmRfY29tYmluZS5pbml0KClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAvLzLssKjqsoDspp3tmZTrqbTqs7wg7JmE66OM7ZmU66m07J2AIOuUsOuhnCDssKjsnbTqsIAg7JeG7J2MXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfslYTrrLTrn7Ag642w7J207YSw6rCAIOyXhuyKteuLiOuLpC4g642w7J207YSwIOyImOynkeydhCDrqLzsoIAg7KeE7ZaJ7ZW07KO87IS47JqULicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLm5hdl9faXRlbVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ25hdl9faXRlbS0taGFzRHJhd2VyJykpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIHRoYXQuY3VycmVudCkub2ZmKFwidmFsdWVcIik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5uYXZfX2RyYXdlcl9faXRlbSBcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdpZCcpID09PSAnbmF2X3Nwb3QnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgdGhhdC5jdXJyZW50KS5vZmYoXCJ2YWx1ZVwiKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcG90O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QuanMiLCJpbXBvcnQgQXV0b0NvbWJpbmUgZnJvbSAnLi9hdXRvQ29tYmluZS5qcyc7XHJcblxyXG52YXIgRmlyc3RfQ2hlY2sgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0UmVtYWluTnVtYmVyKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19yZW1haW5OdW1iZXJcIikudmFsKCkpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19ub2RhdGFcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2lkID0gJCh0aGlzKS5hdHRyKCdzaWQnKTtcclxuICAgICAgICAgICAgdGhhdC5zaXRlTm9kYXRhKHNpZCk7XHJcbiAgICAgICAgICAgIHRvYXN0KCfrjbDsnbTthLAg6rO167CxIOyymOumrCcpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy/sooztkZwg7JeG64qUIOq0gOq0keyngOydmCDsooztkZzrpbwg7J6F66Cl7ZWoXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3Nwb3REZWxldGVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmRlbGV0ZVNwb3QoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIiksICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIuY2hlY2tfX3Nwb3ROYW1lXCIpLmh0bWwoKSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy/sooztkZwg7JeG64qUIOq0gOq0keyngOydmCDsooztkZzrpbwg7J6F66Cl7ZWoXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX2NvbmZpcm1cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygneW9sbycpXHJcbiAgICAgICAgICAgIHRoYXQuaW5wdXRDb29yZGluYXRlKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19zcG90Q29vclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgc2l0ZU5vZGF0YTogZnVuY3Rpb24gKHNpZCkge1xyXG4gICAgICAgIHZhciBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlybShcIuuNsOydtO2EsOulvCDsoJXrp5Ag7JeG7JWx64uI6rmMIT9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpZCArIFwiL25vZGF0YVwiKS5zZXQodHJ1ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFJlbWFpbk51bWJlcjogZnVuY3Rpb24gKHNpdGUsIG51bWJlcikge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBjdXRObyA9IG51bWJlci50cmltKCkgKiAxO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSlcclxuXHJcbiAgICAgICAgaWYgKGN1dE5vIDwgMTAwKSB7XHJcbiAgICAgICAgICAgIHRvYXN0KFwiMTAw6rCcIOydtOyDgeydmCDsnqXshozrpbwg7Jyg7KeA7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKFwi7Iic7JyEIFwiICsgY3V0Tm8gKyBcIuychCDrr7jrp4wg7J6l7IaM66W8IOuqqOuRkCDsoJzqsbDtlanri4jri6QuIOunnuyKteuLiOq5jD9cIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXRPYmogPSB0aGlzLmRhdGEuc3BvdHNbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICBjdXRPYmoubGVuZ3RoID0gY3V0Tm87XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlKS5zZXQoY3V0T2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlU3BvdDogZnVuY3Rpb24gKHNpZCwgbmFtZSkge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlID0gc2lkLnNwbGl0KFwiX1wiKVswXTtcclxuICAgICAgICBsZXQgbm8gPSBzaWQuc3BsaXQoXCJfXCIpWzFdO1xyXG5cclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShuYW1lICsgXCIg7J6l7IaM66W8IOygnOqxsO2VqeuLiOuLpC4g6rOE7IaN7ZWg6rmM7JqUP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubykuc2V0KHsgZGVsZXRlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsnqXshozqsIAg7KCc6rGw65CY7JeI7Iq164uI64ukLlwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKG5vICsgXCLrsogg7J6l7IaM66W8IOygnOqxsO2VqeuLiOuLpC4g6rOE7IaN7ZWg6rmM7JqUP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubykuc2V0KHsgZGVsZXRlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsnqXshozqsIAg7KCc6rGw65CY7JeI7Iq164uI64ukLlwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dENvb3JkaW5hdGU6IGZ1bmN0aW9uIChzaWQsIGNvb3JUeHQpIHtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgc2l0ZSA9IHNpZC5zcGxpdChcIl9cIilbMF07XHJcbiAgICAgICAgbGV0IG5vID0gc2lkLnNwbGl0KFwiX1wiKVsxXTtcclxuICAgICAgICBsZXQgY29vciA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoY29vclR4dC5zcGxpdChcIixcIikubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXQgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVswXS50cmltKCkgKiAxO1xyXG4gICAgICAgICAgICBsZXQgbG5nID0gY29vclR4dC5zcGxpdChcIixcIilbMV0udHJpbSgpICogMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc05hTihsYXQpIHx8IGlzTmFOKGxuZykpIHtcclxuICAgICAgICAgICAgICAgIC8v7KKM7ZGcIOykkSDtlZjrgpjqsIBcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOu2gOygle2Zle2VmOqyjCDsnoXroKXrkJjsl4jsirXri4jri6RcIilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvb3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OiBsYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOiBsbmdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubyArIFwiL2Nvb3JcIikuc2V0KGNvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg67aA7KCV7ZmV7ZWY6rKMIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5oZWFkZXJcIikuYXBwZW5kKCc8cCBjbGFzcz1cInJldHVyblwiPuuPjOyVhOqwgOq4sDwvcD4nKVxyXG5cclxuICAgICAgICBsZXQgaGFzUHJvYmxlbSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgIGxldCBzZWFyY2hVcmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmtyL21hcHMvcGxhY2UvJyArICQoXCIuY2l0eU5hbWVcIikuYXR0cignY2l0eU5hbWUnKSArIFwiK1wiO1xyXG5cclxuICAgICAgICBsZXQgc2l0ZU9iaiA9IHtcclxuICAgICAgICAgICAgZ2c6IFwi6rWs6riAXCIsXHJcbiAgICAgICAgICAgIG52OiBcIuuEpOydtOuyhFwiLFxyXG4gICAgICAgICAgICB0YTogXCLtirjrpr3slrTrk5zrsJTsnbTsoIBcIixcclxuICAgICAgICAgICAgbHA6IFwi66Gg66as7ZSM656Y64ubXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiBzaXRlT2JqKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2l0ZUhhc1Byb2JsZW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yVHh0ID0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+7KKM7ZGc6rCAIOyeheugpeuQmOyngCDslYrsnYAg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICBsZXQgbm9TcG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3RUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7ruYTslrTsnojripQg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSwIO2ZleyduDwvcD4nXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGFbc2l0ZV0ubm9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcG90ID0gZGF0YVtzaXRlXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYXNDb29yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ydvOu2gOufrCDsgq3soJztlZwg6rSA6rSR7KeAIC0+IOuEmOyWtOqwhOuLpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5jb29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmNvb3IubG5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oc3BvdC5jb29yLmxuZyAqIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5jb29yLmxhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHNwb3QuY29vci5sYXQgKiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzQ29vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJyArIHNpdGUgKyAnXycgKyBpICsgJ1wiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8YSBjbGFzcz1cImNoZWNrX19zcG90TmFtZVwiIGhyZWY9XCInICsgc2VhcmNoVXJsICsgc3BvdC5uYW1lICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBzcG90Lm5hbWUgKyAnPC9hPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fc3BvdENvb3JcIiBwbGFjZWhvbGRlcj1cInh4Lnh4eHh4LCB4eC54eHh4eCDtmJXtg5wg7J6F66ClXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2NvbmZpcm1cIj7sooztkZwg7J6F66ClPC9wPjxwIGNsYXNzPVwiY2hlY2tfX3Nwb3REZWxldGVcIj7snqXshowg7IKt7KCcPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdfJyArIGkgKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90VHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX190eHRcIj4nICsgaSArICcg67KIIOq0gOq0keyngDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3Nwb3REZWxldGVcIj7snqXshowg7IKt7KCcPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9Db29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSBub0Nvb3JUeHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub1Nwb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vU3BvdFR4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdLmxlbmd0aCA+IDE1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFyZ2VPSyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxhcmdlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGFyZ2VEYXRhW3NpdGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8xNTDqsJwg7J207IOB7J2YIOuNsOydtO2EsOulvCDrs7TsnKDtlZjroKTrqbQg64+E7Iuc66qFL3Nwb3RzL2xhcmdlRGF0YS/sgqzsnbTtirjrqoXsnbQgdHJ1ZeudvOqzoCDrtoDsl6zrkJjslrTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXJnZU9LKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg7J6l7IaMIOuNsOydtO2EsOqwgCAxNTDqsJzrpbwg7LSI6rO8KCcgKyBkYXRhW3NpdGVdLmxlbmd0aCArICfqsJwp7ZWp64uI64ukLjwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJyArIHNpdGUgKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fcmVtYWluTnVtYmVyXCIgdmFsdWU9XCInICsgZGF0YVtzaXRlXS5sZW5ndGggKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19yZW1haW5MYXJnZURhdGFcIj7qsJzsnZgg7J6l7IaMIOycoOyngO2VmOq4sDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSw6rCAIOyhtOyerO2VmOyngCDslYrsirXri4jri6QuPC9wPidcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGUgY2hlY2tfX25vZGF0YVwiIHNpZD1cIicgKyBzaXRlICsgJ1wiPuuNsOydtO2EsOqwgCDsm5Drnpgg7JeG7J2EIOqyveyasCDtgbTrpq3tlbTso7zshLjsmqU8L3A+J1xyXG4gICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzog7JuQ656YIOyCrOydtO2KuCDrjbDsnbTthLDqsIAg7KG07J6s7ZWY7KeAIOyViuuKlCDqsr3smrDrpbwg64yA67mE7ZWcIOuyhO2KvOydhCDrp4zrk6Tqs6Agc2l0ZSDqsJLsnLzroZwgbm9kYXRhOiB0cnVl66W8IOuEo+yWtOykgOuLpC5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNpdGVIYXNQcm9ibGVtKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+67Cc6rKs65CcIOusuOygnOqwgCDsl4bsirXri4jri6Q8L3A+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzUHJvYmxlbSkge1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2ZpbmlzaFwiPuqygOyCrOulvCDrqqjrkZAg66eI7LOk7Iq164uI64ukPC9wPidcclxuICAgICAgICAgICAgJChcIi5zcG90IC53cmFwcGVyXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKCdjaWQnKTtcclxuICAgICAgICAgICAgdG9hc3QoXCLrsJzqsqzrkJwg66y47KCc6rCAIOyXhuyWtCDrjbDsnbTthLAg67OR7ZWp7J2EIOyLpOyLnO2VqeuLiOuLpC5cIik7XHJcblxyXG4gICAgICAgICAgICBBdXRvQ29tYmluZS5pbml0KGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi53cmFwXCIpLnNjcm9sbFRvcCgwKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaXJzdF9DaGVjaztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2ZpcnN0X2NoZWNrLmpzIiwiLy9maXJzdF9jaGVja+yXkOyEnOunjCBpbXBvcnRlZCDrkJjqs6Ag7IKs7Jqp65CoXHJcblxyXG52YXIgQXV0b0NvbWJpbmUgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICBsZXQgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlQXJyID0gW1wiZ2dcIiwgXCJscFwiLCBcIm52XCIsIFwidGFcIl07XHJcbiAgICAgICAgbGV0IGNvbWJpbmluZyA9IHt9O1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXRlQXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBzaXRlID0gc2l0ZUFycltqXTtcclxuICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdLm5vRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtzaXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtzaXRlXVtpXSAmJiAhZGF0YVtzaXRlXVtpXS5kZWxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2xkU3BvdCA9IGRhdGFbc2l0ZV1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+q4sOyhtCDsoJXrs7Trpbwgb2xkU3BvdOydtOudvOqzoCDtlZjsnpAuIOyDiOuhnOyatCDsiqTtjJ/soJXrs7Tsl5DripQg7J2066aE7J2EIO2VnC/smIHsnLzroZwg67aE7ZWg7ZWY6rOgIOuere2CueydhCDrtoDsl6ztlaAg6rKD7J2064ukLlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcG90ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga286IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yOiBvbGRTcG90LmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuazoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvW+qwgC3tnqNdLy50ZXN0KG9sZFNwb3QubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm5hbWUua28gPSBvbGRTcG90Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5lbiA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QucmFua1tzaXRlXSA9IGk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFNwb3QudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC51cmwgPSBvbGRTcG90LnVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRTcG90LnRhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudGFnID0gb2xkU3BvdC50YWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmluZ1tcInMwMFwiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudGVyIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczBcIiArIGNvdW50ZXJdID0gc3BvdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wic1wiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IC8v7ZWc67CU7YC0IOuPjOyVmOuLuVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBjb21iaW5lT2JqID0ge31cclxuICAgICAgICBsZXQgY29tYmluZWQgPSB7fVxyXG5cclxuICAgICAgICBmb3IgKHZhciBjb2RlIGluIGNvbWJpbmluZykge1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IGNvbWJpbmluZ1tjb2RlXTtcclxuICAgICAgICAgICAgY29tYmluZU9ialtjb2RlXSA9IHNwb3RcclxuICAgICAgICAgICAgY29tYmluZU9ialtjb2RlXS5jb21iaW5lID0ge307XHJcbiAgICAgICAgICAgIGxldCBoYXNDb21iaW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL+2Vqey5oCDqsoPsnbQg7JeG7Jy866m0IOuwlOuhnCBjb21iaW5lZCDsqr3snLzroZwg67O064K464ukLlxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgdENvZGUgaW4gY29tYmluaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29kZSA8IHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRTcG90ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbWJpbmluZ1t0Q29kZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdFNwb3Rba2V5XSA9IGNvbWJpbmluZ1t0Q29kZV1ba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRTcG90LmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGNhbGN1bGF0ZURpZihzcG90LmNvb3IsIHRTcG90LmNvb3IpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMjUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmVbdENvZGVdID0gdFNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb21iaW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaGFzQ29tYmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbWJpbmVkW2NvZGVdID0gY29tYmluZU9ialtjb2RlXTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb21iaW5lT2JqW2NvZGVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaWQgKyBcIi9zcG90c1wiKS5zZXQoe1xyXG4gICAgICAgICAgICBjb21iaW5pbmc6IGNvbWJpbmVPYmosXHJcbiAgICAgICAgICAgIGNvbWJpbmVkOiBjb21iaW5lZFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcy8nICsgY2lkICsgJy9zdGF0dXMvc3BvdCcpLnNldCgxKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXV0b0NvbWJpbmU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9hdXRvQ29tYmluZS5qcyIsInZhciBTZWNvbmRfY29tYmluZSA9IHtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY29uZF9jb21iaW5lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3Qvc2VvbmRfY29tYmluZS5qcyIsImxldCBBY2NvdW50ID0ge1xyXG4gICAgdXNlcjoge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBpZD1cImFjY291bnRDYWxlbmRhclwiIGNsYXNzPVwiYWNjb3VudF9fY2FsZW5kYXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5hY2NvdW50XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB1aWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVpZCAhPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJbdWlkXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YVt1aWRdLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJyNhY2NvdW50Q2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgIHZpZXdSZW5kZXI6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24gKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2FjY291bnQuanMiLCJsZXQgU3Vid2F5ID0ge1xyXG4gICAgbWFwOnt9LFxyXG4gICAgbWFya2VyOmZhbHNlLFxyXG4gICAgbWV0cm86W10sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5bG9cIilcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvbnljL21ldHJvXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdGhhdC5tZXRybyA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YndheU1hcCcpLCB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiA0MC43NDg0NCwgbG5nOiAtNzMuOTg1NjYgfSxcclxuICAgICAgICAgICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tYXAuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRTdWJ3YXkoZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZmluZFN1YndheTogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgbGV0IGNvb3IgPSB7XHJcbiAgICAgICAgICAgIGxhdDplLmxhdExuZy5sYXQoKSxcclxuICAgICAgICAgICAgbG5nOmUubGF0TG5nLmxuZygpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm1hcmtlcil7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnNldE1hcChudWxsKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGUubGF0TG5nLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgIGxldCBtZXRyb0luZm8gPSB7fVxyXG4gICAgICAgIGxldCBtZXRyb0J5U3RuID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDczOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvTmFtZSA9IHRoaXMubWV0cm9baV0ubmFtZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkaWYgPSBNYXRoLnJvdW5kKGNhbGN1bGF0ZURpZihjb29yLHRoaXMubWV0cm9baV0uY29vcikpO1xyXG5cclxuICAgICAgICAgICAgaWYoZGlmPDcwMCl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMubWV0cm9baV0ubGluZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gdGhpcy5tZXRyb1tpXS5saW5lW2tdLnNsaWNlKDAsMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1ldHJvSW5mb1tsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjxtZXRyb0luZm9bbGluZV0uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvSW5mb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyb05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0luZm9bbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldHJvTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG1ldHJvQnlTdG5bbWV0cm9OYW1lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdLmxpbmUgPSBtZXRyb0J5U3RuW21ldHJvTmFtZV0ubGluZS5jb25jYXQodGhpcy5tZXRyb1tpXS5saW5lKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5tZXRyb1tpXS5saW5lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWV0QXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBsaW5lIGluIG1ldHJvSW5mbykge1xyXG4gICAgICAgICAgICBtZXRBcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bGluZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6bWV0cm9JbmZvW2xpbmVdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkaWY6bWV0cm9JbmZvW2xpbmVdLmRpZlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXRTdG5BcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gbWV0cm9CeVN0bikge1xyXG4gICAgICAgICAgICBtZXRTdG5BcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bWV0cm9CeVN0bltuYW1lXS5saW5lLFxyXG4gICAgICAgICAgICAgICAgbmFtZTpuYW1lLFxyXG4gICAgICAgICAgICAgICAgZGlmOm1ldHJvQnlTdG5bbmFtZV0uZGlmXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWV0QXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZGlmID4gYi5kaWYgPyAxIDogYS5kaWYgPCBiLmRpZiA/IC0xIDogMDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIG1ldFN0bkFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmRpZiA+IGIuZGlmID8gMSA6IGEuZGlmIDwgYi5kaWYgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3RpdGxlXCI+7Jet67OEPC9wPidcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19kaXZcIj4nXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRTdG5BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX3N0bk5hbWVcIj4nKyBtZXRTdG5BcnJheVtpXS5uYW1lICsgJ+yXrTwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fZGlmXCI+JysgTWF0aC5jZWlsKG1ldFN0bkFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTGluZVwiPidcclxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBtZXRTdG5BcnJheVtpXS5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihtZXRTdG5BcnJheVtpXS5saW5lW2tdLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTmFtZSBsbl8nK21ldFN0bkFycmF5W2ldLmxpbmVba10rJ1wiPicrbWV0U3RuQXJyYXlbaV0ubGluZVtrXSArICc8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICB0eHQrPSc8cCBjbGFzcz1cInN1YndheV9faW5mb19fdGl0bGVcIj7rhbjshKDrs4Q8L3A+J1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpdlwiPidcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2xpbmVcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lTmFtZSBsbl8nK21ldEFycmF5W2ldLmxpbmUrJ1wiPicrbWV0QXJyYXlbaV0ubGluZSArICc8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fZGlmXCI+JysgTWF0aC5jZWlsKG1ldEFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19zdG5OYW1lXCI+JysgbWV0QXJyYXlbaV0ubmFtZSArICfsl608L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgJChcIi5zdWJ3YXlfX2luZm9cIikuaHRtbCh0eHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdWJ3YXk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3N1YndheS5qcyIsImltcG9ydCBTZXRIb3RlbEluZm8gZnJvbSBcIi4vaG90ZWwvc2V0SG90ZWxJbmZvXCI7XHJcbmltcG9ydCBTZXRBcmVhIGZyb20gXCIuL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhXCI7XHJcblxyXG52YXIgSG90ZWwgPSB7XHJcblxyXG5cclxuICAgIC8vaW5mbGF0Ze2VmOuptCDtmLjthZTsnYQg66eM65Ok7Ja064K06riwIOychO2VnCDsoJXrs7Qg7IiY7KeRIOyDge2DnOqwgCDtkZzsi5zrkKggLT4gXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLm9uKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGVfc3RhdHVzKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuc3RhdHVzX19tYWtlX19ob3RlbFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSAkKHRoaXMpLmF0dHIoJ2NpZCcpO1xyXG4gICAgICAgICAgICB2YXIgY2l0eU5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcuc3RhdHVzX19jaXR5JykuaHRtbCgpO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIGNpdHlOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuaG90ZWxfX2FsZXJ0X19jb25maXJtXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChcIi5ob3RlbF9fYWxlcnRfX3dyYXBcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuaG90ZWxcIikub24oXCJjbGlja1wiLCBcIi5jaXR5QXJlYV9fZmluaXNoXCIsIGZ1bmN0aW9uICgpIHsgIC8vc2V0QXJlYeulvCDrgZ3rgrzrlYxcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykuYXR0cignY2lkJyk7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5vbmNlKCd2YWx1ZScsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhW2hpZF0uYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbaGlkXS5hcmVhID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2hpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5zZXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cy9hcmVhJykuc2V0KDIpO1xyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvc3RhdHVzL2FyZWEnKS5zZXQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jaXR5OiBmdW5jdGlvbihjaWQsIGNpdHlOYW1lKXtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgIHZhciBhbGVydE1vZGFsID0gJyc7XHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICBhbGVydE1vZGFsICs9ICAgICAnPGRpdiBjbGFzcz1cImhvdGVsX19hbGVydFwiPic7XHJcblxyXG4gICAgICAgICAgICBpZighZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7qtIDqtJHsp4Ag7KCV67O06rCAIOyVhOyngSDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7tjrjsnZjsi5zshKQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLnNwb3RzKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuc3BvdHMucmFua2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuq0gOq0keyngCDsoJXrs7TqsIAg7JWE7KeBIOygleumrOuQmOyngCDslYrslZjsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+6rSA6rSR7KeAIOygleuztOqwgCDslYTsp4Eg7KCV66as65CY7KeAIOyViuyVmOyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEubWV0cm8pIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7rjIDspJHqtZDthrUg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoIWRhdGEubWV0cm9MaW5lKXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7rjIDspJHqtZDthrUg7KCV67O06rCAIOygleumrOuQmOyngCDslYrslZjsirXri4jri6QobWV0cm9MaW5lIOyXhuydjCkuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEubG9jYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7tjrjsnZjsi5zshKQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLmFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7sp4Dsl63qtazrtoQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYgKCFkYXRhLnN0YXR1cy5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICBTZXRBcmVhLmluZmxhdGUoY2l0eU5hbWUsIGNpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdCgn7KeA7JetIOyEpOygleydhCDrqLzsoIAg7KeE7ZaJ7ZWp64uI64ukJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8ZGl2IGNsYXNzPVwiaG90ZWxfX2FsZXJ0X19jb25maXJtXCI+7ZmV7J24PC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzwvZGl2PjwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICBpZihjaGVjayl7XHJcbiAgICAgICAgICAgICAgICBTZXRIb3RlbEluZm8uaW5pdChkYXRhLCBjaWQsIGNpdHlOYW1lKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmhvdGVsXCIpLmFwcGVuZChhbGVydE1vZGFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX3N0YXR1czogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxoMj7siJnshowg66as7Iqk7Yq4PC9oMj4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+JztcclxuXHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwic3RhdHVzX19saW5lclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19uYW1lXCI+64+E7Iuc66qFPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19tYWtlXCI+7IiZ7IaMIOuNsOydtO2EsDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAgICAgICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj7quLDrs7gg7Zi47YWU642w7J207YSwPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19hcmVhXCI+7KeA7Jet7KCV67O0PC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19zcG90XCI+6rSA6rSR7KeA7KCV67O0PC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj7rjIDspJHqtZDthrXsoJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gY2l0eS5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJzdGF0dXNfX2xpbmVyXCI+JztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAgICAgICc8cCBjbGFzcz1cInN0YXR1c19fY2l0eVwiPicrY2l0eS5uYW1lKyc8L3A+JztcclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuaG90ZWwgPT09IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2VcIj7snojsnYw8L3A+JztcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19tYWtlIHN0YXR1c19fbWFrZV9faG90ZWxcIiAgY2lkPVwiJyArIGNpdHkuY29kZSArICdcIj7sl4bsnYwgKO2BtOumre2VtCDrp4zrk6TquLApPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoc3RhdHVzLmhvdGVsPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2hvdGVsXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoc3RhdHVzLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19hcmVhXCI+WDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMuc3BvdCA+IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19zcG90XCI+TzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19zcG90XCI+WDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fdHJhbnNwb3J0XCI+TzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5ob3RlbFwiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb3RlbDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC5qcyIsImltcG9ydCBTZXRBVE0gZnJvbSBcIi4vc2V0SG90ZWxJbmZvL3NldEFUTS5qc1wiO1xyXG5cclxudmFyIFNldEhvdGVsSW5mbyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEsIGNpZCwgY2l0eU5hbWUpe1xyXG4gICAgICAgIC8vc3RhdHVzQ2hlY2sg7KeE7ZaJXHJcbiAgICAgICAgdmFyIGNoZWNrVHh0ID0gJyc7XHJcblxyXG4gICAgICAgIHZhciBob3RlbCA9IGRhdGEuaG90ZWxzW09iamVjdC5rZXlzKGRhdGEuaG90ZWxzKVswXV07XHJcblxyXG4gICAgICAgIHZhciBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgIGxvY2FsOiB7XHJcbiAgICAgICAgICAgICAgICBhdG06IHsgLy8wOiDrjbDsnbTthLAg7JeG7J2MLCAxOiDrp4zrk6Qg7IiYIOyeiOydjCwgMjog7KG07J6s7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzYTowLFxyXG4gICAgICAgICAgICAgICAgICAgIGNpdGk6MFxyXG4gICAgICAgICAgICAgICAgfSwgIFxyXG4gICAgICAgICAgICAgICAgZm9vZDogMCxcclxuICAgICAgICAgICAgICAgIG1ldHJvOiAwLFxyXG4gICAgICAgICAgICAgICAgc3BvdDowXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBhc3Nlc3NtZW50OiB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6MCxcclxuICAgICAgICAgICAgICAgIHNhZmV0eTowLFxyXG4gICAgICAgICAgICAgICAgdGhlbWU6MCxcclxuICAgICAgICAgICAgICAgIGNvbnZlbmllbmNlOjBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChob3RlbC5sb2NhbCkge1xyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwuYXRtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShob3RlbC5sb2NhbC5hdG0pKSB7IC8vVklTQSBBVE3snbQg7KCV66as65CY7KeAIOyViuydgCDtmJXtg5zroZwg65Ok7Ja06rCA7J6I64qUIOyDge2DnFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvL2F0beqwneyytOulvCDqsIDsp4Dqs6Ag7J6I64qUIOyDge2DnCAtIOuwmOuTnOyLnCB2aXNhIGF0beydtCDrk6TslrTqsIAg7J6I7Ja07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9IDI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5hdG0uY2l0aSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sb2NhbC5hdG0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS5jaXRpID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/spJHsmpQ6IENJVEnsnpHsl4XsnYAgVklTQeyekeyXhSDtm4Tsl5Ag7J2066Oo7Ja07KC47JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHsgLy9sb2NhbOyXkCBhdG3snbQg7JeG7J2MIC0+IOu5hOyekCDstpTstpzrkJwg7KCB7J20IOyXhuydjFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sb2NhbC5hdG0pIHsgLy/qt7gg6rK97Jqw7JeQ64+EIENJVEnripQgUkFX642w7J207YSw66GcIOyhtOyerO2VoCDsiJgg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS5jaXRpID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAvL+ykkeyalDogQ0lUSeyekeyXheydgCBWSVNB7J6R7JeFIO2bhOyXkCDsnbTro6jslrTsoLjslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5tZXRybykge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1ldHJvTGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5zcG90KSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zcG90cy5yYW5rZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLnZpc2EgPSAwOyAvL1ZJU0HripQg66y07KGw6rG0IO2YuO2FlCDroZzsu6zsl5Ag7KeB7KCRIOuTpOyWtOqwgOuvgOuhnCDtmLjthZQg66Gc7LusIOqyveuhnOqwgCDsl4bri6TripQg6rKD7J2AIFZJU0HqsIAg7JeG64uk64qUIOqygy5cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmF0bSkgeyAvL2NpdGnrgpggdmlzYeuKlCDtmLjthZQg66Gc7Lus7J20IOyVhOuLjCDrj4Tsi5wg66Gc7Lus7JeQIOyggOyepeuQoCDsiJgg7J6I7J2MLlxyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS5jaXRpID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubG9jYWwuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5tZXRyb0xpbmUpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5zcG90cy5yYW5rZWQpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hlY2tUeHQgKz0gJzxoMiBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3RpdGxlXCI+7Zi47YWUIOyjvOuzgOygleuztDwvaDI+JztcclxuXHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwuYXRtLnZpc2EgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwgVklTQSBBVE3soJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmF0bS52aXNhID09PSAxKSB7XHJcbiAgICAgICAgICAgIFNldEFUTS5pbml0KGRhdGEuaG90ZWxzKTtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIFZJU0EgQVRN7KCV67O0IO2ZleyduC4g7Zi47YWU67OE66GcIOqwgOyepSDqsIDquYzsmrQgQVRN6rO8IDI07Iuc6rCEIEFUTeydhCDstpTstpztlanri4jri6QuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuYXRtLnZpc2EgPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0gVklTQSBBVE3soJXrs7TqsIAg7JeG7Iq164uI64ukLiBWSVNBIEFUTSBsb2NhdG9y7JeQ7IScIOygleuztOulvCDrqLzsoIAg7YGs66Gk66eB7ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCBDSVRJIEFUTeygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuYXRtLmNpdGkgPT09IDEpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIENJVEkgQVRN7KCV67O0IO2ZleyduC4g6rCA7J6lIOqwgOq5jOyatCBDSVRJIEFUTeydhCDstpTstpztlanri4jri6QuPC9wPic7XHJcbiAgICAgICAgfSAvLyBjaXRpIHN0YXR1cyAw7J2AIOyXhuydjC5cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5mb29kID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIOyLneujjO2SiOygkC/tjrjsnZjsoJAg7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5mb29kID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk1ha2luZyAtIFJBVyDsi53ro4ztkojsoJAv7Y647J2Y7KCQIOygleuztCDtmZXsnbguIO2YuO2FlOuzhOuhnCDqsIDquYzsmrQg7Iud66OM7ZKI7KCQIOy2lOy2nC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5mb29kID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIOuPhOyLnCDsi53ro4ztkojsoJAv7Y647J2Y7KCQIOygleuztOqwgCDsl4bsirXri4jri6QuIOuovOyggCDsoJXrs7Trpbwg7J6F66Cl7ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5tZXRybyA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCDsp4DtlZjssqAv64yA7KSR6rWQ7Ya1IOygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwubWV0cm8gPT09IDEpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIOyngO2VmOyyoC/rjIDspJHqtZDthrUg7KCV67O0IO2ZleyduC4g7Zi47YWU67OE66GcIOqwgOq5jOyatCDsp4DtlZjssqAg7LaU7LacLjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLm1ldHJvID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIOuPhOyLnCDsp4DtlZjssqAv64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuIOuovOyggCDsoJXrs7Trpbwg7J6F66Cl7ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5zcG90ID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIOq0gOq0keyngCDsoJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLnNwb3QgPT09IDEpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIOq0gOq0keyngCDsoJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA6rmM7Jq0IOq0gOq0keyngCDstpTstpwuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuc3BvdCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHQgY29sb3ItLXJlZFwiPk5vIERhdGEgLSDrj4Tsi5wg6rSA6rSR7KeAIOyInOychOqwgCDslYTsp4Eg7ZmV7KCV65CY7KeAIOyViuyVmOyKteuLiOuLpC4g66i87KCAIO2ZleyduO2VtOyjvOyEuOyalC48L3A+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGNoZWNrVHh0KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldEhvdGVsSW5mbztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8uanMiLCJ2YXIgU2V0QVRNID0ge1xyXG4gICAgc3RhdGlzdGljOiB7XHJcbiAgICAgICAgb3ZlcmFsbDpbXSwgLy/rsJjqsr0gMTQwbSDrgrTsl5AgQVRN7J20IOuqhyDqsJwg7J6I64qU7KeAIOuPhOyLnCDsoITssrQg7Y+J6reg7J2EIOuCtOq4sCDsnITtlZwg642w7J207YSwXHJcbiAgICAgICAgYnlBcmVhOiBbXSwgLy/rsJjqsr0gMTQwbSDrgrTsl5AgQVRN7J20IOuqhyDqsJwg7J6I64qU7KeAIOyngOyXreuzhOuhnCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgICAgICBuZWFyZXN0OltdLCAvL+qwgOyepSDqsIDquYzsmrQgQVRN7J2AIOuqhyBtIOqxsOumrOyXkCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgICAgICBiYW5rMjQ6W10gICAvLzI07Iuc6rCEIOyatOyYge2VmOuKlCDsnYDtlokg7IaM7JygIOqxsOumrOyXkCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKGhvdGVscykge1xyXG4gICAgICAgIHZhciBlcnJObyA9IDA7XHJcbiAgICAgICAgdmFyIHRvdGFsTm8gPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGhpZCBpbiBob3RlbHMpIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsID0gaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0bUFyciA9IGhvdGVsLmxvY2FsLmF0bTtcclxuICAgICAgICAgICAgICAgIHZhciBhdG1PYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDogYXRtQXJyWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhbmsyNDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaW4xNDA6IDBcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgYXRtT2JqLm5lYXJlc3QuZGlmID0gY2FsY3VsYXRlRGlmKGF0bUFyclswXS5jb29yLCBob3RlbC5jb29yKS50b0ZpeGVkKDQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhdG1BcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0bUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXRtID0gYXRtQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlmID0gY2FsY3VsYXRlRGlmKGF0bS5jb29yLCBob3RlbC5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWYgPCAxNDAuMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtT2JqLmluMTQwKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWYgPCAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdG0ub3duZXIuaW5jbHVkZXMoXCJCQU5LXCIpICYmIGF0bS5pczI0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhdG1PYmouYmFuazI0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bU9iai5iYW5rMjQgPSBhdG07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bU9iai5iYW5rMjQuZGlmID0gZGlmLnRvRml4ZWQoNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL+qwgOyepSDqsIDquYzsmrQgQVRN6rO8IDI07Iuc6rCEIOyatOyYge2VmOuKlCBBVE3snbQg7Y+J6reg7KCB7Jy866GcIOyWvOuniOuCmCDrlqjslrTsoLjsnojripTsp4Ag7JWM7JWE67O06riwIOychO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLm5lYXJlc3QucHVzaChhdG1PYmoubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdG1PYmouYmFuazI0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLmJhbmsyNC5wdXNoKGF0bU9iai5iYW5rMjQuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5iYW5rMjQucHVzaCgyMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVyck5vKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5hdG0gPSBhdG1PYmo7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8xNjBtIOuwmOqyveyXkCDtj4nqt6DsoIHsnLzroZwg66qHIOqwnCBBVE3snbQg7J6I64qU7KeAIOyVjOyVhOuztOq4sCDsnITtlahcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRpc3RpYy5ieUFyZWFbaG90ZWwuYXJlYV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5ieUFyZWFbaG90ZWwuYXJlYV0ucHVzaChhdG1PYmouaW4xNDApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5ieUFyZWFbaG90ZWwuYXJlYV0gPSBbYXRtT2JqLmluMTQwXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLm92ZXJhbGwucHVzaChhdG1PYmouaW4xNDApO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVyck5vKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG90YWxObysrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmVzdC5zb3J0KChhLCBiKSA9PiBhIC0gYik7XHJcbiAgICAgICAgdGhpcy5zdGF0aXN0aWMuYmFuazI0LnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0aXN0aWMuYnlBcmVhKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRpc3RpYy5iYW5rMjQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGlzdGljLm5lYXJlc3QpO1xyXG5cclxuICAgICAgICBpZiAoZXJyTm8gPiAyKSB7IC8vVklTQSBBVE0gZmluZGVy6rCAIOykkeqwhOyXkCDrgYrqsrzsnYQg6rCA64ql7ISxIOuGkuydjFxyXG4gICAgICAgICAgICB0b2FzdChgJHt0b3RhbE5vfSDqsJzsnZgg7Zi47YWUIOykkSAke2Vyck5vfSDqsJzsnZgg7Zi47YWU7JeQIFZJU0EgQVRNIOygleuztOqwgCDsl4bsirXri4jri6QuIO2ZleyduCDtm4Qg7J6s7Iuc64+E7ZW07KO87IS47JqUYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0QVRNO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBVE0uanMiLCJ2YXIgU2V0QXJlYSA9IHtcclxuICAgIG1hcDp7fSxcclxuICAgIG1hcmtlcjp7fSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbiAoY2l0eU5hbWUsIGNpZCkge1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycrY2lkKS5vbmNlKCd2YWx1ZScsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLm1hcmtlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJbaGlkXS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tYXJrZXIgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0eHQgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8aDI+JyArIGNpdHlOYW1lICsgJyDsiJnshowg7KeA7JetIOq1rOu2hDwvaDI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJjaXR5QXJlYV9fd3JhcFwiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBpZD1cImNpdHlBcmVhX19tYXBcIj48L2Rpdj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJcImNpdHlBcmVhPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5QXJlYV9fd29yZFwiPjwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNpZD1cIicgKyBjaWQgKyAnXCIgY2xhc3M9XCJjaXR5QXJlYV9fZmluaXNoXCI+7JmE66OM7LKY66asPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nOyAvL2Nsb3NlIHdyYXBwZXJcclxuXHJcbiAgICAgICAgICAgICQoXCIucGFnZXMuaG90ZWxcIikuaHRtbCh0eHQpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpdHlBcmVhX19tYXAnKSwge1xyXG4gICAgICAgICAgICAgICAgY2VudGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OiA0MC43NDMxOTU3OTMsXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOiAtNzMuOTg5MTc5NTRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB6b29tOiAxM1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFyZWEgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGhpZCBpbiBkYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhvdGVsID0gZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgICAgIHZhciBub0FyZWEgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5hcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWRhdGEuYXJlYVtpXS5ub3RBcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZWFDb29yID0gZGF0YS5hcmVhW2ldLmNvb3I7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNJbkFyZWEoaG90ZWwuY29vciwgYXJlYUNvb3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5hcmVhID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQXJlYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXJlYVtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vQXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyW2hpZF0gPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGhvdGVsLmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnJyArIGhpZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFyZWEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgY2lkICsgJy9ob3RlbHMnKS51cGRhdGUoZGF0YS5ob3RlbHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0QXJlYTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEFyZWEuanMiXSwic291cmNlUm9vdCI6IiJ9