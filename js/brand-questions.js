/**
 * Brand Questions Video JavaScript - Simplified Version
 * Clean question-subtitle presentation with individual timing
 */

document.addEventListener('DOMContentLoaded', function() {
    // Question-Subtitle Pairs with individual timing and audio
    const questionSubtitlePairs = [
        {
            question: "What is your Brand promise?",
            subtitle: "How is your Brand remembered as?",
            duration: 3000, // 3 seconds
            audioId: "audio1"
        },
        {
            question: "Is your Brand more than a name?",
            subtitle: "What is your Brand remembered for?",
            duration: 3000, // 3 seconds
            audioId: "audio2"
        },
        {
            question: "What emotions are invoked by your Brand?",
            subtitle: "What does your Brand translate to?",
            duration: 3000, // 3 seconds
            audioId: "audio3"
        },
        {
            question: "What values are synonymous with your Brand?",
            subtitle: "Your Brand is synonymous with the Promise you impress as a Brand, with your values and the reason you establish to be remembered, related to, preferred, and loved.",
            duration: 11000, // 11 seconds - increased for longer text
            audioId: "audio4"
        },
        {
            question: "Are you building business without building brand value?",
            subtitle: "In all You do, be sure to genuinely connect as a Brand, impress, engage and build Brand value",
            duration: 9000, // 9 seconds - increased for longer text
            audioId: "audio5"
        }
    ];

    // DOM Elements
    const questionText = document.getElementById('questionText');
    const voiceoverText = document.getElementById('voiceoverText');
    const progressBar = document.getElementById('progressBar');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const restartBtn = document.getElementById('restartBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    
    // Audio elements
    const audioElements = {
        audio1: document.getElementById('audio1'),
        audio2: document.getElementById('audio2'),
        audio3: document.getElementById('audio3'),
        audio4: document.getElementById('audio4'),
        audio5: document.getElementById('audio5')
    };

    // State Management
    let currentIndex = 0;
    let isPlaying = false;
    let isPaused = false;
    let presentationTimeout;
    let currentAudio = null;

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
        // Setup error handling for all audio elements
        Object.values(audioElements).forEach(audio => {
            audio.addEventListener('error', function(e) {
                console.error('Audio loading error:', e);
            });
            
            audio.addEventListener('ended', function() {
                // Audio finished playing naturally
                console.log('Audio finished playing');
            });
        });
    }

    function showWelcomeMessage() {
        questionText.textContent = "Brand Strategy Questions";
        questionText.classList.add('active', 'gold');
        voiceoverText.textContent = "Click play to begin your brand exploration journey";
        voiceoverText.classList.add('active');
        progressBar.style.width = '0%';
    }

    function startPresentation() {
        if (isPaused) {
            resumePresentation();
            return;
        }

        isPlaying = true;
        currentIndex = 0;
        updatePlayPauseButton();
        
        // Start with first question-subtitle pair
        showCurrentPair();
    }

    function showCurrentPair() {
        if (currentIndex >= questionSubtitlePairs.length) {
            endPresentation();
            return;
        }
        
        const currentPair = questionSubtitlePairs[currentIndex];
        
        // Clear previous content
        clearContent();
        
        // Show question and subtitle together
        setTimeout(() => {
            displayQuestion(currentPair.question);
            displaySubtitle(currentPair.subtitle);
            playAudioForCurrentPair(currentPair);
            animateProgressBar(currentPair.duration);
            
            // Schedule next pair after current duration
            presentationTimeout = setTimeout(() => {
                if (isPlaying) {
                    stopCurrentAudio();
                    currentIndex++;
                    showCurrentPair();
                }
            }, currentPair.duration);
        }, 200);
    }

    function displayQuestion(question) {
        questionText.textContent = question;
        questionText.classList.add('active');
        
        // Add gold accent to every other question
        if (currentIndex % 2 === 0) {
            questionText.classList.add('gold');
        }
    }

    function displaySubtitle(subtitle) {
        voiceoverText.textContent = subtitle;
        voiceoverText.classList.add('active');
        
        // Add gold accent to longer subtitles
        if (subtitle.length > 50) {
            voiceoverText.classList.add('gold');
        }
    }

    function animateProgressBar(duration) {
        progressBar.style.width = '0%';
        progressBar.style.transition = `width ${duration}ms linear`;
        
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
        pauseCurrentAudio();
        updatePlayPauseButton();
    }

    function resumePresentation() {
        isPlaying = true;
        isPaused = false;
        updatePlayPauseButton();
        
        // Resume audio if it was playing
        resumeCurrentAudio();
        
        // Resume from current position
        showCurrentPair();
    }

    function restartPresentation() {
        clearTimeout(presentationTimeout);
        stopCurrentAudio();
        isPlaying = false;
        isPaused = false;
        currentIndex = 0;
        clearContent();
        updatePlayPauseButton();
        showWelcomeMessage();
    }

    function endPresentation() {
        isPlaying = false;
        isPaused = false;
        clearTimeout(presentationTimeout);
        stopCurrentAudio();
        updatePlayPauseButton();
        
        // Show completion message
        setTimeout(() => {
            questionText.textContent = "Brand Strategy Complete";
            questionText.classList.add('active', 'gold');
            voiceoverText.textContent = "Thank you for exploring your brand identity. Click restart to begin again.";
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

    // Audio control functions
    function playAudioForCurrentPair(pair) {
        stopCurrentAudio(); // Stop any previous audio
        
        if (pair.audioId && audioElements[pair.audioId]) {
            currentAudio = audioElements[pair.audioId];
            currentAudio.currentTime = 0;
            
            currentAudio.play().catch(e => {
                console.error('Audio playback failed:', e);
            });
        }
    }
    
    function stopCurrentAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
    }
    
    function pauseCurrentAudio() {
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
        }
    }
    
    function resumeCurrentAudio() {
        if (currentAudio && currentAudio.paused) {
            currentAudio.play().catch(e => {
                console.error('Audio resume failed:', e);
            });
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
});