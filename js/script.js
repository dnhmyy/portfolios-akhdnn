// Main Logic
console.log("Script.js v2 - Active");

document.addEventListener("DOMContentLoaded", () => {

    // Nav & Burger
    const navbar = document.getElementById("navbar");
    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobileMenu");

    // Debugging (Remove in production if needed)
    if (!navbar) console.warn("Element with id 'navbar' not found.");
    if (!burger) console.warn("Element with id 'burger' not found.");
    if (!mobileMenu) console.warn("Element with id 'mobileMenu' not found.");

    // Handle navbar styling on scroll
    window.addEventListener("scroll", () => {
        navbar?.classList.toggle("scrolled", window.scrollY > 20);
    });

    // Mobile menu toggle logic
    if (burger && mobileMenu) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            mobileMenu.classList.toggle("open");
        });
    }

    // Close mobile menu when a navigation link is clicked
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            burger?.classList.remove("active");
            mobileMenu?.classList.remove("open");
        });
    });

    // Link aktif saat scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    }, { passive: true });

    // Spotlight Cursor
    const mouselight = document.getElementById("mouselight");
    window.addEventListener("mousemove", (e) => {
        mouselight.style.background =
            `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, hsla(220,100%,50%,0.04), transparent 60%)`;
    }, { passive: true });

    // Hero Particles
    const canvas = document.getElementById("hero-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let animId;
        const particles = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
            canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
            ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
        };

        const init = () => {
            resize();
            const count = Math.min(60, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000));
            particles.length = 0;
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.offsetWidth,
                    y: Math.random() * canvas.offsetHeight,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    r: Math.random() * 2 + 1,
                    o: Math.random() * 0.4 + 0.1,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            // Render particle connections (network effect)
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `hsla(220,100%,50%,${0.05 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Render individual particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(220,100%,50%,${p.o})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };

        init();
        draw();
        window.addEventListener("resize", init, { passive: true });
    }

    const revealEls = document.querySelectorAll(".reveal-up");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply staggered delay based on sibling index
                const siblings = Array.from(entry.target.parentElement.querySelectorAll(".reveal-up"));
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
                entry.target.classList.add("in-view");
            } else {
                entry.target.style.transitionDelay = "0s";
                entry.target.classList.remove("in-view");
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });


    revealEls.forEach(el => observer.observe(el));


    // Cert Slider
    const sliderEl = document.getElementById("meritSlider");
    const slides = document.querySelectorAll(".merit-slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const pagination = document.getElementById("sliderPagination");

    if (sliderEl && slides.length > 0) {
        // Create Dots - One dot per slide (Original Logic)
        slides.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.className = `dot ${i === 0 ? "active" : ""}`;
            dot.addEventListener("click", () => {
                sliderEl.scrollTo({
                    left: slides[i].offsetLeft - sliderEl.offsetLeft,
                    behavior: "smooth"
                });
            });
            pagination.appendChild(dot);
        });

        // Sync Dots with scroll
        let isScrolling = false;
        sliderEl.addEventListener("scroll", () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    const scrollPos = sliderEl.scrollLeft;
                    const itemWidth = slides[0].offsetWidth + 24;
                    const index = Math.round(scrollPos / itemWidth);

                    pagination.querySelectorAll(".dot").forEach((dot, i) => {
                        dot.classList.toggle("active", i === index);
                    });

                    slides.forEach((slide, i) => {
                        const card = slide.querySelector(".merit-card");
                        if (card) card.classList.toggle("active", i === index);
                    });
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true });

        // Arrow Controls
        nextBtn?.addEventListener("click", () => {
            const itemWidth = slides[0].offsetWidth + 24;
            sliderEl.scrollBy({ left: itemWidth, behavior: "smooth" });
        });
        prevBtn?.addEventListener("click", () => {
            const itemWidth = slides[0].offsetWidth + 24;
            sliderEl.scrollBy({ left: -itemWidth, behavior: "smooth" });
        });

        // Initialize first card
        slides[0].querySelector(".merit-card")?.classList.add("active");
    }



    // Lightbox
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    window.openLightbox = (src, alt) => {
        lightboxImg.src = src;
        lightboxImg.alt = alt || "Certificate";
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
    };

    window.closeLightbox = () => {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
    };

    // Close lightbox on backdrop click
    lightbox?.addEventListener("click", (e) => {
        if (e.target === lightbox) window.closeLightbox();
    });

    // Close lightbox on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") window.closeLightbox();
    });

    // Development Notice Logic
    const devModal = document.getElementById("dev-modal");
    const devLink = document.getElementById("dev-modal-link");

    window.openDevNotice = (url) => {
        console.log("Opening dev notice for:", url);
        if (devModal && devLink) {
            devLink.href = url;
            devModal.classList.add("open");
            document.body.style.overflow = "hidden";
        }
    };

    window.closeDevNotice = () => {
        devModal?.classList.remove("open");
        document.body.style.overflow = "";
    };

    // --- Contact Form AJAX Submission ---
    const contactForm = document.getElementById("contact-form");
    const contactModal = document.getElementById("contact-modal");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector(".btn-submit");
            const originalBtnText = submitBtn.innerHTML;

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Success
                    contactModal?.classList.add("open");
                    document.body.style.overflow = "hidden";
                    contactForm.reset();
                } else {
                    alert("Oops! Ada masalah saat mengirim pesan. Silakan coba lagi.");
                }
            } catch (error) {
                alert("Terjadi kesalahan koneksi. Silakan cek koneksi internet Anda.");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    window.closeContactModal = () => {
        contactModal?.classList.remove("open");
        document.body.style.overflow = "";
    };

    // Close on backdrop click
    devModal?.addEventListener("click", (e) => {
        if (e.target === devModal) window.closeDevNotice();
    });

});
