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


//initialize
var isCalendarInit = false;
window.onload = setInterval(clock, 1000);

$("#nav_attend").click(function () {
    $(".nav__item").removeClass("nav__item--selected");
    $(this).addClass("nav__item--selected");
    $(".page").addClass("displayNone");
    $("#attend").removeClass("displayNone");
});

$("#nav_calendar").click(function () {
    $(".nav__item").removeClass("nav__item--selected");
    $(this).addClass("nav__item--selected");
    //캘린더 페이지 열기
    $(".page").addClass("displayNone");
    $("#calendar").removeClass("displayNone");

    if (!isCalendarInit) {
        isCalendarInit = true;
        //최초 캘린더 실행
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: ['dayGrid', 'interaction'],

            dateClick: function dateClick(info) {
                alert('Date: ' + info.dateStr);
                console.log(info);
            }
        });

        calendar.render();
    }
});

//출근버튼누름
$("#at__btn").click(function () {
    push_come();
});

$("#at__btn-tg").click(function () {
    push_leave();
});

Date.prototype.ymd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-');
};

function push_come() {
    $("#at__btn").addClass("displayNone");
    $("#at__btn-tg").removeClass("displayNone");
    $("#at__box__clock").removeClass("displayNone");
    localStorage.isCome = "true";

    var d = new Date();

    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }

    var time = hour + ":" + min;
    localStorage.comeTime = time;

    d = d.ymd();
    var user = localStorage.user;

    firebase.database().ref("attend/" + user + "/" + d).set({
        come: time,
        leave: "",
        length: ""
    });
}

function push_leave() {
    if (confirm("퇴근합니까?")) {
        $("#at__btn").removeClass("displayNone");
        $("#at__btn-tg").addClass("displayNone");
        localStorage.isCome = "false";

        var d = new Date();

        var hour = d.getHours();
        var min = d.getMinutes();
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (min < 10) {
            min = "0" + min;
        }

        var time = hour + ":" + min;

        d = d.ymd();
        var user = localStorage.user;
        var length = $("#clock-left").html();
        length = length.split(":")[0] * 60 + length.split(":")[1] * 1;

        firebase.database().ref("attend/" + user + "/" + d).set({
            come: localStorage.comeTime,
            leave: time,
            length: length
        });
        $("#clock-left").html("00:00");
    }
}

function clock() {
    var d = new Date();

    var hour = d.getHours();
    var min = d.getMinutes();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }

    var time = hour + ":" + min;

    document.getElementById("clock").innerHTML = time;

    if (localStorage.isCome === "true") {
        calcLength(time);
    }
}

