const loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    basicLogin(loginForm.email.value, loginForm.password.value)
})

async function basicLogin(email, password){
    let credentials = {
        email: email,
        password: password
    }
    
    const response = await fetch('http://localhost:5678/api/users/login',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(credentials)
    }).then(response => {
        if (response.status === 200) {
            // get back to home page
            window.location.href = "../index.html"
            return response.json()
        } else {
            alert("Votre email ou mot de passe est incorrect.")
        }
    })
    
    // save token in the local storage
    localStorage.setItem('token', response.token)
}