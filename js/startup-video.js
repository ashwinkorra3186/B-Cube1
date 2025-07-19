/**
 * Startup Video JavaScript - Manual Navigation Version
 * Clean question-subtitle presentation with manual navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Question-Subtitle Pairs with individual timing and audio
    const questionSubtitlePairs = [
        {
            question: "Are you a start-up looking for support but worried of costs?",
            subtitle: "No matter the stage of journey you are at as a start-up, we can help you at the point where your need meets our value-promise. With flexible engagement models, our support ranges across feasibility assessments, investor engagement and market access and penetration.",
            duration: 15000, // 15 seconds
            audioId: "audio12"
        }
    ];

    // DOM Elements
    const questionText = document.getElementById('questionText');
    const voiceoverText = document.getElementById('voiceoverText');
    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    
    // Audio elements
    const audioElements = {
        audio12: document.getElementById('audio12')
    };

    // State Management
    let currentIndex = 0;
    let currentAudio = null;
    let isPlaying = false;
    let isPaused = false;
    let presentationTimeout = null;

    // Initialize
    init();

    function init() {
        setupEventListeners();
        setupAudioEvents();
        showCurrentPair();
    }

    function setupEventListeners() {
        if (prevBtn) {
            prevBtn.addEventListener('click', showPreviousQuestion);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', showNextQuestion);
        }
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', togglePlayPause);
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
                togglePlayPause();
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
        if (currentIndex > 0) {
            currentIndex--;
            showCurrentPair();
            playAudioForCurrentSlide();
        }
    }
    
    function showNextQuestion() {
        if (currentIndex < questionSubtitlePairs.length - 1) {
            currentIndex++;
            showCurrentPair();
            playAudioForCurrentSlide();
        }
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
            
            // For single-slide pages with auto-play capability
            if (isPlaying && !isPaused) {
                playAudioForCurrentSlide();
                scheduleNextSlide();
            }
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
            
            // Ensure audio can play with explicit volume and load
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
                audio.load();
            }
        });
        
        // Restart current slide to play audio
        if (currentAudio) {
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
    
    // Auto-play functions for single-slide pages
    function startPresentation() {
        isPlaying = true;
        isPaused = false;
        updatePlayPauseButton();
        showCurrentPair();
    }
    
    function pausePresentation() {
        isPaused = true;
        isPlaying = false;
        updatePlayPauseButton();
        pauseCurrentAudio();
        
        if (presentationTimeout) {
            clearTimeout(presentationTimeout);
            presentationTimeout = null;
        }
    }
    
    function resumePresentation() {
        isPaused = false;
        isPlaying = true;
        updatePlayPauseButton();
        resumeCurrentAudio();
        
        // Continue with remaining time if audio is still playing
        const currentPair = questionSubtitlePairs[currentIndex];
        if (currentAudio && !currentAudio.ended) {
            const remainingTime = (currentPair.duration || 5000) - (currentAudio.currentTime * 1000);
            if (remainingTime > 0) {
                scheduleNextSlide(remainingTime);
            }
        }
    }
    
    function togglePlayPause() {
        if (!isPlaying && !isPaused) {
            startPresentation();
        } else if (isPlaying && !isPaused) {
            pausePresentation();
        } else if (isPaused) {
            resumePresentation();
        }
    }
    
    function updatePlayPauseButton() {
        if (playIcon && pauseIcon) {
            if (isPlaying && !isPaused) {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
            } else {
                playIcon.style.display = 'inline';
                pauseIcon.style.display = 'none';
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
            // For single-slide pages, restart the slide
            if (questionSubtitlePairs.length === 1) {
                // Reset to allow replay
                isPlaying = false;
                isPaused = false;
                updatePlayPauseButton();
                progressBar.style.width = '0%';
            }
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