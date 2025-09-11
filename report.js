// NERV Report System JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const adminAccessBtn = document.getElementById('adminAccessBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const reportForm = document.getElementById('reviewForm');
    const submitButton = document.querySelector('.nerv-submit');
    const statusIndicator = document.querySelector('.status-indicator');
    
    // Modal functionality
    if (adminAccessBtn && modalOverlay) {
        adminAccessBtn.addEventListener('click', function() {
            openModal();
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal();
        });
    }
    
    // Close modal on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Form submission handler
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            submitButton.classList.add('loading');
            if (statusIndicator) {
                statusIndicator.style.background = '#ff9900';
            }
            
            // Simulate data transmission
            setTimeout(() => {
                // Success state
                submitButton.classList.remove('loading');
                if (statusIndicator) {
                    statusIndicator.style.background = 'var(--terminal-green)';
                }
                
                // Show success message
                showTransmissionResult(true);
                
                // Reset form after delay
                setTimeout(() => {
                    reportForm.reset();
                    if (statusIndicator) {
                        statusIndicator.style.background = 'var(--terminal-green)';
                    }
                    // Close modal after successful submission
                    setTimeout(() => {
                        closeModal();
                    }, 1000);
                }, 3000);
                
            }, 2000);
        });
    }
    
    // Modal functions
    function openModal() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add access sound effect (visual feedback)
        const accessBtn = document.querySelector('.admin-access-btn');
        accessBtn.style.animation = 'none';
        setTimeout(() => {
            accessBtn.style.animation = '';
        }, 100);
        
        // Focus first input when modal opens
        setTimeout(() => {
            const firstInput = modalOverlay.querySelector('input');
            if (firstInput) {
                firstInput.focus();
            }
        }, 300);
    }
    
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form when closing
        if (reportForm) {
            reportForm.reset();
        }
        
        // Reset any loading states
        if (submitButton) {
            submitButton.classList.remove('loading');
        }
    }
    
    // Show transmission result
    function showTransmissionResult(success) {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'transmission-result';
        resultDiv.innerHTML = success ? 
            '<div class="result-success">✓ DATA TRANSMITTED TO MAGI SYSTEM</div>' :
            '<div class="result-error">✗ TRANSMISSION FAILED - RETRY</div>';
        
        const terminal = document.querySelector('.nerv-terminal');
        terminal.appendChild(resultDiv);
        
        // Add CSS for result styling
        const style = document.createElement('style');
        style.textContent = `
            .transmission-result {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.95);
                border: 2px solid ${success ? 'var(--terminal-green)' : 'var(--primary-red)'};
                padding: 2rem;
                font-family: 'Orbitron', monospace;
                font-weight: bold;
                color: ${success ? 'var(--terminal-green)' : 'var(--primary-red)'};
                text-align: center;
                z-index: 1000;
                animation: fadeInOut 3s ease-in-out forwards;
                box-shadow: 0 0 30px ${success ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)'};
            }
            
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
        
        // Remove result after animation
        setTimeout(() => {
            resultDiv.remove();
            style.remove();
        }, 3000);
    }
    
    // Enhanced input focus effects
    const inputs = document.querySelectorAll('.nerv-form input, .nerv-form select, .nerv-form textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
        
        // Typing effect for inputs
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.parentNode.classList.add('has-content');
            } else {
                this.parentNode.classList.remove('has-content');
            }
        });
    });
    
    // Add terminal typing sound effect (visual feedback)
    inputs.forEach(input => {
        if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
            input.addEventListener('keydown', function() {
                // Create a brief flash effect on the terminal
                const terminal = document.querySelector('.nerv-terminal');
                terminal.style.boxShadow = '0 0 25px rgba(0, 255, 0, 0.4), inset 0 0 20px rgba(0, 255, 0, 0.08)';
                
                setTimeout(() => {
                    terminal.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.05)';
                }, 100);
            });
        }
    });
    
    // Navigation active state management
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentPage === 'report.html' && link.getAttribute('data-page') === 'report') {
            link.classList.add('active');
        }
    });
});

// Add some additional CSS for enhanced form interactions
const additionalStyles = `
    .form-group.focused label {
        color: var(--primary-red);
        text-shadow: 0 0 8px var(--primary-red);
    }
    
    .form-group.has-content label {
        transform: translateY(-2px);
        font-size: 0.85rem;
    }
    
    .form-group {
        transition: all 0.3s ease;
    }
    
    .form-group.focused {
        transform: translateX(5px);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
