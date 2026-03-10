/**
 * REFINED PORTFOLIO SCRIPT
 * High-performance scroll observers & active-link logic
 */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------- Navbar Scroll Optimization ----------------------- */
    const navbar = document.querySelector(".navbar-v5");
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

    const highlightActiveSection = () => {
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

    window.addEventListener("scroll", highlightActiveSection);

    /* -------------- Reveal-on-Scroll Observer ----------------------- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* -------------- Smooth Internal Navigation ----------------------- */
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

    /* -------------- Minimalist Form Submission ----------------------- */
    const refinementForm = document.querySelector(".form-v5-refined");
    if (refinementForm) {
        refinementForm.addEventListener("submit", function() {
            const btn = this.querySelector(".btn-submit-v5");
            btn.innerHTML = 'Sending... <i class="fas fa-circle-notch fa-spin"></i>';
            btn.disabled = true;
            btn.style.opacity = "0.7";
        });
    }

});