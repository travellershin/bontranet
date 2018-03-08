import Spots from "./spots.js";

let Area = {
    list:[],
    colorSet: ["#f15721", "#fc961a", "#f2c939", "#b9c242",
        "#5c9850", "#10825d", "#11abca", "#4783f5",
        "#9a1c48", "#7c3893", "#3f5ca8", "#795547"
    ],

    init: function(data){
        for (let i = 0; i < data.length; i++) {
            data[i].polygon = new google.maps.Polygon({
                paths: data[i].coor,
                fillColor: this.colorSet[i],
                fillOpacity: 0.2,
                strokeWeight: 1.2,
                strokeColor: this.colorSet[i]
            })

            this.list.push(data[i])
        }
    },

    calculate: function () {
        let standards = [false, false, false, false, false];
        for (let i = 0; i < 5; i++) {
            if ($("#reco_" + i).is(":checked")) {
                standards[i] = true;
            }
        }

        for (let i = 0; i < this.list.length; i++) {
            //관광지 점수를 초기화한다.
            this.list[i].score[4] = 0;
        }

        for (let i = 0; i < Spots.list.length; i++) {
            if (Spots.list[i].checked){
                if (typeof Spots.list[i].area === 'number') {
                    this.list[Spots.list[i].area].score[4] += 1.1;
                } else {
                    for (let j = 0; j < Spots.list[i].area.length; j++) {
                        if (typeof Spots.list[i].area[j] === 'number') {
                            this.list[Spots.list[i].area[j]].score[4] += 1.1;
                        }
                    }
                }
            }
        }

        let scoreSumArray = [];

        for (let i = 0; i < this.list.length; i++) {
            let scoreSum = 0;
            if (standards[0]){
                //0번째 요소는 공항평점 - 일단 0번째로 고정(jfk임)
                scoreSum += this.list[i].score[0][0];
            }
            for (let j = 1; j < 5; j++) {
                if (standards[j]) {
                    scoreSum += this.list[i].score[j]
                }
            }
            scoreSumArray.push({ areaNo: i, score: scoreSum });
        }

        scoreSumArray.sort(function (a, b) {
            return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
        })
        this.result([scoreSumArray[0].areaNo, scoreSumArray[1].areaNo, scoreSumArray[2].areaNo])
    },

    result: function (resultArray) {
        for (let i = 0; i < this.list.length; i++) {
            if (!resultArray.includes(i)) {
                this.list[i].polygon.setMap(null)
            }
        }

        for (let i = 0; i < resultArray.length; i++) {
            let url = "https://www.agoda.com/partners/partnersearch.aspx?cid=1799898&pcs=1&hl=ko&city=318&checkIn=2018-03-13&checkOut=2018-03-15&los=2&rooms=1&adults=1&hotelArea=60866";
            this.list[resultArray[i]].polygon.setMap(map);
            document.querySelector("#areaName_" + i).innerHTML = this.list[resultArray[i]].name;
            document.querySelector("#areaBox_" + i).style.backgroundColor = this.colorSet[resultArray[i]];
            document.querySelector("#areaUrl_" + i).setAttribute("href", "");

            let sc = this.list[resultArray[i]].score;

            //공항평점. 공항선택 기능 넣으면 배열 두번째 [0]은 해당 선택 idx
            let air = sc[0][0];
            if(air>4.4){
                $("#score_"+i+"_0")
            }

            for (let i = 1; i < 5; i++) {
                
                
            }
        }
    }
}

export default Area;