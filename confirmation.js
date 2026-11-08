// ==================================
// 1. RETRIEVE THE SUBMITTED ORDER
// ==================================

const savedOrder = sessionStorage.getItem("braveValleyOrder");

const order = savedOrder ? JSON.parse(savedOrder) : null;


// ==================================
// 2. DISPLAY ORDER INFORMATION
// ==================================

if (order) {

    document.getElementById("confirmed-name").textContent =
        order.customerName;

    document.getElementById("order-number").textContent =
        order.orderNumber;

    document.getElementById("order-date").textContent =
        order.orderDate;

    document.getElementById("confirmed-total").textContent =
        order.totalAmount.toLocaleString();


// ==================================
// 3. DISPLAY BOOKS PURCHASED
// ==================================

    const confirmedItems = document.getElementById("confirmed-items");

    order.items.forEach(item => {

        const itemElement = document.createElement("div");

        itemElement.classList.add("checkout-item");

        const subtotal = item.price * item.quantity;

        itemElement.innerHTML = `
            <div>
                <strong>${item.title}</strong>
                <p>Quantity: ${item.quantity}</p>
                <p>Unit Price: KSh ${item.price.toLocaleString()}</p>
            </div>

            <strong>KSh ${subtotal.toLocaleString()}</strong>
        `;

        confirmedItems.appendChild(itemElement);

    });

} else {

    document.querySelector(".confirmation-container").innerHTML = `
        <h2>No Order Found</h2>
        <p>We could not find an order to display.</p>
        <a href="index.html" class="continue-shopping">
            Return to Bookstore
        </a>
    `;

}