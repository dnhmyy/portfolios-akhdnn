/* --------------------------------------------------------------------------
   THE HARMONIOUS ARCHITECT - CORE LOGIC
-------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------- Navigation Header ----------------------- */
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* -------------- Particles Engine ----------------------- */
    const particleField = document.getElementById("particles");
    const createParticles = () => {
        for (let i = 0; i < 20; i++) {
            const p = document.createElement("div");
            p.className = "particle";
            const size = Math.random() * 8 + 4;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            p.style.animation = `floatParticle ${Math.random() * 10 + 10}s infinite linear`;
            particleField.appendChild(p);
        }
    };
    createParticles();

    /* -------------- Scroll Reveal Observer ----------------------- */
    const revealElements = document.querySelectorAll(".reveal-up");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* -------------- Merritt Slider (Certificates) ----------------------- */
    const slider = document.querySelector(".merit-slider");
    const slides = document.querySelectorAll(".merit-slide");
    const nextBtn = document.querySelector(".slider-arrow.next");
    const prevBtn = document.querySelector(".slider-arrow.prev");
    const pagination = document.querySelector(".slider-pagination");

    if (slider) {
        // Create Dots
        slides.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.className = `dot ${i === 0 ? "active" : ""}`;
            dot.addEventListener("click", () => {
                slider.scrollTo({
                    left: slides[i].offsetLeft - slider.offsetLeft,
                    behavior: "smooth"
                });
            });
            pagination.appendChild(dot);
        });

        // Sync Dots with scroll
        slider.addEventListener("scroll", () => {
            const index = Math.round(slider.scrollLeft / slides[0].offsetWidth);
            document.querySelectorAll(".dot").forEach((dot, i) => {
                dot.classList.toggle("active", i === index);
            });
        });

        // Arrow Controls
        nextBtn.addEventListener("click", () => {
            slider.scrollBy({ left: slides[0].offsetWidth + 30, behavior: "smooth" });
        });
        prevBtn.addEventListener("click", () => {
            slider.scrollBy({ left: -(slides[0].offsetWidth + 30), behavior: "smooth" });
        });
    }

    /* -------------- Active Nav Link Sync ----------------------- */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

});

// Global Styles for Particles (JS-injected)
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% { transform: translateY(0) rotate(0); opacity: 0; }
        10% { opacity: 0.15; }
        90% { opacity: 0.15; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);
