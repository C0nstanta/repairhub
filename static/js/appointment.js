/**
 * BMW Hub Appointment Scheduler
 * Handles appointment scheduling functionality
 */

/**
 * Initialize Appointment Scheduler
 */
function initAppointmentScheduler() {
    // Get elements
    const form = document.getElementById('appointmentForm');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.appointment-steps .step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const submitButton = document.querySelector('.submit-btn');
    
    // Service selection
    const serviceOptions = document.querySelectorAll('input[name="service"]');
    const otherServiceGroup = document.querySelector('.other-service-group');
    
    // Initialize calendar
    initCalendar();
    
    // Initialize time slots
    initTimeSlots();
    
    // Handle service option change
    serviceOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'other') {
                otherServiceGroup.style.display = 'block';
            } else {
                otherServiceGroup.style.display = 'none';
            }
        });
    });
    
    // Handle next button clicks
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const currentStepNumber = parseInt(currentStep.dataset.step);
            
            if (validateStep(currentStepNumber)) {
                const nextStep = document.querySelector(`.form-step[data-step="${currentStepNumber + 1}"]`);
                
                if (nextStep) {
                    // Update steps
                    currentStep.classList.remove('active');
                    nextStep.classList.add('active');
                    
                    // Update step indicators
                    updateStepIndicators(currentStepNumber + 1);
                    
                    // If moving to step 4 (confirmation), update summary
                    if (currentStepNumber + 1 === 4) {
                        updateSummary();
                    }
                    
                    // Scroll to top of form
                    form.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Handle previous button clicks
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const currentStepNumber = parseInt(currentStep.dataset.step);
            const prevStep = document.querySelector(`.form-step[data-step="${currentStepNumber - 1}"]`);
            
            if (prevStep) {
                // Update steps
                currentStep.classList.remove('active');
                prevStep.classList.add('active');
                
                // Update step indicators
                updateStepIndicators(currentStepNumber - 1);
                
                // Scroll to top of form
                form.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Handle step indicator clicks
    stepIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const targetStepNumber = parseInt(this.dataset.step);
            const currentStepNumber = getCurrentStep();
            
            // Can only go to previous steps or current step
            if (targetStepNumber <= currentStepNumber) {
                // Update steps
                document.querySelector(`.form-step.active`).classList.remove('active');
                document.querySelector(`.form-step[data-step="${targetStepNumber}"]`).classList.add('active');
                
                // Update step indicators
                updateStepIndicators(targetStepNumber);
                
                // Scroll to top of form
                form.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(event) {
            // Validate final step
            if (!validateStep(4)) {
                event.preventDefault();
            }
        });
    }
}

/**
 * Get current active step number
 */
function getCurrentStep() {
    const activeStep = document.querySelector('.form-step.active');
    return activeStep ? parseInt(activeStep.dataset.step) : 1;
}

/**
 * Update step indicators
 */
function updateStepIndicators(activeStep) {
    const stepIndicators = document.querySelectorAll('.appointment-steps .step');
    
    stepIndicators.forEach(step => {
        const stepNumber = parseInt(step.dataset.step);
        
        if (stepNumber < activeStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNumber === activeStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active');
            step.classList.remove('completed');
        }
    });
}

/**
 * Validate current step
 */
function validateStep(stepNumber) {
    // Reset errors
    resetErrors();
    
    let isValid = true;
    
    switch (stepNumber) {
        case 1:
            // Validate service selection
            const selectedService = document.querySelector('input[name="service"]:checked');
            
            if (!selectedService) {
                isValid = false;
                // Show error message
                const serviceError = document.createElement('div');
                serviceError.className = 'alert alert-error';
                serviceError.textContent = 'Please select a service';
                
                const serviceOptions = document.querySelector('.service-options');
                serviceOptions.parentNode.insertBefore(serviceError, serviceOptions);
            } else if (selectedService.value === 'other') {
                const otherServiceDesc = document.getElementById('other_service_desc');
                
                if (!otherServiceDesc.value.trim()) {
                    isValid = false;
                    showError(otherServiceDesc, null, 'Please describe the service you need');
                }
            }
            break;
            
        case 2:
            // Validate date and time
            const dateField = document.getElementById('date');
            const timeField = document.getElementById('time');
            const dateError = document.getElementById('dateError');
            const timeError = document.getElementById('timeError');
            
            if (!dateField.value) {
                isValid = false;
                showError(dateField, dateError, 'Please select a date');
            } else if (!isValidFutureDate(dateField.value)) {
                isValid = false;
                showError(dateField, dateError, 'Please select a future date');
            }
            
            if (!timeField.value) {
                isValid = false;
                showError(timeField, timeError, 'Please select a time');
            }
            break;
            
        case 3:
            // Validate contact information
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const phoneField = document.getElementById('phone');
            const bmwModelField = document.getElementById('bmw_model');
            
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const phoneError = document.getElementById('phoneError');
            const bmwModelError = document.getElementById('bmwModelError');
            
            if (!nameField.value.trim()) {
                isValid = false;
                showError(nameField, nameError, 'Please enter your name');
            }
            
            if (!emailField.value.trim()) {
                isValid = false;
                showError(emailField, emailError, 'Please enter your email address');
            } else if (!isValidEmail(emailField.value.trim())) {
                isValid = false;
                showError(emailField, emailError, 'Please enter a valid email address');
            }
            
            if (!phoneField.value.trim()) {
                isValid = false;
                showError(phoneField, phoneError, 'Please enter your phone number');
            } else if (!isValidPhone(phoneField.value.trim())) {
                isValid = false;
                showError(phoneField, phoneError, 'Please enter a valid phone number');
            }
            
            if (!bmwModelField.value) {
                isValid = false;
                showError(bmwModelField, bmwModelError, 'Please select your BMW model');
            }
            break;
            
        case 4:
            // Validate terms agreement
            const termsCheckbox = document.getElementById('terms');
            const termsError = document.getElementById('termsError');
            
            if (!termsCheckbox.checked) {
                isValid = false;
                showError(termsCheckbox, termsError, 'You must agree to the Terms & Conditions');
            }
            break;
    }
    
    return isValid;
}

/**
 * Update appointment summary
 */
function updateSummary() {
    // Service summary
    const selectedService = document.querySelector('input[name="service"]:checked');
    const serviceTextElement = document.getElementById('summary-service');
    
    if (selectedService) {
        if (selectedService.value === 'other') {
            const otherServiceDesc = document.getElementById('other_service_desc').value;
            serviceTextElement.textContent = `Other Service: ${otherServiceDesc}`;
        } else {
            const serviceLabel = selectedService.nextElementSibling;
            const serviceTitle = serviceLabel.querySelector('h3').textContent;
            serviceTextElement.textContent = serviceTitle;
        }
    }
    
    // Date & Time summary
    const dateField = document.getElementById('date');
    const timeField = document.getElementById('time');
    const dateTimeElement = document.getElementById('summary-date-time');
    
    if (dateField.value && timeField.value) {
        const formattedDate = new Date(dateField.value).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const timeOption = timeField.options[timeField.selectedIndex];
        dateTimeElement.textContent = `${formattedDate} at ${timeOption.text}`;
    }
    
    // Contact information summary
    document.getElementById('summary-name').textContent = document.getElementById('name').value;
    document.getElementById('summary-email').textContent = document.getElementById('email').value;
    document.getElementById('summary-phone').textContent = document.getElementById('phone').value;
    
    const bmwModelField = document.getElementById('bmw_model');
    if (bmwModelField.value) {
        const bmwModelOption = bmwModelField.options[bmwModelField.selectedIndex];
        document.getElementById('summary-vehicle').textContent = `BMW ${bmwModelOption.text}`;
    }
    
    // Additional information summary
    const messageElement = document.getElementById('summary-message');
    const messageField = document.getElementById('message');
    
    if (messageField.value.trim()) {
        messageElement.textContent = messageField.value;
    } else {
        messageElement.textContent = 'No additional information provided.';
    }
}

/**
 * Initialize Calendar
 */
function initCalendar() {
    const dateField = document.getElementById('date');
    const calendarContainer = document.querySelector('.calendar-view');
    
    if (!dateField || !calendarContainer) return;
    
    const currentMonthElement = document.querySelector('.current-month');
    const daysContainer = document.querySelector('.days');
    const prevMonthButton = document.querySelector('.prev-month');
    const nextMonthButton = document.querySelector('.next-month');
    
    let currentDate = new Date();
    let selectedDate = null;
    
    // Initialize calendar
    renderCalendar(currentDate);
    
    // Next month button
    nextMonthButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
    
    // Previous month button
    prevMonthButton.addEventListener('click', function() {
        // Can't go to past months
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setDate(1);
        
        if (currentDate.getFullYear() > today.getFullYear() || 
            (currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() > today.getMonth())) {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        }
    });
    
    // Sync date input with calendar
    dateField.addEventListener('change', function() {
        if (this.value) {
            selectedDate = new Date(this.value);
            currentDate = new Date(selectedDate);
            renderCalendar(currentDate);
        }
    });
    
    /**
     * Render calendar
     */
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Update month/year display
        currentMonthElement.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        // Clear previous days
        daysContainer.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Get today's date for highlighting
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Previous month days
        for (let i = 0; i < firstDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('inactive');
            daysContainer.appendChild(dayElement);
        }
        
        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            
            const currentDay = new Date(year, month, i);
            currentDay.setHours(0, 0, 0, 0);
            
            // Check if day is in the past
            if (currentDay < today) {
                dayElement.classList.add('inactive');
            } else {
                // Check if day is today
                if (currentDay.getTime() === today.getTime()) {
                    dayElement.classList.add('today');
                }
                
                // Check if day is selected
                if (selectedDate && currentDay.getTime() === selectedDate.getTime()) {
                    dayElement.classList.add('selected');
                }
                
                // Add click event
                dayElement.addEventListener('click', function() {
                    // Update selected date
                    selectedDate = new Date(year, month, i);
                    
                    // Update date input
                    dateField.value = selectedDate.toISOString().split('T')[0];
                    
                    // Update calendar UI
                    const selectedDay = document.querySelector('.days div.selected');
                    if (selectedDay) {
                        selectedDay.classList.remove('selected');
                    }
                    this.classList.add('selected');
                    
                    // Trigger date input change event
                    const event = new Event('change', { bubbles: true });
                    dateField.dispatchEvent(event);
                });
            }
            
            daysContainer.appendChild(dayElement);
        }
    }
}

