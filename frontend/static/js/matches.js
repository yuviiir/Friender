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
       section.onclick = () => openChatPopup(matches[i].userID);
       const profileImg = document.createElement('img');
       profileImg.src=matches[i].img_url
       profileImg.className='profile-img';
       section.appendChild(profileImg)
       document.getElementById("amc").appendChild(section);

    }
}

function openChatPopup(userID) {
    console.log(userID)
}

window.onload=addMatches(getMatches());
console.log(getMatches());