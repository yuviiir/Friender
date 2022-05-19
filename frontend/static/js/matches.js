const msg = document.querySelector('[data-msg]');
const conversation = document.querySelector('[data-conversations]')
const socket = io();
let currentUserName;


const getMatches = () =>
{
    const matches =
    [
    {
        name:"ruby",
        userID: "1",
        location:"Johannesburg",
        img_url:"static/images/pr.jpg",
        bio: "I Like to live and laugh"
    },
    {
        name:"James",
        userID: "2",
        location:"Cape Tow",
        img_url:"static/images/pr.jpg",
        bio: "I love long walks and music"
    }
    // {
    //     name:"James",
    //     location:"Cape Tow",
    //     img_url:"static/images/pr.jpg",
    //     bio: "I love long walks and music"
    // },
    // {
    //     name:"ruby",
    //     location:"Johannesburg",
    //     img_url:"static/images/pr.jpg",
    //     bio: "I Like to live and laugh"
    // },
    // {
    //     name:"James",
    //     location:"Cape Tow",
    //     img_url:"static/images/pr.jpg",
    //     bio: "I love long walks and music"
    // }
    ];
    return matches;
}

const addMatches = (matches)=> {
    for (let i=0; i <matches.length; i++)
    {
       const section= document.createElement('section')
       section.className='match-item'
       section.onclick = () => openChatPopup(matches[i].id, matches[i].name);
       const profileImg = document.createElement('img');
       profileImg.src=matches[i].img_url
       profileImg.id='profile-img';
       section.appendChild(profileImg)
       document.getElementById("all-matches-container").appendChild(section);
       console.log(section + "jshdhfj")
       console.log(section + '');
    }
}

function openChatPopup(id, name) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('chatPopup').style.display = "block";
    console.log(id);
    currentUserName = name;


    
}

window.onload=addMatches(getMatches());
console.log(getMatches());

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

//     for (let i=0; i <matches.length; i++)
//     {
//        const section= document.createElement('section')
//        section.className='match-item'
//        section.onclick = () => openChatPopup(matches[i].userID);
//        const profileImg = document.createElement('img');
//        profileImg.src=matches[i].img_url
//        profileImg.id='profile-img';
//        section.appendChild(profileImg)
//        document.getElementById("matches-container").appendChild(section);
//        console.log(section + "jshdhfj")
//        console.log(section + '');
//     }
// }

// function openChatPopup(userID) {
//     console.log(userID)
// }

// window.onload=addMatches(getMatches());
// console.log(getMatches());
