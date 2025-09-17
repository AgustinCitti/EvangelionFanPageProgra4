// ===== EPISODES LIBRARY FUNCTIONALITY =====

// ===== MOBILE NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');
    
    // Initialize burger menu
    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Close menu when clicking outside
            if (navMenu.classList.contains('active')) {
                document.addEventListener('click', closeMobileMenu);
            } else {
                document.removeEventListener('click', closeMobileMenu);
            }
        });
    }
    
    function closeMobileMenu(event) {
        const isClickInsideNav = navMenu.contains(event.target) || burgerMenu.contains(event.target);
        
        if (!isClickInsideNav) {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.removeEventListener('click', closeMobileMenu);
        }
    }
    
    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu when link is clicked
            if (burgerMenu && navMenu) {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.removeEventListener('click', closeMobileMenu);
            }
        });
    });
});

// ===== MOBILE EPISODES COMPONENT =====
function createMobileEpisodesGrid() {
    const mobileGrid = document.getElementById('mobileEpisodesGrid');
    if (!mobileGrid) return;

    // Clear existing content
    mobileGrid.innerHTML = '';

    // Episode data
    const episodes = [
        { id: 1, image: 'Media/episodes/one.webp', status: 'unlocked' },
        { id: 2, image: 'Media/episodes/two.webp', status: 'locked' },
        { id: 3, image: 'Media/episodes/three.webp', status: 'locked' },
        { id: 4, image: 'Media/episodes/four.webp', status: 'locked' },
        { id: 5, image: 'Media/episodes/five.webp', status: 'locked' },
        { id: 6, image: 'Media/episodes/six.webp', status: 'locked' },
        { id: 7, image: 'Media/episodes/seven.webp', status: 'locked' },
        { id: 8, image: 'Media/episodes/eight.webp', status: 'locked' },
        { id: 9, image: 'Media/episodes/nine.webp', status: 'locked' },
        { id: 10, image: 'Media/episodes/ten.webp', status: 'locked' },
        { id: 11, image: 'Media/episodes/eleven.webp', status: 'locked' },
        { id: 12, image: 'Media/episodes/twelve.webp', status: 'locked' },
        { id: 13, image: 'Media/episodes/thirdteen.webp', status: 'locked' },
        { id: 14, image: 'Media/episodes/fourteen.webp', status: 'locked' },
        { id: 15, image: 'Media/episodes/fifteen.webp', status: 'locked' },
        { id: 16, image: 'Media/episodes/sixteen.webp', status: 'locked' },
        { id: 17, image: 'Media/episodes/seventeen.webp', status: 'locked' },
        { id: 18, image: 'Media/episodes/eighteen.webp', status: 'locked' },
        { id: 19, image: 'Media/episodes/nineteen.webp', status: 'locked' },
        { id: 20, image: 'Media/episodes/twenty.webp', status: 'locked' },
        { id: 21, image: 'Media/episodes/twentyone.webp', status: 'locked' },
        { id: 22, image: 'Media/episodes/twentytwo.webp', status: 'locked' },
        { id: 23, image: 'Media/episodes/twentythree.webp', status: 'locked' },
        { id: 24, image: 'Media/episodes/twentyfour.webp', status: 'locked' },
        { id: 25, image: 'Media/episodes/twentyfive.webp', status: 'locked' },
        { id: 26, image: 'Media/episodes/twentysix.webp', status: 'locked' },
        { id: 27, image: 'Media/episodes/endofevangelion.jpeg', status: 'locked', number: 'EOE' }
    ];

    // Generate mobile episode cards
    episodes.forEach(episode => {
        const episodeCard = document.createElement('div');
        
        // Determine actual episode status based on unlocking logic
        const isWatched = window.episodeLibrary && window.episodeLibrary.watchedEpisodes.has(episode.id);
        const isUnlocked = window.episodeLibrary ? window.episodeLibrary.isEpisodeUnlocked(episode.id) : episode.id === 1;
        
        let actualStatus;
        let cardClasses = 'mobile-episode-card';
        
        if (isWatched) {
            actualStatus = 'watched';
            cardClasses += ' watched';
        } else if (isUnlocked) {
            actualStatus = 'unlocked';
            cardClasses += ' unlocked';
        } else {
            actualStatus = 'locked';
            cardClasses += ' locked';
        }
        
        episodeCard.className = cardClasses;
        episodeCard.dataset.episode = episode.id;

        const episodeNumber = episode.number || (episode.id < 10 ? `0${episode.id}` : episode.id);
        let watchIcon = actualStatus === 'locked' ? '🔒' : (isWatched ? '✅' : '👁️');
        const isDisabled = actualStatus === 'locked' ? 'disabled' : '';
        const watchTitle = actualStatus === 'locked' ? 'Episode locked' : (isWatched ? 'Marked as watched' : 'Mark as watched');

        episodeCard.innerHTML = `
            <div class="mobile-episode-image">
                <img src="${episode.image}" alt="Episode ${episode.id}">
            </div>
            ${actualStatus === 'locked' ? `
                <div class="mobile-classified-overlay">
                    <div class="mobile-classified-text"></div>
                </div>
            ` : ''}
            <div class="mobile-episode-number">${episodeNumber}</div>
            <button class="mobile-watch-toggle ${isDisabled}" data-episode="${episode.id}" title="${watchTitle}">
                <span class="mobile-watch-icon">${watchIcon}</span>
            </button>
        `;

        mobileGrid.appendChild(episodeCard);
    });

    // Add mobile event listeners
    setupMobileEventListeners();
}

