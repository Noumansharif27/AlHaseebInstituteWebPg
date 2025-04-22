locoScroll();

function locoScroll() {
  scroll.on("scroll", (args) => {
    // Get all current elements : args.currentElements
    if (typeof args.currentElements["hey"] === "object") {
      let progress = args.currentElements["hey"].progress;
      console.log(progress);
      // ouput log example: 0.34
      // gsap example : myGsapAnimation.progress(progress);
    }
  });
}

console.warn("JS is working");
