/**
 * B CUBE Consulting - Timeline Animation and 3D Effects
 * Handles the interactive elements of the horizontal timeline
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize timeline elements
    initTimeline();
    
    // Add 3D tilt effect to timeline content
    addTiltEffect();
    
    // Add scroll animation for timeline items
    addScrollAnimation();
});

/**
 * Initialize timeline elements and floating elements
 */
function initTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    
    // Create floating elements
    for (let i = 0; i < 5; i++) {
        const floatingElement = document.createElement('div');
        floatingElement.className = 'floating-element';
        timelineContainer.appendChild(floatingElement);
    }
    
    // Set all timeline items to visible initially
    document.querySelectorAll('.timeline-item').forEach(item => {
        setTimeout(() => {
            item.classList.add('visible');
        }, 300 + Math.random() * 500);
    });
}

/**
 * Add 3D tilt effect to timeline content boxes
 */
function addTiltEffect() {
    document.querySelectorAll('.timeline-content').forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const box = this.getBoundingClientRect();
            const centerX = box.left + box.width / 2;
            const centerY = box.top + box.height / 2;
            const percentX = (e.clientX - centerX) / (box.width / 2);
            const percentY = (e.clientY - centerY) / (box.height / 2);
            
            const maxRotate = 5; // Maximum rotation in degrees
            
            this.style.transform = `
                perspective(1000px)
                rotateY(${percentX * maxRotate}deg)
                rotateX(${-percentY * maxRotate}deg)
                translateZ(10px)
            `;
            
            // Add shadow effect based on tilt
            const shadowX = percentX * 10;
            const shadowY = percentY * 10;
            this.style.boxShadow = `
                ${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.1)
            `;
        });
        
        // Reset transform on mouse leave
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add hover effect to timeline nodes
    document.querySelectorAll('.timeline-node').forEach(node => {
        node.addEventListener('mouseover', function() {
            this.style.transform = 'translateZ(20px) scale(1.1)';
            this.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.8)';
        });
        
        node.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

/**
 * Add scroll animation for timeline items
 */
function addScrollAnimation() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    // Optionally remove the visible class when out of view
                    // entry.target.classList.remove('visible');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        // Observe all timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.classList.add('visible');
        });
    }
}

/**
 * Add parallax effect to floating elements
 */
window.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.querySelectorAll('.floating-element').forEach((element, index) => {
        const depth = 0.05 + (index * 0.01);
        const moveX = mouseX * depth * 100;
        const moveY = mouseY * depth * 100;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});
