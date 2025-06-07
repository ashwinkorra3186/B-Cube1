/**
 * Dynamic Text Animation
 * Displays dynamic headings and text phrases with a typewriter effect
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the dynamic elements
    const dynamicHeadingElement = document.getElementById('dynamic-heading');
    const dynamicTextElement = document.getElementById('dynamic-text');
    
    if (!dynamicHeadingElement || !dynamicTextElement) return;

    // Array of headings to display
    const headings = [
        "Power-Position Your Brand",
        "Enabling Global Emergence",
        "India Market Entry and Acceleration",
        "Hand-Holding Start-ups",
        "CEO & CMO Support"
    ];

    // Array of phrases to display
    const phrases = [
        "Discover & Drive Differentiation, Craft Compelling Communication",
        "International Market Penetration",
        "Protected Interests, Powered Navigation & Strategic Approach",
        "Feasibility Assessments & Investor Engagement",
        "Intelligence-Powered Trusted Advisory"      
    ];

    let currentPhraseIndex = 0;
    let currentWordIndex = 0;
    let words = [];
    let isDeleting = false;
    let typingSpeed = 150; // milliseconds per word
    let pauseTime = 4000; // time to pause at the end of a phrase

    // Initialize the animation
    function init() {
        // Set the initial heading
        dynamicHeadingElement.textContent = headings[currentPhraseIndex];
        
        // Split the current phrase into words
        words = phrases[currentPhraseIndex].split(' ');
        
        // Start the typing animation
        animateText();
    }

    // Animate the text with a typewriter effect
    function animateText() {
        // Calculate how many words to show (2 at a time)
        const wordsToShow = 2;
        const endIndex = Math.min(currentWordIndex + wordsToShow, words.length);
        
        // Get the current text to display
        const currentText = words.slice(0, endIndex).join(' ');
        
        // Update the text element
        dynamicTextElement.textContent = currentText;
        
        // Set the next timeout based on the current state
        let timeout = typingSpeed;
        
        if (!isDeleting) {
            // If we're typing and reached the end of the phrase
            if (endIndex === words.length) {
                // Pause at the end of the phrase
                timeout = pauseTime;
                isDeleting = true;
            } else {
                // Move to the next set of words
                currentWordIndex += wordsToShow;
            }
        } else {
            // If we're deleting
            if (endIndex <= wordsToShow) {
                // Move to the next phrase
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                
                // Update the heading for the new phrase
                dynamicHeadingElement.textContent = headings[currentPhraseIndex];
                
                // Update the words for the new phrase
                words = phrases[currentPhraseIndex].split(' ');
                currentWordIndex = 0;
                isDeleting = false;
            } else {
                // Continue deleting
                currentWordIndex -= wordsToShow;
            }
        }
        
        // Schedule the next animation frame
        setTimeout(animateText, timeout);
    }

    // Start the animation
    init();
});
