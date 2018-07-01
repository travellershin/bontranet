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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userMail = user.email.split('@')[0];
            firebase.database().ref("users").once("value", function (snap) {
                var userData = snap.val();
                if (userData[userMail]) {
                    if (userData[userMail].uid = user.uid) {
                        _attend2.default.init(userMail, user.displayName, userData[userMail].grade);
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
                            _attend2.default.init(userMail, user.displayName, userData[userMail].grade);
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

    attendObj: {},

    weekdays: ["일", "월", "화", "수", "목", "금", "토", "일"],

    init: function init(id, name, grade) {
        var _this = this;

        var that = this;
        $(".helloWorld").html(name[1] + "하!");
        $(".helloWorld").attr("title", name + "님 안녕하세요!");
        this.id = id;

        if (grade === 5) {
            $(".worker_selector").removeClass("displayNone");
            firebase.database().ref("users").once("value", function (snap) {
                var users = snap.val();
                var txt = '';
                for (var mailID in users) {
                    txt += '<option value="' + mailID + '">' + mailID + '</option>';
                }
                $(".worker_selector").html(txt);
            });
        } else {
            firebase.database().ref("attend/" + this.id).on("value", function (snap) {
                _this.attendObj = snap.val();
                $('#calendar').fullCalendar({
                    height: 552,
                    firstDay: 1,
                    viewRender: function viewRender(view, element) {
                        that.inflate_calendar(that.attendObj);
                    }
                });
            });
        }

        this.listener();
    },

    listener: function listener() {
        var that = this;

        $(".attendView_input").click(function () {
            that.inflate_input(that.attendObj);
        });
        $(".attendView_Show").click(function () {
            that.inflate_calendar(that.attendObj);
        });
    },

    inflate_calendar: function inflate_calendar(data) {
        $(".attendView_Show").addClass("selected");
        $(".attendView_input").removeClass("selected");
        $(".attend .input").addClass("displayNone");
        $(".calendarView").removeClass("displayNone");

        if (data.attend) {
            data = data.attend;
            for (var date in data) {
                var dateID = date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
                var dif = 0;
                for (var i = 0; i < data[date].length; i++) {
                    dif += data[date][i].dif;
                }
                var hour = Math.floor(dif / 60);
                var min = dif % 60;
                $('.fc-day[data-date="' + dateID + '"]').html(hour + "시간 " + min + "분");
            }
            var durMon = 0;

            for (var i = 0; i < $(".fc-day").length; i++) {
                var dateDom = $(".fc-day").eq(i);
                if (!dateDom.hasClass("fc-other-month")) {
                    var _date = dateDom.attr("data-date").split("-");
                    _date = _date[0] + _date[1] + _date[2];
                    if (data[_date]) {
                        for (var j = 0; j < data[_date].length; j++) {
                            durMon += data[_date][j].dif;
                        }
                    }
                }
            }
            var txt = $(".fc-left>h2").html();
            if (durMon > 0) {
                txt += ' (' + Math.floor(durMon / 60) + '시간 ' + durMon % 60 + '분)';
            }
            $(".fc-left>h2").html(txt);
        }
    },

    inflate_input: function inflate_input(data) {
        $(".attendView_Show").removeClass("selected");
        $(".attendView_input").addClass("selected");
        $(".attend .input").removeClass("displayNone");
        $(".calendarView").addClass("displayNone");

        var m = moment().day(-8);

        var pastWeek = '<p class="title pastTitle"></p><div class="weekPlan pastWeek clearfix">';
        var thisWeek = '<p class="title thisTitle"></p><div class="weekPlan thisWeek clearfix">';
        var nextWeek = '<p class="title nextTitle"></p><div class="weekPlan nextWeek clearfix">';

        var durData = {};
        var pastDur = 0;
        var thisDur = 0;
        var nextDur = 0;

        if (data.attend) {
            durData = data.attend;
        }

        for (var i = 0; i < 21; i++) {
            var _date2 = m.add(1, "days").format("MM-DD");
            var dateID = m.format("YYYYMMDD");
            var txt = '<div class="day"><p class="text"><span class="monthDay">' + _date2 + '</span>(' + this.weekdays[i % 7] + ')</p><div class="workHour" id="d_' + dateID + '"></div></div>';
            var dif = 0;

            if (durData[dateID]) {
                for (var j = 0; j < durData[dateID].length; j++) {
                    dif = durData[dateID][j].dif;
                }
            }

            if (i < 7) {
                pastWeek += txt;
                pastDur += dif;
            } else if (i < 14) {
                thisWeek += txt;
                thisDur += dif;
            } else {
                nextWeek += txt;
                nextDur += dif;
            }
        }
        pastWeek += '</div>';
        thisWeek += '</div>';
        nextWeek += '</div>';

        $(".attend .input").html(pastWeek + thisWeek + nextWeek);

        var that = this;
        $(".attend .input").on("click", ".workHour", function () {
            that.inputWorkHour($(this).attr("id"));
        });
        $(".pastTitle").html("지난주 근무 일정 (" + Math.floor(pastDur / 60) + "시간 " + pastDur % 60 + "분)");
        $(".thisTitle").html("이번주 근무 일정 (" + Math.floor(thisDur / 60) + "시간 " + thisDur % 60 + "분)");
        $(".nextTitle").html("다음주 근무 일정 (" + Math.floor(nextDur / 60) + "시간 " + nextDur % 60 + "분)");

        if (data.attend) {
            data = data.attend;
            for (var date in data) {
                var _txt = '';
                for (var i = 0; i < data[date].length; i++) {
                    var from = data[date][i].from;
                    var to = data[date][i].to;

                    _txt += '<p>' + from + " ~ " + to + '</p>';
                }
                $("#d_" + date).html(_txt);
            }
        }
    },

    inputWorkHour: function inputWorkHour(date) {
        // css: modules/attend.css
        if (!document.querySelector(".inputWindow")) {
            var inputWindow = '<div class="blackScreen"><div class="inputWindow">';
            inputWindow += '<p class="title">' + date.slice(6, 8) + "/" + date.slice(8) + ' 근무시간</p>';
            inputWindow += '<div class="line clearfix"><input id="first_from"><p class="word">부터</p><input id="first_to"><p class="word">까지</p></div>';
            inputWindow += '<div class="line clearfix"><input id="second_from"><p class="word">부터</p><input id="second_to"><p class="word">까지</p></div>';

            inputWindow += '<div class="bottom"><p class="confirm" id="' + date + '">확인</p><p class="close">취소</p></div></div></div>';

            $("body").append(inputWindow);

            if (this.mobile) {
                $(".inputWindow input").AnyPicker({
                    dateTimeFormat: "HH:mm"
                });
            }

            var that = this;
            $("body").on("click", ".confirm", function () {
                that.setWorkHour($(this).attr("id"));
                $(".inputWindow input").val("");
            });
            $("body").on("click", ".close", function () {
                $(".blackScreen").addClass("displayNone");
                $(".inputWindow input").val("");
            });
        } else {
            $(".blackScreen").removeClass("displayNone");
        }
    },

    setWorkHour: function setWorkHour(date) {
        var work = [];
        if ($("#first_from").val() < "23:59" && $("#first_from").val() > "08:00") {
            //시작시간이 잘 입력되었나 확인

            if (date < moment().format("MM-DD")) {
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

                if (date < moment().format("MM-DD")) {
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

        firebase.database().ref("attend/" + this.id + "/attend/" + date.slice(2)).set(work);
        $(".blackScreen").addClass("displayNone");
    },

    initInput: function initInput() {
        //근무시간 입력창을 초기화한다
    }
};

exports.default = Attend;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDBlMDJjZGZjNWJlYmFiODRmNjAiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvbW9kdWxlcy9hdHRlbmQuanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJwcm92aWRlciIsImZpcmViYXNlIiwiYXV0aCIsIkdvb2dsZUF1dGhQcm92aWRlciIsIm9uQXV0aFN0YXRlQ2hhbmdlZCIsInVzZXIiLCJ1c2VyTWFpbCIsImVtYWlsIiwic3BsaXQiLCJkYXRhYmFzZSIsInJlZiIsIm9uY2UiLCJ1c2VyRGF0YSIsInNuYXAiLCJ2YWwiLCJ1aWQiLCJpbml0IiwiZGlzcGxheU5hbWUiLCJncmFkZSIsImFsZXJ0Iiwic2lnbkluV2l0aFBvcHVwIiwidGhlbiIsInJlc3VsdCIsImNhdGNoIiwiZXJyb3IiLCJlcnJvckNvZGUiLCJjb2RlIiwiZXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNyZWRlbnRpYWwiLCJBdHRlbmQiLCJtb2JpbGUiLCJpZCIsImF0dGVuZE9iaiIsIndlZWtkYXlzIiwibmFtZSIsInRoYXQiLCJodG1sIiwiYXR0ciIsInJlbW92ZUNsYXNzIiwidXNlcnMiLCJ0eHQiLCJtYWlsSUQiLCJvbiIsImZ1bGxDYWxlbmRhciIsImhlaWdodCIsImZpcnN0RGF5Iiwidmlld1JlbmRlciIsInZpZXciLCJlbGVtZW50IiwiaW5mbGF0ZV9jYWxlbmRhciIsImxpc3RlbmVyIiwiY2xpY2siLCJpbmZsYXRlX2lucHV0IiwiZGF0YSIsImFkZENsYXNzIiwiYXR0ZW5kIiwiZGF0ZSIsImRhdGVJRCIsInNsaWNlIiwiZGlmIiwiaSIsImxlbmd0aCIsImhvdXIiLCJNYXRoIiwiZmxvb3IiLCJtaW4iLCJkdXJNb24iLCJkYXRlRG9tIiwiZXEiLCJoYXNDbGFzcyIsImoiLCJtIiwibW9tZW50IiwiZGF5IiwicGFzdFdlZWsiLCJ0aGlzV2VlayIsIm5leHRXZWVrIiwiZHVyRGF0YSIsInBhc3REdXIiLCJ0aGlzRHVyIiwibmV4dER1ciIsImFkZCIsImZvcm1hdCIsImlucHV0V29ya0hvdXIiLCJmcm9tIiwidG8iLCJxdWVyeVNlbGVjdG9yIiwiaW5wdXRXaW5kb3ciLCJhcHBlbmQiLCJBbnlQaWNrZXIiLCJkYXRlVGltZUZvcm1hdCIsInNldFdvcmtIb3VyIiwid29yayIsImZyb21BIiwidG9BIiwicHVzaCIsInNldCIsImluaXRJbnB1dCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFFQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVU7O0FBRXhCLFFBQUlDLFdBQVcsSUFBSUMsU0FBU0MsSUFBVCxDQUFjQyxrQkFBbEIsRUFBZjtBQUNBRixhQUFTQyxJQUFULEdBQWdCRSxrQkFBaEIsQ0FBbUMsVUFBU0MsSUFBVCxFQUFlO0FBQ2hELFlBQUlBLElBQUosRUFBVTtBQUNOLGdCQUFJQyxXQUFXRCxLQUFLRSxLQUFMLENBQVdDLEtBQVgsQ0FBaUIsR0FBakIsRUFBc0IsQ0FBdEIsQ0FBZjtBQUNBUCxxQkFBU1EsUUFBVCxHQUFvQkMsR0FBcEIsQ0FBd0IsT0FBeEIsRUFBaUNDLElBQWpDLENBQXNDLE9BQXRDLEVBQStDLGdCQUFRO0FBQ25ELG9CQUFJ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LENBQVo7QUFDQSxvQkFBSXVGLE9BQU1ULElBQUc5RSxLQUFILENBQVMsR0FBVCxDQUFWO0FBQ0Esb0JBQUlvRCxPQUFNLENBQUNtQyxLQUFJLENBQUosSUFBTyxDQUFQLEdBQVdELE9BQU0sQ0FBTixJQUFTLENBQXJCLElBQXdCLEVBQXhCLElBQThCQyxLQUFJLENBQUosSUFBTyxDQUFQLEdBQVdELE9BQU0sQ0FBTixJQUFTLENBQWxELENBQVY7O0FBR0FELHFCQUFLRyxJQUFMLENBQVU7QUFDTlgsMEJBQU1BLEtBREE7QUFFTkMsd0JBQUlBLEdBRkU7QUFHTjFCLHlCQUFLQTtBQUhDLGlCQUFWO0FBS0gsYUFsQ0QsTUFrQ0s7QUFDRHpDLHNCQUFNLDhDQUFOO0FBQ0EsdUJBQU8sS0FBUDtBQUNIO0FBQ0o7O0FBRURsQixpQkFBU1EsUUFBVCxHQUFvQkMsR0FBcEIsQ0FBd0IsWUFBVSxLQUFLc0IsRUFBZixHQUFrQixVQUFsQixHQUE2QnlCLEtBQUtFLEtBQUwsQ0FBVyxDQUFYLENBQXJELEVBQW9Fc0MsR0FBcEUsQ0FBd0VKLElBQXhFO0FBQ0FoRyxVQUFFLGNBQUYsRUFBa0IwRCxRQUFsQixDQUEyQixhQUEzQjtBQUVILEtBbFNROztBQW9TVDJDLGVBQVcscUJBQVU7QUFDakI7QUFDSDtBQXRTUSxDQUFiOztrQkF5U2VwRSxNIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDBlMDJjZGZjNWJlYmFiODRmNjAiLCJpbXBvcnQgQXR0ZW5kIGZyb20gXCIuL21vZHVsZXMvYXR0ZW5kLmpzXCI7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgIHZhciBwcm92aWRlciA9IG5ldyBmaXJlYmFzZS5hdXRoLkdvb2dsZUF1dGhQcm92aWRlcigpO1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbih1c2VyKSB7XHJcbiAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICBsZXQgdXNlck1haWwgPSB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF1cclxuICAgICAgICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKFwidXNlcnNcIikub25jZShcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCB1c2VyRGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgaWYodXNlckRhdGFbdXNlck1haWxdKXtcclxuICAgICAgICAgICAgICAgICAgaWYodXNlckRhdGFbdXNlck1haWxdLnVpZCA9IHVzZXIudWlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgIEF0dGVuZC5pbml0KHVzZXJNYWlsLCB1c2VyLmRpc3BsYXlOYW1lLCB1c2VyRGF0YVt1c2VyTWFpbF0uZ3JhZGUpO1xyXG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrjbDsnbTthLAg7Je0656MIOq2jO2VnOydtCDsl4bsirXri4jri6QuIOq0gOumrOyekOyXkOqyjCDrrLjsnZjtlbTso7zshLjsmpRcIilcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIC8vIFVzZXIgaXMgc2lnbmVkIGluLlxyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBObyB1c2VyIGlzIHNpZ25lZCBpbi5cclxuICAgICAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aFBvcHVwKHByb3ZpZGVyKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB1c2VyID0gcmVzdWx0LnVzZXI7XHJcbiAgICAgICAgICAgIGxldCB1c2VyTWFpbCA9IHVzZXIuZW1haWwuc3BsaXQoJ0AnKVswXVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcInVzZXJzXCIpLm9uY2UoXCJ2YWx1ZVwiLCBzbmFwID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VyRGF0YSA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBpZih1c2VyRGF0YVt1c2VyTWFpbF0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHVzZXJEYXRhW3VzZXJNYWlsXS51aWQgPSB1c2VyLnVpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dGVuZC5pbml0KHVzZXJNYWlsLCB1c2VyLmRpc3BsYXlOYW1lLCB1c2VyRGF0YVt1c2VyTWFpbF0uZ3JhZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuuNsOydtO2EsCDsl7Trnowg6raM7ZWc7J20IOyXhuyKteuLiOuLpC4g6rSA66as7J6Q7JeQ6rKMIOusuOydmO2VtOyjvOyEuOyalFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi642w7J207YSwIOyXtOuejCDqtoztlZzsnbQg7JeG7Iq164uI64ukLiDqtIDrpqzsnpDsl5Dqsowg66y47J2Y7ZW07KO87IS47JqUXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAvLyAuLi5cclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgLy8gSGFuZGxlIEVycm9ycyBoZXJlLlxyXG4gICAgICAgICAgdmFyIGVycm9yQ29kZSA9IGVycm9yLmNvZGU7XHJcbiAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgIC8vIFRoZSBlbWFpbCBvZiB0aGUgdXNlcidzIGFjY291bnQgdXNlZC5cclxuICAgICAgICAgIHZhciBlbWFpbCA9IGVycm9yLmVtYWlsO1xyXG4gICAgICAgICAgLy8gVGhlIGZpcmViYXNlLmF1dGguQXV0aENyZWRlbnRpYWwgdHlwZSB0aGF0IHdhcyB1c2VkLlxyXG4gICAgICAgICAgdmFyIGNyZWRlbnRpYWwgPSBlcnJvci5jcmVkZW50aWFsO1xyXG4gICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvaW5kZXguanMiLCJ2YXIgQXR0ZW5kID0ge1xyXG4gICAgbW9iaWxlOiBmYWxzZSxcclxuXHJcbiAgICBpZDogXCJcIixcclxuXHJcbiAgICBhdHRlbmRPYmo6IHt9LFxyXG5cclxuICAgIHdlZWtkYXlzOiBbXCLsnbxcIiwgXCLsm5RcIiwgXCLtmZRcIiwgXCLsiJhcIiwgXCLrqqlcIiwgXCLquIhcIiwgXCLthqBcIiwgXCLsnbxcIl0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oaWQsIG5hbWUsIGdyYWRlKXtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgJChcIi5oZWxsb1dvcmxkXCIpLmh0bWwobmFtZVsxXStcIu2VmCFcIik7XHJcbiAgICAgICAgJChcIi5oZWxsb1dvcmxkXCIpLmF0dHIoXCJ0aXRsZVwiLG5hbWUrXCLri5gg7JWI64WV7ZWY7IS47JqUIVwiKTtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcblxyXG4gICAgICAgIGlmKGdyYWRlID09PSA1KXtcclxuICAgICAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJ1c2Vyc1wiKS5vbmNlKFwidmFsdWVcIiwgc25hcCA9PntcclxuICAgICAgICAgICAgICAgIGxldCB1c2VycyA9IHNuYXAudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHh0ID0gJydcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG1haWxJRCBpbiB1c2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPG9wdGlvbiB2YWx1ZT1cIicrbWFpbElEKydcIj4nK21haWxJRCsnPC9vcHRpb24+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJChcIi53b3JrZXJfc2VsZWN0b3JcIikuaHRtbCh0eHQpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkKS5vbihcInZhbHVlXCIsIHNuYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRPYmogPSBzbmFwLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDU1MixcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdERheTogMSxcclxuICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyIDogZnVuY3Rpb24gKHZpZXcsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2NhbGVuZGFyKHRoYXQuYXR0ZW5kT2JqKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAkKFwiLmF0dGVuZFZpZXdfaW5wdXRcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5pbmZsYXRlX2lucHV0KHRoYXQuYXR0ZW5kT2JqKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCIuYXR0ZW5kVmlld19TaG93XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoYXQuaW5mbGF0ZV9jYWxlbmRhcih0aGF0LmF0dGVuZE9iaik7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZV9jYWxlbmRhcjogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgJChcIi5hdHRlbmRWaWV3X1Nob3dcIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAkKFwiLmF0dGVuZFZpZXdfaW5wdXRcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAkKFwiLmF0dGVuZCAuaW5wdXRcIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICAkKFwiLmNhbGVuZGFyVmlld1wiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgICAgICBpZihkYXRhLmF0dGVuZCl7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmF0dGVuZFxyXG4gICAgICAgICAgICBmb3IgKHZhciBkYXRlIGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlSUQgPSBkYXRlLnNsaWNlKDAsNCkrXCItXCIrZGF0ZS5zbGljZSg0LDYpK1wiLVwiK2RhdGUuc2xpY2UoNiw4KTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWYgPSAwXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbZGF0ZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWYgKz0gZGF0YVtkYXRlXVtpXS5kaWZcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBob3VyID0gTWF0aC5mbG9vcihkaWYvNjApO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pbiA9IGRpZiU2MDtcclxuICAgICAgICAgICAgICAgICQoJy5mYy1kYXlbZGF0YS1kYXRlPVwiJytkYXRlSUQrJ1wiXScpLmh0bWwoaG91citcIuyLnOqwhCBcIittaW4rXCLrtoRcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZHVyTW9uID0gMDtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChcIi5mYy1kYXlcIikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlRG9tID0gJChcIi5mYy1kYXlcIikuZXEoaSk7XHJcbiAgICAgICAgICAgICAgICBpZighZGF0ZURvbS5oYXNDbGFzcyhcImZjLW90aGVyLW1vbnRoXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGRhdGVEb20uYXR0cihcImRhdGEtZGF0ZVwiKS5zcGxpdChcIi1cIilcclxuICAgICAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZVswXStkYXRlWzFdK2RhdGVbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtkYXRlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyTW9uICs9IGRhdGFbZGF0ZV1bal0uZGlmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHR4dCA9ICQoXCIuZmMtbGVmdD5oMlwiKS5odG1sKCk7XHJcbiAgICAgICAgICAgIGlmKGR1ck1vbj4wKXtcclxuICAgICAgICAgICAgICAgIHR4dCs9JyAoJytNYXRoLmZsb29yKGR1ck1vbi82MCkrJ+yLnOqwhCAnK2R1ck1vbiU2MCsn67aEKSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKFwiLmZjLWxlZnQ+aDJcIikuaHRtbCh0eHQpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbmZsYXRlX2lucHV0OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAkKFwiLmF0dGVuZFZpZXdfU2hvd1wiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICQoXCIuYXR0ZW5kVmlld19pbnB1dFwiKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICQoXCIuYXR0ZW5kIC5pbnB1dFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICQoXCIuY2FsZW5kYXJWaWV3XCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgICAgIHZhciBtID0gbW9tZW50KCkuZGF5KC04KTtcclxuXHJcbiAgICAgICAgdmFyIHBhc3RXZWVrID0gJzxwIGNsYXNzPVwidGl0bGUgcGFzdFRpdGxlXCI+PC9wPjxkaXYgY2xhc3M9XCJ3ZWVrUGxhbiBwYXN0V2VlayBjbGVhcmZpeFwiPic7XHJcbiAgICAgICAgdmFyIHRoaXNXZWVrID0gJzxwIGNsYXNzPVwidGl0bGUgdGhpc1RpdGxlXCI+PC9wPjxkaXYgY2xhc3M9XCJ3ZWVrUGxhbiB0aGlzV2VlayBjbGVhcmZpeFwiPic7XHJcbiAgICAgICAgdmFyIG5leHRXZWVrID0gJzxwIGNsYXNzPVwidGl0bGUgbmV4dFRpdGxlXCI+PC9wPjxkaXYgY2xhc3M9XCJ3ZWVrUGxhbiBuZXh0V2VlayBjbGVhcmZpeFwiPic7XHJcblxyXG4gICAgICAgIGxldCBkdXJEYXRhID0ge31cclxuICAgICAgICBsZXQgcGFzdER1ciA9IDA7XHJcbiAgICAgICAgbGV0IHRoaXNEdXIgPSAwO1xyXG4gICAgICAgIGxldCBuZXh0RHVyID0gMDtcclxuXHJcbiAgICAgICAgaWYoZGF0YS5hdHRlbmQpe1xyXG4gICAgICAgICAgICBkdXJEYXRhID0gZGF0YS5hdHRlbmRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjE7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZGF0ZSA9ICBtLmFkZCgxLCBcImRheXNcIikuZm9ybWF0KFwiTU0tRERcIik7XHJcbiAgICAgICAgICAgIGxldCBkYXRlSUQgPSBtLmZvcm1hdChcIllZWVlNTUREXCIpO1xyXG4gICAgICAgICAgICBsZXQgdHh0ID0gJzxkaXYgY2xhc3M9XCJkYXlcIj48cCBjbGFzcz1cInRleHRcIj48c3BhbiBjbGFzcz1cIm1vbnRoRGF5XCI+JytkYXRlKyc8L3NwYW4+KCcrdGhpcy53ZWVrZGF5c1tpJTddKycpPC9wPjxkaXYgY2xhc3M9XCJ3b3JrSG91clwiIGlkPVwiZF8nK2RhdGVJRCsnXCI+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICAgICAgbGV0IGRpZiA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZihkdXJEYXRhW2RhdGVJRF0pe1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkdXJEYXRhW2RhdGVJRF0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWYgPSBkdXJEYXRhW2RhdGVJRF1bal0uZGlmXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGk8Nyl7XHJcbiAgICAgICAgICAgICAgICBwYXN0V2VlayArPSB0eHQ7XHJcbiAgICAgICAgICAgICAgICBwYXN0RHVyICs9IGRpZlxyXG4gICAgICAgICAgICB9ZWxzZSBpZihpPDE0KXtcclxuICAgICAgICAgICAgICAgIHRoaXNXZWVrICs9IHR4dDtcclxuICAgICAgICAgICAgICAgIHRoaXNEdXIgKz0gZGlmXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbmV4dFdlZWsgKz0gdHh0O1xyXG4gICAgICAgICAgICAgICAgbmV4dER1ciArPSBkaWZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwYXN0V2Vlays9ICc8L2Rpdj4nO1xyXG4gICAgICAgIHRoaXNXZWVrKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgbmV4dFdlZWsrPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgJChcIi5hdHRlbmQgLmlucHV0XCIpLmh0bWwocGFzdFdlZWsrdGhpc1dlZWsrbmV4dFdlZWspO1xyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgJChcIi5hdHRlbmQgLmlucHV0XCIpLm9uKFwiY2xpY2tcIiwgXCIud29ya0hvdXJcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhhdC5pbnB1dFdvcmtIb3VyKCQodGhpcykuYXR0cihcImlkXCIpKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoXCIucGFzdFRpdGxlXCIpLmh0bWwoXCLsp4Drgpzso7wg6re866y0IOydvOyglSAoXCIrTWF0aC5mbG9vcihwYXN0RHVyLzYwKStcIuyLnOqwhCBcIitwYXN0RHVyJTYwK1wi67aEKVwiKVxyXG4gICAgICAgICQoXCIudGhpc1RpdGxlXCIpLmh0bWwoXCLsnbTrsojso7wg6re866y0IOydvOyglSAoXCIrTWF0aC5mbG9vcih0aGlzRHVyLzYwKStcIuyLnOqwhCBcIit0aGlzRHVyJTYwK1wi67aEKVwiKVxyXG4gICAgICAgICQoXCIubmV4dFRpdGxlXCIpLmh0bWwoXCLri6TsnYzso7wg6re866y0IOydvOyglSAoXCIrTWF0aC5mbG9vcihuZXh0RHVyLzYwKStcIuyLnOqwhCBcIituZXh0RHVyJTYwK1wi67aEKVwiKVxyXG5cclxuXHJcbiAgICAgICAgaWYoZGF0YS5hdHRlbmQpe1xyXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5hdHRlbmRcclxuICAgICAgICAgICAgZm9yICh2YXIgZGF0ZSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHh0ID0gJydcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtkYXRlXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmcm9tID0gZGF0YVtkYXRlXVtpXS5mcm9tO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0byA9IGRhdGFbZGF0ZV1baV0udG87XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHR4dCArPSAnPHA+Jytmcm9tK1wiIH4gXCIrdG8rJzwvcD4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKFwiI2RfXCIrZGF0ZSkuaHRtbCh0eHQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0V29ya0hvdXI6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgICAgIC8vIGNzczogbW9kdWxlcy9hdHRlbmQuY3NzXHJcbiAgICAgICAgaWYoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXRXaW5kb3dcIikpe1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRXaW5kb3cgPSAnPGRpdiBjbGFzcz1cImJsYWNrU2NyZWVuXCI+PGRpdiBjbGFzcz1cImlucHV0V2luZG93XCI+JztcclxuICAgICAgICAgICAgaW5wdXRXaW5kb3crPSAnPHAgY2xhc3M9XCJ0aXRsZVwiPicrZGF0ZS5zbGljZSg2LDgpK1wiL1wiK2RhdGUuc2xpY2UoOCkrJyDqt7zrrLTsi5zqsIQ8L3A+J1xyXG4gICAgICAgICAgICBpbnB1dFdpbmRvdys9ICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPjxpbnB1dCBpZD1cImZpcnN0X2Zyb21cIj48cCBjbGFzcz1cIndvcmRcIj7rtoDthLA8L3A+PGlucHV0IGlkPVwiZmlyc3RfdG9cIj48cCBjbGFzcz1cIndvcmRcIj7quYzsp4A8L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICBpbnB1dFdpbmRvdys9ICc8ZGl2IGNsYXNzPVwibGluZSBjbGVhcmZpeFwiPjxpbnB1dCBpZD1cInNlY29uZF9mcm9tXCI+PHAgY2xhc3M9XCJ3b3JkXCI+67aA7YSwPC9wPjxpbnB1dCBpZD1cInNlY29uZF90b1wiPjxwIGNsYXNzPVwid29yZFwiPuq5jOyngDwvcD48L2Rpdj4nXHJcblxyXG5cclxuICAgICAgICAgICAgaW5wdXRXaW5kb3cgKz0gJzxkaXYgY2xhc3M9XCJib3R0b21cIj48cCBjbGFzcz1cImNvbmZpcm1cIiBpZD1cIicrZGF0ZSsnXCI+7ZmV7J24PC9wPjxwIGNsYXNzPVwiY2xvc2VcIj7st6jshow8L3A+PC9kaXY+PC9kaXY+PC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFwcGVuZChpbnB1dFdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLm1vYmlsZSl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLkFueVBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWVGb3JtYXQ6XCJISDptbVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuY29uZmlybVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRXb3JrSG91cigkKHRoaXMpLmF0dHIoXCJpZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmlucHV0V2luZG93IGlucHV0XCIpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5jbG9zZVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJChcIi5ibGFja1NjcmVlblwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5pbnB1dFdpbmRvdyBpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoXCIuYmxhY2tTY3JlZW5cIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRXb3JrSG91cjogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgbGV0IHdvcmsgPSBbXVxyXG4gICAgICAgIGlmKCQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfZnJvbVwiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG4gICAgICAgICAgICAvL+yLnOyekeyLnOqwhOydtCDsnpgg7J6F66Cl65CY7JeI64KYIO2ZleyduFxyXG5cclxuICAgICAgICAgICAgaWYoZGF0ZTxtb21lbnQoKS5mb3JtYXQoXCJNTS1ERFwiKSl7XHJcbiAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICBpZigkKFwiI2ZpcnN0X3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNmaXJzdF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi6re866y0IOyiheujjOyLnOqwhOydhCBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqULlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy/snbTsoITsnbzsnbQg7JWE64uI642U652864+EIOyYiOyDgSDqt7zrrLTsi5zqsITsnbTrnbzrj4Qg7J6F66Cl7ZW07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgaWYoJChcIiNmaXJzdF90b1wiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjZmlyc3RfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuyYiOyDgSDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmcm9tID0gJChcIiNmaXJzdF9mcm9tXCIpLnZhbCgpXHJcbiAgICAgICAgICAgIGxldCB0byA9ICQoXCIjZmlyc3RfdG9cIikudmFsKClcclxuXHJcbiAgICAgICAgICAgIGxldCBmcm9tQSA9IGZyb20uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICBsZXQgdG9BID0gdG8uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICBsZXQgZGlmID0gKHRvQVswXSoxIC0gZnJvbUFbMF0qMSkqNjAgKyAodG9BWzFdKjEgLSBmcm9tQVsxXSoxKVxyXG5cclxuXHJcbiAgICAgICAgICAgIHdvcmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgdG86IHRvLFxyXG4gICAgICAgICAgICAgICAgZGlmOiBkaWZcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi6re866y07Iuc6rCE7J20IOyemOuquyDsnoXroKXrkJjsl4jsirXri4jri6QuIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZigkKFwiI3NlY29uZF9mcm9tXCIpLnZhbCgpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfZnJvbVwiKS52YWwoKTxcIjIzOjU5XCImJiQoXCIjc2Vjb25kX2Zyb21cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRlPG1vbWVudCgpLmZvcm1hdChcIk1NLUREXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+yYpOuKmCDsnbTsoIQg7J287J2YIOuCoOynnOulvCDri6Tro6jqs6Ag7J6I7J2EIOqyveyasCAtIOq3vOustCDsooXro4zsi5zqsITsnbQg7J6F66Cl65CY7KeAIOyViuycvOuptCDslYgg65CoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoJChcIiNzZWNvbmRfdG9cIikudmFsKCk8XCIyMzo1OVwiJiYkKFwiI3NlY29uZF90b1wiKS52YWwoKT5cIjA4OjAwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLrkZAg67KI7Ke4IOq3vOustOydmCDqt7zrrLQg7KKF66OM7Iuc6rCE7J2EIEhIOk1NIO2YleyLneycvOuhnCDsnoXroKXtlbTso7zshLjsmpQuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/snbTsoITsnbzsnbQg7JWE64uI642U652864+EIOyYiOyDgSDqt7zrrLTsi5zqsITsnbTrnbzrj4Qg7J6F66Cl7ZW07JW8IO2VqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpPFwiMjM6NTlcIiYmJChcIiNzZWNvbmRfdG9cIikudmFsKCk+XCIwODowMFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi65GQIOuyiOynuCDqt7zrrLTsnZgg7JiI7IOBIOq3vOustCDsooXro4zsi5zqsITsnYQgSEg6TU0g7ZiV7Iud7Jy866GcIOyeheugpe2VtOyjvOyEuOyalC5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZnJvbSA9ICQoXCIjc2Vjb25kX2Zyb21cIikudmFsKClcclxuICAgICAgICAgICAgICAgIGxldCB0byA9ICQoXCIjc2Vjb25kX3RvXCIpLnZhbCgpXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZyb21BID0gZnJvbS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9BID0gdG8uc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZiA9ICh0b0FbMF0qMSAtIGZyb21BWzBdKjEpKjYwICsgKHRvQVsxXSoxIC0gZnJvbUFbMV0qMSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgd29yay5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgICAgICBkaWY6IGRpZlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuuRkCDrsojsp7gg6re866y07J2YIOq3vOustOyLnOqwhOydtCDsnpjrqrsg7J6F66Cl65CY7JeI7Iq164uI64ukLiBISDpNTSDtmJXsi53snLzroZwg7J6F66Cl7ZW07KO87IS47JqUXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcImF0dGVuZC9cIit0aGlzLmlkK1wiL2F0dGVuZC9cIitkYXRlLnNsaWNlKDIpKS5zZXQod29yayk7XHJcbiAgICAgICAgJChcIi5ibGFja1NjcmVlblwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdElucHV0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8v6re866y07Iuc6rCEIOyeheugpeywveydhCDstIjquLDtmZTtlZzri6RcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXR0ZW5kO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9tb2R1bGVzL2F0dGVuZC5qcyJdLCJzb3VyY2VSb290IjoiIn0=