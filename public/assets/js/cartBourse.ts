// @ts-check

const menuButtons = document.getElementsByClassName("btn-res");
const cart = document.getElementById("cart");
const cartList = document.getElementById("cart-list");
let validateButton: HTMLElement = document.createElement("li");
const form = document.getElementById("cart-form") as HTMLFormElement;
const cartNumber = document.getElementById("cart-number");
const cartImg = document.getElementById("cart-img");

Array.from(cartList.children).forEach((li: HTMLLIElement) => {
    if(li.id != "cart-validate"){
        let liContent = li.textContent.split(" ");
        let menu = document.getElementsByClassName("menu " + liContent[0] + " " + liContent[1]);
        Array.from(menu).forEach(m => m.classList.add("hidden"));
    }
    else{
        validateButton = document.getElementById("cart-validate");
    }
})

if (cartList.children.length > 1) {
    cart.classList.remove("hidden");
}

cart.addEventListener("click", () => {
    cartList.classList.toggle("hidden")
})

window.addEventListener("click", (e) => {
    if(e.target != cartImg) cartList.classList.add("hidden");
})

Array.from(menuButtons).forEach((bt: HTMLElement) => {
    bt.addEventListener("click", () => {
        cart.classList.remove("hidden");

        if(cartList.children.length == 0){
            addValidateButton();
        }

        let value = bt.dataset.date + ' ' + bt.dataset.moment+ ' ' + bt.dataset.prix + ' €';
        let strComp = value.slice(11);
        let res = Array.from(cartList.children).find(x => x.textContent.slice(0, 12) == strComp);
        const menus = document.getElementsByClassName("menu " + bt.dataset.date + " " + bt.dataset.moment);

        if (res == undefined) {
            let li = document.createElement("li");
            li.textContent = value;
            li.classList.add("cart-item");

            li.addEventListener("click", () =>{
                Array.from(menus).forEach(m => m.classList.remove("hidden"));
                cartList.removeChild(li);
                const cartItems = document.getElementsByClassName("cart-item");

                if(cartItems.length == 0){
                    cart.classList.add("hidden");
                }
                else {
                    validateButton.textContent = "Total : " + calculateCartTotal();

                    cartNumber.textContent = cartItems.length.toString();
                }
            });

            cartList.insertBefore(li, validateButton);
            const cartItems = document.getElementsByClassName("cart-item");
            cartNumber.textContent = cartItems.length.toString();
        } else if (res.textContent != value) {
            res.textContent = value;
        }

        sessionStorage.setItem("cartList", cartList.innerHTML);

        validateButton.textContent = "Total : " + calculateCartTotal();
        //menu.classList.add("animate__bounceOut");
        //await new Promise(r => setTimeout(r, 800));

        Array.from(menus).forEach(m => m.classList.add("hidden"));
    })
})

function calculateCartTotal(){
    return Array.from(document.getElementsByClassName("cart-item"))
        .map(li =>  parseFloat(li.textContent.split(" ").at(-2)))
        .reduce((a, b) => a + b).toFixed(2);
}

function addValidateButton() {
    validateButton.id = "cart-validate";
    validateButton.textContent = "Valider";

    validateButton.addEventListener("click", () =>{
        postCart(Array.from(cartList.children).map(li => li.textContent));
    })

    cartList.append(validateButton);
}

/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string[]} meals the parameters to add to the url
 */
function postCart(meals: string[]) {
    for(let i = 0; i < meals.length - 1; i++){
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = String(i);
        hiddenField.value = meals[i];

        form.appendChild(hiddenField);
    }

    form.submit();
}
