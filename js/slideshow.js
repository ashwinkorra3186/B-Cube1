/**
 * Question Slideshow
 * Auto-advancing slideshow with manual controls and smooth transitions
 */

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.question-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0 || dots.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    const slideTime = 5000; // 5 seconds per slide
    
    // Initialize slideshow
    function init() {
        showSlide(0);
        startAutoSlide();
        addEventListeners();
    }
    
    // Show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add prev class to current slide for exit animation
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('prev');
        }
        
        // Update current slide index
        currentSlide = index;
        
        // Show new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Go to next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Go to previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    // Start auto-advance
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, slideTime);
    }
    
    // Stop auto-advance
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }
    
    // Restart auto-advance
    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Add event listeners
    function addEventListeners() {
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                restartAutoSlide(); // Restart timer when user interacts
            });
        });
        
        // Pause on hover
        const slideshow = document.querySelector('.question-slideshow');
        if (slideshow) {
            slideshow.addEventListener('mouseenter', stopAutoSlide);
            slideshow.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                restartAutoSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                restartAutoSlide();
            }
        });
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (slideshow) {
            slideshow.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            slideshow.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
                restartAutoSlide();
            }
        }
    }
    
    // Initialize the slideshow
    init();
});