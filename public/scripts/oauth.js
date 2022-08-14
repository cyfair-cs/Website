const oauth_button = document.getElementById("oauth-login");

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const payload = jwtDecode<JwtPayload>(response);
    console.log('Logged User: ' + payload.sub);
    
    oauth_button.innerHTML = `` +
    `<span id=\"oauth-profile\">Hello, ${payload.name}</span>` +
    `<button id=\"oauth-signout\">Sign Out</button>`;
    $('#oauth-login')
        .css('background', '#202124')
        .css('border-radius','10px')
        .css('color','var(--text-color)');
    $('oauth-signout')
        .attr('onclick', 'google.accounts.id.disableAutoSelect()');
}

function load_oauth_button() {
    console.log('Loaded Google OAuth Integration.')

    google.accounts.id.initialize({
        client_id: "357736292758-cm6civuqaoq68jll5kqi4cke70i8ev7g.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        oauth_button,
        { theme: "filled_black", size: "medium" }  // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
}

window.addEventListener('load', load_oauth_button);