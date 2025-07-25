/**
 * India Acceleration Video JavaScript
 * Sequential flow with 2 questions and 2 subtitles
 */

document.addEventListener('DOMContentLoaded', function() {
    // Content Segments - 2 questions with subtitles
    const contentSegments = [
        {
            type: "question_subtitle",
            question: "Looking for clarity, guidance around your plans for India?",
            subtitle: "As promising as India is, as an expansive market, the diversity, bureaucracy and complexity are just as real.",
            duration: 11000, // 11 seconds
            audioId: "audio8"
        },
        {
            type: "question_subtitle",
            question: "Are you confident that your interests in India are best protected?",
            subtitle: "As a trusted advisor with international trade bodies, we not only bring to you the understanding of the market but also an approach that protects and prioritizes your interests. We make things happen for you - from advisory to execution.",
            duration: 23000, // 23 seconds
            audioId: "audio10"
        }
    ];

    // DOM Elements
    const contentText = document.getElementById('contentText');
    const subtitleText = document.getElementById('subtitleText');
    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const muteUnmuteBtn = document.getElementById('muteUnmuteBtn');
    const muteIcon = document.getElementById('muteIcon');
    const unmuteIcon = document.getElementById('unmuteIcon');
    
    // Audio elements
    const audioElements = {
        audio8: document.getElementById('audio8'),
        audio10: document.getElementById('audio10')
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
                showPreviousSegment();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                showNextSegment();
            });
        }
        
        if (muteUnmuteBtn) {
            muteUnmuteBtn.addEventListener('click', toggleMute);
        }
        
        // Keyboard controls
        document.addEventListener('keydown', function(e) {
            if (e.code === 'ArrowLeft') {
                e.preventDefault();
                showPreviousSegment();
            } else if (e.code === 'ArrowRight') {
                e.preventDefault();
                showNextSegment();
            } else if (e.code === 'Space') {
                e.preventDefault();
                toggleMute();
            }
        });
    }
    
    function setupAudioEvents() {
        // Setup error handling for all audio elements
        Object.values(audioElements).forEach(audio => {
            if (audio) {
                audio.addEventListener('error', function(e) {
                    console.error('Audio loading error:', e);
                });
                
                audio.addEventListener('ended', function() {
                    // Audio finished playing naturally
                    console.log('Audio finished playing');
                });
            }
        });
    }

    function startPresentation() {
        currentIndex = 0;
        showCurrentSegment();
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
    
    function showPreviousSegment() {
        clearTimeout(presentationTimeout);
        stopCurrentAudio();
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = contentSegments.length - 1; // Loop to end
        }
        showCurrentSegment();
    }
    
    function showNextSegment() {
        clearTimeout(presentationTimeout);
        stopCurrentAudio();
        if (currentIndex < contentSegments.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop to beginning
        }
        showCurrentSegment();
    }


    function showCurrentSegment() {
        if (currentIndex >= contentSegments.length) {
            // Loop back to beginning for continuous play
            currentIndex = 0;
        }
        
        const currentSegment = contentSegments[currentIndex];
        
        // Clear previous content
        clearContent();
        
        // Show current segment
        setTimeout(() => {
            displaySegment(currentSegment);
            playAudioForCurrentSegment(currentSegment);
            animateProgressBar(currentSegment.duration, currentIndex, contentSegments.length);
            scheduleNextSlide();
        }, 200);
    }
    
    
    function scheduleNextSlide() {
        const currentSegment = contentSegments[currentIndex];
        presentationTimeout = setTimeout(() => {
            stopCurrentAudio();
            currentIndex++;
            showCurrentSegment();
        }, currentSegment.duration);
    }

    function displaySegment(segment) {
        if (segment.type === "question_subtitle") {
            // Display both question and subtitle together
            contentText.textContent = segment.question;
            contentText.classList.add('active');
            if (currentIndex === 0) {
                contentText.classList.add('gold');
            }
            
            subtitleText.textContent = segment.subtitle;
            subtitleText.classList.add('active');
            if (segment.subtitle.length > 80) {
                subtitleText.classList.add('gold');
            }
        } else if (segment.type === "subtitle_only") {
            // Display only subtitle, keep previous question dimmed
            subtitleText.textContent = segment.content;
            subtitleText.classList.add('active');
            if (segment.content.length > 80) {
                subtitleText.classList.add('gold');
            }
            
            // Keep previous question visible but dimmed
            contentText.classList.add('active');
            contentText.style.opacity = '0.6';
        }
    }

    function updateProgressBar() {
        const progress = ((currentIndex + 1) / contentSegments.length) * 100;
        progressBar.style.width = progress + '%';
        progressBar.style.transition = 'width 0.3s ease';
    }
    
    function animateProgressBar(duration, currentIndex, totalSegments) {
        // Calculate progress based on segment completion
        const segmentProgress = (currentIndex / totalSegments) * 100;
        const nextSegmentProgress = ((currentIndex + 1) / totalSegments) * 100;
        
        progressBar.style.width = segmentProgress + '%';
        progressBar.style.transition = `width ${duration}ms linear`;
        
        setTimeout(() => {
            progressBar.style.width = nextSegmentProgress + '%';
        }, 50);
    }

    function clearContent() {
        contentText.classList.remove('active', 'gold');
        subtitleText.classList.remove('active', 'gold');
        contentText.style.opacity = '1';
    }


    // Audio control functions
    function playAudioForCurrentSegment(segment) {
        stopCurrentAudio(); // Stop any previous audio
        
        if (segment.audioId && audioElements[segment.audioId]) {
            currentAudio = audioElements[segment.audioId];
            currentAudio.currentTime = 0;
            
            // Set mute state and volume
            currentAudio.muted = isMuted;
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
                audio.muted = isMuted;
                audio.load();
            }
        });
        
        // Only restart current slide audio if it's not already playing
        if (currentAudio && currentAudio.paused) {
            currentAudio.currentTime = 0;
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
    
    

    // Mobile responsiveness
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        const contentEl = document.getElementById('contentText');
        const subtitleEl = document.getElementById('subtitleText');
        
        if (isMobile) {
            contentEl.style.fontSize = '24px';
            subtitleEl.style.fontSize = '18px';
        } else {
            contentEl.style.fontSize = '';
            subtitleEl.style.fontSize = '';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
});