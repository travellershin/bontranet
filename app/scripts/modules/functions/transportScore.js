let orderArray = [];

for (var fid in db.hotel) {
    let hotel = db.hotel[fid];
    let metroScore = 0;

    for (var line in db.metroByLine) {
        let score = 200;
        if(hotel.ownMetro[line]){
            score = (1000 - hotel.ownMetro[line].distance)
        }
        metroScore += Math.sqrt(Math.sqrt(Math.sqrt(db.metroByLine[line].length))) * score
    }
    hotel.metroScore = metroScore
    //firebase.database().ref("ny/hotel/"+fid+"/metroScore").set(metroScore);

    orderArray.push({id:fid,coor:hotel.coor,score:metroScore})
}
orderArray.sort(function(a, b){
    return a.score<b.score ? 1 : a.score>b.score ? -1 : 0;
})

console.log(orderArray)
for (var i = 0; i < 50; i++) {
    new google.maps.Marker({
        position: orderArray[i].coor,
        map: map,
        label:"5"
    });
}
for (var i = 50; i < 100; i++) {
    new google.maps.Marker({
        position: orderArray[i].coor,
        map: map,
        label:"4.5"
    });
}
for (var i = 100; i < 155; i++) {
    new google.maps.Marker({
        position: orderArray[i].coor,
        map: map,
        label:"4"
    });
}
for (var i = 155; i < 210; i++) {
    new google.maps.Marker({
        position: orderArray[i].coor,
        map: map,
        label:"3.5"
    });
}
for (var i = 210; i < 260; i++) {
    new google.maps.Marker({
        position: orderArray[i].coor,
        map: map,
        label:"3"
    });
}
for (var i = 260; i < 310; i++) {
    new google.maps.Marker({
        position: orderArray[i].coor,
        map: map,
        label:"2.5"
    });
}
for (var i = 310; i < 350; i++) {
    new google.maps.Marker({
        position: orderArray[i].coor,
        map: map,
        label:"2"
    });
}
for (var i = 350; i < 361; i++) {
    new google.maps.Marker({
        position: orderArray[i].coor,
        map: map,
        label:"1.5"
    });
}
console.log(db.hotel)
