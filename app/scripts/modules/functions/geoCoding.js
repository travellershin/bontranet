//geoCoding.init(주소목록(배열), 저장하려는 db)을 실행하면 해당 db에 위치 객체로 저장된다.

let geoCoding = {
    max: 0,
    db: [],
    dbref:"",
    init: function(addressDB, dbRef){
        this.max = addressDB.length;
        this.db = addressDB;
        this.dbRef = dbRef
        this.code(0);
    },
    code: function(no){
        let geocoder = new google.maps.Geocoder();
        let that = this;

        geocoder.geocode( { 'address': that.db[no]}, function(results, status) {
            if (status == 'OK') {
                console.log(results[0].geometry.location.lat())
                console.log(results[0].geometry.location.lng())
                let latVal = results[0].geometry.location.lat();
                let lngVal = results[0].geometry.location.lng();

                firebase.database().ref(that.dbref+no).set({lat:latVal,lng:lngVal});
                no++;

            if(no<max){
                setTimeout(function () {
                    that.code(no)
                }, 150);
            }


            } else {
            alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
}
