// ===== GLOBAL VARIABLES =====

// Intro system state
let introActive = true;
let pageUnlocked = false;

const characters = {
    shinji: {
        name: "SHINJI IKARI",
        age: "14",
        role: "THIRD CHILD / EVA-01 PILOT",
        description: "A reluctant teenager thrust into the role of humanity's savior. Struggles with depression, abandonment issues, and the weight of piloting Evangelion Unit-01."
    },
    rei: {
        name: "REI AYANAMI",
        age: "14",
        role: "FIRST CHILD / EVA-00 PILOT",
        description: "A mysterious and quiet girl who pilots Evangelion Unit-00. Her enigmatic nature hides deep connections to the Human Instrumentality Project."
    },
    asuka: {
        name: "ASUKA LANGLEY SORYU",
        age: "14",
        role: "SECOND CHILD / EVA-02 PILOT",
        description: "A proud and competitive pilot from Germany. Her outgoing personality masks deep insecurities and a traumatic past."
    },
    gendo: {
        name: "GENDO IKARI",
        age: "48",
        role: "NERV COMMANDER",
        description: "Shinji's estranged father and commander of NERV. A cold and calculating man whose ultimate goal is to reunite with his deceased wife through the Human Instrumentality Project."
    },
    misato: {
        name: "MISATO KATSURAGI",
        age: "29",
        role: "OPERATIONS DIRECTOR",
        description: "A young woman who serves as guardian to Shinji and Asuka. Despite her casual demeanor, she is a skilled tactician haunted by memories of the Second Impact."
    },
    kaworu: {
        name: "KAWORU NAGISA",
        age: "15",
        role: "FIFTH CHILD / SEVENTEENTH ANGEL",
        description: "The final Angel to appear, who takes human form. His relationship with Shinji becomes pivotal to the series' conclusion."
    },
    ryoji: {
        name: "RYOJI KAJI",
        age: "30",
        role: "NERV SPECIAL INSPECTOR / SPY",
        description: "A mysterious triple agent working for multiple organizations. Misato's former lover and a key figure investigating NERV's true agenda and the Human Instrumentality Project."
    },
    ritsuko: {
        name: "RITSUKO AKAGI",
        age: "30",
        role: "CHIEF SCIENTIST / EVA DEVELOPER",
        description: "NERV's head scientist and chief developer of the Evangelion units. Daughter of the late Dr. Naoko Akagi, she maintains the MAGI computer system and harbors complex feelings about her work."
    }
};


// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Force hide scrollbar on page load
    forceHideScrollbar();
    
    // Check if user is coming from another page
    const shouldSkipIntro = checkIfShouldSkipIntro();
    
    if (shouldSkipIntro) {
        skipIntroAndUnlockPage();
    } else {
        initIntroSystem();
    }
    
    initHeroAnimation();
    initVideoPlayer();
    initCharacterGallery();
    initEvaSection();
    initScrollEffects();
    initImageErrorHandling();
    initPageNavigation();
    initLogoNavigation();
    initCursorHideSystem();
});

function forceHideScrollbar() {
    // Force hide scrollbar styles permanently
    document.documentElement.style.scrollbarWidth = 'none';
    document.documentElement.style.msOverflowStyle = 'none';
}

function checkIfShouldSkipIntro() {
    // Check if user is coming from another page within the same site
    const referrer = document.referrer;
    const currentDomain = window.location.origin;
    
    // If there's a referrer and it's from the same domain, skip intro
    if (referrer && referrer.startsWith(currentDomain)) {
        const referrerPath = new URL(referrer).pathname;
        // Skip intro if coming from episodes.html, map.html, report.html, or any other page
        if (referrerPath.includes('episodes.html') || 
            referrerPath.includes('map.html') || 
            referrerPath.includes('report.html')) {
            return true;
        }
    }
    
    // Also check sessionStorage to see if user has already seen the intro
    const hasSeenIntro = sessionStorage.getItem('nge_intro_seen');
    if (hasSeenIntro === 'true') {
        return true;
    }
    
    return false;
}

