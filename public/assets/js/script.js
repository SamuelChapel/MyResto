// @ts-check
var buttonTop = document.getElementById("myBtn");
window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        buttonTop.style.display = "block";
    }
    else {
        buttonTop.style.display = "none";
    }
};
buttonTop.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
