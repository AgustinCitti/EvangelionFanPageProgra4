// ===== MAP PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initMapbox();
    initMapControls();
    initNavigation();
    initAngelAlert();
});

// ===== MAPBOX INTEGRATION =====
let map;
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYnJld2FwcCIsImEiOiJjbWR3NmpiOWYxejd4MmtvaHUzZHVjdnZ1In0.R8JCFitenAT9HVy9t5vhBw';

function initMapbox() {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    // Tokyo-3 coordinates (Hakone area)
    const tokyo3Coords = [139.0909, 35.2606];
    
    map = new mapboxgl.Map({
        container: 'mapboxMap',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: tokyo3Coords,
        zoom: 10,
        pitch: 0,
        bearing: 0,
        attributionControl: false
    });

    // Wait for map to load
    map.on('load', function() {
        // Add custom styling for the radar theme
        applyRadarMapStyle();
        
        // Add Tokyo-3 markers and locations
        addTokyo3Locations();
        
        // Add custom controls
        addCustomControls();
        
        // Initialize map event listeners
        initMapEvents();
    });

    // Update HUD coordinates on map move
    map.on('move', updateMapHUD);
    map.on('zoom', updateMapHUD);
}

function applyRadarMapStyle() {
    // Add custom layers for radar effect
    map.addSource('radar-grid', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': []
        }
    });

    // Wait for style to be fully loaded before applying changes
    if (!map.isStyleLoaded()) {
        map.once('styledata', applyRadarMapStyle);
        return;
    }

    // Safely modify map style for radar theme - check if layers exist first
    try {
        // Style water bodies
        if (map.getLayer('water')) {
            map.setPaintProperty('water', 'fill-color', '#001122');
            map.setPaintProperty('water', 'fill-opacity', 0.8);
        }
        
        // Style land areas
        if (map.getLayer('land')) {
            map.setPaintProperty('land', 'fill-color', '#000000');
        }
        
        // Try to style background if it exists
        if (map.getLayer('background')) {
            map.setPaintProperty('background', 'background-color', '#000000');
        }
    } catch (error) {
        console.warn('Could not apply some map styling:', error);
    }
    
    try {
        // Style roads with green terminal color
        const roadLayers = ['road-primary', 'road-secondary', 'road-arterial', 'road-local'];
        roadLayers.forEach(layerId => {
            if (map.getLayer(layerId)) {
                map.setPaintProperty(layerId, 'line-color', '#00ff41');
                map.setPaintProperty(layerId, 'line-opacity', 0.6);
            }
        });
        
        // Style buildings
        if (map.getLayer('building')) {
            map.setPaintProperty('building', 'fill-color', '#003300');
            map.setPaintProperty('building', 'fill-opacity', 0.7);
            map.setPaintProperty('building', 'fill-outline-color', '#00ff41');
        }
    } catch (error) {
        console.warn('Could not apply road/building styling:', error);
    }
}

function addTokyo3Locations() {
    const locations = [
        {
            name: 'NERV HEADQUARTERS',
            coordinates: [139.0909, 35.2606],
            description: 'Underground fortress housing Evangelion units and Central Dogma',
            type: 'headquarters'
        },
        {
            name: 'TOKYO-3 CITY CENTER',
            coordinates: [139.1009, 35.2706],
            description: 'Retractable city buildings designed for Angel combat',
            type: 'city'
        },
        {
            name: 'LAKE ASHI',
            coordinates: [139.0259, 35.1906],
            description: 'Strategic water barrier surrounding Tokyo-3',
            type: 'landmark'
        },
        {
            name: 'EVA LAUNCH CATAPULTS',
            coordinates: [139.0759, 35.2456],
            description: 'High-speed launch systems for Evangelion deployment',
            type: 'military'
        },
        {
            name: 'AT FIELD GENERATORS',
            coordinates: [139.1159, 35.2856],
            description: 'Defensive barrier systems protecting the city',
            type: 'defense'
        }
    ];

    locations.forEach(location => {
        // Create marker element
        const markerEl = document.createElement('div');
        markerEl.className = `custom-marker ${location.type}`;
        markerEl.innerHTML = `
            <div class="marker-pulse"></div>
            <div class="marker-icon"></div>
        `;

        // Create popup
        const popup = new mapboxgl.Popup({
            offset: 25,
            className: 'custom-popup'
        }).setHTML(`
            <div class="popup-content">
                <h3>${location.name}</h3>
                <p>${location.description}</p>
                <div class="popup-coords">
                    LAT: ${location.coordinates[1].toFixed(4)}°<br>
                    LNG: ${location.coordinates[0].toFixed(4)}°
                </div>
            </div>
        `);

        // Add marker to map
        new mapboxgl.Marker(markerEl)
            .setLngLat(location.coordinates)
            .setPopup(popup)
            .addTo(map);
    });

    // Add custom marker styles
    addMarkerStyles();
}

function addMarkerStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .custom-marker {
            width: 20px;
            height: 20px;
            position: relative;
            cursor: pointer;
        }
        
        .marker-pulse {
            width: 100%;
            height: 100%;
            border: 2px solid #ff3300;
            border-radius: 50%;
            position: absolute;
            animation: pulse 2s ease-out infinite;
        }
        
        .marker-icon {
            width: 8px;
            height: 8px;
            background: #ff3300;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        
        .custom-marker.headquarters .marker-pulse {
            border-color: #00ff41;
        }
        
        .custom-marker.headquarters .marker-icon {
            background: #00ff41;
        }
        
        .custom-marker.defense .marker-pulse {
            border-color: #ffcc00;
        }
        
        .custom-marker.defense .marker-icon {
            background: #ffcc00;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(2.5);
                opacity: 0;
            }
        }
        
        .popup-content h3 {
            color: #00ff41;
            font-family: 'Orbitron', monospace;
            margin-bottom: 8px;
            font-size: 0.9rem;
        }
        
        .popup-content p {
            margin-bottom: 10px;
            line-height: 1.4;
            font-size: 0.8rem;
        }
        
        .popup-coords {
            font-family: 'Share Tech Mono', monospace;
            color: #ffcc00;
            font-size: 0.75rem;
            border-top: 1px solid #333;
            padding-top: 8px;
        }
    `;
    document.head.appendChild(style);
}

function addCustomControls() {
    // Remove default controls and add custom ones if needed
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
}

function initMapEvents() {
    // Handle map interactions for HUD updates
    map.on('click', function(e) {
        const coords = e.lngLat;
        console.log(`Clicked at: ${coords.lat}, ${coords.lng}`);
    });

    // Update status based on map activity
    let activityTimeout;
    map.on('movestart', function() {
        const statusElement = document.getElementById('mapStatus');
        if (statusElement) {
            statusElement.textContent = 'SCANNING';
        }
        clearTimeout(activityTimeout);
    });

    map.on('moveend', function() {
        activityTimeout = setTimeout(() => {
            const statusElement = document.getElementById('mapStatus');
            if (statusElement) {
                statusElement.textContent = 'ACTIVE';
            }
        }, 1000);
    });
}

function updateMapHUD() {
    try {
        const center = map.getCenter();
        const zoom = map.getZoom();
        
        const coordsElement = document.getElementById('coordinates');
        const zoomElement = document.getElementById('zoomLevel');
        
        if (coordsElement) {
            coordsElement.textContent = `${center.lat.toFixed(4)}°N, ${center.lng.toFixed(4)}°E`;
        }
        
        if (zoomElement) {
            zoomElement.textContent = zoom.toFixed(1);
        }
    } catch (error) {
        console.warn('Error updating map HUD:', error);
    }
}

// ===== MAP CONTROLS =====
function initMapControls() {
    const resetBtn = document.getElementById('resetView');
    const satelliteBtn = document.getElementById('toggleSatellite');
    const terrainBtn = document.getElementById('toggleTerrain');
    const labelsBtn = document.getElementById('toggleLabels');

    // Check if all required elements exist
    if (!resetBtn || !satelliteBtn || !terrainBtn || !labelsBtn) {
        console.warn('Some map control buttons are missing from the DOM');
        return;
    }

    resetBtn.addEventListener('click', function() {
        map.flyTo({
            center: [139.0909, 35.2606],
            zoom: 10,
            pitch: 0,
            bearing: 0,
            duration: 2000
        });
        
        // Visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    satelliteBtn.addEventListener('click', function() {
        try {
            const currentStyle = map.getStyle();
            const styleName = currentStyle && currentStyle.name ? currentStyle.name : '';
            
            if (styleName.includes('dark') || !styleName.includes('satellite')) {
                map.setStyle('mapbox://styles/mapbox/satellite-v9');
                this.classList.add('active');
                this.textContent = 'TACTICAL';
            } else {
                map.setStyle('mapbox://styles/mapbox/dark-v11');
                this.classList.remove('active');
                this.textContent = 'SATELLITE';
                
                // Reapply custom styling when switching back
                map.once('styledata', applyRadarMapStyle);
            }
        } catch (error) {
            console.warn('Error toggling satellite view:', error);
        }
    });

    terrainBtn.addEventListener('click', function() {
        try {
            if (map.getTerrain()) {
                map.setTerrain(null);
                this.classList.remove('active');
            } else {
                // First add terrain source if it doesn't exist
                if (!map.getSource('mapbox-dem')) {
                    map.addSource('mapbox-dem', {
                        'type': 'raster-dem',
                        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                        'tileSize': 512,
                        'maxzoom': 14
                    });
                }
                map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
                this.classList.add('active');
            }
        } catch (error) {
            console.warn('Error toggling terrain:', error);
        }
    });

    labelsBtn.addEventListener('click', function() {
        try {
            const labelLayers = ['country-label', 'state-label', 'place-label', 'settlement-label'];
            const isHidden = this.classList.contains('active');
            
            labelLayers.forEach(layerId => {
                if (map.getLayer(layerId)) {
                    map.setLayoutProperty(layerId, 'visibility', isHidden ? 'visible' : 'none');
                }
            });
            
            this.classList.toggle('active');
            this.textContent = isHidden ? 'LABELS' : 'NO LABELS';
        } catch (error) {
            console.warn('Error toggling labels:', error);
        }
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.querySelector('.nav-menu');
    
    // Handle burger menu toggle
    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!burgerMenu.contains(e.target) && !navMenu.contains(e.target)) {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Handle navigation
            const page = this.getAttribute('data-page');
            const section = this.getAttribute('data-section');
            
            if (page && page !== 'map') {
                // Allow normal navigation to other pages
                return;
            }
            
            if (section) {
                e.preventDefault();
                // Handle section navigation within map page if needed
            }
        });
    });
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.querySelector('.nav-menu');
    
    switch(e.key) {
        case 'Escape':
            // Check if angel alert modal is open first
            const angelModal = document.getElementById('angelAlertModal');
            if (angelModal && angelModal.classList.contains('active')) {
                hideAngelAlert();
            } else if (burgerMenu && navMenu && navMenu.classList.contains('active')) {
                // Close mobile menu if open
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            } else if (map) {
                // Reset map view
                map.flyTo({
                    center: [139.0909, 35.2606],
                    zoom: 10,
                    pitch: 0,
                    bearing: 0,
                    duration: 1000
                });
            }
            break;
        case 'r':
        case 'R':
            const resetBtn = document.getElementById('resetView');
            if (resetBtn) resetBtn.click();
            break;
        case 's':
        case 'S':
            const satelliteBtn = document.getElementById('toggleSatellite');
            if (satelliteBtn) satelliteBtn.click();
            break;
    }
});

// ===== TERMINAL GLITCH EFFECTS =====
function addTerminalGlitch() {
    const mapTitle = document.querySelector('.map-title');
    if (mapTitle) {
        setInterval(() => {
            if (Math.random() < 0.1) {
                mapTitle.style.textShadow = '0 0 20px rgba(255, 51, 0, 0.8)';
                setTimeout(() => {
                    mapTitle.style.textShadow = '0 0 20px rgba(0, 255, 65, 0.5)';
                }, 100);
            }
        }, 2000);
    }
}

// Initialize terminal effects
setTimeout(() => {
    addTerminalGlitch();
}, 1000);

// ===== ANGEL ALERT SYSTEM =====
let angelAlertTimer;
let angelAlertSound;

function initAngelAlert() {
    // Set timer for 10 seconds
    angelAlertTimer = setTimeout(() => {
        showAngelAlert();
    }, 10000);
    
    // Initialize close button
    const closeBtn = document.getElementById('closeAngelModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideAngelAlert);
    }
    
    // Note: Escape key handling is done in the main keyboard shortcuts section
    
    // Close modal on background click (not on modal content)
    const modal = document.getElementById('angelAlertModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            // Only close if clicking directly on the modal background, not its content
            if (e.target === modal) {
                hideAngelAlert();
            }
        });
        
        // Prevent modal content clicks from bubbling up
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
}

function showAngelAlert() {
    const modal = document.getElementById('angelAlertModal');
    if (modal) {
        modal.classList.add('active');
        
        // Play alarm sound
        playAngelAlertSound();
        
        // Note: Modal will stay open until user manually closes it
    }
}

function hideAngelAlert() {
    const modal = document.getElementById('angelAlertModal');
    if (modal) {
        modal.classList.remove('active');
        
        // Stop alarm sound
        stopAngelAlertSound();
        
        // Remove any pending interaction listeners
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('keydown', playOnInteraction);
    }
}

function playAngelAlertSound() {
    try {
        // Create new audio instance
        angelAlertSound = new Audio('Media/sounds/HACKMAGI _ ReWORK - UNKNOWNMAER.mp3');
        angelAlertSound.volume = 0.7;
        angelAlertSound.loop = true;
        
        // Handle potential autoplay restrictions
        const playPromise = angelAlertSound.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Angel alert sound playing');
            }).catch(error => {
                console.warn('Audio autoplay was prevented:', error);
                // Try to play on user interaction
                document.addEventListener('click', playOnInteraction, { once: true });
                document.addEventListener('keydown', playOnInteraction, { once: true });
            });
        }
    } catch (error) {
        console.warn('Could not load angel alert sound:', error);
    }
}

function playOnInteraction() {
    if (angelAlertSound && document.getElementById('angelAlertModal').classList.contains('active')) {
        angelAlertSound.play().catch(error => {
            console.warn('Could not play sound on interaction:', error);
        });
    }
}

function stopAngelAlertSound() {
    if (angelAlertSound) {
        angelAlertSound.pause();
        angelAlertSound.currentTime = 0;
        angelAlertSound = null;
    }
}
