/**
 * BMW Hub Form Validation
 * Client-side validation for forms
 */

/**
 * Initialize Contact Form Validation
 */
function initContactFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');
    
    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Form submission
    contactForm.addEventListener('submit', function(event) {
        let isValid = true;
        
        // Reset errors
        resetErrors();
        
        // Validate name
        if (!nameField.value.trim()) {
            isValid = false;
            showError(nameField, nameError, 'Please enter your name');
        } else if (nameField.value.trim().length < 2) {
            isValid = false;
            showError(nameField, nameError, 'Name must be at least 2 characters');
        }
        
        // Validate email
        if (!emailField.value.trim()) {
            isValid = false;
            showError(emailField, emailError, 'Please enter your email address');
        } else if (!isValidEmail(emailField.value.trim())) {
            isValid = false;
            showError(emailField, emailError, 'Please enter a valid email address');
        }
        
        // Validate phone (if provided)
        if (phoneField.value.trim() && !isValidPhone(phoneField.value.trim())) {
            isValid = false;
            showError(phoneField, null, 'Please enter a valid phone number');
        }
        
        // Validate message
        if (!messageField.value.trim()) {
            isValid = false;
            showError(messageField, messageError, 'Please enter your message');
        } else if (messageField.value.trim().length < 10) {
            isValid = false;
            showError(messageField, messageError, 'Message must be at least 10 characters');
        }
        
        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }
    });
    
    // Live validation on input
    if (nameField) {
        nameField.addEventListener('input', function() {
            if (this.value.trim().length >= 2) {
                resetFieldError(this, nameError);
            }
        });
    }
    
    if (emailField) {
        emailField.addEventListener('input', function() {
            if (isValidEmail(this.value.trim())) {
                resetFieldError(this, emailError);
            }
        });
    }
    
    if (phoneField) {
        phoneField.addEventListener('input', function() {
            if (!this.value.trim() || isValidPhone(this.value.trim())) {
                resetFieldError(this);
            }
        });
    }
    
    if (messageField) {
        messageField.addEventListener('input', function() {
            if (this.value.trim().length >= 10) {
                resetFieldError(this, messageError);
            }
        });
    }
}

/**
 * Initialize Login Form Validation
 */
function initLoginFormValidation() {
    const loginForm = document.getElementById('loginForm');
    
    if (!loginForm) return;
    
    // Form fields
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    
    // Error elements
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    // Form submission
    loginForm.addEventListener('submit', function(event) {
        let isValid = true;
        
        // Reset errors
        resetErrors();
        
        // Validate email
        if (!emailField.value.trim()) {
            isValid = false;
            showError(emailField, emailError, 'Please enter your email address');
        } else if (!isValidEmail(emailField.value.trim())) {
            isValid = false;
            showError(emailField, emailError, 'Please enter a valid email address');
        }
        
        // Validate password
        if (!passwordField.value) {
            isValid = false;
            showError(passwordField, passwordError, 'Please enter your password');
        }
        
        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }
    });
    
    // Live validation on input
    if (emailField) {
        emailField.addEventListener('input', function() {
            if (isValidEmail(this.value.trim())) {
                resetFieldError(this, emailError);
            }
        });
    }
    
    if (passwordField) {
        passwordField.addEventListener('input', function() {
            if (this.value) {
                resetFieldError(this, passwordError);
            }
        });
    }
}

/**
 * Initialize Registration Form Validation
 */
function initRegisterFormValidation() {
    const registerForm = document.getElementById('registerForm');
    
    if (!registerForm) return;
    
    // Form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');
    
    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    // Form submission
    registerForm.addEventListener('submit', function(event) {
        let isValid = true;
        
        // Reset errors
        resetErrors();
        
        // Validate name
        if (!nameField.value.trim()) {
            isValid = false;
            showError(nameField, nameError, 'Please enter your name');
        } else if (nameField.value.trim().length < 2) {
            isValid = false;
            showError(nameField, nameError, 'Name must be at least 2 characters');
        }
        
        // Validate email
        if (!emailField.value.trim()) {
            isValid = false;
            showError(emailField, emailError, 'Please enter your email address');
        } else if (!isValidEmail(emailField.value.trim())) {
            isValid = false;
            showError(emailField, emailError, 'Please enter a valid email address');
        }
        
        // Validate password
        if (!passwordField.value) {
            isValid = false;
            showError(passwordField, passwordError, 'Please enter a password');
        } else if (passwordField.value.length < 8) {
            isValid = false;
            showError(passwordField, passwordError, 'Password must be at least 8 characters');
        } else if (!isStrongPassword(passwordField.value)) {
            isValid = false;
            showError(passwordField, passwordError, 'Password must include uppercase, lowercase, number, and special character');
        }
        
        // Validate confirm password
        if (!confirmPasswordField.value) {
            isValid = false;
            showError(confirmPasswordField, confirmPasswordError, 'Please confirm your password');
        } else if (confirmPasswordField.value !== passwordField.value) {
            isValid = false;
            showError(confirmPasswordField, confirmPasswordError, 'Passwords do not match');
        }
        
        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }
    });
    
    // Live validation
    setupLiveValidation(nameField, nameError, function() {
        return nameField.value.trim().length >= 2;
    });
    
    setupLiveValidation(emailField, emailError, function() {
        return isValidEmail(emailField.value.trim());
    });
    
    setupLiveValidation(passwordField, passwordError, function() {
        return passwordField.value.length >= 8 && isStrongPassword(passwordField.value);
    });
    
    setupLiveValidation(confirmPasswordField, confirmPasswordError, function() {
        return confirmPasswordField.value === passwordField.value;
    });
}

