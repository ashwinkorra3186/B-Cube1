/**
 * B CUBE Consulting Website JavaScript
 * Adds interactivity and animations to the premium website
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const testimonialSlider = document.querySelector('.testimonial-slider-compact');
    const testimonialSlides = document.querySelectorAll('.testimonial-slider-compact .testimonial-slide');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    const testimonialDots = document.querySelector('.testimonial-dots');
    const contactForm = document.getElementById('contactForm');
    
    // Initialize the website
    initHeaderScroll();
    initMobileMenu();
    initTestimonialSlider();
    initSmoothScroll();
    initContactForm();
    initStatCounters();
    // initHeroScrollTransition(); // Removed hero questions functionality
    
    /**
     * Header scroll effect
     * Disabled as per user request - header should not be visible when scrolling
     */
    function initHeaderScroll() {
        // Function disabled - header will not be visible when scrolling
        // No scroll event listener added
    }
    
    /**
     * Mobile menu toggle
     * Handles the mobile menu open/close functionality
     */
    function initMobileMenu() {
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
            
            // Close menu when clicking on a link
            const navLinks = document.querySelectorAll('.main-nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mainNav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }
    }
    
    /**
     * Testimonial slider
     * Creates a simple slider for testimonials
     */
    function initTestimonialSlider() {
        if (!testimonialSlider || testimonialSlides.length === 0) return;
        
        let currentSlide = 0;
        let autoRotateInterval;
        
        // Hide all slides except the first one
        testimonialSlides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Auto-rotate testimonials every 5 seconds
        function startAutoRotate() {
            autoRotateInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        }
        
        function stopAutoRotate() {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
            }
        }
        
        // Previous button click
        if (prevTestimonialBtn) {
            prevTestimonialBtn.addEventListener('click', function() {
                stopAutoRotate();
                showSlide(currentSlide - 1);
                startAutoRotate();
            });
        }
        
        // Next button click
        if (nextTestimonialBtn) {
            nextTestimonialBtn.addEventListener('click', function() {
                stopAutoRotate();
                showSlide(currentSlide + 1);
                startAutoRotate();
            });
        }
        
        // Pause auto-rotate on hover
        testimonialSlider.addEventListener('mouseenter', stopAutoRotate);
        testimonialSlider.addEventListener('mouseleave', startAutoRotate);
        
        // Show a specific slide
        function showSlide(index) {
            // Handle index out of bounds
            if (index < 0) {
                index = testimonialSlides.length - 1;
            } else if (index >= testimonialSlides.length) {
                index = 0;
            }
            
            // Hide current slide
            testimonialSlides[currentSlide].style.display = 'none';
            
            // Show new slide
            testimonialSlides[index].style.display = 'block';
            
            // Update active dot
            updateActiveDot(index);
            
            // Update current slide index
            currentSlide = index;
        }
        
        // Start auto-rotation
        startAutoRotate();
        
        // Create dots for testimonial slider
        function createTestimonialDots() {
            if (!testimonialDots) return;
            
            testimonialSlides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) {
                    dot.classList.add('active');
                }
                
                dot.addEventListener('click', function() {
                    showSlide(index);
                });
                
                testimonialDots.appendChild(dot);
            });
        }
        
        // Update active dot
        function updateActiveDot(index) {
            if (!testimonialDots) return;
            
            const dots = testimonialDots.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Auto-advance slides every 5 seconds
        setInterval(function() {
            showSlide(currentSlide + 1);
        }, 5000);
    }
    
    /**
     * Smooth scrolling for navigation links
     */
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only process internal links
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Calculate header height for offset
                        const headerHeight = header ? header.offsetHeight : 0;
                        
                        // Scroll to element with offset for fixed header
                        window.scrollTo({
                            top: targetElement.offsetTop - headerHeight,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    /**
     * Contact form handling
     * Prevents default form submission and shows a success message
     */
    function initContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const formValues = Object.fromEntries(formData.entries());
                
                // In a real implementation, you would send this data to a server
                console.log('Form submitted with values:', formValues);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('form-success-message');
                successMessage.innerHTML = `
                    <h3>Thank you for your message!</h3>
                    <p>We will get back to you shortly.</p>
                `;
                
                // Replace form with success message
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // Style success message
                successMessage.style.textAlign = 'center';
                successMessage.style.padding = '40px 0';
            });
        }
    }
    
    /**
     * Animation on scroll
     * Adds fade-in animations to elements as they enter the viewport
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Add animation classes to elements
    function addAnimationClasses() {
        // Add animation classes to section headers
        document.querySelectorAll('.section-header').forEach(header => {
            header.classList.add('animate-on-scroll');
        });
        
        // Add animation classes to service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.classList.add('animate-on-scroll');
        });
        
        // Add animation classes to case study cards
        document.querySelectorAll('.case-study-card').forEach(card => {
            card.classList.add('animate-on-scroll');
        });
        
        // Add animation classes to team members
        document.querySelectorAll('.team-member').forEach(member => {
            member.classList.add('animate-on-scroll');
        });
    }
    
    // Initialize animations
    addAnimationClasses();
    initScrollAnimations();
});


/**
 * Stat Counters Animation
 * Animates the stat numbers on the team and about pages, counting up from 0 to their target values
 * Uses Intersection Observer to trigger animation when stats come into view
 */
