function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
}


function load_oauth() {
    google.accounts.id.initialize({
        client_id: "357736292758-cm6civuqaoq68jll5kqi4cke70i8ev7g.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("oauth-login"),
        { theme: "filled_black", size: "medium" }  // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
}

window.addEventListener('load', load_oauth);