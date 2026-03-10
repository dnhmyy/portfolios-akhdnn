/**
 * V5 - ADVANCED TECH SCRIPT
 * GSAP-inspired smooth interaction logic
 */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------- Navbar Scroll Effect ----------------------- */
    const navbar = document.querySelector(".v5-navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* -------------- Active Section Highlighting ----------------------- */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const highlightNav = () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", highlightNav);

    /* -------------- Intersection Observer for Animations ----------------------- */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* -------------- Staggered Child Reveal ----------------------- */
    // This adds the "visible" class to the section, which triggers CSS animations
    // for all children with 'reveal-up' or 'reveal-fade' classes.

    /* -------------- Mobile Menu Concept ----------------------- */
    const mobileToggle = document.querySelector(".mobile-toggle");
    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            // Simplified toggle - in a production app, we'd add a modal/overlay here
            alert("V5 Mobile Navigation Under Construction");
        });
    }

    /* -------------- Smooth Internal Links ----------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* -------------- Form Submission Enhancement ----------------------- */
    const v5Form = document.querySelector(".v5-form");
    if (v5Form) {
        v5Form.addEventListener("submit", function() {
            const btn = this.querySelector(".form-btn");
            btn.innerHTML = 'Sending Systems... <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = "0.7";
            btn.disabled = true;
        });
    }

});