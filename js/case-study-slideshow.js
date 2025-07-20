/**
 * Case Study Slideshow Functionality
 * Automatic rotation every 15 seconds with manual navigation
 */

class CaseStudySlideshow {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.case-study-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevCaseBtn');
        this.nextBtn = document.getElementById('nextCaseBtn');
        this.totalSlides = this.slides.length;
        this.autoRotateInterval = null;
        this.autoRotateDelay = 15000; // 15 seconds
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start auto-rotation
        this.startAutoRotation();
        
        // Initialize first slide
        this.showSlide(0);
    }
    
    setupEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.goToPrevSlide();
                this.resetAutoRotation();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.goToNextSlide();
                this.resetAutoRotation();
            });
        }
        
        // Indicator dots
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoRotation();
            });
        });
        
        // Pause auto-rotation on hover
        const slideshow = document.querySelector('.case-studies-slideshow');
        if (slideshow) {
            slideshow.addEventListener('mouseenter', () => {
                this.pauseAutoRotation();
            });
            
            slideshow.addEventListener('mouseleave', () => {
                this.startAutoRotation();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.goToPrevSlide();
                this.resetAutoRotation();
            } else if (e.key === 'ArrowRight') {
                this.goToNextSlide();
                this.resetAutoRotation();
            }
        });
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active', 'fade-out');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        
        // Update indicators
        this.indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        this.currentSlide = index;
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides && index !== this.currentSlide) {
            this.showSlide(index);
        }
    }
    
    goToNextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(nextIndex);
    }
    
    goToPrevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(prevIndex);
    }
    
    startAutoRotation() {
        this.autoRotateInterval = setInterval(() => {
            this.goToNextSlide();
        }, this.autoRotateDelay);
    }
    
    pauseAutoRotation() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
        }
    }
    
    resetAutoRotation() {
        this.pauseAutoRotation();
        this.startAutoRotation();
    }
    
    destroy() {
        this.pauseAutoRotation();
        // Remove event listeners if needed
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the brand questions page
    if (document.querySelector('.case-studies-slideshow')) {
        new CaseStudySlideshow();
    }
});

// Handle page visibility changes to pause/resume auto-rotation
document.addEventListener('visibilitychange', () => {
    const slideshow = window.caseStudySlideshow;
    if (slideshow) {
        if (document.hidden) {
            slideshow.pauseAutoRotation();
        } else {
            slideshow.startAutoRotation();
        }
    }
});