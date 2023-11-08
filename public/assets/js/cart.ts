// @ts-ignore

const menuButtons = document.getElementsByClassName("btn-res");
const formuleSelect = document.getElementsByClassName("select-formule");
const cart = document.getElementById("cart");
const cartList = document.getElementById("cart-list");
let validateButton: HTMLElement = document.createElement("li");
const form = document.getElementById("cart-form") as HTMLFormElement;
const cartNumber = document.getElementById("cart-number");

Array.from(formuleSelect).forEach((f) => {
    f.addEventListener("change", (t) => {
        let g: HTMLSelectElement = <HTMLSelectElement>t.target;
        let selectValue = g.value.split(" ");

        let formulaDishes = [];

        switch (selectValue[1]) {
            case "Court" :
                formulaDishes.push("Plat", "Accompagnement", "Dessert");
                break;
            case "Complète++" :
                formulaDishes.push("Fromage");
            case "Complète":
                formulaDishes.push("Plat", "Accompagnement", "Dessert");
            case "En-Cas" :
                formulaDishes.push("Entree");
                break;
        }

        highlightDishes(formulaDishes, Number(selectValue[0]));
    })
});

function highlightDishes(inputDishes: string[], menuId: number) {
    for (const dish of ["Entree", "Plat", "Accompagnement", "Fromage", "Dessert"]) {
        let element = document.getElementById(dish + menuId);

        element.style.color = inputDishes.includes(dish) ? "" : "transparent";
    }
}

if (sessionStorage.getItem("cartList")) {
    cartList.innerHTML = sessionStorage.getItem("cartList");
}

Array.from(cartList.children).forEach((li: HTMLLIElement) => {
    if (li.id != "cart-validate") {
        let liContent = li.textContent.split(" ");
        let menu = document.getElementById("menu " + liContent[0] + " " + liContent[1]);

        if (menu == null) {
            li.remove();
        } else {
            li.addEventListener("click", () => addEventCartList(li, menu));
            menu.classList.add("hidden");
        }

    } else {
        validateButton = document.getElementById("cart-validate");
        addValidateButton();
    }
})

if (cartList.children.length > 1) {
    cartNumber.textContent = document.getElementsByClassName("cart-item").length.toString();
    validateButton.textContent = "Total : " + calculateCartTotal();

    cart.classList.remove("hidden");
}

cart.addEventListener("click", () => {
    cartList.classList.toggle("hidden")
})

Array.from(menuButtons).forEach((bt: HTMLElement) => {
    bt.addEventListener("click", () => {
        cart.classList.remove("hidden");

        if (cartList.children.length == 0) {
            addValidateButton();
        }

        let formule = document.getElementById("formule " + bt.dataset.res) as HTMLSelectElement;

        let value = bt.dataset.date + ' ' + bt.dataset.moment + ' ' + formule.value.slice(2);
        let strComp = value.slice(12);
        let res = Array.from(cartList.children).find(x => x.textContent.slice(0, 12) == strComp);
        let menu = document.getElementById("menu " + bt.dataset.date + " " + bt.dataset.moment);

        if (res == undefined) {
            let li = document.createElement("li");
            li.textContent = value;
            li.classList.add("cart-item");
            li.addEventListener("click", () => addEventCartList(li, menu));
            cartList.insertBefore(li, validateButton);
            let cartItems = document.getElementsByClassName("cart-item");
            cartNumber.textContent = cartItems.length.toString();
        } else if (res.textContent != value) {
            res.textContent = value;
        }

        validateButton.textContent = "Total : " + calculateCartTotal();

        sessionStorage.setItem("cartList", cartList.innerHTML);
        menu.classList.add("hidden");
    })
})

function addEventCartList(li, menu) {
    menu.classList.remove("hidden");
    cartList.removeChild(li);
    let cartItems = document.getElementsByClassName("cart-item");

    if (cartItems.length == 0) {
        cart.classList.add("hidden");
        validateButton.remove();
    } else {
        validateButton.textContent = "Total : " + calculateCartTotal() + "€";

        cartNumber.textContent = cartItems.length.toString();
    }

    sessionStorage.setItem("cartList", cartList.innerHTML);
}

function calculateCartTotal() {
    return Array.from(document.getElementsByClassName("cart-item"))
        .map(li => parseFloat(li.textContent.split(" ").at(-2)))
        .reduce((a, b) => a + b).toFixed(2);
}

function addValidateButton() {
    validateButton.id = "cart-validate";
    validateButton.textContent = "Valider";

    validateButton.addEventListener("click", () => {
        validCart(Array.from(cartList.children).map(li => li.textContent));
    })

    cartList.append(validateButton);
}

/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string[]} data the parameters to add to the url
 */
function validCart(data: string[]) {
    for (let i = 0; i < data.length - 1; i++) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = String(i);
        input.value = data[i];

        form.appendChild(input);
    }

    form.submit();
}
