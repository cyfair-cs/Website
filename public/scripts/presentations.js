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

// loads presentations based on tags
function load_presentations(searchTags=[]) {
    const presentations_db = [
        new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Introduction Slides', [ 'general', 'introduction' ]),
        new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Introduction Slides', [ 'general', 'introduction' ]),
        new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Introduction Slides', [ 'general', 'introduction' ]),
        new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Introduction Slides', [ 'general', 'introduction' ]),
        new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Introduction Slides', [ 'general', 'introduction' ]),
        new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Introduction Slides', [ 'general', 'introduction' ]),
        new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Introduction Slides', [ 'general', 'introduction' ]),
        new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Introduction Slides', [ 'general', 'introduction' ]),
        new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Introduction Slides', [ 'general', 'introduction' ]),
        new Presentation('https://docs.google.com/presentation/d/e/2PACX-1vTQ2VYwLGx94QpCMdPwyWy4fIiuYe89b3XnVXDMbB7bw9LrMs7UvtWhfZeaXWqw7CRGfA_wJVxISagQ/embed?start=false&loop=false&delayms=3000', 'Introduction Slides', [ 'general', 'introduction' ]),
    ];

    let slide_container_index = 0;
    // loads the first containers
    const presentation_container = document.getElementById('presentations');
    presentation_container.innerHTML += `<div id="slide-container-0" class="slide-container"></div>`;
    let current_container = document.getElementById('slide-container-0');

    // traverses through the database
    for (let i = 0; i < presentations_db.length; i++) {
        // skip anything not within tags
        // assuming tags is enabled
        if (!includesAll(presentations_db[i].tags, searchTags))
            // no need to adjust index because the container
            // count is still unaffected
            continue;

        function isOverflown(element){
            const response = element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
            console.log('Overflown?: ' + response);
        }

        // add slide to current container
        current_container.innerHTML += presentations_db[i].getHTMLComponent(i);

        console.log('Scroll Width: ' + current_container.scrollWidth + ', Client Width: ' + current_container.clientWidth);
        console.log('Scroll Height: ' + current_container.scrollHeight + ', Client Height: ' + current_container.clientHeight);

        // if slide overflows the current container
        // current_container.scrollWidth > current_container.clientWidth
        if (isOverflown(current_container))  {
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

    console.log('loaded presentations')
}

window.addEventListener('load', () => {
    load_presentations();
});