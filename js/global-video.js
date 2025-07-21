/**
 * Global Video JavaScript - Manual Navigation Version
 * Clean question-subtitle presentation with manual navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Question-Subtitle Pairs with individual timing and audio
    const questionSubtitlePairs = [
        {
            question: "What's stopping from entering / expanding into new export markets?",
            subtitle: "Are you limited by lack of international marketing resources? We help represent promising Brands in a professional capacity and help crack deals in international markets, with sound strategy based on on-ground intelligence and action.",
            duration: 15000, // 15 seconds
            audioId: "audio11"
        }
    ];

    // DOM Elements
    const questionText = document.getElementById('questionText');
    const voiceoverText = document.getElementById('voiceoverText');
    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const muteUnmuteBtn = document.getElementById('muteUnmuteBtn');
    const muteIcon = document.getElementById('muteIcon');
    const unmuteIcon = document.getElementById('unmuteIcon');
    
    // Audio elements
    const audioElements = {
        audio11: document.getElementById('audio11')
    };

    // State Management
    let currentIndex = 0;
    let currentAudio = null;
    let isMuted = true; // Start muted for autoplay compliance
    let presentationTimeout = null;

    // Initialize
    init();

    function init() {
        setupEventListeners();
        setupAudioEvents();
        updateMuteUnmuteButton();
        startPresentation(); // Auto-start the slideshow
    }

    function setupEventListeners() {
        if (prevBtn) {
            prevBtn.addEventListener('click', showPreviousQuestion);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', showNextQuestion);
        }
        
        if (muteUnmuteBtn) {
            muteUnmuteBtn.addEventListener('click', toggleMute);
        }
        
        // Keyboard controls
        document.addEventListener('keydown', function(e) {
            if (e.code === 'ArrowLeft') {
                e.preventDefault();
                showPreviousQuestion();
            } else if (e.code === 'ArrowRight') {
                e.preventDefault();
                showNextQuestion();
            } else if (e.code === 'Space') {
                e.preventDefault();
                toggleMute();
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

    function showPreviousQuestion() {
        clearTimeout(presentationTimeout);
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = questionSubtitlePairs.length - 1; // Loop to last
        }
        showCurrentPair();
    }
    
    function showNextQuestion() {
        clearTimeout(presentationTimeout);
        if (currentIndex < questionSubtitlePairs.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop to first
        }
        showCurrentPair();
    }
    
    function playAudioForCurrentSlide() {
        const currentPair = questionSubtitlePairs[currentIndex];
        if (currentPair.audioId && audioElements[currentPair.audioId]) {
            playAudioForCurrentPair(currentPair);
        }
    }

    function showCurrentPair() {
        const currentPair = questionSubtitlePairs[currentIndex];
        
        // Clear previous content
        clearContent();
        
        // Show question and subtitle together
        setTimeout(() => {
            displayQuestion(currentPair.question);
            displaySubtitle(currentPair.subtitle);
            updateProgressBar();
            playAudioForCurrentSlide();
            scheduleNextSlide();
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

    function updateProgressBar() {
        const totalSlides = questionSubtitlePairs.length;
        const progress = ((currentIndex + 1) / totalSlides) * 100;
        progressBar.style.width = progress + '%';
        progressBar.style.transition = 'width 0.3s ease';
    }
    
    function animateProgressBar(duration) {
        progressBar.style.transition = `width ${duration}ms linear`;
        progressBar.style.width = '100%';
    }

    function clearContent() {
        questionText.classList.remove('active', 'gold');
        voiceoverText.classList.remove('active', 'gold');
        progressBar.style.width = '0%';
    }

    // Audio control functions
    function playAudioForCurrentPair(pair) {
        stopCurrentAudio(); // Stop any previous audio
        
        if (pair.audioId && audioElements[pair.audioId]) {
            currentAudio = audioElements[pair.audioId];
            currentAudio.currentTime = 0;
            
            // Set mute state and volume
            currentAudio.muted = isMuted;
            currentAudio.volume = 1.0;
            currentAudio.load();
            
            const playPromise = currentAudio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Audio playing successfully');
                }).catch(e => {
                    console.error('Audio playback failed:', e);
                    // Try to enable audio on first user interaction
                    document.addEventListener('click', enableAudio, { once: true });
                });
            }
        }
    }
    
    function enableAudio() {
        // This will be called on first user interaction to enable audio
        Object.values(audioElements).forEach(audio => {
            if (audio) {
                audio.muted = isMuted;
                audio.load();
            }
        });
        
        // Restart current slide to play audio
        if (currentAudio) {
            currentAudio.muted = isMuted;
            currentAudio.play().catch(e => {
                console.error('Audio enable failed:', e);
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
    
    
    function startPresentation() {
        currentIndex = 0;
        showCurrentPair();
    }
    
    function toggleMute() {
        isMuted = !isMuted;
        updateMuteUnmuteButton();
        
        // Apply mute state to all audio elements
        Object.values(audioElements).forEach(audio => {
            if (audio) {
                audio.muted = isMuted;
            }
        });
        
        // If currently playing audio, update its mute state
        if (currentAudio) {
            currentAudio.muted = isMuted;
        }
    }
    
    function updateMuteUnmuteButton() {
        if (muteIcon && unmuteIcon) {
            if (isMuted) {
                muteIcon.style.display = 'inline';
                unmuteIcon.style.display = 'none';
            } else {
                muteIcon.style.display = 'none';
                unmuteIcon.style.display = 'inline';
            }
        }
    }
    
    function scheduleNextSlide(customDuration = null) {
        const currentPair = questionSubtitlePairs[currentIndex];
        const duration = customDuration || currentPair.duration || 5000;
        
        if (presentationTimeout) {
            clearTimeout(presentationTimeout);
        }
        
        presentationTimeout = setTimeout(() => {
            // Move to next slide or loop
            if (currentIndex < questionSubtitlePairs.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to first
            }
            showCurrentPair();
        }, duration);
        
        // Animate progress bar
        animateProgressBar(duration);
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