function setupMobileEventListeners() {
    const mobileGrid = document.getElementById('mobileEpisodesGrid');
    if (!mobileGrid) return;

    // Handle mobile episode card clicks
    mobileGrid.addEventListener('click', function(e) {
        // Don't trigger card click if watch toggle was clicked
        if (e.target.closest('.mobile-watch-toggle')) return;
        
        const episodeCard = e.target.closest('.mobile-episode-card');
        if (!episodeCard) return;

        const episodeId = parseInt(episodeCard.dataset.episode);
        const isLocked = episodeCard.classList.contains('locked');

        if (!isLocked) {
            // Open episode dialog using existing EpisodeLibrary functionality
            if (window.episodeLibrary) {
                window.episodeLibrary.openEpisodeDialog(episodeId);
            } else {
                // Fallback if EpisodeLibrary not initialized
                openMobileEpisodeDialog(episodeId);
            }
        } else {
            // Handle locked episode feedback
            episodeCard.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                episodeCard.style.animation = '';
            }, 500);
        }
    });

    // Handle mobile watch toggle
    mobileGrid.addEventListener('click', function(e) {
        if (e.target.closest('.mobile-watch-toggle') && !e.target.closest('.disabled')) {
            e.stopPropagation();
            const button = e.target.closest('.mobile-watch-toggle');
            const episodeCard = button.closest('.mobile-episode-card');
            const episodeId = parseInt(button.dataset.episode);

            // Use EpisodeLibrary watch functionality if available
            if (window.episodeLibrary) {
                window.episodeLibrary.toggleWatchStatus(episodeId);
                // updateMobileEpisodeCards is now called automatically by updateUI in EpisodeLibrary
            } else {
                // Mobile episode watch status toggled (fallback)
            }
        }
    });
}

// Mobile watch status functions removed - now handled by EpisodeLibrary.updateMobileEpisodeCards()

