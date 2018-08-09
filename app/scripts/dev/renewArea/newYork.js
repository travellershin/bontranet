firebase.database().ref('cities/nyc').once("value", snap => {
    var data = snap.val();

    for (let i = 0; i < data.area.length; i++) {
        var area = data.area[i];

        for (let j = 0; j < data.temp.Document.Placemark.length; j++) {
            var tempArea = data.temp.Document.Placemark[j];

            if (area.name === tempArea.name) {
                var coor = tempArea.Polygon.outerBoundaryIs.LinearRing.coordinates;
                coor = coor.replace(/\n/gi, "");
                coor = coor.split(",0");
                for (let k = 0; k < coor.length; k++) {
                    coor[k] = coor[k].trim();
                    coor[k] = {
                        lat: coor[k].split(",")[1] * 1,
                        lng: coor[k].split(",")[0] * 1
                    };
                }
                coor.length = coor.length - 1;
                area.coor = coor;
                console.log(i, area.name, coor);
            }
        }
    }

    data.area[29] = 'test'

    firebase.database().ref('cities/nyc/area').set(data.area);
});