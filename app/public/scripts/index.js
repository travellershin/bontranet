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

var _view = __webpack_require__(14);

var _view2 = _interopRequireDefault(_view);

var _hotel = __webpack_require__(16);

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
    view: function view() {
        _view2.default.init();
        initialized.view = true;
    },
    account: function account() {},
    spot: function spot() {
        _spot2.default.init(u_i);
        initialized.spot = true;
    },
    calc: function calc() {},
    hotel: function hotel() {
        _hotel2.default.init();
        initialized.hotel = true;
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

var _metro = __webpack_require__(15);

var _metro2 = _interopRequireDefault(_metro);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View = {
  map: {},
  data: {},

  inflateCity: function inflateCity(cid) {
    var _this = this;

    firebase.database().ref("cities/" + cid).once("value", function (snap) {
      var data = snap.val();
      _metro2.default.init(data);
      _this.data = data;
      toast("도시정보 로딩 완료");
    });
  },

  listener: function listener() {
    $(".view").on("click", ".metro_full", function () {
      _metro2.default.full();
    });
    $(".view").on("click", ".metro_disable", function () {
      _metro2.default.disable();
    });
    $(".view").on("click", ".metro_click", function () {
      _metro2.default.clickMode();
    });
  },

  init: function init() {
    this.inflateCity("nyc");
    var txt = "";
    txt += "<div class='wrapper'>";
    txt += "<div class='left' id='map'>";
    txt += "</div>";
    txt += "<div class='right'>";
    txt += "<div class='header'><ul>";
    txt += "</ul></div>";
    txt += "<div class='viewer'></div>";
    txt += "</div>";
    txt += "</div>";
    $(".pages.view").html(txt);

    var header = {
      "메트로": [{ ko: "지우기", en: "metro_disable" }, { ko: "전체 노선", en: "metro_full" }, { ko: "핵심 노선", en: "metro_core" }, { ko: "클릭 추적", en: "metro_click" }],
      "관광지": [],
      "분석": []
    };

    var hTxt = '';
    for (var item in header) {
      hTxt += '<li class="dropdown">';
      hTxt += '<p class="dropbtn">' + item + '</p>';
      hTxt += '<div class="dropdown__content">';

      for (var i = 0; i < header[item].length; i++) {
        hTxt += '<p class="' + header[item][i].en + '">' + header[item][i].ko + '</p>';
      }
      hTxt += '</div>';
      hTxt += '</li>';
    }
    $(".view .header").html(hTxt);

    this.listener();

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.7516, lng: -73.9887 },
      zoom: 13,
      disableDefaultUI: true,
      styles: [{
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "poi.business",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit",
        "stylers": [{
          "visibility": "off"
        }]
      }]
    });

    _metro2.default.map = this.map;
  }
};

exports.default = View;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var View_Metro = {
    map: {},
    polyLine: {},
    data: {},
    markerSet: [],

    init: function init(data) {
        this.data = data;
        console.log(data);
        var metroLine = data.metroLine;
        for (var line in metroLine) {
            if (metroLine[line].stn) {
                var polyLine = [];
                for (var i = 0; i < metroLine[line].stn.length; i++) {
                    if (metroLine[line].stn[i].coor) {
                        polyLine.push(metroLine[line].stn[i].coor);
                    }
                }
                this.polyLine[line] = new google.maps.Polyline({
                    path: polyLine,
                    strokeColor: metroLine[line].color,
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
            }
        }
    },

    full: function full() {
        if (this.marker) {
            //기존 마커 초기화
            this.marker.setMap(null);
        }
        google.maps.event.clearListeners(this.map, 'click');

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(this.map);
        }
    },

    disable: function disable() {
        if (this.marker) {
            //기존 마커 초기화
            this.marker.setMap(null);
        }
        google.maps.event.clearListeners(this.map, 'click');

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(null);
        }
    },

    clickMode: function clickMode() {
        var that = this;

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(null);
        }
        this.map.addListener('click', function (e) {
            that.findMetro(e);
        });
    },

    findMetro: function findMetro(e) {
        var lineObj = {}; //key:라인명, value:{stn:station, dif:dif}

        var clickCoor = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        var metros = this.data.local.metro;

        if (this.marker) {
            //기존 마커 초기화
            this.marker.setMap(null);
        }
        for (var line in this.polyLine) {
            //기존 그려져있던 폴리라인 초기화
            this.polyLine[line].setMap(null);
        }
        for (var i = 0; i < this.markerSet.length; i++) {
            this.markerSet[i].setMap(null);
        }
        this.markerSet = [];

        this.marker = new google.maps.Marker({
            position: e.latLng,
            map: this.map
        });

        for (var _i = 0; _i < metros.length; _i++) {
            var metro = metros[_i];
            var dif = calculateDif(clickCoor, metro.coor);

            if (dif < 500) {
                for (var j = 0; j < metro.line.length; j++) {
                    var _line = metro.line[j];

                    if (lineObj[_line]) {
                        //이미 있으면 짧은 거리로 업데이트
                        if (dif < lineObj[_line].dif) {
                            lineObj[_line] = {
                                stn: metro,
                                dif: dif
                            };
                        }
                    } else {
                        //없으면 새로 추가
                        lineObj[_line] = {
                            stn: metro,
                            dif: dif
                        };
                    }
                }
            }
        }

        var txt = '';
        txt += '<div class="metro__info">';

        for (var _line2 in lineObj) {
            this.polyLine[_line2].setMap(this.map);

            var stn = lineObj[_line2].stn;
            var marker = new google.maps.Marker({
                position: stn.coor,
                map: this.map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeColor: this.data.metroLine[_line2].color,
                    scale: 7,
                    strokeWeight: 5
                }
            });
            txt += '<div class="metro__info__line">';
            txt += '<p class="metro__info__lineName" style="background:' + this.data.metroLine[_line2].color + '">' + _line2 + '</p>';
            txt += '<p class="metro__info__dif">' + Math.round(lineObj[_line2].dif) + 'm</p>';
            txt += '<p class="metro__info__stnName">' + stn.name + '역</p>';
            txt += '</div>';

            this.markerSet.push(marker);
        }

        txt += '</div>';

        $(".view .viewer").html(txt);
    }
};

exports.default = View_Metro;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setHotelInfo = __webpack_require__(17);

var _setHotelInfo2 = _interopRequireDefault(_setHotelInfo);

var _setArea = __webpack_require__(25);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setATM = __webpack_require__(18);

var _setATM2 = _interopRequireDefault(_setATM);

var _setFood = __webpack_require__(19);

var _setFood2 = _interopRequireDefault(_setFood);

var _setMetro = __webpack_require__(20);

var _setMetro2 = _interopRequireDefault(_setMetro);

var _setSafety = __webpack_require__(21);

var _setSafety2 = _interopRequireDefault(_setSafety);

var _setLaundry = __webpack_require__(23);

var _setLaundry2 = _interopRequireDefault(_setLaundry);

