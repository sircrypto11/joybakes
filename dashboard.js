const user = JSON.parse(localStorage.getItem("user"));

if (user) {
    document.getElementById("welcomeMessage").textContent =
        "Welcome back, " + user.name;
}

async function getOrders() {
    const response = await fetch("http://localhost:3000/orders");
    const orders = await response.json();

    let total = 0;
    let pending = 0;
    let completed = 0;
    let spent = 0;

    const ordersList = document.getElementById("ordersList");
    ordersList.innerHTML = "";

    for (let order of orders) {
        if (user && order.userId === user.id) {
            total++;

            if (order.status === "Pending") {
                pending++;
            }

            if (order.status === "Completed") {
                completed++;
                spent += Number(order.total);
            }

            const item = document.createElement("p");
            item.textContent = "KSh " + order.total + " - " + order.status;

            ordersList.appendChild(item);
        }
    }

    document.getElementById("totalOrders").textContent = total;
    document.getElementById("pendingOrders").textContent = pending;
    document.getElementById("completedOrders").textContent = completed;
    document.getElementById("totalSpent").textContent = spent;

    if (total === 0) {
        ordersList.textContent = "No orders available.";
    }
}

getOrders();

function goToCatalog() {
    window.location.href = "catalog.html";
}

function viewOrders() {
    document.querySelector(".recent-orders").scrollIntoView();
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}