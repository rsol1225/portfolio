document.getElementById('year').textContent = new Date().getFullYear();


const hobbyPhotos = document.querySelectorAll('.hobby-photo');
const hobbyDots = document.querySelectorAll('.hobby-dot');
let hobbyIndex = 0;

function cycleHobby() {
    hobbyPhotos[hobbyIndex].classList.remove('active');
    hobbyDots[hobbyIndex].classList.remove('active');
    hobbyIndex = (hobbyIndex + 1) % hobbyPhotos.length;
    hobbyPhotos[hobbyIndex].classList.add('active');
    hobbyDots[hobbyIndex].classList.add('active');
}

setInterval(cycleHobby, 3000);

hobbyDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        hobbyPhotos[hobbyIndex].classList.remove('active');
        hobbyDots[hobbyIndex].classList.remove('active');
        hobbyIndex = i;
        hobbyPhotos[i].classList.add('active');
        hobbyDots[i].classList.add('active');
    });
});