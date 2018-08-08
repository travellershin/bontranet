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

                    if (city.hotels) {
                        var hotel = city.hotels[Object.keys(city.hotels)[0]];

                        if (hotel.assessment) {
                            status.hotel = 2;
                        } else {
                            status.hotel = 1;
                        }
                    }

                    if (city.metro) {
                        if (city.metroLine) {
                            status.transport = 2;
                        } else {
                            status.transport = 1;
                        }
                    }

                    if (city.area) {
                        status.area = 1;
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
            firebase.database().ref('setting/cities').set(_this2.data).then(function () {
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

var _setArea = __webpack_require__(13);

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
                        delete data[hid];
                    }
                }

                firebase.database().ref('cities/' + cid + '/hotels').set(data);
                firebase.database().ref('setting/cities/' + cid + '/status/area').set(2);
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
                } else if (data.area === 1) {
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

var _setLocal = __webpack_require__(11);

var _setLocal2 = _interopRequireDefault(_setLocal);

var _calculateCityInfo = __webpack_require__(12);

var _calculateCityInfo2 = _interopRequireDefault(_calculateCityInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SetHotelInfo = {
    init: function init(data, cid, cityName) {
        //statusCheck 진행
        var checkTxt = '';

        var hotel = data.hotels[Object.keys(data.hotels)[0]];
        console.log(Object.keys(data.hotels));

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
                    _setLocal2.default.visaATM(data.hotels);
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
var SetLocal = {

    data: { //데이터 구조 파악하기 위해 가져다놓은녀석. 사용하지 말것!
        overall: {
            atm: 0, //호텔 당 반경 160미터 내 평균적으로 ATM이 몇 개 있는지
            metro: {
                distance: 0, //호텔 별 가장 가까운 지하철역이 평균 몇 M 떨어져있는지
                number: 0 //호텔 별 반경 500m 내 지하철역이 몇 개 있는지
            },
            food: {
                distance: 0, //호텔 별 가장 식료품점이 평균 몇 M 떨어져있는지
                number: 0 //호텔 별 반경 500m 내 식료품점이 몇 개 있는지
            }
        },
        byArea: [] //위 정보를 지역별로 담음
    },

    visaATM: function visaATM(hotels) {
        var atm_overall = [];
        var atm_byArea = [];

        var errNo = 0;
        var totalNo = 0;

        for (var hid in hotels) {
            var hotel = hotels[hid];
            if (hotel.local) {
                var atmArr = hotel.local.atm;
                var atmObj = {
                    nearest: atmArr[0],
                    bank24: false,
                    in160: 0
                };

                atmObj.nearest.dif = calculateDif(atmArr[0].coor, hotel.coor);

                if (atmArr) {
                    for (var i = 0; i < atmArr.length; i++) {
                        var atm = atmArr[i];
                        var dif = calculateDif(atm.coor, hotel.coor);

                        if (dif < 160.1) {
                            atmObj.in160++;

                            if (atm.owner.includes("BANK") && atm.is24) {
                                if (!atmObj.bank24) {
                                    atmObj.bank24 = atm;
                                    atmObj.bank24.dif = dif;
                                }
                            }
                        }
                    }
                } else {
                    errNo++;
                }

                hotel.local.atm = atmObj;

                if (atm_byArea[hotel.area]) {
                    atm_byArea[hotel.area].push(atmObj.in160);
                } else {
                    atm_byArea[hotel.area] = [atmObj.in160];
                }
                atm_overall.push(atmObj.in160);
            } else {
                errNo++;
            }
            totalNo++;
        }

        console.log(hotels);
        console.log(atm_byArea);

        if (errNo > 2) {
            //VISA ATM finder가 중간에 끊겼을 가능성 높음
            toast(totalNo + " \uAC1C\uC758 \uD638\uD154 \uC911 " + errNo + " \uAC1C\uC758 \uD638\uD154\uC5D0 VISA ATM \uC815\uBCF4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uD655\uC778 \uD6C4 \uC7AC\uC2DC\uB3C4\uD574\uC8FC\uC138\uC694");
        }
    }

};

exports.default = SetLocal;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Calculate_City = {

    atm: function atm() {}
};

exports.default = Calculate_City;

/***/ }),
/* 13 */
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

            for (var hid in data.hotels) {
                var hotel = data.hotels[hid];
                var noArea = true;

                if (!hotel.area) {
                    for (var i = 0; i < data.area.length; i++) {
                        var areaCoor = data.area[i].coor;

                        if (isInArea(hotel.coor, areaCoor)) {
                            hotel.area = i;
                            noArea = false;
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
            }

            firebase.database().ref('cities/' + cid + '/hotels').update(data.hotels);
        });
    }
};

exports.default = SetArea;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmY1Y2M4MTZiMDRkMTA0ODAwMzAiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvYXR0ZW5kLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2NpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2ZpcnN0X2NoZWNrLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvYXV0b0NvbWJpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9zZW9uZF9jb21iaW5lLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2FjY291bnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3Vid2F5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0TG9jYWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY2FsY3VsYXRlQ2l0eUluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEFyZWEuanMiXSwibmFtZXMiOlsiaW5pdGlhbGl6ZWQiLCJ1X2kiLCJOYXZfZnVuY3Rpb24iLCJhdHRlbmQiLCJpbml0IiwidG9kbyIsImNpdHkiLCJtYXAiLCJhY2NvdW50Iiwic3BvdCIsImNhbGMiLCJob3RlbCIsImxpbmsiLCJsb2dpbiIsIm5hbWUiLCIkIiwiaHRtbCIsImF0dHIiLCJjbGljayIsImNvbmZpcm0iLCJmaXJlYmFzZSIsImF1dGgiLCJzaWduT3V0IiwidGhlbiIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY2F0Y2giLCJlcnJvciIsImRvY3VtZW50IiwicmVhZHkiLCJwcm92aWRlciIsIkdvb2dsZUF1dGhQcm92aWRlciIsIm9uQXV0aFN0YXRlQ2hhbmdlZCIsInVzZXIiLCJtYWlsIiwiZW1haWwiLCJzcGxpdCIsImRhdGFiYXNlIiwicmVmIiwib25jZSIsImRhdGEiLCJzbmFwIiwidmFsIiwiZ3JhZGUiLCJ0b2FzdCIsInNpZ25JbldpdGhQb3B1cCIsInJlc3VsdCIsInVzZXJNYWlsIiwic2V0IiwiZGlzcGxheU5hbWUiLCJzZXR0aW5nIiwib3JkZXIiLCJjb2RlIiwiZXJyb3JDb2RlIiwiZXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNyZWRlbnRpYWwiLCJoYXNDbGFzcyIsIml0ZW0iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicGFyZW50IiwiQXR0ZW5kIiwibW9iaWxlIiwiaWQiLCJ2aWV3SUQiLCJhdHRlbmRPYmoiLCJzYWxhcnkiLCJ3ZWVrZGF5cyIsInRoYXQiLCJ0eHQiLCJ1c2VycyIsIm1haWxJRCIsInByb3AiLCJvbiIsImNvbnNvbGUiLCJsb2ciLCJpbmZsYXRlX2NhbGVuZGFyIiwibGVuZ3RoIiwiZnVsbENhbGVuZGFyIiwiaGVpZ2h0IiwiZmlyc3REYXkiLCJ2aWV3UmVuZGVyIiwidmlldyIsImVsZW1lbnQiLCJkYXlDbGljayIsImRhdGUiLCJpbnB1dFdvcmtIb3VyIiwibGlzdGVuZXIiLCJzZXRXb3JrSG91ciIsImtleXVwIiwiZSIsIndoaWNoIiwiY2hhbmdlIiwidmlld193b3JrZXIiLCJvZmYiLCJ5byIsImRhdGVJRCIsInNsaWNlIiwiZGlmIiwiZnJvbSIsInRvIiwiaSIsIk1hdGgiLCJmbG9vciIsImR1ck1vbiIsInRoaXNNb250aCIsImRhdGVEb20iLCJlcSIsImoiLCJ3ZWVrRG9tIiwid2Vla0R1ciIsImRheURvbSIsImZpbmQiLCJrIiwiY2hpbGRyZW4iLCJhcHBlbmQiLCJmdWxsTW9udGhCb251cyIsImluc3VyYW5jZUZlZSIsImJhc2ljIiwicm91bmQiLCJmdWxsV2Vla0J1bnVzIiwiY29tbWEiLCJkYXRlT2JqIiwiZGF0ZVNob3J0IiwibW9tZW50IiwiZm9ybWF0IiwiQW55UGlja2VyIiwiZGF0ZVRpbWVGb3JtYXQiLCJmb2N1cyIsIndvcmsiLCJhbGxFbXB0eSIsInJlbW92ZSIsImFsZXJ0IiwiZnJvbUEiLCJ0b0EiLCJwdXNoIiwiQ2l0eSIsInJlZnJlc2hTdGF0dXMiLCJpbmZsYXRlIiwic3RhdHVzIiwidHJhbnNwb3J0IiwiYXJlYSIsInByaWNlIiwiY2lkIiwiaG90ZWxzIiwiT2JqZWN0Iiwia2V5cyIsImFzc2Vzc21lbnQiLCJtZXRybyIsIm1ldHJvTGluZSIsIlNwb3QiLCJjaXRpZXMiLCJjdXJyZW50IiwiaW5mbGF0ZV9zdGF0dXMiLCJpbmZsYXRlX2NpdHkiLCJ1aWQiLCJvcmRlckFycmF5IiwiaWR4IiwiY2hhbmdlZCIsInNvcnQiLCJhIiwiYiIsInN0YXR1c0FycmF5IiwiY2l0eU5hbWUiLCJzcG90cyIsIkZpcnN0X0NoZWNrIiwic2V0UmVtYWluTnVtYmVyIiwic2lkIiwic2l0ZU5vZGF0YSIsImRlbGV0ZVNwb3QiLCJpbnB1dENvb3JkaW5hdGUiLCJzaXRlIiwibnVtYmVyIiwiY3V0Tm8iLCJ0cmltIiwiY3V0T2JqIiwibm8iLCJkZWxldGVkIiwiY29vclR4dCIsImNvb3IiLCJsYXQiLCJsbmciLCJpc05hTiIsImhhc1Byb2JsZW0iLCJzZWFyY2hVcmwiLCJzaXRlT2JqIiwiZ2ciLCJudiIsInRhIiwibHAiLCJzaXRlSGFzUHJvYmxlbSIsIm5vQ29vciIsIm5vQ29vclR4dCIsIm5vU3BvdCIsIm5vU3BvdFR4dCIsIm5vZGF0YSIsImhhc0Nvb3IiLCJsYXJnZU9LIiwibGFyZ2VEYXRhIiwic2Nyb2xsVG9wIiwiQXV0b0NvbWJpbmUiLCJzaXRlQXJyIiwiY29tYmluaW5nIiwiY291bnRlciIsIm5vRGF0YSIsIm9sZFNwb3QiLCJrbyIsImVuIiwicmFuayIsInRlc3QiLCJ1cmwiLCJ0YWciLCJjb21iaW5lT2JqIiwiY29tYmluZWQiLCJjb21iaW5lIiwiaGFzQ29tYmluZWQiLCJ0Q29kZSIsInRTcG90Iiwia2V5IiwiY2FsY3VsYXRlRGlmIiwiU2Vjb25kX2NvbWJpbmUiLCJBY2NvdW50IiwiU3Vid2F5IiwibWFya2VyIiwiZ29vZ2xlIiwibWFwcyIsIk1hcCIsImdldEVsZW1lbnRCeUlkIiwiY2VudGVyIiwiem9vbSIsIm1hcFR5cGVDb250cm9sIiwic2NhbGVDb250cm9sIiwiZnVsbHNjcmVlbkNvbnRyb2wiLCJhZGRMaXN0ZW5lciIsImZpbmRTdWJ3YXkiLCJsYXRMbmciLCJzZXRNYXAiLCJNYXJrZXIiLCJwb3NpdGlvbiIsIm1ldHJvSW5mbyIsIm1ldHJvQnlTdG4iLCJtZXRyb05hbWUiLCJsaW5lIiwiY29uY2F0IiwibWV0QXJyYXkiLCJtZXRTdG5BcnJheSIsImNlaWwiLCJIb3RlbCIsImhpZCIsImNoZWNrIiwiYWxlcnRNb2RhbCIsInJhbmtlZCIsImxvY2FsIiwiU2V0SG90ZWxJbmZvIiwiY2hlY2tUeHQiLCJhdG0iLCJ2aXNhIiwiY2l0aSIsImZvb2QiLCJzYWZldHkiLCJ0aGVtZSIsImNvbnZlbmllbmNlIiwiQXJyYXkiLCJpc0FycmF5IiwidmlzYUFUTSIsIlNldExvY2FsIiwib3ZlcmFsbCIsImRpc3RhbmNlIiwiYnlBcmVhIiwiYXRtX292ZXJhbGwiLCJhdG1fYnlBcmVhIiwiZXJyTm8iLCJ0b3RhbE5vIiwiYXRtQXJyIiwiYXRtT2JqIiwibmVhcmVzdCIsImJhbmsyNCIsImluMTYwIiwib3duZXIiLCJpbmNsdWRlcyIsImlzMjQiLCJDYWxjdWxhdGVfQ2l0eSIsIlNldEFyZWEiLCJub0FyZWEiLCJhcmVhQ29vciIsImlzSW5BcmVhIiwibGFiZWwiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtB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RUFBb0M7QUFDaENuUixrQ0FBTW9JLElBQU4sR0FBYXhDLENBQWI7QUFDQXNMLHFDQUFTLEtBQVQ7QUFDSDtBQUNKOztBQUVELHdCQUFJQSxNQUFKLEVBQVk7QUFDUiw4QkFBSzVELE1BQUwsQ0FBWXlCLEdBQVosSUFBbUIsSUFBSXhCLE9BQU9DLElBQVAsQ0FBWVksTUFBaEIsQ0FBdUI7QUFDdENDLHNDQUFVck8sTUFBTTBLLElBRHNCO0FBRXRDOUssaUNBQUssTUFBS0EsR0FGNEI7QUFHdEN5UixtQ0FBTyxLQUFLdEM7QUFIMEIseUJBQXZCLENBQW5CO0FBS0g7QUFDSjtBQUNKOztBQUVEdE8scUJBQVNrQixRQUFULEdBQW9CQyxHQUFwQixDQUF3QixZQUFZMEcsR0FBWixHQUFrQixTQUExQyxFQUFxRGdKLE1BQXJELENBQTREeFAsS0FBS3lHLE1BQWpFO0FBQ0gsU0E1REQ7QUE2REg7QUFuRVMsQ0FBZDs7a0JBc0VlMEksTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDZmNWNjODE2YjA0ZDEwNDgwMDMwIiwiaW1wb3J0IEF0dGVuZCBmcm9tIFwiLi9wYWdlcy9hdHRlbmQuanNcIjtcclxuaW1wb3J0IENpdHkgZnJvbSBcIi4vcGFnZXMvY2l0eS5qc1wiO1xyXG5pbXBvcnQgU3BvdCBmcm9tIFwiLi9wYWdlcy9zcG90LmpzXCI7XHJcbmltcG9ydCBBY2NvdW50IGZyb20gXCIuL3BhZ2VzL2FjY291bnQuanNcIjtcclxuaW1wb3J0IFN1YndheSBmcm9tIFwiLi9wYWdlcy9zdWJ3YXkuanNcIjtcclxuaW1wb3J0IEhvdGVsIGZyb20gXCIuL3BhZ2VzL2hvdGVsLmpzXCI7XHJcblxyXG52YXIgaW5pdGlhbGl6ZWQgPSB7fTtcclxuXHJcbnZhciB1X2kgPSB7fTtcclxuXHJcbnZhciBOYXZfZnVuY3Rpb24gPSB7XHJcbiAgICBhdHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBBdHRlbmQuaW5pdCh1X2kpO1xyXG4gICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgdG9kbzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBjaXR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgQ2l0eS5pbml0KHVfaSk7XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQuY2l0eSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgbWFwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgU3Vid2F5LmluaXQoKTtcclxuICAgIH0sXHJcbiAgICBhY2NvdW50OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIHNwb3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBTcG90LmluaXQodV9pKTtcclxuICAgICAgICBpbml0aWFsaXplZC5zcG90ID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBjYWxjOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGhvdGVsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgSG90ZWwuaW5pdCgpO1xyXG4gICAgfSxcclxuICAgIGxpbms6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBsb2dpbihuYW1lKXtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5odG1sKG5hbWVbMV0rXCLtlZghXCIpO1xyXG4gICAgJChcIi5oZWxsb1dvcmxkXCIpLmF0dHIoXCJ0aXRsZVwiLG5hbWUrXCLri5gg7JWI64WV7ZWY7IS47JqUIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGNvbmZpcm0obmFtZStcIuuLmCDroZzqt7jslYTsm4Mg7ZWY7Iuc6rKg7Iq164uI6rmMP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgLy8gQW4gZXJyb3IgaGFwcGVuZWQuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgICBsZXQgbWFpbCA9IHVzZXIuZW1haWwuc3BsaXQoJ0AnKVswXTtcclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v7JWE656YIOuCtOyaqeydhCDrsJTqvrjrqbQgaWYgKCFpc1VzZXIpIOu2gOu2hOyXkOuPhCDrsJjrk5zsi5wg67CY7JiB7ZW07KSE6rKDXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgKHZhciBnaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGRhdGFbZ2lkXS5cclxuICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLnVwZGF0ZShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVttYWlsXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVfaSA9IGRhdGFbbWFpbF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyYWRlID0gdV9pLmdyYWRlICogMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdHRlbmQuaW5pdChkYXRhW21haWxdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2NvdW50LmluaXQobWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hY2NvdW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hdHRlbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dpbih1X2kubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBVc2VyIGlzIHNpZ25lZCBpbi5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gTm8gdXNlciBpcyBzaWduZWQgaW4uXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IHJlc3VsdC51c2VyO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJNYWlsID0gdXNlci5lbWFpbC5zcGxpdCgnQCcpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3VzZXJNYWlsXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1X2kgPSBkYXRhW3VzZXJNYWlsXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyYWRlID0gdV9pLmdyYWRlICogMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmFkZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF0dGVuZC5pbml0KGRhdGFbdXNlck1haWxdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmFkZSA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjY291bnQuaW5pdCh1c2VyTWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZWQuYWNjb3VudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hdHRlbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9naW4odV9pLm5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCd1c2Vycy8nICsgdXNlck1haWwpLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIuZGlzcGxheU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWlsOiB1c2VyTWFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogXCJhYmNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgnY29kZTonICsgZXJyb3IuY29kZSArICcgLSDsnbzsi5zsoIHsnbgg66y47KCc6rCAIOuwnOyDne2WiOyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalC4nKTtcclxuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBFcnJvcnMgaGVyZS5cclxuICAgICAgICAgICAgICAgIHZhciBlcnJvckNvZGUgPSBlcnJvci5jb2RlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZW1haWwgb2YgdGhlIHVzZXIncyBhY2NvdW50IHVzZWQuXHJcbiAgICAgICAgICAgICAgICB2YXIgZW1haWwgPSBlcnJvci5lbWFpbDtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBmaXJlYmFzZS5hdXRoLkF1dGhDcmVkZW50aWFsIHR5cGUgdGhhdCB3YXMgdXNlZC5cclxuICAgICAgICAgICAgICAgIHZhciBjcmVkZW50aWFsID0gZXJyb3IuY3JlZGVudGlhbDtcclxuICAgICAgICAgICAgICAgIC8vIC4uLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuJChcIi5uYXZfX2l0ZW1cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgaWYoISQodGhpcykuaGFzQ2xhc3MoJ25hdl9faXRlbS0taGFzRHJhd2VyJykpe1xyXG4gICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5hdHRyKFwiaWRcIikuc3BsaXQoXCJfXCIpWzFdO1xyXG5cclxuICAgICAgICAkKFwiLm5hdj4qXCIpLnJlbW92ZUNsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAgICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIucGFnZXMuXCIgKyBpdGVtKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICAgICBpZighaW5pdGlhbGl6ZWRbaXRlbV0pe1xyXG4gICAgICAgICAgICBOYXZfZnVuY3Rpb25baXRlbV0oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuJChcIi5uYXZfX2RyYXdlcl9faXRlbVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgdmFyIGl0ZW0gPSAkKHRoaXMpLmF0dHIoXCJpZFwiKS5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgJChcIi5uYXY+KlwiKS5yZW1vdmVDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAkKFwiLm5hdl9fZHJhd2VyX19pdGVtXCIpLnJlbW92ZUNsYXNzKFwibmF2X19kcmF3ZXJfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIm5hdl9fZHJhd2VyX19pdGVtLS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAkKFwiLnBhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLnBhZ2VzLlwiICsgaXRlbSkucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICBpZiAoIWluaXRpYWxpemVkW2l0ZW1dKSB7XHJcbiAgICAgICAgTmF2X2Z1bmN0aW9uW2l0ZW1dKCk7XHJcbiAgICB9XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL2luZGV4LmpzIiwidmFyIEF0dGVuZCA9IHtcclxuICAgIG1vYmlsZTogZmFsc2UsXHJcblxyXG4gICAgaWQ6IFwiXCIsXHJcblxyXG4gICAgdmlld0lEOiBcIlwiLFxyXG4gICAgLy/qtIDrpqzsnpDqsIAg64uk66W4IOyCrOuejOydmCBJRCDtmZXsnbjspJFcclxuXHJcbiAgICBhdHRlbmRPYmo6IHt9LFxyXG5cclxuICAgIHNhbGFyeToge30sXHJcblxyXG5cclxuICAgIHdlZWtkYXlzOiBbXCLsnbxcIiwgXCLsm5RcIiwgXCLtmZRcIiwgXCLsiJhcIiwgXCLrqqlcIiwgXCLquIhcIiwgXCLthqBcIiwgXCLsnbxcIl0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24odV9pKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGdyYWRlID0gdV9pLmdyYWRlO1xyXG4gICAgICAgIHZhciBpZCA9IHVfaS5pZDtcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG5cclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0Kz0nPHNlbGVjdCBjbGFzcz1cIndvcmtlcl9zZWxlY3RvclwiPjwvc2VsZWN0Pic7XHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fdG9wXCI+JztcclxuICAgICAgICB0eHQgKz0gICAnPGRpdiBpZD1cImNhbGVuZGFyXCIgY2xhc3M9XCJhdHRlbmRfX2NhbGVuZGFyXCI+PC9kaXY+JztcclxuICAgICAgICB0eHQgKz0gICAnPGRpdiBjbGFzcz1cImF0dGVuZF9fd2Vla1wiPjwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9JzwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoXCI+PC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5hdHRlbmRcIikuaHRtbCh0eHQpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnlcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHRoYXQuc2FsYXJ5ID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgaWYoZ3JhZGUgPT09IDUpe1xyXG4gICAgICAgICAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5sb2FkaW5nVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VycyA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG1haWxJRCBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih1c2Vyc1ttYWlsSURdLmdyYWRlKjE8NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgbWFpbElEICsgJ1wiPicgKyB1c2Vyc1ttYWlsSURdLm5hbWUgKyAnPC9vcHRpb24+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5odG1sKHR4dCkudmFsKGlkKS5wcm9wKFwic2VsZWN0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIubG9hZGluZ1ZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZE9iaiA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCEkKFwiLmZjLWhlYWRlci10b29sYmFyXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld1JlbmRlciA6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFdvcmtIb3VyKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5vbihcImNsaWNrXCIsIFwiLmNvbmZpcm1cIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoISQoXCIuYXR0ZW5kXCIpLmhhc0NsYXNzKCdkaXNwbGF5Tm9uZScpKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJCh0aGlzKS5hdHRyKFwiZGlkXCIpKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5vbihcImNsaWNrXCIsIFwiLmNsb3NlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmICghJChcIi5hdHRlbmRcIikuaGFzQ2xhc3MoJ2Rpc3BsYXlOb25lJykpIHtcclxuICAgICAgICAgICAgICAgICQoXCIuYmxhY2tTY3JlZW5cIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcImJvZHlcIikua2V5dXAoZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGlmICghJChcIi5hdHRlbmRcIikuaGFzQ2xhc3MoJ2Rpc3BsYXlOb25lJykpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiLm1vZGFsIC5jb25maXJtXCIpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2RlID0gZS53aGljaDsgLy8gcmVjb21tZW5kZWQgdG8gdXNlIGUud2hpY2gsIGl0J3Mgbm9ybWFsaXplZCBhY3Jvc3MgYnJvd3NlcnNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJChcIi5tb2RhbCAuY29uZmlybVwiKS5hdHRyKFwiZGlkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5jaGFuZ2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld193b3JrZXIoaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICB2aWV3X3dvcmtlcjogZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYoaWQgPT09IHRoYXQuaWQpe1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fY2FsZW5kYXJcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX3dlZWtcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX21vbnRoXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19jYWxlbmRhclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICBpZih0aGF0LnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGF0LnZpZXdJRCkub2ZmKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK2lkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hdHRlbmRPYmogPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlvID0gdGhhdC52aWV3SUQ7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdJRCA9IGlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHlvLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoYXQuaWQgIT09IHRoYXQudmlld0lEKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0V29ya0hvdXIoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jYWxlbmRhcjogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5hdHRlbmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmZjLWRheVwiKS5odG1sKFwiXCIpO1xyXG5cclxuICAgICAgICBpZihkYXRhLmF0dGVuZCl7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmF0dGVuZDtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF0ZSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZUlEID0gZGF0ZS5zbGljZSgwLDQpK1wiLVwiK2RhdGUuc2xpY2UoNCw2KStcIi1cIitkYXRlLnNsaWNlKDYsOCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gMDtcclxuICAgICAgICAgICAgICAgIGxldCB0eHQgPSAnPHA+JytkYXRhW2RhdGVdWzBdLmZyb20rXCJ+XCIrZGF0YVtkYXRlXVswXS50bysnPC9wPic7XHJcbiAgICAgICAgICAgICAgICAvL+uRkO2DgOyehCDrgpjriKDshJwg6re866y07ZaI7Ja064+EIOuLrOugpeyXkCDtkZzsi5zrkJjripQg6rKD7J2AIOyyq+2DgOyehCDqt7zrrLTsi5zqsITrp4xcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWYgKz0gZGF0YVtkYXRlXVtpXS5kaWY7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHh0Kz0nPHA+JyArIE1hdGguZmxvb3IoZGlmLzYwKSArIFwi7Iuc6rCEIFwiKyBkaWYlNjAgK1wi67aEXCIrJzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgJCgnLmF0dGVuZCAuZmMtZGF5W2RhdGEtZGF0ZT1cIicrZGF0ZUlEKydcIl0nKS5odG1sKHR4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGR1ck1vbiA9IDA7XHJcbiAgICAgICAgICAgIGxldCB0aGlzTW9udGggPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLmF0dGVuZCAuZmMtZGF5XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZURvbSA9ICQoXCIuYXR0ZW5kIC5mYy1kYXlcIikuZXEoaSk7XHJcbiAgICAgICAgICAgICAgICBpZighZGF0ZURvbS5oYXNDbGFzcyhcImZjLW90aGVyLW1vbnRoXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGRhdGVEb20uYXR0cihcImRhdGEtZGF0ZVwiKS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc01vbnRoID0gZGF0ZVswXStkYXRlWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlWzBdK2RhdGVbMV0rZGF0ZVsyXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyTW9uICs9IGRhdGFbZGF0ZV1bal0uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdHh0ID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZigkKFwiLmF0dGVuZCAuZmMtdmlldy1jb250YWluZXJcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7ICAgLy/rrLTsobDqsbQgNuyjvFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3ZWVrRG9tID0gJChcIi5hdHRlbmQgLmZjLXdlZWtcIikuZXEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWtEdXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDc7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF5RG9tID0gd2Vla0RvbS5maW5kKFwiLmZjLWRheVwiKS5lcShqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBkYXlEb20uYXR0cihcImRhdGEtZGF0ZVwiKS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlWzBdK2RhdGVbMV0rZGF0ZVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrRHVyICs9IGRhdGFbZGF0ZV1ba10uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHdlZWtEdXI+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiYXR0ZW5kX193ZWVrX19ob3VyXCI+JysgTWF0aC5mbG9vcih3ZWVrRHVyLzYwKSsn7Iuc6rCEICcrd2Vla0R1ciU2MCsn67aEJyArJzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImF0dGVuZF9fd2Vla19faG91clwiPjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKFwiLmF0dGVuZCAuZmMtbGVmdFwiKS5jaGlsZHJlbihcImgyLmR1ck1vbnRoXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZCBoMi5kdXJNb250aFwiKS5odG1sKCcgKCcrTWF0aC5mbG9vcihkdXJNb24vNjApKyfsi5zqsIQgJytkdXJNb24lNjArJ+u2hCknKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZCAuZmMtbGVmdFwiKS5hcHBlbmQoJzxoMiBjbGFzcz1cImR1ck1vbnRoXCI+ICgnK01hdGguZmxvb3IoZHVyTW9uLzYwKSsn7Iuc6rCEICcrZHVyTW9uJTYwKyfrtoQpPC9oMj4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHh0ID0gJyc7ICAgLy92YXIg67m866i57J2A6rGwIOyVhOuLmC4g7JyE7JeQ7IScIOyEoOyWuCDtlojsnYwhXHJcblxyXG4gICAgICAgICAgICBsZXQgZnVsbE1vbnRoQm9udXMgPSAzMDQwMDtcclxuICAgICAgICAgICAgbGV0IGluc3VyYW5jZUZlZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBiYXNpYyA9IE1hdGgucm91bmQoZHVyTW9uLzYwKjc2MDApO1xyXG4gICAgICAgICAgICBsZXQgZnVsbFdlZWtCdW51cyA9IE1hdGgucm91bmQoKGR1ck1vbi82MCo3NjAwKSowLjIpO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYodGhpcy5pZCA9PT0gdGhpcy52aWV3SUQpe1xyXG4gICAgICAgICAgICAvLyAgICAgLy/rs7jsnbgg66qo65OcXHJcbiAgICAgICAgICAgIC8vICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImFjY291bnQvc2FsYXJ5L1wiK3RoaXNNb250aCtcIi9cIit0aGlzLmlkKS51cGRhdGUoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJhc2ljOiBiYXNpYyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsV2Vla0J1bnVzOiBmdWxsV2Vla0J1bnVzLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxNb250aEJvbnVzOiBmdWxsTW9udGhCb251c1xyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhY2NvdW50L3NhbGFyeS9cIit0aGlzTW9udGgrXCIvXCIrdGhpcy52aWV3SUQpLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYmFzaWM6IGJhc2ljLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxXZWVrQnVudXM6IGZ1bGxXZWVrQnVudXMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbE1vbnRoQm9udXM6IGZ1bGxNb250aEJvbnVzXHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+6riw67O46riJPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShiYXNpYykrIFwi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7qt7zrrLTsi5zqsIQgWCA3LDYwMOybkDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7KO87Zy07IiY64u5PC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShmdWxsV2Vla0J1bnVzKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq4sOuzuOq4ieydmCAyMCU8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuyXsOywqOyImOuLuTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoZnVsbE1vbnRoQm9udXMpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+NeyLnOqwhCDsg4Hri7kg6riw67O46riJPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZSBhdHRlbmRfX21vbnRoX19saW5lLS1yZWRcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7IKs7ZqM67O07ZeY66OMPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShpbnN1cmFuY2VGZWUpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6rWt66+87Jew6riIL+qzoOyaqeuztO2XmC/qsbTqsJXrs7Ttl5gg7LKt6rWs7JWhPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZSBhdHRlbmRfX21vbnRoX19saW5lLS1zdW1cIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7ZWp6rOEPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShiYXNpYyArIGZ1bGxXZWVrQnVudXMgKyBmdWxsTW9udGhCb251cyAtIGluc3VyYW5jZUZlZSkgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7quLDrs7jquIkgKyDso7ztnLTsiJjri7kgKyDsl7DssKjsiJjri7kgLSDsgqztmozrs7Ttl5jro4w8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19tb250aFwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dFdvcmtIb3VyOiBmdW5jdGlvbihkYXRlT2JqKXtcclxuICAgICAgICAvLyBjc3M6IG1vZHVsZXMvYXR0ZW5kLmNzc1xyXG4gICAgICAgIGxldCBkYXRlU2hvcnQgPSBtb21lbnQoZGF0ZU9iaikuZm9ybWF0KFwiTU0vRERcIik7XHJcbiAgICAgICAgbGV0IGRhdGVJRCA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoXCJZWVlZTU1ERFwiKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgICBpZih0aGlzLmF0dGVuZE9iai5hdHRlbmRbZGF0ZUlEXSl7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmF0dGVuZE9iai5hdHRlbmRbZGF0ZUlEXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImJsYWNrU2NyZWVuXCI+JztcclxuICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwiaW5wdXRXaW5kb3dcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8cCBjbGFzcz1cInRpdGxlXCI+JytkYXRlU2hvcnQrJyDqt7zrrLTsi5zqsIQ8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj4nO1xyXG4gICAgICAgIGlmKGRhdGFbMF0pe1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwiZmlyc3RfZnJvbVwiIHZhbHVlPVwiJytkYXRhWzBdLmZyb20rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJmaXJzdF90b1wiIHZhbHVlPVwiJytkYXRhWzBdLnRvKydcIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cImZpcnN0X2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwiZmlyc3RfdG9cIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxkaXYgY2xhc3M9XCJsaW5lIGNsZWFyZml4XCI+JztcclxuICAgICAgICBpZihkYXRhWzFdKXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCIgdmFsdWU9XCInK2RhdGFbMV0uZnJvbSsnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiIHZhbHVlPVwiJytkYXRhWzFdLnRvKydcIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImJvdHRvbVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAgICc8cCBjbGFzcz1cImNvbmZpcm1cIiBkaWQ9XCInK2RhdGVJRCsnXCI+7ZmV7J24PC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAgICc8cCBjbGFzcz1cImNsb3NlXCI+7Leo7IaMPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0Kz0gICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tb2JpbGUpe1xyXG4gICAgICAgICAgICAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLkFueVBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICBkYXRlVGltZUZvcm1hdDpcIkhIOm1tXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiI2ZpcnN0X2Zyb21cIikuZm9jdXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0V29ya0hvdXI6IGZ1bmN0aW9uKGRhdGUpe1xyXG5cclxuICAgICAgICBsZXQgd29yayA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgYWxsRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZigkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLmVxKGkpLnZhbCgpLmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgIGFsbEVtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGFsbEVtcHR5KXtcclxuICAgICAgICAgICAgaWYodGhpcy52aWV3SUQubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy52aWV3SUQrXCIvYXR0ZW5kL1wiK2RhdGUpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQrXCIvYXR0ZW5kL1wiK2RhdGUpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgIGxldCBkYXRlSUQgPSBkYXRlLnNsaWNlKDAsNCkgKyBcIi1cIitkYXRlLnNsaWNlKDQsNikgKyBcIi1cIitkYXRlLnNsaWNlKDYsOCk7XHJcbiAgICAgICAgICAgICQoJy5mYy1kYXlbZGF0YS1kYXRlPVwiJytkYXRlSUQrJ1wiXScpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZigkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuICAgICAgICAgICAgLy/si5zsnpHsi5zqsITsnbQg7J6YIOyeheugpeuQmOyXiOuCmCDtmZXsnbhcclxuXHJcbiAgICAgICAgICAgIGlmKGRhdGU8bW9tZW50KCkuZm9ybWF0KFwiWVlZWU1NRERcIikpe1xyXG4gICAgICAgICAgICAgICAgLy/smKTripgg7J207KCEIOydvOydmCDrgqDsp5zrpbwg64uk66Oo6rOgIOyeiOydhCDqsr3smrAgLSDqt7zrrLQg7KKF66OM7Iuc6rCE7J20IOyeheugpeuQmOyngCDslYrsnLzrqbQg7JWIIOuQqFxyXG4gICAgICAgICAgICAgICAgaWYoJChcIiNmaXJzdF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL+ydtOyghOydvOydtCDslYTri4jrjZTrnbzrj4Qg7JiI7IOBIOq3vOustOyLnOqwhOydtOudvOuPhCDsnoXroKXtlbTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi7JiI7IOBIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmcm9tID0gJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICBsZXQgdG8gPSAkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZyb21BID0gZnJvbS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgIGxldCB0b0EgPSB0by5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgIGxldCBkaWYgPSAodG9BWzBdKjEgLSBmcm9tQVswXSoxKSo2MCArICh0b0FbMV0qMSAtIGZyb21BWzFdKjEpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgdG86IHRvLFxyXG4gICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhbGVydChcIuq3vOustOyLnOqwhOydtCDsnpjrqrsg7J6F66Cl65CY7JeI7Iq164uI64ukLiBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZigkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRlPG1vbWVudCgpLmZvcm1hdChcIllZWVlNTUREXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI3NlY29uZF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOyYiOyDgSDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmcm9tID0gJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGxldCB0byA9ICQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmcm9tQSA9IGZyb20uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAodG9BWzBdKjEgLSBmcm9tQVswXSoxKSo2MCArICh0b0FbMV0qMSAtIGZyb21BWzFdKjEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgICAgICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg6re866y07Iuc6rCE7J20IOyemOuquyDsnoXroKXrkJjsl4jsirXri4jri6QuIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy52aWV3SUQubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLnZpZXdJRCtcIi9hdHRlbmQvXCIrZGF0ZSkuc2V0KHdvcmspO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkK1wiL2F0dGVuZC9cIitkYXRlKS5zZXQod29yayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwoXCJcIik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdHRlbmQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2F0dGVuZC5qcyIsImxldCBDaXR5ID0ge1xyXG4gICAgZGF0YToge30sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLmNpdHlcIikub24oXCJjbGlja1wiLCBcIi5yZWZyZXNoXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKFwi642w7J207YSw66W8IOunjuydtCDsnqHslYTrqLnsirXri4jri6QhIOygleunkCDstZzsi6DtmZTtlZjsi5zqsqDsirXri4jquYw/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2hTdGF0dXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8aDI+64+E7IucIOuNsOydtO2EsCDtmZXrs7TtmITtmak8L2gyPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJyZWZyZXNoXCI+7LWc7Iug7ZmUPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwid3JhcHBlclwiPic7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwibGluZSB0b3BcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwibmFtZVwiPuuPhOyLnOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzXCI+7IiZ7IaMPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X19zcG90c1wiPuq0gOq0keyngCDsoJXrpqw8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydFwiPuq1kO2GtTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fYXJlYVwiPuyngOyXrTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fcHJpY2VcIj7rrLzqsIA8L3A+JztcclxuICAgICAgICB0eHQrPSAnPC9kaXY+JztcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKHZhciBjb2RlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NvZGVdO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gY2l0eS5zdGF0dXM7XHJcblxyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJsaW5lXCIgaWQ9XCInICsgY2l0eS5jb2RlICsgJ1wiPjxwIGNsYXNzPVwibmFtZVwiPicgKyBjaXR5Lm5hbWUgKyAnPC9wPic7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLmhvdGVsID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzIHdlaWdodC0tYm9sZFwiPu2PieqwgCDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuaG90ZWwgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19ob3RlbHNcIj7rjbDsnbTthLAg7J6I7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzIGNvbG9yLS1yZWRcIj7rjbDsnbTthLAg7JeG7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMuc3BvdCA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzIHdlaWdodC0tYm9sZFwiPuygleuztOqygOymnSDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+MuywqOqygOymnTwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5zcG90ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHNcIj7tlansuZjquLA8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+7KCV67O0IOqygOymneykkTwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzIGNvbG9yLS1yZWRcIj7soJXrs7Qg7JeG7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0IHdlaWdodC0tYm9sZFwiPuuMgOykkeq1kO2GtSDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0XCI+642w7J207YSwIOyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydCBjb2xvci0tcmVkXCI+642w7J207YSwIOyXhuydjDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLmFyZWEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19hcmVhXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2FyZWEgY29sb3ItLXJlZFwiPlg8L3A+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5wcmljZSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3ByaWNlXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3ByaWNlIGNvbG9yLS1yZWRcIj5YPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nOyAvL2Nsb3NlIHdyYXBwZXJcclxuXHJcbiAgICAgICAgJChcIi5jaXR5XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignc2V0dGluZy9jaXRpZXMnKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGUoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZnJlc2hTdGF0dXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzJykub25jZShcInZhbHVlXCIsIHNuYXA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBjaWQgaW4gdGhhdC5kYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNpdHkpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsOiAwLCAvLzA6642w7J207YSw7JeG7J2MLCAxOuyImeyGjOuNsOydtO2EsOunjCDsnojsnYwsIDI67Y+J6rCA642w7J207YSwKOybjOuUqSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6IHRoYXQuZGF0YVtjaWRdLnN0YXR1cy5zcG90LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IDAsIC8v642w7J207YSw7JeG7J2MLCAxOuuplO2KuOuhnOuNsOydtO2EsOunjCDsnojsnYwsIDI66rCA6rO1642w7J207YSwKOudvOyduOuzhC4u65OxKSDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDBcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihjaXR5LmhvdGVscyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBob3RlbCA9IGNpdHkuaG90ZWxzW09iamVjdC5rZXlzKGNpdHkuaG90ZWxzKVswXV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5ob3RlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmhvdGVsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5tZXRybyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdHkubWV0cm9MaW5lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy50cmFuc3BvcnQgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy50cmFuc3BvcnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihjaXR5LmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuYXJlYSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihjaXR5LnByaWNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnByaWNlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsOiAwLCAvLzA6642w7J207YSw7JeG7J2MLCAxOuyImeyGjOuNsOydtO2EsOunjCDsnojsnYwsIDI67Y+J6rCA642w7J207YSwKOybjOuUqSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogMCwgLy/rjbDsnbTthLDsl4bsnYwsIDE666mU7Yq466Gc642w7J207YSw66eMIOyeiOydjCwgMjrqsIDqs7XrjbDsnbTthLAo65287J2467OELi7rk7EpIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogMFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhW2NpZF0uc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLnNldCh0aGlzLmRhdGEpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlKHRoYXQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgn7LWc7Iug7ZmUIOyZhOujjCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENpdHk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2NpdHkuanMiLCJpbXBvcnQgRmlyc3RfY2hlY2sgZnJvbSBcIi4vc3BvdC9maXJzdF9jaGVjay5qc1wiO1xyXG5pbXBvcnQgU2Vjb25kX2NvbWJpbmUgZnJvbSBcIi4vc3BvdC9zZW9uZF9jb21iaW5lLmpzXCJcclxuXHJcbnZhciBTcG90ID0ge1xyXG4gICAgY2l0aWVzOiB7fSxcclxuICAgIG9yZGVyOlwiXCIsXHJcbiAgICBkYXRhOiB7fSxcclxuICAgIGN1cnJlbnQ6XCJcIiwgLy/tmITsnqwg67O06rOg7J6I64qUIOuPhOyLnCBjaWQgLSBmaXJlYmFzZSByZWbsl5Agb2ZmIOuLrOq4sOychO2VtFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh1X2kpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBGaXJzdF9jaGVjay5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMub3JkZXIgPSB1X2kuc2V0dGluZy5vcmRlcjtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzJykub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpXHJcbiAgICAgICAgICAgIHRoYXQuY2l0aWVzID0gZGF0YTtcclxuICAgICAgICAgICAgdGhhdC5vcmRlciA9IHVfaS5zZXR0aW5nLm9yZGVyO1xyXG4gICAgICAgICAgICB0aGF0LmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfc3RhdHVzKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuYWN0aXZlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHRoYXQuY2l0aWVzW2NpZF0uc3RhdHVzLnNwb3Q7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIHN0YXR1cylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5vcmRlclwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQub3JkZXIgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICAgICAgdmFyIHVpZCA9IHVfaS5tYWlsO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigndXNlcnMvJyArIHVpZCArIFwiL3NldHRpbmcvb3JkZXJcIikuc2V0KHRoYXQub3JkZXIpO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfc3RhdHVzKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIucmV0dXJuXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX3N0YXR1cygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfc3RhdHVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5kYXRhO1xyXG5cclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzxoMj7qtIDqtJHsp4Ag642w7J207YSwIOygleumrCDtmITtmak8L2gyPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cIm9yZGVyXCIgaWQ9XCJhYmNcIj7qsIDrgpjri6TsiJw8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwib3JkZXJcIiBpZD1cImNoYW5nZWRcIj7siJjsoJXsi5zqsITsiJw8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwid3JhcHBlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwibGluZXIgbGluZXItLWhlYWRlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaXR5TmFtZVwiPuuPhOyLnOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+7IOB7YOcPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaGFyZ2VcIj7ri7Tri7nsnpA8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIHZhciBvcmRlckFycmF5ID0gW107XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXIgPT09IFwiYWJjXCIpIHtcclxuICAgICAgICAgICAgICAgIG9yZGVyQXJyYXkucHVzaCh7IGNpZDogY2lkLCBpZHg6IGNpdHkubmFtZSB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IFwiY2hhbmdlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBvcmRlckFycmF5LnB1c2goeyBjaWQ6IGNpZCwgaWR4OiBjaXR5Lm9yZGVyLmNoYW5nZWQgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3JkZXJBcnJheS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmlkeCA+IGIuaWR4ID8gMSA6IGEuaWR4IDwgYi5pZHggPyAtMSA6IDBcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB2YXIgc3RhdHVzQXJyYXkgPSBbXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3Bhbj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuPuyZhOujjDwvc3Bhbj48L3A+JyxcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuyZhOujjDwvc3Bhbj48L3A+J1xyXG4gICAgICAgIF1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmRlckFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSBvcmRlckFycmF5W2ldLmNpZDtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcblxyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJsaW5lclwiIGlkPVwiJyArIGNpZCArICdcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NpdHlOYW1lXCI+JyArIGNpdHkubmFtZSArICc8L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9IHN0YXR1c0FycmF5W2NpdHkuc3RhdHVzLnNwb3RdO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NoYXJnZVwiPuuLtOuLueyekDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JzsvL3dyYXBwZXIg64ur6riwXHJcblxyXG4gICAgICAgICQoXCIucGFnZXMuc3BvdFwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgJChcIiNcIiArIHRoaXMub3JkZXIpLmFkZENsYXNzKFwib3JkZXItLXNlbGVjdGVkXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX2NpdHk6IGZ1bmN0aW9uIChjaWQsIHN0YXR1cyl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyB0aGF0LmN1cnJlbnQpLm9mZihcInZhbHVlXCIpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyBjaWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQuY3VycmVudCA9IGNpZDtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaXR5TmFtZSA9IHRoYXQuY2l0aWVzW2NpZF0ubmFtZTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDEpIHsgICAvL+2YhOyerCDsoJXrs7TsiJjsp5Hsg4Htg5wg6rKA7KadXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuaHRtbCgnPGgyPicgKyBjaXR5TmFtZSArICcg7KCV67O06rKA7KadPC9oMj4nKS5hdHRyKCdjaWQnLCBjaWQpLmF0dHIoJ2NpdHlOYW1lJyxjaXR5TmFtZSkuYWRkQ2xhc3MoXCJjaXR5TmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBGaXJzdF9jaGVjay5pbmZsYXRlKGRhdGEuc3BvdHMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IDIpIHsgLy/tlansuZjquLDsnpHsl4VcclxuICAgICAgICAgICAgICAgICAgICBTZWNvbmRfY29tYmluZS5pbml0KClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAvLzLssKjqsoDspp3tmZTrqbTqs7wg7JmE66OM7ZmU66m07J2AIOuUsOuhnCDssKjsnbTqsIAg7JeG7J2MXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfslYTrrLTrn7Ag642w7J207YSw6rCAIOyXhuyKteuLiOuLpC4g642w7J207YSwIOyImOynkeydhCDrqLzsoIAg7KeE7ZaJ7ZW07KO87IS47JqULicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLm5hdl9faXRlbVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ25hdl9faXRlbS0taGFzRHJhd2VyJykpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIHRoYXQuY3VycmVudCkub2ZmKFwidmFsdWVcIik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5uYXZfX2RyYXdlcl9faXRlbSBcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdpZCcpID09PSAnbmF2X3Nwb3QnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgdGhhdC5jdXJyZW50KS5vZmYoXCJ2YWx1ZVwiKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcG90O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QuanMiLCJpbXBvcnQgQXV0b0NvbWJpbmUgZnJvbSAnLi9hdXRvQ29tYmluZS5qcyc7XHJcblxyXG52YXIgRmlyc3RfQ2hlY2sgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0UmVtYWluTnVtYmVyKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19yZW1haW5OdW1iZXJcIikudmFsKCkpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19ub2RhdGFcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2lkID0gJCh0aGlzKS5hdHRyKCdzaWQnKTtcclxuICAgICAgICAgICAgdGhhdC5zaXRlTm9kYXRhKHNpZCk7XHJcbiAgICAgICAgICAgIHRvYXN0KCfrjbDsnbTthLAg6rO167CxIOyymOumrCcpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy/sooztkZwg7JeG64qUIOq0gOq0keyngOydmCDsooztkZzrpbwg7J6F66Cl7ZWoXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3Nwb3REZWxldGVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmRlbGV0ZVNwb3QoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIiksICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIuY2hlY2tfX3Nwb3ROYW1lXCIpLmh0bWwoKSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy/sooztkZwg7JeG64qUIOq0gOq0keyngOydmCDsooztkZzrpbwg7J6F66Cl7ZWoXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX2NvbmZpcm1cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygneW9sbycpXHJcbiAgICAgICAgICAgIHRoYXQuaW5wdXRDb29yZGluYXRlKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19zcG90Q29vclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgc2l0ZU5vZGF0YTogZnVuY3Rpb24gKHNpZCkge1xyXG4gICAgICAgIHZhciBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlybShcIuuNsOydtO2EsOulvCDsoJXrp5Ag7JeG7JWx64uI6rmMIT9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpZCArIFwiL25vZGF0YVwiKS5zZXQodHJ1ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFJlbWFpbk51bWJlcjogZnVuY3Rpb24gKHNpdGUsIG51bWJlcikge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBjdXRObyA9IG51bWJlci50cmltKCkgKiAxO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSlcclxuXHJcbiAgICAgICAgaWYgKGN1dE5vIDwgMTAwKSB7XHJcbiAgICAgICAgICAgIHRvYXN0KFwiMTAw6rCcIOydtOyDgeydmCDsnqXshozrpbwg7Jyg7KeA7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKFwi7Iic7JyEIFwiICsgY3V0Tm8gKyBcIuychCDrr7jrp4wg7J6l7IaM66W8IOuqqOuRkCDsoJzqsbDtlanri4jri6QuIOunnuyKteuLiOq5jD9cIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXRPYmogPSB0aGlzLmRhdGEuc3BvdHNbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICBjdXRPYmoubGVuZ3RoID0gY3V0Tm87XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlKS5zZXQoY3V0T2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlU3BvdDogZnVuY3Rpb24gKHNpZCwgbmFtZSkge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlID0gc2lkLnNwbGl0KFwiX1wiKVswXTtcclxuICAgICAgICBsZXQgbm8gPSBzaWQuc3BsaXQoXCJfXCIpWzFdO1xyXG5cclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShuYW1lICsgXCIg7J6l7IaM66W8IOygnOqxsO2VqeuLiOuLpC4g6rOE7IaN7ZWg6rmM7JqUP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubykuc2V0KHsgZGVsZXRlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsnqXshozqsIAg7KCc6rGw65CY7JeI7Iq164uI64ukLlwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKG5vICsgXCLrsogg7J6l7IaM66W8IOygnOqxsO2VqeuLiOuLpC4g6rOE7IaN7ZWg6rmM7JqUP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubykuc2V0KHsgZGVsZXRlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsnqXshozqsIAg7KCc6rGw65CY7JeI7Iq164uI64ukLlwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dENvb3JkaW5hdGU6IGZ1bmN0aW9uIChzaWQsIGNvb3JUeHQpIHtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgc2l0ZSA9IHNpZC5zcGxpdChcIl9cIilbMF07XHJcbiAgICAgICAgbGV0IG5vID0gc2lkLnNwbGl0KFwiX1wiKVsxXTtcclxuICAgICAgICBsZXQgY29vciA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoY29vclR4dC5zcGxpdChcIixcIikubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXQgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVswXS50cmltKCkgKiAxO1xyXG4gICAgICAgICAgICBsZXQgbG5nID0gY29vclR4dC5zcGxpdChcIixcIilbMV0udHJpbSgpICogMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc05hTihsYXQpIHx8IGlzTmFOKGxuZykpIHtcclxuICAgICAgICAgICAgICAgIC8v7KKM7ZGcIOykkSDtlZjrgpjqsIBcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOu2gOygle2Zle2VmOqyjCDsnoXroKXrkJjsl4jsirXri4jri6RcIilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvb3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OiBsYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOiBsbmdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubyArIFwiL2Nvb3JcIikuc2V0KGNvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg67aA7KCV7ZmV7ZWY6rKMIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5oZWFkZXJcIikuYXBwZW5kKCc8cCBjbGFzcz1cInJldHVyblwiPuuPjOyVhOqwgOq4sDwvcD4nKVxyXG5cclxuICAgICAgICBsZXQgaGFzUHJvYmxlbSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgIGxldCBzZWFyY2hVcmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmtyL21hcHMvcGxhY2UvJyArICQoXCIuY2l0eU5hbWVcIikuYXR0cignY2l0eU5hbWUnKSArIFwiK1wiO1xyXG5cclxuICAgICAgICBsZXQgc2l0ZU9iaiA9IHtcclxuICAgICAgICAgICAgZ2c6IFwi6rWs6riAXCIsXHJcbiAgICAgICAgICAgIG52OiBcIuuEpOydtOuyhFwiLFxyXG4gICAgICAgICAgICB0YTogXCLtirjrpr3slrTrk5zrsJTsnbTsoIBcIixcclxuICAgICAgICAgICAgbHA6IFwi66Gg66as7ZSM656Y64ubXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiBzaXRlT2JqKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2l0ZUhhc1Byb2JsZW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yVHh0ID0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+7KKM7ZGc6rCAIOyeheugpeuQmOyngCDslYrsnYAg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICBsZXQgbm9TcG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3RUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7ruYTslrTsnojripQg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSwIO2ZleyduDwvcD4nXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGFbc2l0ZV0ubm9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcG90ID0gZGF0YVtzaXRlXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYXNDb29yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ydvOu2gOufrCDsgq3soJztlZwg6rSA6rSR7KeAIC0+IOuEmOyWtOqwhOuLpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5jb29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmNvb3IubG5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oc3BvdC5jb29yLmxuZyAqIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5jb29yLmxhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHNwb3QuY29vci5sYXQgKiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzQ29vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJyArIHNpdGUgKyAnXycgKyBpICsgJ1wiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8YSBjbGFzcz1cImNoZWNrX19zcG90TmFtZVwiIGhyZWY9XCInICsgc2VhcmNoVXJsICsgc3BvdC5uYW1lICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBzcG90Lm5hbWUgKyAnPC9hPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fc3BvdENvb3JcIiBwbGFjZWhvbGRlcj1cInh4Lnh4eHh4LCB4eC54eHh4eCDtmJXtg5wg7J6F66ClXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2NvbmZpcm1cIj7sooztkZwg7J6F66ClPC9wPjxwIGNsYXNzPVwiY2hlY2tfX3Nwb3REZWxldGVcIj7snqXshowg7IKt7KCcPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdfJyArIGkgKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90VHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX190eHRcIj4nICsgaSArICcg67KIIOq0gOq0keyngDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3Nwb3REZWxldGVcIj7snqXshowg7IKt7KCcPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9Db29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSBub0Nvb3JUeHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub1Nwb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vU3BvdFR4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdLmxlbmd0aCA+IDE1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFyZ2VPSyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxhcmdlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGFyZ2VEYXRhW3NpdGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8xNTDqsJwg7J207IOB7J2YIOuNsOydtO2EsOulvCDrs7TsnKDtlZjroKTrqbQg64+E7Iuc66qFL3Nwb3RzL2xhcmdlRGF0YS/sgqzsnbTtirjrqoXsnbQgdHJ1ZeudvOqzoCDrtoDsl6zrkJjslrTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXJnZU9LKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg7J6l7IaMIOuNsOydtO2EsOqwgCAxNTDqsJzrpbwg7LSI6rO8KCcgKyBkYXRhW3NpdGVdLmxlbmd0aCArICfqsJwp7ZWp64uI64ukLjwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJyArIHNpdGUgKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fcmVtYWluTnVtYmVyXCIgdmFsdWU9XCInICsgZGF0YVtzaXRlXS5sZW5ndGggKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19yZW1haW5MYXJnZURhdGFcIj7qsJzsnZgg7J6l7IaMIOycoOyngO2VmOq4sDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSw6rCAIOyhtOyerO2VmOyngCDslYrsirXri4jri6QuPC9wPidcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGUgY2hlY2tfX25vZGF0YVwiIHNpZD1cIicgKyBzaXRlICsgJ1wiPuuNsOydtO2EsOqwgCDsm5Drnpgg7JeG7J2EIOqyveyasCDtgbTrpq3tlbTso7zshLjsmqU8L3A+J1xyXG4gICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzog7JuQ656YIOyCrOydtO2KuCDrjbDsnbTthLDqsIAg7KG07J6s7ZWY7KeAIOyViuuKlCDqsr3smrDrpbwg64yA67mE7ZWcIOuyhO2KvOydhCDrp4zrk6Tqs6Agc2l0ZSDqsJLsnLzroZwgbm9kYXRhOiB0cnVl66W8IOuEo+yWtOykgOuLpC5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNpdGVIYXNQcm9ibGVtKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+67Cc6rKs65CcIOusuOygnOqwgCDsl4bsirXri4jri6Q8L3A+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzUHJvYmxlbSkge1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2ZpbmlzaFwiPuqygOyCrOulvCDrqqjrkZAg66eI7LOk7Iq164uI64ukPC9wPidcclxuICAgICAgICAgICAgJChcIi5zcG90IC53cmFwcGVyXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKCdjaWQnKTtcclxuICAgICAgICAgICAgdG9hc3QoXCLrsJzqsqzrkJwg66y47KCc6rCAIOyXhuyWtCDrjbDsnbTthLAg67OR7ZWp7J2EIOyLpOyLnO2VqeuLiOuLpC5cIik7XHJcblxyXG4gICAgICAgICAgICBBdXRvQ29tYmluZS5pbml0KGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi53cmFwXCIpLnNjcm9sbFRvcCgwKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaXJzdF9DaGVjaztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2ZpcnN0X2NoZWNrLmpzIiwiLy9maXJzdF9jaGVja+yXkOyEnOunjCBpbXBvcnRlZCDrkJjqs6Ag7IKs7Jqp65CoXHJcblxyXG52YXIgQXV0b0NvbWJpbmUgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICBsZXQgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlQXJyID0gW1wiZ2dcIiwgXCJscFwiLCBcIm52XCIsIFwidGFcIl07XHJcbiAgICAgICAgbGV0IGNvbWJpbmluZyA9IHt9O1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXRlQXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBzaXRlID0gc2l0ZUFycltqXTtcclxuICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdLm5vRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtzaXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtzaXRlXVtpXSAmJiAhZGF0YVtzaXRlXVtpXS5kZWxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2xkU3BvdCA9IGRhdGFbc2l0ZV1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+q4sOyhtCDsoJXrs7Trpbwgb2xkU3BvdOydtOudvOqzoCDtlZjsnpAuIOyDiOuhnOyatCDsiqTtjJ/soJXrs7Tsl5DripQg7J2066aE7J2EIO2VnC/smIHsnLzroZwg67aE7ZWg7ZWY6rOgIOuere2CueydhCDrtoDsl6ztlaAg6rKD7J2064ukLlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcG90ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga286IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yOiBvbGRTcG90LmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuazoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvW+qwgC3tnqNdLy50ZXN0KG9sZFNwb3QubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm5hbWUua28gPSBvbGRTcG90Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5lbiA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QucmFua1tzaXRlXSA9IGk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFNwb3QudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC51cmwgPSBvbGRTcG90LnVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRTcG90LnRhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudGFnID0gb2xkU3BvdC50YWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmluZ1tcInMwMFwiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudGVyIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczBcIiArIGNvdW50ZXJdID0gc3BvdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wic1wiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IC8v7ZWc67CU7YC0IOuPjOyVmOuLuVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBjb21iaW5lT2JqID0ge31cclxuICAgICAgICBsZXQgY29tYmluZWQgPSB7fVxyXG5cclxuICAgICAgICBmb3IgKHZhciBjb2RlIGluIGNvbWJpbmluZykge1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IGNvbWJpbmluZ1tjb2RlXTtcclxuICAgICAgICAgICAgY29tYmluZU9ialtjb2RlXSA9IHNwb3RcclxuICAgICAgICAgICAgY29tYmluZU9ialtjb2RlXS5jb21iaW5lID0ge307XHJcbiAgICAgICAgICAgIGxldCBoYXNDb21iaW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL+2Vqey5oCDqsoPsnbQg7JeG7Jy866m0IOuwlOuhnCBjb21iaW5lZCDsqr3snLzroZwg67O064K464ukLlxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgdENvZGUgaW4gY29tYmluaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29kZSA8IHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRTcG90ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbWJpbmluZ1t0Q29kZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdFNwb3Rba2V5XSA9IGNvbWJpbmluZ1t0Q29kZV1ba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRTcG90LmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGNhbGN1bGF0ZURpZihzcG90LmNvb3IsIHRTcG90LmNvb3IpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMjUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmVbdENvZGVdID0gdFNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb21iaW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaGFzQ29tYmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbWJpbmVkW2NvZGVdID0gY29tYmluZU9ialtjb2RlXTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb21iaW5lT2JqW2NvZGVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaWQgKyBcIi9zcG90c1wiKS5zZXQoe1xyXG4gICAgICAgICAgICBjb21iaW5pbmc6IGNvbWJpbmVPYmosXHJcbiAgICAgICAgICAgIGNvbWJpbmVkOiBjb21iaW5lZFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcy8nICsgY2lkICsgJy9zdGF0dXMvc3BvdCcpLnNldCgxKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXV0b0NvbWJpbmU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9hdXRvQ29tYmluZS5qcyIsInZhciBTZWNvbmRfY29tYmluZSA9IHtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY29uZF9jb21iaW5lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3Qvc2VvbmRfY29tYmluZS5qcyIsImxldCBBY2NvdW50ID0ge1xyXG4gICAgdXNlcjoge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBpZD1cImFjY291bnRDYWxlbmRhclwiIGNsYXNzPVwiYWNjb3VudF9fY2FsZW5kYXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5hY2NvdW50XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB1aWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVpZCAhPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJbdWlkXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YVt1aWRdLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJyNhY2NvdW50Q2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgIHZpZXdSZW5kZXI6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24gKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2FjY291bnQuanMiLCJsZXQgU3Vid2F5ID0ge1xyXG4gICAgbWFwOnt9LFxyXG4gICAgbWFya2VyOmZhbHNlLFxyXG4gICAgbWV0cm86W10sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5bG9cIilcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvbnljL21ldHJvXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdGhhdC5tZXRybyA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YndheU1hcCcpLCB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiA0MC43NDg0NCwgbG5nOiAtNzMuOTg1NjYgfSxcclxuICAgICAgICAgICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tYXAuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRTdWJ3YXkoZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZmluZFN1YndheTogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgbGV0IGNvb3IgPSB7XHJcbiAgICAgICAgICAgIGxhdDplLmxhdExuZy5sYXQoKSxcclxuICAgICAgICAgICAgbG5nOmUubGF0TG5nLmxuZygpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm1hcmtlcil7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnNldE1hcChudWxsKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGUubGF0TG5nLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgIGxldCBtZXRyb0luZm8gPSB7fVxyXG4gICAgICAgIGxldCBtZXRyb0J5U3RuID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDczOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvTmFtZSA9IHRoaXMubWV0cm9baV0ubmFtZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkaWYgPSBNYXRoLnJvdW5kKGNhbGN1bGF0ZURpZihjb29yLHRoaXMubWV0cm9baV0uY29vcikpO1xyXG5cclxuICAgICAgICAgICAgaWYoZGlmPDcwMCl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMubWV0cm9baV0ubGluZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gdGhpcy5tZXRyb1tpXS5saW5lW2tdLnNsaWNlKDAsMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1ldHJvSW5mb1tsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjxtZXRyb0luZm9bbGluZV0uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvSW5mb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyb05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0luZm9bbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldHJvTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG1ldHJvQnlTdG5bbWV0cm9OYW1lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdLmxpbmUgPSBtZXRyb0J5U3RuW21ldHJvTmFtZV0ubGluZS5jb25jYXQodGhpcy5tZXRyb1tpXS5saW5lKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5tZXRyb1tpXS5saW5lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWV0QXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBsaW5lIGluIG1ldHJvSW5mbykge1xyXG4gICAgICAgICAgICBtZXRBcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bGluZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6bWV0cm9JbmZvW2xpbmVdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkaWY6bWV0cm9JbmZvW2xpbmVdLmRpZlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXRTdG5BcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gbWV0cm9CeVN0bikge1xyXG4gICAgICAgICAgICBtZXRTdG5BcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bWV0cm9CeVN0bltuYW1lXS5saW5lLFxyXG4gICAgICAgICAgICAgICAgbmFtZTpuYW1lLFxyXG4gICAgICAgICAgICAgICAgZGlmOm1ldHJvQnlTdG5bbmFtZV0uZGlmXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWV0QXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZGlmID4gYi5kaWYgPyAxIDogYS5kaWYgPCBiLmRpZiA/IC0xIDogMDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIG1ldFN0bkFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmRpZiA+IGIuZGlmID8gMSA6IGEuZGlmIDwgYi5kaWYgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3RpdGxlXCI+7Jet67OEPC9wPidcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19kaXZcIj4nXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRTdG5BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX3N0bk5hbWVcIj4nKyBtZXRTdG5BcnJheVtpXS5uYW1lICsgJ+yXrTwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fZGlmXCI+JysgTWF0aC5jZWlsKG1ldFN0bkFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTGluZVwiPidcclxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBtZXRTdG5BcnJheVtpXS5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihtZXRTdG5BcnJheVtpXS5saW5lW2tdLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTmFtZSBsbl8nK21ldFN0bkFycmF5W2ldLmxpbmVba10rJ1wiPicrbWV0U3RuQXJyYXlbaV0ubGluZVtrXSArICc8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICB0eHQrPSc8cCBjbGFzcz1cInN1YndheV9faW5mb19fdGl0bGVcIj7rhbjshKDrs4Q8L3A+J1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpdlwiPidcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2xpbmVcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lTmFtZSBsbl8nK21ldEFycmF5W2ldLmxpbmUrJ1wiPicrbWV0QXJyYXlbaV0ubGluZSArICc8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fZGlmXCI+JysgTWF0aC5jZWlsKG1ldEFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19zdG5OYW1lXCI+JysgbWV0QXJyYXlbaV0ubmFtZSArICfsl608L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgJChcIi5zdWJ3YXlfX2luZm9cIikuaHRtbCh0eHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdWJ3YXk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3N1YndheS5qcyIsImltcG9ydCBTZXRIb3RlbEluZm8gZnJvbSBcIi4vaG90ZWwvc2V0SG90ZWxJbmZvXCI7XHJcbmltcG9ydCBTZXRBcmVhIGZyb20gXCIuL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhXCI7XHJcblxyXG52YXIgSG90ZWwgPSB7XHJcblxyXG5cclxuICAgIC8vaW5mbGF0Ze2VmOuptCDtmLjthZTsnYQg66eM65Ok7Ja064K06riwIOychO2VnCDsoJXrs7Qg7IiY7KeRIOyDge2DnOqwgCDtkZzsi5zrkKggLT4gXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLm9uKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGVfc3RhdHVzKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuc3RhdHVzX19tYWtlX19ob3RlbFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSAkKHRoaXMpLmF0dHIoJ2NpZCcpO1xyXG4gICAgICAgICAgICB2YXIgY2l0eU5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcuc3RhdHVzX19jaXR5JykuaHRtbCgpO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIGNpdHlOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuaG90ZWxfX2FsZXJ0X19jb25maXJtXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChcIi5ob3RlbF9fYWxlcnRfX3dyYXBcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuaG90ZWxcIikub24oXCJjbGlja1wiLCBcIi5jaXR5QXJlYV9fZmluaXNoXCIsIGZ1bmN0aW9uICgpIHsgIC8vc2V0QXJlYeulvCDrgZ3rgrzrlYxcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykuYXR0cignY2lkJyk7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5vbmNlKCd2YWx1ZScsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhW2hpZF0uYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2hpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycrY2lkKycvaG90ZWxzJykuc2V0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcy8nICsgY2lkICsgJy9zdGF0dXMvYXJlYScpLnNldCgyKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX2NpdHk6IGZ1bmN0aW9uKGNpZCwgY2l0eU5hbWUpe1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycrY2lkKS5vbmNlKCd2YWx1ZScsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgdmFyIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIGFsZXJ0TW9kYWwgPSAnJztcclxuICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPGRpdiBjbGFzcz1cImhvdGVsX19hbGVydF9fd3JhcFwiPic7XHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gICAgICc8ZGl2IGNsYXNzPVwiaG90ZWxfX2FsZXJ0XCI+JztcclxuXHJcbiAgICAgICAgICAgIGlmKCFkYXRhKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuq0gOq0keyngCDsoJXrs7TqsIAg7JWE7KeBIOygleumrOuQmOyngCDslYrslZjsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7rjIDspJHqtZDthrUg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPu2OuOydmOyLnOyEpCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+7KeA7Jet6rWs67aEIOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuc3BvdHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5zcG90cy5yYW5rZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+6rSA6rSR7KeAIOygleuztOqwgCDslYTsp4Eg7KCV66as65CY7KeAIOyViuyVmOyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7qtIDqtJHsp4Ag7KCV67O06rCAIOyVhOyngSDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5tZXRybykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuuMgOykkeq1kO2GtSDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZighZGF0YS5tZXRyb0xpbmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuuMgOykkeq1kO2GtSDsoJXrs7TqsIAg7KCV66as65CY7KeAIOyViuyVmOyKteuLiOuLpChtZXRyb0xpbmUg7JeG7J2MKS48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5sb2NhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPu2OuOydmOyLnOyEpCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoZGF0YS5hcmVhID09PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBTZXRBcmVhLmluZmxhdGUoY2l0eU5hbWUsIGNpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdCgn7KeA7JetIOyEpOygleydhCDrqLzsoIAg7KeE7ZaJ7ZWp64uI64ukJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8ZGl2IGNsYXNzPVwiaG90ZWxfX2FsZXJ0X19jb25maXJtXCI+7ZmV7J24PC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzwvZGl2PjwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICBpZihjaGVjayl7XHJcbiAgICAgICAgICAgICAgICBTZXRIb3RlbEluZm8uaW5pdChkYXRhLCBjaWQsIGNpdHlOYW1lKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmhvdGVsXCIpLmFwcGVuZChhbGVydE1vZGFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX3N0YXR1czogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxoMj7siJnshowg66as7Iqk7Yq4PC9oMj4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+JztcclxuXHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwic3RhdHVzX19saW5lclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19uYW1lXCI+64+E7Iuc66qFPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19tYWtlXCI+7IiZ7IaMIOuNsOydtO2EsDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAgICAgICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj7quLDrs7gg7Zi47YWU642w7J207YSwPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19hcmVhXCI+7KeA7Jet7KCV67O0PC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19zcG90XCI+6rSA6rSR7KeA7KCV67O0PC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj7rjIDspJHqtZDthrXsoJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gY2l0eS5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJzdGF0dXNfX2xpbmVyXCI+JztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAgICAgICc8cCBjbGFzcz1cInN0YXR1c19fY2l0eVwiPicrY2l0eS5uYW1lKyc8L3A+JztcclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuaG90ZWwgPT09IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2VcIj7snojsnYw8L3A+JztcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19tYWtlIHN0YXR1c19fbWFrZV9faG90ZWxcIiAgY2lkPVwiJyArIGNpdHkuY29kZSArICdcIj7sl4bsnYwgKO2BtOumre2VtCDrp4zrk6TquLApPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoc3RhdHVzLmhvdGVsPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2hvdGVsXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoc3RhdHVzLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19hcmVhXCI+WDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMuc3BvdCA+IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19zcG90XCI+TzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19zcG90XCI+WDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fdHJhbnNwb3J0XCI+TzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5ob3RlbFwiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb3RlbDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC5qcyIsImltcG9ydCBTZXRMb2NhbCBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0TG9jYWwuanNcIjtcclxuaW1wb3J0IENhbGN1bGF0ZV9DaXR5IGZyb20gXCIuL2NhbGN1bGF0ZUNpdHlJbmZvLmpzXCI7XHJcblxyXG52YXIgU2V0SG90ZWxJbmZvID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2lkLCBjaXR5TmFtZSl7XHJcbiAgICAgICAgLy9zdGF0dXNDaGVjayDsp4TtlolcclxuICAgICAgICB2YXIgY2hlY2tUeHQgPSAnJztcclxuXHJcbiAgICAgICAgdmFyIGhvdGVsID0gZGF0YS5ob3RlbHNbT2JqZWN0LmtleXMoZGF0YS5ob3RlbHMpWzBdXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhPYmplY3Qua2V5cyhkYXRhLmhvdGVscykpO1xyXG5cclxuICAgICAgICB2YXIgc3RhdHVzID0ge1xyXG4gICAgICAgICAgICBsb2NhbDoge1xyXG4gICAgICAgICAgICAgICAgYXRtOiB7IC8vMDog642w7J207YSwIOyXhuydjCwgMTog66eM65OkIOyImCDsnojsnYwsIDI6IOyhtOyerO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2E6MCxcclxuICAgICAgICAgICAgICAgICAgICBjaXRpOjBcclxuICAgICAgICAgICAgICAgIH0sICBcclxuICAgICAgICAgICAgICAgIGZvb2Q6IDAsXHJcbiAgICAgICAgICAgICAgICBtZXRybzogMCxcclxuICAgICAgICAgICAgICAgIHNwb3Q6MFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYXNzZXNzbWVudDoge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0OjAsXHJcbiAgICAgICAgICAgICAgICBzYWZldHk6MCxcclxuICAgICAgICAgICAgICAgIHRoZW1lOjAsXHJcbiAgICAgICAgICAgICAgICBjb252ZW5pZW5jZTowXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoaG90ZWwubG9jYWwpIHtcclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLmF0bSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaG90ZWwubG9jYWwuYXRtKSkgeyAvL1ZJU0EgQVRN7J20IOygleumrOuQmOyngCDslYrsnYAg7ZiV7YOc66GcIOuTpOyWtOqwgOyeiOuKlCDsg4Htg5xcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLnZpc2EgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIFNldExvY2FsLnZpc2FBVE0oZGF0YS5ob3RlbHMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy9hdG3qsJ3ssrTrpbwg6rCA7KeA6rOgIOyeiOuKlCDsg4Htg5wgLSDrsJjrk5zsi5wgdmlzYSBhdG3snbQg65Ok7Ja06rCAIOyeiOyWtOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLnZpc2EgPSAyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwuYXRtLmNpdGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS5jaXRpID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubG9jYWwuYXRtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v7KSR7JqUOiBDSVRJ7J6R7JeF7J2AIFZJU0HsnpHsl4Ug7ZuE7JeQIOydtOujqOyWtOyguOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vbG9jYWzsl5AgYXRt7J20IOyXhuydjCAtPiDruYTsnpAg7LaU7Lac65CcIOyggeydtCDsl4bsnYxcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubG9jYWwuYXRtKSB7IC8v6re4IOqyveyasOyXkOuPhCBDSVRJ64qUIFJBV+uNsOydtO2EsOuhnCDsobTsnqztlaAg7IiYIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/spJHsmpQ6IENJVEnsnpHsl4XsnYAgVklTQeyekeyXhSDtm4Tsl5Ag7J2066Oo7Ja07KC47JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubG9jYWwuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwubWV0cm8pIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZXRyb0xpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwuc3BvdCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc3BvdHMucmFua2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMDsgLy9WSVNB64qUIOustOyhsOqxtCDtmLjthZQg66Gc7Lus7JeQIOyngeygkSDrk6TslrTqsIDrr4DroZwg7Zi47YWUIOuhnOy7rCDqsr3roZzqsIAg7JeG64uk64qUIOqyg+ydgCBWSVNB6rCAIOyXhuuLpOuKlCDqsoMuXHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5sb2NhbC5hdG0pIHsgLy9jaXRp64KYIHZpc2HripQg7Zi47YWUIOuhnOy7rOydtCDslYTri4wg64+E7IucIOuhnOy7rOyXkCDsoIDsnqXrkKAg7IiYIOyeiOydjC5cclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubWV0cm9MaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuc3BvdHMucmFua2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoZWNrVHh0ICs9ICc8aDIgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190aXRsZVwiPu2YuO2FlCDso7zrs4DsoJXrs7Q8L2gyPic7XHJcblxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLmF0bS52aXNhID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIFZJU0EgQVRN7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcgVklTQSBBVE3soJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA7J6lIOqwgOq5jOyatCBBVE3qs7wgMjTsi5zqsIQgQVRN7J2EIOy2lOy2nO2VqeuLiOuLpC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9PT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHQgY29sb3ItLXJlZFwiPk5vIERhdGEgLSBWSVNBIEFUTeygleuztOqwgCDsl4bsirXri4jri6QuIFZJU0EgQVRNIGxvY2F0b3Lsl5DshJwg7KCV67O066W8IOuovOyggCDtgazroaTrp4HtlbTso7zshLjsmpQuPC9wPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLmF0bS5jaXRpID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIENJVEkgQVRN7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcgQ0lUSSBBVE3soJXrs7Qg7ZmV7J24LiDqsIDsnqUg6rCA6rmM7Jq0IENJVEkgQVRN7J2EIOy2lOy2nO2VqeuLiOuLpC48L3A+JztcclxuICAgICAgICB9IC8vIGNpdGkgc3RhdHVzIDDsnYAg7JeG7J2MLlxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLmZvb2QgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwg7Iud66OM7ZKI7KCQL+2OuOydmOygkCDsoJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmZvb2QgPT09IDEpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIOyLneujjO2SiOygkC/tjrjsnZjsoJAg7KCV67O0IO2ZleyduC4g7Zi47YWU67OE66GcIOqwgOq5jOyatCDsi53ro4ztkojsoJAg7LaU7LacLjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmZvb2QgPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0g64+E7IucIOyLneujjO2SiOygkC/tjrjsnZjsoJAg7KCV67O06rCAIOyXhuyKteuLiOuLpC4g66i87KCAIOygleuztOulvCDsnoXroKXtlbTso7zshLjsmpQuPC9wPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLm1ldHJvID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIOyngO2VmOyyoC/rjIDspJHqtZDthrUg7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5tZXRybyA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg7KeA7ZWY7LKgL+uMgOykkeq1kO2GtSDsoJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA6rmM7Jq0IOyngO2VmOyyoCDstpTstpwuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwubWV0cm8gPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0g64+E7IucIOyngO2VmOyyoC/rjIDspJHqtZDthrUg7KCV67O06rCAIOyXhuyKteuLiOuLpC4g66i87KCAIOygleuztOulvCDsnoXroKXtlbTso7zshLjsmpQuPC9wPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLnNwb3QgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwg6rSA6rSR7KeAIOygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuc3BvdCA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg6rSA6rSR7KeAIOygleuztCDtmZXsnbguIO2YuO2FlOuzhOuhnCDqsIDquYzsmrQg6rSA6rSR7KeAIOy2lOy2nC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5zcG90ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIOuPhOyLnCDqtIDqtJHsp4Ag7Iic7JyE6rCAIOyVhOyngSDtmZXsoJXrkJjsp4Ag7JWK7JWY7Iq164uI64ukLiDrqLzsoIAg7ZmV7J247ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coY2hlY2tUeHQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0SG90ZWxJbmZvO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby5qcyIsInZhciBTZXRMb2NhbCA9IHtcclxuXHJcbiAgICBkYXRhOiB7IC8v642w7J207YSwIOq1rOyhsCDtjIzslYXtlZjquLAg7JyE7ZW0IOqwgOyguOuLpOuGk+ydgOuFgOyEnS4g7IKs7Jqp7ZWY7KeAIOunkOqygyFcclxuICAgICAgICBvdmVyYWxsOiB7XHJcbiAgICAgICAgICAgIGF0bTogMCwgLy/tmLjthZQg64u5IOuwmOqyvSAxNjDrr7jthLAg64K0IO2Pieq3oOyggeycvOuhnCBBVE3snbQg66qHIOqwnCDsnojripTsp4BcclxuICAgICAgICAgICAgbWV0cm86IHtcclxuICAgICAgICAgICAgICAgIGRpc3RhbmNlOiAwLCAvL+2YuO2FlCDrs4Qg6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqDsl63snbQg7Y+J6regIOuqhyBNIOuWqOyWtOyguOyeiOuKlOyngFxyXG4gICAgICAgICAgICAgICAgbnVtYmVyOiAwLCAvL+2YuO2FlCDrs4Qg67CY6rK9IDUwMG0g64K0IOyngO2VmOyyoOyXreydtCDrqocg6rCcIOyeiOuKlOyngFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmb29kOiB7XHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZTogMCwgLy/tmLjthZQg67OEIOqwgOyepSDsi53ro4ztkojsoJDsnbQg7Y+J6regIOuqhyBNIOuWqOyWtOyguOyeiOuKlOyngFxyXG4gICAgICAgICAgICAgICAgbnVtYmVyOiAwLCAvL+2YuO2FlCDrs4Qg67CY6rK9IDUwMG0g64K0IOyLneujjO2SiOygkOydtCDrqocg6rCcIOyeiOuKlOyngFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBieUFyZWE6IFtdIC8v7JyEIOygleuztOulvCDsp4Dsl63rs4TroZwg64u07J2MXHJcbiAgICB9LFxyXG5cclxuICAgIHZpc2FBVE06IGZ1bmN0aW9uKGhvdGVscyl7XHJcbiAgICAgICAgdmFyIGF0bV9vdmVyYWxsID0gW107XHJcbiAgICAgICAgdmFyIGF0bV9ieUFyZWEgPSBbXTtcclxuXHJcbiAgICAgICAgdmFyIGVyck5vID0gMDtcclxuICAgICAgICB2YXIgdG90YWxObyA9IDA7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgaGlkIGluIGhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSBob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0bUFyciA9IGhvdGVsLmxvY2FsLmF0bTtcclxuICAgICAgICAgICAgICAgIHZhciBhdG1PYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDogYXRtQXJyWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhbmsyNDpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbjE2MDowXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGF0bU9iai5uZWFyZXN0LmRpZiA9IGNhbGN1bGF0ZURpZihhdG1BcnJbMF0uY29vciwgaG90ZWwuY29vcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoYXRtQXJyKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0bUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXRtID0gYXRtQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlmID0gY2FsY3VsYXRlRGlmKGF0bS5jb29yLCBob3RlbC5jb29yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjwxNjAuMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdG1PYmouaW4xNjArKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhdG0ub3duZXIuaW5jbHVkZXMoXCJCQU5LXCIpJiZhdG0uaXMyNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWF0bU9iai5iYW5rMjQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdG1PYmouYmFuazI0ID0gYXRtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdG1PYmouYmFuazI0LmRpZiA9IGRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyBcclxuICAgICAgICAgICAgICAgICAgICBlcnJObysrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmF0bSA9IGF0bU9iajtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYXRtX2J5QXJlYVtob3RlbC5hcmVhXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0bV9ieUFyZWFbaG90ZWwuYXJlYV0ucHVzaChhdG1PYmouaW4xNjApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhdG1fYnlBcmVhW2hvdGVsLmFyZWFdID0gW2F0bU9iai5pbjE2MF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhdG1fb3ZlcmFsbC5wdXNoKGF0bU9iai5pbjE2MCk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXJyTm8rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b3RhbE5vKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhob3RlbHMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGF0bV9ieUFyZWEpO1xyXG5cclxuICAgICAgICBpZiAoZXJyTm8gPiAyKSB7IC8vVklTQSBBVE0gZmluZGVy6rCAIOykkeqwhOyXkCDrgYrqsrzsnYQg6rCA64ql7ISxIOuGkuydjFxyXG4gICAgICAgICAgICB0b2FzdChgJHt0b3RhbE5vfSDqsJzsnZgg7Zi47YWUIOykkSAke2Vyck5vfSDqsJzsnZgg7Zi47YWU7JeQIFZJU0EgQVRNIOygleuztOqwgCDsl4bsirXri4jri6QuIO2ZleyduCDtm4Qg7J6s7Iuc64+E7ZW07KO87IS47JqUYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0TG9jYWw7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldExvY2FsLmpzIiwidmFyIENhbGN1bGF0ZV9DaXR5ID0ge1xyXG4gICAgXHJcblxyXG4gICAgYXRtOiBmdW5jdGlvbigpe1xyXG5cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhbGN1bGF0ZV9DaXR5O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL2NhbGN1bGF0ZUNpdHlJbmZvLmpzIiwidmFyIFNldEFyZWEgPSB7XHJcbiAgICBtYXA6e30sXHJcbiAgICBtYXJrZXI6e30sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24gKGNpdHlOYW1lLCBjaWQpIHtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5tYXJrZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyW2hpZF0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyID0ge307XHJcblxyXG4gICAgICAgICAgICB2YXIgdHh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGgyPicgKyBjaXR5TmFtZSArICcg7IiZ7IaMIOyngOyXrSDqtazrtoQ8L2gyPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiY2l0eUFyZWFfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgaWQ9XCJjaXR5QXJlYV9fbWFwXCI+PC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiXCJjaXR5QXJlYT4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eUFyZWFfX3dvcmRcIj48L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjaWQ9XCInICsgY2lkICsgJ1wiIGNsYXNzPVwiY2l0eUFyZWFfX2ZpbmlzaFwiPuyZhOujjOyymOumrDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JzsgLy9jbG9zZSB3cmFwcGVyXHJcblxyXG4gICAgICAgICAgICAkKFwiLnBhZ2VzLmhvdGVsXCIpLmh0bWwodHh0KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5QXJlYV9fbWFwJyksIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogNDAuNzQzMTk1NzkzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzogLTczLjk4OTE3OTU0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgem9vbTogMTNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGhpZCBpbiBkYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhvdGVsID0gZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgICAgIHZhciBub0FyZWEgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaG90ZWwuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5hcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmVhQ29vciA9IGRhdGEuYXJlYVtpXS5jb29yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5BcmVhKGhvdGVsLmNvb3IsIGFyZWFDb29yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXJlYSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0FyZWEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vQXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcltoaWRdID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogaG90ZWwuY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJycgKyBoaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyBjaWQgKyAnL2hvdGVscycpLnVwZGF0ZShkYXRhLmhvdGVscyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXRBcmVhO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0QXJlYS5qcyJdLCJzb3VyY2VSb290IjoiIn0=