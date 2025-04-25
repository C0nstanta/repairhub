from flask import Flask, render_template, request, redirect, url_for, flash
from datetime import datetime
import os
from config import company_info, services, maintenance_tips, team_members, bmw_models

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY') or 'bmw-hub-development-key'

@app.route('/')
def index():
    """Render the homepage"""
    return render_template('index.html', 
                          services=services,
                          maintenance_tips=maintenance_tips,
                          company_info=company_info,
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
                          now=datetime.now())

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Render the contact page and handle form submissions"""
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        message = request.form.get('message')
        
        # This would normally process the form data and send an email
        # For now, just redirect with a flash message
        flash('Thank you for your message! We will contact you shortly.', 'success')
        return redirect(url_for('contact'))
    
    return render_template('contact.html', 
                          company_info=company_info,
                          services=services,
                          now=datetime.now())

if __name__ == '__main__':
    app.run(debug=True)