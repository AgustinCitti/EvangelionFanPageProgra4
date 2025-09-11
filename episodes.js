// ===== EPISODES LIBRARY FUNCTIONALITY =====

// Episodes data
const episodes = [
    { title: "Angel Attack", synopsis: "Fifteen years after the Second Impact, Shinji Ikari is summoned to Tokyo-3 by his estranged father to pilot a giant bio-mechanical robot called Evangelion to combat beings known as Angels." },
    { title: "The Beast", synopsis: "Shinji wakes up in the hospital and is immediately ordered to pilot Eva Unit-01 again. He meets his fellow pilot Rei Ayanami and begins to understand the weight of his responsibilities." },
    { title: "A Transfer", synopsis: "A new student transfers to Shinji's school, and the mysterious Third Angel appears. Shinji must overcome his fears to protect those he cares about." },
    { title: "Hedgehog's Dilemma", synopsis: "Shinji moves in with Misato and starts attending school. He struggles with connecting to others while learning about the Hedgehog's Dilemma." },
    { title: "Rei I", synopsis: "Shinji tries to get to know Rei better, while a new Angel attacks. We learn more about Rei's mysterious connection to Gendo." },
    { title: "Rei II", synopsis: "The sixth Angel attacks Tokyo-3, forcing Shinji and Rei to work together in a synchronized operation to defeat it." },
    { title: "A Human Work", synopsis: "NERV faces a human threat as a prototype giant robot built by the Japanese government challenges the Evangelions." },
    { title: "Asuka Strikes!", synopsis: "The fiery Asuka Langley arrives from Germany with Eva Unit-02, immediately clashing with Shinji while fighting the eighth Angel." },
    { title: "Both of You, Dance Like You Want to Win!", synopsis: "Shinji and Asuka must learn to synchronize their movements to defeat an Angel that has split into two parts." },
    { title: "Magma Diver", synopsis: "Asuka pilots Eva Unit-02 in a dangerous mission to capture an Angel hiding in an active volcano." },
    { title: "The Day Tokyo-3 Stood Still", synopsis: "A massive blackout hits Tokyo-3 just as an Angel attacks, forcing the Eva pilots to fight without power support." },
    { title: "She said, 'Don't make others suffer for your personal hatred.'", synopsis: "As the twelfth Angel infiltrates NERV headquarters, Shinji must navigate through the facility to reach his Eva." },
    { title: "Lilliputian Hitcher", synopsis: "A microscopic Angel infects Eva Unit-00 and threatens to take control of it, forcing the pilots to enter a computer simulation." },
    { title: "Weaving a Story", synopsis: "Tokyo-3 faces a powerful Angel that can learn and adapt to any attack, pushing the Evas to their limits." },
    { title: "Those women longed for the touch of others' lips, and thus invited their kisses.", synopsis: "The fifteenth Angel attacks during a total solar eclipse, leading to revelations about the Angels' true nature." },
    { title: "Splitting of the Breast", synopsis: "Shinji's sync ratio reaches dangerous levels as he faces psychological breakdown and questions his own identity." },
    { title: "Fourth Child", synopsis: "The selection of the Fourth Child creates tension at NERV, while Unit-03 becomes possessed by an Angel." },
    { title: "Ambivalence", synopsis: "Shinji pilots Eva Unit-01 against the Angel-possessed Unit-03, not knowing who the pilot inside is." },
    { title: "Introjection", synopsis: "The most powerful Angel yet appears and begins a psychological attack on the Eva pilots' minds." },
    { title: "Weaving a Story 2: oral stage", synopsis: "Shinji's psychological state deteriorates further as the twentieth Angel continues its mental assault." },
    { title: "He was aware that he was still a child.", synopsis: "Kaji's investigation into NERV's true agenda reaches its climax, while relationships between characters become strained." },
    { title: "Don't Be.", synopsis: "The twenty-second Angel attacks and Asuka faces her traumatic past, leading to a devastating defeat." },
    { title: "Rei III", synopsis: "Rei faces her own existential crisis as Armisael, the twenty-third Angel, attacks by trying to merge with Eva Unit-00." },
    { title: "The Beginning and the End, or 'Knockin' on Heaven's Door'", synopsis: "Kaworu Nagisa arrives as the final Angel and pilot, forming a deep connection with Shinji before revealing his true nature." },
    { title: "Do you love me?", synopsis: "Shinji must make an impossible choice regarding Kaworu, leading to the series' psychological exploration." },
    { title: "Take care of yourself.", synopsis: "The final TV episode delves deep into the minds of the characters during the Human Instrumentality Project." },
    { title: "The End of Evangelion", synopsis: "The feature film conclusion to the series. As the Third Impact begins, Shinji must make the ultimate choice for humanity's future while confronting his deepest fears and desires." }
];