function openMobileEpisodeDialog(episodeId) {
    // Fallback dialog opening functionality
    const dialog = document.getElementById('episodeDialog');
    if (!dialog) {
        return;
    }
    
    // Use existing episode data
    const episode = episodes[episodeId - 1];
    if (!episode) {
        return;
    }
    
    // Update dialog content
    const dialogImage = document.getElementById('dialogImage');
    const dialogNumber = document.getElementById('dialogNumber');
    const dialogTitle = document.getElementById('dialogTitle');
    const dialogSynopsis = document.getElementById('dialogSynopsis');
    
    if (dialogImage && dialogNumber && dialogTitle && dialogSynopsis) {
        // Set episode image
        const imageSrc = episodeId === 27 ? 'Media/episodes/endofevangelion.jpeg' : 
                        `Media/episodes/${getEpisodeImageName(episodeId)}.webp`;
        dialogImage.src = imageSrc;
        
        // Set episode number
        dialogNumber.textContent = episodeId === 27 ? 'EOE' : episodeId.toString().padStart(2, '0');
        
        // Set title and synopsis
        dialogTitle.textContent = episode.title;
        dialogSynopsis.textContent = episode.synopsis;
        
        // Show dialog
        dialog.classList.add('active');
        
        // On mobile, make dialog full screen
        if (window.innerWidth <= 768) {
            dialog.style.width = '100vw';
            dialog.style.right = '0';
            dialog.style.left = '0';
        }
        
        // Ensure close button works
        setupDialogCloseHandler();
    } else {
        // Dialog elements not found
    }
}

function setupDialogCloseHandler() {
    const dialog = document.getElementById('episodeDialog');
    const closeBtn = document.getElementById('dialogClose');
    
    if (dialog && closeBtn) {
        // Remove any existing listeners to prevent duplicates
        closeBtn.removeEventListener('click', closeMobileDialog);
        
        // Add close functionality
        closeBtn.addEventListener('click', closeMobileDialog);
        
        // Also close on escape key
        document.removeEventListener('keydown', handleDialogEscape);
        document.addEventListener('keydown', handleDialogEscape);
    }
}

function closeMobileDialog() {
    const dialog = document.getElementById('episodeDialog');
    if (dialog) {
        dialog.classList.remove('active');
        
        // Reset mobile styles
        if (window.innerWidth <= 768) {
            dialog.style.width = '';
            dialog.style.right = '';
            dialog.style.left = '';
        }
        
        // Remove escape key listener
        document.removeEventListener('keydown', handleDialogEscape);
    }
}

function handleDialogEscape(e) {
    if (e.key === 'Escape') {
        closeMobileDialog();
    }
}

function getEpisodeImageName(episodeNum) {
    const imageNames = [
        'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirdteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
        'eighteen', 'nineteen', 'twenty', 'twentyone', 'twentytwo', 'twentythree',
        'twentyfour', 'twentyfive', 'twentysix'
    ];
    return imageNames[episodeNum - 1] || 'one';
}

// Initialize mobile component when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Force close any open dialogs on page load
    forceCloseAllDialogs();
    
    // Check if we're on mobile
    if (window.innerWidth <= 768) {
        // Wait for EpisodeLibrary to be initialized by the existing code
        setTimeout(() => {
            createMobileEpisodesGrid();
        }, 100);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            createMobileEpisodesGrid();
        }
    });
});

function forceCloseAllDialogs() {
    // Force close episode dialog
    const episodeDialog = document.getElementById('episodeDialog');
    if (episodeDialog) {
        episodeDialog.classList.remove('active');
        episodeDialog.style.width = '';
        episodeDialog.style.right = '';
        episodeDialog.style.left = '';
    }
    
    // Force close any other modals
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.classList.remove('active');
    }
    
}

