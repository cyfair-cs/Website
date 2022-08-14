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
    }

    const header = document.getElementById('global-header');
    let full_header_text = '';
    headertext.forEach((elem) => {
        full_header_text += elem;
    });
    header.innerHTML = full_header_text;
}

function load_footer() {
    document.getElementById('global-footer').innerHTML = `<span id="footer-copyright">CFCSC does not own and is not affiliated with Discord, Remind, PCSquared, the Matrix,  or any other company/business that might claim copyright on any content mentioned on this website. Please don't sue us; we are highschoolers.</span>`;

    // on each page, if user has correct permissions (club officer), then it will allow them to use 
    // an edit button
}

window.addEventListener('load', () => {
    load_header();
    load_footer();
})