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
var Config = {
    food: {
        nearStd: { //얼마나 가까이 있어야 부근에 있는걸로 인정할것이냐
            large: 500,
            grocery: 250,
            cvs: 250,
            bakery: 250
        }
    },

    atm: {
        score: {
            percentile: [0.15, 0.2, 0.25, 0.2, 0.1, 0.1], //9, 8, 7...점대의 백분위 비율 - 합계 1 되어야 함!!!

            weight: { //ATM 점수를 산출할 때 가중치(숫자 단위 무관)
                bank24: 4,
                nearest: 3.75,
                in130: 0.5
            }
        },

        word: {
            integrate: { //가장 가까운 ATM이 24시간 오픈하는 은행 소유(이거나 10m 미만 거리차이))
                std: [0.15, 0.35, 0.6], //랭킹이 해당 백분위 안에 들 경우
                word: [//word는 std보다 하나 많아야 함.(이 경우 70% 내에 못 들었을 경우의 워딩)
                " 거리로 매우 가까이에 있음 ", " 거리로 가까운 편. ", " 거리에 있음. "]
            },

            bank24: {
                std: [0.35, 0.7],
                word: [" 거리에 있고, ", " 거리로, 가까운 편. ", " 거리 떨어진 주위에 있음. "]
            },
            nearest: {
                std: [0.1, 0.25, 0.4], //랭킹이 해당 백분위 안에 들 경우
                word: [//word는 std보다 하나 많아야 함.(이 경우 70% 내에 못 들었을 경우의 워딩)
                " 거리에 있음. ", //180810 - 평가를 일단 안 하기로 함
                " 거리에 있음. ", " 거리에 있음. ", " 거리에 있음. "]
            }
        }
    }
};

exports.default = Config;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var GeoCode = {
    init: function init(arr, ref) {
        var _this = this;

        firebase.database().ref("temp/geocode").once("value", function (snap) {
            var data = snap.val();
            if (!data) {
                //다른 지오코딩 작업중이라면 절대 덮어써서는 안 됨;
                if (arr.length > 0) {
                    firebase.database().ref("temp/geocode").set({
                        ref: ref,
                        arr: arr
                    });
                }
                _this.code(arr, ref);
                toast("지오코딩 작업을 시작합니다. 여러번 새로고침 될 수 있습니다.");
            }
        });
    },

    code: function code(arr, ref) {
        var that = this;

        var geocoder = new google.maps.Geocoder();
        var address = arr[0].address;
        var aid = arr[0].aid;

        geocoder.geocode({ 'address': address }, function (results, status) {
            console.log(status);
            if (status == 'OK') {

                var coor = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                };

                firebase.database().ref(ref + "/" + aid + "/coor").set(coor);

                if (arr.length > 1) {
                    arr.shift();
                    setTimeout(function () {
                        that.code(arr, ref);
                    }, 500);
                } else {
                    firebase.database().ref("temp/geocode").set(false);
                    toast("지오코딩 작업이 완료되었습니다.");
                }
            } else {
                if (status === 'ZERO_RESULTS') {
                    console.log(arr[0]);
                    toast("지오코딩 결과가 없는 항목이 있습니다. 콘솔창을 참고해주세요");
                } else {
                    firebase.database().ref("temp/geocode").set({
                        ref: ref,
                        arr: arr
                    });
                    location.reload();
                }
            }
        });
    }
};

exports.default = GeoCode;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _attend = __webpack_require__(3);

var _attend2 = _interopRequireDefault(_attend);

var _city = __webpack_require__(4);

var _city2 = _interopRequireDefault(_city);

var _spot = __webpack_require__(5);

var _spot2 = _interopRequireDefault(_spot);

var _account = __webpack_require__(9);

var _account2 = _interopRequireDefault(_account);

var _subway = __webpack_require__(10);

var _subway2 = _interopRequireDefault(_subway);

var _hotel = __webpack_require__(11);

var _hotel2 = _interopRequireDefault(_hotel);

var _geoCode = __webpack_require__(1);

var _geoCode2 = _interopRequireDefault(_geoCode);

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

            firebase.database().ref("temp/geocode").once("value", function (snap) {
                var data = snap.val();

                if (data) {
                    _geoCode2.default.code(data.arr, data.ref);
                    toast("지오코딩 작업을 이어서 진행합니다.");
                }
            });

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
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _first_check = __webpack_require__(6);

var _first_check2 = _interopRequireDefault(_first_check);

var _seond_combine = __webpack_require__(8);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _autoCombine = __webpack_require__(7);

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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Second_combine = {};

exports.default = Second_combine;

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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setHotelInfo = __webpack_require__(12);

var _setHotelInfo2 = _interopRequireDefault(_setHotelInfo);

var _setArea = __webpack_require__(15);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setATM = __webpack_require__(13);

var _setATM2 = _interopRequireDefault(_setATM);

var _setFood = __webpack_require__(14);

var _setFood2 = _interopRequireDefault(_setFood);

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
            _setATM2.default.init(data, cid);
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
            _setFood2.default.init(data, cid);
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SetATM = {
    statistic: {
        nearest: [], //가장 가까운 ATM은 몇 m 거리에 있는지 도시 전체 평균을 내기 위한 데이터
        bank24: [], //24시간 운영하는 은행 소유 거리에 있는지 도시 전체 평균을 내기 위한 데이터
        in130: [] //반경 130m 내에 ATM이 몇 개 있는지 도시 전체 평균을 내기 위한 데이터
    },
    byArea: {}, //in130 stat을 지역별로 평균내기 위한 객체

    data: {},

    init: function init(data, cid) {
        this.data = data;

        this.first_byHotels(); //호텔들을 돌며 가장 가까운 ATM, 은행소유 24시간 ATM, 130m안에 몇 개 ATM 있는지를 찾아내고 통계에도 기록
        this.second_byAreas(); //지역별로 130m 내에 있는 ATM 갯수 평균을 냄 -> 지역 상업 발전도를 나중에 체크하기 위해 만들었음.
        this.third_makeStats(); //first에서 기록한 통계 내용을 가지고 통계값들을 산출해냄.
        this.fourth_makeRank(); //통계에 기록된 값을 바탕으로 호텔별 atm편의성 랭킹을 계산함(예-ATM가까운 정도는 뉴욕 내 7위...)
        this.fifth_makeScore();
        this.sixth_wording();
    },

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
            var weight = _config2.default.atm.score.weight;
            var score = atm.bank24 * weight.bank24 + atm.nearest * weight.nearest + atm.in130 * weight.in130;

            scoreArray.push({ score: score, hid: hid });
        }
        scoreArray.sort(function (a, b) {
            return a.score - b.score;
        }); //낮을수록 좋음


        var total = scoreArray.length;

        var rankSys = _config2.default.atm.score.percentile;

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
                hotel.assessment = {
                    score: { atm: score },
                    word: { atm: "" }
                };
            }
        }
    },

    tfc: function tfc(type, hotel) {
        //text from config

        var total = Object.keys(this.data.hotels).length;

        var rank = 0;
        if (type === "integrate") {
            rank = hotel.rank.atm.bank24 / total;
        } else {
            rank = hotel.rank.atm[type] / total;
        }

        var config = _config2.default.atm.word;
        var txt = '';
        var inStd = false;

        for (var i = 0; i < config[type].std.length; i++) {
            //n분 거리에 있다.
            if (!inStd) {
                if (rank < config[type].std[i]) {
                    txt += config[type].word[i];
                    inStd = true;
                }
            }
        }
        if (!inStd) {
            txt += config[type].word[config[type].std.length];
        }

        return txt;
    },

    sixth_wording: function sixth_wording() {
        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var txt = '';
            var atm = hotel.local.atm;

            // 1. 가장 가까운 ATM이 24시간 영업하는 ATM이거나, 거리 차이가 50m 이내인 경우 -> 24시간 ATM 워딩으로 통합
            // 2. 1이 아닐 경우 가장 가까운 ATM은 도보 단 N분거리에 있고, 24시간 오픈 ATM도 도보로 N분거리에 있어서 ~
            // 3. 은행소유 24시간 ATM이 없는 경우 -> 가장 가까운 ATM은 도보 N분거리, 은행 소유 24시간 ATM은 없음

            if (atm.bank24) {
                if (atm.bank24.dif < atm.nearest.dif + 50) {
                    //시나리오1
                    var dif = difToMin(atm.bank24.dif);
                    txt = "24\uC2DC\uAC04 \uC601\uC5C5\uD558\uB294 \uC740\uD589 \uC18C\uC720 ATM\uC774 " + dif;
                    txt += this.tfc('integrate', hotel);
                } else {
                    //시나리오 2
                    var _dif = difToMin(atm.nearest.dif);
                    var dif24 = difToMin(atm.bank24.dif);
                    txt += "\uAC00\uC7A5 \uAC00\uAE4C\uC6B4 ATM\uC740 \uB3C4\uBCF4 " + _dif + " \uAC70\uB9AC\uC5D0 \uC788\uACE0, \uC740\uD589\uC774 \uC18C\uC720\uD55C 24\uC2DC\uAC04 \uC624\uD508 ATM\uB3C4 \uB3C4\uBCF4 " + dif24;
                    txt += this.tfc('nearest', hotel);
                }
            } else {
                var _dif2 = difToMin(atm.nearest.dif);
                txt += "\uAC00\uC7A5 \uAC00\uAE4C\uC6B4 ATM\uC740 \uB3C4\uBCF4 " + _dif2 + " \uAC70\uB9AC\uC5D0 \uC788\uC74C.";
            }

            if (hotel.assessment.word) {
                hotel.assessment.word.atm = txt;
            } else {
                hotel.assessment.word = { atm: txt };
            }
        }
    }
};

exports.default = SetATM;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _geoCode = __webpack_require__(1);

var _geoCode2 = _interopRequireDefault(_geoCode);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SetFood = {
    data: {},

    statistic: {
        nearest: [],
        in250: []
    },
    byArea: {},

    init: function init(data, cid) {
        this.data = data;
        if (this.first_geoCode(cid)) {
            //지오코딩 할 게 없으면 second부터 진행함
            this.second_setFood(); //숙소별로 식료품점들을 때려넣음
            this.third_byAreas(); //통계값을 만들어냄
            this.fourth_makeStats(); //통계값을 만들어냄 - cid/stat/local/food 라고 들어갈것임
            this.fifth_makeRank();

            console.log(this.data);
        }
    },

    fifth_makeRank: function fifth_makeRank() {

        this.statistic.nearest.sort(function (a, b) {
            return a - b;
        });
        this.statistic.in250.sort(function (a, b) {
            return b - a;
        });

        var total = Object.keys(this.data.hotels).length;

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];

            //todo:!!!! food는 종류가 여러가지 있기 때문에 key값별로 줘야 함. Score에서는 large 근처에 있는 녀석만 9점이상을 주는게 좋을듯

            // var food = hotel.local.food;
            // var rank = {
            //     nearest: total,
            //     in250: total
            // };

            // for (var key in rank) {
            //     if(key === "in250"){
            //         if(food[key]){
            //             rank[key] = this.statistic[key].indexOf(food[key])+1;
            //         }
            //     }else{
            //         if(food[key]){
            //             rank[key] = this.statistic[key].indexOf(food[key].dif)+1;
            //         }
            //     }

            // }
            // if(hotel.rank){
            //     hotel.rank.food = rank;
            // }else{
            //     hotel.rank = {food:rank};
            // }
        }
    },

    fourth_makeStats: function fourth_makeStats() {
        var stat = {
            nearest: 0,
            in250: 0
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
                this.data.stat.local.food = stat;
            } else {
                this.data.stat.local = {
                    food: stat
                };
            }
        } else {
            this.data.stat = {
                local: { food: stat }
            };
        }
    },

    third_byAreas: function third_byAreas() {
        var area = this.data.area;

        for (var i = 0; i < area.length; i++) {
            var sum = 0;

            if (!area[i].notArea) {
                if (this.byArea[i]) {
                    var foods = this.byArea[i];

                    for (var j = 0; j < foods.length; j++) {
                        sum += foods[j];
                    }
                    var minus = 0;
                    if (foods.length < 10) {
                        minus = -1;
                    }
                    foods = sum / foods.length + foods.length / 10 + minus;
                    if (area[i].local) {
                        area[i].local.food = foods.toFixed(2) * 1;
                    } else {
                        area[i].local = {
                            food: foods.toFixed(2) * 1
                        };
                    }
                } else {
                    if (area[i].local) {
                        area[i].local.food = 0;
                    } else {
                        area[i].local = {
                            food: 0
                        };
                    }
                }
            }
        }
    },

    second_setFood: function second_setFood() {
        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var isSomeFood = false;

            for (var type in this.data.local.food) {
                var groArr = this.data.local.food[type];
                var std = _config2.default.food.nearStd;

                for (var i = 0; i < groArr.length; i++) {
                    var food = groArr[i];
                    var dif = calculateDif(hotel.coor, food.coor);

                    if (dif < std[type]) {
                        isSomeFood = true;
                        food.dif = dif;

                        if (hotel.local) {
                            if (hotel.local.food) {
                                if (hotel.local.food[type]) {
                                    hotel.local.food[type].push(food);
                                } else {
                                    hotel.local.food[type] = [food];
                                }
                            } else {
                                hotel.local.food = {};
                                hotel.local.food[type] = [food];
                            }
                        } else {
                            hotel.local = {
                                food: {}
                            };
                            hotel.local.food[type] = [food];
                        }
                    }
                }
            }

            if (!isSomeFood) {
                hotel.local.food = false;
            } else {

                for (var type in hotel.local.food) {
                    if (type !== "large") {
                        hotel.local.food[type].sort(function (a, b) {
                            return a.dif - b.dif;
                        });
                        var deepArr = [];

                        for (var _i = 0; _i < hotel.local.food[type].length; _i++) {
                            //깊은 복사를 반드시 해야함
                            var hotelObj = hotel.local.food[type][_i];

                            var deep = {
                                address: hotelObj.address,
                                coor: {
                                    lat: hotelObj.coor.lat,
                                    lng: hotelObj.coor.lng
                                },
                                dif: hotelObj.dif,
                                name: hotelObj.name
                            };
                            deepArr.push(deep);
                        }

                        var in250 = deepArr.length;
                        this.statistic.nearest.push(deepArr[0].dif);
                        this.statistic.in250.push(in250);

                        if (this.byArea[hotel.area]) {
                            //지역별 food 밀집도를 확인하는 그런 녀석
                            this.byArea[hotel.area].push(in250);
                        } else {
                            this.byArea[hotel.area] = [in250];
                        }

                        if (deepArr.length > 5) {
                            deepArr.length = 5;
                        }

                        this.data.hotels[hid].local.food[type] = {
                            in250: hotel.local.food[type].length,
                            near5: deepArr,
                            nearest: deepArr[0]
                        };
                    }
                }
            }
        }
    },

    first_geoCode: function first_geoCode(cid) {
        var groArr = this.data.local.food.grocery;
        var geoArr = [];
        var isGeoNeeded = false;

        for (var i = 0; i < groArr.length; i++) {
            var grocery = groArr[i];
            if (!grocery.coor) {
                geoArr.push({ address: grocery.address, aid: i });
                isGeoNeeded = true;
            } else {
                if (!grocery.coor.lat) {
                    geoArr.push({ address: grocery.address, aid: i });
                    isGeoNeeded = true;
                }
            }
        }
        if (isGeoNeeded) {
            var ref = "cities/" + cid + "/local/food/grocery";
            _geoCode2.default.init(geoArr, ref);
            return false;
        } else {
            return true;
        }
    }
};

exports.default = SetFood;

/***/ }),
/* 15 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTRlNmY2MTY3MTg5MzQ4NDc2NzMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY29uZmlnLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvZ2VvQ29kZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9hdHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvY2l0eS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvZmlyc3RfY2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9hdXRvQ29tYmluZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L3Nlb25kX2NvbWJpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvYWNjb3VudC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zdWJ3YXkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBVE0uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEZvb2QuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEFyZWEuanMiXSwibmFtZXMiOlsiQ29uZmlnIiwiZm9vZCIsIm5lYXJTdGQiLCJsYXJnZSIsImdyb2NlcnkiLCJjdnMiLCJiYWtlcnkiLCJhdG0iLCJzY29yZSIsInBlcmNlbnRpbGUiLCJ3ZWlnaHQiLCJiYW5rMjQiLCJuZWFyZXN0IiwiaW4xMzAiLCJ3b3JkIiwiaW50ZWdyYXRlIiwic3RkIiwiR2VvQ29kZSIsImluaXQiLCJhcnIiLCJyZWYiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwib25jZSIsImRhdGEiLCJzbmFwIiwidmFsIiwibGVuZ3RoIiwic2V0IiwiY29kZSIsInRvYXN0IiwidGhhdCIsImdlb2NvZGVyIiwiZ29vZ2xlIiwibWFwcyIsIkdlb2NvZGVyIiwiYWRkcmVzcyIsImFpZCIsImdlb2NvZGUiLCJyZXN1bHRzIiwic3RhdHVzIiwiY29uc29sZSIsImxvZyIsImNvb3IiLCJsYXQiLCJnZW9tZXRyeSIsImxvY2F0aW9uIiwibG5nIiwic2hpZnQiLCJzZXRUaW1lb3V0IiwicmVsb2FkIiwiaW5pdGlhbGl6ZWQiLCJ1X2kiLCJOYXZfZnVuY3Rpb24iLCJhdHRlbmQiLCJ0b2RvIiwiY2l0eSIsIm1hcCIsImFjY291bnQiLCJzcG90IiwiY2FsYyIsImhvdGVsIiwibGluayIsImxvZ2luIiwibmFtZSIsIiQiLCJodG1sIiwiYXR0ciIsImNsaWNrIiwiY29uZmlybSIsImF1dGgiLCJzaWduT3V0IiwidGhlbiIsIndpbmRvdyIsImNhdGNoIiwiZXJyb3IiLCJkb2N1bWVudCIsInJlYWR5IiwicHJvdmlkZXIiLCJHb29nbGVBdXRoUHJvdmlkZXIiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJ1c2VyIiwibWFpbCIsImVtYWlsIiwic3BsaXQiLCJncmFkZSIsInNpZ25JbldpdGhQb3B1cCIsInJlc3VsdCIsInVzZXJNYWlsIiwiZGlzcGxheU5hbWUiLCJzZXR0aW5nIiwib3JkZXIiLCJlcnJvckNvZGUiLCJlcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwiY3JlZGVudGlhbCIsImhhc0NsYXNzIiwiaXRlbSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJwYXJlbnQiLCJBdHRlbmQiLCJtb2JpbGUiLCJpZCIsInZpZXdJRCIsImF0dGVuZE9iaiIsInNhbGFyeSIsIndlZWtkYXlzIiwidHh0IiwidXNlcnMiLCJtYWlsSUQiLCJwcm9wIiwib24iLCJpbmZsYXRlX2NhbGVuZGFyIiwiZnVsbENhbGVuZGFyIiwiaGVpZ2h0IiwiZmlyc3REYXkiLCJ2aWV3UmVuZGVyIiwidmlldyIsImVsZW1lbnQiLCJkYXlDbGljayIsImRhdGUiLCJpbnB1dFdvcmtIb3VyIiwibGlzdGVuZXIiLCJzZXRXb3JrSG91ciIsImtleXVwIiwiZSIsIndoaWNoIiwiY2hhbmdlIiwidmlld193b3JrZXIiLCJvZmYiLCJ5byIsImRhdGVJRCIsInNsaWNlIiwiZGlmIiwiZnJvbSIsInRvIiwiaSIsIk1hdGgiLCJmbG9vciIsImR1ck1vbiIsInRoaXNNb250aCIsImRhdGVEb20iLCJlcSIsImoiLCJ3ZWVrRG9tIiwid2Vla0R1ciIsImRheURvbSIsImZpbmQiLCJrIiwiY2hpbGRyZW4iLCJhcHBlbmQiLCJmdWxsTW9udGhCb251cyIsImluc3VyYW5jZUZlZSIsImJhc2ljIiwicm91bmQiLCJmdWxsV2Vla0J1bnVzIiwiY29tbWEiLCJkYXRlT2JqIiwiZGF0ZVNob3J0IiwibW9tZW50IiwiZm9ybWF0IiwiQW55UGlja2VyIiwiZGF0ZVRpbWVGb3JtYXQiLCJmb2N1cyIsIndvcmsiLCJhbGxFbXB0eSIsInJlbW92ZSIsImFsZXJ0IiwiZnJvbUEiLCJ0b0EiLCJwdXNoIiwiQ2l0eSIsInJlZnJlc2hTdGF0dXMiLCJpbmZsYXRlIiwidHJhbnNwb3J0IiwiYXJlYSIsInByaWNlIiwiY2lkIiwiaG90ZWxzIiwiT2JqZWN0Iiwia2V5cyIsImFzc2Vzc21lbnQiLCJ1cGRhdGUiLCJtZXRybyIsIm1ldHJvTGluZSIsIlNwb3QiLCJjaXRpZXMiLCJjdXJyZW50IiwiaW5mbGF0ZV9zdGF0dXMiLCJpbmZsYXRlX2NpdHkiLCJ1aWQiLCJvcmRlckFycmF5IiwiaWR4IiwiY2hhbmdlZCIsInNvcnQiLCJhIiwiYiIsInN0YXR1c0FycmF5IiwiY2l0eU5hbWUiLCJzcG90cyIsIkZpcnN0X0NoZWNrIiwic2V0UmVtYWluTnVtYmVyIiwic2lkIiwic2l0ZU5vZGF0YSIsImRlbGV0ZVNwb3QiLCJpbnB1dENvb3JkaW5hdGUiLCJzaXRlIiwibnVtYmVyIiwiY3V0Tm8iLCJ0cmltIiwiY3V0T2JqIiwibm8iLCJkZWxldGVkIiwiY29vclR4dCIsImlzTmFOIiwiaGFzUHJvYmxlbSIsInNlYXJjaFVybCIsInNpdGVPYmoiLCJnZyIsIm52IiwidGEiLCJscCIsInNpdGVIYXNQcm9ibGVtIiwibm9Db29yIiwibm9Db29yVHh0Iiwibm9TcG90Iiwibm9TcG90VHh0Iiwibm9kYXRhIiwiaGFzQ29vciIsImxhcmdlT0siLCJsYXJnZURhdGEiLCJzY3JvbGxUb3AiLCJBdXRvQ29tYmluZSIsInNpdGVBcnIiLCJjb21iaW5pbmciLCJjb3VudGVyIiwibm9EYXRhIiwib2xkU3BvdCIsImtvIiwiZW4iLCJyYW5rIiwidGVzdCIsInVybCIsInRhZyIsImNvbWJpbmVPYmoiLCJjb21iaW5lZCIsImNvbWJpbmUiLCJoYXNDb21iaW5lZCIsInRDb2RlIiwidFNwb3QiLCJrZXkiLCJjYWxjdWxhdGVEaWYiLCJTZWNvbmRfY29tYmluZSIsIkFjY291bnQiLCJTdWJ3YXkiLCJtYXJrZXIiLCJNYXAiLCJnZXRFbGVtZW50QnlJZCIsImNlbnRlciIsInpvb20iLCJtYXBUeXBlQ29udHJvbCIsInNjYWxlQ29udHJvbCIsImZ1bGxzY3JlZW5Db250cm9sIiwiYWRkTGlzdGVuZXIiLCJmaW5kU3Vid2F5IiwibGF0TG5nIiwic2V0TWFwIiwiTWFya2VyIiwicG9zaXRpb24iLCJtZXRyb0luZm8iLCJtZXRyb0J5U3RuIiwibWV0cm9OYW1lIiwibGluZSIsImNvbmNhdCIsIm1ldEFycmF5IiwibWV0U3RuQXJyYXkiLCJjZWlsIiwiSG90ZWwiLCJoaWQiLCJjaGVjayIsImFsZXJ0TW9kYWwiLCJyYW5rZWQiLCJsb2NhbCIsIlNldEhvdGVsSW5mbyIsImNoZWNrVHh0IiwidmlzYSIsImNpdGkiLCJzYWZldHkiLCJ0aGVtZSIsImNvbnZlbmllbmNlIiwiQXJyYXkiLCJpc0FycmF5IiwiU2V0QVRNIiwic3RhdGlzdGljIiwiYnlBcmVhIiwiZmlyc3RfYnlIb3RlbHMiLCJzZWNvbmRfYnlBcmVhcyIsInRoaXJkX21ha2VTdGF0cyIsImZvdXJ0aF9tYWtlUmFuayIsImZpZnRoX21ha2VTY29yZSIsInNpeHRoX3dvcmRpbmciLCJhdG1BcnIiLCJhdG1PYmoiLCJvd25lciIsImluY2x1ZGVzIiwicGxhY2VOYW1lIiwiaXMyNCIsImVyck5vIiwic3VtIiwibm90QXJlYSIsImF0bXMiLCJtaW51cyIsInRvRml4ZWQiLCJzdGF0IiwidG90YWwiLCJpbmRleE9mIiwic2NvcmVBcnJheSIsInJhbmtTeXMiLCJpc1JhbmtlZCIsInRmYyIsInR5cGUiLCJjb25maWciLCJpblN0ZCIsImRpZlRvTWluIiwiZGlmMjQiLCJTZXRGb29kIiwiaW4yNTAiLCJmaXJzdF9nZW9Db2RlIiwic2Vjb25kX3NldEZvb2QiLCJ0aGlyZF9ieUFyZWFzIiwiZm91cnRoX21ha2VTdGF0cyIsImZpZnRoX21ha2VSYW5rIiwiZm9vZHMiLCJpc1NvbWVGb29kIiwiZ3JvQXJyIiwiZGVlcEFyciIsImhvdGVsT2JqIiwiZGVlcCIsIm5lYXI1IiwiZ2VvQXJyIiwiaXNHZW9OZWVkZWQiLCJTZXRBcmVhIiwibm9BcmVhIiwiYXJlYUNvb3IiLCJpc0luQXJlYSIsImxhYmVsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBSUEsU0FBUztBQUNUQyxVQUFLO0FBQ0RDLGlCQUFRLEVBQUM7QUFDTEMsbUJBQU0sR0FERjtBQUVKQyxxQkFBUSxHQUZKO0FBR0pDLGlCQUFJLEdBSEE7QUFJSkMsb0JBQU87QUFKSDtBQURQLEtBREk7O0FBVVRDLFNBQUk7QUFDQUMsZUFBTTtBQUNGQyx3QkFBYSxDQUFDLElBQUQsRUFBTyxHQUFQLEVBQVksSUFBWixFQUFrQixHQUFsQixFQUF1QixHQUF2QixFQUE0QixHQUE1QixDQURYLEVBQzZDOztBQUUvQ0Msb0JBQU8sRUFBRTtBQUNMQyx3QkFBTyxDQURKO0FBRUhDLHlCQUFRLElBRkw7QUFHSEMsdUJBQU87QUFISjtBQUhMLFNBRE47O0FBV0FDLGNBQUs7QUFDREMsdUJBQVUsRUFBRTtBQUNSQyxxQkFBSSxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsR0FBYixDQURFLEVBQ2lCO0FBQ3ZCRixzQkFBSyxDQUFFO0FBQ0gsa0NBREMsRUFFRCxjQUZDLEVBR0QsV0FIQztBQUZDLGFBRFQ7O0FBVURILG9CQUFPO0FBQ0hLLHFCQUFJLENBQUMsSUFBRCxFQUFNLEdBQU4sQ0FERDtBQUVIRixzQkFBSyxDQUNELFdBREMsRUFFRCxlQUZDLEVBR0Qsa0JBSEM7QUFGRixhQVZOO0FBa0JERixxQkFBUTtBQUNKSSxxQkFBSSxDQUFDLEdBQUQsRUFBSyxJQUFMLEVBQVUsR0FBVixDQURBLEVBQ2dCO0FBQ3BCRixzQkFBSyxDQUFFO0FBQ0gsMkJBREMsRUFDWTtBQUNiLDJCQUZDLEVBR0QsV0FIQyxFQUlELFdBSkM7QUFGRDtBQWxCUDtBQVhMO0FBVkssQ0FBYjs7a0JBb0RlZCxNOzs7Ozs7Ozs7Ozs7QUNwRGYsSUFBSWlCLFVBQVU7QUFDVkMsVUFBTSxjQUFTQyxHQUFULEVBQWNDLEdBQWQsRUFBa0I7QUFBQTs7QUFDcEJDLGlCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixjQUF4QixFQUF3Q0csSUFBeEMsQ0FBNkMsT0FBN0MsRUFBc0QsZ0JBQVE7QUFDMUQsZ0JBQUlDLE9BQU9DLEtBQUtDLEdBQUwsRUFBWDtBQUNBLGdCQUFHLENBQUNGLElBQUosRUFBUztBQUFHO0FBQ1Isb0JBQUdMLElBQUlRLE1BQUosR0FBVyxDQUFkLEVBQWdCO0FBQ1pOLDZCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixjQUF4QixFQUF3Q1EsR0FBeEMsQ0FBNEM7QUFDeENSLDZCQUFJQSxHQURvQztBQUV4Q0QsNkJBQUlBO0FBRm9DLHFCQUE1QztBQUlIO0FBQ0Qsc0JBQUtVLElBQUwsQ0FBVVYsR0FBVixFQUFlQyxHQUFmO0FBQ0FVLHNCQUFNLG9DQUFOO0FBQ0g7QUFDSixTQVpEO0FBYUgsS0FmUzs7QUFpQlZELFVBQU0sY0FBU1YsR0FBVCxFQUFjQyxHQUFkLEVBQWtCO0FBQ3BCLFlBQUlXLE9BQU8sSUFBWDs7QUFFQSxZQUFJQyxXQUFXLElBQUlDLE9BQU9DLElBQVAsQ0FBWUMsUUFBaEIsRUFBZjtBQUNBLFlBQUlDLFVBQVVqQixJQUFJLENBQUosRUFBT2lCLE9BQXJCO0FBQ0EsWUFBSUMsTUFBTWxCLElBQUksQ0FBSixFQUFPa0IsR0FBakI7O0FBRUFMLGlCQUFTTSxPQUFULENBQWtCLEVBQUMsV0FBV0YsT0FBWixFQUFsQixFQUF3QyxVQUFTRyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQjtBQUM5REMsb0JBQVFDLEdBQVIsQ0FBWUYsTUFBWjtBQUNBLGdCQUFJQSxVQUFVLElBQWQsRUFBb0I7O0FBRWhCLG9CQUFJRyxPQUFPO0FBQ1BDLHlCQUFJTCxRQUFRLENBQVIsRUFBV00sUUFBWCxDQUFvQkMsUUFBcEIsQ0FBNkJGLEdBQTdCLEVBREc7QUFFUEcseUJBQUlSLFFBQVEsQ0FBUixFQUFXTSxRQUFYLENBQW9CQyxRQUFwQixDQUE2QkMsR0FBN0I7QUFGRyxpQkFBWDs7QUFLQTFCLHlCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QkEsTUFBSSxHQUFKLEdBQVFpQixHQUFSLEdBQVksT0FBcEMsRUFBNkNULEdBQTdDLENBQWlEZSxJQUFqRDs7QUFFQSxvQkFBR3hCLElBQUlRLE1BQUosR0FBVyxDQUFkLEVBQWdCO0FBQ1pSLHdCQUFJNkIsS0FBSjtBQUNBQywrQkFBVyxZQUFNO0FBQ2JsQiw2QkFBS0YsSUFBTCxDQUFVVixHQUFWLEVBQWVDLEdBQWY7QUFDSCxxQkFGRCxFQUVHLEdBRkg7QUFHSCxpQkFMRCxNQUtLO0FBQ0RDLDZCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixjQUF4QixFQUF3Q1EsR0FBeEMsQ0FBNEMsS0FBNUM7QUFDQUUsMEJBQU0sbUJBQU47QUFDSDtBQUVKLGFBbkJELE1BbUJLO0FBQ0Qsb0JBQUdVLFdBQVcsY0FBZCxFQUE2QjtBQUN6QkMsNEJBQVFDLEdBQVIsQ0FBWXZCLElBQUksQ0FBSixDQUFaO0FBQ0FXLDBCQUFNLG1DQUFOO0FBQ0gsaUJBSEQsTUFHSztBQUNEVCw2QkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsY0FBeEIsRUFBd0NRLEdBQXhDLENBQTRDO0FBQ3hDUiw2QkFBSUEsR0FEb0M7QUFFeENELDZCQUFJQTtBQUZvQyxxQkFBNUM7QUFJQTJCLDZCQUFTSSxNQUFUO0FBQ0g7QUFDSjtBQUNKLFNBakNEO0FBa0NIO0FBMURTLENBQWQ7O2tCQTZEZWpDLE87Ozs7Ozs7OztBQzdEZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSWtDLGNBQWMsRUFBbEI7O0FBRUEsSUFBSUMsTUFBTSxFQUFWOztBQUVBLElBQUlDLGVBQWU7QUFDZkMsWUFBUSxrQkFBWTtBQUNoQix5QkFBT3BDLElBQVAsQ0FBWWtDLEdBQVo7QUFDQUQsb0JBQVlHLE1BQVosR0FBcUIsSUFBckI7QUFDSCxLQUpjO0FBS2ZDLFVBQU0sZ0JBQVksQ0FFakIsQ0FQYztBQVFmQyxVQUFNLGdCQUFZO0FBQ2QsdUJBQUt0QyxJQUFMLENBQVVrQyxHQUFWO0FBQ0FELG9CQUFZSyxJQUFaLEdBQW1CLElBQW5CO0FBQ0gsS0FYYztBQVlmQyxTQUFLLGVBQVk7QUFDYix5QkFBT3ZDLElBQVA7QUFDSCxLQWRjO0FBZWZ3QyxhQUFTLG1CQUFZLENBRXBCLENBakJjO0FBa0JmQyxVQUFNLGdCQUFZO0FBQ2QsdUJBQUt6QyxJQUFMLENBQVVrQyxHQUFWO0FBQ0FELG9CQUFZUSxJQUFaLEdBQW1CLElBQW5CO0FBQ0gsS0FyQmM7QUFzQmZDLFVBQU0sZ0JBQVksQ0FFakIsQ0F4QmM7QUF5QmZDLFdBQU8saUJBQVk7QUFDZix3QkFBTTNDLElBQU47QUFDSCxLQTNCYztBQTRCZjRDLFVBQU0sZ0JBQVksQ0FFakI7QUE5QmMsQ0FBbkI7O0FBaUNBLFNBQVNDLEtBQVQsQ0FBZUMsSUFBZixFQUFvQjtBQUNoQkMsTUFBRSxhQUFGLEVBQWlCQyxJQUFqQixDQUFzQkYsS0FBSyxDQUFMLElBQVEsSUFBOUI7QUFDQUMsTUFBRSxhQUFGLEVBQWlCRSxJQUFqQixDQUFzQixPQUF0QixFQUE4QkgsT0FBSyxVQUFuQztBQUNBQyxNQUFFLGFBQUYsRUFBaUJHLEtBQWpCLENBQXVCLFlBQVU7QUFDN0IsWUFBR0MsUUFBUUwsT0FBSyxnQkFBYixDQUFILEVBQWtDO0FBQzlCM0MscUJBQVNpRCxJQUFULEdBQWdCQyxPQUFoQixHQUEwQkMsSUFBMUIsQ0FBK0IsWUFBVztBQUN4Q0MsdUJBQU8zQixRQUFQLENBQWdCSSxNQUFoQjtBQUNELGFBRkQsRUFFR3dCLEtBRkgsQ0FFUyxVQUFTQyxLQUFULEVBQWdCO0FBQ3ZCO0FBQ0QsYUFKRDtBQUtIO0FBQ0osS0FSRDtBQVNIOztBQUVEVixFQUFFVyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBWTtBQUMxQixRQUFJQyxXQUFXLElBQUl6RCxTQUFTaUQsSUFBVCxDQUFjUyxrQkFBbEIsRUFBZjtBQUNBMUQsYUFBU2lELElBQVQsR0FBZ0JVLGtCQUFoQixDQUFtQyxVQUFVQyxJQUFWLEVBQWdCO0FBQy9DLFlBQUlBLElBQUosRUFBVTtBQUNOLGdCQUFJQyxPQUFPRCxLQUFLRSxLQUFMLENBQVdDLEtBQVgsQ0FBaUIsR0FBakIsRUFBc0IsQ0FBdEIsQ0FBWDs7QUFFQS9ELHFCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixjQUF4QixFQUF3Q0csSUFBeEMsQ0FBNkMsT0FBN0MsRUFBc0QsZ0JBQVE7QUFDMUQsb0JBQUlDLE9BQU9DLEtBQUtDLEdBQUwsRUFBWDs7QUFFQSxvQkFBR0YsSUFBSCxFQUFRO0FBQ0osc0NBQVFLLElBQVIsQ0FBYUwsS0FBS0wsR0FBbEIsRUFBdUJLLEtBQUtKLEdBQTVCO0FBQ0FVLDBCQUFNLHFCQUFOO0FBQ0g7QUFDSixhQVBEOztBQVNBVCxxQkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsT0FBeEIsRUFBaUNHLElBQWpDLENBQXNDLE9BQXRDLEVBQStDLGdCQUFRO0FBQ25ELG9CQUFJQyxPQUFPQyxLQUFLQyxHQUFMLEVBQVg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0JBQUlGLEtBQUswRCxJQUFMLENBQUosRUFBZ0I7QUFDWjlCLDBCQUFNNUIsS0FBSzBELElBQUwsQ0FBTjtBQUNBLHdCQUFJRyxRQUFRakMsSUFBSWlDLEtBQUosR0FBWSxDQUF4Qjs7QUFFQSx3QkFBSUEsUUFBUSxDQUFaLEVBQWU7QUFDWCx5Q0FBT25FLElBQVAsQ0FBWU0sS0FBSzBELElBQUwsQ0FBWjtBQUNBLDRCQUFJRyxVQUFVLENBQWQsRUFBaUI7QUFDYiw4Q0FBUW5FLElBQVIsQ0FBYWdFLElBQWI7QUFDQS9CLHdDQUFZTyxPQUFaLEdBQXNCLElBQXRCO0FBQ0g7QUFDRFAsb0NBQVlHLE1BQVosR0FBcUIsSUFBckI7QUFDQVMsOEJBQU1YLElBQUlZLElBQVY7QUFFSCxxQkFURCxNQVNPO0FBQ0hsQyw4QkFBTSwrQkFBTjtBQUNIO0FBQ0osaUJBaEJELE1BZ0JPO0FBQ0hBLDBCQUFNLCtCQUFOO0FBQ0g7QUFDSixhQTdCRDtBQThCQTtBQUVILFNBNUNELE1BNENPO0FBQ0g7QUFDQVQscUJBQVNpRCxJQUFULEdBQWdCZ0IsZUFBaEIsQ0FBZ0NSLFFBQWhDLEVBQTBDTixJQUExQyxDQUErQyxVQUFVZSxNQUFWLEVBQWtCO0FBQzdETix1QkFBT00sT0FBT04sSUFBZDtBQUNBLG9CQUFJTyxXQUFXUCxLQUFLRSxLQUFMLENBQVdDLEtBQVgsQ0FBaUIsR0FBakIsRUFBc0IsQ0FBdEIsQ0FBZjs7QUFFQS9ELHlCQUFTQyxRQUFULENBQWtCRixHQUFsQixDQUFzQixPQUF0QixFQUErQkcsSUFBL0IsQ0FBb0MsT0FBcEMsRUFBNkMsZ0JBQVE7QUFDakQsd0JBQUlDLE9BQU9DLEtBQUtDLEdBQUwsRUFBWDs7QUFFQSx3QkFBSUYsS0FBS2dFLFFBQUwsQ0FBSixFQUFvQjtBQUNoQnBDLDhCQUFNNUIsS0FBS2dFLFFBQUwsQ0FBTjtBQUNBLDRCQUFJSCxRQUFRakMsSUFBSWlDLEtBQUosR0FBWSxDQUF4Qjs7QUFFQSw0QkFBSUEsUUFBUSxDQUFaLEVBQWU7QUFDWCw2Q0FBT25FLElBQVAsQ0FBWU0sS0FBS2dFLFFBQUwsQ0FBWjtBQUNBLGdDQUFJSCxVQUFVLENBQWQsRUFBaUI7QUFDYixrREFBUW5FLElBQVIsQ0FBYXNFLFFBQWI7QUFDQXJDLDRDQUFZTyxPQUFaLEdBQXNCLElBQXRCO0FBQ0g7QUFDRFAsd0NBQVlHLE1BQVosR0FBcUIsSUFBckI7QUFDQVMsa0NBQU1YLElBQUlZLElBQVY7QUFFSCx5QkFURCxNQVNPO0FBQ0hsQyxrQ0FBTSwrQkFBTjtBQUNIO0FBQ0oscUJBaEJELE1BZ0JLO0FBQ0RULGlDQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixXQUFXb0UsUUFBbkMsRUFBNkM1RCxHQUE3QyxDQUFpRDtBQUM3Q3lELG1DQUFPLENBRHNDO0FBRTdDckIsa0NBQU1pQixLQUFLUSxXQUZrQztBQUc3Q1Asa0NBQU1NLFFBSHVDO0FBSTdDRSxxQ0FBUztBQUNMQyx1Q0FBTztBQURGOztBQUpvQyx5QkFBakQ7QUFTQTdELDhCQUFNLCtCQUFOO0FBQ0g7QUFFSixpQkFoQ0Q7QUFpQ0gsYUFyQ0QsRUFxQ0c0QyxLQXJDSCxDQXFDUyxVQUFVQyxLQUFWLEVBQWlCO0FBQ3RCN0Msc0JBQU0sVUFBVTZDLE1BQU05QyxJQUFoQixHQUF1QixtQ0FBN0I7QUFDQTtBQUNBLG9CQUFJK0QsWUFBWWpCLE1BQU05QyxJQUF0QjtBQUNBLG9CQUFJZ0UsZUFBZWxCLE1BQU1tQixPQUF6QjtBQUNBO0FBQ0Esb0JBQUlYLFFBQVFSLE1BQU1RLEtBQWxCO0FBQ0E7QUFDQSxvQkFBSVksYUFBYXBCLE1BQU1vQixVQUF2QjtBQUNBO0FBQ0gsYUEvQ0Q7QUFnREg7QUFDSixLQWhHRDtBQWtHSCxDQXBHRDs7QUFzR0E5QixFQUFFLFlBQUYsRUFBZ0JHLEtBQWhCLENBQXNCLFlBQVk7QUFDOUIsUUFBRyxDQUFDSCxFQUFFLElBQUYsRUFBUStCLFFBQVIsQ0FBaUIsc0JBQWpCLENBQUosRUFBNkM7QUFDekMsWUFBSUMsT0FBT2hDLEVBQUUsSUFBRixFQUFRRSxJQUFSLENBQWEsSUFBYixFQUFtQmlCLEtBQW5CLENBQXlCLEdBQXpCLEVBQThCLENBQTlCLENBQVg7O0FBRUFuQixVQUFFLFFBQUYsRUFBWWlDLFdBQVosQ0FBd0IscUJBQXhCO0FBQ0FqQyxVQUFFLElBQUYsRUFBUWtDLFFBQVIsQ0FBaUIscUJBQWpCOztBQUVBbEMsVUFBRSxRQUFGLEVBQVlrQyxRQUFaLENBQXFCLGFBQXJCO0FBQ0FsQyxVQUFFLFlBQVlnQyxJQUFkLEVBQW9CQyxXQUFwQixDQUFnQyxhQUFoQzs7QUFFQSxZQUFHLENBQUMvQyxZQUFZOEMsSUFBWixDQUFKLEVBQXNCO0FBQ2xCNUMseUJBQWE0QyxJQUFiO0FBQ0g7QUFDSjtBQUNKLENBZEQ7O0FBZ0JBaEMsRUFBRSxvQkFBRixFQUF3QkcsS0FBeEIsQ0FBOEIsWUFBVTtBQUNwQyxRQUFJNkIsT0FBT2hDLEVBQUUsSUFBRixFQUFRRSxJQUFSLENBQWEsSUFBYixFQUFtQmlCLEtBQW5CLENBQXlCLEdBQXpCLEVBQThCLENBQTlCLENBQVg7O0FBRUFuQixNQUFFLFFBQUYsRUFBWWlDLFdBQVosQ0FBd0IscUJBQXhCO0FBQ0FqQyxNQUFFLElBQUYsRUFBUW1DLE1BQVIsR0FBaUJBLE1BQWpCLEdBQTBCRCxRQUExQixDQUFtQyxxQkFBbkM7O0FBRUFsQyxNQUFFLG9CQUFGLEVBQXdCaUMsV0FBeEIsQ0FBb0MsNkJBQXBDO0FBQ0FqQyxNQUFFLElBQUYsRUFBUWtDLFFBQVIsQ0FBaUIsNkJBQWpCOztBQUVBbEMsTUFBRSxRQUFGLEVBQVlrQyxRQUFaLENBQXFCLGFBQXJCO0FBQ0FsQyxNQUFFLFlBQVlnQyxJQUFkLEVBQW9CQyxXQUFwQixDQUFnQyxhQUFoQzs7QUFFQSxRQUFJLENBQUMvQyxZQUFZOEMsSUFBWixDQUFMLEVBQXdCO0FBQ3BCNUMscUJBQWE0QyxJQUFiO0FBQ0g7QUFDSixDQWZELEU7Ozs7Ozs7Ozs7OztBQ2pMQSxJQUFJSSxTQUFTO0FBQ1RDLFlBQVEsS0FEQzs7QUFHVEMsUUFBSSxFQUhLOztBQUtUQyxZQUFRLEVBTEM7QUFNVDs7QUFFQUMsZUFBVyxFQVJGOztBQVVUQyxZQUFRLEVBVkM7O0FBYVRDLGNBQVUsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIsRUFBK0IsR0FBL0IsRUFBb0MsR0FBcEMsQ0FiRDs7QUFlVHpGLFVBQU0sY0FBU2tDLEdBQVQsRUFBYTtBQUFBOztBQUNmLFlBQUlyQixPQUFPLElBQVg7QUFDQSxZQUFJc0QsUUFBUWpDLElBQUlpQyxLQUFoQjtBQUNBLFlBQUlrQixLQUFLbkQsSUFBSW1ELEVBQWI7O0FBRUEsYUFBS0EsRUFBTCxHQUFVQSxFQUFWOztBQUVBLFlBQUlLLE1BQU0sRUFBVjtBQUNBQSxlQUFLLDJDQUFMO0FBQ0FBLGVBQUssMkJBQUw7QUFDQUEsZUFBUyxvREFBVDtBQUNBQSxlQUFTLGtDQUFUO0FBQ0FBLGVBQU0sUUFBTjtBQUNBQSxlQUFNLG1DQUFOOztBQUVBM0MsVUFBRSxlQUFGLEVBQW1CQyxJQUFuQixDQUF3QjBDLEdBQXhCLEVBQTZCVixXQUE3QixDQUF5QyxhQUF6Qzs7QUFFQTdFLGlCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixnQkFBeEIsRUFBMENHLElBQTFDLENBQStDLE9BQS9DLEVBQXdELGdCQUFPO0FBQzNEUSxpQkFBSzJFLE1BQUwsR0FBY2pGLEtBQUtDLEdBQUwsRUFBZDtBQUNBLGdCQUFHMkQsVUFBVSxDQUFiLEVBQWU7QUFDWHBCLGtCQUFFLGtCQUFGLEVBQXNCaUMsV0FBdEIsQ0FBa0MsYUFBbEM7QUFDQTdFLHlCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixPQUF4QixFQUFpQ0csSUFBakMsQ0FBc0MsT0FBdEMsRUFBK0MsZ0JBQU87QUFDbEQwQyxzQkFBRSxjQUFGLEVBQWtCa0MsUUFBbEIsQ0FBMkIsYUFBM0I7QUFDQSx3QkFBSVUsUUFBUXBGLEtBQUtDLEdBQUwsRUFBWjtBQUNBLHdCQUFJa0YsTUFBTSxFQUFWO0FBQ0EseUJBQUssSUFBSUUsTUFBVCxJQUFtQkQsS0FBbkIsRUFBMEI7QUFDdEIsNEJBQUdBLE1BQU1DLE1BQU4sRUFBY3pCLEtBQWQsR0FBb0IsQ0FBcEIsR0FBc0IsQ0FBekIsRUFBMkI7QUFDdkJ1QixtQ0FBTyxvQkFBb0JFLE1BQXBCLEdBQTZCLElBQTdCLEdBQW9DRCxNQUFNQyxNQUFOLEVBQWM5QyxJQUFsRCxHQUF5RCxXQUFoRTtBQUNIO0FBQ0o7QUFDREMsc0JBQUUsa0JBQUYsRUFBc0JDLElBQXRCLENBQTJCMEMsR0FBM0IsRUFBZ0NsRixHQUFoQyxDQUFvQzZFLEVBQXBDLEVBQXdDUSxJQUF4QyxDQUE2QyxVQUE3QyxFQUF5RCxJQUF6RDtBQUNILGlCQVZEO0FBV0gsYUFiRCxNQWFLO0FBQ0QxRix5QkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsWUFBVSxNQUFLbUYsRUFBdkMsRUFBMkNTLEVBQTNDLENBQThDLE9BQTlDLEVBQXVELGdCQUFRO0FBQzNEL0Msc0JBQUUsY0FBRixFQUFrQmtDLFFBQWxCLENBQTJCLGFBQTNCO0FBQ0EsMEJBQUtNLFNBQUwsR0FBaUJoRixLQUFLQyxHQUFMLEVBQWpCO0FBQ0FlLDRCQUFRQyxHQUFSLENBQVksTUFBSytELFNBQWpCO0FBQ0ExRSx5QkFBS2tGLGdCQUFMLENBQXNCbEYsS0FBSzBFLFNBQTNCOztBQUVBLHdCQUFHLENBQUN4QyxFQUFFLG9CQUFGLEVBQXdCdEMsTUFBNUIsRUFBbUM7QUFDL0JzQywwQkFBRSxXQUFGLEVBQWVpRCxZQUFmLENBQTRCO0FBQ3hCQyxvQ0FBUSxHQURnQjtBQUV4QkMsc0NBQVUsQ0FGYztBQUd4QkMsd0NBQWEsb0JBQVVDLElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCO0FBQ2xDeEYscUNBQUtrRixnQkFBTCxDQUFzQmxGLEtBQUswRSxTQUEzQjtBQUNILDZCQUx1QjtBQU14QmUsc0NBQVUsa0JBQVNDLElBQVQsRUFBYztBQUNwQjFGLHFDQUFLMkYsYUFBTCxDQUFtQkQsSUFBbkI7QUFDSDtBQVJ1Qix5QkFBNUI7QUFVSDtBQUNKLGlCQWxCRDtBQW1CSDtBQUNKLFNBcENEOztBQXNDQSxhQUFLRSxRQUFMO0FBQ0gsS0F2RVE7O0FBeUVUQSxjQUFVLG9CQUFVO0FBQ2hCLFlBQUk1RixPQUFPLElBQVg7O0FBRUFrQyxVQUFFLFFBQUYsRUFBWStDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFVBQXhCLEVBQW9DLFlBQVU7QUFDMUMsZ0JBQUcsQ0FBQy9DLEVBQUUsU0FBRixFQUFhK0IsUUFBYixDQUFzQixhQUF0QixDQUFKLEVBQXlDO0FBQ3JDakUscUJBQUs2RixXQUFMLENBQWlCM0QsRUFBRSxJQUFGLEVBQVFFLElBQVIsQ0FBYSxLQUFiLENBQWpCO0FBQ0FGLGtCQUFFLG9CQUFGLEVBQXdCdkMsR0FBeEIsQ0FBNEIsRUFBNUI7QUFDSDtBQUNKLFNBTEQ7QUFNQXVDLFVBQUUsUUFBRixFQUFZK0MsRUFBWixDQUFlLE9BQWYsRUFBd0IsUUFBeEIsRUFBa0MsWUFBVTtBQUN4QyxnQkFBSSxDQUFDL0MsRUFBRSxTQUFGLEVBQWErQixRQUFiLENBQXNCLGFBQXRCLENBQUwsRUFBMkM7QUFDdkMvQixrQkFBRSxjQUFGLEVBQWtCa0MsUUFBbEIsQ0FBMkIsYUFBM0I7QUFDQWxDLGtCQUFFLG9CQUFGLEVBQXdCdkMsR0FBeEIsQ0FBNEIsRUFBNUI7QUFDSDtBQUNKLFNBTEQ7QUFNQXVDLFVBQUUsTUFBRixFQUFVNEQsS0FBVixDQUFnQixVQUFTQyxDQUFULEVBQVc7QUFDdkIsZ0JBQUksQ0FBQzdELEVBQUUsU0FBRixFQUFhK0IsUUFBYixDQUFzQixhQUF0QixDQUFMLEVBQTJDO0FBQ3ZDLG9CQUFJL0IsRUFBRSxpQkFBRixFQUFxQnRDLE1BQXpCLEVBQWlDO0FBQzdCLHdCQUFJRSxPQUFPaUcsRUFBRUMsS0FBYixDQUQ2QixDQUNUO0FBQ3BCLHdCQUFJbEcsUUFBUSxFQUFaLEVBQWdCO0FBQ1osNEJBQUlvQyxFQUFFLGFBQUYsRUFBaUJ2QyxHQUFqQixHQUF1QkMsTUFBdkIsR0FBZ0MsQ0FBcEMsRUFBdUM7QUFDbkNJLGlDQUFLNkYsV0FBTCxDQUFpQjNELEVBQUUsaUJBQUYsRUFBcUJFLElBQXJCLENBQTBCLEtBQTFCLENBQWpCO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUFDSixTQVhEOztBQWFBRixVQUFFLGtCQUFGLEVBQXNCK0QsTUFBdEIsQ0FBNkIsWUFBVTtBQUNuQyxnQkFBSXpCLEtBQUt0QyxFQUFFLElBQUYsRUFBUXZDLEdBQVIsRUFBVDs7QUFFQUssaUJBQUtrRyxXQUFMLENBQWlCMUIsRUFBakI7QUFDSCxTQUpEO0FBS0gsS0ExR1E7O0FBNEdUMEIsaUJBQWEscUJBQVMxQixFQUFULEVBQVk7QUFDckIsWUFBSXhFLE9BQU8sSUFBWDs7QUFFQSxZQUFHd0UsT0FBT3hFLEtBQUt3RSxFQUFmLEVBQWtCO0FBQ2R0QyxjQUFFLG1CQUFGLEVBQXVCa0MsUUFBdkIsQ0FBZ0MsYUFBaEM7QUFDQWxDLGNBQUUsZUFBRixFQUFtQkMsSUFBbkIsQ0FBd0IsRUFBeEI7QUFDQUQsY0FBRSxnQkFBRixFQUFvQkMsSUFBcEIsQ0FBeUIsRUFBekI7QUFDSCxTQUpELE1BSUs7QUFDREQsY0FBRSxtQkFBRixFQUF1QmlDLFdBQXZCLENBQW1DLGFBQW5DO0FBQ0EsZ0JBQUduRSxLQUFLeUUsTUFBTCxDQUFZN0UsTUFBWixHQUFtQixDQUF0QixFQUF3QjtBQUNwQk4seUJBQVNDLFFBQVQsR0FBb0JGLEdBQXBCLENBQXdCLFlBQVVXLEtBQUt5RSxNQUF2QyxFQUErQzBCLEdBQS9DO0FBQ0g7O0FBRUQ3RyxxQkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsWUFBVW1GLEVBQWxDLEVBQXNDUyxFQUF0QyxDQUF5QyxPQUF6QyxFQUFrRCxnQkFBUTtBQUN0RGpGLHFCQUFLMEUsU0FBTCxHQUFpQmhGLEtBQUtDLEdBQUwsRUFBakI7QUFDQSxvQkFBSXlHLEtBQUtwRyxLQUFLeUUsTUFBZDtBQUNBekUscUJBQUt5RSxNQUFMLEdBQWNELEVBQWQ7O0FBRUEsb0JBQUc0QixHQUFHeEcsTUFBSCxLQUFjLENBQWpCLEVBQW1CO0FBQ2ZzQyxzQkFBRSxXQUFGLEVBQWVpRCxZQUFmLENBQTRCO0FBQ3hCQyxnQ0FBUSxHQURnQjtBQUV4QkMsa0NBQVUsQ0FGYztBQUd4QkMsb0NBQWEsb0JBQVVDLElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCO0FBQ2xDLGdDQUFHeEYsS0FBS3dFLEVBQUwsS0FBWXhFLEtBQUt5RSxNQUFwQixFQUEyQjtBQUN2QnpFLHFDQUFLa0YsZ0JBQUwsQ0FBc0JsRixLQUFLMEUsU0FBM0I7QUFDSDtBQUNKLHlCQVB1QjtBQVF4QmUsa0NBQVUsa0JBQVNDLElBQVQsRUFBYztBQUNwQjFGLGlDQUFLMkYsYUFBTCxDQUFtQkQsSUFBbkI7QUFDSDtBQVZ1QixxQkFBNUI7QUFZSCxpQkFiRCxNQWFLO0FBQ0QxRix5QkFBS2tGLGdCQUFMLENBQXNCbEYsS0FBSzBFLFNBQTNCO0FBQ0g7QUFHSixhQXZCRDtBQXdCSDtBQUdKLEtBcEpROztBQXNKVFEsc0JBQWtCLDBCQUFTekYsSUFBVCxFQUFjO0FBQzVCeUMsVUFBRSxTQUFGLEVBQWFpQyxXQUFiLENBQXlCLGFBQXpCO0FBQ0FqQyxVQUFFLFNBQUYsRUFBYUMsSUFBYixDQUFrQixFQUFsQjs7QUFFQSxZQUFHMUMsS0FBSzhCLE1BQVIsRUFBZTtBQUNYOUIsbUJBQU9BLEtBQUs4QixNQUFaO0FBQ0EsaUJBQUssSUFBSW1FLElBQVQsSUFBaUJqRyxJQUFqQixFQUF1QjtBQUNuQixvQkFBSTRHLFNBQVNYLEtBQUtZLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBYixJQUFnQixHQUFoQixHQUFvQlosS0FBS1ksS0FBTCxDQUFXLENBQVgsRUFBYSxDQUFiLENBQXBCLEdBQW9DLEdBQXBDLEdBQXdDWixLQUFLWSxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQWIsQ0FBckQ7QUFDQSxvQkFBSUMsTUFBTSxDQUFWO0FBQ0Esb0JBQUkxQixPQUFNLFFBQU1wRixLQUFLaUcsSUFBTCxFQUFXLENBQVgsRUFBY2MsSUFBcEIsR0FBeUIsR0FBekIsR0FBNkIvRyxLQUFLaUcsSUFBTCxFQUFXLENBQVgsRUFBY2UsRUFBM0MsR0FBOEMsTUFBeEQ7QUFDQTs7QUFFQSxxQkFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlqSCxLQUFLaUcsSUFBTCxFQUFXOUYsTUFBL0IsRUFBdUM4RyxHQUF2QyxFQUE0QztBQUN4Q0gsMkJBQU85RyxLQUFLaUcsSUFBTCxFQUFXZ0IsQ0FBWCxFQUFjSCxHQUFyQjtBQUNIOztBQUVEMUIsd0JBQUssUUFBUThCLEtBQUtDLEtBQUwsQ0FBV0wsTUFBSSxFQUFmLENBQVIsR0FBNkIsS0FBN0IsR0FBb0NBLE1BQUksRUFBeEMsR0FBNEMsR0FBNUMsR0FBZ0QsTUFBckQ7QUFDQXJFLGtCQUFFLGdDQUE4Qm1FLE1BQTlCLEdBQXFDLElBQXZDLEVBQTZDbEUsSUFBN0MsQ0FBa0QwQyxJQUFsRDtBQUNIO0FBQ0QsZ0JBQUlnQyxTQUFTLENBQWI7QUFDQSxnQkFBSUMsWUFBWSxFQUFoQjtBQUNBLGlCQUFLLElBQUlKLElBQUksQ0FBYixFQUFnQkEsSUFBSXhFLEVBQUUsaUJBQUYsRUFBcUJ0QyxNQUF6QyxFQUFpRDhHLEdBQWpELEVBQXNEO0FBQ2xELG9CQUFJSyxVQUFVN0UsRUFBRSxpQkFBRixFQUFxQjhFLEVBQXJCLENBQXdCTixDQUF4QixDQUFkO0FBQ0Esb0JBQUcsQ0FBQ0ssUUFBUTlDLFFBQVIsQ0FBaUIsZ0JBQWpCLENBQUosRUFBdUM7QUFDbkMsd0JBQUl5QixRQUFPcUIsUUFBUTNFLElBQVIsQ0FBYSxXQUFiLEVBQTBCaUIsS0FBMUIsQ0FBZ0MsR0FBaEMsQ0FBWDtBQUNBeUQsZ0NBQVlwQixNQUFLLENBQUwsSUFBUUEsTUFBSyxDQUFMLENBQXBCO0FBQ0FBLDRCQUFPQSxNQUFLLENBQUwsSUFBUUEsTUFBSyxDQUFMLENBQVIsR0FBZ0JBLE1BQUssQ0FBTCxDQUF2Qjs7QUFFQSx3QkFBR2pHLEtBQUtpRyxLQUFMLENBQUgsRUFBYztBQUNWLDZCQUFLLElBQUl1QixJQUFJLENBQWIsRUFBZ0JBLElBQUl4SCxLQUFLaUcsS0FBTCxFQUFXOUYsTUFBL0IsRUFBdUNxSCxHQUF2QyxFQUE0QztBQUN4Q0osc0NBQVVwSCxLQUFLaUcsS0FBTCxFQUFXdUIsQ0FBWCxFQUFjVixHQUF4QjtBQUNIO0FBQ0o7QUFDSjtBQUNKOztBQUVELGdCQUFJMUIsTUFBTSxFQUFWOztBQUVBLGdCQUFHM0MsRUFBRSw0QkFBRixFQUFnQ3RDLE1BQW5DLEVBQTBDO0FBQ3RDLHFCQUFLLElBQUk4RyxJQUFJLENBQWIsRUFBZ0JBLElBQUksQ0FBcEIsRUFBdUJBLEdBQXZCLEVBQTRCO0FBQUk7QUFDNUIsd0JBQUlRLFVBQVVoRixFQUFFLGtCQUFGLEVBQXNCOEUsRUFBdEIsQ0FBeUJOLENBQXpCLENBQWQ7QUFDQSx3QkFBSVMsVUFBVSxDQUFkOztBQUVBLHlCQUFLLElBQUlGLElBQUksQ0FBYixFQUFnQkEsSUFBSSxDQUFwQixFQUF1QkEsR0FBdkIsRUFBNEI7QUFDeEIsNEJBQUlHLFNBQVNGLFFBQVFHLElBQVIsQ0FBYSxTQUFiLEVBQXdCTCxFQUF4QixDQUEyQkMsQ0FBM0IsQ0FBYjtBQUNBLDRCQUFJdkIsU0FBTzBCLE9BQU9oRixJQUFQLENBQVksV0FBWixFQUF5QmlCLEtBQXpCLENBQStCLEdBQS9CLENBQVg7QUFDQXFDLGlDQUFPQSxPQUFLLENBQUwsSUFBUUEsT0FBSyxDQUFMLENBQVIsR0FBZ0JBLE9BQUssQ0FBTCxDQUF2QjtBQUNBLDRCQUFHakcsS0FBS2lHLE1BQUwsQ0FBSCxFQUFjO0FBQ1YsaUNBQUssSUFBSTRCLElBQUksQ0FBYixFQUFnQkEsSUFBSTdILEtBQUtpRyxNQUFMLEVBQVc5RixNQUEvQixFQUF1QzBILEdBQXZDLEVBQTRDO0FBQ3hDSCwyQ0FBVzFILEtBQUtpRyxNQUFMLEVBQVc0QixDQUFYLEVBQWNmLEdBQXpCO0FBQ0g7QUFDSjtBQUNKO0FBQ0Qsd0JBQUdZLFVBQVEsQ0FBWCxFQUFhO0FBQ1R0QywrQkFBSyxtQ0FBa0M4QixLQUFLQyxLQUFMLENBQVdPLFVBQVEsRUFBbkIsQ0FBbEMsR0FBeUQsS0FBekQsR0FBK0RBLFVBQVEsRUFBdkUsR0FBMEUsR0FBMUUsR0FBK0UsTUFBcEY7QUFDSCxxQkFGRCxNQUVLO0FBQ0R0QywrQkFBSyxvQ0FBTDtBQUNIO0FBQ0o7O0FBRUQzQyxrQkFBRSxlQUFGLEVBQW1CQyxJQUFuQixDQUF3QjBDLEdBQXhCO0FBQ0g7O0FBRUQsZ0JBQUkzQyxFQUFFLGtCQUFGLEVBQXNCcUYsUUFBdEIsQ0FBK0IsYUFBL0IsRUFBOEMzSCxNQUFsRCxFQUF5RDtBQUNyRHNDLGtCQUFFLHFCQUFGLEVBQXlCQyxJQUF6QixDQUE4QixPQUFLd0UsS0FBS0MsS0FBTCxDQUFXQyxTQUFPLEVBQWxCLENBQUwsR0FBMkIsS0FBM0IsR0FBaUNBLFNBQU8sRUFBeEMsR0FBMkMsSUFBekU7QUFDSCxhQUZELE1BRUs7QUFDRDNFLGtCQUFFLGtCQUFGLEVBQXNCc0YsTUFBdEIsQ0FBNkIsNEJBQTBCYixLQUFLQyxLQUFMLENBQVdDLFNBQU8sRUFBbEIsQ0FBMUIsR0FBZ0QsS0FBaEQsR0FBc0RBLFNBQU8sRUFBN0QsR0FBZ0UsU0FBN0Y7QUFDSDs7QUFFRGhDLGtCQUFNLEVBQU4sQ0FqRVcsQ0FpRUM7O0FBRVosZ0JBQUk0QyxpQkFBaUIsS0FBckI7QUFDQSxnQkFBSUMsZUFBZSxDQUFuQjtBQUNBLGdCQUFJQyxRQUFRaEIsS0FBS2lCLEtBQUwsQ0FBV2YsU0FBTyxFQUFQLEdBQVUsSUFBckIsQ0FBWjtBQUNBLGdCQUFJZ0IsZ0JBQWdCbEIsS0FBS2lCLEtBQUwsQ0FBWWYsU0FBTyxFQUFQLEdBQVUsSUFBWCxHQUFpQixHQUE1QixDQUFwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBaEMsbUJBQUssbUNBQUw7QUFDQUEsbUJBQVEsNENBQVI7QUFDQUEsbUJBQVEscUNBQW9DaUQsTUFBTUgsS0FBTixDQUFwQyxHQUFrRCxPQUExRDtBQUNBOUMsbUJBQVEscURBQVI7QUFDQUEsbUJBQUssUUFBTDs7QUFFQUEsbUJBQUssbUNBQUw7QUFDQUEsbUJBQVEsNkNBQVI7QUFDQUEsbUJBQVEscUNBQW9DaUQsTUFBTUQsYUFBTixDQUFwQyxHQUEwRCxPQUFsRTtBQUNBaEQsbUJBQVEsZ0RBQVI7QUFDQUEsbUJBQUssUUFBTDs7QUFFQUEsbUJBQUssbUNBQUw7QUFDQUEsbUJBQVEsNkNBQVI7QUFDQUEsbUJBQVEscUNBQW9DaUQsTUFBTUwsY0FBTixDQUFwQyxHQUEyRCxPQUFuRTtBQUNBNUMsbUJBQVEsa0RBQVI7QUFDQUEsbUJBQUssUUFBTDs7QUFFQUEsbUJBQUssNERBQUw7QUFDQUEsbUJBQVEsOENBQVI7QUFDQUEsbUJBQVEscUNBQW9DaUQsTUFBTUosWUFBTixDQUFwQyxHQUF5RCxPQUFqRTtBQUNBN0MsbUJBQVEsMERBQVI7QUFDQUEsbUJBQUssUUFBTDs7QUFFQUEsbUJBQUssNERBQUw7QUFDQUEsbUJBQVEsMkNBQVI7QUFDQUEsbUJBQVEscUNBQW9DaUQsTUFBTUgsUUFBUUUsYUFBUixHQUF3QkosY0FBeEIsR0FBeUNDLFlBQS9DLENBQXBDLEdBQWtHLE9BQTFHO0FBQ0E3QyxtQkFBUSxpRUFBUjtBQUNBQSxtQkFBSyxRQUFMOztBQUVBM0MsY0FBRSxnQkFBRixFQUFvQkMsSUFBcEIsQ0FBeUIwQyxHQUF6QjtBQUNIO0FBQ0osS0FqUlE7O0FBbVJUYyxtQkFBZSx1QkFBU29DLE9BQVQsRUFBaUI7QUFDNUI7QUFDQSxZQUFJQyxZQUFZQyxPQUFPRixPQUFQLEVBQWdCRyxNQUFoQixDQUF1QixPQUF2QixDQUFoQjtBQUNBLFlBQUk3QixTQUFTNEIsT0FBT0YsT0FBUCxFQUFnQkcsTUFBaEIsQ0FBdUIsVUFBdkIsQ0FBYjs7QUFFQSxZQUFJekksT0FBTyxFQUFYO0FBQ0EsWUFBRyxLQUFLaUYsU0FBTCxDQUFlbkQsTUFBZixDQUFzQjhFLE1BQXRCLENBQUgsRUFBaUM7QUFDN0I1RyxtQkFBTyxLQUFLaUYsU0FBTCxDQUFlbkQsTUFBZixDQUFzQjhFLE1BQXRCLENBQVA7QUFDSDs7QUFFRCxZQUFJeEIsTUFBTSxFQUFWOztBQUVBQSxlQUFLLDJCQUFMO0FBQ0FBLGVBQVEsMkJBQVI7QUFDQUEsZUFBWSxzQkFBb0JtRCxTQUFwQixHQUE4QixXQUExQztBQUNBbkQsZUFBWSw2QkFBWjtBQUNBLFlBQUdwRixLQUFLLENBQUwsQ0FBSCxFQUFXO0FBQ1BvRixtQkFBWSxtQ0FBaUNwRixLQUFLLENBQUwsRUFBUStHLElBQXpDLEdBQThDLHNEQUE5QyxHQUFxRy9HLEtBQUssQ0FBTCxFQUFRZ0gsRUFBN0csR0FBZ0gsMEJBQTVIO0FBQ0gsU0FGRCxNQUVLO0FBQ0Q1QixtQkFBWSwwRkFBWjtBQUNIO0FBQ0RBLGVBQVksUUFBWjtBQUNBQSxlQUFZLDZCQUFaO0FBQ0EsWUFBR3BGLEtBQUssQ0FBTCxDQUFILEVBQVc7QUFDUG9GLG1CQUFZLG9DQUFrQ3BGLEtBQUssQ0FBTCxFQUFRK0csSUFBMUMsR0FBK0MsdURBQS9DLEdBQXVHL0csS0FBSyxDQUFMLEVBQVFnSCxFQUEvRyxHQUFrSCwwQkFBOUg7QUFDSCxTQUZELE1BRUs7QUFDRDVCLG1CQUFZLDRGQUFaO0FBQ0g7QUFDREEsZUFBWSxRQUFaO0FBQ0FBLGVBQVksc0JBQVo7QUFDQUEsZUFBZ0IsNkJBQTJCd0IsTUFBM0IsR0FBa0MsVUFBbEQ7QUFDQXhCLGVBQWdCLHlCQUFoQjtBQUNBQSxlQUFZLFFBQVo7QUFDQUEsZUFBUSxRQUFSO0FBQ0FBLGVBQUssUUFBTDs7QUFFQTNDLFVBQUUsUUFBRixFQUFZQyxJQUFaLENBQWlCMEMsR0FBakI7O0FBRUEsWUFBRyxLQUFLTixNQUFSLEVBQWU7QUFDWHJDLGNBQUUsb0JBQUYsRUFBd0JpRyxTQUF4QixDQUFrQztBQUM5QkMsZ0NBQWU7QUFEZSxhQUFsQztBQUdIOztBQUVEbEcsVUFBRSxhQUFGLEVBQWlCbUcsS0FBakI7QUFDSCxLQWhVUTs7QUFrVVR4QyxpQkFBYSxxQkFBU0gsSUFBVCxFQUFjOztBQUV2QixZQUFJNEMsT0FBTyxFQUFYOztBQUVBLFlBQUlDLFdBQVcsSUFBZjtBQUNBLGFBQUssSUFBSTdCLElBQUksQ0FBYixFQUFnQkEsSUFBSXhFLEVBQUUsb0JBQUYsRUFBd0J0QyxNQUE1QyxFQUFvRDhHLEdBQXBELEVBQXlEO0FBQ3JELGdCQUFHeEUsRUFBRSxvQkFBRixFQUF3QjhFLEVBQXhCLENBQTJCTixDQUEzQixFQUE4Qi9HLEdBQTlCLEdBQW9DQyxNQUFwQyxHQUEyQyxDQUE5QyxFQUFnRDtBQUM1QzJJLDJCQUFXLEtBQVg7QUFDSDtBQUNKOztBQUVELFlBQUdBLFFBQUgsRUFBWTtBQUNSLGdCQUFHLEtBQUs5RCxNQUFMLENBQVk3RSxNQUFaLEdBQW1CLENBQXRCLEVBQXdCO0FBQ3BCTix5QkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsWUFBVSxLQUFLb0YsTUFBZixHQUFzQixVQUF0QixHQUFpQ2lCLElBQXpELEVBQStEOEMsTUFBL0Q7QUFDSCxhQUZELE1BRUs7QUFDRGxKLHlCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixZQUFVLEtBQUttRixFQUFmLEdBQWtCLFVBQWxCLEdBQTZCa0IsSUFBckQsRUFBMkQ4QyxNQUEzRDtBQUNIOztBQUVEdEcsY0FBRSxRQUFGLEVBQVlDLElBQVosQ0FBaUIsRUFBakI7QUFDQSxnQkFBSWtFLFNBQVNYLEtBQUtZLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBYixJQUFrQixHQUFsQixHQUFzQlosS0FBS1ksS0FBTCxDQUFXLENBQVgsRUFBYSxDQUFiLENBQXRCLEdBQXdDLEdBQXhDLEdBQTRDWixLQUFLWSxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQWIsQ0FBekQ7QUFDQXBFLGNBQUUsd0JBQXNCbUUsTUFBdEIsR0FBNkIsSUFBL0IsRUFBcUNsRSxJQUFyQyxDQUEwQyxFQUExQztBQUNBLG1CQUFPLEtBQVA7QUFDSDs7QUFHRCxZQUFHRCxFQUFFLGFBQUYsRUFBaUJ2QyxHQUFqQixLQUF1QixPQUF2QixJQUFnQ3VDLEVBQUUsYUFBRixFQUFpQnZDLEdBQWpCLEtBQXVCLE9BQTFELEVBQWtFO0FBQzlEOztBQUVBLGdCQUFHK0YsT0FBS3VDLFNBQVNDLE1BQVQsQ0FBZ0IsVUFBaEIsQ0FBUixFQUFvQztBQUNoQztBQUNBLG9CQUFHaEcsRUFBRSxXQUFGLEVBQWV2QyxHQUFmLEtBQXFCLE9BQXJCLElBQThCdUMsRUFBRSxXQUFGLEVBQWV2QyxHQUFmLEtBQXFCLE9BQXRELEVBQThELENBRTdELENBRkQsTUFFSztBQUNEOEksMEJBQU0sNkJBQU47QUFDQSwyQkFBTyxLQUFQO0FBQ0g7QUFFSixhQVRELE1BU0s7QUFDRDtBQUNBLG9CQUFHdkcsRUFBRSxXQUFGLEVBQWV2QyxHQUFmLEtBQXFCLE9BQXJCLElBQThCdUMsRUFBRSxXQUFGLEVBQWV2QyxHQUFmLEtBQXFCLE9BQXRELEVBQThELENBRTdELENBRkQsTUFFSztBQUNEOEksMEJBQU0sZ0NBQU47QUFDQSwyQkFBTyxLQUFQO0FBQ0g7QUFDSjtBQUNELGdCQUFJakMsT0FBT3RFLEVBQUUsYUFBRixFQUFpQnZDLEdBQWpCLEVBQVg7QUFDQSxnQkFBSThHLEtBQUt2RSxFQUFFLFdBQUYsRUFBZXZDLEdBQWYsRUFBVDs7QUFFQSxnQkFBSStJLFFBQVFsQyxLQUFLbkQsS0FBTCxDQUFXLEdBQVgsQ0FBWjtBQUNBLGdCQUFJc0YsTUFBTWxDLEdBQUdwRCxLQUFILENBQVMsR0FBVCxDQUFWO0FBQ0EsZ0JBQUlrRCxNQUFNLENBQUNvQyxJQUFJLENBQUosSUFBTyxDQUFQLEdBQVdELE1BQU0sQ0FBTixJQUFTLENBQXJCLElBQXdCLEVBQXhCLElBQThCQyxJQUFJLENBQUosSUFBTyxDQUFQLEdBQVdELE1BQU0sQ0FBTixJQUFTLENBQWxELENBQVY7O0FBR0FKLGlCQUFLTSxJQUFMLENBQVU7QUFDTnBDLHNCQUFNQSxJQURBO0FBRU5DLG9CQUFJQSxFQUZFO0FBR05GLHFCQUFLQTtBQUhDLGFBQVY7QUFNSCxTQW5DRCxNQW1DSztBQUNEa0Msa0JBQU0scUNBQU47QUFDQSxtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBR3ZHLEVBQUUsY0FBRixFQUFrQnZDLEdBQWxCLEdBQXdCQyxNQUF4QixHQUErQixDQUFsQyxFQUFvQztBQUNoQyxnQkFBR3NDLEVBQUUsY0FBRixFQUFrQnZDLEdBQWxCLEtBQXdCLE9BQXhCLElBQWlDdUMsRUFBRSxjQUFGLEVBQWtCdkMsR0FBbEIsS0FBd0IsT0FBNUQsRUFBb0U7O0FBRWhFLG9CQUFHK0YsT0FBS3VDLFNBQVNDLE1BQVQsQ0FBZ0IsVUFBaEIsQ0FBUixFQUFvQztBQUNoQztBQUNBLHdCQUFHaEcsRUFBRSxZQUFGLEVBQWdCdkMsR0FBaEIsS0FBc0IsT0FBdEIsSUFBK0J1QyxFQUFFLFlBQUYsRUFBZ0J2QyxHQUFoQixLQUFzQixPQUF4RCxFQUFnRSxDQUUvRCxDQUZELE1BRUs7QUFDRDhJLDhCQUFNLHNDQUFOO0FBQ0EsK0JBQU8sS0FBUDtBQUNIO0FBRUosaUJBVEQsTUFTSztBQUNEO0FBQ0Esd0JBQUd2RyxFQUFFLFlBQUYsRUFBZ0J2QyxHQUFoQixLQUFzQixPQUF0QixJQUErQnVDLEVBQUUsWUFBRixFQUFnQnZDLEdBQWhCLEtBQXNCLE9BQXhELEVBQWdFLENBRS9ELENBRkQsTUFFSztBQUNEOEksOEJBQU0seUNBQU47QUFDQSwrQkFBTyxLQUFQO0FBQ0g7QUFDSjs7QUFFRCxvQkFBSWpDLFFBQU90RSxFQUFFLGNBQUYsRUFBa0J2QyxHQUFsQixFQUFYO0FBQ0Esb0JBQUk4RyxNQUFLdkUsRUFBRSxZQUFGLEVBQWdCdkMsR0FBaEIsRUFBVDs7QUFFQSxvQkFBSStJLFNBQVFsQyxNQUFLbkQsS0FBTCxDQUFXLEdBQVgsQ0FBWjtBQUNBLG9CQUFJc0YsT0FBTWxDLElBQUdwRCxLQUFILENBQVMsR0FBVCxDQUFWO0FBQ0Esb0JBQUlrRCxPQUFNLENBQUNvQyxLQUFJLENBQUosSUFBTyxDQUFQLEdBQVdELE9BQU0sQ0FBTixJQUFTLENBQXJCLElBQXdCLEVBQXhCLElBQThCQyxLQUFJLENBQUosSUFBTyxDQUFQLEdBQVdELE9BQU0sQ0FBTixJQUFTLENBQWxELENBQVY7O0FBRUFKLHFCQUFLTSxJQUFMLENBQVU7QUFDTnBDLDBCQUFNQSxLQURBO0FBRU5DLHdCQUFJQSxHQUZFO0FBR05GLHlCQUFLQTtBQUhDLGlCQUFWO0FBS0gsYUFqQ0QsTUFpQ0s7QUFDRGtDLHNCQUFNLDhDQUFOO0FBQ0EsdUJBQU8sS0FBUDtBQUNIO0FBQ0o7QUFDRCxZQUFHLEtBQUtoRSxNQUFMLENBQVk3RSxNQUFaLEdBQW1CLENBQXRCLEVBQXdCO0FBQ3BCTixxQkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsWUFBVSxLQUFLb0YsTUFBZixHQUFzQixVQUF0QixHQUFpQ2lCLElBQXpELEVBQStEN0YsR0FBL0QsQ0FBbUV5SSxJQUFuRTtBQUNILFNBRkQsTUFFSztBQUNEaEoscUJBQVNDLFFBQVQsR0FBb0JGLEdBQXBCLENBQXdCLFlBQVUsS0FBS21GLEVBQWYsR0FBa0IsVUFBbEIsR0FBNkJrQixJQUFyRCxFQUEyRDdGLEdBQTNELENBQStEeUksSUFBL0Q7QUFDSDs7QUFFRHBHLFVBQUUsUUFBRixFQUFZQyxJQUFaLENBQWlCLEVBQWpCO0FBQ0g7QUFqYlEsQ0FBYjs7a0JBb2JlbUMsTTs7Ozs7Ozs7Ozs7O0FDcGJmLElBQUl1RSxPQUFPO0FBQ1BwSixVQUFNLEVBREM7O0FBR1BtRyxjQUFVLG9CQUFVO0FBQ2hCLFlBQUk1RixPQUFPLElBQVg7O0FBRUFrQyxVQUFFLE9BQUYsRUFBVytDLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLFVBQXZCLEVBQW1DLFlBQVU7QUFDekMsZ0JBQUkzQyxRQUFRLCtCQUFSLENBQUosRUFBOEM7QUFDMUN0QyxxQkFBSzhJLGFBQUw7QUFDSDtBQUNKLFNBSkQ7QUFLSCxLQVhNOztBQWFQQyxhQUFTLGlCQUFTdEosSUFBVCxFQUFjO0FBQ25CLFlBQUlvRixNQUFNLEVBQVY7O0FBRUFBLGVBQU0sc0JBQU47QUFDSUEsZUFBTyxzQkFBUDtBQUNBQSxlQUFPLDRCQUFQO0FBQ0pBLGVBQU0sUUFBTjs7QUFFQUEsZUFBTSx1QkFBTjs7QUFFQUEsZUFBTSx3QkFBTjtBQUNBQSxlQUFXLHlCQUFYO0FBQ0FBLGVBQVcsZ0NBQVg7QUFDQUEsZUFBVyxtQ0FBWDtBQUNBQSxlQUFXLG1DQUFYO0FBQ0FBLGVBQVcsOEJBQVg7QUFDQUEsZUFBVywrQkFBWDtBQUNBQSxlQUFNLFFBQU47O0FBRUEsYUFBSyxJQUFJL0UsSUFBVCxJQUFpQkwsSUFBakIsRUFBdUI7QUFDbkIsZ0JBQUlnQyxPQUFPaEMsS0FBS0ssSUFBTCxDQUFYO0FBQ0EsZ0JBQUlXLFNBQVNnQixLQUFLaEIsTUFBbEI7O0FBRUFvRSxtQkFBTywyQkFBMkJwRCxLQUFLM0IsSUFBaEMsR0FBdUMsb0JBQXZDLEdBQThEMkIsS0FBS1EsSUFBbkUsR0FBMEUsTUFBakY7O0FBRUEsZ0JBQUl4QixPQUFPcUIsS0FBUCxLQUFpQixDQUFyQixFQUF3QjtBQUNwQitDLHVCQUFPLGdEQUFQO0FBQ0gsYUFGRCxNQUVPLElBQUlwRSxPQUFPcUIsS0FBUCxLQUFpQixDQUFyQixFQUF3QjtBQUMzQitDLHVCQUFPLG9DQUFQO0FBQ0gsYUFGTSxNQUVBO0FBQ0hBLHVCQUFPLCtDQUFQO0FBQ0g7O0FBRUQsZ0JBQUlwRSxPQUFPbUIsSUFBUCxLQUFnQixDQUFwQixFQUF1QjtBQUNuQmlELHVCQUFPLGlEQUFQO0FBQ0gsYUFGRCxNQUVPLElBQUlwRSxPQUFPbUIsSUFBUCxLQUFnQixDQUFwQixFQUF1QjtBQUMxQmlELHVCQUFPLGlDQUFQO0FBQ0gsYUFGTSxNQUVBLElBQUlwRSxPQUFPbUIsSUFBUCxLQUFnQixDQUFwQixFQUF1QjtBQUMxQmlELHVCQUFPLGdDQUFQO0FBQ0gsYUFGTSxNQUVBLElBQUlwRSxPQUFPbUIsSUFBUCxLQUFnQixDQUFwQixFQUF1QjtBQUMxQmlELHVCQUFPLG1DQUFQO0FBQ0gsYUFGTSxNQUVBO0FBQ0hBLHVCQUFPLDZDQUFQO0FBQ0g7O0FBRUQsZ0JBQUlwRSxPQUFPdUksU0FBUCxLQUFxQixDQUF6QixFQUE0QjtBQUN4Qm5FLHVCQUFPLHFEQUFQO0FBQ0gsYUFGRCxNQUVPLElBQUlwRSxPQUFPdUksU0FBUCxLQUFxQixDQUF6QixFQUE0QjtBQUMvQm5FLHVCQUFPLHVDQUFQO0FBQ0gsYUFGTSxNQUVBO0FBQ0hBLHVCQUFPLGtEQUFQO0FBQ0g7O0FBRUQsZ0JBQUlwRSxPQUFPd0ksSUFBWCxFQUFpQjtBQUNicEUsdUJBQU8sNkJBQVA7QUFDSCxhQUZELE1BRU87QUFDSEEsdUJBQU8sd0NBQVA7QUFDSDs7QUFFRCxnQkFBSXBFLE9BQU95SSxLQUFYLEVBQWtCO0FBQ2RyRSx1QkFBTyw4QkFBUDtBQUNILGFBRkQsTUFFTztBQUNIQSx1QkFBTyx5Q0FBUDtBQUNIO0FBQ0RBLG1CQUFPLFFBQVA7QUFDSDs7QUFFREEsZUFBTyxRQUFQLENBbkVtQixDQW1FRjs7QUFFakIzQyxVQUFFLE9BQUYsRUFBV0MsSUFBWCxDQUFnQjBDLEdBQWhCO0FBRUgsS0FwRk07O0FBc0ZQMUYsVUFBTSxnQkFBVTtBQUFBOztBQUNaLGFBQUt5RyxRQUFMOztBQUVBdEcsaUJBQVNDLFFBQVQsR0FBb0JGLEdBQXBCLENBQXdCLGdCQUF4QixFQUEwQ0csSUFBMUMsQ0FBK0MsT0FBL0MsRUFBd0QsZ0JBQU87QUFDM0QsZ0JBQUlDLE9BQU9DLEtBQUtDLEdBQUwsRUFBWDtBQUNBLGtCQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQSxrQkFBS3NKLE9BQUwsQ0FBYXRKLElBQWI7QUFDSCxTQUpEO0FBS0gsS0E5Rk07O0FBZ0dQcUosbUJBQWUseUJBQVU7QUFBQTs7QUFDckIsWUFBSTlJLE9BQU8sSUFBWDs7QUFFQVYsaUJBQVNDLFFBQVQsR0FBb0JGLEdBQXBCLENBQXdCLFFBQXhCLEVBQWtDRyxJQUFsQyxDQUF1QyxPQUF2QyxFQUFnRCxnQkFBTTtBQUNsRCxnQkFBSUMsT0FBT0MsS0FBS0MsR0FBTCxFQUFYO0FBQ0EsaUJBQUssSUFBSXdKLEdBQVQsSUFBZ0JuSixLQUFLUCxJQUFyQixFQUEyQjs7QUFFdkIsb0JBQUlnQixTQUFTLEVBQWI7O0FBRUEsb0JBQUlnQixPQUFPaEMsS0FBSzBKLEdBQUwsQ0FBWDs7QUFFQSxvQkFBRzFILElBQUgsRUFBUTtBQUNKaEIsNkJBQVM7QUFDTHFCLCtCQUFPLENBREYsRUFDSztBQUNWRiw4QkFBTTVCLEtBQUtQLElBQUwsQ0FBVTBKLEdBQVYsRUFBZTFJLE1BQWYsQ0FBc0JtQixJQUZ2QjtBQUdMcUgsOEJBQU0sQ0FIRDtBQUlMRCxtQ0FBVyxDQUpOLEVBSVM7QUFDZEUsK0JBQU87QUFMRixxQkFBVDs7QUFRQSx3QkFBSXpILEtBQUt3SCxJQUFULEVBQWU7QUFDWHhJLCtCQUFPd0ksSUFBUCxHQUFjLENBQWQ7QUFDSDs7QUFFRCx3QkFBR3hILEtBQUsySCxNQUFSLEVBQWU7QUFDWCw0QkFBSXRILFFBQVFMLEtBQUsySCxNQUFMLENBQVlDLE9BQU9DLElBQVAsQ0FBWTdILEtBQUsySCxNQUFqQixFQUF5QixDQUF6QixDQUFaLENBQVo7O0FBRUEsNEJBQUd0SCxNQUFNeUgsVUFBVCxFQUFvQjtBQUNoQjlJLG1DQUFPcUIsS0FBUCxHQUFlLENBQWY7QUFDSCx5QkFGRCxNQUVLO0FBQ0RyQixtQ0FBT3FCLEtBQVAsR0FBZSxDQUFmO0FBQ0g7O0FBRUQsNEJBQUdBLE1BQU1tSCxJQUFULEVBQWM7QUFDVnhJLG1DQUFPd0ksSUFBUCxHQUFjLENBQWQ7QUFDSCx5QkFGRCxNQUVNLElBQUduSCxNQUFNbUgsSUFBTixLQUFlLENBQWxCLEVBQW9CO0FBQ3RCeEksbUNBQU93SSxJQUFQLEdBQWMsQ0FBZDs7QUFFQSxnQ0FBR3hILEtBQUtoQixNQUFSLEVBQWU7QUFDWGdCLHFDQUFLaEIsTUFBTCxDQUFZd0ksSUFBWixHQUFtQixJQUFuQjtBQUNILDZCQUZELE1BRUs7QUFDRHhILHFDQUFLaEIsTUFBTCxHQUFjO0FBQ1Z3SSwwQ0FBTTtBQURJLGlDQUFkO0FBR0g7QUFFSix5QkFYSyxNQVdEO0FBQ0QsZ0NBQUl4SCxLQUFLaEIsTUFBVCxFQUFpQjtBQUNiZ0IscUNBQUtoQixNQUFMLENBQVl3SSxJQUFaLEdBQW1CLEtBQW5CO0FBQ0gsNkJBRkQsTUFFTztBQUNIeEgscUNBQUtoQixNQUFMLEdBQWM7QUFDVndJLDBDQUFNO0FBREksaUNBQWQ7QUFHSDtBQUNKO0FBQ0QzSixpQ0FBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsWUFBWThKLEdBQVosR0FBa0IsU0FBMUMsRUFBcURLLE1BQXJELENBQTREL0gsS0FBS2hCLE1BQWpFO0FBQ0g7O0FBRUQsd0JBQUdnQixLQUFLZ0ksS0FBUixFQUFjO0FBQ1YsNEJBQUdoSSxLQUFLaUksU0FBUixFQUFrQjtBQUNkakosbUNBQU91SSxTQUFQLEdBQW1CLENBQW5CO0FBQ0gseUJBRkQsTUFFSztBQUNEdkksbUNBQU91SSxTQUFQLEdBQW1CLENBQW5CO0FBQ0g7QUFDSjs7QUFFRCx3QkFBR3ZILEtBQUt5SCxLQUFSLEVBQWM7QUFDVnpJLCtCQUFPeUksS0FBUCxHQUFlLENBQWY7QUFDSDtBQUNKLGlCQTFERCxNQTBESztBQUNEekksNkJBQVM7QUFDTHFCLCtCQUFPLENBREYsRUFDSztBQUNWRiw4QkFBTSxDQUZEO0FBR0xxSCw4QkFBTSxDQUhEO0FBSUxELG1DQUFXLENBSk4sRUFJUztBQUNkRSwrQkFBTztBQUxGLHFCQUFUO0FBT0g7O0FBRUQsdUJBQUt6SixJQUFMLENBQVUwSixHQUFWLEVBQWUxSSxNQUFmLEdBQXdCQSxNQUF4QjtBQUNIO0FBQ0RuQixxQkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsZ0JBQXhCLEVBQTBDUSxHQUExQyxDQUE4Q0csS0FBS1AsSUFBbkQsRUFBeURnRCxJQUF6RCxDQUE4RCxZQUFNO0FBQ2hFekMscUJBQUsrSSxPQUFMLENBQWEvSSxLQUFLUCxJQUFsQjtBQUNBTSxzQkFBTSxRQUFOO0FBQ0gsYUFIRDtBQUlILFNBbEZEO0FBbUZIO0FBdExNLENBQVg7O2tCQXlMZThJLEk7Ozs7Ozs7Ozs7Ozs7QUN6TGY7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSWMsT0FBTztBQUNQQyxZQUFRLEVBREQ7QUFFUGhHLFdBQU0sRUFGQztBQUdQbkUsVUFBTSxFQUhDO0FBSVBvSyxhQUFRLEVBSkQsRUFJSzs7QUFFWjFLLFVBQU0sY0FBVWtDLEdBQVYsRUFBYztBQUNoQixZQUFJckIsT0FBTyxJQUFYO0FBQ0EsOEJBQVliLElBQVo7O0FBRUEsYUFBS3lFLEtBQUwsR0FBYXZDLElBQUlzQyxPQUFKLENBQVlDLEtBQXpCOztBQUVBdEUsaUJBQVNDLFFBQVQsR0FBb0JGLEdBQXBCLENBQXdCLGdCQUF4QixFQUEwQzRGLEVBQTFDLENBQTZDLE9BQTdDLEVBQXNELGdCQUFRO0FBQzFELGdCQUFJeEYsT0FBT0MsS0FBS0MsR0FBTCxFQUFYO0FBQ0FLLGlCQUFLNEosTUFBTCxHQUFjbkssSUFBZDtBQUNBTyxpQkFBSzRELEtBQUwsR0FBYXZDLElBQUlzQyxPQUFKLENBQVlDLEtBQXpCO0FBQ0E1RCxpQkFBS1AsSUFBTCxHQUFZQSxJQUFaO0FBQ0FPLGlCQUFLOEosY0FBTDtBQUNILFNBTkQ7O0FBUUE1SCxVQUFFLE9BQUYsRUFBVytDLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLFNBQXZCLEVBQWtDLFlBQVk7QUFDMUMsZ0JBQUlrRSxNQUFNakgsRUFBRSxJQUFGLEVBQVFtQyxNQUFSLEdBQWlCQSxNQUFqQixHQUEwQmpDLElBQTFCLENBQStCLElBQS9CLENBQVY7QUFDQSxnQkFBSTNCLFNBQVNULEtBQUs0SixNQUFMLENBQVlULEdBQVosRUFBaUIxSSxNQUFqQixDQUF3Qm1CLElBQXJDOztBQUVBNUIsaUJBQUsrSixZQUFMLENBQWtCWixHQUFsQixFQUF1QjFJLE1BQXZCO0FBQ0gsU0FMRDs7QUFPQXlCLFVBQUUsT0FBRixFQUFXK0MsRUFBWCxDQUFjLE9BQWQsRUFBdUIsUUFBdkIsRUFBaUMsWUFBWTtBQUN6Q2pGLGlCQUFLNEQsS0FBTCxHQUFhMUIsRUFBRSxJQUFGLEVBQVFFLElBQVIsQ0FBYSxJQUFiLENBQWI7QUFDQSxnQkFBSTRILE1BQU0zSSxJQUFJOEIsSUFBZDtBQUNBN0QscUJBQVNDLFFBQVQsR0FBb0JGLEdBQXBCLENBQXdCLFdBQVcySyxHQUFYLEdBQWlCLGdCQUF6QyxFQUEyRG5LLEdBQTNELENBQStERyxLQUFLNEQsS0FBcEU7QUFDQTVELGlCQUFLOEosY0FBTDtBQUNILFNBTEQ7O0FBT0E1SCxVQUFFLE9BQUYsRUFBVytDLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLFNBQXZCLEVBQWtDLFlBQVk7QUFDMUNqRixpQkFBSzhKLGNBQUw7QUFDSCxTQUZEO0FBR0gsS0FyQ007O0FBdUNQQSxvQkFBZ0IsMEJBQVU7QUFDdEIsWUFBSXJLLE9BQU8sS0FBS0EsSUFBaEI7O0FBRUEsWUFBSW9GLE1BQU0sRUFBVjtBQUNBQSxlQUFPLHNCQUFQO0FBQ0FBLGVBQU8sd0JBQVA7QUFDQUEsZUFBTyxvQ0FBUDtBQUNBQSxlQUFPLHlDQUFQO0FBQ0FBLGVBQU8sUUFBUDtBQUNBQSxlQUFPLHVCQUFQO0FBQ0FBLGVBQU8sbUNBQVA7QUFDQUEsZUFBTyxvQ0FBUDtBQUNBQSxlQUFPLGlDQUFQO0FBQ0FBLGVBQU8sa0NBQVA7QUFDQUEsZUFBTyxRQUFQOztBQUVBLFlBQUlvRixhQUFhLEVBQWpCO0FBQ0F2SixnQkFBUUMsR0FBUixDQUFZbEIsSUFBWjs7QUFFQSxhQUFLLElBQUkwSixHQUFULElBQWdCMUosSUFBaEIsRUFBc0I7QUFDbEIsZ0JBQUlnQyxPQUFPaEMsS0FBSzBKLEdBQUwsQ0FBWDs7QUFFQSxnQkFBSSxLQUFLdkYsS0FBTCxLQUFlLEtBQW5CLEVBQTBCO0FBQ3RCcUcsMkJBQVdyQixJQUFYLENBQWdCLEVBQUVPLEtBQUtBLEdBQVAsRUFBWWUsS0FBS3pJLEtBQUtRLElBQXRCLEVBQWhCO0FBQ0gsYUFGRCxNQUVPLElBQUksS0FBSzJCLEtBQUwsS0FBZSxTQUFuQixFQUE4QjtBQUNqQ3FHLDJCQUFXckIsSUFBWCxDQUFnQixFQUFFTyxLQUFLQSxHQUFQLEVBQVllLEtBQUt6SSxLQUFLbUMsS0FBTCxDQUFXdUcsT0FBNUIsRUFBaEI7QUFDSDtBQUNKOztBQUVERixtQkFBV0csSUFBWCxDQUFnQixVQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDNUIsbUJBQU9ELEVBQUVILEdBQUYsR0FBUUksRUFBRUosR0FBVixHQUFnQixDQUFoQixHQUFvQkcsRUFBRUgsR0FBRixHQUFRSSxFQUFFSixHQUFWLEdBQWdCLENBQUMsQ0FBakIsR0FBcUIsQ0FBaEQ7QUFDSCxTQUZEOztBQUlBLFlBQUlLLGNBQWMsQ0FDZCw0SUFEYyxFQUVkLDRJQUZjLEVBR2QsNElBSGMsRUFJZCw0SUFKYyxFQUtkLDRJQUxjLENBQWxCOztBQVFBLGFBQUssSUFBSTdELElBQUksQ0FBYixFQUFnQkEsSUFBSXVELFdBQVdySyxNQUEvQixFQUF1QzhHLEdBQXZDLEVBQTRDO0FBQ3hDLGdCQUFJeUMsTUFBTWMsV0FBV3ZELENBQVgsRUFBY3lDLEdBQXhCO0FBQ0EsZ0JBQUkxSCxPQUFPaEMsS0FBSzBKLEdBQUwsQ0FBWDs7QUFFQXRFLG1CQUFPLDRCQUE0QnNFLEdBQTVCLEdBQWtDLElBQXpDO0FBQ0F0RSxtQkFBTyxnQ0FBZ0NwRCxLQUFLUSxJQUFyQyxHQUE0QyxNQUFuRDtBQUNBNEMsbUJBQU8wRixZQUFZOUksS0FBS2hCLE1BQUwsQ0FBWW1CLElBQXhCLENBQVA7QUFDQWlELG1CQUFPLGtDQUFQO0FBQ0FBLG1CQUFPLFFBQVA7QUFDSDtBQUNEQSxlQUFPLFFBQVAsQ0FuRHNCLENBbUROOztBQUVoQjNDLFVBQUUsYUFBRixFQUFpQkMsSUFBakIsQ0FBc0IwQyxHQUF0QjtBQUNBM0MsVUFBRSxNQUFNLEtBQUswQixLQUFiLEVBQW9CUSxRQUFwQixDQUE2QixpQkFBN0I7QUFDSCxLQTlGTTs7QUFnR1AyRixrQkFBYyxzQkFBVVosR0FBVixFQUFlMUksTUFBZixFQUFzQjtBQUNoQyxZQUFJVCxPQUFPLElBQVg7O0FBRUFWLGlCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixZQUFZVyxLQUFLNkosT0FBekMsRUFBa0QxRCxHQUFsRCxDQUFzRCxPQUF0RDs7QUFFQTdHLGlCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixZQUFZOEosR0FBcEMsRUFBeUNsRSxFQUF6QyxDQUE0QyxPQUE1QyxFQUFxRCxnQkFBUTtBQUN6RGpGLGlCQUFLNkosT0FBTCxHQUFlVixHQUFmO0FBQ0EsZ0JBQUkxSixPQUFPQyxLQUFLQyxHQUFMLEVBQVg7O0FBRUEsZ0JBQUlGLElBQUosRUFBVTtBQUNOLG9CQUFJK0ssV0FBV3hLLEtBQUs0SixNQUFMLENBQVlULEdBQVosRUFBaUJsSCxJQUFoQztBQUNBLG9CQUFJeEIsV0FBVyxDQUFmLEVBQWtCO0FBQUk7QUFDbEJ5QixzQkFBRSxTQUFGLEVBQWFDLElBQWIsQ0FBa0IsU0FBU3FJLFFBQVQsR0FBb0IsWUFBdEMsRUFBb0RwSSxJQUFwRCxDQUF5RCxLQUF6RCxFQUFnRStHLEdBQWhFLEVBQXFFL0csSUFBckUsQ0FBMEUsVUFBMUUsRUFBcUZvSSxRQUFyRixFQUErRnBHLFFBQS9GLENBQXdHLFVBQXhHO0FBQ0EsMENBQVkyRSxPQUFaLENBQW9CdEosS0FBS2dMLEtBQXpCO0FBQ0gsaUJBSEQsTUFHTyxJQUFJaEssV0FBVyxDQUFmLEVBQWtCO0FBQUU7QUFDdkIsNENBQWV0QixJQUFmO0FBQ0gsaUJBRk0sTUFFQSxDQUFHOztBQUVUO0FBQ0osYUFWRCxNQVVLO0FBQ0RZLHNCQUFNLG1DQUFOO0FBQ0g7QUFDSixTQWpCRDs7QUFtQkFtQyxVQUFFLFlBQUYsRUFBZ0JHLEtBQWhCLENBQXNCLFlBQVk7QUFDOUIsZ0JBQUdILEVBQUUsSUFBRixFQUFRK0IsUUFBUixDQUFpQixzQkFBakIsQ0FBSCxFQUE0QztBQUN4Qyx1QkFBTyxLQUFQO0FBQ0g7QUFDRDNFLHFCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixZQUFZVyxLQUFLNkosT0FBekMsRUFBa0QxRCxHQUFsRCxDQUFzRCxPQUF0RDtBQUNILFNBTEQ7O0FBT0FqRSxVQUFFLHFCQUFGLEVBQXlCRyxLQUF6QixDQUErQixZQUFZO0FBQ3ZDLGdCQUFJSCxFQUFFLElBQUYsRUFBUUUsSUFBUixDQUFhLElBQWIsTUFBdUIsVUFBM0IsRUFBdUM7QUFDbkMsdUJBQU8sS0FBUDtBQUNIO0FBQ0Q5QyxxQkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsWUFBWVcsS0FBSzZKLE9BQXpDLEVBQWtEMUQsR0FBbEQsQ0FBc0QsT0FBdEQ7QUFDSCxTQUxEO0FBTUg7QUFySU0sQ0FBWDs7a0JBd0lld0QsSTs7Ozs7Ozs7Ozs7OztBQzNJZjs7Ozs7O0FBRUEsSUFBSWUsY0FBYztBQUNkdkwsVUFBTSxnQkFBVTtBQUNaLFlBQUlhLE9BQU8sSUFBWDs7QUFFQWtDLFVBQUUsT0FBRixFQUFXK0MsRUFBWCxDQUFjLE9BQWQsRUFBdUIseUJBQXZCLEVBQWtELFlBQVk7QUFDMURqRixpQkFBSzJLLGVBQUwsQ0FBcUJ6SSxFQUFFLElBQUYsRUFBUW1DLE1BQVIsR0FBaUJqQyxJQUFqQixDQUFzQixJQUF0QixDQUFyQixFQUFrREYsRUFBRSxJQUFGLEVBQVFtQyxNQUFSLEdBQWlCa0QsUUFBakIsQ0FBMEIsc0JBQTFCLEVBQWtENUgsR0FBbEQsRUFBbEQ7QUFDSCxTQUZEOztBQUlBdUMsVUFBRSxPQUFGLEVBQVcrQyxFQUFYLENBQWMsT0FBZCxFQUF1QixnQkFBdkIsRUFBeUMsWUFBWTtBQUNqRCxnQkFBSTJGLE1BQU0xSSxFQUFFLElBQUYsRUFBUUUsSUFBUixDQUFhLEtBQWIsQ0FBVjtBQUNBcEMsaUJBQUs2SyxVQUFMLENBQWdCRCxHQUFoQjtBQUNBN0ssa0JBQU0sV0FBTjtBQUNILFNBSkQ7O0FBTUE7QUFDQW1DLFVBQUUsT0FBRixFQUFXK0MsRUFBWCxDQUFjLE9BQWQsRUFBdUIsb0JBQXZCLEVBQTZDLFlBQVk7QUFDckRqRixpQkFBSzhLLFVBQUwsQ0FBZ0I1SSxFQUFFLElBQUYsRUFBUW1DLE1BQVIsR0FBaUJqQyxJQUFqQixDQUFzQixJQUF0QixDQUFoQixFQUE2Q0YsRUFBRSxJQUFGLEVBQVFtQyxNQUFSLEdBQWlCa0QsUUFBakIsQ0FBMEIsa0JBQTFCLEVBQThDcEYsSUFBOUMsRUFBN0M7QUFDSCxTQUZEOztBQUlBO0FBQ0FELFVBQUUsT0FBRixFQUFXK0MsRUFBWCxDQUFjLE9BQWQsRUFBdUIsaUJBQXZCLEVBQTBDLFlBQVk7QUFDbER2RSxvQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDQVgsaUJBQUsrSyxlQUFMLENBQXFCN0ksRUFBRSxJQUFGLEVBQVFtQyxNQUFSLEdBQWlCakMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBckIsRUFBa0RGLEVBQUUsSUFBRixFQUFRbUMsTUFBUixHQUFpQmtELFFBQWpCLENBQTBCLGtCQUExQixFQUE4QzVILEdBQTlDLEVBQWxEO0FBQ0gsU0FIRDtBQUlILEtBeEJhOztBQTBCZGtMLGdCQUFZLG9CQUFVRCxHQUFWLEVBQWU7QUFDdkIsWUFBSW5KLE9BQU9TLEVBQUUsV0FBRixFQUFlRSxJQUFmLENBQW9CLEtBQXBCLENBQVg7O0FBRUEsWUFBSUUsUUFBUSxnQkFBUixDQUFKLEVBQThCO0FBQzFCaEQscUJBQVNDLFFBQVQsR0FBb0JGLEdBQXBCLENBQXdCLFlBQVlvQyxJQUFaLEdBQW1CLFNBQW5CLEdBQStCbUosR0FBL0IsR0FBcUMsU0FBN0QsRUFBd0UvSyxHQUF4RSxDQUE0RSxJQUE1RTtBQUNIO0FBRUosS0FqQ2E7O0FBbUNkOEsscUJBQWlCLHlCQUFVSyxJQUFWLEVBQWdCQyxNQUFoQixFQUF3QjtBQUNyQyxZQUFJeEosT0FBT1MsRUFBRSxXQUFGLEVBQWVFLElBQWYsQ0FBb0IsS0FBcEIsQ0FBWDtBQUNBLFlBQUk4SSxRQUFRRCxPQUFPRSxJQUFQLEtBQWdCLENBQTVCO0FBQ0F6SyxnQkFBUUMsR0FBUixDQUFZLEtBQUtsQixJQUFqQjs7QUFFQSxZQUFJeUwsUUFBUSxHQUFaLEVBQWlCO0FBQ2JuTCxrQkFBTSxxQkFBTjtBQUNILFNBRkQsTUFFTztBQUNILGdCQUFJdUMsUUFBUSxRQUFRNEksS0FBUixHQUFnQiwwQkFBeEIsQ0FBSixFQUF5RDtBQUNyRCxvQkFBSUUsU0FBUyxLQUFLM0wsSUFBTCxDQUFVZ0wsS0FBVixDQUFnQk8sSUFBaEIsQ0FBYjtBQUNBSSx1QkFBT3hMLE1BQVAsR0FBZ0JzTCxLQUFoQjs7QUFFQTVMLHlCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixZQUFZb0MsSUFBWixHQUFtQixTQUFuQixHQUErQnVKLElBQXZELEVBQTZEbkwsR0FBN0QsQ0FBaUV1TCxNQUFqRTtBQUNILGFBTEQsTUFLTztBQUNILHVCQUFPLEtBQVA7QUFDSDtBQUNKO0FBQ0osS0FwRGE7O0FBc0RkTixnQkFBWSxvQkFBVUYsR0FBVixFQUFlM0ksSUFBZixFQUFxQjtBQUM3QixZQUFJUixPQUFPUyxFQUFFLFdBQUYsRUFBZUUsSUFBZixDQUFvQixLQUFwQixDQUFYO0FBQ0EsWUFBSTRJLE9BQU9KLElBQUl2SCxLQUFKLENBQVUsR0FBVixFQUFlLENBQWYsQ0FBWDtBQUNBLFlBQUlnSSxLQUFLVCxJQUFJdkgsS0FBSixDQUFVLEdBQVYsRUFBZSxDQUFmLENBQVQ7O0FBRUEsWUFBSXBCLElBQUosRUFBVTtBQUNOLGdCQUFJSyxRQUFRTCxPQUFPLG9CQUFmLENBQUosRUFBMEM7QUFDdEMzQyx5QkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsWUFBWW9DLElBQVosR0FBbUIsU0FBbkIsR0FBK0J1SixJQUEvQixHQUFzQyxHQUF0QyxHQUE0Q0ssRUFBcEUsRUFBd0V4TCxHQUF4RSxDQUE0RSxFQUFFeUwsU0FBUyxJQUFYLEVBQTVFO0FBQ0FwSixrQkFBRSxNQUFNMEksR0FBUixFQUFhcEMsTUFBYjtBQUNBekksc0JBQU0sY0FBTjtBQUNIO0FBQ0osU0FORCxNQU1LO0FBQ0QsZ0JBQUl1QyxRQUFRK0ksS0FBSyxxQkFBYixDQUFKLEVBQXlDO0FBQ3JDL0wseUJBQVNDLFFBQVQsR0FBb0JGLEdBQXBCLENBQXdCLFlBQVlvQyxJQUFaLEdBQW1CLFNBQW5CLEdBQStCdUosSUFBL0IsR0FBc0MsR0FBdEMsR0FBNENLLEVBQXBFLEVBQXdFeEwsR0FBeEUsQ0FBNEUsRUFBRXlMLFNBQVMsSUFBWCxFQUE1RTtBQUNBcEosa0JBQUUsTUFBTTBJLEdBQVIsRUFBYXBDLE1BQWI7QUFDQXpJLHNCQUFNLGNBQU47QUFDSDtBQUNKO0FBQ0osS0F4RWE7O0FBMEVkZ0wscUJBQWlCLHlCQUFVSCxHQUFWLEVBQWVXLE9BQWYsRUFBd0I7QUFDckMsWUFBSTlKLE9BQU9TLEVBQUUsV0FBRixFQUFlRSxJQUFmLENBQW9CLEtBQXBCLENBQVg7QUFDQSxZQUFJNEksT0FBT0osSUFBSXZILEtBQUosQ0FBVSxHQUFWLEVBQWUsQ0FBZixDQUFYO0FBQ0EsWUFBSWdJLEtBQUtULElBQUl2SCxLQUFKLENBQVUsR0FBVixFQUFlLENBQWYsQ0FBVDtBQUNBLFlBQUl6QyxPQUFPLEVBQVg7O0FBRUEsWUFBSTJLLFFBQVFsSSxLQUFSLENBQWMsR0FBZCxFQUFtQnpELE1BQW5CLEtBQThCLENBQWxDLEVBQXFDO0FBQ2pDLGdCQUFJaUIsTUFBTTBLLFFBQVFsSSxLQUFSLENBQWMsR0FBZCxFQUFtQixDQUFuQixFQUFzQjhILElBQXRCLEtBQStCLENBQXpDO0FBQ0EsZ0JBQUluSyxNQUFNdUssUUFBUWxJLEtBQVIsQ0FBYyxHQUFkLEVBQW1CLENBQW5CLEVBQXNCOEgsSUFBdEIsS0FBK0IsQ0FBekM7O0FBRUEsZ0JBQUlLLE1BQU0zSyxHQUFOLEtBQWMySyxNQUFNeEssR0FBTixDQUFsQixFQUE4QjtBQUMxQjtBQUNBakIsc0JBQU0sbUJBQU47QUFDSCxhQUhELE1BR087QUFDSGEsdUJBQU87QUFDSEMseUJBQUtBLEdBREY7QUFFSEcseUJBQUtBO0FBRkYsaUJBQVA7QUFJQWpCLHNCQUFNLGFBQU47QUFDQW1DLGtCQUFFLE1BQU0wSSxHQUFSLEVBQWFwQyxNQUFiO0FBQ0FsSix5QkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsWUFBWW9DLElBQVosR0FBbUIsU0FBbkIsR0FBK0J1SixJQUEvQixHQUFzQyxHQUF0QyxHQUE0Q0ssRUFBNUMsR0FBaUQsT0FBekUsRUFBa0Z4TCxHQUFsRixDQUFzRmUsSUFBdEY7QUFDSDtBQUNKLFNBaEJELE1BZ0JPO0FBQ0hiLGtCQUFNLG1CQUFOO0FBQ0g7QUFDSixLQW5HYTs7QUFxR2RnSixhQUFTLGlCQUFTdEosSUFBVCxFQUFjO0FBQ25CeUMsVUFBRSxTQUFGLEVBQWFzRixNQUFiLENBQW9CLDRCQUFwQjs7QUFFQSxZQUFJaUUsYUFBYSxLQUFqQjtBQUNBLFlBQUk1RyxNQUFNLEVBQVY7QUFDQSxZQUFJNkcsWUFBWSx5Q0FBeUN4SixFQUFFLFdBQUYsRUFBZUUsSUFBZixDQUFvQixVQUFwQixDQUF6QyxHQUEyRSxHQUEzRjs7QUFFQSxZQUFJdUosVUFBVTtBQUNWQyxnQkFBSSxJQURNO0FBRVZDLGdCQUFJLEtBRk07QUFHVkMsZ0JBQUksU0FITTtBQUlWQyxnQkFBSTtBQUpNLFNBQWQ7QUFNQXJMLGdCQUFRQyxHQUFSLENBQVlsQixJQUFaOztBQUVBLGFBQUssSUFBSXVMLElBQVQsSUFBaUJXLE9BQWpCLEVBQTBCOztBQUV0QixnQkFBSUssaUJBQWlCLEtBQXJCO0FBQ0EsZ0JBQUlDLFNBQVMsS0FBYjtBQUNBLGdCQUFJQyxZQUFZLHNEQUFoQjtBQUNBLGdCQUFJQyxTQUFTLEtBQWI7QUFDQSxnQkFBSUMsWUFBWSwrQ0FBaEI7O0FBRUEsZ0JBQUkzTSxLQUFLdUwsSUFBTCxDQUFKLEVBQWdCO0FBQ1puRyx1QkFBTyw2QkFBNkI4RyxRQUFRWCxJQUFSLENBQTdCLEdBQTZDLGFBQXBEO0FBQ0Esb0JBQUksQ0FBQ3ZMLEtBQUt1TCxJQUFMLEVBQVdxQixNQUFoQixFQUF3QjtBQUNwQix5QkFBSyxJQUFJM0YsSUFBSSxDQUFiLEVBQWdCQSxJQUFJakgsS0FBS3VMLElBQUwsRUFBV3BMLE1BQS9CLEVBQXVDOEcsR0FBdkMsRUFBNEM7QUFDeEMsNEJBQUk5RSxPQUFPbkMsS0FBS3VMLElBQUwsRUFBV3RFLENBQVgsQ0FBWDtBQUNBLDRCQUFJOUUsSUFBSixFQUFVO0FBQ04sZ0NBQUkwSyxVQUFVLElBQWQ7QUFDQSxnQ0FBSTFLLEtBQUswSixPQUFULEVBQWtCO0FBQ2Q7QUFDSCw2QkFGRCxNQUVPO0FBQ0gsb0NBQUkxSixLQUFLaEIsSUFBVCxFQUFlO0FBQ1gsd0NBQUlnQixLQUFLaEIsSUFBTCxDQUFVSSxHQUFkLEVBQW1CO0FBQ2YsNENBQUl3SyxNQUFNNUosS0FBS2hCLElBQUwsQ0FBVUksR0FBVixHQUFnQixDQUF0QixDQUFKLEVBQThCO0FBQzFCc0wsc0RBQVUsS0FBVjtBQUNIO0FBQ0oscUNBSkQsTUFJTztBQUNIQSxrREFBVSxLQUFWO0FBQ0g7O0FBRUQsd0NBQUkxSyxLQUFLaEIsSUFBTCxDQUFVQyxHQUFkLEVBQW1CO0FBQ2YsNENBQUkySyxNQUFNNUosS0FBS2hCLElBQUwsQ0FBVUMsR0FBVixHQUFnQixDQUF0QixDQUFKLEVBQThCO0FBQzFCeUwsc0RBQVUsS0FBVjtBQUNIO0FBQ0oscUNBSkQsTUFJTztBQUNIQSxrREFBVSxLQUFWO0FBQ0g7QUFDSixpQ0FoQkQsTUFnQk87QUFDSEEsOENBQVUsS0FBVjtBQUNIOztBQUVELG9DQUFJLENBQUNBLE9BQUwsRUFBYztBQUNWSixpREFBYSxrQ0FBa0NsQixJQUFsQyxHQUF5QyxHQUF6QyxHQUErQ3RFLENBQS9DLEdBQW1ELElBQWhFO0FBQ0F3RixpREFBYSxzQ0FBc0NSLFNBQXRDLEdBQWtEOUosS0FBS0ssSUFBdkQsR0FBOEQsb0JBQTlELEdBQXFGTCxLQUFLSyxJQUExRixHQUFpRyxNQUE5RztBQUNBaUssaURBQWEsd0VBQWI7QUFDQUEsaURBQWEsMkVBQWI7QUFDQUEsaURBQWEsUUFBYjtBQUNBVCxpREFBYSxJQUFiO0FBQ0FPLHFEQUFpQixJQUFqQjtBQUNBQyw2Q0FBUyxJQUFUO0FBQ0g7QUFDSjtBQUVKLHlCQXJDRCxNQXFDTztBQUNIRyx5Q0FBYSxrQ0FBa0NwQixJQUFsQyxHQUF5QyxHQUF6QyxHQUErQ3RFLENBQS9DLEdBQW1ELElBQWhFO0FBQ0EwRix5Q0FBYSwyQkFBMkIxRixDQUEzQixHQUErQixZQUE1QztBQUNBMEYseUNBQWEsd0NBQWI7QUFDQUEseUNBQWEsUUFBYjtBQUNBWCx5Q0FBYSxJQUFiO0FBQ0FPLDZDQUFpQixJQUFqQjtBQUNBRyxxQ0FBUyxJQUFUO0FBQ0g7QUFDSjs7QUFFRCx3QkFBSUYsTUFBSixFQUFZO0FBQ1JwSCwrQkFBT3FILFNBQVA7QUFDSDtBQUNELHdCQUFJQyxNQUFKLEVBQVk7QUFDUnRILCtCQUFPdUgsU0FBUDtBQUNIOztBQUVELHdCQUFJM00sS0FBS3VMLElBQUwsRUFBV3BMLE1BQVgsR0FBb0IsR0FBeEIsRUFBNkI7QUFDekIsNEJBQUkyTSxVQUFVLElBQWQ7QUFDQSw0QkFBSTlNLEtBQUsrTSxTQUFULEVBQW9CO0FBQ2hCLGdDQUFJL00sS0FBSytNLFNBQUwsQ0FBZXhCLElBQWYsQ0FBSixFQUEwQjtBQUN0QjtBQUNILDZCQUZELE1BRU87QUFDSHVCLDBDQUFVLEtBQVY7QUFDSDtBQUNKLHlCQU5ELE1BTU87QUFDSEEsc0NBQVUsS0FBVjtBQUNIOztBQUVELDRCQUFJLENBQUNBLE9BQUwsRUFBYztBQUNWZCx5Q0FBYSxJQUFiO0FBQ0FPLDZDQUFpQixJQUFqQjtBQUNBbkgsbUNBQU8sZ0NBQWdDOEcsUUFBUVgsSUFBUixDQUFoQyxHQUFnRCxvQkFBaEQsR0FBdUV2TCxLQUFLdUwsSUFBTCxFQUFXcEwsTUFBbEYsR0FBMkYsWUFBbEc7QUFDQWlGLG1DQUFPLGtDQUFrQ21HLElBQWxDLEdBQXlDLElBQWhEO0FBQ0FuRyxtQ0FBTywrQ0FBK0NwRixLQUFLdUwsSUFBTCxFQUFXcEwsTUFBMUQsR0FBbUUsSUFBMUU7QUFDQWlGLG1DQUFPLGtEQUFQO0FBQ0FBLG1DQUFPLFFBQVA7QUFDSDtBQUVKO0FBQ0o7QUFHSixhQXRGRCxNQXNGTztBQUNIQSx1QkFBTyw2QkFBNkI4RyxRQUFRWCxJQUFSLENBQTdCLEdBQTZDLHNCQUFwRDtBQUNBbkcsdUJBQU8sbURBQW1EbUcsSUFBbkQsR0FBMEQsNEJBQWpFO0FBQ0FTLDZCQUFhLElBQWI7QUFDQU8saUNBQWlCLElBQWpCOztBQUVBO0FBQ0g7QUFDRCxnQkFBSSxDQUFDQSxjQUFMLEVBQXFCO0FBQ2pCbkgsdUJBQU8sNkNBQVA7QUFDSDtBQUNKOztBQUVELFlBQUk0RyxVQUFKLEVBQWdCO0FBQ1o1RyxtQkFBTywyQ0FBUDtBQUNBM0MsY0FBRSxnQkFBRixFQUFvQkMsSUFBcEIsQ0FBeUIwQyxHQUF6QjtBQUNILFNBSEQsTUFHTztBQUNILGdCQUFJc0UsTUFBTWpILEVBQUUsV0FBRixFQUFlRSxJQUFmLENBQW9CLEtBQXBCLENBQVY7QUFDQXJDLGtCQUFNLDJCQUFOOztBQUVBLGtDQUFZWixJQUFaLENBQWlCTSxJQUFqQjtBQUNIOztBQUVEeUMsVUFBRSxPQUFGLEVBQVd1SyxTQUFYLENBQXFCLENBQXJCO0FBQ0g7QUExT2EsQ0FBbEI7O2tCQTZPZS9CLFc7Ozs7Ozs7Ozs7OztBQy9PZjs7QUFFQSxJQUFJZ0MsY0FBYztBQUNkdk4sVUFBTSxjQUFVTSxJQUFWLEVBQWdCOztBQUVsQixZQUFJMEosTUFBTWpILEVBQUUsV0FBRixFQUFlRSxJQUFmLENBQW9CLEtBQXBCLENBQVY7QUFDQSxZQUFJdUssVUFBVSxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixFQUFtQixJQUFuQixDQUFkO0FBQ0EsWUFBSUMsWUFBWSxFQUFoQjtBQUNBLFlBQUlDLFVBQVUsQ0FBZDs7QUFFQSxhQUFLLElBQUk1RixJQUFJLENBQWIsRUFBZ0JBLElBQUkwRixRQUFRL00sTUFBNUIsRUFBb0NxSCxHQUFwQyxFQUF5QztBQUNyQyxnQkFBSStELE9BQU8yQixRQUFRMUYsQ0FBUixDQUFYO0FBQ0EsZ0JBQUl4SCxLQUFLdUwsSUFBTCxDQUFKLEVBQWdCO0FBQ1osb0JBQUl2TCxLQUFLdUwsSUFBTCxFQUFXOEIsTUFBZixFQUF1QixDQUV0QixDQUZELE1BRU87O0FBRUgseUJBQUssSUFBSXBHLElBQUksQ0FBYixFQUFnQkEsSUFBSWpILEtBQUt1TCxJQUFMLEVBQVdwTCxNQUEvQixFQUF1QzhHLEdBQXZDLEVBQTRDO0FBQ3hDLDRCQUFJakgsS0FBS3VMLElBQUwsRUFBV3RFLENBQVgsS0FBaUIsQ0FBQ2pILEtBQUt1TCxJQUFMLEVBQVd0RSxDQUFYLEVBQWM0RSxPQUFwQyxFQUE2QztBQUN6QyxnQ0FBSXlCLFVBQVV0TixLQUFLdUwsSUFBTCxFQUFXdEUsQ0FBWCxDQUFkO0FBQ0E7O0FBRUEsZ0NBQUk5RSxPQUFPO0FBQ1BLLHNDQUFNO0FBQ0YrSyx3Q0FBSSxFQURGO0FBRUZDLHdDQUFJO0FBRkYsaUNBREM7QUFLUHJNLHNDQUFNbU0sUUFBUW5NLElBTFA7QUFNUHNNLHNDQUFNO0FBTkMsNkJBQVg7O0FBV0EsZ0NBQUksUUFBUUMsSUFBUixDQUFhSixRQUFROUssSUFBckIsQ0FBSixFQUFnQztBQUM1QkwscUNBQUtLLElBQUwsQ0FBVStLLEVBQVYsR0FBZUQsUUFBUTlLLElBQXZCO0FBQ0gsNkJBRkQsTUFFTztBQUNITCxxQ0FBS0ssSUFBTCxDQUFVZ0wsRUFBVixHQUFlRixRQUFROUssSUFBdkI7QUFDSDtBQUNETCxpQ0FBS3NMLElBQUwsQ0FBVWxDLElBQVYsSUFBa0J0RSxDQUFsQjs7QUFFQSxnQ0FBSXFHLFFBQVFLLEdBQVosRUFBaUI7QUFDYnhMLHFDQUFLd0wsR0FBTCxHQUFXTCxRQUFRSyxHQUFuQjtBQUNIO0FBQ0QsZ0NBQUlMLFFBQVFNLEdBQVosRUFBaUI7QUFDYnpMLHFDQUFLeUwsR0FBTCxHQUFXTixRQUFRTSxHQUFuQjtBQUNIOztBQUVELGdDQUFJUixVQUFVLEVBQWQsRUFBa0I7QUFDZEQsMENBQVUsUUFBUUMsT0FBbEIsSUFBNkJqTCxJQUE3QjtBQUNILDZCQUZELE1BRU8sSUFBSWlMLFVBQVUsR0FBZCxFQUFtQjtBQUN0QkQsMENBQVUsT0FBT0MsT0FBakIsSUFBNEJqTCxJQUE1QjtBQUNILDZCQUZNLE1BRUE7QUFDSGdMLDBDQUFVLE1BQU1DLE9BQWhCLElBQTJCakwsSUFBM0I7QUFDSDtBQUNEaUw7QUFDSDtBQUNKLHFCQXpDRSxDQXlDRDtBQUVMO0FBQ0o7QUFDSjs7QUFHRCxZQUFJUyxhQUFhLEVBQWpCO0FBQ0EsWUFBSUMsV0FBVyxFQUFmOztBQUVBLGFBQUssSUFBSXpOLElBQVQsSUFBaUI4TSxTQUFqQixFQUE0QjtBQUN4QixnQkFBSWhMLFFBQU9nTCxVQUFVOU0sSUFBVixDQUFYO0FBQ0F3Tix1QkFBV3hOLElBQVgsSUFBbUI4QixLQUFuQjtBQUNBMEwsdUJBQVd4TixJQUFYLEVBQWlCME4sT0FBakIsR0FBMkIsRUFBM0I7QUFDQSxnQkFBSUMsY0FBYyxLQUFsQjtBQUNBOztBQUVBLGlCQUFLLElBQUlDLEtBQVQsSUFBa0JkLFNBQWxCLEVBQTZCO0FBQ3pCLG9CQUFJOU0sT0FBTzROLEtBQVgsRUFBa0I7QUFDZCx3QkFBSUMsUUFBUSxFQUFaO0FBQ0EseUJBQUssSUFBSUMsR0FBVCxJQUFnQmhCLFVBQVVjLEtBQVYsQ0FBaEIsRUFBa0M7QUFDOUJDLDhCQUFNQyxHQUFOLElBQWFoQixVQUFVYyxLQUFWLEVBQWlCRSxHQUFqQixDQUFiO0FBQ0g7QUFDRCx3QkFBSSxDQUFDRCxNQUFNckMsT0FBWCxFQUFvQjtBQUNoQiw0QkFBSS9FLE1BQU1zSCxhQUFhak0sTUFBS2hCLElBQWxCLEVBQXdCK00sTUFBTS9NLElBQTlCLENBQVY7O0FBRUEsNEJBQUkyRixNQUFNLEdBQVYsRUFBZTtBQUNYK0csdUNBQVd4TixJQUFYLEVBQWlCME4sT0FBakIsQ0FBeUJFLEtBQXpCLElBQWtDQyxLQUFsQztBQUNBRiwwQ0FBYyxJQUFkO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBRUQsZ0JBQUksQ0FBQ0EsV0FBTCxFQUFrQjtBQUNkRix5QkFBU3pOLElBQVQsSUFBaUJ3TixXQUFXeE4sSUFBWCxDQUFqQjtBQUNBLHVCQUFPd04sV0FBV3hOLElBQVgsQ0FBUDtBQUNIO0FBRUo7O0FBRURSLGlCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixZQUFZOEosR0FBWixHQUFrQixRQUExQyxFQUFvRHRKLEdBQXBELENBQXdEO0FBQ3BEK00sdUJBQVdVLFVBRHlDO0FBRXBEQyxzQkFBVUE7QUFGMEMsU0FBeEQ7O0FBS0FqTyxpQkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0Isb0JBQW9COEosR0FBcEIsR0FBMEIsY0FBbEQsRUFBa0V0SixHQUFsRSxDQUFzRSxDQUF0RTtBQUNIO0FBckdhLENBQWxCOztrQkF3R2U2TSxXOzs7Ozs7Ozs7Ozs7QUMxR2YsSUFBSW9CLGlCQUFpQixFQUFyQjs7a0JBSWVBLGM7Ozs7Ozs7Ozs7OztBQ0pmLElBQUlDLFVBQVU7QUFDVjdLLFVBQU0sRUFESTtBQUVWL0QsVUFBTSxjQUFVcUYsRUFBVixFQUFjO0FBQUE7O0FBQ2hCLFlBQUl4RSxPQUFPLElBQVg7QUFDQSxZQUFJNkUsTUFBTSxFQUFWO0FBQ0FBLGVBQU8sc0RBQVA7QUFDQUEsZUFBTyxRQUFQOztBQUVBM0MsVUFBRSxVQUFGLEVBQWNDLElBQWQsQ0FBbUIwQyxHQUFuQjs7QUFFQXZGLGlCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixPQUF4QixFQUFpQ0csSUFBakMsQ0FBc0MsT0FBdEMsRUFBK0MsZ0JBQVE7QUFDbkQsZ0JBQUlDLE9BQU9DLEtBQUtDLEdBQUwsRUFBWDs7QUFHQSxpQkFBSyxJQUFJcUssR0FBVCxJQUFnQnZLLElBQWhCLEVBQXNCO0FBQ2xCLG9CQUFJdUssUUFBUXhGLEVBQVosRUFBZ0I7QUFDWiwwQkFBS3RCLElBQUwsQ0FBVThHLEdBQVYsSUFBaUI7QUFDYi9ILDhCQUFNeEMsS0FBS3VLLEdBQUwsRUFBVS9IO0FBREgscUJBQWpCO0FBR0g7QUFDSjs7QUFFREMsY0FBRSxrQkFBRixFQUFzQmlELFlBQXRCLENBQW1DO0FBQy9CQyx3QkFBUSxHQUR1QjtBQUUvQkMsMEJBQVUsQ0FGcUI7QUFHL0JDLDRCQUFZLG9CQUFVQyxJQUFWLEVBQWdCQyxPQUFoQixFQUF5QjtBQUNqQ3hGLHlCQUFLK0ksT0FBTDtBQUNILGlCQUw4QjtBQU0vQnRELDBCQUFVLGtCQUFVQyxJQUFWLEVBQWdCO0FBQ3RCaEYsNEJBQVFDLEdBQVIsQ0FBWStFLElBQVo7QUFDSDtBQVI4QixhQUFuQzs7QUFXQSxrQkFBS3FELE9BQUw7QUFDSCxTQXhCRDtBQXlCSCxLQW5DUzs7QUFxQ1ZBLGFBQVMsbUJBQVksQ0FFcEI7O0FBdkNTLENBQWQ7O2tCQTJDZWdGLE87Ozs7Ozs7Ozs7OztBQzNDZixJQUFJQyxTQUFTO0FBQ1R0TSxTQUFJLEVBREs7QUFFVHVNLFlBQU8sS0FGRTtBQUdUeEUsV0FBTSxFQUhHOztBQUtUdEssVUFBTSxnQkFBVTtBQUNaLFlBQUlhLE9BQU8sSUFBWDtBQUNBVSxnQkFBUUMsR0FBUixDQUFZLEtBQVo7O0FBRUFyQixpQkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0Isa0JBQXhCLEVBQTRDRyxJQUE1QyxDQUFpRCxPQUFqRCxFQUEwRCxnQkFBUTtBQUM5RFEsaUJBQUt5SixLQUFMLEdBQWEvSixLQUFLQyxHQUFMLEVBQWI7O0FBRUFLLGlCQUFLMEIsR0FBTCxHQUFXLElBQUl4QixPQUFPQyxJQUFQLENBQVkrTixHQUFoQixDQUFvQnJMLFNBQVNzTCxjQUFULENBQXdCLFdBQXhCLENBQXBCLEVBQTBEO0FBQ2pFQyx3QkFBUSxFQUFFdk4sS0FBSyxRQUFQLEVBQWlCRyxLQUFLLENBQUMsUUFBdkIsRUFEeUQ7QUFFakVxTixzQkFBTSxFQUYyRDtBQUdqRUMsZ0NBQWdCLEtBSGlEO0FBSWpFQyw4QkFBYyxJQUptRDtBQUtqRUMsbUNBQW1CO0FBTDhDLGFBQTFELENBQVg7O0FBUUF4TyxpQkFBSzBCLEdBQUwsQ0FBUytNLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEIsVUFBUzFJLENBQVQsRUFBVztBQUNyQy9GLHFCQUFLME8sVUFBTCxDQUFnQjNJLENBQWhCO0FBQ0gsYUFGRDtBQUdILFNBZEQ7QUFlSCxLQXhCUTs7QUEwQlQySSxnQkFBWSxvQkFBUzNJLENBQVQsRUFBVztBQUNuQixZQUFJbkYsT0FBTztBQUNQQyxpQkFBSWtGLEVBQUU0SSxNQUFGLENBQVM5TixHQUFULEVBREc7QUFFUEcsaUJBQUkrRSxFQUFFNEksTUFBRixDQUFTM04sR0FBVDtBQUZHLFNBQVg7O0FBS0EsWUFBRyxLQUFLaU4sTUFBUixFQUFlO0FBQ1gsaUJBQUtBLE1BQUwsQ0FBWVcsTUFBWixDQUFtQixJQUFuQjtBQUNIOztBQUVELGFBQUtYLE1BQUwsR0FBYyxJQUFJL04sT0FBT0MsSUFBUCxDQUFZME8sTUFBaEIsQ0FBdUI7QUFDakNDLHNCQUFVL0ksRUFBRTRJLE1BRHFCO0FBRWpDak4saUJBQUssS0FBS0E7QUFGdUIsU0FBdkIsQ0FBZDs7QUFLQSxZQUFJbUQsTUFBTSxFQUFWO0FBQ0EsWUFBSWtLLFlBQVksRUFBaEI7QUFDQSxZQUFJQyxhQUFhLEVBQWpCOztBQUVBLGFBQUssSUFBSXRJLEtBQUksQ0FBYixFQUFnQkEsS0FBSSxHQUFwQixFQUF5QkEsSUFBekIsRUFBOEI7QUFDMUIsZ0JBQUl1SSxZQUFZLEtBQUt4RixLQUFMLENBQVcvQyxFQUFYLEVBQWN6RSxJQUE5Qjs7QUFFQSxnQkFBSXNFLE1BQU1JLEtBQUtpQixLQUFMLENBQVdpRyxhQUFhak4sSUFBYixFQUFrQixLQUFLNkksS0FBTCxDQUFXL0MsRUFBWCxFQUFjOUYsSUFBaEMsQ0FBWCxDQUFWOztBQUVBLGdCQUFHMkYsTUFBSSxHQUFQLEVBQVc7QUFDUCxxQkFBSyxJQUFJZSxLQUFJLENBQWIsRUFBZ0JBLEtBQUksS0FBS21DLEtBQUwsQ0FBVy9DLEVBQVgsRUFBY3dJLElBQWQsQ0FBbUJ0UCxNQUF2QyxFQUErQzBILElBQS9DLEVBQW9EO0FBQ2hELHdCQUFJNEgsUUFBTyxLQUFLekYsS0FBTCxDQUFXL0MsRUFBWCxFQUFjd0ksSUFBZCxDQUFtQjVILEVBQW5CLEVBQXNCaEIsS0FBdEIsQ0FBNEIsQ0FBNUIsRUFBOEIsQ0FBOUIsQ0FBWDs7QUFFQSx3QkFBR3lJLFVBQVVHLEtBQVYsQ0FBSCxFQUFtQjtBQUNmLDRCQUFHM0ksTUFBSXdJLFVBQVVHLEtBQVYsRUFBZ0IzSSxHQUF2QixFQUEyQjtBQUN2QndJLHNDQUFVRyxLQUFWLElBQWtCO0FBQ2QzSSxxQ0FBS0EsR0FEUztBQUVkdEUsc0NBQU1nTjtBQUZRLDZCQUFsQjtBQUlIO0FBQ0oscUJBUEQsTUFPSztBQUNERixrQ0FBVUcsS0FBVixJQUFrQjtBQUNkM0ksaUNBQUtBLEdBRFM7QUFFZHRFLGtDQUFNZ047QUFGUSx5QkFBbEI7QUFJSDtBQUNKOztBQUVELG9CQUFHRCxXQUFXQyxTQUFYLENBQUgsRUFBeUI7QUFDckJELCtCQUFXQyxTQUFYLEVBQXNCQyxJQUF0QixHQUE2QkYsV0FBV0MsU0FBWCxFQUFzQkMsSUFBdEIsQ0FBMkJDLE1BQTNCLENBQWtDLEtBQUsxRixLQUFMLENBQVcvQyxFQUFYLEVBQWN3SSxJQUFoRCxDQUE3QjtBQUNILGlCQUZELE1BRUs7QUFDREYsK0JBQVdDLFNBQVgsSUFBd0I7QUFDcEIxSSw2QkFBS0EsR0FEZTtBQUVwQjJJLDhCQUFNLEtBQUt6RixLQUFMLENBQVcvQyxFQUFYLEVBQWN3STtBQUZBLHFCQUF4QjtBQUlIO0FBRUo7QUFDSjtBQUNELFlBQUlFLFdBQVcsRUFBZjtBQUNBLGFBQUssSUFBSUYsSUFBVCxJQUFpQkgsU0FBakIsRUFBNEI7QUFDeEJLLHFCQUFTeEcsSUFBVCxDQUFjO0FBQ1ZzRyxzQkFBS0EsSUFESztBQUVWak4sc0JBQUs4TSxVQUFVRyxJQUFWLEVBQWdCak4sSUFGWDtBQUdWc0UscUJBQUl3SSxVQUFVRyxJQUFWLEVBQWdCM0k7QUFIVixhQUFkO0FBS0g7O0FBRUQsWUFBSThJLGNBQWMsRUFBbEI7QUFDQSxhQUFLLElBQUlwTixJQUFULElBQWlCK00sVUFBakIsRUFBNkI7QUFDekJLLHdCQUFZekcsSUFBWixDQUFpQjtBQUNic0csc0JBQUtGLFdBQVcvTSxJQUFYLEVBQWlCaU4sSUFEVDtBQUViak4sc0JBQUtBLElBRlE7QUFHYnNFLHFCQUFJeUksV0FBVy9NLElBQVgsRUFBaUJzRTtBQUhSLGFBQWpCO0FBS0g7O0FBRUQ2SSxpQkFBU2hGLElBQVQsQ0FBYyxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBYztBQUN4QixtQkFBT0QsRUFBRTlELEdBQUYsR0FBUStELEVBQUUvRCxHQUFWLEdBQWdCLENBQWhCLEdBQW9COEQsRUFBRTlELEdBQUYsR0FBUStELEVBQUUvRCxHQUFWLEdBQWdCLENBQUMsQ0FBakIsR0FBcUIsQ0FBaEQ7QUFDSCxTQUZEO0FBR0E4SSxvQkFBWWpGLElBQVosQ0FBaUIsVUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWM7QUFDM0IsbUJBQU9ELEVBQUU5RCxHQUFGLEdBQVErRCxFQUFFL0QsR0FBVixHQUFnQixDQUFoQixHQUFvQjhELEVBQUU5RCxHQUFGLEdBQVErRCxFQUFFL0QsR0FBVixHQUFnQixDQUFDLENBQWpCLEdBQXFCLENBQWhEO0FBQ0gsU0FGRDs7QUFJQTFCLGVBQUssdUNBQUw7QUFDQUEsZUFBSyxpQ0FBTDtBQUNBLGFBQUssSUFBSTZCLElBQUksQ0FBYixFQUFnQkEsSUFBSTJJLFlBQVl6UCxNQUFoQyxFQUF3QzhHLEdBQXhDLEVBQTZDO0FBQ3pDN0IsbUJBQUssa0NBQUw7QUFDQUEsbUJBQVEsNkNBQTRDd0ssWUFBWTNJLENBQVosRUFBZXpFLElBQTNELEdBQWtFLE9BQTFFO0FBQ0E0QyxtQkFBUSx5Q0FBd0M4QixLQUFLMkksSUFBTCxDQUFVRCxZQUFZM0ksQ0FBWixFQUFlSCxHQUFmLEdBQW1CLEVBQTdCLENBQXhDLEdBQTJFLFVBQW5GO0FBQ0ExQixtQkFBUSw2Q0FBUjtBQUNBLGlCQUFLLElBQUl5QyxJQUFJLENBQWIsRUFBZ0JBLElBQUkrSCxZQUFZM0ksQ0FBWixFQUFld0ksSUFBZixDQUFvQnRQLE1BQXhDLEVBQWdEMEgsR0FBaEQsRUFBcUQ7QUFDakQsb0JBQUcrSCxZQUFZM0ksQ0FBWixFQUFld0ksSUFBZixDQUFvQjVILENBQXBCLEVBQXVCMUgsTUFBdkIsS0FBa0MsQ0FBckMsRUFBdUM7QUFDbkNpRiwyQkFBUSxnREFBOEN3SyxZQUFZM0ksQ0FBWixFQUFld0ksSUFBZixDQUFvQjVILENBQXBCLENBQTlDLEdBQXFFLElBQXJFLEdBQTBFK0gsWUFBWTNJLENBQVosRUFBZXdJLElBQWYsQ0FBb0I1SCxDQUFwQixDQUExRSxHQUFtRyxNQUEzRztBQUNIO0FBQ0o7QUFDRHpDLG1CQUFRLFFBQVI7O0FBRUFBLG1CQUFLLFFBQUw7QUFDSDtBQUNEQSxlQUFLLFFBQUw7O0FBRUFBLGVBQUssd0NBQUw7QUFDQUEsZUFBSyxpQ0FBTDtBQUNBLGFBQUssSUFBSTZCLElBQUksQ0FBYixFQUFnQkEsSUFBSTBJLFNBQVN4UCxNQUE3QixFQUFxQzhHLEdBQXJDLEVBQTBDO0FBQ3RDN0IsbUJBQUssa0NBQUw7QUFDQUEsbUJBQVEseUNBQXVDdUssU0FBUzFJLENBQVQsRUFBWXdJLElBQW5ELEdBQXdELElBQXhELEdBQTZERSxTQUFTMUksQ0FBVCxFQUFZd0ksSUFBekUsR0FBZ0YsTUFBeEY7QUFDQXJLLG1CQUFRLGtDQUFpQzhCLEtBQUsySSxJQUFMLENBQVVGLFNBQVMxSSxDQUFULEVBQVlILEdBQVosR0FBZ0IsRUFBMUIsQ0FBakMsR0FBaUUsVUFBekU7QUFDQTFCLG1CQUFRLHNDQUFxQ3VLLFNBQVMxSSxDQUFULEVBQVl6RSxJQUFqRCxHQUF3RCxPQUFoRTtBQUNBNEMsbUJBQUssUUFBTDtBQUNIO0FBQ0RBLGVBQUssUUFBTDs7QUFFQTNDLFVBQUUsZUFBRixFQUFtQkMsSUFBbkIsQ0FBd0IwQyxHQUF4QjtBQUNIO0FBdklRLENBQWI7O2tCQTBJZW1KLE07Ozs7Ozs7Ozs7Ozs7QUMxSWY7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSXVCLFFBQVE7O0FBR1I7O0FBRUFwUSxVQUFNLGdCQUFVO0FBQUE7O0FBQ1osWUFBSWEsT0FBTyxJQUFYOztBQUVBVixpQkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsZ0JBQXhCLEVBQTBDNEYsRUFBMUMsQ0FBNkMsT0FBN0MsRUFBc0QsZ0JBQU87QUFDekQsZ0JBQUl4RixPQUFPQyxLQUFLQyxHQUFMLEVBQVg7QUFDQSxrQkFBS21LLGNBQUwsQ0FBb0JySyxJQUFwQjtBQUNILFNBSEQ7O0FBS0F5QyxVQUFFLFFBQUYsRUFBWStDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLHNCQUF4QixFQUFnRCxZQUFZO0FBQ3hELGdCQUFJa0UsTUFBTWpILEVBQUUsSUFBRixFQUFRRSxJQUFSLENBQWEsS0FBYixDQUFWO0FBQ0EsZ0JBQUlvSSxXQUFXdEksRUFBRSxJQUFGLEVBQVFtQyxNQUFSLEdBQWlCa0QsUUFBakIsQ0FBMEIsZUFBMUIsRUFBMkNwRixJQUEzQyxFQUFmO0FBQ0FuQyxpQkFBSytKLFlBQUwsQ0FBa0JaLEdBQWxCLEVBQXVCcUIsUUFBdkI7QUFDSCxTQUpEO0FBS0F0SSxVQUFFLFFBQUYsRUFBWStDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLHdCQUF4QixFQUFrRCxZQUFZO0FBQzFEL0MsY0FBRSxxQkFBRixFQUF5QnNHLE1BQXpCO0FBQ0gsU0FGRDs7QUFJQXRHLFVBQUUsUUFBRixFQUFZK0MsRUFBWixDQUFlLE9BQWYsRUFBd0IsbUJBQXhCLEVBQTZDLFlBQVk7QUFBRztBQUN4RCxnQkFBSWtFLE1BQU1qSCxFQUFFLElBQUYsRUFBUUUsSUFBUixDQUFhLEtBQWIsQ0FBVjtBQUNBOUMscUJBQVNDLFFBQVQsR0FBb0JGLEdBQXBCLENBQXdCLFlBQVU4SixHQUFWLEdBQWMsU0FBdEMsRUFBaUQzSixJQUFqRCxDQUFzRCxPQUF0RCxFQUErRCxnQkFBTztBQUNsRSxvQkFBSUMsT0FBT0MsS0FBS0MsR0FBTCxFQUFYO0FBQ0EscUJBQUssSUFBSTZQLEdBQVQsSUFBZ0IvUCxJQUFoQixFQUFzQjtBQUNsQix3QkFBRyxDQUFDQSxLQUFLK1AsR0FBTCxFQUFVdkcsSUFBZCxFQUFtQjtBQUNmLDRCQUFHeEosS0FBSytQLEdBQUwsRUFBVXZHLElBQVYsS0FBbUIsQ0FBdEIsRUFBd0IsQ0FFdkIsQ0FGRCxNQUVLO0FBQ0QsbUNBQU94SixLQUFLK1AsR0FBTCxDQUFQO0FBQ0g7QUFDSjtBQUNKOztBQUVBbFEseUJBQVNDLFFBQVQsR0FBb0JGLEdBQXBCLENBQXdCLFlBQVU4SixHQUFWLEdBQWMsU0FBdEMsRUFBaUR0SixHQUFqRCxDQUFxREosSUFBckQ7QUFDQUgseUJBQVNDLFFBQVQsR0FBb0JGLEdBQXBCLENBQXdCLG9CQUFvQjhKLEdBQXBCLEdBQTBCLGNBQWxELEVBQWtFdEosR0FBbEUsQ0FBc0UsQ0FBdEU7QUFDQVAseUJBQVNDLFFBQVQsR0FBb0JGLEdBQXBCLENBQXdCLFlBQVk4SixHQUFaLEdBQWtCLGNBQTFDLEVBQTBEdEosR0FBMUQsQ0FBOEQsSUFBOUQ7QUFDSixhQWZEO0FBa0JILFNBcEJEO0FBcUJILEtBM0NPOztBQTZDUmtLLGtCQUFjLHNCQUFTWixHQUFULEVBQWNxQixRQUFkLEVBQXVCOztBQUVqQ2xMLGlCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixZQUFVOEosR0FBbEMsRUFBdUMzSixJQUF2QyxDQUE0QyxPQUE1QyxFQUFxRCxnQkFBTztBQUN4RCxnQkFBSUMsT0FBT0MsS0FBS0MsR0FBTCxFQUFYO0FBQ0EsZ0JBQUk4UCxRQUFRLElBQVo7QUFDQSxnQkFBSUMsYUFBYSxFQUFqQjtBQUNBQSwwQkFBYyxrQ0FBZDtBQUNBQSwwQkFBa0IsNEJBQWxCOztBQUVBLGdCQUFHLENBQUNqUSxJQUFKLEVBQVM7QUFDTGlRLDhCQUFjLCtCQUFkO0FBQ0FBLDhCQUFjLHVCQUFkO0FBQ0FBLDhCQUFjLHVCQUFkO0FBQ0FBLDhCQUFjLHVCQUFkO0FBQ0FELHdCQUFRLEtBQVI7QUFDSCxhQU5ELE1BTUs7QUFDRCxvQkFBR2hRLEtBQUtnTCxLQUFSLEVBQWM7QUFDVix3QkFBSSxDQUFDaEwsS0FBS2dMLEtBQUwsQ0FBV2tGLE1BQWhCLEVBQXdCO0FBQ3BCRCxzQ0FBYywrQkFBZDtBQUNBRCxnQ0FBUSxLQUFSO0FBQ0g7QUFDSixpQkFMRCxNQUtLO0FBQ0RDLGtDQUFjLCtCQUFkO0FBQ0FELDRCQUFRLEtBQVI7QUFDSDs7QUFFRCxvQkFBSSxDQUFDaFEsS0FBS2dLLEtBQVYsRUFBaUI7QUFDYmlHLGtDQUFjLHVCQUFkO0FBQ0FELDRCQUFRLEtBQVI7QUFDSCxpQkFIRCxNQUdNLElBQUcsQ0FBQ2hRLEtBQUtpSyxTQUFULEVBQW1CO0FBQ3JCZ0csa0NBQWMsMkNBQWQ7QUFDQUQsNEJBQVEsS0FBUjtBQUNIOztBQUVELG9CQUFJLENBQUNoUSxLQUFLbVEsS0FBVixFQUFpQjtBQUNiRixrQ0FBYyx1QkFBZDtBQUNBRCw0QkFBUSxLQUFSO0FBQ0g7QUFDRCxvQkFBSSxDQUFDaFEsS0FBS3dKLElBQVYsRUFBZ0I7QUFDWnlHLGtDQUFjLHVCQUFkO0FBQ0FELDRCQUFRLEtBQVI7QUFDSCxpQkFIRCxNQUdNLElBQUksQ0FBQ2hRLEtBQUtnQixNQUFMLENBQVl3SSxJQUFqQixFQUFzQjtBQUN4QixzQ0FBUUYsT0FBUixDQUFnQnlCLFFBQWhCLEVBQTBCckIsR0FBMUI7QUFDQXNHLDRCQUFRLEtBQVI7QUFDQTFQLDBCQUFNLGlCQUFOO0FBQ0g7QUFDSjs7QUFHRDJQLDBCQUFjLDZDQUFkOztBQUVBQSwwQkFBYyxjQUFkOztBQUVBLGdCQUFHRCxLQUFILEVBQVM7QUFDTCx1Q0FBYXRRLElBQWIsQ0FBa0JNLElBQWxCLEVBQXdCMEosR0FBeEIsRUFBNkJxQixRQUE3QjtBQUNILGFBRkQsTUFFSztBQUNEdEksa0JBQUUsUUFBRixFQUFZc0YsTUFBWixDQUFtQmtJLFVBQW5CO0FBQ0g7QUFDSixTQXhERDtBQXlESCxLQXhHTzs7QUEwR1I1RixvQkFBZ0Isd0JBQVNySyxJQUFULEVBQWM7QUFDMUJpQixnQkFBUUMsR0FBUixDQUFZbEIsSUFBWjtBQUNBLFlBQUlvRixNQUFNLEVBQVY7QUFDQUEsZUFBTyxzQkFBUDtBQUNBQSxlQUFZLGlCQUFaO0FBQ0FBLGVBQU8sUUFBUDtBQUNBQSxlQUFPLHVCQUFQOztBQUVBQSxlQUFPLDZCQUFQO0FBQ0FBLGVBQVksaUNBQVo7QUFDQUEsZUFBWSxvQ0FBWjtBQUNBQSxlQUFZLHVDQUFaO0FBQ0FBLGVBQVksa0NBQVo7QUFDQUEsZUFBWSxtQ0FBWjtBQUNBQSxlQUFZLHlDQUFaO0FBQ0FBLGVBQU8sUUFBUDs7QUFFQSxhQUFLLElBQUlzRSxHQUFULElBQWdCMUosSUFBaEIsRUFBc0I7QUFDbEIsZ0JBQUlnQyxPQUFPaEMsS0FBSzBKLEdBQUwsQ0FBWDtBQUNBLGdCQUFJMUksU0FBU2dCLEtBQUtoQixNQUFsQjtBQUNJb0UsbUJBQU8sNkJBQVA7QUFDQUEsbUJBQVksNkJBQTJCcEQsS0FBS1EsSUFBaEMsR0FBcUMsTUFBakQ7O0FBRUEsZ0JBQUd4QixPQUFPcUIsS0FBUCxLQUFpQixDQUFwQixFQUFzQjtBQUNsQitDLHVCQUFPLGdDQUFQO0FBQ0gsYUFGRCxNQUVNO0FBQ0ZBLHVCQUFPLHVEQUF1RHBELEtBQUszQixJQUE1RCxHQUFtRSxvQkFBMUU7QUFDSDs7QUFFRCxnQkFBR1csT0FBT3FCLEtBQVAsR0FBYSxDQUFoQixFQUFrQjtBQUNkK0MsdUJBQU8sZ0NBQVA7QUFDSCxhQUZELE1BRUs7QUFDREEsdUJBQU8sZ0NBQVA7QUFDSDs7QUFFRCxnQkFBR3BFLE9BQU93SSxJQUFWLEVBQWU7QUFDWHBFLHVCQUFPLCtCQUFQO0FBQ0gsYUFGRCxNQUVLO0FBQ0RBLHVCQUFPLCtCQUFQO0FBQ0g7O0FBRUQsZ0JBQUlwRSxPQUFPbUIsSUFBUCxHQUFjLENBQWxCLEVBQXFCO0FBQ2pCaUQsdUJBQU8sK0JBQVA7QUFDSCxhQUZELE1BRU87QUFDSEEsdUJBQU8sK0JBQVA7QUFDSDs7QUFFRCxnQkFBSXBFLE9BQU91SSxTQUFQLEtBQXFCLENBQXpCLEVBQTRCO0FBQ3hCbkUsdUJBQU8sb0NBQVA7QUFDSCxhQUZELE1BRU87QUFDSEEsdUJBQU8sb0NBQVA7QUFDSDtBQUNEQSxtQkFBTyxRQUFQO0FBQ1A7QUFDREEsZUFBTyxRQUFQOztBQUVBM0MsVUFBRSxjQUFGLEVBQWtCQyxJQUFsQixDQUF1QjBDLEdBQXZCO0FBQ0g7O0FBbktPLENBQVo7O2tCQXVLZTBLLEs7Ozs7Ozs7Ozs7Ozs7QUMxS2Y7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSU0sZUFBZTtBQUNmMVEsVUFBTSxjQUFTTSxJQUFULEVBQWUwSixHQUFmLEVBQW9CcUIsUUFBcEIsRUFBNkI7QUFDL0I7QUFDQSxZQUFJc0YsV0FBVyxFQUFmOztBQUVBLFlBQUloTyxRQUFRckMsS0FBSzJKLE1BQUwsQ0FBWUMsT0FBT0MsSUFBUCxDQUFZN0osS0FBSzJKLE1BQWpCLEVBQXlCLENBQXpCLENBQVosQ0FBWjs7QUFFQSxZQUFJM0ksU0FBUztBQUNUbVAsbUJBQU87QUFDSHBSLHFCQUFLLEVBQUU7QUFDSHVSLDBCQUFLLENBREo7QUFFREMsMEJBQUs7QUFGSixpQkFERjtBQUtIOVIsc0JBQU0sQ0FMSDtBQU1IdUwsdUJBQU8sQ0FOSjtBQU9IN0gsc0JBQUs7QUFQRixhQURFOztBQVdUMkgsd0JBQVk7QUFDUlAsMkJBQVUsQ0FERjtBQUVSaUgsd0JBQU8sQ0FGQztBQUdSQyx1QkFBTSxDQUhFO0FBSVJDLDZCQUFZO0FBSko7QUFYSCxTQUFiOztBQW1CQSxZQUFJck8sTUFBTThOLEtBQVYsRUFBaUI7QUFDYixnQkFBSTlOLE1BQU04TixLQUFOLENBQVlwUixHQUFoQixFQUFxQjtBQUNqQixvQkFBSTRSLE1BQU1DLE9BQU4sQ0FBY3ZPLE1BQU04TixLQUFOLENBQVlwUixHQUExQixDQUFKLEVBQW9DO0FBQUU7QUFDbENpQywyQkFBT21QLEtBQVAsQ0FBYXBSLEdBQWIsQ0FBaUJ1UixJQUFqQixHQUF3QixDQUF4QjtBQUNILGlCQUZELE1BRU87QUFBRTtBQUNMdFAsMkJBQU9tUCxLQUFQLENBQWFwUixHQUFiLENBQWlCdVIsSUFBakIsR0FBd0IsQ0FBeEI7O0FBRUEsd0JBQUlqTyxNQUFNOE4sS0FBTixDQUFZcFIsR0FBWixDQUFnQndSLElBQXBCLEVBQTBCO0FBQ3RCdlAsK0JBQU9tUCxLQUFQLENBQWFwUixHQUFiLENBQWlCd1IsSUFBakIsR0FBd0IsQ0FBeEI7QUFDSCxxQkFGRCxNQUVPLElBQUl2USxLQUFLbVEsS0FBTCxDQUFXcFIsR0FBZixFQUFvQjtBQUN2QmlDLCtCQUFPbVAsS0FBUCxDQUFhcFIsR0FBYixDQUFpQndSLElBQWpCLEdBQXdCLENBQXhCO0FBQ0E7QUFDSDtBQUNKO0FBQ0osYUFiRCxNQWFPO0FBQUU7QUFDTHZQLHVCQUFPbVAsS0FBUCxDQUFhcFIsR0FBYixDQUFpQnVSLElBQWpCLEdBQXdCLENBQXhCOztBQUVBLG9CQUFJdFEsS0FBS21RLEtBQUwsQ0FBV3BSLEdBQWYsRUFBb0I7QUFBRTtBQUNsQmlDLDJCQUFPbVAsS0FBUCxDQUFhcFIsR0FBYixDQUFpQndSLElBQWpCLEdBQXdCLENBQXhCO0FBQ0E7QUFDSDtBQUNKOztBQUVELGdCQUFJbE8sTUFBTThOLEtBQU4sQ0FBWTFSLElBQWhCLEVBQXNCO0FBQ2xCdUMsdUJBQU9tUCxLQUFQLENBQWExUixJQUFiLEdBQW9CLENBQXBCO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsb0JBQUl1QixLQUFLbVEsS0FBTCxDQUFXMVIsSUFBZixFQUFxQjtBQUNqQnVDLDJCQUFPbVAsS0FBUCxDQUFhMVIsSUFBYixHQUFvQixDQUFwQjtBQUNILGlCQUZELE1BRU87QUFDSHVDLDJCQUFPbVAsS0FBUCxDQUFhMVIsSUFBYixHQUFvQixDQUFwQjtBQUNIO0FBQ0o7O0FBRUQsZ0JBQUk0RCxNQUFNOE4sS0FBTixDQUFZbkcsS0FBaEIsRUFBdUI7QUFDbkJoSix1QkFBT21QLEtBQVAsQ0FBYW5HLEtBQWIsR0FBcUIsQ0FBckI7QUFDSCxhQUZELE1BRU87QUFDSCxvQkFBSWhLLEtBQUtpSyxTQUFULEVBQW9CO0FBQ2hCakosMkJBQU9tUCxLQUFQLENBQWFuRyxLQUFiLEdBQXFCLENBQXJCO0FBQ0gsaUJBRkQsTUFFTztBQUNIaEosMkJBQU9tUCxLQUFQLENBQWFuRyxLQUFiLEdBQXFCLENBQXJCO0FBQ0g7QUFDSjs7QUFFRCxnQkFBSTNILE1BQU04TixLQUFOLENBQVloTyxJQUFoQixFQUFzQjtBQUNsQm5CLHVCQUFPbVAsS0FBUCxDQUFhaE8sSUFBYixHQUFvQixDQUFwQjtBQUNILGFBRkQsTUFFTztBQUNILG9CQUFJbkMsS0FBS2dMLEtBQUwsQ0FBV2tGLE1BQWYsRUFBdUI7QUFDbkJsUCwyQkFBT21QLEtBQVAsQ0FBYWhPLElBQWIsR0FBb0IsQ0FBcEI7QUFDSCxpQkFGRCxNQUVPO0FBQ0huQiwyQkFBT21QLEtBQVAsQ0FBYWhPLElBQWIsR0FBb0IsQ0FBcEI7QUFDSDtBQUNKO0FBRUosU0FyREQsTUFxRE87QUFDSG5CLG1CQUFPbVAsS0FBUCxDQUFhcFIsR0FBYixDQUFpQnVSLElBQWpCLEdBQXdCLENBQXhCLENBREcsQ0FDd0I7O0FBRTNCLGdCQUFJdFEsS0FBS21RLEtBQUwsQ0FBV3BSLEdBQWYsRUFBb0I7QUFBRTtBQUNsQmlDLHVCQUFPbVAsS0FBUCxDQUFhcFIsR0FBYixDQUFpQndSLElBQWpCLEdBQXdCLENBQXhCO0FBQ0g7O0FBRUQsZ0JBQUl2USxLQUFLbVEsS0FBTCxDQUFXMVIsSUFBZixFQUFxQjtBQUNqQnVDLHVCQUFPbVAsS0FBUCxDQUFhMVIsSUFBYixHQUFvQixDQUFwQjtBQUNILGFBRkQsTUFFTztBQUNIdUMsdUJBQU9tUCxLQUFQLENBQWExUixJQUFiLEdBQW9CLENBQXBCO0FBQ0g7O0FBRUQsZ0JBQUl1QixLQUFLaUssU0FBVCxFQUFvQjtBQUNoQmpKLHVCQUFPbVAsS0FBUCxDQUFhbkcsS0FBYixHQUFxQixDQUFyQjtBQUNILGFBRkQsTUFFTztBQUNIaEosdUJBQU9tUCxLQUFQLENBQWFuRyxLQUFiLEdBQXFCLENBQXJCO0FBQ0g7O0FBRUQsZ0JBQUloSyxLQUFLZ0wsS0FBTCxDQUFXa0YsTUFBZixFQUF1QjtBQUNuQmxQLHVCQUFPbVAsS0FBUCxDQUFhaE8sSUFBYixHQUFvQixDQUFwQjtBQUNILGFBRkQsTUFFTztBQUNIbkIsdUJBQU9tUCxLQUFQLENBQWFoTyxJQUFiLEdBQW9CLENBQXBCO0FBQ0g7QUFDSjs7QUFFRGtPLG9CQUFZLCtDQUFaOztBQUdBLFlBQUlyUCxPQUFPbVAsS0FBUCxDQUFhcFIsR0FBYixDQUFpQnVSLElBQWpCLEtBQTBCLENBQTlCLEVBQWlDO0FBQzdCRCx3QkFBWSwyREFBWjtBQUNILFNBRkQsTUFFTyxJQUFJclAsT0FBT21QLEtBQVAsQ0FBYXBSLEdBQWIsQ0FBaUJ1UixJQUFqQixLQUEwQixDQUE5QixFQUFpQztBQUNwQyw2QkFBTzVRLElBQVAsQ0FBWU0sSUFBWixFQUFrQjBKLEdBQWxCO0FBQ0EyRyx3QkFBWSxpR0FBWjtBQUNILFNBSE0sTUFHQSxJQUFJclAsT0FBT21QLEtBQVAsQ0FBYXBSLEdBQWIsQ0FBaUJ1UixJQUFqQixLQUEwQixDQUE5QixFQUFpQztBQUNwQ0Qsd0JBQVksNkdBQVo7QUFDSDs7QUFFRCxZQUFJclAsT0FBT21QLEtBQVAsQ0FBYXBSLEdBQWIsQ0FBaUJ3UixJQUFqQixLQUEwQixDQUE5QixFQUFpQztBQUM3QkYsd0JBQVksMkRBQVo7QUFDSCxTQUZELE1BRU8sSUFBSXJQLE9BQU9tUCxLQUFQLENBQWFwUixHQUFiLENBQWlCd1IsSUFBakIsS0FBMEIsQ0FBOUIsRUFBaUM7QUFDcENGLHdCQUFZLHVGQUFaO0FBQ0gsU0F4SDhCLENBd0g3Qjs7QUFFRixZQUFJclAsT0FBT21QLEtBQVAsQ0FBYTFSLElBQWIsS0FBc0IsQ0FBMUIsRUFBNkI7QUFDekI0Uix3QkFBWSw0REFBWjtBQUNILFNBRkQsTUFFTyxJQUFJclAsT0FBT21QLEtBQVAsQ0FBYTFSLElBQWIsS0FBc0IsQ0FBMUIsRUFBNkI7QUFDaEMsOEJBQVFpQixJQUFSLENBQWFNLElBQWIsRUFBbUIwSixHQUFuQjtBQUNBMkcsd0JBQVksa0ZBQVo7QUFDSCxTQUhNLE1BR0EsSUFBSXJQLE9BQU9tUCxLQUFQLENBQWExUixJQUFiLEtBQXNCLENBQTFCLEVBQTZCO0FBQ2hDNFIsd0JBQVksNkZBQVo7QUFDSDs7QUFFRCxZQUFJclAsT0FBT21QLEtBQVAsQ0FBYW5HLEtBQWIsS0FBdUIsQ0FBM0IsRUFBOEI7QUFDMUJxRyx3QkFBWSw0REFBWjtBQUNILFNBRkQsTUFFTyxJQUFJclAsT0FBT21QLEtBQVAsQ0FBYW5HLEtBQWIsS0FBdUIsQ0FBM0IsRUFBOEI7QUFDakNxRyx3QkFBWSxpRkFBWjtBQUNILFNBRk0sTUFFQSxJQUFJclAsT0FBT21QLEtBQVAsQ0FBYW5HLEtBQWIsS0FBdUIsQ0FBM0IsRUFBOEI7QUFDakNxRyx3QkFBWSw2RkFBWjtBQUNIOztBQUVELFlBQUlyUCxPQUFPbVAsS0FBUCxDQUFhaE8sSUFBYixLQUFzQixDQUExQixFQUE2QjtBQUN6QmtPLHdCQUFZLHVEQUFaO0FBQ0gsU0FGRCxNQUVPLElBQUlyUCxPQUFPbVAsS0FBUCxDQUFhaE8sSUFBYixLQUFzQixDQUExQixFQUE2QjtBQUNoQ2tPLHdCQUFZLDRFQUFaO0FBQ0gsU0FGTSxNQUVBLElBQUlyUCxPQUFPbVAsS0FBUCxDQUFhaE8sSUFBYixLQUFzQixDQUExQixFQUE2QjtBQUNoQ2tPLHdCQUFZLDZGQUFaO0FBQ0g7O0FBRURwUCxnQkFBUUMsR0FBUixDQUFZbVAsUUFBWjtBQUNIO0FBckpjLENBQW5COztrQkF3SmVELFk7Ozs7Ozs7Ozs7Ozs7QUMzSmY7Ozs7OztBQUVBLElBQUlTLFNBQVM7QUFDVEMsZUFBVztBQUNQMVIsaUJBQVEsRUFERCxFQUNLO0FBQ1pELGdCQUFPLEVBRkEsRUFFTTtBQUNiRSxlQUFNLEVBSEMsQ0FHRTtBQUhGLEtBREY7QUFNVDBSLFlBQVEsRUFOQyxFQU1HOztBQUVaL1EsVUFBSyxFQVJJOztBQVVUTixVQUFNLGNBQVVNLElBQVYsRUFBZ0IwSixHQUFoQixFQUFxQjtBQUN2QixhQUFLMUosSUFBTCxHQUFZQSxJQUFaOztBQUVBLGFBQUtnUixjQUFMLEdBSHVCLENBR0E7QUFDdkIsYUFBS0MsY0FBTCxHQUp1QixDQUlBO0FBQ3ZCLGFBQUtDLGVBQUwsR0FMdUIsQ0FLQztBQUN4QixhQUFLQyxlQUFMLEdBTnVCLENBTUM7QUFDeEIsYUFBS0MsZUFBTDtBQUNBLGFBQUtDLGFBQUw7QUFDSCxLQW5CUTs7QUFxQlRMLG9CQUFnQiwwQkFBVTtBQUN0QixZQUFJckgsU0FBUyxLQUFLM0osSUFBTCxDQUFVMkosTUFBdkI7O0FBRUEsYUFBSyxJQUFNb0csR0FBWCxJQUFrQnBHLE1BQWxCLEVBQTBCO0FBQ3RCLGdCQUFJdEgsUUFBUXNILE9BQU9vRyxHQUFQLENBQVo7QUFDQSxnQkFBSTFOLE1BQU04TixLQUFWLEVBQWlCO0FBQUU7QUFDZixvQkFBSW1CLFNBQVNqUCxNQUFNOE4sS0FBTixDQUFZcFIsR0FBekI7QUFDQSxvQkFBSXdTLFNBQVM7QUFDVG5TLDZCQUFTa1MsT0FBTyxDQUFQLENBREE7QUFFVGpTLDJCQUFPLENBRkU7QUFHVEYsNEJBQVE7QUFIQyxpQkFBYjs7QUFNQW9TLHVCQUFPblMsT0FBUCxDQUFlMEgsR0FBZixHQUFxQnNILGFBQWFrRCxPQUFPLENBQVAsRUFBVW5RLElBQXZCLEVBQTZCa0IsTUFBTWxCLElBQW5DLENBQXJCLENBUmEsQ0FRa0Q7O0FBRS9ELG9CQUFJbVEsTUFBSixFQUFZO0FBQ1IseUJBQUssSUFBSXJLLElBQUksQ0FBYixFQUFnQkEsSUFBSXFLLE9BQU9uUixNQUEzQixFQUFtQzhHLEdBQW5DLEVBQXdDO0FBQ3BDLDRCQUFJbEksTUFBTXVTLE9BQU9ySyxDQUFQLENBQVY7QUFDQSw0QkFBSUgsTUFBTXNILGFBQWFyUCxJQUFJb0MsSUFBakIsRUFBdUJrQixNQUFNbEIsSUFBN0IsQ0FBVjs7QUFFQSw0QkFBSTJGLE1BQU0sS0FBVixFQUFpQjtBQUFFO0FBQ2Z5SyxtQ0FBT2xTLEtBQVA7QUFDSDs7QUFFRCw0QkFBSSxDQUFDa1MsT0FBT3BTLE1BQVosRUFBb0I7QUFBQztBQUNqQixnQ0FBSTJILE1BQU0sR0FBVixFQUFlO0FBQUU7QUFDYixvQ0FBSSxDQUFDL0gsSUFBSXlTLEtBQUosQ0FBVUMsUUFBVixDQUFtQixNQUFuQixLQUE0QjFTLElBQUkyUyxTQUFKLENBQWNELFFBQWQsQ0FBdUIsTUFBdkIsQ0FBN0IsS0FBZ0UxUyxJQUFJNFMsSUFBeEUsRUFBOEU7QUFDMUVKLDJDQUFPcFMsTUFBUCxHQUFnQkosR0FBaEI7QUFDQXdTLDJDQUFPcFMsTUFBUCxDQUFjMkgsR0FBZCxHQUFvQkEsR0FBcEI7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQUNEOztBQUVBLHlCQUFLZ0ssU0FBTCxDQUFlMVIsT0FBZixDQUF1QitKLElBQXZCLENBQTRCb0ksT0FBT25TLE9BQVAsQ0FBZTBILEdBQTNDO0FBQ0Esd0JBQUl5SyxPQUFPcFMsTUFBWCxFQUFtQjtBQUNmLDZCQUFLMlIsU0FBTCxDQUFlM1IsTUFBZixDQUFzQmdLLElBQXRCLENBQTJCb0ksT0FBT3BTLE1BQVAsQ0FBYzJILEdBQXpDO0FBQ0gscUJBRkQsTUFFTztBQUNILDZCQUFLZ0ssU0FBTCxDQUFlM1IsTUFBZixDQUFzQmdLLElBQXRCLENBQTJCLEdBQTNCO0FBQ0g7QUFFSixpQkEzQkQsTUEyQk87QUFDSHlJO0FBQ0g7QUFDRHZQLHNCQUFNOE4sS0FBTixDQUFZcFIsR0FBWixHQUFrQndTLE1BQWxCOztBQUVBO0FBQ0EscUJBQUtULFNBQUwsQ0FBZXpSLEtBQWYsQ0FBcUI4SixJQUFyQixDQUEwQm9JLE9BQU9sUyxLQUFqQzs7QUFFQSxvQkFBRyxLQUFLMFIsTUFBTCxDQUFZMU8sTUFBTW1ILElBQWxCLENBQUgsRUFBMkI7QUFBQztBQUN4Qix5QkFBS3VILE1BQUwsQ0FBWTFPLE1BQU1tSCxJQUFsQixFQUF3QkwsSUFBeEIsQ0FBNkJvSSxPQUFPbFMsS0FBcEM7QUFDSCxpQkFGRCxNQUVLO0FBQ0QseUJBQUswUixNQUFMLENBQVkxTyxNQUFNbUgsSUFBbEIsSUFBMEIsQ0FBQytILE9BQU9sUyxLQUFSLENBQTFCO0FBQ0g7QUFFSixhQW5ERCxNQW1ETztBQUNIaUI7QUFDQSx1QkFBTyxLQUFQO0FBQ0g7QUFDSjtBQUNKLEtBbEZROztBQW9GVDJRLG9CQUFnQiwwQkFBVTtBQUN0QixZQUFJekgsT0FBTyxLQUFLeEosSUFBTCxDQUFVd0osSUFBckI7O0FBRUEsYUFBSyxJQUFJdkMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJdUMsS0FBS3JKLE1BQXpCLEVBQWlDOEcsR0FBakMsRUFBc0M7QUFDbEMsZ0JBQUk0SyxNQUFNLENBQVY7O0FBRUEsZ0JBQUcsQ0FBQ3JJLEtBQUt2QyxDQUFMLEVBQVE2SyxPQUFaLEVBQW9CO0FBQ2hCLG9CQUFHLEtBQUtmLE1BQUwsQ0FBWTlKLENBQVosQ0FBSCxFQUFrQjtBQUNkLHdCQUFJOEssT0FBTyxLQUFLaEIsTUFBTCxDQUFZOUosQ0FBWixDQUFYOztBQUVBLHlCQUFLLElBQUlPLElBQUksQ0FBYixFQUFnQkEsSUFBSXVLLEtBQUs1UixNQUF6QixFQUFpQ3FILEdBQWpDLEVBQXNDO0FBQ2xDcUssK0JBQU9FLEtBQUt2SyxDQUFMLENBQVA7QUFDSDtBQUNELHdCQUFJd0ssUUFBUSxDQUFaO0FBQ0Esd0JBQUdELEtBQUs1UixNQUFMLEdBQWMsRUFBakIsRUFBb0I7QUFDaEI2UixnQ0FBUSxDQUFDLENBQVQ7QUFDSDtBQUNERCwyQkFBUUYsTUFBS0UsS0FBSzVSLE1BQVYsR0FBb0I0UixLQUFLNVIsTUFBTCxHQUFZLEVBQWpDLEdBQXVDNlIsS0FBOUM7QUFDQSx3QkFBR3hJLEtBQUt2QyxDQUFMLEVBQVFrSixLQUFYLEVBQWlCO0FBQ2IzRyw2QkFBS3ZDLENBQUwsRUFBUWtKLEtBQVIsQ0FBY3BSLEdBQWQsR0FBb0JnVCxLQUFLRSxPQUFMLENBQWEsQ0FBYixJQUFnQixDQUFwQztBQUNILHFCQUZELE1BRUs7QUFDRHpJLDZCQUFLdkMsQ0FBTCxFQUFRa0osS0FBUixHQUFnQjtBQUNacFIsaUNBQUtnVCxLQUFLRSxPQUFMLENBQWEsQ0FBYixJQUFnQjtBQURULHlCQUFoQjtBQUdIO0FBQ0osaUJBbEJELE1Ba0JLO0FBQ0Qsd0JBQUd6SSxLQUFLdkMsQ0FBTCxFQUFRa0osS0FBWCxFQUFpQjtBQUNiM0csNkJBQUt2QyxDQUFMLEVBQVFrSixLQUFSLENBQWNwUixHQUFkLEdBQW9CLENBQXBCO0FBQ0gscUJBRkQsTUFFSztBQUNEeUssNkJBQUt2QyxDQUFMLEVBQVFrSixLQUFSLEdBQWdCO0FBQ1pwUixpQ0FBSztBQURPLHlCQUFoQjtBQUdIO0FBQ0o7QUFDSjtBQUNKO0FBQ0osS0F4SFE7O0FBMEhUbVMscUJBQWlCLDJCQUFVO0FBQ3ZCLFlBQUlnQixPQUFPO0FBQ1A5UyxxQkFBUyxDQURGO0FBRVBDLG1CQUFPLENBRkE7QUFHUEYsb0JBQVE7QUFIRCxTQUFYOztBQU1BLGFBQUssSUFBSTRGLEVBQVQsSUFBZW1OLElBQWYsRUFBcUI7QUFDakIsZ0JBQUlMLE1BQU0sQ0FBVjtBQUNBLGlCQUFLLElBQUloSyxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS2lKLFNBQUwsQ0FBZS9MLEVBQWYsRUFBbUI1RSxNQUF2QyxFQUErQzBILEdBQS9DLEVBQW9EO0FBQ2hEZ0ssdUJBQU8sS0FBS2YsU0FBTCxDQUFlL0wsRUFBZixFQUFtQjhDLENBQW5CLENBQVA7QUFDSDtBQUNEcUssaUJBQUtuTixFQUFMLElBQVc4TSxNQUFJLEtBQUtmLFNBQUwsQ0FBZS9MLEVBQWYsRUFBbUI1RSxNQUFsQztBQUNBK1IsaUJBQUtuTixFQUFMLElBQVdtTixLQUFLbk4sRUFBTCxFQUFTa04sT0FBVCxDQUFpQixDQUFqQixJQUFvQixDQUEvQjtBQUNIOztBQUVELFlBQUcsS0FBS2pTLElBQUwsQ0FBVWtTLElBQWIsRUFBa0I7QUFDZCxnQkFBRyxLQUFLbFMsSUFBTCxDQUFVa1MsSUFBVixDQUFlL0IsS0FBbEIsRUFBd0I7QUFDcEIscUJBQUtuUSxJQUFMLENBQVVrUyxJQUFWLENBQWUvQixLQUFmLENBQXFCcFIsR0FBckIsR0FBMkJtVCxJQUEzQjtBQUNILGFBRkQsTUFFSztBQUNELHFCQUFLbFMsSUFBTCxDQUFVa1MsSUFBVixDQUFlL0IsS0FBZixHQUF1QjtBQUNuQnBSLHlCQUFLbVQ7QUFEYyxpQkFBdkI7QUFHSDtBQUNKLFNBUkQsTUFRSztBQUNELGlCQUFLbFMsSUFBTCxDQUFVa1MsSUFBVixHQUFpQjtBQUNiL0IsdUJBQU0sRUFBQ3BSLEtBQUltVCxJQUFMO0FBRE8sYUFBakI7QUFHSDtBQUNKLEtBdkpROztBQXlKVGYscUJBQWlCLDJCQUFVOztBQUV2QixhQUFLTCxTQUFMLENBQWUxUixPQUFmLENBQXVCdUwsSUFBdkIsQ0FBNEIsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsbUJBQVVELElBQUlDLENBQWQ7QUFBQSxTQUE1QjtBQUNBLGFBQUtpRyxTQUFMLENBQWUzUixNQUFmLENBQXNCd0wsSUFBdEIsQ0FBMkIsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsbUJBQVVELElBQUlDLENBQWQ7QUFBQSxTQUEzQjtBQUNBLGFBQUtpRyxTQUFMLENBQWV6UixLQUFmLENBQXFCc0wsSUFBckIsQ0FBMEIsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsbUJBQVVBLElBQUlELENBQWQ7QUFBQSxTQUExQjs7QUFFQSxZQUFJdUgsUUFBUXZJLE9BQU9DLElBQVAsQ0FBWSxLQUFLN0osSUFBTCxDQUFVMkosTUFBdEIsRUFBOEJ4SixNQUExQzs7QUFFQSxhQUFLLElBQUk0UCxHQUFULElBQWdCLEtBQUsvUCxJQUFMLENBQVUySixNQUExQixFQUFrQztBQUM5QixnQkFBSXRILFFBQVEsS0FBS3JDLElBQUwsQ0FBVTJKLE1BQVYsQ0FBaUJvRyxHQUFqQixDQUFaO0FBQ0EsZ0JBQUloUixNQUFNc0QsTUFBTThOLEtBQU4sQ0FBWXBSLEdBQXRCO0FBQ0EsZ0JBQUkwTyxPQUFPO0FBQ1B0Tyx3QkFBUWdULEtBREQ7QUFFUC9TLHlCQUFTK1MsS0FGRjtBQUdQOVMsdUJBQU84UztBQUhBLGFBQVg7O0FBTUEsaUJBQUssSUFBSWhFLEdBQVQsSUFBZ0JWLElBQWhCLEVBQXNCO0FBQ2xCLG9CQUFHVSxRQUFRLE9BQVgsRUFBbUI7QUFDZix3QkFBR3BQLElBQUlvUCxHQUFKLENBQUgsRUFBWTtBQUNSViw2QkFBS1UsR0FBTCxJQUFZLEtBQUsyQyxTQUFMLENBQWUzQyxHQUFmLEVBQW9CaUUsT0FBcEIsQ0FBNEJyVCxJQUFJb1AsR0FBSixDQUE1QixJQUFzQyxDQUFsRDtBQUNIO0FBQ0osaUJBSkQsTUFJSztBQUNELHdCQUFHcFAsSUFBSW9QLEdBQUosQ0FBSCxFQUFZO0FBQ1JWLDZCQUFLVSxHQUFMLElBQVksS0FBSzJDLFNBQUwsQ0FBZTNDLEdBQWYsRUFBb0JpRSxPQUFwQixDQUE0QnJULElBQUlvUCxHQUFKLEVBQVNySCxHQUFyQyxJQUEwQyxDQUF0RDtBQUNIO0FBQ0o7QUFFSjtBQUNELGdCQUFHekUsTUFBTW9MLElBQVQsRUFBYztBQUNWcEwsc0JBQU1vTCxJQUFOLENBQVcxTyxHQUFYLEdBQWlCME8sSUFBakI7QUFDSCxhQUZELE1BRUs7QUFDRHBMLHNCQUFNb0wsSUFBTixHQUFhLEVBQUMxTyxLQUFJME8sSUFBTCxFQUFiO0FBQ0g7QUFDSjtBQUNKLEtBNUxROztBQThMVDJELHFCQUFpQiwyQkFBVTs7QUFFdkIsWUFBSWlCLGFBQWEsRUFBakI7O0FBRUEsYUFBSyxJQUFJdEMsR0FBVCxJQUFnQixLQUFLL1AsSUFBTCxDQUFVMkosTUFBMUIsRUFBa0M7QUFDOUIsZ0JBQUl0SCxRQUFRLEtBQUtyQyxJQUFMLENBQVUySixNQUFWLENBQWlCb0csR0FBakIsQ0FBWjtBQUNBLGdCQUFJaFIsTUFBTXNELE1BQU1vTCxJQUFOLENBQVcxTyxHQUFyQjtBQUNBLGdCQUFJRyxTQUFTLGlCQUFPSCxHQUFQLENBQVdDLEtBQVgsQ0FBaUJFLE1BQTlCO0FBQ0EsZ0JBQUlGLFFBQVNELElBQUlJLE1BQUosR0FBV0QsT0FBT0MsTUFBbEIsR0FBMkJKLElBQUlLLE9BQUosR0FBWUYsT0FBT0UsT0FBOUMsR0FBd0RMLElBQUlNLEtBQUosR0FBVUgsT0FBT0csS0FBdEY7O0FBRUFnVCx1QkFBV2xKLElBQVgsQ0FBZ0IsRUFBQ25LLE9BQU1BLEtBQVAsRUFBYStRLEtBQUlBLEdBQWpCLEVBQWhCO0FBQ0g7QUFDRHNDLG1CQUFXMUgsSUFBWCxDQUFnQixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxtQkFBVUQsRUFBRTVMLEtBQUYsR0FBVTZMLEVBQUU3TCxLQUF0QjtBQUFBLFNBQWhCLEVBWnVCLENBWXVCOzs7QUFHOUMsWUFBSW1ULFFBQVFFLFdBQVdsUyxNQUF2Qjs7QUFFQSxZQUFJbVMsVUFBVSxpQkFBT3ZULEdBQVAsQ0FBV0MsS0FBWCxDQUFpQkMsVUFBL0I7O0FBRUEsYUFBSyxJQUFJZ0ksSUFBSSxDQUFiLEVBQWdCQSxJQUFJb0wsV0FBV2xTLE1BQS9CLEVBQXVDOEcsR0FBdkMsRUFBNEM7QUFDeEMsZ0JBQUk4SSxNQUFNc0MsV0FBV3BMLENBQVgsRUFBYzhJLEdBQXhCO0FBQ0EsZ0JBQUkvUSxRQUFRLENBQVo7QUFDQSxnQkFBSXlPLE9BQVF4RyxJQUFJa0wsS0FBaEIsQ0FId0MsQ0FHaEI7QUFDeEIsZ0JBQUlsVCxhQUFhLENBQWpCOztBQUVBLGdCQUFJc1QsV0FBVyxLQUFmOztBQUVBLGlCQUFLLElBQUkvSyxJQUFJLENBQWIsRUFBZ0JBLElBQUk4SyxRQUFRblMsTUFBNUIsRUFBb0NxSCxHQUFwQyxFQUF5QztBQUNyQyxvQkFBRyxDQUFDK0ssUUFBSixFQUFhO0FBQ1Qsd0JBQUlQLFFBQVEvUyxVQUFaO0FBQ0FBLGtDQUFjcVQsUUFBUTlLLENBQVIsQ0FBZDs7QUFFQSx3QkFBR2lHLE9BQUt4TyxVQUFSLEVBQW1CO0FBQUc7QUFDbEJ3TyxnQ0FBUXVFLEtBQVIsQ0FEZSxDQUNFO0FBQ2pCaFQsZ0NBQVMsSUFBRXdJLENBQUgsR0FBUU4sS0FBS0MsS0FBTCxDQUFZc0csT0FBSzZFLFFBQVE5SyxDQUFSLENBQU4sR0FBa0IsRUFBN0IsSUFBaUMsRUFBakQsQ0FGZSxDQUVzQztBQUNyRCtLLG1DQUFXLElBQVg7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsZ0JBQUlsUSxRQUFRLEtBQUtyQyxJQUFMLENBQVUySixNQUFWLENBQWlCb0csR0FBakIsQ0FBWjs7QUFFQSxnQkFBRzFOLE1BQU15SCxVQUFULEVBQW9CO0FBQ2hCLG9CQUFHekgsTUFBTXlILFVBQU4sQ0FBaUI5SyxLQUFwQixFQUEwQjtBQUN0QnFELDBCQUFNeUgsVUFBTixDQUFpQjlLLEtBQWpCLENBQXVCRCxHQUF2QixHQUE2QkMsS0FBN0I7QUFDSCxpQkFGRCxNQUVLO0FBQ0RxRCwwQkFBTXlILFVBQU4sQ0FBaUI5SyxLQUFqQixHQUF5QixFQUFDRCxLQUFJQyxLQUFMLEVBQXpCO0FBQ0g7QUFDSixhQU5ELE1BTUs7QUFDRHFELHNCQUFNeUgsVUFBTixHQUFtQjtBQUNmOUssMkJBQU0sRUFBQ0QsS0FBSUMsS0FBTCxFQURTO0FBRWZNLDBCQUFLLEVBQUNQLEtBQUksRUFBTDtBQUZVLGlCQUFuQjtBQUlIO0FBQ0o7QUFDSixLQXJQUTs7QUF1UFR5VCxTQUFLLGFBQVNDLElBQVQsRUFBZXBRLEtBQWYsRUFBcUI7QUFBSzs7QUFFM0IsWUFBSThQLFFBQVF2SSxPQUFPQyxJQUFQLENBQVksS0FBSzdKLElBQUwsQ0FBVTJKLE1BQXRCLEVBQThCeEosTUFBMUM7O0FBRUEsWUFBSXNOLE9BQU8sQ0FBWDtBQUNBLFlBQUdnRixTQUFTLFdBQVosRUFBd0I7QUFDcEJoRixtQkFBUXBMLE1BQU1vTCxJQUFOLENBQVcxTyxHQUFYLENBQWVJLE1BQWYsR0FBd0JnVCxLQUFoQztBQUNILFNBRkQsTUFFSztBQUNEMUUsbUJBQVFwTCxNQUFNb0wsSUFBTixDQUFXMU8sR0FBWCxDQUFlMFQsSUFBZixJQUF1Qk4sS0FBL0I7QUFDSDs7QUFFRCxZQUFJTyxTQUFTLGlCQUFPM1QsR0FBUCxDQUFXTyxJQUF4QjtBQUNBLFlBQUk4RixNQUFNLEVBQVY7QUFDQSxZQUFJdU4sUUFBUSxLQUFaOztBQUVBLGFBQUssSUFBSTFMLElBQUksQ0FBYixFQUFnQkEsSUFBSXlMLE9BQU9ELElBQVAsRUFBYWpULEdBQWIsQ0FBaUJXLE1BQXJDLEVBQTZDOEcsR0FBN0MsRUFBa0Q7QUFBSTtBQUNsRCxnQkFBRyxDQUFDMEwsS0FBSixFQUFVO0FBQ04sb0JBQUdsRixPQUFPaUYsT0FBT0QsSUFBUCxFQUFhalQsR0FBYixDQUFpQnlILENBQWpCLENBQVYsRUFBOEI7QUFDMUI3QiwyQkFBT3NOLE9BQU9ELElBQVAsRUFBYW5ULElBQWIsQ0FBa0IySCxDQUFsQixDQUFQO0FBQ0EwTCw0QkFBUSxJQUFSO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsWUFBRyxDQUFDQSxLQUFKLEVBQVU7QUFDTnZOLG1CQUFPc04sT0FBT0QsSUFBUCxFQUFhblQsSUFBYixDQUFrQm9ULE9BQU9ELElBQVAsRUFBYWpULEdBQWIsQ0FBaUJXLE1BQW5DLENBQVA7QUFDSDs7QUFFRCxlQUFPaUYsR0FBUDtBQUNILEtBblJROztBQXFSVGlNLG1CQUFlLHlCQUFVO0FBQ3JCLGFBQUssSUFBSXRCLEdBQVQsSUFBZ0IsS0FBSy9QLElBQUwsQ0FBVTJKLE1BQTFCLEVBQWtDO0FBQzlCLGdCQUFJdEgsUUFBUSxLQUFLckMsSUFBTCxDQUFVMkosTUFBVixDQUFpQm9HLEdBQWpCLENBQVo7QUFDQSxnQkFBSTNLLE1BQU0sRUFBVjtBQUNBLGdCQUFJckcsTUFBTXNELE1BQU04TixLQUFOLENBQVlwUixHQUF0Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQUdBLElBQUlJLE1BQVAsRUFBYztBQUNWLG9CQUFHSixJQUFJSSxNQUFKLENBQVcySCxHQUFYLEdBQWlCL0gsSUFBSUssT0FBSixDQUFZMEgsR0FBWixHQUFrQixFQUF0QyxFQUF5QztBQUFFO0FBQ3ZDLHdCQUFJQSxNQUFNOEwsU0FBUzdULElBQUlJLE1BQUosQ0FBVzJILEdBQXBCLENBQVY7QUFDQTFCLDJHQUE4QjBCLEdBQTlCO0FBQ0ExQiwyQkFBTyxLQUFLb04sR0FBTCxDQUFTLFdBQVQsRUFBc0JuUSxLQUF0QixDQUFQO0FBRUgsaUJBTEQsTUFLSztBQUFFO0FBQ0gsd0JBQUl5RSxPQUFNOEwsU0FBUzdULElBQUlLLE9BQUosQ0FBWTBILEdBQXJCLENBQVY7QUFDQSx3QkFBSStMLFFBQVFELFNBQVM3VCxJQUFJSSxNQUFKLENBQVcySCxHQUFwQixDQUFaO0FBQ0ExQix1RkFBeUIwQixJQUF6QixtSUFBZ0UrTCxLQUFoRTtBQUNBek4sMkJBQU8sS0FBS29OLEdBQUwsQ0FBUyxTQUFULEVBQW9CblEsS0FBcEIsQ0FBUDtBQUNIO0FBQ0osYUFaRCxNQVlLO0FBQ0Qsb0JBQUl5RSxRQUFNOEwsU0FBUzdULElBQUlLLE9BQUosQ0FBWTBILEdBQXJCLENBQVY7QUFDQTFCLG1GQUF5QjBCLEtBQXpCO0FBQ0g7O0FBR0QsZ0JBQUd6RSxNQUFNeUgsVUFBTixDQUFpQnhLLElBQXBCLEVBQXlCO0FBQ3JCK0Msc0JBQU15SCxVQUFOLENBQWlCeEssSUFBakIsQ0FBc0JQLEdBQXRCLEdBQTRCcUcsR0FBNUI7QUFDSCxhQUZELE1BRUs7QUFDRC9DLHNCQUFNeUgsVUFBTixDQUFpQnhLLElBQWpCLEdBQXdCLEVBQUNQLEtBQUlxRyxHQUFMLEVBQXhCO0FBQ0g7QUFDSjtBQUNKO0FBdlRRLENBQWI7O2tCQTBUZXlMLE07Ozs7Ozs7Ozs7Ozs7QUM1VGY7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSWlDLFVBQVU7QUFDVjlTLFVBQUssRUFESzs7QUFHVjhRLGVBQVU7QUFDTjFSLGlCQUFRLEVBREY7QUFFTjJULGVBQU07QUFGQSxLQUhBO0FBT1ZoQyxZQUFPLEVBUEc7O0FBU1ZyUixVQUFNLGNBQVNNLElBQVQsRUFBZTBKLEdBQWYsRUFBbUI7QUFDckIsYUFBSzFKLElBQUwsR0FBWUEsSUFBWjtBQUNBLFlBQUcsS0FBS2dULGFBQUwsQ0FBbUJ0SixHQUFuQixDQUFILEVBQTJCO0FBQUs7QUFDNUIsaUJBQUt1SixjQUFMLEdBRHVCLENBQ0M7QUFDeEIsaUJBQUtDLGFBQUwsR0FGdUIsQ0FFRDtBQUN0QixpQkFBS0MsZ0JBQUwsR0FIdUIsQ0FHRTtBQUN6QixpQkFBS0MsY0FBTDs7QUFFQW5TLG9CQUFRQyxHQUFSLENBQVksS0FBS2xCLElBQWpCO0FBQ0g7QUFDSixLQW5CUzs7QUFxQlZvVCxvQkFBZ0IsMEJBQVU7O0FBRXRCLGFBQUt0QyxTQUFMLENBQWUxUixPQUFmLENBQXVCdUwsSUFBdkIsQ0FBNEIsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsbUJBQVVELElBQUlDLENBQWQ7QUFBQSxTQUE1QjtBQUNBLGFBQUtpRyxTQUFMLENBQWVpQyxLQUFmLENBQXFCcEksSUFBckIsQ0FBMEIsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsbUJBQVVBLElBQUlELENBQWQ7QUFBQSxTQUExQjs7QUFFQSxZQUFJdUgsUUFBUXZJLE9BQU9DLElBQVAsQ0FBWSxLQUFLN0osSUFBTCxDQUFVMkosTUFBdEIsRUFBOEJ4SixNQUExQzs7QUFFQSxhQUFLLElBQUk0UCxHQUFULElBQWdCLEtBQUsvUCxJQUFMLENBQVUySixNQUExQixFQUFrQztBQUM5QixnQkFBSXRILFFBQVEsS0FBS3JDLElBQUwsQ0FBVTJKLE1BQVYsQ0FBaUJvRyxHQUFqQixDQUFaOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUg7QUFDSixLQTFEUzs7QUE0RFZvRCxzQkFBa0IsNEJBQVU7QUFDeEIsWUFBSWpCLE9BQU87QUFDUDlTLHFCQUFTLENBREY7QUFFUDJULG1CQUFNO0FBRkMsU0FBWDs7QUFLQSxhQUFLLElBQUloTyxFQUFULElBQWVtTixJQUFmLEVBQXFCO0FBQ2pCLGdCQUFJTCxNQUFNLENBQVY7QUFDQSxpQkFBSyxJQUFJaEssSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtpSixTQUFMLENBQWUvTCxFQUFmLEVBQW1CNUUsTUFBdkMsRUFBK0MwSCxHQUEvQyxFQUFvRDtBQUNoRGdLLHVCQUFPLEtBQUtmLFNBQUwsQ0FBZS9MLEVBQWYsRUFBbUI4QyxDQUFuQixDQUFQO0FBQ0g7QUFDRHFLLGlCQUFLbk4sRUFBTCxJQUFXOE0sTUFBSSxLQUFLZixTQUFMLENBQWUvTCxFQUFmLEVBQW1CNUUsTUFBbEM7QUFDQStSLGlCQUFLbk4sRUFBTCxJQUFXbU4sS0FBS25OLEVBQUwsRUFBU2tOLE9BQVQsQ0FBaUIsQ0FBakIsSUFBb0IsQ0FBL0I7QUFDSDs7QUFFRCxZQUFHLEtBQUtqUyxJQUFMLENBQVVrUyxJQUFiLEVBQWtCO0FBQ2QsZ0JBQUcsS0FBS2xTLElBQUwsQ0FBVWtTLElBQVYsQ0FBZS9CLEtBQWxCLEVBQXdCO0FBQ3BCLHFCQUFLblEsSUFBTCxDQUFVa1MsSUFBVixDQUFlL0IsS0FBZixDQUFxQjFSLElBQXJCLEdBQTRCeVQsSUFBNUI7QUFDSCxhQUZELE1BRUs7QUFDRCxxQkFBS2xTLElBQUwsQ0FBVWtTLElBQVYsQ0FBZS9CLEtBQWYsR0FBdUI7QUFDbkIxUiwwQkFBTXlUO0FBRGEsaUJBQXZCO0FBR0g7QUFDSixTQVJELE1BUUs7QUFDRCxpQkFBS2xTLElBQUwsQ0FBVWtTLElBQVYsR0FBaUI7QUFDYi9CLHVCQUFNLEVBQUMxUixNQUFLeVQsSUFBTjtBQURPLGFBQWpCO0FBR0g7QUFDSixLQXhGUzs7QUEwRlZnQixtQkFBZSx5QkFBVTtBQUNyQixZQUFJMUosT0FBTyxLQUFLeEosSUFBTCxDQUFVd0osSUFBckI7O0FBRUEsYUFBSyxJQUFJdkMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJdUMsS0FBS3JKLE1BQXpCLEVBQWlDOEcsR0FBakMsRUFBc0M7QUFDbEMsZ0JBQUk0SyxNQUFNLENBQVY7O0FBRUEsZ0JBQUcsQ0FBQ3JJLEtBQUt2QyxDQUFMLEVBQVE2SyxPQUFaLEVBQW9CO0FBQ2hCLG9CQUFHLEtBQUtmLE1BQUwsQ0FBWTlKLENBQVosQ0FBSCxFQUFrQjtBQUNkLHdCQUFJb00sUUFBUSxLQUFLdEMsTUFBTCxDQUFZOUosQ0FBWixDQUFaOztBQUVBLHlCQUFLLElBQUlPLElBQUksQ0FBYixFQUFnQkEsSUFBSTZMLE1BQU1sVCxNQUExQixFQUFrQ3FILEdBQWxDLEVBQXVDO0FBQ25DcUssK0JBQU93QixNQUFNN0wsQ0FBTixDQUFQO0FBQ0g7QUFDRCx3QkFBSXdLLFFBQVEsQ0FBWjtBQUNBLHdCQUFHcUIsTUFBTWxULE1BQU4sR0FBZSxFQUFsQixFQUFxQjtBQUNqQjZSLGdDQUFRLENBQUMsQ0FBVDtBQUNIO0FBQ0RxQiw0QkFBU3hCLE1BQUt3QixNQUFNbFQsTUFBWCxHQUFxQmtULE1BQU1sVCxNQUFOLEdBQWEsRUFBbkMsR0FBeUM2UixLQUFqRDtBQUNBLHdCQUFHeEksS0FBS3ZDLENBQUwsRUFBUWtKLEtBQVgsRUFBaUI7QUFDYjNHLDZCQUFLdkMsQ0FBTCxFQUFRa0osS0FBUixDQUFjMVIsSUFBZCxHQUFxQjRVLE1BQU1wQixPQUFOLENBQWMsQ0FBZCxJQUFpQixDQUF0QztBQUNILHFCQUZELE1BRUs7QUFDRHpJLDZCQUFLdkMsQ0FBTCxFQUFRa0osS0FBUixHQUFnQjtBQUNaMVIsa0NBQU00VSxNQUFNcEIsT0FBTixDQUFjLENBQWQsSUFBaUI7QUFEWCx5QkFBaEI7QUFHSDtBQUNKLGlCQWxCRCxNQWtCSztBQUNELHdCQUFHekksS0FBS3ZDLENBQUwsRUFBUWtKLEtBQVgsRUFBaUI7QUFDYjNHLDZCQUFLdkMsQ0FBTCxFQUFRa0osS0FBUixDQUFjMVIsSUFBZCxHQUFxQixDQUFyQjtBQUNILHFCQUZELE1BRUs7QUFDRCtLLDZCQUFLdkMsQ0FBTCxFQUFRa0osS0FBUixHQUFnQjtBQUNaMVIsa0NBQU07QUFETSx5QkFBaEI7QUFHSDtBQUNKO0FBQ0o7QUFDSjtBQUNKLEtBOUhTOztBQWdJVndVLG9CQUFnQiwwQkFBVTtBQUN0QixhQUFLLElBQUlsRCxHQUFULElBQWdCLEtBQUsvUCxJQUFMLENBQVUySixNQUExQixFQUFrQztBQUM5QixnQkFBSXRILFFBQVEsS0FBS3JDLElBQUwsQ0FBVTJKLE1BQVYsQ0FBaUJvRyxHQUFqQixDQUFaO0FBQ0EsZ0JBQUl1RCxhQUFhLEtBQWpCOztBQUVBLGlCQUFLLElBQUliLElBQVQsSUFBaUIsS0FBS3pTLElBQUwsQ0FBVW1RLEtBQVYsQ0FBZ0IxUixJQUFqQyxFQUF1QztBQUNuQyxvQkFBSThVLFNBQVMsS0FBS3ZULElBQUwsQ0FBVW1RLEtBQVYsQ0FBZ0IxUixJQUFoQixDQUFxQmdVLElBQXJCLENBQWI7QUFDQSxvQkFBSWpULE1BQU0saUJBQU9mLElBQVAsQ0FBWUMsT0FBdEI7O0FBRUEscUJBQUssSUFBSXVJLElBQUksQ0FBYixFQUFnQkEsSUFBSXNNLE9BQU9wVCxNQUEzQixFQUFtQzhHLEdBQW5DLEVBQXdDO0FBQ3BDLHdCQUFJeEksT0FBTzhVLE9BQU90TSxDQUFQLENBQVg7QUFDQSx3QkFBSUgsTUFBTXNILGFBQWEvTCxNQUFNbEIsSUFBbkIsRUFBeUIxQyxLQUFLMEMsSUFBOUIsQ0FBVjs7QUFFQSx3QkFBRzJGLE1BQUl0SCxJQUFJaVQsSUFBSixDQUFQLEVBQWlCO0FBQ2JhLHFDQUFhLElBQWI7QUFDQTdVLDZCQUFLcUksR0FBTCxHQUFXQSxHQUFYOztBQUVBLDRCQUFHekUsTUFBTThOLEtBQVQsRUFBZTtBQUNYLGdDQUFHOU4sTUFBTThOLEtBQU4sQ0FBWTFSLElBQWYsRUFBb0I7QUFDaEIsb0NBQUc0RCxNQUFNOE4sS0FBTixDQUFZMVIsSUFBWixDQUFpQmdVLElBQWpCLENBQUgsRUFBMEI7QUFDdEJwUSwwQ0FBTThOLEtBQU4sQ0FBWTFSLElBQVosQ0FBaUJnVSxJQUFqQixFQUF1QnRKLElBQXZCLENBQTRCMUssSUFBNUI7QUFDSCxpQ0FGRCxNQUVLO0FBQ0Q0RCwwQ0FBTThOLEtBQU4sQ0FBWTFSLElBQVosQ0FBaUJnVSxJQUFqQixJQUF5QixDQUFDaFUsSUFBRCxDQUF6QjtBQUNIO0FBQ0osNkJBTkQsTUFNSztBQUNENEQsc0NBQU04TixLQUFOLENBQVkxUixJQUFaLEdBQW1CLEVBQW5CO0FBQ0E0RCxzQ0FBTThOLEtBQU4sQ0FBWTFSLElBQVosQ0FBaUJnVSxJQUFqQixJQUF5QixDQUFDaFUsSUFBRCxDQUF6QjtBQUNIO0FBQ0oseUJBWEQsTUFXSztBQUNENEQsa0NBQU04TixLQUFOLEdBQWM7QUFDVjFSLHNDQUFLO0FBREssNkJBQWQ7QUFHQTRELGtDQUFNOE4sS0FBTixDQUFZMVIsSUFBWixDQUFpQmdVLElBQWpCLElBQXlCLENBQUNoVSxJQUFELENBQXpCO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBRUQsZ0JBQUcsQ0FBQzZVLFVBQUosRUFBZTtBQUNYalIsc0JBQU04TixLQUFOLENBQVkxUixJQUFaLEdBQW1CLEtBQW5CO0FBQ0gsYUFGRCxNQUVLOztBQUVELHFCQUFLLElBQUlnVSxJQUFULElBQWlCcFEsTUFBTThOLEtBQU4sQ0FBWTFSLElBQTdCLEVBQW1DO0FBQy9CLHdCQUFHZ1UsU0FBUyxPQUFaLEVBQW9CO0FBQ2hCcFEsOEJBQU04TixLQUFOLENBQVkxUixJQUFaLENBQWlCZ1UsSUFBakIsRUFBdUI5SCxJQUF2QixDQUE0QixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxtQ0FBVUQsRUFBRTlELEdBQUYsR0FBUStELEVBQUUvRCxHQUFwQjtBQUFBLHlCQUE1QjtBQUNBLDRCQUFJME0sVUFBVSxFQUFkOztBQUVBLDZCQUFLLElBQUl2TSxLQUFJLENBQWIsRUFBZ0JBLEtBQUk1RSxNQUFNOE4sS0FBTixDQUFZMVIsSUFBWixDQUFpQmdVLElBQWpCLEVBQXVCdFMsTUFBM0MsRUFBbUQ4RyxJQUFuRCxFQUF3RDtBQUFHO0FBQ3ZELGdDQUFJd00sV0FBV3BSLE1BQU04TixLQUFOLENBQVkxUixJQUFaLENBQWlCZ1UsSUFBakIsRUFBdUJ4TCxFQUF2QixDQUFmOztBQUVBLGdDQUFJeU0sT0FBTztBQUNQOVMseUNBQVM2UyxTQUFTN1MsT0FEWDtBQUVQTyxzQ0FBSztBQUNEQyx5Q0FBS3FTLFNBQVN0UyxJQUFULENBQWNDLEdBRGxCO0FBRURHLHlDQUFLa1MsU0FBU3RTLElBQVQsQ0FBY0k7QUFGbEIsaUNBRkU7QUFNUHVGLHFDQUFJMk0sU0FBUzNNLEdBTk47QUFPUHRFLHNDQUFLaVIsU0FBU2pSO0FBUFAsNkJBQVg7QUFTQWdSLG9DQUFRckssSUFBUixDQUFhdUssSUFBYjtBQUNIOztBQUVELDRCQUFJWCxRQUFRUyxRQUFRclQsTUFBcEI7QUFDQSw2QkFBSzJRLFNBQUwsQ0FBZTFSLE9BQWYsQ0FBdUIrSixJQUF2QixDQUE0QnFLLFFBQVEsQ0FBUixFQUFXMU0sR0FBdkM7QUFDQSw2QkFBS2dLLFNBQUwsQ0FBZWlDLEtBQWYsQ0FBcUI1SixJQUFyQixDQUEwQjRKLEtBQTFCOztBQUVBLDRCQUFHLEtBQUtoQyxNQUFMLENBQVkxTyxNQUFNbUgsSUFBbEIsQ0FBSCxFQUEyQjtBQUFDO0FBQ3hCLGlDQUFLdUgsTUFBTCxDQUFZMU8sTUFBTW1ILElBQWxCLEVBQXdCTCxJQUF4QixDQUE2QjRKLEtBQTdCO0FBQ0gseUJBRkQsTUFFSztBQUNELGlDQUFLaEMsTUFBTCxDQUFZMU8sTUFBTW1ILElBQWxCLElBQTBCLENBQUN1SixLQUFELENBQTFCO0FBQ0g7O0FBR0QsNEJBQUdTLFFBQVFyVCxNQUFSLEdBQWUsQ0FBbEIsRUFBb0I7QUFDaEJxVCxvQ0FBUXJULE1BQVIsR0FBaUIsQ0FBakI7QUFDSDs7QUFFRCw2QkFBS0gsSUFBTCxDQUFVMkosTUFBVixDQUFpQm9HLEdBQWpCLEVBQXNCSSxLQUF0QixDQUE0QjFSLElBQTVCLENBQWlDZ1UsSUFBakMsSUFBeUM7QUFDckNNLG1DQUFPMVEsTUFBTThOLEtBQU4sQ0FBWTFSLElBQVosQ0FBaUJnVSxJQUFqQixFQUF1QnRTLE1BRE87QUFFckN3VCxtQ0FBT0gsT0FGOEI7QUFHckNwVSxxQ0FBU29VLFFBQVEsQ0FBUjtBQUg0Qix5QkFBekM7QUFNSDtBQUNKO0FBQ0o7QUFDSjtBQUNKLEtBdk5TOztBQXlOVlIsbUJBQWUsdUJBQVN0SixHQUFULEVBQWE7QUFDeEIsWUFBSTZKLFNBQVMsS0FBS3ZULElBQUwsQ0FBVW1RLEtBQVYsQ0FBZ0IxUixJQUFoQixDQUFxQkcsT0FBbEM7QUFDQSxZQUFJZ1YsU0FBUyxFQUFiO0FBQ0EsWUFBSUMsY0FBYyxLQUFsQjs7QUFFQSxhQUFLLElBQUk1TSxJQUFJLENBQWIsRUFBZ0JBLElBQUlzTSxPQUFPcFQsTUFBM0IsRUFBbUM4RyxHQUFuQyxFQUF3QztBQUNwQyxnQkFBSXJJLFVBQVUyVSxPQUFPdE0sQ0FBUCxDQUFkO0FBQ0EsZ0JBQUcsQ0FBQ3JJLFFBQVF1QyxJQUFaLEVBQWlCO0FBQ2J5Uyx1QkFBT3pLLElBQVAsQ0FBWSxFQUFDdkksU0FBUWhDLFFBQVFnQyxPQUFqQixFQUEwQkMsS0FBSW9HLENBQTlCLEVBQVo7QUFDQTRNLDhCQUFjLElBQWQ7QUFDSCxhQUhELE1BR0s7QUFDRCxvQkFBRyxDQUFDalYsUUFBUXVDLElBQVIsQ0FBYUMsR0FBakIsRUFBcUI7QUFDakJ3UywyQkFBT3pLLElBQVAsQ0FBWSxFQUFDdkksU0FBUWhDLFFBQVFnQyxPQUFqQixFQUEwQkMsS0FBSW9HLENBQTlCLEVBQVo7QUFDQTRNLGtDQUFjLElBQWQ7QUFDSDtBQUNKO0FBQ0o7QUFDRCxZQUFHQSxXQUFILEVBQWU7QUFDWCxnQkFBSWpVLE1BQU0sWUFBVThKLEdBQVYsR0FBYyxxQkFBeEI7QUFDQSw4QkFBUWhLLElBQVIsQ0FBYWtVLE1BQWIsRUFBcUJoVSxHQUFyQjtBQUNBLG1CQUFPLEtBQVA7QUFDSCxTQUpELE1BSUs7QUFDRCxtQkFBTyxJQUFQO0FBQ0g7QUFDSjtBQWpQUyxDQUFkOztrQkFvUGVrVCxPOzs7Ozs7Ozs7Ozs7QUN2UGYsSUFBSWdCLFVBQVU7QUFDVjdSLFNBQUksRUFETTtBQUVWdU0sWUFBTyxFQUZHOztBQUlWbEYsYUFBUyxpQkFBVXlCLFFBQVYsRUFBb0JyQixHQUFwQixFQUF5QjtBQUFBOztBQUU5QjdKLGlCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixZQUFVOEosR0FBbEMsRUFBdUMzSixJQUF2QyxDQUE0QyxPQUE1QyxFQUFxRCxnQkFBTztBQUN4RCxnQkFBSUMsT0FBT0MsS0FBS0MsR0FBTCxFQUFYOztBQUVBLGlCQUFLLElBQUk2UCxHQUFULElBQWdCLE1BQUt2QixNQUFyQixFQUE2QjtBQUN6QixzQkFBS0EsTUFBTCxDQUFZdUIsR0FBWixFQUFpQlosTUFBakIsQ0FBd0IsSUFBeEI7QUFDSDtBQUNELGtCQUFLWCxNQUFMLEdBQWMsRUFBZDs7QUFFQSxnQkFBSXBKLE1BQU0sRUFBVjs7QUFFQUEsbUJBQU8sc0JBQVA7QUFDQUEsbUJBQU8sU0FBUzJGLFFBQVQsR0FBb0IsZ0JBQTNCO0FBQ0EzRixtQkFBTyxRQUFQO0FBQ0FBLG1CQUFPLDhCQUFQO0FBQ0FBLG1CQUFPLGdDQUFQO0FBQ0FBLG1CQUFPLHdCQUFQO0FBQ0FBLG1CQUFPLGdDQUFQO0FBQ0FBLG1CQUFPLGFBQWFzRSxHQUFiLEdBQW1CLHFDQUExQjtBQUNBdEUsbUJBQU8sUUFBUDtBQUNBQSxtQkFBTyxRQUFQLENBbkJ3RCxDQW1CdkM7O0FBRWpCM0MsY0FBRSxjQUFGLEVBQWtCQyxJQUFsQixDQUF1QjBDLEdBQXZCOztBQUlBLGtCQUFLbkQsR0FBTCxHQUFXLElBQUl4QixPQUFPQyxJQUFQLENBQVkrTixHQUFoQixDQUFvQnJMLFNBQVNzTCxjQUFULENBQXdCLGVBQXhCLENBQXBCLEVBQThEO0FBQ3JFQyx3QkFBUTtBQUNKdk4seUJBQUssWUFERDtBQUVKRyx5QkFBSyxDQUFDO0FBRkYsaUJBRDZEO0FBS3JFcU4sc0JBQU07QUFMK0QsYUFBOUQsQ0FBWDs7QUFRQTNOLG9CQUFRQyxHQUFSLENBQVlsQixJQUFaOztBQUVBLGdCQUFJd0osT0FBTyxFQUFYOztBQUVBLGlCQUFLLElBQUl1RyxHQUFULElBQWdCL1AsS0FBSzJKLE1BQXJCLEVBQTZCO0FBQ3pCLG9CQUFJdEgsUUFBUXJDLEtBQUsySixNQUFMLENBQVlvRyxHQUFaLENBQVo7QUFDQSxvQkFBSWdFLFNBQVMsSUFBYjs7QUFFQSxxQkFBSyxJQUFJOU0sSUFBSSxDQUFiLEVBQWdCQSxJQUFJakgsS0FBS3dKLElBQUwsQ0FBVXJKLE1BQTlCLEVBQXNDOEcsR0FBdEMsRUFBMkM7QUFDdkMsd0JBQUcsQ0FBQ2pILEtBQUt3SixJQUFMLENBQVV2QyxDQUFWLEVBQWE2SyxPQUFqQixFQUF5QjtBQUNyQiw0QkFBSWtDLFdBQVdoVSxLQUFLd0osSUFBTCxDQUFVdkMsQ0FBVixFQUFhOUYsSUFBNUI7O0FBRUEsNEJBQUk4UyxTQUFTNVIsTUFBTWxCLElBQWYsRUFBcUI2UyxRQUFyQixDQUFKLEVBQW9DO0FBQ2hDM1Isa0NBQU1tSCxJQUFOLEdBQWF2QyxDQUFiO0FBQ0E4TSxxQ0FBUyxLQUFUO0FBQ0EsZ0NBQUd2SyxLQUFLdkMsQ0FBTCxDQUFILEVBQVc7QUFDUHVDLHFDQUFLdkMsQ0FBTDtBQUNILDZCQUZELE1BRUs7QUFDRHVDLHFDQUFLdkMsQ0FBTCxJQUFVLENBQVY7QUFDSDtBQUNKO0FBQ0o7QUFDSjs7QUFFRCxvQkFBSThNLE1BQUosRUFBWTtBQUNSLDBCQUFLdkYsTUFBTCxDQUFZdUIsR0FBWixJQUFtQixJQUFJdFAsT0FBT0MsSUFBUCxDQUFZME8sTUFBaEIsQ0FBdUI7QUFDdENDLGtDQUFVaE4sTUFBTWxCLElBRHNCO0FBRXRDYyw2QkFBSyxNQUFLQSxHQUY0QjtBQUd0Q2lTLCtCQUFPLEtBQUtuRTtBQUgwQixxQkFBdkIsQ0FBbkI7QUFLSDtBQUNKO0FBQ0Q5TyxvQkFBUUMsR0FBUixDQUFZc0ksSUFBWjs7QUFFQTNKLHFCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixZQUFZOEosR0FBWixHQUFrQixTQUExQyxFQUFxREssTUFBckQsQ0FBNEQvSixLQUFLMkosTUFBakU7QUFDSCxTQXBFRDtBQXFFSDtBQTNFUyxDQUFkOztrQkE4RWVtSyxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTRlNmY2MTY3MTg5MzQ4NDc2NzMiLCJ2YXIgQ29uZmlnID0ge1xyXG4gICAgZm9vZDp7XHJcbiAgICAgICAgbmVhclN0ZDp7Ly/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDrtoDqt7zsl5Ag7J6I64qU6rG466GcIOyduOygle2VoOqyg+ydtOuDkFxyXG4gICAgICAgICAgICBsYXJnZTo1MDAsXHJcbiAgICAgICAgICAgIGdyb2Nlcnk6MjUwLFxyXG4gICAgICAgICAgICBjdnM6MjUwLCBcclxuICAgICAgICAgICAgYmFrZXJ5OjI1MFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXRtOntcclxuICAgICAgICBzY29yZTp7XHJcbiAgICAgICAgICAgIHBlcmNlbnRpbGUgOiBbMC4xNSwgMC4yLCAwLjI1LCAwLjIsIDAuMSwgMC4xXSwgLy85LCA4LCA3Li4u7KCQ64yA7J2YIOuwseu2hOychCDruYTsnKggLSDtlanqs4QgMSDrkJjslrTslbwg7ZWoISEhXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3ZWlnaHQ6eyAvL0FUTSDsoJDsiJjrpbwg7IKw7Lac7ZWgIOuVjCDqsIDspJHsuZgo7Iir7J6QIOuLqOychCDrrLTqtIApXHJcbiAgICAgICAgICAgICAgICBiYW5rMjQ6NCxcclxuICAgICAgICAgICAgICAgIG5lYXJlc3Q6My43NSxcclxuICAgICAgICAgICAgICAgIGluMTMwOiAwLjVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICBcclxuICAgICAgICB3b3JkOntcclxuICAgICAgICAgICAgaW50ZWdyYXRlOnsgLy/qsIDsnqUg6rCA6rmM7Jq0IEFUTeydtCAyNOyLnOqwhCDsmKTtlIjtlZjripQg7J2A7ZaJIOyGjOycoCjsnbTqsbDrgpggMTBtIOuvuOunjCDqsbDrpqzssKjsnbQpKVxyXG4gICAgICAgICAgICAgICAgc3RkOlswLjE1LCAwLjM1LCAwLjZdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzroZwg66ek7JqwIOqwgOq5jOydtOyXkCDsnojsnYwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcIOqwgOq5jOyatCDtjrguIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBiYW5rMjQ6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjM1LDAuN10sIFxyXG4gICAgICAgICAgICAgICAgd29yZDpbXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOqzoCwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcLCDqsIDquYzsmrQg7Y64LiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqwg65ao7Ja07KeEIOyjvOychOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5lYXJlc3Q6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjEsMC4yNSwwLjRdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIiwgLy8xODA4MTAgLSDtj4nqsIDrpbwg7J2864uoIOyViCDtlZjquLDroZwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9jb25maWcuanMiLCJ2YXIgR2VvQ29kZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGFyciwgcmVmKXtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgaWYoIWRhdGEpeyAgLy/ri6Trpbgg7KeA7Jik7L2U65SpIOyekeyXheykkeydtOudvOuptCDsoIjrjIAg642u7Ja07I2o7ISc64qUIOyViCDrkKg7XHJcbiAgICAgICAgICAgICAgICBpZihhcnIubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidGVtcC9nZW9jb2RlXCIpLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjpyZWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycjphcnJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY29kZShhcnIsIHJlZik7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyngOyYpOy9lOuUqSDsnpHsl4XsnYQg7Iuc7J6R7ZWp64uI64ukLiDsl6zrn6zrsogg7IOI66Gc6rOg7LmoIOuQoCDsiJgg7J6I7Iq164uI64ukLlwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY29kZTogZnVuY3Rpb24oYXJyLCByZWYpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgbGV0IGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XHJcbiAgICAgICAgdmFyIGFkZHJlc3MgPSBhcnJbMF0uYWRkcmVzcztcclxuICAgICAgICB2YXIgYWlkID0gYXJyWzBdLmFpZDtcclxuXHJcbiAgICAgICAgZ2VvY29kZXIuZ2VvY29kZSggeydhZGRyZXNzJzogYWRkcmVzc30sIGZ1bmN0aW9uKHJlc3VsdHMsIHN0YXR1cykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0dXMpXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gJ09LJykge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb29yID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDpyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzpyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYocmVmK1wiL1wiK2FpZCtcIi9jb29yXCIpLnNldChjb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihhcnIubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvZGUoYXJyLCByZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidGVtcC9nZW9jb2RlXCIpLnNldChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLsp4DsmKTsvZTrlKkg7J6R7JeF7J20IOyZhOujjOuQmOyXiOyKteuLiOuLpC5cIilcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoc3RhdHVzID09PSAnWkVST19SRVNVTFRTJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuyngOyYpOy9lOuUqSDqsrDqs7zqsIAg7JeG64qUIO2VreuqqeydtCDsnojsirXri4jri6QuIOy9mOyGlOywveydhCDssLjqs6DtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6cmVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnI6YXJyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2VvQ29kZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2dlb0NvZGUuanMiLCJpbXBvcnQgQXR0ZW5kIGZyb20gXCIuL3BhZ2VzL2F0dGVuZC5qc1wiO1xyXG5pbXBvcnQgQ2l0eSBmcm9tIFwiLi9wYWdlcy9jaXR5LmpzXCI7XHJcbmltcG9ydCBTcG90IGZyb20gXCIuL3BhZ2VzL3Nwb3QuanNcIjtcclxuaW1wb3J0IEFjY291bnQgZnJvbSBcIi4vcGFnZXMvYWNjb3VudC5qc1wiO1xyXG5pbXBvcnQgU3Vid2F5IGZyb20gXCIuL3BhZ2VzL3N1YndheS5qc1wiO1xyXG5pbXBvcnQgSG90ZWwgZnJvbSBcIi4vcGFnZXMvaG90ZWwuanNcIjtcclxuaW1wb3J0IEdlb0NvZGUgZnJvbSBcIi4vbW9kdWxlcy9nZW9Db2RlLmpzXCI7XHJcblxyXG52YXIgaW5pdGlhbGl6ZWQgPSB7fTtcclxuXHJcbnZhciB1X2kgPSB7fTtcclxuXHJcbnZhciBOYXZfZnVuY3Rpb24gPSB7XHJcbiAgICBhdHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBBdHRlbmQuaW5pdCh1X2kpO1xyXG4gICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgdG9kbzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBjaXR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgQ2l0eS5pbml0KHVfaSk7XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQuY2l0eSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgbWFwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgU3Vid2F5LmluaXQoKTtcclxuICAgIH0sXHJcbiAgICBhY2NvdW50OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIHNwb3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBTcG90LmluaXQodV9pKTtcclxuICAgICAgICBpbml0aWFsaXplZC5zcG90ID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBjYWxjOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGhvdGVsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgSG90ZWwuaW5pdCgpO1xyXG4gICAgfSxcclxuICAgIGxpbms6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBsb2dpbihuYW1lKXtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5odG1sKG5hbWVbMV0rXCLtlZghXCIpO1xyXG4gICAgJChcIi5oZWxsb1dvcmxkXCIpLmF0dHIoXCJ0aXRsZVwiLG5hbWUrXCLri5gg7JWI64WV7ZWY7IS47JqUIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGNvbmZpcm0obmFtZStcIuuLmCDroZzqt7jslYTsm4Mg7ZWY7Iuc6rKg7Iq164uI6rmMP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgLy8gQW4gZXJyb3IgaGFwcGVuZWQuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQoZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgICBsZXQgbWFpbCA9IHVzZXIuZW1haWwuc3BsaXQoJ0AnKVswXTtcclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidGVtcC9nZW9jb2RlXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICBHZW9Db2RlLmNvZGUoZGF0YS5hcnIsIGRhdGEucmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuyngOyYpOy9lOuUqSDsnpHsl4XsnYQg7J207Ja07IScIOynhO2Wie2VqeuLiOuLpC5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL+yVhOuemCDrgrTsmqnsnYQg67CU6r6466m0IGlmICghaXNVc2VyKSDrtoDrtoTsl5Drj4Qg67CY65Oc7IucIOuwmOyYge2VtOykhOqyg1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yICh2YXIgZ2lkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBkYXRhW2dpZF0uXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS51cGRhdGUoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbbWFpbF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB1X2kgPSBkYXRhW21haWxdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBncmFkZSA9IHVfaS5ncmFkZSAqIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmFkZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXR0ZW5kLmluaXQoZGF0YVttYWlsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmFkZSA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjb3VudC5pbml0KG1haWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZWQuYWNjb3VudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZWQuYXR0ZW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9naW4odV9pLm5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gVXNlciBpcyBzaWduZWQgaW4uXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE5vIHVzZXIgaXMgc2lnbmVkIGluLlxyXG4gICAgICAgICAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aFBvcHVwKHByb3ZpZGVyKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHVzZXIgPSByZXN1bHQudXNlcjtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VyTWFpbCA9IHVzZXIuZW1haWwuc3BsaXQoJ0AnKVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVt1c2VyTWFpbF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdV9pID0gZGF0YVt1c2VyTWFpbF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmFkZSA9IHVfaS5ncmFkZSAqIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBdHRlbmQuaW5pdChkYXRhW3VzZXJNYWlsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGUgPT09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2NvdW50LmluaXQodXNlck1haWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmFjY291bnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZWQuYXR0ZW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luKHVfaS5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigndXNlcnMvJyArIHVzZXJNYWlsKS5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLmRpc3BsYXlOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbDogdXNlck1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IFwiYWJjXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoJ2NvZGU6JyArIGVycm9yLmNvZGUgKyAnIC0g7J287Iuc7KCB7J24IOusuOygnOqwgCDrsJzsg53tlojsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpQuJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgRXJyb3JzIGhlcmUuXHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JDb2RlID0gZXJyb3IuY29kZTtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGVtYWlsIG9mIHRoZSB1c2VyJ3MgYWNjb3VudCB1c2VkLlxyXG4gICAgICAgICAgICAgICAgdmFyIGVtYWlsID0gZXJyb3IuZW1haWw7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZmlyZWJhc2UuYXV0aC5BdXRoQ3JlZGVudGlhbCB0eXBlIHRoYXQgd2FzIHVzZWQuXHJcbiAgICAgICAgICAgICAgICB2YXIgY3JlZGVudGlhbCA9IGVycm9yLmNyZWRlbnRpYWw7XHJcbiAgICAgICAgICAgICAgICAvLyAuLi5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbiQoXCIubmF2X19pdGVtXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKCEkKHRoaXMpLmhhc0NsYXNzKCduYXZfX2l0ZW0tLWhhc0RyYXdlcicpKXtcclxuICAgICAgICB2YXIgaXRlbSA9ICQodGhpcykuYXR0cihcImlkXCIpLnNwbGl0KFwiX1wiKVsxXTtcclxuXHJcbiAgICAgICAgJChcIi5uYXY+KlwiKS5yZW1vdmVDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcblxyXG4gICAgICAgICQoXCIucGFnZXNcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLnBhZ2VzLlwiICsgaXRlbSkucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICAgICAgaWYoIWluaXRpYWxpemVkW2l0ZW1dKXtcclxuICAgICAgICAgICAgTmF2X2Z1bmN0aW9uW2l0ZW1dKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbiQoXCIubmF2X19kcmF3ZXJfX2l0ZW1cIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIHZhciBpdGVtID0gJCh0aGlzKS5hdHRyKFwiaWRcIikuc3BsaXQoXCJfXCIpWzFdO1xyXG5cclxuICAgICQoXCIubmF2PipcIikucmVtb3ZlQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcblxyXG4gICAgJChcIi5uYXZfX2RyYXdlcl9faXRlbVwiKS5yZW1vdmVDbGFzcyhcIm5hdl9fZHJhd2VyX19pdGVtLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJuYXZfX2RyYXdlcl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcblxyXG4gICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIi5wYWdlcy5cIiArIGl0ZW0pLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgaWYgKCFpbml0aWFsaXplZFtpdGVtXSkge1xyXG4gICAgICAgIE5hdl9mdW5jdGlvbltpdGVtXSgpO1xyXG4gICAgfVxyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9pbmRleC5qcyIsInZhciBBdHRlbmQgPSB7XHJcbiAgICBtb2JpbGU6IGZhbHNlLFxyXG5cclxuICAgIGlkOiBcIlwiLFxyXG5cclxuICAgIHZpZXdJRDogXCJcIixcclxuICAgIC8v6rSA66as7J6Q6rCAIOuLpOuluCDsgqzrnozsnZggSUQg7ZmV7J247KSRXHJcblxyXG4gICAgYXR0ZW5kT2JqOiB7fSxcclxuXHJcbiAgICBzYWxhcnk6IHt9LFxyXG5cclxuXHJcbiAgICB3ZWVrZGF5czogW1wi7J28XCIsIFwi7JuUXCIsIFwi7ZmUXCIsIFwi7IiYXCIsIFwi66qpXCIsIFwi6riIXCIsIFwi7YagXCIsIFwi7J28XCJdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKHVfaSl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHZhciBncmFkZSA9IHVfaS5ncmFkZTtcclxuICAgICAgICB2YXIgaWQgPSB1X2kuaWQ7XHJcblxyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuXHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCs9JzxzZWxlY3QgY2xhc3M9XCJ3b3JrZXJfc2VsZWN0b3JcIj48L3NlbGVjdD4nO1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX3RvcFwiPic7XHJcbiAgICAgICAgdHh0ICs9ICAgJzxkaXYgaWQ9XCJjYWxlbmRhclwiIGNsYXNzPVwiYXR0ZW5kX19jYWxlbmRhclwiPjwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9ICAgJzxkaXYgY2xhc3M9XCJhdHRlbmRfX3dlZWtcIj48L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aFwiPjwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIucGFnZXMuYXR0ZW5kXCIpLmh0bWwodHh0KS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImFjY291bnQvc2FsYXJ5XCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB0aGF0LnNhbGFyeSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIGlmKGdyYWRlID09PSA1KXtcclxuICAgICAgICAgICAgICAgICQoXCIud29ya2VyX3NlbGVjdG9yXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIubG9hZGluZ1ZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlcnMgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eHQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBtYWlsSUQgaW4gdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodXNlcnNbbWFpbElEXS5ncmFkZSoxPDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIG1haWxJRCArICdcIj4nICsgdXNlcnNbbWFpbElEXS5uYW1lICsgJzwvb3B0aW9uPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikuaHRtbCh0eHQpLnZhbChpZCkucHJvcChcInNlbGVjdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCkub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmdWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRPYmogPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXR0ZW5kT2JqKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZighJChcIi5mYy1oZWFkZXItdG9vbGJhclwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5Q2xpY2s6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRXb3JrSG91cihkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIubW9kYWxcIikub24oXCJjbGlja1wiLCBcIi5jb25maXJtXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKCEkKFwiLmF0dGVuZFwiKS5oYXNDbGFzcygnZGlzcGxheU5vbmUnKSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFdvcmtIb3VyKCQodGhpcykuYXR0cihcImRpZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIubW9kYWxcIikub24oXCJjbGlja1wiLCBcIi5jbG9zZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAoISQoXCIuYXR0ZW5kXCIpLmhhc0NsYXNzKCdkaXNwbGF5Tm9uZScpKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmJsYWNrU2NyZWVuXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmtleXVwKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBpZiAoISQoXCIuYXR0ZW5kXCIpLmhhc0NsYXNzKCdkaXNwbGF5Tm9uZScpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIi5tb2RhbCAuY29uZmlybVwiKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29kZSA9IGUud2hpY2g7IC8vIHJlY29tbWVuZGVkIHRvIHVzZSBlLndoaWNoLCBpdCdzIG5vcm1hbGl6ZWQgYWNyb3NzIGJyb3dzZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFdvcmtIb3VyKCQoXCIubW9kYWwgLmNvbmZpcm1cIikuYXR0cihcImRpZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikuY2hhbmdlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCBpZCA9ICQodGhpcykudmFsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXdfd29ya2VyKGlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgdmlld193b3JrZXI6IGZ1bmN0aW9uKGlkKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmKGlkID09PSB0aGF0LmlkKXtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX2NhbGVuZGFyXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX193ZWVrXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19tb250aFwiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fY2FsZW5kYXJcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgaWYodGhhdC52aWV3SUQubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhhdC52aWV3SUQpLm9mZigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIitpZCkub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYXR0ZW5kT2JqID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgIGxldCB5byA9IHRoYXQudmlld0lEO1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3SUQgPSBpZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih5by5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTY0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld1JlbmRlciA6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGF0LmlkICE9PSB0aGF0LnZpZXdJRCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5Q2xpY2s6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFdvcmtIb3VyKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfY2FsZW5kYXI6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICQoXCIuYXR0ZW5kXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5mYy1kYXlcIikuaHRtbChcIlwiKTtcclxuXHJcbiAgICAgICAgaWYoZGF0YS5hdHRlbmQpe1xyXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5hdHRlbmQ7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGRhdGUgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGVJRCA9IGRhdGUuc2xpY2UoMCw0KStcIi1cIitkYXRlLnNsaWNlKDQsNikrXCItXCIrZGF0ZS5zbGljZSg2LDgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHh0ID0gJzxwPicrZGF0YVtkYXRlXVswXS5mcm9tK1wiflwiK2RhdGFbZGF0ZV1bMF0udG8rJzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgLy/rkZDtg4DsnoQg64KY64ig7IScIOq3vOustO2WiOyWtOuPhCDri6zroKXsl5Ag7ZGc7Iuc65CY64qUIOqyg+ydgCDssqvtg4DsnoQg6re866y07Iuc6rCE66eMXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW2RhdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlmICs9IGRhdGFbZGF0ZV1baV0uZGlmO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHR4dCs9JzxwPicgKyBNYXRoLmZsb29yKGRpZi82MCkgKyBcIuyLnOqwhCBcIisgZGlmJTYwICtcIuu2hFwiKyc8L3A+JztcclxuICAgICAgICAgICAgICAgICQoJy5hdHRlbmQgLmZjLWRheVtkYXRhLWRhdGU9XCInK2RhdGVJRCsnXCJdJykuaHRtbCh0eHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBkdXJNb24gPSAwO1xyXG4gICAgICAgICAgICBsZXQgdGhpc01vbnRoID0gJyc7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5hdHRlbmQgLmZjLWRheVwiKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGVEb20gPSAkKFwiLmF0dGVuZCAuZmMtZGF5XCIpLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgaWYoIWRhdGVEb20uaGFzQ2xhc3MoXCJmYy1vdGhlci1tb250aFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBkYXRlRG9tLmF0dHIoXCJkYXRhLWRhdGVcIikuc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNNb250aCA9IGRhdGVbMF0rZGF0ZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZVswXStkYXRlWzFdK2RhdGVbMl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbZGF0ZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1ck1vbiArPSBkYXRhW2RhdGVdW2pdLmRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgaWYoJChcIi5hdHRlbmQgLmZjLXZpZXctY29udGFpbmVyXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykgeyAgIC8v66y07KGw6rG0IDbso7xcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla0RvbSA9ICQoXCIuYXR0ZW5kIC5mYy13ZWVrXCIpLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3ZWVrRHVyID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA3OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRheURvbSA9IHdlZWtEb20uZmluZChcIi5mYy1kYXlcIikuZXEoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gZGF5RG9tLmF0dHIoXCJkYXRhLWRhdGVcIikuc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZVswXStkYXRlWzFdK2RhdGVbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbZGF0ZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBkYXRhW2RhdGVdLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Vla0R1ciArPSBkYXRhW2RhdGVdW2tdLmRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZih3ZWVrRHVyPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImF0dGVuZF9fd2Vla19faG91clwiPicrIE1hdGguZmxvb3Iod2Vla0R1ci82MCkrJ+yLnOqwhCAnK3dlZWtEdXIlNjArJ+u2hCcgKyc8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIi5hdHRlbmRfX3dlZWtcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJChcIi5hdHRlbmQgLmZjLWxlZnRcIikuY2hpbGRyZW4oXCJoMi5kdXJNb250aFwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgJChcIi5hdHRlbmQgaDIuZHVyTW9udGhcIikuaHRtbCgnICgnK01hdGguZmxvb3IoZHVyTW9uLzYwKSsn7Iuc6rCEICcrZHVyTW9uJTYwKyfrtoQpJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJChcIi5hdHRlbmQgLmZjLWxlZnRcIikuYXBwZW5kKCc8aDIgY2xhc3M9XCJkdXJNb250aFwiPiAoJytNYXRoLmZsb29yKGR1ck1vbi82MCkrJ+yLnOqwhCAnK2R1ck1vbiU2MCsn67aEKTwvaDI+Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHR4dCA9ICcnOyAgIC8vdmFyIOu5vOuoueydgOqxsCDslYTri5guIOychOyXkOyEnCDshKDslrgg7ZaI7J2MIVxyXG5cclxuICAgICAgICAgICAgbGV0IGZ1bGxNb250aEJvbnVzID0gMzA0MDA7XHJcbiAgICAgICAgICAgIGxldCBpbnN1cmFuY2VGZWUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgYmFzaWMgPSBNYXRoLnJvdW5kKGR1ck1vbi82MCo3NjAwKTtcclxuICAgICAgICAgICAgbGV0IGZ1bGxXZWVrQnVudXMgPSBNYXRoLnJvdW5kKChkdXJNb24vNjAqNzYwMCkqMC4yKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmKHRoaXMuaWQgPT09IHRoaXMudmlld0lEKXtcclxuICAgICAgICAgICAgLy8gICAgIC8v67O47J24IOuqqOuTnFxyXG4gICAgICAgICAgICAvLyAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhY2NvdW50L3NhbGFyeS9cIit0aGlzTW9udGgrXCIvXCIrdGhpcy5pZCkudXBkYXRlKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBiYXNpYzogYmFzaWMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbFdlZWtCdW51czogZnVsbFdlZWtCdW51cyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsTW9udGhCb251czogZnVsbE1vbnRoQm9udXNcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnkvXCIrdGhpc01vbnRoK1wiL1wiK3RoaXMudmlld0lEKS51cGRhdGUoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJhc2ljOiBiYXNpYyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsV2Vla0J1bnVzOiBmdWxsV2Vla0J1bnVzLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxNb250aEJvbnVzOiBmdWxsTW9udGhCb251c1xyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuq4sOuzuOq4iTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoYmFzaWMpKyBcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6re866y07Iuc6rCEIFggNyw2MDDsm5A8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuyjvO2ctOyImOuLuTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoZnVsbFdlZWtCdW51cykgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7quLDrs7jquInsnZggMjAlPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7sl7DssKjsiJjri7k8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGZ1bGxNb250aEJvbnVzKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPjXsi5zqsIQg7IOB64u5IOq4sOuzuOq4iTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmUgYXR0ZW5kX19tb250aF9fbGluZS0tcmVkXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuyCrO2ajOuztO2XmOujjDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoaW5zdXJhbmNlRmVlKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq1reuvvOyXsOq4iC/qs6Dsmqnrs7Ttl5gv6rG06rCV67O07ZeYIOyyreq1rOyVoTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmUgYXR0ZW5kX19tb250aF9fbGluZS0tc3VtXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPu2VqeqzhDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoYmFzaWMgKyBmdWxsV2Vla0J1bnVzICsgZnVsbE1vbnRoQm9udXMgLSBpbnN1cmFuY2VGZWUpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6riw67O46riJICsg7KO87Zy07IiY64u5ICsg7Jew7LCo7IiY64u5IC0g7IKs7ZqM67O07ZeY66OMPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fbW9udGhcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5wdXRXb3JrSG91cjogZnVuY3Rpb24oZGF0ZU9iail7XHJcbiAgICAgICAgLy8gY3NzOiBtb2R1bGVzL2F0dGVuZC5jc3NcclxuICAgICAgICBsZXQgZGF0ZVNob3J0ID0gbW9tZW50KGRhdGVPYmopLmZvcm1hdChcIk1NL0REXCIpO1xyXG4gICAgICAgIGxldCBkYXRlSUQgPSBtb21lbnQoZGF0ZU9iaikuZm9ybWF0KFwiWVlZWU1NRERcIik7XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0ge307XHJcbiAgICAgICAgaWYodGhpcy5hdHRlbmRPYmouYXR0ZW5kW2RhdGVJRF0pe1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5hdHRlbmRPYmouYXR0ZW5kW2RhdGVJRF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcblxyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJibGFja1NjcmVlblwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cImlucHV0V2luZG93XCI+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPHAgY2xhc3M9XCJ0aXRsZVwiPicrZGF0ZVNob3J0Kycg6re866y07Iuc6rCEPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxkaXYgY2xhc3M9XCJsaW5lIGNsZWFyZml4XCI+JztcclxuICAgICAgICBpZihkYXRhWzBdKXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cImZpcnN0X2Zyb21cIiB2YWx1ZT1cIicrZGF0YVswXS5mcm9tKydcIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwiZmlyc3RfdG9cIiB2YWx1ZT1cIicrZGF0YVswXS50bysnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPic7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJmaXJzdF9mcm9tXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cImZpcnN0X3RvXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9ICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPic7XHJcbiAgICAgICAgaWYoZGF0YVsxXSl7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJzZWNvbmRfZnJvbVwiIHZhbHVlPVwiJytkYXRhWzFdLmZyb20rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJzZWNvbmRfdG9cIiB2YWx1ZT1cIicrZGF0YVsxXS50bysnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPic7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJzZWNvbmRfZnJvbVwiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJzZWNvbmRfdG9cIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxkaXYgY2xhc3M9XCJib3R0b21cIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgICAnPHAgY2xhc3M9XCJjb25maXJtXCIgZGlkPVwiJytkYXRlSUQrJ1wiPu2ZleyduDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICAgICAnPHAgY2xhc3M9XCJjbG9zZVwiPuy3qOyGjDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCs9ICAgJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubW9iaWxlKXtcclxuICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5BbnlQaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgZGF0ZVRpbWVGb3JtYXQ6XCJISDptbVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIiNmaXJzdF9mcm9tXCIpLmZvY3VzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFdvcmtIb3VyOiBmdW5jdGlvbihkYXRlKXtcclxuXHJcbiAgICAgICAgbGV0IHdvcmsgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IGFsbEVtcHR5ID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5lcShpKS52YWwoKS5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgICAgICBhbGxFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihhbGxFbXB0eSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMudmlld0lEK1wiL2F0dGVuZC9cIitkYXRlKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkK1wiL2F0dGVuZC9cIitkYXRlKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJChcIi5tb2RhbFwiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0ZUlEID0gZGF0ZS5zbGljZSgwLDQpICsgXCItXCIrZGF0ZS5zbGljZSg0LDYpICsgXCItXCIrZGF0ZS5zbGljZSg2LDgpO1xyXG4gICAgICAgICAgICAkKCcuZmMtZGF5W2RhdGEtZGF0ZT1cIicrZGF0ZUlEKydcIl0nKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYoJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcbiAgICAgICAgICAgIC8v7Iuc7J6R7Iuc6rCE7J20IOyemCDsnoXroKXrkJjsl4jrgpgg7ZmV7J24XHJcblxyXG4gICAgICAgICAgICBpZihkYXRlPG1vbWVudCgpLmZvcm1hdChcIllZWVlNTUREXCIpKXtcclxuICAgICAgICAgICAgICAgIC8v7Jik64qYIOydtOyghCDsnbzsnZgg64Kg7Kec66W8IOuLpOujqOqzoCDsnojsnYQg6rK97JqwIC0g6re866y0IOyiheujjOyLnOqwhOydtCDsnoXroKXrkJjsp4Ag7JWK7Jy866m0IOyViCDrkKhcclxuICAgICAgICAgICAgICAgIGlmKCQoXCIjZmlyc3RfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy/snbTsoITsnbzsnbQg7JWE64uI642U652864+EIOyYiOyDgSDqt7zrrLTsi5zqsITsnbTrnbzrj4Qg7J6F66Cl7ZW07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgaWYoJChcIiNmaXJzdF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuyYiOyDgSDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZnJvbSA9ICQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKTtcclxuICAgICAgICAgICAgbGV0IHRvID0gJChcIiNmaXJzdF90b1wiKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmcm9tQSA9IGZyb20uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICBsZXQgdG9BID0gdG8uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICBsZXQgZGlmID0gKHRvQVswXSoxIC0gZnJvbUFbMF0qMSkqNjAgKyAodG9BWzFdKjEgLSBmcm9tQVsxXSoxKTtcclxuXHJcblxyXG4gICAgICAgICAgICB3b3JrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgIGRpZjogZGlmXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYWxlcnQoXCLqt7zrrLTsi5zqsITsnbQg7J6Y66q7IOyeheugpeuQmOyXiOyKteuLiOuLpC4gSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0ZTxtb21lbnQoKS5mb3JtYXQoXCJZWVlZTU1ERFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/smKTripgg7J207KCEIOydvOydmCDrgqDsp5zrpbwg64uk66Oo6rOgIOyeiOydhCDqsr3smrAgLSDqt7zrrLQg7KKF66OM7Iuc6rCE7J20IOyeheugpeuQmOyngCDslYrsnLzrqbQg7JWIIOuQqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL+ydtOyghOydvOydtCDslYTri4jrjZTrnbzrj4Qg7JiI7IOBIOq3vOustOyLnOqwhOydtOudvOuPhCDsnoXroKXtlbTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDsmIjsg4Eg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZnJvbSA9ICQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG8gPSAkKFwiI3NlY29uZF90b1wiKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZnJvbUEgPSBmcm9tLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCB0b0EgPSB0by5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gKHRvQVswXSoxIC0gZnJvbUFbMF0qMSkqNjAgKyAodG9BWzFdKjEgLSBmcm9tQVsxXSoxKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGZyb206IGZyb20sXHJcbiAgICAgICAgICAgICAgICAgICAgdG86IHRvLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpZjogZGlmXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOq3vOustOyLnOqwhOydtCDsnpjrqrsg7J6F66Cl65CY7JeI7Iq164uI64ukLiBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy52aWV3SUQrXCIvYXR0ZW5kL1wiK2RhdGUpLnNldCh3b3JrKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCtcIi9hdHRlbmQvXCIrZGF0ZSkuc2V0KHdvcmspO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5odG1sKFwiXCIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXR0ZW5kO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9hdHRlbmQuanMiLCJsZXQgQ2l0eSA9IHtcclxuICAgIGRhdGE6IHt9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5jaXR5XCIpLm9uKFwiY2xpY2tcIiwgXCIucmVmcmVzaFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShcIuuNsOydtO2EsOulvCDrp47snbQg7J6h7JWE66i57Iq164uI64ukISDsoJXrp5Ag7LWc7Iug7ZmU7ZWY7Iuc6rKg7Iq164uI6rmMP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoU3RhdHVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGgyPuuPhOyLnCDrjbDsnbTthLAg7ZmV67O07ZiE7ZmpPC9oMj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwicmVmcmVzaFwiPuy1nOyLoO2ZlDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cIndyYXBwZXJcIj4nO1xyXG5cclxuICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cImxpbmUgdG9wXCI+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cIm5hbWVcIj7rj4Tsi5zrqoU8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX2hvdGVsc1wiPuyImeyGjDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHNcIj7qtIDqtJHsp4Ag7KCV66asPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X190cmFuc3BvcnRcIj7qtZDthrU8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX2FyZWFcIj7sp4Dsl608L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX3ByaWNlXCI+66y86rCAPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gJzwvZGl2Pic7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yICh2YXIgY29kZSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjb2RlXTtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGNpdHkuc3RhdHVzO1xyXG5cclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwibGluZVwiIGlkPVwiJyArIGNpdHkuY29kZSArICdcIj48cCBjbGFzcz1cIm5hbWVcIj4nICsgY2l0eS5uYW1lICsgJzwvcD4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5ob3RlbCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2hvdGVscyB3ZWlnaHQtLWJvbGRcIj7tj4nqsIAg7JmE66OMPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmhvdGVsID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzXCI+642w7J207YSwIOyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2hvdGVscyBjb2xvci0tcmVkXCI+642w7J207YSwIOyXhuydjDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLnNwb3QgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90cyB3ZWlnaHQtLWJvbGRcIj7soJXrs7TqsoDspp0g7JmE66OMPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnNwb3QgPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90c1wiPjLssKjqsoDspp08L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+7ZWp7LmY6riwPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnNwb3QgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90c1wiPuygleuztCDqsoDspp3spJE8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90cyBjb2xvci0tcmVkXCI+7KCV67O0IOyXhuydjDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLnRyYW5zcG9ydCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydCB3ZWlnaHQtLWJvbGRcIj7rjIDspJHqtZDthrUg7JmE66OMPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnRyYW5zcG9ydCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydFwiPuuNsOydtO2EsCDsnojsnYw8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X190cmFuc3BvcnQgY29sb3ItLXJlZFwiPuuNsOydtO2EsCDsl4bsnYw8L3A+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fYXJlYVwiPk88L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19hcmVhIGNvbG9yLS1yZWRcIj5YPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMucHJpY2UpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19wcmljZVwiPk88L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19wcmljZSBjb2xvci0tcmVkXCI+WDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JzsgLy9jbG9zZSB3cmFwcGVyXHJcblxyXG4gICAgICAgICQoXCIuY2l0eVwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzJykub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5pbmZsYXRlKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWZyZXNoU3RhdHVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcycpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwPT57XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgY2lkIGluIHRoYXQuZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2l0eSA9IGRhdGFbY2lkXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihjaXR5KXtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsOiAwLCAvLzA6642w7J207YSw7JeG7J2MLCAxOuyImeyGjOuNsOydtO2EsOunjCDsnojsnYwsIDI67Y+J6rCA642w7J207YSwKOybjOuUqSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6IHRoYXQuZGF0YVtjaWRdLnN0YXR1cy5zcG90LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IDAsIC8v642w7J207YSw7JeG7J2MLCAxOuuplO2KuOuhnOuNsOydtO2EsOunjCDsnojsnYwsIDI66rCA6rO1642w7J207YSwKOudvOyduOuzhC4u65OxKSDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDBcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2l0eS5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5hcmVhID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNpdHkuaG90ZWxzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhvdGVsID0gY2l0eS5ob3RlbHNbT2JqZWN0LmtleXMoY2l0eS5ob3RlbHMpWzBdXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmhvdGVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuaG90ZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5hcmVhID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoaG90ZWwuYXJlYSA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuYXJlYSA9IDI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5zdGF0dXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuc3RhdHVzLmFyZWEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5zdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2l0eS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5LnN0YXR1cy5hcmVhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuc3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgY2lkICsgJy9zdGF0dXMnKS51cGRhdGUoY2l0eS5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5tZXRybyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdHkubWV0cm9MaW5lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy50cmFuc3BvcnQgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy50cmFuc3BvcnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihjaXR5LnByaWNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnByaWNlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsOiAwLCAvLzA6642w7J207YSw7JeG7J2MLCAxOuyImeyGjOuNsOydtO2EsOunjCDsnojsnYwsIDI67Y+J6rCA642w7J207YSwKOybjOuUqSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogMCwgLy/rjbDsnbTthLDsl4bsnYwsIDE666mU7Yq466Gc642w7J207YSw66eMIOyeiOydjCwgMjrqsIDqs7XrjbDsnbTthLAo65287J2467OELi7rk7EpIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogMFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhW2NpZF0uc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLnNldCh0aGF0LmRhdGEpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlKHRoYXQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgn7LWc7Iug7ZmUIOyZhOujjCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENpdHk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2NpdHkuanMiLCJpbXBvcnQgRmlyc3RfY2hlY2sgZnJvbSBcIi4vc3BvdC9maXJzdF9jaGVjay5qc1wiO1xyXG5pbXBvcnQgU2Vjb25kX2NvbWJpbmUgZnJvbSBcIi4vc3BvdC9zZW9uZF9jb21iaW5lLmpzXCJcclxuXHJcbnZhciBTcG90ID0ge1xyXG4gICAgY2l0aWVzOiB7fSxcclxuICAgIG9yZGVyOlwiXCIsXHJcbiAgICBkYXRhOiB7fSxcclxuICAgIGN1cnJlbnQ6XCJcIiwgLy/tmITsnqwg67O06rOg7J6I64qUIOuPhOyLnCBjaWQgLSBmaXJlYmFzZSByZWbsl5Agb2ZmIOuLrOq4sOychO2VtFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh1X2kpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBGaXJzdF9jaGVjay5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMub3JkZXIgPSB1X2kuc2V0dGluZy5vcmRlcjtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzJykub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpXHJcbiAgICAgICAgICAgIHRoYXQuY2l0aWVzID0gZGF0YTtcclxuICAgICAgICAgICAgdGhhdC5vcmRlciA9IHVfaS5zZXR0aW5nLm9yZGVyO1xyXG4gICAgICAgICAgICB0aGF0LmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfc3RhdHVzKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuYWN0aXZlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHRoYXQuY2l0aWVzW2NpZF0uc3RhdHVzLnNwb3Q7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIHN0YXR1cylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5vcmRlclwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQub3JkZXIgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICAgICAgdmFyIHVpZCA9IHVfaS5tYWlsO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigndXNlcnMvJyArIHVpZCArIFwiL3NldHRpbmcvb3JkZXJcIikuc2V0KHRoYXQub3JkZXIpO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfc3RhdHVzKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIucmV0dXJuXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX3N0YXR1cygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfc3RhdHVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5kYXRhO1xyXG5cclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzxoMj7qtIDqtJHsp4Ag642w7J207YSwIOygleumrCDtmITtmak8L2gyPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cIm9yZGVyXCIgaWQ9XCJhYmNcIj7qsIDrgpjri6TsiJw8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwib3JkZXJcIiBpZD1cImNoYW5nZWRcIj7siJjsoJXsi5zqsITsiJw8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwid3JhcHBlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwibGluZXIgbGluZXItLWhlYWRlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaXR5TmFtZVwiPuuPhOyLnOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+7IOB7YOcPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaGFyZ2VcIj7ri7Tri7nsnpA8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIHZhciBvcmRlckFycmF5ID0gW107XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXIgPT09IFwiYWJjXCIpIHtcclxuICAgICAgICAgICAgICAgIG9yZGVyQXJyYXkucHVzaCh7IGNpZDogY2lkLCBpZHg6IGNpdHkubmFtZSB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IFwiY2hhbmdlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBvcmRlckFycmF5LnB1c2goeyBjaWQ6IGNpZCwgaWR4OiBjaXR5Lm9yZGVyLmNoYW5nZWQgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3JkZXJBcnJheS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmlkeCA+IGIuaWR4ID8gMSA6IGEuaWR4IDwgYi5pZHggPyAtMSA6IDBcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB2YXIgc3RhdHVzQXJyYXkgPSBbXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3Bhbj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuPuyZhOujjDwvc3Bhbj48L3A+JyxcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuyZhOujjDwvc3Bhbj48L3A+J1xyXG4gICAgICAgIF1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmRlckFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSBvcmRlckFycmF5W2ldLmNpZDtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcblxyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJsaW5lclwiIGlkPVwiJyArIGNpZCArICdcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NpdHlOYW1lXCI+JyArIGNpdHkubmFtZSArICc8L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9IHN0YXR1c0FycmF5W2NpdHkuc3RhdHVzLnNwb3RdO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NoYXJnZVwiPuuLtOuLueyekDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JzsvL3dyYXBwZXIg64ur6riwXHJcblxyXG4gICAgICAgICQoXCIucGFnZXMuc3BvdFwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgJChcIiNcIiArIHRoaXMub3JkZXIpLmFkZENsYXNzKFwib3JkZXItLXNlbGVjdGVkXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX2NpdHk6IGZ1bmN0aW9uIChjaWQsIHN0YXR1cyl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyB0aGF0LmN1cnJlbnQpLm9mZihcInZhbHVlXCIpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyBjaWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQuY3VycmVudCA9IGNpZDtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaXR5TmFtZSA9IHRoYXQuY2l0aWVzW2NpZF0ubmFtZTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDEpIHsgICAvL+2YhOyerCDsoJXrs7TsiJjsp5Hsg4Htg5wg6rKA7KadXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuaHRtbCgnPGgyPicgKyBjaXR5TmFtZSArICcg7KCV67O06rKA7KadPC9oMj4nKS5hdHRyKCdjaWQnLCBjaWQpLmF0dHIoJ2NpdHlOYW1lJyxjaXR5TmFtZSkuYWRkQ2xhc3MoXCJjaXR5TmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBGaXJzdF9jaGVjay5pbmZsYXRlKGRhdGEuc3BvdHMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IDIpIHsgLy/tlansuZjquLDsnpHsl4VcclxuICAgICAgICAgICAgICAgICAgICBTZWNvbmRfY29tYmluZS5pbml0KClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAvLzLssKjqsoDspp3tmZTrqbTqs7wg7JmE66OM7ZmU66m07J2AIOuUsOuhnCDssKjsnbTqsIAg7JeG7J2MXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfslYTrrLTrn7Ag642w7J207YSw6rCAIOyXhuyKteuLiOuLpC4g642w7J207YSwIOyImOynkeydhCDrqLzsoIAg7KeE7ZaJ7ZW07KO87IS47JqULicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLm5hdl9faXRlbVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ25hdl9faXRlbS0taGFzRHJhd2VyJykpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIHRoYXQuY3VycmVudCkub2ZmKFwidmFsdWVcIik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5uYXZfX2RyYXdlcl9faXRlbSBcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdpZCcpID09PSAnbmF2X3Nwb3QnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgdGhhdC5jdXJyZW50KS5vZmYoXCJ2YWx1ZVwiKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcG90O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QuanMiLCJpbXBvcnQgQXV0b0NvbWJpbmUgZnJvbSAnLi9hdXRvQ29tYmluZS5qcyc7XHJcblxyXG52YXIgRmlyc3RfQ2hlY2sgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0UmVtYWluTnVtYmVyKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19yZW1haW5OdW1iZXJcIikudmFsKCkpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19ub2RhdGFcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2lkID0gJCh0aGlzKS5hdHRyKCdzaWQnKTtcclxuICAgICAgICAgICAgdGhhdC5zaXRlTm9kYXRhKHNpZCk7XHJcbiAgICAgICAgICAgIHRvYXN0KCfrjbDsnbTthLAg6rO167CxIOyymOumrCcpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy/sooztkZwg7JeG64qUIOq0gOq0keyngOydmCDsooztkZzrpbwg7J6F66Cl7ZWoXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3Nwb3REZWxldGVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmRlbGV0ZVNwb3QoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIiksICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIuY2hlY2tfX3Nwb3ROYW1lXCIpLmh0bWwoKSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy/sooztkZwg7JeG64qUIOq0gOq0keyngOydmCDsooztkZzrpbwg7J6F66Cl7ZWoXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX2NvbmZpcm1cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygneW9sbycpXHJcbiAgICAgICAgICAgIHRoYXQuaW5wdXRDb29yZGluYXRlKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19zcG90Q29vclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgc2l0ZU5vZGF0YTogZnVuY3Rpb24gKHNpZCkge1xyXG4gICAgICAgIHZhciBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlybShcIuuNsOydtO2EsOulvCDsoJXrp5Ag7JeG7JWx64uI6rmMIT9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpZCArIFwiL25vZGF0YVwiKS5zZXQodHJ1ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFJlbWFpbk51bWJlcjogZnVuY3Rpb24gKHNpdGUsIG51bWJlcikge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBjdXRObyA9IG51bWJlci50cmltKCkgKiAxO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSlcclxuXHJcbiAgICAgICAgaWYgKGN1dE5vIDwgMTAwKSB7XHJcbiAgICAgICAgICAgIHRvYXN0KFwiMTAw6rCcIOydtOyDgeydmCDsnqXshozrpbwg7Jyg7KeA7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKFwi7Iic7JyEIFwiICsgY3V0Tm8gKyBcIuychCDrr7jrp4wg7J6l7IaM66W8IOuqqOuRkCDsoJzqsbDtlanri4jri6QuIOunnuyKteuLiOq5jD9cIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXRPYmogPSB0aGlzLmRhdGEuc3BvdHNbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICBjdXRPYmoubGVuZ3RoID0gY3V0Tm87XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlKS5zZXQoY3V0T2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlU3BvdDogZnVuY3Rpb24gKHNpZCwgbmFtZSkge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlID0gc2lkLnNwbGl0KFwiX1wiKVswXTtcclxuICAgICAgICBsZXQgbm8gPSBzaWQuc3BsaXQoXCJfXCIpWzFdO1xyXG5cclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShuYW1lICsgXCIg7J6l7IaM66W8IOygnOqxsO2VqeuLiOuLpC4g6rOE7IaN7ZWg6rmM7JqUP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubykuc2V0KHsgZGVsZXRlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsnqXshozqsIAg7KCc6rGw65CY7JeI7Iq164uI64ukLlwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKG5vICsgXCLrsogg7J6l7IaM66W8IOygnOqxsO2VqeuLiOuLpC4g6rOE7IaN7ZWg6rmM7JqUP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubykuc2V0KHsgZGVsZXRlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsnqXshozqsIAg7KCc6rGw65CY7JeI7Iq164uI64ukLlwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dENvb3JkaW5hdGU6IGZ1bmN0aW9uIChzaWQsIGNvb3JUeHQpIHtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgc2l0ZSA9IHNpZC5zcGxpdChcIl9cIilbMF07XHJcbiAgICAgICAgbGV0IG5vID0gc2lkLnNwbGl0KFwiX1wiKVsxXTtcclxuICAgICAgICBsZXQgY29vciA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoY29vclR4dC5zcGxpdChcIixcIikubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXQgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVswXS50cmltKCkgKiAxO1xyXG4gICAgICAgICAgICBsZXQgbG5nID0gY29vclR4dC5zcGxpdChcIixcIilbMV0udHJpbSgpICogMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc05hTihsYXQpIHx8IGlzTmFOKGxuZykpIHtcclxuICAgICAgICAgICAgICAgIC8v7KKM7ZGcIOykkSDtlZjrgpjqsIBcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOu2gOygle2Zle2VmOqyjCDsnoXroKXrkJjsl4jsirXri4jri6RcIilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvb3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OiBsYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOiBsbmdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubyArIFwiL2Nvb3JcIikuc2V0KGNvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg67aA7KCV7ZmV7ZWY6rKMIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5oZWFkZXJcIikuYXBwZW5kKCc8cCBjbGFzcz1cInJldHVyblwiPuuPjOyVhOqwgOq4sDwvcD4nKVxyXG5cclxuICAgICAgICBsZXQgaGFzUHJvYmxlbSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgIGxldCBzZWFyY2hVcmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmtyL21hcHMvcGxhY2UvJyArICQoXCIuY2l0eU5hbWVcIikuYXR0cignY2l0eU5hbWUnKSArIFwiK1wiO1xyXG5cclxuICAgICAgICBsZXQgc2l0ZU9iaiA9IHtcclxuICAgICAgICAgICAgZ2c6IFwi6rWs6riAXCIsXHJcbiAgICAgICAgICAgIG52OiBcIuuEpOydtOuyhFwiLFxyXG4gICAgICAgICAgICB0YTogXCLtirjrpr3slrTrk5zrsJTsnbTsoIBcIixcclxuICAgICAgICAgICAgbHA6IFwi66Gg66as7ZSM656Y64ubXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiBzaXRlT2JqKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2l0ZUhhc1Byb2JsZW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yVHh0ID0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+7KKM7ZGc6rCAIOyeheugpeuQmOyngCDslYrsnYAg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICBsZXQgbm9TcG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3RUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7ruYTslrTsnojripQg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSwIO2ZleyduDwvcD4nXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGFbc2l0ZV0ubm9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcG90ID0gZGF0YVtzaXRlXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYXNDb29yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ydvOu2gOufrCDsgq3soJztlZwg6rSA6rSR7KeAIC0+IOuEmOyWtOqwhOuLpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5jb29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmNvb3IubG5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oc3BvdC5jb29yLmxuZyAqIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5jb29yLmxhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHNwb3QuY29vci5sYXQgKiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzQ29vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJyArIHNpdGUgKyAnXycgKyBpICsgJ1wiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8YSBjbGFzcz1cImNoZWNrX19zcG90TmFtZVwiIGhyZWY9XCInICsgc2VhcmNoVXJsICsgc3BvdC5uYW1lICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBzcG90Lm5hbWUgKyAnPC9hPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fc3BvdENvb3JcIiBwbGFjZWhvbGRlcj1cInh4Lnh4eHh4LCB4eC54eHh4eCDtmJXtg5wg7J6F66ClXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2NvbmZpcm1cIj7sooztkZwg7J6F66ClPC9wPjxwIGNsYXNzPVwiY2hlY2tfX3Nwb3REZWxldGVcIj7snqXshowg7IKt7KCcPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdfJyArIGkgKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90VHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX190eHRcIj4nICsgaSArICcg67KIIOq0gOq0keyngDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3Nwb3REZWxldGVcIj7snqXshowg7IKt7KCcPC9wPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9Db29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSBub0Nvb3JUeHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub1Nwb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vU3BvdFR4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdLmxlbmd0aCA+IDE1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFyZ2VPSyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxhcmdlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGFyZ2VEYXRhW3NpdGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8xNTDqsJwg7J207IOB7J2YIOuNsOydtO2EsOulvCDrs7TsnKDtlZjroKTrqbQg64+E7Iuc66qFL3Nwb3RzL2xhcmdlRGF0YS/sgqzsnbTtirjrqoXsnbQgdHJ1ZeudvOqzoCDrtoDsl6zrkJjslrTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXJnZU9LKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg7J6l7IaMIOuNsOydtO2EsOqwgCAxNTDqsJzrpbwg7LSI6rO8KCcgKyBkYXRhW3NpdGVdLmxlbmd0aCArICfqsJwp7ZWp64uI64ukLjwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJyArIHNpdGUgKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fcmVtYWluTnVtYmVyXCIgdmFsdWU9XCInICsgZGF0YVtzaXRlXS5sZW5ndGggKyAnXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19yZW1haW5MYXJnZURhdGFcIj7qsJzsnZgg7J6l7IaMIOycoOyngO2VmOq4sDwvcD4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSw6rCAIOyhtOyerO2VmOyngCDslYrsirXri4jri6QuPC9wPidcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGUgY2hlY2tfX25vZGF0YVwiIHNpZD1cIicgKyBzaXRlICsgJ1wiPuuNsOydtO2EsOqwgCDsm5Drnpgg7JeG7J2EIOqyveyasCDtgbTrpq3tlbTso7zshLjsmqU8L3A+J1xyXG4gICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzog7JuQ656YIOyCrOydtO2KuCDrjbDsnbTthLDqsIAg7KG07J6s7ZWY7KeAIOyViuuKlCDqsr3smrDrpbwg64yA67mE7ZWcIOuyhO2KvOydhCDrp4zrk6Tqs6Agc2l0ZSDqsJLsnLzroZwgbm9kYXRhOiB0cnVl66W8IOuEo+yWtOykgOuLpC5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNpdGVIYXNQcm9ibGVtKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+67Cc6rKs65CcIOusuOygnOqwgCDsl4bsirXri4jri6Q8L3A+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzUHJvYmxlbSkge1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2ZpbmlzaFwiPuqygOyCrOulvCDrqqjrkZAg66eI7LOk7Iq164uI64ukPC9wPidcclxuICAgICAgICAgICAgJChcIi5zcG90IC53cmFwcGVyXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKCdjaWQnKTtcclxuICAgICAgICAgICAgdG9hc3QoXCLrsJzqsqzrkJwg66y47KCc6rCAIOyXhuyWtCDrjbDsnbTthLAg67OR7ZWp7J2EIOyLpOyLnO2VqeuLiOuLpC5cIik7XHJcblxyXG4gICAgICAgICAgICBBdXRvQ29tYmluZS5pbml0KGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi53cmFwXCIpLnNjcm9sbFRvcCgwKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaXJzdF9DaGVjaztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2ZpcnN0X2NoZWNrLmpzIiwiLy9maXJzdF9jaGVja+yXkOyEnOunjCBpbXBvcnRlZCDrkJjqs6Ag7IKs7Jqp65CoXHJcblxyXG52YXIgQXV0b0NvbWJpbmUgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICBsZXQgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlQXJyID0gW1wiZ2dcIiwgXCJscFwiLCBcIm52XCIsIFwidGFcIl07XHJcbiAgICAgICAgbGV0IGNvbWJpbmluZyA9IHt9O1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXRlQXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBzaXRlID0gc2l0ZUFycltqXTtcclxuICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdLm5vRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtzaXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtzaXRlXVtpXSAmJiAhZGF0YVtzaXRlXVtpXS5kZWxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2xkU3BvdCA9IGRhdGFbc2l0ZV1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+q4sOyhtCDsoJXrs7Trpbwgb2xkU3BvdOydtOudvOqzoCDtlZjsnpAuIOyDiOuhnOyatCDsiqTtjJ/soJXrs7Tsl5DripQg7J2066aE7J2EIO2VnC/smIHsnLzroZwg67aE7ZWg7ZWY6rOgIOuere2CueydhCDrtoDsl6ztlaAg6rKD7J2064ukLlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcG90ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga286IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yOiBvbGRTcG90LmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuazoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvW+qwgC3tnqNdLy50ZXN0KG9sZFNwb3QubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm5hbWUua28gPSBvbGRTcG90Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5lbiA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QucmFua1tzaXRlXSA9IGk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFNwb3QudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC51cmwgPSBvbGRTcG90LnVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRTcG90LnRhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudGFnID0gb2xkU3BvdC50YWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmluZ1tcInMwMFwiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudGVyIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczBcIiArIGNvdW50ZXJdID0gc3BvdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wic1wiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IC8v7ZWc67CU7YC0IOuPjOyVmOuLuVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBjb21iaW5lT2JqID0ge31cclxuICAgICAgICBsZXQgY29tYmluZWQgPSB7fVxyXG5cclxuICAgICAgICBmb3IgKHZhciBjb2RlIGluIGNvbWJpbmluZykge1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IGNvbWJpbmluZ1tjb2RlXTtcclxuICAgICAgICAgICAgY29tYmluZU9ialtjb2RlXSA9IHNwb3RcclxuICAgICAgICAgICAgY29tYmluZU9ialtjb2RlXS5jb21iaW5lID0ge307XHJcbiAgICAgICAgICAgIGxldCBoYXNDb21iaW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL+2Vqey5oCDqsoPsnbQg7JeG7Jy866m0IOuwlOuhnCBjb21iaW5lZCDsqr3snLzroZwg67O064K464ukLlxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgdENvZGUgaW4gY29tYmluaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29kZSA8IHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRTcG90ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbWJpbmluZ1t0Q29kZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdFNwb3Rba2V5XSA9IGNvbWJpbmluZ1t0Q29kZV1ba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRTcG90LmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGNhbGN1bGF0ZURpZihzcG90LmNvb3IsIHRTcG90LmNvb3IpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMjUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmVbdENvZGVdID0gdFNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb21iaW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaGFzQ29tYmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbWJpbmVkW2NvZGVdID0gY29tYmluZU9ialtjb2RlXTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb21iaW5lT2JqW2NvZGVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaWQgKyBcIi9zcG90c1wiKS5zZXQoe1xyXG4gICAgICAgICAgICBjb21iaW5pbmc6IGNvbWJpbmVPYmosXHJcbiAgICAgICAgICAgIGNvbWJpbmVkOiBjb21iaW5lZFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcy8nICsgY2lkICsgJy9zdGF0dXMvc3BvdCcpLnNldCgxKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXV0b0NvbWJpbmU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9hdXRvQ29tYmluZS5qcyIsInZhciBTZWNvbmRfY29tYmluZSA9IHtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY29uZF9jb21iaW5lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3Qvc2VvbmRfY29tYmluZS5qcyIsImxldCBBY2NvdW50ID0ge1xyXG4gICAgdXNlcjoge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBpZD1cImFjY291bnRDYWxlbmRhclwiIGNsYXNzPVwiYWNjb3VudF9fY2FsZW5kYXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5hY2NvdW50XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB1aWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVpZCAhPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJbdWlkXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YVt1aWRdLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJyNhY2NvdW50Q2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgIHZpZXdSZW5kZXI6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24gKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2FjY291bnQuanMiLCJsZXQgU3Vid2F5ID0ge1xyXG4gICAgbWFwOnt9LFxyXG4gICAgbWFya2VyOmZhbHNlLFxyXG4gICAgbWV0cm86W10sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5bG9cIilcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvbnljL21ldHJvXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdGhhdC5tZXRybyA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YndheU1hcCcpLCB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiA0MC43NDg0NCwgbG5nOiAtNzMuOTg1NjYgfSxcclxuICAgICAgICAgICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tYXAuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRTdWJ3YXkoZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZmluZFN1YndheTogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgbGV0IGNvb3IgPSB7XHJcbiAgICAgICAgICAgIGxhdDplLmxhdExuZy5sYXQoKSxcclxuICAgICAgICAgICAgbG5nOmUubGF0TG5nLmxuZygpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm1hcmtlcil7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnNldE1hcChudWxsKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGUubGF0TG5nLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgIGxldCBtZXRyb0luZm8gPSB7fVxyXG4gICAgICAgIGxldCBtZXRyb0J5U3RuID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDczOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvTmFtZSA9IHRoaXMubWV0cm9baV0ubmFtZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkaWYgPSBNYXRoLnJvdW5kKGNhbGN1bGF0ZURpZihjb29yLHRoaXMubWV0cm9baV0uY29vcikpO1xyXG5cclxuICAgICAgICAgICAgaWYoZGlmPDcwMCl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMubWV0cm9baV0ubGluZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gdGhpcy5tZXRyb1tpXS5saW5lW2tdLnNsaWNlKDAsMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1ldHJvSW5mb1tsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjxtZXRyb0luZm9bbGluZV0uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvSW5mb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyb05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0luZm9bbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldHJvTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG1ldHJvQnlTdG5bbWV0cm9OYW1lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdLmxpbmUgPSBtZXRyb0J5U3RuW21ldHJvTmFtZV0ubGluZS5jb25jYXQodGhpcy5tZXRyb1tpXS5saW5lKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5tZXRyb1tpXS5saW5lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWV0QXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBsaW5lIGluIG1ldHJvSW5mbykge1xyXG4gICAgICAgICAgICBtZXRBcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bGluZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6bWV0cm9JbmZvW2xpbmVdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkaWY6bWV0cm9JbmZvW2xpbmVdLmRpZlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXRTdG5BcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gbWV0cm9CeVN0bikge1xyXG4gICAgICAgICAgICBtZXRTdG5BcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bWV0cm9CeVN0bltuYW1lXS5saW5lLFxyXG4gICAgICAgICAgICAgICAgbmFtZTpuYW1lLFxyXG4gICAgICAgICAgICAgICAgZGlmOm1ldHJvQnlTdG5bbmFtZV0uZGlmXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWV0QXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZGlmID4gYi5kaWYgPyAxIDogYS5kaWYgPCBiLmRpZiA/IC0xIDogMDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIG1ldFN0bkFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmRpZiA+IGIuZGlmID8gMSA6IGEuZGlmIDwgYi5kaWYgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3RpdGxlXCI+7Jet67OEPC9wPidcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19kaXZcIj4nXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRTdG5BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX3N0bk5hbWVcIj4nKyBtZXRTdG5BcnJheVtpXS5uYW1lICsgJ+yXrTwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fZGlmXCI+JysgTWF0aC5jZWlsKG1ldFN0bkFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTGluZVwiPidcclxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBtZXRTdG5BcnJheVtpXS5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihtZXRTdG5BcnJheVtpXS5saW5lW2tdLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTmFtZSBsbl8nK21ldFN0bkFycmF5W2ldLmxpbmVba10rJ1wiPicrbWV0U3RuQXJyYXlbaV0ubGluZVtrXSArICc8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICB0eHQrPSc8cCBjbGFzcz1cInN1YndheV9faW5mb19fdGl0bGVcIj7rhbjshKDrs4Q8L3A+J1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpdlwiPidcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2xpbmVcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lTmFtZSBsbl8nK21ldEFycmF5W2ldLmxpbmUrJ1wiPicrbWV0QXJyYXlbaV0ubGluZSArICc8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fZGlmXCI+JysgTWF0aC5jZWlsKG1ldEFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19zdG5OYW1lXCI+JysgbWV0QXJyYXlbaV0ubmFtZSArICfsl608L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgJChcIi5zdWJ3YXlfX2luZm9cIikuaHRtbCh0eHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdWJ3YXk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3N1YndheS5qcyIsImltcG9ydCBTZXRIb3RlbEluZm8gZnJvbSBcIi4vaG90ZWwvc2V0SG90ZWxJbmZvXCI7XHJcbmltcG9ydCBTZXRBcmVhIGZyb20gXCIuL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhXCI7XHJcblxyXG52YXIgSG90ZWwgPSB7XHJcblxyXG5cclxuICAgIC8vaW5mbGF0Ze2VmOuptCDtmLjthZTsnYQg66eM65Ok7Ja064K06riwIOychO2VnCDsoJXrs7Qg7IiY7KeRIOyDge2DnOqwgCDtkZzsi5zrkKggLT4gXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLm9uKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGVfc3RhdHVzKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuc3RhdHVzX19tYWtlX19ob3RlbFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSAkKHRoaXMpLmF0dHIoJ2NpZCcpO1xyXG4gICAgICAgICAgICB2YXIgY2l0eU5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcuc3RhdHVzX19jaXR5JykuaHRtbCgpO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIGNpdHlOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuaG90ZWxfX2FsZXJ0X19jb25maXJtXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChcIi5ob3RlbF9fYWxlcnRfX3dyYXBcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuaG90ZWxcIikub24oXCJjbGlja1wiLCBcIi5jaXR5QXJlYV9fZmluaXNoXCIsIGZ1bmN0aW9uICgpIHsgIC8vc2V0QXJlYeulvCDrgZ3rgrzrlYxcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykuYXR0cignY2lkJyk7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5vbmNlKCd2YWx1ZScsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhW2hpZF0uYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbaGlkXS5hcmVhID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2hpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5zZXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cy9hcmVhJykuc2V0KDIpO1xyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvc3RhdHVzL2FyZWEnKS5zZXQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jaXR5OiBmdW5jdGlvbihjaWQsIGNpdHlOYW1lKXtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgIHZhciBhbGVydE1vZGFsID0gJyc7XHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICBhbGVydE1vZGFsICs9ICAgICAnPGRpdiBjbGFzcz1cImhvdGVsX19hbGVydFwiPic7XHJcblxyXG4gICAgICAgICAgICBpZighZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7qtIDqtJHsp4Ag7KCV67O06rCAIOyVhOyngSDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7tjrjsnZjsi5zshKQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLnNwb3RzKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuc3BvdHMucmFua2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuq0gOq0keyngCDsoJXrs7TqsIAg7JWE7KeBIOygleumrOuQmOyngCDslYrslZjsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+6rSA6rSR7KeAIOygleuztOqwgCDslYTsp4Eg7KCV66as65CY7KeAIOyViuyVmOyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEubWV0cm8pIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7rjIDspJHqtZDthrUg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoIWRhdGEubWV0cm9MaW5lKXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7rjIDspJHqtZDthrUg7KCV67O06rCAIOygleumrOuQmOyngCDslYrslZjsirXri4jri6QobWV0cm9MaW5lIOyXhuydjCkuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEubG9jYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7tjrjsnZjsi5zshKQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLmFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7sp4Dsl63qtazrtoQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYgKCFkYXRhLnN0YXR1cy5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICBTZXRBcmVhLmluZmxhdGUoY2l0eU5hbWUsIGNpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdCgn7KeA7JetIOyEpOygleydhCDrqLzsoIAg7KeE7ZaJ7ZWp64uI64ukJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8ZGl2IGNsYXNzPVwiaG90ZWxfX2FsZXJ0X19jb25maXJtXCI+7ZmV7J24PC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzwvZGl2PjwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICBpZihjaGVjayl7XHJcbiAgICAgICAgICAgICAgICBTZXRIb3RlbEluZm8uaW5pdChkYXRhLCBjaWQsIGNpdHlOYW1lKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmhvdGVsXCIpLmFwcGVuZChhbGVydE1vZGFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX3N0YXR1czogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxoMj7siJnshowg66as7Iqk7Yq4PC9oMj4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+JztcclxuXHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwic3RhdHVzX19saW5lclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19uYW1lXCI+64+E7Iuc66qFPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19tYWtlXCI+7IiZ7IaMIOuNsOydtO2EsDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAgICAgICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj7quLDrs7gg7Zi47YWU642w7J207YSwPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19hcmVhXCI+7KeA7Jet7KCV67O0PC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19zcG90XCI+6rSA6rSR7KeA7KCV67O0PC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj7rjIDspJHqtZDthrXsoJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gY2l0eS5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJzdGF0dXNfX2xpbmVyXCI+JztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAgICAgICc8cCBjbGFzcz1cInN0YXR1c19fY2l0eVwiPicrY2l0eS5uYW1lKyc8L3A+JztcclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuaG90ZWwgPT09IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2VcIj7snojsnYw8L3A+JztcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19tYWtlIHN0YXR1c19fbWFrZV9faG90ZWxcIiAgY2lkPVwiJyArIGNpdHkuY29kZSArICdcIj7sl4bsnYwgKO2BtOumre2VtCDrp4zrk6TquLApPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoc3RhdHVzLmhvdGVsPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2hvdGVsXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoc3RhdHVzLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19hcmVhXCI+WDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMuc3BvdCA+IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19zcG90XCI+TzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19zcG90XCI+WDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fdHJhbnNwb3J0XCI+TzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5ob3RlbFwiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb3RlbDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC5qcyIsImltcG9ydCBTZXRBVE0gZnJvbSBcIi4vc2V0SG90ZWxJbmZvL3NldEFUTS5qc1wiO1xyXG5pbXBvcnQgU2V0Rm9vZCBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0Rm9vZC5qc1wiO1xyXG5cclxudmFyIFNldEhvdGVsSW5mbyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEsIGNpZCwgY2l0eU5hbWUpe1xyXG4gICAgICAgIC8vc3RhdHVzQ2hlY2sg7KeE7ZaJXHJcbiAgICAgICAgdmFyIGNoZWNrVHh0ID0gJyc7XHJcblxyXG4gICAgICAgIHZhciBob3RlbCA9IGRhdGEuaG90ZWxzW09iamVjdC5rZXlzKGRhdGEuaG90ZWxzKVswXV07XHJcblxyXG4gICAgICAgIHZhciBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgIGxvY2FsOiB7XHJcbiAgICAgICAgICAgICAgICBhdG06IHsgLy8wOiDrjbDsnbTthLAg7JeG7J2MLCAxOiDrp4zrk6Qg7IiYIOyeiOydjCwgMjog7KG07J6s7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzYTowLFxyXG4gICAgICAgICAgICAgICAgICAgIGNpdGk6MFxyXG4gICAgICAgICAgICAgICAgfSwgIFxyXG4gICAgICAgICAgICAgICAgZm9vZDogMCxcclxuICAgICAgICAgICAgICAgIG1ldHJvOiAwLFxyXG4gICAgICAgICAgICAgICAgc3BvdDowXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBhc3Nlc3NtZW50OiB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6MCxcclxuICAgICAgICAgICAgICAgIHNhZmV0eTowLFxyXG4gICAgICAgICAgICAgICAgdGhlbWU6MCxcclxuICAgICAgICAgICAgICAgIGNvbnZlbmllbmNlOjBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChob3RlbC5sb2NhbCkge1xyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwuYXRtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShob3RlbC5sb2NhbC5hdG0pKSB7IC8vVklTQSBBVE3snbQg7KCV66as65CY7KeAIOyViuydgCDtmJXtg5zroZwg65Ok7Ja06rCA7J6I64qUIOyDge2DnFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvL2F0beqwneyytOulvCDqsIDsp4Dqs6Ag7J6I64qUIOyDge2DnCAtIOuwmOuTnOyLnCB2aXNhIGF0beydtCDrk6TslrTqsIAg7J6I7Ja07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9IDI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5hdG0uY2l0aSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sb2NhbC5hdG0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS5jaXRpID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/spJHsmpQ6IENJVEnsnpHsl4XsnYAgVklTQeyekeyXhSDtm4Tsl5Ag7J2066Oo7Ja07KC47JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHsgLy9sb2NhbOyXkCBhdG3snbQg7JeG7J2MIC0+IOu5hOyekCDstpTstpzrkJwg7KCB7J20IOyXhuydjFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sb2NhbC5hdG0pIHsgLy/qt7gg6rK97Jqw7JeQ64+EIENJVEnripQgUkFX642w7J207YSw66GcIOyhtOyerO2VoCDsiJgg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS5jaXRpID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAvL+ykkeyalDogQ0lUSeyekeyXheydgCBWSVNB7J6R7JeFIO2bhOyXkCDsnbTro6jslrTsoLjslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5tZXRybykge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1ldHJvTGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5zcG90KSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zcG90cy5yYW5rZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLnZpc2EgPSAwOyAvL1ZJU0HripQg66y07KGw6rG0IO2YuO2FlCDroZzsu6zsl5Ag7KeB7KCRIOuTpOyWtOqwgOuvgOuhnCDtmLjthZQg66Gc7LusIOqyveuhnOqwgCDsl4bri6TripQg6rKD7J2AIFZJU0HqsIAg7JeG64uk64qUIOqygy5cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmF0bSkgeyAvL2NpdGnrgpggdmlzYeuKlCDtmLjthZQg66Gc7Lus7J20IOyVhOuLjCDrj4Tsi5wg66Gc7Lus7JeQIOyggOyepeuQoCDsiJgg7J6I7J2MLlxyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS5jaXRpID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubG9jYWwuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5tZXRyb0xpbmUpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5zcG90cy5yYW5rZWQpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hlY2tUeHQgKz0gJzxoMiBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3RpdGxlXCI+7Zi47YWUIOyjvOuzgOygleuztDwvaDI+JztcclxuXHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwuYXRtLnZpc2EgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwgVklTQSBBVE3soJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmF0bS52aXNhID09PSAxKSB7XHJcbiAgICAgICAgICAgIFNldEFUTS5pbml0KGRhdGEsIGNpZCk7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk1ha2luZyAtIFJBVyBWSVNBIEFUTeygleuztCDtmZXsnbguIO2YuO2FlOuzhOuhnCDqsIDsnqUg6rCA6rmM7Jq0IEFUTeqzvCAyNOyLnOqwhCBBVE3snYQg7LaU7Lac7ZWp64uI64ukLjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmF0bS52aXNhID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIFZJU0EgQVRN7KCV67O06rCAIOyXhuyKteuLiOuLpC4gVklTQSBBVE0gbG9jYXRvcuyXkOyEnCDsoJXrs7Trpbwg66i87KCAIO2BrOuhpOunge2VtOyjvOyEuOyalC48L3A+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwuYXRtLmNpdGkgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwgQ0lUSSBBVE3soJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmF0bS5jaXRpID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk1ha2luZyAtIFJBVyBDSVRJIEFUTeygleuztCDtmZXsnbguIOqwgOyepSDqsIDquYzsmrQgQ0lUSSBBVE3snYQg7LaU7Lac7ZWp64uI64ukLjwvcD4nO1xyXG4gICAgICAgIH0gLy8gY2l0aSBzdGF0dXMgMOydgCDsl4bsnYwuXHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwuZm9vZCA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCDsi53ro4ztkojsoJAv7Y647J2Y7KCQIOygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuZm9vZCA9PT0gMSkge1xyXG4gICAgICAgICAgICBTZXRGb29kLmluaXQoZGF0YSwgY2lkKTtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIOyLneujjO2SiOygkC/tjrjsnZjsoJAg7KCV67O0IO2ZleyduC4g7Zi47YWU67OE66GcIOqwgOq5jOyatCDsi53ro4ztkojsoJAg7LaU7LacLjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmZvb2QgPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0g64+E7IucIOyLneujjO2SiOygkC/tjrjsnZjsoJAg7KCV67O06rCAIOyXhuyKteuLiOuLpC4g66i87KCAIOygleuztOulvCDsnoXroKXtlbTso7zshLjsmpQuPC9wPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLm1ldHJvID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIOyngO2VmOyyoC/rjIDspJHqtZDthrUg7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5tZXRybyA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg7KeA7ZWY7LKgL+uMgOykkeq1kO2GtSDsoJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA6rmM7Jq0IOyngO2VmOyyoCDstpTstpwuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwubWV0cm8gPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0g64+E7IucIOyngO2VmOyyoC/rjIDspJHqtZDthrUg7KCV67O06rCAIOyXhuyKteuLiOuLpC4g66i87KCAIOygleuztOulvCDsnoXroKXtlbTso7zshLjsmpQuPC9wPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLnNwb3QgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwg6rSA6rSR7KeAIOygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuc3BvdCA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg6rSA6rSR7KeAIOygleuztCDtmZXsnbguIO2YuO2FlOuzhOuhnCDqsIDquYzsmrQg6rSA6rSR7KeAIOy2lOy2nC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5zcG90ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIOuPhOyLnCDqtIDqtJHsp4Ag7Iic7JyE6rCAIOyVhOyngSDtmZXsoJXrkJjsp4Ag7JWK7JWY7Iq164uI64ukLiDrqLzsoIAg7ZmV7J247ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coY2hlY2tUeHQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0SG90ZWxJbmZvO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldEFUTSA9IHtcclxuICAgIHN0YXRpc3RpYzoge1xyXG4gICAgICAgIG5lYXJlc3Q6W10sIC8v6rCA7J6lIOqwgOq5jOyatCBBVE3snYAg66qHIG0g6rGw66as7JeQIOyeiOuKlOyngCDrj4Tsi5wg7KCE7LK0IO2Pieq3oOydhCDrgrTquLAg7JyE7ZWcIOuNsOydtO2EsFxyXG4gICAgICAgIGJhbmsyNDpbXSwgICAvLzI07Iuc6rCEIOyatOyYge2VmOuKlCDsnYDtlokg7IaM7JygIOqxsOumrOyXkCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgICAgICBpbjEzMDpbXSAvL+uwmOqyvSAxMzBtIOuCtOyXkCBBVE3snbQg66qHIOqwnCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgIH0sXHJcbiAgICBieUFyZWE6IHt9LCAvL2luMTMwIHN0YXTsnYQg7KeA7Jet67OE66GcIO2Pieq3oOuCtOq4sCDsnITtlZwg6rCd7LK0XHJcblxyXG4gICAgZGF0YTp7fSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSwgY2lkKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5maXJzdF9ieUhvdGVscygpOyAvL+2YuO2FlOuTpOydhCDrj4zrqbAg6rCA7J6lIOqwgOq5jOyatCBBVE0sIOydgO2WieyGjOycoCAyNOyLnOqwhCBBVE0sIDEzMG3slYjsl5Ag66qHIOqwnCBBVE0g7J6I64qU7KeA66W8IOywvuyVhOuCtOqzoCDthrXqs4Tsl5Drj4Qg6riw66GdXHJcbiAgICAgICAgdGhpcy5zZWNvbmRfYnlBcmVhcygpOyAvL+yngOyXreuzhOuhnCAxMzBtIOuCtOyXkCDsnojripQgQVRNIOqwr+yImCDtj4nqt6DsnYQg64OEIC0+IOyngOyXrSDsg4Hsl4Ug67Cc7KCE64+E66W8IOuCmOykkeyXkCDssrTtgaztlZjquLAg7JyE7ZW0IOunjOuTpOyXiOydjC5cclxuICAgICAgICB0aGlzLnRoaXJkX21ha2VTdGF0cygpOyAvL2ZpcnN07JeQ7IScIOq4sOuhne2VnCDthrXqs4Qg64K07Jqp7J2EIOqwgOyngOqzoCDthrXqs4TqsJLrk6TsnYQg7IKw7Lac7ZW064OELlxyXG4gICAgICAgIHRoaXMuZm91cnRoX21ha2VSYW5rKCk7IC8v7Ya16rOE7JeQIOq4sOuhneuQnCDqsJLsnYQg67CU7YOV7Jy866GcIO2YuO2FlOuzhCBhdG3tjrjsnZjshLEg656t7YK57J2EIOqzhOyCsO2VqCjsmIgtQVRN6rCA6rmM7Jq0IOygleuPhOuKlCDribTsmpUg64K0IDfsnIQuLi4pXHJcbiAgICAgICAgdGhpcy5maWZ0aF9tYWtlU2NvcmUoKTtcclxuICAgICAgICB0aGlzLnNpeHRoX3dvcmRpbmcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgZmlyc3RfYnlIb3RlbHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGhvdGVscyA9IHRoaXMuZGF0YS5ob3RlbHM7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgaGlkIGluIGhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSBob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsKSB7IC8vaG90ZWwudGVtcOuhnCDrsJTqv4DqsoPsnoRcclxuICAgICAgICAgICAgICAgIHZhciBhdG1BcnIgPSBob3RlbC5sb2NhbC5hdG07XHJcbiAgICAgICAgICAgICAgICB2YXIgYXRtT2JqID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5lYXJlc3Q6IGF0bUFyclswXSxcclxuICAgICAgICAgICAgICAgICAgICBpbjEzMDogMCxcclxuICAgICAgICAgICAgICAgICAgICBiYW5rMjQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGF0bU9iai5uZWFyZXN0LmRpZiA9IGNhbGN1bGF0ZURpZihhdG1BcnJbMF0uY29vciwgaG90ZWwuY29vcik7IC8v7IiZ7IaM67OEIOqwgOyepSDqsIDquYzsmrQgYXRtIOuLtOydjFxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhdG1BcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0bUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXRtID0gYXRtQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlmID0gY2FsY3VsYXRlRGlmKGF0bS5jb29yLCBob3RlbC5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWYgPCAxMzAuMSkgeyAvL+yImeyGjOuzhCAxMzBt6rGw66asIGF0bSDqsK/siJgg7LK07YGsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdG1PYmouaW4xMzArKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhdG1PYmouYmFuazI0KSB7Ly/quLDrs7jsoIHsnLzroZwg6rGw66as7IicIOygleugrCDrkJjslrTsnojslrTshJwg7J2066+4IOuTpOyWtOqwgOyeiOycvOuptCDqt7jrhojsnbQg642UIOqwgOq5jOyatOuGiFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZiA8IDIzMCkgeyAvL+yImeyGjOuzhCDsnYDtlokg7IaM7JygIDI07Iuc6rCEIGF0bSDri7TsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGF0bS5vd25lci5pbmNsdWRlcyhcIkJBTktcIil8fGF0bS5wbGFjZU5hbWUuaW5jbHVkZXMoXCJCQU5LXCIpKSAmJiBhdG0uaXMyNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdG1PYmouYmFuazI0ID0gYXRtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdG1PYmouYmFuazI0LmRpZiA9IGRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy/thrXqs4Tsl5Ag6riw66Gd7ZWY6riwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLm5lYXJlc3QucHVzaChhdG1PYmoubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdG1PYmouYmFuazI0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLmJhbmsyNC5wdXNoKGF0bU9iai5iYW5rMjQuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5iYW5rMjQucHVzaCgyMzApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVyck5vKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5hdG0gPSBhdG1PYmo7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pbjEzMOydgCDtmLjthZTsnYQg7ZWcIOuyiCDri6Qg64+IIOuLpOydjOyXkCDthrXqs4Tsl5Ag6riw66Gd7ZWgIOyImCDsnojsnYxcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLmluMTMwLnB1c2goYXRtT2JqLmluMTMwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXSl7Ly/sp4Dsl63rs4QgYXRtIOuwgOynkeuPhOulvCDtmZXsnbjtlZjripQg6re465+wIOuFgOyEnVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnlBcmVhW2hvdGVsLmFyZWFdLnB1c2goYXRtT2JqLmluMTMwKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnlBcmVhW2hvdGVsLmFyZWFdID0gW2F0bU9iai5pbjEzMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoYFZJU0EgQVRNIOygleuztOqwgCDsl4bripQg7Zi47YWU7J20IOyeiOyKteuLiOuLpC4g7ZmV7J24IO2bhCDsnqzsi5zrj4TtlbTso7zshLjsmpRgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2Vjb25kX2J5QXJlYXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGFyZWEgPSB0aGlzLmRhdGEuYXJlYTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYoIWFyZWFbaV0ubm90QXJlYSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ5QXJlYVtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0bXMgPSB0aGlzLmJ5QXJlYVtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhdG1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bSArPSBhdG1zW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF0bXMubGVuZ3RoIDwgMTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW51cyA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhdG1zID0gKHN1bS8oYXRtcy5sZW5ndGgpICsgYXRtcy5sZW5ndGgvMTApICsgbWludXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJlYVtpXS5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwuYXRtID0gYXRtcy50b0ZpeGVkKDIpKjE7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdG06IGF0bXMudG9GaXhlZCgyKSoxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJlYVtpXS5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwuYXRtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bTogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGhpcmRfbWFrZVN0YXRzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBzdGF0ID0ge1xyXG4gICAgICAgICAgICBuZWFyZXN0OiAwLFxyXG4gICAgICAgICAgICBpbjEzMDogMCxcclxuICAgICAgICAgICAgYmFuazI0OiAwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gc3RhdCkge1xyXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLnN0YXRpc3RpY1tpZF0ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIHN1bSArPSB0aGlzLnN0YXRpc3RpY1tpZF1ba107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RhdFtpZF0gPSBzdW0vdGhpcy5zdGF0aXN0aWNbaWRdLmxlbmd0aDtcclxuICAgICAgICAgICAgc3RhdFtpZF0gPSBzdGF0W2lkXS50b0ZpeGVkKDIpKjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmRhdGEuc3RhdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5zdGF0LmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0LmxvY2FsLmF0bSA9IHN0YXQ7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0YXQubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRtOiBzdGF0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0ID0ge1xyXG4gICAgICAgICAgICAgICAgbG9jYWw6e2F0bTpzdGF0fVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZm91cnRoX21ha2VSYW5rOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRpc3RpYy5uZWFyZXN0LnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuICAgICAgICB0aGlzLnN0YXRpc3RpYy5iYW5rMjQuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xyXG4gICAgICAgIHRoaXMuc3RhdGlzdGljLmluMTMwLnNvcnQoKGEsIGIpID0+IGIgLSBhKTtcclxuXHJcbiAgICAgICAgdmFyIHRvdGFsID0gT2JqZWN0LmtleXModGhpcy5kYXRhLmhvdGVscykubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciBhdG0gPSBob3RlbC5sb2NhbC5hdG07XHJcbiAgICAgICAgICAgIHZhciByYW5rID0ge1xyXG4gICAgICAgICAgICAgICAgYmFuazI0OiB0b3RhbCxcclxuICAgICAgICAgICAgICAgIG5lYXJlc3Q6IHRvdGFsLFxyXG4gICAgICAgICAgICAgICAgaW4xMzA6IHRvdGFsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmFuaykge1xyXG4gICAgICAgICAgICAgICAgaWYoa2V5ID09PSBcImluMTMwXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF0bVtrZXldKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFua1trZXldID0gdGhpcy5zdGF0aXN0aWNba2V5XS5pbmRleE9mKGF0bVtrZXldKSsxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF0bVtrZXldKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFua1trZXldID0gdGhpcy5zdGF0aXN0aWNba2V5XS5pbmRleE9mKGF0bVtrZXldLmRpZikrMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihob3RlbC5yYW5rKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLnJhbmsuYXRtID0gcmFuaztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5yYW5rID0ge2F0bTpyYW5rfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlmdGhfbWFrZVNjb3JlOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB2YXIgc2NvcmVBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciBhdG0gPSBob3RlbC5yYW5rLmF0bTtcclxuICAgICAgICAgICAgdmFyIHdlaWdodCA9IENvbmZpZy5hdG0uc2NvcmUud2VpZ2h0XHJcbiAgICAgICAgICAgIHZhciBzY29yZSA9IChhdG0uYmFuazI0KndlaWdodC5iYW5rMjQgKyBhdG0ubmVhcmVzdCp3ZWlnaHQubmVhcmVzdCArIGF0bS5pbjEzMCp3ZWlnaHQuaW4xMzApO1xyXG5cclxuICAgICAgICAgICAgc2NvcmVBcnJheS5wdXNoKHtzY29yZTpzY29yZSxoaWQ6aGlkfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNjb3JlQXJyYXkuc29ydCgoYSwgYikgPT4gYS5zY29yZSAtIGIuc2NvcmUpOyAvL+uCruydhOyImOuhnSDsoovsnYxcclxuXHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5hdG0uc2NvcmUucGVyY2VudGlsZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBoaWQgPSBzY29yZUFycmF5W2ldLmhpZDtcclxuICAgICAgICAgICAgdmFyIHNjb3JlID0gMDtcclxuICAgICAgICAgICAgdmFyIHJhbmsgPSAoaSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoOS1qKSArIE1hdGguZmxvb3IoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC5zY29yZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5hdG0gPSBzY29yZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUgPSB7YXRtOnNjb3JlfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOnthdG06c2NvcmV9LFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmQ6e2F0bTpcIlwifVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGZjOiBmdW5jdGlvbih0eXBlLCBob3RlbCl7ICAgIC8vdGV4dCBmcm9tIGNvbmZpZ1xyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEuaG90ZWxzKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciByYW5rID0gMDtcclxuICAgICAgICBpZih0eXBlID09PSBcImludGVncmF0ZVwiKXtcclxuICAgICAgICAgICAgcmFuayA9IChob3RlbC5yYW5rLmF0bS5iYW5rMjQgLyB0b3RhbClcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmFuayA9IChob3RlbC5yYW5rLmF0bVt0eXBlXSAvIHRvdGFsKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IENvbmZpZy5hdG0ud29yZDtcclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgbGV0IGluU3RkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnW3R5cGVdLnN0ZC5sZW5ndGg7IGkrKykgeyAgIC8vbuu2hCDqsbDrpqzsl5Ag7J6I64ukLlxyXG4gICAgICAgICAgICBpZighaW5TdGQpe1xyXG4gICAgICAgICAgICAgICAgaWYocmFuayA8IGNvbmZpZ1t0eXBlXS5zdGRbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSBjb25maWdbdHlwZV0ud29yZFtpXVxyXG4gICAgICAgICAgICAgICAgICAgIGluU3RkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZighaW5TdGQpe1xyXG4gICAgICAgICAgICB0eHQgKz0gY29uZmlnW3R5cGVdLndvcmRbY29uZmlnW3R5cGVdLnN0ZC5sZW5ndGhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHR4dDtcclxuICAgIH0sXHJcblxyXG4gICAgc2l4dGhfd29yZGluZzogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICAgICAgdmFyIGF0bSA9IGhvdGVsLmxvY2FsLmF0bTtcclxuXHJcbiAgICAgICAgICAgIC8vIDEuIOqwgOyepSDqsIDquYzsmrQgQVRN7J20IDI07Iuc6rCEIOyYgeyXhe2VmOuKlCBBVE3snbTqsbDrgpgsIOqxsOumrCDssKjsnbTqsIAgNTBtIOydtOuCtOyduCDqsr3smrAgLT4gMjTsi5zqsIQgQVRNIOybjOuUqeycvOuhnCDthrXtlalcclxuICAgICAgICAgICAgLy8gMi4gMeydtCDslYTri5Ag6rK97JqwIOqwgOyepSDqsIDquYzsmrQgQVRN7J2AIOuPhOuztCDri6ggTuu2hOqxsOumrOyXkCDsnojqs6AsIDI07Iuc6rCEIOyYpO2UiCBBVE3rj4Qg64+E67O066GcIE7rtoTqsbDrpqzsl5Ag7J6I7Ja07IScIH5cclxuICAgICAgICAgICAgLy8gMy4g7J2A7ZaJ7IaM7JygIDI07Iuc6rCEIEFUTeydtCDsl4bripQg6rK97JqwIC0+IOqwgOyepSDqsIDquYzsmrQgQVRN7J2AIOuPhOuztCBO67aE6rGw66asLCDsnYDtlokg7IaM7JygIDI07Iuc6rCEIEFUTeydgCDsl4bsnYxcclxuXHJcbiAgICAgICAgICAgIGlmKGF0bS5iYW5rMjQpe1xyXG4gICAgICAgICAgICAgICAgaWYoYXRtLmJhbmsyNC5kaWYgPCBhdG0ubmVhcmVzdC5kaWYgKyA1MCl7IC8v7Iuc64KY66as7JikMVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihhdG0uYmFuazI0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ID0gYDI07Iuc6rCEIOyYgeyXhe2VmOuKlCDsnYDtlokg7IaM7JygIEFUTeydtCAke2RpZn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSB0aGlzLnRmYygnaW50ZWdyYXRlJywgaG90ZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNleyAvL+yLnOuCmOumrOyYpCAyXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGRpZlRvTWluKGF0bS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZjI0ID0gZGlmVG9NaW4oYXRtLmJhbmsyNC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSBg6rCA7J6lIOqwgOq5jOyatCBBVE3snYAg64+E67O0ICR7ZGlmfSDqsbDrpqzsl5Ag7J6I6rOgLCDsnYDtlonsnbQg7IaM7Jyg7ZWcIDI07Iuc6rCEIOyYpO2UiCBBVE3rj4Qg64+E67O0ICR7ZGlmMjR9YFxyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSB0aGlzLnRmYygnbmVhcmVzdCcsIGhvdGVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gZGlmVG9NaW4oYXRtLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgIHR4dCArPSBg6rCA7J6lIOqwgOq5jOyatCBBVE3snYAg64+E67O0ICR7ZGlmfSDqsbDrpqzsl5Ag7J6I7J2MLmBcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQud29yZCl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQuYXRtID0gdHh0O1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZCA9IHthdG06dHh0fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldEFUTTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0QVRNLmpzIiwiaW1wb3J0IEdlb0NvZGUgZnJvbSBcIi4uLy4uLy4uL21vZHVsZXMvZ2VvQ29kZS5qc1wiO1xyXG5pbXBvcnQgQ29uZmlnIGZyb20gXCIuLi9jb25maWcuanNcIjtcclxuXHJcbnZhciBTZXRGb29kID0ge1xyXG4gICAgZGF0YTp7fSxcclxuXHJcbiAgICBzdGF0aXN0aWM6e1xyXG4gICAgICAgIG5lYXJlc3Q6W10sXHJcbiAgICAgICAgaW4yNTA6W11cclxuICAgIH0sXHJcbiAgICBieUFyZWE6e30sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2lkKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIGlmKHRoaXMuZmlyc3RfZ2VvQ29kZShjaWQpKXsgICAgLy/sp4DsmKTsvZTrlKkg7ZWgIOqyjCDsl4bsnLzrqbQgc2Vjb25k67aA7YSwIOynhO2Wie2VqFxyXG4gICAgICAgICAgICB0aGlzLnNlY29uZF9zZXRGb29kKCk7ICAvL+yImeyGjOuzhOuhnCDsi53ro4ztkojsoJDrk6TsnYQg65WM66Ck64Sj7J2MXHJcbiAgICAgICAgICAgIHRoaXMudGhpcmRfYnlBcmVhcygpOyAvL+2GteqzhOqwkuydhCDrp4zrk6TslrTrg4RcclxuICAgICAgICAgICAgdGhpcy5mb3VydGhfbWFrZVN0YXRzKCk7IC8v7Ya16rOE6rCS7J2EIOunjOuTpOyWtOuDhCAtIGNpZC9zdGF0L2xvY2FsL2Zvb2Qg65286rOgIOuTpOyWtOqwiOqyg+yehFxyXG4gICAgICAgICAgICB0aGlzLmZpZnRoX21ha2VSYW5rKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmaWZ0aF9tYWtlUmFuazogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmVzdC5zb3J0KChhLCBiKSA9PiBhIC0gYik7XHJcbiAgICAgICAgdGhpcy5zdGF0aXN0aWMuaW4yNTAuc29ydCgoYSwgYikgPT4gYiAtIGEpO1xyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEuaG90ZWxzKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuXHJcbiAgICAgICAgICAgIC8vdG9kbzohISEhIGZvb2TripQg7KKF66WY6rCAIOyXrOufrOqwgOyngCDsnojquLAg65WM66y47JeQIGtleeqwkuuzhOuhnCDspJjslbwg7ZWoLiBTY29yZeyXkOyEnOuKlCBsYXJnZSDqt7zsspjsl5Ag7J6I64qUIOuFgOyEneunjCA57KCQ7J207IOB7J2EIOyjvOuKlOqyjCDsoovsnYTrk69cclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBmb29kID0gaG90ZWwubG9jYWwuZm9vZDtcclxuICAgICAgICAgICAgLy8gdmFyIHJhbmsgPSB7XHJcbiAgICAgICAgICAgIC8vICAgICBuZWFyZXN0OiB0b3RhbCxcclxuICAgICAgICAgICAgLy8gICAgIGluMjUwOiB0b3RhbFxyXG4gICAgICAgICAgICAvLyB9O1xyXG5cclxuICAgICAgICAgICAgLy8gZm9yICh2YXIga2V5IGluIHJhbmspIHtcclxuICAgICAgICAgICAgLy8gICAgIGlmKGtleSA9PT0gXCJpbjI1MFwiKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBpZihmb29kW2tleV0pe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICByYW5rW2tleV0gPSB0aGlzLnN0YXRpc3RpY1trZXldLmluZGV4T2YoZm9vZFtrZXldKSsxO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmKGZvb2Rba2V5XSl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJhbmtba2V5XSA9IHRoaXMuc3RhdGlzdGljW2tleV0uaW5kZXhPZihmb29kW2tleV0uZGlmKSsxO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGlmKGhvdGVsLnJhbmspe1xyXG4gICAgICAgICAgICAvLyAgICAgaG90ZWwucmFuay5mb29kID0gcmFuaztcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICBob3RlbC5yYW5rID0ge2Zvb2Q6cmFua307XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmb3VydGhfbWFrZVN0YXRzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBzdGF0ID0ge1xyXG4gICAgICAgICAgICBuZWFyZXN0OiAwLFxyXG4gICAgICAgICAgICBpbjI1MDowXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpZCBpbiBzdGF0KSB7XHJcbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMuc3RhdGlzdGljW2lkXS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgc3VtICs9IHRoaXMuc3RhdGlzdGljW2lkXVtrXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdGF0W2lkXSA9IHN1bS90aGlzLnN0YXRpc3RpY1tpZF0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBzdGF0W2lkXSA9IHN0YXRbaWRdLnRvRml4ZWQoMikqMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGF0YS5zdGF0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5kYXRhLnN0YXQubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0YXQubG9jYWwuZm9vZCA9IHN0YXQ7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0YXQubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vZDogc3RhdFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc3RhdCA9IHtcclxuICAgICAgICAgICAgICAgIGxvY2FsOntmb29kOnN0YXR9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB0aGlyZF9ieUFyZWFzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBhcmVhID0gdGhpcy5kYXRhLmFyZWE7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJlYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmKCFhcmVhW2ldLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ieUFyZWFbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb29kcyA9IHRoaXMuYnlBcmVhW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGZvb2RzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bSArPSBmb29kc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbnVzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZihmb29kcy5sZW5ndGggPCAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbnVzID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvb2RzID0gKHN1bS8oZm9vZHMubGVuZ3RoKSArIGZvb2RzLmxlbmd0aC8xMCkgKyBtaW51cztcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmVhW2ldLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbC5mb29kID0gZm9vZHMudG9GaXhlZCgyKSoxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vZDogZm9vZHMudG9GaXhlZCgyKSoxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJlYVtpXS5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwuZm9vZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb29kOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZWNvbmRfc2V0Rm9vZDogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciBpc1NvbWVGb29kID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB0eXBlIGluIHRoaXMuZGF0YS5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3JvQXJyID0gdGhpcy5kYXRhLmxvY2FsLmZvb2RbdHlwZV07XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RkID0gQ29uZmlnLmZvb2QubmVhclN0ZDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb29kID0gZ3JvQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoaG90ZWwuY29vciwgZm9vZC5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlmPHN0ZFt0eXBlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU29tZUZvb2QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb29kLmRpZiA9IGRpZjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmZvb2Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmZvb2RbdHlwZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5mb29kW3R5cGVdLnB1c2goZm9vZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmZvb2RbdHlwZV0gPSBbZm9vZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuZm9vZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmZvb2RbdHlwZV0gPSBbZm9vZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vZDp7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmZvb2RbdHlwZV0gPSBbZm9vZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFpc1NvbWVGb29kKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmZvb2QgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdHlwZSBpbiBob3RlbC5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZSAhPT0gXCJsYXJnZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuZm9vZFt0eXBlXS5zb3J0KChhLCBiKSA9PiBhLmRpZiAtIGIuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZXBBcnIgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG90ZWwubG9jYWwuZm9vZFt0eXBlXS5sZW5ndGg7IGkrKykgeyAgLy/quYrsnYAg67O17IKs66W8IOuwmOuTnOyLnCDtlbTslbztlahcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBob3RlbE9iaiA9IGhvdGVsLmxvY2FsLmZvb2RbdHlwZV1baV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZXAgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogaG90ZWxPYmouYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiBob3RlbE9iai5jb29yLmxhdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG5nOiBob3RlbE9iai5jb29yLmxuZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOmhvdGVsT2JqLmRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOmhvdGVsT2JqLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZXBBcnIucHVzaChkZWVwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW4yNTAgPSBkZWVwQXJyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmVzdC5wdXNoKGRlZXBBcnJbMF0uZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMuaW4yNTAucHVzaChpbjI1MCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXSl7Ly/sp4Dsl63rs4QgZm9vZCDrsIDsp5Hrj4Trpbwg7ZmV7J247ZWY64qUIOq3uOufsCDrhYDshJ1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnlBcmVhW2hvdGVsLmFyZWFdLnB1c2goaW4yNTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnlBcmVhW2hvdGVsLmFyZWFdID0gW2luMjUwXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRlZXBBcnIubGVuZ3RoPjUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVlcEFyci5sZW5ndGggPSA1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaG90ZWxzW2hpZF0ubG9jYWwuZm9vZFt0eXBlXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluMjUwOiBob3RlbC5sb2NhbC5mb29kW3R5cGVdLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXI1OiBkZWVwQXJyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDogZGVlcEFyclswXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpcnN0X2dlb0NvZGU6IGZ1bmN0aW9uKGNpZCl7XHJcbiAgICAgICAgdmFyIGdyb0FyciA9IHRoaXMuZGF0YS5sb2NhbC5mb29kLmdyb2Nlcnk7XHJcbiAgICAgICAgdmFyIGdlb0FyciA9IFtdO1xyXG4gICAgICAgIHZhciBpc0dlb05lZWRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgZ3JvY2VyeSA9IGdyb0FycltpXTtcclxuICAgICAgICAgICAgaWYoIWdyb2NlcnkuY29vcil7XHJcbiAgICAgICAgICAgICAgICBnZW9BcnIucHVzaCh7YWRkcmVzczpncm9jZXJ5LmFkZHJlc3MsIGFpZDppfSk7XHJcbiAgICAgICAgICAgICAgICBpc0dlb05lZWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoIWdyb2NlcnkuY29vci5sYXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGdlb0Fyci5wdXNoKHthZGRyZXNzOmdyb2NlcnkuYWRkcmVzcywgYWlkOml9KTtcclxuICAgICAgICAgICAgICAgICAgICBpc0dlb05lZWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNHZW9OZWVkZWQpe1xyXG4gICAgICAgICAgICB2YXIgcmVmID0gXCJjaXRpZXMvXCIrY2lkK1wiL2xvY2FsL2Zvb2QvZ3JvY2VyeVwiXHJcbiAgICAgICAgICAgIEdlb0NvZGUuaW5pdChnZW9BcnIsIHJlZik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0Rm9vZDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0Rm9vZC5qcyIsInZhciBTZXRBcmVhID0ge1xyXG4gICAgbWFwOnt9LFxyXG4gICAgbWFya2VyOnt9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uIChjaXR5TmFtZSwgY2lkKSB7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQpLm9uY2UoJ3ZhbHVlJywgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMubWFya2VyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcltoaWRdLnNldE1hcChudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1hcmtlciA9IHt9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHR4dCA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJoZWFkZXJcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxoMj4nICsgY2l0eU5hbWUgKyAnIOyImeyGjCDsp4Dsl60g6rWs67aEPC9oMj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImNpdHlBcmVhX193cmFwXCI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGlkPVwiY2l0eUFyZWFfX21hcFwiPjwvZGl2Pic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cIlwiY2l0eUFyZWE+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlBcmVhX193b3JkXCI+PC9wPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2lkPVwiJyArIGNpZCArICdcIiBjbGFzcz1cImNpdHlBcmVhX19maW5pc2hcIj7smYTro4zsspjrpqw8L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7IC8vY2xvc2Ugd3JhcHBlclxyXG5cclxuICAgICAgICAgICAgJChcIi5wYWdlcy5ob3RlbFwiKS5odG1sKHR4dCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eUFyZWFfX21hcCcpLCB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6IDQwLjc0MzE5NTc5MyxcclxuICAgICAgICAgICAgICAgICAgICBsbmc6IC03My45ODkxNzk1NFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHpvb206IDEzXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXJlYSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaGlkIGluIGRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG90ZWwgPSBkYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vQXJlYSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmFyZWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZighZGF0YS5hcmVhW2ldLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJlYUNvb3IgPSBkYXRhLmFyZWFbaV0uY29vcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0luQXJlYShob3RlbC5jb29yLCBhcmVhQ29vcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmFyZWEgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9BcmVhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVhW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm9BcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJbaGlkXSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogaG90ZWwuY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwOiB0aGlzLm1hcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICcnICsgaGlkXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJlYSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyBjaWQgKyAnL2hvdGVscycpLnVwZGF0ZShkYXRhLmhvdGVscyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXRBcmVhO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0QXJlYS5qcyJdLCJzb3VyY2VSb290IjoiIn0=