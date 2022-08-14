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

        // TODO: fix date data mismatch. wont show correct date despite correct formatting
        `       <span class=\"date title\">${this.date.getMonth()}/${this.date.getDay()}/${this.date.getFullYear()}</span>` +
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
        new CompInfo("Seven Lakes", "https://forms.gle/tdySEK1iR2ts5bkt6", "Our first competition of the year will be the annual Seven Lakes High School competition. Please sign up if you can go. Even if you are not experienced in doing any competition, this will be good practice.", "https://drive.google.com/file/d/119h1m2u6uWEwf_JtPq6b_-flqciFxVZv/view?usp=sharing", "2011-10-10"),
        new CompInfo("Taylor HS", "https://forms.gle/tdySEK1iR2ts5bkt6", undefined, undefined, '2011-10-10')
    ]

    const compinfo_block = document.getElementById('competitions');
    compinfo_db.forEach((compinfo, index) => {
        compinfo_block.innerHTML += compinfo.getHTMLComponent(index);
    })
}

window.addEventListener('load', load_competitions);