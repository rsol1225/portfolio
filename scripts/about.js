//Shuffle photos
document.addEventListener("DOMContentLoaded", () => {
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
});