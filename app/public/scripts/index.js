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

        if (status.facility) {}
        if (status.costEff) {}
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
                shortTxt += '유동인구가 매우 많은 맨해튼 한복판에 위치하고, 지하철도 가까워 밤 늦게까지 안전하지만 소매치기 등 경범죄에는 조심해야 함';
            } else {
                if (hotel.local.spot.length > 0) {
                    if (safety_local.grocery > 0) {
                        if (safety_local.atm > 0) {
                            localTxt += '주변 상업시설, 편의시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 유동인구가 매우 많음.';
                            localGood = true;
                        } else {
                            localTxt += '주변 편의시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 유동인구 많음.';
                            localGood = true;
                        }
                    } else {
                        if (safety_local.atm > 0) {
                            localTxt += '주변 상업시설이 잘 갖추어져 있고, ' + hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 유동인구 많음.';
                            localGood = true;
                        } else {
                            localTxt += hotel.local.spot[0].name.ko + ' 등 유명 관광지가 가까워 유동인구가 많음.';
                            localGood = true;
                        }
                    }
                } else {
                    if (safety_local.grocery > 0) {
                        if (safety_local.atm > 0) {
                            localTxt += '주변 상업시설, 편의시설이 잘 갖추어져 있어 유동인구가 많음.';
                            localGood = true;
                        } else {}
                    } else {
                        if (safety_local.atm > 0) {} else {}
                    }
                }
            }

            if (areaScore > 7.5) {
                if (!safety_local.area) {
                    shortTxt += '전반적으로 치안이 좋은 ' + areaName + ' 지역에 위치하고 있';
                }

                if (localGood) {
                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 주변 유동인구가 많고 지하철이 가까워 밤 늦게까지도 매우 안전함.';
                        } else {
                            shortTxt += '으며, 주변 유동인구가 많아 지역 내에서도 더 안전한 편.';
                        }
                    }
                } else {
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 아주 많지는 않은 편.';

                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 지하철이 가까워 밤 늦게 귀가할 때도 안전한 편.';
                        } else {
                            shortTxt += '지만 너무 밤 늦게 돌아다니는 것은 삼가는 것이 좋음.';
                        }
                    }
                }
            } else if (areaScore > 6.8) {

                if (!safety_local.area) {
                    shortTxt += '치안이 좋은 편인 ' + areaName + ' 지역에 위치하고 있';
                }

                if (localGood) {

                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 주변 유동인구가 많고 지하철이 가까워 밤 늦게까지도 안전한 편.';
                        } else {
                            shortTxt += '으며, 주변 유동인구가 많아 지역 내에서도 안전한 편.';
                        }
                    }
                } else {
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 아주 많지는 않은 편.';

                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 지하철이 가까워 밤 늦게 귀가할 때도 안전한 편.';
                        } else {
                            shortTxt += '지만 너무 밤 늦게 돌아다니는 것은 삼가는 것이 좋음.';
                        }
                    }
                }
            } else if (areaScore > 6) {
                if (!safety_local.area) {
                    shortTxt += areaName + ' 지역에 위치하고 있';
                }

                if (localGood) {
                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 주변 유동인구가 많고 지하철이 가까워 밤 늦게 귀가할 때도 안전한 편.';
                        } else {
                            shortTxt += '으며, 주변 유동인구가 많아 안전한 편이지만 너무 밤 늦게 귀가하는 것은 삼가는 것이 좋음.';
                        }
                    }
                } else {
                    localTxt += '지역 내 다른 숙소들에 비해 주변 유동인구가 많지는 않은 편에 속함.';

                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 지하철이 가깝지만 너무 밤 늦게 귀가하는 것은 삼가는 것이 좋음.';
                        } else {
                            shortTxt += '으며, 주변 유동인구가 아주 많은 편은 아니므로 밤 늦게 돌아다니지 않는 것이 좋음.';
                        }
                    }
                }
            } else {
                if (!safety_local.area) {
                    shortTxt += '전반적으로 치안이 좋지 않은 편인 ' + areaName + ' 지역에 위치하고 있';
                }

                if (localGood) {
                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 유동인구가 많고 지하철이 가까워 지역 내에서는 안전한 편이지만 늦은 시간 귀가는 삼가는 것이 좋음.';
                        } else {
                            shortTxt += '으며, 주변 유동인구가 많은 편이지만 늦은 시간 귀가하지 않는 것이 좋음.';
                        }
                    }
                } else {
                    localTxt += '주변에 많은 시설이 있거나 유명한 관광지가 있지 않아 유동인구가 지역 내에서도 많지 않은 편.';
                    if (!safety_local.area) {
                        if (hotel.local.nearestMetro.distance < 100) {
                            shortTxt += '으며, 지하철이 가깝지만 유동인구가 많지 않은 편이므로 안전에 유의해야 함.';
                        } else {
                            shortTxt += '으며, 유동인구가 많지 않아 안전에 유의해야 함.';
                        }
                    }
                }
            }

            safe_txt.push(localTxt);

            var met = hotel.local.nearestMetro;
            var metDis = met.distance;
            var metTxt = '가장 가까운 지하철 역은 ' + met.line + '호선 ' + met.name + '역으로, 도보로 약 ' + (Math.floor(metDis / 75) + 1) + '분 거리에 있';

            if (metDis < 200) {
                metTxt += '어 늦은 밤에 귀가하기 좋음.';
            } else if (metDis < 500) {
                metTxt += '음.';
            } else {
                metTxt += '어 너무 늦은 밤에는 지하철로 귀가하기 부담스러울 수 있음';
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
                safe_txt.push('전반적으로 뉴욕의 숙소들 중에서도 치안으로는 최상위권에 속해 여행을 즐기기 좋음.');
            } else if (score > 9) {
                safe_txt.push('뉴욕 숙소들 중에서도 전반적으로 상당히 좋은 치안을 자랑함.');
            } else if (score > 8.5) {
                safe_txt.push('전반적으로 주변 치안이 안정되어 여행하기에 좋음.');
            } else if (score > 7.9) {
                safe_txt.push('밤 늦게 돌아다니지 않고 조심한다면 전반적으로 여행하기에 안전한 편.');
            } else if (score > 7.3) {
                safe_txt.push('전반적으로 뉴욕 평균 정도의 치안 수준을 보이며, 조심히 다닐 필요는 있음.');
            } else if (score > 6.9) {
                safe_txt.push('치안이 아주 나쁘지는 않지만 조심히 다니는 것이 좋음.');
            } else {
                safe_txt.push('치안이 좋은 편은 아니므로 안전한 숙소를 원한다면 좋은 선택은 아님.');
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

        console.log(scoreArray);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWNhNmE2MzNmNTlhOWI2ZTgzZDMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hdHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9tYW51YWxDb21iaW5lLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9zcG90L3ZlcmlmeWluZy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvaG90ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5L2FyZWEuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zdWJ3YXkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbInVuaW5mbGF0ZWQiLCJhdHRlbmQiLCJjaXR5IiwidV9pIiwibWFpbCIsIm5hbWUiLCJncmFkZSIsIiQiLCJjbGljayIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJpbml0IiwiZG9jdW1lbnQiLCJyZWFkeSIsInByb3ZpZGVyIiwiZmlyZWJhc2UiLCJhdXRoIiwiR29vZ2xlQXV0aFByb3ZpZGVyIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwidXNlciIsInVzZXJNYWlsIiwiZW1haWwiLCJzcGxpdCIsImRhdGFiYXNlIiwicmVmIiwib25jZSIsInVzZXJEYXRhIiwic25hcCIsInZhbCIsInVpZCIsImRpc3BsYXlOYW1lIiwibG9naW4iLCJhbGVydCIsInNpZ25JbldpdGhQb3B1cCIsInRoZW4iLCJyZXN1bHQiLCJjYXRjaCIsImVycm9yIiwiZXJyb3JDb2RlIiwiY29kZSIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjcmVkZW50aWFsIiwiaHRtbCIsImF0dHIiLCJjb25maXJtIiwic2lnbk91dCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiQXR0ZW5kIiwibW9iaWxlIiwiaWQiLCJ2aWV3SUQiLCJhdHRlbmRPYmoiLCJzYWxhcnkiLCJ3ZWVrZGF5cyIsInRoYXQiLCJ1c2VycyIsInR4dCIsIm1haWxJRCIsInByb3AiLCJvbiIsImluZmxhdGVfY2FsZW5kYXIiLCJsZW5ndGgiLCJmdWxsQ2FsZW5kYXIiLCJoZWlnaHQiLCJmaXJzdERheSIsInZpZXdSZW5kZXIiLCJ2aWV3IiwiZWxlbWVudCIsImRheUNsaWNrIiwiZGF0ZSIsImlucHV0V29ya0hvdXIiLCJsaXN0ZW5lciIsImluZmxhdGVfaW5wdXQiLCJzZXRXb3JrSG91ciIsImtleXVwIiwiZSIsIndoaWNoIiwiY2hhbmdlIiwidmlld193b3JrZXIiLCJvZmYiLCJ5byIsImRhdGEiLCJkYXRlSUQiLCJzbGljZSIsImRpZiIsImZyb20iLCJ0byIsImkiLCJNYXRoIiwiZmxvb3IiLCJkdXJNb24iLCJ0aGlzTW9udGgiLCJkYXRlRG9tIiwiZXEiLCJoYXNDbGFzcyIsImoiLCJ3ZWVrRG9tIiwid2Vla0R1ciIsImRheURvbSIsImZpbmQiLCJrIiwiY2hpbGRyZW4iLCJhcHBlbmQiLCJmdWxsTW9udGhCb251cyIsImluc3VyYW5jZUZlZSIsImJhc2ljIiwicm91bmQiLCJmdWxsV2Vla0J1bnVzIiwiY29tbWEiLCJkYXRlT2JqIiwiZGF0ZVNob3J0IiwibW9tZW50IiwiZm9ybWF0IiwiQW55UGlja2VyIiwiZGF0ZVRpbWVGb3JtYXQiLCJmb2N1cyIsIndvcmsiLCJhbGxFbXB0eSIsInJlbW92ZSIsImZyb21BIiwidG9BIiwicHVzaCIsInNldCIsIkNpdHkiLCJjb2RlRGF0YSIsImNpdHlEYXRhIiwiY2lkIiwicGFyZW50IiwibWV0cm9BZGp1c3QiLCJyZXR1cm5Ub0NpdHlWaWV3IiwiaW5mbGF0ZV9jaXR5Q29kZVZpZXciLCJtZXRybyIsIm5hbWVBcnJheSIsImxpbmUiLCJjb25zb2xlIiwibG9nIiwiaG90ZWxzIiwic3BvdHMiLCJzcG90Iiwic3RhdHVzIiwiY29tYmluaW5nIiwiYXJlYSIsInByaWNlIiwic2V0dGluZyIsImNpdGllcyIsIlNwb3QiLCJpbnB1dENvb3JkaW5hdGUiLCJkZWxldGVTcG90Iiwic2V0UmVtYWluTnVtYmVyIiwiY29tYmluZWQiLCJmaXJzdENoZWNrIiwiYXV0b0NvbWJpbmVfX3Nwb3RSZXN0cnVjdHVyZSIsInNpdGVBcnIiLCJjb3VudGVyIiwic2l0ZSIsIm5vRGF0YSIsImRlbGV0ZWQiLCJvbGRTcG90Iiwia28iLCJlbiIsImNvb3IiLCJyYW5rIiwidGVzdCIsInVybCIsInRhZyIsImF1dG9Db21iaW5lX19jb21iaW5lIiwiY29tYmluZU9iaiIsImNvbWJpbmUiLCJoYXNDb21iaW5lZCIsInRDb2RlIiwidFNwb3QiLCJrZXkiLCJjYWxjdWxhdGVEaWYiLCJzaWQiLCJubyIsInRvYXN0IiwiY29vclR4dCIsImxhdCIsInRyaW0iLCJsbmciLCJpc05hTiIsIm51bWJlciIsImN1dE5vIiwiY3V0T2JqIiwiaGFzUHJvYmxlbSIsInNlYXJjaFVybCIsInNpdGVPYmoiLCJnZyIsIm52IiwidGEiLCJscCIsInNpdGVIYXNQcm9ibGVtIiwibm9Db29yIiwibm9Db29yVHh0Iiwibm9TcG90Iiwibm9TcG90VHh0IiwiaGFzQ29vciIsImxhcmdlT0siLCJsYXJnZURhdGEiLCJNYW51YWxDb21iaW5lIiwibWFwIiwibWFya2VyIiwicHJpbWUiLCJ0YXJnZXQiLCJyZW1haW4iLCJ0b2dnbGVDbGFzcyIsIm5leHRTdGVwIiwibWFpbkRhdGEiLCJ0aWQiLCJ0YXJnZXREYXRhIiwiaW5jbHVkZXMiLCJ1cGRhdGUiLCJPYmplY3QiLCJrZXlzIiwiaW5mbGF0ZSIsInNldFRpbWVvdXQiLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiZ2V0RWxlbWVudEJ5SWQiLCJjZW50ZXIiLCJ6b29tIiwibWFwVHlwZUNvbnRyb2wiLCJzY2FsZUNvbnRyb2wiLCJmdWxsc2NyZWVuQ29udHJvbCIsImFkZExpc3RlbmVyIiwiY2hvb3NlQ29vcmRpbmF0ZSIsImxhdExuZyIsInNldE1hcCIsIk1hcmtlciIsInBvc2l0aW9uIiwicGFuVG8iLCJpZHgiLCJsYXRsbmciLCJ0TWFya2VyIiwibGFiZWwiLCJ0b1N0cmluZyIsIlZlcmlmeSIsImNoZWNrIiwibWVyZ2UiLCJyZW1vdmVBbGwiLCJkaXYiLCJjb25maWciLCJtYXhTY29yZSIsIm9uZU1pbnVzIiwidHdvTXVudXMiLCJudkFkZCIsInJhbmtBcnJheSIsIm51bVNpdGUiLCJzY29yZSIsImF2ZyIsImJlc3RSYW5rIiwic29ydCIsImEiLCJiIiwic3BvdEFycmF5IiwicmFua2luZyIsInJhbmtlZCIsIkhvdGVsIiwiY2l0eU5hbWUiLCJ0cmFuc3BvcnQiLCJzYWZldHkiLCJmYWNpbGl0eSIsImNvc3RFZmYiLCJtZXRyb0xpbmUiLCJzY29yZV90cmFuc3BvcnQiLCJzY29yZV9zYWZldHkiLCJvcmRlckFycmF5Iiwic2NvcmVXb3JkX2Nvbm5lY3QiLCJzY29yZVdvcmQiLCJtaXNkZW1lYW5vcldvcmQiLCJzY29yZUFycmF5IiwiaGlkIiwiaG90ZWwiLCJzaG9ydFR4dCIsInNhZmVfdHh0IiwiYXJlYU5hbWUiLCJhcmVhU2FmZXR5IiwibWlzZGVtZWFub3IiLCJzYWZldHlfbG9jYWwiLCJhdG0iLCJncm9jZXJ5IiwiYXRtMzB0aCIsImxvY2FsIiwibWF4Iiwid2Fsa2FibGUiLCJlbnRlcmFuY2UiLCJuZWFyZXN0TWV0cm8iLCJkaXN0YW5jZSIsIm1ldHJvSW5mbyIsIm1pbiIsImFyZWFTY29yZSIsImxvY2FsVHh0IiwibG9jYWxHb29kIiwibWV0IiwibWV0RGlzIiwibWV0VHh0IiwibWV0U2NvcmUiLCJhc3Nlc3NtZW50IiwiZXhwbGFpbiIsInN1bW1hcnkiLCJ0cmFuc3BvcnRfdHh0IiwiZ29vZExpbmUiLCJ2aXNpdGFibGUiLCJuZWFyZXN0IiwibGluZU5vIiwibWV0TGluZSIsImNlaWwiLCJzcG90Tm8iLCJtZXREaXN0YW5jZSIsImxlbiIsInNjb3JlX2ZhY2lsaXR5IiwiQXJlYSIsInNjb3JlQ2hhbmdlIiwiaW5kZXgiLCJhcmVhZGF0YSIsIm5vdEFyZWEiLCJTdWJ3YXkiLCJmaW5kU3Vid2F5IiwibWV0cm9CeVN0biIsIm1ldHJvTmFtZSIsImNvbmNhdCIsIm1ldEFycmF5IiwibWV0U3RuQXJyYXkiLCJBY2NvdW50IiwicHJlcGVuZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxhQUFhO0FBQ2JDLFlBQU8sSUFETTtBQUViQyxVQUFLO0FBRlEsQ0FBakI7O0FBS0EsSUFBSUMsTUFBTTtBQUNOQyxVQUFLLEVBREM7QUFFTkMsVUFBSyxFQUZDO0FBR05DLFdBQU07QUFIQSxDQUFWOztBQU1BQyxFQUFFLGFBQUYsRUFBaUJDLEtBQWpCLENBQXVCLFlBQVU7QUFDN0JELE1BQUUsV0FBRixFQUFlRSxXQUFmLENBQTJCLFlBQTNCO0FBQ0FGLE1BQUUsSUFBRixFQUFRRyxRQUFSLENBQWlCLFlBQWpCO0FBQ0FILE1BQUUsUUFBRixFQUFZRyxRQUFaLENBQXFCLGFBQXJCO0FBQ0FILE1BQUUsZUFBRixFQUFtQkUsV0FBbkIsQ0FBK0IsYUFBL0I7QUFDQSxRQUFHVCxXQUFXQyxNQUFkLEVBQXFCO0FBQ2pCLHlCQUFPVSxJQUFQLENBQVlSLElBQUlDLElBQWhCLEVBQXNCRCxJQUFJRSxJQUExQixFQUFnQ0YsSUFBSUcsS0FBcEM7QUFDQU4sbUJBQVdDLE1BQVgsR0FBb0IsS0FBcEI7QUFDSDtBQUNKLENBVEQ7QUFVQU0sRUFBRSxXQUFGLEVBQWVDLEtBQWYsQ0FBcUIsWUFBVTtBQUMzQkQsTUFBRSxXQUFGLEVBQWVFLFdBQWYsQ0FBMkIsWUFBM0I7QUFDQUYsTUFBRSxJQUFGLEVBQVFHLFFBQVIsQ0FBaUIsWUFBakI7QUFDQUgsTUFBRSxRQUFGLEVBQVlHLFFBQVosQ0FBcUIsYUFBckI7QUFDQUgsTUFBRSxhQUFGLEVBQWlCRSxXQUFqQixDQUE2QixhQUE3QjtBQUNBLFFBQUdULFdBQVdFLElBQWQsRUFBbUI7QUFDZix1QkFBS1MsSUFBTCxDQUFVUixJQUFJQyxJQUFkLEVBQW9CRCxJQUFJRSxJQUF4QixFQUE4QkYsSUFBSUcsS0FBbEM7QUFDQU4sbUJBQVdFLElBQVgsR0FBa0IsS0FBbEI7QUFDSDtBQUNKLENBVEQ7QUFVQUssRUFBRSxhQUFGLEVBQWlCQyxLQUFqQixDQUF1QixZQUFVO0FBQzdCRCxNQUFFLFdBQUYsRUFBZUUsV0FBZixDQUEyQixZQUEzQjtBQUNBRixNQUFFLElBQUYsRUFBUUcsUUFBUixDQUFpQixZQUFqQjtBQUNBSCxNQUFFLFFBQUYsRUFBWUcsUUFBWixDQUFxQixhQUFyQjtBQUNBSCxNQUFFLGVBQUYsRUFBbUJFLFdBQW5CLENBQStCLGFBQS9CO0FBQ0EscUJBQU9FLElBQVA7QUFDSCxDQU5EOztBQVVBSixFQUFFSyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVTs7QUFFeEIsUUFBSUMsV0FBVyxJQUFJQyxTQUFTQyxJQUFULENBQWNDLGtCQUFsQixFQUFmO0FBQ0FGLGFBQVNDLElBQVQsR0FBZ0JFLGtCQUFoQixDQUFtQyxVQUFTQyxJQUFULEVBQWU7QUFDaEQsWUFBSUEsSUFBSixFQUFVO0FBQ04sZ0JBQUlDLFdBQVdELEtBQUtFLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixHQUFqQixFQUFzQixDQUF0QixDQUFmO0FBQ0FQLHFCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixPQUF4QixFQUFpQ0MsSUFBakMsQ0FBc0MsT0FBdEMsRUFBK0MsZ0JBQVE7QUFDbkQsb0JBQUlDLFdBQVdDLEtBQUtDLEdBQUwsRUFBZjtBQUNBLG9CQUFHRixTQUFTTixRQUFULENBQUgsRUFBc0I7QUFDbEIsd0JBQUdNLFNBQVNOLFFBQVQsRUFBbUJTLEdBQW5CLEdBQXlCVixLQUFLVSxHQUFqQyxFQUFxQztBQUNqQzFCLDRCQUFJQyxJQUFKLEdBQVdnQixRQUFYO0FBQ0FqQiw0QkFBSUUsSUFBSixHQUFXYyxLQUFLVyxXQUFoQjtBQUNBM0IsNEJBQUlHLEtBQUosR0FBWW9CLFNBQVNOLFFBQVQsRUFBbUJkLEtBQW5CLEdBQXlCLENBQXJDO0FBQ0EseUNBQU9LLElBQVAsQ0FBWVIsSUFBSUMsSUFBaEIsRUFBc0JELElBQUlFLElBQTFCLEVBQWdDRixJQUFJRyxLQUFwQztBQUNBO0FBQ0EsNEJBQUdILElBQUlHLEtBQUosS0FBYyxDQUFqQixFQUFtQjtBQUNmOztBQUVIO0FBQ0ROLG1DQUFXQyxNQUFYLEdBQW9CLEtBQXBCO0FBQ0E4Qiw4QkFBTTVCLElBQUlFLElBQVY7QUFDSCxxQkFaRCxNQVlLO0FBQ0QyQiw4QkFBTSwrQkFBTjtBQUNIO0FBQ0osaUJBaEJELE1BZ0JLO0FBQ0RBLDBCQUFNLCtCQUFOO0FBQ0g7QUFDSixhQXJCRDtBQXNCRjtBQUVELFNBMUJELE1BMEJPO0FBQ0w7QUFDQWpCLHFCQUFTQyxJQUFULEdBQWdCaUIsZUFBaEIsQ0FBZ0NuQixRQUFoQyxFQUEwQ29CLElBQTFDLENBQStDLFVBQVNDLE1BQVQsRUFBaUI7QUFDNURoQix1QkFBT2dCLE9BQU9oQixJQUFkO0FBQ0Esb0JBQUlDLFdBQVdELEtBQUtFLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixHQUFqQixFQUFzQixDQUF0QixDQUFmO0FBQ0FQLHlCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixPQUF4QixFQUFpQ0MsSUFBakMsQ0FBc0MsT0FBdEMsRUFBK0MsZ0JBQVE7QUFDbkQsd0JBQUlDLFdBQVdDLEtBQUtDLEdBQUwsRUFBZjtBQUNBLHdCQUFHRixTQUFTTixRQUFULENBQUgsRUFBc0I7QUFDbEIsNEJBQUdNLFNBQVNOLFFBQVQsRUFBbUJTLEdBQW5CLEdBQXlCVixLQUFLVSxHQUFqQyxFQUFxQztBQUNqQzFCLGdDQUFJQyxJQUFKLEdBQVdnQixRQUFYO0FBQ0FqQixnQ0FBSUUsSUFBSixHQUFXYyxLQUFLVyxXQUFoQjtBQUNBM0IsZ0NBQUlHLEtBQUosR0FBWW9CLFNBQVNOLFFBQVQsRUFBbUJkLEtBQW5CLEdBQXlCLENBQXJDO0FBQ0EsNkNBQU9LLElBQVAsQ0FBWVIsSUFBSUMsSUFBaEIsRUFBc0JELElBQUlFLElBQTFCLEVBQWdDRixJQUFJRyxLQUFwQztBQUNBTix1Q0FBV0MsTUFBWCxHQUFvQixLQUFwQjtBQUNBOEIsa0NBQU01QixJQUFJRSxJQUFWO0FBQ0gseUJBUEQsTUFPSztBQUNEMkIsa0NBQU0sK0JBQU47QUFDSDtBQUNKLHFCQVhELE1BV0s7QUFDREEsOEJBQU0sK0JBQU47QUFDSDtBQUNKLGlCQWhCRDtBQWlCRjtBQUNELGFBckJELEVBcUJHSSxLQXJCSCxDQXFCUyxVQUFTQyxLQUFULEVBQWdCO0FBQ3ZCO0FBQ0Esb0JBQUlDLFlBQVlELE1BQU1FLElBQXRCO0FBQ0Esb0JBQUlDLGVBQWVILE1BQU1JLE9BQXpCO0FBQ0E7QUFDQSxvQkFBSXBCLFFBQVFnQixNQUFNaEIsS0FBbEI7QUFDQTtBQUNBLG9CQUFJcUIsYUFBYUwsTUFBTUssVUFBdkI7QUFDQTtBQUNELGFBOUJEO0FBK0JEO0FBQ0YsS0E3REQ7QUErREgsQ0FsRUQ7O0FBb0VBLFNBQVNYLEtBQVQsQ0FBZTFCLElBQWYsRUFBb0I7QUFDaEJFLE1BQUUsYUFBRixFQUFpQm9DLElBQWpCLENBQXNCdEMsS0FBSyxDQUFMLElBQVEsSUFBOUI7QUFDQUUsTUFBRSxhQUFGLEVBQWlCcUMsSUFBakIsQ0FBc0IsT0FBdEIsRUFBOEJ2QyxPQUFLLFVBQW5DO0FBQ0FFLE1BQUUsYUFBRixFQUFpQkMsS0FBakIsQ0FBdUIsWUFBVTtBQUM3QixZQUFHcUMsUUFBUXhDLE9BQUssZ0JBQWIsQ0FBSCxFQUFrQztBQUM5QlUscUJBQVNDLElBQVQsR0FBZ0I4QixPQUFoQixHQUEwQlosSUFBMUIsQ0FBK0IsWUFBVztBQUN4Q2EsdUJBQU9DLFFBQVAsQ0FBZ0JDLE1BQWhCO0FBQ0QsYUFGRCxFQUVHYixLQUZILENBRVMsVUFBU0MsS0FBVCxFQUFnQjtBQUN2QjtBQUNELGFBSkQ7QUFLSDtBQUNKLEtBUkQ7QUFTSCxDOzs7Ozs7Ozs7Ozs7QUM5SEQsSUFBSWEsU0FBUztBQUNUQyxZQUFRLEtBREM7O0FBR1RDLFFBQUksRUFISzs7QUFLVEMsWUFBUSxFQUxDO0FBTVQ7O0FBRUFDLGVBQVcsRUFSRjs7QUFVVEMsWUFBUSxFQVZDOztBQWFUQyxjQUFVLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLEVBQW9DLEdBQXBDLENBYkQ7O0FBZVQ3QyxVQUFNLGNBQVN5QyxFQUFULEVBQWEvQyxJQUFiLEVBQW1CQyxLQUFuQixFQUF5QjtBQUFBOztBQUMzQixZQUFJbUQsT0FBTyxJQUFYOztBQUVBLGFBQUtMLEVBQUwsR0FBVUEsRUFBVjs7QUFFQXJDLGlCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixnQkFBeEIsRUFBMENDLElBQTFDLENBQStDLE9BQS9DLEVBQXdELGdCQUFPO0FBQzNEZ0MsaUJBQUtGLE1BQUwsR0FBYzVCLEtBQUtDLEdBQUwsRUFBZDs7QUFFQSxnQkFBR3RCLFVBQVUsQ0FBYixFQUFlO0FBQ1hDLGtCQUFFLGtCQUFGLEVBQXNCRSxXQUF0QixDQUFrQyxhQUFsQztBQUNBTSx5QkFBU1EsUUFBVCxHQUFvQkMsR0FBcEIsQ0FBd0IsT0FBeEIsRUFBaUNDLElBQWpDLENBQXNDLE9BQXRDLEVBQStDLGdCQUFPO0FBQ2xEbEIsc0JBQUUsY0FBRixFQUFrQkcsUUFBbEIsQ0FBMkIsYUFBM0I7QUFDQSx3QkFBSWdELFFBQVEvQixLQUFLQyxHQUFMLEVBQVo7QUFDQSx3QkFBSStCLE1BQU0sRUFBVjtBQUNBLHlCQUFLLElBQUlDLE1BQVQsSUFBbUJGLEtBQW5CLEVBQTBCO0FBQ3RCQywrQkFBTyxvQkFBa0JDLE1BQWxCLEdBQXlCLElBQXpCLEdBQThCRixNQUFNRSxNQUFOLEVBQWN2RCxJQUE1QyxHQUFpRCxXQUF4RDtBQUNIO0FBQ0RFLHNCQUFFLGtCQUFGLEVBQXNCb0MsSUFBdEIsQ0FBMkJnQixHQUEzQixFQUFnQy9CLEdBQWhDLENBQW9Dd0IsRUFBcEMsRUFBd0NTLElBQXhDLENBQTZDLFVBQTdDLEVBQXlELElBQXpEO0FBQ0gsaUJBUkQ7QUFTSCxhQVhELE1BV0s7QUFDRDlDLHlCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixZQUFVLE1BQUs0QixFQUF2QyxFQUEyQ1UsRUFBM0MsQ0FBOEMsT0FBOUMsRUFBdUQsZ0JBQVE7QUFDM0R2RCxzQkFBRSxjQUFGLEVBQWtCRyxRQUFsQixDQUEyQixhQUEzQjtBQUNBLDBCQUFLNEMsU0FBTCxHQUFpQjNCLEtBQUtDLEdBQUwsRUFBakI7QUFDQTZCLHlCQUFLTSxnQkFBTCxDQUFzQk4sS0FBS0gsU0FBM0I7O0FBRUEsd0JBQUcsQ0FBQy9DLEVBQUUsb0JBQUYsRUFBd0J5RCxNQUE1QixFQUFtQztBQUMvQnpELDBCQUFFLFdBQUYsRUFBZTBELFlBQWYsQ0FBNEI7QUFDeEJDLG9DQUFRLEdBRGdCO0FBRXhCQyxzQ0FBVSxDQUZjO0FBR3hCQyx3Q0FBYSxvQkFBVUMsSUFBVixFQUFnQkMsT0FBaEIsRUFBeUI7QUFDbENiLHFDQUFLTSxnQkFBTCxDQUFzQk4sS0FBS0gsU0FBM0I7QUFDSCw2QkFMdUI7QUFNeEJpQixzQ0FBVSxrQkFBU0MsSUFBVCxFQUFjO0FBQ3BCZixxQ0FBS2dCLGFBQUwsQ0FBbUJELElBQW5CO0FBQ0g7QUFSdUIseUJBQTVCO0FBVUg7QUFDSixpQkFqQkQ7QUFrQkg7QUFDSixTQWxDRDs7QUFvQ0EsYUFBS0UsUUFBTDtBQUNILEtBekRROztBQTJEVEEsY0FBVSxvQkFBVTtBQUNoQixZQUFJakIsT0FBTyxJQUFYOztBQUVBbEQsVUFBRSxtQkFBRixFQUF1QkMsS0FBdkIsQ0FBNkIsWUFBVTtBQUNuQ2lELGlCQUFLa0IsYUFBTDtBQUNILFNBRkQ7QUFHQXBFLFVBQUUsa0JBQUYsRUFBc0JDLEtBQXRCLENBQTRCLFlBQVU7QUFDbENpRCxpQkFBS00sZ0JBQUwsQ0FBc0JOLEtBQUtILFNBQTNCO0FBQ0gsU0FGRDs7QUFJQS9DLFVBQUUsTUFBRixFQUFVdUQsRUFBVixDQUFhLE9BQWIsRUFBc0IsVUFBdEIsRUFBa0MsWUFBVTtBQUN4Q0wsaUJBQUttQixXQUFMLENBQWlCckUsRUFBRSxJQUFGLEVBQVFxQyxJQUFSLENBQWEsS0FBYixDQUFqQjtBQUNBckMsY0FBRSxvQkFBRixFQUF3QnFCLEdBQXhCLENBQTRCLEVBQTVCO0FBQ0gsU0FIRDtBQUlBckIsVUFBRSxNQUFGLEVBQVV1RCxFQUFWLENBQWEsT0FBYixFQUFzQixRQUF0QixFQUFnQyxZQUFVO0FBQ3RDdkQsY0FBRSxjQUFGLEVBQWtCRyxRQUFsQixDQUEyQixhQUEzQjtBQUNBSCxjQUFFLG9CQUFGLEVBQXdCcUIsR0FBeEIsQ0FBNEIsRUFBNUI7QUFDSCxTQUhEO0FBSUFyQixVQUFFLE1BQUYsRUFBVXNFLEtBQVYsQ0FBZ0IsVUFBU0MsQ0FBVCxFQUFXO0FBQ3ZCLGdCQUFHdkUsRUFBRSxpQkFBRixFQUFxQnlELE1BQXhCLEVBQStCO0FBQzNCLG9CQUFJekIsT0FBT3VDLEVBQUVDLEtBQWIsQ0FEMkIsQ0FDUDtBQUNwQixvQkFBR3hDLFFBQU0sRUFBVCxFQUFZO0FBQ1Isd0JBQUdoQyxFQUFFLGFBQUYsRUFBaUJxQixHQUFqQixHQUF1Qm9DLE1BQXZCLEdBQThCLENBQWpDLEVBQW1DO0FBQy9CUCw2QkFBS21CLFdBQUwsQ0FBaUJyRSxFQUFFLGlCQUFGLEVBQXFCcUMsSUFBckIsQ0FBMEIsS0FBMUIsQ0FBakI7QUFDSDtBQUNKO0FBQ0o7QUFDSixTQVREOztBQVdBckMsVUFBRSxrQkFBRixFQUFzQnlFLE1BQXRCLENBQTZCLFlBQVU7QUFDbkMsZ0JBQUk1QixLQUFLN0MsRUFBRSxJQUFGLEVBQVFxQixHQUFSLEVBQVQ7O0FBRUE2QixpQkFBS3dCLFdBQUwsQ0FBaUI3QixFQUFqQjtBQUNILFNBSkQ7QUFLSCxLQTdGUTs7QUErRlQ2QixpQkFBYSxxQkFBUzdCLEVBQVQsRUFBWTtBQUNyQixZQUFJSyxPQUFPLElBQVg7O0FBRUEsWUFBR0wsT0FBT0ssS0FBS0wsRUFBZixFQUFrQjtBQUNkN0MsY0FBRSxtQkFBRixFQUF1QkcsUUFBdkIsQ0FBZ0MsYUFBaEM7QUFDQUgsY0FBRSxlQUFGLEVBQW1Cb0MsSUFBbkIsQ0FBd0IsRUFBeEI7QUFDQXBDLGNBQUUsZ0JBQUYsRUFBb0JvQyxJQUFwQixDQUF5QixFQUF6QjtBQUNILFNBSkQsTUFJSztBQUNEcEMsY0FBRSxtQkFBRixFQUF1QkUsV0FBdkIsQ0FBbUMsYUFBbkM7QUFDQSxnQkFBR2dELEtBQUtKLE1BQUwsQ0FBWVcsTUFBWixHQUFtQixDQUF0QixFQUF3QjtBQUNwQmpELHlCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixZQUFVaUMsS0FBS0osTUFBdkMsRUFBK0M2QixHQUEvQztBQUNIOztBQUVEbkUscUJBQVNRLFFBQVQsR0FBb0JDLEdBQXBCLENBQXdCLFlBQVU0QixFQUFsQyxFQUFzQ1UsRUFBdEMsQ0FBeUMsT0FBekMsRUFBa0QsZ0JBQVE7QUFDdERMLHFCQUFLSCxTQUFMLEdBQWlCM0IsS0FBS0MsR0FBTCxFQUFqQjtBQUNBLG9CQUFJdUQsS0FBSzFCLEtBQUtKLE1BQWQ7QUFDQUkscUJBQUtKLE1BQUwsR0FBY0QsRUFBZDs7QUFFQSxvQkFBRytCLEdBQUduQixNQUFILEtBQWMsQ0FBakIsRUFBbUI7QUFDZnpELHNCQUFFLFdBQUYsRUFBZTBELFlBQWYsQ0FBNEI7QUFDeEJDLGdDQUFRLEdBRGdCO0FBRXhCQyxrQ0FBVSxDQUZjO0FBR3hCQyxvQ0FBYSxvQkFBVUMsSUFBVixFQUFnQkMsT0FBaEIsRUFBeUI7QUFDbEMsZ0NBQUdiLEtBQUtMLEVBQUwsS0FBWUssS0FBS0osTUFBcEIsRUFBMkI7QUFDdkJJLHFDQUFLTSxnQkFBTCxDQUFzQk4sS0FBS0gsU0FBM0I7QUFDSDtBQUNKLHlCQVB1QjtBQVF4QmlCLGtDQUFVLGtCQUFTQyxJQUFULEVBQWM7QUFDcEJmLGlDQUFLZ0IsYUFBTCxDQUFtQkQsSUFBbkI7QUFDSDtBQVZ1QixxQkFBNUI7QUFZSCxpQkFiRCxNQWFLO0FBQ0RmLHlCQUFLTSxnQkFBTCxDQUFzQk4sS0FBS0gsU0FBM0I7QUFDSDtBQUdKLGFBdkJEO0FBd0JIO0FBR0osS0F2SVE7O0FBeUlUUyxzQkFBa0IsMEJBQVNxQixJQUFULEVBQWM7QUFDNUI3RSxVQUFFLFNBQUYsRUFBYUUsV0FBYixDQUF5QixhQUF6QjtBQUNBRixVQUFFLFNBQUYsRUFBYW9DLElBQWIsQ0FBa0IsRUFBbEI7O0FBRUEsWUFBR3lDLEtBQUtuRixNQUFSLEVBQWU7QUFDWG1GLG1CQUFPQSxLQUFLbkYsTUFBWjtBQUNBLGlCQUFLLElBQUl1RSxJQUFULElBQWlCWSxJQUFqQixFQUF1QjtBQUNuQixvQkFBSUMsU0FBU2IsS0FBS2MsS0FBTCxDQUFXLENBQVgsRUFBYSxDQUFiLElBQWdCLEdBQWhCLEdBQW9CZCxLQUFLYyxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQWIsQ0FBcEIsR0FBb0MsR0FBcEMsR0FBd0NkLEtBQUtjLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBYixDQUFyRDtBQUNBLG9CQUFJQyxNQUFNLENBQVY7QUFDQSxvQkFBSTVCLE9BQU0sUUFBTXlCLEtBQUtaLElBQUwsRUFBVyxDQUFYLEVBQWNnQixJQUFwQixHQUF5QixHQUF6QixHQUE2QkosS0FBS1osSUFBTCxFQUFXLENBQVgsRUFBY2lCLEVBQTNDLEdBQThDLE1BQXhEO0FBQ0E7O0FBRUEscUJBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJTixLQUFLWixJQUFMLEVBQVdSLE1BQS9CLEVBQXVDMEIsR0FBdkMsRUFBNEM7QUFDeENILDJCQUFPSCxLQUFLWixJQUFMLEVBQVdrQixDQUFYLEVBQWNILEdBQXJCO0FBQ0g7O0FBRUQ1Qix3QkFBSyxRQUFRZ0MsS0FBS0MsS0FBTCxDQUFXTCxNQUFJLEVBQWYsQ0FBUixHQUE2QixLQUE3QixHQUFvQ0EsTUFBSSxFQUF4QyxHQUE0QyxHQUE1QyxHQUFnRCxNQUFyRDtBQUNBaEYsa0JBQUUsd0JBQXNCOEUsTUFBdEIsR0FBNkIsSUFBL0IsRUFBcUMxQyxJQUFyQyxDQUEwQ2dCLElBQTFDO0FBQ0g7QUFDRCxnQkFBSWtDLFNBQVMsQ0FBYjtBQUNBLGdCQUFJQyxZQUFZLEVBQWhCO0FBQ0EsaUJBQUssSUFBSUosSUFBSSxDQUFiLEVBQWdCQSxJQUFJbkYsRUFBRSxpQkFBRixFQUFxQnlELE1BQXpDLEVBQWlEMEIsR0FBakQsRUFBc0Q7QUFDbEQsb0JBQUlLLFVBQVV4RixFQUFFLGlCQUFGLEVBQXFCeUYsRUFBckIsQ0FBd0JOLENBQXhCLENBQWQ7QUFDQSxvQkFBRyxDQUFDSyxRQUFRRSxRQUFSLENBQWlCLGdCQUFqQixDQUFKLEVBQXVDO0FBQ25DLHdCQUFJekIsUUFBT3VCLFFBQVFuRCxJQUFSLENBQWEsV0FBYixFQUEwQnRCLEtBQTFCLENBQWdDLEdBQWhDLENBQVg7QUFDQXdFLGdDQUFZdEIsTUFBSyxDQUFMLElBQVFBLE1BQUssQ0FBTCxDQUFwQjtBQUNBQSw0QkFBT0EsTUFBSyxDQUFMLElBQVFBLE1BQUssQ0FBTCxDQUFSLEdBQWdCQSxNQUFLLENBQUwsQ0FBdkI7O0FBRUEsd0JBQUdZLEtBQUtaLEtBQUwsQ0FBSCxFQUFjO0FBQ1YsNkJBQUssSUFBSTBCLElBQUksQ0FBYixFQUFnQkEsSUFBSWQsS0FBS1osS0FBTCxFQUFXUixNQUEvQixFQUF1Q2tDLEdBQXZDLEVBQTRDO0FBQ3hDTCxzQ0FBVVQsS0FBS1osS0FBTCxFQUFXMEIsQ0FBWCxFQUFjWCxHQUF4QjtBQUNIO0FBQ0o7QUFDSjtBQUNKOztBQUVELGdCQUFJNUIsTUFBTSxFQUFWOztBQUVBLGdCQUFHcEQsRUFBRSxvQkFBRixFQUF3QnlELE1BQTNCLEVBQWtDO0FBQzlCLHFCQUFLLElBQUkwQixJQUFJLENBQWIsRUFBZ0JBLElBQUksQ0FBcEIsRUFBdUJBLEdBQXZCLEVBQTRCO0FBQUk7QUFDNUIsd0JBQUlTLFVBQVU1RixFQUFFLFVBQUYsRUFBY3lGLEVBQWQsQ0FBaUJOLENBQWpCLENBQWQ7QUFDQSx3QkFBSVUsVUFBVSxDQUFkOztBQUVBLHlCQUFLLElBQUlGLElBQUksQ0FBYixFQUFnQkEsSUFBSSxDQUFwQixFQUF1QkEsR0FBdkIsRUFBNEI7QUFDeEIsNEJBQUlHLFNBQVNGLFFBQVFHLElBQVIsQ0FBYSxTQUFiLEVBQXdCTixFQUF4QixDQUEyQkUsQ0FBM0IsQ0FBYjtBQUNBLDRCQUFJMUIsU0FBTzZCLE9BQU96RCxJQUFQLENBQVksV0FBWixFQUF5QnRCLEtBQXpCLENBQStCLEdBQS9CLENBQVg7QUFDQWtELGlDQUFPQSxPQUFLLENBQUwsSUFBUUEsT0FBSyxDQUFMLENBQVIsR0FBZ0JBLE9BQUssQ0FBTCxDQUF2QjtBQUNBLDRCQUFHWSxLQUFLWixNQUFMLENBQUgsRUFBYztBQUNWLGlDQUFLLElBQUkrQixJQUFJLENBQWIsRUFBZ0JBLElBQUluQixLQUFLWixNQUFMLEVBQVdSLE1BQS9CLEVBQXVDdUMsR0FBdkMsRUFBNEM7QUFDeENILDJDQUFXaEIsS0FBS1osTUFBTCxFQUFXK0IsQ0FBWCxFQUFjaEIsR0FBekI7QUFDSDtBQUNKO0FBQ0o7QUFDRCx3QkFBR2EsVUFBUSxDQUFYLEVBQWE7QUFDVHpDLCtCQUFLLG1DQUFrQ2dDLEtBQUtDLEtBQUwsQ0FBV1EsVUFBUSxFQUFuQixDQUFsQyxHQUF5RCxLQUF6RCxHQUErREEsVUFBUSxFQUF2RSxHQUEwRSxHQUExRSxHQUErRSxNQUFwRjtBQUNILHFCQUZELE1BRUs7QUFDRHpDLCtCQUFLLG9DQUFMO0FBQ0g7QUFDSjs7QUFFRHBELGtCQUFFLGVBQUYsRUFBbUJvQyxJQUFuQixDQUF3QmdCLEdBQXhCO0FBQ0g7O0FBRUQsZ0JBQUdwRCxFQUFFLFVBQUYsRUFBY2lHLFFBQWQsQ0FBdUIsYUFBdkIsRUFBc0N4QyxNQUF6QyxFQUFnRDtBQUM1Q3pELGtCQUFFLGFBQUYsRUFBaUJvQyxJQUFqQixDQUFzQixPQUFLZ0QsS0FBS0MsS0FBTCxDQUFXQyxTQUFPLEVBQWxCLENBQUwsR0FBMkIsS0FBM0IsR0FBaUNBLFNBQU8sRUFBeEMsR0FBMkMsSUFBakU7QUFDSCxhQUZELE1BRUs7QUFDRHRGLGtCQUFFLFVBQUYsRUFBY2tHLE1BQWQsQ0FBcUIsNEJBQTBCZCxLQUFLQyxLQUFMLENBQVdDLFNBQU8sRUFBbEIsQ0FBMUIsR0FBZ0QsS0FBaEQsR0FBc0RBLFNBQU8sRUFBN0QsR0FBZ0UsU0FBckY7QUFDSDs7QUFFRGxDLGtCQUFNLEVBQU4sQ0FqRVcsQ0FpRUM7O0FBRVosZ0JBQUkrQyxpQkFBaUIsS0FBckI7QUFDQSxnQkFBSUMsZUFBZSxDQUFuQjtBQUNBLGdCQUFJQyxRQUFRakIsS0FBS2tCLEtBQUwsQ0FBV2hCLFNBQU8sRUFBUCxHQUFVLElBQXJCLENBQVo7QUFDQSxnQkFBSWlCLGdCQUFnQm5CLEtBQUtrQixLQUFMLENBQVloQixTQUFPLEVBQVAsR0FBVSxJQUFYLEdBQWlCLEdBQTVCLENBQXBCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFsQyxtQkFBSyxtQ0FBTDtBQUNBQSxtQkFBUSw0Q0FBUjtBQUNBQSxtQkFBUSxxQ0FBb0NvRCxNQUFNSCxLQUFOLENBQXBDLEdBQWtELE9BQTFEO0FBQ0FqRCxtQkFBUSxxREFBUjtBQUNBQSxtQkFBSyxRQUFMOztBQUVBQSxtQkFBSyxtQ0FBTDtBQUNBQSxtQkFBUSw2Q0FBUjtBQUNBQSxtQkFBUSxxQ0FBb0NvRCxNQUFNRCxhQUFOLENBQXBDLEdBQTBELE9BQWxFO0FBQ0FuRCxtQkFBUSxnREFBUjtBQUNBQSxtQkFBSyxRQUFMOztBQUVBQSxtQkFBSyxtQ0FBTDtBQUNBQSxtQkFBUSw2Q0FBUjtBQUNBQSxtQkFBUSxxQ0FBb0NvRCxNQUFNTCxjQUFOLENBQXBDLEdBQTJELE9BQW5FO0FBQ0EvQyxtQkFBUSxrREFBUjtBQUNBQSxtQkFBSyxRQUFMOztBQUVBQSxtQkFBSyw0REFBTDtBQUNBQSxtQkFBUSw4Q0FBUjtBQUNBQSxtQkFBUSxxQ0FBb0NvRCxNQUFNSixZQUFOLENBQXBDLEdBQXlELE9BQWpFO0FBQ0FoRCxtQkFBUSwwREFBUjtBQUNBQSxtQkFBSyxRQUFMOztBQUVBQSxtQkFBSyw0REFBTDtBQUNBQSxtQkFBUSwyQ0FBUjtBQUNBQSxtQkFBUSxxQ0FBb0NvRCxNQUFNSCxRQUFRRSxhQUFSLEdBQXdCSixjQUF4QixHQUF5Q0MsWUFBL0MsQ0FBcEMsR0FBa0csT0FBMUc7QUFDQWhELG1CQUFRLGlFQUFSO0FBQ0FBLG1CQUFLLFFBQUw7O0FBRUFwRCxjQUFFLGdCQUFGLEVBQW9Cb0MsSUFBcEIsQ0FBeUJnQixHQUF6QjtBQUNIO0FBQ0osS0FwUVE7O0FBc1FUYyxtQkFBZSx1QkFBU3VDLE9BQVQsRUFBaUI7QUFDNUI7QUFDQSxZQUFJQyxZQUFZQyxPQUFPRixPQUFQLEVBQWdCRyxNQUFoQixDQUF1QixPQUF2QixDQUFoQjtBQUNBLFlBQUk5QixTQUFTNkIsT0FBT0YsT0FBUCxFQUFnQkcsTUFBaEIsQ0FBdUIsVUFBdkIsQ0FBYjs7QUFFQSxZQUFJL0IsT0FBTyxFQUFYO0FBQ0EsWUFBRyxLQUFLOUIsU0FBTCxDQUFlckQsTUFBZixDQUFzQm9GLE1BQXRCLENBQUgsRUFBaUM7QUFDN0JELG1CQUFPLEtBQUs5QixTQUFMLENBQWVyRCxNQUFmLENBQXNCb0YsTUFBdEIsQ0FBUDtBQUNIOztBQUVELFlBQUkxQixNQUFNLEVBQVY7O0FBRUFBLGVBQUssMkJBQUw7QUFDQUEsZUFBUSwyQkFBUjtBQUNBQSxlQUFZLHNCQUFvQnNELFNBQXBCLEdBQThCLFdBQTFDO0FBQ0F0RCxlQUFZLDZCQUFaO0FBQ0EsWUFBR3lCLEtBQUssQ0FBTCxDQUFILEVBQVc7QUFDUHpCLG1CQUFZLG1DQUFpQ3lCLEtBQUssQ0FBTCxFQUFRSSxJQUF6QyxHQUE4QyxzREFBOUMsR0FBcUdKLEtBQUssQ0FBTCxFQUFRSyxFQUE3RyxHQUFnSCwwQkFBNUg7QUFDSCxTQUZELE1BRUs7QUFDRDlCLG1CQUFZLDBGQUFaO0FBQ0g7QUFDREEsZUFBWSxRQUFaO0FBQ0FBLGVBQVksNkJBQVo7QUFDQSxZQUFHeUIsS0FBSyxDQUFMLENBQUgsRUFBVztBQUNQekIsbUJBQVksb0NBQWtDeUIsS0FBSyxDQUFMLEVBQVFJLElBQTFDLEdBQStDLHVEQUEvQyxHQUF1R0osS0FBSyxDQUFMLEVBQVFLLEVBQS9HLEdBQWtILDBCQUE5SDtBQUNILFNBRkQsTUFFSztBQUNEOUIsbUJBQVksNEZBQVo7QUFDSDtBQUNEQSxlQUFZLFFBQVo7QUFDQUEsZUFBWSxzQkFBWjtBQUNBQSxlQUFnQiw2QkFBMkIwQixNQUEzQixHQUFrQyxVQUFsRDtBQUNBMUIsZUFBZ0IseUJBQWhCO0FBQ0FBLGVBQVksUUFBWjtBQUNBQSxlQUFRLFFBQVI7QUFDQUEsZUFBSyxRQUFMOztBQUVBcEQsVUFBRSxRQUFGLEVBQVlvQyxJQUFaLENBQWlCZ0IsR0FBakI7O0FBRUEsWUFBRyxLQUFLUixNQUFSLEVBQWU7QUFDWDVDLGNBQUUsb0JBQUYsRUFBd0I2RyxTQUF4QixDQUFrQztBQUM5QkMsZ0NBQWU7QUFEZSxhQUFsQztBQUdIOztBQUVEOUcsVUFBRSxhQUFGLEVBQWlCK0csS0FBakI7O0FBRUEsWUFBSTdELE9BQU8sSUFBWDtBQUNILEtBclRROztBQXVUVG1CLGlCQUFhLHFCQUFTSixJQUFULEVBQWM7O0FBRXZCLFlBQUkrQyxPQUFPLEVBQVg7O0FBRUEsWUFBSUMsV0FBVyxJQUFmO0FBQ0EsYUFBSyxJQUFJOUIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJbkYsRUFBRSxvQkFBRixFQUF3QnlELE1BQTVDLEVBQW9EMEIsR0FBcEQsRUFBeUQ7QUFDckQsZ0JBQUduRixFQUFFLG9CQUFGLEVBQXdCeUYsRUFBeEIsQ0FBMkJOLENBQTNCLEVBQThCOUQsR0FBOUIsR0FBb0NvQyxNQUFwQyxHQUEyQyxDQUE5QyxFQUFnRDtBQUM1Q3dELDJCQUFXLEtBQVg7QUFDSDtBQUNKOztBQUVELFlBQUdBLFFBQUgsRUFBWTtBQUNSLGdCQUFHLEtBQUtuRSxNQUFMLENBQVlXLE1BQVosR0FBbUIsQ0FBdEIsRUFBd0I7QUFDcEJqRCx5QkFBU1EsUUFBVCxHQUFvQkMsR0FBcEIsQ0FBd0IsWUFBVSxLQUFLNkIsTUFBZixHQUFzQixVQUF0QixHQUFpQ21CLElBQXpELEVBQStEaUQsTUFBL0Q7QUFDSCxhQUZELE1BRUs7QUFDRDFHLHlCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixZQUFVLEtBQUs0QixFQUFmLEdBQWtCLFVBQWxCLEdBQTZCb0IsSUFBckQsRUFBMkRpRCxNQUEzRDtBQUNIOztBQUVEbEgsY0FBRSxRQUFGLEVBQVlvQyxJQUFaLENBQWlCLEVBQWpCO0FBQ0EsZ0JBQUkwQyxTQUFTYixLQUFLYyxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQWIsSUFBa0IsR0FBbEIsR0FBc0JkLEtBQUtjLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBYixDQUF0QixHQUF3QyxHQUF4QyxHQUE0Q2QsS0FBS2MsS0FBTCxDQUFXLENBQVgsRUFBYSxDQUFiLENBQXpEO0FBQ0EvRSxjQUFFLHdCQUFzQjhFLE1BQXRCLEdBQTZCLElBQS9CLEVBQXFDMUMsSUFBckMsQ0FBMEMsRUFBMUM7QUFDQSxtQkFBTyxLQUFQO0FBQ0g7O0FBR0QsWUFBR3BDLEVBQUUsYUFBRixFQUFpQnFCLEdBQWpCLEtBQXVCLE9BQXZCLElBQWdDckIsRUFBRSxhQUFGLEVBQWlCcUIsR0FBakIsS0FBdUIsT0FBMUQsRUFBa0U7QUFDOUQ7O0FBRUEsZ0JBQUc0QyxPQUFLMEMsU0FBU0MsTUFBVCxDQUFnQixVQUFoQixDQUFSLEVBQW9DO0FBQ2hDO0FBQ0Esb0JBQUc1RyxFQUFFLFdBQUYsRUFBZXFCLEdBQWYsS0FBcUIsT0FBckIsSUFBOEJyQixFQUFFLFdBQUYsRUFBZXFCLEdBQWYsS0FBcUIsT0FBdEQsRUFBOEQsQ0FFN0QsQ0FGRCxNQUVLO0FBQ0RJLDBCQUFNLDZCQUFOO0FBQ0EsMkJBQU8sS0FBUDtBQUNIO0FBRUosYUFURCxNQVNLO0FBQ0Q7QUFDQSxvQkFBR3pCLEVBQUUsV0FBRixFQUFlcUIsR0FBZixLQUFxQixPQUFyQixJQUE4QnJCLEVBQUUsV0FBRixFQUFlcUIsR0FBZixLQUFxQixPQUF0RCxFQUE4RCxDQUU3RCxDQUZELE1BRUs7QUFDREksMEJBQU0sZ0NBQU47QUFDQSwyQkFBTyxLQUFQO0FBQ0g7QUFDSjtBQUNELGdCQUFJd0QsT0FBT2pGLEVBQUUsYUFBRixFQUFpQnFCLEdBQWpCLEVBQVg7QUFDQSxnQkFBSTZELEtBQUtsRixFQUFFLFdBQUYsRUFBZXFCLEdBQWYsRUFBVDs7QUFFQSxnQkFBSThGLFFBQVFsQyxLQUFLbEUsS0FBTCxDQUFXLEdBQVgsQ0FBWjtBQUNBLGdCQUFJcUcsTUFBTWxDLEdBQUduRSxLQUFILENBQVMsR0FBVCxDQUFWO0FBQ0EsZ0JBQUlpRSxNQUFNLENBQUNvQyxJQUFJLENBQUosSUFBTyxDQUFQLEdBQVdELE1BQU0sQ0FBTixJQUFTLENBQXJCLElBQXdCLEVBQXhCLElBQThCQyxJQUFJLENBQUosSUFBTyxDQUFQLEdBQVdELE1BQU0sQ0FBTixJQUFTLENBQWxELENBQVY7O0FBR0FILGlCQUFLSyxJQUFMLENBQVU7QUFDTnBDLHNCQUFNQSxJQURBO0FBRU5DLG9CQUFJQSxFQUZFO0FBR05GLHFCQUFLQTtBQUhDLGFBQVY7QUFNSCxTQW5DRCxNQW1DSztBQUNEdkQsa0JBQU0scUNBQU47QUFDQSxtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBR3pCLEVBQUUsY0FBRixFQUFrQnFCLEdBQWxCLEdBQXdCb0MsTUFBeEIsR0FBK0IsQ0FBbEMsRUFBb0M7QUFDaEMsZ0JBQUd6RCxFQUFFLGNBQUYsRUFBa0JxQixHQUFsQixLQUF3QixPQUF4QixJQUFpQ3JCLEVBQUUsY0FBRixFQUFrQnFCLEdBQWxCLEtBQXdCLE9BQTVELEVBQW9FOztBQUVoRSxvQkFBRzRDLE9BQUswQyxTQUFTQyxNQUFULENBQWdCLFVBQWhCLENBQVIsRUFBb0M7QUFDaEM7QUFDQSx3QkFBRzVHLEVBQUUsWUFBRixFQUFnQnFCLEdBQWhCLEtBQXNCLE9BQXRCLElBQStCckIsRUFBRSxZQUFGLEVBQWdCcUIsR0FBaEIsS0FBc0IsT0FBeEQsRUFBZ0UsQ0FFL0QsQ0FGRCxNQUVLO0FBQ0RJLDhCQUFNLHNDQUFOO0FBQ0EsK0JBQU8sS0FBUDtBQUNIO0FBRUosaUJBVEQsTUFTSztBQUNEO0FBQ0Esd0JBQUd6QixFQUFFLFlBQUYsRUFBZ0JxQixHQUFoQixLQUFzQixPQUF0QixJQUErQnJCLEVBQUUsWUFBRixFQUFnQnFCLEdBQWhCLEtBQXNCLE9BQXhELEVBQWdFLENBRS9ELENBRkQsTUFFSztBQUNESSw4QkFBTSx5Q0FBTjtBQUNBLCtCQUFPLEtBQVA7QUFDSDtBQUNKOztBQUVELG9CQUFJd0QsUUFBT2pGLEVBQUUsY0FBRixFQUFrQnFCLEdBQWxCLEVBQVg7QUFDQSxvQkFBSTZELE1BQUtsRixFQUFFLFlBQUYsRUFBZ0JxQixHQUFoQixFQUFUOztBQUVBLG9CQUFJOEYsU0FBUWxDLE1BQUtsRSxLQUFMLENBQVcsR0FBWCxDQUFaO0FBQ0Esb0JBQUlxRyxPQUFNbEMsSUFBR25FLEtBQUgsQ0FBUyxHQUFULENBQVY7QUFDQSxvQkFBSWlFLE9BQU0sQ0FBQ29DLEtBQUksQ0FBSixJQUFPLENBQVAsR0FBV0QsT0FBTSxDQUFOLElBQVMsQ0FBckIsSUFBd0IsRUFBeEIsSUFBOEJDLEtBQUksQ0FBSixJQUFPLENBQVAsR0FBV0QsT0FBTSxDQUFOLElBQVMsQ0FBbEQsQ0FBVjs7QUFHQUgscUJBQUtLLElBQUwsQ0FBVTtBQUNOcEMsMEJBQU1BLEtBREE7QUFFTkMsd0JBQUlBLEdBRkU7QUFHTkYseUJBQUtBO0FBSEMsaUJBQVY7QUFLSCxhQWxDRCxNQWtDSztBQUNEdkQsc0JBQU0sOENBQU47QUFDQSx1QkFBTyxLQUFQO0FBQ0g7QUFDSjtBQUNELFlBQUcsS0FBS3FCLE1BQUwsQ0FBWVcsTUFBWixHQUFtQixDQUF0QixFQUF3QjtBQUNwQmpELHFCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixZQUFVLEtBQUs2QixNQUFmLEdBQXNCLFVBQXRCLEdBQWlDbUIsSUFBekQsRUFBK0RxRCxHQUEvRCxDQUFtRU4sSUFBbkU7QUFDSCxTQUZELE1BRUs7QUFDRHhHLHFCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixZQUFVLEtBQUs0QixFQUFmLEdBQWtCLFVBQWxCLEdBQTZCb0IsSUFBckQsRUFBMkRxRCxHQUEzRCxDQUErRE4sSUFBL0Q7QUFDSDs7QUFFRGhILFVBQUUsUUFBRixFQUFZb0MsSUFBWixDQUFpQixFQUFqQjtBQUNIO0FBdmFRLENBQWI7O2tCQTBhZU8sTTs7Ozs7Ozs7Ozs7OztBQzFhZjs7OztBQUVBOzs7O0FBRUE7Ozs7OztBQUNBOztBQUpBO0FBTUEsSUFBSTRFLE9BQU87QUFDUEMsY0FBVSxFQURIO0FBRVBDLGNBQVUsRUFGSDs7QUFJUHRELGNBQVUsb0JBQVU7QUFDaEIsWUFBSWpCLE9BQU8sSUFBWDs7QUFFQWxELFVBQUUsZUFBRixFQUFtQnVELEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFFBQS9CLEVBQXlDLFlBQVU7QUFDL0MsZ0JBQUltRSxNQUFNMUgsRUFBRSxJQUFGLEVBQVEySCxNQUFSLEdBQWlCdEYsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBVjtBQUNBLGdCQUFJdkMsT0FBT0UsRUFBRSxJQUFGLEVBQVEySCxNQUFSLEdBQWlCMUIsUUFBakIsQ0FBMEIsT0FBMUIsRUFBbUM3RCxJQUFuQyxFQUFYO0FBQ0EsMkJBQUtoQyxJQUFMLENBQVU4QyxLQUFLdUUsUUFBTCxDQUFjQyxHQUFkLENBQVYsRUFBOEJBLEdBQTlCLEVBQW1DNUgsSUFBbkM7QUFDSCxTQUpEO0FBS0FFLFVBQUUsZUFBRixFQUFtQnVELEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFNBQS9CLEVBQTBDLFlBQVU7QUFDaEQsZ0JBQUltRSxNQUFNMUgsRUFBRSxJQUFGLEVBQVEySCxNQUFSLEdBQWlCdEYsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBVjtBQUNBLGdCQUFJdkMsT0FBT0UsRUFBRSxJQUFGLEVBQVEySCxNQUFSLEdBQWlCMUIsUUFBakIsQ0FBMEIsT0FBMUIsRUFBbUM3RCxJQUFuQyxFQUFYO0FBQ0EsNEJBQU1oQyxJQUFOLENBQVc4QyxLQUFLdUUsUUFBTCxDQUFjQyxHQUFkLENBQVgsRUFBK0JBLEdBQS9CLEVBQW9DNUgsSUFBcEM7QUFDSCxTQUpEO0FBS0FFLFVBQUUsZUFBRixFQUFtQnVELEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLE9BQS9CLEVBQXdDLFlBQVU7QUFDOUMsZ0JBQUltRSxNQUFNMUgsRUFBRSxJQUFGLEVBQVEySCxNQUFSLEdBQWlCdEYsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBVjtBQUNBLGdCQUFJdkMsT0FBT0UsRUFBRSxJQUFGLEVBQVEySCxNQUFSLEdBQWlCMUIsUUFBakIsQ0FBMEIsT0FBMUIsRUFBbUM3RCxJQUFuQyxFQUFYO0FBQ0EsMkJBQUtoQyxJQUFMLENBQVU4QyxLQUFLdUUsUUFBTCxDQUFjQyxHQUFkLENBQVYsRUFBOEJBLEdBQTlCLEVBQW1DNUgsSUFBbkM7QUFDSCxTQUpEOztBQU1BRSxVQUFFLGVBQUYsRUFBbUJ1RCxFQUFuQixDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QyxZQUFVO0FBQ25ETCxpQkFBSzBFLFdBQUwsQ0FBaUI1SCxFQUFFLElBQUYsRUFBUTJILE1BQVIsR0FBaUJ0RixJQUFqQixDQUFzQixJQUF0QixDQUFqQjtBQUNBO0FBQ0gsU0FIRDs7QUFLQXJDLFVBQUUsaUJBQUYsRUFBcUJDLEtBQXJCLENBQTJCLFlBQVU7QUFDakNpRCxpQkFBSzJFLGdCQUFMO0FBQ0gsU0FGRDtBQUdILEtBL0JNOztBQWlDUEEsc0JBQWtCLDRCQUFVO0FBQ3hCN0gsVUFBRSxjQUFGLEVBQWtCRyxRQUFsQixDQUEyQixhQUEzQjtBQUNBSCxVQUFFLGVBQUYsRUFBbUJFLFdBQW5CLENBQStCLGFBQS9CO0FBQ0FGLFVBQUUsb0JBQUYsRUFBd0JvQyxJQUF4QixDQUE2QixFQUE3Qjs7QUFFQSxhQUFLMEYsb0JBQUwsQ0FBMEIsS0FBS04sUUFBL0IsRUFBeUMsS0FBS0MsUUFBOUM7QUFDSCxLQXZDTTs7QUF5Q1BHLGlCQUFhLHFCQUFTRixHQUFULEVBQWE7QUFDdEIsWUFBRyxLQUFLRCxRQUFMLENBQWNDLEdBQWQsRUFBbUJLLEtBQXRCLEVBQTRCO0FBQ3hCLGdCQUFJbEQsT0FBTyxLQUFLNEMsUUFBTCxDQUFjQyxHQUFkLEVBQW1CSyxLQUE5QjtBQUNBLGdCQUFJQyxZQUFZLEVBQWhCO0FBQ0EsaUJBQUssSUFBSTdDLElBQUksQ0FBYixFQUFnQkEsSUFBSU4sS0FBS3BCLE1BQXpCLEVBQWlDMEIsR0FBakMsRUFBc0M7QUFDbEMsb0JBQUk0QyxRQUFRbEQsS0FBS00sQ0FBTCxDQUFaO0FBQ0Esb0JBQUcsQ0FBQzRDLE1BQU1FLElBQVYsRUFBZTtBQUNYQyw0QkFBUUMsR0FBUixDQUFZSixNQUFNakksSUFBbEI7QUFFSDtBQUNKO0FBQ0RvSSxvQkFBUUMsR0FBUixDQUFZdEQsSUFBWjtBQUNBO0FBQ0g7QUFDSixLQXZETTs7QUEwRFBpRCwwQkFBc0IsOEJBQVNOLFFBQVQsRUFBa0IzQyxJQUFsQixFQUF1QjtBQUN6QyxZQUFJekIsTUFBTSxnTEFBVjtBQUNBLGFBQUssSUFBSStCLElBQUksQ0FBYixFQUFnQkEsSUFBSXFDLFNBQVMvRCxNQUE3QixFQUFxQzBCLEdBQXJDLEVBQTBDO0FBQ3RDLGdCQUFJeEYsT0FBTzZILFNBQVNyQyxDQUFULENBQVg7QUFDQSxnQkFBR04sS0FBS2xGLEtBQUtxQyxJQUFWLENBQUgsRUFBbUI7QUFDZm9CLHVCQUFLLDJCQUF5QnpELEtBQUtxQyxJQUE5QixHQUFtQyxvQkFBbkMsR0FBd0RyQyxLQUFLRyxJQUE3RCxHQUFrRSxNQUF2RTs7QUFFQSxvQkFBRytFLEtBQUtsRixLQUFLcUMsSUFBVixFQUFnQm9HLE1BQW5CLEVBQTBCO0FBQ3RCaEYsMkJBQU0seUJBQU47QUFDSCxpQkFGRCxNQUVLO0FBQ0RBLDJCQUFNLHlCQUFOO0FBQ0g7O0FBRUQsb0JBQUd5QixLQUFLbEYsS0FBS3FDLElBQVYsRUFBZ0JxRyxLQUFuQixFQUF5QjtBQUNyQix3QkFBSUMsT0FBT3pELEtBQUtsRixLQUFLcUMsSUFBVixFQUFnQnFHLEtBQTNCOztBQUVBLHdCQUFHeEQsS0FBS2xGLEtBQUtxQyxJQUFWLEVBQWdCdUcsTUFBbkIsRUFBMEI7QUFDdEIsNEJBQUcxRCxLQUFLbEYsS0FBS3FDLElBQVYsRUFBZ0J1RyxNQUFoQixDQUF1QkYsS0FBdkIsS0FBaUMsVUFBcEMsRUFBK0M7QUFDM0NqRixtQ0FBTSxnQ0FBTjtBQUNILHlCQUZELE1BRU0sSUFBR3lCLEtBQUtsRixLQUFLcUMsSUFBVixFQUFnQnVHLE1BQWhCLENBQXVCRixLQUF2QixLQUFpQyxXQUFwQyxFQUFnRDtBQUNsRGpGLG1DQUFNLHFDQUFOO0FBQ0gseUJBRkssTUFFQSxJQUFHa0YsS0FBS0UsU0FBUixFQUFrQjtBQUNwQnBGLG1DQUFNLGtDQUFOO0FBQ0gseUJBRkssTUFFRDtBQUNEQSxtQ0FBTSxxQ0FBTjtBQUNIO0FBQ0oscUJBVkQsTUFVTSxJQUFHa0YsS0FBS0UsU0FBUixFQUFrQjtBQUNwQnBGLCtCQUFNLGtDQUFOO0FBQ0gscUJBRkssTUFFRDtBQUNEQSwrQkFBTSxxQ0FBTjtBQUNIO0FBQ0o7O0FBRUQsb0JBQUcsQ0FBQ3lCLEtBQUtsRixLQUFLcUMsSUFBVixFQUFnQnVHLE1BQXBCLEVBQTJCO0FBQ3ZCL0gsNkJBQVNRLFFBQVQsR0FBb0JDLEdBQXBCLENBQXdCLFlBQVd0QixLQUFLcUMsSUFBaEIsR0FBdUIsU0FBL0MsRUFBMERzRixHQUExRCxDQUE4RDtBQUMxRGUsK0JBQU07QUFEb0QscUJBQTlEO0FBR0g7O0FBRUQsb0JBQUd4RCxLQUFLbEYsS0FBS3FDLElBQVYsRUFBZ0J5RyxJQUFuQixFQUF3QjtBQUNwQnJGLDJCQUFNLHVCQUFOO0FBQ0gsaUJBRkQsTUFFSztBQUNEQSwyQkFBTSx1QkFBTjtBQUNIO0FBQ0Qsb0JBQUd5QixLQUFLbEYsS0FBS3FDLElBQVYsRUFBZ0IrRixLQUFuQixFQUF5QjtBQUNyQjNFLDJCQUFNLDRCQUFOO0FBQ0gsaUJBRkQsTUFFSztBQUNEQSwyQkFBTSw0QkFBTjtBQUNIOztBQUVELG9CQUFHeUIsS0FBS2xGLEtBQUtxQyxJQUFWLEVBQWdCMEcsS0FBbkIsRUFBeUI7QUFDckJ0RiwyQkFBTSx3QkFBTjtBQUNILGlCQUZELE1BRUs7QUFDREEsMkJBQU0sd0JBQU47QUFDSDs7QUFFREEsdUJBQU0sUUFBTjtBQUVILGFBdERELE1Bc0RLO0FBQ0RBLHVCQUFLLDJCQUF5QnpELEtBQUtxQyxJQUE5QixHQUFtQywyQkFBbkMsR0FBK0RyQyxLQUFLRyxJQUFwRSxHQUF5RSxNQUE5RTtBQUNBc0QsdUJBQU8sK0hBQVA7QUFDSDtBQUNKOztBQUVEcEQsVUFBRSxlQUFGLEVBQW1Cb0MsSUFBbkIsQ0FBd0JnQixHQUF4QjtBQUVILEtBNUhNOztBQThIUGhELFVBQU0sY0FBU3lDLEVBQVQsRUFBYS9DLElBQWIsRUFBbUJDLEtBQW5CLEVBQXlCO0FBQUE7O0FBQzNCLFlBQUltRCxPQUFPLElBQVg7QUFDQSxhQUFLaUIsUUFBTDs7QUFFQTNELGlCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixHQUEwQkMsSUFBMUIsQ0FBK0IsT0FBL0IsRUFBd0MsZ0JBQU87QUFDM0NsQixjQUFFLGNBQUYsRUFBa0JHLFFBQWxCLENBQTJCLGFBQTNCO0FBQ0EsZ0JBQUlxSCxXQUFXcEcsS0FBS0MsR0FBTCxHQUFXc0gsT0FBWCxDQUFtQkMsTUFBbEM7QUFDQSxnQkFBSS9ELE9BQU96RCxLQUFLQyxHQUFMLEdBQVd1SCxNQUF0QjtBQUNBLGtCQUFLbkIsUUFBTCxHQUFnQjVDLElBQWhCO0FBQ0Esa0JBQUsyQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGtCQUFLTSxvQkFBTCxDQUEwQk4sUUFBMUIsRUFBb0MzQyxJQUFwQztBQUNBcUQsb0JBQVFDLEdBQVIsQ0FBWXRELElBQVo7QUFDSCxTQVJEO0FBU0g7O0FBM0lNLENBQVg7QUFKQTtrQkFtSmUwQyxJOzs7Ozs7Ozs7Ozs7O0FDdEpmOzs7O0FBQ0E7Ozs7OztBQUVBOztBQUVBLElBQUlzQixPQUFPOztBQUVQaEUsVUFBSyxFQUZFOztBQUlQVixjQUFVLG9CQUFVO0FBQ2hCLFlBQUlqQixPQUFPLElBQVg7O0FBRUFsRCxVQUFFLGNBQUYsRUFBa0J1RCxFQUFsQixDQUFxQixPQUFyQixFQUE4QixpQkFBOUIsRUFBaUQsWUFBVTtBQUN2REwsaUJBQUs0RixlQUFMLENBQXFCOUksRUFBRSxJQUFGLEVBQVEySCxNQUFSLEdBQWlCdEYsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBckIsRUFBa0RyQyxFQUFFLElBQUYsRUFBUTJILE1BQVIsR0FBaUIxQixRQUFqQixDQUEwQixrQkFBMUIsRUFBOEM1RSxHQUE5QyxFQUFsRDtBQUNILFNBRkQ7O0FBSUFyQixVQUFFLGNBQUYsRUFBa0J1RCxFQUFsQixDQUFxQixPQUFyQixFQUE4QixvQkFBOUIsRUFBb0QsWUFBVTtBQUMxREwsaUJBQUs2RixVQUFMLENBQWdCL0ksRUFBRSxJQUFGLEVBQVEySCxNQUFSLEdBQWlCdEYsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBaEIsRUFBNkNyQyxFQUFFLElBQUYsRUFBUTJILE1BQVIsR0FBaUIxQixRQUFqQixDQUEwQixrQkFBMUIsRUFBOEM3RCxJQUE5QyxFQUE3QztBQUNILFNBRkQ7O0FBSUFwQyxVQUFFLGNBQUYsRUFBa0J1RCxFQUFsQixDQUFxQixPQUFyQixFQUE4Qix5QkFBOUIsRUFBeUQsWUFBVTtBQUMvREwsaUJBQUs4RixlQUFMLENBQXFCaEosRUFBRSxJQUFGLEVBQVEySCxNQUFSLEdBQWlCdEYsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBckIsRUFBa0RyQyxFQUFFLElBQUYsRUFBUTJILE1BQVIsR0FBaUIxQixRQUFqQixDQUEwQixzQkFBMUIsRUFBa0Q1RSxHQUFsRCxFQUFsRDtBQUNILFNBRkQ7QUFHSCxLQWxCTTs7QUFvQlBqQixVQUFNLGNBQVN5RSxJQUFULEVBQWU2QyxHQUFmLEVBQW9CNUgsSUFBcEIsRUFBeUI7QUFDM0IsYUFBS3FFLFFBQUw7QUFDQSxhQUFLVSxJQUFMLEdBQVlBLElBQVo7O0FBRUE3RSxVQUFFLGVBQUYsRUFBbUJHLFFBQW5CLENBQTRCLGFBQTVCO0FBQ0FILFVBQUUsYUFBRixFQUFpQkUsV0FBakIsQ0FBNkIsYUFBN0I7QUFDQUYsVUFBRSxXQUFGLEVBQWVvQyxJQUFmLENBQW9CdEMsSUFBcEIsRUFBMEJ1QyxJQUExQixDQUErQixJQUEvQixFQUFxQ3FGLEdBQXJDOztBQUVBLFlBQUc3QyxLQUFLMEQsTUFBUixFQUFlO0FBQ1gsZ0JBQUcxRCxLQUFLMEQsTUFBTCxDQUFZRixLQUFaLEtBQXNCLFVBQXpCLEVBQW9DO0FBQ2hDSCx3QkFBUUMsR0FBUixDQUFZLFdBQVo7QUFDSCxhQUZELE1BRU0sSUFBR3RELEtBQUswRCxNQUFMLENBQVlGLEtBQVosS0FBc0IsV0FBekIsRUFBcUM7QUFDdkNILHdCQUFRQyxHQUFSLENBQVksZ0JBQVo7QUFDQSxvQ0FBTy9ILElBQVAsQ0FBWXlFLEtBQUt3RCxLQUFMLENBQVdZLFFBQXZCO0FBQ0E7QUFDSCxhQUpLLE1BSUEsSUFBSXBFLEtBQUt3RCxLQUFMLENBQVdHLFNBQWYsRUFBMEI7QUFDNUJOLHdCQUFRQyxHQUFSLENBQVksU0FBWjtBQUNBO0FBQ0Esd0NBQWMvSCxJQUFkLENBQW1CeUUsS0FBS3dELEtBQXhCO0FBQ0gsYUFKSyxNQUlEO0FBQ0QscUJBQUthLFVBQUwsQ0FBZ0JyRSxLQUFLd0QsS0FBckIsRUFEQyxDQUM0QjtBQUM3QjtBQUNIO0FBQ0osU0FmRCxNQWVLO0FBQ0QsZ0JBQUl4RCxLQUFLd0QsS0FBTCxDQUFXRyxTQUFmLEVBQTBCO0FBQ3RCTix3QkFBUUMsR0FBUixDQUFZLFNBQVo7QUFDQTtBQUNBLHdDQUFjL0gsSUFBZCxDQUFtQnlFLEtBQUt3RCxLQUF4QjtBQUNILGFBSkQsTUFJSztBQUNELHFCQUFLYSxVQUFMLENBQWdCckUsS0FBS3dELEtBQXJCLEVBREMsQ0FDNEI7QUFDN0I7QUFDSDtBQUNKO0FBR0osS0F2RE07O0FBeURQYyxrQ0FBOEIsd0NBQVU7QUFDcEMsWUFBSXhKLE9BQU9LLEVBQUUsV0FBRixFQUFlcUMsSUFBZixDQUFvQixJQUFwQixDQUFYO0FBQ0EsWUFBSStHLFVBQVUsQ0FBQyxJQUFELEVBQU0sSUFBTixFQUFXLElBQVgsRUFBZ0IsSUFBaEIsQ0FBZDtBQUNBLFlBQUlaLFlBQVksRUFBaEI7QUFDQSxZQUFJYSxVQUFVLENBQWQ7QUFDQSxZQUFJeEUsT0FBTyxLQUFLQSxJQUFMLENBQVV3RCxLQUFyQjs7QUFFQSxhQUFLLElBQUkxQyxJQUFJLENBQWIsRUFBZ0JBLElBQUl5RCxRQUFRM0YsTUFBNUIsRUFBb0NrQyxHQUFwQyxFQUF5QztBQUNyQyxnQkFBSTJELE9BQU9GLFFBQVF6RCxDQUFSLENBQVg7QUFDQSxnQkFBR2QsS0FBS3lFLElBQUwsQ0FBSCxFQUFjO0FBQ1Ysb0JBQUd6RSxLQUFLeUUsSUFBTCxFQUFXQyxNQUFkLEVBQXFCLENBRXBCLENBRkQsTUFFSzs7QUFFRCx5QkFBSyxJQUFJcEUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJTixLQUFLeUUsSUFBTCxFQUFXN0YsTUFBL0IsRUFBdUMwQixHQUF2QyxFQUE0QztBQUN4Qyw0QkFBR04sS0FBS3lFLElBQUwsRUFBV25FLENBQVgsS0FBZSxDQUFDTixLQUFLeUUsSUFBTCxFQUFXbkUsQ0FBWCxFQUFjcUUsT0FBakMsRUFBeUM7QUFDckMsZ0NBQUlDLFVBQVU1RSxLQUFLeUUsSUFBTCxFQUFXbkUsQ0FBWCxDQUFkO0FBQ0E7O0FBRUEsZ0NBQUltRCxPQUFPO0FBQ1B4SSxzQ0FBSztBQUNENEosd0NBQUcsRUFERjtBQUVEQyx3Q0FBRztBQUZGLGlDQURFO0FBS1BDLHNDQUFNSCxRQUFRRyxJQUxQO0FBTVBDLHNDQUFLO0FBTkUsNkJBQVg7O0FBV0EsZ0NBQUksUUFBUUMsSUFBUixDQUFhTCxRQUFRM0osSUFBckIsQ0FBSixFQUFnQztBQUM1QndJLHFDQUFLeEksSUFBTCxDQUFVNEosRUFBVixHQUFlRCxRQUFRM0osSUFBdkI7QUFDSCw2QkFGRCxNQUVPO0FBQ0h3SSxxQ0FBS3hJLElBQUwsQ0FBVTZKLEVBQVYsR0FBZUYsUUFBUTNKLElBQXZCO0FBQ0g7QUFDRHdJLGlDQUFLdUIsSUFBTCxDQUFVUCxJQUFWLElBQWtCbkUsQ0FBbEI7O0FBRUEsZ0NBQUdzRSxRQUFRTSxHQUFYLEVBQWU7QUFDWHpCLHFDQUFLeUIsR0FBTCxHQUFXTixRQUFRTSxHQUFuQjtBQUNIO0FBQ0QsZ0NBQUdOLFFBQVFPLEdBQVgsRUFBZTtBQUNYMUIscUNBQUswQixHQUFMLEdBQVdQLFFBQVFPLEdBQW5CO0FBQ0g7O0FBRUQsZ0NBQUdYLFVBQVEsRUFBWCxFQUFjO0FBQ1ZiLDBDQUFVLFFBQU1hLE9BQWhCLElBQTJCZixJQUEzQjtBQUNILDZCQUZELE1BRU0sSUFBR2UsVUFBUSxHQUFYLEVBQWU7QUFDakJiLDBDQUFVLE9BQUthLE9BQWYsSUFBMEJmLElBQTFCO0FBQ0gsNkJBRkssTUFFRDtBQUNERSwwQ0FBVSxNQUFJYSxPQUFkLElBQXlCZixJQUF6QjtBQUNIO0FBQ0RlO0FBQ0g7QUFDSixxQkF6Q0EsQ0F5Q0M7QUFFTDtBQUNKO0FBQ0o7O0FBRUQsYUFBS1ksb0JBQUwsQ0FBMEJ6QixTQUExQjtBQUNILEtBckhNOztBQXVIUHlCLDBCQUFzQiw4QkFBU3pCLFNBQVQsRUFBbUI7QUFDckM7O0FBRUEsWUFBSTdJLE9BQU9LLEVBQUUsV0FBRixFQUFlcUMsSUFBZixDQUFvQixJQUFwQixDQUFYOztBQUVBLFlBQUk2SCxhQUFhLEVBQWpCO0FBQ0EsWUFBSWpCLFdBQVcsRUFBZjs7QUFFQSxhQUFLLElBQUlqSCxJQUFULElBQWlCd0csU0FBakIsRUFBNEI7QUFDeEIsZ0JBQUlGLE9BQU9FLFVBQVV4RyxJQUFWLENBQVg7QUFDQWtJLHVCQUFXbEksSUFBWCxJQUFtQnNHLElBQW5CO0FBQ0E0Qix1QkFBV2xJLElBQVgsRUFBaUJtSSxPQUFqQixHQUEyQixFQUEzQjtBQUNBLGdCQUFJQyxjQUFjLEtBQWxCO0FBQ0E7O0FBRUEsaUJBQUssSUFBSUMsS0FBVCxJQUFrQjdCLFNBQWxCLEVBQTZCO0FBQ3pCLG9CQUFHeEcsT0FBS3FJLEtBQVIsRUFBYztBQUNWLHdCQUFJQyxRQUFRLEVBQVo7QUFDQSx5QkFBSyxJQUFJQyxHQUFULElBQWdCL0IsVUFBVTZCLEtBQVYsQ0FBaEIsRUFBa0M7QUFDOUJDLDhCQUFNQyxHQUFOLElBQWEvQixVQUFVNkIsS0FBVixFQUFpQkUsR0FBakIsQ0FBYjtBQUNIO0FBQ0Qsd0JBQUcsQ0FBQ0QsTUFBTWQsT0FBVixFQUFrQjtBQUNkLDRCQUFJeEUsTUFBTXdGLGFBQWFsQyxLQUFLc0IsSUFBbEIsRUFBd0JVLE1BQU1WLElBQTlCLENBQVY7O0FBRUEsNEJBQUc1RSxNQUFJLEdBQVAsRUFBVztBQUNQa0YsdUNBQVdsSSxJQUFYLEVBQWlCbUksT0FBakIsQ0FBeUJFLEtBQXpCLElBQWtDQyxLQUFsQztBQUNBRiwwQ0FBYyxJQUFkO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBRUQsZ0JBQUcsQ0FBQ0EsV0FBSixFQUFnQjtBQUNabkIseUJBQVNqSCxJQUFULElBQWlCa0ksV0FBV2xJLElBQVgsQ0FBakI7QUFDQSx1QkFBT2tJLFdBQVdsSSxJQUFYLENBQVA7QUFDSDtBQUVKOztBQUVEeEIsaUJBQVNRLFFBQVQsR0FBb0JDLEdBQXBCLENBQXdCLFlBQVV0QixJQUFWLEdBQWUsUUFBdkMsRUFBaUQySCxHQUFqRCxDQUFxRDtBQUNqRGtCLHVCQUFVMEIsVUFEdUM7QUFFakRqQixzQkFBU0E7QUFGd0MsU0FBckQ7O0FBS0EsZ0NBQWM3SSxJQUFkLENBQW1CO0FBQ2ZvSSx1QkFBVTBCLFVBREs7QUFFZmpCLHNCQUFTQTtBQUZNLFNBQW5CO0FBS0gsS0F4S007O0FBMEtQRixnQkFBWSxvQkFBUzBCLEdBQVQsRUFBYzNLLElBQWQsRUFBbUI7QUFDM0IsWUFBSUgsT0FBT0ssRUFBRSxXQUFGLEVBQWVxQyxJQUFmLENBQW9CLElBQXBCLENBQVg7QUFDQSxZQUFJaUgsT0FBT21CLElBQUkxSixLQUFKLENBQVUsR0FBVixFQUFlLENBQWYsQ0FBWDtBQUNBLFlBQUkySixLQUFLRCxJQUFJMUosS0FBSixDQUFVLEdBQVYsRUFBZSxDQUFmLENBQVQ7O0FBRUEsWUFBR3VCLFFBQVF4QyxPQUFPLG9CQUFmLENBQUgsRUFBd0M7QUFDcENVLHFCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixZQUFXdEIsSUFBWCxHQUFrQixTQUFsQixHQUE4QjJKLElBQTlCLEdBQXFDLEdBQXJDLEdBQTJDb0IsRUFBbkUsRUFBd0VwRCxHQUF4RSxDQUE0RSxFQUFDa0MsU0FBUyxJQUFWLEVBQTVFO0FBQ0F4SixjQUFFLE1BQUl5SyxHQUFOLEVBQVd2RCxNQUFYO0FBQ0F5RCxrQkFBTSxjQUFOO0FBQ0g7QUFDSixLQXBMTTs7QUFzTFA3QixxQkFBaUIseUJBQVMyQixHQUFULEVBQWNHLE9BQWQsRUFBc0I7QUFDbkMsWUFBSWpMLE9BQU9LLEVBQUUsV0FBRixFQUFlcUMsSUFBZixDQUFvQixJQUFwQixDQUFYO0FBQ0EsWUFBSWlILE9BQU9tQixJQUFJMUosS0FBSixDQUFVLEdBQVYsRUFBZSxDQUFmLENBQVg7QUFDQSxZQUFJMkosS0FBS0QsSUFBSTFKLEtBQUosQ0FBVSxHQUFWLEVBQWUsQ0FBZixDQUFUO0FBQ0EsWUFBSTZJLE9BQU8sRUFBWDs7QUFFQSxZQUFHZ0IsUUFBUTdKLEtBQVIsQ0FBYyxHQUFkLEVBQW1CMEMsTUFBbkIsS0FBOEIsQ0FBakMsRUFBbUM7QUFDL0IsZ0JBQUlvSCxNQUFNRCxRQUFRN0osS0FBUixDQUFjLEdBQWQsRUFBbUIsQ0FBbkIsRUFBc0IrSixJQUF0QixLQUE2QixDQUF2QztBQUNBLGdCQUFJQyxNQUFNSCxRQUFRN0osS0FBUixDQUFjLEdBQWQsRUFBbUIsQ0FBbkIsRUFBc0IrSixJQUF0QixLQUE2QixDQUF2Qzs7QUFFQSxnQkFBR0UsTUFBTUgsR0FBTixLQUFZRyxNQUFNRCxHQUFOLENBQWYsRUFBMEI7QUFDdEI7QUFDQUosc0JBQU0sbUJBQU47QUFDSCxhQUhELE1BR0s7QUFDRGYsdUJBQU87QUFDSGlCLHlCQUFLQSxHQURGO0FBRUhFLHlCQUFLQTtBQUZGLGlCQUFQO0FBSUFKLHNCQUFNLGFBQU47QUFDQTNLLGtCQUFFLE1BQUl5SyxHQUFOLEVBQVd2RCxNQUFYO0FBQ0ExRyx5QkFBU1EsUUFBVCxHQUFvQkMsR0FBcEIsQ0FBd0IsWUFBV3RCLElBQVgsR0FBa0IsU0FBbEIsR0FBOEIySixJQUE5QixHQUFxQyxHQUFyQyxHQUEyQ29CLEVBQTNDLEdBQWdELE9BQXhFLEVBQWlGcEQsR0FBakYsQ0FBcUZzQyxJQUFyRjtBQUNIO0FBQ0osU0FoQkQsTUFnQks7QUFDRGUsa0JBQU0sbUJBQU47QUFDSDtBQUNKLEtBL01NOztBQWlOUDNCLHFCQUFpQix5QkFBU00sSUFBVCxFQUFlMkIsTUFBZixFQUFzQjtBQUNuQyxZQUFJdEwsT0FBT0ssRUFBRSxXQUFGLEVBQWVxQyxJQUFmLENBQW9CLElBQXBCLENBQVg7QUFDQSxZQUFJNkksUUFBUUQsT0FBT0gsSUFBUCxLQUFjLENBQTFCOztBQUVBLFlBQUdJLFFBQU0sR0FBVCxFQUFhO0FBQ1RQLGtCQUFNLHFCQUFOO0FBQ0gsU0FGRCxNQUVLO0FBQ0QsZ0JBQUdySSxRQUFRLFFBQU80SSxLQUFQLEdBQWUsMEJBQXZCLENBQUgsRUFBc0Q7QUFDbEQsb0JBQUlDLFNBQVMsS0FBS3RHLElBQUwsQ0FBVXdELEtBQVYsQ0FBZ0JpQixJQUFoQixDQUFiO0FBQ0E2Qix1QkFBTzFILE1BQVAsR0FBZ0J5SCxLQUFoQjs7QUFFQTFLLHlCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixZQUFXdEIsSUFBWCxHQUFrQixTQUFsQixHQUE4QjJKLElBQXRELEVBQTREaEMsR0FBNUQsQ0FBZ0U2RCxNQUFoRTtBQUNILGFBTEQsTUFLSztBQUNELHVCQUFPLEtBQVA7QUFDSDtBQUNKO0FBQ0osS0FqT007O0FBbU9QakMsZ0JBQVksb0JBQVNyRSxJQUFULEVBQWM7O0FBRXRCN0UsVUFBRSxhQUFGLEVBQWlCRyxRQUFqQixDQUEwQixhQUExQjtBQUNBSCxVQUFFLG1CQUFGLEVBQXVCRSxXQUF2QixDQUFtQyxhQUFuQzs7QUFFQUYsVUFBRSxpQkFBRixFQUFxQm9DLElBQXJCLENBQTBCLFNBQTFCO0FBQ0EsWUFBSWdKLGFBQVksS0FBaEI7QUFDQSxZQUFJaEksTUFBTSxFQUFWO0FBQ0EsWUFBSWlJLFlBQVkseUNBQXlDckwsRUFBRSxXQUFGLEVBQWVvQyxJQUFmLEVBQXpDLEdBQWdFLEdBQWhGOztBQUVBLFlBQUlrSixVQUFVO0FBQ1ZDLGdCQUFJLElBRE07QUFFVkMsZ0JBQUksS0FGTTtBQUdWQyxnQkFBSSxTQUhNO0FBSVZDLGdCQUFJO0FBSk0sU0FBZDs7QUFPQSxhQUFLLElBQUlwQyxJQUFULElBQWlCZ0MsT0FBakIsRUFBMEI7QUFDdEIsZ0JBQUlLLGlCQUFpQixLQUFyQjtBQUNBLGdCQUFJQyxTQUFTLEtBQWI7QUFDQSxnQkFBSUMsWUFBWSxzREFBaEI7QUFDQSxnQkFBSUMsU0FBUyxLQUFiO0FBQ0EsZ0JBQUlDLFlBQVksK0NBQWhCOztBQUVBLGdCQUFHbEgsS0FBS3lFLElBQUwsQ0FBSCxFQUFjO0FBQ1ZsRyx1QkFBSyw2QkFBMkJrSSxRQUFRaEMsSUFBUixDQUEzQixHQUF5QyxhQUE5QztBQUNBLHFCQUFLLElBQUluRSxJQUFJLENBQWIsRUFBZ0JBLElBQUlOLEtBQUt5RSxJQUFMLEVBQVc3RixNQUEvQixFQUF1QzBCLEdBQXZDLEVBQTRDO0FBQ3hDLHdCQUFJbUQsT0FBT3pELEtBQUt5RSxJQUFMLEVBQVduRSxDQUFYLENBQVg7QUFDQSx3QkFBR21ELElBQUgsRUFBUTtBQUNKLDRCQUFJMEQsVUFBVSxJQUFkO0FBQ0EsNEJBQUcxRCxLQUFLa0IsT0FBUixFQUFnQjtBQUNaO0FBQ0gseUJBRkQsTUFFSztBQUNELGdDQUFHbEIsS0FBS3NCLElBQVIsRUFBYTtBQUNULG9DQUFHdEIsS0FBS3NCLElBQUwsQ0FBVW1CLEdBQWIsRUFBaUI7QUFDYix3Q0FBR0MsTUFBTTFDLEtBQUtzQixJQUFMLENBQVVtQixHQUFWLEdBQWMsQ0FBcEIsQ0FBSCxFQUEwQjtBQUN0QmlCLGtEQUFVLEtBQVY7QUFDSDtBQUNKLGlDQUpELE1BSUs7QUFDREEsOENBQVUsS0FBVjtBQUNIOztBQUVELG9DQUFHMUQsS0FBS3NCLElBQUwsQ0FBVWlCLEdBQWIsRUFBaUI7QUFDYix3Q0FBR0csTUFBTTFDLEtBQUtzQixJQUFMLENBQVVpQixHQUFWLEdBQWMsQ0FBcEIsQ0FBSCxFQUEwQjtBQUN0Qm1CLGtEQUFVLEtBQVY7QUFDSDtBQUNKLGlDQUpELE1BSUs7QUFDREEsOENBQVUsS0FBVjtBQUNIO0FBQ0osNkJBaEJELE1BZ0JLO0FBQ0RBLDBDQUFVLEtBQVY7QUFDSDs7QUFFRCxnQ0FBRyxDQUFDQSxPQUFKLEVBQVk7QUFDUkgsNkNBQVcsa0NBQWdDdkMsSUFBaEMsR0FBcUMsR0FBckMsR0FBeUNuRSxDQUF6QyxHQUEyQyxJQUF0RDtBQUNBMEcsNkNBQWMsc0NBQW9DUixTQUFwQyxHQUE4Qy9DLEtBQUt4SSxJQUFuRCxHQUF3RCxvQkFBeEQsR0FBNkV3SSxLQUFLeEksSUFBbEYsR0FBdUYsTUFBckc7QUFDQStMLDZDQUFjLHdFQUFkO0FBQ0FBLDZDQUFjLDJFQUFkO0FBQ0FBLDZDQUFXLFFBQVg7QUFDQVQsNkNBQWEsSUFBYjtBQUNBTyxpREFBaUIsSUFBakI7QUFDQUMseUNBQVMsSUFBVDtBQUNIO0FBQ0o7QUFFSixxQkFyQ0QsTUFxQ0s7QUFDREcscUNBQVcsa0NBQWdDekMsSUFBaEMsR0FBcUMsR0FBckMsR0FBeUNuRSxDQUF6QyxHQUEyQyxJQUF0RDtBQUNBNEcscUNBQWMsMkJBQXlCNUcsQ0FBekIsR0FBMkIsWUFBekM7QUFDQTRHLHFDQUFjLHdDQUFkO0FBQ0FBLHFDQUFXLFFBQVg7QUFDQVgscUNBQWEsSUFBYjtBQUNBTyx5Q0FBaUIsSUFBakI7QUFDQUcsaUNBQVMsSUFBVDtBQUNIO0FBQ0o7O0FBRUQsb0JBQUdGLE1BQUgsRUFBVTtBQUNOeEksMkJBQU95SSxTQUFQO0FBQ0g7QUFDRCxvQkFBR0MsTUFBSCxFQUFVO0FBQ04xSSwyQkFBTzJJLFNBQVA7QUFDSDs7QUFFRCxvQkFBR2xILEtBQUt5RSxJQUFMLEVBQVc3RixNQUFYLEdBQWtCLEdBQXJCLEVBQXlCO0FBQ3JCLHdCQUFJd0ksVUFBVSxJQUFkO0FBQ0Esd0JBQUdwSCxLQUFLcUgsU0FBUixFQUFrQjtBQUNkLDRCQUFHckgsS0FBS3FILFNBQUwsQ0FBZTVDLElBQWYsQ0FBSCxFQUF3QjtBQUNwQjtBQUNILHlCQUZELE1BRUs7QUFDRDJDLHNDQUFVLEtBQVY7QUFDSDtBQUNKLHFCQU5ELE1BTUs7QUFDREEsa0NBQVUsS0FBVjtBQUNIOztBQUVELHdCQUFHLENBQUNBLE9BQUosRUFBWTtBQUNSYixxQ0FBYSxJQUFiO0FBQ0FPLHlDQUFpQixJQUFqQjtBQUNBdkksK0JBQUssZ0NBQThCa0ksUUFBUWhDLElBQVIsQ0FBOUIsR0FBNEMsb0JBQTVDLEdBQWlFekUsS0FBS3lFLElBQUwsRUFBVzdGLE1BQTVFLEdBQW1GLFlBQXhGO0FBQ0FMLCtCQUFLLGtDQUFnQ2tHLElBQWhDLEdBQXFDLElBQTFDO0FBQ0FsRywrQkFBUSwrQ0FBNkN5QixLQUFLeUUsSUFBTCxFQUFXN0YsTUFBeEQsR0FBK0QsSUFBdkU7QUFDQUwsK0JBQVEsa0RBQVI7QUFDQUEsK0JBQUssUUFBTDtBQUNIO0FBRUo7QUFFSixhQW5GRCxNQW1GSztBQUNEQSx1QkFBSyw2QkFBMkJrSSxRQUFRaEMsSUFBUixDQUEzQixHQUF5QyxzQkFBOUM7QUFDQThCLDZCQUFhLElBQWI7QUFDQU8saUNBQWlCLElBQWpCOztBQUVBO0FBQ0g7QUFDRCxnQkFBRyxDQUFDQSxjQUFKLEVBQW1CO0FBQ2Z2SSx1QkFBTSw2Q0FBTjtBQUNIO0FBQ0o7O0FBRUQsWUFBR2dJLFVBQUgsRUFBYztBQUNWaEksbUJBQU8sMkNBQVA7QUFDQXBELGNBQUUsY0FBRixFQUFrQm9DLElBQWxCLENBQXVCZ0IsR0FBdkI7QUFDSCxTQUhELE1BR0s7QUFDRHVILGtCQUFNLDJCQUFOO0FBQ0EsaUJBQUt4Qiw0QkFBTDtBQUNIO0FBQ0o7QUFqV00sQ0FBWDs7a0JBb1dlTixJOzs7Ozs7Ozs7Ozs7QUN6V2YsSUFBSXNELGdCQUFnQjtBQUNoQkMsU0FBSyxFQURXO0FBRWhCQyxZQUFRO0FBQ0pDLGVBQU0sRUFERjtBQUVKQyxnQkFBTztBQUZILEtBRlE7QUFNaEIxSCxVQUFLLEVBTlc7QUFPaEIySCxZQUFPLENBUFM7O0FBU2hCckksY0FBVSxvQkFBVTtBQUNoQixZQUFJakIsT0FBTyxJQUFYOztBQUVBbEQsVUFBRSxrQkFBRixFQUFzQnVELEVBQXRCLENBQXlCLE9BQXpCLEVBQWtDLHVCQUFsQyxFQUEyRCxZQUFVO0FBQ2pFdkQsY0FBRSxJQUFGLEVBQVFpRyxRQUFSLENBQWlCLHlCQUFqQixFQUE0Q3dHLFdBQTVDLENBQXdELDBCQUF4RDtBQUNILFNBRkQ7O0FBSUF6TSxVQUFFLGdCQUFGLEVBQW9CdUQsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBK0Isb0JBQS9CLEVBQXFELFlBQVU7QUFDM0RMLGlCQUFLd0osUUFBTDtBQUNILFNBRkQ7QUFHSCxLQW5CZTs7QUFxQmhCQSxjQUFVLG9CQUFVO0FBQ2hCLFlBQUkvTSxPQUFPSyxFQUFFLFdBQUYsRUFBZXFDLElBQWYsQ0FBb0IsSUFBcEIsQ0FBWDs7QUFFQSxZQUFJc0ssV0FBVyxLQUFLOUgsSUFBTCxDQUFVMkQsU0FBVixDQUFvQnhJLEVBQUUsZ0JBQUYsRUFBb0JxQyxJQUFwQixDQUF5QixJQUF6QixDQUFwQixDQUFmOztBQUVBLGFBQUssSUFBSThDLElBQUksQ0FBYixFQUFnQkEsSUFBSW5GLEVBQUUsMkJBQUYsRUFBK0J5RCxNQUFuRCxFQUEyRDBCLEdBQTNELEVBQWdFO0FBQzVELGdCQUFJeUgsTUFBTTVNLEVBQUUsMkJBQUYsRUFBK0J5RixFQUEvQixDQUFrQ04sQ0FBbEMsRUFBcUM5QyxJQUFyQyxDQUEwQyxLQUExQyxDQUFWO0FBQ0EsZ0JBQUl3SyxhQUFhRixTQUFTeEMsT0FBVCxDQUFpQnlDLEdBQWpCLENBQWpCOztBQUVBO0FBQ0EsaUJBQUssSUFBSXRELElBQVQsSUFBaUJ1RCxXQUFXaEQsSUFBNUIsRUFBa0M7QUFDOUIsb0JBQUc4QyxTQUFTOUMsSUFBVCxDQUFjUCxJQUFkLENBQUgsRUFBdUI7QUFDbkIsd0JBQUdxRCxTQUFTOUMsSUFBVCxDQUFjUCxJQUFkLElBQXNCdUQsV0FBV2hELElBQVgsQ0FBZ0JQLElBQWhCLENBQXpCLEVBQStDO0FBQzNDcUQsaUNBQVM5QyxJQUFULENBQWNQLElBQWQsSUFBc0J1RCxXQUFXaEQsSUFBWCxDQUFnQlAsSUFBaEIsQ0FBdEI7QUFDSDtBQUNKLGlCQUpELE1BSUs7QUFDRHFELDZCQUFTOUMsSUFBVCxDQUFjUCxJQUFkLElBQXNCdUQsV0FBV2hELElBQVgsQ0FBZ0JQLElBQWhCLENBQXRCO0FBQ0g7QUFDSjs7QUFFRDtBQUNBLGdCQUFHdUQsV0FBVzdDLEdBQWQsRUFBa0I7QUFDZCxxQkFBSyxJQUFJckUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJa0gsV0FBVzdDLEdBQVgsQ0FBZXZHLE1BQW5DLEVBQTJDa0MsR0FBM0MsRUFBZ0Q7QUFDNUMsd0JBQUdnSCxTQUFTM0MsR0FBWixFQUFnQjtBQUNaLDRCQUFHLENBQUMyQyxTQUFTM0MsR0FBVCxDQUFhOEMsUUFBYixDQUFzQkQsV0FBVzdDLEdBQVgsQ0FBZXJFLENBQWYsQ0FBdEIsQ0FBSixFQUE2QztBQUN6Q2dILHFDQUFTM0MsR0FBVCxDQUFhM0MsSUFBYixDQUFrQndGLFdBQVc3QyxHQUFYLENBQWVyRSxDQUFmLENBQWxCO0FBQ0g7QUFDSixxQkFKRCxNQUlLO0FBQ0RnSCxpQ0FBUzNDLEdBQVQsR0FBZTZDLFdBQVc3QyxHQUExQjtBQUNIO0FBQ0o7QUFDSjs7QUFFRDtBQUNBLGdCQUFHLENBQUMyQyxTQUFTNUMsR0FBYixFQUFpQjtBQUNiLG9CQUFHOEMsV0FBVzlDLEdBQWQsRUFBa0I7QUFDZDRDLDZCQUFTNUMsR0FBVCxHQUFlOEMsV0FBVzlDLEdBQTFCO0FBQ0g7QUFDSjs7QUFFRCxtQkFBTyxLQUFLbEYsSUFBTCxDQUFVMkQsU0FBVixDQUFvQm9FLEdBQXBCLENBQVA7QUFDQSxnQkFBRyxLQUFLL0gsSUFBTCxDQUFVb0UsUUFBVixDQUFtQjJELEdBQW5CLENBQUgsRUFBMkI7QUFDdkIsdUJBQU8sS0FBSy9ILElBQUwsQ0FBVW9FLFFBQVYsQ0FBbUIyRCxHQUFuQixDQUFQO0FBQ0g7QUFDSjtBQUNERCxpQkFBUzdNLElBQVQsQ0FBYzRKLEVBQWQsR0FBbUIxSixFQUFFLFVBQUYsRUFBY3FCLEdBQWQsRUFBbkI7QUFDQXNMLGlCQUFTN00sSUFBVCxDQUFjNkosRUFBZCxHQUFtQjNKLEVBQUUsVUFBRixFQUFjcUIsR0FBZCxFQUFuQjs7QUFFQSxlQUFPc0wsU0FBU3hDLE9BQWhCOztBQUVBLGFBQUt0RixJQUFMLENBQVVvRSxRQUFWLENBQW1CakosRUFBRSxnQkFBRixFQUFvQnFDLElBQXBCLENBQXlCLElBQXpCLENBQW5CLElBQXFELEtBQUt3QyxJQUFMLENBQVUyRCxTQUFWLENBQW9CeEksRUFBRSxnQkFBRixFQUFvQnFDLElBQXBCLENBQXlCLElBQXpCLENBQXBCLENBQXJEO0FBQ0EsZUFBTyxLQUFLd0MsSUFBTCxDQUFVMkQsU0FBVixDQUFvQnhJLEVBQUUsZ0JBQUYsRUFBb0JxQyxJQUFwQixDQUF5QixJQUF6QixDQUFwQixDQUFQOztBQUVBN0IsaUJBQVNRLFFBQVQsR0FBb0JDLEdBQXBCLENBQXdCLFlBQVV0QixJQUFWLEdBQWUsUUFBdkMsRUFBaURvTixNQUFqRCxDQUF3RCxLQUFLbEksSUFBN0Q7O0FBR0EsWUFBR21JLE9BQU9DLElBQVAsQ0FBWSxLQUFLcEksSUFBTCxDQUFVMkQsU0FBdEIsRUFBaUMvRSxNQUFqQyxHQUF3QyxDQUEzQyxFQUE2QztBQUN6QyxpQkFBS3lKLE9BQUw7QUFDSCxTQUZELE1BRUs7QUFDRDFNLHFCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixZQUFVdEIsSUFBVixHQUFlLGVBQXZDLEVBQXdEMkgsR0FBeEQsQ0FBNEQsV0FBNUQ7QUFDQTlHLHFCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixZQUFVdEIsSUFBVixHQUFlLGtCQUF2QyxFQUEyRHVILE1BQTNEO0FBQ0F5RCxrQkFBTSxxQ0FBTjtBQUNBd0MsdUJBQVcsWUFBWTtBQUNuQjFLLHlCQUFTQyxNQUFUO0FBQ0gsYUFGRCxFQUVHLElBRkg7QUFHSDtBQUNKLEtBdkZlOztBQXlGaEJ0QyxVQUFNLGNBQVN5RSxJQUFULEVBQWM7QUFDaEIsYUFBS0EsSUFBTCxHQUFZQSxJQUFaOztBQUVBLFlBQUkzQixPQUFPLElBQVg7O0FBRUFsRCxVQUFFLGFBQUYsRUFBaUJHLFFBQWpCLENBQTBCLGFBQTFCO0FBQ0FILFVBQUUscUJBQUYsRUFBeUJFLFdBQXpCLENBQXFDLGFBQXJDO0FBQ0FGLFVBQUUsaUJBQUYsRUFBcUJvQyxJQUFyQixDQUEwQixTQUExQjs7QUFFQSxhQUFLZ0ssR0FBTCxHQUFXLElBQUlnQixPQUFPQyxJQUFQLENBQVlDLEdBQWhCLENBQW9Cak4sU0FBU2tOLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBcEIsRUFBb0Q7QUFDM0RDLG9CQUFRLEVBQUUzQyxLQUFLLFFBQVAsRUFBaUJFLEtBQUssQ0FBQyxRQUF2QixFQURtRDtBQUUzRDBDLGtCQUFNLEVBRnFEO0FBRzNEQyw0QkFBZ0IsS0FIMkM7QUFJM0RDLDBCQUFjLElBSjZDO0FBSzNEQywrQkFBbUI7QUFMd0MsU0FBcEQsQ0FBWDs7QUFRQSxhQUFLeEIsR0FBTCxDQUFTeUIsV0FBVCxDQUFxQixPQUFyQixFQUE4QixVQUFTdEosQ0FBVCxFQUFXO0FBQ3JDckIsaUJBQUs0SyxnQkFBTCxDQUFzQnZKLENBQXRCO0FBQ0gsU0FGRDs7QUFJQSxhQUFLMkksT0FBTDtBQUNBLGFBQUsvSSxRQUFMO0FBQ0gsS0FoSGU7O0FBa0hoQjJKLHNCQUFrQiwwQkFBU3ZKLENBQVQsRUFBVztBQUN6QnZFLFVBQUUsc0JBQUYsRUFBMEJvQyxJQUExQixDQUErQm1DLEVBQUV3SixNQUFGLENBQVNsRCxHQUFULEtBQWUsR0FBZixHQUFtQnRHLEVBQUV3SixNQUFGLENBQVNoRCxHQUFULEVBQWxEOztBQUVBLGFBQUtzQixNQUFMLENBQVlDLEtBQVosQ0FBa0IwQixNQUFsQixDQUF5QixJQUF6QjtBQUNBLGFBQUszQixNQUFMLENBQVlDLEtBQVosR0FBb0IsSUFBSWMsT0FBT0MsSUFBUCxDQUFZWSxNQUFoQixDQUF1QjtBQUN2Q0Msc0JBQVUzSixFQUFFd0osTUFEMkI7QUFFdkMzQixpQkFBSyxLQUFLQTtBQUY2QixTQUF2QixDQUFwQjtBQUlILEtBMUhlOztBQTRIaEJjLGFBQVMsbUJBQVU7QUFDZixZQUFJckksT0FBTyxLQUFLQSxJQUFMLENBQVUyRCxTQUFyQjtBQUNBLFlBQUlwRixNQUFNLEVBQVY7QUFDQTs7QUFFQSxZQUFJNkosT0FBT0QsT0FBT0MsSUFBUCxDQUFZcEksSUFBWixDQUFYO0FBQ0EsYUFBSzJILE1BQUwsR0FBY1MsS0FBS3hKLE1BQW5CO0FBQ0EsWUFBSTZFLE9BQU96RCxLQUFLb0ksS0FBSyxDQUFMLENBQUwsQ0FBWDtBQUNBak4sVUFBRSxnQkFBRixFQUFvQnFDLElBQXBCLENBQXlCLElBQXpCLEVBQStCNEssS0FBSyxDQUFMLENBQS9COztBQUVBL0UsZ0JBQVFDLEdBQVIsQ0FBWUcsSUFBWjtBQUNBO0FBQ0EsWUFBR0EsS0FBS3hJLElBQUwsQ0FBVTRKLEVBQVYsQ0FBYWpHLE1BQWIsR0FBb0IsQ0FBdkIsRUFBeUI7QUFDckJMLG1CQUFLLDZDQUE0Q2tGLEtBQUt4SSxJQUFMLENBQVU0SixFQUF0RCxHQUEwRCxNQUEvRDtBQUNILFNBRkQsTUFFSztBQUNEdEcsbUJBQUssNkNBQTRDa0YsS0FBS3hJLElBQUwsQ0FBVTZKLEVBQXRELEdBQTBELE1BQS9EO0FBQ0g7QUFDRHZHLGVBQUssOEJBQUw7QUFDQUEsZUFBUSxvQ0FBUjtBQUNBQSxlQUFXLDZCQUFYO0FBQ0FBLGVBQWEsc0NBQWI7QUFDQUEsZUFBYyx1REFBcURrRixLQUFLeEksSUFBTCxDQUFVNEosRUFBL0QsR0FBa0UsSUFBaEY7QUFDQXRHLGVBQVcsUUFBWDtBQUNBQSxlQUFXLDZCQUFYO0FBQ0FBLGVBQWMsc0NBQWQ7QUFDQUEsZUFBYyx1REFBcURrRixLQUFLeEksSUFBTCxDQUFVNkosRUFBL0QsR0FBa0UsSUFBaEY7QUFDQXZHLGVBQVUsUUFBVjtBQUNBQSxlQUFRLFFBQVI7QUFDQUEsZUFBUSxxQ0FBUjtBQUNBQSxlQUFLLFFBQUw7O0FBR0E7QUFDQWtGLGFBQUtzQixJQUFMLENBQVVpQixHQUFWLEdBQWdCdkMsS0FBS3NCLElBQUwsQ0FBVWlCLEdBQVYsR0FBYyxDQUE5QjtBQUNBdkMsYUFBS3NCLElBQUwsQ0FBVW1CLEdBQVYsR0FBZ0J6QyxLQUFLc0IsSUFBTCxDQUFVbUIsR0FBVixHQUFjLENBQTlCO0FBQ0EsYUFBS3NCLE1BQUwsQ0FBWUMsS0FBWixHQUFvQixJQUFJYyxPQUFPQyxJQUFQLENBQVlZLE1BQWhCLENBQXVCO0FBQ3ZDQyxzQkFBVTVGLEtBQUtzQixJQUR3QjtBQUV2Q3dDLGlCQUFLLEtBQUtBO0FBRjZCLFNBQXZCLENBQXBCO0FBSUEsYUFBS0EsR0FBTCxDQUFTK0IsS0FBVCxDQUFlN0YsS0FBS3NCLElBQXBCO0FBQ0F4RyxlQUFLLDZCQUFMO0FBQ0FBLGVBQVEsaUNBQVI7QUFDQUEsZUFBUSxvQ0FBbUNrRixLQUFLc0IsSUFBTCxDQUFVaUIsR0FBN0MsR0FBa0QsR0FBbEQsR0FBc0R2QyxLQUFLc0IsSUFBTCxDQUFVbUIsR0FBaEUsR0FBcUUsTUFBN0U7QUFDQTNILGVBQUssUUFBTDs7QUFFQXBELFVBQUUsZ0JBQUYsRUFBb0JvQyxJQUFwQixDQUF5QmdCLEdBQXpCOztBQUVBQSxjQUFJLEVBQUo7QUFDQSxZQUFJZ0wsTUFBTSxDQUFWOztBQUVBLGFBQUssSUFBSTNELEdBQVQsSUFBZ0JuQyxLQUFLNkIsT0FBckIsRUFBOEI7QUFDMUJpRTtBQUNBLGdCQUFJOUQsUUFBUWhDLEtBQUs2QixPQUFMLENBQWFNLEdBQWIsQ0FBWjs7QUFFQSxnQkFBSTRELFNBQVM7QUFDVHhELHFCQUFLUCxNQUFNVixJQUFOLENBQVdpQixHQUFYLEdBQWUsQ0FEWDtBQUVURSxxQkFBS1QsTUFBTVYsSUFBTixDQUFXbUIsR0FBWCxHQUFlO0FBRlgsYUFBYjtBQUlBLGdCQUFJdUQsVUFBVSxJQUFJbEIsT0FBT0MsSUFBUCxDQUFZWSxNQUFoQixDQUF1QjtBQUNqQ0MsMEJBQVNHLE1BRHdCO0FBRWpDakMscUJBQUssS0FBS0EsR0FGdUI7QUFHakNtQyx1QkFBT0gsSUFBSUksUUFBSjtBQUgwQixhQUF2QixDQUFkO0FBS0EsaUJBQUtuQyxNQUFMLENBQVlFLE1BQVosQ0FBbUJsRixJQUFuQixDQUF3QmlILE9BQXhCOztBQUVBO0FBQ0EsZ0JBQUd0TyxFQUFFLFVBQUYsRUFBY3FCLEdBQWQsR0FBb0JvQyxNQUFwQixLQUErQixDQUFsQyxFQUFvQztBQUNoQ3pELGtCQUFFLFVBQUYsRUFBY3FCLEdBQWQsQ0FBa0JpSixNQUFNeEssSUFBTixDQUFXNEosRUFBN0I7QUFDSDtBQUNELGdCQUFHMUosRUFBRSxVQUFGLEVBQWNxQixHQUFkLEdBQW9Cb0MsTUFBcEIsS0FBK0IsQ0FBbEMsRUFBb0M7QUFDaEN6RCxrQkFBRSxVQUFGLEVBQWNxQixHQUFkLENBQWtCaUosTUFBTXhLLElBQU4sQ0FBVzZKLEVBQTdCO0FBQ0g7O0FBRUR2RyxtQkFBSyxvQ0FBTDtBQUNBQSxtQkFBUSx3Q0FBc0NnTCxHQUF0QyxHQUEwQyxNQUFsRDtBQUNBaEwsbUJBQVEsOENBQTRDcUgsR0FBNUMsR0FBZ0QsVUFBeEQ7QUFDQXJILG1CQUFRLHNDQUFvQ2tILE1BQU14SyxJQUFOLENBQVc0SixFQUEvQyxHQUFrRCxHQUFsRCxHQUFzRFksTUFBTXhLLElBQU4sQ0FBVzZKLEVBQWpFLEdBQW9FLE1BQTVFO0FBQ0F2RyxtQkFBSyxRQUFMO0FBQ0g7O0FBRURwRCxVQUFFLGtCQUFGLEVBQXNCb0MsSUFBdEIsQ0FBMkJnQixHQUEzQjtBQUNIO0FBN01lLENBQXBCOztrQkFnTmUrSSxhOzs7Ozs7Ozs7Ozs7QUNoTmYsSUFBSXNDLFNBQVM7QUFDVDVKLFVBQUssRUFESTs7QUFHVFYsY0FBVSxvQkFBVTtBQUNoQixZQUFJakIsT0FBTyxJQUFYOztBQUVBbEQsVUFBRSxpQkFBRixFQUFxQnVELEVBQXJCLENBQXdCLE9BQXhCLEVBQWlDLGNBQWpDLEVBQWlELFlBQVU7QUFDdkRMLGlCQUFLd0wsS0FBTCxDQUFXMU8sRUFBRSxJQUFGLENBQVg7QUFDSCxTQUZEO0FBR0FBLFVBQUUsNEJBQUYsRUFBZ0NDLEtBQWhDLENBQXNDLFlBQVU7QUFDNUNpRCxpQkFBS3lMLEtBQUw7QUFDSCxTQUZEO0FBR0EzTyxVQUFFLDZCQUFGLEVBQWlDQyxLQUFqQyxDQUF1QyxZQUFVO0FBQzdDaUQsaUJBQUswTCxTQUFMO0FBQ0gsU0FGRDtBQUlILEtBaEJROztBQWtCVEEsZUFBVyxxQkFBVTtBQUNqQixZQUFHdE0sUUFBUSxRQUFSLENBQUgsRUFBcUI7QUFDakIsaUJBQUssSUFBSTZDLElBQUksQ0FBYixFQUFnQkEsSUFBSW5GLEVBQUUsdUJBQUYsRUFBMkJ5RCxNQUEvQyxFQUF1RDBCLEdBQXZELEVBQTREO0FBQ3hELG9CQUFJeUgsTUFBTTVNLEVBQUUsdUJBQUYsRUFBMkJ5RixFQUEzQixDQUE4Qk4sQ0FBOUIsRUFBaUN3QyxNQUFqQyxHQUEwQ3RGLElBQTFDLENBQStDLElBQS9DLENBQVY7QUFDQSx1QkFBTyxLQUFLd0MsSUFBTCxDQUFVK0gsR0FBVixDQUFQO0FBQ0g7QUFDRDVNLGNBQUUscUJBQUYsRUFBeUJHLFFBQXpCLENBQWtDLGFBQWxDO0FBQ0FLLHFCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixZQUFVakIsRUFBRSxXQUFGLEVBQWVxQyxJQUFmLENBQW9CLElBQXBCLENBQVYsR0FBb0MsaUJBQTVELEVBQStFaUYsR0FBL0UsQ0FBbUYsS0FBS3pDLElBQXhGO0FBQ0EsaUJBQUtnRixJQUFMO0FBQ0g7QUFFSixLQTdCUTs7QUErQlQ4RSxXQUFPLGlCQUFVO0FBQ2IsWUFBRzNPLEVBQUUsdUJBQUYsRUFBMkJ5RCxNQUEzQixHQUFrQyxDQUFyQyxFQUF1QztBQUNuQyxnQkFBSWdILE1BQU16SyxFQUFFLHVCQUFGLEVBQTJCeUYsRUFBM0IsQ0FBOEIsQ0FBOUIsRUFBaUNrQyxNQUFqQyxHQUEwQ3RGLElBQTFDLENBQStDLElBQS9DLENBQVY7QUFDQSxnQkFBSXNLLFdBQVcsS0FBSzlILElBQUwsQ0FBVTRGLEdBQVYsQ0FBZjs7QUFFQSxpQkFBSyxJQUFJdEYsSUFBSSxDQUFiLEVBQWdCQSxJQUFJbkYsRUFBRSx1QkFBRixFQUEyQnlELE1BQS9DLEVBQXVEMEIsR0FBdkQsRUFBNEQ7QUFDeEQsb0JBQUl5SCxNQUFNNU0sRUFBRSx1QkFBRixFQUEyQnlGLEVBQTNCLENBQThCTixDQUE5QixFQUFpQ3dDLE1BQWpDLEdBQTBDdEYsSUFBMUMsQ0FBK0MsSUFBL0MsQ0FBVjtBQUNBLG9CQUFJd0ssYUFBYSxLQUFLaEksSUFBTCxDQUFVK0gsR0FBVixDQUFqQjs7QUFFQTtBQUNBLHFCQUFLLElBQUl0RCxJQUFULElBQWlCdUQsV0FBV2hELElBQTVCLEVBQWtDO0FBQzlCLHdCQUFHOEMsU0FBUzlDLElBQVQsQ0FBY1AsSUFBZCxDQUFILEVBQXVCO0FBQ25CLDRCQUFHcUQsU0FBUzlDLElBQVQsQ0FBY1AsSUFBZCxJQUFzQnVELFdBQVdoRCxJQUFYLENBQWdCUCxJQUFoQixDQUF6QixFQUErQztBQUMzQ3FELHFDQUFTOUMsSUFBVCxDQUFjUCxJQUFkLElBQXNCdUQsV0FBV2hELElBQVgsQ0FBZ0JQLElBQWhCLENBQXRCO0FBQ0g7QUFDSixxQkFKRCxNQUlLO0FBQ0RxRCxpQ0FBUzlDLElBQVQsQ0FBY1AsSUFBZCxJQUFzQnVELFdBQVdoRCxJQUFYLENBQWdCUCxJQUFoQixDQUF0QjtBQUNIO0FBQ0o7O0FBRUQ7QUFDQSxvQkFBR3VELFdBQVc3QyxHQUFkLEVBQWtCO0FBQ2QseUJBQUssSUFBSXJFLElBQUksQ0FBYixFQUFnQkEsSUFBSWtILFdBQVc3QyxHQUFYLENBQWV2RyxNQUFuQyxFQUEyQ2tDLEdBQTNDLEVBQWdEO0FBQzVDLDRCQUFHZ0gsU0FBUzNDLEdBQVosRUFBZ0I7QUFDWixnQ0FBRyxDQUFDMkMsU0FBUzNDLEdBQVQsQ0FBYThDLFFBQWIsQ0FBc0JELFdBQVc3QyxHQUFYLENBQWVyRSxDQUFmLENBQXRCLENBQUosRUFBNkM7QUFDekNnSCx5Q0FBUzNDLEdBQVQsQ0FBYTNDLElBQWIsQ0FBa0J3RixXQUFXN0MsR0FBWCxDQUFlckUsQ0FBZixDQUFsQjtBQUNIO0FBQ0oseUJBSkQsTUFJSztBQUNEZ0gscUNBQVMzQyxHQUFULEdBQWU2QyxXQUFXN0MsR0FBMUI7QUFDSDtBQUNKO0FBQ0o7O0FBRUQ7QUFDQSxvQkFBRyxDQUFDMkMsU0FBUzVDLEdBQWIsRUFBaUI7QUFDYix3QkFBRzhDLFdBQVc5QyxHQUFkLEVBQWtCO0FBQ2Q0QyxpQ0FBUzVDLEdBQVQsR0FBZThDLFdBQVc5QyxHQUExQjtBQUNIO0FBQ0o7O0FBRUQsdUJBQU8sS0FBS2xGLElBQUwsQ0FBVStILEdBQVYsQ0FBUDs7QUFFQSxvQkFBR3RLLFFBQVEsUUFBUixDQUFILEVBQXFCO0FBQ2pCdEMsc0JBQUUscUJBQUYsRUFBeUJHLFFBQXpCLENBQWtDLGFBQWxDO0FBQ0FLLDZCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixZQUFVakIsRUFBRSxXQUFGLEVBQWVxQyxJQUFmLENBQW9CLElBQXBCLENBQVYsR0FBb0MsaUJBQTVELEVBQStFaUYsR0FBL0UsQ0FBbUYsS0FBS3pDLElBQXhGO0FBQ0EseUJBQUtnRixJQUFMO0FBQ0g7QUFDSjtBQUNKLFNBL0NELE1BK0NLO0FBQ0RjLGtCQUFNLGdCQUFOO0FBQ0g7QUFDSixLQWxGUTs7QUFvRlQrRCxXQUFPLGVBQVNHLEdBQVQsRUFBYTtBQUNoQkEsWUFBSXBDLFdBQUosQ0FBZ0IsVUFBaEI7QUFDQSxZQUFJaEMsTUFBTW9FLElBQUlsSCxNQUFKLEdBQWF0RixJQUFiLENBQWtCLElBQWxCLENBQVY7O0FBRUEsWUFBR3JDLEVBQUUsdUJBQUYsRUFBMkJ5RCxNQUEzQixHQUFrQyxDQUFyQyxFQUF1QztBQUNuQ3pELGNBQUUscUJBQUYsRUFBeUJFLFdBQXpCLENBQXFDLGFBQXJDO0FBQ0gsU0FGRCxNQUVLO0FBQ0RGLGNBQUUscUJBQUYsRUFBeUJHLFFBQXpCLENBQWtDLGFBQWxDO0FBQ0g7QUFDSixLQTdGUTs7QUErRlQwSixVQUFNLGdCQUFVO0FBQ1osWUFBSWlGLFNBQVM7QUFDVEMsc0JBQVUsR0FERCxFQUNPO0FBQ2hCQyxzQkFBUyxDQUFDLEdBRkQsRUFFTztBQUNoQkMsc0JBQVMsQ0FBQyxHQUhELEVBR007QUFDZkMsbUJBQU0sR0FKRyxDQUlFO0FBSkYsU0FBYjtBQU1BLFlBQUlDLFlBQVksRUFBaEI7QUFDQWpILGdCQUFRQyxHQUFSLENBQVksS0FBS3RELElBQWpCOztBQUVBLGFBQUssSUFBSTRGLEdBQVQsSUFBZ0IsS0FBSzVGLElBQXJCLEVBQTJCO0FBQ3ZCLGdCQUFJeUQsT0FBTyxLQUFLekQsSUFBTCxDQUFVNEYsR0FBVixDQUFYO0FBQ0FuQyxpQkFBS21DLEdBQUwsR0FBV0EsR0FBWDtBQUNBLGdCQUFJMkUsVUFBVXBDLE9BQU9DLElBQVAsQ0FBWTNFLEtBQUt1QixJQUFqQixFQUF1QnBHLE1BQXJDLENBSHVCLENBR3NCO0FBQzdDLGdCQUFJNEwsUUFBUSxDQUFaO0FBQ0EsZ0JBQUlDLE1BQU0sQ0FBVjtBQUNBLGdCQUFJQyxXQUFXdkMsT0FBT0MsSUFBUCxDQUFZLEtBQUtwSSxJQUFqQixFQUF1QnBCLE1BQXZCLEdBQWdDLEVBQS9DLENBTnVCLENBTTJCOztBQUVsRCxpQkFBSyxJQUFJNkYsSUFBVCxJQUFpQmhCLEtBQUt1QixJQUF0QixFQUE0QjtBQUN4QixvQkFBRzBGLFdBQVNqSCxLQUFLdUIsSUFBTCxDQUFVUCxJQUFWLENBQVosRUFBNEI7QUFDeEJpRywrQkFBV2pILEtBQUt1QixJQUFMLENBQVVQLElBQVYsQ0FBWCxDQUR3QixDQUNHO0FBQzlCO0FBQ0Qsb0JBQUdoQixLQUFLdUIsSUFBTCxDQUFVUCxJQUFWLElBQWdCMEQsT0FBT0MsSUFBUCxDQUFZLEtBQUtwSSxJQUFqQixFQUF1QnBCLE1BQTFDLEVBQWlEO0FBQzdDO0FBQ0E0TCw2QkFBU1AsT0FBT0MsUUFBUCxHQUFrQnpHLEtBQUt1QixJQUFMLENBQVVQLElBQVYsQ0FBM0I7QUFDQWdHLDJCQUFPUixPQUFPQyxRQUFQLEdBQWtCekcsS0FBS3VCLElBQUwsQ0FBVVAsSUFBVixDQUF6QjtBQUNILGlCQUpELE1BSUs7QUFDRCx3QkFBRzhGLFVBQVEsQ0FBWCxFQUFhO0FBQ1RBO0FBQ0g7QUFDSjtBQUNKO0FBQ0RDLHFCQUFRRSxXQUFTLENBQWpCO0FBQ0FELGtCQUFNQSxNQUFNRixPQUFaOztBQUVBQyxxQkFBUUMsTUFBSSxFQUFaOztBQUVBLGdCQUFHRixZQUFZLENBQWYsRUFBaUI7QUFDYkMseUJBQVNQLE9BQU9FLFFBQWhCO0FBQ0Esb0JBQUcxRyxLQUFLdUIsSUFBTCxDQUFVMkIsRUFBYixFQUFnQjtBQUNaNkQsNkJBQVFQLE9BQU9JLEtBQWY7QUFDSDtBQUNKO0FBQ0QsZ0JBQUdFLFlBQVksQ0FBZixFQUFpQjtBQUNiQyx5QkFBU1AsT0FBT0csUUFBaEI7QUFDSDs7QUFFREUsc0JBQVU5SCxJQUFWLENBQWUsRUFBQ29ELEtBQUlBLEdBQUwsRUFBUzRFLE9BQU1BLEtBQWYsRUFBZjtBQUNIOztBQUVERixrQkFBVUssSUFBVixDQUFlLFVBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFjO0FBQ3pCLG1CQUFPRCxFQUFFSixLQUFGLEdBQVVLLEVBQUVMLEtBQVosR0FBb0IsQ0FBQyxDQUFyQixHQUF5QkksRUFBRUosS0FBRixHQUFVSyxFQUFFTCxLQUFaLEdBQW9CLENBQXBCLEdBQXdCLENBQXhEO0FBQ0gsU0FGRDtBQUdBLFlBQUlqTSxNQUFNLEVBQVY7O0FBRUEsWUFBSXVNLFlBQVksRUFBaEI7O0FBRUEsYUFBSyxJQUFJeEssSUFBSSxDQUFiLEVBQWdCQSxJQUFJZ0ssVUFBVTFMLE1BQTlCLEVBQXNDMEIsR0FBdEMsRUFBMkM7QUFDdkMsZ0JBQUlOLE9BQU8sS0FBS0EsSUFBaEI7O0FBRUE4SyxzQkFBVXRJLElBQVYsQ0FBZSxLQUFLeEMsSUFBTCxDQUFVc0ssVUFBVWhLLENBQVYsRUFBYXNGLEdBQXZCLENBQWY7O0FBRUEsZ0JBQUlBLE9BQU0wRSxVQUFVaEssQ0FBVixFQUFhc0YsR0FBdkI7QUFDQSxnQkFBSVYsTUFBTSxFQUFWO0FBQ0EsZ0JBQUdsRixLQUFLNEYsSUFBTCxFQUFVVixHQUFiLEVBQWlCO0FBQ2JBLHNCQUFNbEYsS0FBSzRGLElBQUwsRUFBVVYsR0FBaEI7QUFDSDtBQUNELGdCQUFJNkYsVUFBVTtBQUNWckUsb0JBQUcsRUFETztBQUVWQyxvQkFBRyxFQUZPO0FBR1ZFLG9CQUFHLEVBSE87QUFJVkQsb0JBQUc7QUFKTyxhQUFkO0FBTUEsaUJBQUssSUFBSW5DLElBQVQsSUFBaUJ6RSxLQUFLNEYsSUFBTCxFQUFVWixJQUEzQixFQUFpQztBQUM3QitGLHdCQUFRdEcsSUFBUixJQUFnQnpFLEtBQUs0RixJQUFMLEVBQVVaLElBQVYsQ0FBZVAsSUFBZixDQUFoQjtBQUNIO0FBQ0RsRyxtQkFBSyxpQ0FBK0JxSCxJQUEvQixHQUFtQyxJQUF4QztBQUNBckgsbUJBQVEsNkJBQTJCK0IsSUFBRSxDQUE3QixJQUFnQyxNQUF4QztBQUNBL0IsbUJBQVEsdUNBQXFDeUIsS0FBSzRGLElBQUwsRUFBVTNLLElBQVYsQ0FBZTRKLEVBQXBELEdBQXVELElBQXZELEdBQTREN0UsS0FBSzRGLElBQUwsRUFBVTNLLElBQVYsQ0FBZTZKLEVBQTNFLEdBQThFLElBQXRGO0FBQ0F2RyxtQkFBUSxzQ0FBb0MyRyxHQUFwQyxHQUF3QyxJQUFoRDtBQUNBM0csbUJBQVEsMEJBQXdCd00sUUFBUXJFLEVBQWhDLEdBQW1DLE1BQTNDO0FBQ0FuSSxtQkFBUSwwQkFBd0J3TSxRQUFRcEUsRUFBaEMsR0FBbUMsTUFBM0M7QUFDQXBJLG1CQUFRLDBCQUF3QndNLFFBQVFsRSxFQUFoQyxHQUFtQyxNQUEzQztBQUNBdEksbUJBQVEsMEJBQXdCd00sUUFBUW5FLEVBQWhDLEdBQW1DLE1BQTNDO0FBQ0FySSxtQkFBUSx5Q0FBUjtBQUNBQSxtQkFBUSw2Q0FBUjtBQUNBQSxtQkFBSyxRQUFMO0FBQ0g7QUFDRHBELFVBQUUsaUJBQUYsRUFBcUJvQyxJQUFyQixDQUEwQmdCLEdBQTFCOztBQUVBNUMsaUJBQVNRLFFBQVQsR0FBb0JDLEdBQXBCLENBQXdCLFlBQVVqQixFQUFFLFdBQUYsRUFBZXFDLElBQWYsQ0FBb0IsSUFBcEIsQ0FBVixHQUFvQyxlQUE1RCxFQUE2RWlGLEdBQTdFLENBQWlGcUksU0FBakY7QUFDQXpILGdCQUFRQyxHQUFSLENBQVl3SCxTQUFaO0FBQ0gsS0EzTFE7O0FBNkxUdlAsVUFBTSxjQUFTeUUsSUFBVCxFQUFjO0FBQ2hCLGFBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtWLFFBQUw7O0FBRUFuRSxVQUFFLGFBQUYsRUFBaUJHLFFBQWpCLENBQTBCLGFBQTFCO0FBQ0FILFVBQUUsdUJBQUYsRUFBMkJFLFdBQTNCLENBQXVDLGFBQXZDO0FBQ0FGLFVBQUUsaUJBQUYsRUFBcUJvQyxJQUFyQixDQUEwQixXQUExQjs7QUFFQSxZQUFHLENBQUN5QyxLQUFLZ0wsTUFBVCxFQUFnQjtBQUNaLGlCQUFLaEcsSUFBTCxHQURZLENBQ0E7QUFDWjNCLG9CQUFRQyxHQUFSLENBQVksT0FBWjtBQUNILFNBSEQsTUFHSztBQUNERCxvQkFBUUMsR0FBUixDQUFZdEQsS0FBS2dMLE1BQWpCO0FBQ0g7QUFFSjtBQTVNUSxDQUFiOztrQkErTWVwQixNOzs7Ozs7Ozs7Ozs7QUMvTWYsSUFBSXFCLFFBQVE7QUFDUmpMLFVBQU0sRUFERTtBQUVSbEYsVUFBTSxFQUZFO0FBR1JvUSxjQUFVLEVBSEY7O0FBS1IzUCxVQUFNLGNBQVN5RSxJQUFULEVBQWU2QyxHQUFmLEVBQW9CNUgsSUFBcEIsRUFBeUI7QUFDM0JFLFVBQUUsV0FBRixFQUFlb0MsSUFBZixDQUFvQnRDLElBQXBCLEVBQTBCdUMsSUFBMUIsQ0FBK0IsSUFBL0IsRUFBcUNxRixHQUFyQztBQUNBMUgsVUFBRSxlQUFGLEVBQW1CRyxRQUFuQixDQUE0QixhQUE1QjtBQUNBSCxVQUFFLFFBQUYsRUFBWUUsV0FBWixDQUF3QixhQUF4QjtBQUNBLGFBQUsyRSxJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFLbEYsSUFBTCxHQUFZK0gsR0FBWjtBQUNBLGFBQUtxSSxRQUFMLEdBQWdCalEsSUFBaEI7QUFDQW9JLGdCQUFRQyxHQUFSLENBQVl0RCxJQUFaOztBQUVBLGFBQUt3SyxLQUFMO0FBQ0E7QUFDSCxLQWhCTzs7QUFrQlJBLFdBQU8saUJBQVU7QUFDYixZQUFJOUcsU0FBUyxLQUFiOztBQUVBLFlBQUcsS0FBSzFELElBQUwsQ0FBVTBELE1BQWIsRUFBb0I7QUFDaEIsZ0JBQUcsQ0FBQyxLQUFLMUQsSUFBTCxDQUFVMEQsTUFBVixDQUFpQkgsTUFBckIsRUFBNEI7QUFDeEI7QUFDQSxxQkFBS3ZELElBQUwsQ0FBVTBELE1BQVYsQ0FBaUJILE1BQWpCLEdBQTBCO0FBQ3RCNEgsK0JBQVcsS0FEVztBQUV0QkMsNEJBQVEsS0FGYztBQUd0QkMsOEJBQVUsS0FIWTtBQUl0QkMsNkJBQVM7QUFKYSxpQkFBMUI7QUFNSDtBQUNKLFNBVkQsTUFVSztBQUNEO0FBQ0EsaUJBQUt0TCxJQUFMLENBQVUwRCxNQUFWLEdBQW1CO0FBQ2ZILHdCQUFPO0FBQ0g0SCwrQkFBVyxLQURSO0FBRUhDLDRCQUFRLEtBRkw7QUFHSEMsOEJBQVUsS0FIUDtBQUlIQyw2QkFBUztBQUpOO0FBRFEsYUFBbkI7QUFRSDs7QUFFRDVILGlCQUFTLEtBQUsxRCxJQUFMLENBQVUwRCxNQUFWLENBQWlCSCxNQUExQjs7QUFFQTtBQUNBLFlBQUdHLE9BQU95SCxTQUFWLEVBQW9CO0FBQ2hCaFEsY0FBRSxtQkFBRixFQUF1Qm9DLElBQXZCLENBQTRCLFlBQTVCO0FBQ0gsU0FGRCxNQUVLO0FBQ0QsZ0JBQUcsS0FBS3lDLElBQUwsQ0FBVWtELEtBQVYsSUFBaUIsS0FBS2xELElBQUwsQ0FBVXVMLFNBQTlCLEVBQXdDO0FBQ3BDcFEsa0JBQUUsbUJBQUYsRUFBdUJvQyxJQUF2QixDQUE0Qiw0QkFBNUI7QUFDQSxxQkFBS2lPLGVBQUw7QUFDSCxhQUhELE1BR0s7QUFDRHJRLGtCQUFFLG1CQUFGLEVBQXVCb0MsSUFBdkIsQ0FBNEIsbURBQTVCO0FBQ0g7QUFDSjs7QUFFRCxZQUFHbUcsT0FBTzBILE1BQVYsRUFBaUI7QUFDYmpRLGNBQUUsZ0JBQUYsRUFBb0JvQyxJQUFwQixDQUF5QixZQUF6QjtBQUNILFNBRkQsTUFFSztBQUNELGlCQUFLa08sWUFBTDtBQUNIOztBQUVELFlBQUcvSCxPQUFPMkgsUUFBVixFQUFtQixDQUVsQjtBQUNELFlBQUczSCxPQUFPNEgsT0FBVixFQUFrQixDQUVqQjtBQUNKLEtBckVPOztBQXVFUkcsa0JBQWMsd0JBQVU7QUFDcEIsWUFBSTNRLE9BQU8sS0FBS0EsSUFBaEI7QUFDQSxZQUFJNFEsYUFBYSxFQUFqQjs7QUFFQSxZQUFJQyxvQkFBb0IsQ0FBQyxPQUFELEVBQVMsT0FBVCxFQUFpQixPQUFqQixFQUF5QixVQUF6QixFQUFvQyxXQUFwQyxFQUFnRCxPQUFoRCxFQUF3RCxVQUF4RCxFQUFtRSxPQUFuRSxDQUF4QjtBQUNBLFlBQUlDLFlBQVksQ0FBQyxlQUFELEVBQWlCLGVBQWpCLEVBQWlDLFVBQWpDLEVBQTRDLFVBQTVDLEVBQXVELFdBQXZELEVBQW1FLE9BQW5FLEVBQTJFLFVBQTNFLEVBQXNGLFVBQXRGLENBQWhCO0FBQ0EsWUFBSUMsa0JBQWtCLENBQUMsc0JBQUQsRUFBd0Isc0JBQXhCLEVBQWdELHNCQUFoRCxFQUF3RSxlQUF4RSxFQUF3RixFQUF4RixFQUEyRixFQUEzRixFQUE4RixFQUE5RixFQUFpRyxFQUFqRyxDQUF0Qjs7QUFHQSxZQUFJQyxhQUFhLEVBQWpCOztBQUdBLGFBQUssSUFBSUMsR0FBVCxJQUFnQixLQUFLL0wsSUFBTCxDQUFVdUQsTUFBMUIsRUFBa0M7QUFDOUIsZ0JBQUl5SSxRQUFRLEtBQUtoTSxJQUFMLENBQVV1RCxNQUFWLENBQWlCd0ksR0FBakIsQ0FBWjs7QUFFQSxnQkFBSUUsV0FBVyxFQUFmOztBQUVBLGdCQUFJQyxXQUFXLEVBQWY7QUFDQSxnQkFBSTFCLFFBQVEsQ0FBWjs7QUFFQSxnQkFBSTJCLFdBQVcsS0FBS25NLElBQUwsQ0FBVTRELElBQVYsQ0FBZW9JLE1BQU1wSSxJQUFyQixFQUEyQjNJLElBQTFDO0FBQ0EsZ0JBQUltUixhQUFhLEtBQUtwTSxJQUFMLENBQVU0RCxJQUFWLENBQWVvSSxNQUFNcEksSUFBckIsRUFBMkJ3SCxNQUE1Qzs7QUFFQVoscUJBQVE0QixXQUFXNUIsS0FBWCxHQUFpQixDQUFqQixHQUFzQjRCLFdBQVdDLFdBQVgsR0FBdUIsQ0FBeEIsR0FBMkIsQ0FBeEQ7O0FBRUEsZ0JBQUk5TixNQUFNNE4sV0FBUyw2QkFBbkI7O0FBRUEsZ0JBQUdDLFdBQVc1QixLQUFYLEdBQWlCLENBQWpCLElBQW9CNEIsV0FBV0MsV0FBWCxHQUF1QixDQUE5QyxFQUFnRDtBQUM1QzlOLHVCQUFPb04sa0JBQWtCUyxXQUFXNUIsS0FBN0IsSUFBc0MsS0FBdEMsR0FBOENxQixnQkFBZ0JPLFdBQVdDLFdBQTNCLENBQXJEO0FBQ0gsYUFGRCxNQUVLO0FBQ0Q5Tix1QkFBT3FOLFVBQVVRLFdBQVc1QixLQUFyQixDQUFQO0FBQ0g7O0FBRUQwQixxQkFBUzFKLElBQVQsQ0FBY2pFLEdBQWQ7O0FBR0EsZ0JBQUkrTixlQUFlLEVBQUc7QUFDbEJDLHFCQUFJLENBRFcsRUFDUjtBQUNQOUksc0JBQUssQ0FGVTtBQUdmK0kseUJBQVEsQ0FITztBQUlmNUksc0JBQUs7QUFKVSxhQUFuQjs7QUFPQSxnQkFBR29JLE1BQU1wSSxJQUFOLEdBQVcsQ0FBWCxJQUFjb0ksTUFBTXBJLElBQU4sR0FBVyxDQUE1QixFQUE4QjtBQUMxQjBJLDZCQUFhMUksSUFBYixHQUFvQixJQUFwQjtBQUNILGFBRkQsTUFFTSxJQUFHb0ksTUFBTXBJLElBQU4sS0FBZSxFQUFsQixFQUFxQjtBQUN2QjBJLDZCQUFhMUksSUFBYixHQUFvQixJQUFwQjtBQUNIOztBQUVELGdCQUFJNkksVUFBVVQsTUFBTVUsS0FBTixDQUFZSCxHQUFaLENBQWdCLEVBQWhCLEVBQW9CM08sUUFBcEIsQ0FBNkI0TSxLQUEzQyxDQXJDOEIsQ0FxQ29COztBQUVsRCxnQkFBR2lDLFVBQVEsS0FBWCxFQUFpQjtBQUNiSCw2QkFBYUMsR0FBYixHQUFtQixDQUFuQjtBQUNILGFBRkQsTUFFTSxJQUFHRSxVQUFRLElBQVgsRUFBZ0I7QUFDbEJILDZCQUFhQyxHQUFiLEdBQW1CLENBQW5CO0FBQ0g7O0FBRUQvQixxQkFBU2pLLEtBQUtvTSxHQUFMLENBQVUsT0FBT0YsT0FBakIsRUFBMkIsQ0FBM0IsSUFBOEIsQ0FBdkM7O0FBRUFULGtCQUFNdkksSUFBTixHQUFhO0FBQ1RtSiwwQkFBVTtBQURELGFBQWI7QUFHQVosa0JBQU1VLEtBQU4sQ0FBWWpKLElBQVosR0FBbUIsRUFBbkI7QUFDQXVJLGtCQUFNVSxLQUFOLENBQVlGLE9BQVosR0FBc0IsRUFBdEI7O0FBRUEsaUJBQUssSUFBSWxNLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLTixJQUFMLENBQVV3RCxLQUFWLENBQWdCd0gsTUFBaEIsQ0FBdUJwTSxNQUEzQyxFQUFtRDBCLEdBQW5ELEVBQXdEO0FBQ3BELG9CQUFJbUQsT0FBTyxLQUFLekQsSUFBTCxDQUFVd0QsS0FBVixDQUFnQndILE1BQWhCLENBQXVCMUssQ0FBdkIsQ0FBWDs7QUFFQSxvQkFBR21ELEtBQUtvSixTQUFSLEVBQWtCO0FBQ2QseUJBQUssSUFBSS9MLElBQUksQ0FBYixFQUFnQkEsSUFBSTJDLEtBQUtvSixTQUFMLENBQWVqTyxNQUFuQyxFQUEyQ2tDLEdBQTNDLEVBQWdEO0FBQzVDLDRCQUFJWCxNQUFNd0YsYUFBYXFHLE1BQU1qSCxJQUFuQixFQUF5QnRCLEtBQUtvSixTQUFMLENBQWUvTCxDQUFmLENBQXpCLENBQVY7QUFDQSw0QkFBR1gsTUFBTSxHQUFULEVBQWE7QUFDVDZMLGtDQUFNdkksSUFBTixDQUFXbUosUUFBWCxDQUFvQnBLLElBQXBCLENBQXlCO0FBQ3JCd0Msc0NBQUsxRSxDQURnQjtBQUVyQnNGLHFDQUFJbkMsS0FBS21DO0FBRlksNkJBQXpCO0FBSUEsZ0NBQUd6RixNQUFJLEdBQVAsRUFBVztBQUNQLG9DQUFHbU0sYUFBYTdJLElBQWIsS0FBc0IsQ0FBekIsRUFBMkI7QUFDdkI2SSxpREFBYTdJLElBQWIsR0FBb0IsQ0FBcEI7QUFDSDtBQUNKOztBQUVELGdDQUFHdEQsTUFBTSxFQUFULEVBQVk7QUFDUjZMLHNDQUFNVSxLQUFOLENBQVlqSixJQUFaLENBQWlCakIsSUFBakIsQ0FBc0JpQixJQUF0QjtBQUNBNkksNkNBQWE3SSxJQUFiLEdBQW9CLENBQXBCO0FBQ0g7QUFDSjtBQUNKO0FBQ0osaUJBcEJELE1Bb0JLO0FBQ0Qsd0JBQUl0RCxNQUFNd0YsYUFBYXFHLE1BQU1qSCxJQUFuQixFQUF5QnRCLEtBQUtzQixJQUE5QixDQUFWO0FBQ0Esd0JBQUc1RSxNQUFNLEdBQVQsRUFBYTtBQUNUNkwsOEJBQU12SSxJQUFOLENBQVdtSixRQUFYLENBQW9CcEssSUFBcEIsQ0FBeUI7QUFDckJ3QyxrQ0FBSzFFLENBRGdCO0FBRXJCc0YsaUNBQUluQyxLQUFLbUM7QUFGWSx5QkFBekI7QUFJQSw0QkFBR3pGLE1BQUksR0FBUCxFQUFXO0FBQ1AsZ0NBQUdtTSxhQUFhN0ksSUFBYixLQUFzQixDQUF6QixFQUEyQjtBQUN2QjZJLDZDQUFhN0ksSUFBYixHQUFvQixDQUFwQjtBQUNIOztBQUVEK0cscUNBQVMsQ0FBQyxNQUFNckssR0FBUCxJQUFZLEdBQXJCO0FBQ0g7O0FBRUQsNEJBQUdBLE1BQU0sR0FBVCxFQUFhO0FBQ1Q2TCxrQ0FBTVUsS0FBTixDQUFZakosSUFBWixDQUFpQmpCLElBQWpCLENBQXNCaUIsSUFBdEI7QUFDQTZJLHlDQUFhN0ksSUFBYixHQUFvQixDQUFwQjtBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBQ0R1SSxrQkFBTVUsS0FBTixDQUFZRixPQUFaLEdBQXNCLEVBQXRCOztBQUVBUixrQkFBTVUsS0FBTixDQUFZSSxZQUFaLEdBQTJCO0FBQ3ZCQywwQkFBVTtBQURhLGFBQTNCO0FBR0EsaUJBQUssSUFBSTNKLElBQVQsSUFBaUI0SSxNQUFNZ0IsU0FBdkIsRUFBa0M7QUFDOUIsb0JBQUk5SixRQUFROEksTUFBTWdCLFNBQU4sQ0FBZ0I1SixJQUFoQixDQUFaOztBQUVBLG9CQUFHRixNQUFNNkosUUFBTixHQUFlZixNQUFNVSxLQUFOLENBQVlJLFlBQVosQ0FBeUJDLFFBQTNDLEVBQW9EO0FBQ2hEZiwwQkFBTVUsS0FBTixDQUFZSSxZQUFaLEdBQTJCNUosS0FBM0I7QUFDQThJLDBCQUFNVSxLQUFOLENBQVlJLFlBQVosQ0FBeUIxSixJQUF6QixHQUFnQ0EsSUFBaEM7QUFDSDtBQUNKOztBQUVELGlCQUFLLElBQUk5QyxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS04sSUFBTCxDQUFVME0sS0FBVixDQUFnQkEsS0FBaEIsQ0FBc0JGLE9BQXRCLENBQThCNU4sTUFBbEQsRUFBMEQwQixHQUExRCxFQUErRDtBQUMzRCxvQkFBSWtNLFVBQVUsS0FBS3hNLElBQUwsQ0FBVTBNLEtBQVYsQ0FBZ0JBLEtBQWhCLENBQXNCRixPQUF0QixDQUE4QmxNLENBQTlCLENBQWQ7QUFDQSxvQkFBSUgsTUFBTXdGLGFBQWFxRyxNQUFNakgsSUFBbkIsRUFBeUJ5SCxPQUF6QixDQUFWOztBQUVBLG9CQUFHck0sTUFBSSxHQUFQLEVBQVc7QUFDUDZMLDBCQUFNVSxLQUFOLENBQVlGLE9BQVosQ0FBb0JoSyxJQUFwQixDQUF5QnJDLEdBQXpCO0FBQ0g7QUFDSjs7QUFFRHFLLHFCQUFTakssS0FBSzBNLEdBQUwsQ0FBVWpCLE1BQU1VLEtBQU4sQ0FBWUYsT0FBWixDQUFvQjVOLE1BQXBCLEdBQTZCLENBQXZDLEVBQTJDLEdBQTNDLENBQVQ7O0FBRUEsZ0JBQUdvTixNQUFNVSxLQUFOLENBQVlGLE9BQVosQ0FBb0I1TixNQUFwQixHQUEyQixDQUE5QixFQUFnQztBQUM1QjBOLDZCQUFhRSxPQUFiLEdBQXVCLENBQXZCO0FBQ0gsYUFGRCxNQUVNLElBQUdSLE1BQU1VLEtBQU4sQ0FBWUYsT0FBWixDQUFvQjVOLE1BQXBCLEdBQTJCLENBQTlCLEVBQWdDO0FBQ2xDME4sNkJBQWFFLE9BQWIsR0FBdUIsQ0FBdkI7QUFDSDs7QUFHRCxnQkFBSVUsWUFBWTNNLEtBQUtrQixLQUFMLENBQVcsQ0FBQzJLLFdBQVc1QixLQUFYLEdBQWlCLENBQWpCLEdBQXNCNEIsV0FBV0MsV0FBWCxHQUF1QixDQUF4QixHQUEyQixDQUFqRCxJQUFvRCxFQUEvRCxJQUFtRSxFQUFuRjs7QUFHQSxnQkFBSWMsV0FBVyxFQUFmO0FBQ0EsZ0JBQUlDLFlBQVksS0FBaEI7O0FBRUEsZ0JBQUdkLGFBQWExSSxJQUFoQixFQUFxQjtBQUNqQnVKLDRCQUFZLHlCQUFaO0FBQ0FsQiw0QkFBWSxzRUFBWjtBQUNILGFBSEQsTUFHSztBQUNELG9CQUFHRCxNQUFNVSxLQUFOLENBQVlqSixJQUFaLENBQWlCN0UsTUFBakIsR0FBd0IsQ0FBM0IsRUFBNkI7QUFDekIsd0JBQUcwTixhQUFhRSxPQUFiLEdBQXFCLENBQXhCLEVBQTBCO0FBQ3RCLDRCQUFHRixhQUFhQyxHQUFiLEdBQWlCLENBQXBCLEVBQXNCO0FBQ2xCWSx3Q0FBWSwrQkFBK0JuQixNQUFNVSxLQUFOLENBQVlqSixJQUFaLENBQWlCLENBQWpCLEVBQW9CeEksSUFBcEIsQ0FBeUI0SixFQUF4RCxHQUE2RCw2QkFBekU7QUFDQXVJLHdDQUFZLElBQVo7QUFDSCx5QkFIRCxNQUdLO0FBQ0RELHdDQUFZLHlCQUF5Qm5CLE1BQU1VLEtBQU4sQ0FBWWpKLElBQVosQ0FBaUIsQ0FBakIsRUFBb0J4SSxJQUFwQixDQUF5QjRKLEVBQWxELEdBQXVELHlCQUFuRTtBQUNBdUksd0NBQVksSUFBWjtBQUNIO0FBQ0oscUJBUkQsTUFRSztBQUNELDRCQUFHZCxhQUFhQyxHQUFiLEdBQWlCLENBQXBCLEVBQXNCO0FBQ2xCWSx3Q0FBWSx5QkFBeUJuQixNQUFNVSxLQUFOLENBQVlqSixJQUFaLENBQWlCLENBQWpCLEVBQW9CeEksSUFBcEIsQ0FBeUI0SixFQUFsRCxHQUF1RCx5QkFBbkU7QUFDQXVJLHdDQUFZLElBQVo7QUFDSCx5QkFIRCxNQUdLO0FBQ0RELHdDQUFhbkIsTUFBTVUsS0FBTixDQUFZakosSUFBWixDQUFpQixDQUFqQixFQUFvQnhJLElBQXBCLENBQXlCNEosRUFBekIsR0FBOEIsMEJBQTNDO0FBQ0F1SSx3Q0FBWSxJQUFaO0FBQ0g7QUFDSjtBQUNKLGlCQWxCRCxNQWtCSztBQUNELHdCQUFHZCxhQUFhRSxPQUFiLEdBQXFCLENBQXhCLEVBQTBCO0FBQ3RCLDRCQUFHRixhQUFhQyxHQUFiLEdBQWlCLENBQXBCLEVBQXNCO0FBQ2xCWSx3Q0FBWSxvQ0FBWjtBQUNBQyx3Q0FBWSxJQUFaO0FBQ0gseUJBSEQsTUFHSyxDQUVKO0FBQ0oscUJBUEQsTUFPSztBQUNELDRCQUFHZCxhQUFhQyxHQUFiLEdBQWlCLENBQXBCLEVBQXNCLENBRXJCLENBRkQsTUFFSyxDQUVKO0FBQ0o7QUFDSjtBQUNKOztBQUVELGdCQUFHVyxZQUFVLEdBQWIsRUFBaUI7QUFDYixvQkFBRyxDQUFDWixhQUFhMUksSUFBakIsRUFBc0I7QUFDbEJxSSxnQ0FBWSxrQkFBZ0JFLFFBQWhCLEdBQXlCLGFBQXJDO0FBQ0g7O0FBRUQsb0JBQUdpQixTQUFILEVBQWE7QUFDVCx3QkFBRyxDQUFDZCxhQUFhMUksSUFBakIsRUFBc0I7QUFDbEIsNEJBQUdvSSxNQUFNVSxLQUFOLENBQVlJLFlBQVosQ0FBeUJDLFFBQXpCLEdBQWtDLEdBQXJDLEVBQXlDO0FBQ3JDZCx3Q0FBWSwwQ0FBWjtBQUNILHlCQUZELE1BRUs7QUFDREEsd0NBQVksa0NBQVo7QUFDSDtBQUNKO0FBRUosaUJBVEQsTUFTSztBQUNEa0IsZ0NBQVksdUNBQVo7O0FBRUEsd0JBQUcsQ0FBQ2IsYUFBYTFJLElBQWpCLEVBQXNCO0FBQ2xCLDRCQUFHb0ksTUFBTVUsS0FBTixDQUFZSSxZQUFaLENBQXlCQyxRQUF6QixHQUFrQyxHQUFyQyxFQUF5QztBQUNyQ2Qsd0NBQVksaUNBQVo7QUFDSCx5QkFGRCxNQUVLO0FBQ0RBLHdDQUFZLGdDQUFaO0FBQ0g7QUFDSjtBQUNKO0FBQ0osYUF6QkQsTUF5Qk0sSUFBR2lCLFlBQVUsR0FBYixFQUFpQjs7QUFFbkIsb0JBQUcsQ0FBQ1osYUFBYTFJLElBQWpCLEVBQXNCO0FBQ2xCcUksZ0NBQVksZUFBYUUsUUFBYixHQUFzQixhQUFsQztBQUNIOztBQUVELG9CQUFHaUIsU0FBSCxFQUFhOztBQUVULHdCQUFHLENBQUNkLGFBQWExSSxJQUFqQixFQUFzQjtBQUNsQiw0QkFBR29JLE1BQU1VLEtBQU4sQ0FBWUksWUFBWixDQUF5QkMsUUFBekIsR0FBa0MsR0FBckMsRUFBeUM7QUFDckNkLHdDQUFZLHlDQUFaO0FBQ0gseUJBRkQsTUFFSztBQUNEQSx3Q0FBWSxnQ0FBWjtBQUNIO0FBQ0o7QUFFSixpQkFWRCxNQVVLO0FBQ0RrQixnQ0FBWSx1Q0FBWjs7QUFFQSx3QkFBRyxDQUFDYixhQUFhMUksSUFBakIsRUFBc0I7QUFDbEIsNEJBQUdvSSxNQUFNVSxLQUFOLENBQVlJLFlBQVosQ0FBeUJDLFFBQXpCLEdBQWtDLEdBQXJDLEVBQXlDO0FBQ3JDZCx3Q0FBWSxpQ0FBWjtBQUNILHlCQUZELE1BRUs7QUFDREEsd0NBQVksZ0NBQVo7QUFDSDtBQUNKO0FBQ0o7QUFFSixhQTVCSyxNQTRCQSxJQUFHaUIsWUFBVSxDQUFiLEVBQWU7QUFDakIsb0JBQUcsQ0FBQ1osYUFBYTFJLElBQWpCLEVBQXNCO0FBQ2xCcUksZ0NBQVdFLFdBQVUsYUFBckI7QUFDSDs7QUFFRCxvQkFBR2lCLFNBQUgsRUFBYTtBQUNULHdCQUFHLENBQUNkLGFBQWExSSxJQUFqQixFQUFzQjtBQUNsQiw0QkFBR29JLE1BQU1VLEtBQU4sQ0FBWUksWUFBWixDQUF5QkMsUUFBekIsR0FBa0MsR0FBckMsRUFBeUM7QUFDckNkLHdDQUFZLDZDQUFaO0FBQ0gseUJBRkQsTUFFSztBQUNEQSx3Q0FBWSxxREFBWjtBQUNIO0FBQ0o7QUFFSixpQkFURCxNQVNLO0FBQ0RrQixnQ0FBWSx3Q0FBWjs7QUFFQSx3QkFBRyxDQUFDYixhQUFhMUksSUFBakIsRUFBc0I7QUFDbEIsNEJBQUdvSSxNQUFNVSxLQUFOLENBQVlJLFlBQVosQ0FBeUJDLFFBQXpCLEdBQWtDLEdBQXJDLEVBQXlDO0FBQ3JDZCx3Q0FBWSwwQ0FBWjtBQUNILHlCQUZELE1BRUs7QUFDREEsd0NBQVksaURBQVo7QUFDSDtBQUNKO0FBQ0o7QUFDSixhQXpCSyxNQXlCRDtBQUNELG9CQUFHLENBQUNLLGFBQWExSSxJQUFqQixFQUFzQjtBQUNsQnFJLGdDQUFVLHdCQUFzQkUsUUFBdEIsR0FBZ0MsYUFBMUM7QUFDSDs7QUFFRCxvQkFBR2lCLFNBQUgsRUFBYTtBQUNULHdCQUFHLENBQUNkLGFBQWExSSxJQUFqQixFQUFzQjtBQUNsQiw0QkFBR29JLE1BQU1VLEtBQU4sQ0FBWUksWUFBWixDQUF5QkMsUUFBekIsR0FBa0MsR0FBckMsRUFBeUM7QUFDckNkLHdDQUFZLDZEQUFaO0FBQ0gseUJBRkQsTUFFSztBQUNEQSx3Q0FBWSwyQ0FBWjtBQUNIO0FBQ0o7QUFDSixpQkFSRCxNQVFLO0FBQ0RrQixnQ0FBWSxzREFBWjtBQUNBLHdCQUFHLENBQUNiLGFBQWExSSxJQUFqQixFQUFzQjtBQUNsQiw0QkFBR29JLE1BQU1VLEtBQU4sQ0FBWUksWUFBWixDQUF5QkMsUUFBekIsR0FBa0MsR0FBckMsRUFBeUM7QUFDckNkLHdDQUFZLDRDQUFaO0FBQ0gseUJBRkQsTUFFSztBQUNEQSx3Q0FBWSw2QkFBWjtBQUNIO0FBQ0o7QUFDSjtBQUNKOztBQUVEQyxxQkFBUzFKLElBQVQsQ0FBYzJLLFFBQWQ7O0FBRUEsZ0JBQUlFLE1BQU1yQixNQUFNVSxLQUFOLENBQVlJLFlBQXRCO0FBQ0EsZ0JBQUlRLFNBQVNELElBQUlOLFFBQWpCO0FBQ0EsZ0JBQUlRLFNBQVMsbUJBQW1CRixJQUFJakssSUFBdkIsR0FBOEIsS0FBOUIsR0FBc0NpSyxJQUFJcFMsSUFBMUMsR0FBaUQsYUFBakQsSUFBaUVzRixLQUFLQyxLQUFMLENBQVc4TSxTQUFPLEVBQWxCLElBQXdCLENBQXpGLElBQTRGLFNBQXpHOztBQUVBLGdCQUFHQSxTQUFPLEdBQVYsRUFBYztBQUNWQywwQkFBVSxrQkFBVjtBQUNILGFBRkQsTUFFTSxJQUFHRCxTQUFPLEdBQVYsRUFBYztBQUNoQkMsMEJBQVUsSUFBVjtBQUNILGFBRkssTUFFRDtBQUNEQSwwQkFBVSxrQ0FBVjtBQUNIOztBQUVELGdCQUFJQyxXQUFXak4sS0FBS29NLEdBQUwsQ0FBU3BNLEtBQUtrQixLQUFMLENBQVcsQ0FBQyxNQUFNNkwsTUFBUCxJQUFlLEdBQTFCLENBQVQsRUFBd0MsQ0FBeEMsQ0FBZjs7QUFFQTlDLHFCQUFRZ0QsUUFBUjs7QUFFQSxnQkFBR2hELFFBQU0sR0FBVCxFQUFhO0FBQ1RBLHdCQUFRLE1BQU0sQ0FBQ0EsUUFBTSxHQUFQLElBQVksQ0FBMUI7QUFDSDs7QUFFREEsb0JBQVFqSyxLQUFLME0sR0FBTCxDQUFTMU0sS0FBS2tCLEtBQUwsQ0FBVytJLFFBQU0sSUFBTixHQUFXLEVBQXRCLElBQTBCLEVBQW5DLEVBQXNDLEdBQXRDLENBQVI7O0FBRUEwQixxQkFBUzFKLElBQVQsQ0FBYytLLE1BQWQ7O0FBRUF2QixrQkFBTXlCLFVBQU4sQ0FBaUJyQyxNQUFqQixHQUEwQjtBQUN0QlosdUJBQU9BO0FBRGUsYUFBMUI7O0FBSUFzQix1QkFBV3RKLElBQVgsQ0FBZ0JnSSxLQUFoQjs7QUFFQSxnQkFBR0EsUUFBTSxHQUFULEVBQWE7QUFDVDBCLHlCQUFTMUosSUFBVCxDQUFjLCtDQUFkO0FBQ0gsYUFGRCxNQUVNLElBQUdnSSxRQUFNLENBQVQsRUFBVztBQUNiMEIseUJBQVMxSixJQUFULENBQWMsbUNBQWQ7QUFDSCxhQUZLLE1BRUEsSUFBR2dJLFFBQU0sR0FBVCxFQUFhO0FBQ2YwQix5QkFBUzFKLElBQVQsQ0FBYyw2QkFBZDtBQUNILGFBRkssTUFFQSxJQUFHZ0ksUUFBTSxHQUFULEVBQWE7QUFDZjBCLHlCQUFTMUosSUFBVCxDQUFjLHdDQUFkO0FBQ0gsYUFGSyxNQUVBLElBQUdnSSxRQUFNLEdBQVQsRUFBYTtBQUNmMEIseUJBQVMxSixJQUFULENBQWMsNENBQWQ7QUFDSCxhQUZLLE1BRUEsSUFBR2dJLFFBQU0sR0FBVCxFQUFhO0FBQ2YwQix5QkFBUzFKLElBQVQsQ0FBYyxnQ0FBZDtBQUNILGFBRkssTUFFRDtBQUNEMEoseUJBQVMxSixJQUFULENBQWMsd0NBQWQ7QUFDSDs7QUFFRHdKLGtCQUFNMEIsT0FBTixDQUFjdEMsTUFBZCxHQUF1QmMsUUFBdkI7O0FBRUEsZ0JBQUdGLE1BQU0yQixPQUFULEVBQWlCO0FBQ2IzQixzQkFBTTJCLE9BQU4sQ0FBY3ZDLE1BQWQsR0FBdUJhLFFBQXZCO0FBQ0gsYUFGRCxNQUVLO0FBQ0RELHNCQUFNMkIsT0FBTixHQUFnQjtBQUNadkMsNEJBQVFhO0FBREksaUJBQWhCO0FBR0g7QUFDSjs7QUFFREgsbUJBQVduQixJQUFYOztBQUVBdEgsZ0JBQVFDLEdBQVIsQ0FBWXdJLFVBQVo7QUFFSCxLQXphTzs7QUEyYVJOLHFCQUFpQiwyQkFBVTtBQUN2QixZQUFJMVEsT0FBTyxLQUFLQSxJQUFoQjtBQUNBLFlBQUk0USxhQUFhLEVBQWpCOztBQUVBLGFBQUssSUFBSUssR0FBVCxJQUFnQixLQUFLL0wsSUFBTCxDQUFVdUQsTUFBMUIsRUFBa0M7QUFDOUIsZ0JBQUl5SSxRQUFRLEtBQUtoTSxJQUFMLENBQVV1RCxNQUFWLENBQWlCd0ksR0FBakIsQ0FBWjs7QUFFQSxnQkFBSTZCLGdCQUFnQixFQUFwQjs7QUFFQSxnQkFBSXBELFFBQVEsQ0FBWjtBQUNBO0FBQ0EsZ0JBQUlxRCxXQUFXLEVBQWY7QUFDQTtBQUNBLGdCQUFJQyxZQUFZLEVBQWhCO0FBQ0E7QUFDQSxnQkFBSUMsVUFBVSxFQUFDaEIsVUFBUyxJQUFWLEVBQWdCOVIsTUFBSyxFQUFyQixFQUF5QmtDLE1BQUssRUFBOUIsRUFBZDtBQUNBO0FBQ0EsZ0JBQUk2USxTQUFTLENBQWI7O0FBRUEsZ0JBQUdoQyxNQUFNZ0IsU0FBVCxFQUFtQjtBQUNmZ0IseUJBQVM3RixPQUFPQyxJQUFQLENBQVk0RCxNQUFNZ0IsU0FBbEIsRUFBNkJwTyxNQUF0QztBQUNIO0FBQ0Q7OztBQUdBLGlCQUFLLElBQUlxUCxPQUFULElBQW9CakMsTUFBTWdCLFNBQTFCLEVBQXFDOztBQUVqQyxvQkFBR2hCLE1BQU1nQixTQUFOLENBQWdCaUIsT0FBaEIsRUFBeUJsQixRQUF6QixHQUFvQ2dCLFFBQVFoQixRQUEvQyxFQUF3RDtBQUNwRGdCLDhCQUFVL0IsTUFBTWdCLFNBQU4sQ0FBZ0JpQixPQUFoQixDQUFWO0FBQ0E7QUFDSDs7QUFFRCxvQkFBRyxLQUFLak8sSUFBTCxDQUFVdUwsU0FBVixDQUFvQjBDLE9BQXBCLEVBQTZCekQsS0FBN0IsR0FBbUMsRUFBdEMsRUFBeUM7QUFDckNxRCw2QkFBU3JMLElBQVQsQ0FBY3lMLE9BQWQ7QUFDQTtBQUNIOztBQUVELHFCQUFLLElBQUkzTixJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS04sSUFBTCxDQUFVdUwsU0FBVixDQUFvQjBDLE9BQXBCLEVBQTZCeEssSUFBN0IsQ0FBa0M3RSxNQUF0RCxFQUE4RDBCLEdBQTlELEVBQW1FO0FBQy9ELHdCQUFJbUQsT0FBTyxLQUFLekQsSUFBTCxDQUFVdUwsU0FBVixDQUFvQjBDLE9BQXBCLEVBQTZCeEssSUFBN0IsQ0FBa0NuRCxDQUFsQyxDQUFYO0FBQ0Esd0JBQUcsQ0FBQ3dOLFVBQVU3RixRQUFWLENBQW1CeEUsS0FBS3hJLElBQXhCLENBQUosRUFBa0M7QUFDOUI2UyxrQ0FBVXRMLElBQVYsQ0FBZWlCLEtBQUt4SSxJQUFwQjtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxnQkFBR3NGLEtBQUsyTixJQUFMLENBQVdILFFBQVFoQixRQUFULEdBQW1CLEVBQTdCLElBQWlDLENBQXBDLEVBQXNDO0FBQ2xDYSw4QkFBY3BMLElBQWQsQ0FBbUIsc0JBQXNCdUwsUUFBUTlTLElBQTlCLEdBQXFDLHlCQUFyQyxHQUFnRXNGLEtBQUsyTixJQUFMLENBQVdILFFBQVFoQixRQUFULEdBQW1CLEVBQTdCLENBQWhFLEdBQWtHLGVBQXJIO0FBQ0gsYUFGRCxNQUVLO0FBQ0RhLDhCQUFjcEwsSUFBZCxDQUFtQixzQkFBc0J1TCxRQUFROVMsSUFBOUIsR0FBcUMsZUFBckMsR0FBc0RzRixLQUFLMk4sSUFBTCxDQUFXSCxRQUFRaEIsUUFBVCxHQUFtQixFQUE3QixDQUF0RCxHQUF3RixNQUEzRztBQUNIO0FBQ0RhLDBCQUFjcEwsSUFBZCxDQUFtQiw4QkFBOEJ3TCxNQUE5QixHQUF1QyxjQUExRDs7QUFFQSxnQkFBR0gsU0FBU2pQLE1BQVQsR0FBZ0IsQ0FBbkIsRUFBcUI7QUFDakIsb0JBQUdpUCxTQUFTalAsTUFBVCxHQUFnQixDQUFuQixFQUFxQjtBQUNqQmdQLGtDQUFjcEwsSUFBZCxDQUFtQixrQkFBZ0IsS0FBSzBJLFFBQXJCLEdBQThCLG1CQUE5QixHQUFtRDJDLFFBQW5ELEdBQThELCtCQUFqRjtBQUNILGlCQUZELE1BRUs7QUFDREQsa0NBQWNwTCxJQUFkLENBQW1CLGtCQUFnQixLQUFLMEksUUFBckIsR0FBOEIsbUJBQTlCLEdBQW1EMkMsUUFBbkQsR0FBOEQsOEJBQWpGO0FBQ0g7QUFDSjs7QUFFRCxnQkFBSU0sU0FBU0wsVUFBVWxQLE1BQXZCO0FBQ0EsZ0JBQUd1UCxTQUFPLENBQVYsRUFBWTtBQUNSO0FBQ0Esb0JBQUdBLFNBQU8sRUFBVixFQUFhO0FBQ1RQLGtDQUFjcEwsSUFBZCxDQUFtQixRQUFRLEtBQUswSSxRQUFiLEdBQXdCLGNBQXhCLEdBQXVDaUQsTUFBdkMsR0FBOEMsa0RBQWpFO0FBQ0gsaUJBRkQsTUFFTSxJQUFHQSxTQUFPLEVBQVYsRUFBYTtBQUNmUCxrQ0FBY3BMLElBQWQsQ0FBbUIsUUFBUSxLQUFLMEksUUFBYixHQUF3QixjQUF4QixHQUF1Q2lELE1BQXZDLEdBQThDLDhDQUFqRTtBQUNILGlCQUZLLE1BRUQ7QUFDRFAsa0NBQWNwTCxJQUFkLENBQW1CLEtBQUswSSxRQUFMLEdBQWdCLGNBQWhCLEdBQStCaUQsTUFBL0IsR0FBc0MsZ0JBQXpEO0FBQ0g7QUFDSjs7QUFFRCxpQkFBSyxJQUFJRixPQUFULElBQW9CakMsTUFBTWdCLFNBQTFCLEVBQXFDO0FBQ2pDLG9CQUFJb0IsY0FBY3BDLE1BQU1nQixTQUFOLENBQWdCaUIsT0FBaEIsRUFBeUJsQixRQUEzQztBQUNBdkMseUJBQVMsQ0FBQyxRQUFRNEQsV0FBVCxJQUFzQixLQUFLcE8sSUFBTCxDQUFVdUwsU0FBVixDQUFvQjBDLE9BQXBCLEVBQTZCekQsS0FBNUQ7QUFDSDs7QUFFRGtCLHVCQUFXbEosSUFBWCxDQUFnQjtBQUNaZ0ksdUJBQU9BLEtBREs7QUFFWnVCLHFCQUFLQTtBQUZPLGFBQWhCOztBQUtBLGdCQUFHQyxNQUFNMEIsT0FBVCxFQUFpQjtBQUNiMUIsc0JBQU0wQixPQUFOLENBQWN2QyxTQUFkLEdBQTBCeUMsYUFBMUI7QUFDSCxhQUZELE1BRUs7QUFDRDVCLHNCQUFNMEIsT0FBTixHQUFnQjtBQUNadkMsK0JBQVV5QztBQURFLGlCQUFoQjtBQUdIO0FBQ0o7O0FBRURsQyxtQkFBV2YsSUFBWCxDQUFnQixVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBYztBQUMxQixtQkFBT0QsRUFBRUosS0FBRixHQUFVSyxFQUFFTCxLQUFaLEdBQW9CLENBQXBCLEdBQXdCSSxFQUFFSixLQUFGLEdBQVVLLEVBQUVMLEtBQVosR0FBb0IsQ0FBQyxDQUFyQixHQUF5QixDQUF4RDtBQUNILFNBRkQ7O0FBSUEsYUFBSyxJQUFJbEssSUFBSSxDQUFSLEVBQVcrTixNQUFNM0MsV0FBVzlNLE1BQWpDLEVBQXlDMEIsSUFBSStOLEdBQTdDLEVBQWtEL04sR0FBbEQsRUFBdUQ7QUFDbkQsZ0JBQUkwTCxTQUFRLEtBQUtoTSxJQUFMLENBQVV1RCxNQUFWLENBQWlCbUksV0FBV3BMLENBQVgsRUFBY3lMLEdBQS9CLENBQVo7QUFDQSxnQkFBSXZCLFNBQVFqSyxLQUFLa0IsS0FBTCxDQUFXLENBQUMsSUFBS25CLElBQUUrTixHQUFILElBQVMvTixJQUFFK04sR0FBWCxDQUFMLElBQXNCLEVBQWpDLElBQXFDLEVBQXJDLEdBQTJDLENBQXZEO0FBQ0M7QUFDQTs7QUFFRCxnQkFBR3JDLE9BQU15QixVQUFULEVBQW9CO0FBQ2hCekIsdUJBQU15QixVQUFOLENBQWlCdEMsU0FBakIsR0FBNkI7QUFDekJYLDJCQUFPQTtBQURrQixpQkFBN0I7QUFHSCxhQUpELE1BSUs7QUFDRHdCLHVCQUFNeUIsVUFBTixHQUFtQjtBQUNmdEMsK0JBQVU7QUFDTlgsK0JBQU1BO0FBREE7QUFESyxpQkFBbkI7QUFLSDtBQUNKOztBQUVEclAsVUFBRSxtQkFBRixFQUF1Qm9DLElBQXZCLENBQTRCLDBDQUE1QjtBQUNBLGFBQUt5QyxJQUFMLENBQVUwRCxNQUFWLENBQWlCSCxNQUFqQixDQUF3QjRILFNBQXhCLEdBQW9DLElBQXBDOztBQUVBeFAsaUJBQVNRLFFBQVQsR0FBb0JDLEdBQXBCLENBQXdCLFlBQVV0QixJQUFsQyxFQUF3Q29OLE1BQXhDLENBQStDLEtBQUtsSSxJQUFwRDtBQUNILEtBamlCTzs7QUFtaUJSc08sb0JBQWdCLDBCQUFVLENBRXpCO0FBcmlCTyxDQUFaOztrQkF3aUJlckQsSzs7Ozs7Ozs7Ozs7O0FDeGlCZixJQUFJc0QsT0FBTztBQUNQdk8sVUFBSyxFQURFO0FBRVBsRixVQUFLLEVBRkU7QUFHUG9RLGNBQVMsRUFIRjs7QUFLUDVMLGNBQVUsb0JBQVU7QUFDaEIsWUFBSWpCLE9BQU8sSUFBWDtBQUNBbEQsVUFBRSxhQUFGLEVBQWlCdUQsRUFBakIsQ0FBb0IsUUFBcEIsRUFBOEIsbUJBQTlCLEVBQW1ELFlBQVU7QUFDekRMLGlCQUFLbVEsV0FBTCxDQUFpQnJULEVBQUUsSUFBRixDQUFqQjtBQUNILFNBRkQ7QUFHSCxLQVZNOztBQVlQSSxVQUFNLGNBQVN5RSxJQUFULEVBQWU2QyxHQUFmLEVBQW9CNUgsSUFBcEIsRUFBeUI7QUFDM0JFLFVBQUUsV0FBRixFQUFlb0MsSUFBZixDQUFvQnRDLElBQXBCLEVBQTBCdUMsSUFBMUIsQ0FBK0IsSUFBL0IsRUFBcUNxRixHQUFyQztBQUNBMUgsVUFBRSxlQUFGLEVBQW1CRyxRQUFuQixDQUE0QixhQUE1QjtBQUNBSCxVQUFFLGVBQUYsRUFBbUJHLFFBQW5CLENBQTRCLGFBQTVCO0FBQ0FILFVBQUUsT0FBRixFQUFXRSxXQUFYLENBQXVCLGFBQXZCO0FBQ0EsYUFBSzJFLElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtsRixJQUFMLEdBQVkrSCxHQUFaO0FBQ0EsYUFBS3FJLFFBQUwsR0FBZ0JqUSxJQUFoQjtBQUNBb0ksZ0JBQVFDLEdBQVIsQ0FBWXRELElBQVo7O0FBRUEsYUFBS1YsUUFBTDtBQUNBLGFBQUsrSSxPQUFMO0FBQ0gsS0F4Qk07O0FBMEJQbUcsaUJBQWEscUJBQVN4RSxHQUFULEVBQWE7O0FBRXRCLFlBQUc3RCxNQUFNNkQsSUFBSXhOLEdBQUosS0FBVSxDQUFoQixDQUFILEVBQXNCO0FBQ2xCc0osa0JBQU0sYUFBTjtBQUNBa0UsZ0JBQUl4TixHQUFKLENBQVEsQ0FBUjtBQUNILFNBSEQsTUFHSztBQUNELGdCQUFHd04sSUFBSXhOLEdBQUosS0FBVSxFQUFWLElBQWN3TixJQUFJeE4sR0FBSixLQUFVLENBQTNCLEVBQTZCO0FBQ3pCc0osc0JBQU0scUJBQU47QUFDQWtFLG9CQUFJeE4sR0FBSixDQUFRLENBQVI7QUFDSCxhQUhELE1BR0s7QUFDRCxvQkFBR3dOLElBQUluSixRQUFKLENBQWEsY0FBYixDQUFILEVBQWdDO0FBQzVCLHdCQUFJMEksTUFBTXBPLEVBQUUsZUFBRixFQUFtQnNULEtBQW5CLENBQXlCekUsR0FBekIsQ0FBVjtBQUNBQSx3QkFBSXhOLEdBQUosQ0FBUXdOLElBQUl4TixHQUFKLEtBQVUsQ0FBbEI7QUFDQXNKLDBCQUFNLEtBQUs5RixJQUFMLENBQVU0RCxJQUFWLENBQWUyRixHQUFmLEVBQW9CdE8sSUFBcEIsR0FBeUIsVUFBekIsR0FBb0MrTyxJQUFJeE4sR0FBSixLQUFVLENBQTlDLEdBQWdELGNBQXREO0FBQ0FiLDZCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixZQUFVLEtBQUt0QixJQUFmLEdBQW9CLFFBQXBCLEdBQTZCeU8sR0FBN0IsR0FBaUMsZUFBekQsRUFBMEU5RyxHQUExRSxDQUE4RXVILElBQUl4TixHQUFKLEVBQTlFO0FBQ0gsaUJBTEQsTUFLTSxJQUFHd04sSUFBSW5KLFFBQUosQ0FBYSxvQkFBYixDQUFILEVBQXNDO0FBQ3hDLHdCQUFJMEksT0FBTXBPLEVBQUUscUJBQUYsRUFBeUJzVCxLQUF6QixDQUErQnpFLEdBQS9CLENBQVY7QUFDQUEsd0JBQUl4TixHQUFKLENBQVF3TixJQUFJeE4sR0FBSixLQUFVLENBQWxCO0FBQ0FzSiwwQkFBTSxLQUFLOUYsSUFBTCxDQUFVNEQsSUFBVixDQUFlMkYsSUFBZixFQUFvQnRPLElBQXBCLEdBQXlCLFlBQXpCLEdBQXNDK08sSUFBSXhOLEdBQUosS0FBVSxDQUFoRCxHQUFrRCxjQUF4RDtBQUNBYiw2QkFBU1EsUUFBVCxHQUFvQkMsR0FBcEIsQ0FBd0IsWUFBVSxLQUFLdEIsSUFBZixHQUFvQixRQUFwQixHQUE2QnlPLElBQTdCLEdBQWlDLHFCQUF6RCxFQUFnRjlHLEdBQWhGLENBQW9GdUgsSUFBSXhOLEdBQUosRUFBcEY7QUFDSDtBQUNKO0FBQ0o7QUFDSixLQWpETTs7QUFtRFA2TCxhQUFTLG1CQUFVO0FBQ2YsWUFBSTlKLE1BQU0sRUFBVjtBQUNBLFlBQUltUSxXQUFXLEVBQWY7O0FBRUEsWUFBRyxLQUFLMU8sSUFBTCxDQUFVNEQsSUFBYixFQUFrQjtBQUNkLGlCQUFLLElBQUl0RCxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS04sSUFBTCxDQUFVNEQsSUFBVixDQUFlaEYsTUFBbkMsRUFBMkMwQixHQUEzQyxFQUFnRDtBQUM1QyxvQkFBSXNELE9BQU8sS0FBSzVELElBQUwsQ0FBVTRELElBQVYsQ0FBZXRELENBQWYsQ0FBWDtBQUNBK0Msd0JBQVFDLEdBQVIsQ0FBWU0sSUFBWjtBQUNBLG9CQUFHLENBQUNBLEtBQUsrSyxPQUFULEVBQWlCO0FBQ2I7QUFDQXBRLDJCQUFLLHlCQUFMO0FBQ0FBLDJCQUFRLDBCQUFSO0FBQ0FBLDJCQUFZLDJCQUF5QnFGLEtBQUszSSxJQUE5QixHQUFtQyxNQUEvQzs7QUFHQSx3QkFBRzJJLEtBQUt3SCxNQUFSLEVBQWU7QUFDWDdNLCtCQUFRLDBDQUFSO0FBQ0EsNEJBQUdxRixLQUFLd0gsTUFBTCxDQUFZWixLQUFmLEVBQXFCO0FBQ2pCak0sbUNBQUssaUVBQStEcUYsS0FBS3dILE1BQUwsQ0FBWVosS0FBM0UsR0FBaUYsSUFBdEY7QUFDSCx5QkFGRCxNQUVLO0FBQ0RqTSxtQ0FBSyxpRUFBTDtBQUNIOztBQUVEQSwrQkFBUSwyQ0FBUjtBQUNBLDRCQUFHcUYsS0FBS3dILE1BQUwsQ0FBWWlCLFdBQWYsRUFBMkI7QUFDdkI5TixtQ0FBSyx1RUFBcUVxRixLQUFLd0gsTUFBTCxDQUFZaUIsV0FBakYsR0FBNkYsSUFBbEc7QUFDSCx5QkFGRCxNQUVLO0FBQ0Q5TixtQ0FBSyx1RUFBTDtBQUNIO0FBQ0oscUJBZEQsTUFjSztBQUNEQSwrQkFBUSwwQ0FBUjtBQUNBQSwrQkFBUSxpRUFBUjtBQUNBQSwrQkFBUSwyQ0FBUjtBQUNBQSwrQkFBUSx1RUFBUjtBQUNIOztBQUVEQSwyQkFBUSxRQUFSO0FBQ0FBLDJCQUFLLFFBQUw7QUFDSDtBQUNKO0FBQ0o7O0FBRURwRCxVQUFFLGFBQUYsRUFBaUJvQyxJQUFqQixDQUFzQmdCLEdBQXRCO0FBQ0g7O0FBOUZNLENBQVg7O2tCQWtHZWdRLEk7Ozs7Ozs7Ozs7OztBQ2xHZixJQUFJSyxTQUFTO0FBQ1RySCxTQUFJLEVBREs7QUFFVEMsWUFBTyxLQUZFO0FBR1R0RSxXQUFNLEVBSEc7O0FBS1QzSCxVQUFNLGdCQUFVO0FBQ1osWUFBSThDLE9BQU8sSUFBWDtBQUNBZ0YsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFaOztBQUVBM0gsaUJBQVNRLFFBQVQsR0FBb0JDLEdBQXBCLENBQXdCLGtCQUF4QixFQUE0Q0MsSUFBNUMsQ0FBaUQsT0FBakQsRUFBMEQsZ0JBQVE7QUFDOURnQyxpQkFBSzZFLEtBQUwsR0FBYTNHLEtBQUtDLEdBQUwsRUFBYjs7QUFFQTZCLGlCQUFLa0osR0FBTCxHQUFXLElBQUlnQixPQUFPQyxJQUFQLENBQVlDLEdBQWhCLENBQW9Cak4sU0FBU2tOLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBcEIsRUFBMEQ7QUFDakVDLHdCQUFRLEVBQUUzQyxLQUFLLFFBQVAsRUFBaUJFLEtBQUssQ0FBQyxRQUF2QixFQUR5RDtBQUVqRTBDLHNCQUFNLEVBRjJEO0FBR2pFQyxnQ0FBZ0IsS0FIaUQ7QUFJakVDLDhCQUFjLElBSm1EO0FBS2pFQyxtQ0FBbUI7QUFMOEMsYUFBMUQsQ0FBWDs7QUFRQTFLLGlCQUFLa0osR0FBTCxDQUFTeUIsV0FBVCxDQUFxQixPQUFyQixFQUE4QixVQUFTdEosQ0FBVCxFQUFXO0FBQ3JDckIscUJBQUt3USxVQUFMLENBQWdCblAsQ0FBaEI7QUFDSCxhQUZEO0FBR0gsU0FkRDtBQWVILEtBeEJROztBQTBCVG1QLGdCQUFZLG9CQUFTblAsQ0FBVCxFQUFXO0FBQ25CLFlBQUlxRixPQUFPO0FBQ1BpQixpQkFBSXRHLEVBQUV3SixNQUFGLENBQVNsRCxHQUFULEVBREc7QUFFUEUsaUJBQUl4RyxFQUFFd0osTUFBRixDQUFTaEQsR0FBVDtBQUZHLFNBQVg7O0FBS0EsWUFBRyxLQUFLc0IsTUFBUixFQUFlO0FBQ1gsaUJBQUtBLE1BQUwsQ0FBWTJCLE1BQVosQ0FBbUIsSUFBbkI7QUFDSDs7QUFFRCxhQUFLM0IsTUFBTCxHQUFjLElBQUllLE9BQU9DLElBQVAsQ0FBWVksTUFBaEIsQ0FBdUI7QUFDakNDLHNCQUFVM0osRUFBRXdKLE1BRHFCO0FBRWpDM0IsaUJBQUssS0FBS0E7QUFGdUIsU0FBdkIsQ0FBZDs7QUFLQSxZQUFJaEosTUFBTSxFQUFWO0FBQ0EsWUFBSXlPLFlBQVksRUFBaEI7QUFDQSxZQUFJOEIsYUFBYSxFQUFqQjs7QUFFQSxhQUFLLElBQUl4TyxLQUFJLENBQWIsRUFBZ0JBLEtBQUksR0FBcEIsRUFBeUJBLElBQXpCLEVBQThCO0FBQzFCLGdCQUFJeU8sWUFBWSxLQUFLN0wsS0FBTCxDQUFXNUMsRUFBWCxFQUFjckYsSUFBOUI7O0FBRUEsZ0JBQUlrRixNQUFNSSxLQUFLa0IsS0FBTCxDQUFXa0UsYUFBYVosSUFBYixFQUFrQixLQUFLN0IsS0FBTCxDQUFXNUMsRUFBWCxFQUFjeUUsSUFBaEMsQ0FBWCxDQUFWOztBQUVBLGdCQUFHNUUsTUFBSSxHQUFQLEVBQVc7QUFDUCxxQkFBSyxJQUFJZ0IsS0FBSSxDQUFiLEVBQWdCQSxLQUFJLEtBQUsrQixLQUFMLENBQVc1QyxFQUFYLEVBQWM4QyxJQUFkLENBQW1CeEUsTUFBdkMsRUFBK0N1QyxJQUEvQyxFQUFvRDtBQUNoRCx3QkFBSWlDLFFBQU8sS0FBS0YsS0FBTCxDQUFXNUMsRUFBWCxFQUFjOEMsSUFBZCxDQUFtQmpDLEVBQW5CLEVBQXNCakIsS0FBdEIsQ0FBNEIsQ0FBNUIsRUFBOEIsQ0FBOUIsQ0FBWDs7QUFFQSx3QkFBRzhNLFVBQVU1SixLQUFWLENBQUgsRUFBbUI7QUFDZiw0QkFBR2pELE1BQUk2TSxVQUFVNUosS0FBVixFQUFnQmpELEdBQXZCLEVBQTJCO0FBQ3ZCNk0sc0NBQVU1SixLQUFWLElBQWtCO0FBQ2RqRCxxQ0FBS0EsR0FEUztBQUVkbEYsc0NBQU04VDtBQUZRLDZCQUFsQjtBQUlIO0FBQ0oscUJBUEQsTUFPSztBQUNEL0Isa0NBQVU1SixLQUFWLElBQWtCO0FBQ2RqRCxpQ0FBS0EsR0FEUztBQUVkbEYsa0NBQU04VDtBQUZRLHlCQUFsQjtBQUlIO0FBQ0o7O0FBRUQsb0JBQUdELFdBQVdDLFNBQVgsQ0FBSCxFQUF5QjtBQUNyQkQsK0JBQVdDLFNBQVgsRUFBc0IzTCxJQUF0QixHQUE2QjBMLFdBQVdDLFNBQVgsRUFBc0IzTCxJQUF0QixDQUEyQjRMLE1BQTNCLENBQWtDLEtBQUs5TCxLQUFMLENBQVc1QyxFQUFYLEVBQWM4QyxJQUFoRCxDQUE3QjtBQUNILGlCQUZELE1BRUs7QUFDRDBMLCtCQUFXQyxTQUFYLElBQXdCO0FBQ3BCNU8sNkJBQUtBLEdBRGU7QUFFcEJpRCw4QkFBTSxLQUFLRixLQUFMLENBQVc1QyxFQUFYLEVBQWM4QztBQUZBLHFCQUF4QjtBQUlIO0FBRUo7QUFDSjtBQUNELFlBQUk2TCxXQUFXLEVBQWY7QUFDQSxhQUFLLElBQUk3TCxJQUFULElBQWlCNEosU0FBakIsRUFBNEI7QUFDeEJpQyxxQkFBU3pNLElBQVQsQ0FBYztBQUNWWSxzQkFBS0EsSUFESztBQUVWbkksc0JBQUsrUixVQUFVNUosSUFBVixFQUFnQm5JLElBRlg7QUFHVmtGLHFCQUFJNk0sVUFBVTVKLElBQVYsRUFBZ0JqRDtBQUhWLGFBQWQ7QUFLSDs7QUFFRCxZQUFJK08sY0FBYyxFQUFsQjtBQUNBLGFBQUssSUFBSWpVLElBQVQsSUFBaUI2VCxVQUFqQixFQUE2QjtBQUN6Qkksd0JBQVkxTSxJQUFaLENBQWlCO0FBQ2JZLHNCQUFLMEwsV0FBVzdULElBQVgsRUFBaUJtSSxJQURUO0FBRWJuSSxzQkFBS0EsSUFGUTtBQUdia0YscUJBQUkyTyxXQUFXN1QsSUFBWCxFQUFpQmtGO0FBSFIsYUFBakI7QUFLSDs7QUFFRDhPLGlCQUFTdEUsSUFBVCxDQUFjLFVBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFjO0FBQ3hCLG1CQUFPRCxFQUFFekssR0FBRixHQUFRMEssRUFBRTFLLEdBQVYsR0FBZ0IsQ0FBaEIsR0FBb0J5SyxFQUFFekssR0FBRixHQUFRMEssRUFBRTFLLEdBQVYsR0FBZ0IsQ0FBQyxDQUFqQixHQUFxQixDQUFoRDtBQUNILFNBRkQ7QUFHQStPLG9CQUFZdkUsSUFBWixDQUFpQixVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBYztBQUMzQixtQkFBT0QsRUFBRXpLLEdBQUYsR0FBUTBLLEVBQUUxSyxHQUFWLEdBQWdCLENBQWhCLEdBQW9CeUssRUFBRXpLLEdBQUYsR0FBUTBLLEVBQUUxSyxHQUFWLEdBQWdCLENBQUMsQ0FBakIsR0FBcUIsQ0FBaEQ7QUFDSCxTQUZEOztBQUlBNUIsZUFBSyx1Q0FBTDtBQUNBQSxlQUFLLGlDQUFMO0FBQ0EsYUFBSyxJQUFJK0IsSUFBSSxDQUFiLEVBQWdCQSxJQUFJNE8sWUFBWXRRLE1BQWhDLEVBQXdDMEIsR0FBeEMsRUFBNkM7QUFDekMvQixtQkFBSyxrQ0FBTDtBQUNBQSxtQkFBUSw2Q0FBNEMyUSxZQUFZNU8sQ0FBWixFQUFlckYsSUFBM0QsR0FBa0UsT0FBMUU7QUFDQXNELG1CQUFRLHlDQUF3Q2dDLEtBQUsyTixJQUFMLENBQVVnQixZQUFZNU8sQ0FBWixFQUFlSCxHQUFmLEdBQW1CLEVBQTdCLENBQXhDLEdBQTJFLFVBQW5GO0FBQ0E1QixtQkFBUSw2Q0FBUjtBQUNBLGlCQUFLLElBQUk0QyxJQUFJLENBQWIsRUFBZ0JBLElBQUkrTixZQUFZNU8sQ0FBWixFQUFlOEMsSUFBZixDQUFvQnhFLE1BQXhDLEVBQWdEdUMsR0FBaEQsRUFBcUQ7QUFDakQsb0JBQUcrTixZQUFZNU8sQ0FBWixFQUFlOEMsSUFBZixDQUFvQmpDLENBQXBCLEVBQXVCdkMsTUFBdkIsS0FBa0MsQ0FBckMsRUFBdUM7QUFDbkNMLDJCQUFRLGdEQUE4QzJRLFlBQVk1TyxDQUFaLEVBQWU4QyxJQUFmLENBQW9CakMsQ0FBcEIsQ0FBOUMsR0FBcUUsSUFBckUsR0FBMEUrTixZQUFZNU8sQ0FBWixFQUFlOEMsSUFBZixDQUFvQmpDLENBQXBCLENBQTFFLEdBQW1HLE1BQTNHO0FBQ0g7QUFDSjtBQUNENUMsbUJBQVEsUUFBUjs7QUFFQUEsbUJBQUssUUFBTDtBQUNIO0FBQ0RBLGVBQUssUUFBTDs7QUFFQUEsZUFBSyx3Q0FBTDtBQUNBQSxlQUFLLGlDQUFMO0FBQ0EsYUFBSyxJQUFJK0IsSUFBSSxDQUFiLEVBQWdCQSxJQUFJMk8sU0FBU3JRLE1BQTdCLEVBQXFDMEIsR0FBckMsRUFBMEM7QUFDdEMvQixtQkFBSyxrQ0FBTDtBQUNBQSxtQkFBUSx5Q0FBdUMwUSxTQUFTM08sQ0FBVCxFQUFZOEMsSUFBbkQsR0FBd0QsSUFBeEQsR0FBNkQ2TCxTQUFTM08sQ0FBVCxFQUFZOEMsSUFBekUsR0FBZ0YsTUFBeEY7QUFDQTdFLG1CQUFRLGtDQUFpQ2dDLEtBQUsyTixJQUFMLENBQVVlLFNBQVMzTyxDQUFULEVBQVlILEdBQVosR0FBZ0IsRUFBMUIsQ0FBakMsR0FBaUUsVUFBekU7QUFDQTVCLG1CQUFRLHNDQUFxQzBRLFNBQVMzTyxDQUFULEVBQVlyRixJQUFqRCxHQUF3RCxPQUFoRTtBQUNBc0QsbUJBQUssUUFBTDtBQUNIO0FBQ0RBLGVBQUssUUFBTDs7QUFFQXBELFVBQUUsZUFBRixFQUFtQm9DLElBQW5CLENBQXdCZ0IsR0FBeEI7QUFDSDtBQXZJUSxDQUFiOztrQkEwSWVxUSxNOzs7Ozs7Ozs7Ozs7QUMxSWYsSUFBSU8sVUFBVTtBQUNWcFQsVUFBTSxFQURJO0FBRVZSLFVBQU0sY0FBU3lDLEVBQVQsRUFBWTtBQUFBOztBQUNkLFlBQUlLLE9BQU8sSUFBWDs7QUFFQTFDLGlCQUFTUSxRQUFULEdBQW9CQyxHQUFwQixDQUF3QixPQUF4QixFQUFpQ0MsSUFBakMsQ0FBc0MsT0FBdEMsRUFBK0MsZ0JBQVE7QUFDbkQsZ0JBQUkyRCxPQUFPekQsS0FBS0MsR0FBTCxFQUFYOztBQUdBLGlCQUFLLElBQUlDLEdBQVQsSUFBZ0J1RCxJQUFoQixFQUFzQjtBQUNsQixvQkFBR3ZELFFBQVF1QixFQUFYLEVBQWM7QUFDViwwQkFBS2pDLElBQUwsQ0FBVVUsR0FBVixJQUFpQjtBQUNieEIsOEJBQU0rRSxLQUFLdkQsR0FBTCxFQUFVeEI7QUFESCxxQkFBakI7QUFHSDtBQUNKO0FBQ0RFLGNBQUUsV0FBRixFQUFlaVUsT0FBZixDQUF1Qiw4QkFBdkI7O0FBRUFqVSxjQUFFLFdBQUYsRUFBZXVELEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsY0FBM0IsRUFBMkMsWUFBVTtBQUNqRHZELGtCQUFFLFdBQUYsRUFBZUUsV0FBZixDQUEyQixZQUEzQjtBQUNBRixrQkFBRSxJQUFGLEVBQVFHLFFBQVIsQ0FBaUIsWUFBakI7QUFDQUgsa0JBQUUsUUFBRixFQUFZRyxRQUFaLENBQXFCLGFBQXJCO0FBQ0FILGtCQUFFLGdCQUFGLEVBQW9CRSxXQUFwQixDQUFnQyxhQUFoQztBQUNILGFBTEQ7O0FBT0FGLGNBQUUsa0JBQUYsRUFBc0IwRCxZQUF0QixDQUFtQztBQUMvQkMsd0JBQVEsR0FEdUI7QUFFL0JDLDBCQUFVLENBRnFCO0FBRy9CQyw0QkFBYSxvQkFBVUMsSUFBVixFQUFnQkMsT0FBaEIsRUFBeUI7QUFDbENiLHlCQUFLZ0ssT0FBTDtBQUNILGlCQUw4QjtBQU0vQmxKLDBCQUFVLGtCQUFTQyxJQUFULEVBQWM7QUFDcEJpRSw0QkFBUUMsR0FBUixDQUFZbEUsSUFBWjtBQUNIO0FBUjhCLGFBQW5DOztBQVdBLGtCQUFLaUosT0FBTDtBQUNILFNBaENEO0FBaUNILEtBdENTOztBQXdDVkEsYUFBUyxtQkFBVSxDQUVsQjs7QUExQ1MsQ0FBZDs7a0JBOENlOEcsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGFjYTZhNjMzZjU5YTliNmU4M2QzIiwiaW1wb3J0IEF0dGVuZCBmcm9tIFwiLi9tb2R1bGVzL2F0dGVuZC5qc1wiO1xyXG5pbXBvcnQgQ2l0eSBmcm9tIFwiLi9tb2R1bGVzL2NpdHkuanNcIjtcclxuaW1wb3J0IFN1YndheSBmcm9tIFwiLi9tb2R1bGVzL3N1YndheS5qc1wiO1xyXG5pbXBvcnQgQWNjb3VudCBmcm9tIFwiLi9tb2R1bGVzL2FjY291bnQuanNcIjtcclxuXHJcbmxldCB1bmluZmxhdGVkID0ge1xyXG4gICAgYXR0ZW5kOnRydWUsXHJcbiAgICBjaXR5OnRydWVcclxufVxyXG5cclxubGV0IHVfaSA9IHtcclxuICAgIG1haWw6XCJcIixcclxuICAgIG5hbWU6XCJcIixcclxuICAgIGdyYWRlOjBcclxufVxyXG5cclxuJChcIiNuYXZfYXR0ZW5kXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiaGVhZGVyIGxpXCIpLnJlbW92ZUNsYXNzKFwiLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5wYWdlcy5hdHRlbmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgaWYodW5pbmZsYXRlZC5hdHRlbmQpe1xyXG4gICAgICAgIEF0dGVuZC5pbml0KHVfaS5tYWlsLCB1X2kubmFtZSwgdV9pLmdyYWRlKTtcclxuICAgICAgICB1bmluZmxhdGVkLmF0dGVuZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59KVxyXG4kKFwiI25hdl9jaXR5XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiaGVhZGVyIGxpXCIpLnJlbW92ZUNsYXNzKFwiLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5wYWdlcy5jaXR5XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgIGlmKHVuaW5mbGF0ZWQuY2l0eSl7XHJcbiAgICAgICAgQ2l0eS5pbml0KHVfaS5tYWlsLCB1X2kubmFtZSwgdV9pLmdyYWRlKTtcclxuICAgICAgICB1bmluZmxhdGVkLmNpdHkgPSBmYWxzZTtcclxuICAgIH1cclxufSlcclxuJChcIiNuYXZfc3Vid2F5XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiaGVhZGVyIGxpXCIpLnJlbW92ZUNsYXNzKFwiLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5wYWdlcy5zdWJ3YXlcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgU3Vid2F5LmluaXQoKTtcclxufSlcclxuXHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICB2YXIgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24odXNlcikge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgbGV0IHVzZXJNYWlsID0gdXNlci5lbWFpbC5zcGxpdCgnQCcpWzBdXHJcbiAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICBsZXQgdXNlckRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgIGlmKHVzZXJEYXRhW3VzZXJNYWlsXSl7XHJcbiAgICAgICAgICAgICAgICAgIGlmKHVzZXJEYXRhW3VzZXJNYWlsXS51aWQgPSB1c2VyLnVpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICB1X2kubWFpbCA9IHVzZXJNYWlsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdV9pLm5hbWUgPSB1c2VyLmRpc3BsYXlOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdV9pLmdyYWRlID0gdXNlckRhdGFbdXNlck1haWxdLmdyYWRlKjFcclxuICAgICAgICAgICAgICAgICAgICAgIEF0dGVuZC5pbml0KHVfaS5tYWlsLCB1X2kubmFtZSwgdV9pLmdyYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIENpdHkuaW5pdCh1X2kubWFpbCwgdV9pLm5hbWUsIHVfaS5ncmFkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZih1X2kuZ3JhZGUgPT09IDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFjY291bnQuaW5pdCh1c2VyLm1haWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIHVuaW5mbGF0ZWQuYXR0ZW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICBsb2dpbih1X2kubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIilcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICBhbGVydChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gVXNlciBpcyBzaWduZWQgaW4uXHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIE5vIHVzZXIgaXMgc2lnbmVkIGluLlxyXG4gICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHVzZXIgPSByZXN1bHQudXNlcjtcclxuICAgICAgICAgICAgbGV0IHVzZXJNYWlsID0gdXNlci5lbWFpbC5zcGxpdCgnQCcpWzBdXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJEYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgIGlmKHVzZXJEYXRhW3VzZXJNYWlsXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodXNlckRhdGFbdXNlck1haWxdLnVpZCA9IHVzZXIudWlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdV9pLm1haWwgPSB1c2VyTWFpbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdV9pLm5hbWUgPSB1c2VyLmRpc3BsYXlOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1X2kuZ3JhZGUgPSB1c2VyRGF0YVt1c2VyTWFpbF0uZ3JhZGUqMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdHRlbmQuaW5pdCh1X2kubWFpbCwgdV9pLm5hbWUsIHVfaS5ncmFkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaW5mbGF0ZWQuYXR0ZW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luKHVfaS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgIC8vIEhhbmRsZSBFcnJvcnMgaGVyZS5cclxuICAgICAgICAgIHZhciBlcnJvckNvZGUgPSBlcnJvci5jb2RlO1xyXG4gICAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgICAvLyBUaGUgZW1haWwgb2YgdGhlIHVzZXIncyBhY2NvdW50IHVzZWQuXHJcbiAgICAgICAgICB2YXIgZW1haWwgPSBlcnJvci5lbWFpbDtcclxuICAgICAgICAgIC8vIFRoZSBmaXJlYmFzZS5hdXRoLkF1dGhDcmVkZW50aWFsIHR5cGUgdGhhdCB3YXMgdXNlZC5cclxuICAgICAgICAgIHZhciBjcmVkZW50aWFsID0gZXJyb3IuY3JlZGVudGlhbDtcclxuICAgICAgICAgIC8vIC4uLlxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBsb2dpbihuYW1lKXtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5odG1sKG5hbWVbMV0rXCLtlZghXCIpO1xyXG4gICAgJChcIi5oZWxsb1dvcmxkXCIpLmF0dHIoXCJ0aXRsZVwiLG5hbWUrXCLri5gg7JWI64WV7ZWY7IS47JqUIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGNvbmZpcm0obmFtZStcIuuLmCDroZzqt7jslYTsm4Mg7ZWY7Iuc6rKg7Iq164uI6rmMP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgICAvLyBBbiBlcnJvciBoYXBwZW5lZC5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9pbmRleC5qcyIsInZhciBBdHRlbmQgPSB7XHJcbiAgICBtb2JpbGU6IGZhbHNlLFxyXG5cclxuICAgIGlkOiBcIlwiLFxyXG5cclxuICAgIHZpZXdJRDogXCJcIixcclxuICAgIC8v6rSA66as7J6Q6rCAIOuLpOuluCDsgqzrnozsnZggSUQg7ZmV7J247KSRXHJcblxyXG4gICAgYXR0ZW5kT2JqOiB7fSxcclxuXHJcbiAgICBzYWxhcnk6IHt9LFxyXG5cclxuXHJcbiAgICB3ZWVrZGF5czogW1wi7J28XCIsIFwi7JuUXCIsIFwi7ZmUXCIsIFwi7IiYXCIsIFwi66qpXCIsIFwi6riIXCIsIFwi7YagXCIsIFwi7J28XCJdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGlkLCBuYW1lLCBncmFkZSl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnlcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHRoYXQuc2FsYXJ5ID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGdyYWRlID09PSA1KXtcclxuICAgICAgICAgICAgICAgICQoXCIud29ya2VyX3NlbGVjdG9yXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIubG9hZGluZ1ZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VycyA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbWFpbElEIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPG9wdGlvbiB2YWx1ZT1cIicrbWFpbElEKydcIj4nK3VzZXJzW21haWxJRF0ubmFtZSsnPC9vcHRpb24+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5odG1sKHR4dCkudmFsKGlkKS5wcm9wKFwic2VsZWN0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5sb2FkaW5nVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRPYmogPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iailcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoISQoXCIuZmMtaGVhZGVyLXRvb2xiYXJcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTY0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5Q2xpY2s6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRXb3JrSG91cihkYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuYXR0ZW5kVmlld19pbnB1dFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfaW5wdXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCIuYXR0ZW5kVmlld19TaG93XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5jb25maXJtXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJCh0aGlzKS5hdHRyKFwiZGlkXCIpKTtcclxuICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmNsb3NlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIuYmxhY2tTY3JlZW5cIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiYm9keVwiKS5rZXl1cChmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgaWYoJChcIi5tb2RhbCAuY29uZmlybVwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBlLndoaWNoOyAvLyByZWNvbW1lbmRlZCB0byB1c2UgZS53aGljaCwgaXQncyBub3JtYWxpemVkIGFjcm9zcyBicm93c2Vyc1xyXG4gICAgICAgICAgICAgICAgaWYoY29kZT09MTMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJChcIi5tb2RhbCAuY29uZmlybVwiKS5hdHRyKFwiZGlkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5jaGFuZ2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld193b3JrZXIoaWQpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHZpZXdfd29ya2VyOiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZihpZCA9PT0gdGhhdC5pZCl7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19jYWxlbmRhclwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fbW9udGhcIikuaHRtbChcIlwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX2NhbGVuZGFyXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgIGlmKHRoYXQudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoYXQudmlld0lEKS5vZmYoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIraWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmF0dGVuZE9iaiA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeW8gPSB0aGF0LnZpZXdJRDtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlld0lEID0gaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoeW8ubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhhdC5pZCAhPT0gdGhhdC52aWV3SUQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iailcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5Q2xpY2s6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFdvcmtIb3VyKGRhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jYWxlbmRhcjogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5hdHRlbmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmZjLWRheVwiKS5odG1sKFwiXCIpO1xyXG5cclxuICAgICAgICBpZihkYXRhLmF0dGVuZCl7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmF0dGVuZFxyXG4gICAgICAgICAgICBmb3IgKHZhciBkYXRlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlSUQgPSBkYXRlLnNsaWNlKDAsNCkrXCItXCIrZGF0ZS5zbGljZSg0LDYpK1wiLVwiK2RhdGUuc2xpY2UoNiw4KTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAwXHJcbiAgICAgICAgICAgICAgICBsZXQgdHh0ID0gJzxwPicrZGF0YVtkYXRlXVswXS5mcm9tK1wiflwiK2RhdGFbZGF0ZV1bMF0udG8rJzwvcD4nXHJcbiAgICAgICAgICAgICAgICAvL+uRkO2DgOyehCDrgpjriKDshJwg6re866y07ZaI7Ja064+EIOuLrOugpeyXkCDtkZzsi5zrkJjripQg6rKD7J2AIOyyq+2DgOyehCDqt7zrrLTsi5zqsITrp4xcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWYgKz0gZGF0YVtkYXRlXVtpXS5kaWZcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8cD4nICsgTWF0aC5mbG9vcihkaWYvNjApICsgXCLsi5zqsIQgXCIrIGRpZiU2MCArXCLrtoRcIisnPC9wPidcclxuICAgICAgICAgICAgICAgICQoJy5mYy1kYXlbZGF0YS1kYXRlPVwiJytkYXRlSUQrJ1wiXScpLmh0bWwodHh0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBkdXJNb24gPSAwO1xyXG4gICAgICAgICAgICBsZXQgdGhpc01vbnRoID0gJyc7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5hdHRlbmQgLmZjLWRheVwiKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGVEb20gPSAkKFwiLmF0dGVuZCAuZmMtZGF5XCIpLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgaWYoIWRhdGVEb20uaGFzQ2xhc3MoXCJmYy1vdGhlci1tb250aFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBkYXRlRG9tLmF0dHIoXCJkYXRhLWRhdGVcIikuc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNNb250aCA9IGRhdGVbMF0rZGF0ZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZVswXStkYXRlWzFdK2RhdGVbMl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbZGF0ZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1ck1vbiArPSBkYXRhW2RhdGVdW2pdLmRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHR4dCA9ICcnXHJcblxyXG4gICAgICAgICAgICBpZigkKFwiLmZjLXZpZXctY29udGFpbmVyXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykgeyAgIC8v66y07KGw6rG0IDbso7xcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla0RvbSA9ICQoXCIuZmMtd2Vla1wiKS5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla0R1ciA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXlEb20gPSB3ZWVrRG9tLmZpbmQoXCIuZmMtZGF5XCIpLmVxKGopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gZGF5RG9tLmF0dHIoXCJkYXRhLWRhdGVcIikuc3BsaXQoXCItXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlWzBdK2RhdGVbMV0rZGF0ZVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrRHVyICs9IGRhdGFbZGF0ZV1ba10uZGlmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2Vla0R1cj4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj4nKyBNYXRoLmZsb29yKHdlZWtEdXIvNjApKyfsi5zqsIQgJyt3ZWVrRHVyJTYwKyfrtoQnICsnPC9wPidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj48L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKHR4dClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoJChcIi5mYy1sZWZ0XCIpLmNoaWxkcmVuKFwiaDIuZHVyTW9udGhcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICQoXCJoMi5kdXJNb250aFwiKS5odG1sKCcgKCcrTWF0aC5mbG9vcihkdXJNb24vNjApKyfsi5zqsIQgJytkdXJNb24lNjArJ+u2hCknKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuZmMtbGVmdFwiKS5hcHBlbmQoJzxoMiBjbGFzcz1cImR1ck1vbnRoXCI+ICgnK01hdGguZmxvb3IoZHVyTW9uLzYwKSsn7Iuc6rCEICcrZHVyTW9uJTYwKyfrtoQpPC9oMj4nKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQgPSAnJzsgICAvL3ZhciDrubzrqLnsnYDqsbAg7JWE64uYLiDsnITsl5DshJwg7ISg7Ja4IO2WiOydjCFcclxuXHJcbiAgICAgICAgICAgIGxldCBmdWxsTW9udGhCb251cyA9IDMwNDAwO1xyXG4gICAgICAgICAgICBsZXQgaW5zdXJhbmNlRmVlID0gMDtcclxuICAgICAgICAgICAgbGV0IGJhc2ljID0gTWF0aC5yb3VuZChkdXJNb24vNjAqNzYwMClcclxuICAgICAgICAgICAgbGV0IGZ1bGxXZWVrQnVudXMgPSBNYXRoLnJvdW5kKChkdXJNb24vNjAqNzYwMCkqMC4yKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmKHRoaXMuaWQgPT09IHRoaXMudmlld0lEKXtcclxuICAgICAgICAgICAgLy8gICAgIC8v67O47J24IOuqqOuTnFxyXG4gICAgICAgICAgICAvLyAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhY2NvdW50L3NhbGFyeS9cIit0aGlzTW9udGgrXCIvXCIrdGhpcy5pZCkudXBkYXRlKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBiYXNpYzogYmFzaWMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbFdlZWtCdW51czogZnVsbFdlZWtCdW51cyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsTW9udGhCb251czogZnVsbE1vbnRoQm9udXNcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnkvXCIrdGhpc01vbnRoK1wiL1wiK3RoaXMudmlld0lEKS51cGRhdGUoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJhc2ljOiBiYXNpYyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsV2Vla0J1bnVzOiBmdWxsV2Vla0J1bnVzLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxNb250aEJvbnVzOiBmdWxsTW9udGhCb251c1xyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuq4sOuzuOq4iTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoYmFzaWMpKyBcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6re866y07Iuc6rCEIFggNyw2MDDsm5A8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuyjvO2ctOyImOuLuTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoZnVsbFdlZWtCdW51cykgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7quLDrs7jquInsnZggMjAlPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7sl7DssKjsiJjri7k8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGZ1bGxNb250aEJvbnVzKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPjXsi5zqsIQg7IOB64u5IOq4sOuzuOq4iTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZSBhdHRlbmRfX21vbnRoX19saW5lLS1yZWRcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7IKs7ZqM67O07ZeY66OMPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShpbnN1cmFuY2VGZWUpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6rWt66+87Jew6riIL+qzoOyaqeuztO2XmC/qsbTqsJXrs7Ttl5gg7LKt6rWs7JWhPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lIGF0dGVuZF9fbW9udGhfX2xpbmUtLXN1bVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7tlanqs4Q8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGJhc2ljICsgZnVsbFdlZWtCdW51cyArIGZ1bGxNb250aEJvbnVzIC0gaW5zdXJhbmNlRmVlKSArXCLsm5A8L3A+XCJcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6riw67O46riJICsg7KO87Zy07IiY64u5ICsg7Jew7LCo7IiY64u5IC0g7IKs7ZqM67O07ZeY66OMPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX21vbnRoXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0V29ya0hvdXI6IGZ1bmN0aW9uKGRhdGVPYmope1xyXG4gICAgICAgIC8vIGNzczogbW9kdWxlcy9hdHRlbmQuY3NzXHJcbiAgICAgICAgbGV0IGRhdGVTaG9ydCA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoXCJNTS9ERFwiKTtcclxuICAgICAgICBsZXQgZGF0ZUlEID0gbW9tZW50KGRhdGVPYmopLmZvcm1hdChcIllZWVlNTUREXCIpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHt9XHJcbiAgICAgICAgaWYodGhpcy5hdHRlbmRPYmouYXR0ZW5kW2RhdGVJRF0pe1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5hdHRlbmRPYmouYXR0ZW5kW2RhdGVJRF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG5cclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYmxhY2tTY3JlZW5cIj4nXHJcbiAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cImlucHV0V2luZG93XCI+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8cCBjbGFzcz1cInRpdGxlXCI+JytkYXRlU2hvcnQrJyDqt7zrrLTsi5zqsIQ8L3A+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPidcclxuICAgICAgICBpZihkYXRhWzBdKXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cImZpcnN0X2Zyb21cIiB2YWx1ZT1cIicrZGF0YVswXS5mcm9tKydcIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwiZmlyc3RfdG9cIiB2YWx1ZT1cIicrZGF0YVswXS50bysnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPidcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cImZpcnN0X2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwiZmlyc3RfdG9cIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+J1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPidcclxuICAgICAgICBpZihkYXRhWzFdKXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCIgdmFsdWU9XCInK2RhdGFbMV0uZnJvbSsnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiIHZhbHVlPVwiJytkYXRhWzFdLnRvKydcIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+J1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwic2Vjb25kX2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwic2Vjb25kX3RvXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImJvdHRvbVwiPidcclxuICAgICAgICB0eHQrPSAgICAgICAgICAgJzxwIGNsYXNzPVwiY29uZmlybVwiIGRpZD1cIicrZGF0ZUlEKydcIj7tmZXsnbg8L3A+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgICAnPHAgY2xhc3M9XCJjbG9zZVwiPuy3qOyGjDwvcD4nXHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICc8L2Rpdj4nXHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tb2JpbGUpe1xyXG4gICAgICAgICAgICAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLkFueVBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICBkYXRlVGltZUZvcm1hdDpcIkhIOm1tXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjZmlyc3RfZnJvbVwiKS5mb2N1cygpO1xyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFdvcmtIb3VyOiBmdW5jdGlvbihkYXRlKXtcclxuXHJcbiAgICAgICAgbGV0IHdvcmsgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IGFsbEVtcHR5ID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5lcShpKS52YWwoKS5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgICAgICBhbGxFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihhbGxFbXB0eSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMudmlld0lEK1wiL2F0dGVuZC9cIitkYXRlKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkK1wiL2F0dGVuZC9cIitkYXRlKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJChcIi5tb2RhbFwiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0ZUlEID0gZGF0ZS5zbGljZSgwLDQpICsgXCItXCIrZGF0ZS5zbGljZSg0LDYpICsgXCItXCIrZGF0ZS5zbGljZSg2LDgpXHJcbiAgICAgICAgICAgICQoJy5mYy1kYXlbZGF0YS1kYXRlPVwiJytkYXRlSUQrJ1wiXScpLmh0bWwoXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmKCQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG4gICAgICAgICAgICAvL+yLnOyekeyLnOqwhOydtCDsnpgg7J6F66Cl65CY7JeI64KYIO2ZleyduFxyXG5cclxuICAgICAgICAgICAgaWYoZGF0ZTxtb21lbnQoKS5mb3JtYXQoXCJZWVlZTU1ERFwiKSl7XHJcbiAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy/snbTsoITsnbzsnbQg7JWE64uI642U652864+EIOyYiOyDgSDqt7zrrLTsi5zqsITsnbTrnbzrj4Qg7J6F66Cl7ZW07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgaWYoJChcIiNmaXJzdF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuyYiOyDgSDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmcm9tID0gJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpXHJcbiAgICAgICAgICAgIGxldCB0byA9ICQoXCIjZmlyc3RfdG9cIikudmFsKClcclxuXHJcbiAgICAgICAgICAgIGxldCBmcm9tQSA9IGZyb20uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICBsZXQgdG9BID0gdG8uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICBsZXQgZGlmID0gKHRvQVswXSoxIC0gZnJvbUFbMF0qMSkqNjAgKyAodG9BWzFdKjEgLSBmcm9tQVsxXSoxKVxyXG5cclxuXHJcbiAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgdG86IHRvLFxyXG4gICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi6re866y07Iuc6rCE7J20IOyemOuquyDsnoXroKXrkJjsl4jsirXri4jri6QuIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZigkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRlPG1vbWVudCgpLmZvcm1hdChcIllZWVlNTUREXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/snbTsoITsnbzsnbQg7JWE64uI642U652864+EIOyYiOyDgSDqt7zrrLTsi5zqsITsnbTrnbzrj4Qg7J6F66Cl7ZW07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg7JiI7IOBIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZnJvbSA9ICQoXCIjc2Vjb25kX2Zyb21cIikudmFsKClcclxuICAgICAgICAgICAgICAgIGxldCB0byA9ICQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb21BID0gZnJvbS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9BID0gdG8uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgd29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOq3vOustOyLnOqwhOydtCDsnpjrqrsg7J6F66Cl65CY7JeI7Iq164uI64ukLiBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy52aWV3SUQrXCIvYXR0ZW5kL1wiK2RhdGUpLnNldCh3b3JrKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCtcIi9hdHRlbmQvXCIrZGF0ZSkuc2V0KHdvcmspO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5odG1sKFwiXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdHRlbmQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvYXR0ZW5kLmpzIiwiaW1wb3J0IFNwb3QgZnJvbSBcIi4vY2l0eS9zcG90LmpzXCI7XHJcbi8v6rSA6rSR7KeAIOygleumrFxyXG5pbXBvcnQgSG90ZWwgZnJvbSBcIi4vY2l0eS9ob3RlbC5qc1wiO1xyXG4vL+2YuO2FlOygleuztCDqtIDroKhcclxuaW1wb3J0IEFyZWEgZnJvbSBcIi4vY2l0eS9hcmVhLmpzXCI7XHJcbi8v7KeA7JetIOuNsOydtO2EsCDsnoXroKVcclxuXHJcbmxldCBDaXR5ID0ge1xyXG4gICAgY29kZURhdGE6IHt9LFxyXG4gICAgY2l0eURhdGE6IHt9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5jaXR5Q29kZVZpZXdcIikub24oXCJjbGlja1wiLCBcIi5zcG90c1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgY2lkID0gJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5uYW1lXCIpLmh0bWwoKTtcclxuICAgICAgICAgICAgU3BvdC5pbml0KHRoYXQuY2l0eURhdGFbY2lkXSwgY2lkLCBuYW1lKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLm9uKFwiY2xpY2tcIiwgXCIuaG90ZWxzXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCBjaWQgPSAkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLm5hbWVcIikuaHRtbCgpO1xyXG4gICAgICAgICAgICBIb3RlbC5pbml0KHRoYXQuY2l0eURhdGFbY2lkXSwgY2lkLCBuYW1lKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLm9uKFwiY2xpY2tcIiwgXCIuYXJlYVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgY2lkID0gJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5uYW1lXCIpLmh0bWwoKTtcclxuICAgICAgICAgICAgQXJlYS5pbml0KHRoYXQuY2l0eURhdGFbY2lkXSwgY2lkLCBuYW1lKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5vbihcImNsaWNrXCIsIFwiLnRyYW5zcG9ydFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0Lm1ldHJvQWRqdXN0KCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpKTtcclxuICAgICAgICAgICAgLy/rj4Tsi5zrs4TroZwg66mU7Yq466GcIOygleuztOulvCDri6Trk6zripTrjbAg7IKs7JqpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5oZWFkZXJfX3JldHVyblwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LnJldHVyblRvQ2l0eVZpZXcoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICByZXR1cm5Ub0NpdHlWaWV3OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoXCIuY2l0eV9fcGFnZXNcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuY2l0eSAuc3BvdCAuY2hlY2tcIikuaHRtbChcIlwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbmZsYXRlX2NpdHlDb2RlVmlldyh0aGlzLmNvZGVEYXRhLCB0aGlzLmNpdHlEYXRhKVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRyb0FkanVzdDogZnVuY3Rpb24oY2lkKXtcclxuICAgICAgICBpZih0aGlzLmNpdHlEYXRhW2NpZF0ubWV0cm8pe1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuY2l0eURhdGFbY2lkXS5tZXRyb1xyXG4gICAgICAgICAgICBsZXQgbmFtZUFycmF5ID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldHJvID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGlmKCFtZXRyby5saW5lKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtZXRyby5uYW1lKVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaWQrXCIvbWV0cm9cIikudXBkYXRlKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIGluZmxhdGVfY2l0eUNvZGVWaWV3OiBmdW5jdGlvbihjb2RlRGF0YSxkYXRhKXtcclxuICAgICAgICBsZXQgdHh0ID0gJzxkaXYgY2xhc3M9XCJsaW5lIHRvcFwiPjxwIGNsYXNzPVwibmFtZVwiPuuPhOyLnOuqhTwvcD48cCBjbGFzcz1cImhvdGVsc1wiPuyImeyGjDwvcD48cCBjbGFzcz1cInNwb3RzXCI+6rSA6rSR7KeAIOygleumrDwvcD48cCBjbGFzcz1cImFyZWFcIj7sp4Dsl608L3A+PHAgY2xhc3M9XCJ0cmFuc3BvcnRcIj7qtZDthrU8L3A+PHAgY2xhc3M9XCJwcmljZVwiPuusvOqwgDwvcD48L2Rpdj4nXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2l0eSA9IGNvZGVEYXRhW2ldO1xyXG4gICAgICAgICAgICBpZihkYXRhW2NpdHkuY29kZV0pe1xyXG4gICAgICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImxpbmVcIiBpZD1cIicrY2l0eS5jb2RlKydcIj48cCBjbGFzcz1cIm5hbWVcIj4nK2NpdHkubmFtZSsnPC9wPidcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW2NpdHkuY29kZV0uaG90ZWxzKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJob3RlbHNcIj5PPC9wPidcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cImhvdGVsc1wiPlg8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbY2l0eS5jb2RlXS5zcG90cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBkYXRhW2NpdHkuY29kZV0uc3BvdHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbY2l0eS5jb2RlXS5zdGF0dXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2NpdHkuY29kZV0uc3RhdHVzLnNwb3RzID09PSBcImZpbmlzaGVkXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwic3BvdHNcIj7rjbDsnbTthLAg7ZmV67O0IOyZhOujjDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGRhdGFbY2l0eS5jb2RlXS5zdGF0dXMuc3BvdHMgPT09IFwidmVyaWZ5aW5nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwic3BvdHNcIj7rjbDsnbTthLAg7ISg67OELCAy7LCoIOqygOymneykkTwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNwb3QuY29tYmluaW5nKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInNwb3RzXCI+642w7J207YSwIO2Vqey5mOq4sCDsnpHsl4XspJE8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInNwb3RzXCI+642w7J207YSwIOyImOynkSwgMeywqCDqsoDspp3spJE8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoc3BvdC5jb21iaW5pbmcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJzcG90c1wiPuuNsOydtO2EsCDtlansuZjquLAg7J6R7JeF7KSRPC9wPidcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwic3BvdHNcIj7rjbDsnbTthLAg7IiY7KeRLCAx7LCoIOqygOymneykkTwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFkYXRhW2NpdHkuY29kZV0uc3RhdHVzKXtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIisgY2l0eS5jb2RlICsgXCIvc3RhdHVzXCIpLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb3RzOmZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW2NpdHkuY29kZV0uYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwiYXJlYVwiPk88L3A+J1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwiYXJlYVwiPlg8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVtjaXR5LmNvZGVdLm1ldHJvKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJ0cmFuc3BvcnRcIj5PPC9wPidcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInRyYW5zcG9ydFwiPlg8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbY2l0eS5jb2RlXS5wcmljZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicHJpY2VcIj5PPC9wPidcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInByaWNlXCI+WDwvcD4nXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHh0Kz0gJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImxpbmVcIiBpZD1cIicrY2l0eS5jb2RlKydcIj48cCBjbGFzcz1cIm5hbWUgbm9kYXRhXCI+JytjaXR5Lm5hbWUrJzwvcD4nXHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxzXCI+WDwvcD48cCBjbGFzcz1cInNwb3RzXCI+642w7J207YSwIOyXhuydjDwvcD48cCBjbGFzcz1cImFyZWFcIj5YPC9wPjxwIGNsYXNzPVwidHJhbnNwb3J0XCI+WDwvcD48cCBjbGFzcz1cInByaWNlXCI+WDwvcD48L2Rpdj4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLmh0bWwodHh0KVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oaWQsIG5hbWUsIGdyYWRlKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+e1xyXG4gICAgICAgICAgICAkKFwiLmxvYWRpbmdWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIilcclxuICAgICAgICAgICAgbGV0IGNvZGVEYXRhID0gc25hcC52YWwoKS5zZXR0aW5nLmNpdGllcztcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBzbmFwLnZhbCgpLmNpdGllc1xyXG4gICAgICAgICAgICB0aGlzLmNpdHlEYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5jb2RlRGF0YSA9IGNvZGVEYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGVfY2l0eUNvZGVWaWV3KGNvZGVEYXRhLCBkYXRhKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaXR5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkuanMiLCJpbXBvcnQgTWFudWFsQ29tYmluZSBmcm9tIFwiLi9tYW51YWxDb21iaW5lLmpzXCI7XHJcbmltcG9ydCBWZXJpZnkgZnJvbSBcIi4vc3BvdC92ZXJpZnlpbmcuanNcIjtcclxuXHJcbi8vU3BvdOydmCDri6jqs4TripQg7LSdIDTri6jqs4QgLSDrjbDsnbTthLAg7IiY7KeRLzHssKjqsoDspp0gLT4g642w7J207YSwIO2Vqey5mOq4sCAtPiDrjbDsnbTthLAg7ISg67OELzLssKjqsoDspp0gLT4g7JmE66OMXHJcblxyXG5sZXQgU3BvdCA9IHtcclxuXHJcbiAgICBkYXRhOnt9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19jb25maXJtXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuaW5wdXRDb29yZGluYXRlKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19zcG90Q29vclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19zcG90RGVsZXRlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsZXRlU3BvdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fc3BvdE5hbWVcIikuaHRtbCgpKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLnNwb3QgLmNoZWNrXCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LnNldFJlbWFpbk51bWJlcigkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fcmVtYWluTnVtYmVyXCIpLnZhbCgpKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaWQsIG5hbWUpe1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuY2l0eSAuc3BvdFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuY2l0eU5hbWVcIikuaHRtbChuYW1lKS5hdHRyKFwiaWRcIiwgY2lkKTtcclxuXHJcbiAgICAgICAgaWYoZGF0YS5zdGF0dXMpe1xyXG4gICAgICAgICAgICBpZihkYXRhLnN0YXR1cy5zcG90cyA9PT0gXCJmaW5pc2hlZFwiKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi642w7J207YSwIO2ZleuztCDsmYTro4xcIik7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGRhdGEuc3RhdHVzLnNwb3RzID09PSBcInZlcmlmeWluZ1wiKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi642w7J207YSwIOyEoOuzhCwgMuywqCDqsoDspp3spJFcIik7XHJcbiAgICAgICAgICAgICAgICBWZXJpZnkuaW5pdChkYXRhLnNwb3RzLmNvbWJpbmVkKTtcclxuICAgICAgICAgICAgICAgIC8vY29tYmluZWTqsIAg7J6I6rOgIGNvbWJpbmluZ+ydtCDsl4bsnLzrqbQgMeywqCDsnpDro4zsoJXrpqwg7JmE66OM652864qUIOucu1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoZGF0YS5zcG90cy5jb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi7ZWp7LmY6riwIOyekeyXheykkVwiKTtcclxuICAgICAgICAgICAgICAgIC8vY29tYmluaW5n7J20IOyeiOycvOuptCDtlansuZjquLAg7J6R7JeF7KSR7J20652864qUIOucu1xyXG4gICAgICAgICAgICAgICAgTWFudWFsQ29tYmluZS5pbml0KGRhdGEuc3BvdHMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGVjayhkYXRhLnNwb3RzKTsgLy9jb21iaW5pbmcsIGNvbWJpbmVk6rCAIOyXhuycvOuptCDrjbDsnbTthLAg7IiY7KeRLCDqsoDspp3spJHsnbTrnbzripQg65y7XHJcbiAgICAgICAgICAgICAgICAvL2ZpcnN0Y2hlY2vrpbwg7Ya16rO87ZWY66m0IHRoaXMuYXV0b0NvbWJpbmXsnYQg7Ya17ZW0IGRhdGEuc3BvdHMuY29tYmluaW5n7J20IOunjOuTpOyWtOynkFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnNwb3RzLmNvbWJpbmluZykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLtlansuZjquLAg7J6R7JeF7KSRXCIpXHJcbiAgICAgICAgICAgICAgICAvL2NvbWJpbmluZ+ydtCDsnojsnLzrqbQg7ZWp7LmY6riwIOyekeyXheykkeydtOudvOuKlCDrnLtcclxuICAgICAgICAgICAgICAgIE1hbnVhbENvbWJpbmUuaW5pdChkYXRhLnNwb3RzKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hlY2soZGF0YS5zcG90cyk7IC8vY29tYmluaW5nLCBjb21iaW5lZOqwgCDsl4bsnLzrqbQg642w7J207YSwIOyImOynkSwg6rKA7Kad7KSR7J20652864qUIOucu1xyXG4gICAgICAgICAgICAgICAgLy9maXJzdGNoZWNr66W8IO2GteqzvO2VmOuptCB0aGlzLmF1dG9Db21iaW5l7J2EIO2Gte2VtCBkYXRhLnNwb3RzLmNvbWJpbmluZ+ydtCDrp4zrk6TslrTsp5BcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBhdXRvQ29tYmluZV9fc3BvdFJlc3RydWN0dXJlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGVBcnIgPSBbXCJnZ1wiLFwibHBcIixcIm52XCIsXCJ0YVwiXTtcclxuICAgICAgICBsZXQgY29tYmluaW5nID0ge307XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhLnNwb3RzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpdGVBcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpdGUgPSBzaXRlQXJyW2pdO1xyXG4gICAgICAgICAgICBpZihkYXRhW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbc2l0ZV0ubm9EYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbc2l0ZV1baV0mJiFkYXRhW3NpdGVdW2ldLmRlbGV0ZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFNwb3QgPSBkYXRhW3NpdGVdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/quLDsobQg7KCV67O066W8IG9sZFNwb3TsnbTrnbzqs6Ag7ZWY7J6QLiDsg4jroZzsmrQg7Iqk7Yyf7KCV67O07JeQ64qUIOydtOumhOydhCDtlZwv7JiB7Jy866GcIOu2hO2VoO2VmOqzoCDrnq3tgrnsnYQg67aA7Jes7ZWgIOqyg+ydtOuLpC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga286XCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW46XCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcjogb2xkU3BvdC5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6e1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvW+qwgC3tnqNdLy50ZXN0KG9sZFNwb3QubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm5hbWUua28gPSBvbGRTcG90Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5lbiA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QucmFua1tzaXRlXSA9IGk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYob2xkU3BvdC51cmwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudXJsID0gb2xkU3BvdC51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvbGRTcG90LnRhZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC50YWcgPSBvbGRTcG90LnRhZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb3VudGVyPDEwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzMDBcIitjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjb3VudGVyPDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczBcIitjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzXCIrY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IC8v7ZWc67CU7YC0IOuPjOyVmOuLuVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hdXRvQ29tYmluZV9fY29tYmluZShjb21iaW5pbmcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhdXRvQ29tYmluZV9fY29tYmluZTogZnVuY3Rpb24oY29tYmluaW5nKXtcclxuICAgICAgICAvLyBUT0RPOiDrgZ3rgpjrqbQg7ZWp7LmY6riwIOyekeyXhSDtmZTrqbQgaW5mbGF0Ze2VmOq4sFxyXG5cclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG5cclxuICAgICAgICBsZXQgY29tYmluZU9iaiA9IHt9XHJcbiAgICAgICAgbGV0IGNvbWJpbmVkID0ge31cclxuXHJcbiAgICAgICAgZm9yICh2YXIgY29kZSBpbiBjb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSBjb21iaW5pbmdbY29kZV07XHJcbiAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0gPSBzcG90XHJcbiAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0uY29tYmluZSA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgaGFzQ29tYmluZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy/tlansuaAg6rKD7J20IOyXhuycvOuptCDrsJTroZwgY29tYmluZWQg7Kq97Jy866GcIOuztOuCuOuLpC5cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHRDb2RlIGluIGNvbWJpbmluZykge1xyXG4gICAgICAgICAgICAgICAgaWYoY29kZTx0Q29kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRTcG90ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbWJpbmluZ1t0Q29kZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdFNwb3Rba2V5XSA9IGNvbWJpbmluZ1t0Q29kZV1ba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZighdFNwb3QuZGVsZXRlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBjYWxjdWxhdGVEaWYoc3BvdC5jb29yLCB0U3BvdC5jb29yKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGlmPDI1MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmVbdENvZGVdID0gdFNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb21iaW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFoYXNDb21iaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBjb21iaW5lZFtjb2RlXSA9IGNvbWJpbmVPYmpbY29kZV07XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29tYmluZU9ialtjb2RlXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpdHkrXCIvc3BvdHNcIikuc2V0KHtcclxuICAgICAgICAgICAgY29tYmluaW5nOmNvbWJpbmVPYmosXHJcbiAgICAgICAgICAgIGNvbWJpbmVkOmNvbWJpbmVkXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgTWFudWFsQ29tYmluZS5pbml0KHtcclxuICAgICAgICAgICAgY29tYmluaW5nOmNvbWJpbmVPYmosXHJcbiAgICAgICAgICAgIGNvbWJpbmVkOmNvbWJpbmVkXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVTcG90OiBmdW5jdGlvbihzaWQsIG5hbWUpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGUgPSBzaWQuc3BsaXQoXCJfXCIpWzBdO1xyXG4gICAgICAgIGxldCBubyA9IHNpZC5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgICAgIGlmKGNvbmZpcm0obmFtZSArIFwiIOyepeyGjOulvCDsoJzqsbDtlanri4jri6QuIOqzhOyGje2VoOq5jOyalD9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIisgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSArIFwiL1wiICsgbm8gKS5zZXQoe2RlbGV0ZWQ6IHRydWV9KTtcclxuICAgICAgICAgICAgJChcIiNcIitzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB0b2FzdChcIuyepeyGjOqwgCDsoJzqsbDrkJjsl4jsirXri4jri6QuXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dENvb3JkaW5hdGU6IGZ1bmN0aW9uKHNpZCwgY29vclR4dCl7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICBsZXQgc2l0ZSA9IHNpZC5zcGxpdChcIl9cIilbMF07XHJcbiAgICAgICAgbGV0IG5vID0gc2lkLnNwbGl0KFwiX1wiKVsxXTtcclxuICAgICAgICBsZXQgY29vciA9IHt9O1xyXG5cclxuICAgICAgICBpZihjb29yVHh0LnNwbGl0KFwiLFwiKS5sZW5ndGggPT09IDIpe1xyXG4gICAgICAgICAgICBsZXQgbGF0ID0gY29vclR4dC5zcGxpdChcIixcIilbMF0udHJpbSgpKjE7XHJcbiAgICAgICAgICAgIGxldCBsbmcgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVsxXS50cmltKCkqMTtcclxuXHJcbiAgICAgICAgICAgIGlmKGlzTmFOKGxhdCl8fGlzTmFOKGxuZykpe1xyXG4gICAgICAgICAgICAgICAgLy/sooztkZwg7KSRIO2VmOuCmOqwgFxyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg67aA7KCV7ZmV7ZWY6rKMIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvb3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OiBsYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOiBsbmdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIrc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubyArIFwiL2Nvb3JcIikuc2V0KGNvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOu2gOygle2Zle2VmOqyjCDsnoXroKXrkJjsl4jsirXri4jri6RcIilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFJlbWFpbk51bWJlcjogZnVuY3Rpb24oc2l0ZSwgbnVtYmVyKXtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG4gICAgICAgIGxldCBjdXRObyA9IG51bWJlci50cmltKCkqMTtcclxuXHJcbiAgICAgICAgaWYoY3V0Tm88MTAwKXtcclxuICAgICAgICAgICAgdG9hc3QoXCIxMDDqsJwg7J207IOB7J2YIOyepeyGjOulvCDsnKDsp4DtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGNvbmZpcm0oXCLsiJzsnIQgXCIrIGN1dE5vICsgXCLsnIQg66+466eMIOyepeyGjOulvCDrqqjrkZAg7KCc6rGw7ZWp64uI64ukLiDrp57sirXri4jquYw/XCIpKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXRPYmogPSB0aGlzLmRhdGEuc3BvdHNbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICBjdXRPYmoubGVuZ3RoID0gY3V0Tm87XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUpLnNldChjdXRPYmopO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlyc3RDaGVjazogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZVwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZS5jaGVja1wiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICAgICAkKFwiLmhlYWRlcl9fc3RhdHVzXCIpLmh0bWwoXCLrjbDsnbTthLAg6rKA7Kad7KSRXCIpXHJcbiAgICAgICAgbGV0IGhhc1Byb2JsZW09IGZhbHNlO1xyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgIGxldCBzZWFyY2hVcmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmtyL21hcHMvcGxhY2UvJyArICQoXCIuY2l0eU5hbWVcIikuaHRtbCgpICtcIitcIlxyXG5cclxuICAgICAgICBsZXQgc2l0ZU9iaiA9IHtcclxuICAgICAgICAgICAgZ2c6IFwi6rWs6riAXCIsXHJcbiAgICAgICAgICAgIG52OiBcIuuEpOydtOuyhFwiLFxyXG4gICAgICAgICAgICB0YTogXCLtirjrpr3slrTrk5zrsJTsnbTsoIBcIixcclxuICAgICAgICAgICAgbHA6IFwi66Gg66as7ZSM656Y64ubXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIHNpdGUgaW4gc2l0ZU9iaikge1xyXG4gICAgICAgICAgICBsZXQgc2l0ZUhhc1Byb2JsZW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yVHh0ID0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+7KKM7ZGc6rCAIOyeheugpeuQmOyngCDslYrsnYAg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICBsZXQgbm9TcG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3RUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7ruYTslrTsnojripQg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG5cclxuICAgICAgICAgICAgaWYoZGF0YVtzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImNoZWNrX190aXRsZVwiPicrc2l0ZU9ialtzaXRlXSsnIOuNsOydtO2EsCDtmZXsnbg8L3A+J1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBkYXRhW3NpdGVdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwb3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGFzQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3QuZGVsZXRlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ydvOu2gOufrCDsgq3soJztlZwg6rSA6rSR7KeAIC0+IOuEmOyWtOqwhOuLpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3QuY29vcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BvdC5jb29yLmxuZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzTmFOKHNwb3QuY29vci5sbmcqMSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3QuY29vci5sYXQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc05hTihzcG90LmNvb3IubGF0KjEpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFoYXNDb29yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQrPSc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicrc2l0ZSsnXycraSsnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCs9ICAgJzxhIGNsYXNzPVwiY2hlY2tfX3Nwb3ROYW1lXCIgaHJlZj1cIicrc2VhcmNoVXJsK3Nwb3QubmFtZSsnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JytzcG90Lm5hbWUrJzwvYT4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0Kz0gICAnPGlucHV0IGNsYXNzPVwiY2hlY2tfX3Nwb3RDb29yXCIgcGxhY2Vob2xkZXI9XCJ4eC54eHh4eCwgeHgueHh4eHgg7ZiV7YOcIOyeheugpVwiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQrPSAgICc8cCBjbGFzcz1cImNoZWNrX19jb25maXJtXCI+7KKM7ZGcIOyeheugpTwvcD48cCBjbGFzcz1cImNoZWNrX19zcG90RGVsZXRlXCI+7J6l7IaMIOyCreygnDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0Kz0nPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQrPSc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicrc2l0ZSsnXycraSsnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQrPSAgICc8cCBjbGFzcz1cImNoZWNrX190eHRcIj4nK2krJyDrsogg6rSA6rSR7KeAPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90VHh0Kz0gICAnPHAgY2xhc3M9XCJjaGVja19fc3BvdERlbGV0ZVwiPuyepeyGjCDsgq3soJw8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG5vQ29vcil7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vQ29vclR4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKG5vU3BvdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vU3BvdFR4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW3NpdGVdLmxlbmd0aD4xNTApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXJnZU9LID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmxhcmdlRGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEubGFyZ2VEYXRhW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMTUw6rCcIOydtOyDgeydmCDrjbDsnbTthLDrpbwg67O07Jyg7ZWY66Ck66m0IOuPhOyLnOuqhS9zcG90cy9sYXJnZURhdGEv7IKs7J207Yq466qF7J20IHRydWXrnbzqs6Ag67aA7Jes65CY7Ja07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXJnZU9LID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZighbGFyZ2VPSyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+JytzaXRlT2JqW3NpdGVdKycg7J6l7IaMIOuNsOydtO2EsOqwgCAxNTDqsJzrpbwg7LSI6rO8KCcrZGF0YVtzaXRlXS5sZW5ndGgrJ+qwnCntlanri4jri6QuPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInK3NpdGUrJ1wiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPGlucHV0IGNsYXNzPVwiY2hlY2tfX3JlbWFpbk51bWJlclwiIHZhbHVlPVwiJytkYXRhW3NpdGVdLmxlbmd0aCsnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNoZWNrX19yZW1haW5MYXJnZURhdGFcIj7qsJzsnZgg7J6l7IaMIOycoOyngO2VmOq4sDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImNoZWNrX190aXRsZVwiPicrc2l0ZU9ialtzaXRlXSsnIOuNsOydtO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK7Iq164uI64ukLjwvcD4nXHJcbiAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiDsm5Drnpgg7IKs7J207Yq4IOuNsOydtO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK64qUIOqyveyasOulvCDrjIDruYTtlZwg67KE7Yq87J2EIOunjOuTpOqzoCBzaXRlIOqwkuycvOuhnCBub2RhdGE6IHRydWXrpbwg64Sj7Ja07KSA64ukLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFzaXRlSGFzUHJvYmxlbSl7XHJcbiAgICAgICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7rsJzqsqzrkJwg66y47KCc6rCAIOyXhuyKteuLiOuLpDwvcD4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGhhc1Byb2JsZW0pe1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2ZpbmlzaFwiPuqygOyCrOulvCDrqqjrkZAg66eI7LOk7Iq164uI64ukPC9wPidcclxuICAgICAgICAgICAgJChcIi5zcG90IC5jaGVja1wiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi67Cc6rKs65CcIOusuOygnOqwgCDsl4bslrQg642w7J207YSwIOuzke2VqeydhCDsi6Tsi5ztlanri4jri6QuXCIpXHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0NvbWJpbmVfX3Nwb3RSZXN0cnVjdHVyZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BvdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5L3Nwb3QuanMiLCJsZXQgTWFudWFsQ29tYmluZSA9IHtcclxuICAgIG1hcDoge30sXHJcbiAgICBtYXJrZXI6IHtcclxuICAgICAgICBwcmltZTp7fSxcclxuICAgICAgICB0YXJnZXQ6W11cclxuICAgIH0sXHJcbiAgICBkYXRhOnt9LFxyXG4gICAgcmVtYWluOjAsXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLmNvbWJpbmVfX3RhcmdldFwiKS5vbihcImNsaWNrXCIsIFwiLmNvbWJpbmVfX3RhcmdldF9fZGl2XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oXCIuY29tYmluZV9fdGFyZ2V0X19jaGVja1wiKS50b2dnbGVDbGFzcyhcImNvbWJpbmVfX3RhcmdldF9fY2hlY2tlZFwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLmNvbWJpbmVfX21haW5cIikub24oXCJjbGlja1wiLFwiLmNvbWJpbmVfX25leHRTdGVwXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQubmV4dFN0ZXAoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBuZXh0U3RlcDogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpO1xyXG5cclxuICAgICAgICBsZXQgbWFpbkRhdGEgPSB0aGlzLmRhdGEuY29tYmluaW5nWyQoXCIuY29tYmluZV9fbWFpblwiKS5hdHRyKFwiaWRcIildO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuY29tYmluZV9fdGFyZ2V0X19jaGVja2VkXCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0aWQgPSAkKFwiLmNvbWJpbmVfX3RhcmdldF9fY2hlY2tlZFwiKS5lcShpKS5hdHRyKFwic2lkXCIpXHJcbiAgICAgICAgICAgIGxldCB0YXJnZXREYXRhID0gbWFpbkRhdGEuY29tYmluZVt0aWRdO1xyXG5cclxuICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7J2YIHJhbmvrpbwgbWFpbmREYXRh7J2YIHJhbmvroZwg7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICBmb3IgKHZhciBzaXRlIGluIHRhcmdldERhdGEucmFuaykge1xyXG4gICAgICAgICAgICAgICAgaWYobWFpbkRhdGEucmFua1tzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWFpbkRhdGEucmFua1tzaXRlXSA+IHRhcmdldERhdGEucmFua1tzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5EYXRhLnJhbmtbc2l0ZV0gPSB0YXJnZXREYXRhLnJhbmtbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEucmFua1tzaXRlXSA9IHRhcmdldERhdGEucmFua1tzaXRlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7J2YIO2DnOq3uOulvCBtYWluRGF0YeydmCB0YWfroZwg7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICBpZih0YXJnZXREYXRhLnRhZyl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRhcmdldERhdGEudGFnLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWFpbkRhdGEudGFnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW1haW5EYXRhLnRhZy5pbmNsdWRlcyh0YXJnZXREYXRhLnRhZ1tqXSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnLnB1c2godGFyZ2V0RGF0YS50YWdbal0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnID0gdGFyZ2V0RGF0YS50YWdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v7ZWp7LOQ7KeIIOuMgOyDgeyXkOqyjCB1cmzsnbQg7J6F66Cl65CY7Ja0IOyeiOuLpOuptCBtYWluRGF0YeyXkCDthrXtlantlZjripQg7J6R7JeFXHJcbiAgICAgICAgICAgIGlmKCFtYWluRGF0YS51cmwpe1xyXG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0RGF0YS51cmwpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5EYXRhLnVybCA9IHRhcmdldERhdGEudXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmNvbWJpbmluZ1t0aWRdO1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuY29tYmluZWRbdGlkXSl7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmNvbWJpbmVkW3RpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbWFpbkRhdGEubmFtZS5rbyA9ICQoXCIjbmFtZV9rb1wiKS52YWwoKTtcclxuICAgICAgICBtYWluRGF0YS5uYW1lLmVuID0gJChcIiNuYW1lX2VuXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICBkZWxldGUgbWFpbkRhdGEuY29tYmluZTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhLmNvbWJpbmVkWyQoXCIuY29tYmluZV9fbWFpblwiKS5hdHRyKFwiaWRcIildID0gdGhpcy5kYXRhLmNvbWJpbmluZ1skKFwiLmNvbWJpbmVfX21haW5cIikuYXR0cihcImlkXCIpXTtcclxuICAgICAgICBkZWxldGUgdGhpcy5kYXRhLmNvbWJpbmluZ1skKFwiLmNvbWJpbmVfX21haW5cIikuYXR0cihcImlkXCIpXTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2l0eStcIi9zcG90c1wiKS51cGRhdGUodGhpcy5kYXRhKTtcclxuXHJcblxyXG4gICAgICAgIGlmKE9iamVjdC5rZXlzKHRoaXMuZGF0YS5jb21iaW5pbmcpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgdGhpcy5pbmZsYXRlKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpdHkrXCIvc3RhdHVzL3Nwb3RzXCIpLnNldChcInZlcmlmeWluZ1wiKVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaXR5K1wiL3Nwb3RzL2NvbWJpbmluZ1wiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdG9hc3QoXCLtlansuZjquLAg7J6R7JeF7J20IOyZhOujjOuQmOyXiOyKteuLiOuLpCEgMuy0iCDtm4Qg7Y6Y7J207KeA66W8IOyDiOuhnOqzoOy5qO2VqeuLiOuLpC5cIilcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZVwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuc3BvdF9fcGFnZS5jb21iaW5lXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5oZWFkZXJfX3N0YXR1c1wiKS5odG1sKFwi6rSA6rSR7KeAIO2Vqey5mOq4sFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiA0MC43NDg0NCwgbG5nOiAtNzMuOTg1NjYgfSxcclxuICAgICAgICAgICAgem9vbTogMTcsXHJcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHRoYXQuY2hvb3NlQ29vcmRpbmF0ZShlKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmluZmxhdGUoKTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNob29zZUNvb3JkaW5hdGU6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQoXCIuY29tYmluZV9fY29vcmRpbmF0ZVwiKS5odG1sKGUubGF0TG5nLmxhdCgpK1wiLFwiK2UubGF0TG5nLmxuZygpKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXIucHJpbWUuc2V0TWFwKG51bGwpXHJcbiAgICAgICAgdGhpcy5tYXJrZXIucHJpbWUgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGUubGF0TG5nLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YS5jb21iaW5pbmc7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgLy/quLDsobTsl5Ag7LCN7ZiA7J6I642YIOuniOy7pOulvCDsoJzqsbDtlZzri6RcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcclxuICAgICAgICB0aGlzLnJlbWFpbiA9IGtleXMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBzcG90ID0gZGF0YVtrZXlzWzBdXTtcclxuICAgICAgICAkKFwiLmNvbWJpbmVfX21haW5cIikuYXR0cihcImlkXCIsIGtleXNbMF0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhzcG90KVxyXG4gICAgICAgIC8v7J2066aEIOq0gOugqCDsoJXrs7Qg7ZGc7IucXHJcbiAgICAgICAgaWYoc3BvdC5uYW1lLmtvLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJjb21iaW5lX19uYW1lX19wcmltZVwiPuq4sOykgCDsnqXshozrqoU6ICcrIHNwb3QubmFtZS5rbyArJzwvcD4nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImNvbWJpbmVfX25hbWVfX3ByaW1lXCI+6riw7KSAIOyepeyGjOuqhTogJysgc3BvdC5uYW1lLmVuICsnPC9wPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJjb21iaW5lX19wcmltZVwiPidcclxuICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwiY29tYmluZV9fcHJpbWVfX2xlZnRcIj4nXHJcbiAgICAgICAgdHh0Kz0gICAgICAnPGRpdiBjbGFzcz1cImNvbWJpbmVfX2xpbmVcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPu2VnOq4gOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImNvbWJpbmVfX2lucHV0XCIgaWQ9XCJuYW1lX2tvXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5rbysnXCI+J1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICAgICc8ZGl2IGNsYXNzPVwiY29tYmluZV9fbGluZVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPuyYgeusuOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImNvbWJpbmVfX2lucHV0XCIgaWQ9XCJuYW1lX2VuXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5lbisnXCI+J1xyXG4gICAgICAgIHR4dCs9ICAgICAnPC9kaXY+J1xyXG4gICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNvbWJpbmVfX25leHRTdGVwXCI+64uk7J2MPC9wPidcclxuICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG5cclxuICAgICAgICAvL+yijO2RnCDqtIDroKgg7KCV67O0IO2RnOyLnFxyXG4gICAgICAgIHNwb3QuY29vci5sYXQgPSBzcG90LmNvb3IubGF0KjE7XHJcbiAgICAgICAgc3BvdC5jb29yLmxuZyA9IHNwb3QuY29vci5sbmcqMTtcclxuICAgICAgICB0aGlzLm1hcmtlci5wcmltZSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogc3BvdC5jb29yLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tYXAucGFuVG8oc3BvdC5jb29yKTtcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY29tYmluZV9fbGluZVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJjb21iaW5lX19zdWJUaXRsZVwiPuyijO2RnCc7XHJcbiAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJjb21iaW5lX19jb29yZGluYXRlXCI+Jysgc3BvdC5jb29yLmxhdCArXCIsXCIrc3BvdC5jb29yLmxuZyArJzwvcD4nO1xyXG4gICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIuY29tYmluZV9fbWFpblwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgICAgIHR4dD0nJztcclxuICAgICAgICBsZXQgaWR4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2lkIGluIHNwb3QuY29tYmluZSkge1xyXG4gICAgICAgICAgICBpZHgrKztcclxuICAgICAgICAgICAgbGV0IHRTcG90ID0gc3BvdC5jb21iaW5lW3NpZF07XHJcblxyXG4gICAgICAgICAgICBsZXQgbGF0bG5nID0ge1xyXG4gICAgICAgICAgICAgICAgbGF0OiB0U3BvdC5jb29yLmxhdCoxLFxyXG4gICAgICAgICAgICAgICAgbG5nOiB0U3BvdC5jb29yLmxuZyoxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHRNYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOmxhdGxuZyxcclxuICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXAsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogaWR4LnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnRhcmdldC5wdXNoKHRNYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgLy/rs7jrqoXsnLzroZwg7ZWc6riA66qFIOyYgeyWtOuqheydtCDsl4bsnYQg6rK97Jqw66W8IOyytO2BrO2VtOyEnCDrhKPslrTspIDri6QuXHJcbiAgICAgICAgICAgIGlmKCQoXCIjbmFtZV9rb1wiKS52YWwoKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYW1lX2tvXCIpLnZhbCh0U3BvdC5uYW1lLmtvKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCQoXCIjbmFtZV9lblwiKS52YWwoKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYW1lX2VuXCIpLnZhbCh0U3BvdC5uYW1lLmVuKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiY29tYmluZV9fdGFyZ2V0X19kaXZcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiY29tYmluZV9fdGFyZ2V0X19udW1iZXJcIj4nK2lkeCsnPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cImNvbWJpbmVfX3RhcmdldF9fY2hlY2tcIiBzaWQ9XCInK3NpZCsnXCI+PC9kaXY+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImNvbWJpbmVfX3RhcmdldF9fbmFtZVwiPicrdFNwb3QubmFtZS5rbytcIiBcIit0U3BvdC5uYW1lLmVuKyc8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmNvbWJpbmVfX3RhcmdldFwiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbnVhbENvbWJpbmU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvY2l0eS9tYW51YWxDb21iaW5lLmpzIiwidmFyIFZlcmlmeSA9IHtcclxuICAgIGRhdGE6e30sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLnZlcmlmeWluZ19fYm94XCIpLm9uKFwiY2xpY2tcIiwgXCIucmVzdWx0X3JhbmtcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5jaGVjaygkKHRoaXMpKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChcIiN2ZXJpZnlpbmdfX2NvbnRyb2xfX21lcmdlXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQubWVyZ2UoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCIjdmVyaWZ5aW5nX19jb250cm9sX19yZW1vdmVcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5yZW1vdmVBbGwoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlQWxsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGNvbmZpcm0oXCLsoJzqsbDtlaDquYzsmpQ/XCIpKXtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLnJlc3VsdF9yYW5rLnNlbGVjdGVkXCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlkID0gJChcIi5yZXN1bHRfcmFuay5zZWxlY3RlZFwiKS5lcShpKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhW3RpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJChcIi52ZXJpZnlpbmdfX2NvbnRyb2xcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiaWRcIikrXCIvc3BvdHMvY29tYmluZWRcIikuc2V0KHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMucmFuaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG1lcmdlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCQoXCIucmVzdWx0X3Jhbmsuc2VsZWN0ZWRcIikubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICBsZXQgc2lkID0gJChcIi5yZXN1bHRfcmFuay5zZWxlY3RlZFwiKS5lcSgwKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIGxldCBtYWluRGF0YSA9IHRoaXMuZGF0YVtzaWRdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAkKFwiLnJlc3VsdF9yYW5rLnNlbGVjdGVkXCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlkID0gJChcIi5yZXN1bHRfcmFuay5zZWxlY3RlZFwiKS5lcShpKS5wYXJlbnQoKS5hdHRyKFwiaWRcIilcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXREYXRhID0gdGhpcy5kYXRhW3RpZF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy/tlanss5Dsp4gg64yA7IOB7J2YIHJhbmvrpbwgbWFpbmREYXRh7J2YIHJhbmvroZwg7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiB0YXJnZXREYXRhLnJhbmspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihtYWluRGF0YS5yYW5rW3NpdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobWFpbkRhdGEucmFua1tzaXRlXSA+IHRhcmdldERhdGEucmFua1tzaXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS5yYW5rW3NpdGVdID0gdGFyZ2V0RGF0YS5yYW5rW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5EYXRhLnJhbmtbc2l0ZV0gPSB0YXJnZXREYXRhLnJhbmtbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8v7ZWp7LOQ7KeIIOuMgOyDgeydmCDtg5zqt7jrpbwgbWFpbkRhdGHsnZggdGFn66GcIO2Gte2Vqe2VmOuKlCDsnpHsl4VcclxuICAgICAgICAgICAgICAgIGlmKHRhcmdldERhdGEudGFnKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRhcmdldERhdGEudGFnLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1haW5EYXRhLnRhZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighbWFpbkRhdGEudGFnLmluY2x1ZGVzKHRhcmdldERhdGEudGFnW2pdKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnLnB1c2godGFyZ2V0RGF0YS50YWdbal0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkRhdGEudGFnID0gdGFyZ2V0RGF0YS50YWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL+2VqeyzkOyniCDrjIDsg4Hsl5DqsowgdXJs7J20IOyeheugpeuQmOyWtCDsnojri6TrqbQgbWFpbkRhdGHsl5Ag7Ya17ZWp7ZWY64qUIOyekeyXhVxyXG4gICAgICAgICAgICAgICAgaWYoIW1haW5EYXRhLnVybCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGFyZ2V0RGF0YS51cmwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluRGF0YS51cmwgPSB0YXJnZXREYXRhLnVybDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YVt0aWRdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNvbmZpcm0oXCLrs5HtlantlaDquYzsmpQ/XCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnZlcmlmeWluZ19fY29udHJvbFwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiKyQoXCIuY2l0eU5hbWVcIikuYXR0cihcImlkXCIpK1wiL3Nwb3RzL2NvbWJpbmVkXCIpLnNldCh0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFuaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi7ISg7YOd65CcIOq0gOq0keyngOqwgCDtlZjrgpjsnoXri4jri6RcIilcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrOiBmdW5jdGlvbihkaXYpe1xyXG4gICAgICAgIGRpdi50b2dnbGVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgIGxldCBzaWQgPSBkaXYucGFyZW50KCkuYXR0cihcImlkXCIpO1xyXG5cclxuICAgICAgICBpZigkKFwiLnJlc3VsdF9yYW5rLnNlbGVjdGVkXCIpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgJChcIi52ZXJpZnlpbmdfX2NvbnRyb2xcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJChcIi52ZXJpZnlpbmdfX2NvbnRyb2xcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJhbms6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgbWF4U2NvcmU6IDIwMCwgIC8vMeychOuKlCAyMDDsoJAgfiAxODDsnITripQgMjDsoJBcclxuICAgICAgICAgICAgb25lTWludXM6LTYwMCwgIC8vMeqwnCDsgqzsnbTtirjsl5Drp4wg7IaM6rCc65CcIOq0gOq0keyngOydvCDqsr3smrAg7LCo6rCQ65CY64qUIOygkOyImFxyXG4gICAgICAgICAgICB0d29NdW51czotMzAwLCAvLzLqsJwg7IKs7J207Yq47JeQ66eMIOyGjOqwnOuQnCDqtIDqtJHsp4Dsnbwg6rK97JqwIOywqOqwkOuQmOuKlCDsoJDsiJhcclxuICAgICAgICAgICAgbnZBZGQ6MTAwICAvL+uEpOydtOuyhOyXkOunjCDshozqsJzrkJwg6rSA6rSR7KeA7J28IOqyveyasCDrtoDsl6zrkJjripQg7LaU6rCA7KCQXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByYW5rQXJyYXkgPSBbXTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXHJcblxyXG4gICAgICAgIGZvciAodmFyIHNpZCBpbiB0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSB0aGlzLmRhdGFbc2lkXTtcclxuICAgICAgICAgICAgc3BvdC5zaWQgPSBzaWQ7XHJcbiAgICAgICAgICAgIGxldCBudW1TaXRlID0gT2JqZWN0LmtleXMoc3BvdC5yYW5rKS5sZW5ndGg7IC8v65Ox7J6s65CcIOyCrOydtO2KuCDqsK/siJhcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMFxyXG4gICAgICAgICAgICBsZXQgYXZnID0gMFxyXG4gICAgICAgICAgICBsZXQgYmVzdFJhbmsgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEpLmxlbmd0aCArIDUwIC8v6rCA7J6lIOuGkuydgCjsiKvsnpDroZzshJwg64Ku7J2AKSDrnq3tgrnsnbQg67aA7Jes65CcIOyCrOydtO2KuCDrnq3tgrlcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHNpdGUgaW4gc3BvdC5yYW5rKSB7XHJcbiAgICAgICAgICAgICAgICBpZihiZXN0UmFuaz5zcG90LnJhbmtbc2l0ZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RSYW5rID0gc3BvdC5yYW5rW3NpdGVdIC8vYmVzdFJhbmvrpbwg6rCx7Iug7ZWc64ukXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihzcG90LnJhbmtbc2l0ZV08T2JqZWN0LmtleXModGhpcy5kYXRhKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7JiIIC0g6rSA6rSR7KeA6rCAIDEwMOychOyduOuNsCDroaDrpqztlIzrnpjri5vsl5DshJwgMTAz7JyEIOyGjOqwnCAtPiDsl4bripQg6rKDIOy3qOq4iVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlKz0gKGNvbmZpZy5tYXhTY29yZSAtIHNwb3QucmFua1tzaXRlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZnKz0gKGNvbmZpZy5tYXhTY29yZSAtIHNwb3QucmFua1tzaXRlXSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihudW1TaXRlPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1TaXRlLS07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNjb3JlLT0gYmVzdFJhbmsqNTtcclxuICAgICAgICAgICAgYXZnID0gYXZnIC8gbnVtU2l0ZTtcclxuXHJcbiAgICAgICAgICAgIHNjb3JlKz0gYXZnKjI1O1xyXG5cclxuICAgICAgICAgICAgaWYobnVtU2l0ZSA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSBjb25maWcub25lTWludXM7XHJcbiAgICAgICAgICAgICAgICBpZihzcG90LnJhbmsubnYpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlKz0gY29uZmlnLm52QWRkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG51bVNpdGUgPT09IDIpe1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gY29uZmlnLnR3b011bnVzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByYW5rQXJyYXkucHVzaCh7c2lkOnNpZCxzY29yZTpzY29yZX0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYW5rQXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuc2NvcmUgPiBiLnNjb3JlID8gLTEgOiBhLnNjb3JlIDwgYi5zY29yZSA/IDEgOiAwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcblxyXG4gICAgICAgIHZhciBzcG90QXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5rQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGFcclxuXHJcbiAgICAgICAgICAgIHNwb3RBcnJheS5wdXNoKHRoaXMuZGF0YVtyYW5rQXJyYXlbaV0uc2lkXSlcclxuXHJcbiAgICAgICAgICAgIGxldCBzaWQgPSByYW5rQXJyYXlbaV0uc2lkO1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gXCJcIlxyXG4gICAgICAgICAgICBpZihkYXRhW3NpZF0udXJsKXtcclxuICAgICAgICAgICAgICAgIHVybCA9IGRhdGFbc2lkXS51cmxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmFua2luZyA9IHtcclxuICAgICAgICAgICAgICAgIGdnOlwiXCIsXHJcbiAgICAgICAgICAgICAgICBudjpcIlwiLFxyXG4gICAgICAgICAgICAgICAgbHA6XCJcIixcclxuICAgICAgICAgICAgICAgIHRhOlwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBzaXRlIGluIGRhdGFbc2lkXS5yYW5rKSB7XHJcbiAgICAgICAgICAgICAgICByYW5raW5nW3NpdGVdID0gZGF0YVtzaWRdLnJhbmtbc2l0ZV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwicmVzdWx0X2JveFwiIGlkPVwiJytzaWQrJ1wiPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJyZXN1bHRfcmFua1wiPicrKGkrMSkrJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8aW5wdXQgY2xhc3M9XCJyZXN1bHRfbmFtZVwiIHZhbHVlPVwiJytkYXRhW3NpZF0ubmFtZS5rbytcIi0tXCIrZGF0YVtzaWRdLm5hbWUuZW4rJ1wiPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPGlucHV0IGNsYXNzPVwicmVzdWx0X3VybFwiIHZhbHVlPVwiJyt1cmwrJ1wiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwicmVzdWx0X2dnXCI+JytyYW5raW5nLmdnKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJyZXN1bHRfbnZcIj4nK3JhbmtpbmcubnYrJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInJlc3VsdF9scFwiPicrcmFua2luZy5scCsnPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwicmVzdWx0X3RhXCI+JytyYW5raW5nLnRhKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJyZXN1bHRfc2F2ZSBzYXZlX3Nwb3RcIj7soIDsnqU8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJyZXN1bHRfcmVtb3ZlIHJlbW92ZV9zcG90XCI+7IKt7KCcPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgJChcIi52ZXJpZnlpbmdfX2JveFwiKS5odG1sKHR4dClcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrJCgnLmNpdHlOYW1lJykuYXR0cignaWQnKStcIi9zcG90cy9yYW5rZWRcIikuc2V0KHNwb3RBcnJheSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc3BvdEFycmF5KVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgJChcIi5zcG90X19wYWdlXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5zcG90X19wYWdlLnZlcmlmeWluZ1wiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuaGVhZGVyX19zdGF0dXNcIikuaHRtbChcIuq0gOq0keyngCAy7LCoIOqygOymnVwiKTtcclxuXHJcbiAgICAgICAgaWYoIWRhdGEucmFua2VkKXtcclxuICAgICAgICAgICAgdGhpcy5yYW5rKCk7Ly/rnq3tgrkg642w7J207YSw6rCAIOyXhuycvOuptCDrp4zrk6Dri6RcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b2xvP1wiKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnJhbmtlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmVyaWZ5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvc3BvdC92ZXJpZnlpbmcuanMiLCJsZXQgSG90ZWwgPSB7XHJcbiAgICBkYXRhOiB7fSxcclxuICAgIGNpdHk6IFwiXCIsXHJcbiAgICBjaXR5TmFtZTogXCJcIixcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaWQsIG5hbWUpe1xyXG4gICAgICAgICQoXCIuY2l0eU5hbWVcIikuaHRtbChuYW1lKS5hdHRyKFwiaWRcIiwgY2lkKTtcclxuICAgICAgICAkKFwiLmNpdHlDb2RlVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuaG90ZWxcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2l0eSA9IGNpZDtcclxuICAgICAgICB0aGlzLmNpdHlOYW1lID0gbmFtZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG5cclxuICAgICAgICB0aGlzLnNjb3JlKCk7XHJcbiAgICAgICAgLy/soJDsiJgg67aA7Jes66W8IOyLpOyLnO2VnOuLpC5cclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHN0YXR1cyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZih0aGlzLmRhdGEuc3RhdHVzKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuZGF0YS5zdGF0dXMuaG90ZWxzKXtcclxuICAgICAgICAgICAgICAgIC8vc3RhdXRz64qUIOyeiOuKlOuNsCDtmLjthZTsl5Ag64yA7ZWcIHN0YXR1cyDrjbDsnbTthLDqsIAg7JeG7Jy866m0IOunjOuTpOyWtCDrhKPripTri6QuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RhdHVzLmhvdGVscyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNhZmV0eTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjaWxpdHk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvc3RFZmY6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gc3RhdHVzIOuNsOydtO2EsCDsnpDssrTqsIAg7JeG7Jy866m0IOunjOuTpOyWtCDrhKPripTri6QuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICBob3RlbHM6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2FmZXR5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBmYWNpbGl0eTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY29zdEVmZjogZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdHVzID0gdGhpcy5kYXRhLnN0YXR1cy5ob3RlbHM7XHJcblxyXG4gICAgICAgIC8v7KCQ7IiYIOyytOqzhOqwgCDsmYTshLHrkJjslrTsnojripTsp4Ag6rKA7IKs7ZWY6rOgIOyXhuycvOuptCDsoJDsiJjrpbwg67aA7Jes7ZWY64qUIO2VqOyImOulvCDsi6TtlontlZzri6RcclxuICAgICAgICBpZihzdGF0dXMudHJhbnNwb3J0KXtcclxuICAgICAgICAgICAgJChcIiNzdGF0dXNfdHJhbnNwb3J0XCIpLmh0bWwoXCLsoJXrs7TqsIAg7KG07J6s7ZWp64uI64ukLlwiKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEubWV0cm8mJnRoaXMuZGF0YS5tZXRyb0xpbmUpe1xyXG4gICAgICAgICAgICAgICAgJChcIiNzdGF0dXNfdHJhbnNwb3J0XCIpLmh0bWwoXCLrjIDspJHqtZDthrUg7KCV67O0IOuwnOqyrC4g6rWQ7Ya1IO2OuOydmOyEseydhCDqs4TsgrDtlanri4jri6QuXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlX3RyYW5zcG9ydCgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIjc3RhdHVzX3RyYW5zcG9ydFwiKS5odG1sKFwi64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsnoXroKXrkJjsp4Ag7JWK7JWEIOq1kO2GtSDtjrjsnZjshLHsnYQg6rOE7IKw7ZWgIOyImCDsl4bsirXri4jri6QuIOuNsOydtO2EsOulvCDsnoXroKXtlbTso7zshLjsmpQuXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHN0YXR1cy5zYWZldHkpe1xyXG4gICAgICAgICAgICAkKFwiI3N0YXR1c19zYWZldHlcIikuaHRtbChcIuygleuztOqwgCDsobTsnqztlanri4jri6QuXCIpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmVfc2FmZXR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzdGF0dXMuZmFjaWxpdHkpe1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RhdHVzLmNvc3RFZmYpe1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNjb3JlX3NhZmV0eTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgY2l0eSA9IHRoaXMuY2l0eTtcclxuICAgICAgICBsZXQgb3JkZXJBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICB2YXIgc2NvcmVXb3JkX2Nvbm5lY3QgPSBbXCLrp6TsmrAg64KY7IGYXCIsXCLrp6TsmrAg64KY7IGYXCIsXCLsoovsp4Ag7JWK7Jy8XCIsXCLsoovsp4Ag7JWK7J2AIO2OuOydtFwiLFwi64KY7IGY7KeAIOyViuydgCDtjrjsnbRcIixcIuyii+ydgCDtjrjsnbRcIixcIuunpOyasCDsoovsnYAg7Y647J20XCIsXCLrp6TsmrAg7KKL7Jy8XCJdO1xyXG4gICAgICAgIHZhciBzY29yZVdvcmQgPSBbXCLrp6TsmrAg64KY67mgIOyhsOyLrO2VtOyVvCDtlaguXCIsXCLrp6TsmrAg64KY67mgIOyhsOyLrO2VtOyVvCDtlaguXCIsXCLsoovsp4Ag7JWK7J2AIO2OuC5cIixcIuyii+yngCDslYrsnYAg7Y64LlwiLFwi64KY7IGY7KeAIOyViuydgCDtjrguXCIsXCLsoovsnYAg7Y64LlwiLFwi66ek7JqwIOyii+ydgCDtjrguXCIsXCLrp6TsmrAg7KKL7J2AIO2OuC5cIl07XHJcbiAgICAgICAgdmFyIG1pc2RlbWVhbm9yV29yZCA9IFtcIuyGjOunpOy5mOq4sCDrk7Eg6rK967KU7KOE7JeQ64qUIOyjvOydmO2VtOyVvCDtlaguXCIsXCLshozrp6TsuZjquLAg65OxIOqyveuylOyjhOyXkOuKlCDso7zsnZjtlbTslbwg7ZWoLlwiLCBcIuyGjOunpOy5mOq4sCDrk7Eg6rK967KU7KOE7JeQ64qUIOyjvOydmO2VtOyVvCDtlaguXCIsIFwi6rK967KU7KOE7JeQ64qUIOyjvOydmO2VtOyVvCDtlaguXCIsXCJcIixcIlwiLFwiXCIsXCJcIl1cclxuXHJcblxyXG4gICAgICAgIHZhciBzY29yZUFycmF5ID0gW107XHJcblxyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICB2YXIgc2hvcnRUeHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGxldCBzYWZlX3R4dCA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgc2NvcmUgPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFyZWFOYW1lID0gdGhpcy5kYXRhLmFyZWFbaG90ZWwuYXJlYV0ubmFtZTtcclxuICAgICAgICAgICAgdmFyIGFyZWFTYWZldHkgPSB0aGlzLmRhdGEuYXJlYVtob3RlbC5hcmVhXS5zYWZldHk7XHJcblxyXG4gICAgICAgICAgICBzY29yZSs9IGFyZWFTYWZldHkuc2NvcmUqMSArIChhcmVhU2FmZXR5Lm1pc2RlbWVhbm9yLzMpKjE7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHh0ID0gYXJlYU5hbWUrJyDsp4Dsl63sl5Ag7JyE7LmY7ZWcIOyImeyGjOuhnCwg7KeA7Jet7J2YIOyghOuwmOyggeyduCDsuZjslYjsnYAgJztcclxuXHJcbiAgICAgICAgICAgIGlmKGFyZWFTYWZldHkuc2NvcmU+NCYmYXJlYVNhZmV0eS5taXNkZW1lYW5vcjw0KXtcclxuICAgICAgICAgICAgICAgIHR4dCArPSBzY29yZVdvcmRfY29ubmVjdFthcmVhU2FmZXR5LnNjb3JlXSArICfsp4Drp4wgJyArIG1pc2RlbWVhbm9yV29yZFthcmVhU2FmZXR5Lm1pc2RlbWVhbm9yXTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gc2NvcmVXb3JkW2FyZWFTYWZldHkuc2NvcmVdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNhZmVfdHh0LnB1c2godHh0KTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgc2FmZXR5X2xvY2FsID0geyAgLy/snKDrj5nsnbjqtazsl5Ag65Sw66W4IOy5mOyViFxyXG4gICAgICAgICAgICAgICAgYXRtOjAsIC8vMDrrs4TroZwgMTrrs7TthrUgMjrsoovsnYxcclxuICAgICAgICAgICAgICAgIHNwb3Q6MCxcclxuICAgICAgICAgICAgICAgIGdyb2Nlcnk6MCxcclxuICAgICAgICAgICAgICAgIGFyZWE6ZmFsc2VcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuYXJlYT41JiZob3RlbC5hcmVhPDkpe1xyXG4gICAgICAgICAgICAgICAgc2FmZXR5X2xvY2FsLmFyZWEgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihob3RlbC5hcmVhID09PSAxMCl7XHJcbiAgICAgICAgICAgICAgICBzYWZldHlfbG9jYWwuYXJlYSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhdG0zMHRoID0gaG90ZWwubG9jYWwuYXRtWzI5XS5sb2NhdGlvbi5zY29yZTsgLy8zMOuyiOynuCBhdG3snbQg66qHIOuniOydvCDrlqjslrTsoLjsnojripTsp4BcclxuXHJcbiAgICAgICAgICAgIGlmKGF0bTMwdGg8MC4wODQpe1xyXG4gICAgICAgICAgICAgICAgc2FmZXR5X2xvY2FsLmF0bSA9IDJcclxuICAgICAgICAgICAgfWVsc2UgaWYoYXRtMzB0aDwwLjEyKXtcclxuICAgICAgICAgICAgICAgIHNhZmV0eV9sb2NhbC5hdG0gPSAxXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNjb3JlICs9IE1hdGgubWF4KCgwLjE1IC0gYXRtMzB0aCksIDApKjVcclxuXHJcbiAgICAgICAgICAgIGhvdGVsLnNwb3QgPSB7XHJcbiAgICAgICAgICAgICAgICB3YWxrYWJsZTogW11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBob3RlbC5sb2NhbC5zcG90ID0gW107XHJcbiAgICAgICAgICAgIGhvdGVsLmxvY2FsLmdyb2NlcnkgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kYXRhLnNwb3RzLnJhbmtlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwb3QgPSB0aGlzLmRhdGEuc3BvdHMucmFua2VkW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHNwb3QuZW50ZXJhbmNlKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNwb3QuZW50ZXJhbmNlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoaG90ZWwuY29vciwgc3BvdC5lbnRlcmFuY2Vbal0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZiA8IDUwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5zcG90LndhbGthYmxlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6aSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWQ6c3BvdC5zaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkaWY8MjAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzYWZldHlfbG9jYWwuc3BvdCA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhZmV0eV9sb2NhbC5zcG90ID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkaWYgPCA4MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuc3BvdC5wdXNoKHNwb3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FmZXR5X2xvY2FsLnNwb3QgPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmID0gY2FsY3VsYXRlRGlmKGhvdGVsLmNvb3IsIHNwb3QuY29vcilcclxuICAgICAgICAgICAgICAgICAgICBpZihkaWYgPCA1MDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5zcG90LndhbGthYmxlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuazppLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lkOnNwb3Quc2lkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjwyMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2FmZXR5X2xvY2FsLnNwb3QgPT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhZmV0eV9sb2NhbC5zcG90ID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9ICgyNTAgLSBkaWYpLzIwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkaWYgPCAxNTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuc3BvdC5wdXNoKHNwb3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYWZldHlfbG9jYWwuc3BvdCA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBob3RlbC5sb2NhbC5ncm9jZXJ5ID0gW11cclxuXHJcbiAgICAgICAgICAgIGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRybyA9IHtcclxuICAgICAgICAgICAgICAgIGRpc3RhbmNlOiAxMDAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgbGluZSBpbiBob3RlbC5tZXRyb0luZm8pIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXRybyA9IGhvdGVsLm1ldHJvSW5mb1tsaW5lXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihtZXRyby5kaXN0YW5jZTxob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8uZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRybyA9IG1ldHJvO1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRyby5saW5lID0gbGluZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRhdGEubG9jYWwubG9jYWwuZ3JvY2VyeS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGdyb2NlcnkgPSB0aGlzLmRhdGEubG9jYWwubG9jYWwuZ3JvY2VyeVtpXTtcclxuICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoaG90ZWwuY29vciwgZ3JvY2VyeSlcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkaWY8MTEwKXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5ncm9jZXJ5LnB1c2goZGlmKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NvcmUgKz0gTWF0aC5taW4oKGhvdGVsLmxvY2FsLmdyb2NlcnkubGVuZ3RoIC8gNiksIDAuNylcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmdyb2NlcnkubGVuZ3RoPjMpe1xyXG4gICAgICAgICAgICAgICAgc2FmZXR5X2xvY2FsLmdyb2NlcnkgPSAyO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihob3RlbC5sb2NhbC5ncm9jZXJ5Lmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgIHNhZmV0eV9sb2NhbC5ncm9jZXJ5ID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBhcmVhU2NvcmUgPSBNYXRoLnJvdW5kKChhcmVhU2FmZXR5LnNjb3JlKjEgKyAoYXJlYVNhZmV0eS5taXNkZW1lYW5vci8zKSoxKSoxMCkvMTBcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgbG9jYWxUeHQgPSAnJztcclxuICAgICAgICAgICAgdmFyIGxvY2FsR29vZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYoc2FmZXR5X2xvY2FsLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgbG9jYWxUeHQgKz0gJ+unqO2VtO2KvCDtlZzrs7XtjJDsl5Ag7JyE7LmY7ZW0IOycoOuPmeyduOq1rOqwgCDrp6TsmrAg66eOJ1xyXG4gICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycoOuPmeyduOq1rOqwgCDrp6TsmrAg66eO7J2AIOunqO2VtO2KvCDtlZzrs7XtjJDsl5Ag7JyE7LmY7ZWY6rOgLCDsp4DtlZjssqDrj4Qg6rCA6rmM7JuMIOuwpCDriqbqsozquYzsp4Ag7JWI7KCE7ZWY7KeA66eMIOyGjOunpOy5mOq4sCDrk7Eg6rK967KU7KOE7JeQ64qUIOyhsOyLrO2VtOyVvCDtlagnXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwuc3BvdC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2FmZXR5X2xvY2FsLmdyb2Nlcnk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNhZmV0eV9sb2NhbC5hdG0+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFR4dCArPSAn7KO867OAIOyDgeyXheyLnOyEpCwg7Y647J2Y7Iuc7ISk7J20IOyemCDqsJbstpTslrTsoLgg7J6I6rOgLCAnICsgaG90ZWwubG9jYWwuc3BvdFswXS5uYW1lLmtvICsgJyDrk7Eg7Jyg66qFIOq0gOq0keyngOqwgCDqsIDquYzsm4wg7Jyg64+Z7J246rWs6rCAIOunpOyasCDrp47snYwuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxHb29kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFR4dCArPSAn7KO867OAIO2OuOydmOyLnOyEpOydtCDsnpgg6rCW7LaU7Ja07KC4IOyeiOqzoCwgJyArIGhvdGVsLmxvY2FsLnNwb3RbMF0ubmFtZS5rbyArICcg65OxIOycoOuqhSDqtIDqtJHsp4DqsIAg6rCA6rmM7JuMIOycoOuPmeyduOq1rCDrp47snYwuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxHb29kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzYWZldHlfbG9jYWwuYXRtPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxUeHQgKz0gJ+yjvOuzgCDsg4Hsl4Xsi5zshKTsnbQg7J6YIOqwluy2lOyWtOyguCDsnojqs6AsICcgKyBob3RlbC5sb2NhbC5zcG90WzBdLm5hbWUua28gKyAnIOuTsSDsnKDrqoUg6rSA6rSR7KeA6rCAIOqwgOq5jOybjCDsnKDrj5nsnbjqtawg66eO7J2MLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsR29vZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxUeHQgKz0gIGhvdGVsLmxvY2FsLnNwb3RbMF0ubmFtZS5rbyArICcg65OxIOycoOuqhSDqtIDqtJHsp4DqsIAg6rCA6rmM7JuMIOycoOuPmeyduOq1rOqwgCDrp47snYwuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxHb29kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNhZmV0eV9sb2NhbC5ncm9jZXJ5PjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzYWZldHlfbG9jYWwuYXRtPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxUeHQgKz0gJ+yjvOuzgCDsg4Hsl4Xsi5zshKQsIO2OuOydmOyLnOyEpOydtCDsnpgg6rCW7LaU7Ja07KC4IOyeiOyWtCDsnKDrj5nsnbjqtazqsIAg66eO7J2MLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsR29vZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzYWZldHlfbG9jYWwuYXRtPjApe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihhcmVhU2NvcmU+Ny41KXtcclxuICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+yghOuwmOyggeycvOuhnCDsuZjslYjsnbQg7KKL7J2AICcrYXJlYU5hbWUrJyDsp4Dsl63sl5Ag7JyE7LmY7ZWY6rOgIOyeiCdcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihsb2NhbEdvb2Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRyby5kaXN0YW5jZTwxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycvOupsCwg7KO867OAIOycoOuPmeyduOq1rOqwgCDrp47qs6Ag7KeA7ZWY7LKg7J20IOqwgOq5jOybjCDrsKQg64qm6rKM6rmM7KeA64+EIOunpOyasCDslYjsoITtlaguJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0VHh0ICs9ICfsnLzrqbAsIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg66eO7JWEIOyngOyXrSDrgrTsl5DshJzrj4Qg642UIOyViOyghO2VnCDtjrguJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsVHh0ICs9ICfsp4Dsl60g64K0IOuLpOuluCDsiJnshozrk6Tsl5Ag67mE7ZW0IOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg7JWE7KO8IOunjuyngOuKlCDslYrsnYAg7Y64LidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNhZmV0eV9sb2NhbC5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwubmVhcmVzdE1ldHJvLmRpc3RhbmNlPDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG9ydFR4dCArPSAn7Jy866mwLCDsp4DtlZjssqDsnbQg6rCA6rmM7JuMIOuwpCDriqbqsowg6reA6rCA7ZWgIOuVjOuPhCDslYjsoITtlZwg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG9ydFR4dCArPSAn7KeA66eMIOuEiOustCDrsKQg64qm6rKMIOuPjOyVhOuLpOuLiOuKlCDqsoPsnYAg7IK86rCA64qUIOqyg+ydtCDsoovsnYwuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihhcmVhU2NvcmU+Ni44KXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZighc2FmZXR5X2xvY2FsLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3J0VHh0ICs9ICfsuZjslYjsnbQg7KKL7J2AIO2OuOyduCAnK2FyZWFOYW1lKycg7KeA7Jet7JeQIOychOy5mO2VmOqzoCDsnognXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobG9jYWxHb29kKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNhZmV0eV9sb2NhbC5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwubmVhcmVzdE1ldHJvLmRpc3RhbmNlPDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG9ydFR4dCArPSAn7Jy866mwLCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOunjuqzoCDsp4DtlZjssqDsnbQg6rCA6rmM7JuMIOuwpCDriqbqsozquYzsp4Drj4Qg7JWI7KCE7ZWcIO2OuC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycvOupsCwg7KO867OAIOycoOuPmeyduOq1rOqwgCDrp47slYQg7KeA7JetIOuCtOyXkOyEnOuPhCDslYjsoITtlZwg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFR4dCArPSAn7KeA7JetIOuCtCDri6Trpbgg7IiZ7IaM65Ok7JeQIOu5hO2VtCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOyVhOyjvCDrp47sp4DripQg7JWK7J2AIO2OuC4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRyby5kaXN0YW5jZTwxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycvOupsCwg7KeA7ZWY7LKg7J20IOqwgOq5jOybjCDrsKQg64qm6rKMIOq3gOqwgO2VoCDrlYzrj4Qg7JWI7KCE7ZWcIO2OuC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+yngOunjCDrhIjrrLQg67CkIOuKpuqyjCDrj4zslYTri6Tri4jripQg6rKD7J2AIOyCvOqwgOuKlCDqsoPsnbQg7KKL7J2MLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGFyZWFTY29yZT42KXtcclxuICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQrPSBhcmVhTmFtZSsgJyDsp4Dsl63sl5Ag7JyE7LmY7ZWY6rOgIOyeiCdcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihsb2NhbEdvb2Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRyby5kaXN0YW5jZTwxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycvOupsCwg7KO867OAIOycoOuPmeyduOq1rOqwgCDrp47qs6Ag7KeA7ZWY7LKg7J20IOqwgOq5jOybjCDrsKQg64qm6rKMIOq3gOqwgO2VoCDrlYzrj4Qg7JWI7KCE7ZWcIO2OuC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycvOupsCwg7KO867OAIOycoOuPmeyduOq1rOqwgCDrp47slYQg7JWI7KCE7ZWcIO2OuOydtOyngOunjCDrhIjrrLQg67CkIOuKpuqyjCDqt4DqsIDtlZjripQg6rKD7J2AIOyCvOqwgOuKlCDqsoPsnbQg7KKL7J2MLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFR4dCArPSAn7KeA7JetIOuCtCDri6Trpbgg7IiZ7IaM65Ok7JeQIOu5hO2VtCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOunjuyngOuKlCDslYrsnYAg7Y647JeQIOyGje2VqC4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRyby5kaXN0YW5jZTwxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycvOupsCwg7KeA7ZWY7LKg7J20IOqwgOq5neyngOunjCDrhIjrrLQg67CkIOuKpuqyjCDqt4DqsIDtlZjripQg6rKD7J2AIOyCvOqwgOuKlCDqsoPsnbQg7KKL7J2MLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG9ydFR4dCArPSAn7Jy866mwLCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOyVhOyjvCDrp47snYAg7Y647J2AIOyVhOuLiOuvgOuhnCDrsKQg64qm6rKMIOuPjOyVhOuLpOuLiOyngCDslYrripQg6rKD7J20IOyii+ydjC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoIXNhZmV0eV9sb2NhbC5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICBzaG9ydFR4dCs9J+yghOuwmOyggeycvOuhnCDsuZjslYjsnbQg7KKL7KeAIOyViuydgCDtjrjsnbggJythcmVhTmFtZSsgJyDsp4Dsl63sl5Ag7JyE7LmY7ZWY6rOgIOyeiCdcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihsb2NhbEdvb2Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFzYWZldHlfbG9jYWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRyby5kaXN0YW5jZTwxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycvOupsCwg7Jyg64+Z7J246rWs6rCAIOunjuqzoCDsp4DtlZjssqDsnbQg6rCA6rmM7JuMIOyngOyXrSDrgrTsl5DshJzripQg7JWI7KCE7ZWcIO2OuOydtOyngOunjCDriqbsnYAg7Iuc6rCEIOq3gOqwgOuKlCDsgrzqsIDripQg6rKD7J20IOyii+ydjC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvcnRUeHQgKz0gJ+ycvOupsCwg7KO867OAIOycoOuPmeyduOq1rOqwgCDrp47snYAg7Y647J207KeA66eMIOuKpuydgCDsi5zqsIQg6reA6rCA7ZWY7KeAIOyViuuKlCDqsoPsnbQg7KKL7J2MLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsVHh0ICs9ICfso7zrs4Dsl5Ag66eO7J2AIOyLnOyEpOydtCDsnojqsbDrgpgg7Jyg66qF7ZWcIOq0gOq0keyngOqwgCDsnojsp4Ag7JWK7JWEIOycoOuPmeyduOq1rOqwgCDsp4Dsl60g64K07JeQ7ISc64+EIOunjuyngCDslYrsnYAg7Y64LidcclxuICAgICAgICAgICAgICAgICAgICBpZighc2FmZXR5X2xvY2FsLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbC5uZWFyZXN0TWV0cm8uZGlzdGFuY2U8MTAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0VHh0ICs9ICfsnLzrqbAsIOyngO2VmOyyoOydtCDqsIDquZ3sp4Drp4wg7Jyg64+Z7J246rWs6rCAIOunjuyngCDslYrsnYAg7Y647J2066+A66GcIOyViOyghOyXkCDsnKDsnZjtlbTslbwg7ZWoLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG9ydFR4dCArPSAn7Jy866mwLCDsnKDrj5nsnbjqtazqsIAg66eO7KeAIOyViuyVhCDslYjsoITsl5Ag7Jyg7J2Y7ZW07JW8IO2VqC4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNhZmVfdHh0LnB1c2gobG9jYWxUeHQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1ldCA9IGhvdGVsLmxvY2FsLm5lYXJlc3RNZXRybztcclxuICAgICAgICAgICAgdmFyIG1ldERpcyA9IG1ldC5kaXN0YW5jZTtcclxuICAgICAgICAgICAgdmFyIG1ldFR4dCA9ICfqsIDsnqUg6rCA6rmM7Jq0IOyngO2VmOyyoCDsl63snYAgJyArIG1ldC5saW5lICsgJ+2YuOyEoCAnICsgbWV0Lm5hbWUgKyAn7Jet7Jy866GcLCDrj4Trs7TroZwg7JW9ICcgKyhNYXRoLmZsb29yKG1ldERpcy83NSkgKyAxKSsn67aEIOqxsOumrOyXkCDsnognO1xyXG5cclxuICAgICAgICAgICAgaWYobWV0RGlzPDIwMCl7XHJcbiAgICAgICAgICAgICAgICBtZXRUeHQgKz0gJ+yWtCDriqbsnYAg67Ck7JeQIOq3gOqwgO2VmOq4sCDsoovsnYwuJ1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihtZXREaXM8NTAwKXtcclxuICAgICAgICAgICAgICAgIG1ldFR4dCArPSAn7J2MLidcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBtZXRUeHQgKz0gJ+yWtCDrhIjrrLQg64qm7J2AIOuwpOyXkOuKlCDsp4DtlZjssqDroZwg6reA6rCA7ZWY6riwIOu2gOuLtOyKpOufrOyauCDsiJgg7J6I7J2MJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbWV0U2NvcmUgPSBNYXRoLm1heChNYXRoLnJvdW5kKCgzMDAgLSBtZXREaXMpLzMwMCksMCk7XHJcblxyXG4gICAgICAgICAgICBzY29yZSs9IG1ldFNjb3JlXHJcblxyXG4gICAgICAgICAgICBpZihzY29yZT45LjIpe1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgPSA5LjIgKyAoc2NvcmUtOS4yKS80XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNjb3JlID0gTWF0aC5taW4oTWF0aC5yb3VuZChzY29yZSo3LjkyKzIyKS8xMCw5LjkpO1xyXG5cclxuICAgICAgICAgICAgc2FmZV90eHQucHVzaChtZXRUeHQpO1xyXG5cclxuICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zYWZldHkgPSB7XHJcbiAgICAgICAgICAgICAgICBzY29yZTogc2NvcmVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NvcmVBcnJheS5wdXNoKHNjb3JlKVxyXG5cclxuICAgICAgICAgICAgaWYoc2NvcmU+OS40KXtcclxuICAgICAgICAgICAgICAgIHNhZmVfdHh0LnB1c2goJ+yghOuwmOyggeycvOuhnCDribTsmpXsnZgg7IiZ7IaM65OkIOykkeyXkOyEnOuPhCDsuZjslYjsnLzroZzripQg7LWc7IOB7JyE6raM7JeQIOyGje2VtCDsl6ztlonsnYQg7KaQ6riw6riwIOyii+ydjC4nKVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihzY29yZT45KXtcclxuICAgICAgICAgICAgICAgIHNhZmVfdHh0LnB1c2goJ+uJtOyalSDsiJnshozrk6Qg7KSR7JeQ7ISc64+EIOyghOuwmOyggeycvOuhnCDsg4Hri7ntnogg7KKL7J2AIOy5mOyViOydhCDsnpDrnpHtlaguJylcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+OC41KXtcclxuICAgICAgICAgICAgICAgIHNhZmVfdHh0LnB1c2goJ+yghOuwmOyggeycvOuhnCDso7zrs4Ag7LmY7JWI7J20IOyViOygleuQmOyWtCDsl6ztlontlZjquLDsl5Ag7KKL7J2MLicpXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHNjb3JlPjcuOSl7XHJcbiAgICAgICAgICAgICAgICBzYWZlX3R4dC5wdXNoKCfrsKQg64qm6rKMIOuPjOyVhOuLpOuLiOyngCDslYrqs6Ag7KGw7Ius7ZWc64uk66m0IOyghOuwmOyggeycvOuhnCDsl6ztlontlZjquLDsl5Ag7JWI7KCE7ZWcIO2OuC4nKVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihzY29yZT43LjMpe1xyXG4gICAgICAgICAgICAgICAgc2FmZV90eHQucHVzaCgn7KCE67CY7KCB7Jy866GcIOuJtOyalSDtj4nqt6Ag7KCV64+E7J2YIOy5mOyViCDsiJjspIDsnYQg67O07J2066mwLCDsobDsi6ztnogg64uk64uQIO2VhOyalOuKlCDsnojsnYwuJylcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Ni45KXtcclxuICAgICAgICAgICAgICAgIHNhZmVfdHh0LnB1c2goJ+y5mOyViOydtCDslYTso7wg64KY7IGY7KeA64qUIOyViuyngOunjCDsobDsi6ztnogg64uk64uI64qUIOqyg+ydtCDsoovsnYwuJylcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBzYWZlX3R4dC5wdXNoKCfsuZjslYjsnbQg7KKL7J2AIO2OuOydgCDslYTri4jrr4DroZwg7JWI7KCE7ZWcIOyImeyGjOulvCDsm5DtlZzri6TrqbQg7KKL7J2AIOyEoO2DneydgCDslYTri5guJylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaG90ZWwuZXhwbGFpbi5zYWZldHkgPSBzYWZlX3R4dDtcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLnN1bW1hcnkpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuc3VtbWFyeS5zYWZldHkgPSBzaG9ydFR4dDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5zdW1tYXJ5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNhZmV0eTogc2hvcnRUeHRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNjb3JlQXJyYXkuc29ydCgpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhzY29yZUFycmF5KVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmVfdHJhbnNwb3J0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaXR5ID0gdGhpcy5jaXR5XHJcbiAgICAgICAgbGV0IG9yZGVyQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyYW5zcG9ydF90eHQgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIC8v6rWQ7Ya1IO2OuOydmOyEsSDsoJDsiJjrtoDsl6zsmqlcclxuICAgICAgICAgICAgbGV0IGdvb2RMaW5lID0gW107XHJcbiAgICAgICAgICAgIC8v7KKL7J2AIOyngO2VmOyyoCDrnbzsnbjrk6QgQXJyYXlcclxuICAgICAgICAgICAgbGV0IHZpc2l0YWJsZSA9IFtdO1xyXG4gICAgICAgICAgICAvL+2ZmOyKuSDsl4bsnbQg6rCIIOyImCDsnojripQg6rSA6rSR7KeAIOuqqeuhnVxyXG4gICAgICAgICAgICBsZXQgbmVhcmVzdCA9IHtkaXN0YW5jZToxMDAwLCBuYW1lOlwiXCIsIGNvZGU6XCJcIn07XHJcbiAgICAgICAgICAgIC8v6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqBcclxuICAgICAgICAgICAgbGV0IGxpbmVObyA9IDBcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLm1ldHJvSW5mbyl7XHJcbiAgICAgICAgICAgICAgICBsaW5lTm8gPSBPYmplY3Qua2V5cyhob3RlbC5tZXRyb0luZm8pLmxlbmd0aFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vMTDrtoTqsbDrpqwg7J2064K07J2YIOyngO2VmOyyoCAg64W47ISgIOqwnOyImFxyXG5cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIG1ldExpbmUgaW4gaG90ZWwubWV0cm9JbmZvKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwubWV0cm9JbmZvW21ldExpbmVdLmRpc3RhbmNlIDwgbmVhcmVzdC5kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdCA9IGhvdGVsLm1ldHJvSW5mb1ttZXRMaW5lXVxyXG4gICAgICAgICAgICAgICAgICAgIC8v6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqAg6rCx7IugXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5kYXRhLm1ldHJvTGluZVttZXRMaW5lXS5zY29yZT44MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ29vZExpbmUucHVzaChtZXRMaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgIC8v7KKL7J2AIOudvOyduOydtOuptCDtkbjsi5ztlahcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YS5tZXRyb0xpbmVbbWV0TGluZV0uc3BvdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcG90ID0gdGhpcy5kYXRhLm1ldHJvTGluZVttZXRMaW5lXS5zcG90W2ldXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXZpc2l0YWJsZS5pbmNsdWRlcyhzcG90Lm5hbWUpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRhYmxlLnB1c2goc3BvdC5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoTWF0aC5jZWlsKChuZWFyZXN0LmRpc3RhbmNlKS83MCk8NCl7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnRfdHh0LnB1c2goJ+qwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKgIOyXreydgCA8Yj4nICsgbmVhcmVzdC5uYW1lICsgXCI8L2I+IOyXreycvOuhnCwgPHN0cm9uZz7rj4Trs7Qg64uoIFwiKyBNYXRoLmNlaWwoKG5lYXJlc3QuZGlzdGFuY2UpLzcwKSArXCLrtoQg6rGw66asPC9zdHJvbmc+XCIpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydF90eHQucHVzaCgn6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqAg7Jet7J2AIDxiPicgKyBuZWFyZXN0Lm5hbWUgKyBcIjwvYj4g7Jet7Jy866GcLCDrj4Trs7QgXCIrIE1hdGguY2VpbCgobmVhcmVzdC5kaXN0YW5jZSkvNzApICtcIuu2hCDqsbDrpqxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJhbnNwb3J0X3R4dC5wdXNoKCfsiJnshozsl5DshJwg64+E67O0IDEw67aE6rGw66asIOydtOuCtOyXkCA8Yj7sp4DtlZjssqAgJyArIGxpbmVObyArICfqsJwg64W47ISgPC9iPuydtCDsp4DrgqgnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGdvb2RMaW5lLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGlmKGdvb2RMaW5lLmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRfdHh0LnB1c2goJ+q3uCDspJHsl5DshJzrj4Qg7Iuk7KeI7KCB7Jy866GcICcrdGhpcy5jaXR5TmFtZSsnIOq0gOq0keyXkCDtjrjrpqztlZwgPHN0cm9uZz4nKyBnb29kTGluZSArICftmLjshKA8L3N0cm9uZz7snbQg7KeA64KY64qUIDxiPuy0iCDsl63shLjqtow8L2I+Jyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRfdHh0LnB1c2goJ+q3uCDspJHsl5DshJzrj4Qg7Iuk7KeI7KCB7Jy866GcICcrdGhpcy5jaXR5TmFtZSsnIOq0gOq0keyXkCDtjrjrpqztlZwgPHN0cm9uZz4nKyBnb29kTGluZSArICftmLjshKA8L3N0cm9uZz7snbQg7KeA64KY64qUIDxiPiDsl63shLjqtow8L2I+Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzcG90Tm8gPSB2aXNpdGFibGUubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihzcG90Tm8+MCl7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiAxMDDrjIAg6rSA6rSR7KeAIC0+IOuJtOyalSDsi6TsoJwgc3BvdCDrjbDsnbTthLAg6ri47J20XHJcbiAgICAgICAgICAgICAgICBpZihzcG90Tm8+OTApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydF90eHQucHVzaCgnPGI+JyArIHRoaXMuY2l0eU5hbWUgKyAnIDEwMOuMgCDqtIDqtJHsp4Ag7KSRICcrc3BvdE5vKyfqsJw8L2I+66W8IO2ZmOyKuSDsl4bsnbQg67Cp66y47ZWgIOyImCDsnojripQgPHN0cm9uZz7stZzqs6DsnZgg6rWQ7Ya1IOyalOyngDwvc3Ryb25nPicpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoc3BvdE5vPjc1KXtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRfdHh0LnB1c2goJzxiPicgKyB0aGlzLmNpdHlOYW1lICsgJyAxMDDrjIAg6rSA6rSR7KeAIOykkSAnK3Nwb3RObysn6rCcPC9iPuulvCDtmZjsirkg7JeG7J20IOuwqeusuO2VoCDsiJgg7J6I64qUIDxzdHJvbmc+6rWQ7Ya1IOyalOyngDwvc3Ryb25nPicpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0X3R4dC5wdXNoKHRoaXMuY2l0eU5hbWUgKyAnIDEwMOuMgCDqtIDqtJHsp4Ag7KSRICcrc3BvdE5vKyfqsJzrpbwg7ZmY7Iq5IOyXhuydtCDrsKnrrLgg6rCA64qlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIG1ldExpbmUgaW4gaG90ZWwubWV0cm9JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWV0RGlzdGFuY2UgPSBob3RlbC5tZXRyb0luZm9bbWV0TGluZV0uZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSAoMTAwMDAgLSBtZXREaXN0YW5jZSkqdGhpcy5kYXRhLm1ldHJvTGluZVttZXRMaW5lXS5zY29yZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3JkZXJBcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHNjb3JlOiBzY29yZSxcclxuICAgICAgICAgICAgICAgIGhpZDogaGlkXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5leHBsYWluKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmV4cGxhaW4udHJhbnNwb3J0ID0gdHJhbnNwb3J0X3R4dDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5leHBsYWluID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDp0cmFuc3BvcnRfdHh0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9yZGVyQXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuc2NvcmUgPCBiLnNjb3JlID8gMSA6IGEuc2NvcmUgPiBiLnNjb3JlID8gLTEgOiAwO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBvcmRlckFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbb3JkZXJBcnJheVtpXS5oaWRdO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSBNYXRoLnJvdW5kKCgxIC0gKGkvbGVuKSooaS9sZW4pKSo2MCkvMTAgICsgNFxyXG4gICAgICAgICAgICAgLy80LjAgfiAxMC4wIOyCrOydtOydmCDsoJDsiJjrpbwg7IaM7IiY7KCQIDHsnpDrpqzquYzsp4Ag67aA7Jes7ZWc64ukLlxyXG4gICAgICAgICAgICAgLy/rhpLsnYAg7KCQ7IiY6rCAIOuNlCDrp47ri7lcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC50cmFuc3BvcnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6IHNjb3JlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTpzY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIiNzdGF0dXNfdHJhbnNwb3J0XCIpLmh0bWwoXCLrjIDspJHqtZDthrUg7KCV67O0IOuwnOqyrC4g6rWQ7Ya1IO2OuOydmOyEseydhCDqs4TsgrDtlanri4jri6QuIC0g6rOE7IKw7J2EIOyZhOujjO2WiOyKteuLiOuLpC5cIik7XHJcbiAgICAgICAgdGhpcy5kYXRhLnN0YXR1cy5ob3RlbHMudHJhbnNwb3J0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2l0eSkudXBkYXRlKHRoaXMuZGF0YSlcclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmVfZmFjaWxpdHk6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb3RlbDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9jaXR5L2hvdGVsLmpzIiwibGV0IEFyZWEgPSB7XHJcbiAgICBkYXRhOnt9LFxyXG4gICAgY2l0eTpcIlwiLFxyXG4gICAgY2l0eU5hbWU6XCJcIixcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgJChcIi5hcmVhX19wYWdlXCIpLm9uKFwiY2hhbmdlXCIsIFwiLmFyZWFfX2xpbmUgaW5wdXRcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5zY29yZUNoYW5nZSgkKHRoaXMpKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEsIGNpZCwgbmFtZSl7XHJcbiAgICAgICAgJChcIi5jaXR5TmFtZVwiKS5odG1sKG5hbWUpLmF0dHIoXCJpZFwiLCBjaWQpO1xyXG4gICAgICAgICQoXCIuY2l0eUNvZGVWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5jaXR5X19wYWdlcyBcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmFyZWFcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2l0eSA9IGNpZDtcclxuICAgICAgICB0aGlzLmNpdHlOYW1lID0gbmFtZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5pbmZsYXRlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNjb3JlQ2hhbmdlOiBmdW5jdGlvbihkaXYpe1xyXG5cclxuICAgICAgICBpZihpc05hTihkaXYudmFsKCkqMSkpe1xyXG4gICAgICAgICAgICB0b2FzdChcIuyIq+yekOuhnOunjCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgIGRpdi52YWwoMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGRpdi52YWwoKT4xMHx8ZGl2LnZhbCgpPDEpe1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCIxfjEwIOyCrOydtOydmCDsiKvsnpDrpbwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgZGl2LnZhbCgwKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihkaXYuaGFzQ2xhc3MoXCJpbnB1dF9fc2NvcmVcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZHggPSAkKFwiLmlucHV0X19zY29yZVwiKS5pbmRleChkaXYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi52YWwoZGl2LnZhbCgpKjEpXHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QodGhpcy5kYXRhLmFyZWFbaWR4XS5uYW1lK1wi7J2YIOy5mOyViOygkOyImOqwgCBcIitkaXYudmFsKCkqMStcIuygkOycvOuhnCDrs4Dqsr3rkJjsl4jsirXri4jri6QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK3RoaXMuY2l0eStcIi9hcmVhL1wiK2lkeCtcIi9zYWZldHkvc2NvcmVcIikuc2V0KGRpdi52YWwoKSlcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGRpdi5oYXNDbGFzcyhcImlucHV0X19taXNkZW1lYW5vclwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkeCA9ICQoXCIuaW5wdXRfX21pc2RlbWVhbm9yXCIpLmluZGV4KGRpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LnZhbChkaXYudmFsKCkqMSlcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdCh0aGlzLmRhdGEuYXJlYVtpZHhdLm5hbWUrXCLsnZgg6rK967KU7KOEIOygkOyImOqwgCBcIitkaXYudmFsKCkqMStcIuygkOycvOuhnCDrs4Dqsr3rkJjsl4jsirXri4jri6QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK3RoaXMuY2l0eStcIi9hcmVhL1wiK2lkeCtcIi9zYWZldHkvbWlzZGVtZWFub3JcIikuc2V0KGRpdi52YWwoKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcbiAgICAgICAgbGV0IGFyZWFkYXRhID0ge31cclxuXHJcbiAgICAgICAgaWYodGhpcy5kYXRhLmFyZWEpe1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YS5hcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJlYSA9IHRoaXMuZGF0YS5hcmVhW2ldO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJlYSlcclxuICAgICAgICAgICAgICAgIGlmKCFhcmVhLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v67iM66Gc65Oc7Juo7J20LCDshLztirjrn7TtjIztgawg65OxIOuEk+ydgCDsp4Dsl63snYQg7LCo7KeA7ZWY64qUIOq0gOq0keyngOuPhCBhcmVhIOy3qOq4ie2VmOq4sCDrlYzrrLjsl5Ag6rG465+s64K06riwXHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImFyZWFfX2RpdlwiPidcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwiYXJlYV9fbGluZVwiPidcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICAgICAnPHAgY2xhc3M9XCJhcmVhX19uYW1lXCI+JythcmVhLm5hbWUrJzwvcD4nXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihhcmVhLnNhZmV0eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXJlYV9fbGluZV9fc3ViVGl0bGVcIj7suZjslYjsoJDsiJg8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVhLnNhZmV0eS5zY29yZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8aW5wdXQgY2xhc3M9XCJhcmVhX19saW5lX19pbnB1dC0tc2hvcnQgaW5wdXRfX3Njb3JlXCIgdmFsdWU9XCInK2FyZWEuc2FmZXR5LnNjb3JlKydcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPGlucHV0IGNsYXNzPVwiYXJlYV9fbGluZV9faW5wdXQtLXNob3J0IGlucHV0X19zY29yZVwiIHZhbHVlPVwiMFwiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhcmVhX19saW5lX19zdWJUaXRsZVwiPuqyveuylOyjhOygkOyImDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZWEuc2FmZXR5Lm1pc2RlbWVhbm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxpbnB1dCBjbGFzcz1cImFyZWFfX2xpbmVfX2lucHV0LS1zaG9ydCBpbnB1dF9fbWlzZGVtZWFub3JcIiB2YWx1ZT1cIicrYXJlYS5zYWZldHkubWlzZGVtZWFub3IrJ1wiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8aW5wdXQgY2xhc3M9XCJhcmVhX19saW5lX19pbnB1dC0tc2hvcnQgaW5wdXRfX21pc2RlbWVhbm9yXCIgdmFsdWU9XCIwXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXJlYV9fbGluZV9fc3ViVGl0bGVcIj7suZjslYjsoJDsiJg8L3A+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8aW5wdXQgY2xhc3M9XCJhcmVhX19saW5lX19pbnB1dC0tc2hvcnQgaW5wdXRfX3Njb3JlXCIgdmFsdWU9XCIwXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImFyZWFfX2xpbmVfX3N1YlRpdGxlXCI+6rK967KU7KOE7KCQ7IiYPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPGlucHV0IGNsYXNzPVwiYXJlYV9fbGluZV9faW5wdXQtLXNob3J0IGlucHV0X19taXNkZW1lYW5vclwiIHZhbHVlPVwiMFwiPidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIuYXJlYV9fcGFnZVwiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcmVhO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2NpdHkvYXJlYS5qcyIsImxldCBTdWJ3YXkgPSB7XHJcbiAgICBtYXA6e30sXHJcbiAgICBtYXJrZXI6ZmFsc2UsXHJcbiAgICBtZXRybzpbXSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlsb1wiKVxyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9ueWMvbWV0cm9cIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICB0aGF0Lm1ldHJvID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3Vid2F5TWFwJyksIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcjogeyBsYXQ6IDQwLjc0ODQ0LCBsbmc6IC03My45ODU2NiB9LFxyXG4gICAgICAgICAgICAgICAgem9vbTogMTMsXHJcbiAgICAgICAgICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzY2FsZUNvbnRyb2w6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1hcC5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZFN1YndheShlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBmaW5kU3Vid2F5OiBmdW5jdGlvbihlKXtcclxuICAgICAgICBsZXQgY29vciA9IHtcclxuICAgICAgICAgICAgbGF0OmUubGF0TG5nLmxhdCgpLFxyXG4gICAgICAgICAgICBsbmc6ZS5sYXRMbmcubG5nKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMubWFya2VyKXtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXIuc2V0TWFwKG51bGwpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogZS5sYXRMbmcsXHJcbiAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHR4dCA9ICcnXHJcbiAgICAgICAgbGV0IG1ldHJvSW5mbyA9IHt9XHJcbiAgICAgICAgbGV0IG1ldHJvQnlTdG4gPSB7fTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0NzM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbWV0cm9OYW1lID0gdGhpcy5tZXRyb1tpXS5uYW1lO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRpZiA9IE1hdGgucm91bmQoY2FsY3VsYXRlRGlmKGNvb3IsdGhpcy5tZXRyb1tpXS5jb29yKSk7XHJcblxyXG4gICAgICAgICAgICBpZihkaWY8NzAwKXtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5tZXRyb1tpXS5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmUgPSB0aGlzLm1ldHJvW2ldLmxpbmVba10uc2xpY2UoMCwxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWV0cm9JbmZvW2xpbmVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGlmPG1ldHJvSW5mb1tsaW5lXS5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0cm9JbmZvW2xpbmVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZjogZGlmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldHJvTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvSW5mb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZjogZGlmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbWV0cm9OYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobWV0cm9CeVN0blttZXRyb05hbWVdKXtcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb0J5U3RuW21ldHJvTmFtZV0ubGluZSA9IG1ldHJvQnlTdG5bbWV0cm9OYW1lXS5saW5lLmNvbmNhdCh0aGlzLm1ldHJvW2ldLmxpbmUpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb0J5U3RuW21ldHJvTmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZjogZGlmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLm1ldHJvW2ldLmxpbmVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtZXRBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGxpbmUgaW4gbWV0cm9JbmZvKSB7XHJcbiAgICAgICAgICAgIG1ldEFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbGluZTpsaW5lLFxyXG4gICAgICAgICAgICAgICAgbmFtZTptZXRyb0luZm9bbGluZV0ubmFtZSxcclxuICAgICAgICAgICAgICAgIGRpZjptZXRyb0luZm9bbGluZV0uZGlmXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1ldFN0bkFycmF5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBtZXRyb0J5U3RuKSB7XHJcbiAgICAgICAgICAgIG1ldFN0bkFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbGluZTptZXRyb0J5U3RuW25hbWVdLmxpbmUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkaWY6bWV0cm9CeVN0bltuYW1lXS5kaWZcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXRBcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5kaWYgPiBiLmRpZiA/IDEgOiBhLmRpZiA8IGIuZGlmID8gLTEgOiAwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbWV0U3RuQXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZGlmID4gYi5kaWYgPyAxIDogYS5kaWYgPCBiLmRpZiA/IC0xIDogMDtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0eHQrPSc8cCBjbGFzcz1cInN1YndheV9faW5mb19fdGl0bGVcIj7sl63rs4Q8L3A+J1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpdlwiPidcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldFN0bkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2xpbmVcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fc3RuTmFtZVwiPicrIG1ldFN0bkFycmF5W2ldLm5hbWUgKyAn7JetPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19kaWZcIj4nKyBNYXRoLmNlaWwobWV0U3RuQXJyYXlbaV0uZGlmLzgwKSArICfrtoQg6rGw66asPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX2xpbmVMaW5lXCI+J1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IG1ldFN0bkFycmF5W2ldLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKG1ldFN0bkFycmF5W2ldLmxpbmVba10ubGVuZ3RoID09PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX2xpbmVOYW1lIGxuXycrbWV0U3RuQXJyYXlbaV0ubGluZVtrXSsnXCI+JyttZXRTdG5BcnJheVtpXS5saW5lW2tdICsgJzwvcD4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHh0Kz0gICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG4gICAgICAgIHR4dCs9JzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX190aXRsZVwiPuuFuOyEoOuzhDwvcD4nXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fZGl2XCI+J1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0QXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fbGluZVwiPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2xpbmVOYW1lIGxuXycrbWV0QXJyYXlbaV0ubGluZSsnXCI+JyttZXRBcnJheVtpXS5saW5lICsgJzwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19kaWZcIj4nKyBNYXRoLmNlaWwobWV0QXJyYXlbaV0uZGlmLzgwKSArICfrtoQg6rGw66asPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3N0bk5hbWVcIj4nKyBtZXRBcnJheVtpXS5uYW1lICsgJ+yXrTwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICAkKFwiLnN1YndheV9faW5mb1wiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN1YndheTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9zdWJ3YXkuanMiLCJsZXQgQWNjb3VudCA9IHtcclxuICAgIHVzZXI6IHt9LFxyXG4gICAgaW5pdDogZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB1aWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYodWlkICE9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyW3VpZF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGRhdGFbdWlkXS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoXCJoZWFkZXIgdWxcIikucHJlcGVuZCgnPGxpIGlkPVwibmF2X2FjY291bnRcIj7tmozqs4Q8L2xpPicpO1xyXG5cclxuICAgICAgICAgICAgJChcImhlYWRlciB1bFwiKS5vbihcImNsaWNrXCIsIFwiI25hdl9hY2NvdW50XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkKFwiaGVhZGVyIGxpXCIpLnJlbW92ZUNsYXNzKFwiLS1zZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCItLXNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5wYWdlcy5hY2NvdW50XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAkKCcjYWNjb3VudENhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNTY0LFxyXG4gICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGUoKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRheUNsaWNrOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hY2NvdW50LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==