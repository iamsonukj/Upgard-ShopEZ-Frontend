$(document).ready(function () {

    // Load cart from LocalStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    renderCart();

    /* ===== DISPLAY CART ===== */
    function renderCart() {

        let html = "";
        let totalAmount = 0;

        cart.forEach((item, index) => {

            let quantity = item.qty ? item.qty : 1;
            let itemTotal = item.price * quantity;

            totalAmount += itemTotal;

            html += `
            <tr>
                <td>${item.name}</td>

                <td>₹${item.price}</td>

                <td>
                    <button class="btn btn-sm btn-secondary decreaseQty" data-index="${index}">-</button>
                    <span class="mx-2">${quantity}</span>
                    <button class="btn btn-sm btn-secondary increaseQty" data-index="${index}">+</button>
                </td>

                <td>₹${itemTotal}</td>

                <td>
                    <button class="btn btn-danger btn-sm removeItem" data-index="${index}">
                        Remove
                    </button>
                </td>
            </tr>
            `;
        });

        $("#cartItems").html(html);

        $("#totalPrice").html("Total: ₹" + totalAmount);
    }

    /* ===== REMOVE ITEM ===== */
    $(document).on("click", ".removeItem", function () {

        let index = $(this).data("index");

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
        updateCartCount();
    });

    /* ===== INCREASE QUANTITY ===== */
    $(document).on("click", ".increaseQty", function () {

        let index = $(this).data("index");

        cart[index].qty = cart[index].qty ? cart[index].qty + 1 : 2;

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
        updateCartCount();
    });

    /* ===== DECREASE QUANTITY ===== */
    $(document).on("click", ".decreaseQty", function () {

        let index = $(this).data("index");

        if (cart[index].qty && cart[index].qty > 1) {
            cart[index].qty -= 1;
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
        updateCartCount();
    });

});