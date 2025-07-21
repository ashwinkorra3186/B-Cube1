/**
 * CEO & CMO Support Video JavaScript - Auto-Start with Mute/Unmute
 * Video functionality for CEO & CMO support page with 2 question-subtitle pairs
 */

document.addEventListener('DOMContentLoaded', function() {
    // Question-Subtitle Pairs with individual timing and audio
    const questionSubtitlePairs = [
        {
            question: "Is your critical decision-making powered by on-ground insights and reliable intelligence?",
            subtitle: "We understand you'd not need one to tell you what to do, but all that's needed is reliable insight, intelligence and informed perspective, to insulate & empower your decision making.",
            duration: 12000, // 12 seconds
            audioId: "audio6"
        },
        {
            question: "Is your strategy / business / investment plan tested and backed by robust intelligence?",
            subtitle: "We own the responsibility of your consequential decision-making - bank on us, with confidence.",
            duration: 6000, // 6 seconds
            audioId: "audio7"
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
        audio6: document.getElementById('audio6'),
        audio7: document.getElementById('audio7')
    };

    // State Management
    let currentIndex = 0;
    let isMuted = true; // Start muted for autoplay compliance
    let presentationTimeout;
    let currentAudio = null;

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
            prevBtn.addEventListener('click', function() {
                showPreviousQuestion();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                showNextQuestion();
            });
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

    function startPresentation() {
        currentIndex = 0;
        showCurrentPair();
    }
    
    function toggleMute() {
        isMuted = !isMuted;
        updateMuteUnmuteButton();
        updateAudioMuteState();
    }
    
    function updateMuteUnmuteButton() {
        if (isMuted) {
            muteIcon.style.display = 'block';
            unmuteIcon.style.display = 'none';
        } else {
            muteIcon.style.display = 'none';
            unmuteIcon.style.display = 'block';
        }
    }
    
    function updateAudioMuteState() {
        // Update all audio elements to match mute state
        Object.values(audioElements).forEach(audio => {
            if (audio) {
                audio.muted = isMuted;
            }
        });
    }
    
    function showPreviousQuestion() {
        clearTimeout(presentationTimeout);
        stopCurrentAudio();
        if (currentIndex > 0) {
            currentIndex--;
        }
        showCurrentPair();
    }
    
    function showNextQuestion() {
        clearTimeout(presentationTimeout);
        stopCurrentAudio();
        if (currentIndex < questionSubtitlePairs.length - 1) {
            currentIndex++;
        }
        showCurrentPair();
    }

    function showCurrentPair() {
        if (currentIndex >= questionSubtitlePairs.length) {
            // Loop back to beginning for continuous play
            currentIndex = 0;
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
            scheduleNextSlide();
        }, 200);
    }
    
    function scheduleNextSlide() {
        const currentPair = questionSubtitlePairs[currentIndex];
        presentationTimeout = setTimeout(() => {
            stopCurrentAudio();
            currentIndex++;
            showCurrentPair();
        }, currentPair.duration);
    }

    function displayQuestion(question) {
        questionText.textContent = question;
        questionText.classList.add('active');
        
        // Add gold accent to first question
        if (currentIndex === 0) {
            questionText.classList.add('gold');
        }
    }

    function displaySubtitle(subtitle) {
        voiceoverText.textContent = subtitle;
        voiceoverText.classList.add('active');
        
        // Add gold accent to longer subtitles
        if (subtitle.length > 80) {
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

    // Audio control functions
    function playAudioForCurrentPair(pair) {
        stopCurrentAudio(); // Stop any previous audio
        
        if (pair.audioId && audioElements[pair.audioId]) {
            currentAudio = audioElements[pair.audioId];
            currentAudio.currentTime = 0;
            
            // Set mute state and volume
            currentAudio.muted = isMuted;
            currentAudio.volume = 1.0;
            
            const playPromise = currentAudio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Audio playing successfully (muted:', isMuted, ')');
                }).catch(e => {
                    console.error('Audio playback failed:', e);
                    // Audio will still try to play muted for autoplay compliance
                });
            }
        }
    }
    
    function stopCurrentAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
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