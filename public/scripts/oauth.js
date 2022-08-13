function load_oauth() {
    google.accounts.id.initialize({
        client_id: "357736292758-sej313mdq6o19sgt89v2i8dokflqjd4l.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("oauth-login"),
        { theme: "outline", size: "large" }  // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
}

window.addEventListener('load', load_oauth);