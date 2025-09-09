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
        title: "Take Care of Yourself",
        synopsis: "The final episode of the TV series explores the psychological state of the characters during the Human Instrumentality Project, leading to Shinji's final decision about his own existence."
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
    }
};

const evaUnits = {
    unit01: {
        name: "EVANGELION UNIT-01",
        pilot: "SHINJI IKARI",
        status: "ACTIVE",
        syncRatio: "400%+",
        description: "The Test Type Eva built from the remains of the Second Angel, Lilith. Possesses a unique bond with its pilot and can operate without external power."
    },
    unit00: {
        name: "EVANGELION UNIT-00",
        pilot: "REI AYANAMI",
        status: "DESTROYED",
        syncRatio: "100%",
        description: "The Prototype Eva, colored blue and white. Known for its instability and eventual self-destruction to defeat the Sixteenth Angel."
    },
    unit02: {
        name: "EVANGELION UNIT-02",
        pilot: "ASUKA LANGLEY",
        status: "HEAVILY DAMAGED",
        syncRatio: "0%",
        description: "The Production Model Eva, colored red. Built in Germany and equipped with advanced combat capabilities."
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
});

// ===== VIDEO PLAYER FUNCTIONALITY =====
function initVideoPlayer() {
    const heroSection = document.getElementById('hero');
    const heroVideo = document.getElementById('heroVideo');
    const miniVideoContainer = document.getElementById('miniVideoContainer');
    const miniVideo = document.getElementById('miniVideo');
    const miniPlayPause = document.getElementById('miniPlayPause');
    const miniClose = document.getElementById('miniClose');
    
    let isHeroVisible = true;
    let miniVideoVisible = false;
    
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
    });
    
    // Handle video errors gracefully
    heroVideo.addEventListener('error', function(e) {
        console.log('Hero video error:', e);
        // Show fallback background if video fails to load
        heroSection.querySelector('.hero-background').style.display = 'block';
    });
    
    miniVideo.addEventListener('error', function(e) {
        console.log('Mini video error:', e);
        hideMiniVideo();
    });
}

// ===== HERO SECTION ANIMATION =====
function initHeroAnimation() {
    const ctaButton = document.getElementById('ctaButton');
    const heroTitle = document.getElementById('heroTitle');
    
    // Add typing effect to title
    const titleText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    setTimeout(() => {
        typeText(heroTitle, titleText, 50);
    }, 500);
    
    // CTA button click handler
    ctaButton.addEventListener('click', function() {
        smoothScrollTo('#synopsis');
    });
}

function typeText(element, text, speed) {
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
    const evaTitle = document.getElementById('evaTitle');
    const evaDescription = document.getElementById('evaDescription');
    const evaPilot = document.getElementById('evaPilot');
    const evaStatus = document.getElementById('evaStatus');
    const evaSyncRatio = document.getElementById('evaSyncRatio');
    
    evaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const evaKey = this.dataset.eva;
            const eva = evaUnits[evaKey];
            
            if (eva) {
                evaTitle.textContent = eva.name;
                evaDescription.textContent = eva.description;
                evaPilot.textContent = eva.pilot;
                evaStatus.textContent = eva.status;
                evaSyncRatio.textContent = eva.syncRatio;
                
                // Add glitch effect
                this.style.animation = 'pulse 0.5s ease-in-out';
                
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset to default info
            evaTitle.textContent = 'EVANGELION SPECIFICATIONS';
            evaDescription.textContent = 'Hover over an Evangelion unit to view detailed specifications';
            evaPilot.textContent = '--';
            evaStatus.textContent = '--';
            evaSyncRatio.textContent = '--';
        });
    });
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
        
        // 3D carousel positioning
        const cardWidth = 220; // card width + gap
        const offset = -currentEpisode * cardWidth;
        
        episodeCards.forEach((card, index) => {
            const position = index - currentEpisode;
            let transform = `translateX(${position * cardWidth}px)`;
            
            if (position === 0) {
                transform += ' scale(1) rotateY(0deg)';
                card.style.zIndex = '3';
                card.style.opacity = '1';
            } else if (Math.abs(position) === 1) {
                transform += ` scale(0.9) rotateY(${position * -20}deg)`;
                card.style.zIndex = '2';
                card.style.opacity = '0.7';
            } else {
                transform += ` scale(0.8) rotateY(${position * 45}deg)`;
                card.style.zIndex = '1';
                card.style.opacity = '0.5';
            }
            
            card.style.transform = transform;
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
    
    // Initialize carousel
    updateCarousel();
    
    // Auto-rotate carousel
    setInterval(() => {
        currentEpisode = (currentEpisode + 1) % episodes.length;
        updateCarousel();
    }, 5000);
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
    
    // Parallax effects
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero parallax
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        // Fade in elements on scroll
        const elements = document.querySelectorAll('.section-title, .synopsis-text, .character-slot, .eva-card');
        elements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;
            const viewportTop = scrolled;
            const viewportBottom = viewportTop + window.innerHeight;
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Initial setup for scroll animations
    const animatedElements = document.querySelectorAll('.section-title, .synopsis-text, .character-slot, .eva-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
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

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Scroll-dependent animations go here
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// ===== INITIALIZE ADDITIONAL EFFECTS =====
setTimeout(() => {
    addTerminalGlitch();
    initMapInteraction();
}, 1000);
