let taRank = 0;
let txt = "";
let url = "";


chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    txt = request.source;

    chrome.tabs.query({
        active:true,
        currentWindow:true
    },function(tabs){
        url = tabs[0].url;

        detectSite(url);
    });
  }
});

$(".start").click(function(){
    if($(".site").attr("id")==="unknown"){
        alert("여행정보 사이트가 감지되지 않습니다.")
    }else{

        switch ($(".site").attr("id")) {
            case "visa": parse_visa.init();
                break;

            case "master": parse_master.init();
                break;

            default: return false;

        }
    }
})

function onWindowLoad() {

    var config = {
        apiKey: "AIzaSyBKgdEC20ODa-miFUXStyYmAdyoY4FzOc0",
        authDomain: "intranet-efcad.firebaseapp.com",
        databaseURL: "https://intranet-efcad.firebaseio.com",
        projectId: "intranet-efcad",
        storageBucket: "",
        messagingSenderId: "141304382157"
    };
    firebase.initializeApp(config);

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log(user)
            chrome.tabs.executeScript(null, {
              file: "getPagesSource.js"
            })

      } else {
        // No user is signed in.
        firebase.auth().signInWithPopup(provider).then(function(result) {
            firebase.database().ref().once("value", snap => {
                chrome.tabs.executeScript(null, {
                  file: "getPagesSource.js"
                })
            })
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log(error.message)
        });
      }
    });


}

window.onload = onWindowLoad;


function detectSite(url){
    if(url.indexOf("visa")>-1){
        $(".site").html("비자카드가 감지되었습니다.")
        $(".site").attr("id","visa");
    }else if(url.indexOf("mastercard")>-1){
        $(".site").html("마스터카드가 감지되었습니다.")
        $(".site").attr("id","master");
    }else{
        $(".site").html("여행정보 사이트가 감지되지 않습니다.")
    }
}
