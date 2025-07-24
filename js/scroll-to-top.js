// Scroll to Top Button Functionality
class ScrollToTop {
    constructor() {
        this.button = null;
        this.init();
    }

    init() {
        this.createButton();
        this.bindEvents();
    }

    createButton() {
        // Create the scroll to top button
        this.button = document.createElement('button');
        this.button.className = 'scroll-to-top';
        this.button.innerHTML = '<i class="fas fa-chevron-up"></i>';
        this.button.setAttribute('aria-label', 'Scroll to top');
        this.button.setAttribute('title', 'Scroll to top');
        
        // Add button to the page
        document.body.appendChild(this.button);
    }

    bindEvents() {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            this.toggleButtonVisibility();
        });

        // Scroll to top when button is clicked
        this.button.addEventListener('click', () => {
            this.scrollToTop();
        });
    }

    toggleButtonVisibility() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollPosition > 300) {
            this.button.classList.add('show');
        } else {
            this.button.classList.remove('show');
        }
    }

    scrollToTop() {
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Initialize scroll to top functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollToTop();
});

// Also initialize if the script is loaded after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ScrollToTop();
    });
} else {
    new ScrollToTop();
}