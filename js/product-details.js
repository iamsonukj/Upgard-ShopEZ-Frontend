$(document).ready(function () {

    // Get ID from URL
    let id = new URLSearchParams(window.location.search).get("id");

    $.getJSON("../data/products.json", function (products) {

        let p = products.find(x => x.id == id);

        // If product not found
        if (!p) {
            $("#productDetails").html("<h3 class='text-danger'>Product not found</h3>");
            return;
        }

        // ✅ Dynamic Extra Info
        let extraInfo = "";

        if (p.category === "Electronics") {
            extraInfo = `
                <p>🚚 Free Delivery</p>
                <p>🔄 7 Days Return</p>
                <p>🛡 1 Year Warranty</p>
            `;
        } else {
            extraInfo = `
                <p>🚚 Free Delivery</p>
                <p>🔄 Easy Exchange Available</p>
            `;
        }

        // ✅ Render HTML
        $("#productDetails").html(`
        <div class="col-md-6 text-center">
            <img src="${p.image}" class="img-fluid rounded shadow">
        </div>

        <div class="col-md-6">

            <h2>${p.name}</h2>

            <span class="badge bg-primary mb-2">${p.category}</span>

            <h3 class="text-danger mt-2">₹${p.price}</h3>

            <p>${p.description}</p>

            <hr>

            ${extraInfo}

            <div class="mt-4">

                <button class="btn btn-success addCart"
                    data-id="${p.id}"
                    data-name="${p.name}"
                    data-price="${p.price}">
                    Add to Cart
                </button>

                <button class="btn btn-warning buyNow"
                    data-id="${p.id}"
                    data-name="${p.name}"
                    data-price="${p.price}">
                    Buy Now
                </button>

            </div>

        </div>
        `);

    });

    // ✅ ADD TO CART
    $(document).on("click", ".addCart", function () {

        let id = $(this).data("id");
        let name = $(this).data("name");
        let price = parseInt($(this).data("price"));

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let item = cart.find(p => p.id === id);

        if (item) {
            item.qty = (item.qty || 1) + 1;
        } else {
            cart.push({ id, name, price, qty: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        if (typeof updateCartCount === "function") {
            updateCartCount();
        }

        alert("Item added to cart");
    });

    // ✅ BUY NOW
    $(document).on("click", ".buyNow", function () {

        let product = {
            id: $(this).data("id"),
            name: $(this).data("name"),
            price: parseInt($(this).data("price")),
            qty: 1
        };

        localStorage.setItem("cart", JSON.stringify([product]));

        window.location.href = "checkout.html";
    });

});