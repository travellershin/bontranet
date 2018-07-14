console.log("Starting app.js");

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js')

console.log('rerult:' + notes.add(7,9))

// var user = os.userInfo();
// fs.appendFileSync('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`);
//첫번째: 파일명, 두번째: 안에 들어갈 txt; -> 파일명(없으면 만듬)에 txt를 append한다.
