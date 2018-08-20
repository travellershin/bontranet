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
    metro: {
        nearStd: 750,

        score: {
            percentile: [0.15, 0.2, 0.25, 0.2, 0.1, 0.1] //9, 8, 7...점대의 백분위 비율 - 합계 1 되어야 함!!!
        }
    },

    laundry: {
        nearStd: 500,

        score: {
            percentile: [0.15, 0.2, 0.25, 0.2, 0.2] //9, 8, 7...점대의 백분위 비율 - 합계 1 되어야 함!!! - 없으면 5점 부여
        }
    },

    food: {
        kind: {
            bakery: { //일반적 베이커리 총칭
                name: "베이커리",
                type: "베이커리",
                josa: "가",
                std: 250 //얼마나 가까이 있어야 호텔 주변으로 인정하나
            },
            grocery: { //일반적 식료품점 총칭
                name: "식료품점",
                type: "식료품점",
                josa: "이",
                std: 250 //얼마나 가까이 있어야 호텔 주변으로 인정하나
            },
            seven: {
                name: "세븐일레븐",
                type: "편의점",
                josa: "이",
                std: 200 //얼마나 가까이 있어야 호텔 주변으로 인정하나
            },
            family: {
                name: "패밀리마트",
                type: "편의점",
                josa: "이",
                std: 200 //얼마나 가까이 있어야 호텔 주변으로 인정하나
            },
            lawson: {
                name: "로손",
                type: "편의점",
                josa: "이",
                std: 200 //얼마나 가까이 있어야 호텔 주변으로 인정하나
            },
            large: {
                name: "대형마트",
                type: "대형마트",
                josa: "가",
                multiple: 2, //이녀석이 주변에 있으면 2배 좋은놈 취급
                std: 500 //얼마나 가까이 있어야 호텔 주변으로 인정하나
            }
        },
        nearStd: { //얼마나 가까이 있어야 부근에 있는걸로 인정할것이냐
            large: 500,
            grocery: 250,
            cvs: 250,
            bakery: 250
        },
        score: {
            percentile: [0.15, 0.2, 0.25, 0.2, 0.1, 0.1], //9, 8, 7...점대의 백분위 비율 - 합계 1 되어야 함!!!

            weight: { //ATM 점수를 산출할 때 가중치(숫자 단위 무관)
                nearest: 3.5,
                in250: 1,
                large: 10
            }
        },

        word: {
            integrate: { //가장 가까운 food가 large(이거나 10m 미만 거리차이))
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

var _spot = __webpack_require__(6);

var _spot2 = _interopRequireDefault(_spot);

var _account = __webpack_require__(12);

var _account2 = _interopRequireDefault(_account);

var _subway = __webpack_require__(13);

var _subway2 = _interopRequireDefault(_subway);

var _hotel = __webpack_require__(14);

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

var _metroLine = __webpack_require__(5);

var _metroLine2 = _interopRequireDefault(_metroLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var City = {
    data: {},

    listener: function listener() {
        var that = this;

        $(".city").on("click", ".refresh", function () {
            that.refreshStatus();
        });

        $(".city").on("click", ".city__transport", function () {
            var cid = $(this).parent().attr("id");
            var status = that.data[cid].status;
            if (status.spot > 2 && status.transport > 0) {
                toast("대중교통 정보를 가공합니다.");
                _metroLine2.default.init(cid);
            } else {
                toast("대중교통 정보를 가공하기에 자료가 부족합니다.");
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

        if (confirm("데이터를 많이 잡아먹습니다! 정말 최신화하시겠습니까?")) {
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
var MetroLine = {
    init: function init(cid) {
        var _this = this;

        firebase.database().ref("cities/" + cid).once("value", function (snap) {
            var data = snap.val();
            _this.create(data, cid);
            if (_this.line[cid]) {
                _this.makeLine(cid);
            }
            firebase.database().ref("cities/" + cid + "/metroLine").set(_this.metroLine);
            console.log(_this.metroLine);
        });
    },

    makeLine: function makeLine(cid) {
        for (var line in this.metroLine) {
            var stnArr = this.metroLine[line].stn;

            var orderArr = [];

            if (this.line[cid][line]) {
                var start = this.line[cid][line][0];
                var end = this.line[cid][line][1];

                var idx = 0;
                for (var i = 0; i < stnArr.length; i++) {
                    var stn = stnArr[i];
                    if (stn.name === start) {
                        orderArr.push(stn);
                        idx = i;
                    }
                }
                stnArr.splice(idx, 1);

                var max = stnArr.length;
                for (var _i = 0; _i < max; _i++) {

                    var next = {
                        dif: 20000
                    };
                    var spliceIdx = 0;

                    for (var j = 0; j < stnArr.length; j++) {
                        var _stn = stnArr[j];
                        var target = orderArr[orderArr.length - 1];

                        var dif = calculateDif(target.coor, _stn.coor);
                        if (dif < next.dif) {
                            next = {
                                name: _stn.name,
                                coor: {
                                    lat: _stn.coor.lat,
                                    lng: _stn.coor.lng
                                },
                                dif: dif
                            };
                            spliceIdx = j;
                        }
                    }
                    orderArr.push(next);
                    stnArr.splice(spliceIdx, 1);
                }
            }
            this.metroLine[line].stn = orderArr;
        }
    },


    metroLine: {},

    line: {
        nyc: {
            1: ["Van Cortlandt Park - 242nd St", "South Ferry"],
            2: ["Wakefield - 241st St", "Brooklyn College - Flatbush Ave"],
            3: ["Harlem - 148 St", "New Lots Ave"],
            4: ["Woodlawn", "New Lots Ave"],
            5: ["Eastchester - Dyre Ave", "Brooklyn College - Flatbush Ave"],
            6: ["Pelham Bay Park", "Brooklyn Bridge - City Hall"],
            7: ["Flushing - Main St", "34th St - Hudson Yards"],
            A: ["Inwood - 207th St", "Rockaway Park - Beach 116 St"],
            B: ["Bedford Park Blvd", "Brighton Beach"],
            C: ["168th St", "Euclid Ave"],
            D: ["Norwood - 205th St", "Coney Island - Stillwell Av"],
            E: ["Jamaica Ctr - Parsons / Archer", "World Trade Center"],
            F: ["Jamaica - 179th St", "Coney Island - Stillwell Av"],
            G: ["Long Island City - Court Sq", "Church Ave"],
            J: ["Jamaica Ctr - Parsons / Archer", "Broad St"],
            L: ["14 Street / 8 Av", "Canarsie - Rockaway Pkwy"],
            M: ["Forest Hills - 71st Av", "Middle Village - Metropolitan Ave"],
            N: ["Astoria - Ditmars Blvd", "Coney Island - Stillwell Av"],
            Q: ["96th St", "Coney Island - Stillwell Av"],
            R: ["Forest Hills - 71st Av", "Bay Ridge - 95th St"],
            // S:["",""],  S선은 약간 셔틀같은자식임
            W: ["Astoria - Ditmars Blvd", "Whitehall St"],
            Z: ["Jamaica Ctr - Parsons / Archer", "Broad St"]
        }
    },

    create: function create(data, cid) {
        var spots = data.spots.ranked;
        var max = spots.length;
        if (max > 99) {
            max = 99;
        }

        var metros = data.local.metro;
        var metroLine = {};
        var tempLine = {};

        for (var j = 0; j < metros.length; j++) {
            var metro = metros[j];

            for (var i = 0; i < max; i++) {
                var hasSpot = false;
                var spot = spots[i];
                var dif = 600;
                var tempDif = 0;

                if (spot.enterance) {
                    for (var k = 0; k < spot.enterance.length; k++) {
                        var ent = spot.enterance[k];
                        tempDif = calculateDif(ent, metro.coor);
                        if (tempDif < dif) {
                            dif = tempDif;
                            hasSpot = true;
                        }
                    }
                }

                tempDif = calculateDif(spot.coor, metro.coor);
                if (tempDif < dif) {
                    dif = tempDif;
                    hasSpot = true;
                }

                if (hasSpot) {
                    for (var _k = 0; _k < metro.line.length; _k++) {
                        var _line = metro.line[_k];
                        if (!tempLine[_line]) {
                            tempLine[_line] = {};
                        }
                        if (tempLine[_line][i]) {
                            if (dif < tempLine[_line][i].dif) {
                                tempLine[_line][i] = { coor: spot.coor, rank: i, name: spot.name, dif: dif, stn: { coor: metro.coor, name: metro.name } };
                            }
                        } else {
                            tempLine[_line][i] = { coor: spot.coor, rank: i, name: spot.name, dif: dif, stn: { coor: metro.coor, name: metro.name } };
                        }
                    }
                }
            }
            for (var line in tempLine) {
                metroLine[line] = { spot: [], stn: [] };

                for (var rank in tempLine[line]) {
                    metroLine[line].spot.push(tempLine[line][rank]);
                }
            }
        }

        for (var _j = 0; _j < metros.length; _j++) {
            var _metro = metros[_j];
            for (var _i2 = 0; _i2 < _metro.line.length; _i2++) {
                var _line2 = _metro.line[_i2];

                if (metroLine[_line2]) {
                    metroLine[_line2].stn.push({
                        coor: _metro.coor,
                        name: _metro.name
                    });
                } else {
                    metroLine[_line2] = {
                        spot: [],
                        stn: [{
                            coor: _metro.coor,
                            name: _metro.name
                        }]
                    };
                }
            }
        }
        this.metroLine = metroLine;
    }
};

exports.default = MetroLine;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _first_check = __webpack_require__(7);

var _first_check2 = _interopRequireDefault(_first_check);

var _seond_combine = __webpack_require__(9);

var _seond_combine2 = _interopRequireDefault(_seond_combine);

var _third_finalize = __webpack_require__(10);

var _third_finalize2 = _interopRequireDefault(_third_finalize);

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

        //2차검증
        $(".spot").on("click", ".remove_spot", function () {
            _third_finalize2.default.remove_spot($(this).parent().attr("id"));
        });
        $(".spot").on("click", ".redo_remove", function () {
            _third_finalize2.default.redo_remove();
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
            var _cid = orderArray[i].cid;
            var _city = data[_cid];

            txt += '<div class="liner" id="' + _cid + '">';
            txt += '<p class="liner__cityName">' + _city.name + '</p>';
            txt += statusArray[_city.status.spot];
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
                } else {
                    //2차검증화면과 완료화면은 따로 차이가 없음
                    $(".header").html('<h2>' + cityName + ' 2차검증</h2>').attr('cid', cid).attr('cityName', cityName).addClass("cityName");
                    _third_finalize2.default.inflate(data);
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _autoCombine = __webpack_require__(8);

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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Second_combine = {};

exports.default = Second_combine;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(11);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Third_finalize = {
    temp: false,
    spotObj: {},

    remove_spot: function remove_spot(sid) {
        var cid = $(".cityName").attr("cid");
        var spotName = $("#" + sid).children(".result_name_ko").val();
        if (confirm(spotName + " \uAD00\uAD11\uC9C0\uB97C \uC81C\uAC70\uD569\uB2C8\uB2E4. \uD655\uC2E4\uD55C\uAC00\uC694?")) {
            this.temp = this.spotObj[sid];

            firebase.database().ref("cities/" + cid + "/spots/combined/" + sid).remove();
            toast("관광지가 제거되었습니다.");
        }
    },

    redo_remove: function redo_remove() {
        var cid = $(".cityName").attr("cid");
        var sid = this.temp.sid;
        firebase.database().ref("cities/" + cid + "/spots/combined/" + sid).set(this.temp);
        $(".redo_remove").remove();

        this.temp = false;
    },

    inflate: function inflate(data) {
        var cid = $(".cityName").attr("cid");
        $(".header").append('<p class="return">돌아가기</p>');

        if (this.temp) {
            $(".header").append('<p class="redo_remove">마지막 제거 취소</p>');
        }

        var spotObj = data.spots.combined;
        this.spotObj = spotObj;
        var rankArr = [];
        var spotTotal = Object.keys(spotObj).length;
        var txt = '';

        for (var sid in spotObj) {
            var spot = spotObj[sid];
            var score = 0;

            var individualArr = [];

            for (var _site in spot.rank) {
                var rank = spot.rank[_site];
                individualArr.push(rank);
                score -= rank;
            }

            individualArr.sort(function (a, b) {
                return a - b;
            });

            var minRank = individualArr[0];
            score += (spotTotal + 100 - minRank) * Math.sqrt(Math.sqrt(spotTotal));
            score -= minRank;

            if (individualArr.length === 1) {
                score -= spotTotal / 2;
                score -= minRank;
                if (spot.rank.nv) {
                    score += 50;
                }
            } else if (individualArr.length === 3) {
                score += spotTotal - minRank;
            } else if (individualArr.length === 4) {
                score += spotTotal;
            }

            rankArr.push({ sid: sid, score: score });
        }

        rankArr.sort(function (a, b) {
            return b.score - a.score;
        });

        for (var i = 0; i < rankArr.length; i++) {
            var _sid = rankArr[i].sid;
            var _spot = spotObj[_sid];
            var url = "";
            if (_spot.url) {
                url = _spot.url;
            }
            var ranking = {
                gg: "",
                nv: "",
                lp: "",
                ta: ""
            };
            for (var site in _spot.rank) {
                ranking[site] = _spot.rank[site];
            }
            txt += '<div class="result_box" id="' + _sid + '"><p class="result_rank">' + (i + 1) + '</p>';
            txt += '<input class="result_name_ko" value="' + _spot.name.ko + '">';
            txt += '<input class="result_name_en" value="' + _spot.name.en + '">';
            txt += '<input class="result_url" value="' + url + '">';
            txt += '<p class="result_gg">' + ranking.gg + '</p>';
            txt += '<p class="result_nv">' + ranking.nv + '</p>';
            txt += '<p class="result_lp">' + ranking.lp + '</p>';
            txt += '<p class="result_ta">' + ranking.ta + '</p>';
            txt += '<p class="result_save save_spot">저장</p>';
            txt += '<p class="result_remove remove_spot">삭제</p></div>';
        }

        $(".pages.spot .wrapper").html(txt);

        var pushArr = [];
        for (var _i = 0; _i < rankArr.length; _i++) {
            pushArr.push(spotObj[rankArr[_i].sid]);
        }
        // firebase.database().ref("cities/"+cid+"/spots/ranked").set(pushArr);
    }
};
exports.default = Third_finalize;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Config = {};

exports.default = Config;

/***/ }),
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setHotelInfo = __webpack_require__(15);

var _setHotelInfo2 = _interopRequireDefault(_setHotelInfo);

var _setArea = __webpack_require__(23);

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

                if (!data.local) {
                    alertModal += '<p>편의시설 정보가 없습니다.</p>';
                    check = false;
                } else {
                    if (!data.local.metro) {
                        alertModal += '<p>대중교통 정보가 없습니다.</p>';
                        check = false;
                    } else if (!data.metroLine) {
                        alertModal += '<p>대중교통 정보가 정리되지 않았습니다(metroLine 없음).</p>';
                        check = false;
                    }
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setATM = __webpack_require__(16);

var _setATM2 = _interopRequireDefault(_setATM);

var _setFood = __webpack_require__(17);

var _setFood2 = _interopRequireDefault(_setFood);

var _setMetro = __webpack_require__(18);

var _setMetro2 = _interopRequireDefault(_setMetro);

var _setSafety = __webpack_require__(19);

var _setSafety2 = _interopRequireDefault(_setSafety);

var _setLaundry = __webpack_require__(21);

var _setLaundry2 = _interopRequireDefault(_setLaundry);

var _setConvinience = __webpack_require__(22);

var _setConvinience2 = _interopRequireDefault(_setConvinience);

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

        _setLaundry2.default.init(data, cityName);

        if (status.local.metro === 2) {
            checkTxt += '<p class="hotel__status__txt">OK - 정리된 지하철/대중교통 정보 확인.</p>';
        } else if (status.local.metro === 1) {
            _setMetro2.default.init(data, cityName);
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

        _setSafety2.default.init(data, cityName);
        _setConvinience2.default.init(data, cityName);

        firebase.database().ref("cities/" + cid).set(data);

        console.log(checkTxt);
    }
};

exports.default = SetHotelInfo;

/***/ }),
/* 16 */
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
        this.fifth_makeScore();
        this.sixth_wording();
    },

    first_byHotels: function first_byHotels() {
        var hotels = this.data.hotels;

        for (var hid in hotels) {
            var hotel = hotels[hid];
            if (hotel.temp.atm) {
                var atmArr = hotel.temp.atm;
                var atmObj = {
                    nearest: { dif: 2000 },
                    in130: 0
                };

                for (var i = 0; i < atmArr.length; i++) {
                    var atm = atmArr[i];
                    var dif = calculateDif(atm.coor, hotel.coor);

                    if (dif < 130.1) {
                        //숙소별 130m거리 atm 갯수 체크
                        atmObj.in130++;
                    }

                    if (!atmObj.bank24) {
                        //기본적으로 거리순 정렬 되어있어서 이미 들어가있으면 그놈이 더 가까운놈
                        if (dif < atmObj.nearest.dif) {
                            //숙소별 은행 소유 24시간 atm 담음
                            if (atm.owner.includes("BANK") || atm.placeName.includes("BANK")) {
                                atmObj.nearest = atm;
                                atmObj.nearest.dif = dif;
                                delete atmObj.nearest.score;
                            }
                        }
                    }
                }
                //통계에 기록하기

                this.statistic.nearest.push(atmObj.nearest.dif);

                if (hotel.local) {
                    hotel.local.atm = atmObj;
                } else {
                    hotel.local = { atm: atmObj };
                }

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

    fifth_makeScore: function fifth_makeScore() {

        var scoreArray = [];

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var score = hotel.local.atm.nearest.dif;
            scoreArray.push({ score: score, hid: hid });
        }
        scoreArray.sort(function (a, b) {
            return a.score - b.score;
        }); //낮을수록 좋음


        var total = scoreArray.length;
        var rankSys = _config2.default.atm.score.percentile;

        for (var i = 0; i < scoreArray.length; i++) {
            var _hid = scoreArray[i].hid;
            var _score = 0;
            var rank = (i + 1) / total; // 백분위
            var percentile = 0;

            var isRanked = false;

            for (var j = 0; j < rankSys.length; j++) {
                if (!isRanked) {
                    var minus = percentile;
                    percentile += rankSys[j];

                    if (rank < percentile) {
                        //35% 안에 들면
                        rank -= minus; //rank를 0~0.2로 맞춰줌
                        _score = 10 - j - Math.ceil(rank / rankSys[j] * 10) / 10; //rank(0~0.2)를 0.2로 나눈값*10/10 -> 0~0.9가 나옴
                        isRanked = true;
                    }
                }
            }

            var _hotel = this.data.hotels[_hid];

            if (_hotel.assessment) {
                if (_hotel.assessment.score) {
                    _hotel.assessment.score.atm = _score;
                } else {
                    _hotel.assessment.score = { atm: _score };
                }
            } else {
                _hotel.assessment = {
                    score: { atm: _score },
                    word: { atm: "" }
                };
            }
        }
    },

    sixth_wording: function sixth_wording() {
        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var dif = difToMin(hotel.local.atm.nearest.dif);
            var txt = "\uAC00\uC7A5 \uAC00\uAE4C\uC6B4 \uC740\uD589 \uC18C\uC720 ATM\uC740 \uB3C4\uBCF4 " + dif + " \uAC70\uB9AC\uC5D0 \uC788\uC74C";

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
/* 17 */
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
        nearby: []
    },
    byArea: {},

    init: function init(data, cid) {
        this.data = data;
        if (this.first_geoCode(cid)) {
            //지오코딩 할 게 없으면 second부터 진행함
            this.second_setFood(); //숙소별로 식료품점들을 때려넣음
            this.third_byAreas(); //통계값을 만들어냄
            this.fourth_makeStats(); //통계값을 만들어냄 - cid/stat/local/food 라고 들어갈것임
            this.fifth_makeScore();
            this.sixth_wording();
        }
    },
    sixth_wording: function sixth_wording() {
        //!todo!!! 지금은 뉴욕 기준으로 되어있음 -> 도시별로 나누기(예-편의점 있는 도시용)

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var txt = '';

            if (hotel.local) {
                if (hotel.local.food) {
                    var food = hotel.local.food;
                    if (food.grocery) {
                        if (food.large) {
                            //둘 다 있는 케이스
                            var dif = difToMin(food.large.nearest.dif);
                            var josa = food.large.nearest.josa;
                            var name = food.large.nearest.name;
                            if (food.large.nearest.dif < food.grocery.nearest.dif + 50) {
                                txt = "\uAC01\uC885 \uC2DD\uB8CC\uD488\uC744 \uC0B4 \uC218 \uC788\uB294 \uB300\uD615 \uB9C8\uD2B8\uC778 " + name + josa + " \uB3C4\uBCF4 " + dif + " \uAC70\uB9AC\uC5D0 \uC788\uC74C";
                            } else {
                                var gdif = difToMin(food.grocery.nearest.dif);
                                txt = "\uAC04\uB2E8\uD55C \uBA39\uAC70\uB9AC\uB97C \uC0B4 \uC218 \uC788\uB294 \uC2DD\uB8CC\uD488\uC810\uC774 \uB3C4\uBCF4 " + gdif + " \uAC70\uB9AC\uC5D0 \uC788\uACE0, \uAC01\uC885 \uC74C\uC2DD\uB4E4\uC744 \uC0B4 \uC218 \uC788\uB294 \uB300\uD615 \uB9C8\uD2B8 " + name + josa + " \uB3C4\uBCF4 " + dif + " \uAC70\uB9AC\uC5D0 \uC788\uC74C";
                            }
                        } else {
                            //grocery만 있는 케이스
                            var _dif = difToMin(food.grocery.nearest.dif);
                            txt = "\uAC04\uB2E8\uD55C \uBA39\uAC70\uB9AC\uB97C \uC0B4 \uC218 \uC788\uB294 \uC2DD\uB8CC\uD488\uC810\uC774 \uB3C4\uBCF4 " + _dif + " \uAC70\uB9AC\uC5D0 \uC788\uC74C";
                        }
                    } else if (food.large) {
                        ///주변에 grocery는 없는데 large만 있는 특이케이스
                        var _dif2 = difToMin(food.large.nearest.dif);
                        var _name = food.large.nearest.name;
                        var _josa = food.large.nearest.josa;
                        txt = "\uAC01\uC885 \uC2DD\uB8CC\uD488\uC744 \uC0B4 \uC218 \uC788\uB294 \uB300\uD615 \uB9C8\uD2B8 " + _name + _josa + " \uB3C4\uBCF4 " + _dif2 + " \uAC70\uB9AC\uC5D0 \uC788\uC74C";
                    }
                } else {
                    txt = '식료품을 살 만한 곳은 주변 5분거리 이내에 없음';
                }
            } else {
                txt = '식료품을 살 만한 곳은 주변 5분거리 이내에 없음';
            }

            if (hotel.assessment.word) {
                hotel.assessment.word.food = txt;
            } else {
                hotel.assessment.word = { food: txt };
            }
        }
    },

    fifth_makeScore: function fifth_makeScore() {
        var scoreArray = [];
        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var score = 0;
            if (hotel.local) {
                if (hotel.local.food) {
                    for (var kind in hotel.local.food) {
                        var food = hotel.local.food[kind];
                        var nearestDif = food.nearest.dif;

                        score += _config2.default.food.kind[kind].std - nearestDif;
                        if (_config2.default.food.kind[kind].multiple) {
                            score = score * _config2.default.food.kind[kind].multiple;
                        }
                        score += food.nearby * 2;
                    }
                }
            }
            scoreArray.push({ score: score, hid: hid });
        }
        scoreArray.sort(function (a, b) {
            return b.score - a.score;
        }); //높을수록 좋음

        var total = scoreArray.length;

        var rankSys = _config2.default.food.score.percentile;

        for (var i = 0; i < scoreArray.length; i++) {
            var _hid = scoreArray[i].hid;
            var _score = 0;
            var rank = (i + 1) / total; // 백분위 - 0~1 (높을수록 0에 가까움)
            var percentile = 0;

            var isRanked = false;

            for (var j = 0; j < rankSys.length; j++) {
                if (!isRanked) {
                    var minus = percentile;
                    percentile += rankSys[j];

                    if (rank < percentile) {
                        //35% 안에 들면
                        rank -= minus; //rank를 0~0.2로 맞춰줌
                        _score = 10 - j - Math.ceil(rank / rankSys[j] * 10) / 10; //rank(0~0.2)를 0.2로 나눈값*10/10 -> 0~0.9가 나옴
                        isRanked = true;
                    }
                }
            }

            var _hotel = this.data.hotels[_hid];

            if (_hotel.assessment) {
                if (_hotel.assessment.score) {
                    _hotel.assessment.score.food = _score;
                } else {
                    _hotel.assessment.score = { food: _score };
                }
            } else {
                _hotel.assessment = {
                    score: { food: _score },
                    word: { food: "" }
                };
            }
        }
    },

    fourth_makeStats: function fourth_makeStats() {
        var stat = {
            nearest: 0,
            nearby: 0
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
                var std = _config2.default.food.kind[type].std;

                for (var i = 0; i < groArr.length; i++) {
                    var food = groArr[i];
                    var dif = calculateDif(hotel.coor, food.coor);

                    if (dif < std) {
                        isSomeFood = true;
                        food.dif = dif;
                        food.type = type;

                        if (hotel.temp) {
                            if (hotel.temp.food) {
                                if (hotel.temp.food[type]) {
                                    hotel.temp.food[type].push(food);
                                } else {
                                    hotel.temp.food[type] = [food];
                                }
                            } else {
                                hotel.temp.food = {};
                                hotel.temp.food[type] = [food];
                            }
                        } else {
                            hotel.temp = {
                                food: {}
                            };
                            hotel.temp.food[type] = [food];
                        }
                    }
                }
            }

            if (!isSomeFood) {
                hotel.temp.food = false;
            } else {
                var nearby = 0;
                var nearest = { dif: 999 };

                for (var _type in hotel.temp.food) {
                    hotel.temp.food[_type].sort(function (a, b) {
                        return a.dif - b.dif;
                    });

                    var foodArr = [];
                    for (var _i = 0; _i < hotel.temp.food[_type].length; _i++) {
                        var copy = $.extend(true, {}, hotel.temp.food[_type][_i]);
                        foodArr.push(copy);
                    }

                    nearby += foodArr.length;

                    if (foodArr[0].dif < nearest.dif) {
                        nearest = foodArr[0];
                    }

                    if (foodArr.length > 5) {
                        foodArr.length = 5;
                    }

                    if (hotel.local) {
                        if (hotel.local.food) {
                            hotel.local.food[_type] = {
                                nearby: hotel.temp.food[_type].length,
                                near5: foodArr,
                                nearest: foodArr[0]
                            };
                        } else {
                            hotel.local.food = {};
                            hotel.local.food[_type] = {
                                nearby: hotel.temp.food[_type].length,
                                near5: foodArr,
                                nearest: foodArr[0]
                            };
                        }
                    } else {
                        hotel.local = { food: {} };
                        hotel.local.local.food[_type] = {
                            nearby: hotel.temp.food[_type].length,
                            near5: foodArr,
                            nearest: foodArr[0]
                        };
                    }
                }

                if (this.byArea[hotel.area]) {
                    //지역별 food 밀집도를 확인하는 그런 녀석
                    this.byArea[hotel.area].push(nearby);
                } else {
                    this.byArea[hotel.area] = [nearby];
                }

                this.statistic.nearest.push(nearest.dif);
                this.statistic.nearby.push(nearby);
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SetMetro = {
    statistic: { nearest: [] },

    init: function init(data, cityName) {
        this.data = data;
        this.cityName = cityName;
        this.first_setMetro(); //숙소별로 지하철을 때려넣음
        this.second_byAreas();
        this.third_makeScore();
        this.fourth_wording();
    },

    fourth_wording: function fourth_wording() {

        var cityName = this.cityName;
        var totalLine = Object.keys(this.data.metroLine).length;

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var txtArr = [];

            var metro = hotel.local.metro;
            if (metro) {
                var nearestDif = difToMin(metro.nearest.dif);
                var nearestStn = metro.nearest.name;
                var lineNo = Object.keys(metro.byLine).length;
                var spotNo = Object.keys(metro.spot).length;
                var score = hotel.assessment.score.transport;
                var avgTime = difToMin(metro.avgDif);
                txtArr.push('\uC219\uC18C\uC5D0\uC11C \uAC00\uC7A5 \uAC00\uAE4C\uC6B4 \uC9C0\uD558\uCCA0\uC5ED\uC740 \uB3C4\uBCF4 ' + nearestDif + ' \uAC70\uB9AC\uC758 ' + nearestStn + '\uC5ED');
                txtArr.push('\uB3C4\uBCF4 10\uBD84\uAC70\uB9AC \uC774\uB0B4\uC5D0 ' + totalLine + '\uAC1C\uC758 ' + cityName + ' \uC804\uCCB4 \uC9C0\uD558\uCCA0 \uB178\uC120 \uC911 ' + lineNo + '\uAC1C \uB178\uC120\uC774 \uC9C0\uB0A8');
                txtArr.push(cityName + ' 100\uB300 \uAD00\uAD11\uC9C0 \uC911 ' + spotNo + '\uAC1C\uB97C \uC9C0\uD558\uCCA0 \uD658\uC2B9 \uC5C6\uC774 \uD3C9\uADE0 ' + avgTime + '\uC758 \uB3C4\uBCF4 \uC774\uB3D9\uC73C\uB85C \uBC29\uBB38 \uAC00\uB2A5');
                if (score > 8.9) {
                    txtArr.push('지하철을 이용해 관광하기 매우 편리한 대중교통의 최고 요지에 위치함');
                } else if (score > 7.9) {
                    txtArr.push('지하철을 이용해 관광하기 편리한 대중교통의 요지에 위치함');
                } else if (score > 6.9) {
                    txtArr.push('지하철을 이용해 관광하기 나쁘지 않은 위치에 있음');
                } else if (score > 5.9) {
                    txtArr.push('지하철을 이용해 관광하기에 아주 좋은 위치는 아님');
                } else {
                    txtArr.push('대중교통 편의성은 약간 낮은 편으로, 관광이 조금 불편할 수 있음');
                }
            } else {
                hotel.assessment.score.transport = 4;
                txtArr = ["이 숙소 도보 15분 이내 거리에 지하철 역이 없어서 대중교통을 이용하기 불편할 수 있음"];
            }
            hotel.assessment.word.transport = txtArr;
        }
    },

    third_makeScore: function third_makeScore() {
        var scoreArray = [];
        //1개 관광지를 갈 수 있을 때마다 1800 - dif합계(호텔에서, 내려서)점만큼 추가

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var metro = hotel.local.metro;
            var spots = this.data.spots.ranked;
            var score = 0;
            var metroLineObj = this.data.metroLine;
            var spotObj = {};

            if (metro) {
                metro.spot = [];
                for (var lineName in metro.byLine) {
                    var line = metro.byLine[lineName];
                    var difHotel = line.dif;
                    for (var i = 0; i < metroLineObj[lineName].spot.length; i++) {
                        var spot = metroLineObj[lineName].spot[i];
                        var difSpot = spot.dif;
                        if (spotObj[spot.rank]) {
                            if (difSpot + difHotel < spotObj[spot.rank].dif) {
                                spotObj[spot.rank] = { dif: difSpot + difHotel, line: lineName };
                            }
                        } else {
                            spotObj[spot.rank] = { dif: difSpot + difHotel, line: lineName };
                        }
                    }
                }
                var avg = 0;

                for (var rank in spotObj) {
                    score += 1800 - spotObj[rank].dif;
                    avg += spotObj[rank].dif;
                    var hotelSpot = {
                        coor: spots[rank].coor,
                        line: spotObj[rank].line,
                        name: spots[rank].name,
                        spotMetroName: spots[rank].metroInfo[spotObj[rank].line].name,
                        rank: rank
                    };
                    metro.spot.push(hotelSpot);
                }
                avg = Math.round(avg / Object.keys(spotObj).length);
                metro.avgDiftoSpot = avg;
                scoreArray.push({ hid: hid, score: score });
            }
        }

        scoreArray.sort(function (a, b) {
            return b.score - a.score;
        });

        var total = scoreArray.length;

        var rankSys = _config2.default.metro.score.percentile;

        for (var _i = 0; _i < scoreArray.length; _i++) {
            var _hid = scoreArray[_i].hid;
            var _score = 0;
            var _rank = (_i + 1) / total; // 백분위 - 0~1 (높을수록 0에 가까움)
            var percentile = 0;

            var isRanked = false;

            for (var j = 0; j < rankSys.length; j++) {
                if (!isRanked) {
                    var minus = percentile;
                    percentile += rankSys[j];

                    if (_rank < percentile) {
                        //35% 안에 들면
                        _rank -= minus; //rank를 0~0.2로 맞춰줌
                        _score = 10 - j - Math.ceil(_rank / rankSys[j] * 10) / 10; //rank(0~0.2)를 0.2로 나눈값*10/10 -> 0~0.9가 나옴
                        isRanked = true;
                    }
                }
            }

            var _hotel = this.data.hotels[_hid];

            if (_hotel.assessment) {
                if (_hotel.assessment.score) {
                    _hotel.assessment.score.transport = _score;
                } else {
                    _hotel.assessment.score = { transport: _score };
                }
            } else {
                _hotel.assessment = {
                    score: { transport: _score },
                    word: { transport: "" }
                };
            }
        }
    },

    second_byAreas: function second_byAreas() {
        //다른 local들과는 달리 지하철 역을 Area별로 나눔 - 지역별로 어떤 노선들이 지나가는지 체크;
        var areaArr = this.data.area;
        var metroArr = this.data.local.metro;

        for (var i = 0; i < areaArr.length; i++) {
            var area = areaArr[i];
            if (!area.notArea) {
                for (var j = 0; j < metroArr.length; j++) {
                    var metro = metroArr[j];
                    if (isInArea(metro.coor, area.coor)) {
                        for (var k = 0; k < metro.line.length; k++) {
                            var line = metro.line[k];

                            if (area.local) {
                                if (area.local.metro) {
                                    if (area.local.metro[line]) {
                                        area.local.metro[line]++;
                                    } else {
                                        area.local.metro[line] = 1;
                                    }
                                } else {
                                    area.local.metro = {};
                                    area.local.metro[line] = 1;
                                }
                            } else {
                                area.local = { metro: {} };
                                area.local.metro[line] = 1;
                            }
                        }
                    }
                }
            }
        }
    },

    first_setMetro: function first_setMetro() {
        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            if (hotel.local) {
                hotel.local.metro = {
                    nearest: { dif: _config2.default.metro.nearStd },
                    near: [],
                    byLine: {}
                };
            }

            var metroArr = this.data.local.metro;
            var byLine = hotel.local.metro.byLine;
            var hasMetro = false;

            for (var i = 0; i < metroArr.length; i++) {
                var metro = metroArr[i];
                var dif = calculateDif(hotel.coor, metro.coor);

                if (dif < _config2.default.metro.nearStd) {
                    hasMetro = true;
                    var metro_c = {
                        coor: metro.coor,
                        line: metro.line,
                        name: metro.name,
                        dif: dif.toFixed(0) * 1
                    };
                    hotel.local.metro.near.push(metro_c);

                    if (dif < hotel.local.metro.nearest.dif) {
                        hotel.local.metro.nearest = metro_c;
                    }

                    for (var j = 0; j < metro.line.length; j++) {
                        var line = metro.line[j];

                        if (byLine[line]) {
                            if (byLine[line].dif > metro_c.dif) {
                                byLine[line] = metro_c;
                            }
                        } else {
                            byLine[line] = metro_c;
                        }
                    }
                }
            }

            if (hasMetro) {
                this.statistic.nearest.push(hotel.local.metro.nearest.dif);
            } else {
                hotel.local.metro = false;
            }
        }
    }
};

exports.default = SetMetro;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _safety = __webpack_require__(20);

var _safety2 = _interopRequireDefault(_safety);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SetSafety = {
    init: function init(data, cityName) {
        console.log(data);
        this.first_fromArea(data, cityName);
    },

    first_fromArea: function first_fromArea(data, cityName) {
        var scoreArray = [];

        var areas = data.area;
        var hotels = data.hotels;
        for (var hid in hotels) {
            var hotel = hotels[hid];
            hotel.assessment.word.safety = [];
            var word = hotel.assessment.word.safety;

            var score = 0;

            //AREA로 인한 치안
            var area = areas[hotel.area];
            score += area.safety.score * 3;
            var config_word = _safety2.default.word[area.safety.score];
            if (area.safety.score > 3 && area.safety.misdemeanor < 3) {
                config_word = _safety2.default.word[6]; //치안은 좋지만 경범죄율이 좀 높음
            }
            word.push("" + cityName + config_word + " " + area.name + " \uC9C0\uC5ED\uC5D0 \uC704\uCE58\uD558\uACE0 \uC788\uC74C");

            //METRO로 인한 치안
            if (hotel.local.metro) {
                var metro = hotel.local.metro;
                var dif = metro.nearest.dif;
                var min = difToMin(dif);
                var condif = _safety2.default.metDif;
                var noDif = true;

                for (var i = 0; i < condif.length; i++) {
                    var metDif = condif[i].std;
                    var metWord = condif[i].word;
                    if (noDif) {
                        if (dif < metDif * 1) {
                            noDif = false;
                            score += condif[i].score;
                            word.push("\uAC00\uC7A5 \uAC00\uAE4C\uC6B4 \uC9C0\uD558\uCCA0 \uC5ED\uC740 \uB3C4\uBCF4 " + min + " \uAC70\uB9AC" + metWord);
                        }
                    }
                }
            }

            //유동인구로 인한 치안
            var floatScore = hotel.assessment.score.transport + hotel.assessment.score.food + hotel.assessment.score.atm;
            var minSpotDif = 150;

            for (var _i = 0; _i < data.spots.ranked.length; _i++) {
                var spot = data.spots.ranked[_i];
                var _dif = calculateDif(spot.coor, hotel.coor);
                if (_dif < minSpotDif) {
                    minSpotDif = _dif;
                }
            }
            if (minSpotDif < 50) {
                floatScore += 3;
            } else if (minSpotDif < 100) {
                floatScore += 2;
            } else if (minSpotDif < 150) {
                floatScore += 1;
            }

            var float = _safety2.default.floating;
            var notYet = true;

            for (var _i2 = 0; _i2 < float.length; _i2++) {
                var std = float[_i2].std;
                var floatWord = float[_i2].word;
                if (notYet) {
                    if (floatScore > std) {
                        notYet = false;
                        score += float[_i2].score;
                        word.push("" + cityName + floatWord);
                    }
                }
            }

            var final = _safety2.default.finalSafety;
            notYet = true;

            for (var _i3 = 0; _i3 < final.length; _i3++) {
                var _std = final[_i3].std;
                var finalWord = final[_i3].word;
                if (notYet) {
                    if (score > _std) {
                        notYet = false;
                        word.push("" + finalWord);
                    }
                }
            }
            scoreArray.push({ hid: hid, score: score });
        }

        scoreArray.sort(function (a, b) {
            return b.score - a.score;
        });

        var total = scoreArray.length;

        var rankSys = _safety2.default.score.percentile;

        for (var _i4 = 0; _i4 < scoreArray.length; _i4++) {
            var _hid = scoreArray[_i4].hid;
            var _score = 0;
            var rank = (_i4 + 1) / total; // 백분위 - 0~1 (높을수록 0에 가까움)
            var percentile = 0;

            var isRanked = false;

            for (var j = 0; j < rankSys.length; j++) {
                if (!isRanked) {
                    var minus = percentile;
                    percentile += rankSys[j];

                    if (rank < percentile) {
                        //35% 안에 들면
                        rank -= minus; //rank를 0~0.2로 맞춰줌
                        _score = 10 - j - Math.ceil(rank / rankSys[j] * 10) / 10; //rank(0~0.2)를 0.2로 나눈값*10/10 -> 0~0.9가 나옴
                        isRanked = true;
                    }
                }
            }

            var _hotel = data.hotels[_hid];
            _hotel.assessment.score.safety = _score;
        }
    }
};

exports.default = SetSafety;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Config_Safety = {
    score: {
        percentile: [0.15, 0.2, 0.25, 0.2, 0.1, 0.1] //9, 8, 7...점대의 백분위 비율 - 합계 1 되어야 함!!!
    },

    word: [//area관련 word
    "", //score 0점은 없으므로 비워둠
    "에서 치안이 나쁜 편에 속하는", //1점
    "에서 치안이 좋지는 않은 편인", //2점
    " 평균적인 치안 수준을 보이는", //3점
    "에서 치안이 좋은 편인", //4점
    "에서 치안이 매우 좋은 편인", //5점
    "에서 치안은 좋은 편에 속하지만 경범죄율이 조금 높은 편인" //특수
    ],

    metDif: [{
        std: 150, //거리가 150 미만일 경우
        word: "에 위치해 굉장히 가까움", //요렇게 설명하고
        score: 6 //7점을 부여함
    }, {
        std: 220,
        word: "로 매우 가까운 편",
        score: 5
    }, {
        std: 300,
        word: "에 있음",
        score: 4
    }, {
        std: 400,
        word: "에 있음",
        score: 3
    }, {
        std: 500,
        word: "로 약간 떨어져 있는 편",
        score: 2
    }, {
        std: 1500,
        word: "로 상당히 떨어져 있는 편",
        score: 1
    }],

    floating: [//atm, food, transport 합계 + 주변 관광지 보너스(50m이내 - 3점만점, 150m 1점);
    {
        std: 27,
        word: "내 다른 지역 대비 주변 유동인구가 상당히 많은 편",
        score: 6.5
    }, {
        std: 25.5,
        word: "내 다른 지역 대비 주변 유동인구가 꽤 많은 편",
        score: 5
    }, {
        std: 24,
        word: "내 다른 지역 대비 주변 유동인구가 조금 많은 편",
        score: 4
    }, {
        std: 21,
        word: "내 평균 수준의 유동인구 수준을 보임",
        score: 3
    }, {
        std: 18,
        word: "내 다른 지역 대비 주변 유동인구가 약간 적은 편",
        score: 2.5
    }, {
        std: 15,
        word: "내 다른 지역 대비 주변 유동인구가 적은 편",
        score: 2.25
    }, {
        std: 5,
        word: "내 다른 지역 대비 주변 유동인구가 상당히 적은 편",
        score: 2
    }],

    finalSafety: [//score*3 + metDif + floating
    {
        std: 20, //예, 지역 4점, 나머지 평균, 지역 5점, 나머지 최악은 아닌 수준
        word: "조심한다면 밤 늦게 귀가할 때에도 안전한 위치"
    }, {
        std: 18, //예, 지역 3점, 나머지 모두 중상위권, 지역 4점, 나머지 낮지 않음
        word: "조심한다면 늦은 시간 귀가할 때에도 큰 문제는 없음"
    }, {
        std: 16, //예, 지역 4점, 나머지 최악은 아님, 지역 3점, 나머지 중간 이상, 지역 2점 나머지 최상
        word: "늦은 밤을 피한다면 일반적으로 저녁에 귀가할 때 큰 문제는 없음"
    }, {
        std: 13.5, //지역 3점, 나머지 최악, 지역 2점
        word: "조심히 다닐 필요가 있으며, 늦은 밤에 귀가하는 것은 삼가는 것이 좋음"
    }, {
        std: 11, //지역 2점 나머지 낮은 편, 지역 1점 나머지 중간 이상
        word: "해 진 이후에는 돌아다니는 것을 삼가는 것이 좋음"
    }, {
        std: 9, //지역 1점 
        word: "낮에도 안전에 유의하며 다니는 것이 좋음"
    }, {
        std: 4,
        word: "치안 문제가 중요하다면 숙소 위치로 적합한 지역이 아님"
    }]
};

exports.default = Config_Safety;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SetLaundry = {
    statistic: { nearest: [] },

    init: function init(data, cityName) {
        this.data = data;
        this.cityName = cityName;
        this.first_setLaundry();
        this.second_makeScore();
        this.third_wording();
    },

    third_wording: function third_wording() {
        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var laundry = hotel.local.laundry;

            if (laundry) {
                var dif = difToMin(laundry.nearest.dif);
                hotel.assessment.word.laundry = "\uC219\uC18C\uC5D0\uC11C \uB3C4\uBCF4 " + dif + " \uAC70\uB9AC\uC5D0 \uC138\uD0C1\uC18C\uAC00 \uC788\uC74C";
            } else {
                hotel.assessment.word.laundry = '숙소 도보 10분거리 이내에 세탁소는 존재하지 않아 긴 여행시 불편할 수 있음';
            }
        }
    },

    second_makeScore: function second_makeScore() {
        var scoreArray = [];

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var laundry = hotel.local.laundry;

            if (laundry) {
                var score = 500 - laundry.nearest.dif;
                scoreArray.push({ hid: hid, score: score });
            }
        }

        scoreArray.sort(function (a, b) {
            return b.score - a.score;
        });

        var total = scoreArray.length;

        var rankSys = _config2.default.laundry.score.percentile;

        for (var i = 0; i < scoreArray.length; i++) {
            var _hid = scoreArray[i].hid;
            var _score = 0;
            var rank = (i + 1) / total; // 백분위 - 0~1 (높을수록 0에 가까움)
            var percentile = 0;

            var isRanked = false;

            for (var j = 0; j < rankSys.length; j++) {
                if (!isRanked) {
                    var minus = percentile;
                    percentile += rankSys[j];

                    if (rank < percentile) {
                        //35% 안에 들면
                        rank -= minus; //rank를 0~0.2로 맞춰줌
                        _score = 10 - j - Math.ceil(rank / rankSys[j] * 10) / 10; //rank(0~0.2)를 0.2로 나눈값*10/10 -> 0~0.9가 나옴
                        isRanked = true;
                    }
                }
            }

            var _hotel = this.data.hotels[_hid];

            if (_hotel.assessment) {
                if (_hotel.assessment.score) {
                    _hotel.assessment.score.laundry = _score;
                } else {
                    _hotel.assessment.score = { laundry: _score };
                }
            } else {
                _hotel.assessment = {
                    score: { laundry: _score },
                    word: { laundry: "" }
                };
            }
        }

        for (var _hid2 in this.data.hotels) {
            var _hotel2 = this.data.hotels[_hid2];
            var _laundry = _hotel2.local.laundry;

            if (!_laundry) {
                if (_hotel2.assessment) {
                    if (_hotel2.assessment.score) {
                        _hotel2.assessment.score.laundry = 5;
                    } else {
                        _hotel2.assessment.score = { laundry: 5 };
                    }
                } else {
                    _hotel2.assessment = {
                        score: { laundry: 5 },
                        word: { laundry: "" }
                    };
                }
            }
        }
    },

    first_setLaundry: function first_setLaundry() {
        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            if (hotel.local) {
                hotel.local.laundry = {
                    nearest: { dif: _config2.default.laundry.nearStd }
                };
            }

            var ldArr = this.data.local.laundry;
            var hasLD = false;

            for (var i = 0; i < ldArr.length; i++) {
                var laundry = ldArr[i];
                var dif = calculateDif(hotel.coor, laundry.coor);

                if (dif < _config2.default.laundry.nearStd) {
                    hasLD = true;
                    var laundry_c = {
                        coor: laundry.coor,
                        name: laundry.name,
                        dif: dif.toFixed(0) * 1
                    };
                    if (dif < hotel.local.laundry.nearest.dif) {
                        hotel.local.laundry.nearest = laundry_c;
                    }
                }
            }
            if (!hasLD) {
                hotel.local.laundry = false;
            } else {
                this.statistic.nearest.push(hotel.local.laundry.nearest.dif);
            }
        }
    }
};

exports.default = SetLaundry;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SetConvinience = {
    init: function init(data, cityName) {
        var scoreArray = [];
        for (var hid in data.hotels) {
            var hotel = data.hotels[hid];

            var score = 0;
            var word = [];

            for (var type in hotel.assessment.score) {
                if (type === "safety" || type === "transport") {} else {
                    var indiWord = hotel.assessment.word[type];
                    var indiScore = hotel.assessment.score[type];
                    word.push(indiWord);
                    score += indiScore;
                    delete hotel.assessment.score[type];
                    delete hotel.assessment.word[type];
                }
            }
            scoreArray.push({ hid: hid, score: score });
            hotel.assessment.word.convinience = word;
        }

        scoreArray.sort(function (a, b) {
            return b.score - a.score;
        });

        var total = scoreArray.length;
        var rankSys = _config2.default.atm.score.percentile;

        for (var i = 0; i < scoreArray.length; i++) {
            var _hid = scoreArray[i].hid;
            var _score = 0;
            var rank = (i + 1) / total; // 백분위
            var percentile = 0;

            var isRanked = false;

            for (var j = 0; j < rankSys.length; j++) {
                if (!isRanked) {
                    var minus = percentile;
                    percentile += rankSys[j];

                    if (rank < percentile) {
                        //35% 안에 들면
                        rank -= minus; //rank를 0~0.2로 맞춰줌
                        _score = 10 - j - Math.ceil(rank / rankSys[j] * 10) / 10; //rank(0~0.2)를 0.2로 나눈값*10/10 -> 0~0.9가 나옴
                        isRanked = true;
                    }
                }
            }

            var _hotel = data.hotels[_hid];
            _hotel.assessment.score.convinience = _score;

            if (_score > 9) {
                _hotel.assessment.word.convinience.push(cityName + " \uB0B4 \uB2E4\uB978 \uC219\uC18C\uB4E4 \uB300\uBE44 \uC8FC\uBCC0 \uD3B8\uC758\uC2DC\uC124\uC774 \uAD49\uC7A5\uD788 \uC798 \uD615\uC131\uB418\uC5B4 \uD3B8\uB9AC\uD558\uAC8C \uC5EC\uD589\uD560 \uC218 \uC788\uC74C");
            } else if (_score > 8) {
                _hotel.assessment.word.convinience.push(cityName + " \uB0B4 \uB2E4\uB978 \uC219\uC18C\uB4E4 \uB300\uBE44 \uC8FC\uBCC0 \uD3B8\uC758\uC2DC\uC124\uC774 \uC798 \uD615\uC131\uB41C \uD3B8\uC774\uB77C \uD3B8\uB9AC\uD558\uAC8C \uC5EC\uD589\uD560 \uC218 \uC788\uC74C");
            } else if (_score > 7) {
                _hotel.assessment.word.convinience.push(cityName + " \uB0B4\uC5D0\uC11C \uC8FC\uBCC0 \uD3B8\uC758\uC2DC\uC124\uC740 \uD3C9\uADE0 \uC774\uC0C1 \uC815\uB3C4\uB85C \uC798 \uAC16\uCD94\uC5B4\uC838 \uC788\uC74C");
            } else if (_score > 6) {
                _hotel.assessment.word.convinience.push(cityName + " \uB0B4\uC5D0\uC11C \uC8FC\uBCC0 \uD3B8\uC758\uC2DC\uC124\uC740 \uD3C9\uADE0\uC5D0\uC11C \uC57D\uAC04 \uBABB \uBBF8\uCE58\uB294 \uC815\uB3C4\uB85C \uD615\uC131\uB418\uC5B4 \uC788\uC74C");
            } else if (_score > 5) {
                _hotel.assessment.word.convinience.push(cityName + " \uB0B4 \uB2E4\uB978 \uC219\uC18C\uB4E4 \uB300\uBE44 \uC8FC\uBCC0 \uD3B8\uC758\uC2DC\uC124\uC740 \uC870\uAE08\uC529 \uAC70\uB9AC\uAC00 \uC788\uB294 \uD3B8");
            } else {
                _hotel.assessment.word.convinience.push(cityName + " \uB0B4 \uB2E4\uB978 \uC219\uC18C\uB4E4 \uB300\uBE44 \uC8FC\uBCC0 \uD3B8\uC758\uC2DC\uC124\uB4E4\uC740 \uBA40\uB9AC \uC788\uB294 \uD3B8");
            }
        }
    }
};

exports.default = SetConvinience;

/***/ }),
/* 23 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDUwMzZiMzY1ZjhjZWY3YWIyODciLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY29uZmlnLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvZ2VvQ29kZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9hdHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvY2l0eS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9jaXR5L21ldHJvTGluZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvZmlyc3RfY2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9hdXRvQ29tYmluZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L3Nlb25kX2NvbWJpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC90aGlyZF9maW5hbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9hY2NvdW50LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3N1YndheS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEFUTS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0Rm9vZC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0TWV0cm8uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldFNhZmV0eS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9jb25maWcvc2FmZXR5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRMYXVuZHJ5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRDb252aW5pZW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0QXJlYS5qcyJdLCJuYW1lcyI6WyJDb25maWciLCJtZXRybyIsIm5lYXJTdGQiLCJzY29yZSIsInBlcmNlbnRpbGUiLCJsYXVuZHJ5IiwiZm9vZCIsImtpbmQiLCJiYWtlcnkiLCJuYW1lIiwidHlwZSIsImpvc2EiLCJzdGQiLCJncm9jZXJ5Iiwic2V2ZW4iLCJmYW1pbHkiLCJsYXdzb24iLCJsYXJnZSIsIm11bHRpcGxlIiwiY3ZzIiwid2VpZ2h0IiwibmVhcmVzdCIsImluMjUwIiwid29yZCIsImludGVncmF0ZSIsImJhbmsyNCIsImF0bSIsImluMTMwIiwiR2VvQ29kZSIsImluaXQiLCJhcnIiLCJyZWYiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwib25jZSIsImRhdGEiLCJzbmFwIiwidmFsIiwibGVuZ3RoIiwic2V0IiwiY29kZSIsInRvYXN0IiwidGhhdCIsImdlb2NvZGVyIiwiZ29vZ2xlIiwibWFwcyIsIkdlb2NvZGVyIiwiYWRkcmVzcyIsImFpZCIsImdlb2NvZGUiLCJyZXN1bHRzIiwic3RhdHVzIiwiY29uc29sZSIsImxvZyIsImNvb3IiLCJsYXQiLCJnZW9tZXRyeSIsImxvY2F0aW9uIiwibG5nIiwic2hpZnQiLCJzZXRUaW1lb3V0IiwicmVsb2FkIiwiaW5pdGlhbGl6ZWQiLCJ1X2kiLCJOYXZfZnVuY3Rpb24iLCJhdHRlbmQiLCJ0b2RvIiwiY2l0eSIsIm1hcCIsImFjY291bnQiLCJzcG90IiwiY2FsYyIsImhvdGVsIiwibGluayIsImxvZ2luIiwiJCIsImh0bWwiLCJhdHRyIiwiY2xpY2siLCJjb25maXJtIiwiYXV0aCIsInNpZ25PdXQiLCJ0aGVuIiwid2luZG93IiwiY2F0Y2giLCJlcnJvciIsImRvY3VtZW50IiwicmVhZHkiLCJwcm92aWRlciIsIkdvb2dsZUF1dGhQcm92aWRlciIsIm9uQXV0aFN0YXRlQ2hhbmdlZCIsInVzZXIiLCJtYWlsIiwiZW1haWwiLCJzcGxpdCIsImdyYWRlIiwic2lnbkluV2l0aFBvcHVwIiwicmVzdWx0IiwidXNlck1haWwiLCJkaXNwbGF5TmFtZSIsInNldHRpbmciLCJvcmRlciIsImVycm9yQ29kZSIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjcmVkZW50aWFsIiwiaGFzQ2xhc3MiLCJpdGVtIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInBhcmVudCIsIkF0dGVuZCIsIm1vYmlsZSIsImlkIiwidmlld0lEIiwiYXR0ZW5kT2JqIiwic2FsYXJ5Iiwid2Vla2RheXMiLCJ0eHQiLCJ1c2VycyIsIm1haWxJRCIsInByb3AiLCJvbiIsImluZmxhdGVfY2FsZW5kYXIiLCJmdWxsQ2FsZW5kYXIiLCJoZWlnaHQiLCJmaXJzdERheSIsInZpZXdSZW5kZXIiLCJ2aWV3IiwiZWxlbWVudCIsImRheUNsaWNrIiwiZGF0ZSIsImlucHV0V29ya0hvdXIiLCJsaXN0ZW5lciIsInNldFdvcmtIb3VyIiwia2V5dXAiLCJlIiwid2hpY2giLCJjaGFuZ2UiLCJ2aWV3X3dvcmtlciIsIm9mZiIsInlvIiwiZGF0ZUlEIiwic2xpY2UiLCJkaWYiLCJmcm9tIiwidG8iLCJpIiwiTWF0aCIsImZsb29yIiwiZHVyTW9uIiwidGhpc01vbnRoIiwiZGF0ZURvbSIsImVxIiwiaiIsIndlZWtEb20iLCJ3ZWVrRHVyIiwiZGF5RG9tIiwiZmluZCIsImsiLCJjaGlsZHJlbiIsImFwcGVuZCIsImZ1bGxNb250aEJvbnVzIiwiaW5zdXJhbmNlRmVlIiwiYmFzaWMiLCJyb3VuZCIsImZ1bGxXZWVrQnVudXMiLCJjb21tYSIsImRhdGVPYmoiLCJkYXRlU2hvcnQiLCJtb21lbnQiLCJmb3JtYXQiLCJBbnlQaWNrZXIiLCJkYXRlVGltZUZvcm1hdCIsImZvY3VzIiwid29yayIsImFsbEVtcHR5IiwicmVtb3ZlIiwiYWxlcnQiLCJmcm9tQSIsInRvQSIsInB1c2giLCJDaXR5IiwicmVmcmVzaFN0YXR1cyIsImNpZCIsInRyYW5zcG9ydCIsImluZmxhdGUiLCJhcmVhIiwicHJpY2UiLCJob3RlbHMiLCJPYmplY3QiLCJrZXlzIiwiYXNzZXNzbWVudCIsInVwZGF0ZSIsIm1ldHJvTGluZSIsIk1ldHJvTGluZSIsImNyZWF0ZSIsImxpbmUiLCJtYWtlTGluZSIsInN0bkFyciIsInN0biIsIm9yZGVyQXJyIiwic3RhcnQiLCJlbmQiLCJpZHgiLCJzcGxpY2UiLCJtYXgiLCJuZXh0Iiwic3BsaWNlSWR4IiwidGFyZ2V0IiwiY2FsY3VsYXRlRGlmIiwibnljIiwiQSIsIkIiLCJDIiwiRCIsIkUiLCJGIiwiRyIsIkoiLCJMIiwiTSIsIk4iLCJRIiwiUiIsIlciLCJaIiwic3BvdHMiLCJyYW5rZWQiLCJtZXRyb3MiLCJsb2NhbCIsInRlbXBMaW5lIiwiaGFzU3BvdCIsInRlbXBEaWYiLCJlbnRlcmFuY2UiLCJlbnQiLCJyYW5rIiwiU3BvdCIsImNpdGllcyIsImN1cnJlbnQiLCJpbmZsYXRlX3N0YXR1cyIsImluZmxhdGVfY2l0eSIsInVpZCIsInJlbW92ZV9zcG90IiwicmVkb19yZW1vdmUiLCJvcmRlckFycmF5IiwiY2hhbmdlZCIsInNvcnQiLCJhIiwiYiIsInN0YXR1c0FycmF5IiwiY2l0eU5hbWUiLCJGaXJzdF9DaGVjayIsInNldFJlbWFpbk51bWJlciIsInNpZCIsInNpdGVOb2RhdGEiLCJkZWxldGVTcG90IiwiaW5wdXRDb29yZGluYXRlIiwic2l0ZSIsIm51bWJlciIsImN1dE5vIiwidHJpbSIsImN1dE9iaiIsIm5vIiwiZGVsZXRlZCIsImNvb3JUeHQiLCJpc05hTiIsImhhc1Byb2JsZW0iLCJzZWFyY2hVcmwiLCJzaXRlT2JqIiwiZ2ciLCJudiIsInRhIiwibHAiLCJzaXRlSGFzUHJvYmxlbSIsIm5vQ29vciIsIm5vQ29vclR4dCIsIm5vU3BvdCIsIm5vU3BvdFR4dCIsIm5vZGF0YSIsImhhc0Nvb3IiLCJsYXJnZU9LIiwibGFyZ2VEYXRhIiwic2Nyb2xsVG9wIiwiQXV0b0NvbWJpbmUiLCJzaXRlQXJyIiwiY29tYmluaW5nIiwiY291bnRlciIsIm5vRGF0YSIsIm9sZFNwb3QiLCJrbyIsImVuIiwidGVzdCIsInVybCIsInRhZyIsImNvbWJpbmVPYmoiLCJjb21iaW5lZCIsImNvbWJpbmUiLCJoYXNDb21iaW5lZCIsInRDb2RlIiwidFNwb3QiLCJrZXkiLCJTZWNvbmRfY29tYmluZSIsIlRoaXJkX2ZpbmFsaXplIiwidGVtcCIsInNwb3RPYmoiLCJzcG90TmFtZSIsInJhbmtBcnIiLCJzcG90VG90YWwiLCJpbmRpdmlkdWFsQXJyIiwibWluUmFuayIsInNxcnQiLCJyYW5raW5nIiwicHVzaEFyciIsIkFjY291bnQiLCJTdWJ3YXkiLCJtYXJrZXIiLCJNYXAiLCJnZXRFbGVtZW50QnlJZCIsImNlbnRlciIsInpvb20iLCJtYXBUeXBlQ29udHJvbCIsInNjYWxlQ29udHJvbCIsImZ1bGxzY3JlZW5Db250cm9sIiwiYWRkTGlzdGVuZXIiLCJmaW5kU3Vid2F5IiwibGF0TG5nIiwic2V0TWFwIiwiTWFya2VyIiwicG9zaXRpb24iLCJtZXRyb0luZm8iLCJtZXRyb0J5U3RuIiwibWV0cm9OYW1lIiwiY29uY2F0IiwibWV0QXJyYXkiLCJtZXRTdG5BcnJheSIsImNlaWwiLCJIb3RlbCIsImhpZCIsImNoZWNrIiwiYWxlcnRNb2RhbCIsIlNldEhvdGVsSW5mbyIsImNoZWNrVHh0IiwidmlzYSIsImNpdGkiLCJzYWZldHkiLCJ0aGVtZSIsImNvbnZlbmllbmNlIiwiQXJyYXkiLCJpc0FycmF5IiwiU2V0QVRNIiwic3RhdGlzdGljIiwiYnlBcmVhIiwiZmlyc3RfYnlIb3RlbHMiLCJzZWNvbmRfYnlBcmVhcyIsImZpZnRoX21ha2VTY29yZSIsInNpeHRoX3dvcmRpbmciLCJhdG1BcnIiLCJhdG1PYmoiLCJvd25lciIsImluY2x1ZGVzIiwicGxhY2VOYW1lIiwic3VtIiwibm90QXJlYSIsImF0bXMiLCJtaW51cyIsInRvRml4ZWQiLCJzY29yZUFycmF5IiwidG90YWwiLCJyYW5rU3lzIiwiaXNSYW5rZWQiLCJkaWZUb01pbiIsIlNldEZvb2QiLCJuZWFyYnkiLCJmaXJzdF9nZW9Db2RlIiwic2Vjb25kX3NldEZvb2QiLCJ0aGlyZF9ieUFyZWFzIiwiZm91cnRoX21ha2VTdGF0cyIsImdkaWYiLCJuZWFyZXN0RGlmIiwic3RhdCIsImZvb2RzIiwiaXNTb21lRm9vZCIsImdyb0FyciIsImZvb2RBcnIiLCJjb3B5IiwiZXh0ZW5kIiwibmVhcjUiLCJnZW9BcnIiLCJpc0dlb05lZWRlZCIsIlNldE1ldHJvIiwiZmlyc3Rfc2V0TWV0cm8iLCJ0aGlyZF9tYWtlU2NvcmUiLCJmb3VydGhfd29yZGluZyIsInRvdGFsTGluZSIsInR4dEFyciIsIm5lYXJlc3RTdG4iLCJsaW5lTm8iLCJieUxpbmUiLCJzcG90Tm8iLCJhdmdUaW1lIiwiYXZnRGlmIiwibWV0cm9MaW5lT2JqIiwibGluZU5hbWUiLCJkaWZIb3RlbCIsImRpZlNwb3QiLCJhdmciLCJob3RlbFNwb3QiLCJzcG90TWV0cm9OYW1lIiwiYXZnRGlmdG9TcG90IiwiYXJlYUFyciIsIm1ldHJvQXJyIiwiaXNJbkFyZWEiLCJuZWFyIiwiaGFzTWV0cm8iLCJtZXRyb19jIiwiU2V0U2FmZXR5IiwiZmlyc3RfZnJvbUFyZWEiLCJhcmVhcyIsImNvbmZpZ193b3JkIiwibWlzZGVtZWFub3IiLCJtaW4iLCJjb25kaWYiLCJtZXREaWYiLCJub0RpZiIsIm1ldFdvcmQiLCJmbG9hdFNjb3JlIiwibWluU3BvdERpZiIsImZsb2F0IiwiZmxvYXRpbmciLCJub3RZZXQiLCJmbG9hdFdvcmQiLCJmaW5hbCIsImZpbmFsU2FmZXR5IiwiZmluYWxXb3JkIiwiQ29uZmlnX1NhZmV0eSIsIlNldExhdW5kcnkiLCJmaXJzdF9zZXRMYXVuZHJ5Iiwic2Vjb25kX21ha2VTY29yZSIsInRoaXJkX3dvcmRpbmciLCJsZEFyciIsImhhc0xEIiwibGF1bmRyeV9jIiwiU2V0Q29udmluaWVuY2UiLCJpbmRpV29yZCIsImluZGlTY29yZSIsImNvbnZpbmllbmNlIiwiU2V0QXJlYSIsIm5vQXJlYSIsImFyZWFDb29yIiwibGFiZWwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdEQSxJQUFJQSxTQUFTO0FBQ1RDLFdBQU07QUFDRkMsaUJBQVEsR0FETjs7QUFHRkMsZUFBTTtBQUNGQyx3QkFBYSxDQUFDLElBQUQsRUFBTyxHQUFQLEVBQVksSUFBWixFQUFrQixHQUFsQixFQUF1QixHQUF2QixFQUE0QixHQUE1QixDQURYLENBQzZDO0FBRDdDO0FBSEosS0FERzs7QUFTVEMsYUFBUTtBQUNKSCxpQkFBUSxHQURKOztBQUdKQyxlQUFNO0FBQ0ZDLHdCQUFhLENB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O0FBSDBCLHFCQUF2QixDQUFuQjtBQUtIO0FBQ0o7QUFDRDlSLG9CQUFRQyxHQUFSLENBQVlzSSxJQUFaOztBQUVBM0oscUJBQVNDLFFBQVQsR0FBb0JGLEdBQXBCLENBQXdCLFlBQVl5SixHQUFaLEdBQWtCLFNBQTFDLEVBQXFEUyxNQUFyRCxDQUE0RDlKLEtBQUswSixNQUFqRTtBQUNILFNBcEVEO0FBcUVIO0FBM0VTLENBQWQ7O2tCQThFZWtRLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0NTAzNmIzNjVmOGNlZjdhYjI4NyIsInZhciBDb25maWcgPSB7XHJcbiAgICBtZXRybzp7XHJcbiAgICAgICAgbmVhclN0ZDo3NTAsXHJcblxyXG4gICAgICAgIHNjb3JlOntcclxuICAgICAgICAgICAgcGVyY2VudGlsZSA6IFswLjE1LCAwLjIsIDAuMjUsIDAuMiwgMC4xLCAwLjFdLCAvLzksIDgsIDcuLi7soJDrjIDsnZgg67Cx67aE7JyEIOu5hOycqCAtIO2VqeqzhCAxIOuQmOyWtOyVvCDtlaghISFcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGxhdW5kcnk6e1xyXG4gICAgICAgIG5lYXJTdGQ6NTAwLFxyXG5cclxuICAgICAgICBzY29yZTp7XHJcbiAgICAgICAgICAgIHBlcmNlbnRpbGUgOiBbMC4xNSwgMC4yLCAwLjI1LCAwLjIsIDAuMl0sIC8vOSwgOCwgNy4uLuygkOuMgOydmCDrsLHrtoTsnIQg67mE7JyoIC0g7ZWp6rOEIDEg65CY7Ja07JW8IO2VqCEhISAtIOyXhuycvOuptCA17KCQIOu2gOyXrFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZm9vZDp7XHJcbiAgICAgICAga2luZDp7XHJcbiAgICAgICAgICAgIGJha2VyeTp7IC8v7J2867CY7KCBIOuyoOydtOy7pOumrCDstJ3sua1cclxuICAgICAgICAgICAgICAgIG5hbWU6XCLrsqDsnbTsu6TrpqxcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6XCLrsqDsnbTsu6TrpqxcIixcclxuICAgICAgICAgICAgICAgIGpvc2E6XCLqsIBcIixcclxuICAgICAgICAgICAgICAgIHN0ZDoyNTAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ3JvY2VyeTp7IC8v7J2867CY7KCBIOyLneujjO2SiOygkCDstJ3sua1cclxuICAgICAgICAgICAgICAgIG5hbWU6XCLsi53ro4ztkojsoJBcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6XCLsi53ro4ztkojsoJBcIixcclxuICAgICAgICAgICAgICAgIGpvc2E6XCLsnbRcIixcclxuICAgICAgICAgICAgICAgIHN0ZDoyNTAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V2ZW46e1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIuyEuOu4kOydvOugiOu4kFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcIu2OuOydmOygkFwiLFxyXG4gICAgICAgICAgICAgICAgam9zYTpcIuydtFwiLFxyXG4gICAgICAgICAgICAgICAgc3RkOjIwMCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYW1pbHk6e1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIu2MqOuwgOumrOuniO2KuFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcIu2OuOydmOygkFwiLFxyXG4gICAgICAgICAgICAgICAgam9zYTpcIuydtFwiLFxyXG4gICAgICAgICAgICAgICAgc3RkOjIwMCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsYXdzb246e1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIuuhnOyGkFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcIu2OuOydmOygkFwiLFxyXG4gICAgICAgICAgICAgICAgam9zYTpcIuydtFwiLFxyXG4gICAgICAgICAgICAgICAgc3RkOjIwMCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsYXJnZTp7XHJcbiAgICAgICAgICAgICAgICBuYW1lOlwi64yA7ZiV66eI7Yq4XCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOlwi64yA7ZiV66eI7Yq4XCIsXHJcbiAgICAgICAgICAgICAgICBqb3NhOlwi6rCAXCIsXHJcbiAgICAgICAgICAgICAgICBtdWx0aXBsZToyLCAvL+ydtOuFgOyEneydtCDso7zrs4Dsl5Ag7J6I7Jy866m0IDLrsLAg7KKL7J2A64aIIOy3qOq4iVxyXG4gICAgICAgICAgICAgICAgc3RkOjUwMCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBuZWFyU3RkOnsvL+yWvOuniOuCmCDqsIDquYzsnbQg7J6I7Ja07JW8IOu2gOq3vOyXkCDsnojripTqsbjroZwg7J247KCV7ZWg6rKD7J2064OQXHJcbiAgICAgICAgICAgIGxhcmdlOjUwMCxcclxuICAgICAgICAgICAgZ3JvY2VyeToyNTAsXHJcbiAgICAgICAgICAgIGN2czoyNTAsIFxyXG4gICAgICAgICAgICBiYWtlcnk6MjUwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29yZTp7XHJcbiAgICAgICAgICAgIHBlcmNlbnRpbGUgOiBbMC4xNSwgMC4yLCAwLjI1LCAwLjIsIDAuMSwgMC4xXSwgLy85LCA4LCA3Li4u7KCQ64yA7J2YIOuwseu2hOychCDruYTsnKggLSDtlanqs4QgMSDrkJjslrTslbwg7ZWoISEhXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3ZWlnaHQ6eyAvL0FUTSDsoJDsiJjrpbwg7IKw7Lac7ZWgIOuVjCDqsIDspJHsuZgo7Iir7J6QIOuLqOychCDrrLTqtIApXHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0OjMuNSxcclxuICAgICAgICAgICAgICAgIGluMjUwOiAxLFxyXG4gICAgICAgICAgICAgICAgbGFyZ2U6MTBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHdvcmQ6e1xyXG4gICAgICAgICAgICBpbnRlZ3JhdGU6eyAvL+qwgOyepSDqsIDquYzsmrQgZm9vZOqwgCBsYXJnZSjsnbTqsbDrgpggMTBtIOuvuOunjCDqsbDrpqzssKjsnbQpKVxyXG4gICAgICAgICAgICAgICAgc3RkOlswLjE1LCAwLjM1LCAwLjZdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzroZwg66ek7JqwIOqwgOq5jOydtOyXkCDsnojsnYwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcIOqwgOq5jOyatCDtjrguIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBiYW5rMjQ6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjM1LDAuN10sIFxyXG4gICAgICAgICAgICAgICAgd29yZDpbXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOqzoCwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcLCDqsIDquYzsmrQg7Y64LiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqwg65ao7Ja07KeEIOyjvOychOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5lYXJlc3Q6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjEsMC4yNSwwLjRdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIiwgLy8xODA4MTAgLSDtj4nqsIDrpbwg7J2864uoIOyViCDtlZjquLDroZwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXRtOntcclxuICAgICAgICBzY29yZTp7XHJcbiAgICAgICAgICAgIHBlcmNlbnRpbGUgOiBbMC4xNSwgMC4yLCAwLjI1LCAwLjIsIDAuMSwgMC4xXSwgLy85LCA4LCA3Li4u7KCQ64yA7J2YIOuwseu2hOychCDruYTsnKggLSDtlanqs4QgMSDrkJjslrTslbwg7ZWoISEhXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3ZWlnaHQ6eyAvL0FUTSDsoJDsiJjrpbwg7IKw7Lac7ZWgIOuVjCDqsIDspJHsuZgo7Iir7J6QIOuLqOychCDrrLTqtIApXHJcbiAgICAgICAgICAgICAgICBiYW5rMjQ6NCxcclxuICAgICAgICAgICAgICAgIG5lYXJlc3Q6My43NSxcclxuICAgICAgICAgICAgICAgIGluMTMwOiAwLjVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICBcclxuICAgICAgICB3b3JkOntcclxuICAgICAgICAgICAgaW50ZWdyYXRlOnsgLy/qsIDsnqUg6rCA6rmM7Jq0IEFUTeydtCAyNOyLnOqwhCDsmKTtlIjtlZjripQg7J2A7ZaJIOyGjOycoCjsnbTqsbDrgpggMTBtIOuvuOunjCDqsbDrpqzssKjsnbQpKVxyXG4gICAgICAgICAgICAgICAgc3RkOlswLjE1LCAwLjM1LCAwLjZdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzroZwg66ek7JqwIOqwgOq5jOydtOyXkCDsnojsnYwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcIOqwgOq5jOyatCDtjrguIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBiYW5rMjQ6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjM1LDAuN10sIFxyXG4gICAgICAgICAgICAgICAgd29yZDpbXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOqzoCwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcLCDqsIDquYzsmrQg7Y64LiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqwg65ao7Ja07KeEIOyjvOychOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5lYXJlc3Q6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjEsMC4yNSwwLjRdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIiwgLy8xODA4MTAgLSDtj4nqsIDrpbwg7J2864uoIOyViCDtlZjquLDroZwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9jb25maWcuanMiLCJ2YXIgR2VvQ29kZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGFyciwgcmVmKXtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgaWYoIWRhdGEpeyAgLy/ri6Trpbgg7KeA7Jik7L2U65SpIOyekeyXheykkeydtOudvOuptCDsoIjrjIAg642u7Ja07I2o7ISc64qUIOyViCDrkKg7XHJcbiAgICAgICAgICAgICAgICBpZihhcnIubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidGVtcC9nZW9jb2RlXCIpLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjpyZWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycjphcnJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY29kZShhcnIsIHJlZik7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyngOyYpOy9lOuUqSDsnpHsl4XsnYQg7Iuc7J6R7ZWp64uI64ukLiDsl6zrn6zrsogg7IOI66Gc6rOg7LmoIOuQoCDsiJgg7J6I7Iq164uI64ukLlwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY29kZTogZnVuY3Rpb24oYXJyLCByZWYpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgbGV0IGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XHJcbiAgICAgICAgdmFyIGFkZHJlc3MgPSBhcnJbMF0uYWRkcmVzcztcclxuICAgICAgICB2YXIgYWlkID0gYXJyWzBdLmFpZDtcclxuXHJcbiAgICAgICAgZ2VvY29kZXIuZ2VvY29kZSggeydhZGRyZXNzJzogYWRkcmVzc30sIGZ1bmN0aW9uKHJlc3VsdHMsIHN0YXR1cykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0dXMpXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gJ09LJykge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb29yID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDpyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzpyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYocmVmK1wiL1wiK2FpZCtcIi9jb29yXCIpLnNldChjb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihhcnIubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvZGUoYXJyLCByZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidGVtcC9nZW9jb2RlXCIpLnNldChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLsp4DsmKTsvZTrlKkg7J6R7JeF7J20IOyZhOujjOuQmOyXiOyKteuLiOuLpC5cIilcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoc3RhdHVzID09PSAnWkVST19SRVNVTFRTJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuyngOyYpOy9lOuUqSDqsrDqs7zqsIAg7JeG64qUIO2VreuqqeydtCDsnojsirXri4jri6QuIOy9mOyGlOywveydhCDssLjqs6DtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6cmVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnI6YXJyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2VvQ29kZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2dlb0NvZGUuanMiLCJpbXBvcnQgQXR0ZW5kIGZyb20gXCIuL3BhZ2VzL2F0dGVuZC5qc1wiO1xyXG5pbXBvcnQgQ2l0eSBmcm9tIFwiLi9wYWdlcy9jaXR5LmpzXCI7XHJcbmltcG9ydCBTcG90IGZyb20gXCIuL3BhZ2VzL3Nwb3QuanNcIjtcclxuaW1wb3J0IEFjY291bnQgZnJvbSBcIi4vcGFnZXMvYWNjb3VudC5qc1wiO1xyXG5pbXBvcnQgU3Vid2F5IGZyb20gXCIuL3BhZ2VzL3N1YndheS5qc1wiO1xyXG5pbXBvcnQgSG90ZWwgZnJvbSBcIi4vcGFnZXMvaG90ZWwuanNcIjtcclxuaW1wb3J0IEdlb0NvZGUgZnJvbSBcIi4vbW9kdWxlcy9nZW9Db2RlLmpzXCI7XHJcblxyXG52YXIgaW5pdGlhbGl6ZWQgPSB7fTtcclxuXHJcbnZhciB1X2kgPSB7fTtcclxuXHJcbnZhciBOYXZfZnVuY3Rpb24gPSB7XHJcbiAgICBhdHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBBdHRlbmQuaW5pdCh1X2kpO1xyXG4gICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgdG9kbzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBjaXR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgQ2l0eS5pbml0KHVfaSk7XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQuY2l0eSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgbWFwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgU3Vid2F5LmluaXQoKTtcclxuICAgIH0sXHJcbiAgICBhY2NvdW50OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIHNwb3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBTcG90LmluaXQodV9pKTtcclxuICAgICAgICBpbml0aWFsaXplZC5zcG90ID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBjYWxjOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGhvdGVsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgSG90ZWwuaW5pdCgpO1xyXG4gICAgfSxcclxuICAgIGxpbms6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBsb2dpbihuYW1lKXtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5odG1sKG5hbWVbMV0rXCLtlZghXCIpO1xyXG4gICAgJChcIi5oZWxsb1dvcmxkXCIpLmF0dHIoXCJ0aXRsZVwiLG5hbWUrXCLri5gg7JWI64WV7ZWY7IS47JqUIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGNvbmZpcm0obmFtZStcIuuLmCDroZzqt7jslYTsm4Mg7ZWY7Iuc6rKg7Iq164uI6rmMP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgLy8gQW4gZXJyb3IgaGFwcGVuZWQuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHByb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgbGV0IG1haWwgPSB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF07XHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2VvQ29kZS5jb2RlKGRhdGEuYXJyLCBkYXRhLnJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLsp4DsmKTsvZTrlKkg7J6R7JeF7J2EIOydtOyWtOyEnCDsp4Ttlontlanri4jri6QuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/slYTrnpgg64K07Jqp7J2EIOuwlOq+uOuptCBpZiAoIWlzVXNlcikg67aA67aE7JeQ64+EIOuwmOuTnOyLnCDrsJjsmIHtlbTspITqsoNcclxuICAgICAgICAgICAgICAgIC8vIGZvciAodmFyIGdpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZGF0YVtnaWRdLlxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikudXBkYXRlKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW21haWxdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdV9pID0gZGF0YVttYWlsXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JhZGUgPSB1X2kuZ3JhZGUgKiAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dGVuZC5pbml0KGRhdGFbbWFpbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGUgPT09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjY291bnQuaW5pdChtYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmFjY291bnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luKHVfaS5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIFVzZXIgaXMgc2lnbmVkIGluLlxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBObyB1c2VyIGlzIHNpZ25lZCBpbi5cclxuICAgICAgICAgICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhQb3B1cChwcm92aWRlcikudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyID0gcmVzdWx0LnVzZXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlck1haWwgPSB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbdXNlck1haWxdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVfaSA9IGRhdGFbdXNlck1haWxdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JhZGUgPSB1X2kuZ3JhZGUgKiAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXR0ZW5kLmluaXQoZGF0YVt1c2VyTWFpbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjb3VudC5pbml0KHVzZXJNYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hY2NvdW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dpbih1X2kubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3VzZXJzLycgKyB1c2VyTWFpbCkuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5kaXNwbGF5TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haWw6IHVzZXJNYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBcImFiY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCdjb2RlOicgKyBlcnJvci5jb2RlICsgJyAtIOydvOyLnOyggeyduCDrrLjsoJzqsIAg67Cc7IOd7ZaI7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqULicpO1xyXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIEVycm9ycyBoZXJlLlxyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yQ29kZSA9IGVycm9yLmNvZGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBlbWFpbCBvZiB0aGUgdXNlcidzIGFjY291bnQgdXNlZC5cclxuICAgICAgICAgICAgICAgIHZhciBlbWFpbCA9IGVycm9yLmVtYWlsO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGZpcmViYXNlLmF1dGguQXV0aENyZWRlbnRpYWwgdHlwZSB0aGF0IHdhcyB1c2VkLlxyXG4gICAgICAgICAgICAgICAgdmFyIGNyZWRlbnRpYWwgPSBlcnJvci5jcmVkZW50aWFsO1xyXG4gICAgICAgICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4kKFwiLm5hdl9faXRlbVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBpZighJCh0aGlzKS5oYXNDbGFzcygnbmF2X19pdGVtLS1oYXNEcmF3ZXInKSl7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpLmF0dHIoXCJpZFwiKS5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgICAgICQoXCIubmF2PipcIikucmVtb3ZlQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5wYWdlcy5cIiArIGl0ZW0pLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgICAgIGlmKCFpbml0aWFsaXplZFtpdGVtXSl7XHJcbiAgICAgICAgICAgIE5hdl9mdW5jdGlvbltpdGVtXSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4kKFwiLm5hdl9fZHJhd2VyX19pdGVtXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaXRlbSA9ICQodGhpcykuYXR0cihcImlkXCIpLnNwbGl0KFwiX1wiKVsxXTtcclxuXHJcbiAgICAkKFwiLm5hdj4qXCIpLnJlbW92ZUNsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYWRkQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG5cclxuICAgICQoXCIubmF2X19kcmF3ZXJfX2l0ZW1cIikucmVtb3ZlQ2xhc3MoXCJuYXZfX2RyYXdlcl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwibmF2X19kcmF3ZXJfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG5cclxuICAgICQoXCIucGFnZXNcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIucGFnZXMuXCIgKyBpdGVtKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgIGlmICghaW5pdGlhbGl6ZWRbaXRlbV0pIHtcclxuICAgICAgICBOYXZfZnVuY3Rpb25baXRlbV0oKTtcclxuICAgIH1cclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ2YXIgQXR0ZW5kID0ge1xyXG4gICAgbW9iaWxlOiBmYWxzZSxcclxuXHJcbiAgICBpZDogXCJcIixcclxuXHJcbiAgICB2aWV3SUQ6IFwiXCIsXHJcbiAgICAvL+q0gOumrOyekOqwgCDri6Trpbgg7IKs656M7J2YIElEIO2ZleyduOykkVxyXG5cclxuICAgIGF0dGVuZE9iajoge30sXHJcblxyXG4gICAgc2FsYXJ5OiB7fSxcclxuXHJcblxyXG4gICAgd2Vla2RheXM6IFtcIuydvFwiLCBcIuyblFwiLCBcIu2ZlFwiLCBcIuyImFwiLCBcIuuqqVwiLCBcIuq4iFwiLCBcIu2GoFwiLCBcIuydvFwiXSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbih1X2kpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB2YXIgZ3JhZGUgPSB1X2kuZ3JhZGU7XHJcbiAgICAgICAgdmFyIGlkID0gdV9pLmlkO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcblxyXG4gICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICB0eHQrPSc8c2VsZWN0IGNsYXNzPVwid29ya2VyX3NlbGVjdG9yXCI+PC9zZWxlY3Q+JztcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX190b3BcIj4nO1xyXG4gICAgICAgIHR4dCArPSAgICc8ZGl2IGlkPVwiY2FsZW5kYXJcIiBjbGFzcz1cImF0dGVuZF9fY2FsZW5kYXJcIj48L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSAgICc8ZGl2IGNsYXNzPVwiYXR0ZW5kX193ZWVrXCI+PC9kaXY+JztcclxuICAgICAgICB0eHQgKz0nPC9kaXY+JztcclxuICAgICAgICB0eHQgKz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhcIj48L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLmF0dGVuZFwiKS5odG1sKHR4dCkucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhY2NvdW50L3NhbGFyeVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdGhhdC5zYWxhcnkgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICBpZihncmFkZSA9PT0gNSl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmdWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJzID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHh0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbWFpbElEIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVzZXJzW21haWxJRF0uZ3JhZGUqMTw1KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPG9wdGlvbiB2YWx1ZT1cIicgKyBtYWlsSUQgKyAnXCI+JyArIHVzZXJzW21haWxJRF0ubmFtZSArICc8L29wdGlvbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIud29ya2VyX3NlbGVjdG9yXCIpLmh0bWwodHh0KS52YWwoaWQpLnByb3AoXCJzZWxlY3RlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5sb2FkaW5nVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ZW5kT2JqID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoISQoXCIuZmMtaGVhZGVyLXRvb2xiYXJcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTY0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheUNsaWNrOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0V29ya0hvdXIoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLm9uKFwiY2xpY2tcIiwgXCIuY29uZmlybVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZighJChcIi5hdHRlbmRcIikuaGFzQ2xhc3MoJ2Rpc3BsYXlOb25lJykpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRXb3JrSG91cigkKHRoaXMpLmF0dHIoXCJkaWRcIikpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLm1vZGFsXCIpLm9uKFwiY2xpY2tcIiwgXCIuY2xvc2VcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKCEkKFwiLmF0dGVuZFwiKS5oYXNDbGFzcygnZGlzcGxheU5vbmUnKSkge1xyXG4gICAgICAgICAgICAgICAgJChcIi5ibGFja1NjcmVlblwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiYm9keVwiKS5rZXl1cChmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgaWYgKCEkKFwiLmF0dGVuZFwiKS5oYXNDbGFzcygnZGlzcGxheU5vbmUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIubW9kYWwgLmNvbmZpcm1cIikubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBlLndoaWNoOyAvLyByZWNvbW1lbmRlZCB0byB1c2UgZS53aGljaCwgaXQncyBub3JtYWxpemVkIGFjcm9zcyBicm93c2Vyc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRXb3JrSG91cigkKFwiLm1vZGFsIC5jb25maXJtXCIpLmF0dHIoXCJkaWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIud29ya2VyX3NlbGVjdG9yXCIpLmNoYW5nZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X3dvcmtlcihpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHZpZXdfd29ya2VyOiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZihpZCA9PT0gdGhhdC5pZCl7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19jYWxlbmRhclwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fbW9udGhcIikuaHRtbChcIlwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX2NhbGVuZGFyXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgIGlmKHRoYXQudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoYXQudmlld0lEKS5vZmYoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIraWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmF0dGVuZE9iaiA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeW8gPSB0aGF0LnZpZXdJRDtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlld0lEID0gaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoeW8ubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhhdC5pZCAhPT0gdGhhdC52aWV3SUQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheUNsaWNrOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRXb3JrSG91cihkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX2NhbGVuZGFyOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAkKFwiLmF0dGVuZFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuZmMtZGF5XCIpLmh0bWwoXCJcIik7XHJcblxyXG4gICAgICAgIGlmKGRhdGEuYXR0ZW5kKXtcclxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuYXR0ZW5kO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkYXRlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlSUQgPSBkYXRlLnNsaWNlKDAsNCkrXCItXCIrZGF0ZS5zbGljZSg0LDYpK1wiLVwiK2RhdGUuc2xpY2UoNiw4KTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHR4dCA9ICc8cD4nK2RhdGFbZGF0ZV1bMF0uZnJvbStcIn5cIitkYXRhW2RhdGVdWzBdLnRvKyc8L3A+JztcclxuICAgICAgICAgICAgICAgIC8v65GQ7YOA7J6EIOuCmOuIoOyEnCDqt7zrrLTtlojslrTrj4Qg64us66Cl7JeQIO2RnOyLnOuQmOuKlCDqsoPsnYAg7LKr7YOA7J6EIOq3vOustOyLnOqwhOunjFxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZiArPSBkYXRhW2RhdGVdW2ldLmRpZjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8cD4nICsgTWF0aC5mbG9vcihkaWYvNjApICsgXCLsi5zqsIQgXCIrIGRpZiU2MCArXCLrtoRcIisnPC9wPic7XHJcbiAgICAgICAgICAgICAgICAkKCcuYXR0ZW5kIC5mYy1kYXlbZGF0YS1kYXRlPVwiJytkYXRlSUQrJ1wiXScpLmh0bWwodHh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZHVyTW9uID0gMDtcclxuICAgICAgICAgICAgbGV0IHRoaXNNb250aCA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuYXR0ZW5kIC5mYy1kYXlcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlRG9tID0gJChcIi5hdHRlbmQgLmZjLWRheVwiKS5lcShpKTtcclxuICAgICAgICAgICAgICAgIGlmKCFkYXRlRG9tLmhhc0NsYXNzKFwiZmMtb3RoZXItbW9udGhcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gZGF0ZURvbS5hdHRyKFwiZGF0YS1kYXRlXCIpLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzTW9udGggPSBkYXRlWzBdK2RhdGVbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGVbMF0rZGF0ZVsxXStkYXRlWzJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2RhdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkYXRhW2RhdGVdLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJNb24gKz0gZGF0YVtkYXRlXVtqXS5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmKCQoXCIuYXR0ZW5kIC5mYy12aWV3LWNvbnRhaW5lclwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHsgICAvL+ustOyhsOqxtCA27KO8XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWtEb20gPSAkKFwiLmF0dGVuZCAuZmMtd2Vla1wiKS5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla0R1ciA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXlEb20gPSB3ZWVrRG9tLmZpbmQoXCIuZmMtZGF5XCIpLmVxKGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGRheURvbS5hdHRyKFwiZGF0YS1kYXRlXCIpLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGVbMF0rZGF0ZVsxXStkYXRlWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2RhdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlZWtEdXIgKz0gZGF0YVtkYXRlXVtrXS5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2Vla0R1cj4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj4nKyBNYXRoLmZsb29yKHdlZWtEdXIvNjApKyfsi5zqsIQgJyt3ZWVrRHVyJTYwKyfrtoQnICsnPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiYXR0ZW5kX193ZWVrX19ob3VyXCI+PC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQoXCIuYXR0ZW5kX193ZWVrXCIpLmh0bWwodHh0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoXCIuYXR0ZW5kIC5mYy1sZWZ0XCIpLmNoaWxkcmVuKFwiaDIuZHVyTW9udGhcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICQoXCIuYXR0ZW5kIGgyLmR1ck1vbnRoXCIpLmh0bWwoJyAoJytNYXRoLmZsb29yKGR1ck1vbi82MCkrJ+yLnOqwhCAnK2R1ck1vbiU2MCsn67aEKScpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuYXR0ZW5kIC5mYy1sZWZ0XCIpLmFwcGVuZCgnPGgyIGNsYXNzPVwiZHVyTW9udGhcIj4gKCcrTWF0aC5mbG9vcihkdXJNb24vNjApKyfsi5zqsIQgJytkdXJNb24lNjArJ+u2hCk8L2gyPicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQgPSAnJzsgICAvL3ZhciDrubzrqLnsnYDqsbAg7JWE64uYLiDsnITsl5DshJwg7ISg7Ja4IO2WiOydjCFcclxuXHJcbiAgICAgICAgICAgIGxldCBmdWxsTW9udGhCb251cyA9IDMwNDAwO1xyXG4gICAgICAgICAgICBsZXQgaW5zdXJhbmNlRmVlID0gMDtcclxuICAgICAgICAgICAgbGV0IGJhc2ljID0gTWF0aC5yb3VuZChkdXJNb24vNjAqNzYwMCk7XHJcbiAgICAgICAgICAgIGxldCBmdWxsV2Vla0J1bnVzID0gTWF0aC5yb3VuZCgoZHVyTW9uLzYwKjc2MDApKjAuMik7XHJcblxyXG4gICAgICAgICAgICAvLyBpZih0aGlzLmlkID09PSB0aGlzLnZpZXdJRCl7XHJcbiAgICAgICAgICAgIC8vICAgICAvL+uzuOyduCDrqqjrk5xcclxuICAgICAgICAgICAgLy8gICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnkvXCIrdGhpc01vbnRoK1wiL1wiK3RoaXMuaWQpLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYmFzaWM6IGJhc2ljLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxXZWVrQnVudXM6IGZ1bGxXZWVrQnVudXMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbE1vbnRoQm9udXM6IGZ1bGxNb250aEJvbnVzXHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImFjY291bnQvc2FsYXJ5L1wiK3RoaXNNb250aCtcIi9cIit0aGlzLnZpZXdJRCkudXBkYXRlKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBiYXNpYzogYmFzaWMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbFdlZWtCdW51czogZnVsbFdlZWtCdW51cyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsTW9udGhCb251czogZnVsbE1vbnRoQm9udXNcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7quLDrs7jquIk8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGJhc2ljKSsgXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq3vOustOyLnOqwhCBYIDcsNjAw7JuQPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7so7ztnLTsiJjri7k8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGZ1bGxXZWVrQnVudXMpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6riw67O46riJ7J2YIDIwJTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7Jew7LCo7IiY64u5PC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShmdWxsTW9udGhCb251cykgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj417Iuc6rCEIOyDgeuLuSDquLDrs7jquIk8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lIGF0dGVuZF9fbW9udGhfX2xpbmUtLXJlZFwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7sgqztmozrs7Ttl5jro4w8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGluc3VyYW5jZUZlZSkgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7qta3rr7zsl7DquIgv6rOg7Jqp67O07ZeYL+qxtOqwleuztO2XmCDssq3qtazslaE8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lIGF0dGVuZF9fbW9udGhfX2xpbmUtLXN1bVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7tlanqs4Q8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGJhc2ljICsgZnVsbFdlZWtCdW51cyArIGZ1bGxNb250aEJvbnVzIC0gaW5zdXJhbmNlRmVlKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq4sOuzuOq4iSArIOyjvO2ctOyImOuLuSArIOyXsOywqOyImOuLuSAtIOyCrO2ajOuztO2XmOujjDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX21vbnRoXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0V29ya0hvdXI6IGZ1bmN0aW9uKGRhdGVPYmope1xyXG4gICAgICAgIC8vIGNzczogbW9kdWxlcy9hdHRlbmQuY3NzXHJcbiAgICAgICAgbGV0IGRhdGVTaG9ydCA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoXCJNTS9ERFwiKTtcclxuICAgICAgICBsZXQgZGF0ZUlEID0gbW9tZW50KGRhdGVPYmopLmZvcm1hdChcIllZWVlNTUREXCIpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgIGlmKHRoaXMuYXR0ZW5kT2JqLmF0dGVuZFtkYXRlSURdKXtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuYXR0ZW5kT2JqLmF0dGVuZFtkYXRlSURdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYmxhY2tTY3JlZW5cIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJpbnB1dFdpbmRvd1wiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxwIGNsYXNzPVwidGl0bGVcIj4nK2RhdGVTaG9ydCsnIOq3vOustOyLnOqwhDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPic7XHJcbiAgICAgICAgaWYoZGF0YVswXSl7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJmaXJzdF9mcm9tXCIgdmFsdWU9XCInK2RhdGFbMF0uZnJvbSsnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cImZpcnN0X3RvXCIgdmFsdWU9XCInK2RhdGFbMF0udG8rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwiZmlyc3RfZnJvbVwiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJmaXJzdF90b1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj4nO1xyXG4gICAgICAgIGlmKGRhdGFbMV0pe1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwic2Vjb25kX2Zyb21cIiB2YWx1ZT1cIicrZGF0YVsxXS5mcm9tKydcIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwic2Vjb25kX3RvXCIgdmFsdWU9XCInK2RhdGFbMV0udG8rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwic2Vjb25kX2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwic2Vjb25kX3RvXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9ICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwiYm90dG9tXCI+JztcclxuICAgICAgICB0eHQrPSAgICAgICAgICAgJzxwIGNsYXNzPVwiY29uZmlybVwiIGRpZD1cIicrZGF0ZUlEKydcIj7tmZXsnbg8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICAgICAgJzxwIGNsYXNzPVwiY2xvc2VcIj7st6jshow8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSAgICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIubW9kYWxcIikuaHRtbCh0eHQpO1xyXG5cclxuICAgICAgICBpZih0aGlzLm1vYmlsZSl7XHJcbiAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikuQW55UGlja2VyKHtcclxuICAgICAgICAgICAgICAgIGRhdGVUaW1lRm9ybWF0OlwiSEg6bW1cIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjZmlyc3RfZnJvbVwiKS5mb2N1cygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRXb3JrSG91cjogZnVuY3Rpb24oZGF0ZSl7XHJcblxyXG4gICAgICAgIGxldCB3b3JrID0gW107XHJcblxyXG4gICAgICAgIGxldCBhbGxFbXB0eSA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKCQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikuZXEoaSkudmFsKCkubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgYWxsRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWxsRW1wdHkpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLnZpZXdJRCtcIi9hdHRlbmQvXCIrZGF0ZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCtcIi9hdHRlbmQvXCIrZGF0ZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoXCIubW9kYWxcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgbGV0IGRhdGVJRCA9IGRhdGUuc2xpY2UoMCw0KSArIFwiLVwiK2RhdGUuc2xpY2UoNCw2KSArIFwiLVwiK2RhdGUuc2xpY2UoNiw4KTtcclxuICAgICAgICAgICAgJCgnLmZjLWRheVtkYXRhLWRhdGU9XCInK2RhdGVJRCsnXCJdJykuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmKCQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG4gICAgICAgICAgICAvL+yLnOyekeyLnOqwhOydtCDsnpgg7J6F66Cl65CY7JeI64KYIO2ZleyduFxyXG5cclxuICAgICAgICAgICAgaWYoZGF0ZTxtb21lbnQoKS5mb3JtYXQoXCJZWVlZTU1ERFwiKSl7XHJcbiAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgIGlmKCQoXCIjZmlyc3RfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLsmIjsg4Eg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZyb20gPSAkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk7XHJcbiAgICAgICAgICAgIGxldCB0byA9ICQoXCIjZmlyc3RfdG9cIikudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZnJvbUEgPSBmcm9tLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSk7XHJcblxyXG5cclxuICAgICAgICAgICAgd29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZyb206IGZyb20sXHJcbiAgICAgICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgICAgICBkaWY6IGRpZlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi6re866y07Iuc6rCE7J20IOyemOuquyDsnoXroKXrkJjsl4jsirXri4jri6QuIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBpZigkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGU8bW9tZW50KCkuZm9ybWF0KFwiWVlZWU1NRERcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7Jik64qYIOydtOyghCDsnbzsnZgg64Kg7Kec66W8IOuLpOujqOqzoCDsnojsnYQg6rK97JqwIC0g6re866y0IOyiheujjOyLnOqwhOydtCDsnoXroKXrkJjsp4Ag7JWK7Jy866m0IOyViCDrkKhcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI3NlY29uZF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/snbTsoITsnbzsnbQg7JWE64uI642U652864+EIOyYiOyDgSDqt7zrrLTsi5zqsITsnbTrnbzrj4Qg7J6F66Cl7ZW07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg7JiI7IOBIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb20gPSAkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvID0gJChcIiNzZWNvbmRfdG9cIikudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb21BID0gZnJvbS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9BID0gdG8uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLTsi5zqsITsnbQg7J6Y66q7IOyeheugpeuQmOyXiOyKteuLiOuLpC4gSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMudmlld0lEK1wiL2F0dGVuZC9cIitkYXRlKS5zZXQod29yayk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQrXCIvYXR0ZW5kL1wiK2RhdGUpLnNldCh3b3JrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIubW9kYWxcIikuaHRtbChcIlwiKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF0dGVuZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvYXR0ZW5kLmpzIiwiaW1wb3J0IE1ldHJvTGluZSBmcm9tIFwiLi9jaXR5L21ldHJvTGluZS5qc1wiO1xyXG5cclxubGV0IENpdHkgPSB7XHJcbiAgICBkYXRhOiB7fSxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuY2l0eVwiKS5vbihcImNsaWNrXCIsIFwiLnJlZnJlc2hcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5yZWZyZXNoU3RhdHVzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuY2l0eVwiKS5vbihcImNsaWNrXCIsIFwiLmNpdHlfX3RyYW5zcG9ydFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgY2lkID0gJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7IFxyXG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gdGhhdC5kYXRhW2NpZF0uc3RhdHVzO1xyXG4gICAgICAgICAgICBpZihzdGF0dXMuc3BvdD4yICYmIHN0YXR1cy50cmFuc3BvcnQ+MCl7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuuMgOykkeq1kO2GtSDsoJXrs7Trpbwg6rCA6rO17ZWp64uI64ukLlwiKTtcclxuICAgICAgICAgICAgICAgIE1ldHJvTGluZS5pbml0KGNpZCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLrjIDspJHqtZDthrUg7KCV67O066W8IOqwgOqzte2VmOq4sOyXkCDsnpDro4zqsIAg67aA7KGx7ZWp64uI64ukLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8aDI+64+E7IucIOuNsOydtO2EsCDtmZXrs7TtmITtmak8L2gyPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJyZWZyZXNoXCI+7LWc7Iug7ZmUPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwid3JhcHBlclwiPic7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwibGluZSB0b3BcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwibmFtZVwiPuuPhOyLnOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzXCI+7IiZ7IaMPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X19zcG90c1wiPuq0gOq0keyngCDsoJXrpqw8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydFwiPuq1kO2GtTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fYXJlYVwiPuyngOyXrTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fcHJpY2VcIj7rrLzqsIA8L3A+JztcclxuICAgICAgICB0eHQrPSAnPC9kaXY+JztcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKHZhciBjb2RlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NvZGVdO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gY2l0eS5zdGF0dXM7XHJcblxyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJsaW5lXCIgaWQ9XCInICsgY2l0eS5jb2RlICsgJ1wiPjxwIGNsYXNzPVwibmFtZVwiPicgKyBjaXR5Lm5hbWUgKyAnPC9wPic7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLmhvdGVsID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzIHdlaWdodC0tYm9sZFwiPu2PieqwgCDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuaG90ZWwgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19ob3RlbHNcIj7rjbDsnbTthLAg7J6I7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzIGNvbG9yLS1yZWRcIj7rjbDsnbTthLAg7JeG7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMuc3BvdCA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzIHdlaWdodC0tYm9sZFwiPuygleuztOqygOymnSDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+MuywqOqygOymnTwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5zcG90ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHNcIj7tlansuZjquLA8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+7KCV67O0IOqygOymneykkTwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzIGNvbG9yLS1yZWRcIj7soJXrs7Qg7JeG7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0IHdlaWdodC0tYm9sZFwiPuuMgOykkeq1kO2GtSDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0XCI+642w7J207YSwIOyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydCBjb2xvci0tcmVkXCI+642w7J207YSwIOyXhuydjDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLmFyZWEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19hcmVhXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2FyZWEgY29sb3ItLXJlZFwiPlg8L3A+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5wcmljZSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3ByaWNlXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3ByaWNlIGNvbG9yLS1yZWRcIj5YPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nOyAvL2Nsb3NlIHdyYXBwZXJcclxuXHJcbiAgICAgICAgJChcIi5jaXR5XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignc2V0dGluZy9jaXRpZXMnKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGUoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZnJlc2hTdGF0dXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlybShcIuuNsOydtO2EsOulvCDrp47snbQg7J6h7JWE66i57Iq164uI64ukISDsoJXrp5Ag7LWc7Iug7ZmU7ZWY7Iuc6rKg7Iq164uI6rmMP1wiKSkge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzJykub25jZShcInZhbHVlXCIsIHNuYXA9PntcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGNpZCBpbiB0aGF0LmRhdGEpIHtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSB7fTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2l0eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsOiAwLCAvLzA6642w7J207YSw7JeG7J2MLCAxOuyImeyGjOuNsOydtO2EsOunjCDsnojsnYwsIDI67Y+J6rCA642w7J207YSwKOybjOuUqSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90OiB0aGF0LmRhdGFbY2lkXS5zdGF0dXMuc3BvdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IDAsIC8v642w7J207YSw7JeG7J2MLCAxOuuplO2KuOuhnOuNsOydtO2EsOunjCDsnojsnYwsIDI66rCA6rO1642w7J207YSwKOudvOyduOuzhC4u65OxKSDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNpdHkuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmFyZWEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5ob3RlbHMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhvdGVsID0gY2l0eS5ob3RlbHNbT2JqZWN0LmtleXMoY2l0eS5ob3RlbHMpWzBdXTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmhvdGVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5ob3RlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5hcmVhID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGhvdGVsLmFyZWEgPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5hcmVhID0gMjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdHkuc3RhdHVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5zdGF0dXMuYXJlYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuc3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNpdHkuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuc3RhdHVzLmFyZWEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5LnN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgY2lkICsgJy9zdGF0dXMnKS51cGRhdGUoY2l0eS5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5tZXRybyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaXR5Lm1ldHJvTGluZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnRyYW5zcG9ydCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMudHJhbnNwb3J0ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdHkucHJpY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnByaWNlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbDogMCwgLy8wOuuNsOydtO2EsOyXhuydjCwgMTrsiJnshozrjbDsnbTthLDrp4wg7J6I7J2MLCAyOu2PieqwgOuNsOydtO2EsCjsm4zrlKkpIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IDAsIC8v642w7J207YSw7JeG7J2MLCAxOuuplO2KuOuhnOuNsOydtO2EsOunjCDsnojsnYwsIDI66rCA6rO1642w7J207YSwKOudvOyduOuzhC4u65OxKSDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhW2NpZF0uc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzJykuc2V0KHRoYXQuZGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlKHRoYXQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoJ+y1nOyLoO2ZlCDsmYTro4wnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaXR5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9jaXR5LmpzIiwibGV0IE1ldHJvTGluZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGNpZCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZShkYXRhLCBjaWQpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmxpbmVbY2lkXSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1ha2VMaW5lKGNpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkK1wiL21ldHJvTGluZVwiKS5zZXQodGhpcy5tZXRyb0xpbmUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1ldHJvTGluZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG1ha2VMaW5lKGNpZCl7XHJcbiAgICAgICAgZm9yIChsZXQgbGluZSBpbiB0aGlzLm1ldHJvTGluZSkge1xyXG4gICAgICAgICAgICBsZXQgc3RuQXJyID0gdGhpcy5tZXRyb0xpbmVbbGluZV0uc3RuO1xyXG5cclxuICAgICAgICAgICAgbGV0IG9yZGVyQXJyID0gW107XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmxpbmVbY2lkXVtsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLmxpbmVbY2lkXVtsaW5lXVswXTtcclxuICAgICAgICAgICAgICAgIGxldCBlbmQgPSB0aGlzLmxpbmVbY2lkXVtsaW5lXVsxXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RuQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0biA9IHN0bkFycltpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihzdG4ubmFtZSA9PT0gc3RhcnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlckFyci5wdXNoKHN0bik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RuQXJyLnNwbGljZShpZHgsMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1heCA9IHN0bkFyci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6IDIwMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BsaWNlSWR4ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdG5BcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0biA9IHN0bkFycltqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IG9yZGVyQXJyW29yZGVyQXJyLmxlbmd0aC0xXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBjYWxjdWxhdGVEaWYodGFyZ2V0LmNvb3IsIHN0bi5jb29yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGlmPG5leHQuZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTpzdG4ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0OnN0bi5jb29yLmxhdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG5nOnN0bi5jb29yLmxuZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOmRpZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwbGljZUlkeCA9IGo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJBcnIucHVzaChuZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBzdG5BcnIuc3BsaWNlKHNwbGljZUlkeCwxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1ldHJvTGluZVtsaW5lXS5zdG4gPSBvcmRlckFycjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1ldHJvTGluZTp7fSxcclxuXHJcbiAgICBsaW5lOntcclxuICAgICAgICBueWM6e1xyXG4gICAgICAgICAgICAxOltcIlZhbiBDb3J0bGFuZHQgUGFyayAtIDI0Mm5kIFN0XCIsXCJTb3V0aCBGZXJyeVwiXSxcclxuICAgICAgICAgICAgMjpbXCJXYWtlZmllbGQgLSAyNDFzdCBTdFwiLFwiQnJvb2tseW4gQ29sbGVnZSAtIEZsYXRidXNoIEF2ZVwiXSxcclxuICAgICAgICAgICAgMzpbXCJIYXJsZW0gLSAxNDggU3RcIixcIk5ldyBMb3RzIEF2ZVwiXSxcclxuICAgICAgICAgICAgNDpbXCJXb29kbGF3blwiLFwiTmV3IExvdHMgQXZlXCJdLFxyXG4gICAgICAgICAgICA1OltcIkVhc3RjaGVzdGVyIC0gRHlyZSBBdmVcIixcIkJyb29rbHluIENvbGxlZ2UgLSBGbGF0YnVzaCBBdmVcIl0sXHJcbiAgICAgICAgICAgIDY6W1wiUGVsaGFtIEJheSBQYXJrXCIsXCJCcm9va2x5biBCcmlkZ2UgLSBDaXR5IEhhbGxcIl0sXHJcbiAgICAgICAgICAgIDc6W1wiRmx1c2hpbmcgLSBNYWluIFN0XCIsXCIzNHRoIFN0IC0gSHVkc29uIFlhcmRzXCJdLFxyXG4gICAgICAgICAgICBBOltcIklud29vZCAtIDIwN3RoIFN0XCIsXCJSb2NrYXdheSBQYXJrIC0gQmVhY2ggMTE2IFN0XCJdLFxyXG4gICAgICAgICAgICBCOltcIkJlZGZvcmQgUGFyayBCbHZkXCIsXCJCcmlnaHRvbiBCZWFjaFwiXSxcclxuICAgICAgICAgICAgQzpbXCIxNjh0aCBTdFwiLFwiRXVjbGlkIEF2ZVwiXSxcclxuICAgICAgICAgICAgRDpbXCJOb3J3b29kIC0gMjA1dGggU3RcIixcIkNvbmV5IElzbGFuZCAtIFN0aWxsd2VsbCBBdlwiXSxcclxuICAgICAgICAgICAgRTpbXCJKYW1haWNhIEN0ciAtIFBhcnNvbnMgLyBBcmNoZXJcIixcIldvcmxkIFRyYWRlIENlbnRlclwiXSxcclxuICAgICAgICAgICAgRjpbXCJKYW1haWNhIC0gMTc5dGggU3RcIixcIkNvbmV5IElzbGFuZCAtIFN0aWxsd2VsbCBBdlwiXSxcclxuICAgICAgICAgICAgRzpbXCJMb25nIElzbGFuZCBDaXR5IC0gQ291cnQgU3FcIixcIkNodXJjaCBBdmVcIl0sXHJcbiAgICAgICAgICAgIEo6W1wiSmFtYWljYSBDdHIgLSBQYXJzb25zIC8gQXJjaGVyXCIsXCJCcm9hZCBTdFwiXSxcclxuICAgICAgICAgICAgTDpbXCIxNCBTdHJlZXQgLyA4IEF2XCIsXCJDYW5hcnNpZSAtIFJvY2thd2F5IFBrd3lcIl0sXHJcbiAgICAgICAgICAgIE06W1wiRm9yZXN0IEhpbGxzIC0gNzFzdCBBdlwiLFwiTWlkZGxlIFZpbGxhZ2UgLSBNZXRyb3BvbGl0YW4gQXZlXCJdLFxyXG4gICAgICAgICAgICBOOltcIkFzdG9yaWEgLSBEaXRtYXJzIEJsdmRcIixcIkNvbmV5IElzbGFuZCAtIFN0aWxsd2VsbCBBdlwiXSxcclxuICAgICAgICAgICAgUTpbXCI5NnRoIFN0XCIsXCJDb25leSBJc2xhbmQgLSBTdGlsbHdlbGwgQXZcIl0sXHJcbiAgICAgICAgICAgIFI6W1wiRm9yZXN0IEhpbGxzIC0gNzFzdCBBdlwiLFwiQmF5IFJpZGdlIC0gOTV0aCBTdFwiXSxcclxuICAgICAgICAgICAgLy8gUzpbXCJcIixcIlwiXSwgIFPshKDsnYAg7JW96rCEIOyFlO2LgOqwmeydgOyekOyLneyehFxyXG4gICAgICAgICAgICBXOltcIkFzdG9yaWEgLSBEaXRtYXJzIEJsdmRcIixcIldoaXRlaGFsbCBTdFwiXSxcclxuICAgICAgICAgICAgWjpbXCJKYW1haWNhIEN0ciAtIFBhcnNvbnMgLyBBcmNoZXJcIixcIkJyb2FkIFN0XCJdXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGRhdGEsIGNpZCl7XHJcbiAgICAgICAgbGV0IHNwb3RzID0gZGF0YS5zcG90cy5yYW5rZWQ7XHJcbiAgICAgICAgbGV0IG1heCA9IHNwb3RzLmxlbmd0aDtcclxuICAgICAgICBpZihtYXg+OTkpe1xyXG4gICAgICAgICAgICBtYXggPSA5OTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXRyb3MgPSBkYXRhLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgIGxldCBtZXRyb0xpbmUgPSB7fTtcclxuICAgICAgICBsZXQgdGVtcExpbmUgPSB7fTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZXRyb3MubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvID0gbWV0cm9zW2pdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhhc1Nwb3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCBzcG90ID0gc3BvdHNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gNjAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBEaWYgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHNwb3QuZW50ZXJhbmNlKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHNwb3QuZW50ZXJhbmNlLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbnQgPSBzcG90LmVudGVyYW5jZVtrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcERpZiA9IGNhbGN1bGF0ZURpZihlbnQsIG1ldHJvLmNvb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0ZW1wRGlmPGRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWYgPSB0ZW1wRGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcERpZiA9IGNhbGN1bGF0ZURpZihzcG90LmNvb3IsIG1ldHJvLmNvb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYodGVtcERpZjxkaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZiA9IHRlbXBEaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaGFzU3BvdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtZXRyby5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gbWV0cm8ubGluZVtrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXRlbXBMaW5lW2xpbmVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lW2xpbmVdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGVtcExpbmVbbGluZV1baV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGlmIDwgdGVtcExpbmVbbGluZV1baV0uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVtsaW5lXVtpXSA9IHtjb29yOnNwb3QuY29vciwgcmFuazppLCBuYW1lOnNwb3QubmFtZSwgZGlmOmRpZiwgc3RuOntjb29yOm1ldHJvLmNvb3IsIG5hbWU6bWV0cm8ubmFtZX19OyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVtsaW5lXVtpXSA9IHtjb29yOnNwb3QuY29vciwgcmFuazppLCBuYW1lOnNwb3QubmFtZSwgZGlmOmRpZiwgc3RuOntjb29yOm1ldHJvLmNvb3IsIG5hbWU6bWV0cm8ubmFtZX19OyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBsaW5lIGluIHRlbXBMaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBtZXRyb0xpbmVbbGluZV0gPSB7c3BvdDpbXSxzdG46W119O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHJhbmsgaW4gdGVtcExpbmVbbGluZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb0xpbmVbbGluZV0uc3BvdC5wdXNoKHRlbXBMaW5lW2xpbmVdW3JhbmtdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZXRyb3MubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvID0gbWV0cm9zW2pdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1ldHJvLmxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lID0gbWV0cm8ubGluZVtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihtZXRyb0xpbmVbbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldHJvTGluZVtsaW5lXS5zdG4ucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6bWV0cm8uY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTptZXRyby5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb0xpbmVbbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6W10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0bjpbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcjptZXRyby5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTptZXRyby5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1ldHJvTGluZSA9IG1ldHJvTGluZTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1ldHJvTGluZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9jaXR5L21ldHJvTGluZS5qcyIsImltcG9ydCBGaXJzdF9jaGVjayBmcm9tIFwiLi9zcG90L2ZpcnN0X2NoZWNrLmpzXCI7XHJcbmltcG9ydCBTZWNvbmRfY29tYmluZSBmcm9tIFwiLi9zcG90L3Nlb25kX2NvbWJpbmUuanNcIjtcclxuaW1wb3J0IFRoaXJkX2ZpbmFsaXplIGZyb20gXCIuL3Nwb3QvdGhpcmRfZmluYWxpemUuanNcIjtcclxuXHJcbnZhciBTcG90ID0ge1xyXG4gICAgY2l0aWVzOiB7fSxcclxuICAgIG9yZGVyOlwiXCIsXHJcbiAgICBkYXRhOiB7fSxcclxuICAgIGN1cnJlbnQ6XCJcIiwgLy/tmITsnqwg67O06rOg7J6I64qUIOuPhOyLnCBjaWQgLSBmaXJlYmFzZSByZWbsl5Agb2ZmIOuLrOq4sOychO2VtFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh1X2kpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBGaXJzdF9jaGVjay5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMub3JkZXIgPSB1X2kuc2V0dGluZy5vcmRlcjtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzJykub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGF0LmNpdGllcyA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoYXQub3JkZXIgPSB1X2kuc2V0dGluZy5vcmRlcjtcclxuICAgICAgICAgICAgdGhhdC5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX3N0YXR1cygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5hY3RpdmVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY2lkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gdGhhdC5jaXRpZXNbY2lkXS5zdGF0dXMuc3BvdDtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jaXR5KGNpZCwgc3RhdHVzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIub3JkZXJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0Lm9yZGVyID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIHZhciB1aWQgPSB1X2kubWFpbDtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3VzZXJzLycgKyB1aWQgKyBcIi9zZXR0aW5nL29yZGVyXCIpLnNldCh0aGF0Lm9yZGVyKTtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX3N0YXR1cygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5yZXR1cm5cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfc3RhdHVzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vMuywqOqygOymnVxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLnJlbW92ZV9zcG90XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIFRoaXJkX2ZpbmFsaXplLnJlbW92ZV9zcG90KCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5yZWRvX3JlbW92ZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBUaGlyZF9maW5hbGl6ZS5yZWRvX3JlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9zdGF0dXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XHJcblxyXG4gICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJoZWFkZXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPGgyPuq0gOq0keyngCDrjbDsnbTthLAg7KCV66asIO2YhO2ZqTwvaDI+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwib3JkZXJcIiBpZD1cImFiY1wiPuqwgOuCmOuLpOyInDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJvcmRlclwiIGlkPVwiY2hhbmdlZFwiPuyImOygleyLnOqwhOyInDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJsaW5lciBsaW5lci0taGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NpdHlOYW1lXCI+64+E7Iuc66qFPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj7sg4Htg5w8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NoYXJnZVwiPuuLtOuLueyekDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgdmFyIG9yZGVyQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgY2lkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcmRlciA9PT0gXCJhYmNcIikge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJBcnJheS5wdXNoKHsgY2lkOiBjaWQsIGlkeDogY2l0eS5uYW1lIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IFwiY2hhbmdlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBvcmRlckFycmF5LnB1c2goeyBjaWQ6IGNpZCwgaWR4OiBjaXR5Lm9yZGVyLmNoYW5nZWQgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9yZGVyQXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5pZHggPiBiLmlkeCA/IDEgOiBhLmlkeCA8IGIuaWR4ID8gLTEgOiAwO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgc3RhdHVzQXJyYXkgPSBbXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3Bhbj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuPuyZhOujjDwvc3Bhbj48L3A+JyxcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuyZhOujjDwvc3Bhbj48L3A+J1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3JkZXJBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2lkID0gb3JkZXJBcnJheVtpXS5jaWQ7XHJcbiAgICAgICAgICAgIGxldCBjaXR5ID0gZGF0YVtjaWRdO1xyXG5cclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwibGluZXJcIiBpZD1cIicgKyBjaWQgKyAnXCI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaXR5TmFtZVwiPicgKyBjaXR5Lm5hbWUgKyAnPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCArPSBzdGF0dXNBcnJheVtjaXR5LnN0YXR1cy5zcG90XTtcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaGFyZ2VcIj7ri7Tri7nsnpA8L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7Ly93cmFwcGVyIOuLq+q4sFxyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLnNwb3RcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgICQoXCIjXCIgKyB0aGlzLm9yZGVyKS5hZGRDbGFzcyhcIm9yZGVyLS1zZWxlY3RlZFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jaXR5OiBmdW5jdGlvbiAoY2lkLCBzdGF0dXMpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgdGhhdC5jdXJyZW50KS5vZmYoXCJ2YWx1ZVwiKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgY2lkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnQgPSBjaWQ7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2l0eU5hbWUgPSB0aGF0LmNpdGllc1tjaWRdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAxKSB7ICAgLy/tmITsnqwg7KCV67O07IiY7KeR7IOB7YOcIOqygOymnVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuaGVhZGVyXCIpLmh0bWwoJzxoMj4nICsgY2l0eU5hbWUgKyAnIOygleuztOqygOymnTwvaDI+JykuYXR0cignY2lkJywgY2lkKS5hdHRyKCdjaXR5TmFtZScsY2l0eU5hbWUpLmFkZENsYXNzKFwiY2l0eU5hbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRmlyc3RfY2hlY2suaW5mbGF0ZShkYXRhLnNwb3RzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAyKSB7IC8v7ZWp7LmY6riw7J6R7JeFXHJcbiAgICAgICAgICAgICAgICAgICAgU2Vjb25kX2NvbWJpbmUuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgIC8vMuywqOqygOymne2ZlOuptOqzvCDsmYTro4ztmZTrqbTsnYAg65Sw66GcIOywqOydtOqwgCDsl4bsnYxcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmhlYWRlclwiKS5odG1sKCc8aDI+JyArIGNpdHlOYW1lICsgJyAy7LCo6rKA7KadPC9oMj4nKS5hdHRyKCdjaWQnLCBjaWQpLmF0dHIoJ2NpdHlOYW1lJyxjaXR5TmFtZSkuYWRkQ2xhc3MoXCJjaXR5TmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBUaGlyZF9maW5hbGl6ZS5pbmZsYXRlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfslYTrrLTrn7Ag642w7J207YSw6rCAIOyXhuyKteuLiOuLpC4g642w7J207YSwIOyImOynkeydhCDrqLzsoIAg7KeE7ZaJ7ZW07KO87IS47JqULicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIubmF2X19pdGVtXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnbmF2X19pdGVtLS1oYXNEcmF3ZXInKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgdGhhdC5jdXJyZW50KS5vZmYoXCJ2YWx1ZVwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5uYXZfX2RyYXdlcl9faXRlbSBcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdpZCcpID09PSAnbmF2X3Nwb3QnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgdGhhdC5jdXJyZW50KS5vZmYoXCJ2YWx1ZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwb3Q7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC5qcyIsImltcG9ydCBBdXRvQ29tYmluZSBmcm9tICcuL2F1dG9Db21iaW5lLmpzJztcclxuXHJcbnZhciBGaXJzdF9DaGVjayA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fcmVtYWluTGFyZ2VEYXRhXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5zZXRSZW1haW5OdW1iZXIoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIiksICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIuY2hlY2tfX3JlbWFpbk51bWJlclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19ub2RhdGFcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2lkID0gJCh0aGlzKS5hdHRyKCdzaWQnKTtcclxuICAgICAgICAgICAgdGhhdC5zaXRlTm9kYXRhKHNpZCk7XHJcbiAgICAgICAgICAgIHRvYXN0KCfrjbDsnbTthLAg6rO167CxIOyymOumrCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+yijO2RnCDsl4bripQg6rSA6rSR7KeA7J2YIOyijO2RnOulvCDsnoXroKXtlahcclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fc3BvdERlbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsZXRlU3BvdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fc3BvdE5hbWVcIikuaHRtbCgpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/sooztkZwg7JeG64qUIOq0gOq0keyngOydmCDsooztkZzrpbwg7J6F66Cl7ZWoXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX2NvbmZpcm1cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmlucHV0Q29vcmRpbmF0ZSgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fc3BvdENvb3JcIikudmFsKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaXRlTm9kYXRhOiBmdW5jdGlvbiAoc2lkKSB7XHJcbiAgICAgICAgdmFyIGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcblxyXG4gICAgICAgIGlmIChjb25maXJtKFwi642w7J207YSw66W8IOygleunkCDsl4bslbHri4jquYwhP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2lkICsgXCIvbm9kYXRhXCIpLnNldCh0cnVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgc2V0UmVtYWluTnVtYmVyOiBmdW5jdGlvbiAoc2l0ZSwgbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IGN1dE5vID0gbnVtYmVyLnRyaW0oKSAqIDE7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKGN1dE5vIDwgMTAwKSB7XHJcbiAgICAgICAgICAgIHRvYXN0KFwiMTAw6rCcIOydtOyDgeydmCDsnqXshozrpbwg7Jyg7KeA7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKFwi7Iic7JyEIFwiICsgY3V0Tm8gKyBcIuychCDrr7jrp4wg7J6l7IaM66W8IOuqqOuRkCDsoJzqsbDtlanri4jri6QuIOunnuyKteuLiOq5jD9cIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXRPYmogPSB0aGlzLmRhdGEuc3BvdHNbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICBjdXRPYmoubGVuZ3RoID0gY3V0Tm87XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlKS5zZXQoY3V0T2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlU3BvdDogZnVuY3Rpb24gKHNpZCwgbmFtZSkge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlID0gc2lkLnNwbGl0KFwiX1wiKVswXTtcclxuICAgICAgICBsZXQgbm8gPSBzaWQuc3BsaXQoXCJfXCIpWzFdO1xyXG5cclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShuYW1lICsgXCIg7J6l7IaM66W8IOygnOqxsO2VqeuLiOuLpC4g6rOE7IaN7ZWg6rmM7JqUP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubykuc2V0KHsgZGVsZXRlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsnqXshozqsIAg7KCc6rGw65CY7JeI7Iq164uI64ukLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShubyArIFwi67KIIOyepeyGjOulvCDsoJzqsbDtlanri4jri6QuIOqzhOyGje2VoOq5jOyalD9cIikpIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSArIFwiL1wiICsgbm8pLnNldCh7IGRlbGV0ZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiICsgc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7J6l7IaM6rCAIOygnOqxsOuQmOyXiOyKteuLiOuLpC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0Q29vcmRpbmF0ZTogZnVuY3Rpb24gKHNpZCwgY29vclR4dCkge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlID0gc2lkLnNwbGl0KFwiX1wiKVswXTtcclxuICAgICAgICBsZXQgbm8gPSBzaWQuc3BsaXQoXCJfXCIpWzFdO1xyXG4gICAgICAgIGxldCBjb29yID0ge307XHJcblxyXG4gICAgICAgIGlmIChjb29yVHh0LnNwbGl0KFwiLFwiKS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgbGV0IGxhdCA9IGNvb3JUeHQuc3BsaXQoXCIsXCIpWzBdLnRyaW0oKSAqIDE7XHJcbiAgICAgICAgICAgIGxldCBsbmcgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVsxXS50cmltKCkgKiAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzTmFOKGxhdCkgfHwgaXNOYU4obG5nKSkge1xyXG4gICAgICAgICAgICAgICAgLy/sooztkZwg7KSRIO2VmOuCmOqwgFxyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg67aA7KCV7ZmV7ZWY6rKMIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvb3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OiBsYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOiBsbmdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyijO2RnOqwgCDsnoXroKXrkJjsl4jsirXri4jri6RcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiICsgc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSArIFwiL1wiICsgbm8gKyBcIi9jb29yXCIpLnNldChjb29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOu2gOygle2Zle2VmOqyjCDsnoXroKXrkJjsl4jsirXri4jri6RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAkKFwiLmhlYWRlclwiKS5hcHBlbmQoJzxwIGNsYXNzPVwicmV0dXJuXCI+64+M7JWE6rCA6riwPC9wPicpO1xyXG5cclxuICAgICAgICBsZXQgaGFzUHJvYmxlbSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuICAgICAgICBsZXQgc2VhcmNoVXJsID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jby5rci9tYXBzL3BsYWNlLycgKyAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoJ2NpdHlOYW1lJykgKyBcIitcIjtcclxuXHJcbiAgICAgICAgbGV0IHNpdGVPYmogPSB7XHJcbiAgICAgICAgICAgIGdnOiBcIuq1rOq4gFwiLFxyXG4gICAgICAgICAgICBudjogXCLrhKTsnbTrsoRcIixcclxuICAgICAgICAgICAgdGE6IFwi7Yq466a97Ja065Oc67CU7J207KCAXCIsXHJcbiAgICAgICAgICAgIGxwOiBcIuuhoOumrO2UjOuemOuLm1wiXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiBzaXRlT2JqKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2l0ZUhhc1Byb2JsZW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yVHh0ID0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+7KKM7ZGc6rCAIOyeheugpeuQmOyngCDslYrsnYAg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICBsZXQgbm9TcG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3RUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7ruYTslrTsnojripQg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSwIO2ZleyduDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhW3NpdGVdLm5vZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtzaXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IGRhdGFbc2l0ZV1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGFzQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5kZWxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/snbzrtoDrn6wg7IKt7KCc7ZWcIOq0gOq0keyngCAtPiDrhJjslrTqsITri6RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QuY29vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5jb29yLmxuZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHNwb3QuY29vci5sbmcgKiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QuY29vci5sYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc05hTihzcG90LmNvb3IubGF0ICogMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc0Nvb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicgKyBzaXRlICsgJ18nICsgaSArICdcIj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxhIGNsYXNzPVwiY2hlY2tfX3Nwb3ROYW1lXCIgaHJlZj1cIicgKyBzZWFyY2hVcmwgKyBzcG90Lm5hbWUgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIHNwb3QubmFtZSArICc8L2E+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fc3BvdENvb3JcIiBwbGFjZWhvbGRlcj1cInh4Lnh4eHh4LCB4eC54eHh4eCDtmJXtg5wg7J6F66ClXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19jb25maXJtXCI+7KKM7ZGcIOyeheugpTwvcD48cCBjbGFzcz1cImNoZWNrX19zcG90RGVsZXRlXCI+7J6l7IaMIOyCreygnDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdfJyArIGkgKyAnXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdHh0XCI+JyArIGkgKyAnIOuyiCDqtIDqtJHsp4A8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3BvdERlbGV0ZVwiPuyepeyGjCDsgq3soJw8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZUhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vQ29vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gbm9Db29yVHh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9TcG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSBub1Nwb3RUeHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtzaXRlXS5sZW5ndGggPiAxNTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxhcmdlT0sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sYXJnZURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxhcmdlRGF0YVtzaXRlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMTUw6rCcIOydtOyDgeydmCDrjbDsnbTthLDrpbwg67O07Jyg7ZWY66Ck66m0IOuPhOyLnOuqhS9zcG90cy9sYXJnZURhdGEv7IKs7J207Yq466qF7J20IHRydWXrnbzqs6Ag67aA7Jes65CY7Ja07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXJnZU9LID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXJnZU9LID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGFyZ2VPSykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+JyArIHNpdGVPYmpbc2l0ZV0gKyAnIOyepeyGjCDrjbDsnbTthLDqsIAgMTUw6rCc66W8IOy0iOqzvCgnICsgZGF0YVtzaXRlXS5sZW5ndGggKyAn6rCcKe2VqeuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdcIj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fcmVtYWluTnVtYmVyXCIgdmFsdWU9XCInICsgZGF0YVtzaXRlXS5sZW5ndGggKyAnXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fcmVtYWluTGFyZ2VEYXRhXCI+6rCc7J2YIOyepeyGjCDsnKDsp4DtlZjquLA8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSw6rCAIOyhtOyerO2VmOyngCDslYrsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlIGNoZWNrX19ub2RhdGFcIiBzaWQ9XCInICsgc2l0ZSArICdcIj7rjbDsnbTthLDqsIAg7JuQ656YIOyXhuydhCDqsr3smrAg7YG066at7ZW07KO87IS47JqlPC9wPic7XHJcbiAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiDsm5Drnpgg7IKs7J207Yq4IOuNsOydtO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK64qUIOqyveyasOulvCDrjIDruYTtlZwg67KE7Yq87J2EIOunjOuTpOqzoCBzaXRlIOqwkuycvOuhnCBub2RhdGE6IHRydWXrpbwg64Sj7Ja07KSA64ukLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc2l0ZUhhc1Byb2JsZW0pIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7rsJzqsqzrkJwg66y47KCc6rCAIOyXhuyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzUHJvYmxlbSkge1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2ZpbmlzaFwiPuqygOyCrOulvCDrqqjrkZAg66eI7LOk7Iq164uI64ukPC9wPic7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdCAud3JhcHBlclwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cignY2lkJyk7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi67Cc6rKs65CcIOusuOygnOqwgCDsl4bslrQg642w7J207YSwIOuzke2VqeydhCDsi6Tsi5ztlanri4jri6QuXCIpO1xyXG5cclxuICAgICAgICAgICAgQXV0b0NvbWJpbmUuaW5pdChkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIud3JhcFwiKS5zY3JvbGxUb3AoMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpcnN0X0NoZWNrO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvZmlyc3RfY2hlY2suanMiLCIvL2ZpcnN0X2NoZWNr7JeQ7ISc66eMIGltcG9ydGVkIOuQmOqzoCDsgqzsmqnrkKhcclxuXHJcbnZhciBBdXRvQ29tYmluZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgIGxldCBjaWQgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGVBcnIgPSBbXCJnZ1wiLCBcImxwXCIsIFwibnZcIiwgXCJ0YVwiXTtcclxuICAgICAgICBsZXQgY29tYmluaW5nID0ge307XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpdGVBcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpdGUgPSBzaXRlQXJyW2pdO1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtzaXRlXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0ubm9EYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdW2ldICYmICFkYXRhW3NpdGVdW2ldLmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGRTcG90ID0gZGF0YVtzaXRlXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6riw7KG0IOygleuztOulvCBvbGRTcG907J2065286rOgIO2VmOyekC4g7IOI66Gc7Jq0IOyKpO2Mn+ygleuztOyXkOuKlCDsnbTrpoTsnYQg7ZWcL+yYgeycvOuhnCDrtoTtlaDtlZjqs6Ag656t7YK57J2EIOu2gOyXrO2VoCDqsoPsnbTri6QuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrbzogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW46IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IG9sZFNwb3QuY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5rOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9b6rCALe2eo10vLnRlc3Qob2xkU3BvdC5uYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5rbyA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC5uYW1lLmVuID0gb2xkU3BvdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC5yYW5rW3NpdGVdID0gaTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkU3BvdC51cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90LnVybCA9IG9sZFNwb3QudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFNwb3QudGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC50YWcgPSBvbGRTcG90LnRhZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlciA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczAwXCIgKyBjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ZXIgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzMFwiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzXCIgKyBjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyKytcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gLy/tlZzrsJTtgLQg64+M7JWY64u5XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IGNvbWJpbmVPYmogPSB7fVxyXG4gICAgICAgIGxldCBjb21iaW5lZCA9IHt9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNvZGUgaW4gY29tYmluaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBzcG90ID0gY29tYmluaW5nW2NvZGVdO1xyXG4gICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdID0gc3BvdFxyXG4gICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmUgPSB7fTtcclxuICAgICAgICAgICAgbGV0IGhhc0NvbWJpbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8v7ZWp7LmgIOqyg+ydtCDsl4bsnLzrqbQg67CU66GcIGNvbWJpbmVkIOyqveycvOuhnCDrs7Trgrjri6QuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB0Q29kZSBpbiBjb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlIDwgdENvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdFNwb3QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29tYmluaW5nW3RDb2RlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0U3BvdFtrZXldID0gY29tYmluaW5nW3RDb2RlXVtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdFNwb3QuZGVsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gY2FsY3VsYXRlRGlmKHNwb3QuY29vciwgdFNwb3QuY29vcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWYgPCAyNTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0uY29tYmluZVt0Q29kZV0gPSB0U3BvdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NvbWJpbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFoYXNDb21iaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29tYmluZWRbY29kZV0gPSBjb21iaW5lT2JqW2NvZGVdO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvbWJpbmVPYmpbY29kZV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpZCArIFwiL3Nwb3RzXCIpLnNldCh7XHJcbiAgICAgICAgICAgIGNvbWJpbmluZzogY29tYmluZU9iaixcclxuICAgICAgICAgICAgY29tYmluZWQ6IGNvbWJpbmVkXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cy9zcG90Jykuc2V0KDEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdXRvQ29tYmluZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2F1dG9Db21iaW5lLmpzIiwidmFyIFNlY29uZF9jb21iaW5lID0ge1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY29uZF9jb21iaW5lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3Qvc2VvbmRfY29tYmluZS5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4vY29uZmlnLmpzXCI7XHJcblxyXG52YXIgVGhpcmRfZmluYWxpemUgPSB7XHJcbiAgICB0ZW1wOmZhbHNlLFxyXG4gICAgc3BvdE9iajp7fSxcclxuXHJcbiAgICByZW1vdmVfc3BvdDogZnVuY3Rpb24oc2lkKXtcclxuICAgICAgICBsZXQgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzcG90TmFtZSA9ICQoXCIjXCIrc2lkKS5jaGlsZHJlbihcIi5yZXN1bHRfbmFtZV9rb1wiKS52YWwoKTtcclxuICAgICAgICBpZihjb25maXJtKGAke3Nwb3ROYW1lfSDqtIDqtJHsp4Drpbwg7KCc6rGw7ZWp64uI64ukLiDtmZXsi6TtlZzqsIDsmpQ/YCkpe1xyXG4gICAgICAgICAgICB0aGlzLnRlbXAgPSB0aGlzLnNwb3RPYmpbc2lkXTtcclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpZCtcIi9zcG90cy9jb21iaW5lZC9cIitzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB0b2FzdChcIuq0gOq0keyngOqwgCDsoJzqsbDrkJjsl4jsirXri4jri6QuXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZG9fcmVtb3ZlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaWQgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IHNpZCA9IHRoaXMudGVtcC5zaWQ7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkK1wiL3Nwb3RzL2NvbWJpbmVkL1wiK3NpZCkuc2V0KHRoaXMudGVtcCk7XHJcbiAgICAgICAgJChcIi5yZWRvX3JlbW92ZVwiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZW1wID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBsZXQgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgICQoXCIuaGVhZGVyXCIpLmFwcGVuZCgnPHAgY2xhc3M9XCJyZXR1cm5cIj7rj4zslYTqsIDquLA8L3A+Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy50ZW1wKXtcclxuICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuYXBwZW5kKCc8cCBjbGFzcz1cInJlZG9fcmVtb3ZlXCI+66eI7KeA66eJIOygnOqxsCDst6jshow8L3A+Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3BvdE9iaiA9IGRhdGEuc3BvdHMuY29tYmluZWQ7XHJcbiAgICAgICAgdGhpcy5zcG90T2JqID0gc3BvdE9iajtcclxuICAgICAgICBsZXQgcmFua0FyciA9IFtdO1xyXG4gICAgICAgIGxldCBzcG90VG90YWwgPSBPYmplY3Qua2V5cyhzcG90T2JqKS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBzaWQgaW4gc3BvdE9iaikge1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IHNwb3RPYmpbc2lkXTtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmRpdmlkdWFsQXJyID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBzaXRlIGluIHNwb3QucmFuaykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhbmsgPSBzcG90LnJhbmtbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsQXJyLnB1c2gocmFuayk7XHJcbiAgICAgICAgICAgICAgICBzY29yZSAtPSByYW5rO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRpdmlkdWFsQXJyLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtaW5SYW5rID0gaW5kaXZpZHVhbEFyclswXTtcclxuICAgICAgICAgICAgc2NvcmUgKz0gKHNwb3RUb3RhbCArIDEwMCAtIG1pblJhbmspKk1hdGguc3FydChNYXRoLnNxcnQoc3BvdFRvdGFsKSk7XHJcbiAgICAgICAgICAgIHNjb3JlIC09IG1pblJhbms7XHJcblxyXG4gICAgICAgICAgICBpZihpbmRpdmlkdWFsQXJyLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSAtPSBzcG90VG90YWwvMjtcclxuICAgICAgICAgICAgICAgIHNjb3JlIC09IG1pblJhbms7XHJcbiAgICAgICAgICAgICAgICBpZihzcG90LnJhbmsubnYpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IDUwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihpbmRpdmlkdWFsQXJyLmxlbmd0aCA9PT0gMyl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSAoc3BvdFRvdGFsIC0gbWluUmFuayk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGluZGl2aWR1YWxBcnIubGVuZ3RoID09PSA0KXtcclxuICAgICAgICAgICAgICAgIHNjb3JlICs9IHNwb3RUb3RhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmFua0Fyci5wdXNoKHtzaWQ6c2lkLCBzY29yZTpzY29yZX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmFua0Fyci5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFua0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2lkID0gcmFua0FycltpXS5zaWQ7XHJcbiAgICAgICAgICAgIGxldCBzcG90ID0gc3BvdE9ialtzaWRdO1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gXCJcIjtcclxuICAgICAgICAgICAgaWYoc3BvdC51cmwpe1xyXG4gICAgICAgICAgICAgICAgdXJsID0gc3BvdC51cmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHJhbmtpbmcgPSB7XHJcbiAgICAgICAgICAgICAgICBnZzpcIlwiLFxyXG4gICAgICAgICAgICAgICAgbnY6XCJcIixcclxuICAgICAgICAgICAgICAgIGxwOlwiXCIsXHJcbiAgICAgICAgICAgICAgICB0YTpcIlwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHNpdGUgaW4gc3BvdC5yYW5rKSB7XHJcbiAgICAgICAgICAgICAgICByYW5raW5nW3NpdGVdID0gc3BvdC5yYW5rW3NpdGVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwicmVzdWx0X2JveFwiIGlkPVwiJytzaWQrJ1wiPjxwIGNsYXNzPVwicmVzdWx0X3JhbmtcIj4nKyhpKzEpKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxpbnB1dCBjbGFzcz1cInJlc3VsdF9uYW1lX2tvXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5rbysnXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxpbnB1dCBjbGFzcz1cInJlc3VsdF9uYW1lX2VuXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5lbisnXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxpbnB1dCBjbGFzcz1cInJlc3VsdF91cmxcIiB2YWx1ZT1cIicrdXJsKydcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfZ2dcIj4nK3JhbmtpbmcuZ2crJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfbnZcIj4nK3JhbmtpbmcubnYrJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfbHBcIj4nK3JhbmtpbmcubHArJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfdGFcIj4nK3JhbmtpbmcudGErJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfc2F2ZSBzYXZlX3Nwb3RcIj7soIDsnqU8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X3JlbW92ZSByZW1vdmVfc3BvdFwiPuyCreygnDwvcD48L2Rpdj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5zcG90IC53cmFwcGVyXCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgbGV0IHB1c2hBcnIgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmtBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcHVzaEFyci5wdXNoKHNwb3RPYmpbcmFua0FycltpXS5zaWRdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkK1wiL3Nwb3RzL3JhbmtlZFwiKS5zZXQocHVzaEFycik7XHJcblxyXG4gICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IFRoaXJkX2ZpbmFsaXplO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvdGhpcmRfZmluYWxpemUuanMiLCJ2YXIgQ29uZmlnID0ge1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2NvbmZpZy5qcyIsImxldCBBY2NvdW50ID0ge1xyXG4gICAgdXNlcjoge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBpZD1cImFjY291bnRDYWxlbmRhclwiIGNsYXNzPVwiYWNjb3VudF9fY2FsZW5kYXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5hY2NvdW50XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB1aWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVpZCAhPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJbdWlkXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YVt1aWRdLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJyNhY2NvdW50Q2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgIHZpZXdSZW5kZXI6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24gKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2FjY291bnQuanMiLCJsZXQgU3Vid2F5ID0ge1xyXG4gICAgbWFwOnt9LFxyXG4gICAgbWFya2VyOmZhbHNlLFxyXG4gICAgbWV0cm86W10sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5bG9cIilcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvbnljL21ldHJvXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdGhhdC5tZXRybyA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YndheU1hcCcpLCB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiA0MC43NDg0NCwgbG5nOiAtNzMuOTg1NjYgfSxcclxuICAgICAgICAgICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tYXAuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRTdWJ3YXkoZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZmluZFN1YndheTogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgbGV0IGNvb3IgPSB7XHJcbiAgICAgICAgICAgIGxhdDplLmxhdExuZy5sYXQoKSxcclxuICAgICAgICAgICAgbG5nOmUubGF0TG5nLmxuZygpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm1hcmtlcil7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnNldE1hcChudWxsKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGUubGF0TG5nLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgIGxldCBtZXRyb0luZm8gPSB7fVxyXG4gICAgICAgIGxldCBtZXRyb0J5U3RuID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDczOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvTmFtZSA9IHRoaXMubWV0cm9baV0ubmFtZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkaWYgPSBNYXRoLnJvdW5kKGNhbGN1bGF0ZURpZihjb29yLHRoaXMubWV0cm9baV0uY29vcikpO1xyXG5cclxuICAgICAgICAgICAgaWYoZGlmPDcwMCl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMubWV0cm9baV0ubGluZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gdGhpcy5tZXRyb1tpXS5saW5lW2tdLnNsaWNlKDAsMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1ldHJvSW5mb1tsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjxtZXRyb0luZm9bbGluZV0uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvSW5mb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyb05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0luZm9bbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldHJvTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG1ldHJvQnlTdG5bbWV0cm9OYW1lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdLmxpbmUgPSBtZXRyb0J5U3RuW21ldHJvTmFtZV0ubGluZS5jb25jYXQodGhpcy5tZXRyb1tpXS5saW5lKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5tZXRyb1tpXS5saW5lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWV0QXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBsaW5lIGluIG1ldHJvSW5mbykge1xyXG4gICAgICAgICAgICBtZXRBcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bGluZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6bWV0cm9JbmZvW2xpbmVdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkaWY6bWV0cm9JbmZvW2xpbmVdLmRpZlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXRTdG5BcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gbWV0cm9CeVN0bikge1xyXG4gICAgICAgICAgICBtZXRTdG5BcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bWV0cm9CeVN0bltuYW1lXS5saW5lLFxyXG4gICAgICAgICAgICAgICAgbmFtZTpuYW1lLFxyXG4gICAgICAgICAgICAgICAgZGlmOm1ldHJvQnlTdG5bbmFtZV0uZGlmXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWV0QXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZGlmID4gYi5kaWYgPyAxIDogYS5kaWYgPCBiLmRpZiA/IC0xIDogMDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIG1ldFN0bkFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmRpZiA+IGIuZGlmID8gMSA6IGEuZGlmIDwgYi5kaWYgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3RpdGxlXCI+7Jet67OEPC9wPidcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19kaXZcIj4nXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRTdG5BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX3N0bk5hbWVcIj4nKyBtZXRTdG5BcnJheVtpXS5uYW1lICsgJ+yXrTwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fZGlmXCI+JysgTWF0aC5jZWlsKG1ldFN0bkFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTGluZVwiPidcclxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBtZXRTdG5BcnJheVtpXS5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihtZXRTdG5BcnJheVtpXS5saW5lW2tdLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTmFtZSBsbl8nK21ldFN0bkFycmF5W2ldLmxpbmVba10rJ1wiPicrbWV0U3RuQXJyYXlbaV0ubGluZVtrXSArICc8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICB0eHQrPSc8cCBjbGFzcz1cInN1YndheV9faW5mb19fdGl0bGVcIj7rhbjshKDrs4Q8L3A+J1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpdlwiPidcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2xpbmVcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lTmFtZSBsbl8nK21ldEFycmF5W2ldLmxpbmUrJ1wiPicrbWV0QXJyYXlbaV0ubGluZSArICc8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fZGlmXCI+JysgTWF0aC5jZWlsKG1ldEFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19zdG5OYW1lXCI+JysgbWV0QXJyYXlbaV0ubmFtZSArICfsl608L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgJChcIi5zdWJ3YXlfX2luZm9cIikuaHRtbCh0eHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdWJ3YXk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3N1YndheS5qcyIsImltcG9ydCBTZXRIb3RlbEluZm8gZnJvbSBcIi4vaG90ZWwvc2V0SG90ZWxJbmZvXCI7XHJcbmltcG9ydCBTZXRBcmVhIGZyb20gXCIuL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhXCI7XHJcblxyXG52YXIgSG90ZWwgPSB7XHJcblxyXG5cclxuICAgIC8vaW5mbGF0Ze2VmOuptCDtmLjthZTsnYQg66eM65Ok7Ja064K06riwIOychO2VnCDsoJXrs7Qg7IiY7KeRIOyDge2DnOqwgCDtkZzsi5zrkKggLT4gXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLm9uKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGVfc3RhdHVzKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuc3RhdHVzX19tYWtlX19ob3RlbFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSAkKHRoaXMpLmF0dHIoJ2NpZCcpO1xyXG4gICAgICAgICAgICB2YXIgY2l0eU5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcuc3RhdHVzX19jaXR5JykuaHRtbCgpO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIGNpdHlOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuaG90ZWxfX2FsZXJ0X19jb25maXJtXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChcIi5ob3RlbF9fYWxlcnRfX3dyYXBcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuaG90ZWxcIikub24oXCJjbGlja1wiLCBcIi5jaXR5QXJlYV9fZmluaXNoXCIsIGZ1bmN0aW9uICgpIHsgIC8vc2V0QXJlYeulvCDrgZ3rgrzrlYxcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykuYXR0cignY2lkJyk7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5vbmNlKCd2YWx1ZScsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhW2hpZF0uYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbaGlkXS5hcmVhID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2hpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5zZXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cy9hcmVhJykuc2V0KDIpO1xyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvc3RhdHVzL2FyZWEnKS5zZXQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jaXR5OiBmdW5jdGlvbihjaWQsIGNpdHlOYW1lKXtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgIHZhciBhbGVydE1vZGFsID0gJyc7XHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICBhbGVydE1vZGFsICs9ICAgICAnPGRpdiBjbGFzcz1cImhvdGVsX19hbGVydFwiPic7XHJcblxyXG4gICAgICAgICAgICBpZighZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7qtIDqtJHsp4Ag7KCV67O06rCAIOyVhOyngSDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7tjrjsnZjsi5zshKQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLnNwb3RzKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuc3BvdHMucmFua2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuq0gOq0keyngCDsoJXrs7TqsIAg7JWE7KeBIOygleumrOuQmOyngCDslYrslZjsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+6rSA6rSR7KeAIOygleuztOqwgCDslYTsp4Eg7KCV66as65CY7KeAIOyViuyVmOyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5sb2NhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPu2OuOydmOyLnOyEpCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEubG9jYWwubWV0cm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoIWRhdGEubWV0cm9MaW5lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukKG1ldHJvTGluZSDsl4bsnYwpLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoIWRhdGEuc3RhdHVzLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIFNldEFyZWEuaW5mbGF0ZShjaXR5TmFtZSwgY2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KCfsp4Dsl60g7ISk7KCV7J2EIOuovOyggCDsp4Ttlontlanri4jri6QnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRfX2NvbmZpcm1cIj7tmZXsnbg8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPC9kaXY+PC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIGlmKGNoZWNrKXtcclxuICAgICAgICAgICAgICAgIFNldEhvdGVsSW5mby5pbml0KGRhdGEsIGNpZCwgY2l0eU5hbWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuaG90ZWxcIikuYXBwZW5kKGFsZXJ0TW9kYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfc3RhdHVzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPGgyPuyImeyGjCDrpqzsiqTtirg8L2gyPic7XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cIndyYXBwZXJcIj4nO1xyXG5cclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJzdGF0dXNfX2xpbmVyXCI+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX25hbWVcIj7rj4Tsi5zrqoU8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2VcIj7siJnshowg642w7J207YSwPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19ob3RlbFwiPuq4sOuzuCDtmLjthZTrjbDsnbTthLA8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj7sp4Dsl63soJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj7qtIDqtJHsp4DsoJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX3RyYW5zcG9ydFwiPuuMgOykkeq1kO2GteygleuztDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgY2lkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSBjaXR5LnN0YXR1cztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cInN0YXR1c19fbGluZXJcIj4nO1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19jaXR5XCI+JytjaXR5Lm5hbWUrJzwvcD4nO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHN0YXR1cy5ob3RlbCA9PT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fbWFrZVwiPuyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2Ugc3RhdHVzX19tYWtlX19ob3RlbFwiICBjaWQ9XCInICsgY2l0eS5jb2RlICsgJ1wiPuyXhuydjCAo7YG066at7ZW0IOunjOuTpOq4sCk8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuaG90ZWw+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19ob3RlbFwiPlg8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fYXJlYVwiPk88L3A+JztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy5zcG90ID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy50cmFuc3BvcnQgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3RyYW5zcG9ydFwiPlg8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLmhvdGVsXCIpLmh0bWwodHh0KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvdGVsO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsLmpzIiwiaW1wb3J0IFNldEFUTSBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0QVRNLmpzXCI7XHJcbmltcG9ydCBTZXRGb29kIGZyb20gXCIuL3NldEhvdGVsSW5mby9zZXRGb29kLmpzXCI7XHJcbmltcG9ydCBTZXRNZXRybyBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0TWV0cm8uanNcIjtcclxuaW1wb3J0IFNldFNhZmV0eSBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0U2FmZXR5LmpzXCI7XHJcbmltcG9ydCBTZXRMYXVuZHJ5IGZyb20gXCIuL3NldEhvdGVsSW5mby9zZXRMYXVuZHJ5LmpzXCI7XHJcbmltcG9ydCBTZXRDb252aW5pZW5jZSBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0Q29udmluaWVuY2UuanNcIjtcclxuXHJcblxyXG52YXIgU2V0SG90ZWxJbmZvID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2lkLCBjaXR5TmFtZSl7XHJcbiAgICAgICAgLy9zdGF0dXNDaGVjayDsp4TtlolcclxuICAgICAgICB2YXIgY2hlY2tUeHQgPSAnJztcclxuXHJcbiAgICAgICAgdmFyIGhvdGVsID0gZGF0YS5ob3RlbHNbT2JqZWN0LmtleXMoZGF0YS5ob3RlbHMpWzBdXTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXR1cyA9IHtcclxuICAgICAgICAgICAgbG9jYWw6IHtcclxuICAgICAgICAgICAgICAgIGF0bTogeyAvLzA6IOuNsOydtO2EsCDsl4bsnYwsIDE6IOunjOuTpCDsiJgg7J6I7J2MLCAyOiDsobTsnqztlahcclxuICAgICAgICAgICAgICAgICAgICB2aXNhOjAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2l0aTowXHJcbiAgICAgICAgICAgICAgICB9LCAgXHJcbiAgICAgICAgICAgICAgICBmb29kOiAwLFxyXG4gICAgICAgICAgICAgICAgbWV0cm86IDAsXHJcbiAgICAgICAgICAgICAgICBzcG90OjBcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGFzc2Vzc21lbnQ6IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDowLFxyXG4gICAgICAgICAgICAgICAgc2FmZXR5OjAsXHJcbiAgICAgICAgICAgICAgICB0aGVtZTowLFxyXG4gICAgICAgICAgICAgICAgY29udmVuaWVuY2U6MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGhvdGVsLmxvY2FsKSB7XHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5hdG0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGhvdGVsLmxvY2FsLmF0bSkpIHsgLy9WSVNBIEFUTeydtCDsoJXrpqzrkJjsp4Ag7JWK7J2AIO2Yle2DnOuhnCDrk6TslrTqsIDsnojripQg7IOB7YOcXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vYXRt6rCd7LK066W8IOqwgOyngOqzoCDsnojripQg7IOB7YOcIC0g67CY65Oc7IucIHZpc2EgYXRt7J20IOuTpOyWtOqwgCDsnojslrTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLmF0bS5jaXRpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxvY2FsLmF0bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+ykkeyalDogQ0lUSeyekeyXheydgCBWSVNB7J6R7JeFIO2bhOyXkCDsnbTro6jslrTsoLjslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgeyAvL2xvY2Fs7JeQIGF0beydtCDsl4bsnYwgLT4g67mE7J6QIOy2lOy2nOuQnCDsoIHsnbQg7JeG7J2MXHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLnZpc2EgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmF0bSkgeyAvL+q3uCDqsr3smrDsl5Drj4QgQ0lUSeuKlCBSQVfrjbDsnbTthLDroZwg7KG07J6s7ZWgIOyImCDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7KSR7JqUOiBDSVRJ7J6R7JeF7J2AIFZJU0HsnpHsl4Ug7ZuE7JeQIOydtOujqOyWtOyguOyVvCDtlahcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLm1ldHJvKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWV0cm9MaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLnNwb3QpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnNwb3RzLnJhbmtlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9IDA7IC8vVklTQeuKlCDrrLTsobDqsbQg7Zi47YWUIOuhnOy7rOyXkCDsp4HsoJEg65Ok7Ja06rCA66+A66GcIO2YuO2FlCDroZzsu6wg6rK966Gc6rCAIOyXhuuLpOuKlCDqsoPsnYAgVklTQeqwgCDsl4bri6TripQg6rKDLlxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubG9jYWwuYXRtKSB7IC8vY2l0aeuCmCB2aXNh64qUIO2YuO2FlCDroZzsu6zsnbQg7JWE64uMIOuPhOyLnCDroZzsu6zsl5Ag7KCA7J6l65CgIOyImCDsnojsnYwuXHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLm1ldHJvTGluZSkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLnNwb3RzLnJhbmtlZCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGVja1R4dCArPSAnPGgyIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdGl0bGVcIj7tmLjthZQg7KO867OA7KCV67O0PC9oMj4nO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCBWSVNBIEFUTeygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuYXRtLnZpc2EgPT09IDEpIHtcclxuICAgICAgICAgICAgU2V0QVRNLmluaXQoZGF0YSwgY2lkKTtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIFZJU0EgQVRN7KCV67O0IO2ZleyduC4g7Zi47YWU67OE66GcIOqwgOyepSDqsIDquYzsmrQgQVRN6rO8IDI07Iuc6rCEIEFUTeydhCDstpTstpztlanri4jri6QuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuYXRtLnZpc2EgPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0gVklTQSBBVE3soJXrs7TqsIAg7JeG7Iq164uI64ukLiBWSVNBIEFUTSBsb2NhdG9y7JeQ7IScIOygleuztOulvCDrqLzsoIAg7YGs66Gk66eB7ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCBDSVRJIEFUTeygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuYXRtLmNpdGkgPT09IDEpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIENJVEkgQVRN7KCV67O0IO2ZleyduC4g6rCA7J6lIOqwgOq5jOyatCBDSVRJIEFUTeydhCDstpTstpztlanri4jri6QuPC9wPic7XHJcbiAgICAgICAgfSAvLyBjaXRpIHN0YXR1cyAw7J2AIOyXhuydjC5cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5mb29kID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIOyLneujjO2SiOygkC/tjrjsnZjsoJAg7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5mb29kID09PSAxKSB7XHJcbiAgICAgICAgICAgIFNldEZvb2QuaW5pdChkYXRhLCBjaWQpO1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg7Iud66OM7ZKI7KCQL+2OuOydmOygkCDsoJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA6rmM7Jq0IOyLneujjO2SiOygkCDstpTstpwuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuZm9vZCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHQgY29sb3ItLXJlZFwiPk5vIERhdGEgLSDrj4Tsi5wg7Iud66OM7ZKI7KCQL+2OuOydmOygkCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLiDrqLzsoIAg7KCV67O066W8IOyeheugpe2VtOyjvOyEuOyalC48L3A+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFNldExhdW5kcnkuaW5pdChkYXRhLCBjaXR5TmFtZSk7XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwubWV0cm8gPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwg7KeA7ZWY7LKgL+uMgOykkeq1kO2GtSDsoJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLm1ldHJvID09PSAxKSB7XHJcbiAgICAgICAgICAgIFNldE1ldHJvLmluaXQoZGF0YSwgY2l0eU5hbWUpO1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg7KeA7ZWY7LKgL+uMgOykkeq1kO2GtSDsoJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA6rmM7Jq0IOyngO2VmOyyoCDstpTstpwuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwubWV0cm8gPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0g64+E7IucIOyngO2VmOyyoC/rjIDspJHqtZDthrUg7KCV67O06rCAIOyXhuyKteuLiOuLpC4g66i87KCAIOygleuztOulvCDsnoXroKXtlbTso7zshLjsmpQuPC9wPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLnNwb3QgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwg6rSA6rSR7KeAIOygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuc3BvdCA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg6rSA6rSR7KeAIOygleuztCDtmZXsnbguIO2YuO2FlOuzhOuhnCDqsIDquYzsmrQg6rSA6rSR7KeAIOy2lOy2nC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5zcG90ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIOuPhOyLnCDqtIDqtJHsp4Ag7Iic7JyE6rCAIOyVhOyngSDtmZXsoJXrkJjsp4Ag7JWK7JWY7Iq164uI64ukLiDrqLzsoIAg7ZmV7J247ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU2V0U2FmZXR5LmluaXQoZGF0YSwgY2l0eU5hbWUpO1xyXG4gICAgICAgIFNldENvbnZpbmllbmNlLmluaXQoZGF0YSwgY2l0eU5hbWUpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaWQpLnNldChkYXRhKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coY2hlY2tUeHQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0SG90ZWxJbmZvO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldEFUTSA9IHtcclxuICAgIHN0YXRpc3RpYzoge1xyXG4gICAgICAgIG5lYXJlc3Q6W10sIC8v6rCA7J6lIOqwgOq5jOyatCBBVE3snYAg66qHIG0g6rGw66as7JeQIOyeiOuKlOyngCDrj4Tsi5wg7KCE7LK0IO2Pieq3oOydhCDrgrTquLAg7JyE7ZWcIOuNsOydtO2EsFxyXG4gICAgICAgIGJhbmsyNDpbXSwgICAvLzI07Iuc6rCEIOyatOyYge2VmOuKlCDsnYDtlokg7IaM7JygIOqxsOumrOyXkCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgICAgICBpbjEzMDpbXSAvL+uwmOqyvSAxMzBtIOuCtOyXkCBBVE3snbQg66qHIOqwnCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgIH0sXHJcbiAgICBieUFyZWE6IHt9LCAvL2luMTMwIHN0YXTsnYQg7KeA7Jet67OE66GcIO2Pieq3oOuCtOq4sCDsnITtlZwg6rCd7LK0XHJcblxyXG4gICAgZGF0YTp7fSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSwgY2lkKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5maXJzdF9ieUhvdGVscygpOyAvL+2YuO2FlOuTpOydhCDrj4zrqbAg6rCA7J6lIOqwgOq5jOyatCBBVE0sIOydgO2WieyGjOycoCAyNOyLnOqwhCBBVE0sIDEzMG3slYjsl5Ag66qHIOqwnCBBVE0g7J6I64qU7KeA66W8IOywvuyVhOuCtOqzoCDthrXqs4Tsl5Drj4Qg6riw66GdXHJcbiAgICAgICAgdGhpcy5zZWNvbmRfYnlBcmVhcygpOyAvL+yngOyXreuzhOuhnCAxMzBtIOuCtOyXkCDsnojripQgQVRNIOqwr+yImCDtj4nqt6DsnYQg64OEIC0+IOyngOyXrSDsg4Hsl4Ug67Cc7KCE64+E66W8IOuCmOykkeyXkCDssrTtgaztlZjquLAg7JyE7ZW0IOunjOuTpOyXiOydjC5cclxuICAgICAgICB0aGlzLmZpZnRoX21ha2VTY29yZSgpO1xyXG4gICAgICAgIHRoaXMuc2l4dGhfd29yZGluZygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmaXJzdF9ieUhvdGVsczogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgaG90ZWxzID0gdGhpcy5kYXRhLmhvdGVscztcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBoaWQgaW4gaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IGhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICBpZiAoaG90ZWwudGVtcC5hdG0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdG1BcnIgPSBob3RlbC50ZW1wLmF0bTtcclxuICAgICAgICAgICAgICAgIHZhciBhdG1PYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDoge2RpZjoyMDAwfSxcclxuICAgICAgICAgICAgICAgICAgICBpbjEzMDogMCxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdG1BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXRtID0gYXRtQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoYXRtLmNvb3IsIGhvdGVsLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMTMwLjEpIHsgLy/siJnshozrs4QgMTMwbeqxsOumrCBhdG0g6rCv7IiYIOyytO2BrFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdG1PYmouaW4xMzArKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYXRtT2JqLmJhbmsyNCkgey8v6riw67O47KCB7Jy866GcIOqxsOumrOyInCDsoJXroKwg65CY7Ja07J6I7Ja07IScIOydtOuvuCDrk6TslrTqsIDsnojsnLzrqbQg6re464aI7J20IOuNlCDqsIDquYzsmrTrhohcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZiA8IGF0bU9iai5uZWFyZXN0LmRpZikgeyAvL+yImeyGjOuzhCDsnYDtlokg7IaM7JygIDI07Iuc6rCEIGF0bSDri7TsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYXRtLm93bmVyLmluY2x1ZGVzKFwiQkFOS1wiKXx8YXRtLnBsYWNlTmFtZS5pbmNsdWRlcyhcIkJBTktcIikpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtT2JqLm5lYXJlc3QgPSBhdG07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtT2JqLm5lYXJlc3QuZGlmID0gZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdG1PYmoubmVhcmVzdC5zY29yZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v7Ya16rOE7JeQIOq4sOuhne2VmOq4sFxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLm5lYXJlc3QucHVzaChhdG1PYmoubmVhcmVzdC5kaWYpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuYXRtID0gYXRtT2JqO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwgPSB7YXRtOiBhdG1PYmp9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vaW4xMzDsnYAg7Zi47YWU7J2EIO2VnCDrsogg64ukIOuPiCDri6TsnYzsl5Ag7Ya16rOE7JeQIOq4sOuhne2VoCDsiJgg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5pbjEzMC5wdXNoKGF0bU9iai5pbjEzMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0pey8v7KeA7Jet67OEIGF0bSDrsIDsp5Hrj4Trpbwg7ZmV7J247ZWY64qUIOq3uOufsCDrhYDshJ1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXS5wdXNoKGF0bU9iai5pbjEzMCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXSA9IFthdG1PYmouaW4xMzBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0KGBWSVNBIEFUTSDsoJXrs7TqsIAg7JeG64qUIO2YuO2FlOydtCDsnojsirXri4jri6QuIO2ZleyduCDtm4Qg7J6s7Iuc64+E7ZW07KO87IS47JqUYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlY29uZF9ieUFyZWFzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBhcmVhID0gdGhpcy5kYXRhLmFyZWE7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJlYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmKCFhcmVhW2ldLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ieUFyZWFbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdG1zID0gdGhpcy5ieUFyZWFbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXRtcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW0gKz0gYXRtc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbnVzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZihhdG1zLmxlbmd0aCA8IDEwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWludXMgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXRtcyA9IChzdW0vKGF0bXMubGVuZ3RoKSArIGF0bXMubGVuZ3RoLzEwKSArIG1pbnVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0ubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsLmF0bSA9IGF0bXMudG9GaXhlZCgyKSoxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtOiBhdG1zLnRvRml4ZWQoMikqMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0ubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsLmF0bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdG06IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpZnRoX21ha2VTY29yZTogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIHNjb3JlQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICB2YXIgc2NvcmUgPSBob3RlbC5sb2NhbC5hdG0ubmVhcmVzdC5kaWY7XHJcbiAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaCh7c2NvcmU6c2NvcmUsaGlkOmhpZH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzY29yZUFycmF5LnNvcnQoKGEsIGIpID0+IGEuc2NvcmUgLSBiLnNjb3JlKTsgLy/rgq7snYTsiJjroZ0g7KKL7J2MXHJcblxyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBzY29yZUFycmF5Lmxlbmd0aDtcclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5hdG0uc2NvcmUucGVyY2VudGlsZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWQgPSBzY29yZUFycmF5W2ldLmhpZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgdmFyIHJhbmsgPSAoKGkrMSkgLyB0b3RhbCk7IC8vIOuwseu2hOychFxyXG4gICAgICAgICAgICB2YXIgcGVyY2VudGlsZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXNSYW5rZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmFua1N5cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzUmFua2VkKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSBwZXJjZW50aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRpbGUgKz0gcmFua1N5c1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFuazxwZXJjZW50aWxlKXsgIC8vMzUlIOyViOyXkCDrk6TrqbRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuayAtPSBtaW51czsgICAvL3JhbmvrpbwgMH4wLjLroZwg66ee7Law7KSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gKDEwLWopIC0gTWF0aC5jZWlsKChyYW5rL3JhbmtTeXNbal0pKjEwKS8xMDsgLy9yYW5rKDB+MC4yKeulvCAwLjLroZwg64KY64iI6rCSKjEwLzEwIC0+IDB+MC456rCAIOuCmOyYtFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JhbmtlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuYXRtID0gc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlID0ge2F0bTpzY29yZX07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZTp7YXRtOnNjb3JlfSxcclxuICAgICAgICAgICAgICAgICAgICB3b3JkOnthdG06XCJcIn1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNpeHRoX3dvcmRpbmc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICB2YXIgZGlmID0gZGlmVG9NaW4oaG90ZWwubG9jYWwuYXRtLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgdmFyIHR4dCA9IGDqsIDsnqUg6rCA6rmM7Jq0IOydgO2WiSDshozsnKAgQVRN7J2AIOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyeiOydjGA7XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50LndvcmQpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLmF0bSA9IHR4dDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQgPSB7YXRtOnR4dH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXRBVE07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEFUTS5qcyIsImltcG9ydCBHZW9Db2RlIGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL2dlb0NvZGUuanNcIjtcclxuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi4vY29uZmlnLmpzXCI7XHJcblxyXG52YXIgU2V0Rm9vZCA9IHtcclxuICAgIGRhdGE6e30sXHJcblxyXG4gICAgc3RhdGlzdGljOntcclxuICAgICAgICBuZWFyZXN0OltdLFxyXG4gICAgICAgIG5lYXJieTpbXVxyXG4gICAgfSxcclxuICAgIGJ5QXJlYTp7fSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaWQpe1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgaWYodGhpcy5maXJzdF9nZW9Db2RlKGNpZCkpeyAgICAvL+yngOyYpOy9lOuUqSDtlaAg6rKMIOyXhuycvOuptCBzZWNvbmTrtoDthLAg7KeE7ZaJ7ZWoXHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kX3NldEZvb2QoKTsgIC8v7IiZ7IaM67OE66GcIOyLneujjO2SiOygkOuTpOydhCDrlYzroKTrhKPsnYxcclxuICAgICAgICAgICAgdGhpcy50aGlyZF9ieUFyZWFzKCk7IC8v7Ya16rOE6rCS7J2EIOunjOuTpOyWtOuDhFxyXG4gICAgICAgICAgICB0aGlzLmZvdXJ0aF9tYWtlU3RhdHMoKTsgLy/thrXqs4TqsJLsnYQg66eM65Ok7Ja064OEIC0gY2lkL3N0YXQvbG9jYWwvZm9vZCDrnbzqs6Ag65Ok7Ja06rCI6rKD7J6EXHJcbiAgICAgICAgICAgIHRoaXMuZmlmdGhfbWFrZVNjb3JlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2l4dGhfd29yZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzaXh0aF93b3JkaW5nOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIXRvZG8hISEg7KeA6riI7J2AIOuJtOyalSDquLDspIDsnLzroZwg65CY7Ja07J6I7J2MIC0+IOuPhOyLnOuzhOuhnCDrgpjriITquLAo7JiILe2OuOydmOygkCDsnojripQg64+E7Iuc7JqpKVxyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmZvb2Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb29kID0gaG90ZWwubG9jYWwuZm9vZDtcclxuICAgICAgICAgICAgICAgICAgICBpZihmb29kLmdyb2Nlcnkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmb29kLmxhcmdlKXsgLy/rkZgg64ukIOyeiOuKlCDsvIDsnbTsiqRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihmb29kLmxhcmdlLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqb3NhID0gZm9vZC5sYXJnZS5uZWFyZXN0Lmpvc2E7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IGZvb2QubGFyZ2UubmVhcmVzdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZm9vZC5sYXJnZS5uZWFyZXN0LmRpZiA8IGZvb2QuZ3JvY2VyeS5uZWFyZXN0LmRpZiArIDUwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSBg6rCB7KKFIOyLneujjO2SiOydhCDsgrQg7IiYIOyeiOuKlCDrjIDtmJUg66eI7Yq47J24ICR7bmFtZX0ke2pvc2F9IOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyeiOydjGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2RpZiA9IGRpZlRvTWluKGZvb2QuZ3JvY2VyeS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gYOqwhOuLqO2VnCDrqLnqsbDrpqzrpbwg7IK0IOyImCDsnojripQg7Iud66OM7ZKI7KCQ7J20IOuPhOuztCAke2dkaWZ9IOqxsOumrOyXkCDsnojqs6AsIOqwgeyihSDsnYzsi53rk6TsnYQg7IK0IOyImCDsnojripQg64yA7ZiVIOuniO2KuCAke25hbWV9JHtqb3NhfSDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYxgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXsgIC8vZ3JvY2VyeeunjCDsnojripQg7LyA7J207IqkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gZGlmVG9NaW4oZm9vZC5ncm9jZXJ5Lm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCA9IGDqsITri6jtlZwg66i56rGw66as66W8IOyCtCDsiJgg7J6I64qUIOyLneujjO2SiOygkOydtCDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYxgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoZm9vZC5sYXJnZSl7IC8vL+yjvOuzgOyXkCBncm9jZXJ564qUIOyXhuuKlOuNsCBsYXJnZeunjCDsnojripQg7Yq57J207LyA7J207IqkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihmb29kLmxhcmdlLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBmb29kLmxhcmdlLm5lYXJlc3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpvc2EgPSBmb29kLmxhcmdlLm5lYXJlc3Quam9zYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gYOqwgeyihSDsi53ro4ztkojsnYQg7IK0IOyImCDsnojripQg64yA7ZiVIOuniO2KuCAke25hbWV9JHtqb3NhfSDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYxgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCA9ICfsi53ro4ztkojsnYQg7IK0IOunjO2VnCDqs7PsnYAg7KO867OAIDXrtoTqsbDrpqwg7J2064K07JeQIOyXhuydjCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdHh0ID0gJ+yLneujjO2SiOydhCDsgrQg66eM7ZWcIOqzs+ydgCDso7zrs4AgNeu2hOqxsOumrCDsnbTrgrTsl5Ag7JeG7J2MJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC53b3JkKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5mb29kID0gdHh0O1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZCA9IHtmb29kOnR4dH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpZnRoX21ha2VTY29yZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgc2NvcmVBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwuZm9vZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2luZCBpbiBob3RlbC5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb29kID0gaG90ZWwubG9jYWwuZm9vZFtraW5kXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5lYXJlc3REaWYgPSBmb29kLm5lYXJlc3QuZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gKENvbmZpZy5mb29kLmtpbmRba2luZF0uc3RkIC0gbmVhcmVzdERpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKENvbmZpZy5mb29kLmtpbmRba2luZF0ubXVsdGlwbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSBzY29yZSAqIENvbmZpZy5mb29kLmtpbmRba2luZF0ubXVsdGlwbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gZm9vZC5uZWFyYnkqMjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2NvcmVBcnJheS5wdXNoKHtzY29yZTpzY29yZSxoaWQ6aGlkfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNjb3JlQXJyYXkuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpOyAvL+uGkuydhOyImOuhnSDsoovsnYxcclxuXHJcbiAgICAgICAgdmFyIHRvdGFsID0gc2NvcmVBcnJheS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciByYW5rU3lzID0gQ29uZmlnLmZvb2Quc2NvcmUucGVyY2VudGlsZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWQgPSBzY29yZUFycmF5W2ldLmhpZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgbGV0IHJhbmsgPSAoKGkrMSkgLyB0b3RhbCk7IC8vIOuwseu2hOychCAtIDB+MSAo64aS7J2E7IiY66GdIDDsl5Ag6rCA6rmM7JuAKVxyXG4gICAgICAgICAgICB2YXIgcGVyY2VudGlsZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXNSYW5rZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmFua1N5cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzUmFua2VkKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSBwZXJjZW50aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRpbGUgKz0gcmFua1N5c1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFuazxwZXJjZW50aWxlKXsgIC8vMzUlIOyViOyXkCDrk6TrqbRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuayAtPSBtaW51czsgICAvL3JhbmvrpbwgMH4wLjLroZwg66ee7Law7KSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gKDEwLWopIC0gTWF0aC5jZWlsKChyYW5rL3JhbmtTeXNbal0pKjEwKS8xMDsgLy9yYW5rKDB+MC4yKeulvCAwLjLroZwg64KY64iI6rCSKjEwLzEwIC0+IDB+MC456rCAIOuCmOyYtFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JhbmtlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuZm9vZCA9IHNjb3JlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZSA9IHtmb29kOnNjb3JlfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOntmb29kOnNjb3JlfSxcclxuICAgICAgICAgICAgICAgICAgICB3b3JkOntmb29kOlwiXCJ9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmb3VydGhfbWFrZVN0YXRzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBzdGF0ID0ge1xyXG4gICAgICAgICAgICBuZWFyZXN0OiAwLFxyXG4gICAgICAgICAgICBuZWFyYnk6MFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAodmFyIGlkIGluIHN0YXQpIHtcclxuICAgICAgICAgICAgdmFyIHN1bSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5zdGF0aXN0aWNbaWRdLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBzdW0gKz0gdGhpcy5zdGF0aXN0aWNbaWRdW2tdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0YXRbaWRdID0gc3VtL3RoaXMuc3RhdGlzdGljW2lkXS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHN0YXRbaWRdID0gc3RhdFtpZF0udG9GaXhlZCgyKSoxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5kYXRhLnN0YXQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuc3RhdC5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RhdC5sb2NhbC5mb29kID0gc3RhdDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RhdC5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBmb29kOiBzdGF0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0ID0ge1xyXG4gICAgICAgICAgICAgICAgbG9jYWw6e2Zvb2Q6c3RhdH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHRoaXJkX2J5QXJlYXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGFyZWEgPSB0aGlzLmRhdGEuYXJlYTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYoIWFyZWFbaV0ubm90QXJlYSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ5QXJlYVtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvb2RzID0gdGhpcy5ieUFyZWFbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZm9vZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGZvb2RzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZvb2RzLmxlbmd0aCA8IDEwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWludXMgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vZHMgPSAoc3VtLyhmb29kcy5sZW5ndGgpICsgZm9vZHMubGVuZ3RoLzEwKSArIG1pbnVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0ubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsLmZvb2QgPSBmb29kcy50b0ZpeGVkKDIpKjE7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb29kOiBmb29kcy50b0ZpeGVkKDIpKjFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmVhW2ldLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbC5mb29kID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb2Q6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlY29uZF9zZXRGb29kOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgdmFyIGlzU29tZUZvb2QgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gdGhpcy5kYXRhLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgIHZhciBncm9BcnIgPSB0aGlzLmRhdGEubG9jYWwuZm9vZFt0eXBlXTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGQgPSBDb25maWcuZm9vZC5raW5kW3R5cGVdLnN0ZDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb29kID0gZ3JvQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoaG90ZWwuY29vciwgZm9vZC5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlmPHN0ZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU29tZUZvb2QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb29kLmRpZiA9IGRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vZC50eXBlID0gdHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLnRlbXApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwudGVtcC5mb29kKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC50ZW1wLmZvb2RbdHlwZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2RbdHlwZV0ucHVzaChmb29kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwudGVtcC5mb29kW3R5cGVdID0gW2Zvb2RdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZFt0eXBlXSA9IFtmb29kXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb2Q6e31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2RbdHlwZV0gPSBbZm9vZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFpc1NvbWVGb29kKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHZhciBuZWFyYnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5lYXJlc3QgPSB7ZGlmOjk5OX07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBob3RlbC50ZW1wLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2RbdHlwZV0uc29ydCgoYSwgYikgPT4gYS5kaWYgLSBiLmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvb2RBcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICBob3RlbC50ZW1wLmZvb2RbdHlwZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvcHkgPSAkLmV4dGVuZCh0cnVlLHt9LGhvdGVsLnRlbXAuZm9vZFt0eXBlXVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb2RBcnIucHVzaChjb3B5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5lYXJieSArPSBmb29kQXJyLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZm9vZEFyclswXS5kaWYgPCBuZWFyZXN0LmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3QgPSBmb29kQXJyWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZm9vZEFyci5sZW5ndGg+NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb2RBcnIubGVuZ3RoID0gNTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwuZm9vZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5mb29kW3R5cGVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJieTogaG90ZWwudGVtcC5mb29kW3R5cGVdLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyNTogZm9vZEFycixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyZXN0OiBmb29kQXJyWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmZvb2QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmZvb2RbdHlwZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmJ5OiBob3RlbC50ZW1wLmZvb2RbdHlwZV0ubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXI1OiBmb29kQXJyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3Q6IGZvb2RBcnJbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwgPSB7Zm9vZDp7fX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmxvY2FsLmZvb2RbdHlwZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyYnk6IGhvdGVsLnRlbXAuZm9vZFt0eXBlXS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyNTogZm9vZEFycixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3Q6IGZvb2RBcnJbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0pey8v7KeA7Jet67OEIGZvb2Qg67CA7KeR64+E66W8IO2ZleyduO2VmOuKlCDqt7jrn7Ag64WA7ISdXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0ucHVzaChuZWFyYnkpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0gPSBbbmVhcmJ5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5uZWFyZXN0LnB1c2gobmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmJ5LnB1c2gobmVhcmJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlyc3RfZ2VvQ29kZTogZnVuY3Rpb24oY2lkKXtcclxuICAgICAgICB2YXIgZ3JvQXJyID0gdGhpcy5kYXRhLmxvY2FsLmZvb2QuZ3JvY2VyeTtcclxuICAgICAgICB2YXIgZ2VvQXJyID0gW107XHJcbiAgICAgICAgdmFyIGlzR2VvTmVlZGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBncm9jZXJ5ID0gZ3JvQXJyW2ldO1xyXG4gICAgICAgICAgICBpZighZ3JvY2VyeS5jb29yKXtcclxuICAgICAgICAgICAgICAgIGdlb0Fyci5wdXNoKHthZGRyZXNzOmdyb2NlcnkuYWRkcmVzcywgYWlkOml9KTtcclxuICAgICAgICAgICAgICAgIGlzR2VvTmVlZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZighZ3JvY2VyeS5jb29yLmxhdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2VvQXJyLnB1c2goe2FkZHJlc3M6Z3JvY2VyeS5hZGRyZXNzLCBhaWQ6aX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzR2VvTmVlZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc0dlb05lZWRlZCl7XHJcbiAgICAgICAgICAgIHZhciByZWYgPSBcImNpdGllcy9cIitjaWQrXCIvbG9jYWwvZm9vZC9ncm9jZXJ5XCI7XHJcbiAgICAgICAgICAgIEdlb0NvZGUuaW5pdChnZW9BcnIsIHJlZik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0Rm9vZDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0Rm9vZC5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldE1ldHJvID0ge1xyXG4gICAgc3RhdGlzdGljOntuZWFyZXN0OltdfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaXR5TmFtZSl7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmNpdHlOYW1lID0gY2l0eU5hbWU7XHJcbiAgICAgICAgdGhpcy5maXJzdF9zZXRNZXRybygpOyAvL+yImeyGjOuzhOuhnCDsp4DtlZjssqDsnYQg65WM66Ck64Sj7J2MXHJcbiAgICAgICAgdGhpcy5zZWNvbmRfYnlBcmVhcygpO1xyXG4gICAgICAgIHRoaXMudGhpcmRfbWFrZVNjb3JlKCk7XHJcbiAgICAgICAgdGhpcy5mb3VydGhfd29yZGluZygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmb3VydGhfd29yZGluZzogZnVuY3Rpb24oKXtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY2l0eU5hbWUgPSB0aGlzLmNpdHlOYW1lO1xyXG4gICAgICAgIHZhciB0b3RhbExpbmUgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEubWV0cm9MaW5lKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgbGV0IHR4dEFyciA9IFtdO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1ldHJvID0gaG90ZWwubG9jYWwubWV0cm87XHJcbiAgICAgICAgICAgIGlmKG1ldHJvKXtcclxuICAgICAgICAgICAgICAgIHZhciBuZWFyZXN0RGlmID0gZGlmVG9NaW4obWV0cm8ubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5lYXJlc3RTdG4gPSBtZXRyby5uZWFyZXN0Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZU5vID0gT2JqZWN0LmtleXMobWV0cm8uYnlMaW5lKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BvdE5vID0gT2JqZWN0LmtleXMobWV0cm8uc3BvdCkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjb3JlID0gaG90ZWwuYXNzZXNzbWVudC5zY29yZS50cmFuc3BvcnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXZnVGltZSA9IGRpZlRvTWluKG1ldHJvLmF2Z0RpZik7XHJcbiAgICAgICAgICAgICAgICB0eHRBcnIucHVzaChg7IiZ7IaM7JeQ7IScIOqwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J2AIOuPhOuztCAke25lYXJlc3REaWZ9IOqxsOumrOydmCAke25lYXJlc3RTdG597JetYCk7XHJcbiAgICAgICAgICAgICAgICB0eHRBcnIucHVzaChg64+E67O0IDEw67aE6rGw66asIOydtOuCtOyXkCAke3RvdGFsTGluZX3qsJzsnZggJHtjaXR5TmFtZX0g7KCE7LK0IOyngO2VmOyyoCDrhbjshKAg7KSRICR7bGluZU5vfeqwnCDrhbjshKDsnbQg7KeA64KoYCk7XHJcbiAgICAgICAgICAgICAgICB0eHRBcnIucHVzaChgJHtjaXR5TmFtZX0gMTAw64yAIOq0gOq0keyngCDspJEgJHtzcG90Tm996rCc66W8IOyngO2VmOyyoCDtmZjsirkg7JeG7J20IO2Pieq3oCAke2F2Z1RpbWV97J2YIOuPhOuztCDsnbTrj5nsnLzroZwg67Cp66y4IOqwgOuKpWApO1xyXG4gICAgICAgICAgICAgICAgaWYoc2NvcmU+OC45KXtcclxuICAgICAgICAgICAgICAgICAgICB0eHRBcnIucHVzaCgn7KeA7ZWY7LKg7J2EIOydtOyaqe2VtCDqtIDqtJHtlZjquLAg66ek7JqwIO2OuOumrO2VnCDrjIDspJHqtZDthrXsnZgg7LWc6rOgIOyalOyngOyXkCDsnITsuZjtlagnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNjb3JlPjcuOSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0QXJyLnB1c2goJ+yngO2VmOyyoOydhCDsnbTsmqntlbQg6rSA6rSR7ZWY6riwIO2OuOumrO2VnCDrjIDspJHqtZDthrXsnZgg7JqU7KeA7JeQIOychOy5mO2VqCcpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Ni45KXtcclxuICAgICAgICAgICAgICAgICAgICB0eHRBcnIucHVzaCgn7KeA7ZWY7LKg7J2EIOydtOyaqe2VtCDqtIDqtJHtlZjquLAg64KY7IGY7KeAIOyViuydgCDsnITsuZjsl5Ag7J6I7J2MJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihzY29yZT41Ljkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dEFyci5wdXNoKCfsp4DtlZjssqDsnYQg7J207Jqp7ZW0IOq0gOq0ke2VmOq4sOyXkCDslYTso7wg7KKL7J2AIOychOy5mOuKlCDslYTri5gnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dEFyci5wdXNoKCfrjIDspJHqtZDthrUg7Y647J2Y7ISx7J2AIOyVveqwhCDrgq7snYAg7Y647Jy866GcLCDqtIDqtJHsnbQg7KGw6riIIOu2iO2OuO2VoCDsiJgg7J6I7J2MJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS50cmFuc3BvcnQgPSA0O1xyXG4gICAgICAgICAgICAgICAgdHh0QXJyID0gW1wi7J20IOyImeyGjCDrj4Trs7QgMTXrtoQg7J2064K0IOqxsOumrOyXkCDsp4DtlZjssqAg7Jet7J20IOyXhuyWtOyEnCDrjIDspJHqtZDthrXsnYQg7J207Jqp7ZWY6riwIOu2iO2OuO2VoCDsiJgg7J6I7J2MXCJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC50cmFuc3BvcnQgPSB0eHRBcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB0aGlyZF9tYWtlU2NvcmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHNjb3JlQXJyYXkgPSBbXTtcclxuICAgICAgICAvLzHqsJwg6rSA6rSR7KeA66W8IOqwiCDsiJgg7J6I7J2EIOuVjOuniOuLpCAxODAwIC0gZGlm7ZWp6rOEKO2YuO2FlOyXkOyEnCwg64K066Ck7IScKeygkOunjO2BvCDstpTqsIBcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICBsZXQgbWV0cm8gPSBob3RlbC5sb2NhbC5tZXRybztcclxuICAgICAgICAgICAgbGV0IHNwb3RzID0gdGhpcy5kYXRhLnNwb3RzLnJhbmtlZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgbGV0IG1ldHJvTGluZU9iaiA9IHRoaXMuZGF0YS5tZXRyb0xpbmU7XHJcbiAgICAgICAgICAgIGxldCBzcG90T2JqID0ge307XHJcblxyXG4gICAgICAgICAgICBpZihtZXRybyl7XHJcbiAgICAgICAgICAgICAgICBtZXRyby5zcG90ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBsaW5lTmFtZSBpbiBtZXRyby5ieUxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IG1ldHJvLmJ5TGluZVtsaW5lTmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZkhvdGVsID0gbGluZS5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXRyb0xpbmVPYmpbbGluZU5hbWVdLnNwb3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBtZXRyb0xpbmVPYmpbbGluZU5hbWVdLnNwb3RbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWZTcG90ID0gc3BvdC5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3RPYmpbc3BvdC5yYW5rXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkaWZTcG90ICsgZGlmSG90ZWwgPCBzcG90T2JqW3Nwb3QucmFua10uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90T2JqW3Nwb3QucmFua10gPSB7ZGlmOiAoZGlmU3BvdCArIGRpZkhvdGVsKSwgbGluZTpsaW5lTmFtZX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdE9ialtzcG90LnJhbmtdID0ge2RpZjogKGRpZlNwb3QgKyBkaWZIb3RlbCksIGxpbmU6bGluZU5hbWV9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGF2ZyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcmFuayBpbiBzcG90T2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gKDE4MDAgLSBzcG90T2JqW3JhbmtdLmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZnICs9IHNwb3RPYmpbcmFua10uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBob3RlbFNwb3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IHNwb3RzW3JhbmtdLmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHNwb3RPYmpbcmFua10ubGluZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTpzcG90c1tyYW5rXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcG90TWV0cm9OYW1lOnNwb3RzW3JhbmtdLm1ldHJvSW5mb1tzcG90T2JqW3JhbmtdLmxpbmVdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6cmFua1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm8uc3BvdC5wdXNoKGhvdGVsU3BvdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhdmcgPSBNYXRoLnJvdW5kKChhdmcgLyBPYmplY3Qua2V5cyhzcG90T2JqKS5sZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIG1ldHJvLmF2Z0RpZnRvU3BvdCA9IGF2ZztcclxuICAgICAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaCh7aGlkOmhpZCxzY29yZTpzY29yZX0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5tZXRyby5zY29yZS5wZXJjZW50aWxlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IHNjb3JlQXJyYXlbaV0uaGlkO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcmFuayA9ICgoaSsxKSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEIC0gMH4xICjrhpLsnYTsiJjroZ0gMOyXkCDqsIDquYzsm4ApXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoMTAtaikgLSBNYXRoLmNlaWwoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC5zY29yZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS50cmFuc3BvcnQgPSBzY29yZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUgPSB7dHJhbnNwb3J0OnNjb3JlfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOnt0cmFuc3BvcnQ6c2NvcmV9LFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmQ6e3RyYW5zcG9ydDpcIlwifVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2Vjb25kX2J5QXJlYXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/ri6TrpbggbG9jYWzrk6Tqs7zripQg64us66asIOyngO2VmOyyoCDsl63snYQgQXJlYeuzhOuhnCDrgpjriJQgLSDsp4Dsl63rs4TroZwg7Ja065akIOuFuOyEoOuTpOydtCDsp4DrgpjqsIDripTsp4Ag7LK07YGsO1xyXG4gICAgICAgIGxldCBhcmVhQXJyID0gdGhpcy5kYXRhLmFyZWE7XHJcbiAgICAgICAgbGV0IG1ldHJvQXJyID0gdGhpcy5kYXRhLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJlYUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYXJlYSA9IGFyZWFBcnJbaV07XHJcbiAgICAgICAgICAgIGlmKCFhcmVhLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZXRyb0Fyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXRybyA9IG1ldHJvQXJyW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlzSW5BcmVhKG1ldHJvLmNvb3IsIGFyZWEuY29vcikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1ldHJvLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0gbWV0cm8ubGluZVtrXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVhLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVhLmxvY2FsLm1ldHJvKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhLmxvY2FsLm1ldHJvW2xpbmVdICsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwubWV0cm9bbGluZV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwubWV0cm8gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbCA9IHttZXRybzp7fX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpcnN0X3NldE1ldHJvOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwubG9jYWwubWV0cm8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDp7ZGlmOkNvbmZpZy5tZXRyby5uZWFyU3RkfSxcclxuICAgICAgICAgICAgICAgICAgICBuZWFyOltdLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ5TGluZTp7fVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIG1ldHJvQXJyID0gdGhpcy5kYXRhLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgICAgICB2YXIgYnlMaW5lID0gaG90ZWwubG9jYWwubWV0cm8uYnlMaW5lO1xyXG4gICAgICAgICAgICBsZXQgaGFzTWV0cm8gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0cm9BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXRybyA9IG1ldHJvQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihob3RlbC5jb29yLCBtZXRyby5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkaWY8Q29uZmlnLm1ldHJvLm5lYXJTdGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc01ldHJvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0cm9fYyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcjptZXRyby5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lOm1ldHJvLmxpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6bWV0cm8ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmOmRpZi50b0ZpeGVkKDApKjFcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLm1ldHJvLm5lYXIucHVzaChtZXRyb19jKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlmPGhvdGVsLmxvY2FsLm1ldHJvLm5lYXJlc3QuZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwubWV0cm8ubmVhcmVzdCA9IG1ldHJvX2M7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1ldHJvLmxpbmUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBtZXRyby5saW5lW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYnlMaW5lW2xpbmVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGJ5TGluZVtsaW5lXS5kaWYgPiBtZXRyb19jLmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnlMaW5lW2xpbmVdID0gbWV0cm9fYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBieUxpbmVbbGluZV0gPSBtZXRyb19jO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihoYXNNZXRybyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5uZWFyZXN0LnB1c2goaG90ZWwubG9jYWwubWV0cm8ubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLm1ldHJvID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldE1ldHJvO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRNZXRyby5qcyIsImltcG9ydCBDb25maWdfU2FmZXR5IGZyb20gXCIuLi9jb25maWcvc2FmZXR5LmpzXCI7XHJcblxyXG52YXIgU2V0U2FmZXR5ID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2l0eU5hbWUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuZmlyc3RfZnJvbUFyZWEoZGF0YSwgY2l0eU5hbWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmaXJzdF9mcm9tQXJlYTogZnVuY3Rpb24oZGF0YSwgY2l0eU5hbWUpe1xyXG4gICAgICAgIGxldCBzY29yZUFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGxldCBhcmVhcyA9IGRhdGEuYXJlYTtcclxuICAgICAgICBsZXQgaG90ZWxzID0gZGF0YS5ob3RlbHM7XHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIGhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSBob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLnNhZmV0eSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgd29yZCA9IGhvdGVsLmFzc2Vzc21lbnQud29yZC5zYWZldHk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG5cclxuICAgICAgICAgICAgLy9BUkVB66GcIOyduO2VnCDsuZjslYhcclxuICAgICAgICAgICAgbGV0IGFyZWEgPSBhcmVhc1tob3RlbC5hcmVhXTtcclxuICAgICAgICAgICAgc2NvcmUgKz0gYXJlYS5zYWZldHkuc2NvcmUqMztcclxuICAgICAgICAgICAgbGV0IGNvbmZpZ193b3JkID0gQ29uZmlnX1NhZmV0eS53b3JkW2FyZWEuc2FmZXR5LnNjb3JlXTtcclxuICAgICAgICAgICAgaWYoYXJlYS5zYWZldHkuc2NvcmU+MyYmYXJlYS5zYWZldHkubWlzZGVtZWFub3I8Myl7XHJcbiAgICAgICAgICAgICAgICBjb25maWdfd29yZCA9IENvbmZpZ19TYWZldHkud29yZFs2XTsgICAgLy/suZjslYjsnYAg7KKL7KeA66eMIOqyveuylOyjhOycqOydtCDsooAg64aS7J2MXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd29yZC5wdXNoKGAke2NpdHlOYW1lfSR7Y29uZmlnX3dvcmR9ICR7YXJlYS5uYW1lfSDsp4Dsl63sl5Ag7JyE7LmY7ZWY6rOgIOyeiOydjGApO1xyXG5cclxuICAgICAgICAgICAgLy9NRVRST+uhnCDsnbjtlZwg7LmY7JWIXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLm1ldHJvKXtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRybyA9IGhvdGVsLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IG1ldHJvLm5lYXJlc3QuZGlmO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pbiA9IGRpZlRvTWluKGRpZik7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZGlmID0gQ29uZmlnX1NhZmV0eS5tZXREaWY7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9EaWYgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZGlmLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1ldERpZiA9IGNvbmRpZltpXS5zdGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1ldFdvcmQgPSBjb25kaWZbaV0ud29yZDtcclxuICAgICAgICAgICAgICAgICAgICBpZihub0RpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjwobWV0RGlmKjEpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vRGlmID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZSArPSBjb25kaWZbaV0uc2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JkLnB1c2goYOqwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKgIOyXreydgCDrj4Trs7QgJHttaW59IOqxsOumrCR7bWV0V29yZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/snKDrj5nsnbjqtazroZwg7J247ZWcIOy5mOyViFxyXG4gICAgICAgICAgICBsZXQgZmxvYXRTY29yZSA9IGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUudHJhbnNwb3J0ICsgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5mb29kICsgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5hdG07XHJcbiAgICAgICAgICAgIGxldCBtaW5TcG90RGlmID0gMTUwO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnNwb3RzLnJhbmtlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBkYXRhLnNwb3RzLnJhbmtlZFtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSBjYWxjdWxhdGVEaWYoc3BvdC5jb29yLCBob3RlbC5jb29yKTtcclxuICAgICAgICAgICAgICAgIGlmKGRpZjxtaW5TcG90RGlmKXtcclxuICAgICAgICAgICAgICAgICAgICBtaW5TcG90RGlmID0gZGlmO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG1pblNwb3REaWY8NTApe1xyXG4gICAgICAgICAgICAgICAgZmxvYXRTY29yZSArPSAzO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihtaW5TcG90RGlmPDEwMCl7XHJcbiAgICAgICAgICAgICAgICBmbG9hdFNjb3JlICs9IDI7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKG1pblNwb3REaWY8MTUwKXtcclxuICAgICAgICAgICAgICAgIGZsb2F0U2NvcmUgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGZsb2F0ID0gQ29uZmlnX1NhZmV0eS5mbG9hdGluZztcclxuICAgICAgICAgICAgbGV0IG5vdFlldCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZsb2F0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RkID0gZmxvYXRbaV0uc3RkO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZsb2F0V29yZCA9IGZsb2F0W2ldLndvcmQ7XHJcbiAgICAgICAgICAgICAgICBpZihub3RZZXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZsb2F0U2NvcmU+c3RkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm90WWV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGZsb2F0W2ldLnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkLnB1c2goYCR7Y2l0eU5hbWV9JHtmbG9hdFdvcmR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZmluYWwgPSBDb25maWdfU2FmZXR5LmZpbmFsU2FmZXR5O1xyXG4gICAgICAgICAgICBub3RZZXQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaW5hbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0ZCA9IGZpbmFsW2ldLnN0ZDtcclxuICAgICAgICAgICAgICAgIGxldCBmaW5hbFdvcmQgPSBmaW5hbFtpXS53b3JkO1xyXG4gICAgICAgICAgICAgICAgaWYobm90WWV0KXtcclxuICAgICAgICAgICAgICAgICAgICBpZihzY29yZT5zdGQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3RZZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29yZC5wdXNoKGAke2ZpbmFsV29yZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2NvcmVBcnJheS5wdXNoKHtoaWQ6aGlkLHNjb3JlOnNjb3JlfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzY29yZUFycmF5LnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcclxuXHJcbiAgICAgICAgdmFyIHRvdGFsID0gc2NvcmVBcnJheS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciByYW5rU3lzID0gQ29uZmlnX1NhZmV0eS5zY29yZS5wZXJjZW50aWxlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IHNjb3JlQXJyYXlbaV0uaGlkO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcmFuayA9ICgoaSsxKSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEIC0gMH4xICjrhpLsnYTsiJjroZ0gMOyXkCDqsIDquYzsm4ApXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoMTAtaikgLSBNYXRoLmNlaWwoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuc2FmZXR5ID0gc2NvcmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0U2FmZXR5O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRTYWZldHkuanMiLCJ2YXIgQ29uZmlnX1NhZmV0eSA9IHtcclxuICAgIHNjb3JlOntcclxuICAgICAgICBwZXJjZW50aWxlIDogWzAuMTUsIDAuMiwgMC4yNSwgMC4yLCAwLjEsIDAuMV0sIC8vOSwgOCwgNy4uLuygkOuMgOydmCDrsLHrtoTsnIQg67mE7JyoIC0g7ZWp6rOEIDEg65CY7Ja07JW8IO2VqCEhIVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgd29yZDpbLy9hcmVh6rSA66CoIHdvcmRcclxuICAgICAgICBcIlwiLC8vc2NvcmUgMOygkOydgCDsl4bsnLzrr4DroZwg67mE7JuM65GgXHJcbiAgICAgICAgXCLsl5DshJwg7LmY7JWI7J20IOuCmOyBnCDtjrjsl5Ag7IaN7ZWY64qUXCIsICAvLzHsoJBcclxuICAgICAgICBcIuyXkOyEnCDsuZjslYjsnbQg7KKL7KeA64qUIOyViuydgCDtjrjsnbhcIiwgIC8vMuygkFxyXG4gICAgICAgIFwiIO2Pieq3oOyggeyduCDsuZjslYgg7IiY7KSA7J2EIOuztOydtOuKlFwiLCAgLy8z7KCQXHJcbiAgICAgICAgXCLsl5DshJwg7LmY7JWI7J20IOyii+ydgCDtjrjsnbhcIiwgICAgICAgIC8vNOygkFxyXG4gICAgICAgIFwi7JeQ7IScIOy5mOyViOydtCDrp6TsmrAg7KKL7J2AIO2OuOyduFwiLCAgICAvLzXsoJBcclxuICAgICAgICBcIuyXkOyEnCDsuZjslYjsnYAg7KKL7J2AIO2OuOyXkCDsho3tlZjsp4Drp4wg6rK967KU7KOE7Jyo7J20IOyhsOq4iCDrhpLsnYAg7Y647J24XCIgIC8v7Yq57IiYXHJcbiAgICBdLFxyXG5cclxuICAgIG1ldERpZjpbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTUwLCAgICAgICAgICAgICAgICAgICAgICAgLy/qsbDrpqzqsIAgMTUwIOuvuOunjOydvCDqsr3smrBcclxuICAgICAgICAgICAgd29yZDpcIuyXkCDsnITsuZjtlbQg6rWJ7J6l7Z6IIOqwgOq5jOybgFwiLCAvL+yalOugh+qyjCDshKTrqoXtlZjqs6BcclxuICAgICAgICAgICAgc2NvcmU6NiAgICAgICAgICAgICAgICAgICAgICAgLy837KCQ7J2EIOu2gOyXrO2VqFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MjIwLCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdvcmQ6XCLroZwg66ek7JqwIOqwgOq5jOyatCDtjrhcIixcclxuICAgICAgICAgICAgc2NvcmU6NSAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDozMDAsICAgICAgICAgXHJcbiAgICAgICAgICAgIHdvcmQ6XCLsl5Ag7J6I7J2MXCIsIFxyXG4gICAgICAgICAgICBzY29yZTo0ICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDo0MDAsICAgICAgICAgIFxyXG4gICAgICAgICAgICB3b3JkOlwi7JeQIOyeiOydjFwiLCBcclxuICAgICAgICAgICAgc2NvcmU6MyAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6NTAwLCAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgd29yZDpcIuuhnCDslb3qsIQg65ao7Ja07KC4IOyeiOuKlCDtjrhcIixcclxuICAgICAgICAgICAgc2NvcmU6MiAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTUwMCwgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdvcmQ6XCLroZwg7IOB64u57Z6IIOuWqOyWtOyguCDsnojripQg7Y64XCIsIFxyXG4gICAgICAgICAgICBzY29yZToxICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuXHJcbiAgICBmbG9hdGluZzpbIC8vYXRtLCBmb29kLCB0cmFuc3BvcnQg7ZWp6rOEICsg7KO867OAIOq0gOq0keyngCDrs7TrhIjsiqQoNTBt7J2064K0IC0gM+ygkOunjOygkCwgMTUwbSAx7KCQKTtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoyNyxcclxuICAgICAgICAgICAgd29yZDpcIuuCtCDri6Trpbgg7KeA7JetIOuMgOu5hCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOyDgeuLue2eiCDrp47snYAg7Y64XCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjYuNVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MjUuNSxcclxuICAgICAgICAgICAgd29yZDpcIuuCtCDri6Trpbgg7KeA7JetIOuMgOu5hCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOq9pCDrp47snYAg7Y64XCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjI0LFxyXG4gICAgICAgICAgICB3b3JkOlwi64K0IOuLpOuluCDsp4Dsl60g64yA67mEIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg7KGw6riIIOunjuydgCDtjrhcIixcclxuICAgICAgICAgICAgc2NvcmU6NFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MjEsXHJcbiAgICAgICAgICAgIHdvcmQ6XCLrgrQg7Y+J6regIOyImOykgOydmCDsnKDrj5nsnbjqtawg7IiY7KSA7J2EIOuztOyehFwiLFxyXG4gICAgICAgICAgICBzY29yZTozXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoxOCxcclxuICAgICAgICAgICAgd29yZDpcIuuCtCDri6Trpbgg7KeA7JetIOuMgOu5hCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOyVveqwhCDsoIHsnYAg7Y64XCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjIuNVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTUsXHJcbiAgICAgICAgICAgIHdvcmQ6XCLrgrQg64uk66W4IOyngOyXrSDrjIDruYQg7KO867OAIOycoOuPmeyduOq1rOqwgCDsoIHsnYAg7Y64XCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjIuMjVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjUsXHJcbiAgICAgICAgICAgIHdvcmQ6XCLrgrQg64uk66W4IOyngOyXrSDrjIDruYQg7KO867OAIOycoOuPmeyduOq1rOqwgCDsg4Hri7ntnogg7KCB7J2AIO2OuFwiLFxyXG4gICAgICAgICAgICBzY29yZToyXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuXHJcbiAgICBmaW5hbFNhZmV0eTpbIC8vc2NvcmUqMyArIG1ldERpZiArIGZsb2F0aW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MjAsIC8v7JiILCDsp4Dsl60gNOygkCwg64KY66i47KeAIO2Pieq3oCwg7KeA7JetIDXsoJAsIOuCmOuouOyngCDstZzslYXsnYAg7JWE64uMIOyImOykgFxyXG4gICAgICAgICAgICB3b3JkOlwi7KGw7Ius7ZWc64uk66m0IOuwpCDriqbqsowg6reA6rCA7ZWgIOuVjOyXkOuPhCDslYjsoITtlZwg7JyE7LmYXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjE4LCAvL+yYiCwg7KeA7JetIDPsoJAsIOuCmOuouOyngCDrqqjrkZAg7KSR7IOB7JyE6raMLCDsp4Dsl60gNOygkCwg64KY66i47KeAIOuCruyngCDslYrsnYxcclxuICAgICAgICAgICAgd29yZDpcIuyhsOyLrO2VnOuLpOuptCDriqbsnYAg7Iuc6rCEIOq3gOqwgO2VoCDrlYzsl5Drj4Qg7YGwIOusuOygnOuKlCDsl4bsnYxcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjE2LCAvL+yYiCwg7KeA7JetIDTsoJAsIOuCmOuouOyngCDstZzslYXsnYAg7JWE64uYLCDsp4Dsl60gM+ygkCwg64KY66i47KeAIOykkeqwhCDsnbTsg4EsIOyngOyXrSAy7KCQIOuCmOuouOyngCDstZzsg4FcclxuICAgICAgICAgICAgd29yZDpcIuuKpuydgCDrsKTsnYQg7ZS87ZWc64uk66m0IOydvOuwmOyggeycvOuhnCDsoIDrhYHsl5Ag6reA6rCA7ZWgIOuVjCDtgbAg66y47KCc64qUIOyXhuydjFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoxMy41LCAvL+yngOyXrSAz7KCQLCDrgpjrqLjsp4Ag7LWc7JWFLCDsp4Dsl60gMuygkFxyXG4gICAgICAgICAgICB3b3JkOlwi7KGw7Ius7Z6IIOuLpOuLkCDtlYTsmpTqsIAg7J6I7Jy866mwLCDriqbsnYAg67Ck7JeQIOq3gOqwgO2VmOuKlCDqsoPsnYAg7IK86rCA64qUIOqyg+ydtCDsoovsnYxcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTEsIC8v7KeA7JetIDLsoJAg64KY66i47KeAIOuCruydgCDtjrgsIOyngOyXrSAx7KCQIOuCmOuouOyngCDspJHqsIQg7J207IOBXHJcbiAgICAgICAgICAgIHdvcmQ6XCLtlbQg7KeEIOydtO2bhOyXkOuKlCDrj4zslYTri6Tri4jripQg6rKD7J2EIOyCvOqwgOuKlCDqsoPsnbQg7KKL7J2MXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjksICAvL+yngOyXrSAx7KCQIFxyXG4gICAgICAgICAgICB3b3JkOlwi64Ku7JeQ64+EIOyViOyghOyXkCDsnKDsnZjtlZjrqbAg64uk64uI64qUIOqyg+ydtCDsoovsnYxcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6NCxcclxuICAgICAgICAgICAgd29yZDpcIuy5mOyViCDrrLjsoJzqsIAg7KSR7JqU7ZWY64uk66m0IOyImeyGjCDsnITsuZjroZwg7KCB7ZWp7ZWcIOyngOyXreydtCDslYTri5hcIlxyXG4gICAgICAgIH1cclxuICAgIF1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZ19TYWZldHk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY29uZmlnL3NhZmV0eS5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldExhdW5kcnkgPSB7XHJcbiAgICBzdGF0aXN0aWM6e25lYXJlc3Q6W119LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEsIGNpdHlOYW1lKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2l0eU5hbWUgPSBjaXR5TmFtZTtcclxuICAgICAgICB0aGlzLmZpcnN0X3NldExhdW5kcnkoKTtcclxuICAgICAgICB0aGlzLnNlY29uZF9tYWtlU2NvcmUoKTtcclxuICAgICAgICB0aGlzLnRoaXJkX3dvcmRpbmcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdGhpcmRfd29yZGluZzogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciBsYXVuZHJ5ID0gaG90ZWwubG9jYWwubGF1bmRyeTtcclxuXHJcbiAgICAgICAgICAgIGlmKGxhdW5kcnkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IGRpZlRvTWluKGxhdW5kcnkubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLmxhdW5kcnkgPSBg7IiZ7IaM7JeQ7IScIOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyEuO2DgeyGjOqwgCDsnojsnYxgO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5sYXVuZHJ5ID0gJ+yImeyGjCDrj4Trs7QgMTDrtoTqsbDrpqwg7J2064K07JeQIOyEuO2DgeyGjOuKlCDsobTsnqztlZjsp4Ag7JWK7JWEIOq4tCDsl6ztlonsi5wg67aI7Y647ZWgIOyImCDsnojsnYwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZWNvbmRfbWFrZVNjb3JlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBzY29yZUFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgbGV0IGxhdW5kcnkgPSBob3RlbC5sb2NhbC5sYXVuZHJ5O1xyXG5cclxuICAgICAgICAgICAgaWYobGF1bmRyeSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSAoNTAwIC0gbGF1bmRyeS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICBzY29yZUFycmF5LnB1c2goe2hpZDpoaWQsc2NvcmU6c2NvcmV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5sYXVuZHJ5LnNjb3JlLnBlcmNlbnRpbGU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcmVBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaGlkID0gc2NvcmVBcnJheVtpXS5oaWQ7XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCByYW5rID0gKChpKzEpIC8gdG90YWwpOyAvLyDrsLHrtoTsnIQgLSAwfjEgKOuGkuydhOyImOuhnSAw7JeQIOqwgOq5jOybgClcclxuICAgICAgICAgICAgdmFyIHBlcmNlbnRpbGUgPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlzUmFua2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJhbmtTeXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKCFpc1JhbmtlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbnVzID0gcGVyY2VudGlsZTtcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50aWxlICs9IHJhbmtTeXNbal07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhbms8cGVyY2VudGlsZSl7ICAvLzM1JSDslYjsl5Ag65Ok66m0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmsgLT0gbWludXM7ICAgLy9yYW5r66W8IDB+MC4y66GcIOunnuy2sOykjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSA9ICgxMC1qKSAtIE1hdGguY2VpbCgocmFuay9yYW5rU3lzW2pdKSoxMCkvMTA7IC8vcmFuaygwfjAuMinrpbwgMC4y66GcIOuCmOuIiOqwkioxMC8xMCAtPiAwfjAuOeqwgCDrgpjsmLRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSYW5rZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudCl7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50LnNjb3JlKXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlLmxhdW5kcnkgPSBzY29yZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUgPSB7bGF1bmRyeTpzY29yZX07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZTp7bGF1bmRyeTpzY29yZX0sXHJcbiAgICAgICAgICAgICAgICAgICAgd29yZDp7bGF1bmRyeTpcIlwifVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICBsZXQgbGF1bmRyeSA9IGhvdGVsLmxvY2FsLmxhdW5kcnk7XHJcblxyXG4gICAgICAgICAgICBpZighbGF1bmRyeSl7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50LnNjb3JlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5sYXVuZHJ5ID0gNTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZSA9IHtsYXVuZHJ5OjV9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOntsYXVuZHJ5OjV9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkOntsYXVuZHJ5OlwiXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlyc3Rfc2V0TGF1bmRyeTogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmxhdW5kcnkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDp7ZGlmOkNvbmZpZy5sYXVuZHJ5Lm5lYXJTdGR9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbGRBcnIgPSB0aGlzLmRhdGEubG9jYWwubGF1bmRyeTtcclxuICAgICAgICAgICAgbGV0IGhhc0xEID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxkQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGF1bmRyeSA9IGxkQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IGNhbGN1bGF0ZURpZihob3RlbC5jb29yLCBsYXVuZHJ5LmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRpZjxDb25maWcubGF1bmRyeS5uZWFyU3RkKXtcclxuICAgICAgICAgICAgICAgICAgICBoYXNMRCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhdW5kcnlfYyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcjpsYXVuZHJ5LmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6bGF1bmRyeS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6ZGlmLnRvRml4ZWQoMCkqMVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlmPGhvdGVsLmxvY2FsLmxhdW5kcnkubmVhcmVzdC5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5sYXVuZHJ5Lm5lYXJlc3QgPSBsYXVuZHJ5X2M7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFoYXNMRCl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5sYXVuZHJ5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmVzdC5wdXNoKGhvdGVsLmxvY2FsLmxhdW5kcnkubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0TGF1bmRyeTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0TGF1bmRyeS5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldENvbnZpbmllbmNlID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2l0eU5hbWUpe1xyXG4gICAgICAgIGxldCBzY29yZUFycmF5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIGRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgd29yZCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgdHlwZSBpbiBob3RlbC5hc3Nlc3NtZW50LnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlID09PSBcInNhZmV0eVwiIHx8IHR5cGUgPT09IFwidHJhbnNwb3J0XCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRpV29yZCA9IGhvdGVsLmFzc2Vzc21lbnQud29yZFt0eXBlXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kaVNjb3JlID0gaG90ZWwuYXNzZXNzbWVudC5zY29yZVt0eXBlXTtcclxuICAgICAgICAgICAgICAgICAgICB3b3JkLnB1c2goaW5kaVdvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGluZGlTY29yZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgaG90ZWwuYXNzZXNzbWVudC5zY29yZVt0eXBlXTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgaG90ZWwuYXNzZXNzbWVudC53b3JkW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaCh7aGlkOmhpZCxzY29yZTpzY29yZX0pO1xyXG4gICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQuY29udmluaWVuY2UgPSB3b3JkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG4gICAgICAgIHZhciByYW5rU3lzID0gQ29uZmlnLmF0bS5zY29yZS5wZXJjZW50aWxlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IHNjb3JlQXJyYXlbaV0uaGlkO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICB2YXIgcmFuayA9ICgoaSsxKSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoMTAtaikgLSBNYXRoLmNlaWwoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuY29udmluaWVuY2UgPSBzY29yZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNjb3JlPjkpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLmNvbnZpbmllbmNlLnB1c2goYCR7Y2l0eU5hbWV9IOuCtCDri6Trpbgg7IiZ7IaM65OkIOuMgOu5hCDso7zrs4Ag7Y647J2Y7Iuc7ISk7J20IOq1ieyepe2eiCDsnpgg7ZiV7ISx65CY7Ja0IO2OuOumrO2VmOqyjCDsl6ztlontlaAg7IiYIOyeiOydjGApO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihzY29yZT44KXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5jb252aW5pZW5jZS5wdXNoKGAke2NpdHlOYW1lfSDrgrQg64uk66W4IOyImeyGjOuTpCDrjIDruYQg7KO867OAIO2OuOydmOyLnOyEpOydtCDsnpgg7ZiV7ISx65CcIO2OuOydtOudvCDtjrjrpqztlZjqsowg7Jes7ZaJ7ZWgIOyImCDsnojsnYxgKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Nyl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQuY29udmluaWVuY2UucHVzaChgJHtjaXR5TmFtZX0g64K07JeQ7IScIOyjvOuzgCDtjrjsnZjsi5zshKTsnYAg7Y+J6regIOydtOyDgSDsoJXrj4TroZwg7J6YIOqwluy2lOyWtOyguCDsnojsnYxgKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Nil7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQuY29udmluaWVuY2UucHVzaChgJHtjaXR5TmFtZX0g64K07JeQ7IScIOyjvOuzgCDtjrjsnZjsi5zshKTsnYAg7Y+J6reg7JeQ7IScIOyVveqwhCDrqrsg66+47LmY64qUIOygleuPhOuhnCDtmJXshLHrkJjslrQg7J6I7J2MYCk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHNjb3JlPjUpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLmNvbnZpbmllbmNlLnB1c2goYCR7Y2l0eU5hbWV9IOuCtCDri6Trpbgg7IiZ7IaM65OkIOuMgOu5hCDso7zrs4Ag7Y647J2Y7Iuc7ISk7J2AIOyhsOq4iOyUqSDqsbDrpqzqsIAg7J6I64qUIO2OuGApO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5jb252aW5pZW5jZS5wdXNoKGAke2NpdHlOYW1lfSDrgrQg64uk66W4IOyImeyGjOuTpCDrjIDruYQg7KO867OAIO2OuOydmOyLnOyEpOuTpOydgCDrqYDrpqwg7J6I64qUIO2OuGApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0Q29udmluaWVuY2U7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldENvbnZpbmllbmNlLmpzIiwidmFyIFNldEFyZWEgPSB7XHJcbiAgICBtYXA6e30sXHJcbiAgICBtYXJrZXI6e30sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24gKGNpdHlOYW1lLCBjaWQpIHtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5tYXJrZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyW2hpZF0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyID0ge307XHJcblxyXG4gICAgICAgICAgICB2YXIgdHh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGgyPicgKyBjaXR5TmFtZSArICcg7IiZ7IaMIOyngOyXrSDqtazrtoQ8L2gyPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiY2l0eUFyZWFfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgaWQ9XCJjaXR5QXJlYV9fbWFwXCI+PC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiXCJjaXR5QXJlYT4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eUFyZWFfX3dvcmRcIj48L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjaWQ9XCInICsgY2lkICsgJ1wiIGNsYXNzPVwiY2l0eUFyZWFfX2ZpbmlzaFwiPuyZhOujjOyymOumrDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JzsgLy9jbG9zZSB3cmFwcGVyXHJcblxyXG4gICAgICAgICAgICAkKFwiLnBhZ2VzLmhvdGVsXCIpLmh0bWwodHh0KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5QXJlYV9fbWFwJyksIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogNDAuNzQzMTk1NzkzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzogLTczLjk4OTE3OTU0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgem9vbTogMTNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhcmVhID0ge307XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9BcmVhID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuYXJlYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhLmFyZWFbaV0ubm90QXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmVhQ29vciA9IGRhdGEuYXJlYVtpXS5jb29yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5BcmVhKGhvdGVsLmNvb3IsIGFyZWFDb29yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXJlYSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0FyZWEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub0FyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcltoaWRdID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBob3RlbC5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJycgKyBoaWRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcmVhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvaG90ZWxzJykudXBkYXRlKGRhdGEuaG90ZWxzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldEFyZWE7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==