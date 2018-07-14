let Account = {
    user: {},
    init: function(id){
        let that = this;

        firebase.database().ref("users").once("value", snap => {
            let data = snap.val();


            for (var uid in data) {
                if(uid !== id){
                    this.user[uid] = {
                        name: data[uid].name
                    }
                }
            }
            $("header ul").prepend('<li id="nav_account">회계</li>');

            $("header ul").on("click", "#nav_account", function(){
                $("header li").removeClass("--selected");
                $(this).addClass("--selected");
                $(".pages").addClass("displayNone");
                $(".pages.account").removeClass("displayNone");
            })

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
