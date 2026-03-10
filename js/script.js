/**
 * ELITE KINETIC INTERACTION ENGINE
 */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------- Premium Navbar Scroll Logic ----------------------- */
    const navbar = document.querySelector(".navbar-premium");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* -------------- Elite Revealer (Intersection Observer) ----------------------- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll("section").forEach(section => {
        sectionObserver.observe(section);
    });

    /* -------------- Active Nav Watcher ----------------------- */
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let active = "";
        sections.forEach(section => {
            const top = section.offsetTop;
            if (window.scrollY >= (top - 150)) {
                active = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(active)) {
                link.classList.add("active");
            }
        });
    });

    /* -------------- Elegant Certificate Slider ----------------------- */
    const slider = document.getElementById("cert-slider");
    const prevBtn = document.getElementById("prev-cert");
    const nextBtn = document.getElementById("next-cert");
    const pagination = document.getElementById("slider-pagination");
    const slides = document.querySelectorAll(".cert-slide");

    // Generate Dots
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
        pagination.appendChild(dot);
    });

    // Update Dots on Scroll
    slider.addEventListener("scroll", () => {
        const index = Math.round(slider.scrollLeft / slides[0].offsetWidth);
        const dots = document.querySelectorAll(".dot");
        dots.forEach(d => d.classList.remove("active"));
        if (dots[index]) dots[index].classList.add("active");
    });

    // Arrow Logic
    nextBtn.addEventListener("click", () => {
        slider.scrollBy({ left: 430, behavior: "smooth" }); // 400 width + 30 gap
    });
    prevBtn.addEventListener("click", () => {
        slider.scrollBy({ left: -430, behavior: "smooth" });
    });

    /* -------------- Certificate Modal (Lightbox) ----------------------- */
    const modal = document.getElementById("modal-cert");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close-overlay");

    slides.forEach(slide => {
        slide.addEventListener("click", () => {
            modalImg.src = slide.dataset.full;
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });

    /* -------------- Parallax Hero Optimization ----------------------- */
    const parallaxH1 = document.querySelector(".parallax-h1");
    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY;
        parallaxH1.style.transform = `translateY(${scrolled * 0.15}px)`;
        parallaxH1.style.opacity = 1 - (scrolled / 700);
    });

    /* -------------- Smooth Navigation Overrides ----------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

});