function skipIntroAndUnlockPage() {
    const introOverlay = document.getElementById('introOverlay');
    const heroSection = document.getElementById('hero');
    const heroVideo = document.getElementById('heroVideo');
    const pageNav = document.getElementById('pageNav');
    const heroTitle = document.getElementById('heroTitle');
    const ctaButton = document.getElementById('ctaButton');
    const lockedContent = document.querySelectorAll('.locked-content');
    const introAudio = document.getElementById('introAudio');
    
    // Stop intro audio if it's playing
    if (introAudio) {
        introAudio.pause();
        introAudio.currentTime = 0;
    }
    
    // Set intro as inactive and page as unlocked immediately
    introActive = false;
    pageUnlocked = true;
    
    // Hide intro overlay completely
    if (introOverlay) {
        introOverlay.style.display = 'none';
        introOverlay.style.visibility = 'hidden';
        introOverlay.style.pointerEvents = 'none';
    }
    
    // Unlock hero section
    if (heroSection) {
        heroSection.classList.remove('locked');
    }
    
    // Show and unlock navigation
    if (pageNav) {
        pageNav.classList.remove('locked');
        pageNav.classList.add('show');
    }
    
    // Show hero title and CTA button
    if (heroTitle) {
        heroTitle.classList.add('show-title');
    }
    if (ctaButton) {
        ctaButton.classList.add('show-cta');
    }
    
    // Unlock all page content immediately
    lockedContent.forEach((element) => {
        element.classList.add('unlocked');
    });
    
    // Ensure scrolling is enabled
    document.body.style.overflow = '';
    
    // Start hero video if it exists
    if (heroVideo) {
        heroVideo.currentTime = 0;
        heroVideo.play().catch(e => {
            // Handle autoplay restrictions
            console.log('Video autoplay prevented:', e);
        });
    }
    
    console.log('Intro skipped - page fully unlocked');
}

