$(document).ready(function(){

let allProducts = [];

/* ===== LOAD PRODUCTS ===== */
$.getJSON("../data/products.json", function(products){

    allProducts = products;

    if($("#productList").length){
        renderProducts(products);
    }

    if($("#featuredProducts").length){
        renderFeatured(products);
    }

});


/* ===== NORMAL PRODUCT GRID ===== */
function renderProducts(products){

    let html = "";

    products.forEach(product => {

        html += `
        <div class="col-md-4 mb-4">

            <div class="card h-100">

                <img src="${product.image}" 
                     class="card-img-top productImage" 
                     data-id="${product.id}">

                <div class="card-body text-center">

                    <h6>${product.name}</h6>

                    <p class="text-danger">₹${product.price}</p>

                    <!-- ✅ VIEW BUTTON -->
                    <a href="product-details.html?id=${product.id}" 
                       class="btn btn-primary btn-sm">
                       View
                    </a>

                    <button class="btn btn-success btn-sm addCart"
                        data-id="${product.id}"
                        data-name="${product.name}"
                        data-price="${product.price}">
                        Add
                    </button>

                    <button class="btn btn-warning btn-sm buyNow"
                        data-id="${product.id}"
                        data-name="${product.name}"
                        data-price="${product.price}">
                        Buy
                    </button>

                </div>

            </div>

        </div>
        `;
    });

    $("#productList").html(html);
}


/* ===== FEATURED CAROUSEL ===== */
function renderFeatured(products){

    let shuffled = [...products].sort(() => 0.5 - Math.random());
    let featured = shuffled.slice(0,6);

    let html = "";

    for(let i = 0; i < featured.length; i += 3){

        let chunk = featured.slice(i, i+3);

        html += `
        <div class="carousel-item ${i === 0 ? "active" : ""}">
            <div class="container">
                <div class="row justify-content-center">
        `;

        chunk.forEach(product => {

            html += `
            <div class="col-md-4">

                <div class="card">

                    <!-- ✅ CLICKABLE IMAGE ONLY -->
                    <img src="${product.image}" 
                         class="card-img-top productImage" 
                         data-id="${product.id}">

                    <div class="card-body text-center">

                        <h5>${product.name}</h5>

                        <p class="text-danger">₹${product.price}</p>

                        <a href="product-details.html?id=${product.id}" 
                           class="btn btn-primary btn-sm">
                           View
                        </a>

                        <button class="btn btn-success btn-sm addCart"
                            data-id="${product.id}"
                            data-name="${product.name}"
                            data-price="${product.price}">
                            Cart
                        </button>

                        <button class="btn btn-warning btn-sm buyNow"
                            data-id="${product.id}"
                            data-name="${product.name}"
                            data-price="${product.price}">
                            Buy
                        </button>

                    </div>

                </div>

            </div>
            `;
        });

        html += `
                </div>
            </div>
        </div>
        `;
    }

    $("#featuredProducts").html(html);
}


/* ===== IMAGE CLICK (SAFE CLICK AREA) ===== */
$(document).on("click",".productImage",function(){

    let id = $(this).data("id");

    window.location.href = "product-details.html?id=" + id;

});


/* ===== FILTER ===== */
$(document).on("click",".filterBtn",function(){

    let cat = $(this).data("cat");

    $(".filterBtn").removeClass("active");
    $(this).addClass("active");

    if(cat === "All"){
        renderProducts(allProducts);
    } else {
        let filtered = allProducts.filter(p => p.category === cat);
        renderProducts(filtered);
    }

});


/* ===== ADD TO CART ===== */
$(document).on("click",".addCart",function(e){

    e.stopPropagation(); // 🔥 IMPORTANT FIX

    let id = $(this).data("id");
    let name = $(this).data("name");
    let price = parseInt($(this).data("price"));

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.id === id);

    if(existing){
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Added to cart");

});


/* ===== BUY NOW ===== */
$(document).on("click",".buyNow",function(e){

    e.stopPropagation(); // 🔥 IMPORTANT FIX

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