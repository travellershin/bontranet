import Spots from './spots';

let Area = {
    selected: "agoda",
    colorSet: ["#f15721", "#fc961a", "#f2c939", "#b9c242", 
        "#5c9850", "#10825d", "#11abca", "#4783f5", 
        "#9a1c48", "#7c3893", "#3f5ca8", "#795547"
    ],
    where: [],
    name:[],
    polygons:[],
    score:[],
    scoreObjArray: [],

    create: function(data){
        //agoda 또는 booking.com 기준 데이터 하나만 선택
        let sData = data.areas[this.selected];
        if (this.selected === "agoda") {
            for (let i = 0; i < data.spots.length; i++) {
                this.where.push(data.spots[i].area[0]);
            }
        }
        for (let i = 0; i < sData.length; i++) {
            let pg = new google.maps.Polygon({
                paths: sData[i].coor,
                fillColor: this.colorSet[i],
                fillOpacity:0.2,
                strokeWeight:1.2,
                strokeColor:this.colorSet[i]
            })
            for (let i = 0; i < sData[i].score.length; i++) {
                let mdScore
            }
            this.polygons.push(pg);
            this.score.push(sData[i].score);
            this.name.push(sData[i].name)
        }
    },

    calculate: function(){
        let standards = [false,false,false,false,false];
        for (let i = 0; i < 5; i++) {
            if(document.querySelector("#reco_"+i).checked){
                standards[i] = true;
            }
        }

        this.scoreObjArray = [];
        for (let i = 0; i < this.score.length; i++) {
            //score 4번째 요소가 관광지 점수!
            this.score[i][4] = 0;
        }
        let len = this.where.length;
        for (let i = 0; i < len; i++) {
            if(Spots.marked[i]){
                if (typeof this.where[i] === 'number'){
                    this.score[this.where[i]][4]+=1.1;
                }else{
                    for (let j = 0; j < this.where.length; j++) {
                        if(typeof this.where[i][j] === 'number'){
                            this.score[this.where[i][j]][4]+=1.1;
                        }
                    }
                }
            }
        }
        for (let i = 0; i < this.score.length; i++) {
            let scoreSum = 0;
            if (standards[0]){
                //0번째 요소는 공항평점 - 일단 0번째로 고정(jfk임)
                scoreSum += this.score[i][0][0];
            }
            for (let j = 1; j < this.score[i].length; j++) {
                if (standards[j]){
                    scoreSum += this.score[i][j]
                }
            }
            this.scoreObjArray.push({areaNo:i,score:scoreSum})
        }
        this.scoreObjArray.sort(function(a,b){
            return a.score<b.score ? 1 : a.score > b.score ? -1 : 0;
        })
        this.result([this.scoreObjArray[0].areaNo, this.scoreObjArray[1].areaNo, this.scoreObjArray[2].areaNo])
    },

    result: function(rArray){
        for (let i = 0; i < this.polygons.length; i++) {
            if (!rArray.includes(i)){
                this.polygons[i].setMap(null)
            }
        }

        for (let i = 0; i < rArray.length; i++) {
            this.polygons[rArray[i]].setMap(map);
            document.querySelector("#areaName_"+i).innerHTML = this.name[rArray[i]];
            document.querySelector("#areaBox_" + i).style.backgroundColor = this.colorSet[rArray[i]]
        }
    }
}

export default Area;