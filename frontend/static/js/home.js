let potentialFriends;

function getPotentialFriends(userId) {
        axios({
            method: "GET",
            url: `http://localhost:3002/api/getFriends/`,
            params: {userId: userId}
        }).then((res) => {
            potentialFriends = res.data
            renderNextUser()
        }).catch((err) => {
            console.log("help", err);
        })
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
        profileImage.src = nextUser.profilePictureURL;
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
        nameDetail.innerText = nextUser.firstName + ", " + nextUser.userAge
        detailsSection.appendChild(nameDetail);
        let bioDetail = document.createElement("section");
        bioDetail.className = "bio-detail";
        bioDetail.innerText = nextUser.bio;
        detailsSection.appendChild(bioDetail);
        let interestsDetails = document.createElement("article");
        interestsDetails.className = "interests-details";
        let interestDetail = document.createElement("section");
        interestDetail.className = "interest";
        interestDetail.innerText = nextUser.interestDescription;
        interestsDetails.appendChild(interestDetail);
        // nextUser.interests.map((interest) => {
        // });
        detailsSection.appendChild(interestsDetails);
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

getPotentialFriends(1)