/**
 * Initialize Time Slots
 */
function initTimeSlots() {
    const timeField = document.getElementById('time');
    const timeSlots = document.querySelectorAll('.time-slot');
    
    if (!timeField || !timeSlots.length) return;
    
    // Sync time input with time slots
    timeField.addEventListener('change', function() {
        const selectedValue = this.value;
        
        timeSlots.forEach(slot => {
            slot.classList.remove('selected');
            
            if (slot.dataset.time === selectedValue) {
                slot.classList.add('selected');
            }
        });
    });
    
    // Time slot click events
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            if (!this.classList.contains('unavailable')) {
                const timeValue = this.dataset.time;
                
                // Update time select
                timeField.value = timeValue;
                
                // Update UI
                timeSlots.forEach(s => s.classList.remove('selected'));
                this.classList.add('selected');
                
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                timeField.dispatchEvent(event);
            }
        });
    });
    
    // Mark some slots as unavailable (for demonstration)
    const unavailableSlots = [
        Math.floor(Math.random() * timeSlots.length),
        Math.floor(Math.random() * timeSlots.length)
    ];
    
    unavailableSlots.forEach(index => {
        if (timeSlots[index]) {
            timeSlots[index].classList.add('unavailable');
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
 * Future date validation
 */
function isValidFutureDate(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return selectedDate >= today;
}

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
    
    // Remove any alert messages
    const alertMessages = document.querySelectorAll('.alert');
    alertMessages.forEach(alert => {
        alert.remove();
    });
}