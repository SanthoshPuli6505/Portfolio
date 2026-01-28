document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hide');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000); // Show loading for at least 1 second
    }

    // Initialize EmailJS
    emailjs.init('1jrCvIi3uUNmuExop');

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Function to update navbar background based on scroll and theme
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        
        if (window.scrollY > 50) {
            navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    const savedTheme = currentTheme ? currentTheme : 'dark'; // Default to dark

    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Icon logic:
    // If dark -> Show Sun (to switch to light)
    // If light -> Show Moon (to switch to dark)
    if (savedTheme === 'light') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Initialize navbar background
    updateNavbarBackground();

    themeToggleBtn.addEventListener('click', () => {
        let current = document.documentElement.getAttribute('data-theme');
        let nextTheme = current === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);

        // Update Icon
        if (nextTheme === 'light') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        // Update navbar background immediately after theme change
        updateNavbarBackground();
    });

    // Typing Effect
    const textElement = document.querySelector('.typing-text');
    const texts = ["Learner", "Innovator", "Developer"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        
        textElement.textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // Wait before next word
        } else {
            setTimeout(type, 150);
        }
    })();

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll Reveal Animation
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Add CSS class for hidden sections dynamically if not in CSS
    // But better to verify style.css has it? I'll add the style injection just in case.
    const style = document.createElement('style');
    style.innerHTML = `
        .hidden {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s ease-out;
        }
        .visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        updateNavbarBackground();
    });

    // Also update navbar on theme switch while scrolled?
    // The scroll listener handles it on scroll, but if we toggle while scrolled:
    // We might need to refresh the navbar style in the toggle handler.
    // Enhanced Toggle Handler to fix navbar if scrolled
    /* 
       (Already handled simply by CSS variables usually, but 'navbar' uses inline styles in my scroll logic.
        I should fix that to use classes or CSS variables instead of inline styles for better compliance.)
        
       Let's stick to the current JS for now, it's safer than rewriting the whole logic blindly.
    */
    // Contact Form & EmailJS
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');

    // Skill Progress Animation
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.progress');
                const width = progress.style.width;
                progress.style.width = '0';
                setTimeout(() => {
                    progress.style.width = width;
                }, 200);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // These IDs from the previous steps
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Replace these with your actual Service ID and Template ID
            const serviceID = 'service_3e9on94';
            const templateID = 'template_27i7px6';

            emailjs.send(serviceID, templateID, templateParams)
                .then(function() {
                    // Success
                    // Show Modal
                    successModal.classList.remove('hidden');
                    
                    // Clear Form
                    contactForm.reset();

                    // Hide Modal after 3 seconds
                    setTimeout(() => {
                        successModal.classList.add('hidden');
                    }, 3000);
                }, function(error) {
                    // Error
                    alert("Failed to send message: " + JSON.stringify(error));
                });
        });
    }
});


