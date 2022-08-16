class Announcement {
    title;
    text;
    date;

    // optional image link
    imagelink;
    image_alt_text;

    // all input as strings
    constructor (title, text, imagelink, image_alt_text, date) {
        this.title = title;
        this.text = text;
        this.date = date === undefined ? new Date() : new Date(date);
        this.imagelink = imagelink;
        this.image_alt_text = image_alt_text;
    }

    // converts this announcement
    // into an html component for rendering
    /**
     * TODO: add a max character limit for initial rendering (500 or less?)
     * before shortening to use a ... at the end, where when the announcement
     * card is clicked it enlargens so that it is fully readable.
     */
    getHTMLComponent(index) {
        return `` +
        `<div class=\"announcement card\" id=\"announcement${index}\">` +
        `   <span class=\"announcement-title\">${this.title}</span>` +
        `   <span class=\"announcement-date\">${this.date.toLocaleDateString('en-us')}</span>` +
        `   <div class=\"body\">` +
        ((this.imagelink == undefined || this.imagelink == null) ? '' :
        `       <img src=\"${this.imagelink}\" alt=\"${this.image_alt_text}\"> <br>`) +
        `       <span class=\"announcement-text\">${this.text}</span>` +
        `   </div>` +
        `</div>`;
    }
}

/**
 * load all stored announcements
 * ideally going to work with a database,
 * but until the backend is setup, it will
 * be tested with an array
 */
 function load_announcements() {
    const ancments_db = [
        new Announcement("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "../res/img/announcement/logo.png", "CFCSC LOGO"),
        new Announcement('2021 District Competition', 'Depicted in the photo, you can see our 2021 district runner-up UIL Computer Science team! On the far left is our former president, Gavin Joyce, who placed 5th Individually, in the middle you can see our current president, Carson Stark, and on the right is the VP, Steven Nguyen, who placed 4th individually.', '../res/img/announcement/2021comp.png', '2021 District Competition')
    ];

    const ancmnts_block = document.getElementById('announcements');

    for (let i = 0; i < ancments_db.length; i++)
        ancmnts_block.innerHTML += ancments_db[i].getHTMLComponent(i);
    console.log('Loaded Announcements.');
}

window.addEventListener('load', load_announcements());