// Gallery images data
const galleryImages = [
    // Characters
    { src: 'Media/characters/shinji.jpeg', title: 'Shinji Ikari', category: 'characters', alt: 'Shinji Ikari - Third Child' },
    { src: 'Media/characters/rei.jpg', title: 'Rei Ayanami', category: 'characters', alt: 'Rei Ayanami - First Child' },
    { src: 'Media/characters/asuka.jpg', title: 'Asuka Langley', category: 'characters', alt: 'Asuka Langley - Second Child' },
    { src: 'Media/characters/gendo.jpg', title: 'Gendo Ikari', category: 'characters', alt: 'Gendo Ikari - NERV Commander' },
    { src: 'Media/characters/misato.png', title: 'Misato Katsuragi', category: 'characters', alt: 'Misato Katsuragi - Operations Director' },
    { src: 'Media/characters/kaworu.jpg', title: 'Kaworu Nagisa', category: 'characters', alt: 'Kaworu Nagisa - Fifth Child' },
    { src: 'Media/characters/ryoji.jpeg', title: 'Ryoji Kaji', category: 'characters', alt: 'Ryoji Kaji - Special Inspector' },
    { src: 'Media/characters/ritsuko.jpg', title: 'Ritsuko Akagi', category: 'characters', alt: 'Ritsuko Akagi - Chief Scientist' },
    
    // EVAs
    { src: 'Media/evas/01.jpg', title: 'Evangelion Unit-01', category: 'evas', alt: 'EVA Unit-01 - Test Type' },
    { src: 'Media/evas/00.jpg', title: 'Evangelion Unit-00', category: 'evas', alt: 'EVA Unit-00 - Prototype' },
    { src: 'Media/evas/02.jpg', title: 'Evangelion Unit-02', category: 'evas', alt: 'EVA Unit-02 - Production Model' },
    
    // Episodes
    { src: 'Media/episodes/one.webp', title: 'Episode 1: Angel Attack', category: 'episodes', alt: 'Episode 1' },
    { src: 'Media/episodes/two.webp', title: 'Episode 2: The Beast', category: 'episodes', alt: 'Episode 2' },
    { src: 'Media/episodes/three.webp', title: 'Episode 3: A Transfer', category: 'episodes', alt: 'Episode 3' },
    { src: 'Media/episodes/four.webp', title: 'Episode 4: Hedgehog\'s Dilemma', category: 'episodes', alt: 'Episode 4' },
    { src: 'Media/episodes/five.webp', title: 'Episode 5: Rei I', category: 'episodes', alt: 'Episode 5' },
    { src: 'Media/episodes/six.webp', title: 'Episode 6: Rei II', category: 'episodes', alt: 'Episode 6' },
    { src: 'Media/episodes/seven.webp', title: 'Episode 7: A Human Work', category: 'episodes', alt: 'Episode 7' },
    { src: 'Media/episodes/eight.webp', title: 'Episode 8: Asuka Strikes!', category: 'episodes', alt: 'Episode 8' },
    { src: 'Media/episodes/nine.webp', title: 'Episode 9: Both of You, Dance Like You Want to Win!', category: 'episodes', alt: 'Episode 9' },
    { src: 'Media/episodes/ten.webp', title: 'Episode 10: Magma Diver', category: 'episodes', alt: 'Episode 10' },
    { src: 'Media/episodes/eleven.webp', title: 'Episode 11: The Day Tokyo-3 Stood Still', category: 'episodes', alt: 'Episode 11' },
    { src: 'Media/episodes/twelve.webp', title: 'Episode 12: She said, Don\'t make others suffer', category: 'episodes', alt: 'Episode 12' },
    { src: 'Media/episodes/thirdteen.webp', title: 'Episode 13: Lilliputian Hitcher', category: 'episodes', alt: 'Episode 13' },
    { src: 'Media/episodes/fourteen.webp', title: 'Episode 14: Weaving a Story', category: 'episodes', alt: 'Episode 14' },
    { src: 'Media/episodes/fifteen.webp', title: 'Episode 15: Those women longed for the touch', category: 'episodes', alt: 'Episode 15' },
    { src: 'Media/episodes/sixteen.webp', title: 'Episode 16: Splitting of the Breast', category: 'episodes', alt: 'Episode 16' },
    { src: 'Media/episodes/seventeen.webp', title: 'Episode 17: Fourth Child', category: 'episodes', alt: 'Episode 17' },
    { src: 'Media/episodes/eighteen.webp', title: 'Episode 18: Ambivalence', category: 'episodes', alt: 'Episode 18' },
    { src: 'Media/episodes/nineteen.webp', title: 'Episode 19: Introjection', category: 'episodes', alt: 'Episode 19' },
    { src: 'Media/episodes/twenty.webp', title: 'Episode 20: Weaving a Story 2: oral stage', category: 'episodes', alt: 'Episode 20' },
    { src: 'Media/episodes/twentyone.webp', title: 'Episode 21: He was aware that he was still a child', category: 'episodes', alt: 'Episode 21' },
    { src: 'Media/episodes/twentytwo.webp', title: 'Episode 22: Don\'t Be', category: 'episodes', alt: 'Episode 22' },
    { src: 'Media/episodes/twentythree.webp', title: 'Episode 23: Rei III', category: 'episodes', alt: 'Episode 23' },
    { src: 'Media/episodes/twentyfour.webp', title: 'Episode 24: The Beginning and the End', category: 'episodes', alt: 'Episode 24' },
    { src: 'Media/episodes/twentyfive.webp', title: 'Episode 25: Do you love me?', category: 'episodes', alt: 'Episode 25' },
    { src: 'Media/episodes/twentysix.webp', title: 'Episode 26: Take care of yourself', category: 'episodes', alt: 'Episode 26' },
    { src: 'Media/episodes/endofevangelion.jpeg', title: 'The End of Evangelion', category: 'episodes', alt: 'End of Evangelion' },
    
    // Other images
    { src: 'Media/sinpsis.jpg', title: 'Synopsis Image', category: 'other', alt: 'Evangelion Synopsis' },
    { src: 'Media/nav.png', title: 'NERV Logo', category: 'other', alt: 'NERV Navigation Logo' }
];

