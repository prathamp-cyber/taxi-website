// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                // Small delay to allow display:block to apply before animating opacity
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0');
                    mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }, 10);
            } else {
                closeMenu();
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        function closeMenu() {
            isMenuOpen = false;
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                document.body.style.overflow = '';
            }, 300); // Wait for transition
        }
    }

    // 2. Navbar Scroll Effect & Active Link Highlight
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        // Navbar background
        if (window.scrollY > 50) {
            navbar.classList.add('bg-darker/95', 'backdrop-blur-md', 'shadow-lg', 'py-4');
            navbar.classList.remove('bg-transparent', 'py-6');
        } else {
            navbar.classList.add('bg-transparent', 'py-6');
            navbar.classList.remove('bg-darker/95', 'backdrop-blur-md', 'shadow-lg', 'py-4');
        }

        // Active section tracking
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            link.classList.add('text-white');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-white');
                link.classList.add('text-primary');
            }
        });
    });

    // 3. Testimonial Slider
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (track && prevBtn && nextBtn) {
        const slides = track.children;
        let currentIndex = 0;
        const totalSlides = slides.length;

        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
            updateSlider();
        });

        // Auto slide
        setInterval(() => {
            currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
            updateSlider();
        }, 5000);
    }

    // 4. Animated Counters
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    function startCounters() {
        if(hasCounted) return;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
        hasCounted = true;
    }

    // 5. GSAP Animations Setup
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animations
        const tl = gsap.timeline();
        tl.from(".hero-content h1", { y: 50, opacity: 0, duration: 1, ease: "power3.out" })
          .from(".hero-content p", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".stats-container > div", { y: 20, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", onComplete: startCounters }, "-=0.4")
          .from(".hero-form-container", { x: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=1");

        // Feature Cards staggered fade up
        gsap.from(".feature-card", {
            scrollTrigger: {
                trigger: ".feature-card",
                start: "top 80%"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });

        // Section Headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: "top 85%"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });

        // Fleet Cards Left/Right entrance
        gsap.utils.toArray('.car-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: "power2.out"
            });
        });

        // How it works items
        gsap.from(".step-card", {
            scrollTrigger: {
                trigger: "#how-it-works",
                start: "top 70%"
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: "back.out(1.7)"
        });

        // App Content text 
        gsap.from(".app-content", {
            scrollTrigger: {
                trigger: ".app-content",
                start: "top 75%"
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }
});
