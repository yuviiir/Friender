let profile;
// let profile=null;
const getProfileData = () => {
    axios ({
        method : "GET",
        url : `http://localhost:3002/api/getUserProfileDetails`,
        params: {
            userId: JSON.parse(sessionStorage.getItem("userDetails")).userId
        }
    }).then  ((data) => {
        profile = data.data;
    }).catch ((err)=> {
        console.log(err)
    })
}

const populateProfileData = () => {
    getProfileData();
    console.log(profile)
    const main_info_name = document.getElementById('main-info-id')
    main_info_name.appendChild(document.createTextNode(`${profile.firstName}`))
    const main_info_age = document.getElementById('main-info-Age')
    main_info_age.appendChild(document.createTextNode(` ${profile.userAge}`))
    const bio_section = document.getElementById('bio-id')
    bio_section.appendChild(document.createTextNode(`${profile.bio}`))
    const interests_button_container = document.getElementById('interests-buttons-id')

    const interests= profile.interests
    for (let i=0; i <interests.length; i++) {
        const interest_button =document.createElement('button')
        interest_button.appendChild(document.createTextNode(`${interests[i]}`))
        interest_button.className='interest_button'
        interests_button_container.appendChild(interest_button)
    }

    const show_me_buttons = document.getElementById('show-me-container-id')

    const show_me =profile.show_me
    for (let i=0; i< show_me.length; i++) {
        const show_me_button = document.createElement('button')
        show_me_button.appendChild(document.createTextNode(`${show_me[i]}`))
        show_me_button.className='interest_button show-me-button'
        show_me_buttons.appendChild(show_me_button)

    }
}


window.onload=populateProfileData();