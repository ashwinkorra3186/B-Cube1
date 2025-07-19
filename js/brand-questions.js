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
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
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
        showCurrentPairSilent(); // Start with first question but no audio
    }

    function setupEventListeners() {
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                pausePresentation();
                showPreviousQuestion();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                pausePresentation();
                showNextQuestion();
            });
        }
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', togglePlayPause);
        }
        
        // Keyboard controls
        document.addEventListener('keydown', function(e) {
            if (e.code === 'ArrowLeft') {
                e.preventDefault();
                pausePresentation();
                showPreviousQuestion();
            } else if (e.code === 'ArrowRight') {
                e.preventDefault();
                pausePresentation();
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

    function startPresentation() {
        isPlaying = true;
        isPaused = false;
        currentIndex = 0;
        updatePlayPauseButton();
        showCurrentPair();
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
        resumeCurrentAudio();
        scheduleNextSlide();
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
    
    function updatePlayPauseButton() {
        if (isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }
    
    function showPreviousQuestion() {
        if (currentIndex > 0) {
            currentIndex--;
            showCurrentPair();
        }
    }
    
    function showNextQuestion() {
        if (currentIndex < questionSubtitlePairs.length - 1) {
            currentIndex++;
            showCurrentPair();
        }
    }


    function showCurrentPair() {
        if (currentIndex >= questionSubtitlePairs.length) {
            // Loop back to beginning if auto-playing
            if (isPlaying) {
                currentIndex = 0;
            } else {
                currentIndex = questionSubtitlePairs.length - 1;
                return;
            }
        }
        
        const currentPair = questionSubtitlePairs[currentIndex];
        
        // Clear previous content
        clearContent();
        
        // Show question and subtitle together
        setTimeout(() => {
            displayQuestion(currentPair.question);
            displaySubtitle(currentPair.subtitle);
            playAudioForCurrentPair(currentPair);
            
            if (isPlaying) {
                animateProgressBar(currentPair.duration);
                scheduleNextSlide();
            } else {
                updateProgressBar();
            }
        }, 200);
    }

    function showCurrentPairSilent() {
        const currentPair = questionSubtitlePairs[currentIndex];
        
        // Clear previous content
        clearContent();
        
        // Show question and subtitle together but NO AUDIO
        setTimeout(() => {
            displayQuestion(currentPair.question);
            displaySubtitle(currentPair.subtitle);
            updateProgressBar();
        }, 200);
    }
    
    function scheduleNextSlide() {
        const currentPair = questionSubtitlePairs[currentIndex];
        presentationTimeout = setTimeout(() => {
            if (isPlaying) {
                stopCurrentAudio();
                currentIndex++;
                showCurrentPair();
            }
        }, currentPair.duration);
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
        const progress = ((currentIndex + 1) / questionSubtitlePairs.length) * 100;
        progressBar.style.width = progress + '%';
        progressBar.style.transition = 'width 0.3s ease';
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
            
            // Ensure audio can play with explicit volume
            currentAudio.volume = 1.0;
            
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
        
        // Only restart current slide audio if it's not already playing
        if (currentAudio && currentAudio.paused) {
            currentAudio.currentTime = 0;
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
    

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
});