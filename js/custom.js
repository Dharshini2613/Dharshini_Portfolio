/**
 * Gopika Sekar Portfolio - Custom JavaScript
 * Responsive Navbar with Smooth Scroll and Active Link Highlighting
 */

(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkElements = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavbar();
        initializeSmoothScroll();
        initializeActiveLinkHighlighting();
        initializeScrollEffects();
        initializeAnimations();
        initializeThemeToggle();
        loadSavedTheme();
    });

    // Initialize Navbar Functionality
    function initializeNavbar() {
        // Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbar.contains(event.target);
            const isMobileMenuOpen = navLinks.classList.contains('active');
            
            if (!isClickInsideNav && isMobileMenuOpen) {
                closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }

    // Toggle Mobile Menu
    function toggleMobileMenu() {
        const isActive = navLinks.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // Open Mobile Menu
    function openMobileMenu() {
        navLinks.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close Mobile Menu
    function closeMobileMenu() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }

    // Initialize Smooth Scrolling
    function initializeSmoothScroll() {
        navLinkElements.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    closeMobileMenu();
                    
                    // Smooth scroll to section
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active link after scroll completes
                    setTimeout(() => {
                        updateActiveLink(targetId);
                    }, 100);
                }
            });
        });

        // Handle logo click to go to home
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.addEventListener('click', function() {
                const homeSection = document.getElementById('home');
                if (homeSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = homeSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    closeMobileMenu();
                }
            });
        }
    }

    // Initialize Active Link Highlighting
    function initializeActiveLinkHighlighting() {
        let isScrolling = false;
        
        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                window.requestAnimationFrame(function() {
                    updateActiveLinkOnScroll();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
    }

    // Update Active Link on Scroll
    function updateActiveLinkOnScroll() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveLink(sectionId);
            }
        });
    }

    // Update Active Link
    function updateActiveLink(activeSectionId) {
        navLinkElements.forEach(link => {
            link.classList.remove('active');
            
            const linkSection = link.getAttribute('data-section');
            if (linkSection === activeSectionId) {
                link.classList.add('active');
            }
        });
    }

    // Initialize Scroll Effects
    function initializeScrollEffects() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class for navbar styling
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll down/up (optional)
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Initialize Animations
    function initializeAnimations() {
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }

        // Initialize skill bars animation
        initializeSkillBars();
        
        // Initialize back to top button
        initializeBackToTop();
        
        // Initialize contact form
        initializeContactForm();
    }

    // Initialize Skill Bars Animation
    function initializeSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        let skillBarsAnimated = false;

        function animateSkillBars() {
            if (skillBarsAnimated) return;
            
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                const sectionTop = skillsSection.offsetTop;
                const sectionHeight = skillsSection.offsetHeight;
                const scrollPosition = window.scrollY + window.innerHeight;
                
                if (scrollPosition > sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = '0%';
                        
                        setTimeout(() => {
                            bar.style.transition = 'width 1.5s ease-in-out';
                            bar.style.width = width + '%';
                        }, 100);
                    });
                    
                    skillBarsAnimated = true;
                }
            }
        }

        window.addEventListener('scroll', animateSkillBars);
        animateSkillBars(); // Run on load
    }

    // Initialize Back to Top Button
    function initializeBackToTop() {
        const backToTop = document.getElementById('backToTop');
        
        if (backToTop) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            });

            backToTop.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Initialize Contact Form
    function initializeContactForm() {
        const contactForm = document.querySelector('.contact-form form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const formData = new FormData(this);
                const name = this.querySelector('input[placeholder="Your Name"]').value;
                const email = this.querySelector('input[placeholder="Your Email"]').value;
                const message = this.querySelector('textarea[placeholder="Your Message"]').value;
                
                // Basic validation
                if (!name || !email || !message) {
                    showNotification('Please fill in all required fields.', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showNotification('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(function() {
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // Touch event handling for mobile
    function initializeTouchEvents() {
        // Add touch event listeners for better mobile experience
        navLinkElements.forEach(link => {
            link.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            link.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Initialize touch events
    initializeTouchEvents();

    // Add CSS for notifications and animations
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            background: #10b981;
        }
        
        .notification-error {
            background: #ef4444;
        }
        
        .navbar {
            transition: transform 0.3s ease;
        }
        
        .nav-link {
            transition: all 0.3s ease;
        }
        
        .nav-link:active {
            transform: scale(0.95);
        }
        
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #1E90FF 0%, #0ea5e9 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 12px rgba(30, 144, 255, 0.3);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(30, 144, 255, 0.4);
        }
        
        .back-to-top:active {
            transform: translateY(-1px) scale(0.95);
        }
    `;
    document.head.appendChild(style);

    // Expose utility functions globally
    window.PortfolioUtils = {
        scrollTo: function(sectionId, offset = 70) {
            const target = document.getElementById(sectionId);
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        },
        
        updateActiveLink: function(sectionId) {
            updateActiveLink(sectionId);
        },
        
        toggleMobileMenu: function() {
            toggleMobileMenu();
        }
    };

    // Theme Toggle Functionality
    function initializeThemeToggle() {
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'theme-transition-overlay active';
        document.body.appendChild(overlay);
        
        // Apply new theme after a brief delay
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Update icon
            if (themeIcon) {
                themeIcon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            }
            
            // Save theme preference
            localStorage.setItem('theme', newTheme);
            
            // Remove overlay
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }, 150);
    }

    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', theme);
        
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const theme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            if (themeIcon) {
                themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    });

})();