// ===== INTRO SYSTEM =====
function initIntroSystem() {
    const introOverlay = document.getElementById('introOverlay');
    const introStartBtn = document.getElementById('introStartBtn');
    const heroSection = document.getElementById('hero');
    const heroVideo = document.getElementById('heroVideo');
    
    // Handle intro start button click
    introStartBtn.addEventListener('click', function() {
        // Enable audio context for intro sound (user interaction)
        const introAudio = document.getElementById('introAudio');
        if (introAudio) {
            // Ensure audio is ready to play
            introAudio.load();
        }
        startIntroSequence();
    });
    
    // Prevent scrolling while intro is active
    document.body.style.overflow = 'hidden';
    
    function startIntroSequence() {
        // Start sync animation sequence
        startSyncAnimation();
        
        // Sync animation will handle its own completion
        // No automatic timeout - controlled by sync completion
    }
    
    function startHeroSequence() {
        introActive = false;
        
        // Mark that user has seen the intro for this session
        sessionStorage.setItem('nge_intro_seen', 'true');
        
        // Hide intro overlay completely
        introOverlay.style.visibility = 'hidden';
        introOverlay.style.pointerEvents = 'none';
        
        // Ensure page is scrolled to top (hero section centered)
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        // Unlock hero section and start video
        heroSection.classList.remove('locked');
        heroVideo.currentTime = 0; // Reset video to beginning
        
        // Ensure mini video is stopped and hidden
        const miniVideoContainer = document.getElementById('miniVideoContainer');
        const miniVideo = document.getElementById('miniVideo');
        if (miniVideoContainer) {
            miniVideoContainer.classList.remove('show');
        }
        if (miniVideo) {
            miniVideo.pause();
            miniVideo.currentTime = 0;
        }
        
        // Start hero video
        heroVideo.play();
        
        // Re-enable scrolling
        document.body.style.overflow = '';
        
        // Start the progressive unlock sequence
        setTimeout(() => {
            initProgressiveUnlock();
        }, 1000);
        
        console.log('Hero sequence started');
    }
    
    function startSyncAnimation() {
        const glitchOverlay = document.getElementById('glitchOverlay');
        const syncRatio = document.getElementById('syncRatio');
        const neuralLink = document.querySelector('.status-standby');
        const atField = document.querySelector('.status-inactive');
        const statusText = document.querySelector('.status-text');
        const statusIndicator = document.querySelector('.status-indicator');
        const introStartBtn = document.getElementById('introStartBtn');
        const introAudio = document.getElementById('introAudio');
        
        // Play intro sound
        if (introAudio) {
            introAudio.volume = 0.7; // Set volume to 70%
            introAudio.currentTime = 0; // Reset to beginning
            introAudio.play().catch(e => {
                console.log('Intro audio autoplay prevented:', e);
                // Audio will be enabled after user interaction
            });
        }
        
        // Disable button during sync
        introStartBtn.style.pointerEvents = 'none';
        introStartBtn.style.opacity = '0.5';
        
        // Activate sync background
        introOverlay.classList.add('sync-active');
        
        // Start glitch effect
        glitchOverlay.classList.add('active');
        
        // Initialize wireframe spiral canvas
        initWireframeSpiral();
        
        // Ensure no rotation on spiral container
        const spiralContainer = document.querySelector('.spiral-container');
        if (spiralContainer) {
            spiralContainer.style.transform = 'none';
            spiralContainer.style.animation = 'none';
        }
        
        // Update status text
        statusText.textContent = 'SYNCHRONIZATION IN PROGRESS';
        statusIndicator.style.background = 'var(--primary-red)';
        statusIndicator.style.boxShadow = '0 0 10px var(--primary-red)';
        
        // Animate sync ratio
        let ratio = 0;
        const syncInterval = setInterval(() => {
            ratio += Math.random() * 15 + 5; // Random increment between 5-20
            if (ratio > 100) ratio = 100;
            
            syncRatio.textContent = ratio.toFixed(1) + '%';
            
            // Update wireframe spiral based on sync ratio
            updateWireframeSpiral(ratio);
            
            // Add glitch to sync ratio occasionally
            if (Math.random() < 0.3) {
                syncRatio.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
                syncRatio.style.color = 'var(--primary-red)';
                setTimeout(() => {
                    syncRatio.style.transform = 'translateX(0)';
                    syncRatio.style.color = 'var(--terminal-green)';
                }, 100);
            }
            
            // Add terminal flicker effect to readings
            if (Math.random() < 0.2) {
                const readings = document.querySelector('.sync-readings');
                readings.style.opacity = '0.7';
                setTimeout(() => {
                    readings.style.opacity = '1';
                }, 50);
            }
            
            // Update neural link status
            if (ratio > 30 && neuralLink.textContent === 'STANDBY') {
                neuralLink.textContent = 'CONNECTING';
                neuralLink.className = 'value';
                neuralLink.style.color = 'var(--warning-yellow)';
            }
            
            if (ratio > 60 && neuralLink.textContent === 'CONNECTING') {
                neuralLink.textContent = 'ACTIVE';
                neuralLink.style.color = 'var(--terminal-green)';
            }
            
            // Update A.T. Field status
            if (ratio > 80 && atField.textContent === 'INACTIVE') {
                atField.textContent = 'DEPLOYING';
                atField.style.color = 'var(--warning-yellow)';
            }
            
            if (ratio >= 100) {
                clearInterval(syncInterval);
                
                // Final status updates
                atField.textContent = 'ACTIVE';
                atField.style.color = 'var(--terminal-green)';
                statusText.textContent = 'SYNCHRONIZATION COMPLETE';
                statusIndicator.style.background = 'var(--terminal-green)';
                statusIndicator.style.boxShadow = '0 0 10px var(--terminal-green)';
                
                // Stop glitch effect immediately
                glitchOverlay.classList.remove('active');
                
                // Fade out intro audio
                if (introAudio) {
                    const fadeOutInterval = setInterval(() => {
                        if (introAudio.volume > 0.1) {
                            introAudio.volume = Math.max(0, introAudio.volume - 0.05);
                        } else {
                            introAudio.pause();
                            introAudio.volume = 0.7; // Reset volume for next time
                            clearInterval(fadeOutInterval);
                        }
                    }, 50);
                }
                
                // Direct smooth transition without zoom animation
                setTimeout(() => {
                    // Gradually fade out spiral intensity
                    let fadeProgress = 0;
                    const fadeInterval = setInterval(() => {
                        fadeProgress += 0.05;
                        syncProgress = Math.max(0, 1 - fadeProgress);
                        
                        if (fadeProgress >= 1) {
                            clearInterval(fadeInterval);
                            
                            // Stop canvas animation
                            if (animationId) {
                                cancelAnimationFrame(animationId);
                            }
                            
                            // Direct fade out without zoom
                            introOverlay.style.transition = 'opacity 0.1s ease-out';
                            introOverlay.style.opacity = '0';
                            
                            // Start hero sequence after fade completes
                            setTimeout(() => {
                                startHeroSequence();
                            }, 100);
                        }
                    }, 50);
                }, 600); // Brief pause to show completion status
                
                console.log('Sync animation completed');
            }
        }, 100);
    }
    
    let canvas, ctx, animationId;
    let time = 0;
    let syncProgress = 0;
    
    function initWireframeSpiral() {
        canvas = document.getElementById('spiralCanvas');
        if (!canvas) return;
        
        ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 400;
        
        // Start animation loop
        animateWireframeSpiral();
    }
    
    function animateWireframeSpiral() {
        if (!ctx) return;
        
        // Clear canvas with dark background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        time += 0.02;
        
        // Draw multiple spiral layers with better spacing
        drawSpiralLayer(0, '#ff6b6b', 0.9, 1.0); // Red layer
        drawSpiralLayer(Math.PI/2, '#4ecdc4', 0.8, 0.9); // Cyan layer  
        drawSpiralLayer(Math.PI, '#45b7d1', 0.7, 0.8); // Blue layer
        drawSpiralLayer(Math.PI*3/2, '#96ceb4', 0.6, 0.7); // Green layer
        
        // Add wireframe grid overlay
        drawWireframeGrid();
        
        animationId = requestAnimationFrame(animateWireframeSpiral);
    }
    
    function drawSpiralLayer(phaseOffset, color, opacity, amplitude) {
        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity * (0.3 + syncProgress * 0.7);
        ctx.lineWidth = 1 + syncProgress * 2;
        
        // Create complex spiral pattern with better spacing
        for (let layer = 0; layer < 6; layer++) { // Reduced from 8 to 6 layers
            ctx.beginPath();
            
            for (let x = 0; x < canvas.width; x += 2) {
                const progress = x / canvas.width;
                const frequency = 0.02 + layer * 0.008; // Increased spacing between frequencies
                const layerOffset = layer * Math.PI / 3; // Increased phase offset for better separation
                
                // Complex wave calculation with better vertical separation
                const wave1 = Math.sin((x * frequency + time + phaseOffset + layerOffset) * 2) * amplitude * 25;
                const wave2 = Math.sin((x * frequency * 1.5 + time * 0.7 + phaseOffset) * 3) * amplitude * 12;
                const wave3 = Math.sin((x * frequency * 0.5 + time * 1.3 + phaseOffset) * 1.5) * amplitude * 35;
                
                // Better vertical spacing to prevent overlap
                const verticalOffset = (layer - 3) * 15; // Increased from 8 to 15 for better separation
                const y = canvas.height / 2 + wave1 + wave2 + wave3 + verticalOffset;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
        }
        
        ctx.globalAlpha = 1;
    }
    
    function drawWireframeGrid() {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.3;
        
        // Vertical grid lines
        for (let x = 0; x < canvas.width; x += 80) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let y = 0; y < canvas.height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        ctx.globalAlpha = 1;
    }
    
    function updateWireframeSpiral(ratio) {
        syncProgress = ratio / 100;
        
        // Increase animation speed and complexity with sync progress
        time += syncProgress * 0.01;
        
        // Add color intensity based on sync ratio without rotation
        if (canvas) {
            const hueShift = ratio * 3.6;
            canvas.style.filter = `hue-rotate(${hueShift}deg) brightness(${1 + syncProgress}) saturate(${1 + syncProgress * 2})`;
            // Ensure no transform is applied
            canvas.style.transform = 'none';
        }
    }
}

function initProgressiveUnlock() {
    const heroVideo = document.getElementById('heroVideo');
    const heroTitle = document.getElementById('heroTitle');
    const ctaButton = document.getElementById('ctaButton');
    const pageNav = document.getElementById('pageNav');
    const lockedContent = document.querySelectorAll('.locked-content');
    
    let titleShown = false;
    let ctaShown = false;
    let navShown = false;
    let contentUnlocked = false;
    
    function checkUnlockProgress() {
        if (!heroVideo || introActive) return;
        
        const currentTime = heroVideo.currentTime;
        
        // Show title at 23 seconds
        if (currentTime >= 23 && !titleShown) {
            heroTitle.classList.add('show-title');
            titleShown = true;
            console.log('Title unlocked at', currentTime, 'seconds');
        }
        
        // Show CTA button at 24 seconds
        if (currentTime >= 24 && !ctaShown) {
            ctaButton.classList.add('show-cta');
            ctaShown = true;
            console.log('CTA unlocked at', currentTime, 'seconds');
        }
        
        // Show navigation at 24 seconds
        if (currentTime >= 24 && !navShown) {
            unlockNavigation();
            navShown = true;
            console.log('Navigation unlocked at', currentTime, 'seconds');
        }
        
        // Unlock page content at 26 seconds
        if (currentTime >= 26 && !contentUnlocked) {
            unlockPageContent();
            contentUnlocked = true;
            pageUnlocked = true;
            console.log('Page content unlocked at', currentTime, 'seconds');
        }
    }
    
    // Listen to video timeupdate events
    heroVideo.addEventListener('timeupdate', checkUnlockProgress);
    
    function unlockNavigation() {
        pageNav.classList.remove('locked');
        pageNav.classList.add('show');
    }
    
    function unlockPageContent() {
        lockedContent.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('unlocked');
            }, index * 200); // Stagger the unlock animation
        });
    }
}

