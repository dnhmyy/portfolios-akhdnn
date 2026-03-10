/**
 * V4 - TECHNICAL PROFESSIONAL SCRIPT
 * High-performance interaction logic
 */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------- Navigation Toggle ----------------------- */
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.querySelector(".desktop-nav");
    
    // For mobile handling (simplified)
    if (navToggle) {
        navToggle.addEventListener("click", () => {
            // Note: In the V4 CSS desktop-nav is hidden on mobile. 
            // We could add a mobile-active class here if a full mobile menu was built.
            // For now, focusing on the refined desktop experience and scroll effects.
        });
    }

    /* -------------- Scroll Performance Observer ----------------------- */
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll("section").forEach(section => {
        sectionObserver.observe(section);
    });

    /* -------------- Scroll Progress Tracker ----------------------- */
    const scrollTracker = document.querySelector(".scroll-tracker");
    
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (scrollTracker) {
            scrollTracker.style.width = scrolled + "%";
        }
    });

    /* -------------- Smooth Scrolling Logic ----------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* -------------- Form Submission Animation ----------------------- */
    const contactForm = document.querySelector(".form-v4");
    if (contactForm) {
        contactForm.addEventListener("submit", function() {
            const btn = this.querySelector(".submit-btn");
            btn.innerHTML = "Processing...";
            btn.classList.add("submitting");
        });
    }

});