var GeoCode = {
    init: function(arr, ref){
        firebase.database().ref("temp/geocode").once("value", snap => {
            var data = snap.val();
            if(!data){  //다른 지오코딩 작업중이라면 절대 덮어써서는 안 됨;
                if(arr.length>0){
                    firebase.database().ref("temp/geocode").set({
                        ref:ref,
                        arr:arr
                    });
                }
                this.code(arr, ref);
                toast("지오코딩 작업을 시작합니다. 여러번 새로고침 될 수 있습니다.")
            }
        })
    },

    code: function(arr, ref){
        var that = this;

        let geocoder = new google.maps.Geocoder();
        var address = arr[0].address;
        var aid = arr[0].aid;

        geocoder.geocode( {'address': address}, function(results, status) {
            console.log(status)
            if (status == 'OK') {

                var coor = {
                    lat:results[0].geometry.location.lat(),
                    lng:results[0].geometry.location.lng()
                }

                firebase.database().ref(ref+"/"+aid+"/coor").set(coor);

                if(arr.length>1){
                    arr.shift();
                    setTimeout(() => {
                        that.code(arr, ref)
                    }, 500);
                }else{
                    firebase.database().ref("temp/geocode").set(false);
                    toast("지오코딩 작업이 완료되었습니다.")
                }

            }else{
                if(status === 'ZERO_RESULTS'){
                    console.log(arr[0]);
                    toast("지오코딩 결과가 없는 항목이 있습니다. 콘솔창을 참고해주세요");
                }else{
                    firebase.database().ref("temp/geocode").set({
                        ref:ref,
                        arr:arr
                    });
                    location.reload();
                }
            }
        });
    }
}

export default GeoCode;