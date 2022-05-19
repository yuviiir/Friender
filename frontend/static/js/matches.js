const msg = document.querySelector('[data-msg]');
const conversation = document.querySelector('[data-conversations]')
const socket = io();


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
       section.onclick = () => openChatPopup(matches[i].name);
       const profileImg = document.createElement('img');
       profileImg.src=matches[i].img_url
       profileImg.id='profile-img';
       section.appendChild(profileImg)
       document.getElementById("matches-container").appendChild(section);
       console.log(section + "jshdhfj")
       console.log(section + '');
    }
}

function openChatPopup(name) {
    console.log(name)
    let popupHeade
    
}

window.onload=addMatches(getMatches());
console.log(getMatches());

// enabling the chat functionality

socket.on('message', message=>{
    console.log(message);
    outputMessage(message);

    conversation.scrollTop = conversation.scrollHeight;
});


function sendMessage(){
    let txtmsg = msg.value;
    //emitting the message to the server
    socket.emit('chatMessage', txtmsg);

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
