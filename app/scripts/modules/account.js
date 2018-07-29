let Account = {
    user: {},
    init: function(id){
        let that = this;
        var txt = '';
        txt +='<div id="accountCalendar" class="account__calendar">';
        txt +='</div>';

        $(".account").html(txt);

        firebase.database().ref("users").once("value", snap => {
            let data = snap.val();


            for (var uid in data) {
                if(uid !== id){
                    this.user[uid] = {
                        name: data[uid].name
                    }
                }
            }

            $('#accountCalendar').fullCalendar({
                height: 564,
                firstDay: 1,
                viewRender : function (view, element) {
                    that.inflate()
                },
                dayClick: function(date){
                    console.log(date)
                }
            });

            this.inflate();
        })
    },

    inflate: function(){

    }

}

export default Account;
