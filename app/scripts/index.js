import Attend from "./modules/attend.js";
import City from "./modules/city.js";
import Spot from "./modules/spot.js"
import Subway from "./modules/subway.js";
import Account from "./modules/account.js";

var initialized = {}

var u_i = {}

var Nav_function = {
    attend: function () {
        Attend.init(u_i);
        initialized.attend = true;
    },
    todo: function () {

    },
    city: function () {
        City.init(u_i);
        initialized.city = true;
    },
    map: function () {
        Subway.init();
    },
    account: function () {

    },
    spot: function () {
        Spot.init(u_i);
    },
    calc: function () {

    },
    hotel: function () {

    },
    link: function () {

    }
}

function login(name){
    $(".helloWorld").html(name[1]+"하!");
    $(".helloWorld").attr("title",name+"님 안녕하세요!");
    $(".helloWorld").click(function(){
        if(confirm(name+"님 로그아웃 하시겠습니까?")){
            firebase.auth().signOut().then(function() {
              window.location.reload()
            }).catch(function(error) {
              // An error happened.
            });
        }
    })
}

$(document).ready(function () {

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let mail = user.email.split('@')[0];

            firebase.database().ref("users").once("value", snap => {
                var data = snap.val();

                //아래 내용을 바꾸면 if (!isUser) 부분에도 반드시 반영해줄것
                // for (var gid in data) {
                //     data[gid].
                // }

                // firebase.database().ref("users").update(data);

                if (data[mail]) {
                    u_i = data[mail];
                    var grade = u_i.grade * 1;

                    if (grade > 0) {
                        Attend.init(data[mail]);
                        if (grade === 5) {
                            Account.init(mail);
                            initialized.account = true;
                        }
                        initialized.attend = true;
                        login(u_i.name);

                    } else {
                        toast("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요")
                    }
                } else {
                    toast("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요")
                }
            })
            // User is signed in.

        } else {
            // No user is signed in.
            firebase.auth().signInWithPopup(provider).then(function (result) {
                user = result.user;
                let userMail = user.email.split('@')[0];

                firebase.database.ref("users").once("value", snap => {
                    var data = snap.val();

                    if(data[mail]){
                        u_i = data[mail]
                        var grade = u_i.grade * 1;

                        if (grade > 0) {
                            Attend.init(data[mail]);
                            if (grade === 5) {
                                Account.init(mail);
                                initialized.account = true;
                            }
                            initialized.attend = true;
                            login(u_i.name);

                        } else {
                            toast("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요")
                        }
                    }else{
                        firebase.database().ref('users/' + userMail).set({
                            grade: 0,
                            name: user.displayName,
                            mail: userMail,
                            setting: {
                                spot: {
                                    order: "abc"
                                }
                            }

                        });
                        toast("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요")
                    }


                })
            }).catch(function (error) {
                toast('code:' + error.code + ' - 일시적인 문제가 발생했습니다. 관리자에게 문의해주세요.')
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        }
    });

})

$(".nav__item").click(function () {
    if(!$(this).hasClass('nav__item--hasDrawer')){
        var item = $(this).attr("id").split("_")[1];

        $(".nav>*").removeClass("nav__item--selected");
        $(this).addClass("nav__item--selected");

        $(".pages").addClass("displayNone");
        $(".pages." + item).removeClass("displayNone");

        if(!initialized[item]){
            Nav_function[item]();
        }
    }
})

$(".nav__drawer__item").click(function(){
    var item = $(this).attr("id").split("_")[1];

    $(".nav>*").removeClass("nav__item--selected");
    $(this).parent().parent().addClass("nav__item--selected");

    $(".nav__drawer__item").removeClass("nav__drawer__item--selected")
    $(this).addClass("nav__drawer__item--selected");

    $(".pages").addClass("displayNone");
    $(".pages." + item).removeClass("displayNone");

    if (!initialized[item]) {
        Nav_function[item]();
    }
})