// Counter Animation for Credentials Section
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.credential-number');
        this.animated = false;
        this.init();
    }

    init() {
        if (this.counters.length > 0) {
            this.createObserver();
        }
    }

    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.animateCounters();
                }
            });
        }, {
            threshold: 0.5
        });

        // Observe the credentials section
        const credentialsSection = document.querySelector('.credentials-section');
        if (credentialsSection) {
            observer.observe(credentialsSection);
        }
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = this.extractNumber(counter.textContent);
            const suffix = this.extractSuffix(counter.textContent);
            
            if (target > 0) {
                this.animateCounter(counter, target, suffix);
            }
        });
    }

    extractNumber(text) {
        const match = text.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    }

    extractSuffix(text) {
        return text.replace(/\d+/, '');
    }

    animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 100; // Adjust speed by changing divisor
        const duration = 2000; // 2 seconds
        const stepTime = duration / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }
}

// Initialize counter animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CounterAnimation();
});

// Also initialize if the script is loaded after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CounterAnimation();
    });
} else {
    new CounterAnimation();
}