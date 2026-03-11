/* --------------------------------------------------------------------------
   THE HARMONIOUS ARCHITECT - CORE LOGIC
-------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------- Navigation Header ----------------------- */
    const navbar = document.getElementById("navbar");
    const burger = document.getElementById("burger");
    const navMenu = document.querySelector(".nav-links");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    if (burger) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close when clicking link
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                burger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    /* -------------- Mouselight (Spotlight) ----------------------- */
    const mouselight = document.getElementById("mouselight");
    window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        mouselight.style.setProperty("--x", `${x}%`);
        mouselight.style.setProperty("--y", `${y}%`);
    });

    /* -------------- Ethereal Particles Engine ----------------------- */
    const particleField = document.getElementById("particles");
    const createParticles = () => {
        for (let i = 0; i < 40; i++) {
            const p = document.createElement("div");
            p.className = "particle";
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 15 + 15;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.bottom = `-20px`;
            p.style.opacity = Math.random() * 0.3 + 0.1;
            p.style.animation = `etherealFloat ${duration}s infinite linear`;
            p.style.animationDelay = `${Math.random() * 15}s`;
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
            const scrollPos = slider.scrollLeft;
            const itemWidth = slides[0].offsetWidth + 30; // slide + gap (now 30px)
            const index = Math.round(scrollPos / itemWidth);
            
            document.querySelectorAll(".dot").forEach((dot, i) => {
                dot.classList.toggle("active", i === index);
            });
        });

        // Arrow Controls
        nextBtn.addEventListener("click", () => {
            const itemWidth = slides[0].offsetWidth + 30;
            slider.scrollBy({ left: itemWidth, behavior: "smooth" });
        });
        prevBtn.addEventListener("click", () => {
            const itemWidth = slides[0].offsetWidth + 30;
            slider.scrollBy({ left: -itemWidth, behavior: "smooth" });
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

    /* -------------- Certificate Lightbox ----------------------- */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".lightbox-close");

    document.querySelectorAll(".merit-card").forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img");
            const title = card.querySelector("h4").innerText;
            lightbox.classList.add("active");
            lightboxImg.src = img.src;
            captionText.innerHTML = title;
            document.body.style.overflow = "hidden"; // Prevent scroll
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            lightbox.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("active");
                document.body.style.overflow = "auto";
            }
        });
    }

});

// Global Styles for Particles (JS-injected)
const style = document.createElement('style');
style.textContent = `
    @keyframes etherealFloat {
        0% { transform: translate(0, 0) scale(1); opacity: 0; }
        20% { opacity: 0.3; }
        80% { opacity: 0.3; }
        100% { transform: translate(${Math.random() * 100 - 50}px, -110vh) scale(0.5); opacity: 0; }
    }
`;
document.head.appendChild(style);