// Episodes data - Spanish only
const episodes = [
    { title: "El Ataque del Ángel", synopsis: "Quince años después del Segundo Impacto, Shinji Ikari es convocado a Tokyo-3 por su padre distanciado para pilotar un robot bio-mecánico gigante llamado Evangelion para combatir seres conocidos como Ángeles." },
    { title: "La Bestia", synopsis: "Shinji despierta en el hospital y inmediatamente recibe la orden de pilotar la Unidad EVA-01 nuevamente. Conoce a su compañera piloto Rei Ayanami y comienza a entender el peso de sus responsabilidades." },
    { title: "Un Trasladado", synopsis: "Un nuevo estudiante se transfiere a la escuela de Shinji, y aparece el misterioso Tercer Ángel. Shinji debe superar sus miedos para proteger a aquellos que le importan." },
    { title: "El Dilema del Erizo", synopsis: "Shinji se muda con Misato y comienza a asistir a la escuela. Lucha por conectar con otros mientras aprende sobre el Dilema del Erizo." },
    { title: "Rei I", synopsis: "Shinji trata de conocer mejor a Rei, mientras un nuevo Ángel ataca. Aprendemos más sobre la misteriosa conexión de Rei con Gendo." },
    { title: "Rei II", synopsis: "El sexto Ángel ataca Tokyo-3, obligando a Shinji y Rei a trabajar juntos en una operación sincronizada para derrotarlo." },
    { title: "Una Obra Humana", synopsis: "NERV enfrenta una amenaza humana cuando un prototipo de robot gigante construido por el gobierno japonés desafía a los Evangelions." },
    { title: "¡Asuka Ataca!", synopsis: "La ardiente Asuka Langley llega de Alemania con la Unidad EVA-02, chocando inmediatamente con Shinji mientras lucha contra el octavo Ángel." },
    { title: "¡Los Dos, Bailen Como Si Quisieran Ganar!", synopsis: "Shinji y Asuka deben aprender a sincronizar sus movimientos para derrotar a un Ángel que se ha dividido en dos partes." },
    { title: "Buceador de Magma", synopsis: "Asuka pilota la Unidad EVA-02 en una misión peligrosa para capturar un Ángel escondido en un volcán activo." },
    { title: "El Día que Tokyo-3 Se Detuvo", synopsis: "Un apagón masivo golpea Tokyo-3 justo cuando un Ángel ataca, obligando a los pilotos Eva a luchar sin soporte energético." },
    { title: "Ella Dijo, 'No Hagas Sufrir a Otros por tu Odio Personal'", synopsis: "Mientras el duodécimo Ángel se infiltra en la sede de NERV, Shinji debe navegar por la instalación para llegar a su Eva." },
    { title: "El Invasor Liliputiense", synopsis: "Un Ángel microscópico infecta la Unidad EVA-00 y amenaza con tomar control de ella, obligando a los pilotos a entrar en una simulación computarizada." },
    { title: "Tejiendo una Historia", synopsis: "Tokyo-3 enfrenta un poderoso Ángel que puede aprender y adaptarse a cualquier ataque, llevando a los Evas a sus límites." },
    { title: "Esas Mujeres Anhelaban el Toque de Otros Labios", synopsis: "El decimoquinto Ángel ataca durante un eclipse solar total, llevando a revelaciones sobre la verdadera naturaleza de los Ángeles." },
    { title: "La División del Pecho", synopsis: "La proporción de sincronización de Shinji alcanza niveles peligrosos mientras enfrenta un colapso psicológico y cuestiona su propia identidad." },
    { title: "El Cuarto Niño", synopsis: "La selección del Cuarto Niño crea tensión en NERV, mientras la Unidad-03 se ve poseída por un Ángel." },
    { title: "Ambivalencia", synopsis: "Shinji pilota la Unidad EVA-01 contra la Unidad-03 poseída por el Ángel, sin saber quién es el piloto adentro." },
    { title: "Introyección", synopsis: "El Ángel más poderoso hasta ahora aparece y comienza un ataque psicológico en las mentes de los pilotos Eva." },
    { title: "Tejiendo una Historia 2: Etapa Oral", synopsis: "El estado psicológico de Shinji se deteriora aún más mientras el vigésimo Ángel continúa su asalto mental." },
    { title: "Él Era Consciente de que Aún Era un Niño", synopsis: "La investigación de Kaji sobre la verdadera agenda de NERV llega a su clímax, mientras las relaciones entre personajes se vuelven tensas." },
    { title: "No Seas", synopsis: "El vigésimo segundo Ángel ataca y Asuka enfrenta su pasado traumático, llevando a una derrota devastadora." },
    { title: "Rei III", synopsis: "Rei enfrenta su propia crisis existencial mientras Armisael, el vigésimo tercer Ángel, ataca tratando de fusionarse con la Unidad EVA-00." },
    { title: "El Principio y el Final, o 'Tocando las Puertas del Cielo'", synopsis: "Kaworu Nagisa llega como el Ángel final y piloto, formando una conexión profunda con Shinji antes de revelar su verdadera naturaleza." },
    { title: "¿Me Amas?", synopsis: "Shinji debe hacer una elección imposible respecto a Kaworu, llevando a la exploración psicológica de la serie." },
    { title: "Cuídate", synopsis: "El episodio final de TV se adentra profundamente en las mentes de los personajes durante el Proyecto de Instrumentalidad Humana." },
    { title: "El Fin de Evangelion", synopsis: "La conclusión cinematográfica de la serie. Mientras comienza el Tercer Impacto, Shinji debe hacer la elección definitiva para el futuro de la humanidad mientras confronta sus miedos y deseos más profundos." }
];

