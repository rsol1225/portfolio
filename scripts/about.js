document.getElementById('year').textContent = new Date().getFullYear();

function initShuffler(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const photos = container.querySelectorAll('.hobby-photo');
    const dots = container.querySelectorAll('.hobby-dot');
    let index = 0;

    function cycle() {
        photos[index].classList.remove('active');
        dots[index].classList.remove('active');
        index = (index + 1) % photos.length;
        photos[index].classList.add('active');
        dots[index].classList.add('active');
    }

    setInterval(cycle, 3000);

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            photos[index].classList.remove('active');
            dots[index].classList.remove('active');
            index = i;
            photos[i].classList.add('active');
            dots[i].classList.add('active');
        });
    });
}

initShuffler('org-shuffler');
initShuffler('hobby-shuffler');