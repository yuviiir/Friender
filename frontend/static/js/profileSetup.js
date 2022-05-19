var profileSetupform = document.querySelector("#profileSetupform");
var genderSelected;
var bio;
var interestSelected =[];
var bioLength=0;
var image_input = document.querySelector("image_input");
var uploaded_image ="";
var output;
var loadFile;
var validated = true;
var submitData;
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
    console.log(photoStr);
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
    console.log(genderSelected);
    
}

function SelectInterest(interest)
{
    var interestIndex = interestSelected.indexOf(interest);
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
               document.getElementById(interest).style.backgroundColor = 'Gold'; 
             }
        }
        console.log(interestSelected, "length", interestSelected.length);
    
   
}
 

function UpdateBio(bioText){
  bio = bioText;
  bioLength = bioText.length;
  console.log(bio,"length:", bioLength);
}

function validation()
{
    let validatedPhoto;
    let validatedBio;
    let validatedInterests;
    let validatedGender;

    var noInterestsRemaining = 4-interestSelected.length;
    if(genderSelected==null)
    {
        alert("Please select your gender preference");
        validatedGender=false;
    }
    else
      validatedGender=true;

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

    if(validatedBio==true && validatedGender==true && validatedInterests==true && validatedPhoto==true)
      submitData=true;
    else
      submitData=false;


}
function submitProfile() {

    validation();
    console.log(submitData)
    if(submitData == true)
        alert("data being sent to BE");
}