// ===== IMAGE ERROR HANDLING =====
function initImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Add error class for styling
            this.classList.add('image-error');
            
            // For character images, show a fallback
            if (this.closest('.character-frame')) {
                this.style.background = 'linear-gradient(135deg, var(--grid-color), var(--dark-red))';
                this.style.border = '2px dashed var(--primary-red)';
                this.alt = 'Character image not found: ' + this.alt;
            }
        });
        
        img.addEventListener('load', function() {
            this.classList.remove('image-error');
        });
    });
}

// ===== VIDEO PLAYER FUNCTIONALITY =====
function initVideoPlayer() {
    const heroSection = document.getElementById('hero');
    const heroVideo = document.getElementById('heroVideo');
    const miniVideoContainer = document.getElementById('miniVideoContainer');
    const miniVideo = document.getElementById('miniVideo');
    const miniPlayPause = document.getElementById('miniPlayPause');
    const miniClose = document.getElementById('miniClose');
    const soundToggle = document.getElementById('soundToggle');
    const miniSoundToggle = document.getElementById('miniSoundToggle');
    
    let isHeroVisible = true;
    let miniVideoVisible = false;
    let videoLoadAttempts = 0;
    const maxVideoLoadAttempts = 3;
    let isMuted = true; // Start muted for autoplay to work
    let hasUserInteracted = false;
    
    // Initialize video player with proper autoplay handling
    function initVideoPlayback() {
        // Set initial volumes
        heroVideo.volume = 1.0;
        miniVideo.volume = 0.2;
        
        // Videos start muted for autoplay compliance
        heroVideo.muted = true;
        miniVideo.muted = true;
        isMuted = true;
        
        // During intro, ensure mini video is paused
        if (introActive) {
            miniVideo.pause();
        }
        
        console.log('Video initialized - will autoplay muted');
        
        // Enable sound after first user interaction
        function enableSoundOnInteraction() {
            if (!hasUserInteracted) {
                hasUserInteracted = true;
                heroVideo.muted = false;
                miniVideo.muted = false;
                isMuted = false;
                console.log('Sound enabled after user interaction');
                
                // Update sound toggle button state
                soundToggle.textContent = '🔊';
                miniSoundToggle.textContent = '🔊';
                
                // Remove this listener after first interaction
                document.removeEventListener('click', enableSoundOnInteraction);
                document.removeEventListener('keydown', enableSoundOnInteraction);
                document.removeEventListener('touchstart', enableSoundOnInteraction);
            }
        }
        
        // Listen for first user interaction to enable sound
        document.addEventListener('click', enableSoundOnInteraction);
        document.addEventListener('keydown', enableSoundOnInteraction);
        document.addEventListener('touchstart', enableSoundOnInteraction);
    }
    
    // Start the video initialization
    initVideoPlayback();
    
    // Sound toggle functionality
    soundToggle.addEventListener('click', function() {
        if (isMuted) {
            heroVideo.muted = false;
            miniVideo.muted = false;
            isMuted = false;
            this.textContent = '🔊';
            miniSoundToggle.textContent = '🔊';
            hasUserInteracted = true;
        } else {
            heroVideo.muted = true;
            miniVideo.muted = true;
            isMuted = true;
            this.textContent = '🔇';
            miniSoundToggle.textContent = '🔇';
        }
    });
    
    miniSoundToggle.addEventListener('click', function() {
        if (isMuted) {
            heroVideo.muted = false;
            miniVideo.muted = false;
            isMuted = false;
            this.textContent = '🔊';
            soundToggle.textContent = '🔊';
            hasUserInteracted = true;
        } else {
            heroVideo.muted = true;
            miniVideo.muted = true;
            isMuted = true;
            this.textContent = '🔇';
            soundToggle.textContent = '🔇';
        }
    });
    
    // Set initial sound toggle button states
    soundToggle.textContent = '🔇';
    miniSoundToggle.textContent = '🔇';
    
    // Function to handle video loading with retry mechanism
    function handleVideoLoadError(videoElement, isHeroVideo = false) {
        videoLoadAttempts++;
        
        if (videoLoadAttempts < maxVideoLoadAttempts) {
            // Try to reload the video
            setTimeout(() => {
                videoElement.load();
            }, 1000);
        } else {
            if (isHeroVideo) {
                // Show fallback background for hero video
                const fallbackBg = heroSection.querySelector('.hero-background');
                if (fallbackBg) {
                    fallbackBg.classList.add('show');
                }
                videoElement.style.display = 'none';
            }
        }
    }
    
    // Intersection Observer to detect when hero section is out of view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target === heroSection) {
                isHeroVisible = entry.isIntersecting;
                
                // Only show mini video if intro is not active
                if (!isHeroVisible && !miniVideoVisible && !introActive) {
                    // Hero is out of view, show mini video
                    showMiniVideo();
                } else if (isHeroVisible && miniVideoVisible) {
                    // Hero is back in view, hide mini video
                    hideMiniVideo();
                }
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of hero section is visible
    });
    
    observer.observe(heroSection);
    
    function showMiniVideo() {
        miniVideoVisible = true;
        miniVideoContainer.classList.add('show');
        
        // Sync video time and play state
        miniVideo.currentTime = heroVideo.currentTime;
        
        // Set proper mini video volume and muted state
        miniVideo.volume = 0.2; // Set mini video to 20% volume
        miniVideo.muted = isMuted; // Respect current muted state
        
        if (!heroVideo.paused) {
            miniVideo.play();
            miniPlayPause.textContent = '⏸️';
        } else {
            miniVideo.pause();
            miniPlayPause.textContent = '▶️';
        }
    }
    
    function hideMiniVideo() {
        miniVideoVisible = false;
        miniVideoContainer.classList.remove('show');
        miniVideo.pause();
        
        // Ensure hero video is at full volume when mini video is hidden
        heroVideo.volume = 1.0;
    }
    
    // Mini video controls
    miniPlayPause.addEventListener('click', function() {
        if (miniVideo.paused) {
            miniVideo.play();
            heroVideo.play();
            this.textContent = '⏸️';
        } else {
            miniVideo.pause();
            heroVideo.pause();
            this.textContent = '▶️';
        }
        
        // Maintain proper volume levels and muted state
        heroVideo.volume = 1.0; // Keep hero at full volume
        miniVideo.volume = 0.2; // Keep mini at reduced volume
        heroVideo.muted = isMuted; // Maintain current muted state
        miniVideo.muted = isMuted; // Maintain current muted state
        
        // Enable sound on user interaction if not already done
        if (!hasUserInteracted && !isMuted) {
            hasUserInteracted = true;
        }
    });
    
    miniClose.addEventListener('click', function() {
        hideMiniVideo();
        // Prevent mini video from showing again until page refresh
        observer.disconnect();
    });
    
    // Sync video times when mini video time updates
    miniVideo.addEventListener('timeupdate', function() {
        if (miniVideoVisible && Math.abs(heroVideo.currentTime - miniVideo.currentTime) > 1) {
            heroVideo.currentTime = miniVideo.currentTime;
        }
        
        // Maintain proper volume levels
        if (miniVideoVisible) {
            if (heroVideo.volume !== 1.0) heroVideo.volume = 1.0;
            if (miniVideo.volume !== 0.2) miniVideo.volume = 0.2;
        }
    });
    
    // Handle video errors gracefully
    heroVideo.addEventListener('error', function(e) {
        handleVideoLoadError(heroVideo, true);
    });
    
    miniVideo.addEventListener('error', function(e) {
        handleVideoLoadError(miniVideo, false);
        hideMiniVideo();
    });

    // Add load event handlers
    heroVideo.addEventListener('loadeddata', function() {
        videoLoadAttempts = 0; // Reset retry counter on successful load
    });
    
    miniVideo.addEventListener('loadeddata', function() {
        videoLoadAttempts = 0; // Reset retry counter on successful load
    });
}

