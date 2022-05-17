let path = window.location.pathname;

let allLinksArray = [
    {
        name: "Find Friends",
        href: "/home"
    },
    {
        name: "Matches",
        href: "/matches"
    },
    {
        name: "Profile",
        href: "/profile"
    }, 
    {
        name: "Logout",
        onclick: () => logout()
    },
]

let indexLinksArry = [
    {
        name: "Login",
        onclick: () => openPopup('login')
    },
    {
        name: "Create account",
        onclick: () => openPopup('create')
    }
]

function logout() {
    window.location.href = "/";
}

function loadNav() {
    let head = document.head;
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "static/css/nav.css";
    head.appendChild(link);
    let body = document.body;
    let linksArray = path === "/" ? indexLinksArry : allLinksArray;
    let header = document.createElement("header");
    let nav = document.createElement("nav");
    let aside = document.createElement("aside");
    aside.className = "nav-logo";
    let h1 = document.createElement("h1");
    h1.innerText = "Friender";
    aside.appendChild(h1);
    nav.appendChild(aside);
    let ul = document.createElement("ul");
    ul.className = "nav-buttons";

    linksArray.map((link) => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.innerText = link.name;
        if (link.onclick)
            a.onclick = link.onclick;
        if (link.href)
            a.href = link.href;
        li.appendChild(a);
        ul.appendChild(li);
    })

    nav.appendChild(ul);
    header.appendChild(nav);
    body.appendChild(header);
}

loadNav();