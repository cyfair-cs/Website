function load_header() {
    const headertext = [
        `<img src="../res/img/logo.png" alt="logo">`,
        `<span id="header-title">CFCSC</span>`,

        // links
        `<a href="/">Home</a>`,
        `<a href="/about">About Us</a>`,
        `<a href="/important-links">Important Links</a>`,
        `<a href="/competitions">Competitions</a>`,
        `<a href="/meetings">Meetings</a>`,
        `<a href="/presentations">Presentations</a>`,
        `<a href="/resources">Resources</a>`,

        // oauth
        `<div id="oauth-login"></div>`
    ]

    // determines with link is the current page
    switch (window.location.pathname) {
        case '/':
            headertext[2] = `<a selected>Home</a>`;
            break;
        case '/about':
            headertext[3] = `<a selected>About Us</a>`;
            break;
        case '/important-links':
            headertext[4] = `<a selected>Important Links</a>`;
            break;
        case '/competitions':
            headertext[5] = `<a selected>Competitions</a>`;
            break;
        case '/meetings':
            headertext[6] = `<a selected>Meetings</a>`;
            break;
        case '/presentations':
            headertext[7] = `<a selected>Presentations</a>`;
            break;
        case '/resources':
            headertext[8] = `<a selected>Resources</a>`;
            break;
    }

    const header = document.getElementById('global-header');
    let full_header_text = '';
    headertext.forEach((elem) => {
        full_header_text += elem;
    });
    header.innerHTML = full_header_text;
    console.log('Loaded header.');
}

function load_footer() {
    document.getElementById('global-footer').innerHTML = `` +
    `<span id="footer-copyright">CFCSC 2022-23</span>` + 
    `<a href="https://github.com/CFCSC-Development/Website" id="repo-link">Source Code</a>` +
    `<span id="credit">Made by <a href="https://github.com/ViperTools">Caleb Boatcallie</a> and <a href="https://github.com/nickelulz">Mufaro Machaya</a></span>`;
    console.log('Loaded footer.');
}

window.addEventListener('load', () => {
    load_header();
    load_footer();
})