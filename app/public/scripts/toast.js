function toast(txt){
    if($(".snackbar").length>0){
        $(".snackbar").remove();
    }
    $("body").append('<div class="snackbar">'+txt+'</div>');
    $(".snackbar").addClass("show");
    $(".snackbar").css("animation")

    setTimeout(function () {
        $(".snackbar").removeClass("show")
    }, 3000);
}

$(".hd_nav_apply").click(function(){
    window.localStorage["pushApplyBtn"] = "true"
    location.href = "index.html"
})


function calculateDif(coor1, coor2){
    var R = 6371000; // Radius of the earth in km
    var dLat = deg2rad(coor2.lat-coor1.lat);  // deg2rad below
    var dLon = deg2rad(coor2.lng-coor1.lng);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(coor1.lat)) * Math.cos(deg2rad(coor2.lat)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
