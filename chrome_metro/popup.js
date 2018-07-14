let taRank = 0;
let txt = "";
let url = ""

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    txt = request.source

    chrome.tabs.query({
        active:true,
        currentWindow:true
    },function(tabs){
        url = tabs[0].url;
    })
  }
});

$(".select__city").change(function(){
    $(".start").attr("id", $(this).val());
})

$(".start").click(function(){
    Main.init($(this).attr("id"));
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
        firebase.database().ref("setting/cities").once("value", snap => {
            let data = snap.val();
            $(".site").html("도시를 선택해주세요");

            let txt = ''

            for (var i = 0; i < data.length; i++) {
                txt += '<option value="'+data[i].code+'">'+data[i].name+'</option>'
            }
            $(".select__city").html(txt);
            $(".start").attr("id", "nyc");

            chrome.tabs.executeScript(null, {
              file: "getPagesSource.js"
            })
        })

      } else {
        // No user is signed in.
        firebase.auth().signInWithPopup(provider).then(function(result) {
            firebase.database().ref("setting/cities").once("value", snap => {
                let data = snap.val();
                $(".site").html("도시를 선택해주세요");

                let txt = ''

                for (var i = 0; i < data.length; i++) {
                    txt += '<option value="'+data[i].code+'">'+data[i].name+'</option>'
                }
                $(".select__city").html(txt);
                $(".start").attr("id", "nyc");

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
