/**
 * INTERACTIVE SCROLL-DRIVEN MOTION ENGINE
 */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------- Navbar Scroll Dynamics ----------------------- */
    const navbar = document.querySelector(".navbar-motion");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* -------------- Reveal Scroll Observer ----------------------- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                sectionObserver.unobserve(entry.target); // Reveal once
            }
        });
    }, observerOptions);

    document.querySelectorAll("section").forEach(section => {
        sectionObserver.observe(section);
    });

    /* -------------- Active Nav Tracker ----------------------- */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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
    });

    /* -------------- Parallax Text Effect (Subtle) ----------------------- */
    const parallaxText = document.querySelector(".parallax-txt");
    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY;
        const depth = parallaxText.dataset.depth || 0.1;
        const movement = scrolled * depth;
        parallaxText.style.backgroundPositionX = `${movement}px`;
        parallaxText.style.transform = `translateX(${movement * 0.2}px)`;
    });

    /* -------------- Interactive Certification Strip ----------------------- */
    const certLightbox = document.getElementById("cert-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.querySelector(".lightbox-close");

    document.querySelectorAll(".cert-strip-item").forEach(item => {
        item.addEventListener("click", () => {
            const fullImg = item.dataset.full;
            lightboxImg.src = fullImg;
            certLightbox.classList.add("active");
            document.body.style.overflow = "hidden"; // Lock scroll
        });
    });

    closeLightbox.addEventListener("click", () => {
        certLightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    certLightbox.addEventListener("click", (e) => {
        if (e.target === certLightbox) {
            certLightbox.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });

    /* -------------- Horizontal Scroll Hints ----------------------- */
    const scroller = document.getElementById("cert-scroller");
    if (scroller) {
        scroller.addEventListener("scroll", () => {
            const hint = document.querySelector(".gallery-hint");
            if (scroller.scrollLeft > 100) {
                hint.style.opacity = "0.2";
            } else {
                hint.style.opacity = "0.5";
            }
        });
    }

    /* -------------- Smooth Internal Scroll ----------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                window.scrollTo({
                    top: targetElement.offsetTop - headerOffset,
                    behavior: "smooth"
                });
            }
        });
    });

});