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

var _hotel = __webpack_require__(17);

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

var _spot = __webpack_require__(16);

var _spot2 = _interopRequireDefault(_spot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View = {
  map: {},
  data: {},

  inflateCity: function inflateCity(cid) {
    var _this = this;

    firebase.database().ref("cities/" + cid).once("value", function (snap) {
      var data = snap.val();
      _metro2.default.init(data);
      _spot2.default.init(data);
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
    $(".view").on("click", ".click_metro", function () {
      _metro2.default.clickMode();
    });
    $(".view").on("click", ".click_metroSpot", function () {
      _metro2.default.clickSpotMode();
    });
    $(".view").on("focusout", ".setter__radius__input", function () {
      _metro2.default.changeRadius();
    });
    $(".view").on("click", ".spot_full", function () {
      _spot2.default.full();
    });
    $(".view").on("click", ".spot_core", function () {
      _spot2.default.core();
    });
    $(".view").on("click", ".spot_disable", function () {
      _spot2.default.disable();
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
    txt += "<div class='setter'><h3></h3><div class='setter__content'></div></div>";
    txt += "<div class='viewer'></div>";
    txt += "</div>";
    txt += "</div>";
    $(".pages.view").html(txt);

    var header = {
      "메트로": [{ ko: "지우기", en: "metro_disable" }, { ko: "전체 노선", en: "metro_full" }, { ko: "핵심 노선", en: "metro_core" }],
      "관광지": [{ ko: "지우기", en: "spot_disable" }, { ko: "전체 관광지", en: "spot_full" }, { ko: "핵심 관광지", en: "spot_core" }],
      "클릭 추적": [{ ko: "지하철 노선만", en: "click_metro" }, { ko: "지하철과 관광지", en: "click_metroSpot" }]
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
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "poi",
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
        "featureType": "poi.park",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "labels",
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
    _spot2.default.map = this.map;
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
    radius: 500,

    init: function init(data) {
        this.data = data;

        //기존 세팅 초기화
        for (var line in this.polyLine) {
            this.polyLine[line].setMap(null);
        }
        this.polyLine = {};
        if (this.marker) {
            //기존 마커 초기화
            this.marker.setMap(null);
        }
        for (var i = 0; i < this.markerSet.length; i++) {
            this.markerSet[i].setMap(null);
        }
        this.markerSet = [];

        var metroLine = data.metroLine;
        for (var _line in metroLine) {
            if (metroLine[_line].stn) {
                var polyLine = [];
                for (var _i = 0; _i < metroLine[_line].stn.length; _i++) {
                    if (metroLine[_line].stn[_i].coor) {
                        polyLine.push(metroLine[_line].stn[_i].coor);
                    }
                }
                this.polyLine[_line] = new google.maps.Polyline({
                    path: polyLine,
                    strokeColor: metroLine[_line].color,
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
            }
        }
    },

    full: function full() {
        $(".view .setter h3").html('전체 노선');
        $(".view .setter__content").html('');
        $(".view .viewer").html('');
        if (this.marker) {
            //기존 마커 초기화
            this.marker.setMap(null);
        }
        google.maps.event.clearListeners(this.map, 'click');

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(this.map);
        }
        for (var i = 0; i < this.markerSet.length; i++) {
            this.markerSet[i].setMap(null);
        }
        this.markerSet = [];
    },

    disable: function disable() {
        $(".view .setter h3").html('');
        $(".view .setter__content").html('');
        $(".view .viewer").html('');
        if (this.marker) {
            //기존 마커 초기화
            this.marker.setMap(null);
        }
        google.maps.event.clearListeners(this.map, 'click');

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(null);
        }
        for (var i = 0; i < this.markerSet.length; i++) {
            this.markerSet[i].setMap(null);
        }
        this.markerSet = [];
    },

    clickMode: function clickMode() {
        $(".view .setter h3").html('클릭 추적 - 지하철 노선만');
        var that = this;

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(null);
        }
        google.maps.event.clearListeners(this.map, 'click');
        this.map.addListener('click', function (e) {
            that.findMetro(e);
        });

        var txt = '';
        txt += '<div class="setter__radius">';
        txt += '<span class="setter__txt">탐색반경 </span>';
        txt += '<input class="setter__radius__input" value="' + this.radius + '">';
        txt += '</div>';

        $(".view .setter__content").html(txt);
    },

    clickSpotMode: function clickSpotMode() {
        $(".view .setter h3").html('클릭 추적 - 지하철 노선과 연관 관광지');
        var that = this;

        for (var line in this.polyLine) {
            this.polyLine[line].setMap(null);
        }
        google.maps.event.clearListeners(this.map, 'click');
        this.map.addListener('click', function (e) {
            that.findMetroSpot(e);
        });

        var txt = '';
        txt += '<div class="setter__radius">';
        txt += '<span class="setter__txt">탐색반경 </span>';
        txt += '<input class="setter__radius__input" value="' + this.radius + '">';
        txt += '</div>';

        $(".view .setter__content").html(txt);
    },
    changeRadius: function changeRadius() {
        var input = $(".setter__radius__input").val() * 1;
        if (isNaN(input)) {
            toast("숫자만 입력해주세요");
        } else if (input > 100 && input < 601) {
            this.radius = input;
        } else {
            toast("100~600 사이로 입력해주세요");
        }
    },

    findMetroSpot: function findMetroSpot(e) {
        var lineObj = {}; //key:라인명, value:{stn:station, dif:dif}
        var stnArr = [];
        var spotObj = {};

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

        for (var _i2 = 0; _i2 < metros.length; _i2++) {
            var metro = metros[_i2];
            var dif = calculateDif(clickCoor, metro.coor);
            metro.dif = dif;

            if (dif < this.radius) {
                stnArr.push(metro);

                for (var j = 0; j < metro.line.length; j++) {
                    var _line2 = metro.line[j];

                    if (lineObj[_line2]) {
                        //이미 있으면 짧을 때만 덮어씌움
                        if (dif < lineObj[_line2].dif) {
                            lineObj[_line2] = metro;
                        }
                    } else {
                        //없으면 새로 추가
                        lineObj[_line2] = metro;
                    }
                }
            }
        }

        stnArr.sort(function (a, b) {
            return a.dif - b.dif;
        });

        var txt = '';
        txt += '<div class="metro__info">';

        for (var _i3 = 0; _i3 < stnArr.length; _i3++) {
            var stn = stnArr[_i3];

            txt += '<div class="metro__info__stn">';

            txt += '<p class="metro__info__stn__name">' + stn.name + '역</p>';
            txt += '<div class="metro__info__stn__line">';

            for (var _j = 0; _j < stn.line.length; _j++) {
                var _line3 = stn.line[_j];
                var color = this.data.metroLine[_line3].color;
                var fontColor = "#fff";
                if (this.data.metroLine[_line3].fontColor) {
                    fontColor = this.data.metroLine[_line3].fontColor;
                }

                var marker = new google.maps.Marker({
                    position: stn.coor,
                    map: this.map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        strokeColor: color,
                        scale: 8 - _j * 2,
                        strokeWeight: 2
                    }
                });
                this.markerSet.push(marker);

                txt += '<p class="metro__info__lineName" style="background:' + color + '; color:' + fontColor + '">' + _line3 + '</p>';
            }
            txt += '<p class="metro__info__stn__dif">' + Math.round(stn.dif) + 'm</p>';

            txt += '</div>';
            txt += '</div>';
        }
        console.log(lineObj);

        for (var _line4 in lineObj) {
            if (this.polyLine[_line4]) {
                this.polyLine[_line4].setMap(this.map);
                var _dif = lineObj[_line4].dif;
                var spots = this.data.metroLine[_line4].spot;

                for (var _i4 = 0; _i4 < spots.length; _i4++) {
                    var rank = spots[_i4].rank;

                    if (this.radius > spots[_i4].dif) {
                        if (spotObj[rank]) {
                            var oldDif = spotObj[rank].dif.hotel + spotObj[rank].dif.spot;
                            var newDif = spots[_i4].dif + _dif;

                            if (oldDif > newDif) {
                                spotObj[rank] = spots[_i4];
                                spotObj[rank].stn = {
                                    spot: spots[_i4].stn.name,
                                    hotel: lineObj[_line4].name
                                };
                                spotObj[rank].line = _line4;
                                spotObj[rank].dif = {
                                    hotel: _dif, //숙소에서 가까운 메트로까지의 dif
                                    spot: spots[_i4].dif //메트로에서 스팟까지의 dif
                                };
                            }
                        } else {
                            spotObj[rank] = spots[_i4];
                            spotObj[rank].stn = {
                                spot: spots[_i4].stn.name,
                                hotel: lineObj[_line4].name
                            };
                            spotObj[rank].line = _line4;
                            spotObj[rank].dif = {
                                hotel: _dif, //숙소에서 가까운 메트로까지의 dif
                                spot: spots[_i4].dif //메트로에서 스팟까지의 dif
                            };
                        }
                    }
                }
            }
        }
        console.log(spotObj);

        txt += '<div class="spot__info">';

        txt += '<div class="spot__info__line">';
        txt += '<p class="spot__info__name">관광지명</p>';
        txt += "<p class=\"spot__info__lineName--txt\">\uB178\uC120</p>";
        txt += "<p class=\"spot__info__stnName\">\uC5ED\uBA85</p>";
        txt += "<p class=\"spot__info__distance\">\uC5ED\uC5D0\uC11C \uAC70\uB9AC</p>";
        txt += '</div>';

        for (var _rank in spotObj) {
            var spot = spotObj[_rank];
            var _line5 = spot.line;

            var _color = this.data.metroLine[_line5].color;
            var _fontColor = "#fff";
            if (this.data.metroLine[_line5].fontColor) {
                _fontColor = this.data.metroLine[_line5].fontColor;
            }
            var _dif2 = Math.round(spot.dif.spot);

            txt += '<div class="spot__info__line">';
            txt += '<p class="spot__info__name">' + spot.name.ko + '</p>';
            txt += "<p class=\"spot__info__lineName\" style=\"background:" + _color + "; color:" + _fontColor + "\">" + _line5 + "</p>";
            txt += "<p class=\"spot__info__stnName\">" + spot.stn.spot + "\uC5ED</p>";
            txt += "<p class=\"spot__info__distance\">" + _dif2 + "</p>";
            txt += '</div>';
        }

        txt += '</div>';

        $(".view .viewer").html(txt);
    },

    findMetro: function findMetro(e) {
        var lineObj = {}; //key:라인명, value:{stn:station, dif:dif}
        var stnArr = [];

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

        for (var _i5 = 0; _i5 < metros.length; _i5++) {
            var metro = metros[_i5];
            var dif = calculateDif(clickCoor, metro.coor);
            metro.dif = dif;

            if (dif < this.radius) {
                stnArr.push(metro);

                for (var j = 0; j < metro.line.length; j++) {
                    var _line6 = metro.line[j];

                    if (lineObj[_line6]) {
                        //이미 있으면 짧을 때만 덮어씌움
                        if (dif < lineObj[_line6].dif) {
                            lineObj[_line6] = metro;
                        }
                    } else {
                        //없으면 새로 추가
                        lineObj[_line6] = metro;
                    }
                }
            }
        }

        stnArr.sort(function (a, b) {
            return a.dif - b.dif;
        });

        var txt = '';
        txt += '<div class="metro__info">';

        for (var _i6 = 0; _i6 < stnArr.length; _i6++) {
            var stn = stnArr[_i6];

            txt += '<div class="metro__info__stn">';

            txt += '<p class="metro__info__stn__name">' + stn.name + '역</p>';
            txt += '<div class="metro__info__stn__line">';

            for (var _j2 = 0; _j2 < stn.line.length; _j2++) {
                var _line7 = stn.line[_j2];
                var color = this.data.metroLine[_line7].color;
                var fontColor = "#fff";
                if (this.data.metroLine[_line7].fontColor) {
                    fontColor = this.data.metroLine[_line7].fontColor;
                }

                var marker = new google.maps.Marker({
                    position: stn.coor,
                    map: this.map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        strokeColor: color,
                        scale: 8 - _j2 * 2,
                        strokeWeight: 2
                    }
                });
                this.markerSet.push(marker);

                txt += '<p class="metro__info__lineName" style="background:' + color + '; color:' + fontColor + '">' + _line7 + '</p>';
            }
            txt += '<p class="metro__info__stn__dif">' + Math.round(stn.dif) + 'm</p>';

            txt += '</div>';
            txt += '</div>';
        }

        for (var _line8 in lineObj) {
            if (this.polyLine[_line8]) {
                this.polyLine[_line8].setMap(this.map);
            }
        }

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
var View_Spot = {
    markerLabel: [],

    full: function full() {
        for (var i = 0; i < this.markerLabel.length; i++) {
            var marker = this.markerLabel[i][0];
            var label = this.markerLabel[i][1];
            marker.setMap(this.map);
            if (label.getMap() !== this.map) {
                label.setMap(this.map);
            }
        }
    },

    disable: function disable() {
        for (var i = 0; i < this.markerLabel.length; i++) {
            var marker = this.markerLabel[i][0];
            var label = this.markerLabel[i][1];
            marker.setMap(null);
            label.setMap(null);
        }
    },

    core: function core() {
        this.disable();
        for (var i = 0; i < 20; i++) {
            var marker = this.markerLabel[i][0];
            var label = this.markerLabel[i][1];
            marker.setMap(this.map);
            label.setMap(this.map);
        }
    },

    init: function init(data) {
        var spots = data.spots.ranked;
        this.data = spots;
        for (var i = 0; i < spots.length; i++) {
            var spot = spots[i];
            var marker = new google.maps.Marker({
                position: spot.coor,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeColor: '#555',
                    fillColor: '#555',
                    fillOpacity: 1,
                    scale: 2
                }
            });
            var latLng = new google.maps.LatLng(spot.coor.lat, spot.coor.lng);

            var label = new MapLabel({
                text: spot.name.ko,
                position: latLng,
                fontSize: 16,
                align: 'left'
            });
            this.markerLabel.push([marker, label]);
        }
        console.log(data);
    }
};

exports.default = View_Spot;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setHotelInfo = __webpack_require__(18);

var _setHotelInfo2 = _interopRequireDefault(_setHotelInfo);

var _setArea = __webpack_require__(26);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setATM = __webpack_require__(19);

var _setATM2 = _interopRequireDefault(_setATM);

var _setFood = __webpack_require__(20);

var _setFood2 = _interopRequireDefault(_setFood);

var _setMetro = __webpack_require__(21);

var _setMetro2 = _interopRequireDefault(_setMetro);

var _setSafety = __webpack_require__(22);

var _setSafety2 = _interopRequireDefault(_setSafety);

var _setLaundry = __webpack_require__(24);

var _setLaundry2 = _interopRequireDefault(_setLaundry);

var _setConvinience = __webpack_require__(25);

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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _safety = __webpack_require__(23);

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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2JhNDY5ZGI3Njg5YTQxNmZhNDMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY29uZmlnLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvZ2VvQ29kZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9hdHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvY2l0eS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9jaXR5L21ldHJvTGluZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvZmlyc3RfY2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9hdXRvQ29tYmluZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L3Nlb25kX2NvbWJpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC90aGlyZF9maW5hbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9hY2NvdW50LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3N1YndheS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy92aWV3LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3ZpZXcvbWV0cm8uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvdmlldy9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0QVRNLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRGb29kLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRNZXRyby5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0U2FmZXR5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL2NvbmZpZy9zYWZldHkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldExhdW5kcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldENvbnZpbmllbmNlLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhLmpzIl0sIm5hbWVzIjpbIkNvbmZpZyIsIm1ldHJvIiwibmVhclN0ZCIsInNjb3JlIiwicGVyY2VudGlsZSIsImxhdW5kcnkiLCJmb29kIiwia2luZCIsImJha2VyeSIsIm5hbWUiLCJ0eXBlIiwiam9zYSIsInN0ZCIsImdyb2NlcnkiLCJzZXZlbiIsImZhbWlseSIsImxhd3NvbiIsImxhcmdlIiwibXVsdGlwbGUiLCJjdnMiLCJ3ZWlnaHQiLCJuZWFyZXN0IiwiaW4yNTAiLCJ3b3JkIiwiaW50ZWdyYXRlIiwiYmFuazI0IiwiYXRtIiwiaW4xMzAiLCJHZW9Db2RlIiwiaW5pdCIsImFyciIsInJlZiIsImZpcmViYXNlIiwiZGF0YWJhc2UiLCJvbmNlIiwiZGF0YSIsInNuYXAiLCJ2YWwiLCJsZW5ndGgiLCJzZXQiLCJjb2RlIiwidG9hc3QiLCJ0aGF0IiwiZ2VvY29kZXIiLCJnb29nbGUiLCJtYXBzIiwiR2VvY29kZXIiLCJhZGRyZXNzIiwiYWlkIiwiZ2VvY29kZSIsInJlc3VsdHMiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwiY29vciIsImxhdCIsImdlb21ldHJ5IiwibG9jYXRpb24iLCJsbmciLCJzaGlmdCIsInNldFRpbWVvdXQiLCJyZWxvYWQiLCJpbml0aWFsaXplZCIsInVfaSIsIk5hdl9mdW5jdGlvbiIsImF0dGVuZCIsInRvZG8iLCJjaXR5IiwidmlldyIsImFjY291bnQiLCJzcG90IiwiY2FsYyIsImhvdGVsIiwibGluayIsImxvZ2luIiwiJCIsImh0bWwiLCJhdHRyIiwiY2xpY2siLCJjb25maXJtIiwiYXV0aCIsInNpZ25PdXQiLCJ0aGVuIiwid2luZG93IiwiY2F0Y2giLCJlcnJvciIsImRvY3VtZW50IiwicmVhZHkiLCJwcm92aWRlciIsIkdvb2dsZUF1dGhQcm92aWRlciIsIm9uQXV0aFN0YXRlQ2hhbmdlZCIsInVzZXIiLCJtYWlsIiwiZW1haWwiLCJzcGxpdCIsImdyYWRlIiwic2lnbkluV2l0aFBvcHVwIiwicmVzdWx0IiwidXNlck1haWwiLCJkaXNwbGF5TmFtZSIsInNldHRpbmciLCJvcmRlciIsImVycm9yQ29kZSIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjcmVkZW50aWFsIiwiaGFzQ2xhc3MiLCJpdGVtIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInBhcmVudCIsIkF0dGVuZCIsIm1vYmlsZSIsImlkIiwidmlld0lEIiwiYXR0ZW5kT2JqIiwic2FsYXJ5Iiwid2Vla2RheXMiLCJ0eHQiLCJ1c2VycyIsIm1haWxJRCIsInByb3AiLCJvbiIsImluZmxhdGVfY2FsZW5kYXIiLCJmdWxsQ2FsZW5kYXIiLCJoZWlnaHQiLCJmaXJzdERheSIsInZpZXdSZW5kZXIiLCJlbGVtZW50IiwiZGF5Q2xpY2siLCJkYXRlIiwiaW5wdXRXb3JrSG91ciIsImxpc3RlbmVyIiwic2V0V29ya0hvdXIiLCJrZXl1cCIsImUiLCJ3aGljaCIsImNoYW5nZSIsInZpZXdfd29ya2VyIiwib2ZmIiwieW8iLCJkYXRlSUQiLCJzbGljZSIsImRpZiIsImZyb20iLCJ0byIsImkiLCJNYXRoIiwiZmxvb3IiLCJkdXJNb24iLCJ0aGlzTW9udGgiLCJkYXRlRG9tIiwiZXEiLCJqIiwid2Vla0RvbSIsIndlZWtEdXIiLCJkYXlEb20iLCJmaW5kIiwiayIsImNoaWxkcmVuIiwiYXBwZW5kIiwiZnVsbE1vbnRoQm9udXMiLCJpbnN1cmFuY2VGZWUiLCJiYXNpYyIsInJvdW5kIiwiZnVsbFdlZWtCdW51cyIsImNvbW1hIiwiZGF0ZU9iaiIsImRhdGVTaG9ydCIsIm1vbWVudCIsImZvcm1hdCIsIkFueVBpY2tlciIsImRhdGVUaW1lRm9ybWF0IiwiZm9jdXMiLCJ3b3JrIiwiYWxsRW1wdHkiLCJyZW1vdmUiLCJhbGVydCIsImZyb21BIiwidG9BIiwicHVzaCIsIkNpdHkiLCJyZWZyZXNoU3RhdHVzIiwiY2lkIiwidHJhbnNwb3J0IiwiaW5mbGF0ZSIsImFyZWEiLCJwcmljZSIsImhvdGVscyIsIk9iamVjdCIsImtleXMiLCJhc3Nlc3NtZW50IiwidXBkYXRlIiwibWV0cm9MaW5lIiwiTWV0cm9MaW5lIiwiY3JlYXRlIiwibGluZSIsIm1ha2VMaW5lIiwic3RuQXJyIiwic3RuIiwib3JkZXJBcnIiLCJzdGFydCIsImVuZCIsImlkeCIsInNwbGljZSIsIm1heCIsIm5leHQiLCJzcGxpY2VJZHgiLCJ0YXJnZXQiLCJjYWxjdWxhdGVEaWYiLCJueWMiLCJBIiwiQiIsIkMiLCJEIiwiRSIsIkYiLCJHIiwiSiIsIkwiLCJNIiwiTiIsIlEiLCJSIiwiVyIsIloiLCJzcG90cyIsInJhbmtlZCIsIm1ldHJvcyIsImxvY2FsIiwidGVtcExpbmUiLCJoYXNTcG90IiwidGVtcERpZiIsImVudGVyYW5jZSIsImVudCIsInJhbmsiLCJTcG90IiwiY2l0aWVzIiwiY3VycmVudCIsImluZmxhdGVfc3RhdHVzIiwiaW5mbGF0ZV9jaXR5IiwidWlkIiwicmVtb3ZlX3Nwb3QiLCJyZWRvX3JlbW92ZSIsIm9yZGVyQXJyYXkiLCJjaGFuZ2VkIiwic29ydCIsImEiLCJiIiwic3RhdHVzQXJyYXkiLCJjaXR5TmFtZSIsIkZpcnN0X0NoZWNrIiwic2V0UmVtYWluTnVtYmVyIiwic2lkIiwic2l0ZU5vZGF0YSIsImRlbGV0ZVNwb3QiLCJpbnB1dENvb3JkaW5hdGUiLCJzaXRlIiwibnVtYmVyIiwiY3V0Tm8iLCJ0cmltIiwiY3V0T2JqIiwibm8iLCJkZWxldGVkIiwiY29vclR4dCIsImlzTmFOIiwiaGFzUHJvYmxlbSIsInNlYXJjaFVybCIsInNpdGVPYmoiLCJnZyIsIm52IiwidGEiLCJscCIsInNpdGVIYXNQcm9ibGVtIiwibm9Db29yIiwibm9Db29yVHh0Iiwibm9TcG90Iiwibm9TcG90VHh0Iiwibm9kYXRhIiwiaGFzQ29vciIsImxhcmdlT0siLCJsYXJnZURhdGEiLCJzY3JvbGxUb3AiLCJBdXRvQ29tYmluZSIsInNpdGVBcnIiLCJjb21iaW5pbmciLCJjb3VudGVyIiwibm9EYXRhIiwib2xkU3BvdCIsImtvIiwiZW4iLCJ0ZXN0IiwidXJsIiwidGFnIiwiY29tYmluZU9iaiIsImNvbWJpbmVkIiwiY29tYmluZSIsImhhc0NvbWJpbmVkIiwidENvZGUiLCJ0U3BvdCIsImtleSIsIlNlY29uZF9jb21iaW5lIiwiVGhpcmRfZmluYWxpemUiLCJ0ZW1wIiwic3BvdE9iaiIsInNwb3ROYW1lIiwicmFua0FyciIsInNwb3RUb3RhbCIsImluZGl2aWR1YWxBcnIiLCJtaW5SYW5rIiwic3FydCIsInJhbmtpbmciLCJwdXNoQXJyIiwiQWNjb3VudCIsIlN1YndheSIsIm1hcCIsIm1hcmtlciIsIk1hcCIsImdldEVsZW1lbnRCeUlkIiwiY2VudGVyIiwiem9vbSIsIm1hcFR5cGVDb250cm9sIiwic2NhbGVDb250cm9sIiwiZnVsbHNjcmVlbkNvbnRyb2wiLCJhZGRMaXN0ZW5lciIsImZpbmRTdWJ3YXkiLCJsYXRMbmciLCJzZXRNYXAiLCJNYXJrZXIiLCJwb3NpdGlvbiIsIm1ldHJvSW5mbyIsIm1ldHJvQnlTdG4iLCJtZXRyb05hbWUiLCJjb25jYXQiLCJtZXRBcnJheSIsIm1ldFN0bkFycmF5IiwiY2VpbCIsIlZpZXciLCJpbmZsYXRlQ2l0eSIsImZ1bGwiLCJkaXNhYmxlIiwiY2xpY2tNb2RlIiwiY2xpY2tTcG90TW9kZSIsImNoYW5nZVJhZGl1cyIsImNvcmUiLCJoZWFkZXIiLCJoVHh0IiwiZGlzYWJsZURlZmF1bHRVSSIsInN0eWxlcyIsIlZpZXdfTWV0cm8iLCJwb2x5TGluZSIsIm1hcmtlclNldCIsInJhZGl1cyIsIlBvbHlsaW5lIiwicGF0aCIsInN0cm9rZUNvbG9yIiwiY29sb3IiLCJzdHJva2VPcGFjaXR5Iiwic3Ryb2tlV2VpZ2h0IiwiZXZlbnQiLCJjbGVhckxpc3RlbmVycyIsImZpbmRNZXRybyIsImZpbmRNZXRyb1Nwb3QiLCJpbnB1dCIsImxpbmVPYmoiLCJjbGlja0Nvb3IiLCJmb250Q29sb3IiLCJpY29uIiwiU3ltYm9sUGF0aCIsIkNJUkNMRSIsInNjYWxlIiwib2xkRGlmIiwibmV3RGlmIiwiVmlld19TcG90IiwibWFya2VyTGFiZWwiLCJsYWJlbCIsImdldE1hcCIsImZpbGxDb2xvciIsImZpbGxPcGFjaXR5IiwiTGF0TG5nIiwiTWFwTGFiZWwiLCJ0ZXh0IiwiZm9udFNpemUiLCJhbGlnbiIsIkhvdGVsIiwiaGlkIiwiY2hlY2siLCJhbGVydE1vZGFsIiwiU2V0SG90ZWxJbmZvIiwiY2hlY2tUeHQiLCJ2aXNhIiwiY2l0aSIsInNhZmV0eSIsInRoZW1lIiwiY29udmVuaWVuY2UiLCJBcnJheSIsImlzQXJyYXkiLCJTZXRBVE0iLCJzdGF0aXN0aWMiLCJieUFyZWEiLCJmaXJzdF9ieUhvdGVscyIsInNlY29uZF9ieUFyZWFzIiwiZmlmdGhfbWFrZVNjb3JlIiwic2l4dGhfd29yZGluZyIsImF0bUFyciIsImF0bU9iaiIsIm93bmVyIiwiaW5jbHVkZXMiLCJwbGFjZU5hbWUiLCJzdW0iLCJub3RBcmVhIiwiYXRtcyIsIm1pbnVzIiwidG9GaXhlZCIsInNjb3JlQXJyYXkiLCJ0b3RhbCIsInJhbmtTeXMiLCJpc1JhbmtlZCIsImRpZlRvTWluIiwiU2V0Rm9vZCIsIm5lYXJieSIsImZpcnN0X2dlb0NvZGUiLCJzZWNvbmRfc2V0Rm9vZCIsInRoaXJkX2J5QXJlYXMiLCJmb3VydGhfbWFrZVN0YXRzIiwiZ2RpZiIsIm5lYXJlc3REaWYiLCJzdGF0IiwiZm9vZHMiLCJpc1NvbWVGb29kIiwiZ3JvQXJyIiwiZm9vZEFyciIsImNvcHkiLCJleHRlbmQiLCJuZWFyNSIsImdlb0FyciIsImlzR2VvTmVlZGVkIiwiU2V0TWV0cm8iLCJmaXJzdF9zZXRNZXRybyIsInRoaXJkX21ha2VTY29yZSIsImZvdXJ0aF93b3JkaW5nIiwidG90YWxMaW5lIiwidHh0QXJyIiwibmVhcmVzdFN0biIsImxpbmVObyIsImJ5TGluZSIsInNwb3RObyIsImF2Z1RpbWUiLCJhdmdEaWYiLCJtZXRyb0xpbmVPYmoiLCJsaW5lTmFtZSIsImRpZkhvdGVsIiwiZGlmU3BvdCIsImF2ZyIsImhvdGVsU3BvdCIsInNwb3RNZXRyb05hbWUiLCJhdmdEaWZ0b1Nwb3QiLCJhcmVhQXJyIiwibWV0cm9BcnIiLCJpc0luQXJlYSIsIm5lYXIiLCJoYXNNZXRybyIsIm1ldHJvX2MiLCJTZXRTYWZldHkiLCJmaXJzdF9mcm9tQXJlYSIsImFyZWFzIiwiY29uZmlnX3dvcmQiLCJtaXNkZW1lYW5vciIsIm1pbiIsImNvbmRpZiIsIm1ldERpZiIsIm5vRGlmIiwibWV0V29yZCIsImZsb2F0U2NvcmUiLCJtaW5TcG90RGlmIiwiZmxvYXQiLCJmbG9hdGluZyIsIm5vdFlldCIsImZsb2F0V29yZCIsImZpbmFsIiwiZmluYWxTYWZldHkiLCJmaW5hbFdvcmQiLCJDb25maWdfU2FmZXR5IiwiU2V0TGF1bmRyeSIsImZpcnN0X3NldExhdW5kcnkiLCJzZWNvbmRfbWFrZVNjb3JlIiwidGhpcmRfd29yZGluZyIsImxkQXJyIiwiaGFzTEQiLCJsYXVuZHJ5X2MiLCJTZXRDb252aW5pZW5jZSIsImluZGlXb3JkIiwiaW5kaVNjb3JlIiwiY29udmluaWVuY2UiLCJTZXRBcmVhIiwibm9BcmVhIiwiYXJlYUNvb3IiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdEQSxJQUFJQSxTQUFTO0FBQ1RDLFdBQU07QUFDRkMsaUJBQVEsR0FETjs7QUFHRkMsZUFBTTtBQUNGQyx3QkFBYSxDQUFDLElBQUQsRUFBTyxHQUFQLEVBQVksSUFBWixFQUFrQixHQUFsQixFQUF1QixHQUF2QixFQUE0QixHQUE1QixDQURYLENBQzZDO0FBRDdDO0FBSEosS0FERzs7QUFTVEMsYUFBUTtBQUNKSCxpQkFBUSxHQURKOztBQUdKQyxlQUFNO0FBQ0ZDLHdCQUFhLENBQUMsSUFBRCxFQUFPLEdBQVAsRUFBWSxJQUFaLEVBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLENBRFgsQ0FDd0M7QUFEeEM7QUFIRixLQVRDOztBQWlCVEUsVUFBSztBQUNEQyxjQUFLO0FBQ0RDLG9CQUFPLEVBQUU7QUFDTEMsc0JBQUssTUFERjtBQUVIQyxzQkFBSyxNQUZGO0FBR0hDLHNCQUFLLEdBSEY7QUFJSEMscUJBQUksR0FKRCxDQUlTO0FBSlQsYUFETjtBQU9EQyxxQkFBUSxFQUFFO0FBQ05KLHNCQUFLLE1BREQ7QUFFSkMsc0JBQUssTUFGRDtBQUdKQyxz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LDZCQUZELE1BRUs7QUFDRHdDLHFDQUFLeEMsQ0FBTCxJQUFVLENBQVY7QUFDSDtBQUNKO0FBQ0o7QUFDSjs7QUFFRCxvQkFBSTZWLE1BQUosRUFBWTtBQUNSLDBCQUFLbkwsTUFBTCxDQUFZcUUsR0FBWixJQUFtQixJQUFJclYsT0FBT0MsSUFBUCxDQUFZMlIsTUFBaEIsQ0FBdUI7QUFDdENDLGtDQUFValEsTUFBTWxCLElBRHNCO0FBRXRDcVEsNkJBQUssTUFBS0EsR0FGNEI7QUFHdEM0RCwrQkFBTyxLQUFLVTtBQUgwQixxQkFBdkIsQ0FBbkI7QUFLSDtBQUNKO0FBQ0Q3VSxvQkFBUUMsR0FBUixDQUFZcUksSUFBWjs7QUFFQTFKLHFCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixZQUFZd0osR0FBWixHQUFrQixTQUExQyxFQUFxRFMsTUFBckQsQ0FBNEQ3SixLQUFLeUosTUFBakU7QUFDSCxTQXBFRDtBQXFFSDtBQTNFUyxDQUFkOztrQkE4RWVrVCxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2JhNDY5ZGI3Njg5YTQxNmZhNDMiLCJ2YXIgQ29uZmlnID0ge1xyXG4gICAgbWV0cm86e1xyXG4gICAgICAgIG5lYXJTdGQ6NzUwLFxyXG5cclxuICAgICAgICBzY29yZTp7XHJcbiAgICAgICAgICAgIHBlcmNlbnRpbGUgOiBbMC4xNSwgMC4yLCAwLjI1LCAwLjIsIDAuMSwgMC4xXSwgLy85LCA4LCA3Li4u7KCQ64yA7J2YIOuwseu2hOychCDruYTsnKggLSDtlanqs4QgMSDrkJjslrTslbwg7ZWoISEhXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBsYXVuZHJ5OntcclxuICAgICAgICBuZWFyU3RkOjUwMCxcclxuXHJcbiAgICAgICAgc2NvcmU6e1xyXG4gICAgICAgICAgICBwZXJjZW50aWxlIDogWzAuMTUsIDAuMiwgMC4yNSwgMC4yLCAwLjJdLCAvLzksIDgsIDcuLi7soJDrjIDsnZgg67Cx67aE7JyEIOu5hOycqCAtIO2VqeqzhCAxIOuQmOyWtOyVvCDtlaghISEgLSDsl4bsnLzrqbQgNeygkCDrtoDsl6xcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZvb2Q6e1xyXG4gICAgICAgIGtpbmQ6e1xyXG4gICAgICAgICAgICBiYWtlcnk6eyAvL+ydvOuwmOyggSDrsqDsnbTsu6Trpqwg7LSd7LmtXHJcbiAgICAgICAgICAgICAgICBuYW1lOlwi67Kg7J207Luk66asXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOlwi67Kg7J207Luk66asXCIsXHJcbiAgICAgICAgICAgICAgICBqb3NhOlwi6rCAXCIsXHJcbiAgICAgICAgICAgICAgICBzdGQ6MjUwICAgICAvL+yWvOuniOuCmCDqsIDquYzsnbQg7J6I7Ja07JW8IO2YuO2FlCDso7zrs4DsnLzroZwg7J247KCV7ZWY64KYXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdyb2Nlcnk6eyAvL+ydvOuwmOyggSDsi53ro4ztkojsoJAg7LSd7LmtXHJcbiAgICAgICAgICAgICAgICBuYW1lOlwi7Iud66OM7ZKI7KCQXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOlwi7Iud66OM7ZKI7KCQXCIsXHJcbiAgICAgICAgICAgICAgICBqb3NhOlwi7J20XCIsXHJcbiAgICAgICAgICAgICAgICBzdGQ6MjUwICAgICAvL+yWvOuniOuCmCDqsIDquYzsnbQg7J6I7Ja07JW8IO2YuO2FlCDso7zrs4DsnLzroZwg7J247KCV7ZWY64KYXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldmVuOntcclxuICAgICAgICAgICAgICAgIG5hbWU6XCLshLjruJDsnbzroIjruJBcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6XCLtjrjsnZjsoJBcIixcclxuICAgICAgICAgICAgICAgIGpvc2E6XCLsnbRcIixcclxuICAgICAgICAgICAgICAgIHN0ZDoyMDAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFtaWx5OntcclxuICAgICAgICAgICAgICAgIG5hbWU6XCLtjKjrsIDrpqzrp4jtirhcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6XCLtjrjsnZjsoJBcIixcclxuICAgICAgICAgICAgICAgIGpvc2E6XCLsnbRcIixcclxuICAgICAgICAgICAgICAgIHN0ZDoyMDAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGF3c29uOntcclxuICAgICAgICAgICAgICAgIG5hbWU6XCLroZzshpBcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6XCLtjrjsnZjsoJBcIixcclxuICAgICAgICAgICAgICAgIGpvc2E6XCLsnbRcIixcclxuICAgICAgICAgICAgICAgIHN0ZDoyMDAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGFyZ2U6e1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIuuMgO2YleuniO2KuFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcIuuMgO2YleuniO2KuFwiLFxyXG4gICAgICAgICAgICAgICAgam9zYTpcIuqwgFwiLFxyXG4gICAgICAgICAgICAgICAgbXVsdGlwbGU6MiwgLy/snbTrhYDshJ3snbQg7KO867OA7JeQIOyeiOycvOuptCAy67CwIOyii+ydgOuGiCDst6jquIlcclxuICAgICAgICAgICAgICAgIHN0ZDo1MDAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmVhclN0ZDp7Ly/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDrtoDqt7zsl5Ag7J6I64qU6rG466GcIOyduOygle2VoOqyg+ydtOuDkFxyXG4gICAgICAgICAgICBsYXJnZTo1MDAsXHJcbiAgICAgICAgICAgIGdyb2Nlcnk6MjUwLFxyXG4gICAgICAgICAgICBjdnM6MjUwLCBcclxuICAgICAgICAgICAgYmFrZXJ5OjI1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2NvcmU6e1xyXG4gICAgICAgICAgICBwZXJjZW50aWxlIDogWzAuMTUsIDAuMiwgMC4yNSwgMC4yLCAwLjEsIDAuMV0sIC8vOSwgOCwgNy4uLuygkOuMgOydmCDrsLHrtoTsnIQg67mE7JyoIC0g7ZWp6rOEIDEg65CY7Ja07JW8IO2VqCEhIVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgd2VpZ2h0OnsgLy9BVE0g7KCQ7IiY66W8IOyCsOy2nO2VoCDrlYwg6rCA7KSR7LmYKOyIq+yekCDri6jsnIQg66y06rSAKVxyXG4gICAgICAgICAgICAgICAgbmVhcmVzdDozLjUsXHJcbiAgICAgICAgICAgICAgICBpbjI1MDogMSxcclxuICAgICAgICAgICAgICAgIGxhcmdlOjEwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB3b3JkOntcclxuICAgICAgICAgICAgaW50ZWdyYXRlOnsgLy/qsIDsnqUg6rCA6rmM7Jq0IGZvb2TqsIAgbGFyZ2Uo7J206rGw64KYIDEwbSDrr7jrp4wg6rGw66as7LCo7J20KSlcclxuICAgICAgICAgICAgICAgIHN0ZDpbMC4xNSwgMC4zNSwgMC42XSwgLy/rnq3tgrnsnbQg7ZW064u5IOuwseu2hOychCDslYjsl5Ag65OkIOqyveyasFxyXG4gICAgICAgICAgICAgICAgd29yZDpbIC8vd29yZOuKlCBzdGTrs7Tri6Qg7ZWY64KYIOunjuyVhOyVvCDtlaguKOydtCDqsr3smrAgNzAlIOuCtOyXkCDrqrsg65Ok7JeI7J2EIOqyveyasOydmCDsm4zrlKkpXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcIOunpOyasCDqsIDquYzsnbTsl5Ag7J6I7J2MIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOuhnCDqsIDquYzsmrQg7Y64LiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYmFuazI0OntcclxuICAgICAgICAgICAgICAgIHN0ZDpbMC4zNSwwLjddLCBcclxuICAgICAgICAgICAgICAgIHdvcmQ6W1xyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojqs6AsIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOuhnCwg6rCA6rmM7Jq0IO2OuC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66asIOuWqOyWtOynhCDso7zsnITsl5Ag7J6I7J2MLiBcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuZWFyZXN0OntcclxuICAgICAgICAgICAgICAgIHN0ZDpbMC4xLDAuMjUsMC40XSwgLy/rnq3tgrnsnbQg7ZW064u5IOuwseu2hOychCDslYjsl5Ag65OkIOqyveyasFxyXG4gICAgICAgICAgICAgICAgd29yZDpbIC8vd29yZOuKlCBzdGTrs7Tri6Qg7ZWY64KYIOunjuyVhOyVvCDtlaguKOydtCDqsr3smrAgNzAlIOuCtOyXkCDrqrsg65Ok7JeI7J2EIOqyveyasOydmCDsm4zrlKkpXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsIC8vMTgwODEwIC0g7Y+J6rCA66W8IOydvOuLqCDslYgg7ZWY6riw66GcIO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGF0bTp7XHJcbiAgICAgICAgc2NvcmU6e1xyXG4gICAgICAgICAgICBwZXJjZW50aWxlIDogWzAuMTUsIDAuMiwgMC4yNSwgMC4yLCAwLjEsIDAuMV0sIC8vOSwgOCwgNy4uLuygkOuMgOydmCDrsLHrtoTsnIQg67mE7JyoIC0g7ZWp6rOEIDEg65CY7Ja07JW8IO2VqCEhIVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgd2VpZ2h0OnsgLy9BVE0g7KCQ7IiY66W8IOyCsOy2nO2VoCDrlYwg6rCA7KSR7LmYKOyIq+yekCDri6jsnIQg66y06rSAKVxyXG4gICAgICAgICAgICAgICAgYmFuazI0OjQsXHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0OjMuNzUsXHJcbiAgICAgICAgICAgICAgICBpbjEzMDogMC41XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgXHJcbiAgICAgICAgd29yZDp7XHJcbiAgICAgICAgICAgIGludGVncmF0ZTp7IC8v6rCA7J6lIOqwgOq5jOyatCBBVE3snbQgMjTsi5zqsIQg7Jik7ZSI7ZWY64qUIOydgO2WiSDshozsnKAo7J206rGw64KYIDEwbSDrr7jrp4wg6rGw66as7LCo7J20KSlcclxuICAgICAgICAgICAgICAgIHN0ZDpbMC4xNSwgMC4zNSwgMC42XSwgLy/rnq3tgrnsnbQg7ZW064u5IOuwseu2hOychCDslYjsl5Ag65OkIOqyveyasFxyXG4gICAgICAgICAgICAgICAgd29yZDpbIC8vd29yZOuKlCBzdGTrs7Tri6Qg7ZWY64KYIOunjuyVhOyVvCDtlaguKOydtCDqsr3smrAgNzAlIOuCtOyXkCDrqrsg65Ok7JeI7J2EIOqyveyasOydmCDsm4zrlKkpXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcIOunpOyasCDqsIDquYzsnbTsl5Ag7J6I7J2MIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOuhnCDqsIDquYzsmrQg7Y64LiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYmFuazI0OntcclxuICAgICAgICAgICAgICAgIHN0ZDpbMC4zNSwwLjddLCBcclxuICAgICAgICAgICAgICAgIHdvcmQ6W1xyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojqs6AsIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOuhnCwg6rCA6rmM7Jq0IO2OuC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66asIOuWqOyWtOynhCDso7zsnITsl5Ag7J6I7J2MLiBcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuZWFyZXN0OntcclxuICAgICAgICAgICAgICAgIHN0ZDpbMC4xLDAuMjUsMC40XSwgLy/rnq3tgrnsnbQg7ZW064u5IOuwseu2hOychCDslYjsl5Ag65OkIOqyveyasFxyXG4gICAgICAgICAgICAgICAgd29yZDpbIC8vd29yZOuKlCBzdGTrs7Tri6Qg7ZWY64KYIOunjuyVhOyVvCDtlaguKOydtCDqsr3smrAgNzAlIOuCtOyXkCDrqrsg65Ok7JeI7J2EIOqyveyasOydmCDsm4zrlKkpXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsIC8vMTgwODEwIC0g7Y+J6rCA66W8IOydvOuLqCDslYgg7ZWY6riw66GcIO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY29uZmlnLmpzIiwidmFyIEdlb0NvZGUgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihhcnIsIHJlZil7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ0ZW1wL2dlb2NvZGVcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIGlmKCFkYXRhKXsgIC8v64uk66W4IOyngOyYpOy9lOuUqSDsnpHsl4XspJHsnbTrnbzrqbQg7KCI64yAIOuNruyWtOyNqOyEnOuKlCDslYgg65CoO1xyXG4gICAgICAgICAgICAgICAgaWYoYXJyLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6cmVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnI6YXJyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGUoYXJyLCByZWYpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsp4DsmKTsvZTrlKkg7J6R7JeF7J2EIOyLnOyeke2VqeuLiOuLpC4g7Jes65+s67KIIOyDiOuhnOqzoOy5qCDrkKAg7IiYIOyeiOyKteuLiOuLpC5cIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNvZGU6IGZ1bmN0aW9uKGFyciwgcmVmKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxldCBnZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xyXG4gICAgICAgIHZhciBhZGRyZXNzID0gYXJyWzBdLmFkZHJlc3M7XHJcbiAgICAgICAgdmFyIGFpZCA9IGFyclswXS5haWQ7XHJcblxyXG4gICAgICAgIGdlb2NvZGVyLmdlb2NvZGUoIHsnYWRkcmVzcyc6IGFkZHJlc3N9LCBmdW5jdGlvbihyZXN1bHRzLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3RhdHVzKVxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09ICdPSycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29vciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6cmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBsbmc6cmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKHJlZitcIi9cIithaWQrXCIvY29vclwiKS5zZXQoY29vcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoYXJyLmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgICAgICBhcnIuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jb2RlKGFyciwgcmVmKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5zZXQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi7KeA7Jik7L2U65SpIOyekeyXheydtCDsmYTro4zrkJjsl4jsirXri4jri6QuXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHN0YXR1cyA9PT0gJ1pFUk9fUkVTVUxUUycpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFyclswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLsp4DsmKTsvZTrlKkg6rKw6rO86rCAIOyXhuuKlCDtla3rqqnsnbQg7J6I7Iq164uI64ukLiDsvZjshpTssL3snYQg7LC46rOg7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ0ZW1wL2dlb2NvZGVcIikuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmOnJlZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyOmFyclxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdlb0NvZGU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9nZW9Db2RlLmpzIiwiaW1wb3J0IEF0dGVuZCBmcm9tIFwiLi9wYWdlcy9hdHRlbmQuanNcIjtcclxuaW1wb3J0IENpdHkgZnJvbSBcIi4vcGFnZXMvY2l0eS5qc1wiO1xyXG5pbXBvcnQgU3BvdCBmcm9tIFwiLi9wYWdlcy9zcG90LmpzXCI7XHJcbmltcG9ydCBBY2NvdW50IGZyb20gXCIuL3BhZ2VzL2FjY291bnQuanNcIjtcclxuaW1wb3J0IFN1YndheSBmcm9tIFwiLi9wYWdlcy9zdWJ3YXkuanNcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vcGFnZXMvdmlldy5qc1wiO1xyXG5pbXBvcnQgSG90ZWwgZnJvbSBcIi4vcGFnZXMvaG90ZWwuanNcIjtcclxuaW1wb3J0IEdlb0NvZGUgZnJvbSBcIi4vbW9kdWxlcy9nZW9Db2RlLmpzXCI7XHJcblxyXG52YXIgaW5pdGlhbGl6ZWQgPSB7fTtcclxuXHJcbnZhciB1X2kgPSB7fTtcclxuXHJcbnZhciBOYXZfZnVuY3Rpb24gPSB7XHJcbiAgICBhdHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBBdHRlbmQuaW5pdCh1X2kpO1xyXG4gICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgdG9kbzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBjaXR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgQ2l0eS5pbml0KHVfaSk7XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQuY2l0eSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgdmlldzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFZpZXcuaW5pdCgpO1xyXG4gICAgICAgIGluaXRpYWxpemVkLnZpZXcgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGFjY291bnQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgc3BvdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFNwb3QuaW5pdCh1X2kpO1xyXG4gICAgICAgIGluaXRpYWxpemVkLnNwb3QgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGNhbGM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgaG90ZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBIb3RlbC5pbml0KCk7XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQuaG90ZWwgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGxpbms6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBsb2dpbihuYW1lKXtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5odG1sKG5hbWVbMV0rXCLtlZghXCIpO1xyXG4gICAgJChcIi5oZWxsb1dvcmxkXCIpLmF0dHIoXCJ0aXRsZVwiLG5hbWUrXCLri5gg7JWI64WV7ZWY7IS47JqUIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGNvbmZpcm0obmFtZStcIuuLmCDroZzqt7jslYTsm4Mg7ZWY7Iuc6rKg7Iq164uI6rmMP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgLy8gQW4gZXJyb3IgaGFwcGVuZWQuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHByb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgbGV0IG1haWwgPSB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF07XHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2VvQ29kZS5jb2RlKGRhdGEuYXJyLCBkYXRhLnJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLsp4DsmKTsvZTrlKkg7J6R7JeF7J2EIOydtOyWtOyEnCDsp4Ttlontlanri4jri6QuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/slYTrnpgg64K07Jqp7J2EIOuwlOq+uOuptCBpZiAoIWlzVXNlcikg67aA67aE7JeQ64+EIOuwmOuTnOyLnCDrsJjsmIHtlbTspITqsoNcclxuICAgICAgICAgICAgICAgIC8vIGZvciAodmFyIGdpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZGF0YVtnaWRdLlxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikudXBkYXRlKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW21haWxdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdV9pID0gZGF0YVttYWlsXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JhZGUgPSB1X2kuZ3JhZGUgKiAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dGVuZC5pbml0KGRhdGFbbWFpbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGUgPT09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjY291bnQuaW5pdChtYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmFjY291bnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luKHVfaS5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIFVzZXIgaXMgc2lnbmVkIGluLlxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBObyB1c2VyIGlzIHNpZ25lZCBpbi5cclxuICAgICAgICAgICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhQb3B1cChwcm92aWRlcikudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyID0gcmVzdWx0LnVzZXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlck1haWwgPSB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbdXNlck1haWxdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVfaSA9IGRhdGFbdXNlck1haWxdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JhZGUgPSB1X2kuZ3JhZGUgKiAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXR0ZW5kLmluaXQoZGF0YVt1c2VyTWFpbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjb3VudC5pbml0KHVzZXJNYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hY2NvdW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dpbih1X2kubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3VzZXJzLycgKyB1c2VyTWFpbCkuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5kaXNwbGF5TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haWw6IHVzZXJNYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBcImFiY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCdjb2RlOicgKyBlcnJvci5jb2RlICsgJyAtIOydvOyLnOyggeyduCDrrLjsoJzqsIAg67Cc7IOd7ZaI7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqULicpO1xyXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIEVycm9ycyBoZXJlLlxyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yQ29kZSA9IGVycm9yLmNvZGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBlbWFpbCBvZiB0aGUgdXNlcidzIGFjY291bnQgdXNlZC5cclxuICAgICAgICAgICAgICAgIHZhciBlbWFpbCA9IGVycm9yLmVtYWlsO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGZpcmViYXNlLmF1dGguQXV0aENyZWRlbnRpYWwgdHlwZSB0aGF0IHdhcyB1c2VkLlxyXG4gICAgICAgICAgICAgICAgdmFyIGNyZWRlbnRpYWwgPSBlcnJvci5jcmVkZW50aWFsO1xyXG4gICAgICAgICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4kKFwiLm5hdl9faXRlbVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBpZighJCh0aGlzKS5oYXNDbGFzcygnbmF2X19pdGVtLS1oYXNEcmF3ZXInKSl7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpLmF0dHIoXCJpZFwiKS5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgICAgICQoXCIubmF2PipcIikucmVtb3ZlQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5wYWdlcy5cIiArIGl0ZW0pLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgICAgIGlmKCFpbml0aWFsaXplZFtpdGVtXSl7XHJcbiAgICAgICAgICAgIE5hdl9mdW5jdGlvbltpdGVtXSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4kKFwiLm5hdl9fZHJhd2VyX19pdGVtXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaXRlbSA9ICQodGhpcykuYXR0cihcImlkXCIpLnNwbGl0KFwiX1wiKVsxXTtcclxuXHJcbiAgICAkKFwiLm5hdj4qXCIpLnJlbW92ZUNsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYWRkQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG5cclxuICAgICQoXCIubmF2X19kcmF3ZXJfX2l0ZW1cIikucmVtb3ZlQ2xhc3MoXCJuYXZfX2RyYXdlcl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwibmF2X19kcmF3ZXJfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG5cclxuICAgICQoXCIucGFnZXNcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIucGFnZXMuXCIgKyBpdGVtKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgIGlmICghaW5pdGlhbGl6ZWRbaXRlbV0pIHtcclxuICAgICAgICBOYXZfZnVuY3Rpb25baXRlbV0oKTtcclxuICAgIH1cclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ2YXIgQXR0ZW5kID0ge1xyXG4gICAgbW9iaWxlOiBmYWxzZSxcclxuXHJcbiAgICBpZDogXCJcIixcclxuXHJcbiAgICB2aWV3SUQ6IFwiXCIsXHJcbiAgICAvL+q0gOumrOyekOqwgCDri6Trpbgg7IKs656M7J2YIElEIO2ZleyduOykkVxyXG5cclxuICAgIGF0dGVuZE9iajoge30sXHJcblxyXG4gICAgc2FsYXJ5OiB7fSxcclxuXHJcblxyXG4gICAgd2Vla2RheXM6IFtcIuydvFwiLCBcIuyblFwiLCBcIu2ZlFwiLCBcIuyImFwiLCBcIuuqqVwiLCBcIuq4iFwiLCBcIu2GoFwiLCBcIuydvFwiXSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbih1X2kpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB2YXIgZ3JhZGUgPSB1X2kuZ3JhZGU7XHJcbiAgICAgICAgdmFyIGlkID0gdV9pLmlkO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcblxyXG4gICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICB0eHQrPSc8c2VsZWN0IGNsYXNzPVwid29ya2VyX3NlbGVjdG9yXCI+PC9zZWxlY3Q+JztcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX190b3BcIj4nO1xyXG4gICAgICAgIHR4dCArPSAgICc8ZGl2IGlkPVwiY2FsZW5kYXJcIiBjbGFzcz1cImF0dGVuZF9fY2FsZW5kYXJcIj48L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSAgICc8ZGl2IGNsYXNzPVwiYXR0ZW5kX193ZWVrXCI+PC9kaXY+JztcclxuICAgICAgICB0eHQgKz0nPC9kaXY+JztcclxuICAgICAgICB0eHQgKz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhcIj48L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLmF0dGVuZFwiKS5odG1sKHR4dCkucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhY2NvdW50L3NhbGFyeVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdGhhdC5zYWxhcnkgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICBpZihncmFkZSA9PT0gNSl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmdWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJzID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHh0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbWFpbElEIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVzZXJzW21haWxJRF0uZ3JhZGUqMTw1KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPG9wdGlvbiB2YWx1ZT1cIicgKyBtYWlsSUQgKyAnXCI+JyArIHVzZXJzW21haWxJRF0ubmFtZSArICc8L29wdGlvbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIud29ya2VyX3NlbGVjdG9yXCIpLmh0bWwodHh0KS52YWwoaWQpLnByb3AoXCJzZWxlY3RlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5sb2FkaW5nVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ZW5kT2JqID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoISQoXCIuZmMtaGVhZGVyLXRvb2xiYXJcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTY0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheUNsaWNrOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0V29ya0hvdXIoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLm9uKFwiY2xpY2tcIiwgXCIuY29uZmlybVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZighJChcIi5hdHRlbmRcIikuaGFzQ2xhc3MoJ2Rpc3BsYXlOb25lJykpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRXb3JrSG91cigkKHRoaXMpLmF0dHIoXCJkaWRcIikpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLm1vZGFsXCIpLm9uKFwiY2xpY2tcIiwgXCIuY2xvc2VcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKCEkKFwiLmF0dGVuZFwiKS5oYXNDbGFzcygnZGlzcGxheU5vbmUnKSkge1xyXG4gICAgICAgICAgICAgICAgJChcIi5ibGFja1NjcmVlblwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiYm9keVwiKS5rZXl1cChmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgaWYgKCEkKFwiLmF0dGVuZFwiKS5oYXNDbGFzcygnZGlzcGxheU5vbmUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIubW9kYWwgLmNvbmZpcm1cIikubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBlLndoaWNoOyAvLyByZWNvbW1lbmRlZCB0byB1c2UgZS53aGljaCwgaXQncyBub3JtYWxpemVkIGFjcm9zcyBicm93c2Vyc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRXb3JrSG91cigkKFwiLm1vZGFsIC5jb25maXJtXCIpLmF0dHIoXCJkaWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIud29ya2VyX3NlbGVjdG9yXCIpLmNoYW5nZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X3dvcmtlcihpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHZpZXdfd29ya2VyOiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZihpZCA9PT0gdGhhdC5pZCl7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19jYWxlbmRhclwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fbW9udGhcIikuaHRtbChcIlwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX2NhbGVuZGFyXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgIGlmKHRoYXQudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoYXQudmlld0lEKS5vZmYoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIraWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmF0dGVuZE9iaiA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeW8gPSB0aGF0LnZpZXdJRDtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlld0lEID0gaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoeW8ubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhhdC5pZCAhPT0gdGhhdC52aWV3SUQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheUNsaWNrOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRXb3JrSG91cihkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX2NhbGVuZGFyOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAkKFwiLmF0dGVuZFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuZmMtZGF5XCIpLmh0bWwoXCJcIik7XHJcblxyXG4gICAgICAgIGlmKGRhdGEuYXR0ZW5kKXtcclxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuYXR0ZW5kO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkYXRlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlSUQgPSBkYXRlLnNsaWNlKDAsNCkrXCItXCIrZGF0ZS5zbGljZSg0LDYpK1wiLVwiK2RhdGUuc2xpY2UoNiw4KTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHR4dCA9ICc8cD4nK2RhdGFbZGF0ZV1bMF0uZnJvbStcIn5cIitkYXRhW2RhdGVdWzBdLnRvKyc8L3A+JztcclxuICAgICAgICAgICAgICAgIC8v65GQ7YOA7J6EIOuCmOuIoOyEnCDqt7zrrLTtlojslrTrj4Qg64us66Cl7JeQIO2RnOyLnOuQmOuKlCDqsoPsnYAg7LKr7YOA7J6EIOq3vOustOyLnOqwhOunjFxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZiArPSBkYXRhW2RhdGVdW2ldLmRpZjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8cD4nICsgTWF0aC5mbG9vcihkaWYvNjApICsgXCLsi5zqsIQgXCIrIGRpZiU2MCArXCLrtoRcIisnPC9wPic7XHJcbiAgICAgICAgICAgICAgICAkKCcuYXR0ZW5kIC5mYy1kYXlbZGF0YS1kYXRlPVwiJytkYXRlSUQrJ1wiXScpLmh0bWwodHh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZHVyTW9uID0gMDtcclxuICAgICAgICAgICAgbGV0IHRoaXNNb250aCA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuYXR0ZW5kIC5mYy1kYXlcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlRG9tID0gJChcIi5hdHRlbmQgLmZjLWRheVwiKS5lcShpKTtcclxuICAgICAgICAgICAgICAgIGlmKCFkYXRlRG9tLmhhc0NsYXNzKFwiZmMtb3RoZXItbW9udGhcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gZGF0ZURvbS5hdHRyKFwiZGF0YS1kYXRlXCIpLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzTW9udGggPSBkYXRlWzBdK2RhdGVbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGVbMF0rZGF0ZVsxXStkYXRlWzJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2RhdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkYXRhW2RhdGVdLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJNb24gKz0gZGF0YVtkYXRlXVtqXS5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmKCQoXCIuYXR0ZW5kIC5mYy12aWV3LWNvbnRhaW5lclwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHsgICAvL+ustOyhsOqxtCA27KO8XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWtEb20gPSAkKFwiLmF0dGVuZCAuZmMtd2Vla1wiKS5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla0R1ciA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXlEb20gPSB3ZWVrRG9tLmZpbmQoXCIuZmMtZGF5XCIpLmVxKGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGRheURvbS5hdHRyKFwiZGF0YS1kYXRlXCIpLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGVbMF0rZGF0ZVsxXStkYXRlWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2RhdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlZWtEdXIgKz0gZGF0YVtkYXRlXVtrXS5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2Vla0R1cj4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj4nKyBNYXRoLmZsb29yKHdlZWtEdXIvNjApKyfsi5zqsIQgJyt3ZWVrRHVyJTYwKyfrtoQnICsnPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiYXR0ZW5kX193ZWVrX19ob3VyXCI+PC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQoXCIuYXR0ZW5kX193ZWVrXCIpLmh0bWwodHh0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoXCIuYXR0ZW5kIC5mYy1sZWZ0XCIpLmNoaWxkcmVuKFwiaDIuZHVyTW9udGhcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICQoXCIuYXR0ZW5kIGgyLmR1ck1vbnRoXCIpLmh0bWwoJyAoJytNYXRoLmZsb29yKGR1ck1vbi82MCkrJ+yLnOqwhCAnK2R1ck1vbiU2MCsn67aEKScpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuYXR0ZW5kIC5mYy1sZWZ0XCIpLmFwcGVuZCgnPGgyIGNsYXNzPVwiZHVyTW9udGhcIj4gKCcrTWF0aC5mbG9vcihkdXJNb24vNjApKyfsi5zqsIQgJytkdXJNb24lNjArJ+u2hCk8L2gyPicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQgPSAnJzsgICAvL3ZhciDrubzrqLnsnYDqsbAg7JWE64uYLiDsnITsl5DshJwg7ISg7Ja4IO2WiOydjCFcclxuXHJcbiAgICAgICAgICAgIGxldCBmdWxsTW9udGhCb251cyA9IDMwNDAwO1xyXG4gICAgICAgICAgICBsZXQgaW5zdXJhbmNlRmVlID0gMDtcclxuICAgICAgICAgICAgbGV0IGJhc2ljID0gTWF0aC5yb3VuZChkdXJNb24vNjAqNzYwMCk7XHJcbiAgICAgICAgICAgIGxldCBmdWxsV2Vla0J1bnVzID0gTWF0aC5yb3VuZCgoZHVyTW9uLzYwKjc2MDApKjAuMik7XHJcblxyXG4gICAgICAgICAgICAvLyBpZih0aGlzLmlkID09PSB0aGlzLnZpZXdJRCl7XHJcbiAgICAgICAgICAgIC8vICAgICAvL+uzuOyduCDrqqjrk5xcclxuICAgICAgICAgICAgLy8gICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnkvXCIrdGhpc01vbnRoK1wiL1wiK3RoaXMuaWQpLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYmFzaWM6IGJhc2ljLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxXZWVrQnVudXM6IGZ1bGxXZWVrQnVudXMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbE1vbnRoQm9udXM6IGZ1bGxNb250aEJvbnVzXHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImFjY291bnQvc2FsYXJ5L1wiK3RoaXNNb250aCtcIi9cIit0aGlzLnZpZXdJRCkudXBkYXRlKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBiYXNpYzogYmFzaWMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbFdlZWtCdW51czogZnVsbFdlZWtCdW51cyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsTW9udGhCb251czogZnVsbE1vbnRoQm9udXNcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7quLDrs7jquIk8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGJhc2ljKSsgXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq3vOustOyLnOqwhCBYIDcsNjAw7JuQPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7so7ztnLTsiJjri7k8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGZ1bGxXZWVrQnVudXMpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6riw67O46riJ7J2YIDIwJTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7Jew7LCo7IiY64u5PC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShmdWxsTW9udGhCb251cykgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj417Iuc6rCEIOyDgeuLuSDquLDrs7jquIk8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lIGF0dGVuZF9fbW9udGhfX2xpbmUtLXJlZFwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7sgqztmozrs7Ttl5jro4w8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGluc3VyYW5jZUZlZSkgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7qta3rr7zsl7DquIgv6rOg7Jqp67O07ZeYL+qxtOqwleuztO2XmCDssq3qtazslaE8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lIGF0dGVuZF9fbW9udGhfX2xpbmUtLXN1bVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7tlanqs4Q8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGJhc2ljICsgZnVsbFdlZWtCdW51cyArIGZ1bGxNb250aEJvbnVzIC0gaW5zdXJhbmNlRmVlKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq4sOuzuOq4iSArIOyjvO2ctOyImOuLuSArIOyXsOywqOyImOuLuSAtIOyCrO2ajOuztO2XmOujjDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX21vbnRoXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0V29ya0hvdXI6IGZ1bmN0aW9uKGRhdGVPYmope1xyXG4gICAgICAgIC8vIGNzczogbW9kdWxlcy9hdHRlbmQuY3NzXHJcbiAgICAgICAgbGV0IGRhdGVTaG9ydCA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoXCJNTS9ERFwiKTtcclxuICAgICAgICBsZXQgZGF0ZUlEID0gbW9tZW50KGRhdGVPYmopLmZvcm1hdChcIllZWVlNTUREXCIpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgIGlmKHRoaXMuYXR0ZW5kT2JqLmF0dGVuZFtkYXRlSURdKXtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuYXR0ZW5kT2JqLmF0dGVuZFtkYXRlSURdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYmxhY2tTY3JlZW5cIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJpbnB1dFdpbmRvd1wiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxwIGNsYXNzPVwidGl0bGVcIj4nK2RhdGVTaG9ydCsnIOq3vOustOyLnOqwhDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPic7XHJcbiAgICAgICAgaWYoZGF0YVswXSl7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJmaXJzdF9mcm9tXCIgdmFsdWU9XCInK2RhdGFbMF0uZnJvbSsnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cImZpcnN0X3RvXCIgdmFsdWU9XCInK2RhdGFbMF0udG8rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwiZmlyc3RfZnJvbVwiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJmaXJzdF90b1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj4nO1xyXG4gICAgICAgIGlmKGRhdGFbMV0pe1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwic2Vjb25kX2Zyb21cIiB2YWx1ZT1cIicrZGF0YVsxXS5mcm9tKydcIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwic2Vjb25kX3RvXCIgdmFsdWU9XCInK2RhdGFbMV0udG8rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwic2Vjb25kX2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwic2Vjb25kX3RvXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9ICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwiYm90dG9tXCI+JztcclxuICAgICAgICB0eHQrPSAgICAgICAgICAgJzxwIGNsYXNzPVwiY29uZmlybVwiIGRpZD1cIicrZGF0ZUlEKydcIj7tmZXsnbg8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICAgICAgJzxwIGNsYXNzPVwiY2xvc2VcIj7st6jshow8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSAgICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIubW9kYWxcIikuaHRtbCh0eHQpO1xyXG5cclxuICAgICAgICBpZih0aGlzLm1vYmlsZSl7XHJcbiAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikuQW55UGlja2VyKHtcclxuICAgICAgICAgICAgICAgIGRhdGVUaW1lRm9ybWF0OlwiSEg6bW1cIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjZmlyc3RfZnJvbVwiKS5mb2N1cygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRXb3JrSG91cjogZnVuY3Rpb24oZGF0ZSl7XHJcblxyXG4gICAgICAgIGxldCB3b3JrID0gW107XHJcblxyXG4gICAgICAgIGxldCBhbGxFbXB0eSA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKCQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikuZXEoaSkudmFsKCkubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgYWxsRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWxsRW1wdHkpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLnZpZXdJRCtcIi9hdHRlbmQvXCIrZGF0ZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCtcIi9hdHRlbmQvXCIrZGF0ZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoXCIubW9kYWxcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgbGV0IGRhdGVJRCA9IGRhdGUuc2xpY2UoMCw0KSArIFwiLVwiK2RhdGUuc2xpY2UoNCw2KSArIFwiLVwiK2RhdGUuc2xpY2UoNiw4KTtcclxuICAgICAgICAgICAgJCgnLmZjLWRheVtkYXRhLWRhdGU9XCInK2RhdGVJRCsnXCJdJykuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmKCQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG4gICAgICAgICAgICAvL+yLnOyekeyLnOqwhOydtCDsnpgg7J6F66Cl65CY7JeI64KYIO2ZleyduFxyXG5cclxuICAgICAgICAgICAgaWYoZGF0ZTxtb21lbnQoKS5mb3JtYXQoXCJZWVlZTU1ERFwiKSl7XHJcbiAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgIGlmKCQoXCIjZmlyc3RfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLsmIjsg4Eg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZyb20gPSAkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk7XHJcbiAgICAgICAgICAgIGxldCB0byA9ICQoXCIjZmlyc3RfdG9cIikudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZnJvbUEgPSBmcm9tLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSk7XHJcblxyXG5cclxuICAgICAgICAgICAgd29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZyb206IGZyb20sXHJcbiAgICAgICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgICAgICBkaWY6IGRpZlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi6re866y07Iuc6rCE7J20IOyemOuquyDsnoXroKXrkJjsl4jsirXri4jri6QuIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBpZigkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGU8bW9tZW50KCkuZm9ybWF0KFwiWVlZWU1NRERcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7Jik64qYIOydtOyghCDsnbzsnZgg64Kg7Kec66W8IOuLpOujqOqzoCDsnojsnYQg6rK97JqwIC0g6re866y0IOyiheujjOyLnOqwhOydtCDsnoXroKXrkJjsp4Ag7JWK7Jy866m0IOyViCDrkKhcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI3NlY29uZF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/snbTsoITsnbzsnbQg7JWE64uI642U652864+EIOyYiOyDgSDqt7zrrLTsi5zqsITsnbTrnbzrj4Qg7J6F66Cl7ZW07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg7JiI7IOBIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb20gPSAkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvID0gJChcIiNzZWNvbmRfdG9cIikudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb21BID0gZnJvbS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9BID0gdG8uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLTsi5zqsITsnbQg7J6Y66q7IOyeheugpeuQmOyXiOyKteuLiOuLpC4gSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMudmlld0lEK1wiL2F0dGVuZC9cIitkYXRlKS5zZXQod29yayk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQrXCIvYXR0ZW5kL1wiK2RhdGUpLnNldCh3b3JrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIubW9kYWxcIikuaHRtbChcIlwiKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF0dGVuZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvYXR0ZW5kLmpzIiwiaW1wb3J0IE1ldHJvTGluZSBmcm9tIFwiLi9jaXR5L21ldHJvTGluZS5qc1wiO1xyXG5cclxubGV0IENpdHkgPSB7XHJcbiAgICBkYXRhOiB7fSxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuY2l0eVwiKS5vbihcImNsaWNrXCIsIFwiLnJlZnJlc2hcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5yZWZyZXNoU3RhdHVzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuY2l0eVwiKS5vbihcImNsaWNrXCIsIFwiLmNpdHlfX3RyYW5zcG9ydFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgY2lkID0gJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIik7IFxyXG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gdGhhdC5kYXRhW2NpZF0uc3RhdHVzO1xyXG4gICAgICAgICAgICBpZihzdGF0dXMuc3BvdD4yICYmIHN0YXR1cy50cmFuc3BvcnQ+MCl7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuuMgOykkeq1kO2GtSDsoJXrs7Trpbwg6rCA6rO17ZWp64uI64ukLlwiKTtcclxuICAgICAgICAgICAgICAgIE1ldHJvTGluZS5pbml0KGNpZCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLrjIDspJHqtZDthrUg7KCV67O066W8IOqwgOqzte2VmOq4sOyXkCDsnpDro4zqsIAg67aA7KGx7ZWp64uI64ukLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8aDI+64+E7IucIOuNsOydtO2EsCDtmZXrs7TtmITtmak8L2gyPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJyZWZyZXNoXCI+7LWc7Iug7ZmUPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwid3JhcHBlclwiPic7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwibGluZSB0b3BcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwibmFtZVwiPuuPhOyLnOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzXCI+7IiZ7IaMPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X19zcG90c1wiPuq0gOq0keyngCDsoJXrpqw8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydFwiPuq1kO2GtTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fYXJlYVwiPuyngOyXrTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fcHJpY2VcIj7rrLzqsIA8L3A+JztcclxuICAgICAgICB0eHQrPSAnPC9kaXY+JztcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKHZhciBjb2RlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NvZGVdO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gY2l0eS5zdGF0dXM7XHJcblxyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJsaW5lXCIgaWQ9XCInICsgY2l0eS5jb2RlICsgJ1wiPjxwIGNsYXNzPVwibmFtZVwiPicgKyBjaXR5Lm5hbWUgKyAnPC9wPic7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLmhvdGVsID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzIHdlaWdodC0tYm9sZFwiPu2PieqwgCDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuaG90ZWwgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19ob3RlbHNcIj7rjbDsnbTthLAg7J6I7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzIGNvbG9yLS1yZWRcIj7rjbDsnbTthLAg7JeG7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMuc3BvdCA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzIHdlaWdodC0tYm9sZFwiPuygleuztOqygOymnSDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+MuywqOqygOymnTwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5zcG90ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHNcIj7tlansuZjquLA8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+7KCV67O0IOqygOymneykkTwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzIGNvbG9yLS1yZWRcIj7soJXrs7Qg7JeG7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0IHdlaWdodC0tYm9sZFwiPuuMgOykkeq1kO2GtSDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0XCI+642w7J207YSwIOyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydCBjb2xvci0tcmVkXCI+642w7J207YSwIOyXhuydjDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLmFyZWEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19hcmVhXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2FyZWEgY29sb3ItLXJlZFwiPlg8L3A+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5wcmljZSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3ByaWNlXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3ByaWNlIGNvbG9yLS1yZWRcIj5YPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nOyAvL2Nsb3NlIHdyYXBwZXJcclxuXHJcbiAgICAgICAgJChcIi5jaXR5XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignc2V0dGluZy9jaXRpZXMnKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGUoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZnJlc2hTdGF0dXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlybShcIuuNsOydtO2EsOulvCDrp47snbQg7J6h7JWE66i57Iq164uI64ukISDsoJXrp5Ag7LWc7Iug7ZmU7ZWY7Iuc6rKg7Iq164uI6rmMP1wiKSkge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzJykub25jZShcInZhbHVlXCIsIHNuYXA9PntcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGNpZCBpbiB0aGF0LmRhdGEpIHtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSB7fTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2l0eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsOiAwLCAvLzA6642w7J207YSw7JeG7J2MLCAxOuyImeyGjOuNsOydtO2EsOunjCDsnojsnYwsIDI67Y+J6rCA642w7J207YSwKOybjOuUqSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90OiB0aGF0LmRhdGFbY2lkXS5zdGF0dXMuc3BvdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IDAsIC8v642w7J207YSw7JeG7J2MLCAxOuuplO2KuOuhnOuNsOydtO2EsOunjCDsnojsnYwsIDI66rCA6rO1642w7J207YSwKOudvOyduOuzhC4u65OxKSDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNpdHkuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmFyZWEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5ob3RlbHMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhvdGVsID0gY2l0eS5ob3RlbHNbT2JqZWN0LmtleXMoY2l0eS5ob3RlbHMpWzBdXTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmhvdGVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5ob3RlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5hcmVhID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGhvdGVsLmFyZWEgPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5hcmVhID0gMjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdHkuc3RhdHVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5zdGF0dXMuYXJlYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuc3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNpdHkuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuc3RhdHVzLmFyZWEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5LnN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgY2lkICsgJy9zdGF0dXMnKS51cGRhdGUoY2l0eS5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5tZXRybyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaXR5Lm1ldHJvTGluZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnRyYW5zcG9ydCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMudHJhbnNwb3J0ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdHkucHJpY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnByaWNlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbDogMCwgLy8wOuuNsOydtO2EsOyXhuydjCwgMTrsiJnshozrjbDsnbTthLDrp4wg7J6I7J2MLCAyOu2PieqwgOuNsOydtO2EsCjsm4zrlKkpIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IDAsIC8v642w7J207YSw7JeG7J2MLCAxOuuplO2KuOuhnOuNsOydtO2EsOunjCDsnojsnYwsIDI66rCA6rO1642w7J207YSwKOudvOyduOuzhC4u65OxKSDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhW2NpZF0uc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzJykuc2V0KHRoYXQuZGF0YSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlKHRoYXQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoJ+y1nOyLoO2ZlCDsmYTro4wnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaXR5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9jaXR5LmpzIiwibGV0IE1ldHJvTGluZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGNpZCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZShkYXRhLCBjaWQpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmxpbmVbY2lkXSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1ha2VMaW5lKGNpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkK1wiL21ldHJvTGluZVwiKS5zZXQodGhpcy5tZXRyb0xpbmUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1ldHJvTGluZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG1ha2VMaW5lKGNpZCl7XHJcbiAgICAgICAgZm9yIChsZXQgbGluZSBpbiB0aGlzLm1ldHJvTGluZSkge1xyXG4gICAgICAgICAgICBsZXQgc3RuQXJyID0gdGhpcy5tZXRyb0xpbmVbbGluZV0uc3RuO1xyXG5cclxuICAgICAgICAgICAgbGV0IG9yZGVyQXJyID0gW107XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmxpbmVbY2lkXVtsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLmxpbmVbY2lkXVtsaW5lXVswXTtcclxuICAgICAgICAgICAgICAgIGxldCBlbmQgPSB0aGlzLmxpbmVbY2lkXVtsaW5lXVsxXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RuQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0biA9IHN0bkFycltpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihzdG4ubmFtZSA9PT0gc3RhcnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlckFyci5wdXNoKHN0bik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RuQXJyLnNwbGljZShpZHgsMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1heCA9IHN0bkFyci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6IDIwMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BsaWNlSWR4ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdG5BcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0biA9IHN0bkFycltqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IG9yZGVyQXJyW29yZGVyQXJyLmxlbmd0aC0xXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBjYWxjdWxhdGVEaWYodGFyZ2V0LmNvb3IsIHN0bi5jb29yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGlmPG5leHQuZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTpzdG4ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0OnN0bi5jb29yLmxhdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG5nOnN0bi5jb29yLmxuZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOmRpZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwbGljZUlkeCA9IGo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJBcnIucHVzaChuZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBzdG5BcnIuc3BsaWNlKHNwbGljZUlkeCwxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1ldHJvTGluZVtsaW5lXS5zdG4gPSBvcmRlckFycjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1ldHJvTGluZTp7fSxcclxuXHJcbiAgICBsaW5lOntcclxuICAgICAgICBueWM6e1xyXG4gICAgICAgICAgICAxOltcIlZhbiBDb3J0bGFuZHQgUGFyayAtIDI0Mm5kIFN0XCIsXCJTb3V0aCBGZXJyeVwiXSxcclxuICAgICAgICAgICAgMjpbXCJXYWtlZmllbGQgLSAyNDFzdCBTdFwiLFwiQnJvb2tseW4gQ29sbGVnZSAtIEZsYXRidXNoIEF2ZVwiXSxcclxuICAgICAgICAgICAgMzpbXCJIYXJsZW0gLSAxNDggU3RcIixcIk5ldyBMb3RzIEF2ZVwiXSxcclxuICAgICAgICAgICAgNDpbXCJXb29kbGF3blwiLFwiTmV3IExvdHMgQXZlXCJdLFxyXG4gICAgICAgICAgICA1OltcIkVhc3RjaGVzdGVyIC0gRHlyZSBBdmVcIixcIkJyb29rbHluIENvbGxlZ2UgLSBGbGF0YnVzaCBBdmVcIl0sXHJcbiAgICAgICAgICAgIDY6W1wiUGVsaGFtIEJheSBQYXJrXCIsXCJCcm9va2x5biBCcmlkZ2UgLSBDaXR5IEhhbGxcIl0sXHJcbiAgICAgICAgICAgIDc6W1wiRmx1c2hpbmcgLSBNYWluIFN0XCIsXCIzNHRoIFN0IC0gSHVkc29uIFlhcmRzXCJdLFxyXG4gICAgICAgICAgICBBOltcIklud29vZCAtIDIwN3RoIFN0XCIsXCJSb2NrYXdheSBQYXJrIC0gQmVhY2ggMTE2IFN0XCJdLFxyXG4gICAgICAgICAgICBCOltcIkJlZGZvcmQgUGFyayBCbHZkXCIsXCJCcmlnaHRvbiBCZWFjaFwiXSxcclxuICAgICAgICAgICAgQzpbXCIxNjh0aCBTdFwiLFwiRXVjbGlkIEF2ZVwiXSxcclxuICAgICAgICAgICAgRDpbXCJOb3J3b29kIC0gMjA1dGggU3RcIixcIkNvbmV5IElzbGFuZCAtIFN0aWxsd2VsbCBBdlwiXSxcclxuICAgICAgICAgICAgRTpbXCJKYW1haWNhIEN0ciAtIFBhcnNvbnMgLyBBcmNoZXJcIixcIldvcmxkIFRyYWRlIENlbnRlclwiXSxcclxuICAgICAgICAgICAgRjpbXCJKYW1haWNhIC0gMTc5dGggU3RcIixcIkNvbmV5IElzbGFuZCAtIFN0aWxsd2VsbCBBdlwiXSxcclxuICAgICAgICAgICAgRzpbXCJMb25nIElzbGFuZCBDaXR5IC0gQ291cnQgU3FcIixcIkNodXJjaCBBdmVcIl0sXHJcbiAgICAgICAgICAgIEo6W1wiSmFtYWljYSBDdHIgLSBQYXJzb25zIC8gQXJjaGVyXCIsXCJCcm9hZCBTdFwiXSxcclxuICAgICAgICAgICAgTDpbXCIxNCBTdHJlZXQgLyA4IEF2XCIsXCJDYW5hcnNpZSAtIFJvY2thd2F5IFBrd3lcIl0sXHJcbiAgICAgICAgICAgIE06W1wiRm9yZXN0IEhpbGxzIC0gNzFzdCBBdlwiLFwiTWlkZGxlIFZpbGxhZ2UgLSBNZXRyb3BvbGl0YW4gQXZlXCJdLFxyXG4gICAgICAgICAgICBOOltcIkFzdG9yaWEgLSBEaXRtYXJzIEJsdmRcIixcIkNvbmV5IElzbGFuZCAtIFN0aWxsd2VsbCBBdlwiXSxcclxuICAgICAgICAgICAgUTpbXCI5NnRoIFN0XCIsXCJDb25leSBJc2xhbmQgLSBTdGlsbHdlbGwgQXZcIl0sXHJcbiAgICAgICAgICAgIFI6W1wiRm9yZXN0IEhpbGxzIC0gNzFzdCBBdlwiLFwiQmF5IFJpZGdlIC0gOTV0aCBTdFwiXSxcclxuICAgICAgICAgICAgLy8gUzpbXCJcIixcIlwiXSwgIFPshKDsnYAg7JW96rCEIOyFlO2LgOqwmeydgOyekOyLneyehFxyXG4gICAgICAgICAgICBXOltcIkFzdG9yaWEgLSBEaXRtYXJzIEJsdmRcIixcIldoaXRlaGFsbCBTdFwiXSxcclxuICAgICAgICAgICAgWjpbXCJKYW1haWNhIEN0ciAtIFBhcnNvbnMgLyBBcmNoZXJcIixcIkJyb2FkIFN0XCJdXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGRhdGEsIGNpZCl7XHJcbiAgICAgICAgbGV0IHNwb3RzID0gZGF0YS5zcG90cy5yYW5rZWQ7XHJcbiAgICAgICAgbGV0IG1heCA9IHNwb3RzLmxlbmd0aDtcclxuICAgICAgICBpZihtYXg+OTkpe1xyXG4gICAgICAgICAgICBtYXggPSA5OTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXRyb3MgPSBkYXRhLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgIGxldCBtZXRyb0xpbmUgPSB7fTtcclxuICAgICAgICBsZXQgdGVtcExpbmUgPSB7fTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZXRyb3MubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvID0gbWV0cm9zW2pdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhhc1Nwb3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCBzcG90ID0gc3BvdHNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gNjAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBEaWYgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHNwb3QuZW50ZXJhbmNlKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHNwb3QuZW50ZXJhbmNlLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbnQgPSBzcG90LmVudGVyYW5jZVtrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcERpZiA9IGNhbGN1bGF0ZURpZihlbnQsIG1ldHJvLmNvb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0ZW1wRGlmPGRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWYgPSB0ZW1wRGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcERpZiA9IGNhbGN1bGF0ZURpZihzcG90LmNvb3IsIG1ldHJvLmNvb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYodGVtcERpZjxkaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZiA9IHRlbXBEaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaGFzU3BvdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtZXRyby5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gbWV0cm8ubGluZVtrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXRlbXBMaW5lW2xpbmVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lW2xpbmVdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGVtcExpbmVbbGluZV1baV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGlmIDwgdGVtcExpbmVbbGluZV1baV0uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVtsaW5lXVtpXSA9IHtjb29yOnNwb3QuY29vciwgcmFuazppLCBuYW1lOnNwb3QubmFtZSwgZGlmOmRpZiwgc3RuOntjb29yOm1ldHJvLmNvb3IsIG5hbWU6bWV0cm8ubmFtZX19OyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVtsaW5lXVtpXSA9IHtjb29yOnNwb3QuY29vciwgcmFuazppLCBuYW1lOnNwb3QubmFtZSwgZGlmOmRpZiwgc3RuOntjb29yOm1ldHJvLmNvb3IsIG5hbWU6bWV0cm8ubmFtZX19OyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBsaW5lIGluIHRlbXBMaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBtZXRyb0xpbmVbbGluZV0gPSB7c3BvdDpbXSxzdG46W119O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHJhbmsgaW4gdGVtcExpbmVbbGluZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb0xpbmVbbGluZV0uc3BvdC5wdXNoKHRlbXBMaW5lW2xpbmVdW3JhbmtdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZXRyb3MubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvID0gbWV0cm9zW2pdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1ldHJvLmxpbmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lID0gbWV0cm8ubGluZVtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihtZXRyb0xpbmVbbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldHJvTGluZVtsaW5lXS5zdG4ucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6bWV0cm8uY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTptZXRyby5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtZXRyb0xpbmVbbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6W10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0bjpbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcjptZXRyby5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTptZXRyby5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1ldHJvTGluZSA9IG1ldHJvTGluZTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1ldHJvTGluZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9jaXR5L21ldHJvTGluZS5qcyIsImltcG9ydCBGaXJzdF9jaGVjayBmcm9tIFwiLi9zcG90L2ZpcnN0X2NoZWNrLmpzXCI7XHJcbmltcG9ydCBTZWNvbmRfY29tYmluZSBmcm9tIFwiLi9zcG90L3Nlb25kX2NvbWJpbmUuanNcIjtcclxuaW1wb3J0IFRoaXJkX2ZpbmFsaXplIGZyb20gXCIuL3Nwb3QvdGhpcmRfZmluYWxpemUuanNcIjtcclxuXHJcbnZhciBTcG90ID0ge1xyXG4gICAgY2l0aWVzOiB7fSxcclxuICAgIG9yZGVyOlwiXCIsXHJcbiAgICBkYXRhOiB7fSxcclxuICAgIGN1cnJlbnQ6XCJcIiwgLy/tmITsnqwg67O06rOg7J6I64qUIOuPhOyLnCBjaWQgLSBmaXJlYmFzZSByZWbsl5Agb2ZmIOuLrOq4sOychO2VtFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh1X2kpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBGaXJzdF9jaGVjay5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMub3JkZXIgPSB1X2kuc2V0dGluZy5vcmRlcjtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzJykub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGF0LmNpdGllcyA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoYXQub3JkZXIgPSB1X2kuc2V0dGluZy5vcmRlcjtcclxuICAgICAgICAgICAgdGhhdC5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX3N0YXR1cygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5hY3RpdmVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY2lkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gdGhhdC5jaXRpZXNbY2lkXS5zdGF0dXMuc3BvdDtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jaXR5KGNpZCwgc3RhdHVzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIub3JkZXJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0Lm9yZGVyID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIHZhciB1aWQgPSB1X2kubWFpbDtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3VzZXJzLycgKyB1aWQgKyBcIi9zZXR0aW5nL29yZGVyXCIpLnNldCh0aGF0Lm9yZGVyKTtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX3N0YXR1cygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5yZXR1cm5cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfc3RhdHVzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vMuywqOqygOymnVxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLnJlbW92ZV9zcG90XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIFRoaXJkX2ZpbmFsaXplLnJlbW92ZV9zcG90KCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5yZWRvX3JlbW92ZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBUaGlyZF9maW5hbGl6ZS5yZWRvX3JlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9zdGF0dXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XHJcblxyXG4gICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJoZWFkZXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPGgyPuq0gOq0keyngCDrjbDsnbTthLAg7KCV66asIO2YhO2ZqTwvaDI+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwib3JkZXJcIiBpZD1cImFiY1wiPuqwgOuCmOuLpOyInDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJvcmRlclwiIGlkPVwiY2hhbmdlZFwiPuyImOygleyLnOqwhOyInDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJsaW5lciBsaW5lci0taGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NpdHlOYW1lXCI+64+E7Iuc66qFPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj7sg4Htg5w8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NoYXJnZVwiPuuLtOuLueyekDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgdmFyIG9yZGVyQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgY2lkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcmRlciA9PT0gXCJhYmNcIikge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJBcnJheS5wdXNoKHsgY2lkOiBjaWQsIGlkeDogY2l0eS5uYW1lIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IFwiY2hhbmdlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBvcmRlckFycmF5LnB1c2goeyBjaWQ6IGNpZCwgaWR4OiBjaXR5Lm9yZGVyLmNoYW5nZWQgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9yZGVyQXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5pZHggPiBiLmlkeCA/IDEgOiBhLmlkeCA8IGIuaWR4ID8gLTEgOiAwO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgc3RhdHVzQXJyYXkgPSBbXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3Bhbj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuPuyZhOujjDwvc3Bhbj48L3A+JyxcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuyZhOujjDwvc3Bhbj48L3A+J1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3JkZXJBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2lkID0gb3JkZXJBcnJheVtpXS5jaWQ7XHJcbiAgICAgICAgICAgIGxldCBjaXR5ID0gZGF0YVtjaWRdO1xyXG5cclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwibGluZXJcIiBpZD1cIicgKyBjaWQgKyAnXCI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaXR5TmFtZVwiPicgKyBjaXR5Lm5hbWUgKyAnPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCArPSBzdGF0dXNBcnJheVtjaXR5LnN0YXR1cy5zcG90XTtcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaGFyZ2VcIj7ri7Tri7nsnpA8L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7Ly93cmFwcGVyIOuLq+q4sFxyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLnNwb3RcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgICQoXCIjXCIgKyB0aGlzLm9yZGVyKS5hZGRDbGFzcyhcIm9yZGVyLS1zZWxlY3RlZFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jaXR5OiBmdW5jdGlvbiAoY2lkLCBzdGF0dXMpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgdGhhdC5jdXJyZW50KS5vZmYoXCJ2YWx1ZVwiKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgY2lkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnQgPSBjaWQ7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2l0eU5hbWUgPSB0aGF0LmNpdGllc1tjaWRdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAxKSB7ICAgLy/tmITsnqwg7KCV67O07IiY7KeR7IOB7YOcIOqygOymnVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuaGVhZGVyXCIpLmh0bWwoJzxoMj4nICsgY2l0eU5hbWUgKyAnIOygleuztOqygOymnTwvaDI+JykuYXR0cignY2lkJywgY2lkKS5hdHRyKCdjaXR5TmFtZScsY2l0eU5hbWUpLmFkZENsYXNzKFwiY2l0eU5hbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRmlyc3RfY2hlY2suaW5mbGF0ZShkYXRhLnNwb3RzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAyKSB7IC8v7ZWp7LmY6riw7J6R7JeFXHJcbiAgICAgICAgICAgICAgICAgICAgU2Vjb25kX2NvbWJpbmUuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgIC8vMuywqOqygOymne2ZlOuptOqzvCDsmYTro4ztmZTrqbTsnYAg65Sw66GcIOywqOydtOqwgCDsl4bsnYxcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmhlYWRlclwiKS5odG1sKCc8aDI+JyArIGNpdHlOYW1lICsgJyAy7LCo6rKA7KadPC9oMj4nKS5hdHRyKCdjaWQnLCBjaWQpLmF0dHIoJ2NpdHlOYW1lJyxjaXR5TmFtZSkuYWRkQ2xhc3MoXCJjaXR5TmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBUaGlyZF9maW5hbGl6ZS5pbmZsYXRlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfslYTrrLTrn7Ag642w7J207YSw6rCAIOyXhuyKteuLiOuLpC4g642w7J207YSwIOyImOynkeydhCDrqLzsoIAg7KeE7ZaJ7ZW07KO87IS47JqULicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIubmF2X19pdGVtXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnbmF2X19pdGVtLS1oYXNEcmF3ZXInKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgdGhhdC5jdXJyZW50KS5vZmYoXCJ2YWx1ZVwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5uYXZfX2RyYXdlcl9faXRlbSBcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdpZCcpID09PSAnbmF2X3Nwb3QnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgdGhhdC5jdXJyZW50KS5vZmYoXCJ2YWx1ZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwb3Q7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC5qcyIsImltcG9ydCBBdXRvQ29tYmluZSBmcm9tICcuL2F1dG9Db21iaW5lLmpzJztcclxuXHJcbnZhciBGaXJzdF9DaGVjayA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fcmVtYWluTGFyZ2VEYXRhXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5zZXRSZW1haW5OdW1iZXIoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIiksICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIuY2hlY2tfX3JlbWFpbk51bWJlclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19ub2RhdGFcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2lkID0gJCh0aGlzKS5hdHRyKCdzaWQnKTtcclxuICAgICAgICAgICAgdGhhdC5zaXRlTm9kYXRhKHNpZCk7XHJcbiAgICAgICAgICAgIHRvYXN0KCfrjbDsnbTthLAg6rO167CxIOyymOumrCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+yijO2RnCDsl4bripQg6rSA6rSR7KeA7J2YIOyijO2RnOulvCDsnoXroKXtlahcclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fc3BvdERlbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsZXRlU3BvdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fc3BvdE5hbWVcIikuaHRtbCgpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/sooztkZwg7JeG64qUIOq0gOq0keyngOydmCDsooztkZzrpbwg7J6F66Cl7ZWoXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX2NvbmZpcm1cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmlucHV0Q29vcmRpbmF0ZSgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fc3BvdENvb3JcIikudmFsKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaXRlTm9kYXRhOiBmdW5jdGlvbiAoc2lkKSB7XHJcbiAgICAgICAgdmFyIGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcblxyXG4gICAgICAgIGlmIChjb25maXJtKFwi642w7J207YSw66W8IOygleunkCDsl4bslbHri4jquYwhP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2lkICsgXCIvbm9kYXRhXCIpLnNldCh0cnVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgc2V0UmVtYWluTnVtYmVyOiBmdW5jdGlvbiAoc2l0ZSwgbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IGN1dE5vID0gbnVtYmVyLnRyaW0oKSAqIDE7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKGN1dE5vIDwgMTAwKSB7XHJcbiAgICAgICAgICAgIHRvYXN0KFwiMTAw6rCcIOydtOyDgeydmCDsnqXshozrpbwg7Jyg7KeA7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKFwi7Iic7JyEIFwiICsgY3V0Tm8gKyBcIuychCDrr7jrp4wg7J6l7IaM66W8IOuqqOuRkCDsoJzqsbDtlanri4jri6QuIOunnuyKteuLiOq5jD9cIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXRPYmogPSB0aGlzLmRhdGEuc3BvdHNbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICBjdXRPYmoubGVuZ3RoID0gY3V0Tm87XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlKS5zZXQoY3V0T2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlU3BvdDogZnVuY3Rpb24gKHNpZCwgbmFtZSkge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlID0gc2lkLnNwbGl0KFwiX1wiKVswXTtcclxuICAgICAgICBsZXQgbm8gPSBzaWQuc3BsaXQoXCJfXCIpWzFdO1xyXG5cclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShuYW1lICsgXCIg7J6l7IaM66W8IOygnOqxsO2VqeuLiOuLpC4g6rOE7IaN7ZWg6rmM7JqUP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubykuc2V0KHsgZGVsZXRlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsnqXshozqsIAg7KCc6rGw65CY7JeI7Iq164uI64ukLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShubyArIFwi67KIIOyepeyGjOulvCDsoJzqsbDtlanri4jri6QuIOqzhOyGje2VoOq5jOyalD9cIikpIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSArIFwiL1wiICsgbm8pLnNldCh7IGRlbGV0ZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiICsgc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7J6l7IaM6rCAIOygnOqxsOuQmOyXiOyKteuLiOuLpC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0Q29vcmRpbmF0ZTogZnVuY3Rpb24gKHNpZCwgY29vclR4dCkge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlID0gc2lkLnNwbGl0KFwiX1wiKVswXTtcclxuICAgICAgICBsZXQgbm8gPSBzaWQuc3BsaXQoXCJfXCIpWzFdO1xyXG4gICAgICAgIGxldCBjb29yID0ge307XHJcblxyXG4gICAgICAgIGlmIChjb29yVHh0LnNwbGl0KFwiLFwiKS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgbGV0IGxhdCA9IGNvb3JUeHQuc3BsaXQoXCIsXCIpWzBdLnRyaW0oKSAqIDE7XHJcbiAgICAgICAgICAgIGxldCBsbmcgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVsxXS50cmltKCkgKiAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzTmFOKGxhdCkgfHwgaXNOYU4obG5nKSkge1xyXG4gICAgICAgICAgICAgICAgLy/sooztkZwg7KSRIO2VmOuCmOqwgFxyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg67aA7KCV7ZmV7ZWY6rKMIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvb3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OiBsYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOiBsbmdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyijO2RnOqwgCDsnoXroKXrkJjsl4jsirXri4jri6RcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiICsgc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSArIFwiL1wiICsgbm8gKyBcIi9jb29yXCIpLnNldChjb29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOu2gOygle2Zle2VmOqyjCDsnoXroKXrkJjsl4jsirXri4jri6RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAkKFwiLmhlYWRlclwiKS5hcHBlbmQoJzxwIGNsYXNzPVwicmV0dXJuXCI+64+M7JWE6rCA6riwPC9wPicpO1xyXG5cclxuICAgICAgICBsZXQgaGFzUHJvYmxlbSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuICAgICAgICBsZXQgc2VhcmNoVXJsID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jby5rci9tYXBzL3BsYWNlLycgKyAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoJ2NpdHlOYW1lJykgKyBcIitcIjtcclxuXHJcbiAgICAgICAgbGV0IHNpdGVPYmogPSB7XHJcbiAgICAgICAgICAgIGdnOiBcIuq1rOq4gFwiLFxyXG4gICAgICAgICAgICBudjogXCLrhKTsnbTrsoRcIixcclxuICAgICAgICAgICAgdGE6IFwi7Yq466a97Ja065Oc67CU7J207KCAXCIsXHJcbiAgICAgICAgICAgIGxwOiBcIuuhoOumrO2UjOuemOuLm1wiXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiBzaXRlT2JqKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2l0ZUhhc1Byb2JsZW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yVHh0ID0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+7KKM7ZGc6rCAIOyeheugpeuQmOyngCDslYrsnYAg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICBsZXQgbm9TcG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3RUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7ruYTslrTsnojripQg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSwIO2ZleyduDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhW3NpdGVdLm5vZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtzaXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IGRhdGFbc2l0ZV1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGFzQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5kZWxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/snbzrtoDrn6wg7IKt7KCc7ZWcIOq0gOq0keyngCAtPiDrhJjslrTqsITri6RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QuY29vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5jb29yLmxuZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHNwb3QuY29vci5sbmcgKiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QuY29vci5sYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc05hTihzcG90LmNvb3IubGF0ICogMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc0Nvb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicgKyBzaXRlICsgJ18nICsgaSArICdcIj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxhIGNsYXNzPVwiY2hlY2tfX3Nwb3ROYW1lXCIgaHJlZj1cIicgKyBzZWFyY2hVcmwgKyBzcG90Lm5hbWUgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIHNwb3QubmFtZSArICc8L2E+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fc3BvdENvb3JcIiBwbGFjZWhvbGRlcj1cInh4Lnh4eHh4LCB4eC54eHh4eCDtmJXtg5wg7J6F66ClXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19jb25maXJtXCI+7KKM7ZGcIOyeheugpTwvcD48cCBjbGFzcz1cImNoZWNrX19zcG90RGVsZXRlXCI+7J6l7IaMIOyCreygnDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdfJyArIGkgKyAnXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdHh0XCI+JyArIGkgKyAnIOuyiCDqtIDqtJHsp4A8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3BvdERlbGV0ZVwiPuyepeyGjCDsgq3soJw8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZUhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vQ29vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gbm9Db29yVHh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9TcG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSBub1Nwb3RUeHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtzaXRlXS5sZW5ndGggPiAxNTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxhcmdlT0sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sYXJnZURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxhcmdlRGF0YVtzaXRlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMTUw6rCcIOydtOyDgeydmCDrjbDsnbTthLDrpbwg67O07Jyg7ZWY66Ck66m0IOuPhOyLnOuqhS9zcG90cy9sYXJnZURhdGEv7IKs7J207Yq466qF7J20IHRydWXrnbzqs6Ag67aA7Jes65CY7Ja07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXJnZU9LID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXJnZU9LID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGFyZ2VPSykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+JyArIHNpdGVPYmpbc2l0ZV0gKyAnIOyepeyGjCDrjbDsnbTthLDqsIAgMTUw6rCc66W8IOy0iOqzvCgnICsgZGF0YVtzaXRlXS5sZW5ndGggKyAn6rCcKe2VqeuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdcIj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fcmVtYWluTnVtYmVyXCIgdmFsdWU9XCInICsgZGF0YVtzaXRlXS5sZW5ndGggKyAnXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fcmVtYWluTGFyZ2VEYXRhXCI+6rCc7J2YIOyepeyGjCDsnKDsp4DtlZjquLA8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSw6rCAIOyhtOyerO2VmOyngCDslYrsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlIGNoZWNrX19ub2RhdGFcIiBzaWQ9XCInICsgc2l0ZSArICdcIj7rjbDsnbTthLDqsIAg7JuQ656YIOyXhuydhCDqsr3smrAg7YG066at7ZW07KO87IS47JqlPC9wPic7XHJcbiAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiDsm5Drnpgg7IKs7J207Yq4IOuNsOydtO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK64qUIOqyveyasOulvCDrjIDruYTtlZwg67KE7Yq87J2EIOunjOuTpOqzoCBzaXRlIOqwkuycvOuhnCBub2RhdGE6IHRydWXrpbwg64Sj7Ja07KSA64ukLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc2l0ZUhhc1Byb2JsZW0pIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7rsJzqsqzrkJwg66y47KCc6rCAIOyXhuyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzUHJvYmxlbSkge1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2ZpbmlzaFwiPuqygOyCrOulvCDrqqjrkZAg66eI7LOk7Iq164uI64ukPC9wPic7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdCAud3JhcHBlclwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cignY2lkJyk7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi67Cc6rKs65CcIOusuOygnOqwgCDsl4bslrQg642w7J207YSwIOuzke2VqeydhCDsi6Tsi5ztlanri4jri6QuXCIpO1xyXG5cclxuICAgICAgICAgICAgQXV0b0NvbWJpbmUuaW5pdChkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIud3JhcFwiKS5zY3JvbGxUb3AoMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpcnN0X0NoZWNrO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvZmlyc3RfY2hlY2suanMiLCIvL2ZpcnN0X2NoZWNr7JeQ7ISc66eMIGltcG9ydGVkIOuQmOqzoCDsgqzsmqnrkKhcclxuXHJcbnZhciBBdXRvQ29tYmluZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgIGxldCBjaWQgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGVBcnIgPSBbXCJnZ1wiLCBcImxwXCIsIFwibnZcIiwgXCJ0YVwiXTtcclxuICAgICAgICBsZXQgY29tYmluaW5nID0ge307XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpdGVBcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpdGUgPSBzaXRlQXJyW2pdO1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtzaXRlXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0ubm9EYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdW2ldICYmICFkYXRhW3NpdGVdW2ldLmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGRTcG90ID0gZGF0YVtzaXRlXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6riw7KG0IOygleuztOulvCBvbGRTcG907J2065286rOgIO2VmOyekC4g7IOI66Gc7Jq0IOyKpO2Mn+ygleuztOyXkOuKlCDsnbTrpoTsnYQg7ZWcL+yYgeycvOuhnCDrtoTtlaDtlZjqs6Ag656t7YK57J2EIOu2gOyXrO2VoCDqsoPsnbTri6QuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrbzogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW46IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IG9sZFNwb3QuY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5rOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9b6rCALe2eo10vLnRlc3Qob2xkU3BvdC5uYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5rbyA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC5uYW1lLmVuID0gb2xkU3BvdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC5yYW5rW3NpdGVdID0gaTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkU3BvdC51cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90LnVybCA9IG9sZFNwb3QudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFNwb3QudGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC50YWcgPSBvbGRTcG90LnRhZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlciA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczAwXCIgKyBjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ZXIgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzMFwiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzXCIgKyBjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyKytcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gLy/tlZzrsJTtgLQg64+M7JWY64u5XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IGNvbWJpbmVPYmogPSB7fVxyXG4gICAgICAgIGxldCBjb21iaW5lZCA9IHt9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNvZGUgaW4gY29tYmluaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBzcG90ID0gY29tYmluaW5nW2NvZGVdO1xyXG4gICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdID0gc3BvdFxyXG4gICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmUgPSB7fTtcclxuICAgICAgICAgICAgbGV0IGhhc0NvbWJpbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8v7ZWp7LmgIOqyg+ydtCDsl4bsnLzrqbQg67CU66GcIGNvbWJpbmVkIOyqveycvOuhnCDrs7Trgrjri6QuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB0Q29kZSBpbiBjb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlIDwgdENvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdFNwb3QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29tYmluaW5nW3RDb2RlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0U3BvdFtrZXldID0gY29tYmluaW5nW3RDb2RlXVtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdFNwb3QuZGVsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gY2FsY3VsYXRlRGlmKHNwb3QuY29vciwgdFNwb3QuY29vcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWYgPCAyNTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0uY29tYmluZVt0Q29kZV0gPSB0U3BvdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NvbWJpbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFoYXNDb21iaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29tYmluZWRbY29kZV0gPSBjb21iaW5lT2JqW2NvZGVdO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvbWJpbmVPYmpbY29kZV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpZCArIFwiL3Nwb3RzXCIpLnNldCh7XHJcbiAgICAgICAgICAgIGNvbWJpbmluZzogY29tYmluZU9iaixcclxuICAgICAgICAgICAgY29tYmluZWQ6IGNvbWJpbmVkXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cy9zcG90Jykuc2V0KDEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdXRvQ29tYmluZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2F1dG9Db21iaW5lLmpzIiwidmFyIFNlY29uZF9jb21iaW5lID0ge1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY29uZF9jb21iaW5lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3Qvc2VvbmRfY29tYmluZS5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4vY29uZmlnLmpzXCI7XHJcblxyXG52YXIgVGhpcmRfZmluYWxpemUgPSB7XHJcbiAgICB0ZW1wOmZhbHNlLFxyXG4gICAgc3BvdE9iajp7fSxcclxuXHJcbiAgICByZW1vdmVfc3BvdDogZnVuY3Rpb24oc2lkKXtcclxuICAgICAgICBsZXQgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzcG90TmFtZSA9ICQoXCIjXCIrc2lkKS5jaGlsZHJlbihcIi5yZXN1bHRfbmFtZV9rb1wiKS52YWwoKTtcclxuICAgICAgICBpZihjb25maXJtKGAke3Nwb3ROYW1lfSDqtIDqtJHsp4Drpbwg7KCc6rGw7ZWp64uI64ukLiDtmZXsi6TtlZzqsIDsmpQ/YCkpe1xyXG4gICAgICAgICAgICB0aGlzLnRlbXAgPSB0aGlzLnNwb3RPYmpbc2lkXTtcclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpZCtcIi9zcG90cy9jb21iaW5lZC9cIitzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB0b2FzdChcIuq0gOq0keyngOqwgCDsoJzqsbDrkJjsl4jsirXri4jri6QuXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZG9fcmVtb3ZlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaWQgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IHNpZCA9IHRoaXMudGVtcC5zaWQ7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkK1wiL3Nwb3RzL2NvbWJpbmVkL1wiK3NpZCkuc2V0KHRoaXMudGVtcCk7XHJcbiAgICAgICAgJChcIi5yZWRvX3JlbW92ZVwiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZW1wID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBsZXQgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgICQoXCIuaGVhZGVyXCIpLmFwcGVuZCgnPHAgY2xhc3M9XCJyZXR1cm5cIj7rj4zslYTqsIDquLA8L3A+Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy50ZW1wKXtcclxuICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuYXBwZW5kKCc8cCBjbGFzcz1cInJlZG9fcmVtb3ZlXCI+66eI7KeA66eJIOygnOqxsCDst6jshow8L3A+Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3BvdE9iaiA9IGRhdGEuc3BvdHMuY29tYmluZWQ7XHJcbiAgICAgICAgdGhpcy5zcG90T2JqID0gc3BvdE9iajtcclxuICAgICAgICBsZXQgcmFua0FyciA9IFtdO1xyXG4gICAgICAgIGxldCBzcG90VG90YWwgPSBPYmplY3Qua2V5cyhzcG90T2JqKS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBzaWQgaW4gc3BvdE9iaikge1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IHNwb3RPYmpbc2lkXTtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmRpdmlkdWFsQXJyID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBzaXRlIGluIHNwb3QucmFuaykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhbmsgPSBzcG90LnJhbmtbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsQXJyLnB1c2gocmFuayk7XHJcbiAgICAgICAgICAgICAgICBzY29yZSAtPSByYW5rO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRpdmlkdWFsQXJyLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtaW5SYW5rID0gaW5kaXZpZHVhbEFyclswXTtcclxuICAgICAgICAgICAgc2NvcmUgKz0gKHNwb3RUb3RhbCArIDEwMCAtIG1pblJhbmspKk1hdGguc3FydChNYXRoLnNxcnQoc3BvdFRvdGFsKSk7XHJcbiAgICAgICAgICAgIHNjb3JlIC09IG1pblJhbms7XHJcblxyXG4gICAgICAgICAgICBpZihpbmRpdmlkdWFsQXJyLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSAtPSBzcG90VG90YWwvMjtcclxuICAgICAgICAgICAgICAgIHNjb3JlIC09IG1pblJhbms7XHJcbiAgICAgICAgICAgICAgICBpZihzcG90LnJhbmsubnYpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IDUwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihpbmRpdmlkdWFsQXJyLmxlbmd0aCA9PT0gMyl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSAoc3BvdFRvdGFsIC0gbWluUmFuayk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGluZGl2aWR1YWxBcnIubGVuZ3RoID09PSA0KXtcclxuICAgICAgICAgICAgICAgIHNjb3JlICs9IHNwb3RUb3RhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmFua0Fyci5wdXNoKHtzaWQ6c2lkLCBzY29yZTpzY29yZX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmFua0Fyci5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFua0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2lkID0gcmFua0FycltpXS5zaWQ7XHJcbiAgICAgICAgICAgIGxldCBzcG90ID0gc3BvdE9ialtzaWRdO1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gXCJcIjtcclxuICAgICAgICAgICAgaWYoc3BvdC51cmwpe1xyXG4gICAgICAgICAgICAgICAgdXJsID0gc3BvdC51cmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHJhbmtpbmcgPSB7XHJcbiAgICAgICAgICAgICAgICBnZzpcIlwiLFxyXG4gICAgICAgICAgICAgICAgbnY6XCJcIixcclxuICAgICAgICAgICAgICAgIGxwOlwiXCIsXHJcbiAgICAgICAgICAgICAgICB0YTpcIlwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHNpdGUgaW4gc3BvdC5yYW5rKSB7XHJcbiAgICAgICAgICAgICAgICByYW5raW5nW3NpdGVdID0gc3BvdC5yYW5rW3NpdGVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwicmVzdWx0X2JveFwiIGlkPVwiJytzaWQrJ1wiPjxwIGNsYXNzPVwicmVzdWx0X3JhbmtcIj4nKyhpKzEpKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxpbnB1dCBjbGFzcz1cInJlc3VsdF9uYW1lX2tvXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5rbysnXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxpbnB1dCBjbGFzcz1cInJlc3VsdF9uYW1lX2VuXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5lbisnXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxpbnB1dCBjbGFzcz1cInJlc3VsdF91cmxcIiB2YWx1ZT1cIicrdXJsKydcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfZ2dcIj4nK3JhbmtpbmcuZ2crJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfbnZcIj4nK3JhbmtpbmcubnYrJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfbHBcIj4nK3JhbmtpbmcubHArJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfdGFcIj4nK3JhbmtpbmcudGErJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfc2F2ZSBzYXZlX3Nwb3RcIj7soIDsnqU8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X3JlbW92ZSByZW1vdmVfc3BvdFwiPuyCreygnDwvcD48L2Rpdj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5zcG90IC53cmFwcGVyXCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgbGV0IHB1c2hBcnIgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmtBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcHVzaEFyci5wdXNoKHNwb3RPYmpbcmFua0FycltpXS5zaWRdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkK1wiL3Nwb3RzL3JhbmtlZFwiKS5zZXQocHVzaEFycik7XHJcblxyXG4gICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IFRoaXJkX2ZpbmFsaXplO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvdGhpcmRfZmluYWxpemUuanMiLCJ2YXIgQ29uZmlnID0ge1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2NvbmZpZy5qcyIsImxldCBBY2NvdW50ID0ge1xyXG4gICAgdXNlcjoge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBpZD1cImFjY291bnRDYWxlbmRhclwiIGNsYXNzPVwiYWNjb3VudF9fY2FsZW5kYXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5hY2NvdW50XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB1aWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVpZCAhPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJbdWlkXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YVt1aWRdLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJyNhY2NvdW50Q2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgIHZpZXdSZW5kZXI6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24gKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2FjY291bnQuanMiLCJsZXQgU3Vid2F5ID0ge1xyXG4gICAgbWFwOnt9LFxyXG4gICAgbWFya2VyOmZhbHNlLFxyXG4gICAgbWV0cm86W10sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5bG9cIilcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvbnljL21ldHJvXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdGhhdC5tZXRybyA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YndheU1hcCcpLCB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiA0MC43NDg0NCwgbG5nOiAtNzMuOTg1NjYgfSxcclxuICAgICAgICAgICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tYXAuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRTdWJ3YXkoZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZmluZFN1YndheTogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgbGV0IGNvb3IgPSB7XHJcbiAgICAgICAgICAgIGxhdDplLmxhdExuZy5sYXQoKSxcclxuICAgICAgICAgICAgbG5nOmUubGF0TG5nLmxuZygpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm1hcmtlcil7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnNldE1hcChudWxsKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGUubGF0TG5nLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgIGxldCBtZXRyb0luZm8gPSB7fVxyXG4gICAgICAgIGxldCBtZXRyb0J5U3RuID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDczOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvTmFtZSA9IHRoaXMubWV0cm9baV0ubmFtZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkaWYgPSBNYXRoLnJvdW5kKGNhbGN1bGF0ZURpZihjb29yLHRoaXMubWV0cm9baV0uY29vcikpO1xyXG5cclxuICAgICAgICAgICAgaWYoZGlmPDcwMCl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMubWV0cm9baV0ubGluZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gdGhpcy5tZXRyb1tpXS5saW5lW2tdLnNsaWNlKDAsMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1ldHJvSW5mb1tsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjxtZXRyb0luZm9bbGluZV0uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvSW5mb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyb05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0luZm9bbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldHJvTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG1ldHJvQnlTdG5bbWV0cm9OYW1lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdLmxpbmUgPSBtZXRyb0J5U3RuW21ldHJvTmFtZV0ubGluZS5jb25jYXQodGhpcy5tZXRyb1tpXS5saW5lKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5tZXRyb1tpXS5saW5lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWV0QXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBsaW5lIGluIG1ldHJvSW5mbykge1xyXG4gICAgICAgICAgICBtZXRBcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bGluZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6bWV0cm9JbmZvW2xpbmVdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkaWY6bWV0cm9JbmZvW2xpbmVdLmRpZlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXRTdG5BcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gbWV0cm9CeVN0bikge1xyXG4gICAgICAgICAgICBtZXRTdG5BcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bWV0cm9CeVN0bltuYW1lXS5saW5lLFxyXG4gICAgICAgICAgICAgICAgbmFtZTpuYW1lLFxyXG4gICAgICAgICAgICAgICAgZGlmOm1ldHJvQnlTdG5bbmFtZV0uZGlmXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWV0QXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZGlmID4gYi5kaWYgPyAxIDogYS5kaWYgPCBiLmRpZiA/IC0xIDogMDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIG1ldFN0bkFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmRpZiA+IGIuZGlmID8gMSA6IGEuZGlmIDwgYi5kaWYgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3RpdGxlXCI+7Jet67OEPC9wPidcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19kaXZcIj4nXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRTdG5BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX3N0bk5hbWVcIj4nKyBtZXRTdG5BcnJheVtpXS5uYW1lICsgJ+yXrTwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fZGlmXCI+JysgTWF0aC5jZWlsKG1ldFN0bkFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTGluZVwiPidcclxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBtZXRTdG5BcnJheVtpXS5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihtZXRTdG5BcnJheVtpXS5saW5lW2tdLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTmFtZSBsbl8nK21ldFN0bkFycmF5W2ldLmxpbmVba10rJ1wiPicrbWV0U3RuQXJyYXlbaV0ubGluZVtrXSArICc8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICB0eHQrPSc8cCBjbGFzcz1cInN1YndheV9faW5mb19fdGl0bGVcIj7rhbjshKDrs4Q8L3A+J1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpdlwiPidcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2xpbmVcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lTmFtZSBsbl8nK21ldEFycmF5W2ldLmxpbmUrJ1wiPicrbWV0QXJyYXlbaV0ubGluZSArICc8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fZGlmXCI+JysgTWF0aC5jZWlsKG1ldEFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19zdG5OYW1lXCI+JysgbWV0QXJyYXlbaV0ubmFtZSArICfsl608L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgJChcIi5zdWJ3YXlfX2luZm9cIikuaHRtbCh0eHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdWJ3YXk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3N1YndheS5qcyIsImltcG9ydCBWaWV3X01ldHJvIGZyb20gXCIuL3ZpZXcvbWV0cm8uanNcIjtcclxuaW1wb3J0IFZpZXdfU3BvdCBmcm9tIFwiLi92aWV3L3Nwb3QuanNcIjtcclxuXHJcbmxldCBWaWV3ID0ge1xyXG4gICAgbWFwOnt9LFxyXG4gICAgZGF0YTp7fSxcclxuXHJcbiAgICBpbmZsYXRlQ2l0eTogZnVuY3Rpb24oY2lkKXtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaWQpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICBWaWV3X01ldHJvLmluaXQoZGF0YSk7XHJcbiAgICAgICAgICAgIFZpZXdfU3BvdC5pbml0KGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB0b2FzdChcIuuPhOyLnOygleuztCDroZzrlKkg7JmE66OMXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW5lcjpmdW5jdGlvbigpe1xyXG4gICAgICAgICQoXCIudmlld1wiKS5vbihcImNsaWNrXCIsIFwiLm1ldHJvX2Z1bGxcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgVmlld19NZXRyby5mdWxsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi52aWV3XCIpLm9uKFwiY2xpY2tcIiwgXCIubWV0cm9fZGlzYWJsZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBWaWV3X01ldHJvLmRpc2FibGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLnZpZXdcIikub24oXCJjbGlja1wiLCBcIi5jbGlja19tZXRyb1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBWaWV3X01ldHJvLmNsaWNrTW9kZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIudmlld1wiKS5vbihcImNsaWNrXCIsIFwiLmNsaWNrX21ldHJvU3BvdFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBWaWV3X01ldHJvLmNsaWNrU3BvdE1vZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLnZpZXdcIikub24oXCJmb2N1c291dFwiLCBcIi5zZXR0ZXJfX3JhZGl1c19faW5wdXRcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgVmlld19NZXRyby5jaGFuZ2VSYWRpdXMoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLnZpZXdcIikub24oXCJjbGlja1wiLCBcIi5zcG90X2Z1bGxcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgVmlld19TcG90LmZ1bGwoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLnZpZXdcIikub24oXCJjbGlja1wiLCBcIi5zcG90X2NvcmVcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgVmlld19TcG90LmNvcmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLnZpZXdcIikub24oXCJjbGlja1wiLCBcIi5zcG90X2Rpc2FibGVcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgVmlld19TcG90LmRpc2FibGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmluZmxhdGVDaXR5KFwibnljXCIpO1xyXG4gICAgICAgIGxldCB0eHQgPSBcIlwiO1xyXG4gICAgICAgIHR4dCArPSBcIjxkaXYgY2xhc3M9J3dyYXBwZXInPlwiO1xyXG4gICAgICAgIHR4dCArPSAgICAgXCI8ZGl2IGNsYXNzPSdsZWZ0JyBpZD0nbWFwJz5cIjtcclxuICAgICAgICB0eHQgKz0gICAgIFwiPC9kaXY+XCI7XHJcbiAgICAgICAgdHh0ICs9ICAgICBcIjxkaXYgY2xhc3M9J3JpZ2h0Jz5cIjtcclxuICAgICAgICB0eHQgKz0gICAgICAgICAgXCI8ZGl2IGNsYXNzPSdoZWFkZXInPjx1bD5cIjtcclxuICAgICAgICB0eHQgKz0gICAgICAgICAgXCI8L3VsPjwvZGl2PlwiO1xyXG4gICAgICAgIHR4dCArPSAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NldHRlcic+PGgzPjwvaDM+PGRpdiBjbGFzcz0nc2V0dGVyX19jb250ZW50Jz48L2Rpdj48L2Rpdj5cIjtcclxuICAgICAgICB0eHQgKz0gICAgICAgICAgXCI8ZGl2IGNsYXNzPSd2aWV3ZXInPjwvZGl2PlwiO1xyXG4gICAgICAgIHR4dCArPSAgICAgXCI8L2Rpdj5cIjtcclxuICAgICAgICB0eHQgKz0gXCI8L2Rpdj5cIjtcclxuICAgICAgICAkKFwiLnBhZ2VzLnZpZXdcIikuaHRtbCh0eHQpO1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVyID0ge1xyXG4gICAgICAgICAgICBcIuuplO2KuOuhnFwiOltcclxuICAgICAgICAgICAgICAgIHtrbzpcIuyngOyasOq4sFwiLCBlbjpcIm1ldHJvX2Rpc2FibGVcIn0sXHJcbiAgICAgICAgICAgICAgICB7a286XCLsoITssrQg64W47ISgXCIsIGVuOlwibWV0cm9fZnVsbFwifSxcclxuICAgICAgICAgICAgICAgIHtrbzpcIu2VteyLrCDrhbjshKBcIiwgZW46XCJtZXRyb19jb3JlXCJ9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwi6rSA6rSR7KeAXCI6W1xyXG4gICAgICAgICAgICAgICAge2tvOlwi7KeA7Jqw6riwXCIsIGVuOlwic3BvdF9kaXNhYmxlXCJ9LFxyXG4gICAgICAgICAgICAgICAge2tvOlwi7KCE7LK0IOq0gOq0keyngFwiLCBlbjpcInNwb3RfZnVsbFwifSxcclxuICAgICAgICAgICAgICAgIHtrbzpcIu2VteyLrCDqtIDqtJHsp4BcIiwgZW46XCJzcG90X2NvcmVcIn1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCLtgbTrpq0g7LaU7KCBXCI6W1xyXG4gICAgICAgICAgICAgICAge2tvOlwi7KeA7ZWY7LKgIOuFuOyEoOunjFwiLGVuOlwiY2xpY2tfbWV0cm9cIn0sXHJcbiAgICAgICAgICAgICAgICB7a286XCLsp4DtlZjssqDqs7wg6rSA6rSR7KeAXCIsIGVuOlwiY2xpY2tfbWV0cm9TcG90XCJ9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgaFR4dCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gaW4gaGVhZGVyKSB7XHJcbiAgICAgICAgICAgIGhUeHQgKz0gJzxsaSBjbGFzcz1cImRyb3Bkb3duXCI+JztcclxuICAgICAgICAgICAgaFR4dCArPSAgICAgJzxwIGNsYXNzPVwiZHJvcGJ0blwiPicraXRlbSsnPC9wPic7XHJcbiAgICAgICAgICAgIGhUeHQgKz0gICAgICc8ZGl2IGNsYXNzPVwiZHJvcGRvd25fX2NvbnRlbnRcIj4nO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkZXJbaXRlbV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGhUeHQgKz0gICAgICc8cCBjbGFzcz1cIicraGVhZGVyW2l0ZW1dW2ldLmVuKydcIj4nK2hlYWRlcltpdGVtXVtpXS5rbysnPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaFR4dCArPSAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIGhUeHQgKz0gJzwvbGk+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgJChcIi52aWV3IC5oZWFkZXJcIikuaHRtbChoVHh0KTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgICAgICBjZW50ZXI6e2xhdDo0MC43NTE2LGxuZzotNzMuOTg4N30sXHJcbiAgICAgICAgICAgIHpvb206MTMsXHJcbiAgICAgICAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWUsXHJcbiAgICAgICAgICAgIHN0eWxlczpbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLmxhbmRfcGFyY2VsXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcclxuICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxyXG4gICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcclxuICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pLnBhcmtcIixcclxuICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxyXG4gICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxyXG4gICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcclxuICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxyXG4gICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxyXG4gICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBWaWV3X01ldHJvLm1hcCA9IHRoaXMubWFwO1xyXG4gICAgICAgIFZpZXdfU3BvdC5tYXAgPSB0aGlzLm1hcDtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpZXc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvdmlldy5qcyIsImxldCBWaWV3X01ldHJvID0ge1xyXG4gICAgbWFwOnt9LFxyXG4gICAgcG9seUxpbmU6e30sXHJcbiAgICBkYXRhOnt9LFxyXG4gICAgbWFya2VyU2V0OiBbXSxcclxuICAgIHJhZGl1czo1MDAsXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgLy/quLDsobQg7IS47YyFIOy0iOq4sO2ZlFxyXG4gICAgICAgIGZvciAodmFyIGxpbmUgaW4gdGhpcy5wb2x5TGluZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvbHlMaW5lW2xpbmVdLnNldE1hcChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wb2x5TGluZSA9IHt9O1xyXG4gICAgICAgIGlmKHRoaXMubWFya2VyKXsgICAgLy/quLDsobQg66eI7LukIOy0iOq4sO2ZlFxyXG4gICAgICAgICAgICB0aGlzLm1hcmtlci5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXJrZXJTZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXJTZXRbaV0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hcmtlclNldCA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IG1ldHJvTGluZSA9IGRhdGEubWV0cm9MaW5lO1xyXG4gICAgICAgIGZvciAobGV0IGxpbmUgaW4gbWV0cm9MaW5lKSB7XHJcbiAgICAgICAgICAgIGlmKG1ldHJvTGluZVtsaW5lXS5zdG4pe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvbHlMaW5lID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1ldHJvTGluZVtsaW5lXS5zdG4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihtZXRyb0xpbmVbbGluZV0uc3RuW2ldLmNvb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2x5TGluZS5wdXNoKG1ldHJvTGluZVtsaW5lXS5zdG5baV0uY29vcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2x5TGluZVtsaW5lXSA9IG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDpwb2x5TGluZSxcclxuICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjptZXRyb0xpbmVbbGluZV0uY29sb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eTogMS4wLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVdlaWdodDogMlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZ1bGw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJChcIi52aWV3IC5zZXR0ZXIgaDNcIikuaHRtbCgn7KCE7LK0IOuFuOyEoCcpO1xyXG4gICAgICAgICQoXCIudmlldyAuc2V0dGVyX19jb250ZW50XCIpLmh0bWwoJycpO1xyXG4gICAgICAgICQoXCIudmlldyAudmlld2VyXCIpLmh0bWwoJycpO1xyXG4gICAgICAgIGlmKHRoaXMubWFya2VyKXsgICAgLy/quLDsobQg66eI7LukIOy0iOq4sO2ZlFxyXG4gICAgICAgICAgICB0aGlzLm1hcmtlci5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmNsZWFyTGlzdGVuZXJzKHRoaXMubWFwLCAnY2xpY2snKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgbGluZSBpbiB0aGlzLnBvbHlMaW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9seUxpbmVbbGluZV0uc2V0TWFwKHRoaXMubWFwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1hcmtlclNldC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtlclNldFtpXS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFya2VyU2V0ID0gW107XHJcbiAgICB9LFxyXG5cclxuICAgIGRpc2FibGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJChcIi52aWV3IC5zZXR0ZXIgaDNcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgJChcIi52aWV3IC5zZXR0ZXJfX2NvbnRlbnRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgJChcIi52aWV3IC52aWV3ZXJcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgaWYodGhpcy5tYXJrZXIpeyAgICAvL+q4sOyhtCDrp4jsu6Qg7LSI6riw7ZmUXHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnNldE1hcChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuY2xlYXJMaXN0ZW5lcnModGhpcy5tYXAsICdjbGljaycpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBsaW5lIGluIHRoaXMucG9seUxpbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5wb2x5TGluZVtsaW5lXS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXJrZXJTZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXJTZXRbaV0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hcmtlclNldCA9IFtdO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGlja01vZGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJChcIi52aWV3IC5zZXR0ZXIgaDNcIikuaHRtbCgn7YG066atIOy2lOyggSAtIOyngO2VmOyyoCDrhbjshKDrp4wnKTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGxpbmUgaW4gdGhpcy5wb2x5TGluZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvbHlMaW5lW2xpbmVdLnNldE1hcChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuY2xlYXJMaXN0ZW5lcnModGhpcy5tYXAsICdjbGljaycpO1xyXG4gICAgICAgIHRoaXMubWFwLmFkZExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICB0aGF0LmZpbmRNZXRybyhlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cInNldHRlcl9fcmFkaXVzXCI+JztcclxuICAgICAgICB0eHQgKz0gICAgICc8c3BhbiBjbGFzcz1cInNldHRlcl9fdHh0XCI+7YOQ7IOJ67CY6rK9IDwvc3Bhbj4nO1xyXG4gICAgICAgIHR4dCArPSAgICAgJzxpbnB1dCBjbGFzcz1cInNldHRlcl9fcmFkaXVzX19pbnB1dFwiIHZhbHVlPVwiJyt0aGlzLnJhZGl1cysnXCI+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIudmlldyAuc2V0dGVyX19jb250ZW50XCIpLmh0bWwodHh0KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tTcG90TW9kZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAkKFwiLnZpZXcgLnNldHRlciBoM1wiKS5odG1sKCftgbTrpq0g7LaU7KCBIC0g7KeA7ZWY7LKgIOuFuOyEoOqzvCDsl7DqtIAg6rSA6rSR7KeAJyk7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBsaW5lIGluIHRoaXMucG9seUxpbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5wb2x5TGluZVtsaW5lXS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmNsZWFyTGlzdGVuZXJzKHRoaXMubWFwLCAnY2xpY2snKTtcclxuICAgICAgICB0aGlzLm1hcC5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgdGhhdC5maW5kTWV0cm9TcG90KGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwic2V0dGVyX19yYWRpdXNcIj4nO1xyXG4gICAgICAgIHR4dCArPSAgICAgJzxzcGFuIGNsYXNzPVwic2V0dGVyX190eHRcIj7tg5Dsg4nrsJjqsr0gPC9zcGFuPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAnPGlucHV0IGNsYXNzPVwic2V0dGVyX19yYWRpdXNfX2lucHV0XCIgdmFsdWU9XCInK3RoaXMucmFkaXVzKydcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi52aWV3IC5zZXR0ZXJfX2NvbnRlbnRcIikuaHRtbCh0eHQpO1xyXG4gICAgfSxcclxuICAgIGNoYW5nZVJhZGl1czogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgaW5wdXQgPSAkKFwiLnNldHRlcl9fcmFkaXVzX19pbnB1dFwiKS52YWwoKSoxO1xyXG4gICAgICAgIGlmKGlzTmFOKGlucHV0KSl7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi7Iir7J6Q66eMIOyeheugpe2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICB9ZWxzZSBpZihpbnB1dD4xMDAmJmlucHV0PDYwMSl7XHJcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gaW5wdXQ7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRvYXN0KFwiMTAwfjYwMCDsgqzsnbTroZwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmluZE1ldHJvU3BvdDogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgbGV0IGxpbmVPYmogPSB7fTsgIC8va2V5OuudvOyduOuqhSwgdmFsdWU6e3N0bjpzdGF0aW9uLCBkaWY6ZGlmfVxyXG4gICAgICAgIGxldCBzdG5BcnIgPSBbXTtcclxuICAgICAgICBsZXQgc3BvdE9iaiA9IHt9O1xyXG5cclxuICAgICAgICBsZXQgY2xpY2tDb29yID0ge1xyXG4gICAgICAgICAgICBsYXQ6ZS5sYXRMbmcubGF0KCksXHJcbiAgICAgICAgICAgIGxuZzplLmxhdExuZy5sbmcoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IG1ldHJvcyA9IHRoaXMuZGF0YS5sb2NhbC5tZXRybztcclxuXHJcbiAgICAgICAgaWYodGhpcy5tYXJrZXIpeyAgICAvL+q4sOyhtCDrp4jsu6Qg7LSI6riw7ZmUXHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnNldE1hcChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgbGluZSBpbiB0aGlzLnBvbHlMaW5lKSB7ICAgLy/quLDsobQg6re466Ck7KC47J6I642YIO2PtOumrOudvOyduCDstIjquLDtmZRcclxuICAgICAgICAgICAgdGhpcy5wb2x5TGluZVtsaW5lXS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXJrZXJTZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXJTZXRbaV0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hcmtlclNldCA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogZS5sYXRMbmcsXHJcbiAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXRyb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvID0gbWV0cm9zW2ldO1xyXG4gICAgICAgICAgICBsZXQgZGlmID0gY2FsY3VsYXRlRGlmKGNsaWNrQ29vciwgbWV0cm8uY29vcik7XHJcbiAgICAgICAgICAgIG1ldHJvLmRpZiA9IGRpZjtcclxuXHJcbiAgICAgICAgICAgIGlmKGRpZjx0aGlzLnJhZGl1cyl7XHJcbiAgICAgICAgICAgICAgICBzdG5BcnIucHVzaChtZXRybyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZXRyby5saW5lLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmUgPSBtZXRyby5saW5lW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihsaW5lT2JqW2xpbmVdKXsgIC8v7J2066+4IOyeiOycvOuptCDsp6fsnYQg65WM66eMIOuNruyWtOyUjOybgFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkaWYgPCBsaW5lT2JqW2xpbmVdLmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lT2JqW2xpbmVdID0gbWV0cm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXsgLy/sl4bsnLzrqbQg7IOI66GcIOy2lOqwgFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lT2JqW2xpbmVdID0gbWV0cm87XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdG5BcnIuc29ydCgoYSwgYikgPT4gYS5kaWYgLSBiLmRpZik7XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwibWV0cm9fX2luZm9cIj4nO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0bkFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RuID0gc3RuQXJyW2ldO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cIm1ldHJvX19pbmZvX19zdG5cIj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJtZXRyb19faW5mb19fc3RuX19uYW1lXCI+Jysgc3RuLm5hbWUgKyAn7JetPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJtZXRyb19faW5mb19fc3RuX19saW5lXCI+JztcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3RuLmxpbmUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lID0gc3RuLmxpbmVbal07XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmRhdGEubWV0cm9MaW5lW2xpbmVdLmNvbG9yO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvbnRDb2xvciA9IFwiI2ZmZlwiO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5kYXRhLm1ldHJvTGluZVtsaW5lXS5mb250Q29sb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRDb2xvciA9IHRoaXMuZGF0YS5tZXRyb0xpbmVbbGluZV0uZm9udENvbG9yO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogc3RuLmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwOnRoaXMubWFwLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogZ29vZ2xlLm1hcHMuU3ltYm9sUGF0aC5DSVJDTEUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBjb2xvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGU6ICg4LWoqMiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdlaWdodDoyXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJTZXQucHVzaChtYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwibWV0cm9fX2luZm9fX2xpbmVOYW1lXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOicrY29sb3IrJzsgY29sb3I6Jytmb250Q29sb3IrJ1wiPicrbGluZSsnPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJtZXRyb19faW5mb19fc3RuX19kaWZcIj4nKyBNYXRoLnJvdW5kKHN0bi5kaWYpICsgJ208L3A+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGxpbmVPYmopO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBsaW5lIGluIGxpbmVPYmopIHtcclxuICAgICAgICAgICAgaWYodGhpcy5wb2x5TGluZVtsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvbHlMaW5lW2xpbmVdLnNldE1hcCh0aGlzLm1hcCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gbGluZU9ialtsaW5lXS5kaWY7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3BvdHMgPSB0aGlzLmRhdGEubWV0cm9MaW5lW2xpbmVdLnNwb3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcG90cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByYW5rID0gc3BvdHNbaV0ucmFuaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5yYWRpdXMgPiBzcG90c1tpXS5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzcG90T2JqW3JhbmtdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGREaWYgPSBzcG90T2JqW3JhbmtdLmRpZi5ob3RlbCArIHNwb3RPYmpbcmFua10uZGlmLnNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RGlmID0gc3BvdHNbaV0uZGlmICsgZGlmO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvbGREaWYgPiBuZXdEaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3RPYmpbcmFua10gPSBzcG90c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90T2JqW3JhbmtdLnN0biA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdDogc3BvdHNbaV0uc3RuLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsOiBsaW5lT2JqW2xpbmVdLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3RPYmpbcmFua10ubGluZSA9IGxpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdE9ialtyYW5rXS5kaWYgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsOmRpZiwgICAgICAgICAgLy/siJnshozsl5DshJwg6rCA6rmM7Jq0IOuplO2KuOuhnOq5jOyngOydmCBkaWZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdDpzcG90c1tpXS5kaWYgICAvL+uplO2KuOuhnOyXkOyEnCDsiqTtjJ/quYzsp4DsnZggZGlmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90T2JqW3JhbmtdID0gc3BvdHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90T2JqW3JhbmtdLnN0biA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90OiBzcG90c1tpXS5zdG4ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbDogbGluZU9ialtsaW5lXS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdE9ialtyYW5rXS5saW5lID0gbGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3RPYmpbcmFua10uZGlmID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsOmRpZiwgICAgICAgICAgLy/siJnshozsl5DshJwg6rCA6rmM7Jq0IOuplO2KuOuhnOq5jOyngOydmCBkaWZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90OnNwb3RzW2ldLmRpZiAgIC8v66mU7Yq466Gc7JeQ7IScIOyKpO2Mn+q5jOyngOydmCBkaWZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHNwb3RPYmopO1xyXG5cclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJzcG90X19pbmZvXCI+JztcclxuXHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwic3BvdF9faW5mb19fbGluZVwiPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInNwb3RfX2luZm9fX25hbWVcIj7qtIDqtJHsp4DrqoU8L3A+JztcclxuICAgICAgICB0eHQgKz0gYDxwIGNsYXNzPVwic3BvdF9faW5mb19fbGluZU5hbWUtLXR4dFwiPuuFuOyEoDwvcD5gO1xyXG4gICAgICAgIHR4dCArPSBgPHAgY2xhc3M9XCJzcG90X19pbmZvX19zdG5OYW1lXCI+7Jet66qFPC9wPmA7XHJcbiAgICAgICAgdHh0ICs9IGA8cCBjbGFzcz1cInNwb3RfX2luZm9fX2Rpc3RhbmNlXCI+7Jet7JeQ7IScIOqxsOumrDwvcD5gO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcblxyXG4gICAgICAgIGZvciAobGV0IHJhbmsgaW4gc3BvdE9iaikge1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IHNwb3RPYmpbcmFua107XHJcbiAgICAgICAgICAgIGxldCBsaW5lID0gc3BvdC5saW5lO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5kYXRhLm1ldHJvTGluZVtsaW5lXS5jb2xvcjtcclxuICAgICAgICAgICAgbGV0IGZvbnRDb2xvciA9IFwiI2ZmZlwiO1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEubWV0cm9MaW5lW2xpbmVdLmZvbnRDb2xvcil7XHJcbiAgICAgICAgICAgICAgICBmb250Q29sb3IgPSB0aGlzLmRhdGEubWV0cm9MaW5lW2xpbmVdLmZvbnRDb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZGlmID0gTWF0aC5yb3VuZChzcG90LmRpZi5zcG90KTtcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cInNwb3RfX2luZm9fX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3BvdF9faW5mb19fbmFtZVwiPicrc3BvdC5uYW1lLmtvKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9IGA8cCBjbGFzcz1cInNwb3RfX2luZm9fX2xpbmVOYW1lXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiR7Y29sb3J9OyBjb2xvcjoke2ZvbnRDb2xvcn1cIj4ke2xpbmV9PC9wPmA7XHJcbiAgICAgICAgICAgIHR4dCArPSBgPHAgY2xhc3M9XCJzcG90X19pbmZvX19zdG5OYW1lXCI+JHtzcG90LnN0bi5zcG90feyXrTwvcD5gO1xyXG4gICAgICAgICAgICB0eHQgKz0gYDxwIGNsYXNzPVwic3BvdF9faW5mb19fZGlzdGFuY2VcIj4ke2RpZn08L3A+YDtcclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLnZpZXcgLnZpZXdlclwiKS5odG1sKHR4dCk7IFxyXG4gICAgfSxcclxuXHJcbiAgICBmaW5kTWV0cm86IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGxldCBsaW5lT2JqID0ge307ICAvL2tleTrrnbzsnbjrqoUsIHZhbHVlOntzdG46c3RhdGlvbiwgZGlmOmRpZn1cclxuICAgICAgICBsZXQgc3RuQXJyID0gW107XHJcblxyXG4gICAgICAgIGxldCBjbGlja0Nvb3IgPSB7XHJcbiAgICAgICAgICAgIGxhdDplLmxhdExuZy5sYXQoKSxcclxuICAgICAgICAgICAgbG5nOmUubGF0TG5nLmxuZygpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgbWV0cm9zID0gdGhpcy5kYXRhLmxvY2FsLm1ldHJvO1xyXG5cclxuICAgICAgICBpZih0aGlzLm1hcmtlcil7ICAgIC8v6riw7KG0IOuniOy7pCDstIjquLDtmZRcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXIuc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBsaW5lIGluIHRoaXMucG9seUxpbmUpIHsgICAvL+q4sOyhtCDqt7jroKTsoLjsnojrjZgg7Y+066as65287J24IOy0iOq4sO2ZlFxyXG4gICAgICAgICAgICB0aGlzLnBvbHlMaW5lW2xpbmVdLnNldE1hcChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1hcmtlclNldC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtlclNldFtpXS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFya2VyU2V0ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBlLmxhdExuZyxcclxuICAgICAgICAgICAgbWFwOiB0aGlzLm1hcFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1ldHJvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbWV0cm8gPSBtZXRyb3NbaV07XHJcbiAgICAgICAgICAgIGxldCBkaWYgPSBjYWxjdWxhdGVEaWYoY2xpY2tDb29yLCBtZXRyby5jb29yKTtcclxuICAgICAgICAgICAgbWV0cm8uZGlmID0gZGlmO1xyXG5cclxuICAgICAgICAgICAgaWYoZGlmPHRoaXMucmFkaXVzKXtcclxuICAgICAgICAgICAgICAgIHN0bkFyci5wdXNoKG1ldHJvKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1ldHJvLmxpbmUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IG1ldHJvLmxpbmVbal07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxpbmVPYmpbbGluZV0peyAgLy/snbTrr7gg7J6I7Jy866m0IOynp+ydhCDrlYzrp4wg642u7Ja07JSM7JuAXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZiA8IGxpbmVPYmpbbGluZV0uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVPYmpbbGluZV0gPSBtZXRybztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNleyAvL+yXhuycvOuptCDsg4jroZwg7LaU6rCAXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVPYmpbbGluZV0gPSBtZXRybztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0bkFyci5zb3J0KChhLCBiKSA9PiBhLmRpZiAtIGIuZGlmKTtcclxuXHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJtZXRyb19faW5mb1wiPic7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RuQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdG4gPSBzdG5BcnJbaV07XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwibWV0cm9fX2luZm9fX3N0blwiPic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cIm1ldHJvX19pbmZvX19zdG5fX25hbWVcIj4nKyBzdG4ubmFtZSArICfsl608L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPGRpdiBjbGFzcz1cIm1ldHJvX19pbmZvX19zdG5fX2xpbmVcIj4nO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdG4ubGluZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpbmUgPSBzdG4ubGluZVtqXTtcclxuICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuZGF0YS5tZXRyb0xpbmVbbGluZV0uY29sb3I7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9udENvbG9yID0gXCIjZmZmXCI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmRhdGEubWV0cm9MaW5lW2xpbmVdLmZvbnRDb2xvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udENvbG9yID0gdGhpcy5kYXRhLm1ldHJvTGluZVtsaW5lXS5mb250Q29sb3I7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBzdG4uY29vcixcclxuICAgICAgICAgICAgICAgICAgICBtYXA6dGhpcy5tYXAsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBnb29nbGUubWFwcy5TeW1ib2xQYXRoLkNJUkNMRSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IGNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogKDgtaioyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OjJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlclNldC5wdXNoKG1hcmtlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJtZXRyb19faW5mb19fbGluZU5hbWVcIiBzdHlsZT1cImJhY2tncm91bmQ6Jytjb2xvcisnOyBjb2xvcjonK2ZvbnRDb2xvcisnXCI+JytsaW5lKyc8L3A+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cIm1ldHJvX19pbmZvX19zdG5fX2RpZlwiPicrIE1hdGgucm91bmQoc3RuLmRpZikgKyAnbTwvcD4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0gICAnPC9kaXY+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGxpbmUgaW4gbGluZU9iaikge1xyXG4gICAgICAgICAgICBpZih0aGlzLnBvbHlMaW5lW2xpbmVdKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9seUxpbmVbbGluZV0uc2V0TWFwKHRoaXMubWFwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi52aWV3IC52aWV3ZXJcIikuaHRtbCh0eHQpO1xyXG5cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpZXdfTWV0cm87XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvdmlldy9tZXRyby5qcyIsImxldCBWaWV3X1Nwb3QgPSB7XHJcbiAgICBtYXJrZXJMYWJlbDpbXSxcclxuXHJcbiAgICBmdWxsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXJrZXJMYWJlbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbWFya2VyID0gdGhpcy5tYXJrZXJMYWJlbFtpXVswXTtcclxuICAgICAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5tYXJrZXJMYWJlbFtpXVsxXTtcclxuICAgICAgICAgICAgbWFya2VyLnNldE1hcCh0aGlzLm1hcCk7XHJcbiAgICAgICAgICAgIGlmKGxhYmVsLmdldE1hcCgpICE9PSB0aGlzLm1hcCl7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5zZXRNYXAodGhpcy5tYXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBkaXNhYmxlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXJrZXJMYWJlbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbWFya2VyID0gdGhpcy5tYXJrZXJMYWJlbFtpXVswXTtcclxuICAgICAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5tYXJrZXJMYWJlbFtpXVsxXTtcclxuICAgICAgICAgICAgbWFya2VyLnNldE1hcChudWxsKTtcclxuICAgICAgICAgICAgbGFiZWwuc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29yZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmRpc2FibGUoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1hcmtlciA9IHRoaXMubWFya2VyTGFiZWxbaV1bMF07XHJcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IHRoaXMubWFya2VyTGFiZWxbaV1bMV07XHJcbiAgICAgICAgICAgIG1hcmtlci5zZXRNYXAodGhpcy5tYXApO1xyXG4gICAgICAgICAgICBsYWJlbC5zZXRNYXAodGhpcy5tYXApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGxldCBzcG90cyA9IGRhdGEuc3BvdHMucmFua2VkO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHNwb3RzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BvdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSBzcG90c1tpXTtcclxuICAgICAgICAgICAgbGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHNwb3QuY29vcixcclxuICAgICAgICAgICAgICAgIGljb246IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBnb29nbGUubWFwcy5TeW1ib2xQYXRoLkNJUkNMRSxcclxuICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogJyM1NTUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjonIzU1NScsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IDJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBsYXRMbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHNwb3QuY29vci5sYXQsIHNwb3QuY29vci5sbmcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGxhYmVsID0gbmV3IE1hcExhYmVsKHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IHNwb3QubmFtZS5rbyxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBsYXRMbmcsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZToxNixcclxuICAgICAgICAgICAgICAgIGFsaWduOidsZWZ0J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXJMYWJlbC5wdXNoKFttYXJrZXIsIGxhYmVsXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlld19TcG90O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3ZpZXcvc3BvdC5qcyIsImltcG9ydCBTZXRIb3RlbEluZm8gZnJvbSBcIi4vaG90ZWwvc2V0SG90ZWxJbmZvXCI7XHJcbmltcG9ydCBTZXRBcmVhIGZyb20gXCIuL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhXCI7XHJcblxyXG52YXIgSG90ZWwgPSB7XHJcblxyXG5cclxuICAgIC8vaW5mbGF0Ze2VmOuptCDtmLjthZTsnYQg66eM65Ok7Ja064K06riwIOychO2VnCDsoJXrs7Qg7IiY7KeRIOyDge2DnOqwgCDtkZzsi5zrkKggLT4gXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLm9uKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGVfc3RhdHVzKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuc3RhdHVzX19tYWtlX19ob3RlbFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSAkKHRoaXMpLmF0dHIoJ2NpZCcpO1xyXG4gICAgICAgICAgICB2YXIgY2l0eU5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcuc3RhdHVzX19jaXR5JykuaHRtbCgpO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIGNpdHlOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuaG90ZWxfX2FsZXJ0X19jb25maXJtXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChcIi5ob3RlbF9fYWxlcnRfX3dyYXBcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuaG90ZWxcIikub24oXCJjbGlja1wiLCBcIi5jaXR5QXJlYV9fZmluaXNoXCIsIGZ1bmN0aW9uICgpIHsgIC8vc2V0QXJlYeulvCDrgZ3rgrzrlYxcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykuYXR0cignY2lkJyk7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5vbmNlKCd2YWx1ZScsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhW2hpZF0uYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbaGlkXS5hcmVhID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2hpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5zZXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cy9hcmVhJykuc2V0KDIpO1xyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvc3RhdHVzL2FyZWEnKS5zZXQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jaXR5OiBmdW5jdGlvbihjaWQsIGNpdHlOYW1lKXtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgIHZhciBhbGVydE1vZGFsID0gJyc7XHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICBhbGVydE1vZGFsICs9ICAgICAnPGRpdiBjbGFzcz1cImhvdGVsX19hbGVydFwiPic7XHJcblxyXG4gICAgICAgICAgICBpZighZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7qtIDqtJHsp4Ag7KCV67O06rCAIOyVhOyngSDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7tjrjsnZjsi5zshKQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLnNwb3RzKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuc3BvdHMucmFua2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuq0gOq0keyngCDsoJXrs7TqsIAg7JWE7KeBIOygleumrOuQmOyngCDslYrslZjsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+6rSA6rSR7KeAIOygleuztOqwgCDslYTsp4Eg7KCV66as65CY7KeAIOyViuyVmOyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5sb2NhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPu2OuOydmOyLnOyEpCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEubG9jYWwubWV0cm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoIWRhdGEubWV0cm9MaW5lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukKG1ldHJvTGluZSDsl4bsnYwpLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoIWRhdGEuc3RhdHVzLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIFNldEFyZWEuaW5mbGF0ZShjaXR5TmFtZSwgY2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KCfsp4Dsl60g7ISk7KCV7J2EIOuovOyggCDsp4Ttlontlanri4jri6QnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRfX2NvbmZpcm1cIj7tmZXsnbg8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPC9kaXY+PC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIGlmKGNoZWNrKXtcclxuICAgICAgICAgICAgICAgIFNldEhvdGVsSW5mby5pbml0KGRhdGEsIGNpZCwgY2l0eU5hbWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuaG90ZWxcIikuYXBwZW5kKGFsZXJ0TW9kYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfc3RhdHVzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPGgyPuyImeyGjCDrpqzsiqTtirg8L2gyPic7XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cIndyYXBwZXJcIj4nO1xyXG5cclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJzdGF0dXNfX2xpbmVyXCI+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX25hbWVcIj7rj4Tsi5zrqoU8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2VcIj7siJnshowg642w7J207YSwPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19ob3RlbFwiPuq4sOuzuCDtmLjthZTrjbDsnbTthLA8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj7sp4Dsl63soJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj7qtIDqtJHsp4DsoJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX3RyYW5zcG9ydFwiPuuMgOykkeq1kO2GteygleuztDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgY2lkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSBjaXR5LnN0YXR1cztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cInN0YXR1c19fbGluZXJcIj4nO1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19jaXR5XCI+JytjaXR5Lm5hbWUrJzwvcD4nO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHN0YXR1cy5ob3RlbCA9PT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fbWFrZVwiPuyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2Ugc3RhdHVzX19tYWtlX19ob3RlbFwiICBjaWQ9XCInICsgY2l0eS5jb2RlICsgJ1wiPuyXhuydjCAo7YG066at7ZW0IOunjOuTpOq4sCk8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuaG90ZWw+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19ob3RlbFwiPlg8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fYXJlYVwiPk88L3A+JztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy5zcG90ID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy50cmFuc3BvcnQgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3RyYW5zcG9ydFwiPlg8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLmhvdGVsXCIpLmh0bWwodHh0KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvdGVsO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsLmpzIiwiaW1wb3J0IFNldEFUTSBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0QVRNLmpzXCI7XHJcbmltcG9ydCBTZXRGb29kIGZyb20gXCIuL3NldEhvdGVsSW5mby9zZXRGb29kLmpzXCI7XHJcbmltcG9ydCBTZXRNZXRybyBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0TWV0cm8uanNcIjtcclxuaW1wb3J0IFNldFNhZmV0eSBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0U2FmZXR5LmpzXCI7XHJcbmltcG9ydCBTZXRMYXVuZHJ5IGZyb20gXCIuL3NldEhvdGVsSW5mby9zZXRMYXVuZHJ5LmpzXCI7XHJcbmltcG9ydCBTZXRDb252aW5pZW5jZSBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0Q29udmluaWVuY2UuanNcIjtcclxuXHJcblxyXG52YXIgU2V0SG90ZWxJbmZvID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2lkLCBjaXR5TmFtZSl7XHJcbiAgICAgICAgLy9zdGF0dXNDaGVjayDsp4TtlolcclxuICAgICAgICB2YXIgY2hlY2tUeHQgPSAnJztcclxuXHJcbiAgICAgICAgdmFyIGhvdGVsID0gZGF0YS5ob3RlbHNbT2JqZWN0LmtleXMoZGF0YS5ob3RlbHMpWzBdXTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXR1cyA9IHtcclxuICAgICAgICAgICAgbG9jYWw6IHtcclxuICAgICAgICAgICAgICAgIGF0bTogeyAvLzA6IOuNsOydtO2EsCDsl4bsnYwsIDE6IOunjOuTpCDsiJgg7J6I7J2MLCAyOiDsobTsnqztlahcclxuICAgICAgICAgICAgICAgICAgICB2aXNhOjAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2l0aTowXHJcbiAgICAgICAgICAgICAgICB9LCAgXHJcbiAgICAgICAgICAgICAgICBmb29kOiAwLFxyXG4gICAgICAgICAgICAgICAgbWV0cm86IDAsXHJcbiAgICAgICAgICAgICAgICBzcG90OjBcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGFzc2Vzc21lbnQ6IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDowLFxyXG4gICAgICAgICAgICAgICAgc2FmZXR5OjAsXHJcbiAgICAgICAgICAgICAgICB0aGVtZTowLFxyXG4gICAgICAgICAgICAgICAgY29udmVuaWVuY2U6MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGhvdGVsLmxvY2FsKSB7XHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5hdG0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGhvdGVsLmxvY2FsLmF0bSkpIHsgLy9WSVNBIEFUTeydtCDsoJXrpqzrkJjsp4Ag7JWK7J2AIO2Yle2DnOuhnCDrk6TslrTqsIDsnojripQg7IOB7YOcXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vYXRt6rCd7LK066W8IOqwgOyngOqzoCDsnojripQg7IOB7YOcIC0g67CY65Oc7IucIHZpc2EgYXRt7J20IOuTpOyWtOqwgCDsnojslrTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLmF0bS5jaXRpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxvY2FsLmF0bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+ykkeyalDogQ0lUSeyekeyXheydgCBWSVNB7J6R7JeFIO2bhOyXkCDsnbTro6jslrTsoLjslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgeyAvL2xvY2Fs7JeQIGF0beydtCDsl4bsnYwgLT4g67mE7J6QIOy2lOy2nOuQnCDsoIHsnbQg7JeG7J2MXHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLnZpc2EgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmF0bSkgeyAvL+q3uCDqsr3smrDsl5Drj4QgQ0lUSeuKlCBSQVfrjbDsnbTthLDroZwg7KG07J6s7ZWgIOyImCDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7KSR7JqUOiBDSVRJ7J6R7JeF7J2AIFZJU0HsnpHsl4Ug7ZuE7JeQIOydtOujqOyWtOyguOyVvCDtlahcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLm1ldHJvKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWV0cm9MaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLnNwb3QpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnNwb3RzLnJhbmtlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9IDA7IC8vVklTQeuKlCDrrLTsobDqsbQg7Zi47YWUIOuhnOy7rOyXkCDsp4HsoJEg65Ok7Ja06rCA66+A66GcIO2YuO2FlCDroZzsu6wg6rK966Gc6rCAIOyXhuuLpOuKlCDqsoPsnYAgVklTQeqwgCDsl4bri6TripQg6rKDLlxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubG9jYWwuYXRtKSB7IC8vY2l0aeuCmCB2aXNh64qUIO2YuO2FlCDroZzsu6zsnbQg7JWE64uMIOuPhOyLnCDroZzsu6zsl5Ag7KCA7J6l65CgIOyImCDsnojsnYwuXHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLm1ldHJvTGluZSkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLnNwb3RzLnJhbmtlZCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGVja1R4dCArPSAnPGgyIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdGl0bGVcIj7tmLjthZQg7KO867OA7KCV67O0PC9oMj4nO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCBWSVNBIEFUTeygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuYXRtLnZpc2EgPT09IDEpIHtcclxuICAgICAgICAgICAgU2V0QVRNLmluaXQoZGF0YSwgY2lkKTtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIFZJU0EgQVRN7KCV67O0IO2ZleyduC4g7Zi47YWU67OE66GcIOqwgOyepSDqsIDquYzsmrQgQVRN6rO8IDI07Iuc6rCEIEFUTeydhCDstpTstpztlanri4jri6QuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuYXRtLnZpc2EgPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0gVklTQSBBVE3soJXrs7TqsIAg7JeG7Iq164uI64ukLiBWSVNBIEFUTSBsb2NhdG9y7JeQ7IScIOygleuztOulvCDrqLzsoIAg7YGs66Gk66eB7ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCBDSVRJIEFUTeygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuYXRtLmNpdGkgPT09IDEpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIENJVEkgQVRN7KCV67O0IO2ZleyduC4g6rCA7J6lIOqwgOq5jOyatCBDSVRJIEFUTeydhCDstpTstpztlanri4jri6QuPC9wPic7XHJcbiAgICAgICAgfSAvLyBjaXRpIHN0YXR1cyAw7J2AIOyXhuydjC5cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5mb29kID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIOyLneujjO2SiOygkC/tjrjsnZjsoJAg7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5mb29kID09PSAxKSB7XHJcbiAgICAgICAgICAgIFNldEZvb2QuaW5pdChkYXRhLCBjaWQpO1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg7Iud66OM7ZKI7KCQL+2OuOydmOygkCDsoJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA6rmM7Jq0IOyLneujjO2SiOygkCDstpTstpwuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuZm9vZCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHQgY29sb3ItLXJlZFwiPk5vIERhdGEgLSDrj4Tsi5wg7Iud66OM7ZKI7KCQL+2OuOydmOygkCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLiDrqLzsoIAg7KCV67O066W8IOyeheugpe2VtOyjvOyEuOyalC48L3A+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFNldExhdW5kcnkuaW5pdChkYXRhLCBjaXR5TmFtZSk7XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwubWV0cm8gPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwg7KeA7ZWY7LKgL+uMgOykkeq1kO2GtSDsoJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLm1ldHJvID09PSAxKSB7XHJcbiAgICAgICAgICAgIFNldE1ldHJvLmluaXQoZGF0YSwgY2l0eU5hbWUpO1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg7KeA7ZWY7LKgL+uMgOykkeq1kO2GtSDsoJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA6rmM7Jq0IOyngO2VmOyyoCDstpTstpwuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwubWV0cm8gPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0g64+E7IucIOyngO2VmOyyoC/rjIDspJHqtZDthrUg7KCV67O06rCAIOyXhuyKteuLiOuLpC4g66i87KCAIOygleuztOulvCDsnoXroKXtlbTso7zshLjsmpQuPC9wPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLnNwb3QgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwg6rSA6rSR7KeAIOygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuc3BvdCA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcg6rSA6rSR7KeAIOygleuztCDtmZXsnbguIO2YuO2FlOuzhOuhnCDqsIDquYzsmrQg6rSA6rSR7KeAIOy2lOy2nC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5zcG90ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIOuPhOyLnCDqtIDqtJHsp4Ag7Iic7JyE6rCAIOyVhOyngSDtmZXsoJXrkJjsp4Ag7JWK7JWY7Iq164uI64ukLiDrqLzsoIAg7ZmV7J247ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU2V0U2FmZXR5LmluaXQoZGF0YSwgY2l0eU5hbWUpO1xyXG4gICAgICAgIFNldENvbnZpbmllbmNlLmluaXQoZGF0YSwgY2l0eU5hbWUpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaWQpLnNldChkYXRhKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coY2hlY2tUeHQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0SG90ZWxJbmZvO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldEFUTSA9IHtcclxuICAgIHN0YXRpc3RpYzoge1xyXG4gICAgICAgIG5lYXJlc3Q6W10sIC8v6rCA7J6lIOqwgOq5jOyatCBBVE3snYAg66qHIG0g6rGw66as7JeQIOyeiOuKlOyngCDrj4Tsi5wg7KCE7LK0IO2Pieq3oOydhCDrgrTquLAg7JyE7ZWcIOuNsOydtO2EsFxyXG4gICAgICAgIGJhbmsyNDpbXSwgICAvLzI07Iuc6rCEIOyatOyYge2VmOuKlCDsnYDtlokg7IaM7JygIOqxsOumrOyXkCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgICAgICBpbjEzMDpbXSAvL+uwmOqyvSAxMzBtIOuCtOyXkCBBVE3snbQg66qHIOqwnCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgIH0sXHJcbiAgICBieUFyZWE6IHt9LCAvL2luMTMwIHN0YXTsnYQg7KeA7Jet67OE66GcIO2Pieq3oOuCtOq4sCDsnITtlZwg6rCd7LK0XHJcblxyXG4gICAgZGF0YTp7fSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSwgY2lkKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5maXJzdF9ieUhvdGVscygpOyAvL+2YuO2FlOuTpOydhCDrj4zrqbAg6rCA7J6lIOqwgOq5jOyatCBBVE0sIOydgO2WieyGjOycoCAyNOyLnOqwhCBBVE0sIDEzMG3slYjsl5Ag66qHIOqwnCBBVE0g7J6I64qU7KeA66W8IOywvuyVhOuCtOqzoCDthrXqs4Tsl5Drj4Qg6riw66GdXHJcbiAgICAgICAgdGhpcy5zZWNvbmRfYnlBcmVhcygpOyAvL+yngOyXreuzhOuhnCAxMzBtIOuCtOyXkCDsnojripQgQVRNIOqwr+yImCDtj4nqt6DsnYQg64OEIC0+IOyngOyXrSDsg4Hsl4Ug67Cc7KCE64+E66W8IOuCmOykkeyXkCDssrTtgaztlZjquLAg7JyE7ZW0IOunjOuTpOyXiOydjC5cclxuICAgICAgICB0aGlzLmZpZnRoX21ha2VTY29yZSgpO1xyXG4gICAgICAgIHRoaXMuc2l4dGhfd29yZGluZygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmaXJzdF9ieUhvdGVsczogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgaG90ZWxzID0gdGhpcy5kYXRhLmhvdGVscztcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBoaWQgaW4gaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IGhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICBpZiAoaG90ZWwudGVtcC5hdG0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdG1BcnIgPSBob3RlbC50ZW1wLmF0bTtcclxuICAgICAgICAgICAgICAgIHZhciBhdG1PYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDoge2RpZjoyMDAwfSxcclxuICAgICAgICAgICAgICAgICAgICBpbjEzMDogMCxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdG1BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXRtID0gYXRtQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoYXRtLmNvb3IsIGhvdGVsLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMTMwLjEpIHsgLy/siJnshozrs4QgMTMwbeqxsOumrCBhdG0g6rCv7IiYIOyytO2BrFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdG1PYmouaW4xMzArKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYXRtT2JqLmJhbmsyNCkgey8v6riw67O47KCB7Jy866GcIOqxsOumrOyInCDsoJXroKwg65CY7Ja07J6I7Ja07IScIOydtOuvuCDrk6TslrTqsIDsnojsnLzrqbQg6re464aI7J20IOuNlCDqsIDquYzsmrTrhohcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZiA8IGF0bU9iai5uZWFyZXN0LmRpZikgeyAvL+yImeyGjOuzhCDsnYDtlokg7IaM7JygIDI07Iuc6rCEIGF0bSDri7TsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYXRtLm93bmVyLmluY2x1ZGVzKFwiQkFOS1wiKXx8YXRtLnBsYWNlTmFtZS5pbmNsdWRlcyhcIkJBTktcIikpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtT2JqLm5lYXJlc3QgPSBhdG07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtT2JqLm5lYXJlc3QuZGlmID0gZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdG1PYmoubmVhcmVzdC5zY29yZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v7Ya16rOE7JeQIOq4sOuhne2VmOq4sFxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLm5lYXJlc3QucHVzaChhdG1PYmoubmVhcmVzdC5kaWYpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuYXRtID0gYXRtT2JqO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwgPSB7YXRtOiBhdG1PYmp9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vaW4xMzDsnYAg7Zi47YWU7J2EIO2VnCDrsogg64ukIOuPiCDri6TsnYzsl5Ag7Ya16rOE7JeQIOq4sOuhne2VoCDsiJgg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5pbjEzMC5wdXNoKGF0bU9iai5pbjEzMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0pey8v7KeA7Jet67OEIGF0bSDrsIDsp5Hrj4Trpbwg7ZmV7J247ZWY64qUIOq3uOufsCDrhYDshJ1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXS5wdXNoKGF0bU9iai5pbjEzMCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXSA9IFthdG1PYmouaW4xMzBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0KGBWSVNBIEFUTSDsoJXrs7TqsIAg7JeG64qUIO2YuO2FlOydtCDsnojsirXri4jri6QuIO2ZleyduCDtm4Qg7J6s7Iuc64+E7ZW07KO87IS47JqUYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlY29uZF9ieUFyZWFzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBhcmVhID0gdGhpcy5kYXRhLmFyZWE7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJlYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmKCFhcmVhW2ldLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ieUFyZWFbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdG1zID0gdGhpcy5ieUFyZWFbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXRtcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW0gKz0gYXRtc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbnVzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZihhdG1zLmxlbmd0aCA8IDEwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWludXMgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXRtcyA9IChzdW0vKGF0bXMubGVuZ3RoKSArIGF0bXMubGVuZ3RoLzEwKSArIG1pbnVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0ubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsLmF0bSA9IGF0bXMudG9GaXhlZCgyKSoxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtOiBhdG1zLnRvRml4ZWQoMikqMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0ubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsLmF0bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdG06IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpZnRoX21ha2VTY29yZTogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIHNjb3JlQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICB2YXIgc2NvcmUgPSBob3RlbC5sb2NhbC5hdG0ubmVhcmVzdC5kaWY7XHJcbiAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaCh7c2NvcmU6c2NvcmUsaGlkOmhpZH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzY29yZUFycmF5LnNvcnQoKGEsIGIpID0+IGEuc2NvcmUgLSBiLnNjb3JlKTsgLy/rgq7snYTsiJjroZ0g7KKL7J2MXHJcblxyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBzY29yZUFycmF5Lmxlbmd0aDtcclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5hdG0uc2NvcmUucGVyY2VudGlsZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWQgPSBzY29yZUFycmF5W2ldLmhpZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgdmFyIHJhbmsgPSAoKGkrMSkgLyB0b3RhbCk7IC8vIOuwseu2hOychFxyXG4gICAgICAgICAgICB2YXIgcGVyY2VudGlsZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXNSYW5rZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmFua1N5cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzUmFua2VkKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSBwZXJjZW50aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRpbGUgKz0gcmFua1N5c1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFuazxwZXJjZW50aWxlKXsgIC8vMzUlIOyViOyXkCDrk6TrqbRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuayAtPSBtaW51czsgICAvL3JhbmvrpbwgMH4wLjLroZwg66ee7Law7KSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gKDEwLWopIC0gTWF0aC5jZWlsKChyYW5rL3JhbmtTeXNbal0pKjEwKS8xMDsgLy9yYW5rKDB+MC4yKeulvCAwLjLroZwg64KY64iI6rCSKjEwLzEwIC0+IDB+MC456rCAIOuCmOyYtFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JhbmtlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuYXRtID0gc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlID0ge2F0bTpzY29yZX07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZTp7YXRtOnNjb3JlfSxcclxuICAgICAgICAgICAgICAgICAgICB3b3JkOnthdG06XCJcIn1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNpeHRoX3dvcmRpbmc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICB2YXIgZGlmID0gZGlmVG9NaW4oaG90ZWwubG9jYWwuYXRtLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgdmFyIHR4dCA9IGDqsIDsnqUg6rCA6rmM7Jq0IOydgO2WiSDshozsnKAgQVRN7J2AIOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyeiOydjGA7XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50LndvcmQpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLmF0bSA9IHR4dDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQgPSB7YXRtOnR4dH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXRBVE07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEFUTS5qcyIsImltcG9ydCBHZW9Db2RlIGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL2dlb0NvZGUuanNcIjtcclxuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi4vY29uZmlnLmpzXCI7XHJcblxyXG52YXIgU2V0Rm9vZCA9IHtcclxuICAgIGRhdGE6e30sXHJcblxyXG4gICAgc3RhdGlzdGljOntcclxuICAgICAgICBuZWFyZXN0OltdLFxyXG4gICAgICAgIG5lYXJieTpbXVxyXG4gICAgfSxcclxuICAgIGJ5QXJlYTp7fSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaWQpe1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgaWYodGhpcy5maXJzdF9nZW9Db2RlKGNpZCkpeyAgICAvL+yngOyYpOy9lOuUqSDtlaAg6rKMIOyXhuycvOuptCBzZWNvbmTrtoDthLAg7KeE7ZaJ7ZWoXHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kX3NldEZvb2QoKTsgIC8v7IiZ7IaM67OE66GcIOyLneujjO2SiOygkOuTpOydhCDrlYzroKTrhKPsnYxcclxuICAgICAgICAgICAgdGhpcy50aGlyZF9ieUFyZWFzKCk7IC8v7Ya16rOE6rCS7J2EIOunjOuTpOyWtOuDhFxyXG4gICAgICAgICAgICB0aGlzLmZvdXJ0aF9tYWtlU3RhdHMoKTsgLy/thrXqs4TqsJLsnYQg66eM65Ok7Ja064OEIC0gY2lkL3N0YXQvbG9jYWwvZm9vZCDrnbzqs6Ag65Ok7Ja06rCI6rKD7J6EXHJcbiAgICAgICAgICAgIHRoaXMuZmlmdGhfbWFrZVNjb3JlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2l4dGhfd29yZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzaXh0aF93b3JkaW5nOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIXRvZG8hISEg7KeA6riI7J2AIOuJtOyalSDquLDspIDsnLzroZwg65CY7Ja07J6I7J2MIC0+IOuPhOyLnOuzhOuhnCDrgpjriITquLAo7JiILe2OuOydmOygkCDsnojripQg64+E7Iuc7JqpKVxyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmZvb2Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb29kID0gaG90ZWwubG9jYWwuZm9vZDtcclxuICAgICAgICAgICAgICAgICAgICBpZihmb29kLmdyb2Nlcnkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmb29kLmxhcmdlKXsgLy/rkZgg64ukIOyeiOuKlCDsvIDsnbTsiqRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihmb29kLmxhcmdlLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqb3NhID0gZm9vZC5sYXJnZS5uZWFyZXN0Lmpvc2E7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IGZvb2QubGFyZ2UubmVhcmVzdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZm9vZC5sYXJnZS5uZWFyZXN0LmRpZiA8IGZvb2QuZ3JvY2VyeS5uZWFyZXN0LmRpZiArIDUwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSBg6rCB7KKFIOyLneujjO2SiOydhCDsgrQg7IiYIOyeiOuKlCDrjIDtmJUg66eI7Yq47J24ICR7bmFtZX0ke2pvc2F9IOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyeiOydjGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2RpZiA9IGRpZlRvTWluKGZvb2QuZ3JvY2VyeS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gYOqwhOuLqO2VnCDrqLnqsbDrpqzrpbwg7IK0IOyImCDsnojripQg7Iud66OM7ZKI7KCQ7J20IOuPhOuztCAke2dkaWZ9IOqxsOumrOyXkCDsnojqs6AsIOqwgeyihSDsnYzsi53rk6TsnYQg7IK0IOyImCDsnojripQg64yA7ZiVIOuniO2KuCAke25hbWV9JHtqb3NhfSDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYxgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXsgIC8vZ3JvY2VyeeunjCDsnojripQg7LyA7J207IqkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gZGlmVG9NaW4oZm9vZC5ncm9jZXJ5Lm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCA9IGDqsITri6jtlZwg66i56rGw66as66W8IOyCtCDsiJgg7J6I64qUIOyLneujjO2SiOygkOydtCDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYxgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoZm9vZC5sYXJnZSl7IC8vL+yjvOuzgOyXkCBncm9jZXJ564qUIOyXhuuKlOuNsCBsYXJnZeunjCDsnojripQg7Yq57J207LyA7J207IqkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihmb29kLmxhcmdlLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBmb29kLmxhcmdlLm5lYXJlc3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpvc2EgPSBmb29kLmxhcmdlLm5lYXJlc3Quam9zYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gYOqwgeyihSDsi53ro4ztkojsnYQg7IK0IOyImCDsnojripQg64yA7ZiVIOuniO2KuCAke25hbWV9JHtqb3NhfSDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYxgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCA9ICfsi53ro4ztkojsnYQg7IK0IOunjO2VnCDqs7PsnYAg7KO867OAIDXrtoTqsbDrpqwg7J2064K07JeQIOyXhuydjCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdHh0ID0gJ+yLneujjO2SiOydhCDsgrQg66eM7ZWcIOqzs+ydgCDso7zrs4AgNeu2hOqxsOumrCDsnbTrgrTsl5Ag7JeG7J2MJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC53b3JkKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5mb29kID0gdHh0O1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZCA9IHtmb29kOnR4dH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpZnRoX21ha2VTY29yZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgc2NvcmVBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwuZm9vZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2luZCBpbiBob3RlbC5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb29kID0gaG90ZWwubG9jYWwuZm9vZFtraW5kXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5lYXJlc3REaWYgPSBmb29kLm5lYXJlc3QuZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gKENvbmZpZy5mb29kLmtpbmRba2luZF0uc3RkIC0gbmVhcmVzdERpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKENvbmZpZy5mb29kLmtpbmRba2luZF0ubXVsdGlwbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSBzY29yZSAqIENvbmZpZy5mb29kLmtpbmRba2luZF0ubXVsdGlwbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gZm9vZC5uZWFyYnkqMjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2NvcmVBcnJheS5wdXNoKHtzY29yZTpzY29yZSxoaWQ6aGlkfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNjb3JlQXJyYXkuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpOyAvL+uGkuydhOyImOuhnSDsoovsnYxcclxuXHJcbiAgICAgICAgdmFyIHRvdGFsID0gc2NvcmVBcnJheS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciByYW5rU3lzID0gQ29uZmlnLmZvb2Quc2NvcmUucGVyY2VudGlsZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWQgPSBzY29yZUFycmF5W2ldLmhpZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgbGV0IHJhbmsgPSAoKGkrMSkgLyB0b3RhbCk7IC8vIOuwseu2hOychCAtIDB+MSAo64aS7J2E7IiY66GdIDDsl5Ag6rCA6rmM7JuAKVxyXG4gICAgICAgICAgICB2YXIgcGVyY2VudGlsZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXNSYW5rZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmFua1N5cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzUmFua2VkKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSBwZXJjZW50aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRpbGUgKz0gcmFua1N5c1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFuazxwZXJjZW50aWxlKXsgIC8vMzUlIOyViOyXkCDrk6TrqbRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuayAtPSBtaW51czsgICAvL3JhbmvrpbwgMH4wLjLroZwg66ee7Law7KSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gKDEwLWopIC0gTWF0aC5jZWlsKChyYW5rL3JhbmtTeXNbal0pKjEwKS8xMDsgLy9yYW5rKDB+MC4yKeulvCAwLjLroZwg64KY64iI6rCSKjEwLzEwIC0+IDB+MC456rCAIOuCmOyYtFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JhbmtlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuZm9vZCA9IHNjb3JlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZSA9IHtmb29kOnNjb3JlfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOntmb29kOnNjb3JlfSxcclxuICAgICAgICAgICAgICAgICAgICB3b3JkOntmb29kOlwiXCJ9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmb3VydGhfbWFrZVN0YXRzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBzdGF0ID0ge1xyXG4gICAgICAgICAgICBuZWFyZXN0OiAwLFxyXG4gICAgICAgICAgICBuZWFyYnk6MFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAodmFyIGlkIGluIHN0YXQpIHtcclxuICAgICAgICAgICAgdmFyIHN1bSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5zdGF0aXN0aWNbaWRdLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBzdW0gKz0gdGhpcy5zdGF0aXN0aWNbaWRdW2tdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0YXRbaWRdID0gc3VtL3RoaXMuc3RhdGlzdGljW2lkXS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHN0YXRbaWRdID0gc3RhdFtpZF0udG9GaXhlZCgyKSoxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5kYXRhLnN0YXQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuc3RhdC5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RhdC5sb2NhbC5mb29kID0gc3RhdDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RhdC5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBmb29kOiBzdGF0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0ID0ge1xyXG4gICAgICAgICAgICAgICAgbG9jYWw6e2Zvb2Q6c3RhdH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHRoaXJkX2J5QXJlYXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGFyZWEgPSB0aGlzLmRhdGEuYXJlYTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYoIWFyZWFbaV0ubm90QXJlYSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ5QXJlYVtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvb2RzID0gdGhpcy5ieUFyZWFbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZm9vZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGZvb2RzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZvb2RzLmxlbmd0aCA8IDEwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWludXMgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vZHMgPSAoc3VtLyhmb29kcy5sZW5ndGgpICsgZm9vZHMubGVuZ3RoLzEwKSArIG1pbnVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0ubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsLmZvb2QgPSBmb29kcy50b0ZpeGVkKDIpKjE7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb29kOiBmb29kcy50b0ZpeGVkKDIpKjFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmVhW2ldLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbC5mb29kID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb2Q6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlY29uZF9zZXRGb29kOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgdmFyIGlzU29tZUZvb2QgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gdGhpcy5kYXRhLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgIHZhciBncm9BcnIgPSB0aGlzLmRhdGEubG9jYWwuZm9vZFt0eXBlXTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGQgPSBDb25maWcuZm9vZC5raW5kW3R5cGVdLnN0ZDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb29kID0gZ3JvQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoaG90ZWwuY29vciwgZm9vZC5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlmPHN0ZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU29tZUZvb2QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb29kLmRpZiA9IGRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vZC50eXBlID0gdHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLnRlbXApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwudGVtcC5mb29kKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC50ZW1wLmZvb2RbdHlwZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2RbdHlwZV0ucHVzaChmb29kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwudGVtcC5mb29kW3R5cGVdID0gW2Zvb2RdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZFt0eXBlXSA9IFtmb29kXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb2Q6e31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2RbdHlwZV0gPSBbZm9vZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFpc1NvbWVGb29kKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHZhciBuZWFyYnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5lYXJlc3QgPSB7ZGlmOjk5OX07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBob3RlbC50ZW1wLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2RbdHlwZV0uc29ydCgoYSwgYikgPT4gYS5kaWYgLSBiLmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvb2RBcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICBob3RlbC50ZW1wLmZvb2RbdHlwZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvcHkgPSAkLmV4dGVuZCh0cnVlLHt9LGhvdGVsLnRlbXAuZm9vZFt0eXBlXVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb2RBcnIucHVzaChjb3B5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5lYXJieSArPSBmb29kQXJyLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZm9vZEFyclswXS5kaWYgPCBuZWFyZXN0LmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3QgPSBmb29kQXJyWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZm9vZEFyci5sZW5ndGg+NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb2RBcnIubGVuZ3RoID0gNTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwuZm9vZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5mb29kW3R5cGVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJieTogaG90ZWwudGVtcC5mb29kW3R5cGVdLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyNTogZm9vZEFycixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyZXN0OiBmb29kQXJyWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmZvb2QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmZvb2RbdHlwZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmJ5OiBob3RlbC50ZW1wLmZvb2RbdHlwZV0ubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXI1OiBmb29kQXJyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3Q6IGZvb2RBcnJbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwgPSB7Zm9vZDp7fX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmxvY2FsLmZvb2RbdHlwZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyYnk6IGhvdGVsLnRlbXAuZm9vZFt0eXBlXS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyNTogZm9vZEFycixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3Q6IGZvb2RBcnJbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0pey8v7KeA7Jet67OEIGZvb2Qg67CA7KeR64+E66W8IO2ZleyduO2VmOuKlCDqt7jrn7Ag64WA7ISdXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0ucHVzaChuZWFyYnkpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0gPSBbbmVhcmJ5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5uZWFyZXN0LnB1c2gobmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmJ5LnB1c2gobmVhcmJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlyc3RfZ2VvQ29kZTogZnVuY3Rpb24oY2lkKXtcclxuICAgICAgICB2YXIgZ3JvQXJyID0gdGhpcy5kYXRhLmxvY2FsLmZvb2QuZ3JvY2VyeTtcclxuICAgICAgICB2YXIgZ2VvQXJyID0gW107XHJcbiAgICAgICAgdmFyIGlzR2VvTmVlZGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBncm9jZXJ5ID0gZ3JvQXJyW2ldO1xyXG4gICAgICAgICAgICBpZighZ3JvY2VyeS5jb29yKXtcclxuICAgICAgICAgICAgICAgIGdlb0Fyci5wdXNoKHthZGRyZXNzOmdyb2NlcnkuYWRkcmVzcywgYWlkOml9KTtcclxuICAgICAgICAgICAgICAgIGlzR2VvTmVlZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZighZ3JvY2VyeS5jb29yLmxhdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2VvQXJyLnB1c2goe2FkZHJlc3M6Z3JvY2VyeS5hZGRyZXNzLCBhaWQ6aX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzR2VvTmVlZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc0dlb05lZWRlZCl7XHJcbiAgICAgICAgICAgIHZhciByZWYgPSBcImNpdGllcy9cIitjaWQrXCIvbG9jYWwvZm9vZC9ncm9jZXJ5XCI7XHJcbiAgICAgICAgICAgIEdlb0NvZGUuaW5pdChnZW9BcnIsIHJlZik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0Rm9vZDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0Rm9vZC5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldE1ldHJvID0ge1xyXG4gICAgc3RhdGlzdGljOntuZWFyZXN0OltdfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaXR5TmFtZSl7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmNpdHlOYW1lID0gY2l0eU5hbWU7XHJcbiAgICAgICAgdGhpcy5maXJzdF9zZXRNZXRybygpOyAvL+yImeyGjOuzhOuhnCDsp4DtlZjssqDsnYQg65WM66Ck64Sj7J2MXHJcbiAgICAgICAgdGhpcy5zZWNvbmRfYnlBcmVhcygpO1xyXG4gICAgICAgIHRoaXMudGhpcmRfbWFrZVNjb3JlKCk7XHJcbiAgICAgICAgdGhpcy5mb3VydGhfd29yZGluZygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmb3VydGhfd29yZGluZzogZnVuY3Rpb24oKXtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY2l0eU5hbWUgPSB0aGlzLmNpdHlOYW1lO1xyXG4gICAgICAgIHZhciB0b3RhbExpbmUgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEubWV0cm9MaW5lKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgbGV0IHR4dEFyciA9IFtdO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1ldHJvID0gaG90ZWwubG9jYWwubWV0cm87XHJcbiAgICAgICAgICAgIGlmKG1ldHJvKXtcclxuICAgICAgICAgICAgICAgIHZhciBuZWFyZXN0RGlmID0gZGlmVG9NaW4obWV0cm8ubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5lYXJlc3RTdG4gPSBtZXRyby5uZWFyZXN0Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZU5vID0gT2JqZWN0LmtleXMobWV0cm8uYnlMaW5lKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BvdE5vID0gT2JqZWN0LmtleXMobWV0cm8uc3BvdCkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjb3JlID0gaG90ZWwuYXNzZXNzbWVudC5zY29yZS50cmFuc3BvcnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXZnVGltZSA9IGRpZlRvTWluKG1ldHJvLmF2Z0RpZik7XHJcbiAgICAgICAgICAgICAgICB0eHRBcnIucHVzaChg7IiZ7IaM7JeQ7IScIOqwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J2AIOuPhOuztCAke25lYXJlc3REaWZ9IOqxsOumrOydmCAke25lYXJlc3RTdG597JetYCk7XHJcbiAgICAgICAgICAgICAgICB0eHRBcnIucHVzaChg64+E67O0IDEw67aE6rGw66asIOydtOuCtOyXkCAke3RvdGFsTGluZX3qsJzsnZggJHtjaXR5TmFtZX0g7KCE7LK0IOyngO2VmOyyoCDrhbjshKAg7KSRICR7bGluZU5vfeqwnCDrhbjshKDsnbQg7KeA64KoYCk7XHJcbiAgICAgICAgICAgICAgICB0eHRBcnIucHVzaChgJHtjaXR5TmFtZX0gMTAw64yAIOq0gOq0keyngCDspJEgJHtzcG90Tm996rCc66W8IOyngO2VmOyyoCDtmZjsirkg7JeG7J20IO2Pieq3oCAke2F2Z1RpbWV97J2YIOuPhOuztCDsnbTrj5nsnLzroZwg67Cp66y4IOqwgOuKpWApO1xyXG4gICAgICAgICAgICAgICAgaWYoc2NvcmU+OC45KXtcclxuICAgICAgICAgICAgICAgICAgICB0eHRBcnIucHVzaCgn7KeA7ZWY7LKg7J2EIOydtOyaqe2VtCDqtIDqtJHtlZjquLAg66ek7JqwIO2OuOumrO2VnCDrjIDspJHqtZDthrXsnZgg7LWc6rOgIOyalOyngOyXkCDsnITsuZjtlagnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNjb3JlPjcuOSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0QXJyLnB1c2goJ+yngO2VmOyyoOydhCDsnbTsmqntlbQg6rSA6rSR7ZWY6riwIO2OuOumrO2VnCDrjIDspJHqtZDthrXsnZgg7JqU7KeA7JeQIOychOy5mO2VqCcpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Ni45KXtcclxuICAgICAgICAgICAgICAgICAgICB0eHRBcnIucHVzaCgn7KeA7ZWY7LKg7J2EIOydtOyaqe2VtCDqtIDqtJHtlZjquLAg64KY7IGY7KeAIOyViuydgCDsnITsuZjsl5Ag7J6I7J2MJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihzY29yZT41Ljkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dEFyci5wdXNoKCfsp4DtlZjssqDsnYQg7J207Jqp7ZW0IOq0gOq0ke2VmOq4sOyXkCDslYTso7wg7KKL7J2AIOychOy5mOuKlCDslYTri5gnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dEFyci5wdXNoKCfrjIDspJHqtZDthrUg7Y647J2Y7ISx7J2AIOyVveqwhCDrgq7snYAg7Y647Jy866GcLCDqtIDqtJHsnbQg7KGw6riIIOu2iO2OuO2VoCDsiJgg7J6I7J2MJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS50cmFuc3BvcnQgPSA0O1xyXG4gICAgICAgICAgICAgICAgdHh0QXJyID0gW1wi7J20IOyImeyGjCDrj4Trs7QgMTXrtoQg7J2064K0IOqxsOumrOyXkCDsp4DtlZjssqAg7Jet7J20IOyXhuyWtOyEnCDrjIDspJHqtZDthrXsnYQg7J207Jqp7ZWY6riwIOu2iO2OuO2VoCDsiJgg7J6I7J2MXCJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC50cmFuc3BvcnQgPSB0eHRBcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB0aGlyZF9tYWtlU2NvcmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHNjb3JlQXJyYXkgPSBbXTtcclxuICAgICAgICAvLzHqsJwg6rSA6rSR7KeA66W8IOqwiCDsiJgg7J6I7J2EIOuVjOuniOuLpCAxODAwIC0gZGlm7ZWp6rOEKO2YuO2FlOyXkOyEnCwg64K066Ck7IScKeygkOunjO2BvCDstpTqsIBcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICBsZXQgbWV0cm8gPSBob3RlbC5sb2NhbC5tZXRybztcclxuICAgICAgICAgICAgbGV0IHNwb3RzID0gdGhpcy5kYXRhLnNwb3RzLnJhbmtlZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgbGV0IG1ldHJvTGluZU9iaiA9IHRoaXMuZGF0YS5tZXRyb0xpbmU7XHJcbiAgICAgICAgICAgIGxldCBzcG90T2JqID0ge307XHJcblxyXG4gICAgICAgICAgICBpZihtZXRybyl7XHJcbiAgICAgICAgICAgICAgICBtZXRyby5zcG90ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBsaW5lTmFtZSBpbiBtZXRyby5ieUxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IG1ldHJvLmJ5TGluZVtsaW5lTmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZkhvdGVsID0gbGluZS5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXRyb0xpbmVPYmpbbGluZU5hbWVdLnNwb3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBtZXRyb0xpbmVPYmpbbGluZU5hbWVdLnNwb3RbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWZTcG90ID0gc3BvdC5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3RPYmpbc3BvdC5yYW5rXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkaWZTcG90ICsgZGlmSG90ZWwgPCBzcG90T2JqW3Nwb3QucmFua10uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90T2JqW3Nwb3QucmFua10gPSB7ZGlmOiAoZGlmU3BvdCArIGRpZkhvdGVsKSwgbGluZTpsaW5lTmFtZX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdE9ialtzcG90LnJhbmtdID0ge2RpZjogKGRpZlNwb3QgKyBkaWZIb3RlbCksIGxpbmU6bGluZU5hbWV9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGF2ZyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcmFuayBpbiBzcG90T2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gKDE4MDAgLSBzcG90T2JqW3JhbmtdLmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZnICs9IHNwb3RPYmpbcmFua10uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBob3RlbFNwb3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IHNwb3RzW3JhbmtdLmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHNwb3RPYmpbcmFua10ubGluZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTpzcG90c1tyYW5rXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcG90TWV0cm9OYW1lOnNwb3RzW3JhbmtdLm1ldHJvSW5mb1tzcG90T2JqW3JhbmtdLmxpbmVdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6cmFua1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm8uc3BvdC5wdXNoKGhvdGVsU3BvdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhdmcgPSBNYXRoLnJvdW5kKChhdmcgLyBPYmplY3Qua2V5cyhzcG90T2JqKS5sZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIG1ldHJvLmF2Z0RpZnRvU3BvdCA9IGF2ZztcclxuICAgICAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaCh7aGlkOmhpZCxzY29yZTpzY29yZX0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5tZXRyby5zY29yZS5wZXJjZW50aWxlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IHNjb3JlQXJyYXlbaV0uaGlkO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcmFuayA9ICgoaSsxKSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEIC0gMH4xICjrhpLsnYTsiJjroZ0gMOyXkCDqsIDquYzsm4ApXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoMTAtaikgLSBNYXRoLmNlaWwoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC5zY29yZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS50cmFuc3BvcnQgPSBzY29yZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUgPSB7dHJhbnNwb3J0OnNjb3JlfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOnt0cmFuc3BvcnQ6c2NvcmV9LFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmQ6e3RyYW5zcG9ydDpcIlwifVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2Vjb25kX2J5QXJlYXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/ri6TrpbggbG9jYWzrk6Tqs7zripQg64us66asIOyngO2VmOyyoCDsl63snYQgQXJlYeuzhOuhnCDrgpjriJQgLSDsp4Dsl63rs4TroZwg7Ja065akIOuFuOyEoOuTpOydtCDsp4DrgpjqsIDripTsp4Ag7LK07YGsO1xyXG4gICAgICAgIGxldCBhcmVhQXJyID0gdGhpcy5kYXRhLmFyZWE7XHJcbiAgICAgICAgbGV0IG1ldHJvQXJyID0gdGhpcy5kYXRhLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJlYUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYXJlYSA9IGFyZWFBcnJbaV07XHJcbiAgICAgICAgICAgIGlmKCFhcmVhLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZXRyb0Fyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXRybyA9IG1ldHJvQXJyW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlzSW5BcmVhKG1ldHJvLmNvb3IsIGFyZWEuY29vcikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1ldHJvLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0gbWV0cm8ubGluZVtrXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVhLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVhLmxvY2FsLm1ldHJvKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhLmxvY2FsLm1ldHJvW2xpbmVdICsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwubWV0cm9bbGluZV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwubWV0cm8gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbCA9IHttZXRybzp7fX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpcnN0X3NldE1ldHJvOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwubG9jYWwubWV0cm8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDp7ZGlmOkNvbmZpZy5tZXRyby5uZWFyU3RkfSxcclxuICAgICAgICAgICAgICAgICAgICBuZWFyOltdLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ5TGluZTp7fVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIG1ldHJvQXJyID0gdGhpcy5kYXRhLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgICAgICB2YXIgYnlMaW5lID0gaG90ZWwubG9jYWwubWV0cm8uYnlMaW5lO1xyXG4gICAgICAgICAgICBsZXQgaGFzTWV0cm8gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0cm9BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXRybyA9IG1ldHJvQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihob3RlbC5jb29yLCBtZXRyby5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkaWY8Q29uZmlnLm1ldHJvLm5lYXJTdGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc01ldHJvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0cm9fYyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcjptZXRyby5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lOm1ldHJvLmxpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6bWV0cm8ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmOmRpZi50b0ZpeGVkKDApKjFcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLm1ldHJvLm5lYXIucHVzaChtZXRyb19jKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlmPGhvdGVsLmxvY2FsLm1ldHJvLm5lYXJlc3QuZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwubWV0cm8ubmVhcmVzdCA9IG1ldHJvX2M7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1ldHJvLmxpbmUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBtZXRyby5saW5lW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYnlMaW5lW2xpbmVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGJ5TGluZVtsaW5lXS5kaWYgPiBtZXRyb19jLmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnlMaW5lW2xpbmVdID0gbWV0cm9fYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBieUxpbmVbbGluZV0gPSBtZXRyb19jO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihoYXNNZXRybyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5uZWFyZXN0LnB1c2goaG90ZWwubG9jYWwubWV0cm8ubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLm1ldHJvID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldE1ldHJvO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRNZXRyby5qcyIsImltcG9ydCBDb25maWdfU2FmZXR5IGZyb20gXCIuLi9jb25maWcvc2FmZXR5LmpzXCI7XHJcblxyXG52YXIgU2V0U2FmZXR5ID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2l0eU5hbWUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuZmlyc3RfZnJvbUFyZWEoZGF0YSwgY2l0eU5hbWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmaXJzdF9mcm9tQXJlYTogZnVuY3Rpb24oZGF0YSwgY2l0eU5hbWUpe1xyXG4gICAgICAgIGxldCBzY29yZUFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGxldCBhcmVhcyA9IGRhdGEuYXJlYTtcclxuICAgICAgICBsZXQgaG90ZWxzID0gZGF0YS5ob3RlbHM7XHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIGhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSBob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLnNhZmV0eSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgd29yZCA9IGhvdGVsLmFzc2Vzc21lbnQud29yZC5zYWZldHk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG5cclxuICAgICAgICAgICAgLy9BUkVB66GcIOyduO2VnCDsuZjslYhcclxuICAgICAgICAgICAgbGV0IGFyZWEgPSBhcmVhc1tob3RlbC5hcmVhXTtcclxuICAgICAgICAgICAgc2NvcmUgKz0gYXJlYS5zYWZldHkuc2NvcmUqMztcclxuICAgICAgICAgICAgbGV0IGNvbmZpZ193b3JkID0gQ29uZmlnX1NhZmV0eS53b3JkW2FyZWEuc2FmZXR5LnNjb3JlXTtcclxuICAgICAgICAgICAgaWYoYXJlYS5zYWZldHkuc2NvcmU+MyYmYXJlYS5zYWZldHkubWlzZGVtZWFub3I8Myl7XHJcbiAgICAgICAgICAgICAgICBjb25maWdfd29yZCA9IENvbmZpZ19TYWZldHkud29yZFs2XTsgICAgLy/suZjslYjsnYAg7KKL7KeA66eMIOqyveuylOyjhOycqOydtCDsooAg64aS7J2MXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd29yZC5wdXNoKGAke2NpdHlOYW1lfSR7Y29uZmlnX3dvcmR9ICR7YXJlYS5uYW1lfSDsp4Dsl63sl5Ag7JyE7LmY7ZWY6rOgIOyeiOydjGApO1xyXG5cclxuICAgICAgICAgICAgLy9NRVRST+uhnCDsnbjtlZwg7LmY7JWIXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLm1ldHJvKXtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRybyA9IGhvdGVsLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IG1ldHJvLm5lYXJlc3QuZGlmO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pbiA9IGRpZlRvTWluKGRpZik7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZGlmID0gQ29uZmlnX1NhZmV0eS5tZXREaWY7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9EaWYgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZGlmLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1ldERpZiA9IGNvbmRpZltpXS5zdGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1ldFdvcmQgPSBjb25kaWZbaV0ud29yZDtcclxuICAgICAgICAgICAgICAgICAgICBpZihub0RpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjwobWV0RGlmKjEpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vRGlmID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZSArPSBjb25kaWZbaV0uc2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JkLnB1c2goYOqwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKgIOyXreydgCDrj4Trs7QgJHttaW59IOqxsOumrCR7bWV0V29yZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/snKDrj5nsnbjqtazroZwg7J247ZWcIOy5mOyViFxyXG4gICAgICAgICAgICBsZXQgZmxvYXRTY29yZSA9IGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUudHJhbnNwb3J0ICsgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5mb29kICsgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5hdG07XHJcbiAgICAgICAgICAgIGxldCBtaW5TcG90RGlmID0gMTUwO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnNwb3RzLnJhbmtlZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBkYXRhLnNwb3RzLnJhbmtlZFtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSBjYWxjdWxhdGVEaWYoc3BvdC5jb29yLCBob3RlbC5jb29yKTtcclxuICAgICAgICAgICAgICAgIGlmKGRpZjxtaW5TcG90RGlmKXtcclxuICAgICAgICAgICAgICAgICAgICBtaW5TcG90RGlmID0gZGlmO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG1pblNwb3REaWY8NTApe1xyXG4gICAgICAgICAgICAgICAgZmxvYXRTY29yZSArPSAzO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihtaW5TcG90RGlmPDEwMCl7XHJcbiAgICAgICAgICAgICAgICBmbG9hdFNjb3JlICs9IDI7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKG1pblNwb3REaWY8MTUwKXtcclxuICAgICAgICAgICAgICAgIGZsb2F0U2NvcmUgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGZsb2F0ID0gQ29uZmlnX1NhZmV0eS5mbG9hdGluZztcclxuICAgICAgICAgICAgbGV0IG5vdFlldCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZsb2F0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RkID0gZmxvYXRbaV0uc3RkO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZsb2F0V29yZCA9IGZsb2F0W2ldLndvcmQ7XHJcbiAgICAgICAgICAgICAgICBpZihub3RZZXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZsb2F0U2NvcmU+c3RkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm90WWV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGZsb2F0W2ldLnNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkLnB1c2goYCR7Y2l0eU5hbWV9JHtmbG9hdFdvcmR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZmluYWwgPSBDb25maWdfU2FmZXR5LmZpbmFsU2FmZXR5O1xyXG4gICAgICAgICAgICBub3RZZXQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaW5hbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0ZCA9IGZpbmFsW2ldLnN0ZDtcclxuICAgICAgICAgICAgICAgIGxldCBmaW5hbFdvcmQgPSBmaW5hbFtpXS53b3JkO1xyXG4gICAgICAgICAgICAgICAgaWYobm90WWV0KXtcclxuICAgICAgICAgICAgICAgICAgICBpZihzY29yZT5zdGQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3RZZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29yZC5wdXNoKGAke2ZpbmFsV29yZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2NvcmVBcnJheS5wdXNoKHtoaWQ6aGlkLHNjb3JlOnNjb3JlfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzY29yZUFycmF5LnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcclxuXHJcbiAgICAgICAgdmFyIHRvdGFsID0gc2NvcmVBcnJheS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciByYW5rU3lzID0gQ29uZmlnX1NhZmV0eS5zY29yZS5wZXJjZW50aWxlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IHNjb3JlQXJyYXlbaV0uaGlkO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcmFuayA9ICgoaSsxKSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEIC0gMH4xICjrhpLsnYTsiJjroZ0gMOyXkCDqsIDquYzsm4ApXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoMTAtaikgLSBNYXRoLmNlaWwoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuc2FmZXR5ID0gc2NvcmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0U2FmZXR5O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRTYWZldHkuanMiLCJ2YXIgQ29uZmlnX1NhZmV0eSA9IHtcclxuICAgIHNjb3JlOntcclxuICAgICAgICBwZXJjZW50aWxlIDogWzAuMTUsIDAuMiwgMC4yNSwgMC4yLCAwLjEsIDAuMV0sIC8vOSwgOCwgNy4uLuygkOuMgOydmCDrsLHrtoTsnIQg67mE7JyoIC0g7ZWp6rOEIDEg65CY7Ja07JW8IO2VqCEhIVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgd29yZDpbLy9hcmVh6rSA66CoIHdvcmRcclxuICAgICAgICBcIlwiLC8vc2NvcmUgMOygkOydgCDsl4bsnLzrr4DroZwg67mE7JuM65GgXHJcbiAgICAgICAgXCLsl5DshJwg7LmY7JWI7J20IOuCmOyBnCDtjrjsl5Ag7IaN7ZWY64qUXCIsICAvLzHsoJBcclxuICAgICAgICBcIuyXkOyEnCDsuZjslYjsnbQg7KKL7KeA64qUIOyViuydgCDtjrjsnbhcIiwgIC8vMuygkFxyXG4gICAgICAgIFwiIO2Pieq3oOyggeyduCDsuZjslYgg7IiY7KSA7J2EIOuztOydtOuKlFwiLCAgLy8z7KCQXHJcbiAgICAgICAgXCLsl5DshJwg7LmY7JWI7J20IOyii+ydgCDtjrjsnbhcIiwgICAgICAgIC8vNOygkFxyXG4gICAgICAgIFwi7JeQ7IScIOy5mOyViOydtCDrp6TsmrAg7KKL7J2AIO2OuOyduFwiLCAgICAvLzXsoJBcclxuICAgICAgICBcIuyXkOyEnCDsuZjslYjsnYAg7KKL7J2AIO2OuOyXkCDsho3tlZjsp4Drp4wg6rK967KU7KOE7Jyo7J20IOyhsOq4iCDrhpLsnYAg7Y647J24XCIgIC8v7Yq57IiYXHJcbiAgICBdLFxyXG5cclxuICAgIG1ldERpZjpbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTUwLCAgICAgICAgICAgICAgICAgICAgICAgLy/qsbDrpqzqsIAgMTUwIOuvuOunjOydvCDqsr3smrBcclxuICAgICAgICAgICAgd29yZDpcIuyXkCDsnITsuZjtlbQg6rWJ7J6l7Z6IIOqwgOq5jOybgFwiLCAvL+yalOugh+qyjCDshKTrqoXtlZjqs6BcclxuICAgICAgICAgICAgc2NvcmU6NiAgICAgICAgICAgICAgICAgICAgICAgLy837KCQ7J2EIOu2gOyXrO2VqFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MjIwLCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdvcmQ6XCLroZwg66ek7JqwIOqwgOq5jOyatCDtjrhcIixcclxuICAgICAgICAgICAgc2NvcmU6NSAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDozMDAsICAgICAgICAgXHJcbiAgICAgICAgICAgIHdvcmQ6XCLsl5Ag7J6I7J2MXCIsIFxyXG4gICAgICAgICAgICBzY29yZTo0ICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDo0MDAsICAgICAgICAgIFxyXG4gICAgICAgICAgICB3b3JkOlwi7JeQIOyeiOydjFwiLCBcclxuICAgICAgICAgICAgc2NvcmU6MyAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6NTAwLCAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgd29yZDpcIuuhnCDslb3qsIQg65ao7Ja07KC4IOyeiOuKlCDtjrhcIixcclxuICAgICAgICAgICAgc2NvcmU6MiAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTUwMCwgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdvcmQ6XCLroZwg7IOB64u57Z6IIOuWqOyWtOyguCDsnojripQg7Y64XCIsIFxyXG4gICAgICAgICAgICBzY29yZToxICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuXHJcbiAgICBmbG9hdGluZzpbIC8vYXRtLCBmb29kLCB0cmFuc3BvcnQg7ZWp6rOEICsg7KO867OAIOq0gOq0keyngCDrs7TrhIjsiqQoNTBt7J2064K0IC0gM+ygkOunjOygkCwgMTUwbSAx7KCQKTtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoyNyxcclxuICAgICAgICAgICAgd29yZDpcIuuCtCDri6Trpbgg7KeA7JetIOuMgOu5hCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOyDgeuLue2eiCDrp47snYAg7Y64XCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjYuNVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MjUuNSxcclxuICAgICAgICAgICAgd29yZDpcIuuCtCDri6Trpbgg7KeA7JetIOuMgOu5hCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOq9pCDrp47snYAg7Y64XCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjI0LFxyXG4gICAgICAgICAgICB3b3JkOlwi64K0IOuLpOuluCDsp4Dsl60g64yA67mEIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg7KGw6riIIOunjuydgCDtjrhcIixcclxuICAgICAgICAgICAgc2NvcmU6NFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MjEsXHJcbiAgICAgICAgICAgIHdvcmQ6XCLrgrQg7Y+J6regIOyImOykgOydmCDsnKDrj5nsnbjqtawg7IiY7KSA7J2EIOuztOyehFwiLFxyXG4gICAgICAgICAgICBzY29yZTozXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoxOCxcclxuICAgICAgICAgICAgd29yZDpcIuuCtCDri6Trpbgg7KeA7JetIOuMgOu5hCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOyVveqwhCDsoIHsnYAg7Y64XCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjIuNVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTUsXHJcbiAgICAgICAgICAgIHdvcmQ6XCLrgrQg64uk66W4IOyngOyXrSDrjIDruYQg7KO867OAIOycoOuPmeyduOq1rOqwgCDsoIHsnYAg7Y64XCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjIuMjVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjUsXHJcbiAgICAgICAgICAgIHdvcmQ6XCLrgrQg64uk66W4IOyngOyXrSDrjIDruYQg7KO867OAIOycoOuPmeyduOq1rOqwgCDsg4Hri7ntnogg7KCB7J2AIO2OuFwiLFxyXG4gICAgICAgICAgICBzY29yZToyXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuXHJcbiAgICBmaW5hbFNhZmV0eTpbIC8vc2NvcmUqMyArIG1ldERpZiArIGZsb2F0aW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MjAsIC8v7JiILCDsp4Dsl60gNOygkCwg64KY66i47KeAIO2Pieq3oCwg7KeA7JetIDXsoJAsIOuCmOuouOyngCDstZzslYXsnYAg7JWE64uMIOyImOykgFxyXG4gICAgICAgICAgICB3b3JkOlwi7KGw7Ius7ZWc64uk66m0IOuwpCDriqbqsowg6reA6rCA7ZWgIOuVjOyXkOuPhCDslYjsoITtlZwg7JyE7LmYXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjE4LCAvL+yYiCwg7KeA7JetIDPsoJAsIOuCmOuouOyngCDrqqjrkZAg7KSR7IOB7JyE6raMLCDsp4Dsl60gNOygkCwg64KY66i47KeAIOuCruyngCDslYrsnYxcclxuICAgICAgICAgICAgd29yZDpcIuyhsOyLrO2VnOuLpOuptCDriqbsnYAg7Iuc6rCEIOq3gOqwgO2VoCDrlYzsl5Drj4Qg7YGwIOusuOygnOuKlCDsl4bsnYxcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjE2LCAvL+yYiCwg7KeA7JetIDTsoJAsIOuCmOuouOyngCDstZzslYXsnYAg7JWE64uYLCDsp4Dsl60gM+ygkCwg64KY66i47KeAIOykkeqwhCDsnbTsg4EsIOyngOyXrSAy7KCQIOuCmOuouOyngCDstZzsg4FcclxuICAgICAgICAgICAgd29yZDpcIuuKpuydgCDrsKTsnYQg7ZS87ZWc64uk66m0IOydvOuwmOyggeycvOuhnCDsoIDrhYHsl5Ag6reA6rCA7ZWgIOuVjCDtgbAg66y47KCc64qUIOyXhuydjFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoxMy41LCAvL+yngOyXrSAz7KCQLCDrgpjrqLjsp4Ag7LWc7JWFLCDsp4Dsl60gMuygkFxyXG4gICAgICAgICAgICB3b3JkOlwi7KGw7Ius7Z6IIOuLpOuLkCDtlYTsmpTqsIAg7J6I7Jy866mwLCDriqbsnYAg67Ck7JeQIOq3gOqwgO2VmOuKlCDqsoPsnYAg7IK86rCA64qUIOqyg+ydtCDsoovsnYxcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTEsIC8v7KeA7JetIDLsoJAg64KY66i47KeAIOuCruydgCDtjrgsIOyngOyXrSAx7KCQIOuCmOuouOyngCDspJHqsIQg7J207IOBXHJcbiAgICAgICAgICAgIHdvcmQ6XCLtlbQg7KeEIOydtO2bhOyXkOuKlCDrj4zslYTri6Tri4jripQg6rKD7J2EIOyCvOqwgOuKlCDqsoPsnbQg7KKL7J2MXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjksICAvL+yngOyXrSAx7KCQIFxyXG4gICAgICAgICAgICB3b3JkOlwi64Ku7JeQ64+EIOyViOyghOyXkCDsnKDsnZjtlZjrqbAg64uk64uI64qUIOqyg+ydtCDsoovsnYxcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6NCxcclxuICAgICAgICAgICAgd29yZDpcIuy5mOyViCDrrLjsoJzqsIAg7KSR7JqU7ZWY64uk66m0IOyImeyGjCDsnITsuZjroZwg7KCB7ZWp7ZWcIOyngOyXreydtCDslYTri5hcIlxyXG4gICAgICAgIH1cclxuICAgIF1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZ19TYWZldHk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY29uZmlnL3NhZmV0eS5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldExhdW5kcnkgPSB7XHJcbiAgICBzdGF0aXN0aWM6e25lYXJlc3Q6W119LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEsIGNpdHlOYW1lKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2l0eU5hbWUgPSBjaXR5TmFtZTtcclxuICAgICAgICB0aGlzLmZpcnN0X3NldExhdW5kcnkoKTtcclxuICAgICAgICB0aGlzLnNlY29uZF9tYWtlU2NvcmUoKTtcclxuICAgICAgICB0aGlzLnRoaXJkX3dvcmRpbmcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdGhpcmRfd29yZGluZzogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciBsYXVuZHJ5ID0gaG90ZWwubG9jYWwubGF1bmRyeTtcclxuXHJcbiAgICAgICAgICAgIGlmKGxhdW5kcnkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IGRpZlRvTWluKGxhdW5kcnkubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLmxhdW5kcnkgPSBg7IiZ7IaM7JeQ7IScIOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyEuO2DgeyGjOqwgCDsnojsnYxgO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5sYXVuZHJ5ID0gJ+yImeyGjCDrj4Trs7QgMTDrtoTqsbDrpqwg7J2064K07JeQIOyEuO2DgeyGjOuKlCDsobTsnqztlZjsp4Ag7JWK7JWEIOq4tCDsl6ztlonsi5wg67aI7Y647ZWgIOyImCDsnojsnYwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZWNvbmRfbWFrZVNjb3JlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBzY29yZUFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgbGV0IGxhdW5kcnkgPSBob3RlbC5sb2NhbC5sYXVuZHJ5O1xyXG5cclxuICAgICAgICAgICAgaWYobGF1bmRyeSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSAoNTAwIC0gbGF1bmRyeS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICBzY29yZUFycmF5LnB1c2goe2hpZDpoaWQsc2NvcmU6c2NvcmV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5sYXVuZHJ5LnNjb3JlLnBlcmNlbnRpbGU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcmVBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaGlkID0gc2NvcmVBcnJheVtpXS5oaWQ7XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCByYW5rID0gKChpKzEpIC8gdG90YWwpOyAvLyDrsLHrtoTsnIQgLSAwfjEgKOuGkuydhOyImOuhnSAw7JeQIOqwgOq5jOybgClcclxuICAgICAgICAgICAgdmFyIHBlcmNlbnRpbGUgPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlzUmFua2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJhbmtTeXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKCFpc1JhbmtlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbnVzID0gcGVyY2VudGlsZTtcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50aWxlICs9IHJhbmtTeXNbal07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhbms8cGVyY2VudGlsZSl7ICAvLzM1JSDslYjsl5Ag65Ok66m0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmsgLT0gbWludXM7ICAgLy9yYW5r66W8IDB+MC4y66GcIOunnuy2sOykjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSA9ICgxMC1qKSAtIE1hdGguY2VpbCgocmFuay9yYW5rU3lzW2pdKSoxMCkvMTA7IC8vcmFuaygwfjAuMinrpbwgMC4y66GcIOuCmOuIiOqwkioxMC8xMCAtPiAwfjAuOeqwgCDrgpjsmLRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSYW5rZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudCl7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50LnNjb3JlKXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlLmxhdW5kcnkgPSBzY29yZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUgPSB7bGF1bmRyeTpzY29yZX07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZTp7bGF1bmRyeTpzY29yZX0sXHJcbiAgICAgICAgICAgICAgICAgICAgd29yZDp7bGF1bmRyeTpcIlwifVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICBsZXQgbGF1bmRyeSA9IGhvdGVsLmxvY2FsLmxhdW5kcnk7XHJcblxyXG4gICAgICAgICAgICBpZighbGF1bmRyeSl7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50LnNjb3JlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5sYXVuZHJ5ID0gNTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZSA9IHtsYXVuZHJ5OjV9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOntsYXVuZHJ5OjV9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkOntsYXVuZHJ5OlwiXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlyc3Rfc2V0TGF1bmRyeTogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmxhdW5kcnkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDp7ZGlmOkNvbmZpZy5sYXVuZHJ5Lm5lYXJTdGR9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbGRBcnIgPSB0aGlzLmRhdGEubG9jYWwubGF1bmRyeTtcclxuICAgICAgICAgICAgbGV0IGhhc0xEID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxkQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGF1bmRyeSA9IGxkQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IGNhbGN1bGF0ZURpZihob3RlbC5jb29yLCBsYXVuZHJ5LmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRpZjxDb25maWcubGF1bmRyeS5uZWFyU3RkKXtcclxuICAgICAgICAgICAgICAgICAgICBoYXNMRCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhdW5kcnlfYyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcjpsYXVuZHJ5LmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6bGF1bmRyeS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6ZGlmLnRvRml4ZWQoMCkqMVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlmPGhvdGVsLmxvY2FsLmxhdW5kcnkubmVhcmVzdC5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5sYXVuZHJ5Lm5lYXJlc3QgPSBsYXVuZHJ5X2M7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFoYXNMRCl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5sYXVuZHJ5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmVzdC5wdXNoKGhvdGVsLmxvY2FsLmxhdW5kcnkubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0TGF1bmRyeTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0TGF1bmRyeS5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldENvbnZpbmllbmNlID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2l0eU5hbWUpe1xyXG4gICAgICAgIGxldCBzY29yZUFycmF5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIGRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgd29yZCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgdHlwZSBpbiBob3RlbC5hc3Nlc3NtZW50LnNjb3JlKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlID09PSBcInNhZmV0eVwiIHx8IHR5cGUgPT09IFwidHJhbnNwb3J0XCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRpV29yZCA9IGhvdGVsLmFzc2Vzc21lbnQud29yZFt0eXBlXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kaVNjb3JlID0gaG90ZWwuYXNzZXNzbWVudC5zY29yZVt0eXBlXTtcclxuICAgICAgICAgICAgICAgICAgICB3b3JkLnB1c2goaW5kaVdvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGluZGlTY29yZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgaG90ZWwuYXNzZXNzbWVudC5zY29yZVt0eXBlXTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgaG90ZWwuYXNzZXNzbWVudC53b3JkW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaCh7aGlkOmhpZCxzY29yZTpzY29yZX0pO1xyXG4gICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQuY29udmluaWVuY2UgPSB3b3JkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG4gICAgICAgIHZhciByYW5rU3lzID0gQ29uZmlnLmF0bS5zY29yZS5wZXJjZW50aWxlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IHNjb3JlQXJyYXlbaV0uaGlkO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICB2YXIgcmFuayA9ICgoaSsxKSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoMTAtaikgLSBNYXRoLmNlaWwoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuY29udmluaWVuY2UgPSBzY29yZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNjb3JlPjkpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLmNvbnZpbmllbmNlLnB1c2goYCR7Y2l0eU5hbWV9IOuCtCDri6Trpbgg7IiZ7IaM65OkIOuMgOu5hCDso7zrs4Ag7Y647J2Y7Iuc7ISk7J20IOq1ieyepe2eiCDsnpgg7ZiV7ISx65CY7Ja0IO2OuOumrO2VmOqyjCDsl6ztlontlaAg7IiYIOyeiOydjGApO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihzY29yZT44KXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5jb252aW5pZW5jZS5wdXNoKGAke2NpdHlOYW1lfSDrgrQg64uk66W4IOyImeyGjOuTpCDrjIDruYQg7KO867OAIO2OuOydmOyLnOyEpOydtCDsnpgg7ZiV7ISx65CcIO2OuOydtOudvCDtjrjrpqztlZjqsowg7Jes7ZaJ7ZWgIOyImCDsnojsnYxgKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Nyl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQuY29udmluaWVuY2UucHVzaChgJHtjaXR5TmFtZX0g64K07JeQ7IScIOyjvOuzgCDtjrjsnZjsi5zshKTsnYAg7Y+J6regIOydtOyDgSDsoJXrj4TroZwg7J6YIOqwluy2lOyWtOyguCDsnojsnYxgKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Nil7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQuY29udmluaWVuY2UucHVzaChgJHtjaXR5TmFtZX0g64K07JeQ7IScIOyjvOuzgCDtjrjsnZjsi5zshKTsnYAg7Y+J6reg7JeQ7IScIOyVveqwhCDrqrsg66+47LmY64qUIOygleuPhOuhnCDtmJXshLHrkJjslrQg7J6I7J2MYCk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHNjb3JlPjUpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLmNvbnZpbmllbmNlLnB1c2goYCR7Y2l0eU5hbWV9IOuCtCDri6Trpbgg7IiZ7IaM65OkIOuMgOu5hCDso7zrs4Ag7Y647J2Y7Iuc7ISk7J2AIOyhsOq4iOyUqSDqsbDrpqzqsIAg7J6I64qUIO2OuGApO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5jb252aW5pZW5jZS5wdXNoKGAke2NpdHlOYW1lfSDrgrQg64uk66W4IOyImeyGjOuTpCDrjIDruYQg7KO867OAIO2OuOydmOyLnOyEpOuTpOydgCDrqYDrpqwg7J6I64qUIO2OuGApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0Q29udmluaWVuY2U7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldENvbnZpbmllbmNlLmpzIiwidmFyIFNldEFyZWEgPSB7XHJcbiAgICBtYXA6e30sXHJcbiAgICBtYXJrZXI6e30sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24gKGNpdHlOYW1lLCBjaWQpIHtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5tYXJrZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyW2hpZF0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyID0ge307XHJcblxyXG4gICAgICAgICAgICB2YXIgdHh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGgyPicgKyBjaXR5TmFtZSArICcg7IiZ7IaMIOyngOyXrSDqtazrtoQ8L2gyPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiY2l0eUFyZWFfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgaWQ9XCJjaXR5QXJlYV9fbWFwXCI+PC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiXCJjaXR5QXJlYT4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eUFyZWFfX3dvcmRcIj48L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjaWQ9XCInICsgY2lkICsgJ1wiIGNsYXNzPVwiY2l0eUFyZWFfX2ZpbmlzaFwiPuyZhOujjOyymOumrDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JzsgLy9jbG9zZSB3cmFwcGVyXHJcblxyXG4gICAgICAgICAgICAkKFwiLnBhZ2VzLmhvdGVsXCIpLmh0bWwodHh0KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5QXJlYV9fbWFwJyksIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogNDAuNzQzMTk1NzkzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzogLTczLjk4OTE3OTU0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgem9vbTogMTNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhcmVhID0ge307XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9BcmVhID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuYXJlYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhLmFyZWFbaV0ubm90QXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmVhQ29vciA9IGRhdGEuYXJlYVtpXS5jb29yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5BcmVhKGhvdGVsLmNvb3IsIGFyZWFDb29yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXJlYSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0FyZWEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub0FyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcltoaWRdID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBob3RlbC5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJycgKyBoaWRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcmVhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvaG90ZWxzJykudXBkYXRlKGRhdGEuaG90ZWxzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldEFyZWE7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==