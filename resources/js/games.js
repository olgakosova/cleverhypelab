function hideContentSections(){
  $(".container-change").each(function(){
      $(this).addClass("hide-section");
  });
}

$( document ).ready(function() {

  $(".menu-link").click(function(){
      hideContentSections();
      $("." + $(this).data("section")).removeClass("hide-section");
  });
});

const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
tl.fromTo("#block-1", { x: "-100%" }, { x: "0%", duration: 1 });
tl.fromTo("#block-3", { x: "100%" }, { x: "0%", duration: 1 });
tl.fromTo("h1", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".container-change", { opacity: 0 }, { opacity: 1, duration: 2 }, );
