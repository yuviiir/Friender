let potentialFriends = [
    {
        userID: 1,
        name: "Yuvir Sharma",
        interests: ["Dogs", "One Direction", "Marvel", "F1", "Taylor Swift"],
        bio: "This is a bio. Lol.",
        age: 21,
        profilePicture: "static/images/profilePictures/profile1.png"
    },
    {
        userID: 1,
        name: "Jared Mcmillan",
        interests: ["Cats", "Movies", "DC", "Gaming"],
        bio: "Hello, my name is Jerrry",
        age: 23,
        profilePicture: "static/images/profilePictures/profile2.png"
    },
    {
        userID: 1,
        name: "Lorde",
        interests: ["Lizards", "TV", "F1", "Lorde"],
        bio: "I am my mothers child *shhhh*",
        age: 22,
        profilePicture: "static/images/profilePictures/profile3.png"
    }
]

function getPotentialFriends() {
    // get potential friends api
}

function renderNextUser() {
    let mainSection = document.getElementById("homeSection");
    mainSection.innerText = "";
    if (potentialFriends.length < 1) {
        let noFriends = document.createElement("h2");
        noFriends.innerText = "No more friends to show.";
        mainSection.appendChild(noFriends);
    }
    else {
        let nextUser = potentialFriends[0];
        let pictureSection = document.createElement("section");
        pictureSection.className = "picture-section";
        let profileImage = document.createElement("img");
        profileImage.className = "profile-image";
        profileImage.src = nextUser.profilePicture;
        pictureSection.appendChild(profileImage);
        let buttonsSection = document.createElement("section");
        buttonsSection.className = "button-section";
        let likeButton = document.createElement("img");
        likeButton.className = "image-button";
        likeButton.src = "static/images/heart.png";
        likeButton.onclick = () => likeUser(nextUser.userID);
        let dislikeButton = document.createElement("img");
        dislikeButton.src = "static/images/cross.png";
        dislikeButton.onclick = () => dislikeUser(nextUser.userID);
        buttonsSection.appendChild(dislikeButton);
        buttonsSection.appendChild(likeButton);
        pictureSection.appendChild(buttonsSection);
        let detailsSection = document.createElement("section");
        detailsSection.className = "details-section";
        let nameDetail = document.createElement("h1");
        nameDetail.className = "name-detail";
        nameDetail.innerText = nextUser.name + ", " + nextUser.age
        detailsSection.appendChild(nameDetail);
        mainSection.appendChild(pictureSection);
        mainSection.appendChild(detailsSection);
    }
}

function likeUser(userID) {
    // like api
    console.log("like", userID)
    nextUser();
}

function dislikeUser(userID) {
    // dislike api
    console.log("dislike", userID)
    nextUser();
}

function nextUser() {
    potentialFriends.shift();
    renderNextUser()
}

renderNextUser()