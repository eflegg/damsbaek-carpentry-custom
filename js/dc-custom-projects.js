// adding custom code to turn query loop into slider

document.addEventListener("DOMContentLoaded", function () {
  console.log('wrappers found');
    const wrappers = document.querySelectorAll(".custom-carousel-wrapper");

    wrappers.forEach((wrapper) => {
        const track = wrapper.querySelector(".wp-block-post-template");
        if (!track) return;

        const slides = track.querySelectorAll(":scope > li");
        if (slides.length === 0) return;

        let currentIndex = 0;

        // 1. Dynamically append navigation buttons below the wrapper
        const navContainer = document.createElement("div");
        navContainer.className = "carousel-nav-buttons";
        navContainer.innerHTML = `
            <button class="prev-btn" disabled>&#10094; Prev</button>
            <button class="next-btn">Next &#10095;</button>
        `;
        wrapper.after(navContainer);

        const prevBtn = navContainer.querySelector(".prev-btn");
        const nextBtn = navContainer.querySelector(".next-btn");

        // 2. Core movement logic
        function updateCarousel() {
            const slideWidth = slides[0].getBoundingClientRect().width;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
            
            // Calculate structural distance to move
            let moveDistance = currentIndex * (slideWidth + gap);

            // Apply smooth translation
            track.style.transform = `translateX(-${moveDistance}px)`;

            // Handle UI button disabled states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === slides.length - 1;
        }

        // 3. Event Listeners
        nextBtn.addEventListener("click", () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // Optional: Recalculate on window resize for complete responsiveness
        window.addEventListener("resize", updateCarousel);
    });
});







const workHero = document.querySelector('.project-hero');
workHero.id = 'work-hero';





// Drop this in your pages to see what's actually happening
window.addEventListener("pagereveal", (event) => {
  if (!event.viewTransition) {
    console.log(
      "No view transition - page didn't opt in or browser skipped it",
    ); } else {console.log("transition worked")};

  event.viewTransition.finished
    .then(() => console.log("Transition completed ✅"))
    .catch((err) => {
      // You'll see "TimeoutError" here and nowhere else
      console.error("Transition killed:", err.name, err.message);
    });
});

window.addEventListener("pageswap", (event) => {
  if (event.viewTransition) {
    event.viewTransition.finished.catch((err) => {
      // Log it, send it to your analytics, whatever
      console.warn("Outgoing transition aborted:", err.name);
    });
  }
});


 
//Adding the data attribute for the slug to use later. Find the custom class on the listing blocks, target the link, get the href then the slug
document.addEventListener("DOMContentLoaded", function() {

    const projectLinks = document.querySelectorAll('.project-link>a');
    projectLinks.forEach(el => {
      const urlObj = el.href;
        const pathSegments = urlObj.split('/').filter(Boolean);
         const slug = pathSegments[pathSegments.length - 1];
         el.dataset.slug = slug;
          //  console.log("project link slug: ",slug); 
    })
});

//Adding the data attribute to the destination tag based on project hero class
document.addEventListener("DOMContentLoaded", function() {
    const projectHero = document.querySelectorAll('.project-hero');
    const currentSlug = window.location.pathname.split('/').filter(Boolean).pop();
    console.log("current slug: ", currentSlug);
    projectHero.forEach(hero => {
        hero.dataset.slug = currentSlug;
    })
});




















