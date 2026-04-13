$(document).ready(function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let html = "";
    let totalAmount = 0;

    /* ===== ORDER SUMMARY ===== */
    cart.forEach(item => {

        let qty = item.qty ? item.qty : 1;
        let itemTotal = item.price * qty;

        totalAmount += itemTotal;

        html += `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>${qty}</td>
            <td>₹${itemTotal}</td>
        </tr>
        `;
    });

    $("#orderItems").html(html);
    $("#orderTotal").html("Total: ₹" + totalAmount);


    /* ===== FORM VALIDATION ===== */
    $("#checkoutForm").submit(function (e) {

        e.preventDefault();

        let name = $("input[type='text']").val().trim();
        let email = $("input[type='email']").val().trim();
        let address = $("textarea").val().trim();

        // Name validation
        if (name.length < 3) {
            alert("Name must be at least 3 characters");
            return;
        }

        // Email validation (simple)
        if (!email.includes("@") || !email.includes(".")) {
            alert("Enter a valid email");
            return;
        }

        // Address validation
        if (address.length < 5) {
            alert("Address is too short");
            return;
        }

        // Success
        alert("🎉 Order placed successfully!");

        localStorage.removeItem("cart");

        window.location.href = "index.html";
    });

});