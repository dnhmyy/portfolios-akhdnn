/**
 * ELITE UI/UX INTERACTION LOGIC
 * GSAP-Equivalent Smooth Motion & Smart Gallery
 */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------- Elite Navbar Scroll Effect ----------------------- */
    const navbar = document.querySelector(".navbar-elite");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* -------------- Active Nav Watcher ----------------------- */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const scrollWatcher = () => {
        let active = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                active = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(active)) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", scrollWatcher);

    /* -------------- Intersection Observer (Elite Reveals) ----------------------- */
    const observeOptions = {
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
    }, observeOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* -------------- Smart Gallery: Certification Toggle ----------------------- */
    const certGrid = id("cert-grid");
    const toggleBtn = id("toggle-certs");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            certGrid.classList.toggle("expanded");
            if (certGrid.classList.contains("expanded")) {
                toggleBtn.textContent = "Show Less";
            } else {
                toggleBtn.textContent = "Show All 12+ Certificates";
                // Smooth scroll back to section top if scrolling past
                id("credentials").scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    /* -------------- Certificate Lightbox Logic ----------------------- */
    const masks = document.querySelectorAll(".cert-mask");
    const overlay = id("cert-overlay");
    const overlayImg = id("full-cert-img");
    const closeBtn = document.querySelector(".overlay-close");

    masks.forEach(mask => {
        mask.addEventListener("click", function() {
            const thumbSrc = this.parentElement.querySelector("img").src;
            overlayImg.src = thumbSrc; // In production, use high-res source
            overlay.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent body scroll
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            overlay.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    }

    // Close on background click
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });

    /* -------------- Smooth Internal Scroll ----------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = 80;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: "smooth"
                });
            }
        });
    });

    /* -------------- Helper: ID Selector ----------------------- */
    function id(name) { return document.getElementById(name); }

});