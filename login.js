const form = document.getElementById("loginForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/users")
    .then(function(response) {
        return response.json();
    })
    .then(function(users) {

        const user = users.find(function(user) {
            return user.email === email &&
                   user.password === password;
        });

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));

            alert("Login successful!");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid email or password");
        }
    })
    .catch(function(error) {
        console.log(error);
        alert("Login failed");
    });
});