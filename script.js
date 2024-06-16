let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('nav-toggle');
});

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('nav-toggle');
}

// slider control
const images = [
    'images/home1.JPG',
    'images/home2.JPG',
    'images/home3.JPG',
    'images/home4.JPG',
    'images/home5.JPG',
    'images/home6.JPG'    
  ]
  
let slideIndex = 0;
let intervalId =null;

// Update the background image
function updateBackground(nextIndex) {
    // Update slideIndex with provided index or move to the next
    slideIndex = nextIndex !== undefined ? nextIndex : (slideIndex + 1) % images.length;

    // Set the background image with a fade effect
    $('.home').css({
        'opacity': '0', // Hide before change
        'background-image': 'url(' + images[slideIndex] + ')' // Change the image
    }).animate({'opacity': '1'}, 500); // Fade in the new image

    // Reset the timer
    resetInterval();
}

// Resets the interval to change the background image every 5 seconds
function resetInterval() {
    clearInterval(intervalId); // Clear the existing interval
    intervalId = setInterval(() => updateBackground(), 5000); // Set a new interval
}

// Next/previous controls
function plusSlides(n) {
    let newIndex = (slideIndex + n + images.length) % images.length; // Correct calculation for new index
    updateBackground(newIndex); // Update the background with the new index
}

$(document).ready(function() {
    resetInterval(); // Initialize the interval on document ready
    updateBackground(slideIndex); // Set the first image immediately
});

// image viewer
function openImageViewer(src) {
    document.getElementById('imgZoom').src = src;
    document.getElementById('imageViewer').style.display = "flex";
}

function closeImageViewer() {
    document.getElementById('imageViewer').style.display = "none";
}

let scale = 1;
const zoomIn = () => {
    scale *= 1.1;
    document.getElementById('imgZoom').style.transform = `scale(${scale})`;
};

const zoomOut = () => {
    scale /= 1.1;
    document.getElementById('imgZoom').style.transform = `scale(${scale})`;
};

// image viewer dragging
document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('imgZoom');
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    img.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        this.style.cursor = 'grabbing';
    });

    img.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const rect = img.getBoundingClientRect();
            img.style.left = (e.clientX - offsetX) + 'px';
            img.style.top = (e.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        img.style.cursor = 'grab';
    });
});

