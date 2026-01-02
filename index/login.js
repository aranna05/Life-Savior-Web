document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginFormElement = document.getElementById('loginForm');
    const registerFormElement = document.getElementById('registerForm');

    // Tab switching
    loginTab.addEventListener('click', () => {
        switchToTab('login');
    });

    registerTab.addEventListener('click', () => {
        switchToTab('register');
    });

    function switchToTab(tabName) {
        // Update tabs
        loginTab.classList.toggle('active', tabName === 'login');
        registerTab.classList.toggle('active', tabName === 'register');
        
        // Update forms
        loginForm.classList.toggle('active', tabName === 'login');
        registerForm.classList.toggle('active', tabName === 'register');
        
        // Add heartbeat effect on tab switch
        const activeTab = tabName === 'login' ? loginTab : registerTab;
        activeTab.style.transform = 'scale(0.98)';
        setTimeout(() => {
            activeTab.style.transform = 'scale(1)';
        }, 150);
    }

    // Form validation patterns
    const patterns = {
        phone: /^01[3-9]\d{8}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
    };

    // Login form submission
    loginFormElement.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Validation
        if (!email || !password) {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Authenticating...';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Here you would make actual API call
            // const response = await fetch('/api/login', {...})
            
            // For demo purpose
            const isValid = email && password.length >= 6;
            
            if (isValid) {
                showAlert('Login successful! Redirecting to dashboard...', 'success');
                
                // Store user data (in real app, store JWT token)
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                
                // Redirect to home page
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showAlert('Invalid credentials. Please try again.', 'error');
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        }, 1500);
    });

    // Register form submission
    registerFormElement.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const email = document.getElementById('regEmail').value.trim();
        
        // Validation
        if (!fullName || !phone || !password) {
            showAlert('Please fill in all required fields', 'error');
            return;
        }
        
        if (!patterns.phone.test(phone)) {
            showAlert('Please enter a valid Bangladeshi phone number (e.g., 017XXXXXXXX)', 'error');
            return;
        }
        
        if (email && !patterns.email.test(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        if (!patterns.password.test(password)) {
            showAlert('Password must be at least 8 characters with letters and numbers', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'error');
            return;
        }
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Creating Account...';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Here you would make actual API call
            // const response = await fetch('/api/register', {...})
            
            // For demo purpose - always success
            showAlert('Account created successfully! Welcome to Life Savior.', 'success');
            
            // Store registration data
            const userData = {
                name: fullName,
                phone: phone,
                email: email || '',
                registered: new Date().toISOString()
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('userLoggedIn', 'true');
            
            // Clear form
            registerFormElement.reset();
            
            // Switch to login tab
            setTimeout(() => {
                switchToTab('login');
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 2000);
        }, 2000);
    });

    // Real-time password validation
    const passwordInput = document.getElementById('regPassword');
    const confirmInput = document.getElementById('confirmPassword');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePasswordStrength(this.value);
        });
    }
    
    if (confirmInput) {
        confirmInput.addEventListener('input', function() {
            if (passwordInput.value !== this.value && this.value.length > 0) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#28a745';
            }
        });
    }
    
    function validatePasswordStrength(password) {
        const strength = {
            length: password.length >= 8,
            letter: /[A-Za-z]/.test(password),
            number: /\d/.test(password)
        };
        
        const strengthLevel = Object.values(strength).filter(Boolean).length;
        const passwordInput = document.getElementById('regPassword');
        
        if (strengthLevel === 3) {
            passwordInput.style.borderColor = '#28a745';
        } else if (strengthLevel >= 2) {
            passwordInput.style.borderColor = '#ffc107';
        } else {
            passwordInput.style.borderColor = '#dc3545';
        }
    }

    // Social login buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 'Facebook';
            showAlert(`Connecting to ${platform}...`, 'info');
            
            // Here you would implement actual OAuth
            setTimeout(() => {
                showAlert(`Demo: ${platform} login would redirect to authentication page`, 'info');
            }, 500);
        });
    });

    // Forgot password
    document.querySelector('.forgot-password')?.addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Please enter your email or phone number for password reset:');
        if (email) {
            showAlert(`Password reset link has been sent to ${email}`, 'success');
        }
    });

    // Emergency number click
    document.querySelector('.emergency-number')?.addEventListener('click', function() {
        if (confirm('Call emergency number 999?')) {
            showAlert('Dialing emergency services...', 'info');
            // In real app: window.location.href = 'tel:999';
        }
    });

    // Alert function
    function showAlert(message, type = 'info') {
        // Remove existing alerts
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) existingAlert.remove();
        
        const alert = document.createElement('div');
        alert.className = `custom-alert ${type}`;
        alert.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        // Add styles
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? '#28a745' : 
                        type === 'error' ? '#dc3545' : 
                        type === 'info' ? '#17a2b8' : '#6c757d'};
        `;
        
        document.body.appendChild(alert);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentElement) {
                alert.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => alert.remove(), 300);
            }
        }, 5000);
    }

    // Add CSS for alerts
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .custom-alert button {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `;
    document.head.appendChild(style);
});