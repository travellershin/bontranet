var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        toast(`${user.displayName}님 안녕하세요`);
        initWork();
        localStorage.user = user.email.split("@")[0];
    } else {
      // No user is signed in.
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // The signed-in user info.
            var user = result.user;
            toast(`${user.displayName}님 안녕하세요`);
            initWork();
            if(!localStorage.isCome){
                localStorage.isCome = false;
            }
            localStorage.user = user.email.split("@")[0];
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            if(error.code === "auth/popup-closed-by-user"){
                toast("로그인 팝업창이 닫혔습니다. 새로고침해 다시 로그인 해주세요");
            }
        });
    }
});

$("#nav_logOut").click(function(){

    if(localStorage.isCome === "true"){
        toast("퇴근처리를 먼저 해주세요");
    }else{
        firebase.auth().signOut().then(function() {
            toast("정상적으로 로그아웃 되었습니다.");
          }).catch(function(error) {
            // An error happened.
          });
    }
});

function initWork(){
    if(localStorage.isCome === "true"){
        $("#at__btn-tg").removeClass("displayNone");
    }else{
        $("#at__btn").removeClass("displayNone");
    }
}


  