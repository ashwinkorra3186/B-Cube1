/**
 * Professional Brand Questions Grid Display
 * Displays all strategic questions in organized sections
 */

document.addEventListener('DOMContentLoaded', function() {
    const dynamicHeadingElement = document.getElementById('dynamic-heading');
    const dynamicTextElement = document.getElementById('dynamic-text');
    
    if (!dynamicHeadingElement) return;

    // Organized brand questions by business category
    const questionSections = [
        {
            title: "Brand Foundation",
            icon: "fas fa-star",
            questions: [
                "What is your Brand promise?",
                "Is your Brand more than a name?"
            ]
        },
        {
            title: "Brand Perception",
            icon: "fas fa-heart",
            questions: [
                "What emotions are invoked by your Brand?",
                "What values are synonymous with your Brand?"
            ]
        },
        {
            title: "Business Growth",
            icon: "fas fa-chart-line",
            questions: [
                "Are you building business without building brand value?"
            ]
        },
        {
            title: "Strategic Intelligence",
            icon: "fas fa-brain",
            questions: [
                "Is your critical decision-making powered by on-ground insights and reliable intelligence?",
                "Is your strategy / business / investment plan tested and backed by robust intelligence?"
            ]
        },
        {
            title: "Global Expansion",
            icon: "fas fa-globe",
            questions: [
                "What's stopping you from entering / expanding into new export markets?"
            ]
        },
        {
            title: "India Market Entry",
            icon: "fas fa-map-marker-alt",
            questions: [
                "Looking for clarity, guidance or distribution in India?",
                "Are you confident that your interests in India are best protected?"
            ]
        },
        {
            title: "Start-up Support",
            icon: "fas fa-rocket",
            questions: [
                "Are you a start-up looking for support but worried about costs?"
            ]
        },
        {
            title: "Impact Measurement",
            icon: "fas fa-chart-bar",
            questions: [
                "Is the impact of your donation / investment measured and monitored?"
            ]
        }
    ];

    // Service phrases for animation
    const servicePhrases = [
        "CXO-Advisory & Support",
        "India Entry Acceleration", 
        "Powering Brand-Positioning",
        "Enabling Global Emergence",
        "Hand-Holding Start-ups",
        "Investment Advisory & Accountability"
    ];
    
    // Initialize the display
    function init() {
        if (dynamicTextElement) {
            dynamicTextElement.style.display = 'none';
        }
        
        // Show the B-CUBE heading and animate service phrases
        dynamicHeadingElement.style.display = 'block';
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.style.display = 'none';
        }
        
        // Start service phrases animation
        animateServicePhrases();
        
        // Create the questions section
        createQuestionsSection();
    }
    
    // Animate service phrases
    function animateServicePhrases() {
        let currentIndex = 0;
        
        function showNextPhrase() {
            if (currentIndex < servicePhrases.length) {
                dynamicHeadingElement.textContent = servicePhrases[currentIndex];
                dynamicHeadingElement.classList.add('phrase-animate-in');
                
                setTimeout(() => {
                    dynamicHeadingElement.classList.remove('phrase-animate-in');
                    dynamicHeadingElement.classList.add('phrase-animate-out');
                    
                    setTimeout(() => {
                        dynamicHeadingElement.classList.remove('phrase-animate-out');
                        currentIndex++;
                        showNextPhrase();
                    }, 500);
                }, 2500);
            } else {
                // Loop back to the beginning
                currentIndex = 0;
                showNextPhrase();
            }
        }
        
        showNextPhrase();
    }

    // Create the professional questions as a separate section with sequential display
    function createQuestionsSection() {
        // Find the hero section
        const heroSection = document.querySelector('.hero');
        
        // Create new section for questions
        const questionsSection = document.createElement('section');
        questionsSection.className = 'brand-questions-section';
        questionsSection.id = 'brand-questions';
        
        // Create container
        const container = document.createElement('div');
        container.className = 'container';
        
        // Create questions container
        const questionsContainer = document.createElement('div');
        questionsContainer.className = 'brand-questions-list';
        
        // Add title
        const title = document.createElement('h2');
        title.className = 'questions-title';
        title.textContent = 'Strategic Questions That Drive Success';
        questionsContainer.appendChild(title);
        
        // Add subtitle
        const subtitle = document.createElement('p');
        subtitle.className = 'questions-subtitle';
        subtitle.textContent = 'Explore the key questions that can transform your business strategy and brand positioning.';
        questionsContainer.appendChild(subtitle);
        
        // Create questions list container
        const questionsList = document.createElement('div');
        questionsList.className = 'questions-grouped-list';
        
        // Flatten all questions with their categories
        const allQuestions = [];
        questionSections.forEach(section => {
            section.questions.forEach(question => {
                allQuestions.push({
                    question: question,
                    category: section.title,
                    icon: section.icon
                });
            });
        });
        
        // Group questions as requested: 1-4, 5, 6-7, 8, 9-10, 11, 12
        const questionGroups = [
            { title: "Brand Foundation & Perception", questions: allQuestions.slice(0, 4), startIndex: 1 },
            { title: "Business Growth", questions: allQuestions.slice(4, 5), startIndex: 5 },
            { title: "Strategic Intelligence", questions: allQuestions.slice(5, 7), startIndex: 6 },
            { title: "Global Expansion", questions: allQuestions.slice(7, 8), startIndex: 8 },
            { title: "India Market Entry", questions: allQuestions.slice(8, 10), startIndex: 9 },
            { title: "Start-up Support", questions: allQuestions.slice(10, 11), startIndex: 11 },
            { title: "Impact Measurement", questions: allQuestions.slice(11, 12), startIndex: 12 }
        ];
        
        // Create each group
        questionGroups.forEach((group, groupIndex) => {
            const groupContainer = document.createElement('div');
            groupContainer.className = 'question-group';
            groupContainer.setAttribute('data-group', groupIndex);
            
            // Add single-question class for groups with only one question
            if (group.questions.length === 1) {
                groupContainer.classList.add('single-question');
            }
            
            // Group header
            const groupHeader = document.createElement('div');
            groupHeader.className = 'group-header';
            groupHeader.innerHTML = `
                <h3 class="group-title">${group.title}</h3>
                <div class="group-separator"></div>
            `;
            groupContainer.appendChild(groupHeader);
            
            // Questions in this group
            const groupQuestions = document.createElement('div');
            groupQuestions.className = 'group-questions';
            
            group.questions.forEach((item, index) => {
                const questionNumber = group.startIndex + index;
                const questionItem = document.createElement('div');
                questionItem.className = 'grouped-question-item';
                questionItem.setAttribute('data-index', questionNumber - 1);
                
                questionItem.innerHTML = `
                    <div class="question-number">
                        <span>${questionNumber}</span>
                    </div>
                    <div class="question-content">
                        <div class="question-category">
                            <i class="${item.icon}"></i>
                            <span>${item.category}</span>
                        </div>
                        <div class="question-text">${item.question}</div>
                    </div>
                `;
                
                groupQuestions.appendChild(questionItem);
            });
            
            groupContainer.appendChild(groupQuestions);
            questionsList.appendChild(groupContainer);
        });
        
        questionsContainer.appendChild(questionsList);
        
        // Add consultation button after questions
        const consultationSection = document.createElement('div');
        consultationSection.className = 'consultation-cta-section';
        consultationSection.innerHTML = `
            <div class="consultation-content">
                <h3 class="consultation-title">Ready to Transform Your Business?</h3>
                <p class="consultation-subtitle">Strategic Brand Differentiation & Global Growth</p>
                <button class="consultation-btn" onclick="scrollToContact()">
                    <i class="fas fa-calendar-alt"></i>
                    <span>BOOK A CONSULTATION</span>
                </button>
            </div>
        `;
        questionsContainer.appendChild(consultationSection);
        container.appendChild(questionsContainer);
        questionsSection.appendChild(container);
        
        // Insert the new section after the hero section
        heroSection.parentNode.insertBefore(questionsSection, heroSection.nextSibling);
        
        // Animate questions on scroll
        animateQuestionsOnScroll();
    }
    
    // Add scroll animation for question groups
    function animateQuestionsOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const groupIndex = parseInt(entry.target.getAttribute('data-group'));
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, groupIndex * 300); // Stagger animation for groups
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.question-group').forEach(group => {
            observer.observe(group);
        });
    }
    
    // Add global function to scroll to contact
    window.scrollToContact = function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Start the grid display
    init();
});
