// @ts-check
var menuButtons = document.getElementsByClassName("btn-res");
var cart = document.getElementById("cart");
var cartList = document.getElementById("cart-list");
var validateButton = document.createElement("li");
var form = document.getElementById("cart-form");
var cartNumber = document.getElementById("cart-number");
var cartImg = document.getElementById("cart-img");
Array.from(cartList.children).forEach(function (li) {
    if (li.id != "cart-validate") {
        var liContent = li.textContent.split(" ");
        var menu = document.getElementsByClassName("menu " + liContent[0] + " " + liContent[1]);
        Array.from(menu).forEach(function (m) { return m.classList.add("hidden"); });
    }
    else {
        validateButton = document.getElementById("cart-validate");
    }
});
if (cartList.children.length > 1) {
    cart.classList.remove("hidden");
}
cart.addEventListener("click", function () {
    cartList.classList.toggle("hidden");
});
window.addEventListener("click", function (e) {
    if (e.target != cartImg)
        cartList.classList.add("hidden");
});
Array.from(menuButtons).forEach(function (bt) {
    bt.addEventListener("click", function () {
        cart.classList.remove("hidden");
        if (cartList.children.length == 0) {
            addValidateButton();
        }
        var value = bt.dataset.date + ' ' + bt.dataset.moment + ' ' + bt.dataset.prix + ' €';
        var strComp = value.slice(11);
        var res = Array.from(cartList.children).find(function (x) { return x.textContent.slice(0, 12) == strComp; });
        var menus = document.getElementsByClassName("menu " + bt.dataset.date + " " + bt.dataset.moment);
        if (res == undefined) {
            var li_1 = document.createElement("li");
            li_1.textContent = value;
            li_1.classList.add("cart-item");
            li_1.addEventListener("click", function () {
                Array.from(menus).forEach(function (m) { return m.classList.remove("hidden"); });
                cartList.removeChild(li_1);
                var cartItems = document.getElementsByClassName("cart-item");
                if (cartItems.length == 0) {
                    cart.classList.add("hidden");
                }
                else {
                    validateButton.textContent = "Total : " + calculateCartTotal();
                    cartNumber.textContent = cartItems.length.toString();
                }
            });
            cartList.insertBefore(li_1, validateButton);
            var cartItems = document.getElementsByClassName("cart-item");
            cartNumber.textContent = cartItems.length.toString();
        }
        else if (res.textContent != value) {
            res.textContent = value;
        }
        sessionStorage.setItem("cartList", cartList.innerHTML);
        validateButton.textContent = "Total : " + calculateCartTotal();
        //menu.classList.add("animate__bounceOut");
        //await new Promise(r => setTimeout(r, 800));
        Array.from(menus).forEach(function (m) { return m.classList.add("hidden"); });
    });
});
function calculateCartTotal() {
    return Array.from(document.getElementsByClassName("cart-item"))
        .map(function (li) { return parseFloat(li.textContent.split(" ").at(-2)); })
        .reduce(function (a, b) { return a + b; }).toFixed(2);
}
function addValidateButton() {
    validateButton.id = "cart-validate";
    validateButton.textContent = "Valider";
    validateButton.addEventListener("click", function () {
        postCart(Array.from(cartList.children).map(function (li) { return li.textContent; }));
    });
    cartList.append(validateButton);
}
/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string[]} meals the parameters to add to the url
 */
function postCart(meals) {
    for (var i = 0; i < meals.length - 1; i++) {
        var hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = String(i);
        hiddenField.value = meals[i];
        form.appendChild(hiddenField);
    }
    form.submit();
}
