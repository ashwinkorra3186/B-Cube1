/**
 * India Acceleration Video JavaScript
 * Sequential flow with 2 questions and 3 subtitles (5 segments total)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Content Segments - Grouped flow: (Q1+S1) → S2 → (Q2+S3)
    const contentSegments = [
        {
            type: "question_subtitle",
            question: "Looking for clarity, guidance around your plans for India?",
            subtitle: "As promising as India is, as an expansive market, the diversity, bureaucracy and complexity are just as real. Count on us to protect your interests and power your navigation.",
            duration: 12000, // 12 seconds
            audioId: "audio8"
        },
        {
            type: "subtitle_only",
            content: "Navigate through the promising yet complex Indian market with your interests prioritized and protected.",
            duration: 8000, // 8 seconds
            audioId: "audio9"
        },
        {
            type: "question_subtitle",
            question: "Are you confident that your interests in India are best protected?",
            subtitle: "As a trusted advisor with international trade bodies, we not only bring to you the understanding of the complex Indian market but also an approach that protects and prioritizes your interests. We make things happen for you - from advisory to execution.",
            duration: 25000, // 25 seconds
            audioId: "audio10"
        }
    ];

    // DOM Elements
    const contentText = document.getElementById('contentText');
    const subtitleText = document.getElementById('subtitleText');
    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    
    // Audio elements
    const audioElements = {
        audio8: document.getElementById('audio8'),
        audio9: document.getElementById('audio9'),
        audio10: document.getElementById('audio10')
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
        showCurrentSegmentSilent(); // Start with first segment but no audio
    }

    function setupEventListeners() {
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                pausePresentation();
                showPreviousSegment();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                pausePresentation();
                showNextSegment();
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
                showPreviousSegment();
            } else if (e.code === 'ArrowRight') {
                e.preventDefault();
                pausePresentation();
                showNextSegment();
            } else if (e.code === 'Space') {
                e.preventDefault();
                togglePlayPause();
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
        isPlaying = true;
        isPaused = false;
        currentIndex = 0;
        updatePlayPauseButton();
        showCurrentSegment();
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
    
    function showPreviousSegment() {
        if (currentIndex > 0) {
            currentIndex--;
            showCurrentSegment();
        }
    }
    
    function showNextSegment() {
        if (currentIndex < contentSegments.length - 1) {
            currentIndex++;
            showCurrentSegment();
        }
    }


    function showCurrentSegment() {
        if (currentIndex >= contentSegments.length) {
            // Loop back to beginning if auto-playing
            if (isPlaying) {
                currentIndex = 0;
            } else {
                currentIndex = contentSegments.length - 1;
                return;
            }
        }
        
        const currentSegment = contentSegments[currentIndex];
        
        // Clear previous content
        clearContent();
        
        // Show current segment
        setTimeout(() => {
            displaySegment(currentSegment);
            playAudioForCurrentSegment(currentSegment);
            
            if (isPlaying) {
                animateProgressBar(currentSegment.duration, currentIndex, contentSegments.length);
                scheduleNextSlide();
            } else {
                updateProgressBar();
            }
        }, 200);
    }
    
    function showCurrentSegmentSilent() {
        if (currentIndex >= contentSegments.length) {
            currentIndex = contentSegments.length - 1;
            return;
        }
        
        const currentSegment = contentSegments[currentIndex];
        
        // Clear previous content
        clearContent();
        
        // Show current segment without audio
        setTimeout(() => {
            displaySegment(currentSegment);
            updateProgressBar();
        }, 200);
    }
    
    function scheduleNextSlide() {
        const currentSegment = contentSegments[currentIndex];
        presentationTimeout = setTimeout(() => {
            if (isPlaying) {
                stopCurrentAudio();
                currentIndex++;
                showCurrentSegment();
            }
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