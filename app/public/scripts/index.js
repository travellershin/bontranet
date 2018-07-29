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

var _spot = __webpack_require__(11);

var _spot2 = _interopRequireDefault(_spot);

var _subway = __webpack_require__(14);

var _subway2 = _interopRequireDefault(_subway);

var _account = __webpack_require__(15);

var _account2 = _interopRequireDefault(_account);

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
    },
    calc: function calc() {},
    hotel: function hotel() {},
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
            var _mail = user.email.split('@')[0];

            firebase.database().ref("users").once("value", function (snap) {
                var data = snap.val();

                //아래 내용을 바꾸면 if (!isUser) 부분에도 반드시 반영해줄것
                // for (var gid in data) {
                //     data[gid].
                // }

                // firebase.database().ref("users").update(data);

                if (data[_mail]) {
                    u_i = data[_mail];
                    var grade = u_i.grade * 1;

                    if (grade > 0) {
                        _attend2.default.init(data[_mail]);
                        if (grade === 5) {
                            _account2.default.init(_mail);
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
                        firebase.database().ref('users/' + userMail).set({
                            grade: 0,
                            name: user.displayName,
                            mail: userMail,
                            setting: {
                                spot: {
                                    order: "abc"
                                }
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

var _hotel = __webpack_require__(7);

var _hotel2 = _interopRequireDefault(_hotel);

var _area = __webpack_require__(10);

var _area2 = _interopRequireDefault(_area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//지역 데이터 입력

//관광지 정리
var City = {
    codeData: {},

    listener: function listener() {
        var that = this;

        $(".cityCodeView").on("click", ".spots", function () {
            var cid = $(this).parent().attr("id");
            var name = $(this).parent().children(".name").html();
            _spot2.default.init($(this).attr('status'), cid, name);
        });
        $(".cityCodeView").on("click", ".hotels", function () {
            var cid = $(this).parent().attr("id");
            var name = $(this).parent().children(".name").html();
            _hotel2.default.init(cid, name);
        });
        $(".cityCodeView").on("click", ".area", function () {
            var cid = $(this).parent().attr("id");
            var name = $(this).parent().children(".name").html();
            _area2.default.init(cid, name);
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

        this.inflate_cityCodeView(this.codeData);
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

    inflate_cityCodeView: function inflate_cityCodeView(data) {
        var txt = '<div class="line top"><p class="name">도시명</p><p class="hotels">숙소</p><p class="spots">관광지 정리</p><p class="area">지역</p><p class="transport">교통</p><p class="price">물가</p></div>';

        for (var code in data) {
            var city = data[code];
            var status = city.status;

            txt += '<div class="line" id="' + city.code + '"><p class="name">' + city.name + '</p>';

            if (status.hotel) {
                txt += '<p class="hotels">O</p>';
            } else {
                txt += '<p class="hotels">X</p>';
            }
            console.log(status);
            if (status.spot === 4) {
                txt += '<p class="spots" status="' + status.spot + '">데이터 확보 완료</p>';
            } else if (status.spot === 3) {
                txt += '<p class="spots" status="' + status.spot + '">데이터 선별, 2차 검증중</p>';
            } else if (status.spot === 2) {
                txt += '<p class="spots" status="' + status.spot + '">데이터 합치기 작업중</p>';
            } else if (status.spot === 1) {
                txt += '<p class="spots" status="' + status.spot + '">데이터 수집, 1차 검증중</p>';
            } else {
                txt += '<p class="spots" status="' + status.spot + '">데이터 없음</p>';
            }

            if (status.area) {
                txt += '<p class="area">O</p>';
            } else {
                txt += '<p class="area">X</p>';
            }

            if (status.transport) {
                txt += '<p class="transport">O</p>';
            } else {
                txt += '<p class="transport">X</p>';
            }

            if (status.prices) {
                txt += '<p class="price">O</p>';
            } else {
                txt += '<p class="price">X</p>';
            }
            txt += '</div>';
        }

        $(".cityCodeView").html(txt);
    },

    init: function init() {
        var _this = this;

        this.listener();

        firebase.database().ref('setting/cities').on("value", function (snap) {
            $(".loadingView").addClass("displayNone");

            var data = snap.val();
            _this.inflate_cityCodeView(data);
            _this.codeData = data;
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

var _os = __webpack_require__(6);

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

        $(".spot .check").on("click", ".check__nodata", function () {
            var sid = $(this).attr('sid');
            that.siteNodata(sid);
            toast('데이터 공백 처리');
        });
    },

    init: function init(status, cid, name) {
        var _this = this;

        var that = this;
        firebase.database().ref('cities/' + cid).once("value", function (snap) {
            $(".loadingView").addClass("displayNone");

            var data = snap.val();
            _this.data = snap.val();

            if (status == 4) {} else if (status == 3) {
                _verifying2.default.init(data.spots.combined);
            } else if (status == 2) {
                _manualCombine2.default.init(data.spots);
            } else if (status == 1) {
                _this.firstCheck(data.spots);
            } else {}

            _this.listener();

            $(".cityCodeView").addClass("displayNone");
            $(".city .spot").removeClass("displayNone");
            $(".cityName").html(name).attr("id", cid);
        });
    },

    autoCombine__spotRestructure: function autoCombine__spotRestructure() {
        var city = $(".cityName").attr("cid");
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

        var city = $(".cityName").attr("cid");

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
        var city = $(".cityName").attr("cid");
        var site = sid.split("_")[0];
        var no = sid.split("_")[1];

        if (confirm(name + " 장소를 제거합니다. 계속할까요?")) {
            firebase.database().ref("cities/" + city + "/spots/" + site + "/" + no).set({ deleted: true });
            $("#" + sid).remove();
            toast("장소가 제거되었습니다.");
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
            spot.sid = sid;
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
        var txt = '';

        var spotArray = [];

        for (var i = 0; i < rankArray.length; i++) {
            var data = this.data;

            spotArray.push(this.data[rankArray[i].sid]);

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
            if (data[_sid].name.ko.includes('<div class') || data[_sid].name.ko.includes('<div class')) {
                delete data[_sid];
            } else {
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
        }
        $(".verifying__box").html(txt);

        firebase.database().ref("cities/" + $('.cityName').attr('id') + "/spots/ranked").set(spotArray);
        console.log(spotArray);
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
        } else {
            console.log(data.ranked);
        }
    }
};

exports.default = Verify;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _transport = __webpack_require__(8);

var _transport2 = _interopRequireDefault(_transport);

var _safety = __webpack_require__(9);

var _safety2 = _interopRequireDefault(_safety);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hotel = {
    city: "",
    cityName: "",

    init: function init(cid, name) {
        var _this = this;

        $(".cityName").html(name).attr("id", cid);
        $(".cityCodeView").addClass("displayNone");
        $(".hotel").removeClass("displayNone");

        firebase.database().ref('cities/' + cid).once('value', function (snap) {
            var data = snap.val();
            _this.city = cid;
            _this.cityName = name;

            _this.score(data);
        });
    },

    score: function score(data) {
        if (data.status) {
            if (!data.status.hotels) {
                //stauts는 있는데 호텔에 대한 status 데이터가 없으면 만들어 넣는다.
                data.status.hotels = {
                    transport: false,
                    safety: false,
                    facility: false,
                    theme: false
                };
            }
        } else {
            // status 데이터 자체가 없으면 만들어 넣는다.
            data.status = {
                hotels: {
                    transport: false,
                    safety: false,
                    facility: false,
                    theme: false
                }
            };
        }

        var status = data.status.hotels;

        //점수 체계가 완성되어있는지 검사하고 없으면 점수를 부여한다.
        //각 객체 안에서 점수를 계산해 데이터베이스에 업로드하며, return값으로는 값을 계산할 수 있었다/없었다라는 문구가 반환된다.
        if (status.transport) {
            $("#status_transport").html("정보가 이미 존재합니다.");
        } else {
            $("#status_transport").html(_transport2.default.init(data));
        }

        if (status.safety) {
            $("#status_safety").html("정보가 이미 존재합니다.");
        } else {
            $("#status_safety").html(_safety2.default.init(data));
        }

        // if(status.facility){
        //     $("#status_facility").html("정보가 존재합니다.")
        // }else{
        //     this.score_facility();
        // }

        // if(status.theme){
        //     this.score_theme();
        // }
    },

    score_facility: function score_facility() {
        var data = data;

        var scoreArray = [];

        for (var hid in data.hotels) {
            var hotel = data.hotels[hid];
            var atm = hotel.local.atm;

            hotel.assessment.convenience = {
                score: 0
            };

            var localScore = hotel.assessment.convenience.score;

            var groceryScore = 0;
            var citiScore = 0;
            var atmScore = 0;

            hotel.explain.local = [];

            var summary = '';
            var groceryTxt = '';

            if (hotel.local.grocery) {
                hotel.local.grocery.sort(function (a, b) {
                    return a - b;
                });

                var grocery75 = [];
                var grocery150 = [];
                var grocery225 = [];
                var grocery300 = [];

                localScore += Math.max((200 - hotel.local.grocery[0]) / 60, 0);

                for (var i = 0; i < hotel.local.grocery.length; i++) {
                    var dif = hotel.local.grocery[i];
                    if (dif < 75) {
                        grocery75.push(dif);
                        localScore += 0.1;
                    }
                    if (dif < 150) {
                        grocery150.push(dif);
                        localScore += 0.025;
                    }
                    if (dif < 225) {
                        grocery225.push(dif);
                        localScore += 0.005;
                    }
                    if (dif < 300) {
                        grocery300.push(dif);
                        localScore += 0.0001;
                    }
                }

                groceryScore += (400 - hotel.local.nearest.grocery) / 2;
                groceryScore += grocery75.length * 3;
                groceryScore += grocery150.length;
                groceryScore += grocery225.length / 2;

                if (hotel.local.nearest.grocery < 60) {

                    var groceryTime = (Math.round(hotel.local.nearest.grocery / 14) + 1) * 10;
                    groceryTxt += '<strong>' + groceryTime + '초 거리</strong>';

                    if (grocery75.length > 1) {
                        groceryTxt += '의 가장 가까운 식료품점을 포함해 <strong>단 1분 거리에 ' + grocery75.length + '개</strong>의 식료품점 위치.';
                    } else if (grocery150.length > 1) {
                        groceryTxt += '의 가장 가까운 식료품점을 포함해 <strong>2분 거리에 ' + grocery150.length + '개</strong>의 식료품점이 위치.';
                    } else if (grocery225.length > 1) {
                        groceryTxt += '의 가장 가까운 식료품점을 포함해 <strong>3분 거리에 ' + grocery225.length + '개</strong>의 식료품점이 위치.';
                    } else {
                        groceryTxt += '에 가장 가까운 식료품점이 위치';
                    }
                } else if (grocery75.length > 0) {
                    groceryTxt += '<strong>1분 거리</strong>';

                    if (grocery150.length > 1) {
                        groceryTxt += '의 가장 가까운 식료품점을 포함해 <strong>2분 거리에 ' + grocery150.length + '개</strong>의 식료품점이 위치.';
                    } else if (grocery225.length > 1) {
                        groceryTxt += '의 가장 가까운 식료품점을 포함해 <strong>3분 거리에 ' + grocery225.length + '개</strong>의 식료품점이 위치.';
                    } else {
                        groceryTxt += '에 가장 가까운 식료품점이 위치';
                    }
                } else if (grocery150.length > 0) {
                    groceryTxt += '<strong>2분 거리</strong>';

                    if (grocery225.length > 1) {
                        groceryTxt += '의 가장 가까운 식료품점을 포함해 <strong>3분 거리에 ' + grocery225.length + '개</strong>의 식료품점이 위치.';
                    } else if (grocery300.length > 1) {
                        groceryTxt += '의 가장 가까운 식료품점을 포함해 <strong>4분 거리에 ' + grocery300.length + '개</strong>의 식료품점이 위치.';
                    } else {
                        groceryTxt += '에 가장 가까운 식료품점이 위치';
                    }
                } else if (grocery225.length > 0) {
                    groceryTxt += '<strong>3분 거리</strong>';

                    if (grocery300.length > 1) {
                        groceryTxt += '의 가장 가까운 식료품점을 포함해 <strong>4분 거리에 ' + grocery300.length + '개</strong>의 식료품점이 위치.';
                    } else {
                        groceryTxt += '에 가장 가까운 식료품점이 위치';
                    }
                } else {
                    if (hotel.local.grocery.length > 1) {
                        groceryTxt += '<strong>5분 거리에 ' + hotel.local.grocery.length + '개</strong>의 식료품점이 위치';
                    } else {
                        groceryTxt += '가장 가까운 식료품점이 5분거리에 위치';
                    }
                }

                hotel.explain.local.push(groceryTxt);

                if (groceryScore > 210) {
                    groceryTxt = '가볍고 저렴하게 아침식사를 해결하거나 간단한 요기거리를 사서 저녁에 숙소로 돌아오기 굉장히 편리함.';
                    hotel.explain.local.push(groceryTxt);
                } else if (groceryScore > 180) {
                    groceryTxt = '가볍고 저렴하게 아침식사를 해결하거나 간단한 요기거리를 사서 저녁에 숙소로 돌아오기 편리함.';
                    hotel.explain.local.push(groceryTxt);
                } else if (hotel.local.nearest.grocery < 225) {
                    groceryTxt = '가볍고 저렴하게 아침식사를 해결하거나 간단한 요기거리를 사서 저녁에 숙소로 돌아오기 편리한 편.';
                    hotel.explain.local.push(groceryTxt);
                }
            } else {
                groceryTxt += '숙소 주변에 식료품점이 없어 조금 불편할 수 있음.';
                hotel.explain.local.push(groceryTxt);
            }

            var open24CitiArray = [];

            if (atm.citi) {
                atm.citi.sort(function (a, b) {
                    return a.dif < b.dif ? -1 : a.dif > b.dif ? 1 : 0;
                });
                var citidif = atm.citi[0].dif;

                for (var i = 0; i < atm.citi.length; i++) {
                    if (atm.citi[i].openHour === 'Open 24 hours a day') {
                        open24CitiArray.push({
                            dif: atm.citi[i].dif,
                            address: atm.citi[i].address,
                            coor: atm.citi[i].coor
                        });
                    }
                }

                open24CitiArray.sort(function (a, b) {
                    return a.dif > b.dif ? 1 : a.dif < b.dif ? -1 : 0;
                });

                var citiWord = '';

                if (citidif < 60) {
                    if (open24CitiArray.length > 0) {
                        var min = Math.floor(open24CitiArray[0].dif / 75);
                        if (citidif === open24CitiArray[0].dif) {
                            //24시간 오픈하는 씨티ATM이 1분거리
                            localScore += 0.75;
                            citiWord += '24시간 운영하는 씨티은행 ATM이 <strong>도보 단 1분거리</strong>에 있어 늦은 시간까지 안전하게 현금인출 가능';
                        } else {
                            //1분거리에 씨티ATM. 추가로 24시간 오픈하는 ATM이 있음
                            localScore += 0.5;
                            citiWord += '씨티은행 ATM이 <strong>도보 단 1분거리</strong>에 있고, ' + (min + 1) + '~' + (min + 2) + '분 거리에 24시간 운영하는 씨티 ATM이 있어 늦은 시간까지 비교적 안전하게 현금 인출 가능';
                        }
                    } else {
                        //씨티ATM이 1분거리
                        citiWord += '씨티은행 ATM이 <strong>도보 단 1분거리</strong>에 있어 씨티카드 이용자는 굉장히 편리하게 현금인출 가능';
                    }
                } else if (citidif < 150) {
                    if (open24CitiArray.length > 0) {
                        var min = Math.floor(open24CitiArray[0].dif / 75);
                        if (citidif === open24CitiArray[0].dif) {
                            //24시간 오픈하는 씨티ATM이 2분거리
                            localScore += 0.4;
                            citiWord += '24시간 운영하는 씨티은행 ATM이 <strong>도보 단 2~3분거리</strong>에 있어 늦은 시간까지 비교적 안전하게 현금인출 가능';
                        } else {
                            //2~3분거리에 씨티ATM. 추가로 24시간 오픈하는 ATM이 있음
                            citiWord += '씨티은행 ATM이 <strong>도보 2~3분거리</strong>에 있고, ' + (min + 1) + '~' + (min + 2) + '분 거리에 24시간 운영하는 씨티 ATM이 있어 늦은 시간까지 비교적 안전하게 현금 인출 가능';
                        }
                    } else {
                        //씨티ATM이 2~3분거리
                        citiWord += '씨티은행 ATM이 <strong>도보 2~3분거리</strong>에 있어 씨티카드 이용자가 편리하게 현금인출 가능';
                    }
                } else if (citidif < 225) {
                    if (open24CitiArray.length > 0) {
                        var min = Math.floor(open24CitiArray[0].dif / 75);
                        if (citidif === open24CitiArray[0].dif) {
                            //24시간 오픈하는 씨티ATM이 4~5분거리
                            citiWord += '24시간 운영하는 씨티은행 ATM이 <strong>도보 4~5분거리</strong>에 있어 비교적 편리하게 현금인출 가능';
                        } else {
                            //4~5분거리에 씨티ATM. 추가로 24시간 오픈하는 ATM이 있음
                            citiWord += '씨티은행 ATM이 <strong>도보 4~5분거리</strong>에 있고, 도보로 걸어갈 만한 거리에 24시간 운영하는 씨티 ATM이 있음';
                        }
                    } else {
                        //24시간 오픈하는 씨티ATM이 2~3분거리
                        citiWord += '씨티은행 ATM이 도보 4~5분거리에 있어 씨티카드 이용자가 현금 인출 가능';
                    }
                    citiWord += '씨티은행 ATM이 도보 4~5분거리에 있어 씨티카드 이용자가 현금 인출 가능';
                } else {
                    citiWord += '씨티은행 ATM이 도보로 걸어갈 만한 거리에 위치함';
                }
                hotel.explain.local.push(citiWord);
            }

            if (atm.visa) {
                var visaArray = [];
                var bankArray = [];
                for (var i = 0; i < atm.visa.length; i++) {
                    if (atm.visa[i].openHour) {
                        if (atm.visa[i].openHour === 'A' && atm.visa[i].dif < 240 && atm.visa[i].placeName.includes('BANK')) {
                            visaArray.push({
                                address: atm.visa[i].address,
                                coor: atm.visa[i].coor,
                                name: atm.visa[i].placeName,
                                dif: atm.visa[i].dif
                            });
                        }
                    }
                }

                var visaMin = 0;

                if (visaArray.length > 0) {
                    var visaWord = '';
                    visaMin = Math.floor(visaArray[0].dif / 75) + 1;
                    localScore += Math.max((250 - visaArray[0].dif) / 120, 0);
                    visaWord += '24시간 운영하는 은행 소속 VISA, MASTERCARD 제휴 ATM이 ' + visaMin + '~' + (visaMin + 1) + '분 거리에 있어 늦은 시간까지 편리하게 출금 가능';

                    hotel.explain.local.push(visaWord);
                }
            }

            localScore = Math.min(Math.round(localScore * 10 + 45), 99) / 10;
            hotel.assessment.convenience.score = localScore;
            scoreArray.push({ hid: hid, score: localScore });

            if (grocery75.length > 0) {
                if (visaMin) {
                    if (visaMin < 3) {
                        summary = '식료품점, 24시간 오픈 은행소속 ATM 등이 모두 숙소에서 도보 1~2분 거리 내에 있어 여행하기 매우 편리함';
                    } else if (visaMin < 5) {
                        summary = '도보 1~2분 거리의 식료품점, 3~4분 거리의 24시간 오픈 은행소속 ATM 등이 숙소 부근에 있어 여행하기 매우 편리함';
                    } else {
                        summary = '식료품점이 숙소에서 도보로 단 1~2분 거리에 있어 간단히 식사를 해결하거나 저녁에 요깃거리를 사오기 편리함';
                    }
                } else {
                    summary = '식료품점이 숙소에서 도보로 단 1~2분 거리에 있어 간단히 식사를 해결하거나 저녁에 요깃거리를 사오기 편리함';
                }
            } else if (grocery150.length > 0) {
                if (visaMin) {
                    if (visaMin < 3) {
                        summary = '도보 2~3분 거리의 식료품점, 1~2분 거리의 24시간 오픈 은행소속 ATM 등이 숙소 부근에 있어 여행하기 매우 편리함';
                    } else if (visaMin < 5) {
                        summary = '식료품점, 24시간 오픈 은행소속 ATM 등이 모두 숙소에서 도보 3~4분 거리 내에 있어 여행하기 편리함';
                    } else {
                        summary = '식료품점이 숙소에서 도보로 단 3~4분 거리에 있어 간단히 식사를 해결하거나 저녁에 요깃거리를 사오기 편리함';
                    }
                } else {
                    summary = '식료품점이 숙소에서 도보로 단 3~4분 거리에 있어 간단히 식사를 해결하거나 저녁에 요깃거리를 사오기 편리함';
                }
            } else if (grocery225.length > 0) {
                if (visaMin) {
                    if (visaMin < 3) {
                        summary = '도보 1~2분 거리의 24시간 오픈 은행소속 ATM, 도보 3~4분 거리의 식료품점 등이 숙소 부근에 있어 여행하기 편리한 편';
                    } else if (visaMin < 5) {
                        summary = '식료품점, 24시간 오픈 은행소속 ATM 등이 모두 숙소에서 도보 4~5분 거리 내에 있어 여행하기 편리한 편';
                    } else {
                        summary = '식료품점이 숙소에서 도보로 약 5~6분 거리에 있어 간단히 식사를 해결하거나 저녁에 요깃거리를 사오기 편리함';
                    }
                } else {
                    summary = '식료품점이 숙소에서 도보로 약 5~6분 거리에 있어 간단히 식사를 해결하거나 저녁에 요깃거리를 사오기 편리함';
                }
            } else {
                if (visaMin) {
                    if (visaMin < 3) {
                        summary = '24시간 오픈 은행소속 ATM이 숙소 1~2분 거리에 있음. 그 외의 편의시설은 부족한 편.';
                    } else if (visaMin < 5) {
                        summary = '24시간 오픈 은행소속 ATM이 숙소 3~4분 거리에 있음. 그 외의 편의시설은 부족한 편.';
                    } else {
                        summary = '숙소 부근 편의시설이 잘 발달되지는 않은 편.';
                    }
                } else {
                    summary = '숙소 부근 편의시설이 잘 발달되지는 않은 편.';
                }
            }

            hotel.summary.convenience = summary;

            var groceryTemp = [];

            if (hotel.local.grocery) {
                if (hotel.local.grocery.length > 3) {
                    hotel.local.grocery.length = 3;
                }
                groceryTemp = hotel.local.grocery;
            }

            hotel.local = {
                atm: {
                    citi: false,
                    other: false
                },
                grocery: groceryTemp
            };

            if (open24CitiArray.length > 0) {
                hotel.local.atm.citi = open24CitiArray[0];
            }

            if (visaArray.length > 0) {
                hotel.local.atm.other = visaArray[0];
            }

            hotel.ota = {
                agoda: {
                    star: hotel.star,
                    rating: hotel.grade_avg,
                    reviews: hotel.grade_no
                }
            };
            delete hotel.star;
            delete hotel.grade_avg;
            delete hotel.grade_no;
        }

        scoreArray.sort(function (a, b) {
            return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
        });

        firebase.data.status.hotels.facility = true;

        firebase.database().ref("cities/" + city).update(data);
    },

    score_safety: function score_safety() {},

    score_transport: function score_transport() {
        var city = this.city;

        var musical = [{
            name: "위키드",
            theater: "거슈윈 극장",
            coor: {
                lat: 40.7623832,
                lng: -73.9851616
            }
        }, {
            name: "라이온 킹",
            theater: "민스코프 극장",
            coor: {
                lat: 40.7580277,
                lng: -73.9861418
            }
        }, {
            name: "킹키 부츠",
            theater: "알 허쉬펠드 극장",
            coor: {
                lat: 40.759261,
                lng: -73.9913897
            }
        }, {
            name: '시카고',
            theatre: '앰배서더 극장',
            coor: {
                lat: 40.7612489,
                lng: -73.9866237
            }
        }, {
            name: "알라딘",
            theater: "뉴 암스테르담 극장",
            coor: {
                lat: 40.7560871,
                lng: -73.9901257
            }
        }, {
            name: "TKTS",
            theater: "TKTS",
            coor: {
                lat: 40.7591959,
                lng: -73.9870814
            }
        }];

        var ticket = {
            name: "TKTS",
            theater: "TKTS",
            coor: {
                lat: 40.7591959,
                lng: -73.9870814
            }
        };

        var lowerpolyCoor = [{ lat: 40.7139396, lng: -74.0083909 }, { lat: 40.7146715, lng: -74.014678 }, { lat: 40.7101824, lng: -74.0157294 }, { lat: 40.7093935, lng: -74.0155256 }, { lat: 40.7089787, lng: -74.0146458 }, { lat: 40.7081085, lng: -74.011749 }, { lat: 40.7139396, lng: -74.0083909 }];
        var polygon = new google.maps.Polygon({
            paths: lowerpolyCoor
        });

        var promenade = [{
            lat: 40.6955013,
            lng: -73.9983004
        }, {
            lat: 40.6965059,
            lng: -73.9978069
        }, {
            lat: 40.6985029,
            lng: -73.9968467
        }, {
            lat: 40.6997636,
            lng: -73.9956236
        }];

        var dumbo = {
            lat: 40.7032205,
            lng: -73.989594
        };
        var bridge = [{
            lat: 40.7004896,
            lng: -73.9897388
        }, {
            lat: 40.6961765,
            lng: -73.9887357
        }];

        var largeStreet = ['Water', 'Church', 'West', 'Wall'];
        var largeStreetKo = ['워터', '처치', '웨스트', '월'];

        var centralNearestPoly = [{ lat: 40.7692643, lng: -73.9838648 }, { lat: 40.7667291, lng: -73.9828348 }, { lat: 40.7628611, lng: -73.9739513 }, { lat: 40.7638363, lng: -73.970046 }, { lat: 40.7957804, lng: -73.9469576 }, { lat: 40.7981845, lng: -73.9482451 }, { lat: 40.8019205, lng: -73.9571286 }, { lat: 40.8015631, lng: -73.9601326 }, { lat: 40.7692643, lng: -73.9838648 }];
        var centralNearPoly = [{ lat: 40.7699032, lng: -73.9862647 }, { lat: 40.7647029, lng: -73.9842686 }, { lat: 40.7608674, lng: -73.9752778 }, { lat: 40.7628499, lng: -73.9676824 }, { lat: 40.7948758, lng: -73.9444867 }, { lat: 40.7999117, lng: -73.9470126 }, { lat: 40.803745, lng: -73.9558932 }, { lat: 40.802478, lng: -73.9626718 }, { lat: 40.7699032, lng: -73.9862647 }];
        var centralMidPoly = [{ lat: 40.8034148, lng: -73.9648533 }, { lat: 40.7708569, lng: -73.9882851 }, { lat: 40.7629912, lng: -73.9855385 }, { lat: 40.7593505, lng: -73.9763546 }, { lat: 40.762016, lng: -73.9662266 }, { lat: 40.7939935, lng: -73.9427948 }, { lat: 40.8013358, lng: -73.9460564 }, { lat: 40.805104, lng: -73.9551544 }, { lat: 40.8034148, lng: -73.9648533 }];
        var centralFarPoly = [{ lat: 40.7572701, lng: -73.9780283 }, { lat: 40.7606833, lng: -73.9642525 }, { lat: 40.7937336, lng: -73.940134 }, { lat: 40.8026027, lng: -73.9451122 }, { lat: 40.8075078, lng: -73.9567423 }, { lat: 40.8048767, lng: -73.9685011 }, { lat: 40.7721894, lng: -73.9916325 }, { lat: 40.7609433, lng: -73.9871264 }, { lat: 40.7572701, lng: -73.9780283 }];

        var centralNearest = new google.maps.Polygon({
            paths: centralNearestPoly
        });
        var centralMid = new google.maps.Polygon({
            paths: centralMidPoly
        });
        var centralNear = new google.maps.Polygon({
            paths: centralNearPoly
        });
        var centralFar = new google.maps.Polygon({
            paths: centralFarPoly
        });

        var centralSpots = [{
            coor: {
                lat: 40.7724169,
                lng: -73.9671385
            },
            explain: '센트럴 파크 내에서도 아름다운 경관을 자랑하는 베데스다 테라스와 호수로 바로 통하는 입구'
        }, {
            coor: {
                lat: 40.7777304,
                lng: -73.9748311
            },
            explain: '센트럴 파크 내에서도 아름다운 경관을 자랑하는 베데스다 테라스와 호수로 바로 통하는 입구'
        }, {
            coor: {
                lat: 40.7652014,
                lng: -73.9750671
            },
            explain: '미드타운 맨해튼의 건물들이 아름답게 비치는 남단 호수가'
        }, {
            coor: {
                lat: 40.7657215,
                lng: -73.9720416
            },
            explain: '미드타운 맨해튼의 건물들이 아름답게 비치는 남단 호수가'
        }, {
            coor: {
                lat: 40.7820525,
                lng: -73.9717412
            },
            explain: '센트럴 파크 내에서도 상징물로 꼽히는 벨디비어 성, 델라코르테 극장 등으로 통하는 입구'
        }, {
            coor: {
                lat: 40.7772024,
                lng: -73.9636409
            },
            explain: '센트럴 파크 내에서도 상징물로 꼽히는 벨디비어 성, 델라코르테 극장 등으로 통하는 입구'
        }, {
            coor: {
                lat: 40.7810939,
                lng: -73.9607924
            },
            explain: '센트럴 파크 북단 호수, 러닝트랙으로 통하는 입구'
        }, {
            coor: {
                lat: 40.784124,
                lng: -73.9585876
            },
            explain: '센트럴 파크 북단 호수, 러닝트랙으로 통하는 입구'
        }, {
            coor: {
                lat: 40.7879177,
                lng: -73.9557821
            },
            explain: '센트럴 파크 북단 호수, 러닝트랙으로 통하는 입구'
        }, {
            coor: {
                lat: 40.7934574,
                lng: -73.9517212
            },
            explain: '센트럴 파크 북부의 컨서버토리 가든'
        }, {
            coor: {
                lat: 40.7881451,
                lng: -73.9672351
            },
            explain: '센트럴 파크 북단 호수, 러닝트랙으로 통하는 입구'
        }, {
            coor: {
                lat: 40.7852816,
                lng: -73.9693594
            },
            explain: '센트럴 파크 북단 호수, 러닝트랙으로 통하는 입구'
        }];

        var centralScoreArray = [];

        var theme = { //explain의 항목으로 들어갈 녀석
            broadway: [],
            lower: [],
            central: []
        };
        var summary_theme = {
            broadway: '',
            lower: '',
            central: ''
        };

        console.log(data);

        for (var i = 0; i < musical.length; i++) {
            musical[i].metro = {};

            for (var j = 0; j < data.metro.length; j++) {
                var metro = data.metro[j];

                var dif = calculateDif(musical[i].coor, metro.coor);

                if (dif < 300) {
                    for (var k = 0; k < metro.line.length; k++) {
                        var line = metro.line[k][0];

                        if (musical[i].metro[line]) {
                            if (musical[i].metro[line].dif > dif) {
                                musical[i].metro[line] = {
                                    dif: dif,
                                    name: metro.name,
                                    coor: metro.coor
                                };
                            }
                        } else {
                            musical[i].metro[line] = {
                                dif: dif,
                                name: metro.name,
                                coor: metro.coor
                            };
                        }
                    }
                }
            }
        }

        console.log(musical);
        var scoreObj = {};

        for (var hid in data.hotels) {
            var hotel = data.hotels[hid];

            var broadWord = [];

            hotel.assessment.theme = {
                broad: {
                    score: 0
                }
            };
            var walkable = false;
            var hasLine = false;

            for (var i = 0; i < musical.length; i++) {
                var txt = '';
                var dif = calculateDif(hotel.coor, musical[i].coor);

                if (dif < 600) {
                    var broadDifScore = (600 - dif) / 400;
                    if (scoreObj[hid]) {
                        scoreObj[hid] += 1 + broadDifScore;
                    } else {
                        scoreObj[hid] = 1 + broadDifScore;
                        txt = '유명 극장들이 몰려있는 브로드웨이, 타임스퀘어 부근에서 가까움';
                        broadWord.push(txt);
                    }

                    if (musical[i].name === 'TKTS') {
                        txt = '당일 뮤지컬 티켓을 저렴하게 예매할 수 있는 TKTS 티켓판매부스까지 도보로 약 ' + (Math.floor(dif / 60) + 1) + '분';
                        broadWord.push(txt);
                    } else {
                        txt = '뮤지컬 ' + musical[i].name + ' 공연이 열리는 ' + musical[i].theater + '까지 도보로 약 ' + (Math.floor(dif / 60) + 1) + '분';
                        broadWord.push(txt);
                    }

                    walkable = true;
                }
            }
            if (walkable) {
                scoreObj[hid] += 4;
                if (broadWord.length > 4) {
                    txt = '뮤지컬을 여러 편 볼 생각이라면, 밤 늦게 끝나는 뮤지컬을 보고 안전하게 숙소로 귀가하기 매우 좋은 숙소.';
                    broadWord.push(txt);
                } else if (broadWord.length > 2) {
                    txt = '뮤지컬을 여러 편 볼 생각이라면, 밤 늦게 끝나는 뮤지컬을 보고 안전하게 숙소로 귀가하기 좋은 숙소.';
                    broadWord.push(txt);
                } else {
                    txt = '일반적으로 밤 늦게 끝나는 뮤지컬을 보고 안전하게 숙소로 귀가하기 좋은 편에 속하는 숙소.';
                    broadWord.push(txt);
                }
            } else {

                var lineObj = {
                    sum: 999
                };

                for (var line in data.spots.ranked[9].metroInfo) {
                    var metroInf = data.spots.ranked[9].metroInfo[line];
                    var walkDif = metroInf.distance;
                    var metName = metroInf.name;
                    var hotelMetName = '';
                    var metroDif = 0;

                    if (hotel.metroInfo) {
                        if (Object.keys(hotel.metroInfo).includes(line)) {
                            walkDif += hotel.metroInfo[line].distance;
                            hotelMetName = hotel.metroInfo[line].name;
                            metroDif = calculateDif(data.metro[metroInf.code].coor, data.metro[hotel.metroInfo[line].code].coor);

                            if (lineObj.sum > walkDif / 75 + metroDif / 400) {
                                lineObj = {
                                    metro: metroDif / 400,
                                    walk: walkDif / 75,
                                    sum: walkDif / 75 + metroDif / 400
                                };
                                hasLine = true;
                            }
                        }
                    }
                }

                if (hasLine) {

                    scoreObj[hid] = Math.max((16 - lineObj.sum) / 2.9, 0) + Math.max((6 - lineObj.walk) / 1.8, 0);

                    txt = '타임스퀘어 부근은 아니지만 <strong>타임스퀘어까지 지하철로 환승 없이 빠르게</strong> 이동할 수 있는 숙소.';
                    broadWord.push(txt);

                    if (lineObj.walk < 5) {
                        if (lineObj.sum < 12) {
                            txt = '지하철이 매우 가까워 도보 이동시간 단 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 타임스퀘어 부근의 주요 극장들까지 갈 수 있음';
                        } else if (lineObj.sum < 16) {
                            txt = '도보 이동시간 단 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 타임스퀘어 부근의 주요 극장들까지 갈 수 있음';
                        } else {
                            txt = '타임스퀘어 부근의 주요 극장들까지는 도보 이동시간 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이 소요됨.';
                        }
                    } else if (lineObj.walk < 7) {
                        if (lineObj.sum < 12) {
                            txt = '지하철이 매우 가까워 도보 이동시간 약 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 타임스퀘어 부근의 주요 극장들까지 갈 수 있음';
                        } else if (lineObj.sum < 16) {
                            txt = '도보 이동시간 약 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 타임스퀘어 부근의 주요 극장들까지 갈 수 있음';
                        } else {
                            txt = '타임스퀘어 부근의 주요 극장들까지는 도보 이동시간 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이 소요됨.';
                        }
                    } else {
                        if (lineObj.sum < 12) {
                            txt = '지하철이 매우 가까워 도보 이동시간 약 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 타임스퀘어 부근의 주요 극장들까지 갈 수 있음';
                        } else if (lineObj.sum < 16) {
                            txt = '도보 이동시간 약 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 타임스퀘어 부근의 주요 극장들까지 갈 수 있음';
                        } else {
                            txt = '타임스퀘어 부근의 주요 극장들까지는 도보 이동시간 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이 소요됨.';
                        }
                    }

                    broadWord.push(txt);
                }
            }

            hotel.explain.theme = {
                broad: broadWord
            };
        }
        var broadScoreArray = [];
        for (var hid in scoreObj) {
            var sc = scoreObj[hid];
            if (sc > 9) {
                sc = Math.round(sc / 0.385) / 10 + 6.5;
                if (sc > 10.2) {
                    sc = 9.9;
                } else if (sc > 10) {
                    sc = 9.8;
                } else if (sc > 9.8) {
                    sc = 9.7;
                } else if (sc > 9.5) {
                    sc = 9.6;
                }
            } else if (sc > 4) {
                sc = Math.round((sc + 27) / 0.4) / 10;
            } else {
                sc = Math.round(sc * 10 + 40) / 10;
            }
            if (sc < 8) {
                sc = Math.round(sc * 5) / 10 + 4;
            }

            broadScoreArray.push(sc);
            data.hotels[hid].assessment.theme.broad = sc;

            var centralWord = [];

            var centralSummary = '';
            var _coor = new google.maps.LatLng(hotel.coor.lat, hotel.coor.lng);

            var score = 0;

            var hasSpot = false;
            var centralNearSpot = {
                dif: 700,
                explain: ""
            };
            txt = '';
            var secondtxt = '';

            for (var i = 0; i < centralSpots.length; i++) {
                var spotCoor = centralSpots[i].coor;
                var dif = calculateDif(spotCoor, hotel.coor);

                if (dif < centralNearSpot.dif) {
                    score = (i + 30) / 40 + Math.min((700 - dif) / 450, 1);
                    centralNearSpot.dif = dif;
                    centralNearSpot.explain = centralSpots[i].explain;
                    hasSpot = false;
                }
            }

            if (hasSpot) {
                secondtxt = '또한 <strong>' + centralNearSpot.explain;

                if (centralNearSpot.dif < 150) {
                    secondtxt += '에서 단 1~2분 거리</strong>에 있어 센트럴파크를 더 즐기기 좋음.';
                } else if (centralNearSpot.dif < 300) {
                    secondtxt += '에서 3~4분 거리</strong>에 있어 센트럴파크를 더 즐기기 좋음.';
                } else {
                    secondtxt += '</strong>에서 가까워 센트럴파크를 더 즐기기 좋음.';
                }
            }

            if (google.maps.geometry.poly.containsLocation(_coor, centralNearest)) {
                txt = '센트럴파크와 <strong>도보 단 2~3분 거리</strong>로, 산책을 좋아하는 사람에게 안성맞춤';
                score += 9;

                if (hasSpot) {
                    centralSummary = '센트럴파크와 <strong>도보 단 2~3분거리</strong>로 매우 가까울 뿐만 아니라, 특히 <strong>' + centralNearSpot.explain + '</strong>에서 가까워 센트럴파크를 더 즐기기 좋음';
                } else {
                    centralSummary = txt;
                }
            } else if (google.maps.geometry.poly.containsLocation(_coor, centralNear)) {
                score += 8.65;
                txt = '센트럴파크와 <strong>도보 4~5분 거리</strong>로, 산책을 좋아하는 사람에게 안성맞춤';
                if (hasSpot) {
                    centralSummary = '센트럴파크와 <strong>도보 4~5분거리</strong>로 매우 가까울 뿐만 아니라, 특히 <strong>' + centralNearSpot.explain + '</strong>에서 가까워 센트럴파크를 더 즐기기 좋음';
                } else {
                    centralSummary = txt;
                }
            } else if (google.maps.geometry.poly.containsLocation(_coor, centralMid)) {
                score += 8.25;
                txt = '센트럴파크에서 <strong>도보 6~7분 거리</strong>로, 산책을 좋아하는 사람에게 좋음';
                if (hasSpot) {
                    centralSummary = '센트럴파크와 도보 6~7분 거리로 가까울 뿐만 아니라, 특히 <strong>' + centralNearSpot.explain + '</strong>에서 가까워 센트럴파크를 더 즐기기 좋음';
                } else {
                    centralSummary = txt;
                }
            } else if (google.maps.geometry.poly.containsLocation(_coor, centralFar)) {
                score += 8;
                txt = '센트럴파크에서 <strong>도보 10분 이내 거리</strong>로, 산책을 좋아하는 사람에게 좋음';
                if (hasSpot) {
                    centralSummary = '센트럴파크와 도보 10분 이내 거리로 가까울 뿐만 아니라, 특히 <strong>' + centralNearSpot.explain + '</strong>에서 가까워 센트럴파크를 더 즐기기 좋음';
                } else {
                    centralSummary = txt;
                }
            }

            if (score > 7.9) {
                score = (score - 8) / 1.5 + 8;
                centralWord.push(txt);
                if (hasSpot) {
                    centralWord.push(secondtxt);
                }
            } else {
                //이제 지하철을 찾아보자

                var lineObj = {
                    sum: 999
                };
                var hasLine = false;

                for (var line in data.spots.ranked[4].metroInfo) {
                    var metroInf = data.spots.ranked[4].metroInfo[line];
                    var walkDif = metroInf.distance;
                    var metName = metroInf.name;
                    var hotelMetName = '';
                    var metroDif = 0;

                    if (hotel.metroInfo) {
                        if (Object.keys(hotel.metroInfo).includes(line)) {
                            walkDif += hotel.metroInfo[line].distance;
                            hotelMetName = hotel.metroInfo[line].name;
                            metroDif = calculateDif(data.metro[metroInf.code].coor, data.metro[hotel.metroInfo[line].code].coor);

                            if (lineObj.sum > walkDif / 75 + metroDif / 400) {
                                lineObj = {
                                    metro: metroDif / 400,
                                    walk: walkDif / 75,
                                    sum: walkDif / 75 + metroDif / 400
                                };
                                if (lineObj.sum < 16) {
                                    hasLine = true;
                                }
                            }
                        }
                    }
                }

                if (hasLine) {
                    txt = '이 숙소는 센트럴파크 부근은 아니지만 센트럴파크까지 지하철로 환승 없이 빠르게 갈 수 있음.';
                    centralWord.push(txt);

                    if (lineObj.walk < 4) {
                        score = 7.5 + Math.round(12 - lineObj.sum / 2) / 10;
                        if (lineObj.sum < 12) {
                            txt = '지하철이 매우 가까워 도보 이동시간 단 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 센트럴파크에 도달 가능.';
                            centralSummary = '센트럴파크 부근은 아니지만 지하철이 매우 가까워 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 센트럴파크 도착.';
                        } else if (lineObj.sum < 16) {
                            txt = '도보 이동시간 단 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 센트럴파크 도착';
                            centralSummary = '센트럴파크 부근은 아니지만 지하철이 매우 가까워 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 센트럴파크 도착.';
                        }
                    } else if (lineObj.walk < 7) {
                        score = 7 + Math.round(12 - lineObj.sum / 2) / 10;
                        if (lineObj.sum < 12) {
                            txt = '지하철이 매우 가까워 도보 이동시간 약 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 센트럴파크에 도달 가능.';
                            centralSummary = '센트럴파크 부근은 아니지만 지하철이 매우 가까워 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 센트럴파크 도착.';
                        } else if (lineObj.sum < 16) {
                            txt = '도보 이동시간 약 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 센트럴파크에 도달 가능.';
                            centralSummary = '센트럴파크 부근은 아니지만 지하철이 매우 가까워 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 센트럴파크 도착.';
                        }
                    } else {
                        score = 6.5 + Math.round(12 - lineObj.sum / 2) / 10;
                        if (lineObj.sum < 12) {
                            txt = '지하철이 매우 가까워 도보 이동시간 약 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 센트럴파크에 도달 가능.';
                            centralSummary = '센트럴파크 부근은 아니지만 지하철이 매우 가까워 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 센트럴파크 도착.';
                        } else if (lineObj.sum < 16) {
                            txt = '도보 이동시간 약 ' + Math.round(lineObj.walk) + '분을 포함해 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 센트럴파크에 도달 가능.';
                            centralSummary = '센트럴파크 부근은 아니지만 지하철이 매우 가까워 약 ' + (Math.round(lineObj.sum) + 2) + '분이면 센트럴파크 도착.';
                        }
                    }

                    centralWord.push(txt);
                } else {
                    txt = '이 숙소는 센트럴파크와 가까이 있지는 않지만 다른 장점들 때문에 추천됨.';
                    centralSummary = txt;
                    centralWord.push(txt);
                    score = 6;
                }
            }

            score = Math.floor(score * 10) / 10;
            centralScoreArray.push(score);
            if (hotel.explain.theme) {
                hotel.explain.theme.central = centralWord;
            } else {
                hotel.explain.theme = {
                    central: centralWord
                };
            }

            themeArray = [];
            summary = "";
            score = 0;

            var hotel = data.hotels[hid];
            var txt = '';

            var hasLowerTheme = false;

            if (hotel.area === 22) {
                score += 8;
                //금융지구
                txt = '뉴욕의 <strong>가장 현대적인 모습을 곳곳에서 느낄 수 있는</strong> 금융지구 안에 위치한 숙소';
                themeArray.push(txt);

                var address = hotel.address.toLowerCase();
                var nearSomething = false;
                var _coor = new google.maps.LatLng(hotel.coor.lat, hotel.coor.lng);
                if (google.maps.geometry.poly.containsLocation(_coor, polygon)) {
                    score += 1.7;
                    txt = '금융지구 뿐만 아니라 <strong>뉴욕 내에서 가장 높은 원 월드 트레이드 센터</strong> 부근에 위치함';
                    themeArray.push(txt);
                    summary = '뉴욕의 가장 현대적인 모습을 느낄 수 있는 <strong>금융지구 안, 원 월드 트레이드 센터 부근</strong>에 위치함';
                    nearSomething = true;
                } else {
                    for (var _i = 0; _i < largeStreet.length; _i++) {
                        if (hotel.address.includes(largeStreet[_i])) {
                            score += 1.5;
                            nearSomething = true;
                            txt = '금융지구 내에서도 <strong>아름다운 건물들이 늘어선 ' + largeStreetKo[_i] + ' 스트리트</strong>에 위치함';
                            themeArray.push(txt);
                            summary = '뉴욕의 가장 현대적인 모습을 느낄 수 있는 <strong>금융지구 안, 그 안에서도 아름다운 건물들이 늘어선 ' + largeStreetKo[_i] + ' 스트리트</strong>에 위치함';
                        }
                    }

                    if (!nearSomething) {
                        summary = '뉴욕의 <strong>가장 현대적인 모습을 곳곳에서 느낄 수 있는</strong> 금융지구 안에 위치한 숙소';
                    }
                }
                hasLowerTheme = true;
                hotel.summary.theme.lower = summary;
            }
            if (hotel.area === 23) {
                score += 8;
                //브루클린
                txt = '<strong>뉴욕의 아름다운 스카이라인을 감상하기 가장 좋은</strong> 브루클린 헤이츠/비네거 힐 안에 위치한 숙소';
                themeArray.push(txt);

                var nearSomething = false;
                var somethingTxtArr = [];
                var pdif = 800;
                var nearPromenade = false;
                var summary = '';

                for (var _i2 = 0; _i2 < promenade.length; _i2++) {
                    var _coor = promenade[_i2];
                    var dif = calculateDif(_coor, hotel.coor);
                    if (dif < 800 && dif < pdif) {
                        pdif = dif;
                        nearPromenade = true;
                    }
                }

                if (nearPromenade) {
                    score += 0.6;
                    var difdif = bdif / 700;
                    score += 1 - difdif.toFixed(1) * 1;
                    txt = '맨해튼 스카이라인을 감상할 수 있는 <strong>최고 명소 중 하나인 브루클린 헤이츠 산책로</strong>까지 ' + difToMinWord(pdif);
                    themeArray.push(txt);
                    nearSomething = true;
                    somethingTxtArr.push('브루클린 헤이츠 산책로');
                }

                var ddif = calculateDif(dumbo, hotel.coor);

                if (ddif < 800) {
                    score += 0.6;
                    var difdif = bdif / 600;
                    score += 1 - difdif.toFixed(1) * 1;
                    txt = 'MBC 예능 <strong>무한도전의 달력 화보 촬영지로도 유명한 덤보 포토존</strong>까지 ' + difToMinWord(ddif);
                    themeArray.push(txt);
                    nearSomething = true;
                    somethingTxtArr.push('덤보 포토존');
                }

                themeArray.push(txt);
                var bdif = 900;
                var nearBridge = false;
                for (var _i3 = 0; _i3 < bridge.length; _i3++) {
                    var _coor = bridge[_i3];
                    var dif = calculateDif(_coor, hotel.coor);
                    if (dif < 800 && dif < bdif) {
                        bdif = dif;
                        nearBridge = true;
                        nearSomething = true;
                    }
                }

                if (nearBridge) {
                    score += 0.6;
                    var difdif = bdif / 600;
                    score += 1 - difdif.toFixed(1) * 1;
                    txt = '맨해튼의 아름다운 스카이라인을 보며 직접 건널 수 있는 <strong>브루클린 브릿지의 입구</strong>까지 ' + difToMinWord(pdif);
                    themeArray.push(txt);
                    somethingTxtArr.push('브루클린 브릿지 입구');
                }
                if (nearSomething) {
                    if (somethingTxtArr.length > 1) {
                        summary = '<strong>뉴욕 스카이라인을 감상하기 좋은 브루클린 헤이츠/비네거 힐</strong> 안에 위치해 있으면서, 스카이라인 감상 명소들인 <strong>';
                        summary += somethingTxtArr.join(', ') + '</strong>에서 가까운 위치';
                    } else {
                        summary = '<strong>뉴욕 스카이라인을 감상하기 좋은 브루클린 헤이츠/비네거 힐</strong> 안에 위치해 있으면서, 스카이라인 감상 명소인 <strong>';
                        summary += somethingTxtArr[0] + '</strong>에서 가까운 위치';
                    }
                } else {
                    summary = '<strong>뉴욕의 아름다운 스카이라인을 감상하기 가장 좋은</strong> 브루클린 헤이츠/비네거 힐 안에 위치한 숙소';
                }

                hotel.summary.theme.lower = summary;

                hasLowerTheme = true;
            }

            if (!hasLowerTheme) {
                themeArray = ['로워 맨해튼 부근에 위치하지는 않지만 다른 이유들로 인해 추천된 숙소'];
                hotel.summary.theme.lower = '로워 맨해튼 부근에 위치하지는 않지만 다른 이유들로 인해 추천된 숙소';
            }
            score = score.toFixed(1) * 1;
            scoreArray.push(score);
            if (score < 8) {
                score = 6;
            }

            hotel.explain.theme.lower = themeArray;
            hotel.assessment.theme.lower = score;
        }

        broadScoreArray.sort(function (a, b) {
            return b - a;
        });
        console.log(broadScoreArray);

        firebase.database().ref("cities/" + city).update(data);
    }
};

exports.default = Hotel;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Transport = {
    init: function init() {

        var cityName = $(".cityName").html();
        var city = $(".cityName").attr('id');
        var orderArray = [];

        if (!data.metro || !data.metroLine) {
            return '대중교통 정보가 입력되지 않아 교통 편의성을 계산할 수 없습니다.';
        }

        for (var hid in data.hotels) {
            var hotel = data.hotels[hid];

            var transport_txt = [];

            var score = 0;
            //교통 편의성 점수부여용
            var goodLine = [];
            //좋은 지하철 라인들 Array
            var visitable = [];
            //환승 없이 갈 수 있는 관광지 목록
            var nearest = { distance: 1200, name: "", code: "" };
            //가장 가까운 지하철
            var lineNo = 0;
            //10분거리 이내의 지하철  노선 개수
            if (hotel.metroInfo) {
                lineNo = Object.keys(hotel.metroInfo).length;
            }

            for (var metLine in hotel.metroInfo) {

                if (hotel.metroInfo[metLine].distance < nearest.distance) {
                    nearest = hotel.metroInfo[metLine];
                    //가장 가까운 지하철 갱신
                }

                if (data.metroLine[metLine].score > 80) {
                    goodLine.push(metLine);
                    //좋은 라인이면 목록에 포함
                }

                for (var i = 0; i < data.metroLine[metLine].spot.length; i++) {
                    var spot = data.metroLine[metLine].spot[i];
                    if (!visitable.includes(spot.name)) {
                        visitable.push(spot.name);
                        //환승 없이 갈 수 있는 관광지면 목록에 포함
                    }
                }
            }
            if (nearest.name.length > 0) {
                transport_txt.push('가장 가까운 지하철 역은 <b>' + nearest.name + '</b> 역으로, ' + difToMinWord(nearest.distance));
            }
            if (lineNo > 0) {
                transport_txt.push('숙소에서 도보 10분거리 이내에 <b>지하철 ' + lineNo + '개 노선</b>이 지남');
            }

            if (goodLine.length > 0) {
                if (goodLine.length > 1) {
                    transport_txt.push('그 중에서도 실질적으로 ' + cityName + ' 관광에 편리한 <strong>' + goodLine.join(', ') + '호선</strong>이 지나는 <b>초 역세권</b>');
                } else {
                    transport_txt.push('그 중에서도 실질적으로 ' + cityName + ' 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지나는 <b> 역세권</b>');
                }
            }

            if (visitable.length > 0) {
                // TODO: 100대 관광지 -> 뉴욕 실제 spot 데이터 길이
                if (visitable.length > 90) {
                    transport_txt.push('<b>' + cityName + ' 100대 관광지 중 ' + spotNo + '개</b>를 환승 없이 방문할 수 있는 <strong>최고의 교통 요지</strong>');
                } else if (visitable.length > 75) {
                    transport_txt.push('<b>' + cityName + ' 100대 관광지 중 ' + spotNo + '개</b>를 환승 없이 방문할 수 있는 <strong>교통 요지</strong>');
                } else {
                    transport_txt.push(cityName + ' 100대 관광지 중 ' + spotNo + '개를 환승 없이 방문 가능');
                }
            }

            var min = Math.ceil(nearest.distance / 70);

            if (hotel.summary) {
                hotel.summary.transport = this.summary(min, lineNo);
            } else {
                hotel.summary = {
                    transport: this.summary(min, lineNo)
                };
            }

            for (var metLine in hotel.metroInfo) {
                var metDistance = hotel.metroInfo[metLine].distance;
                score += (10000 - metDistance) * data.metroLine[metLine].score;
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
            var _hotel = data.hotels[orderArray[i].hid];
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

        data.status.hotels.transport = true;
        firebase.database().ref("cities/" + city).update(data);

        return '대중교통 정보 발견. 교통 편의성을 계산했습니다.';
    },

    summary: function summary(min, lineNo) {
        var summary = '';

        if (min < 2) {
            if (lineNo > 18) {
                summary = '가장 가까운 지하철역이 <strong>도보 단 ' + min + '~' + (min + 1) + '분 거리</strong>에 있고, 도보 10분 거리에 <strong>지하철 ' + lineNo + '개 노선</strong>이 지나는 <b>최상의 역세권</b>';
            } else if (lineNo > 14) {
                summary = '가장 가까운 지하철역이 <strong>도보 단 ' + min + '~' + (min + 1) + '분 거리</strong>에 있고, 도보 10분 거리에 <strong>지하철 ' + lineNo + '개 노선</strong>이 지나는 <b>굉장히 훌륭한 역세권</b>';
            } else {
                if (goodLine.length > 3) {
                    summary = '가장 가까운 지하철역이 <strong>도보 단 ' + min + '~' + (min + 1) + '분 거리</strong>에 있고, 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지나는 <b>훌륭한 역세권</b>';
                } else if (goodLine.length > 0) {
                    summary = '가장 가까운 지하철역이 <strong>도보 단 ' + min + '~' + (min + 1) + '분 거리</strong>에 있고, 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지나는 <b>좋은 역세권</b>';
                }
            }
        } else if (min < 4) {
            if (lineNo > 18) {
                summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 1) + '~' + (min + 2) + '분 거리</strong>에 있고, 도보 10분 거리에 <strong>지하철 ' + lineNo + '개 노선</strong>이 지나는 <b>굉장히 훌륭한 역세권</b>';
            } else if (lineNo > 14) {
                summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 1) + '~' + (min + 2) + '분 거리</strong>에 있고, 도보 10분 거리에 <strong>지하철 ' + lineNo + '개 노선</strong>이 지나는 <b>훌륭한 역세권</b>';
            } else {
                if (goodLine.length > 2) {
                    summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 1) + '~' + (min + 2) + '분 거리</strong>에 있고, 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지나는 <b>역세권</b>';
                } else if (goodLine.length > 0) {
                    summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 1) + '~' + (min + 2) + '분 거리</strong>에 있고, 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지남';
                }
            }
        } else if (min < 7) {
            if (lineNo > 19) {
                summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 2) + '~' + (min + 3) + '분 거리</strong>로 약간 멀지만, 도보 10분 거리에 <strong>지하철 ' + lineNo + '개 노선</strong>이 지나는 <b>좋은 역세권</b>';
            } else if (lineNo > 15) {
                summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 2) + '~' + (min + 3) + '분 거리</strong>로 약간 멀지만, 도보 10분 거리에 <strong>지하철 ' + lineNo + '개 노선</strong>이 지나는 <b>역세권</b>';
            } else {
                if (goodLine.length > 2) {
                    summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 2) + '~' + (min + 3) + '분 거리</strong>로 약간 멀지만, 관광에 편리한 <strong>' + goodLine + '호선</strong>이 지남';
                } else {
                    summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 2) + '~' + (min + 3) + '분 거리</strong>로 약간 떨어져 있어 다소 불편할 수 있음';
                }
            }
        } else {
            summary = '가장 가까운 지하철역이 <strong>도보 ' + (min + 3) + '~' + (min + 5) + '분 거리</strong>로 조금 떨어져 있어 불편할 수 있음';
        }

        return summary;
    }
};

exports.default = Transport;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Safety = {
    area: {},
    local: {},
    spot: {},

    init: function init(data) {
        var cityName = $(".cityName").html();
        var city = $(".cityName").attr('id');
        var orderArray = [];
        this.area = data.area;
        if (data.local) {
            this.local = data.local;
        } else {
            return '지역 데이터가 없어 치안 계산을 할 수 없습니다.';
        }

        var atmDistance = this.preprocess.atm;
        //top15, top30으로 이루어진 객체. 30번째 atm이 가까이 있는 순으로 상위 15%, 30%녀석이 얼마나 가까운지


        //지역 내 atm들이 얼마나 몰려있는지, 편의점들이 얼마나 가까이 있는지 등 평균치들을 계산


        var scoreArray = [];

        for (var hid in data.hotels) {
            var hotel = data.hotels[hid];

            var safe_txt = [];
            var txt = '';
            var summary = '';
            var sum = 0;

            var score = {
                general: 0, //지역의 일반적인 치안 수준
                floating: {
                    atm: 0, //주변에 ATM이 다른 곳 대비 특출나게 많아 유동인구가 많은 곳이라는 추정이 될 정도
                    spot: 0, //주변에 유명 관광명소가 가까이 있는지(0:없음, 1:있음, 2:여러개)
                    grocery: 0, //식료품점 또는 편의점이 주변에 얼마나 많은지 -> 다른지역 대비 확실히 많아야 린정
                    area: false //뉴욕의 타임스퀘어 일대, 오사카의 도톤보리 부근처럼 유동인구가 별나게 많은 특정 area에 속하는지 여부
                },
                metro: 0, //지하철역(지하철순위 하위 30% 제외)이 얼마나 가까운지로 결정되는 안전도
                mainStreet: false //확연한 대로변에 위치했는지 여부


                //지역의 일반적인 치안 수준을 계산하고 설명함
            };score.general = this.general.score(this.area[hotel.area].safety);
            txt = this.general.txt(hotel.area);
            safe_txt.push(txt);

            //유동인구에 따른 치안 수준을 계산하고 설명함
            score.floating = this.floating.score(hotel);

            var atm30th = hotel.local.atm[29].location.score; //(visa atm찾기 도구는 호텔에 직접 atm을 때려박음) 30번째 atm이 몇 마일 떨어져있는지

            if (atm30th < 0.084) {
                score.floating.atm = 2;
            } else if (atm30th < 0.12) {
                score.floating.atm = 1;
            }

            score += Math.max(0.15 - atm30th, 0) * 5;

            hotel.spot = {
                walkable: []
            };
            hotel.local.spot = [];
            hotel.local.grocery = [];

            for (var i = 0; i < data.spots.ranked.length; i++) {
                var spot = data.spots.ranked[i];

                if (spot.enterance) {
                    for (var j = 0; j < spot.enterance.length; j++) {
                        var dif = calculateDif(hotel.coor, spot.enterance[j]);
                        if (dif < 500) {
                            hotel.spot.walkable.push({
                                rank: i,
                                sid: spot.sid
                            });
                            if (dif < 200) {
                                if (score.floating.spot === 0) {
                                    score.floating.spot = 1;
                                }
                            }

                            if (dif < 80) {
                                hotel.local.spot.push(spot);
                                score.floating.spot = 2;
                            }
                        }
                    }
                } else {
                    var dif = calculateDif(hotel.coor, spot.coor);
                    if (dif < 500) {
                        hotel.spot.walkable.push({
                            rank: i,
                            sid: spot.sid
                        });
                        if (dif < 200) {
                            if (score.floating.spot === 0) {
                                score.floating.spot = 1;
                            }

                            score += (250 - dif) / 200;
                        }

                        if (dif < 150) {
                            hotel.local.spot.push(spot);
                            score.floating.spot = 2;
                        }
                    }
                }
            }
            hotel.local.grocery = [];

            hotel.local.nearestMetro = {
                distance: 1000
            };
            for (var line in hotel.metroInfo) {
                var metro = hotel.metroInfo[line];

                if (metro.distance < hotel.local.nearestMetro.distance) {
                    hotel.local.nearestMetro = metro;
                    hotel.local.nearestMetro.line = line;
                }
            }

            for (var i = 0; i < data.local.local.grocery.length; i++) {
                var grocery = data.local.local.grocery[i];
                var dif = calculateDif(hotel.coor, grocery);

                if (dif < 110) {
                    hotel.local.grocery.push(dif);
                }
            }

            score += Math.min(hotel.local.grocery.length / 6, 0.7);

            if (hotel.local.grocery.length > 3) {
                score.floating.grocery = 2;
            } else if (hotel.local.grocery.length > 1) {
                score.floating.grocery = 1;
            }

            var areaScore = Math.round((areaSafety.score * 1 + areaSafety.misdemeanor / 3 * 1) * 10) / 10;

            var localTxt = '';
            var localGood = false;

            if (score.floating.area) {
                localTxt += '맨해튼 한복판에 위치해 유동인구가 매우 많';
                summary += '유동인구가 매우 많은 맨해튼 한복판에 위치하고, 지하철도 가까워 <strong>밤 늦게까지 안전하지만 소매치기 등 경범죄에는 조심해야 함</strong>';
            } else {
                if (hotel.local.spot.length > 0) {
                    if (score.floating.grocery > 0) {
                        if (score.floating.atm > 0) {
                            localTxt += '주변 상업시설, 편의시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구가 매우 많음.</strong>';
                            localGood = true;
                        } else {
                            localTxt += '주변 편의시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구 많음.</strong>';
                            localGood = true;
                        }
                    } else {
                        if (score.floating.atm > 0) {
                            localTxt += '주변 상업시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구 많음.</strong>';
                            localGood = true;
                        } else {
                            localTxt += hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구가 많음.</strong>';
                            localGood = true;
                        }
                    }
                } else {
                    if (score.floating.grocery > 0) {
                        if (score.floating.atm > 0) {
                            localTxt += '주변 상업시설, 편의시설이 잘 갖추어져 있어 <strong>유동인구가 많음.</strong>';
                            localGood = true;
                        } else {}
                    } else {
                        if (score.floating.atm > 0) {} else {}
                    }
                }
            }

            if (areaScore > 7.5) {
                if (!score.floating.area) {
                    summary += '전반적으로 치안이 좋은 <b>' + areaName + '</b>지역에 위치하고 있';
                }

                if (localGood) {
                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 주변 <strong>유동인구가 많고 지하철이 가까워 밤 늦게까지도 매우 안전</strong>함.';
                        } else {
                            summary += '으며, 주변 유동인구가 많아 <strong>지역 내에서도 더 안전</strong>한 편.';
                        }
                    }
                } else {
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 아주 많지는 않은 편.';

                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 지하철이 가까워 <strong>밤 늦게 귀가할 때도 안전</strong>한 편.';
                        } else {
                            summary += '지만 <strong>너무 밤 늦게 돌아다니는 것은 삼가는 것</strong>이 좋음.';
                        }
                    }
                }
            } else if (areaScore > 6.8) {

                if (!score.floating.area) {
                    summary += '치안이 좋은 편인 <b>' + areaName + '</b>지역에 위치하고 있';
                }

                if (localGood) {

                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 주변 유동인구가 많고 지하철이 가까워 <strong>밤 늦게까지도 안전</strong>한 편.';
                        } else {
                            summary += '으며, 주변 유동인구가 많아 <strong>지역 내에서도 안전</strong>한 편.';
                        }
                    }
                } else {
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 아주 많지는 않은 편.';

                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 지하철이 가까워 <strong>밤 늦게 귀가할 때도 안전</strong>한 편.';
                        } else {
                            summary += '지만 너무 <strong>밤 늦게 돌아다니는 것은 삼가는 것</strong>이 좋음.';
                        }
                    }
                }
            } else if (areaScore > 6) {
                if (!score.floating.area) {
                    summary += '일반적인 치안 수준의 <b>' + areaName + '</b> 지역에 위치하고 있';
                }

                if (localGood) {
                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 주변 유동인구가 많고 지하철이 가까워 <strong>밤 늦게 귀가할 때도 안전</strong>한 편.';
                        } else {
                            summary += '으며, 주변 유동인구가 많아 <strong>안전한 편이지만 너무 밤 늦게 귀가하는 것은 삼가</strong>는 것이 좋음.';
                        }
                    }
                } else {
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 많지는 않은 편에 속함.';

                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, <strong>지하철이 가깝지만 너무 밤 늦게 귀가하는 것은 삼가</strong>는 것이 좋음.';
                        } else {
                            summary += '으며, 주변 유동인구가 아주 많은 편은 아니므로 <strong>밤 늦게 돌아다니지 않는</strong> 것이 좋음.';
                        }
                    }
                }
            } else {
                if (!score.floating.area) {
                    summary += '전반적으로 치안이 좋지 않은 편인 <b>' + areaName + '</b> 지역에 위치하고 있';
                }

                if (localGood) {
                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 유동인구가 많고 지하철이 가까워 <strong>지역 내에서는 안전한 편이지만 늦은 시간 귀가는 삼가는 것</strong>이 좋음.';
                        } else {
                            summary += '으며, 주변 유동인구가 많은 편이지만 <strong>늦은 시간에 귀가하지 않는 것</strong>이 좋음.';
                        }
                    }
                } else {
                    localTxt += '주변에 많은 시설이 있거나 유명한 관광지가 있지 않아 유동인구가 지역 내에서도 많지 않은 편.';
                    if (!score.floating.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            summary += '으며, 지하철이 가깝지만 유동인구가 많지 않은 편이므로 <strong>안전에 유의해야 함</strong>.';
                        } else {
                            summary += '으며, 유동인구가 많지 않아 <strong>안전에 유의해야 함</strong>.';
                        }
                    }
                }
            }

            safe_txt.push(localTxt);

            var met = hotel.local.nearestMetro;
            var metDis = met.distance;
            var metTxt = '가장 가까운 지하철 역은 <b>' + met.line + '호선 ' + met.name + '역</b>으로, 도보로 약 <strong>' + (Math.floor(metDis / 75) + 1) + '분</strong> 거리에 있';

            if (metDis < 200) {
                metTxt += '어 <strong>늦은 밤에 귀가하기 좋음</strong>.';
            } else if (metDis < 500) {
                metTxt += '음.';
            } else {
                metTxt += '어 <strong>너무 늦은 밤에는 지하철로 귀가하기 부담</strong>스러울 수 있음';
            }

            var metScore = Math.max(Math.round((300 - metDis) / 300), 0);

            score += metScore;

            if (score > 9.2) {
                score = 9.2 + (score - 9.2) / 4;
            }

            score = Math.min(Math.round(score * 7.92 + 22) / 10, 9.9);

            safe_txt.push(metTxt);

            hotel.assessment.safety = {
                score: score
            };

            scoreArray.push(score);

            if (score > 9.4) {
                safe_txt.push('전반적으로 ' + cityName + ' 숙소들 중에서도 <strong>치안으로는 최상위권</strong>에 속해 여행을 즐기기 좋음.');
            } else if (score > 9) {
                safe_txt.push('' + cityName + ' 숙소들 중에서도 전반적으로 <strong>상당히 좋은 치안</strong>을 자랑함.');
            } else if (score > 8.5) {
                safe_txt.push('<strong>전반적으로 주변 치안이 안정</strong>되어 여행하기에 좋음.');
            } else if (score > 7.9) {
                safe_txt.push('밤 늦게 돌아다니지 않고 <strong>조심한다면 전반적으로 여행하기에 안전</strong>한 편.');
            } else if (score > 7.3) {
                safe_txt.push('전반적으로 <strong>' + cityName + ' 평균 정도의 치안 수준</strong>을 보이며, 조심히 다닐 필요는 있음.');
            } else if (score > 6.9) {
                safe_txt.push('치안이 아주 나쁘지는 않지만 <strong>조심히 다니는 것이 좋음</strong>.');
            } else {
                safe_txt.push('치안이 좋은 편은 아니므로 <strong>안전한 숙소를 원한다면 좋은 선택은 아님.</strong>');
            }

            hotel.explain.safety = safe_txt;

            if (hotel.summary) {
                hotel.summary.safety = summary;
            } else {
                hotel.summary = {
                    safety: summary
                };
            }
        }

        scoreArray.sort();

        data.status.hotels.safety = true;

        // firebase.database().ref('cities/'+this.city).update(data)
    },

    general: {
        score: function score(safety) {
            var score = (safety.score * 0.8 + safety.misdemeanor * 0.2 + 9) / 4; //2.5~4 사이의 값을 가짐

            return score;
        },
        txt: function txt(idx) {

            var scoreWord = ["", "매우 나빠 조심해야 함.", "좋지 않은 편.", "좋지 않은 편.", "나쁘지 않은 편.", "좋은 편.", "매우 좋은 편.", "매우 좋은 편."];
            //일반치안과 경범죄치안이 비슷한 경우 요 워딩

            //일반치안은 좋은데 경범죄치안은 나쁜 경우 아래 워딩을 'but' 접속사로 연결해 사용
            var scoreWord_connect = ["", "매우 나쁘", "좋지 않으", "좋지 않은 편이", "나쁘지 않은 편이", "좋은 편이", "매우 좋은 편이", "매우 좋으"];
            var misdemeanorWord = ["", "소매치기 등 경범죄에는 주의해야 함.", "소매치기 등 경범죄에는 주의해야 함.", "경범죄에는 주의해야 함.", "", "", "", ""];

            var safety = this.area[idx].safety;

            var txt = this.area[idx].name + ' 지역에 위치한 숙소로, 지역의 전반적인 치안은 ';

            if (safety.score > 4 && safety.misdemeanor < 4) {
                txt += scoreWord_connect[safety.score] + '지만 ' + misdemeanorWord[safety.misdemeanor];
            } else {
                txt += scoreWord[safety.score];
            }

            return txt;
        }
    },

    preprocess: {
        atm: function atm() {
            var atmArray = [];

            for (var hid in data.hotels) {
                var atm = data.hotels[hid].local.atm[29].location.score;
                atmArray.push(atm);
            }
            atmArray.sort(function (a, b) {
                return a - b;
            });

            var top15 = Math.floor(atmArray.length * 0.15);
            var top30 = Math.floor(atmArray.length * 0.3);

            var atmDistance = {
                top15: atmArray[top15],
                top30: atmArray[top30]
            };
        }
    },

    floating: {
        score: function score(hotel) {
            var floating = {
                area: false,
                atm: 0,
                spot: 0,
                grocery: 0

                // 유동인구가 별나게 많은 특정 area에 속하는 여부
                //TODO: local -> area에 인구밀도가 높은 area 배열로 넣어놓기 [뉴욕의 경우 6, 7, 8, 10 area]
            };if (this.local.area) {
                if (this.local.area.includes(hotel.area)) {
                    floating.area = true;
                }
            }
        },
        txt: function txt() {}
    }
};

exports.default = Safety;

/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _status = __webpack_require__(12);

var _status2 = _interopRequireDefault(_status);

var _first_check = __webpack_require__(13);

var _first_check2 = _interopRequireDefault(_first_check);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spot = {
    cities: {},
    current: "", //현재 보고있는 도시 cid - firebase ref에 off 달기위해

    init: function init(u_i) {
        var _this = this;

        var that = this;

        firebase.database().ref('setting/cities').on("value", function (snap) {
            var data = snap.val();
            _this.cities = data;

            _status2.default.order = u_i.setting.spot.order;

            _status2.default.data = data;
            _status2.default.inflate();
        });

        _status2.default.init(u_i);

        $(".spot").on("click", ".active", function () {
            var cid = $(this).parent().parent().attr('id');
            var status = that.cities[cid].status.spot;

            that.inflate_city(cid, status);
        });

        $(".spot").on("click", ".return", function () {
            _status2.default.inflate();
        });

        $(".spot").on("click", ".check__remainLargeData", function () {
            _first_check2.default.setRemainNumber($(this).parent().attr("id"), $(this).parent().children(".check__remainNumber").val());
        });

        $(".spot").on("click", ".check__nodata", function () {
            var sid = $(this).attr('sid');
            _first_check2.default.siteNodata(sid);
            toast('데이터 공백 처리');
        });
    },

    inflate_city: function inflate_city(cid, status) {
        console.log(cid);
        var that = this;

        firebase.database().ref('cities/' + that.current).off("value");

        firebase.database().ref('cities/' + cid).on("value", function (snap) {
            that.current = cid;
            var data = snap.val();

            if (data) {
                var cityName = that.cities[cid].name;
                if (status === 0) {
                    //현재 정보수집상태 검증
                    $(".header").html('<h2>' + cityName + ' 정보검증</h2>').attr('cid', cid).addClass("cityName");
                    _first_check2.default.init(data.spots);
                } else if (status === 1) {//합치기작업

                } else {//2차검증화면과 완료화면은 따로 차이가 없음

                    }
            } else {
                toast('아무런 데이터가 없습니다. 데이터 수집을 먼저 진행해주세요.');
            }
        });
    }
};

exports.default = Spot;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Spot_Status = {

    order: "",
    user: "",
    data: {},

    inflate: function inflate() {
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

        orderArray = this.orderList(orderArray);
        var statusArray = ['<p class="liner__status"><span class="active">정보검증</span> > <span>합치기</span> > <span>2차검증</span> > <span>완료</span></p>', '<p class="liner__status"><span>정보검증</span> > <span class="active">합치기</span> > <span>2차검증</span> > <span>완료</span></p>', '<p class="liner__status"><span>정보검증</span> > <span>합치기</span> > <span class="active">2차검증</span> > <span>완료</span></p>', '<p class="liner__status"><span>정보검증</span> > <span>합치기</span> > <span>2차검증</span> > <span class="active">완료</span></p>'];

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

    init: function init(u_i, data) {
        var that = this;
        this.data = data;

        $(".spot").on("click", ".order", function () {
            that.order = $(this).attr("id");
            var uid = that.user.mail;
            firebase.database().ref('users/' + uid + "/setting/spot/order").set(that.order);
            that.inflate();
        });
    },

    orderList: function orderList(orderArray) {
        orderArray.sort(function (a, b) {
            return a.idx > b.idx ? 1 : a.idx < b.idx ? -1 : 0;
        });

        return orderArray;
    }

};

exports.default = Spot_Status;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var First_Check = {
    init: function init(data) {
        var that = this;
        this.inflate(data);
    },

    siteNodata: function siteNodata(sid) {
        var city = $(".cityName").attr("cid");
        console.log(city);
        firebase.database().ref("cities/" + city + "/spots/" + sid + "/nodata").set(true);
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

    inflate: function inflate(data) {
        $(".header").append('<p class="return">돌아가기</p>');

        var hasProblem = false;
        var txt = '';
        var searchUrl = 'https://www.google.co.kr/maps/place/' + $(".cityName").html() + "+";

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
            toast("발견된 문제가 없어 데이터 병합을 실시합니다.");
            // this.autoCombine__spotRestructure();
        }

        $(".wrap").scrollTop(0);
    }
};

exports.default = First_Check;

/***/ }),
/* 14 */
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
/* 15 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmZkYWI3MjBmZjZlNTRkYzI4ZDMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hdHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9tYW51YWxDb21iaW5lLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9zcG90L3ZlcmlmeWluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3MtYnJvd3NlcmlmeS9icm93c2VyLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9ob3RlbC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvc2NvcmUvdHJhbnNwb3J0LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9zY29yZS9zYWZldHkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5L2FyZWEuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvc3BvdC9zdGF0dXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zcG90L2ZpcnN0X2NoZWNrLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvc3Vid2F5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvYWNjb3VudC5qcyJdLCJuYW1lcyI6WyJpbml0aWFsaXplZCIsInVfaSIsIk5hdl9mdW5jdGlvbiIsImF0dGVuZCIsImluaXQiLCJ0b2RvIiwiY2l0eSIsIm1hcCIsImFjY291bnQiLCJzcG90IiwiY2FsYyIsImhvdGVsIiwibGluayIsImxvZ2luIiwibmFtZSIsIiQiLCJodG1sIiwiYXR0ciIsImNsaWNrIiwiY29uZmlybSIsImZpcmViYXNlIiwiYXV0aCIsInNpZ25PdXQiLCJ0aGVuIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJjYXRjaCIsImVycm9yIiwiZG9jdW1lbnQiLCJyZWFkeSIsInByb3ZpZGVyIiwiR29vZ2xlQXV0aFByb3ZpZGVyIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwidXNlciIsIm1haWwiLCJlbWFpbCIsInNwbGl0IiwiZGF0YWJhc2UiLCJyZWYiLCJvbmNlIiwiZGF0YSIsInNuYXAiLCJ2YWwiLCJncmFkZSIsInRvYXN0Iiwic2lnbkluV2l0aFBvcHVwIiwicmVzdWx0IiwidXNlck1haWwiLCJzZXQiLCJkaXNwbGF5TmFtZSIsInNldHRpbmciLCJvcmRlciIsImNvZGUiLCJlcnJvckNvZGUiLCJlcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwiY3JlZGVudGlhbCIsImhhc0NsYXNzIiwiaXRlbSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJwYXJlbnQiLCJBdHRlbmQiLCJtb2JpbGUiLCJpZCIsInZpZXdJRCIsImF0dGVuZE9iaiIsInNhbGFyeSIsIndlZWtkYXlzIiwidGhhdCIsInR4dCIsInVzZXJzIiwibWFpbElEIiwicHJvcCIsIm9uIiwiY29uc29sZSIsImxvZyIsImluZmxhdGVfY2FsZW5kYXIiLCJsZW5ndGgiLCJmdWxsQ2FsZW5kYXIiLCJoZWlnaHQiLCJmaXJzdERheSIsInZpZXdSZW5kZXIiLCJ2aWV3IiwiZWxlbWVudCIsImRheUNsaWNrIiwiZGF0ZSIsImlucHV0V29ya0hvdXIiLCJsaXN0ZW5lciIsInNldFdvcmtIb3VyIiwia2V5dXAiLCJlIiwid2hpY2giLCJjaGFuZ2UiLCJ2aWV3X3dvcmtlciIsIm9mZiIsInlvIiwiZGF0ZUlEIiwic2xpY2UiLCJkaWYiLCJmcm9tIiwidG8iLCJpIiwiTWF0aCIsImZsb29yIiwiZHVyTW9uIiwidGhpc01vbnRoIiwiZGF0ZURvbSIsImVxIiwiaiIsIndlZWtEb20iLCJ3ZWVrRHVyIiwiZGF5RG9tIiwiZmluZCIsImsiLCJjaGlsZHJlbiIsImFwcGVuZCIsImZ1bGxNb250aEJvbnVzIiwiaW5zdXJhbmNlRmVlIiwiYmFzaWMiLCJyb3VuZCIsImZ1bGxXZWVrQnVudXMiLCJjb21tYSIsImRhdGVPYmoiLCJkYXRlU2hvcnQiLCJtb21lbnQiLCJmb3JtYXQiLCJBbnlQaWNrZXIiLCJkYXRlVGltZUZvcm1hdCIsImZvY3VzIiwid29yayIsImFsbEVtcHR5IiwicmVtb3ZlIiwiYWxlcnQiLCJmcm9tQSIsInRvQSIsInB1c2giLCJDaXR5IiwiY29kZURhdGEiLCJjaWQiLCJtZXRyb0FkanVzdCIsInJldHVyblRvQ2l0eVZpZXciLCJpbmZsYXRlX2NpdHlDb2RlVmlldyIsImNpdHlEYXRhIiwibWV0cm8iLCJuYW1lQXJyYXkiLCJsaW5lIiwic3RhdHVzIiwiYXJlYSIsInRyYW5zcG9ydCIsInByaWNlcyIsIlNwb3QiLCJpbnB1dENvb3JkaW5hdGUiLCJkZWxldGVTcG90Iiwic2V0UmVtYWluTnVtYmVyIiwic2lkIiwic2l0ZU5vZGF0YSIsInNwb3RzIiwiY29tYmluZWQiLCJmaXJzdENoZWNrIiwiYXV0b0NvbWJpbmVfX3Nwb3RSZXN0cnVjdHVyZSIsInNpdGVBcnIiLCJjb21iaW5pbmciLCJjb3VudGVyIiwic2l0ZSIsIm5vRGF0YSIsImRlbGV0ZWQiLCJvbGRTcG90Iiwia28iLCJlbiIsImNvb3IiLCJyYW5rIiwidGVzdCIsInVybCIsInRhZyIsImF1dG9Db21iaW5lX19jb21iaW5lIiwiY29tYmluZU9iaiIsImNvbWJpbmUiLCJoYXNDb21iaW5lZCIsInRDb2RlIiwidFNwb3QiLCJrZXkiLCJjYWxjdWxhdGVEaWYiLCJubyIsImNvb3JUeHQiLCJsYXQiLCJ0cmltIiwibG5nIiwiaXNOYU4iLCJNYW51YWxDb21iaW5lIiwibWFya2VyIiwicHJpbWUiLCJ0YXJnZXQiLCJyZW1haW4iLCJ0b2dnbGVDbGFzcyIsIm5leHRTdGVwIiwibWFpbkRhdGEiLCJ0aWQiLCJ0YXJnZXREYXRhIiwiaW5jbHVkZXMiLCJ1cGRhdGUiLCJPYmplY3QiLCJrZXlzIiwiaW5mbGF0ZSIsInNldFRpbWVvdXQiLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiZ2V0RWxlbWVudEJ5SWQiLCJjZW50ZXIiLCJ6b29tIiwibWFwVHlwZUNvbnRyb2wiLCJzY2FsZUNvbnRyb2wiLCJmdWxsc2NyZWVuQ29udHJvbCIsImFkZExpc3RlbmVyIiwiY2hvb3NlQ29vcmRpbmF0ZSIsImxhdExuZyIsInNldE1hcCIsIk1hcmtlciIsInBvc2l0aW9uIiwicGFuVG8iLCJpZHgiLCJsYXRsbmciLCJ0TWFya2VyIiwibGFiZWwiLCJ0b1N0cmluZyIsIlZlcmlmeSIsImNoZWNrIiwibWVyZ2UiLCJyZW1vdmVBbGwiLCJkaXYiLCJjb25maWciLCJtYXhTY29yZSIsIm9uZU1pbnVzIiwidHdvTXVudXMiLCJudkFkZCIsInJhbmtBcnJheSIsIm51bVNpdGUiLCJzY29yZSIsImF2ZyIsImJlc3RSYW5rIiwibnYiLCJzb3J0IiwiYSIsImIiLCJzcG90QXJyYXkiLCJyYW5raW5nIiwiZ2ciLCJscCIsInRhIiwicmFua2VkIiwiSG90ZWwiLCJjaXR5TmFtZSIsImhvdGVscyIsInNhZmV0eSIsImZhY2lsaXR5IiwidGhlbWUiLCJzY29yZV9mYWNpbGl0eSIsInNjb3JlQXJyYXkiLCJoaWQiLCJhdG0iLCJsb2NhbCIsImFzc2Vzc21lbnQiLCJjb252ZW5pZW5jZSIsImxvY2FsU2NvcmUiLCJncm9jZXJ5U2NvcmUiLCJjaXRpU2NvcmUiLCJhdG1TY29yZSIsImV4cGxhaW4iLCJzdW1tYXJ5IiwiZ3JvY2VyeVR4dCIsImdyb2NlcnkiLCJncm9jZXJ5NzUiLCJncm9jZXJ5MTUwIiwiZ3JvY2VyeTIyNSIsImdyb2NlcnkzMDAiLCJtYXgiLCJuZWFyZXN0IiwiZ3JvY2VyeVRpbWUiLCJvcGVuMjRDaXRpQXJyYXkiLCJjaXRpIiwiY2l0aWRpZiIsIm9wZW5Ib3VyIiwiYWRkcmVzcyIsImNpdGlXb3JkIiwibWluIiwidmlzYSIsInZpc2FBcnJheSIsImJhbmtBcnJheSIsInBsYWNlTmFtZSIsInZpc2FNaW4iLCJ2aXNhV29yZCIsImdyb2NlcnlUZW1wIiwib3RoZXIiLCJvdGEiLCJhZ29kYSIsInN0YXIiLCJyYXRpbmciLCJncmFkZV9hdmciLCJyZXZpZXdzIiwiZ3JhZGVfbm8iLCJzY29yZV9zYWZldHkiLCJzY29yZV90cmFuc3BvcnQiLCJtdXNpY2FsIiwidGhlYXRlciIsInRoZWF0cmUiLCJ0aWNrZXQiLCJsb3dlcnBvbHlDb29yIiwicG9seWdvbiIsIlBvbHlnb24iLCJwYXRocyIsInByb21lbmFkZSIsImR1bWJvIiwiYnJpZGdlIiwibGFyZ2VTdHJlZXQiLCJsYXJnZVN0cmVldEtvIiwiY2VudHJhbE5lYXJlc3RQb2x5IiwiY2VudHJhbE5lYXJQb2x5IiwiY2VudHJhbE1pZFBvbHkiLCJjZW50cmFsRmFyUG9seSIsImNlbnRyYWxOZWFyZXN0IiwiY2VudHJhbE1pZCIsImNlbnRyYWxOZWFyIiwiY2VudHJhbEZhciIsImNlbnRyYWxTcG90cyIsImNlbnRyYWxTY29yZUFycmF5IiwiYnJvYWR3YXkiLCJsb3dlciIsImNlbnRyYWwiLCJzdW1tYXJ5X3RoZW1lIiwic2NvcmVPYmoiLCJicm9hZFdvcmQiLCJicm9hZCIsIndhbGthYmxlIiwiaGFzTGluZSIsImJyb2FkRGlmU2NvcmUiLCJsaW5lT2JqIiwic3VtIiwibWV0cm9JbmZvIiwibWV0cm9JbmYiLCJ3YWxrRGlmIiwiZGlzdGFuY2UiLCJtZXROYW1lIiwiaG90ZWxNZXROYW1lIiwibWV0cm9EaWYiLCJ3YWxrIiwiYnJvYWRTY29yZUFycmF5Iiwic2MiLCJjZW50cmFsV29yZCIsImNlbnRyYWxTdW1tYXJ5IiwiTGF0TG5nIiwiaGFzU3BvdCIsImNlbnRyYWxOZWFyU3BvdCIsInNlY29uZHR4dCIsInNwb3RDb29yIiwiZ2VvbWV0cnkiLCJwb2x5IiwiY29udGFpbnNMb2NhdGlvbiIsInRoZW1lQXJyYXkiLCJoYXNMb3dlclRoZW1lIiwidG9Mb3dlckNhc2UiLCJuZWFyU29tZXRoaW5nIiwic29tZXRoaW5nVHh0QXJyIiwicGRpZiIsIm5lYXJQcm9tZW5hZGUiLCJkaWZkaWYiLCJiZGlmIiwidG9GaXhlZCIsImRpZlRvTWluV29yZCIsImRkaWYiLCJuZWFyQnJpZGdlIiwiam9pbiIsIlRyYW5zcG9ydCIsIm9yZGVyQXJyYXkiLCJtZXRyb0xpbmUiLCJ0cmFuc3BvcnRfdHh0IiwiZ29vZExpbmUiLCJ2aXNpdGFibGUiLCJsaW5lTm8iLCJtZXRMaW5lIiwic3BvdE5vIiwiY2VpbCIsIm1ldERpc3RhbmNlIiwibGVuIiwiU2FmZXR5IiwiYXRtRGlzdGFuY2UiLCJwcmVwcm9jZXNzIiwic2FmZV90eHQiLCJnZW5lcmFsIiwiZmxvYXRpbmciLCJtYWluU3RyZWV0IiwiYXRtMzB0aCIsImVudGVyYW5jZSIsIm5lYXJlc3RNZXRybyIsImFyZWFTY29yZSIsImFyZWFTYWZldHkiLCJtaXNkZW1lYW5vciIsImxvY2FsVHh0IiwibG9jYWxHb29kIiwiYXJlYU5hbWUiLCJtZXQiLCJtZXREaXMiLCJtZXRUeHQiLCJtZXRTY29yZSIsInNjb3JlV29yZCIsInNjb3JlV29yZF9jb25uZWN0IiwibWlzZGVtZWFub3JXb3JkIiwiYXRtQXJyYXkiLCJ0b3AxNSIsInRvcDMwIiwiQXJlYSIsInNjb3JlQ2hhbmdlIiwiaW5kZXgiLCJhcmVhZGF0YSIsIm5vdEFyZWEiLCJjaXRpZXMiLCJjdXJyZW50IiwiaW5mbGF0ZV9jaXR5IiwiU3BvdF9TdGF0dXMiLCJjaGFuZ2VkIiwib3JkZXJMaXN0Iiwic3RhdHVzQXJyYXkiLCJ1aWQiLCJGaXJzdF9DaGVjayIsIm51bWJlciIsImN1dE5vIiwiY3V0T2JqIiwiaGFzUHJvYmxlbSIsInNlYXJjaFVybCIsInNpdGVPYmoiLCJzaXRlSGFzUHJvYmxlbSIsIm5vQ29vciIsIm5vQ29vclR4dCIsIm5vU3BvdCIsIm5vU3BvdFR4dCIsIm5vZGF0YSIsImhhc0Nvb3IiLCJsYXJnZU9LIiwibGFyZ2VEYXRhIiwic2Nyb2xsVG9wIiwiU3Vid2F5IiwiZmluZFN1YndheSIsIm1ldHJvQnlTdG4iLCJtZXRyb05hbWUiLCJjb25jYXQiLCJtZXRBcnJheSIsIm1ldFN0bkFycmF5IiwiQWNjb3VudCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLGNBQWMsRUFBbEI7O0FBRUEsSUFBSUMsTUFBTSxFQUFWOztBQUVBLElBQUlDLGVBQWU7QUFDZkMsWUFBUSxrQkFBWTtBQUNoQix5QkFBT0MsSUFBUCxDQUFZSCxHQUFaO0FBQ0FELG9CQUFZRyxNQUFaLEdBQXFCLElBQXJCO0FBQ0gsS0FKYztBQUtmRSxVQUFNLGdCQUFZLENBRWpCLENBUGM7QUFRZkMsVUFBTSxnQkFBWTtBQUNkLHVCQUFLRixJQUFMLENBQVVILEdBQVY7QUFDQUQsb0JBQVlNLElBQVosR0FBbUIsSUFBbkI7QUFDSCxLQVhjO0FBWWZDLFNBQUssZUFBWTtBQUNiLHlCQUFPSCxJQUFQO0FBQ0gsS0FkYztBQWVmSSxhQUFTLG1CQUFZLENBRXBCLENBakJjO0FBa0JmQyxVQUFNLGdCQUFZO0FBQ2QsdUJBQUtMLElBQUwsQ0FB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TjtBQUNBQSxlQUFNLFFBQU47O0FBRUF4RCxVQUFFLFVBQUYsRUFBY0MsSUFBZCxDQUFtQnVELEdBQW5COztBQUVBbkQsaUJBQVNrQixRQUFULEdBQW9CQyxHQUFwQixDQUF3QixPQUF4QixFQUFpQ0MsSUFBakMsQ0FBc0MsT0FBdEMsRUFBK0MsZ0JBQVE7QUFDbkQsZ0JBQUlDLE9BQU9DLEtBQUtDLEdBQUwsRUFBWDs7QUFHQSxpQkFBSyxJQUFJNFgsR0FBVCxJQUFnQjlYLElBQWhCLEVBQXNCO0FBQ2xCLG9CQUFHOFgsUUFBUXRXLEVBQVgsRUFBYztBQUNWLDBCQUFLL0IsSUFBTCxDQUFVcVksR0FBVixJQUFpQjtBQUNielosOEJBQU0yQixLQUFLOFgsR0FBTCxFQUFVelo7QUFESCxxQkFBakI7QUFHSDtBQUNKOztBQUVEQyxjQUFFLGtCQUFGLEVBQXNCaUUsWUFBdEIsQ0FBbUM7QUFDL0JDLHdCQUFRLEdBRHVCO0FBRS9CQywwQkFBVSxDQUZxQjtBQUcvQkMsNEJBQWEsb0JBQVVDLElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCO0FBQ2xDZix5QkFBS3NJLE9BQUw7QUFDSCxpQkFMOEI7QUFNL0J0SCwwQkFBVSxrQkFBU0MsSUFBVCxFQUFjO0FBQ3BCWCw0QkFBUUMsR0FBUixDQUFZVSxJQUFaO0FBQ0g7QUFSOEIsYUFBbkM7O0FBV0Esa0JBQUtxSCxPQUFMO0FBQ0gsU0F4QkQ7QUF5QkgsS0FuQ1M7O0FBcUNWQSxhQUFTLG1CQUFVLENBRWxCOztBQXZDUyxDQUFkOztrQkEyQ2VvUCxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZmZkYWI3MjBmZjZlNTRkYzI4ZDMiLCJpbXBvcnQgQXR0ZW5kIGZyb20gXCIuL21vZHVsZXMvYXR0ZW5kLmpzXCI7XHJcbmltcG9ydCBDaXR5IGZyb20gXCIuL21vZHVsZXMvY2l0eS5qc1wiO1xyXG5pbXBvcnQgU3BvdCBmcm9tIFwiLi9tb2R1bGVzL3Nwb3QuanNcIlxyXG5pbXBvcnQgU3Vid2F5IGZyb20gXCIuL21vZHVsZXMvc3Vid2F5LmpzXCI7XHJcbmltcG9ydCBBY2NvdW50IGZyb20gXCIuL21vZHVsZXMvYWNjb3VudC5qc1wiO1xyXG5cclxudmFyIGluaXRpYWxpemVkID0ge31cclxuXHJcbnZhciB1X2kgPSB7fVxyXG5cclxudmFyIE5hdl9mdW5jdGlvbiA9IHtcclxuICAgIGF0dGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEF0dGVuZC5pbml0KHVfaSk7XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQuYXR0ZW5kID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICB0b2RvOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGNpdHk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBDaXR5LmluaXQodV9pKTtcclxuICAgICAgICBpbml0aWFsaXplZC5jaXR5ID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBtYXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBTdWJ3YXkuaW5pdCgpO1xyXG4gICAgfSxcclxuICAgIGFjY291bnQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgc3BvdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFNwb3QuaW5pdCh1X2kpO1xyXG4gICAgfSxcclxuICAgIGNhbGM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgaG90ZWw6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgbGluazogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9naW4obmFtZSl7XHJcbiAgICAkKFwiLmhlbGxvV29ybGRcIikuaHRtbChuYW1lWzFdK1wi7ZWYIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5hdHRyKFwidGl0bGVcIixuYW1lK1wi64uYIOyViOuFle2VmOyEuOyalCFcIik7XHJcbiAgICAkKFwiLmhlbGxvV29ybGRcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihjb25maXJtKG5hbWUrXCLri5gg66Gc6re47JWE7JuDIO2VmOyLnOqyoOyKteuLiOq5jD9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgLy8gQW4gZXJyb3IgaGFwcGVuZWQuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgICBsZXQgbWFpbCA9IHVzZXIuZW1haWwuc3BsaXQoJ0AnKVswXTtcclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v7JWE656YIOuCtOyaqeydhCDrsJTqvrjrqbQgaWYgKCFpc1VzZXIpIOu2gOu2hOyXkOuPhCDrsJjrk5zsi5wg67CY7JiB7ZW07KSE6rKDXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgKHZhciBnaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGRhdGFbZ2lkXS5cclxuICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLnVwZGF0ZShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVttYWlsXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVfaSA9IGRhdGFbbWFpbF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyYWRlID0gdV9pLmdyYWRlICogMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdHRlbmQuaW5pdChkYXRhW21haWxdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2NvdW50LmluaXQobWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hY2NvdW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hdHRlbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dpbih1X2kubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBVc2VyIGlzIHNpZ25lZCBpbi5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gTm8gdXNlciBpcyBzaWduZWQgaW4uXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IHJlc3VsdC51c2VyO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJNYWlsID0gdXNlci5lbWFpbC5zcGxpdCgnQCcpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbbWFpbF0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1X2kgPSBkYXRhW21haWxdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmFkZSA9IHVfaS5ncmFkZSAqIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBdHRlbmQuaW5pdChkYXRhW21haWxdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmFkZSA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjY291bnQuaW5pdChtYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hY2NvdW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dpbih1X2kubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigndXNlcnMvJyArIHVzZXJNYWlsKS5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLmRpc3BsYXlOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbDogdXNlck1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogXCJhYmNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgnY29kZTonICsgZXJyb3IuY29kZSArICcgLSDsnbzsi5zsoIHsnbgg66y47KCc6rCAIOuwnOyDne2WiOyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalC4nKVxyXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIEVycm9ycyBoZXJlLlxyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yQ29kZSA9IGVycm9yLmNvZGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBlbWFpbCBvZiB0aGUgdXNlcidzIGFjY291bnQgdXNlZC5cclxuICAgICAgICAgICAgICAgIHZhciBlbWFpbCA9IGVycm9yLmVtYWlsO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGZpcmViYXNlLmF1dGguQXV0aENyZWRlbnRpYWwgdHlwZSB0aGF0IHdhcyB1c2VkLlxyXG4gICAgICAgICAgICAgICAgdmFyIGNyZWRlbnRpYWwgPSBlcnJvci5jcmVkZW50aWFsO1xyXG4gICAgICAgICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSlcclxuXHJcbiQoXCIubmF2X19pdGVtXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKCEkKHRoaXMpLmhhc0NsYXNzKCduYXZfX2l0ZW0tLWhhc0RyYXdlcicpKXtcclxuICAgICAgICB2YXIgaXRlbSA9ICQodGhpcykuYXR0cihcImlkXCIpLnNwbGl0KFwiX1wiKVsxXTtcclxuXHJcbiAgICAgICAgJChcIi5uYXY+KlwiKS5yZW1vdmVDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcblxyXG4gICAgICAgICQoXCIucGFnZXNcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLnBhZ2VzLlwiICsgaXRlbSkucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICAgICAgaWYoIWluaXRpYWxpemVkW2l0ZW1dKXtcclxuICAgICAgICAgICAgTmF2X2Z1bmN0aW9uW2l0ZW1dKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG5cclxuJChcIi5uYXZfX2RyYXdlcl9faXRlbVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgdmFyIGl0ZW0gPSAkKHRoaXMpLmF0dHIoXCJpZFwiKS5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgJChcIi5uYXY+KlwiKS5yZW1vdmVDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAkKFwiLm5hdl9fZHJhd2VyX19pdGVtXCIpLnJlbW92ZUNsYXNzKFwibmF2X19kcmF3ZXJfX2l0ZW0tLXNlbGVjdGVkXCIpXHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwibmF2X19kcmF3ZXJfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG5cclxuICAgICQoXCIucGFnZXNcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIucGFnZXMuXCIgKyBpdGVtKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgIGlmICghaW5pdGlhbGl6ZWRbaXRlbV0pIHtcclxuICAgICAgICBOYXZfZnVuY3Rpb25baXRlbV0oKTtcclxuICAgIH1cclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9pbmRleC5qcyIsInZhciBBdHRlbmQgPSB7XHJcbiAgICBtb2JpbGU6IGZhbHNlLFxyXG5cclxuICAgIGlkOiBcIlwiLFxyXG5cclxuICAgIHZpZXdJRDogXCJcIixcclxuICAgIC8v6rSA66as7J6Q6rCAIOuLpOuluCDsgqzrnozsnZggSUQg7ZmV7J247KSRXHJcblxyXG4gICAgYXR0ZW5kT2JqOiB7fSxcclxuXHJcbiAgICBzYWxhcnk6IHt9LFxyXG5cclxuXHJcbiAgICB3ZWVrZGF5czogW1wi7J28XCIsIFwi7JuUXCIsIFwi7ZmUXCIsIFwi7IiYXCIsIFwi66qpXCIsIFwi6riIXCIsIFwi7YagXCIsIFwi7J28XCJdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKHVfaSl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHZhciBncmFkZSA9IHVfaS5ncmFkZTtcclxuICAgICAgICB2YXIgaWQgPSB1X2kuaWQ7XHJcblxyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuXHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCs9JzxzZWxlY3QgY2xhc3M9XCJ3b3JrZXJfc2VsZWN0b3JcIj48L3NlbGVjdD4nXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fdG9wXCI+JztcclxuICAgICAgICB0eHQgKz0gICAnPGRpdiBpZD1cImNhbGVuZGFyXCIgY2xhc3M9XCJhdHRlbmRfX2NhbGVuZGFyXCI+PC9kaXY+J1xyXG4gICAgICAgIHR4dCArPSAgICc8ZGl2IGNsYXNzPVwiYXR0ZW5kX193ZWVrXCI+PC9kaXY+J1xyXG4gICAgICAgIHR4dCArPSc8L2Rpdj4nXHJcbiAgICAgICAgdHh0ICs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoXCI+PC9kaXY+J1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLmF0dGVuZFwiKS5odG1sKHR4dCkucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhY2NvdW50L3NhbGFyeVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdGhhdC5zYWxhcnkgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICBpZihncmFkZSA9PT0gNSl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmdWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlcnMgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG1haWxJRCBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih1c2Vyc1ttYWlsSURdLmdyYWRlKjE8NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgbWFpbElEICsgJ1wiPicgKyB1c2Vyc1ttYWlsSURdLm5hbWUgKyAnPC9vcHRpb24+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIud29ya2VyX3NlbGVjdG9yXCIpLmh0bWwodHh0KS52YWwoaWQpLnByb3AoXCJzZWxlY3RlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCkub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmdWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZE9iaiA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5hdHRlbmRPYmopXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZighJChcIi5mYy1oZWFkZXItdG9vbGJhclwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iailcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFdvcmtIb3VyKGRhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5vbihcImNsaWNrXCIsIFwiLmNvbmZpcm1cIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoISQoXCIuYXR0ZW5kXCIpLmhhc0NsYXNzKCdkaXNwbGF5Tm9uZScpKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJCh0aGlzKS5hdHRyKFwiZGlkXCIpKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiLm1vZGFsXCIpLm9uKFwiY2xpY2tcIiwgXCIuY2xvc2VcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKCEkKFwiLmF0dGVuZFwiKS5oYXNDbGFzcygnZGlzcGxheU5vbmUnKSkge1xyXG4gICAgICAgICAgICAgICAgJChcIi5ibGFja1NjcmVlblwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCJib2R5XCIpLmtleXVwKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBpZiAoISQoXCIuYXR0ZW5kXCIpLmhhc0NsYXNzKCdkaXNwbGF5Tm9uZScpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIi5tb2RhbCAuY29uZmlybVwiKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29kZSA9IGUud2hpY2g7IC8vIHJlY29tbWVuZGVkIHRvIHVzZSBlLndoaWNoLCBpdCdzIG5vcm1hbGl6ZWQgYWNyb3NzIGJyb3dzZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFdvcmtIb3VyKCQoXCIubW9kYWwgLmNvbmZpcm1cIikuYXR0cihcImRpZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5jaGFuZ2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld193b3JrZXIoaWQpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHZpZXdfd29ya2VyOiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZihpZCA9PT0gdGhhdC5pZCl7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19jYWxlbmRhclwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fbW9udGhcIikuaHRtbChcIlwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX2NhbGVuZGFyXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgIGlmKHRoYXQudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoYXQudmlld0lEKS5vZmYoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIraWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmF0dGVuZE9iaiA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeW8gPSB0aGF0LnZpZXdJRDtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlld0lEID0gaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoeW8ubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhhdC5pZCAhPT0gdGhhdC52aWV3SUQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iailcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5Q2xpY2s6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFdvcmtIb3VyKGRhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jYWxlbmRhcjogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5hdHRlbmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmZjLWRheVwiKS5odG1sKFwiXCIpO1xyXG5cclxuICAgICAgICBpZihkYXRhLmF0dGVuZCl7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmF0dGVuZFxyXG4gICAgICAgICAgICBmb3IgKHZhciBkYXRlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlSUQgPSBkYXRlLnNsaWNlKDAsNCkrXCItXCIrZGF0ZS5zbGljZSg0LDYpK1wiLVwiK2RhdGUuc2xpY2UoNiw4KTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAwXHJcbiAgICAgICAgICAgICAgICBsZXQgdHh0ID0gJzxwPicrZGF0YVtkYXRlXVswXS5mcm9tK1wiflwiK2RhdGFbZGF0ZV1bMF0udG8rJzwvcD4nXHJcbiAgICAgICAgICAgICAgICAvL+uRkO2DgOyehCDrgpjriKDshJwg6re866y07ZaI7Ja064+EIOuLrOugpeyXkCDtkZzsi5zrkJjripQg6rKD7J2AIOyyq+2DgOyehCDqt7zrrLTsi5zqsITrp4xcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWYgKz0gZGF0YVtkYXRlXVtpXS5kaWZcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8cD4nICsgTWF0aC5mbG9vcihkaWYvNjApICsgXCLsi5zqsIQgXCIrIGRpZiU2MCArXCLrtoRcIisnPC9wPidcclxuICAgICAgICAgICAgICAgICQoJy5hdHRlbmQgLmZjLWRheVtkYXRhLWRhdGU9XCInK2RhdGVJRCsnXCJdJykuaHRtbCh0eHQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGR1ck1vbiA9IDA7XHJcbiAgICAgICAgICAgIGxldCB0aGlzTW9udGggPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLmF0dGVuZCAuZmMtZGF5XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZURvbSA9ICQoXCIuYXR0ZW5kIC5mYy1kYXlcIikuZXEoaSk7XHJcbiAgICAgICAgICAgICAgICBpZighZGF0ZURvbS5oYXNDbGFzcyhcImZjLW90aGVyLW1vbnRoXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGRhdGVEb20uYXR0cihcImRhdGEtZGF0ZVwiKS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc01vbnRoID0gZGF0ZVswXStkYXRlWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlWzBdK2RhdGVbMV0rZGF0ZVsyXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyTW9uICs9IGRhdGFbZGF0ZV1bal0uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdHh0ID0gJydcclxuXHJcbiAgICAgICAgICAgIGlmKCQoXCIuYXR0ZW5kIC5mYy12aWV3LWNvbnRhaW5lclwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHsgICAvL+ustOyhsOqxtCA27KO8XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWtEb20gPSAkKFwiLmF0dGVuZCAuZmMtd2Vla1wiKS5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla0R1ciA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXlEb20gPSB3ZWVrRG9tLmZpbmQoXCIuZmMtZGF5XCIpLmVxKGopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gZGF5RG9tLmF0dHIoXCJkYXRhLWRhdGVcIikuc3BsaXQoXCItXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlWzBdK2RhdGVbMV0rZGF0ZVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrRHVyICs9IGRhdGFbZGF0ZV1ba10uZGlmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2Vla0R1cj4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj4nKyBNYXRoLmZsb29yKHdlZWtEdXIvNjApKyfsi5zqsIQgJyt3ZWVrRHVyJTYwKyfrtoQnICsnPC9wPidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj48L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKHR4dClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoXCIuYXR0ZW5kIC5mYy1sZWZ0XCIpLmNoaWxkcmVuKFwiaDIuZHVyTW9udGhcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICQoXCIuYXR0ZW5kIGgyLmR1ck1vbnRoXCIpLmh0bWwoJyAoJytNYXRoLmZsb29yKGR1ck1vbi82MCkrJ+yLnOqwhCAnK2R1ck1vbiU2MCsn67aEKScpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJChcIi5hdHRlbmQgLmZjLWxlZnRcIikuYXBwZW5kKCc8aDIgY2xhc3M9XCJkdXJNb250aFwiPiAoJytNYXRoLmZsb29yKGR1ck1vbi82MCkrJ+yLnOqwhCAnK2R1ck1vbiU2MCsn67aEKTwvaDI+JylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHh0ID0gJyc7ICAgLy92YXIg67m866i57J2A6rGwIOyVhOuLmC4g7JyE7JeQ7IScIOyEoOyWuCDtlojsnYwhXHJcblxyXG4gICAgICAgICAgICBsZXQgZnVsbE1vbnRoQm9udXMgPSAzMDQwMDtcclxuICAgICAgICAgICAgbGV0IGluc3VyYW5jZUZlZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBiYXNpYyA9IE1hdGgucm91bmQoZHVyTW9uLzYwKjc2MDApXHJcbiAgICAgICAgICAgIGxldCBmdWxsV2Vla0J1bnVzID0gTWF0aC5yb3VuZCgoZHVyTW9uLzYwKjc2MDApKjAuMik7XHJcblxyXG4gICAgICAgICAgICAvLyBpZih0aGlzLmlkID09PSB0aGlzLnZpZXdJRCl7XHJcbiAgICAgICAgICAgIC8vICAgICAvL+uzuOyduCDrqqjrk5xcclxuICAgICAgICAgICAgLy8gICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnkvXCIrdGhpc01vbnRoK1wiL1wiK3RoaXMuaWQpLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYmFzaWM6IGJhc2ljLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxXZWVrQnVudXM6IGZ1bGxXZWVrQnVudXMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbE1vbnRoQm9udXM6IGZ1bGxNb250aEJvbnVzXHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImFjY291bnQvc2FsYXJ5L1wiK3RoaXNNb250aCtcIi9cIit0aGlzLnZpZXdJRCkudXBkYXRlKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBiYXNpYzogYmFzaWMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbFdlZWtCdW51czogZnVsbFdlZWtCdW51cyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsTW9udGhCb251czogZnVsbE1vbnRoQm9udXNcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7quLDrs7jquIk8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGJhc2ljKSsgXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq3vOustOyLnOqwhCBYIDcsNjAw7JuQPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7so7ztnLTsiJjri7k8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGZ1bGxXZWVrQnVudXMpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6riw67O46riJ7J2YIDIwJTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7Jew7LCo7IiY64u5PC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShmdWxsTW9udGhCb251cykgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj417Iuc6rCEIOyDgeuLuSDquLDrs7jquIk8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmUgYXR0ZW5kX19tb250aF9fbGluZS0tcmVkXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuyCrO2ajOuztO2XmOujjDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoaW5zdXJhbmNlRmVlKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq1reuvvOyXsOq4iC/qs6Dsmqnrs7Ttl5gv6rG06rCV67O07ZeYIOyyreq1rOyVoTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZSBhdHRlbmRfX21vbnRoX19saW5lLS1zdW1cIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7ZWp6rOEPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShiYXNpYyArIGZ1bGxXZWVrQnVudXMgKyBmdWxsTW9udGhCb251cyAtIGluc3VyYW5jZUZlZSkgK1wi7JuQPC9wPlwiXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq4sOuzuOq4iSArIOyjvO2ctOyImOuLuSArIOyXsOywqOyImOuLuSAtIOyCrO2ajOuztO2XmOujjDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19tb250aFwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dFdvcmtIb3VyOiBmdW5jdGlvbihkYXRlT2JqKXtcclxuICAgICAgICAvLyBjc3M6IG1vZHVsZXMvYXR0ZW5kLmNzc1xyXG4gICAgICAgIGxldCBkYXRlU2hvcnQgPSBtb21lbnQoZGF0ZU9iaikuZm9ybWF0KFwiTU0vRERcIik7XHJcbiAgICAgICAgbGV0IGRhdGVJRCA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoXCJZWVlZTU1ERFwiKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fVxyXG4gICAgICAgIGlmKHRoaXMuYXR0ZW5kT2JqLmF0dGVuZFtkYXRlSURdKXtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuYXR0ZW5kT2JqLmF0dGVuZFtkYXRlSURdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHh0ID0gJydcclxuXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImJsYWNrU2NyZWVuXCI+J1xyXG4gICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJpbnB1dFdpbmRvd1wiPidcclxuICAgICAgICB0eHQrPSAgICAgICAnPHAgY2xhc3M9XCJ0aXRsZVwiPicrZGF0ZVNob3J0Kycg6re866y07Iuc6rCEPC9wPidcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj4nXHJcbiAgICAgICAgaWYoZGF0YVswXSl7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJmaXJzdF9mcm9tXCIgdmFsdWU9XCInK2RhdGFbMF0uZnJvbSsnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cImZpcnN0X3RvXCIgdmFsdWU9XCInK2RhdGFbMF0udG8rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJmaXJzdF9mcm9tXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cImZpcnN0X3RvXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj4nXHJcbiAgICAgICAgaWYoZGF0YVsxXSl7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJzZWNvbmRfZnJvbVwiIHZhbHVlPVwiJytkYXRhWzFdLmZyb20rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJzZWNvbmRfdG9cIiB2YWx1ZT1cIicrZGF0YVsxXS50bysnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPidcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9ICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxkaXYgY2xhc3M9XCJib3R0b21cIj4nXHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAgICc8cCBjbGFzcz1cImNvbmZpcm1cIiBkaWQ9XCInK2RhdGVJRCsnXCI+7ZmV7J24PC9wPidcclxuICAgICAgICB0eHQrPSAgICAgICAgICAgJzxwIGNsYXNzPVwiY2xvc2VcIj7st6jshow8L3A+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgdHh0Kz0gICAnPC9kaXY+J1xyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubW9iaWxlKXtcclxuICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5BbnlQaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgZGF0ZVRpbWVGb3JtYXQ6XCJISDptbVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiI2ZpcnN0X2Zyb21cIikuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRXb3JrSG91cjogZnVuY3Rpb24oZGF0ZSl7XHJcblxyXG4gICAgICAgIGxldCB3b3JrID0gW107XHJcblxyXG4gICAgICAgIGxldCBhbGxFbXB0eSA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKCQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikuZXEoaSkudmFsKCkubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgYWxsRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWxsRW1wdHkpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLnZpZXdJRCtcIi9hdHRlbmQvXCIrZGF0ZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCtcIi9hdHRlbmQvXCIrZGF0ZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoXCIubW9kYWxcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgbGV0IGRhdGVJRCA9IGRhdGUuc2xpY2UoMCw0KSArIFwiLVwiK2RhdGUuc2xpY2UoNCw2KSArIFwiLVwiK2RhdGUuc2xpY2UoNiw4KVxyXG4gICAgICAgICAgICAkKCcuZmMtZGF5W2RhdGEtZGF0ZT1cIicrZGF0ZUlEKydcIl0nKS5odG1sKFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZigkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuICAgICAgICAgICAgLy/si5zsnpHsi5zqsITsnbQg7J6YIOyeheugpeuQmOyXiOuCmCDtmZXsnbhcclxuXHJcbiAgICAgICAgICAgIGlmKGRhdGU8bW9tZW50KCkuZm9ybWF0KFwiWVlZWU1NRERcIikpe1xyXG4gICAgICAgICAgICAgICAgLy/smKTripgg7J207KCEIOydvOydmCDrgqDsp5zrpbwg64uk66Oo6rOgIOyeiOydhCDqsr3smrAgLSDqt7zrrLQg7KKF66OM7Iuc6rCE7J20IOyeheugpeuQmOyngCDslYrsnLzrqbQg7JWIIOuQqFxyXG4gICAgICAgICAgICAgICAgaWYoJChcIiNmaXJzdF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgIGlmKCQoXCIjZmlyc3RfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLsmIjsg4Eg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZnJvbSA9ICQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKVxyXG4gICAgICAgICAgICBsZXQgdG8gPSAkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpXHJcblxyXG4gICAgICAgICAgICBsZXQgZnJvbUEgPSBmcm9tLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSlcclxuXHJcblxyXG4gICAgICAgICAgICB3b3JrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgIGRpZjogZGlmXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhbGVydChcIuq3vOustOyLnOqwhOydtCDsnpjrqrsg7J6F66Cl65CY7JeI7Iq164uI64ukLiBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0ZTxtb21lbnQoKS5mb3JtYXQoXCJZWVlZTU1ERFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/smKTripgg7J207KCEIOydvOydmCDrgqDsp5zrpbwg64uk66Oo6rOgIOyeiOydhCDqsr3smrAgLSDqt7zrrLQg7KKF66OM7Iuc6rCE7J20IOyeheugpeuQmOyngCDslYrsnLzrqbQg7JWIIOuQqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI3NlY29uZF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOyYiOyDgSDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb20gPSAkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpXHJcbiAgICAgICAgICAgICAgICBsZXQgdG8gPSAkKFwiI3NlY29uZF90b1wiKS52YWwoKVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmcm9tQSA9IGZyb20uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAodG9BWzBdKjEgLSBmcm9tQVswXSoxKSo2MCArICh0b0FbMV0qMSAtIGZyb21BWzFdKjEpXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgICAgICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLTsi5zqsITsnbQg7J6Y66q7IOyeheugpeuQmOyXiOyKteuLiOuLpC4gSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMudmlld0lEK1wiL2F0dGVuZC9cIitkYXRlKS5zZXQod29yayk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQrXCIvYXR0ZW5kL1wiK2RhdGUpLnNldCh3b3JrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIubW9kYWxcIikuaHRtbChcIlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXR0ZW5kO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2F0dGVuZC5qcyIsImltcG9ydCBTcG90IGZyb20gXCIuL2NpdHkvc3BvdC5qc1wiO1xyXG4vL+q0gOq0keyngCDsoJXrpqxcclxuaW1wb3J0IEhvdGVsIGZyb20gXCIuL2NpdHkvaG90ZWwuanNcIjtcclxuLy/tmLjthZTsoJXrs7Qg6rSA66CoXHJcbmltcG9ydCBBcmVhIGZyb20gXCIuL2NpdHkvYXJlYS5qc1wiO1xyXG4vL+yngOyXrSDrjbDsnbTthLAg7J6F66ClXHJcblxyXG5sZXQgQ2l0eSA9IHtcclxuICAgIGNvZGVEYXRhOiB7fSxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLm9uKFwiY2xpY2tcIiwgXCIuc3BvdHNcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGNpZCA9ICQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpO1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9ICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIubmFtZVwiKS5odG1sKCk7XHJcbiAgICAgICAgICAgIFNwb3QuaW5pdCgkKHRoaXMpLmF0dHIoJ3N0YXR1cycpLCBjaWQsIG5hbWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChcIi5jaXR5Q29kZVZpZXdcIikub24oXCJjbGlja1wiLCBcIi5ob3RlbHNcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGNpZCA9ICQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpO1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9ICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIubmFtZVwiKS5odG1sKCk7XHJcbiAgICAgICAgICAgIEhvdGVsLmluaXQoY2lkLCBuYW1lKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLm9uKFwiY2xpY2tcIiwgXCIuYXJlYVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgY2lkID0gJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5uYW1lXCIpLmh0bWwoKTtcclxuICAgICAgICAgICAgQXJlYS5pbml0KGNpZCwgbmFtZSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5jaXR5Q29kZVZpZXdcIikub24oXCJjbGlja1wiLCBcIi50cmFuc3BvcnRcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5tZXRyb0FkanVzdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSk7XHJcbiAgICAgICAgICAgIC8v64+E7Iuc67OE66GcIOuplO2KuOuhnCDsoJXrs7Trpbwg64uk65Os64qU642wIOyCrOyaqVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCIuaGVhZGVyX19yZXR1cm5cIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5yZXR1cm5Ub0NpdHlWaWV3KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgcmV0dXJuVG9DaXR5VmlldzogZnVuY3Rpb24oKXtcclxuICAgICAgICAkKFwiLmNpdHlfX3BhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5jaXR5Q29kZVZpZXdcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmNpdHkgLnNwb3QgLmNoZWNrXCIpLmh0bWwoXCJcIik7XHJcblxyXG4gICAgICAgIHRoaXMuaW5mbGF0ZV9jaXR5Q29kZVZpZXcodGhpcy5jb2RlRGF0YSlcclxuICAgIH0sXHJcblxyXG4gICAgbWV0cm9BZGp1c3Q6IGZ1bmN0aW9uKGNpZCl7XHJcbiAgICAgICAgaWYodGhpcy5jaXR5RGF0YVtjaWRdLm1ldHJvKXtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmNpdHlEYXRhW2NpZF0ubWV0cm9cclxuICAgICAgICAgICAgbGV0IG5hbWVBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRybyA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICBpZighbWV0cm8ubGluZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWV0cm8ubmFtZSlcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgLy8gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkK1wiL21ldHJvXCIpLnVwZGF0ZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBpbmZsYXRlX2NpdHlDb2RlVmlldzogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgbGV0IHR4dCA9ICc8ZGl2IGNsYXNzPVwibGluZSB0b3BcIj48cCBjbGFzcz1cIm5hbWVcIj7rj4Tsi5zrqoU8L3A+PHAgY2xhc3M9XCJob3RlbHNcIj7siJnshow8L3A+PHAgY2xhc3M9XCJzcG90c1wiPuq0gOq0keyngCDsoJXrpqw8L3A+PHAgY2xhc3M9XCJhcmVhXCI+7KeA7JetPC9wPjxwIGNsYXNzPVwidHJhbnNwb3J0XCI+6rWQ7Ya1PC9wPjxwIGNsYXNzPVwicHJpY2VcIj7rrLzqsIA8L3A+PC9kaXY+J1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAodmFyIGNvZGUgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgY2l0eSA9IGRhdGFbY29kZV07XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSBjaXR5LnN0YXR1cztcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImxpbmVcIiBpZD1cIicgKyBjaXR5LmNvZGUgKyAnXCI+PHAgY2xhc3M9XCJuYW1lXCI+JyArIGNpdHkubmFtZSArICc8L3A+J1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5ob3RlbCkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsc1wiPk88L3A+J1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsc1wiPlg8L3A+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXR1cylcclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5zcG90ID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3BvdHNcIiBzdGF0dXM9XCInK3N0YXR1cy5zcG90KydcIj7rjbDsnbTthLAg7ZmV67O0IOyZhOujjDwvcD4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnNwb3QgPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzcG90c1wiIHN0YXR1cz1cIicgKyBzdGF0dXMuc3BvdCArJ1wiPuuNsOydtO2EsCDshKDrs4QsIDLssKgg6rKA7Kad7KSRPC9wPidcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInNwb3RzXCIgc3RhdHVzPVwiJyArIHN0YXR1cy5zcG90ICsnXCI+642w7J207YSwIO2Vqey5mOq4sCDsnpHsl4XspJE8L3A+J1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5zcG90ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3BvdHNcIiBzdGF0dXM9XCInICsgc3RhdHVzLnNwb3QgKydcIj7rjbDsnbTthLAg7IiY7KeRLCAx7LCoIOqygOymneykkTwvcD4nXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3BvdHNcIiBzdGF0dXM9XCInICsgc3RhdHVzLnNwb3QgKydcIj7rjbDsnbTthLAg7JeG7J2MPC9wPidcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiYXJlYVwiPk88L3A+J1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImFyZWFcIj5YPC9wPidcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy50cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJ0cmFuc3BvcnRcIj5PPC9wPidcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJ0cmFuc3BvcnRcIj5YPC9wPidcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5wcmljZXMpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJwcmljZVwiPk88L3A+J1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInByaWNlXCI+WDwvcD4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5odG1sKHR4dClcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignc2V0dGluZy9jaXRpZXMnKS5vbihcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICQoXCIubG9hZGluZ1ZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpXHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZV9jaXR5Q29kZVZpZXcoZGF0YSlcclxuICAgICAgICAgICAgdGhpcy5jb2RlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaXR5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkuanMiLCJpbXBvcnQgTWFudWFsQ29tYmluZSBmcm9tIFwiLi9tYW51YWxDb21iaW5lLmpzXCI7XHJcbmltcG9ydCBWZXJpZnkgZnJvbSBcIi4vc3BvdC92ZXJpZnlpbmcuanNcIjtcclxuaW1wb3J0IHsgdG90YWxtZW0gfSBmcm9tIFwib3NcIjtcclxuXHJcbi8vU3BvdOydmCDri6jqs4TripQg7LSdIDTri6jqs4QgLSDrjbDsnbTthLAg7IiY7KeRLzHssKjqsoDspp0gLT4g642w7J207YSwIO2Vqey5mOq4sCAtPiDrjbDsnbTthLAg7ISg67OELzLssKjqsoDspp0gLT4g7JmE66OMXHJcblxyXG5sZXQgU3BvdCA9IHtcclxuXHJcbiAgICBkYXRhOnt9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19jb25maXJtXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuaW5wdXRDb29yZGluYXRlKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19zcG90Q29vclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19zcG90RGVsZXRlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsZXRlU3BvdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fc3BvdE5hbWVcIikuaHRtbCgpKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLnNwb3QgLmNoZWNrXCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LnNldFJlbWFpbk51bWJlcigkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fcmVtYWluTnVtYmVyXCIpLnZhbCgpKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLnNwb3QgLmNoZWNrXCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX25vZGF0YVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgc2lkID0gJCh0aGlzKS5hdHRyKCdzaWQnKTtcclxuICAgICAgICAgICAgdGhhdC5zaXRlTm9kYXRhKHNpZCk7XHJcbiAgICAgICAgICAgIHRvYXN0KCfrjbDsnbTthLAg6rO167CxIOyymOumrCcpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKHN0YXR1cywgY2lkLCBuYW1lKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgY2lkKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICQoXCIubG9hZGluZ1ZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzdGF0dXMgPT0gNCl7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoc3RhdHVzID09IDMpe1xyXG4gICAgICAgICAgICAgICAgVmVyaWZ5LmluaXQoZGF0YS5zcG90cy5jb21iaW5lZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09IDIpIHtcclxuICAgICAgICAgICAgICAgIE1hbnVhbENvbWJpbmUuaW5pdChkYXRhLnNwb3RzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoZWNrKGRhdGEuc3BvdHMpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcblxyXG4gICAgICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmNpdHkgLnNwb3RcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgJChcIi5jaXR5TmFtZVwiKS5odG1sKG5hbWUpLmF0dHIoXCJpZFwiLCBjaWQpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBhdXRvQ29tYmluZV9fc3BvdFJlc3RydWN0dXJlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlQXJyID0gW1wiZ2dcIixcImxwXCIsXCJudlwiLFwidGFcIl07XHJcbiAgICAgICAgbGV0IGNvbWJpbmluZyA9IHt9O1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YS5zcG90cztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXRlQXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBzaXRlID0gc2l0ZUFycltqXTtcclxuICAgICAgICAgICAgaWYoZGF0YVtzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW3NpdGVdLm5vRGF0YSl7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtzaXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhW3NpdGVdW2ldJiYhZGF0YVtzaXRlXVtpXS5kZWxldGVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGRTcG90ID0gZGF0YVtzaXRlXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6riw7KG0IOygleuztOulvCBvbGRTcG907J2065286rOgIO2VmOyekC4g7IOI66Gc7Jq0IOyKpO2Mn+ygleuztOyXkOuKlCDsnbTrpoTsnYQg7ZWcL+yYgeycvOuhnCDrtoTtlaDtlZjqs6Ag656t7YK57J2EIOu2gOyXrO2VoCDqsoPsnbTri6QuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtvOlwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuOlwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IG9sZFNwb3QuY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5rOntcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoL1vqsIAt7Z6jXS8udGVzdChvbGRTcG90Lm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC5uYW1lLmtvID0gb2xkU3BvdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm5hbWUuZW4gPSBvbGRTcG90Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90LnJhbmtbc2l0ZV0gPSBpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9sZFNwb3QudXJsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90LnVybCA9IG9sZFNwb3QudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYob2xkU3BvdC50YWcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudGFnID0gb2xkU3BvdC50YWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY291bnRlcjwxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczAwXCIrY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY291bnRlcjwxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmluZ1tcInMwXCIrY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wic1wiK2NvdW50ZXJdID0gc3BvdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXIrK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSAvL+2VnOuwlO2AtCDrj4zslZjri7lcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYXV0b0NvbWJpbmVfX2NvbWJpbmUoY29tYmluaW5nKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXV0b0NvbWJpbmVfX2NvbWJpbmU6IGZ1bmN0aW9uKGNvbWJpbmluZyl7XHJcbiAgICAgICAgLy8gVE9ETzog64Gd64KY66m0IO2Vqey5mOq4sCDsnpHsl4Ug7ZmU66m0IGluZmxhdGXtlZjquLBcclxuXHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcblxyXG4gICAgICAgIGxldCBjb21iaW5lT2JqID0ge31cclxuICAgICAgICBsZXQgY29tYmluZWQgPSB7fVxyXG5cclxuICAgICAgICBmb3IgKHZhciBjb2RlIGluIGNvbWJpbmluZykge1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IGNvbWJpbmluZ1tjb2RlXTtcclxuICAgICAgICAgICAgY29tYmluZU9ialtjb2RlXSA9IHNwb3RcclxuICAgICAgICAgICAgY29tYmluZU9ialtjb2RlXS5jb21iaW5lID0ge307XHJcbiAgICAgICAgICAgIGxldCBoYXNDb21iaW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL+2Vqey5oCDqsoPsnbQg7JeG7Jy866m0IOuwlOuhnCBjb21iaW5lZCDsqr3snLzroZwg67O064K464ukLlxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgdENvZGUgaW4gY29tYmluaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZihjb2RlPHRDb2RlKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdFNwb3QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29tYmluaW5nW3RDb2RlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0U3BvdFtrZXldID0gY29tYmluaW5nW3RDb2RlXVtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCF0U3BvdC5kZWxldGVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGNhbGN1bGF0ZURpZihzcG90LmNvb3IsIHRTcG90LmNvb3IpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkaWY8MjUwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0uY29tYmluZVt0Q29kZV0gPSB0U3BvdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NvbWJpbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIWhhc0NvbWJpbmVkKXtcclxuICAgICAgICAgICAgICAgIGNvbWJpbmVkW2NvZGVdID0gY29tYmluZU9ialtjb2RlXTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb21iaW5lT2JqW2NvZGVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2l0eStcIi9zcG90c1wiKS5zZXQoe1xyXG4gICAgICAgICAgICBjb21iaW5pbmc6Y29tYmluZU9iaixcclxuICAgICAgICAgICAgY29tYmluZWQ6Y29tYmluZWRcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBNYW51YWxDb21iaW5lLmluaXQoe1xyXG4gICAgICAgICAgICBjb21iaW5pbmc6Y29tYmluZU9iaixcclxuICAgICAgICAgICAgY29tYmluZWQ6Y29tYmluZWRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZVNwb3Q6IGZ1bmN0aW9uKHNpZCwgbmFtZSl7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGUgPSBzaWQuc3BsaXQoXCJfXCIpWzBdO1xyXG4gICAgICAgIGxldCBubyA9IHNpZC5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgICAgIGlmKGNvbmZpcm0obmFtZSArIFwiIOyepeyGjOulvCDsoJzqsbDtlanri4jri6QuIOqzhOyGje2VoOq5jOyalD9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIisgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSArIFwiL1wiICsgbm8gKS5zZXQoe2RlbGV0ZWQ6IHRydWV9KTtcclxuICAgICAgICAgICAgJChcIiNcIitzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB0b2FzdChcIuyepeyGjOqwgCDsoJzqsbDrkJjsl4jsirXri4jri6QuXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dENvb3JkaW5hdGU6IGZ1bmN0aW9uKHNpZCwgY29vclR4dCl7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGUgPSBzaWQuc3BsaXQoXCJfXCIpWzBdO1xyXG4gICAgICAgIGxldCBubyA9IHNpZC5zcGxpdChcIl9cIilbMV07XHJcbiAgICAgICAgbGV0IGNvb3IgPSB7fTtcclxuXHJcbiAgICAgICAgaWYoY29vclR4dC5zcGxpdChcIixcIikubGVuZ3RoID09PSAyKXtcclxuICAgICAgICAgICAgbGV0IGxhdCA9IGNvb3JUeHQuc3BsaXQoXCIsXCIpWzBdLnRyaW0oKSoxO1xyXG4gICAgICAgICAgICBsZXQgbG5nID0gY29vclR4dC5zcGxpdChcIixcIilbMV0udHJpbSgpKjE7XHJcblxyXG4gICAgICAgICAgICBpZihpc05hTihsYXQpfHxpc05hTihsbmcpKXtcclxuICAgICAgICAgICAgICAgIC8v7KKM7ZGcIOykkSDtlZjrgpjqsIBcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOu2gOygle2Zle2VmOqyjCDsnoXroKXrkJjsl4jsirXri4jri6RcIilcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb29yID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogbGF0LFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzogbG5nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyijO2RnOqwgCDsnoXroKXrkJjsl4jsirXri4jri6RcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiK3NpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIisgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSArIFwiL1wiICsgbm8gKyBcIi9jb29yXCIpLnNldChjb29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0b2FzdChcIuyijO2RnOqwgCDrtoDsoJXtmZXtlZjqsowg7J6F66Cl65CY7JeI7Iq164uI64ukXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcG90O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvc3BvdC5qcyIsImxldCBNYW51YWxDb21iaW5lID0ge1xyXG4gICAgbWFwOiB7fSxcclxuICAgIG1hcmtlcjoge1xyXG4gICAgICAgIHByaW1lOnt9LFxyXG4gICAgICAgIHRhcmdldDpbXVxyXG4gICAgfSxcclxuICAgIGRhdGE6e30sXHJcbiAgICByZW1haW46MCxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuY29tYmluZV9fdGFyZ2V0XCIpLm9uKFwiY2xpY2tcIiwgXCIuY29tYmluZV9fdGFyZ2V0X19kaXZcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcIi5jb21iaW5lX190YXJnZXRfX2NoZWNrXCIpLnRvZ2dsZUNsYXNzKFwiY29tYmluZV9fdGFyZ2V0X19jaGVja2VkXCIpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCIuY29tYmluZV9fbWFpblwiKS5vbihcImNsaWNrXCIsXCIuY29tYmluZV9fbmV4dFN0ZXBcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5uZXh0U3RlcCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIG5leHRTdGVwOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIik7XHJcblxyXG4gICAgICAgIGxldCBtYWluRGF0YSA9IHRoaXMuZGF0YS5jb21iaW5pbmdbJChcIi5jb21iaW5lX19tYWluXCIpLmF0dHIoXCJpZFwiKV07XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5jb21iaW5lX190YXJnZXRfX2NoZWNrZWRcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRpZCA9ICQoXCIuY29tYmluZV9fdGFyZ2V0X19jaGVja2VkXCIpLmVxKGkpLmF0dHIoXCJzaWRcIilcclxuICAgICAgICAgICAgbGV0IHRhcmdldERhdGEgPSBtYWluRGF0YS5jb21iaW5lW3RpZF07XHJcblxyXG4gICAgICAgICAgICAvL+2VqeyzkOyniCDrjIDsg4HsnZggcmFua+ulvCBtYWluZERhdGHsnZggcmFua+uhnCDthrXtlantlZjripQg7J6R7JeFXHJcbiAgICAgICAgICAgIGZvciAodmFyIHNpdGUgaW4gdGFyZ2V0RGF0YS5yYW5rKSB7XHJcbiAgICAgICAgICAgICAgICBpZihtYWluRGF0YS5yYW5rW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihtYWluRGF0YS5yYW5rW3NpdGVdID4gdGFyZ2V0RGF0YS5yYW5rW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEucmFua1tzaXRlXSA9IHRhcmdldERhdGEucmFua1tzaXRlXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS5yYW5rW3NpdGVdID0gdGFyZ2V0RGF0YS5yYW5rW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+2VqeyzkOyniCDrjIDsg4HsnZgg7YOc6re466W8IG1haW5EYXRh7J2YIHRhZ+uhnCDthrXtlantlZjripQg7J6R7JeFXHJcbiAgICAgICAgICAgIGlmKHRhcmdldERhdGEudGFnKXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGFyZ2V0RGF0YS50YWcubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihtYWluRGF0YS50YWcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighbWFpbkRhdGEudGFnLmluY2x1ZGVzKHRhcmdldERhdGEudGFnW2pdKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS50YWcucHVzaCh0YXJnZXREYXRhLnRhZ1tqXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS50YWcgPSB0YXJnZXREYXRhLnRhZ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7JeQ6rKMIHVybOydtCDsnoXroKXrkJjslrQg7J6I64uk66m0IG1haW5EYXRh7JeQIO2Gte2Vqe2VmOuKlCDsnpHsl4VcclxuICAgICAgICAgICAgaWYoIW1haW5EYXRhLnVybCl7XHJcbiAgICAgICAgICAgICAgICBpZih0YXJnZXREYXRhLnVybCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudXJsID0gdGFyZ2V0RGF0YS51cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEuY29tYmluaW5nW3RpZF07XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5jb21iaW5lZFt0aWRdKXtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEuY29tYmluZWRbdGlkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBtYWluRGF0YS5uYW1lLmtvID0gJChcIiNuYW1lX2tvXCIpLnZhbCgpO1xyXG4gICAgICAgIG1haW5EYXRhLm5hbWUuZW4gPSAkKFwiI25hbWVfZW5cIikudmFsKCk7XHJcblxyXG4gICAgICAgIGRlbGV0ZSBtYWluRGF0YS5jb21iaW5lO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEuY29tYmluZWRbJChcIi5jb21iaW5lX19tYWluXCIpLmF0dHIoXCJpZFwiKV0gPSB0aGlzLmRhdGEuY29tYmluaW5nWyQoXCIuY29tYmluZV9fbWFpblwiKS5hdHRyKFwiaWRcIildO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEuY29tYmluaW5nWyQoXCIuY29tYmluZV9fbWFpblwiKS5hdHRyKFwiaWRcIildO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaXR5K1wiL3Nwb3RzXCIpLnVwZGF0ZSh0aGlzLmRhdGEpO1xyXG5cclxuXHJcbiAgICAgICAgaWYoT2JqZWN0LmtleXModGhpcy5kYXRhLmNvbWJpbmluZykubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGUoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2l0eStcIi9zdGF0dXMvc3BvdHNcIikuc2V0KFwidmVyaWZ5aW5nXCIpXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpdHkrXCIvc3BvdHMvY29tYmluaW5nXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB0b2FzdChcIu2Vqey5mOq4sCDsnpHsl4XsnbQg7JmE66OM65CY7JeI7Iq164uI64ukISAy7LSIIO2bhCDtjpjsnbTsp4Drpbwg7IOI66Gc6rOg7Lmo7ZWp64uI64ukLlwiKVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5zcG90X19wYWdlXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5zcG90X19wYWdlLmNvbWJpbmVcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmhlYWRlcl9fc3RhdHVzXCIpLmh0bWwoXCLqtIDqtJHsp4Ag7ZWp7LmY6riwXCIpO1xyXG5cclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogeyBsYXQ6IDQwLjc0ODQ0LCBsbmc6IC03My45ODU2NiB9LFxyXG4gICAgICAgICAgICB6b29tOiAxNyxcclxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICBzY2FsZUNvbnRyb2w6IHRydWUsXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5Db250cm9sOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLm1hcC5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgdGhhdC5jaG9vc2VDb29yZGluYXRlKGUpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hvb3NlQ29vcmRpbmF0ZTogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgJChcIi5jb21iaW5lX19jb29yZGluYXRlXCIpLmh0bWwoZS5sYXRMbmcubGF0KCkrXCIsXCIrZS5sYXRMbmcubG5nKCkpO1xyXG5cclxuICAgICAgICB0aGlzLm1hcmtlci5wcmltZS5zZXRNYXAobnVsbClcclxuICAgICAgICB0aGlzLm1hcmtlci5wcmltZSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogZS5sYXRMbmcsXHJcbiAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhLmNvbWJpbmluZztcclxuICAgICAgICBsZXQgdHh0ID0gJydcclxuICAgICAgICAvL+q4sOyhtOyXkCDssI3tmIDsnojrjZgg66eI7Luk66W8IOygnOqxsO2VnOuLpFxyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpO1xyXG4gICAgICAgIHRoaXMucmVtYWluID0ga2V5cy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHNwb3QgPSBkYXRhW2tleXNbMF1dO1xyXG4gICAgICAgICQoXCIuY29tYmluZV9fbWFpblwiKS5hdHRyKFwiaWRcIiwga2V5c1swXSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHNwb3QpXHJcbiAgICAgICAgLy/snbTrpoQg6rSA66CoIOygleuztCDtkZzsi5xcclxuICAgICAgICBpZihzcG90Lm5hbWUua28ubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImNvbWJpbmVfX25hbWVfX3ByaW1lXCI+6riw7KSAIOyepeyGjOuqhTogJysgc3BvdC5uYW1lLmtvICsnPC9wPic7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiY29tYmluZV9fbmFtZV9fcHJpbWVcIj7quLDspIAg7J6l7IaM66qFOiAnKyBzcG90Lm5hbWUuZW4gKyc8L3A+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImNvbWJpbmVfX3ByaW1lXCI+J1xyXG4gICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJjb21iaW5lX19wcmltZV9fbGVmdFwiPidcclxuICAgICAgICB0eHQrPSAgICAgICc8ZGl2IGNsYXNzPVwiY29tYmluZV9fbGluZVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICc8cCBjbGFzcz1cImNvbWJpbmVfX3N1YlRpdGxlXCI+7ZWc6riA66qFPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAnPGlucHV0IGNsYXNzPVwiY29tYmluZV9faW5wdXRcIiBpZD1cIm5hbWVfa29cIiB2YWx1ZT1cIicrc3BvdC5uYW1lLmtvKydcIj4nXHJcbiAgICAgICAgdHh0Kz0gICAgICAnPC9kaXY+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxkaXYgY2xhc3M9XCJjb21iaW5lX19saW5lXCI+JztcclxuICAgICAgICB0eHQrPSAgICAgICAgICc8cCBjbGFzcz1cImNvbWJpbmVfX3N1YlRpdGxlXCI+7JiB66y466qFPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAnPGlucHV0IGNsYXNzPVwiY29tYmluZV9faW5wdXRcIiBpZD1cIm5hbWVfZW5cIiB2YWx1ZT1cIicrc3BvdC5uYW1lLmVuKydcIj4nXHJcbiAgICAgICAgdHh0Kz0gICAgICc8L2Rpdj4nXHJcbiAgICAgICAgdHh0Kz0gICAnPC9kaXY+J1xyXG4gICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiY29tYmluZV9fbmV4dFN0ZXBcIj7ri6TsnYw8L3A+J1xyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcblxyXG4gICAgICAgIC8v7KKM7ZGcIOq0gOugqCDsoJXrs7Qg7ZGc7IucXHJcbiAgICAgICAgc3BvdC5jb29yLmxhdCA9IHNwb3QuY29vci5sYXQqMTtcclxuICAgICAgICBzcG90LmNvb3IubG5nID0gc3BvdC5jb29yLmxuZyoxO1xyXG4gICAgICAgIHRoaXMubWFya2VyLnByaW1lID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBzcG90LmNvb3IsXHJcbiAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm1hcC5wYW5UbyhzcG90LmNvb3IpO1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJjb21iaW5lX19saW5lXCI+JztcclxuICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNvbWJpbmVfX3N1YlRpdGxlXCI+7KKM7ZGcJztcclxuICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNvbWJpbmVfX2Nvb3JkaW5hdGVcIj4nKyBzcG90LmNvb3IubGF0ICtcIixcIitzcG90LmNvb3IubG5nICsnPC9wPic7XHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5jb21iaW5lX19tYWluXCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgdHh0PScnO1xyXG4gICAgICAgIGxldCBpZHggPSAwO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBzaWQgaW4gc3BvdC5jb21iaW5lKSB7XHJcbiAgICAgICAgICAgIGlkeCsrO1xyXG4gICAgICAgICAgICBsZXQgdFNwb3QgPSBzcG90LmNvbWJpbmVbc2lkXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBsYXRsbmcgPSB7XHJcbiAgICAgICAgICAgICAgICBsYXQ6IHRTcG90LmNvb3IubGF0KjEsXHJcbiAgICAgICAgICAgICAgICBsbmc6IHRTcG90LmNvb3IubG5nKjFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdE1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246bGF0bG5nLFxyXG4gICAgICAgICAgICAgICAgbWFwOiB0aGlzLm1hcCxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBpZHgudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXIudGFyZ2V0LnB1c2godE1hcmtlcik7XHJcblxyXG4gICAgICAgICAgICAvL+uzuOuqheycvOuhnCDtlZzquIDrqoUg7JiB7Ja066qF7J20IOyXhuydhCDqsr3smrDrpbwg7LK07YGs7ZW07IScIOuEo+yWtOykgOuLpC5cclxuICAgICAgICAgICAgaWYoJChcIiNuYW1lX2tvXCIpLnZhbCgpLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAkKFwiI25hbWVfa29cIikudmFsKHRTcG90Lm5hbWUua28pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoJChcIiNuYW1lX2VuXCIpLnZhbCgpLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAkKFwiI25hbWVfZW5cIikudmFsKHRTcG90Lm5hbWUuZW4pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJjb21iaW5lX190YXJnZXRfX2RpdlwiPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJjb21iaW5lX190YXJnZXRfX251bWJlclwiPicraWR4Kyc8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwiY29tYmluZV9fdGFyZ2V0X19jaGVja1wiIHNpZD1cIicrc2lkKydcIj48L2Rpdj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiY29tYmluZV9fdGFyZ2V0X19uYW1lXCI+Jyt0U3BvdC5uYW1lLmtvK1wiIFwiK3RTcG90Lm5hbWUuZW4rJzwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIuY29tYmluZV9fdGFyZ2V0XCIpLmh0bWwodHh0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFudWFsQ29tYmluZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5L21hbnVhbENvbWJpbmUuanMiLCJ2YXIgVmVyaWZ5ID0ge1xyXG4gICAgZGF0YTp7fSxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIudmVyaWZ5aW5nX19ib3hcIikub24oXCJjbGlja1wiLCBcIi5yZXN1bHRfcmFua1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LmNoZWNrKCQodGhpcykpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiI3ZlcmlmeWluZ19fY29udHJvbF9fbWVyZ2VcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5tZXJnZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChcIiN2ZXJpZnlpbmdfX2NvbnRyb2xfX3JlbW92ZVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LnJlbW92ZUFsbCgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVBbGw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoY29uZmlybShcIuygnOqxsO2VoOq5jOyalD9cIikpe1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIucmVzdWx0X3Jhbmsuc2VsZWN0ZWRcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aWQgPSAkKFwiLnJlc3VsdF9yYW5rLnNlbGVjdGVkXCIpLmVxKGkpLnBhcmVudCgpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGFbdGlkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKFwiLnZlcmlmeWluZ19fY29udHJvbFwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiskKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJpZFwiKStcIi9zcG90cy9jb21iaW5lZFwiKS5zZXQodGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5yYW5rKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoJChcIi5yZXN1bHRfcmFuay5zZWxlY3RlZFwiKS5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgIGxldCBzaWQgPSAkKFwiLnJlc3VsdF9yYW5rLnNlbGVjdGVkXCIpLmVxKDApLnBhcmVudCgpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICAgICAgbGV0IG1haW5EYXRhID0gdGhpcy5kYXRhW3NpZF07XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8ICQoXCIucmVzdWx0X3Jhbmsuc2VsZWN0ZWRcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aWQgPSAkKFwiLnJlc3VsdF9yYW5rLnNlbGVjdGVkXCIpLmVxKGkpLnBhcmVudCgpLmF0dHIoXCJpZFwiKVxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldERhdGEgPSB0aGlzLmRhdGFbdGlkXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL+2VqeyzkOyniCDrjIDsg4HsnZggcmFua+ulvCBtYWluZERhdGHsnZggcmFua+uhnCDthrXtlantlZjripQg7J6R7JeFXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzaXRlIGluIHRhcmdldERhdGEucmFuaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1haW5EYXRhLnJhbmtbc2l0ZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihtYWluRGF0YS5yYW5rW3NpdGVdID4gdGFyZ2V0RGF0YS5yYW5rW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5EYXRhLnJhbmtbc2l0ZV0gPSB0YXJnZXREYXRhLnJhbmtbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEucmFua1tzaXRlXSA9IHRhcmdldERhdGEucmFua1tzaXRlXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7J2YIO2DnOq3uOulvCBtYWluRGF0YeydmCB0YWfroZwg7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0RGF0YS50YWcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGFyZ2V0RGF0YS50YWcubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobWFpbkRhdGEudGFnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFtYWluRGF0YS50YWcuaW5jbHVkZXModGFyZ2V0RGF0YS50YWdbal0pKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS50YWcucHVzaCh0YXJnZXREYXRhLnRhZ1tqXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS50YWcgPSB0YXJnZXREYXRhLnRhZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8v7ZWp7LOQ7KeIIOuMgOyDgeyXkOqyjCB1cmzsnbQg7J6F66Cl65CY7Ja0IOyeiOuLpOuptCBtYWluRGF0YeyXkCDthrXtlantlZjripQg7J6R7JeFXHJcbiAgICAgICAgICAgICAgICBpZighbWFpbkRhdGEudXJsKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0YXJnZXREYXRhLnVybCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5EYXRhLnVybCA9IHRhcmdldERhdGEudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhW3RpZF07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY29uZmlybShcIuuzke2Vqe2VoOq5jOyalD9cIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIudmVyaWZ5aW5nX19jb250cm9sXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIikrXCIvc3BvdHMvY29tYmluZWRcIikuc2V0KHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yYW5rKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9hc3QoXCLshKDtg53rkJwg6rSA6rSR7KeA6rCAIO2VmOuCmOyeheuLiOuLpFwiKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2s6IGZ1bmN0aW9uKGRpdil7XHJcbiAgICAgICAgZGl2LnRvZ2dsZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgbGV0IHNpZCA9IGRpdi5wYXJlbnQoKS5hdHRyKFwiaWRcIik7XHJcblxyXG4gICAgICAgIGlmKCQoXCIucmVzdWx0X3Jhbmsuc2VsZWN0ZWRcIikubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAkKFwiLnZlcmlmeWluZ19fY29udHJvbFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKFwiLnZlcmlmeWluZ19fY29udHJvbFwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmFuazogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBtYXhTY29yZTogMjAwLCAgLy8x7JyE64qUIDIwMOygkCB+IDE4MOychOuKlCAyMOygkFxyXG4gICAgICAgICAgICBvbmVNaW51czotNjAwLCAgLy8x6rCcIOyCrOydtO2KuOyXkOunjCDshozqsJzrkJwg6rSA6rSR7KeA7J28IOqyveyasCDssKjqsJDrkJjripQg7KCQ7IiYXHJcbiAgICAgICAgICAgIHR3b011bnVzOi0zMDAsIC8vMuqwnCDsgqzsnbTtirjsl5Drp4wg7IaM6rCc65CcIOq0gOq0keyngOydvCDqsr3smrAg7LCo6rCQ65CY64qUIOygkOyImFxyXG4gICAgICAgICAgICBudkFkZDoxMDAgIC8v64Sk7J2067KE7JeQ66eMIOyGjOqwnOuQnCDqtIDqtJHsp4Dsnbwg6rK97JqwIOu2gOyXrOuQmOuKlCDstpTqsIDsoJBcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJhbmtBcnJheSA9IFtdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSlcclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2lkIGluIHRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IHRoaXMuZGF0YVtzaWRdO1xyXG4gICAgICAgICAgICBzcG90LnNpZCA9IHNpZDtcclxuICAgICAgICAgICAgbGV0IG51bVNpdGUgPSBPYmplY3Qua2V5cyhzcG90LnJhbmspLmxlbmd0aDsgLy/rk7HsnqzrkJwg7IKs7J207Yq4IOqwr+yImFxyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwXHJcbiAgICAgICAgICAgIGxldCBhdmcgPSAwXHJcbiAgICAgICAgICAgIGxldCBiZXN0UmFuayA9IE9iamVjdC5rZXlzKHRoaXMuZGF0YSkubGVuZ3RoICsgNTAgLy/qsIDsnqUg64aS7J2AKOyIq+yekOuhnOyEnCDrgq7snYApIOuere2CueydtCDrtoDsl6zrkJwg7IKs7J207Yq4IOuere2CuVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiBzcG90LnJhbmspIHtcclxuICAgICAgICAgICAgICAgIGlmKGJlc3RSYW5rPnNwb3QucmFua1tzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdFJhbmsgPSBzcG90LnJhbmtbc2l0ZV0gLy9iZXN0UmFua+ulvCDqsLHsi6DtlZzri6RcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHNwb3QucmFua1tzaXRlXTxPYmplY3Qua2V5cyh0aGlzLmRhdGEpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/smIggLSDqtIDqtJHsp4DqsIAgMTAw7JyE7J24642wIOuhoOumrO2UjOuemOuLm+yXkOyEnCAxMDPsnIQg7IaM6rCcIC0+IOyXhuuKlCDqsoMg7Leo6riJXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUrPSAoY29uZmlnLm1heFNjb3JlIC0gc3BvdC5yYW5rW3NpdGVdKTtcclxuICAgICAgICAgICAgICAgICAgICBhdmcrPSAoY29uZmlnLm1heFNjb3JlIC0gc3BvdC5yYW5rW3NpdGVdKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG51bVNpdGU+MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bVNpdGUtLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2NvcmUtPSBiZXN0UmFuayo1O1xyXG4gICAgICAgICAgICBhdmcgPSBhdmcgLyBudW1TaXRlO1xyXG5cclxuICAgICAgICAgICAgc2NvcmUrPSBhdmcqMjU7XHJcblxyXG4gICAgICAgICAgICBpZihudW1TaXRlID09PSAxKXtcclxuICAgICAgICAgICAgICAgIHNjb3JlICs9IGNvbmZpZy5vbmVNaW51cztcclxuICAgICAgICAgICAgICAgIGlmKHNwb3QucmFuay5udil7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUrPSBjb25maWcubnZBZGQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobnVtU2l0ZSA9PT0gMil7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSBjb25maWcudHdvTXVudXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJhbmtBcnJheS5wdXNoKHtzaWQ6c2lkLHNjb3JlOnNjb3JlfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhbmtBcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5zY29yZSA+IGIuc2NvcmUgPyAtMSA6IGEuc2NvcmUgPCBiLnNjb3JlID8gMSA6IDA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgdHh0ID0gJydcclxuXHJcbiAgICAgICAgdmFyIHNwb3RBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmtBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YVxyXG5cclxuICAgICAgICAgICAgc3BvdEFycmF5LnB1c2godGhpcy5kYXRhW3JhbmtBcnJheVtpXS5zaWRdKVxyXG5cclxuICAgICAgICAgICAgbGV0IHNpZCA9IHJhbmtBcnJheVtpXS5zaWQ7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBcIlwiXHJcbiAgICAgICAgICAgIGlmKGRhdGFbc2lkXS51cmwpe1xyXG4gICAgICAgICAgICAgICAgdXJsID0gZGF0YVtzaWRdLnVybFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByYW5raW5nID0ge1xyXG4gICAgICAgICAgICAgICAgZ2c6XCJcIixcclxuICAgICAgICAgICAgICAgIG52OlwiXCIsXHJcbiAgICAgICAgICAgICAgICBscDpcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGE6XCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIHNpdGUgaW4gZGF0YVtzaWRdLnJhbmspIHtcclxuICAgICAgICAgICAgICAgIHJhbmtpbmdbc2l0ZV0gPSBkYXRhW3NpZF0ucmFua1tzaXRlXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhW3NpZF0ubmFtZS5rby5pbmNsdWRlcygnPGRpdiBjbGFzcycpIHx8IGRhdGFbc2lkXS5uYW1lLmtvLmluY2x1ZGVzKCc8ZGl2IGNsYXNzJykpe1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGRhdGFbc2lkXVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cInJlc3VsdF9ib3hcIiBpZD1cIicgKyBzaWQgKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInJlc3VsdF9yYW5rXCI+JyArIChpICsgMSkgKyAnPC9wPic7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxpbnB1dCBjbGFzcz1cInJlc3VsdF9uYW1lXCIgdmFsdWU9XCInICsgZGF0YVtzaWRdLm5hbWUua28gKyBcIi0tXCIgKyBkYXRhW3NpZF0ubmFtZS5lbiArICdcIj4nXHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxpbnB1dCBjbGFzcz1cInJlc3VsdF91cmxcIiB2YWx1ZT1cIicgKyB1cmwgKyAnXCI+JztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJyZXN1bHRfZ2dcIj4nICsgcmFua2luZy5nZyArICc8L3A+JztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJyZXN1bHRfbnZcIj4nICsgcmFua2luZy5udiArICc8L3A+JztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJyZXN1bHRfbHBcIj4nICsgcmFua2luZy5scCArICc8L3A+JztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJyZXN1bHRfdGFcIj4nICsgcmFua2luZy50YSArICc8L3A+JztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJyZXN1bHRfc2F2ZSBzYXZlX3Nwb3RcIj7soIDsnqU8L3A+JztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJyZXN1bHRfcmVtb3ZlIHJlbW92ZV9zcG90XCI+7IKt7KCcPC9wPidcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgJChcIi52ZXJpZnlpbmdfX2JveFwiKS5odG1sKHR4dClcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrJCgnLmNpdHlOYW1lJykuYXR0cignaWQnKStcIi9zcG90cy9yYW5rZWRcIikuc2V0KHNwb3RBcnJheSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc3BvdEFycmF5KVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgJChcIi5zcG90X19wYWdlXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5zcG90X19wYWdlLnZlcmlmeWluZ1wiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuaGVhZGVyX19zdGF0dXNcIikuaHRtbChcIuq0gOq0keyngCAy7LCoIOqygOymnVwiKTtcclxuXHJcbiAgICAgICAgaWYoIWRhdGEucmFua2VkKXtcclxuICAgICAgICAgICAgdGhpcy5yYW5rKCk7Ly/rnq3tgrkg642w7J207YSw6rCAIOyXhuycvOuptCDrp4zrk6Dri6RcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b2xvP1wiKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnJhbmtlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmVyaWZ5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvc3BvdC92ZXJpZnlpbmcuanMiLCJleHBvcnRzLmVuZGlhbm5lc3MgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnTEUnIH07XG5cbmV4cG9ydHMuaG9zdG5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhvc3RuYW1lXG4gICAgfVxuICAgIGVsc2UgcmV0dXJuICcnO1xufTtcblxuZXhwb3J0cy5sb2FkYXZnID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW10gfTtcblxuZXhwb3J0cy51cHRpbWUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAwIH07XG5cbmV4cG9ydHMuZnJlZW1lbSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcbn07XG5cbmV4cG9ydHMudG90YWxtZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE51bWJlci5NQVhfVkFMVUU7XG59O1xuXG5leHBvcnRzLmNwdXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXSB9O1xuXG5leHBvcnRzLnR5cGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnQnJvd3NlcicgfTtcblxuZXhwb3J0cy5yZWxlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmFwcFZlcnNpb247XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG5cbmV4cG9ydHMubmV0d29ya0ludGVyZmFjZXNcbj0gZXhwb3J0cy5nZXROZXR3b3JrSW50ZXJmYWNlc1xuPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7fSB9O1xuXG5leHBvcnRzLmFyY2ggPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnamF2YXNjcmlwdCcgfTtcblxuZXhwb3J0cy5wbGF0Zm9ybSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdicm93c2VyJyB9O1xuXG5leHBvcnRzLnRtcGRpciA9IGV4cG9ydHMudG1wRGlyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnL3RtcCc7XG59O1xuXG5leHBvcnRzLkVPTCA9ICdcXG4nO1xuXG5leHBvcnRzLmhvbWVkaXIgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiAnLydcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9vcy1icm93c2VyaWZ5L2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFRyYW5zcG9ydCBmcm9tIFwiLi9zY29yZS90cmFuc3BvcnQuanNcIjtcclxuaW1wb3J0IFNhZmV0eSBmcm9tIFwiLi9zY29yZS9zYWZldHkuanNcIjtcclxuXHJcbmxldCBIb3RlbCA9IHtcclxuICAgIGNpdHk6IFwiXCIsXHJcbiAgICBjaXR5TmFtZTogXCJcIixcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihjaWQsIG5hbWUpe1xyXG4gICAgICAgICQoXCIuY2l0eU5hbWVcIikuaHRtbChuYW1lKS5hdHRyKFwiaWRcIiwgY2lkKTtcclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuaG90ZWxcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2l0eSA9IGNpZDtcclxuICAgICAgICAgICAgdGhpcy5jaXR5TmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjb3JlKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHNjb3JlOiBmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgaWYoZGF0YS5zdGF0dXMpe1xyXG4gICAgICAgICAgICBpZighZGF0YS5zdGF0dXMuaG90ZWxzKXtcclxuICAgICAgICAgICAgICAgIC8vc3RhdXRz64qUIOyeiOuKlOuNsCDtmLjthZTsl5Ag64yA7ZWcIHN0YXR1cyDrjbDsnbTthLDqsIAg7JeG7Jy866m0IOunjOuTpOyWtCDrhKPripTri6QuXHJcbiAgICAgICAgICAgICAgICBkYXRhLnN0YXR1cy5ob3RlbHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzYWZldHk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhY2lsaXR5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGVtZTpmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vIHN0YXR1cyDrjbDsnbTthLAg7J6Q7LK06rCAIOyXhuycvOuptCDrp4zrk6TslrQg64Sj64qU64ukLlxyXG4gICAgICAgICAgICBkYXRhLnN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgIGhvdGVsczp7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzYWZldHk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhY2lsaXR5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGVtZTogZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHN0YXR1cyA9IGRhdGEuc3RhdHVzLmhvdGVscztcclxuXHJcbiAgICAgICAgLy/soJDsiJgg7LK06rOE6rCAIOyZhOyEseuQmOyWtOyeiOuKlOyngCDqsoDsgqztlZjqs6Ag7JeG7Jy866m0IOygkOyImOulvCDrtoDsl6ztlZzri6QuXHJcbiAgICAgICAgLy/qsIEg6rCd7LK0IOyViOyXkOyEnCDsoJDsiJjrpbwg6rOE7IKw7ZW0IOuNsOydtO2EsOuyoOydtOyKpOyXkCDsl4XroZzrk5ztlZjrqbAsIHJldHVybuqwkuycvOuhnOuKlCDqsJLsnYQg6rOE7IKw7ZWgIOyImCDsnojsl4jri6Qv7JeG7JeI64uk652864qUIOusuOq1rOqwgCDrsJjtmZjrkJzri6QuXHJcbiAgICAgICAgaWYoc3RhdHVzLnRyYW5zcG9ydCl7XHJcbiAgICAgICAgICAgICQoXCIjc3RhdHVzX3RyYW5zcG9ydFwiKS5odG1sKFwi7KCV67O06rCAIOydtOuvuCDsobTsnqztlanri4jri6QuXCIpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoXCIjc3RhdHVzX3RyYW5zcG9ydFwiKS5odG1sKFRyYW5zcG9ydC5pbml0KGRhdGEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHN0YXR1cy5zYWZldHkpe1xyXG4gICAgICAgICAgICAkKFwiI3N0YXR1c19zYWZldHlcIikuaHRtbChcIuygleuztOqwgCDsnbTrr7gg7KG07J6s7ZWp64uI64ukLlwiKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKFwiI3N0YXR1c19zYWZldHlcIikuaHRtbChTYWZldHkuaW5pdChkYXRhKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZihzdGF0dXMuZmFjaWxpdHkpe1xyXG4gICAgICAgIC8vICAgICAkKFwiI3N0YXR1c19mYWNpbGl0eVwiKS5odG1sKFwi7KCV67O06rCAIOyhtOyerO2VqeuLiOuLpC5cIilcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zY29yZV9mYWNpbGl0eSgpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gaWYoc3RhdHVzLnRoZW1lKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zY29yZV90aGVtZSgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmVfZmFjaWxpdHk6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICB2YXIgc2NvcmVBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsID0gZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgdmFyIGF0bSA9IGhvdGVsLmxvY2FsLmF0bTtcclxuXHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuY29udmVuaWVuY2UgPSB7XHJcbiAgICAgICAgICAgICAgICBzY29yZTowXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBsb2NhbFNjb3JlID0gaG90ZWwuYXNzZXNzbWVudC5jb252ZW5pZW5jZS5zY29yZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBncm9jZXJ5U2NvcmUgPSAwO1xyXG4gICAgICAgICAgICB2YXIgY2l0aVNjb3JlID0gMDtcclxuICAgICAgICAgICAgdmFyIGF0bVNjb3JlID0gMDtcclxuXHJcbiAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4ubG9jYWwgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdW1tYXJ5ID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBncm9jZXJ5VHh0ID0gJydcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmdyb2Nlcnkpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuZ3JvY2VyeS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLWI7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBncm9jZXJ5NzUgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhciBncm9jZXJ5MTUwID0gW107XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3JvY2VyeTIyNSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGdyb2NlcnkzMDAgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsb2NhbFNjb3JlICs9IE1hdGgubWF4KCgyMDAgLSBob3RlbC5sb2NhbC5ncm9jZXJ5WzBdKS82MCwgMClcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvdGVsLmxvY2FsLmdyb2NlcnkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmID0gaG90ZWwubG9jYWwuZ3JvY2VyeVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkaWY8NzUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5NzUucHVzaChkaWYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU2NvcmUrPTAuMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihkaWY8MTUwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeTE1MC5wdXNoKGRpZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTY29yZSs9MC4wMjVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlmPDIyNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb2NlcnkyMjUucHVzaChkaWYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU2NvcmUrPTAuMDA1XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRpZjwzMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5MzAwLnB1c2goZGlmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFNjb3JlKz0wLjAwMDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZ3JvY2VyeVNjb3JlKz0gKDQwMCAtIGhvdGVsLmxvY2FsLm5lYXJlc3QuZ3JvY2VyeSkvMlxyXG4gICAgICAgICAgICAgICAgZ3JvY2VyeVNjb3JlKz1ncm9jZXJ5NzUubGVuZ3RoKjM7XHJcbiAgICAgICAgICAgICAgICBncm9jZXJ5U2NvcmUrPWdyb2NlcnkxNTAubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZ3JvY2VyeVNjb3JlKz1ncm9jZXJ5MjI1Lmxlbmd0aC8yO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLm5lYXJlc3QuZ3JvY2VyeTw2MCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBncm9jZXJ5VGltZSA9IChNYXRoLnJvdW5kKGhvdGVsLmxvY2FsLm5lYXJlc3QuZ3JvY2VyeS8xNCkrMSkqMTBcclxuICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0Kz0gJzxzdHJvbmc+JysgZ3JvY2VyeVRpbWUrJ+y0iCDqsbDrpqw8L3N0cm9uZz4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdyb2Nlcnk3NS5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQrPSAn7J2YIOqwgOyepSDqsIDquYzsmrQg7Iud66OM7ZKI7KCQ7J2EIO2PrO2VqO2VtCA8c3Ryb25nPuuLqCAx67aEIOqxsOumrOyXkCAnK2dyb2Nlcnk3NS5sZW5ndGgrJ+qwnDwvc3Ryb25nPuydmCDsi53ro4ztkojsoJAg7JyE7LmYLidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihncm9jZXJ5MTUwLmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeVR4dCs9ICfsnZgg6rCA7J6lIOqwgOq5jOyatCDsi53ro4ztkojsoJDsnYQg7Y+s7ZWo7ZW0IDxzdHJvbmc+Muu2hCDqsbDrpqzsl5AgJytncm9jZXJ5MTUwLmxlbmd0aCsn6rCcPC9zdHJvbmc+7J2YIOyLneujjO2SiOygkOydtCDsnITsuZguJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGdyb2NlcnkyMjUubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0Kz0gJ+ydmCDqsIDsnqUg6rCA6rmM7Jq0IOyLneujjO2SiOygkOydhCDtj6ztlajtlbQgPHN0cm9uZz4z67aEIOqxsOumrOyXkCAnK2dyb2NlcnkyMjUubGVuZ3RoKyfqsJw8L3N0cm9uZz7snZgg7Iud66OM7ZKI7KCQ7J20IOychOy5mC4nXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQrPSAn7JeQIOqwgOyepSDqsIDquYzsmrQg7Iud66OM7ZKI7KCQ7J20IOychOy5mCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihncm9jZXJ5NzUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQrPSAnPHN0cm9uZz4x67aEIOqxsOumrDwvc3Ryb25nPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ3JvY2VyeTE1MC5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQrPSAn7J2YIOqwgOyepSDqsIDquYzsmrQg7Iud66OM7ZKI7KCQ7J2EIO2PrO2VqO2VtCA8c3Ryb25nPjLrtoQg6rGw66as7JeQICcrZ3JvY2VyeTE1MC5sZW5ndGgrJ+qwnDwvc3Ryb25nPuydmCDsi53ro4ztkojsoJDsnbQg7JyE7LmYLidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihncm9jZXJ5MjI1Lmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeVR4dCs9ICfsnZgg6rCA7J6lIOqwgOq5jOyatCDsi53ro4ztkojsoJDsnYQg7Y+s7ZWo7ZW0IDxzdHJvbmc+M+u2hCDqsbDrpqzsl5AgJytncm9jZXJ5MjI1Lmxlbmd0aCsn6rCcPC9zdHJvbmc+7J2YIOyLneujjO2SiOygkOydtCDsnITsuZguJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0Kz0gJ+yXkCDqsIDsnqUg6rCA6rmM7Jq0IOyLneujjO2SiOygkOydtCDsnITsuZgnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoZ3JvY2VyeTE1MC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeVR4dCs9ICc8c3Ryb25nPjLrtoQg6rGw66asPC9zdHJvbmc+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihncm9jZXJ5MjI1Lmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeVR4dCs9ICfsnZgg6rCA7J6lIOqwgOq5jOyatCDsi53ro4ztkojsoJDsnYQg7Y+s7ZWo7ZW0IDxzdHJvbmc+M+u2hCDqsbDrpqzsl5AgJytncm9jZXJ5MjI1Lmxlbmd0aCsn6rCcPC9zdHJvbmc+7J2YIOyLneujjO2SiOygkOydtCDsnITsuZguJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGdyb2NlcnkzMDAubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0Kz0gJ+ydmCDqsIDsnqUg6rCA6rmM7Jq0IOyLneujjO2SiOygkOydhCDtj6ztlajtlbQgPHN0cm9uZz4067aEIOqxsOumrOyXkCAnK2dyb2NlcnkzMDAubGVuZ3RoKyfqsJw8L3N0cm9uZz7snZgg7Iud66OM7ZKI7KCQ7J20IOychOy5mC4nXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQrPSAn7JeQIOqwgOyepSDqsIDquYzsmrQg7Iud66OM7ZKI7KCQ7J20IOychOy5mCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihncm9jZXJ5MjI1Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0Kz0gJzxzdHJvbmc+M+u2hCDqsbDrpqw8L3N0cm9uZz4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdyb2NlcnkzMDAubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0Kz0gJ+ydmCDqsIDsnqUg6rCA6rmM7Jq0IOyLneujjO2SiOygkOydhCDtj6ztlajtlbQgPHN0cm9uZz4067aEIOqxsOumrOyXkCAnK2dyb2NlcnkzMDAubGVuZ3RoKyfqsJw8L3N0cm9uZz7snZgg7Iud66OM7ZKI7KCQ7J20IOychOy5mC4nXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQrPSAn7JeQIOqwgOyepSDqsIDquYzsmrQg7Iud66OM7ZKI7KCQ7J20IOychOy5mCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbC5ncm9jZXJ5Lmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeVR4dCs9ICc8c3Ryb25nPjXrtoQg6rGw66as7JeQICcrIGhvdGVsLmxvY2FsLmdyb2NlcnkubGVuZ3RoICsgJ+qwnDwvc3Ryb25nPuydmCDsi53ro4ztkojsoJDsnbQg7JyE7LmYJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0Kz0gJ+qwgOyepSDqsIDquYzsmrQg7Iud66OM7ZKI7KCQ7J20IDXrtoTqsbDrpqzsl5Ag7JyE7LmYJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBob3RlbC5leHBsYWluLmxvY2FsLnB1c2goZ3JvY2VyeVR4dClcclxuXHJcbiAgICAgICAgICAgICAgICBpZihncm9jZXJ5U2NvcmU+MjEwKXtcclxuICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0ID0gJ+qwgOuzjeqzoCDsoIDroLTtlZjqsowg7JWE7Lmo7Iud7IKs66W8IO2VtOqysO2VmOqxsOuCmCDqsITri6jtlZwg7JqU6riw6rGw66as66W8IOyCrOyEnCDsoIDrhYHsl5Ag7IiZ7IaM66GcIOuPjOyVhOyYpOq4sCDqtYnsnqXtnogg7Y6466as7ZWoLidcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5leHBsYWluLmxvY2FsLnB1c2goZ3JvY2VyeVR4dClcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGdyb2NlcnlTY29yZT4xODApe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQgPSAn6rCA67ON6rOgIOyggOugtO2VmOqyjCDslYTsuajsi53sgqzrpbwg7ZW06rKw7ZWY6rGw64KYIOqwhOuLqO2VnCDsmpTquLDqsbDrpqzrpbwg7IKs7IScIOyggOuFgeyXkCDsiJnshozroZwg64+M7JWE7Jik6riwIO2OuOumrO2VqC4nXHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwuZXhwbGFpbi5sb2NhbC5wdXNoKGdyb2NlcnlUeHQpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihob3RlbC5sb2NhbC5uZWFyZXN0Lmdyb2Nlcnk8MjI1KXtcclxuICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0ID0gJ+qwgOuzjeqzoCDsoIDroLTtlZjqsowg7JWE7Lmo7Iud7IKs66W8IO2VtOqysO2VmOqxsOuCmCDqsITri6jtlZwg7JqU6riw6rGw66as66W8IOyCrOyEnCDsoIDrhYHsl5Ag7IiZ7IaM66GcIOuPjOyVhOyYpOq4sCDtjrjrpqztlZwg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5leHBsYWluLmxvY2FsLnB1c2goZ3JvY2VyeVR4dClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBncm9jZXJ5VHh0ICs9ICfsiJnshowg7KO867OA7JeQIOyLneujjO2SiOygkOydtCDsl4bslrQg7KGw6riIIOu2iO2OuO2VoCDsiJgg7J6I7J2MLidcclxuICAgICAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4ubG9jYWwucHVzaChncm9jZXJ5VHh0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBvcGVuMjRDaXRpQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmKGF0bS5jaXRpKXtcclxuICAgICAgICAgICAgICAgIGF0bS5jaXRpLnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEuZGlmPGIuZGlmID8gLTEgOiBhLmRpZiA+Yi5kaWYgPyAxIDogMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHZhciBjaXRpZGlmID0gYXRtLmNpdGlbMF0uZGlmO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXRtLmNpdGkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihhdG0uY2l0aVtpXS5vcGVuSG91ciA9PT0gJ09wZW4gMjQgaG91cnMgYSBkYXknKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjI0Q2l0aUFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOmF0bS5jaXRpW2ldLmRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6YXRtLmNpdGlbaV0uYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6YXRtLmNpdGlbaV0uY29vclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBvcGVuMjRDaXRpQXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5kaWYgPiBiLmRpZiA/IDEgOiBhLmRpZiA8IGIuZGlmID8gLTEgOiAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjaXRpV29yZCA9ICcnXHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY2l0aWRpZjw2MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYob3BlbjI0Q2l0aUFycmF5Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1pbiA9IE1hdGguZmxvb3Iob3BlbjI0Q2l0aUFycmF5WzBdLmRpZi83NSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdGlkaWYgPT09IG9wZW4yNENpdGlBcnJheVswXS5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8yNOyLnOqwhCDsmKTtlIjtlZjripQg7JSo7YuwQVRN7J20IDHrtoTqsbDrpqxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU2NvcmUrPSAwLjc1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0aVdvcmQrPSAnMjTsi5zqsIQg7Jq07JiB7ZWY64qUIOyUqO2LsOydgO2WiSBBVE3snbQgPHN0cm9uZz7rj4Trs7Qg64uoIDHrtoTqsbDrpqw8L3N0cm9uZz7sl5Ag7J6I7Ja0IOuKpuydgCDsi5zqsITquYzsp4Ag7JWI7KCE7ZWY6rKMIO2YhOq4iOyduOy2nCDqsIDriqUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8x67aE6rGw66as7JeQIOyUqO2LsEFUTS4g7LaU6rCA66GcIDI07Iuc6rCEIOyYpO2UiO2VmOuKlCBBVE3snbQg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFNjb3JlKz0gMC41O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0aVdvcmQrPSAn7JSo7Yuw7J2A7ZaJIEFUTeydtCA8c3Ryb25nPuuPhOuztCDri6ggMeu2hOqxsOumrDwvc3Ryb25nPuyXkCDsnojqs6AsICcgKyAobWluKzEpICsgJ34nICsgKG1pbisyKSsn67aEIOqxsOumrOyXkCAyNOyLnOqwhCDsmrTsmIHtlZjripQg7JSo7YuwIEFUTeydtCDsnojslrQg64qm7J2AIOyLnOqwhOq5jOyngCDruYTqtZDsoIEg7JWI7KCE7ZWY6rKMIO2YhOq4iCDsnbjstpwg6rCA64qlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v7JSo7YuwQVRN7J20IDHrtoTqsbDrpqxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0aVdvcmQgKz0gJ+yUqO2LsOydgO2WiSBBVE3snbQgPHN0cm9uZz7rj4Trs7Qg64uoIDHrtoTqsbDrpqw8L3N0cm9uZz7sl5Ag7J6I7Ja0IOyUqO2LsOy5tOuTnCDsnbTsmqnsnpDripQg6rWJ7J6l7Z6IIO2OuOumrO2VmOqyjCDtmITquIjsnbjstpwg6rCA64qlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjaXRpZGlmPDE1MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYob3BlbjI0Q2l0aUFycmF5Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1pbiA9IE1hdGguZmxvb3Iob3BlbjI0Q2l0aUFycmF5WzBdLmRpZi83NSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdGlkaWYgPT09IG9wZW4yNENpdGlBcnJheVswXS5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8yNOyLnOqwhCDsmKTtlIjtlZjripQg7JSo7YuwQVRN7J20IDLrtoTqsbDrpqxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU2NvcmUrPSAwLjQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXRpV29yZCs9ICcyNOyLnOqwhCDsmrTsmIHtlZjripQg7JSo7Yuw7J2A7ZaJIEFUTeydtCA8c3Ryb25nPuuPhOuztCDri6ggMn4z67aE6rGw66asPC9zdHJvbmc+7JeQIOyeiOyWtCDriqbsnYAg7Iuc6rCE6rmM7KeAIOu5hOq1kOyggSDslYjsoITtlZjqsowg7ZiE6riI7J247LacIOqwgOuKpSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzJ+M+u2hOqxsOumrOyXkCDslKjti7BBVE0uIOy2lOqwgOuhnCAyNOyLnOqwhCDsmKTtlIjtlZjripQgQVRN7J20IOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0aVdvcmQrPSAn7JSo7Yuw7J2A7ZaJIEFUTeydtCA8c3Ryb25nPuuPhOuztCAyfjPrtoTqsbDrpqw8L3N0cm9uZz7sl5Ag7J6I6rOgLCAnICsgKG1pbisxKSArICd+JyArIChtaW4rMikrJ+u2hCDqsbDrpqzsl5AgMjTsi5zqsIQg7Jq07JiB7ZWY64qUIOyUqO2LsCBBVE3snbQg7J6I7Ja0IOuKpuydgCDsi5zqsITquYzsp4Ag67mE6rWQ7KCBIOyViOyghO2VmOqyjCDtmITquIgg7J247LacIOqwgOuKpSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+yUqO2LsEFUTeydtCAyfjPrtoTqsbDrpqxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0aVdvcmQgKz0gJ+yUqO2LsOydgO2WiSBBVE3snbQgPHN0cm9uZz7rj4Trs7QgMn4z67aE6rGw66asPC9zdHJvbmc+7JeQIOyeiOyWtCDslKjti7DsubTrk5wg7J207Jqp7J6Q6rCAIO2OuOumrO2VmOqyjCDtmITquIjsnbjstpwg6rCA64qlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNpdGlkaWY8MjI1KXtcclxuICAgICAgICAgICAgICAgICAgICBpZihvcGVuMjRDaXRpQXJyYXkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWluID0gTWF0aC5mbG9vcihvcGVuMjRDaXRpQXJyYXlbMF0uZGlmLzc1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0aWRpZiA9PT0gb3BlbjI0Q2l0aUFycmF5WzBdLmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzI07Iuc6rCEIOyYpO2UiO2VmOuKlCDslKjti7BBVE3snbQgNH4167aE6rGw66asXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXRpV29yZCs9ICcyNOyLnOqwhCDsmrTsmIHtlZjripQg7JSo7Yuw7J2A7ZaJIEFUTeydtCA8c3Ryb25nPuuPhOuztCA0fjXrtoTqsbDrpqw8L3N0cm9uZz7sl5Ag7J6I7Ja0IOu5hOq1kOyggSDtjrjrpqztlZjqsowg7ZiE6riI7J247LacIOqwgOuKpSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzR+Neu2hOqxsOumrOyXkCDslKjti7BBVE0uIOy2lOqwgOuhnCAyNOyLnOqwhCDsmKTtlIjtlZjripQgQVRN7J20IOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0aVdvcmQrPSAn7JSo7Yuw7J2A7ZaJIEFUTeydtCA8c3Ryb25nPuuPhOuztCA0fjXrtoTqsbDrpqw8L3N0cm9uZz7sl5Ag7J6I6rOgLCDrj4Trs7TroZwg6rG47Ja06rCIIOunjO2VnCDqsbDrpqzsl5AgMjTsi5zqsIQg7Jq07JiB7ZWY64qUIOyUqO2LsCBBVE3snbQg7J6I7J2MJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vMjTsi5zqsIQg7Jik7ZSI7ZWY64qUIOyUqO2LsEFUTeydtCAyfjPrtoTqsbDrpqxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0aVdvcmQgKz0gJ+yUqO2LsOydgO2WiSBBVE3snbQg64+E67O0IDR+Neu2hOqxsOumrOyXkCDsnojslrQg7JSo7Yuw7Lm065OcIOydtOyaqeyekOqwgCDtmITquIgg7J247LacIOqwgOuKpSdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2l0aVdvcmQgKz0gJ+yUqO2LsOydgO2WiSBBVE3snbQg64+E67O0IDR+Neu2hOqxsOumrOyXkCDsnojslrQg7JSo7Yuw7Lm065OcIOydtOyaqeyekOqwgCDtmITquIgg7J247LacIOqwgOuKpSdcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNpdGlXb3JkICs9ICfslKjti7DsnYDtlokgQVRN7J20IOuPhOuztOuhnCDqsbjslrTqsIgg66eM7ZWcIOqxsOumrOyXkCDsnITsuZjtlagnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBob3RlbC5leHBsYWluLmxvY2FsLnB1c2goY2l0aVdvcmQpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZihhdG0udmlzYSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlzYUFycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICB2YXIgYmFua0FycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0bS52aXNhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXRtLnZpc2FbaV0ub3BlbkhvdXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhdG0udmlzYVtpXS5vcGVuSG91ciA9PT0gJ0EnICYmIGF0bS52aXNhW2ldLmRpZjwyNDAgJiYgYXRtLnZpc2FbaV0ucGxhY2VOYW1lLmluY2x1ZGVzKCdCQU5LJykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzYUFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6YXRtLnZpc2FbaV0uYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yOmF0bS52aXNhW2ldLmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTphdG0udmlzYVtpXS5wbGFjZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOmF0bS52aXNhW2ldLmRpZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdmlzYU1pbiA9IDBcclxuXHJcbiAgICAgICAgICAgICAgICBpZih2aXNhQXJyYXkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aXNhV29yZCA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzYU1pbiA9IE1hdGguZmxvb3IodmlzYUFycmF5WzBdLmRpZi83NSkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU2NvcmUgKz0gTWF0aC5tYXgoKDI1MCAtIHZpc2FBcnJheVswXS5kaWYpLzEyMCwgMClcclxuICAgICAgICAgICAgICAgICAgICB2aXNhV29yZCs9JzI07Iuc6rCEIOyatOyYge2VmOuKlCDsnYDtlokg7IaM7IaNIFZJU0EsIE1BU1RFUkNBUkQg7KCc7Zy0IEFUTeydtCAnICsgdmlzYU1pbiArICd+JyArICh2aXNhTWluKzEpKyAn67aEIOqxsOumrOyXkCDsnojslrQg64qm7J2AIOyLnOqwhOq5jOyngCDtjrjrpqztlZjqsowg7Lac6riIIOqwgOuKpSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwuZXhwbGFpbi5sb2NhbC5wdXNoKHZpc2FXb3JkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbG9jYWxTY29yZSA9IE1hdGgubWluKE1hdGgucm91bmQobG9jYWxTY29yZSoxMCArIDQ1KSw5OSkvMTA7XHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuY29udmVuaWVuY2Uuc2NvcmUgPSBsb2NhbFNjb3JlO1xyXG4gICAgICAgICAgICBzY29yZUFycmF5LnB1c2goe2hpZDpoaWQsIHNjb3JlOmxvY2FsU2NvcmV9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZihncm9jZXJ5NzUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgaWYodmlzYU1pbil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmlzYU1pbiA8IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5PSfsi53ro4ztkojsoJAsIDI07Iuc6rCEIOyYpO2UiCDsnYDtlonshozsho0gQVRNIOuTseydtCDrqqjrkZAg7IiZ7IaM7JeQ7IScIOuPhOuztCAxfjLrtoQg6rGw66asIOuCtOyXkCDsnojslrQg7Jes7ZaJ7ZWY6riwIOunpOyasCDtjrjrpqztlagnXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodmlzYU1pbiA8IDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5PSfrj4Trs7QgMX4y67aEIOqxsOumrOydmCDsi53ro4ztkojsoJAsIDN+NOu2hCDqsbDrpqzsnZggMjTsi5zqsIQg7Jik7ZSIIOydgO2WieyGjOyGjSBBVE0g65Ox7J20IOyImeyGjCDrtoDqt7zsl5Ag7J6I7Ja0IOyXrO2Wie2VmOq4sCDrp6TsmrAg7Y6466as7ZWoJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5PSfsi53ro4ztkojsoJDsnbQg7IiZ7IaM7JeQ7IScIOuPhOuztOuhnCDri6ggMX4y67aEIOqxsOumrOyXkCDsnojslrQg6rCE64uo7Z6IIOyLneyCrOulvCDtlbTqsrDtlZjqsbDrgpgg7KCA64WB7JeQIOyalOq5g+qxsOumrOulvCDsgqzsmKTquLAg7Y6466as7ZWoJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnk9J+yLneujjO2SiOygkOydtCDsiJnshozsl5DshJwg64+E67O066GcIOuLqCAxfjLrtoQg6rGw66as7JeQIOyeiOyWtCDqsITri6jtnogg7Iud7IKs66W8IO2VtOqysO2VmOqxsOuCmCDsoIDrhYHsl5Ag7JqU6rmD6rGw66as66W8IOyCrOyYpOq4sCDtjrjrpqztlagnXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZSBpZihncm9jZXJ5MTUwLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGlmKHZpc2FNaW4pe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZpc2FNaW4gPCAzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeT0n64+E67O0IDJ+M+u2hCDqsbDrpqzsnZgg7Iud66OM7ZKI7KCQLCAxfjLrtoQg6rGw66as7J2YIDI07Iuc6rCEIOyYpO2UiCDsnYDtlonshozsho0gQVRNIOuTseydtCDsiJnshowg67aA6re87JeQIOyeiOyWtCDsl6ztlontlZjquLAg66ek7JqwIO2OuOumrO2VqCdcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih2aXNhTWluIDwgNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnk9J+yLneujjO2SiOygkCwgMjTsi5zqsIQg7Jik7ZSIIOydgO2WieyGjOyGjSBBVE0g65Ox7J20IOuqqOuRkCDsiJnshozsl5DshJwg64+E67O0IDN+NOu2hCDqsbDrpqwg64K07JeQIOyeiOyWtCDsl6ztlontlZjquLAg7Y6466as7ZWoJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5PSfsi53ro4ztkojsoJDsnbQg7IiZ7IaM7JeQ7IScIOuPhOuztOuhnCDri6ggM34067aEIOqxsOumrOyXkCDsnojslrQg6rCE64uo7Z6IIOyLneyCrOulvCDtlbTqsrDtlZjqsbDrgpgg7KCA64WB7JeQIOyalOq5g+qxsOumrOulvCDsgqzsmKTquLAg7Y6466as7ZWoJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnk9J+yLneujjO2SiOygkOydtCDsiJnshozsl5DshJwg64+E67O066GcIOuLqCAzfjTrtoQg6rGw66as7JeQIOyeiOyWtCDqsITri6jtnogg7Iud7IKs66W8IO2VtOqysO2VmOqxsOuCmCDsoIDrhYHsl5Ag7JqU6rmD6rGw66as66W8IOyCrOyYpOq4sCDtjrjrpqztlagnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGdyb2NlcnkyMjUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgaWYodmlzYU1pbil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmlzYU1pbiA8IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5PSfrj4Trs7QgMX4y67aEIOqxsOumrOydmCAyNOyLnOqwhCDsmKTtlIgg7J2A7ZaJ7IaM7IaNIEFUTSwg64+E67O0IDN+NOu2hCDqsbDrpqzsnZgg7Iud66OM7ZKI7KCQIOuTseydtCDsiJnshowg67aA6re87JeQIOyeiOyWtCDsl6ztlontlZjquLAg7Y6466as7ZWcIO2OuCdcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih2aXNhTWluIDwgNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnk9J+yLneujjO2SiOygkCwgMjTsi5zqsIQg7Jik7ZSIIOydgO2WieyGjOyGjSBBVE0g65Ox7J20IOuqqOuRkCDsiJnshozsl5DshJwg64+E67O0IDR+Neu2hCDqsbDrpqwg64K07JeQIOyeiOyWtCDsl6ztlontlZjquLAg7Y6466as7ZWcIO2OuCdcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeT0n7Iud66OM7ZKI7KCQ7J20IOyImeyGjOyXkOyEnCDrj4Trs7TroZwg7JW9IDV+Nuu2hCDqsbDrpqzsl5Ag7J6I7Ja0IOqwhOuLqO2eiCDsi53sgqzrpbwg7ZW06rKw7ZWY6rGw64KYIOyggOuFgeyXkCDsmpTquYPqsbDrpqzrpbwg7IKs7Jik6riwIO2OuOumrO2VqCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5PSfsi53ro4ztkojsoJDsnbQg7IiZ7IaM7JeQ7IScIOuPhOuztOuhnCDslb0gNX4267aEIOqxsOumrOyXkCDsnojslrQg6rCE64uo7Z6IIOyLneyCrOulvCDtlbTqsrDtlZjqsbDrgpgg7KCA64WB7JeQIOyalOq5g+qxsOumrOulvCDsgqzsmKTquLAg7Y6466as7ZWoJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHZpc2FNaW4pe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZpc2FNaW4gPCAzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeT0nMjTsi5zqsIQg7Jik7ZSIIOydgO2WieyGjOyGjSBBVE3snbQg7IiZ7IaMIDF+Muu2hCDqsbDrpqzsl5Ag7J6I7J2MLiDqt7gg7Jm47J2YIO2OuOydmOyLnOyEpOydgCDrtoDsobHtlZwg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih2aXNhTWluIDwgNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnk9JzI07Iuc6rCEIOyYpO2UiCDsnYDtlonshozsho0gQVRN7J20IOyImeyGjCAzfjTrtoQg6rGw66as7JeQIOyeiOydjC4g6re4IOyZuOydmCDtjrjsnZjsi5zshKTsnYAg67aA7KGx7ZWcIO2OuC4nXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnk9J+yImeyGjCDrtoDqt7wg7Y647J2Y7Iuc7ISk7J20IOyemCDrsJzri6zrkJjsp4DripQg7JWK7J2AIO2OuC4nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeT0n7IiZ7IaMIOu2gOq3vCDtjrjsnZjsi5zshKTsnbQg7J6YIOuwnOuLrOuQmOyngOuKlCDslYrsnYAg7Y64LidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaG90ZWwuc3VtbWFyeS5jb252ZW5pZW5jZSA9IHN1bW1hcnk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ3JvY2VyeVRlbXAgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmdyb2Nlcnkpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwuZ3JvY2VyeS5sZW5ndGg+Myl7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuZ3JvY2VyeS5sZW5ndGggPSAzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBncm9jZXJ5VGVtcCA9IGhvdGVsLmxvY2FsLmdyb2Nlcnk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhvdGVsLmxvY2FsID0ge1xyXG4gICAgICAgICAgICAgICAgYXRtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2l0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgb3RoZXI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZ3JvY2VyeTpncm9jZXJ5VGVtcFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihvcGVuMjRDaXRpQXJyYXkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuYXRtLmNpdGkgPSBvcGVuMjRDaXRpQXJyYXlbMF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHZpc2FBcnJheS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5hdG0ub3RoZXIgPSB2aXNhQXJyYXlbMF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhvdGVsLm90YSA9IHtcclxuICAgICAgICAgICAgICAgIGFnb2RhOntcclxuICAgICAgICAgICAgICAgICAgICBzdGFyOmhvdGVsLnN0YXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nOmhvdGVsLmdyYWRlX2F2ZyxcclxuICAgICAgICAgICAgICAgICAgICByZXZpZXdzOmhvdGVsLmdyYWRlX25vXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVsZXRlIGhvdGVsLnN0YXI7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBob3RlbC5ncmFkZV9hdmc7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBob3RlbC5ncmFkZV9ubztcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2NvcmVBcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5zY29yZT5iLnNjb3JlID8gLTEgOiBhLnNjb3JlPGIuc2NvcmUgPyAxIDogMFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZpcmViYXNlLlxyXG5cclxuICAgICAgICBkYXRhLnN0YXR1cy5ob3RlbHMuZmFjaWxpdHkgPSB0cnVlO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaXR5KS51cGRhdGUoZGF0YSlcclxuXHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmVfc2FmZXR5OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBzY29yZV90cmFuc3BvcnQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IGNpdHkgPSB0aGlzLmNpdHlcclxuXHJcbiAgICAgICAgdmFyIG11c2ljYWwgPSBbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIuychO2CpOuTnFwiLFxyXG4gICAgICAgICAgICAgICAgdGhlYXRlcjpcIuqxsOyKiOyciCDqt7nsnqVcIixcclxuICAgICAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDo0MC43NjIzODMyLFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzotNzMuOTg1MTYxNlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOlwi65287J207JioIO2CuVwiLFxyXG4gICAgICAgICAgICAgICAgdGhlYXRlcjpcIuuvvOyKpOy9lO2UhCDqt7nsnqVcIixcclxuICAgICAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDo0MC43NTgwMjc3LFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzotNzMuOTg2MTQxOFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOlwi7YK57YKkIOu2gOy4oFwiLFxyXG4gICAgICAgICAgICAgICAgdGhlYXRlcjpcIuyVjCDtl4jsiaztjqDrk5wg6re57J6lXCIsXHJcbiAgICAgICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6NDAuNzU5MjYxLFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzotNzMuOTkxMzg5N1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOifsi5zsubTqs6AnLFxyXG4gICAgICAgICAgICAgICAgdGhlYXRyZTon7JWw67Cw7ISc642UIOq3ueyepScsXHJcbiAgICAgICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6NDAuNzYxMjQ4OSxcclxuICAgICAgICAgICAgICAgICAgICBsbmc6LTczLjk4NjYyMzdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIuyVjOudvOuUmFwiLFxyXG4gICAgICAgICAgICAgICAgdGhlYXRlcjpcIuuJtCDslZTsiqTthYzrpbTri7Qg6re57J6lXCIsXHJcbiAgICAgICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6NDAuNzU2MDg3MSxcclxuICAgICAgICAgICAgICAgICAgICBsbmc6LTczLjk5MDEyNTdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIlRLVFNcIixcclxuICAgICAgICAgICAgICAgIHRoZWF0ZXI6XCJUS1RTXCIsXHJcbiAgICAgICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6NDAuNzU5MTk1OSxcclxuICAgICAgICAgICAgICAgICAgICBsbmc6LTczLjk4NzA4MTRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV1cclxuXHJcbiAgICAgICAgdmFyIHRpY2tldCA9IHtcclxuICAgICAgICAgICAgbmFtZTpcIlRLVFNcIixcclxuICAgICAgICAgICAgdGhlYXRlcjpcIlRLVFNcIixcclxuICAgICAgICAgICAgY29vcjp7XHJcbiAgICAgICAgICAgICAgICBsYXQ6NDAuNzU5MTk1OSxcclxuICAgICAgICAgICAgICAgIGxuZzotNzMuOTg3MDgxNFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbG93ZXJwb2x5Q29vciA9IFt7IGxhdDogNDAuNzEzOTM5NiwgbG5nOiAtNzQuMDA4MzkwOSB9LCB7IGxhdDogNDAuNzE0NjcxNSwgbG5nOiAtNzQuMDE0Njc4IH0sIHsgbGF0OiA0MC43MTAxODI0LCBsbmc6IC03NC4wMTU3Mjk0IH0sIHsgbGF0OiA0MC43MDkzOTM1LCBsbmc6IC03NC4wMTU1MjU2IH0sIHsgbGF0OiA0MC43MDg5Nzg3LCBsbmc6IC03NC4wMTQ2NDU4IH0sIHsgbGF0OiA0MC43MDgxMDg1LCBsbmc6IC03NC4wMTE3NDkgfSwgeyBsYXQ6IDQwLjcxMzkzOTYsIGxuZzogLTc0LjAwODM5MDkgfV1cclxuICAgICAgICB2YXIgcG9seWdvbiA9IG5ldyBnb29nbGUubWFwcy5Qb2x5Z29uKHtcclxuICAgICAgICAgICAgcGF0aHM6IGxvd2VycG9seUNvb3JcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIHByb21lbmFkZSA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGF0OiA0MC42OTU1MDEzLFxyXG4gICAgICAgICAgICAgICAgbG5nOiAtNzMuOTk4MzAwNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYXQ6IDQwLjY5NjUwNTksXHJcbiAgICAgICAgICAgICAgICBsbmc6IC03My45OTc4MDY5XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhdDogNDAuNjk4NTAyOSxcclxuICAgICAgICAgICAgICAgIGxuZzogLTczLjk5Njg0NjdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGF0OiA0MC42OTk3NjM2LFxyXG4gICAgICAgICAgICAgICAgbG5nOiAtNzMuOTk1NjIzNlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG5cclxuICAgICAgICB2YXIgZHVtYm8gPSB7XHJcbiAgICAgICAgICAgIGxhdDogNDAuNzAzMjIwNSxcclxuICAgICAgICAgICAgbG5nOiAtNzMuOTg5NTk0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBicmlkZ2UgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhdDogNDAuNzAwNDg5NixcclxuICAgICAgICAgICAgICAgIGxuZzogLTczLjk4OTczODhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGF0OiA0MC42OTYxNzY1LFxyXG4gICAgICAgICAgICAgICAgbG5nOiAtNzMuOTg4NzM1N1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG5cclxuICAgICAgICB2YXIgbGFyZ2VTdHJlZXQgPSBbJ1dhdGVyJywgJ0NodXJjaCcsICdXZXN0JywgJ1dhbGwnXTtcclxuICAgICAgICB2YXIgbGFyZ2VTdHJlZXRLbyA9IFsn7JuM7YSwJywgJ+yymOy5mCcsICfsm6jsiqTtirgnLCAn7JuUJ11cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgdmFyIGNlbnRyYWxOZWFyZXN0UG9seSA9IFt7bGF0OjQwLjc2OTI2NDMsbG5nOi03My45ODM4NjQ4fSx7bGF0OjQwLjc2NjcyOTEsbG5nOi03My45ODI4MzQ4fSx7bGF0OjQwLjc2Mjg2MTEsbG5nOi03My45NzM5NTEzfSx7bGF0OjQwLjc2MzgzNjMsbG5nOi03My45NzAwNDZ9LHtsYXQ6NDAuNzk1NzgwNCxsbmc6LTczLjk0Njk1NzZ9LHtsYXQ6NDAuNzk4MTg0NSxsbmc6LTczLjk0ODI0NTF9LHtsYXQ6NDAuODAxOTIwNSxsbmc6LTczLjk1NzEyODZ9LHtsYXQ6NDAuODAxNTYzMSxsbmc6LTczLjk2MDEzMjZ9LHtsYXQ6NDAuNzY5MjY0Myxsbmc6LTczLjk4Mzg2NDh9XVxyXG4gICAgICAgIHZhciBjZW50cmFsTmVhclBvbHkgPSBbe2xhdDo0MC43Njk5MDMyLGxuZzotNzMuOTg2MjY0N30se2xhdDo0MC43NjQ3MDI5LGxuZzotNzMuOTg0MjY4Nn0se2xhdDo0MC43NjA4Njc0LGxuZzotNzMuOTc1Mjc3OH0se2xhdDo0MC43NjI4NDk5LGxuZzotNzMuOTY3NjgyNH0se2xhdDo0MC43OTQ4NzU4LGxuZzotNzMuOTQ0NDg2N30se2xhdDo0MC43OTk5MTE3LGxuZzotNzMuOTQ3MDEyNn0se2xhdDo0MC44MDM3NDUsbG5nOi03My45NTU4OTMyfSx7bGF0OjQwLjgwMjQ3OCxsbmc6LTczLjk2MjY3MTh9LHtsYXQ6NDAuNzY5OTAzMixsbmc6LTczLjk4NjI2NDd9XVxyXG4gICAgICAgIHZhciBjZW50cmFsTWlkUG9seSA9IFt7bGF0OjQwLjgwMzQxNDgsbG5nOi03My45NjQ4NTMzfSx7bGF0OjQwLjc3MDg1NjksbG5nOi03My45ODgyODUxfSx7bGF0OjQwLjc2Mjk5MTIsbG5nOi03My45ODU1Mzg1fSx7bGF0OjQwLjc1OTM1MDUsbG5nOi03My45NzYzNTQ2fSx7bGF0OjQwLjc2MjAxNixsbmc6LTczLjk2NjIyNjZ9LHtsYXQ6NDAuNzkzOTkzNSxsbmc6LTczLjk0Mjc5NDh9LHtsYXQ6NDAuODAxMzM1OCxsbmc6LTczLjk0NjA1NjR9LHtsYXQ6NDAuODA1MTA0LGxuZzotNzMuOTU1MTU0NH0se2xhdDo0MC44MDM0MTQ4LGxuZzotNzMuOTY0ODUzM31dXHJcbiAgICAgICAgdmFyIGNlbnRyYWxGYXJQb2x5ID0gW3tsYXQ6NDAuNzU3MjcwMSxsbmc6LTczLjk3ODAyODN9LHtsYXQ6NDAuNzYwNjgzMyxsbmc6LTczLjk2NDI1MjV9LHtsYXQ6NDAuNzkzNzMzNixsbmc6LTczLjk0MDEzNH0se2xhdDo0MC44MDI2MDI3LGxuZzotNzMuOTQ1MTEyMn0se2xhdDo0MC44MDc1MDc4LGxuZzotNzMuOTU2NzQyM30se2xhdDo0MC44MDQ4NzY3LGxuZzotNzMuOTY4NTAxMX0se2xhdDo0MC43NzIxODk0LGxuZzotNzMuOTkxNjMyNX0se2xhdDo0MC43NjA5NDMzLGxuZzotNzMuOTg3MTI2NH0se2xhdDo0MC43NTcyNzAxLGxuZzotNzMuOTc4MDI4M31dXHJcblxyXG4gICAgICAgIHZhciBjZW50cmFsTmVhcmVzdCA9IG5ldyBnb29nbGUubWFwcy5Qb2x5Z29uKHtcclxuICAgICAgICAgICAgcGF0aHM6IGNlbnRyYWxOZWFyZXN0UG9seVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGNlbnRyYWxNaWQgPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbih7XHJcbiAgICAgICAgICBwYXRoczogY2VudHJhbE1pZFBvbHlcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgY2VudHJhbE5lYXIgPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbih7XHJcbiAgICAgICAgICBwYXRoczogY2VudHJhbE5lYXJQb2x5XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGNlbnRyYWxGYXIgPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbih7XHJcbiAgICAgICAgICBwYXRoczogY2VudHJhbEZhclBvbHlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGNlbnRyYWxTcG90cyA9IFt7XHJcbiAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgbGF0OjQwLjc3MjQxNjksXHJcbiAgICAgICAgICAgICAgICBsbmc6LTczLjk2NzEzODVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwbGFpbjon7IS87Yq465+0IO2MjO2BrCDrgrTsl5DshJzrj4Qg7JWE66aE64uk7Jq0IOqyveq0gOydhCDsnpDrnpHtlZjripQg67Kg642w7Iqk64ukIO2FjOudvOyKpOyZgCDtmLjsiJjroZwg67CU66GcIO2Gte2VmOuKlCDsnoXqtawnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgbGF0OjQwLjc3NzczMDQsXHJcbiAgICAgICAgICAgICAgICBsbmc6LTczLjk3NDgzMTFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwbGFpbjon7IS87Yq465+0IO2MjO2BrCDrgrTsl5DshJzrj4Qg7JWE66aE64uk7Jq0IOqyveq0gOydhCDsnpDrnpHtlZjripQg67Kg642w7Iqk64ukIO2FjOudvOyKpOyZgCDtmLjsiJjroZwg67CU66GcIO2Gte2VmOuKlCDsnoXqtawnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgbGF0OjQwLjc2NTIwMTQsXHJcbiAgICAgICAgICAgICAgICBsbmc6LTczLjk3NTA2NzFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwbGFpbjon66+465Oc7YOA7Jq0IOunqO2VtO2KvOydmCDqsbTrrLzrk6TsnbQg7JWE66aE64u16rKMIOu5hOy5mOuKlCDrgqjri6gg7Zi47IiY6rCAJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgIGxhdDo0MC43NjU3MjE1LFxyXG4gICAgICAgICAgICAgICAgbG5nOi03My45NzIwNDE2XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV4cGxhaW46J+uvuOuTnO2DgOyatCDrp6jtlbTtirzsnZgg6rG066y865Ok7J20IOyVhOumhOuLteqyjCDruYTsuZjripQg64Ko64uoIO2YuOyImOqwgCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29vcjp7XHJcbiAgICAgICAgICAgICAgICBsYXQ6NDAuNzgyMDUyNSxcclxuICAgICAgICAgICAgICAgIGxuZzotNzMuOTcxNzQxMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBleHBsYWluOifshLztirjrn7Qg7YyM7YGsIOuCtOyXkOyEnOuPhCDsg4Hsp5XrrLzroZwg6ry97Z6I64qUIOuyqOuUlOu5hOyWtCDshLEsIOuNuOudvOy9lOultO2FjCDqt7nsnqUg65Ox7Jy866GcIO2Gte2VmOuKlCDsnoXqtawnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgbGF0OjQwLjc3NzIwMjQsXHJcbiAgICAgICAgICAgICAgICBsbmc6LTczLjk2MzY0MDlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwbGFpbjon7IS87Yq465+0IO2MjO2BrCDrgrTsl5DshJzrj4Qg7IOB7KeV66y866GcIOq8ve2eiOuKlCDrsqjrlJTruYTslrQg7ISxLCDrjbjrnbzsvZTrpbTthYwg6re57J6lIOuTseycvOuhnCDthrXtlZjripQg7J6F6rWsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgIGxhdDo0MC43ODEwOTM5LFxyXG4gICAgICAgICAgICAgICAgbG5nOi03My45NjA3OTI0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV4cGxhaW46J+yEvO2KuOuftCDtjIztgawg67aB64uoIO2YuOyImCwg65+s64ud7Yq4656Z7Jy866GcIO2Gte2VmOuKlCDsnoXqtawnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgbGF0OjQwLjc4NDEyNCxcclxuICAgICAgICAgICAgICAgIGxuZzotNzMuOTU4NTg3NlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBleHBsYWluOifshLztirjrn7Qg7YyM7YGsIOu2geuLqCDtmLjsiJgsIOufrOuLne2KuOuemeycvOuhnCDthrXtlZjripQg7J6F6rWsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgIGxhdDo0MC43ODc5MTc3LFxyXG4gICAgICAgICAgICAgICAgbG5nOi03My45NTU3ODIxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV4cGxhaW46J+yEvO2KuOuftCDtjIztgawg67aB64uoIO2YuOyImCwg65+s64ud7Yq4656Z7Jy866GcIO2Gte2VmOuKlCDsnoXqtawnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgbGF0OjQwLjc5MzQ1NzQsXHJcbiAgICAgICAgICAgICAgICBsbmc6LTczLjk1MTcyMTJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwbGFpbjon7IS87Yq465+0IO2MjO2BrCDrtoHrtoDsnZgg7Luo7ISc67KE7Yag66asIOqwgOuToCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29vcjp7XHJcbiAgICAgICAgICAgICAgICBsYXQ6NDAuNzg4MTQ1MSxcclxuICAgICAgICAgICAgICAgIGxuZzotNzMuOTY3MjM1MVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBleHBsYWluOifshLztirjrn7Qg7YyM7YGsIOu2geuLqCDtmLjsiJgsIOufrOuLne2KuOuemeycvOuhnCDthrXtlZjripQg7J6F6rWsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgIGxhdDo0MC43ODUyODE2LFxyXG4gICAgICAgICAgICAgICAgbG5nOi03My45NjkzNTk0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV4cGxhaW46J+yEvO2KuOuftCDtjIztgawg67aB64uoIO2YuOyImCwg65+s64ud7Yq4656Z7Jy866GcIO2Gte2VmOuKlCDsnoXqtawnXHJcbiAgICAgICAgfV1cclxuXHJcblxyXG4gICAgICAgIHZhciBjZW50cmFsU2NvcmVBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICB2YXIgdGhlbWUgPSB7ICAgLy9leHBsYWlu7J2YIO2VreuqqeycvOuhnCDrk6TslrTqsIgg64WA7ISdXHJcbiAgICAgICAgICAgICAgICBicm9hZHdheTpbXSxcclxuICAgICAgICAgICAgICAgIGxvd2VyOltdLFxyXG4gICAgICAgICAgICAgICAgY2VudHJhbDpbXVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3VtbWFyeV90aGVtZSA9IHtcclxuICAgICAgICAgICAgYnJvYWR3YXk6JycsXHJcbiAgICAgICAgICAgIGxvd2VyOicnLFxyXG4gICAgICAgICAgICBjZW50cmFsOicnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG11c2ljYWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbXVzaWNhbFtpXS5tZXRybyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkYXRhLm1ldHJvLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWV0cm8gPSBkYXRhLm1ldHJvW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYobXVzaWNhbFtpXS5jb29yLCBtZXRyby5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkaWY8MzAwKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IG1ldHJvLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBtZXRyby5saW5lW2tdWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobXVzaWNhbFtpXS5tZXRyb1tsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtdXNpY2FsW2ldLm1ldHJvW2xpbmVdLmRpZiA+IGRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVzaWNhbFtpXS5tZXRyb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldHJvLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IG1ldHJvLmNvb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVzaWNhbFtpXS5tZXRyb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IG1ldHJvLmNvb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2cobXVzaWNhbClcclxuICAgICAgICB2YXIgc2NvcmVPYmogPSB7fTtcclxuXHJcblxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiBkYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSBkYXRhLmhvdGVsc1toaWRdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJyb2FkV29yZCA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQudGhlbWUgPSB7XHJcbiAgICAgICAgICAgICAgICBicm9hZDp7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6MFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB3YWxrYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgaGFzTGluZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtdXNpY2FsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHh0ID0gJydcclxuICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoaG90ZWwuY29vciwgbXVzaWNhbFtpXS5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkaWY8NjAwKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYnJvYWREaWZTY29yZSA9ICg2MDAgLSBkaWYpLzQwMFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNjb3JlT2JqW2hpZF0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZU9ialtoaWRdICs9IDEgKyBicm9hZERpZlNjb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlT2JqW2hpZF0gPSAxICsgYnJvYWREaWZTY29yZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+ycoOuqhSDqt7nsnqXrk6TsnbQg66qw66Ck7J6I64qUIOu4jOuhnOuTnOybqOydtCwg7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOyXkOyEnCDqsIDquYzsm4AnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyb2FkV29yZC5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihtdXNpY2FsW2ldLm5hbWUgPT09ICdUS1RTJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCA9ICfri7nsnbwg666k7KeA7LusIO2LsOy8k+ydhCDsoIDroLTtlZjqsowg7JiI66ek7ZWgIOyImCDsnojripQgVEtUUyDti7DsvJPtjJDrp6TrtoDsiqTquYzsp4Ag64+E67O066GcIOyVvSAnICsgKE1hdGguZmxvb3IoZGlmLzYwKSsxKSArICfrtoQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicm9hZFdvcmQucHVzaCh0eHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn666k7KeA7LusICcgKyBtdXNpY2FsW2ldLm5hbWUgKyAnIOqzteyXsOydtCDsl7TrpqzripQgJyArIG11c2ljYWxbaV0udGhlYXRlciArICfquYzsp4Ag64+E67O066GcIOyVvSAnICsgKE1hdGguZmxvb3IoZGlmLzYwKSsxKSArICfrtoQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicm9hZFdvcmQucHVzaCh0eHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2Fsa2FibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHdhbGthYmxlKXtcclxuICAgICAgICAgICAgICAgIHNjb3JlT2JqW2hpZF0gKz0gNDtcclxuICAgICAgICAgICAgICAgIGlmKGJyb2FkV29yZC5sZW5ndGg+NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+uupOyngOy7rOydhCDsl6zrn6wg7Y64IOuzvCDsg53qsIHsnbTrnbzrqbQsIOuwpCDriqbqsowg64Gd64KY64qUIOuupOyngOy7rOydhCDrs7Tqs6Ag7JWI7KCE7ZWY6rKMIOyImeyGjOuhnCDqt4DqsIDtlZjquLAg66ek7JqwIOyii+ydgCDsiJnshowuJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyb2FkV29yZC5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihicm9hZFdvcmQubGVuZ3RoPjIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCA9ICfrrqTsp4Dsu6zsnYQg7Jes65+sIO2OuCDrs7wg7IOd6rCB7J20652866m0LCDrsKQg64qm6rKMIOuBneuCmOuKlCDrrqTsp4Dsu6zsnYQg67O06rOgIOyViOyghO2VmOqyjCDsiJnshozroZwg6reA6rCA7ZWY6riwIOyii+ydgCDsiJnshowuJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyb2FkV29yZC5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7J2867CY7KCB7Jy866GcIOuwpCDriqbqsowg64Gd64KY64qUIOuupOyngOy7rOydhCDrs7Tqs6Ag7JWI7KCE7ZWY6rKMIOyImeyGjOuhnCDqt4DqsIDtlZjquLAg7KKL7J2AIO2OuOyXkCDsho3tlZjripQg7IiZ7IaMLidcclxuICAgICAgICAgICAgICAgICAgICBicm9hZFdvcmQucHVzaCh0eHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZU9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdW06OTk5XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbGluZSBpbiBkYXRhLnNwb3RzLnJhbmtlZFs5XS5tZXRyb0luZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0cm9JbmYgPSBkYXRhLnNwb3RzLnJhbmtlZFs5XS5tZXRyb0luZm9bbGluZV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdhbGtEaWYgPSBtZXRyb0luZi5kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0TmFtZSA9IG1ldHJvSW5mLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhvdGVsTWV0TmFtZSA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1ldHJvRGlmID0gMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5tZXRyb0luZm8pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihPYmplY3Qua2V5cyhob3RlbC5tZXRyb0luZm8pLmluY2x1ZGVzKGxpbmUpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGtEaWYgKz0gaG90ZWwubWV0cm9JbmZvW2xpbmVdLmRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWxNZXROYW1lID0gaG90ZWwubWV0cm9JbmZvW2xpbmVdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0RpZiA9IGNhbGN1bGF0ZURpZihkYXRhLm1ldHJvW21ldHJvSW5mLmNvZGVdLmNvb3IsIGRhdGEubWV0cm9baG90ZWwubWV0cm9JbmZvW2xpbmVdLmNvZGVdLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxpbmVPYmouc3VtID4gd2Fsa0RpZi83NSArIG1ldHJvRGlmLzQwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZU9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0cm86IG1ldHJvRGlmLzQwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsayA6IHdhbGtEaWYvNzUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA6IHdhbGtEaWYvNzUgKyBtZXRyb0RpZi80MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzTGluZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaGFzTGluZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlT2JqW2hpZF0gPSBNYXRoLm1heCgoMTYgLSBsaW5lT2JqLnN1bSkvMi45LCAwKSArIE1hdGgubWF4KCg2LWxpbmVPYmoud2FsaykvMS44LCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+2DgOyehOyKpO2AmOyWtCDrtoDqt7zsnYAg7JWE64uI7KeA66eMIDxzdHJvbmc+7YOA7J6E7Iqk7YCY7Ja06rmM7KeAIOyngO2VmOyyoOuhnCDtmZjsirkg7JeG7J20IOu5oOultOqyjDwvc3Ryb25nPiDsnbTrj5ntlaAg7IiYIOyeiOuKlCDsiJnshowuJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyb2FkV29yZC5wdXNoKHR4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxpbmVPYmoud2FsayA8IDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsaW5lT2JqLnN1bTwxMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg64+E67O0IOydtOuPmeyLnOqwhCDri6ggJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOydmCDso7zsmpQg6re57J6l65Ok6rmM7KeAIOqwiCDsiJgg7J6I7J2MJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU9iai5zdW08MTYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+uPhOuztCDsnbTrj5nsi5zqsIQg64uoICcrIE1hdGgucm91bmQobGluZU9iai53YWxrKSArJ+u2hOydhCDtj6ztlajtlbQg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IO2DgOyehOyKpO2AmOyWtCDrtoDqt7zsnZgg7KO87JqUIOq3ueyepeuTpOq5jOyngCDqsIgg7IiYIOyeiOydjCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOydmCDso7zsmpQg6re57J6l65Ok6rmM7KeA64qUIOuPhOuztCDsnbTrj5nsi5zqsIQgJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbQg7IaM7JqU65CoLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGxpbmVPYmoud2FsayA8IDcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsaW5lT2JqLnN1bTwxMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg64+E67O0IOydtOuPmeyLnOqwhCDslb0gJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOydmCDso7zsmpQg6re57J6l65Ok6rmM7KeAIOqwiCDsiJgg7J6I7J2MJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU9iai5zdW08MTYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+uPhOuztCDsnbTrj5nsi5zqsIQg7JW9ICcrIE1hdGgucm91bmQobGluZU9iai53YWxrKSArJ+u2hOydhCDtj6ztlajtlbQg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IO2DgOyehOyKpO2AmOyWtCDrtoDqt7zsnZgg7KO87JqUIOq3ueyepeuTpOq5jOyngCDqsIgg7IiYIOyeiOydjCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOydmCDso7zsmpQg6re57J6l65Ok6rmM7KeA64qUIOuPhOuztCDsnbTrj5nsi5zqsIQgJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbQg7IaM7JqU65CoLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsaW5lT2JqLnN1bTwxMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg64+E67O0IOydtOuPmeyLnOqwhCDslb0gJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOydmCDso7zsmpQg6re57J6l65Ok6rmM7KeAIOqwiCDsiJgg7J6I7J2MJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU9iai5zdW08MTYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+uPhOuztCDsnbTrj5nsi5zqsIQg7JW9ICcrIE1hdGgucm91bmQobGluZU9iai53YWxrKSArJ+u2hOydhCDtj6ztlajtlbQg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IO2DgOyehOyKpO2AmOyWtCDrtoDqt7zsnZgg7KO87JqUIOq3ueyepeuTpOq5jOyngCDqsIgg7IiYIOyeiOydjCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOydmCDso7zsmpQg6re57J6l65Ok6rmM7KeA64qUIOuPhOuztCDsnbTrj5nsi5zqsIQgJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbQg7IaM7JqU65CoLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJvYWRXb3JkLnB1c2godHh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaG90ZWwuZXhwbGFpbi50aGVtZSA9IHtcclxuICAgICAgICAgICAgICAgIGJyb2FkOmJyb2FkV29yZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBicm9hZFNjb3JlQXJyYXkgPSBbXVxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiBzY29yZU9iaikge1xyXG4gICAgICAgICAgICB2YXIgc2MgPSBzY29yZU9ialtoaWRdO1xyXG4gICAgICAgICAgICBpZihzYz45KXtcclxuICAgICAgICAgICAgICAgIHNjID0gTWF0aC5yb3VuZChzYy8wLjM4NSkvMTAgKyA2LjVcclxuICAgICAgICAgICAgICAgIGlmKHNjPjEwLjIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjID0gOS45XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihzYz4xMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2MgPSA5LjhcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNjPjkuOCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2MgPSA5LjdcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNjPjkuNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2MgPSA5LjZcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYoc2M+NCl7XHJcbiAgICAgICAgICAgICAgICBzYyA9IE1hdGgucm91bmQoKHNjKzI3KS8wLjQpLzEwXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc2MgPSBNYXRoLnJvdW5kKHNjKjEwKzQwKS8xMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHNjPDgpe1xyXG4gICAgICAgICAgICAgICAgc2MgPSBNYXRoLnJvdW5kKHNjKjUpLzEwICsgNFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicm9hZFNjb3JlQXJyYXkucHVzaChzYylcclxuICAgICAgICAgICAgZGF0YS5ob3RlbHNbaGlkXS5hc3Nlc3NtZW50LnRoZW1lLmJyb2FkID0gc2M7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgY2VudHJhbFdvcmQgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjZW50cmFsU3VtbWFyeSA9ICcnXHJcbiAgICAgICAgICAgIGxldCBjb29yID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhob3RlbC5jb29yLmxhdCwgaG90ZWwuY29vci5sbmcpXHJcblxyXG4gICAgICAgICAgICB2YXIgc2NvcmUgPSAwXHJcblxyXG4gICAgICAgICAgICB2YXIgaGFzU3BvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgY2VudHJhbE5lYXJTcG90ID0ge1xyXG4gICAgICAgICAgICAgICAgZGlmOjcwMCxcclxuICAgICAgICAgICAgICAgIGV4cGxhaW46XCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCA9ICcnXHJcbiAgICAgICAgICAgIHZhciBzZWNvbmR0eHQgPSAnJ1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZW50cmFsU3BvdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBzcG90Q29vciA9IGNlbnRyYWxTcG90c1tpXS5jb29yO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihzcG90Q29vciwgaG90ZWwuY29vcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGlmPGNlbnRyYWxOZWFyU3BvdC5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlID0gKGkrMzApLzQwICsgTWF0aC5taW4oKDcwMCAtIGRpZikvNDUwLDEpXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbE5lYXJTcG90LmRpZiA9IGRpZjtcclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsTmVhclNwb3QuZXhwbGFpbiA9IGNlbnRyYWxTcG90c1tpXS5leHBsYWluXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzU3BvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihoYXNTcG90KXtcclxuICAgICAgICAgICAgICAgIHNlY29uZHR4dCA9ICfrmJDtlZwgPHN0cm9uZz4nK2NlbnRyYWxOZWFyU3BvdC5leHBsYWluO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNlbnRyYWxOZWFyU3BvdC5kaWY8MTUwKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWNvbmR0eHQrPSAn7JeQ7IScIOuLqCAxfjLrtoQg6rGw66asPC9zdHJvbmc+7JeQIOyeiOyWtCDshLztirjrn7TtjIztgazrpbwg642UIOymkOq4sOq4sCDsoovsnYwuJ1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VudHJhbE5lYXJTcG90LmRpZjwzMDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZHR4dCs9ICfsl5DshJwgM34067aEIOqxsOumrDwvc3Ryb25nPuyXkCDsnojslrQg7IS87Yq465+07YyM7YGs66W8IOuNlCDsppDquLDquLAg7KKL7J2MLidcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZHR4dCs9ICc8L3N0cm9uZz7sl5DshJwg6rCA6rmM7JuMIOyEvO2KuOuftO2MjO2BrOulvCDrjZQg7KaQ6riw6riwIOyii+ydjC4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGdvb2dsZS5tYXBzLmdlb21ldHJ5LnBvbHkuY29udGFpbnNMb2NhdGlvbihjb29yLCBjZW50cmFsTmVhcmVzdCkpe1xyXG4gICAgICAgICAgICAgICAgdHh0ID0gJ+yEvO2KuOuftO2MjO2BrOyZgCA8c3Ryb25nPuuPhOuztCDri6ggMn4z67aEIOqxsOumrDwvc3Ryb25nPuuhnCwg7IKw7LGF7J2EIOyii+yVhO2VmOuKlCDsgqzrnozsl5Dqsowg7JWI7ISx66ee7LakJ1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gOTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihoYXNTcG90KXtcclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9ICfshLztirjrn7TtjIztgazsmYAgPHN0cm9uZz7rj4Trs7Qg64uoIDJ+M+u2hOqxsOumrDwvc3Ryb25nPuuhnCDrp6TsmrAg6rCA6rmM7Jq4IOu/kOunjCDslYTri4jrnbwsIO2Kue2eiCA8c3Ryb25nPicrY2VudHJhbE5lYXJTcG90LmV4cGxhaW4rJzwvc3Ryb25nPuyXkOyEnCDqsIDquYzsm4wg7IS87Yq465+07YyM7YGs66W8IOuNlCDsppDquLDquLAg7KKL7J2MJ1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSB0eHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGdvb2dsZS5tYXBzLmdlb21ldHJ5LnBvbHkuY29udGFpbnNMb2NhdGlvbihjb29yLCBjZW50cmFsTmVhcikpe1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gOC42NTtcclxuICAgICAgICAgICAgICAgIHR4dCA9ICfshLztirjrn7TtjIztgazsmYAgPHN0cm9uZz7rj4Trs7QgNH4167aEIOqxsOumrDwvc3Ryb25nPuuhnCwg7IKw7LGF7J2EIOyii+yVhO2VmOuKlCDsgqzrnozsl5Dqsowg7JWI7ISx66ee7LakJ1xyXG4gICAgICAgICAgICAgICAgaWYoaGFzU3BvdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSAn7IS87Yq465+07YyM7YGs7JmAIDxzdHJvbmc+64+E67O0IDR+Neu2hOqxsOumrDwvc3Ryb25nPuuhnCDrp6TsmrAg6rCA6rmM7Jq4IOu/kOunjCDslYTri4jrnbwsIO2Kue2eiCA8c3Ryb25nPicrY2VudHJhbE5lYXJTcG90LmV4cGxhaW4rJzwvc3Ryb25nPuyXkOyEnCDqsIDquYzsm4wg7IS87Yq465+07YyM7YGs66W8IOuNlCDsppDquLDquLAg7KKL7J2MJ1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSB0eHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGdvb2dsZS5tYXBzLmdlb21ldHJ5LnBvbHkuY29udGFpbnNMb2NhdGlvbihjb29yLCBjZW50cmFsTWlkKSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSA4LjI1O1xyXG4gICAgICAgICAgICAgICAgdHh0ID0gJ+yEvO2KuOuftO2MjO2BrOyXkOyEnCA8c3Ryb25nPuuPhOuztCA2fjfrtoQg6rGw66asPC9zdHJvbmc+66GcLCDsgrDssYXsnYQg7KKL7JWE7ZWY64qUIOyCrOuejOyXkOqyjCDsoovsnYwnXHJcbiAgICAgICAgICAgICAgICBpZihoYXNTcG90KXtcclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9ICfshLztirjrn7TtjIztgazsmYAg64+E67O0IDZ+N+u2hCDqsbDrpqzroZwg6rCA6rmM7Jq4IOu/kOunjCDslYTri4jrnbwsIO2Kue2eiCA8c3Ryb25nPicrY2VudHJhbE5lYXJTcG90LmV4cGxhaW4rJzwvc3Ryb25nPuyXkOyEnCDqsIDquYzsm4wg7IS87Yq465+07YyM7YGs66W8IOuNlCDsppDquLDquLAg7KKL7J2MJ1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSB0eHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGdvb2dsZS5tYXBzLmdlb21ldHJ5LnBvbHkuY29udGFpbnNMb2NhdGlvbihjb29yLCBjZW50cmFsRmFyKSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSA4O1xyXG4gICAgICAgICAgICAgICAgdHh0ID0gJ+yEvO2KuOuftO2MjO2BrOyXkOyEnCA8c3Ryb25nPuuPhOuztCAxMOu2hCDsnbTrgrQg6rGw66asPC9zdHJvbmc+66GcLCDsgrDssYXsnYQg7KKL7JWE7ZWY64qUIOyCrOuejOyXkOqyjCDsoovsnYwnXHJcbiAgICAgICAgICAgICAgICBpZihoYXNTcG90KXtcclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9ICfshLztirjrn7TtjIztgazsmYAg64+E67O0IDEw67aEIOydtOuCtCDqsbDrpqzroZwg6rCA6rmM7Jq4IOu/kOunjCDslYTri4jrnbwsIO2Kue2eiCA8c3Ryb25nPicrY2VudHJhbE5lYXJTcG90LmV4cGxhaW4rJzwvc3Ryb25nPuyXkOyEnCDqsIDquYzsm4wg7IS87Yq465+07YyM7YGs66W8IOuNlCDsppDquLDquLAg7KKL7J2MJ1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSB0eHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKHNjb3JlPjcuOSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSA9IChzY29yZS04KS8xLjUgKyA4O1xyXG4gICAgICAgICAgICAgICAgY2VudHJhbFdvcmQucHVzaCh0eHQpO1xyXG4gICAgICAgICAgICAgICAgaWYoaGFzU3BvdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFdvcmQucHVzaChzZWNvbmR0eHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v7J207KCcIOyngO2VmOyyoOydhCDssL7slYTrs7TsnpBcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZU9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdW06OTk5XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzTGluZSA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbGluZSBpbiBkYXRhLnNwb3RzLnJhbmtlZFs0XS5tZXRyb0luZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0cm9JbmYgPSBkYXRhLnNwb3RzLnJhbmtlZFs0XS5tZXRyb0luZm9bbGluZV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdhbGtEaWYgPSBtZXRyb0luZi5kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0TmFtZSA9IG1ldHJvSW5mLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhvdGVsTWV0TmFtZSA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1ldHJvRGlmID0gMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5tZXRyb0luZm8pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihPYmplY3Qua2V5cyhob3RlbC5tZXRyb0luZm8pLmluY2x1ZGVzKGxpbmUpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGtEaWYgKz0gaG90ZWwubWV0cm9JbmZvW2xpbmVdLmRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWxNZXROYW1lID0gaG90ZWwubWV0cm9JbmZvW2xpbmVdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0RpZiA9IGNhbGN1bGF0ZURpZihkYXRhLm1ldHJvW21ldHJvSW5mLmNvZGVdLmNvb3IsIGRhdGEubWV0cm9baG90ZWwubWV0cm9JbmZvW2xpbmVdLmNvZGVdLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxpbmVPYmouc3VtID4gd2Fsa0RpZi83NSArIG1ldHJvRGlmLzQwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZU9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0cm86IG1ldHJvRGlmLzQwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsayA6IHdhbGtEaWYvNzUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA6IHdhbGtEaWYvNzUgKyBtZXRyb0RpZi80MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobGluZU9iai5zdW0gPCAxNil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0xpbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaGFzTGluZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+ydtCDsiJnshozripQg7IS87Yq465+07YyM7YGsIOu2gOq3vOydgCDslYTri4jsp4Drp4wg7IS87Yq465+07YyM7YGs6rmM7KeAIOyngO2VmOyyoOuhnCDtmZjsirkg7JeG7J20IOu5oOultOqyjCDqsIgg7IiYIOyeiOydjC4nXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFdvcmQucHVzaCh0eHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihsaW5lT2JqLndhbGsgPCA0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSA3LjUgKyBNYXRoLnJvdW5kKCgxMiAtIGxpbmVPYmouc3VtLzIpKS8xMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsaW5lT2JqLnN1bTwxMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg64+E67O0IOydtOuPmeyLnOqwhCDri6ggJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7IS87Yq465+07YyM7YGs7JeQIOuPhOuLrCDqsIDriqUuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSAn7IS87Yq465+07YyM7YGsIOu2gOq3vOydgCDslYTri4jsp4Drp4wg7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IOyEvO2KuOuftO2MjO2BrCDrj4TssKkuJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU9iai5zdW08MTYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+uPhOuztCDsnbTrj5nsi5zqsIQg64uoICcrIE1hdGgucm91bmQobGluZU9iai53YWxrKSArJ+u2hOydhCDtj6ztlajtlbQg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IOyEvO2KuOuftO2MjO2BrCDrj4TssKknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9ICfshLztirjrn7TtjIztgawg67aA6re87J2AIOyVhOuLiOyngOunjCDsp4DtlZjssqDsnbQg66ek7JqwIOqwgOq5jOybjCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7IS87Yq465+07YyM7YGsIOuPhOywqS4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU9iai53YWxrIDwgNyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gNyArIE1hdGgucm91bmQoKDEyIC0gbGluZU9iai5zdW0vMikpLzEwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxpbmVPYmouc3VtPDEyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCA9ICfsp4DtlZjssqDsnbQg66ek7JqwIOqwgOq5jOybjCDrj4Trs7Qg7J2064+Z7Iuc6rCEIOyVvSAnKyBNYXRoLnJvdW5kKGxpbmVPYmoud2FsaykgKyfrtoTsnYQg7Y+s7ZWo7ZW0IOyVvSAnICsgKE1hdGgucm91bmQobGluZU9iai5zdW0pKzIpICsgJ+u2hOydtOuptCDshLztirjrn7TtjIztgazsl5Ag64+E64usIOqwgOuKpS4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9ICfshLztirjrn7TtjIztgawg67aA6re87J2AIOyVhOuLiOyngOunjCDsp4DtlZjssqDsnbQg66ek7JqwIOqwgOq5jOybjCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7IS87Yq465+07YyM7YGsIOuPhOywqS4nO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU9iai5zdW08MTYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+uPhOuztCDsnbTrj5nsi5zqsIQg7JW9ICcrIE1hdGgucm91bmQobGluZU9iai53YWxrKSArJ+u2hOydhCDtj6ztlajtlbQg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IOyEvO2KuOuftO2MjO2BrOyXkCDrj4Tri6wg6rCA64qlLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRyYWxTdW1tYXJ5ID0gJ+yEvO2KuOuftO2MjO2BrCDrtoDqt7zsnYAg7JWE64uI7KeA66eMIOyngO2VmOyyoOydtCDrp6TsmrAg6rCA6rmM7JuMIOyVvSAnICsgKE1hdGgucm91bmQobGluZU9iai5zdW0pKzIpICsgJ+u2hOydtOuptCDshLztirjrn7TtjIztgawg64+E7LCpLic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSA2LjUgKyBNYXRoLnJvdW5kKCgxMiAtIGxpbmVPYmouc3VtLzIpKS8xMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsaW5lT2JqLnN1bTwxMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg64+E67O0IOydtOuPmeyLnOqwhCDslb0gJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7IS87Yq465+07YyM7YGs7JeQIOuPhOuLrCDqsIDriqUuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSAn7IS87Yq465+07YyM7YGsIOu2gOq3vOydgCDslYTri4jsp4Drp4wg7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IOyEvO2KuOuftO2MjO2BrCDrj4TssKkuJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGxpbmVPYmouc3VtPDE2KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCA9ICfrj4Trs7Qg7J2064+Z7Iuc6rCEIOyVvSAnKyBNYXRoLnJvdW5kKGxpbmVPYmoud2FsaykgKyfrtoTsnYQg7Y+s7ZWo7ZW0IOyVvSAnICsgKE1hdGgucm91bmQobGluZU9iai5zdW0pKzIpICsgJ+u2hOydtOuptCDshLztirjrn7TtjIztgazsl5Ag64+E64usIOqwgOuKpS4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9ICfshLztirjrn7TtjIztgawg67aA6re87J2AIOyVhOuLiOyngOunjCDsp4DtlZjssqDsnbQg66ek7JqwIOqwgOq5jOybjCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7IS87Yq465+07YyM7YGsIOuPhOywqS4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsV29yZC5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7J20IOyImeyGjOuKlCDshLztirjrn7TtjIztgazsmYAg6rCA6rmM7J20IOyeiOyngOuKlCDslYrsp4Drp4wg64uk66W4IOyepeygkOuTpCDrlYzrrLjsl5Ag7LaU7LKc65CoLidcclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9IHR4dDtcclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsV29yZC5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSA2XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNjb3JlID0gTWF0aC5mbG9vcihzY29yZSoxMCkvMTA7XHJcbiAgICAgICAgICAgIGNlbnRyYWxTY29yZUFycmF5LnB1c2goc2NvcmUpO1xyXG4gICAgICAgICAgICBpZihob3RlbC5leHBsYWluLnRoZW1lKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4udGhlbWUuY2VudHJhbCA9IGNlbnRyYWxXb3JkO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4udGhlbWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbCA6IGNlbnRyYWxXb3JkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoZW1lQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgc3VtbWFyeSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHNjb3JlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIHZhciBoYXNMb3dlclRoZW1lID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoaG90ZWwuYXJlYSA9PT0gMjIpIHtcclxuICAgICAgICAgICAgICAgIHNjb3JlICs9IDg7XHJcbiAgICAgICAgICAgICAgICAvL+q4iOycteyngOq1rFxyXG4gICAgICAgICAgICAgICAgdHh0ID0gJ+uJtOyaleydmCA8c3Ryb25nPuqwgOyepSDtmITrjIDsoIHsnbgg66qo7Iq17J2EIOqzs+qzs+yXkOyEnCDripDrgoQg7IiYIOyeiOuKlDwvc3Ryb25nPiDquIjsnLXsp4Dqtawg7JWI7JeQIOychOy5mO2VnCDsiJnshownXHJcbiAgICAgICAgICAgICAgICB0aGVtZUFycmF5LnB1c2godHh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWRkcmVzcyA9IGhvdGVsLmFkZHJlc3MudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIHZhciBuZWFyU29tZXRoaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29vciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoaG90ZWwuY29vci5sYXQsIGhvdGVsLmNvb3IubG5nKVxyXG4gICAgICAgICAgICAgICAgaWYgKGdvb2dsZS5tYXBzLmdlb21ldHJ5LnBvbHkuY29udGFpbnNMb2NhdGlvbihjb29yLCBwb2x5Z29uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IDEuNztcclxuICAgICAgICAgICAgICAgICAgICB0eHQgPSAn6riI7Jy17KeA6rWsIOu/kOunjCDslYTri4jrnbwgPHN0cm9uZz7ribTsmpUg64K07JeQ7IScIOqwgOyepSDrhpLsnYAg7JuQIOyblOuTnCDtirjroIjsnbTrk5wg7IS87YSwPC9zdHJvbmc+IOu2gOq3vOyXkCDsnITsuZjtlagnXHJcbiAgICAgICAgICAgICAgICAgICAgdGhlbWVBcnJheS5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeSA9ICfribTsmpXsnZgg6rCA7J6lIO2YhOuMgOyggeyduCDrqqjsirXsnYQg64qQ64KEIOyImCDsnojripQgPHN0cm9uZz7quIjsnLXsp4Dqtawg7JWILCDsm5Ag7JuU65OcIO2KuOugiOydtOuTnCDshLzthLAg67aA6re8PC9zdHJvbmc+7JeQIOychOy5mO2VqCdcclxuICAgICAgICAgICAgICAgICAgICBuZWFyU29tZXRoaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXJnZVN0cmVldC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaG90ZWwuYWRkcmVzcy5pbmNsdWRlcyhsYXJnZVN0cmVldFtpXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IDEuNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJTb21ldGhpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+q4iOycteyngOq1rCDrgrTsl5DshJzrj4QgPHN0cm9uZz7slYTrpoTri6TsmrQg6rG066y865Ok7J20IOuKmOyWtOyEoCAnICsgbGFyZ2VTdHJlZXRLb1tpXSArICcg7Iqk7Yq466as7Yq4PC9zdHJvbmc+7JeQIOychOy5mO2VqCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lQXJyYXkucHVzaCh0eHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeSA9ICfribTsmpXsnZgg6rCA7J6lIO2YhOuMgOyggeyduCDrqqjsirXsnYQg64qQ64KEIOyImCDsnojripQgPHN0cm9uZz7quIjsnLXsp4Dqtawg7JWILCDqt7gg7JWI7JeQ7ISc64+EIOyVhOumhOuLpOyatCDqsbTrrLzrk6TsnbQg64qY7Ja07ISgICcgKyBsYXJnZVN0cmVldEtvW2ldICsgJyDsiqTtirjrpqztirg8L3N0cm9uZz7sl5Ag7JyE7LmY7ZWoJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW5lYXJTb21ldGhpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeSA9ICfribTsmpXsnZggPHN0cm9uZz7qsIDsnqUg7ZiE64yA7KCB7J24IOuqqOyKteydhCDqs7Pqs7Psl5DshJwg64qQ64KEIOyImCDsnojripQ8L3N0cm9uZz4g6riI7Jy17KeA6rWsIOyViOyXkCDsnITsuZjtlZwg7IiZ7IaMJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGhhc0xvd2VyVGhlbWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuc3VtbWFyeS50aGVtZS5sb3dlciA9IHN1bW1hcnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmFyZWEgPT09IDIzKSB7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSA4O1xyXG4gICAgICAgICAgICAgICAgLy/ruIzro6jtgbTrprBcclxuICAgICAgICAgICAgICAgIHR4dCA9ICc8c3Ryb25nPuuJtOyaleydmCDslYTrpoTri6TsmrQg7Iqk7Lm07J2065287J247J2EIOqwkOyDge2VmOq4sCDqsIDsnqUg7KKL7J2APC9zdHJvbmc+IOu4jOujqO2BtOumsCDtl6TsnbTsuKAv67mE64Sk6rGwIO2ekCDslYjsl5Ag7JyE7LmY7ZWcIOyImeyGjCdcclxuICAgICAgICAgICAgICAgIHRoZW1lQXJyYXkucHVzaCh0eHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBuZWFyU29tZXRoaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgc29tZXRoaW5nVHh0QXJyID0gW107XHJcbiAgICAgICAgICAgICAgICB2YXIgcGRpZiA9IDgwMDtcclxuICAgICAgICAgICAgICAgIHZhciBuZWFyUHJvbWVuYWRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3VtbWFyeSA9ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvbWVuYWRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvb3IgPSBwcm9tZW5hZGVbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihjb29yLCBob3RlbC5jb29yKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgODAwICYmIGRpZiA8IHBkaWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGRpZiA9IGRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVhclByb21lbmFkZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZWFyUHJvbWVuYWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gMC42O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZkaWYgPSBiZGlmIC8gNzAwXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gKDEgLSBkaWZkaWYudG9GaXhlZCgxKSAqIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCA9ICfrp6jtlbTtirwg7Iqk7Lm07J2065287J247J2EIOqwkOyDge2VoCDsiJgg7J6I64qUIDxzdHJvbmc+7LWc6rOgIOuqheyGjCDspJEg7ZWY64KY7J24IOu4jOujqO2BtOumsCDtl6TsnbTsuKAg7IKw7LGF66GcPC9zdHJvbmc+6rmM7KeAICcgKyBkaWZUb01pbldvcmQocGRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhlbWVBcnJheS5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhclNvbWV0aGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc29tZXRoaW5nVHh0QXJyLnB1c2goJ+u4jOujqO2BtOumsCDtl6TsnbTsuKAg7IKw7LGF66GcJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRkaWYgPSBjYWxjdWxhdGVEaWYoZHVtYm8sIGhvdGVsLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkZGlmIDwgODAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gMC42O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZkaWYgPSBiZGlmIC8gNjAwXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gKDEgLSBkaWZkaWYudG9GaXhlZCgxKSAqIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCA9ICdNQkMg7JiI64qlIDxzdHJvbmc+66y07ZWc64+E7KCE7J2YIOuLrOugpSDtmZTrs7Qg7LSs7JiB7KeA66Gc64+EIOycoOuqhe2VnCDrjaTrs7Qg7Y+s7Yag7KG0PC9zdHJvbmc+6rmM7KeAICcgKyBkaWZUb01pbldvcmQoZGRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhlbWVBcnJheS5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhclNvbWV0aGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc29tZXRoaW5nVHh0QXJyLnB1c2goJ+uNpOuztCDtj6zthqDsobQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGVtZUFycmF5LnB1c2godHh0KTtcclxuICAgICAgICAgICAgICAgIHZhciBiZGlmID0gOTAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5lYXJCcmlkZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnJpZGdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvb3IgPSBicmlkZ2VbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihjb29yLCBob3RlbC5jb29yKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgODAwICYmIGRpZiA8IGJkaWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmRpZiA9IGRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVhckJyaWRnZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJTb21ldGhpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobmVhckJyaWRnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IDAuNjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmZGlmID0gYmRpZiAvIDYwMFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlICs9ICgxIC0gZGlmZGlmLnRvRml4ZWQoMSkgKiAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgPSAn66eo7ZW07Yq87J2YIOyVhOumhOuLpOyatCDsiqTsubTsnbTrnbzsnbjsnYQg67O066mwIOyngeygkSDqsbTrhJAg7IiYIOyeiOuKlCA8c3Ryb25nPuu4jOujqO2BtOumsCDruIzrpr/sp4DsnZgg7J6F6rWsPC9zdHJvbmc+6rmM7KeAICcgKyBkaWZUb01pbldvcmQocGRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhlbWVBcnJheS5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc29tZXRoaW5nVHh0QXJyLnB1c2goJ+u4jOujqO2BtOumsCDruIzrpr/sp4Ag7J6F6rWsJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobmVhclNvbWV0aGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzb21ldGhpbmdUeHRBcnIubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJzxzdHJvbmc+64m07JqVIOyKpOy5tOydtOudvOyduOydhCDqsJDsg4HtlZjquLAg7KKL7J2AIOu4jOujqO2BtOumsCDtl6TsnbTsuKAv67mE64Sk6rGwIO2ekDwvc3Ryb25nPiDslYjsl5Ag7JyE7LmY7ZW0IOyeiOycvOuptOyEnCwg7Iqk7Lm07J2065287J24IOqwkOyDgSDrqoXshozrk6TsnbggPHN0cm9uZz4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgKz0gc29tZXRoaW5nVHh0QXJyLmpvaW4oJywgJykgKyAnPC9zdHJvbmc+7JeQ7IScIOqwgOq5jOyatCDsnITsuZgnXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeSA9ICc8c3Ryb25nPuuJtOyalSDsiqTsubTsnbTrnbzsnbjsnYQg6rCQ7IOB7ZWY6riwIOyii+ydgCDruIzro6jtgbTrprAg7Zek7J207LigL+u5hOuEpOqxsCDtnpA8L3N0cm9uZz4g7JWI7JeQIOychOy5mO2VtCDsnojsnLzrqbTshJwsIOyKpOy5tOydtOudvOyduCDqsJDsg4Eg66qF7IaM7J24IDxzdHJvbmc+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ICs9IHNvbWV0aGluZ1R4dEFyclswXSArICc8L3N0cm9uZz7sl5DshJwg6rCA6rmM7Jq0IOychOy5mCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgPSAnPHN0cm9uZz7ribTsmpXsnZgg7JWE66aE64uk7Jq0IOyKpOy5tOydtOudvOyduOydhCDqsJDsg4HtlZjquLAg6rCA7J6lIOyii+ydgDwvc3Ryb25nPiDruIzro6jtgbTrprAg7Zek7J207LigL+u5hOuEpOqxsCDtnpAg7JWI7JeQIOychOy5mO2VnCDsiJnshownXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaG90ZWwuc3VtbWFyeS50aGVtZS5sb3dlciA9IHN1bW1hcnk7XHJcblxyXG4gICAgICAgICAgICAgICAgaGFzTG93ZXJUaGVtZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaGFzTG93ZXJUaGVtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhlbWVBcnJheSA9IFsn66Gc7JuMIOunqO2VtO2KvCDrtoDqt7zsl5Ag7JyE7LmY7ZWY7KeA64qUIOyViuyngOunjCDri6Trpbgg7J207Jyg65Ok66GcIOyduO2VtCDstpTsspzrkJwg7IiZ7IaMJ107XHJcbiAgICAgICAgICAgICAgICBob3RlbC5zdW1tYXJ5LnRoZW1lLmxvd2VyID0gJ+uhnOybjCDrp6jtlbTtirwg67aA6re87JeQIOychOy5mO2VmOyngOuKlCDslYrsp4Drp4wg64uk66W4IOydtOycoOuTpOuhnCDsnbjtlbQg7LaU7LKc65CcIOyImeyGjCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzY29yZSA9IChzY29yZS50b0ZpeGVkKDEpICogMSk7XHJcbiAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaChzY29yZSlcclxuICAgICAgICAgICAgaWYgKHNjb3JlIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgPSA2O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBob3RlbC5leHBsYWluLnRoZW1lLmxvd2VyID0gdGhlbWVBcnJheTtcclxuICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC50aGVtZS5sb3dlciA9IHNjb3JlO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnJvYWRTY29yZUFycmF5LnNvcnQoKGEsIGIpID0+IGIgLSBhKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGJyb2FkU2NvcmVBcnJheSlcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2l0eSkudXBkYXRlKGRhdGEpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvdGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvaG90ZWwuanMiLCJ2YXIgVHJhbnNwb3J0ID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIGNpdHlOYW1lID0gJChcIi5jaXR5TmFtZVwiKS5odG1sKCk7XHJcbiAgICAgICAgdmFyIGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgbGV0IG9yZGVyQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgaWYoIWRhdGEubWV0cm98fCFkYXRhLm1ldHJvTGluZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAn64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsnoXroKXrkJjsp4Ag7JWK7JWEIOq1kO2GtSDtjrjsnZjshLHsnYQg6rOE7IKw7ZWgIOyImCDsl4bsirXri4jri6QuJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIGRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICB2YXIgdHJhbnNwb3J0X3R4dCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNjb3JlID0gMDtcclxuICAgICAgICAgICAgLy/qtZDthrUg7Y647J2Y7ISxIOygkOyImOu2gOyXrOyaqVxyXG4gICAgICAgICAgICB2YXIgZ29vZExpbmUgPSBbXTtcclxuICAgICAgICAgICAgLy/soovsnYAg7KeA7ZWY7LKgIOudvOyduOuTpCBBcnJheVxyXG4gICAgICAgICAgICB2YXIgdmlzaXRhYmxlID0gW107XHJcbiAgICAgICAgICAgIC8v7ZmY7Iq5IOyXhuydtCDqsIgg7IiYIOyeiOuKlCDqtIDqtJHsp4Ag66qp66GdXHJcbiAgICAgICAgICAgIHZhciBuZWFyZXN0ID0geyBkaXN0YW5jZTogMTIwMCwgbmFtZTogXCJcIiwgY29kZTogXCJcIiB9O1xyXG4gICAgICAgICAgICAvL+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKgXHJcbiAgICAgICAgICAgIHZhciBsaW5lTm8gPSAwXHJcbiAgICAgICAgICAgIC8vMTDrtoTqsbDrpqwg7J2064K07J2YIOyngO2VmOyyoCAg64W47ISgIOqwnOyImFxyXG4gICAgICAgICAgICBpZiAoaG90ZWwubWV0cm9JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBsaW5lTm8gPSBPYmplY3Qua2V5cyhob3RlbC5tZXRyb0luZm8pLmxlbmd0aFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBtZXRMaW5lIGluIGhvdGVsLm1ldHJvSW5mbykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChob3RlbC5tZXRyb0luZm9bbWV0TGluZV0uZGlzdGFuY2UgPCBuZWFyZXN0LmRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdCA9IGhvdGVsLm1ldHJvSW5mb1ttZXRMaW5lXVxyXG4gICAgICAgICAgICAgICAgICAgIC8v6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqAg6rCx7IugXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWV0cm9MaW5lW21ldExpbmVdLnNjb3JlID4gODApIHtcclxuICAgICAgICAgICAgICAgICAgICBnb29kTGluZS5wdXNoKG1ldExpbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgLy/soovsnYAg65287J247J2066m0IOuqqeuhneyXkCDtj6ztlahcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubWV0cm9MaW5lW21ldExpbmVdLnNwb3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IGRhdGEubWV0cm9MaW5lW21ldExpbmVdLnNwb3RbaV1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZpc2l0YWJsZS5pbmNsdWRlcyhzcG90Lm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2l0YWJsZS5wdXNoKHNwb3QubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/tmZjsirkg7JeG7J20IOqwiCDsiJgg7J6I64qUIOq0gOq0keyngOuptCDrqqnroZ3sl5Ag7Y+s7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG5lYXJlc3QubmFtZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnRfdHh0LnB1c2goJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKgIOyXreydgCA8Yj4nICsgbmVhcmVzdC5uYW1lICsgJzwvYj4g7Jet7Jy866GcLCAnICsgZGlmVG9NaW5Xb3JkKG5lYXJlc3QuZGlzdGFuY2UpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGxpbmVObz4wKXtcclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydF90eHQucHVzaCgn7IiZ7IaM7JeQ7IScIOuPhOuztCAxMOu2hOqxsOumrCDsnbTrgrTsl5AgPGI+7KeA7ZWY7LKgICcgKyBsaW5lTm8gKyAn6rCcIOuFuOyEoDwvYj7snbQg7KeA64KoJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChnb29kTGluZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ29vZExpbmUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydF90eHQucHVzaCgn6re4IOykkeyXkOyEnOuPhCDsi6Tsp4jsoIHsnLzroZwgJyArIGNpdHlOYW1lICsgJyDqtIDqtJHsl5Ag7Y6466as7ZWcIDxzdHJvbmc+JyArIGdvb2RMaW5lLmpvaW4oJywgJykgKyAn7Zi47ISgPC9zdHJvbmc+7J20IOyngOuCmOuKlCA8Yj7stIgg7Jet7IS46raMPC9iPicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRfdHh0LnB1c2goJ+q3uCDspJHsl5DshJzrj4Qg7Iuk7KeI7KCB7Jy866GcICcgKyBjaXR5TmFtZSArICcg6rSA6rSR7JeQIO2OuOumrO2VnCA8c3Ryb25nPicgKyBnb29kTGluZSArICftmLjshKA8L3N0cm9uZz7snbQg7KeA64KY64qUIDxiPiDsl63shLjqtow8L2I+Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh2aXNpdGFibGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogMTAw64yAIOq0gOq0keyngCAtPiDribTsmpUg7Iuk7KCcIHNwb3Qg642w7J207YSwIOq4uOydtFxyXG4gICAgICAgICAgICAgICAgaWYgKHZpc2l0YWJsZS5sZW5ndGggPiA5MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydF90eHQucHVzaCgnPGI+JyArIGNpdHlOYW1lICsgJyAxMDDrjIAg6rSA6rSR7KeAIOykkSAnICsgc3BvdE5vICsgJ+qwnDwvYj7rpbwg7ZmY7Iq5IOyXhuydtCDrsKnrrLjtlaAg7IiYIOyeiOuKlCA8c3Ryb25nPuy1nOqzoOydmCDqtZDthrUg7JqU7KeAPC9zdHJvbmc+Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZpc2l0YWJsZS5sZW5ndGggPiA3NSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydF90eHQucHVzaCgnPGI+JyArIGNpdHlOYW1lICsgJyAxMDDrjIAg6rSA6rSR7KeAIOykkSAnICsgc3BvdE5vICsgJ+qwnDwvYj7rpbwg7ZmY7Iq5IOyXhuydtCDrsKnrrLjtlaAg7IiYIOyeiOuKlCA8c3Ryb25nPuq1kO2GtSDsmpTsp4A8L3N0cm9uZz4nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0X3R4dC5wdXNoKGNpdHlOYW1lICsgJyAxMDDrjIAg6rSA6rSR7KeAIOykkSAnICsgc3BvdE5vICsgJ+qwnOulvCDtmZjsirkg7JeG7J20IOuwqeusuCDqsIDriqUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBtaW4gPSBNYXRoLmNlaWwobmVhcmVzdC5kaXN0YW5jZSAvIDcwKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLnN1bW1hcnkpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuc3VtbWFyeS50cmFuc3BvcnQgPSB0aGlzLnN1bW1hcnkobWluLCBsaW5lTm8pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLnN1bW1hcnkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OiB0aGlzLnN1bW1hcnkobWluLCBsaW5lTm8pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBtZXRMaW5lIGluIGhvdGVsLm1ldHJvSW5mbykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldERpc3RhbmNlID0gaG90ZWwubWV0cm9JbmZvW21ldExpbmVdLmRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gKDEwMDAwIC0gbWV0RGlzdGFuY2UpICogZGF0YS5tZXRyb0xpbmVbbWV0TGluZV0uc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9yZGVyQXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzY29yZTogc2NvcmUsXHJcbiAgICAgICAgICAgICAgICBoaWQ6IGhpZFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmV4cGxhaW4pIHtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4udHJhbnNwb3J0ID0gdHJhbnNwb3J0X3R4dDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OiB0cmFuc3BvcnRfdHh0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9yZGVyQXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5zY29yZSA8IGIuc2NvcmUgPyAxIDogYS5zY29yZSA+IGIuc2NvcmUgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG9yZGVyQXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gZGF0YS5ob3RlbHNbb3JkZXJBcnJheVtpXS5oaWRdO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSBNYXRoLnJvdW5kKCgxIC0gKGkgLyBsZW4pICogKGkgLyBsZW4pKSAqIDYwKSAvIDEwICsgNFxyXG4gICAgICAgICAgICAvLzQuMCB+IDEwLjAg7IKs7J207J2YIOygkOyImOulvCDshozsiJjsoJAgMeyekOumrOq5jOyngCDrtoDsl6ztlZzri6QuXHJcbiAgICAgICAgICAgIC8v64aS7J2AIOygkOyImOqwgCDrjZQg66eO64u5XHJcblxyXG4gICAgICAgICAgICBpZiAoaG90ZWwuYXNzZXNzbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC50cmFuc3BvcnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6IHNjb3JlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogc2NvcmVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGEuc3RhdHVzLmhvdGVscy50cmFuc3BvcnQgPSB0cnVlO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSkudXBkYXRlKGRhdGEpXHJcblxyXG4gICAgICAgIHJldHVybiAn64yA7KSR6rWQ7Ya1IOygleuztCDrsJzqsqwuIOq1kO2GtSDtjrjsnZjshLHsnYQg6rOE7IKw7ZaI7Iq164uI64ukLidcclxuICAgIH0sXHJcblxyXG4gICAgc3VtbWFyeTogZnVuY3Rpb24obWluLCBsaW5lTm8pe1xyXG4gICAgICAgIHZhciBzdW1tYXJ5ID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChtaW4gPCAyKSB7XHJcbiAgICAgICAgICAgIGlmIChsaW5lTm8gPiAxOCkge1xyXG4gICAgICAgICAgICAgICAgc3VtbWFyeSA9ICfqsIDsnqUg6rCA6rmM7Jq0IOyngO2VmOyyoOyXreydtCA8c3Ryb25nPuuPhOuztCDri6ggJyArIG1pbiArICd+JyArIChtaW4gKyAxKSArICfrtoQg6rGw66asPC9zdHJvbmc+7JeQIOyeiOqzoCwg64+E67O0IDEw67aEIOqxsOumrOyXkCA8c3Ryb25nPuyngO2VmOyyoCAnICsgbGluZU5vICsgJ+qwnCDrhbjshKA8L3N0cm9uZz7snbQg7KeA64KY64qUIDxiPuy1nOyDgeydmCDsl63shLjqtow8L2I+J1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmVObyA+IDE0KSB7XHJcbiAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IDxzdHJvbmc+64+E67O0IOuLqCAnICsgbWluICsgJ34nICsgKG1pbiArIDEpICsgJ+u2hCDqsbDrpqw8L3N0cm9uZz7sl5Ag7J6I6rOgLCDrj4Trs7QgMTDrtoQg6rGw66as7JeQIDxzdHJvbmc+7KeA7ZWY7LKgICcgKyBsaW5lTm8gKyAn6rCcIOuFuOyEoDwvc3Ryb25nPuydtCDsp4DrgpjripQgPGI+6rWJ7J6l7Z6IIO2bjOulre2VnCDsl63shLjqtow8L2I+J1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdvb2RMaW5lLmxlbmd0aCA+IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IDxzdHJvbmc+64+E67O0IOuLqCAnICsgbWluICsgJ34nICsgKG1pbiArIDEpICsgJ+u2hCDqsbDrpqw8L3N0cm9uZz7sl5Ag7J6I6rOgLCDqtIDqtJHsl5Ag7Y6466as7ZWcIDxzdHJvbmc+JyArIGdvb2RMaW5lICsgJ+2YuOyEoDwvc3Ryb25nPuydtCDsp4DrgpjripQgPGI+7ZuM66Wt7ZWcIOyXreyEuOq2jDwvYj4nXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGdvb2RMaW5lLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IDxzdHJvbmc+64+E67O0IOuLqCAnICsgbWluICsgJ34nICsgKG1pbiArIDEpICsgJ+u2hCDqsbDrpqw8L3N0cm9uZz7sl5Ag7J6I6rOgLCDqtIDqtJHsl5Ag7Y6466as7ZWcIDxzdHJvbmc+JyArIGdvb2RMaW5lICsgJ+2YuOyEoDwvc3Ryb25nPuydtCDsp4DrgpjripQgPGI+7KKL7J2AIOyXreyEuOq2jDwvYj4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG1pbiA8IDQpIHtcclxuICAgICAgICAgICAgaWYgKGxpbmVObyA+IDE4KSB7XHJcbiAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IDxzdHJvbmc+64+E67O0ICcgKyAobWluICsgMSkgKyAnficgKyAobWluICsgMikgKyAn67aEIOqxsOumrDwvc3Ryb25nPuyXkCDsnojqs6AsIOuPhOuztCAxMOu2hCDqsbDrpqzsl5AgPHN0cm9uZz7sp4DtlZjssqAgJyArIGxpbmVObyArICfqsJwg64W47ISgPC9zdHJvbmc+7J20IOyngOuCmOuKlCA8Yj7qtYnsnqXtnogg7ZuM66Wt7ZWcIOyXreyEuOq2jDwvYj4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZU5vID4gMTQpIHtcclxuICAgICAgICAgICAgICAgIHN1bW1hcnkgPSAn6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqDsl63snbQgPHN0cm9uZz7rj4Trs7QgJyArIChtaW4gKyAxKSArICd+JyArIChtaW4gKyAyKSArICfrtoQg6rGw66asPC9zdHJvbmc+7JeQIOyeiOqzoCwg64+E67O0IDEw67aEIOqxsOumrOyXkCA8c3Ryb25nPuyngO2VmOyyoCAnICsgbGluZU5vICsgJ+qwnCDrhbjshKA8L3N0cm9uZz7snbQg7KeA64KY64qUIDxiPu2bjOulre2VnCDsl63shLjqtow8L2I+J1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdvb2RMaW5lLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IDxzdHJvbmc+64+E67O0ICcgKyAobWluICsgMSkgKyAnficgKyAobWluICsgMikgKyAn67aEIOqxsOumrDwvc3Ryb25nPuyXkCDsnojqs6AsIOq0gOq0keyXkCDtjrjrpqztlZwgPHN0cm9uZz4nICsgZ29vZExpbmUgKyAn7Zi47ISgPC9zdHJvbmc+7J20IOyngOuCmOuKlCA8Yj7sl63shLjqtow8L2I+J1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChnb29kTGluZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeSA9ICfqsIDsnqUg6rCA6rmM7Jq0IOyngO2VmOyyoOyXreydtCA8c3Ryb25nPuuPhOuztCAnICsgKG1pbiArIDEpICsgJ34nICsgKG1pbiArIDIpICsgJ+u2hCDqsbDrpqw8L3N0cm9uZz7sl5Ag7J6I6rOgLCDqtIDqtJHsl5Ag7Y6466as7ZWcIDxzdHJvbmc+JyArIGdvb2RMaW5lICsgJ+2YuOyEoDwvc3Ryb25nPuydtCDsp4DrgqgnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG1pbiA8IDcpIHtcclxuICAgICAgICAgICAgaWYgKGxpbmVObyA+IDE5KSB7XHJcbiAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IDxzdHJvbmc+64+E67O0ICcgKyAobWluICsgMikgKyAnficgKyAobWluICsgMykgKyAn67aEIOqxsOumrDwvc3Ryb25nPuuhnCDslb3qsIQg66mA7KeA66eMLCDrj4Trs7QgMTDrtoQg6rGw66as7JeQIDxzdHJvbmc+7KeA7ZWY7LKgICcgKyBsaW5lTm8gKyAn6rCcIOuFuOyEoDwvc3Ryb25nPuydtCDsp4DrgpjripQgPGI+7KKL7J2AIOyXreyEuOq2jDwvYj4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZU5vID4gMTUpIHtcclxuICAgICAgICAgICAgICAgIHN1bW1hcnkgPSAn6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqDsl63snbQgPHN0cm9uZz7rj4Trs7QgJyArIChtaW4gKyAyKSArICd+JyArIChtaW4gKyAzKSArICfrtoQg6rGw66asPC9zdHJvbmc+66GcIOyVveqwhCDrqYDsp4Drp4wsIOuPhOuztCAxMOu2hCDqsbDrpqzsl5AgPHN0cm9uZz7sp4DtlZjssqAgJyArIGxpbmVObyArICfqsJwg64W47ISgPC9zdHJvbmc+7J20IOyngOuCmOuKlCA8Yj7sl63shLjqtow8L2I+J1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdvb2RMaW5lLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IDxzdHJvbmc+64+E67O0ICcgKyAobWluICsgMikgKyAnficgKyAobWluICsgMykgKyAn67aEIOqxsOumrDwvc3Ryb25nPuuhnCDslb3qsIQg66mA7KeA66eMLCDqtIDqtJHsl5Ag7Y6466as7ZWcIDxzdHJvbmc+JyArIGdvb2RMaW5lICsgJ+2YuOyEoDwvc3Ryb25nPuydtCDsp4DrgqgnXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgPSAn6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqDsl63snbQgPHN0cm9uZz7rj4Trs7QgJyArIChtaW4gKyAyKSArICd+JyArIChtaW4gKyAzKSArICfrtoQg6rGw66asPC9zdHJvbmc+66GcIOyVveqwhCDrlqjslrTsoLgg7J6I7Ja0IOuLpOyGjCDrtojtjrjtlaAg7IiYIOyeiOydjCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1bW1hcnkgPSAn6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqDsl63snbQgPHN0cm9uZz7rj4Trs7QgJyArIChtaW4gKyAzKSArICd+JyArIChtaW4gKyA1KSArICfrtoQg6rGw66asPC9zdHJvbmc+66GcIOyhsOq4iCDrlqjslrTsoLgg7J6I7Ja0IOu2iO2OuO2VoCDsiJgg7J6I7J2MJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN1bW1hcnk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRyYW5zcG9ydDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvc2NvcmUvdHJhbnNwb3J0LmpzIiwidmFyIFNhZmV0eSA9IHtcclxuICAgIGFyZWE6IHt9LFxyXG4gICAgbG9jYWw6IHt9LFxyXG4gICAgc3BvdDoge30sXHJcbiAgICBcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIHZhciBjaXR5TmFtZSA9ICQoXCIuY2l0eU5hbWVcIikuaHRtbCgpO1xyXG4gICAgICAgIHZhciBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKCdpZCcpO1xyXG4gICAgICAgIHZhciBvcmRlckFycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5hcmVhID0gZGF0YS5hcmVhO1xyXG4gICAgICAgIGlmKGRhdGEubG9jYWwpe1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsID0gZGF0YS5sb2NhbDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuICfsp4Dsl60g642w7J207YSw6rCAIOyXhuyWtCDsuZjslYgg6rOE7IKw7J2EIO2VoCDsiJgg7JeG7Iq164uI64ukLidcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBhdG1EaXN0YW5jZSA9IHRoaXMucHJlcHJvY2Vzcy5hdG07XHJcbiAgICAgICAgLy90b3AxNSwgdG9wMzDsnLzroZwg7J2066Oo7Ja07KeEIOqwneyytC4gMzDrsojsp7ggYXRt7J20IOqwgOq5jOydtCDsnojripQg7Iic7Jy866GcIOyDgeychCAxNSUsIDMwJeuFgOyEneydtCDslrzrp4jrgpgg6rCA6rmM7Jq07KeAXHJcblxyXG5cclxuICAgICAgICBcclxuICAgICAgICAvL+yngOyXrSDrgrQgYXRt65Ok7J20IOyWvOuniOuCmCDrqrDroKTsnojripTsp4AsIO2OuOydmOygkOuTpOydtCDslrzrp4jrgpgg6rCA6rmM7J20IOyeiOuKlOyngCDrk7Eg7Y+J6reg7LmY65Ok7J2EIOqzhOyCsFxyXG4gICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgdmFyIHNjb3JlQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIGRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc2FmZV90eHQgPSBbXTtcclxuICAgICAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgc3VtbWFyeSA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBzY29yZSA9IHtcclxuICAgICAgICAgICAgICAgIGdlbmVyYWw6MCwgICAgICAgLy/sp4Dsl63snZgg7J2867CY7KCB7J24IOy5mOyViCDsiJjspIBcclxuICAgICAgICAgICAgICAgIGZsb2F0aW5nOntcclxuICAgICAgICAgICAgICAgICAgICBhdG06MCwgICAgICAgLy/so7zrs4Dsl5AgQVRN7J20IOuLpOuluCDqs7Mg64yA67mEIO2Kuey2nOuCmOqyjCDrp47slYQg7Jyg64+Z7J246rWs6rCAIOunjuydgCDqs7PsnbTrnbzripQg7LaU7KCV7J20IOuQoCDsoJXrj4RcclxuICAgICAgICAgICAgICAgICAgICBzcG90OjAsICAgICAgLy/so7zrs4Dsl5Ag7Jyg66qFIOq0gOq0keuqheyGjOqwgCDqsIDquYzsnbQg7J6I64qU7KeAKDA67JeG7J2MLCAxOuyeiOydjCwgMjrsl6zrn6zqsJwpXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeTowLCAgIC8v7Iud66OM7ZKI7KCQIOuYkOuKlCDtjrjsnZjsoJDsnbQg7KO867OA7JeQIOyWvOuniOuCmCDrp47snYDsp4AgLT4g64uk66W47KeA7JetIOuMgOu5hCDtmZXsi6Ttnogg66eO7JWE7JW8IOumsOyglVxyXG4gICAgICAgICAgICAgICAgICAgIGFyZWE6IGZhbHNlIC8v64m07JqV7J2YIO2DgOyehOyKpO2AmOyWtCDsnbzrjIAsIOyYpOyCrOy5tOydmCDrj4TthqTrs7Trpqwg67aA6re87LKY65+8IOycoOuPmeyduOq1rOqwgCDrs4Trgpjqsowg66eO7J2AIO2KueyglSBhcmVh7JeQIOyGje2VmOuKlOyngCDsl6zrtoBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtZXRybzowLCAgICAgICAgLy/sp4DtlZjssqDsl60o7KeA7ZWY7LKg7Iic7JyEIO2VmOychCAzMCUg7KCc7Jm4KeydtCDslrzrp4jrgpgg6rCA6rmM7Jq07KeA66GcIOqysOygleuQmOuKlCDslYjsoITrj4RcclxuICAgICAgICAgICAgICAgIG1haW5TdHJlZXQ6IGZhbHNlICAgLy/tmZXsl7DtlZwg64yA66Gc67OA7JeQIOychOy5mO2WiOuKlOyngCDsl6zrtoBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/sp4Dsl63snZgg7J2867CY7KCB7J24IOy5mOyViCDsiJjspIDsnYQg6rOE7IKw7ZWY6rOgIOyEpOuqhe2VqFxyXG4gICAgICAgICAgICBzY29yZS5nZW5lcmFsID0gdGhpcy5nZW5lcmFsLnNjb3JlKHRoaXMuYXJlYVtob3RlbC5hcmVhXS5zYWZldHkpO1xyXG4gICAgICAgICAgICB0eHQgPSB0aGlzLmdlbmVyYWwudHh0KGhvdGVsLmFyZWEpO1xyXG4gICAgICAgICAgICBzYWZlX3R4dC5wdXNoKHR4dCk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy/snKDrj5nsnbjqtazsl5Ag65Sw66W4IOy5mOyViCDsiJjspIDsnYQg6rOE7IKw7ZWY6rOgIOyEpOuqhe2VqFxyXG4gICAgICAgICAgICBzY29yZS5mbG9hdGluZyA9IHRoaXMuZmxvYXRpbmcuc2NvcmUoaG90ZWwpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBhdG0zMHRoID0gaG90ZWwubG9jYWwuYXRtWzI5XS5sb2NhdGlvbi5zY29yZTsgLy8odmlzYSBhdG3ssL7quLAg64+E6rWs64qUIO2YuO2FlOyXkCDsp4HsoJEgYXRt7J2EIOuVjOugpOuwleydjCkgMzDrsojsp7ggYXRt7J20IOuqhyDrp4jsnbwg65ao7Ja07KC47J6I64qU7KeAXHJcblxyXG4gICAgICAgICAgICBpZiAoYXRtMzB0aCA8IDAuMDg0KSB7XHJcbiAgICAgICAgICAgICAgICBzY29yZS5mbG9hdGluZy5hdG0gPSAyXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXRtMzB0aCA8IDAuMTIpIHtcclxuICAgICAgICAgICAgICAgIHNjb3JlLmZsb2F0aW5nLmF0bSA9IDFcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NvcmUgKz0gTWF0aC5tYXgoKDAuMTUgLSBhdG0zMHRoKSwgMCkgKiA1XHJcblxyXG4gICAgICAgICAgICBob3RlbC5zcG90ID0ge1xyXG4gICAgICAgICAgICAgICAgd2Fsa2FibGU6IFtdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaG90ZWwubG9jYWwuc3BvdCA9IFtdO1xyXG4gICAgICAgICAgICBob3RlbC5sb2NhbC5ncm9jZXJ5ID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEuc3BvdHMucmFua2VkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BvdCA9IGRhdGEuc3BvdHMucmFua2VkW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzcG90LmVudGVyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3BvdC5lbnRlcmFuY2UubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihob3RlbC5jb29yLCBzcG90LmVudGVyYW5jZVtqXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZiA8IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuc3BvdC53YWxrYWJsZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5rOiBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZDogc3BvdC5zaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3JlLmZsb2F0aW5nLnNwb3QgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUuZmxvYXRpbmcuc3BvdCA9IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZiA8IDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuc3BvdC5wdXNoKHNwb3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUuZmxvYXRpbmcuc3BvdCA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihob3RlbC5jb29yLCBzcG90LmNvb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZiA8IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5zcG90LndhbGthYmxlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuazogaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZDogc3BvdC5zaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZiA8IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3JlLmZsb2F0aW5nLnNwb3QgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZS5mbG9hdGluZy5zcG90ID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9ICgyNTAgLSBkaWYpIC8gMjAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWYgPCAxNTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLnNwb3QucHVzaChzcG90KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUuZmxvYXRpbmcuc3BvdCA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBob3RlbC5sb2NhbC5ncm9jZXJ5ID0gW11cclxuXHJcbiAgICAgICAgICAgIGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRybyA9IHtcclxuICAgICAgICAgICAgICAgIGRpc3RhbmNlOiAxMDAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgbGluZSBpbiBob3RlbC5tZXRyb0luZm8pIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXRybyA9IGhvdGVsLm1ldHJvSW5mb1tsaW5lXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWV0cm8uZGlzdGFuY2UgPCBob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8uZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8gPSBtZXRybztcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8ubGluZSA9IGxpbmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sb2NhbC5sb2NhbC5ncm9jZXJ5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3JvY2VyeSA9IGRhdGEubG9jYWwubG9jYWwuZ3JvY2VyeVtpXTtcclxuICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoaG90ZWwuY29vciwgZ3JvY2VyeSlcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMTEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuZ3JvY2VyeS5wdXNoKGRpZik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNjb3JlICs9IE1hdGgubWluKChob3RlbC5sb2NhbC5ncm9jZXJ5Lmxlbmd0aCAvIDYpLCAwLjcpXHJcblxyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwuZ3JvY2VyeS5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgICAgICAgICBzY29yZS5mbG9hdGluZy5ncm9jZXJ5ID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChob3RlbC5sb2NhbC5ncm9jZXJ5Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHNjb3JlLmZsb2F0aW5nLmdyb2NlcnkgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGFyZWFTY29yZSA9IE1hdGgucm91bmQoKGFyZWFTYWZldHkuc2NvcmUgKiAxICsgKGFyZWFTYWZldHkubWlzZGVtZWFub3IgLyAzKSAqIDEpICogMTApIC8gMTBcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgbG9jYWxUeHQgPSAnJztcclxuICAgICAgICAgICAgdmFyIGxvY2FsR29vZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNjb3JlLmZsb2F0aW5nLmFyZWEpIHtcclxuICAgICAgICAgICAgICAgIGxvY2FsVHh0ICs9ICfrp6jtlbTtirwg7ZWc67O17YyQ7JeQIOychOy5mO2VtCDsnKDrj5nsnbjqtazqsIAg66ek7JqwIOunjidcclxuICAgICAgICAgICAgICAgIHN1bW1hcnkgKz0gJ+ycoOuPmeyduOq1rOqwgCDrp6TsmrAg66eO7J2AIOunqO2VtO2KvCDtlZzrs7XtjJDsl5Ag7JyE7LmY7ZWY6rOgLCDsp4DtlZjssqDrj4Qg6rCA6rmM7JuMIDxzdHJvbmc+67CkIOuKpuqyjOq5jOyngCDslYjsoITtlZjsp4Drp4wg7IaM66ek7LmY6riwIOuTsSDqsr3rspTso4Tsl5DripQg7KGw7Ius7ZW07JW8IO2VqDwvc3Ryb25nPidcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5zcG90Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZmxvYXRpbmcuZ3JvY2VyeSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3JlLmZsb2F0aW5nLmF0bSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsVHh0ICs9ICfso7zrs4Ag7IOB7JeF7Iuc7ISkLCDtjrjsnZjsi5zshKTsnbQg7J6YIOqwluy2lOyWtOyguCDsnojqs6AsICcgKyBob3RlbC5sb2NhbC5zcG90WzBdLm5hbWUua28gKyAnIOuTsSDsnKDrqoUg6rSA6rSR7KeA6rCAIOqwgOq5jOybjCA8c3Ryb25nPuycoOuPmeyduOq1rOqwgCDrp6TsmrAg66eO7J2MLjwvc3Ryb25nPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsR29vZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFR4dCArPSAn7KO867OAIO2OuOydmOyLnOyEpOydtCDsnpgg6rCW7LaU7Ja07KC4IOyeiOqzoCwgJyArIGhvdGVsLmxvY2FsLnNwb3RbMF0ubmFtZS5rbyArICcg65OxIOycoOuqhSDqtIDqtJHsp4DqsIAg6rCA6rmM7JuMIDxzdHJvbmc+7Jyg64+Z7J246rWsIOunjuydjC48L3N0cm9uZz4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbEdvb2QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3JlLmZsb2F0aW5nLmF0bSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsVHh0ICs9ICfso7zrs4Ag7IOB7JeF7Iuc7ISk7J20IOyemCDqsJbstpTslrTsoLgg7J6I6rOgLCAnICsgaG90ZWwubG9jYWwuc3BvdFswXS5uYW1lLmtvICsgJyDrk7Eg7Jyg66qFIOq0gOq0keyngOqwgCDqsIDquYzsm4wgPHN0cm9uZz7snKDrj5nsnbjqtawg66eO7J2MLjwvc3Ryb25nPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsR29vZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFR4dCArPSBob3RlbC5sb2NhbC5zcG90WzBdLm5hbWUua28gKyAnIOuTsSDsnKDrqoUg6rSA6rSR7KeA6rCAIOqwgOq5jOybjCA8c3Ryb25nPuycoOuPmeyduOq1rOqwgCDrp47snYwuPC9zdHJvbmc+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxHb29kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3JlLmZsb2F0aW5nLmdyb2NlcnkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY29yZS5mbG9hdGluZy5hdG0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFR4dCArPSAn7KO867OAIOyDgeyXheyLnOyEpCwg7Y647J2Y7Iuc7ISk7J20IOyemCDqsJbstpTslrTsoLgg7J6I7Ja0IDxzdHJvbmc+7Jyg64+Z7J246rWs6rCAIOunjuydjC48L3N0cm9uZz4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbEdvb2QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY29yZS5mbG9hdGluZy5hdG0gPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFyZWFTY29yZSA+IDcuNSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzY29yZS5mbG9hdGluZy5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeSArPSAn7KCE67CY7KCB7Jy866GcIOy5mOyViOydtCDsoovsnYAgPGI+JyArIGFyZWFOYW1lICsgJzwvYj7sp4Dsl63sl5Ag7JyE7LmY7ZWY6rOgIOyeiCdcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxHb29kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzY29yZS5mbG9hdGluZy5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8uZGlzdGFuY2UgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgKz0gJ+ycvOupsCwg7KO867OAIDxzdHJvbmc+7Jyg64+Z7J246rWs6rCAIOunjuqzoCDsp4DtlZjssqDsnbQg6rCA6rmM7JuMIOuwpCDriqbqsozquYzsp4Drj4Qg66ek7JqwIOyViOyghDwvc3Ryb25nPu2VqC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ICs9ICfsnLzrqbAsIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg66eO7JWEIDxzdHJvbmc+7KeA7JetIOuCtOyXkOyEnOuPhCDrjZQg7JWI7KCEPC9zdHJvbmc+7ZWcIO2OuC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFR4dCArPSAn7KeA7JetIOuCtCDri6Trpbgg7IiZ7IaM65Ok7JeQIOu5hO2VtCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOyVhOyjvCDrp47sp4DripQg7JWK7J2AIO2OuC4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2NvcmUuZmxvYXRpbmcuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwubmVhcmVzdE1ldHJvLmRpc3RhbmNlIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ICs9ICfsnLzrqbAsIOyngO2VmOyyoOydtCDqsIDquYzsm4wgPHN0cm9uZz7rsKQg64qm6rKMIOq3gOqwgO2VoCDrlYzrj4Qg7JWI7KCEPC9zdHJvbmc+7ZWcIO2OuC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ICs9ICfsp4Drp4wgPHN0cm9uZz7rhIjrrLQg67CkIOuKpuqyjCDrj4zslYTri6Tri4jripQg6rKD7J2AIOyCvOqwgOuKlCDqsoM8L3N0cm9uZz7snbQg7KKL7J2MLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmVhU2NvcmUgPiA2LjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNjb3JlLmZsb2F0aW5nLmFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ICs9ICfsuZjslYjsnbQg7KKL7J2AIO2OuOyduCA8Yj4nICsgYXJlYU5hbWUgKyAnPC9iPuyngOyXreyXkCDsnITsuZjtlZjqs6Ag7J6IJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsb2NhbEdvb2QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzY29yZS5mbG9hdGluZy5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8uZGlzdGFuY2UgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgKz0gJ+ycvOupsCwg7KO867OAIOycoOuPmeyduOq1rOqwgCDrp47qs6Ag7KeA7ZWY7LKg7J20IOqwgOq5jOybjCA8c3Ryb25nPuuwpCDriqbqsozquYzsp4Drj4Qg7JWI7KCEPC9zdHJvbmc+7ZWcIO2OuC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ICs9ICfsnLzrqbAsIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg66eO7JWEIDxzdHJvbmc+7KeA7JetIOuCtOyXkOyEnOuPhCDslYjsoIQ8L3N0cm9uZz7tlZwg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsVHh0ICs9ICfsp4Dsl60g64K0IOuLpOuluCDsiJnshozrk6Tsl5Ag67mE7ZW0IOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg7JWE7KO8IOunjuyngOuKlCDslYrsnYAg7Y64LidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzY29yZS5mbG9hdGluZy5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8uZGlzdGFuY2UgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgKz0gJ+ycvOupsCwg7KeA7ZWY7LKg7J20IOqwgOq5jOybjCA8c3Ryb25nPuuwpCDriqbqsowg6reA6rCA7ZWgIOuVjOuPhCDslYjsoIQ8L3N0cm9uZz7tlZwg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgKz0gJ+yngOunjCDrhIjrrLQgPHN0cm9uZz7rsKQg64qm6rKMIOuPjOyVhOuLpOuLiOuKlCDqsoPsnYAg7IK86rCA64qUIOqygzwvc3Ryb25nPuydtCDsoovsnYwuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmVhU2NvcmUgPiA2KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNjb3JlLmZsb2F0aW5nLmFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ICs9ICfsnbzrsJjsoIHsnbgg7LmY7JWIIOyImOykgOydmCA8Yj4nICsgYXJlYU5hbWUgKyAnPC9iPiDsp4Dsl63sl5Ag7JyE7LmY7ZWY6rOgIOyeiCdcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxHb29kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzY29yZS5mbG9hdGluZy5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8uZGlzdGFuY2UgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgKz0gJ+ycvOupsCwg7KO867OAIOycoOuPmeyduOq1rOqwgCDrp47qs6Ag7KeA7ZWY7LKg7J20IOqwgOq5jOybjCA8c3Ryb25nPuuwpCDriqbqsowg6reA6rCA7ZWgIOuVjOuPhCDslYjsoIQ8L3N0cm9uZz7tlZwg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgKz0gJ+ycvOupsCwg7KO867OAIOycoOuPmeyduOq1rOqwgCDrp47slYQgPHN0cm9uZz7slYjsoITtlZwg7Y647J207KeA66eMIOuEiOustCDrsKQg64qm6rKMIOq3gOqwgO2VmOuKlCDqsoPsnYAg7IK86rCAPC9zdHJvbmc+64qUIOqyg+ydtCDsoovsnYwuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxUeHQgKz0gJ+yngOyXrSDrgrQg64uk66W4IOyImeyGjOuTpOyXkCDruYTtlbQg7KO867OAIOycoOuPmeyduOq1rOqwgCDrp47sp4DripQg7JWK7J2AIO2OuOyXkCDsho3tlaguJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNjb3JlLmZsb2F0aW5nLmFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRyby5kaXN0YW5jZSA8IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeSArPSAn7Jy866mwLCA8c3Ryb25nPuyngO2VmOyyoOydtCDqsIDquZ3sp4Drp4wg64SI66y0IOuwpCDriqbqsowg6reA6rCA7ZWY64qUIOqyg+ydgCDsgrzqsIA8L3N0cm9uZz7ripQg6rKD7J20IOyii+ydjC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ICs9ICfsnLzrqbAsIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg7JWE7KO8IOunjuydgCDtjrjsnYAg7JWE64uI66+A66GcIDxzdHJvbmc+67CkIOuKpuqyjCDrj4zslYTri6Tri4jsp4Ag7JWK64qUPC9zdHJvbmc+IOqyg+ydtCDsoovsnYwuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzY29yZS5mbG9hdGluZy5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeSArPSAn7KCE67CY7KCB7Jy866GcIOy5mOyViOydtCDsoovsp4Ag7JWK7J2AIO2OuOyduCA8Yj4nICsgYXJlYU5hbWUgKyAnPC9iPiDsp4Dsl63sl5Ag7JyE7LmY7ZWY6rOgIOyeiCdcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxHb29kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzY29yZS5mbG9hdGluZy5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8uZGlzdGFuY2UgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgKz0gJ+ycvOupsCwg7Jyg64+Z7J246rWs6rCAIOunjuqzoCDsp4DtlZjssqDsnbQg6rCA6rmM7JuMIDxzdHJvbmc+7KeA7JetIOuCtOyXkOyEnOuKlCDslYjsoITtlZwg7Y647J207KeA66eMIOuKpuydgCDsi5zqsIQg6reA6rCA64qUIOyCvOqwgOuKlCDqsoM8L3N0cm9uZz7snbQg7KKL7J2MLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgKz0gJ+ycvOupsCwg7KO867OAIOycoOuPmeyduOq1rOqwgCDrp47snYAg7Y647J207KeA66eMIDxzdHJvbmc+64qm7J2AIOyLnOqwhOyXkCDqt4DqsIDtlZjsp4Ag7JWK64qUIOqygzwvc3Ryb25nPuydtCDsoovsnYwuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFR4dCArPSAn7KO867OA7JeQIOunjuydgCDsi5zshKTsnbQg7J6I6rGw64KYIOycoOuqhe2VnCDqtIDqtJHsp4DqsIAg7J6I7KeAIOyViuyVhCDsnKDrj5nsnbjqtazqsIAg7KeA7JetIOuCtOyXkOyEnOuPhCDrp47sp4Ag7JWK7J2AIO2OuC4nXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzY29yZS5mbG9hdGluZy5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8uZGlzdGFuY2UgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgKz0gJ+ycvOupsCwg7KeA7ZWY7LKg7J20IOqwgOq5neyngOunjCDsnKDrj5nsnbjqtazqsIAg66eO7KeAIOyViuydgCDtjrjsnbTrr4DroZwgPHN0cm9uZz7slYjsoITsl5Ag7Jyg7J2Y7ZW07JW8IO2VqDwvc3Ryb25nPi4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ICs9ICfsnLzrqbAsIOycoOuPmeyduOq1rOqwgCDrp47sp4Ag7JWK7JWEIDxzdHJvbmc+7JWI7KCE7JeQIOycoOydmO2VtOyVvCDtlag8L3N0cm9uZz4uJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzYWZlX3R4dC5wdXNoKGxvY2FsVHh0KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXQgPSBob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm87XHJcbiAgICAgICAgICAgIHZhciBtZXREaXMgPSBtZXQuZGlzdGFuY2U7XHJcbiAgICAgICAgICAgIHZhciBtZXRUeHQgPSAn6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqAg7Jet7J2AIDxiPicgKyBtZXQubGluZSArICftmLjshKAgJyArIG1ldC5uYW1lICsgJ+yXrTwvYj7snLzroZwsIOuPhOuztOuhnCDslb0gPHN0cm9uZz4nICsgKE1hdGguZmxvb3IobWV0RGlzIC8gNzUpICsgMSkgKyAn67aEPC9zdHJvbmc+IOqxsOumrOyXkCDsnognO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1ldERpcyA8IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgbWV0VHh0ICs9ICfslrQgPHN0cm9uZz7riqbsnYAg67Ck7JeQIOq3gOqwgO2VmOq4sCDsoovsnYw8L3N0cm9uZz4uJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldERpcyA8IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgbWV0VHh0ICs9ICfsnYwuJ1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWV0VHh0ICs9ICfslrQgPHN0cm9uZz7rhIjrrLQg64qm7J2AIOuwpOyXkOuKlCDsp4DtlZjssqDroZwg6reA6rCA7ZWY6riwIOu2gOuLtDwvc3Ryb25nPuyKpOufrOyauCDsiJgg7J6I7J2MJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbWV0U2NvcmUgPSBNYXRoLm1heChNYXRoLnJvdW5kKCgzMDAgLSBtZXREaXMpIC8gMzAwKSwgMCk7XHJcblxyXG4gICAgICAgICAgICBzY29yZSArPSBtZXRTY29yZVxyXG5cclxuICAgICAgICAgICAgaWYgKHNjb3JlID4gOS4yKSB7XHJcbiAgICAgICAgICAgICAgICBzY29yZSA9IDkuMiArIChzY29yZSAtIDkuMikgLyA0XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNjb3JlID0gTWF0aC5taW4oTWF0aC5yb3VuZChzY29yZSAqIDcuOTIgKyAyMikgLyAxMCwgOS45KTtcclxuXHJcbiAgICAgICAgICAgIHNhZmVfdHh0LnB1c2gobWV0VHh0KTtcclxuXHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2FmZXR5ID0ge1xyXG4gICAgICAgICAgICAgICAgc2NvcmU6IHNjb3JlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaChzY29yZSlcclxuXHJcbiAgICAgICAgICAgIGlmIChzY29yZSA+IDkuNCkge1xyXG4gICAgICAgICAgICAgICAgc2FmZV90eHQucHVzaCgn7KCE67CY7KCB7Jy866GcICcgKyBjaXR5TmFtZSArICcg7IiZ7IaM65OkIOykkeyXkOyEnOuPhCA8c3Ryb25nPuy5mOyViOycvOuhnOuKlCDstZzsg4HsnITqtow8L3N0cm9uZz7sl5Ag7IaN7ZW0IOyXrO2WieydhCDsppDquLDquLAg7KKL7J2MLicpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NvcmUgPiA5KSB7XHJcbiAgICAgICAgICAgICAgICBzYWZlX3R4dC5wdXNoKCcnICsgY2l0eU5hbWUgKyAnIOyImeyGjOuTpCDspJHsl5DshJzrj4Qg7KCE67CY7KCB7Jy866GcIDxzdHJvbmc+7IOB64u57Z6IIOyii+ydgCDsuZjslYg8L3N0cm9uZz7snYQg7J6Q656R7ZWoLicpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NvcmUgPiA4LjUpIHtcclxuICAgICAgICAgICAgICAgIHNhZmVfdHh0LnB1c2goJzxzdHJvbmc+7KCE67CY7KCB7Jy866GcIOyjvOuzgCDsuZjslYjsnbQg7JWI7KCVPC9zdHJvbmc+65CY7Ja0IOyXrO2Wie2VmOq4sOyXkCDsoovsnYwuJylcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzY29yZSA+IDcuOSkge1xyXG4gICAgICAgICAgICAgICAgc2FmZV90eHQucHVzaCgn67CkIOuKpuqyjCDrj4zslYTri6Tri4jsp4Ag7JWK6rOgIDxzdHJvbmc+7KGw7Ius7ZWc64uk66m0IOyghOuwmOyggeycvOuhnCDsl6ztlontlZjquLDsl5Ag7JWI7KCEPC9zdHJvbmc+7ZWcIO2OuC4nKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNjb3JlID4gNy4zKSB7XHJcbiAgICAgICAgICAgICAgICBzYWZlX3R4dC5wdXNoKCfsoITrsJjsoIHsnLzroZwgPHN0cm9uZz4nICsgY2l0eU5hbWUgKyAnIO2Pieq3oCDsoJXrj4TsnZgg7LmY7JWIIOyImOykgDwvc3Ryb25nPuydhCDrs7TsnbTrqbAsIOyhsOyLrO2eiCDri6Tri5Ag7ZWE7JqU64qUIOyeiOydjC4nKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNjb3JlID4gNi45KSB7XHJcbiAgICAgICAgICAgICAgICBzYWZlX3R4dC5wdXNoKCfsuZjslYjsnbQg7JWE7KO8IOuCmOyBmOyngOuKlCDslYrsp4Drp4wgPHN0cm9uZz7sobDsi6ztnogg64uk64uI64qUIOqyg+ydtCDsoovsnYw8L3N0cm9uZz4uJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNhZmVfdHh0LnB1c2goJ+y5mOyViOydtCDsoovsnYAg7Y647J2AIOyVhOuLiOuvgOuhnCA8c3Ryb25nPuyViOyghO2VnCDsiJnshozrpbwg7JuQ7ZWc64uk66m0IOyii+ydgCDshKDtg53snYAg7JWE64uYLjwvc3Ryb25nPicpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4uc2FmZXR5ID0gc2FmZV90eHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoaG90ZWwuc3VtbWFyeSkge1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuc3VtbWFyeS5zYWZldHkgPSBzdW1tYXJ5O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuc3VtbWFyeSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzYWZldHk6IHN1bW1hcnlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNjb3JlQXJyYXkuc29ydCgpO1xyXG5cclxuICAgICAgICBkYXRhLnN0YXR1cy5ob3RlbHMuc2FmZXR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK3RoaXMuY2l0eSkudXBkYXRlKGRhdGEpXHJcbiAgICB9LFxyXG5cclxuICAgIGdlbmVyYWw6IHtcclxuICAgICAgICBzY29yZTogZnVuY3Rpb24oc2FmZXR5KXtcclxuICAgICAgICAgICAgdmFyIHNjb3JlID0gKHNhZmV0eS5zY29yZSowLjggKyBzYWZldHkubWlzZGVtZWFub3IqMC4yICsgOSkvNDsgLy8yLjV+NCDsgqzsnbTsnZgg6rCS7J2EIOqwgOynkFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHh0OiBmdW5jdGlvbihpZHgpe1xyXG5cclxuICAgICAgICAgICAgdmFyIHNjb3JlV29yZCA9IFtcIlwiLCBcIuunpOyasCDrgpjruaAg7KGw7Ius7ZW07JW8IO2VqC5cIiwgXCLsoovsp4Ag7JWK7J2AIO2OuC5cIiwgXCLsoovsp4Ag7JWK7J2AIO2OuC5cIiwgXCLrgpjsgZjsp4Ag7JWK7J2AIO2OuC5cIiwgXCLsoovsnYAg7Y64LlwiLCBcIuunpOyasCDsoovsnYAg7Y64LlwiLCBcIuunpOyasCDsoovsnYAg7Y64LlwiXTtcclxuICAgICAgICAgICAgLy/snbzrsJjsuZjslYjqs7wg6rK967KU7KOE7LmY7JWI7J20IOu5hOyKt+2VnCDqsr3smrAg7JqUIOybjOuUqVxyXG5cclxuICAgICAgICAgICAgLy/snbzrsJjsuZjslYjsnYAg7KKL7J2A642wIOqyveuylOyjhOy5mOyViOydgCDrgpjsgZwg6rK97JqwIOyVhOuemCDsm4zrlKnsnYQgJ2J1dCcg7KCR7IaN7IKs66GcIOyXsOqysO2VtCDsgqzsmqlcclxuICAgICAgICAgICAgdmFyIHNjb3JlV29yZF9jb25uZWN0ID0gW1wiXCIsIFwi66ek7JqwIOuCmOyBmFwiLCBcIuyii+yngCDslYrsnLxcIiwgXCLsoovsp4Ag7JWK7J2AIO2OuOydtFwiLCBcIuuCmOyBmOyngCDslYrsnYAg7Y647J20XCIsIFwi7KKL7J2AIO2OuOydtFwiLCBcIuunpOyasCDsoovsnYAg7Y647J20XCIsIFwi66ek7JqwIOyii+ycvFwiXTtcclxuICAgICAgICAgICAgdmFyIG1pc2RlbWVhbm9yV29yZCA9IFtcIlwiLCBcIuyGjOunpOy5mOq4sCDrk7Eg6rK967KU7KOE7JeQ64qUIOyjvOydmO2VtOyVvCDtlaguXCIsIFwi7IaM66ek7LmY6riwIOuTsSDqsr3rspTso4Tsl5DripQg7KO87J2Y7ZW07JW8IO2VqC5cIiwgXCLqsr3rspTso4Tsl5DripQg7KO87J2Y7ZW07JW8IO2VqC5cIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl1cclxuXHJcbiAgICAgICAgICAgIHZhciBzYWZldHkgPSB0aGlzLmFyZWFbaWR4XS5zYWZldHk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHh0ID0gdGhpcy5hcmVhW2lkeF0ubmFtZSArICcg7KeA7Jet7JeQIOychOy5mO2VnCDsiJnshozroZwsIOyngOyXreydmCDsoITrsJjsoIHsnbgg7LmY7JWI7J2AICc7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2FmZXR5LnNjb3JlID4gNCAmJiBzYWZldHkubWlzZGVtZWFub3IgPCA0KSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gc2NvcmVXb3JkX2Nvbm5lY3Rbc2FmZXR5LnNjb3JlXSArICfsp4Drp4wgJyArIG1pc2RlbWVhbm9yV29yZFtzYWZldHkubWlzZGVtZWFub3JdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9IHNjb3JlV29yZFtzYWZldHkuc2NvcmVdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0eHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBwcmVwcm9jZXNzOiB7XHJcbiAgICAgICAgYXRtOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGF0bUFycmF5ID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdG0gPSBkYXRhLmhvdGVsc1toaWRdLmxvY2FsLmF0bVsyOV0ubG9jYXRpb24uc2NvcmU7XHJcbiAgICAgICAgICAgICAgICBhdG1BcnJheS5wdXNoKGF0bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXRtQXJyYXkuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvcDE1ID0gTWF0aC5mbG9vcihhdG1BcnJheS5sZW5ndGgqMC4xNSk7XHJcbiAgICAgICAgICAgIHZhciB0b3AzMCA9IE1hdGguZmxvb3IoYXRtQXJyYXkubGVuZ3RoKjAuMyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXRtRGlzdGFuY2UgPSB7XHJcbiAgICAgICAgICAgICAgICB0b3AxNTogYXRtQXJyYXlbdG9wMTVdLFxyXG4gICAgICAgICAgICAgICAgdG9wMzA6IGF0bUFycmF5W3RvcDMwXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmbG9hdGluZzoge1xyXG4gICAgICAgIHNjb3JlOiBmdW5jdGlvbihob3RlbCl7XHJcbiAgICAgICAgICAgIHZhciBmbG9hdGluZyA9IHtcclxuICAgICAgICAgICAgICAgIGFyZWE6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYXRtOiAwLFxyXG4gICAgICAgICAgICAgICAgc3BvdDogMCxcclxuICAgICAgICAgICAgICAgIGdyb2Nlcnk6IDBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g7Jyg64+Z7J246rWs6rCAIOuzhOuCmOqyjCDrp47snYAg7Yq57KCVIGFyZWHsl5Ag7IaN7ZWY64qUIOyXrOu2gFxyXG4gICAgICAgICAgICAvL1RPRE86IGxvY2FsIC0+IGFyZWHsl5Ag7J246rWs67CA64+E6rCAIOuGkuydgCBhcmVhIOuwsOyXtOuhnCDrhKPslrTrhpPquLAgW+uJtOyaleydmCDqsr3smrAgNiwgNywgOCwgMTAgYXJlYV1cclxuICAgICAgICAgICAgaWYodGhpcy5sb2NhbC5hcmVhKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubG9jYWwuYXJlYS5pbmNsdWRlcyhob3RlbC5hcmVhKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmcuYXJlYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHh0OiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNhZmV0eTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvc2NvcmUvc2FmZXR5LmpzIiwibGV0IEFyZWEgPSB7XHJcbiAgICBkYXRhOnt9LFxyXG4gICAgY2l0eTpcIlwiLFxyXG4gICAgY2l0eU5hbWU6XCJcIixcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgJChcIi5hcmVhX19wYWdlXCIpLm9uKFwiY2hhbmdlXCIsIFwiLmFyZWFfX2xpbmUgaW5wdXRcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5zY29yZUNoYW5nZSgkKHRoaXMpKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEsIGNpZCwgbmFtZSl7XHJcbiAgICAgICAgJChcIi5jaXR5TmFtZVwiKS5odG1sKG5hbWUpLmF0dHIoXCJpZFwiLCBjaWQpO1xyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5jaXR5X19wYWdlcyBcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmFyZWFcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2l0eSA9IGNpZDtcclxuICAgICAgICB0aGlzLmNpdHlOYW1lID0gbmFtZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5pbmZsYXRlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNjb3JlQ2hhbmdlOiBmdW5jdGlvbihkaXYpe1xyXG5cclxuICAgICAgICBpZihpc05hTihkaXYudmFsKCkqMSkpe1xyXG4gICAgICAgICAgICB0b2FzdChcIuyIq+yekOuhnOunjCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgIGRpdi52YWwoMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGRpdi52YWwoKT4xMHx8ZGl2LnZhbCgpPDEpe1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCIxfjEwIOyCrOydtOydmCDsiKvsnpDrpbwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgZGl2LnZhbCgwKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihkaXYuaGFzQ2xhc3MoXCJpbnB1dF9fc2NvcmVcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZHggPSAkKFwiLmlucHV0X19zY29yZVwiKS5pbmRleChkaXYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi52YWwoZGl2LnZhbCgpKjEpXHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QodGhpcy5kYXRhLmFyZWFbaWR4XS5uYW1lK1wi7J2YIOy5mOyViOygkOyImOqwgCBcIitkaXYudmFsKCkqMStcIuygkOycvOuhnCDrs4Dqsr3rkJjsl4jsirXri4jri6QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK3RoaXMuY2l0eStcIi9hcmVhL1wiK2lkeCtcIi9zYWZldHkvc2NvcmVcIikuc2V0KGRpdi52YWwoKSlcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGRpdi5oYXNDbGFzcyhcImlucHV0X19taXNkZW1lYW5vclwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkeCA9ICQoXCIuaW5wdXRfX21pc2RlbWVhbm9yXCIpLmluZGV4KGRpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LnZhbChkaXYudmFsKCkqMSlcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdCh0aGlzLmRhdGEuYXJlYVtpZHhdLm5hbWUrXCLsnZgg6rK967KU7KOEIOygkOyImOqwgCBcIitkaXYudmFsKCkqMStcIuygkOycvOuhnCDrs4Dqsr3rkJjsl4jsirXri4jri6QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK3RoaXMuY2l0eStcIi9hcmVhL1wiK2lkeCtcIi9zYWZldHkvbWlzZGVtZWFub3JcIikuc2V0KGRpdi52YWwoKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcbiAgICAgICAgbGV0IGFyZWFkYXRhID0ge31cclxuXHJcbiAgICAgICAgaWYodGhpcy5kYXRhLmFyZWEpe1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YS5hcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJlYSA9IHRoaXMuZGF0YS5hcmVhW2ldO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJlYSlcclxuICAgICAgICAgICAgICAgIGlmKCFhcmVhLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v67iM66Gc65Oc7Juo7J20LCDshLztirjrn7TtjIztgawg65OxIOuEk+ydgCDsp4Dsl63snYQg7LCo7KeA7ZWY64qUIOq0gOq0keyngOuPhCBhcmVhIOy3qOq4ie2VmOq4sCDrlYzrrLjsl5Ag6rG465+s64K06riwXHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImFyZWFfX2RpdlwiPidcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwiYXJlYV9fbGluZVwiPidcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICAgICAnPHAgY2xhc3M9XCJhcmVhX19uYW1lXCI+JythcmVhLm5hbWUrJzwvcD4nXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihhcmVhLnNhZmV0eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXJlYV9fbGluZV9fc3ViVGl0bGVcIj7suZjslYjsoJDsiJg8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVhLnNhZmV0eS5zY29yZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8aW5wdXQgY2xhc3M9XCJhcmVhX19saW5lX19pbnB1dC0tc2hvcnQgaW5wdXRfX3Njb3JlXCIgdmFsdWU9XCInK2FyZWEuc2FmZXR5LnNjb3JlKydcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPGlucHV0IGNsYXNzPVwiYXJlYV9fbGluZV9faW5wdXQtLXNob3J0IGlucHV0X19zY29yZVwiIHZhbHVlPVwiMFwiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhcmVhX19saW5lX19zdWJUaXRsZVwiPuqyveuylOyjhOygkOyImDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZWEuc2FmZXR5Lm1pc2RlbWVhbm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxpbnB1dCBjbGFzcz1cImFyZWFfX2xpbmVfX2lucHV0LS1zaG9ydCBpbnB1dF9fbWlzZGVtZWFub3JcIiB2YWx1ZT1cIicrYXJlYS5zYWZldHkubWlzZGVtZWFub3IrJ1wiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8aW5wdXQgY2xhc3M9XCJhcmVhX19saW5lX19pbnB1dC0tc2hvcnQgaW5wdXRfX21pc2RlbWVhbm9yXCIgdmFsdWU9XCIwXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXJlYV9fbGluZV9fc3ViVGl0bGVcIj7suZjslYjsoJDsiJg8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8aW5wdXQgY2xhc3M9XCJhcmVhX19saW5lX19pbnB1dC0tc2hvcnQgaW5wdXRfX3Njb3JlXCIgdmFsdWU9XCIwXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImFyZWFfX2xpbmVfX3N1YlRpdGxlXCI+6rK967KU7KOE7KCQ7IiYPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPGlucHV0IGNsYXNzPVwiYXJlYV9fbGluZV9faW5wdXQtLXNob3J0IGlucHV0X19taXNkZW1lYW5vclwiIHZhbHVlPVwiMFwiPidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIuYXJlYV9fcGFnZVwiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcmVhO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvYXJlYS5qcyIsImltcG9ydCBTcG90X1N0YXR1cyBmcm9tIFwiLi9zcG90L3N0YXR1cy5qc1wiXHJcbmltcG9ydCBGaXJzdF9jaGVjayBmcm9tIFwiLi9zcG90L2ZpcnN0X2NoZWNrLmpzXCI7XHJcblxyXG52YXIgU3BvdCA9IHtcclxuICAgIGNpdGllczoge30sXHJcbiAgICBjdXJyZW50OlwiXCIsIC8v7ZiE7J6sIOuztOqzoOyeiOuKlCDrj4Tsi5wgY2lkIC0gZmlyZWJhc2UgcmVm7JeQIG9mZiDri6zquLDsnITtlbRcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodV9pKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKVxyXG4gICAgICAgICAgICB0aGlzLmNpdGllcyA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgICBTcG90X1N0YXR1cy5vcmRlciA9IHVfaS5zZXR0aW5nLnNwb3Qub3JkZXI7XHJcblxyXG4gICAgICAgICAgICBTcG90X1N0YXR1cy5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgU3BvdF9TdGF0dXMuaW5mbGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIFNwb3RfU3RhdHVzLmluaXQodV9pKTtcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuYWN0aXZlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHRoYXQuY2l0aWVzW2NpZF0uc3RhdHVzLnNwb3Q7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIHN0YXR1cylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5yZXR1cm5cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBTcG90X1N0YXR1cy5pbmZsYXRlKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEZpcnN0X2NoZWNrLnNldFJlbWFpbk51bWJlcigkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fcmVtYWluTnVtYmVyXCIpLnZhbCgpKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fbm9kYXRhXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNpZCA9ICQodGhpcykuYXR0cignc2lkJyk7XHJcbiAgICAgICAgICAgIEZpcnN0X2NoZWNrLnNpdGVOb2RhdGEoc2lkKTtcclxuICAgICAgICAgICAgdG9hc3QoJ+uNsOydtO2EsCDqs7XrsLEg7LKY66asJylcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX2NpdHk6IGZ1bmN0aW9uIChjaWQsIHN0YXR1cyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coY2lkKTtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIHRoYXQuY3VycmVudCkub2ZmKFwidmFsdWVcIik7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCkub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50ID0gY2lkO1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNpdHlOYW1lID0gdGhhdC5jaXRpZXNbY2lkXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gMCkgeyAgIC8v7ZiE7J6sIOygleuztOyImOynkeyDge2DnCDqsoDspp1cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmhlYWRlclwiKS5odG1sKCc8aDI+JyArIGNpdHlOYW1lICsgJyDsoJXrs7TqsoDspp08L2gyPicpLmF0dHIoJ2NpZCcsIGNpZCkuYWRkQ2xhc3MoXCJjaXR5TmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBGaXJzdF9jaGVjay5pbml0KGRhdGEuc3BvdHMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IDEpIHsgLy/tlansuZjquLDsnpHsl4VcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAgLy8y7LCo6rKA7Kad7ZmU66m06rO8IOyZhOujjO2ZlOuptOydgCDrlLDroZwg7LCo7J206rCAIOyXhuydjFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgn7JWE66y065+wIOuNsOydtO2EsOqwgCDsl4bsirXri4jri6QuIOuNsOydtO2EsCDsiJjsp5HsnYQg66i87KCAIOynhO2Wie2VtOyjvOyEuOyalC4nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BvdDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL3Nwb3QuanMiLCJ2YXIgU3BvdF9TdGF0dXMgPSB7XHJcblxyXG4gICAgb3JkZXI6IFwiXCIsXHJcbiAgICB1c2VyOiBcIlwiLFxyXG4gICAgZGF0YTp7fSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XHJcblxyXG4gICAgICAgIHZhciB0eHQgPSAnJ1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPidcclxuICAgICAgICB0eHQgKz0gICAgICAnPGgyPuq0gOq0keyngCDrjbDsnbTthLAg7KCV66asIO2YhO2ZqTwvaDI+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJvcmRlclwiIGlkPVwiYWJjXCI+6rCA64KY64uk7IicPC9wPidcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJvcmRlclwiIGlkPVwiY2hhbmdlZFwiPuyImOygleyLnOqwhOyInDwvcD4nXHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cIndyYXBwZXJcIj4nXHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxkaXYgY2xhc3M9XCJsaW5lciBsaW5lci0taGVhZGVyXCI+J1xyXG4gICAgICAgIHR4dCArPSAgICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX2NpdHlOYW1lXCI+64+E7Iuc66qFPC9wPidcclxuICAgICAgICB0eHQgKz0gICAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj7sg4Htg5w8L3A+J1xyXG4gICAgICAgIHR4dCArPSAgICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX2NoYXJnZVwiPuuLtOuLueyekDwvcD4nXHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzwvZGl2PidcclxuXHJcbiAgICAgICAgdmFyIG9yZGVyQXJyYXkgPSBbXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG5cclxuICAgICAgICBmb3IgKHZhciBjaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgY2l0eSA9IGRhdGFbY2lkXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyID09PSBcImFiY1wiKSB7XHJcbiAgICAgICAgICAgICAgICBvcmRlckFycmF5LnB1c2goeyBjaWQ6IGNpZCwgaWR4OiBjaXR5Lm5hbWUgfSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9yZGVyID09PSBcImNoYW5nZWRcIikge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJBcnJheS5wdXNoKHsgY2lkOiBjaWQsIGlkeDogY2l0eS5vcmRlci5jaGFuZ2VkIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9yZGVyQXJyYXkgPSB0aGlzLm9yZGVyTGlzdChvcmRlckFycmF5KTtcclxuICAgICAgICB2YXIgc3RhdHVzQXJyYXkgPSBbXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7smYTro4w8L3NwYW4+PC9wPidcclxuICAgICAgICBdXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3JkZXJBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2lkID0gb3JkZXJBcnJheVtpXS5jaWQ7XHJcbiAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG5cclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwibGluZXJcIiBpZD1cIicrY2lkKydcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fY2l0eU5hbWVcIj4nICsgY2l0eS5uYW1lICsgJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gICAgICBzdGF0dXNBcnJheVtjaXR5LnN0YXR1cy5zcG90XTtcclxuICAgICAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwibGluZXJfX2NoYXJnZVwiPuuLtOuLueyekDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JzsvL3dyYXBwZXIg64ur6riwXHJcblxyXG4gICAgICAgICQoXCIucGFnZXMuc3BvdFwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgJChcIiNcIit0aGlzLm9yZGVyKS5hZGRDbGFzcyhcIm9yZGVyLS1zZWxlY3RlZFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKHVfaSwgZGF0YSl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLm9yZGVyXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQub3JkZXIgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICAgICAgdmFyIHVpZCA9IHRoYXQudXNlci5tYWlsO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigndXNlcnMvJyt1aWQrXCIvc2V0dGluZy9zcG90L29yZGVyXCIpLnNldCh0aGF0Lm9yZGVyKTtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgb3JkZXJMaXN0OiBmdW5jdGlvbiAob3JkZXJBcnJheSkge1xyXG4gICAgICAgIG9yZGVyQXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuaWR4ID4gYi5pZHggPyAxIDogYS5pZHggPCBiLmlkeCA/IC0xIDogMFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBvcmRlckFycmF5O1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BvdF9TdGF0dXM7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zcG90L3N0YXR1cy5qcyIsInZhciBGaXJzdF9DaGVjayA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aGlzLmluZmxhdGUoZGF0YSlcclxuICAgIH0sXHJcblxyXG4gICAgc2l0ZU5vZGF0YTogZnVuY3Rpb24gKHNpZCkge1xyXG4gICAgICAgIHZhciBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNpdHkpO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2lkICsgXCIvbm9kYXRhXCIpLnNldCh0cnVlKVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRSZW1haW5OdW1iZXI6IGZ1bmN0aW9uIChzaXRlLCBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgY3V0Tm8gPSBudW1iZXIudHJpbSgpICogMTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXHJcblxyXG4gICAgICAgIGlmIChjdXRObyA8IDEwMCkge1xyXG4gICAgICAgICAgICB0b2FzdChcIjEwMOqwnCDsnbTsg4HsnZgg7J6l7IaM66W8IOycoOyngO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShcIuyInOychCBcIiArIGN1dE5vICsgXCLsnIQg66+466eMIOyepeyGjOulvCDrqqjrkZAg7KCc6rGw7ZWp64uI64ukLiDrp57sirXri4jquYw/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3V0T2JqID0gdGhpcy5kYXRhLnNwb3RzW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgY3V0T2JqLmxlbmd0aCA9IGN1dE5vO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSkuc2V0KGN1dE9iaik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICQoXCIuaGVhZGVyXCIpLmFwcGVuZCgnPHAgY2xhc3M9XCJyZXR1cm5cIj7rj4zslYTqsIDquLA8L3A+JylcclxuXHJcbiAgICAgICAgbGV0IGhhc1Byb2JsZW0gPSBmYWxzZTtcclxuICAgICAgICBsZXQgdHh0ID0gJydcclxuICAgICAgICBsZXQgc2VhcmNoVXJsID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jby5rci9tYXBzL3BsYWNlLycgKyAkKFwiLmNpdHlOYW1lXCIpLmh0bWwoKSArIFwiK1wiO1xyXG5cclxuICAgICAgICBsZXQgc2l0ZU9iaiA9IHtcclxuICAgICAgICAgICAgZ2c6IFwi6rWs6riAXCIsXHJcbiAgICAgICAgICAgIG52OiBcIuuEpOydtOuyhFwiLFxyXG4gICAgICAgICAgICB0YTogXCLtirjrpr3slrTrk5zrsJTsnbTsoIBcIixcclxuICAgICAgICAgICAgbHA6IFwi66Gg66as7ZSM656Y64ubXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiBzaXRlT2JqKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2l0ZUhhc1Byb2JsZW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yVHh0ID0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+7KKM7ZGc6rCAIOyeheugpeuQmOyngCDslYrsnYAg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICBsZXQgbm9TcG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3RUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7ruYTslrTsnojripQg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSwIO2ZleyduDwvcD4nXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGFbc2l0ZV0ubm9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcG90ID0gZGF0YVtzaXRlXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYXNDb29yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ydvOu2gOufrCDsgq3soJztlZwg6rSA6rSR7KeAIC0+IOuEmOyWtOqwhOuLpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5jb29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmNvb3IubG5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oc3BvdC5jb29yLmxuZyAqIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5jb29yLmxhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHNwb3QuY29vci5sYXQgKiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzQ29vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJyArIHNpdGUgKyAnXycgKyBpICsgJ1wiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8YSBjbGFzcz1cImNoZWNrX19zcG90TmFtZVwiIGhyZWY9XCInICsgc2VhcmNoVXJsICsgc3BvdC5uYW1lICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBzcG90Lm5hbWUgKyAnPC9hPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fc3BvdENvb3JcIiBwbGFjZWhvbGRlcj1cInh4Lnh4eHh4LCB4eC54eHh4eCDtmJXtg5wg7J6F66ClXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2NvbmZpcm1cIj7sooztkZwg7J6F66ClPC9wPjxwIGNsYXNzPVwiY2hlY2tfX3Nwb3REZWxldGVcIj7snqXshowg7IKt7KCcPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdfJyArIGkgKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90VHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX190eHRcIj4nICsgaSArICcg67KIIOq0gOq0keyngDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3Nwb3REZWxldGVcIj7snqXshowg7IKt7KCcPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9Db29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSBub0Nvb3JUeHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub1Nwb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vU3BvdFR4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdLmxlbmd0aCA+IDE1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFyZ2VPSyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxhcmdlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGFyZ2VEYXRhW3NpdGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8xNTDqsJwg7J207IOB7J2YIOuNsOydtO2EsOulvCDrs7TsnKDtlZjroKTrqbQg64+E7Iuc66qFL3Nwb3RzL2xhcmdlRGF0YS/sgqzsnbTtirjrqoXsnbQgdHJ1ZeudvOqzoCDrtoDsl6zrkJjslrTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXJnZU9LKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg7J6l7IaMIOuNsOydtO2EsOqwgCAxNTDqsJzrpbwg7LSI6rO8KCcgKyBkYXRhW3NpdGVdLmxlbmd0aCArICfqsJwp7ZWp64uI64ukLjwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJyArIHNpdGUgKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fcmVtYWluTnVtYmVyXCIgdmFsdWU9XCInICsgZGF0YVtzaXRlXS5sZW5ndGggKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19yZW1haW5MYXJnZURhdGFcIj7qsJzsnZgg7J6l7IaMIOycoOyngO2VmOq4sDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSw6rCAIOyhtOyerO2VmOyngCDslYrsirXri4jri6QuPC9wPidcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGUgY2hlY2tfX25vZGF0YVwiIHNpZD1cIicgKyBzaXRlICsgJ1wiPuuNsOydtO2EsOqwgCDsm5Drnpgg7JeG7J2EIOqyveyasCDtgbTrpq3tlbTso7zshLjsmqU8L3A+J1xyXG4gICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzog7JuQ656YIOyCrOydtO2KuCDrjbDsnbTthLDqsIAg7KG07J6s7ZWY7KeAIOyViuuKlCDqsr3smrDrpbwg64yA67mE7ZWcIOuyhO2KvOydhCDrp4zrk6Tqs6Agc2l0ZSDqsJLsnLzroZwgbm9kYXRhOiB0cnVl66W8IOuEo+yWtOykgOuLpC5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNpdGVIYXNQcm9ibGVtKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+67Cc6rKs65CcIOusuOygnOqwgCDsl4bsirXri4jri6Q8L3A+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzUHJvYmxlbSkge1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2ZpbmlzaFwiPuqygOyCrOulvCDrqqjrkZAg66eI7LOk7Iq164uI64ukPC9wPidcclxuICAgICAgICAgICAgJChcIi5zcG90IC53cmFwcGVyXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0b2FzdChcIuuwnOqyrOuQnCDrrLjsoJzqsIAg7JeG7Ja0IOuNsOydtO2EsCDrs5HtlansnYQg7Iuk7Iuc7ZWp64uI64ukLlwiKVxyXG4gICAgICAgICAgICAvLyB0aGlzLmF1dG9Db21iaW5lX19zcG90UmVzdHJ1Y3R1cmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIud3JhcFwiKS5zY3JvbGxUb3AoMClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlyc3RfQ2hlY2s7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zcG90L2ZpcnN0X2NoZWNrLmpzIiwibGV0IFN1YndheSA9IHtcclxuICAgIG1hcDp7fSxcclxuICAgIG1hcmtlcjpmYWxzZSxcclxuICAgIG1ldHJvOltdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieWxvXCIpXHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL255Yy9tZXRyb1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQubWV0cm8gPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJ3YXlNYXAnKSwge1xyXG4gICAgICAgICAgICAgICAgY2VudGVyOiB7IGxhdDogNDAuNzQ4NDQsIGxuZzogLTczLjk4NTY2IH0sXHJcbiAgICAgICAgICAgICAgICB6b29tOiAxMyxcclxuICAgICAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNjYWxlQ29udHJvbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW5Db250cm9sOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWFwLmFkZExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kU3Vid2F5KGUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGZpbmRTdWJ3YXk6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGxldCBjb29yID0ge1xyXG4gICAgICAgICAgICBsYXQ6ZS5sYXRMbmcubGF0KCksXHJcbiAgICAgICAgICAgIGxuZzplLmxhdExuZy5sbmcoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5tYXJrZXIpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtlci5zZXRNYXAobnVsbClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBlLmxhdExuZyxcclxuICAgICAgICAgICAgbWFwOiB0aGlzLm1hcFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdHh0ID0gJydcclxuICAgICAgICBsZXQgbWV0cm9JbmZvID0ge31cclxuICAgICAgICBsZXQgbWV0cm9CeVN0biA9IHt9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ3MzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRyb05hbWUgPSB0aGlzLm1ldHJvW2ldLm5hbWU7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGlmID0gTWF0aC5yb3VuZChjYWxjdWxhdGVEaWYoY29vcix0aGlzLm1ldHJvW2ldLmNvb3IpKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGRpZjw3MDApe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLm1ldHJvW2ldLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IHRoaXMubWV0cm9baV0ubGluZVtrXS5zbGljZSgwLDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihtZXRyb0luZm9bbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkaWY8bWV0cm9JbmZvW2xpbmVdLmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0luZm9bbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbWV0cm9OYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0cm9JbmZvW2xpbmVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyb05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihtZXRyb0J5U3RuW21ldHJvTmFtZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldHJvQnlTdG5bbWV0cm9OYW1lXS5saW5lID0gbWV0cm9CeVN0blttZXRyb05hbWVdLmxpbmUuY29uY2F0KHRoaXMubWV0cm9baV0ubGluZSlcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldHJvQnlTdG5bbWV0cm9OYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMubWV0cm9baV0ubGluZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1ldEFycmF5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgbGluZSBpbiBtZXRyb0luZm8pIHtcclxuICAgICAgICAgICAgbWV0QXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBsaW5lOmxpbmUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOm1ldHJvSW5mb1tsaW5lXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgZGlmOm1ldHJvSW5mb1tsaW5lXS5kaWZcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWV0U3RuQXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBuYW1lIGluIG1ldHJvQnlTdG4pIHtcclxuICAgICAgICAgICAgbWV0U3RuQXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBsaW5lOm1ldHJvQnlTdG5bbmFtZV0ubGluZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6bmFtZSxcclxuICAgICAgICAgICAgICAgIGRpZjptZXRyb0J5U3RuW25hbWVdLmRpZlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldEFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmRpZiA+IGIuZGlmID8gMSA6IGEuZGlmIDwgYi5kaWYgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBtZXRTdG5BcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5kaWYgPiBiLmRpZiA/IDEgOiBhLmRpZiA8IGIuZGlmID8gLTEgOiAwO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHR4dCs9JzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX190aXRsZVwiPuyXreuzhDwvcD4nXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fZGl2XCI+J1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0U3RuQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fbGluZVwiPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19zdG5OYW1lXCI+JysgbWV0U3RuQXJyYXlbaV0ubmFtZSArICfsl608L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX2RpZlwiPicrIE1hdGguY2VpbChtZXRTdG5BcnJheVtpXS5kaWYvODApICsgJ+u2hCDqsbDrpqw8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fbGluZUxpbmVcIj4nXHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbWV0U3RuQXJyYXlbaV0ubGluZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgaWYobWV0U3RuQXJyYXlbaV0ubGluZVtrXS5sZW5ndGggPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fbGluZU5hbWUgbG5fJyttZXRTdG5BcnJheVtpXS5saW5lW2tdKydcIj4nK21ldFN0bkFycmF5W2ldLmxpbmVba10gKyAnPC9wPidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQrPSAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3RpdGxlXCI+64W47ISg67OEPC9wPidcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19kaXZcIj4nXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fbGluZU5hbWUgbG5fJyttZXRBcnJheVtpXS5saW5lKydcIj4nK21ldEFycmF5W2ldLmxpbmUgKyAnPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpZlwiPicrIE1hdGguY2VpbChtZXRBcnJheVtpXS5kaWYvODApICsgJ+u2hCDqsbDrpqw8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fc3RuTmFtZVwiPicrIG1ldEFycmF5W2ldLm5hbWUgKyAn7JetPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG4gICAgICAgICQoXCIuc3Vid2F5X19pbmZvXCIpLmh0bWwodHh0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3Vid2F5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL3N1YndheS5qcyIsImxldCBBY2NvdW50ID0ge1xyXG4gICAgdXNlcjoge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICB0eHQgKz0nPGRpdiBpZD1cImFjY291bnRDYWxlbmRhclwiIGNsYXNzPVwiYWNjb3VudF9fY2FsZW5kYXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLmFjY291bnRcIikuaHRtbCh0eHQpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHVpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZih1aWQgIT09IGlkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJbdWlkXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YVt1aWRdLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJyNhY2NvdW50Q2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF5Q2xpY2s6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbmZsYXRlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2FjY291bnQuanMiXSwic291cmNlUm9vdCI6IiJ9