/**
 * Initialize Appointment Form Validation
 */
function initAppointmentFormValidation() {
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (!appointmentForm) return;
    
    // Form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const dateField = document.getElementById('date');
    const timeField = document.getElementById('time');
    const serviceField = document.getElementById('service');
    
    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const dateError = document.getElementById('dateError');
    const timeError = document.getElementById('timeError');
    const serviceError = document.getElementById('serviceError');
    
    // Form submission
    appointmentForm.addEventListener('submit', function(event) {
        let isValid = true;
        
        // Reset errors
        resetErrors();
        
        // Validate name
        if (!nameField.value.trim()) {
            isValid = false;
            showError(nameField, nameError, 'Please enter your name');
        }
        
        // Validate email
        if (!emailField.value.trim()) {
            isValid = false;
            showError(emailField, emailError, 'Please enter your email address');
        } else if (!isValidEmail(emailField.value.trim())) {
            isValid = false;
            showError(emailField, emailError, 'Please enter a valid email address');
        }
        
        // Validate phone
        if (!phoneField.value.trim()) {
            isValid = false;
            showError(phoneField, phoneError, 'Please enter your phone number');
        } else if (!isValidPhone(phoneField.value.trim())) {
            isValid = false;
            showError(phoneField, phoneError, 'Please enter a valid phone number');
        }
        
        // Validate date
        if (!dateField.value) {
            isValid = false;
            showError(dateField, dateError, 'Please select a date');
        } else if (!isValidFutureDate(dateField.value)) {
            isValid = false;
            showError(dateField, dateError, 'Please select a future date');
        }
        
        // Validate time
        if (!timeField.value) {
            isValid = false;
            showError(timeField, timeError, 'Please select a time');
        }
        
        // Validate service
        if (!serviceField.value) {
            isValid = false;
            showError(serviceField, serviceError, 'Please select a service');
        }
        
        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }
    });
    
    // Setup live validation for all fields
    const validationRules = {
        name: () => nameField.value.trim().length > 0,
        email: () => isValidEmail(emailField.value.trim()),
        phone: () => isValidPhone(phoneField.value.trim()),
        date: () => isValidFutureDate(dateField.value),
        time: () => timeField.value.length > 0,
        service: () => serviceField.value.length > 0
    };
    
    // Apply live validation to all fields
    for (const [fieldId, validationFunc] of Object.entries(validationRules)) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        
        if (field) {
            setupLiveValidation(field, errorElement, validationFunc);
        }
    }
}

/* Helper Functions */

/**
 * Show error for a field
 */
function showError(field, errorElement, message) {
    field.classList.add('error');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Reset all error messages
 */
function resetErrors() {
    // Reset field styling
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
    });
    
    // Reset error messages
    const errorMessages = document.querySelectorAll('.form-error');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}

/**
 * Reset error for a specific field
 */
function resetFieldError(field, errorElement) {
    field.classList.remove('error');
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

/**
 * Setup live validation for a field
 */
function setupLiveValidation(field, errorElement, validationFunc) {
    if (!field) return;
    
    field.addEventListener('input', function() {
        if (validationFunc()) {
            resetFieldError(this, errorElement);
        }
    });
    
    field.addEventListener('blur', function() {
        if (this.value && !validationFunc()) {
            this.classList.add('error');
            if (errorElement) {
                errorElement.style.display = 'block';
                
                // Set appropriate error message based on field type
                if (this.id === 'email') {
                    errorElement.textContent = 'Please enter a valid email address';
                } else if (this.id === 'phone') {
                    errorElement.textContent = 'Please enter a valid phone number';
                } else if (this.id === 'password') {
                    errorElement.textContent = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
                } else if (this.id === 'confirmPassword') {
                    errorElement.textContent = 'Passwords do not match';
                } else if (this.id === 'date') {
                    errorElement.textContent = 'Please select a future date';
                }
            }
        }
    });
}

/**
 * Email validation
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * Phone validation
 */
function isValidPhone(phone) {
    // Allow for various formats like (123) 456-7890, 123-456-7890, 123.456.7890, etc.
    const re = /^(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return re.test(phone);
}

/**
 * Password strength validation
 */
function isStrongPassword(password) {
    // Requires at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

/**
 * Future date validation
 */
function isValidFutureDate(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return selectedDate >= today;
}