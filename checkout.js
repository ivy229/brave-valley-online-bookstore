
// ==================================
// 1. RETRIEVE SHOPPING CART DATA
// ==================================

const savedCart = sessionStorage.getItem("braveValleyCart");

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");

const cartItems = savedCart ? JSON.parse(savedCart) : [];


// ==================================
// 2. DISPLAY ORDER SUMMARY
// ==================================

function displayOrderSummary() {

    checkoutItems.innerHTML = "";

    let grandTotal = 0;

    if (cartItems.length === 0) {

        checkoutItems.innerHTML =
            "<p>Your shopping cart is empty.</p>";

        checkoutTotal.textContent = "0";

        return;

    }

    cartItems.forEach(item => {

        const subtotal = item.price * item.quantity;

        grandTotal += subtotal;

        const itemElement = document.createElement("div");

        itemElement.classList.add("checkout-item");

        itemElement.innerHTML = `
            <div>
                <strong>${item.title}</strong>
                <p>Quantity: ${item.quantity}</p>
                <p>Unit Price: KSh ${item.price.toLocaleString()}</p>
            </div>

            <strong>KSh ${subtotal.toLocaleString()}</strong>
        `;

        checkoutItems.appendChild(itemElement);

    });

    checkoutTotal.textContent =
        grandTotal.toLocaleString();

}


// ==================================
// 3. LOAD ORDER SUMMARY
// ==================================

displayOrderSummary();
// ==================================
// 4. HANDLE ORDER SUBMISSION
// ==================================

const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Collect customer information
    const customerName = document.getElementById("customer-name").value.trim();
    const customerEmail = document.getElementById("customer-email").value.trim();
    const customerPhone = document.getElementById("customer-phone").value.trim();
    const deliveryLocation = document.getElementById("delivery-location").value.trim();

    // Check whether the cart is empty
    if (cartItems.length === 0) {
        alert("Your shopping cart is empty. Please add books before placing an order.");
        return;
    }

    // Calculate the total amount
    const totalAmount = cartItems.reduce(
        (total, item) => total + (item.price * item.quantity), 0
    );

    // Create the order
    const order = {
    orderNumber: "BV-" + Date.now(),
    customerName: customerName,
    customerEmail: customerEmail,
    customerPhone: customerPhone,
    deliveryLocation: deliveryLocation,
    items: cartItems,
    totalAmount: totalAmount,
    orderDate: new Date().toLocaleString()
};

    // Save the order temporarily
    sessionStorage.setItem("braveValleyOrder", JSON.stringify(order));

    // Display confirmation
    window.location.href = "order-confirmation.html";

});