// ===== HERO SECTION ANIMATION =====
function initHeroAnimation() {
    const ctaButton = document.getElementById('ctaButton');
    
    // CTA button click handler
    ctaButton.addEventListener('click', function() {
        if (pageUnlocked) {
            smoothScrollTo('#synopsis');
        } else {
            // If page isn't unlocked yet, show a message or wait
            console.log('Page content not yet unlocked');
        }
    });
}

// ===== PAGE NAVIGATION =====
function initPageNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for hash links (internal sections)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
            }
            // For external links (like episodes.html), let the default behavior happen
            
            // Add terminal click effect
            addTerminalClickEffect(this);
        });
    });
    
    // Track current section and update active nav link
    function updateActiveNavLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100; // Account for nav height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active class on nav links
        navLinks.forEach(link => {
            const linkSection = link.getAttribute('data-section');
            if (linkSection === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Throttled scroll event for nav updates
    let navTicking = false;
    window.addEventListener('scroll', function() {
        if (!navTicking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                navTicking = false;
            });
            navTicking = true;
        }
    });
    
    // Initial active link update
    setTimeout(updateActiveNavLink, 500);
}

function showPageNavigation() {
    const pageNav = document.getElementById('pageNav');
    if (pageNav) {
        // Add show class for simple slide down animation
        pageNav.classList.add('show');
        
        console.log('Page navigation is now visible');
    }
}