// Episode watch state management
class EpisodeLibrary {
    constructor() {
        this.watchedEpisodes = new Set();
        this.currentEpisode = null;
        this.dialog = null;
        this.gridContainer = null;
        this.loadWatchedEpisodes();
        this.init();
    }

    init() {
        this.dialog = document.getElementById('episodeDialog');
        this.gridContainer = document.querySelector('.episodes-grid-container');
        this.updateUI();
        this.bindEvents();
        this.addTerminalEffects();
        this.bindDialogEvents();
    }

    loadWatchedEpisodes() {
        const saved = localStorage.getItem('evangelion_watched_episodes');
        if (saved) {
            this.watchedEpisodes = new Set(JSON.parse(saved));
        }
    }

    saveWatchedEpisodes() {
        localStorage.setItem('evangelion_watched_episodes', JSON.stringify([...this.watchedEpisodes]));
    }

    isEpisodeUnlocked(episodeNum) {
        if (episodeNum === 1) return true; // Episode 1 is always unlocked
        
        // Check if episodes are unlocked sequentially up to this point
        for (let i = 1; i < episodeNum; i++) {
            if (!this.watchedEpisodes.has(i)) {
                return false; // Previous episode not watched, so this one is locked
            }
        }
        return true; // All previous episodes have been watched
    }

    toggleWatchStatus(episodeNum) {
        if (!this.isEpisodeUnlocked(episodeNum)) return false;

        if (this.watchedEpisodes.has(episodeNum)) {
            this.watchedEpisodes.delete(episodeNum);
            
            // If we unwatch an episode, we need to unwatch all subsequent episodes too
            for (let i = episodeNum + 1; i <= 27; i++) {
                this.watchedEpisodes.delete(i);
            }
        } else {
            this.watchedEpisodes.add(episodeNum);
        }

        this.saveWatchedEpisodes();
        this.updateUI();
        return true;
    }

    updateUI() {
        this.updateStats();
        this.updateEpisodeCards();
    }

    updateStats() {
        const unlockedCount = this.getUnlockedCount();
        const watchedCount = this.watchedEpisodes.size;
        
        document.getElementById('unlockedCount').textContent = unlockedCount;
        document.getElementById('watchedCount').textContent = watchedCount;
    }

    getUnlockedCount() {
        let count = 1; // Episode 1 is always unlocked
        for (let i = 2; i <= 27; i++) {
            if (this.isEpisodeUnlocked(i)) {
                count++;
            } else {
                break; // Episodes are unlocked sequentially
            }
        }
        return count;
    }