// Episode watch state management
class EpisodeLibrary {
    constructor() {
        this.watchedEpisodes = new Set();
        this.currentEpisode = null;
        this.dialog = null;
        this.gridContainer = null;
        this.currentTab = 'episodes';
        this.currentCategory = 'all';
        this.currentImageIndex = 0;
        this.filteredImages = [];
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
        this.initGallery();
        this.bindTabEvents();
        this.bindGalleryEvents();
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
        // Update desktop episode cards
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
        
        // Update mobile episode cards
        this.updateMobileEpisodeCards();
    }
    
    updateMobileEpisodeCards() {
        const mobileCards = document.querySelectorAll('.mobile-episode-card');
        
        mobileCards.forEach((card) => {
            const episodeNum = parseInt(card.dataset.episode);
            const isUnlocked = this.isEpisodeUnlocked(episodeNum);
            const isWatched = this.watchedEpisodes.has(episodeNum);
            const watchToggle = card.querySelector('.mobile-watch-toggle');
            const watchIcon = watchToggle.querySelector('.mobile-watch-icon');
            const classifiedOverlay = card.querySelector('.mobile-classified-overlay');
            
            // Update episode state classes
            card.classList.remove('locked', 'unlocked', 'watched');
            
            if (isWatched) {
                // Watched episodes
                card.classList.add('watched');
                watchIcon.textContent = '✅';
                watchToggle.setAttribute('title', 'Mark as unwatched');
                watchToggle.classList.remove('disabled');
                if (classifiedOverlay) classifiedOverlay.style.display = 'none';
            } else if (isUnlocked) {
                // Unlocked episodes
                card.classList.add('unlocked');
                watchIcon.textContent = '👁️';
                watchToggle.setAttribute('title', 'Mark as watched');
                watchToggle.classList.remove('disabled');
                if (classifiedOverlay) classifiedOverlay.style.display = 'none';
            } else {
                // Locked episodes
                card.classList.add('locked');
                watchIcon.textContent = '🔒';
                watchToggle.setAttribute('title', 'Episode locked');
                watchToggle.classList.add('disabled');
                if (classifiedOverlay) classifiedOverlay.style.display = 'block';
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
        const title = episodeNum === 27 ? 'El Fin de Evangelion' : `Episodio ${episodeNum}: ${episode.title}`;
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
            watchText.textContent = 'Episodio bloqueado';
            watchBtn.disabled = true;
        } else {
            watchBtn.classList.remove('disabled');
            watchBtn.disabled = false;
            if (isWatched) {
                watchText.textContent = 'Marcar como no visto';
                watchBtn.style.background = 'linear-gradient(135deg, var(--primary-red), rgba(255, 0, 0, 0.8))';
            } else {
                watchText.textContent = 'Marcar como visto';
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

    // ===== GALLERY FUNCTIONALITY =====
    initGallery() {
        this.filteredImages = [...galleryImages];
        this.generateGalleryGrid();
    }

    bindTabEvents() {
        const tabs = document.querySelectorAll('.archive-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabType = tab.dataset.tab;
                this.switchTab(tabType);
            });
        });
    }

    switchTab(tabType) {
        if (this.currentTab === tabType) return;

        this.currentTab = tabType;
        
        // Update tab appearance
        document.querySelectorAll('.archive-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabType}"]`).classList.add('active');

        // Switch sections
        const episodesSection = document.getElementById('episodes');
        const gallerySection = document.getElementById('gallery');

        if (tabType === 'episodes') {
            episodesSection.style.display = 'block';
            gallerySection.style.display = 'none';
        } else {
            episodesSection.style.display = 'none';
            gallerySection.style.display = 'block';
        }

        // Add transition effect
        this.addTabSwitchEffect();
    }

    addTabSwitchEffect() {
        const activeSection = this.currentTab === 'episodes' ? 
            document.getElementById('episodes') : 
            document.getElementById('gallery');
        
        activeSection.style.opacity = '0';
        activeSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            activeSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            activeSection.style.opacity = '1';
            activeSection.style.transform = 'translateY(0)';
        }, 50);
    }

    bindGalleryEvents() {
        // Category buttons
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.filterGallery(category);
                
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Modal events
        this.bindModalEvents();
    }

    filterGallery(category) {
        this.currentCategory = category;
        
        if (category === 'all') {
            this.filteredImages = [...galleryImages];
        } else {
            this.filteredImages = galleryImages.filter(img => img.category === category);
        }
        
        this.generateGalleryGrid();
    }

    generateGalleryGrid() {
        const galleryGrid = document.getElementById('galleryGrid');
        galleryGrid.innerHTML = '';

        this.filteredImages.forEach((image, index) => {
            const memoryCard = this.createMemoryCard(image, index);
            galleryGrid.appendChild(memoryCard);
        });
    }

    createMemoryCard(image, index) {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        
        card.innerHTML = `
            <img class="card-image" src="${image.src}" alt="${image.alt}" loading="lazy">
            <div class="card-info">
                <h4 class="card-title">${image.title}</h4>
                <p class="card-category">${this.getCategoryDisplayName(image.category)}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            this.openImageModal(index);
        });

        return card;
    }

    getCategoryDisplayName(category) {
        const categoryNames = {
            'characters': 'PILOT',
            'evas': 'UNIT',
            'episodes': 'EPISODE',
            'other': 'ARCHIVE'
        };
        return categoryNames[category] || category.toUpperCase();
    }

    // ===== MODAL FUNCTIONALITY =====
    bindModalEvents() {
        const modal = document.getElementById('imageModal');
        const modalClose = document.getElementById('modalClose');
        const modalPrev = document.getElementById('modalPrev');
        const modalNext = document.getElementById('modalNext');
        const modalOverlay = modal.querySelector('.modal-overlay');

        modalClose.addEventListener('click', () => this.closeImageModal());
        modalPrev.addEventListener('click', () => this.navigateModal(-1));
        modalNext.addEventListener('click', () => this.navigateModal(1));
        modalOverlay.addEventListener('click', () => this.closeImageModal());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeImageModal();
                    break;
                case 'ArrowLeft':
                    this.navigateModal(-1);
                    break;
                case 'ArrowRight':
                    this.navigateModal(1);
                    break;
            }
        });
    }

    openImageModal(index) {
        this.currentImageIndex = index;
        const modal = document.getElementById('imageModal');
        
        this.updateModalContent();
        modal.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeImageModal() {
        const modal = document.getElementById('imageModal');
        modal.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    navigateModal(direction) {
        const newIndex = this.currentImageIndex + direction;
        
        if (newIndex >= 0 && newIndex < this.filteredImages.length) {
            this.currentImageIndex = newIndex;
            this.updateModalContent();
        }
    }

    updateModalContent() {
        const image = this.filteredImages[this.currentImageIndex];
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalCategory = document.getElementById('modalCategory');
        const modalCurrent = document.getElementById('modalCurrent');
        const modalTotal = document.getElementById('modalTotal');
        const modalPrev = document.getElementById('modalPrev');
        const modalNext = document.getElementById('modalNext');

        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modalTitle.textContent = image.title;
        modalCategory.textContent = this.getCategoryDisplayName(image.category);
        modalCurrent.textContent = this.currentImageIndex + 1;
        modalTotal.textContent = this.filteredImages.length;

        // Update navigation buttons
        modalPrev.disabled = this.currentImageIndex === 0;
        modalNext.disabled = this.currentImageIndex === this.filteredImages.length - 1;

        // Add loading effect
        modalImage.style.opacity = '0';
        modalImage.onload = () => {
            modalImage.style.transition = 'opacity 0.3s ease';
            modalImage.style.opacity = '1';
        };
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EpisodeLibrary and make it globally available
    window.episodeLibrary = new EpisodeLibrary();
    
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
