"""
Authentication module for BMW Hub
Handles user authentication, password hashing, and session management
"""

import os
from datetime import datetime, timedelta
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from flask import session, redirect, url_for, request, flash
import uuid
import re

# In a production environment, replace this with a database
users = {}
password_reset_tokens = {}

def login_required(f):
    """Decorator to require login for specific routes"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('Please log in to access this page', 'error')
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    """Decorator to require admin access for specific routes"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('Please log in to access this page', 'error')
            return redirect(url_for('login', next=request.url))
        
        user = get_user_by_id(session['user_id'])
        if not user or user.get('is_admin', False) is not True:
            flash('You do not have permission to access this page', 'error')
            return redirect(url_for('index'))
            
        return f(*args, **kwargs)
    return decorated_function

def register_user(name, email, password, phone='', newsletter=False):
    """Register a new user"""
    # Basic validation
    if not name or not email or not password:
        return False, "All required fields must be filled out"
    
    # Email format validation
    if not is_valid_email(email):
        return False, "Please enter a valid email address"
    
    # Check if email already exists
    if email in users:
        return False, "An account with this email already exists"
    
    # Password strength validation
    if not is_strong_password(password):
        return False, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    
    # Create new user
    users[email] = {
        'id': email,
        'name': name,
        'password': generate_password_hash(password),
        'phone': phone,
        'newsletter': newsletter,
        'is_admin': False,
        'created_at': datetime.now(),
        'last_login': None,
        'appointments': [],
        'service_history': []
    }
    
    return True, "Your account has been created successfully"

def authenticate_user(email, password):
    """Authenticate a user by email and password"""
    if email not in users:
        return False, "Invalid email or password"
    
    user = users[email]
    
    if not check_password_hash(user['password'], password):
        return False, "Invalid email or password"
    
    # Update last login time
    users[email]['last_login'] = datetime.now()
    
    return True, "Login successful"

def update_user_profile(user_id, name=None, phone=None, newsletter=None):
    """Update user profile information"""
    if user_id not in users:
        return False, "User not found"
    
    if name:
        users[user_id]['name'] = name
    
    if phone is not None:
        users[user_id]['phone'] = phone
    
    if newsletter is not None:
        users[user_id]['newsletter'] = newsletter
    
    return True, "Profile updated successfully"

def change_password(user_id, current_password, new_password):
    """Change user password"""
    if user_id not in users:
        return False, "User not found"
    
    user = users[user_id]
    
    # Verify current password
    if not check_password_hash(user['password'], current_password):
        return False, "Current password is incorrect"
    
    # Validate new password strength
    if not is_strong_password(new_password):
        return False, "New password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    
    # Update password
    users[user_id]['password'] = generate_password_hash(new_password)
    
    return True, "Password changed successfully"

def generate_reset_token(email):
    """Generate a password reset token"""
    if email not in users:
        # Don't reveal if email exists or not for security
        return True, "If an account exists with this email, a password reset link will be sent"
    
    # Generate a unique token
    token = str(uuid.uuid4())
    
    # Store token with expiration (24 hours)
    expiration = datetime.now() + timedelta(hours=24)
    password_reset_tokens[token] = {
        'email': email,
        'expires': expiration
    }
    
    # In a real implementation, send email with reset link
    # For now, return the token for demonstration
    return True, token

def reset_password_with_token(token, new_password):
    """Reset password using a reset token"""
    # Check if token exists and is valid
    if token not in password_reset_tokens:
        return False, "Invalid or expired token"
    
    token_data = password_reset_tokens[token]
    
    # Check if token is expired
    if token_data['expires'] < datetime.now():
        # Clean up expired token
        del password_reset_tokens[token]
        return False, "Token has expired"
    
    email = token_data['email']
    
    # Validate new password strength
    if not is_strong_password(new_password):
        return False, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    
    # Update password
    users[email]['password'] = generate_password_hash(new_password)
    
    # Remove used token
    del password_reset_tokens[token]
    
    return True, "Password has been reset successfully"

def get_user_by_id(user_id):
    """Get user by ID (email in this case)"""
    return users.get(user_id)

def get_all_users():
    """Get all users (admin only)"""
    return users

def add_appointment(user_id, appointment_data):
    """Add a new appointment to user's record"""
    if user_id not in users:
        return False, "User not found"
    
    # Generate appointment ID
    appointment_id = str(uuid.uuid4())
    
    # Add timestamp
    appointment_data['created_at'] = datetime.now()
    appointment_data['id'] = appointment_id
    appointment_data['status'] = 'scheduled'
    
    # Add to user's appointments
    users[user_id]['appointments'].append(appointment_data)
    
    return True, appointment_id

def get_user_appointments(user_id):
    """Get all appointments for a user"""
    if user_id not in users:
        return []
    
    return users[user_id]['appointments']

def add_service_record(user_id, service_data):
    """Add a service record to user's history"""
    if user_id not in users:
        return False, "User not found"
    
    # Generate service record ID
    service_id = str(uuid.uuid4())
    
    # Add timestamp
    service_data['completed_at'] = datetime.now()
    service_data['id'] = service_id
    
    # Add to user's service history
    users[user_id]['service_history'].append(service_data)
    
    return True, service_id

def get_user_service_history(user_id):
    """Get service history for a user"""
    if user_id not in users:
        return []
    
    return users[user_id]['service_history']

# Helper functions
def is_valid_email(email):
    """Validate email format"""
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
    return re.match(email_regex, email) is not None

def is_strong_password(password):
    """Check if password meets strength requirements"""
    # At least 8 characters
    if len(password) < 8:
        return False
    
    # Check for uppercase, lowercase, digit, and special character
    has_uppercase = False
    has_lowercase = False
    has_digit = False
    has_special = False
    
    for char in password:
        if char.isupper():
            has_uppercase = True
        elif char.islower():
            has_lowercase = True
        elif char.isdigit():
            has_digit = True
        elif not char.isalnum():
            has_special = True
    
    return has_uppercase and has_lowercase and has_digit and has_special

def init_admin_user():
    """Initialize an admin user if none exists"""
    admin_email = os.environ.get('ADMIN_EMAIL', 'admin@bmwhub.com')
    admin_password = os.environ.get('ADMIN_PASSWORD', 'AdminBMW@123')
    
    if admin_email not in users:
        users[admin_email] = {
            'id': admin_email,
            'name': 'Admin',
            'password': generate_password_hash(admin_password),
            'phone': '',
            'newsletter': False,
            'is_admin': True,
            'created_at': datetime.now(),
            'last_login': None,
            'appointments': [],
            'service_history': []
        }
        
        return True
    
    return False

# Initialize admin user
init_admin_user()

# Sample user for demonstration (remove in production)
if 'user@example.com' not in users:
    users['user@example.com'] = {
        'id': 'user@example.com',
        'name': 'John Smith',
        'password': generate_password_hash('Password@123'),
        'phone': '(713) 555-5678',
        'newsletter': True,
        'is_admin': False,
        'created_at': datetime.now(),
        'last_login': None,
        'appointments': [
            {
                'id': '12345',
                'service_id': 1,
                'date': '2025-05-01',
                'time': '10:00',
                'vehicle': 'BMW 3 Series',
                'status': 'scheduled',
                'created_at': datetime.now()
            }
        ],
        'service_history': [
            {
                'id': '54321',
                'service_id': 2,
                'vehicle': 'BMW 3 Series',
                'description': 'Engine diagnostics and repair',
                'cost': 350.00,
                'completed_at': datetime.now() - timedelta(days=30)
            }
        ]
    }