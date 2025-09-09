// ===== GLOBAL VARIABLES =====
let currentEpisode = 0;
const episodes = [
    {
        title: "Angel Attack",
        synopsis: "Fifteen years after the Second Impact, Shinji Ikari is summoned to Tokyo-3 by his estranged father to pilot a giant bio-mechanical robot called Evangelion to combat beings known as Angels."
    },
    {
        title: "The Beast",
        synopsis: "Shinji wakes up in the hospital and is immediately ordered to pilot Eva Unit-01 again. He meets his fellow pilot Rei Ayanami and begins to understand the weight of his responsibilities."
    },
    {
        title: "A Transfer",
        synopsis: "A new student transfers to Shinji's school, and the mysterious Third Angel appears. Shinji must overcome his fears to protect those he cares about."
    },
    {
        title: "Hedgehog's Dilemma",
        synopsis: "Shinji moves in with Misato and starts attending school. He struggles with connecting to others while learning about the Hedgehog's Dilemma."
    },
    {
        title: "Rei I",
        synopsis: "Shinji tries to get to know Rei better, while a new Angel attacks. We learn more about Rei's mysterious connection to Gendo."
    },
    {
        title: "Rei II",
        synopsis: "The sixth Angel attacks Tokyo-3, forcing Shinji and Rei to work together in a synchronized operation to defeat it."
    },
    {
        title: "A Human Work",
        synopsis: "NERV faces a human threat as a prototype giant robot built by the Japanese government challenges the Evangelions."
    },
    {
        title: "Asuka Strikes!",
        synopsis: "The fiery Asuka Langley arrives from Germany with Eva Unit-02, immediately clashing with Shinji while fighting the eighth Angel."
    },
    {
        title: "Both of You, Dance Like You Want to Win!",
        synopsis: "Shinji and Asuka must learn to synchronize their movements to defeat an Angel that has split into two parts."
    },
    {
        title: "Magma Diver",
        synopsis: "Asuka pilots Eva Unit-02 in a dangerous mission to capture an Angel hiding in an active volcano."
    },
    {
        title: "The Day Tokyo-3 Stood Still",
        synopsis: "A massive blackout hits Tokyo-3 just as an Angel attacks, forcing the Eva pilots to fight without power support."
    },
    {
        title: "She said, 'Don't make others suffer for your personal hatred.'",
        synopsis: "As the twelfth Angel infiltrates NERV headquarters, Shinji must navigate through the facility to reach his Eva."
    },
    {
        title: "Lilliputian Hitcher",
        synopsis: "A microscopic Angel infects Eva Unit-00 and threatens to take control of it, forcing the pilots to enter a computer simulation."
    },
    {
        title: "Weaving a Story",
        synopsis: "Tokyo-3 faces a powerful Angel that can learn and adapt to any attack, pushing the Evas to their limits."
    },
    {
        title: "Those women longed for the touch of others' lips, and thus invited their kisses.",
        synopsis: "The fifteenth Angel attacks during a total solar eclipse, leading to revelations about the Angels' true nature."
    },
    {
        title: "Splitting of the Breast",
        synopsis: "Shinji's sync ratio reaches dangerous levels as he faces psychological breakdown and questions his own identity."
    },
    {
        title: "Fourth Child",
        synopsis: "The selection of the Fourth Child creates tension at NERV, while Unit-03 becomes possessed by an Angel."
    },
    {
        title: "Ambivalence",
        synopsis: "Shinji pilots Eva Unit-01 against the Angel-possessed Unit-03, not knowing who the pilot inside is."
    },
    {
        title: "Introjection",
        synopsis: "The most powerful Angel yet appears and begins a psychological attack on the Eva pilots' minds."
    },
    {
        title: "Weaving a Story 2: oral stage",
        synopsis: "Shinji's psychological state deteriorates further as the twentieth Angel continues its mental assault."
    },
    {
        title: "He was aware that he was still a child.",
        synopsis: "Kaji's investigation into NERV's true agenda reaches its climax, while relationships between characters become strained."
    },
    {
        title: "Don't Be.",
        synopsis: "The twenty-second Angel attacks and Asuka faces her traumatic past, leading to a devastating defeat."
    },
    {
        title: "Rei III",
        synopsis: "Rei faces her own existential crisis as Armisael, the twenty-third Angel, attacks by trying to merge with Eva Unit-00."
    },
    {
        title: "The Beginning and the End, or 'Knockin' on Heaven's Door'",
        synopsis: "Kaworu Nagisa arrives as the final Angel and pilot, forming a deep connection with Shinji before revealing his true nature."
    },
    {
        title: "Do you love me?",
        synopsis: "Shinji must make an impossible choice regarding Kaworu, leading to the series' psychological exploration."
    },
    {
        title: "Take care of yourself.",
        synopsis: "The final TV episode delves deep into the minds of the characters during the Human Instrumentality Project."
    },
    {
        title: "The End of Evangelion",
        synopsis: "The feature film conclusion to the series. As the Third Impact begins, Shinji must make the ultimate choice for humanity's future while confronting his deepest fears and desires."
    }
];

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
    initHeroAnimation();
    initVideoPlayer();
    initCharacterGallery();
    initEvaSection();
    initEpisodeCarousel();
    initContactForm();
    initScrollEffects();
    initImageErrorHandling();
    initPageNavigation();
});

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
                
                if (!isHeroVisible && !miniVideoVisible) {
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
    const heroTitle = document.getElementById('heroTitle');
    const pageNav = document.getElementById('pageNav');
    
    // Track video time to show title and CTA at specific times
    const heroVideo = document.getElementById('heroVideo');
    let titleShown = false;
    let ctaShown = false;
    let navShown = false;
    
    // Function to check video time and show elements
    function checkVideoTime() {
        if (heroVideo && !heroVideo.paused) {
            const currentTime = heroVideo.currentTime;
            
            // Show title at 23 seconds
            if (currentTime >= 23 && !titleShown) {
                heroTitle.classList.add('show-title');
                titleShown = true;
                console.log('Title shown at', currentTime, 'seconds');
            }
            
            // Show CTA button at 24 seconds
            if (currentTime >= 24 && !ctaShown) {
                ctaButton.classList.add('show-cta');
                ctaShown = true;
                console.log('CTA shown at', currentTime, 'seconds');
            }
            
            // Show navigation after 24 seconds
            if (currentTime >= 24 && !navShown) {
                showPageNavigation();
                navShown = true;
                console.log('Navigation shown at', currentTime, 'seconds');
            }
        }
    }
    
    // Listen to video timeupdate events
    if (heroVideo) {
        heroVideo.addEventListener('timeupdate', checkVideoTime);
    }
    
    // CTA button click handler
    ctaButton.addEventListener('click', function() {
        smoothScrollTo('#synopsis');
    });
}

