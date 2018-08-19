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
            that.refreshStatus();
        });

        $(".city").on("click", ".city__transport", function () {
            that.createMetroLine($(this).parent().attr("id"));
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

    createMetroLine: function createMetroLine(cid) {
        var status = this.data[cid].status;
        if (status.spot > 2 && status.transport > 0) {
            toast("대중교통 정보를 가공합니다.");

            firebase.database().ref("cities/" + cid).once("value", function (snap) {
                var data = snap.val();
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
                        metroLine[line] = [];

                        for (var rank in tempLine[line]) {
                            metroLine[line].push(tempLine[line][rank]);
                        }
                    }
                }
                console.log(metroLine);
                firebase.database().ref("cities/" + cid + "/metroLine").set(metroLine);
            });
        } else {
            toast("대중교통 정보를 가공하기에 자료가 부족합니다.");
        }
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

var _setArea = __webpack_require__(19);

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

var _setSafety = __webpack_require__(18);

var _setSafety2 = _interopRequireDefault(_setSafety);

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
                var score = hotel.assessment.score.metro;
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
                txtArr = ["이 숙소 도보 15분 이내 거리에 지하철 역이 없어서 대중교통을 이용하기 불편할 수 있음"];
            }
            hotel.assessment.word.metro = txtArr;
        }
    },

    third_makeScore: function third_makeScore() {
        var scoreArray = [];
        //1개 관광지를 갈 수 있을 때마다 1800 - dif합계(호텔에서, 내려서)점만큼 추가

        for (var hid in this.data.hotels) {
            var hotel = this.data.hotels[hid];
            var metro = hotel.local.metro;
            var spots = this.data.spots.ranked;
            metro.spot = [];
            var score = 0;
            var metroLineObj = this.data.metroLine;
            var spotObj = {};

            if (metro) {
                for (var lineName in metro.byLine) {
                    var line = metro.byLine[lineName];
                    var difHotel = line.dif;
                    for (var i = 0; i < metroLineObj[lineName].length; i++) {
                        var spot = metroLineObj[lineName][i];
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
                metro.avgDif = avg;
            }
            scoreArray.push({ hid: hid, score: score });
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
var SetSafety = {
    init: function init(data, cityName) {
        console.log(this.data);
    }
};

exports.default = SetSafety;

/***/ }),
/* 19 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjdlMjQxNTU0MTk2ZmU2NmRmMTgiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY29uZmlnLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvZ2VvQ29kZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9hdHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvY2l0eS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvZmlyc3RfY2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9hdXRvQ29tYmluZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L3Nlb25kX2NvbWJpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC90aGlyZF9maW5hbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9hY2NvdW50LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3N1YndheS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEFUTS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0Rm9vZC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0TWV0cm8uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldFNhZmV0eS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0QXJlYS5qcyJdLCJuYW1lcyI6WyJDb25maWciLCJtZXRybyIsIm5lYXJTdGQiLCJzY29yZSIsInBlcmNlbnRpbGUiLCJmb29kIiwia2luZCIsImJha2VyeSIsIm5hbWUiLCJ0eXBlIiwiam9zYSIsInN0ZCIsImdyb2NlcnkiLCJzZXZlbiIsImZhbWlseSIsImxhd3NvbiIsImxhcmdlIiwibXVsdGlwbGUiLCJjdnMiLCJ3ZWlnaHQiLCJuZWFyZXN0IiwiaW4yNTAiLCJ3b3JkIiwiaW50ZWdyYXRlIiwiYmFuazI0IiwiYXRtIiwiaW4xMzAiLCJHZW9Db2RlIiwiaW5pdCIsImFyciIsInJlZiIsImZpcmViYXNlIiwiZGF0YWJhc2UiLCJvbmNlIiwiZGF0YSIsInNuYXAiLCJ2YWwiLCJsZW5ndGgiLCJzZXQiLCJjb2RlIiwidG9hc3QiLCJ0aGF0IiwiZ2VvY29kZXIiLCJnb29nbGUiLCJtYXBzIiwiR2VvY29kZXIiLCJhZGRyZXNzIiwiYWlkIiwiZ2VvY29kZSIsInJlc3VsdHMiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwiY29vciIsImxhdCIsImdlb21ldHJ5IiwibG9jYXRpb24iLCJsbmciLCJzaGlmdCIsInNldFRpbWVvdXQiLCJyZWxvYWQiLCJpbml0aWFsaXplZCIsInVfaSIsIk5hdl9mdW5jdGlvbiIsImF0dGVuZCIsInRvZG8iLCJjaXR5IiwibWFwIiwiYWNjb3VudCIsInNwb3QiLCJjYWxjIiwiaG90ZWwiLCJsaW5rIiwibG9naW4iLCIkIiwiaHRtbCIsImF0dHIiLCJjbGljayIsImNvbmZpcm0iLCJhdXRoIiwic2lnbk91dCIsInRoZW4iLCJ3aW5kb3ciLCJjYXRjaCIsImVycm9yIiwiZG9jdW1lbnQiLCJyZWFkeSIsInByb3ZpZGVyIiwiR29vZ2xlQXV0aFByb3ZpZGVyIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwidXNlciIsIm1haWwiLCJlbWFpbCIsInNwbGl0IiwiZ3JhZGUiLCJzaWduSW5XaXRoUG9wdXAiLCJyZXN1bHQiLCJ1c2VyTWFpbCIsImRpc3BsYXlOYW1lIiwic2V0dGluZyIsIm9yZGVyIiwiZXJyb3JDb2RlIiwiZXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNyZWRlbnRpYWwiLCJoYXNDbGFzcyIsIml0ZW0iLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicGFyZW50IiwiQXR0ZW5kIiwibW9iaWxlIiwiaWQiLCJ2aWV3SUQiLCJhdHRlbmRPYmoiLCJzYWxhcnkiLCJ3ZWVrZGF5cyIsInR4dCIsInVzZXJzIiwibWFpbElEIiwicHJvcCIsIm9uIiwiaW5mbGF0ZV9jYWxlbmRhciIsImZ1bGxDYWxlbmRhciIsImhlaWdodCIsImZpcnN0RGF5Iiwidmlld1JlbmRlciIsInZpZXciLCJlbGVtZW50IiwiZGF5Q2xpY2siLCJkYXRlIiwiaW5wdXRXb3JrSG91ciIsImxpc3RlbmVyIiwic2V0V29ya0hvdXIiLCJrZXl1cCIsImUiLCJ3aGljaCIsImNoYW5nZSIsInZpZXdfd29ya2VyIiwib2ZmIiwieW8iLCJkYXRlSUQiLCJzbGljZSIsImRpZiIsImZyb20iLCJ0byIsImkiLCJNYXRoIiwiZmxvb3IiLCJkdXJNb24iLCJ0aGlzTW9udGgiLCJkYXRlRG9tIiwiZXEiLCJqIiwid2Vla0RvbSIsIndlZWtEdXIiLCJkYXlEb20iLCJmaW5kIiwiayIsImNoaWxkcmVuIiwiYXBwZW5kIiwiZnVsbE1vbnRoQm9udXMiLCJpbnN1cmFuY2VGZWUiLCJiYXNpYyIsInJvdW5kIiwiZnVsbFdlZWtCdW51cyIsImNvbW1hIiwiZGF0ZU9iaiIsImRhdGVTaG9ydCIsIm1vbWVudCIsImZvcm1hdCIsIkFueVBpY2tlciIsImRhdGVUaW1lRm9ybWF0IiwiZm9jdXMiLCJ3b3JrIiwiYWxsRW1wdHkiLCJyZW1vdmUiLCJhbGVydCIsImZyb21BIiwidG9BIiwicHVzaCIsIkNpdHkiLCJyZWZyZXNoU3RhdHVzIiwiY3JlYXRlTWV0cm9MaW5lIiwiaW5mbGF0ZSIsInRyYW5zcG9ydCIsImFyZWEiLCJwcmljZSIsImNpZCIsInNwb3RzIiwicmFua2VkIiwibWF4IiwibWV0cm9zIiwibG9jYWwiLCJtZXRyb0xpbmUiLCJ0ZW1wTGluZSIsImhhc1Nwb3QiLCJ0ZW1wRGlmIiwiZW50ZXJhbmNlIiwiZW50IiwiY2FsY3VsYXRlRGlmIiwibGluZSIsInJhbmsiLCJzdG4iLCJob3RlbHMiLCJPYmplY3QiLCJrZXlzIiwiYXNzZXNzbWVudCIsInVwZGF0ZSIsIlNwb3QiLCJjaXRpZXMiLCJjdXJyZW50IiwiaW5mbGF0ZV9zdGF0dXMiLCJpbmZsYXRlX2NpdHkiLCJ1aWQiLCJyZW1vdmVfc3BvdCIsInJlZG9fcmVtb3ZlIiwib3JkZXJBcnJheSIsImlkeCIsImNoYW5nZWQiLCJzb3J0IiwiYSIsImIiLCJzdGF0dXNBcnJheSIsImNpdHlOYW1lIiwiRmlyc3RfQ2hlY2siLCJzZXRSZW1haW5OdW1iZXIiLCJzaWQiLCJzaXRlTm9kYXRhIiwiZGVsZXRlU3BvdCIsImlucHV0Q29vcmRpbmF0ZSIsInNpdGUiLCJudW1iZXIiLCJjdXRObyIsInRyaW0iLCJjdXRPYmoiLCJubyIsImRlbGV0ZWQiLCJjb29yVHh0IiwiaXNOYU4iLCJoYXNQcm9ibGVtIiwic2VhcmNoVXJsIiwic2l0ZU9iaiIsImdnIiwibnYiLCJ0YSIsImxwIiwic2l0ZUhhc1Byb2JsZW0iLCJub0Nvb3IiLCJub0Nvb3JUeHQiLCJub1Nwb3QiLCJub1Nwb3RUeHQiLCJub2RhdGEiLCJoYXNDb29yIiwibGFyZ2VPSyIsImxhcmdlRGF0YSIsInNjcm9sbFRvcCIsIkF1dG9Db21iaW5lIiwic2l0ZUFyciIsImNvbWJpbmluZyIsImNvdW50ZXIiLCJub0RhdGEiLCJvbGRTcG90Iiwia28iLCJlbiIsInRlc3QiLCJ1cmwiLCJ0YWciLCJjb21iaW5lT2JqIiwiY29tYmluZWQiLCJjb21iaW5lIiwiaGFzQ29tYmluZWQiLCJ0Q29kZSIsInRTcG90Iiwia2V5IiwiU2Vjb25kX2NvbWJpbmUiLCJUaGlyZF9maW5hbGl6ZSIsInRlbXAiLCJzcG90T2JqIiwic3BvdE5hbWUiLCJyYW5rQXJyIiwic3BvdFRvdGFsIiwiaW5kaXZpZHVhbEFyciIsIm1pblJhbmsiLCJzcXJ0IiwicmFua2luZyIsInB1c2hBcnIiLCJBY2NvdW50IiwiU3Vid2F5IiwibWFya2VyIiwiTWFwIiwiZ2V0RWxlbWVudEJ5SWQiLCJjZW50ZXIiLCJ6b29tIiwibWFwVHlwZUNvbnRyb2wiLCJzY2FsZUNvbnRyb2wiLCJmdWxsc2NyZWVuQ29udHJvbCIsImFkZExpc3RlbmVyIiwiZmluZFN1YndheSIsImxhdExuZyIsInNldE1hcCIsIk1hcmtlciIsInBvc2l0aW9uIiwibWV0cm9JbmZvIiwibWV0cm9CeVN0biIsIm1ldHJvTmFtZSIsImNvbmNhdCIsIm1ldEFycmF5IiwibWV0U3RuQXJyYXkiLCJjZWlsIiwiSG90ZWwiLCJoaWQiLCJjaGVjayIsImFsZXJ0TW9kYWwiLCJTZXRIb3RlbEluZm8iLCJjaGVja1R4dCIsInZpc2EiLCJjaXRpIiwic2FmZXR5IiwidGhlbWUiLCJjb252ZW5pZW5jZSIsIkFycmF5IiwiaXNBcnJheSIsIlNldEFUTSIsInN0YXRpc3RpYyIsImJ5QXJlYSIsImZpcnN0X2J5SG90ZWxzIiwic2Vjb25kX2J5QXJlYXMiLCJ0aGlyZF9tYWtlU3RhdHMiLCJmb3VydGhfbWFrZVJhbmsiLCJmaWZ0aF9tYWtlU2NvcmUiLCJzaXh0aF93b3JkaW5nIiwiYXRtQXJyIiwiYXRtT2JqIiwib3duZXIiLCJpbmNsdWRlcyIsInBsYWNlTmFtZSIsImlzMjQiLCJlcnJObyIsInN1bSIsIm5vdEFyZWEiLCJhdG1zIiwibWludXMiLCJ0b0ZpeGVkIiwic3RhdCIsInRvdGFsIiwiaW5kZXhPZiIsInNjb3JlQXJyYXkiLCJyYW5rU3lzIiwiaXNSYW5rZWQiLCJ0ZmMiLCJjb25maWciLCJpblN0ZCIsImRpZlRvTWluIiwiZGlmMjQiLCJTZXRGb29kIiwibmVhcmJ5IiwiZmlyc3RfZ2VvQ29kZSIsInNlY29uZF9zZXRGb29kIiwidGhpcmRfYnlBcmVhcyIsImZvdXJ0aF9tYWtlU3RhdHMiLCJnZGlmIiwibmVhcmVzdERpZiIsImZvb2RzIiwiaXNTb21lRm9vZCIsImdyb0FyciIsImZvb2RBcnIiLCJjb3B5IiwiZXh0ZW5kIiwibmVhcjUiLCJnZW9BcnIiLCJpc0dlb05lZWRlZCIsIlNldE1ldHJvIiwiZmlyc3Rfc2V0TWV0cm8iLCJ0aGlyZF9tYWtlU2NvcmUiLCJmb3VydGhfd29yZGluZyIsInRvdGFsTGluZSIsInR4dEFyciIsIm5lYXJlc3RTdG4iLCJsaW5lTm8iLCJieUxpbmUiLCJzcG90Tm8iLCJhdmdUaW1lIiwiYXZnRGlmIiwibWV0cm9MaW5lT2JqIiwibGluZU5hbWUiLCJkaWZIb3RlbCIsImRpZlNwb3QiLCJhdmciLCJob3RlbFNwb3QiLCJzcG90TWV0cm9OYW1lIiwiYXJlYUFyciIsIm1ldHJvQXJyIiwiaXNJbkFyZWEiLCJuZWFyIiwibWV0cm9fYyIsIlNldFNhZmV0eSIsIlNldEFyZWEiLCJub0FyZWEiLCJhcmVhQ29vciIsImxhYmVsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBSUEsU0FB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SUFBTCxDQUFVeEMsQ0FBVixFQUFhN0YsSUFBNUI7O0FBRUEsNEJBQUlvVixTQUFTbFUsTUFBTWxCLElBQWYsRUFBcUIwVixRQUFyQixDQUFKLEVBQW9DO0FBQ2hDeFUsa0NBQU1tSCxJQUFOLEdBQWF4QyxDQUFiO0FBQ0E0UCxxQ0FBUyxLQUFUO0FBQ0EsZ0NBQUdwTixLQUFLeEMsQ0FBTCxDQUFILEVBQVc7QUFDUHdDLHFDQUFLeEMsQ0FBTDtBQUNILDZCQUZELE1BRUs7QUFDRHdDLHFDQUFLeEMsQ0FBTCxJQUFVLENBQVY7QUFDSDtBQUNKO0FBQ0o7QUFDSjs7QUFFRCxvQkFBSTRQLE1BQUosRUFBWTtBQUNSLDBCQUFLN0csTUFBTCxDQUFZc0IsR0FBWixJQUFtQixJQUFJNVEsT0FBT0MsSUFBUCxDQUFZaVEsTUFBaEIsQ0FBdUI7QUFDdENDLGtDQUFVdk8sTUFBTWxCLElBRHNCO0FBRXRDYyw2QkFBSyxNQUFLQSxHQUY0QjtBQUd0QzZVLCtCQUFPLEtBQUt6RjtBQUgwQixxQkFBdkIsQ0FBbkI7QUFLSDtBQUNKO0FBQ0RwUSxvQkFBUUMsR0FBUixDQUFZc0ksSUFBWjs7QUFFQTNKLHFCQUFTQyxRQUFULEdBQW9CRixHQUFwQixDQUF3QixZQUFZOEosR0FBWixHQUFrQixTQUExQyxFQUFxRG9CLE1BQXJELENBQTREOUssS0FBSzBLLE1BQWpFO0FBQ0gsU0FwRUQ7QUFxRUg7QUEzRVMsQ0FBZDs7a0JBOEVlaU0sTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY3ZTI0MTU1NDE5NmZlNjZkZjE4IiwidmFyIENvbmZpZyA9IHtcclxuICAgIG1ldHJvOntcclxuICAgICAgICBuZWFyU3RkOjc1MCxcclxuXHJcbiAgICAgICAgc2NvcmU6e1xyXG4gICAgICAgICAgICBwZXJjZW50aWxlIDogWzAuMTUsIDAuMiwgMC4yNSwgMC4yLCAwLjEsIDAuMV0sIC8vOSwgOCwgNy4uLuygkOuMgOydmCDrsLHrtoTsnIQg67mE7JyoIC0g7ZWp6rOEIDEg65CY7Ja07JW8IO2VqCEhIVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZm9vZDp7XHJcbiAgICAgICAga2luZDp7XHJcbiAgICAgICAgICAgIGJha2VyeTp7IC8v7J2867CY7KCBIOuyoOydtOy7pOumrCDstJ3sua1cclxuICAgICAgICAgICAgICAgIG5hbWU6XCLrsqDsnbTsu6TrpqxcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6XCLrsqDsnbTsu6TrpqxcIixcclxuICAgICAgICAgICAgICAgIGpvc2E6XCLqsIBcIixcclxuICAgICAgICAgICAgICAgIHN0ZDoyNTAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ3JvY2VyeTp7IC8v7J2867CY7KCBIOyLneujjO2SiOygkCDstJ3sua1cclxuICAgICAgICAgICAgICAgIG5hbWU6XCLsi53ro4ztkojsoJBcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6XCLsi53ro4ztkojsoJBcIixcclxuICAgICAgICAgICAgICAgIGpvc2E6XCLsnbRcIixcclxuICAgICAgICAgICAgICAgIHN0ZDoyNTAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V2ZW46e1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIuyEuOu4kOydvOugiOu4kFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcIu2OuOydmOygkFwiLFxyXG4gICAgICAgICAgICAgICAgam9zYTpcIuydtFwiLFxyXG4gICAgICAgICAgICAgICAgc3RkOjIwMCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYW1pbHk6e1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIu2MqOuwgOumrOuniO2KuFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcIu2OuOydmOygkFwiLFxyXG4gICAgICAgICAgICAgICAgam9zYTpcIuydtFwiLFxyXG4gICAgICAgICAgICAgICAgc3RkOjIwMCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsYXdzb246e1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIuuhnOyGkFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcIu2OuOydmOygkFwiLFxyXG4gICAgICAgICAgICAgICAgam9zYTpcIuydtFwiLFxyXG4gICAgICAgICAgICAgICAgc3RkOjIwMCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsYXJnZTp7XHJcbiAgICAgICAgICAgICAgICBuYW1lOlwi64yA7ZiV66eI7Yq4XCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOlwi64yA7ZiV66eI7Yq4XCIsXHJcbiAgICAgICAgICAgICAgICBqb3NhOlwi6rCAXCIsXHJcbiAgICAgICAgICAgICAgICBtdWx0aXBsZToyLCAvL+ydtOuFgOyEneydtCDso7zrs4Dsl5Ag7J6I7Jy866m0IDLrsLAg7KKL7J2A64aIIOy3qOq4iVxyXG4gICAgICAgICAgICAgICAgc3RkOjUwMCAgICAgLy/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDtmLjthZQg7KO867OA7Jy866GcIOyduOygle2VmOuCmFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBuZWFyU3RkOnsvL+yWvOuniOuCmCDqsIDquYzsnbQg7J6I7Ja07JW8IOu2gOq3vOyXkCDsnojripTqsbjroZwg7J247KCV7ZWg6rKD7J2064OQXHJcbiAgICAgICAgICAgIGxhcmdlOjUwMCxcclxuICAgICAgICAgICAgZ3JvY2VyeToyNTAsXHJcbiAgICAgICAgICAgIGN2czoyNTAsIFxyXG4gICAgICAgICAgICBiYWtlcnk6MjUwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29yZTp7XHJcbiAgICAgICAgICAgIHBlcmNlbnRpbGUgOiBbMC4xNSwgMC4yLCAwLjI1LCAwLjIsIDAuMSwgMC4xXSwgLy85LCA4LCA3Li4u7KCQ64yA7J2YIOuwseu2hOychCDruYTsnKggLSDtlanqs4QgMSDrkJjslrTslbwg7ZWoISEhXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3ZWlnaHQ6eyAvL0FUTSDsoJDsiJjrpbwg7IKw7Lac7ZWgIOuVjCDqsIDspJHsuZgo7Iir7J6QIOuLqOychCDrrLTqtIApXHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0OjMuNSxcclxuICAgICAgICAgICAgICAgIGluMjUwOiAxLFxyXG4gICAgICAgICAgICAgICAgbGFyZ2U6MTBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHdvcmQ6e1xyXG4gICAgICAgICAgICBpbnRlZ3JhdGU6eyAvL+qwgOyepSDqsIDquYzsmrQgZm9vZOqwgCBsYXJnZSjsnbTqsbDrgpggMTBtIOuvuOunjCDqsbDrpqzssKjsnbQpKVxyXG4gICAgICAgICAgICAgICAgc3RkOlswLjE1LCAwLjM1LCAwLjZdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzroZwg66ek7JqwIOqwgOq5jOydtOyXkCDsnojsnYwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcIOqwgOq5jOyatCDtjrguIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBiYW5rMjQ6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjM1LDAuN10sIFxyXG4gICAgICAgICAgICAgICAgd29yZDpbXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOqzoCwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcLCDqsIDquYzsmrQg7Y64LiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqwg65ao7Ja07KeEIOyjvOychOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5lYXJlc3Q6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjEsMC4yNSwwLjRdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIiwgLy8xODA4MTAgLSDtj4nqsIDrpbwg7J2864uoIOyViCDtlZjquLDroZwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXRtOntcclxuICAgICAgICBzY29yZTp7XHJcbiAgICAgICAgICAgIHBlcmNlbnRpbGUgOiBbMC4xNSwgMC4yLCAwLjI1LCAwLjIsIDAuMSwgMC4xXSwgLy85LCA4LCA3Li4u7KCQ64yA7J2YIOuwseu2hOychCDruYTsnKggLSDtlanqs4QgMSDrkJjslrTslbwg7ZWoISEhXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3ZWlnaHQ6eyAvL0FUTSDsoJDsiJjrpbwg7IKw7Lac7ZWgIOuVjCDqsIDspJHsuZgo7Iir7J6QIOuLqOychCDrrLTqtIApXHJcbiAgICAgICAgICAgICAgICBiYW5rMjQ6NCxcclxuICAgICAgICAgICAgICAgIG5lYXJlc3Q6My43NSxcclxuICAgICAgICAgICAgICAgIGluMTMwOiAwLjVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICBcclxuICAgICAgICB3b3JkOntcclxuICAgICAgICAgICAgaW50ZWdyYXRlOnsgLy/qsIDsnqUg6rCA6rmM7Jq0IEFUTeydtCAyNOyLnOqwhCDsmKTtlIjtlZjripQg7J2A7ZaJIOyGjOycoCjsnbTqsbDrgpggMTBtIOuvuOunjCDqsbDrpqzssKjsnbQpKVxyXG4gICAgICAgICAgICAgICAgc3RkOlswLjE1LCAwLjM1LCAwLjZdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzroZwg66ek7JqwIOqwgOq5jOydtOyXkCDsnojsnYwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcIOqwgOq5jOyatCDtjrguIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBiYW5rMjQ6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjM1LDAuN10sIFxyXG4gICAgICAgICAgICAgICAgd29yZDpbXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOqzoCwgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcLCDqsIDquYzsmrQg7Y64LiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqwg65ao7Ja07KeEIOyjvOychOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5lYXJlc3Q6e1xyXG4gICAgICAgICAgICAgICAgc3RkOlswLjEsMC4yNSwwLjRdLCAvL+uere2CueydtCDtlbTri7kg67Cx67aE7JyEIOyViOyXkCDrk6Qg6rK97JqwXHJcbiAgICAgICAgICAgICAgICB3b3JkOlsgLy93b3Jk64qUIHN0ZOuztOuLpCDtlZjrgpgg66eO7JWE7JW8IO2VqC4o7J20IOqyveyasCA3MCUg64K07JeQIOuquyDrk6Tsl4jsnYQg6rK97Jqw7J2YIOybjOuUqSlcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIiwgLy8xODA4MTAgLSDtj4nqsIDrpbwg7J2864uoIOyViCDtlZjquLDroZwg7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCJcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9jb25maWcuanMiLCJ2YXIgR2VvQ29kZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGFyciwgcmVmKXtcclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgaWYoIWRhdGEpeyAgLy/ri6Trpbgg7KeA7Jik7L2U65SpIOyekeyXheykkeydtOudvOuptCDsoIjrjIAg642u7Ja07I2o7ISc64qUIOyViCDrkKg7XHJcbiAgICAgICAgICAgICAgICBpZihhcnIubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidGVtcC9nZW9jb2RlXCIpLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjpyZWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycjphcnJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY29kZShhcnIsIHJlZik7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyngOyYpOy9lOuUqSDsnpHsl4XsnYQg7Iuc7J6R7ZWp64uI64ukLiDsl6zrn6zrsogg7IOI66Gc6rOg7LmoIOuQoCDsiJgg7J6I7Iq164uI64ukLlwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY29kZTogZnVuY3Rpb24oYXJyLCByZWYpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgbGV0IGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XHJcbiAgICAgICAgdmFyIGFkZHJlc3MgPSBhcnJbMF0uYWRkcmVzcztcclxuICAgICAgICB2YXIgYWlkID0gYXJyWzBdLmFpZDtcclxuXHJcbiAgICAgICAgZ2VvY29kZXIuZ2VvY29kZSggeydhZGRyZXNzJzogYWRkcmVzc30sIGZ1bmN0aW9uKHJlc3VsdHMsIHN0YXR1cykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0dXMpXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gJ09LJykge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb29yID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDpyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzpyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYocmVmK1wiL1wiK2FpZCtcIi9jb29yXCIpLnNldChjb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihhcnIubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvZGUoYXJyLCByZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidGVtcC9nZW9jb2RlXCIpLnNldChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLsp4DsmKTsvZTrlKkg7J6R7JeF7J20IOyZhOujjOuQmOyXiOyKteuLiOuLpC5cIilcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoc3RhdHVzID09PSAnWkVST19SRVNVTFRTJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuyngOyYpOy9lOuUqSDqsrDqs7zqsIAg7JeG64qUIO2VreuqqeydtCDsnojsirXri4jri6QuIOy9mOyGlOywveydhCDssLjqs6DtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6cmVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnI6YXJyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2VvQ29kZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2dlb0NvZGUuanMiLCJpbXBvcnQgQXR0ZW5kIGZyb20gXCIuL3BhZ2VzL2F0dGVuZC5qc1wiO1xyXG5pbXBvcnQgQ2l0eSBmcm9tIFwiLi9wYWdlcy9jaXR5LmpzXCI7XHJcbmltcG9ydCBTcG90IGZyb20gXCIuL3BhZ2VzL3Nwb3QuanNcIjtcclxuaW1wb3J0IEFjY291bnQgZnJvbSBcIi4vcGFnZXMvYWNjb3VudC5qc1wiO1xyXG5pbXBvcnQgU3Vid2F5IGZyb20gXCIuL3BhZ2VzL3N1YndheS5qc1wiO1xyXG5pbXBvcnQgSG90ZWwgZnJvbSBcIi4vcGFnZXMvaG90ZWwuanNcIjtcclxuaW1wb3J0IEdlb0NvZGUgZnJvbSBcIi4vbW9kdWxlcy9nZW9Db2RlLmpzXCI7XHJcblxyXG52YXIgaW5pdGlhbGl6ZWQgPSB7fTtcclxuXHJcbnZhciB1X2kgPSB7fTtcclxuXHJcbnZhciBOYXZfZnVuY3Rpb24gPSB7XHJcbiAgICBhdHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBBdHRlbmQuaW5pdCh1X2kpO1xyXG4gICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgdG9kbzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBjaXR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgQ2l0eS5pbml0KHVfaSk7XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQuY2l0eSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgbWFwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgU3Vid2F5LmluaXQoKTtcclxuICAgIH0sXHJcbiAgICBhY2NvdW50OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIHNwb3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBTcG90LmluaXQodV9pKTtcclxuICAgICAgICBpbml0aWFsaXplZC5zcG90ID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBjYWxjOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGhvdGVsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgSG90ZWwuaW5pdCgpO1xyXG4gICAgfSxcclxuICAgIGxpbms6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBsb2dpbihuYW1lKXtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5odG1sKG5hbWVbMV0rXCLtlZghXCIpO1xyXG4gICAgJChcIi5oZWxsb1dvcmxkXCIpLmF0dHIoXCJ0aXRsZVwiLG5hbWUrXCLri5gg7JWI64WV7ZWY7IS47JqUIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGNvbmZpcm0obmFtZStcIuuLmCDroZzqt7jslYTsm4Mg7ZWY7Iuc6rKg7Iq164uI6rmMP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgLy8gQW4gZXJyb3IgaGFwcGVuZWQuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHByb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCk7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgbGV0IG1haWwgPSB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF07XHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2VvQ29kZS5jb2RlKGRhdGEuYXJyLCBkYXRhLnJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLsp4DsmKTsvZTrlKkg7J6R7JeF7J2EIOydtOyWtOyEnCDsp4Ttlontlanri4jri6QuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/slYTrnpgg64K07Jqp7J2EIOuwlOq+uOuptCBpZiAoIWlzVXNlcikg67aA67aE7JeQ64+EIOuwmOuTnOyLnCDrsJjsmIHtlbTspITqsoNcclxuICAgICAgICAgICAgICAgIC8vIGZvciAodmFyIGdpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZGF0YVtnaWRdLlxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikudXBkYXRlKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW21haWxdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdV9pID0gZGF0YVttYWlsXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JhZGUgPSB1X2kuZ3JhZGUgKiAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dGVuZC5pbml0KGRhdGFbbWFpbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGUgPT09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjY291bnQuaW5pdChtYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmFjY291bnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luKHVfaS5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIFVzZXIgaXMgc2lnbmVkIGluLlxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBObyB1c2VyIGlzIHNpZ25lZCBpbi5cclxuICAgICAgICAgICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhQb3B1cChwcm92aWRlcikudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyID0gcmVzdWx0LnVzZXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlck1haWwgPSB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbdXNlck1haWxdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVfaSA9IGRhdGFbdXNlck1haWxdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JhZGUgPSB1X2kuZ3JhZGUgKiAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXR0ZW5kLmluaXQoZGF0YVt1c2VyTWFpbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjb3VudC5pbml0KHVzZXJNYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hY2NvdW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkLmF0dGVuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dpbih1X2kubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3VzZXJzLycgKyB1c2VyTWFpbCkuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5kaXNwbGF5TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haWw6IHVzZXJNYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBcImFiY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCdjb2RlOicgKyBlcnJvci5jb2RlICsgJyAtIOydvOyLnOyggeyduCDrrLjsoJzqsIAg67Cc7IOd7ZaI7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqULicpO1xyXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIEVycm9ycyBoZXJlLlxyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yQ29kZSA9IGVycm9yLmNvZGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBlbWFpbCBvZiB0aGUgdXNlcidzIGFjY291bnQgdXNlZC5cclxuICAgICAgICAgICAgICAgIHZhciBlbWFpbCA9IGVycm9yLmVtYWlsO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGZpcmViYXNlLmF1dGguQXV0aENyZWRlbnRpYWwgdHlwZSB0aGF0IHdhcyB1c2VkLlxyXG4gICAgICAgICAgICAgICAgdmFyIGNyZWRlbnRpYWwgPSBlcnJvci5jcmVkZW50aWFsO1xyXG4gICAgICAgICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4kKFwiLm5hdl9faXRlbVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBpZighJCh0aGlzKS5oYXNDbGFzcygnbmF2X19pdGVtLS1oYXNEcmF3ZXInKSl7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpLmF0dHIoXCJpZFwiKS5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgICAgICQoXCIubmF2PipcIikucmVtb3ZlQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIi5wYWdlcy5cIiArIGl0ZW0pLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgICAgIGlmKCFpbml0aWFsaXplZFtpdGVtXSl7XHJcbiAgICAgICAgICAgIE5hdl9mdW5jdGlvbltpdGVtXSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4kKFwiLm5hdl9fZHJhd2VyX19pdGVtXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaXRlbSA9ICQodGhpcykuYXR0cihcImlkXCIpLnNwbGl0KFwiX1wiKVsxXTtcclxuXHJcbiAgICAkKFwiLm5hdj4qXCIpLnJlbW92ZUNsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYWRkQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG5cclxuICAgICQoXCIubmF2X19kcmF3ZXJfX2l0ZW1cIikucmVtb3ZlQ2xhc3MoXCJuYXZfX2RyYXdlcl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwibmF2X19kcmF3ZXJfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG5cclxuICAgICQoXCIucGFnZXNcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIucGFnZXMuXCIgKyBpdGVtKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgIGlmICghaW5pdGlhbGl6ZWRbaXRlbV0pIHtcclxuICAgICAgICBOYXZfZnVuY3Rpb25baXRlbV0oKTtcclxuICAgIH1cclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ2YXIgQXR0ZW5kID0ge1xyXG4gICAgbW9iaWxlOiBmYWxzZSxcclxuXHJcbiAgICBpZDogXCJcIixcclxuXHJcbiAgICB2aWV3SUQ6IFwiXCIsXHJcbiAgICAvL+q0gOumrOyekOqwgCDri6Trpbgg7IKs656M7J2YIElEIO2ZleyduOykkVxyXG5cclxuICAgIGF0dGVuZE9iajoge30sXHJcblxyXG4gICAgc2FsYXJ5OiB7fSxcclxuXHJcblxyXG4gICAgd2Vla2RheXM6IFtcIuydvFwiLCBcIuyblFwiLCBcIu2ZlFwiLCBcIuyImFwiLCBcIuuqqVwiLCBcIuq4iFwiLCBcIu2GoFwiLCBcIuydvFwiXSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbih1X2kpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB2YXIgZ3JhZGUgPSB1X2kuZ3JhZGU7XHJcbiAgICAgICAgdmFyIGlkID0gdV9pLmlkO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcblxyXG4gICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICB0eHQrPSc8c2VsZWN0IGNsYXNzPVwid29ya2VyX3NlbGVjdG9yXCI+PC9zZWxlY3Q+JztcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX190b3BcIj4nO1xyXG4gICAgICAgIHR4dCArPSAgICc8ZGl2IGlkPVwiY2FsZW5kYXJcIiBjbGFzcz1cImF0dGVuZF9fY2FsZW5kYXJcIj48L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSAgICc8ZGl2IGNsYXNzPVwiYXR0ZW5kX193ZWVrXCI+PC9kaXY+JztcclxuICAgICAgICB0eHQgKz0nPC9kaXY+JztcclxuICAgICAgICB0eHQgKz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhcIj48L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLmF0dGVuZFwiKS5odG1sKHR4dCkucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhY2NvdW50L3NhbGFyeVwiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdGhhdC5zYWxhcnkgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICBpZihncmFkZSA9PT0gNSl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmdWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJzID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHh0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbWFpbElEIGluIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVzZXJzW21haWxJRF0uZ3JhZGUqMTw1KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPG9wdGlvbiB2YWx1ZT1cIicgKyBtYWlsSUQgKyAnXCI+JyArIHVzZXJzW21haWxJRF0ubmFtZSArICc8L29wdGlvbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIud29ya2VyX3NlbGVjdG9yXCIpLmh0bWwodHh0KS52YWwoaWQpLnByb3AoXCJzZWxlY3RlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5sb2FkaW5nVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ZW5kT2JqID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoISQoXCIuZmMtaGVhZGVyLXRvb2xiYXJcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTY0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheUNsaWNrOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0V29ya0hvdXIoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLm9uKFwiY2xpY2tcIiwgXCIuY29uZmlybVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZighJChcIi5hdHRlbmRcIikuaGFzQ2xhc3MoJ2Rpc3BsYXlOb25lJykpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRXb3JrSG91cigkKHRoaXMpLmF0dHIoXCJkaWRcIikpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLm1vZGFsXCIpLm9uKFwiY2xpY2tcIiwgXCIuY2xvc2VcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKCEkKFwiLmF0dGVuZFwiKS5oYXNDbGFzcygnZGlzcGxheU5vbmUnKSkge1xyXG4gICAgICAgICAgICAgICAgJChcIi5ibGFja1NjcmVlblwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiYm9keVwiKS5rZXl1cChmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgaWYgKCEkKFwiLmF0dGVuZFwiKS5oYXNDbGFzcygnZGlzcGxheU5vbmUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIubW9kYWwgLmNvbmZpcm1cIikubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBlLndoaWNoOyAvLyByZWNvbW1lbmRlZCB0byB1c2UgZS53aGljaCwgaXQncyBub3JtYWxpemVkIGFjcm9zcyBicm93c2Vyc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRXb3JrSG91cigkKFwiLm1vZGFsIC5jb25maXJtXCIpLmF0dHIoXCJkaWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIud29ya2VyX3NlbGVjdG9yXCIpLmNoYW5nZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X3dvcmtlcihpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHZpZXdfd29ya2VyOiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZihpZCA9PT0gdGhhdC5pZCl7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19jYWxlbmRhclwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fbW9udGhcIikuaHRtbChcIlwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX2NhbGVuZGFyXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgICAgIGlmKHRoYXQudmlld0lELmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoYXQudmlld0lEKS5vZmYoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIraWQpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmF0dGVuZE9iaiA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeW8gPSB0aGF0LnZpZXdJRDtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlld0lEID0gaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoeW8ubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhhdC5pZCAhPT0gdGhhdC52aWV3SUQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheUNsaWNrOiBmdW5jdGlvbihkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRXb3JrSG91cihkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX2NhbGVuZGFyOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAkKFwiLmF0dGVuZFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuZmMtZGF5XCIpLmh0bWwoXCJcIik7XHJcblxyXG4gICAgICAgIGlmKGRhdGEuYXR0ZW5kKXtcclxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuYXR0ZW5kO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkYXRlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlSUQgPSBkYXRlLnNsaWNlKDAsNCkrXCItXCIrZGF0ZS5zbGljZSg0LDYpK1wiLVwiK2RhdGUuc2xpY2UoNiw4KTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHR4dCA9ICc8cD4nK2RhdGFbZGF0ZV1bMF0uZnJvbStcIn5cIitkYXRhW2RhdGVdWzBdLnRvKyc8L3A+JztcclxuICAgICAgICAgICAgICAgIC8v65GQ7YOA7J6EIOuCmOuIoOyEnCDqt7zrrLTtlojslrTrj4Qg64us66Cl7JeQIO2RnOyLnOuQmOuKlCDqsoPsnYAg7LKr7YOA7J6EIOq3vOustOyLnOqwhOunjFxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZiArPSBkYXRhW2RhdGVdW2ldLmRpZjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0eHQrPSc8cD4nICsgTWF0aC5mbG9vcihkaWYvNjApICsgXCLsi5zqsIQgXCIrIGRpZiU2MCArXCLrtoRcIisnPC9wPic7XHJcbiAgICAgICAgICAgICAgICAkKCcuYXR0ZW5kIC5mYy1kYXlbZGF0YS1kYXRlPVwiJytkYXRlSUQrJ1wiXScpLmh0bWwodHh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZHVyTW9uID0gMDtcclxuICAgICAgICAgICAgbGV0IHRoaXNNb250aCA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoXCIuYXR0ZW5kIC5mYy1kYXlcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlRG9tID0gJChcIi5hdHRlbmQgLmZjLWRheVwiKS5lcShpKTtcclxuICAgICAgICAgICAgICAgIGlmKCFkYXRlRG9tLmhhc0NsYXNzKFwiZmMtb3RoZXItbW9udGhcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlID0gZGF0ZURvbS5hdHRyKFwiZGF0YS1kYXRlXCIpLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzTW9udGggPSBkYXRlWzBdK2RhdGVbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGVbMF0rZGF0ZVsxXStkYXRlWzJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2RhdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkYXRhW2RhdGVdLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJNb24gKz0gZGF0YVtkYXRlXVtqXS5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmKCQoXCIuYXR0ZW5kIC5mYy12aWV3LWNvbnRhaW5lclwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHsgICAvL+ustOyhsOqxtCA27KO8XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWtEb20gPSAkKFwiLmF0dGVuZCAuZmMtd2Vla1wiKS5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2Vla0R1ciA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXlEb20gPSB3ZWVrRG9tLmZpbmQoXCIuZmMtZGF5XCIpLmVxKGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGRheURvbS5hdHRyKFwiZGF0YS1kYXRlXCIpLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGVbMF0rZGF0ZVsxXStkYXRlWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2RhdGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlZWtEdXIgKz0gZGF0YVtkYXRlXVtrXS5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2Vla0R1cj4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJhdHRlbmRfX3dlZWtfX2hvdXJcIj4nKyBNYXRoLmZsb29yKHdlZWtEdXIvNjApKyfsi5zqsIQgJyt3ZWVrRHVyJTYwKyfrtoQnICsnPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiYXR0ZW5kX193ZWVrX19ob3VyXCI+PC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQoXCIuYXR0ZW5kX193ZWVrXCIpLmh0bWwodHh0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoXCIuYXR0ZW5kIC5mYy1sZWZ0XCIpLmNoaWxkcmVuKFwiaDIuZHVyTW9udGhcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICQoXCIuYXR0ZW5kIGgyLmR1ck1vbnRoXCIpLmh0bWwoJyAoJytNYXRoLmZsb29yKGR1ck1vbi82MCkrJ+yLnOqwhCAnK2R1ck1vbiU2MCsn67aEKScpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuYXR0ZW5kIC5mYy1sZWZ0XCIpLmFwcGVuZCgnPGgyIGNsYXNzPVwiZHVyTW9udGhcIj4gKCcrTWF0aC5mbG9vcihkdXJNb24vNjApKyfsi5zqsIQgJytkdXJNb24lNjArJ+u2hCk8L2gyPicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eHQgPSAnJzsgICAvL3ZhciDrubzrqLnsnYDqsbAg7JWE64uYLiDsnITsl5DshJwg7ISg7Ja4IO2WiOydjCFcclxuXHJcbiAgICAgICAgICAgIGxldCBmdWxsTW9udGhCb251cyA9IDMwNDAwO1xyXG4gICAgICAgICAgICBsZXQgaW5zdXJhbmNlRmVlID0gMDtcclxuICAgICAgICAgICAgbGV0IGJhc2ljID0gTWF0aC5yb3VuZChkdXJNb24vNjAqNzYwMCk7XHJcbiAgICAgICAgICAgIGxldCBmdWxsV2Vla0J1bnVzID0gTWF0aC5yb3VuZCgoZHVyTW9uLzYwKjc2MDApKjAuMik7XHJcblxyXG4gICAgICAgICAgICAvLyBpZih0aGlzLmlkID09PSB0aGlzLnZpZXdJRCl7XHJcbiAgICAgICAgICAgIC8vICAgICAvL+uzuOyduCDrqqjrk5xcclxuICAgICAgICAgICAgLy8gICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnkvXCIrdGhpc01vbnRoK1wiL1wiK3RoaXMuaWQpLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYmFzaWM6IGJhc2ljLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxXZWVrQnVudXM6IGZ1bGxXZWVrQnVudXMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbE1vbnRoQm9udXM6IGZ1bGxNb250aEJvbnVzXHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImFjY291bnQvc2FsYXJ5L1wiK3RoaXNNb250aCtcIi9cIit0aGlzLnZpZXdJRCkudXBkYXRlKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBiYXNpYzogYmFzaWMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbFdlZWtCdW51czogZnVsbFdlZWtCdW51cyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsTW9udGhCb251czogZnVsbE1vbnRoQm9udXNcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7quLDrs7jquIk8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGJhc2ljKSsgXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq3vOustOyLnOqwhCBYIDcsNjAw7JuQPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7so7ztnLTsiJjri7k8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGZ1bGxXZWVrQnVudXMpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6riw67O46riJ7J2YIDIwJTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7Jew7LCo7IiY64u5PC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShmdWxsTW9udGhCb251cykgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj417Iuc6rCEIOyDgeuLuSDquLDrs7jquIk8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lIGF0dGVuZF9fbW9udGhfX2xpbmUtLXJlZFwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7sgqztmozrs7Ttl5jro4w8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGluc3VyYW5jZUZlZSkgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7qta3rr7zsl7DquIgv6rOg7Jqp67O07ZeYL+qxtOqwleuztO2XmCDssq3qtazslaE8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lIGF0dGVuZF9fbW9udGhfX2xpbmUtLXN1bVwiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fY2F0ZWdvcnlcIj7tlanqs4Q8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX192YWx1ZVwiPicrIGNvbW1hKGJhc2ljICsgZnVsbFdlZWtCdW51cyArIGZ1bGxNb250aEJvbnVzIC0gaW5zdXJhbmNlRmVlKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq4sOuzuOq4iSArIOyjvO2ctOyImOuLuSArIOyXsOywqOyImOuLuSAtIOyCrO2ajOuztO2XmOujjDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX21vbnRoXCIpLmh0bWwodHh0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0V29ya0hvdXI6IGZ1bmN0aW9uKGRhdGVPYmope1xyXG4gICAgICAgIC8vIGNzczogbW9kdWxlcy9hdHRlbmQuY3NzXHJcbiAgICAgICAgbGV0IGRhdGVTaG9ydCA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoXCJNTS9ERFwiKTtcclxuICAgICAgICBsZXQgZGF0ZUlEID0gbW9tZW50KGRhdGVPYmopLmZvcm1hdChcIllZWVlNTUREXCIpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgIGlmKHRoaXMuYXR0ZW5kT2JqLmF0dGVuZFtkYXRlSURdKXtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuYXR0ZW5kT2JqLmF0dGVuZFtkYXRlSURdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYmxhY2tTY3JlZW5cIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJpbnB1dFdpbmRvd1wiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxwIGNsYXNzPVwidGl0bGVcIj4nK2RhdGVTaG9ydCsnIOq3vOustOyLnOqwhDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPic7XHJcbiAgICAgICAgaWYoZGF0YVswXSl7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgICAgICc8aW5wdXQgaWQ9XCJmaXJzdF9mcm9tXCIgdmFsdWU9XCInK2RhdGFbMF0uZnJvbSsnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cImZpcnN0X3RvXCIgdmFsdWU9XCInK2RhdGFbMF0udG8rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwiZmlyc3RfZnJvbVwiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJmaXJzdF90b1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj4nO1xyXG4gICAgICAgIGlmKGRhdGFbMV0pe1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwic2Vjb25kX2Zyb21cIiB2YWx1ZT1cIicrZGF0YVsxXS5mcm9tKydcIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwic2Vjb25kX3RvXCIgdmFsdWU9XCInK2RhdGFbMV0udG8rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwic2Vjb25kX2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwic2Vjb25kX3RvXCI+PHAgY2xhc3M9XCJ3b3JkXCI+6rmM7KeAPC9wPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9ICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8ZGl2IGNsYXNzPVwiYm90dG9tXCI+JztcclxuICAgICAgICB0eHQrPSAgICAgICAgICAgJzxwIGNsYXNzPVwiY29uZmlybVwiIGRpZD1cIicrZGF0ZUlEKydcIj7tmZXsnbg8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICAgICAgJzxwIGNsYXNzPVwiY2xvc2VcIj7st6jshow8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSAgICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIubW9kYWxcIikuaHRtbCh0eHQpO1xyXG5cclxuICAgICAgICBpZih0aGlzLm1vYmlsZSl7XHJcbiAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikuQW55UGlja2VyKHtcclxuICAgICAgICAgICAgICAgIGRhdGVUaW1lRm9ybWF0OlwiSEg6bW1cIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjZmlyc3RfZnJvbVwiKS5mb2N1cygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRXb3JrSG91cjogZnVuY3Rpb24oZGF0ZSl7XHJcblxyXG4gICAgICAgIGxldCB3b3JrID0gW107XHJcblxyXG4gICAgICAgIGxldCBhbGxFbXB0eSA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKCQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikuZXEoaSkudmFsKCkubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgICAgICAgYWxsRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWxsRW1wdHkpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLnZpZXdJRCtcIi9hdHRlbmQvXCIrZGF0ZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy5pZCtcIi9hdHRlbmQvXCIrZGF0ZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoXCIubW9kYWxcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgbGV0IGRhdGVJRCA9IGRhdGUuc2xpY2UoMCw0KSArIFwiLVwiK2RhdGUuc2xpY2UoNCw2KSArIFwiLVwiK2RhdGUuc2xpY2UoNiw4KTtcclxuICAgICAgICAgICAgJCgnLmZjLWRheVtkYXRhLWRhdGU9XCInK2RhdGVJRCsnXCJdJykuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmKCQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG4gICAgICAgICAgICAvL+yLnOyekeyLnOqwhOydtCDsnpgg7J6F66Cl65CY7JeI64KYIO2ZleyduFxyXG5cclxuICAgICAgICAgICAgaWYoZGF0ZTxtb21lbnQoKS5mb3JtYXQoXCJZWVlZTU1ERFwiKSl7XHJcbiAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgIGlmKCQoXCIjZmlyc3RfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLsmIjsg4Eg6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZyb20gPSAkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk7XHJcbiAgICAgICAgICAgIGxldCB0byA9ICQoXCIjZmlyc3RfdG9cIikudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZnJvbUEgPSBmcm9tLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSk7XHJcblxyXG5cclxuICAgICAgICAgICAgd29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZyb206IGZyb20sXHJcbiAgICAgICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgICAgICBkaWY6IGRpZlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi6re866y07Iuc6rCE7J20IOyemOuquyDsnoXroKXrkJjsl4jsirXri4jri6QuIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCkubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBpZigkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGU8bW9tZW50KCkuZm9ybWF0KFwiWVlZWU1NRERcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7Jik64qYIOydtOyghCDsnbzsnZgg64Kg7Kec66W8IOuLpOujqOqzoCDsnojsnYQg6rK97JqwIC0g6re866y0IOyiheujjOyLnOqwhOydtCDsnoXroKXrkJjsp4Ag7JWK7Jy866m0IOyViCDrkKhcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI3NlY29uZF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/snbTsoITsnbzsnbQg7JWE64uI642U652864+EIOyYiOyDgSDqt7zrrLTsi5zqsITsnbTrnbzrj4Qg7J6F66Cl7ZW07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg7JiI7IOBIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb20gPSAkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvID0gJChcIiNzZWNvbmRfdG9cIikudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb21BID0gZnJvbS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9BID0gdG8uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLTsi5zqsITsnbQg7J6Y66q7IOyeheugpeuQmOyXiOyKteuLiOuLpC4gSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMudmlld0lEK1wiL2F0dGVuZC9cIitkYXRlKS5zZXQod29yayk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQrXCIvYXR0ZW5kL1wiK2RhdGUpLnNldCh3b3JrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIubW9kYWxcIikuaHRtbChcIlwiKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF0dGVuZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvYXR0ZW5kLmpzIiwibGV0IENpdHkgPSB7XHJcbiAgICBkYXRhOiB7fSxcclxuXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoXCIuY2l0eVwiKS5vbihcImNsaWNrXCIsIFwiLnJlZnJlc2hcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5yZWZyZXNoU3RhdHVzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuY2l0eVwiKS5vbihcImNsaWNrXCIsIFwiLmNpdHlfX3RyYW5zcG9ydFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZU1ldHJvTGluZSgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgdHh0Kz0gJzxkaXYgY2xhc3M9XCJoZWFkZXJcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxoMj7rj4Tsi5wg642w7J207YSwIO2ZleuztO2YhO2ZqTwvaDI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInJlZnJlc2hcIj7stZzsi6DtmZQ8L3A+JztcclxuICAgICAgICB0eHQrPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgdHh0Kz0gJzxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+JztcclxuXHJcbiAgICAgICAgdHh0Kz0gJzxkaXYgY2xhc3M9XCJsaW5lIHRvcFwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJuYW1lXCI+64+E7Iuc66qFPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X19ob3RlbHNcIj7siJnshow8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+6rSA6rSR7KeAIOygleumrDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0XCI+6rWQ7Ya1PC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X19hcmVhXCI+7KeA7JetPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X19wcmljZVwiPuusvOqwgDwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAodmFyIGNvZGUgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgY2l0eSA9IGRhdGFbY29kZV07XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSBjaXR5LnN0YXR1cztcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImxpbmVcIiBpZD1cIicgKyBjaXR5LmNvZGUgKyAnXCI+PHAgY2xhc3M9XCJuYW1lXCI+JyArIGNpdHkubmFtZSArICc8L3A+JztcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMuaG90ZWwgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19ob3RlbHMgd2VpZ2h0LS1ib2xkXCI+7Y+J6rCAIOyZhOujjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5ob3RlbCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2hvdGVsc1wiPuuNsOydtO2EsCDsnojsnYw8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19ob3RlbHMgY29sb3ItLXJlZFwiPuuNsOydtO2EsCDsl4bsnYw8L3A+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5zcG90ID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHMgd2VpZ2h0LS1ib2xkXCI+7KCV67O06rKA7KadIOyZhOujjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5zcG90ID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHNcIj4y7LCo6rKA7KadPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLnNwb3QgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19zcG90c1wiPu2Vqey5mOq4sDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5zcG90ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHNcIj7soJXrs7Qg6rKA7Kad7KSRPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHMgY29sb3ItLXJlZFwiPuygleuztCDsl4bsnYw8L3A+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy50cmFuc3BvcnQgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X190cmFuc3BvcnQgd2VpZ2h0LS1ib2xkXCI+64yA7KSR6rWQ7Ya1IOyZhOujjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy50cmFuc3BvcnQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X190cmFuc3BvcnRcIj7rjbDsnbTthLAg7J6I7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0IGNvbG9yLS1yZWRcIj7rjbDsnbTthLAg7JeG7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2FyZWFcIj5PPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fYXJlYSBjb2xvci0tcmVkXCI+WDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLnByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fcHJpY2VcIj5PPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fcHJpY2UgY29sb3ItLXJlZFwiPlg8L3A+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7IC8vY2xvc2Ugd3JhcHBlclxyXG5cclxuICAgICAgICAkKFwiLmNpdHlcIikuaHRtbCh0eHQpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZShkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlTWV0cm9MaW5lOiBmdW5jdGlvbihjaWQpe1xyXG4gICAgICAgIGxldCBzdGF0dXMgPSB0aGlzLmRhdGFbY2lkXS5zdGF0dXM7XHJcbiAgICAgICAgaWYoc3RhdHVzLnNwb3Q+MiAmJiBzdGF0dXMudHJhbnNwb3J0PjApe1xyXG4gICAgICAgICAgICB0b2FzdChcIuuMgOykkeq1kO2GtSDsoJXrs7Trpbwg6rCA6rO17ZWp64uI64ukLlwiKTtcclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpZCkub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3BvdHMgPSBkYXRhLnNwb3RzLnJhbmtlZDtcclxuICAgICAgICAgICAgICAgIGxldCBtYXggPSBzcG90cy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBpZihtYXg+OTkpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1heCA9IDk5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtZXRyb3MgPSBkYXRhLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldHJvTGluZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBMaW5lID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZXRyb3MubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWV0cm8gPSBtZXRyb3Nbal07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGFzU3BvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IHNwb3RzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gNjAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcERpZiA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzcG90LmVudGVyYW5jZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHNwb3QuZW50ZXJhbmNlLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVudCA9IHNwb3QuZW50ZXJhbmNlW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEaWYgPSBjYWxjdWxhdGVEaWYoZW50LCBtZXRyby5jb29yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0ZW1wRGlmPGRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZiA9IHRlbXBEaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Nwb3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcERpZiA9IGNhbGN1bGF0ZURpZihzcG90LmNvb3IsIG1ldHJvLmNvb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0ZW1wRGlmPGRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWYgPSB0ZW1wRGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhhc1Nwb3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtZXRyby5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmUgPSBtZXRyby5saW5lW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF0ZW1wTGluZVtsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lW2xpbmVdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRlbXBMaW5lW2xpbmVdW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGlmIDwgdGVtcExpbmVbbGluZV1baV0uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lW2xpbmVdW2ldID0ge2Nvb3I6c3BvdC5jb29yLCByYW5rOmksIG5hbWU6c3BvdC5uYW1lLCBkaWY6ZGlmLCBzdG46e2Nvb3I6bWV0cm8uY29vciwgbmFtZTptZXRyby5uYW1lfX07IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lW2xpbmVdW2ldID0ge2Nvb3I6c3BvdC5jb29yLCByYW5rOmksIG5hbWU6c3BvdC5uYW1lLCBkaWY6ZGlmLCBzdG46e2Nvb3I6bWV0cm8uY29vciwgbmFtZTptZXRyby5uYW1lfX07IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBsaW5lIGluIHRlbXBMaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvTGluZVtsaW5lXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcmFuayBpbiB0ZW1wTGluZVtsaW5lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0cm9MaW5lW2xpbmVdLnB1c2godGVtcExpbmVbbGluZV1bcmFua10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWV0cm9MaW5lKTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpZCtcIi9tZXRyb0xpbmVcIikuc2V0KG1ldHJvTGluZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9hc3QoXCLrjIDspJHqtZDthrUg7KCV67O066W8IOqwgOqzte2VmOq4sOyXkCDsnpDro4zqsIAg67aA7KGx7ZWp64uI64ukLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICByZWZyZXNoU3RhdHVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpcm0oXCLrjbDsnbTthLDrpbwg66eO7J20IOyeoeyVhOuoueyKteuLiOuLpCEg7KCV66eQIOy1nOyLoO2ZlO2VmOyLnOqyoOyKteuLiOq5jD9cIikpIHtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcycpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwPT57XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjaWQgaW4gdGhhdC5kYXRhKSB7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdHVzID0ge307XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2l0eSA9IGRhdGFbY2lkXTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNpdHkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbDogMCwgLy8wOuuNsOydtO2EsOyXhuydjCwgMTrsiJnshozrjbDsnbTthLDrp4wg7J6I7J2MLCAyOu2PieqwgOuNsOydtO2EsCjsm4zrlKkpIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdDogdGhhdC5kYXRhW2NpZF0uc3RhdHVzLnNwb3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OiAwLCAvL+uNsOydtO2EsOyXhuydjCwgMTrrqZTtirjroZzrjbDsnbTthLDrp4wg7J6I7J2MLCAyOuqwgOqzteuNsOydtO2EsCjrnbzsnbjrs4QuLuuTsSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaXR5LmFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5hcmVhID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdHkuaG90ZWxzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBob3RlbCA9IGNpdHkuaG90ZWxzW09iamVjdC5rZXlzKGNpdHkuaG90ZWxzKVswXV07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5ob3RlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuaG90ZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuYXJlYSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihob3RlbC5hcmVhID09PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuYXJlYSA9IDI7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjaXR5LnN0YXR1cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuc3RhdHVzLmFyZWEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5LnN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWE6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaXR5LnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5LnN0YXR1cy5hcmVhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5zdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvc3RhdHVzJykudXBkYXRlKGNpdHkuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdHkubWV0cm8pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5tZXRyb0xpbmUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy50cmFuc3BvcnQgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnRyYW5zcG9ydCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaXR5LnByaWNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5wcmljZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWw6IDAsIC8vMDrrjbDsnbTthLDsl4bsnYwsIDE67IiZ7IaM642w7J207YSw66eMIOyeiOydjCwgMjrtj4nqsIDrjbDsnbTthLAo7JuM65SpKSDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OiAwLCAvL+uNsOydtO2EsOyXhuydjCwgMTrrqZTtirjroZzrjbDsnbTthLDrp4wg7J6I7J2MLCAyOuqwgOqzteuNsOydtO2EsCjrnbzsnbjrs4QuLuuTsSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVtjaWRdLnN0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLnNldCh0aGF0LmRhdGEpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZSh0aGF0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KCfstZzsi6DtmZQg7JmE66OMJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2l0eTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvY2l0eS5qcyIsImltcG9ydCBGaXJzdF9jaGVjayBmcm9tIFwiLi9zcG90L2ZpcnN0X2NoZWNrLmpzXCI7XHJcbmltcG9ydCBTZWNvbmRfY29tYmluZSBmcm9tIFwiLi9zcG90L3Nlb25kX2NvbWJpbmUuanNcIjtcclxuaW1wb3J0IFRoaXJkX2ZpbmFsaXplIGZyb20gXCIuL3Nwb3QvdGhpcmRfZmluYWxpemUuanNcIjtcclxuXHJcbnZhciBTcG90ID0ge1xyXG4gICAgY2l0aWVzOiB7fSxcclxuICAgIG9yZGVyOlwiXCIsXHJcbiAgICBkYXRhOiB7fSxcclxuICAgIGN1cnJlbnQ6XCJcIiwgLy/tmITsnqwg67O06rOg7J6I64qUIOuPhOyLnCBjaWQgLSBmaXJlYmFzZSByZWbsl5Agb2ZmIOuLrOq4sOychO2VtFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh1X2kpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBGaXJzdF9jaGVjay5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMub3JkZXIgPSB1X2kuc2V0dGluZy5vcmRlcjtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzJykub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGF0LmNpdGllcyA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoYXQub3JkZXIgPSB1X2kuc2V0dGluZy5vcmRlcjtcclxuICAgICAgICAgICAgdGhhdC5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX3N0YXR1cygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5hY3RpdmVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY2lkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gdGhhdC5jaXRpZXNbY2lkXS5zdGF0dXMuc3BvdDtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jaXR5KGNpZCwgc3RhdHVzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIub3JkZXJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0Lm9yZGVyID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIHZhciB1aWQgPSB1X2kubWFpbDtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3VzZXJzLycgKyB1aWQgKyBcIi9zZXR0aW5nL29yZGVyXCIpLnNldCh0aGF0Lm9yZGVyKTtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX3N0YXR1cygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5yZXR1cm5cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfc3RhdHVzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vMuywqOqygOymnVxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLnJlbW92ZV9zcG90XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIFRoaXJkX2ZpbmFsaXplLnJlbW92ZV9zcG90KCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5yZWRvX3JlbW92ZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBUaGlyZF9maW5hbGl6ZS5yZWRvX3JlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9zdGF0dXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XHJcblxyXG4gICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJoZWFkZXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPGgyPuq0gOq0keyngCDrjbDsnbTthLAg7KCV66asIO2YhO2ZqTwvaDI+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwib3JkZXJcIiBpZD1cImFiY1wiPuqwgOuCmOuLpOyInDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJvcmRlclwiIGlkPVwiY2hhbmdlZFwiPuyImOygleyLnOqwhOyInDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJsaW5lciBsaW5lci0taGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NpdHlOYW1lXCI+64+E7Iuc66qFPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj7sg4Htg5w8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwibGluZXJfX2NoYXJnZVwiPuuLtOuLueyekDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgdmFyIG9yZGVyQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgY2lkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcmRlciA9PT0gXCJhYmNcIikge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJBcnJheS5wdXNoKHsgY2lkOiBjaWQsIGlkeDogY2l0eS5uYW1lIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IFwiY2hhbmdlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBvcmRlckFycmF5LnB1c2goeyBjaWQ6IGNpZCwgaWR4OiBjaXR5Lm9yZGVyLmNoYW5nZWQgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9yZGVyQXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5pZHggPiBiLmlkeCA/IDEgOiBhLmlkeCA8IGIuaWR4ID8gLTEgOiAwO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgc3RhdHVzQXJyYXkgPSBbXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3Bhbj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuPuyZhOujjDwvc3Bhbj48L3A+JyxcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuyZhOujjDwvc3Bhbj48L3A+J1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3JkZXJBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2lkID0gb3JkZXJBcnJheVtpXS5jaWQ7XHJcbiAgICAgICAgICAgIGxldCBjaXR5ID0gZGF0YVtjaWRdO1xyXG5cclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwibGluZXJcIiBpZD1cIicgKyBjaWQgKyAnXCI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaXR5TmFtZVwiPicgKyBjaXR5Lm5hbWUgKyAnPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCArPSBzdGF0dXNBcnJheVtjaXR5LnN0YXR1cy5zcG90XTtcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaGFyZ2VcIj7ri7Tri7nsnpA8L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7Ly93cmFwcGVyIOuLq+q4sFxyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLnNwb3RcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgICQoXCIjXCIgKyB0aGlzLm9yZGVyKS5hZGRDbGFzcyhcIm9yZGVyLS1zZWxlY3RlZFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jaXR5OiBmdW5jdGlvbiAoY2lkLCBzdGF0dXMpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgdGhhdC5jdXJyZW50KS5vZmYoXCJ2YWx1ZVwiKTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgY2lkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnQgPSBjaWQ7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2l0eU5hbWUgPSB0aGF0LmNpdGllc1tjaWRdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAxKSB7ICAgLy/tmITsnqwg7KCV67O07IiY7KeR7IOB7YOcIOqygOymnVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuaGVhZGVyXCIpLmh0bWwoJzxoMj4nICsgY2l0eU5hbWUgKyAnIOygleuztOqygOymnTwvaDI+JykuYXR0cignY2lkJywgY2lkKS5hdHRyKCdjaXR5TmFtZScsY2l0eU5hbWUpLmFkZENsYXNzKFwiY2l0eU5hbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRmlyc3RfY2hlY2suaW5mbGF0ZShkYXRhLnNwb3RzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAyKSB7IC8v7ZWp7LmY6riw7J6R7JeFXHJcbiAgICAgICAgICAgICAgICAgICAgU2Vjb25kX2NvbWJpbmUuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgIC8vMuywqOqygOymne2ZlOuptOqzvCDsmYTro4ztmZTrqbTsnYAg65Sw66GcIOywqOydtOqwgCDsl4bsnYxcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmhlYWRlclwiKS5odG1sKCc8aDI+JyArIGNpdHlOYW1lICsgJyAy7LCo6rKA7KadPC9oMj4nKS5hdHRyKCdjaWQnLCBjaWQpLmF0dHIoJ2NpdHlOYW1lJyxjaXR5TmFtZSkuYWRkQ2xhc3MoXCJjaXR5TmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBUaGlyZF9maW5hbGl6ZS5pbmZsYXRlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfslYTrrLTrn7Ag642w7J207YSw6rCAIOyXhuyKteuLiOuLpC4g642w7J207YSwIOyImOynkeydhCDrqLzsoIAg7KeE7ZaJ7ZW07KO87IS47JqULicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIubmF2X19pdGVtXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnbmF2X19pdGVtLS1oYXNEcmF3ZXInKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgdGhhdC5jdXJyZW50KS5vZmYoXCJ2YWx1ZVwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5uYXZfX2RyYXdlcl9faXRlbSBcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdpZCcpID09PSAnbmF2X3Nwb3QnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nICsgdGhhdC5jdXJyZW50KS5vZmYoXCJ2YWx1ZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwb3Q7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC5qcyIsImltcG9ydCBBdXRvQ29tYmluZSBmcm9tICcuL2F1dG9Db21iaW5lLmpzJztcclxuXHJcbnZhciBGaXJzdF9DaGVjayA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fcmVtYWluTGFyZ2VEYXRhXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5zZXRSZW1haW5OdW1iZXIoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIiksICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIuY2hlY2tfX3JlbWFpbk51bWJlclwiKS52YWwoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19ub2RhdGFcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2lkID0gJCh0aGlzKS5hdHRyKCdzaWQnKTtcclxuICAgICAgICAgICAgdGhhdC5zaXRlTm9kYXRhKHNpZCk7XHJcbiAgICAgICAgICAgIHRvYXN0KCfrjbDsnbTthLAg6rO167CxIOyymOumrCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+yijO2RnCDsl4bripQg6rSA6rSR7KeA7J2YIOyijO2RnOulvCDsnoXroKXtlahcclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fc3BvdERlbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGVsZXRlU3BvdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fc3BvdE5hbWVcIikuaHRtbCgpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/sooztkZwg7JeG64qUIOq0gOq0keyngOydmCDsooztkZzrpbwg7J6F66Cl7ZWoXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX2NvbmZpcm1cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmlucHV0Q29vcmRpbmF0ZSgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSwgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5jaGVja19fc3BvdENvb3JcIikudmFsKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaXRlTm9kYXRhOiBmdW5jdGlvbiAoc2lkKSB7XHJcbiAgICAgICAgdmFyIGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcblxyXG4gICAgICAgIGlmIChjb25maXJtKFwi642w7J207YSw66W8IOygleunkCDsl4bslbHri4jquYwhP1wiKSl7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2lkICsgXCIvbm9kYXRhXCIpLnNldCh0cnVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgc2V0UmVtYWluTnVtYmVyOiBmdW5jdGlvbiAoc2l0ZSwgbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNpdHkgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IGN1dE5vID0gbnVtYmVyLnRyaW0oKSAqIDE7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKGN1dE5vIDwgMTAwKSB7XHJcbiAgICAgICAgICAgIHRvYXN0KFwiMTAw6rCcIOydtOyDgeydmCDsnqXshozrpbwg7Jyg7KeA7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maXJtKFwi7Iic7JyEIFwiICsgY3V0Tm8gKyBcIuychCDrr7jrp4wg7J6l7IaM66W8IOuqqOuRkCDsoJzqsbDtlanri4jri6QuIOunnuyKteuLiOq5jD9cIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXRPYmogPSB0aGlzLmRhdGEuc3BvdHNbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICBjdXRPYmoubGVuZ3RoID0gY3V0Tm87XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlKS5zZXQoY3V0T2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlU3BvdDogZnVuY3Rpb24gKHNpZCwgbmFtZSkge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlID0gc2lkLnNwbGl0KFwiX1wiKVswXTtcclxuICAgICAgICBsZXQgbm8gPSBzaWQuc3BsaXQoXCJfXCIpWzFdO1xyXG5cclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShuYW1lICsgXCIg7J6l7IaM66W8IOygnOqxsO2VqeuLiOuLpC4g6rOE7IaN7ZWg6rmM7JqUP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaXR5ICsgXCIvc3BvdHMvXCIgKyBzaXRlICsgXCIvXCIgKyBubykuc2V0KHsgZGVsZXRlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyBzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsnqXshozqsIAg7KCc6rGw65CY7JeI7Iq164uI64ukLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShubyArIFwi67KIIOyepeyGjOulvCDsoJzqsbDtlanri4jri6QuIOqzhOyGje2VoOq5jOyalD9cIikpIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSArIFwiL1wiICsgbm8pLnNldCh7IGRlbGV0ZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiICsgc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7J6l7IaM6rCAIOygnOqxsOuQmOyXiOyKteuLiOuLpC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0Q29vcmRpbmF0ZTogZnVuY3Rpb24gKHNpZCwgY29vclR4dCkge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlID0gc2lkLnNwbGl0KFwiX1wiKVswXTtcclxuICAgICAgICBsZXQgbm8gPSBzaWQuc3BsaXQoXCJfXCIpWzFdO1xyXG4gICAgICAgIGxldCBjb29yID0ge307XHJcblxyXG4gICAgICAgIGlmIChjb29yVHh0LnNwbGl0KFwiLFwiKS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgbGV0IGxhdCA9IGNvb3JUeHQuc3BsaXQoXCIsXCIpWzBdLnRyaW0oKSAqIDE7XHJcbiAgICAgICAgICAgIGxldCBsbmcgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVsxXS50cmltKCkgKiAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzTmFOKGxhdCkgfHwgaXNOYU4obG5nKSkge1xyXG4gICAgICAgICAgICAgICAgLy/sooztkZwg7KSRIO2VmOuCmOqwgFxyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg67aA7KCV7ZmV7ZWY6rKMIOyeheugpeuQmOyXiOyKteuLiOuLpFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvb3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0OiBsYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG5nOiBsbmdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyijO2RnOqwgCDsnoXroKXrkJjsl4jsirXri4jri6RcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiICsgc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSArIFwiL1wiICsgbm8gKyBcIi9jb29yXCIpLnNldChjb29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOu2gOygle2Zle2VmOqyjCDsnoXroKXrkJjsl4jsirXri4jri6RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAkKFwiLmhlYWRlclwiKS5hcHBlbmQoJzxwIGNsYXNzPVwicmV0dXJuXCI+64+M7JWE6rCA6riwPC9wPicpO1xyXG5cclxuICAgICAgICBsZXQgaGFzUHJvYmxlbSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuICAgICAgICBsZXQgc2VhcmNoVXJsID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jby5rci9tYXBzL3BsYWNlLycgKyAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoJ2NpdHlOYW1lJykgKyBcIitcIjtcclxuXHJcbiAgICAgICAgbGV0IHNpdGVPYmogPSB7XHJcbiAgICAgICAgICAgIGdnOiBcIuq1rOq4gFwiLFxyXG4gICAgICAgICAgICBudjogXCLrhKTsnbTrsoRcIixcclxuICAgICAgICAgICAgdGE6IFwi7Yq466a97Ja065Oc67CU7J207KCAXCIsXHJcbiAgICAgICAgICAgIGxwOiBcIuuhoOumrO2UjOuemOuLm1wiXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgc2l0ZSBpbiBzaXRlT2JqKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2l0ZUhhc1Byb2JsZW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9Db29yVHh0ID0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+7KKM7ZGc6rCAIOyeheugpeuQmOyngCDslYrsnYAg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICBsZXQgbm9TcG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub1Nwb3RUeHQgPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7ruYTslrTsnojripQg6rSA6rSR7KeA6rCAIOyeiOyKteuLiOuLpDwvcD4nO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSwIO2ZleyduDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhW3NpdGVdLm5vZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtzaXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IGRhdGFbc2l0ZV1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGFzQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5kZWxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/snbzrtoDrn6wg7IKt7KCc7ZWcIOq0gOq0keyngCAtPiDrhJjslrTqsITri6RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QuY29vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdC5jb29yLmxuZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHNwb3QuY29vci5sbmcgKiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QuY29vci5sYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc05hTihzcG90LmNvb3IubGF0ICogMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc0Nvb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8ZGl2IGNsYXNzPVwiY2hlY2tfX2xpbmVcIiBpZD1cIicgKyBzaXRlICsgJ18nICsgaSArICdcIj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzxhIGNsYXNzPVwiY2hlY2tfX3Nwb3ROYW1lXCIgaHJlZj1cIicgKyBzZWFyY2hVcmwgKyBzcG90Lm5hbWUgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIHNwb3QubmFtZSArICc8L2E+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fc3BvdENvb3JcIiBwbGFjZWhvbGRlcj1cInh4Lnh4eHh4LCB4eC54eHh4eCDtmJXtg5wg7J6F66ClXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19jb25maXJtXCI+7KKM7ZGcIOyeheugpTwvcD48cCBjbGFzcz1cImNoZWNrX19zcG90RGVsZXRlXCI+7J6l7IaMIOyCreygnDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3JUeHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdfJyArIGkgKyAnXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdHh0XCI+JyArIGkgKyAnIOuyiCDqtIDqtJHsp4A8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3BvdERlbGV0ZVwiPuyepeyGjCDsgq3soJw8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdFR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZUhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TcG90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vQ29vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gbm9Db29yVHh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9TcG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSBub1Nwb3RUeHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtzaXRlXS5sZW5ndGggPiAxNTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxhcmdlT0sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sYXJnZURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxhcmdlRGF0YVtzaXRlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMTUw6rCcIOydtOyDgeydmCDrjbDsnbTthLDrpbwg67O07Jyg7ZWY66Ck66m0IOuPhOyLnOuqhS9zcG90cy9sYXJnZURhdGEv7IKs7J207Yq466qF7J20IHRydWXrnbzqs6Ag67aA7Jes65CY7Ja07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXJnZU9LID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXJnZU9LID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGFyZ2VPSykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+JyArIHNpdGVPYmpbc2l0ZV0gKyAnIOyepeyGjCDrjbDsnbTthLDqsIAgMTUw6rCc66W8IOy0iOqzvCgnICsgZGF0YVtzaXRlXS5sZW5ndGggKyAn6rCcKe2VqeuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdcIj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8aW5wdXQgY2xhc3M9XCJjaGVja19fcmVtYWluTnVtYmVyXCIgdmFsdWU9XCInICsgZGF0YVtzaXRlXS5sZW5ndGggKyAnXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fcmVtYWluTGFyZ2VEYXRhXCI+6rCc7J2YIOyepeyGjCDsnKDsp4DtlZjquLA8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fdGl0bGVcIj4nICsgc2l0ZU9ialtzaXRlXSArICcg642w7J207YSw6rCAIOyhtOyerO2VmOyngCDslYrsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlIGNoZWNrX19ub2RhdGFcIiBzaWQ9XCInICsgc2l0ZSArICdcIj7rjbDsnbTthLDqsIAg7JuQ656YIOyXhuydhCDqsr3smrAg7YG066at7ZW07KO87IS47JqlPC9wPic7XHJcbiAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiDsm5Drnpgg7IKs7J207Yq4IOuNsOydtO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK64qUIOqyveyasOulvCDrjIDruYTtlZwg67KE7Yq87J2EIOunjOuTpOqzoCBzaXRlIOqwkuycvOuhnCBub2RhdGE6IHRydWXrpbwg64Sj7Ja07KSA64ukLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc2l0ZUhhc1Byb2JsZW0pIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fc3ViVGl0bGVcIj7rsJzqsqzrkJwg66y47KCc6rCAIOyXhuyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzUHJvYmxlbSkge1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX2ZpbmlzaFwiPuqygOyCrOulvCDrqqjrkZAg66eI7LOk7Iq164uI64ukPC9wPic7XHJcbiAgICAgICAgICAgICQoXCIuc3BvdCAud3JhcHBlclwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cignY2lkJyk7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi67Cc6rKs65CcIOusuOygnOqwgCDsl4bslrQg642w7J207YSwIOuzke2VqeydhCDsi6Tsi5ztlanri4jri6QuXCIpO1xyXG5cclxuICAgICAgICAgICAgQXV0b0NvbWJpbmUuaW5pdChkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIud3JhcFwiKS5zY3JvbGxUb3AoMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpcnN0X0NoZWNrO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvZmlyc3RfY2hlY2suanMiLCIvL2ZpcnN0X2NoZWNr7JeQ7ISc66eMIGltcG9ydGVkIOuQmOqzoCDsgqzsmqnrkKhcclxuXHJcbnZhciBBdXRvQ29tYmluZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgIGxldCBjaWQgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IHNpdGVBcnIgPSBbXCJnZ1wiLCBcImxwXCIsIFwibnZcIiwgXCJ0YVwiXTtcclxuICAgICAgICBsZXQgY29tYmluaW5nID0ge307XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpdGVBcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpdGUgPSBzaXRlQXJyW2pdO1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtzaXRlXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0ubm9EYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW3NpdGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdW2ldICYmICFkYXRhW3NpdGVdW2ldLmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGRTcG90ID0gZGF0YVtzaXRlXVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6riw7KG0IOygleuztOulvCBvbGRTcG907J2065286rOgIO2VmOyekC4g7IOI66Gc7Jq0IOyKpO2Mn+ygleuztOyXkOuKlCDsnbTrpoTsnYQg7ZWcL+yYgeycvOuhnCDrtoTtlaDtlZjqs6Ag656t7YK57J2EIOu2gOyXrO2VoCDqsoPsnbTri6QuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrbzogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW46IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IG9sZFNwb3QuY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5rOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9b6rCALe2eo10vLnRlc3Qob2xkU3BvdC5uYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5rbyA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC5uYW1lLmVuID0gb2xkU3BvdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC5yYW5rW3NpdGVdID0gaTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkU3BvdC51cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90LnVybCA9IG9sZFNwb3QudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFNwb3QudGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC50YWcgPSBvbGRTcG90LnRhZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlciA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczAwXCIgKyBjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ZXIgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzMFwiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5pbmdbXCJzXCIgKyBjb3VudGVyXSA9IHNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyKytcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gLy/tlZzrsJTtgLQg64+M7JWY64u5XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IGNvbWJpbmVPYmogPSB7fVxyXG4gICAgICAgIGxldCBjb21iaW5lZCA9IHt9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNvZGUgaW4gY29tYmluaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBzcG90ID0gY29tYmluaW5nW2NvZGVdO1xyXG4gICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdID0gc3BvdFxyXG4gICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmUgPSB7fTtcclxuICAgICAgICAgICAgbGV0IGhhc0NvbWJpbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8v7ZWp7LmgIOqyg+ydtCDsl4bsnLzrqbQg67CU66GcIGNvbWJpbmVkIOyqveycvOuhnCDrs7Trgrjri6QuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB0Q29kZSBpbiBjb21iaW5pbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlIDwgdENvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdFNwb3QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29tYmluaW5nW3RDb2RlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0U3BvdFtrZXldID0gY29tYmluaW5nW3RDb2RlXVtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdFNwb3QuZGVsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gY2FsY3VsYXRlRGlmKHNwb3QuY29vciwgdFNwb3QuY29vcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWYgPCAyNTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVPYmpbY29kZV0uY29tYmluZVt0Q29kZV0gPSB0U3BvdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NvbWJpbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFoYXNDb21iaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29tYmluZWRbY29kZV0gPSBjb21iaW5lT2JqW2NvZGVdO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvbWJpbmVPYmpbY29kZV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpZCArIFwiL3Nwb3RzXCIpLnNldCh7XHJcbiAgICAgICAgICAgIGNvbWJpbmluZzogY29tYmluZU9iaixcclxuICAgICAgICAgICAgY29tYmluZWQ6IGNvbWJpbmVkXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cy9zcG90Jykuc2V0KDEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdXRvQ29tYmluZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2F1dG9Db21iaW5lLmpzIiwidmFyIFNlY29uZF9jb21iaW5lID0ge1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlY29uZF9jb21iaW5lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3Qvc2VvbmRfY29tYmluZS5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4vY29uZmlnLmpzXCI7XHJcblxyXG52YXIgVGhpcmRfZmluYWxpemUgPSB7XHJcbiAgICB0ZW1wOmZhbHNlLFxyXG4gICAgc3BvdE9iajp7fSxcclxuXHJcbiAgICByZW1vdmVfc3BvdDogZnVuY3Rpb24oc2lkKXtcclxuICAgICAgICBsZXQgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzcG90TmFtZSA9ICQoXCIjXCIrc2lkKS5jaGlsZHJlbihcIi5yZXN1bHRfbmFtZV9rb1wiKS52YWwoKTtcclxuICAgICAgICBpZihjb25maXJtKGAke3Nwb3ROYW1lfSDqtIDqtJHsp4Drpbwg7KCc6rGw7ZWp64uI64ukLiDtmZXsi6TtlZzqsIDsmpQ/YCkpe1xyXG4gICAgICAgICAgICB0aGlzLnRlbXAgPSB0aGlzLnNwb3RPYmpbc2lkXTtcclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpZCtcIi9zcG90cy9jb21iaW5lZC9cIitzaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB0b2FzdChcIuq0gOq0keyngOqwgCDsoJzqsbDrkJjsl4jsirXri4jri6QuXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZG9fcmVtb3ZlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBjaWQgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoXCJjaWRcIik7XHJcbiAgICAgICAgbGV0IHNpZCA9IHRoaXMudGVtcC5zaWQ7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkK1wiL3Nwb3RzL2NvbWJpbmVkL1wiK3NpZCkuc2V0KHRoaXMudGVtcCk7XHJcbiAgICAgICAgJChcIi5yZWRvX3JlbW92ZVwiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy50ZW1wID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBsZXQgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgICQoXCIuaGVhZGVyXCIpLmFwcGVuZCgnPHAgY2xhc3M9XCJyZXR1cm5cIj7rj4zslYTqsIDquLA8L3A+Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy50ZW1wKXtcclxuICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuYXBwZW5kKCc8cCBjbGFzcz1cInJlZG9fcmVtb3ZlXCI+66eI7KeA66eJIOygnOqxsCDst6jshow8L3A+Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3BvdE9iaiA9IGRhdGEuc3BvdHMuY29tYmluZWQ7XHJcbiAgICAgICAgdGhpcy5zcG90T2JqID0gc3BvdE9iajtcclxuICAgICAgICBsZXQgcmFua0FyciA9IFtdO1xyXG4gICAgICAgIGxldCBzcG90VG90YWwgPSBPYmplY3Qua2V5cyhzcG90T2JqKS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBzaWQgaW4gc3BvdE9iaikge1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IHNwb3RPYmpbc2lkXTtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmRpdmlkdWFsQXJyID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBzaXRlIGluIHNwb3QucmFuaykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhbmsgPSBzcG90LnJhbmtbc2l0ZV07XHJcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsQXJyLnB1c2gocmFuayk7XHJcbiAgICAgICAgICAgICAgICBzY29yZSAtPSByYW5rO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRpdmlkdWFsQXJyLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtaW5SYW5rID0gaW5kaXZpZHVhbEFyclswXTtcclxuICAgICAgICAgICAgc2NvcmUgKz0gKHNwb3RUb3RhbCArIDEwMCAtIG1pblJhbmspKk1hdGguc3FydChNYXRoLnNxcnQoc3BvdFRvdGFsKSk7XHJcbiAgICAgICAgICAgIHNjb3JlIC09IG1pblJhbms7XHJcblxyXG4gICAgICAgICAgICBpZihpbmRpdmlkdWFsQXJyLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSAtPSBzcG90VG90YWwvMjtcclxuICAgICAgICAgICAgICAgIHNjb3JlIC09IG1pblJhbms7XHJcbiAgICAgICAgICAgICAgICBpZihzcG90LnJhbmsubnYpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IDUwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihpbmRpdmlkdWFsQXJyLmxlbmd0aCA9PT0gMyl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSAoc3BvdFRvdGFsIC0gbWluUmFuayk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGluZGl2aWR1YWxBcnIubGVuZ3RoID09PSA0KXtcclxuICAgICAgICAgICAgICAgIHNjb3JlICs9IHNwb3RUb3RhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmFua0Fyci5wdXNoKHtzaWQ6c2lkLCBzY29yZTpzY29yZX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmFua0Fyci5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFua0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2lkID0gcmFua0FycltpXS5zaWQ7XHJcbiAgICAgICAgICAgIGxldCBzcG90ID0gc3BvdE9ialtzaWRdO1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gXCJcIjtcclxuICAgICAgICAgICAgaWYoc3BvdC51cmwpe1xyXG4gICAgICAgICAgICAgICAgdXJsID0gc3BvdC51cmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHJhbmtpbmcgPSB7XHJcbiAgICAgICAgICAgICAgICBnZzpcIlwiLFxyXG4gICAgICAgICAgICAgICAgbnY6XCJcIixcclxuICAgICAgICAgICAgICAgIGxwOlwiXCIsXHJcbiAgICAgICAgICAgICAgICB0YTpcIlwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHNpdGUgaW4gc3BvdC5yYW5rKSB7XHJcbiAgICAgICAgICAgICAgICByYW5raW5nW3NpdGVdID0gc3BvdC5yYW5rW3NpdGVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwicmVzdWx0X2JveFwiIGlkPVwiJytzaWQrJ1wiPjxwIGNsYXNzPVwicmVzdWx0X3JhbmtcIj4nKyhpKzEpKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxpbnB1dCBjbGFzcz1cInJlc3VsdF9uYW1lX2tvXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5rbysnXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxpbnB1dCBjbGFzcz1cInJlc3VsdF9uYW1lX2VuXCIgdmFsdWU9XCInK3Nwb3QubmFtZS5lbisnXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxpbnB1dCBjbGFzcz1cInJlc3VsdF91cmxcIiB2YWx1ZT1cIicrdXJsKydcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfZ2dcIj4nK3JhbmtpbmcuZ2crJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfbnZcIj4nK3JhbmtpbmcubnYrJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfbHBcIj4nK3JhbmtpbmcubHArJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfdGFcIj4nK3JhbmtpbmcudGErJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAnPHAgY2xhc3M9XCJyZXN1bHRfc2F2ZSBzYXZlX3Nwb3RcIj7soIDsnqU8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X3JlbW92ZSByZW1vdmVfc3BvdFwiPuyCreygnDwvcD48L2Rpdj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5zcG90IC53cmFwcGVyXCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgbGV0IHB1c2hBcnIgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmtBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcHVzaEFyci5wdXNoKHNwb3RPYmpbcmFua0FycltpXS5zaWRdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIrY2lkK1wiL3Nwb3RzL3JhbmtlZFwiKS5zZXQocHVzaEFycik7XHJcblxyXG4gICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IFRoaXJkX2ZpbmFsaXplO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvdGhpcmRfZmluYWxpemUuanMiLCJ2YXIgQ29uZmlnID0ge1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2NvbmZpZy5qcyIsImxldCBBY2NvdW50ID0ge1xyXG4gICAgdXNlcjoge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBpZD1cImFjY291bnRDYWxlbmRhclwiIGNsYXNzPVwiYWNjb3VudF9fY2FsZW5kYXJcIj4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5hY2NvdW50XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc25hcC52YWwoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciB1aWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVpZCAhPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJbdWlkXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YVt1aWRdLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJyNhY2NvdW50Q2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgIHZpZXdSZW5kZXI6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24gKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5mbGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2FjY291bnQuanMiLCJsZXQgU3Vid2F5ID0ge1xyXG4gICAgbWFwOnt9LFxyXG4gICAgbWFya2VyOmZhbHNlLFxyXG4gICAgbWV0cm86W10sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5bG9cIilcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvbnljL21ldHJvXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdGhhdC5tZXRybyA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YndheU1hcCcpLCB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiA0MC43NDg0NCwgbG5nOiAtNzMuOTg1NjYgfSxcclxuICAgICAgICAgICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tYXAuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRTdWJ3YXkoZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZmluZFN1YndheTogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgbGV0IGNvb3IgPSB7XHJcbiAgICAgICAgICAgIGxhdDplLmxhdExuZy5sYXQoKSxcclxuICAgICAgICAgICAgbG5nOmUubGF0TG5nLmxuZygpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm1hcmtlcil7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyLnNldE1hcChudWxsKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGUubGF0TG5nLFxyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJ1xyXG4gICAgICAgIGxldCBtZXRyb0luZm8gPSB7fVxyXG4gICAgICAgIGxldCBtZXRyb0J5U3RuID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDczOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1ldHJvTmFtZSA9IHRoaXMubWV0cm9baV0ubmFtZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkaWYgPSBNYXRoLnJvdW5kKGNhbGN1bGF0ZURpZihjb29yLHRoaXMubWV0cm9baV0uY29vcikpO1xyXG5cclxuICAgICAgICAgICAgaWYoZGlmPDcwMCl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMubWV0cm9baV0ubGluZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gdGhpcy5tZXRyb1tpXS5saW5lW2tdLnNsaWNlKDAsMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1ldHJvSW5mb1tsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZjxtZXRyb0luZm9bbGluZV0uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvSW5mb1tsaW5lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyb05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0luZm9bbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldHJvTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG1ldHJvQnlTdG5bbWV0cm9OYW1lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdLmxpbmUgPSBtZXRyb0J5U3RuW21ldHJvTmFtZV0ubGluZS5jb25jYXQodGhpcy5tZXRyb1tpXS5saW5lKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm9CeVN0blttZXRyb05hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5tZXRyb1tpXS5saW5lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWV0QXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBsaW5lIGluIG1ldHJvSW5mbykge1xyXG4gICAgICAgICAgICBtZXRBcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bGluZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6bWV0cm9JbmZvW2xpbmVdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBkaWY6bWV0cm9JbmZvW2xpbmVdLmRpZlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXRTdG5BcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gbWV0cm9CeVN0bikge1xyXG4gICAgICAgICAgICBtZXRTdG5BcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGxpbmU6bWV0cm9CeVN0bltuYW1lXS5saW5lLFxyXG4gICAgICAgICAgICAgICAgbmFtZTpuYW1lLFxyXG4gICAgICAgICAgICAgICAgZGlmOm1ldHJvQnlTdG5bbmFtZV0uZGlmXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWV0QXJyYXkuc29ydChmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZGlmID4gYi5kaWYgPyAxIDogYS5kaWYgPCBiLmRpZiA/IC0xIDogMDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIG1ldFN0bkFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmRpZiA+IGIuZGlmID8gMSA6IGEuZGlmIDwgYi5kaWYgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3RpdGxlXCI+7Jet67OEPC9wPidcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19kaXZcIj4nXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRTdG5BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX3N0bk5hbWVcIj4nKyBtZXRTdG5BcnJheVtpXS5uYW1lICsgJ+yXrTwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fZGlmXCI+JysgTWF0aC5jZWlsKG1ldFN0bkFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTGluZVwiPidcclxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBtZXRTdG5BcnJheVtpXS5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihtZXRTdG5BcnJheVtpXS5saW5lW2tdLmxlbmd0aCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19saW5lTmFtZSBsbl8nK21ldFN0bkFycmF5W2ldLmxpbmVba10rJ1wiPicrbWV0U3RuQXJyYXlbaV0ubGluZVtrXSArICc8L3A+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2PidcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG5cclxuICAgICAgICB0eHQrPSc8cCBjbGFzcz1cInN1YndheV9faW5mb19fdGl0bGVcIj7rhbjshKDrs4Q8L3A+J1xyXG4gICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpdlwiPidcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2xpbmVcIj4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lTmFtZSBsbl8nK21ldEFycmF5W2ldLmxpbmUrJ1wiPicrbWV0QXJyYXlbaV0ubGluZSArICc8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fZGlmXCI+JysgTWF0aC5jZWlsKG1ldEFycmF5W2ldLmRpZi84MCkgKyAn67aEIOqxsOumrDwvcD4nXHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19zdG5OYW1lXCI+JysgbWV0QXJyYXlbaV0ubmFtZSArICfsl608L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgJChcIi5zdWJ3YXlfX2luZm9cIikuaHRtbCh0eHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdWJ3YXk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3N1YndheS5qcyIsImltcG9ydCBTZXRIb3RlbEluZm8gZnJvbSBcIi4vaG90ZWwvc2V0SG90ZWxJbmZvXCI7XHJcbmltcG9ydCBTZXRBcmVhIGZyb20gXCIuL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhXCI7XHJcblxyXG52YXIgSG90ZWwgPSB7XHJcblxyXG5cclxuICAgIC8vaW5mbGF0Ze2VmOuptCDtmLjthZTsnYQg66eM65Ok7Ja064K06riwIOychO2VnCDsoJXrs7Qg7IiY7KeRIOyDge2DnOqwgCDtkZzsi5zrkKggLT4gXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLm9uKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGVfc3RhdHVzKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuc3RhdHVzX19tYWtlX19ob3RlbFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSAkKHRoaXMpLmF0dHIoJ2NpZCcpO1xyXG4gICAgICAgICAgICB2YXIgY2l0eU5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcuc3RhdHVzX19jaXR5JykuaHRtbCgpO1xyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIGNpdHlOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuaG90ZWxfX2FsZXJ0X19jb25maXJtXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChcIi5ob3RlbF9fYWxlcnRfX3dyYXBcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuaG90ZWxcIikub24oXCJjbGlja1wiLCBcIi5jaXR5QXJlYV9fZmluaXNoXCIsIGZ1bmN0aW9uICgpIHsgIC8vc2V0QXJlYeulvCDrgZ3rgrzrlYxcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykuYXR0cignY2lkJyk7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5vbmNlKCd2YWx1ZScsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhW2hpZF0uYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbaGlkXS5hcmVhID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2hpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQrJy9ob3RlbHMnKS5zZXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ3NldHRpbmcvY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cy9hcmVhJykuc2V0KDIpO1xyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvc3RhdHVzL2FyZWEnKS5zZXQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jaXR5OiBmdW5jdGlvbihjaWQsIGNpdHlOYW1lKXtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIHZhciBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgIHZhciBhbGVydE1vZGFsID0gJyc7XHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICBhbGVydE1vZGFsICs9ICAgICAnPGRpdiBjbGFzcz1cImhvdGVsX19hbGVydFwiPic7XHJcblxyXG4gICAgICAgICAgICBpZighZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7qtIDqtJHsp4Ag7KCV67O06rCAIOyVhOyngSDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7tjrjsnZjsi5zshKQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLnNwb3RzKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuc3BvdHMucmFua2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuq0gOq0keyngCDsoJXrs7TqsIAg7JWE7KeBIOygleumrOuQmOyngCDslYrslZjsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+6rSA6rSR7KeAIOygleuztOqwgCDslYTsp4Eg7KCV66as65CY7KeAIOyViuyVmOyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5sb2NhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPu2OuOydmOyLnOyEpCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEubG9jYWwubWV0cm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoIWRhdGEubWV0cm9MaW5lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukKG1ldHJvTGluZSDsl4bsnYwpLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuyngOyXreq1rOu2hCDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoIWRhdGEuc3RhdHVzLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIFNldEFyZWEuaW5mbGF0ZShjaXR5TmFtZSwgY2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KCfsp4Dsl60g7ISk7KCV7J2EIOuovOyggCDsp4Ttlontlanri4jri6QnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRfX2NvbmZpcm1cIj7tmZXsnbg8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPC9kaXY+PC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIGlmKGNoZWNrKXtcclxuICAgICAgICAgICAgICAgIFNldEhvdGVsSW5mby5pbml0KGRhdGEsIGNpZCwgY2l0eU5hbWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIuaG90ZWxcIikuYXBwZW5kKGFsZXJ0TW9kYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfc3RhdHVzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPGgyPuyImeyGjCDrpqzsiqTtirg8L2gyPic7XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cIndyYXBwZXJcIj4nO1xyXG5cclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJzdGF0dXNfX2xpbmVyXCI+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX25hbWVcIj7rj4Tsi5zrqoU8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2VcIj7siJnshowg642w7J207YSwPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19ob3RlbFwiPuq4sOuzuCDtmLjthZTrjbDsnbTthLA8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj7sp4Dsl63soJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj7qtIDqtJHsp4DsoJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gICAgICAnPHAgY2xhc3M9XCJzdGF0dXNfX3RyYW5zcG9ydFwiPuuMgOykkeq1kO2GteygleuztDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgY2lkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSBjaXR5LnN0YXR1cztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cInN0YXR1c19fbGluZXJcIj4nO1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19jaXR5XCI+JytjaXR5Lm5hbWUrJzwvcD4nO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHN0YXR1cy5ob3RlbCA9PT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fbWFrZVwiPuyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2Ugc3RhdHVzX19tYWtlX19ob3RlbFwiICBjaWQ9XCInICsgY2l0eS5jb2RlICsgJ1wiPuyXhuydjCAo7YG066at7ZW0IOunjOuTpOq4sCk8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuaG90ZWw+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19ob3RlbFwiPlg8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fYXJlYVwiPk88L3A+JztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy5zcG90ID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3Nwb3RcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cy50cmFuc3BvcnQgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX3RyYW5zcG9ydFwiPlg8L3A+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2VzLmhvdGVsXCIpLmh0bWwodHh0KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvdGVsO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsLmpzIiwiaW1wb3J0IFNldEFUTSBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0QVRNLmpzXCI7XHJcbmltcG9ydCBTZXRGb29kIGZyb20gXCIuL3NldEhvdGVsSW5mby9zZXRGb29kLmpzXCI7XHJcbmltcG9ydCBTZXRNZXRybyBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0TWV0cm8uanNcIjtcclxuaW1wb3J0IFNldFNhZmV0eSBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0U2FmZXR5LmpzXCI7XHJcblxyXG5cclxudmFyIFNldEhvdGVsSW5mbyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEsIGNpZCwgY2l0eU5hbWUpe1xyXG4gICAgICAgIC8vc3RhdHVzQ2hlY2sg7KeE7ZaJXHJcbiAgICAgICAgdmFyIGNoZWNrVHh0ID0gJyc7XHJcblxyXG4gICAgICAgIHZhciBob3RlbCA9IGRhdGEuaG90ZWxzW09iamVjdC5rZXlzKGRhdGEuaG90ZWxzKVswXV07XHJcblxyXG4gICAgICAgIHZhciBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgIGxvY2FsOiB7XHJcbiAgICAgICAgICAgICAgICBhdG06IHsgLy8wOiDrjbDsnbTthLAg7JeG7J2MLCAxOiDrp4zrk6Qg7IiYIOyeiOydjCwgMjog7KG07J6s7ZWoXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzYTowLFxyXG4gICAgICAgICAgICAgICAgICAgIGNpdGk6MFxyXG4gICAgICAgICAgICAgICAgfSwgIFxyXG4gICAgICAgICAgICAgICAgZm9vZDogMCxcclxuICAgICAgICAgICAgICAgIG1ldHJvOiAwLFxyXG4gICAgICAgICAgICAgICAgc3BvdDowXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBhc3Nlc3NtZW50OiB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6MCxcclxuICAgICAgICAgICAgICAgIHNhZmV0eTowLFxyXG4gICAgICAgICAgICAgICAgdGhlbWU6MCxcclxuICAgICAgICAgICAgICAgIGNvbnZlbmllbmNlOjBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChob3RlbC5sb2NhbCkge1xyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwuYXRtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShob3RlbC5sb2NhbC5hdG0pKSB7IC8vVklTQSBBVE3snbQg7KCV66as65CY7KeAIOyViuydgCDtmJXtg5zroZwg65Ok7Ja06rCA7J6I64qUIOyDge2DnFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvL2F0beqwneyytOulvCDqsIDsp4Dqs6Ag7J6I64qUIOyDge2DnCAtIOuwmOuTnOyLnCB2aXNhIGF0beydtCDrk6TslrTqsIAg7J6I7Ja07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9IDI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5hdG0uY2l0aSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLmNpdGkgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sb2NhbC5hdG0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS5jaXRpID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/spJHsmpQ6IENJVEnsnpHsl4XsnYAgVklTQeyekeyXhSDtm4Tsl5Ag7J2066Oo7Ja07KC47JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHsgLy9sb2NhbOyXkCBhdG3snbQg7JeG7J2MIC0+IOu5hOyekCDstpTstpzrkJwg7KCB7J20IOyXhuydjFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sb2NhbC5hdG0pIHsgLy/qt7gg6rK97Jqw7JeQ64+EIENJVEnripQgUkFX642w7J207YSw66GcIOyhtOyerO2VoCDsiJgg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS5jaXRpID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAvL+ykkeyalDogQ0lUSeyekeyXheydgCBWSVNB7J6R7JeFIO2bhOyXkCDsnbTro6jslrTsoLjslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuZm9vZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5tZXRybykge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1ldHJvTGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob3RlbC5sb2NhbC5zcG90KSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zcG90cy5yYW5rZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLnZpc2EgPSAwOyAvL1ZJU0HripQg66y07KGw6rG0IO2YuO2FlCDroZzsu6zsl5Ag7KeB7KCRIOuTpOyWtOqwgOuvgOuhnCDtmLjthZQg66Gc7LusIOqyveuhnOqwgCDsl4bri6TripQg6rKD7J2AIFZJU0HqsIAg7JeG64uk64qUIOqygy5cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmF0bSkgeyAvL2NpdGnrgpggdmlzYeuKlCDtmLjthZQg66Gc7Lus7J20IOyVhOuLjCDrj4Tsi5wg66Gc7Lus7JeQIOyggOyepeuQoCDsiJgg7J6I7J2MLlxyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS5jaXRpID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubG9jYWwuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5tZXRyb0xpbmUpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5zcG90cy5yYW5rZWQpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5zcG90ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hlY2tUeHQgKz0gJzxoMiBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3RpdGxlXCI+7Zi47YWUIOyjvOuzgOygleuztDwvaDI+JztcclxuXHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwuYXRtLnZpc2EgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwgVklTQSBBVE3soJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmF0bS52aXNhID09PSAxKSB7XHJcbiAgICAgICAgICAgIFNldEFUTS5pbml0KGRhdGEsIGNpZCk7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk1ha2luZyAtIFJBVyBWSVNBIEFUTeygleuztCDtmZXsnbguIO2YuO2FlOuzhOuhnCDqsIDsnqUg6rCA6rmM7Jq0IEFUTeqzvCAyNOyLnOqwhCBBVE3snYQg7LaU7Lac7ZWp64uI64ukLjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmF0bS52aXNhID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIFZJU0EgQVRN7KCV67O06rCAIOyXhuyKteuLiOuLpC4gVklTQSBBVE0gbG9jYXRvcuyXkOyEnCDsoJXrs7Trpbwg66i87KCAIO2BrOuhpOunge2VtOyjvOyEuOyalC48L3A+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwuYXRtLmNpdGkgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwgQ0lUSSBBVE3soJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmF0bS5jaXRpID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk1ha2luZyAtIFJBVyBDSVRJIEFUTeygleuztCDtmZXsnbguIOqwgOyepSDqsIDquYzsmrQgQ0lUSSBBVE3snYQg7LaU7Lac7ZWp64uI64ukLjwvcD4nO1xyXG4gICAgICAgIH0gLy8gY2l0aSBzdGF0dXMgMOydgCDsl4bsnYwuXHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwuZm9vZCA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCDsi53ro4ztkojsoJAv7Y647J2Y7KCQIOygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuZm9vZCA9PT0gMSkge1xyXG4gICAgICAgICAgICBTZXRGb29kLmluaXQoZGF0YSwgY2lkKTtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIOyLneujjO2SiOygkC/tjrjsnZjsoJAg7KCV67O0IO2ZleyduC4g7Zi47YWU67OE66GcIOqwgOq5jOyatCDsi53ro4ztkojsoJAg7LaU7LacLjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmZvb2QgPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0g64+E7IucIOyLneujjO2SiOygkC/tjrjsnZjsoJAg7KCV67O06rCAIOyXhuyKteuLiOuLpC4g66i87KCAIOygleuztOulvCDsnoXroKXtlbTso7zshLjsmpQuPC9wPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLm1ldHJvID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIOyngO2VmOyyoC/rjIDspJHqtZDthrUg7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5tZXRybyA9PT0gMSkge1xyXG4gICAgICAgICAgICBTZXRNZXRyby5pbml0KGRhdGEsIGNpdHlOYW1lKTtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIOyngO2VmOyyoC/rjIDspJHqtZDthrUg7KCV67O0IO2ZleyduC4g7Zi47YWU67OE66GcIOqwgOq5jOyatCDsp4DtlZjssqAg7LaU7LacLjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLm1ldHJvID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIOuPhOyLnCDsp4DtlZjssqAv64yA7KSR6rWQ7Ya1IOygleuztOqwgCDsl4bsirXri4jri6QuIOuovOyggCDsoJXrs7Trpbwg7J6F66Cl7ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5zcG90ID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIOq0gOq0keyngCDsoJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLnNwb3QgPT09IDEpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+TWFraW5nIC0gUkFXIOq0gOq0keyngCDsoJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA6rmM7Jq0IOq0gOq0keyngCDstpTstpwuPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwuc3BvdCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHQgY29sb3ItLXJlZFwiPk5vIERhdGEgLSDrj4Tsi5wg6rSA6rSR7KeAIOyInOychOqwgCDslYTsp4Eg7ZmV7KCV65CY7KeAIOyViuyVmOyKteuLiOuLpC4g66i87KCAIO2ZleyduO2VtOyjvOyEuOyalC48L3A+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFNldFNhZmV0eS5pbml0KGRhdGEsIGNpdHlOYW1lKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coY2hlY2tUeHQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0SG90ZWxJbmZvO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby5qcyIsImltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldEFUTSA9IHtcclxuICAgIHN0YXRpc3RpYzoge1xyXG4gICAgICAgIG5lYXJlc3Q6W10sIC8v6rCA7J6lIOqwgOq5jOyatCBBVE3snYAg66qHIG0g6rGw66as7JeQIOyeiOuKlOyngCDrj4Tsi5wg7KCE7LK0IO2Pieq3oOydhCDrgrTquLAg7JyE7ZWcIOuNsOydtO2EsFxyXG4gICAgICAgIGJhbmsyNDpbXSwgICAvLzI07Iuc6rCEIOyatOyYge2VmOuKlCDsnYDtlokg7IaM7JygIOqxsOumrOyXkCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgICAgICBpbjEzMDpbXSAvL+uwmOqyvSAxMzBtIOuCtOyXkCBBVE3snbQg66qHIOqwnCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgIH0sXHJcbiAgICBieUFyZWE6IHt9LCAvL2luMTMwIHN0YXTsnYQg7KeA7Jet67OE66GcIO2Pieq3oOuCtOq4sCDsnITtlZwg6rCd7LK0XHJcblxyXG4gICAgZGF0YTp7fSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSwgY2lkKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5maXJzdF9ieUhvdGVscygpOyAvL+2YuO2FlOuTpOydhCDrj4zrqbAg6rCA7J6lIOqwgOq5jOyatCBBVE0sIOydgO2WieyGjOycoCAyNOyLnOqwhCBBVE0sIDEzMG3slYjsl5Ag66qHIOqwnCBBVE0g7J6I64qU7KeA66W8IOywvuyVhOuCtOqzoCDthrXqs4Tsl5Drj4Qg6riw66GdXHJcbiAgICAgICAgdGhpcy5zZWNvbmRfYnlBcmVhcygpOyAvL+yngOyXreuzhOuhnCAxMzBtIOuCtOyXkCDsnojripQgQVRNIOqwr+yImCDtj4nqt6DsnYQg64OEIC0+IOyngOyXrSDsg4Hsl4Ug67Cc7KCE64+E66W8IOuCmOykkeyXkCDssrTtgaztlZjquLAg7JyE7ZW0IOunjOuTpOyXiOydjC5cclxuICAgICAgICB0aGlzLnRoaXJkX21ha2VTdGF0cygpOyAvL2ZpcnN07JeQ7IScIOq4sOuhne2VnCDthrXqs4Qg64K07Jqp7J2EIOqwgOyngOqzoCDthrXqs4TqsJLrk6TsnYQg7IKw7Lac7ZW064OELlxyXG4gICAgICAgIHRoaXMuZm91cnRoX21ha2VSYW5rKCk7IC8v7Ya16rOE7JeQIOq4sOuhneuQnCDqsJLsnYQg67CU7YOV7Jy866GcIO2YuO2FlOuzhCBhdG3tjrjsnZjshLEg656t7YK57J2EIOqzhOyCsO2VqCjsmIgtQVRN6rCA6rmM7Jq0IOygleuPhOuKlCDribTsmpUg64K0IDfsnIQuLi4pXHJcbiAgICAgICAgdGhpcy5maWZ0aF9tYWtlU2NvcmUoKTtcclxuICAgICAgICB0aGlzLnNpeHRoX3dvcmRpbmcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgZmlyc3RfYnlIb3RlbHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGhvdGVscyA9IHRoaXMuZGF0YS5ob3RlbHM7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgaGlkIGluIGhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSBob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgaWYgKGhvdGVsLnRlbXApIHsgLy9ob3RlbC50ZW1w66GcIOuwlOq/gOqyg+yehFxyXG4gICAgICAgICAgICAgICAgdmFyIGF0bUFyciA9IGhvdGVsLnRlbXAuYXRtO1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0bU9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuZWFyZXN0OiBhdG1BcnJbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW4xMzA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFuazI0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBhdG1PYmoubmVhcmVzdC5kaWYgPSBjYWxjdWxhdGVEaWYoYXRtQXJyWzBdLmNvb3IsIGhvdGVsLmNvb3IpOyAvL+yImeyGjOuzhCDqsIDsnqUg6rCA6rmM7Jq0IGF0bSDri7TsnYxcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYXRtQXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdG1BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF0bSA9IGF0bUFycltpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihhdG0uY29vciwgaG90ZWwuY29vcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMTMwLjEpIHsgLy/siJnshozrs4QgMTMwbeqxsOumrCBhdG0g6rCv7IiYIOyytO2BrFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtT2JqLmluMTMwKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYXRtT2JqLmJhbmsyNCkgey8v6riw67O47KCB7Jy866GcIOqxsOumrOyInCDsoJXroKwg65CY7Ja07J6I7Ja07IScIOydtOuvuCDrk6TslrTqsIDsnojsnLzrqbQg6re464aI7J20IOuNlCDqsIDquYzsmrTrhohcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWYgPCAyMzApIHsgLy/siJnshozrs4Qg7J2A7ZaJIOyGjOycoCAyNOyLnOqwhCBhdG0g64u07J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChhdG0ub3duZXIuaW5jbHVkZXMoXCJCQU5LXCIpfHxhdG0ucGxhY2VOYW1lLmluY2x1ZGVzKFwiQkFOS1wiKSkgJiYgYXRtLmlzMjQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtT2JqLmJhbmsyNCA9IGF0bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtT2JqLmJhbmsyNC5kaWYgPSBkaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v7Ya16rOE7JeQIOq4sOuhne2VmOq4sFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5uZWFyZXN0LnB1c2goYXRtT2JqLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXRtT2JqLmJhbmsyNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5iYW5rMjQucHVzaChhdG1PYmouYmFuazI0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMuYmFuazI0LnB1c2goMjMwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJObysrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmF0bSA9IGF0bU9iajtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsID0ge2F0bTogYXRtT2JqfTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2luMTMw7J2AIO2YuO2FlOydhCDtlZwg67KIIOuLpCDrj4gg64uk7J2M7JeQIO2GteqzhOyXkCDquLDroZ3tlaAg7IiYIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMuaW4xMzAucHVzaChhdG1PYmouaW4xMzApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYnlBcmVhW2hvdGVsLmFyZWFdKXsvL+yngOyXreuzhCBhdG0g67CA7KeR64+E66W8IO2ZleyduO2VmOuKlCDqt7jrn7Ag64WA7ISdXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0ucHVzaChhdG1PYmouaW4xMzApO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ieUFyZWFbaG90ZWwuYXJlYV0gPSBbYXRtT2JqLmluMTMwXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChgVklTQSBBVE0g7KCV67O06rCAIOyXhuuKlCDtmLjthZTsnbQg7J6I7Iq164uI64ukLiDtmZXsnbgg7ZuEIOyerOyLnOuPhO2VtOyjvOyEuOyalGApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZWNvbmRfYnlBcmVhczogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgYXJlYSA9IHRoaXMuZGF0YS5hcmVhO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHN1bSA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZighYXJlYVtpXS5ub3RBcmVhKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYnlBcmVhW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXRtcyA9IHRoaXMuYnlBcmVhW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGF0bXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGF0bXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXRtcy5sZW5ndGggPCAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbnVzID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGF0bXMgPSAoc3VtLyhhdG1zLmxlbmd0aCkgKyBhdG1zLmxlbmd0aC8xMCkgKyBtaW51cztcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmVhW2ldLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbC5hdG0gPSBhdG1zLnRvRml4ZWQoMikqMTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bTogYXRtcy50b0ZpeGVkKDIpKjFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmVhW2ldLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbC5hdG0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRtOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB0aGlyZF9tYWtlU3RhdHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHN0YXQgPSB7XHJcbiAgICAgICAgICAgIG5lYXJlc3Q6IDAsXHJcbiAgICAgICAgICAgIGluMTMwOiAwLFxyXG4gICAgICAgICAgICBiYW5rMjQ6IDBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpZCBpbiBzdGF0KSB7XHJcbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMuc3RhdGlzdGljW2lkXS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgc3VtICs9IHRoaXMuc3RhdGlzdGljW2lkXVtrXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdGF0W2lkXSA9IHN1bS90aGlzLnN0YXRpc3RpY1tpZF0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBzdGF0W2lkXSA9IHN0YXRbaWRdLnRvRml4ZWQoMikqMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGF0YS5zdGF0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5kYXRhLnN0YXQubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0YXQubG9jYWwuYXRtID0gc3RhdDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3RhdC5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhdG06IHN0YXRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnN0YXQgPSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbDp7YXRtOnN0YXR9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmb3VydGhfbWFrZVJhbms6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGlzdGljLm5lYXJlc3Quc29ydCgoYSwgYikgPT4gYSAtIGIpO1xyXG4gICAgICAgIHRoaXMuc3RhdGlzdGljLmJhbmsyNC5zb3J0KChhLCBiKSA9PiBhIC0gYik7XHJcbiAgICAgICAgdGhpcy5zdGF0aXN0aWMuaW4xMzAuc29ydCgoYSwgYikgPT4gYiAtIGEpO1xyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEuaG90ZWxzKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgdmFyIGF0bSA9IGhvdGVsLmxvY2FsLmF0bTtcclxuICAgICAgICAgICAgdmFyIHJhbmsgPSB7IC8v6ry07KeAIOuere2BrOulvCDrtoDsl6ztlaggLT4g7Zi57IucIGhvdGVs7JeQIOqwgSDrgrTsmqnrk6TsnbQg7JeG64uk66m0IOuere2BrOuKlCDqvLTssIxcclxuICAgICAgICAgICAgICAgIGJhbmsyNDogdG90YWwsXHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0OiB0b3RhbCxcclxuICAgICAgICAgICAgICAgIGluMTMwOiB0b3RhbFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJhbmspIHtcclxuICAgICAgICAgICAgICAgIGlmKGtleSA9PT0gXCJpbjEzMFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihhdG1ba2V5XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmtba2V5XSA9IHRoaXMuc3RhdGlzdGljW2tleV0uaW5kZXhPZihhdG1ba2V5XSkrMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihhdG1ba2V5XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmtba2V5XSA9IHRoaXMuc3RhdGlzdGljW2tleV0uaW5kZXhPZihhdG1ba2V5XS5kaWYpKzE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaG90ZWwucmFuayl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5yYW5rLmF0bSA9IHJhbms7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwucmFuayA9IHthdG06cmFua307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpZnRoX21ha2VTY29yZTogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIHNjb3JlQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICB2YXIgYXRtID0gaG90ZWwucmFuay5hdG07XHJcbiAgICAgICAgICAgIHZhciB3ZWlnaHQgPSBDb25maWcuYXRtLnNjb3JlLndlaWdodDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gKGF0bS5iYW5rMjQqd2VpZ2h0LmJhbmsyNCArIGF0bS5uZWFyZXN0KndlaWdodC5uZWFyZXN0ICsgYXRtLmluMTMwKndlaWdodC5pbjEzMCk7XHJcblxyXG4gICAgICAgICAgICBzY29yZUFycmF5LnB1c2goe3Njb3JlOnNjb3JlLGhpZDpoaWR9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBhLnNjb3JlIC0gYi5zY29yZSk7IC8v64Ku7J2E7IiY66GdIOyii+ydjFxyXG5cclxuXHJcbiAgICAgICAgdmFyIHRvdGFsID0gc2NvcmVBcnJheS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciByYW5rU3lzID0gQ29uZmlnLmF0bS5zY29yZS5wZXJjZW50aWxlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IHNjb3JlQXJyYXlbaV0uaGlkO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICB2YXIgcmFuayA9ICgoaSsxKSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoMTAtaikgLSBNYXRoLmNlaWwoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC5zY29yZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5hdG0gPSBzY29yZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUgPSB7YXRtOnNjb3JlfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlOnthdG06c2NvcmV9LFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmQ6e2F0bTpcIlwifVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGZjOiBmdW5jdGlvbih0eXBlLCBob3RlbCl7ICAgIC8vdGV4dCBmcm9tIGNvbmZpZ1xyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEuaG90ZWxzKS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciByYW5rID0gMDtcclxuICAgICAgICBpZih0eXBlID09PSBcImludGVncmF0ZVwiKXtcclxuICAgICAgICAgICAgcmFuayA9IChob3RlbC5yYW5rLmF0bS5iYW5rMjQgLyB0b3RhbCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJhbmsgPSAoaG90ZWwucmFuay5hdG1bdHlwZV0gLyB0b3RhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY29uZmlnID0gQ29uZmlnLmF0bS53b3JkO1xyXG4gICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICBsZXQgaW5TdGQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWdbdHlwZV0uc3RkLmxlbmd0aDsgaSsrKSB7ICAgLy9u67aEIOqxsOumrOyXkCDsnojri6QuXHJcbiAgICAgICAgICAgIGlmKCFpblN0ZCl7XHJcbiAgICAgICAgICAgICAgICBpZihyYW5rIDwgY29uZmlnW3R5cGVdLnN0ZFtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9IGNvbmZpZ1t0eXBlXS53b3JkW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGluU3RkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZighaW5TdGQpe1xyXG4gICAgICAgICAgICB0eHQgKz0gY29uZmlnW3R5cGVdLndvcmRbY29uZmlnW3R5cGVdLnN0ZC5sZW5ndGhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHR4dDtcclxuICAgIH0sXHJcblxyXG4gICAgc2l4dGhfd29yZGluZzogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICAgICAgdmFyIGF0bSA9IGhvdGVsLmxvY2FsLmF0bTtcclxuXHJcbiAgICAgICAgICAgIC8vIDEuIOqwgOyepSDqsIDquYzsmrQgQVRN7J20IDI07Iuc6rCEIOyYgeyXhe2VmOuKlCBBVE3snbTqsbDrgpgsIOqxsOumrCDssKjsnbTqsIAgNTBtIOydtOuCtOyduCDqsr3smrAgLT4gMjTsi5zqsIQgQVRNIOybjOuUqeycvOuhnCDthrXtlalcclxuICAgICAgICAgICAgLy8gMi4gMeydtCDslYTri5Ag6rK97JqwIOqwgOyepSDqsIDquYzsmrQgQVRN7J2AIOuPhOuztCDri6ggTuu2hOqxsOumrOyXkCDsnojqs6AsIDI07Iuc6rCEIOyYpO2UiCBBVE3rj4Qg64+E67O066GcIE7rtoTqsbDrpqzsl5Ag7J6I7Ja07IScIH5cclxuICAgICAgICAgICAgLy8gMy4g7J2A7ZaJ7IaM7JygIDI07Iuc6rCEIEFUTeydtCDsl4bripQg6rK97JqwIC0+IOqwgOyepSDqsIDquYzsmrQgQVRN7J2AIOuPhOuztCBO67aE6rGw66asLCDsnYDtlokg7IaM7JygIDI07Iuc6rCEIEFUTeydgCDsl4bsnYxcclxuXHJcbiAgICAgICAgICAgIGlmKGF0bS5iYW5rMjQpe1xyXG4gICAgICAgICAgICAgICAgaWYoYXRtLmJhbmsyNC5kaWYgPCBhdG0ubmVhcmVzdC5kaWYgKyA1MCl7IC8v7Iuc64KY66as7JikMVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihhdG0uYmFuazI0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ID0gYDI07Iuc6rCEIOyYgeyXhe2VmOuKlCDsnYDtlokg7IaM7JygIEFUTeydtCAke2RpZn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSB0aGlzLnRmYygnaW50ZWdyYXRlJywgaG90ZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNleyAvL+yLnOuCmOumrOyYpCAyXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGRpZlRvTWluKGF0bS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZjI0ID0gZGlmVG9NaW4oYXRtLmJhbmsyNC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSBg6rCA7J6lIOqwgOq5jOyatCBBVE3snYAg64+E67O0ICR7ZGlmfSDqsbDrpqzsl5Ag7J6I6rOgLCDsnYDtlonsnbQg7IaM7Jyg7ZWcIDI07Iuc6rCEIOyYpO2UiCBBVE3rj4Qg64+E67O0ICR7ZGlmMjR9YDtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gdGhpcy50ZmMoJ25lYXJlc3QnLCBob3RlbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IGRpZlRvTWluKGF0bS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gYOqwgOyepSDqsIDquYzsmrQgQVRN7J2AIOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyeiOydjC5gO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC53b3JkKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5hdG0gPSB0eHQ7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkID0ge2F0bTp0eHR9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0QVRNO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBVE0uanMiLCJpbXBvcnQgR2VvQ29kZSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlcy9nZW9Db2RlLmpzXCI7XHJcbmltcG9ydCBDb25maWcgZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFNldEZvb2QgPSB7XHJcbiAgICBkYXRhOnt9LFxyXG5cclxuICAgIHN0YXRpc3RpYzp7XHJcbiAgICAgICAgbmVhcmVzdDpbXSxcclxuICAgICAgICBuZWFyYnk6W11cclxuICAgIH0sXHJcbiAgICBieUFyZWE6e30sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2lkKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIGlmKHRoaXMuZmlyc3RfZ2VvQ29kZShjaWQpKXsgICAgLy/sp4DsmKTsvZTrlKkg7ZWgIOqyjCDsl4bsnLzrqbQgc2Vjb25k67aA7YSwIOynhO2Wie2VqFxyXG4gICAgICAgICAgICB0aGlzLnNlY29uZF9zZXRGb29kKCk7ICAvL+yImeyGjOuzhOuhnCDsi53ro4ztkojsoJDrk6TsnYQg65WM66Ck64Sj7J2MXHJcbiAgICAgICAgICAgIHRoaXMudGhpcmRfYnlBcmVhcygpOyAvL+2GteqzhOqwkuydhCDrp4zrk6TslrTrg4RcclxuICAgICAgICAgICAgdGhpcy5mb3VydGhfbWFrZVN0YXRzKCk7IC8v7Ya16rOE6rCS7J2EIOunjOuTpOyWtOuDhCAtIGNpZC9zdGF0L2xvY2FsL2Zvb2Qg65286rOgIOuTpOyWtOqwiOqyg+yehFxyXG4gICAgICAgICAgICB0aGlzLmZpZnRoX21ha2VTY29yZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNpeHRoX3dvcmRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2l4dGhfd29yZGluZzogZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyF0b2RvISEhIOyngOq4iOydgCDribTsmpUg6riw7KSA7Jy866GcIOuQmOyWtOyeiOydjCAtPiDrj4Tsi5zrs4TroZwg64KY64iE6riwKOyYiC3tjrjsnZjsoJAg7J6I64qUIOuPhOyLnOyaqSlcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICB2YXIgdHh0ID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbC5mb29kKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9vZCA9IGhvdGVsLmxvY2FsLmZvb2Q7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZm9vZC5ncm9jZXJ5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZm9vZC5sYXJnZSl7IC8v65GYIOuLpCDsnojripQg7LyA7J207IqkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gZGlmVG9NaW4oZm9vZC5sYXJnZS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgam9zYSA9IGZvb2QubGFyZ2UubmVhcmVzdC5qb3NhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBmb29kLmxhcmdlLm5lYXJlc3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZvb2QubGFyZ2UubmVhcmVzdC5kaWYgPCBmb29kLmdyb2NlcnkubmVhcmVzdC5kaWYgKyA1MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gYOqwgeyihSDsi53ro4ztkojsnYQg7IK0IOyImCDsnojripQg64yA7ZiVIOuniO2KuOyduCAke25hbWV9JHtqb3NhfSDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYxgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdkaWYgPSBkaWZUb01pbihmb29kLmdyb2NlcnkubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCA9IGDqsITri6jtlZwg66i56rGw66as66W8IOyCtCDsiJgg7J6I64qUIOyLneujjO2SiOygkOydtCDrj4Trs7QgJHtnZGlmfSDqsbDrpqzsl5Ag7J6I6rOgLCDqsIHsooUg7J2M7Iud65Ok7J2EIOyCtCDsiJgg7J6I64qUIOuMgO2YlSDrp4jtirggJHtuYW1lfSR7am9zYX0g64+E67O0ICR7ZGlmfSDqsbDrpqzsl5Ag7J6I7J2MYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7ICAvL2dyb2Nlcnnrp4wg7J6I64qUIOy8gOydtOyKpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGRpZlRvTWluKGZvb2QuZ3JvY2VyeS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSBg6rCE64uo7ZWcIOuoueqxsOumrOulvCDsgrQg7IiYIOyeiOuKlCDsi53ro4ztkojsoJDsnbQg64+E67O0ICR7ZGlmfSDqsbDrpqzsl5Ag7J6I7J2MYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGZvb2QubGFyZ2UpeyAvLy/so7zrs4Dsl5AgZ3JvY2VyeeuKlCDsl4bripTrjbAgbGFyZ2Xrp4wg7J6I64qUIO2KueydtOy8gOydtOyKpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gZGlmVG9NaW4oZm9vZC5sYXJnZS5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gZm9vZC5sYXJnZS5uZWFyZXN0Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqb3NhID0gZm9vZC5sYXJnZS5uZWFyZXN0Lmpvc2E7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCA9IGDqsIHsooUg7Iud66OM7ZKI7J2EIOyCtCDsiJgg7J6I64qUIOuMgO2YlSDrp4jtirggJHtuYW1lfSR7am9zYX0g64+E67O0ICR7ZGlmfSDqsbDrpqzsl5Ag7J6I7J2MYDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgPSAn7Iud66OM7ZKI7J2EIOyCtCDrp4ztlZwg6rOz7J2AIOyjvOuzgCA167aE6rGw66asIOydtOuCtOyXkCDsl4bsnYwnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHR4dCA9ICfsi53ro4ztkojsnYQg7IK0IOunjO2VnCDqs7PsnYAg7KO867OAIDXrtoTqsbDrpqwg7J2064K07JeQIOyXhuydjCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQud29yZCl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQuZm9vZCA9IHR4dDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQgPSB7Zm9vZDp0eHR9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmaWZ0aF9tYWtlU2NvcmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHNjb3JlQXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmZvb2Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtpbmQgaW4gaG90ZWwubG9jYWwuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9vZCA9IGhvdGVsLmxvY2FsLmZvb2Rba2luZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZWFyZXN0RGlmID0gZm9vZC5uZWFyZXN0LmRpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IChDb25maWcuZm9vZC5raW5kW2tpbmRdLnN0ZCAtIG5lYXJlc3REaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihDb25maWcuZm9vZC5raW5kW2tpbmRdLm11bHRpcGxlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gc2NvcmUgKiBDb25maWcuZm9vZC5raW5kW2tpbmRdLm11bHRpcGxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGZvb2QubmVhcmJ5KjI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNjb3JlQXJyYXkucHVzaCh7c2NvcmU6c2NvcmUsaGlkOmhpZH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzY29yZUFycmF5LnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTsgLy/rhpLsnYTsiJjroZ0g7KKL7J2MXHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5mb29kLnNjb3JlLnBlcmNlbnRpbGU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcmVBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaGlkID0gc2NvcmVBcnJheVtpXS5oaWQ7XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCByYW5rID0gKChpKzEpIC8gdG90YWwpOyAvLyDrsLHrtoTsnIQgLSAwfjEgKOuGkuydhOyImOuhnSAw7JeQIOqwgOq5jOybgClcclxuICAgICAgICAgICAgdmFyIHBlcmNlbnRpbGUgPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlzUmFua2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJhbmtTeXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKCFpc1JhbmtlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbnVzID0gcGVyY2VudGlsZTtcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50aWxlICs9IHJhbmtTeXNbal07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhbms8cGVyY2VudGlsZSl7ICAvLzM1JSDslYjsl5Ag65Ok66m0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmsgLT0gbWludXM7ICAgLy9yYW5r66W8IDB+MC4y66GcIOunnuy2sOykjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSA9ICgxMC1qKSAtIE1hdGguY2VpbCgocmFuay9yYW5rU3lzW2pdKSoxMCkvMTA7IC8vcmFuaygwfjAuMinrpbwgMC4y66GcIOuCmOuIiOqwkioxMC8xMCAtPiAwfjAuOeqwgCDrgpjsmLRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSYW5rZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudCl7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50LnNjb3JlKXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlLmZvb2QgPSBzY29yZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUgPSB7Zm9vZDpzY29yZX07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZTp7Zm9vZDpzY29yZX0sXHJcbiAgICAgICAgICAgICAgICAgICAgd29yZDp7Zm9vZDpcIlwifVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZm91cnRoX21ha2VTdGF0czogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgc3RhdCA9IHtcclxuICAgICAgICAgICAgbmVhcmVzdDogMCxcclxuICAgICAgICAgICAgbmVhcmJ5OjBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpZCBpbiBzdGF0KSB7XHJcbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMuc3RhdGlzdGljW2lkXS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgc3VtICs9IHRoaXMuc3RhdGlzdGljW2lkXVtrXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdGF0W2lkXSA9IHN1bS90aGlzLnN0YXRpc3RpY1tpZF0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBzdGF0W2lkXSA9IHN0YXRbaWRdLnRvRml4ZWQoMikqMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGF0YS5zdGF0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5kYXRhLnN0YXQubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0YXQubG9jYWwuZm9vZCA9IHN0YXQ7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0YXQubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vZDogc3RhdFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc3RhdCA9IHtcclxuICAgICAgICAgICAgICAgIGxvY2FsOntmb29kOnN0YXR9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB0aGlyZF9ieUFyZWFzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBhcmVhID0gdGhpcy5kYXRhLmFyZWE7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJlYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmKCFhcmVhW2ldLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ieUFyZWFbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb29kcyA9IHRoaXMuYnlBcmVhW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGZvb2RzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bSArPSBmb29kc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbnVzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZihmb29kcy5sZW5ndGggPCAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbnVzID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvb2RzID0gKHN1bS8oZm9vZHMubGVuZ3RoKSArIGZvb2RzLmxlbmd0aC8xMCkgKyBtaW51cztcclxuICAgICAgICAgICAgICAgICAgICBpZihhcmVhW2ldLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbC5mb29kID0gZm9vZHMudG9GaXhlZCgyKSoxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vZDogZm9vZHMudG9GaXhlZCgyKSoxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJlYVtpXS5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwuZm9vZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb29kOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZWNvbmRfc2V0Rm9vZDogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciBpc1NvbWVGb29kID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCB0eXBlIGluIHRoaXMuZGF0YS5sb2NhbC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3JvQXJyID0gdGhpcy5kYXRhLmxvY2FsLmZvb2RbdHlwZV07XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RkID0gQ29uZmlnLmZvb2Qua2luZFt0eXBlXS5zdGQ7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm9BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9vZCA9IGdyb0FycltpXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmID0gY2FsY3VsYXRlRGlmKGhvdGVsLmNvb3IsIGZvb2QuY29vcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRpZjxzdGQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NvbWVGb29kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vZC5kaWYgPSBkaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb2QudHlwZSA9IHR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC50ZW1wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLnRlbXAuZm9vZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwudGVtcC5mb29kW3R5cGVdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwudGVtcC5mb29kW3R5cGVdLnB1c2goZm9vZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZFt0eXBlXSA9IFtmb29kXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2RbdHlwZV0gPSBbZm9vZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwudGVtcCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb29kOnt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwudGVtcC5mb29kW3R5cGVdID0gW2Zvb2RdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighaXNTb21lRm9vZCl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2QgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmVhcmJ5ID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBuZWFyZXN0ID0ge2RpZjo5OTl9O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gaG90ZWwudGVtcC5mb29kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwudGVtcC5mb29kW3R5cGVdLnNvcnQoKGEsIGIpID0+IGEuZGlmIC0gYi5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb29kQXJyID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAgaG90ZWwudGVtcC5mb29kW3R5cGVdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3B5ID0gJC5leHRlbmQodHJ1ZSx7fSxob3RlbC50ZW1wLmZvb2RbdHlwZV1baV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb29kQXJyLnB1c2goY29weSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZWFyYnkgKz0gZm9vZEFyci5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZvb2RBcnJbMF0uZGlmIDwgbmVhcmVzdC5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWFyZXN0ID0gZm9vZEFyclswXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZvb2RBcnIubGVuZ3RoPjUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb29kQXJyLmxlbmd0aCA9IDU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsLmZvb2Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuZm9vZFt0eXBlXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyYnk6IGhvdGVsLnRlbXAuZm9vZFt0eXBlXS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcjU6IGZvb2RBcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDogZm9vZEFyclswXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5mb29kID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5mb29kW3R5cGVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJieTogaG90ZWwudGVtcC5mb29kW3R5cGVdLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyNTogZm9vZEFycixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyZXN0OiBmb29kQXJyWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsID0ge2Zvb2Q6e319O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5sb2NhbC5mb29kW3R5cGVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmJ5OiBob3RlbC50ZW1wLmZvb2RbdHlwZV0ubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcjU6IGZvb2RBcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyZXN0OiBmb29kQXJyWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYnlBcmVhW2hvdGVsLmFyZWFdKXsvL+yngOyXreuzhCBmb29kIOuwgOynkeuPhOulvCDtmZXsnbjtlZjripQg6re465+wIOuFgOyEnVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnlBcmVhW2hvdGVsLmFyZWFdLnB1c2gobmVhcmJ5KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnlBcmVhW2hvdGVsLmFyZWFdID0gW25lYXJieV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmVzdC5wdXNoKG5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLm5lYXJieS5wdXNoKG5lYXJieSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpcnN0X2dlb0NvZGU6IGZ1bmN0aW9uKGNpZCl7XHJcbiAgICAgICAgdmFyIGdyb0FyciA9IHRoaXMuZGF0YS5sb2NhbC5mb29kLmdyb2Nlcnk7XHJcbiAgICAgICAgdmFyIGdlb0FyciA9IFtdO1xyXG4gICAgICAgIHZhciBpc0dlb05lZWRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgZ3JvY2VyeSA9IGdyb0FycltpXTtcclxuICAgICAgICAgICAgaWYoIWdyb2NlcnkuY29vcil7XHJcbiAgICAgICAgICAgICAgICBnZW9BcnIucHVzaCh7YWRkcmVzczpncm9jZXJ5LmFkZHJlc3MsIGFpZDppfSk7XHJcbiAgICAgICAgICAgICAgICBpc0dlb05lZWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoIWdyb2NlcnkuY29vci5sYXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGdlb0Fyci5wdXNoKHthZGRyZXNzOmdyb2NlcnkuYWRkcmVzcywgYWlkOml9KTtcclxuICAgICAgICAgICAgICAgICAgICBpc0dlb05lZWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNHZW9OZWVkZWQpe1xyXG4gICAgICAgICAgICB2YXIgcmVmID0gXCJjaXRpZXMvXCIrY2lkK1wiL2xvY2FsL2Zvb2QvZ3JvY2VyeVwiO1xyXG4gICAgICAgICAgICBHZW9Db2RlLmluaXQoZ2VvQXJyLCByZWYpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldEZvb2Q7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEZvb2QuanMiLCJpbXBvcnQgQ29uZmlnIGZyb20gXCIuLi9jb25maWcuanNcIjtcclxuXHJcbnZhciBTZXRNZXRybyA9IHtcclxuICAgIHN0YXRpc3RpYzp7bmVhcmVzdDpbXX0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2l0eU5hbWUpe1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5jaXR5TmFtZSA9IGNpdHlOYW1lO1xyXG4gICAgICAgIHRoaXMuZmlyc3Rfc2V0TWV0cm8oKTsgLy/siJnshozrs4TroZwg7KeA7ZWY7LKg7J2EIOuVjOugpOuEo+ydjFxyXG4gICAgICAgIHRoaXMuc2Vjb25kX2J5QXJlYXMoKTtcclxuICAgICAgICB0aGlzLnRoaXJkX21ha2VTY29yZSgpO1xyXG4gICAgICAgIHRoaXMuZm91cnRoX3dvcmRpbmcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgZm91cnRoX3dvcmRpbmc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGNpdHlOYW1lID0gdGhpcy5jaXR5TmFtZTtcclxuICAgICAgICB2YXIgdG90YWxMaW5lID0gT2JqZWN0LmtleXModGhpcy5kYXRhLm1ldHJvTGluZSkubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGxldCB0eHRBcnIgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtZXRybyA9IGhvdGVsLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgICAgICBpZihtZXRybyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmVhcmVzdERpZiA9IGRpZlRvTWluKG1ldHJvLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgIHZhciBuZWFyZXN0U3RuID0gbWV0cm8ubmVhcmVzdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVObyA9IE9iamVjdC5rZXlzKG1ldHJvLmJ5TGluZSkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNwb3RObyA9IE9iamVjdC5rZXlzKG1ldHJvLnNwb3QpLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHZhciBzY29yZSA9IGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUubWV0cm87XHJcbiAgICAgICAgICAgICAgICB2YXIgYXZnVGltZSA9IGRpZlRvTWluKG1ldHJvLmF2Z0RpZik7XHJcbiAgICAgICAgICAgICAgICB0eHRBcnIucHVzaChg7IiZ7IaM7JeQ7IScIOqwgOyepSDqsIDquYzsmrQg7KeA7ZWY7LKg7Jet7J2AIOuPhOuztCAke25lYXJlc3REaWZ9IOqxsOumrOydmCAke25lYXJlc3RTdG597JetYCk7XHJcbiAgICAgICAgICAgICAgICB0eHRBcnIucHVzaChg64+E67O0IDEw67aE6rGw66asIOydtOuCtOyXkCAke3RvdGFsTGluZX3qsJzsnZggJHtjaXR5TmFtZX0g7KCE7LK0IOyngO2VmOyyoCDrhbjshKAg7KSRICR7bGluZU5vfeqwnCDrhbjshKDsnbQg7KeA64KoYCk7XHJcbiAgICAgICAgICAgICAgICB0eHRBcnIucHVzaChgJHtjaXR5TmFtZX0gMTAw64yAIOq0gOq0keyngCDspJEgJHtzcG90Tm996rCc66W8IOyngO2VmOyyoCDtmZjsirkg7JeG7J20IO2Pieq3oCAke2F2Z1RpbWV97J2YIOuPhOuztCDsnbTrj5nsnLzroZwg67Cp66y4IOqwgOuKpWApO1xyXG4gICAgICAgICAgICAgICAgaWYoc2NvcmU+OC45KXtcclxuICAgICAgICAgICAgICAgICAgICB0eHRBcnIucHVzaCgn7KeA7ZWY7LKg7J2EIOydtOyaqe2VtCDqtIDqtJHtlZjquLAg66ek7JqwIO2OuOumrO2VnCDrjIDspJHqtZDthrXsnZgg7LWc6rOgIOyalOyngOyXkCDsnITsuZjtlagnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNjb3JlPjcuOSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0QXJyLnB1c2goJ+yngO2VmOyyoOydhCDsnbTsmqntlbQg6rSA6rSR7ZWY6riwIO2OuOumrO2VnCDrjIDspJHqtZDthrXsnZgg7JqU7KeA7JeQIOychOy5mO2VqCcpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Ni45KXtcclxuICAgICAgICAgICAgICAgICAgICB0eHRBcnIucHVzaCgn7KeA7ZWY7LKg7J2EIOydtOyaqe2VtCDqtIDqtJHtlZjquLAg64KY7IGY7KeAIOyViuydgCDsnITsuZjsl5Ag7J6I7J2MJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihzY29yZT41Ljkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dEFyci5wdXNoKCfsp4DtlZjssqDsnYQg7J207Jqp7ZW0IOq0gOq0ke2VmOq4sOyXkCDslYTso7wg7KKL7J2AIOychOy5mOuKlCDslYTri5gnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dEFyci5wdXNoKCfrjIDspJHqtZDthrUg7Y647J2Y7ISx7J2AIOyVveqwhCDrgq7snYAg7Y647Jy866GcLCDqtIDqtJHsnbQg7KGw6riIIOu2iO2OuO2VoCDsiJgg7J6I7J2MJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdHh0QXJyID0gW1wi7J20IOyImeyGjCDrj4Trs7QgMTXrtoQg7J2064K0IOqxsOumrOyXkCDsp4DtlZjssqAg7Jet7J20IOyXhuyWtOyEnCDrjIDspJHqtZDthrXsnYQg7J207Jqp7ZWY6riwIOu2iO2OuO2VoCDsiJgg7J6I7J2MXCJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZC5tZXRybyA9IHR4dEFycjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHRoaXJkX21ha2VTY29yZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgc2NvcmVBcnJheSA9IFtdO1xyXG4gICAgICAgIC8vMeqwnCDqtIDqtJHsp4Drpbwg6rCIIOyImCDsnojsnYQg65WM66eI64ukIDE4MDAgLSBkaWbtlanqs4Qo7Zi47YWU7JeQ7IScLCDrgrTroKTshJwp7KCQ66eM7YG8IOy2lOqwgFxyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGxldCBtZXRybyA9IGhvdGVsLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgICAgICBsZXQgc3BvdHMgPSB0aGlzLmRhdGEuc3BvdHMucmFua2VkO1xyXG4gICAgICAgICAgICBtZXRyby5zcG90ID0gW107XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBtZXRyb0xpbmVPYmogPSB0aGlzLmRhdGEubWV0cm9MaW5lO1xyXG4gICAgICAgICAgICBsZXQgc3BvdE9iaiA9IHt9O1xyXG5cclxuICAgICAgICAgICAgaWYobWV0cm8pe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbGluZU5hbWUgaW4gbWV0cm8uYnlMaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmUgPSBtZXRyby5ieUxpbmVbbGluZU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWZIb3RlbCA9IGxpbmUuZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0cm9MaW5lT2JqW2xpbmVOYW1lXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IG1ldHJvTGluZU9ialtsaW5lTmFtZV1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWZTcG90ID0gc3BvdC5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3RPYmpbc3BvdC5yYW5rXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkaWZTcG90ICsgZGlmSG90ZWwgPCBzcG90T2JqW3Nwb3QucmFua10uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90T2JqW3Nwb3QucmFua10gPSB7ZGlmOiAoZGlmU3BvdCArIGRpZkhvdGVsKSwgbGluZTpsaW5lTmFtZX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdE9ialtzcG90LnJhbmtdID0ge2RpZjogKGRpZlNwb3QgKyBkaWZIb3RlbCksIGxpbmU6bGluZU5hbWV9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGF2ZyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcmFuayBpbiBzcG90T2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gKDE4MDAgLSBzcG90T2JqW3JhbmtdLmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZnICs9IHNwb3RPYmpbcmFua10uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBob3RlbFNwb3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IHNwb3RzW3JhbmtdLmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHNwb3RPYmpbcmFua10ubGluZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTpzcG90c1tyYW5rXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcG90TWV0cm9OYW1lOnNwb3RzW3JhbmtdLm1ldHJvSW5mb1tzcG90T2JqW3JhbmtdLmxpbmVdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6cmFua1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm8uc3BvdC5wdXNoKGhvdGVsU3BvdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhdmcgPSBNYXRoLnJvdW5kKChhdmcgLyBPYmplY3Qua2V5cyhzcG90T2JqKS5sZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIG1ldHJvLmF2Z0RpZiA9IGF2ZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzY29yZUFycmF5LnB1c2goe2hpZDpoaWQsc2NvcmU6c2NvcmV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNjb3JlQXJyYXkuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBzY29yZUFycmF5Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgdmFyIHJhbmtTeXMgPSBDb25maWcubWV0cm8uc2NvcmUucGVyY2VudGlsZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWQgPSBzY29yZUFycmF5W2ldLmhpZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgbGV0IHJhbmsgPSAoKGkrMSkgLyB0b3RhbCk7IC8vIOuwseu2hOychCAtIDB+MSAo64aS7J2E7IiY66GdIDDsl5Ag6rCA6rmM7JuAKVxyXG4gICAgICAgICAgICB2YXIgcGVyY2VudGlsZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXNSYW5rZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmFua1N5cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzUmFua2VkKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSBwZXJjZW50aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRpbGUgKz0gcmFua1N5c1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFuazxwZXJjZW50aWxlKXsgIC8vMzUlIOyViOyXkCDrk6TrqbRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuayAtPSBtaW51czsgICAvL3JhbmvrpbwgMH4wLjLroZwg66ee7Law7KSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gKDEwLWopIC0gTWF0aC5jZWlsKChyYW5rL3JhbmtTeXNbal0pKjEwKS8xMDsgLy9yYW5rKDB+MC4yKeulvCAwLjLroZwg64KY64iI6rCSKjEwLzEwIC0+IDB+MC456rCAIOuCmOyYtFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JhbmtlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUubWV0cm8gPSBzY29yZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUgPSB7bWV0cm86c2NvcmV9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6e21ldHJvOnNjb3JlfSxcclxuICAgICAgICAgICAgICAgICAgICB3b3JkOnttZXRybzpcIlwifVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2Vjb25kX2J5QXJlYXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/ri6TrpbggbG9jYWzrk6Tqs7zripQg64us66asIOyngO2VmOyyoCDsl63snYQgQXJlYeuzhOuhnCDrgpjriJQgLSDsp4Dsl63rs4TroZwg7Ja065akIOuFuOyEoOuTpOydtCDsp4DrgpjqsIDripTsp4Ag7LK07YGsO1xyXG4gICAgICAgIGxldCBhcmVhQXJyID0gdGhpcy5kYXRhLmFyZWE7XHJcbiAgICAgICAgbGV0IG1ldHJvQXJyID0gdGhpcy5kYXRhLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJlYUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYXJlYSA9IGFyZWFBcnJbaV07XHJcbiAgICAgICAgICAgIGlmKCFhcmVhLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZXRyb0Fyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXRybyA9IG1ldHJvQXJyW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlzSW5BcmVhKG1ldHJvLmNvb3IsIGFyZWEuY29vcikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1ldHJvLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0gbWV0cm8ubGluZVtrXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVhLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVhLmxvY2FsLm1ldHJvKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhLmxvY2FsLm1ldHJvW2xpbmVdICsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwubWV0cm9bbGluZV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwubWV0cm8gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbCA9IHttZXRybzp7fX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZpcnN0X3NldE1ldHJvOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwubG9jYWwubWV0cm8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDp7ZGlmOkNvbmZpZy5tZXRyby5uZWFyU3RkfSxcclxuICAgICAgICAgICAgICAgICAgICBuZWFyOltdLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ5TGluZTp7fVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIG1ldHJvQXJyID0gdGhpcy5kYXRhLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgICAgICB2YXIgYnlMaW5lID0gaG90ZWwubG9jYWwubWV0cm8uYnlMaW5lO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXRyb0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1ldHJvID0gbWV0cm9BcnJbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlmID0gY2FsY3VsYXRlRGlmKGhvdGVsLmNvb3IsIG1ldHJvLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRpZjxDb25maWcubWV0cm8ubmVhclN0ZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1ldHJvX2MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6bWV0cm8uY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZTptZXRyby5saW5lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOm1ldHJvLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZjpkaWYudG9GaXhlZCgwKSoxXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5tZXRyby5uZWFyLnB1c2gobWV0cm9fYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRpZjxob3RlbC5sb2NhbC5tZXRyby5uZWFyZXN0LmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLm1ldHJvLm5lYXJlc3QgPSBtZXRyb19jO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZXRyby5saW5lLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0gbWV0cm8ubGluZVtqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGJ5TGluZVtsaW5lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihieUxpbmVbbGluZV0uZGlmID4gbWV0cm9fYy5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5TGluZVtsaW5lXSA9IG1ldHJvX2M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnlMaW5lW2xpbmVdID0gbWV0cm9fYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmVzdC5wdXNoKGhvdGVsLmxvY2FsLm1ldHJvLm5lYXJlc3QuZGlmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXRNZXRybztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0TWV0cm8uanMiLCJ2YXIgU2V0U2FmZXR5ID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSwgY2l0eU5hbWUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXRTYWZldHk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldFNhZmV0eS5qcyIsInZhciBTZXRBcmVhID0ge1xyXG4gICAgbWFwOnt9LFxyXG4gICAgbWFya2VyOnt9LFxyXG5cclxuICAgIGluZmxhdGU6IGZ1bmN0aW9uIChjaXR5TmFtZSwgY2lkKSB7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQpLm9uY2UoJ3ZhbHVlJywgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMubWFya2VyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcltoaWRdLnNldE1hcChudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1hcmtlciA9IHt9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHR4dCA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJoZWFkZXJcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxoMj4nICsgY2l0eU5hbWUgKyAnIOyImeyGjCDsp4Dsl60g6rWs67aEPC9oMj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImNpdHlBcmVhX193cmFwXCI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGlkPVwiY2l0eUFyZWFfX21hcFwiPjwvZGl2Pic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cIlwiY2l0eUFyZWE+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlBcmVhX193b3JkXCI+PC9wPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2lkPVwiJyArIGNpZCArICdcIiBjbGFzcz1cImNpdHlBcmVhX19maW5pc2hcIj7smYTro4zsspjrpqw8L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7IC8vY2xvc2Ugd3JhcHBlclxyXG5cclxuICAgICAgICAgICAgJChcIi5wYWdlcy5ob3RlbFwiKS5odG1sKHR4dCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eUFyZWFfX21hcCcpLCB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6IDQwLjc0MzE5NTc5MyxcclxuICAgICAgICAgICAgICAgICAgICBsbmc6IC03My45ODkxNzk1NFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHpvb206IDEzXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXJlYSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaGlkIGluIGRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaG90ZWwgPSBkYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vQXJlYSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmFyZWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZighZGF0YS5hcmVhW2ldLm5vdEFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJlYUNvb3IgPSBkYXRhLmFyZWFbaV0uY29vcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0luQXJlYShob3RlbC5jb29yLCBhcmVhQ29vcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmFyZWEgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9BcmVhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVhW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm9BcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJbaGlkXSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogaG90ZWwuY29vcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwOiB0aGlzLm1hcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICcnICsgaGlkXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJlYSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyBjaWQgKyAnL2hvdGVscycpLnVwZGF0ZShkYXRhLmhvdGVscyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXRBcmVhO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0QXJlYS5qcyJdLCJzb3VyY2VSb290IjoiIn0=