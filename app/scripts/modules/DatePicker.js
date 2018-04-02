let DatePicker = {
    text: "",
    isFirst: true,
    weekArray: ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"],
    firstDate:{},
    secondDate:{},
    firstDateTxt:"",
    secondDateTxt:"",
    tempDate:"",

    init: function(){
        let that = this;
        $(".datePicker").datepicker({
            defaultDate: "+1w",

            onSelect: function(){
                that.chooseDate($(".datePicker").datepicker("getDate"))
            },

            onClose: function() {
                //앞자리만 선택하고 닫힌 경우 초기화해준다.
                if(!that.isFirst){
                    $(this).data('datepicker').inline = false;
                    that.isFirst = true;

                    let originDate = that.firstDate;
                    that.text = (originDate.getMonth()+1)+"월 "+originDate.getDate()+"일"+that.weekArray[originDate.getDay()]+" - ";
                    originDate = that.secondDate;
                    that.text += (originDate.getMonth()+1)+"월 "+originDate.getDate()+"일"+that.weekArray[originDate.getDay()];
                    $(".dateShower").html(that.text);
                    $(".hd_sidebar>.std>span").eq(0).html(that.text)
                }
            }
        })
        this.firstDate = new Date(Date.now() + 2 * 1000 * 60 * 60 * 24)
        this.secondDate = new Date(Date.now() + 3 * 1000 * 60 * 60 * 24)
        console.log(this.firstDate)
        this.firstDateTxt = this.formatter(this.firstDate)
        this.secondDateTxt = this.formatter(this.secondDate)

        let date = this.firstDate;
        this.text = (date.getMonth()+1)+"월 "+date.getDate()+"일"+this.weekArray[date.getDay()]+" - ";
        date = this.secondDate;
        this.text += (date.getMonth()+1)+"월 "+date.getDate()+"일"+this.weekArray[date.getDay()];
        $(".dateShower").html(this.text);
        $(".hd_sidebar>.std>span").eq(0).html(this.text)
    },

    chooseDate(date){
        if(this.isFirst){
            $(".datePicker").data('datepicker').inline = true;
            this.text = (date.getMonth()+1)+"월 "+date.getDate()+"일"+this.weekArray[date.getDay()]+" - ";
            this.tempDate = date;
            $(".dateShower").html(this.text)
            this.isFirst = false;

        }else{
            $(".datePicker").data('datepicker').inline = false;
            this.text += (date.getMonth()+1)+"월 "+date.getDate()+"일"+this.weekArray[date.getDay()];
            $(".dateShower").html(this.text);
            $(".hd_sidebar>.std>span").eq(0).html(this.text)
            this.firstDate = this.tempDate;
            this.secondDate = date;
            this.isFirst = true;


            //최종적으로 날짜 검사
            if(this.firstDate>this.secondDate){
                this.reverseDate();
                return;
            }else if(this.firstDate.getTime() === this.secondDate.getTime()){
                // TODO: 토스트 띄우기
                $(".dateShower").html("체크인-아웃 날짜가 같습니다");
                console.log("같은 날짜를 선택하셨습니다.")
                return;
            }

            this.firstDateTxt =  this.formatter(this.firstDate);
            this.secondDateTxt = this.formatter(this.secondDate);

            let night = (this.secondDate - this.firstDate)/(1000 * 60 * 60 * 24);
            $("header .dateRange").html(night+"박 "+(night+1)+"일");
            $(".hotelDetail .std>span").eq(1).html(night+"박 "+(night+1)+"일")
        }
    },

    reverseDate(){
        let tempDate = this.firstDate;
        this.firstDate = this.secondDate;
        this.secondDate = tempDate;
        let text = $(".dateShower").html().split(" - ");
        text = text[1] + " - " + text[0];
        $(".dateShower").html(text);
        $(".hd_sidebar>.std>span").eq(0).html(this.text)
        this.firstDateTxt =  this.formatter(this.firstDate);
        this.secondDateTxt = this.formatter(this.secondDate);

        let night = (this.secondDate - this.firstDate)/(1000 * 60 * 60 * 24);
        $("header .dateRange").html(night+"박 "+(night+1)+"일");
        $(".hotelDetail .std>span").eq(1).html(night+"박 "+(night+1)+"일")
    },

    formatter: function(date){
        let month = "";
        let day = "";
        if(date.getMonth()+1<10){
            month = "0"+(date.getMonth()+1)
        }else{
            month = (date.getMonth()+1)
        }
        if(date.getDate()<10){
            day = "0"+date.getDate()
        }else{
            day = date.getDate()
        }
        return date.getFullYear()+"-"+month+"-"+day;
    }
}

export default DatePicker;
