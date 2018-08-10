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
            _setATM2.default.init(data);
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
        nearest: [], //가장 가까운 ATM은 몇 m 거리에 있는지 도시 전체 평균을 내기 위한 데이터
        bank24: [], //24시간 운영하는 은행 소유 거리에 있는지 도시 전체 평균을 내기 위한 데이터
        in130: [] //반경 130m 내에 ATM이 몇 개 있는지 도시 전체 평균을 내기 위한 데이터
    },
    byArea: {}, //in130 stat을 지역별로 평균내기 위한 객체

    data: {},

    first_byHotels: function first_byHotels() {
        var hotels = this.data.hotels;

        for (var hid in hotels) {
            var hotel = hotels[hid];
            if (hotel.local) {
                //hotel.temp로 바꿀것임
                var atmArr = hotel.local.atm;
                var atmObj = {
                    nearest: atmArr[0],
                    in130: 0,
                    bank24: false
                };

                atmObj.nearest.dif = calculateDif(atmArr[0].coor, hotel.coor); //숙소별 가장 가까운 atm 담음

                if (atmArr) {
                    for (var i = 0; i < atmArr.length; i++) {
                        var atm = atmArr[i];
                        var dif = calculateDif(atm.coor, hotel.coor);

                        if (dif < 130.1) {
                            //숙소별 130m거리 atm 갯수 체크
                            atmObj.in130++;
                        }

                        if (!atmObj.bank24) {
                            //기본적으로 거리순 정렬 되어있어서 이미 들어가있으면 그놈이 더 가까운놈
                            if (dif < 230) {
                                //숙소별 은행 소유 24시간 atm 담음
                                if ((atm.owner.includes("BANK") || atm.placeName.includes("BANK")) && atm.is24) {
                                    atmObj.bank24 = atm;
                                    atmObj.bank24.dif = dif;
                                }
                            }
                        }
                    }
                    //통계에 기록하기

                    this.statistic.nearest.push(atmObj.nearest.dif);
                    if (atmObj.bank24) {
                        this.statistic.bank24.push(atmObj.bank24.dif);
                    } else {
                        this.statistic.bank24.push(230);
                    }
                } else {
                    errNo++;
                }
                hotel.local.atm = atmObj;

                //in130은 호텔을 한 번 다 돈 다음에 통계에 기록할 수 있음
                this.statistic.in130.push(atmObj.in130);

                if (this.byArea[hotel.area]) {
                    //지역별 atm 밀집도를 확인하는 그런 녀석
                    this.byArea[hotel.area].push(atmObj.in130);
                } else {
                    this.byArea[hotel.area] = [atmObj.in130];
                }
            } else {
                toast("VISA ATM \uC815\uBCF4\uAC00 \uC5C6\uB294 \uD638\uD154\uC774 \uC788\uC2B5\uB2C8\uB2E4. \uD655\uC778 \uD6C4 \uC7AC\uC2DC\uB3C4\uD574\uC8FC\uC138\uC694");
                return false;
            }
        }
    },

    second_byAreas: function second_byAreas() {
        var area = this.data.area;

        for (var i = 0; i < area.length; i++) {
            var sum = 0;

            if (!area[i].notArea) {
                if (this.byArea[i]) {
                    var atms = this.byArea[i];

                    for (var j = 0; j < atms.length; j++) {
                        sum += atms[j];
                    }
                    var minus = 0;
                    if (atms.length < 10) {
                        minus = -1;
                    }
                    atms = sum / atms.length + atms.length / 10 + minus;
                    if (area[i].local) {
                        area[i].local.atm = atms.toFixed(2) * 1;
                    } else {
                        area[i].local = {
                            atm: atms.toFixed(2) * 1
                        };
                    }
                } else {
                    if (area[i].local) {
                        area[i].local.atm = 0;
                    } else {
                        area[i].local = {
                            atm: 0
                        };
                    }
                }
            }
        }
    },

    third_makeStats: function third_makeStats() {
        var stat = {
            nearest: 0,
            in130: 0,
            bank24: 0
        };

        for (var id in stat) {
            var sum = 0;
            for (var k = 0; k < this.statistic[id].length; k++) {
                sum += this.statistic[id][k];
            }
            stat[id] = sum / this.statistic[id].length;
            stat[id] = stat[id].toFixed(2) * 1;
        }

        if (this.data.stat) {
            if (this.data.stat.local) {
                this.data.stat.local.atm = stat;
            } else {
                this.data.stat.local = {
                    atm: stat
                };
            }
        } else {
            this.data.stat = {
                local: { atm: stat }
            };
        }
    },

    fourth_makeRank: function fourth_makeRank() {

        this.statistic.nearest.sort(function (a, b) {
            return a - b;
        });
        this.statistic.bank24.sort(function (a, b) {
            return a - b;
        });
        this.statistic.in130.sort(function (a, b) {
            return b - a;
        });

        var total = Object.keys(this.data.hotels).length;

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var atm = hotel.local.atm;
            var rank = {
                bank24: total,
                nearest: total,
                in130: total
            };

            for (var key in rank) {
                if (key === "in130") {
                    if (atm[key]) {
                        rank[key] = this.statistic[key].indexOf(atm[key]) + 1;
                    }
                } else {
                    if (atm[key]) {
                        rank[key] = this.statistic[key].indexOf(atm[key].dif) + 1;
                    }
                }
            }
            if (hotel.rank) {
                hotel.rank.atm = rank;
            } else {
                hotel.rank = { atm: rank };
            }
        }
    },

    fifth_makeScore: function fifth_makeScore() {

        var scoreArray = [];

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var atm = hotel.rank.atm;

            var score = atm.bank24 * 4 + atm.nearest * 3.75 + atm.in130 * 3.5;

            scoreArray.push({ score: score, hid: hid });
        }
        scoreArray.sort(function (a, b) {
            return a.score - b.score;
        }); //낮을수록 좋음


        var total = scoreArray.length;

        var rankSys = [0.15, 0.2, 0.25, 0.2, 0.1, 0.1];

        for (var i = 0; i < scoreArray.length; i++) {
            var hid = scoreArray[i].hid;
            var score = 0;
            var rank = i / total; // 백분위
            var percentile = 0;

            var isRanked = false;

            for (var j = 0; j < rankSys.length; j++) {
                if (!isRanked) {
                    var minus = percentile;
                    percentile += rankSys[j];

                    if (rank < percentile) {
                        //35% 안에 들면
                        rank -= minus; //rank를 0~0.2로 맞춰줌
                        score = 9 - j + Math.floor(rank / rankSys[j] * 10) / 10; //rank(0~0.2)를 0.2로 나눈값*10/10 -> 0~0.9가 나옴
                        isRanked = true;
                    }
                }
            }

            var hotel = this.data.hotels[hid];

            if (hotel.assessment) {
                if (hotel.assessment.score) {
                    hotel.assessment.score.atm = score;
                } else {
                    hotel.assessment.score = { atm: score };
                }
            } else {
                hotel.assessment = { score: { atm: score } };
            }
        }

        console.log(scoreArray);
    },

    init: function init(data) {
        this.data = data;

        this.first_byHotels(); //호텔들을 돌며 가장 가까운 ATM, 은행소유 24시간 ATM, 130m안에 몇 개 ATM 있는지를 찾아내고 통계에도 기록
        this.second_byAreas(); //지역별로 130m 내에 있는 ATM 갯수 평균을 냄 -> 지역 상업 발전도를 나중에 체크하기 위해 만들었음.
        this.third_makeStats(); //first에서 기록한 통계 내용을 가지고 통계값들을 산출해냄.
        this.fourth_makeRank(); //통계에 기록된 값을 바탕으로 호텔별 atm편의성 랭킹을 계산함(예-ATM가까운 정도는 뉴욕 내 7위...)
        this.fifth_makeScore();

        console.log(this.data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDkwYmU1Yzk2ODZhMzA0ZDIxODUiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvYXR0ZW5kLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2NpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2ZpcnN0X2NoZWNrLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvYXV0b0NvbWJpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9zZW9uZF9jb21iaW5lLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2FjY291bnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3Vid2F5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0QVRNLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhLmpzIl0sIm5hbWVzIjpbImluaXRpYWxpemVkIiwidV9pIiwiTmF2X2Z1bmN0aW9uIiwiYXR0ZW5kIiwiaW5pdCIsInRvZG8iLCJjaXR5IiwibWFwIiwiYWNjb3VudCIsInNwb3QiLCJjYWxjIiwiaG90ZWwiLCJsaW5rIiwibG9naW4iLCJuYW1lIiwiJCIsImh0bWwiLCJhdHRyIiwiY2xpY2siLCJjb25maXJtIiwiZmlyZWJhc2UiLCJhdXRoIiwic2lnbk91dCIsInRoZW4iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImNhdGNoIiwiZXJyb3IiLCJkb2N1bWVudCIsInJlYWR5IiwicHJvdmlkZXIiLCJHb29nbGVBdXRoUHJvdmlkZXIiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJ1c2VyIiwibWFpbCIsImVtYWlsIiwic3BsaXQiLCJkYXRhYmFzZSIsInJlZiIsIm9uY2UiLCJkYXRhIiwic25hcCIsInZhbCIsImdyYWRlIiwidG9hc3QiLCJzaWduSW5XaXRoUG9wdXAiLCJyZXN1bHQiLCJ1c2VyTWFpbCIsInNldCIsImRpc3BsYXlOYW1lIiwic2V0dGluZyIsIm9yZGVyIiwiY29kZSIsImVycm9yQ29kZSIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjcmVkZW50aWFsIiwiaGFzQ2xhc3MiLCJpdGVtIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInBhcmVudCIsIkF0dGVuZCIsIm1vYmlsZSIsImlkIiwidmlld0lEIiwiYXR0ZW5kT2JqIiwic2FsYXJ5Iiwid2Vla2RheXMiLCJ0aGF0IiwidHh0IiwidXNlcnMiLCJtYWlsSUQiLCJwcm9wIiwib24iLCJjb25zb2xlIiwibG9nIiwiaW5mbGF0ZV9jYWxlbmRhciIsImxlbmd0aCIsImZ1bGxDYWxlbmRhciIsImhlaWdodCIsImZpcnN0RGF5Iiwidmlld1JlbmRlciIsInZpZXciLCJlbGVtZW50IiwiZGF5Q2xpY2siLCJkYXRlIiwiaW5wdXRXb3JrSG91ciIsImxpc3RlbmVyIiwic2V0V29ya0hvdXIiLCJrZXl1cCIsImUiLCJ3aGljaCIsImNoYW5nZSIsInZpZXdfd29ya2VyIiwib2ZmIiwieW8iLCJkYXRlSUQiLCJzbGljZSIsImRpZiIsImZyb20iLCJ0byIsImkiLCJNYXRoIiwiZmxvb3IiLCJkdXJNb24iLCJ0aGlzTW9udGgiLCJkYXRlRG9tIiwiZXEiLCJqIiwid2Vla0RvbSIsIndlZWtEdXIiLCJkYXlEb20iLCJmaW5kIiwiayIsImNoaWxkcmVuIiwiYXBwZW5kIiwiZnVsbE1vbnRoQm9udXMiLCJpbnN1cmFuY2VGZWUiLCJiYXNpYyIsInJvdW5kIiwiZnVsbFdlZWtCdW51cyIsImNvbW1hIiwiZGF0ZU9iaiIsImRhdGVTaG9ydCIsIm1vbWVudCIsImZvcm1hdCIsIkFueVBpY2tlciIsImRhdGVUaW1lRm9ybWF0IiwiZm9jdXMiLCJ3b3JrIiwiYWxsRW1wdHkiLCJyZW1vdmUiLCJhbGVydCIsImZyb21BIiwidG9BIiwicHVzaCIsIkNpdHkiLCJyZWZyZXNoU3RhdHVzIiwiaW5mbGF0ZSIsInN0YXR1cyIsInRyYW5zcG9ydCIsImFyZWEiLCJwcmljZSIsImNpZCIsImhvdGVscyIsIk9iamVjdCIsImtleXMiLCJhc3Nlc3NtZW50IiwidXBkYXRlIiwibWV0cm8iLCJtZXRyb0xpbmUiLCJTcG90IiwiY2l0aWVzIiwiY3VycmVudCIsImluZmxhdGVfc3RhdHVzIiwiaW5mbGF0ZV9jaXR5IiwidWlkIiwib3JkZXJBcnJheSIsImlkeCIsImNoYW5nZWQiLCJzb3J0IiwiYSIsImIiLCJzdGF0dXNBcnJheSIsImNpdHlOYW1lIiwic3BvdHMiLCJGaXJzdF9DaGVjayIsInNldFJlbWFpbk51bWJlciIsInNpZCIsInNpdGVOb2RhdGEiLCJkZWxldGVTcG90IiwiaW5wdXRDb29yZGluYXRlIiwic2l0ZSIsIm51bWJlciIsImN1dE5vIiwidHJpbSIsImN1dE9iaiIsIm5vIiwiZGVsZXRlZCIsImNvb3JUeHQiLCJjb29yIiwibGF0IiwibG5nIiwiaXNOYU4iLCJoYXNQcm9ibGVtIiwic2VhcmNoVXJsIiwic2l0ZU9iaiIsImdnIiwibnYiLCJ0YSIsImxwIiwic2l0ZUhhc1Byb2JsZW0iLCJub0Nvb3IiLCJub0Nvb3JUeHQiLCJub1Nwb3QiLCJub1Nwb3RUeHQiLCJub2RhdGEiLCJoYXNDb29yIiwibGFyZ2VPSyIsImxhcmdlRGF0YSIsInNjcm9sbFRvcCIsIkF1dG9Db21iaW5lIiwic2l0ZUFyciIsImNvbWJpbmluZyIsImNvdW50ZXIiLCJub0RhdGEiLCJvbGRTcG90Iiwia28iLCJlbiIsInJhbmsiLCJ0ZXN0IiwidXJsIiwidGFnIiwiY29tYmluZU9iaiIsImNvbWJpbmVkIiwiY29tYmluZSIsImhhc0NvbWJpbmVkIiwidENvZGUiLCJ0U3BvdCIsImtleSIsImNhbGN1bGF0ZURpZiIsIlNlY29uZF9jb21iaW5lIiwiQWNjb3VudCIsIlN1YndheSIsIm1hcmtlciIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJnZXRFbGVtZW50QnlJZCIsImNlbnRlciIsInpvb20iLCJtYXBUeXBlQ29udHJvbCIsInNjYWxlQ29udHJvbCIsImZ1bGxzY3JlZW5Db250cm9sIiwiYWRkTGlzdGVuZXIiLCJmaW5kU3Vid2F5IiwibGF0TG5nIiwic2V0TWFwIiwiTWFya2VyIiwicG9zaXRpb24iLCJtZXRyb0luZm8iLCJtZXRyb0J5U3RuIiwibWV0cm9OYW1lIiwibGluZSIsImNvbmNhdCIsIm1ldEFycmF5IiwibWV0U3RuQXJyYXkiLCJjZWlsIiwiSG90ZWwiLCJoaWQiLCJjaGVjayIsImFsZXJ0TW9kYWwiLCJyYW5rZWQiLCJsb2NhbCIsIlNldEhvdGVsSW5mbyIsImNoZWNrVHh0IiwiYXRtIiwidmlzYSIsImNpdGkiLCJmb29kIiwic2FmZXR5IiwidGhlbWUiLCJjb252ZW5pZW5jZSIsIkFycmF5IiwiaXNBcnJheSIsIlNldEFUTSIsInN0YXRpc3RpYyIsIm5lYXJlc3QiLCJiYW5rMjQiLCJpbjEzMCIsImJ5QXJlYSIsImZpcnN0X2J5SG90ZWxzIiwiYXRtQXJyIiwiYXRtT2JqIiwib3duZXIiLCJpbmNsdWRlcyIsInBsYWNlTmFtZSIsImlzMjQiLCJlcnJObyIsInNlY29uZF9ieUFyZWFzIiwic3VtIiwibm90QXJlYSIsImF0bXMiLCJtaW51cyIsInRvRml4ZWQiLCJ0aGlyZF9tYWtlU3RhdHMiLCJzdGF0IiwiZm91cnRoX21ha2VSYW5rIiwidG90YWwiLCJpbmRleE9mIiwiZmlmdGhfbWFrZVNjb3JlIiwic2NvcmVBcnJheSIsInNjb3JlIiwicmFua1N5cyIsInBlcmNlbnRpbGUiLCJpc1JhbmtlZCIsIlNldEFyZWEiLCJu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R0FBa0IsU0FBMUMsRUFBcURLLE1BQXJELENBQTREN0csS0FBS3lHLE1BQWpFO0FBQ0gsU0FwRUQ7QUFxRUg7QUEzRVMsQ0FBZDs7a0JBOEVld0osTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDQ5MGJlNWM5Njg2YTMwNGQyMTg1IiwiaW1wb3J0IEF0dGVuZCBmcm9tIFwiLi9wYWdlcy9hdHRlbmQuanNcIjtcclxuaW1wb3J0IENpdHkgZnJvbSBcIi4vcGFnZXMvY2l0eS5qc1wiO1xyXG5pbXBvcnQgU3BvdCBmcm9tIFwiLi9wYWdlcy9zcG90LmpzXCI7XHJcbmltcG9ydCBBY2NvdW50IGZyb20gXCIuL3BhZ2VzL2FjY291bnQuanNcIjtcclxuaW1wb3J0IFN1YndheSBmcm9tIFwiLi9wYWdlcy9zdWJ3YXkuanNcIjtcclxuaW1wb3J0IEhvdGVsIGZyb20gXCIuL3BhZ2VzL2hvdGVsLmpzXCI7XHJcblxyXG52YXIgaW5pdGlhbGl6ZWQgPSB7fTtcclxuXHJcbnZhciB1X2kgPSB7fTtcclxuXHJcbnZhciBOYXZfZnVuY3Rpb24gPSB7XHJcbiAgICBhdHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBBdHRlbmQuaW5pdCh1X2kpO1xyXG4gICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgdG9kbzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBjaXR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgQ2l0eS5pbml0KHVfaSk7XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQuY2l0eSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgbWFwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgU3Vid2F5LmluaXQoKTtcclxuICAgIH0sXHJcbiAgICBhY2NvdW50OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIHNwb3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBTcG90LmluaXQodV9pKTtcclxuICAgICAgICBpbml0aWFsaXplZC5zcG90ID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBjYWxjOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGhvdGVsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgSG90ZWwuaW5pdCgpO1xyXG4gICAgfSxcclxuICAgIGxpbms6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBsb2dpbihuYW1lKXtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5odG1sKG5hbWVbMV0rXCLtlZghXCIpO1xyXG4gICAgJChcIi5oZWxsb1dvcmxkXCIpLmF0dHIoXCJ0aXRsZVwiLG5hbWUrXCLri5gg7JWI64WV7ZWY7IS47JqUIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGNvbmZpcm0obmFtZStcIuuLmCDroZzqt7jslYTsm4Mg7ZWY7Iuc6rKg7Iq164uI6rmMP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgLy8gQW4gZXJyb3IgaGFwcGVuZWQuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgICBsZXQgbWFpbCA9IHVzZXIuZW1haWwuc3BsaXQoJ0AnKVswXTtcclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v7JWE656YIOuCtOyaqeydhCDrsJTqvrjrqbQgaWYgKCFpc1VzZXIpIOu2gOu2hOyXkOuPhCDrsJjrk5zsi5wg67CY7JiB7ZW07KSE6rKDXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgKHZhciBnaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGRhdGFbZ2lkXS5cclxuICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLnVwZGF0ZShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVttYWlsXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVfaSA9IGRhdGFbbWFpbF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyYWRlID0gdV9pLmdyYWRlICogMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdHRlbmQuaW5pdChkYXRhW21haWxdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2NvdW50LmluaXQobWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hY2NvdW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hdHRlbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dpbih1X2kubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBVc2VyIGlzIHNpZ25lZCBpbi5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gTm8gdXNlciBpcyBzaWduZWQgaW4uXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IHJlc3VsdC51c2VyO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJNYWlsID0gdXNlci5lbWFpbC5zcGxpdCgnQCcpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3VzZXJNYWlsXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1X2kgPSBkYXRhW3VzZXJNYWlsXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyYWRlID0gdV9pLmdyYWRlICogMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmFkZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF0dGVuZC5pbml0KGRhdGFbdXNlck1haWxdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmFkZSA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjY291bnQuaW5pdCh1c2VyTWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZWQuYWNjb3VudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hdHRlbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9naW4odV9pLm5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCd1c2Vycy8nICsgdXNlck1haWwpLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIuZGlzcGxheU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWlsOiB1c2VyTWFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogXCJhYmNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgnY29kZTonICsgZXJyb3IuY29kZSArICcgLSDsnbzsi5zsoIHsnbgg66y47KCc6rCAIOuwnOyDne2WiOyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalC4nKTtcclxuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBFcnJvcnMgaGVyZS5cclxuICAgICAgICAgICAgICAgIHZhciBlcnJvckNvZGUgPSBlcnJvci5jb2RlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZW1haWwgb2YgdGhlIHVzZXIncyBhY2NvdW50IHVzZWQuXHJcbiAgICAgICAgICAgICAgICB2YXIgZW1haWwgPSBlcnJvci5lbWFpbDtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBmaXJlYmFzZS5hdXRoLkF1dGhDcmVkZW50aWFsIHR5cGUgdGhhdCB3YXMgdXNlZC5cclxuICAgICAgICAgICAgICAgIHZhciBjcmVkZW50aWFsID0gZXJyb3IuY3JlZGVudGlhbDtcclxuICAgICAgICAgICAgICAgIC8vIC4uLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuJChcIi5uYXZfX2l0ZW1cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgaWYoISQodGhpcykuaGFzQ2xhc3MoJ25hdl9faXRlbS0taGFzRHJhd2VyJykpe1xyXG4gICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5hdHRyKFwiaWRcIikuc3BsaXQoXCJfXCIpWzFdO1xyXG5cclxuICAgICAgICAkKFwiLm5hdj4qXCIpLnJlbW92ZUNsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAgICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIucGFnZXMuXCIgKyBpdGVtKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICAgICBpZighaW5pdGlhbGl6ZWRbaXRlbV0pe1xyXG4gICAgICAgICAgICBOYXZfZnVuY3Rpb25baXRlbV0oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuJChcIi5uYXZfX2RyYXdlcl9faXRlbVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgdmFyIGl0ZW0gPSAkKHRoaXMpLmF0dHIoXCJpZFwiKS5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgJChcIi5uYXY+KlwiKS5yZW1vdmVDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAkKFwiLm5hdl9fZHJhd2VyX19pdGVtXCIpLnJlbW92ZUNsYXNzKFwibmF2X19kcmF3ZXJfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIm5hdl9fZHJhd2VyX19pdGVtLS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAkKFwiLnBhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLnBhZ2VzLlwiICsgaXRlbSkucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICBpZiAoIWluaXRpYWxpemVkW2l0ZW1dKSB7XHJcbiAgICAgICAgTmF2X2Z1bmN0aW9uW2l0ZW1dKCk7XHJcbiAgICB9XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL2luZGV4LmpzIiwidmFyIEF0dGVuZCA9IHtcclxuICAgIG1vYmlsZTogZmFsc2UsXHJcblxyXG4gICAgaWQ6IFwiXCIsXHJcblxyXG4gICAgdmlld0lEOiBcIlwiLFxyXG4gICAgLy/qtIDrpqzsnpDqsIAg64uk66W4IOyCrOuejOydmCBJRCDtmZXsnbjspJFcclxuXHJcbiAgICBhdHRlbmRPYmo6IHt9LFxyXG5cclxuICAgIHNhbGFyeToge30sXHJcblxyXG5cclxuICAgIHdlZWtkYXlzOiBbXCLsnbxcIiwgXCLsm5RcIiwgXCLtmZRcIiwgXCLsiJhcIiwgXCLrqqlcIiwgXCLquIhcIiwgXCLthqBcIiwgXCLsnbxcIl0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24odV9pKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGdyYWRlID0gdV9pLmdyYWRlO1xyXG4gICAgICAgIHZhciBpZCA9IHVfaS5pZDtcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG5cclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0Kz0nPHNlbGVjdCBjbGFzcz1cIndvcmtlcl9zZWxlY3RvclwiPjwvc2VsZWN0Pic7XHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fdG9wXCI+JztcclxuICAgICAgICB0eHQgKz0gICAnPGRpdiBpZD1cImNhbGVuZGFyXCIgY2xhc3M9XCJhdHRlbmRfX2NhbGVuZGFyXCI+PC9kaXY+JztcclxuICAgICAgICB0eHQgKz0gICAnPGRpdiBjbGFzcz1cImF0dGVuZF9fd2Vla1wiPjwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9JzwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoXCI+PC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5hdHRlbmRcIikuaHRtbCh0eHQpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnlcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHRoYXQuc2FsYXJ5ID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgaWYoZ3JhZGUgPT09IDUpe1xyXG4gICAgICAgICAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5sb2FkaW5nVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VycyA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG1haWxJRCBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih1c2Vyc1ttYWlsSURdLmdyYWRlKjE8NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgbWFpbElEICsgJ1wiPicgKyB1c2Vyc1ttYWlsSURdLm5hbWUgKyAnPC9vcHRpb24+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5odG1sKHR4dCkudmFsKGlkKS5wcm9wKFwic2VsZWN0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIubG9hZGluZ1ZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZE9iaiA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCEkKFwiLmZjLWhlYWRlci10b29sYmFyXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld1JlbmRlciA6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFdvcmtIb3VyKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5vbihcImNsaWNrXCIsIFwiLmNvbmZpcm1cIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoISQoXCIuYXR0ZW5kXCIpLmhhc0NsYXNzKCdkaXNwbGF5Tm9uZScpKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJCh0aGlzKS5hdHRyKFwiZGlkXCIpKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5vbihcImNsaWNrXCIsIFwiLmNsb3NlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmICghJChcIi5hdHRlbmRcIikuaGFzQ2xhc3MoJ2Rpc3BsYXlOb25lJykpIHtcclxuICAgICAgICAgICAgICAgICQoXCIuYmxhY2tTY3JlZW5cIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcImJvZHlcIikua2V5dXAoZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGlmICghJChcIi5hdHRlbmRcIikuaGFzQ2xhc3MoJ2Rpc3BsYXlOb25lJykpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiLm1vZGFsIC5jb25maXJtXCIpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2RlID0gZS53aGljaDsgLy8gcmVjb21tZW5kZWQgdG8gdXNlIGUud2hpY2gsIGl0J3Mgbm9ybWFsaXplZCBhY3Jvc3MgYnJvd3NlcnNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJChcIi5tb2RhbCAuY29uZmlybVwiKS5hdHRyKFwiZGlkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5jaGFuZ2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld193b3JrZXIoaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICB2aWV3X3dvcmtlcjogZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYoaWQgPT09IHRoYXQuaWQpe1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fY2FsZW5kYXJcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX3dlZWtcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX21vbnRoXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19jYWxlbmRhclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICBpZih0aGF0LnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGF0LnZpZXdJRCkub2ZmKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK2lkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hdHRlbmRPYmogPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlvID0gdGhhdC52aWV3SUQ7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdJRCA9IGlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHlvLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoYXQuaWQgIT09IHRoYXQudmlld0lEKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0V29ya0hvdXIoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jYWxlbmRhcjogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5hdHRlbmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmZjLWRheVwiKS5odG1sKFwiXCIpO1xyXG5cclxuICAgICAgICBpZihkYXRhLmF0dGVuZCl7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmF0dGVuZDtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF0ZSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZUlEID0gZGF0ZS5zbGljZSgwLDQpK1wiLVwiK2RhdGUuc2xpY2UoNCw2KStcIi1cIitkYXRlLnNsaWNlKDYsOCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gMDtcclxuICAgICAgICAgICAgICAgIGxldCB0eHQgPSAnPHA+JytkYXRhW2RhdGVdWzBdLmZyb20rXCJ+XCIrZGF0YVtkYXRlXVswXS50bysnPC9wPic7XHJcbiAgICAgICAgICAgICAgICAvL+uRkO2DgOyehCDrgpjriKDshJwg6re866y07ZaI7Ja064+EIOuLrOugpeyXkCDtkZzsi5zrkJjripQg6rKD7J2AIOyyq+2DgOyehCDqt7zrrLTsi5zqsITrp4xcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWYgKz0gZGF0YVtkYXRlXVtpXS5kaWY7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHh0Kz0nPHA+JyArIE1hdGguZmxvb3IoZGlmLzYwKSArIFwi7Iuc6rCEIFwiKyBkaWYlNjAgK1wi67aEXCIrJzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgJCgnLmF0dGVuZCAuZmMtZGF5W2RhdGEtZGF0ZT1cIicrZGF0ZUlEKydcIl0nKS5odG1sKHR4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGR1ck1vbiA9IDA7XHJcbiAgICAgICAgICAgIGxldCB0aGlzTW9udGggPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLmF0dGVuZCAuZmMtZGF5XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZURvbSA9ICQoXCIuYXR0ZW5kIC5mYy1kYXlcIikuZXEoaSk7XHJcbiAgICAgICAgICAgICAgICBpZighZGF0ZURvbS5oYXNDbGFzcyhcImZjLW90aGVyLW1vbnRoXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGRhdGVEb20uYXR0cihcImRhdGEtZGF0ZVwiKS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc01vbnRoID0gZGF0ZVswXStkYXRlWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlWzBdK2RhdGVbMV0rZGF0ZVsyXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyTW9uICs9IGRhdGFbZGF0ZV1bal0uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdHh0ID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZigkKFwiLmF0dGVuZCAuZmMtdmlldy1jb250YWluZXJcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7ICAgLy/rrLTsobDqsbQgNuyjvFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3ZWVrRG9tID0gJChcIi5hdHRlbmQgLmZjLXdlZWtcIikuZXEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWtEdXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDc7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF5RG9tID0gd2Vla0RvbS5maW5kKFwiLmZjLWRheVwiKS5lcShqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBkYXlEb20uYXR0cihcImRhdGEtZGF0ZVwiKS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlWzBdK2RhdGVbMV0rZGF0ZVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrRHVyICs9IGRhdGFbZGF0ZV1ba10uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHdlZWtEdXI+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiYXR0ZW5kX193ZWVrX19ob3VyXCI+JysgTWF0aC5mbG9vcih3ZWVrRHVyLzYwKSsn7Iuc6rCEICcrd2Vla0R1ciU2MCsn67aEJyArJzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImF0dGVuZF9fd2Vla19faG91clwiPjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKFwiLmF0dGVuZCAuZmMtbGVmdFwiKS5jaGlsZHJlbihcImgyLmR1ck1vbnRoXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZCBoMi5kdXJNb250aFwiKS5odG1sKCcgKCcrTWF0aC5mbG9vcihkdXJNb24vNjApKyfsi5zqsIQgJytkdXJNb24lNjArJ+u2hCknKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZCAuZmMtbGVmdFwiKS5hcHBlbmQoJzxoMiBjbGFzcz1cImR1ck1vbnRoXCI+ICgnK01hdGguZmxvb3IoZHVyTW9uLzYwKSsn7Iuc6rCEICcrZHVyTW9uJTYwKyfrtoQpPC9oMj4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHh0ID0gJyc7ICAgLy92YXIg67m866i57J2A6rGwIOyVhOuLmC4g7JyE7JeQ7IScIOyEoOyWuCDtlojsnYwhXHJcblxyXG4gICAgICAgICAgICBsZXQgZnVsbE1vbnRoQm9udXMgPSAzMDQwMDtcclxuICAgICAgICAgICAgbGV0IGluc3VyYW5jZUZlZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBiYXNpYyA9IE1hdGgucm91bmQoZHVyTW9uLzYwKjc2MDApO1xyXG4gICAgICAgICAgICBsZXQgZnVsbFdlZWtCdW51cyA9IE1hdGgucm91bmQoKGR1ck1vbi82MCo3NjAwKSowLjIpO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYodGhpcy5pZCA9PT0gdGhpcy52aWV3SUQpe1xyXG4gICAgICAgICAgICAvLyAgICAgLy/rs7jsnbgg66qo65OcXHJcbiAgICAgICAgICAgIC8vICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImFjY291bnQvc2FsYXJ5L1wiK3RoaXNNb250aCtcIi9cIit0aGlzLmlkKS51cGRhdGUoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJhc2ljOiBiYXNpYyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsV2Vla0J1bnVzOiBmdWxsV2Vla0J1bnVzLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxNb250aEJvbnVzOiBmdWxsTW9udGhCb251c1xyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhY2NvdW50L3NhbGFyeS9cIit0aGlzTW9udGgrXCIvXCIrdGhpcy52aWV3SUQpLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYmFzaWM6IGJhc2ljLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxXZWVrQnVudXM6IGZ1bGxXZWVrQnVudXMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbE1vbnRoQm9udXM6IGZ1bGxNb250aEJvbnVzXHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+6riw67O46riJPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShiYXNpYykrIFwi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7qt7zrrLTsi5zqsIQgWCA3LDYwMOybkDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7KO87Zy07IiY64u5PC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShmdWxsV2Vla0J1bnVzKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq4sOuzuOq4ieydmCAyMCU8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuyXsOywqOyImOuLuTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoZnVsbE1vbnRoQm9udXMpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+NeyLnOqwhCDsg4Hri7kg6riw67O46riJPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZSBhdHRlbmRfX21vbnRoX19saW5lLS1yZWRcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7IKs7ZqM67O07ZeY66OMPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShpbnN1cmFuY2VGZWUpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6rWt66+87Jew6riIL+qzoOyaqeuztO2XmC/qsbTqsJXrs7Ttl5gg7LKt6rWs7JWhPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZSBhdHRlbmRfX21vbnRoX19saW5lLS1zdW1cIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7ZWp6rOEPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShiYXNpYyArIGZ1bGxXZWVrQnVudXMgKyBmdWxsTW9udGhCb251cyAtIGluc3VyYW5jZUZlZSkgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7quLDrs7jquIkgKyDso7ztnLTsiJjri7kgKyDsl7DssKjsiJjri7kgLSDsgqztmozrs7Ttl5jro4w8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19tb250aFwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dFdvcmtIb3VyOiBmdW5jdGlvbihkYXRlT2JqKXtcclxuICAgICAgICAvLyBjc3M6IG1vZHVsZXMvYXR0ZW5kLmNzc1xyXG4gICAgICAgIGxldCBkYXRlU2hvcnQgPSBtb21lbnQoZGF0ZU9iaikuZm9ybWF0KFwiTU0vRERcIik7XHJcbiAgICAgICAgbGV0IGRhdGVJRCA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoXCJZWVlZTU1ERFwiKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgICBpZih0aGlzLmF0dGVuZE9iai5hdHRlbmRbZGF0ZUlEXSl7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmF0dGVuZE9iai5hdHRlbmRbZGF0ZUlEXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImJsYWNrU2NyZWVuXCI+JztcclxuICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwiaW5wdXRXaW5kb3dcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8cCBjbGFzcz1cInRpdGxlXCI+JytkYXRlU2hvcnQrJyDqt7zrrLTsi5zqsIQ8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj4nO1xyXG4gICAgICAgIGlmKGRhdGFbMF0pe1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwiZmlyc3RfZnJvbVwiIHZhbHVlPVwiJytkYXRhWzBdLmZyb20rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJmaXJzdF90b1wiIHZhbHVlPVwiJytkYXRhWzBdLnRvKydcIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cImZpcnN0X2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwiZmlyc3RfdG9cIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxkaXYgY2xhc3M9XCJsaW5lIGNsZWFyZml4XCI+JztcclxuICAgICAgICBpZihkYXRhWzFdKXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCIgdmFsdWU9XCInK2RhdGFbMV0uZnJvbSsnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiIHZhbHVlPVwiJytkYXRhWzFdLnRvKydcIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImJvdHRvbVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAgICc8cCBjbGFzcz1cImNvbmZpcm1cIiBkaWQ9XCInK2RhdGVJRCsnXCI+7ZmV7J24PC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAgICc8cCBjbGFzcz1cImNsb3NlXCI+7Leo7IaMPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0Kz0gICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tb2JpbGUpe1xyXG4gICAgICAgICAgICAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLkFueVBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICBkYXRlVGltZUZvcm1hdDpcIkhIOm1tXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiI2ZpcnN0X2Zyb21cIikuZm9jdXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0V29ya0hvdXI6IGZ1bmN0aW9uKGRhdGUpe1xyXG5cclxuICAgICAgICBsZXQgd29yayA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgYWxsRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZigkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLmVxKGkpLnZhbCgpLmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgIGFsbEVtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGFsbEVtcHR5KXtcclxuICAgICAgICAgICAgaWYodGhpcy52aWV3SUQubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy52aWV3SUQrXCIvYXR0ZW5kL1wiK2RhdGUpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQrXCIvYXR0ZW5kL1wiK2RhdGUpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgIGxldCBkYXRlSUQgPSBkYXRlLnNsaWNlKDAsNCkgKyBcIi1cIitkYXRlLnNsaWNlKDQsNikgKyBcIi1cIitkYXRlLnNsaWNlKDYsOCk7XHJcbiAgICAgICAgICAgICQoJy5mYy1kYXlbZGF0YS1kYXRlPVwiJytkYXRlSUQrJ1wiXScpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZigkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuICAgICAgICAgICAgLy/si5zsnpHsi5zqsITsnbQg7J6YIOyeheugpeuQmOyXiOuCmCDtmZXsnbhcclxuXHJcbiAgICAgICAgICAgIGlmKGRhdGU8bW9tZW50KCkuZm9ybWF0KFwiWVlZWU1NRERcIikpe1xyXG4gICAgICAgICAgICAgICAgLy/smKTripgg7J207KCEIOydvOydmCDrgqDsp5zrpbwg64uk66Oo6rOgIOyeiOydhCDqsr3smrAgLSDqt7zrrLQg7KKF66OM7Iuc6rCE7J20IOyeheugpeuQmOyngCDslYrsnLzrqbQg7JWIIOuQqFxyXG4gICAgICAgICAgICAgICAgaWYoJChcIiNmaXJzdF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL+ydtOyghOydvOydtCDslYTri4jrjZTrnbzrj4Qg7JiI7IOBIOq3vOustOyLnOqwhOydtOudvOuPhCDsnoXroKXtlbTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi7JiI7IOBIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmcm9tID0gJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICBsZXQgdG8gPSAkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZyb21BID0gZnJvbS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgIGxldCB0b0EgPSB0by5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgIGxldCBkaWYgPSAodG9BWzBdKjEgLSBmcm9tQVswXSoxKSo2MCArICh0b0FbMV0qMSAtIGZyb21BWzFdKjEpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgdG86IHRvLFxyXG4gICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhbGVydChcIuq3vOustOyLnOqwhOydtCDsnpjrqrsg7J6F66Cl65CY7JeI7Iq164uI64ukLiBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZigkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRlPG1vbWVudCgpLmZvcm1hdChcIllZWVlNTUREXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI3NlY29uZF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOyYiOyDgSDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmcm9tID0gJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGxldCB0byA9ICQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmcm9tQSA9IGZyb20uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAodG9BWzBdKjEgLSBmcm9tQVswXSoxKSo2MCArICh0b0FbMV0qMSAtIGZyb21BWzFdKjEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgICAgICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg6re866y07Iuc6rCE7J20IOyemOuquyDsnoXroKXrkJjsl4jsirXri4jri6QuIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy52aWV3SUQubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLnZpZXdJRCtcIi9hdHRlbmQvXCIrZGF0ZSkuc2V0KHdvcmspO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkK1wiL2F0dGVuZC9cIitkYXRlKS5zZXQod29yayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwoXCJcIik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdHRlbmQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2F0dGVuZC5qcyIsImxldCBDaXR5ID0ge1xyXG4gICAgZGF0YToge30sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLmNpdHlcIikub24oXCJjbGlja1wiLCBcIi5yZWZyZXNoXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKFwi642w7J207YSw66W8IOunjuydtCDsnqHslYTrqLnsirXri4jri6QhIOygleunkCDstZzsi6DtmZTtlZjsi5zqsqDsirXri4jquYw/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2hTdGF0dXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8aDI+64+E7IucIOuNsOydtO2EsCDtmZXrs7TtmITtmak8L2gyPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJyZWZyZXNoXCI+7LWc7Iug7ZmUPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwid3JhcHBlclwiPic7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwibGluZSB0b3BcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwibmFtZVwiPuuPhOyLnOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzXCI+7IiZ7IaMPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X19zcG90c1wiPuq0gOq0keyngCDsoJXrpqw8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydFwiPuq1kO2GtTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fYXJlYVwiPuyngOyXrTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fcHJpY2VcIj7rrLzqsIA8L3A+JztcclxuICAgICAgICB0eHQrPSAnPC9kaXY+JztcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKHZhciBjb2RlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NvZGVdO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gY2l0eS5zdGF0dXM7XHJcblxyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJsaW5lXCIgaWQ9XCInICsgY2l0eS5jb2RlICsgJ1wiPjxwIGNsYXNzPVwibmFtZVwiPicgKyBjaXR5Lm5hbWUgKyAnPC9wPic7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLmhvdGVsID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzIHdlaWdodC0tYm9sZFwiPu2PieqwgCDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuaG90ZWwgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19ob3RlbHNcIj7rjbDsnbTthLAg7J6I7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzIGNvbG9yLS1yZWRcIj7rjbDsnbTthLAg7JeG7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMuc3BvdCA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzIHdlaWdodC0tYm9sZFwiPuygleuztOqygOymnSDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+MuywqOqygOymnTwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5zcG90ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHNcIj7tlansuZjquLA8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+7KCV67O0IOqygOymneykkTwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzIGNvbG9yLS1yZWRcIj7soJXrs7Qg7JeG7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0IHdlaWdodC0tYm9sZFwiPuuMgOykkeq1kO2GtSDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0XCI+642w7J207YSwIOyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydCBjb2xvci0tcmVkXCI+642w7J207YSwIOyXhuydjDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLmFyZWEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19hcmVhXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2FyZWEgY29sb3ItLXJlZFwiPlg8L3A+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5wcmljZSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3ByaWNlXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3ByaWNlIGNvbG9yLS1yZWRcIj5YPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nOyAvL2Nsb3NlIHdyYXBwZXJcclxuXHJcbiAgICAgICAgJChcIi5jaXR5XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignc2V0dGluZy9jaXRpZXMnKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGUoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZnJlc2hTdGF0dXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzJykub25jZShcInZhbHVlXCIsIHNuYXA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBjaWQgaW4gdGhhdC5kYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNpdHkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWw6IDAsIC8vMDrrjbDsnbTthLDsl4bsnYwsIDE67IiZ7IaM642w7J207YSw66eMIOyeiOydjCwgMjrtj4nqsIDrjbDsnbTthLAo7JuM65SpKSDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BvdDogdGhhdC5kYXRhW2NpZF0uc3RhdHVzLnNwb3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogMCwgLy/rjbDsnbTthLDsl4bsnYwsIDE666mU7Yq466Gc642w7J207YSw66eMIOyeiOydjCwgMjrqsIDqs7XrjbDsnbTthLAo65287J2467OELi7rk7EpIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogMFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaXR5LmFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmFyZWEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5ob3RlbHMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaG90ZWwgPSBjaXR5LmhvdGVsc1tPYmplY3Qua2V5cyhjaXR5LmhvdGVscylbMF1dO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuaG90ZWwgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5ob3RlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmFyZWEgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihob3RlbC5hcmVhID09PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5hcmVhID0gMjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaXR5LnN0YXR1cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5zdGF0dXMuYXJlYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5LnN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaXR5LnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuc3RhdHVzLmFyZWEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5zdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cycpLnVwZGF0ZShjaXR5LnN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihjaXR5Lm1ldHJvKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5tZXRyb0xpbmUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnRyYW5zcG9ydCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnRyYW5zcG9ydCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNpdHkucHJpY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMucHJpY2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWw6IDAsIC8vMDrrjbDsnbTthLDsl4bsnYwsIDE67IiZ7IaM642w7J207YSw66eMIOyeiOydjCwgMjrtj4nqsIDrjbDsnbTthLAo7JuM65SpKSDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BvdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OiAwLCAvL+uNsOydtO2EsOyXhuydjCwgMTrrqZTtirjroZzrjbDsnbTthLDrp4wg7J6I7J2MLCAyOuqwgOqzteuNsOydtO2EsCjrnbzsnbjrs4QuLuuTsSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFbY2lkXS5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzJykuc2V0KHRoYXQuZGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGUodGhhdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfstZzsi6DtmZQg7JmE66OMJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2l0eTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvY2l0eS5qcyIsImltcG9ydCBGaXJzdF9jaGVjayBmcm9tIFwiLi9zcG90L2ZpcnN0X2NoZWNrLmpzXCI7XHJcbmltcG9ydCBTZWNvbmRfY29tYmluZSBmcm9tIFwiLi9zcG90L3Nlb25kX2NvbWJpbmUuanNcIlxyXG5cclxudmFyIFNwb3QgPSB7XHJcbiAgICBjaXRpZXM6IHt9LFxyXG4gICAgb3JkZXI6XCJcIixcclxuICAgIGRhdGE6IHt9LFxyXG4gICAgY3VycmVudDpcIlwiLCAvL+2YhOyerCDrs7Tqs6DsnojripQg64+E7IucIGNpZCAtIGZpcmViYXNlIHJlZuyXkCBvZmYg64us6riw7JyE7ZW0XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKHVfaSl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIEZpcnN0X2NoZWNrLmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcmRlciA9IHVfaS5zZXR0aW5nLm9yZGVyO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignc2V0dGluZy9jaXRpZXMnKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKClcclxuICAgICAgICAgICAgdGhhdC5jaXRpZXMgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGF0Lm9yZGVyID0gdV9pLnNldHRpbmcub3JkZXI7XHJcbiAgICAgICAgICAgIHRoYXQuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9zdGF0dXMoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5hY3RpdmVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY2lkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gdGhhdC5jaXRpZXNbY2lkXS5zdGF0dXMuc3BvdDtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jaXR5KGNpZCwgc3RhdHVzKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLm9yZGVyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5vcmRlciA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG4gICAgICAgICAgICB2YXIgdWlkID0gdV9pLm1haWw7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCd1c2Vycy8nICsgdWlkICsgXCIvc2V0dGluZy9vcmRlclwiKS5zZXQodGhhdC5vcmRlcik7XHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9zdGF0dXMoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5yZXR1cm5cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfc3RhdHVzKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9zdGF0dXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XHJcblxyXG4gICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJoZWFkZXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPGgyPuq0gOq0keyngCDrjbDsnbTthLAg7KCV66asIO2YhO2ZqTwvaDI+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwib3JkZXJcIiBpZD1cImFiY1wiPuqwgOuCmOuLpOyInDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJvcmRlclwiIGlkPVwiY2hhbmdlZFwiPuyImOygleyLnOqwhOyInDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJsaW5lciBsaW5lci0taGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NpdHlOYW1lXCI+64+E7Iuc66qFPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj7sg4Htg5w8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NoYXJnZVwiPuuLtOuLueyekDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgdmFyIG9yZGVyQXJyYXkgPSBbXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgY2lkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcmRlciA9PT0gXCJhYmNcIikge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJBcnJheS5wdXNoKHsgY2lkOiBjaWQsIGlkeDogY2l0eS5uYW1lIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gXCJjaGFuZ2VkXCIpIHtcclxuICAgICAgICAgICAgICAgIG9yZGVyQXJyYXkucHVzaCh7IGNpZDogY2lkLCBpZHg6IGNpdHkub3JkZXIuY2hhbmdlZCB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcmRlckFycmF5LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuaWR4ID4gYi5pZHggPyAxIDogYS5pZHggPCBiLmlkeCA/IC0xIDogMFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHZhciBzdGF0dXNBcnJheSA9IFtcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3Bhbj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuPuyZhOujjDwvc3Bhbj48L3A+JyxcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3Bhbj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+7JmE66OMPC9zcGFuPjwvcD4nXHJcbiAgICAgICAgXVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9yZGVyQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNpZCA9IG9yZGVyQXJyYXlbaV0uY2lkO1xyXG4gICAgICAgICAgICB2YXIgY2l0eSA9IGRhdGFbY2lkXTtcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImxpbmVyXCIgaWQ9XCInICsgY2lkICsgJ1wiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJsaW5lcl9fY2l0eU5hbWVcIj4nICsgY2l0eS5uYW1lICsgJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gc3RhdHVzQXJyYXlbY2l0eS5zdGF0dXMuc3BvdF07XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJsaW5lcl9fY2hhcmdlXCI+64u064u57J6QPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nOy8vd3JhcHBlciDri6vquLBcclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5zcG90XCIpLmh0bWwodHh0KTtcclxuICAgICAgICAkKFwiI1wiICsgdGhpcy5vcmRlcikuYWRkQ2xhc3MoXCJvcmRlci0tc2VsZWN0ZWRcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfY2l0eTogZnVuY3Rpb24gKGNpZCwgc3RhdHVzKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIHRoYXQuY3VycmVudCkub2ZmKFwidmFsdWVcIik7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCkub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50ID0gY2lkO1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNpdHlOYW1lID0gdGhhdC5jaXRpZXNbY2lkXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gMSkgeyAgIC8v7ZiE7J6sIOygleuztOyImOynkeyDge2DnCDqsoDspp1cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmhlYWRlclwiKS5odG1sKCc8aDI+JyArIGNpdHlOYW1lICsgJyDsoJXrs7TqsoDspp08L2gyPicpLmF0dHIoJ2NpZCcsIGNpZCkuYXR0cignY2l0eU5hbWUnLGNpdHlOYW1lKS5hZGRDbGFzcyhcImNpdHlOYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEZpcnN0X2NoZWNrLmluZmxhdGUoZGF0YS5zcG90cyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gMikgeyAvL+2Vqey5mOq4sOyekeyXhVxyXG4gICAgICAgICAgICAgICAgICAgIFNlY29uZF9jb21iaW5lLmluaXQoKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgIC8vMuywqOqygOymne2ZlOuptOqzvCDsmYTro4ztmZTrqbTsnYAg65Sw66GcIOywqOydtOqwgCDsl4bsnYxcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoJ+yVhOustOufsCDrjbDsnbTthLDqsIAg7JeG7Iq164uI64ukLiDrjbDsnbTthLAg7IiY7KeR7J2EIOuovOyggCDsp4TtlontlbTso7zshLjsmpQuJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCIubmF2X19pdGVtXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnbmF2X19pdGVtLS1oYXNEcmF3ZXInKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgdGhhdC5jdXJyZW50KS5vZmYoXCJ2YWx1ZVwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLm5hdl9fZHJhd2VyX19pdGVtIFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmF0dHIoJ2lkJykgPT09ICduYXZfc3BvdCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyB0aGF0LmN1cnJlbnQpLm9mZihcInZhbHVlXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwb3Q7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC5qcyIsImltcG9ydCBBdXRvQ29tYmluZSBmcm9tICcuL2F1dG9Db21iaW5lLmpzJztcclxuXHJcbnZhciBGaXJzdF9DaGVjayA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fcmVtYWluTGFyZ2VEYXRhXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5zZXRSZW1haW5OdW1iZXIoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIiksICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIuY2hlY2tfX3JlbWFpbk51bWJlclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX25vZGF0YVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWQgPSAkKHRoaXMpLmF0dHIoJ3NpZCcpO1xyXG4gICAgICAgICAgICB0aGF0LnNpdGVOb2RhdGEoc2lkKTtcclxuICAgICAgICAgICAgdG9hc3QoJ+uNsOydtO2EsCDqs7XrsLEg7LKY66asJylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvL+yijO2RnCDsl4bripQg6rSA6rSR7KeA7J2YIOyijO2RnOulvCDsnoXroKXtlahcclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fc3BvdERlbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsZXRlU3BvdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fc3BvdE5hbWVcIikuaHRtbCgpKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvL+yijO2RnCDsl4bripQg6rSA6rSR7KeA7J2YIOyijO2RnOulvCDsnoXroKXtlahcclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fY29uZmlybVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd5b2xvJylcclxuICAgICAgICAgICAgdGhhdC5pbnB1dENvb3JkaW5hdGUoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIiksICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIuY2hlY2tfX3Nwb3RDb29yXCIpLnZhbCgpKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBzaXRlTm9kYXRhOiBmdW5jdGlvbiAoc2lkKSB7XHJcbiAgICAgICAgdmFyIGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcblxyXG4gICAgICAgIGlmIChjb25maXJtKFwi642w7J207YSw66W8IOygleunkCDsl4bslbHri4jquYwhP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2lkICsgXCIvbm9kYXRhXCIpLnNldCh0cnVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgc2V0UmVtYWluTnVtYmVyOiBmdW5jdGlvbiAoc2l0ZSwgbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IGN1dE5vID0gbnVtYmVyLnRyaW0oKSAqIDE7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKVxyXG5cclxuICAgICAgICBpZiAoY3V0Tm8gPCAxMDApIHtcclxuICAgICAgICAgICAgdG9hc3QoXCIxMDDqsJwg7J207IOB7J2YIOyepeyGjOulvCDsnKDsp4DtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpcm0oXCLsiJzsnIQgXCIgKyBjdXRObyArIFwi7JyEIOuvuOunjCDsnqXshozrpbwg66qo65GQIOygnOqxsO2VqeuLiOuLpC4g66ee7Iq164uI6rmMP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1dE9iaiA9IHRoaXMuZGF0YS5zcG90c1tzaXRlXTtcclxuICAgICAgICAgICAgICAgIGN1dE9iai5sZW5ndGggPSBjdXRObztcclxuXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUpLnNldChjdXRPYmopO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVTcG90OiBmdW5jdGlvbiAoc2lkLCBuYW1lKSB7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGUgPSBzaWQuc3BsaXQoXCJfXCIpWzBdO1xyXG4gICAgICAgIGxldCBubyA9IHNpZC5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKG5hbWUgKyBcIiDsnqXshozrpbwg7KCc6rGw7ZWp64uI64ukLiDqs4Tsho3tlaDquYzsmpQ/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUgKyBcIi9cIiArIG5vKS5zZXQoeyBkZWxldGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgJChcIiNcIiArIHNpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyepeyGjOqwgCDsoJzqsbDrkJjsl4jsirXri4jri6QuXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYgKGNvbmZpcm0obm8gKyBcIuuyiCDsnqXshozrpbwg7KCc6rGw7ZWp64uI64ukLiDqs4Tsho3tlaDquYzsmpQ/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUgKyBcIi9cIiArIG5vKS5zZXQoeyBkZWxldGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgJChcIiNcIiArIHNpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyepeyGjOqwgCDsoJzqsbDrkJjsl4jsirXri4jri6QuXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0Q29vcmRpbmF0ZTogZnVuY3Rpb24gKHNpZCwgY29vclR4dCkge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlID0gc2lkLnNwbGl0KFwiX1wiKVswXTtcclxuICAgICAgICBsZXQgbm8gPSBzaWQuc3BsaXQoXCJfXCIpWzFdO1xyXG4gICAgICAgIGxldCBjb29yID0ge307XHJcblxyXG4gICAgICAgIGlmIChjb29yVHh0LnNwbGl0KFwiLFwiKS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgbGV0IGxhdCA9IGNvb3JUeHQuc3BsaXQoXCIsXCIpWzBdLnRyaW0oKSAqIDE7XHJcbiAgICAgICAgICAgIGxldCBsbmcgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVsxXS50cmltKCkgKiAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzTmFOKGxhdCkgfHwgaXNOYU4obG5nKSkge1xyXG4gICAgICAgICAgICAgICAgLy/sooztkZwg7KSRIO2VmOuCmOqwgFxyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg67aA7KCV7ZmV7ZWY6rKMIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29vciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6IGxhdCxcclxuICAgICAgICAgICAgICAgICAgICBsbmc6IGxuZ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg7J6F66Cl65CY7JeI7Iq164uI64ukXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNcIiArIHNpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUgKyBcIi9cIiArIG5vICsgXCIvY29vclwiKS5zZXQoY29vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0b2FzdChcIuyijO2RnOqwgCDrtoDsoJXtmZXtlZjqsowg7J6F66Cl65CY7JeI7Iq164uI64ukXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAkKFwiLmhlYWRlclwiKS5hcHBlbmQoJzxwIGNsYXNzPVwicmV0dXJuXCI+64+M7JWE6rCA6riwPC9wPicpXHJcblxyXG4gICAgICAgIGxldCBoYXNQcm9ibGVtID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgbGV0IHNlYXJjaFVybCA9ICdodHRwczovL3d3dy5nb29nbGUuY28ua3IvbWFwcy9wbGFjZS8nICsgJChcIi5jaXR5TmFtZVwiKS5hdHRyKCdjaXR5TmFtZScpICsgXCIrXCI7XHJcblxyXG4gICAgICAgIGxldCBzaXRlT2JqID0ge1xyXG4gICAgICAgICAgICBnZzogXCLqtazquIBcIixcclxuICAgICAgICAgICAgbnY6IFwi64Sk7J2067KEXCIsXHJcbiAgICAgICAgICAgIHRhOiBcIu2KuOumveyWtOuTnOuwlOydtOyggFwiLFxyXG4gICAgICAgICAgICBscDogXCLroaDrpqztlIzrnpjri5tcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG5cclxuICAgICAgICBmb3IgKHZhciBzaXRlIGluIHNpdGVPYmopIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzaXRlSGFzUHJvYmxlbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub0Nvb3JUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7sooztkZzqsIAg7J6F66Cl65CY7KeAIOyViuydgCDqtIDqtJHsp4DqsIAg7J6I7Iq164uI64ukPC9wPic7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vU3BvdFR4dCA9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZVwiPuu5hOyWtOyeiOuKlCDqtIDqtJHsp4DqsIAg7J6I7Iq164uI64ukPC9wPic7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YVtzaXRlXSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX190aXRsZVwiPicgKyBzaXRlT2JqW3NpdGVdICsgJyDrjbDsnbTthLAg7ZmV7J24PC9wPidcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YVtzaXRlXS5ub2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbc2l0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBkYXRhW3NpdGVdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc0Nvb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QuZGVsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v7J2867aA65+sIOyCreygnO2VnCDqtIDqtJHsp4AgLT4g64SY7Ja06rCE64ukXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmNvb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QuY29vci5sbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc05hTihzcG90LmNvb3IubG5nICogMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmNvb3IubGF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oc3BvdC5jb29yLmxhdCAqIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNDb29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdfJyArIGkgKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxhIGNsYXNzPVwiY2hlY2tfX3Nwb3ROYW1lXCIgaHJlZj1cIicgKyBzZWFyY2hVcmwgKyBzcG90Lm5hbWUgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIHNwb3QubmFtZSArICc8L2E+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxpbnB1dCBjbGFzcz1cImNoZWNrX19zcG90Q29vclwiIHBsYWNlaG9sZGVyPVwieHgueHh4eHgsIHh4Lnh4eHh4IO2Yle2DnCDsnoXroKVcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fY29uZmlybVwiPuyijO2RnCDsnoXroKU8L3A+PHAgY2xhc3M9XCJjaGVja19fc3BvdERlbGV0ZVwiPuyepeyGjCDsgq3soJw8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90VHh0ICs9ICc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicgKyBzaXRlICsgJ18nICsgaSArICdcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3R4dFwiPicgKyBpICsgJyDrsogg6rSA6rSR7KeAPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3BvdERlbGV0ZVwiPuyepeyGjCDsgq3soJw8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90VHh0ICs9ICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub0Nvb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vQ29vclR4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vU3BvdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gbm9TcG90VHh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0ubGVuZ3RoID4gMTUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXJnZU9LID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGFyZ2VEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sYXJnZURhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzE1MOqwnCDsnbTsg4HsnZgg642w7J207YSw66W8IOuztOycoO2VmOugpOuptCDrj4Tsi5zrqoUvc3BvdHMvbGFyZ2VEYXRhL+yCrOydtO2KuOuqheydtCB0cnVl65286rOgIOu2gOyXrOuQmOyWtOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFyZ2VPSyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFyZ2VPSyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxhcmdlT0spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZUhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZVwiPicgKyBzaXRlT2JqW3NpdGVdICsgJyDsnqXshowg642w7J207YSw6rCAIDE1MOqwnOulvCDstIjqs7woJyArIGRhdGFbc2l0ZV0ubGVuZ3RoICsgJ+qwnCntlanri4jri6QuPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxpbnB1dCBjbGFzcz1cImNoZWNrX19yZW1haW5OdW1iZXJcIiB2YWx1ZT1cIicgKyBkYXRhW3NpdGVdLmxlbmd0aCArICdcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiPuqwnOydmCDsnqXshowg7Jyg7KeA7ZWY6riwPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX190aXRsZVwiPicgKyBzaXRlT2JqW3NpdGVdICsgJyDrjbDsnbTthLDqsIAg7KG07J6s7ZWY7KeAIOyViuyKteuLiOuLpC48L3A+J1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZSBjaGVja19fbm9kYXRhXCIgc2lkPVwiJyArIHNpdGUgKyAnXCI+642w7J207YSw6rCAIOybkOuemCDsl4bsnYQg6rK97JqwIO2BtOumre2VtOyjvOyEuOyapTwvcD4nXHJcbiAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiDsm5Drnpgg7IKs7J207Yq4IOuNsOydtO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK64qUIOqyveyasOulvCDrjIDruYTtlZwg67KE7Yq87J2EIOunjOuTpOqzoCBzaXRlIOqwkuycvOuhnCBub2RhdGE6IHRydWXrpbwg64Sj7Ja07KSA64ukLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc2l0ZUhhc1Byb2JsZW0pIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7rsJzqsqzrkJwg66y47KCc6rCAIOyXhuyKteuLiOuLpDwvcD4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoYXNQcm9ibGVtKSB7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fZmluaXNoXCI+6rKA7IKs66W8IOuqqOuRkCDrp4jss6TsirXri4jri6Q8L3A+J1xyXG4gICAgICAgICAgICAkKFwiLnNwb3QgLndyYXBwZXJcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoJ2NpZCcpO1xyXG4gICAgICAgICAgICB0b2FzdChcIuuwnOqyrOuQnCDrrLjsoJzqsIAg7JeG7Ja0IOuNsOydtO2EsCDrs5HtlansnYQg7Iuk7Iuc7ZWp64uI64ukLlwiKTtcclxuXHJcbiAgICAgICAgICAgIEF1dG9Db21iaW5lLmluaXQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLndyYXBcIikuc2Nyb2xsVG9wKDApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpcnN0X0NoZWNrO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvZmlyc3RfY2hlY2suanMiLCIvL2ZpcnN0X2NoZWNr7JeQ7ISc66eMIGltcG9ydGVkIOuQmOqzoCDsgqzsmqnrkKhcclxuXHJcbnZhciBBdXRvQ29tYmluZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgIGxldCBjaWQgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGVBcnIgPSBbXCJnZ1wiLCBcImxwXCIsIFwibnZcIiwgXCJ0YVwiXTtcclxuICAgICAgICBsZXQgY29tYmluaW5nID0ge307XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpdGVBcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpdGUgPSBzaXRlQXJyW2pdO1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtzaXRlXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0ubm9EYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdW2ldICYmICFkYXRhW3NpdGVdW2ldLmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGRTcG90ID0gZGF0YVtzaXRlXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6riw7KG0IOygleuztOulvCBvbGRTcG907J2065286rOgIO2VmOyekC4g7IOI66Gc7Jq0IOyKpO2Mn+ygleuztOyXkOuKlCDsnbTrpoTsnYQg7ZWcL+yYgeycvOuhnCDrtoTtlaDtlZjqs6Ag656t7YK57J2EIOu2gOyXrO2VoCDqsoPsnbTri6QuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrbzogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW46IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IG9sZFNwb3QuY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5rOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9b6rCALe2eo10vLnRlc3Qob2xkU3BvdC5uYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5rbyA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC5uYW1lLmVuID0gb2xkU3BvdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC5yYW5rW3NpdGVdID0gaTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkU3BvdC51cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90LnVybCA9IG9sZFNwb3QudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFNwb3QudGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC50YWcgPSBvbGRTcG90LnRhZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlciA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczAwXCIgKyBjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ZXIgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzMFwiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzXCIgKyBjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyKytcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gLy/tlZzrsJTtgLQg64+M7JWY64u5XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IGNvbWJpbmVPYmogPSB7fVxyXG4gICAgICAgIGxldCBjb21iaW5lZCA9IHt9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNvZGUgaW4gY29tYmluaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBzcG90ID0gY29tYmluaW5nW2NvZGVdO1xyXG4gICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdID0gc3BvdFxyXG4gICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmUgPSB7fTtcclxuICAgICAgICAgICAgbGV0IGhhc0NvbWJpbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8v7ZWp7LmgIOqyg+ydtCDsl4bsnLzrqbQg67CU66GcIGNvbWJpbmVkIOyqveycvOuhnCDrs7Trgrjri6QuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB0Q29kZSBpbiBjb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlIDwgdENvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdFNwb3QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29tYmluaW5nW3RDb2RlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0U3BvdFtrZXldID0gY29tYmluaW5nW3RDb2RlXVtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdFNwb3QuZGVsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gY2FsY3VsYXRlRGlmKHNwb3QuY29vciwgdFNwb3QuY29vcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWYgPCAyNTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0uY29tYmluZVt0Q29kZV0gPSB0U3BvdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NvbWJpbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFoYXNDb21iaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29tYmluZWRbY29kZV0gPSBjb21iaW5lT2JqW2NvZGVdO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvbWJpbmVPYmpbY29kZV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpZCArIFwiL3Nwb3RzXCIpLnNldCh7XHJcbiAgICAgICAgICAgIGNvbWJpbmluZzogY29tYmluZU9iaixcclxuICAgICAgICAgICAgY29tYmluZWQ6IGNvbWJpbmVkXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cy9zcG90Jykuc2V0KDEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdXRvQ29tYmluZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2F1dG9Db21iaW5lLmpzIiwidmFyIFNlY29uZF9jb21iaW5lID0ge1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2Vjb25kX2NvbWJpbmU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9zZW9uZF9jb21iaW5lLmpzIiwibGV0IEFjY291bnQgPSB7XHJcbiAgICB1c2VyOiB7fSxcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGlkPVwiYWNjb3VudENhbGVuZGFyXCIgY2xhc3M9XCJhY2NvdW50X19jYWxlbmRhclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLmFjY291bnRcIikuaHRtbCh0eHQpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHVpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodWlkICE9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlclt1aWRdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBkYXRhW3VpZF0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJCgnI2FjY291bnRDYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2NCxcclxuICAgICAgICAgICAgICAgIGZpcnN0RGF5OiAxLFxyXG4gICAgICAgICAgICAgICAgdmlld1JlbmRlcjogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGUoKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRheUNsaWNrOiBmdW5jdGlvbiAoZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbmZsYXRlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjY291bnQ7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvYWNjb3VudC5qcyIsImxldCBTdWJ3YXkgPSB7XHJcbiAgICBtYXA6e30sXHJcbiAgICBtYXJrZXI6ZmFsc2UsXHJcbiAgICBtZXRybzpbXSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlsb1wiKVxyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9ueWMvbWV0cm9cIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICB0aGF0Lm1ldHJvID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3Vid2F5TWFwJyksIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcjogeyBsYXQ6IDQwLjc0ODQ0LCBsbmc6IC03My45ODU2NiB9LFxyXG4gICAgICAgICAgICAgICAgem9vbTogMTMsXHJcbiAgICAgICAgICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzY2FsZUNvbnRyb2w6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1hcC5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZFN1YndheShlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBmaW5kU3Vid2F5OiBmdW5jdGlvbihlKXtcclxuICAgICAgICBsZXQgY29vciA9IHtcclxuICAgICAgICAgICAgbGF0OmUubGF0TG5nLmxhdCgpLFxyXG4gICAgICAgICAgICBsbmc6ZS5sYXRMbmcubG5nKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMubWFya2VyKXtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXIuc2V0TWFwKG51bGwpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogZS5sYXRMbmcsXHJcbiAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgbGV0IG1ldHJvSW5mbyA9IHt9XHJcbiAgICAgICAgbGV0IG1ldHJvQnlTdG4gPSB7fTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0NzM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbWV0cm9OYW1lID0gdGhpcy5tZXRyb1tpXS5uYW1lO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRpZiA9IE1hdGgucm91bmQoY2FsY3VsYXRlRGlmKGNvb3IsdGhpcy5tZXRyb1tpXS5jb29yKSk7XHJcblxyXG4gICAgICAgICAgICBpZihkaWY8NzAwKXtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5tZXRyb1tpXS5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmUgPSB0aGlzLm1ldHJvW2ldLmxpbmVba10uc2xpY2UoMCwxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWV0cm9JbmZvW2xpbmVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGlmPG1ldHJvSW5mb1tsaW5lXS5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0cm9JbmZvW2xpbmVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZjogZGlmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldHJvTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvSW5mb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZjogZGlmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbWV0cm9OYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobWV0cm9CeVN0blttZXRyb05hbWVdKXtcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb0J5U3RuW21ldHJvTmFtZV0ubGluZSA9IG1ldHJvQnlTdG5bbWV0cm9OYW1lXS5saW5lLmNvbmNhdCh0aGlzLm1ldHJvW2ldLmxpbmUpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb0J5U3RuW21ldHJvTmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZjogZGlmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLm1ldHJvW2ldLmxpbmVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtZXRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGxpbmUgaW4gbWV0cm9JbmZvKSB7XHJcbiAgICAgICAgICAgIG1ldEFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbGluZTpsaW5lLFxyXG4gICAgICAgICAgICAgICAgbmFtZTptZXRyb0luZm9bbGluZV0ubmFtZSxcclxuICAgICAgICAgICAgICAgIGRpZjptZXRyb0luZm9bbGluZV0uZGlmXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1ldFN0bkFycmF5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBtZXRyb0J5U3RuKSB7XHJcbiAgICAgICAgICAgIG1ldFN0bkFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbGluZTptZXRyb0J5U3RuW25hbWVdLmxpbmUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkaWY6bWV0cm9CeVN0bltuYW1lXS5kaWZcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXRBcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5kaWYgPiBiLmRpZiA/IDEgOiBhLmRpZiA8IGIuZGlmID8gLTEgOiAwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbWV0U3RuQXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZGlmID4gYi5kaWYgPyAxIDogYS5kaWYgPCBiLmRpZiA/IC0xIDogMDtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0eHQrPSc8cCBjbGFzcz1cInN1YndheV9faW5mb19fdGl0bGVcIj7sl63rs4Q8L3A+J1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpdlwiPidcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldFN0bkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2xpbmVcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fc3RuTmFtZVwiPicrIG1ldFN0bkFycmF5W2ldLm5hbWUgKyAn7JetPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19kaWZcIj4nKyBNYXRoLmNlaWwobWV0U3RuQXJyYXlbaV0uZGlmLzgwKSArICfrtoQg6rGw66asPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX2xpbmVMaW5lXCI+J1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IG1ldFN0bkFycmF5W2ldLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKG1ldFN0bkFycmF5W2ldLmxpbmVba10ubGVuZ3RoID09PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX2xpbmVOYW1lIGxuXycrbWV0U3RuQXJyYXlbaV0ubGluZVtrXSsnXCI+JyttZXRTdG5BcnJheVtpXS5saW5lW2tdICsgJzwvcD4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHh0Kz0gICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG4gICAgICAgIHR4dCs9JzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX190aXRsZVwiPuuFuOyEoOuzhDwvcD4nXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fZGl2XCI+J1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0QXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fbGluZVwiPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2xpbmVOYW1lIGxuXycrbWV0QXJyYXlbaV0ubGluZSsnXCI+JyttZXRBcnJheVtpXS5saW5lICsgJzwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19kaWZcIj4nKyBNYXRoLmNlaWwobWV0QXJyYXlbaV0uZGlmLzgwKSArICfrtoQg6rGw66asPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3N0bk5hbWVcIj4nKyBtZXRBcnJheVtpXS5uYW1lICsgJ+yXrTwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICAkKFwiLnN1YndheV9faW5mb1wiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN1YndheTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3Vid2F5LmpzIiwiaW1wb3J0IFNldEhvdGVsSW5mbyBmcm9tIFwiLi9ob3RlbC9zZXRIb3RlbEluZm9cIjtcclxuaW1wb3J0IFNldEFyZWEgZnJvbSBcIi4vaG90ZWwvc2V0SG90ZWxJbmZvL3NldEFyZWFcIjtcclxuXHJcbnZhciBIb3RlbCA9IHtcclxuXHJcblxyXG4gICAgLy9pbmZsYXRl7ZWY66m0IO2YuO2FlOydhCDrp4zrk6TslrTrgrTquLAg7JyE7ZWcIOygleuztCDsiJjsp5Eg7IOB7YOc6rCAIO2RnOyLnOuQqCAtPiBcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzJykub24oXCJ2YWx1ZVwiLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZV9zdGF0dXMoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuaG90ZWxcIikub24oXCJjbGlja1wiLCBcIi5zdGF0dXNfX21ha2VfX2hvdGVsXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykuYXR0cignY2lkJyk7XHJcbiAgICAgICAgICAgIHZhciBjaXR5TmFtZSA9ICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJy5zdGF0dXNfX2NpdHknKS5odG1sKCk7XHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jaXR5KGNpZCwgY2l0eU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIuaG90ZWxcIikub24oXCJjbGlja1wiLCBcIi5ob3RlbF9fYWxlcnRfX2NvbmZpcm1cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKFwiLmhvdGVsX19hbGVydF9fd3JhcFwiKS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5ob3RlbFwiKS5vbihcImNsaWNrXCIsIFwiLmNpdHlBcmVhX19maW5pc2hcIiwgZnVuY3Rpb24gKCkgeyAgLy9zZXRBcmVh66W8IOuBneuCvOuVjFxyXG4gICAgICAgICAgICB2YXIgY2lkID0gJCh0aGlzKS5hdHRyKCdjaWQnKTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCsnL2hvdGVscycpLm9uY2UoJ3ZhbHVlJywgc25hcCA9PntcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGhpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWRhdGFbaGlkXS5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtoaWRdLmFyZWEgPT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGRhdGFbaGlkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCsnL2hvdGVscycpLnNldChkYXRhKTtcclxuICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignc2V0dGluZy9jaXRpZXMvJyArIGNpZCArICcvc3RhdHVzL2FyZWEnKS5zZXQoMik7XHJcbiAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgY2lkICsgJy9zdGF0dXMvYXJlYScpLnNldCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX2NpdHk6IGZ1bmN0aW9uKGNpZCwgY2l0eU5hbWUpe1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycrY2lkKS5vbmNlKCd2YWx1ZScsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgdmFyIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIGFsZXJ0TW9kYWwgPSAnJztcclxuICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPGRpdiBjbGFzcz1cImhvdGVsX19hbGVydF9fd3JhcFwiPic7XHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gICAgICc8ZGl2IGNsYXNzPVwiaG90ZWxfX2FsZXJ0XCI+JztcclxuXHJcbiAgICAgICAgICAgIGlmKCFkYXRhKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuq0gOq0keyngCDsoJXrs7TqsIAg7JWE7KeBIOygleumrOuQmOyngCDslYrslZjsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7rjIDspJHqtZDthrUg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPu2OuOydmOyLnOyEpCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+7KeA7Jet6rWs67aEIOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuc3BvdHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5zcG90cy5yYW5rZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+6rSA6rSR7KeAIOygleuztOqwgCDslYTsp4Eg7KCV66as65CY7KeAIOyViuyVmOyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7qtIDqtJHsp4Ag7KCV67O06rCAIOyVhOyngSDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5tZXRybykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuuMgOykkeq1kO2GtSDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZighZGF0YS5tZXRyb0xpbmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuuMgOykkeq1kO2GtSDsoJXrs7TqsIAg7KCV66as65CY7KeAIOyViuyVmOyKteuLiOuLpChtZXRyb0xpbmUg7JeG7J2MKS48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5sb2NhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPu2OuOydmOyLnOyEpCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoIWRhdGEuc3RhdHVzLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIFNldEFyZWEuaW5mbGF0ZShjaXR5TmFtZSwgY2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KCfsp4Dsl60g7ISk7KCV7J2EIOuovOyggCDsp4Ttlontlanri4jri6QnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRfX2NvbmZpcm1cIj7tmZXsnbg8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPC9kaXY+PC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIGlmKGNoZWNrKXtcclxuICAgICAgICAgICAgICAgIFNldEhvdGVsSW5mby5pbml0KGRhdGEsIGNpZCwgY2l0eU5hbWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuaG90ZWxcIikuYXBwZW5kKGFsZXJ0TW9kYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfc3RhdHVzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPGgyPuyImeyGjCDrpqzsiqTtirg8L2gyPic7XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cIndyYXBwZXJcIj4nO1xyXG5cclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJzdGF0dXNfX2xpbmVyXCI+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX25hbWVcIj7rj4Tsi5zrqoU8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2VcIj7siJnshowg642w7J207YSwPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19ob3RlbFwiPuq4sOuzuCDtmLjthZTrjbDsnbTthLA8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj7sp4Dsl63soJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj7qtIDqtJHsp4DsoJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX3RyYW5zcG9ydFwiPuuMgOykkeq1kO2GteygleuztDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgY2lkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSBjaXR5LnN0YXR1cztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cInN0YXR1c19fbGluZXJcIj4nO1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19jaXR5XCI+JytjaXR5Lm5hbWUrJzwvcD4nO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHN0YXR1cy5ob3RlbCA9PT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fbWFrZVwiPuyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2Ugc3RhdHVzX19tYWtlX19ob3RlbFwiICBjaWQ9XCInICsgY2l0eS5jb2RlICsgJ1wiPuyXhuydjCAo7YG066at7ZW0IOunjOuTpOq4sCk8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuaG90ZWw+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19ob3RlbFwiPlg8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fYXJlYVwiPk88L3A+JztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy5zcG90ID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy50cmFuc3BvcnQgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3RyYW5zcG9ydFwiPlg8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLmhvdGVsXCIpLmh0bWwodHh0KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvdGVsO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsLmpzIiwiaW1wb3J0IFNldEFUTSBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0QVRNLmpzXCI7XHJcblxyXG52YXIgU2V0SG90ZWxJbmZvID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2lkLCBjaXR5TmFtZSl7XHJcbiAgICAgICAgLy9zdGF0dXNDaGVjayDsp4TtlolcclxuICAgICAgICB2YXIgY2hlY2tUeHQgPSAnJztcclxuXHJcbiAgICAgICAgdmFyIGhvdGVsID0gZGF0YS5ob3RlbHNbT2JqZWN0LmtleXMoZGF0YS5ob3RlbHMpWzBdXTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXR1cyA9IHtcclxuICAgICAgICAgICAgbG9jYWw6IHtcclxuICAgICAgICAgICAgICAgIGF0bTogeyAvLzA6IOuNsOydtO2EsCDsl4bsnYwsIDE6IOunjOuTpCDsiJgg7J6I7J2MLCAyOiDsobTsnqztlahcclxuICAgICAgICAgICAgICAgICAgICB2aXNhOjAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2l0aTowXHJcbiAgICAgICAgICAgICAgICB9LCAgXHJcbiAgICAgICAgICAgICAgICBmb29kOiAwLFxyXG4gICAgICAgICAgICAgICAgbWV0cm86IDAsXHJcbiAgICAgICAgICAgICAgICBzcG90OjBcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGFzc2Vzc21lbnQ6IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDowLFxyXG4gICAgICAgICAgICAgICAgc2FmZXR5OjAsXHJcbiAgICAgICAgICAgICAgICB0aGVtZTowLFxyXG4gICAgICAgICAgICAgICAgY29udmVuaWVuY2U6MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGhvdGVsLmxvY2FsKSB7XHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5hdG0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGhvdGVsLmxvY2FsLmF0bSkpIHsgLy9WSVNBIEFUTeydtCDsoJXrpqzrkJjsp4Ag7JWK7J2AIO2Yle2DnOuhnCDrk6TslrTqsIDsnojripQg7IOB7YOcXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vYXRt6rCd7LK066W8IOqwgOyngOqzoCDsnojripQg7IOB7YOcIC0g67CY65Oc7IucIHZpc2EgYXRt7J20IOuTpOyWtOqwgCDsnojslrTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLmF0bS5jaXRpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxvY2FsLmF0bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+ykkeyalDogQ0lUSeyekeyXheydgCBWSVNB7J6R7JeFIO2bhOyXkCDsnbTro6jslrTsoLjslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgeyAvL2xvY2Fs7JeQIGF0beydtCDsl4bsnYwgLT4g67mE7J6QIOy2lOy2nOuQnCDsoIHsnbQg7JeG7J2MXHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLnZpc2EgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmF0bSkgeyAvL+q3uCDqsr3smrDsl5Drj4QgQ0lUSeuKlCBSQVfrjbDsnbTthLDroZwg7KG07J6s7ZWgIOyImCDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7KSR7JqUOiBDSVRJ7J6R7JeF7J2AIFZJU0HsnpHsl4Ug7ZuE7JeQIOydtOujqOyWtOyguOyVvCDtlahcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLm1ldHJvKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWV0cm9MaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLnNwb3QpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnNwb3RzLnJhbmtlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9IDA7IC8vVklTQeuKlCDrrLTsobDqsbQg7Zi47YWUIOuhnOy7rOyXkCDsp4HsoJEg65Ok7Ja06rCA66+A66GcIO2YuO2FlCDroZzsu6wg6rK966Gc6rCAIOyXhuuLpOuKlCDqsoPsnYAgVklTQeqwgCDsl4bri6TripQg6rKDLlxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubG9jYWwuYXRtKSB7IC8vY2l0aeuCmCB2aXNh64qUIO2YuO2FlCDroZzsu6zsnbQg7JWE64uMIOuPhOyLnCDroZzsu6zsl5Ag7KCA7J6l65CgIOyImCDsnojsnYwuXHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLm1ldHJvTGluZSkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLnNwb3RzLnJhbmtlZCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGVja1R4dCArPSAnPGgyIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdGl0bGVcIj7tmLjthZQg7KO867OA7KCV67O0PC9oMj4nO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCBWSVNBIEFUTeygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuYXRtLnZpc2EgPT09IDEpIHtcclxuICAgICAgICAgICAgU2V0QVRNLmluaXQoZGF0YSk7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk1ha2luZyAtIFJBVyBWSVNBIEFUTeygleuztCDtmZXsnbguIO2YuO2FlOuzhOuhnCDqsIDsnqUg6rCA6rmM7Jq0IEFUTeqzvCAyNOyLnOqwhCBBVE3snYQg7LaU7Lac7ZWp64uI64ukLjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmF0bS52aXNhID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIFZJU0EgQVRN7KCV67O06rCAIOyXhuyKteuLiOuLpC4gVklTQSBBVE0gbG9jYXRvcuyXkOyEnCDsoJXrs7Trpbwg66i87KCAIO2BrOuhpOunge2VtOyjvOyEuOyalC48L3A+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwuYXRtLmNpdGkgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwgQ0lUSSBBVE3soJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmF0bS5jaXRpID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk1ha2luZyAtIFJBVyBDSVRJIEFUTeygleuztCDtmZXsnbguIOqwgOyepSDqsIDquYzsmrQgQ0lUSSBBVE3snYQg7LaU7Lac7ZWp64uI64ukLjwvcD4nO1xyXG4gICAgICAgIH0gLy8gY2l0aSBzdGF0dXMgMOydgCDsl4bsnYwuXHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwuZm9vZCA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCDsi53ro4ztkojsoJAv7Y647J2Y7KCQIOygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuZm9vZCA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg7Iud66OM7ZKI7KCQL+2OuOydmOygkCDsoJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA6rmM7Jq0IOyLneujjO2SiOygkCDstpTstpwuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuZm9vZCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHQgY29sb3ItLXJlZFwiPk5vIERhdGEgLSDrj4Tsi5wg7Iud66OM7ZKI7KCQL+2OuOydmOygkCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLiDrqLzsoIAg7KCV67O066W8IOyeheugpe2VtOyjvOyEuOyalC48L3A+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwubWV0cm8gPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwg7KeA7ZWY7LKgL+uMgOykkeq1kO2GtSDsoJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLm1ldHJvID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk1ha2luZyAtIFJBVyDsp4DtlZjssqAv64yA7KSR6rWQ7Ya1IOygleuztCDtmZXsnbguIO2YuO2FlOuzhOuhnCDqsIDquYzsmrQg7KeA7ZWY7LKgIOy2lOy2nC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5tZXRybyA9PT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHQgY29sb3ItLXJlZFwiPk5vIERhdGEgLSDrj4Tsi5wg7KeA7ZWY7LKgL+uMgOykkeq1kO2GtSDsoJXrs7TqsIAg7JeG7Iq164uI64ukLiDrqLzsoIAg7KCV67O066W8IOyeheugpe2VtOyjvOyEuOyalC48L3A+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwuc3BvdCA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCDqtIDqtJHsp4Ag7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5zcG90ID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk1ha2luZyAtIFJBVyDqtIDqtJHsp4Ag7KCV67O0IO2ZleyduC4g7Zi47YWU67OE66GcIOqwgOq5jOyatCDqtIDqtJHsp4Ag7LaU7LacLjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLnNwb3QgPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0g64+E7IucIOq0gOq0keyngCDsiJzsnITqsIAg7JWE7KeBIO2ZleygleuQmOyngCDslYrslZjsirXri4jri6QuIOuovOyggCDtmZXsnbjtlbTso7zshLjsmpQuPC9wPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhjaGVja1R4dCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXRIb3RlbEluZm87XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvLmpzIiwidmFyIFNldEFUTSA9IHtcclxuICAgIHN0YXRpc3RpYzoge1xyXG4gICAgICAgIG5lYXJlc3Q6W10sIC8v6rCA7J6lIOqwgOq5jOyatCBBVE3snYAg66qHIG0g6rGw66as7JeQIOyeiOuKlOyngCDrj4Tsi5wg7KCE7LK0IO2Pieq3oOydhCDrgrTquLAg7JyE7ZWcIOuNsOydtO2EsFxyXG4gICAgICAgIGJhbmsyNDpbXSwgICAvLzI07Iuc6rCEIOyatOyYge2VmOuKlCDsnYDtlokg7IaM7JygIOqxsOumrOyXkCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgICAgICBpbjEzMDpbXSAvL+uwmOqyvSAxMzBtIOuCtOyXkCBBVE3snbQg66qHIOqwnCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgIH0sXHJcbiAgICBieUFyZWE6IHt9LCAvL2luMTMwIHN0YXTsnYQg7KeA7Jet67OE66GcIO2Pieq3oOuCtOq4sCDsnITtlZwg6rCd7LK0XHJcblxyXG4gICAgZGF0YTp7fSxcclxuXHJcbiAgICBmaXJzdF9ieUhvdGVsczogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgaG90ZWxzID0gdGhpcy5kYXRhLmhvdGVscztcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBoaWQgaW4gaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IGhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwpIHsgLy9ob3RlbC50ZW1w66GcIOuwlOq/gOqyg+yehFxyXG4gICAgICAgICAgICAgICAgdmFyIGF0bUFyciA9IGhvdGVsLmxvY2FsLmF0bTtcclxuICAgICAgICAgICAgICAgIHZhciBhdG1PYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDogYXRtQXJyWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGluMTMwOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhbmsyNDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgYXRtT2JqLm5lYXJlc3QuZGlmID0gY2FsY3VsYXRlRGlmKGF0bUFyclswXS5jb29yLCBob3RlbC5jb29yKTsgLy/siJnshozrs4Qg6rCA7J6lIOqwgOq5jOyatCBhdG0g64u07J2MXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGF0bUFycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXRtQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdG0gPSBhdG1BcnJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoYXRtLmNvb3IsIGhvdGVsLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZiA8IDEzMC4xKSB7IC8v7IiZ7IaM67OEIDEzMG3qsbDrpqwgYXRtIOqwr+yImCDssrTtgaxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bU9iai5pbjEzMCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWF0bU9iai5iYW5rMjQpIHsvL+q4sOuzuOyggeycvOuhnCDqsbDrpqzsiJwg7KCV66CsIOuQmOyWtOyeiOyWtOyEnCDsnbTrr7gg65Ok7Ja06rCA7J6I7Jy866m0IOq3uOuGiOydtCDrjZQg6rCA6rmM7Jq064aIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMjMwKSB7IC8v7IiZ7IaM67OEIOydgO2WiSDshozsnKAgMjTsi5zqsIQgYXRtIOuLtOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYXRtLm93bmVyLmluY2x1ZGVzKFwiQkFOS1wiKXx8YXRtLnBsYWNlTmFtZS5pbmNsdWRlcyhcIkJBTktcIikpICYmIGF0bS5pczI0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bU9iai5iYW5rMjQgPSBhdG07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bU9iai5iYW5rMjQuZGlmID0gZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+2GteqzhOyXkCDquLDroZ3tlZjquLBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmVzdC5wdXNoKGF0bU9iai5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0bU9iai5iYW5rMjQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMuYmFuazI0LnB1c2goYXRtT2JqLmJhbmsyNC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLmJhbmsyNC5wdXNoKDIzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyTm8rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmF0bSA9IGF0bU9iajtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2luMTMw7J2AIO2YuO2FlOydhCDtlZwg67KIIOuLpCDrj4gg64uk7J2M7JeQIO2GteqzhOyXkCDquLDroZ3tlaAg7IiYIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMuaW4xMzAucHVzaChhdG1PYmouaW4xMzApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYnlBcmVhW2hvdGVsLmFyZWFdKXsvL+yngOyXreuzhCBhdG0g67CA7KeR64+E66W8IO2ZleyduO2VmOuKlCDqt7jrn7Ag64WA7ISdXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0ucHVzaChhdG1PYmouaW4xMzApO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0gPSBbYXRtT2JqLmluMTMwXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChgVklTQSBBVE0g7KCV67O06rCAIOyXhuuKlCDtmLjthZTsnbQg7J6I7Iq164uI64ukLiDtmZXsnbgg7ZuEIOyerOyLnOuPhO2VtOyjvOyEuOyalGApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZWNvbmRfYnlBcmVhczogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgYXJlYSA9IHRoaXMuZGF0YS5hcmVhO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHN1bSA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZighYXJlYVtpXS5ub3RBcmVhKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYnlBcmVhW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXRtcyA9IHRoaXMuYnlBcmVhW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGF0bXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGF0bXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXRtcy5sZW5ndGggPCAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbnVzID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGF0bXMgPSAoc3VtLyhhdG1zLmxlbmd0aCkgKyBhdG1zLmxlbmd0aC8xMCkgKyBtaW51cztcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmVhW2ldLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbC5hdG0gPSBhdG1zLnRvRml4ZWQoMikqMTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bTogYXRtcy50b0ZpeGVkKDIpKjFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmVhW2ldLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbC5hdG0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB0aGlyZF9tYWtlU3RhdHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHN0YXQgPSB7XHJcbiAgICAgICAgICAgIG5lYXJlc3Q6IDAsXHJcbiAgICAgICAgICAgIGluMTMwOiAwLFxyXG4gICAgICAgICAgICBiYW5rMjQ6IDBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpZCBpbiBzdGF0KSB7XHJcbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMuc3RhdGlzdGljW2lkXS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgc3VtICs9IHRoaXMuc3RhdGlzdGljW2lkXVtrXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdGF0W2lkXSA9IHN1bS90aGlzLnN0YXRpc3RpY1tpZF0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBzdGF0W2lkXSA9IHN0YXRbaWRdLnRvRml4ZWQoMikqMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGF0YS5zdGF0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5kYXRhLnN0YXQubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0YXQubG9jYWwuYXRtID0gc3RhdDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RhdC5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhdG06IHN0YXRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnN0YXQgPSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbDp7YXRtOnN0YXR9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmb3VydGhfbWFrZVJhbms6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGlzdGljLm5lYXJlc3Quc29ydCgoYSwgYikgPT4gYSAtIGIpO1xyXG4gICAgICAgIHRoaXMuc3RhdGlzdGljLmJhbmsyNC5zb3J0KChhLCBiKSA9PiBhIC0gYik7XHJcbiAgICAgICAgdGhpcy5zdGF0aXN0aWMuaW4xMzAuc29ydCgoYSwgYikgPT4gYiAtIGEpO1xyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEuaG90ZWxzKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgdmFyIGF0bSA9IGhvdGVsLmxvY2FsLmF0bTtcclxuICAgICAgICAgICAgdmFyIHJhbmsgPSB7XHJcbiAgICAgICAgICAgICAgICBiYW5rMjQ6IHRvdGFsLFxyXG4gICAgICAgICAgICAgICAgbmVhcmVzdDogdG90YWwsXHJcbiAgICAgICAgICAgICAgICBpbjEzMDogdG90YWxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByYW5rKSB7XHJcbiAgICAgICAgICAgICAgICBpZihrZXkgPT09IFwiaW4xMzBcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXRtW2tleV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rW2tleV0gPSB0aGlzLnN0YXRpc3RpY1trZXldLmluZGV4T2YoYXRtW2tleV0pKzE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXRtW2tleV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rW2tleV0gPSB0aGlzLnN0YXRpc3RpY1trZXldLmluZGV4T2YoYXRtW2tleV0uZGlmKSsxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGhvdGVsLnJhbmspe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwucmFuay5hdG0gPSByYW5rO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLnJhbmsgPSB7YXRtOnJhbmt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmaWZ0aF9tYWtlU2NvcmU6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBzY29yZUFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgdmFyIGF0bSA9IGhvdGVsLnJhbmsuYXRtO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNjb3JlID0gKGF0bS5iYW5rMjQqNCArIGF0bS5uZWFyZXN0KjMuNzUgKyBhdG0uaW4xMzAqMy41KTtcclxuXHJcbiAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaCh7c2NvcmU6c2NvcmUsaGlkOmhpZH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzY29yZUFycmF5LnNvcnQoKGEsIGIpID0+IGEuc2NvcmUgLSBiLnNjb3JlKTsgLy/rgq7snYTsiJjroZ0g7KKL7J2MXHJcblxyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBzY29yZUFycmF5Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgdmFyIHJhbmtTeXMgPSBbMC4xNSwwLjIsMC4yNSwwLjIsMC4xLDAuMV07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcmVBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaGlkID0gc2NvcmVBcnJheVtpXS5oaWQ7XHJcbiAgICAgICAgICAgIHZhciBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIHZhciByYW5rID0gKGkgLyB0b3RhbCk7IC8vIOuwseu2hOychFxyXG4gICAgICAgICAgICB2YXIgcGVyY2VudGlsZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXNSYW5rZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmFua1N5cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzUmFua2VkKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSBwZXJjZW50aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRpbGUgKz0gcmFua1N5c1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFuazxwZXJjZW50aWxlKXsgIC8vMzUlIOyViOyXkCDrk6TrqbRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuayAtPSBtaW51czsgICAvL3JhbmvrpbwgMH4wLjLroZwg66ee7Law7KSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gKDktaikgKyBNYXRoLmZsb29yKChyYW5rL3JhbmtTeXNbal0pKjEwKS8xMDsgLy9yYW5rKDB+MC4yKeulvCAwLjLroZwg64KY64iI6rCSKjEwLzEwIC0+IDB+MC456rCAIOuCmOyYtFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JhbmtlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuYXRtID0gc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlID0ge2F0bTpzY29yZX07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudCA9IHtzY29yZTp7YXRtOnNjb3JlfX07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHNjb3JlQXJyYXkpXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5maXJzdF9ieUhvdGVscygpOyAvL+2YuO2FlOuTpOydhCDrj4zrqbAg6rCA7J6lIOqwgOq5jOyatCBBVE0sIOydgO2WieyGjOycoCAyNOyLnOqwhCBBVE0sIDEzMG3slYjsl5Ag66qHIOqwnCBBVE0g7J6I64qU7KeA66W8IOywvuyVhOuCtOqzoCDthrXqs4Tsl5Drj4Qg6riw66GdXHJcbiAgICAgICAgdGhpcy5zZWNvbmRfYnlBcmVhcygpOyAvL+yngOyXreuzhOuhnCAxMzBtIOuCtOyXkCDsnojripQgQVRNIOqwr+yImCDtj4nqt6DsnYQg64OEIC0+IOyngOyXrSDsg4Hsl4Ug67Cc7KCE64+E66W8IOuCmOykkeyXkCDssrTtgaztlZjquLAg7JyE7ZW0IOunjOuTpOyXiOydjC5cclxuICAgICAgICB0aGlzLnRoaXJkX21ha2VTdGF0cygpOyAvL2ZpcnN07JeQ7IScIOq4sOuhne2VnCDthrXqs4Qg64K07Jqp7J2EIOqwgOyngOqzoCDthrXqs4TqsJLrk6TsnYQg7IKw7Lac7ZW064OELlxyXG4gICAgICAgIHRoaXMuZm91cnRoX21ha2VSYW5rKCk7IC8v7Ya16rOE7JeQIOq4sOuhneuQnCDqsJLsnYQg67CU7YOV7Jy866GcIO2YuO2FlOuzhCBhdG3tjrjsnZjshLEg656t7YK57J2EIOqzhOyCsO2VqCjsmIgtQVRN6rCA6rmM7Jq0IOygleuPhOuKlCDribTsmpUg64K0IDfsnIQuLi4pXHJcbiAgICAgICAgdGhpcy5maWZ0aF9tYWtlU2NvcmUoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldEFUTTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0QVRNLmpzIiwidmFyIFNldEFyZWEgPSB7XHJcbiAgICBtYXA6e30sXHJcbiAgICBtYXJrZXI6e30sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24gKGNpdHlOYW1lLCBjaWQpIHtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5tYXJrZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyW2hpZF0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyID0ge307XHJcblxyXG4gICAgICAgICAgICB2YXIgdHh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGgyPicgKyBjaXR5TmFtZSArICcg7IiZ7IaMIOyngOyXrSDqtazrtoQ8L2gyPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiY2l0eUFyZWFfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgaWQ9XCJjaXR5QXJlYV9fbWFwXCI+PC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiXCJjaXR5QXJlYT4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eUFyZWFfX3dvcmRcIj48L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjaWQ9XCInICsgY2lkICsgJ1wiIGNsYXNzPVwiY2l0eUFyZWFfX2ZpbmlzaFwiPuyZhOujjOyymOumrDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JzsgLy9jbG9zZSB3cmFwcGVyXHJcblxyXG4gICAgICAgICAgICAkKFwiLnBhZ2VzLmhvdGVsXCIpLmh0bWwodHh0KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5QXJlYV9fbWFwJyksIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogNDAuNzQzMTk1NzkzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzogLTczLjk4OTE3OTU0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgem9vbTogMTNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhcmVhID0ge307XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9BcmVhID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuYXJlYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhLmFyZWFbaV0ubm90QXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmVhQ29vciA9IGRhdGEuYXJlYVtpXS5jb29yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5BcmVhKGhvdGVsLmNvb3IsIGFyZWFDb29yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXJlYSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0FyZWEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub0FyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcltoaWRdID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBob3RlbC5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJycgKyBoaWRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcmVhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvaG90ZWxzJykudXBkYXRlKGRhdGEuaG90ZWxzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldEFyZWE7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==