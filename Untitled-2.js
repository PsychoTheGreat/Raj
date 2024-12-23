// script.js
document.getElementById('scrollBtn').addEventListener('click', function() {
    const container = document.querySelector('.scrollable-content');
    // Scroll the container to the left by 300px
    container.scrollBy({
        left: -300,  // Negative value for left scroll
        behavior: 'smooth'  // Smooth scrolling
    });
});

document.getElementById('scrollRight').addEventListener('click', function() {
    const container = document.querySelector('.scrollable-content');
    // Scroll the container to the right by 300px
    container.scrollBy({
        left: 300,  // Positive value for right scroll
        behavior: 'smooth'  // Smooth scrolling
    });
});

const track = document.getElementById('carouselTrack');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;

function updateCarousel() {
    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < track.children.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

