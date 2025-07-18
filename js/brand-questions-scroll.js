/**
 * Brand Questions Scroll Animation
 * Simple scroll animations for the clean layout
 */

document.addEventListener('DOMContentLoaded', function() {
    // Animate sections on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all question sections
    const questionSections = document.querySelectorAll('.brand-question-section');
    questionSections.forEach(section => {
        observer.observe(section);
    });

    // Add scroll animations to question text elements
    questionSections.forEach(section => {
        const questionText = section.querySelector('.question-text');
        if (questionText) {
            questionText.classList.add('scroll-animate');
        }
    });

    // Smooth scrolling for any internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Optional: Add a subtle fade-in animation on page load
    setTimeout(() => {
        const pageBanner = document.querySelector('.page-banner');
        if (pageBanner) {
            pageBanner.classList.add('fade-in');
        }
    }, 200);
});