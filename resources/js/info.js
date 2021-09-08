const mouse = document.querySelector(".cursor");

function cursor(e){
    mouse.style.top = e.pageY + "px";
    mouse.style.left = e.pageX + "px";
} 

function activeCursor(e){
    const item = e.target;
    gsap.to(".title-swipe", 1, { y: "100" }); 
} 
function activeCursor(e){
    const item = e.target;
    if (item.classList.contains("title")) {
        mouse.classList.add("nav-active");
        gsap.to(".title-swipe", 1, { y: "0" }); 
    } else {
        mouse.classList.remove("nav-active");
        gsap.to(".title-swipe", 1, { y: "100%" });
    } 
} 

window.addEventListener("mouseover", activeCursor);
window.addEventListener("mousemove", cursor);
