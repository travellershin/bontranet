let View_Spot = {
    markerLabel:[],

    full: function(){
        for (let i = 0; i < this.markerLabel.length; i++) {
            let marker = this.markerLabel[i][0];
            let label = this.markerLabel[i][1];
            marker.setMap(this.map);
            if(label.getMap() !== this.map){
                label.setMap(this.map);
            }
        }
    },

    disable: function(){
        for (let i = 0; i < this.markerLabel.length; i++) {
            let marker = this.markerLabel[i][0];
            let label = this.markerLabel[i][1];
            marker.setMap(null);
            label.setMap(null);
        }
    },

    core: function(){
        this.disable();
        for (let i = 0; i < 20; i++) {
            let marker = this.markerLabel[i][0];
            let label = this.markerLabel[i][1];
            marker.setMap(this.map);
            label.setMap(this.map);
        }
    },


    init: function(data){
        let spots = data.spots.ranked;
        this.data = spots;
        for (let i = 0; i < spots.length; i++) {
            let spot = spots[i];
            let marker = new google.maps.Marker({
                position: spot.coor,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeColor: '#555',
                    fillColor:'#555',
                    fillOpacity: 1,
                    scale: 2
                }
            });
            let latLng = new google.maps.LatLng(spot.coor.lat, spot.coor.lng);

            let label = new MapLabel({
                text: spot.name.ko,
                position: latLng,
                fontSize:16,
                align:'left'
            });
            this.markerLabel.push([marker, label]);
        }
        console.log(data);
    }
};

export default View_Spot;