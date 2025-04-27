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
    ''',
    'social_media': {
        'facebook': 'https://facebook.com/bmwhub',
        'instagram': 'https://instagram.com/bmwhub',
        'twitter': 'https://twitter.com/bmwhub',
        'youtube': 'https://youtube.com/bmwhub'
    },
    'google_maps': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221896.5895080938!2d-95.68952841971793!3d29.816881368351555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX%2C%20USA!5e0!3m2!1sen!2suk!4v1650374272951!5m2!1sen!2suk'
}

# Services data
services = [
    {
        'id': 1,
        'title': 'Scheduled Maintenance',
        'short_desc': 'Keep your BMW in peak condition with our comprehensive maintenance services.',
        'image': 'service-1.jpg',
        'full_desc': 'Our scheduled maintenance follows BMW\'s recommended service intervals to ensure optimal performance and reliability. Our certified technicians use advanced diagnostic equipment and genuine BMW parts to keep your vehicle running at its best. Whether you need an oil change, brake service, or major service interval work, we\'ll ensure your BMW maintains its performance and value.',
        'icon': '<i class="fas fa-tools"></i>',
        'benefits': [
            'Factory-recommended maintenance schedules',
            'Comprehensive multi-point inspections',
            'Genuine or OEM-quality parts',
            'Digital service records',
            'Warranty-compliant service'
        ],
        'faqs': [
            {
                'question': 'How often should I schedule maintenance for my BMW?',
                'answer': 'BMW recommends maintenance every 10,000 miles or 12 months, whichever comes first. However, this may vary based on your specific model, driving habits, and conditions. Your BMW\'s onboard computer will also alert you when service is due.'
            },
            {
                'question': 'Will scheduled maintenance at BMW Hub maintain my warranty?',
                'answer': 'Yes, service at BMW Hub will maintain your factory warranty. Under the Magnuson-Moss Warranty Act, manufacturers cannot void your warranty simply because you had service performed by someone other than the dealer.'
            }
        ]
    },
    {
        'id': 2,
        'title': 'Engine Diagnostics & Repair',
        'short_desc': 'Advanced diagnostics and expert repairs for all BMW engine issues.',
        'image': 'service-2.jpg',
        'full_desc': 'Our state-of-the-art diagnostic equipment can quickly identify issues with your BMW\'s engine. Whether it\'s a check engine light, performance problem, or unusual noise, our skilled technicians can diagnose and repair it efficiently. We specialize in complex BMW engine systems and can address everything from minor tuning issues to major engine repairs and rebuilds.',
        'icon': '<i class="fas fa-car-battery"></i>',
        'benefits': [
            'Advanced BMW-specific diagnostic tools',
            'Certified master technicians',
            'Expertise with all BMW engine types',
            'Transparent diagnosis and pricing',
            'Quality parts and workmanship'
        ],
        'faqs': [
            {
                'question': 'What should I do if my check engine light comes on?',
                'answer': 'If your check engine light illuminates, you should have it diagnosed as soon as possible. While not always an emergency, ignoring it could lead to more serious problems or reduced fuel economy. We offer quick diagnostic appointments to identify the issue.'
            },
            {
                'question': 'Can you address engine problems specific to my BMW model?',
                'answer': 'Yes, our technicians are trained and experienced with all BMW models, from classics to the latest releases. We understand the common engine issues for each series and have the specialized knowledge needed to address model-specific problems.'
            }
        ]
    },
    {
        'id': 3,
        'title': 'Electrical Systems',
        'short_desc': 'Comprehensive electrical system diagnostics and repairs for all BMW models.',
        'image': 'service-3.jpg',
        'full_desc': 'BMW vehicles feature sophisticated electrical systems that require specialized knowledge. Our technicians are trained to diagnose and repair electrical issues, from simple battery problems to complex computer system malfunctions. We can address issues with lighting, sensors, comfort features, navigation, and all electronic components that make your BMW the ultimate driving machine.',
        'icon': '<i class="fas fa-bolt"></i>',
        'benefits': [
            'Specialized BMW electrical diagnostics',
            'Computer system programming and coding',
            'Battery testing and replacement',
            'Module repair and replacement',
            'Wiring and connector repairs'
        ],
        'faqs': [
            {
                'question': 'How do I know if my BMW has an electrical problem?',
                'answer': 'Signs of electrical issues include warning lights on the dashboard, malfunctioning power features, flickering lights, battery problems, or intermittent issues with electronics. Modern BMWs have complex electrical systems, so proper diagnosis is essential.'
            },
            {
                'question': 'Can you program new keys for my BMW?',
                'answer': 'Yes, we can program and code new keys for most BMW models. We have the necessary equipment to sync new keys with your vehicle\'s security system, often at a lower cost than the dealership.'
            }
        ]
    },
    {
        'id': 4,
        'title': 'Transmission Service',
        'short_desc': 'Expert transmission maintenance and repair for smooth, reliable operation.',
        'image': 'service-4.jpg',
        'full_desc': 'Your BMW\'s transmission is crucial for performance and driving comfort. We provide complete transmission services, including fluid changes, filter replacements, and repairs for both automatic and manual transmissions. Our technicians are experienced with BMW\'s unique transmission systems, including the 8-speed automatic, DCT, and SMG transmissions, ensuring proper function and longevity.',
        'icon': '<i class="fas fa-cogs"></i>',
        'benefits': [
            'Specialized knowledge of BMW transmissions',
            'Quality transmission fluids and filters',
            'Computer diagnostics and adaptation',
            'Transmission rebuild capabilities',
            'Proper repair of electronic components'
        ],
        'faqs': [
            {
                'question': 'Does my BMW\'s "lifetime" transmission fluid really never need changing?',
                'answer': 'BMW\'s "lifetime" transmission fluid is designed to last the theoretical lifetime of the transmission, but in practice, regular fluid changes (every 60,000-80,000 miles) will significantly extend your transmission\'s life and maintain optimal performance, especially in high-performance or heavily-driven vehicles.'
            },
            {
                'question': 'How do I know if my BMW has transmission problems?',
                'answer': 'Warning signs include delayed shifting, hard shifts, slipping gears, unusual noises when shifting, vibrations, warning lights, or fluid leaks. Early diagnosis can prevent more serious and costly damage.'
            }
        ]
    },
    {
        'id': 5,
        'title': 'Brake Service & Repair',
        'short_desc': 'Ensure your safety with our comprehensive brake system services.',
        'image': 'service-5.jpg',
        'full_desc': 'Your BMW\'s braking system is critical for safety. We offer complete brake services including pad replacement, rotor resurfacing or replacement, brake fluid flush, and caliper service to ensure optimal stopping power. Our technicians understand the intricacies of BMW brake systems, including the specialized requirements of performance models with carbon ceramic brakes and dynamic braking systems.',
        'icon': '<i class="fas fa-brake-disc"></i>',
        'benefits': [
            'High-quality brake components',
            'Expertise with performance brake systems',
            'Complete system inspection',
            'Proper bleeding and fluid replacement',
            'Brake sensor replacement and coding'
        ],
        'faqs': [
            {
                'question': 'How often should I replace my BMW\'s brake pads?',
                'answer': 'BMW brake pad life varies depending on driving habits and conditions, typically lasting between 30,000-60,000 miles. Most BMW models have brake pad sensors that will alert you when replacement is needed. We recommend regular inspections to catch wear before it impacts performance.'
            },
            {
                'question': 'Why does my BMW need a brake fluid flush?',
                'answer': 'BMW recommends brake fluid replacement every 2 years regardless of mileage. Brake fluid is hygroscopic, meaning it absorbs moisture over time, which lowers its boiling point and can cause brake fade. Regular fluid changes maintain optimal braking performance and prevent system damage.'
            }
        ]
    },
    {
        'id': 6,
        'title': 'Performance Upgrades',
        'short_desc': 'Enhance your BMW\'s performance with our professional upgrade services.',
        'image': 'service-6.jpg',
        'full_desc': 'Want more from your BMW? We offer a range of performance upgrades, from ECU tuning to exhaust system enhancements, suspension upgrades, and more, all professionally installed for optimal results. Our performance packages can enhance power, handling, and the overall driving experience while maintaining reliability. We specialize in upgrades that complement BMW\'s engineering rather than compromise it.',
        'icon': '<i class="fas fa-tachometer-alt"></i>',
        'benefits': [
            'Dyno-tested performance gains',
            'Professional installation',
            'Quality components from top manufacturers',
            'Customized upgrade packages',
            'Preservation of reliability and drivability'
        ],
        'faqs': [
            {
                'question': 'Will performance upgrades affect my warranty?',
                'answer': 'Some modifications may affect certain aspects of your BMW\'s warranty. We can advise on which upgrades are warranty-friendly and which might have implications. In many cases, we can install upgrades that enhance performance while working within warranty limitations.'
            },
            {
                'question': 'What performance upgrades give the best value for money?',
                'answer': 'For most BMWs, an ECU tune typically provides the best performance gain for the investment, often increasing horsepower and torque by 10-15%. Other cost-effective upgrades include high-flow air intakes, performance exhaust systems, and suspension improvements.'
            }
        ]
    }
]

# Maintenance tips data
maintenance_tips = [
    {
        'icon': '<i class="fas fa-oil-can"></i>',
        'title': 'Check Engine Oil',
        'desc': 'We recommend checking your BMW\'s engine oil level at least once a month to ensure optimal engine performance. Low oil levels can cause serious engine damage.'
    },
    {
        'icon': '<i class="fas fa-search"></i>',
        'title': 'Inspect Hoses',
        'desc': 'When checking your hoses, pay attention to signs of wear, cracks, and spots to prevent potential leaks. Deteriorated hoses can cause coolant or fluid leaks.'
    },
    {
        'icon': '<i class="fas fa-wind"></i>',
        'title': 'Replace Air Filter',
        'desc': 'We suggest replacement of the air filter if you do not see light shining through it when held up to a light source. A clogged air filter reduces fuel efficiency and engine performance.'
    },
    {
        'icon': '<i class="fas fa-car"></i>',
        'title': 'Check Tire Pressure',
        'desc': 'We suggest checking tire pressure every week to improve fuel economy and ensure safe handling. BMW models often have specific tire pressure requirements based on load and speed.'
    },
    {
        'icon': '<i class="fas fa-battery-full"></i>',
        'title': 'Battery Maintenance',
        'desc': 'Have your battery tested regularly, especially before extreme temperatures. BMW electrical systems can be demanding on batteries, reducing their typical lifespan.'
    },
    {
        'icon': '<i class="fas fa-shower"></i>',
        'title': 'Regular Washing',
        'desc': 'Regular washing and waxing protect your BMW\'s finish from environmental damage and maintains its appearance. Pay special attention to wheel wells and undercarriage, especially in winter.'
    }
]

# Team members data
team_members = [
    {
        'name': 'David Miller',
        'title': 'Owner & Master Technician',
        'bio': 'With over 20 years of BMW experience and factory training, David leads our technical team and oversees all complex diagnostic challenges. His passion for BMWs began as a teenager and led to a career at BMW dealerships before founding BMW Hub.',
        'image': 'david-miller.jpg',
        'specialties': ['Engine Performance', 'Diagnostics', 'Restoration']
    },
    {
        'name': 'Michael Chen',
        'title': 'Service Manager',
        'bio': 'Michael ensures that every customer receives outstanding service. He coordinates all service appointments and keeps projects running smoothly. With a background in customer service and automotive management, Michael bridges the gap between technical expertise and customer satisfaction.',
        'image': 'michael-chen.jpg',
        'specialties': ['Customer Service', 'Service Planning', 'Quality Control']
    },
    {
        'name': 'Sarah Johnson',
        'title': 'Senior BMW Technician',
        'bio': 'A BMW specialist for 15 years, Sarah excels at electrical diagnostics and has particular expertise with modern BMW systems. She holds multiple BMW certifications and regularly attends advanced training to stay current with the latest technology.',
        'image': 'sarah-johnson.jpg',
        'specialties': ['Electrical Systems', 'Computer Diagnostics', 'Programming']
    },
    {
        'name': 'Carlos Rodriguez',
        'title': 'BMW Certified Technician',
        'bio': 'Carlos specializes in performance upgrades and mechanical repairs, bringing 12 years of BMW experience to our team. His attention to detail and commitment to excellence ensure that every BMW he works on performs at its best.',
        'image': 'carlos-rodriguez.jpg',
        'specialties': ['Performance Upgrades', 'Suspension', 'Brakes']
    },
    {
        'name': 'Jennifer White',
        'title': 'Customer Service Specialist',
        'bio': 'Jennifer handles customer communications and ensures a seamless service experience. Her automotive knowledge and communication skills help translate technical information into clear explanations for our customers.',
        'image': 'jennifer-white.jpg',
        'specialties': ['Scheduling', 'Service Advising', 'Client Relations']
    }
]

# BMW models we service
bmw_models = {
    'Sedans & Coupes': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series'],
    'SUVs & Crossovers': ['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7'],
    'Performance Models': ['M2', 'M3', 'M4', 'M5', 'M6', 'M8', 'X3 M', 'X4 M', 'X5 M', 'X6 M'],
    'Electric & Hybrid': ['i3', 'i4', 'i7', 'i8', 'iX', 'iX3', '330e', '530e', '745e', 'X5 xDrive45e'],
    'Classics & Vintage': ['E30', 'E36', 'E46', 'E90', 'E39', 'E60', 'E65', '2002', 'Z3', 'Z8']
}

# Testimonials
testimonials = [
    {
        'name': 'John Davis',
        'vehicle': 'BMW 5 Series',
        'image': 'customer-1.jpg',
        'text': 'BMW Hub has serviced my 5 Series for years, and I\'ve never been disappointed. Their knowledge of BMW systems is impressive, and their pricing is far better than the dealership.',
        'rating': 5
    },
    {
        'name': 'Sarah Johnson',
        'vehicle': 'BMW X5',
        'image': 'customer-2.jpg',
        'text': 'The team at BMW Hub diagnosed and fixed an electrical issue that had stumped two other shops. They\'re now my go-to for everything on my X5. Highly recommended!',
        'rating': 5
    },
    {
        'name': 'Michael Chen',
        'vehicle': 'BMW 3 Series',
        'image': 'customer-3.jpg',
        'text': 'After getting tired of dealership prices, I tried BMW Hub for my 3 Series maintenance. The service was excellent, they explained everything clearly, and I saved nearly 40% compared to the dealership.',
        'rating': 5
    },
    {
        'name': 'Emily Rodriguez',
        'vehicle': 'BMW M4',
        'image': 'customer-4.jpg',
        'text': 'As the owner of a modified M4, I was nervous about finding a shop that understood performance BMWs. BMW Hub not only maintained my car perfectly but also made great recommendations for future upgrades.',
        'rating': 5
    },
    {
        'name': 'Robert Wilson',
        'vehicle': 'BMW 7 Series',
        'image': 'customer-5.jpg',
        'text': 'I appreciate the attention to detail that BMW Hub provides. They treat my 7 Series with the care it deserves, and their knowledge of luxury features is impressive. The loaner car service is also a great touch.',
        'rating': 4
    }
]

# Available appointment time slots
appointment_slots = {
    'weekdays': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
    'saturday': ['09:00', '10:00', '11:00', '12:00', '13:00']
}

# Service duration estimates (in hours)
service_duration = {
    1: 2,  # Scheduled Maintenance: ~2 hours
    2: 3,  # Engine Diagnostics & Repair: ~3 hours
    3: 2,  # Electrical Systems: ~2 hours
    4: 4,  # Transmission Service: ~4 hours
    5: 2,  # Brake Service & Repair: ~2 hours
    6: 4,  # Performance Upgrades: ~4 hours
    'other': 3  # Default for other services: ~3 hours
}

# FAQ categories
faq_categories = [
    {
        'name': 'General',
        'icon': '<i class="fas fa-question-circle"></i>',
        'faqs': [
            {
                'question': 'Do you work on all BMW models?',
                'answer': 'Yes, we service all BMW models from classics to the latest releases, including M Performance models, SUVs, electric/hybrid vehicles, and motorcycles.'
            },
            {
                'question': 'How do your prices compare to the dealership?',
                'answer': 'Our prices are typically 30-40% lower than dealership rates while maintaining the same level of expertise and using OEM or equivalent quality parts.'
            },
            {
                'question': 'Do you offer a warranty on your work?',
                'answer': 'Yes, we provide a 24-month/24,000-mile warranty on parts and a 12-month warranty on labor for most services.'
            },
            {
                'question': 'Do I need an appointment?',
                'answer': 'While we can sometimes accommodate walk-ins for minor services, we strongly recommend scheduling an appointment to ensure prompt service and proper allocation of time for your specific needs.'
            }
        ]
    },
    {
        'name': 'Services',
        'icon': '<i class="fas fa-tools"></i>',
        'faqs': [
            {
                'question': 'Can you handle BMW software updates?',
                'answer': 'Yes, we have the latest BMW diagnostic and programming equipment to perform software updates on all modules and systems.'
            },
            {
                'question': 'Do you offer loaner vehicles?',
                'answer': 'Yes, we offer loaner vehicles for services that require your car to remain at our shop for more than a day. These should be reserved in advance as availability is limited.'
            },
            {
                'question': 'Can you service my BMW while it\'s under warranty?',
                'answer': 'Absolutely. Under the Magnuson-Moss Warranty Act, manufacturers cannot void your warranty just because you had service performed by someone other than the dealer. We can perform all scheduled maintenance while maintaining your warranty.'
            }
        ]
    },
    {
        'name': 'Parts',
        'icon': '<i class="fas fa-cog"></i>',
        'faqs': [
            {
                'question': 'Do you use genuine BMW parts?',
                'answer': 'We offer both genuine BMW parts and high-quality OEM parts depending on your preference and needs. We will discuss options and price differences before performing any repairs.'
            },
            {
                'question': 'Can I bring my own parts?',
                'answer': 'While we can install customer-provided parts in some cases, we cannot offer our standard warranty on these parts. We strongly recommend using our sourced parts to ensure quality and proper fitment.'
            }
        ]
    },
    {
        'name': 'Payment',
        'icon': '<i class="fas fa-credit-card"></i>',
        'faqs': [
            {
                'question': 'What payment methods do you accept?',
                'answer': 'We accept all major credit and debit cards, cash, checks, and offer financing options through Synchrony Car Care for larger services.'
            },
            {
                'question': 'Do you offer any discounts?',
                'answer': 'We offer discounts for military personnel, first responders, and senior citizens. We also have seasonal service specials and a referral program.'
            }
        ]
    }
]