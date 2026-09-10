

document.addEventListener("DOMContentLoaded", function() {

console.log("Current Post ID:", wpData.postId);


 const linkTags = document.querySelectorAll('a');
 const updatedLinkTags = Array.prototype.slice.call(linkTags);


 updatedLinkTags.forEach(el => {
  el.classList.add('fade');
})
const links = document.querySelectorAll('a.fade');
const main = document.querySelector('.wp-theme-damsbaek-carpentry-custom');
//uses custom theme class that is already auto added to body tag of each page

// for (let i = 0; i < links.length; i++) {
//     links[i].addEventListener('click', function(event){
//         event.preventDefault();
//         const href = this.getAttribute('href');
//         main.classList.add('fade-out');
//         console.log('added fade-out')
//         setTimeout(() => {
//             window.location.href = href;
//             console.log('changes pages');
//         }, 900);
//     });
// }

 });


//nav scroll 

const logo = document.querySelector('header');
let previousScrollPosition = 0;

const isScrollingDown = () => {
  let goingDown = false;
  const scrollPosition = window.scrollY;

  if (scrollPosition > previousScrollPosition) {
    goingDown = true;
  }

  previousScrollPosition = scrollPosition;
  return goingDown;
};

window.addEventListener('scroll', function(event) {
  if (isScrollingDown()) {
    const headerHeight = logo.offsetHeight;
    console.log(headerHeight);
    console.log("scroll going down true");
    logo.classList.add("scroll-down");
    logo.style.top = "-111px";
    logo.classList.remove("scroll-up");
  } else {
    console.log("scroll going up true");
    logo.classList.add("scroll-up");
    logo.classList.remove("scroll-down");
      logo.style.top = "0"
  }
 
});


//About page hero effect
 const clipper = document.querySelector('.fade-image');
 const clipped = document.querySelector('.fade-reveal');
    
    // Total scrollable height of the page
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    window.addEventListener('scroll', () => {
      // 1. Calculate scroll percentage (0 to 1)
      const scrollFraction = window.scrollY / maxScroll;
    //   console.log(scrollFraction);
      
      // 2. Map the percentage to your target clip-path range (e.g., 100% down to 0%)
      const dynamicValue = 0 + (scrollFraction * 100 * 2);
    //   console.log(dynamicValue);

      const dynamicScaleValue = 1 + scrollFraction;
    //   console.log(dynamicScaleValue);
      
      // 3. Update only the targeted X-coordinate of the top-right and bottom-right corners
      if (clipper) {
        clipper.style.clipPath = `inset(0% 0% ${dynamicValue}% 0%)`;
        clipper.style.transform = `scale(${dynamicScaleValue})`;
        clipped.style.transform = `scale(${dynamicScaleValue})`;
      }
    });



    //Vanila waypoints
const waypoints = document.querySelectorAll('.fade-me');

const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

function checkpoints(){
 waypoints.forEach(waypoint => {
  const visible = elementIsVisibleInViewport(waypoint);
  if(visible){
    waypoint.classList.add('faded-in')
    // console.log('faded in');
  } else {
    // console.log('not visible');
  }
  })
}


window.addEventListener("scroll", checkpoints);

//Page change slide up


//use opacity to fade one image out on top of another. keep until you're done in case you want it
// const fadeimg = document.querySelector('.fade-image');
// const maxScrollPixels = 300; // Distance in pixels to complete the fade

// window.addEventListener('scroll', () => {
//   let scrollPosition = window.scrollY;
  
//   // Calculate opacity: 0 at top, 1 when scrolled by maxScrollPixels
//   let calculatedOpacity = scrollPosition / maxScrollPixels;
  
  
//   // Keep the value locked safely between 0 and 1
//   let finalOpacity = Math.min(Math.max(calculatedOpacity, 0), 100);
//   console.log (finalOpacity);

 //});