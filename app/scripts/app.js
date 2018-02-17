import citySelector from './modules/citySelector';
import Spots from './modules/spots';
import Recommend from './modules/recommend';
import Area from './modules/area';

Vue.component('city-selector', citySelector);


let main = new Vue({
    el: '#app',
    data:{
        db:{},
        spots:[],
        noOfSpot:0,
        finalResult:[]
    },
    mounted: function(){
        firebase.database().ref("ny").once("value", snap => {
            this.db = snap.val();
            this.spots = this.db.spots;
            //list를 인자로 받아 spot을 지도에 마킹한다.
            Spots.mark(this.db.spots);
            Area.create(this.db);
            Area.calculate();
            this.calculateNoOfSpot();
            this.finalResult = Area.finalResult;
        })
    },
    methods: {
        spotClicked: function(){
            //클릭된 박스 번호를 인자로 받아 spot의 상태표시를 변경한다.
            Spots.clicked(event.target.getAttribute("idx"));
            this.calculateNoOfSpot();
            this.finalResult = Area.finalResult;
        },
        spotEnter: function(){
            Spots.enter(event.target.getAttribute("idx"));
            this.calculateNoOfSpot();
        },
        spotLeave: function () {
            Spots.leave(event.target.getAttribute("idx"));
            this.calculateNoOfSpot();
        },
        allSelect: function(){
            Spots.allSelect();
            this.calculateNoOfSpot();
            this.finalResult = Area.finalResult;
        },
        allUnSelect: function () {
            Spots.allUnSelect();
            this.calculateNoOfSpot();
            this.finalResult = Area.finalResult;
        },
        calculateNoOfSpot: function() {
            this.noOfSpot = this.spots.length - document.querySelectorAll(".unSelected").length
        },
        standChecked: function(){
            Area.calculate();
            this.finalResult = Area.finalResult;
        }
    }
});

export default main;

