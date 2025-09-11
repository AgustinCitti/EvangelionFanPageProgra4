// ===== MAP PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initMapbox();
    initMapControls();
    initNavigation();
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

    // Modify map style for radar theme
    map.setPaintProperty('background', 'background-color', '#000000');
    
    // Style water bodies
    if (map.getLayer('water')) {
        map.setPaintProperty('water', 'fill-color', '#001122');
        map.setPaintProperty('water', 'fill-opacity', 0.8);
    }
    
    // Style land
    if (map.getLayer('land')) {
        map.setPaintProperty('land', 'fill-color', '#000000');
    }
    
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
        document.getElementById('mapStatus').textContent = 'SCANNING';
        clearTimeout(activityTimeout);
    });

    map.on('moveend', function() {
        activityTimeout = setTimeout(() => {
            document.getElementById('mapStatus').textContent = 'ACTIVE';
        }, 1000);
    });
}

function updateMapHUD() {
    const center = map.getCenter();
    const zoom = map.getZoom();
    
    document.getElementById('coordinates').textContent = 
        `${center.lat.toFixed(4)}°N, ${center.lng.toFixed(4)}°E`;
    document.getElementById('zoomLevel').textContent = zoom.toFixed(1);
}

// ===== MAP CONTROLS =====
function initMapControls() {
    const resetBtn = document.getElementById('resetView');
    const satelliteBtn = document.getElementById('toggleSatellite');
    const terrainBtn = document.getElementById('toggleTerrain');
    const labelsBtn = document.getElementById('toggleLabels');

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
        const currentStyle = map.getStyle().name;
        if (currentStyle.includes('dark')) {
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
    });

    terrainBtn.addEventListener('click', function() {
        if (map.getTerrain()) {
            map.setTerrain(null);
            this.classList.remove('active');
        } else {
            map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
            this.classList.add('active');
        }
    });

    labelsBtn.addEventListener('click', function() {
        const labelLayers = ['country-label', 'state-label', 'place-label'];
        const isHidden = this.classList.contains('active');
        
        labelLayers.forEach(layerId => {
            if (map.getLayer(layerId)) {
                map.setLayoutProperty(layerId, 'visibility', isHidden ? 'visible' : 'none');
            }
        });
        
        this.classList.toggle('active');
        this.textContent = isHidden ? 'LABELS' : 'NO LABELS';
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
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
    switch(e.key) {
        case 'Escape':
            if (map) {
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
            document.getElementById('resetView').click();
            break;
        case 's':
        case 'S':
            document.getElementById('toggleSatellite').click();
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