function initStatCounters() {
    // Find all stat containers (both team and about pages)
    const statContainers = [
        document.querySelector('.team-stats'),
        document.querySelector('.about-stats')
    ].filter(container => container !== null);
    
    if (statContainers.length === 0) return;
    
    // Process each stat container
    statContainers.forEach(container => {
        // Store the original values and prepare for animation
        const statNumbers = container.querySelectorAll('.stat-number');
        const statData = [];
        
        // Prepare the data for each stat counter
        statNumbers.forEach((statElement, index) => {
            // Get the target value from the text content (removing the '+' sign)
            const targetText = statElement.textContent;
            const targetValue = parseInt(targetText.replace('+', ''));
            
            // Set starting values (1 for the first counter, 0 for the second)
            const startValue = index === 0 ? 1 : 0;
            
            // Store the original text to preserve the '+' sign
            const originalText = statElement.textContent;
            const hasPlusSign = originalText.includes('+');
            
            // Store the data
            statData.push({
                element: statElement,
                startValue,
                targetValue,
                originalText,
                hasPlusSign,
                animated: false
            });
            
            // Set initial value
            statElement.textContent = startValue + (hasPlusSign ? '+' : '');
        });
        
        // Create an animation function for the counters
        function animateCounters() {
            statData.forEach(stat => {
                if (stat.animated) return;
                
                // Mark as animated to prevent re-animation
                stat.animated = true;
                
                // Calculate animation duration and step size
                const duration = 2000; // 2 seconds
                const steps = 50; // Number of steps
                const stepDuration = duration / steps;
                const increment = (stat.targetValue - stat.startValue) / steps;
                
                let currentValue = stat.startValue;
                let currentStep = 0;
                
                // Create the animation interval
                const counterInterval = setInterval(() => {
                    currentStep++;
                    
                    if (currentStep >= steps) {
                        // Animation complete, set to final value
                        stat.element.textContent = stat.originalText;
                        clearInterval(counterInterval);
                    } else {
                        // Increment the value
                        currentValue += increment;
                        // Round to avoid floating point issues
                        const displayValue = Math.round(currentValue);
                        // Update the element
                        stat.element.textContent = displayValue + (stat.hasPlusSign ? '+' : '');
                    }
                }, stepDuration);
            });
        }
        
        // Use Intersection Observer to trigger animation when stats come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Start observing the stats section
        observer.observe(container);
    });
}

/**
 * Hero questions functionality removed
 * Hero section is now clean without questions and background images
 */
