// const { AlexaForBusiness } = require("aws-sdk");

const msg = document.querySelector('[data-msg]');
const conversation = document.querySelector('[data-conversations]')
const socket = io();
let currentUserName;
let userId = JSON.parse(sessionStorage.getItem("userDetails"))?.userId;

if (!userId) {
    window.location.href = "/";
}

let selectedchatid;

function openChatPopup(id, name) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('chatPopup').style.display = "block";
    console.log(id);
    currentUserName = JSON.parse(sessionStorage.getItem("userDetails")).firstName;
    selectedchatid = id;

        axios({
            method: 'GET',
            url: 'http://localhost:3002/api/messages',
            params: {
              recipientId : selectedchatid,
              senderId : JSON.parse(sessionStorage.getItem("userDetails")).userId
            }
        }).then ((data) => {
          console.log(data)
          }).catch ((err)=> {
          console.log(err)
      })

}


// enabling the chat functionality

socket.on('message', message=>{
    outputMessage(message);
    conversation.scrollTop = conversation.scrollHeight;
});


function sendMessage(){
    let txtmsg = msg.value;
    //emitting the message to the server
    socket.emit('chatMessage', txtmsg, currentUserName);
    msg.value = '';
    msg.focus();
    
        axios({
            method: 'POST',
            url: 'http://localhost:3002/api/message',
            data: {
              recipientId : selectedchatid,
              senderId : JSON.parse(sessionStorage.getItem("userDetails")).userId,
              message: txtmsg,
              dateSent: '13:11 am'
            }
        }).then ((data) => {
          console.log(data)
          }).catch ((err)=> {
          console.log(err)
      })
  }






function outputMessage(message){
    const section = document.createElement('section');
    section.classList.add('message');
    section.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('[data-conversations]').appendChild(section);
}

function closePopup(){
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('chatPopup').style.display = "none";
}
let matches= null;
const getMatches = () =>
{
    axios({
        method: "GET",
        url: `http://localhost:3002/api/getMatches`,
        params: {
           userId: JSON.parse(sessionStorage.getItem("userDetails")).userId,
        }
    }).then((data) => {
        matches=data.data;
        populateMatches();

    }).catch((err) => {
        overlay2.style.display = 'none';
        console.log("help", err);
    })
}

const populateMatches = ()=> {

    for (let i=0; i <matches.length; i++)
    {
       const section= document.createElement('section')
       section.className='match-item'
       section.onclick = () => openChatPopup(matches[i].userId, matches[i].firstName);
       const profileImg = document.createElement('img');
       profileImg.src=matches[i].img_url
       profileImg.className='profile-img';
       section.appendChild(profileImg)
       document.getElementById("amc").appendChild(section);

    }
}



window.onload=getMatches();
