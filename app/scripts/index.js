import Attend from "./modules/attend.js";

$(document).ready(function(){

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          let userMail = user.email.split('@')[0]
          firebase.database().ref("users").once("value", snap => {
              let userData = snap.val();
              if(userData[userMail]){
                  if(userData[userMail].uid = user.uid){
                      Attend.init(userMail, user.displayName, userData[userMail].grade);
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
                        Attend.init(userMail, user.displayName, userData[userMail].grade);
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
