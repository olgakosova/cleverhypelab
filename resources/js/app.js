
/*Animate Intro*/
function animateIntro() {
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
tl.to(".creative-text", { y: "0%", duration: 1, delay: 0.3, stagger: 0.2 });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");
tl.fromTo(".navbar", { y: "-100" }, { y: "0%", duration: 1 });
tl.fromTo("#text-title", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1.5");
tl.fromTo(".social-media", { opacity: 0 }, { opacity: 1, duration: 1 }, );
$(document).ready(function () { 
    setTimeout(function() {
        $("body").removeClass("hide-it");
    }, 3800);
 });
}


function myFirstTime() { 
    var elem = document.getElementById("intro-one");
    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
    if (! localStorage.noFirstVisit) {
        console.log('first time');
        localStorage.noFirstVisit = "1";
        animateIntro();
    } else {
		elem.style.display = "none";
        tl.to(".slider-one", { y: "-100%", duration: 2.5}, "-=.7");
        tl.to(".slider-two", { y: "-100%", duration: 1}, "-=1.4");
		document.querySelector('body').classList.remove('hide-it');
		setTimeout(function() {window.scrollTo(0, 0);},300)
    }
}

window.addEventListener("load", myFirstTime);

/*Read More*/
$( document ).ready(function() {
    $(".click-more").click(function(){
        if($("." + $(this).data("section")).hasClass("display"))
         { $(".promo-" + $(this).data("section")).addClass("display");
           $("." + $(this).data("section")).removeClass("display");
         } else { 
            $("." + $(this).data("section")).addClass("display");
            $(".promo-" + $(this).data("section")).removeClass("display");
        }
    });
});



const mouse = document.querySelector(".cursor");
const burger = document.querySelector(".toggle-click");
const close = document.querySelector("#close-toggle");

function cursor(e){
    mouse.style.top = e.pageY + "px";
    mouse.style.left = e.pageX + "px";
} 
function activeCursor(e){
    const item = e.target;
    if (item.classList.contains("nav-disap")) {
        mouse.classList.add("nav-active");
        //gsap.to(".title-swipe", 1, { y: "0" }); 
    } else {
        mouse.classList.remove("nav-active");
        //gsap.to(".title-swipe", 1, { y: "100%" });
    } 
    if (item.classList.contains("nav-circle")) {
        mouse.classList.add("nav-social");
    } else {
    mouse.classList.remove("nav-social");
    }
} 

/*Reveal Contact Form*/
function navToggle(e) {
    let content = document.querySelector("#content");
    gsap.to("#content", 1, { clipPath: "circle(2500px at 100% -10%)", duration: 1 });
    document.body.classList.add("hide-it");
    content.classList.remove("display");
  }

function closeToggle(e) {
gsap.to("#content", 1, { clipPath: "circle(50px at 100% -10%)", duration: 1 });
gsap.to(".slider-two", { y: "-100%", duration: 2});
document.body.classList.remove("hide-it");
content.classList.add("display");
}


//Event listeners
close.addEventListener("click", closeToggle);
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

//Scroll Animation
let controller;
let slideScene;
let pageScene;
let detailScene;

function animateSlides() {
    //Init Controller
    controller = new ScrollMagic.Controller();
    //Select some things
    const sliders = document.querySelectorAll(".slide");
    //Loop over each sllide
    sliders.forEach((slide,index,slides) => {
      const revealImg = slide.querySelector(".reveal-img");
      const img = slide.querySelector(".img");
      const revealText = slide.querySelector(".reveal-text");
     //GSAP
        const slideTl = gsap.timeline({defaults: {duration: 1, ease: "power2.inOut"}
        });
        slideTl.fromTo(revealImg, {x:"0"}, {x:"100%"});
        slideTl.fromTo(img, {scale:1.5}, {scale:1}, "-=1" );
        slideTl.fromTo(revealText, {x: "0%"}, {x:"100%"}, "-=0.75");
        //Create Scene
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.15,
            reverse: false,
        })
        .setTween(slideTl)
        /*.addIndicators({
         colorStart: "white",
         colorTrigger:"white",
         name: "slide"
        })*/
        .addTo(controller);
        //New Animation
        const pageTl = gsap.timeline();
        let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
        pageTl.fromTo(nextSlide, {y: "0%"}, {y: "50%"});
        pageTl.fromTo(slide, {opacity: 1, scale: 1}, {opacity: 0, scale: 0.5})
        pageTl.fromTo(nextSlide, {y: "50%"}, {y: "0%"}, "-=0.5") ;
        //Create new scene
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0
        })
      /* .addIndicators({
        colorStart: "white",
        colorTrigger:"white",
        name: "page", 
        indent: 200
    })*/
        .setPin(slide , {pushFollowers: false})
        .setTween(pageTl)
        .addTo(controller)
    });
}
    animateSlides();
    animateText();

    function animateText() {
        controller = new ScrollMagic.Controller();
        const textTl = gsap.timeline({ defaults: { ease: "power1.out" } });
        const about =  document.querySelector(".about");

        textTl.to(".s-about", { y: "0%", duration: 1, stagger: 0.2 });
        textTl.fromTo(".about-us-text", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=.5");

        slideScene = new ScrollMagic.Scene({
            triggerElement: about,
            triggerHook: 0.8
        })

        .setTween(textTl)
       /* .addIndicators({
         colorStart: "yellow",
         colorTrigger:"yellow",
         name: "about"
        })*/
        .addTo(controller);
    }

