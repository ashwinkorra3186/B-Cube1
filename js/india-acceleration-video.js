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
    const playPauseBtn = document.getElementById('playPauseBtn');
    const restartBtn = document.getElementById('restartBtn');
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

    function showWelcomeMessage() {
        contentText.textContent = "India Acceleration";
        contentText.classList.add('active', 'gold');
        subtitleText.textContent = "Click play to discover strategic guidance for the Indian market";
        subtitleText.classList.add('active');
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
        
        // Start with first segment
        showCurrentSegment();
    }

    function showCurrentSegment() {
        if (currentIndex >= contentSegments.length) {
            endPresentation();
            return;
        }
        
        const currentSegment = contentSegments[currentIndex];
        
        // Clear previous content
        clearContent();
        
        // Show current segment
        setTimeout(() => {
            displaySegment(currentSegment);
            playAudioForCurrentSegment(currentSegment);
            animateProgressBar(currentSegment.duration, currentIndex, contentSegments.length);
            
            // Schedule next segment after current duration
            presentationTimeout = setTimeout(() => {
                if (isPlaying) {
                    stopCurrentAudio();
                    currentIndex++;
                    showCurrentSegment();
                }
            }, currentSegment.duration);
        }, 200);
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
        showCurrentSegment();
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
            contentText.textContent = "India Market Strategy Complete";
            contentText.classList.add('active', 'gold');
            subtitleText.textContent = "Ready to accelerate your India market entry? Explore our success stories below.";
            subtitleText.classList.add('active');
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
    function playAudioForCurrentSegment(segment) {
        stopCurrentAudio(); // Stop any previous audio
        
        if (segment.audioId && audioElements[segment.audioId]) {
            currentAudio = audioElements[segment.audioId];
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