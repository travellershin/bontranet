let MetroLine = {
    init: function(cid){
        
        firebase.database().ref("cities/"+cid).once("value", snap =>{
            let data = snap.val();
            this.create(data, cid);
            if(this.line[cid]){
                this.makeLine(cid);
            }
            firebase.database().ref("cities/"+cid+"/metroLine").set(this.metroLine);
            console.log(this.metroLine);
        });
    },

    makeLine(cid){
        for (let line in this.metroLine) {
            let stnArr = this.metroLine[line].stn;

            let orderArr = [];

            if(this.line[cid][line]){
                let start = this.line[cid][line][0];
                let end = this.line[cid][line][1];

                let idx = 0;
                for (let i = 0; i < stnArr.length; i++) {
                    let stn = stnArr[i];
                    if(stn.name === start){
                        orderArr.push(stn);
                        idx = i;
                    }
                }
                stnArr.splice(idx,1);

                let max = stnArr.length;
                for (let i = 0; i < max; i++) {

                    let next = {
                        dif: 20000
                    };
                    let spliceIdx = 0;

                    for (let j = 0; j < stnArr.length; j++) {
                        let stn = stnArr[j];
                        let target = orderArr[orderArr.length-1];
                        
                        let dif = calculateDif(target.coor, stn.coor);
                        if(dif<next.dif){
                            next = {
                                name:stn.name,
                                coor:{
                                    lat:stn.coor.lat,
                                    lng:stn.coor.lng
                                },
                                dif:dif
                            };
                            spliceIdx = j;
                        }
                    }
                    orderArr.push(next);
                    stnArr.splice(spliceIdx,1);
                }
            }
            this.metroLine[line].stn = orderArr;
        }
    },

    metroLine:{},

    line:{
        nyc:{
            1:["Van Cortlandt Park - 242nd St","South Ferry"],
            2:["Wakefield - 241st St","Brooklyn College - Flatbush Ave"],
            3:["Harlem - 148 St","New Lots Ave"],
            4:["Woodlawn","New Lots Ave"],
            5:["Eastchester - Dyre Ave","Brooklyn College - Flatbush Ave"],
            6:["Pelham Bay Park","Brooklyn Bridge - City Hall"],
            7:["Flushing - Main St","34th St - Hudson Yards"],
            A:["Inwood - 207th St","Rockaway Park - Beach 116 St"],
            B:["Bedford Park Blvd","Brighton Beach"],
            C:["168th St","Euclid Ave"],
            D:["Norwood - 205th St","Coney Island - Stillwell Av"],
            E:["Jamaica Ctr - Parsons / Archer","World Trade Center"],
            F:["Jamaica - 179th St","Coney Island - Stillwell Av"],
            G:["Long Island City - Court Sq","Church Ave"],
            J:["Jamaica Ctr - Parsons / Archer","Broad St"],
            L:["14 Street / 8 Av","Canarsie - Rockaway Pkwy"],
            M:["Forest Hills - 71st Av","Middle Village - Metropolitan Ave"],
            N:["Astoria - Ditmars Blvd","Coney Island - Stillwell Av"],
            Q:["96th St","Coney Island - Stillwell Av"],
            R:["Forest Hills - 71st Av","Bay Ridge - 95th St"],
            // S:["",""],  S선은 약간 셔틀같은자식임
            W:["Astoria - Ditmars Blvd","Whitehall St"],
            Z:["Jamaica Ctr - Parsons / Archer","Broad St"]
        }
    },

    create: function(data, cid){
        let spots = data.spots.ranked;
        let max = spots.length;
        if(max>99){
            max = 99;
        }

        let metros = data.local.metro;
        let metroLine = {};
        let tempLine = {};

        for (let j = 0; j < metros.length; j++) {
            let metro = metros[j];
            
            for (let i = 0; i < max; i++) {
                let hasSpot = false;
                let spot = spots[i];
                let dif = 600;
                let tempDif = 0;

                if(spot.enterance){
                    for (let k = 0; k < spot.enterance.length; k++) {
                        let ent = spot.enterance[k];
                        tempDif = calculateDif(ent, metro.coor);
                        if(tempDif<dif){
                            dif = tempDif;
                            hasSpot = true;
                        }
                    }
                }

                tempDif = calculateDif(spot.coor, metro.coor);
                if(tempDif<dif){
                    dif = tempDif;
                    hasSpot = true;
                }

                if(hasSpot){
                    for (let k = 0; k < metro.line.length; k++) {
                        let line = metro.line[k];
                        if(!tempLine[line]){
                            tempLine[line] = {};
                        }
                        if(tempLine[line][i]){
                            if(dif < tempLine[line][i].dif){
                                tempLine[line][i] = {coor:spot.coor, rank:i, name:spot.name, dif:dif, stn:{coor:metro.coor, name:metro.name}}; 
                            }
                        }else{
                            tempLine[line][i] = {coor:spot.coor, rank:i, name:spot.name, dif:dif, stn:{coor:metro.coor, name:metro.name}}; 
                        }
                    }
                }
            }
            for (var line in tempLine) {
                metroLine[line] = {spot:[],stn:[]};

                for (var rank in tempLine[line]) {
                    metroLine[line].spot.push(tempLine[line][rank]);
                }
            }
        }

        for (let j = 0; j < metros.length; j++) {
            let metro = metros[j];
            for (let i = 0; i < metro.line.length; i++) {
                let line = metro.line[i];

                if(metroLine[line]){
                    metroLine[line].stn.push({
                        coor:metro.coor,
                        name:metro.name
                    });
                }else{
                    metroLine[line] = {
                        spot:[],
                        stn:[{
                            coor:metro.coor,
                            name:metro.name
                        }]
                    };
                }
            }
        }
        this.metroLine = metroLine;
    }
};

export default MetroLine;