var _setConvinience = __webpack_require__(24);

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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _safety = __webpack_require__(22);

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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDcyNjU3YTFlMmU3NGQ2OTY1MjIiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY29uZmlnLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvZ2VvQ29kZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9hdHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvY2l0eS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9jaXR5L21ldHJvTGluZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvZmlyc3RfY2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9hdXRvQ29tYmluZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L3Nlb25kX2NvbWJpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC90aGlyZF9maW5hbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9hY2NvdW50LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3N1YndheS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy92aWV3LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3ZpZXcvbWV0cm8uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBVE0uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEZvb2QuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldE1ldHJvLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRTYWZldHkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY29uZmlnL3NhZmV0eS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0TGF1bmRyeS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0Q29udmluaWVuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEFyZWEuanMiXSwibmFtZXMiOlsiQ29uZmlnIiwibWV0cm8iLCJuZWFyU3RkIiwic2NvcmUiLCJwZXJjZW50aWxlIiwibGF1bmRyeSIsImZvb2QiLCJraW5kIiwiYmFrZXJ5IiwibmFtZSIsInR5cGUiLCJqb3NhIiwic3RkIiwiZ3JvY2VyeSIsInNldmVuIiwiZmFtaWx5IiwibGF3c29uIiwibGFyZ2UiLCJtdWx0aXBsZSIsImN2cyIsIndlaWdodCIsIm5lYXJlc3QiLCJpbjI1MCIsIndvcmQiLCJpbnRlZ3JhdGUiLCJiYW5rMjQiLCJhdG0iLCJpbjEzMCIsIkdlb0NvZGUiLCJpbml0IiwiYXJyIiwicmVmIiwiZmlyZWJhc2UiLCJkYXRhYmFzZSIsIm9uY2UiLCJkYXRhIiwic25hcCIsInZhbCIsImxlbmd0aCIsInNldCIsImNvZGUiLCJ0b2FzdCIsInRoYXQiLCJnZW9jb2RlciIsImdvb2dsZSIsIm1hcHMiLCJHZW9jb2RlciIsImFkZHJlc3MiLCJhaWQiLCJnZW9jb2RlIiwicmVzdWx0cyIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJjb29yIiwibGF0IiwiZ2VvbWV0cnkiLCJsb2NhdGlvbiIsImxuZyIsInNoaWZ0Iiwic2V0VGltZW91dCIsInJlbG9hZCIsImluaXRpYWxpemVkIiwidV9pIiwiTmF2X2Z1bmN0aW9uIiwiYXR0ZW5kIiwidG9kbyIsImNpdHkiLCJ2aWV3IiwiYWNjb3VudCIsInNwb3QiLCJjYWxjIiwiaG90ZWwiLCJsaW5rIiwibG9naW4iLCIkIiwiaHRtbCIsImF0dHIiLCJjbGljayIsImNvbmZpcm0iLCJhdXRoIiwic2lnbk91dCIsInRoZW4iLCJ3aW5kb3ciLCJjYXRjaCIsImVycm9yIiwiZG9jdW1lbnQiLCJyZWFkeSIsInByb3ZpZGVyIiwiR29vZ2xlQXV0aFByb3ZpZGVyIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwidXNlciIsIm1haWwiLCJlbWFpbCIsInNwbGl0IiwiZ3JhZGUiLCJzaWduSW5XaXRoUG9wdXAiLCJyZXN1bHQiLCJ1c2VyTWFpbCIsImRpc3BsYXlOYW1lIiwic2V0dGluZyIsIm9yZGVyIiwiZXJyb3JDb2RlIiwiZXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNyZWRlbnRpYWwiLCJoYXNDbGFzcyIsIml0ZW0iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicGFyZW50IiwiQXR0ZW5kIiwibW9iaWxlIiwiaWQiLCJ2aWV3SUQiLCJhdHRlbmRPYmoiLCJzYWxhcnkiLCJ3ZWVrZGF5cyIsInR4dCIsInVzZXJzIiwibWFpbElEIiwicHJvcCIsIm9uIiwiaW5mbGF0ZV9jYWxlbmRhciIsImZ1bGxDYWxlbmRhciIsImhlaWdodCIsImZpcnN0RGF5Iiwidmlld1JlbmRlciIsImVsZW1lbnQiLCJkYXlDbGljayIsImRhdGUiLCJpbnB1dFdvcmtIb3VyIiwibGlzdGVuZXIiLCJzZXRXb3JrSG91ciIsImtleXVwIiwiZSIsIndoaWNoIiwiY2hhbmdlIiwidmlld193b3JrZXIiLCJvZmYiLCJ5byIsImRhdGVJRCIsInNsaWNlIiwiZGlmIiwiZnJvbSIsInRvIiwiaSIsIk1hdGgiLCJmbG9vciIsImR1ck1vbiIsInRoaXNNb250aCIsImRhdGVEb20iLCJlcSIsImoiLCJ3ZWVrRG9tIiwid2Vla0R1ciIsImRheURvbSIsImZpbmQiLCJrIiwiY2hpbGRyZW4iLCJhcHBlbmQiLCJmdWxsTW9udGhCb251cyIsImluc3VyYW5jZUZlZSIsImJhc2ljIiwicm91bmQiLCJmdWxsV2Vla0J1bnVzIiwiY29tbWEiLCJkYXRlT2JqIiwiZGF0ZVNob3J0IiwibW9tZW50IiwiZm9ybWF0IiwiQW55UGlja2VyIiwiZGF0ZVRpbWVGb3JtYXQiLCJmb2N1cyIsIndvcmsiLCJhbGxFbXB0eSIsInJlbW92ZSIsImFsZXJ0IiwiZnJvbUEiLCJ0b0EiLCJwdXNoIiwiQ2l0eSIsInJlZnJlc2hTdGF0dXMiLCJjaWQiLCJ0cmFuc3BvcnQiLCJpbmZsYXRlIiwiYXJlYSIsInByaWNlIiwiaG90ZWxzIiwiT2JqZWN0Iiwia2V5cyIsImFzc2Vzc21lbnQiLCJ1cGRhdGUiLCJtZXRyb0xpbmUiLCJNZXRyb0xpbmUiLCJjcmVhdGUiLCJsaW5lIiwibWFrZUxpbmUiLCJzdG5BcnIiLCJzdG4iLCJvcmRlckFyciIsInN0YXJ0IiwiZW5kIiwiaWR4Iiwic3BsaWNlIiwibWF4IiwibmV4dCIsInNwbGljZUlkeCIsInRhcmdldCIsImNhbGN1bGF0ZURpZiIsIm55YyIsIkEiLCJCIiwiQyIsIkQiLCJFIiwiRiIsIkciLCJKIiwiTCIsIk0iLCJOIiwiUSIsIlIiLCJXIiwiWiIsInNwb3RzIiwicmFua2VkIiwibWV0cm9zIiwibG9jYWwiLCJ0ZW1wTGluZSIsImhhc1Nwb3QiLCJ0ZW1wRGlmIiwiZW50ZXJhbmNlIiwiZW50IiwicmFuayIsIlNwb3QiLCJjaXRpZXMiLCJjdXJyZW50IiwiaW5mbGF0ZV9zdGF0dXMiLCJpbmZsYXRlX2NpdHkiLCJ1aWQiLCJyZW1vdmVfc3BvdCIsInJlZG9fcmVtb3ZlIiwib3JkZXJBcnJheSIsImNoYW5nZWQiLCJzb3J0IiwiYSIsImIiLCJzdGF0dXNBcnJheSIsImNpdHlOYW1lIiwiRmlyc3RfQ2hlY2siLCJzZXRSZW1haW5OdW1iZXIiLCJzaWQiLCJzaXRlTm9kYXRhIiwiZGVsZXRlU3BvdCIsImlucHV0Q29vcmRpbmF0ZSIsInNpdGUiLCJudW1iZXIiLCJjdXRObyIsInRyaW0iLCJjdXRPYmoiLCJubyIsImRlbGV0ZWQiLCJjb29yVHh0IiwiaXNOYU4iLCJoYXNQcm9ibGVtIiwic2VhcmNoVXJsIiwic2l0ZU9iaiIsImdnIiwibnYiLCJ0YSIsImxwIiwic2l0ZUhhc1Byb2JsZW0iLCJub0Nvb3IiLCJub0Nvb3JUeHQiLCJub1Nwb3QiLCJub1Nwb3RUeHQiLCJub2RhdGEiLCJoYXNDb29yIiwibGFyZ2VPSyIsImxhcmdlRGF0YSIsInNjcm9sbFRvcCIsIkF1dG9Db21iaW5lIiwic2l0ZUFyciIsImNvbWJpbmluZyIsImNvdW50ZXIiLCJub0RhdGEiLCJvbGRTcG90Iiwia28iLCJlbiIsInRlc3QiLCJ1cmwiLCJ0YWciLCJjb21iaW5lT2JqIiwiY29tYmluZWQiLCJjb21iaW5lIiwiaGFzQ29tYmluZWQiLCJ0Q29kZSIsInRTcG90Iiwia2V5IiwiU2Vjb25kX2NvbWJpbmUiLCJUaGlyZF9maW5hbGl6ZSIsInRlbXAiLCJzcG90T2JqIiwic3BvdE5hbWUiLCJyYW5rQXJyIiwic3BvdFRvdGFsIiwiaW5kaXZpZHVhbEFyciIsIm1pblJhbmsiLCJzcXJ0IiwicmFua2luZyIsInB1c2hBcnIiLCJBY2NvdW50IiwiU3Vid2F5IiwibWFwIiwibWFya2VyIiwiTWFwIiwiZ2V0RWxlbWVudEJ5SWQiLCJjZW50ZXIiLCJ6b29tIiwibWFwVHlwZUNvbnRyb2wiLCJzY2FsZUNvbnRyb2wiLCJmdWxsc2NyZWVuQ29udHJvbCIsImFkZExpc3RlbmVyIiwiZmluZFN1YndheSIsImxhdExuZyIsInNldE1hcCIsIk1hcmtlciIsInBvc2l0aW9uIiwibWV0cm9JbmZvIiwibWV0cm9CeVN0biIsIm1ldHJvTmFtZSIsImNvbmNhdCIsIm1ldEFycmF5IiwibWV0U3RuQXJyYXkiLCJjZWlsIiwiVmlldyIsImluZmxhdGVDaXR5IiwiZnVsbCIsImRpc2FibGUiLCJjbGlja01vZGUiLCJoZWFkZXIiLCJoVHh0IiwiZGlzYWJsZURlZmF1bHRVSSIsInN0eWxlcyIsIlZpZXdfTWV0cm8iLCJwb2x5TGluZSIsIm1hcmtlclNldCIsIlBvbHlsaW5lIiwicGF0aCIsInN0cm9rZUNvbG9yIiwiY29sb3IiLCJzdHJva2VPcGFjaXR5Iiwic3Ryb2tlV2VpZ2h0IiwiZXZlbnQiLCJjbGVhckxpc3RlbmVycyIsImZpbmRNZXRybyIsImxpbmVPYmoiLCJjbGlja0Nvb3IiLCJpY29uIiwiU3ltYm9sUGF0aCIsIkNJUkNMRSIsInNjYWxlIiwiSG90ZWwiLCJoaWQiLCJjaGVjayIsImFsZXJ0TW9kYWwiLCJTZXRIb3RlbEluZm8iLCJjaGVja1R4dCIsInZpc2EiLCJjaXRpIiwic2FmZXR5IiwidGhlbWUiLCJjb252ZW5pZW5jZSIsIkFycmF5IiwiaXNBcnJheSIsIlNldEFUTSIsInN0YXRpc3RpYyIsImJ5QXJlYSIsImZpcnN0X2J5SG90ZWxzIiwic2Vjb25kX2J5QXJlYXMiLCJmaWZ0aF9tYWtlU2NvcmUiLCJzaXh0aF93b3JkaW5nIiwiYXRtQXJyIiwiYXRtT2JqIiwib3duZXIiLCJpbmNsdWRlcyIsInBsYWNlTmFtZSIsInN1bSIsIm5vdEFyZWEiLCJhdG1zIiwibWludXMiLCJ0b0ZpeGVkIiwic2NvcmVBcnJheSIsInRvdGFsIiwicmFua1N5cyIsImlzUmFua2VkIiwiZGlmVG9NaW4iLCJTZXRGb29kIiwibmVhcmJ5IiwiZmlyc3RfZ2VvQ29kZSIsInNlY29uZF9zZXRGb29kIiwidGhpcmRfYnlBcmVhcyIsImZvdXJ0aF9tYWtlU3RhdHMiLCJnZGlmIiwibmVhcmVzdERpZiIsInN0YXQiLCJmb29kcyIsImlzU29tZUZvb2QiLCJncm9BcnIiLCJmb29kQXJyIiwiY29weSIsImV4dGVuZCIsIm5lYXI1IiwiZ2VvQXJyIiwiaXNHZW9OZWVkZWQiLCJTZXRNZXRybyIsImZpcnN0X3NldE1ldHJvIiwidGhpcmRfbWFrZVNjb3JlIiwiZm91cnRoX3dvcmRpbmciLCJ0b3RhbExpbmUiLCJ0eHRBcnIiLCJuZWFyZXN0U3RuIiwibGluZU5vIiwiYnlMaW5lIiwic3BvdE5vIiwiYXZnVGltZSIsImF2Z0RpZiIsIm1ldHJvTGluZU9iaiIsImxpbmVOYW1lIiwiZGlmSG90ZWwiLCJkaWZTcG90IiwiYXZnIiwiaG90ZWxTcG90Iiwic3BvdE1ldHJvTmFtZSIsImF2Z0RpZnRvU3BvdCIsImFyZWFBcnIiLCJtZXRyb0FyciIsImlzSW5BcmVhIiwibmVhciIsImhhc01ldHJvIiwibWV0cm9fYyIsIlNldFNhZmV0eSIsImZpcnN0X2Zyb21BcmVhIiwiYXJlYXMiLCJjb25maWdfd29yZCIsIm1pc2RlbWVhbm9yIiwibWluIiwiY29uZGlmIiwibWV0RGlmIiwibm9EaWYiLCJtZXRXb3JkIiwiZmxvYXRTY29yZSIsIm1pblNwb3REaWYiLCJmbG9hdCIsImZsb2F0aW5nIiwibm90WWV0IiwiZmxvYXRXb3JkIiwiZmluYWwiLCJmaW5hbFNhZmV0eSIsImZpbmFsV29yZCIsIkNvbmZpZ19TYWZldHkiLCJTZXRMYXVuZHJ5IiwiZmlyc3Rfc2V0TGF1bmRyeSIsInNlY29uZF9tYWtlU2NvcmUiLCJ0aGlyZF93b3JkaW5nIiwibGRBcnIiLCJoYXNMRCIsImxhdW5kcnlfYyIsIlNldENvbnZpbmllbmNlIiwiaW5kaVdvcmQiLCJpbmRpU2NvcmUiLCJjb252aW5pZW5jZSIsIlNldEFyZWEiLCJub0FyZWEiLCJhcmVhQ29vciIsImxhYmVsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QUFVeEMsQ0FBVixFQUFhNUYsSUFBNUI7O0FBRUEsNEJBQUlpWSxTQUFTL1csTUFBTWxCLElBQWYsRUFBcUJzYSxRQUFyQixDQUFKLEVBQW9DO0FBQ2hDcFosa0NBQU1rSCxJQUFOLEdBQWF4QyxDQUFiO0FBQ0F5VSxxQ0FBUyxLQUFUO0FBQ0EsZ0NBQUdqUyxLQUFLeEMsQ0FBTCxDQUFILEVBQVc7QUFDUHdDLHFDQUFLeEMsQ0FBTDtBQUNILDZCQUZELE1BRUs7QUFDRHdDLHFDQUFLeEMsQ0FBTCxJQUFVLENBQVY7QUFDSDtBQUNKO0FBQ0o7QUFDSjs7QUFFRCxvQkFBSXlVLE1BQUosRUFBWTtBQUNSLDBCQUFLL0osTUFBTCxDQUFZaUQsR0FBWixJQUFtQixJQUFJalUsT0FBT0MsSUFBUCxDQUFZMlIsTUFBaEIsQ0FBdUI7QUFDdENDLGtDQUFValEsTUFBTWxCLElBRHNCO0FBRXRDcVEsNkJBQUssTUFBS0EsR0FGNEI7QUFHdENrSywrQkFBTyxLQUFLaEg7QUFIMEIscUJBQXZCLENBQW5CO0FBS0g7QUFDSjtBQUNEelQsb0JBQVFDLEdBQVIsQ0FBWXFJLElBQVo7O0FBRUExSixxQkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsWUFBWXdKLEdBQVosR0FBa0IsU0FBMUMsRUFBcURTLE1BQXJELENBQTREN0osS0FBS3lKLE1BQWpFO0FBQ0gsU0FwRUQ7QUFxRUg7QUEzRVMsQ0FBZDs7a0JBOEVlOFIsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA3MjY1N2ExZTJlNzRkNjk2NTIyIiwidmFyIENvbmZpZyA9IHtcclxuICAgIG1ldHJvOntcclxuICAgICAgICBuZWFyU3RkOjc1MCxcclxuXHJcbiAgICAgICAgc2NvcmU6e1xyXG4gICAgICAgICAgICBwZXJjZW50aWxlIDogWzAuMTUsIDAuMiwgMC4yNSwgMC4yLCAwLjEsIDAuMV0sIC8vOSwgOCwgNy4uLuygkOuMgOydmCDrsLHrtoTsnIQg67mE7JyoIC0g7ZWp6rOEIDEg65CY7Ja07JW8IO2VqCEhIVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbGF1bmRyeTp7XHJcbiAgICAgICAgbmVhclN0ZDo1MDAsXHJcblxyXG4gICAgICAgIHNjb3JlOntcclxuICAgICAgICAgICAgcGVyY2VudGlsZSA6IFswLjE1LCAwLjIsIDAuMjUsIDAuMiwgMC4yXSwgLy85LCA4LCA3Li4u7KCQ64yA7J2YIOuwseu2hOychCDruYTsnKggLSDtlanqs4QgMSDrkJjslrTslbwg7ZWoISEhIC0g7JeG7Jy866m0IDXsoJAg67aA7JesXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmb29kOntcclxuICAgICAgICBraW5kOntcclxuICAgICAgICAgICAgYmFrZXJ5OnsgLy/snbzrsJjsoIEg67Kg7J207Luk66asIOy0ney5rVxyXG4gICAgICAgICAgICAgICAgbmFtZTpcIuuyoOydtOy7pOumrFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcIuuyoOydtOy7pOumrFwiLFxyXG4gICAgICAgICAgICAgICAgam9zYTpcIuqwgFwiLFxyXG4gICAgICAgICAgICAgICAgc3RkOjI1MCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBncm9jZXJ5OnsgLy/snbzrsJjsoIEg7Iud66OM7ZKI7KCQIOy0ney5rVxyXG4gICAgICAgICAgICAgICAgbmFtZTpcIuyLneujjO2SiOygkFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcIuyLneujjO2SiOygkFwiLFxyXG4gICAgICAgICAgICAgICAgam9zYTpcIuydtFwiLFxyXG4gICAgICAgICAgICAgICAgc3RkOjI1MCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXZlbjp7XHJcbiAgICAgICAgICAgICAgICBuYW1lOlwi7IS467iQ7J2866CI67iQXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOlwi7Y647J2Y7KCQXCIsXHJcbiAgICAgICAgICAgICAgICBqb3NhOlwi7J20XCIsXHJcbiAgICAgICAgICAgICAgICBzdGQ6MjAwICAgICAvL+yWvOuniOuCmCDqsIDquYzsnbQg7J6I7Ja07JW8IO2YuO2FlCDso7zrs4DsnLzroZwg7J247KCV7ZWY64KYXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhbWlseTp7XHJcbiAgICAgICAgICAgICAgICBuYW1lOlwi7Yyo67CA66as66eI7Yq4XCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOlwi7Y647J2Y7KCQXCIsXHJcbiAgICAgICAgICAgICAgICBqb3NhOlwi7J20XCIsXHJcbiAgICAgICAgICAgICAgICBzdGQ6MjAwICAgICAvL+yWvOuniOuCmCDqsIDquYzsnbQg7J6I7Ja07JW8IO2YuO2FlCDso7zrs4DsnLzroZwg7J247KCV7ZWY64KYXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxhd3Nvbjp7XHJcbiAgICAgICAgICAgICAgICBuYW1lOlwi66Gc7IaQXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOlwi7Y647J2Y7KCQXCIsXHJcbiAgICAgICAgICAgICAgICBqb3NhOlwi7J20XCIsXHJcbiAgICAgICAgICAgICAgICBzdGQ6MjAwICAgICAvL+yWvOuniOuCmCDqsIDquYzsnbQg7J6I7Ja07JW8IO2YuO2FlCDso7zrs4DsnLzroZwg7J247KCV7ZWY64KYXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxhcmdlOntcclxuICAgICAgICAgICAgICAgIG5hbWU6XCLrjIDtmJXrp4jtirhcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6XCLrjIDtmJXrp4jtirhcIixcclxuICAgICAgICAgICAgICAgIGpvc2E6XCLqsIBcIixcclxuICAgICAgICAgICAgICAgIG11bHRpcGxlOjIsIC8v7J2064WA7ISd7J20IOyjvOuzgOyXkCDsnojsnLzrqbQgMuuwsCDsoovsnYDrhogg7Leo6riJXHJcbiAgICAgICAgICAgICAgICBzdGQ6NTAwICAgICAvL+yWvOuniOuCmCDqsIDquYzsnbQg7J6I7Ja07JW8IO2YuO2FlCDso7zrs4DsnLzroZwg7J247KCV7ZWY64KYXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG5lYXJTdGQ6ey8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg67aA6re87JeQIOyeiOuKlOqxuOuhnCDsnbjsoJXtlaDqsoPsnbTrg5BcclxuICAgICAgICAgICAgbGFyZ2U6NTAwLFxyXG4gICAgICAgICAgICBncm9jZXJ5OjI1MCxcclxuICAgICAgICAgICAgY3ZzOjI1MCwgXHJcbiAgICAgICAgICAgIGJha2VyeToyNTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjb3JlOntcclxuICAgICAgICAgICAgcGVyY2VudGlsZSA6IFswLjE1LCAwLjIsIDAuMjUsIDAuMiwgMC4xLCAwLjFdLCAvLzksIDgsIDcuLi7soJDrjIDsnZgg67Cx67aE7JyEIOu5hOycqCAtIO2VqeqzhCAxIOuQmOyWtOyVvCDtlaghISFcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdlaWdodDp7IC8vQVRNIOygkOyImOulvCDsgrDstpztlaAg65WMIOqwgOykkey5mCjsiKvsnpAg64uo7JyEIOustOq0gClcclxuICAgICAgICAgICAgICAgIG5lYXJlc3Q6My41LFxyXG4gICAgICAgICAgICAgICAgaW4yNTA6IDEsXHJcbiAgICAgICAgICAgICAgICBsYXJnZToxMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgd29yZDp7XHJcbiAgICAgICAgICAgIGludGVncmF0ZTp7IC8v6rCA7J6lIOqwgOq5jOyatCBmb29k6rCAIGxhcmdlKOydtOqxsOuCmCAxMG0g66+466eMIOqxsOumrOywqOydtCkpXHJcbiAgICAgICAgICAgICAgICBzdGQ6WzAuMTUsIDAuMzUsIDAuNl0sIC8v656t7YK57J20IO2VtOuLuSDrsLHrtoTsnIQg7JWI7JeQIOuTpCDqsr3smrBcclxuICAgICAgICAgICAgICAgIHdvcmQ6WyAvL3dvcmTripQgc3Rk67O064ukIO2VmOuCmCDrp47slYTslbwg7ZWoLijsnbQg6rK97JqwIDcwJSDrgrTsl5Ag66q7IOuTpOyXiOydhCDqsr3smrDsnZgg7JuM65SpKVxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOuhnCDrp6TsmrAg6rCA6rmM7J207JeQIOyeiOydjCBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzroZwg6rCA6rmM7Jq0IO2OuC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGJhbmsyNDp7XHJcbiAgICAgICAgICAgICAgICBzdGQ6WzAuMzUsMC43XSwgXHJcbiAgICAgICAgICAgICAgICB3b3JkOltcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I6rOgLCBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzroZwsIOqwgOq5jOyatCDtjrguIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrCDrlqjslrTsp4Qg7KO87JyE7JeQIOyeiOydjC4gXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmVhcmVzdDp7XHJcbiAgICAgICAgICAgICAgICBzdGQ6WzAuMSwwLjI1LDAuNF0sIC8v656t7YK57J20IO2VtOuLuSDrsLHrtoTsnIQg7JWI7JeQIOuTpCDqsr3smrBcclxuICAgICAgICAgICAgICAgIHdvcmQ6WyAvL3dvcmTripQgc3Rk67O064ukIO2VmOuCmCDrp47slYTslbwg7ZWoLijsnbQg6rK97JqwIDcwJSDrgrTsl5Ag66q7IOuTpOyXiOydhCDqsr3smrDsnZgg7JuM65SpKVxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiLCAvLzE4MDgxMCAtIO2PieqwgOulvCDsnbzri6gg7JWIIO2VmOq4sOuhnCDtlahcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhdG06e1xyXG4gICAgICAgIHNjb3JlOntcclxuICAgICAgICAgICAgcGVyY2VudGlsZSA6IFswLjE1LCAwLjIsIDAuMjUsIDAuMiwgMC4xLCAwLjFdLCAvLzksIDgsIDcuLi7soJDrjIDsnZgg67Cx67aE7JyEIOu5hOycqCAtIO2VqeqzhCAxIOuQmOyWtOyVvCDtlaghISFcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdlaWdodDp7IC8vQVRNIOygkOyImOulvCDsgrDstpztlaAg65WMIOqwgOykkey5mCjsiKvsnpAg64uo7JyEIOustOq0gClcclxuICAgICAgICAgICAgICAgIGJhbmsyNDo0LFxyXG4gICAgICAgICAgICAgICAgbmVhcmVzdDozLjc1LFxyXG4gICAgICAgICAgICAgICAgaW4xMzA6IDAuNVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIFxyXG4gICAgICAgIHdvcmQ6e1xyXG4gICAgICAgICAgICBpbnRlZ3JhdGU6eyAvL+qwgOyepSDqsIDquYzsmrQgQVRN7J20IDI07Iuc6rCEIOyYpO2UiO2VmOuKlCDsnYDtlokg7IaM7JygKOydtOqxsOuCmCAxMG0g66+466eMIOqxsOumrOywqOydtCkpXHJcbiAgICAgICAgICAgICAgICBzdGQ6WzAuMTUsIDAuMzUsIDAuNl0sIC8v656t7YK57J20IO2VtOuLuSDrsLHrtoTsnIQg7JWI7JeQIOuTpCDqsr3smrBcclxuICAgICAgICAgICAgICAgIHdvcmQ6WyAvL3dvcmTripQgc3Rk67O064ukIO2VmOuCmCDrp47slYTslbwg7ZWoLijsnbQg6rK97JqwIDcwJSDrgrTsl5Ag66q7IOuTpOyXiOydhCDqsr3smrDsnZgg7JuM65SpKVxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOuhnCDrp6TsmrAg6rCA6rmM7J207JeQIOyeiOydjCBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzroZwg6rCA6rmM7Jq0IO2OuC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGJhbmsyNDp7XHJcbiAgICAgICAgICAgICAgICBzdGQ6WzAuMzUsMC43XSwgXHJcbiAgICAgICAgICAgICAgICB3b3JkOltcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I6rOgLCBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzroZwsIOqwgOq5jOyatCDtjrguIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrCDrlqjslrTsp4Qg7KO87JyE7JeQIOyeiOydjC4gXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmVhcmVzdDp7XHJcbiAgICAgICAgICAgICAgICBzdGQ6WzAuMSwwLjI1LDAuNF0sIC8v656t7YK57J20IO2VtOuLuSDrsLHrtoTsnIQg7JWI7JeQIOuTpCDqsr3smrBcclxuICAgICAgICAgICAgICAgIHdvcmQ6WyAvL3dvcmTripQgc3Rk67O064ukIO2VmOuCmCDrp47slYTslbwg7ZWoLijsnbQg6rK97JqwIDcwJSDrgrTsl5Ag66q7IOuTpOyXiOydhCDqsr3smrDsnZgg7JuM65SpKVxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiLCAvLzE4MDgxMCAtIO2PieqwgOulvCDsnbzri6gg7JWIIO2VmOq4sOuhnCDtlahcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL2NvbmZpZy5qcyIsInZhciBHZW9Db2RlID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oYXJyLCByZWYpe1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidGVtcC9nZW9jb2RlXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICBpZighZGF0YSl7ICAvL+uLpOuluCDsp4DsmKTsvZTrlKkg7J6R7JeF7KSR7J20652866m0IOygiOuMgCDrja7slrTsjajshJzripQg7JWIIOuQqDtcclxuICAgICAgICAgICAgICAgIGlmKGFyci5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ0ZW1wL2dlb2NvZGVcIikuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmOnJlZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyOmFyclxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlKGFyciwgcmVmKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KeA7Jik7L2U65SpIOyekeyXheydhCDsi5zsnpHtlanri4jri6QuIOyXrOufrOuyiCDsg4jroZzqs6Dsuagg65CgIOyImCDsnojsirXri4jri6QuXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBjb2RlOiBmdW5jdGlvbihhcnIsIHJlZil7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBsZXQgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcclxuICAgICAgICB2YXIgYWRkcmVzcyA9IGFyclswXS5hZGRyZXNzO1xyXG4gICAgICAgIHZhciBhaWQgPSBhcnJbMF0uYWlkO1xyXG5cclxuICAgICAgICBnZW9jb2Rlci5nZW9jb2RlKCB7J2FkZHJlc3MnOiBhZGRyZXNzfSwgZnVuY3Rpb24ocmVzdWx0cywgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXR1cylcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSAnT0snKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvb3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubGF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubG5nKClcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihyZWYrXCIvXCIrYWlkK1wiL2Nvb3JcIikuc2V0KGNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGFyci5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY29kZShhcnIsIHJlZilcclxuICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ0ZW1wL2dlb2NvZGVcIikuc2V0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuyngOyYpOy9lOuUqSDsnpHsl4XsnbQg7JmE66OM65CY7JeI7Iq164uI64ukLlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMgPT09ICdaRVJPX1JFU1VMVFMnKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcnJbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi7KeA7Jik7L2U65SpIOqysOqzvOqwgCDsl4bripQg7ZWt66qp7J20IOyeiOyKteuLiOuLpC4g7L2Y7IaU7LC97J2EIOywuOqzoO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidGVtcC9nZW9jb2RlXCIpLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjpyZWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycjphcnJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHZW9Db2RlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL21vZHVsZXMvZ2VvQ29kZS5qcyIsImltcG9ydCBBdHRlbmQgZnJvbSBcIi4vcGFnZXMvYXR0ZW5kLmpzXCI7XHJcbmltcG9ydCBDaXR5IGZyb20gXCIuL3BhZ2VzL2NpdHkuanNcIjtcclxuaW1wb3J0IFNwb3QgZnJvbSBcIi4vcGFnZXMvc3BvdC5qc1wiO1xyXG5pbXBvcnQgQWNjb3VudCBmcm9tIFwiLi9wYWdlcy9hY2NvdW50LmpzXCI7XHJcbmltcG9ydCBTdWJ3YXkgZnJvbSBcIi4vcGFnZXMvc3Vid2F5LmpzXCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3BhZ2VzL3ZpZXcuanNcIjtcclxuaW1wb3J0IEhvdGVsIGZyb20gXCIuL3BhZ2VzL2hvdGVsLmpzXCI7XHJcbmltcG9ydCBHZW9Db2RlIGZyb20gXCIuL21vZHVsZXMvZ2VvQ29kZS5qc1wiO1xyXG5cclxudmFyIGluaXRpYWxpemVkID0ge307XHJcblxyXG52YXIgdV9pID0ge307XHJcblxyXG52YXIgTmF2X2Z1bmN0aW9uID0ge1xyXG4gICAgYXR0ZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgQXR0ZW5kLmluaXQodV9pKTtcclxuICAgICAgICBpbml0aWFsaXplZC5hdHRlbmQgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIHRvZG86IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgY2l0eTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIENpdHkuaW5pdCh1X2kpO1xyXG4gICAgICAgIGluaXRpYWxpemVkLmNpdHkgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIHZpZXc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBWaWV3LmluaXQoKTtcclxuICAgICAgICBpbml0aWFsaXplZC52aWV3ID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBhY2NvdW50OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIHNwb3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBTcG90LmluaXQodV9pKTtcclxuICAgICAgICBpbml0aWFsaXplZC5zcG90ID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBjYWxjOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGhvdGVsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgSG90ZWwuaW5pdCgpO1xyXG4gICAgICAgIGluaXRpYWxpemVkLmhvdGVsID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBsaW5rOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gbG9naW4obmFtZSl7XHJcbiAgICAkKFwiLmhlbGxvV29ybGRcIikuaHRtbChuYW1lWzFdK1wi7ZWYIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5hdHRyKFwidGl0bGVcIixuYW1lK1wi64uYIOyViOuFle2VmOyEuOyalCFcIik7XHJcbiAgICAkKFwiLmhlbGxvV29ybGRcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihjb25maXJtKG5hbWUrXCLri5gg66Gc6re47JWE7JuDIO2VmOyLnOqyoOyKteuLiOq5jD9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgIC8vIEFuIGVycm9yIGhhcHBlbmVkLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBwcm92aWRlciA9IG5ldyBmaXJlYmFzZS5hdXRoLkdvb2dsZUF1dGhQcm92aWRlcigpO1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbiAodXNlcikge1xyXG4gICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICAgIGxldCBtYWlsID0gdXNlci5lbWFpbC5zcGxpdCgnQCcpWzBdO1xyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ0ZW1wL2dlb2NvZGVcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIEdlb0NvZGUuY29kZShkYXRhLmFyciwgZGF0YS5yZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi7KeA7Jik7L2U65SpIOyekeyXheydhCDsnbTslrTshJwg7KeE7ZaJ7ZWp64uI64ukLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v7JWE656YIOuCtOyaqeydhCDrsJTqvrjrqbQgaWYgKCFpc1VzZXIpIOu2gOu2hOyXkOuPhCDrsJjrk5zsi5wg67CY7JiB7ZW07KSE6rKDXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgKHZhciBnaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGRhdGFbZ2lkXS5cclxuICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLnVwZGF0ZShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVttYWlsXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVfaSA9IGRhdGFbbWFpbF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyYWRlID0gdV9pLmdyYWRlICogMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdHRlbmQuaW5pdChkYXRhW21haWxdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2NvdW50LmluaXQobWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hY2NvdW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hdHRlbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dpbih1X2kubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBVc2VyIGlzIHNpZ25lZCBpbi5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gTm8gdXNlciBpcyBzaWduZWQgaW4uXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IHJlc3VsdC51c2VyO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJNYWlsID0gdXNlci5lbWFpbC5zcGxpdCgnQCcpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3VzZXJNYWlsXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1X2kgPSBkYXRhW3VzZXJNYWlsXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyYWRlID0gdV9pLmdyYWRlICogMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmFkZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF0dGVuZC5pbml0KGRhdGFbdXNlck1haWxdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmFkZSA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjY291bnQuaW5pdCh1c2VyTWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZWQuYWNjb3VudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hdHRlbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9naW4odV9pLm5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCd1c2Vycy8nICsgdXNlck1haWwpLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIuZGlzcGxheU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWlsOiB1c2VyTWFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogXCJhYmNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgnY29kZTonICsgZXJyb3IuY29kZSArICcgLSDsnbzsi5zsoIHsnbgg66y47KCc6rCAIOuwnOyDne2WiOyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalC4nKTtcclxuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBFcnJvcnMgaGVyZS5cclxuICAgICAgICAgICAgICAgIHZhciBlcnJvckNvZGUgPSBlcnJvci5jb2RlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZW1haWwgb2YgdGhlIHVzZXIncyBhY2NvdW50IHVzZWQuXHJcbiAgICAgICAgICAgICAgICB2YXIgZW1haWwgPSBlcnJvci5lbWFpbDtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBmaXJlYmFzZS5hdXRoLkF1dGhDcmVkZW50aWFsIHR5cGUgdGhhdCB3YXMgdXNlZC5cclxuICAgICAgICAgICAgICAgIHZhciBjcmVkZW50aWFsID0gZXJyb3IuY3JlZGVudGlhbDtcclxuICAgICAgICAgICAgICAgIC8vIC4uLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuJChcIi5uYXZfX2l0ZW1cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgaWYoISQodGhpcykuaGFzQ2xhc3MoJ25hdl9faXRlbS0taGFzRHJhd2VyJykpe1xyXG4gICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5hdHRyKFwiaWRcIikuc3BsaXQoXCJfXCIpWzFdO1xyXG5cclxuICAgICAgICAkKFwiLm5hdj4qXCIpLnJlbW92ZUNsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAgICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIucGFnZXMuXCIgKyBpdGVtKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICAgICBpZighaW5pdGlhbGl6ZWRbaXRlbV0pe1xyXG4gICAgICAgICAgICBOYXZfZnVuY3Rpb25baXRlbV0oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuJChcIi5uYXZfX2RyYXdlcl9faXRlbVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgdmFyIGl0ZW0gPSAkKHRoaXMpLmF0dHIoXCJpZFwiKS5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgJChcIi5uYXY+KlwiKS5yZW1vdmVDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAkKFwiLm5hdl9fZHJhd2VyX19pdGVtXCIpLnJlbW92ZUNsYXNzKFwibmF2X19kcmF3ZXJfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIm5hdl9fZHJhd2VyX19pdGVtLS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAkKFwiLnBhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLnBhZ2VzLlwiICsgaXRlbSkucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICBpZiAoIWluaXRpYWxpemVkW2l0ZW1dKSB7XHJcbiAgICAgICAgTmF2X2Z1bmN0aW9uW2l0ZW1dKCk7XHJcbiAgICB9XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL2luZGV4LmpzIiwidmFyIEF0dGVuZCA9IHtcclxuICAgIG1vYmlsZTogZmFsc2UsXHJcblxyXG4gICAgaWQ6IFwiXCIsXHJcblxyXG4gICAgdmlld0lEOiBcIlwiLFxyXG4gICAgLy/qtIDrpqzsnpDqsIAg64uk66W4IOyCrOuejOydmCBJRCDtmZXsnbjspJFcclxuXHJcbiAgICBhdHRlbmRPYmo6IHt9LFxyXG5cclxuICAgIHNhbGFyeToge30sXHJcblxyXG5cclxuICAgIHdlZWtkYXlzOiBbXCLsnbxcIiwgXCLsm5RcIiwgXCLtmZRcIiwgXCLsiJhcIiwgXCLrqqlcIiwgXCLquIhcIiwgXCLthqBcIiwgXCLsnbxcIl0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24odV9pKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGdyYWRlID0gdV9pLmdyYWRlO1xyXG4gICAgICAgIHZhciBpZCA9IHVfaS5pZDtcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG5cclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0Kz0nPHNlbGVjdCBjbGFzcz1cIndvcmtlcl9zZWxlY3RvclwiPjwvc2VsZWN0Pic7XHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fdG9wXCI+JztcclxuICAgICAgICB0eHQgKz0gICAnPGRpdiBpZD1cImNhbGVuZGFyXCIgY2xhc3M9XCJhdHRlbmRfX2NhbGVuZGFyXCI+PC9kaXY+JztcclxuICAgICAgICB0eHQgKz0gICAnPGRpdiBjbGFzcz1cImF0dGVuZF9fd2Vla1wiPjwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9JzwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoXCI+PC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5hdHRlbmRcIikuaHRtbCh0eHQpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnlcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHRoYXQuc2FsYXJ5ID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgaWYoZ3JhZGUgPT09IDUpe1xyXG4gICAgICAgICAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5sb2FkaW5nVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VycyA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG1haWxJRCBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih1c2Vyc1ttYWlsSURdLmdyYWRlKjE8NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgbWFpbElEICsgJ1wiPicgKyB1c2Vyc1ttYWlsSURdLm5hbWUgKyAnPC9vcHRpb24+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5odG1sKHR4dCkudmFsKGlkKS5wcm9wKFwic2VsZWN0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIubG9hZGluZ1ZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZE9iaiA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCEkKFwiLmZjLWhlYWRlci10b29sYmFyXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld1JlbmRlciA6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFdvcmtIb3VyKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5vbihcImNsaWNrXCIsIFwiLmNvbmZpcm1cIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoISQoXCIuYXR0ZW5kXCIpLmhhc0NsYXNzKCdkaXNwbGF5Tm9uZScpKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJCh0aGlzKS5hdHRyKFwiZGlkXCIpKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5vbihcImNsaWNrXCIsIFwiLmNsb3NlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmICghJChcIi5hdHRlbmRcIikuaGFzQ2xhc3MoJ2Rpc3BsYXlOb25lJykpIHtcclxuICAgICAgICAgICAgICAgICQoXCIuYmxhY2tTY3JlZW5cIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcImJvZHlcIikua2V5dXAoZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGlmICghJChcIi5hdHRlbmRcIikuaGFzQ2xhc3MoJ2Rpc3BsYXlOb25lJykpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiLm1vZGFsIC5jb25maXJtXCIpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2RlID0gZS53aGljaDsgLy8gcmVjb21tZW5kZWQgdG8gdXNlIGUud2hpY2gsIGl0J3Mgbm9ybWFsaXplZCBhY3Jvc3MgYnJvd3NlcnNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJChcIi5tb2RhbCAuY29uZmlybVwiKS5hdHRyKFwiZGlkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5jaGFuZ2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld193b3JrZXIoaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICB2aWV3X3dvcmtlcjogZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYoaWQgPT09IHRoYXQuaWQpe1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fY2FsZW5kYXJcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX3dlZWtcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX21vbnRoXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19jYWxlbmRhclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICBpZih0aGF0LnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGF0LnZpZXdJRCkub2ZmKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK2lkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hdHRlbmRPYmogPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlvID0gdGhhdC52aWV3SUQ7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdJRCA9IGlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHlvLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoYXQuaWQgIT09IHRoYXQudmlld0lEKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0V29ya0hvdXIoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jYWxlbmRhcjogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5hdHRlbmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmZjLWRheVwiKS5odG1sKFwiXCIpO1xyXG5cclxuICAgICAgICBpZihkYXRhLmF0dGVuZCl7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmF0dGVuZDtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF0ZSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZUlEID0gZGF0ZS5zbGljZSgwLDQpK1wiLVwiK2RhdGUuc2xpY2UoNCw2KStcIi1cIitkYXRlLnNsaWNlKDYsOCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gMDtcclxuICAgICAgICAgICAgICAgIGxldCB0eHQgPSAnPHA+JytkYXRhW2RhdGVdWzBdLmZyb20rXCJ+XCIrZGF0YVtkYXRlXVswXS50bysnPC9wPic7XHJcbiAgICAgICAgICAgICAgICAvL+uRkO2DgOyehCDrgpjriKDshJwg6re866y07ZaI7Ja064+EIOuLrOugpeyXkCDtkZzsi5zrkJjripQg6rKD7J2AIOyyq+2DgOyehCDqt7zrrLTsi5zqsITrp4xcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWYgKz0gZGF0YVtkYXRlXVtpXS5kaWY7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHh0Kz0nPHA+JyArIE1hdGguZmxvb3IoZGlmLzYwKSArIFwi7Iuc6rCEIFwiKyBkaWYlNjAgK1wi67aEXCIrJzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgJCgnLmF0dGVuZCAuZmMtZGF5W2RhdGEtZGF0ZT1cIicrZGF0ZUlEKydcIl0nKS5odG1sKHR4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGR1ck1vbiA9IDA7XHJcbiAgICAgICAgICAgIGxldCB0aGlzTW9udGggPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLmF0dGVuZCAuZmMtZGF5XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZURvbSA9ICQoXCIuYXR0ZW5kIC5mYy1kYXlcIikuZXEoaSk7XHJcbiAgICAgICAgICAgICAgICBpZighZGF0ZURvbS5oYXNDbGFzcyhcImZjLW90aGVyLW1vbnRoXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGRhdGVEb20uYXR0cihcImRhdGEtZGF0ZVwiKS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc01vbnRoID0gZGF0ZVswXStkYXRlWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlWzBdK2RhdGVbMV0rZGF0ZVsyXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyTW9uICs9IGRhdGFbZGF0ZV1bal0uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdHh0ID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZigkKFwiLmF0dGVuZCAuZmMtdmlldy1jb250YWluZXJcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7ICAgLy/rrLTsobDqsbQgNuyjvFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3ZWVrRG9tID0gJChcIi5hdHRlbmQgLmZjLXdlZWtcIikuZXEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWtEdXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDc7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF5RG9tID0gd2Vla0RvbS5maW5kKFwiLmZjLWRheVwiKS5lcShqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBkYXlEb20uYXR0cihcImRhdGEtZGF0ZVwiKS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlWzBdK2RhdGVbMV0rZGF0ZVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrRHVyICs9IGRhdGFbZGF0ZV1ba10uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHdlZWtEdXI+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiYXR0ZW5kX193ZWVrX19ob3VyXCI+JysgTWF0aC5mbG9vcih3ZWVrRHVyLzYwKSsn7Iuc6rCEICcrd2Vla0R1ciU2MCsn67aEJyArJzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImF0dGVuZF9fd2Vla19faG91clwiPjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKFwiLmF0dGVuZCAuZmMtbGVmdFwiKS5jaGlsZHJlbihcImgyLmR1ck1vbnRoXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZCBoMi5kdXJNb250aFwiKS5odG1sKCcgKCcrTWF0aC5mbG9vcihkdXJNb24vNjApKyfsi5zqsIQgJytkdXJNb24lNjArJ+u2hCknKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZCAuZmMtbGVmdFwiKS5hcHBlbmQoJzxoMiBjbGFzcz1cImR1ck1vbnRoXCI+ICgnK01hdGguZmxvb3IoZHVyTW9uLzYwKSsn7Iuc6rCEICcrZHVyTW9uJTYwKyfrtoQpPC9oMj4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHh0ID0gJyc7ICAgLy92YXIg67m866i57J2A6rGwIOyVhOuLmC4g7JyE7JeQ7IScIOyEoOyWuCDtlojsnYwhXHJcblxyXG4gICAgICAgICAgICBsZXQgZnVsbE1vbnRoQm9udXMgPSAzMDQwMDtcclxuICAgICAgICAgICAgbGV0IGluc3VyYW5jZUZlZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBiYXNpYyA9IE1hdGgucm91bmQoZHVyTW9uLzYwKjc2MDApO1xyXG4gICAgICAgICAgICBsZXQgZnVsbFdlZWtCdW51cyA9IE1hdGgucm91bmQoKGR1ck1vbi82MCo3NjAwKSowLjIpO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYodGhpcy5pZCA9PT0gdGhpcy52aWV3SUQpe1xyXG4gICAgICAgICAgICAvLyAgICAgLy/rs7jsnbgg66qo65OcXHJcbiAgICAgICAgICAgIC8vICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImFjY291bnQvc2FsYXJ5L1wiK3RoaXNNb250aCtcIi9cIit0aGlzLmlkKS51cGRhdGUoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJhc2ljOiBiYXNpYyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsV2Vla0J1bnVzOiBmdWxsV2Vla0J1bnVzLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxNb250aEJvbnVzOiBmdWxsTW9udGhCb251c1xyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhY2NvdW50L3NhbGFyeS9cIit0aGlzTW9udGgrXCIvXCIrdGhpcy52aWV3SUQpLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYmFzaWM6IGJhc2ljLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxXZWVrQnVudXM6IGZ1bGxXZWVrQnVudXMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbE1vbnRoQm9udXM6IGZ1bGxNb250aEJvbnVzXHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+6riw67O46riJPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShiYXNpYykrIFwi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7qt7zrrLTsi5zqsIQgWCA3LDYwMOybkDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7KO87Zy07IiY64u5PC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShmdWxsV2Vla0J1bnVzKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq4sOuzuOq4ieydmCAyMCU8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuyXsOywqOyImOuLuTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoZnVsbE1vbnRoQm9udXMpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+NeyLnOqwhCDsg4Hri7kg6riw67O46riJPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZSBhdHRlbmRfX21vbnRoX19saW5lLS1yZWRcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7IKs7ZqM67O07ZeY66OMPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShpbnN1cmFuY2VGZWUpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6rWt66+87Jew6riIL+qzoOyaqeuztO2XmC/qsbTqsJXrs7Ttl5gg7LKt6rWs7JWhPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZSBhdHRlbmRfX21vbnRoX19saW5lLS1zdW1cIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7ZWp6rOEPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShiYXNpYyArIGZ1bGxXZWVrQnVudXMgKyBmdWxsTW9udGhCb251cyAtIGluc3VyYW5jZUZlZSkgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7quLDrs7jquIkgKyDso7ztnLTsiJjri7kgKyDsl7DssKjsiJjri7kgLSDsgqztmozrs7Ttl5jro4w8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19tb250aFwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dFdvcmtIb3VyOiBmdW5jdGlvbihkYXRlT2JqKXtcclxuICAgICAgICAvLyBjc3M6IG1vZHVsZXMvYXR0ZW5kLmNzc1xyXG4gICAgICAgIGxldCBkYXRlU2hvcnQgPSBtb21lbnQoZGF0ZU9iaikuZm9ybWF0KFwiTU0vRERcIik7XHJcbiAgICAgICAgbGV0IGRhdGVJRCA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoXCJZWVlZTU1ERFwiKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgICBpZih0aGlzLmF0dGVuZE9iai5hdHRlbmRbZGF0ZUlEXSl7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmF0dGVuZE9iai5hdHRlbmRbZGF0ZUlEXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImJsYWNrU2NyZWVuXCI+JztcclxuICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwiaW5wdXRXaW5kb3dcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8cCBjbGFzcz1cInRpdGxlXCI+JytkYXRlU2hvcnQrJyDqt7zrrLTsi5zqsIQ8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj4nO1xyXG4gICAgICAgIGlmKGRhdGFbMF0pe1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwiZmlyc3RfZnJvbVwiIHZhbHVlPVwiJytkYXRhWzBdLmZyb20rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJmaXJzdF90b1wiIHZhbHVlPVwiJytkYXRhWzBdLnRvKydcIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cImZpcnN0X2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwiZmlyc3RfdG9cIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxkaXYgY2xhc3M9XCJsaW5lIGNsZWFyZml4XCI+JztcclxuICAgICAgICBpZihkYXRhWzFdKXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCIgdmFsdWU9XCInK2RhdGFbMV0uZnJvbSsnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiIHZhbHVlPVwiJytkYXRhWzFdLnRvKydcIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImJvdHRvbVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAgICc8cCBjbGFzcz1cImNvbmZpcm1cIiBkaWQ9XCInK2RhdGVJRCsnXCI+7ZmV7J24PC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAgICc8cCBjbGFzcz1cImNsb3NlXCI+7Leo7IaMPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0Kz0gICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tb2JpbGUpe1xyXG4gICAgICAgICAgICAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLkFueVBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICBkYXRlVGltZUZvcm1hdDpcIkhIOm1tXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiI2ZpcnN0X2Zyb21cIikuZm9jdXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0V29ya0hvdXI6IGZ1bmN0aW9uKGRhdGUpe1xyXG5cclxuICAgICAgICBsZXQgd29yayA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgYWxsRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZigkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLmVxKGkpLnZhbCgpLmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgIGFsbEVtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGFsbEVtcHR5KXtcclxuICAgICAgICAgICAgaWYodGhpcy52aWV3SUQubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy52aWV3SUQrXCIvYXR0ZW5kL1wiK2RhdGUpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQrXCIvYXR0ZW5kL1wiK2RhdGUpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgIGxldCBkYXRlSUQgPSBkYXRlLnNsaWNlKDAsNCkgKyBcIi1cIitkYXRlLnNsaWNlKDQsNikgKyBcIi1cIitkYXRlLnNsaWNlKDYsOCk7XHJcbiAgICAgICAgICAgICQoJy5mYy1kYXlbZGF0YS1kYXRlPVwiJytkYXRlSUQrJ1wiXScpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZigkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuICAgICAgICAgICAgLy/si5zsnpHsi5zqsITsnbQg7J6YIOyeheugpeuQmOyXiOuCmCDtmZXsnbhcclxuXHJcbiAgICAgICAgICAgIGlmKGRhdGU8bW9tZW50KCkuZm9ybWF0KFwiWVlZWU1NRERcIikpe1xyXG4gICAgICAgICAgICAgICAgLy/smKTripgg7J207KCEIOydvOydmCDrgqDsp5zrpbwg64uk66Oo6rOgIOyeiOydhCDqsr3smrAgLSDqt7zrrLQg7KKF66OM7Iuc6rCE7J20IOyeheugpeuQmOyngCDslYrsnLzrqbQg7JWIIOuQqFxyXG4gICAgICAgICAgICAgICAgaWYoJChcIiNmaXJzdF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL+ydtOyghOydvOydtCDslYTri4jrjZTrnbzrj4Qg7JiI7IOBIOq3vOustOyLnOqwhOydtOudvOuPhCDsnoXroKXtlbTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi7JiI7IOBIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmcm9tID0gJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICBsZXQgdG8gPSAkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZyb21BID0gZnJvbS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgIGxldCB0b0EgPSB0by5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgIGxldCBkaWYgPSAodG9BWzBdKjEgLSBmcm9tQVswXSoxKSo2MCArICh0b0FbMV0qMSAtIGZyb21BWzFdKjEpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgdG86IHRvLFxyXG4gICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhbGVydChcIuq3vOustOyLnOqwhOydtCDsnpjrqrsg7J6F66Cl65CY7JeI7Iq164uI64ukLiBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZigkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRlPG1vbWVudCgpLmZvcm1hdChcIllZWVlNTUREXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI3NlY29uZF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOyYiOyDgSDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmcm9tID0gJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGxldCB0byA9ICQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmcm9tQSA9IGZyb20uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAodG9BWzBdKjEgLSBmcm9tQVswXSoxKSo2MCArICh0b0FbMV0qMSAtIGZyb21BWzFdKjEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgICAgICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg6re866y07Iuc6rCE7J20IOyemOuquyDsnoXroKXrkJjsl4jsirXri4jri6QuIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy52aWV3SUQubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLnZpZXdJRCtcIi9hdHRlbmQvXCIrZGF0ZSkuc2V0KHdvcmspO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkK1wiL2F0dGVuZC9cIitkYXRlKS5zZXQod29yayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwoXCJcIik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdHRlbmQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2F0dGVuZC5qcyIsImltcG9ydCBNZXRyb0xpbmUgZnJvbSBcIi4vY2l0eS9tZXRyb0xpbmUuanNcIjtcclxuXHJcbmxldCBDaXR5ID0ge1xyXG4gICAgZGF0YToge30sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLmNpdHlcIikub24oXCJjbGlja1wiLCBcIi5yZWZyZXNoXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQucmVmcmVzaFN0YXR1cygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmNpdHlcIikub24oXCJjbGlja1wiLCBcIi5jaXR5X190cmFuc3BvcnRcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGNpZCA9ICQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpOyBcclxuICAgICAgICAgICAgbGV0IHN0YXR1cyA9IHRoYXQuZGF0YVtjaWRdLnN0YXR1cztcclxuICAgICAgICAgICAgaWYoc3RhdHVzLnNwb3Q+MiAmJiBzdGF0dXMudHJhbnNwb3J0PjApe1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLrjIDspJHqtZDthrUg7KCV67O066W8IOqwgOqzte2VqeuLiOuLpC5cIik7XHJcbiAgICAgICAgICAgICAgICBNZXRyb0xpbmUuaW5pdChjaWQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi64yA7KSR6rWQ7Ya1IOygleuztOulvCDqsIDqs7XtlZjquLDsl5Ag7J6Q66OM6rCAIOu2gOyhse2VqeuLiOuLpC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGgyPuuPhOyLnCDrjbDsnbTthLAg7ZmV67O07ZiE7ZmpPC9oMj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwicmVmcmVzaFwiPuy1nOyLoO2ZlDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cIndyYXBwZXJcIj4nO1xyXG5cclxuICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cImxpbmUgdG9wXCI+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cIm5hbWVcIj7rj4Tsi5zrqoU8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX2hvdGVsc1wiPuyImeyGjDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHNcIj7qtIDqtJHsp4Ag7KCV66asPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X190cmFuc3BvcnRcIj7qtZDthrU8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX2FyZWFcIj7sp4Dsl608L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX3ByaWNlXCI+66y86rCAPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gJzwvZGl2Pic7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yICh2YXIgY29kZSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjb2RlXTtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGNpdHkuc3RhdHVzO1xyXG5cclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwibGluZVwiIGlkPVwiJyArIGNpdHkuY29kZSArICdcIj48cCBjbGFzcz1cIm5hbWVcIj4nICsgY2l0eS5uYW1lICsgJzwvcD4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5ob3RlbCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2hvdGVscyB3ZWlnaHQtLWJvbGRcIj7tj4nqsIAg7JmE66OMPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmhvdGVsID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzXCI+642w7J207YSwIOyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2hvdGVscyBjb2xvci0tcmVkXCI+642w7J207YSwIOyXhuydjDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLnNwb3QgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90cyB3ZWlnaHQtLWJvbGRcIj7soJXrs7TqsoDspp0g7JmE66OMPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnNwb3QgPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90c1wiPjLssKjqsoDspp08L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+7ZWp7LmY6riwPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnNwb3QgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90c1wiPuygleuztCDqsoDspp3spJE8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90cyBjb2xvci0tcmVkXCI+7KCV67O0IOyXhuydjDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLnRyYW5zcG9ydCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydCB3ZWlnaHQtLWJvbGRcIj7rjIDspJHqtZDthrUg7JmE66OMPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnRyYW5zcG9ydCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydFwiPuuNsOydtO2EsCDsnojsnYw8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X190cmFuc3BvcnQgY29sb3ItLXJlZFwiPuuNsOydtO2EsCDsl4bsnYw8L3A+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fYXJlYVwiPk88L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19hcmVhIGNvbG9yLS1yZWRcIj5YPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMucHJpY2UpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19wcmljZVwiPk88L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19wcmljZSBjb2xvci0tcmVkXCI+WDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JzsgLy9jbG9zZSB3cmFwcGVyXHJcblxyXG4gICAgICAgICQoXCIuY2l0eVwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzJykub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5pbmZsYXRlKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWZyZXNoU3RhdHVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpcm0oXCLrjbDsnbTthLDrpbwg66eO7J20IOyeoeyVhOuoueyKteuLiOuLpCEg7KCV66eQIOy1nOyLoO2ZlO2VmOyLnOqyoOyKteuLiOq5jD9cIikpIHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcycpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwPT57XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjaWQgaW4gdGhhdC5kYXRhKSB7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdHVzID0ge307XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2l0eSA9IGRhdGFbY2lkXTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNpdHkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbDogMCwgLy8wOuuNsOydtO2EsOyXhuydjCwgMTrsiJnshozrjbDsnbTthLDrp4wg7J6I7J2MLCAyOu2PieqwgOuNsOydtO2EsCjsm4zrlKkpIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdDogdGhhdC5kYXRhW2NpZF0uc3RhdHVzLnNwb3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OiAwLCAvL+uNsOydtO2EsOyXhuydjCwgMTrrqZTtirjroZzrjbDsnbTthLDrp4wg7J6I7J2MLCAyOuqwgOqzteuNsOydtO2EsCjrnbzsnbjrs4QuLuuTsSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaXR5LmFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5hcmVhID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdHkuaG90ZWxzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBob3RlbCA9IGNpdHkuaG90ZWxzW09iamVjdC5rZXlzKGNpdHkuaG90ZWxzKVswXV07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5ob3RlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuaG90ZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuYXJlYSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihob3RlbC5hcmVhID09PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuYXJlYSA9IDI7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaXR5LnN0YXR1cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuc3RhdHVzLmFyZWEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5LnN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaXR5LnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5LnN0YXR1cy5hcmVhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5zdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvc3RhdHVzJykudXBkYXRlKGNpdHkuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdHkubWV0cm8pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5tZXRyb0xpbmUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy50cmFuc3BvcnQgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnRyYW5zcG9ydCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaXR5LnByaWNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5wcmljZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWw6IDAsIC8vMDrrjbDsnbTthLDsl4bsnYwsIDE67IiZ7IaM642w7J207YSw66eMIOyeiOydjCwgMjrtj4nqsIDrjbDsnbTthLAo7JuM65SpKSDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OiAwLCAvL+uNsOydtO2EsOyXhuydjCwgMTrrqZTtirjroZzrjbDsnbTthLDrp4wg7J6I7J2MLCAyOuqwgOqzteuNsOydtO2EsCjrnbzsnbjrs4QuLuuTsSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVtjaWRdLnN0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLnNldCh0aGF0LmRhdGEpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZSh0aGF0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KCfstZzsi6DtmZQg7JmE66OMJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2l0eTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvY2l0eS5qcyIsImxldCBNZXRyb0xpbmUgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihjaWQpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpZCkub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGUoZGF0YSwgY2lkKTtcclxuICAgICAgICAgICAgaWYodGhpcy5saW5lW2NpZF0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWtlTGluZShjaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpZCtcIi9tZXRyb0xpbmVcIikuc2V0KHRoaXMubWV0cm9MaW5lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5tZXRyb0xpbmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBtYWtlTGluZShjaWQpe1xyXG4gICAgICAgIGZvciAobGV0IGxpbmUgaW4gdGhpcy5tZXRyb0xpbmUpIHtcclxuICAgICAgICAgICAgbGV0IHN0bkFyciA9IHRoaXMubWV0cm9MaW5lW2xpbmVdLnN0bjtcclxuXHJcbiAgICAgICAgICAgIGxldCBvcmRlckFyciA9IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5saW5lW2NpZF1bbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5saW5lW2NpZF1bbGluZV1bMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0gdGhpcy5saW5lW2NpZF1bbGluZV1bMV07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0bkFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdG4gPSBzdG5BcnJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RuLm5hbWUgPT09IHN0YXJ0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJBcnIucHVzaChzdG4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZHggPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0bkFyci5zcGxpY2UoaWR4LDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtYXggPSBzdG5BcnIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiAyMDAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwbGljZUlkeCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3RuQXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdG4gPSBzdG5BcnJbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBvcmRlckFycltvcmRlckFyci5sZW5ndGgtMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gY2FsY3VsYXRlRGlmKHRhcmdldC5jb29yLCBzdG4uY29vcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjxuZXh0LmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6c3RuLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcjp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdDpzdG4uY29vci5sYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxuZzpzdG4uY29vci5sbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZjpkaWZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGxpY2VJZHggPSBqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyQXJyLnB1c2gobmV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RuQXJyLnNwbGljZShzcGxpY2VJZHgsMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tZXRyb0xpbmVbbGluZV0uc3RuID0gb3JkZXJBcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRyb0xpbmU6e30sXHJcblxyXG4gICAgbGluZTp7XHJcbiAgICAgICAgbnljOntcclxuICAgICAgICAgICAgMTpbXCJWYW4gQ29ydGxhbmR0IFBhcmsgLSAyNDJuZCBTdFwiLFwiU291dGggRmVycnlcIl0sXHJcbiAgICAgICAgICAgIDI6W1wiV2FrZWZpZWxkIC0gMjQxc3QgU3RcIixcIkJyb29rbHluIENvbGxlZ2UgLSBGbGF0YnVzaCBBdmVcIl0sXHJcbiAgICAgICAgICAgIDM6W1wiSGFybGVtIC0gMTQ4IFN0XCIsXCJOZXcgTG90cyBBdmVcIl0sXHJcbiAgICAgICAgICAgIDQ6W1wiV29vZGxhd25cIixcIk5ldyBMb3RzIEF2ZVwiXSxcclxuICAgICAgICAgICAgNTpbXCJFYXN0Y2hlc3RlciAtIER5cmUgQXZlXCIsXCJCcm9va2x5biBDb2xsZWdlIC0gRmxhdGJ1c2ggQXZlXCJdLFxyXG4gICAgICAgICAgICA2OltcIlBlbGhhbSBCYXkgUGFya1wiLFwiQnJvb2tseW4gQnJpZGdlIC0gQ2l0eSBIYWxsXCJdLFxyXG4gICAgICAgICAgICA3OltcIkZsdXNoaW5nIC0gTWFpbiBTdFwiLFwiMzR0aCBTdCAtIEh1ZHNvbiBZYXJkc1wiXSxcclxuICAgICAgICAgICAgQTpbXCJJbndvb2QgLSAyMDd0aCBTdFwiLFwiUm9ja2F3YXkgUGFyayAtIEJlYWNoIDExNiBTdFwiXSxcclxuICAgICAgICAgICAgQjpbXCJCZWRmb3JkIFBhcmsgQmx2ZFwiLFwiQnJpZ2h0b24gQmVhY2hcIl0sXHJcbiAgICAgICAgICAgIEM6W1wiMTY4dGggU3RcIixcIkV1Y2xpZCBBdmVcIl0sXHJcbiAgICAgICAgICAgIEQ6W1wiTm9yd29vZCAtIDIwNXRoIFN0XCIsXCJDb25leSBJc2xhbmQgLSBTdGlsbHdlbGwgQXZcIl0sXHJcbiAgICAgICAgICAgIEU6W1wiSmFtYWljYSBDdHIgLSBQYXJzb25zIC8gQXJjaGVyXCIsXCJXb3JsZCBUcmFkZSBDZW50ZXJcIl0sXHJcbiAgICAgICAgICAgIEY6W1wiSmFtYWljYSAtIDE3OXRoIFN0XCIsXCJDb25leSBJc2xhbmQgLSBTdGlsbHdlbGwgQXZcIl0sXHJcbiAgICAgICAgICAgIEc6W1wiTG9uZyBJc2xhbmQgQ2l0eSAtIENvdXJ0IFNxXCIsXCJDaHVyY2ggQXZlXCJdLFxyXG4gICAgICAgICAgICBKOltcIkphbWFpY2EgQ3RyIC0gUGFyc29ucyAvIEFyY2hlclwiLFwiQnJvYWQgU3RcIl0sXHJcbiAgICAgICAgICAgIEw6W1wiMTQgU3RyZWV0IC8gOCBBdlwiLFwiQ2FuYXJzaWUgLSBSb2NrYXdheSBQa3d5XCJdLFxyXG4gICAgICAgICAgICBNOltcIkZvcmVzdCBIaWxscyAtIDcxc3QgQXZcIixcIk1pZGRsZSBWaWxsYWdlIC0gTWV0cm9wb2xpdGFuIEF2ZVwiXSxcclxuICAgICAgICAgICAgTjpbXCJBc3RvcmlhIC0gRGl0bWFycyBCbHZkXCIsXCJDb25leSBJc2xhbmQgLSBTdGlsbHdlbGwgQXZcIl0sXHJcbiAgICAgICAgICAgIFE6W1wiOTZ0aCBTdFwiLFwiQ29uZXkgSXNsYW5kIC0gU3RpbGx3ZWxsIEF2XCJdLFxyXG4gICAgICAgICAgICBSOltcIkZvcmVzdCBIaWxscyAtIDcxc3QgQXZcIixcIkJheSBSaWRnZSAtIDk1dGggU3RcIl0sXHJcbiAgICAgICAgICAgIC8vIFM6W1wiXCIsXCJcIl0sICBT7ISg7J2AIOyVveqwhCDshZTti4DqsJnsnYDsnpDsi53snoRcclxuICAgICAgICAgICAgVzpbXCJBc3RvcmlhIC0gRGl0bWFycyBCbHZkXCIsXCJXaGl0ZWhhbGwgU3RcIl0sXHJcbiAgICAgICAgICAgIFo6W1wiSmFtYWljYSBDdHIgLSBQYXJzb25zIC8gQXJjaGVyXCIsXCJCcm9hZCBTdFwiXVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihkYXRhLCBjaWQpe1xyXG4gICAgICAgIGxldCBzcG90cyA9IGRhdGEuc3BvdHMucmFua2VkO1xyXG4gICAgICAgIGxldCBtYXggPSBzcG90cy5sZW5ndGg7XHJcbiAgICAgICAgaWYobWF4Pjk5KXtcclxuICAgICAgICAgICAgbWF4ID0gOTk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWV0cm9zID0gZGF0YS5sb2NhbC5tZXRybztcclxuICAgICAgICBsZXQgbWV0cm9MaW5lID0ge307XHJcbiAgICAgICAgbGV0IHRlbXBMaW5lID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWV0cm9zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRybyA9IG1ldHJvc1tqXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBoYXNTcG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IHNwb3RzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IDYwMDtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRGlmID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihzcG90LmVudGVyYW5jZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzcG90LmVudGVyYW5jZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW50ID0gc3BvdC5lbnRlcmFuY2Vba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEaWYgPSBjYWxjdWxhdGVEaWYoZW50LCBtZXRyby5jb29yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGVtcERpZjxkaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmID0gdGVtcERpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Nwb3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBEaWYgPSBjYWxjdWxhdGVEaWYoc3BvdC5jb29yLCBtZXRyby5jb29yKTtcclxuICAgICAgICAgICAgICAgIGlmKHRlbXBEaWY8ZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICBkaWYgPSB0ZW1wRGlmO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1Nwb3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGhhc1Nwb3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWV0cm8ubGluZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IG1ldHJvLmxpbmVba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF0ZW1wTGluZVtsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVtsaW5lXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRlbXBMaW5lW2xpbmVdW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZiA8IHRlbXBMaW5lW2xpbmVdW2ldLmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVbbGluZV1baV0gPSB7Y29vcjpzcG90LmNvb3IsIHJhbms6aSwgbmFtZTpzcG90Lm5hbWUsIGRpZjpkaWYsIHN0bjp7Y29vcjptZXRyby5jb29yLCBuYW1lOm1ldHJvLm5hbWV9fTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVbbGluZV1baV0gPSB7Y29vcjpzcG90LmNvb3IsIHJhbms6aSwgbmFtZTpzcG90Lm5hbWUsIGRpZjpkaWYsIHN0bjp7Y29vcjptZXRyby5jb29yLCBuYW1lOm1ldHJvLm5hbWV9fTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgbGluZSBpbiB0ZW1wTGluZSkge1xyXG4gICAgICAgICAgICAgICAgbWV0cm9MaW5lW2xpbmVdID0ge3Nwb3Q6W10sc3RuOltdfTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciByYW5rIGluIHRlbXBMaW5lW2xpbmVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9MaW5lW2xpbmVdLnNwb3QucHVzaCh0ZW1wTGluZVtsaW5lXVtyYW5rXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWV0cm9zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRybyA9IG1ldHJvc1tqXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXRyby5saW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGluZSA9IG1ldHJvLmxpbmVbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobWV0cm9MaW5lW2xpbmVdKXtcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb0xpbmVbbGluZV0uc3RuLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb29yOm1ldHJvLmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6bWV0cm8ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9MaW5lW2xpbmVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcG90OltdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG46W3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6bWV0cm8uY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6bWV0cm8ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tZXRyb0xpbmUgPSBtZXRyb0xpbmU7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZXRyb0xpbmU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvY2l0eS9tZXRyb0xpbmUuanMiLCJpbXBvcnQgRmlyc3RfY2hlY2sgZnJvbSBcIi4vc3BvdC9maXJzdF9jaGVjay5qc1wiO1xyXG5pbXBvcnQgU2Vjb25kX2NvbWJpbmUgZnJvbSBcIi4vc3BvdC9zZW9uZF9jb21iaW5lLmpzXCI7XHJcbmltcG9ydCBUaGlyZF9maW5hbGl6ZSBmcm9tIFwiLi9zcG90L3RoaXJkX2ZpbmFsaXplLmpzXCI7XHJcblxyXG52YXIgU3BvdCA9IHtcclxuICAgIGNpdGllczoge30sXHJcbiAgICBvcmRlcjpcIlwiLFxyXG4gICAgZGF0YToge30sXHJcbiAgICBjdXJyZW50OlwiXCIsIC8v7ZiE7J6sIOuztOqzoOyeiOuKlCDrj4Tsi5wgY2lkIC0gZmlyZWJhc2UgcmVm7JeQIG9mZiDri6zquLDsnITtlbRcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodV9pKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgRmlyc3RfY2hlY2suaW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLm9yZGVyID0gdV9pLnNldHRpbmcub3JkZXI7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgdGhhdC5jaXRpZXMgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGF0Lm9yZGVyID0gdV9pLnNldHRpbmcub3JkZXI7XHJcbiAgICAgICAgICAgIHRoYXQuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9zdGF0dXMoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuYWN0aXZlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHRoYXQuY2l0aWVzW2NpZF0uc3RhdHVzLnNwb3Q7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIHN0YXR1cyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLm9yZGVyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5vcmRlciA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG4gICAgICAgICAgICB2YXIgdWlkID0gdV9pLm1haWw7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCd1c2Vycy8nICsgdWlkICsgXCIvc2V0dGluZy9vcmRlclwiKS5zZXQodGhhdC5vcmRlcik7XHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9zdGF0dXMoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIucmV0dXJuXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX3N0YXR1cygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLzLssKjqsoDspp1cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5yZW1vdmVfc3BvdFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBUaGlyZF9maW5hbGl6ZS5yZW1vdmVfc3BvdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIucmVkb19yZW1vdmVcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgVGhpcmRfZmluYWxpemUucmVkb19yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfc3RhdHVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5kYXRhO1xyXG5cclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzxoMj7qtIDqtJHsp4Ag642w7J207YSwIOygleumrCDtmITtmak8L2gyPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cIm9yZGVyXCIgaWQ9XCJhYmNcIj7qsIDrgpjri6TsiJw8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwib3JkZXJcIiBpZD1cImNoYW5nZWRcIj7siJjsoJXsi5zqsITsiJw8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwid3JhcHBlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwibGluZXIgbGluZXItLWhlYWRlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaXR5TmFtZVwiPuuPhOyLnOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+7IOB7YOcPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaGFyZ2VcIj7ri7Tri7nsnpA8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIHZhciBvcmRlckFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXIgPT09IFwiYWJjXCIpIHtcclxuICAgICAgICAgICAgICAgIG9yZGVyQXJyYXkucHVzaCh7IGNpZDogY2lkLCBpZHg6IGNpdHkubmFtZSB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9yZGVyID09PSBcImNoYW5nZWRcIikge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJBcnJheS5wdXNoKHsgY2lkOiBjaWQsIGlkeDogY2l0eS5vcmRlci5jaGFuZ2VkIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcmRlckFycmF5LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuaWR4ID4gYi5pZHggPyAxIDogYS5pZHggPCBiLmlkeCA/IC0xIDogMDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXR1c0FycmF5ID0gW1xyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3Bhbj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuPuyZhOujjDwvc3Bhbj48L3A+JyxcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuPuyZhOujjDwvc3Bhbj48L3A+JyxcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7smYTro4w8L3NwYW4+PC9wPidcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9yZGVyQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNpZCA9IG9yZGVyQXJyYXlbaV0uY2lkO1xyXG4gICAgICAgICAgICBsZXQgY2l0eSA9IGRhdGFbY2lkXTtcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImxpbmVyXCIgaWQ9XCInICsgY2lkICsgJ1wiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJsaW5lcl9fY2l0eU5hbWVcIj4nICsgY2l0eS5uYW1lICsgJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gc3RhdHVzQXJyYXlbY2l0eS5zdGF0dXMuc3BvdF07XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJsaW5lcl9fY2hhcmdlXCI+64u064u57J6QPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nOy8vd3JhcHBlciDri6vquLBcclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5zcG90XCIpLmh0bWwodHh0KTtcclxuICAgICAgICAkKFwiI1wiICsgdGhpcy5vcmRlcikuYWRkQ2xhc3MoXCJvcmRlci0tc2VsZWN0ZWRcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfY2l0eTogZnVuY3Rpb24gKGNpZCwgc3RhdHVzKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIHRoYXQuY3VycmVudCkub2ZmKFwidmFsdWVcIik7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCkub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50ID0gY2lkO1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNpdHlOYW1lID0gdGhhdC5jaXRpZXNbY2lkXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gMSkgeyAgIC8v7ZiE7J6sIOygleuztOyImOynkeyDge2DnCDqsoDspp1cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmhlYWRlclwiKS5odG1sKCc8aDI+JyArIGNpdHlOYW1lICsgJyDsoJXrs7TqsoDspp08L2gyPicpLmF0dHIoJ2NpZCcsIGNpZCkuYXR0cignY2l0eU5hbWUnLGNpdHlOYW1lKS5hZGRDbGFzcyhcImNpdHlOYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEZpcnN0X2NoZWNrLmluZmxhdGUoZGF0YS5zcG90cyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gMikgeyAvL+2Vqey5mOq4sOyekeyXhVxyXG4gICAgICAgICAgICAgICAgICAgIFNlY29uZF9jb21iaW5lLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAvLzLssKjqsoDspp3tmZTrqbTqs7wg7JmE66OM7ZmU66m07J2AIOuUsOuhnCDssKjsnbTqsIAg7JeG7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuaHRtbCgnPGgyPicgKyBjaXR5TmFtZSArICcgMuywqOqygOymnTwvaDI+JykuYXR0cignY2lkJywgY2lkKS5hdHRyKCdjaXR5TmFtZScsY2l0eU5hbWUpLmFkZENsYXNzKFwiY2l0eU5hbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgVGhpcmRfZmluYWxpemUuaW5mbGF0ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgn7JWE66y065+wIOuNsOydtO2EsOqwgCDsl4bsirXri4jri6QuIOuNsOydtO2EsCDsiJjsp5HsnYQg66i87KCAIOynhO2Wie2VtOyjvOyEuOyalC4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLm5hdl9faXRlbVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ25hdl9faXRlbS0taGFzRHJhd2VyJykpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIHRoYXQuY3VycmVudCkub2ZmKFwidmFsdWVcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIubmF2X19kcmF3ZXJfX2l0ZW0gXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuYXR0cignaWQnKSA9PT0gJ25hdl9zcG90Jykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIHRoYXQuY3VycmVudCkub2ZmKFwidmFsdWVcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcG90O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QuanMiLCJpbXBvcnQgQXV0b0NvbWJpbmUgZnJvbSAnLi9hdXRvQ29tYmluZS5qcyc7XHJcblxyXG52YXIgRmlyc3RfQ2hlY2sgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0UmVtYWluTnVtYmVyKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19yZW1haW5OdW1iZXJcIikudmFsKCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fbm9kYXRhXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNpZCA9ICQodGhpcykuYXR0cignc2lkJyk7XHJcbiAgICAgICAgICAgIHRoYXQuc2l0ZU5vZGF0YShzaWQpO1xyXG4gICAgICAgICAgICB0b2FzdCgn642w7J207YSwIOqzteuwsSDsspjrpqwnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/sooztkZwg7JeG64qUIOq0gOq0keyngOydmCDsooztkZzrpbwg7J6F66Cl7ZWoXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3Nwb3REZWxldGVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmRlbGV0ZVNwb3QoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIiksICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIuY2hlY2tfX3Nwb3ROYW1lXCIpLmh0bWwoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v7KKM7ZGcIOyXhuuKlCDqtIDqtJHsp4DsnZgg7KKM7ZGc66W8IOyeheugpe2VqFxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19jb25maXJtXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5pbnB1dENvb3JkaW5hdGUoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIiksICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIuY2hlY2tfX3Nwb3RDb29yXCIpLnZhbCgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgc2l0ZU5vZGF0YTogZnVuY3Rpb24gKHNpZCkge1xyXG4gICAgICAgIHZhciBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlybShcIuuNsOydtO2EsOulvCDsoJXrp5Ag7JeG7JWx64uI6rmMIT9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpZCArIFwiL25vZGF0YVwiKS5zZXQodHJ1ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFJlbWFpbk51bWJlcjogZnVuY3Rpb24gKHNpdGUsIG51bWJlcikge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBjdXRObyA9IG51bWJlci50cmltKCkgKiAxO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSk7XHJcblxyXG4gICAgICAgIGlmIChjdXRObyA8IDEwMCkge1xyXG4gICAgICAgICAgICB0b2FzdChcIjEwMOqwnCDsnbTsg4HsnZgg7J6l7IaM66W8IOycoOyngO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShcIuyInOychCBcIiArIGN1dE5vICsgXCLsnIQg66+466eMIOyepeyGjOulvCDrqqjrkZAg7KCc6rGw7ZWp64uI64ukLiDrp57sirXri4jquYw/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3V0T2JqID0gdGhpcy5kYXRhLnNwb3RzW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgY3V0T2JqLmxlbmd0aCA9IGN1dE5vO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSkuc2V0KGN1dE9iaik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZVNwb3Q6IGZ1bmN0aW9uIChzaWQsIG5hbWUpIHtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgc2l0ZSA9IHNpZC5zcGxpdChcIl9cIilbMF07XHJcbiAgICAgICAgbGV0IG5vID0gc2lkLnNwbGl0KFwiX1wiKVsxXTtcclxuXHJcbiAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpcm0obmFtZSArIFwiIOyepeyGjOulvCDsoJzqsbDtlanri4jri6QuIOqzhOyGje2VoOq5jOyalD9cIikpIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSArIFwiL1wiICsgbm8pLnNldCh7IGRlbGV0ZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiICsgc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7J6l7IaM6rCAIOygnOqxsOuQmOyXiOyKteuLiOuLpC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYgKGNvbmZpcm0obm8gKyBcIuuyiCDsnqXshozrpbwg7KCc6rGw7ZWp64uI64ukLiDqs4Tsho3tlaDquYzsmpQ/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUgKyBcIi9cIiArIG5vKS5zZXQoeyBkZWxldGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgJChcIiNcIiArIHNpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyepeyGjOqwgCDsoJzqsbDrkJjsl4jsirXri4jri6QuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dENvb3JkaW5hdGU6IGZ1bmN0aW9uIChzaWQsIGNvb3JUeHQpIHtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgc2l0ZSA9IHNpZC5zcGxpdChcIl9cIilbMF07XHJcbiAgICAgICAgbGV0IG5vID0gc2lkLnNwbGl0KFwiX1wiKVsxXTtcclxuICAgICAgICBsZXQgY29vciA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoY29vclR4dC5zcGxpdChcIixcIikubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXQgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVswXS50cmltKCkgKiAxO1xyXG4gICAgICAgICAgICBsZXQgbG5nID0gY29vclR4dC5zcGxpdChcIixcIilbMV0udHJpbSgpICogMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc05hTihsYXQpIHx8IGlzTmFOKGxuZykpIHtcclxuICAgICAgICAgICAgICAgIC8v7KKM7ZGcIOykkSDtlZjrgpjqsIBcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOu2gOygle2Zle2VmOqyjCDsnoXroKXrkJjsl4jsirXri4jri6RcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb29yID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogbGF0LFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzogbG5nXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg7J6F66Cl65CY7JeI7Iq164uI64ukXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNcIiArIHNpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUgKyBcIi9cIiArIG5vICsgXCIvY29vclwiKS5zZXQoY29vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0b2FzdChcIuyijO2RnOqwgCDrtoDsoJXtmZXtlZjqsowg7J6F66Cl65CY7JeI7Iq164uI64ukXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5oZWFkZXJcIikuYXBwZW5kKCc8cCBjbGFzcz1cInJldHVyblwiPuuPjOyVhOqwgOq4sDwvcD4nKTtcclxuXHJcbiAgICAgICAgbGV0IGhhc1Byb2JsZW0gPSBmYWxzZTtcclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcbiAgICAgICAgbGV0IHNlYXJjaFVybCA9ICdodHRwczovL3d3dy5nb29nbGUuY28ua3IvbWFwcy9wbGFjZS8nICsgJChcIi5jaXR5TmFtZVwiKS5hdHRyKCdjaXR5TmFtZScpICsgXCIrXCI7XHJcblxyXG4gICAgICAgIGxldCBzaXRlT2JqID0ge1xyXG4gICAgICAgICAgICBnZzogXCLqtazquIBcIixcclxuICAgICAgICAgICAgbnY6IFwi64Sk7J2067KEXCIsXHJcbiAgICAgICAgICAgIHRhOiBcIu2KuOumveyWtOuTnOuwlOydtOyggFwiLFxyXG4gICAgICAgICAgICBscDogXCLroaDrpqztlIzrnpjri5tcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIHNpdGUgaW4gc2l0ZU9iaikge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNpdGVIYXNQcm9ibGVtID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vQ29vclR4dCA9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZVwiPuyijO2RnOqwgCDsnoXroKXrkJjsp4Ag7JWK7J2AIOq0gOq0keyngOqwgCDsnojsirXri4jri6Q8L3A+JztcclxuICAgICAgICAgICAgbGV0IG5vU3BvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9TcG90VHh0ID0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+67mE7Ja07J6I64qUIOq0gOq0keyngOqwgCDsnojsirXri4jri6Q8L3A+JztcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3RpdGxlXCI+JyArIHNpdGVPYmpbc2l0ZV0gKyAnIOuNsOydtO2EsCDtmZXsnbg8L3A+JztcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YVtzaXRlXS5ub2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbc2l0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBkYXRhW3NpdGVdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc0Nvb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QuZGVsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v7J2867aA65+sIOyCreygnO2VnCDqtIDqtJHsp4AgLT4g64SY7Ja06rCE64ukXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmNvb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QuY29vci5sbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc05hTihzcG90LmNvb3IubG5nICogMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmNvb3IubGF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oc3BvdC5jb29yLmxhdCAqIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNDb29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdfJyArIGkgKyAnXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8YSBjbGFzcz1cImNoZWNrX19zcG90TmFtZVwiIGhyZWY9XCInICsgc2VhcmNoVXJsICsgc3BvdC5uYW1lICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBzcG90Lm5hbWUgKyAnPC9hPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCArPSAnPGlucHV0IGNsYXNzPVwiY2hlY2tfX3Nwb3RDb29yXCIgcGxhY2Vob2xkZXI9XCJ4eC54eHh4eCwgeHgueHh4eHgg7ZiV7YOcIOyeheugpVwiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fY29uZmlybVwiPuyijO2RnCDsnoXroKU8L3A+PHAgY2xhc3M9XCJjaGVja19fc3BvdERlbGV0ZVwiPuyepeyGjCDsgq3soJw8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZUhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQgKz0gJzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJyArIHNpdGUgKyAnXycgKyBpICsgJ1wiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3R4dFwiPicgKyBpICsgJyDrsogg6rSA6rSR7KeAPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3Nwb3REZWxldGVcIj7snqXshowg7IKt7KCcPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub0Nvb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vQ29vclR4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vU3BvdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gbm9TcG90VHh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0ubGVuZ3RoID4gMTUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXJnZU9LID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGFyZ2VEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sYXJnZURhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzE1MOqwnCDsnbTsg4HsnZgg642w7J207YSw66W8IOuztOycoO2VmOugpOuptCDrj4Tsi5zrqoUvc3BvdHMvbGFyZ2VEYXRhL+yCrOydtO2KuOuqheydtCB0cnVl65286rOgIOu2gOyXrOuQmOyWtOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFyZ2VPSyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFyZ2VPSyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxhcmdlT0spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZUhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZVwiPicgKyBzaXRlT2JqW3NpdGVdICsgJyDsnqXshowg642w7J207YSw6rCAIDE1MOqwnOulvCDstIjqs7woJyArIGRhdGFbc2l0ZV0ubGVuZ3RoICsgJ+qwnCntlanri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJyArIHNpdGUgKyAnXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPGlucHV0IGNsYXNzPVwiY2hlY2tfX3JlbWFpbk51bWJlclwiIHZhbHVlPVwiJyArIGRhdGFbc2l0ZV0ubGVuZ3RoICsgJ1wiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiPuqwnOydmCDsnqXshowg7Jyg7KeA7ZWY6riwPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3RpdGxlXCI+JyArIHNpdGVPYmpbc2l0ZV0gKyAnIOuNsOydtO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZSBjaGVja19fbm9kYXRhXCIgc2lkPVwiJyArIHNpdGUgKyAnXCI+642w7J207YSw6rCAIOybkOuemCDsl4bsnYQg6rK97JqwIO2BtOumre2VtOyjvOyEuOyapTwvcD4nO1xyXG4gICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzog7JuQ656YIOyCrOydtO2KuCDrjbDsnbTthLDqsIAg7KG07J6s7ZWY7KeAIOyViuuKlCDqsr3smrDrpbwg64yA67mE7ZWcIOuyhO2KvOydhCDrp4zrk6Tqs6Agc2l0ZSDqsJLsnLzroZwgbm9kYXRhOiB0cnVl66W8IOuEo+yWtOykgOuLpC5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNpdGVIYXNQcm9ibGVtKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+67Cc6rKs65CcIOusuOygnOqwgCDsl4bsirXri4jri6Q8L3A+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhhc1Byb2JsZW0pIHtcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19maW5pc2hcIj7qsoDsgqzrpbwg66qo65GQIOuniOyzpOyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICAkKFwiLnNwb3QgLndyYXBwZXJcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoJ2NpZCcpO1xyXG4gICAgICAgICAgICB0b2FzdChcIuuwnOqyrOuQnCDrrLjsoJzqsIAg7JeG7Ja0IOuNsOydtO2EsCDrs5HtlansnYQg7Iuk7Iuc7ZWp64uI64ukLlwiKTtcclxuXHJcbiAgICAgICAgICAgIEF1dG9Db21iaW5lLmluaXQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLndyYXBcIikuc2Nyb2xsVG9wKDApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaXJzdF9DaGVjaztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2ZpcnN0X2NoZWNrLmpzIiwiLy9maXJzdF9jaGVja+yXkOyEnOunjCBpbXBvcnRlZCDrkJjqs6Ag7IKs7Jqp65CoXHJcblxyXG52YXIgQXV0b0NvbWJpbmUgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICBsZXQgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlQXJyID0gW1wiZ2dcIiwgXCJscFwiLCBcIm52XCIsIFwidGFcIl07XHJcbiAgICAgICAgbGV0IGNvbWJpbmluZyA9IHt9O1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXRlQXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBzaXRlID0gc2l0ZUFycltqXTtcclxuICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdLm5vRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtzaXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtzaXRlXVtpXSAmJiAhZGF0YVtzaXRlXVtpXS5kZWxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2xkU3BvdCA9IGRhdGFbc2l0ZV1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+q4sOyhtCDsoJXrs7Trpbwgb2xkU3BvdOydtOudvOqzoCDtlZjsnpAuIOyDiOuhnOyatCDsiqTtjJ/soJXrs7Tsl5DripQg7J2066aE7J2EIO2VnC/smIHsnLzroZwg67aE7ZWg7ZWY6rOgIOuere2CueydhCDrtoDsl6ztlaAg6rKD7J2064ukLlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcG90ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga286IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yOiBvbGRTcG90LmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuazoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvW+qwgC3tnqNdLy50ZXN0KG9sZFNwb3QubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm5hbWUua28gPSBvbGRTcG90Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5lbiA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QucmFua1tzaXRlXSA9IGk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFNwb3QudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC51cmwgPSBvbGRTcG90LnVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRTcG90LnRhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudGFnID0gb2xkU3BvdC50YWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmluZ1tcInMwMFwiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudGVyIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczBcIiArIGNvdW50ZXJdID0gc3BvdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wic1wiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IC8v7ZWc67CU7YC0IOuPjOyVmOuLuVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBjb21iaW5lT2JqID0ge31cclxuICAgICAgICBsZXQgY29tYmluZWQgPSB7fVxyXG5cclxuICAgICAgICBmb3IgKHZhciBjb2RlIGluIGNvbWJpbmluZykge1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IGNvbWJpbmluZ1tjb2RlXTtcclxuICAgICAgICAgICAgY29tYmluZU9ialtjb2RlXSA9IHNwb3RcclxuICAgICAgICAgICAgY29tYmluZU9ialtjb2RlXS5jb21iaW5lID0ge307XHJcbiAgICAgICAgICAgIGxldCBoYXNDb21iaW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL+2Vqey5oCDqsoPsnbQg7JeG7Jy866m0IOuwlOuhnCBjb21iaW5lZCDsqr3snLzroZwg67O064K464ukLlxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgdENvZGUgaW4gY29tYmluaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29kZSA8IHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRTcG90ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbWJpbmluZ1t0Q29kZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdFNwb3Rba2V5XSA9IGNvbWJpbmluZ1t0Q29kZV1ba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRTcG90LmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGNhbGN1bGF0ZURpZihzcG90LmNvb3IsIHRTcG90LmNvb3IpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMjUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmVbdENvZGVdID0gdFNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb21iaW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaGFzQ29tYmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbWJpbmVkW2NvZGVdID0gY29tYmluZU9ialtjb2RlXTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb21iaW5lT2JqW2NvZGVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaWQgKyBcIi9zcG90c1wiKS5zZXQoe1xyXG4gICAgICAgICAgICBjb21iaW5pbmc6IGNvbWJpbmVPYmosXHJcbiAgICAgICAgICAgIGNvbWJpbmVkOiBjb21iaW5lZFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcy8nICsgY2lkICsgJy9zdGF0dXMvc3BvdCcpLnNldCgxKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXV0b0NvbWJpbmU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9hdXRvQ29tYmluZS5qcyIsInZhciBTZWNvbmRfY29tYmluZSA9IHtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWNvbmRfY29tYmluZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L3Nlb25kX2NvbWJpbmUuanMiLCJpbXBvcnQgQ29uZmlnIGZyb20gXCIuL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFRoaXJkX2ZpbmFsaXplID0ge1xyXG4gICAgdGVtcDpmYWxzZSxcclxuICAgIHNwb3RPYmo6e30sXHJcblxyXG4gICAgcmVtb3ZlX3Nwb3Q6IGZ1bmN0aW9uKHNpZCl7XHJcbiAgICAgICAgbGV0IGNpZCA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgc3BvdE5hbWUgPSAkKFwiI1wiK3NpZCkuY2hpbGRyZW4oXCIucmVzdWx0X25hbWVfa29cIikudmFsKCk7XHJcbiAgICAgICAgaWYoY29uZmlybShgJHtzcG90TmFtZX0g6rSA6rSR7KeA66W8IOygnOqxsO2VqeuLiOuLpC4g7ZmV7Iuk7ZWc6rCA7JqUP2ApKXtcclxuICAgICAgICAgICAgdGhpcy50ZW1wID0gdGhpcy5zcG90T2JqW3NpZF07XHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaWQrXCIvc3BvdHMvY29tYmluZWQvXCIrc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdG9hc3QoXCLqtIDqtJHsp4DqsIAg7KCc6rGw65CY7JeI7Iq164uI64ukLlwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZWRvX3JlbW92ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaWQgPSB0aGlzLnRlbXAuc2lkO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpZCtcIi9zcG90cy9jb21iaW5lZC9cIitzaWQpLnNldCh0aGlzLnRlbXApO1xyXG4gICAgICAgICQoXCIucmVkb19yZW1vdmVcIikucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGVtcCA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgbGV0IGNpZCA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICAkKFwiLmhlYWRlclwiKS5hcHBlbmQoJzxwIGNsYXNzPVwicmV0dXJuXCI+64+M7JWE6rCA6riwPC9wPicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMudGVtcCl7XHJcbiAgICAgICAgICAgICQoXCIuaGVhZGVyXCIpLmFwcGVuZCgnPHAgY2xhc3M9XCJyZWRvX3JlbW92ZVwiPuuniOyngOuniSDsoJzqsbAg7Leo7IaMPC9wPicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNwb3RPYmogPSBkYXRhLnNwb3RzLmNvbWJpbmVkO1xyXG4gICAgICAgIHRoaXMuc3BvdE9iaiA9IHNwb3RPYmo7XHJcbiAgICAgICAgbGV0IHJhbmtBcnIgPSBbXTtcclxuICAgICAgICBsZXQgc3BvdFRvdGFsID0gT2JqZWN0LmtleXMoc3BvdE9iaikubGVuZ3RoO1xyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgc2lkIGluIHNwb3RPYmopIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSBzcG90T2JqW3NpZF07XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5kaXZpZHVhbEFyciA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgc2l0ZSBpbiBzcG90LnJhbmspIHtcclxuICAgICAgICAgICAgICAgIGxldCByYW5rID0gc3BvdC5yYW5rW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEFyci5wdXNoKHJhbmspO1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgLT0gcmFuaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5kaXZpZHVhbEFyci5zb3J0KChhLCBiKSA9PiBhIC0gYik7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWluUmFuayA9IGluZGl2aWR1YWxBcnJbMF07XHJcbiAgICAgICAgICAgIHNjb3JlICs9IChzcG90VG90YWwgKyAxMDAgLSBtaW5SYW5rKSpNYXRoLnNxcnQoTWF0aC5zcXJ0KHNwb3RUb3RhbCkpO1xyXG4gICAgICAgICAgICBzY29yZSAtPSBtaW5SYW5rO1xyXG5cclxuICAgICAgICAgICAgaWYoaW5kaXZpZHVhbEFyci5sZW5ndGggPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgLT0gc3BvdFRvdGFsLzI7XHJcbiAgICAgICAgICAgICAgICBzY29yZSAtPSBtaW5SYW5rO1xyXG4gICAgICAgICAgICAgICAgaWYoc3BvdC5yYW5rLm52KXtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZSArPSA1MDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYoaW5kaXZpZHVhbEFyci5sZW5ndGggPT09IDMpe1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gKHNwb3RUb3RhbCAtIG1pblJhbmspO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihpbmRpdmlkdWFsQXJyLmxlbmd0aCA9PT0gNCl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSBzcG90VG90YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJhbmtBcnIucHVzaCh7c2lkOnNpZCwgc2NvcmU6c2NvcmV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhbmtBcnIuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmtBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpZCA9IHJhbmtBcnJbaV0uc2lkO1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IHNwb3RPYmpbc2lkXTtcclxuICAgICAgICAgICAgbGV0IHVybCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmKHNwb3QudXJsKXtcclxuICAgICAgICAgICAgICAgIHVybCA9IHNwb3QudXJsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByYW5raW5nID0ge1xyXG4gICAgICAgICAgICAgICAgZ2c6XCJcIixcclxuICAgICAgICAgICAgICAgIG52OlwiXCIsXHJcbiAgICAgICAgICAgICAgICBscDpcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGE6XCJcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzaXRlIGluIHNwb3QucmFuaykge1xyXG4gICAgICAgICAgICAgICAgcmFua2luZ1tzaXRlXSA9IHNwb3QucmFua1tzaXRlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cInJlc3VsdF9ib3hcIiBpZD1cIicrc2lkKydcIj48cCBjbGFzcz1cInJlc3VsdF9yYW5rXCI+JysoaSsxKSsnPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICc8aW5wdXQgY2xhc3M9XCJyZXN1bHRfbmFtZV9rb1wiIHZhbHVlPVwiJytzcG90Lm5hbWUua28rJ1wiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICc8aW5wdXQgY2xhc3M9XCJyZXN1bHRfbmFtZV9lblwiIHZhbHVlPVwiJytzcG90Lm5hbWUuZW4rJ1wiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICc8aW5wdXQgY2xhc3M9XCJyZXN1bHRfdXJsXCIgdmFsdWU9XCInK3VybCsnXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X2dnXCI+JytyYW5raW5nLmdnKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X252XCI+JytyYW5raW5nLm52Kyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X2xwXCI+JytyYW5raW5nLmxwKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X3RhXCI+JytyYW5raW5nLnRhKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X3NhdmUgc2F2ZV9zcG90XCI+7KCA7J6lPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInJlc3VsdF9yZW1vdmUgcmVtb3ZlX3Nwb3RcIj7sgq3soJw8L3A+PC9kaXY+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIucGFnZXMuc3BvdCAud3JhcHBlclwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgICAgIGxldCBwdXNoQXJyID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYW5rQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHB1c2hBcnIucHVzaChzcG90T2JqW3JhbmtBcnJbaV0uc2lkXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpZCtcIi9zcG90cy9yYW5rZWRcIikuc2V0KHB1c2hBcnIpO1xyXG5cclxuICAgfVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBUaGlyZF9maW5hbGl6ZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L3RoaXJkX2ZpbmFsaXplLmpzIiwidmFyIENvbmZpZyA9IHtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9jb25maWcuanMiLCJsZXQgQWNjb3VudCA9IHtcclxuICAgIHVzZXI6IHt9LFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgaWQ9XCJhY2NvdW50Q2FsZW5kYXJcIiBjbGFzcz1cImFjY291bnRfX2NhbGVuZGFyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIuYWNjb3VudFwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgdWlkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1aWQgIT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyW3VpZF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGRhdGFbdWlkXS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKCcjYWNjb3VudENhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNTY0LFxyXG4gICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICB2aWV3UmVuZGVyOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF5Q2xpY2s6IGZ1bmN0aW9uIChkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGUoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9hY2NvdW50LmpzIiwibGV0IFN1YndheSA9IHtcclxuICAgIG1hcDp7fSxcclxuICAgIG1hcmtlcjpmYWxzZSxcclxuICAgIG1ldHJvOltdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieWxvXCIpXHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL255Yy9tZXRyb1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQubWV0cm8gPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJ3YXlNYXAnKSwge1xyXG4gICAgICAgICAgICAgICAgY2VudGVyOiB7IGxhdDogNDAuNzQ4NDQsIGxuZzogLTczLjk4NTY2IH0sXHJcbiAgICAgICAgICAgICAgICB6b29tOiAxMyxcclxuICAgICAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNjYWxlQ29udHJvbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW5Db250cm9sOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWFwLmFkZExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kU3Vid2F5KGUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGZpbmRTdWJ3YXk6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGxldCBjb29yID0ge1xyXG4gICAgICAgICAgICBsYXQ6ZS5sYXRMbmcubGF0KCksXHJcbiAgICAgICAgICAgIGxuZzplLmxhdExuZy5sbmcoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5tYXJrZXIpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtlci5zZXRNYXAobnVsbClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBlLmxhdExuZyxcclxuICAgICAgICAgICAgbWFwOiB0aGlzLm1hcFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdHh0ID0gJydcclxuICAgICAgICBsZXQgbWV0cm9JbmZvID0ge31cclxuICAgICAgICBsZXQgbWV0cm9CeVN0biA9IHt9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ3MzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRyb05hbWUgPSB0aGlzLm1ldHJvW2ldLm5hbWU7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGlmID0gTWF0aC5yb3VuZChjYWxjdWxhdGVEaWYoY29vcix0aGlzLm1ldHJvW2ldLmNvb3IpKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGRpZjw3MDApe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLm1ldHJvW2ldLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IHRoaXMubWV0cm9baV0ubGluZVtrXS5zbGljZSgwLDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihtZXRyb0luZm9bbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkaWY8bWV0cm9JbmZvW2xpbmVdLmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0luZm9bbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbWV0cm9OYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0cm9JbmZvW2xpbmVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyb05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihtZXRyb0J5U3RuW21ldHJvTmFtZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldHJvQnlTdG5bbWV0cm9OYW1lXS5saW5lID0gbWV0cm9CeVN0blttZXRyb05hbWVdLmxpbmUuY29uY2F0KHRoaXMubWV0cm9baV0ubGluZSlcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldHJvQnlTdG5bbWV0cm9OYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMubWV0cm9baV0ubGluZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1ldEFycmF5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgbGluZSBpbiBtZXRyb0luZm8pIHtcclxuICAgICAgICAgICAgbWV0QXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBsaW5lOmxpbmUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOm1ldHJvSW5mb1tsaW5lXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgZGlmOm1ldHJvSW5mb1tsaW5lXS5kaWZcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWV0U3RuQXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBuYW1lIGluIG1ldHJvQnlTdG4pIHtcclxuICAgICAgICAgICAgbWV0U3RuQXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBsaW5lOm1ldHJvQnlTdG5bbmFtZV0ubGluZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6bmFtZSxcclxuICAgICAgICAgICAgICAgIGRpZjptZXRyb0J5U3RuW25hbWVdLmRpZlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldEFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmRpZiA+IGIuZGlmID8gMSA6IGEuZGlmIDwgYi5kaWYgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBtZXRTdG5BcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5kaWYgPiBiLmRpZiA/IDEgOiBhLmRpZiA8IGIuZGlmID8gLTEgOiAwO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHR4dCs9JzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX190aXRsZVwiPuyXreuzhDwvcD4nXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fZGl2XCI+J1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0U3RuQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fbGluZVwiPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19zdG5OYW1lXCI+JysgbWV0U3RuQXJyYXlbaV0ubmFtZSArICfsl608L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX2RpZlwiPicrIE1hdGguY2VpbChtZXRTdG5BcnJheVtpXS5kaWYvODApICsgJ+u2hCDqsbDrpqw8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fbGluZUxpbmVcIj4nXHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbWV0U3RuQXJyYXlbaV0ubGluZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgaWYobWV0U3RuQXJyYXlbaV0ubGluZVtrXS5sZW5ndGggPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fbGluZU5hbWUgbG5fJyttZXRTdG5BcnJheVtpXS5saW5lW2tdKydcIj4nK21ldFN0bkFycmF5W2ldLmxpbmVba10gKyAnPC9wPidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQrPSAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3RpdGxlXCI+64W47ISg67OEPC9wPidcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19kaXZcIj4nXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fbGluZU5hbWUgbG5fJyttZXRBcnJheVtpXS5saW5lKydcIj4nK21ldEFycmF5W2ldLmxpbmUgKyAnPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpZlwiPicrIE1hdGguY2VpbChtZXRBcnJheVtpXS5kaWYvODApICsgJ+u2hCDqsbDrpqw8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fc3RuTmFtZVwiPicrIG1ldEFycmF5W2ldLm5hbWUgKyAn7JetPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG4gICAgICAgICQoXCIuc3Vid2F5X19pbmZvXCIpLmh0bWwodHh0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3Vid2F5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zdWJ3YXkuanMiLCJpbXBvcnQgVmlld19NZXRybyBmcm9tIFwiLi92aWV3L21ldHJvLmpzXCI7XHJcblxyXG5sZXQgVmlldyA9IHtcclxuICAgIG1hcDp7fSxcclxuICAgIGRhdGE6e30sXHJcblxyXG4gICAgaW5mbGF0ZUNpdHk6IGZ1bmN0aW9uKGNpZCl7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgVmlld19NZXRyby5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB0b2FzdChcIuuPhOyLnOygleuztCDroZzrlKkg7JmE66OMXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW5lcjpmdW5jdGlvbigpe1xyXG4gICAgICAgICQoXCIudmlld1wiKS5vbihcImNsaWNrXCIsIFwiLm1ldHJvX2Z1bGxcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgVmlld19NZXRyby5mdWxsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi52aWV3XCIpLm9uKFwiY2xpY2tcIiwgXCIubWV0cm9fZGlzYWJsZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBWaWV3X01ldHJvLmRpc2FibGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLnZpZXdcIikub24oXCJjbGlja1wiLCBcIi5tZXRyb19jbGlja1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBWaWV3X01ldHJvLmNsaWNrTW9kZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuaW5mbGF0ZUNpdHkoXCJueWNcIik7XHJcbiAgICAgICAgbGV0IHR4dCA9IFwiXCI7XHJcbiAgICAgICAgdHh0ICs9IFwiPGRpdiBjbGFzcz0nd3JhcHBlcic+XCI7XHJcbiAgICAgICAgdHh0ICs9ICAgICBcIjxkaXYgY2xhc3M9J2xlZnQnIGlkPSdtYXAnPlwiO1xyXG4gICAgICAgIHR4dCArPSAgICAgXCI8L2Rpdj5cIjtcclxuICAgICAgICB0eHQgKz0gICAgIFwiPGRpdiBjbGFzcz0ncmlnaHQnPlwiO1xyXG4gICAgICAgIHR4dCArPSAgICAgICAgICBcIjxkaXYgY2xhc3M9J2hlYWRlcic+PHVsPlwiO1xyXG4gICAgICAgIHR4dCArPSAgICAgICAgICBcIjwvdWw+PC9kaXY+XCI7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgICAgIFwiPGRpdiBjbGFzcz0ndmlld2VyJz48L2Rpdj5cIjtcclxuICAgICAgICB0eHQgKz0gICAgIFwiPC9kaXY+XCI7XHJcbiAgICAgICAgdHh0ICs9IFwiPC9kaXY+XCI7XHJcbiAgICAgICAgJChcIi5wYWdlcy52aWV3XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgbGV0IGhlYWRlciA9IHtcclxuICAgICAgICAgICAgXCLrqZTtirjroZxcIjpbXHJcbiAgICAgICAgICAgICAgICB7a286XCLsp4DsmrDquLBcIiwgZW46XCJtZXRyb19kaXNhYmxlXCJ9LFxyXG4gICAgICAgICAgICAgICAge2tvOlwi7KCE7LK0IOuFuOyEoFwiLCBlbjpcIm1ldHJvX2Z1bGxcIn0sXHJcbiAgICAgICAgICAgICAgICB7a286XCLtlbXsi6wg64W47ISgXCIsIGVuOlwibWV0cm9fY29yZVwifSxcclxuICAgICAgICAgICAgICAgIHtrbzpcIu2BtOumrSDstpTsoIFcIiwgZW46XCJtZXRyb19jbGlja1wifVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIuq0gOq0keyngFwiOltdLFxyXG4gICAgICAgICAgICBcIuu2hOyEnVwiOltdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IGhUeHQgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpdGVtIGluIGhlYWRlcikge1xyXG4gICAgICAgICAgICBoVHh0ICs9ICc8bGkgY2xhc3M9XCJkcm9wZG93blwiPic7XHJcbiAgICAgICAgICAgIGhUeHQgKz0gICAgICc8cCBjbGFzcz1cImRyb3BidG5cIj4nK2l0ZW0rJzwvcD4nO1xyXG4gICAgICAgICAgICBoVHh0ICs9ICAgICAnPGRpdiBjbGFzcz1cImRyb3Bkb3duX19jb250ZW50XCI+JztcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGVyW2l0ZW1dLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBoVHh0ICs9ICAgICAnPHAgY2xhc3M9XCInK2hlYWRlcltpdGVtXVtpXS5lbisnXCI+JytoZWFkZXJbaXRlbV1baV0ua28rJzwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhUeHQgKz0gICAgICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICBoVHh0ICs9ICc8L2xpPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIudmlldyAuaGVhZGVyXCIpLmh0bWwoaFR4dCk7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcclxuICAgICAgICAgICAgY2VudGVyOntsYXQ6NDAuNzUxNixsbmc6LTczLjk4ODd9LFxyXG4gICAgICAgICAgICB6b29tOjEzLFxyXG4gICAgICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgICAgICAgICBzdHlsZXM6W1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUubGFuZF9wYXJjZWxcIixcclxuICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxyXG4gICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLmJ1c2luZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxyXG4gICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLFxyXG4gICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsXHJcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFZpZXdfTWV0cm8ubWFwID0gdGhpcy5tYXA7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWaWV3O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3ZpZXcuanMiLCJsZXQgVmlld19NZXRybyA9IHtcclxuICAgIG1hcDp7fSxcclxuICAgIHBvbHlMaW5lOnt9LFxyXG4gICAgZGF0YTp7fSxcclxuICAgIG1hcmtlclNldDogW10sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBsZXQgbWV0cm9MaW5lID0gZGF0YS5tZXRyb0xpbmU7XHJcbiAgICAgICAgZm9yIChsZXQgbGluZSBpbiBtZXRyb0xpbmUpIHtcclxuICAgICAgICAgICAgaWYobWV0cm9MaW5lW2xpbmVdLnN0bil7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9seUxpbmUgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0cm9MaW5lW2xpbmVdLnN0bi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1ldHJvTGluZVtsaW5lXS5zdG5baV0uY29vcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbHlMaW5lLnB1c2gobWV0cm9MaW5lW2xpbmVdLnN0bltpXS5jb29yKTtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvbHlMaW5lW2xpbmVdID0gbmV3IGdvb2dsZS5tYXBzLlBvbHlsaW5lKHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOnBvbHlMaW5lLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOm1ldHJvTGluZVtsaW5lXS5jb2xvcixcclxuICAgICAgICAgICAgICAgICAgICBzdHJva2VPcGFjaXR5OiAxLjAsXHJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiAyXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZnVsbDogZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0aGlzLm1hcmtlcil7ICAgIC8v6riw7KG0IOuniOy7pCDstIjquLDtmZRcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXIuc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5jbGVhckxpc3RlbmVycyh0aGlzLm1hcCwgJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGxpbmUgaW4gdGhpcy5wb2x5TGluZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvbHlMaW5lW2xpbmVdLnNldE1hcCh0aGlzLm1hcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBkaXNhYmxlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHRoaXMubWFya2VyKXsgICAgLy/quLDsobQg66eI7LukIOy0iOq4sO2ZlFxyXG4gICAgICAgICAgICB0aGlzLm1hcmtlci5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmNsZWFyTGlzdGVuZXJzKHRoaXMubWFwLCAnY2xpY2snKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgbGluZSBpbiB0aGlzLnBvbHlMaW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9seUxpbmVbbGluZV0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tNb2RlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgbGluZSBpbiB0aGlzLnBvbHlMaW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9seUxpbmVbbGluZV0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hcC5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgdGhhdC5maW5kTWV0cm8oZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGZpbmRNZXRybzogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgbGV0IGxpbmVPYmogPSB7fTsgIC8va2V5OuudvOyduOuqhSwgdmFsdWU6e3N0bjpzdGF0aW9uLCBkaWY6ZGlmfVxyXG5cclxuICAgICAgICBsZXQgY2xpY2tDb29yID0ge1xyXG4gICAgICAgICAgICBsYXQ6ZS5sYXRMbmcubGF0KCksXHJcbiAgICAgICAgICAgIGxuZzplLmxhdExuZy5sbmcoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IG1ldHJvcyA9IHRoaXMuZGF0YS5sb2NhbC5tZXRybztcclxuXHJcbiAgICAgICAgaWYodGhpcy5tYXJrZXIpeyAgICAvL+q4sOyhtCDrp4jsu6Qg7LSI6riw7ZmUXHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnNldE1hcChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgbGluZSBpbiB0aGlzLnBvbHlMaW5lKSB7ICAgLy/quLDsobQg6re466Ck7KC47J6I642YIO2PtOumrOudvOyduCDstIjquLDtmZRcclxuICAgICAgICAgICAgdGhpcy5wb2x5TGluZVtsaW5lXS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXJrZXJTZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXJTZXRbaV0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hcmtlclNldCA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogZS5sYXRMbmcsXHJcbiAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXRyb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvID0gbWV0cm9zW2ldO1xyXG4gICAgICAgICAgICBsZXQgZGlmID0gY2FsY3VsYXRlRGlmKGNsaWNrQ29vciwgbWV0cm8uY29vcik7XHJcblxyXG4gICAgICAgICAgICBpZihkaWY8NTAwKXtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWV0cm8ubGluZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gbWV0cm8ubGluZVtqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobGluZU9ialtsaW5lXSl7ICAvL+ydtOuvuCDsnojsnLzrqbQg7Ken7J2AIOqxsOumrOuhnCDsl4XrjbDsnbTtirhcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGlmIDwgbGluZU9ialtsaW5lXS5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZU9ialtsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG46bWV0cm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOmRpZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNleyAvL+yXhuycvOuptCDsg4jroZwg7LaU6rCAXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVPYmpbbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG46bWV0cm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6ZGlmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cIm1ldHJvX19pbmZvXCI+JztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgbGluZSBpbiBsaW5lT2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9seUxpbmVbbGluZV0uc2V0TWFwKHRoaXMubWFwKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdG4gPSBsaW5lT2JqW2xpbmVdLnN0bjtcclxuICAgICAgICAgICAgbGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHN0bi5jb29yLFxyXG4gICAgICAgICAgICAgICAgbWFwOnRoaXMubWFwLFxyXG4gICAgICAgICAgICAgICAgaWNvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IGdvb2dsZS5tYXBzLlN5bWJvbFBhdGguQ0lSQ0xFLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiB0aGlzLmRhdGEubWV0cm9MaW5lW2xpbmVdLmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlOiA3LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVdlaWdodDo1XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cIm1ldHJvX19pbmZvX19saW5lXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJtZXRyb19faW5mb19fbGluZU5hbWVcIiBzdHlsZT1cImJhY2tncm91bmQ6Jyt0aGlzLmRhdGEubWV0cm9MaW5lW2xpbmVdLmNvbG9yKydcIj4nK2xpbmUrJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cIm1ldHJvX19pbmZvX19kaWZcIj4nKyBNYXRoLnJvdW5kKGxpbmVPYmpbbGluZV0uZGlmKSArICdtPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwibWV0cm9fX2luZm9fX3N0bk5hbWVcIj4nKyBzdG4ubmFtZSArICfsl608L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyU2V0LnB1c2gobWFya2VyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi52aWV3IC52aWV3ZXJcIikuaHRtbCh0eHQpO1xyXG5cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpZXdfTWV0cm87XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvdmlldy9tZXRyby5qcyIsImltcG9ydCBTZXRIb3RlbEluZm8gZnJvbSBcIi4vaG90ZWwvc2V0SG90ZWxJbmZvXCI7XHJcbmltcG9ydCBTZXRBcmVhIGZyb20gXCIuL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhXCI7XHJcblxyXG52YXIgSG90ZWwgPSB7XHJcblxyXG5cclxuICAgIC8vaW5mbGF0Ze2VmOuptCDtmLjthZTsnYQg66eM65Ok7Ja064K06riwIOychO2VnCDsoJXrs7Qg7IiY7KeRIOyDge2DnOqwgCDtkZzsi5zrkKggLT4gXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLm9uKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGVfc3RhdHVzKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuc3RhdHVzX19tYWtlX19ob3RlbFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSAkKHRoaXMpLmF0dHIoJ2NpZCcpO1xyXG4gICAgICAgICAgICB2YXIgY2l0eU5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcuc3RhdHVzX19jaXR5JykuaHRtbCgpO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIGNpdHlOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuaG90ZWxfX2FsZXJ0X19jb25maXJtXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChcIi5ob3RlbF9fYWxlcnRfX3dyYXBcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuaG90ZWxcIikub24oXCJjbGlja1wiLCBcIi5jaXR5QXJlYV9fZmluaXNoXCIsIGZ1bmN0aW9uICgpIHsgIC8vc2V0QXJlYeulvCDrgZ3rgrzrlYxcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykuYXR0cignY2lkJyk7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5vbmNlKCd2YWx1ZScsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhW2hpZF0uYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbaGlkXS5hcmVhID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2hpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5zZXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cy9hcmVhJykuc2V0KDIpO1xyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvc3RhdHVzL2FyZWEnKS5zZXQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jaXR5OiBmdW5jdGlvbihjaWQsIGNpdHlOYW1lKXtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgIHZhciBhbGVydE1vZGFsID0gJyc7XHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICBhbGVydE1vZGFsICs9ICAgICAnPGRpdiBjbGFzcz1cImhvdGVsX19hbGVydFwiPic7XHJcblxyXG4gICAgICAgICAgICBpZighZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7qtIDqtJHsp4Ag7KCV67O06rCAIOyVhOyngSDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7tjrjsnZjsi5zshKQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLnNwb3RzKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuc3BvdHMucmFua2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuq0gOq0keyngCDsoJXrs7TqsIAg7JWE7KeBIOygleumrOuQmOyngCDslYrslZjsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+6rSA6rSR7KeAIOygleuztOqwgCDslYTsp4Eg7KCV66as65CY7KeAIOyViuyVmOyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5sb2NhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPu2OuOydmOyLnOyEpCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEubG9jYWwubWV0cm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoIWRhdGEubWV0cm9MaW5lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukKG1ldHJvTGluZSDsl4bsnYwpLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoIWRhdGEuc3RhdHVzLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIFNldEFyZWEuaW5mbGF0ZShjaXR5TmFtZSwgY2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KCfsp4Dsl60g7ISk7KCV7J2EIOuovOyggCDsp4Ttlontlanri4jri6QnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRfX2NvbmZpcm1cIj7tmZXsnbg8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPC9kaXY+PC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIGlmKGNoZWNrKXtcclxuICAgICAgICAgICAgICAgIFNldEhvdGVsSW5mby5pbml0KGRhdGEsIGNpZCwgY2l0eU5hbWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuaG90ZWxcIikuYXBwZW5kKGFsZXJ0TW9kYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfc3RhdHVzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPGgyPuyImeyGjCDrpqzsiqTtirg8L2gyPic7XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cIndyYXBwZXJcIj4nO1xyXG5cclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJzdGF0dXNfX2xpbmVyXCI+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX25hbWVcIj7rj4Tsi5zrqoU8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2VcIj7siJnshowg642w7J207YSwPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19ob3RlbFwiPuq4sOuzuCDtmLjthZTrjbDsnbTthLA8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj7sp4Dsl63soJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj7qtIDqtJHsp4DsoJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX3RyYW5zcG9ydFwiPuuMgOykkeq1kO2GteygleuztDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgY2lkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSBjaXR5LnN0YXR1cztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cInN0YXR1c19fbGluZXJcIj4nO1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19jaXR5XCI+JytjaXR5Lm5hbWUrJzwvcD4nO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHN0YXR1cy5ob3RlbCA9PT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fbWFrZVwiPuyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2Ugc3RhdHVzX19tYWtlX19ob3RlbFwiICBjaWQ9XCInICsgY2l0eS5jb2RlICsgJ1wiPuyXhuydjCAo7YG066at7ZW0IOunjOuTpOq4sCk8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuaG90ZWw+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19ob3RlbFwiPlg8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fYXJlYVwiPk88L3A+JztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy5zcG90ID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy50cmFuc3BvcnQgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3RyYW5zcG9ydFwiPlg8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLmhvdGVsXCIpLmh0bWwodHh0KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvdGVsO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsLmpzIiwiaW1wb3J0IFNldEFUTSBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0QVRNLmpzXCI7XHJcbmltcG9ydCBTZXRGb29kIGZyb20gXCIuL3NldEhvdGVsSW5mby9zZXRGb29kLmpzXCI7XHJcbmltcG9ydCBTZXRNZXRybyBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0TWV0cm8uanNcIjtcclxuaW1wb3J0IFNldFNhZmV0eSBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0U2FmZXR5LmpzXCI7XHJcbmltcG9ydCBTZXRMYXVuZHJ5IGZyb20gXCIuL3NldEhvdGVsSW5mby9zZXRMYXVuZHJ5LmpzXCI7XHJcbmltcG9ydCBTZXRDb252aW5pZW5jZSBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0Q29udmluaWVuY2UuanNcIjtcclxuXHJcblxyXG52YXIgU2V0SG90ZWxJbmZvID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2lkLCBjaXR5TmFtZSl7XHJcbiAgICAgICAgLy9zdGF0dXNDaGVjayDsp4TtlolcclxuICAgICAgICB2YXIgY2hlY2tUeHQgPSAnJztcclxuXHJcbiAgICAgICAgdmFyIGhvdGVsID0gZGF0YS5ob3RlbHNbT2JqZWN0LmtleXMoZGF0YS5ob3RlbHMpWzBdXTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXR1cyA9IHtcclxuICAgICAgICAgICAgbG9jYWw6IHtcclxuICAgICAgICAgICAgICAgIGF0bTogeyAvLzA6IOuNsOydtO2EsCDsl4bsnYwsIDE6IOunjOuTpCDsiJgg7J6I7J2MLCAyOiDsobTsnqztlahcclxuICAgICAgICAgICAgICAgICAgICB2aXNhOjAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2l0aTowXHJcbiAgICAgICAgICAgICAgICB9LCAgXHJcbiAgICAgICAgICAgICAgICBmb29kOiAwLFxyXG4gICAgICAgICAgICAgICAgbWV0cm86IDAsXHJcbiAgICAgICAgICAgICAgICBzcG90OjBcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGFzc2Vzc21lbnQ6IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDowLFxyXG4gICAgICAgICAgICAgICAgc2FmZXR5OjAsXHJcbiAgICAgICAgICAgICAgICB0aGVtZTowLFxyXG4gICAgICAgICAgICAgICAgY29udmVuaWVuY2U6MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGhvdGVsLmxvY2FsKSB7XHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5hdG0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGhvdGVsLmxvY2FsLmF0bSkpIHsgLy9WSVNBIEFUTeydtCDsoJXrpqzrkJjsp4Ag7JWK7J2AIO2Yle2DnOuhnCDrk6TslrTqsIDsnojripQg7IOB7YOcXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vYXRt6rCd7LK066W8IOqwgOyngOqzoCDsnojripQg7IOB7YOcIC0g67CY65Oc7IucIHZpc2EgYXRt7J20IOuTpOyWtOqwgCDsnojslrTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLmF0bS5jaXRpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxvY2FsLmF0bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+ykkeyalDogQ0lUSeyekeyXheydgCBWSVNB7J6R7JeFIO2bhOyXkCDsnbTro6jslrTsoLjslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgeyAvL2xvY2Fs7JeQIGF0beydtCDsl4bsnYwgLT4g67mE7J6QIOy2lOy2nOuQnCDsoIHsnbQg7JeG7J2MXHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLnZpc2EgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmF0bSkgeyAvL+q3uCDqsr3smrDsl5Drj4QgQ0lUSeuKlCBSQVfrjbDsnbTthLDroZwg7KG07J6s7ZWgIOyImCDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7KSR7JqUOiBDSVRJ7J6R7JeF7J2AIFZJU0HsnpHsl4Ug7ZuE7JeQIOydtOujqOyWtOyguOyVvCDtlahcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLm1ldHJvKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWV0cm9MaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLnNwb3QpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnNwb3RzLnJhbmtlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9IDA7IC8vVklTQeuKlCDrrLTsobDqsbQg7Zi47YWUIOuhnOy7rOyXkCDsp4HsoJEg65Ok7Ja06rCA66+A66GcIO2YuO2FlCDroZzsu6wg6rK966Gc6rCAIOyXhuuLpOuKlCDqsoPsnYAgVklTQeqwgCDsl4bri6TripQg6rKDLlxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubG9jYWwuYXRtKSB7IC8vY2l0aeuCmCB2aXNh64qUIO2YuO2FlCDroZzsu6zsnbQg7JWE64uMIOuPhOyLnCDroZzsu6zsl5Ag7KCA7J6l65CgIOyImCDsnojsnYwuXHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLm1ldHJvTGluZSkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLnNwb3RzLnJhbmtlZCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGVja1R4dCArPSAnPGgyIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdGl0bGVcIj7tmLjthZQg7KO867OA7KCV67O0PC9oMj4nO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCBWSVNBIEFUTeygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuYXRtLnZpc2EgPT09IDEpIHtcclxuICAgICAgICAgICAgU2V0QVRNLmluaXQoZGF0YSwgY2lkKTtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIFZJU0EgQVRN7KCV67O0IO2ZleyduC4g7Zi47YWU67OE66GcIOqwgOyepSDqsIDquYzsmrQgQVRN6rO8IDI07Iuc6rCEIEFUTeydhCDstpTstpztlanri4jri6QuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuYXRtLnZpc2EgPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0gVklTQSBBVE3soJXrs7TqsIAg7JeG7Iq164uI64ukLiBWSVNBIEFUTSBsb2NhdG9y7JeQ7IScIOygleuztOulvCDrqLzsoIAg7YGs66Gk66eB7ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCBDSVRJIEFUTeygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuYXRtLmNpdGkgPT09IDEpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIENJVEkgQVRN7KCV67O0IO2ZleyduC4g6rCA7J6lIOqwgOq5jOyatCBDSVRJIEFUTeydhCDstpTstpztlanri4jri6QuPC9wPic7XHJcbiAgICAgICAgfSAvLyBjaXRpIHN0YXR1cyAw7J2AIOyXhuydjC5cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5mb29kID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIOyLneujjO2SiOygkC/tjrjsnZjsoJAg7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5mb29kID09PSAxKSB7XHJcbiAgICAgICAgICAgIFNldEZvb2QuaW5pdChkYXRhLCBjaWQpO1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg7Iud66OM7ZKI7KCQL+2OuOydmOygkCDsoJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA6rmM7Jq0IOyLneujjO2SiOygkCDstpTstpwuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuZm9vZCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHQgY29sb3ItLXJlZFwiPk5vIERhdGEgLSDrj4Tsi5wg7Iud66OM7ZKI7KCQL+2OuOydmOygkCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLiDrqLzsoIAg7KCV67O066W8IOyeheugpe2VtOyjvOyEuOyalC48L3A+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFNldExhdW5kcnkuaW5pdChkYXRhLCBjaXR5TmFtZSk7XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwubWV0cm8gPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwg7KeA7ZWY7LKgL+uMgOykkeq1kO2GtSDsoJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLm1ldHJvID09PSAxKSB7XHJcbiAgICAgICAgICAgIFNldE1ldHJvLmluaXQoZGF0YSwgY2l0eU5hbWUpO1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg7KeA7ZWY7LKgL+uMgOykkeq1kO2GtSDsoJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA6rmM7Jq0IOyngO2VmOyyoCDstpTstpwuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwubWV0cm8gPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0g64+E7IucIOyngO2VmOyyoC/rjIDspJHqtZDthrUg7KCV67O06rCAIOyXhuyKteuLiOuLpC4g66i87KCAIOygleuztOulvCDsnoXroKXtlbTso7zshLjsmpQuPC9wPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLnNwb3QgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwg6rSA6rSR7KeAIOygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuc3BvdCA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg6rSA6rSR7KeAIOygleuztCDtmZXsnbguIO2YuO2FlOuzhOuhnCDqsIDquYzsmrQg6rSA6rSR7KeAIOy2lOy2nC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5zcG90ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIOuPhOyLnCDqtIDqtJHsp4Ag7Iic7JyE6rCAIOyVhOyngSDtmZXsoJXrkJjsp4Ag7JWK7JWY7Iq164uI64ukLiDrqLzsoIAg7ZmV7J247ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU2V0U2FmZXR5LmluaXQoZGF0YSwgY2l0eU5hbWUpO1xyXG4gICAgICAgIFNldENvbnZpbmllbmNlLmluaXQoZGF0YSwgY2l0eU5hbWUpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaWQpLnNldChkYXRhKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coY2hlY2tUeHQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0SG90ZWxJbmZvO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldEFUTSA9IHtcclxuICAgIHN0YXRpc3RpYzoge1xyXG4gICAgICAgIG5lYXJlc3Q6W10sIC8v6rCA7J6lIOqwgOq5jOyatCBBVE3snYAg66qHIG0g6rGw66as7JeQIOyeiOuKlOyngCDrj4Tsi5wg7KCE7LK0IO2Pieq3oOydhCDrgrTquLAg7JyE7ZWcIOuNsOydtO2EsFxyXG4gICAgICAgIGJhbmsyNDpbXSwgICAvLzI07Iuc6rCEIOyatOyYge2VmOuKlCDsnYDtlokg7IaM7JygIOqxsOumrOyXkCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgICAgICBpbjEzMDpbXSAvL+uwmOqyvSAxMzBtIOuCtOyXkCBBVE3snbQg66qHIOqwnCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgIH0sXHJcbiAgICBieUFyZWE6IHt9LCAvL2luMTMwIHN0YXTsnYQg7KeA7Jet67OE66GcIO2Pieq3oOuCtOq4sCDsnITtlZwg6rCd7LK0XHJcblxyXG4gICAgZGF0YTp7fSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSwgY2lkKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5maXJzdF9ieUhvdGVscygpOyAvL+2YuO2FlOuTpOydhCDrj4zrqbAg6rCA7J6lIOqwgOq5jOyatCBBVE0sIOydgO2WieyGjOycoCAyNOyLnOqwhCBBVE0sIDEzMG3slYjsl5Ag66qHIOqwnCBBVE0g7J6I64qU7KeA66W8IOywvuyVhOuCtOqzoCDthrXqs4Tsl5Drj4Qg6riw66GdXHJcbiAgICAgICAgdGhpcy5zZWNvbmRfYnlBcmVhcygpOyAvL+yngOyXreuzhOuhnCAxMzBtIOuCtOyXkCDsnojripQgQVRNIOqwr+yImCDtj4nqt6DsnYQg64OEIC0+IOyngOyXrSDsg4Hsl4Ug67Cc7KCE64+E66W8IOuCmOykkeyXkCDssrTtgaztlZjquLAg7JyE7ZW0IOunjOuTpOyXiOydjC5cclxuICAgICAgICB0aGlzLmZpZnRoX21ha2VTY29yZSgpO1xyXG4gICAgICAgIHRoaXMuc2l4dGhfd29yZGluZygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmaXJzdF9ieUhvdGVsczogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgaG90ZWxzID0gdGhpcy5kYXRhLmhvdGVscztcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBoaWQgaW4gaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IGhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICBpZiAoaG90ZWwudGVtcC5hdG0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdG1BcnIgPSBob3RlbC50ZW1wLmF0bTtcclxuICAgICAgICAgICAgICAgIHZhciBhdG1PYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDoge2RpZjoyMDAwfSxcclxuICAgICAgICAgICAgICAgICAgICBpbjEzMDogMCxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdG1BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXRtID0gYXRtQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoYXRtLmNvb3IsIGhvdGVsLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMTMwLjEpIHsgLy/siJnshozrs4QgMTMwbeqxsOumrCBhdG0g6rCv7IiYIOyytO2BrFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdG1PYmouaW4xMzArKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYXRtT2JqLmJhbmsyNCkgey8v6riw67O47KCB7Jy866GcIOqxsOumrOyInCDsoJXroKwg65CY7Ja07J6I7Ja07IScIOydtOuvuCDrk6TslrTqsIDsnojsnLzrqbQg6re464aI7J20IOuNlCDqsIDquYzsmrTrhohcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZiA8IGF0bU9iai5uZWFyZXN0LmRpZikgeyAvL+yImeyGjOuzhCDsnYDtlokg7IaM7JygIDI07Iuc6rCEIGF0bSDri7TsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYXRtLm93bmVyLmluY2x1ZGVzKFwiQkFOS1wiKXx8YXRtLnBsYWNlTmFtZS5pbmNsdWRlcyhcIkJBTktcIikpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtT2JqLm5lYXJlc3QgPSBhdG07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtT2JqLm5lYXJlc3QuZGlmID0gZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdG1PYmoubmVhcmVzdC5zY29yZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v7Ya16rOE7JeQIOq4sOuhne2VmOq4sFxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLm5lYXJlc3QucHVzaChhdG1PYmoubmVhcmVzdC5kaWYpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuYXRtID0gYXRtT2JqO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwgPSB7YXRtOiBhdG1PYmp9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vaW4xMzDsnYAg7Zi47YWU7J2EIO2VnCDrsogg64ukIOuPiCDri6TsnYzsl5Ag7Ya16rOE7JeQIOq4sOuhne2VoCDsiJgg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5pbjEzMC5wdXNoKGF0bU9iai5pbjEzMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0pey8v7KeA7Jet67OEIGF0bSDrsIDsp5Hrj4Trpbwg7ZmV7J247ZWY64qUIOq3uOufsCDrhYDshJ1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXS5wdXNoKGF0bU9iai5pbjEzMCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXSA9IFthdG1PYmouaW4xMzBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0KGBWSVNBIEFUTSDsoJXrs7TqsIAg7JeG64qUIO2YuO2FlOydtCDsnojsirXri4jri6QuIO2ZleyduCDtm4Qg7J6s7Iuc64+E7ZW07KO87IS47JqUYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlY29uZF9ieUFyZWFzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBhcmVhID0gdGhpcy5kYXRhLmFyZWE7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJlYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmKCFhcmVhW2ldLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ieUFyZWFbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdG1zID0gdGhpcy5ieUFyZWFbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXRtcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW0gKz0gYXRtc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbnVzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZihhdG1zLmxlbmd0aCA8IDEwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWludXMgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXRtcyA9IChzdW0vKGF0bXMubGVuZ3RoKSArIGF0bXMubGVuZ3RoLzEwKSArIG1pbnVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0ubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsLmF0bSA9IGF0bXMudG9GaXhlZCgyKSoxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtOiBhdG1zLnRvRml4ZWQoMikqMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0ubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsLmF0bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdG06IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpZnRoX21ha2VTY29yZTogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIHNjb3JlQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICB2YXIgc2NvcmUgPSBob3RlbC5sb2NhbC5hdG0ubmVhcmVzdC5kaWY7XHJcbiAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaCh7c2NvcmU6c2NvcmUsaGlkOmhpZH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzY29yZUFycmF5LnNvcnQoKGEsIGIpID0+IGEuc2NvcmUgLSBiLnNjb3JlKTsgLy/rgq7snYTsiJjroZ0g7KKL7J2MXHJcblxyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBzY29yZUFycmF5Lmxlbmd0aDtcclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5hdG0uc2NvcmUucGVyY2VudGlsZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWQgPSBzY29yZUFycmF5W2ldLmhpZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgdmFyIHJhbmsgPSAoKGkrMSkgLyB0b3RhbCk7IC8vIOuwseu2hOychFxyXG4gICAgICAgICAgICB2YXIgcGVyY2VudGlsZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXNSYW5rZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmFua1N5cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzUmFua2VkKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSBwZXJjZW50aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRpbGUgKz0gcmFua1N5c1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFuazxwZXJjZW50aWxlKXsgIC8vMzUlIOyViOyXkCDrk6TrqbRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuayAtPSBtaW51czsgICAvL3JhbmvrpbwgMH4wLjLroZwg66ee7Law7KSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gKDEwLWopIC0gTWF0aC5jZWlsKChyYW5rL3JhbmtTeXNbal0pKjEwKS8xMDsgLy9yYW5rKDB+MC4yKeulvCAwLjLroZwg64KY64iI6rCSKjEwLzEwIC0+IDB+MC456rCAIOuCmOyYtFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JhbmtlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuYXRtID0gc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlID0ge2F0bTpzY29yZX07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZTp7YXRtOnNjb3JlfSxcclxuICAgICAgICAgICAgICAgICAgICB3b3JkOnthdG06XCJcIn1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNpeHRoX3dvcmRpbmc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICB2YXIgZGlmID0gZGlmVG9NaW4oaG90ZWwubG9jYWwuYXRtLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgdmFyIHR4dCA9IGDqsIDsnqUg6rCA6rmM7Jq0IOydgO2WiSDshozsnKAgQVRN7J2AIOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyeiOydjGA7XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50LndvcmQpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLmF0bSA9IHR4dDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQgPSB7YXRtOnR4dH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXRBVE07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEFUTS5qcyIsImltcG9ydCBHZW9Db2RlIGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL2dlb0NvZGUuanNcIjtcclxuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi4vY29uZmlnLmpzXCI7XHJcblxyXG52YXIgU2V0Rm9vZCA9IHtcclxuICAgIGRhdGE6e30sXHJcblxyXG4gICAgc3RhdGlzdGljOntcclxuICAgICAgICBuZWFyZXN0OltdLFxyXG4gICAgICAgIG5lYXJieTpbXVxyXG4gICAgfSxcclxuICAgIGJ5QXJlYTp7fSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaWQpe1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgaWYodGhpcy5maXJzdF9nZW9Db2RlKGNpZCkpeyAgICAvL+yngOyYpOy9lOuUqSDtlaAg6rKMIOyXhuycvOuptCBzZWNvbmTrtoDthLAg7KeE7ZaJ7ZWoXHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kX3NldEZvb2QoKTsgIC8v7IiZ7IaM67OE66GcIOyLneujjO2SiOygkOuTpOydhCDrlYzroKTrhKPsnYxcclxuICAgICAgICAgICAgdGhpcy50aGlyZF9ieUFyZWFzKCk7IC8v7Ya16rOE6rCS7J2EIOunjOuTpOyWtOuDhFxyXG4gICAgICAgICAgICB0aGlzLmZvdXJ0aF9tYWtlU3RhdHMoKTsgLy/thrXqs4TqsJLsnYQg66eM65Ok7Ja064OEIC0gY2lkL3N0YXQvbG9jYWwvZm9vZCDrnbzqs6Ag65Ok7Ja06rCI6rKD7J6EXHJcbiAgICAgICAgICAgIHRoaXMuZmlmdGhfbWFrZVNjb3JlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2l4dGhfd29yZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzaXh0aF93b3JkaW5nOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIXRvZG8hISEg7KeA6riI7J2AIOuJtOyalSDquLDspIDsnLzroZwg65CY7Ja07J6I7J2MIC0+IOuPhOyLnOuzhOuhnCDrgpjriITquLAo7JiILe2OuOydmOygkCDsnojripQg64+E7Iuc7JqpKVxyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmZvb2Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb29kID0gaG90ZWwubG9jYWwuZm9vZDtcclxuICAgICAgICAgICAgICAgICAgICBpZihmb29kLmdyb2Nlcnkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmb29kLmxhcmdlKXsgLy/rkZgg64ukIOyeiOuKlCDsvIDsnbTsiqRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihmb29kLmxhcmdlLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqb3NhID0gZm9vZC5sYXJnZS5uZWFyZXN0Lmpvc2E7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IGZvb2QubGFyZ2UubmVhcmVzdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZm9vZC5sYXJnZS5uZWFyZXN0LmRpZiA8IGZvb2QuZ3JvY2VyeS5uZWFyZXN0LmRpZiArIDUwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSBg6rCB7KKFIOyLneujjO2SiOydhCDsgrQg7IiYIOyeiOuKlCDrjIDtmJUg66eI7Yq47J24ICR7bmFtZX0ke2pvc2F9IOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyeiOydjGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2RpZiA9IGRpZlRvTWluKGZvb2QuZ3JvY2VyeS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gYOqwhOuLqO2VnCDrqLnqsbDrpqzrpbwg7IK0IOyImCDsnojripQg7Iud66OM7ZKI7KCQ7J20IOuPhOuztCAke2dkaWZ9IOqxsOumrOyXkCDsnojqs6AsIOqwgeyihSDsnYzsi53rk6TsnYQg7IK0IOyImCDsnojripQg64yA7ZiVIOuniO2KuCAke25hbWV9JHtqb3NhfSDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYxgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXsgIC8vZ3JvY2VyeeunjCDsnojripQg7LyA7J207IqkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gZGlmVG9NaW4oZm9vZC5ncm9jZXJ5Lm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCA9IGDqsITri6jtlZwg66i56rGw66as66W8IOyCtCDsiJgg7J6I64qUIOyLneujjO2SiOygkOydtCDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYxgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoZm9vZC5sYXJnZSl7IC8vL+yjvOuzgOyXkCBncm9jZXJ564qUIOyXhuuKlOuNsCBsYXJnZeunjCDsnojripQg7Yq57J207LyA7J207IqkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihmb29kLmxhcmdlLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBmb29kLmxhcmdlLm5lYXJlc3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpvc2EgPSBmb29kLmxhcmdlLm5lYXJlc3Quam9zYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gYOqwgeyihSDsi53ro4ztkojsnYQg7IK0IOyImCDsnojripQg64yA7ZiVIOuniO2KuCAke25hbWV9JHtqb3NhfSDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYxgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCA9ICfsi53ro4ztkojsnYQg7IK0IOunjO2VnCDqs7PsnYAg7KO867OAIDXrtoTqsbDrpqwg7J2064K07JeQIOyXhuydjCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdHh0ID0gJ+yLneujjO2SiOydhCDsgrQg66eM7ZWcIOqzs+ydgCDso7zrs4AgNeu2hOqxsOumrCDsnbTrgrTsl5Ag7JeG7J2MJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC53b3JkKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5mb29kID0gdHh0O1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZCA9IHtmb29kOnR4dH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpZnRoX21ha2VTY29yZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgc2NvcmVBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwuZm9vZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2luZCBpbiBob3RlbC5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb29kID0gaG90ZWwubG9jYWwuZm9vZFtraW5kXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5lYXJlc3REaWYgPSBmb29kLm5lYXJlc3QuZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gKENvbmZpZy5mb29kLmtpbmRba2luZF0uc3RkIC0gbmVhcmVzdERpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKENvbmZpZy5mb29kLmtpbmRba2luZF0ubXVsdGlwbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSBzY29yZSAqIENvbmZpZy5mb29kLmtpbmRba2luZF0ubXVsdGlwbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gZm9vZC5uZWFyYnkqMjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2NvcmVBcnJheS5wdXNoKHtzY29yZTpzY29yZSxoaWQ6aGlkfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNjb3JlQXJyYXkuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpOyAvL+uGkuydhOyImOuhnSDsoovsnYxcclxuXHJcbiAgICAgICAgdmFyIHRvdGFsID0gc2NvcmVBcnJheS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciByYW5rU3lzID0gQ29uZmlnLmZvb2Quc2NvcmUucGVyY2VudGlsZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWQgPSBzY29yZUFycmF5W2ldLmhpZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgbGV0IHJhbmsgPSAoKGkrMSkgLyB0b3RhbCk7IC8vIOuwseu2hOychCAtIDB+MSAo64aS7J2E7IiY66GdIDDsl5Ag6rCA6rmM7JuAKVxyXG4gICAgICAgICAgICB2YXIgcGVyY2VudGlsZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXNSYW5rZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmFua1N5cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzUmFua2VkKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSBwZXJjZW50aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRpbGUgKz0gcmFua1N5c1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFuazxwZXJjZW50aWxlKXsgIC8vMzUlIOyViOyXkCDrk6TrqbRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuayAtPSBtaW51czsgICAvL3JhbmvrpbwgMH4wLjLroZwg66ee7Law7KSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gKDEwLWopIC0gTWF0aC5jZWlsKChyYW5rL3JhbmtTeXNbal0pKjEwKS8xMDsgLy9yYW5rKDB+MC4yKeulvCAwLjLroZwg64KY64iI6rCSKjEwLzEwIC0+IDB+MC456rCAIOuCmOyYtFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JhbmtlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuZm9vZCA9IHNjb3JlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZSA9IHtmb29kOnNjb3JlfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOntmb29kOnNjb3JlfSxcclxuICAgICAgICAgICAgICAgICAgICB3b3JkOntmb29kOlwiXCJ9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmb3VydGhfbWFrZVN0YXRzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBzdGF0ID0ge1xyXG4gICAgICAgICAgICBuZWFyZXN0OiAwLFxyXG4gICAgICAgICAgICBuZWFyYnk6MFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAodmFyIGlkIGluIHN0YXQpIHtcclxuICAgICAgICAgICAgdmFyIHN1bSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5zdGF0aXN0aWNbaWRdLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBzdW0gKz0gdGhpcy5zdGF0aXN0aWNbaWRdW2tdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0YXRbaWRdID0gc3VtL3RoaXMuc3RhdGlzdGljW2lkXS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHN0YXRbaWRdID0gc3RhdFtpZF0udG9GaXhlZCgyKSoxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5kYXRhLnN0YXQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuc3RhdC5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RhdC5sb2NhbC5mb29kID0gc3RhdDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RhdC5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBmb29kOiBzdGF0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0ID0ge1xyXG4gICAgICAgICAgICAgICAgbG9jYWw6e2Zvb2Q6c3RhdH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHRoaXJkX2J5QXJlYXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGFyZWEgPSB0aGlzLmRhdGEuYXJlYTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYoIWFyZWFbaV0ubm90QXJlYSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ5QXJlYVtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvb2RzID0gdGhpcy5ieUFyZWFbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZm9vZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGZvb2RzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZvb2RzLmxlbmd0aCA8IDEwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWludXMgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vZHMgPSAoc3VtLyhmb29kcy5sZW5ndGgpICsgZm9vZHMubGVuZ3RoLzEwKSArIG1pbnVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0ubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsLmZvb2QgPSBmb29kcy50b0ZpeGVkKDIpKjE7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb29kOiBmb29kcy50b0ZpeGVkKDIpKjFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmVhW2ldLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbC5mb29kID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb2Q6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlY29uZF9zZXRGb29kOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgdmFyIGlzU29tZUZvb2QgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gdGhpcy5kYXRhLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgIHZhciBncm9BcnIgPSB0aGlzLmRhdGEubG9jYWwuZm9vZFt0eXBlXTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGQgPSBDb25maWcuZm9vZC5raW5kW3R5cGVdLnN0ZDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb29kID0gZ3JvQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoaG90ZWwuY29vciwgZm9vZC5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlmPHN0ZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU29tZUZvb2QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb29kLmRpZiA9IGRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vZC50eXBlID0gdHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLnRlbXApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwudGVtcC5mb29kKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC50ZW1wLmZvb2RbdHlwZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2RbdHlwZV0ucHVzaChmb29kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwudGVtcC5mb29kW3R5cGVdID0gW2Zvb2RdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZFt0eXBlXSA9IFtmb29kXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb2Q6e31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2RbdHlwZV0gPSBbZm9vZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFpc1NvbWVGb29kKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHZhciBuZWFyYnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5lYXJlc3QgPSB7ZGlmOjk5OX07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBob3RlbC50ZW1wLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2RbdHlwZV0uc29ydCgoYSwgYikgPT4gYS5kaWYgLSBiLmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvb2RBcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICBob3RlbC50ZW1wLmZvb2RbdHlwZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvcHkgPSAkLmV4dGVuZCh0cnVlLHt9LGhvdGVsLnRlbXAuZm9vZFt0eXBlXVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb2RBcnIucHVzaChjb3B5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5lYXJieSArPSBmb29kQXJyLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZm9vZEFyclswXS5kaWYgPCBuZWFyZXN0LmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3QgPSBmb29kQXJyWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZm9vZEFyci5sZW5ndGg+NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb2RBcnIubGVuZ3RoID0gNTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwuZm9vZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5mb29kW3R5cGVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJieTogaG90ZWwudGVtcC5mb29kW3R5cGVdLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyNTogZm9vZEFycixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyZXN0OiBmb29kQXJyWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmZvb2QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmZvb2RbdHlwZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmJ5OiBob3RlbC50ZW1wLmZvb2RbdHlwZV0ubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXI1OiBmb29kQXJyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3Q6IGZvb2RBcnJbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwgPSB7Zm9vZDp7fX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmxvY2FsLmZvb2RbdHlwZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyYnk6IGhvdGVsLnRlbXAuZm9vZFt0eXBlXS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyNTogZm9vZEFycixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3Q6IGZvb2RBcnJbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0pey8v7KeA7Jet67OEIGZvb2Qg67CA7KeR64+E66W8IO2ZleyduO2VmOuKlCDqt7jrn7Ag64WA7ISdXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0ucHVzaChuZWFyYnkpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0gPSBbbmVhcmJ5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5uZWFyZXN0LnB1c2gobmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmJ5LnB1c2gobmVhcmJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlyc3RfZ2VvQ29kZTogZnVuY3Rpb24oY2lkKXtcclxuICAgICAgICB2YXIgZ3JvQXJyID0gdGhpcy5kYXRhLmxvY2FsLmZvb2QuZ3JvY2VyeTtcclxuICAgICAgICB2YXIgZ2VvQXJyID0gW107XHJcbiAgICAgICAgdmFyIGlzR2VvTmVlZGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBncm9jZXJ5ID0gZ3JvQXJyW2ldO1xyXG4gICAgICAgICAgICBpZighZ3JvY2VyeS5jb29yKXtcclxuICAgICAgICAgICAgICAgIGdlb0Fyci5wdXNoKHthZGRyZXNzOmdyb2NlcnkuYWRkcmVzcywgYWlkOml9KTtcclxuICAgICAgICAgICAgICAgIGlzR2VvTmVlZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZighZ3JvY2VyeS5jb29yLmxhdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2VvQXJyLnB1c2goe2FkZHJlc3M6Z3JvY2VyeS5hZGRyZXNzLCBhaWQ6aX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzR2VvTmVlZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc0dlb05lZWRlZCl7XHJcbiAgICAgICAgICAgIHZhciByZWYgPSBcImNpdGllcy9cIitjaWQrXCIvbG9jYWwvZm9vZC9ncm9jZXJ5XCI7XHJcbiAgICAgICAgICAgIEdlb0NvZGUuaW5pdChnZW9BcnIsIHJlZik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0Rm9vZDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0Rm9vZC5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldE1ldHJvID0ge1xyXG4gICAgc3RhdGlzdGljOntuZWFyZXN0OltdfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaXR5TmFtZSl7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmNpdHlOYW1lID0gY2l0eU5hbWU7XHJcbiAgICAgICAgdGhpcy5maXJzdF9zZXRNZXRybygpOyAvL+yImeyGjOuzhOuhnCDsp4DtlZjssqDsnYQg65WM66Ck64Sj7J2MXHJcbiAgICAgICAgdGhpcy5zZWNvbmRfYnlBcmVhcygpO1xyXG4gICAgICAgIHRoaXMudGhpcmRfbWFrZVNjb3JlKCk7XHJcbiAgICAgICAgdGhpcy5mb3VydGhfd29yZGluZygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmb3VydGhfd29yZGluZzogZnVuY3Rpb24oKXtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY2l0eU5hbWUgPSB0aGlzLmNpdHlOYW1lO1xyXG4gICAgICAgIHZhciB0b3RhbExpbmUgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEubWV0cm9MaW5lKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgbGV0IHR4dEFyciA9IFtdO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1ldHJvID0gaG90ZWwubG9jYWwubWV0cm87XHJcbiAgICAgICAgICAgIGlmKG1ldHJvKXtcclxuICAgICAgICAgICAgICAgIHZhciBuZWFyZXN0RGlmID0gZGlmVG9NaW4obWV0cm8ubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5lYXJlc3RTdG4gPSBtZXRyby5uZWFyZXN0Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZU5vID0gT2JqZWN0LmtleXMobWV0cm8uYnlMaW5lKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BvdE5vID0gT2JqZWN0LmtleXMobWV0cm8uc3BvdCkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjb3JlID0gaG90ZWwuYXNzZXNzbWVudC5zY29yZS50cmFuc3BvcnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXZnVGltZSA9IGRpZlRvTWluKG1ldHJvLmF2Z0RpZik7XHJcbiAgICAgICAgICAgICAgICB0eHRBcnIucHVzaChg7IiZ7IaM7JeQ7IScIOqwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J2AIOuPhOuztCAke25lYXJlc3REaWZ9IOqxsOumrOydmCAke25lYXJlc3RTdG597JetYCk7XHJcbiAgICAgICAgICAgICAgICB0eHRBcnIucHVzaChg64+E67O0IDEw67aE6rGw66asIOydtOuCtOyXkCAke3RvdGFsTGluZX3qsJzsnZggJHtjaXR5TmFtZX0g7KCE7LK0IOyngO2VmOyyoCDrhbjshKAg7KSRICR7bGluZU5vfeqwnCDrhbjshKDsnbQg7KeA64KoYCk7XHJcbiAgICAgICAgICAgICAgICB0eHRBcnIucHVzaChgJHtjaXR5TmFtZX0gMTAw64yAIOq0gOq0keyngCDspJEgJHtzcG90Tm996rCc66W8IOyngO2VmOyyoCDtmZjsirkg7JeG7J20IO2Pieq3oCAke2F2Z1RpbWV97J2YIOuPhOuztCDsnbTrj5nsnLzroZwg67Cp66y4IOqwgOuKpWApO1xyXG4gICAgICAgICAgICAgICAgaWYoc2NvcmU+OC45KXtcclxuICAgICAgICAgICAgICAgICAgICB0eHRBcnIucHVzaCgn7KeA7ZWY7LKg7J2EIOydtOyaqe2VtCDqtIDqtJHtlZjquLAg66ek7JqwIO2OuOumrO2VnCDrjIDspJHqtZDthrXsnZgg7LWc6rOgIOyalOyngOyXkCDsnITsuZjtlagnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNjb3JlPjcuOSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0QXJyLnB1c2goJ+yngO2VmOyyoOydhCDsnbTsmqntlbQg6rSA6rSR7ZWY6riwIO2OuOumrO2VnCDrjIDspJHqtZDthrXsnZgg7JqU7KeA7JeQIOychOy5mO2VqCcpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Ni45KXtcclxuICAgICAgICAgICAgICAgICAgICB0eHRBcnIucHVzaCgn7KeA7ZWY7LKg7J2EIOydtOyaqe2VtCDqtIDqtJHtlZjquLAg64KY7IGY7KeAIOyViuydgCDsnITsuZjsl5Ag7J6I7J2MJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihzY29yZT41Ljkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dEFyci5wdXNoKCfsp4DtlZjssqDsnYQg7J207Jqp7ZW0IOq0gOq0ke2VmOq4sOyXkCDslYTso7wg7KKL7J2AIOychOy5mOuKlCDslYTri5gnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dEFyci5wdXNoKCfrjIDspJHqtZDthrUg7Y647J2Y7ISx7J2AIOyVveqwhCDrgq7snYAg7Y647Jy866GcLCDqtIDqtJHsnbQg7KGw6riIIOu2iO2OuO2VoCDsiJgg7J6I7J2MJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS50cmFuc3BvcnQgPSA0O1xyXG4gICAgICAgICAgICAgICAgdHh0QXJyID0gW1wi7J20IOyImeyGjCDrj4Trs7QgMTXrtoQg7J2064K0IOqxsOumrOyXkCDsp4DtlZjssqAg7Jet7J20IOyXhuyWtOyEnCDrjIDspJHqtZDthrXsnYQg7J207Jqp7ZWY6riwIOu2iO2OuO2VoCDsiJgg7J6I7J2MXCJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC50cmFuc3BvcnQgPSB0eHRBcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB0aGlyZF9tYWtlU2NvcmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHNjb3JlQXJyYXkgPSBbXTtcclxuICAgICAgICAvLzHqsJwg6rSA6rSR7KeA66W8IOqwiCDsiJgg7J6I7J2EIOuVjOuniOuLpCAxODAwIC0gZGlm7ZWp6rOEKO2YuO2FlOyXkOyEnCwg64K066Ck7IScKeygkOunjO2BvCDstpTqsIBcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICBsZXQgbWV0cm8gPSBob3RlbC5sb2NhbC5tZXRybztcclxuICAgICAgICAgICAgbGV0IHNwb3RzID0gdGhpcy5kYXRhLnNwb3RzLnJhbmtlZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgbGV0IG1ldHJvTGluZU9iaiA9IHRoaXMuZGF0YS5tZXRyb0xpbmU7XHJcbiAgICAgICAgICAgIGxldCBzcG90T2JqID0ge307XHJcblxyXG4gICAgICAgICAgICBpZihtZXRybyl7XHJcbiAgICAgICAgICAgICAgICBtZXRyby5zcG90ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBsaW5lTmFtZSBpbiBtZXRyby5ieUxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IG1ldHJvLmJ5TGluZVtsaW5lTmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZkhvdGVsID0gbGluZS5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXRyb0xpbmVPYmpbbGluZU5hbWVdLnNwb3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBtZXRyb0xpbmVPYmpbbGluZU5hbWVdLnNwb3RbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWZTcG90ID0gc3BvdC5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3RPYmpbc3BvdC5yYW5rXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkaWZTcG90ICsgZGlmSG90ZWwgPCBzcG90T2JqW3Nwb3QucmFua10uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90T2JqW3Nwb3QucmFua10gPSB7ZGlmOiAoZGlmU3BvdCArIGRpZkhvdGVsKSwgbGluZTpsaW5lTmFtZX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdE9ialtzcG90LnJhbmtdID0ge2RpZjogKGRpZlNwb3QgKyBkaWZIb3RlbCksIGxpbmU6bGluZU5hbWV9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGF2ZyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcmFuayBpbiBzcG90T2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gKDE4MDAgLSBzcG90T2JqW3JhbmtdLmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZnICs9IHNwb3RPYmpbcmFua10uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBob3RlbFNwb3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IHNwb3RzW3JhbmtdLmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHNwb3RPYmpbcmFua10ubGluZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTpzcG90c1tyYW5rXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcG90TWV0cm9OYW1lOnNwb3RzW3JhbmtdLm1ldHJvSW5mb1tzcG90T2JqW3JhbmtdLmxpbmVdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6cmFua1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm8uc3BvdC5wdXNoKGhvdGVsU3BvdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhdmcgPSBNYXRoLnJvdW5kKChhdmcgLyBPYmplY3Qua2V5cyhzcG90T2JqKS5sZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIG1ldHJvLmF2Z0RpZnRvU3BvdCA9IGF2ZztcclxuICAgICAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaCh7aGlkOmhpZCxzY29yZTpzY29yZX0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5tZXRyby5zY29yZS5wZXJjZW50aWxlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IHNjb3JlQXJyYXlbaV0uaGlkO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcmFuayA9ICgoaSsxKSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEIC0gMH4xICjrhpLsnYTsiJjroZ0gMOyXkCDqsIDquYzsm4ApXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoMTAtaikgLSBNYXRoLmNlaWwoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC5zY29yZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS50cmFuc3BvcnQgPSBzY29yZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUgPSB7dHJhbnNwb3J0OnNjb3JlfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOnt0cmFuc3BvcnQ6c2NvcmV9LFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmQ6e3RyYW5zcG9ydDpcIlwifVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2Vjb25kX2J5QXJlYXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/ri6TrpbggbG9jYWzrk6Tqs7zripQg64us66asIOyngO2VmOyyoCDsl63snYQgQXJlYeuzhOuhnCDrgpjriJQgLSDsp4Dsl63rs4TroZwg7Ja065akIOuFuOyEoOuTpOydtCDsp4DrgpjqsIDripTsp4Ag7LK07YGsO1xyXG4gICAgICAgIGxldCBhcmVhQXJyID0gdGhpcy5kYXRhLmFyZWE7XHJcbiAgICAgICAgbGV0IG1ldHJvQXJyID0gdGhpcy5kYXRhLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJlYUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYXJlYSA9IGFyZWFBcnJbaV07XHJcbiAgICAgICAgICAgIGlmKCFhcmVhLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZXRyb0Fyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXRybyA9IG1ldHJvQXJyW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlzSW5BcmVhKG1ldHJvLmNvb3IsIGFyZWEuY29vcikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1ldHJvLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0gbWV0cm8ubGluZVtrXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVhLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVhLmxvY2FsLm1ldHJvKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhLmxvY2FsLm1ldHJvW2xpbmVdICsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwubWV0cm9bbGluZV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwubWV0cm8gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbCA9IHttZXRybzp7fX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpcnN0X3NldE1ldHJvOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwubG9jYWwubWV0cm8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDp7ZGlmOkNvbmZpZy5tZXRyby5uZWFyU3RkfSxcclxuICAgICAgICAgICAgICAgICAgICBuZWFyOltdLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ5TGluZTp7fVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIG1ldHJvQXJyID0gdGhpcy5kYXRhLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgICAgICB2YXIgYnlMaW5lID0gaG90ZWwubG9jYWwubWV0cm8uYnlMaW5lO1xyXG4gICAgICAgICAgICBsZXQgaGFzTWV0cm8gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0cm9BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXRybyA9IG1ldHJvQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihob3RlbC5jb29yLCBtZXRyby5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkaWY8Q29uZmlnLm1ldHJvLm5lYXJTdGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc01ldHJvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0cm9fYyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcjptZXRyby5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lOm1ldHJvLmxpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6bWV0cm8ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmOmRpZi50b0ZpeGVkKDApKjFcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLm1ldHJvLm5lYXIucHVzaChtZXRyb19jKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlmPGhvdGVsLmxvY2FsLm1ldHJvLm5lYXJlc3QuZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwubWV0cm8ubmVhcmVzdCA9IG1ldHJvX2M7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1ldHJvLmxpbmUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBtZXRyby5saW5lW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYnlMaW5lW2xpbmVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGJ5TGluZVtsaW5lXS5kaWYgPiBtZXRyb19jLmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnlMaW5lW2xpbmVdID0gbWV0cm9fYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBieUxpbmVbbGluZV0gPSBtZXRyb19jO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihoYXNNZXRybyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5uZWFyZXN0LnB1c2goaG90ZWwubG9jYWwubWV0cm8ubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLm1ldHJvID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldE1ldHJvO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRNZXRyby5qcyIsImltcG9ydCBDb25maWdfU2FmZXR5IGZyb20gXCIuLi9jb25maWcvc2FmZXR5LmpzXCI7XHJcblxyXG52YXIgU2V0U2FmZXR5ID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2l0eU5hbWUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuZmlyc3RfZnJvbUFyZWEoZGF0YSwgY2l0eU5hbWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmaXJzdF9mcm9tQXJlYTogZnVuY3Rpb24oZGF0YSwgY2l0eU5hbWUpe1xyXG4gICAgICAgIGxldCBzY29yZUFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGxldCBhcmVhcyA9IGRhdGEuYXJlYTtcclxuICAgICAgICBsZXQgaG90ZWxzID0gZGF0YS5ob3RlbHM7XHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIGhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSBob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLnNhZmV0eSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgd29yZCA9IGhvdGVsLmFzc2Vzc21lbnQud29yZC5zYWZldHk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG5cclxuICAgICAgICAgICAgLy9BUkVB66GcIOyduO2VnCDsuZjslYhcclxuICAgICAgICAgICAgbGV0IGFyZWEgPSBhcmVhc1tob3RlbC5hcmVhXTtcclxuICAgICAgICAgICAgc2NvcmUgKz0gYXJlYS5zYWZldHkuc2NvcmUqMztcclxuICAgICAgICAgICAgbGV0IGNvbmZpZ193b3JkID0gQ29uZmlnX1NhZmV0eS53b3JkW2FyZWEuc2FmZXR5LnNjb3JlXTtcclxuICAgICAgICAgICAgaWYoYXJlYS5zYWZldHkuc2NvcmU+MyYmYXJlYS5zYWZldHkubWlzZGVtZWFub3I8Myl7XHJcbiAgICAgICAgICAgICAgICBjb25maWdfd29yZCA9IENvbmZpZ19TYWZldHkud29yZFs2XTsgICAgLy/suZjslYjsnYAg7KKL7KeA66eMIOqyveuylOyjhOycqOydtCDsooAg64aS7J2MXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd29yZC5wdXNoKGAke2NpdHlOYW1lfSR7Y29uZmlnX3dvcmR9ICR7YXJlYS5uYW1lfSDsp4Dsl63sl5Ag7JyE7LmY7ZWY6rOgIOyeiOydjGApO1xyXG5cclxuICAgICAgICAgICAgLy9NRVRST+uhnCDsnbjtlZwg7LmY7JWIXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLm1ldHJvKXtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRybyA9IGhvdGVsLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IG1ldHJvLm5lYXJlc3QuZGlmO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pbiA9IGRpZlRvTWluKGRpZik7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZGlmID0gQ29uZmlnX1NhZmV0eS5tZXREaWY7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9EaWYgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZGlmLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1ldERpZiA9IGNvbmRpZltpXS5zdGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1ldFdvcmQgPSBjb25kaWZbaV0ud29yZDtcclxuICAgICAgICAgICAgICAgICAgICBpZihub0RpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjwobWV0RGlmKjEpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vRGlmID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZSArPSBjb25kaWZbaV0uc2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JkLnB1c2goYOqwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKgIOyXreydgCDrj4Trs7QgJHttaW59IOqxsOumrCR7bWV0V29yZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/snKDrj5nsnbjqtazroZwg7J247ZWcIOy5mOyViFxyXG4gICAgICAgICAgICBsZXQgZmxvYXRTY29yZSA9IGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUudHJhbnNwb3J0ICsgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5mb29kICsgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5hdG07XHJcbiAgICAgICAgICAgIGxldCBtaW5TcG90RGlmID0gMTUwO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnNwb3RzLnJhbmtlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBkYXRhLnNwb3RzLnJhbmtlZFtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSBjYWxjdWxhdGVEaWYoc3BvdC5jb29yLCBob3RlbC5jb29yKTtcclxuICAgICAgICAgICAgICAgIGlmKGRpZjxtaW5TcG90RGlmKXtcclxuICAgICAgICAgICAgICAgICAgICBtaW5TcG90RGlmID0gZGlmO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG1pblNwb3REaWY8NTApe1xyXG4gICAgICAgICAgICAgICAgZmxvYXRTY29yZSArPSAzO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihtaW5TcG90RGlmPDEwMCl7XHJcbiAgICAgICAgICAgICAgICBmbG9hdFNjb3JlICs9IDI7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKG1pblNwb3REaWY8MTUwKXtcclxuICAgICAgICAgICAgICAgIGZsb2F0U2NvcmUgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGZsb2F0ID0gQ29uZmlnX1NhZmV0eS5mbG9hdGluZztcclxuICAgICAgICAgICAgbGV0IG5vdFlldCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZsb2F0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RkID0gZmxvYXRbaV0uc3RkO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZsb2F0V29yZCA9IGZsb2F0W2ldLndvcmQ7XHJcbiAgICAgICAgICAgICAgICBpZihub3RZZXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZsb2F0U2NvcmU+c3RkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm90WWV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGZsb2F0W2ldLnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkLnB1c2goYCR7Y2l0eU5hbWV9JHtmbG9hdFdvcmR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZmluYWwgPSBDb25maWdfU2FmZXR5LmZpbmFsU2FmZXR5O1xyXG4gICAgICAgICAgICBub3RZZXQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaW5hbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0ZCA9IGZpbmFsW2ldLnN0ZDtcclxuICAgICAgICAgICAgICAgIGxldCBmaW5hbFdvcmQgPSBmaW5hbFtpXS53b3JkO1xyXG4gICAgICAgICAgICAgICAgaWYobm90WWV0KXtcclxuICAgICAgICAgICAgICAgICAgICBpZihzY29yZT5zdGQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3RZZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29yZC5wdXNoKGAke2ZpbmFsV29yZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2NvcmVBcnJheS5wdXNoKHtoaWQ6aGlkLHNjb3JlOnNjb3JlfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzY29yZUFycmF5LnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcclxuXHJcbiAgICAgICAgdmFyIHRvdGFsID0gc2NvcmVBcnJheS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciByYW5rU3lzID0gQ29uZmlnX1NhZmV0eS5zY29yZS5wZXJjZW50aWxlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IHNjb3JlQXJyYXlbaV0uaGlkO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcmFuayA9ICgoaSsxKSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEIC0gMH4xICjrhpLsnYTsiJjroZ0gMOyXkCDqsIDquYzsm4ApXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoMTAtaikgLSBNYXRoLmNlaWwoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuc2FmZXR5ID0gc2NvcmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0U2FmZXR5O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRTYWZldHkuanMiLCJ2YXIgQ29uZmlnX1NhZmV0eSA9IHtcclxuICAgIHNjb3JlOntcclxuICAgICAgICBwZXJjZW50aWxlIDogWzAuMTUsIDAuMiwgMC4yNSwgMC4yLCAwLjEsIDAuMV0sIC8vOSwgOCwgNy4uLuygkOuMgOydmCDrsLHrtoTsnIQg67mE7JyoIC0g7ZWp6rOEIDEg65CY7Ja07JW8IO2VqCEhIVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgd29yZDpbLy9hcmVh6rSA66CoIHdvcmRcclxuICAgICAgICBcIlwiLC8vc2NvcmUgMOygkOydgCDsl4bsnLzrr4DroZwg67mE7JuM65GgXHJcbiAgICAgICAgXCLsl5DshJwg7LmY7JWI7J20IOuCmOyBnCDtjrjsl5Ag7IaN7ZWY64qUXCIsICAvLzHsoJBcclxuICAgICAgICBcIuyXkOyEnCDsuZjslYjsnbQg7KKL7KeA64qUIOyViuydgCDtjrjsnbhcIiwgIC8vMuygkFxyXG4gICAgICAgIFwiIO2Pieq3oOyggeyduCDsuZjslYgg7IiY7KSA7J2EIOuztOydtOuKlFwiLCAgLy8z7KCQXHJcbiAgICAgICAgXCLsl5DshJwg7LmY7JWI7J20IOyii+ydgCDtjrjsnbhcIiwgICAgICAgIC8vNOygkFxyXG4gICAgICAgIFwi7JeQ7IScIOy5mOyViOydtCDrp6TsmrAg7KKL7J2AIO2OuOyduFwiLCAgICAvLzXsoJBcclxuICAgICAgICBcIuyXkOyEnCDsuZjslYjsnYAg7KKL7J2AIO2OuOyXkCDsho3tlZjsp4Drp4wg6rK967KU7KOE7Jyo7J20IOyhsOq4iCDrhpLsnYAg7Y647J24XCIgIC8v7Yq57IiYXHJcbiAgICBdLFxyXG5cclxuICAgIG1ldERpZjpbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTUwLCAgICAgICAgICAgICAgICAgICAgICAgLy/qsbDrpqzqsIAgMTUwIOuvuOunjOydvCDqsr3smrBcclxuICAgICAgICAgICAgd29yZDpcIuyXkCDsnITsuZjtlbQg6rWJ7J6l7Z6IIOqwgOq5jOybgFwiLCAvL+yalOugh+qyjCDshKTrqoXtlZjqs6BcclxuICAgICAgICAgICAgc2NvcmU6NiAgICAgICAgICAgICAgICAgICAgICAgLy837KCQ7J2EIOu2gOyXrO2VqFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MjIwLCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdvcmQ6XCLroZwg66ek7JqwIOqwgOq5jOyatCDtjrhcIixcclxuICAgICAgICAgICAgc2NvcmU6NSAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDozMDAsICAgICAgICAgXHJcbiAgICAgICAgICAgIHdvcmQ6XCLsl5Ag7J6I7J2MXCIsIFxyXG4gICAgICAgICAgICBzY29yZTo0ICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDo0MDAsICAgICAgICAgIFxyXG4gICAgICAgICAgICB3b3JkOlwi7JeQIOyeiOydjFwiLCBcclxuICAgICAgICAgICAgc2NvcmU6MyAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6NTAwLCAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgd29yZDpcIuuhnCDslb3qsIQg65ao7Ja07KC4IOyeiOuKlCDtjrhcIixcclxuICAgICAgICAgICAgc2NvcmU6MiAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTUwMCwgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdvcmQ6XCLroZwg7IOB64u57Z6IIOuWqOyWtOyguCDsnojripQg7Y64XCIsIFxyXG4gICAgICAgICAgICBzY29yZToxICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuXHJcbiAgICBmbG9hdGluZzpbIC8vYXRtLCBmb29kLCB0cmFuc3BvcnQg7ZWp6rOEICsg7KO867OAIOq0gOq0keyngCDrs7TrhIjsiqQoNTBt7J2064K0IC0gM+ygkOunjOygkCwgMTUwbSAx7KCQKTtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoyNyxcclxuICAgICAgICAgICAgd29yZDpcIuuCtCDri6Trpbgg7KeA7JetIOuMgOu5hCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOyDgeuLue2eiCDrp47snYAg7Y64XCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjYuNVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MjUuNSxcclxuICAgICAgICAgICAgd29yZDpcIuuCtCDri6Trpbgg7KeA7JetIOuMgOu5hCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOq9pCDrp47snYAg7Y64XCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjI0LFxyXG4gICAgICAgICAgICB3b3JkOlwi64K0IOuLpOuluCDsp4Dsl60g64yA67mEIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg7KGw6riIIOunjuydgCDtjrhcIixcclxuICAgICAgICAgICAgc2NvcmU6NFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MjEsXHJcbiAgICAgICAgICAgIHdvcmQ6XCLrgrQg7Y+J6regIOyImOykgOydmCDsnKDrj5nsnbjqtawg7IiY7KSA7J2EIOuztOyehFwiLFxyXG4gICAgICAgICAgICBzY29yZTozXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoxOCxcclxuICAgICAgICAgICAgd29yZDpcIuuCtCDri6Trpbgg7KeA7JetIOuMgOu5hCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOyVveqwhCDsoIHsnYAg7Y64XCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjIuNVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTUsXHJcbiAgICAgICAgICAgIHdvcmQ6XCLrgrQg64uk66W4IOyngOyXrSDrjIDruYQg7KO867OAIOycoOuPmeyduOq1rOqwgCDsoIHsnYAg7Y64XCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjIuMjVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjUsXHJcbiAgICAgICAgICAgIHdvcmQ6XCLrgrQg64uk66W4IOyngOyXrSDrjIDruYQg7KO867OAIOycoOuPmeyduOq1rOqwgCDsg4Hri7ntnogg7KCB7J2AIO2OuFwiLFxyXG4gICAgICAgICAgICBzY29yZToyXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuXHJcbiAgICBmaW5hbFNhZmV0eTpbIC8vc2NvcmUqMyArIG1ldERpZiArIGZsb2F0aW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MjAsIC8v7JiILCDsp4Dsl60gNOygkCwg64KY66i47KeAIO2Pieq3oCwg7KeA7JetIDXsoJAsIOuCmOuouOyngCDstZzslYXsnYAg7JWE64uMIOyImOykgFxyXG4gICAgICAgICAgICB3b3JkOlwi7KGw7Ius7ZWc64uk66m0IOuwpCDriqbqsowg6reA6rCA7ZWgIOuVjOyXkOuPhCDslYjsoITtlZwg7JyE7LmYXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjE4LCAvL+yYiCwg7KeA7JetIDPsoJAsIOuCmOuouOyngCDrqqjrkZAg7KSR7IOB7JyE6raMLCDsp4Dsl60gNOygkCwg64KY66i47KeAIOuCruyngCDslYrsnYxcclxuICAgICAgICAgICAgd29yZDpcIuyhsOyLrO2VnOuLpOuptCDriqbsnYAg7Iuc6rCEIOq3gOqwgO2VoCDrlYzsl5Drj4Qg7YGwIOusuOygnOuKlCDsl4bsnYxcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjE2LCAvL+yYiCwg7KeA7JetIDTsoJAsIOuCmOuouOyngCDstZzslYXsnYAg7JWE64uYLCDsp4Dsl60gM+ygkCwg64KY66i47KeAIOykkeqwhCDsnbTsg4EsIOyngOyXrSAy7KCQIOuCmOuouOyngCDstZzsg4FcclxuICAgICAgICAgICAgd29yZDpcIuuKpuydgCDrsKTsnYQg7ZS87ZWc64uk66m0IOydvOuwmOyggeycvOuhnCDsoIDrhYHsl5Ag6reA6rCA7ZWgIOuVjCDtgbAg66y47KCc64qUIOyXhuydjFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoxMy41LCAvL+yngOyXrSAz7KCQLCDrgpjrqLjsp4Ag7LWc7JWFLCDsp4Dsl60gMuygkFxyXG4gICAgICAgICAgICB3b3JkOlwi7KGw7Ius7Z6IIOuLpOuLkCDtlYTsmpTqsIAg7J6I7Jy866mwLCDriqbsnYAg67Ck7JeQIOq3gOqwgO2VmOuKlCDqsoPsnYAg7IK86rCA64qUIOqyg+ydtCDsoovsnYxcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTEsIC8v7KeA7JetIDLsoJAg64KY66i47KeAIOuCruydgCDtjrgsIOyngOyXrSAx7KCQIOuCmOuouOyngCDspJHqsIQg7J207IOBXHJcbiAgICAgICAgICAgIHdvcmQ6XCLtlbQg7KeEIOydtO2bhOyXkOuKlCDrj4zslYTri6Tri4jripQg6rKD7J2EIOyCvOqwgOuKlCDqsoPsnbQg7KKL7J2MXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjksICAvL+yngOyXrSAx7KCQIFxyXG4gICAgICAgICAgICB3b3JkOlwi64Ku7JeQ64+EIOyViOyghOyXkCDsnKDsnZjtlZjrqbAg64uk64uI64qUIOqyg+ydtCDsoovsnYxcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6NCxcclxuICAgICAgICAgICAgd29yZDpcIuy5mOyViCDrrLjsoJzqsIAg7KSR7JqU7ZWY64uk66m0IOyImeyGjCDsnITsuZjroZwg7KCB7ZWp7ZWcIOyngOyXreydtCDslYTri5hcIlxyXG4gICAgICAgIH1cclxuICAgIF1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZ19TYWZldHk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY29uZmlnL3NhZmV0eS5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldExhdW5kcnkgPSB7XHJcbiAgICBzdGF0aXN0aWM6e25lYXJlc3Q6W119LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEsIGNpdHlOYW1lKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2l0eU5hbWUgPSBjaXR5TmFtZTtcclxuICAgICAgICB0aGlzLmZpcnN0X3NldExhdW5kcnkoKTtcclxuICAgICAgICB0aGlzLnNlY29uZF9tYWtlU2NvcmUoKTtcclxuICAgICAgICB0aGlzLnRoaXJkX3dvcmRpbmcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdGhpcmRfd29yZGluZzogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciBsYXVuZHJ5ID0gaG90ZWwubG9jYWwubGF1bmRyeTtcclxuXHJcbiAgICAgICAgICAgIGlmKGxhdW5kcnkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IGRpZlRvTWluKGxhdW5kcnkubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLmxhdW5kcnkgPSBg7IiZ7IaM7JeQ7IScIOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyEuO2DgeyGjOqwgCDsnojsnYxgO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5sYXVuZHJ5ID0gJ+yImeyGjCDrj4Trs7QgMTDrtoTqsbDrpqwg7J2064K07JeQIOyEuO2DgeyGjOuKlCDsobTsnqztlZjsp4Ag7JWK7JWEIOq4tCDsl6ztlonsi5wg67aI7Y647ZWgIOyImCDsnojsnYwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZWNvbmRfbWFrZVNjb3JlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBzY29yZUFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgbGV0IGxhdW5kcnkgPSBob3RlbC5sb2NhbC5sYXVuZHJ5O1xyXG5cclxuICAgICAgICAgICAgaWYobGF1bmRyeSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSAoNTAwIC0gbGF1bmRyeS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICBzY29yZUFycmF5LnB1c2goe2hpZDpoaWQsc2NvcmU6c2NvcmV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5sYXVuZHJ5LnNjb3JlLnBlcmNlbnRpbGU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcmVBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaGlkID0gc2NvcmVBcnJheVtpXS5oaWQ7XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCByYW5rID0gKChpKzEpIC8gdG90YWwpOyAvLyDrsLHrtoTsnIQgLSAwfjEgKOuGkuydhOyImOuhnSAw7JeQIOqwgOq5jOybgClcclxuICAgICAgICAgICAgdmFyIHBlcmNlbnRpbGUgPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlzUmFua2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJhbmtTeXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKCFpc1JhbmtlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbnVzID0gcGVyY2VudGlsZTtcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50aWxlICs9IHJhbmtTeXNbal07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhbms8cGVyY2VudGlsZSl7ICAvLzM1JSDslYjsl5Ag65Ok66m0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmsgLT0gbWludXM7ICAgLy9yYW5r66W8IDB+MC4y66GcIOunnuy2sOykjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSA9ICgxMC1qKSAtIE1hdGguY2VpbCgocmFuay9yYW5rU3lzW2pdKSoxMCkvMTA7IC8vcmFuaygwfjAuMinrpbwgMC4y66GcIOuCmOuIiOqwkioxMC8xMCAtPiAwfjAuOeqwgCDrgpjsmLRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSYW5rZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudCl7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50LnNjb3JlKXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlLmxhdW5kcnkgPSBzY29yZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUgPSB7bGF1bmRyeTpzY29yZX07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZTp7bGF1bmRyeTpzY29yZX0sXHJcbiAgICAgICAgICAgICAgICAgICAgd29yZDp7bGF1bmRyeTpcIlwifVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICBsZXQgbGF1bmRyeSA9IGhvdGVsLmxvY2FsLmxhdW5kcnk7XHJcblxyXG4gICAgICAgICAgICBpZighbGF1bmRyeSl7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50LnNjb3JlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5sYXVuZHJ5ID0gNTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZSA9IHtsYXVuZHJ5OjV9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOntsYXVuZHJ5OjV9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkOntsYXVuZHJ5OlwiXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlyc3Rfc2V0TGF1bmRyeTogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmxhdW5kcnkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDp7ZGlmOkNvbmZpZy5sYXVuZHJ5Lm5lYXJTdGR9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbGRBcnIgPSB0aGlzLmRhdGEubG9jYWwubGF1bmRyeTtcclxuICAgICAgICAgICAgbGV0IGhhc0xEID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxkQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGF1bmRyeSA9IGxkQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IGNhbGN1bGF0ZURpZihob3RlbC5jb29yLCBsYXVuZHJ5LmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRpZjxDb25maWcubGF1bmRyeS5uZWFyU3RkKXtcclxuICAgICAgICAgICAgICAgICAgICBoYXNMRCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhdW5kcnlfYyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcjpsYXVuZHJ5LmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6bGF1bmRyeS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6ZGlmLnRvRml4ZWQoMCkqMVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlmPGhvdGVsLmxvY2FsLmxhdW5kcnkubmVhcmVzdC5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5sYXVuZHJ5Lm5lYXJlc3QgPSBsYXVuZHJ5X2M7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFoYXNMRCl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5sYXVuZHJ5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmVzdC5wdXNoKGhvdGVsLmxvY2FsLmxhdW5kcnkubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0TGF1bmRyeTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0TGF1bmRyeS5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldENvbnZpbmllbmNlID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2l0eU5hbWUpe1xyXG4gICAgICAgIGxldCBzY29yZUFycmF5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIGRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgd29yZCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgdHlwZSBpbiBob3RlbC5hc3Nlc3NtZW50LnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlID09PSBcInNhZmV0eVwiIHx8IHR5cGUgPT09IFwidHJhbnNwb3J0XCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRpV29yZCA9IGhvdGVsLmFzc2Vzc21lbnQud29yZFt0eXBlXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kaVNjb3JlID0gaG90ZWwuYXNzZXNzbWVudC5zY29yZVt0eXBlXTtcclxuICAgICAgICAgICAgICAgICAgICB3b3JkLnB1c2goaW5kaVdvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGluZGlTY29yZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgaG90ZWwuYXNzZXNzbWVudC5zY29yZVt0eXBlXTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgaG90ZWwuYXNzZXNzbWVudC53b3JkW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaCh7aGlkOmhpZCxzY29yZTpzY29yZX0pO1xyXG4gICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQuY29udmluaWVuY2UgPSB3b3JkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG4gICAgICAgIHZhciByYW5rU3lzID0gQ29uZmlnLmF0bS5zY29yZS5wZXJjZW50aWxlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IHNjb3JlQXJyYXlbaV0uaGlkO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICB2YXIgcmFuayA9ICgoaSsxKSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoMTAtaikgLSBNYXRoLmNlaWwoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuY29udmluaWVuY2UgPSBzY29yZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNjb3JlPjkpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLmNvbnZpbmllbmNlLnB1c2goYCR7Y2l0eU5hbWV9IOuCtCDri6Trpbgg7IiZ7IaM65OkIOuMgOu5hCDso7zrs4Ag7Y647J2Y7Iuc7ISk7J20IOq1ieyepe2eiCDsnpgg7ZiV7ISx65CY7Ja0IO2OuOumrO2VmOqyjCDsl6ztlontlaAg7IiYIOyeiOydjGApO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihzY29yZT44KXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5jb252aW5pZW5jZS5wdXNoKGAke2NpdHlOYW1lfSDrgrQg64uk66W4IOyImeyGjOuTpCDrjIDruYQg7KO867OAIO2OuOydmOyLnOyEpOydtCDsnpgg7ZiV7ISx65CcIO2OuOydtOudvCDtjrjrpqztlZjqsowg7Jes7ZaJ7ZWgIOyImCDsnojsnYxgKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Nyl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQuY29udmluaWVuY2UucHVzaChgJHtjaXR5TmFtZX0g64K07JeQ7IScIOyjvOuzgCDtjrjsnZjsi5zshKTsnYAg7Y+J6regIOydtOyDgSDsoJXrj4TroZwg7J6YIOqwluy2lOyWtOyguCDsnojsnYxgKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Nil7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQuY29udmluaWVuY2UucHVzaChgJHtjaXR5TmFtZX0g64K07JeQ7IScIOyjvOuzgCDtjrjsnZjsi5zshKTsnYAg7Y+J6reg7JeQ7IScIOyVveqwhCDrqrsg66+47LmY64qUIOygleuPhOuhnCDtmJXshLHrkJjslrQg7J6I7J2MYCk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHNjb3JlPjUpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLmNvbnZpbmllbmNlLnB1c2goYCR7Y2l0eU5hbWV9IOuCtCDri6Trpbgg7IiZ7IaM65OkIOuMgOu5hCDso7zrs4Ag7Y647J2Y7Iuc7ISk7J2AIOyhsOq4iOyUqSDqsbDrpqzqsIAg7J6I64qUIO2OuGApO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5jb252aW5pZW5jZS5wdXNoKGAke2NpdHlOYW1lfSDrgrQg64uk66W4IOyImeyGjOuTpCDrjIDruYQg7KO867OAIO2OuOydmOyLnOyEpOuTpOydgCDrqYDrpqwg7J6I64qUIO2OuGApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0Q29udmluaWVuY2U7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldENvbnZpbmllbmNlLmpzIiwidmFyIFNldEFyZWEgPSB7XHJcbiAgICBtYXA6e30sXHJcbiAgICBtYXJrZXI6e30sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24gKGNpdHlOYW1lLCBjaWQpIHtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5tYXJrZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyW2hpZF0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyID0ge307XHJcblxyXG4gICAgICAgICAgICB2YXIgdHh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGgyPicgKyBjaXR5TmFtZSArICcg7IiZ7IaMIOyngOyXrSDqtazrtoQ8L2gyPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiY2l0eUFyZWFfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgaWQ9XCJjaXR5QXJlYV9fbWFwXCI+PC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiXCJjaXR5QXJlYT4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eUFyZWFfX3dvcmRcIj48L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjaWQ9XCInICsgY2lkICsgJ1wiIGNsYXNzPVwiY2l0eUFyZWFfX2ZpbmlzaFwiPuyZhOujjOyymOumrDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JzsgLy9jbG9zZSB3cmFwcGVyXHJcblxyXG4gICAgICAgICAgICAkKFwiLnBhZ2VzLmhvdGVsXCIpLmh0bWwodHh0KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5QXJlYV9fbWFwJyksIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogNDAuNzQzMTk1NzkzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzogLTczLjk4OTE3OTU0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgem9vbTogMTNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhcmVhID0ge307XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9BcmVhID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuYXJlYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhLmFyZWFbaV0ubm90QXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmVhQ29vciA9IGRhdGEuYXJlYVtpXS5jb29yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5BcmVhKGhvdGVsLmNvb3IsIGFyZWFDb29yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXJlYSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0FyZWEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub0FyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcltoaWRdID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBob3RlbC5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJycgKyBoaWRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcmVhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvaG90ZWxzJykudXBkYXRlKGRhdGEuaG90ZWxzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldEFyZWE7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==