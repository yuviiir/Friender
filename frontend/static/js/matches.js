const msg = document.querySelector('[data-msg]');
const conversation = document.querySelector('[data-conversations]')
const socket = io();
let currentUserName;


function openChatPopup(id, name) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('chatPopup').style.display = "block";
    console.log(id);
    currentUserName = JSON.parse(sessionStorage.getItem("userDetails")).firstName;
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
const getMatches = () =>
{
    const matches =
    [
    {
        name:"ruby",
        userID: "1",
        location:"Johannesburg",
        img_url:"static/images/pp.png",
        bio: "I Like to live and laugh"
    },
    {
        name:"James",
        userID: "2",
        location:"Cape Tow",
        img_url:"static/images/pp.png",
        bio: "I love long walks and music"
    }
    ];
    return matches;
}

const addMatches = (matches)=> {

    for (let i=0; i <matches.length; i++)
    {
       const section= document.createElement('section')
       section.className='match-item'
       section.onclick = () => openChatPopup(matches[i].userID, matches[i].name);
       const profileImg = document.createElement('img');
       profileImg.src=matches[i].img_url
       profileImg.className='profile-img';
       section.appendChild(profileImg)
       document.getElementById("amc").appendChild(section);

    }
}



window.onload=addMatches(getMatches());
console.log(getMatches());
