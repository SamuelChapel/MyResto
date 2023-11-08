// @ts-ignore
var menuButtons = document.getElementsByClassName("btn-res");
var formuleSelect = document.getElementsByClassName("select-formule");
var cart = document.getElementById("cart");
var cartList = document.getElementById("cart-list");
var validateButton = document.createElement("li");
var form = document.getElementById("cart-form");
var cartNumber = document.getElementById("cart-number");
Array.from(formuleSelect).forEach(function (f) {
    f.addEventListener("change", function (t) {
        var g = t.target;
        var selectValue = g.value.split(" ");
        var formulaDishes = [];
        switch (selectValue[1]) {
            case "Court":
                formulaDishes.push("Plat", "Accompagnement", "Dessert");
                break;
            case "Complète++":
                formulaDishes.push("Fromage");
            case "Complète":
                formulaDishes.push("Plat", "Accompagnement", "Dessert");
            case "En-Cas":
                formulaDishes.push("Entree");
                break;
        }
        highlightDishes(formulaDishes, Number(selectValue[0]));
    });
});
function highlightDishes(inputDishes, menuId) {
    for (var _i = 0, _a = ["Entree", "Plat", "Accompagnement", "Fromage", "Dessert"]; _i < _a.length; _i++) {
        var dish = _a[_i];
        var element = document.getElementById(dish + menuId);
        element.style.color = inputDishes.includes(dish) ? "" : "transparent";
    }
}
if (sessionStorage.getItem("cartList")) {
    cartList.innerHTML = sessionStorage.getItem("cartList");
}
Array.from(cartList.children).forEach(function (li) {
    if (li.id != "cart-validate") {
        var liContent = li.textContent.split(" ");
        var menu_1 = document.getElementById("menu " + liContent[0] + " " + liContent[1]);
        if (menu_1 == null) {
            li.remove();
        }
        else {
            li.addEventListener("click", function () { return addEventCartList(li, menu_1); });
            menu_1.classList.add("hidden");
        }
    }
    else {
        validateButton = document.getElementById("cart-validate");
        addValidateButton();
    }
});
if (cartList.children.length > 1) {
    cartNumber.textContent = document.getElementsByClassName("cart-item").length.toString();
    validateButton.textContent = "Total : " + calculateCartTotal();
    cart.classList.remove("hidden");
}
cart.addEventListener("click", function () {
    cartList.classList.toggle("hidden");
});
Array.from(menuButtons).forEach(function (bt) {
    bt.addEventListener("click", function () {
        cart.classList.remove("hidden");
        if (cartList.children.length == 0) {
            addValidateButton();
        }
        var formule = document.getElementById("formule " + bt.dataset.res);
        var value = bt.dataset.date + ' ' + bt.dataset.moment + ' ' + formule.value.slice(2);
        var strComp = value.slice(12);
        var res = Array.from(cartList.children).find(function (x) { return x.textContent.slice(0, 12) == strComp; });
        var menu = document.getElementById("menu " + bt.dataset.date + " " + bt.dataset.moment);
        if (res == undefined) {
            var li_1 = document.createElement("li");
            li_1.textContent = value;
            li_1.classList.add("cart-item");
            li_1.addEventListener("click", function () { return addEventCartList(li_1, menu); });
            cartList.insertBefore(li_1, validateButton);
            var cartItems = document.getElementsByClassName("cart-item");
            cartNumber.textContent = cartItems.length.toString();
        }
        else if (res.textContent != value) {
            res.textContent = value;
        }
        validateButton.textContent = "Total : " + calculateCartTotal();
        sessionStorage.setItem("cartList", cartList.innerHTML);
        menu.classList.add("hidden");
    });
});
function addEventCartList(li, menu) {
    menu.classList.remove("hidden");
    cartList.removeChild(li);
    var cartItems = document.getElementsByClassName("cart-item");
    if (cartItems.length == 0) {
        cart.classList.add("hidden");
        validateButton.remove();
    }
    else {
        validateButton.textContent = "Total : " + calculateCartTotal() + "€";
        cartNumber.textContent = cartItems.length.toString();
    }
    sessionStorage.setItem("cartList", cartList.innerHTML);
}
function calculateCartTotal() {
    return Array.from(document.getElementsByClassName("cart-item"))
        .map(function (li) { return parseFloat(li.textContent.split(" ").at(-2)); })
        .reduce(function (a, b) { return a + b; }).toFixed(2);
}
function addValidateButton() {
    validateButton.id = "cart-validate";
    validateButton.textContent = "Valider";
    validateButton.addEventListener("click", function () {
        validCart(Array.from(cartList.children).map(function (li) { return li.textContent; }));
    });
    cartList.append(validateButton);
}
/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string[]} data the parameters to add to the url
 */
function validCart(data) {
    for (var i = 0; i < data.length - 1; i++) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = String(i);
        input.value = data[i];
        form.appendChild(input);
    }
    form.submit();
}
