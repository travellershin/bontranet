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

var _setArea = __webpack_require__(20);

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
                metro.avgDiftoSpot = avg;
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

var _safety = __webpack_require__(19);

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
/* 19 */
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
/* 20 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTE5NWFiNTZjNzgyOWE5MzFiNWYiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY29uZmlnLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL21vZHVsZXMvZ2VvQ29kZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9hdHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvY2l0eS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QvZmlyc3RfY2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9hdXRvQ29tYmluZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L3Nlb25kX2NvbWJpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC90aGlyZF9maW5hbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9hY2NvdW50LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL3N1YndheS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldEFUTS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0Rm9vZC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0TWV0cm8uanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldFNhZmV0eS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9jb25maWcvc2FmZXR5LmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhLmpzIl0sIm5hbWVzIjpbIkNvbmZpZyIsIm1ldHJvIiwibmVhclN0ZCIsInNjb3JlIiwicGVyY2VudGlsZSIsImZvb2QiLCJraW5kIiwiYmFrZXJ5IiwibmFtZSIsInR5cGUiLCJqb3NhIiwic3RkIiwiZ3JvY2VyeSIsInNldmVuIiwiZmFtaWx5IiwibGF3c29uIiwibGFyZ2UiLCJtdWx0aXBsZSIsImN2cyIsIndlaWdodCIsIm5lYXJlc3QiLCJpbjI1MCIsIndvcmQiLCJpbnRlZ3JhdGUiLCJiYW5rMjQiLCJhdG0iLCJpbjEzMCIsIkdlb0NvZGUiLCJpbml0IiwiYXJyIiwicmVmIiwiZmlyZWJhc2UiLCJkYXRhYmFzZSIsIm9uY2UiLCJkYXRhIiwic25hcCIsInZhbCIsImxlbmd0aCIsInNldCIsImNvZGUiLCJ0b2FzdCIsInRoYXQiLCJnZW9jb2RlciIsImdvb2dsZSIsIm1hcHMiLCJHZW9jb2RlciIsImFkZHJlc3MiLCJhaWQiLCJnZW9jb2RlIiwicmVzdWx0cyIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJjb29yIiwibGF0IiwiZ2VvbWV0cnkiLCJsb2NhdGlvbiIsImxuZyIsInNoaWZ0Iiwic2V0VGltZW91dCIsInJlbG9hZCIsImluaXRpYWxpemVkIiwidV9pIiwiTmF2X2Z1bmN0aW9uIiwiYXR0ZW5kIiwidG9kbyIsImNpdHkiLCJtYXAiLCJhY2NvdW50Iiwic3BvdCIsImNhbGMiLCJob3RlbCIsImxpbmsiLCJsb2dpbiIsIiQiLCJodG1sIiwiYXR0ciIsImNsaWNrIiwiY29uZmlybSIsImF1dGgiLCJzaWduT3V0IiwidGhlbiIsIndpbmRvdyIsImNhdGNoIiwiZXJyb3IiLCJkb2N1bWVudCIsInJlYWR5IiwicHJvdmlkZXIiLCJHb29nbGVBdXRoUHJvdmlkZXIiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJ1c2VyIiwibWFpbCIsImVtYWlsIiwic3BsaXQiLCJncmFkZSIsInNpZ25JbldpdGhQb3B1cCIsInJlc3VsdCIsInVzZXJNYWlsIiwiZGlzcGxheU5hbWUiLCJzZXR0aW5nIiwib3JkZXIiLCJlcnJvckNvZGUiLCJlcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwiY3JlZGVudGlhbCIsImhhc0NsYXNzIiwiaXRlbSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJwYXJlbnQiLCJBdHRlbmQiLCJtb2JpbGUiLCJpZCIsInZpZXdJRCIsImF0dGVuZE9iaiIsInNhbGFyeSIsIndlZWtkYXlzIiwidHh0IiwidXNlcnMiLCJtYWlsSUQiLCJwcm9wIiwib24iLCJpbmZsYXRlX2NhbGVuZGFyIiwiZnVsbENhbGVuZGFyIiwiaGVpZ2h0IiwiZmlyc3REYXkiLCJ2aWV3UmVuZGVyIiwidmlldyIsImVsZW1lbnQiLCJkYXlDbGljayIsImRhdGUiLCJpbnB1dFdvcmtIb3VyIiwibGlzdGVuZXIiLCJzZXRXb3JrSG91ciIsImtleXVwIiwiZSIsIndoaWNoIiwiY2hhbmdlIiwidmlld193b3JrZXIiLCJvZmYiLCJ5byIsImRhdGVJRCIsInNsaWNlIiwiZGlmIiwiZnJvbSIsInRvIiwiaSIsIk1hdGgiLCJmbG9vciIsImR1ck1vbiIsInRoaXNNb250aCIsImRhdGVEb20iLCJlcSIsImoiLCJ3ZWVrRG9tIiwid2Vla0R1ciIsImRheURvbSIsImZpbmQiLCJrIiwiY2hpbGRyZW4iLCJhcHBlbmQiLCJmdWxsTW9udGhCb251cyIsImluc3VyYW5jZUZlZSIsImJhc2ljIiwicm91bmQiLCJmdWxsV2Vla0J1bnVzIiwiY29tbWEiLCJkYXRlT2JqIiwiZGF0ZVNob3J0IiwibW9tZW50IiwiZm9ybWF0IiwiQW55UGlja2VyIiwiZGF0ZVRpbWVGb3JtYXQiLCJmb2N1cyIsIndvcmsiLCJhbGxFbXB0eSIsInJlbW92ZSIsImFsZXJ0IiwiZnJvbUEiLCJ0b0EiLCJwdXNoIiwiQ2l0eSIsInJlZnJlc2hTdGF0dXMiLCJjcmVhdGVNZXRyb0xpbmUiLCJpbmZsYXRlIiwidHJhbnNwb3J0IiwiYXJlYSIsInByaWNlIiwiY2lkIiwic3BvdHMiLCJyYW5rZWQiLCJtYXgiLCJtZXRyb3MiLCJsb2NhbCIsIm1ldHJvTGluZSIsInRlbXBMaW5lIiwiaGFzU3BvdCIsInRlbXBEaWYiLCJlbnRlcmFuY2UiLCJlbnQiLCJjYWxjdWxhdGVEaWYiLCJsaW5lIiwicmFuayIsInN0biIsImhvdGVscyIsIk9iamVjdCIsImtleXMiLCJhc3Nlc3NtZW50IiwidXBkYXRlIiwiU3BvdCIsImNpdGllcyIsImN1cnJlbnQiLCJpbmZsYXRlX3N0YXR1cyIsImluZmxhdGVfY2l0eSIsInVpZCIsInJlbW92ZV9zcG90IiwicmVkb19yZW1vdmUiLCJvcmRlckFycmF5IiwiaWR4IiwiY2hhbmdlZCIsInNvcnQiLCJhIiwiYiIsInN0YXR1c0FycmF5IiwiY2l0eU5hbWUiLCJGaXJzdF9DaGVjayIsInNldFJlbWFpbk51bWJlciIsInNpZCIsInNpdGVOb2RhdGEiLCJkZWxldGVTcG90IiwiaW5wdXRDb29yZGluYXRlIiwic2l0ZSIsIm51bWJlciIsImN1dE5vIiwidHJpbSIsImN1dE9iaiIsIm5vIiwiZGVsZXRlZCIsImNvb3JUeHQiLCJpc05hTiIsImhhc1Byb2JsZW0iLCJzZWFyY2hVcmwiLCJzaXRlT2JqIiwiZ2ciLCJudiIsInRhIiwibHAiLCJzaXRlSGFzUHJvYmxlbSIsIm5vQ29vciIsIm5vQ29vclR4dCIsIm5vU3BvdCIsIm5vU3BvdFR4dCIsIm5vZGF0YSIsImhhc0Nvb3IiLCJsYXJnZU9LIiwibGFyZ2VEYXRhIiwic2Nyb2xsVG9wIiwiQXV0b0NvbWJpbmUiLCJzaXRlQXJyIiwiY29tYmluaW5nIiwiY291bnRlciIsIm5vRGF0YSIsIm9sZFNwb3QiLCJrbyIsImVuIiwidGVzdCIsInVybCIsInRhZyIsImNvbWJpbmVPYmoiLCJjb21iaW5lZCIsImNvbWJpbmUiLCJoYXNDb21iaW5lZCIsInRDb2RlIiwidFNwb3QiLCJrZXkiLCJTZWNvbmRfY29tYmluZSIsIlRoaXJkX2ZpbmFsaXplIiwidGVtcCIsInNwb3RPYmoiLCJzcG90TmFtZSIsInJhbmtBcnIiLCJzcG90VG90YWwiLCJpbmRpdmlkdWFsQXJyIiwibWluUmFuayIsInNxcnQiLCJyYW5raW5nIiwicHVzaEFyciIsIkFjY291bnQiLCJTdWJ3YXkiLCJtYXJrZXIiLCJNYXAiLCJnZXRFbGVtZW50QnlJZCIsImNlbnRlciIsInpvb20iLCJtYXBUeXBlQ29udHJvbCIsInNjYWxlQ29udHJvbCIsImZ1bGxzY3JlZW5Db250cm9sIiwiYWRkTGlzdGVuZXIiLCJmaW5kU3Vid2F5IiwibGF0TG5nIiwic2V0TWFwIiwiTWFya2VyIiwicG9zaXRpb24iLCJtZXRyb0luZm8iLCJtZXRyb0J5U3RuIiwibWV0cm9OYW1lIiwiY29uY2F0IiwibWV0QXJyYXkiLCJtZXRTdG5BcnJheSIsImNlaWwiLCJIb3RlbCIsImhpZCIsImNoZWNrIiwiYWxlcnRNb2RhbCIsIlNldEhvdGVsSW5mbyIsImNoZWNrVHh0IiwidmlzYSIsImNpdGkiLCJzYWZldHkiLCJ0aGVtZSIsImNvbnZlbmllbmNlIiwiQXJyYXkiLCJpc0FycmF5IiwiU2V0QVRNIiwic3RhdGlzdGljIiwiYnlBcmVhIiwiZmlyc3RfYnlIb3RlbHMiLCJzZWNvbmRfYnlBcmVhcyIsInRoaXJkX21ha2VTdGF0cyIsImZvdXJ0aF9tYWtlUmFuayIsImZpZnRoX21ha2VTY29yZSIsInNpeHRoX3dvcmRpbmciLCJhdG1BcnIiLCJhdG1PYmoiLCJvd25lciIsImluY2x1ZGVzIiwicGxhY2VOYW1lIiwiaXMyNCIsImVyck5vIiwic3VtIiwibm90QXJlYSIsImF0bXMiLCJtaW51cyIsInRvRml4ZWQiLCJzdGF0IiwidG90YWwiLCJpbmRleE9mIiwic2NvcmVBcnJheSIsInJhbmtTeXMiLCJpc1JhbmtlZCIsInRmYyIsImNvbmZpZyIsImluU3RkIiwiZGlmVG9NaW4iLCJkaWYyNCIsIlNldEZvb2QiLCJuZWFyYnkiLCJmaXJzdF9nZW9Db2RlIiwic2Vjb25kX3NldEZvb2QiLCJ0aGlyZF9ieUFyZWFzIiwiZm91cnRoX21ha2VTdGF0cyIsImdkaWYiLCJuZWFyZXN0RGlmIiwiZm9vZHMiLCJpc1NvbWVGb29kIiwiZ3JvQXJyIiwiZm9vZEFyciIsImNvcHkiLCJleHRlbmQiLCJuZWFyNSIsImdlb0FyciIsImlzR2VvTmVlZGVkIiwiU2V0TWV0cm8iLCJmaXJzdF9zZXRNZXRybyIsInRoaXJkX21ha2VTY29yZSIsImZvdXJ0aF93b3JkaW5nIiwidG90YWxMaW5lIiwidHh0QXJyIiwibmVhcmVzdFN0biIsImxpbmVObyIsImJ5TGluZSIsInNwb3RObyIsImF2Z1RpbWUiLCJhdmdEaWYiLCJtZXRyb0xpbmVPYmoiLCJsaW5lTmFtZSIsImRpZkhvdGVsIiwiZGlmU3BvdCIsImF2ZyIsImhvdGVsU3BvdCIsInNwb3RNZXRyb05hbWUiLCJhdmdEaWZ0b1Nwb3QiLCJhcmVhQXJyIiwibWV0cm9BcnIiLCJpc0luQXJlYSIsIm5lYXIiLCJtZXRyb19jIiwiU2V0U2FmZXR5IiwiZmlyc3RfZnJvbUFyZWEiLCJhcmVhcyIsImNvbmZpZ193b3JkIiwibWlzZGVtZWFub3IiLCJtaW4iLCJjb25kaWYiLCJtZXREaWYiLCJub0RpZiIsIm1ldFdvcmQiLCJmbG9hdFNjb3JlIiwibWluU3BvdERpZiIsImZsb2F0IiwiZmxvYXRpbmciLCJub3RZZXQiLCJmbG9hdFdvcmQiLCJmaW5hbCIsImZpbmFsU2FmZXR5IiwiZmluYWxXb3JkIiwiQ29uZmlnX1NhZmV0eSIsIlNldEFyZWEiLCJub0FyZWEiLCJhcmVhQ29vciIsImxhYmVsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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cUJBQUssSUFBSWhSLElBQUksQ0FBYixFQUFnQkEsSUFBSWhILEtBQUt3SixJQUFMLENBQVVySixNQUE5QixFQUFzQzZHLEdBQXRDLEVBQTJDO0FBQ3ZDLHdCQUFHLENBQUNoSCxLQUFLd0osSUFBTCxDQUFVeEMsQ0FBVixFQUFha00sT0FBakIsRUFBeUI7QUFDckIsNEJBQUkrRSxXQUFXalksS0FBS3dKLElBQUwsQ0FBVXhDLENBQVYsRUFBYTdGLElBQTVCOztBQUVBLDRCQUFJcVYsU0FBU25VLE1BQU1sQixJQUFmLEVBQXFCOFcsUUFBckIsQ0FBSixFQUFvQztBQUNoQzVWLGtDQUFNbUgsSUFBTixHQUFheEMsQ0FBYjtBQUNBZ1IscUNBQVMsS0FBVDtBQUNBLGdDQUFHeE8sS0FBS3hDLENBQUwsQ0FBSCxFQUFXO0FBQ1B3QyxxQ0FBS3hDLENBQUw7QUFDSCw2QkFGRCxNQUVLO0FBQ0R3QyxxQ0FBS3hDLENBQUwsSUFBVSxDQUFWO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBRUQsb0JBQUlnUixNQUFKLEVBQVk7QUFDUiwwQkFBS2pJLE1BQUwsQ0FBWXNCLEdBQVosSUFBbUIsSUFBSTVRLE9BQU9DLElBQVAsQ0FBWWlRLE1BQWhCLENBQXVCO0FBQ3RDQyxrQ0FBVXZPLE1BQU1sQixJQURzQjtBQUV0Q2MsNkJBQUssTUFBS0EsR0FGNEI7QUFHdENpVywrQkFBTyxLQUFLN0c7QUFIMEIscUJBQXZCLENBQW5CO0FBS0g7QUFDSjtBQUNEcFEsb0JBQVFDLEdBQVIsQ0FBWXNJLElBQVo7O0FBRUEzSixxQkFBU0MsUUFBVCxHQUFvQkYsR0FBcEIsQ0FBd0IsWUFBWThKLEdBQVosR0FBa0IsU0FBMUMsRUFBcURvQixNQUFyRCxDQUE0RDlLLEtBQUswSyxNQUFqRTtBQUNILFNBcEVEO0FBcUVIO0FBM0VTLENBQWQ7O2tCQThFZXFOLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxMTk1YWI1NmM3ODI5YTkzMWI1ZiIsInZhciBDb25maWcgPSB7XHJcbiAgICBtZXRybzp7XHJcbiAgICAgICAgbmVhclN0ZDo3NTAsXHJcblxyXG4gICAgICAgIHNjb3JlOntcclxuICAgICAgICAgICAgcGVyY2VudGlsZSA6IFswLjE1LCAwLjIsIDAuMjUsIDAuMiwgMC4xLCAwLjFdLCAvLzksIDgsIDcuLi7soJDrjIDsnZgg67Cx67aE7JyEIOu5hOycqCAtIO2VqeqzhCAxIOuQmOyWtOyVvCDtlaghISFcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZvb2Q6e1xyXG4gICAgICAgIGtpbmQ6e1xyXG4gICAgICAgICAgICBiYWtlcnk6eyAvL+ydvOuwmOyggSDrsqDsnbTsu6Trpqwg7LSd7LmtXHJcbiAgICAgICAgICAgICAgICBuYW1lOlwi67Kg7J207Luk66asXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOlwi67Kg7J207Luk66asXCIsXHJcbiAgICAgICAgICAgICAgICBqb3NhOlwi6rCAXCIsXHJcbiAgICAgICAgICAgICAgICBzdGQ6MjUwICAgICAvL+yWvOuniOuCmCDqsIDquYzsnbQg7J6I7Ja07JW8IO2YuO2FlCDso7zrs4DsnLzroZwg7J247KCV7ZWY64KYXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdyb2Nlcnk6eyAvL+ydvOuwmOyggSDsi53ro4ztkojsoJAg7LSd7LmtXHJcbiAgICAgICAgICAgICAgICBuYW1lOlwi7Iud66OM7ZKI7KCQXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOlwi7Iud66OM7ZKI7KCQXCIsXHJcbiAgICAgICAgICAgICAgICBqb3NhOlwi7J20XCIsXHJcbiAgICAgICAgICAgICAgICBzdGQ6MjUwICAgICAvL+yWvOuniOuCmCDqsIDquYzsnbQg7J6I7Ja07JW8IO2YuO2FlCDso7zrs4DsnLzroZwg7J247KCV7ZWY64KYXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldmVuOntcclxuICAgICAgICAgICAgICAgIG5hbWU6XCLshLjruJDsnbzroIjruJBcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6XCLtjrjsnZjsoJBcIixcclxuICAgICAgICAgICAgICAgIGpvc2E6XCLsnbRcIixcclxuICAgICAgICAgICAgICAgIHN0ZDoyMDAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFtaWx5OntcclxuICAgICAgICAgICAgICAgIG5hbWU6XCLtjKjrsIDrpqzrp4jtirhcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6XCLtjrjsnZjsoJBcIixcclxuICAgICAgICAgICAgICAgIGpvc2E6XCLsnbRcIixcclxuICAgICAgICAgICAgICAgIHN0ZDoyMDAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGF3c29uOntcclxuICAgICAgICAgICAgICAgIG5hbWU6XCLroZzshpBcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6XCLtjrjsnZjsoJBcIixcclxuICAgICAgICAgICAgICAgIGpvc2E6XCLsnbRcIixcclxuICAgICAgICAgICAgICAgIHN0ZDoyMDAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGFyZ2U6e1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcIuuMgO2YleuniO2KuFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcIuuMgO2YleuniO2KuFwiLFxyXG4gICAgICAgICAgICAgICAgam9zYTpcIuqwgFwiLFxyXG4gICAgICAgICAgICAgICAgbXVsdGlwbGU6MiwgLy/snbTrhYDshJ3snbQg7KO867OA7JeQIOyeiOycvOuptCAy67CwIOyii+ydgOuGiCDst6jquIlcclxuICAgICAgICAgICAgICAgIHN0ZDo1MDAgICAgIC8v7Ja866eI64KYIOqwgOq5jOydtCDsnojslrTslbwg7Zi47YWUIOyjvOuzgOycvOuhnCDsnbjsoJXtlZjrgphcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmVhclN0ZDp7Ly/slrzrp4jrgpgg6rCA6rmM7J20IOyeiOyWtOyVvCDrtoDqt7zsl5Ag7J6I64qU6rG466GcIOyduOygle2VoOqyg+ydtOuDkFxyXG4gICAgICAgICAgICBsYXJnZTo1MDAsXHJcbiAgICAgICAgICAgIGdyb2Nlcnk6MjUwLFxyXG4gICAgICAgICAgICBjdnM6MjUwLCBcclxuICAgICAgICAgICAgYmFrZXJ5OjI1MFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2NvcmU6e1xyXG4gICAgICAgICAgICBwZXJjZW50aWxlIDogWzAuMTUsIDAuMiwgMC4yNSwgMC4yLCAwLjEsIDAuMV0sIC8vOSwgOCwgNy4uLuygkOuMgOydmCDrsLHrtoTsnIQg67mE7JyoIC0g7ZWp6rOEIDEg65CY7Ja07JW8IO2VqCEhIVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgd2VpZ2h0OnsgLy9BVE0g7KCQ7IiY66W8IOyCsOy2nO2VoCDrlYwg6rCA7KSR7LmYKOyIq+yekCDri6jsnIQg66y06rSAKVxyXG4gICAgICAgICAgICAgICAgbmVhcmVzdDozLjUsXHJcbiAgICAgICAgICAgICAgICBpbjI1MDogMSxcclxuICAgICAgICAgICAgICAgIGxhcmdlOjEwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB3b3JkOntcclxuICAgICAgICAgICAgaW50ZWdyYXRlOnsgLy/qsIDsnqUg6rCA6rmM7Jq0IGZvb2TqsIAgbGFyZ2Uo7J206rGw64KYIDEwbSDrr7jrp4wg6rGw66as7LCo7J20KSlcclxuICAgICAgICAgICAgICAgIHN0ZDpbMC4xNSwgMC4zNSwgMC42XSwgLy/rnq3tgrnsnbQg7ZW064u5IOuwseu2hOychCDslYjsl5Ag65OkIOqyveyasFxyXG4gICAgICAgICAgICAgICAgd29yZDpbIC8vd29yZOuKlCBzdGTrs7Tri6Qg7ZWY64KYIOunjuyVhOyVvCDtlaguKOydtCDqsr3smrAgNzAlIOuCtOyXkCDrqrsg65Ok7JeI7J2EIOqyveyasOydmCDsm4zrlKkpXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcIOunpOyasCDqsIDquYzsnbTsl5Ag7J6I7J2MIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOuhnCDqsIDquYzsmrQg7Y64LiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYmFuazI0OntcclxuICAgICAgICAgICAgICAgIHN0ZDpbMC4zNSwwLjddLCBcclxuICAgICAgICAgICAgICAgIHdvcmQ6W1xyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojqs6AsIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOuhnCwg6rCA6rmM7Jq0IO2OuC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66asIOuWqOyWtOynhCDso7zsnITsl5Ag7J6I7J2MLiBcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuZWFyZXN0OntcclxuICAgICAgICAgICAgICAgIHN0ZDpbMC4xLDAuMjUsMC40XSwgLy/rnq3tgrnsnbQg7ZW064u5IOuwseu2hOychCDslYjsl5Ag65OkIOqyveyasFxyXG4gICAgICAgICAgICAgICAgd29yZDpbIC8vd29yZOuKlCBzdGTrs7Tri6Qg7ZWY64KYIOunjuyVhOyVvCDtlaguKOydtCDqsr3smrAgNzAlIOuCtOyXkCDrqrsg65Ok7JeI7J2EIOqyveyasOydmCDsm4zrlKkpXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsIC8vMTgwODEwIC0g7Y+J6rCA66W8IOydvOuLqCDslYgg7ZWY6riw66GcIO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGF0bTp7XHJcbiAgICAgICAgc2NvcmU6e1xyXG4gICAgICAgICAgICBwZXJjZW50aWxlIDogWzAuMTUsIDAuMiwgMC4yNSwgMC4yLCAwLjEsIDAuMV0sIC8vOSwgOCwgNy4uLuygkOuMgOydmCDrsLHrtoTsnIQg67mE7JyoIC0g7ZWp6rOEIDEg65CY7Ja07JW8IO2VqCEhIVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgd2VpZ2h0OnsgLy9BVE0g7KCQ7IiY66W8IOyCsOy2nO2VoCDrlYwg6rCA7KSR7LmYKOyIq+yekCDri6jsnIQg66y06rSAKVxyXG4gICAgICAgICAgICAgICAgYmFuazI0OjQsXHJcbiAgICAgICAgICAgICAgICBuZWFyZXN0OjMuNzUsXHJcbiAgICAgICAgICAgICAgICBpbjEzMDogMC41XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgXHJcbiAgICAgICAgd29yZDp7XHJcbiAgICAgICAgICAgIGludGVncmF0ZTp7IC8v6rCA7J6lIOqwgOq5jOyatCBBVE3snbQgMjTsi5zqsIQg7Jik7ZSI7ZWY64qUIOydgO2WiSDshozsnKAo7J206rGw64KYIDEwbSDrr7jrp4wg6rGw66as7LCo7J20KSlcclxuICAgICAgICAgICAgICAgIHN0ZDpbMC4xNSwgMC4zNSwgMC42XSwgLy/rnq3tgrnsnbQg7ZW064u5IOuwseu2hOychCDslYjsl5Ag65OkIOqyveyasFxyXG4gICAgICAgICAgICAgICAgd29yZDpbIC8vd29yZOuKlCBzdGTrs7Tri6Qg7ZWY64KYIOunjuyVhOyVvCDtlaguKOydtCDqsr3smrAgNzAlIOuCtOyXkCDrqrsg65Ok7JeI7J2EIOqyveyasOydmCDsm4zrlKkpXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as66GcIOunpOyasCDqsIDquYzsnbTsl5Ag7J6I7J2MIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOuhnCDqsIDquYzsmrQg7Y64LiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIiDqsbDrpqzsl5Ag7J6I7J2MLiBcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYmFuazI0OntcclxuICAgICAgICAgICAgICAgIHN0ZDpbMC4zNSwwLjddLCBcclxuICAgICAgICAgICAgICAgIHdvcmQ6W1xyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojqs6AsIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOuhnCwg6rCA6rmM7Jq0IO2OuC4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66asIOuWqOyWtOynhCDso7zsnITsl5Ag7J6I7J2MLiBcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuZWFyZXN0OntcclxuICAgICAgICAgICAgICAgIHN0ZDpbMC4xLDAuMjUsMC40XSwgLy/rnq3tgrnsnbQg7ZW064u5IOuwseu2hOychCDslYjsl5Ag65OkIOqyveyasFxyXG4gICAgICAgICAgICAgICAgd29yZDpbIC8vd29yZOuKlCBzdGTrs7Tri6Qg7ZWY64KYIOunjuyVhOyVvCDtlaguKOydtCDqsr3smrAgNzAlIOuCtOyXkCDrqrsg65Ok7JeI7J2EIOqyveyasOydmCDsm4zrlKkpXHJcbiAgICAgICAgICAgICAgICAgICAgXCIg6rGw66as7JeQIOyeiOydjC4gXCIsIC8vMTgwODEwIC0g7Y+J6rCA66W8IOydvOuLqCDslYgg7ZWY6riw66GcIO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIOqxsOumrOyXkCDsnojsnYwuIFwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvY29uZmlnLmpzIiwidmFyIEdlb0NvZGUgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihhcnIsIHJlZil7XHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ0ZW1wL2dlb2NvZGVcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgIGlmKCFkYXRhKXsgIC8v64uk66W4IOyngOyYpOy9lOuUqSDsnpHsl4XspJHsnbTrnbzrqbQg7KCI64yAIOuNruyWtOyNqOyEnOuKlCDslYgg65CoO1xyXG4gICAgICAgICAgICAgICAgaWYoYXJyLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6cmVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnI6YXJyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGUoYXJyLCByZWYpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsp4DsmKTsvZTrlKkg7J6R7JeF7J2EIOyLnOyeke2VqeuLiOuLpC4g7Jes65+s67KIIOyDiOuhnOqzoOy5qCDrkKAg7IiYIOyeiOyKteuLiOuLpC5cIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNvZGU6IGZ1bmN0aW9uKGFyciwgcmVmKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxldCBnZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xyXG4gICAgICAgIHZhciBhZGRyZXNzID0gYXJyWzBdLmFkZHJlc3M7XHJcbiAgICAgICAgdmFyIGFpZCA9IGFyclswXS5haWQ7XHJcblxyXG4gICAgICAgIGdlb2NvZGVyLmdlb2NvZGUoIHsnYWRkcmVzcyc6IGFkZHJlc3N9LCBmdW5jdGlvbihyZXN1bHRzLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3RhdHVzKVxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09ICdPSycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29vciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBsYXQ6cmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBsbmc6cmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKHJlZitcIi9cIithaWQrXCIvY29vclwiKS5zZXQoY29vcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoYXJyLmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgICAgICBhcnIuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jb2RlKGFyciwgcmVmKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInRlbXAvZ2VvY29kZVwiKS5zZXQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi7KeA7Jik7L2U65SpIOyekeyXheydtCDsmYTro4zrkJjsl4jsirXri4jri6QuXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHN0YXR1cyA9PT0gJ1pFUk9fUkVTVUxUUycpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFyclswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLsp4DsmKTsvZTrlKkg6rKw6rO86rCAIOyXhuuKlCDtla3rqqnsnbQg7J6I7Iq164uI64ukLiDsvZjshpTssL3snYQg7LC46rOg7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ0ZW1wL2dlb2NvZGVcIikuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmOnJlZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyOmFyclxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdlb0NvZGU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvbW9kdWxlcy9nZW9Db2RlLmpzIiwiaW1wb3J0IEF0dGVuZCBmcm9tIFwiLi9wYWdlcy9hdHRlbmQuanNcIjtcclxuaW1wb3J0IENpdHkgZnJvbSBcIi4vcGFnZXMvY2l0eS5qc1wiO1xyXG5pbXBvcnQgU3BvdCBmcm9tIFwiLi9wYWdlcy9zcG90LmpzXCI7XHJcbmltcG9ydCBBY2NvdW50IGZyb20gXCIuL3BhZ2VzL2FjY291bnQuanNcIjtcclxuaW1wb3J0IFN1YndheSBmcm9tIFwiLi9wYWdlcy9zdWJ3YXkuanNcIjtcclxuaW1wb3J0IEhvdGVsIGZyb20gXCIuL3BhZ2VzL2hvdGVsLmpzXCI7XHJcbmltcG9ydCBHZW9Db2RlIGZyb20gXCIuL21vZHVsZXMvZ2VvQ29kZS5qc1wiO1xyXG5cclxudmFyIGluaXRpYWxpemVkID0ge307XHJcblxyXG52YXIgdV9pID0ge307XHJcblxyXG52YXIgTmF2X2Z1bmN0aW9uID0ge1xyXG4gICAgYXR0ZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgQXR0ZW5kLmluaXQodV9pKTtcclxuICAgICAgICBpbml0aWFsaXplZC5hdHRlbmQgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIHRvZG86IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgY2l0eTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIENpdHkuaW5pdCh1X2kpO1xyXG4gICAgICAgIGluaXRpYWxpemVkLmNpdHkgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIG1hcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFN1YndheS5pbml0KCk7XHJcbiAgICB9LFxyXG4gICAgYWNjb3VudDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBzcG90OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgU3BvdC5pbml0KHVfaSk7XHJcbiAgICAgICAgaW5pdGlhbGl6ZWQuc3BvdCA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgY2FsYzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBob3RlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEhvdGVsLmluaXQoKTtcclxuICAgIH0sXHJcbiAgICBsaW5rOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gbG9naW4obmFtZSl7XHJcbiAgICAkKFwiLmhlbGxvV29ybGRcIikuaHRtbChuYW1lWzFdK1wi7ZWYIVwiKTtcclxuICAgICQoXCIuaGVsbG9Xb3JsZFwiKS5hdHRyKFwidGl0bGVcIixuYW1lK1wi64uYIOyViOuFle2VmOyEuOyalCFcIik7XHJcbiAgICAkKFwiLmhlbGxvV29ybGRcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihjb25maXJtKG5hbWUrXCLri5gg66Gc6re47JWE7JuDIO2VmOyLnOqyoOyKteuLiOq5jD9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgIC8vIEFuIGVycm9yIGhhcHBlbmVkLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBwcm92aWRlciA9IG5ldyBmaXJlYmFzZS5hdXRoLkdvb2dsZUF1dGhQcm92aWRlcigpO1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbiAodXNlcikge1xyXG4gICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICAgIGxldCBtYWlsID0gdXNlci5lbWFpbC5zcGxpdCgnQCcpWzBdO1xyXG5cclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ0ZW1wL2dlb2NvZGVcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIEdlb0NvZGUuY29kZShkYXRhLmFyciwgZGF0YS5yZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi7KeA7Jik7L2U65SpIOyekeyXheydhCDsnbTslrTshJwg7KeE7ZaJ7ZWp64uI64ukLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v7JWE656YIOuCtOyaqeydhCDrsJTqvrjrqbQgaWYgKCFpc1VzZXIpIOu2gOu2hOyXkOuPhCDrsJjrk5zsi5wg67CY7JiB7ZW07KSE6rKDXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgKHZhciBnaWQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGRhdGFbZ2lkXS5cclxuICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLnVwZGF0ZShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVttYWlsXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVfaSA9IGRhdGFbbWFpbF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyYWRlID0gdV9pLmdyYWRlICogMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdHRlbmQuaW5pdChkYXRhW21haWxdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyYWRlID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2NvdW50LmluaXQobWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hY2NvdW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hdHRlbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dpbih1X2kubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBVc2VyIGlzIHNpZ25lZCBpbi5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gTm8gdXNlciBpcyBzaWduZWQgaW4uXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IHJlc3VsdC51c2VyO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJNYWlsID0gdXNlci5lbWFpbC5zcGxpdCgnQCcpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3VzZXJNYWlsXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1X2kgPSBkYXRhW3VzZXJNYWlsXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyYWRlID0gdV9pLmdyYWRlICogMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmFkZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF0dGVuZC5pbml0KGRhdGFbdXNlck1haWxdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmFkZSA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjY291bnQuaW5pdCh1c2VyTWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZWQuYWNjb3VudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZC5hdHRlbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9naW4odV9pLm5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCd1c2Vycy8nICsgdXNlck1haWwpLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIuZGlzcGxheU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWlsOiB1c2VyTWFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogXCJhYmNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgnY29kZTonICsgZXJyb3IuY29kZSArICcgLSDsnbzsi5zsoIHsnbgg66y47KCc6rCAIOuwnOyDne2WiOyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalC4nKTtcclxuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBFcnJvcnMgaGVyZS5cclxuICAgICAgICAgICAgICAgIHZhciBlcnJvckNvZGUgPSBlcnJvci5jb2RlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZW1haWwgb2YgdGhlIHVzZXIncyBhY2NvdW50IHVzZWQuXHJcbiAgICAgICAgICAgICAgICB2YXIgZW1haWwgPSBlcnJvci5lbWFpbDtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBmaXJlYmFzZS5hdXRoLkF1dGhDcmVkZW50aWFsIHR5cGUgdGhhdCB3YXMgdXNlZC5cclxuICAgICAgICAgICAgICAgIHZhciBjcmVkZW50aWFsID0gZXJyb3IuY3JlZGVudGlhbDtcclxuICAgICAgICAgICAgICAgIC8vIC4uLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuJChcIi5uYXZfX2l0ZW1cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgaWYoISQodGhpcykuaGFzQ2xhc3MoJ25hdl9faXRlbS0taGFzRHJhd2VyJykpe1xyXG4gICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5hdHRyKFwiaWRcIikuc3BsaXQoXCJfXCIpWzFdO1xyXG5cclxuICAgICAgICAkKFwiLm5hdj4qXCIpLnJlbW92ZUNsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAgICAgJChcIi5wYWdlc1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIucGFnZXMuXCIgKyBpdGVtKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICAgICBpZighaW5pdGlhbGl6ZWRbaXRlbV0pe1xyXG4gICAgICAgICAgICBOYXZfZnVuY3Rpb25baXRlbV0oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuJChcIi5uYXZfX2RyYXdlcl9faXRlbVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgdmFyIGl0ZW0gPSAkKHRoaXMpLmF0dHIoXCJpZFwiKS5zcGxpdChcIl9cIilbMV07XHJcblxyXG4gICAgJChcIi5uYXY+KlwiKS5yZW1vdmVDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAkKFwiLm5hdl9fZHJhd2VyX19pdGVtXCIpLnJlbW92ZUNsYXNzKFwibmF2X19kcmF3ZXJfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIm5hdl9fZHJhd2VyX19pdGVtLS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAkKFwiLnBhZ2VzXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiLnBhZ2VzLlwiICsgaXRlbSkucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuXHJcbiAgICBpZiAoIWluaXRpYWxpemVkW2l0ZW1dKSB7XHJcbiAgICAgICAgTmF2X2Z1bmN0aW9uW2l0ZW1dKCk7XHJcbiAgICB9XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL2luZGV4LmpzIiwidmFyIEF0dGVuZCA9IHtcclxuICAgIG1vYmlsZTogZmFsc2UsXHJcblxyXG4gICAgaWQ6IFwiXCIsXHJcblxyXG4gICAgdmlld0lEOiBcIlwiLFxyXG4gICAgLy/qtIDrpqzsnpDqsIAg64uk66W4IOyCrOuejOydmCBJRCDtmZXsnbjspJFcclxuXHJcbiAgICBhdHRlbmRPYmo6IHt9LFxyXG5cclxuICAgIHNhbGFyeToge30sXHJcblxyXG5cclxuICAgIHdlZWtkYXlzOiBbXCLsnbxcIiwgXCLsm5RcIiwgXCLtmZRcIiwgXCLsiJhcIiwgXCLrqqlcIiwgXCLquIhcIiwgXCLthqBcIiwgXCLsnbxcIl0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24odV9pKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGdyYWRlID0gdV9pLmdyYWRlO1xyXG4gICAgICAgIHZhciBpZCA9IHVfaS5pZDtcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG5cclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0Kz0nPHNlbGVjdCBjbGFzcz1cIndvcmtlcl9zZWxlY3RvclwiPjwvc2VsZWN0Pic7XHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fdG9wXCI+JztcclxuICAgICAgICB0eHQgKz0gICAnPGRpdiBpZD1cImNhbGVuZGFyXCIgY2xhc3M9XCJhdHRlbmRfX2NhbGVuZGFyXCI+PC9kaXY+JztcclxuICAgICAgICB0eHQgKz0gICAnPGRpdiBjbGFzcz1cImF0dGVuZF9fd2Vla1wiPjwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9JzwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoXCI+PC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5hdHRlbmRcIikuaHRtbCh0eHQpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYWNjb3VudC9zYWxhcnlcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHRoYXQuc2FsYXJ5ID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgaWYoZ3JhZGUgPT09IDUpe1xyXG4gICAgICAgICAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5sb2FkaW5nVmlld1wiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VycyA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR4dCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG1haWxJRCBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih1c2Vyc1ttYWlsSURdLmdyYWRlKjE8NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgbWFpbElEICsgJ1wiPicgKyB1c2Vyc1ttYWlsSURdLm5hbWUgKyAnPC9vcHRpb24+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5odG1sKHR4dCkudmFsKGlkKS5wcm9wKFwic2VsZWN0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIubG9hZGluZ1ZpZXdcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGVuZE9iaiA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCEkKFwiLmZjLWhlYWRlci10b29sYmFyXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld1JlbmRlciA6IGZ1bmN0aW9uICh2aWV3LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFdvcmtIb3VyKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5vbihcImNsaWNrXCIsIFwiLmNvbmZpcm1cIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoISQoXCIuYXR0ZW5kXCIpLmhhc0NsYXNzKCdkaXNwbGF5Tm9uZScpKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJCh0aGlzKS5hdHRyKFwiZGlkXCIpKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi5tb2RhbFwiKS5vbihcImNsaWNrXCIsIFwiLmNsb3NlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmICghJChcIi5hdHRlbmRcIikuaGFzQ2xhc3MoJ2Rpc3BsYXlOb25lJykpIHtcclxuICAgICAgICAgICAgICAgICQoXCIuYmxhY2tTY3JlZW5cIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaW5wdXRXaW5kb3cgaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcImJvZHlcIikua2V5dXAoZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGlmICghJChcIi5hdHRlbmRcIikuaGFzQ2xhc3MoJ2Rpc3BsYXlOb25lJykpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKFwiLm1vZGFsIC5jb25maXJtXCIpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2RlID0gZS53aGljaDsgLy8gcmVjb21tZW5kZWQgdG8gdXNlIGUud2hpY2gsIGl0J3Mgbm9ybWFsaXplZCBhY3Jvc3MgYnJvd3NlcnNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0V29ya0hvdXIoJChcIi5tb2RhbCAuY29uZmlybVwiKS5hdHRyKFwiZGlkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLndvcmtlcl9zZWxlY3RvclwiKS5jaGFuZ2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld193b3JrZXIoaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICB2aWV3X3dvcmtlcjogZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYoaWQgPT09IHRoYXQuaWQpe1xyXG4gICAgICAgICAgICAkKFwiLmF0dGVuZF9fY2FsZW5kYXJcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX3dlZWtcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgJChcIi5hdHRlbmRfX21vbnRoXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19jYWxlbmRhclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICBpZih0aGF0LnZpZXdJRC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGF0LnZpZXdJRCkub2ZmKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK2lkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hdHRlbmRPYmogPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlvID0gdGhhdC52aWV3SUQ7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdJRCA9IGlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHlvLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1NjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoYXQuaWQgIT09IHRoYXQudmlld0lEKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGVfY2FsZW5kYXIodGhhdC5hdHRlbmRPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlDbGljazogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0V29ya0hvdXIoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jYWxlbmRhcjogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5hdHRlbmRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmZjLWRheVwiKS5odG1sKFwiXCIpO1xyXG5cclxuICAgICAgICBpZihkYXRhLmF0dGVuZCl7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmF0dGVuZDtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF0ZSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZUlEID0gZGF0ZS5zbGljZSgwLDQpK1wiLVwiK2RhdGUuc2xpY2UoNCw2KStcIi1cIitkYXRlLnNsaWNlKDYsOCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gMDtcclxuICAgICAgICAgICAgICAgIGxldCB0eHQgPSAnPHA+JytkYXRhW2RhdGVdWzBdLmZyb20rXCJ+XCIrZGF0YVtkYXRlXVswXS50bysnPC9wPic7XHJcbiAgICAgICAgICAgICAgICAvL+uRkO2DgOyehCDrgpjriKDshJwg6re866y07ZaI7Ja064+EIOuLrOugpeyXkCDtkZzsi5zrkJjripQg6rKD7J2AIOyyq+2DgOyehCDqt7zrrLTsi5zqsITrp4xcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWYgKz0gZGF0YVtkYXRlXVtpXS5kaWY7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHh0Kz0nPHA+JyArIE1hdGguZmxvb3IoZGlmLzYwKSArIFwi7Iuc6rCEIFwiKyBkaWYlNjAgK1wi67aEXCIrJzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgJCgnLmF0dGVuZCAuZmMtZGF5W2RhdGEtZGF0ZT1cIicrZGF0ZUlEKydcIl0nKS5odG1sKHR4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGR1ck1vbiA9IDA7XHJcbiAgICAgICAgICAgIGxldCB0aGlzTW9udGggPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkKFwiLmF0dGVuZCAuZmMtZGF5XCIpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZURvbSA9ICQoXCIuYXR0ZW5kIC5mYy1kYXlcIikuZXEoaSk7XHJcbiAgICAgICAgICAgICAgICBpZighZGF0ZURvbS5oYXNDbGFzcyhcImZjLW90aGVyLW1vbnRoXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGRhdGVEb20uYXR0cihcImRhdGEtZGF0ZVwiKS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc01vbnRoID0gZGF0ZVswXStkYXRlWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlWzBdK2RhdGVbMV0rZGF0ZVsyXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyTW9uICs9IGRhdGFbZGF0ZV1bal0uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdHh0ID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZigkKFwiLmF0dGVuZCAuZmMtdmlldy1jb250YWluZXJcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7ICAgLy/rrLTsobDqsbQgNuyjvFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3ZWVrRG9tID0gJChcIi5hdHRlbmQgLmZjLXdlZWtcIikuZXEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdlZWtEdXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDc7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF5RG9tID0gd2Vla0RvbS5maW5kKFwiLmZjLWRheVwiKS5lcShqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBkYXlEb20uYXR0cihcImRhdGEtZGF0ZVwiKS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlWzBdK2RhdGVbMV0rZGF0ZVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWVrRHVyICs9IGRhdGFbZGF0ZV1ba10uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHdlZWtEdXI+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dCs9JzxwIGNsYXNzPVwiYXR0ZW5kX193ZWVrX19ob3VyXCI+JysgTWF0aC5mbG9vcih3ZWVrRHVyLzYwKSsn7Iuc6rCEICcrd2Vla0R1ciU2MCsn67aEJyArJzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQrPSc8cCBjbGFzcz1cImF0dGVuZF9fd2Vla19faG91clwiPjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZF9fd2Vla1wiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKFwiLmF0dGVuZCAuZmMtbGVmdFwiKS5jaGlsZHJlbihcImgyLmR1ck1vbnRoXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZCBoMi5kdXJNb250aFwiKS5odG1sKCcgKCcrTWF0aC5mbG9vcihkdXJNb24vNjApKyfsi5zqsIQgJytkdXJNb24lNjArJ+u2hCknKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmF0dGVuZCAuZmMtbGVmdFwiKS5hcHBlbmQoJzxoMiBjbGFzcz1cImR1ck1vbnRoXCI+ICgnK01hdGguZmxvb3IoZHVyTW9uLzYwKSsn7Iuc6rCEICcrZHVyTW9uJTYwKyfrtoQpPC9oMj4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHh0ID0gJyc7ICAgLy92YXIg67m866i57J2A6rGwIOyVhOuLmC4g7JyE7JeQ7IScIOyEoOyWuCDtlojsnYwhXHJcblxyXG4gICAgICAgICAgICBsZXQgZnVsbE1vbnRoQm9udXMgPSAzMDQwMDtcclxuICAgICAgICAgICAgbGV0IGluc3VyYW5jZUZlZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBiYXNpYyA9IE1hdGgucm91bmQoZHVyTW9uLzYwKjc2MDApO1xyXG4gICAgICAgICAgICBsZXQgZnVsbFdlZWtCdW51cyA9IE1hdGgucm91bmQoKGR1ck1vbi82MCo3NjAwKSowLjIpO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYodGhpcy5pZCA9PT0gdGhpcy52aWV3SUQpe1xyXG4gICAgICAgICAgICAvLyAgICAgLy/rs7jsnbgg66qo65OcXHJcbiAgICAgICAgICAgIC8vICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImFjY291bnQvc2FsYXJ5L1wiK3RoaXNNb250aCtcIi9cIit0aGlzLmlkKS51cGRhdGUoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJhc2ljOiBiYXNpYyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmdWxsV2Vla0J1bnVzOiBmdWxsV2Vla0J1bnVzLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxNb250aEJvbnVzOiBmdWxsTW9udGhCb251c1xyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhY2NvdW50L3NhbGFyeS9cIit0aGlzTW9udGgrXCIvXCIrdGhpcy52aWV3SUQpLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYmFzaWM6IGJhc2ljLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZ1bGxXZWVrQnVudXM6IGZ1bGxXZWVrQnVudXMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZnVsbE1vbnRoQm9udXM6IGZ1bGxNb250aEJvbnVzXHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+6riw67O46riJPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShiYXNpYykrIFwi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7qt7zrrLTsi5zqsIQgWCA3LDYwMOybkDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2xpbmVcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7KO87Zy07IiY64u5PC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShmdWxsV2Vla0J1bnVzKSArXCLsm5A8L3A+XCI7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fZXhwbGFpblwiPuq4sOuzuOq4ieydmCAyMCU8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHR4dCs9JzxkaXYgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19saW5lXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19jYXRlZ29yeVwiPuyXsOywqOyImOuLuTwvcD4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX3ZhbHVlXCI+JysgY29tbWEoZnVsbE1vbnRoQm9udXMpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+NeyLnOqwhCDsg4Hri7kg6riw67O46riJPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZSBhdHRlbmRfX21vbnRoX19saW5lLS1yZWRcIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7IKs7ZqM67O07ZeY66OMPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShpbnN1cmFuY2VGZWUpICtcIuybkDwvcD5cIjtcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJhdHRlbmRfX21vbnRoX19leHBsYWluXCI+6rWt66+87Jew6riIL+qzoOyaqeuztO2XmC/qsbTqsJXrs7Ttl5gg7LKt6rWs7JWhPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9JzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwiYXR0ZW5kX19tb250aF9fbGluZSBhdHRlbmRfX21vbnRoX19saW5lLS1zdW1cIj4nO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2NhdGVnb3J5XCI+7ZWp6rOEPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwiYXR0ZW5kX19tb250aF9fdmFsdWVcIj4nKyBjb21tYShiYXNpYyArIGZ1bGxXZWVrQnVudXMgKyBmdWxsTW9udGhCb251cyAtIGluc3VyYW5jZUZlZSkgK1wi7JuQPC9wPlwiO1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cImF0dGVuZF9fbW9udGhfX2V4cGxhaW5cIj7quLDrs7jquIkgKyDso7ztnLTsiJjri7kgKyDsl7DssKjsiJjri7kgLSDsgqztmozrs7Ttl5jro4w8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgICQoXCIuYXR0ZW5kX19tb250aFwiKS5odG1sKHR4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dFdvcmtIb3VyOiBmdW5jdGlvbihkYXRlT2JqKXtcclxuICAgICAgICAvLyBjc3M6IG1vZHVsZXMvYXR0ZW5kLmNzc1xyXG4gICAgICAgIGxldCBkYXRlU2hvcnQgPSBtb21lbnQoZGF0ZU9iaikuZm9ybWF0KFwiTU0vRERcIik7XHJcbiAgICAgICAgbGV0IGRhdGVJRCA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoXCJZWVlZTU1ERFwiKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgICBpZih0aGlzLmF0dGVuZE9iai5hdHRlbmRbZGF0ZUlEXSl7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmF0dGVuZE9iai5hdHRlbmRbZGF0ZUlEXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cImJsYWNrU2NyZWVuXCI+JztcclxuICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwiaW5wdXRXaW5kb3dcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgICc8cCBjbGFzcz1cInRpdGxlXCI+JytkYXRlU2hvcnQrJyDqt7zrrLTsi5zqsIQ8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImxpbmUgY2xlYXJmaXhcIj4nO1xyXG4gICAgICAgIGlmKGRhdGFbMF0pe1xyXG4gICAgICAgICAgICB0eHQrPSAgICAgICAnPGlucHV0IGlkPVwiZmlyc3RfZnJvbVwiIHZhbHVlPVwiJytkYXRhWzBdLmZyb20rJ1wiPjxwIGNsYXNzPVwid29yZFwiPuu2gO2EsDwvcD48aW5wdXQgaWQ9XCJmaXJzdF90b1wiIHZhbHVlPVwiJytkYXRhWzBdLnRvKydcIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cImZpcnN0X2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwiZmlyc3RfdG9cIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzxkaXYgY2xhc3M9XCJsaW5lIGNsZWFyZml4XCI+JztcclxuICAgICAgICBpZihkYXRhWzFdKXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCIgdmFsdWU9XCInK2RhdGFbMV0uZnJvbSsnXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiIHZhbHVlPVwiJytkYXRhWzFdLnRvKydcIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+JztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdHh0Kz0gICAgICAgJzxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSAgICAgICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSAgICAgICAnPGRpdiBjbGFzcz1cImJvdHRvbVwiPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAgICc8cCBjbGFzcz1cImNvbmZpcm1cIiBkaWQ9XCInK2RhdGVJRCsnXCI+7ZmV7J24PC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgICAgICc8cCBjbGFzcz1cImNsb3NlXCI+7Leo7IaMPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0Kz0gICAnPC9kaXY+JztcclxuICAgICAgICB0eHQrPSc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tb2JpbGUpe1xyXG4gICAgICAgICAgICAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLkFueVBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICBkYXRlVGltZUZvcm1hdDpcIkhIOm1tXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiI2ZpcnN0X2Zyb21cIikuZm9jdXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0V29ya0hvdXI6IGZ1bmN0aW9uKGRhdGUpe1xyXG5cclxuICAgICAgICBsZXQgd29yayA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgYWxsRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZigkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLmVxKGkpLnZhbCgpLmxlbmd0aD4xKXtcclxuICAgICAgICAgICAgICAgIGFsbEVtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGFsbEVtcHR5KXtcclxuICAgICAgICAgICAgaWYodGhpcy52aWV3SUQubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJhdHRlbmQvXCIrdGhpcy52aWV3SUQrXCIvYXR0ZW5kL1wiK2RhdGUpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiYXR0ZW5kL1wiK3RoaXMuaWQrXCIvYXR0ZW5kL1wiK2RhdGUpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgIGxldCBkYXRlSUQgPSBkYXRlLnNsaWNlKDAsNCkgKyBcIi1cIitkYXRlLnNsaWNlKDQsNikgKyBcIi1cIitkYXRlLnNsaWNlKDYsOCk7XHJcbiAgICAgICAgICAgICQoJy5mYy1kYXlbZGF0YS1kYXRlPVwiJytkYXRlSUQrJ1wiXScpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZigkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI2ZpcnN0X2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuICAgICAgICAgICAgLy/si5zsnpHsi5zqsITsnbQg7J6YIOyeheugpeuQmOyXiOuCmCDtmZXsnbhcclxuXHJcbiAgICAgICAgICAgIGlmKGRhdGU8bW9tZW50KCkuZm9ybWF0KFwiWVlZWU1NRERcIikpe1xyXG4gICAgICAgICAgICAgICAgLy/smKTripgg7J207KCEIOydvOydmCDrgqDsp5zrpbwg64uk66Oo6rOgIOyeiOydhCDqsr3smrAgLSDqt7zrrLQg7KKF66OM7Iuc6rCE7J20IOyeheugpeuQmOyngCDslYrsnLzrqbQg7JWIIOuQqFxyXG4gICAgICAgICAgICAgICAgaWYoJChcIiNmaXJzdF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL+ydtOyghOydvOydtCDslYTri4jrjZTrnbzrj4Qg7JiI7IOBIOq3vOustOyLnOqwhOydtOudvOuPhCDsnoXroKXtlbTslbwg7ZWoXHJcbiAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi7JiI7IOBIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmcm9tID0gJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICBsZXQgdG8gPSAkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZyb21BID0gZnJvbS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgIGxldCB0b0EgPSB0by5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgIGxldCBkaWYgPSAodG9BWzBdKjEgLSBmcm9tQVswXSoxKSo2MCArICh0b0FbMV0qMSAtIGZyb21BWzFdKjEpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgdG86IHRvLFxyXG4gICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhbGVydChcIuq3vOustOyLnOqwhOydtCDsnpjrqrsg7J6F66Cl65CY7JeI7Iq164uI64ukLiBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZigkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRlPG1vbWVudCgpLmZvcm1hdChcIllZWVlNTUREXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8v7J207KCE7J287J20IOyVhOuLiOuNlOudvOuPhCDsmIjsg4Eg6re866y07Iuc6rCE7J20652864+EIOyeheugpe2VtOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICBpZigkKFwiI3NlY29uZF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPlwiMDg6MDBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOyYiOyDgSDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmcm9tID0gJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGxldCB0byA9ICQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmcm9tQSA9IGZyb20uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvQSA9IHRvLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAodG9BWzBdKjEgLSBmcm9tQVswXSoxKSo2MCArICh0b0FbMV0qMSAtIGZyb21BWzFdKjEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgICAgICAgICAgICAgICB0bzogdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg6re866y07Iuc6rCE7J20IOyemOuquyDsnoXroKXrkJjsl4jsirXri4jri6QuIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy52aWV3SUQubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLnZpZXdJRCtcIi9hdHRlbmQvXCIrZGF0ZSkuc2V0KHdvcmspO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkK1wiL2F0dGVuZC9cIitkYXRlKS5zZXQod29yayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLm1vZGFsXCIpLmh0bWwoXCJcIik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdHRlbmQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2F0dGVuZC5qcyIsImxldCBDaXR5ID0ge1xyXG4gICAgZGF0YToge30sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLmNpdHlcIikub24oXCJjbGlja1wiLCBcIi5yZWZyZXNoXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQucmVmcmVzaFN0YXR1cygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmNpdHlcIikub24oXCJjbGlja1wiLCBcIi5jaXR5X190cmFuc3BvcnRcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVNZXRyb0xpbmUoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8aDI+64+E7IucIOuNsOydtO2EsCDtmZXrs7TtmITtmak8L2gyPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJyZWZyZXNoXCI+7LWc7Iug7ZmUPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwid3JhcHBlclwiPic7XHJcblxyXG4gICAgICAgIHR4dCs9ICc8ZGl2IGNsYXNzPVwibGluZSB0b3BcIj4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwibmFtZVwiPuuPhOyLnOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzXCI+7IiZ7IaMPC9wPic7XHJcbiAgICAgICAgdHh0Kz0gICAgICAnPHAgY2xhc3M9XCJjaXR5X19zcG90c1wiPuq0gOq0keyngCDsoJXrpqw8L3A+JztcclxuICAgICAgICB0eHQrPSAgICAgICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydFwiPuq1kO2GtTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fYXJlYVwiPuyngOyXrTwvcD4nO1xyXG4gICAgICAgIHR4dCs9ICAgICAgJzxwIGNsYXNzPVwiY2l0eV9fcHJpY2VcIj7rrLzqsIA8L3A+JztcclxuICAgICAgICB0eHQrPSAnPC9kaXY+JztcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKHZhciBjb2RlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NvZGVdO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gY2l0eS5zdGF0dXM7XHJcblxyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJsaW5lXCIgaWQ9XCInICsgY2l0eS5jb2RlICsgJ1wiPjxwIGNsYXNzPVwibmFtZVwiPicgKyBjaXR5Lm5hbWUgKyAnPC9wPic7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLmhvdGVsID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzIHdlaWdodC0tYm9sZFwiPu2PieqwgCDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuaG90ZWwgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19ob3RlbHNcIj7rjbDsnbTthLAg7J6I7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9faG90ZWxzIGNvbG9yLS1yZWRcIj7rjbDsnbTthLAg7JeG7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMuc3BvdCA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzIHdlaWdodC0tYm9sZFwiPuygleuztOqygOymnSDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+MuywqOqygOymnTwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5zcG90ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fc3BvdHNcIj7tlansuZjquLA8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMuc3BvdCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzXCI+7KCV67O0IOqygOymneykkTwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3Nwb3RzIGNvbG9yLS1yZWRcIj7soJXrs7Qg7JeG7J2MPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0IHdlaWdodC0tYm9sZFwiPuuMgOykkeq1kO2GtSDsmYTro4w8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eV9fdHJhbnNwb3J0XCI+642w7J207YSwIOyeiOydjDwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3RyYW5zcG9ydCBjb2xvci0tcmVkXCI+642w7J207YSwIOyXhuydjDwvcD4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzLmFyZWEpIHtcclxuICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJjaXR5X19hcmVhXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX2FyZWEgY29sb3ItLXJlZFwiPlg8L3A+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cy5wcmljZSkge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3ByaWNlXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNpdHlfX3ByaWNlIGNvbG9yLS1yZWRcIj5YPC9wPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nOyAvL2Nsb3NlIHdyYXBwZXJcclxuXHJcbiAgICAgICAgJChcIi5jaXR5XCIpLmh0bWwodHh0KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignc2V0dGluZy9jaXRpZXMnKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGUoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZU1ldHJvTGluZTogZnVuY3Rpb24oY2lkKXtcclxuICAgICAgICBsZXQgc3RhdHVzID0gdGhpcy5kYXRhW2NpZF0uc3RhdHVzO1xyXG4gICAgICAgIGlmKHN0YXR1cy5zcG90PjIgJiYgc3RhdHVzLnRyYW5zcG9ydD4wKXtcclxuICAgICAgICAgICAgdG9hc3QoXCLrjIDspJHqtZDthrUg7KCV67O066W8IOqwgOqzte2VqeuLiOuLpC5cIik7XHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaWQpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwb3RzID0gZGF0YS5zcG90cy5yYW5rZWQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF4ID0gc3BvdHMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgaWYobWF4Pjk5KXtcclxuICAgICAgICAgICAgICAgICAgICBtYXggPSA5OTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWV0cm9zID0gZGF0YS5sb2NhbC5tZXRybztcclxuICAgICAgICAgICAgICAgIGxldCBtZXRyb0xpbmUgPSB7fTtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wTGluZSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWV0cm9zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1ldHJvID0gbWV0cm9zW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc1Nwb3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBzcG90c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IDYwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBEaWYgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BvdC5lbnRlcmFuY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzcG90LmVudGVyYW5jZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbnQgPSBzcG90LmVudGVyYW5jZVtrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRGlmID0gY2FsY3VsYXRlRGlmKGVudCwgbWV0cm8uY29vcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGVtcERpZjxkaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWYgPSB0ZW1wRGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNTcG90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEaWYgPSBjYWxjdWxhdGVEaWYoc3BvdC5jb29yLCBtZXRyby5jb29yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGVtcERpZjxkaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmID0gdGVtcERpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Nwb3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihoYXNTcG90KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWV0cm8ubGluZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gbWV0cm8ubGluZVtrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighdGVtcExpbmVbbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVtsaW5lXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0ZW1wTGluZVtsaW5lXVtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpZiA8IHRlbXBMaW5lW2xpbmVdW2ldLmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVtsaW5lXVtpXSA9IHtjb29yOnNwb3QuY29vciwgcmFuazppLCBuYW1lOnNwb3QubmFtZSwgZGlmOmRpZiwgc3RuOntjb29yOm1ldHJvLmNvb3IsIG5hbWU6bWV0cm8ubmFtZX19OyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVtsaW5lXVtpXSA9IHtjb29yOnNwb3QuY29vciwgcmFuazppLCBuYW1lOnNwb3QubmFtZSwgZGlmOmRpZiwgc3RuOntjb29yOm1ldHJvLmNvb3IsIG5hbWU6bWV0cm8ubmFtZX19OyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbGluZSBpbiB0ZW1wTGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0xpbmVbbGluZV0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHJhbmsgaW4gdGVtcExpbmVbbGluZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJvTGluZVtsaW5lXS5wdXNoKHRlbXBMaW5lW2xpbmVdW3JhbmtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1ldHJvTGluZSk7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaWQrXCIvbWV0cm9MaW5lXCIpLnNldChtZXRyb0xpbmUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRvYXN0KFwi64yA7KSR6rWQ7Ya1IOygleuztOulvCDqsIDqs7XtlZjquLDsl5Ag7J6Q66OM6rCAIOu2gOyhse2VqeuLiOuLpC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgcmVmcmVzaFN0YXR1czogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChjb25maXJtKFwi642w7J207YSw66W8IOunjuydtCDsnqHslYTrqLnsirXri4jri6QhIOygleunkCDstZzsi6DtmZTtlZjsi5zqsqDsirXri4jquYw/XCIpKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMnKS5vbmNlKFwidmFsdWVcIiwgc25hcD0+e1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgY2lkIGluIHRoYXQuZGF0YSkge1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHt9O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNpdHkgPSBkYXRhW2NpZF07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihjaXR5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWw6IDAsIC8vMDrrjbDsnbTthLDsl4bsnYwsIDE67IiZ7IaM642w7J207YSw66eMIOyeiOydjCwgMjrtj4nqsIDrjbDsnbTthLAo7JuM65SpKSDsnojsnYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3Q6IHRoYXQuZGF0YVtjaWRdLnN0YXR1cy5zcG90LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogMCwgLy/rjbDsnbTthLDsl4bsnYwsIDE666mU7Yq466Gc642w7J207YSw66eMIOyeiOydjCwgMjrqsIDqs7XrjbDsnbTthLAo65287J2467OELi7rk7EpIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2l0eS5hcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuYXJlYSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaXR5LmhvdGVscyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaG90ZWwgPSBjaXR5LmhvdGVsc1tPYmplY3Qua2V5cyhjaXR5LmhvdGVscylbMF1dO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuaG90ZWwgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmhvdGVsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwuYXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmFyZWEgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoaG90ZWwuYXJlYSA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmFyZWEgPSAyO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5zdGF0dXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5LnN0YXR1cy5hcmVhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5zdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2l0eS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eS5zdGF0dXMuYXJlYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkuc3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cycpLnVwZGF0ZShjaXR5LnN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaXR5Lm1ldHJvKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNpdHkubWV0cm9MaW5lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMudHJhbnNwb3J0ID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy50cmFuc3BvcnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2l0eS5wcmljZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMucHJpY2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsOiAwLCAvLzA6642w7J207YSw7JeG7J2MLCAxOuyImeyGjOuNsOydtO2EsOunjCDsnojsnYwsIDI67Y+J6rCA642w7J207YSwKOybjOuUqSkg7J6I7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogMCwgLy/rjbDsnbTthLDsl4bsnYwsIDE666mU7Yq466Gc642w7J207YSw66eMIOyeiOydjCwgMjrqsIDqs7XrjbDsnbTthLAo65287J2467OELi7rk7EpIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFbY2lkXS5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignc2V0dGluZy9jaXRpZXMnKS5zZXQodGhhdC5kYXRhKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmluZmxhdGUodGhhdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdCgn7LWc7Iug7ZmUIOyZhOujjCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENpdHk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2NpdHkuanMiLCJpbXBvcnQgRmlyc3RfY2hlY2sgZnJvbSBcIi4vc3BvdC9maXJzdF9jaGVjay5qc1wiO1xyXG5pbXBvcnQgU2Vjb25kX2NvbWJpbmUgZnJvbSBcIi4vc3BvdC9zZW9uZF9jb21iaW5lLmpzXCI7XHJcbmltcG9ydCBUaGlyZF9maW5hbGl6ZSBmcm9tIFwiLi9zcG90L3RoaXJkX2ZpbmFsaXplLmpzXCI7XHJcblxyXG52YXIgU3BvdCA9IHtcclxuICAgIGNpdGllczoge30sXHJcbiAgICBvcmRlcjpcIlwiLFxyXG4gICAgZGF0YToge30sXHJcbiAgICBjdXJyZW50OlwiXCIsIC8v7ZiE7J6sIOuztOqzoOyeiOuKlCDrj4Tsi5wgY2lkIC0gZmlyZWJhc2UgcmVm7JeQIG9mZiDri6zquLDsnITtlbRcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAodV9pKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgRmlyc3RfY2hlY2suaW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLm9yZGVyID0gdV9pLnNldHRpbmcub3JkZXI7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcycpLm9uKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgdGhhdC5jaXRpZXMgPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGF0Lm9yZGVyID0gdV9pLnNldHRpbmcub3JkZXI7XHJcbiAgICAgICAgICAgIHRoYXQuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9zdGF0dXMoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuYWN0aXZlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGNpZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHRoYXQuY2l0aWVzW2NpZF0uc3RhdHVzLnNwb3Q7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmluZmxhdGVfY2l0eShjaWQsIHN0YXR1cyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLm9yZGVyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5vcmRlciA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG4gICAgICAgICAgICB2YXIgdWlkID0gdV9pLm1haWw7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCd1c2Vycy8nICsgdWlkICsgXCIvc2V0dGluZy9vcmRlclwiKS5zZXQodGhhdC5vcmRlcik7XHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9zdGF0dXMoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIucmV0dXJuXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX3N0YXR1cygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLzLssKjqsoDspp1cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5yZW1vdmVfc3BvdFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBUaGlyZF9maW5hbGl6ZS5yZW1vdmVfc3BvdCgkKHRoaXMpLnBhcmVudCgpLmF0dHIoXCJpZFwiKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIucmVkb19yZW1vdmVcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgVGhpcmRfZmluYWxpemUucmVkb19yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfc3RhdHVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5kYXRhO1xyXG5cclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzxoMj7qtIDqtJHsp4Ag642w7J207YSwIOygleumrCDtmITtmak8L2gyPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cIm9yZGVyXCIgaWQ9XCJhYmNcIj7qsIDrgpjri6TsiJw8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwib3JkZXJcIiBpZD1cImNoYW5nZWRcIj7siJjsoJXsi5zqsITsiJw8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwid3JhcHBlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwibGluZXIgbGluZXItLWhlYWRlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaXR5TmFtZVwiPuuPhOyLnOuqhTwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+7IOB7YOcPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImxpbmVyX19jaGFyZ2VcIj7ri7Tri7nsnpA8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIHZhciBvcmRlckFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXIgPT09IFwiYWJjXCIpIHtcclxuICAgICAgICAgICAgICAgIG9yZGVyQXJyYXkucHVzaCh7IGNpZDogY2lkLCBpZHg6IGNpdHkubmFtZSB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9yZGVyID09PSBcImNoYW5nZWRcIikge1xyXG4gICAgICAgICAgICAgICAgb3JkZXJBcnJheS5wdXNoKHsgY2lkOiBjaWQsIGlkeDogY2l0eS5vcmRlci5jaGFuZ2VkIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcmRlckFycmF5LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuaWR4ID4gYi5pZHggPyAxIDogYS5pZHggPCBiLmlkeCA/IC0xIDogMDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXR1c0FycmF5ID0gW1xyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuPu2Vqey5mOq4sDwvc3Bhbj4gPiA8c3Bhbj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuPuyZhOujjDwvc3Bhbj48L3A+JyxcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3BhbiBjbGFzcz1cImFjdGl2ZVwiPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4+MuywqOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7smYTro4w8L3NwYW4+PC9wPicsXHJcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImxpbmVyX19zdGF0dXNcIj48c3Bhbj7soJXrs7TsiJjsp5E8L3NwYW4+ID4gPHNwYW4+7KCV67O06rKA7KadPC9zcGFuPiA+IDxzcGFuIGNsYXNzPVwiYWN0aXZlXCI+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4+7JmE66OMPC9zcGFuPjwvcD4nLFxyXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJsaW5lcl9fc3RhdHVzXCI+PHNwYW4+7KCV67O07IiY7KeRPC9zcGFuPiA+IDxzcGFuPuygleuztOqygOymnTwvc3Bhbj4gPiA8c3Bhbj7tlansuZjquLA8L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj4y7LCo6rKA7KadPC9zcGFuPiA+IDxzcGFuPuyZhOujjDwvc3Bhbj48L3A+JyxcclxuICAgICAgICAgICAgJzxwIGNsYXNzPVwibGluZXJfX3N0YXR1c1wiPjxzcGFuPuygleuztOyImOynkTwvc3Bhbj4gPiA8c3Bhbj7soJXrs7TqsoDspp08L3NwYW4+ID4gPHNwYW4+7ZWp7LmY6riwPC9zcGFuPiA+IDxzcGFuPjLssKjqsoDspp08L3NwYW4+ID4gPHNwYW4gY2xhc3M9XCJhY3RpdmVcIj7smYTro4w8L3NwYW4+PC9wPidcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9yZGVyQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNpZCA9IG9yZGVyQXJyYXlbaV0uY2lkO1xyXG4gICAgICAgICAgICBsZXQgY2l0eSA9IGRhdGFbY2lkXTtcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImxpbmVyXCIgaWQ9XCInICsgY2lkICsgJ1wiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJsaW5lcl9fY2l0eU5hbWVcIj4nICsgY2l0eS5uYW1lICsgJzwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gc3RhdHVzQXJyYXlbY2l0eS5zdGF0dXMuc3BvdF07XHJcbiAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJsaW5lcl9fY2hhcmdlXCI+64u064u57J6QPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdHh0ICs9ICc8L2Rpdj4nOy8vd3JhcHBlciDri6vquLBcclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5zcG90XCIpLmh0bWwodHh0KTtcclxuICAgICAgICAkKFwiI1wiICsgdGhpcy5vcmRlcikuYWRkQ2xhc3MoXCJvcmRlci0tc2VsZWN0ZWRcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfY2l0eTogZnVuY3Rpb24gKGNpZCwgc3RhdHVzKXtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIHRoYXQuY3VycmVudCkub2ZmKFwidmFsdWVcIik7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCkub24oXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50ID0gY2lkO1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNpdHlOYW1lID0gdGhhdC5jaXRpZXNbY2lkXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gMSkgeyAgIC8v7ZiE7J6sIOygleuztOyImOynkeyDge2DnCDqsoDspp1cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmhlYWRlclwiKS5odG1sKCc8aDI+JyArIGNpdHlOYW1lICsgJyDsoJXrs7TqsoDspp08L2gyPicpLmF0dHIoJ2NpZCcsIGNpZCkuYXR0cignY2l0eU5hbWUnLGNpdHlOYW1lKS5hZGRDbGFzcyhcImNpdHlOYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEZpcnN0X2NoZWNrLmluZmxhdGUoZGF0YS5zcG90cyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gMikgeyAvL+2Vqey5mOq4sOyekeyXhVxyXG4gICAgICAgICAgICAgICAgICAgIFNlY29uZF9jb21iaW5lLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAvLzLssKjqsoDspp3tmZTrqbTqs7wg7JmE66OM7ZmU66m07J2AIOuUsOuhnCDssKjsnbTqsIAg7JeG7J2MXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuaHRtbCgnPGgyPicgKyBjaXR5TmFtZSArICcgMuywqOqygOymnTwvaDI+JykuYXR0cignY2lkJywgY2lkKS5hdHRyKCdjaXR5TmFtZScsY2l0eU5hbWUpLmFkZENsYXNzKFwiY2l0eU5hbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgVGhpcmRfZmluYWxpemUuaW5mbGF0ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgn7JWE66y065+wIOuNsOydtO2EsOqwgCDsl4bsirXri4jri6QuIOuNsOydtO2EsCDsiJjsp5HsnYQg66i87KCAIOynhO2Wie2VtOyjvOyEuOyalC4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLm5hdl9faXRlbVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ25hdl9faXRlbS0taGFzRHJhd2VyJykpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIHRoYXQuY3VycmVudCkub2ZmKFwidmFsdWVcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIubmF2X19kcmF3ZXJfX2l0ZW0gXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuYXR0cignaWQnKSA9PT0gJ25hdl9zcG90Jykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIHRoYXQuY3VycmVudCkub2ZmKFwidmFsdWVcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcG90O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL3Nwb3QuanMiLCJpbXBvcnQgQXV0b0NvbWJpbmUgZnJvbSAnLi9hdXRvQ29tYmluZS5qcyc7XHJcblxyXG52YXIgRmlyc3RfQ2hlY2sgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0UmVtYWluTnVtYmVyKCQodGhpcykucGFyZW50KCkuYXR0cihcImlkXCIpLCAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwiLmNoZWNrX19yZW1haW5OdW1iZXJcIikudmFsKCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3RcIikub24oXCJjbGlja1wiLCBcIi5jaGVja19fbm9kYXRhXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNpZCA9ICQodGhpcykuYXR0cignc2lkJyk7XHJcbiAgICAgICAgICAgIHRoYXQuc2l0ZU5vZGF0YShzaWQpO1xyXG4gICAgICAgICAgICB0b2FzdCgn642w7J207YSwIOqzteuwsSDsspjrpqwnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/sooztkZwg7JeG64qUIOq0gOq0keyngOydmCDsooztkZzrpbwg7J6F66Cl7ZWoXHJcbiAgICAgICAgJChcIi5zcG90XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2hlY2tfX3Nwb3REZWxldGVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGF0LmRlbGV0ZVNwb3QoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIiksICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIuY2hlY2tfX3Nwb3ROYW1lXCIpLmh0bWwoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v7KKM7ZGcIOyXhuuKlCDqtIDqtJHsp4DsnZgg7KKM7ZGc66W8IOyeheugpe2VqFxyXG4gICAgICAgICQoXCIuc3BvdFwiKS5vbihcImNsaWNrXCIsIFwiLmNoZWNrX19jb25maXJtXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhhdC5pbnB1dENvb3JkaW5hdGUoJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIiksICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCIuY2hlY2tfX3Nwb3RDb29yXCIpLnZhbCgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgc2l0ZU5vZGF0YTogZnVuY3Rpb24gKHNpZCkge1xyXG4gICAgICAgIHZhciBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlybShcIuuNsOydtO2EsOulvCDsoJXrp5Ag7JeG7JWx64uI6rmMIT9cIikpe1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpZCArIFwiL25vZGF0YVwiKS5zZXQodHJ1ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFJlbWFpbk51bWJlcjogZnVuY3Rpb24gKHNpdGUsIG51bWJlcikge1xyXG4gICAgICAgIGxldCBjaXR5ID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBjdXRObyA9IG51bWJlci50cmltKCkgKiAxO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSk7XHJcblxyXG4gICAgICAgIGlmIChjdXRObyA8IDEwMCkge1xyXG4gICAgICAgICAgICB0b2FzdChcIjEwMOqwnCDsnbTsg4HsnZgg7J6l7IaM66W8IOycoOyngO2VtOyjvOyEuOyalFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlybShcIuyInOychCBcIiArIGN1dE5vICsgXCLsnIQg66+466eMIOyepeyGjOulvCDrqqjrkZAg7KCc6rGw7ZWp64uI64ukLiDrp57sirXri4jquYw/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3V0T2JqID0gdGhpcy5kYXRhLnNwb3RzW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgY3V0T2JqLmxlbmd0aCA9IGN1dE5vO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSkuc2V0KGN1dE9iaik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZVNwb3Q6IGZ1bmN0aW9uIChzaWQsIG5hbWUpIHtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgc2l0ZSA9IHNpZC5zcGxpdChcIl9cIilbMF07XHJcbiAgICAgICAgbGV0IG5vID0gc2lkLnNwbGl0KFwiX1wiKVsxXTtcclxuXHJcbiAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpcm0obmFtZSArIFwiIOyepeyGjOulvCDsoJzqsbDtlanri4jri6QuIOqzhOyGje2VoOq5jOyalD9cIikpIHtcclxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiICsgY2l0eSArIFwiL3Nwb3RzL1wiICsgc2l0ZSArIFwiL1wiICsgbm8pLnNldCh7IGRlbGV0ZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiICsgc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7J6l7IaM6rCAIOygnOqxsOuQmOyXiOyKteuLiOuLpC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYgKGNvbmZpcm0obm8gKyBcIuuyiCDsnqXshozrpbwg7KCc6rGw7ZWp64uI64ukLiDqs4Tsho3tlaDquYzsmpQ/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUgKyBcIi9cIiArIG5vKS5zZXQoeyBkZWxldGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgJChcIiNcIiArIHNpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChcIuyepeyGjOqwgCDsoJzqsbDrkJjsl4jsirXri4jri6QuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dENvb3JkaW5hdGU6IGZ1bmN0aW9uIChzaWQsIGNvb3JUeHQpIHtcclxuICAgICAgICBsZXQgY2l0eSA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgc2l0ZSA9IHNpZC5zcGxpdChcIl9cIilbMF07XHJcbiAgICAgICAgbGV0IG5vID0gc2lkLnNwbGl0KFwiX1wiKVsxXTtcclxuICAgICAgICBsZXQgY29vciA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoY29vclR4dC5zcGxpdChcIixcIikubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXQgPSBjb29yVHh0LnNwbGl0KFwiLFwiKVswXS50cmltKCkgKiAxO1xyXG4gICAgICAgICAgICBsZXQgbG5nID0gY29vclR4dC5zcGxpdChcIixcIilbMV0udHJpbSgpICogMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc05hTihsYXQpIHx8IGlzTmFOKGxuZykpIHtcclxuICAgICAgICAgICAgICAgIC8v7KKM7ZGcIOykkSDtlZjrgpjqsIBcclxuICAgICAgICAgICAgICAgIHRvYXN0KFwi7KKM7ZGc6rCAIOu2gOygle2Zle2VmOqyjCDsnoXroKXrkJjsl4jsirXri4jri6RcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb29yID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogbGF0LFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzogbG5nXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoXCLsooztkZzqsIAg7J6F66Cl65CY7JeI7Iq164uI64ukXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNcIiArIHNpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIiArIGNpdHkgKyBcIi9zcG90cy9cIiArIHNpdGUgKyBcIi9cIiArIG5vICsgXCIvY29vclwiKS5zZXQoY29vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0b2FzdChcIuyijO2RnOqwgCDrtoDsoJXtmZXtlZjqsowg7J6F66Cl65CY7JeI7Iq164uI64ukXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5oZWFkZXJcIikuYXBwZW5kKCc8cCBjbGFzcz1cInJldHVyblwiPuuPjOyVhOqwgOq4sDwvcD4nKTtcclxuXHJcbiAgICAgICAgbGV0IGhhc1Byb2JsZW0gPSBmYWxzZTtcclxuICAgICAgICBsZXQgdHh0ID0gJyc7XHJcbiAgICAgICAgbGV0IHNlYXJjaFVybCA9ICdodHRwczovL3d3dy5nb29nbGUuY28ua3IvbWFwcy9wbGFjZS8nICsgJChcIi5jaXR5TmFtZVwiKS5hdHRyKCdjaXR5TmFtZScpICsgXCIrXCI7XHJcblxyXG4gICAgICAgIGxldCBzaXRlT2JqID0ge1xyXG4gICAgICAgICAgICBnZzogXCLqtazquIBcIixcclxuICAgICAgICAgICAgbnY6IFwi64Sk7J2067KEXCIsXHJcbiAgICAgICAgICAgIHRhOiBcIu2KuOumveyWtOuTnOuwlOydtOyggFwiLFxyXG4gICAgICAgICAgICBscDogXCLroaDrpqztlIzrnpjri5tcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIHNpdGUgaW4gc2l0ZU9iaikge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNpdGVIYXNQcm9ibGVtID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBub0Nvb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG5vQ29vclR4dCA9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZVwiPuyijO2RnOqwgCDsnoXroKXrkJjsp4Ag7JWK7J2AIOq0gOq0keyngOqwgCDsnojsirXri4jri6Q8L3A+JztcclxuICAgICAgICAgICAgbGV0IG5vU3BvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9TcG90VHh0ID0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+67mE7Ja07J6I64qUIOq0gOq0keyngOqwgCDsnojsirXri4jri6Q8L3A+JztcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3RpdGxlXCI+JyArIHNpdGVPYmpbc2l0ZV0gKyAnIOuNsOydtO2EsCDtmZXsnbg8L3A+JztcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YVtzaXRlXS5ub2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbc2l0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNwb3QgPSBkYXRhW3NpdGVdW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BvdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc0Nvb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QuZGVsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v7J2867aA65+sIOyCreygnO2VnCDqtIDqtJHsp4AgLT4g64SY7Ja06rCE64ukXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmNvb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwb3QuY29vci5sbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc05hTihzcG90LmNvb3IubG5nICogMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb29yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90LmNvb3IubGF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oc3BvdC5jb29yLmxhdCAqIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29vciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNDb29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCArPSAnPGRpdiBjbGFzcz1cImNoZWNrX19saW5lXCIgaWQ9XCInICsgc2l0ZSArICdfJyArIGkgKyAnXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8YSBjbGFzcz1cImNoZWNrX19zcG90TmFtZVwiIGhyZWY9XCInICsgc2VhcmNoVXJsICsgc3BvdC5uYW1lICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBzcG90Lm5hbWUgKyAnPC9hPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCArPSAnPGlucHV0IGNsYXNzPVwiY2hlY2tfX3Nwb3RDb29yXCIgcGxhY2Vob2xkZXI9XCJ4eC54eHh4eCwgeHgueHh4eHgg7ZiV7YOcIOyeheugpVwiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ29vclR4dCArPSAnPHAgY2xhc3M9XCJjaGVja19fY29uZmlybVwiPuyijO2RnCDsnoXroKU8L3A+PHAgY2xhc3M9XCJjaGVja19fc3BvdERlbGV0ZVwiPuyepeyGjCDsgq3soJw8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9Db29yVHh0ICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZUhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0Nvb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQgKz0gJzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJyArIHNpdGUgKyAnXycgKyBpICsgJ1wiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3R4dFwiPicgKyBpICsgJyDrsogg6rSA6rSR7KeAPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3Nwb3REZWxldGVcIj7snqXshowg7IKt7KCcPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1Nwb3RUeHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVIYXNQcm9ibGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub0Nvb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9IG5vQ29vclR4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vU3BvdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gbm9TcG90VHh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0ubGVuZ3RoID4gMTUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXJnZU9LID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGFyZ2VEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sYXJnZURhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzE1MOqwnCDsnbTsg4HsnZgg642w7J207YSw66W8IOuztOycoO2VmOugpOuptCDrj4Tsi5zrqoUvc3BvdHMvbGFyZ2VEYXRhL+yCrOydtO2KuOuqheydtCB0cnVl65286rOgIOu2gOyXrOuQmOyWtOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFyZ2VPSyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFyZ2VPSyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxhcmdlT0spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZUhhc1Byb2JsZW0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZVwiPicgKyBzaXRlT2JqW3NpdGVdICsgJyDsnqXshowg642w7J207YSw6rCAIDE1MOqwnOulvCDstIjqs7woJyArIGRhdGFbc2l0ZV0ubGVuZ3RoICsgJ+qwnCntlanri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJjaGVja19fbGluZVwiIGlkPVwiJyArIHNpdGUgKyAnXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPGlucHV0IGNsYXNzPVwiY2hlY2tfX3JlbWFpbk51bWJlclwiIHZhbHVlPVwiJyArIGRhdGFbc2l0ZV0ubGVuZ3RoICsgJ1wiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3JlbWFpbkxhcmdlRGF0YVwiPuqwnOydmCDsnqXshowg7Jyg7KeA7ZWY6riwPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3RpdGxlXCI+JyArIHNpdGVPYmpbc2l0ZV0gKyAnIOuNsOydtO2EsOqwgCDsobTsnqztlZjsp4Ag7JWK7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19zdWJUaXRsZSBjaGVja19fbm9kYXRhXCIgc2lkPVwiJyArIHNpdGUgKyAnXCI+642w7J207YSw6rCAIOybkOuemCDsl4bsnYQg6rK97JqwIO2BtOumre2VtOyjvOyEuOyapTwvcD4nO1xyXG4gICAgICAgICAgICAgICAgaGFzUHJvYmxlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzaXRlSGFzUHJvYmxlbSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzog7JuQ656YIOyCrOydtO2KuCDrjbDsnbTthLDqsIAg7KG07J6s7ZWY7KeAIOyViuuKlCDqsr3smrDrpbwg64yA67mE7ZWcIOuyhO2KvOydhCDrp4zrk6Tqs6Agc2l0ZSDqsJLsnLzroZwgbm9kYXRhOiB0cnVl66W8IOuEo+yWtOykgOuLpC5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNpdGVIYXNQcm9ibGVtKSB7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2hlY2tfX3N1YlRpdGxlXCI+67Cc6rKs65CcIOusuOygnOqwgCDsl4bsirXri4jri6Q8L3A+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhhc1Byb2JsZW0pIHtcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cImNoZWNrX19maW5pc2hcIj7qsoDsgqzrpbwg66qo65GQIOuniOyzpOyKteuLiOuLpDwvcD4nO1xyXG4gICAgICAgICAgICAkKFwiLnNwb3QgLndyYXBwZXJcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBjaWQgPSAkKFwiLmNpdHlOYW1lXCIpLmF0dHIoJ2NpZCcpO1xyXG4gICAgICAgICAgICB0b2FzdChcIuuwnOqyrOuQnCDrrLjsoJzqsIAg7JeG7Ja0IOuNsOydtO2EsCDrs5HtlansnYQg7Iuk7Iuc7ZWp64uI64ukLlwiKTtcclxuXHJcbiAgICAgICAgICAgIEF1dG9Db21iaW5lLmluaXQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLndyYXBcIikuc2Nyb2xsVG9wKDApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaXJzdF9DaGVjaztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L2ZpcnN0X2NoZWNrLmpzIiwiLy9maXJzdF9jaGVja+yXkOyEnOunjCBpbXBvcnRlZCDrkJjqs6Ag7IKs7Jqp65CoXHJcblxyXG52YXIgQXV0b0NvbWJpbmUgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICBsZXQgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaXRlQXJyID0gW1wiZ2dcIiwgXCJscFwiLCBcIm52XCIsIFwidGFcIl07XHJcbiAgICAgICAgbGV0IGNvbWJpbmluZyA9IHt9O1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXRlQXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBzaXRlID0gc2l0ZUFycltqXTtcclxuICAgICAgICAgICAgaWYgKGRhdGFbc2l0ZV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW3NpdGVdLm5vRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtzaXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtzaXRlXVtpXSAmJiAhZGF0YVtzaXRlXVtpXS5kZWxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2xkU3BvdCA9IGRhdGFbc2l0ZV1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+q4sOyhtCDsoJXrs7Trpbwgb2xkU3BvdOydtOudvOqzoCDtlZjsnpAuIOyDiOuhnOyatCDsiqTtjJ/soJXrs7Tsl5DripQg7J2066aE7J2EIO2VnC/smIHsnLzroZwg67aE7ZWg7ZWY6rOgIOuere2CueydhCDrtoDsl6ztlaAg6rKD7J2064ukLlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcG90ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga286IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yOiBvbGRTcG90LmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuazoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvW+qwgC3tnqNdLy50ZXN0KG9sZFNwb3QubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90Lm5hbWUua28gPSBvbGRTcG90Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QubmFtZS5lbiA9IG9sZFNwb3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QucmFua1tzaXRlXSA9IGk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFNwb3QudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdC51cmwgPSBvbGRTcG90LnVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRTcG90LnRhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QudGFnID0gb2xkU3BvdC50YWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmluZ1tcInMwMFwiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudGVyIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wiczBcIiArIGNvdW50ZXJdID0gc3BvdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluaW5nW1wic1wiICsgY291bnRlcl0gPSBzcG90O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IC8v7ZWc67CU7YC0IOuPjOyVmOuLuVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBjb21iaW5lT2JqID0ge31cclxuICAgICAgICBsZXQgY29tYmluZWQgPSB7fVxyXG5cclxuICAgICAgICBmb3IgKHZhciBjb2RlIGluIGNvbWJpbmluZykge1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IGNvbWJpbmluZ1tjb2RlXTtcclxuICAgICAgICAgICAgY29tYmluZU9ialtjb2RlXSA9IHNwb3RcclxuICAgICAgICAgICAgY29tYmluZU9ialtjb2RlXS5jb21iaW5lID0ge307XHJcbiAgICAgICAgICAgIGxldCBoYXNDb21iaW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL+2Vqey5oCDqsoPsnbQg7JeG7Jy866m0IOuwlOuhnCBjb21iaW5lZCDsqr3snLzroZwg67O064K464ukLlxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgdENvZGUgaW4gY29tYmluaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29kZSA8IHRDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRTcG90ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbWJpbmluZ1t0Q29kZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdFNwb3Rba2V5XSA9IGNvbWJpbmluZ1t0Q29kZV1ba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRTcG90LmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGNhbGN1bGF0ZURpZihzcG90LmNvb3IsIHRTcG90LmNvb3IpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMjUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lT2JqW2NvZGVdLmNvbWJpbmVbdENvZGVdID0gdFNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNDb21iaW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaGFzQ29tYmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbWJpbmVkW2NvZGVdID0gY29tYmluZU9ialtjb2RlXTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb21iaW5lT2JqW2NvZGVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJjaXRpZXMvXCIgKyBjaWQgKyBcIi9zcG90c1wiKS5zZXQoe1xyXG4gICAgICAgICAgICBjb21iaW5pbmc6IGNvbWJpbmVPYmosXHJcbiAgICAgICAgICAgIGNvbWJpbmVkOiBjb21iaW5lZFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcy8nICsgY2lkICsgJy9zdGF0dXMvc3BvdCcpLnNldCgxKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXV0b0NvbWJpbmU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9hdXRvQ29tYmluZS5qcyIsInZhciBTZWNvbmRfY29tYmluZSA9IHtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWNvbmRfY29tYmluZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L3Nlb25kX2NvbWJpbmUuanMiLCJpbXBvcnQgQ29uZmlnIGZyb20gXCIuL2NvbmZpZy5qc1wiO1xyXG5cclxudmFyIFRoaXJkX2ZpbmFsaXplID0ge1xyXG4gICAgdGVtcDpmYWxzZSxcclxuICAgIHNwb3RPYmo6e30sXHJcblxyXG4gICAgcmVtb3ZlX3Nwb3Q6IGZ1bmN0aW9uKHNpZCl7XHJcbiAgICAgICAgbGV0IGNpZCA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICBsZXQgc3BvdE5hbWUgPSAkKFwiI1wiK3NpZCkuY2hpbGRyZW4oXCIucmVzdWx0X25hbWVfa29cIikudmFsKCk7XHJcbiAgICAgICAgaWYoY29uZmlybShgJHtzcG90TmFtZX0g6rSA6rSR7KeA66W8IOygnOqxsO2VqeuLiOuLpC4g7ZmV7Iuk7ZWc6rCA7JqUP2ApKXtcclxuICAgICAgICAgICAgdGhpcy50ZW1wID0gdGhpcy5zcG90T2JqW3NpZF07XHJcblxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImNpdGllcy9cIitjaWQrXCIvc3BvdHMvY29tYmluZWQvXCIrc2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdG9hc3QoXCLqtIDqtJHsp4DqsIAg7KCc6rGw65CY7JeI7Iq164uI64ukLlwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZWRvX3JlbW92ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgY2lkID0gJChcIi5jaXR5TmFtZVwiKS5hdHRyKFwiY2lkXCIpO1xyXG4gICAgICAgIGxldCBzaWQgPSB0aGlzLnRlbXAuc2lkO1xyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpZCtcIi9zcG90cy9jb21iaW5lZC9cIitzaWQpLnNldCh0aGlzLnRlbXApO1xyXG4gICAgICAgICQoXCIucmVkb19yZW1vdmVcIikucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGVtcCA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgbGV0IGNpZCA9ICQoXCIuY2l0eU5hbWVcIikuYXR0cihcImNpZFwiKTtcclxuICAgICAgICAkKFwiLmhlYWRlclwiKS5hcHBlbmQoJzxwIGNsYXNzPVwicmV0dXJuXCI+64+M7JWE6rCA6riwPC9wPicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMudGVtcCl7XHJcbiAgICAgICAgICAgICQoXCIuaGVhZGVyXCIpLmFwcGVuZCgnPHAgY2xhc3M9XCJyZWRvX3JlbW92ZVwiPuuniOyngOuniSDsoJzqsbAg7Leo7IaMPC9wPicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNwb3RPYmogPSBkYXRhLnNwb3RzLmNvbWJpbmVkO1xyXG4gICAgICAgIHRoaXMuc3BvdE9iaiA9IHNwb3RPYmo7XHJcbiAgICAgICAgbGV0IHJhbmtBcnIgPSBbXTtcclxuICAgICAgICBsZXQgc3BvdFRvdGFsID0gT2JqZWN0LmtleXMoc3BvdE9iaikubGVuZ3RoO1xyXG4gICAgICAgIGxldCB0eHQgPSAnJztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgc2lkIGluIHNwb3RPYmopIHtcclxuICAgICAgICAgICAgbGV0IHNwb3QgPSBzcG90T2JqW3NpZF07XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5kaXZpZHVhbEFyciA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgc2l0ZSBpbiBzcG90LnJhbmspIHtcclxuICAgICAgICAgICAgICAgIGxldCByYW5rID0gc3BvdC5yYW5rW3NpdGVdO1xyXG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEFyci5wdXNoKHJhbmspO1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgLT0gcmFuaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5kaXZpZHVhbEFyci5zb3J0KChhLCBiKSA9PiBhIC0gYik7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWluUmFuayA9IGluZGl2aWR1YWxBcnJbMF07XHJcbiAgICAgICAgICAgIHNjb3JlICs9IChzcG90VG90YWwgKyAxMDAgLSBtaW5SYW5rKSpNYXRoLnNxcnQoTWF0aC5zcXJ0KHNwb3RUb3RhbCkpO1xyXG4gICAgICAgICAgICBzY29yZSAtPSBtaW5SYW5rO1xyXG5cclxuICAgICAgICAgICAgaWYoaW5kaXZpZHVhbEFyci5sZW5ndGggPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgLT0gc3BvdFRvdGFsLzI7XHJcbiAgICAgICAgICAgICAgICBzY29yZSAtPSBtaW5SYW5rO1xyXG4gICAgICAgICAgICAgICAgaWYoc3BvdC5yYW5rLm52KXtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZSArPSA1MDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYoaW5kaXZpZHVhbEFyci5sZW5ndGggPT09IDMpe1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gKHNwb3RUb3RhbCAtIG1pblJhbmspO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihpbmRpdmlkdWFsQXJyLmxlbmd0aCA9PT0gNCl7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSBzcG90VG90YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJhbmtBcnIucHVzaCh7c2lkOnNpZCwgc2NvcmU6c2NvcmV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhbmtBcnIuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmtBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNpZCA9IHJhbmtBcnJbaV0uc2lkO1xyXG4gICAgICAgICAgICBsZXQgc3BvdCA9IHNwb3RPYmpbc2lkXTtcclxuICAgICAgICAgICAgbGV0IHVybCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmKHNwb3QudXJsKXtcclxuICAgICAgICAgICAgICAgIHVybCA9IHNwb3QudXJsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByYW5raW5nID0ge1xyXG4gICAgICAgICAgICAgICAgZ2c6XCJcIixcclxuICAgICAgICAgICAgICAgIG52OlwiXCIsXHJcbiAgICAgICAgICAgICAgICBscDpcIlwiLFxyXG4gICAgICAgICAgICAgICAgdGE6XCJcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzaXRlIGluIHNwb3QucmFuaykge1xyXG4gICAgICAgICAgICAgICAgcmFua2luZ1tzaXRlXSA9IHNwb3QucmFua1tzaXRlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQrPSAnPGRpdiBjbGFzcz1cInJlc3VsdF9ib3hcIiBpZD1cIicrc2lkKydcIj48cCBjbGFzcz1cInJlc3VsdF9yYW5rXCI+JysoaSsxKSsnPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICc8aW5wdXQgY2xhc3M9XCJyZXN1bHRfbmFtZV9rb1wiIHZhbHVlPVwiJytzcG90Lm5hbWUua28rJ1wiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICc8aW5wdXQgY2xhc3M9XCJyZXN1bHRfbmFtZV9lblwiIHZhbHVlPVwiJytzcG90Lm5hbWUuZW4rJ1wiPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICc8aW5wdXQgY2xhc3M9XCJyZXN1bHRfdXJsXCIgdmFsdWU9XCInK3VybCsnXCI+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X2dnXCI+JytyYW5raW5nLmdnKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X252XCI+JytyYW5raW5nLm52Kyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X2xwXCI+JytyYW5raW5nLmxwKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X3RhXCI+JytyYW5raW5nLnRhKyc8L3A+JztcclxuICAgICAgICAgICAgdHh0Kz0gJzxwIGNsYXNzPVwicmVzdWx0X3NhdmUgc2F2ZV9zcG90XCI+7KCA7J6lPC9wPic7XHJcbiAgICAgICAgICAgIHR4dCs9ICc8cCBjbGFzcz1cInJlc3VsdF9yZW1vdmUgcmVtb3ZlX3Nwb3RcIj7sgq3soJw8L3A+PC9kaXY+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIucGFnZXMuc3BvdCAud3JhcHBlclwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgICAgIGxldCBwdXNoQXJyID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYW5rQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHB1c2hBcnIucHVzaChzcG90T2JqW3JhbmtBcnJbaV0uc2lkXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL1wiK2NpZCtcIi9zcG90cy9yYW5rZWRcIikuc2V0KHB1c2hBcnIpO1xyXG5cclxuICAgfVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBUaGlyZF9maW5hbGl6ZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zcG90L3RoaXJkX2ZpbmFsaXplLmpzIiwidmFyIENvbmZpZyA9IHtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvc3BvdC9jb25maWcuanMiLCJsZXQgQWNjb3VudCA9IHtcclxuICAgIHVzZXI6IHt9LFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0eHQgPSAnJztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgaWQ9XCJhY2NvdW50Q2FsZW5kYXJcIiBjbGFzcz1cImFjY291bnRfX2NhbGVuZGFyXCI+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgICQoXCIuYWNjb3VudFwiKS5odG1sKHR4dCk7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgdWlkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1aWQgIT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyW3VpZF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGRhdGFbdWlkXS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKCcjYWNjb3VudENhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNTY0LFxyXG4gICAgICAgICAgICAgICAgZmlyc3REYXk6IDEsXHJcbiAgICAgICAgICAgICAgICB2aWV3UmVuZGVyOiBmdW5jdGlvbiAodmlldywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mbGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF5Q2xpY2s6IGZ1bmN0aW9uIChkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluZmxhdGUoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9hY2NvdW50LmpzIiwibGV0IFN1YndheSA9IHtcclxuICAgIG1hcDp7fSxcclxuICAgIG1hcmtlcjpmYWxzZSxcclxuICAgIG1ldHJvOltdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieWxvXCIpXHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwiY2l0aWVzL255Yy9tZXRyb1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQubWV0cm8gPSBzbmFwLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJ3YXlNYXAnKSwge1xyXG4gICAgICAgICAgICAgICAgY2VudGVyOiB7IGxhdDogNDAuNzQ4NDQsIGxuZzogLTczLjk4NTY2IH0sXHJcbiAgICAgICAgICAgICAgICB6b29tOiAxMyxcclxuICAgICAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNjYWxlQ29udHJvbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW5Db250cm9sOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWFwLmFkZExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kU3Vid2F5KGUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGZpbmRTdWJ3YXk6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGxldCBjb29yID0ge1xyXG4gICAgICAgICAgICBsYXQ6ZS5sYXRMbmcubGF0KCksXHJcbiAgICAgICAgICAgIGxuZzplLmxhdExuZy5sbmcoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5tYXJrZXIpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtlci5zZXRNYXAobnVsbClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBlLmxhdExuZyxcclxuICAgICAgICAgICAgbWFwOiB0aGlzLm1hcFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdHh0ID0gJydcclxuICAgICAgICBsZXQgbWV0cm9JbmZvID0ge31cclxuICAgICAgICBsZXQgbWV0cm9CeVN0biA9IHt9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ3MzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRyb05hbWUgPSB0aGlzLm1ldHJvW2ldLm5hbWU7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGlmID0gTWF0aC5yb3VuZChjYWxjdWxhdGVEaWYoY29vcix0aGlzLm1ldHJvW2ldLmNvb3IpKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGRpZjw3MDApe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLm1ldHJvW2ldLmxpbmUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IHRoaXMubWV0cm9baV0ubGluZVtrXS5zbGljZSgwLDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihtZXRyb0luZm9bbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkaWY8bWV0cm9JbmZvW2xpbmVdLmRpZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRyb0luZm9bbGluZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbWV0cm9OYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0cm9JbmZvW2xpbmVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRyb05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihtZXRyb0J5U3RuW21ldHJvTmFtZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldHJvQnlTdG5bbWV0cm9OYW1lXS5saW5lID0gbWV0cm9CeVN0blttZXRyb05hbWVdLmxpbmUuY29uY2F0KHRoaXMubWV0cm9baV0ubGluZSlcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldHJvQnlTdG5bbWV0cm9OYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlmOiBkaWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMubWV0cm9baV0ubGluZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1ldEFycmF5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgbGluZSBpbiBtZXRyb0luZm8pIHtcclxuICAgICAgICAgICAgbWV0QXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBsaW5lOmxpbmUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOm1ldHJvSW5mb1tsaW5lXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgZGlmOm1ldHJvSW5mb1tsaW5lXS5kaWZcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWV0U3RuQXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBuYW1lIGluIG1ldHJvQnlTdG4pIHtcclxuICAgICAgICAgICAgbWV0U3RuQXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBsaW5lOm1ldHJvQnlTdG5bbmFtZV0ubGluZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6bmFtZSxcclxuICAgICAgICAgICAgICAgIGRpZjptZXRyb0J5U3RuW25hbWVdLmRpZlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldEFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmRpZiA+IGIuZGlmID8gMSA6IGEuZGlmIDwgYi5kaWYgPyAtMSA6IDA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBtZXRTdG5BcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5kaWYgPiBiLmRpZiA/IDEgOiBhLmRpZiA8IGIuZGlmID8gLTEgOiAwO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHR4dCs9JzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX190aXRsZVwiPuyXreuzhDwvcD4nXHJcbiAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fZGl2XCI+J1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0U3RuQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHh0Kz0nPGRpdiBjbGFzcz1cInN1YndheV9faW5mb19fbGluZVwiPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2J5U3RuX19zdG5OYW1lXCI+JysgbWV0U3RuQXJyYXlbaV0ubmFtZSArICfsl608L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fYnlTdG5fX2RpZlwiPicrIE1hdGguY2VpbChtZXRTdG5BcnJheVtpXS5kaWYvODApICsgJ+u2hCDqsbDrpqw8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fbGluZUxpbmVcIj4nXHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbWV0U3RuQXJyYXlbaV0ubGluZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgaWYobWV0U3RuQXJyYXlbaV0ubGluZVtrXS5sZW5ndGggPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCs9ICAgJzxwIGNsYXNzPVwic3Vid2F5X19pbmZvX19ieVN0bl9fbGluZU5hbWUgbG5fJyttZXRTdG5BcnJheVtpXS5saW5lW2tdKydcIj4nK21ldFN0bkFycmF5W2ldLmxpbmVba10gKyAnPC9wPidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eHQrPSAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCs9JzwvZGl2PidcclxuXHJcbiAgICAgICAgdHh0Kz0nPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX3RpdGxlXCI+64W47ISg67OEPC9wPidcclxuICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19kaXZcIj4nXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0eHQrPSc8ZGl2IGNsYXNzPVwic3Vid2F5X19pbmZvX19saW5lXCI+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fbGluZU5hbWUgbG5fJyttZXRBcnJheVtpXS5saW5lKydcIj4nK21ldEFycmF5W2ldLmxpbmUgKyAnPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0gICAnPHAgY2xhc3M9XCJzdWJ3YXlfX2luZm9fX2RpZlwiPicrIE1hdGguY2VpbChtZXRBcnJheVtpXS5kaWYvODApICsgJ+u2hCDqsbDrpqw8L3A+J1xyXG4gICAgICAgICAgICB0eHQrPSAgICc8cCBjbGFzcz1cInN1YndheV9faW5mb19fc3RuTmFtZVwiPicrIG1ldEFycmF5W2ldLm5hbWUgKyAn7JetPC9wPidcclxuICAgICAgICAgICAgdHh0Kz0nPC9kaXY+J1xyXG4gICAgICAgIH1cclxuICAgICAgICB0eHQrPSc8L2Rpdj4nXHJcblxyXG4gICAgICAgICQoXCIuc3Vid2F5X19pbmZvXCIpLmh0bWwodHh0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3Vid2F5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9zdWJ3YXkuanMiLCJpbXBvcnQgU2V0SG90ZWxJbmZvIGZyb20gXCIuL2hvdGVsL3NldEhvdGVsSW5mb1wiO1xyXG5pbXBvcnQgU2V0QXJlYSBmcm9tIFwiLi9ob3RlbC9zZXRIb3RlbEluZm8vc2V0QXJlYVwiO1xyXG5cclxudmFyIEhvdGVsID0ge1xyXG5cclxuXHJcbiAgICAvL2luZmxhdGXtlZjrqbQg7Zi47YWU7J2EIOunjOuTpOyWtOuCtOq4sCDsnITtlZwg7KCV67O0IOyImOynkSDsg4Htg5zqsIAg7ZGc7Iuc65CoIC0+IFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignc2V0dGluZy9jaXRpZXMnKS5vbihcInZhbHVlXCIsIHNuYXAgPT57XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gc25hcC52YWwoKTtcclxuICAgICAgICAgICAgdGhpcy5pbmZsYXRlX3N0YXR1cyhkYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5ob3RlbFwiKS5vbihcImNsaWNrXCIsIFwiLnN0YXR1c19fbWFrZV9faG90ZWxcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY2lkID0gJCh0aGlzKS5hdHRyKCdjaWQnKTtcclxuICAgICAgICAgICAgdmFyIGNpdHlOYW1lID0gJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignLnN0YXR1c19fY2l0eScpLmh0bWwoKTtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NpdHkoY2lkLCBjaXR5TmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi5ob3RlbFwiKS5vbihcImNsaWNrXCIsIFwiLmhvdGVsX19hbGVydF9fY29uZmlybVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoXCIuaG90ZWxfX2FsZXJ0X193cmFwXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmhvdGVsXCIpLm9uKFwiY2xpY2tcIiwgXCIuY2l0eUFyZWFfX2ZpbmlzaFwiLCBmdW5jdGlvbiAoKSB7ICAvL3NldEFyZWHrpbwg64Gd64K865WMXHJcbiAgICAgICAgICAgIHZhciBjaWQgPSAkKHRoaXMpLmF0dHIoJ2NpZCcpO1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycrY2lkKycvaG90ZWxzJykub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaGlkIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZighZGF0YVtoaWRdLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2hpZF0uYXJlYSA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZGF0YVtoaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycrY2lkKycvaG90ZWxzJykuc2V0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdzZXR0aW5nL2NpdGllcy8nICsgY2lkICsgJy9zdGF0dXMvYXJlYScpLnNldCgyKTtcclxuICAgICAgICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignY2l0aWVzLycgKyBjaWQgKyAnL3N0YXR1cy9hcmVhJykuc2V0KHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVfY2l0eTogZnVuY3Rpb24oY2lkLCBjaXR5TmFtZSl7XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJytjaWQpLm9uY2UoJ3ZhbHVlJywgc25hcCA9PntcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICB2YXIgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgYWxlcnRNb2RhbCA9ICcnO1xyXG4gICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8ZGl2IGNsYXNzPVwiaG90ZWxfX2FsZXJ0X193cmFwXCI+JztcclxuICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAgICAgJzxkaXYgY2xhc3M9XCJob3RlbF9fYWxlcnRcIj4nO1xyXG5cclxuICAgICAgICAgICAgaWYoIWRhdGEpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+6rSA6rSR7KeAIOygleuztOqwgCDslYTsp4Eg7KCV66as65CY7KeAIOyViuyVmOyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuuMgOykkeq1kO2GtSDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgYWxlcnRNb2RhbCArPSAnPHA+7Y647J2Y7Iuc7ISkIOygleuztOqwgCDsl4bsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7sp4Dsl63qtazrtoQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5zcG90cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLnNwb3RzLnJhbmtlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7qtIDqtJHsp4Ag7KCV67O06rCAIOyVhOyngSDsoJXrpqzrkJjsp4Ag7JWK7JWY7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuq0gOq0keyngCDsoJXrs7TqsIAg7JWE7KeBIOygleumrOuQmOyngCDslYrslZjsirXri4jri6QuPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEubG9jYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7tjrjsnZjsi5zshKQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLmxvY2FsLm1ldHJvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuuMgOykkeq1kO2GtSDsoJXrs7TqsIAg7JeG7Iq164uI64ukLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKCFkYXRhLm1ldHJvTGluZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzxwPuuMgOykkeq1kO2GtSDsoJXrs7TqsIAg7KCV66as65CY7KeAIOyViuyVmOyKteuLiOuLpChtZXRyb0xpbmUg7JeG7J2MKS48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLmFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8cD7sp4Dsl63qtazrtoQg7KCV67O06rCAIOyXhuyKteuLiOuLpC48L3A+JztcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYgKCFkYXRhLnN0YXR1cy5hcmVhKXtcclxuICAgICAgICAgICAgICAgICAgICBTZXRBcmVhLmluZmxhdGUoY2l0eU5hbWUsIGNpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdCgn7KeA7JetIOyEpOygleydhCDrqLzsoIAg7KeE7ZaJ7ZWp64uI64ukJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhbGVydE1vZGFsICs9ICc8ZGl2IGNsYXNzPVwiaG90ZWxfX2FsZXJ0X19jb25maXJtXCI+7ZmV7J24PC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIGFsZXJ0TW9kYWwgKz0gJzwvZGl2PjwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICBpZihjaGVjayl7XHJcbiAgICAgICAgICAgICAgICBTZXRIb3RlbEluZm8uaW5pdChkYXRhLCBjaWQsIGNpdHlOYW1lKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmhvdGVsXCIpLmFwcGVuZChhbGVydE1vZGFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX3N0YXR1czogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG4gICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxoMj7siJnshowg66as7Iqk7Yq4PC9oMj4nO1xyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+JztcclxuXHJcbiAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwic3RhdHVzX19saW5lclwiPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19uYW1lXCI+64+E7Iuc66qFPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19tYWtlXCI+7IiZ7IaMIOuNsOydtO2EsDwvcD4nO1xyXG4gICAgICAgIHR4dCArPSAgICAgICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj7quLDrs7gg7Zi47YWU642w7J207YSwPC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19hcmVhXCI+7KeA7Jet7KCV67O0PC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX19zcG90XCI+6rSA6rSR7KeA7KCV67O0PC9wPic7XHJcbiAgICAgICAgdHh0ICs9ICAgICAgJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj7rjIDspJHqtZDthrXsoJXrs7Q8L3A+JztcclxuICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjaXR5ID0gZGF0YVtjaWRdO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gY2l0eS5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzxkaXYgY2xhc3M9XCJzdGF0dXNfX2xpbmVyXCI+JztcclxuICAgICAgICAgICAgICAgIHR4dCArPSAgICAgICc8cCBjbGFzcz1cInN0YXR1c19fY2l0eVwiPicrY2l0eS5uYW1lKyc8L3A+JztcclxuXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXMuaG90ZWwgPT09IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX21ha2VcIj7snojsnYw8L3A+JztcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19tYWtlIHN0YXR1c19fbWFrZV9faG90ZWxcIiAgY2lkPVwiJyArIGNpdHkuY29kZSArICdcIj7sl4bsnYwgKO2BtOumre2VtCDrp4zrk6TquLApPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoc3RhdHVzLmhvdGVsPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2hvdGVsXCI+TzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19faG90ZWxcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoc3RhdHVzLmFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHAgY2xhc3M9XCJzdGF0dXNfX2FyZWFcIj5PPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19hcmVhXCI+WDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMuc3BvdCA+IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19zcG90XCI+TzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX19zcG90XCI+WDwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMudHJhbnNwb3J0ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9ICc8cCBjbGFzcz1cInN0YXR1c19fdHJhbnNwb3J0XCI+TzwvcD4nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwic3RhdHVzX190cmFuc3BvcnRcIj5YPC9wPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5wYWdlcy5ob3RlbFwiKS5odG1sKHR4dCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb3RlbDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC5qcyIsImltcG9ydCBTZXRBVE0gZnJvbSBcIi4vc2V0SG90ZWxJbmZvL3NldEFUTS5qc1wiO1xyXG5pbXBvcnQgU2V0Rm9vZCBmcm9tIFwiLi9zZXRIb3RlbEluZm8vc2V0Rm9vZC5qc1wiO1xyXG5pbXBvcnQgU2V0TWV0cm8gZnJvbSBcIi4vc2V0SG90ZWxJbmZvL3NldE1ldHJvLmpzXCI7XHJcbmltcG9ydCBTZXRTYWZldHkgZnJvbSBcIi4vc2V0SG90ZWxJbmZvL3NldFNhZmV0eS5qc1wiO1xyXG5cclxuXHJcbnZhciBTZXRIb3RlbEluZm8gPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaWQsIGNpdHlOYW1lKXtcclxuICAgICAgICAvL3N0YXR1c0NoZWNrIOynhO2WiVxyXG4gICAgICAgIHZhciBjaGVja1R4dCA9ICcnO1xyXG5cclxuICAgICAgICB2YXIgaG90ZWwgPSBkYXRhLmhvdGVsc1tPYmplY3Qua2V5cyhkYXRhLmhvdGVscylbMF1dO1xyXG5cclxuICAgICAgICB2YXIgc3RhdHVzID0ge1xyXG4gICAgICAgICAgICBsb2NhbDoge1xyXG4gICAgICAgICAgICAgICAgYXRtOiB7IC8vMDog642w7J207YSwIOyXhuydjCwgMTog66eM65OkIOyImCDsnojsnYwsIDI6IOyhtOyerO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2E6MCxcclxuICAgICAgICAgICAgICAgICAgICBjaXRpOjBcclxuICAgICAgICAgICAgICAgIH0sICBcclxuICAgICAgICAgICAgICAgIGZvb2Q6IDAsXHJcbiAgICAgICAgICAgICAgICBtZXRybzogMCxcclxuICAgICAgICAgICAgICAgIHNwb3Q6MFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYXNzZXNzbWVudDoge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0OjAsXHJcbiAgICAgICAgICAgICAgICBzYWZldHk6MCxcclxuICAgICAgICAgICAgICAgIHRoZW1lOjAsXHJcbiAgICAgICAgICAgICAgICBjb252ZW5pZW5jZTowXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoaG90ZWwubG9jYWwpIHtcclxuICAgICAgICAgICAgaWYgKGhvdGVsLmxvY2FsLmF0bSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaG90ZWwubG9jYWwuYXRtKSkgeyAvL1ZJU0EgQVRN7J20IOygleumrOuQmOyngCDslYrsnYAg7ZiV7YOc66GcIOuTpOyWtOqwgOyeiOuKlCDsg4Htg5xcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLnZpc2EgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy9hdG3qsJ3ssrTrpbwg6rCA7KeA6rOgIOyeiOuKlCDsg4Htg5wgLSDrsJjrk5zsi5wgdmlzYSBhdG3snbQg65Ok7Ja06rCAIOyeiOyWtOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuYXRtLnZpc2EgPSAyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwuYXRtLmNpdGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS5jaXRpID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubG9jYWwuYXRtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v7KSR7JqUOiBDSVRJ7J6R7JeF7J2AIFZJU0HsnpHsl4Ug7ZuE7JeQIOydtOujqOyWtOyguOyVvCDtlahcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vbG9jYWzsl5AgYXRt7J20IOyXhuydjCAtPiDruYTsnpAg7LaU7Lac65CcIOyggeydtCDsl4bsnYxcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubG9jYWwuYXRtKSB7IC8v6re4IOqyveyasOyXkOuPhCBDSVRJ64qUIFJBV+uNsOydtO2EsOuhnCDsobTsnqztlaAg7IiYIOyeiOydjFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/spJHsmpQ6IENJVEnsnpHsl4XsnYAgVklTQeyekeyXhSDtm4Tsl5Ag7J2066Oo7Ja07KC47JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubG9jYWwuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmZvb2QgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwubWV0cm8pIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5tZXRybyA9IDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZXRyb0xpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaG90ZWwubG9jYWwuc3BvdCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc3BvdHMucmFua2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLnNwb3QgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhdHVzLmxvY2FsLmF0bS52aXNhID0gMDsgLy9WSVNB64qUIOustOyhsOqxtCDtmLjthZQg66Gc7Lus7JeQIOyngeygkSDrk6TslrTqsIDrr4DroZwg7Zi47YWUIOuhnOy7rCDqsr3roZzqsIAg7JeG64uk64qUIOqyg+ydgCBWSVNB6rCAIOyXhuuLpOuKlCDqsoMuXHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5sb2NhbC5hdG0pIHsgLy9jaXRp64KYIHZpc2HripQg7Zi47YWUIOuhnOy7rOydtCDslYTri4wg64+E7IucIOuhnOy7rOyXkCDsoIDsnqXrkKAg7IiYIOyeiOydjC5cclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cy5sb2NhbC5mb29kID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubWV0cm9MaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwubWV0cm8gPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLmxvY2FsLm1ldHJvID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuc3BvdHMucmFua2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMubG9jYWwuc3BvdCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoZWNrVHh0ICs9ICc8aDIgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190aXRsZVwiPu2YuO2FlCDso7zrs4DsoJXrs7Q8L2gyPic7XHJcblxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLmF0bS52aXNhID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIFZJU0EgQVRN7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9PT0gMSkge1xyXG4gICAgICAgICAgICBTZXRBVE0uaW5pdChkYXRhLCBjaWQpO1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcgVklTQSBBVE3soJXrs7Qg7ZmV7J24LiDtmLjthZTrs4TroZwg6rCA7J6lIOqwgOq5jOyatCBBVE3qs7wgMjTsi5zqsIQgQVRN7J2EIOy2lOy2nO2VqeuLiOuLpC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5hdG0udmlzYSA9PT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHQgY29sb3ItLXJlZFwiPk5vIERhdGEgLSBWSVNBIEFUTeygleuztOqwgCDsl4bsirXri4jri6QuIFZJU0EgQVRNIGxvY2F0b3Lsl5DshJwg7KCV67O066W8IOuovOyggCDtgazroaTrp4HtlbTso7zshLjsmpQuPC9wPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLmF0bS5jaXRpID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk9LIC0g7KCV66as65CcIENJVEkgQVRN7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5hdG0uY2l0aSA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5NYWtpbmcgLSBSQVcgQ0lUSSBBVE3soJXrs7Qg7ZmV7J24LiDqsIDsnqUg6rCA6rmM7Jq0IENJVEkgQVRN7J2EIOy2lOy2nO2VqeuLiOuLpC48L3A+JztcclxuICAgICAgICB9IC8vIGNpdGkgc3RhdHVzIDDsnYAg7JeG7J2MLlxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzLmxvY2FsLmZvb2QgPT09IDIpIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0XCI+T0sgLSDsoJXrpqzrkJwg7Iud66OM7ZKI7KCQL+2OuOydmOygkCDsoJXrs7Qg7ZmV7J24LjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLmZvb2QgPT09IDEpIHtcclxuICAgICAgICAgICAgU2V0Rm9vZC5pbml0KGRhdGEsIGNpZCk7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk1ha2luZyAtIFJBVyDsi53ro4ztkojsoJAv7Y647J2Y7KCQIOygleuztCDtmZXsnbguIO2YuO2FlOuzhOuhnCDqsIDquYzsmrQg7Iud66OM7ZKI7KCQIOy2lOy2nC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5mb29kID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dCBjb2xvci0tcmVkXCI+Tm8gRGF0YSAtIOuPhOyLnCDsi53ro4ztkojsoJAv7Y647J2Y7KCQIOygleuztOqwgCDsl4bsirXri4jri6QuIOuovOyggCDsoJXrs7Trpbwg7J6F66Cl7ZW07KO87IS47JqULjwvcD4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cy5sb2NhbC5tZXRybyA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCDsp4DtlZjssqAv64yA7KSR6rWQ7Ya1IOygleuztCDtmZXsnbguPC9wPic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMubG9jYWwubWV0cm8gPT09IDEpIHtcclxuICAgICAgICAgICAgU2V0TWV0cm8uaW5pdChkYXRhLCBjaXR5TmFtZSk7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk1ha2luZyAtIFJBVyDsp4DtlZjssqAv64yA7KSR6rWQ7Ya1IOygleuztCDtmZXsnbguIO2YuO2FlOuzhOuhnCDqsIDquYzsmrQg7KeA7ZWY7LKgIOy2lOy2nC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5tZXRybyA9PT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHQgY29sb3ItLXJlZFwiPk5vIERhdGEgLSDrj4Tsi5wg7KeA7ZWY7LKgL+uMgOykkeq1kO2GtSDsoJXrs7TqsIAg7JeG7Iq164uI64ukLiDrqLzsoIAg7KCV67O066W8IOyeheugpe2VtOyjvOyEuOyalC48L3A+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMubG9jYWwuc3BvdCA9PT0gMikge1xyXG4gICAgICAgICAgICBjaGVja1R4dCArPSAnPHAgY2xhc3M9XCJob3RlbF9fc3RhdHVzX190eHRcIj5PSyAtIOygleumrOuQnCDqtIDqtJHsp4Ag7KCV67O0IO2ZleyduC48L3A+JztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cy5sb2NhbC5zcG90ID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHh0ICs9ICc8cCBjbGFzcz1cImhvdGVsX19zdGF0dXNfX3R4dFwiPk1ha2luZyAtIFJBVyDqtIDqtJHsp4Ag7KCV67O0IO2ZleyduC4g7Zi47YWU67OE66GcIOqwgOq5jOyatCDqtIDqtJHsp4Ag7LaU7LacLjwvcD4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzLmxvY2FsLnNwb3QgPT09IDApIHtcclxuICAgICAgICAgICAgY2hlY2tUeHQgKz0gJzxwIGNsYXNzPVwiaG90ZWxfX3N0YXR1c19fdHh0IGNvbG9yLS1yZWRcIj5ObyBEYXRhIC0g64+E7IucIOq0gOq0keyngCDsiJzsnITqsIAg7JWE7KeBIO2ZleygleuQmOyngCDslYrslZjsirXri4jri6QuIOuovOyggCDtmZXsnbjtlbTso7zshLjsmpQuPC9wPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBTZXRTYWZldHkuaW5pdChkYXRhLCBjaXR5TmFtZSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGNoZWNrVHh0KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldEhvdGVsSW5mbztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8uanMiLCJpbXBvcnQgQ29uZmlnIGZyb20gXCIuLi9jb25maWcuanNcIjtcclxuXHJcbnZhciBTZXRBVE0gPSB7XHJcbiAgICBzdGF0aXN0aWM6IHtcclxuICAgICAgICBuZWFyZXN0OltdLCAvL+qwgOyepSDqsIDquYzsmrQgQVRN7J2AIOuqhyBtIOqxsOumrOyXkCDsnojripTsp4Ag64+E7IucIOyghOyytCDtj4nqt6DsnYQg64K06riwIOychO2VnCDrjbDsnbTthLBcclxuICAgICAgICBiYW5rMjQ6W10sICAgLy8yNOyLnOqwhCDsmrTsmIHtlZjripQg7J2A7ZaJIOyGjOycoCDqsbDrpqzsl5Ag7J6I64qU7KeAIOuPhOyLnCDsoITssrQg7Y+J6reg7J2EIOuCtOq4sCDsnITtlZwg642w7J207YSwXHJcbiAgICAgICAgaW4xMzA6W10gLy/rsJjqsr0gMTMwbSDrgrTsl5AgQVRN7J20IOuqhyDqsJwg7J6I64qU7KeAIOuPhOyLnCDsoITssrQg7Y+J6reg7J2EIOuCtOq4sCDsnITtlZwg642w7J207YSwXHJcbiAgICB9LFxyXG4gICAgYnlBcmVhOiB7fSwgLy9pbjEzMCBzdGF07J2EIOyngOyXreuzhOuhnCDtj4nqt6DrgrTquLAg7JyE7ZWcIOqwneyytFxyXG5cclxuICAgIGRhdGE6e30sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKGRhdGEsIGNpZCkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3RfYnlIb3RlbHMoKTsgLy/tmLjthZTrk6TsnYQg64+M66mwIOqwgOyepSDqsIDquYzsmrQgQVRNLCDsnYDtlonshozsnKAgMjTsi5zqsIQgQVRNLCAxMzBt7JWI7JeQIOuqhyDqsJwgQVRNIOyeiOuKlOyngOulvCDssL7slYTrgrTqs6Ag7Ya16rOE7JeQ64+EIOq4sOuhnVxyXG4gICAgICAgIHRoaXMuc2Vjb25kX2J5QXJlYXMoKTsgLy/sp4Dsl63rs4TroZwgMTMwbSDrgrTsl5Ag7J6I64qUIEFUTSDqsK/siJgg7Y+J6reg7J2EIOuDhCAtPiDsp4Dsl60g7IOB7JeFIOuwnOyghOuPhOulvCDrgpjspJHsl5Ag7LK07YGs7ZWY6riwIOychO2VtCDrp4zrk6Tsl4jsnYwuXHJcbiAgICAgICAgdGhpcy50aGlyZF9tYWtlU3RhdHMoKTsgLy9maXJzdOyXkOyEnCDquLDroZ3tlZwg7Ya16rOEIOuCtOyaqeydhCDqsIDsp4Dqs6Ag7Ya16rOE6rCS65Ok7J2EIOyCsOy2nO2VtOuDhC5cclxuICAgICAgICB0aGlzLmZvdXJ0aF9tYWtlUmFuaygpOyAvL+2GteqzhOyXkCDquLDroZ3rkJwg6rCS7J2EIOuwlO2DleycvOuhnCDtmLjthZTrs4QgYXRt7Y647J2Y7ISxIOuere2CueydhCDqs4TsgrDtlago7JiILUFUTeqwgOq5jOyatCDsoJXrj4TripQg64m07JqVIOuCtCA37JyELi4uKVxyXG4gICAgICAgIHRoaXMuZmlmdGhfbWFrZVNjb3JlKCk7XHJcbiAgICAgICAgdGhpcy5zaXh0aF93b3JkaW5nKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGZpcnN0X2J5SG90ZWxzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBob3RlbHMgPSB0aGlzLmRhdGEuaG90ZWxzO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGhpZCBpbiBob3RlbHMpIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsID0gaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGlmIChob3RlbC50ZW1wKSB7IC8vaG90ZWwudGVtcOuhnCDrsJTqv4DqsoPsnoRcclxuICAgICAgICAgICAgICAgIHZhciBhdG1BcnIgPSBob3RlbC50ZW1wLmF0bTtcclxuICAgICAgICAgICAgICAgIHZhciBhdG1PYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDogYXRtQXJyWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGluMTMwOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhbmsyNDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgYXRtT2JqLm5lYXJlc3QuZGlmID0gY2FsY3VsYXRlRGlmKGF0bUFyclswXS5jb29yLCBob3RlbC5jb29yKTsgLy/siJnshozrs4Qg6rCA7J6lIOqwgOq5jOyatCBhdG0g64u07J2MXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGF0bUFycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXRtQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdG0gPSBhdG1BcnJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaWYgPSBjYWxjdWxhdGVEaWYoYXRtLmNvb3IsIGhvdGVsLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZiA8IDEzMC4xKSB7IC8v7IiZ7IaM67OEIDEzMG3qsbDrpqwgYXRtIOqwr+yImCDssrTtgaxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bU9iai5pbjEzMCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWF0bU9iai5iYW5rMjQpIHsvL+q4sOuzuOyggeycvOuhnCDqsbDrpqzsiJwg7KCV66CsIOuQmOyWtOyeiOyWtOyEnCDsnbTrr7gg65Ok7Ja06rCA7J6I7Jy866m0IOq3uOuGiOydtCDrjZQg6rCA6rmM7Jq064aIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlmIDwgMjMwKSB7IC8v7IiZ7IaM67OEIOydgO2WiSDshozsnKAgMjTsi5zqsIQgYXRtIOuLtOydjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYXRtLm93bmVyLmluY2x1ZGVzKFwiQkFOS1wiKXx8YXRtLnBsYWNlTmFtZS5pbmNsdWRlcyhcIkJBTktcIikpICYmIGF0bS5pczI0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bU9iai5iYW5rMjQgPSBhdG07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bU9iai5iYW5rMjQuZGlmID0gZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+2GteqzhOyXkCDquLDroZ3tlZjquLBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMubmVhcmVzdC5wdXNoKGF0bU9iai5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0bU9iai5iYW5rMjQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0aXN0aWMuYmFuazI0LnB1c2goYXRtT2JqLmJhbmsyNC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLmJhbmsyNC5wdXNoKDIzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyTm8rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5hdG0gPSBhdG1PYmo7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbCA9IHthdG06IGF0bU9ian07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pbjEzMOydgCDtmLjthZTsnYQg7ZWcIOuyiCDri6Qg64+IIOuLpOydjOyXkCDthrXqs4Tsl5Ag6riw66Gd7ZWgIOyImCDsnojsnYxcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLmluMTMwLnB1c2goYXRtT2JqLmluMTMwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXSl7Ly/sp4Dsl63rs4QgYXRtIOuwgOynkeuPhOulvCDtmZXsnbjtlZjripQg6re465+wIOuFgOyEnVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnlBcmVhW2hvdGVsLmFyZWFdLnB1c2goYXRtT2JqLmluMTMwKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnlBcmVhW2hvdGVsLmFyZWFdID0gW2F0bU9iai5pbjEzMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoYFZJU0EgQVRNIOygleuztOqwgCDsl4bripQg7Zi47YWU7J20IOyeiOyKteuLiOuLpC4g7ZmV7J24IO2bhCDsnqzsi5zrj4TtlbTso7zshLjsmpRgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2Vjb25kX2J5QXJlYXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGFyZWEgPSB0aGlzLmRhdGEuYXJlYTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmVhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYoIWFyZWFbaV0ubm90QXJlYSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ5QXJlYVtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0bXMgPSB0aGlzLmJ5QXJlYVtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhdG1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bSArPSBhdG1zW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF0bXMubGVuZ3RoIDwgMTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW51cyA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhdG1zID0gKHN1bS8oYXRtcy5sZW5ndGgpICsgYXRtcy5sZW5ndGgvMTApICsgbWludXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJlYVtpXS5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwuYXRtID0gYXRtcy50b0ZpeGVkKDIpKjE7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdG06IGF0bXMudG9GaXhlZCgyKSoxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJlYVtpXS5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwuYXRtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bTogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGhpcmRfbWFrZVN0YXRzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBzdGF0ID0ge1xyXG4gICAgICAgICAgICBuZWFyZXN0OiAwLFxyXG4gICAgICAgICAgICBpbjEzMDogMCxcclxuICAgICAgICAgICAgYmFuazI0OiAwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gc3RhdCkge1xyXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLnN0YXRpc3RpY1tpZF0ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIHN1bSArPSB0aGlzLnN0YXRpc3RpY1tpZF1ba107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RhdFtpZF0gPSBzdW0vdGhpcy5zdGF0aXN0aWNbaWRdLmxlbmd0aDtcclxuICAgICAgICAgICAgc3RhdFtpZF0gPSBzdGF0W2lkXS50b0ZpeGVkKDIpKjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmRhdGEuc3RhdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5zdGF0LmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0LmxvY2FsLmF0bSA9IHN0YXQ7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnN0YXQubG9jYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXRtOiBzdGF0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0ID0ge1xyXG4gICAgICAgICAgICAgICAgbG9jYWw6e2F0bTpzdGF0fVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZm91cnRoX21ha2VSYW5rOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRpc3RpYy5uZWFyZXN0LnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuICAgICAgICB0aGlzLnN0YXRpc3RpYy5iYW5rMjQuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xyXG4gICAgICAgIHRoaXMuc3RhdGlzdGljLmluMTMwLnNvcnQoKGEsIGIpID0+IGIgLSBhKTtcclxuXHJcbiAgICAgICAgdmFyIHRvdGFsID0gT2JqZWN0LmtleXModGhpcy5kYXRhLmhvdGVscykubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIHZhciBhdG0gPSBob3RlbC5sb2NhbC5hdG07XHJcbiAgICAgICAgICAgIHZhciByYW5rID0geyAvL+q8tOyngCDrnq3tgazrpbwg67aA7Jes7ZWoIC0+IO2YueyLnCBob3RlbOyXkCDqsIEg64K07Jqp65Ok7J20IOyXhuuLpOuptCDrnq3tgazripQg6ry07LCMXHJcbiAgICAgICAgICAgICAgICBiYW5rMjQ6IHRvdGFsLFxyXG4gICAgICAgICAgICAgICAgbmVhcmVzdDogdG90YWwsXHJcbiAgICAgICAgICAgICAgICBpbjEzMDogdG90YWxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByYW5rKSB7XHJcbiAgICAgICAgICAgICAgICBpZihrZXkgPT09IFwiaW4xMzBcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXRtW2tleV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rW2tleV0gPSB0aGlzLnN0YXRpc3RpY1trZXldLmluZGV4T2YoYXRtW2tleV0pKzE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXRtW2tleV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rW2tleV0gPSB0aGlzLnN0YXRpc3RpY1trZXldLmluZGV4T2YoYXRtW2tleV0uZGlmKSsxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGhvdGVsLnJhbmspe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwucmFuay5hdG0gPSByYW5rO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLnJhbmsgPSB7YXRtOnJhbmt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmaWZ0aF9tYWtlU2NvcmU6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBzY29yZUFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgdmFyIGF0bSA9IGhvdGVsLnJhbmsuYXRtO1xyXG4gICAgICAgICAgICB2YXIgd2VpZ2h0ID0gQ29uZmlnLmF0bS5zY29yZS53ZWlnaHQ7XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IChhdG0uYmFuazI0KndlaWdodC5iYW5rMjQgKyBhdG0ubmVhcmVzdCp3ZWlnaHQubmVhcmVzdCArIGF0bS5pbjEzMCp3ZWlnaHQuaW4xMzApO1xyXG5cclxuICAgICAgICAgICAgc2NvcmVBcnJheS5wdXNoKHtzY29yZTpzY29yZSxoaWQ6aGlkfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNjb3JlQXJyYXkuc29ydCgoYSwgYikgPT4gYS5zY29yZSAtIGIuc2NvcmUpOyAvL+uCruydhOyImOuhnSDsoovsnYxcclxuXHJcblxyXG4gICAgICAgIHZhciB0b3RhbCA9IHNjb3JlQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgcmFua1N5cyA9IENvbmZpZy5hdG0uc2NvcmUucGVyY2VudGlsZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWQgPSBzY29yZUFycmF5W2ldLmhpZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgdmFyIHJhbmsgPSAoKGkrMSkgLyB0b3RhbCk7IC8vIOuwseu2hOychFxyXG4gICAgICAgICAgICB2YXIgcGVyY2VudGlsZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXNSYW5rZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmFua1N5cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzUmFua2VkKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSBwZXJjZW50aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRpbGUgKz0gcmFua1N5c1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFuazxwZXJjZW50aWxlKXsgIC8vMzUlIOyViOyXkCDrk6TrqbRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuayAtPSBtaW51czsgICAvL3JhbmvrpbwgMH4wLjLroZwg66ee7Law7KSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gKDEwLWopIC0gTWF0aC5jZWlsKChyYW5rL3JhbmtTeXNbal0pKjEwKS8xMDsgLy9yYW5rKDB+MC4yKeulvCAwLjLroZwg64KY64iI6rCSKjEwLzEwIC0+IDB+MC456rCAIOuCmOyYtFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JhbmtlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUuYXRtID0gc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlID0ge2F0bTpzY29yZX07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZTp7YXRtOnNjb3JlfSxcclxuICAgICAgICAgICAgICAgICAgICB3b3JkOnthdG06XCJcIn1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHRmYzogZnVuY3Rpb24odHlwZSwgaG90ZWwpeyAgICAvL3RleHQgZnJvbSBjb25maWdcclxuXHJcbiAgICAgICAgdmFyIHRvdGFsID0gT2JqZWN0LmtleXModGhpcy5kYXRhLmhvdGVscykubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgcmFuayA9IDA7XHJcbiAgICAgICAgaWYodHlwZSA9PT0gXCJpbnRlZ3JhdGVcIil7XHJcbiAgICAgICAgICAgIHJhbmsgPSAoaG90ZWwucmFuay5hdG0uYmFuazI0IC8gdG90YWwpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByYW5rID0gKGhvdGVsLnJhbmsuYXRtW3R5cGVdIC8gdG90YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IENvbmZpZy5hdG0ud29yZDtcclxuICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgbGV0IGluU3RkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnW3R5cGVdLnN0ZC5sZW5ndGg7IGkrKykgeyAgIC8vbuu2hCDqsbDrpqzsl5Ag7J6I64ukLlxyXG4gICAgICAgICAgICBpZighaW5TdGQpe1xyXG4gICAgICAgICAgICAgICAgaWYocmFuayA8IGNvbmZpZ1t0eXBlXS5zdGRbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSBjb25maWdbdHlwZV0ud29yZFtpXTtcclxuICAgICAgICAgICAgICAgICAgICBpblN0ZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIWluU3RkKXtcclxuICAgICAgICAgICAgdHh0ICs9IGNvbmZpZ1t0eXBlXS53b3JkW2NvbmZpZ1t0eXBlXS5zdGQubGVuZ3RoXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0eHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHNpeHRoX3dvcmRpbmc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICB2YXIgdHh0ID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBhdG0gPSBob3RlbC5sb2NhbC5hdG07XHJcblxyXG4gICAgICAgICAgICAvLyAxLiDqsIDsnqUg6rCA6rmM7Jq0IEFUTeydtCAyNOyLnOqwhCDsmIHsl4XtlZjripQgQVRN7J206rGw64KYLCDqsbDrpqwg7LCo7J206rCAIDUwbSDsnbTrgrTsnbgg6rK97JqwIC0+IDI07Iuc6rCEIEFUTSDsm4zrlKnsnLzroZwg7Ya17ZWpXHJcbiAgICAgICAgICAgIC8vIDIuIDHsnbQg7JWE64uQIOqyveyasCDqsIDsnqUg6rCA6rmM7Jq0IEFUTeydgCDrj4Trs7Qg64uoIE7rtoTqsbDrpqzsl5Ag7J6I6rOgLCAyNOyLnOqwhCDsmKTtlIggQVRN64+EIOuPhOuztOuhnCBO67aE6rGw66as7JeQIOyeiOyWtOyEnCB+XHJcbiAgICAgICAgICAgIC8vIDMuIOydgO2WieyGjOycoCAyNOyLnOqwhCBBVE3snbQg7JeG64qUIOqyveyasCAtPiDqsIDsnqUg6rCA6rmM7Jq0IEFUTeydgCDrj4Trs7QgTuu2hOqxsOumrCwg7J2A7ZaJIOyGjOycoCAyNOyLnOqwhCBBVE3snYAg7JeG7J2MXHJcblxyXG4gICAgICAgICAgICBpZihhdG0uYmFuazI0KXtcclxuICAgICAgICAgICAgICAgIGlmKGF0bS5iYW5rMjQuZGlmIDwgYXRtLm5lYXJlc3QuZGlmICsgNTApeyAvL+yLnOuCmOumrOyYpDFcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlmID0gZGlmVG9NaW4oYXRtLmJhbmsyNC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCA9IGAyNOyLnOqwhCDsmIHsl4XtlZjripQg7J2A7ZaJIOyGjOycoCBBVE3snbQgJHtkaWZ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gdGhpcy50ZmMoJ2ludGVncmF0ZScsIGhvdGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXsgLy/si5zrgpjrpqzsmKQgMlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihhdG0ubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWYyNCA9IGRpZlRvTWluKGF0bS5iYW5rMjQuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICB0eHQgKz0gYOqwgOyepSDqsIDquYzsmrQgQVRN7J2AIOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyeiOqzoCwg7J2A7ZaJ7J20IOyGjOycoO2VnCAyNOyLnOqwhCDsmKTtlIggQVRN64+EIOuPhOuztCAke2RpZjI0fWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ICs9IHRoaXMudGZjKCduZWFyZXN0JywgaG90ZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihhdG0ubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgdHh0ICs9IGDqsIDsnqUg6rCA6rmM7Jq0IEFUTeydgCDrj4Trs7QgJHtkaWZ9IOqxsOumrOyXkCDsnojsnYwuYDtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQud29yZCl7XHJcbiAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQuYXRtID0gdHh0O1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQud29yZCA9IHthdG06dHh0fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldEFUTTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9zZXRIb3RlbEluZm8vc2V0QVRNLmpzIiwiaW1wb3J0IEdlb0NvZGUgZnJvbSBcIi4uLy4uLy4uL21vZHVsZXMvZ2VvQ29kZS5qc1wiO1xyXG5pbXBvcnQgQ29uZmlnIGZyb20gXCIuLi9jb25maWcuanNcIjtcclxuXHJcbnZhciBTZXRGb29kID0ge1xyXG4gICAgZGF0YTp7fSxcclxuXHJcbiAgICBzdGF0aXN0aWM6e1xyXG4gICAgICAgIG5lYXJlc3Q6W10sXHJcbiAgICAgICAgbmVhcmJ5OltdXHJcbiAgICB9LFxyXG4gICAgYnlBcmVhOnt9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEsIGNpZCl7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICBpZih0aGlzLmZpcnN0X2dlb0NvZGUoY2lkKSl7ICAgIC8v7KeA7Jik7L2U65SpIO2VoCDqsowg7JeG7Jy866m0IHNlY29uZOu2gO2EsCDsp4TtlontlahcclxuICAgICAgICAgICAgdGhpcy5zZWNvbmRfc2V0Rm9vZCgpOyAgLy/siJnshozrs4TroZwg7Iud66OM7ZKI7KCQ65Ok7J2EIOuVjOugpOuEo+ydjFxyXG4gICAgICAgICAgICB0aGlzLnRoaXJkX2J5QXJlYXMoKTsgLy/thrXqs4TqsJLsnYQg66eM65Ok7Ja064OEXHJcbiAgICAgICAgICAgIHRoaXMuZm91cnRoX21ha2VTdGF0cygpOyAvL+2GteqzhOqwkuydhCDrp4zrk6TslrTrg4QgLSBjaWQvc3RhdC9sb2NhbC9mb29kIOudvOqzoCDrk6TslrTqsIjqsoPsnoRcclxuICAgICAgICAgICAgdGhpcy5maWZ0aF9tYWtlU2NvcmUoKTtcclxuICAgICAgICAgICAgdGhpcy5zaXh0aF93b3JkaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNpeHRoX3dvcmRpbmc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy8hdG9kbyEhISDsp4DquIjsnYAg64m07JqVIOq4sOykgOycvOuhnCDrkJjslrTsnojsnYwgLT4g64+E7Iuc67OE66GcIOuCmOuIhOq4sCjsmIgt7Y647J2Y7KCQIOyeiOuKlCDrj4Tsi5zsmqkpXHJcblxyXG4gICAgICAgIGZvciAodmFyIGhpZCBpbiB0aGlzLmRhdGEuaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgdmFyIHR4dCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwuZm9vZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvb2QgPSBob3RlbC5sb2NhbC5mb29kO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGZvb2QuZ3JvY2VyeSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZvb2QubGFyZ2UpeyAvL+uRmCDri6Qg7J6I64qUIOy8gOydtOyKpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGRpZlRvTWluKGZvb2QubGFyZ2UubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpvc2EgPSBmb29kLmxhcmdlLm5lYXJlc3Quam9zYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gZm9vZC5sYXJnZS5uZWFyZXN0Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihmb29kLmxhcmdlLm5lYXJlc3QuZGlmIDwgZm9vZC5ncm9jZXJ5Lm5lYXJlc3QuZGlmICsgNTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4dCA9IGDqsIHsooUg7Iud66OM7ZKI7J2EIOyCtCDsiJgg7J6I64qUIOuMgO2YlSDrp4jtirjsnbggJHtuYW1lfSR7am9zYX0g64+E67O0ICR7ZGlmfSDqsbDrpqzsl5Ag7J6I7J2MYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnZGlmID0gZGlmVG9NaW4oZm9vZC5ncm9jZXJ5Lm5lYXJlc3QuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSBg6rCE64uo7ZWcIOuoueqxsOumrOulvCDsgrQg7IiYIOyeiOuKlCDsi53ro4ztkojsoJDsnbQg64+E67O0ICR7Z2RpZn0g6rGw66as7JeQIOyeiOqzoCwg6rCB7KKFIOydjOyLneuTpOydhCDsgrQg7IiYIOyeiOuKlCDrjIDtmJUg66eI7Yq4ICR7bmFtZX0ke2pvc2F9IOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyeiOydjGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNleyAgLy9ncm9jZXJ566eMIOyeiOuKlCDsvIDsnbTsiqRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWYgPSBkaWZUb01pbihmb29kLmdyb2NlcnkubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHh0ID0gYOqwhOuLqO2VnCDrqLnqsbDrpqzrpbwg7IK0IOyImCDsnojripQg7Iud66OM7ZKI7KCQ7J20IOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyeiOydjGA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihmb29kLmxhcmdlKXsgLy8v7KO867OA7JeQIGdyb2NlcnnripQg7JeG64qU642wIGxhcmdl66eMIOyeiOuKlCDtirnsnbTsvIDsnbTsiqRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpZiA9IGRpZlRvTWluKGZvb2QubGFyZ2UubmVhcmVzdC5kaWYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IGZvb2QubGFyZ2UubmVhcmVzdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgam9zYSA9IGZvb2QubGFyZ2UubmVhcmVzdC5qb3NhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQgPSBg6rCB7KKFIOyLneujjO2SiOydhCDsgrQg7IiYIOyeiOuKlCDrjIDtmJUg66eI7Yq4ICR7bmFtZX0ke2pvc2F9IOuPhOuztCAke2RpZn0g6rGw66as7JeQIOyeiOydjGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0ID0gJ+yLneujjO2SiOydhCDsgrQg66eM7ZWcIOqzs+ydgCDso7zrs4AgNeu2hOqxsOumrCDsnbTrgrTsl5Ag7JeG7J2MJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0eHQgPSAn7Iud66OM7ZKI7J2EIOyCtCDrp4ztlZwg6rOz7J2AIOyjvOuzgCA167aE6rGw66asIOydtOuCtOyXkCDsl4bsnYwnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50LndvcmQpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLmZvb2QgPSB0eHQ7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkID0ge2Zvb2Q6dHh0fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlmdGhfbWFrZVNjb3JlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBzY29yZUFycmF5ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICBpZihob3RlbC5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbC5mb29kKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBraW5kIGluIGhvdGVsLmxvY2FsLmZvb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvb2QgPSBob3RlbC5sb2NhbC5mb29kW2tpbmRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmVhcmVzdERpZiA9IGZvb2QubmVhcmVzdC5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSArPSAoQ29uZmlnLmZvb2Qua2luZFtraW5kXS5zdGQgLSBuZWFyZXN0RGlmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoQ29uZmlnLmZvb2Qua2luZFtraW5kXS5tdWx0aXBsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZSA9IHNjb3JlICogQ29uZmlnLmZvb2Qua2luZFtraW5kXS5tdWx0aXBsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSArPSBmb29kLm5lYXJieSoyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzY29yZUFycmF5LnB1c2goe3Njb3JlOnNjb3JlLGhpZDpoaWR9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7IC8v64aS7J2E7IiY66GdIOyii+ydjFxyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBzY29yZUFycmF5Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgdmFyIHJhbmtTeXMgPSBDb25maWcuZm9vZC5zY29yZS5wZXJjZW50aWxlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IHNjb3JlQXJyYXlbaV0uaGlkO1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcmFuayA9ICgoaSsxKSAvIHRvdGFsKTsgLy8g67Cx67aE7JyEIC0gMH4xICjrhpLsnYTsiJjroZ0gMOyXkCDqsIDquYzsm4ApXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50aWxlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc1JhbmtlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYW5rU3lzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXNSYW5rZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IHBlcmNlbnRpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGlsZSArPSByYW5rU3lzW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihyYW5rPHBlcmNlbnRpbGUpeyAgLy8zNSUg7JWI7JeQIOuTpOuptFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rIC09IG1pbnVzOyAgIC8vcmFua+ulvCAwfjAuMuuhnCDrp57strDspIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPSAoMTAtaikgLSBNYXRoLmNlaWwoKHJhbmsvcmFua1N5c1tqXSkqMTApLzEwOyAvL3JhbmsoMH4wLjIp66W8IDAuMuuhnCDrgpjriIjqsJIqMTAvMTAgLT4gMH4wLjnqsIAg64KY7Ji0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmFua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IHRoaXMuZGF0YS5ob3RlbHNbaGlkXTtcclxuXHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYoaG90ZWwuYXNzZXNzbWVudC5zY29yZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5mb29kID0gc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlID0ge2Zvb2Q6c2NvcmV9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6e2Zvb2Q6c2NvcmV9LFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmQ6e2Zvb2Q6XCJcIn1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGZvdXJ0aF9tYWtlU3RhdHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHN0YXQgPSB7XHJcbiAgICAgICAgICAgIG5lYXJlc3Q6IDAsXHJcbiAgICAgICAgICAgIG5lYXJieTowXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gc3RhdCkge1xyXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLnN0YXRpc3RpY1tpZF0ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIHN1bSArPSB0aGlzLnN0YXRpc3RpY1tpZF1ba107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RhdFtpZF0gPSBzdW0vdGhpcy5zdGF0aXN0aWNbaWRdLmxlbmd0aDtcclxuICAgICAgICAgICAgc3RhdFtpZF0gPSBzdGF0W2lkXS50b0ZpeGVkKDIpKjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmRhdGEuc3RhdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5zdGF0LmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0LmxvY2FsLmZvb2QgPSBzdGF0O1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zdGF0LmxvY2FsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb2Q6IHN0YXRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnN0YXQgPSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbDp7Zm9vZDpzdGF0fVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdGhpcmRfYnlBcmVhczogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgYXJlYSA9IHRoaXMuZGF0YS5hcmVhO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHN1bSA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZighYXJlYVtpXS5ub3RBcmVhKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYnlBcmVhW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9vZHMgPSB0aGlzLmJ5QXJlYVtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBmb29kcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW0gKz0gZm9vZHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW51cyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZm9vZHMubGVuZ3RoIDwgMTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW51cyA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb29kcyA9IChzdW0vKGZvb2RzLmxlbmd0aCkgKyBmb29kcy5sZW5ndGgvMTApICsgbWludXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJlYVtpXS5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0ubG9jYWwuZm9vZCA9IGZvb2RzLnRvRml4ZWQoMikqMTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYVtpXS5sb2NhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb2Q6IGZvb2RzLnRvRml4ZWQoMikqMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0ubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsLmZvb2QgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhW2ldLmxvY2FsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vZDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2Vjb25kX3NldEZvb2Q6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICB2YXIgaXNTb21lRm9vZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiB0aGlzLmRhdGEubG9jYWwuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGdyb0FyciA9IHRoaXMuZGF0YS5sb2NhbC5mb29kW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZCA9IENvbmZpZy5mb29kLmtpbmRbdHlwZV0uc3RkO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvb2QgPSBncm9BcnJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihob3RlbC5jb29yLCBmb29kLmNvb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihkaWY8c3RkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTb21lRm9vZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb2QuZGlmID0gZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb29kLnR5cGUgPSB0eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwudGVtcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC50ZW1wLmZvb2Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhvdGVsLnRlbXAuZm9vZFt0eXBlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZFt0eXBlXS5wdXNoKGZvb2QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3RlbC50ZW1wLmZvb2RbdHlwZV0gPSBbZm9vZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwudGVtcC5mb29kID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwudGVtcC5mb29kW3R5cGVdID0gW2Zvb2RdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vZDp7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZFt0eXBlXSA9IFtmb29kXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIWlzU29tZUZvb2Qpe1xyXG4gICAgICAgICAgICAgICAgaG90ZWwudGVtcC5mb29kID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdmFyIG5lYXJieSA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmVhcmVzdCA9IHtkaWY6OTk5fTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0eXBlIGluIGhvdGVsLnRlbXAuZm9vZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLnRlbXAuZm9vZFt0eXBlXS5zb3J0KChhLCBiKSA9PiBhLmRpZiAtIGIuZGlmKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9vZEFyciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgIGhvdGVsLnRlbXAuZm9vZFt0eXBlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29weSA9ICQuZXh0ZW5kKHRydWUse30saG90ZWwudGVtcC5mb29kW3R5cGVdW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vZEFyci5wdXNoKGNvcHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcmJ5ICs9IGZvb2RBcnIubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihmb29kQXJyWzBdLmRpZiA8IG5lYXJlc3QuZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdCA9IGZvb2RBcnJbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihmb29kQXJyLmxlbmd0aD41KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vZEFyci5sZW5ndGggPSA1O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihob3RlbC5sb2NhbC5mb29kKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLmZvb2RbdHlwZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmJ5OiBob3RlbC50ZW1wLmZvb2RbdHlwZV0ubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXI1OiBmb29kQXJyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3Q6IGZvb2RBcnJbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuZm9vZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwuZm9vZFt0eXBlXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyYnk6IGhvdGVsLnRlbXAuZm9vZFt0eXBlXS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcjU6IGZvb2RBcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDogZm9vZEFyclswXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbCA9IHtmb29kOnt9fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwubG9jYWwuZm9vZFt0eXBlXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJieTogaG90ZWwudGVtcC5mb29kW3R5cGVdLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXI1OiBmb29kQXJyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdDogZm9vZEFyclswXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXSl7Ly/sp4Dsl63rs4QgZm9vZCDrsIDsp5Hrj4Trpbwg7ZmV7J247ZWY64qUIOq3uOufsCDrhYDshJ1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXS5wdXNoKG5lYXJieSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ5QXJlYVtob3RlbC5hcmVhXSA9IFtuZWFyYnldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLm5lYXJlc3QucHVzaChuZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpc3RpYy5uZWFyYnkucHVzaChuZWFyYnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmaXJzdF9nZW9Db2RlOiBmdW5jdGlvbihjaWQpe1xyXG4gICAgICAgIHZhciBncm9BcnIgPSB0aGlzLmRhdGEubG9jYWwuZm9vZC5ncm9jZXJ5O1xyXG4gICAgICAgIHZhciBnZW9BcnIgPSBbXTtcclxuICAgICAgICB2YXIgaXNHZW9OZWVkZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm9BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGdyb2NlcnkgPSBncm9BcnJbaV07XHJcbiAgICAgICAgICAgIGlmKCFncm9jZXJ5LmNvb3Ipe1xyXG4gICAgICAgICAgICAgICAgZ2VvQXJyLnB1c2goe2FkZHJlc3M6Z3JvY2VyeS5hZGRyZXNzLCBhaWQ6aX0pO1xyXG4gICAgICAgICAgICAgICAgaXNHZW9OZWVkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKCFncm9jZXJ5LmNvb3IubGF0KXtcclxuICAgICAgICAgICAgICAgICAgICBnZW9BcnIucHVzaCh7YWRkcmVzczpncm9jZXJ5LmFkZHJlc3MsIGFpZDppfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNHZW9OZWVkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzR2VvTmVlZGVkKXtcclxuICAgICAgICAgICAgdmFyIHJlZiA9IFwiY2l0aWVzL1wiK2NpZCtcIi9sb2NhbC9mb29kL2dyb2NlcnlcIjtcclxuICAgICAgICAgICAgR2VvQ29kZS5pbml0KGdlb0FyciwgcmVmKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXRGb29kO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRGb29kLmpzIiwiaW1wb3J0IENvbmZpZyBmcm9tIFwiLi4vY29uZmlnLmpzXCI7XHJcblxyXG52YXIgU2V0TWV0cm8gPSB7XHJcbiAgICBzdGF0aXN0aWM6e25lYXJlc3Q6W119LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEsIGNpdHlOYW1lKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2l0eU5hbWUgPSBjaXR5TmFtZTtcclxuICAgICAgICB0aGlzLmZpcnN0X3NldE1ldHJvKCk7IC8v7IiZ7IaM67OE66GcIOyngO2VmOyyoOydhCDrlYzroKTrhKPsnYxcclxuICAgICAgICB0aGlzLnNlY29uZF9ieUFyZWFzKCk7XHJcbiAgICAgICAgdGhpcy50aGlyZF9tYWtlU2NvcmUoKTtcclxuICAgICAgICB0aGlzLmZvdXJ0aF93b3JkaW5nKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGZvdXJ0aF93b3JkaW5nOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBjaXR5TmFtZSA9IHRoaXMuY2l0eU5hbWU7XHJcbiAgICAgICAgdmFyIHRvdGFsTGluZSA9IE9iamVjdC5rZXlzKHRoaXMuZGF0YS5tZXRyb0xpbmUpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaGlkIGluIHRoaXMuZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gdGhpcy5kYXRhLmhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICBsZXQgdHh0QXJyID0gW107XHJcblxyXG4gICAgICAgICAgICBsZXQgbWV0cm8gPSBob3RlbC5sb2NhbC5tZXRybztcclxuICAgICAgICAgICAgaWYobWV0cm8pe1xyXG4gICAgICAgICAgICAgICAgdmFyIG5lYXJlc3REaWYgPSBkaWZUb01pbihtZXRyby5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmVhcmVzdFN0biA9IG1ldHJvLm5lYXJlc3QubmFtZTtcclxuICAgICAgICAgICAgICAgIHZhciBsaW5lTm8gPSBPYmplY3Qua2V5cyhtZXRyby5ieUxpbmUpLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHZhciBzcG90Tm8gPSBPYmplY3Qua2V5cyhtZXRyby5zcG90KS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2NvcmUgPSBob3RlbC5hc3Nlc3NtZW50LnNjb3JlLnRyYW5zcG9ydDtcclxuICAgICAgICAgICAgICAgIHZhciBhdmdUaW1lID0gZGlmVG9NaW4obWV0cm8uYXZnRGlmKTtcclxuICAgICAgICAgICAgICAgIHR4dEFyci5wdXNoKGDsiJnshozsl5DshJwg6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqDsl63snYAg64+E67O0ICR7bmVhcmVzdERpZn0g6rGw66as7J2YICR7bmVhcmVzdFN0bn3sl61gKTtcclxuICAgICAgICAgICAgICAgIHR4dEFyci5wdXNoKGDrj4Trs7QgMTDrtoTqsbDrpqwg7J2064K07JeQICR7dG90YWxMaW5lfeqwnOydmCAke2NpdHlOYW1lfSDsoITssrQg7KeA7ZWY7LKgIOuFuOyEoCDspJEgJHtsaW5lTm996rCcIOuFuOyEoOydtCDsp4DrgqhgKTtcclxuICAgICAgICAgICAgICAgIHR4dEFyci5wdXNoKGAke2NpdHlOYW1lfSAxMDDrjIAg6rSA6rSR7KeAIOykkSAke3Nwb3ROb33qsJzrpbwg7KeA7ZWY7LKgIO2ZmOyKuSDsl4bsnbQg7Y+J6regICR7YXZnVGltZX3snZgg64+E67O0IOydtOuPmeycvOuhnCDrsKnrrLgg6rCA64qlYCk7XHJcbiAgICAgICAgICAgICAgICBpZihzY29yZT44Ljkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dEFyci5wdXNoKCfsp4DtlZjssqDsnYQg7J207Jqp7ZW0IOq0gOq0ke2VmOq4sCDrp6TsmrAg7Y6466as7ZWcIOuMgOykkeq1kO2GteydmCDstZzqs6Ag7JqU7KeA7JeQIOychOy5mO2VqCcpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoc2NvcmU+Ny45KXtcclxuICAgICAgICAgICAgICAgICAgICB0eHRBcnIucHVzaCgn7KeA7ZWY7LKg7J2EIOydtOyaqe2VtCDqtIDqtJHtlZjquLAg7Y6466as7ZWcIOuMgOykkeq1kO2GteydmCDsmpTsp4Dsl5Ag7JyE7LmY7ZWoJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihzY29yZT42Ljkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dEFyci5wdXNoKCfsp4DtlZjssqDsnYQg7J207Jqp7ZW0IOq0gOq0ke2VmOq4sCDrgpjsgZjsp4Ag7JWK7J2AIOychOy5mOyXkCDsnojsnYwnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNjb3JlPjUuOSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0QXJyLnB1c2goJ+yngO2VmOyyoOydhCDsnbTsmqntlbQg6rSA6rSR7ZWY6riw7JeQIOyVhOyjvCDsoovsnYAg7JyE7LmY64qUIOyVhOuLmCcpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0QXJyLnB1c2goJ+uMgOykkeq1kO2GtSDtjrjsnZjshLHsnYAg7JW96rCEIOuCruydgCDtjrjsnLzroZwsIOq0gOq0keydtCDsobDquIgg67aI7Y647ZWgIOyImCDsnojsnYwnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0eHRBcnIgPSBbXCLsnbQg7IiZ7IaMIOuPhOuztCAxNeu2hCDsnbTrgrQg6rGw66as7JeQIOyngO2VmOyyoCDsl63snbQg7JeG7Ja07IScIOuMgOykkeq1kO2GteydhCDsnbTsmqntlZjquLAg67aI7Y647ZWgIOyImCDsnojsnYxcIl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC53b3JkLnRyYW5zcG9ydCA9IHR4dEFycjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHRoaXJkX21ha2VTY29yZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgc2NvcmVBcnJheSA9IFtdO1xyXG4gICAgICAgIC8vMeqwnCDqtIDqtJHsp4Drpbwg6rCIIOyImCDsnojsnYQg65WM66eI64ukIDE4MDAgLSBkaWbtlanqs4Qo7Zi47YWU7JeQ7IScLCDrgrTroKTshJwp7KCQ66eM7YG8IOy2lOqwgFxyXG5cclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGxldCBtZXRybyA9IGhvdGVsLmxvY2FsLm1ldHJvO1xyXG4gICAgICAgICAgICBsZXQgc3BvdHMgPSB0aGlzLmRhdGEuc3BvdHMucmFua2VkO1xyXG4gICAgICAgICAgICBtZXRyby5zcG90ID0gW107XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBtZXRyb0xpbmVPYmogPSB0aGlzLmRhdGEubWV0cm9MaW5lO1xyXG4gICAgICAgICAgICBsZXQgc3BvdE9iaiA9IHt9O1xyXG5cclxuICAgICAgICAgICAgaWYobWV0cm8pe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbGluZU5hbWUgaW4gbWV0cm8uYnlMaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmUgPSBtZXRyby5ieUxpbmVbbGluZU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWZIb3RlbCA9IGxpbmUuZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0cm9MaW5lT2JqW2xpbmVOYW1lXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IG1ldHJvTGluZU9ialtsaW5lTmFtZV1baV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWZTcG90ID0gc3BvdC5kaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwb3RPYmpbc3BvdC5yYW5rXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkaWZTcG90ICsgZGlmSG90ZWwgPCBzcG90T2JqW3Nwb3QucmFua10uZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90T2JqW3Nwb3QucmFua10gPSB7ZGlmOiAoZGlmU3BvdCArIGRpZkhvdGVsKSwgbGluZTpsaW5lTmFtZX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BvdE9ialtzcG90LnJhbmtdID0ge2RpZjogKGRpZlNwb3QgKyBkaWZIb3RlbCksIGxpbmU6bGluZU5hbWV9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGF2ZyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcmFuayBpbiBzcG90T2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gKDE4MDAgLSBzcG90T2JqW3JhbmtdLmRpZik7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZnICs9IHNwb3RPYmpbcmFua10uZGlmO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBob3RlbFNwb3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3I6IHNwb3RzW3JhbmtdLmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IHNwb3RPYmpbcmFua10ubGluZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTpzcG90c1tyYW5rXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcG90TWV0cm9OYW1lOnNwb3RzW3JhbmtdLm1ldHJvSW5mb1tzcG90T2JqW3JhbmtdLmxpbmVdLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6cmFua1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0cm8uc3BvdC5wdXNoKGhvdGVsU3BvdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhdmcgPSBNYXRoLnJvdW5kKChhdmcgLyBPYmplY3Qua2V5cyhzcG90T2JqKS5sZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIG1ldHJvLmF2Z0RpZnRvU3BvdCA9IGF2ZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzY29yZUFycmF5LnB1c2goe2hpZDpoaWQsc2NvcmU6c2NvcmV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNjb3JlQXJyYXkuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBzY29yZUFycmF5Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgdmFyIHJhbmtTeXMgPSBDb25maWcubWV0cm8uc2NvcmUucGVyY2VudGlsZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWQgPSBzY29yZUFycmF5W2ldLmhpZDtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICAgICAgbGV0IHJhbmsgPSAoKGkrMSkgLyB0b3RhbCk7IC8vIOuwseu2hOychCAtIDB+MSAo64aS7J2E7IiY66GdIDDsl5Ag6rCA6rmM7JuAKVxyXG4gICAgICAgICAgICB2YXIgcGVyY2VudGlsZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXNSYW5rZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmFua1N5cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzUmFua2VkKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWludXMgPSBwZXJjZW50aWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRpbGUgKz0gcmFua1N5c1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmFuazxwZXJjZW50aWxlKXsgIC8vMzUlIOyViOyXkCDrk6TrqbRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuayAtPSBtaW51czsgICAvL3JhbmvrpbwgMH4wLjLroZwg66ee7Law7KSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gKDEwLWopIC0gTWF0aC5jZWlsKChyYW5rL3JhbmtTeXNbal0pKjEwKS8xMDsgLy9yYW5rKDB+MC4yKeulvCAwLjLroZwg64KY64iI6rCSKjEwLzEwIC0+IDB+MC456rCAIOuCmOyYtFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JhbmtlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcblxyXG4gICAgICAgICAgICBpZihob3RlbC5hc3Nlc3NtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdGVsLmFzc2Vzc21lbnQuc2NvcmUudHJhbnNwb3J0ID0gc2NvcmU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LnNjb3JlID0ge3RyYW5zcG9ydDpzY29yZX07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZTp7dHJhbnNwb3J0OnNjb3JlfSxcclxuICAgICAgICAgICAgICAgICAgICB3b3JkOnt0cmFuc3BvcnQ6XCJcIn1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlY29uZF9ieUFyZWFzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8v64uk66W4IGxvY2Fs65Ok6rO864qUIOuLrOumrCDsp4DtlZjssqAg7Jet7J2EIEFyZWHrs4TroZwg64KY64iUIC0g7KeA7Jet67OE66GcIOyWtOuWpCDrhbjshKDrk6TsnbQg7KeA64KY6rCA64qU7KeAIOyytO2BrDtcclxuICAgICAgICBsZXQgYXJlYUFyciA9IHRoaXMuZGF0YS5hcmVhO1xyXG4gICAgICAgIGxldCBtZXRyb0FyciA9IHRoaXMuZGF0YS5sb2NhbC5tZXRybztcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZWFBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFyZWEgPSBhcmVhQXJyW2ldO1xyXG4gICAgICAgICAgICBpZighYXJlYS5ub3RBcmVhKXtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWV0cm9BcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWV0cm8gPSBtZXRyb0FycltqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihpc0luQXJlYShtZXRyby5jb29yLCBhcmVhLmNvb3IpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtZXRyby5saW5lLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGluZSA9IG1ldHJvLmxpbmVba107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXJlYS5sb2NhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXJlYS5sb2NhbC5tZXRybyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZWEubG9jYWwubWV0cm9bbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYS5sb2NhbC5tZXRyb1tsaW5lXSArKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhLmxvY2FsLm1ldHJvW2xpbmVdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhLmxvY2FsLm1ldHJvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwubWV0cm9bbGluZV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwgPSB7bWV0cm86e319O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWEubG9jYWwubWV0cm9bbGluZV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmaXJzdF9zZXRNZXRybzogZnVuY3Rpb24oKXtcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5kYXRhLmhvdGVscykge1xyXG4gICAgICAgICAgICB2YXIgaG90ZWwgPSB0aGlzLmRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgIGlmKGhvdGVsLmxvY2FsKXtcclxuICAgICAgICAgICAgICAgIGhvdGVsLmxvY2FsLm1ldHJvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5lYXJlc3Q6e2RpZjpDb25maWcubWV0cm8ubmVhclN0ZH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmVhcjpbXSxcclxuICAgICAgICAgICAgICAgICAgICBieUxpbmU6e31cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBtZXRyb0FyciA9IHRoaXMuZGF0YS5sb2NhbC5tZXRybztcclxuICAgICAgICAgICAgdmFyIGJ5TGluZSA9IGhvdGVsLmxvY2FsLm1ldHJvLmJ5TGluZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0cm9BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXRybyA9IG1ldHJvQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpZiA9IGNhbGN1bGF0ZURpZihob3RlbC5jb29yLCBtZXRyby5jb29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkaWY8Q29uZmlnLm1ldHJvLm5lYXJTdGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRyb19jID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb29yOm1ldHJvLmNvb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6bWV0cm8ubGluZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTptZXRyby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWY6ZGlmLnRvRml4ZWQoMCkqMVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaG90ZWwubG9jYWwubWV0cm8ubmVhci5wdXNoKG1ldHJvX2MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihkaWY8aG90ZWwubG9jYWwubWV0cm8ubmVhcmVzdC5kaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RlbC5sb2NhbC5tZXRyby5uZWFyZXN0ID0gbWV0cm9fYztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWV0cm8ubGluZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGluZSA9IG1ldHJvLmxpbmVbal07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihieUxpbmVbbGluZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYnlMaW5lW2xpbmVdLmRpZiA+IG1ldHJvX2MuZGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieUxpbmVbbGluZV0gPSBtZXRyb19jO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5TGluZVtsaW5lXSA9IG1ldHJvX2M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGlzdGljLm5lYXJlc3QucHVzaChob3RlbC5sb2NhbC5tZXRyby5uZWFyZXN0LmRpZik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0TWV0cm87XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldE1ldHJvLmpzIiwiaW1wb3J0IENvbmZpZ19TYWZldHkgZnJvbSBcIi4uL2NvbmZpZy9zYWZldHkuanNcIjtcclxuXHJcbnZhciBTZXRTYWZldHkgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihkYXRhLCBjaXR5TmFtZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgdGhpcy5maXJzdF9mcm9tQXJlYShkYXRhLCBjaXR5TmFtZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGZpcnN0X2Zyb21BcmVhOiBmdW5jdGlvbihkYXRhLCBjaXR5TmFtZSl7XHJcbiAgICAgICAgbGV0IHNjb3JlQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IGFyZWFzID0gZGF0YS5hcmVhO1xyXG4gICAgICAgIGxldCBob3RlbHMgPSBkYXRhLmhvdGVscztcclxuICAgICAgICBmb3IgKHZhciBoaWQgaW4gaG90ZWxzKSB7XHJcbiAgICAgICAgICAgIGxldCBob3RlbCA9IGhvdGVsc1toaWRdO1xyXG4gICAgICAgICAgICBob3RlbC5hc3Nlc3NtZW50LndvcmQuc2FmZXR5ID0gW107XHJcbiAgICAgICAgICAgIGxldCB3b3JkID0gaG90ZWwuYXNzZXNzbWVudC53b3JkLnNhZmV0eTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcblxyXG4gICAgICAgICAgICAvL0FSRUHroZwg7J247ZWcIOy5mOyViFxyXG4gICAgICAgICAgICBsZXQgYXJlYSA9IGFyZWFzW2hvdGVsLmFyZWFdO1xyXG4gICAgICAgICAgICBzY29yZSArPSBhcmVhLnNhZmV0eS5zY29yZSozO1xyXG4gICAgICAgICAgICBsZXQgY29uZmlnX3dvcmQgPSBDb25maWdfU2FmZXR5LndvcmRbYXJlYS5zYWZldHkuc2NvcmVdO1xyXG4gICAgICAgICAgICBpZihhcmVhLnNhZmV0eS5zY29yZT4zJiZhcmVhLnNhZmV0eS5taXNkZW1lYW5vcjwzKXtcclxuICAgICAgICAgICAgICAgIGNvbmZpZ193b3JkID0gQ29uZmlnX1NhZmV0eS53b3JkWzZdOyAgICAvL+y5mOyViOydgCDsoovsp4Drp4wg6rK967KU7KOE7Jyo7J20IOyigCDrhpLsnYxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3b3JkLnB1c2goYCR7Y2l0eU5hbWV9JHtjb25maWdfd29yZH0gJHthcmVhLm5hbWV9IOyngOyXreyXkCDsnITsuZjtlZjqs6Ag7J6I7J2MYCk7XHJcblxyXG4gICAgICAgICAgICAvL01FVFJP66GcIOyduO2VnCDsuZjslYhcclxuICAgICAgICAgICAgaWYoaG90ZWwubG9jYWwubWV0cm8pe1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldHJvID0gaG90ZWwubG9jYWwubWV0cm87XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmID0gbWV0cm8ubmVhcmVzdC5kaWY7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluID0gZGlmVG9NaW4oZGlmKTtcclxuICAgICAgICAgICAgICAgIGxldCBjb25kaWYgPSBDb25maWdfU2FmZXR5Lm1ldERpZjtcclxuICAgICAgICAgICAgICAgIGxldCBub0RpZiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25kaWYubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWV0RGlmID0gY29uZGlmW2ldLnN0ZDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWV0V29yZCA9IGNvbmRpZltpXS53b3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG5vRGlmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGlmPChtZXREaWYqMSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9EaWYgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlICs9IGNvbmRpZltpXS5zY29yZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmQucHVzaChg6rCA7J6lIOqwgOq5jOyatCDsp4DtlZjssqAg7Jet7J2AIOuPhOuztCAke21pbn0g6rGw66asJHttZXRXb3JkfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+ycoOuPmeyduOq1rOuhnCDsnbjtlZwg7LmY7JWIXHJcbiAgICAgICAgICAgIGxldCBmbG9hdFNjb3JlID0gaG90ZWwuYXNzZXNzbWVudC5zY29yZS50cmFuc3BvcnQgKyBob3RlbC5hc3Nlc3NtZW50LnNjb3JlLmZvb2QgKyBob3RlbC5hc3Nlc3NtZW50LnNjb3JlLmF0bTtcclxuICAgICAgICAgICAgbGV0IG1pblNwb3REaWYgPSAxNTA7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuc3BvdHMucmFua2VkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3BvdCA9IGRhdGEuc3BvdHMucmFua2VkW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9IGNhbGN1bGF0ZURpZihzcG90LmNvb3IsIGhvdGVsLmNvb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGlmPG1pblNwb3REaWYpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1pblNwb3REaWYgPSBkaWY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobWluU3BvdERpZjw1MCl7XHJcbiAgICAgICAgICAgICAgICBmbG9hdFNjb3JlICs9IDM7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKG1pblNwb3REaWY8MTAwKXtcclxuICAgICAgICAgICAgICAgIGZsb2F0U2NvcmUgKz0gMjtcclxuICAgICAgICAgICAgfWVsc2UgaWYobWluU3BvdERpZjwxNTApe1xyXG4gICAgICAgICAgICAgICAgZmxvYXRTY29yZSArPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZmxvYXQgPSBDb25maWdfU2FmZXR5LmZsb2F0aW5nO1xyXG4gICAgICAgICAgICBsZXQgbm90WWV0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmxvYXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdGQgPSBmbG9hdFtpXS5zdGQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmxvYXRXb3JkID0gZmxvYXRbaV0ud29yZDtcclxuICAgICAgICAgICAgICAgIGlmKG5vdFlldCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZmxvYXRTY29yZT5zdGQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3RZZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gZmxvYXRbaV0uc2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmQucHVzaChgJHtjaXR5TmFtZX0ke2Zsb2F0V29yZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBmaW5hbCA9IENvbmZpZ19TYWZldHkuZmluYWxTYWZldHk7XHJcbiAgICAgICAgICAgIG5vdFlldCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbmFsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RkID0gZmluYWxbaV0uc3RkO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbmFsV29yZCA9IGZpbmFsW2ldLndvcmQ7XHJcbiAgICAgICAgICAgICAgICBpZihub3RZZXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNjb3JlPnN0ZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdFlldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkLnB1c2goYCR7ZmluYWxXb3JkfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzY29yZUFycmF5LnB1c2goe2hpZDpoaWQsc2NvcmU6c2NvcmV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNjb3JlQXJyYXkuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBzY29yZUFycmF5Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgdmFyIHJhbmtTeXMgPSBDb25maWdfU2FmZXR5LnNjb3JlLnBlcmNlbnRpbGU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcmVBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaGlkID0gc2NvcmVBcnJheVtpXS5oaWQ7XHJcbiAgICAgICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCByYW5rID0gKChpKzEpIC8gdG90YWwpOyAvLyDrsLHrtoTsnIQgLSAwfjEgKOuGkuydhOyImOuhnSAw7JeQIOqwgOq5jOybgClcclxuICAgICAgICAgICAgdmFyIHBlcmNlbnRpbGUgPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlzUmFua2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJhbmtTeXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKCFpc1JhbmtlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbnVzID0gcGVyY2VudGlsZTtcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50aWxlICs9IHJhbmtTeXNbal07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhbms8cGVyY2VudGlsZSl7ICAvLzM1JSDslYjsl5Ag65Ok66m0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmsgLT0gbWludXM7ICAgLy9yYW5r66W8IDB+MC4y66GcIOunnuy2sOykjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSA9ICgxMC1qKSAtIE1hdGguY2VpbCgocmFuay9yYW5rU3lzW2pdKSoxMCkvMTA7IC8vcmFuaygwfjAuMinrpbwgMC4y66GcIOuCmOuIiOqwkioxMC8xMCAtPiAwfjAuOeqwgCDrgpjsmLRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSYW5rZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGhvdGVsID0gZGF0YS5ob3RlbHNbaGlkXTtcclxuICAgICAgICAgICAgaG90ZWwuYXNzZXNzbWVudC5zY29yZS5zYWZldHkgPSBzY29yZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXRTYWZldHk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvcGFnZXMvaG90ZWwvc2V0SG90ZWxJbmZvL3NldFNhZmV0eS5qcyIsInZhciBDb25maWdfU2FmZXR5ID0ge1xyXG4gICAgc2NvcmU6e1xyXG4gICAgICAgIHBlcmNlbnRpbGUgOiBbMC4xNSwgMC4yLCAwLjI1LCAwLjIsIDAuMSwgMC4xXSwgLy85LCA4LCA3Li4u7KCQ64yA7J2YIOuwseu2hOychCDruYTsnKggLSDtlanqs4QgMSDrkJjslrTslbwg7ZWoISEhXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICB3b3JkOlsvL2FyZWHqtIDroKggd29yZFxyXG4gICAgICAgIFwiXCIsLy9zY29yZSAw7KCQ7J2AIOyXhuycvOuvgOuhnCDruYTsm4zrkaBcclxuICAgICAgICBcIuyXkOyEnCDsuZjslYjsnbQg64KY7IGcIO2OuOyXkCDsho3tlZjripRcIiwgIC8vMeygkFxyXG4gICAgICAgIFwi7JeQ7IScIOy5mOyViOydtCDsoovsp4DripQg7JWK7J2AIO2OuOyduFwiLCAgLy8y7KCQXHJcbiAgICAgICAgXCIg7Y+J6reg7KCB7J24IOy5mOyViCDsiJjspIDsnYQg67O07J2064qUXCIsICAvLzPsoJBcclxuICAgICAgICBcIuyXkOyEnCDsuZjslYjsnbQg7KKL7J2AIO2OuOyduFwiLCAgICAgICAgLy807KCQXHJcbiAgICAgICAgXCLsl5DshJwg7LmY7JWI7J20IOunpOyasCDsoovsnYAg7Y647J24XCIsICAgIC8vNeygkFxyXG4gICAgICAgIFwi7JeQ7IScIOy5mOyViOydgCDsoovsnYAg7Y647JeQIOyGje2VmOyngOunjCDqsr3rspTso4TsnKjsnbQg7KGw6riIIOuGkuydgCDtjrjsnbhcIiAgLy/tirnsiJhcclxuICAgIF0sXHJcblxyXG4gICAgbWV0RGlmOltcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoxNTAsICAgICAgICAgICAgICAgICAgICAgICAvL+qxsOumrOqwgCAxNTAg66+466eM7J28IOqyveyasFxyXG4gICAgICAgICAgICB3b3JkOlwi7JeQIOychOy5mO2VtCDqtYnsnqXtnogg6rCA6rmM7JuAXCIsIC8v7JqU66CH6rKMIOyEpOuqhe2VmOqzoFxyXG4gICAgICAgICAgICBzY29yZTo2ICAgICAgICAgICAgICAgICAgICAgICAvLzfsoJDsnYQg67aA7Jes7ZWoXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoyMjAsICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgd29yZDpcIuuhnCDrp6TsmrAg6rCA6rmM7Jq0IO2OuFwiLFxyXG4gICAgICAgICAgICBzY29yZTo1ICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjMwMCwgICAgICAgICBcclxuICAgICAgICAgICAgd29yZDpcIuyXkCDsnojsnYxcIiwgXHJcbiAgICAgICAgICAgIHNjb3JlOjQgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjQwMCwgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdvcmQ6XCLsl5Ag7J6I7J2MXCIsIFxyXG4gICAgICAgICAgICBzY29yZTozICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDo1MDAsICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3b3JkOlwi66GcIOyVveqwhCDrlqjslrTsoLgg7J6I64qUIO2OuFwiLFxyXG4gICAgICAgICAgICBzY29yZToyICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoxNTAwLCAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgd29yZDpcIuuhnCDsg4Hri7ntnogg65ao7Ja07KC4IOyeiOuKlCDtjrhcIiwgXHJcbiAgICAgICAgICAgIHNjb3JlOjEgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICBdLFxyXG5cclxuICAgIGZsb2F0aW5nOlsgLy9hdG0sIGZvb2QsIHRyYW5zcG9ydCDtlanqs4QgKyDso7zrs4Ag6rSA6rSR7KeAIOuztOuEiOyKpCg1MG3snbTrgrQgLSAz7KCQ66eM7KCQLCAxNTBtIDHsoJApO1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjI3LFxyXG4gICAgICAgICAgICB3b3JkOlwi64K0IOuLpOuluCDsp4Dsl60g64yA67mEIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg7IOB64u57Z6IIOunjuydgCDtjrhcIixcclxuICAgICAgICAgICAgc2NvcmU6Ni41XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoyNS41LFxyXG4gICAgICAgICAgICB3b3JkOlwi64K0IOuLpOuluCDsp4Dsl60g64yA67mEIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg6r2kIOunjuydgCDtjrhcIixcclxuICAgICAgICAgICAgc2NvcmU6NVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MjQsXHJcbiAgICAgICAgICAgIHdvcmQ6XCLrgrQg64uk66W4IOyngOyXrSDrjIDruYQg7KO867OAIOycoOuPmeyduOq1rOqwgCDsobDquIgg66eO7J2AIO2OuFwiLFxyXG4gICAgICAgICAgICBzY29yZTo0XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoyMSxcclxuICAgICAgICAgICAgd29yZDpcIuuCtCDtj4nqt6Ag7IiY7KSA7J2YIOycoOuPmeyduOq1rCDsiJjspIDsnYQg67O07J6EXCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjNcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjE4LFxyXG4gICAgICAgICAgICB3b3JkOlwi64K0IOuLpOuluCDsp4Dsl60g64yA67mEIOyjvOuzgCDsnKDrj5nsnbjqtazqsIAg7JW96rCEIOyggeydgCDtjrhcIixcclxuICAgICAgICAgICAgc2NvcmU6Mi41XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoxNSxcclxuICAgICAgICAgICAgd29yZDpcIuuCtCDri6Trpbgg7KeA7JetIOuMgOu5hCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOyggeydgCDtjrhcIixcclxuICAgICAgICAgICAgc2NvcmU6Mi4yNVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6NSxcclxuICAgICAgICAgICAgd29yZDpcIuuCtCDri6Trpbgg7KeA7JetIOuMgOu5hCDso7zrs4Ag7Jyg64+Z7J246rWs6rCAIOyDgeuLue2eiCDsoIHsnYAg7Y64XCIsXHJcbiAgICAgICAgICAgIHNjb3JlOjJcclxuICAgICAgICB9XHJcbiAgICBdLFxyXG5cclxuICAgIGZpbmFsU2FmZXR5OlsgLy9zY29yZSozICsgbWV0RGlmICsgZmxvYXRpbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoyMCwgLy/smIgsIOyngOyXrSA07KCQLCDrgpjrqLjsp4Ag7Y+J6regLCDsp4Dsl60gNeygkCwg64KY66i47KeAIOy1nOyVheydgCDslYTri4wg7IiY7KSAXHJcbiAgICAgICAgICAgIHdvcmQ6XCLsobDsi6ztlZzri6TrqbQg67CkIOuKpuqyjCDqt4DqsIDtlaAg65WM7JeQ64+EIOyViOyghO2VnCDsnITsuZhcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTgsIC8v7JiILCDsp4Dsl60gM+ygkCwg64KY66i47KeAIOuqqOuRkCDspJHsg4HsnITqtowsIOyngOyXrSA07KCQLCDrgpjrqLjsp4Ag64Ku7KeAIOyViuydjFxyXG4gICAgICAgICAgICB3b3JkOlwi7KGw7Ius7ZWc64uk66m0IOuKpuydgCDsi5zqsIQg6reA6rCA7ZWgIOuVjOyXkOuPhCDtgbAg66y47KCc64qUIOyXhuydjFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6MTYsIC8v7JiILCDsp4Dsl60gNOygkCwg64KY66i47KeAIOy1nOyVheydgCDslYTri5gsIOyngOyXrSAz7KCQLCDrgpjrqLjsp4Ag7KSR6rCEIOydtOyDgSwg7KeA7JetIDLsoJAg64KY66i47KeAIOy1nOyDgVxyXG4gICAgICAgICAgICB3b3JkOlwi64qm7J2AIOuwpOydhCDtlLztlZzri6TrqbQg7J2867CY7KCB7Jy866GcIOyggOuFgeyXkCDqt4DqsIDtlaAg65WMIO2BsCDrrLjsoJzripQg7JeG7J2MXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RkOjEzLjUsIC8v7KeA7JetIDPsoJAsIOuCmOuouOyngCDstZzslYUsIOyngOyXrSAy7KCQXHJcbiAgICAgICAgICAgIHdvcmQ6XCLsobDsi6ztnogg64uk64uQIO2VhOyalOqwgCDsnojsnLzrqbAsIOuKpuydgCDrsKTsl5Ag6reA6rCA7ZWY64qUIOqyg+ydgCDsgrzqsIDripQg6rKD7J20IOyii+ydjFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDoxMSwgLy/sp4Dsl60gMuygkCDrgpjrqLjsp4Ag64Ku7J2AIO2OuCwg7KeA7JetIDHsoJAg64KY66i47KeAIOykkeqwhCDsnbTsg4FcclxuICAgICAgICAgICAgd29yZDpcIu2VtCDsp4Qg7J207ZuE7JeQ64qUIOuPjOyVhOuLpOuLiOuKlCDqsoPsnYQg7IK86rCA64qUIOqyg+ydtCDsoovsnYxcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGQ6OSwgIC8v7KeA7JetIDHsoJAgXHJcbiAgICAgICAgICAgIHdvcmQ6XCLrgq7sl5Drj4Qg7JWI7KCE7JeQIOycoOydmO2VmOupsCDri6Tri4jripQg6rKD7J20IOyii+ydjFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZDo0LFxyXG4gICAgICAgICAgICB3b3JkOlwi7LmY7JWIIOusuOygnOqwgCDspJHsmpTtlZjri6TrqbQg7IiZ7IaMIOychOy5mOuhnCDsoIHtlantlZwg7KeA7Jet7J20IOyVhOuLmFwiXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlnX1NhZmV0eTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9wYWdlcy9ob3RlbC9jb25maWcvc2FmZXR5LmpzIiwidmFyIFNldEFyZWEgPSB7XHJcbiAgICBtYXA6e30sXHJcbiAgICBtYXJrZXI6e30sXHJcblxyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24gKGNpdHlOYW1lLCBjaWQpIHtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NpdGllcy8nK2NpZCkub25jZSgndmFsdWUnLCBzbmFwID0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNuYXAudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gdGhpcy5tYXJrZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyW2hpZF0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyID0ge307XHJcblxyXG4gICAgICAgICAgICB2YXIgdHh0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHR4dCArPSAnPGRpdiBjbGFzcz1cImhlYWRlclwiPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPGgyPicgKyBjaXR5TmFtZSArICcg7IiZ7IaMIOyngOyXrSDqtazrtoQ8L2gyPic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiY2l0eUFyZWFfX3dyYXBcIj4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxkaXYgaWQ9XCJjaXR5QXJlYV9fbWFwXCI+PC9kaXY+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8ZGl2IGNsYXNzPVwiXCJjaXR5QXJlYT4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzxwIGNsYXNzPVwiY2l0eUFyZWFfX3dvcmRcIj48L3A+JztcclxuICAgICAgICAgICAgdHh0ICs9ICc8cCBjaWQ9XCInICsgY2lkICsgJ1wiIGNsYXNzPVwiY2l0eUFyZWFfX2ZpbmlzaFwiPuyZhOujjOyymOumrDwvcD4nO1xyXG4gICAgICAgICAgICB0eHQgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIHR4dCArPSAnPC9kaXY+JzsgLy9jbG9zZSB3cmFwcGVyXHJcblxyXG4gICAgICAgICAgICAkKFwiLnBhZ2VzLmhvdGVsXCIpLmh0bWwodHh0KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5QXJlYV9fbWFwJyksIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhdDogNDAuNzQzMTk1NzkzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxuZzogLTczLjk4OTE3OTU0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgem9vbTogMTNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhcmVhID0ge307XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBoaWQgaW4gZGF0YS5ob3RlbHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBob3RlbCA9IGRhdGEuaG90ZWxzW2hpZF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9BcmVhID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuYXJlYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhLmFyZWFbaV0ubm90QXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmVhQ29vciA9IGRhdGEuYXJlYVtpXS5jb29yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5BcmVhKGhvdGVsLmNvb3IsIGFyZWFDb29yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90ZWwuYXJlYSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0FyZWEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZWFbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFbaV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub0FyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcltoaWRdID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBob3RlbC5jb29yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXA6IHRoaXMubWFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJycgKyBoaWRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcmVhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdjaXRpZXMvJyArIGNpZCArICcvaG90ZWxzJykudXBkYXRlKGRhdGEuaG90ZWxzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldEFyZWE7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3BhZ2VzL2hvdGVsL3NldEhvdGVsSW5mby9zZXRBcmVhLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==