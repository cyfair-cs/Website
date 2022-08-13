class Announcement {
    title;
    text;
    date;

    // optional image link
    imagelink;
    image_alt_text;

    constructor (title, text, imagelink, image_alt_text, date = new Date()) {
        this.title = title;
        this.text = text;
        this.date = date;
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
        `<div class=\"announcement\" id=\"announcement${index}\">` +

        // Title
        `   <span class=\"announcement-title\">${this.title}</span>` +

        // Date
        `   <span class=\"announcement-date\">${this.date.toDateString()}</span>` +

        // Body Text
        `   <div class=\"body\">` +

        // Optional Image Link
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
        new Announcement("Hello,", "World!"),
        new Announcement("This is", "an announcement!"),
        new Announcement("I love", "to code!"),
        new Announcement("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "res/img/logo.png", "CFCSC LOGO"),
        new Announcement("GO CYFAIR!", "This should be an image of the CyFair Computer Science Club\'s logo", "res/img/logo.png", "CFCSC LOGO")
    ];
    
    const ancmnts_block = document.getElementById('announcements');

    for (let x = 0; x < 10; x++)
    for (let i = 0; i < ancments_db.length; i++)
        ancmnts_block.innerHTML += ancments_db[i].getHTMLComponent(i);
    console.log('Loaded Announcements.');
}

window.addEventListener('load', load_announcements());