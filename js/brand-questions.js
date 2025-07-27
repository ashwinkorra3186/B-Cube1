/**
 * Brand Questions Video JavaScript - Simplified Version
 * Clean question-subtitle presentation with individual timing
 */

document.addEventListener('DOMContentLoaded', function() {
    // Question-Subtitle Pairs with individual timing and audio
    const questionSubtitlePairs = [
        {
            type: "multi-question",
            questions: [
                "What is your Brand promise?",
                "What values are synonymous with your Brand?",
                "What does your Brand translate to?",
                "Is your Brand more than a name?"
            ],
            subtitle: "Your Brand is synonymous with the Promise you impress as a Brand, with your values and the reason you establish to be remembered, related to, preferred, and loved.",
            duration: 12000, // 12 seconds total - adjusted to match audio
            questionDuration: 3000, // 3 seconds per question
            audioId: "audio1"
        },
        {
            type: "single-question",
            question: "What emotions are invoked by your Brand?",
            subtitle: "Unless you invoke emotions and connect at an emotional level, you're reduced to being just an option.",
            duration: 8000, // 8 seconds - increased for full audio
            audioId: "audio2"
        },
        {
            type: "single-question",
            question: "What is Branding to You?",
            subtitle: "Branding much more than advertising or building familiarity! It is an honest expression of who You are as a Brand at your very Soul - and engaging with market, in ways the stakeholders engage with You as a Brand.",
            duration: 16000, // 16 seconds - increased for full audio
            audioId: "audio3"
        },
        {
            type: "single-question",
            question: "Are you building business without building brand value?",
            subtitle: "In all You do, be sure to genuinely connect as a Brand, impress, engage and Build Brand value",
            duration: 10000, // 10 seconds - increased for full audio
            audioId: "audio4"
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
        audio1: document.getElementById('audio1'),
        audio2: document.getElementById('audio2'),
        audio3: document.getElementById('audio3'),
        audio4: document.getElementById('audio4')
    };

    // State Management
    let currentIndex = 0;
    let isMuted = true; // Start muted for autoplay compliance
    let presentationTimeout;
    let currentAudio = null;
    let questionCycleTimeout = null; // Track question cycling timeout

    // Initialize
    init();

    function init() {
        setupEventListeners();
        setupAudioEvents();
        updateMuteUnmuteButton();
        setTimeout(() => { 
            startPresentation(); // Auto-start after 2 seconds 
        }, 2000);
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
        clearTimeout(questionCycleTimeout);
        stopCurrentAudio();
        if (currentIndex > 0) {
            currentIndex--;
        }
        showCurrentPair();
    }
    
    function showNextQuestion() {
        clearTimeout(presentationTimeout);
        clearTimeout(questionCycleTimeout);
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
        
        // Handle different slide types
        setTimeout(() => {
            if (currentPair.type === "multi-question") {
                handleMultiQuestionSlide(currentPair);
            } else {
                handleSingleQuestionSlide(currentPair);
            }
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

    function handleMultiQuestionSlide(pair) {
        // Show subtitle immediately and cycle through questions
        displaySubtitle(pair.subtitle);
        
        let questionIndex = 0;
        const totalQuestions = pair.questions.length;
        
        function showNextQuestion() {
            if (questionIndex < totalQuestions) {
                displayQuestion(pair.questions[questionIndex]);
                questionIndex++;
                questionCycleTimeout = setTimeout(showNextQuestion, pair.questionDuration);
            }
        }
        
        // Start cycling through questions immediately
        showNextQuestion();
    }
    
    function handleSingleQuestionSlide(pair) {
        displayQuestion(pair.question);
        displaySubtitle(pair.subtitle);
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
        clearTimeout(questionCycleTimeout);
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
    
    

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
});