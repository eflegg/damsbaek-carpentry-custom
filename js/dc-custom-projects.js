

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




// OUTGOING PAGE - name only the card the user actually clicked
// window.addEventListener("pageswap", (event) => {
//   if (!event.viewTransition) return;

//   // Figure out which link was clicked from the navigation URL
//   const url = new URL(event.activation.entry.url);
//   const slug = url.pathname.split('/').filter(Boolean).pop();
//   // const slug = url.searchParams.get("slug");
//   console.log("clicked slug: ", slug);
//   if (!slug) return;

//   // Find that specific card and name it - right now, not in CSS
//   const clicked = document.querySelector(`.project-link>a[data-slug="${slug}"]`);
//   // if (clicked) {
//     clicked.style.viewTransitionName = `project-transition-${slug}`;
//     clicked.style.viewTransitionClass = `project-transition-${slug}`;
  //}

  // Clean up after the transition finishes (or fails)
  // event.viewTransition.finished.then(() => {
  //   if (clicked) {
  //     clicked.style.viewTransitionName = "";
  //     clicked.style.viewTransitionClass = "";
  //   }
  // });
// });

// INCOMING PAGE - match the name from the outgoing page
window.addEventListener("pagereveal", (event) => {
if (!event.viewTransition) {
    console.log(
      "No view transition - page didn't opt in or browser skipped it",
    );
    return;
  }

  // Pull the ID from our own URL
  // const url = new URL(window.location.href);
  // const destSlug = window.location.pathname.split('/').filter(Boolean).pop();
  // console.log("dest slug: ", destSlug); //this is mostly returning correctly
  // if (!destSlug) return;

  // Name the hero element to match the card that was clicked
  // const hero = document.querySelector(`.project-hero[data-slug="${destSlug}"]`);
  // //if (hero) {
  //       hero.style.viewTransitionName = `project-transition-${destSlug}`;
  //   hero.style.viewTransitionClass = `project-transition-${destSlug}`;
 // }

  // Clean up when done - element goes back to being unnamed
  // event.viewTransition.finished.then(() => {
  //   if (hero) {
  //     hero.style.viewTransitionName = "";
  //     hero.style.viewTransitionClass = "";
  //   }
  // });
});















