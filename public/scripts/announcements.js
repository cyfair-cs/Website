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

const ancments_db = [
    new Announcement('2021 District Competition', 'Depicted in the photo, you can see our 2021 district runner-up UIL Computer Science team! On the far left is our former president, Gavin Joyce, who placed 5th Individually, in the middle you can see our current president, Carson Stark, and on the right is the VP, Steven Nguyen, who placed 4th individually.', '../res/img/announcement/2021comp.png', '2021 District Competition')
];

/**
 * load all stored announcements
 * ideally going to work with a database,
 * but until the backend is setup, it will
 * be tested with an array
 */
function load_announcements() {
    const ancmnts_block = document.getElementById('announcements');

    for (let i = 0; i < ancments_db.length; i++)
        ancmnts_block.innerHTML += ancments_db[i].getHTMLComponent(i);
    console.log('Loaded Announcements.');

    const user_raw = sessionStorage.getItem('google_user');

    // if user is an admin with permissions
    // no backend so cant implement this yet
    if (!(user_raw == null || user_raw == 'null') && true)
        document.getElementsByClassName('editable-row')[0].innerHTML += '<button class="edit-icon" onclick="edit_announcements()"><i class="fa-solid fa-pencil"></i></button>\n';
}

function edit_announcements() {
    // verify that user is logged in
    const user_raw = sessionStorage.getItem('google_user');
    if (user_raw == null || user_raw == 'null')
        return;
    const user = JSON.parse(user_raw);

    // verify that user is an admin
    // cannot be done as there is no backend yet
    if (false)
        return;

    // show edit menu
    
}

window.addEventListener('load', () => { load_announcements() });
