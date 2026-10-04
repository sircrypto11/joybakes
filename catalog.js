let cart = [];

const products = document.querySelectorAll(".product");

products.forEach(function(product) {
    const name = product.querySelector("h3").textContent;
    const description = product.querySelectorAll("p")[0].textContent;
    const priceText = product.querySelectorAll("p")[1].textContent;
    const price = Number(priceText.replace("Price: KSh ", ""));

    const viewButton = product.querySelector(".viewDetails");
    const orderButton = product.querySelector(".orderButton");

    viewButton.addEventListener("click", function() {
        document.getElementById("dialogTitle").textContent = name;
        document.getElementById("dialogDescription").textContent = description;
        document.getElementById("dialogPrice").textContent = price;

        document.getElementById("productDialog").showModal();
    });

    orderButton.addEventListener("click", function() {
        cart.push({
            name: name,
            price: price
        });

        showCart();
    });
});

document.getElementById("closeDialog").addEventListener("click", function() {
    document.getElementById("productDialog").close();
});

function showCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(item) {
        const product = document.createElement("p");

        product.textContent = item.name + " - KSh " + item.price;

        cartItems.appendChild(product);

        total += item.price;
    });

    document.getElementById("total").textContent = total;

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    }
}

document.getElementById("orderNow").addEventListener("click", async function() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Please log in first");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }

    const order = {
        userId: user.id,
        items: cart,
        total: Number(document.getElementById("total").textContent),
        status: "Pending"
    };

    const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });

    if (response.ok) {
        alert("Order placed successfully!");

        cart = [];
        showCart();
    } else {
        alert("Order failed");
    }
});

showCart();