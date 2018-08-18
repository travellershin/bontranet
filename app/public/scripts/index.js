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

var _spot = __webpack_require__(5);

var _spot2 = _interopRequireDefault(_spot);

var _account = __webpack_require__(11);

var _account2 = _interopRequireDefault(_account);

var _subway = __webpack_require__(12);

var _subway2 = _interopRequireDefault(_subway);

var _hotel = __webpack_require__(13);

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

var _third_finalize = __webpack_require__(9);

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

var _config = __webpack_require__(10);

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
        $(".header").append('<p class="return">돌아가기</p>');

        if (this.temp) {
            $(".header").append('<p class="redo_remove">마지막 제거 취소</p>');
        }

        var spotObj = data.spots.combined;
        this.spotObj = spotObj;
        console.log(spotObj);
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
                score -= 120;
                score -= minRank;
                if (spot.rank.nv) {
                    score += 50;
                }
            } else if (individualArr.length === 3) {
                score += 160 - minRank;
            } else if (individualArr.length === 4) {
                score += 160;
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
    }
};
exports.default = Third_finalize;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Config = {};

exports.default = Config;

/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setHotelInfo = __webpack_require__(14);

var _setHotelInfo2 = _interopRequireDefault(_setHotelInfo);

var _setArea = __webpack_require__(18);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setATM = __webpack_require__(15);

var _setATM2 = _interopRequireDefault(_setATM);

var _setFood = __webpack_require__(16);

var _setFood2 = _interopRequireDefault(_setFood);

var _setMetro = __webpack_require__(17);

