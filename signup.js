const signForm = document.getElementById("signupForm");

const Email = document.getElementById("email");
const Name = document.getElementById("name");
const Phone = document.getElementById("phone");
const Pass = document.getElementById("password");
const confirmPass = document.getElementById("confirmPassword");

signForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Checkiing if fields are empty
    if (
        Email.value === "" ||
        Name.value === "" ||
        Phone.value === "" ||
        Pass.value === "" ||
        confirmPass.value === ""
    ) {
        alert("Kindly enter all your details");
        return;
    }

    // Checkingg if passwords match
    if (Pass.value !== confirmPass.value) {
        alert("Passwords do not match");
        return;
    }

    // Creating  object
    const user = {
        name: Name.value,
        email: Email.value,
        phone: Phone.value,
        password: Pass.value
    };

    try {
        // Saving userto JSON Server
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            alert("ACCOUNT CREATED SUCCESSFULLY");
            console.log(user);
            signForm.reset();
        } else {
            alert("Failed to create account");
        }
    } catch (error) {
        alert("Unable to connect to the server");
        console.log(error);
    }
});