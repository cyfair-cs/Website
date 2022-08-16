class CompInfo {
    name;
    date;
    signupLink; // google forms signup
    info_document_link; // optional link to a pdf/document for info
    description; // optional description

    constructor(name, signupLink, description, info_document_link, date) {
        this.name = name;
        this.signupLink = signupLink;
        this.date = date === undefined ? new Date() : new Date(date);
        this.info_document_link = info_document_link;
        this.description = description;
    }

    getHTMLComponent(index) {
        return `` +
        `<div class=\"compinfo card\" id=\"compinfo${index}\">` +
        `   <div class=\"title-date-row\">` +
        `       <span class=\"title\">${this.name}</span>` +
        // , { weekday:"numeric", year:"numeric", month:"full", day:"numeric" })
        `       <span class=\"date\">${this.date.toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric" })}</span>` +
        `   </div>` +
        `   <div class=\"button-row\">` +
        `       <button class=\"comp-signup\" onclick=\"window.location.href=\'${this.signupLink}\'\">Signup</button>` +
        (this.info_document_link === undefined ? '' :
        `       <button class=\"comp-info-doc\" onclick=\"window.location.href=\'${this.info_document_link}\'\">Contest Information PDF</button>`) +
        `   </div>` +
        (this.description === undefined ? '' :
        `   <span class=\"description\">${this.description}</span>`) +
        `</div>`;
    }
}

// just like the announcements, because there is no
// backend database, im going to use an array as a
// mockup
function load_competitions() {
    const compinfo_db = [
        new CompInfo("Seven Lakes", "https://forms.gle/tdySEK1iR2ts5bkt6", "Our first competition of the year will be the annual Seven Lakes High School competition. Please sign up if you can go. Even if you are not experienced in doing any competition, this will be good practice.", "https://drive.google.com/file/d/119h1m2u6uWEwf_JtPq6b_-flqciFxVZv/view?usp=sharing", "2011-10-11"),
        new CompInfo("Taylor HS", "https://forms.gle/tdySEK1iR2ts5bkt6", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", undefined, '2001-10-12')
    ]

    const compinfo_block = document.getElementById('competitions');
    for (let i = 0; i < 3; i++)
    compinfo_db.forEach((compinfo, index) => {
        compinfo_block.innerHTML += compinfo.getHTMLComponent(index);
    })
    console.log('Loaded mock competitions.');
}

window.addEventListener('load', load_competitions);
