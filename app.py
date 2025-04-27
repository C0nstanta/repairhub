from flask import Flask, render_template, request, redirect, url_for, flash, session
from datetime import datetime
import os
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from config import company_info, services, maintenance_tips, team_members, bmw_models

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY') or 'bmw-hub-development-key'

# Mock user database (replace with real database in production)
users = {}

# Authentication decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('Please log in to access this page', 'error')
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    """Render the homepage"""
    return render_template('index.html', 
                          services=services,
                          maintenance_tips=maintenance_tips,
                          company_info=company_info,
                          bmw_models=bmw_models,
                          now=datetime.now())

@app.route('/services')
def services_page():
    """Render the services overview page"""
    return render_template('services.html', 
                          services=services,
                          company_info=company_info,
                          bmw_models=bmw_models,
                          now=datetime.now())

@app.route('/service/<int:service_id>')
def service_detail(service_id):
    """Render the service detail page"""
    service = next((s for s in services if s['id'] == service_id), None)
    if service:
        return render_template('service-detail.html', 
                              service=service,
                              company_info=company_info,
                              services=services,
                              now=datetime.now())
    return redirect(url_for('services_page'))

@app.route('/about')
def about():
    """Render the about page"""
    return render_template('about.html', 
                          company_info=company_info,
                          team_members=team_members,
                          services=services,
                          now=datetime.now())

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Render the contact page and handle form submissions"""
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        bmw_model = request.form.get('bmw_model')
        service_id = request.form.get('service')
        message = request.form.get('message')
        newsletter = request.form.get('newsletter') == '1'
        
        # In a real implementation, you would:
        # 1. Validate form data
        # 2. Store in database
        # 3. Send notification email
        # 4. Add to CRM if applicable
        
        # For demonstration, just flash a success message
        flash('Thank you for your message! We will contact you shortly.', 'success')
        return redirect(url_for('contact'))
    
    return render_template('contact.html', 
                          company_info=company_info,
                          services=services,
                          bmw_models=bmw_models,
                          now=datetime.now())

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Handle user login"""
    if 'user_id' in session:
        return redirect(url_for('account'))
        
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        if email in users and check_password_hash(users[email]['password'], password):
            session['user_id'] = email
            session['user_name'] = users[email]['name']
            
            next_page = request.args.get('next')
            if next_page and next_page.startswith('/'):
                return redirect(next_page)
                
            flash('You have been logged in successfully', 'success')
            return redirect(url_for('account'))
        else:
            flash('Invalid email or password. Please try again.', 'error')
    
    return render_template('login.html',
                          company_info=company_info,
                          services=services,
                          now=datetime.now())

@app.route('/register', methods=['GET', 'POST'])
def register():
    """Handle user registration"""
    if 'user_id' in session:
        return redirect(url_for('account'))
        
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        phone = request.form.get('phone', '')
        newsletter = request.form.get('newsletter') == '1'
        terms = request.form.get('terms') == '1'
        
        # Validate form data
        if not name or not email or not password or not terms:
            flash('Please fill out all required fields', 'error')
            return redirect(url_for('register'))
            
        if email in users:
            flash('An account with this email already exists', 'error')
            return redirect(url_for('register'))
            
        # Create new user
        users[email] = {
            'name': name,
            'password': generate_password_hash(password),
            'phone': phone,
            'newsletter': newsletter,
            'created_at': datetime.now()
        }
        
        # Log user in
        session['user_id'] = email
        session['user_name'] = name
        
        flash('Your account has been created successfully', 'success')
        return redirect(url_for('account'))
    
    return render_template('register.html',
                          company_info=company_info,
                          services=services,
                          now=datetime.now())

@app.route('/logout')
def logout():
    """Handle user logout"""
    session.pop('user_id', None)
    session.pop('user_name', None)
    flash('You have been logged out successfully', 'success')
    return redirect(url_for('index'))

@app.route('/account')
@login_required
def account():
    """User account dashboard"""
    user_id = session['user_id']
    user = users.get(user_id)
    
    if not user:
        session.pop('user_id', None)
        session.pop('user_name', None)
        flash('User not found', 'error')
        return redirect(url_for('login'))
    
    return render_template('account.html',
                          user=user,
                          company_info=company_info,
                          services=services,
                          now=datetime.now())

@app.route('/account/profile', methods=['GET', 'POST'])
@login_required
def account_profile():
    """User profile settings"""
    user_id = session['user_id']
    user = users.get(user_id)
    
    if request.method == 'POST':
        name = request.form.get('name')
        phone = request.form.get('phone', '')
        newsletter = request.form.get('newsletter') == '1'
        
        # Update user data
        if name:
            users[user_id]['name'] = name
            session['user_name'] = name
        
        users[user_id]['phone'] = phone
        users[user_id]['newsletter'] = newsletter
        
        flash('Your profile has been updated successfully', 'success')
        return redirect(url_for('account_profile'))
    
    return render_template('account_profile.html',
                          user=user,
                          company_info=company_info,
                          services=services,
                          now=datetime.now())

@app.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    """Password recovery"""
    if request.method == 'POST':
        email = request.form.get('email')
        
        if email in users:
            # In a real implementation, send a password reset email
            flash('If an account exists with this email, a password reset link will be sent.', 'success')
        else:
            # Use same message to avoid revealing if email exists
            flash('If an account exists with this email, a password reset link will be sent.', 'success')
            
        return redirect(url_for('login'))
    
    return render_template('forgot_password.html',
                          company_info=company_info,
                          services=services,
                          now=datetime.now())

@app.route('/appointment', methods=['GET', 'POST'])
def appointment():
    """Appointment scheduling"""
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        bmw_model = request.form.get('bmw_model')
        service_id = request.form.get('service')
        date = request.form.get('date')
        time = request.form.get('time')
        message = request.form.get('message', '')
        
        # In a real implementation, you would:
        # 1. Validate form data
        # 2. Check appointment availability
        # 3. Store in database
        # 4. Send confirmation email
        
        flash('Your appointment has been scheduled successfully. We will confirm shortly.', 'success')
        return redirect(url_for('appointment'))
    
    return render_template('appointment.html',
                          company_info=company_info,
                          services=services,
                          bmw_models=bmw_models,
                          now=datetime.now())

@app.errorhandler(404)
def page_not_found(e):
    """Handle 404 errors"""
    return render_template('404.html', 
                          company_info=company_info,
                          services=services,
                          now=datetime.now()), 404

@app.errorhandler(500)
def server_error(e):
    """Handle 500 errors"""
    return render_template('500.html', 
                          company_info=company_info,
                          services=services,
                          now=datetime.now()), 500

if __name__ == '__main__':
    app.run(debug=True)