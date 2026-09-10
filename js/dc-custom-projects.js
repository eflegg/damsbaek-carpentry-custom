

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




