function addTerminalClickEffect(element) {
    // Add visual feedback for nav link clicks
    const originalTransform = element.style.transform;
    const originalTextShadow = element.style.textShadow;
    
    // Terminal-style click effect
    element.style.transform = 'translateY(-2px) scale(1.05)';
    element.style.textShadow = '0 0 20px var(--terminal-green), 0 0 30px var(--terminal-green)';
    element.style.filter = 'brightness(1.3)';
    
    setTimeout(() => {
        element.style.transform = originalTransform;
        element.style.textShadow = originalTextShadow;
        element.style.filter = '';
    }, 200);
}

// Add logo navigation functionality
function initLogoNavigation() {
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.style.cursor = 'pointer';
        navLogo.addEventListener('click', function() {
            // If we're not on index page, go to index
            if (window.location.pathname.includes('episodes.html')) {
                window.location.href = 'index.html';
            } else {
                // If we're on index page, scroll to top
                smoothScrollTo('#hero');
            }
        });
        
        navLogo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.filter = 'brightness(1.3)';
        });
        
        navLogo.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.filter = '';
        });
    }
}

function typeText(element, text, speed) {
    // For HTML content, we need to handle it differently
    if (text.includes('<')) {
        // If it contains HTML, just show it directly without typing effect
        element.innerHTML = text;
        return;
    }
    
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ===== CHARACTER GALLERY =====
function initCharacterGallery() {
    const characterSlots = document.querySelectorAll('.character-slot');
    const infoName = document.getElementById('infoName');
    const infoDescription = document.getElementById('infoDescription');
    const infoAge = document.getElementById('infoAge');
    const infoRole = document.getElementById('infoRole');
    const characterInfo = document.getElementById('characterInfo');
    const characterInfoClose = document.getElementById('characterInfoClose');
    
    characterSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove active class from all slots
            characterSlots.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked slot
            this.classList.add('active');
            
            // Get character data
            const characterKey = this.dataset.character;
            const character = characters[characterKey];
            
            // Update info panel
            if (character) {
                infoName.textContent = character.name;
                infoDescription.textContent = character.description;
                infoAge.textContent = character.age;
                infoRole.textContent = character.role;
                
                // Show the character info panel
                characterInfo.classList.add('show');
                
                // Add typing effect
                typeEffect(infoDescription, character.description);
            }
        });
        
        // Add hover sound effect (visual feedback)
        slot.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        slot.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Handle close button click
    if (characterInfoClose) {
        characterInfoClose.addEventListener('click', function() {
            characterInfo.classList.remove('show');
            characterSlots.forEach(s => s.classList.remove('active'));
        });
    }
}

