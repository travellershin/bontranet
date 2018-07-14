import Attend from "./modules/attend.js";
import City from "./modules/city.js";
import Subway from "./modules/subway.js";
import Account from "./modules/account.js";

let uninflated = {
    attend:true,
    city:true
}

let u_i = {
    mail:"",
    name:"",
    grade:0
}

$("#nav_attend").click(function(){
    $("header li").removeClass("--selected");
    $(this).addClass("--selected");
    $(".pages").addClass("displayNone");
    $(".pages.attend").removeClass("displayNone")
    if(uninflated.attend){
        Attend.init(u_i.mail, u_i.name, u_i.grade);
        uninflated.attend = false;
    }
})
$("#nav_city").click(function(){
    $("header li").removeClass("--selected");
    $(this).addClass("--selected");
    $(".pages").addClass("displayNone");
    $(".pages.city").removeClass("displayNone")
    if(uninflated.city){
        City.init(u_i.mail, u_i.name, u_i.grade);
        uninflated.city = false;
    }
})
$("#nav_subway").click(function(){
    $("header li").removeClass("--selected");
    $(this).addClass("--selected");
    $(".pages").addClass("displayNone");
    $(".pages.subway").removeClass("displayNone")
    Subway.init();
})



$(document).ready(function(){

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          let userMail = user.email.split('@')[0]
          firebase.database().ref("users").once("value", snap => {
              let userData = snap.val();
              if(userData[userMail]){
                  if(userData[userMail].uid = user.uid){
                      u_i.mail = userMail;
                      u_i.name = user.displayName;
                      u_i.grade = userData[userMail].grade*1
                      Attend.init(u_i.mail, u_i.name, u_i.grade);
                      // City.init(u_i.mail, u_i.name, u_i.grade);
                      if(u_i.grade === 5){
                          Account.init(user.mail);
                      }
                      uninflated.attend = false;
                      login(u_i.name);
                  }else{
                      alert("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요")
                  }
              }else{
                  alert("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요")
              }
          })
        // User is signed in.

      } else {
        // No user is signed in.
        firebase.auth().signInWithPopup(provider).then(function(result) {
            user = result.user;
            let userMail = user.email.split('@')[0]
            firebase.database().ref("users").once("value", snap => {
                let userData = snap.val();
                if(userData[userMail]){
                    if(userData[userMail].uid = user.uid){
                        u_i.mail = userMail;
                        u_i.name = user.displayName;
                        u_i.grade = userData[userMail].grade*1
                        Attend.init(u_i.mail, u_i.name, u_i.grade);
                        uninflated.attend = false;
                        login(u_i.name);
                    }else{
                        alert("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요")
                    }
                }else{
                    alert("데이터 열람 권한이 없습니다. 관리자에게 문의해주세요")
                }
            })
          // ...
        }).catch(function(error) {
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
