function localGrocery(hotelDB, groceryArray){
    for (let idx in hotelDB) {
        let hotel = hotelDB[idx];
        let within = 0;
        let min = 0;
        let sortArray = [];

        for (let i = 0; i < groceryArray.length; i++) {
            let latDif = Math.pow((hotel.coor.lat - groceryArray[i].lat)*111034,2); //위도 변화하면 가중치값이 바뀌어야 함
            let lngDif = Math.pow((hotel.coor.lng - groceryArray[i].lng) * 85397, 2);
            let dif = Math.round(Math.sqrt(latDif+lngDif))

            if(dif<150){
                within++
            }
            sortArray.push(dif);
        }
        sortArray.sort(function(a, b){return a-b});

        hotel.grocery = {nearest:sortArray[0],within:within};

        //firebase.database().ref("ny/hotel/"+no+"/local/grocery").set(hotel.gro)
    }
}
