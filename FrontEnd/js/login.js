const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let credentials = {
        email: loginForm.email.value,
        password: loginForm.password.value
    };
    
    fetch('http://localhost:5678/api/users/login',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(credentials)
    }).then(response => {
        if (response.status === 200) {
            // page accueil & login
            window.location.href = "../index.html";
        } else {
            alert("Votre email ou mot de passe est incorrect.");
        }
    });
})