function calcLength(now) {
    var come = localStorage.comeTime;
    var comeH = come.split(":")[0] * 1;
    var comeM = come.split(":")[1] * 1;

    var nowH = now.split(":")[0] * 1;
    var nowM = now.split(":")[1] * 1;

    var dif = (nowH - comeH) * 60 + (nowM - comeM);

    var difH = Math.floor(dif / 60, 0);
    var difM = dif - difH * 60;

    if (difH < 10) {
        difH = "0" + difH;
    }

    if (difM < 10) {
        difM = "0" + difM;
    }

    var time = difH + ":" + difM;

    document.getElementById("clock-left").innerHTML = time;
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjZlZDcwNjJkNDgzNGQyMmI0MjYiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOlsiaXNDYWxlbmRhckluaXQiLCJ3aW5kb3ciLCJvbmxvYWQiLCJzZXRJbnRlcnZhbCIsImNsb2NrIiwiJCIsImNsaWNrIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImNhbGVuZGFyRWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2FsZW5kYXIiLCJGdWxsQ2FsZW5kYXIiLCJDYWxlbmRhciIsInBsdWdpbnMiLCJkYXRlQ2xpY2siLCJpbmZvIiwiYWxlcnQiLCJkYXRlU3RyIiwiY29uc29sZSIsImxvZyIsInJlbmRlciIsInB1c2hfY29tZSIsInB1c2hfbGVhdmUiLCJEYXRlIiwicHJvdG90eXBlIiwieW1kIiwibW0iLCJnZXRNb250aCIsImRkIiwiZ2V0RGF0ZSIsImdldEZ1bGxZZWFyIiwiam9pbiIsImxvY2FsU3RvcmFnZSIsImlzQ29tZSIsImQiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW4iLCJnZXRNaW51dGVzIiwic2VjIiwiZ2V0U2Vjb25kcyIsInRpbWUiLCJjb21lVGltZSIsInVzZXIiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwicmVmIiwic2V0IiwiY29tZSIsImxlYXZlIiwibGVuZ3RoIiwiY29uZmlybSIsImh0bWwiLCJzcGxpdCIsImlubmVySFRNTCIsImNhbGNMZW5ndGgiLCJub3ciLCJjb21lSCIsImNvbWVNIiwibm93SCIsIm5vd00iLCJkaWYiLCJkaWZIIiwiTWF0aCIsImZsb29yIiwiZGlmTSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FB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SixDQUFVLEdBQVYsRUFBZSxDQUFmLElBQWtCLENBQTdCO0FBQ0EsUUFBSU8sT0FBT0osSUFBSUgsS0FBSixDQUFVLEdBQVYsRUFBZSxDQUFmLElBQWtCLENBQTdCOztBQUVBLFFBQUlRLE1BQU0sQ0FBQ0YsT0FBT0YsS0FBUixJQUFlLEVBQWYsSUFBcUJHLE9BQU9GLEtBQTVCLENBQVY7O0FBRUEsUUFBSUksT0FBT0MsS0FBS0MsS0FBTCxDQUFXSCxNQUFJLEVBQWYsRUFBa0IsQ0FBbEIsQ0FBWDtBQUNBLFFBQUlJLE9BQU9KLE1BQU9DLE9BQUssRUFBdkI7O0FBRUEsUUFBR0EsT0FBSyxFQUFSLEVBQVc7QUFDUEEsZUFBTyxNQUFJQSxJQUFYO0FBQ0g7O0FBRUQsUUFBR0csT0FBSyxFQUFSLEVBQVc7QUFDUEEsZUFBTyxNQUFJQSxJQUFYO0FBQ0g7O0FBRUQsUUFBSXhCLE9BQU9xQixPQUFLLEdBQUwsR0FBU0csSUFBcEI7O0FBRUF6RCxhQUFTQyxjQUFULENBQXdCLFlBQXhCLEVBQXNDNkMsU0FBdEMsR0FBZ0RiLElBQWhEO0FBQ0gsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY2ZWQ3MDYyZDQ4MzRkMjJiNDI2IiwiLy9pbml0aWFsaXplXHJcbmxldCBpc0NhbGVuZGFySW5pdCA9IGZhbHNlO1xyXG53aW5kb3cub25sb2FkID0gc2V0SW50ZXJ2YWwoY2xvY2ssMTAwMCk7XHJcblxyXG4kKFwiI25hdl9hdHRlbmRcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQoXCIubmF2X19pdGVtXCIpLnJlbW92ZUNsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJuYXZfX2l0ZW0tLXNlbGVjdGVkXCIpO1xyXG4gICAgJChcIi5wYWdlXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAkKFwiI2F0dGVuZFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG59KTtcclxuXHJcbiQoXCIjbmF2X2NhbGVuZGFyXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiLm5hdl9faXRlbVwiKS5yZW1vdmVDbGFzcyhcIm5hdl9faXRlbS0tc2VsZWN0ZWRcIik7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwibmF2X19pdGVtLS1zZWxlY3RlZFwiKTtcclxuICAgIC8v7LqY66aw642UIO2OmOydtOyngCDsl7TquLBcclxuICAgICQoXCIucGFnZVwiKS5hZGRDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIiNjYWxlbmRhclwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG5cclxuICAgIGlmKCFpc0NhbGVuZGFySW5pdCl7XHJcbiAgICAgICAgaXNDYWxlbmRhckluaXQgPSB0cnVlO1xyXG4gICAgICAgIC8v7LWc7LSIIOy6mOumsOuNlCDsi6TtlolcclxuICAgICAgICB2YXIgY2FsZW5kYXJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxlbmRhcicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBjYWxlbmRhciA9IG5ldyBGdWxsQ2FsZW5kYXIuQ2FsZW5kYXIoY2FsZW5kYXJFbCwge1xyXG4gICAgICAgICAgICBwbHVnaW5zOiBbICdkYXlHcmlkJywgJ2ludGVyYWN0aW9uJyBdLFxyXG4gICAgXHJcbiAgICAgICAgICAgIGRhdGVDbGljazogZnVuY3Rpb24oaW5mbykge1xyXG4gICAgICAgICAgICBhbGVydCgnRGF0ZTogJyArIGluZm8uZGF0ZVN0cik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICBjYWxlbmRhci5yZW5kZXIoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+y2nOq3vOuyhO2KvOuIhOumhFxyXG4kKFwiI2F0X19idG5cIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgcHVzaF9jb21lKCk7IFxyXG59KTtcclxuXHJcbiQoXCIjYXRfX2J0bi10Z1wiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgcHVzaF9sZWF2ZSgpOyBcclxuIH0pO1xyXG5cclxuIERhdGUucHJvdG90eXBlLnltZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG1tID0gdGhpcy5nZXRNb250aCgpICsgMTsgLy8gZ2V0TW9udGgoKSBpcyB6ZXJvLWJhc2VkXHJcbiAgICB2YXIgZGQgPSB0aGlzLmdldERhdGUoKTtcclxuICBcclxuICAgIHJldHVybiBbdGhpcy5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICAobW0+OSA/ICcnIDogJzAnKSArIG1tLFxyXG4gICAgICAgICAgICAoZGQ+OSA/ICcnIDogJzAnKSArIGRkXHJcbiAgICAgICAgICAgXS5qb2luKCctJyk7XHJcbn07XHJcblxyXG4gZnVuY3Rpb24gcHVzaF9jb21lKCl7XHJcbiAgICAkKFwiI2F0X19idG5cIikuYWRkQ2xhc3MoXCJkaXNwbGF5Tm9uZVwiKTtcclxuICAgICQoXCIjYXRfX2J0bi10Z1wiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgJChcIiNhdF9fYm94X19jbG9ja1wiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXlOb25lXCIpO1xyXG4gICAgbG9jYWxTdG9yYWdlLmlzQ29tZSA9IFwidHJ1ZVwiO1xyXG5cclxuICAgIGxldCBkID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICB2YXIgaG91ciA9ZC5nZXRIb3VycygpO1xyXG4gICAgdmFyIG1pbiA9IGQuZ2V0TWludXRlcygpO1xyXG4gICAgdmFyIHNlYyA9IGQuZ2V0U2Vjb25kcygpO1xyXG4gICAgaWYoaG91cjwxMCl7XHJcbiAgICAgICAgaG91ciA9IFwiMFwiK2hvdXI7XHJcbiAgICB9XHJcbiAgICBpZihtaW48MTApe1xyXG4gICAgICAgIG1pbiA9IFwiMFwiK21pbjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGltZSA9IGhvdXIrXCI6XCIrbWluXHJcbiAgICBsb2NhbFN0b3JhZ2UuY29tZVRpbWUgPSB0aW1lO1xyXG5cclxuICAgIGQgPSBkLnltZCgpO1xyXG4gICAgbGV0IHVzZXIgPSBsb2NhbFN0b3JhZ2UudXNlcjtcclxuXHJcbiAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgYXR0ZW5kLyR7dXNlcn0vJHtkfWApLnNldCh7XHJcbiAgICAgICAgY29tZTp0aW1lLFxyXG4gICAgICAgIGxlYXZlOlwiXCIsXHJcbiAgICAgICAgbGVuZ3RoOlwiXCJcclxuICAgIH0pO1xyXG4gfVxyXG5cclxuIGZ1bmN0aW9uIHB1c2hfbGVhdmUoKXtcclxuICAgICBpZihjb25maXJtKFwi7Ye06re87ZWp64uI6rmMP1wiKSl7XHJcbiAgICAgICAgJChcIiNhdF9fYnRuXCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgJChcIiNhdF9fYnRuLXRnXCIpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLmlzQ29tZSA9IFwiZmFsc2VcIjtcclxuXHJcblxyXG4gICAgICAgIGxldCBkID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgdmFyIGhvdXIgPWQuZ2V0SG91cnMoKTtcclxuICAgICAgICB2YXIgbWluID0gZC5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgaWYoaG91cjwxMCl7XHJcbiAgICAgICAgICAgIGhvdXIgPSBcIjBcIitob3VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtaW48MTApe1xyXG4gICAgICAgICAgICBtaW4gPSBcIjBcIittaW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGltZSA9IGhvdXIrXCI6XCIrbWluO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGQgPSBkLnltZCgpO1xyXG4gICAgICAgIGxldCB1c2VyID0gbG9jYWxTdG9yYWdlLnVzZXI7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9ICQoXCIjY2xvY2stbGVmdFwiKS5odG1sKCk7XHJcbiAgICAgICAgbGVuZ3RoID0gbGVuZ3RoLnNwbGl0KFwiOlwiKVswXSo2MCArIGxlbmd0aC5zcGxpdChcIjpcIilbMV0qMTtcclxuXHJcbiAgICAgICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGF0dGVuZC8ke3VzZXJ9LyR7ZH1gKS5zZXQoe1xyXG4gICAgICAgICAgICBjb21lOmxvY2FsU3RvcmFnZS5jb21lVGltZSxcclxuICAgICAgICAgICAgbGVhdmU6dGltZSxcclxuICAgICAgICAgICAgbGVuZ3RoOmxlbmd0aFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIjY2xvY2stbGVmdFwiKS5odG1sKFwiMDA6MDBcIik7XHJcbiAgICAgfVxyXG4gfVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNsb2NrKCl7XHJcbiAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgdmFyIGhvdXIgPWQuZ2V0SG91cnMoKTtcclxuICAgIHZhciBtaW4gPSBkLmdldE1pbnV0ZXMoKTtcclxuICAgIGlmKGhvdXI8MTApe1xyXG4gICAgICAgIGhvdXIgPSBcIjBcIitob3VyO1xyXG4gICAgfVxyXG4gICAgaWYobWluPDEwKXtcclxuICAgICAgICBtaW4gPSBcIjBcIittaW47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRpbWUgPSBob3VyK1wiOlwiK21pbjtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb2NrXCIpLmlubmVySFRNTD10aW1lO1xyXG5cclxuICAgIGlmKGxvY2FsU3RvcmFnZS5pc0NvbWUgPT09IFwidHJ1ZVwiKXtcclxuICAgICAgICBjYWxjTGVuZ3RoKHRpbWUpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY0xlbmd0aChub3cpe1xyXG4gICAgdmFyIGNvbWUgPSBsb2NhbFN0b3JhZ2UuY29tZVRpbWU7XHJcbiAgICB2YXIgY29tZUggPSBjb21lLnNwbGl0KFwiOlwiKVswXSoxO1xyXG4gICAgdmFyIGNvbWVNID0gY29tZS5zcGxpdChcIjpcIilbMV0qMTtcclxuXHJcbiAgICB2YXIgbm93SCA9IG5vdy5zcGxpdChcIjpcIilbMF0qMTtcclxuICAgIHZhciBub3dNID0gbm93LnNwbGl0KFwiOlwiKVsxXSoxO1xyXG5cclxuICAgIHZhciBkaWYgPSAobm93SCAtIGNvbWVIKSo2MCArIChub3dNIC0gY29tZU0pO1xyXG5cclxuICAgIHZhciBkaWZIID0gTWF0aC5mbG9vcihkaWYvNjAsMCk7XHJcbiAgICB2YXIgZGlmTSA9IGRpZiAtIChkaWZIKjYwKTtcclxuXHJcbiAgICBpZihkaWZIPDEwKXtcclxuICAgICAgICBkaWZIID0gXCIwXCIrZGlmSDtcclxuICAgIH1cclxuXHJcbiAgICBpZihkaWZNPDEwKXtcclxuICAgICAgICBkaWZNID0gXCIwXCIrZGlmTTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdGltZSA9IGRpZkgrXCI6XCIrZGlmTTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb2NrLWxlZnRcIikuaW5uZXJIVE1MPXRpbWU7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=