// ===== PAGE NAVIGATION =====
function initPageNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href');
            smoothScrollTo(targetSection);
            
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

// ===== EPISODE CAROUSEL =====
function initEpisodeCarousel() {
    const carousel = document.getElementById('episodeCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const episodeTitle = document.getElementById('episodeTitle');
    const episodeSynopsis = document.getElementById('episodeSynopsis');
    const episodeCards = document.querySelectorAll('.episode-card');
    
    function updateCarousel() {
        episodeCards.forEach((card, index) => {
            card.classList.remove('active');
            
            if (index === currentEpisode) {
                card.classList.add('active');
            }
        });
        
        // Update episode info
        if (episodes[currentEpisode]) {
            episodeTitle.textContent = episodes[currentEpisode].title;
            typeEffect(episodeSynopsis, episodes[currentEpisode].synopsis);
        }
        
        // Regular horizontal carousel positioning - much larger spacing for bigger gaps
        let cardWidth = 650; // Card width + much larger gap
        if (window.innerWidth < 768) {
            cardWidth = 350; // Larger gap for mobile
        } else if (window.innerWidth < 1024) {
            cardWidth = 480; // Larger gap for tablets
        }
        
        episodeCards.forEach((card, index) => {
            let position = index - currentEpisode;
            const totalCards = episodeCards.length;
            
            // Handle infinite loop wrapping
            if (position > totalCards / 2) {
                position -= totalCards;
            } else if (position < -totalCards / 2) {
                position += totalCards;
            }
            
            const translateX = position * cardWidth;
            
            let scale, opacity, zIndex;
            
            if (index === currentEpisode) {
                // Active card
                scale = 1.1;
                opacity = 1;
                zIndex = 10;
            } else if (Math.abs(position) === 1) {
                // Adjacent cards
                scale = 0.9;
                opacity = 0.8;
                zIndex = 8;
            } else if (Math.abs(position) === 2) {
                // Second level cards
                scale = 0.75;
                opacity = 0.6;
                zIndex = 6;
            } else if (Math.abs(position) <= 3) {
                // Third level cards
                scale = 0.6;
                opacity = 0.4;
                zIndex = 4;
            } else {
                // Far cards (hidden by shadow overlay)
                scale = 0.5;
                opacity = 0.2;
                zIndex = 2;
            }
            
            // Apply transforms
            card.style.transform = `translateX(${translateX}px) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = zIndex;
        });
    }
    
    prevBtn.addEventListener('click', function() {
        currentEpisode = (currentEpisode - 1 + episodes.length) % episodes.length;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', function() {
        currentEpisode = (currentEpisode + 1) % episodes.length;
        updateCarousel();
    });
    
    // Add click functionality to episode cards
    episodeCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            currentEpisode = index;
            updateCarousel();
        });
    });
    
    // Initialize carousel
    updateCarousel();
    
    // Auto-rotate carousel
    let autoRotateInterval = setInterval(() => {
        currentEpisode = (currentEpisode + 1) % episodes.length;
        updateCarousel();
    }, 5000); // Change every 5 seconds
    
    // Pause auto-rotation when user interacts
    function pauseAutoRotation() {
        clearInterval(autoRotateInterval);
        // Restart auto-rotation after 8 seconds of inactivity
        setTimeout(() => {
            autoRotateInterval = setInterval(() => {
                currentEpisode = (currentEpisode + 1) % episodes.length;
                updateCarousel();
            }, 5000);
        }, 8000);
    }
    
    // Pause auto-rotation on button clicks
    prevBtn.addEventListener('click', pauseAutoRotation);
    nextBtn.addEventListener('click', pauseAutoRotation);
    
    // Pause auto-rotation on card clicks
    episodeCards.forEach(card => {
        card.addEventListener('click', pauseAutoRotation);
    });
    
    // Update carousel on window resize for responsive radius
    window.addEventListener('resize', function() {
        updateCarousel();
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const reviewForm = document.getElementById('reviewForm');
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const reviewData = {
            name: formData.get('reviewerName'),
            rating: formData.get('reviewRating'),
            review: formData.get('reviewText')
        };
        
        // Simulate form submission
        showSubmissionEffect();
        
        // Reset form after submission
        setTimeout(() => {
            this.reset();
            alert('Review transmitted successfully to NERV Headquarters!');
        }, 2000);
    });
    
    // Add terminal-style input effects
    const inputs = reviewForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
        });
    });
}

function showSubmissionEffect() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'TRANSMITTING...';
    submitBtn.style.background = 'var(--neon-orange)';
    submitBtn.style.animation = 'pulse 0.5s ease-in-out infinite';
    
    setTimeout(() => {
        submitBtn.textContent = 'TRANSMISSION COMPLETE';
        submitBtn.style.background = 'var(--terminal-green)';
        submitBtn.style.animation = '';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'transparent';
        }, 1000);
    }, 1500);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollTo(this.getAttribute('href'));
            }
        });
    });
    
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
    
    // Parallax effects and scroll animations
    function handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero parallax
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
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

// ===== TOKYO-3 MAP INTERACTION =====
function initMapInteraction() {
    const tokyo3Marker = document.querySelector('.tokyo3-marker');
    
    if (tokyo3Marker) {
        tokyo3Marker.addEventListener('click', function() {
            alert('TOKYO-3: Fortress City\nPopulation: Classified\nStatus: Under Angel Attack Protocol\nNERV Headquarters: Active');
        });
        
        tokyo3Marker.style.cursor = 'pointer';
    }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Arrow keys for carousel navigation
    if (e.key === 'ArrowLeft') {
        document.getElementById('prevBtn').click();
    } else if (e.key === 'ArrowRight') {
        document.getElementById('nextBtn').click();
    }
    
    // Escape key to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});


// ===== INITIALIZE ADDITIONAL EFFECTS =====
setTimeout(() => {
    addTerminalGlitch();
    initMapInteraction();
}, 1000);
