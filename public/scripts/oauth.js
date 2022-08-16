function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

/**
 * Whenever someone logs in with google OAuth,
 * this function will decode it, cache the response,
 * then convert the Div where the sign in button
 * used to be into a profile name space and a sign
 * out button
 */
function handleCredentialResponse(response) {
    const payload = decodeJwtResponse(response.credential);
    sessionStorage.setItem('google_user', JSON.stringify(payload));
    console.debug(JSON.stringify(payload));
    load_profile_signout(payload);
}

function load_profile_signout(user) {
    document.getElementById("oauth-login").innerHTML = `` +
    `<span id=\"oauth-profile\">Hello, ${user.given_name}</span>` +
    `<button id=\"oauth-signout\">Sign Out</button>`;

    // I copied the CSS rules from the "sign in with google" button
    // to make this button look roughly the same.
    const oauth_profile = document.getElementById('oauth-profile');
    oauth_profile.style.background = '#202124';
    oauth_profile.style.borderRadius = '5px';
    oauth_profile.style.color = 'var(--text-color)';
    oauth_profile.style.padding = '6px 7px 6px 7px';
    oauth_profile.style.marginRight = '.6vw';
    oauth_profile.style.textAlign = 'center';
    oauth_profile.style.overflow = 'hidden';
    oauth_profile.style.textOverflow = 'ellipsis';

    const oauth_signout = document.getElementById('oauth-signout');
    oauth_signout.addEventListener('click', signout_user);
    oauth_signout.style.borderRadius = '5px';
    oauth_signout.style.color = 'var(--text-color)';
    oauth_signout.style.padding = '6px 7px 6px 7px';
    oauth_signout.style.textAlign = 'center';
}

function signout_user() {
    google.accounts.id.disableAutoSelect();
    load_oauth_button();
    sessionStorage.setItem('google_user', null);
}

function load_oauth_button() {
    google.accounts.id.initialize({
        client_id: "357736292758-cm6civuqaoq68jll5kqi4cke70i8ev7g.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("oauth-login"),
        { theme: "filled_black", size: "medium" }  // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
    console.log('Loaded Google OAuth Sign in Button.');
}

window.addEventListener('load', () => {
    const user_raw = sessionStorage.getItem('google_user');
    if (user_raw == null || user_raw == "null") // non logged in
        load_oauth_button();
    else {
        load_profile_signout(JSON.parse(user_raw));
    }
});
