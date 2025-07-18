// Floating Contact System JavaScript
class FloatingContact {
    constructor() {
        this.contactButton = document.querySelector('.contact-button');
        this.contactPanel = document.querySelector('.contact-panel');
        this.closeButton = document.querySelector('.close-panel');
        this.contactForm = document.querySelector('#floatingContactForm');
        this.floatingContact = document.querySelector('.floating-contact');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleResponsiveDesign();
    }

    setupEventListeners() {
        // Close button functionality
        if (this.closeButton) {
            this.closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closePanel();
            });
        }

        // Form submission
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission();
            });
        }

        // Panel interactions
        if (this.contactPanel) {
            this.contactPanel.addEventListener('mouseenter', () => {
                this.keepPanelOpen();
            });

            this.contactPanel.addEventListener('mouseleave', () => {
                this.scheduleClose();
            });
        }

        // Button interactions
        if (this.contactButton) {
            this.contactButton.addEventListener('mouseenter', () => {
                this.openPanel();
            });

            this.contactButton.addEventListener('mouseleave', () => {
                this.scheduleClose();
            });
        }

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!this.floatingContact.contains(e.target)) {
                this.closePanel();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePanel();
            }
        });
    }

    openPanel() {
        this.clearCloseTimer();
        this.floatingContact.classList.add('panel-open');
    }

    closePanel() {
        this.floatingContact.classList.remove('panel-open');
    }

    keepPanelOpen() {
        this.clearCloseTimer();
    }

    scheduleClose() {
        this.closeTimer = setTimeout(() => {
            this.closePanel();
        }, 300); // 300ms delay before closing
    }

    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }

    handleFormSubmission() {
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (replace with actual submission logic)
        this.showMessage('Thank you! Your message has been sent.', 'success');
        this.contactForm.reset();
        
        // Close panel after successful submission
        setTimeout(() => {
            this.closePanel();
        }, 2000);
    }

    showMessage(message, type) {
        // Remove existing message
        const existingMessage = this.contactPanel.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Insert message above submit button
        const submitButton = this.contactPanel.querySelector('.submit-button');
        submitButton.parentNode.insertBefore(messageElement, submitButton);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    handleResponsiveDesign() {
        // Handle responsive behavior
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        const handleResponsive = (e) => {
            if (e.matches) {
                // Mobile behavior
                this.setupMobileInteractions();
            } else {
                // Desktop behavior
                this.setupDesktopInteractions();
            }
        };

        mediaQuery.addListener(handleResponsive);
        handleResponsive(mediaQuery);
    }

    setupMobileInteractions() {
        // On mobile, use click instead of hover
        if (this.contactButton) {
            this.contactButton.addEventListener('click', () => {
                this.togglePanel();
            });
        }
    }

    setupDesktopInteractions() {
        // Desktop interactions are already set up in setupEventListeners
    }

    togglePanel() {
        if (this.floatingContact.classList.contains('panel-open')) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }
}

// Initialize floating contact system
document.addEventListener('DOMContentLoaded', () => {
    new FloatingContact();
});

// Add CSS for form messages
const style = document.createElement('style');
style.textContent = `
    .form-message {
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 14px;
        margin-bottom: 15px;
        text-align: center;
    }
    
    .form-message.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .form-message.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .floating-contact.panel-open .contact-panel {
        left: 100px !important;
    }
    
    .floating-contact:hover .contact-panel {
        left: 100px !important;
    }
`;
document.head.appendChild(style);