var _setMetro2 = _interopRequireDefault(_setMetro);

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
            _setMetro2.default.init(data);
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
/* 15 */
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
            if (hotel.temp) {
                //hotel.temp로 바꿀것임
                var atmArr = hotel.temp.atm;
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
            var rank = { //꼴지 랭크를 부여함 -> 혹시 hotel에 각 내용들이 없다면 랭크는 꼴찌
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
            var _hid = scoreArray[i].hid;
            var _score = 0;
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
                        _score = 9 - j + Math.floor(rank / rankSys[j] * 10) / 10; //rank(0~0.2)를 0.2로 나눈값*10/10 -> 0~0.9가 나옴
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
/* 16 */
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
        console.log(this.data);
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
                        _score = 9 - j + Math.floor(rank / rankSys[j] * 10) / 10; //rank(0~0.2)를 0.2로 나눈값*10/10 -> 0~0.9가 나옴
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SetMetro = {
    data: {},
    statistic: { nearest: [] },

    init: function init(data) {
        this.data = data;
        this.first_setMetro(); //숙소별로 지하철을 때려넣음
        this.second_byAreas();
        this.third_makeScore();
        this.fourth_wording();
        console.log(this.data);
    },

    fourth_wording: function fourth_wording() {
        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var txtArr = [];

            var metro = hotel.local.metro;
            if (metro) {
                var nearestDif = difToMin(metro.nearest.dif);
                var nearestStn = metro.nearest.name;
                var txt = "\uC219\uC18C\uC5D0\uC11C \uAC00\uC7A5 \uAC00\uAE4C\uC6B4 \uC9C0\uD558\uCCA0\uC5ED\uC740 " + nearestDif + " \uAC70\uB9AC\uC758 " + nearestStn + "\uC5ED";
                txt.push(txtArr);
            } else {
                txtArr = ["이 숙소 도보 15분 이내 거리에 지하철 역이 없어서 대중교통을 이용하기 불편할 수 있음"];
            }
        }
    },

    third_makeScore: function third_makeScore() {
        var scoreArray = [];

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var metro = hotel.local.metro;
            var score = 0;
            var metroLineObj = this.data.metroLine;
            var spot = [];

            if (metro) {
                if (metro.byLine) {
                    for (var lineName in metro.byLine) {
                        var line = metro.byLine[lineName];
                        score = (1000 - line.dif) * (metroLineObj[lineName].score + 25);
                    }
                }
            }
            scoreArray.push({ hid: hid, score: score });
        }

        console.log(scoreArray);

        scoreArray.sort(function (a, b) {
            return b.score - a.score;
        });

        var total = scoreArray.length;

        var rankSys = _config2.default.metro.score.percentile;

        for (var i = 0; i < scoreArray.length; i++) {
            var _hid = scoreArray[i].hid;
            var _score = 0;
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
                        _score = 9 - j + Math.floor(rank / rankSys[j] * 10) / 10; //rank(0~0.2)를 0.2로 나눈값*10/10 -> 0~0.9가 나옴
                        isRanked = true;
                    }
                }
            }

            var _hotel = this.data.hotels[_hid];

            if (_hotel.assessment) {
                if (_hotel.assessment.score) {
                    _hotel.assessment.score.metro = _score;
                } else {
                    _hotel.assessment.score = { metro: _score };
                }
            } else {
                _hotel.assessment = {
                    score: { metro: _score },
                    word: { metro: "" }
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

            for (var i = 0; i < metroArr.length; i++) {
                var metro = metroArr[i];
                var dif = calculateDif(hotel.coor, metro.coor);

                if (dif < _config2.default.metro.nearStd) {
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

            this.statistic.nearest.push(hotel.local.metro.nearest.dif);
        }
    }
};

exports.default = SetMetro;

/***/ }),
/* 18 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjEzNzY4YjMxMmQwYmUyNGI1YmUiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY29uZmlnLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvZ2VvQ29kZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9hdHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvY2l0eS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvZmlyc3RfY2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9hdXRvQ29tYmluZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L3Nlb25kX2NvbWJpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC90aGlyZF9maW5hbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9hY2NvdW50LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3N1YndheS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEFUTS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0Rm9vZC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0TWV0cm8uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEFyZWEuanMiXSwibmFtZXMiOlsiQ29uZmlnIiwibWV0cm8iLCJuZWFyU3RkIiwic2NvcmUiLCJwZXJjZW50aWxlIiwiZm9vZCIsImtpbmQiLCJiYWtlcnkiLCJuYW1lIiwidHlwZSIsImpvc2EiLCJzdGQiLCJncm9jZXJ5Iiwic2V2ZW4iLCJmYW1pbHkiLCJsYXdzb24iLCJsYXJnZSIsIm11bHRpcGxlIiwiY3ZzIiwid2VpZ2h0IiwibmVhcmVzdCIsImluMjUwIiwid29yZCIsImludGVncmF0ZSIsImJhbmsyNCIsImF0bSIsImluMTMwIiwiR2VvQ29kZSIsImluaXQiLCJhcnIiLCJyZWYiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwib25jZSIsImRhdGEiLCJzbmFwIiwidmFsIiwibGVuZ3RoIiwic2V0IiwiY29kZSIsInRvYXN0IiwidGhhdCIsImdlb2NvZGVyIiwiZ29vZ2xlIiwibWFwcyIsIkdlb2NvZGVyIiwiYWRkcmVzcyIsImFpZCIsImdlb2NvZGUiLCJyZXN1bHRzIiwic3RhdHVzIiwiY29uc29sZSIsImxvZyIsImNvb3IiLCJsYXQiLCJnZW9tZXRyeSIsImxvY2F0aW9uIiwibG5nIiwic2hpZnQiLCJzZXRUaW1lb3V0IiwicmVsb2FkIiwiaW5pdGlhbGl6ZWQiLCJ1X2kiLCJOYXZfZnVuY3Rpb24iLCJhdHRlbmQiLCJ0b2RvIiwiY2l0eSIsIm1hcCIsImFjY291bnQiLCJzcG90IiwiY2FsYyIsImhvdGVsIiwibGluayIsImxvZ2luIiwiJCIsImh0bWwiLCJhdHRyIiwiY2xpY2siLCJjb25maXJtIiwiYXV0aCIsInNpZ25PdXQiLCJ0aGVuIiwid2luZG93IiwiY2F0Y2giLCJlcnJvciIsImRvY3VtZW50IiwicmVhZHkiLCJwcm92aWRlciIsIkdvb2dsZUF1dGhQcm92aWRlciIsIm9uQXV0aFN0YXRlQ2hhbmdlZCIsInVzZXIiLCJtYWlsIiwiZW1haWwiLCJzcGxpdCIsImdyYWRlIiwic2lnbkluV2l0aFBvcHVwIiwicmVzdWx0IiwidXNlck1haWwiLCJkaXNwbGF5TmFtZSIsInNldHRpbmciLCJvcmRlciIsImVycm9yQ29kZSIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjcmVkZW50aWFsIiwiaGFzQ2xhc3MiLCJpdGVtIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInBhcmVudCIsIkF0dGVuZCIsIm1vYmlsZSIsImlkIiwidmlld0lEIiwiYXR0ZW5kT2JqIiwic2FsYXJ5Iiwid2Vla2RheXMiLCJ0eHQiLCJ1c2VycyIsIm1haWxJRCIsInByb3AiLCJvbiIsImluZmxhdGVfY2FsZW5kYXIiLCJmdWxsQ2FsZW5kYXIiLCJoZWlnaHQiLCJmaXJzdERheSIsInZpZXdSZW5kZXIiLCJ2aWV3IiwiZWxlbWVudCIsImRheUNsaWNrIiwiZGF0ZSIsImlucHV0V29ya0hvdXIiLCJsaXN0ZW5lciIsInNldFdvcmtIb3VyIiwia2V5dXAiLCJlIiwid2hpY2giLCJjaGFuZ2UiLCJ2aWV3X3dvcmtlciIsIm9mZiIsInlvIiwiZGF0ZUlEIiwic2xpY2UiLCJkaWYiLCJmcm9tIiwidG8iLCJpIiwiTWF0aCIsImZsb29yIiwiZHVyTW9uIiwidGhpc01vbnRoIiwiZGF0ZURvbSIsImVxIiwiaiIsIndlZWtEb20iLCJ3ZWVrRHVyIiwiZGF5RG9tIiwiZmluZCIsImsiLCJjaGlsZHJlbiIsImFwcGVuZCIsImZ1bGxNb250aEJvbnVzIiwiaW5zdXJhbmNlRmVlIiwiYmFzaWMiLCJyb3VuZCIsImZ1bGxXZWVrQnVudXMiLCJjb21tYSIsImRhdGVPYmoiLCJkYXRlU2hvcnQiLCJtb21lbnQiLCJmb3JtYXQiLCJBbnlQaWNrZXIiLCJkYXRlVGltZUZvcm1hdCIsImZvY3VzIiwid29yayIsImFsbEVtcHR5IiwicmVtb3ZlIiwiYWxlcnQiLCJmcm9tQSIsInRvQSIsInB1c2giLCJDaXR5IiwicmVmcmVzaFN0YXR1cyIsImluZmxhdGUiLCJ0cmFuc3BvcnQiLCJhcmVhIiwicHJpY2UiLCJjaWQiLCJob3RlbHMiLCJPYmplY3QiLCJrZXlzIiwiYXNzZXNzbWVudCIsInVwZGF0ZSIsIm1ldHJvTGluZSIsIlNwb3QiLCJjaXRpZXMiLCJjdXJyZW50IiwiaW5mbGF0ZV9zdGF0dXMiLCJpbmZsYXRlX2NpdHkiLCJ1aWQiLCJyZW1vdmVfc3BvdCIsInJlZG9fcmVtb3ZlIiwib3JkZXJBcnJheSIsImlkeCIsImNoYW5nZWQiLCJzb3J0IiwiYSIsImIiLCJzdGF0dXNBcnJheSIsImNpdHlOYW1lIiwic3BvdHMiLCJGaXJzdF9DaGVjayIsInNldFJlbWFpbk51bWJlciIsInNpZCIsInNpdGVOb2RhdGEiLCJkZWxldGVTcG90IiwiaW5wdXRDb29yZGluYXRlIiwic2l0ZSIsIm51bWJlciIsImN1dE5vIiwidHJpbSIsImN1dE9iaiIsIm5vIiwiZGVsZXRlZCIsImNvb3JUeHQiLCJpc05hTiIsImhhc1Byb2JsZW0iLCJzZWFyY2hVcmwiLCJzaXRlT2JqIiwiZ2ciLCJudiIsInRhIiwibHAiLCJzaXRlSGFzUHJvYmxlbSIsIm5vQ29vciIsIm5vQ29vclR4dCIsIm5vU3BvdCIsIm5vU3BvdFR4dCIsIm5vZGF0YSIsImhhc0Nvb3IiLCJsYXJnZU9LIiwibGFyZ2VEYXRhIiwic2Nyb2xsVG9wIiwiQXV0b0NvbWJpbmUiLCJzaXRlQXJyIiwiY29tYmluaW5nIiwiY291bnRlciIsIm5vRGF0YSIsIm9sZFNwb3QiLCJrbyIsImVuIiwicmFuayIsInRlc3QiLCJ1cmwiLCJ0YWciLCJjb21iaW5lT2JqIiwiY29tYmluZWQiLCJjb21iaW5lIiwiaGFzQ29tYmluZWQiLCJ0Q29kZSIsInRTcG90Iiwia2V5IiwiY2FsY3VsYXRlRGlmIiwiU2Vjb25kX2NvbWJpbmUiLCJUaGlyZF9maW5hbGl6ZSIsInRlbXAiLCJzcG90T2JqIiwic3BvdE5hbWUiLCJyYW5rQXJyIiwic3BvdFRvdGFsIiwiaW5kaXZpZHVhbEFyciIsIm1pblJhbmsiLCJzcXJ0IiwicmFua2luZyIsIkFjY291bnQiLCJTdWJ3YXkiLCJtYXJrZXIiLCJNYXAiLCJnZXRFbGVtZW50QnlJZCIsImNlbnRlciIsInpvb20iLCJtYXBUeXBlQ29udHJvbCIsInNjYWxlQ29udHJvbCIsImZ1bGxzY3JlZW5Db250cm9sIiwiYWRkTGlzdGVuZXIiLCJmaW5kU3Vid2F5IiwibGF0TG5nIiwic2V0TWFwIiwiTWFya2VyIiwicG9zaXRpb24iLCJtZXRyb0luZm8iLCJtZXRyb0J5U3RuIiwibWV0cm9OYW1lIiwibGluZSIsImNvbmNhdCIsIm1ldEFycmF5IiwibWV0U3RuQXJyYXkiLCJjZWlsIiwiSG90ZWwiLCJoaWQiLCJjaGVjayIsImFsZXJ0TW9kYWwiLCJyYW5rZWQiLCJsb2NhbCIsIlNldEhvdGVsSW5mbyIsImNoZWNrVHh0IiwidmlzYSIsImNpdGkiLCJzYWZldHkiLCJ0aGVtZSIsImNvbnZlbmllbmNlIiwiQXJyYXkiLCJpc0FycmF5IiwiU2V0QVRNIiwic3RhdGlzdGljIiwiYnlBcmVhIiwiZmlyc3RfYnlIb3RlbHMiLCJzZWNvbmRfYnlBcmVhcyIsInRoaXJkX21ha2VTdGF0cyIsImZvdXJ0aF9tYWtlUmFuayIsImZpZnRoX21ha2VTY29yZSIsInNpeHRoX3dvcmRpbmciLCJhdG1BcnIiLCJhdG1PYmoiLCJvd25lciIsImluY2x1ZGVzIiwicGxhY2VOYW1lIiwiaXMyNCIsImVyck5vIiwic3VtIiwibm90QXJlYSIsImF0bXMiLCJtaW51cyIsInRvRml4ZWQiLCJzdGF0IiwidG90YWwiLCJpbmRleE9mIiwic2NvcmVBcnJheSIsInJhbmtTeXMiLCJpc1JhbmtlZCIsInRmYyIsImNvbmZpZyIsImluU3RkIiwiZGlmVG9NaW4iLCJkaWYyNCIsIlNldEZvb2QiLCJuZWFyYnkiLCJmaXJzdF9nZW9Db2RlIiwic2Vjb25kX3NldEZvb2QiLCJ0aGlyZF9ieUFyZWFzIiwiZm91cnRoX21ha2VTdGF0cyIsImdkaWYiLCJuZWFyZXN0RGlmIiwiZm9vZHMiLCJpc1NvbWVGb29kIiwiZ3JvQXJyIiwiZm9vZEFyciIsImNvcHkiLCJleHRlbmQiLCJuZWFyNSIsImdlb0FyciIsImlzR2VvTmVlZGVkIiwiU2V0TWV0cm8iLCJmaXJzdF9zZXRNZXRybyIsInRoaXJkX21ha2VTY29yZSIsImZvdXJ0aF93b3JkaW5nIiwidHh0QXJyIiwibmVhcmVzdFN0biIsIm1ldHJvTGluZU9iaiIsImJ5TGluZSIsImxpbmVOYW1lIiwiYXJlYUFyciIsIm1ldHJvQXJyIiwiaXNJbkFyZWEiLCJuZWFyIiwibWV0cm9fYyIsIlNldEFyZWEiLCJub0FyZWEiLCJhcmVhQ29vciIsImxhYmVsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBSUEsU0FBUztBQUNUQyxXQUFNO0FBQ0ZDLGlCQUFRLEdBRE47O0FBR0ZDLGVBQU07QUFDRkMsd0JBQWEsQ0FBQyxJQUFELEVBQU8sR0FBUCxFQUFZLElBQVosRUFBa0IsR0FBbEIsRUFBdUIsR0FBdkIsRUFBNEIsR0FBNUIsQ0FEWCxDQUM2QztBQUQ3QztBQUhKLEtBREc7O0FBU1RDLFVBQUs7QUFDREMsY0FBSztBQUNEQyxvQkFBTyxFQUFFO0FBQ0xDLHNCQUFLLE1BREY7QUFFSEMsc0JBQUssTUFGRjtBQUdIQyxzQkFBSyxHQUhGO0FBSUhDLHFCQUFJLEdBSkQsQ0FJUztBQUpULGFBRE47QUFPREMscUJB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TyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDIxMzc2OGIzMTJkMGJlMjRiNWJlIiwidmFyIENvbmZpZyA9IHtcclxuICAgIG1ldHJvOntcclxuICAgICAgICBuZWFyU3RkOjc1MCxcclxuXHJcbiAgICAgICAgc2NvcmU6e1xyXG4gICAgICAgICAgICBwZXJjZW50aWxlIDogWzAuMTUsIDAuMiwgMC4yNSwgMC4yLCAwLjEsIDAuMV0sIC8vOSwgOCwgNy4uLuygkOuMgOydmCDrsLHrtoTsnIQg67mE7JyoIC0g7ZWp6rOEIDEg65CY7Ja07JW8IO2VqCEhIVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZm9vZDp7XHJcbiAgICAgICAga2luZDp7XHJcbiAgICAgICAgICAgIGJha2VyeTp7IC8v7J2867CY7KCBIOuyoOydtOy7pOumrCDstJ3sua1cclxuICAgICAgICAgICAgICAgIG5hbWU6XCLrsqDsnbTsu6TrpqxcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6XCLrsqDsnbTsu6TrpqxcIixcclxuICAgICAgICAgICAgICAgIGpvc2E6XCLqsIBcIixcclxuICAgICAgICAgICAgICAgIHN0ZDoyNTAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ3JvY2VyeTp7IC8v7J2867CY7KCBIOyLneujjO2SiOygkCDstJ3sua1cclxuICAgICAgICAgICAgICAgIG5hbWU6XCLsi53ro4ztkojsoJBcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6XCLsi53ro4ztkojsoJBcIixcclxuICAgICAgICAgICAgICAgIGpvc2E6XCLsnbRcIixcclxuICAgICAgICAgICAgICAgIHN0ZDoyNTAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V2ZW46e1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIuyEuOu4kOydvOugiOu4kFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcIu2OuOydmOygkFwiLFxyXG4gICAgICAgICAgICAgICAgam9zYTpcIuydtFwiLFxyXG4gICAgICAgICAgICAgICAgc3RkOjIwMCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYW1pbHk6e1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIu2MqOuwgOumrOuniO2KuFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcIu2OuOydmOygkFwiLFxyXG4gICAgICAgICAgICAgICAgam9zYTpcIuydtFwiLFxyXG4gICAgICAgICAgICAgICAgc3RkOjIwMCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsYXdzb246e1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIuuhnOyGkFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcIu2OuOydmOygkFwiLFxyXG4gICAgICAgICAgICAgICAgam9zYTpcIuydtFwiLFxyXG4gICAgICAgICAgICAgICAgc3RkOjIwMCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsYXJnZTp7XHJcbiAgICAgICAgICAgICAgICBuYW1lOlwi64yA7ZiV66eI7Yq4XCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOlwi64yA7ZiV66eI7Yq4XCIsXHJcbiAgICAgICAgICAgICAgICBqb3NhOlwi6rCAXCIsXHJcbiAgICAgICAgICAgICAgICBtdWx0aXBsZToyLCAvL+ydtOuFgOyEneydtCDso7zrs4Dsl5Ag7J6I7Jy866m0IDLrsLAg7KKL7J2A64aIIOy3qOq4iVxyXG4gICAgICAgICAgICAgICAgc3RkOjUwMCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBuZWFyU3RkOnsvL+yWvOuniOuCmCDqsIDquYzsnbQg7J6I7Ja07JW8IOu2gOq3vOyXkCDsnojripTqsbjroZwg7J247KCV7ZWg6rKD7J2064OQXHJcbiAgICAgICAgICAgIGxhcmdlOjUwMCxcclxuICAgICAgICAgICAgZ3JvY2VyeToyNTAsXHJcbiAgICAgICAgICAgIGN2czoyNTAsIFxyXG4gICAgICAgICAgICBiYWtlcnk6MjUwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29yZTp7XHJcbiAgICAgICAgICAgIHBlcmNlbnRpbGUgOiBbMC4xNSwgMC4yLCAwLjI1LCAwLjIsIDAuMSwgMC4xXSwgLy85LCA4LCA3Li4u7KCQ64yA7J2YIOuwseu2hOychCDruYTsnKggLSDtlanqs4QgMSDrkJjslrTslbwg7ZWoISEhXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3ZWlnaHQ6eyAvL0FUTSDsoJDsiJjrpbwg7IKw7Lac7ZWgIOuVjCDqsIDspJHsuZgo7Iir7J6QIOuLqOychCDrrLTqtIApXHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0OjMuNSxcclxuICAgICAgICAgICAgICAgIGluMjUwOiAxLFxyXG4gICAgICAgICAgICAgICAgbGFyZ2U6MTBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHdvcmQ6e1xyXG4gICAgICAgICAgICBpbnRlZ3JhdGU6eyAvL+qwgOyepSDqsIDquYzsmrQgZm9vZOqwgCBsYXJnZSjsnbTqsbDrgpggMTBtIOuvuOunjCDqsbDrpqzssKjsnbQpKVxyXG4gICAgICAgICAgICAgICAgc3RkOlswLjE1LCAwLjM1LCAwLjZdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzroZwg66ek7JqwIOqwgOq5jOydtOyXkCDsnojsnYwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcIOqwgOq5jOyatCDtjrguIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBiYW5rMjQ6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjM1LDAuN10sIFxyXG4gICAgICAgICAgICAgICAgd29yZDpbXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOqzoCwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcLCDqsIDquYzsmrQg7Y64LiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqwg65ao7Ja07KeEIOyjvOychOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5lYXJlc3Q6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjEsMC4yNSwwLjRdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIiwgLy8xODA4MTAgLSDtj4nqsIDrpbwg7J2864uoIOyViCDtlZjquLDroZwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXRtOntcclxuICAgICAgICBzY29yZTp7XHJcbiAgICAgICAgICAgIHBlcmNlbnRpbGUgOiBbMC4xNSwgMC4yLCAwLjI1LCAwLjIsIDAuMSwgMC4xXSwgLy85LCA4LCA3Li4u7KCQ64yA7J2YIOuwseu2hOychCDruYTsnKggLSDtlanqs4QgMSDrkJjslrTslbwg7ZWoISEhXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3ZWlnaHQ6eyAvL0FUTSDsoJDsiJjrpbwg7IKw7Lac7ZWgIOuVjCDqsIDspJHsuZgo7Iir7J6QIOuLqOychCDrrLTqtIApXHJcbiAgICAgICAgICAgICAgICBiYW5rMjQ6NCxcclxuICAgICAgICAgICAgICAgIG5lYXJlc3Q6My43NSxcclxuICAgICAgICAgICAgICAgIGluMTMwOiAwLjVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICBcclxuICAgICAgICB3b3JkOntcclxuICAgICAgICAgICAgaW50ZWdyYXRlOnsgLy/qsIDsnqUg6rCA6rmM7Jq0IEFUTeydtCAyNOyLnOqwhCDsmKTtlIjtlZjripQg7J2A7ZaJIOyGjOycoCjsnbTqsbDrgpggMTBtIOuvuOunjCDqsbDrpqzssKjsnbQpKVxyXG4gICAgICAgICAgICAgICAgc3RkOlswLjE1LCAwLjM1LCAwLjZdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzroZwg66ek7JqwIOqwgOq5jOydtOyXkCDsnojsnYwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcIOqwgOq5jOyatCDtjrguIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBiYW5rMjQ6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjM1LDAuN10sIFxyXG4gICAgICAgICAgICAgICAgd29yZDpbXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOqzoCwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcLCDqsIDquYzsmrQg7Y64LiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqwg65ao7Ja07KeEIOyjvOychOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5lYXJlc3Q6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjEsMC4yNSwwLjRdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIiwgLy8xODA4MTAgLSDtj4nqsIDrpbwg7J2864uoIOyViCDtlZjquLDroZwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9jb25maWcuanMiLCJ2YXIgR2VvQ29kZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGFyciwgcmVmKXtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgaWYoIWRhdGEpeyAgLy/ri6Trpbgg7KeA7Jik7L2U65SpIOyekeyXheykkeydtOudvOuptCDsoIjrjIAg642u7Ja07I2o7ISc64qUIOyViCDrkKg7XHJcbiAgICAgICAgICAgICAgICBpZihhcnIubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidGVtcC9nZW9jb2RlXCIpLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjpyZWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycjphcnJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY29kZShhcnIsIHJlZik7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyngOyYpOy9lOuUqSDsnpHsl4XsnYQg7Iuc7J6R7ZWp64uI64ukLiDsl6zrn6zrsogg7IOI66Gc6rOg7LmoIOuQoCDsiJgg7J6I7Iq164uI64ukLlwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY29kZTogZnVuY3Rpb24oYXJyLCByZWYpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgbGV0IGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XHJcbiAgICAgICAgdmFyIGFkZHJlc3MgPSBhcnJbMF0uYWRkcmVzcztcclxuICAgICAgICB2YXIgYWlkID0gYXJyWzBdLmFpZDtcclxuXHJcbiAgICAgICAgZ2VvY29kZXIuZ2VvY29kZSggeydhZGRyZXNzJzogYWRkcmVzc30sIGZ1bmN0aW9uKHJlc3VsdHMsIHN0YXR1cykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0dXMpXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gJ09LJykge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb29yID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDpyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzpyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYocmVmK1wiL1wiK2FpZCtcIi9jb29yXCIpLnNldChjb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihhcnIubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvZGUoYXJyLCByZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidGVtcC9nZW9jb2RlXCIpLnNldChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLsp4DsmKTsvZTrlKkg7J6R7JeF7J20IOyZhOujjOuQmOyXiOyKteuLiOuLpC5cIilcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoc3RhdHVzID09PSAnWkVST19SRVNVTFRTJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuyngOyYpOy9lOuUqSDqsrDqs7zqsIAg7JeG64qUIO2VreuqqeydtCDsnojsirXri4jri6QuIOy9mOyGlOywveydhCDssLjqs6DtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6cmVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnI6YXJyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2VvQ29kZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2dlb0NvZGUuanMiLCJpbXBvcnQgQXR0ZW5kIGZyb20gXCIuL3BhZ2VzL2F0dGVuZC5qc1wiO1xyXG5pbXBvcnQgQ2l0eSBmcm9tIFwiLi9wYWdlcy9jaXR5LmpzXCI7XHJcbmltcG9ydCBTcG90IGZyb20gXCIuL3BhZ2VzL3Nwb3QuanNcIjtcclxuaW1wb3J0IEFjY291bnQgZnJvbSBcIi4vcGFnZXMvYWNjb3VudC5qc1wiO1xyXG5pbXBvcnQgU3Vid2F5IGZyb20gXCIuL3BhZ2VzL3N1YndheS5qc1wiO1xyXG5pbXBvcnQgSG90ZWwgZnJvbSBcIi4vcGFnZXMvaG90ZWwuanNcIjtcclxuaW1wb3J0IEdlb0NvZGUgZnJvbSBcIi4vbW9kdWxlcy9nZW9Db2RlLmpzXCI7XHJcblxyXG52YXIgaW5pdGlhbGl6ZWQgPSB7fTtcclxuXHJcbnZhciB1X2kgPSB7fTtcclxuXHJcbnZhciBOYXZfZnVuY3Rpb24gPSB7XHJcbiAgICBhdHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBBdHRlbmQuaW5pdCh1X2kpO1xyXG4gICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgdG9kbzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBjaXR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgQ2l0eS5pbml0KHVfaSk7XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQuY2l0eSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgbWFwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgU3Vid2F5LmluaXQoKTtcclxuICAgIH0sXHJcbiAgICBhY2NvdW50OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIHNwb3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBTcG90LmluaXQodV9pKTtcclxuICAgICAgICBpbml0aWFsaXplZC5zcG90ID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBjYWxjOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGhvdGVsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgSG90ZWwuaW5pdCgpO1xyXG4gICAgfSxcclxuICAgIGxpbms6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBsb2dpbihuYW1lKXtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5odG1sKG5hbWVbMV0rXCLtlZghXCIpO1xyXG4gICAgJChcIi5oZWxsb1dvcmxkXCIpLmF0dHIoXCJ0aXRsZVwiLG5hbWUrXCLri5gg7JWI64WV7ZWY7IS47JqUIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGNvbmZpcm0obmFtZStcIuuLmCDroZzqt7jslYTsm4Mg7ZWY7Iuc6rKg7Iq164uI6rmMP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgLy8gQW4gZXJyb3IgaGFwcGVuZWQuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHByb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgbGV0IG1haWwgPSB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF07XHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2VvQ29kZS5jb2RlKGRhdGEuYXJyLCBkYXRhLnJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLsp4DsmKTsvZTrlKkg7J6R7JeF7J2EIOydtOyWtOyEnCDsp4Ttlontlanri4jri6QuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/slYTrnpgg64K07Jqp7J2EIOuwlOq+uOuptCBpZiAoIWlzVXNlcikg67aA67aE7JeQ64+EIOuwmOuTnOyLnCDrsJjsmIHtlbTspITqsoNcclxuICAgICAgICAgICAgICAgIC8vIGZvciAodmFyIGdpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZGF0YVtnaWRdLlxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikudXBkYXRlKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW21haWxdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdV9pID0gZGF0YVttYWlsXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JhZGUgPSB1X2kuZ3JhZGUgKiAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dGVuZC5pbml0KGRhdGFbbWFpbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGUgPT09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjY291bnQuaW5pdChtYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmFjY291bnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luKHVfaS5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIFVzZXIgaXMgc2lnbmVkIGluLlxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBObyB1c2VyIGlzIHNpZ25lZCBpbi5cclxuICAgICAgICAgICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhQb3B1cChwcm92aWRlcikudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyID0gcmVzdWx0LnVzZXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlck1haWwgPSB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbdXNlck1haWxdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVfaSA9IGRhdGFbdXNlck1haWxdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JhZGUgPSB1X2kuZ3JhZGUgKiAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXR0ZW5kLmluaXQoZGF0YVt1c2VyTWFpbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjb3VudC5pbml0KHVzZXJNYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hY2NvdW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dpbih1X2kubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3VzZXJzLycgKyB1c2VyTWFpbCkuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5kaXNwbGF5TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haWw6IHVzZXJNYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBcImFiY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCdjb2RlOicgKyBlcnJvci5jb2RlICsgJyAtIOydvOyLnOyggeyduCDrrLjsoJzqsIAg67Cc7IOd7ZaI7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqULicpO1xyXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIEVycm9ycyBoZXJlLlxyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yQ29kZSA9IGVycm9yLmNvZGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBlbWFpbCBvZiB0aGUgdXNlcidzIGFjY291bnQgdXNlZC5cclxuICAgICAgICAgICAgICAgIHZhciBlbWFpbCA9IGVycm9yLmVtYWlsO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGZpcmViYXNlLmF1dGguQXV0aENyZWRlbnRpYWwgdHlwZSB0aGF0IHdhcyB1c2VkLlxyXG4gICAgICAgICAgICAgICAgdmFyIGNyZWRlbnRpYWwgPSBlcnJvci5jcmVkZW50aWFsO1xyXG4gICAgICAgICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4kKFwiLm5hdl9faXRlbVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBpZighJCh0aGlzKS5oYXNDbGFzcygnbmF2X19pdGVtLS1oYXNEcmF3ZXInKSl7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpLmF0dHIoXCJpZFwiKS5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgICAgICQoXCIubmF2PipcIikucmVtb3ZlQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5wYWdlcy5cIiArIGl0ZW0pLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgICAgIGlmKCFpbml0aWFsaXplZFtpdGVtXSl7XHJcbiAgICAgICAgICAgIE5hdl9mdW5jdGlvbltpdGVtXSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4kKFwiLm5hdl9fZHJhd2VyX19pdGVtXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaXRlbSA9ICQodGhpcykuYXR0cihcImlkXCIpLnNwbGl0KFwiX1wiKVsxXTtcclxuXHJcbiAgICAkKFwiLm5hdj4qXCIpLnJlbW92ZUNsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYWRkQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG5cclxuICAgICQoXCIubmF2X19kcmF3ZXJfX2l0ZW1cIikucmVtb3ZlQ2xhc3MoXCJuYXZfX2RyYXdlcl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwibmF2X19kcmF3ZXJfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG5cclxuICAgICQoXCIucGFnZXNcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIucGFnZXMuXCIgKyBpdGVtKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgIGlmICghaW5pdGlhbGl6ZWRbaXRlbV0pIHtcclxuICAgICAgICBOYXZfZnVuY3Rpb25baXRlbV0oKTtcclxuICAgIH1cclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ2YXIgQXR0ZW5kID0ge1xyXG4gICAgbW9iaWxlOiBmYWxzZSxcclxuXHJcbiAgICBpZDogXCJcIixcclxuXHJcbiAgICB2aWV3SUQ6IFwiXCIsXHJcbiAgICAvL+q0gOumrOyekOqwgCDri6Trpbgg7IKs656M7J2YIElEIO2ZleyduOykkVxyXG5cclxuICAgIGF0dGVuZE9iajoge30sXHJcblxyXG4gICAgc2FsYXJ5OiB7fSxcclxuXHJcblxyXG4gICAgd2Vla2RheXM6IFtcIuydvFwiLCBcIuyblFwiLCBcIu2ZlFwiLCBcIuyImFwiLCBcIuuqqVwiLCBcIuq4iFwiLCBcIu2GoFwiLCBcIuydvFwiXSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbih1X2kpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB2YXIgZ3JhZGUgPSB1X2kuZ3JhZGU7XHJcbiAgICAgICAgdmFyIGlkID0gdV9pLmlkO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcblxyXG4gICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICB0eHQrPSc8c2VsZWN0IGNsYXNzPVwid29ya2VyX3NlbGVjdG9yXCI+PC9zZWxlY3Q+JztcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX190b3BcIj4nO1xyXG4gICAgICAgIHR4dCArPSAgICc8ZGl2IGlkPVwiY2FsZW5kYXJcIiBjbGFzcz1cImF0dGVuZF9fY2FsZW5kYXJcIj48L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSAgICc8ZGl2IGNsYXNzPVwiYXR0ZW5kX193ZWVrXCI+PC9kaXY+JztcclxuICAgICAgICB0eHQgKz0nPC9kaXY+JztcclxuICAgICAgICB0eHQgKz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhcIj48L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLmF0dGVuZFwiKS5odG1sKHR4dCkucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhY2NvdW50L3NhbGFyeVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdGhhdC5zYWxhcnkgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICBpZihncmFkZSA9PT0gNSl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmdWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJzID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHh0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbWFpbElEIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVzZXJzW21haWxJRF0uZ3JhZGUqMTw1KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPG9wdGlvbiB2YWx1ZT1cIicgKyBtYWlsSUQgKyAnXCI+JyArIHVzZXJzW21haWxJRF0ubmFtZSArICc8L29wdGlvbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIud29ya2VyX3NlbGVjdG9yXCIpLmh0bWwodHh0KS52YWwoaWQpLnByb3AoXCJzZWxlY3RlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5sb2FkaW5nVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ZW5kT2JqID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoISQoXCIuZmMtaGVhZGVyLXRvb2xiYXJcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTY0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheUNsaWNrOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0V29ya0hvdXIoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLm9uKFwiY2xpY2tcIiwgXCIuY29uZmlybVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZighJChcIi5hdHRlbmRcIikuaGFzQ2xhc3MoJ2Rpc3BsYXlOb25lJykpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRXb3JrSG91cigkKHRoaXMpLmF0dHIoXCJkaWRcIikpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLm1vZGFsXCIpLm9uKFwiY2xpY2tcIiwgXCIuY2xvc2VcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKCEkKFwiLmF0dGVuZFwiKS5oYXNDbGFzcygnZGlzcGxheU5vbmUnKSkge1xyXG4gICAgICAgICAgICAgICAgJChcIi5ibGFja1NjcmVlblwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiYm9keVwiKS5rZXl1cChmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgaWYgKCEkKFwiLmF0dGVuZFwiKS5oYXNDbGFzcygnZGlzcGxheU5vbmUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIubW9kYWwgLmNvbmZpcm1cIikubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBlLndoaWNoOyAvLyByZWNvbW1lbmRlZCB0byB1c2UgZS53aGljaCwgaXQncyBub3JtYWxpemVkIGFjcm9zcyBicm93c2Vyc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRXb3JrSG91cigkKFwiLm1vZGFsIC5jb25maXJtXCIpLmF0dHIoXCJkaWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIud29ya2VyX3NlbGVjdG9yXCIpLmNoYW5nZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X3dvcmtlcihpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHZpZXdfd29ya2VyOiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZihpZCA9PT0gdGhhdC5pZCl7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19jYWxlbmRhclwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fbW9udGhcIikuaHRtbChcIlwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX2NhbGVuZGFyXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgIGlmKHRoYXQudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoYXQudmlld0lEKS5vZmYoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIraWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmF0dGVuZE9iaiA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeW8gPSB0aGF0LnZpZXdJRDtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlld0lEID0gaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoeW8ubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhhdC5pZCAhPT0gdGhhdC52aWV3SUQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheUNsaWNrOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRXb3JrSG91cihkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX2NhbGVuZGFyOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAkKFwiLmF0dGVuZFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuZmMtZGF5XCIpLmh0bWwoXCJcIik7XHJcblxyXG4gICAgICAgIGlmKGRhdGEuYXR0ZW5kKXtcclxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuYXR0ZW5kO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkYXRlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlSUQgPSBkYXRlLnNsaWNlKDAsNCkrXCItXCIrZGF0ZS5zbGljZSg0LDYpK1wiLVwiK2RhdGUuc2xpY2UoNiw4KTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHR4dCA9ICc8cD4nK2RhdGFbZGF0ZV1bMF0uZnJvbStcIn5cIitkYXRhW2RhdGVdWzBdLnRvKyc8L3A+JztcclxuICAgICAgICAgICAgICAgIC8v65GQ7YOA7J6EIOuCmOuIoOyEnCDqt7zrrLTtlojslrTrj4Qg64us66Cl7JeQIO2RnOyLnOuQmOuKlCDqsoPsnYAg7LKr7YOA7J6EIOq3vOustOyLnOqwhOunjFxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZiArPSBkYXRhW2RhdGVdW2ldLmRpZjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8cD4nICsgTWF0aC5mbG9vcihkaWYvNjApICsgXCLsi5zqsIQgXCIrIGRpZiU2MCArXCLrtoRcIisnPC9wPic7XHJcbiAgICAgICAgICAgICAgICAkKCcuYXR0ZW5kIC5mYy1kYXlbZGF0YS1kYXRlPVwiJytkYXRlSUQrJ1wiXScpLmh0bWwodHh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZHVyTW9uID0gMDtcclxuICAgICAgICAgICAgbGV0IHRoaXNNb250aCA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuYXR0ZW5kIC5mYy1kYXlcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlRG9tID0gJChcIi5hdHRlbmQgLmZjLWRheVwiKS5lcShpKTtcclxuICAgICAgICAgICAgICAgIGlmKCFkYXRlRG9tLmhhc0NsYXNzKFwiZmMtb3RoZXItbW9udGhcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gZGF0ZURvbS5hdHRyKFwiZGF0YS1kYXRlXCIpLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzTW9udGggPSBkYXRlWzBdK2RhdGVbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGVbMF0rZGF0ZVsxXStkYXRlWzJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2RhdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkYXRhW2RhdGVdLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJNb24gKz0gZGF0YVtkYXRlXVtqXS5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmKCQoXCIuYXR0ZW5kIC5mYy12aWV3LWNvbnRhaW5lclwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHsgICAvL+ustOyhsOqxtCA27KO8XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWtEb20gPSAkKFwiLmF0dGVuZCAuZmMtd2Vla1wiKS5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla0R1ciA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXlEb20gPSB3ZWVrRG9tLmZpbmQoXCIuZmMtZGF5XCIpLmVxKGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGRheURvbS5hdHRyKFwiZGF0YS1kYXRlXCIpLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGVbMF0rZGF0ZVsxXStkYXRlWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2RhdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlZWtEdXIgKz0gZGF0YVtkYXRlXVtrXS5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2Vla0R1cj4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj4nKyBNYXRoLmZsb29yKHdlZWtEdXIvNjApKyfsi5zqsIQgJyt3ZWVrRHVyJTYwKyfrtoQnICsnPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiYXR0ZW5kX193ZWVrX19ob3VyXCI+PC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQoXCIuYXR0ZW5kX193ZWVrXCIpLmh0bWwodHh0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoXCIuYXR0ZW5kIC5mYy1sZWZ0XCIpLmNoaWxkcmVuKFwiaDIuZHVyTW9udGhcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICQoXCIuYXR0ZW5kIGgyLmR1ck1vbnRoXCIpLmh0bWwoJyAoJytNYXRoLmZsb29yKGR1ck1vbi82MCkrJ+yLnOqwhCAnK2R1ck1vbiU2MCsn67aEKScpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuYXR0ZW5kIC5mYy1sZWZ0XCIpLmFwcGVuZCgnPGgyIGNsYXNzPVwiZHVyTW9udGhcIj4gKCcrTWF0aC5mbG9vcihkdXJNb24vNjApKyfsi5zqsIQgJytkdXJNb24lNjArJ+u2hCk8L2gyPicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQgPSAnJzsgICAvL3ZhciDrubzrqLnsnYDqsbAg7JWE64uYLiDsnITsl5DshJwg7ISg7Ja4IO2WiOydjCFcclxuXHJcbiAgICAgICAgICAgIGxldCBmdWxsTW9udGhCb251cyA9IDMwNDAwO1xyXG4gICAgICAgICAgICBsZXQgaW5zdXJhbmNlRmVlID0gMDtcclxuICAgICAgICAgICAgbGV0IGJhc2ljID0gTWF0aC5yb3VuZChkdXJNb24vNjAqNzYwMCk7XHJcbiAgICAgICAgICAgIGxldCBmdWxsV2Vla0J1bnVzID0gTWF0aC5yb3VuZCgoZHVyTW9uLzYwKjc2MDApKjAuMik7XHJcblxyXG4gICAgICAgICAgICAvLyBpZih0aGlzLmlkID09PSB0aGlzLnZpZXdJRCl7XHJcbiAgICAgICAgICAgIC8vICAgICAvL+uzuOyduCDrqqjrk5xcclxuICAgICAgICAgICAgLy8gICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnkvXCIrdGhpc01vbnRoK1wiL1wiK3RoaXMuaWQpLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYmFzaWM6IGJhc2ljLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxXZWVrQnVudXM6IGZ1bGxXZWVrQnVudXMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbE1vbnRoQm9udXM6IGZ1bGxNb250aEJvbnVzXHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImFjY291bnQvc2FsYXJ5L1wiK3RoaXNNb250aCtcIi9cIit0aGlzLnZpZXdJRCkudXBkYXRlKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBiYXNpYzogYmFzaWMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbFdlZWtCdW51czogZnVsbFdlZWtCdW51cyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsTW9udGhCb251czogZnVsbE1vbnRoQm9udXNcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7quLDrs7jquIk8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGJhc2ljKSsgXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq3vOustOyLnOqwhCBYIDcsNjAw7JuQPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7so7ztnLTsiJjri7k8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGZ1bGxXZWVrQnVudXMpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6riw67O46riJ7J2YIDIwJTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7Jew7LCo7IiY64u5PC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShmdWxsTW9udGhCb251cykgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj417Iuc6rCEIOyDgeuLuSDquLDrs7jquIk8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lIGF0dGVuZF9fbW9udGhfX2xpbmUtLXJlZFwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7sgqztmozrs7Ttl5jro4w8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGluc3VyYW5jZUZlZSkgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7qta3rr7zsl7DquIgv6rOg7Jqp67O07ZeYL+qxtOqwleuztO2XmCDssq3qtazslaE8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lIGF0dGVuZF9fbW9udGhfX2xpbmUtLXN1bVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7tlanqs4Q8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGJhc2ljICsgZnVsbFdlZWtCdW51cyArIGZ1bGxNb250aEJvbnVzIC0gaW5zdXJhbmNlRmVlKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq4sOuzuOq4iSArIOyjvO2ctOyImOuLuSArIOyXsOywqOyImOuLuSAtIOyCrO2ajOuztO2XmOujjDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX21vbnRoXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0V29ya0hvdXI6IGZ1bmN0aW9uKGRhdGVPYmope1xyXG4gICAgICAgIC8vIGNzczogbW9kdWxlcy9hdHRlbmQuY3NzXHJcbiAgICAgICAgbGV0IGRhdGVTaG9ydCA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoXCJNTS9ERFwiKTtcclxuICAgICAgICBsZXQgZGF0ZUlEID0gbW9tZW50KGRhdGVPYmopLmZvcm1hdChcIllZWVlNTUREXCIpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgIGlmKHRoaXMuYXR0ZW5kT2JqLmF0dGVuZFtkYXRlSURdKXtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuYXR0ZW5kT2JqLmF0dGVuZFtkYXRlSURdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYmxhY2tTY3JlZW5cIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJpbnB1dFdpbmRvd1wiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxwIGNsYXNzPVwidGl0bGVcIj4nK2RhdGVTaG9ydCsnIOq3vOustOyLnOqwhDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPic7XHJcbiAgICAgICAgaWYoZGF0YVswXSl7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJmaXJzdF9mcm9tXCIgdmFsdWU9XCInK2RhdGFbMF0uZnJvbSsnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cImZpcnN0X3RvXCIgdmFsdWU9XCInK2RhdGFbMF0udG8rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwiZmlyc3RfZnJvbVwiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJmaXJzdF90b1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj4nO1xyXG4gICAgICAgIGlmKGRhdGFbMV0pe1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwic2Vjb25kX2Zyb21cIiB2YWx1ZT1cIicrZGF0YVsxXS5mcm9tKydcIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwic2Vjb25kX3RvXCIgdmFsdWU9XCInK2RhdGFbMV0udG8rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwic2Vjb25kX2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwic2Vjb25kX3RvXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9ICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwiYm90dG9tXCI+JztcclxuICAgICAgICB0eHQrPSAgICAgICAgICAgJzxwIGNsYXNzPVwiY29uZmlybVwiIGRpZD1cIicrZGF0ZUlEKydcIj7tmZXsnbg8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICAgICAgJzxwIGNsYXNzPVwiY2xvc2VcIj7st6jshow8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSAgICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIubW9kYWxcIikuaHRtbCh0eHQpO1xyXG5cclxuICAgICAgICBpZih0aGlzLm1vYmlsZSl7XHJcbiAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikuQW55UGlja2VyKHtcclxuICAgICAgICAgICAgICAgIGRhdGVUaW1lRm9ybWF0OlwiSEg6bW1cIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjZmlyc3RfZnJvbVwiKS5mb2N1cygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRXb3JrSG91cjogZnVuY3Rpb24oZGF0ZSl7XHJcblxyXG4gICAgICAgIGxldCB3b3JrID0gW107XHJcblxyXG4gICAgICAgIGxldCBhbGxFbXB0eSA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKCQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikuZXEoaSkudmFsKCkubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgYWxsRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWxsRW1wdHkpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLnZpZXdJRCtcIi9hdHRlbmQvXCIrZGF0ZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCtcIi9hdHRlbmQvXCIrZGF0ZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoXCIubW9kYWxcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgbGV0IGRhdGVJRCA9IGRhdGUuc2xpY2UoMCw0KSArIFwiLVwiK2RhdGUuc2xpY2UoNCw2KSArIFwiLVwiK2RhdGUuc2xpY2UoNiw4KTtcclxuICAgICAgICAgICAgJCgnLmZjLWRheVtkYXRhLWRhdGU9XCInK2RhdGVJRCsnXCJdJykuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmKCQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG4gICAgICAgICAgICAvL+yLnOyekeyLnOqwhOydtCDsnpgg7J6F66Cl65CY7JeI64KYIO2ZleyduFxyXG5cclxuICAgICAgICAgICAgaWYoZGF0ZTxtb21lbnQoKS5mb3JtYXQoXCJZWVlZTU1ERFwiKSl7XHJcbiAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgIGlmKCQoXCIjZmlyc3RfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLsmIjsg4Eg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZyb20gPSAkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk7XHJcbiAgICAgICAgICAgIGxldCB0byA9ICQoXCIjZmlyc3RfdG9cIikudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZnJvbUEgPSBmcm9tLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSk7XHJcblxyXG5cclxuICAgICAgICAgICAgd29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZyb206IGZyb20sXHJcbiAgICAgICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgICAgICBkaWY6IGRpZlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi6re866y07Iuc6rCE7J20IOyemOuquyDsnoXroKXrkJjsl4jsirXri4jri6QuIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBpZigkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGU8bW9tZW50KCkuZm9ybWF0KFwiWVlZWU1NRERcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7Jik64qYIOydtOyghCDsnbzsnZgg64Kg7Kec66W8IOuLpOujqOqzoCDsnojsnYQg6rK97JqwIC0g6re866y0IOyiheujjOyLnOqwhOydtCDsnoXroKXrkJjsp4Ag7JWK7Jy866m0IOyViCDrkKhcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI3NlY29uZF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/snbTsoITsnbzsnbQg7JWE64uI642U652864+EIOyYiOyDgSDqt7zrrLTsi5zqsITsnbTrnbzrj4Qg7J6F66Cl7ZW07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg7JiI7IOBIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb20gPSAkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvID0gJChcIiNzZWNvbmRfdG9cIikudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb21BID0gZnJvbS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9BID0gdG8uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLTsi5zqsITsnbQg7J6Y66q7IOyeheugpeuQmOyXiOyKteuLiOuLpC4gSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMudmlld0lEK1wiL2F0dGVuZC9cIitkYXRlKS5zZXQod29yayk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQrXCIvYXR0ZW5kL1wiK2RhdGUpLnNldCh3b3JrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIubW9kYWxcIikuaHRtbChcIlwiKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF0dGVuZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvYXR0ZW5kLmpzIiwibGV0IENpdHkgPSB7XHJcbiAgICBkYXRhOiB7fSxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuY2l0eVwiKS5vbihcImNsaWNrXCIsIFwiLnJlZnJlc2hcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKGNvbmZpcm0oXCLrjbDsnbTthLDrpbwg66eO7J20IOyeoeyVhOuoueyKteuLiOuLpCEg7KCV66eQIOy1nOyLoO2ZlO2VmOyLnOqyoOyKteuLiOq5jD9cIikpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaFN0YXR1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgdHh0Kz0gJzxkaXYgY2xhc3M9XCJoZWFkZXJcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxoMj7rj4Tsi5wg642w7J207YSwIO2ZleuztO2YhO2ZqTwvaDI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInJlZnJlc2hcIj7stZzsi6DtmZQ8L3A+JztcclxuICAgICAgICB0eHQrPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgdHh0Kz0gJzxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+JztcclxuXHJcbiAgICAgICAgdHh0Kz0gJzxkaXYgY2xhc3M9XCJsaW5lIHRvcFwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJuYW1lXCI+64+E7Iuc66qFPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X19ob3RlbHNcIj7siJnshow8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+6rSA6rSR7KeAIOygleumrDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0XCI+6rWQ7Ya1PC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X19hcmVhXCI+7KeA7JetPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X19wcmljZVwiPuusvOqwgDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAodmFyIGNvZGUgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgY2l0eSA9IGRhdGFbY29kZV07XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSBjaXR5LnN0YXR1cztcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImxpbmVcIiBpZD1cIicgKyBjaXR5LmNvZGUgKyAnXCI+PHAgY2xhc3M9XCJuYW1lXCI+JyArIGNpdHkubmFtZSArICc8L3A+JztcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMuaG90ZWwgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19ob3RlbHMgd2VpZ2h0LS1ib2xkXCI+7Y+J6rCAIOyZhOujjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5ob3RlbCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2hvdGVsc1wiPuuNsOydtO2EsCDsnojsnYw8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19ob3RlbHMgY29sb3ItLXJlZFwiPuuNsOydtO2EsCDsl4bsnYw8L3A+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5zcG90ID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHMgd2VpZ2h0LS1ib2xkXCI+7KCV67O06rKA7KadIOyZhOujjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5zcG90ID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHNcIj4y7LCo6rKA7KadPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnNwb3QgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90c1wiPu2Vqey5mOq4sDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5zcG90ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHNcIj7soJXrs7Qg6rKA7Kad7KSRPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHMgY29sb3ItLXJlZFwiPuygleuztCDsl4bsnYw8L3A+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy50cmFuc3BvcnQgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X190cmFuc3BvcnQgd2VpZ2h0LS1ib2xkXCI+64yA7KSR6rWQ7Ya1IOyZhOujjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy50cmFuc3BvcnQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X190cmFuc3BvcnRcIj7rjbDsnbTthLAg7J6I7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0IGNvbG9yLS1yZWRcIj7rjbDsnbTthLAg7JeG7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2FyZWFcIj5PPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fYXJlYSBjb2xvci0tcmVkXCI+WDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLnByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fcHJpY2VcIj5PPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fcHJpY2UgY29sb3ItLXJlZFwiPlg8L3A+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7IC8vY2xvc2Ugd3JhcHBlclxyXG5cclxuICAgICAgICAkKFwiLmNpdHlcIikuaHRtbCh0eHQpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZShkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVmcmVzaFN0YXR1czogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMnKS5vbmNlKFwidmFsdWVcIiwgc25hcD0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGNpZCBpbiB0aGF0LmRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdHVzID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY2l0eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbDogMCwgLy8wOuuNsOydtO2EsOyXhuydjCwgMTrsiJnshozrjbDsnbTthLDrp4wg7J6I7J2MLCAyOu2PieqwgOuNsOydtO2EsCjsm4zrlKkpIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcG90OiB0aGF0LmRhdGFbY2lkXS5zdGF0dXMuc3BvdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OiAwLCAvL+uNsOydtO2EsOyXhuydjCwgMTrrqZTtirjroZzrjbDsnbTthLDrp4wg7J6I7J2MLCAyOuqwgOqzteuNsOydtO2EsCjrnbzsnbjrs4QuLuuTsSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNpdHkuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuYXJlYSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihjaXR5LmhvdGVscyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBob3RlbCA9IGNpdHkuaG90ZWxzW09iamVjdC5rZXlzKGNpdHkuaG90ZWxzKVswXV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5ob3RlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmhvdGVsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuYXJlYSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGhvdGVsLmFyZWEgPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmFyZWEgPSAyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdHkuc3RhdHVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5LnN0YXR1cy5hcmVhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuc3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNpdHkuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5zdGF0dXMuYXJlYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5LnN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvc3RhdHVzJykudXBkYXRlKGNpdHkuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNpdHkubWV0cm8pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaXR5Lm1ldHJvTGluZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMudHJhbnNwb3J0ID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMudHJhbnNwb3J0ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5wcmljZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5wcmljZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbDogMCwgLy8wOuuNsOydtO2EsOyXhuydjCwgMTrsiJnshozrjbDsnbTthLDrp4wg7J6I7J2MLCAyOu2PieqwgOuNsOydtO2EsCjsm4zrlKkpIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcG90OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IDAsIC8v642w7J207YSw7JeG7J2MLCAxOuuplO2KuOuhnOuNsOydtO2EsOunjCDsnojsnYwsIDI66rCA6rO1642w7J207YSwKOudvOyduOuzhC4u65OxKSDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDBcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVtjaWRdLnN0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignc2V0dGluZy9jaXRpZXMnKS5zZXQodGhhdC5kYXRhKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZSh0aGF0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoJ+y1nOyLoO2ZlCDsmYTro4wnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaXR5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9jaXR5LmpzIiwiaW1wb3J0IEZpcnN0X2NoZWNrIGZyb20gXCIuL3Nwb3QvZmlyc3RfY2hlY2suanNcIjtcclxuaW1wb3J0IFNlY29uZF9jb21iaW5lIGZyb20gXCIuL3Nwb3Qvc2VvbmRfY29tYmluZS5qc1wiO1xyXG5pbXBvcnQgVGhpcmRfZmluYWxpemUgZnJvbSBcIi4vc3BvdC90aGlyZF9maW5hbGl6ZS5qc1wiO1xyXG5cclxudmFyIFNwb3QgPSB7XHJcbiAgICBjaXRpZXM6IHt9LFxyXG4gICAgb3JkZXI6XCJcIixcclxuICAgIGRhdGE6IHt9LFxyXG4gICAgY3VycmVudDpcIlwiLCAvL+2YhOyerCDrs7Tqs6DsnojripQg64+E7IucIGNpZCAtIGZpcmViYXNlIHJlZuyXkCBvZmYg64us6riw7JyE7ZW0XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKHVfaSl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIEZpcnN0X2NoZWNrLmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcmRlciA9IHVfaS5zZXR0aW5nLm9yZGVyO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignc2V0dGluZy9jaXRpZXMnKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY2l0aWVzID0gZGF0YTtcclxuICAgICAgICAgICAgdGhhdC5vcmRlciA9IHVfaS5zZXR0aW5nLm9yZGVyO1xyXG4gICAgICAgICAgICB0aGF0LmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfc3RhdHVzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLmFjdGl2ZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSB0aGF0LmNpdGllc1tjaWRdLnN0YXR1cy5zcG90O1xyXG5cclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NpdHkoY2lkLCBzdGF0dXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5vcmRlclwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQub3JkZXIgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICAgICAgdmFyIHVpZCA9IHVfaS5tYWlsO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigndXNlcnMvJyArIHVpZCArIFwiL3NldHRpbmcvb3JkZXJcIikuc2V0KHRoYXQub3JkZXIpO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfc3RhdHVzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLnJldHVyblwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9zdGF0dXMoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8y7LCo6rKA7KadXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIucmVtb3ZlX3Nwb3RcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgVGhpcmRfZmluYWxpemUucmVtb3ZlX3Nwb3QoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLnJlZG9fcmVtb3ZlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIFRoaXJkX2ZpbmFsaXplLnJlZG9fcmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX3N0YXR1czogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcclxuXHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICc8aDI+6rSA6rSR7KeAIOuNsOydtO2EsCDsoJXrpqwg7ZiE7ZmpPC9oMj4nO1xyXG4gICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJvcmRlclwiIGlkPVwiYWJjXCI+6rCA64KY64uk7IicPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cIm9yZGVyXCIgaWQ9XCJjaGFuZ2VkXCI+7IiY7KCV7Iuc6rCE7IicPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cIndyYXBwZXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImxpbmVyIGxpbmVyLS1oZWFkZXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJsaW5lcl9fY2l0eU5hbWVcIj7rj4Tsi5zrqoU8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPuyDge2DnDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJsaW5lcl9fY2hhcmdlXCI+64u064u57J6QPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICB2YXIgb3JkZXJBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBjaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgY2l0eSA9IGRhdGFbY2lkXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyID09PSBcImFiY1wiKSB7XHJcbiAgICAgICAgICAgICAgICBvcmRlckFycmF5LnB1c2goeyBjaWQ6IGNpZCwgaWR4OiBjaXR5Lm5hbWUgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gXCJjaGFuZ2VkXCIpIHtcclxuICAgICAgICAgICAgICAgIG9yZGVyQXJyYXkucHVzaCh7IGNpZDogY2lkLCBpZHg6IGNpdHkub3JkZXIuY2hhbmdlZCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3JkZXJBcnJheS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmlkeCA+IGIuaWR4ID8gMSA6IGEuaWR4IDwgYi5pZHggPyAtMSA6IDA7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBzdGF0dXNBcnJheSA9IFtcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3Bhbj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuPuyZhOujjDwvc3Bhbj48L3A+JyxcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3Bhbj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+7JmE66OMPC9zcGFuPjwvcD4nXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmRlckFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaWQgPSBvcmRlckFycmF5W2ldLmNpZDtcclxuICAgICAgICAgICAgbGV0IGNpdHkgPSBkYXRhW2NpZF07XHJcblxyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJsaW5lclwiIGlkPVwiJyArIGNpZCArICdcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NpdHlOYW1lXCI+JyArIGNpdHkubmFtZSArICc8L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9IHN0YXR1c0FycmF5W2NpdHkuc3RhdHVzLnNwb3RdO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NoYXJnZVwiPuuLtOuLueyekDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JzsvL3dyYXBwZXIg64ur6riwXHJcblxyXG4gICAgICAgICQoXCIucGFnZXMuc3BvdFwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgJChcIiNcIiArIHRoaXMub3JkZXIpLmFkZENsYXNzKFwib3JkZXItLXNlbGVjdGVkXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX2NpdHk6IGZ1bmN0aW9uIChjaWQsIHN0YXR1cyl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyB0aGF0LmN1cnJlbnQpLm9mZihcInZhbHVlXCIpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyBjaWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQuY3VycmVudCA9IGNpZDtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaXR5TmFtZSA9IHRoYXQuY2l0aWVzW2NpZF0ubmFtZTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDEpIHsgICAvL+2YhOyerCDsoJXrs7TsiJjsp5Hsg4Htg5wg6rKA7KadXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuaHRtbCgnPGgyPicgKyBjaXR5TmFtZSArICcg7KCV67O06rKA7KadPC9oMj4nKS5hdHRyKCdjaWQnLCBjaWQpLmF0dHIoJ2NpdHlOYW1lJyxjaXR5TmFtZSkuYWRkQ2xhc3MoXCJjaXR5TmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBGaXJzdF9jaGVjay5pbmZsYXRlKGRhdGEuc3BvdHMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IDIpIHsgLy/tlansuZjquLDsnpHsl4VcclxuICAgICAgICAgICAgICAgICAgICBTZWNvbmRfY29tYmluZS5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAgLy8y7LCo6rKA7Kad7ZmU66m06rO8IOyZhOujjO2ZlOuptOydgCDrlLDroZwg7LCo7J206rCAIOyXhuydjFxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuaGVhZGVyXCIpLmh0bWwoJzxoMj4nICsgY2l0eU5hbWUgKyAnIDLssKjqsoDspp08L2gyPicpLmF0dHIoJ2NpZCcsIGNpZCkuYXR0cignY2l0eU5hbWUnLGNpdHlOYW1lKS5hZGRDbGFzcyhcImNpdHlOYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoaXJkX2ZpbmFsaXplLmluZmxhdGUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoJ+yVhOustOufsCDrjbDsnbTthLDqsIAg7JeG7Iq164uI64ukLiDrjbDsnbTthLAg7IiY7KeR7J2EIOuovOyggCDsp4TtlontlbTso7zshLjsmpQuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5uYXZfX2l0ZW1cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCduYXZfX2l0ZW0tLWhhc0RyYXdlcicpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyB0aGF0LmN1cnJlbnQpLm9mZihcInZhbHVlXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLm5hdl9fZHJhd2VyX19pdGVtIFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmF0dHIoJ2lkJykgPT09ICduYXZfc3BvdCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyB0aGF0LmN1cnJlbnQpLm9mZihcInZhbHVlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3BvdDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90LmpzIiwiaW1wb3J0IEF1dG9Db21iaW5lIGZyb20gJy4vYXV0b0NvbWJpbmUuanMnO1xyXG5cclxudmFyIEZpcnN0X0NoZWNrID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19yZW1haW5MYXJnZURhdGFcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LnNldFJlbWFpbk51bWJlcigkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fcmVtYWluTnVtYmVyXCIpLnZhbCgpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX25vZGF0YVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWQgPSAkKHRoaXMpLmF0dHIoJ3NpZCcpO1xyXG4gICAgICAgICAgICB0aGF0LnNpdGVOb2RhdGEoc2lkKTtcclxuICAgICAgICAgICAgdG9hc3QoJ+uNsOydtO2EsCDqs7XrsLEg7LKY66asJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v7KKM7ZGcIOyXhuuKlCDqtIDqtJHsp4DsnZgg7KKM7ZGc66W8IOyeheugpe2VqFxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19zcG90RGVsZXRlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5kZWxldGVTcG90KCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19zcG90TmFtZVwiKS5odG1sKCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+yijO2RnCDsl4bripQg6rSA6rSR7KeA7J2YIOyijO2RnOulvCDsnoXroKXtlahcclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fY29uZmlybVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuaW5wdXRDb29yZGluYXRlKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19zcG90Q29vclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNpdGVOb2RhdGE6IGZ1bmN0aW9uIChzaWQpIHtcclxuICAgICAgICB2YXIgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpcm0oXCLrjbDsnbTthLDrpbwg7KCV66eQIOyXhuyVseuLiOq5jCE/XCIpKXtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaWQgKyBcIi9ub2RhdGFcIikuc2V0KHRydWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRSZW1haW5OdW1iZXI6IGZ1bmN0aW9uIChzaXRlLCBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgY3V0Tm8gPSBudW1iZXIudHJpbSgpICogMTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpO1xyXG5cclxuICAgICAgICBpZiAoY3V0Tm8gPCAxMDApIHtcclxuICAgICAgICAgICAgdG9hc3QoXCIxMDDqsJwg7J207IOB7J2YIOyepeyGjOulvCDsnKDsp4DtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpcm0oXCLsiJzsnIQgXCIgKyBjdXRObyArIFwi7JyEIOuvuOunjCDsnqXshozrpbwg66qo65GQIOygnOqxsO2VqeuLiOuLpC4g66ee7Iq164uI6rmMP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1dE9iaiA9IHRoaXMuZGF0YS5zcG90c1tzaXRlXTtcclxuICAgICAgICAgICAgICAgIGN1dE9iai5sZW5ndGggPSBjdXRObztcclxuXHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUpLnNldChjdXRPYmopO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVTcG90OiBmdW5jdGlvbiAoc2lkLCBuYW1lKSB7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGUgPSBzaWQuc3BsaXQoXCJfXCIpWzBdO1xyXG4gICAgICAgIGxldCBubyA9IHNpZC5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKG5hbWUgKyBcIiDsnqXshozrpbwg7KCc6rGw7ZWp64uI64ukLiDqs4Tsho3tlaDquYzsmpQ/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUgKyBcIi9cIiArIG5vKS5zZXQoeyBkZWxldGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgJChcIiNcIiArIHNpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyepeyGjOqwgCDsoJzqsbDrkJjsl4jsirXri4jri6QuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKG5vICsgXCLrsogg7J6l7IaM66W8IOygnOqxsO2VqeuLiOuLpC4g6rOE7IaN7ZWg6rmM7JqUP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubykuc2V0KHsgZGVsZXRlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsnqXshozqsIAg7KCc6rGw65CY7JeI7Iq164uI64ukLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5wdXRDb29yZGluYXRlOiBmdW5jdGlvbiAoc2lkLCBjb29yVHh0KSB7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGUgPSBzaWQuc3BsaXQoXCJfXCIpWzBdO1xyXG4gICAgICAgIGxldCBubyA9IHNpZC5zcGxpdChcIl9cIilbMV07XHJcbiAgICAgICAgbGV0IGNvb3IgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGNvb3JUeHQuc3BsaXQoXCIsXCIpLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBsZXQgbGF0ID0gY29vclR4dC5zcGxpdChcIixcIilbMF0udHJpbSgpICogMTtcclxuICAgICAgICAgICAgbGV0IGxuZyA9IGNvb3JUeHQuc3BsaXQoXCIsXCIpWzFdLnRyaW0oKSAqIDE7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNOYU4obGF0KSB8fCBpc05hTihsbmcpKSB7XHJcbiAgICAgICAgICAgICAgICAvL+yijO2RnCDspJEg7ZWY64KY6rCAXHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyijO2RnOqwgCDrtoDsoJXtmZXtlZjqsowg7J6F66Cl65CY7JeI7Iq164uI64ukXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29vciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6IGxhdCxcclxuICAgICAgICAgICAgICAgICAgICBsbmc6IGxuZ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubyArIFwiL2Nvb3JcIikuc2V0KGNvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg67aA7KCV7ZmV7ZWY6rKMIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICQoXCIuaGVhZGVyXCIpLmFwcGVuZCgnPHAgY2xhc3M9XCJyZXR1cm5cIj7rj4zslYTqsIDquLA8L3A+Jyk7XHJcblxyXG4gICAgICAgIGxldCBoYXNQcm9ibGVtID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG4gICAgICAgIGxldCBzZWFyY2hVcmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmtyL21hcHMvcGxhY2UvJyArICQoXCIuY2l0eU5hbWVcIikuYXR0cignY2l0eU5hbWUnKSArIFwiK1wiO1xyXG5cclxuICAgICAgICBsZXQgc2l0ZU9iaiA9IHtcclxuICAgICAgICAgICAgZ2c6IFwi6rWs6riAXCIsXHJcbiAgICAgICAgICAgIG52OiBcIuuEpOydtOuyhFwiLFxyXG4gICAgICAgICAgICB0YTogXCLtirjrpr3slrTrk5zrsJTsnbTsoIBcIixcclxuICAgICAgICAgICAgbHA6IFwi66Gg66as7ZSM656Y64ubXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBzaXRlIGluIHNpdGVPYmopIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzaXRlSGFzUHJvYmxlbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub0Nvb3JUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7sooztkZzqsIAg7J6F66Cl65CY7KeAIOyViuydgCDqtIDqtJHsp4DqsIAg7J6I7Iq164uI64ukPC9wPic7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vU3BvdFR4dCA9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZVwiPuu5hOyWtOyeiOuKlCDqtIDqtJHsp4DqsIAg7J6I7Iq164uI64ukPC9wPic7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YVtzaXRlXSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX190aXRsZVwiPicgKyBzaXRlT2JqW3NpdGVdICsgJyDrjbDsnbTthLAg7ZmV7J24PC9wPic7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGFbc2l0ZV0ubm9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcG90ID0gZGF0YVtzaXRlXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYXNDb29yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+ydvOu2gOufrCDsgq3soJztlZwg6rSA6rSR7KeAIC0+IOuEmOyWtOqwhOuLpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5jb29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmNvb3IubG5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oc3BvdC5jb29yLmxuZyAqIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5jb29yLmxhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHNwb3QuY29vci5sYXQgKiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzQ29vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJyArIHNpdGUgKyAnXycgKyBpICsgJ1wiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCArPSAnPGEgY2xhc3M9XCJjaGVja19fc3BvdE5hbWVcIiBocmVmPVwiJyArIHNlYXJjaFVybCArIHNwb3QubmFtZSArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgc3BvdC5uYW1lICsgJzwvYT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxpbnB1dCBjbGFzcz1cImNoZWNrX19zcG90Q29vclwiIHBsYWNlaG9sZGVyPVwieHgueHh4eHgsIHh4Lnh4eHh4IO2Yle2DnCDsnoXroKVcIj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2NvbmZpcm1cIj7sooztkZwg7J6F66ClPC9wPjxwIGNsYXNzPVwiY2hlY2tfX3Nwb3REZWxldGVcIj7snqXshowg7IKt7KCcPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90VHh0ICs9ICc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicgKyBzaXRlICsgJ18nICsgaSArICdcIj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90VHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX190eHRcIj4nICsgaSArICcg67KIIOq0gOq0keyngDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90VHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19zcG90RGVsZXRlXCI+7J6l7IaMIOyCreygnDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90VHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9Db29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSBub0Nvb3JUeHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub1Nwb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vU3BvdFR4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdLmxlbmd0aCA+IDE1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFyZ2VPSyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxhcmdlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGFyZ2VEYXRhW3NpdGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8xNTDqsJwg7J207IOB7J2YIOuNsOydtO2EsOulvCDrs7TsnKDtlZjroKTrqbQg64+E7Iuc66qFL3Nwb3RzL2xhcmdlRGF0YS/sgqzsnbTtirjrqoXsnbQgdHJ1ZeudvOqzoCDrtoDsl6zrkJjslrTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlT0sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXJnZU9LKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg7J6l7IaMIOuNsOydtO2EsOqwgCAxNTDqsJzrpbwg7LSI6rO8KCcgKyBkYXRhW3NpdGVdLmxlbmd0aCArICfqsJwp7ZWp64uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicgKyBzaXRlICsgJ1wiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxpbnB1dCBjbGFzcz1cImNoZWNrX19yZW1haW5OdW1iZXJcIiB2YWx1ZT1cIicgKyBkYXRhW3NpdGVdLmxlbmd0aCArICdcIj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19yZW1haW5MYXJnZURhdGFcIj7qsJzsnZgg7J6l7IaMIOycoOyngO2VmOq4sDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX190aXRsZVwiPicgKyBzaXRlT2JqW3NpdGVdICsgJyDrjbDsnbTthLDqsIAg7KG07J6s7ZWY7KeAIOyViuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGUgY2hlY2tfX25vZGF0YVwiIHNpZD1cIicgKyBzaXRlICsgJ1wiPuuNsOydtO2EsOqwgCDsm5Drnpgg7JeG7J2EIOqyveyasCDtgbTrpq3tlbTso7zshLjsmqU8L3A+JztcclxuICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2l0ZUhhc1Byb2JsZW0gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IOybkOuemCDsgqzsnbTtirgg642w7J207YSw6rCAIOyhtOyerO2VmOyngCDslYrripQg6rK97Jqw66W8IOuMgOu5hO2VnCDrsoTtirzsnYQg66eM65Ok6rOgIHNpdGUg6rCS7Jy866GcIG5vZGF0YTogdHJ1ZeulvCDrhKPslrTspIDri6QuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzaXRlSGFzUHJvYmxlbSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZVwiPuuwnOqyrOuQnCDrrLjsoJzqsIAg7JeG7Iq164uI64ukPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoYXNQcm9ibGVtKSB7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fZmluaXNoXCI+6rKA7IKs66W8IOuqqOuRkCDrp4jss6TsirXri4jri6Q8L3A+JztcclxuICAgICAgICAgICAgJChcIi5zcG90IC53cmFwcGVyXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKCdjaWQnKTtcclxuICAgICAgICAgICAgdG9hc3QoXCLrsJzqsqzrkJwg66y47KCc6rCAIOyXhuyWtCDrjbDsnbTthLAg67OR7ZWp7J2EIOyLpOyLnO2VqeuLiOuLpC5cIik7XHJcblxyXG4gICAgICAgICAgICBBdXRvQ29tYmluZS5pbml0KGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi53cmFwXCIpLnNjcm9sbFRvcCgwKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlyc3RfQ2hlY2s7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9maXJzdF9jaGVjay5qcyIsIi8vZmlyc3RfY2hlY2vsl5DshJzrp4wgaW1wb3J0ZWQg65CY6rOgIOyCrOyaqeuQqFxyXG5cclxudmFyIEF1dG9Db21iaW5lID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgbGV0IGNpZCA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgc2l0ZUFyciA9IFtcImdnXCIsIFwibHBcIiwgXCJudlwiLCBcInRhXCJdO1xyXG4gICAgICAgIGxldCBjb21iaW5pbmcgPSB7fTtcclxuICAgICAgICBsZXQgY291bnRlciA9IDA7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2l0ZUFyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgc2l0ZSA9IHNpdGVBcnJbal07XHJcbiAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVtzaXRlXS5ub0RhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbc2l0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV1baV0gJiYgIWRhdGFbc2l0ZV1baV0uZGVsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFNwb3QgPSBkYXRhW3NpdGVdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/quLDsobQg7KCV67O066W8IG9sZFNwb3TsnbTrnbzqs6Ag7ZWY7J6QLiDsg4jroZzsmrQg7Iqk7Yyf7KCV67O07JeQ64qUIOydtOumhOydhCDtlZwv7JiB7Jy866GcIOu2hO2VoO2VmOqzoCDrnq3tgrnsnYQg67aA7Jes7ZWgIOqyg+ydtOuLpC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtvOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbjogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcjogb2xkU3BvdC5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoL1vqsIAt7Z6jXS8udGVzdChvbGRTcG90Lm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC5uYW1lLmtvID0gb2xkU3BvdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm5hbWUuZW4gPSBvbGRTcG90Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90LnJhbmtbc2l0ZV0gPSBpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRTcG90LnVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudXJsID0gb2xkU3BvdC51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkU3BvdC50YWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90LnRhZyA9IG9sZFNwb3QudGFnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyIDwgMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzMDBcIiArIGNvdW50ZXJdID0gc3BvdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnRlciA8IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmluZ1tcInMwXCIgKyBjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmluZ1tcInNcIiArIGNvdW50ZXJdID0gc3BvdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXIrK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSAvL+2VnOuwlO2AtCDrj4zslZjri7lcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgY29tYmluZU9iaiA9IHt9XHJcbiAgICAgICAgbGV0IGNvbWJpbmVkID0ge31cclxuXHJcbiAgICAgICAgZm9yICh2YXIgY29kZSBpbiBjb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSBjb21iaW5pbmdbY29kZV07XHJcbiAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0gPSBzcG90XHJcbiAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0uY29tYmluZSA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgaGFzQ29tYmluZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy/tlansuaAg6rKD7J20IOyXhuycvOuptCDrsJTroZwgY29tYmluZWQg7Kq97Jy866GcIOuztOuCuOuLpC5cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHRDb2RlIGluIGNvbWJpbmluZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvZGUgPCB0Q29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0U3BvdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjb21iaW5pbmdbdENvZGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRTcG90W2tleV0gPSBjb21iaW5pbmdbdENvZGVdW2tleV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0U3BvdC5kZWxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBjYWxjdWxhdGVEaWYoc3BvdC5jb29yLCB0U3BvdC5jb29yKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZiA8IDI1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluZU9ialtjb2RlXS5jb21iaW5lW3RDb2RlXSA9IHRTcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29tYmluZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWhhc0NvbWJpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb21iaW5lZFtjb2RlXSA9IGNvbWJpbmVPYmpbY29kZV07XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29tYmluZU9ialtjb2RlXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2lkICsgXCIvc3BvdHNcIikuc2V0KHtcclxuICAgICAgICAgICAgY29tYmluaW5nOiBjb21iaW5lT2JqLFxyXG4gICAgICAgICAgICBjb21iaW5lZDogY29tYmluZWRcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignc2V0dGluZy9jaXRpZXMvJyArIGNpZCArICcvc3RhdHVzL3Nwb3QnKS5zZXQoMSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF1dG9Db21iaW5lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvYXV0b0NvbWJpbmUuanMiLCJ2YXIgU2Vjb25kX2NvbWJpbmUgPSB7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2Vjb25kX2NvbWJpbmU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9zZW9uZF9jb21iaW5lLmpzIiwiaW1wb3J0IENvbmZpZyBmcm9tIFwiLi9jb25maWcuanNcIjtcclxuXHJcbnZhciBUaGlyZF9maW5hbGl6ZSA9IHtcclxuICAgIHRlbXA6ZmFsc2UsXHJcbiAgICBzcG90T2JqOnt9LFxyXG5cclxuICAgIHJlbW92ZV9zcG90OiBmdW5jdGlvbihzaWQpe1xyXG4gICAgICAgIGxldCBjaWQgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IHNwb3ROYW1lID0gJChcIiNcIitzaWQpLmNoaWxkcmVuKFwiLnJlc3VsdF9uYW1lX2tvXCIpLnZhbCgpO1xyXG4gICAgICAgIGlmKGNvbmZpcm0oYCR7c3BvdE5hbWV9IOq0gOq0keyngOulvCDsoJzqsbDtlanri4jri6QuIO2ZleyLpO2VnOqwgOyalD9gKSl7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcCA9IHRoaXMuc3BvdE9ialtzaWRdO1xyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkK1wiL3Nwb3RzL2NvbWJpbmVkL1wiK3NpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi6rSA6rSR7KeA6rCAIOygnOqxsOuQmOyXiOyKteuLiOuLpC5cIik7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVkb19yZW1vdmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IGNpZCA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgc2lkID0gdGhpcy50ZW1wLnNpZDtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaWQrXCIvc3BvdHMvY29tYmluZWQvXCIrc2lkKS5zZXQodGhpcy50ZW1wKTtcclxuICAgICAgICAkKFwiLnJlZG9fcmVtb3ZlXCIpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnRlbXAgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICQoXCIuaGVhZGVyXCIpLmFwcGVuZCgnPHAgY2xhc3M9XCJyZXR1cm5cIj7rj4zslYTqsIDquLA8L3A+Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy50ZW1wKXtcclxuICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuYXBwZW5kKCc8cCBjbGFzcz1cInJlZG9fcmVtb3ZlXCI+66eI7KeA66eJIOygnOqxsCDst6jshow8L3A+Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3BvdE9iaiA9IGRhdGEuc3BvdHMuY29tYmluZWQ7XHJcbiAgICAgICAgdGhpcy5zcG90T2JqID0gc3BvdE9iajtcclxuICAgICAgICBjb25zb2xlLmxvZyhzcG90T2JqKTtcclxuICAgICAgICBsZXQgcmFua0FyciA9IFtdO1xyXG4gICAgICAgIGxldCBzcG90VG90YWwgPSBPYmplY3Qua2V5cyhzcG90T2JqKS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBzaWQgaW4gc3BvdE9iaikge1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IHNwb3RPYmpbc2lkXTtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmRpdmlkdWFsQXJyID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBzaXRlIGluIHNwb3QucmFuaykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhbmsgPSBzcG90LnJhbmtbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsQXJyLnB1c2gocmFuayk7XHJcbiAgICAgICAgICAgICAgICBzY29yZSAtPSByYW5rO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRpdmlkdWFsQXJyLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtaW5SYW5rID0gaW5kaXZpZHVhbEFyclswXTtcclxuICAgICAgICAgICAgc2NvcmUgKz0gKHNwb3RUb3RhbCArIDEwMCAtIG1pblJhbmspKk1hdGguc3FydChNYXRoLnNxcnQoc3BvdFRvdGFsKSk7XHJcbiAgICAgICAgICAgIHNjb3JlIC09IG1pblJhbms7XHJcblxyXG4gICAgICAgICAgICBpZihpbmRpdmlkdWFsQXJyLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSAtPSAxMjA7XHJcbiAgICAgICAgICAgICAgICBzY29yZSAtPSBtaW5SYW5rO1xyXG4gICAgICAgICAgICAgICAgaWYoc3BvdC5yYW5rLm52KXtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZSArPSA1MDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYoaW5kaXZpZHVhbEFyci5sZW5ndGggPT09IDMpe1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gKDE2MCAtIG1pblJhbmspO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihpbmRpdmlkdWFsQXJyLmxlbmd0aCA9PT0gNCl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSAxNjA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJhbmtBcnIucHVzaCh7c2lkOnNpZCwgc2NvcmU6c2NvcmV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhbmtBcnIuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmtBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpZCA9IHJhbmtBcnJbaV0uc2lkO1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IHNwb3RPYmpbc2lkXTtcclxuICAgICAgICAgICAgbGV0IHVybCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmKHNwb3QudXJsKXtcclxuICAgICAgICAgICAgICAgIHVybCA9IHNwb3QudXJsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByYW5raW5nID0ge1xyXG4gICAgICAgICAgICAgICAgZ2c6XCJcIixcclxuICAgICAgICAgICAgICAgIG52OlwiXCIsXHJcbiAgICAgICAgICAgICAgICBscDpcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGE6XCJcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzaXRlIGluIHNwb3QucmFuaykge1xyXG4gICAgICAgICAgICAgICAgcmFua2luZ1tzaXRlXSA9IHNwb3QucmFua1tzaXRlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cInJlc3VsdF9ib3hcIiBpZD1cIicrc2lkKydcIj48cCBjbGFzcz1cInJlc3VsdF9yYW5rXCI+JysoaSsxKSsnPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICc8aW5wdXQgY2xhc3M9XCJyZXN1bHRfbmFtZV9rb1wiIHZhbHVlPVwiJytzcG90Lm5hbWUua28rJ1wiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICc8aW5wdXQgY2xhc3M9XCJyZXN1bHRfbmFtZV9lblwiIHZhbHVlPVwiJytzcG90Lm5hbWUuZW4rJ1wiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICc8aW5wdXQgY2xhc3M9XCJyZXN1bHRfdXJsXCIgdmFsdWU9XCInK3VybCsnXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X2dnXCI+JytyYW5raW5nLmdnKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X252XCI+JytyYW5raW5nLm52Kyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X2xwXCI+JytyYW5raW5nLmxwKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X3RhXCI+JytyYW5raW5nLnRhKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X3NhdmUgc2F2ZV9zcG90XCI+7KCA7J6lPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInJlc3VsdF9yZW1vdmUgcmVtb3ZlX3Nwb3RcIj7sgq3soJw8L3A+PC9kaXY+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIucGFnZXMuc3BvdCAud3JhcHBlclwiKS5odG1sKHR4dCk7XHJcblxyXG4gICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IFRoaXJkX2ZpbmFsaXplO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvdGhpcmRfZmluYWxpemUuanMiLCJ2YXIgQ29uZmlnID0ge1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2NvbmZpZy5qcyIsImxldCBBY2NvdW50ID0ge1xyXG4gICAgdXNlcjoge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBpZD1cImFjY291bnRDYWxlbmRhclwiIGNsYXNzPVwiYWNjb3VudF9fY2FsZW5kYXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5hY2NvdW50XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB1aWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVpZCAhPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJbdWlkXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YVt1aWRdLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJyNhY2NvdW50Q2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgIHZpZXdSZW5kZXI6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24gKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2FjY291bnQuanMiLCJsZXQgU3Vid2F5ID0ge1xyXG4gICAgbWFwOnt9LFxyXG4gICAgbWFya2VyOmZhbHNlLFxyXG4gICAgbWV0cm86W10sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5bG9cIilcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvbnljL21ldHJvXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdGhhdC5tZXRybyA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YndheU1hcCcpLCB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiA0MC43NDg0NCwgbG5nOiAtNzMuOTg1NjYgfSxcclxuICAgICAgICAgICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tYXAuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRTdWJ3YXkoZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZmluZFN1YndheTogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgbGV0IGNvb3IgPSB7XHJcbiAgICAgICAgICAgIGxhdDplLmxhdExuZy5sYXQoKSxcclxuICAgICAgICAgICAgbG5nOmUubGF0TG5nLmxuZygpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm1hcmtlcil7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnNldE1hcChudWxsKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGUubGF0TG5nLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgIGxldCBtZXRyb0luZm8gPSB7fVxyXG4gICAgICAgIGxldCBtZXRyb0J5U3RuID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDczOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvTmFtZSA9IHRoaXMubWV0cm9baV0ubmFtZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkaWYgPSBNYXRoLnJvdW5kKGNhbGN1bGF0ZURpZihjb29yLHRoaXMubWV0cm9baV0uY29vcikpO1xyXG5cclxuICAgICAgICAgICAgaWYoZGlmPDcwMCl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMubWV0cm9baV0ubGluZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gdGhpcy5tZXRyb1tpXS5saW5lW2tdLnNsaWNlKDAsMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1ldHJvSW5mb1tsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjxtZXRyb0luZm9bbGluZV0uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvSW5mb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyb05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0luZm9bbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldHJvTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG1ldHJvQnlTdG5bbWV0cm9OYW1lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdLmxpbmUgPSBtZXRyb0J5U3RuW21ldHJvTmFtZV0ubGluZS5jb25jYXQodGhpcy5tZXRyb1tpXS5saW5lKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5tZXRyb1tpXS5saW5lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWV0QXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBsaW5lIGluIG1ldHJvSW5mbykge1xyXG4gICAgICAgICAgICBtZXRBcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bGluZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6bWV0cm9JbmZvW2xpbmVdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkaWY6bWV0cm9JbmZvW2xpbmVdLmRpZlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXRTdG5BcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gbWV0cm9CeVN0bikge1xyXG4gICAgICAgICAgICBtZXRTdG5BcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bWV0cm9CeVN0bltuYW1lXS5saW5lLFxyXG4gICAgICAgICAgICAgICAgbmFtZTpuYW1lLFxyXG4gICAgICAgICAgICAgICAgZGlmOm1ldHJvQnlTdG5bbmFtZV0uZGlmXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWV0QXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZGlmID4gYi5kaWYgPyAxIDogYS5kaWYgPCBiLmRpZiA/IC0xIDogMDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIG1ldFN0bkFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmRpZiA+IGIuZGlmID8gMSA6IGEuZGlmIDwgYi5kaWYgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3RpdGxlXCI+7Jet67OEPC9wPidcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19kaXZcIj4nXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRTdG5BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX3N0bk5hbWVcIj4nKyBtZXRTdG5BcnJheVtpXS5uYW1lICsgJ+yXrTwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fZGlmXCI+JysgTWF0aC5jZWlsKG1ldFN0bkFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTGluZVwiPidcclxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBtZXRTdG5BcnJheVtpXS5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihtZXRTdG5BcnJheVtpXS5saW5lW2tdLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTmFtZSBsbl8nK21ldFN0bkFycmF5W2ldLmxpbmVba10rJ1wiPicrbWV0U3RuQXJyYXlbaV0ubGluZVtrXSArICc8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICB0eHQrPSc8cCBjbGFzcz1cInN1YndheV9faW5mb19fdGl0bGVcIj7rhbjshKDrs4Q8L3A+J1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpdlwiPidcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2xpbmVcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lTmFtZSBsbl8nK21ldEFycmF5W2ldLmxpbmUrJ1wiPicrbWV0QXJyYXlbaV0ubGluZSArICc8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fZGlmXCI+JysgTWF0aC5jZWlsKG1ldEFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19zdG5OYW1lXCI+JysgbWV0QXJyYXlbaV0ubmFtZSArICfsl608L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgJChcIi5zdWJ3YXlfX2luZm9cIikuaHRtbCh0eHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdWJ3YXk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3N1YndheS5qcyIsImltcG9ydCBTZXRIb3RlbEluZm8gZnJvbSBcIi4vaG90ZWwvc2V0SG90ZWxJbmZvXCI7XHJcbmltcG9ydCBTZXRBcmVhIGZyb20gXCIuL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhXCI7XHJcblxyXG52YXIgSG90ZWwgPSB7XHJcblxyXG5cclxuICAgIC8vaW5mbGF0Ze2VmOuptCDtmLjthZTsnYQg66eM65Ok7Ja064K06riwIOychO2VnCDsoJXrs7Qg7IiY7KeRIOyDge2DnOqwgCDtkZzsi5zrkKggLT4gXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLm9uKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGVfc3RhdHVzKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuc3RhdHVzX19tYWtlX19ob3RlbFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSAkKHRoaXMpLmF0dHIoJ2NpZCcpO1xyXG4gICAgICAgICAgICB2YXIgY2l0eU5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcuc3RhdHVzX19jaXR5JykuaHRtbCgpO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIGNpdHlOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuaG90ZWxfX2FsZXJ0X19jb25maXJtXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChcIi5ob3RlbF9fYWxlcnRfX3dyYXBcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuaG90ZWxcIikub24oXCJjbGlja1wiLCBcIi5jaXR5QXJlYV9fZmluaXNoXCIsIGZ1bmN0aW9uICgpIHsgIC8vc2V0QXJlYeulvCDrgZ3rgrzrlYxcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykuYXR0cignY2lkJyk7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5vbmNlKCd2YWx1ZScsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhW2hpZF0uYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbaGlkXS5hcmVhID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2hpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5zZXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cy9hcmVhJykuc2V0KDIpO1xyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvc3RhdHVzL2FyZWEnKS5zZXQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jaXR5OiBmdW5jdGlvbihjaWQsIGNpdHlOYW1lKXtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgIHZhciBhbGVydE1vZGFsID0gJyc7XHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICBhbGVydE1vZGFsICs9ICAgICAnPGRpdiBjbGFzcz1cImhvdGVsX19hbGVydFwiPic7XHJcblxyXG4gICAgICAgICAgICBpZighZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7qtIDqtJHsp4Ag7KCV67O06rCAIOyVhOyngSDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7tjrjsnZjsi5zshKQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLnNwb3RzKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuc3BvdHMucmFua2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuq0gOq0keyngCDsoJXrs7TqsIAg7JWE7KeBIOygleumrOuQmOyngCDslYrslZjsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+6rSA6rSR7KeAIOygleuztOqwgCDslYTsp4Eg7KCV66as65CY7KeAIOyViuyVmOyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5sb2NhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPu2OuOydmOyLnOyEpCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEubG9jYWwubWV0cm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoIWRhdGEubWV0cm9MaW5lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukKG1ldHJvTGluZSDsl4bsnYwpLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoIWRhdGEuc3RhdHVzLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIFNldEFyZWEuaW5mbGF0ZShjaXR5TmFtZSwgY2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KCfsp4Dsl60g7ISk7KCV7J2EIOuovOyggCDsp4Ttlontlanri4jri6QnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRfX2NvbmZpcm1cIj7tmZXsnbg8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPC9kaXY+PC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIGlmKGNoZWNrKXtcclxuICAgICAgICAgICAgICAgIFNldEhvdGVsSW5mby5pbml0KGRhdGEsIGNpZCwgY2l0eU5hbWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuaG90ZWxcIikuYXBwZW5kKGFsZXJ0TW9kYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfc3RhdHVzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPGgyPuyImeyGjCDrpqzsiqTtirg8L2gyPic7XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cIndyYXBwZXJcIj4nO1xyXG5cclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJzdGF0dXNfX2xpbmVyXCI+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX25hbWVcIj7rj4Tsi5zrqoU8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2VcIj7siJnshowg642w7J207YSwPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19ob3RlbFwiPuq4sOuzuCDtmLjthZTrjbDsnbTthLA8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj7sp4Dsl63soJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj7qtIDqtJHsp4DsoJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX3RyYW5zcG9ydFwiPuuMgOykkeq1kO2GteygleuztDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgY2lkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSBjaXR5LnN0YXR1cztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cInN0YXR1c19fbGluZXJcIj4nO1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19jaXR5XCI+JytjaXR5Lm5hbWUrJzwvcD4nO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHN0YXR1cy5ob3RlbCA9PT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fbWFrZVwiPuyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2Ugc3RhdHVzX19tYWtlX19ob3RlbFwiICBjaWQ9XCInICsgY2l0eS5jb2RlICsgJ1wiPuyXhuydjCAo7YG066at7ZW0IOunjOuTpOq4sCk8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuaG90ZWw+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19ob3RlbFwiPlg8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fYXJlYVwiPk88L3A+JztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy5zcG90ID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy50cmFuc3BvcnQgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3RyYW5zcG9ydFwiPlg8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLmhvdGVsXCIpLmh0bWwodHh0KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvdGVsO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsLmpzIiwiaW1wb3J0IFNldEFUTSBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0QVRNLmpzXCI7XHJcbmltcG9ydCBTZXRGb29kIGZyb20gXCIuL3NldEhvdGVsSW5mby9zZXRGb29kLmpzXCI7XHJcbmltcG9ydCBTZXRNZXRybyBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0TWV0cm8uanNcIjtcclxuXHJcbnZhciBTZXRIb3RlbEluZm8gPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaWQsIGNpdHlOYW1lKXtcclxuICAgICAgICAvL3N0YXR1c0NoZWNrIOynhO2WiVxyXG4gICAgICAgIHZhciBjaGVja1R4dCA9ICcnO1xyXG5cclxuICAgICAgICB2YXIgaG90ZWwgPSBkYXRhLmhvdGVsc1tPYmplY3Qua2V5cyhkYXRhLmhvdGVscylbMF1dO1xyXG5cclxuICAgICAgICB2YXIgc3RhdHVzID0ge1xyXG4gICAgICAgICAgICBsb2NhbDoge1xyXG4gICAgICAgICAgICAgICAgYXRtOiB7IC8vMDog642w7J207YSwIOyXhuydjCwgMTog66eM65OkIOyImCDsnojsnYwsIDI6IOyhtOyerO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2E6MCxcclxuICAgICAgICAgICAgICAgICAgICBjaXRpOjBcclxuICAgICAgICAgICAgICAgIH0sICBcclxuICAgICAgICAgICAgICAgIGZvb2Q6IDAsXHJcbiAgICAgICAgICAgICAgICBtZXRybzogMCxcclxuICAgICAgICAgICAgICAgIHNwb3Q6MFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYXNzZXNzbWVudDoge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0OjAsXHJcbiAgICAgICAgICAgICAgICBzYWZldHk6MCxcclxuICAgICAgICAgICAgICAgIHRoZW1lOjAsXHJcbiAgICAgICAgICAgICAgICBjb252ZW5pZW5jZTowXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoaG90ZWwubG9jYWwpIHtcclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLmF0bSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaG90ZWwubG9jYWwuYXRtKSkgeyAvL1ZJU0EgQVRN7J20IOygleumrOuQmOyngCDslYrsnYAg7ZiV7YOc66GcIOuTpOyWtOqwgOyeiOuKlCDsg4Htg5xcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLnZpc2EgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy9hdG3qsJ3ssrTrpbwg6rCA7KeA6rOgIOyeiOuKlCDsg4Htg5wgLSDrsJjrk5zsi5wgdmlzYSBhdG3snbQg65Ok7Ja06rCAIOyeiOyWtOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLnZpc2EgPSAyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwuYXRtLmNpdGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS5jaXRpID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubG9jYWwuYXRtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v7KSR7JqUOiBDSVRJ7J6R7JeF7J2AIFZJU0HsnpHsl4Ug7ZuE7JeQIOydtOujqOyWtOyguOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vbG9jYWzsl5AgYXRt7J20IOyXhuydjCAtPiDruYTsnpAg7LaU7Lac65CcIOyggeydtCDsl4bsnYxcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubG9jYWwuYXRtKSB7IC8v6re4IOqyveyasOyXkOuPhCBDSVRJ64qUIFJBV+uNsOydtO2EsOuhnCDsobTsnqztlaAg7IiYIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/spJHsmpQ6IENJVEnsnpHsl4XsnYAgVklTQeyekeyXhSDtm4Tsl5Ag7J2066Oo7Ja07KC47JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubG9jYWwuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwubWV0cm8pIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZXRyb0xpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwuc3BvdCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc3BvdHMucmFua2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMDsgLy9WSVNB64qUIOustOyhsOqxtCDtmLjthZQg66Gc7Lus7JeQIOyngeygkSDrk6TslrTqsIDrr4DroZwg7Zi47YWUIOuhnOy7rCDqsr3roZzqsIAg7JeG64uk64qUIOqyg+ydgCBWSVNB6rCAIOyXhuuLpOuKlCDqsoMuXHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5sb2NhbC5hdG0pIHsgLy9jaXRp64KYIHZpc2HripQg7Zi47YWUIOuhnOy7rOydtCDslYTri4wg64+E7IucIOuhnOy7rOyXkCDsoIDsnqXrkKAg7IiYIOyeiOydjC5cclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubWV0cm9MaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuc3BvdHMucmFua2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoZWNrVHh0ICs9ICc8aDIgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190aXRsZVwiPu2YuO2FlCDso7zrs4DsoJXrs7Q8L2gyPic7XHJcblxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLmF0bS52aXNhID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIFZJU0EgQVRN7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9PT0gMSkge1xyXG4gICAgICAgICAgICBTZXRBVE0uaW5pdChkYXRhLCBjaWQpO1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcgVklTQSBBVE3soJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA7J6lIOqwgOq5jOyatCBBVE3qs7wgMjTsi5zqsIQgQVRN7J2EIOy2lOy2nO2VqeuLiOuLpC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9PT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHQgY29sb3ItLXJlZFwiPk5vIERhdGEgLSBWSVNBIEFUTeygleuztOqwgCDsl4bsirXri4jri6QuIFZJU0EgQVRNIGxvY2F0b3Lsl5DshJwg7KCV67O066W8IOuovOyggCDtgazroaTrp4HtlbTso7zshLjsmpQuPC9wPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLmF0bS5jaXRpID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIENJVEkgQVRN7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcgQ0lUSSBBVE3soJXrs7Qg7ZmV7J24LiDqsIDsnqUg6rCA6rmM7Jq0IENJVEkgQVRN7J2EIOy2lOy2nO2VqeuLiOuLpC48L3A+JztcclxuICAgICAgICB9IC8vIGNpdGkgc3RhdHVzIDDsnYAg7JeG7J2MLlxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLmZvb2QgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwg7Iud66OM7ZKI7KCQL+2OuOydmOygkCDsoJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmZvb2QgPT09IDEpIHtcclxuICAgICAgICAgICAgU2V0Rm9vZC5pbml0KGRhdGEsIGNpZCk7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk1ha2luZyAtIFJBVyDsi53ro4ztkojsoJAv7Y647J2Y7KCQIOygleuztCDtmZXsnbguIO2YuO2FlOuzhOuhnCDqsIDquYzsmrQg7Iud66OM7ZKI7KCQIOy2lOy2nC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5mb29kID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIOuPhOyLnCDsi53ro4ztkojsoJAv7Y647J2Y7KCQIOygleuztOqwgCDsl4bsirXri4jri6QuIOuovOyggCDsoJXrs7Trpbwg7J6F66Cl7ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5tZXRybyA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCDsp4DtlZjssqAv64yA7KSR6rWQ7Ya1IOygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwubWV0cm8gPT09IDEpIHtcclxuICAgICAgICAgICAgU2V0TWV0cm8uaW5pdChkYXRhKTtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIOyngO2VmOyyoC/rjIDspJHqtZDthrUg7KCV67O0IO2ZleyduC4g7Zi47YWU67OE66GcIOqwgOq5jOyatCDsp4DtlZjssqAg7LaU7LacLjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLm1ldHJvID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIOuPhOyLnCDsp4DtlZjssqAv64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuIOuovOyggCDsoJXrs7Trpbwg7J6F66Cl7ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5zcG90ID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIOq0gOq0keyngCDsoJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLnNwb3QgPT09IDEpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIOq0gOq0keyngCDsoJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA6rmM7Jq0IOq0gOq0keyngCDstpTstpwuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuc3BvdCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHQgY29sb3ItLXJlZFwiPk5vIERhdGEgLSDrj4Tsi5wg6rSA6rSR7KeAIOyInOychOqwgCDslYTsp4Eg7ZmV7KCV65CY7KeAIOyViuyVmOyKteuLiOuLpC4g66i87KCAIO2ZleyduO2VtOyjvOyEuOyalC48L3A+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGNoZWNrVHh0KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldEhvdGVsSW5mbztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8uanMiLCJpbXBvcnQgQ29uZmlnIGZyb20gXCIuLi9jb25maWcuanNcIjtcclxuXHJcbnZhciBTZXRBVE0gPSB7XHJcbiAgICBzdGF0aXN0aWM6IHtcclxuICAgICAgICBuZWFyZXN0OltdLCAvL+qwgOyepSDqsIDquYzsmrQgQVRN7J2AIOuqhyBtIOqxsOumrOyXkCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgICAgICBiYW5rMjQ6W10sICAgLy8yNOyLnOqwhCDsmrTsmIHtlZjripQg7J2A7ZaJIOyGjOycoCDqsbDrpqzsl5Ag7J6I64qU7KeAIOuPhOyLnCDsoITssrQg7Y+J6reg7J2EIOuCtOq4sCDsnITtlZwg642w7J207YSwXHJcbiAgICAgICAgaW4xMzA6W10gLy/rsJjqsr0gMTMwbSDrgrTsl5AgQVRN7J20IOuqhyDqsJwg7J6I64qU7KeAIOuPhOyLnCDsoITssrQg7Y+J6reg7J2EIOuCtOq4sCDsnITtlZwg642w7J207YSwXHJcbiAgICB9LFxyXG4gICAgYnlBcmVhOiB7fSwgLy9pbjEzMCBzdGF07J2EIOyngOyXreuzhOuhnCDtj4nqt6DrgrTquLAg7JyE7ZWcIOqwneyytFxyXG5cclxuICAgIGRhdGE6e30sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKGRhdGEsIGNpZCkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3RfYnlIb3RlbHMoKTsgLy/tmLjthZTrk6TsnYQg64+M66mwIOqwgOyepSDqsIDquYzsmrQgQVRNLCDsnYDtlonshozsnKAgMjTsi5zqsIQgQVRNLCAxMzBt7JWI7JeQIOuqhyDqsJwgQVRNIOyeiOuKlOyngOulvCDssL7slYTrgrTqs6Ag7Ya16rOE7JeQ64+EIOq4sOuhnVxyXG4gICAgICAgIHRoaXMuc2Vjb25kX2J5QXJlYXMoKTsgLy/sp4Dsl63rs4TroZwgMTMwbSDrgrTsl5Ag7J6I64qUIEFUTSDqsK/siJgg7Y+J6reg7J2EIOuDhCAtPiDsp4Dsl60g7IOB7JeFIOuwnOyghOuPhOulvCDrgpjspJHsl5Ag7LK07YGs7ZWY6riwIOychO2VtCDrp4zrk6Tsl4jsnYwuXHJcbiAgICAgICAgdGhpcy50aGlyZF9tYWtlU3RhdHMoKTsgLy9maXJzdOyXkOyEnCDquLDroZ3tlZwg7Ya16rOEIOuCtOyaqeydhCDqsIDsp4Dqs6Ag7Ya16rOE6rCS65Ok7J2EIOyCsOy2nO2VtOuDhC5cclxuICAgICAgICB0aGlzLmZvdXJ0aF9tYWtlUmFuaygpOyAvL+2GteqzhOyXkCDquLDroZ3rkJwg6rCS7J2EIOuwlO2DleycvOuhnCDtmLjthZTrs4QgYXRt7Y647J2Y7ISxIOuere2CueydhCDqs4TsgrDtlago7JiILUFUTeqwgOq5jOyatCDsoJXrj4TripQg64m07JqVIOuCtCA37JyELi4uKVxyXG4gICAgICAgIHRoaXMuZmlmdGhfbWFrZVNjb3JlKCk7XHJcbiAgICAgICAgdGhpcy5zaXh0aF93b3JkaW5nKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGZpcnN0X2J5SG90ZWxzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBob3RlbHMgPSB0aGlzLmRhdGEuaG90ZWxzO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGhpZCBpbiBob3RlbHMpIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsID0gaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGlmIChob3RlbC50ZW1wKSB7IC8vaG90ZWwudGVtcOuhnCDrsJTqv4DqsoPsnoRcclxuICAgICAgICAgICAgICAgIHZhciBhdG1BcnIgPSBob3RlbC50ZW1wLmF0bTtcclxuICAgICAgICAgICAgICAgIHZhciBhdG1PYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDogYXRtQXJyWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGluMTMwOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhbmsyNDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgYXRtT2JqLm5lYXJlc3QuZGlmID0gY2FsY3VsYXRlRGlmKGF0bUFyclswXS5jb29yLCBob3RlbC5jb29yKTsgLy/siJnshozrs4Qg6rCA7J6lIOqwgOq5jOyatCBhdG0g64u07J2MXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGF0bUFycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXRtQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdG0gPSBhdG1BcnJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoYXRtLmNvb3IsIGhvdGVsLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZiA8IDEzMC4xKSB7IC8v7IiZ7IaM67OEIDEzMG3qsbDrpqwgYXRtIOqwr+yImCDssrTtgaxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bU9iai5pbjEzMCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWF0bU9iai5iYW5rMjQpIHsvL+q4sOuzuOyggeycvOuhnCDqsbDrpqzsiJwg7KCV66CsIOuQmOyWtOyeiOyWtOyEnCDsnbTrr7gg65Ok7Ja06rCA7J6I7Jy866m0IOq3uOuGiOydtCDrjZQg6rCA6rmM7Jq064aIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMjMwKSB7IC8v7IiZ7IaM67OEIOydgO2WiSDshozsnKAgMjTsi5zqsIQgYXRtIOuLtOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYXRtLm93bmVyLmluY2x1ZGVzKFwiQkFOS1wiKXx8YXRtLnBsYWNlTmFtZS5pbmNsdWRlcyhcIkJBTktcIikpICYmIGF0bS5pczI0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bU9iai5iYW5rMjQgPSBhdG07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bU9iai5iYW5rMjQuZGlmID0gZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+2GteqzhOyXkCDquLDroZ3tlZjquLBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmVzdC5wdXNoKGF0bU9iai5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0bU9iai5iYW5rMjQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMuYmFuazI0LnB1c2goYXRtT2JqLmJhbmsyNC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLmJhbmsyNC5wdXNoKDIzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyTm8rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5hdG0gPSBhdG1PYmo7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbCA9IHthdG06IGF0bU9ian07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pbjEzMOydgCDtmLjthZTsnYQg7ZWcIOuyiCDri6Qg64+IIOuLpOydjOyXkCDthrXqs4Tsl5Ag6riw66Gd7ZWgIOyImCDsnojsnYxcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLmluMTMwLnB1c2goYXRtT2JqLmluMTMwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXSl7Ly/sp4Dsl63rs4QgYXRtIOuwgOynkeuPhOulvCDtmZXsnbjtlZjripQg6re465+wIOuFgOyEnVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnlBcmVhW2hvdGVsLmFyZWFdLnB1c2goYXRtT2JqLmluMTMwKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnlBcmVhW2hvdGVsLmFyZWFdID0gW2F0bU9iai5pbjEzMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoYFZJU0EgQVRNIOygleuztOqwgCDsl4bripQg7Zi47YWU7J20IOyeiOyKteuLiOuLpC4g7ZmV7J24IO2bhCDsnqzsi5zrj4TtlbTso7zshLjsmpRgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2Vjb25kX2J5QXJlYXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGFyZWEgPSB0aGlzLmRhdGEuYXJlYTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYoIWFyZWFbaV0ubm90QXJlYSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ5QXJlYVtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0bXMgPSB0aGlzLmJ5QXJlYVtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhdG1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bSArPSBhdG1zW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF0bXMubGVuZ3RoIDwgMTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW51cyA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhdG1zID0gKHN1bS8oYXRtcy5sZW5ndGgpICsgYXRtcy5sZW5ndGgvMTApICsgbWludXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJlYVtpXS5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwuYXRtID0gYXRtcy50b0ZpeGVkKDIpKjE7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdG06IGF0bXMudG9GaXhlZCgyKSoxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJlYVtpXS5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwuYXRtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bTogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGhpcmRfbWFrZVN0YXRzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBzdGF0ID0ge1xyXG4gICAgICAgICAgICBuZWFyZXN0OiAwLFxyXG4gICAgICAgICAgICBpbjEzMDogMCxcclxuICAgICAgICAgICAgYmFuazI0OiAwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gc3RhdCkge1xyXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLnN0YXRpc3RpY1tpZF0ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIHN1bSArPSB0aGlzLnN0YXRpc3RpY1tpZF1ba107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RhdFtpZF0gPSBzdW0vdGhpcy5zdGF0aXN0aWNbaWRdLmxlbmd0aDtcclxuICAgICAgICAgICAgc3RhdFtpZF0gPSBzdGF0W2lkXS50b0ZpeGVkKDIpKjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmRhdGEuc3RhdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5zdGF0LmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0LmxvY2FsLmF0bSA9IHN0YXQ7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0YXQubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRtOiBzdGF0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0ID0ge1xyXG4gICAgICAgICAgICAgICAgbG9jYWw6e2F0bTpzdGF0fVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZm91cnRoX21ha2VSYW5rOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRpc3RpYy5uZWFyZXN0LnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuICAgICAgICB0aGlzLnN0YXRpc3RpYy5iYW5rMjQuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xyXG4gICAgICAgIHRoaXMuc3RhdGlzdGljLmluMTMwLnNvcnQoKGEsIGIpID0+IGIgLSBhKTtcclxuXHJcbiAgICAgICAgdmFyIHRvdGFsID0gT2JqZWN0LmtleXModGhpcy5kYXRhLmhvdGVscykubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciBhdG0gPSBob3RlbC5sb2NhbC5hdG07XHJcbiAgICAgICAgICAgIHZhciByYW5rID0geyAvL+q8tOyngCDrnq3tgazrpbwg67aA7Jes7ZWoIC0+IO2YueyLnCBob3RlbOyXkCDqsIEg64K07Jqp65Ok7J20IOyXhuuLpOuptCDrnq3tgazripQg6ry07LCMXHJcbiAgICAgICAgICAgICAgICBiYW5rMjQ6IHRvdGFsLFxyXG4gICAgICAgICAgICAgICAgbmVhcmVzdDogdG90YWwsXHJcbiAgICAgICAgICAgICAgICBpbjEzMDogdG90YWxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByYW5rKSB7XHJcbiAgICAgICAgICAgICAgICBpZihrZXkgPT09IFwiaW4xMzBcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXRtW2tleV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rW2tleV0gPSB0aGlzLnN0YXRpc3RpY1trZXldLmluZGV4T2YoYXRtW2tleV0pKzE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXRtW2tleV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rW2tleV0gPSB0aGlzLnN0YXRpc3RpY1trZXldLmluZGV4T2YoYXRtW2tleV0uZGlmKSsxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGhvdGVsLnJhbmspe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwucmFuay5hdG0gPSByYW5rO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLnJhbmsgPSB7YXRtOnJhbmt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmaWZ0aF9tYWtlU2NvcmU6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBzY29yZUFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgdmFyIGF0bSA9IGhvdGVsLnJhbmsuYXRtO1xyXG4gICAgICAgICAgICB2YXIgd2VpZ2h0ID0gQ29uZmlnLmF0bS5zY29yZS53ZWlnaHQ7XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IChhdG0uYmFuazI0KndlaWdodC5iYW5rMjQgKyBhdG0ubmVhcmVzdCp3ZWlnaHQubmVhcmVzdCArIGF0bS5pbjEzMCp3ZWlnaHQuaW4xMzApO1xyXG5cclxuICAgICAgICAgICAgc2NvcmVBcnJheS5wdXNoKHtzY29yZTpzY29yZSxoaWQ6aGlkfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNjb3JlQXJyYXkuc29ydCgoYSwgYikgPT4gYS5zY29yZSAtIGIuc2NvcmUpOyAvL+uCruydhOyImOuhnSDsoovsnYxcclxuXHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5hdG0uc2NvcmUucGVyY2VudGlsZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWQgPSBzY29yZUFycmF5W2ldLmhpZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgdmFyIHJhbmsgPSAoaSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoOS1qKSArIE1hdGguZmxvb3IoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC5zY29yZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5hdG0gPSBzY29yZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUgPSB7YXRtOnNjb3JlfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOnthdG06c2NvcmV9LFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmQ6e2F0bTpcIlwifVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGZjOiBmdW5jdGlvbih0eXBlLCBob3RlbCl7ICAgIC8vdGV4dCBmcm9tIGNvbmZpZ1xyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEuaG90ZWxzKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciByYW5rID0gMDtcclxuICAgICAgICBpZih0eXBlID09PSBcImludGVncmF0ZVwiKXtcclxuICAgICAgICAgICAgcmFuayA9IChob3RlbC5yYW5rLmF0bS5iYW5rMjQgLyB0b3RhbCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJhbmsgPSAoaG90ZWwucmFuay5hdG1bdHlwZV0gLyB0b3RhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY29uZmlnID0gQ29uZmlnLmF0bS53b3JkO1xyXG4gICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICBsZXQgaW5TdGQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWdbdHlwZV0uc3RkLmxlbmd0aDsgaSsrKSB7ICAgLy9u67aEIOqxsOumrOyXkCDsnojri6QuXHJcbiAgICAgICAgICAgIGlmKCFpblN0ZCl7XHJcbiAgICAgICAgICAgICAgICBpZihyYW5rIDwgY29uZmlnW3R5cGVdLnN0ZFtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9IGNvbmZpZ1t0eXBlXS53b3JkW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGluU3RkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZighaW5TdGQpe1xyXG4gICAgICAgICAgICB0eHQgKz0gY29uZmlnW3R5cGVdLndvcmRbY29uZmlnW3R5cGVdLnN0ZC5sZW5ndGhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHR4dDtcclxuICAgIH0sXHJcblxyXG4gICAgc2l4dGhfd29yZGluZzogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICAgICAgdmFyIGF0bSA9IGhvdGVsLmxvY2FsLmF0bTtcclxuXHJcbiAgICAgICAgICAgIC8vIDEuIOqwgOyepSDqsIDquYzsmrQgQVRN7J20IDI07Iuc6rCEIOyYgeyXhe2VmOuKlCBBVE3snbTqsbDrgpgsIOqxsOumrCDssKjsnbTqsIAgNTBtIOydtOuCtOyduCDqsr3smrAgLT4gMjTsi5zqsIQgQVRNIOybjOuUqeycvOuhnCDthrXtlalcclxuICAgICAgICAgICAgLy8gMi4gMeydtCDslYTri5Ag6rK97JqwIOqwgOyepSDqsIDquYzsmrQgQVRN7J2AIOuPhOuztCDri6ggTuu2hOqxsOumrOyXkCDsnojqs6AsIDI07Iuc6rCEIOyYpO2UiCBBVE3rj4Qg64+E67O066GcIE7rtoTqsbDrpqzsl5Ag7J6I7Ja07IScIH5cclxuICAgICAgICAgICAgLy8gMy4g7J2A7ZaJ7IaM7JygIDI07Iuc6rCEIEFUTeydtCDsl4bripQg6rK97JqwIC0+IOqwgOyepSDqsIDquYzsmrQgQVRN7J2AIOuPhOuztCBO67aE6rGw66asLCDsnYDtlokg7IaM7JygIDI07Iuc6rCEIEFUTeydgCDsl4bsnYxcclxuXHJcbiAgICAgICAgICAgIGlmKGF0bS5iYW5rMjQpe1xyXG4gICAgICAgICAgICAgICAgaWYoYXRtLmJhbmsyNC5kaWYgPCBhdG0ubmVhcmVzdC5kaWYgKyA1MCl7IC8v7Iuc64KY66as7JikMVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihhdG0uYmFuazI0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ID0gYDI07Iuc6rCEIOyYgeyXhe2VmOuKlCDsnYDtlokg7IaM7JygIEFUTeydtCAke2RpZn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSB0aGlzLnRmYygnaW50ZWdyYXRlJywgaG90ZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNleyAvL+yLnOuCmOumrOyYpCAyXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGRpZlRvTWluKGF0bS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZjI0ID0gZGlmVG9NaW4oYXRtLmJhbmsyNC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSBg6rCA7J6lIOqwgOq5jOyatCBBVE3snYAg64+E67O0ICR7ZGlmfSDqsbDrpqzsl5Ag7J6I6rOgLCDsnYDtlonsnbQg7IaM7Jyg7ZWcIDI07Iuc6rCEIOyYpO2UiCBBVE3rj4Qg64+E67O0ICR7ZGlmMjR9YDtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gdGhpcy50ZmMoJ25lYXJlc3QnLCBob3RlbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IGRpZlRvTWluKGF0bS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gYOqwgOyepSDqsIDquYzsmrQgQVRN7J2AIOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyeiOydjC5gO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC53b3JkKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5hdG0gPSB0eHQ7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkID0ge2F0bTp0eHR9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0QVRNO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBVE0uanMiLCJpbXBvcnQgR2VvQ29kZSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlcy9nZW9Db2RlLmpzXCI7XHJcbmltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldEZvb2QgPSB7XHJcbiAgICBkYXRhOnt9LFxyXG5cclxuICAgIHN0YXRpc3RpYzp7XHJcbiAgICAgICAgbmVhcmVzdDpbXSxcclxuICAgICAgICBuZWFyYnk6W11cclxuICAgIH0sXHJcbiAgICBieUFyZWE6e30sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2lkKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSk7XHJcbiAgICAgICAgaWYodGhpcy5maXJzdF9nZW9Db2RlKGNpZCkpeyAgICAvL+yngOyYpOy9lOuUqSDtlaAg6rKMIOyXhuycvOuptCBzZWNvbmTrtoDthLAg7KeE7ZaJ7ZWoXHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kX3NldEZvb2QoKTsgIC8v7IiZ7IaM67OE66GcIOyLneujjO2SiOygkOuTpOydhCDrlYzroKTrhKPsnYxcclxuICAgICAgICAgICAgdGhpcy50aGlyZF9ieUFyZWFzKCk7IC8v7Ya16rOE6rCS7J2EIOunjOuTpOyWtOuDhFxyXG4gICAgICAgICAgICB0aGlzLmZvdXJ0aF9tYWtlU3RhdHMoKTsgLy/thrXqs4TqsJLsnYQg66eM65Ok7Ja064OEIC0gY2lkL3N0YXQvbG9jYWwvZm9vZCDrnbzqs6Ag65Ok7Ja06rCI6rKD7J6EXHJcbiAgICAgICAgICAgIHRoaXMuZmlmdGhfbWFrZVNjb3JlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2l4dGhfd29yZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzaXh0aF93b3JkaW5nOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIXRvZG8hISEg7KeA6riI7J2AIOuJtOyalSDquLDspIDsnLzroZwg65CY7Ja07J6I7J2MIC0+IOuPhOyLnOuzhOuhnCDrgpjriITquLAo7JiILe2OuOydmOygkCDsnojripQg64+E7Iuc7JqpKVxyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmZvb2Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb29kID0gaG90ZWwubG9jYWwuZm9vZDtcclxuICAgICAgICAgICAgICAgICAgICBpZihmb29kLmdyb2Nlcnkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmb29kLmxhcmdlKXsgLy/rkZgg64ukIOyeiOuKlCDsvIDsnbTsiqRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihmb29kLmxhcmdlLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqb3NhID0gZm9vZC5sYXJnZS5uZWFyZXN0Lmpvc2E7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IGZvb2QubGFyZ2UubmVhcmVzdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZm9vZC5sYXJnZS5uZWFyZXN0LmRpZiA8IGZvb2QuZ3JvY2VyeS5uZWFyZXN0LmRpZiArIDUwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSBg6rCB7KKFIOyLneujjO2SiOydhCDsgrQg7IiYIOyeiOuKlCDrjIDtmJUg66eI7Yq47J24ICR7bmFtZX0ke2pvc2F9IOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyeiOydjGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2RpZiA9IGRpZlRvTWluKGZvb2QuZ3JvY2VyeS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gYOqwhOuLqO2VnCDrqLnqsbDrpqzrpbwg7IK0IOyImCDsnojripQg7Iud66OM7ZKI7KCQ7J20IOuPhOuztCAke2dkaWZ9IOqxsOumrOyXkCDsnojqs6AsIOqwgeyihSDsnYzsi53rk6TsnYQg7IK0IOyImCDsnojripQg64yA7ZiVIOuniO2KuCAke25hbWV9JHtqb3NhfSDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYxgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXsgIC8vZ3JvY2VyeeunjCDsnojripQg7LyA7J207IqkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gZGlmVG9NaW4oZm9vZC5ncm9jZXJ5Lm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCA9IGDqsITri6jtlZwg66i56rGw66as66W8IOyCtCDsiJgg7J6I64qUIOyLneujjO2SiOygkOydtCDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYxgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoZm9vZC5sYXJnZSl7IC8vL+yjvOuzgOyXkCBncm9jZXJ564qUIOyXhuuKlOuNsCBsYXJnZeunjCDsnojripQg7Yq57J207LyA7J207IqkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihmb29kLmxhcmdlLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBmb29kLmxhcmdlLm5lYXJlc3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpvc2EgPSBmb29kLmxhcmdlLm5lYXJlc3Quam9zYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gYOqwgeyihSDsi53ro4ztkojsnYQg7IK0IOyImCDsnojripQg64yA7ZiVIOuniO2KuCAke25hbWV9JHtqb3NhfSDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYxgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCA9ICfsi53ro4ztkojsnYQg7IK0IOunjO2VnCDqs7PsnYAg7KO867OAIDXrtoTqsbDrpqwg7J2064K07JeQIOyXhuydjCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdHh0ID0gJ+yLneujjO2SiOydhCDsgrQg66eM7ZWcIOqzs+ydgCDso7zrs4AgNeu2hOqxsOumrCDsnbTrgrTsl5Ag7JeG7J2MJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC53b3JkKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5mb29kID0gdHh0O1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZCA9IHtmb29kOnR4dH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpZnRoX21ha2VTY29yZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgc2NvcmVBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwuZm9vZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2luZCBpbiBob3RlbC5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb29kID0gaG90ZWwubG9jYWwuZm9vZFtraW5kXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5lYXJlc3REaWYgPSBmb29kLm5lYXJlc3QuZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gKENvbmZpZy5mb29kLmtpbmRba2luZF0uc3RkIC0gbmVhcmVzdERpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKENvbmZpZy5mb29kLmtpbmRba2luZF0ubXVsdGlwbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSBzY29yZSAqIENvbmZpZy5mb29kLmtpbmRba2luZF0ubXVsdGlwbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gZm9vZC5uZWFyYnkqMjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2NvcmVBcnJheS5wdXNoKHtzY29yZTpzY29yZSxoaWQ6aGlkfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNjb3JlQXJyYXkuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpOyAvL+uGkuydhOyImOuhnSDsoovsnYxcclxuXHJcbiAgICAgICAgdmFyIHRvdGFsID0gc2NvcmVBcnJheS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciByYW5rU3lzID0gQ29uZmlnLmZvb2Quc2NvcmUucGVyY2VudGlsZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWQgPSBzY29yZUFycmF5W2ldLmhpZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgdmFyIHJhbmsgPSAoaSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoOS1qKSArIE1hdGguZmxvb3IoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC5zY29yZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5mb29kID0gc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlID0ge2Zvb2Q6c2NvcmV9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6e2Zvb2Q6c2NvcmV9LFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmQ6e2Zvb2Q6XCJcIn1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZvdXJ0aF9tYWtlU3RhdHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHN0YXQgPSB7XHJcbiAgICAgICAgICAgIG5lYXJlc3Q6IDAsXHJcbiAgICAgICAgICAgIG5lYXJieTowXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gc3RhdCkge1xyXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLnN0YXRpc3RpY1tpZF0ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIHN1bSArPSB0aGlzLnN0YXRpc3RpY1tpZF1ba107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RhdFtpZF0gPSBzdW0vdGhpcy5zdGF0aXN0aWNbaWRdLmxlbmd0aDtcclxuICAgICAgICAgICAgc3RhdFtpZF0gPSBzdGF0W2lkXS50b0ZpeGVkKDIpKjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmRhdGEuc3RhdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5zdGF0LmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0LmxvY2FsLmZvb2QgPSBzdGF0O1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0LmxvY2FsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb2Q6IHN0YXRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnN0YXQgPSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbDp7Zm9vZDpzdGF0fVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGhpcmRfYnlBcmVhczogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgYXJlYSA9IHRoaXMuZGF0YS5hcmVhO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHN1bSA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZighYXJlYVtpXS5ub3RBcmVhKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYnlBcmVhW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9vZHMgPSB0aGlzLmJ5QXJlYVtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBmb29kcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW0gKz0gZm9vZHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZm9vZHMubGVuZ3RoIDwgMTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW51cyA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb29kcyA9IChzdW0vKGZvb2RzLmxlbmd0aCkgKyBmb29kcy5sZW5ndGgvMTApICsgbWludXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJlYVtpXS5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwuZm9vZCA9IGZvb2RzLnRvRml4ZWQoMikqMTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb2Q6IGZvb2RzLnRvRml4ZWQoMikqMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0ubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsLmZvb2QgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vZDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2Vjb25kX3NldEZvb2Q6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICB2YXIgaXNTb21lRm9vZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiB0aGlzLmRhdGEubG9jYWwuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGdyb0FyciA9IHRoaXMuZGF0YS5sb2NhbC5mb29kW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZCA9IENvbmZpZy5mb29kLmtpbmRbdHlwZV0uc3RkO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvb2QgPSBncm9BcnJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihob3RlbC5jb29yLCBmb29kLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihkaWY8c3RkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTb21lRm9vZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb2QuZGlmID0gZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb29kLnR5cGUgPSB0eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwudGVtcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC50ZW1wLmZvb2Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLnRlbXAuZm9vZFt0eXBlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZFt0eXBlXS5wdXNoKGZvb2QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2RbdHlwZV0gPSBbZm9vZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwudGVtcC5mb29kID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwudGVtcC5mb29kW3R5cGVdID0gW2Zvb2RdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vZDp7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZFt0eXBlXSA9IFtmb29kXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIWlzU29tZUZvb2Qpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwudGVtcC5mb29kID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdmFyIG5lYXJieSA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmVhcmVzdCA9IHtkaWY6OTk5fTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0eXBlIGluIGhvdGVsLnRlbXAuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZFt0eXBlXS5zb3J0KChhLCBiKSA9PiBhLmRpZiAtIGIuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9vZEFyciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgIGhvdGVsLnRlbXAuZm9vZFt0eXBlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29weSA9ICQuZXh0ZW5kKHRydWUse30saG90ZWwudGVtcC5mb29kW3R5cGVdW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vZEFyci5wdXNoKGNvcHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmJ5ICs9IGZvb2RBcnIubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihmb29kQXJyWzBdLmRpZiA8IG5lYXJlc3QuZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdCA9IGZvb2RBcnJbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihmb29kQXJyLmxlbmd0aD41KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vZEFyci5sZW5ndGggPSA1O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbC5mb29kKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmZvb2RbdHlwZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmJ5OiBob3RlbC50ZW1wLmZvb2RbdHlwZV0ubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXI1OiBmb29kQXJyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3Q6IGZvb2RBcnJbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuZm9vZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuZm9vZFt0eXBlXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyYnk6IGhvdGVsLnRlbXAuZm9vZFt0eXBlXS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcjU6IGZvb2RBcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDogZm9vZEFyclswXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbCA9IHtmb29kOnt9fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwubG9jYWwuZm9vZFt0eXBlXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJieTogaG90ZWwudGVtcC5mb29kW3R5cGVdLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXI1OiBmb29kQXJyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDogZm9vZEFyclswXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXSl7Ly/sp4Dsl63rs4QgZm9vZCDrsIDsp5Hrj4Trpbwg7ZmV7J247ZWY64qUIOq3uOufsCDrhYDshJ1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXS5wdXNoKG5lYXJieSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXSA9IFtuZWFyYnldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLm5lYXJlc3QucHVzaChuZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5uZWFyYnkucHVzaChuZWFyYnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmaXJzdF9nZW9Db2RlOiBmdW5jdGlvbihjaWQpe1xyXG4gICAgICAgIHZhciBncm9BcnIgPSB0aGlzLmRhdGEubG9jYWwuZm9vZC5ncm9jZXJ5O1xyXG4gICAgICAgIHZhciBnZW9BcnIgPSBbXTtcclxuICAgICAgICB2YXIgaXNHZW9OZWVkZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm9BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGdyb2NlcnkgPSBncm9BcnJbaV07XHJcbiAgICAgICAgICAgIGlmKCFncm9jZXJ5LmNvb3Ipe1xyXG4gICAgICAgICAgICAgICAgZ2VvQXJyLnB1c2goe2FkZHJlc3M6Z3JvY2VyeS5hZGRyZXNzLCBhaWQ6aX0pO1xyXG4gICAgICAgICAgICAgICAgaXNHZW9OZWVkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKCFncm9jZXJ5LmNvb3IubGF0KXtcclxuICAgICAgICAgICAgICAgICAgICBnZW9BcnIucHVzaCh7YWRkcmVzczpncm9jZXJ5LmFkZHJlc3MsIGFpZDppfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNHZW9OZWVkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzR2VvTmVlZGVkKXtcclxuICAgICAgICAgICAgdmFyIHJlZiA9IFwiY2l0aWVzL1wiK2NpZCtcIi9sb2NhbC9mb29kL2dyb2NlcnlcIjtcclxuICAgICAgICAgICAgR2VvQ29kZS5pbml0KGdlb0FyciwgcmVmKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXRGb29kO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRGb29kLmpzIiwiaW1wb3J0IENvbmZpZyBmcm9tIFwiLi4vY29uZmlnLmpzXCI7XHJcblxyXG52YXIgU2V0TWV0cm8gPSB7XHJcbiAgICBkYXRhOnt9LFxyXG4gICAgc3RhdGlzdGljOntuZWFyZXN0OltdfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuZmlyc3Rfc2V0TWV0cm8oKTsgLy/siJnshozrs4TroZwg7KeA7ZWY7LKg7J2EIOuVjOugpOuEo+ydjFxyXG4gICAgICAgIHRoaXMuc2Vjb25kX2J5QXJlYXMoKTtcclxuICAgICAgICB0aGlzLnRoaXJkX21ha2VTY29yZSgpO1xyXG4gICAgICAgIHRoaXMuZm91cnRoX3dvcmRpbmcoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmb3VydGhfd29yZGluZzogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGxldCB0eHRBcnIgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtZXRybyA9IGhvdGVsLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgICAgICBpZihtZXRybyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmVhcmVzdERpZiA9IGRpZlRvTWluKG1ldHJvLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgIHZhciBuZWFyZXN0U3RuID0gbWV0cm8ubmVhcmVzdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdmFyIHR4dCA9IGDsiJnshozsl5DshJwg6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqDsl63snYAgJHtuZWFyZXN0RGlmfSDqsbDrpqzsnZggJHtuZWFyZXN0U3RufeyXrWA7XHJcbiAgICAgICAgICAgICAgICB0eHQucHVzaCh0eHRBcnIpO1xyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHR4dEFyciA9IFtcIuydtCDsiJnshowg64+E67O0IDE167aEIOydtOuCtCDqsbDrpqzsl5Ag7KeA7ZWY7LKgIOyXreydtCDsl4bslrTshJwg64yA7KSR6rWQ7Ya17J2EIOydtOyaqe2VmOq4sCDrtojtjrjtlaAg7IiYIOyeiOydjFwiXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGhpcmRfbWFrZVNjb3JlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBzY29yZUFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgbGV0IG1ldHJvID0gaG90ZWwubG9jYWwubWV0cm87XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBtZXRyb0xpbmVPYmogPSB0aGlzLmRhdGEubWV0cm9MaW5lO1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYobWV0cm8pe1xyXG4gICAgICAgICAgICAgICAgaWYobWV0cm8uYnlMaW5lKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsaW5lTmFtZSBpbiBtZXRyby5ieUxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmUgPSBtZXRyby5ieUxpbmVbbGluZU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSA9ICgxMDAwIC0gbGluZS5kaWYpKihtZXRyb0xpbmVPYmpbbGluZU5hbWVdLnNjb3JlKzI1KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2NvcmVBcnJheS5wdXNoKHtoaWQ6aGlkLHNjb3JlOnNjb3JlfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhzY29yZUFycmF5KTtcclxuXHJcbiAgICAgICAgc2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5tZXRyby5zY29yZS5wZXJjZW50aWxlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IHNjb3JlQXJyYXlbaV0uaGlkO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICB2YXIgcmFuayA9IChpIC8gdG90YWwpOyAvLyDrsLHrtoTsnIRcclxuICAgICAgICAgICAgdmFyIHBlcmNlbnRpbGUgPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlzUmFua2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJhbmtTeXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKCFpc1JhbmtlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbnVzID0gcGVyY2VudGlsZTtcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50aWxlICs9IHJhbmtTeXNbal07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhbms8cGVyY2VudGlsZSl7ICAvLzM1JSDslYjsl5Ag65Ok66m0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmsgLT0gbWludXM7ICAgLy9yYW5r66W8IDB+MC4y66GcIOunnuy2sOykjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSA9ICg5LWopICsgTWF0aC5mbG9vcigocmFuay9yYW5rU3lzW2pdKSoxMCkvMTA7IC8vcmFuaygwfjAuMinrpbwgMC4y66GcIOuCmOuIiOqwkioxMC8xMCAtPiAwfjAuOeqwgCDrgpjsmLRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSYW5rZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudCl7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50LnNjb3JlKXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlLm1ldHJvID0gc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlID0ge21ldHJvOnNjb3JlfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOnttZXRybzpzY29yZX0sXHJcbiAgICAgICAgICAgICAgICAgICAgd29yZDp7bWV0cm86XCJcIn1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlY29uZF9ieUFyZWFzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8v64uk66W4IGxvY2Fs65Ok6rO864qUIOuLrOumrCDsp4DtlZjssqAg7Jet7J2EIEFyZWHrs4TroZwg64KY64iUIC0g7KeA7Jet67OE66GcIOyWtOuWpCDrhbjshKDrk6TsnbQg7KeA64KY6rCA64qU7KeAIOyytO2BrDtcclxuICAgICAgICBsZXQgYXJlYUFyciA9IHRoaXMuZGF0YS5hcmVhO1xyXG4gICAgICAgIGxldCBtZXRyb0FyciA9IHRoaXMuZGF0YS5sb2NhbC5tZXRybztcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZWFBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFyZWEgPSBhcmVhQXJyW2ldO1xyXG4gICAgICAgICAgICBpZighYXJlYS5ub3RBcmVhKXtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWV0cm9BcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWV0cm8gPSBtZXRyb0FycltqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihpc0luQXJlYShtZXRyby5jb29yLCBhcmVhLmNvb3IpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtZXRyby5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGluZSA9IG1ldHJvLmxpbmVba107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXJlYS5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXJlYS5sb2NhbC5tZXRybyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZWEubG9jYWwubWV0cm9bbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSArKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhLmxvY2FsLm1ldHJvW2xpbmVdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhLmxvY2FsLm1ldHJvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwubWV0cm9bbGluZV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwgPSB7bWV0cm86e319O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwubWV0cm9bbGluZV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmaXJzdF9zZXRNZXRybzogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLm1ldHJvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5lYXJlc3Q6e2RpZjpDb25maWcubWV0cm8ubmVhclN0ZH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcjpbXSxcclxuICAgICAgICAgICAgICAgICAgICBieUxpbmU6e31cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBtZXRyb0FyciA9IHRoaXMuZGF0YS5sb2NhbC5tZXRybztcclxuICAgICAgICAgICAgdmFyIGJ5TGluZSA9IGhvdGVsLmxvY2FsLm1ldHJvLmJ5TGluZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0cm9BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXRybyA9IG1ldHJvQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihob3RlbC5jb29yLCBtZXRyby5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkaWY8Q29uZmlnLm1ldHJvLm5lYXJTdGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRyb19jID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb29yOm1ldHJvLmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6bWV0cm8ubGluZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTptZXRyby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6ZGlmLnRvRml4ZWQoMCkqMVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwubWV0cm8ubmVhci5wdXNoKG1ldHJvX2MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihkaWY8aG90ZWwubG9jYWwubWV0cm8ubmVhcmVzdC5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5tZXRyby5uZWFyZXN0ID0gbWV0cm9fYztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWV0cm8ubGluZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGluZSA9IG1ldHJvLmxpbmVbal07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihieUxpbmVbbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYnlMaW5lW2xpbmVdLmRpZiA+IG1ldHJvX2MuZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieUxpbmVbbGluZV0gPSBtZXRyb19jO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5TGluZVtsaW5lXSA9IG1ldHJvX2M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLm5lYXJlc3QucHVzaChob3RlbC5sb2NhbC5tZXRyby5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0TWV0cm87XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldE1ldHJvLmpzIiwidmFyIFNldEFyZWEgPSB7XHJcbiAgICBtYXA6e30sXHJcbiAgICBtYXJrZXI6e30sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24gKGNpdHlOYW1lLCBjaWQpIHtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5tYXJrZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyW2hpZF0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyID0ge307XHJcblxyXG4gICAgICAgICAgICB2YXIgdHh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGgyPicgKyBjaXR5TmFtZSArICcg7IiZ7IaMIOyngOyXrSDqtazrtoQ8L2gyPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiY2l0eUFyZWFfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgaWQ9XCJjaXR5QXJlYV9fbWFwXCI+PC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiXCJjaXR5QXJlYT4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eUFyZWFfX3dvcmRcIj48L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjaWQ9XCInICsgY2lkICsgJ1wiIGNsYXNzPVwiY2l0eUFyZWFfX2ZpbmlzaFwiPuyZhOujjOyymOumrDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JzsgLy9jbG9zZSB3cmFwcGVyXHJcblxyXG4gICAgICAgICAgICAkKFwiLnBhZ2VzLmhvdGVsXCIpLmh0bWwodHh0KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5QXJlYV9fbWFwJyksIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogNDAuNzQzMTk1NzkzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzogLTczLjk4OTE3OTU0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgem9vbTogMTNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhcmVhID0ge307XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9BcmVhID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuYXJlYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhLmFyZWFbaV0ubm90QXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmVhQ29vciA9IGRhdGEuYXJlYVtpXS5jb29yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5BcmVhKGhvdGVsLmNvb3IsIGFyZWFDb29yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXJlYSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0FyZWEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub0FyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcltoaWRdID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBob3RlbC5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJycgKyBoaWRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcmVhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvaG90ZWxzJykudXBkYXRlKGRhdGEuaG90ZWxzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldEFyZWE7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==