
document.getElementById('year').textContent = new Date().getFullYear();

    // Typing effect: "Welcome to my Porfolio"
    (function () {
      var el = document.getElementById('typing-text');
      if (!el) return;
      var phrase = 'Welcome to my Website';
      var i = 0;
      var speed = 80;
      function type() {
        if (i < phrase.length) {
          el.textContent += phrase[i];
          i++;
          setTimeout(type, speed);
        }
      }
      type();
    })();

    // Landing: redirect to about after max 20s, or on Welcome click / click anywhere
    (function () {
      var landing = document.getElementById('landing');
      var btn = document.getElementById('landing-btn');
      var done = false;
      function goToAbout() {
        if (done) return;
        done = true;
        landing.classList.add('landing-hidden');
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
      }
      if (btn) btn.addEventListener('click', function (e) { e.stopPropagation(); goToAbout(); });
      landing.addEventListener('click', goToAbout);
      setTimeout(goToAbout, 3000);
    })();

    const options = {
  root: null, // Use the browser viewport as the container
  threshold: 0.3 // Trigger when 30% of the timeline is visible
};

// The callback function that runs when the element is seen
const handleIntersection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add the 'is-active' class to start CSS animations
      entry.target.classList.add('is-active');
      // Once the animation starts, we can stop watching this element
      observer.unobserve(entry.target);
    }
  });
};

// Create the observer instance
const observer = new IntersectionObserver(handleIntersection, options);

// Tell the observer to watch your timeline
const target = document.querySelector('.js-scroll-trigger');
if (target) {
  observer.observe(target);
}

//Shuffle photos
const photos = [
  "Resources/Photo.jpeg", 
  "Resources/RedwoodRun.png", 
  "Resources/DogPawPainting.png",
  "Resources/DogHeartPainting.png"
];

let currentIndex = 0;

// 2. Select the image using its class name
const photoElement = document.querySelector(".about-photo");

function shufflePhoto() {
  currentIndex = (currentIndex + 1) % photos.length;
  photoElement.src = photos[currentIndex];
}

setTimeout(() => {
  shufflePhoto();
  setInterval(shufflePhoto, 3000);
  

}, 5000); 

// Loading the different section
document.addEventListener('DOMContentLoaded', () => {
  const options = {
    threshold: 0.15, // Trigger when 15% of the section is visible
    rootMargin: "0px 0px -50px 0px" // Triggers slightly before it hits the bottom
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // We keep observing so it re-triggers if they scroll up and down, 
        // or use observer.unobserve(entry.target) to only happen once.
      }
    });
  }, options);

  // Target all your sections and cards
  const targets = document.querySelectorAll('section, .card, .organizations-section, .about-education-title');
  targets.forEach(target => {
    target.classList.add('reveal'); 
    observer.observe(target);
  });
});

