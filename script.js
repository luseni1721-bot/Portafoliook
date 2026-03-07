document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');

    // Sticky Navbar on Scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopBtn.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.classList.remove('show');
        }

        // Active Link Highlighting based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check for scroll position on page load
    handleScroll();

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            mobileMenuBtn.style.color = "var(--dark-color)"; // For visibility on white mobile menu
            mobileMenuBtn.style.zIndex = "1001";
            mobileMenuBtn.style.position = "relative";
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            // Reset color based on scrolled state
            if (!navbar.classList.contains('scrolled')) {
                mobileMenuBtn.style.color = "var(--white-color)";
            }
        }
    });

    // Close Mobile Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            if (!navbar.classList.contains('scrolled')) {
                mobileMenuBtn.style.color = "var(--white-color)";
            }
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset calculation (navbar height)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Intersection Observer for Scroll Animations
    // Triggers "fade up" animation when elements enter the viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all hidden sections
    document.querySelectorAll('.section-hidden').forEach(section => {
        sectionObserver.observe(section);
    });
});
