/**
 * NERV Code Modal System
 * A 6-digit security code input modal for navigation logo click
 */

class CodeModal {
    constructor() {
        this.modal = null;
        this.digits = [];
        this.currentIndex = 0;
        this.code = '';
        this.correctCode = '220915'; // You can change this to any 6-digit code
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.createModal();
        this.bindEvents();
    }
    
    createModal() {
        // Create modal HTML structure
        const modalHTML = `
            <div class="code-modal-overlay" id="codeModalOverlay">
                <div class="code-modal">
                    <button class="code-modal-close" id="codeModalClose">&times;</button>
                    
                    <div class="code-modal-header">
                        <h3 class="code-modal-title">NERV SECURITY ACCESS</h3>
                        <p class="code-modal-subtitle">Enter 6-digit authorization code</p>
                    </div>
                    
                    <div class="code-input-container">
                        <input type="text" class="code-digit" maxlength="1" data-index="0">
                        <input type="text" class="code-digit" maxlength="1" data-index="1">
                        <input type="text" class="code-digit" maxlength="1" data-index="2">
                        <input type="text" class="code-digit" maxlength="1" data-index="3">
                        <input type="text" class="code-digit" maxlength="1" data-index="4">
                        <input type="text" class="code-digit" maxlength="1" data-index="5">
                    </div>
                    
                    <div class="code-status">
                        <div class="code-status-text info" id="codeStatusText">
                            Enter your access code to proceed
                        </div>
                    </div>
                    
                    <div class="access-granted" id="accessGranted">
                        <div class="access-granted-icon">✓</div>
                        <div class="access-granted-text">ACCESS GRANTED</div>
                        <div class="code-status-text success">Welcome to NERV Systems</div>
                    </div>
                    
                    <div class="code-modal-actions">
                        <button class="code-modal-btn clear" id="codeModalClear">Clear</button>
                        <button class="code-modal-btn" id="codeModalSubmit" disabled>Submit</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Get references
        this.modal = document.getElementById('codeModalOverlay');
        this.digits = document.querySelectorAll('.code-digit');
        this.statusText = document.getElementById('codeStatusText');
        this.submitBtn = document.getElementById('codeModalSubmit');
        this.clearBtn = document.getElementById('codeModalClear');
        this.closeBtn = document.getElementById('codeModalClose');
        this.accessGranted = document.getElementById('accessGranted');
    }
    
    bindEvents() {
        // Nav logo click event
        const navLogos = document.querySelectorAll('.nav-logo, .nav-logo-image');
        navLogos.forEach(logo => {
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.open();
            });
            
            // Add cursor pointer style
            logo.style.cursor = 'pointer';
        });
        
        // Modal close events
        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
        
        // Code input events
        this.digits.forEach((digit, index) => {
            // Input event
            digit.addEventListener('input', (e) => {
                this.handleInput(e, index);
            });
            
            // Focus event
            digit.addEventListener('focus', () => {
                this.currentIndex = index;
            });
            
            // Keydown event for navigation
            digit.addEventListener('keydown', (e) => {
                this.handleKeydown(e, index);
            });
            
            // Paste event
            digit.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text');
                this.handlePaste(pastedData, index);
            });
        });
        
        // Button events
        this.submitBtn.addEventListener('click', () => this.submitCode());
        this.clearBtn.addEventListener('click', () => this.clearCode());
    }
    
    handleInput(e, index) {
        const value = e.target.value;
        
        // Only allow numbers
        if (!/^\d*$/.test(value)) {
            e.target.value = '';
            return;
        }
        
        // Update visual state
        if (value) {
            e.target.classList.add('filled');
            // Move to next input
            if (index < 5) {
                this.digits[index + 1].focus();
            }
        } else {
            e.target.classList.remove('filled');
        }
        
        this.updateCode();
    }
    
    handleKeydown(e, index) {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            // Move to previous input on backspace if current is empty
            this.digits[index - 1].focus();
            this.digits[index - 1].value = '';
            this.digits[index - 1].classList.remove('filled');
            this.updateCode();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            this.digits[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            this.digits[index + 1].focus();
        } else if (e.key === 'Enter') {
            this.submitCode();
        }
    }
    
    handlePaste(pastedData, startIndex) {
        const numbers = pastedData.replace(/\D/g, '');
        const digits = numbers.split('').slice(0, 6 - startIndex);
        
        digits.forEach((digit, i) => {
            const index = startIndex + i;
            if (index < 6) {
                this.digits[index].value = digit;
                this.digits[index].classList.add('filled');
            }
        });
        
        // Focus last filled digit + 1
        const lastIndex = Math.min(startIndex + digits.length, 5);
        this.digits[lastIndex].focus();
        
        this.updateCode();
    }
    
    updateCode() {
        this.code = Array.from(this.digits).map(digit => digit.value).join('');
        
        // Update submit button state
        this.submitBtn.disabled = this.code.length !== 6;
        
        // Clear error states
        this.digits.forEach(digit => {
            digit.classList.remove('error');
        });
        
        // Reset status if not complete
        if (this.code.length < 6) {
            this.statusText.textContent = 'Enter your access code to proceed';
            this.statusText.className = 'code-status-text info';
        }
    }
    
    submitCode() {
        if (this.code.length !== 6) {
            this.showError('Code must be 6 digits');
            return;
        }
        
        if (this.code === this.correctCode) {
            this.showSuccess();
        } else {
            this.showError('Access denied. Invalid code.');
            this.addErrorAnimation();
        }
    }
    
    showSuccess() {
        this.statusText.textContent = 'Code verified. Access granted!';
        this.statusText.className = 'code-status-text success';
        
        // Show access granted animation
        this.accessGranted.classList.add('show');
        
        // Hide modal after delay
        setTimeout(() => {
            this.close();
            // You can add any additional functionality here for successful access
            console.log('NERV Access Granted!');
        }, 2000);
    }
    
    showError(message) {
        this.statusText.textContent = message;
        this.statusText.className = 'code-status-text error';
    }
    
    addErrorAnimation() {
        this.digits.forEach(digit => {
            digit.classList.add('error');
        });
        
        // Clear error animation after animation completes
        setTimeout(() => {
            this.digits.forEach(digit => {
                digit.classList.remove('error');
            });
        }, 500);
    }
    
    clearCode() {
        this.code = '';
        this.digits.forEach(digit => {
            digit.value = '';
            digit.classList.remove('filled', 'error');
        });
        
        this.statusText.textContent = 'Enter your access code to proceed';
        this.statusText.className = 'code-status-text info';
        this.submitBtn.disabled = true;
        this.accessGranted.classList.remove('show');
        
        // Focus first input
        this.digits[0].focus();
    }
    
    open() {
        this.isOpen = true;
        this.modal.classList.add('active');
        
        // Clear any previous state
        this.clearCode();
        
        // Focus first input after modal opens
        setTimeout(() => {
            this.digits[0].focus();
        }, 100);
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.isOpen = false;
        this.modal.classList.remove('active');
        
        // Enable body scroll
        document.body.style.overflow = '';
        
        // Clear code after close
        setTimeout(() => {
            this.clearCode();
        }, 300);
    }
}

// Initialize the code modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CodeModal();
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeModal;
}
