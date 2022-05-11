var overlay = document.getElementById("overlay");
var popup = {
    login: document.getElementById("popup-login"),
    create: document.getElementById("popup-create"),
}

function openPopup(type) {
    overlay.style.display = 'block';
    popup[type].style.display = 'block';
}

function closePopup (type) {
    overlay.style.display = 'none';
    popup[type].style.display = 'none';
}