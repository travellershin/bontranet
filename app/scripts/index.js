$(document).ready(function(){
    firebase.database().ref().once("value", snap => {
        let data = snap.val();
        $('#calendar').fullCalendar({
            height: 550
        })
    })
})
