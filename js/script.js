/**
 * PRISTINE PORTFOLIO - V3 SCRIPT
 * Minimalist interaction logic
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Intersection Observer for Scroll Reveals ---
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.padding = "20px 0";
            navbar.style.borderBottom = "1px solid #eeeeee";
        } else {
            navbar.style.padding = "30px 0";
            navbar.style.borderBottom = "none";
        }
    });

    // --- Form Handling (Mock) ---
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            // Standard formspree action handles submission,
            // we could add custom UI feedback here if needed.
            const btn = contactForm.querySelector("button");
            btn.innerHTML = "Sending...";
            btn.disabled = true;
        });
    }

});