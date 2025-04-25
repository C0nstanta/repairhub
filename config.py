"""
Configuration and data for BMW Hub website
"""

# Company information
company_info = {
    'name': 'BMW Hub',
    'tagline': 'Expert BMW Repair & Maintenance Services in Houston, TX',
    'address': '123 Auto Center Drive, Houston, TX 77001',
    'phone': '(713) 555-1234',
    'email': 'service@bmwhub.com',
    'hours': {
        'Monday-Friday': '8:00 AM - 6:00 PM',
        'Saturday': '9:00 AM - 3:00 PM',
        'Sunday': 'Closed'
    },
    'year_founded': 2010,
    'about_short': 'BMW Hub is Houston\'s premier BMW repair and maintenance specialist, providing dealership-quality service at affordable prices for over 15 years.',
    'about_long': '''
    Founded in 2010, BMW Hub began with a simple mission: to provide Houston BMW owners with dealership-quality service at more affordable prices. 
    
    Our founder, a former BMW dealership master technician with over 15 years of experience, noticed that many BMW owners were looking for more personalized service options without the premium dealership prices.
    
    What started as a small two-bay garage has grown into Houston's most trusted independent BMW service center, serving thousands of satisfied customers and maintaining a sterling reputation for quality and honesty.
    
    Despite our growth, we've remained true to our founding principles of technical excellence, personalized service, and fair pricing.
    '''
}

# Services data
services = [
    {
        'id': 1,
        'title': 'Scheduled Maintenance',
        'short_desc': 'Keep your BMW in peak condition with our comprehensive maintenance services.',
        'image': 'service-1.jpg',
        'full_desc': 'Our scheduled maintenance follows BMW\'s recommended service intervals to ensure optimal performance and reliability. Our certified technicians use advanced diagnostic equipment and genuine BMW parts to keep your vehicle running at its best.',
        'icon': '🔧'
    },
    {
        'id': 2,
        'title': 'Engine Diagnostics & Repair',
        'short_desc': 'Advanced diagnostics and expert repairs for all BMW engine issues.',
        'image': 'service-2.jpg',
        'full_desc': 'Our state-of-the-art diagnostic equipment can quickly identify issues with your BMW\'s engine. Whether it\'s a check engine light, performance problem, or unusual noise, our skilled technicians can diagnose and repair it efficiently.',
        'icon': '🚗'
    },
    {
        'id': 3,
        'title': 'Electrical Systems',
        'short_desc': 'Comprehensive electrical system diagnostics and repairs for all BMW models.',
        'image': 'service-3.jpg',
        'full_desc': 'BMW vehicles feature sophisticated electrical systems that require specialized knowledge. Our technicians are trained to diagnose and repair electrical issues, from simple battery problems to complex computer system malfunctions.',
        'icon': '⚡'
    },
    {
        'id': 4,
        'title': 'Transmission Service',
        'short_desc': 'Expert transmission maintenance and repair for smooth, reliable operation.',
        'image': 'service-4.jpg',
        'full_desc': 'Your BMW\'s transmission is crucial for performance and driving comfort. We provide complete transmission services, including fluid changes, filter replacements, and repairs for both automatic and manual transmissions.',
        'icon': '⚙️'
    },
    {
        'id': 5,
        'title': 'Brake Service & Repair',
        'short_desc': 'Ensure your safety with our comprehensive brake system services.',
        'image': 'service-5.jpg',
        'full_desc': 'Your BMW\'s braking system is critical for safety. We offer complete brake services including pad replacement, rotor resurfacing or replacement, brake fluid flush, and caliper service to ensure optimal stopping power.',
        'icon': '🛑'
    },
    {
        'id': 6,
        'title': 'Performance Upgrades',
        'short_desc': 'Enhance your BMW\'s performance with our professional upgrade services.',
        'image': 'service-6.jpg',
        'full_desc': 'Want more from your BMW? We offer a range of performance upgrades, from ECU tuning to exhaust system enhancements, suspension upgrades, and more, all professionally installed for optimal results.',
        'icon': '🏁'
    }
]

# Maintenance tips data
maintenance_tips = [
    {
        'icon': '🛢️',
        'title': 'Check Engine Oil',
        'desc': 'We recommend checking your BMW\'s engine oil level at least once a month to ensure optimal engine performance.'
    },
    {
        'icon': '🔍',
        'title': 'Inspect Hoses',
        'desc': 'When checking your hoses, pay attention to signs of wear, cracks, and spots to prevent potential leaks.'
    },
    {
        'icon': '💨',
        'title': 'Replace Air Filter',
        'desc': 'We suggest replacement of the air filter if you do not see light shining through it when held up to a light source.'
    },
    {
        'icon': '🚗',
        'title': 'Check Tire Pressure',
        'desc': 'We suggest checking tire pressure every week to improve fuel economy and ensure safe handling.'
    }
]

# Team members data
team_members = [
    {
        'name': 'David Miller',
        'title': 'Owner & Master Technician',
        'bio': 'With over 20 years of BMW experience and factory training, David leads our technical team and oversees all complex diagnostic challenges.',
        'image': 'team-1.jpg'
    },
    {
        'name': 'Michael Chen',
        'title': 'Service Manager',
        'bio': 'Michael ensures that every customer receives outstanding service. He coordinates all service appointments and keeps projects running smoothly.',
        'image': 'team-2.jpg'
    },
    {
        'name': 'Sarah Johnson',
        'title': 'Senior BMW Technician',
        'bio': 'A BMW specialist for 15 years, Sarah excels at electrical diagnostics and has particular expertise with modern BMW systems.',
        'image': 'team-3.jpg'
    },
    {
        'name': 'Carlos Rodriguez',
        'title': 'BMW Certified Technician',
        'bio': 'Carlos specializes in performance upgrades and mechanical repairs, bringing 12 years of BMW experience to our team.',
        'image': 'team-4.jpg'
    }
]

# BMW models we service
bmw_models = {
    'Sedans & Coupes': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series'],
    'SUVs & Crossovers': ['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7'],
    'Performance & Specialty': ['M Series', 'Z Series', 'i Series', 'Hybrids']
}