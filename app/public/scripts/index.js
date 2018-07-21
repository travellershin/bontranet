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
                        // Attend.init(u_i.mail, u_i.name, u_i.grade);
                        _city2.default.init(u_i.mail, u_i.name, u_i.grade);
                        if (u_i.grade === 5) {
                            // Account.init(user.mail);

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
        var that = this;
        this.listener();

        // firebase.database().ref().once("value", snap =>{
        //     $(".loadingView").addClass("displayNone")
        //     let codeData = snap.val().setting.cities;
        //     let data = snap.val().cities
        //     this.cityData = data;
        //     this.codeData = codeData;
        //     this.inflate_cityCodeView(codeData, data)
        //     console.log(data)
        // })
        console.log('init');
        firebase.database().ref('cities/nyc').once("value", function (snap) {
            var data = snap.val();
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

        if (status.facility) {
            $("#status_facility").html("정보가 존재합니다.");
        } else {
            this.score_facility();
        }
        if (status.costEff) {}
    },

    score_facility: function score_facility() {
        var data = this.data;

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

    score_safety: function score_safety() {
        var city = this.city;
        var orderArray = [];

        var scoreWord_connect = ["매우 나쁘", "매우 나쁘", "좋지 않으", "좋지 않은 편이", "나쁘지 않은 편이", "좋은 편이", "매우 좋은 편이", "매우 좋으"];
        var scoreWord = ["매우 나빠 조심해야 함.", "매우 나빠 조심해야 함.", "좋지 않은 편.", "좋지 않은 편.", "나쁘지 않은 편.", "좋은 편.", "매우 좋은 편.", "매우 좋은 편."];
        var misdemeanorWord = ["소매치기 등 경범죄에는 주의해야 함.", "소매치기 등 경범죄에는 주의해야 함.", "소매치기 등 경범죄에는 주의해야 함.", "경범죄에는 주의해야 함.", "", "", "", ""];

        var scoreArray = [];

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];

            var shortTxt = '';

            var safe_txt = [];
            var score = 0;

            var areaName = this.data.area[hotel.area].name;
            var areaSafety = this.data.area[hotel.area].safety;

            score += areaSafety.score * 1 + areaSafety.misdemeanor / 3 * 1;

            var txt = areaName + ' 지역에 위치한 숙소로, 지역의 전반적인 치안은 ';

            if (areaSafety.score > 4 && areaSafety.misdemeanor < 4) {
                txt += scoreWord_connect[areaSafety.score] + '지만 ' + misdemeanorWord[areaSafety.misdemeanor];
            } else {
                txt += scoreWord[areaSafety.score];
            }

            safe_txt.push(txt);

            var safety_local = { //유동인구에 따른 치안
                atm: 0, //0:별로 1:보통 2:좋음
                spot: 0,
                grocery: 0,
                area: false
            };

            if (hotel.area > 5 && hotel.area < 9) {
                safety_local.area = true;
            } else if (hotel.area === 10) {
                safety_local.area = true;
            }

            var atm30th = hotel.local.atm[29].location.score; //30번째 atm이 몇 마일 떨어져있는지

            if (atm30th < 0.084) {
                safety_local.atm = 2;
            } else if (atm30th < 0.12) {
                safety_local.atm = 1;
            }

            score += Math.max(0.15 - atm30th, 0) * 5;

            hotel.spot = {
                walkable: []
            };
            hotel.local.spot = [];
            hotel.local.grocery = [];

            for (var i = 0; i < this.data.spots.ranked.length; i++) {
                var spot = this.data.spots.ranked[i];

                if (spot.enterance) {
                    for (var j = 0; j < spot.enterance.length; j++) {
                        var dif = calculateDif(hotel.coor, spot.enterance[j]);
                        if (dif < 500) {
                            hotel.spot.walkable.push({
                                rank: i,
                                sid: spot.sid
                            });
                            if (dif < 200) {
                                if (safety_local.spot === 0) {
                                    safety_local.spot = 1;
                                }
                            }

                            if (dif < 80) {
                                hotel.local.spot.push(spot);
                                safety_local.spot = 2;
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
                            if (safety_local.spot === 0) {
                                safety_local.spot = 1;
                            }

                            score += (250 - dif) / 200;
                        }

                        if (dif < 150) {
                            hotel.local.spot.push(spot);
                            safety_local.spot = 2;
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

            for (var i = 0; i < this.data.local.local.grocery.length; i++) {
                var grocery = this.data.local.local.grocery[i];
                var dif = calculateDif(hotel.coor, grocery);

                if (dif < 110) {
                    hotel.local.grocery.push(dif);
                }
            }

            score += Math.min(hotel.local.grocery.length / 6, 0.7);

            if (hotel.local.grocery.length > 3) {
                safety_local.grocery = 2;
            } else if (hotel.local.grocery.length > 1) {
                safety_local.grocery = 1;
            }

            var areaScore = Math.round((areaSafety.score * 1 + areaSafety.misdemeanor / 3 * 1) * 10) / 10;

            var localTxt = '';
            var localGood = false;

            if (safety_local.area) {
                localTxt += '맨해튼 한복판에 위치해 유동인구가 매우 많';
                shortTxt += '유동인구가 매우 많은 맨해튼 한복판에 위치하고, 지하철도 가까워 <strong>밤 늦게까지 안전하지만 소매치기 등 경범죄에는 조심해야 함</strong>';
            } else {
                if (hotel.local.spot.length > 0) {
                    if (safety_local.grocery > 0) {
                        if (safety_local.atm > 0) {
                            localTxt += '주변 상업시설, 편의시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구가 매우 많음.</strong>';
                            localGood = true;
                        } else {
                            localTxt += '주변 편의시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구 많음.</strong>';
                            localGood = true;
                        }
                    } else {
                        if (safety_local.atm > 0) {
                            localTxt += '주변 상업시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구 많음.</strong>';
                            localGood = true;
                        } else {
                            localTxt += hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 <strong>유동인구가 많음.</strong>';
                            localGood = true;
                        }
                    }
                } else {
                    if (safety_local.grocery > 0) {
                        if (safety_local.atm > 0) {
                            localTxt += '주변 상업시설, 편의시설이 잘 갖추어져 있어 <strong>유동인구가 많음.</strong>';
                            localGood = true;
                        } else {}
                    } else {
                        if (safety_local.atm > 0) {} else {}
                    }
                }
            }

            if (areaScore > 7.5) {
                if (!safety_local.area) {
                    shortTxt += '전반적으로 치안이 좋은 <b>' + areaName + '</b>지역에 위치하고 있';
                }

                if (localGood) {
                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 주변 <strong>유동인구가 많고 지하철이 가까워 밤 늦게까지도 매우 안전</strong>함.';
                        } else {
                            shortTxt += '으며, 주변 유동인구가 많아 <strong>지역 내에서도 더 안전</strong>한 편.';
                        }
                    }
                } else {
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 아주 많지는 않은 편.';

                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 지하철이 가까워 <strong>밤 늦게 귀가할 때도 안전</strong>한 편.';
                        } else {
                            shortTxt += '지만 <strong>너무 밤 늦게 돌아다니는 것은 삼가는 것</strong>이 좋음.';
                        }
                    }
                }
            } else if (areaScore > 6.8) {

                if (!safety_local.area) {
                    shortTxt += '치안이 좋은 편인 <b>' + areaName + '</b>지역에 위치하고 있';
                }

                if (localGood) {

                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 주변 유동인구가 많고 지하철이 가까워 <strong>밤 늦게까지도 안전</strong>한 편.';
                        } else {
                            shortTxt += '으며, 주변 유동인구가 많아 <strong>지역 내에서도 안전</strong>한 편.';
                        }
                    }
                } else {
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 아주 많지는 않은 편.';

                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 지하철이 가까워 <strong>밤 늦게 귀가할 때도 안전</strong>한 편.';
                        } else {
                            shortTxt += '지만 너무 <strong>밤 늦게 돌아다니는 것은 삼가는 것</strong>이 좋음.';
                        }
                    }
                }
            } else if (areaScore > 6) {
                if (!safety_local.area) {
                    shortTxt += '일반적인 치안 수준의 <b>' + areaName + '</b> 지역에 위치하고 있';
                }

                if (localGood) {
                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 주변 유동인구가 많고 지하철이 가까워 <strong>밤 늦게 귀가할 때도 안전</strong>한 편.';
                        } else {
                            shortTxt += '으며, 주변 유동인구가 많아 <strong>안전한 편이지만 너무 밤 늦게 귀가하는 것은 삼가</strong>는 것이 좋음.';
                        }
                    }
                } else {
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 많지는 않은 편에 속함.';

                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, <strong>지하철이 가깝지만 너무 밤 늦게 귀가하는 것은 삼가</strong>는 것이 좋음.';
                        } else {
                            shortTxt += '으며, 주변 유동인구가 아주 많은 편은 아니므로 <strong>밤 늦게 돌아다니지 않는</strong> 것이 좋음.';
                        }
                    }
                }
            } else {
                if (!safety_local.area) {
                    shortTxt += '전반적으로 치안이 좋지 않은 편인 <b>' + areaName + '</b> 지역에 위치하고 있';
                }

                if (localGood) {
                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 유동인구가 많고 지하철이 가까워 <strong>지역 내에서는 안전한 편이지만 늦은 시간 귀가는 삼가는 것</strong>이 좋음.';
                        } else {
                            shortTxt += '으며, 주변 유동인구가 많은 편이지만 <strong>늦은 시간에 귀가하지 않는 것</strong>이 좋음.';
                        }
                    }
                } else {
                    localTxt += '주변에 많은 시설이 있거나 유명한 관광지가 있지 않아 유동인구가 지역 내에서도 많지 않은 편.';
                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 지하철이 가깝지만 유동인구가 많지 않은 편이므로 <strong>안전에 유의해야 함</strong>.';
                        } else {
                            shortTxt += '으며, 유동인구가 많지 않아 <strong>안전에 유의해야 함</strong>.';
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
                safe_txt.push('전반적으로 뉴욕의 숙소들 중에서도 <strong>치안으로는 최상위권</strong>에 속해 여행을 즐기기 좋음.');
            } else if (score > 9) {
                safe_txt.push('뉴욕 숙소들 중에서도 전반적으로 <strong>상당히 좋은 치안</strong>을 자랑함.');
            } else if (score > 8.5) {
                safe_txt.push('<strong>전반적으로 주변 치안이 안정</strong>되어 여행하기에 좋음.');
            } else if (score > 7.9) {
                safe_txt.push('밤 늦게 돌아다니지 않고 <strong>조심한다면 전반적으로 여행하기에 안전</strong>한 편.');
            } else if (score > 7.3) {
                safe_txt.push('전반적으로 <strong>뉴욕 평균 정도의 치안 수준</strong>을 보이며, 조심히 다닐 필요는 있음.');
            } else if (score > 6.9) {
                safe_txt.push('치안이 아주 나쁘지는 않지만 <strong>조심히 다니는 것이 좋음</strong>.');
            } else {
                safe_txt.push('치안이 좋은 편은 아니므로 <strong>안전한 숙소를 원한다면 좋은 선택은 아님.</strong>');
            }

            hotel.explain.safety = safe_txt;

            if (hotel.summary) {
                hotel.summary.safety = shortTxt;
            } else {
                hotel.summary = {
                    safety: shortTxt
                };
            }
        }

        scoreArray.sort();

        this.data.status.hotels.safety = true;

        // firebase.database().ref('cities/'+this.city).update(this.data)
    },

    score_transport: function score_transport() {
        var city = this.city;
        var orderArray = [];

        for (var hid in this.data.hotels) {
            var _hotel = this.data.hotels[hid];

            var transport_txt = [];

            var _score = 0;
            //교통 편의성 점수부여용
            var goodLine = [];
            //좋은 지하철 라인들 Array
            var visitable = [];
            //환승 없이 갈 수 있는 관광지 목록
            var nearest = { distance: 1000, name: "", code: "" };
            //가장 가까운 지하철
            var lineNo = 0;

            var summary = '';

            if (_hotel.metroInfo) {
                lineNo = Object.keys(_hotel.metroInfo).length;
            }
            //10분거리 이내의 지하철  노선 개수


            for (var metLine in _hotel.metroInfo) {

                if (_hotel.metroInfo[metLine].distance < nearest.distance) {
                    nearest = _hotel.metroInfo[metLine];
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

            var min = Math.ceil(nearest.distance / 70);
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

            _hotel.summary.transport = summary;

            for (var metLine in _hotel.metroInfo) {
                var metDistance = _hotel.metroInfo[metLine].distance;
                _score += (10000 - metDistance) * this.data.metroLine[metLine].score;
            }

            orderArray.push({
                score: _score,
                hid: hid
            });

            if (_hotel.explain) {
                _hotel.explain.transport = transport_txt;
            } else {
                _hotel.explain = {
                    transport: transport_txt
                };
            }
        }

        orderArray.sort(function (a, b) {
            return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
        });

        for (var i = 0, len = orderArray.length; i < len; i++) {
            var _hotel2 = this.data.hotels[orderArray[i].hid];
            var _score2 = Math.round((1 - i / len * (i / len)) * 60) / 10 + 4;
            //4.0 ~ 10.0 사이의 점수를 소수점 1자리까지 부여한다.
            //높은 점수가 더 많당

            if (_hotel2.assessment) {
                _hotel2.assessment.transport = {
                    score: _score2
                };
            } else {
                _hotel2.assessment = {
                    transport: {
                        score: _score2
                    }
                };
            }
        }

        $("#status_transport").html("대중교통 정보 발견. 교통 편의성을 계산합니다. - 계산을 완료했습니다.");
        this.data.status.hotels.transport = true;

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
            var coor = new google.maps.LatLng(hotel.coor.lat, hotel.coor.lng);

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

            if (google.maps.geometry.poly.containsLocation(coor, centralNearest)) {
                txt = '센트럴파크와 <strong>도보 단 2~3분 거리</strong>로, 산책을 좋아하는 사람에게 안성맞춤';
                score += 9;

                if (hasSpot) {
                    centralSummary = '센트럴파크와 <strong>도보 단 2~3분거리</strong>로 매우 가까울 뿐만 아니라, 특히 <strong>' + centralNearSpot.explain + '</strong>에서 가까워 센트럴파크를 더 즐기기 좋음';
                } else {
                    centralSummary = txt;
                }
            } else if (google.maps.geometry.poly.containsLocation(coor, centralNear)) {
                score += 8.65;
                txt = '센트럴파크와 <strong>도보 4~5분 거리</strong>로, 산책을 좋아하는 사람에게 안성맞춤';
                if (hasSpot) {
                    centralSummary = '센트럴파크와 <strong>도보 4~5분거리</strong>로 매우 가까울 뿐만 아니라, 특히 <strong>' + centralNearSpot.explain + '</strong>에서 가까워 센트럴파크를 더 즐기기 좋음';
                } else {
                    centralSummary = txt;
                }
            } else if (google.maps.geometry.poly.containsLocation(coor, centralMid)) {
                score += 8.25;
                txt = '센트럴파크에서 <strong>도보 6~7분 거리</strong>로, 산책을 좋아하는 사람에게 좋음';
                if (hasSpot) {
                    centralSummary = '센트럴파크와 도보 6~7분 거리로 가까울 뿐만 아니라, 특히 <strong>' + centralNearSpot.explain + '</strong>에서 가까워 센트럴파크를 더 즐기기 좋음';
                } else {
                    centralSummary = txt;
                }
            } else if (google.maps.geometry.poly.containsLocation(coor, centralFar)) {
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
        }

        broadScoreArray.sort(function (a, b) {
            return b - a;
        });
        console.log(broadScoreArray);

        firebase.database().ref("cities/" + city).update(this.data);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWQ4ZTNiMTAwYzk5ZGQ1YTczZTUiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hdHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9tYW51YWxDb21iaW5lLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9zcG90L3ZlcmlmeWluZy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvaG90ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5L2FyZWEuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zdWJ3YXkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbInVuaW5mbGF0ZWQiLCJhdHRlbmQiLCJjaXR5IiwidV9pIiwibWFpbCIsIm5hbWUiLCJncmFkZSIsIiQiLCJjbGljayIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJpbml0IiwiZG9jdW1lbnQiLCJyZWFkeSIsInByb3ZpZGVyIiwiZmlyZWJhc2UiLCJhdXRoIiwiR29vZ2xlQXV0aFByb3ZpZGVyIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwidXNlciIsInVzZXJNYWlsIiwiZW1haWwiLCJzcGxpdCIsImRhdGFiYXNlIiwicmVmIiwib25jZSIsInVzZXJEYXRhIiwic25hcCIsInZhbCIsInVpZCIsImRpc3BsYXlOYW1lIiwibG9naW4iLCJhbGVydCIsInNpZ25JbldpdGhQb3B1cCIsInRoZW4iLCJyZXN1bHQiLCJjYXRjaCIsImVycm9yIiwiZXJyb3JDb2RlIiwiY29kZSIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjcmVkZW50aWFsIiwiaHRtbCIsImF0dHIiLCJjb25maXJtIiwic2lnbk91dCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiQXR0ZW5kIiwibW9iaWxlIiwiaWQiLCJ2aWV3SUQiLCJhdHRlbmRPYmoiLCJzYWxhcnkiLCJ3ZWVrZGF5cyIsInRoYXQiLCJ1c2VycyIsInR4dCIsIm1haWxJRCIsInByb3AiLCJvbiIsImluZmxhdGVfY2FsZW5kYXIiLCJsZW5ndGgiLCJmdWxsQ2FsZW5kYXIiLCJoZWlnaHQiLCJmaXJzdERheSIsInZpZXdSZW5kZXIiLCJ2aWV3IiwiZWxlbWVudCIsImRheUNsaWNrIiwiZGF0ZSIsImlucHV0V29ya0hvdXIiLCJsaXN0ZW5lciIsImluZmxhdGVfaW5wdXQiLCJzZXRXb3JrSG91ciIsImtleXVwIiwiZSIsIndoaWNoIiwiY2hhbmdlIiwidmlld193b3JrZXIiLCJvZmYiLCJ5byIsImRhdGEiLCJkYXRlSUQiLCJzbGljZSIsImRpZiIsImZyb20iLCJ0byIsImkiLCJNYXRoIiwiZmxvb3IiLCJkdXJNb24iLCJ0aGlzTW9udGgiLCJkYXRlRG9tIiwiZXEiLCJoYXNDbGFzcyIsImoiLCJ3ZWVrRG9tIiwid2Vla0R1ciIsImRheURvbSIsImZpbmQiLCJrIiwiY2hpbGRyZW4iLCJhcHBlbmQiLCJmdWxsTW9udGhCb251cyIsImluc3VyYW5jZUZlZSIsImJhc2ljIiwicm91bmQiLCJmdWxsV2Vla0J1bnVzIiwiY29tbWEiLCJkYXRlT2JqIiwiZGF0ZVNob3J0IiwibW9tZW50IiwiZm9ybWF0IiwiQW55UGlja2VyIiwiZGF0ZVRpbWVGb3JtYXQiLCJmb2N1cyIsIndvcmsiLCJhbGxFbXB0eSIsInJlbW92ZSIsImZyb21BIiwidG9BIiwicHVzaCIsInNldCIsIkNpdHkiLCJjb2RlRGF0YSIsImNpdHlEYXRhIiwiY2lkIiwicGFyZW50IiwibWV0cm9BZGp1c3QiLCJyZXR1cm5Ub0NpdHlWaWV3IiwiaW5mbGF0ZV9jaXR5Q29kZVZpZXciLCJtZXRybyIsIm5hbWVBcnJheSIsImxpbmUiLCJjb25zb2xlIiwibG9nIiwiaG90ZWxzIiwic3BvdHMiLCJzcG90Iiwic3RhdHVzIiwiY29tYmluaW5nIiwiYXJlYSIsInByaWNlIiwiU3BvdCIsImlucHV0Q29vcmRpbmF0ZSIsImRlbGV0ZVNwb3QiLCJzZXRSZW1haW5OdW1iZXIiLCJjb21iaW5lZCIsImZpcnN0Q2hlY2siLCJhdXRvQ29tYmluZV9fc3BvdFJlc3RydWN0dXJlIiwic2l0ZUFyciIsImNvdW50ZXIiLCJzaXRlIiwibm9EYXRhIiwiZGVsZXRlZCIsIm9sZFNwb3QiLCJrbyIsImVuIiwiY29vciIsInJhbmsiLCJ0ZXN0IiwidXJsIiwidGFnIiwiYXV0b0NvbWJpbmVfX2NvbWJpbmUiLCJjb21iaW5lT2JqIiwiY29tYmluZSIsImhhc0NvbWJpbmVkIiwidENvZGUiLCJ0U3BvdCIsImtleSIsImNhbGN1bGF0ZURpZiIsInNpZCIsIm5vIiwidG9hc3QiLCJjb29yVHh0IiwibGF0IiwidHJpbSIsImxuZyIsImlzTmFOIiwibnVtYmVyIiwiY3V0Tm8iLCJjdXRPYmoiLCJoYXNQcm9ibGVtIiwic2VhcmNoVXJsIiwic2l0ZU9iaiIsImdnIiwibnYiLCJ0YSIsImxwIiwic2l0ZUhhc1Byb2JsZW0iLCJub0Nvb3IiLCJub0Nvb3JUeHQiLCJub1Nwb3QiLCJub1Nwb3RUeHQiLCJoYXNDb29yIiwibGFyZ2VPSyIsImxhcmdlRGF0YSIsIk1hbnVhbENvbWJpbmUiLCJtYXAiLCJtYXJrZXIiLCJwcmltZSIsInRhcmdldCIsInJlbWFpbiIsInRvZ2dsZUNsYXNzIiwibmV4dFN0ZXAiLCJtYWluRGF0YSIsInRpZCIsInRhcmdldERhdGEiLCJpbmNsdWRlcyIsInVwZGF0ZSIsIk9iamVjdCIsImtleXMiLCJpbmZsYXRlIiwic2V0VGltZW91dCIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJnZXRFbGVtZW50QnlJZCIsImNlbnRlciIsInpvb20iLCJtYXBUeXBlQ29udHJvbCIsInNjYWxlQ29udHJvbCIsImZ1bGxzY3JlZW5Db250cm9sIiwiYWRkTGlzdGVuZXIiLCJjaG9vc2VDb29yZGluYXRlIiwibGF0TG5nIiwic2V0TWFwIiwiTWFya2VyIiwicG9zaXRpb24iLCJwYW5UbyIsImlkeCIsImxhdGxuZyIsInRNYXJrZXIiLCJsYWJlbCIsInRvU3RyaW5nIiwiVmVyaWZ5IiwiY2hlY2siLCJtZXJnZSIsInJlbW92ZUFsbCIsImRpdiIsImNvbmZpZyIsIm1heFNjb3JlIiwib25lTWludXMiLCJ0d29NdW51cyIsIm52QWRkIiwicmFua0FycmF5IiwibnVtU2l0ZSIsInNjb3JlIiwiYXZnIiwiYmVzdFJhbmsiLCJzb3J0IiwiYSIsImIiLCJzcG90QXJyYXkiLCJyYW5raW5nIiwicmFua2VkIiwiSG90ZWwiLCJjaXR5TmFtZSIsInRyYW5zcG9ydCIsInNhZmV0eSIsImZhY2lsaXR5IiwiY29zdEVmZiIsIm1ldHJvTGluZSIsInNjb3JlX3RyYW5zcG9ydCIsInNjb3JlX3NhZmV0eSIsInNjb3JlX2ZhY2lsaXR5Iiwic2NvcmVBcnJheSIsImhpZCIsImhvdGVsIiwiYXRtIiwibG9jYWwiLCJhc3Nlc3NtZW50IiwiY29udmVuaWVuY2UiLCJsb2NhbFNjb3JlIiwiZ3JvY2VyeVNjb3JlIiwiY2l0aVNjb3JlIiwiYXRtU2NvcmUiLCJleHBsYWluIiwic3VtbWFyeSIsImdyb2NlcnlUeHQiLCJncm9jZXJ5IiwiZ3JvY2VyeTc1IiwiZ3JvY2VyeTE1MCIsImdyb2NlcnkyMjUiLCJncm9jZXJ5MzAwIiwibWF4IiwibmVhcmVzdCIsImdyb2NlcnlUaW1lIiwib3BlbjI0Q2l0aUFycmF5IiwiY2l0aSIsImNpdGlkaWYiLCJvcGVuSG91ciIsImFkZHJlc3MiLCJjaXRpV29yZCIsIm1pbiIsInZpc2EiLCJ2aXNhQXJyYXkiLCJiYW5rQXJyYXkiLCJwbGFjZU5hbWUiLCJ2aXNhTWluIiwidmlzYVdvcmQiLCJncm9jZXJ5VGVtcCIsIm90aGVyIiwib3RhIiwiYWdvZGEiLCJzdGFyIiwicmF0aW5nIiwiZ3JhZGVfYXZnIiwicmV2aWV3cyIsImdyYWRlX25vIiwib3JkZXJBcnJheSIsInNjb3JlV29yZF9jb25uZWN0Iiwic2NvcmVXb3JkIiwibWlzZGVtZWFub3JXb3JkIiwic2hvcnRUeHQiLCJzYWZlX3R4dCIsImFyZWFOYW1lIiwiYXJlYVNhZmV0eSIsIm1pc2RlbWVhbm9yIiwic2FmZXR5X2xvY2FsIiwiYXRtMzB0aCIsIndhbGthYmxlIiwiZW50ZXJhbmNlIiwibmVhcmVzdE1ldHJvIiwiZGlzdGFuY2UiLCJtZXRyb0luZm8iLCJhcmVhU2NvcmUiLCJsb2NhbFR4dCIsImxvY2FsR29vZCIsIm1ldCIsIm1ldERpcyIsIm1ldFR4dCIsIm1ldFNjb3JlIiwidHJhbnNwb3J0X3R4dCIsImdvb2RMaW5lIiwidmlzaXRhYmxlIiwibGluZU5vIiwibWV0TGluZSIsImNlaWwiLCJzcG90Tm8iLCJtZXREaXN0YW5jZSIsImxlbiIsIm11c2ljYWwiLCJ0aGVhdGVyIiwidGhlYXRyZSIsInRpY2tldCIsImNlbnRyYWxOZWFyZXN0UG9seSIsImNlbnRyYWxOZWFyUG9seSIsImNlbnRyYWxNaWRQb2x5IiwiY2VudHJhbEZhclBvbHkiLCJjZW50cmFsTmVhcmVzdCIsIlBvbHlnb24iLCJwYXRocyIsImNlbnRyYWxNaWQiLCJjZW50cmFsTmVhciIsImNlbnRyYWxGYXIiLCJjZW50cmFsU3BvdHMiLCJjZW50cmFsU2NvcmVBcnJheSIsInRoZW1lIiwiYnJvYWR3YXkiLCJsb3dlciIsImNlbnRyYWwiLCJzdW1tYXJ5X3RoZW1lIiwic2NvcmVPYmoiLCJicm9hZFdvcmQiLCJicm9hZCIsImhhc0xpbmUiLCJicm9hZERpZlNjb3JlIiwibGluZU9iaiIsInN1bSIsIm1ldHJvSW5mIiwid2Fsa0RpZiIsIm1ldE5hbWUiLCJob3RlbE1ldE5hbWUiLCJtZXRyb0RpZiIsIndhbGsiLCJicm9hZFNjb3JlQXJyYXkiLCJzYyIsImNlbnRyYWxXb3JkIiwiY2VudHJhbFN1bW1hcnkiLCJMYXRMbmciLCJoYXNTcG90IiwiY2VudHJhbE5lYXJTcG90Iiwic2Vjb25kdHh0Iiwic3BvdENvb3IiLCJnZW9tZXRyeSIsInBvbHkiLCJjb250YWluc0xvY2F0aW9uIiwiQXJlYSIsInNjb3JlQ2hhbmdlIiwiaW5kZXgiLCJhcmVhZGF0YSIsIm5vdEFyZWEiLCJTdWJ3YXkiLCJmaW5kU3Vid2F5IiwibWV0cm9CeVN0biIsIm1ldHJvTmFtZSIsImNvbmNhdCIsIm1ldEFycmF5IiwibWV0U3RuQXJyYXkiLCJBY2NvdW50IiwicHJlcGVuZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxhQUFhO0FBQ2JDLFlBQU8sSUFETTtBQUViQyxVQUFLO0FBRlEsQ0FBakI7O0FBS0EsSUFBSUMsTUFBTTtBQUNOQyxVQUFLLEVBREM7QUFFTkMsVUFBSyxFQUZDO0FBR05DLFdBQU07QUFIQSxDQUFWOztBQU1BQyxFQUFFLGFBQUYsRUFBaUJDLEtBQWpCLENBQXVCLFlBQVU7QUFDN0JELE1BQUUsV0FBRixFQUFlRSxXQUFmLENBQTJCLFlBQTNCO0FBQ0FGLE1BQUUsSUFBRixFQUFRRyxRQUFSLENBQWlCLFlBQWpCO0FBQ0FILE1BQUUsUUFBRixFQUFZRyxRQUFaLENBQXFCLGFBQXJCO0FBQ0FI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V0FBZixDQUEyQixZQUEzQjtBQUNBRixrQkFBRSxJQUFGLEVBQVFHLFFBQVIsQ0FBaUIsWUFBakI7QUFDQUgsa0JBQUUsUUFBRixFQUFZRyxRQUFaLENBQXFCLGFBQXJCO0FBQ0FILGtCQUFFLGdCQUFGLEVBQW9CRSxXQUFwQixDQUFnQyxhQUFoQztBQUNILGFBTEQ7O0FBT0FGLGNBQUUsa0JBQUYsRUFBc0IwRCxZQUF0QixDQUFtQztBQUMvQkMsd0JBQVEsR0FEdUI7QUFFL0JDLDBCQUFVLENBRnFCO0FBRy9CQyw0QkFBYSxvQkFBVUMsSUFBVixFQUFnQkMsT0FBaEIsRUFBeUI7QUFDbENiLHlCQUFLOEosT0FBTDtBQUNILGlCQUw4QjtBQU0vQmhKLDBCQUFVLGtCQUFTQyxJQUFULEVBQWM7QUFDcEJpRSw0QkFBUUMsR0FBUixDQUFZbEUsSUFBWjtBQUNIO0FBUjhCLGFBQW5DOztBQVdBLGtCQUFLK0ksT0FBTDtBQUNILFNBaENEO0FBaUNILEtBdENTOztBQXdDVkEsYUFBUyxtQkFBVSxDQUVsQjs7QUExQ1MsQ0FBZDs7a0JBOENlNEwsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDVkOGUzYjEwMGM5OWRkNWE3M2U1IiwiaW1wb3J0IEF0dGVuZCBmcm9tIFwiLi9tb2R1bGVzL2F0dGVuZC5qc1wiO1xyXG5pbXBvcnQgQ2l0eSBmcm9tIFwiLi9tb2R1bGVzL2NpdHkuanNcIjtcclxuaW1wb3J0IFN1YndheSBmcm9tIFwiLi9tb2R1bGVzL3N1YndheS5qc1wiO1xyXG5pbXBvcnQgQWNjb3VudCBmcm9tIFwiLi9tb2R1bGVzL2FjY291bnQuanNcIjtcclxuXHJcbmxldCB1bmluZmxhdGVkID0ge1xyXG4gICAgYXR0ZW5kOnRydWUsXHJcbiAgICBjaXR5OnRydWVcclxufVxyXG5cclxubGV0IHVfaSA9IHtcclxuICAgIG1haWw6XCJcIixcclxuICAgIG5hbWU6XCJcIixcclxuICAgIGdyYWRlOjBcclxufVxyXG5cclxuJChcIiNuYXZfYXR0ZW5kXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiaGVhZGVyIGxpXCIpLnJlbW92ZUNsYXNzKFwiLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5wYWdlcy5hdHRlbmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgaWYodW5pbmZsYXRlZC5hdHRlbmQpe1xyXG4gICAgICAgIEF0dGVuZC5pbml0KHVfaS5tYWlsLCB1X2kubmFtZSwgdV9pLmdyYWRlKTtcclxuICAgICAgICB1bmluZmxhdGVkLmF0dGVuZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59KVxyXG4kKFwiI25hdl9jaXR5XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiaGVhZGVyIGxpXCIpLnJlbW92ZUNsYXNzKFwiLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5wYWdlcy5jaXR5XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgIGlmKHVuaW5mbGF0ZWQuY2l0eSl7XHJcbiAgICAgICAgQ2l0eS5pbml0KHVfaS5tYWlsLCB1X2kubmFtZSwgdV9pLmdyYWRlKTtcclxuICAgICAgICB1bmluZmxhdGVkLmNpdHkgPSBmYWxzZTtcclxuICAgIH1cclxufSlcclxuJChcIiNuYXZfc3Vid2F5XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiaGVhZGVyIGxpXCIpLnJlbW92ZUNsYXNzKFwiLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5wYWdlcy5zdWJ3YXlcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgU3Vid2F5LmluaXQoKTtcclxufSlcclxuXHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICB2YXIgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24odXNlcikge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgbGV0IHVzZXJNYWlsID0gdXNlci5lbWFpbC5zcGxpdCgnQCcpWzBdXHJcbiAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICBsZXQgdXNlckRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgIGlmKHVzZXJEYXRhW3VzZXJNYWlsXSl7XHJcbiAgICAgICAgICAgICAgICAgIGlmKHVzZXJEYXRhW3VzZXJNYWlsXS51aWQgPSB1c2VyLnVpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICB1X2kubWFpbCA9IHVzZXJNYWlsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdV9pLm5hbWUgPSB1c2VyLmRpc3BsYXlOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdV9pLmdyYWRlID0gdXNlckRhdGFbdXNlck1haWxdLmdyYWRlKjFcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIEF0dGVuZC5pbml0KHVfaS5tYWlsLCB1X2kubmFtZSwgdV9pLmdyYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIENpdHkuaW5pdCh1X2kubWFpbCwgdV9pLm5hbWUsIHVfaS5ncmFkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZih1X2kuZ3JhZGUgPT09IDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFjY291bnQuaW5pdCh1c2VyLm1haWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIHVuaW5mbGF0ZWQuYXR0ZW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICBsb2dpbih1X2kubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIilcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICBhbGVydChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gVXNlciBpcyBzaWduZWQgaW4uXHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIE5vIHVzZXIgaXMgc2lnbmVkIGluLlxyXG4gICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHVzZXIgPSByZXN1bHQudXNlcjtcclxuICAgICAgICAgICAgbGV0IHVzZXJNYWlsID0gdXNlci5lbWFpbC5zcGxpdCgnQCcpWzBdXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJEYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgIGlmKHVzZXJEYXRhW3VzZXJNYWlsXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodXNlckRhdGFbdXNlck1haWxdLnVpZCA9IHVzZXIudWlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdV9pLm1haWwgPSB1c2VyTWFpbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdV9pLm5hbWUgPSB1c2VyLmRpc3BsYXlOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1X2kuZ3JhZGUgPSB1c2VyRGF0YVt1c2VyTWFpbF0uZ3JhZGUqMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdHRlbmQuaW5pdCh1X2kubWFpbCwgdV9pLm5hbWUsIHVfaS5ncmFkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaW5mbGF0ZWQuYXR0ZW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luKHVfaS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgIC8vIEhhbmRsZSBFcnJvcnMgaGVyZS5cclxuICAgICAgICAgIHZhciBlcnJvckNvZGUgPSBlcnJvci5jb2RlO1xyXG4gICAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgICAvLyBUaGUgZW1haWwgb2YgdGhlIHVzZXIncyBhY2NvdW50IHVzZWQuXHJcbiAgICAgICAgICB2YXIgZW1haWwgPSBlcnJvci5lbWFpbDtcclxuICAgICAgICAgIC8vIFRoZSBmaXJlYmFzZS5hdXRoLkF1dGhDcmVkZW50aWFsIHR5cGUgdGhhdCB3YXMgdXNlZC5cclxuICAgICAgICAgIHZhciBjcmVkZW50aWFsID0gZXJyb3IuY3JlZGVudGlhbDtcclxuICAgICAgICAgIC8vIC4uLlxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBsb2dpbihuYW1lKXtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5odG1sKG5hbWVbMV0rXCLtlZghXCIpO1xyXG4gICAgJChcIi5oZWxsb1dvcmxkXCIpLmF0dHIoXCJ0aXRsZVwiLG5hbWUrXCLri5gg7JWI64WV7ZWY7IS47JqUIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGNvbmZpcm0obmFtZStcIuuLmCDroZzqt7jslYTsm4Mg7ZWY7Iuc6rKg7Iq164uI6rmMP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgICAvLyBBbiBlcnJvciBoYXBwZW5lZC5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9pbmRleC5qcyIsInZhciBBdHRlbmQgPSB7XHJcbiAgICBtb2JpbGU6IGZhbHNlLFxyXG5cclxuICAgIGlkOiBcIlwiLFxyXG5cclxuICAgIHZpZXdJRDogXCJcIixcclxuICAgIC8v6rSA66as7J6Q6rCAIOuLpOuluCDsgqzrnozsnZggSUQg7ZmV7J247KSRXHJcblxyXG4gICAgYXR0ZW5kT2JqOiB7fSxcclxuXHJcbiAgICBzYWxhcnk6IHt9LFxyXG5cclxuXHJcbiAgICB3ZWVrZGF5czogW1wi7J28XCIsIFwi7JuUXCIsIFwi7ZmUXCIsIFwi7IiYXCIsIFwi66qpXCIsIFwi6riIXCIsIFwi7YagXCIsIFwi7J28XCJdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGlkLCBuYW1lLCBncmFkZSl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnlcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHRoYXQuc2FsYXJ5ID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGdyYWRlID09PSA1KXtcclxuICAgICAgICAgICAgICAgICQoXCIud29ya2VyX3NlbGVjdG9yXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIubG9hZGluZ1ZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VycyA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbWFpbElEIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPG9wdGlvbiB2YWx1ZT1cIicrbWFpbElEKydcIj4nK3VzZXJzW21haWxJRF0ubmFtZSsnPC9vcHRpb24+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5odG1sKHR4dCkudmFsKGlkKS5wcm9wKFwic2VsZWN0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5sb2FkaW5nVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRPYmogPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iailcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoISQoXCIuZmMtaGVhZGVyLXRvb2xiYXJcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTY0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5Q2xpY2s6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRXb3JrSG91cihkYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuYXR0ZW5kVmlld19pbnB1dFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfaW5wdXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCIuYXR0ZW5kVmlld19TaG93XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5jb25maXJtXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJCh0aGlzKS5hdHRyKFwiZGlkXCIpKTtcclxuICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmNsb3NlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIuYmxhY2tTY3JlZW5cIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiYm9keVwiKS5rZXl1cChmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgaWYoJChcIi5tb2RhbCAuY29uZmlybVwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBlLndoaWNoOyAvLyByZWNvbW1lbmRlZCB0byB1c2UgZS53aGljaCwgaXQncyBub3JtYWxpemVkIGFjcm9zcyBicm93c2Vyc1xyXG4gICAgICAgICAgICAgICAgaWYoY29kZT09MTMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJChcIi5tb2RhbCAuY29uZmlybVwiKS5hdHRyKFwiZGlkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5jaGFuZ2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld193b3JrZXIoaWQpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHZpZXdfd29ya2VyOiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZihpZCA9PT0gdGhhdC5pZCl7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19jYWxlbmRhclwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fbW9udGhcIikuaHRtbChcIlwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX2NhbGVuZGFyXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgIGlmKHRoYXQudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoYXQudmlld0lEKS5vZmYoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIraWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmF0dGVuZE9iaiA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeW8gPSB0aGF0LnZpZXdJRDtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlld0lEID0gaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoeW8ubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhhdC5pZCAhPT0gdGhhdC52aWV3SUQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iailcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5Q2xpY2s6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFdvcmtIb3VyKGRhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jYWxlbmRhcjogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5hdHRlbmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmZjLWRheVwiKS5odG1sKFwiXCIpO1xyXG5cclxuICAgICAgICBpZihkYXRhLmF0dGVuZCl7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmF0dGVuZFxyXG4gICAgICAgICAgICBmb3IgKHZhciBkYXRlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlSUQgPSBkYXRlLnNsaWNlKDAsNCkrXCItXCIrZGF0ZS5zbGljZSg0LDYpK1wiLVwiK2RhdGUuc2xpY2UoNiw4KTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAwXHJcbiAgICAgICAgICAgICAgICBsZXQgdHh0ID0gJzxwPicrZGF0YVtkYXRlXVswXS5mcm9tK1wiflwiK2RhdGFbZGF0ZV1bMF0udG8rJzwvcD4nXHJcbiAgICAgICAgICAgICAgICAvL+uRkO2DgOyehCDrgpjriKDshJwg6re866y07ZaI7Ja064+EIOuLrOugpeyXkCDtkZzsi5zrkJjripQg6rKD7J2AIOyyq+2DgOyehCDqt7zrrLTsi5zqsITrp4xcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWYgKz0gZGF0YVtkYXRlXVtpXS5kaWZcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8cD4nICsgTWF0aC5mbG9vcihkaWYvNjApICsgXCLsi5zqsIQgXCIrIGRpZiU2MCArXCLrtoRcIisnPC9wPidcclxuICAgICAgICAgICAgICAgICQoJy5mYy1kYXlbZGF0YS1kYXRlPVwiJytkYXRlSUQrJ1wiXScpLmh0bWwodHh0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBkdXJNb24gPSAwO1xyXG4gICAgICAgICAgICBsZXQgdGhpc01vbnRoID0gJyc7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5hdHRlbmQgLmZjLWRheVwiKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGVEb20gPSAkKFwiLmF0dGVuZCAuZmMtZGF5XCIpLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgaWYoIWRhdGVEb20uaGFzQ2xhc3MoXCJmYy1vdGhlci1tb250aFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBkYXRlRG9tLmF0dHIoXCJkYXRhLWRhdGVcIikuc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNNb250aCA9IGRhdGVbMF0rZGF0ZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZVswXStkYXRlWzFdK2RhdGVbMl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbZGF0ZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1ck1vbiArPSBkYXRhW2RhdGVdW2pdLmRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHR4dCA9ICcnXHJcblxyXG4gICAgICAgICAgICBpZigkKFwiLmZjLXZpZXctY29udGFpbmVyXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykgeyAgIC8v66y07KGw6rG0IDbso7xcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla0RvbSA9ICQoXCIuZmMtd2Vla1wiKS5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla0R1ciA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXlEb20gPSB3ZWVrRG9tLmZpbmQoXCIuZmMtZGF5XCIpLmVxKGopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gZGF5RG9tLmF0dHIoXCJkYXRhLWRhdGVcIikuc3BsaXQoXCItXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlWzBdK2RhdGVbMV0rZGF0ZVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrRHVyICs9IGRhdGFbZGF0ZV1ba10uZGlmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2Vla0R1cj4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj4nKyBNYXRoLmZsb29yKHdlZWtEdXIvNjApKyfsi5zqsIQgJyt3ZWVrRHVyJTYwKyfrtoQnICsnPC9wPidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj48L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKHR4dClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoJChcIi5mYy1sZWZ0XCIpLmNoaWxkcmVuKFwiaDIuZHVyTW9udGhcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICQoXCJoMi5kdXJNb250aFwiKS5odG1sKCcgKCcrTWF0aC5mbG9vcihkdXJNb24vNjApKyfsi5zqsIQgJytkdXJNb24lNjArJ+u2hCknKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuZmMtbGVmdFwiKS5hcHBlbmQoJzxoMiBjbGFzcz1cImR1ck1vbnRoXCI+ICgnK01hdGguZmxvb3IoZHVyTW9uLzYwKSsn7Iuc6rCEICcrZHVyTW9uJTYwKyfrtoQpPC9oMj4nKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQgPSAnJzsgICAvL3ZhciDrubzrqLnsnYDqsbAg7JWE64uYLiDsnITsl5DshJwg7ISg7Ja4IO2WiOydjCFcclxuXHJcbiAgICAgICAgICAgIGxldCBmdWxsTW9udGhCb251cyA9IDMwNDAwO1xyXG4gICAgICAgICAgICBsZXQgaW5zdXJhbmNlRmVlID0gMDtcclxuICAgICAgICAgICAgbGV0IGJhc2ljID0gTWF0aC5yb3VuZChkdXJNb24vNjAqNzYwMClcclxuICAgICAgICAgICAgbGV0IGZ1bGxXZWVrQnVudXMgPSBNYXRoLnJvdW5kKChkdXJNb24vNjAqNzYwMCkqMC4yKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmKHRoaXMuaWQgPT09IHRoaXMudmlld0lEKXtcclxuICAgICAgICAgICAgLy8gICAgIC8v67O47J24IOuqqOuTnFxyXG4gICAgICAgICAgICAvLyAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhY2NvdW50L3NhbGFyeS9cIit0aGlzTW9udGgrXCIvXCIrdGhpcy5pZCkudXBkYXRlKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBiYXNpYzogYmFzaWMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbFdlZWtCdW51czogZnVsbFdlZWtCdW51cyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsTW9udGhCb251czogZnVsbE1vbnRoQm9udXNcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnkvXCIrdGhpc01vbnRoK1wiL1wiK3RoaXMudmlld0lEKS51cGRhdGUoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJhc2ljOiBiYXNpYyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsV2Vla0J1bnVzOiBmdWxsV2Vla0J1bnVzLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxNb250aEJvbnVzOiBmdWxsTW9udGhCb251c1xyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuq4sOuzuOq4iTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoYmFzaWMpKyBcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6re866y07Iuc6rCEIFggNyw2MDDsm5A8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuyjvO2ctOyImOuLuTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoZnVsbFdlZWtCdW51cykgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7quLDrs7jquInsnZggMjAlPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7sl7DssKjsiJjri7k8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGZ1bGxNb250aEJvbnVzKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPjXsi5zqsIQg7IOB64u5IOq4sOuzuOq4iTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZSBhdHRlbmRfX21vbnRoX19saW5lLS1yZWRcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7IKs7ZqM67O07ZeY66OMPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShpbnN1cmFuY2VGZWUpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6rWt66+87Jew6riIL+qzoOyaqeuztO2XmC/qsbTqsJXrs7Ttl5gg7LKt6rWs7JWhPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lIGF0dGVuZF9fbW9udGhfX2xpbmUtLXN1bVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7tlanqs4Q8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGJhc2ljICsgZnVsbFdlZWtCdW51cyArIGZ1bGxNb250aEJvbnVzIC0gaW5zdXJhbmNlRmVlKSArXCLsm5A8L3A+XCJcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6riw67O46riJICsg7KO87Zy07IiY64u5ICsg7Jew7LCo7IiY64u5IC0g7IKs7ZqM67O07ZeY66OMPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX21vbnRoXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0V29ya0hvdXI6IGZ1bmN0aW9uKGRhdGVPYmope1xyXG4gICAgICAgIC8vIGNzczogbW9kdWxlcy9hdHRlbmQuY3NzXHJcbiAgICAgICAgbGV0IGRhdGVTaG9ydCA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoXCJNTS9ERFwiKTtcclxuICAgICAgICBsZXQgZGF0ZUlEID0gbW9tZW50KGRhdGVPYmopLmZvcm1hdChcIllZWVlNTUREXCIpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHt9XHJcbiAgICAgICAgaWYodGhpcy5hdHRlbmRPYmouYXR0ZW5kW2RhdGVJRF0pe1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5hdHRlbmRPYmouYXR0ZW5kW2RhdGVJRF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG5cclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYmxhY2tTY3JlZW5cIj4nXHJcbiAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cImlucHV0V2luZG93XCI+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8cCBjbGFzcz1cInRpdGxlXCI+JytkYXRlU2hvcnQrJyDqt7zrrLTsi5zqsIQ8L3A+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPidcclxuICAgICAgICBpZihkYXRhWzBdKXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cImZpcnN0X2Zyb21cIiB2YWx1ZT1cIicrZGF0YVswXS5mcm9tKydcIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwiZmlyc3RfdG9cIiB2YWx1ZT1cIicrZGF0YVswXS50bysnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPidcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cImZpcnN0X2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwiZmlyc3RfdG9cIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+J1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPidcclxuICAgICAgICBpZihkYXRhWzFdKXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCIgdmFsdWU9XCInK2RhdGFbMV0uZnJvbSsnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiIHZhbHVlPVwiJytkYXRhWzFdLnRvKydcIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+J1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwic2Vjb25kX2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwic2Vjb25kX3RvXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImJvdHRvbVwiPidcclxuICAgICAgICB0eHQrPSAgICAgICAgICAgJzxwIGNsYXNzPVwiY29uZmlybVwiIGRpZD1cIicrZGF0ZUlEKydcIj7tmZXsnbg8L3A+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgICAnPHAgY2xhc3M9XCJjbG9zZVwiPuy3qOyGjDwvcD4nXHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICc8L2Rpdj4nXHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tb2JpbGUpe1xyXG4gICAgICAgICAgICAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLkFueVBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICBkYXRlVGltZUZvcm1hdDpcIkhIOm1tXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjZmlyc3RfZnJvbVwiKS5mb2N1cygpO1xyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFdvcmtIb3VyOiBmdW5jdGlvbihkYXRlKXtcclxuXHJcbiAgICAgICAgbGV0IHdvcmsgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IGFsbEVtcHR5ID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5lcShpKS52YWwoKS5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgICAgICBhbGxFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihhbGxFbXB0eSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMudmlld0lEK1wiL2F0dGVuZC9cIitkYXRlKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkK1wiL2F0dGVuZC9cIitkYXRlKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJChcIi5tb2RhbFwiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0ZUlEID0gZGF0ZS5zbGljZSgwLDQpICsgXCItXCIrZGF0ZS5zbGljZSg0LDYpICsgXCItXCIrZGF0ZS5zbGljZSg2LDgpXHJcbiAgICAgICAgICAgICQoJy5mYy1kYXlbZGF0YS1kYXRlPVwiJytkYXRlSUQrJ1wiXScpLmh0bWwoXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmKCQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG4gICAgICAgICAgICAvL+yLnOyekeyLnOqwhOydtCDsnpgg7J6F66Cl65CY7JeI64KYIO2ZleyduFxyXG5cclxuICAgICAgICAgICAgaWYoZGF0ZTxtb21lbnQoKS5mb3JtYXQoXCJZWVlZTU1ERFwiKSl7XHJcbiAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy/snbTsoITsnbzsnbQg7JWE64uI642U652864+EIOyYiOyDgSDqt7zrrLTsi5zqsITsnbTrnbzrj4Qg7J6F66Cl7ZW07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgaWYoJChcIiNmaXJzdF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuyYiOyDgSDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmcm9tID0gJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpXHJcbiAgICAgICAgICAgIGxldCB0byA9ICQoXCIjZmlyc3RfdG9cIikudmFsKClcclxuXHJcbiAgICAgICAgICAgIGxldCBmcm9tQSA9IGZyb20uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICBsZXQgdG9BID0gdG8uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICBsZXQgZGlmID0gKHRvQVswXSoxIC0gZnJvbUFbMF0qMSkqNjAgKyAodG9BWzFdKjEgLSBmcm9tQVsxXSoxKVxyXG5cclxuXHJcbiAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgdG86IHRvLFxyXG4gICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi6re866y07Iuc6rCE7J20IOyemOuquyDsnoXroKXrkJjsl4jsirXri4jri6QuIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZigkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRlPG1vbWVudCgpLmZvcm1hdChcIllZWVlNTUREXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/snbTsoITsnbzsnbQg7JWE64uI642U652864+EIOyYiOyDgSDqt7zrrLTsi5zqsITsnbTrnbzrj4Qg7J6F66Cl7ZW07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg7JiI7IOBIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZnJvbSA9ICQoXCIjc2Vjb25kX2Zyb21cIikudmFsKClcclxuICAgICAgICAgICAgICAgIGxldCB0byA9ICQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb21BID0gZnJvbS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9BID0gdG8uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgd29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOq3vOustOyLnOqwhOydtCDsnpjrqrsg7J6F66Cl65CY7JeI7Iq164uI64ukLiBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy52aWV3SUQrXCIvYXR0ZW5kL1wiK2RhdGUpLnNldCh3b3JrKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCtcIi9hdHRlbmQvXCIrZGF0ZSkuc2V0KHdvcmspO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5odG1sKFwiXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdHRlbmQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvYXR0ZW5kLmpzIiwiaW1wb3J0IFNwb3QgZnJvbSBcIi4vY2l0eS9zcG90LmpzXCI7XHJcbi8v6rSA6rSR7KeAIOygleumrFxyXG5pbXBvcnQgSG90ZWwgZnJvbSBcIi4vY2l0eS9ob3RlbC5qc1wiO1xyXG4vL+2YuO2FlOygleuztCDqtIDroKhcclxuaW1wb3J0IEFyZWEgZnJvbSBcIi4vY2l0eS9hcmVhLmpzXCI7XHJcbi8v7KeA7JetIOuNsOydtO2EsCDsnoXroKVcclxuXHJcbmxldCBDaXR5ID0ge1xyXG4gICAgY29kZURhdGE6IHt9LFxyXG4gICAgY2l0eURhdGE6IHt9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5jaXR5Q29kZVZpZXdcIikub24oXCJjbGlja1wiLCBcIi5zcG90c1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgY2lkID0gJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5uYW1lXCIpLmh0bWwoKTtcclxuICAgICAgICAgICAgU3BvdC5pbml0KHRoYXQuY2l0eURhdGFbY2lkXSwgY2lkLCBuYW1lKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLm9uKFwiY2xpY2tcIiwgXCIuaG90ZWxzXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCBjaWQgPSAkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLm5hbWVcIikuaHRtbCgpO1xyXG4gICAgICAgICAgICBIb3RlbC5pbml0KHRoYXQuY2l0eURhdGFbY2lkXSwgY2lkLCBuYW1lKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLm9uKFwiY2xpY2tcIiwgXCIuYXJlYVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgY2lkID0gJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5uYW1lXCIpLmh0bWwoKTtcclxuICAgICAgICAgICAgQXJlYS5pbml0KHRoYXQuY2l0eURhdGFbY2lkXSwgY2lkLCBuYW1lKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5vbihcImNsaWNrXCIsIFwiLnRyYW5zcG9ydFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0Lm1ldHJvQWRqdXN0KCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpKTtcclxuICAgICAgICAgICAgLy/rj4Tsi5zrs4TroZwg66mU7Yq466GcIOygleuztOulvCDri6Trk6zripTrjbAg7IKs7JqpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5oZWFkZXJfX3JldHVyblwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LnJldHVyblRvQ2l0eVZpZXcoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICByZXR1cm5Ub0NpdHlWaWV3OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoXCIuY2l0eV9fcGFnZXNcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuY2l0eSAuc3BvdCAuY2hlY2tcIikuaHRtbChcIlwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbmZsYXRlX2NpdHlDb2RlVmlldyh0aGlzLmNvZGVEYXRhLCB0aGlzLmNpdHlEYXRhKVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRyb0FkanVzdDogZnVuY3Rpb24oY2lkKXtcclxuICAgICAgICBpZih0aGlzLmNpdHlEYXRhW2NpZF0ubWV0cm8pe1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuY2l0eURhdGFbY2lkXS5tZXRyb1xyXG4gICAgICAgICAgICBsZXQgbmFtZUFycmF5ID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldHJvID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGlmKCFtZXRyby5saW5lKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtZXRyby5uYW1lKVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaWQrXCIvbWV0cm9cIikudXBkYXRlKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIGluZmxhdGVfY2l0eUNvZGVWaWV3OiBmdW5jdGlvbihjb2RlRGF0YSxkYXRhKXtcclxuICAgICAgICBsZXQgdHh0ID0gJzxkaXYgY2xhc3M9XCJsaW5lIHRvcFwiPjxwIGNsYXNzPVwibmFtZVwiPuuPhOyLnOuqhTwvcD48cCBjbGFzcz1cImhvdGVsc1wiPuyImeyGjDwvcD48cCBjbGFzcz1cInNwb3RzXCI+6rSA6rSR7KeAIOygleumrDwvcD48cCBjbGFzcz1cImFyZWFcIj7sp4Dsl608L3A+PHAgY2xhc3M9XCJ0cmFuc3BvcnRcIj7qtZDthrU8L3A+PHAgY2xhc3M9XCJwcmljZVwiPuusvOqwgDwvcD48L2Rpdj4nXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2l0eSA9IGNvZGVEYXRhW2ldO1xyXG4gICAgICAgICAgICBpZihkYXRhW2NpdHkuY29kZV0pe1xyXG4gICAgICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImxpbmVcIiBpZD1cIicrY2l0eS5jb2RlKydcIj48cCBjbGFzcz1cIm5hbWVcIj4nK2NpdHkubmFtZSsnPC9wPidcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW2NpdHkuY29kZV0uaG90ZWxzKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJob3RlbHNcIj5PPC9wPidcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cImhvdGVsc1wiPlg8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbY2l0eS5jb2RlXS5zcG90cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBkYXRhW2NpdHkuY29kZV0uc3BvdHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbY2l0eS5jb2RlXS5zdGF0dXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2NpdHkuY29kZV0uc3RhdHVzLnNwb3RzID09PSBcImZpbmlzaGVkXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwic3BvdHNcIj7rjbDsnbTthLAg7ZmV67O0IOyZhOujjDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGRhdGFbY2l0eS5jb2RlXS5zdGF0dXMuc3BvdHMgPT09IFwidmVyaWZ5aW5nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwic3BvdHNcIj7rjbDsnbTthLAg7ISg67OELCAy7LCoIOqygOymneykkTwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNwb3QuY29tYmluaW5nKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInNwb3RzXCI+642w7J207YSwIO2Vqey5mOq4sCDsnpHsl4XspJE8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInNwb3RzXCI+642w7J207YSwIOyImOynkSwgMeywqCDqsoDspp3spJE8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoc3BvdC5jb21iaW5pbmcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJzcG90c1wiPuuNsOydtO2EsCDtlansuZjquLAg7J6R7JeF7KSRPC9wPidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwic3BvdHNcIj7rjbDsnbTthLAg7IiY7KeRLCAx7LCoIOqygOymneykkTwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFkYXRhW2NpdHkuY29kZV0uc3RhdHVzKXtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIisgY2l0eS5jb2RlICsgXCIvc3RhdHVzXCIpLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb3RzOmZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW2NpdHkuY29kZV0uYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwiYXJlYVwiPk88L3A+J1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwiYXJlYVwiPlg8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVtjaXR5LmNvZGVdLm1ldHJvKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJ0cmFuc3BvcnRcIj5PPC9wPidcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInRyYW5zcG9ydFwiPlg8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbY2l0eS5jb2RlXS5wcmljZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicHJpY2VcIj5PPC9wPidcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInByaWNlXCI+WDwvcD4nXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHh0Kz0gJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImxpbmVcIiBpZD1cIicrY2l0eS5jb2RlKydcIj48cCBjbGFzcz1cIm5hbWUgbm9kYXRhXCI+JytjaXR5Lm5hbWUrJzwvcD4nXHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxzXCI+WDwvcD48cCBjbGFzcz1cInNwb3RzXCI+642w7J207YSwIOyXhuydjDwvcD48cCBjbGFzcz1cImFyZWFcIj5YPC9wPjxwIGNsYXNzPVwidHJhbnNwb3J0XCI+WDwvcD48cCBjbGFzcz1cInByaWNlXCI+WDwvcD48L2Rpdj4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLmh0bWwodHh0KVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oaWQsIG5hbWUsIGdyYWRlKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG5cclxuICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+e1xyXG4gICAgICAgIC8vICAgICAkKFwiLmxvYWRpbmdWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICAgICAvLyAgICAgbGV0IGNvZGVEYXRhID0gc25hcC52YWwoKS5zZXR0aW5nLmNpdGllcztcclxuICAgICAgICAvLyAgICAgbGV0IGRhdGEgPSBzbmFwLnZhbCgpLmNpdGllc1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNpdHlEYXRhID0gZGF0YTtcclxuICAgICAgICAvLyAgICAgdGhpcy5jb2RlRGF0YSA9IGNvZGVEYXRhO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmluZmxhdGVfY2l0eUNvZGVWaWV3KGNvZGVEYXRhLCBkYXRhKVxyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgIC8vIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2luaXQnKVxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvbnljJykub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaXR5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkuanMiLCJpbXBvcnQgTWFudWFsQ29tYmluZSBmcm9tIFwiLi9tYW51YWxDb21iaW5lLmpzXCI7XHJcbmltcG9ydCBWZXJpZnkgZnJvbSBcIi4vc3BvdC92ZXJpZnlpbmcuanNcIjtcclxuXHJcbi8vU3BvdOydmCDri6jqs4TripQg7LSdIDTri6jqs4QgLSDrjbDsnbTthLAg7IiY7KeRLzHssKjqsoDspp0gLT4g642w7J207YSwIO2Vqey5mOq4sCAtPiDrjbDsnbTthLAg7ISg67OELzLssKjqsoDspp0gLT4g7JmE66OMXHJcblxyXG5sZXQgU3BvdCA9IHtcclxuXHJcbiAgICBkYXRhOnt9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19jb25maXJtXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuaW5wdXRDb29yZGluYXRlKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19zcG90Q29vclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19zcG90RGVsZXRlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsZXRlU3BvdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fc3BvdE5hbWVcIikuaHRtbCgpKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLnNwb3QgLmNoZWNrXCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LnNldFJlbWFpbk51bWJlcigkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fcmVtYWluTnVtYmVyXCIpLnZhbCgpKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaWQsIG5hbWUpe1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuY2l0eSAuc3BvdFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuY2l0eU5hbWVcIikuaHRtbChuYW1lKS5hdHRyKFwiaWRcIiwgY2lkKTtcclxuXHJcbiAgICAgICAgaWYoZGF0YS5zdGF0dXMpe1xyXG4gICAgICAgICAgICBpZihkYXRhLnN0YXR1cy5zcG90cyA9PT0gXCJmaW5pc2hlZFwiKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi642w7J207YSwIO2ZleuztCDsmYTro4xcIik7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGRhdGEuc3RhdHVzLnNwb3RzID09PSBcInZlcmlmeWluZ1wiKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi642w7J207YSwIOyEoOuzhCwgMuywqCDqsoDspp3spJFcIik7XHJcbiAgICAgICAgICAgICAgICBWZXJpZnkuaW5pdChkYXRhLnNwb3RzLmNvbWJpbmVkKTtcclxuICAgICAgICAgICAgICAgIC8vY29tYmluZWTqsIAg7J6I6rOgIGNvbWJpbmluZ+ydtCDsl4bsnLzrqbQgMeywqCDsnpDro4zsoJXrpqwg7JmE66OM652864qUIOucu1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoZGF0YS5zcG90cy5jb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi7ZWp7LmY6riwIOyekeyXheykkVwiKTtcclxuICAgICAgICAgICAgICAgIC8vY29tYmluaW5n7J20IOyeiOycvOuptCDtlansuZjquLAg7J6R7JeF7KSR7J20652864qUIOucu1xyXG4gICAgICAgICAgICAgICAgTWFudWFsQ29tYmluZS5pbml0KGRhdGEuc3BvdHMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGVjayhkYXRhLnNwb3RzKTsgLy9jb21iaW5pbmcsIGNvbWJpbmVk6rCAIOyXhuycvOuptCDrjbDsnbTthLAg7IiY7KeRLCDqsoDspp3spJHsnbTrnbzripQg65y7XHJcbiAgICAgICAgICAgICAgICAvL2ZpcnN0Y2hlY2vrpbwg7Ya16rO87ZWY66m0IHRoaXMuYXV0b0NvbWJpbmXsnYQg7Ya17ZW0IGRhdGEuc3BvdHMuY29tYmluaW5n7J20IOunjOuTpOyWtOynkFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnNwb3RzLmNvbWJpbmluZykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLtlansuZjquLAg7J6R7JeF7KSRXCIpXHJcbiAgICAgICAgICAgICAgICAvL2NvbWJpbmluZ+ydtCDsnojsnLzrqbQg7ZWp7LmY6riwIOyekeyXheykkeydtOudvOuKlCDrnLtcclxuICAgICAgICAgICAgICAgIE1hbnVhbENvbWJpbmUuaW5pdChkYXRhLnNwb3RzKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hlY2soZGF0YS5zcG90cyk7IC8vY29tYmluaW5nLCBjb21iaW5lZOqwgCDsl4bsnLzrqbQg642w7J207YSwIOyImOynkSwg6rKA7Kad7KSR7J20652864qUIOucu1xyXG4gICAgICAgICAgICAgICAgLy9maXJzdGNoZWNr66W8IO2GteqzvO2VmOuptCB0aGlzLmF1dG9Db21iaW5l7J2EIO2Gte2VtCBkYXRhLnNwb3RzLmNvbWJpbmluZ+ydtCDrp4zrk6TslrTsp5BcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBhdXRvQ29tYmluZV9fc3BvdFJlc3RydWN0dXJlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGVBcnIgPSBbXCJnZ1wiLFwibHBcIixcIm52XCIsXCJ0YVwiXTtcclxuICAgICAgICBsZXQgY29tYmluaW5nID0ge307XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhLnNwb3RzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpdGVBcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpdGUgPSBzaXRlQXJyW2pdO1xyXG4gICAgICAgICAgICBpZihkYXRhW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbc2l0ZV0ubm9EYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbc2l0ZV1baV0mJiFkYXRhW3NpdGVdW2ldLmRlbGV0ZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFNwb3QgPSBkYXRhW3NpdGVdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/quLDsobQg7KCV67O066W8IG9sZFNwb3TsnbTrnbzqs6Ag7ZWY7J6QLiDsg4jroZzsmrQg7Iqk7Yyf7KCV67O07JeQ64qUIOydtOumhOydhCDtlZwv7JiB7Jy866GcIOu2hO2VoO2VmOqzoCDrnq3tgrnsnYQg67aA7Jes7ZWgIOqyg+ydtOuLpC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga286XCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW46XCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcjogb2xkU3BvdC5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6e1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvW+qwgC3tnqNdLy50ZXN0KG9sZFNwb3QubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm5hbWUua28gPSBvbGRTcG90Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5lbiA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QucmFua1tzaXRlXSA9IGk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYob2xkU3BvdC51cmwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudXJsID0gb2xkU3BvdC51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvbGRTcG90LnRhZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC50YWcgPSBvbGRTcG90LnRhZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb3VudGVyPDEwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzMDBcIitjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjb3VudGVyPDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczBcIitjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzXCIrY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IC8v7ZWc67CU7YC0IOuPjOyVmOuLuVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hdXRvQ29tYmluZV9fY29tYmluZShjb21iaW5pbmcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhdXRvQ29tYmluZV9fY29tYmluZTogZnVuY3Rpb24oY29tYmluaW5nKXtcclxuICAgICAgICAvLyBUT0RPOiDrgZ3rgpjrqbQg7ZWp7LmY6riwIOyekeyXhSDtmZTrqbQgaW5mbGF0Ze2VmOq4sFxyXG5cclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG5cclxuICAgICAgICBsZXQgY29tYmluZU9iaiA9IHt9XHJcbiAgICAgICAgbGV0IGNvbWJpbmVkID0ge31cclxuXHJcbiAgICAgICAgZm9yICh2YXIgY29kZSBpbiBjb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSBjb21iaW5pbmdbY29kZV07XHJcbiAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0gPSBzcG90XHJcbiAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0uY29tYmluZSA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgaGFzQ29tYmluZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy/tlansuaAg6rKD7J20IOyXhuycvOuptCDrsJTroZwgY29tYmluZWQg7Kq97Jy866GcIOuztOuCuOuLpC5cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHRDb2RlIGluIGNvbWJpbmluZykge1xyXG4gICAgICAgICAgICAgICAgaWYoY29kZTx0Q29kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRTcG90ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbWJpbmluZ1t0Q29kZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdFNwb3Rba2V5XSA9IGNvbWJpbmluZ1t0Q29kZV1ba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZighdFNwb3QuZGVsZXRlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBjYWxjdWxhdGVEaWYoc3BvdC5jb29yLCB0U3BvdC5jb29yKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGlmPDI1MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmVbdENvZGVdID0gdFNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb21iaW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFoYXNDb21iaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb21iaW5lZFtjb2RlXSA9IGNvbWJpbmVPYmpbY29kZV07XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29tYmluZU9ialtjb2RlXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpdHkrXCIvc3BvdHNcIikuc2V0KHtcclxuICAgICAgICAgICAgY29tYmluaW5nOmNvbWJpbmVPYmosXHJcbiAgICAgICAgICAgIGNvbWJpbmVkOmNvbWJpbmVkXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgTWFudWFsQ29tYmluZS5pbml0KHtcclxuICAgICAgICAgICAgY29tYmluaW5nOmNvbWJpbmVPYmosXHJcbiAgICAgICAgICAgIGNvbWJpbmVkOmNvbWJpbmVkXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVTcG90OiBmdW5jdGlvbihzaWQsIG5hbWUpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGUgPSBzaWQuc3BsaXQoXCJfXCIpWzBdO1xyXG4gICAgICAgIGxldCBubyA9IHNpZC5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgICAgIGlmKGNvbmZpcm0obmFtZSArIFwiIOyepeyGjOulvCDsoJzqsbDtlanri4jri6QuIOqzhOyGje2VoOq5jOyalD9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIisgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSArIFwiL1wiICsgbm8gKS5zZXQoe2RlbGV0ZWQ6IHRydWV9KTtcclxuICAgICAgICAgICAgJChcIiNcIitzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB0b2FzdChcIuyepeyGjOqwgCDsoJzqsbDrkJjsl4jsirXri4jri6QuXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dENvb3JkaW5hdGU6IGZ1bmN0aW9uKHNpZCwgY29vclR4dCl7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICBsZXQgc2l0ZSA9IHNpZC5zcGxpdChcIl9cIilbMF07XHJcbiAgICAgICAgbGV0IG5vID0gc2lkLnNwbGl0KFwiX1wiKVsxXTtcclxuICAgICAgICBsZXQgY29vciA9IHt9O1xyXG5cclxuICAgICAgICBpZihjb29yVHh0LnNwbGl0KFwiLFwiKS5sZW5ndGggPT09IDIpe1xyXG4gICAgICAgICAgICBsZXQgbGF0ID0gY29vclR4dC5zcGxpdChcIixcIilbMF0udHJpbSgpKjE7XHJcbiAgICAgICAgICAgIGxldCBsbmcgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVsxXS50cmltKCkqMTtcclxuXHJcbiAgICAgICAgICAgIGlmKGlzTmFOKGxhdCl8fGlzTmFOKGxuZykpe1xyXG4gICAgICAgICAgICAgICAgLy/sooztkZwg7KSRIO2VmOuCmOqwgFxyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg67aA7KCV7ZmV7ZWY6rKMIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvb3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OiBsYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOiBsbmdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIrc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubyArIFwiL2Nvb3JcIikuc2V0KGNvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOu2gOygle2Zle2VmOqyjCDsnoXroKXrkJjsl4jsirXri4jri6RcIilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFJlbWFpbk51bWJlcjogZnVuY3Rpb24oc2l0ZSwgbnVtYmVyKXtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG4gICAgICAgIGxldCBjdXRObyA9IG51bWJlci50cmltKCkqMTtcclxuXHJcbiAgICAgICAgaWYoY3V0Tm88MTAwKXtcclxuICAgICAgICAgICAgdG9hc3QoXCIxMDDqsJwg7J207IOB7J2YIOyepeyGjOulvCDsnKDsp4DtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGNvbmZpcm0oXCLsiJzsnIQgXCIrIGN1dE5vICsgXCLsnIQg66+466eMIOyepeyGjOulvCDrqqjrkZAg7KCc6rGw7ZWp64uI64ukLiDrp57sirXri4jquYw/XCIpKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXRPYmogPSB0aGlzLmRhdGEuc3BvdHNbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICBjdXRPYmoubGVuZ3RoID0gY3V0Tm87XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUpLnNldChjdXRPYmopO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlyc3RDaGVjazogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZVwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZS5jaGVja1wiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICAgICAkKFwiLmhlYWRlcl9fc3RhdHVzXCIpLmh0bWwoXCLrjbDsnbTthLAg6rKA7Kad7KSRXCIpXHJcbiAgICAgICAgbGV0IGhhc1Byb2JsZW09IGZhbHNlO1xyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgIGxldCBzZWFyY2hVcmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmtyL21hcHMvcGxhY2UvJyArICQoXCIuY2l0eU5hbWVcIikuaHRtbCgpICtcIitcIlxyXG5cclxuICAgICAgICBsZXQgc2l0ZU9iaiA9IHtcclxuICAgICAgICAgICAgZ2c6IFwi6rWs6riAXCIsXHJcbiAgICAgICAgICAgIG52OiBcIuuEpOydtOuyhFwiLFxyXG4gICAgICAgICAgICB0YTogXCLtirjrpr3slrTrk5zrsJTsnbTsoIBcIixcclxuICAgICAgICAgICAgbHA6IFwi66Gg66as7ZSM656Y64ubXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIHNpdGUgaW4gc2l0ZU9iaikge1xyXG4gICAgICAgICAgICBsZXQgc2l0ZUhhc1Byb2JsZW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yVHh0ID0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+7KKM7ZGc6rCAIOyeheugpeuQmOyngCDslYrsnYAg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICBsZXQgbm9TcG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3RUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7ruYTslrTsnojripQg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG5cclxuICAgICAgICAgICAgaWYoZGF0YVtzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImNoZWNrX190aXRsZVwiPicrc2l0ZU9ialtzaXRlXSsnIOuNsOydtO2EsCDtmZXsnbg8L3A+J1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBkYXRhW3NpdGVdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwb3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGFzQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3QuZGVsZXRlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ydvOu2gOufrCDsgq3soJztlZwg6rSA6rSR7KeAIC0+IOuEmOyWtOqwhOuLpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3QuY29vcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BvdC5jb29yLmxuZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzTmFOKHNwb3QuY29vci5sbmcqMSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3QuY29vci5sYXQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc05hTihzcG90LmNvb3IubGF0KjEpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFoYXNDb29yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQrPSc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicrc2l0ZSsnXycraSsnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCs9ICAgJzxhIGNsYXNzPVwiY2hlY2tfX3Nwb3ROYW1lXCIgaHJlZj1cIicrc2VhcmNoVXJsK3Nwb3QubmFtZSsnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JytzcG90Lm5hbWUrJzwvYT4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0Kz0gICAnPGlucHV0IGNsYXNzPVwiY2hlY2tfX3Nwb3RDb29yXCIgcGxhY2Vob2xkZXI9XCJ4eC54eHh4eCwgeHgueHh4eHgg7ZiV7YOcIOyeheugpVwiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQrPSAgICc8cCBjbGFzcz1cImNoZWNrX19jb25maXJtXCI+7KKM7ZGcIOyeheugpTwvcD48cCBjbGFzcz1cImNoZWNrX19zcG90RGVsZXRlXCI+7J6l7IaMIOyCreygnDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0Kz0nPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQrPSc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicrc2l0ZSsnXycraSsnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQrPSAgICc8cCBjbGFzcz1cImNoZWNrX190eHRcIj4nK2krJyDrsogg6rSA6rSR7KeAPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90VHh0Kz0gICAnPHAgY2xhc3M9XCJjaGVja19fc3BvdERlbGV0ZVwiPuyepeyGjCDsgq3soJw8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG5vQ29vcil7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vQ29vclR4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKG5vU3BvdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vU3BvdFR4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW3NpdGVdLmxlbmd0aD4xNTApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXJnZU9LID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmxhcmdlRGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEubGFyZ2VEYXRhW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMTUw6rCcIOydtOyDgeydmCDrjbDsnbTthLDrpbwg67O07Jyg7ZWY66Ck66m0IOuPhOyLnOuqhS9zcG90cy9sYXJnZURhdGEv7IKs7J207Yq466qF7J20IHRydWXrnbzqs6Ag67aA7Jes65CY7Ja07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXJnZU9LID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZighbGFyZ2VPSyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+JytzaXRlT2JqW3NpdGVdKycg7J6l7IaMIOuNsOydtO2EsOqwgCAxNTDqsJzrpbwg7LSI6rO8KCcrZGF0YVtzaXRlXS5sZW5ndGgrJ+qwnCntlanri4jri6QuPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInK3NpdGUrJ1wiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPGlucHV0IGNsYXNzPVwiY2hlY2tfX3JlbWFpbk51bWJlclwiIHZhbHVlPVwiJytkYXRhW3NpdGVdLmxlbmd0aCsnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNoZWNrX19yZW1haW5MYXJnZURhdGFcIj7qsJzsnZgg7J6l7IaMIOycoOyngO2VmOq4sDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImNoZWNrX190aXRsZVwiPicrc2l0ZU9ialtzaXRlXSsnIOuNsOydtO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK7Iq164uI64ukLjwvcD4nXHJcbiAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiDsm5Drnpgg7IKs7J207Yq4IOuNsOydtO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK64qUIOqyveyasOulvCDrjIDruYTtlZwg67KE7Yq87J2EIOunjOuTpOqzoCBzaXRlIOqwkuycvOuhnCBub2RhdGE6IHRydWXrpbwg64Sj7Ja07KSA64ukLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFzaXRlSGFzUHJvYmxlbSl7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7rsJzqsqzrkJwg66y47KCc6rCAIOyXhuyKteuLiOuLpDwvcD4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGhhc1Byb2JsZW0pe1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2ZpbmlzaFwiPuqygOyCrOulvCDrqqjrkZAg66eI7LOk7Iq164uI64ukPC9wPidcclxuICAgICAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi67Cc6rKs65CcIOusuOygnOqwgCDsl4bslrQg642w7J207YSwIOuzke2VqeydhCDsi6Tsi5ztlanri4jri6QuXCIpXHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0NvbWJpbmVfX3Nwb3RSZXN0cnVjdHVyZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BvdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5L3Nwb3QuanMiLCJsZXQgTWFudWFsQ29tYmluZSA9IHtcclxuICAgIG1hcDoge30sXHJcbiAgICBtYXJrZXI6IHtcclxuICAgICAgICBwcmltZTp7fSxcclxuICAgICAgICB0YXJnZXQ6W11cclxuICAgIH0sXHJcbiAgICBkYXRhOnt9LFxyXG4gICAgcmVtYWluOjAsXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLmNvbWJpbmVfX3RhcmdldFwiKS5vbihcImNsaWNrXCIsIFwiLmNvbWJpbmVfX3RhcmdldF9fZGl2XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oXCIuY29tYmluZV9fdGFyZ2V0X19jaGVja1wiKS50b2dnbGVDbGFzcyhcImNvbWJpbmVfX3RhcmdldF9fY2hlY2tlZFwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLmNvbWJpbmVfX21haW5cIikub24oXCJjbGlja1wiLFwiLmNvbWJpbmVfX25leHRTdGVwXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQubmV4dFN0ZXAoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBuZXh0U3RlcDogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG5cclxuICAgICAgICBsZXQgbWFpbkRhdGEgPSB0aGlzLmRhdGEuY29tYmluaW5nWyQoXCIuY29tYmluZV9fbWFpblwiKS5hdHRyKFwiaWRcIildO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuY29tYmluZV9fdGFyZ2V0X19jaGVja2VkXCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0aWQgPSAkKFwiLmNvbWJpbmVfX3RhcmdldF9fY2hlY2tlZFwiKS5lcShpKS5hdHRyKFwic2lkXCIpXHJcbiAgICAgICAgICAgIGxldCB0YXJnZXREYXRhID0gbWFpbkRhdGEuY29tYmluZVt0aWRdO1xyXG5cclxuICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7J2YIHJhbmvrpbwgbWFpbmREYXRh7J2YIHJhbmvroZwg7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICBmb3IgKHZhciBzaXRlIGluIHRhcmdldERhdGEucmFuaykge1xyXG4gICAgICAgICAgICAgICAgaWYobWFpbkRhdGEucmFua1tzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWFpbkRhdGEucmFua1tzaXRlXSA+IHRhcmdldERhdGEucmFua1tzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5EYXRhLnJhbmtbc2l0ZV0gPSB0YXJnZXREYXRhLnJhbmtbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEucmFua1tzaXRlXSA9IHRhcmdldERhdGEucmFua1tzaXRlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7J2YIO2DnOq3uOulvCBtYWluRGF0YeydmCB0YWfroZwg7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICBpZih0YXJnZXREYXRhLnRhZyl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRhcmdldERhdGEudGFnLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWFpbkRhdGEudGFnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW1haW5EYXRhLnRhZy5pbmNsdWRlcyh0YXJnZXREYXRhLnRhZ1tqXSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnLnB1c2godGFyZ2V0RGF0YS50YWdbal0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnID0gdGFyZ2V0RGF0YS50YWdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v7ZWp7LOQ7KeIIOuMgOyDgeyXkOqyjCB1cmzsnbQg7J6F66Cl65CY7Ja0IOyeiOuLpOuptCBtYWluRGF0YeyXkCDthrXtlantlZjripQg7J6R7JeFXHJcbiAgICAgICAgICAgIGlmKCFtYWluRGF0YS51cmwpe1xyXG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0RGF0YS51cmwpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5EYXRhLnVybCA9IHRhcmdldERhdGEudXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmNvbWJpbmluZ1t0aWRdO1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuY29tYmluZWRbdGlkXSl7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmNvbWJpbmVkW3RpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbWFpbkRhdGEubmFtZS5rbyA9ICQoXCIjbmFtZV9rb1wiKS52YWwoKTtcclxuICAgICAgICBtYWluRGF0YS5uYW1lLmVuID0gJChcIiNuYW1lX2VuXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICBkZWxldGUgbWFpbkRhdGEuY29tYmluZTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhLmNvbWJpbmVkWyQoXCIuY29tYmluZV9fbWFpblwiKS5hdHRyKFwiaWRcIildID0gdGhpcy5kYXRhLmNvbWJpbmluZ1skKFwiLmNvbWJpbmVfX21haW5cIikuYXR0cihcImlkXCIpXTtcclxuICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmNvbWJpbmluZ1skKFwiLmNvbWJpbmVfX21haW5cIikuYXR0cihcImlkXCIpXTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2l0eStcIi9zcG90c1wiKS51cGRhdGUodGhpcy5kYXRhKTtcclxuXHJcblxyXG4gICAgICAgIGlmKE9iamVjdC5rZXlzKHRoaXMuZGF0YS5jb21iaW5pbmcpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgdGhpcy5pbmZsYXRlKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpdHkrXCIvc3RhdHVzL3Nwb3RzXCIpLnNldChcInZlcmlmeWluZ1wiKVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaXR5K1wiL3Nwb3RzL2NvbWJpbmluZ1wiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdG9hc3QoXCLtlansuZjquLAg7J6R7JeF7J20IOyZhOujjOuQmOyXiOyKteuLiOuLpCEgMuy0iCDtm4Qg7Y6Y7J207KeA66W8IOyDiOuhnOqzoOy5qO2VqeuLiOuLpC5cIilcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZVwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZS5jb21iaW5lXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5oZWFkZXJfX3N0YXR1c1wiKS5odG1sKFwi6rSA6rSR7KeAIO2Vqey5mOq4sFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiA0MC43NDg0NCwgbG5nOiAtNzMuOTg1NjYgfSxcclxuICAgICAgICAgICAgem9vbTogMTcsXHJcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHRoYXQuY2hvb3NlQ29vcmRpbmF0ZShlKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmluZmxhdGUoKTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNob29zZUNvb3JkaW5hdGU6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQoXCIuY29tYmluZV9fY29vcmRpbmF0ZVwiKS5odG1sKGUubGF0TG5nLmxhdCgpK1wiLFwiK2UubGF0TG5nLmxuZygpKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXIucHJpbWUuc2V0TWFwKG51bGwpXHJcbiAgICAgICAgdGhpcy5tYXJrZXIucHJpbWUgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGUubGF0TG5nLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YS5jb21iaW5pbmc7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgLy/quLDsobTsl5Ag7LCN7ZiA7J6I642YIOuniOy7pOulvCDsoJzqsbDtlZzri6RcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcclxuICAgICAgICB0aGlzLnJlbWFpbiA9IGtleXMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBzcG90ID0gZGF0YVtrZXlzWzBdXTtcclxuICAgICAgICAkKFwiLmNvbWJpbmVfX21haW5cIikuYXR0cihcImlkXCIsIGtleXNbMF0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhzcG90KVxyXG4gICAgICAgIC8v7J2066aEIOq0gOugqCDsoJXrs7Qg7ZGc7IucXHJcbiAgICAgICAgaWYoc3BvdC5uYW1lLmtvLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJjb21iaW5lX19uYW1lX19wcmltZVwiPuq4sOykgCDsnqXshozrqoU6ICcrIHNwb3QubmFtZS5rbyArJzwvcD4nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImNvbWJpbmVfX25hbWVfX3ByaW1lXCI+6riw7KSAIOyepeyGjOuqhTogJysgc3BvdC5uYW1lLmVuICsnPC9wPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJjb21iaW5lX19wcmltZVwiPidcclxuICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwiY29tYmluZV9fcHJpbWVfX2xlZnRcIj4nXHJcbiAgICAgICAgdHh0Kz0gICAgICAnPGRpdiBjbGFzcz1cImNvbWJpbmVfX2xpbmVcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPu2VnOq4gOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImNvbWJpbmVfX2lucHV0XCIgaWQ9XCJuYW1lX2tvXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5rbysnXCI+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICAgICc8ZGl2IGNsYXNzPVwiY29tYmluZV9fbGluZVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPuyYgeusuOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImNvbWJpbmVfX2lucHV0XCIgaWQ9XCJuYW1lX2VuXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5lbisnXCI+J1xyXG4gICAgICAgIHR4dCs9ICAgICAnPC9kaXY+J1xyXG4gICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNvbWJpbmVfX25leHRTdGVwXCI+64uk7J2MPC9wPidcclxuICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG5cclxuICAgICAgICAvL+yijO2RnCDqtIDroKgg7KCV67O0IO2RnOyLnFxyXG4gICAgICAgIHNwb3QuY29vci5sYXQgPSBzcG90LmNvb3IubGF0KjE7XHJcbiAgICAgICAgc3BvdC5jb29yLmxuZyA9IHNwb3QuY29vci5sbmcqMTtcclxuICAgICAgICB0aGlzLm1hcmtlci5wcmltZSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogc3BvdC5jb29yLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tYXAucGFuVG8oc3BvdC5jb29yKTtcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY29tYmluZV9fbGluZVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPuyijO2RnCc7XHJcbiAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJjb21iaW5lX19jb29yZGluYXRlXCI+Jysgc3BvdC5jb29yLmxhdCArXCIsXCIrc3BvdC5jb29yLmxuZyArJzwvcD4nO1xyXG4gICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIuY29tYmluZV9fbWFpblwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgICAgIHR4dD0nJztcclxuICAgICAgICBsZXQgaWR4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2lkIGluIHNwb3QuY29tYmluZSkge1xyXG4gICAgICAgICAgICBpZHgrKztcclxuICAgICAgICAgICAgbGV0IHRTcG90ID0gc3BvdC5jb21iaW5lW3NpZF07XHJcblxyXG4gICAgICAgICAgICBsZXQgbGF0bG5nID0ge1xyXG4gICAgICAgICAgICAgICAgbGF0OiB0U3BvdC5jb29yLmxhdCoxLFxyXG4gICAgICAgICAgICAgICAgbG5nOiB0U3BvdC5jb29yLmxuZyoxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHRNYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOmxhdGxuZyxcclxuICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogaWR4LnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnRhcmdldC5wdXNoKHRNYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgLy/rs7jrqoXsnLzroZwg7ZWc6riA66qFIOyYgeyWtOuqheydtCDsl4bsnYQg6rK97Jqw66W8IOyytO2BrO2VtOyEnCDrhKPslrTspIDri6QuXHJcbiAgICAgICAgICAgIGlmKCQoXCIjbmFtZV9rb1wiKS52YWwoKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYW1lX2tvXCIpLnZhbCh0U3BvdC5uYW1lLmtvKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCQoXCIjbmFtZV9lblwiKS52YWwoKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYW1lX2VuXCIpLnZhbCh0U3BvdC5uYW1lLmVuKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY29tYmluZV9fdGFyZ2V0X19kaXZcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiY29tYmluZV9fdGFyZ2V0X19udW1iZXJcIj4nK2lkeCsnPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cImNvbWJpbmVfX3RhcmdldF9fY2hlY2tcIiBzaWQ9XCInK3NpZCsnXCI+PC9kaXY+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNvbWJpbmVfX3RhcmdldF9fbmFtZVwiPicrdFNwb3QubmFtZS5rbytcIiBcIit0U3BvdC5uYW1lLmVuKyc8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmNvbWJpbmVfX3RhcmdldFwiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbnVhbENvbWJpbmU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9tYW51YWxDb21iaW5lLmpzIiwidmFyIFZlcmlmeSA9IHtcclxuICAgIGRhdGE6e30sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLnZlcmlmeWluZ19fYm94XCIpLm9uKFwiY2xpY2tcIiwgXCIucmVzdWx0X3JhbmtcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5jaGVjaygkKHRoaXMpKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChcIiN2ZXJpZnlpbmdfX2NvbnRyb2xfX21lcmdlXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQubWVyZ2UoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCIjdmVyaWZ5aW5nX19jb250cm9sX19yZW1vdmVcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5yZW1vdmVBbGwoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlQWxsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGNvbmZpcm0oXCLsoJzqsbDtlaDquYzsmpQ/XCIpKXtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLnJlc3VsdF9yYW5rLnNlbGVjdGVkXCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlkID0gJChcIi5yZXN1bHRfcmFuay5zZWxlY3RlZFwiKS5lcShpKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhW3RpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJChcIi52ZXJpZnlpbmdfX2NvbnRyb2xcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIikrXCIvc3BvdHMvY29tYmluZWRcIikuc2V0KHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMucmFuaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG1lcmdlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCQoXCIucmVzdWx0X3Jhbmsuc2VsZWN0ZWRcIikubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICBsZXQgc2lkID0gJChcIi5yZXN1bHRfcmFuay5zZWxlY3RlZFwiKS5lcSgwKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIGxldCBtYWluRGF0YSA9IHRoaXMuZGF0YVtzaWRdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAkKFwiLnJlc3VsdF9yYW5rLnNlbGVjdGVkXCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlkID0gJChcIi5yZXN1bHRfcmFuay5zZWxlY3RlZFwiKS5lcShpKS5wYXJlbnQoKS5hdHRyKFwiaWRcIilcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXREYXRhID0gdGhpcy5kYXRhW3RpZF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7J2YIHJhbmvrpbwgbWFpbmREYXRh7J2YIHJhbmvroZwg7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiB0YXJnZXREYXRhLnJhbmspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihtYWluRGF0YS5yYW5rW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobWFpbkRhdGEucmFua1tzaXRlXSA+IHRhcmdldERhdGEucmFua1tzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS5yYW5rW3NpdGVdID0gdGFyZ2V0RGF0YS5yYW5rW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5EYXRhLnJhbmtbc2l0ZV0gPSB0YXJnZXREYXRhLnJhbmtbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8v7ZWp7LOQ7KeIIOuMgOyDgeydmCDtg5zqt7jrpbwgbWFpbkRhdGHsnZggdGFn66GcIO2Gte2Vqe2VmOuKlCDsnpHsl4VcclxuICAgICAgICAgICAgICAgIGlmKHRhcmdldERhdGEudGFnKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRhcmdldERhdGEudGFnLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1haW5EYXRhLnRhZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighbWFpbkRhdGEudGFnLmluY2x1ZGVzKHRhcmdldERhdGEudGFnW2pdKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnLnB1c2godGFyZ2V0RGF0YS50YWdbal0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnID0gdGFyZ2V0RGF0YS50YWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL+2VqeyzkOyniCDrjIDsg4Hsl5DqsowgdXJs7J20IOyeheugpeuQmOyWtCDsnojri6TrqbQgbWFpbkRhdGHsl5Ag7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICAgICAgaWYoIW1haW5EYXRhLnVybCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGFyZ2V0RGF0YS51cmwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS51cmwgPSB0YXJnZXREYXRhLnVybDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YVt0aWRdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNvbmZpcm0oXCLrs5HtlantlaDquYzsmpQ/XCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnZlcmlmeWluZ19fY29udHJvbFwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiKyQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpK1wiL3Nwb3RzL2NvbWJpbmVkXCIpLnNldCh0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFuaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi7ISg7YOd65CcIOq0gOq0keyngOqwgCDtlZjrgpjsnoXri4jri6RcIilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrOiBmdW5jdGlvbihkaXYpe1xyXG4gICAgICAgIGRpdi50b2dnbGVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgIGxldCBzaWQgPSBkaXYucGFyZW50KCkuYXR0cihcImlkXCIpO1xyXG5cclxuICAgICAgICBpZigkKFwiLnJlc3VsdF9yYW5rLnNlbGVjdGVkXCIpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgJChcIi52ZXJpZnlpbmdfX2NvbnRyb2xcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJChcIi52ZXJpZnlpbmdfX2NvbnRyb2xcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJhbms6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgbWF4U2NvcmU6IDIwMCwgIC8vMeychOuKlCAyMDDsoJAgfiAxODDsnITripQgMjDsoJBcclxuICAgICAgICAgICAgb25lTWludXM6LTYwMCwgIC8vMeqwnCDsgqzsnbTtirjsl5Drp4wg7IaM6rCc65CcIOq0gOq0keyngOydvCDqsr3smrAg7LCo6rCQ65CY64qUIOygkOyImFxyXG4gICAgICAgICAgICB0d29NdW51czotMzAwLCAvLzLqsJwg7IKs7J207Yq47JeQ66eMIOyGjOqwnOuQnCDqtIDqtJHsp4Dsnbwg6rK97JqwIOywqOqwkOuQmOuKlCDsoJDsiJhcclxuICAgICAgICAgICAgbnZBZGQ6MTAwICAvL+uEpOydtOuyhOyXkOunjCDshozqsJzrkJwg6rSA6rSR7KeA7J28IOqyveyasCDrtoDsl6zrkJjripQg7LaU6rCA7KCQXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByYW5rQXJyYXkgPSBbXTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXHJcblxyXG4gICAgICAgIGZvciAodmFyIHNpZCBpbiB0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSB0aGlzLmRhdGFbc2lkXTtcclxuICAgICAgICAgICAgc3BvdC5zaWQgPSBzaWQ7XHJcbiAgICAgICAgICAgIGxldCBudW1TaXRlID0gT2JqZWN0LmtleXMoc3BvdC5yYW5rKS5sZW5ndGg7IC8v65Ox7J6s65CcIOyCrOydtO2KuCDqsK/siJhcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMFxyXG4gICAgICAgICAgICBsZXQgYXZnID0gMFxyXG4gICAgICAgICAgICBsZXQgYmVzdFJhbmsgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEpLmxlbmd0aCArIDUwIC8v6rCA7J6lIOuGkuydgCjsiKvsnpDroZzshJwg64Ku7J2AKSDrnq3tgrnsnbQg67aA7Jes65CcIOyCrOydtO2KuCDrnq3tgrlcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHNpdGUgaW4gc3BvdC5yYW5rKSB7XHJcbiAgICAgICAgICAgICAgICBpZihiZXN0UmFuaz5zcG90LnJhbmtbc2l0ZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RSYW5rID0gc3BvdC5yYW5rW3NpdGVdIC8vYmVzdFJhbmvrpbwg6rCx7Iug7ZWc64ukXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihzcG90LnJhbmtbc2l0ZV08T2JqZWN0LmtleXModGhpcy5kYXRhKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7JiIIC0g6rSA6rSR7KeA6rCAIDEwMOychOyduOuNsCDroaDrpqztlIzrnpjri5vsl5DshJwgMTAz7JyEIOyGjOqwnCAtPiDsl4bripQg6rKDIOy3qOq4iVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlKz0gKGNvbmZpZy5tYXhTY29yZSAtIHNwb3QucmFua1tzaXRlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZnKz0gKGNvbmZpZy5tYXhTY29yZSAtIHNwb3QucmFua1tzaXRlXSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihudW1TaXRlPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1TaXRlLS07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNjb3JlLT0gYmVzdFJhbmsqNTtcclxuICAgICAgICAgICAgYXZnID0gYXZnIC8gbnVtU2l0ZTtcclxuXHJcbiAgICAgICAgICAgIHNjb3JlKz0gYXZnKjI1O1xyXG5cclxuICAgICAgICAgICAgaWYobnVtU2l0ZSA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSBjb25maWcub25lTWludXM7XHJcbiAgICAgICAgICAgICAgICBpZihzcG90LnJhbmsubnYpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlKz0gY29uZmlnLm52QWRkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG51bVNpdGUgPT09IDIpe1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gY29uZmlnLnR3b011bnVzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByYW5rQXJyYXkucHVzaCh7c2lkOnNpZCxzY29yZTpzY29yZX0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYW5rQXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuc2NvcmUgPiBiLnNjb3JlID8gLTEgOiBhLnNjb3JlIDwgYi5zY29yZSA/IDEgOiAwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcblxyXG4gICAgICAgIHZhciBzcG90QXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5rQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGFcclxuXHJcbiAgICAgICAgICAgIHNwb3RBcnJheS5wdXNoKHRoaXMuZGF0YVtyYW5rQXJyYXlbaV0uc2lkXSlcclxuXHJcbiAgICAgICAgICAgIGxldCBzaWQgPSByYW5rQXJyYXlbaV0uc2lkO1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gXCJcIlxyXG4gICAgICAgICAgICBpZihkYXRhW3NpZF0udXJsKXtcclxuICAgICAgICAgICAgICAgIHVybCA9IGRhdGFbc2lkXS51cmxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmFua2luZyA9IHtcclxuICAgICAgICAgICAgICAgIGdnOlwiXCIsXHJcbiAgICAgICAgICAgICAgICBudjpcIlwiLFxyXG4gICAgICAgICAgICAgICAgbHA6XCJcIixcclxuICAgICAgICAgICAgICAgIHRhOlwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBzaXRlIGluIGRhdGFbc2lkXS5yYW5rKSB7XHJcbiAgICAgICAgICAgICAgICByYW5raW5nW3NpdGVdID0gZGF0YVtzaWRdLnJhbmtbc2l0ZV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwicmVzdWx0X2JveFwiIGlkPVwiJytzaWQrJ1wiPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJyZXN1bHRfcmFua1wiPicrKGkrMSkrJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8aW5wdXQgY2xhc3M9XCJyZXN1bHRfbmFtZVwiIHZhbHVlPVwiJytkYXRhW3NpZF0ubmFtZS5rbytcIi0tXCIrZGF0YVtzaWRdLm5hbWUuZW4rJ1wiPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPGlucHV0IGNsYXNzPVwicmVzdWx0X3VybFwiIHZhbHVlPVwiJyt1cmwrJ1wiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwicmVzdWx0X2dnXCI+JytyYW5raW5nLmdnKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJyZXN1bHRfbnZcIj4nK3JhbmtpbmcubnYrJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInJlc3VsdF9scFwiPicrcmFua2luZy5scCsnPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwicmVzdWx0X3RhXCI+JytyYW5raW5nLnRhKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJyZXN1bHRfc2F2ZSBzYXZlX3Nwb3RcIj7soIDsnqU8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJyZXN1bHRfcmVtb3ZlIHJlbW92ZV9zcG90XCI+7IKt7KCcPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgJChcIi52ZXJpZnlpbmdfX2JveFwiKS5odG1sKHR4dClcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrJCgnLmNpdHlOYW1lJykuYXR0cignaWQnKStcIi9zcG90cy9yYW5rZWRcIikuc2V0KHNwb3RBcnJheSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc3BvdEFycmF5KVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgJChcIi5zcG90X19wYWdlXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5zcG90X19wYWdlLnZlcmlmeWluZ1wiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuaGVhZGVyX19zdGF0dXNcIikuaHRtbChcIuq0gOq0keyngCAy7LCoIOqygOymnVwiKTtcclxuXHJcbiAgICAgICAgaWYoIWRhdGEucmFua2VkKXtcclxuICAgICAgICAgICAgdGhpcy5yYW5rKCk7Ly/rnq3tgrkg642w7J207YSw6rCAIOyXhuycvOuptCDrp4zrk6Dri6RcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b2xvP1wiKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnJhbmtlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmVyaWZ5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvc3BvdC92ZXJpZnlpbmcuanMiLCJsZXQgSG90ZWwgPSB7XHJcbiAgICBkYXRhOiB7fSxcclxuICAgIGNpdHk6IFwiXCIsXHJcbiAgICBjaXR5TmFtZTogXCJcIixcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaWQsIG5hbWUpe1xyXG4gICAgICAgICQoXCIuY2l0eU5hbWVcIikuaHRtbChuYW1lKS5hdHRyKFwiaWRcIiwgY2lkKTtcclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuaG90ZWxcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2l0eSA9IGNpZDtcclxuICAgICAgICB0aGlzLmNpdHlOYW1lID0gbmFtZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG5cclxuICAgICAgICB0aGlzLnNjb3JlKCk7XHJcbiAgICAgICAgLy/soJDsiJgg67aA7Jes66W8IOyLpOyLnO2VnOuLpC5cclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHN0YXR1cyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZih0aGlzLmRhdGEuc3RhdHVzKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuZGF0YS5zdGF0dXMuaG90ZWxzKXtcclxuICAgICAgICAgICAgICAgIC8vc3RhdXRz64qUIOyeiOuKlOuNsCDtmLjthZTsl5Ag64yA7ZWcIHN0YXR1cyDrjbDsnbTthLDqsIAg7JeG7Jy866m0IOunjOuTpOyWtCDrhKPripTri6QuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RhdHVzLmhvdGVscyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNhZmV0eTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjaWxpdHk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvc3RFZmY6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gc3RhdHVzIOuNsOydtO2EsCDsnpDssrTqsIAg7JeG7Jy866m0IOunjOuTpOyWtCDrhKPripTri6QuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICBob3RlbHM6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2FmZXR5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBmYWNpbGl0eTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY29zdEVmZjogZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdHVzID0gdGhpcy5kYXRhLnN0YXR1cy5ob3RlbHM7XHJcblxyXG4gICAgICAgIC8v7KCQ7IiYIOyytOqzhOqwgCDsmYTshLHrkJjslrTsnojripTsp4Ag6rKA7IKs7ZWY6rOgIOyXhuycvOuptCDsoJDsiJjrpbwg67aA7Jes7ZWY64qUIO2VqOyImOulvCDsi6TtlontlZzri6RcclxuICAgICAgICBpZihzdGF0dXMudHJhbnNwb3J0KXtcclxuICAgICAgICAgICAgJChcIiNzdGF0dXNfdHJhbnNwb3J0XCIpLmh0bWwoXCLsoJXrs7TqsIAg7KG07J6s7ZWp64uI64ukLlwiKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEubWV0cm8mJnRoaXMuZGF0YS5tZXRyb0xpbmUpe1xyXG4gICAgICAgICAgICAgICAgJChcIiNzdGF0dXNfdHJhbnNwb3J0XCIpLmh0bWwoXCLrjIDspJHqtZDthrUg7KCV67O0IOuwnOqyrC4g6rWQ7Ya1IO2OuOydmOyEseydhCDqs4TsgrDtlanri4jri6QuXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlX3RyYW5zcG9ydCgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIjc3RhdHVzX3RyYW5zcG9ydFwiKS5odG1sKFwi64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsnoXroKXrkJjsp4Ag7JWK7JWEIOq1kO2GtSDtjrjsnZjshLHsnYQg6rOE7IKw7ZWgIOyImCDsl4bsirXri4jri6QuIOuNsOydtO2EsOulvCDsnoXroKXtlbTso7zshLjsmpQuXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHN0YXR1cy5zYWZldHkpe1xyXG4gICAgICAgICAgICAkKFwiI3N0YXR1c19zYWZldHlcIikuaHRtbChcIuygleuztOqwgCDsobTsnqztlanri4jri6QuXCIpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmVfc2FmZXR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzdGF0dXMuZmFjaWxpdHkpe1xyXG4gICAgICAgICAgICAkKFwiI3N0YXR1c19mYWNpbGl0eVwiKS5odG1sKFwi7KCV67O06rCAIOyhtOyerO2VqeuLiOuLpC5cIilcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zY29yZV9mYWNpbGl0eSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdGF0dXMuY29zdEVmZil7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmVfZmFjaWxpdHk6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XHJcblxyXG4gICAgICAgIHZhciBzY29yZUFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiBkYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSBkYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICB2YXIgYXRtID0gaG90ZWwubG9jYWwuYXRtO1xyXG5cclxuICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5jb252ZW5pZW5jZSA9IHtcclxuICAgICAgICAgICAgICAgIHNjb3JlOjBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGxvY2FsU2NvcmUgPSBob3RlbC5hc3Nlc3NtZW50LmNvbnZlbmllbmNlLnNjb3JlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdyb2NlcnlTY29yZSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBjaXRpU2NvcmUgPSAwO1xyXG4gICAgICAgICAgICB2YXIgYXRtU2NvcmUgPSAwO1xyXG5cclxuICAgICAgICAgICAgaG90ZWwuZXhwbGFpbi5sb2NhbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN1bW1hcnkgPSAnJztcclxuICAgICAgICAgICAgdmFyIGdyb2NlcnlUeHQgPSAnJ1xyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwuZ3JvY2VyeSl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5ncm9jZXJ5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEtYjtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGdyb2Nlcnk3NSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGdyb2NlcnkxNTAgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhciBncm9jZXJ5MjI1ID0gW107XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3JvY2VyeTMwMCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGxvY2FsU2NvcmUgKz0gTWF0aC5tYXgoKDIwMCAtIGhvdGVsLmxvY2FsLmdyb2NlcnlbMF0pLzYwLCAwKVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaG90ZWwubG9jYWwuZ3JvY2VyeS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWYgPSBob3RlbC5sb2NhbC5ncm9jZXJ5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRpZjw3NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb2Nlcnk3NS5wdXNoKGRpZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTY29yZSs9MC4xXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRpZjwxNTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5MTUwLnB1c2goZGlmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFNjb3JlKz0wLjAyNVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihkaWY8MjI1KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeTIyNS5wdXNoKGRpZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTY29yZSs9MC4wMDVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlmPDMwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb2NlcnkzMDAucHVzaChkaWYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU2NvcmUrPTAuMDAwMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBncm9jZXJ5U2NvcmUrPSAoNDAwIC0gaG90ZWwubG9jYWwubmVhcmVzdC5ncm9jZXJ5KS8yXHJcbiAgICAgICAgICAgICAgICBncm9jZXJ5U2NvcmUrPWdyb2Nlcnk3NS5sZW5ndGgqMztcclxuICAgICAgICAgICAgICAgIGdyb2NlcnlTY29yZSs9Z3JvY2VyeTE1MC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBncm9jZXJ5U2NvcmUrPWdyb2NlcnkyMjUubGVuZ3RoLzI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwubmVhcmVzdC5ncm9jZXJ5PDYwKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyb2NlcnlUaW1lID0gKE1hdGgucm91bmQoaG90ZWwubG9jYWwubmVhcmVzdC5ncm9jZXJ5LzE0KSsxKSoxMFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQrPSAnPHN0cm9uZz4nKyBncm9jZXJ5VGltZSsn7LSIIOqxsOumrDwvc3Ryb25nPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ3JvY2VyeTc1Lmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeVR4dCs9ICfsnZgg6rCA7J6lIOqwgOq5jOyatCDsi53ro4ztkojsoJDsnYQg7Y+s7ZWo7ZW0IDxzdHJvbmc+64uoIDHrtoQg6rGw66as7JeQICcrZ3JvY2VyeTc1Lmxlbmd0aCsn6rCcPC9zdHJvbmc+7J2YIOyLneujjO2SiOygkCDsnITsuZguJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGdyb2NlcnkxNTAubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0Kz0gJ+ydmCDqsIDsnqUg6rCA6rmM7Jq0IOyLneujjO2SiOygkOydhCDtj6ztlajtlbQgPHN0cm9uZz4y67aEIOqxsOumrOyXkCAnK2dyb2NlcnkxNTAubGVuZ3RoKyfqsJw8L3N0cm9uZz7snZgg7Iud66OM7ZKI7KCQ7J20IOychOy5mC4nXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoZ3JvY2VyeTIyNS5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQrPSAn7J2YIOqwgOyepSDqsIDquYzsmrQg7Iud66OM7ZKI7KCQ7J2EIO2PrO2VqO2VtCA8c3Ryb25nPjPrtoQg6rGw66as7JeQICcrZ3JvY2VyeTIyNS5sZW5ndGgrJ+qwnDwvc3Ryb25nPuydmCDsi53ro4ztkojsoJDsnbQg7JyE7LmYLidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeVR4dCs9ICfsl5Ag6rCA7J6lIOqwgOq5jOyatCDsi53ro4ztkojsoJDsnbQg7JyE7LmYJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGdyb2Nlcnk3NS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeVR4dCs9ICc8c3Ryb25nPjHrtoQg6rGw66asPC9zdHJvbmc+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihncm9jZXJ5MTUwLmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeVR4dCs9ICfsnZgg6rCA7J6lIOqwgOq5jOyatCDsi53ro4ztkojsoJDsnYQg7Y+s7ZWo7ZW0IDxzdHJvbmc+Muu2hCDqsbDrpqzsl5AgJytncm9jZXJ5MTUwLmxlbmd0aCsn6rCcPC9zdHJvbmc+7J2YIOyLneujjO2SiOygkOydtCDsnITsuZguJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGdyb2NlcnkyMjUubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0Kz0gJ+ydmCDqsIDsnqUg6rCA6rmM7Jq0IOyLneujjO2SiOygkOydhCDtj6ztlajtlbQgPHN0cm9uZz4z67aEIOqxsOumrOyXkCAnK2dyb2NlcnkyMjUubGVuZ3RoKyfqsJw8L3N0cm9uZz7snZgg7Iud66OM7ZKI7KCQ7J20IOychOy5mC4nXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQrPSAn7JeQIOqwgOyepSDqsIDquYzsmrQg7Iud66OM7ZKI7KCQ7J20IOychOy5mCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihncm9jZXJ5MTUwLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0Kz0gJzxzdHJvbmc+Muu2hCDqsbDrpqw8L3N0cm9uZz4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdyb2NlcnkyMjUubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0Kz0gJ+ydmCDqsIDsnqUg6rCA6rmM7Jq0IOyLneujjO2SiOygkOydhCDtj6ztlajtlbQgPHN0cm9uZz4z67aEIOqxsOumrOyXkCAnK2dyb2NlcnkyMjUubGVuZ3RoKyfqsJw8L3N0cm9uZz7snZgg7Iud66OM7ZKI7KCQ7J20IOychOy5mC4nXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoZ3JvY2VyeTMwMC5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQrPSAn7J2YIOqwgOyepSDqsIDquYzsmrQg7Iud66OM7ZKI7KCQ7J2EIO2PrO2VqO2VtCA8c3Ryb25nPjTrtoQg6rGw66as7JeQICcrZ3JvY2VyeTMwMC5sZW5ndGgrJ+qwnDwvc3Ryb25nPuydmCDsi53ro4ztkojsoJDsnbQg7JyE7LmYLidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeVR4dCs9ICfsl5Ag6rCA7J6lIOqwgOq5jOyatCDsi53ro4ztkojsoJDsnbQg7JyE7LmYJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGdyb2NlcnkyMjUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQrPSAnPHN0cm9uZz4z67aEIOqxsOumrDwvc3Ryb25nPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ3JvY2VyeTMwMC5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQrPSAn7J2YIOqwgOyepSDqsIDquYzsmrQg7Iud66OM7ZKI7KCQ7J2EIO2PrO2VqO2VtCA8c3Ryb25nPjTrtoQg6rGw66as7JeQICcrZ3JvY2VyeTMwMC5sZW5ndGgrJ+qwnDwvc3Ryb25nPuydmCDsi53ro4ztkojsoJDsnbQg7JyE7LmYLidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeVR4dCs9ICfsl5Ag6rCA7J6lIOqwgOq5jOyatCDsi53ro4ztkojsoJDsnbQg7JyE7LmYJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmdyb2NlcnkubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5VHh0Kz0gJzxzdHJvbmc+Neu2hCDqsbDrpqzsl5AgJysgaG90ZWwubG9jYWwuZ3JvY2VyeS5sZW5ndGggKyAn6rCcPC9zdHJvbmc+7J2YIOyLneujjO2SiOygkOydtCDsnITsuZgnXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQrPSAn6rCA7J6lIOqwgOq5jOyatCDsi53ro4ztkojsoJDsnbQgNeu2hOqxsOumrOyXkCDsnITsuZgnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4ubG9jYWwucHVzaChncm9jZXJ5VHh0KVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGdyb2NlcnlTY29yZT4yMTApe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQgPSAn6rCA67ON6rOgIOyggOugtO2VmOqyjCDslYTsuajsi53sgqzrpbwg7ZW06rKw7ZWY6rGw64KYIOqwhOuLqO2VnCDsmpTquLDqsbDrpqzrpbwg7IKs7IScIOyggOuFgeyXkCDsiJnshozroZwg64+M7JWE7Jik6riwIOq1ieyepe2eiCDtjrjrpqztlaguJ1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4ubG9jYWwucHVzaChncm9jZXJ5VHh0KVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoZ3JvY2VyeVNjb3JlPjE4MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeVR4dCA9ICfqsIDrs43qs6Ag7KCA66C07ZWY6rKMIOyVhOy5qOyLneyCrOulvCDtlbTqsrDtlZjqsbDrgpgg6rCE64uo7ZWcIOyalOq4sOqxsOumrOulvCDsgqzshJwg7KCA64WB7JeQIOyImeyGjOuhnCDrj4zslYTsmKTquLAg7Y6466as7ZWoLidcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5leHBsYWluLmxvY2FsLnB1c2goZ3JvY2VyeVR4dClcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGhvdGVsLmxvY2FsLm5lYXJlc3QuZ3JvY2VyeTwyMjUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQgPSAn6rCA67ON6rOgIOyggOugtO2VmOqyjCDslYTsuajsi53sgqzrpbwg7ZW06rKw7ZWY6rGw64KYIOqwhOuLqO2VnCDsmpTquLDqsbDrpqzrpbwg7IKs7IScIOyggOuFgeyXkCDsiJnshozroZwg64+M7JWE7Jik6riwIO2OuOumrO2VnCDtjrguJ1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4ubG9jYWwucHVzaChncm9jZXJ5VHh0KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGdyb2NlcnlUeHQgKz0gJ+yImeyGjCDso7zrs4Dsl5Ag7Iud66OM7ZKI7KCQ7J20IOyXhuyWtCDsobDquIgg67aI7Y647ZWgIOyImCDsnojsnYwuJ1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuZXhwbGFpbi5sb2NhbC5wdXNoKGdyb2NlcnlUeHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIG9wZW4yNENpdGlBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYoYXRtLmNpdGkpe1xyXG4gICAgICAgICAgICAgICAgYXRtLmNpdGkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5kaWY8Yi5kaWYgPyAtMSA6IGEuZGlmID5iLmRpZiA/IDEgOiAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdmFyIGNpdGlkaWYgPSBhdG0uY2l0aVswXS5kaWY7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdG0uY2l0aS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF0bS5jaXRpW2ldLm9wZW5Ib3VyID09PSAnT3BlbiAyNCBob3VycyBhIGRheScpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuMjRDaXRpQXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6YXRtLmNpdGlbaV0uZGlmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzczphdG0uY2l0aVtpXS5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcjphdG0uY2l0aVtpXS5jb29yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9wZW4yNENpdGlBcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLmRpZiA+IGIuZGlmID8gMSA6IGEuZGlmIDwgYi5kaWYgPyAtMSA6IDBcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNpdGlXb3JkID0gJydcclxuXHJcbiAgICAgICAgICAgICAgICBpZihjaXRpZGlmPDYwKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihvcGVuMjRDaXRpQXJyYXkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWluID0gTWF0aC5mbG9vcihvcGVuMjRDaXRpQXJyYXlbMF0uZGlmLzc1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0aWRpZiA9PT0gb3BlbjI0Q2l0aUFycmF5WzBdLmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzI07Iuc6rCEIOyYpO2UiO2VmOuKlCDslKjti7BBVE3snbQgMeu2hOqxsOumrFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTY29yZSs9IDAuNzU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXRpV29yZCs9ICcyNOyLnOqwhCDsmrTsmIHtlZjripQg7JSo7Yuw7J2A7ZaJIEFUTeydtCA8c3Ryb25nPuuPhOuztCDri6ggMeu2hOqxsOumrDwvc3Ryb25nPuyXkCDsnojslrQg64qm7J2AIOyLnOqwhOq5jOyngCDslYjsoITtlZjqsowg7ZiE6riI7J247LacIOqwgOuKpSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzHrtoTqsbDrpqzsl5Ag7JSo7YuwQVRNLiDstpTqsIDroZwgMjTsi5zqsIQg7Jik7ZSI7ZWY64qUIEFUTeydtCDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU2NvcmUrPSAwLjU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXRpV29yZCs9ICfslKjti7DsnYDtlokgQVRN7J20IDxzdHJvbmc+64+E67O0IOuLqCAx67aE6rGw66asPC9zdHJvbmc+7JeQIOyeiOqzoCwgJyArIChtaW4rMSkgKyAnficgKyAobWluKzIpKyfrtoQg6rGw66as7JeQIDI07Iuc6rCEIOyatOyYge2VmOuKlCDslKjti7AgQVRN7J20IOyeiOyWtCDriqbsnYAg7Iuc6rCE6rmM7KeAIOu5hOq1kOyggSDslYjsoITtlZjqsowg7ZiE6riIIOyduOy2nCDqsIDriqUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/slKjti7BBVE3snbQgMeu2hOqxsOumrFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXRpV29yZCArPSAn7JSo7Yuw7J2A7ZaJIEFUTeydtCA8c3Ryb25nPuuPhOuztCDri6ggMeu2hOqxsOumrDwvc3Ryb25nPuyXkCDsnojslrQg7JSo7Yuw7Lm065OcIOydtOyaqeyekOuKlCDqtYnsnqXtnogg7Y6466as7ZWY6rKMIO2YhOq4iOyduOy2nCDqsIDriqUnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNpdGlkaWY8MTUwKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihvcGVuMjRDaXRpQXJyYXkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWluID0gTWF0aC5mbG9vcihvcGVuMjRDaXRpQXJyYXlbMF0uZGlmLzc1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0aWRpZiA9PT0gb3BlbjI0Q2l0aUFycmF5WzBdLmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzI07Iuc6rCEIOyYpO2UiO2VmOuKlCDslKjti7BBVE3snbQgMuu2hOqxsOumrFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTY29yZSs9IDAuNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdGlXb3JkKz0gJzI07Iuc6rCEIOyatOyYge2VmOuKlCDslKjti7DsnYDtlokgQVRN7J20IDxzdHJvbmc+64+E67O0IOuLqCAyfjPrtoTqsbDrpqw8L3N0cm9uZz7sl5Ag7J6I7Ja0IOuKpuydgCDsi5zqsITquYzsp4Ag67mE6rWQ7KCBIOyViOyghO2VmOqyjCDtmITquIjsnbjstpwg6rCA64qlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMn4z67aE6rGw66as7JeQIOyUqO2LsEFUTS4g7LaU6rCA66GcIDI07Iuc6rCEIOyYpO2UiO2VmOuKlCBBVE3snbQg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXRpV29yZCs9ICfslKjti7DsnYDtlokgQVRN7J20IDxzdHJvbmc+64+E67O0IDJ+M+u2hOqxsOumrDwvc3Ryb25nPuyXkCDsnojqs6AsICcgKyAobWluKzEpICsgJ34nICsgKG1pbisyKSsn67aEIOqxsOumrOyXkCAyNOyLnOqwhCDsmrTsmIHtlZjripQg7JSo7YuwIEFUTeydtCDsnojslrQg64qm7J2AIOyLnOqwhOq5jOyngCDruYTqtZDsoIEg7JWI7KCE7ZWY6rKMIO2YhOq4iCDsnbjstpwg6rCA64qlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v7JSo7YuwQVRN7J20IDJ+M+u2hOqxsOumrFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXRpV29yZCArPSAn7JSo7Yuw7J2A7ZaJIEFUTeydtCA8c3Ryb25nPuuPhOuztCAyfjPrtoTqsbDrpqw8L3N0cm9uZz7sl5Ag7J6I7Ja0IOyUqO2LsOy5tOuTnCDsnbTsmqnsnpDqsIAg7Y6466as7ZWY6rKMIO2YhOq4iOyduOy2nCDqsIDriqUnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2l0aWRpZjwyMjUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG9wZW4yNENpdGlBcnJheS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtaW4gPSBNYXRoLmZsb29yKG9wZW4yNENpdGlBcnJheVswXS5kaWYvNzUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaXRpZGlmID09PSBvcGVuMjRDaXRpQXJyYXlbMF0uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMjTsi5zqsIQg7Jik7ZSI7ZWY64qUIOyUqO2LsEFUTeydtCA0fjXrtoTqsbDrpqxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdGlXb3JkKz0gJzI07Iuc6rCEIOyatOyYge2VmOuKlCDslKjti7DsnYDtlokgQVRN7J20IDxzdHJvbmc+64+E67O0IDR+Neu2hOqxsOumrDwvc3Ryb25nPuyXkCDsnojslrQg67mE6rWQ7KCBIO2OuOumrO2VmOqyjCDtmITquIjsnbjstpwg6rCA64qlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vNH4167aE6rGw66as7JeQIOyUqO2LsEFUTS4g7LaU6rCA66GcIDI07Iuc6rCEIOyYpO2UiO2VmOuKlCBBVE3snbQg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXRpV29yZCs9ICfslKjti7DsnYDtlokgQVRN7J20IDxzdHJvbmc+64+E67O0IDR+Neu2hOqxsOumrDwvc3Ryb25nPuyXkCDsnojqs6AsIOuPhOuztOuhnCDqsbjslrTqsIgg66eM7ZWcIOqxsOumrOyXkCAyNOyLnOqwhCDsmrTsmIHtlZjripQg7JSo7YuwIEFUTeydtCDsnojsnYwnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8yNOyLnOqwhCDsmKTtlIjtlZjripQg7JSo7YuwQVRN7J20IDJ+M+u2hOqxsOumrFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXRpV29yZCArPSAn7JSo7Yuw7J2A7ZaJIEFUTeydtCDrj4Trs7QgNH4167aE6rGw66as7JeQIOyeiOyWtCDslKjti7DsubTrk5wg7J207Jqp7J6Q6rCAIO2YhOq4iCDsnbjstpwg6rCA64qlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjaXRpV29yZCArPSAn7JSo7Yuw7J2A7ZaJIEFUTeydtCDrj4Trs7QgNH4167aE6rGw66as7JeQIOyeiOyWtCDslKjti7DsubTrk5wg7J207Jqp7J6Q6rCAIO2YhOq4iCDsnbjstpwg6rCA64qlJ1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2l0aVdvcmQgKz0gJ+yUqO2LsOydgO2WiSBBVE3snbQg64+E67O066GcIOqxuOyWtOqwiCDrp4ztlZwg6rGw66as7JeQIOychOy5mO2VqCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4ubG9jYWwucHVzaChjaXRpV29yZCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKGF0bS52aXNhKXtcclxuICAgICAgICAgICAgICAgIHZhciB2aXNhQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhciBiYW5rQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXRtLnZpc2EubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihhdG0udmlzYVtpXS5vcGVuSG91cil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGF0bS52aXNhW2ldLm9wZW5Ib3VyID09PSAnQScgJiYgYXRtLnZpc2FbaV0uZGlmPDI0MCAmJiBhdG0udmlzYVtpXS5wbGFjZU5hbWUuaW5jbHVkZXMoJ0JBTksnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNhQXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzczphdG0udmlzYVtpXS5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6YXRtLnZpc2FbaV0uY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOmF0bS52aXNhW2ldLnBsYWNlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6YXRtLnZpc2FbaV0uZGlmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB2aXNhTWluID0gMFxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHZpc2FBcnJheS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpc2FXb3JkID0gJydcclxuICAgICAgICAgICAgICAgICAgICB2aXNhTWluID0gTWF0aC5mbG9vcih2aXNhQXJyYXlbMF0uZGlmLzc1KSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTY29yZSArPSBNYXRoLm1heCgoMjUwIC0gdmlzYUFycmF5WzBdLmRpZikvMTIwLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2FXb3JkKz0nMjTsi5zqsIQg7Jq07JiB7ZWY64qUIOydgO2WiSDshozsho0gVklTQSwgTUFTVEVSQ0FSRCDsoJztnLQgQVRN7J20ICcgKyB2aXNhTWluICsgJ34nICsgKHZpc2FNaW4rMSkrICfrtoQg6rGw66as7JeQIOyeiOyWtCDriqbsnYAg7Iuc6rCE6rmM7KeAIO2OuOumrO2VmOqyjCDstpzquIgg6rCA64qlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5leHBsYWluLmxvY2FsLnB1c2godmlzYVdvcmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsb2NhbFNjb3JlID0gTWF0aC5taW4oTWF0aC5yb3VuZChsb2NhbFNjb3JlKjEwICsgNDUpLDk5KS8xMDtcclxuICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5jb252ZW5pZW5jZS5zY29yZSA9IGxvY2FsU2NvcmU7XHJcbiAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaCh7aGlkOmhpZCwgc2NvcmU6bG9jYWxTY29yZX0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKGdyb2Nlcnk3NS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBpZih2aXNhTWluKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih2aXNhTWluIDwgMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnk9J+yLneujjO2SiOygkCwgMjTsi5zqsIQg7Jik7ZSIIOydgO2WieyGjOyGjSBBVE0g65Ox7J20IOuqqOuRkCDsiJnshozsl5DshJwg64+E67O0IDF+Muu2hCDqsbDrpqwg64K07JeQIOyeiOyWtCDsl6ztlontlZjquLAg66ek7JqwIO2OuOumrO2VqCdcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih2aXNhTWluIDwgNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnk9J+uPhOuztCAxfjLrtoQg6rGw66as7J2YIOyLneujjO2SiOygkCwgM34067aEIOqxsOumrOydmCAyNOyLnOqwhCDsmKTtlIgg7J2A7ZaJ7IaM7IaNIEFUTSDrk7HsnbQg7IiZ7IaMIOu2gOq3vOyXkCDsnojslrQg7Jes7ZaJ7ZWY6riwIOunpOyasCDtjrjrpqztlagnXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnk9J+yLneujjO2SiOygkOydtCDsiJnshozsl5DshJwg64+E67O066GcIOuLqCAxfjLrtoQg6rGw66as7JeQIOyeiOyWtCDqsITri6jtnogg7Iud7IKs66W8IO2VtOqysO2VmOqxsOuCmCDsoIDrhYHsl5Ag7JqU6rmD6rGw66as66W8IOyCrOyYpOq4sCDtjrjrpqztlagnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeT0n7Iud66OM7ZKI7KCQ7J20IOyImeyGjOyXkOyEnCDrj4Trs7TroZwg64uoIDF+Muu2hCDqsbDrpqzsl5Ag7J6I7Ja0IOqwhOuLqO2eiCDsi53sgqzrpbwg7ZW06rKw7ZWY6rGw64KYIOyggOuFgeyXkCDsmpTquYPqsbDrpqzrpbwg7IKs7Jik6riwIO2OuOumrO2VqCdcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGdyb2NlcnkxNTAubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgaWYodmlzYU1pbil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmlzYU1pbiA8IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5PSfrj4Trs7QgMn4z67aEIOqxsOumrOydmCDsi53ro4ztkojsoJAsIDF+Muu2hCDqsbDrpqzsnZggMjTsi5zqsIQg7Jik7ZSIIOydgO2WieyGjOyGjSBBVE0g65Ox7J20IOyImeyGjCDrtoDqt7zsl5Ag7J6I7Ja0IOyXrO2Wie2VmOq4sCDrp6TsmrAg7Y6466as7ZWoJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHZpc2FNaW4gPCA1KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeT0n7Iud66OM7ZKI7KCQLCAyNOyLnOqwhCDsmKTtlIgg7J2A7ZaJ7IaM7IaNIEFUTSDrk7HsnbQg66qo65GQIOyImeyGjOyXkOyEnCDrj4Trs7QgM34067aEIOqxsOumrCDrgrTsl5Ag7J6I7Ja0IOyXrO2Wie2VmOq4sCDtjrjrpqztlagnXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnk9J+yLneujjO2SiOygkOydtCDsiJnshozsl5DshJwg64+E67O066GcIOuLqCAzfjTrtoQg6rGw66as7JeQIOyeiOyWtCDqsITri6jtnogg7Iud7IKs66W8IO2VtOqysO2VmOqxsOuCmCDsoIDrhYHsl5Ag7JqU6rmD6rGw66as66W8IOyCrOyYpOq4sCDtjrjrpqztlagnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeT0n7Iud66OM7ZKI7KCQ7J20IOyImeyGjOyXkOyEnCDrj4Trs7TroZwg64uoIDN+NOu2hCDqsbDrpqzsl5Ag7J6I7Ja0IOqwhOuLqO2eiCDsi53sgqzrpbwg7ZW06rKw7ZWY6rGw64KYIOyggOuFgeyXkCDsmpTquYPqsbDrpqzrpbwg7IKs7Jik6riwIO2OuOumrO2VqCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYoZ3JvY2VyeTIyNS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBpZih2aXNhTWluKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih2aXNhTWluIDwgMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnk9J+uPhOuztCAxfjLrtoQg6rGw66as7J2YIDI07Iuc6rCEIOyYpO2UiCDsnYDtlonshozsho0gQVRNLCDrj4Trs7QgM34067aEIOqxsOumrOydmCDsi53ro4ztkojsoJAg65Ox7J20IOyImeyGjCDrtoDqt7zsl5Ag7J6I7Ja0IOyXrO2Wie2VmOq4sCDtjrjrpqztlZwg7Y64J1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHZpc2FNaW4gPCA1KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeT0n7Iud66OM7ZKI7KCQLCAyNOyLnOqwhCDsmKTtlIgg7J2A7ZaJ7IaM7IaNIEFUTSDrk7HsnbQg66qo65GQIOyImeyGjOyXkOyEnCDrj4Trs7QgNH4167aEIOqxsOumrCDrgrTsl5Ag7J6I7Ja0IOyXrO2Wie2VmOq4sCDtjrjrpqztlZwg7Y64J1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5PSfsi53ro4ztkojsoJDsnbQg7IiZ7IaM7JeQ7IScIOuPhOuztOuhnCDslb0gNX4267aEIOqxsOumrOyXkCDsnojslrQg6rCE64uo7Z6IIOyLneyCrOulvCDtlbTqsrDtlZjqsbDrgpgg7KCA64WB7JeQIOyalOq5g+qxsOumrOulvCDsgqzsmKTquLAg7Y6466as7ZWoJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnk9J+yLneujjO2SiOygkOydtCDsiJnshozsl5DshJwg64+E67O066GcIOyVvSA1fjbrtoQg6rGw66as7JeQIOyeiOyWtCDqsITri6jtnogg7Iud7IKs66W8IO2VtOqysO2VmOqxsOuCmCDsoIDrhYHsl5Ag7JqU6rmD6rGw66as66W8IOyCrOyYpOq4sCDtjrjrpqztlagnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodmlzYU1pbil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmlzYU1pbiA8IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5PScyNOyLnOqwhCDsmKTtlIgg7J2A7ZaJ7IaM7IaNIEFUTeydtCDsiJnshowgMX4y67aEIOqxsOumrOyXkCDsnojsnYwuIOq3uCDsmbjsnZgg7Y647J2Y7Iuc7ISk7J2AIOu2gOyhse2VnCDtjrguJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHZpc2FNaW4gPCA1KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeT0nMjTsi5zqsIQg7Jik7ZSIIOydgO2WieyGjOyGjSBBVE3snbQg7IiZ7IaMIDN+NOu2hCDqsbDrpqzsl5Ag7J6I7J2MLiDqt7gg7Jm47J2YIO2OuOydmOyLnOyEpOydgCDrtoDsobHtlZwg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeT0n7IiZ7IaMIOu2gOq3vCDtjrjsnZjsi5zshKTsnbQg7J6YIOuwnOuLrOuQmOyngOuKlCDslYrsnYAg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5PSfsiJnshowg67aA6re8IO2OuOydmOyLnOyEpOydtCDsnpgg67Cc64us65CY7KeA64qUIOyViuydgCDtjrguJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBob3RlbC5zdW1tYXJ5LmNvbnZlbmllbmNlID0gc3VtbWFyeTtcclxuXHJcbiAgICAgICAgICAgIHZhciBncm9jZXJ5VGVtcCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwuZ3JvY2VyeSl7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbC5ncm9jZXJ5Lmxlbmd0aD4zKXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5ncm9jZXJ5Lmxlbmd0aCA9IDNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdyb2NlcnlUZW1wID0gaG90ZWwubG9jYWwuZ3JvY2VyeTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaG90ZWwubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICBhdG06IHtcclxuICAgICAgICAgICAgICAgICAgICBjaXRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBvdGhlcjogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBncm9jZXJ5Omdyb2NlcnlUZW1wXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKG9wZW4yNENpdGlBcnJheS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5hdG0uY2l0aSA9IG9wZW4yNENpdGlBcnJheVswXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodmlzYUFycmF5Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmF0bS5vdGhlciA9IHZpc2FBcnJheVswXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaG90ZWwub3RhID0ge1xyXG4gICAgICAgICAgICAgICAgYWdvZGE6e1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXI6aG90ZWwuc3RhcixcclxuICAgICAgICAgICAgICAgICAgICByYXRpbmc6aG90ZWwuZ3JhZGVfYXZnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJldmlld3M6aG90ZWwuZ3JhZGVfbm9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWxldGUgaG90ZWwuc3RhcjtcclxuICAgICAgICAgICAgZGVsZXRlIGhvdGVsLmdyYWRlX2F2ZztcclxuICAgICAgICAgICAgZGVsZXRlIGhvdGVsLmdyYWRlX25vO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzY29yZUFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLnNjb3JlPmIuc2NvcmUgPyAtMSA6IGEuc2NvcmU8Yi5zY29yZSA/IDEgOiAwXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuXHJcblxyXG4gICAgICAgIGRhdGEuc3RhdHVzLmhvdGVscy5mYWNpbGl0eSA9IHRydWU7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpdHkpLnVwZGF0ZShkYXRhKVxyXG5cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzY29yZV9zYWZldHk6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IGNpdHkgPSB0aGlzLmNpdHk7XHJcbiAgICAgICAgbGV0IG9yZGVyQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgdmFyIHNjb3JlV29yZF9jb25uZWN0ID0gW1wi66ek7JqwIOuCmOyBmFwiLFwi66ek7JqwIOuCmOyBmFwiLFwi7KKL7KeAIOyViuycvFwiLFwi7KKL7KeAIOyViuydgCDtjrjsnbRcIixcIuuCmOyBmOyngCDslYrsnYAg7Y647J20XCIsXCLsoovsnYAg7Y647J20XCIsXCLrp6TsmrAg7KKL7J2AIO2OuOydtFwiLFwi66ek7JqwIOyii+ycvFwiXTtcclxuICAgICAgICB2YXIgc2NvcmVXb3JkID0gW1wi66ek7JqwIOuCmOu5oCDsobDsi6ztlbTslbwg7ZWoLlwiLFwi66ek7JqwIOuCmOu5oCDsobDsi6ztlbTslbwg7ZWoLlwiLFwi7KKL7KeAIOyViuydgCDtjrguXCIsXCLsoovsp4Ag7JWK7J2AIO2OuC5cIixcIuuCmOyBmOyngCDslYrsnYAg7Y64LlwiLFwi7KKL7J2AIO2OuC5cIixcIuunpOyasCDsoovsnYAg7Y64LlwiLFwi66ek7JqwIOyii+ydgCDtjrguXCJdO1xyXG4gICAgICAgIHZhciBtaXNkZW1lYW5vcldvcmQgPSBbXCLshozrp6TsuZjquLAg65OxIOqyveuylOyjhOyXkOuKlCDso7zsnZjtlbTslbwg7ZWoLlwiLFwi7IaM66ek7LmY6riwIOuTsSDqsr3rspTso4Tsl5DripQg7KO87J2Y7ZW07JW8IO2VqC5cIiwgXCLshozrp6TsuZjquLAg65OxIOqyveuylOyjhOyXkOuKlCDso7zsnZjtlbTslbwg7ZWoLlwiLCBcIuqyveuylOyjhOyXkOuKlCDso7zsnZjtlbTslbwg7ZWoLlwiLFwiXCIsXCJcIixcIlwiLFwiXCJdXHJcblxyXG5cclxuICAgICAgICB2YXIgc2NvcmVBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICB2YXIgc2hvcnRUeHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGxldCBzYWZlX3R4dCA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgc2NvcmUgPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFyZWFOYW1lID0gdGhpcy5kYXRhLmFyZWFbaG90ZWwuYXJlYV0ubmFtZTtcclxuICAgICAgICAgICAgdmFyIGFyZWFTYWZldHkgPSB0aGlzLmRhdGEuYXJlYVtob3RlbC5hcmVhXS5zYWZldHk7XHJcblxyXG4gICAgICAgICAgICBzY29yZSs9IGFyZWFTYWZldHkuc2NvcmUqMSArIChhcmVhU2FmZXR5Lm1pc2RlbWVhbm9yLzMpKjE7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHh0ID0gYXJlYU5hbWUrJyDsp4Dsl63sl5Ag7JyE7LmY7ZWcIOyImeyGjOuhnCwg7KeA7Jet7J2YIOyghOuwmOyggeyduCDsuZjslYjsnYAgJztcclxuXHJcbiAgICAgICAgICAgIGlmKGFyZWFTYWZldHkuc2NvcmU+NCYmYXJlYVNhZmV0eS5taXNkZW1lYW5vcjw0KXtcclxuICAgICAgICAgICAgICAgIHR4dCArPSBzY29yZVdvcmRfY29ubmVjdFthcmVhU2FmZXR5LnNjb3JlXSArICfsp4Drp4wgJyArIG1pc2RlbWVhbm9yV29yZFthcmVhU2FmZXR5Lm1pc2RlbWVhbm9yXTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gc2NvcmVXb3JkW2FyZWFTYWZldHkuc2NvcmVdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNhZmVfdHh0LnB1c2godHh0KTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgc2FmZXR5X2xvY2FsID0geyAgLy/snKDrj5nsnbjqtazsl5Ag65Sw66W4IOy5mOyViFxyXG4gICAgICAgICAgICAgICAgYXRtOjAsIC8vMDrrs4TroZwgMTrrs7TthrUgMjrsoovsnYxcclxuICAgICAgICAgICAgICAgIHNwb3Q6MCxcclxuICAgICAgICAgICAgICAgIGdyb2Nlcnk6MCxcclxuICAgICAgICAgICAgICAgIGFyZWE6ZmFsc2VcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuYXJlYT41JiZob3RlbC5hcmVhPDkpe1xyXG4gICAgICAgICAgICAgICAgc2FmZXR5X2xvY2FsLmFyZWEgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihob3RlbC5hcmVhID09PSAxMCl7XHJcbiAgICAgICAgICAgICAgICBzYWZldHlfbG9jYWwuYXJlYSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhdG0zMHRoID0gaG90ZWwubG9jYWwuYXRtWzI5XS5sb2NhdGlvbi5zY29yZTsgLy8zMOuyiOynuCBhdG3snbQg66qHIOuniOydvCDrlqjslrTsoLjsnojripTsp4BcclxuXHJcbiAgICAgICAgICAgIGlmKGF0bTMwdGg8MC4wODQpe1xyXG4gICAgICAgICAgICAgICAgc2FmZXR5X2xvY2FsLmF0bSA9IDJcclxuICAgICAgICAgICAgfWVsc2UgaWYoYXRtMzB0aDwwLjEyKXtcclxuICAgICAgICAgICAgICAgIHNhZmV0eV9sb2NhbC5hdG0gPSAxXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNjb3JlICs9IE1hdGgubWF4KCgwLjE1IC0gYXRtMzB0aCksIDApKjVcclxuXHJcbiAgICAgICAgICAgIGhvdGVsLnNwb3QgPSB7XHJcbiAgICAgICAgICAgICAgICB3YWxrYWJsZTogW11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBob3RlbC5sb2NhbC5zcG90ID0gW107XHJcbiAgICAgICAgICAgIGhvdGVsLmxvY2FsLmdyb2NlcnkgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kYXRhLnNwb3RzLnJhbmtlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwb3QgPSB0aGlzLmRhdGEuc3BvdHMucmFua2VkW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHNwb3QuZW50ZXJhbmNlKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNwb3QuZW50ZXJhbmNlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoaG90ZWwuY29vciwgc3BvdC5lbnRlcmFuY2Vbal0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZiA8IDUwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5zcG90LndhbGthYmxlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6aSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWQ6c3BvdC5zaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkaWY8MjAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzYWZldHlfbG9jYWwuc3BvdCA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhZmV0eV9sb2NhbC5zcG90ID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkaWYgPCA4MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuc3BvdC5wdXNoKHNwb3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FmZXR5X2xvY2FsLnNwb3QgPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmID0gY2FsY3VsYXRlRGlmKGhvdGVsLmNvb3IsIHNwb3QuY29vcilcclxuICAgICAgICAgICAgICAgICAgICBpZihkaWYgPCA1MDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5zcG90LndhbGthYmxlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuazppLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lkOnNwb3Quc2lkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjwyMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2FmZXR5X2xvY2FsLnNwb3QgPT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhZmV0eV9sb2NhbC5zcG90ID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9ICgyNTAgLSBkaWYpLzIwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkaWYgPCAxNTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuc3BvdC5wdXNoKHNwb3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYWZldHlfbG9jYWwuc3BvdCA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBob3RlbC5sb2NhbC5ncm9jZXJ5ID0gW11cclxuXHJcbiAgICAgICAgICAgIGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRybyA9IHtcclxuICAgICAgICAgICAgICAgIGRpc3RhbmNlOiAxMDAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgbGluZSBpbiBob3RlbC5tZXRyb0luZm8pIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXRybyA9IGhvdGVsLm1ldHJvSW5mb1tsaW5lXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihtZXRyby5kaXN0YW5jZTxob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8uZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRybyA9IG1ldHJvO1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRyby5saW5lID0gbGluZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRhdGEubG9jYWwubG9jYWwuZ3JvY2VyeS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGdyb2NlcnkgPSB0aGlzLmRhdGEubG9jYWwubG9jYWwuZ3JvY2VyeVtpXTtcclxuICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoaG90ZWwuY29vciwgZ3JvY2VyeSlcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkaWY8MTEwKXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5ncm9jZXJ5LnB1c2goZGlmKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NvcmUgKz0gTWF0aC5taW4oKGhvdGVsLmxvY2FsLmdyb2NlcnkubGVuZ3RoIC8gNiksIDAuNylcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmdyb2NlcnkubGVuZ3RoPjMpe1xyXG4gICAgICAgICAgICAgICAgc2FmZXR5X2xvY2FsLmdyb2NlcnkgPSAyO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihob3RlbC5sb2NhbC5ncm9jZXJ5Lmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgIHNhZmV0eV9sb2NhbC5ncm9jZXJ5ID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBhcmVhU2NvcmUgPSBNYXRoLnJvdW5kKChhcmVhU2FmZXR5LnNjb3JlKjEgKyAoYXJlYVNhZmV0eS5taXNkZW1lYW5vci8zKSoxKSoxMCkvMTBcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgbG9jYWxUeHQgPSAnJztcclxuICAgICAgICAgICAgdmFyIGxvY2FsR29vZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYoc2FmZXR5X2xvY2FsLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgbG9jYWxUeHQgKz0gJ+unqO2VtO2KvCDtlZzrs7XtjJDsl5Ag7JyE7LmY7ZW0IOycoOuPmeyduOq1rOqwgCDrp6TsmrAg66eOJ1xyXG4gICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycoOuPmeyduOq1rOqwgCDrp6TsmrAg66eO7J2AIOunqO2VtO2KvCDtlZzrs7XtjJDsl5Ag7JyE7LmY7ZWY6rOgLCDsp4DtlZjssqDrj4Qg6rCA6rmM7JuMIDxzdHJvbmc+67CkIOuKpuqyjOq5jOyngCDslYjsoITtlZjsp4Drp4wg7IaM66ek7LmY6riwIOuTsSDqsr3rspTso4Tsl5DripQg7KGw7Ius7ZW07JW8IO2VqDwvc3Ryb25nPidcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbC5zcG90Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihzYWZldHlfbG9jYWwuZ3JvY2VyeT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2FmZXR5X2xvY2FsLmF0bT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsVHh0ICs9ICfso7zrs4Ag7IOB7JeF7Iuc7ISkLCDtjrjsnZjsi5zshKTsnbQg7J6YIOqwluy2lOyWtOyguCDsnojqs6AsICcgKyBob3RlbC5sb2NhbC5zcG90WzBdLm5hbWUua28gKyAnIOuTsSDsnKDrqoUg6rSA6rSR7KeA6rCAIOqwgOq5jOybjCA8c3Ryb25nPuycoOuPmeyduOq1rOqwgCDrp6TsmrAg66eO7J2MLjwvc3Ryb25nPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsR29vZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxUeHQgKz0gJ+yjvOuzgCDtjrjsnZjsi5zshKTsnbQg7J6YIOqwluy2lOyWtOyguCDsnojqs6AsICcgKyBob3RlbC5sb2NhbC5zcG90WzBdLm5hbWUua28gKyAnIOuTsSDsnKDrqoUg6rSA6rSR7KeA6rCAIOqwgOq5jOybjCA8c3Ryb25nPuycoOuPmeyduOq1rCDrp47snYwuPC9zdHJvbmc+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxHb29kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzYWZldHlfbG9jYWwuYXRtPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxUeHQgKz0gJ+yjvOuzgCDsg4Hsl4Xsi5zshKTsnbQg7J6YIOqwluy2lOyWtOyguCDsnojqs6AsICcgKyBob3RlbC5sb2NhbC5zcG90WzBdLm5hbWUua28gKyAnIOuTsSDsnKDrqoUg6rSA6rSR7KeA6rCAIOqwgOq5jOybjCA8c3Ryb25nPuycoOuPmeyduOq1rCDrp47snYwuPC9zdHJvbmc+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxHb29kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFR4dCArPSAgaG90ZWwubG9jYWwuc3BvdFswXS5uYW1lLmtvICsgJyDrk7Eg7Jyg66qFIOq0gOq0keyngOqwgCDqsIDquYzsm4wgPHN0cm9uZz7snKDrj5nsnbjqtazqsIAg66eO7J2MLjwvc3Ryb25nPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsR29vZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihzYWZldHlfbG9jYWwuZ3JvY2VyeT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2FmZXR5X2xvY2FsLmF0bT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsVHh0ICs9ICfso7zrs4Ag7IOB7JeF7Iuc7ISkLCDtjrjsnZjsi5zshKTsnbQg7J6YIOqwluy2lOyWtOyguCDsnojslrQgPHN0cm9uZz7snKDrj5nsnbjqtazqsIAg66eO7J2MLjwvc3Ryb25nPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsR29vZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzYWZldHlfbG9jYWwuYXRtPjApe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihhcmVhU2NvcmU+Ny41KXtcclxuICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+yghOuwmOyggeycvOuhnCDsuZjslYjsnbQg7KKL7J2AIDxiPicrYXJlYU5hbWUrJzwvYj7sp4Dsl63sl5Ag7JyE7LmY7ZWY6rOgIOyeiCdcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihsb2NhbEdvb2Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRyby5kaXN0YW5jZTwxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycvOupsCwg7KO867OAIDxzdHJvbmc+7Jyg64+Z7J246rWs6rCAIOunjuqzoCDsp4DtlZjssqDsnbQg6rCA6rmM7JuMIOuwpCDriqbqsozquYzsp4Drj4Qg66ek7JqwIOyViOyghDwvc3Ryb25nPu2VqC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycvOupsCwg7KO867OAIOycoOuPmeyduOq1rOqwgCDrp47slYQgPHN0cm9uZz7sp4Dsl60g64K07JeQ7ISc64+EIOuNlCDslYjsoIQ8L3N0cm9uZz7tlZwg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFR4dCArPSAn7KeA7JetIOuCtCDri6Trpbgg7IiZ7IaM65Ok7JeQIOu5hO2VtCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOyVhOyjvCDrp47sp4DripQg7JWK7J2AIO2OuC4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRyby5kaXN0YW5jZTwxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycvOupsCwg7KeA7ZWY7LKg7J20IOqwgOq5jOybjCA8c3Ryb25nPuuwpCDriqbqsowg6reA6rCA7ZWgIOuVjOuPhCDslYjsoIQ8L3N0cm9uZz7tlZwg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG9ydFR4dCArPSAn7KeA66eMIDxzdHJvbmc+64SI66y0IOuwpCDriqbqsowg64+M7JWE64uk64uI64qUIOqyg+ydgCDsgrzqsIDripQg6rKDPC9zdHJvbmc+7J20IOyii+ydjC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGFyZWFTY29yZT42Ljgpe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+y5mOyViOydtCDsoovsnYAg7Y647J24IDxiPicrYXJlYU5hbWUrJzwvYj7sp4Dsl63sl5Ag7JyE7LmY7ZWY6rOgIOyeiCdcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihsb2NhbEdvb2Qpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZighc2FmZXR5X2xvY2FsLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8uZGlzdGFuY2U8MTAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0VHh0ICs9ICfsnLzrqbAsIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg66eO6rOgIOyngO2VmOyyoOydtCDqsIDquYzsm4wgPHN0cm9uZz7rsKQg64qm6rKM6rmM7KeA64+EIOyViOyghDwvc3Ryb25nPu2VnCDtjrguJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0VHh0ICs9ICfsnLzrqbAsIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg66eO7JWEIDxzdHJvbmc+7KeA7JetIOuCtOyXkOyEnOuPhCDslYjsoIQ8L3N0cm9uZz7tlZwg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFR4dCArPSAn7KeA7JetIOuCtCDri6Trpbgg7IiZ7IaM65Ok7JeQIOu5hO2VtCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOyVhOyjvCDrp47sp4DripQg7JWK7J2AIO2OuC4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRyby5kaXN0YW5jZTwxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycvOupsCwg7KeA7ZWY7LKg7J20IOqwgOq5jOybjCA8c3Ryb25nPuuwpCDriqbqsowg6reA6rCA7ZWgIOuVjOuPhCDslYjsoIQ8L3N0cm9uZz7tlZwg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG9ydFR4dCArPSAn7KeA66eMIOuEiOustCA8c3Ryb25nPuuwpCDriqbqsowg64+M7JWE64uk64uI64qUIOqyg+ydgCDsgrzqsIDripQg6rKDPC9zdHJvbmc+7J20IOyii+ydjC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZSBpZihhcmVhU2NvcmU+Nil7XHJcbiAgICAgICAgICAgICAgICBpZighc2FmZXR5X2xvY2FsLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3J0VHh0Kz0n7J2867CY7KCB7J24IOy5mOyViCDsiJjspIDsnZggPGI+JysgYXJlYU5hbWUrICc8L2I+IOyngOyXreyXkCDsnITsuZjtlZjqs6Ag7J6IJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGxvY2FsR29vZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNhZmV0eV9sb2NhbC5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwubmVhcmVzdE1ldHJvLmRpc3RhbmNlPDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG9ydFR4dCArPSAn7Jy866mwLCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOunjuqzoCDsp4DtlZjssqDsnbQg6rCA6rmM7JuMIDxzdHJvbmc+67CkIOuKpuqyjCDqt4DqsIDtlaAg65WM64+EIOyViOyghDwvc3Ryb25nPu2VnCDtjrguJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0VHh0ICs9ICfsnLzrqbAsIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg66eO7JWEIDxzdHJvbmc+7JWI7KCE7ZWcIO2OuOydtOyngOunjCDrhIjrrLQg67CkIOuKpuqyjCDqt4DqsIDtlZjripQg6rKD7J2AIOyCvOqwgDwvc3Ryb25nPuuKlCDqsoPsnbQg7KKL7J2MLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFR4dCArPSAn7KeA7JetIOuCtCDri6Trpbgg7IiZ7IaM65Ok7JeQIOu5hO2VtCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOunjuyngOuKlCDslYrsnYAg7Y647JeQIOyGje2VqC4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRyby5kaXN0YW5jZTwxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycvOupsCwgPHN0cm9uZz7sp4DtlZjssqDsnbQg6rCA6rmd7KeA66eMIOuEiOustCDrsKQg64qm6rKMIOq3gOqwgO2VmOuKlCDqsoPsnYAg7IK86rCAPC9zdHJvbmc+64qUIOqyg+ydtCDsoovsnYwuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0VHh0ICs9ICfsnLzrqbAsIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg7JWE7KO8IOunjuydgCDtjrjsnYAg7JWE64uI66+A66GcIDxzdHJvbmc+67CkIOuKpuqyjCDrj4zslYTri6Tri4jsp4Ag7JWK64qUPC9zdHJvbmc+IOqyg+ydtCDsoovsnYwuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQrPSfsoITrsJjsoIHsnLzroZwg7LmY7JWI7J20IOyii+yngCDslYrsnYAg7Y647J24IDxiPicrYXJlYU5hbWUrICc8L2I+IOyngOyXreyXkCDsnITsuZjtlZjqs6Ag7J6IJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGxvY2FsR29vZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNhZmV0eV9sb2NhbC5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwubmVhcmVzdE1ldHJvLmRpc3RhbmNlPDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG9ydFR4dCArPSAn7Jy866mwLCDsnKDrj5nsnbjqtazqsIAg66eO6rOgIOyngO2VmOyyoOydtCDqsIDquYzsm4wgPHN0cm9uZz7sp4Dsl60g64K07JeQ7ISc64qUIOyViOyghO2VnCDtjrjsnbTsp4Drp4wg64qm7J2AIOyLnOqwhCDqt4DqsIDripQg7IK86rCA64qUIOqygzwvc3Ryb25nPuydtCDsoovsnYwuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0VHh0ICs9ICfsnLzrqbAsIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg66eO7J2AIO2OuOydtOyngOunjCA8c3Ryb25nPuuKpuydgCDsi5zqsITsl5Ag6reA6rCA7ZWY7KeAIOyViuuKlCDqsoM8L3N0cm9uZz7snbQg7KKL7J2MLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsVHh0ICs9ICfso7zrs4Dsl5Ag66eO7J2AIOyLnOyEpOydtCDsnojqsbDrgpgg7Jyg66qF7ZWcIOq0gOq0keyngOqwgCDsnojsp4Ag7JWK7JWEIOycoOuPmeyduOq1rOqwgCDsp4Dsl60g64K07JeQ7ISc64+EIOunjuyngCDslYrsnYAg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICBpZighc2FmZXR5X2xvY2FsLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8uZGlzdGFuY2U8MTAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0VHh0ICs9ICfsnLzrqbAsIOyngO2VmOyyoOydtCDqsIDquZ3sp4Drp4wg7Jyg64+Z7J246rWs6rCAIOunjuyngCDslYrsnYAg7Y647J2066+A66GcIDxzdHJvbmc+7JWI7KCE7JeQIOycoOydmO2VtOyVvCDtlag8L3N0cm9uZz4uJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0VHh0ICs9ICfsnLzrqbAsIOycoOuPmeyduOq1rOqwgCDrp47sp4Ag7JWK7JWEIDxzdHJvbmc+7JWI7KCE7JeQIOycoOydmO2VtOyVvCDtlag8L3N0cm9uZz4uJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzYWZlX3R4dC5wdXNoKGxvY2FsVHh0KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtZXQgPSBob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm87XHJcbiAgICAgICAgICAgIHZhciBtZXREaXMgPSBtZXQuZGlzdGFuY2U7XHJcbiAgICAgICAgICAgIHZhciBtZXRUeHQgPSAn6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqAg7Jet7J2AIDxiPicgKyBtZXQubGluZSArICftmLjshKAgJyArIG1ldC5uYW1lICsgJ+yXrTwvYj7snLzroZwsIOuPhOuztOuhnCDslb0gPHN0cm9uZz4nICsoTWF0aC5mbG9vcihtZXREaXMvNzUpICsgMSkrJ+u2hDwvc3Ryb25nPiDqsbDrpqzsl5Ag7J6IJztcclxuXHJcbiAgICAgICAgICAgIGlmKG1ldERpczwyMDApe1xyXG4gICAgICAgICAgICAgICAgbWV0VHh0ICs9ICfslrQgPHN0cm9uZz7riqbsnYAg67Ck7JeQIOq3gOqwgO2VmOq4sCDsoovsnYw8L3N0cm9uZz4uJ1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihtZXREaXM8NTAwKXtcclxuICAgICAgICAgICAgICAgIG1ldFR4dCArPSAn7J2MLidcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBtZXRUeHQgKz0gJ+yWtCA8c3Ryb25nPuuEiOustCDriqbsnYAg67Ck7JeQ64qUIOyngO2VmOyyoOuhnCDqt4DqsIDtlZjquLAg67aA64u0PC9zdHJvbmc+7Iqk65+s7Jq4IOyImCDsnojsnYwnXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBtZXRTY29yZSA9IE1hdGgubWF4KE1hdGgucm91bmQoKDMwMCAtIG1ldERpcykvMzAwKSwwKTtcclxuXHJcbiAgICAgICAgICAgIHNjb3JlKz0gbWV0U2NvcmVcclxuXHJcbiAgICAgICAgICAgIGlmKHNjb3JlPjkuMil7XHJcbiAgICAgICAgICAgICAgICBzY29yZSA9IDkuMiArIChzY29yZS05LjIpLzRcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NvcmUgPSBNYXRoLm1pbihNYXRoLnJvdW5kKHNjb3JlKjcuOTIrMjIpLzEwLDkuOSk7XHJcblxyXG4gICAgICAgICAgICBzYWZlX3R4dC5wdXNoKG1ldFR4dCk7XHJcblxyXG4gICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNhZmV0eSA9IHtcclxuICAgICAgICAgICAgICAgIHNjb3JlOiBzY29yZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzY29yZUFycmF5LnB1c2goc2NvcmUpXHJcblxyXG4gICAgICAgICAgICBpZihzY29yZT45LjQpe1xyXG4gICAgICAgICAgICAgICAgc2FmZV90eHQucHVzaCgn7KCE67CY7KCB7Jy866GcIOuJtOyaleydmCDsiJnshozrk6Qg7KSR7JeQ7ISc64+EIDxzdHJvbmc+7LmY7JWI7Jy866Gc64qUIOy1nOyDgeychOq2jDwvc3Ryb25nPuyXkCDsho3tlbQg7Jes7ZaJ7J2EIOymkOq4sOq4sCDsoovsnYwuJylcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+OSl7XHJcbiAgICAgICAgICAgICAgICBzYWZlX3R4dC5wdXNoKCfribTsmpUg7IiZ7IaM65OkIOykkeyXkOyEnOuPhCDsoITrsJjsoIHsnLzroZwgPHN0cm9uZz7sg4Hri7ntnogg7KKL7J2AIOy5mOyViDwvc3Ryb25nPuydhCDsnpDrnpHtlaguJylcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+OC41KXtcclxuICAgICAgICAgICAgICAgIHNhZmVfdHh0LnB1c2goJzxzdHJvbmc+7KCE67CY7KCB7Jy866GcIOyjvOuzgCDsuZjslYjsnbQg7JWI7KCVPC9zdHJvbmc+65CY7Ja0IOyXrO2Wie2VmOq4sOyXkCDsoovsnYwuJylcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Ny45KXtcclxuICAgICAgICAgICAgICAgIHNhZmVfdHh0LnB1c2goJ+uwpCDriqbqsowg64+M7JWE64uk64uI7KeAIOyViuqzoCA8c3Ryb25nPuyhsOyLrO2VnOuLpOuptCDsoITrsJjsoIHsnLzroZwg7Jes7ZaJ7ZWY6riw7JeQIOyViOyghDwvc3Ryb25nPu2VnCDtjrguJylcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Ny4zKXtcclxuICAgICAgICAgICAgICAgIHNhZmVfdHh0LnB1c2goJ+yghOuwmOyggeycvOuhnCA8c3Ryb25nPuuJtOyalSDtj4nqt6Ag7KCV64+E7J2YIOy5mOyViCDsiJjspIA8L3N0cm9uZz7snYQg67O07J2066mwLCDsobDsi6ztnogg64uk64uQIO2VhOyalOuKlCDsnojsnYwuJylcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Ni45KXtcclxuICAgICAgICAgICAgICAgIHNhZmVfdHh0LnB1c2goJ+y5mOyViOydtCDslYTso7wg64KY7IGY7KeA64qUIOyViuyngOunjCA8c3Ryb25nPuyhsOyLrO2eiCDri6Tri4jripQg6rKD7J20IOyii+ydjDwvc3Ryb25nPi4nKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHNhZmVfdHh0LnB1c2goJ+y5mOyViOydtCDsoovsnYAg7Y647J2AIOyVhOuLiOuvgOuhnCA8c3Ryb25nPuyViOyghO2VnCDsiJnshozrpbwg7JuQ7ZWc64uk66m0IOyii+ydgCDshKDtg53snYAg7JWE64uYLjwvc3Ryb25nPicpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4uc2FmZXR5ID0gc2FmZV90eHQ7XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5zdW1tYXJ5KXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLnN1bW1hcnkuc2FmZXR5ID0gc2hvcnRUeHQ7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuc3VtbWFyeSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzYWZldHk6IHNob3J0VHh0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzY29yZUFycmF5LnNvcnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhLnN0YXR1cy5ob3RlbHMuc2FmZXR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK3RoaXMuY2l0eSkudXBkYXRlKHRoaXMuZGF0YSlcclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmVfdHJhbnNwb3J0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gdGhpcy5jaXR5XHJcbiAgICAgICAgbGV0IG9yZGVyQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyYW5zcG9ydF90eHQgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIC8v6rWQ7Ya1IO2OuOydmOyEsSDsoJDsiJjrtoDsl6zsmqlcclxuICAgICAgICAgICAgbGV0IGdvb2RMaW5lID0gW107XHJcbiAgICAgICAgICAgIC8v7KKL7J2AIOyngO2VmOyyoCDrnbzsnbjrk6QgQXJyYXlcclxuICAgICAgICAgICAgbGV0IHZpc2l0YWJsZSA9IFtdO1xyXG4gICAgICAgICAgICAvL+2ZmOyKuSDsl4bsnbQg6rCIIOyImCDsnojripQg6rSA6rSR7KeAIOuqqeuhnVxyXG4gICAgICAgICAgICBsZXQgbmVhcmVzdCA9IHtkaXN0YW5jZToxMDAwLCBuYW1lOlwiXCIsIGNvZGU6XCJcIn07XHJcbiAgICAgICAgICAgIC8v6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqBcclxuICAgICAgICAgICAgbGV0IGxpbmVObyA9IDBcclxuXHJcbiAgICAgICAgICAgIHZhciBzdW1tYXJ5ID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5tZXRyb0luZm8pe1xyXG4gICAgICAgICAgICAgICAgbGluZU5vID0gT2JqZWN0LmtleXMoaG90ZWwubWV0cm9JbmZvKS5sZW5ndGhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLzEw67aE6rGw66asIOydtOuCtOydmCDsp4DtlZjssqAgIOuFuOyEoCDqsJzsiJhcclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBtZXRMaW5lIGluIGhvdGVsLm1ldHJvSW5mbykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLm1ldHJvSW5mb1ttZXRMaW5lXS5kaXN0YW5jZSA8IG5lYXJlc3QuZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIG5lYXJlc3QgPSBob3RlbC5tZXRyb0luZm9bbWV0TGluZV1cclxuICAgICAgICAgICAgICAgICAgICAvL+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKgIOqwseyLoFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5tZXRyb0xpbmVbbWV0TGluZV0uc2NvcmU+ODApe1xyXG4gICAgICAgICAgICAgICAgICAgIGdvb2RMaW5lLnB1c2gobWV0TGluZSlcclxuICAgICAgICAgICAgICAgICAgICAvL+yii+ydgCDrnbzsnbjsnbTrqbQg7ZG47Iuc7ZWoXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRhdGEubWV0cm9MaW5lW21ldExpbmVdLnNwb3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IHRoaXMuZGF0YS5tZXRyb0xpbmVbbWV0TGluZV0uc3BvdFtpXVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCF2aXNpdGFibGUuaW5jbHVkZXMoc3BvdC5uYW1lKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2l0YWJsZS5wdXNoKHNwb3QubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKE1hdGguY2VpbCgobmVhcmVzdC5kaXN0YW5jZSkvNzApPDQpe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0X3R4dC5wdXNoKCfqsIDsnqUg6rCA6rmM7Jq0IOyngO2VmOyyoCDsl63snYAgPGI+JyArIG5lYXJlc3QubmFtZSArIFwiPC9iPiDsl63snLzroZwsIDxzdHJvbmc+64+E67O0IOuLqCBcIisgTWF0aC5jZWlsKChuZWFyZXN0LmRpc3RhbmNlKS83MCkgK1wi67aEIOqxsOumrDwvc3Ryb25nPlwiKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnRfdHh0LnB1c2goJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKgIOyXreydgCA8Yj4nICsgbmVhcmVzdC5uYW1lICsgXCI8L2I+IOyXreycvOuhnCwg64+E67O0IFwiKyBNYXRoLmNlaWwoKG5lYXJlc3QuZGlzdGFuY2UpLzcwKSArXCLrtoQg6rGw66asXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydF90eHQucHVzaCgn7IiZ7IaM7JeQ7IScIOuPhOuztCAxMOu2hOqxsOumrCDsnbTrgrTsl5AgPGI+7KeA7ZWY7LKgICcgKyBsaW5lTm8gKyAn6rCcIOuFuOyEoDwvYj7snbQg7KeA64KoJyk7XHJcblxyXG4gICAgICAgICAgICBpZihnb29kTGluZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBpZihnb29kTGluZS5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0X3R4dC5wdXNoKCfqt7gg7KSR7JeQ7ISc64+EIOyLpOyniOyggeycvOuhnCAnK3RoaXMuY2l0eU5hbWUrJyDqtIDqtJHsl5Ag7Y6466as7ZWcIDxzdHJvbmc+JysgZ29vZExpbmUgKyAn7Zi47ISgPC9zdHJvbmc+7J20IOyngOuCmOuKlCA8Yj7stIgg7Jet7IS46raMPC9iPicpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0X3R4dC5wdXNoKCfqt7gg7KSR7JeQ7ISc64+EIOyLpOyniOyggeycvOuhnCAnK3RoaXMuY2l0eU5hbWUrJyDqtIDqtJHsl5Ag7Y6466as7ZWcIDxzdHJvbmc+JysgZ29vZExpbmUgKyAn7Zi47ISgPC9zdHJvbmc+7J20IOyngOuCmOuKlCA8Yj4g7Jet7IS46raMPC9iPicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc3BvdE5vID0gdmlzaXRhYmxlLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYoc3BvdE5vPjApe1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogMTAw64yAIOq0gOq0keyngCAtPiDribTsmpUg7Iuk7KCcIHNwb3Qg642w7J207YSwIOq4uOydtFxyXG4gICAgICAgICAgICAgICAgaWYoc3BvdE5vPjkwKXtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRfdHh0LnB1c2goJzxiPicgKyB0aGlzLmNpdHlOYW1lICsgJyAxMDDrjIAg6rSA6rSR7KeAIOykkSAnK3Nwb3RObysn6rCcPC9iPuulvCDtmZjsirkg7JeG7J20IOuwqeusuO2VoCDsiJgg7J6I64qUIDxzdHJvbmc+7LWc6rOg7J2YIOq1kO2GtSDsmpTsp4A8L3N0cm9uZz4nKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNwb3RObz43NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0X3R4dC5wdXNoKCc8Yj4nICsgdGhpcy5jaXR5TmFtZSArICcgMTAw64yAIOq0gOq0keyngCDspJEgJytzcG90Tm8rJ+qwnDwvYj7rpbwg7ZmY7Iq5IOyXhuydtCDrsKnrrLjtlaAg7IiYIOyeiOuKlCA8c3Ryb25nPuq1kO2GtSDsmpTsp4A8L3N0cm9uZz4nKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydF90eHQucHVzaCh0aGlzLmNpdHlOYW1lICsgJyAxMDDrjIAg6rSA6rSR7KeAIOykkSAnK3Nwb3RObysn6rCc66W8IO2ZmOyKuSDsl4bsnbQg67Cp66y4IOqwgOuKpScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIG1pbiA9IE1hdGguY2VpbChuZWFyZXN0LmRpc3RhbmNlLzcwKTtcclxuICAgICAgICAgICAgaWYobWluPDIpe1xyXG4gICAgICAgICAgICAgICAgaWYobGluZU5vPjE4KXtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IDxzdHJvbmc+64+E67O0IOuLqCAnK21pbisnficrKG1pbisxKSsn67aEIOqxsOumrDwvc3Ryb25nPuyXkCDsnojqs6AsIOuPhOuztCAxMOu2hCDqsbDrpqzsl5AgPHN0cm9uZz7sp4DtlZjssqAgJytsaW5lTm8rJ+qwnCDrhbjshKA8L3N0cm9uZz7snbQg7KeA64KY64qUIDxiPuy1nOyDgeydmCDsl63shLjqtow8L2I+J1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU5vPjE0KXtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IDxzdHJvbmc+64+E67O0IOuLqCAnK21pbisnficrKG1pbisxKSsn67aEIOqxsOumrDwvc3Ryb25nPuyXkCDsnojqs6AsIOuPhOuztCAxMOu2hCDqsbDrpqzsl5AgPHN0cm9uZz7sp4DtlZjssqAgJytsaW5lTm8rJ+qwnCDrhbjshKA8L3N0cm9uZz7snbQg7KeA64KY64qUIDxiPuq1ieyepe2eiCDtm4zrpa3tlZwg7Jet7IS46raMPC9iPidcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdvb2RMaW5lLmxlbmd0aD4zKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeSA9ICfqsIDsnqUg6rCA6rmM7Jq0IOyngO2VmOyyoOyXreydtCA8c3Ryb25nPuuPhOuztCDri6ggJyttaW4rJ34nKyhtaW4rMSkrJ+u2hCDqsbDrpqw8L3N0cm9uZz7sl5Ag7J6I6rOgLCDqtIDqtJHsl5Ag7Y6466as7ZWcIDxzdHJvbmc+JysgZ29vZExpbmUgKyAn7Zi47ISgPC9zdHJvbmc+7J20IOyngOuCmOuKlCA8Yj7tm4zrpa3tlZwg7Jet7IS46raMPC9iPidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihnb29kTGluZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgPSAn6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqDsl63snbQgPHN0cm9uZz7rj4Trs7Qg64uoICcrbWluKyd+JysobWluKzEpKyfrtoQg6rGw66asPC9zdHJvbmc+7JeQIOyeiOqzoCwg6rSA6rSR7JeQIO2OuOumrO2VnCA8c3Ryb25nPicrIGdvb2RMaW5lICsgJ+2YuOyEoDwvc3Ryb25nPuydtCDsp4DrgpjripQgPGI+7KKL7J2AIOyXreyEuOq2jDwvYj4nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihtaW48NCl7XHJcbiAgICAgICAgICAgICAgICBpZihsaW5lTm8+MTgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgPSAn6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqDsl63snbQgPHN0cm9uZz7rj4Trs7QgJysobWluKzEpKyd+JysobWluKzIpKyfrtoQg6rGw66asPC9zdHJvbmc+7JeQIOyeiOqzoCwg64+E67O0IDEw67aEIOqxsOumrOyXkCA8c3Ryb25nPuyngO2VmOyyoCAnK2xpbmVObysn6rCcIOuFuOyEoDwvc3Ryb25nPuydtCDsp4DrgpjripQgPGI+6rWJ7J6l7Z6IIO2bjOulre2VnCDsl63shLjqtow8L2I+J1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU5vPjE0KXtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IDxzdHJvbmc+64+E67O0ICcrKG1pbisxKSsnficrKG1pbisyKSsn67aEIOqxsOumrDwvc3Ryb25nPuyXkCDsnojqs6AsIOuPhOuztCAxMOu2hCDqsbDrpqzsl5AgPHN0cm9uZz7sp4DtlZjssqAgJytsaW5lTm8rJ+qwnCDrhbjshKA8L3N0cm9uZz7snbQg7KeA64KY64qUIDxiPu2bjOulre2VnCDsl63shLjqtow8L2I+J1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ29vZExpbmUubGVuZ3RoPjIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IDxzdHJvbmc+64+E67O0ICcrKG1pbisxKSsnficrKG1pbisyKSsn67aEIOqxsOumrDwvc3Ryb25nPuyXkCDsnojqs6AsIOq0gOq0keyXkCDtjrjrpqztlZwgPHN0cm9uZz4nKyBnb29kTGluZSArICftmLjshKA8L3N0cm9uZz7snbQg7KeA64KY64qUIDxiPuyXreyEuOq2jDwvYj4nXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoZ29vZExpbmUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IDxzdHJvbmc+64+E67O0ICcrKG1pbisxKSsnficrKG1pbisyKSsn67aEIOqxsOumrDwvc3Ryb25nPuyXkCDsnojqs6AsIOq0gOq0keyXkCDtjrjrpqztlZwgPHN0cm9uZz4nKyBnb29kTGluZSArICftmLjshKA8L3N0cm9uZz7snbQg7KeA64KoJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYobWluPDcpe1xyXG4gICAgICAgICAgICAgICAgaWYobGluZU5vPjE5KXtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J20IDxzdHJvbmc+64+E67O0ICcrKG1pbisyKSsnficrKG1pbiszKSsn67aEIOqxsOumrDwvc3Ryb25nPuuhnCDslb3qsIQg66mA7KeA66eMLCDrj4Trs7QgMTDrtoQg6rGw66as7JeQIDxzdHJvbmc+7KeA7ZWY7LKgICcrbGluZU5vKyfqsJwg64W47ISgPC9zdHJvbmc+7J20IOyngOuCmOuKlCA8Yj7soovsnYAg7Jet7IS46raMPC9iPidcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGxpbmVObz4xNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeSA9ICfqsIDsnqUg6rCA6rmM7Jq0IOyngO2VmOyyoOyXreydtCA8c3Ryb25nPuuPhOuztCAnKyhtaW4rMikrJ34nKyhtaW4rMykrJ+u2hCDqsbDrpqw8L3N0cm9uZz7roZwg7JW96rCEIOupgOyngOunjCwg64+E67O0IDEw67aEIOqxsOumrOyXkCA8c3Ryb25nPuyngO2VmOyyoCAnK2xpbmVObysn6rCcIOuFuOyEoDwvc3Ryb25nPuydtCDsp4DrgpjripQgPGI+7Jet7IS46raMPC9iPidcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdvb2RMaW5lLmxlbmd0aD4yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeSA9ICfqsIDsnqUg6rCA6rmM7Jq0IOyngO2VmOyyoOyXreydtCA8c3Ryb25nPuuPhOuztCAnKyhtaW4rMikrJ34nKyhtaW4rMykrJ+u2hCDqsbDrpqw8L3N0cm9uZz7roZwg7JW96rCEIOupgOyngOunjCwg6rSA6rSR7JeQIO2OuOumrO2VnCA8c3Ryb25nPicrIGdvb2RMaW5lICsgJ+2YuOyEoDwvc3Ryb25nPuydtCDsp4DrgqgnXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgPSAn6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqDsl63snbQgPHN0cm9uZz7rj4Trs7QgJysobWluKzIpKyd+JysobWluKzMpKyfrtoQg6rGw66asPC9zdHJvbmc+66GcIOyVveqwhCDrlqjslrTsoLgg7J6I7Ja0IOuLpOyGjCDrtojtjrjtlaAg7IiYIOyeiOydjCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc3VtbWFyeSA9ICfqsIDsnqUg6rCA6rmM7Jq0IOyngO2VmOyyoOyXreydtCA8c3Ryb25nPuuPhOuztCAnKyhtaW4rMykrJ34nKyhtaW4rNSkrJ+u2hCDqsbDrpqw8L3N0cm9uZz7roZwg7KGw6riIIOuWqOyWtOyguCDsnojslrQg67aI7Y647ZWgIOyImCDsnojsnYwnXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhvdGVsLnN1bW1hcnkudHJhbnNwb3J0ID0gc3VtbWFyeTtcclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBtZXRMaW5lIGluIGhvdGVsLm1ldHJvSW5mbykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldERpc3RhbmNlID0gaG90ZWwubWV0cm9JbmZvW21ldExpbmVdLmRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gKDEwMDAwIC0gbWV0RGlzdGFuY2UpKnRoaXMuZGF0YS5tZXRyb0xpbmVbbWV0TGluZV0uc2NvcmU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9yZGVyQXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzY29yZTogc2NvcmUsXHJcbiAgICAgICAgICAgICAgICBoaWQ6IGhpZFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuZXhwbGFpbil7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5leHBsYWluLnRyYW5zcG9ydCA9IHRyYW5zcG9ydF90eHQ7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuZXhwbGFpbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6dHJhbnNwb3J0X3R4dFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcmRlckFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLnNjb3JlIDwgYi5zY29yZSA/IDEgOiBhLnNjb3JlID4gYi5zY29yZSA/IC0xIDogMDtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gb3JkZXJBcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW29yZGVyQXJyYXlbaV0uaGlkXTtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gTWF0aC5yb3VuZCgoMSAtIChpL2xlbikqKGkvbGVuKSkqNjApLzEwICArIDRcclxuICAgICAgICAgICAgIC8vNC4wIH4gMTAuMCDsgqzsnbTsnZgg7KCQ7IiY66W8IOyGjOyImOygkCAx7J6Q66as6rmM7KeAIOu2gOyXrO2VnOuLpC5cclxuICAgICAgICAgICAgIC8v64aS7J2AIOygkOyImOqwgCDrjZQg66eO64u5XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQudHJhbnNwb3J0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOiBzY29yZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OntcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6c2NvcmVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjc3RhdHVzX3RyYW5zcG9ydFwiKS5odG1sKFwi64yA7KSR6rWQ7Ya1IOygleuztCDrsJzqsqwuIOq1kO2GtSDtjrjsnZjshLHsnYQg6rOE7IKw7ZWp64uI64ukLiAtIOqzhOyCsOydhCDsmYTro4ztlojsirXri4jri6QuXCIpO1xyXG4gICAgICAgIHRoaXMuZGF0YS5zdGF0dXMuaG90ZWxzLnRyYW5zcG9ydCA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBtdXNpY2FsID0gW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6XCLsnITtgqTrk5xcIixcclxuICAgICAgICAgICAgICAgIHRoZWF0ZXI6XCLqsbDsiojsnIgg6re57J6lXCIsXHJcbiAgICAgICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6NDAuNzYyMzgzMixcclxuICAgICAgICAgICAgICAgICAgICBsbmc6LTczLjk4NTE2MTZcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIuudvOydtOyYqCDtgrlcIixcclxuICAgICAgICAgICAgICAgIHRoZWF0ZXI6XCLrr7zsiqTsvZTtlIQg6re57J6lXCIsXHJcbiAgICAgICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6NDAuNzU4MDI3NyxcclxuICAgICAgICAgICAgICAgICAgICBsbmc6LTczLjk4NjE0MThcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIu2Cue2CpCDrtoDsuKBcIixcclxuICAgICAgICAgICAgICAgIHRoZWF0ZXI6XCLslYwg7ZeI7Ims7Y6g65OcIOq3ueyepVwiLFxyXG4gICAgICAgICAgICAgICAgY29vcjp7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OjQwLjc1OTI2MSxcclxuICAgICAgICAgICAgICAgICAgICBsbmc6LTczLjk5MTM4OTdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTon7Iuc7Lm06rOgJyxcclxuICAgICAgICAgICAgICAgIHRoZWF0cmU6J+yVsOuwsOyEnOuNlCDqt7nsnqUnLFxyXG4gICAgICAgICAgICAgICAgY29vcjp7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OjQwLjc2MTI0ODksXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOi03My45ODY2MjM3XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6XCLslYzrnbzrlJhcIixcclxuICAgICAgICAgICAgICAgIHRoZWF0ZXI6XCLribQg7JWU7Iqk7YWM66W064u0IOq3ueyepVwiLFxyXG4gICAgICAgICAgICAgICAgY29vcjp7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OjQwLjc1NjA4NzEsXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOi03My45OTAxMjU3XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6XCJUS1RTXCIsXHJcbiAgICAgICAgICAgICAgICB0aGVhdGVyOlwiVEtUU1wiLFxyXG4gICAgICAgICAgICAgICAgY29vcjp7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OjQwLjc1OTE5NTksXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOi03My45ODcwODE0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dXHJcblxyXG4gICAgICAgIHZhciB0aWNrZXQgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6XCJUS1RTXCIsXHJcbiAgICAgICAgICAgIHRoZWF0ZXI6XCJUS1RTXCIsXHJcbiAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgbGF0OjQwLjc1OTE5NTksXHJcbiAgICAgICAgICAgICAgICBsbmc6LTczLjk4NzA4MTRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNlbnRyYWxOZWFyZXN0UG9seSA9IFt7bGF0OjQwLjc2OTI2NDMsbG5nOi03My45ODM4NjQ4fSx7bGF0OjQwLjc2NjcyOTEsbG5nOi03My45ODI4MzQ4fSx7bGF0OjQwLjc2Mjg2MTEsbG5nOi03My45NzM5NTEzfSx7bGF0OjQwLjc2MzgzNjMsbG5nOi03My45NzAwNDZ9LHtsYXQ6NDAuNzk1NzgwNCxsbmc6LTczLjk0Njk1NzZ9LHtsYXQ6NDAuNzk4MTg0NSxsbmc6LTczLjk0ODI0NTF9LHtsYXQ6NDAuODAxOTIwNSxsbmc6LTczLjk1NzEyODZ9LHtsYXQ6NDAuODAxNTYzMSxsbmc6LTczLjk2MDEzMjZ9LHtsYXQ6NDAuNzY5MjY0Myxsbmc6LTczLjk4Mzg2NDh9XVxyXG4gICAgICAgIHZhciBjZW50cmFsTmVhclBvbHkgPSBbe2xhdDo0MC43Njk5MDMyLGxuZzotNzMuOTg2MjY0N30se2xhdDo0MC43NjQ3MDI5LGxuZzotNzMuOTg0MjY4Nn0se2xhdDo0MC43NjA4Njc0LGxuZzotNzMuOTc1Mjc3OH0se2xhdDo0MC43NjI4NDk5LGxuZzotNzMuOTY3NjgyNH0se2xhdDo0MC43OTQ4NzU4LGxuZzotNzMuOTQ0NDg2N30se2xhdDo0MC43OTk5MTE3LGxuZzotNzMuOTQ3MDEyNn0se2xhdDo0MC44MDM3NDUsbG5nOi03My45NTU4OTMyfSx7bGF0OjQwLjgwMjQ3OCxsbmc6LTczLjk2MjY3MTh9LHtsYXQ6NDAuNzY5OTAzMixsbmc6LTczLjk4NjI2NDd9XVxyXG4gICAgICAgIHZhciBjZW50cmFsTWlkUG9seSA9IFt7bGF0OjQwLjgwMzQxNDgsbG5nOi03My45NjQ4NTMzfSx7bGF0OjQwLjc3MDg1NjksbG5nOi03My45ODgyODUxfSx7bGF0OjQwLjc2Mjk5MTIsbG5nOi03My45ODU1Mzg1fSx7bGF0OjQwLjc1OTM1MDUsbG5nOi03My45NzYzNTQ2fSx7bGF0OjQwLjc2MjAxNixsbmc6LTczLjk2NjIyNjZ9LHtsYXQ6NDAuNzkzOTkzNSxsbmc6LTczLjk0Mjc5NDh9LHtsYXQ6NDAuODAxMzM1OCxsbmc6LTczLjk0NjA1NjR9LHtsYXQ6NDAuODA1MTA0LGxuZzotNzMuOTU1MTU0NH0se2xhdDo0MC44MDM0MTQ4LGxuZzotNzMuOTY0ODUzM31dXHJcbiAgICAgICAgdmFyIGNlbnRyYWxGYXJQb2x5ID0gW3tsYXQ6NDAuNzU3MjcwMSxsbmc6LTczLjk3ODAyODN9LHtsYXQ6NDAuNzYwNjgzMyxsbmc6LTczLjk2NDI1MjV9LHtsYXQ6NDAuNzkzNzMzNixsbmc6LTczLjk0MDEzNH0se2xhdDo0MC44MDI2MDI3LGxuZzotNzMuOTQ1MTEyMn0se2xhdDo0MC44MDc1MDc4LGxuZzotNzMuOTU2NzQyM30se2xhdDo0MC44MDQ4NzY3LGxuZzotNzMuOTY4NTAxMX0se2xhdDo0MC43NzIxODk0LGxuZzotNzMuOTkxNjMyNX0se2xhdDo0MC43NjA5NDMzLGxuZzotNzMuOTg3MTI2NH0se2xhdDo0MC43NTcyNzAxLGxuZzotNzMuOTc4MDI4M31dXHJcblxyXG4gICAgICAgIHZhciBjZW50cmFsTmVhcmVzdCA9IG5ldyBnb29nbGUubWFwcy5Qb2x5Z29uKHtcclxuICAgICAgICAgICAgcGF0aHM6IGNlbnRyYWxOZWFyZXN0UG9seVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGNlbnRyYWxNaWQgPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbih7XHJcbiAgICAgICAgICBwYXRoczogY2VudHJhbE1pZFBvbHlcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgY2VudHJhbE5lYXIgPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbih7XHJcbiAgICAgICAgICBwYXRoczogY2VudHJhbE5lYXJQb2x5XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGNlbnRyYWxGYXIgPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbih7XHJcbiAgICAgICAgICBwYXRoczogY2VudHJhbEZhclBvbHlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGNlbnRyYWxTcG90cyA9IFt7XHJcbiAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgbGF0OjQwLjc3MjQxNjksXHJcbiAgICAgICAgICAgICAgICBsbmc6LTczLjk2NzEzODVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwbGFpbjon7IS87Yq465+0IO2MjO2BrCDrgrTsl5DshJzrj4Qg7JWE66aE64uk7Jq0IOqyveq0gOydhCDsnpDrnpHtlZjripQg67Kg642w7Iqk64ukIO2FjOudvOyKpOyZgCDtmLjsiJjroZwg67CU66GcIO2Gte2VmOuKlCDsnoXqtawnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgbGF0OjQwLjc3NzczMDQsXHJcbiAgICAgICAgICAgICAgICBsbmc6LTczLjk3NDgzMTFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwbGFpbjon7IS87Yq465+0IO2MjO2BrCDrgrTsl5DshJzrj4Qg7JWE66aE64uk7Jq0IOqyveq0gOydhCDsnpDrnpHtlZjripQg67Kg642w7Iqk64ukIO2FjOudvOyKpOyZgCDtmLjsiJjroZwg67CU66GcIO2Gte2VmOuKlCDsnoXqtawnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgbGF0OjQwLjc2NTIwMTQsXHJcbiAgICAgICAgICAgICAgICBsbmc6LTczLjk3NTA2NzFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwbGFpbjon66+465Oc7YOA7Jq0IOunqO2VtO2KvOydmCDqsbTrrLzrk6TsnbQg7JWE66aE64u16rKMIOu5hOy5mOuKlCDrgqjri6gg7Zi47IiY6rCAJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgIGxhdDo0MC43NjU3MjE1LFxyXG4gICAgICAgICAgICAgICAgbG5nOi03My45NzIwNDE2XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV4cGxhaW46J+uvuOuTnO2DgOyatCDrp6jtlbTtirzsnZgg6rG066y865Ok7J20IOyVhOumhOuLteqyjCDruYTsuZjripQg64Ko64uoIO2YuOyImOqwgCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29vcjp7XHJcbiAgICAgICAgICAgICAgICBsYXQ6NDAuNzgyMDUyNSxcclxuICAgICAgICAgICAgICAgIGxuZzotNzMuOTcxNzQxMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBleHBsYWluOifshLztirjrn7Qg7YyM7YGsIOuCtOyXkOyEnOuPhCDsg4Hsp5XrrLzroZwg6ry97Z6I64qUIOuyqOuUlOu5hOyWtCDshLEsIOuNuOudvOy9lOultO2FjCDqt7nsnqUg65Ox7Jy866GcIO2Gte2VmOuKlCDsnoXqtawnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgbGF0OjQwLjc3NzIwMjQsXHJcbiAgICAgICAgICAgICAgICBsbmc6LTczLjk2MzY0MDlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwbGFpbjon7IS87Yq465+0IO2MjO2BrCDrgrTsl5DshJzrj4Qg7IOB7KeV66y866GcIOq8ve2eiOuKlCDrsqjrlJTruYTslrQg7ISxLCDrjbjrnbzsvZTrpbTthYwg6re57J6lIOuTseycvOuhnCDthrXtlZjripQg7J6F6rWsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgIGxhdDo0MC43ODEwOTM5LFxyXG4gICAgICAgICAgICAgICAgbG5nOi03My45NjA3OTI0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV4cGxhaW46J+yEvO2KuOuftCDtjIztgawg67aB64uoIO2YuOyImCwg65+s64ud7Yq4656Z7Jy866GcIO2Gte2VmOuKlCDsnoXqtawnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgbGF0OjQwLjc4NDEyNCxcclxuICAgICAgICAgICAgICAgIGxuZzotNzMuOTU4NTg3NlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBleHBsYWluOifshLztirjrn7Qg7YyM7YGsIOu2geuLqCDtmLjsiJgsIOufrOuLne2KuOuemeycvOuhnCDthrXtlZjripQg7J6F6rWsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgIGxhdDo0MC43ODc5MTc3LFxyXG4gICAgICAgICAgICAgICAgbG5nOi03My45NTU3ODIxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV4cGxhaW46J+yEvO2KuOuftCDtjIztgawg67aB64uoIO2YuOyImCwg65+s64ud7Yq4656Z7Jy866GcIO2Gte2VmOuKlCDsnoXqtawnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvb3I6e1xyXG4gICAgICAgICAgICAgICAgbGF0OjQwLjc5MzQ1NzQsXHJcbiAgICAgICAgICAgICAgICBsbmc6LTczLjk1MTcyMTJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwbGFpbjon7IS87Yq465+0IO2MjO2BrCDrtoHrtoDsnZgg7Luo7ISc67KE7Yag66asIOqwgOuToCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29vcjp7XHJcbiAgICAgICAgICAgICAgICBsYXQ6NDAuNzg4MTQ1MSxcclxuICAgICAgICAgICAgICAgIGxuZzotNzMuOTY3MjM1MVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBleHBsYWluOifshLztirjrn7Qg7YyM7YGsIOu2geuLqCDtmLjsiJgsIOufrOuLne2KuOuemeycvOuhnCDthrXtlZjripQg7J6F6rWsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgIGxhdDo0MC43ODUyODE2LFxyXG4gICAgICAgICAgICAgICAgbG5nOi03My45NjkzNTk0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV4cGxhaW46J+yEvO2KuOuftCDtjIztgawg67aB64uoIO2YuOyImCwg65+s64ud7Yq4656Z7Jy866GcIO2Gte2VmOuKlCDsnoXqtawnXHJcbiAgICAgICAgfV1cclxuXHJcblxyXG4gICAgICAgIHZhciBjZW50cmFsU2NvcmVBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICB2YXIgdGhlbWUgPSB7ICAgLy9leHBsYWlu7J2YIO2VreuqqeycvOuhnCDrk6TslrTqsIgg64WA7ISdXHJcbiAgICAgICAgICAgICAgICBicm9hZHdheTpbXSxcclxuICAgICAgICAgICAgICAgIGxvd2VyOltdLFxyXG4gICAgICAgICAgICAgICAgY2VudHJhbDpbXVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3VtbWFyeV90aGVtZSA9IHtcclxuICAgICAgICAgICAgYnJvYWR3YXk6JycsXHJcbiAgICAgICAgICAgIGxvd2VyOicnLFxyXG4gICAgICAgICAgICBjZW50cmFsOicnXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG11c2ljYWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbXVzaWNhbFtpXS5tZXRybyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkYXRhLm1ldHJvLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWV0cm8gPSBkYXRhLm1ldHJvW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYobXVzaWNhbFtpXS5jb29yLCBtZXRyby5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkaWY8MzAwKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IG1ldHJvLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBtZXRyby5saW5lW2tdWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobXVzaWNhbFtpXS5tZXRyb1tsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtdXNpY2FsW2ldLm1ldHJvW2xpbmVdLmRpZiA+IGRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVzaWNhbFtpXS5tZXRyb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldHJvLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IG1ldHJvLmNvb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVzaWNhbFtpXS5tZXRyb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IG1ldHJvLmNvb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2cobXVzaWNhbClcclxuICAgICAgICB2YXIgc2NvcmVPYmogPSB7fTtcclxuXHJcblxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiBkYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSBkYXRhLmhvdGVsc1toaWRdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJyb2FkV29yZCA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQudGhlbWUgPSB7XHJcbiAgICAgICAgICAgICAgICBicm9hZDp7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6MFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB3YWxrYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgaGFzTGluZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtdXNpY2FsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHh0ID0gJydcclxuICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoaG90ZWwuY29vciwgbXVzaWNhbFtpXS5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkaWY8NjAwKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYnJvYWREaWZTY29yZSA9ICg2MDAgLSBkaWYpLzQwMFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNjb3JlT2JqW2hpZF0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZU9ialtoaWRdICs9IDEgKyBicm9hZERpZlNjb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlT2JqW2hpZF0gPSAxICsgYnJvYWREaWZTY29yZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+ycoOuqhSDqt7nsnqXrk6TsnbQg66qw66Ck7J6I64qUIOu4jOuhnOuTnOybqOydtCwg7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOyXkOyEnCDqsIDquYzsm4AnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyb2FkV29yZC5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihtdXNpY2FsW2ldLm5hbWUgPT09ICdUS1RTJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCA9ICfri7nsnbwg666k7KeA7LusIO2LsOy8k+ydhCDsoIDroLTtlZjqsowg7JiI66ek7ZWgIOyImCDsnojripQgVEtUUyDti7DsvJPtjJDrp6TrtoDsiqTquYzsp4Ag64+E67O066GcIOyVvSAnICsgKE1hdGguZmxvb3IoZGlmLzYwKSsxKSArICfrtoQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicm9hZFdvcmQucHVzaCh0eHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn666k7KeA7LusICcgKyBtdXNpY2FsW2ldLm5hbWUgKyAnIOqzteyXsOydtCDsl7TrpqzripQgJyArIG11c2ljYWxbaV0udGhlYXRlciArICfquYzsp4Ag64+E67O066GcIOyVvSAnICsgKE1hdGguZmxvb3IoZGlmLzYwKSsxKSArICfrtoQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicm9hZFdvcmQucHVzaCh0eHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2Fsa2FibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHdhbGthYmxlKXtcclxuICAgICAgICAgICAgICAgIHNjb3JlT2JqW2hpZF0gKz0gNDtcclxuICAgICAgICAgICAgICAgIGlmKGJyb2FkV29yZC5sZW5ndGg+NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+uupOyngOy7rOydhCDsl6zrn6wg7Y64IOuzvCDsg53qsIHsnbTrnbzrqbQsIOuwpCDriqbqsowg64Gd64KY64qUIOuupOyngOy7rOydhCDrs7Tqs6Ag7JWI7KCE7ZWY6rKMIOyImeyGjOuhnCDqt4DqsIDtlZjquLAg66ek7JqwIOyii+ydgCDsiJnshowuJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyb2FkV29yZC5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihicm9hZFdvcmQubGVuZ3RoPjIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCA9ICfrrqTsp4Dsu6zsnYQg7Jes65+sIO2OuCDrs7wg7IOd6rCB7J20652866m0LCDrsKQg64qm6rKMIOuBneuCmOuKlCDrrqTsp4Dsu6zsnYQg67O06rOgIOyViOyghO2VmOqyjCDsiJnshozroZwg6reA6rCA7ZWY6riwIOyii+ydgCDsiJnshowuJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyb2FkV29yZC5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7J2867CY7KCB7Jy866GcIOuwpCDriqbqsowg64Gd64KY64qUIOuupOyngOy7rOydhCDrs7Tqs6Ag7JWI7KCE7ZWY6rKMIOyImeyGjOuhnCDqt4DqsIDtlZjquLAg7KKL7J2AIO2OuOyXkCDsho3tlZjripQg7IiZ7IaMLidcclxuICAgICAgICAgICAgICAgICAgICBicm9hZFdvcmQucHVzaCh0eHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZU9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdW06OTk5XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbGluZSBpbiBkYXRhLnNwb3RzLnJhbmtlZFs5XS5tZXRyb0luZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0cm9JbmYgPSBkYXRhLnNwb3RzLnJhbmtlZFs5XS5tZXRyb0luZm9bbGluZV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdhbGtEaWYgPSBtZXRyb0luZi5kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0TmFtZSA9IG1ldHJvSW5mLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhvdGVsTWV0TmFtZSA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1ldHJvRGlmID0gMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5tZXRyb0luZm8pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihPYmplY3Qua2V5cyhob3RlbC5tZXRyb0luZm8pLmluY2x1ZGVzKGxpbmUpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGtEaWYgKz0gaG90ZWwubWV0cm9JbmZvW2xpbmVdLmRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWxNZXROYW1lID0gaG90ZWwubWV0cm9JbmZvW2xpbmVdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0RpZiA9IGNhbGN1bGF0ZURpZihkYXRhLm1ldHJvW21ldHJvSW5mLmNvZGVdLmNvb3IsIGRhdGEubWV0cm9baG90ZWwubWV0cm9JbmZvW2xpbmVdLmNvZGVdLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxpbmVPYmouc3VtID4gd2Fsa0RpZi83NSArIG1ldHJvRGlmLzQwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZU9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0cm86IG1ldHJvRGlmLzQwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsayA6IHdhbGtEaWYvNzUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA6IHdhbGtEaWYvNzUgKyBtZXRyb0RpZi80MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzTGluZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaGFzTGluZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlT2JqW2hpZF0gPSBNYXRoLm1heCgoMTYgLSBsaW5lT2JqLnN1bSkvMi45LCAwKSArIE1hdGgubWF4KCg2LWxpbmVPYmoud2FsaykvMS44LCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+2DgOyehOyKpO2AmOyWtCDrtoDqt7zsnYAg7JWE64uI7KeA66eMIDxzdHJvbmc+7YOA7J6E7Iqk7YCY7Ja06rmM7KeAIOyngO2VmOyyoOuhnCDtmZjsirkg7JeG7J20IOu5oOultOqyjDwvc3Ryb25nPiDsnbTrj5ntlaAg7IiYIOyeiOuKlCDsiJnshowuJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyb2FkV29yZC5wdXNoKHR4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxpbmVPYmoud2FsayA8IDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsaW5lT2JqLnN1bTwxMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg64+E67O0IOydtOuPmeyLnOqwhCDri6ggJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOydmCDso7zsmpQg6re57J6l65Ok6rmM7KeAIOqwiCDsiJgg7J6I7J2MJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU9iai5zdW08MTYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+uPhOuztCDsnbTrj5nsi5zqsIQg64uoICcrIE1hdGgucm91bmQobGluZU9iai53YWxrKSArJ+u2hOydhCDtj6ztlajtlbQg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IO2DgOyehOyKpO2AmOyWtCDrtoDqt7zsnZgg7KO87JqUIOq3ueyepeuTpOq5jOyngCDqsIgg7IiYIOyeiOydjCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOydmCDso7zsmpQg6re57J6l65Ok6rmM7KeA64qUIOuPhOuztCDsnbTrj5nsi5zqsIQgJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbQg7IaM7JqU65CoLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGxpbmVPYmoud2FsayA8IDcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsaW5lT2JqLnN1bTwxMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg64+E67O0IOydtOuPmeyLnOqwhCDslb0gJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOydmCDso7zsmpQg6re57J6l65Ok6rmM7KeAIOqwiCDsiJgg7J6I7J2MJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU9iai5zdW08MTYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+uPhOuztCDsnbTrj5nsi5zqsIQg7JW9ICcrIE1hdGgucm91bmQobGluZU9iai53YWxrKSArJ+u2hOydhCDtj6ztlajtlbQg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IO2DgOyehOyKpO2AmOyWtCDrtoDqt7zsnZgg7KO87JqUIOq3ueyepeuTpOq5jOyngCDqsIgg7IiYIOyeiOydjCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOydmCDso7zsmpQg6re57J6l65Ok6rmM7KeA64qUIOuPhOuztCDsnbTrj5nsi5zqsIQgJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbQg7IaM7JqU65CoLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsaW5lT2JqLnN1bTwxMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg64+E67O0IOydtOuPmeyLnOqwhCDslb0gJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOydmCDso7zsmpQg6re57J6l65Ok6rmM7KeAIOqwiCDsiJgg7J6I7J2MJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU9iai5zdW08MTYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+uPhOuztCDsnbTrj5nsi5zqsIQg7JW9ICcrIE1hdGgucm91bmQobGluZU9iai53YWxrKSArJ+u2hOydhCDtj6ztlajtlbQg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IO2DgOyehOyKpO2AmOyWtCDrtoDqt7zsnZgg7KO87JqUIOq3ueyepeuTpOq5jOyngCDqsIgg7IiYIOyeiOydjCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7YOA7J6E7Iqk7YCY7Ja0IOu2gOq3vOydmCDso7zsmpQg6re57J6l65Ok6rmM7KeA64qUIOuPhOuztCDsnbTrj5nsi5zqsIQgJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbQg7IaM7JqU65CoLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJvYWRXb3JkLnB1c2godHh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaG90ZWwuZXhwbGFpbi50aGVtZSA9IHtcclxuICAgICAgICAgICAgICAgIGJyb2FkOmJyb2FkV29yZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBicm9hZFNjb3JlQXJyYXkgPSBbXVxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiBzY29yZU9iaikge1xyXG4gICAgICAgICAgICB2YXIgc2MgPSBzY29yZU9ialtoaWRdO1xyXG4gICAgICAgICAgICBpZihzYz45KXtcclxuICAgICAgICAgICAgICAgIHNjID0gTWF0aC5yb3VuZChzYy8wLjM4NSkvMTAgKyA2LjVcclxuICAgICAgICAgICAgICAgIGlmKHNjPjEwLjIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjID0gOS45XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihzYz4xMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2MgPSA5LjhcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNjPjkuOCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2MgPSA5LjdcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNjPjkuNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2MgPSA5LjZcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYoc2M+NCl7XHJcbiAgICAgICAgICAgICAgICBzYyA9IE1hdGgucm91bmQoKHNjKzI3KS8wLjQpLzEwXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc2MgPSBNYXRoLnJvdW5kKHNjKjEwKzQwKS8xMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHNjPDgpe1xyXG4gICAgICAgICAgICAgICAgc2MgPSBNYXRoLnJvdW5kKHNjKjUpLzEwICsgNFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicm9hZFNjb3JlQXJyYXkucHVzaChzYylcclxuICAgICAgICAgICAgZGF0YS5ob3RlbHNbaGlkXS5hc3Nlc3NtZW50LnRoZW1lLmJyb2FkID0gc2M7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgY2VudHJhbFdvcmQgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjZW50cmFsU3VtbWFyeSA9ICcnXHJcbiAgICAgICAgICAgIGxldCBjb29yID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhob3RlbC5jb29yLmxhdCwgaG90ZWwuY29vci5sbmcpXHJcblxyXG4gICAgICAgICAgICB2YXIgc2NvcmUgPSAwXHJcblxyXG4gICAgICAgICAgICB2YXIgaGFzU3BvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgY2VudHJhbE5lYXJTcG90ID0ge1xyXG4gICAgICAgICAgICAgICAgZGlmOjcwMCxcclxuICAgICAgICAgICAgICAgIGV4cGxhaW46XCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCA9ICcnXHJcbiAgICAgICAgICAgIHZhciBzZWNvbmR0eHQgPSAnJ1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZW50cmFsU3BvdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBzcG90Q29vciA9IGNlbnRyYWxTcG90c1tpXS5jb29yO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihzcG90Q29vciwgaG90ZWwuY29vcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGlmPGNlbnRyYWxOZWFyU3BvdC5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlID0gKGkrMzApLzQwICsgTWF0aC5taW4oKDcwMCAtIGRpZikvNDUwLDEpXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbE5lYXJTcG90LmRpZiA9IGRpZjtcclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsTmVhclNwb3QuZXhwbGFpbiA9IGNlbnRyYWxTcG90c1tpXS5leHBsYWluXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzU3BvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihoYXNTcG90KXtcclxuICAgICAgICAgICAgICAgIHNlY29uZHR4dCA9ICfrmJDtlZwgPHN0cm9uZz4nK2NlbnRyYWxOZWFyU3BvdC5leHBsYWluO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNlbnRyYWxOZWFyU3BvdC5kaWY8MTUwKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWNvbmR0eHQrPSAn7JeQ7IScIOuLqCAxfjLrtoQg6rGw66asPC9zdHJvbmc+7JeQIOyeiOyWtCDshLztirjrn7TtjIztgazrpbwg642UIOymkOq4sOq4sCDsoovsnYwuJ1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoY2VudHJhbE5lYXJTcG90LmRpZjwzMDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZHR4dCs9ICfsl5DshJwgM34067aEIOqxsOumrDwvc3Ryb25nPuyXkCDsnojslrQg7IS87Yq465+07YyM7YGs66W8IOuNlCDsppDquLDquLAg7KKL7J2MLidcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZHR4dCs9ICc8L3N0cm9uZz7sl5DshJwg6rCA6rmM7JuMIOyEvO2KuOuftO2MjO2BrOulvCDrjZQg7KaQ6riw6riwIOyii+ydjC4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGdvb2dsZS5tYXBzLmdlb21ldHJ5LnBvbHkuY29udGFpbnNMb2NhdGlvbihjb29yLCBjZW50cmFsTmVhcmVzdCkpe1xyXG4gICAgICAgICAgICAgICAgdHh0ID0gJ+yEvO2KuOuftO2MjO2BrOyZgCA8c3Ryb25nPuuPhOuztCDri6ggMn4z67aEIOqxsOumrDwvc3Ryb25nPuuhnCwg7IKw7LGF7J2EIOyii+yVhO2VmOuKlCDsgqzrnozsl5Dqsowg7JWI7ISx66ee7LakJ1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gOTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihoYXNTcG90KXtcclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9ICfshLztirjrn7TtjIztgazsmYAgPHN0cm9uZz7rj4Trs7Qg64uoIDJ+M+u2hOqxsOumrDwvc3Ryb25nPuuhnCDrp6TsmrAg6rCA6rmM7Jq4IOu/kOunjCDslYTri4jrnbwsIO2Kue2eiCA8c3Ryb25nPicrY2VudHJhbE5lYXJTcG90LmV4cGxhaW4rJzwvc3Ryb25nPuyXkOyEnCDqsIDquYzsm4wg7IS87Yq465+07YyM7YGs66W8IOuNlCDsppDquLDquLAg7KKL7J2MJ1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSB0eHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGdvb2dsZS5tYXBzLmdlb21ldHJ5LnBvbHkuY29udGFpbnNMb2NhdGlvbihjb29yLCBjZW50cmFsTmVhcikpe1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gOC42NTtcclxuICAgICAgICAgICAgICAgIHR4dCA9ICfshLztirjrn7TtjIztgazsmYAgPHN0cm9uZz7rj4Trs7QgNH4167aEIOqxsOumrDwvc3Ryb25nPuuhnCwg7IKw7LGF7J2EIOyii+yVhO2VmOuKlCDsgqzrnozsl5Dqsowg7JWI7ISx66ee7LakJ1xyXG4gICAgICAgICAgICAgICAgaWYoaGFzU3BvdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSAn7IS87Yq465+07YyM7YGs7JmAIDxzdHJvbmc+64+E67O0IDR+Neu2hOqxsOumrDwvc3Ryb25nPuuhnCDrp6TsmrAg6rCA6rmM7Jq4IOu/kOunjCDslYTri4jrnbwsIO2Kue2eiCA8c3Ryb25nPicrY2VudHJhbE5lYXJTcG90LmV4cGxhaW4rJzwvc3Ryb25nPuyXkOyEnCDqsIDquYzsm4wg7IS87Yq465+07YyM7YGs66W8IOuNlCDsppDquLDquLAg7KKL7J2MJ1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSB0eHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGdvb2dsZS5tYXBzLmdlb21ldHJ5LnBvbHkuY29udGFpbnNMb2NhdGlvbihjb29yLCBjZW50cmFsTWlkKSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSA4LjI1O1xyXG4gICAgICAgICAgICAgICAgdHh0ID0gJ+yEvO2KuOuftO2MjO2BrOyXkOyEnCA8c3Ryb25nPuuPhOuztCA2fjfrtoQg6rGw66asPC9zdHJvbmc+66GcLCDsgrDssYXsnYQg7KKL7JWE7ZWY64qUIOyCrOuejOyXkOqyjCDsoovsnYwnXHJcbiAgICAgICAgICAgICAgICBpZihoYXNTcG90KXtcclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9ICfshLztirjrn7TtjIztgazsmYAg64+E67O0IDZ+N+u2hCDqsbDrpqzroZwg6rCA6rmM7Jq4IOu/kOunjCDslYTri4jrnbwsIO2Kue2eiCA8c3Ryb25nPicrY2VudHJhbE5lYXJTcG90LmV4cGxhaW4rJzwvc3Ryb25nPuyXkOyEnCDqsIDquYzsm4wg7IS87Yq465+07YyM7YGs66W8IOuNlCDsppDquLDquLAg7KKL7J2MJ1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSB0eHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGdvb2dsZS5tYXBzLmdlb21ldHJ5LnBvbHkuY29udGFpbnNMb2NhdGlvbihjb29yLCBjZW50cmFsRmFyKSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSA4O1xyXG4gICAgICAgICAgICAgICAgdHh0ID0gJ+yEvO2KuOuftO2MjO2BrOyXkOyEnCA8c3Ryb25nPuuPhOuztCAxMOu2hCDsnbTrgrQg6rGw66asPC9zdHJvbmc+66GcLCDsgrDssYXsnYQg7KKL7JWE7ZWY64qUIOyCrOuejOyXkOqyjCDsoovsnYwnXHJcbiAgICAgICAgICAgICAgICBpZihoYXNTcG90KXtcclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9ICfshLztirjrn7TtjIztgazsmYAg64+E67O0IDEw67aEIOydtOuCtCDqsbDrpqzroZwg6rCA6rmM7Jq4IOu/kOunjCDslYTri4jrnbwsIO2Kue2eiCA8c3Ryb25nPicrY2VudHJhbE5lYXJTcG90LmV4cGxhaW4rJzwvc3Ryb25nPuyXkOyEnCDqsIDquYzsm4wg7IS87Yq465+07YyM7YGs66W8IOuNlCDsppDquLDquLAg7KKL7J2MJ1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSB0eHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKHNjb3JlPjcuOSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSA9IChzY29yZS04KS8xLjUgKyA4O1xyXG4gICAgICAgICAgICAgICAgY2VudHJhbFdvcmQucHVzaCh0eHQpO1xyXG4gICAgICAgICAgICAgICAgaWYoaGFzU3BvdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFdvcmQucHVzaChzZWNvbmR0eHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v7J207KCcIOyngO2VmOyyoOydhCDssL7slYTrs7TsnpBcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZU9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdW06OTk5XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzTGluZSA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbGluZSBpbiBkYXRhLnNwb3RzLnJhbmtlZFs0XS5tZXRyb0luZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0cm9JbmYgPSBkYXRhLnNwb3RzLnJhbmtlZFs0XS5tZXRyb0luZm9bbGluZV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdhbGtEaWYgPSBtZXRyb0luZi5kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0TmFtZSA9IG1ldHJvSW5mLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhvdGVsTWV0TmFtZSA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1ldHJvRGlmID0gMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5tZXRyb0luZm8pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihPYmplY3Qua2V5cyhob3RlbC5tZXRyb0luZm8pLmluY2x1ZGVzKGxpbmUpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGtEaWYgKz0gaG90ZWwubWV0cm9JbmZvW2xpbmVdLmRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWxNZXROYW1lID0gaG90ZWwubWV0cm9JbmZvW2xpbmVdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0RpZiA9IGNhbGN1bGF0ZURpZihkYXRhLm1ldHJvW21ldHJvSW5mLmNvZGVdLmNvb3IsIGRhdGEubWV0cm9baG90ZWwubWV0cm9JbmZvW2xpbmVdLmNvZGVdLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxpbmVPYmouc3VtID4gd2Fsa0RpZi83NSArIG1ldHJvRGlmLzQwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZU9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0cm86IG1ldHJvRGlmLzQwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsayA6IHdhbGtEaWYvNzUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA6IHdhbGtEaWYvNzUgKyBtZXRyb0RpZi80MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobGluZU9iai5zdW0gPCAxNil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0xpbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaGFzTGluZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+ydtCDsiJnshozripQg7IS87Yq465+07YyM7YGsIOu2gOq3vOydgCDslYTri4jsp4Drp4wg7IS87Yq465+07YyM7YGs6rmM7KeAIOyngO2VmOyyoOuhnCDtmZjsirkg7JeG7J20IOu5oOultOqyjCDqsIgg7IiYIOyeiOydjC4nXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbFdvcmQucHVzaCh0eHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihsaW5lT2JqLndhbGsgPCA0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSA3LjUgKyBNYXRoLnJvdW5kKCgxMiAtIGxpbmVPYmouc3VtLzIpKS8xMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsaW5lT2JqLnN1bTwxMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg64+E67O0IOydtOuPmeyLnOqwhCDri6ggJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7IS87Yq465+07YyM7YGs7JeQIOuPhOuLrCDqsIDriqUuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSAn7IS87Yq465+07YyM7YGsIOu2gOq3vOydgCDslYTri4jsp4Drp4wg7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IOyEvO2KuOuftO2MjO2BrCDrj4TssKkuJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU9iai5zdW08MTYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+uPhOuztCDsnbTrj5nsi5zqsIQg64uoICcrIE1hdGgucm91bmQobGluZU9iai53YWxrKSArJ+u2hOydhCDtj6ztlajtlbQg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IOyEvO2KuOuftO2MjO2BrCDrj4TssKknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9ICfshLztirjrn7TtjIztgawg67aA6re87J2AIOyVhOuLiOyngOunjCDsp4DtlZjssqDsnbQg66ek7JqwIOqwgOq5jOybjCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7IS87Yq465+07YyM7YGsIOuPhOywqS4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU9iai53YWxrIDwgNyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gNyArIE1hdGgucm91bmQoKDEyIC0gbGluZU9iai5zdW0vMikpLzEwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxpbmVPYmouc3VtPDEyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCA9ICfsp4DtlZjssqDsnbQg66ek7JqwIOqwgOq5jOybjCDrj4Trs7Qg7J2064+Z7Iuc6rCEIOyVvSAnKyBNYXRoLnJvdW5kKGxpbmVPYmoud2FsaykgKyfrtoTsnYQg7Y+s7ZWo7ZW0IOyVvSAnICsgKE1hdGgucm91bmQobGluZU9iai5zdW0pKzIpICsgJ+u2hOydtOuptCDshLztirjrn7TtjIztgazsl5Ag64+E64usIOqwgOuKpS4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9ICfshLztirjrn7TtjIztgawg67aA6re87J2AIOyVhOuLiOyngOunjCDsp4DtlZjssqDsnbQg66ek7JqwIOqwgOq5jOybjCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7IS87Yq465+07YyM7YGsIOuPhOywqS4nO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobGluZU9iai5zdW08MTYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+uPhOuztCDsnbTrj5nsi5zqsIQg7JW9ICcrIE1hdGgucm91bmQobGluZU9iai53YWxrKSArJ+u2hOydhCDtj6ztlajtlbQg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IOyEvO2KuOuftO2MjO2BrOyXkCDrj4Tri6wg6rCA64qlLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRyYWxTdW1tYXJ5ID0gJ+yEvO2KuOuftO2MjO2BrCDrtoDqt7zsnYAg7JWE64uI7KeA66eMIOyngO2VmOyyoOydtCDrp6TsmrAg6rCA6rmM7JuMIOyVvSAnICsgKE1hdGgucm91bmQobGluZU9iai5zdW0pKzIpICsgJ+u2hOydtOuptCDshLztirjrn7TtjIztgawg64+E7LCpLic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSA2LjUgKyBNYXRoLnJvdW5kKCgxMiAtIGxpbmVPYmouc3VtLzIpKS8xMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsaW5lT2JqLnN1bTwxMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg64+E67O0IOydtOuPmeyLnOqwhCDslb0gJysgTWF0aC5yb3VuZChsaW5lT2JqLndhbGspICsn67aE7J2EIO2PrO2VqO2VtCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7IS87Yq465+07YyM7YGs7JeQIOuPhOuLrCDqsIDriqUuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudHJhbFN1bW1hcnkgPSAn7IS87Yq465+07YyM7YGsIOu2gOq3vOydgCDslYTri4jsp4Drp4wg7KeA7ZWY7LKg7J20IOunpOyasCDqsIDquYzsm4wg7JW9ICcgKyAoTWF0aC5yb3VuZChsaW5lT2JqLnN1bSkrMikgKyAn67aE7J2066m0IOyEvO2KuOuftO2MjO2BrCDrj4TssKkuJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGxpbmVPYmouc3VtPDE2KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCA9ICfrj4Trs7Qg7J2064+Z7Iuc6rCEIOyVvSAnKyBNYXRoLnJvdW5kKGxpbmVPYmoud2FsaykgKyfrtoTsnYQg7Y+s7ZWo7ZW0IOyVvSAnICsgKE1hdGgucm91bmQobGluZU9iai5zdW0pKzIpICsgJ+u2hOydtOuptCDshLztirjrn7TtjIztgazsl5Ag64+E64usIOqwgOuKpS4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9ICfshLztirjrn7TtjIztgawg67aA6re87J2AIOyVhOuLiOyngOunjCDsp4DtlZjssqDsnbQg66ek7JqwIOqwgOq5jOybjCDslb0gJyArIChNYXRoLnJvdW5kKGxpbmVPYmouc3VtKSsyKSArICfrtoTsnbTrqbQg7IS87Yq465+07YyM7YGsIOuPhOywqS4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsV29yZC5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7J20IOyImeyGjOuKlCDshLztirjrn7TtjIztgazsmYAg6rCA6rmM7J20IOyeiOyngOuKlCDslYrsp4Drp4wg64uk66W4IOyepeygkOuTpCDrlYzrrLjsl5Ag7LaU7LKc65CoLidcclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsU3VtbWFyeSA9IHR4dDtcclxuICAgICAgICAgICAgICAgICAgICBjZW50cmFsV29yZC5wdXNoKHR4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSA2XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNjb3JlID0gTWF0aC5mbG9vcihzY29yZSoxMCkvMTA7XHJcbiAgICAgICAgICAgIGNlbnRyYWxTY29yZUFycmF5LnB1c2goc2NvcmUpO1xyXG4gICAgICAgICAgICBpZihob3RlbC5leHBsYWluLnRoZW1lKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4udGhlbWUuY2VudHJhbCA9IGNlbnRyYWxXb3JkO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4udGhlbWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudHJhbCA6IGNlbnRyYWxXb3JkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJyb2FkU2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBiIC0gYSlcclxuICAgICAgICBjb25zb2xlLmxvZyhicm9hZFNjb3JlQXJyYXkpXHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpdHkpLnVwZGF0ZSh0aGlzLmRhdGEpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvdGVsO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvaG90ZWwuanMiLCJsZXQgQXJlYSA9IHtcclxuICAgIGRhdGE6e30sXHJcbiAgICBjaXR5OlwiXCIsXHJcbiAgICBjaXR5TmFtZTpcIlwiLFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAkKFwiLmFyZWFfX3BhZ2VcIikub24oXCJjaGFuZ2VcIiwgXCIuYXJlYV9fbGluZSBpbnB1dFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LnNjb3JlQ2hhbmdlKCQodGhpcykpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2lkLCBuYW1lKXtcclxuICAgICAgICAkKFwiLmNpdHlOYW1lXCIpLmh0bWwobmFtZSkuYXR0cihcImlkXCIsIGNpZCk7XHJcbiAgICAgICAgJChcIi5jaXR5Q29kZVZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmNpdHlfX3BhZ2VzIFwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuYXJlYVwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5jaXR5ID0gY2lkO1xyXG4gICAgICAgIHRoaXMuY2l0eU5hbWUgPSBuYW1lO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLmluZmxhdGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmVDaGFuZ2U6IGZ1bmN0aW9uKGRpdil7XHJcblxyXG4gICAgICAgIGlmKGlzTmFOKGRpdi52YWwoKSoxKSl7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi7Iir7J6Q66Gc66eMIOyeheugpe2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgZGl2LnZhbCgwKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoZGl2LnZhbCgpPjEwfHxkaXYudmFsKCk8MSl7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIjF+MTAg7IKs7J207J2YIOyIq+yekOulvCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICBkaXYudmFsKDApO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGRpdi5oYXNDbGFzcyhcImlucHV0X19zY29yZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkeCA9ICQoXCIuaW5wdXRfX3Njb3JlXCIpLmluZGV4KGRpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LnZhbChkaXYudmFsKCkqMSlcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdCh0aGlzLmRhdGEuYXJlYVtpZHhdLm5hbWUrXCLsnZgg7LmY7JWI7KCQ7IiY6rCAIFwiK2Rpdi52YWwoKSoxK1wi7KCQ7Jy866GcIOuzgOqyveuQmOyXiOyKteuLiOuLpC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrdGhpcy5jaXR5K1wiL2FyZWEvXCIraWR4K1wiL3NhZmV0eS9zY29yZVwiKS5zZXQoZGl2LnZhbCgpKVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoZGl2Lmhhc0NsYXNzKFwiaW5wdXRfX21pc2RlbWVhbm9yXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWR4ID0gJChcIi5pbnB1dF9fbWlzZGVtZWFub3JcIikuaW5kZXgoZGl2KTtcclxuICAgICAgICAgICAgICAgICAgICBkaXYudmFsKGRpdi52YWwoKSoxKVxyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KHRoaXMuZGF0YS5hcmVhW2lkeF0ubmFtZStcIuydmCDqsr3rspTso4Qg7KCQ7IiY6rCAIFwiK2Rpdi52YWwoKSoxK1wi7KCQ7Jy866GcIOuzgOqyveuQmOyXiOyKteuLiOuLpC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrdGhpcy5jaXR5K1wiL2FyZWEvXCIraWR4K1wiL3NhZmV0eS9taXNkZW1lYW5vclwiKS5zZXQoZGl2LnZhbCgpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuICAgICAgICBsZXQgYXJlYWRhdGEgPSB7fVxyXG5cclxuICAgICAgICBpZih0aGlzLmRhdGEuYXJlYSl7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kYXRhLmFyZWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBhcmVhID0gdGhpcy5kYXRhLmFyZWFbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcmVhKVxyXG4gICAgICAgICAgICAgICAgaWYoIWFyZWEubm90QXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ruIzroZzrk5zsm6jsnbQsIOyEvO2KuOuftO2MjO2BrCDrk7Eg64ST7J2AIOyngOyXreydhCDssKjsp4DtlZjripQg6rSA6rSR7KeA64+EIGFyZWEg7Leo6riJ7ZWY6riwIOuVjOusuOyXkCDqsbjrn6zrgrTquLBcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXJlYV9fZGl2XCI+J1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJhcmVhX19saW5lXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgICAgICc8cCBjbGFzcz1cImFyZWFfX25hbWVcIj4nK2FyZWEubmFtZSsnPC9wPidcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZWEuc2FmZXR5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhcmVhX19saW5lX19zdWJUaXRsZVwiPuy5mOyViOygkOyImDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZWEuc2FmZXR5LnNjb3JlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxpbnB1dCBjbGFzcz1cImFyZWFfX2xpbmVfX2lucHV0LS1zaG9ydCBpbnB1dF9fc2NvcmVcIiB2YWx1ZT1cIicrYXJlYS5zYWZldHkuc2NvcmUrJ1wiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8aW5wdXQgY2xhc3M9XCJhcmVhX19saW5lX19pbnB1dC0tc2hvcnQgaW5wdXRfX3Njb3JlXCIgdmFsdWU9XCIwXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImFyZWFfX2xpbmVfX3N1YlRpdGxlXCI+6rK967KU7KOE7KCQ7IiYPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXJlYS5zYWZldHkubWlzZGVtZWFub3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPGlucHV0IGNsYXNzPVwiYXJlYV9fbGluZV9faW5wdXQtLXNob3J0IGlucHV0X19taXNkZW1lYW5vclwiIHZhbHVlPVwiJythcmVhLnNhZmV0eS5taXNkZW1lYW5vcisnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxpbnB1dCBjbGFzcz1cImFyZWFfX2xpbmVfX2lucHV0LS1zaG9ydCBpbnB1dF9fbWlzZGVtZWFub3JcIiB2YWx1ZT1cIjBcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhcmVhX19saW5lX19zdWJUaXRsZVwiPuy5mOyViOygkOyImDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxpbnB1dCBjbGFzcz1cImFyZWFfX2xpbmVfX2lucHV0LS1zaG9ydCBpbnB1dF9fc2NvcmVcIiB2YWx1ZT1cIjBcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXJlYV9fbGluZV9fc3ViVGl0bGVcIj7qsr3rspTso4TsoJDsiJg8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8aW5wdXQgY2xhc3M9XCJhcmVhX19saW5lX19pbnB1dC0tc2hvcnQgaW5wdXRfX21pc2RlbWVhbm9yXCIgdmFsdWU9XCIwXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5hcmVhX19wYWdlXCIpLmh0bWwodHh0KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFyZWE7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9hcmVhLmpzIiwibGV0IFN1YndheSA9IHtcclxuICAgIG1hcDp7fSxcclxuICAgIG1hcmtlcjpmYWxzZSxcclxuICAgIG1ldHJvOltdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieWxvXCIpXHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL255Yy9tZXRyb1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQubWV0cm8gPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJ3YXlNYXAnKSwge1xyXG4gICAgICAgICAgICAgICAgY2VudGVyOiB7IGxhdDogNDAuNzQ4NDQsIGxuZzogLTczLjk4NTY2IH0sXHJcbiAgICAgICAgICAgICAgICB6b29tOiAxMyxcclxuICAgICAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNjYWxlQ29udHJvbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW5Db250cm9sOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWFwLmFkZExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kU3Vid2F5KGUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGZpbmRTdWJ3YXk6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGxldCBjb29yID0ge1xyXG4gICAgICAgICAgICBsYXQ6ZS5sYXRMbmcubGF0KCksXHJcbiAgICAgICAgICAgIGxuZzplLmxhdExuZy5sbmcoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5tYXJrZXIpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtlci5zZXRNYXAobnVsbClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBlLmxhdExuZyxcclxuICAgICAgICAgICAgbWFwOiB0aGlzLm1hcFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdHh0ID0gJydcclxuICAgICAgICBsZXQgbWV0cm9JbmZvID0ge31cclxuICAgICAgICBsZXQgbWV0cm9CeVN0biA9IHt9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ3MzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRyb05hbWUgPSB0aGlzLm1ldHJvW2ldLm5hbWU7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGlmID0gTWF0aC5yb3VuZChjYWxjdWxhdGVEaWYoY29vcix0aGlzLm1ldHJvW2ldLmNvb3IpKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGRpZjw3MDApe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLm1ldHJvW2ldLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IHRoaXMubWV0cm9baV0ubGluZVtrXS5zbGljZSgwLDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihtZXRyb0luZm9bbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkaWY8bWV0cm9JbmZvW2xpbmVdLmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0luZm9bbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbWV0cm9OYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0cm9JbmZvW2xpbmVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyb05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihtZXRyb0J5U3RuW21ldHJvTmFtZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldHJvQnlTdG5bbWV0cm9OYW1lXS5saW5lID0gbWV0cm9CeVN0blttZXRyb05hbWVdLmxpbmUuY29uY2F0KHRoaXMubWV0cm9baV0ubGluZSlcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldHJvQnlTdG5bbWV0cm9OYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMubWV0cm9baV0ubGluZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1ldEFycmF5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgbGluZSBpbiBtZXRyb0luZm8pIHtcclxuICAgICAgICAgICAgbWV0QXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBsaW5lOmxpbmUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOm1ldHJvSW5mb1tsaW5lXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgZGlmOm1ldHJvSW5mb1tsaW5lXS5kaWZcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWV0U3RuQXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBuYW1lIGluIG1ldHJvQnlTdG4pIHtcclxuICAgICAgICAgICAgbWV0U3RuQXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBsaW5lOm1ldHJvQnlTdG5bbmFtZV0ubGluZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6bmFtZSxcclxuICAgICAgICAgICAgICAgIGRpZjptZXRyb0J5U3RuW25hbWVdLmRpZlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldEFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmRpZiA+IGIuZGlmID8gMSA6IGEuZGlmIDwgYi5kaWYgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBtZXRTdG5BcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5kaWYgPiBiLmRpZiA/IDEgOiBhLmRpZiA8IGIuZGlmID8gLTEgOiAwO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHR4dCs9JzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX190aXRsZVwiPuyXreuzhDwvcD4nXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fZGl2XCI+J1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0U3RuQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fbGluZVwiPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19zdG5OYW1lXCI+JysgbWV0U3RuQXJyYXlbaV0ubmFtZSArICfsl608L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX2RpZlwiPicrIE1hdGguY2VpbChtZXRTdG5BcnJheVtpXS5kaWYvODApICsgJ+u2hCDqsbDrpqw8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fbGluZUxpbmVcIj4nXHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbWV0U3RuQXJyYXlbaV0ubGluZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgaWYobWV0U3RuQXJyYXlbaV0ubGluZVtrXS5sZW5ndGggPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fbGluZU5hbWUgbG5fJyttZXRTdG5BcnJheVtpXS5saW5lW2tdKydcIj4nK21ldFN0bkFycmF5W2ldLmxpbmVba10gKyAnPC9wPidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQrPSAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3RpdGxlXCI+64W47ISg67OEPC9wPidcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19kaXZcIj4nXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fbGluZU5hbWUgbG5fJyttZXRBcnJheVtpXS5saW5lKydcIj4nK21ldEFycmF5W2ldLmxpbmUgKyAnPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpZlwiPicrIE1hdGguY2VpbChtZXRBcnJheVtpXS5kaWYvODApICsgJ+u2hCDqsbDrpqw8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fc3RuTmFtZVwiPicrIG1ldEFycmF5W2ldLm5hbWUgKyAn7JetPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG4gICAgICAgICQoXCIuc3Vid2F5X19pbmZvXCIpLmh0bWwodHh0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3Vid2F5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL3N1YndheS5qcyIsImxldCBBY2NvdW50ID0ge1xyXG4gICAgdXNlcjoge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHVpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZih1aWQgIT09IGlkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJbdWlkXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YVt1aWRdLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJChcImhlYWRlciB1bFwiKS5wcmVwZW5kKCc8bGkgaWQ9XCJuYXZfYWNjb3VudFwiPu2ajOqzhDwvbGk+Jyk7XHJcblxyXG4gICAgICAgICAgICAkKFwiaGVhZGVyIHVsXCIpLm9uKFwiY2xpY2tcIiwgXCIjbmF2X2FjY291bnRcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICQoXCJoZWFkZXIgbGlcIikucmVtb3ZlQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcIi0tc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnBhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnBhZ2VzLmFjY291bnRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICQoJyNhY2NvdW50Q2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF5Q2xpY2s6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbmZsYXRlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2FjY291bnQuanMiXSwic291cmNlUm9vdCI6IiJ9