function typeEffect(element, text) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 20);
        }
    }
    
    type();
}

// ===== EVA SECTION =====
function initEvaSection() {
    const evaCards = document.querySelectorAll('.eva-card');
    
    evaCards.forEach(card => {
        const specsElement = card.querySelector('.eva-specifications');
        
        card.addEventListener('mouseenter', function() {
            // Add glitch effect
            this.style.animation = 'pulse 0.5s ease-in-out';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            
            // Initialize mouse tracking for specifications parallax
            initMouseParallax(this, specsElement);
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset specifications position
            if (specsElement) {
                specsElement.style.transform = 'translate(-50%, -50%)';
            }
        });
    });
}

// ===== MOUSE PARALLAX FOR EVA SPECIFICATIONS =====
function initMouseParallax(card, specsElement) {
    if (!specsElement) return;
    
    let animationFrameId;
    
    function handleMouseMove(e) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        animationFrameId = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            // Calculate mouse position relative to card center
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate parallax offset (reduced intensity for subtlety)
            const parallaxIntensity = 0.3;
            const offsetX = mouseX * parallaxIntensity;
            const offsetY = mouseY * parallaxIntensity;
            
            // Apply the parallax transform
            specsElement.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
        });
    }
    
    function removeMouseMove() {
        document.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    }
    
    // Add mouse move listener when hovering over the card
    document.addEventListener('mousemove', handleMouseMove);
    
    // Clean up when mouse leaves the card
    card.addEventListener('mouseleave', removeMouseMove, { once: true });
}


// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Smooth scrolling for hash links only (this is now handled in initPageNavigation)
    // Remove duplicate event handler to prevent conflicts
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const threshold = windowHeight * 0.1; // 10% threshold
        
        return (
            rect.top < windowHeight - threshold &&
            rect.bottom > threshold
        );
    }
    
    // Function to animate visible elements
    function animateVisibleElements() {
        const elements = document.querySelectorAll('.section-title, .synopsis-text, .character-slot, .eva-card');
        elements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.classList.add('animated');
            }
        });
    }
    
    // Function to check if user scrolled to synopsis section and unlock content early
    function checkEarlyScrollToUnlock() {
        if (introActive || pageUnlocked) return;
        
        const synopsisSection = document.getElementById('synopsis');
        if (!synopsisSection) return;
        
        // Check if synopsis section is in viewport (user scrolled to it)
        const synopsisRect = synopsisSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const synopsisInView = synopsisRect.top < windowHeight && synopsisRect.bottom > 0;
        
        // If user scrolled to locked content, unlock it early
        if (synopsisInView && !pageUnlocked) {
            unlockAllContent();
            console.log('Content unlocked due to early scroll');
        }
    }
    
    function unlockAllContent() {
        const pageNav = document.getElementById('pageNav');
        const heroTitle = document.getElementById('heroTitle');
        const ctaButton = document.getElementById('ctaButton');
        const lockedContent = document.querySelectorAll('.locked-content');
        
        // Unlock navigation
        if (pageNav && pageNav.classList.contains('locked')) {
            pageNav.classList.remove('locked');
            pageNav.classList.add('show');
        }
        
        // Show title and CTA if not shown
        if (heroTitle && !heroTitle.classList.contains('show-title')) {
            heroTitle.classList.add('show-title');
        }
        if (ctaButton && !ctaButton.classList.contains('show-cta')) {
            ctaButton.classList.add('show-cta');
        }
        
        // Unlock all content
        lockedContent.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('unlocked');
            }, index * 100);
        });
        
        pageUnlocked = true;
    }
    
    // Parallax effects and scroll animations
    function handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero parallax
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        // Check for early scroll to unlock content
        checkEarlyScrollToUnlock();
        
        // Animate elements as they come into view
        animateVisibleElements();
    }
    
    // Throttled scroll event
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial setup for scroll animations
    const animatedElements = document.querySelectorAll('.section-title, .synopsis-text, .character-slot, .eva-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Check for elements that are already in viewport on page load
    setTimeout(() => {
        animateVisibleElements();
    }, 100);
}

function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for any fixed header
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== TERMINAL EFFECTS =====
function addTerminalGlitch() {
    const terminalElements = document.querySelectorAll('.section-title, .hero-title');
    
    terminalElements.forEach(element => {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
            element.style.textShadow = '2px 0 var(--neon-orange), -2px 0 var(--eva-purple)';
            element.style.transform = 'translateX(' + (Math.random() * 4 - 2) + 'px)';
            
            setTimeout(() => {
                element.style.textShadow = '0 0 10px var(--primary-red)';
                element.style.transform = 'translateX(0)';
            }, 50);
            }
        }, 2000);
    });
}


// ===== CURSOR HIDE SYSTEM =====
function initCursorHideSystem() {
    let cursorTimer;
    let isHidden = false;
    const hideDelay = 2000; // Hide cursor after 2 seconds of inactivity
    
    // Add cursor hide styles to document
    const style = document.createElement('style');
    style.textContent = `
        .cursor-hidden {
            cursor: none !important;
        }
        .cursor-hidden * {
            cursor: none !important;
        }
    `;
    document.head.appendChild(style);
    
    function hideCursor() {
        if (!isHidden) {
            document.body.classList.add('cursor-hidden');
            isHidden = true;
        }
    }
    
    function showCursor() {
        if (isHidden) {
            document.body.classList.remove('cursor-hidden');
            isHidden = false;
        }
        
        // Clear existing timer
        if (cursorTimer) {
            clearTimeout(cursorTimer);
        }
        
        // Set new timer to hide cursor
        cursorTimer = setTimeout(hideCursor, hideDelay);
    }
    
    // Mouse movement event listener
    document.addEventListener('mousemove', showCursor);
    
    // Also show cursor on mouse clicks and key presses
    document.addEventListener('mousedown', showCursor);
    document.addEventListener('mouseup', showCursor);
    document.addEventListener('keydown', showCursor);
    document.addEventListener('keyup', showCursor);
    
    // Initialize the timer
    cursorTimer = setTimeout(hideCursor, hideDelay);
    
    console.log('Cursor hide system initialized');
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Escape key to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});


// ===== INITIALIZE ADDITIONAL EFFECTS =====
setTimeout(() => {
    addTerminalGlitch();
}, 1000);
