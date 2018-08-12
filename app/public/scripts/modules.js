function toast(txt) {
    if ($(".snackbar").length > 0) {
        $(".snackbar").remove();
    }
    $("body").append('<div class="snackbar">' + txt + '</div>');
    $(".snackbar").addClass("show");
    $(".snackbar").css("animation");

    setTimeout(function () {
        $(".snackbar").removeClass("show");
    }, 3000);
}

$(".hd_nav_apply").click(function () {
    window.localStorage.pushApplyBtn = "true";
    location.href = "index.html";
});

function isInArea(spot, area) {
    var polygon = new google.maps.Polygon({paths:area});
    var coor = new google.maps.LatLng(spot.lat, spot.lng);

    if(google.maps.geometry.poly.containsLocation(coor, polygon)){
        return true;
    }else{
        return false;
    }
}



function calculateDif(coor1, coor2) {
    var R = 6371000; // Radius of the earth in km
    var dLat = (coor2.lat - coor1.lat) * (Math.PI / 180);  // deg2rad below
    var dLon = (coor2.lng - coor1.lng) * (Math.PI / 180);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((coor1.lat) * (Math.PI / 180)) * Math.cos((coor2.lat) * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function comma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function difToMin(dif) {
    var time = ""
    if(dif<40){
        time = (Math.floor(dif*1.2/10)*10+10) +'초';
    }else{
        var time = (Math.floor(dif / 50) + 1) +'분';
    }
    
    return time;
}

function difToMinWord(dif) {
    var min = Math.floor(dif / 50) + 1;
    var word = '';

    if (min < 6) {
        word = '<strong>도보 단 ' + min + '분 거리</strong>';
    } else {
        word = '<strong>도보 ' + min + '분 거리</strong>';
    }

    return word;
}