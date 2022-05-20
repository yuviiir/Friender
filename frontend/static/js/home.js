let overlay = document.getElementById("overlay");
let popup = document.getElementById("matchPopup");
let image = document.getElementById("popupImage");
let potentialFriends = [];
let userId = JSON.parse(sessionStorage.getItem("userDetails"))?.userId;

if (!userId) {
    window.location.href = "/";
}

function getPotentialFriends() {
        axios({
            method: "GET",
            url: `http://ec2-3-82-51-192.compute-1.amazonaws.com:3002/api/getFriends/`,
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
        likeButton.onclick = () => likeUser(nextUser.userId);
        let dislikeButton = document.createElement("img");
        dislikeButton.src = "static/images/cross.png";
        dislikeButton.onclick = () => dislikeUser(nextUser.userId);
        buttonsSection.appendChild(dislikeButton);
        buttonsSection.appendChild(likeButton);
        pictureSection.appendChild(buttonsSection);
        let detailsSection = document.createElement("section");
        detailsSection.className = "details-section";
        let nameDetail = document.createElement("h1");
        nameDetail.className = "name-detail";
        nameDetail.innerText = nextUser.firstName;
        detailsSection.appendChild(nameDetail);
        if (nextUser.userAge) {
          let ageDetail = document.createElement("h1");
          ageDetail.className = "age-detail";
          ageDetail.innerText = `${nextUser.userAge}`
          detailsSection.appendChild(ageDetail);
        }
        let bioDetail = document.createElement("section");
        bioDetail.className = "bio-detail";
        bioDetail.innerText = nextUser.bio;
        detailsSection.appendChild(bioDetail);
        let interestsDetails = document.createElement("article");
        interestsDetails.className = "interests-details";
        let interests = nextUser.interests.split(", ");
        interests.map((interest) => {
            let interestDetail = document.createElement("section");
            interestDetail.className = "interest";
            interestDetail.innerText = interest;
            interestsDetails.appendChild(interestDetail);
        });
        detailsSection.appendChild(interestsDetails);
        mainSection.appendChild(pictureSection);
        mainSection.appendChild(detailsSection);
    }
}

function likeUser(friendId) {
    axios({
        method: "POST",
        url: `http://ec2-3-82-51-192.compute-1.amazonaws.com:3002/api/like/`,
        data: {
            userId: userId,
            friendId: friendId
        }
    }).then((res) => {
        if (res.data.match) 
            openPopup();
        nextUser();
    }).catch((err) => {
        console.log("help", err);
    })
}

function openPopup() {
    overlay.style.display = 'block';
    popup.style.display = 'block';
    image.src = potentialFriends[0].profilePictureURL;
}

function closePopup() {
    overlay.style.display = 'none';
    popup.style.display = 'none';
}


function dislikeUser(friendId) {
    axios({
        method: "POST",
        url: `http://ec2-3-82-51-192.compute-1.amazonaws.com:3002/api/dislike/`,
        data: {
            userId: userId,
            friendId: friendId
        }
    }).then((res) => {
        nextUser();
    }).catch((err) => {
        console.log("help", err);
    })
}

function nextUser() {
    potentialFriends.shift();
    renderNextUser()
}


getPotentialFriends(JSON.parse(sessionStorage.getItem("userDetails")).userId)
