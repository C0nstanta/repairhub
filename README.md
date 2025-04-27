# BMW Hub Website

A modern, feature-rich website for BMW Hub automotive service center, featuring:

- Modern responsive design with BMW styling
- Video background hero section
- Enhanced service pages
- User authentication system
- Multi-step appointment scheduling
- Customer dashboard

## Quick Start

1. Clone the repository:
```
git clone https://github.com/your-username/bmw-hub-website.git
cd bmw-hub-website
```

2. Create and activate a virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```
pip install -r requirements.txt
```

4. Run the application:
```
python app.py
```

5. Visit `http://localhost:5000` in your browser.

## Project Structure

```
bmw_hub/
├── app.py                      # Main Flask application
├── config.py                   # Configuration and data
├── auth.py                     # Authentication module
│
├── static/                     # Static files
│   ├── css/                    # CSS stylesheets
│   │   ├── modern.css          # Main stylesheet
│   │   ├── responsive.css      # Responsive styles
│   │   ├── appointment.css     # Appointment page styles
│   │   ├── service-detail.css  # Service detail styles
│   │   ├── account.css         # Account page styles
│   │   └── auth.css            # Authentication styles
│   │
│   ├── js/                     # JavaScript files
│   │   ├── main.js             # Main JavaScript
│   │   ├── video-bg.js         # Video background handler
│   │   ├── appointment.js      # Appointment scheduling
│   │   ├── form-validator.js   # Form validation
│   │   └── testimonials-slider.js # Testimonials carousel
│   │
│   ├── images/                 # Image assets
│   │   ├── logo.png            # BMW Hub logo
│   │   ├── logo-white.png      # White version for footer
│   │   ├── default-avatar.jpg  # Default user avatar
│   │   ├── hero-bg.jpg         # Fallback hero image
│   │   ├── about-workshop.jpg  # Workshop image
│   │   ├── services/           # Service images folder
│   │   ├── testimonials/       # Testimonial images
│   │   └── icons/              # UI icons
│   │
│   └── videos/                 # Video assets
│       └── bmw-hero.mp4        # Hero background video
│
└── templates/                  # HTML templates
    ├── base.html               # Base template
    ├── index.html              # Homepage
    ├── services.html           # Services overview
    ├── service-detail.html     # Individual service page
    ├── about.html              # About page
    ├── contact.html            # Contact page
    ├── appointment.html        # Appointment booking
    ├── 404.html                # Error page
    ├── 500.html                # Server error page
    └── auth/                   # Authentication templates
        ├── login.html          # Login page
        ├── register.html       # Registration page
        ├── forgot_password.html # Password recovery
        └── account.html        # User account page
```

## Features

### Modern Design
- Professional layout with BMW-inspired color scheme
- Responsive design for all device sizes
- Video background on the homepage
- Enhanced typography and UI components

### User Account System
- Secure user registration and login
- Password recovery functionality
- User profile management
- Appointment history tracking

### Services
- Detailed service pages with benefits and FAQs
- Service request forms
- Related services recommendations
- Interactive service process visualization

### Appointment Scheduling
- Multi-step booking process
- Interactive calendar and time selection
- Service selection cards
- Appointment confirmation and tracking

### Testimonials
- Customer testimonial carousel
- Rating display
- Photo integration

## Configuration

Core website content can be modified in `config.py`:
- Company information
- Service descriptions
- Team member profiles
- BMW models list
- FAQs
- Testimonials

## Deployment

For production deployment, set the following environment variables:
- `SECRET_KEY`: A secure random key for session management
- `ADMIN_EMAIL`: Admin user email
- `ADMIN_PASSWORD`: Admin user password

### Deployment Steps
1. Set up a production web server (Nginx, Apache)
2. Use Gunicorn as WSGI server
3. Set up HTTPS with SSL certificate
4. Configure environment variables
5. Replace the mock database with a real database (SQLite, PostgreSQL, etc.)

## Media Requirements

### Video Background
- Format: MP4 with H.264 encoding
- Resolution: 1920x1080 (minimum)
- Duration: 20-30 seconds, looping seamlessly
- File size: <10MB for better loading
- Location: `/static/videos/bmw-hero.mp4`

### Essential Images
- Logo: Both regular and white versions
- Service images: One per service, consistent style
- Team photos: Professional headshots
- Testimonial photos: Customer images or stock photos
- Facility photos: Workshop/garage images

## Customization

### Color Scheme
The default color scheme can be modified in `modern.css`:
- Primary Blue: `#1c69d4` (BMW Blue)
- Secondary Gray: `#333333`
- Light Gray: `#f5f5f5`
- Accent color: `#c62828`

### Typography
The site uses Roboto as the primary font family, which can be changed in the CSS files.

## Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- iOS Safari 13+
- Android Chrome 80+

## License
This project is licensed under the MIT License - see the LICENSE file for details.