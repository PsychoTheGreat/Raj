const imageTrack = document.getElementById("imageTrack");
const scrollLeftButton = document.getElementById("scrollLeft");
const scrollRightButton = document.getElementById("scrollRight");
const imageTrackContainer = document.getElementById("imageTrackContainer");

let scrollPosition = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;

// Function to scroll images based on direction
function scrollImages(direction) {
    const containerWidth = imageTrackContainer.offsetWidth;
    const imageWidth = imageTrack.children[0].offsetWidth + 10; // Image width + margin
    const maxScroll = imageTrack.scrollWidth - containerWidth;

    if (direction === "right") {
        scrollPosition = Math.min(scrollPosition + imageWidth, maxScroll);
    } else if (direction === "left") {
        scrollPosition = Math.max(scrollPosition - imageWidth, 0);
    }

    imageTrack.style.transform = `translateX(-${scrollPosition}px)`;
}

// Mouse and touch drag functionality
function startDrag(e) {
    isDragging = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
}

function duringDrag(e) {
    if (!isDragging) return;

    currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - startX;

    // Update position temporarily
    imageTrack.style.transform = `translateX(${deltaX - scrollPosition}px)`;
}

function endDrag(e) {
    if (!isDragging) return;

    isDragging = false;
    const endX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = endX - startX;

    const imageWidth = imageTrack.children[0].offsetWidth + 10;
    if (deltaX > 50) {
        // Swipe right
        scrollImages("left");
    } else if (deltaX < -50) {
        // Swipe left
        scrollImages("right");
    } else {
        // Return to the current position if swipe isn't far enough
        imageTrack.style.transform = `translateX(-${scrollPosition}px)`;
    }
}

// Add event listeners for buttons
scrollLeftButton.addEventListener("click", () => scrollImages("left"));
scrollRightButton.addEventListener("click", () => scrollImages("right"));

// Add event listeners for swipe
imageTrackContainer.addEventListener("mousedown", startDrag);
imageTrackContainer.addEventListener("mousemove", duringDrag);
imageTrackContainer.addEventListener("mouseup", endDrag);
imageTrackContainer.addEventListener("mouseleave", endDrag);

imageTrackContainer.addEventListener("touchstart", startDrag);
imageTrackContainer.addEventListener("touchmove", duringDrag);
imageTrackContainer.addEventListener("touchend", endDrag);
