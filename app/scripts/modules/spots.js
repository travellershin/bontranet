import Area from './area';

let Spots = {
    marker:[],
    marked:[],
    infoArray:[],
    
    mark: function(sdata){
        for (let i = 0; i < sdata.length; i++) {
            let mk = new google.maps.Marker({
                position: sdata[i].coor,
                map: map,
                icon: markerImg
            });
            let infowindow = new google.maps.InfoWindow({
                content: '<p class="mkTitle">' + sdata[i].name + '</p>'
            })
            mk.addListener('mouseover', function(){
                infowindow.open(map, mk);
            });
            mk.addListener('mouseout', function(){
                infowindow.close(map, mk);
            })
            let that = this;
            mk.addListener('click', function () {
                that.moveToList(i)
            })
            this.marker.push(mk);
            this.marked.push(true);
            this.infoArray.push(infowindow);
        }
    },
    //좌측 리스트에서 스팟을 클릭해 선택/해제하는 경우
    clicked: function(idx){
        if(this.marked[idx]){
            this.marker[idx].setMap(null);
            this.marked[idx] = false;
            document.querySelector("#spot_"+idx).classList.add("unSelected");
            Area.calculate();
        }else{
            this.marker[idx].setMap(map)
            this.marked[idx] = true;
            document.querySelector("#spot_" + idx).classList.remove("unSelected");
            Area.calculate();
        }
    },
    //좌측 리스트에 마우스 오버하는경우
    enter: function(idx){
        this.infoArray[idx].open(map, this.marker[idx]);
        map.setCenter(this.marker[idx].getPosition());
    },
    //좌측 리스트에서 마우스 떠나는경우
    leave: function(idx){
        this.infoArray[idx].close(map, this.marker[idx]);
    },
    //지도 위 마커를 클릭하는 경우 -> 좌측 리스트에서 찾기
    moveToList: function(idx){
        let div = document.querySelector(".selector_infoBox");
        div.scrollTop = 60*(idx-4);
        let obj = document.querySelector("#spot_"+idx);
        obj.style.color = '#5d85ff';
        obj.style.backgroundColor = '#edf2ff';
        setTimeout(function () {
            obj.style.color = '#333333'
            obj.style.backgroundColor = '#fafafa';
        }, 3000);
    },
    allSelect: function(){
        for (let i = 0; i < this.marker.length; i++) {
            if(!this.marked[i]){
                this.marker[i].setMap(map);
                this.marked[i] = true;
                document.querySelector("#spot_" + i).classList.remove("unSelected");
            }
            //전체해제 후 좌측 리스트에 마우스오버하다가 전체선택하면 화면에 infoArray들이 가득
            //표시되는 오류를 없애기 위해 한 번 다 닫아준다.
            this.infoArray[i].close(map, this.marker[i]);
        }
        Area.calculate();
    },
    allUnSelect: function(){
        for (let i = 0; i < this.marker.length; i++) {
            if(this.marked[i]){
                this.marker[i].setMap(null);
                this.marked[i] = false;
                document.querySelector("#spot_" + i).classList.add("unSelected");
            }
        }
        Area.calculate();
    }
}

export default Spots;