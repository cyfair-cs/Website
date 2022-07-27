class Announcement {
    title;
    text;
    date;

    // optional image link
    imagelink;
    image_alt_text;

    constructor (title, text, imagelink, image_alt_text, date = Date.now()) {
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
        `   <span class=\"announcement-title\">${this.title}</span>` +
        `   <div class=\"body\">` +
        `       <span class=\"announcement-text\">${this.text}</span>` + ((this.imagelink == undefined || this.imagelink == null) ? '' :
        `       <img src=\"${this.imagelink}\" alt=\"${this.image_alt_text}\">`) +
        `   </div>` +
        `</div>`;
    }
}

const ancmnts_block = document.getElementById('announcements');

/**
 * load all stored announcements
 * ideally going to work with a database,
 * but until the backend is setup, it will
 * be tested with an array
 */
const ancments_db = [
    new Announcement("Hello,", "World!"),
    new Announcement("This is", "an announcement!"),
    new Announcement("I love", "to code!"),
    new Announcement("GO CYFAIR!", "This should be an image of the CyFair Computer Science Club\'s logo", "res/img/logo.png", "CFCSC LOGO")
];

window.onload = () => {
    for (let i = 0; i < ancments_db.length; i++)
        ancmnts_block.innerHTML += ancments_db[i].getHTMLComponent(i);
    console.log('Loaded Announcements.');
}