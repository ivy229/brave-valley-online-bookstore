
// ==================================
// 1. SELECT WEBSITE ELEMENTS
// ==================================

const searchInput = document.getElementById("book-search");
const searchButton = document.getElementById("search-button");
const categoryButtons = document.querySelectorAll(".category-btn");
const bookCards = document.querySelectorAll(".book-card");
const noResults = document.getElementById("no-results");
const cartCount = document.getElementById("cart-count");
const cartButton = document.querySelector(".cart-button");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");
const checkoutButton = document.getElementById("checkout-button");
// ==================================
// 2. SHOPPING CART
// ==================================

let cartItems = [];


// Update shopping cart display
function updateCart() {

    // Calculate total number of books
    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity, 0
    );

    cartCount.textContent = totalQuantity;

    // Clear previous cart display
    cartItemsContainer.innerHTML = "";

    let totalPrice = 0;

    // Display each selected book
    cartItems.forEach((item, index) => {

        const subtotal = item.price * item.quantity;

        totalPrice += subtotal;

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <h4>${item.title}</h4>

            <p>Price: KSh ${item.price.toLocaleString()}</p>

            <div class="quantity-controls">

                <button class="decrease-quantity"
                    data-index="${index}">−</button>

                <span>${item.quantity}</span>

                <button class="increase-quantity"
                    data-index="${index}">+</button>

            </div>

            <p>Subtotal: KSh ${subtotal.toLocaleString()}</p>

            <button class="remove-book"
                data-index="${index}">
                Remove
            </button>

            <hr>
        `;

        cartItemsContainer.appendChild(cartItem);

    });

    // Display total price
    cartTotal.textContent = totalPrice.toLocaleString();

}

// Handle cart quantity and remove buttons
cartItemsContainer.addEventListener("click", function(event) {

    const index = Number(event.target.dataset.index);

    // Increase quantity
    if (event.target.classList.contains("increase-quantity")) {

        cartItems[index].quantity++;

        updateCart();

    }

    // Decrease quantity
    else if (event.target.classList.contains("decrease-quantity")) {

        if (cartItems[index].quantity > 1) {

            cartItems[index].quantity--;

        } else {

            cartItems.splice(index, 1);

        }

        updateCart();

    }

    // Remove a book completely
    else if (event.target.classList.contains("remove-book")) {

        cartItems.splice(index, 1);

        updateCart();

    }

});

// Handle cart quantity and remove buttons
cartItemsContainer.addEventListener("click", function(event) {

    const index = Number(event.target.dataset.index);

    if (event.target.classList.contains("increase-quantity")) {
        cartItems[index].quantity++;
        updateCart();
    }

    else if (event.target.classList.contains("decrease-quantity")) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
        } else {
            cartItems.splice(index, 1);
        }
        updateCart();
    }

    else if (event.target.classList.contains("remove-book")) {
        cartItems.splice(index, 1);
        updateCart();
    }

});

// ADD THE CLEAR CART CODE BELOW THIS LINE

clearCartButton.addEventListener("click", function() {

    if (cartItems.length === 0) {
        alert("Your shopping cart is already empty.");
        return;
    }

    const confirmClear = confirm(
        "Are you sure you want to remove all books from your cart?"
    );

    if (confirmClear) {
        cartItems = [];
        updateCart();
        alert("Your shopping cart has been cleared!");
    }

});
// Proceed to checkout
checkoutButton.addEventListener("click", function() {

    if (cartItems.length === 0) {

        alert("Please add books to your cart before checking out.");

        return;

    }

    // Save cart items for the checkout page
    sessionStorage.setItem(
        "braveValleyCart",
        JSON.stringify(cartItems)
    );

    // Open checkout page
    window.location.href = "checkout.html";

});



// Add books to cart
document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", function() {

        const bookCard = this.closest(".book-card");

        const bookTitle = bookCard.querySelector("h3").textContent;

        const bookPrice = Number(
            bookCard.querySelector("strong").textContent
                .replace("KSh", "")
                .replace(/,/g, "")
                .trim()
        );

        // Check whether the book is already in the cart
        const existingBook = cartItems.find(
            item => item.title === bookTitle
        );

        if (existingBook) {

            existingBook.quantity++;

        } else {

            cartItems.push({
                title: bookTitle,
                price: bookPrice,
                quantity: 1
            });

        }

        updateCart();

        alert(bookTitle + " has been added to your cart!");

    });

});

// Open shopping cart
cartButton.addEventListener("click", function() {

    cartPanel.hidden = false;

});

// Close shopping cart
closeCart.addEventListener("click", function() {

    cartPanel.hidden = true;

});


// ==================================
// 3. BOOK SEARCH AND FILTERING
// ==================================

let selectedCategory = "all";

function filterBooks() {

    const searchTerm = searchInput.value.toLowerCase().trim();

    let visibleBooks = 0;

    bookCards.forEach(card => {

        const title = card.querySelector("h3").textContent.toLowerCase();

        const author = card.querySelector(".book-info p").textContent.toLowerCase();

        const category = card.dataset.category;

        const matchesSearch =
            title.includes(searchTerm) ||
            author.includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {

            card.style.display = "block";

            visibleBooks++;

        } else {

            card.style.display = "none";

        }

    });

    noResults.hidden = visibleBooks !== 0;

}

// Search as the user types

searchInput.addEventListener("input", filterBooks);

// Search button

searchButton.addEventListener("click", filterBooks);

// ==================================
// 4. CATEGORY FILTERS
// ==================================

categoryButtons.forEach(button => {

    button.addEventListener("click", function() {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        selectedCategory = this.dataset.category;

        filterBooks();

    });

});
