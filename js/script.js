/**
 * THE ULTIMATE KINETIC UX ENGINE
 */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------- Elite Particle System ----------------------- */
    const initParticles = () => {
        const container = document.getElementById("particles-js");
        if (!container) return;
        
        const count = 40;
        for (let i = 0; i < count; i++) {
            const p = document.createElement("div");
            p.classList.add("particle");
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 1;
            const speed = Math.random() * 15 + 15;
            
            p.style.cssText = `
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                opacity: ${Math.random() * 0.3};
            `;
            
            p.animate([
                { transform: 'translate(0, 0)' },
                { transform: `translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px)` }
            ], {
                duration: speed * 1000,
                iterations: Infinity,
                direction: 'alternate',
                easing: 'ease-in-out'
            });
            
            container.appendChild(p);
        }
    };

    initParticles();

    /* -------------- Performance Navigation ----------------------- */
    const navbar = document.querySelector(".navbar-elite");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* -------------- Unified Scroll Reveal ----------------------- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                // observer.unobserve(entry.target); // Optional: reveal only once
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll("section").forEach(s => observer.observe(s));
    document.querySelectorAll(".reveal-up, .reveal-left").forEach(el => observer.observe(el));

    /* -------------- Elite Merit Slider ----------------------- */
    const slider = document.getElementById("main-slider");
    const prevBtn = document.getElementById("slider-prev");
    const nextBtn = document.getElementById("slider-next");
    const dotsContainer = document.getElementById("slider-dots");
    const slides = document.querySelectorAll(".merit-slide");

    if (slider) {
        // Generate Pagination
        slides.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                slider.scrollTo({
                    left: slides[i].offsetLeft - slider.offsetLeft,
                    behavior: "smooth"
                });
            });
            dotsContainer.appendChild(dot);
        });

        // Sync Dots on Scroll
        slider.addEventListener("scroll", () => {
            const index = Math.round(slider.scrollLeft / slides[0].offsetWidth);
            const dots = dotsContainer.querySelectorAll(".dot");
            dots.forEach(d => d.classList.remove("active"));
            if (dots[index]) dots[index].classList.add("active");
        });

        // Arrow Controls
        nextBtn.addEventListener("click", () => slider.scrollBy({ left: 430, behavior: "smooth" }));
        prevBtn.addEventListener("click", () => slider.scrollBy({ left: -430, behavior: "smooth" }));
    }

    /* -------------- Merit Full Detail (Lightbox) ----------------------- */
    const modal = document.getElementById("merit-modal");
    const modalImg = modal?.querySelector(".lightbox-img");
    const closeBtn = modal?.querySelector(".lightbox-close");

    slides.forEach(slide => {
        slide.addEventListener("click", () => {
            if (modal && modalImg) {
                modalImg.src = slide.dataset.full;
                modal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    closeBtn?.addEventListener("click", () => {
        modal?.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });

    /* -------------- Smooth Internal Links ----------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 90,
                    behavior: "smooth"
                });
            }
        });
    });

    /* -------------- Active Nav Highlight ----------------------- */
    window.addEventListener("scroll", () => {
        let current = "";
        document.querySelectorAll("section").forEach(section => {
            const top = section.offsetTop;
            if (window.scrollY >= (top - 150)) {
                current = section.getAttribute("id");
            }
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

});