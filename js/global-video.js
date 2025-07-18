/**
 * Global Video JavaScript
 * Simple question-subtitle pair with audio11
 */

document.addEventListener('DOMContentLoaded', function() {
    // Single Question-Subtitle Pair
    const questionSubtitlePair = {
        question: "What's stopping from entering / expanding into new export markets?",
        subtitle: "Are you limited by lack of international marketing resources? We help represent promising Brands in a professional capacity and help crack deals in international markets, with sound strategy based on on-ground intelligence and action.",
        duration: 15000, // 15 seconds
        audioId: "audio11"
    };

    // DOM Elements
    const questionText = document.getElementById('questionText');
    const voiceoverText = document.getElementById('voiceoverText');
    const progressBar = document.getElementById('progressBar');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const restartBtn = document.getElementById('restartBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    
    // Audio element
    const audio = document.getElementById('audio11');

    // State Management
    let isPlaying = false;
    let isPaused = false;
    let presentationTimeout;

    // Initialize
    init();

    function init() {
        setupEventListeners();
        setupAudioEvents();
        showWelcomeMessage();
    }

    function setupEventListeners() {
        playPauseBtn.addEventListener('click', togglePlayPause);
        restartBtn.addEventListener('click', restartPresentation);
        
        // Keyboard controls
        document.addEventListener('keydown', function(e) {
            if (e.code === 'Space') {
                e.preventDefault();
                togglePlayPause();
            } else if (e.code === 'KeyR') {
                e.preventDefault();
                restartPresentation();
            }
        });
    }
    
    function setupAudioEvents() {
        if (audio) {
            audio.addEventListener('error', function(e) {
                console.error('Audio loading error:', e);
            });
            
            audio.addEventListener('ended', function() {
                console.log('Audio finished playing');
                // Auto transition to completion after audio ends
                setTimeout(() => {
                    endPresentation();
                }, 1000);
            });
        }
    }

    function showWelcomeMessage() {
        questionText.textContent = "Global Market Expansion";
        questionText.classList.add('active', 'gold');
        voiceoverText.textContent = "Click play to discover how we enable global market entry";
        voiceoverText.classList.add('active');
        progressBar.style.width = '0%';
    }

    function startPresentation() {
        if (isPaused) {
            resumePresentation();
            return;
        }

        isPlaying = true;
        updatePlayPauseButton();
        
        // Clear previous content
        clearContent();
        
        // Show question and subtitle together
        setTimeout(() => {
            displayQuestionSubtitle();
            playAudio();
            animateProgressBar();
            
            // Schedule completion after duration
            presentationTimeout = setTimeout(() => {
                if (isPlaying) {
                    stopAudio();
                    endPresentation();
                }
            }, questionSubtitlePair.duration);
        }, 200);
    }

    function displayQuestionSubtitle() {
        // Display question
        questionText.textContent = questionSubtitlePair.question;
        questionText.classList.add('active', 'gold');
        
        // Display subtitle
        voiceoverText.textContent = questionSubtitlePair.subtitle;
        voiceoverText.classList.add('active');
        if (questionSubtitlePair.subtitle.length > 80) {
            voiceoverText.classList.add('gold');
        }
    }

    function animateProgressBar() {
        progressBar.style.width = '0%';
        progressBar.style.transition = `width ${questionSubtitlePair.duration}ms linear`;
        
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 50);
    }

    function clearContent() {
        questionText.classList.remove('active', 'gold');
        voiceoverText.classList.remove('active', 'gold');
        progressBar.style.width = '0%';
    }

    function togglePlayPause() {
        if (!isPlaying && !isPaused) {
            startPresentation();
        } else if (isPlaying) {
            pausePresentation();
        } else if (isPaused) {
            resumePresentation();
        }
    }

    function pausePresentation() {
        isPlaying = false;
        isPaused = true;
        clearTimeout(presentationTimeout);
        pauseAudio();
        updatePlayPauseButton();
    }

    function resumePresentation() {
        isPlaying = true;
        isPaused = false;
        updatePlayPauseButton();
        
        // Resume audio
        resumeAudio();
        
        // Resume from current position - simplified for single pair
        startPresentation();
    }

    function restartPresentation() {
        clearTimeout(presentationTimeout);
        stopAudio();
        isPlaying = false;
        isPaused = false;
        clearContent();
        updatePlayPauseButton();
        showWelcomeMessage();
    }

    function endPresentation() {
        isPlaying = false;
        isPaused = false;
        clearTimeout(presentationTimeout);
        stopAudio();
        updatePlayPauseButton();
        
        // Show completion message
        setTimeout(() => {
            questionText.textContent = "Global Market Strategy Complete";
            questionText.classList.add('active', 'gold');
            voiceoverText.textContent = "Ready to expand globally? Explore our case studies below.";
            voiceoverText.classList.add('active');
            progressBar.style.width = '100%';
        }, 500);
    }

    function updatePlayPauseButton() {
        if (isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    // Audio control functions
    function playAudio() {
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => {
                console.error('Audio playback failed:', e);
            });
        }
    }
    
    function stopAudio() {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
    
    function pauseAudio() {
        if (audio && !audio.paused) {
            audio.pause();
        }
    }
    
    function resumeAudio() {
        if (audio && audio.paused) {
            audio.play().catch(e => {
                console.error('Audio resume failed:', e);
            });
        }
    }

    // Mobile responsiveness
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        const questionEl = document.getElementById('questionText');
        const voiceoverEl = document.getElementById('voiceoverText');
        
        if (isMobile) {
            questionEl.style.fontSize = '24px';
            voiceoverEl.style.fontSize = '18px';
        } else {
            questionEl.style.fontSize = '';
            voiceoverEl.style.fontSize = '';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
});