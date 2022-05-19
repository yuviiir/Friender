let profileSetupform = document.querySelector("#profileSetupform");
let genderSelected;
let myGenderSelected;
let bio;
let interestSelected =[];
let interestIdSelected =[];
let bioLength=0;
let image_input = document.querySelector("image_input");
let uploaded_image ="";
let output;
let loadFile;
let validated = true;
let submitData;
let form = document.querySelector('#upload');
let file = document.querySelector('#file');
let app = document.querySelector('#app');
let photoStr;

/**
 * Log the uploaded file to the console
 * @param {event} Event The file loaded event
 */
function logFile (event) {
    photoStr = event.target.result; 
}

/**
 * Handle submit events
 * @param  {Event} event The event object
 */
function handleSubmit (event) {
    event.preventDefault();
    if (!file.value.length) return;
    let reader = new FileReader();
    reader.onload = logFile;
    reader.readAsDataURL(file.files[0]);
}
form.addEventListener('submit', handleSubmit);

function SelectGender(gender){
    if(genderSelected)
       document.getElementById(genderSelected).classList.remove('Interest_button_selected');
        
    document.getElementById(gender).classList.add('Interest_button_selected');
    genderSelected=gender;
    
}

function SelectMyGender(gender){
    if(myGenderSelected)
       document.getElementById(myGenderSelected).classList.remove('Interest_button_selected');
        
    document.getElementById(gender).classList.add('Interest_button_selected');
    myGenderSelected=gender;   
}

function SelectInterest(interest, id)
{
    let interestIndex = interestSelected.indexOf(interest);
    if (interestIndex > -1) {
        //document.getElementById(interest).classList.remove('Interest_button_selected');
        document.getElementById(interest).style.backgroundColor = '#ffe497';
        interestSelected.splice(interestIndex, 1);
    }
    else
    { 
            if(interestSelected.length+1>4)
            {
                alert("You can only pick 4 interests");
            }
            else
            {
            //document.getElementById(interest).classList.add('Interest_button_selected');
            interestSelected.push(interest);
            document.getElementById(interest).style.backgroundColor = '#FFC000'; 
            }
    }
    let interestIdIndex = interestIdSelected.indexOf(id);
    if (interestIdIndex > -1) {
        interestIdSelected.splice(interestIdIndex, 1);
    }
    else
    { 
        interestIdSelected.push(id);
    }
    console.log(interestSelected, interestIdSelected)
}
 

function UpdateBio(bioText){
  bio = bioText;
  bioLength = bioText.length;
}

function validation()
{
    let validatedPhoto;
    let validatedBio;
    let validatedInterests;
    let validatedGender;
    let validatedMyGender;

    let noInterestsRemaining = 4-interestSelected.length;
    if(genderSelected==null)
    {
        alert("Please select your gender preference");
        validatedGender=false;
    }
    else
      validatedGender=true;
    if(myGenderSelected==null)
    {
        alert("Please select your gender");
        validatedMyGender=false;
    }
    else    
        validatedMyGender=true;

    if(bio==null)
    {
        alert("Please enter a Bio for your profile")
        validatedBio=false;
    }
    else
        validatedBio=true;

    if(noInterestsRemaining>=1)
    {
        alert("Please select " + noInterestsRemaining +" more interests" );
        validatedInterests=false;
    }
    else
        validatedInterests=true;

    if(photoStr==null)
    {
        alert("Please select upload a profile photo" );
        validatedPhoto=false;
    }
    else
    {
        validatedPhoto=true;
    }

    if(validatedBio==true && validatedGender==true && validatedMyGender==true && validatedInterests==true && validatedPhoto==true)
      submitData=true;
    else
      submitData=false;


}
function submitProfile() {
    let genderId;
    let myGenderId;
    switch (genderSelected) {
        case 'women':
            genderId = 1
            break;
        case 'men':
            genderId = 2
            break;
        case 'non-binary':
            genderId = 3
            break;
        default:
            genderId = null
            break;
    }
    switch (myGenderSelected) {
        case 'women':
            myGenderId = 1
            break;
        case 'men':
            myGenderId = 2
            break;
        case 'non-binary':
            myGenderId = 3
            break;
        default:
            myGenderId = null
            break;
    }

    validation();
    let payload = {
        bio: bio,
        profilePictureURL: photoStr,
        userId: JSON.parse(sessionStorage.getItem("userDetails")).userId,
        lookingFor: genderId,
        gender: myGenderId
    }
    document.getElementById('overlay').style.display = "block";
    if(submitData == true)
        axios({
            method: "POST",
            url: `http://localhost:3002/api/postUserProfileDetails`,
            data: payload
        }).then((data) => {
            console.log(data)
            if (data.data.message === 'success')
                submitInterests();
        }).catch((err) => {
            document.getElementById('overlay').style.display = "none";
            console.log("help", err);
        })
    
}

function submitInterests() {
    let interestPayload = {
        userId: JSON.parse(sessionStorage.getItem("userDetails")).userId,
        interests: interestIdSelected
    }
    axios({
        method: "POST",
        url: `http://localhost:3002/api/insertInterest`,
        data: interestPayload
    }).then((data) => {
        console.log(data)
        if (data.data.message === 'success')
            window.location.href = "/home";
    }).catch((err) => {
        document.getElementById('overlay').style.display = "none";
        console.log("help", err);
    })
}

function populateInterests() {
    axios({
        method: "GET",
        url: `http://localhost:3002/api/interestOptions`,
    }).then((data) => {
        let interestsSection = document.getElementById("interestsSection");
        data.data.map((interest) => {
            let interestButton = document.createElement('button');
            interestButton.className = "btn";
            interestButton.id = interest.interestDescription;
            interestButton.onclick = () => SelectInterest(interest.interestDescription, interest.interestId);
            interestButton.innerText = interest.interestDescription;
            interestsSection.appendChild(interestButton);
        });
    }).catch((err) => {
        console.log("help", err);
    })
}

populateInterests();