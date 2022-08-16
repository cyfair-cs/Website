class Presentation {
    embedLink;
    tags;
    title;

    constructor(embedLink="", title="", tags=[]) {
        this.embedLink = embedLink;
        this.title = title;
        this.tags = tags;
    }

    generateStyledTags() {
        let out = '';
        this.tags.forEach((tag, i) => {
            out += '<span class="tag">' + tag + '</span>, ';
        })
        out = out.substring(0, out.length-2);
        return out;
    }

    getHTMLComponent(index) {
        return `` +
        `<div class="presentation card" id="presentation${index}">` +
            `<iframe src="${this.embedLink}"
            width="360" height="225" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>` +
            `<span id="presentation${index}-title" class="presentation-title">${this.title}</span>` +
            `<code id="presentation${index}-tags" class="presenation-tags">Tags: ${this.generateStyledTags()}</code>` +
        `</div>`
    }
}

// array helper function
// checks if arr contains all of context
function includesAll(arr=[], context=[]) {
    for (let i = 0; i < context.length; i++)
        if (!arr.includes(context[i]))
            return false;
    return true;
}

const presentations_db = [
    new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Introduction Slides', [ 'general', 'introduction' ]),
    new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Girls who code slide', [ 'girls who code', 'introduction' ]),
    new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Graph Pathfinding', [ 'competition', 'advanced', 'recursion', 'algorithms' ]),
    new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Unity beginning development', [ 'game development', 'beginner', 'unity', 'lesson' ]),
];

// loads presentations based on tags
function load_presentations(search_name='', searchTags=[]) {
    console.debug('Loading presentations.. search_name=' + search_name + ', searchTags=' + searchTags);

    // load search tags - this algorithm is a bit slow, but database
    // is very small so it won't particularly matter
    let globaltags = []; // eventually, it may be better to store this in a database?
    for (let i = 0; i < presentations_db.length; i++) {
        for (let arr_i = 0; arr_i < presentations_db[i].tags.length; arr_i++) {
            if (!globaltags.includes(presentations_db[i].tags[arr_i]))
                globaltags.push(presentations_db[i].tags[arr_i]);
        }
    }

    // alphabetic order (ofc)
    globaltags.sort();

    // load them into html for search
    const radio_button_container = document.getElementById('presentation-search-tags');

    // checks if there is preset options, if so it wont reload
    if (radio_button_container.innerHTML == '') {
        for (let i = 0; i < globaltags.length; i++) {
            const html_id = globaltags[i].replace(' ', '-');
            radio_button_container.innerHTML += `` +
            `<input type="checkbox" class="tag-option" id="${html_id}" name="${html_id}" value="${globaltags[i]}">\n` +
            `<label for="${html_id}">${globaltags[i]}</label><br id="tag-sep">`
        }
    }

    // just in case theres no options
    if (radio_button_container.innerHTML == '')
        radio_button_container += `<span id="empty-tags">No tags found.</span>`

    let slide_container_index = 0;
    // loads the first containers
    const presentation_container = document.getElementById('presentations');
    // reset loaded before reloading
    presentation_container.innerHTML = `<div id="slide-container-0" class="slide-container"></div>`;
    let current_container = document.getElementById('slide-container-0');

    // traverses through the database
    for (let i = 0; i < presentations_db.length; i++) {
        // searching by name first
        // assuming name is enabled
        if (!presentations_db[i].title.includes(search_name))
            continue;

        // skip anything not within tags
        // assuming tags is enabled
        if (!includesAll(presentations_db[i].tags, searchTags))
            // no need to adjust index because the container
            // count is still unaffected
            continue;

        // add slide to current container
        current_container.innerHTML += presentations_db[i].getHTMLComponent(i);

        const overflow = current_container.scrollWidth > current_container.clientWidth;

        console.debug('Scroll Width: ' + current_container.scrollWidth + ', Client Width: ' + current_container.clientWidth + ', Scroll Height: ' + current_container.scrollHeight + ', Client Height: ' + current_container.clientHeight + ', Overflown?: ' + overflow);

        // if slide overflows the current container
        if (current_container.scrollWidth > current_container.clientWidth)  {
            // move element to the next container
            const movedElement = current_container.lastElementChild;
            current_container.removeChild(movedElement);

            // increment slide container index
            slide_container_index++;
            presentation_container.innerHTML += `<div id="slide-container-${slide_container_index}" class="slide-container"></div>`;
            current_container = document.getElementById('slide-container-' + slide_container_index);

            // add element to next container
            current_container.appendChild(movedElement);
        }
    }

    if (presentation_container.innerHTML == '')
        presentation_container.innerHTML += `<span id="empty-slides" class="title">No presentations matching your search was found. Either rework your search terms or there are no presentations available to view in the database.</span>\n` +
        `<span id="contact-devs">If you believe that something is wrong, contact one of the developers.</span>\n`;

    console.log('Loaded presentations.')
}

function search_submit() {
    let tag_selections = [];
    const search_name = document.getElementById('presentation-name-searchbar').value;
    const tag_options = document.getElementsByClassName('tag-option');
    for (let i = 0; i < tag_options.length; i++)
        if (tag_options[i].checked)
            tag_selections.push(String(tag_options[i].value));
    console.debug('[SEARCH] Name: ' + search_name + ', Tags: ' + tag_selections);
    load_presentations(search_name, tag_selections);
}

window.addEventListener('load', () => {
    load_presentations();
});
window.addEventListener('resize', () => {
    load_presentations();
});