    updateEpisodeCards() {
        const episodeItems = document.querySelectorAll('.episode-item');
        
        episodeItems.forEach((item, index) => {
            const episodeNum = index + 1;
            const isUnlocked = this.isEpisodeUnlocked(episodeNum);
            const isWatched = this.watchedEpisodes.has(episodeNum);
            const watchToggle = item.querySelector('.watch-toggle');
            const watchIcon = watchToggle.querySelector('.watch-icon');
            
            // Update episode state classes
            item.classList.remove('locked', 'unlocked', 'watched');
            
            if (isWatched) {
                // Watched episodes appear like unlocked episodes (no overlay)
                item.classList.add('watched');
                watchIcon.textContent = '✅';
                watchToggle.setAttribute('title', 'Mark as unwatched');
                watchToggle.classList.remove('disabled');
            } else if (isUnlocked) {
                item.classList.add('unlocked');
                watchIcon.textContent = '👁️';
                watchToggle.setAttribute('title', 'Mark as watched');
                watchToggle.classList.remove('disabled');
            } else {
                item.classList.add('locked');
                watchIcon.textContent = '🔒';
                watchToggle.setAttribute('title', 'Episode locked');
                watchToggle.classList.add('disabled');
            }
        });
    }

    bindEvents() {
        // Watch toggle button events
        const watchToggles = document.querySelectorAll('.watch-toggle');
        watchToggles.forEach((toggle, index) => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const episodeNum = index + 1;
                const success = this.toggleWatchStatus(episodeNum);
                
                if (success) {
                    this.addWatchToggleEffect(toggle);
                    // Update dialog if it's open for this episode
                    if (this.currentEpisode === episodeNum) {
                        this.updateDialogWatchStatus();
                    }
                } else {
                    this.addLockedEffect(toggle);
                }
            });
        });

        // Episode card click events
        const episodeItems = document.querySelectorAll('.episode-item');
        episodeItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                // Don't trigger if clicking on watch toggle
                if (e.target.closest('.watch-toggle')) return;
                
                const episodeNum = index + 1;
                
                if (this.isEpisodeUnlocked(episodeNum)) {
                    this.openEpisodeDialog(episodeNum);
                } else {
                    this.addLockedEffect(item);
                }
            });
        });
    }

    bindDialogEvents() {
        // Close button
        const closeBtn = document.getElementById('dialogClose');
        closeBtn.addEventListener('click', () => {
            this.closeEpisodeDialog();
        });

        // Dialog watch button
        const watchBtn = document.getElementById('dialogWatchBtn');
        watchBtn.addEventListener('click', () => {
            if (this.currentEpisode && this.isEpisodeUnlocked(this.currentEpisode)) {
                this.toggleWatchStatus(this.currentEpisode);
                this.updateDialogWatchStatus();
            }
        });

        // Close dialog when clicking outside
        this.dialog.addEventListener('click', (e) => {
            if (e.target === this.dialog) {
                this.closeEpisodeDialog();
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.dialog.classList.contains('active')) {
                this.closeEpisodeDialog();
            }
        });
    }

    openEpisodeDialog(episodeNum) {
        this.currentEpisode = episodeNum;
        const episode = episodes[episodeNum - 1];
        
        // Update dialog content
        const dialogImage = document.getElementById('dialogImage');
        const dialogNumber = document.getElementById('dialogNumber');
        const dialogTitle = document.getElementById('dialogTitle');
        const dialogSynopsis = document.getElementById('dialogSynopsis');
        
        // Set episode image
        const imageSrc = episodeNum === 27 ? 'Media/episodes/endofevangelion.jpeg' : 
                        `Media/episodes/${this.getEpisodeImageName(episodeNum)}.webp`;
        dialogImage.src = imageSrc;
        
        // Set episode number
        dialogNumber.textContent = episodeNum === 27 ? 'EOE' : episodeNum.toString().padStart(2, '0');
        
        // Set title
        const title = episodeNum === 27 ? 'The End of Evangelion' : `Episode ${episodeNum}: ${episode.title}`;
        dialogTitle.textContent = title;
        
        // Set synopsis
        dialogSynopsis.textContent = episode.synopsis;
        
        // Update watch button
        this.updateDialogWatchStatus();
        
        // Show dialog and push grid
        this.dialog.classList.add('active');
        this.gridContainer.classList.add('shifted');
    }

    closeEpisodeDialog() {
        this.dialog.classList.remove('active');
        this.gridContainer.classList.remove('shifted');
        this.currentEpisode = null;
    }

    updateDialogWatchStatus() {
        if (!this.currentEpisode) return;
        
        const watchBtn = document.getElementById('dialogWatchBtn');
        const watchText = document.getElementById('dialogWatchText');
        const isWatched = this.watchedEpisodes.has(this.currentEpisode);
        const isUnlocked = this.isEpisodeUnlocked(this.currentEpisode);
        
        if (!isUnlocked) {
            watchBtn.classList.add('disabled');
            watchText.textContent = 'Episode Locked';
            watchBtn.disabled = true;
        } else {
            watchBtn.classList.remove('disabled');
            watchBtn.disabled = false;
            if (isWatched) {
                watchText.textContent = 'Mark as Unwatched';
                watchBtn.style.background = 'linear-gradient(135deg, var(--primary-red), rgba(255, 0, 0, 0.8))';
            } else {
                watchText.textContent = 'Mark as Watched';
                watchBtn.style.background = 'linear-gradient(135deg, var(--terminal-green), rgba(0, 255, 0, 0.8))';
            }
        }
    }

    getEpisodeImageName(episodeNum) {
        const imageNames = [
            'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
            'eleven', 'twelve', 'thirdteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
            'twentyone', 'twentytwo', 'twentythree', 'twentyfour', 'twentyfive', 'twentysix'
        ];
        return imageNames[episodeNum - 1];
    }

    addWatchToggleEffect(button) {
        button.style.transform = 'scale(1.2)';
        button.style.filter = 'brightness(1.5)';
        button.style.boxShadow = '0 0 20px var(--terminal-green)';
        
        setTimeout(() => {
            button.style.transform = '';
            button.style.filter = '';
            button.style.boxShadow = '';
        }, 300);
    }

    addLockedEffect(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        element.style.filter = 'brightness(0.5) saturate(0.5)';
        
        setTimeout(() => {
            element.style.animation = '';
            element.style.filter = '';
        }, 500);
    }

    addTerminalEffects() {
        // Add glitch effect to classified overlays
        const classifiedOverlays = document.querySelectorAll('.classified-overlay');
        
        classifiedOverlays.forEach(overlay => {
            setInterval(() => {
                if (Math.random() < 0.1) { // 10% chance
                    overlay.style.animation = 'glitch 0.1s ease-in-out';
                    setTimeout(() => {
                        overlay.style.animation = '';
                    }, 100);
                }
            }, 2000);
        });

        // Add typing effect to stats
        this.addTypingEffectToStats();
    }

    addTypingEffectToStats() {
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            const originalText = stat.textContent;
            stat.textContent = '';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < originalText.length) {
                    stat.textContent += originalText[i];
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new EpisodeLibrary();
    
    // Add some additional terminal effects
    addTerminalScanlines();
    addNavigationEffects();
});

// Terminal scanlines effect
function addTerminalScanlines() {
    const body = document.body;
    const scanlines = document.createElement('div');
    scanlines.className = 'terminal-scanlines';
    body.appendChild(scanlines);
}

// Navigation effects
function addNavigationEffects() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add terminal click effect
            this.style.textShadow = '0 0 20px var(--terminal-green)';
            this.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                this.style.textShadow = '';
                this.style.transform = '';
            }, 200);
            
            // Let all navigation happen naturally - don't prevent default
            // This allows both hash links and external page links to work properly
        });
        
        // Add hover effects
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 15px var(--terminal-green)';
            this.style.filter = 'brightness(1.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.textShadow = '';
                this.style.filter = '';
            }
        });
    });
    
    // Add logo click to return to main page
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.style.cursor = 'pointer';
        navLogo.addEventListener('click', function() {
            window.location.href = 'index.html';
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

// CSS animations via JavaScript
const additionalStyles = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    .terminal-scanlines {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
        );
        z-index: 9999;
        opacity: 0.3;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
