const oauth_button = document.getElementById('oauth-login'); 

// temporary functions to test - will be removed 
// for when oauth is actually supported
let oauth_user_name; 
let user_logged_in = false;

function oauth_login(name) {
    oauth_user_name = name;
    user_logged_in = true;
    disable_button();
}

// May replace button disabling with taking 
// you to a link of your profile.
function disable_button() {
    oauth_button.innerText = oauth_user_name;
    oauth_button.setAttribute('disabled', 'true');
}

// Root load function for all windows
function load_oauth() {
    // if user isnt logged in - oauth button to show "log in"
    if (!user_logged_in) {
        oauth_button.innerText = 'Login with Google';
        oauth_button.setAttribute('value', 'Enabled');
        // placeholder for real oauth
        oauth_button.onclick = () => { 
            oauth_login(prompt('enter something to input as your name')); 
        };
    }
    // otherwise, make it a dead button with their name
    else disable_button();
}

window.addEventListener('load', load_oauth);