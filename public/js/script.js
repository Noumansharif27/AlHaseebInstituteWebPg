// locoScroll();

// function locoScroll() {
//   scroll.on("scroll", (args) => {
//     // Get all current elements : args.currentElements
//     if (typeof args.currentElements["hey"] === "object") {
//       let progress = args.currentElements["hey"].progress;
//       console.log(progress);
//       // ouput log example: 0.34
//       // gsap example : myGsapAnimation.progress(progress);
//     }
//   });
// }

const header = document.querySelector(".header");
const toogleBtn = document.querySelector(".toogle-btn");
const toogleCross = document.querySelector(".toogle-cross");
const toogleBar = document.querySelector(".toogle-bar");
let toogleBarCount = 0;

toogleBtn.addEventListener("click", () => {
  if (toogleBarCount == 0) {
    toogleBar.style.right = "30%";
    toogleCross.style.opacity = "1";
    toogleBarCount = 1;
  }
});

toogleCross.addEventListener("click", () => {
  if (toogleBarCount == 1) {
    toogleBar.style.right = "110%";
    toogleCross.style.opacity = "0";
    toogleBarCount = 0;
  } else {
    toogleBar.style.right = "30%";
    toogleCross.style.opacity = "1";
    toogleBarCount = 1;
  }
});

preloader();

function preloader() {
  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => (preloader.style.display = "none"), 500);
    }
  });
}
