/* --------------------------------------------------------------------------
   ARCHITECT GLOW — LOGIKA UTAMA
-------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

    /* ====================================================================
       NAVIGASI — Scroll & Burger
    ==================================================================== */
    const navbar  = document.getElementById("navbar");
    const burger  = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobileMenu");

    // Tambahkan class "scrolled" saat pengguna scroll ke bawah
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    });

    // Kontrol burger mobile
    if (burger) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            mobileMenu.classList.toggle("open");
        });
    }

    // Tutup menu mobile saat link diklik
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

    /* ====================================================================
       MOUSE SPOTLIGHT — Cahaya mengikuti kursor
    ==================================================================== */
    const mouselight = document.getElementById("mouselight");
    window.addEventListener("mousemove", (e) => {
        mouselight.style.background =
            `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, hsla(220,100%,50%,0.04), transparent 60%)`;
    }, { passive: true });

    /* ====================================================================
       CANVAS PARTIKEL — Efek jaringan IT (Hero section)
    ==================================================================== */
    const canvas = document.getElementById("hero-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let animId;
        const particles = [];

        const resize = () => {
            canvas.width  = canvas.offsetWidth  * (window.devicePixelRatio || 1);
            canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
            ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
        };

        const init = () => {
            resize();
            const count = Math.min(60, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000));
            particles.length = 0;
            for (let i = 0; i < count; i++) {
                particles.push({
                    x:  Math.random() * canvas.offsetWidth,
                    y:  Math.random() * canvas.offsetHeight,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    r:  Math.random() * 2 + 1,
                    o:  Math.random() * 0.4 + 0.1,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            // Gambar garis penghubung antar partikel (efek jaringan)
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

            // Gambar titik partikel
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.offsetWidth)  p.vx *= -1;
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

    /* ====================================================================
       SCROLL REVEAL — Animasi muncul berulang saat scroll
    ==================================================================== */
    const revealEls = document.querySelectorAll(".reveal-up");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan delay per urutan elemen dalam parent
                const siblings = Array.from(entry.target.parentElement.querySelectorAll(".reveal-up"));
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.05}s`;
                entry.target.classList.add("in-view");
            } else {
                entry.target.style.transitionDelay = "0s";
                entry.target.classList.remove("in-view");
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -20px 0px" });

    revealEls.forEach(el => observer.observe(el));

    /* ====================================================================
       SLIDER SERTIFIKAT — Navigasi dengan panah dan titik pagination
    ==================================================================== */
    const sliderEl   = document.getElementById("meritSlider");
    const slides      = document.querySelectorAll(".merit-slide");
    const prevBtn     = document.getElementById("prevBtn");
    const nextBtn     = document.getElementById("nextBtn");
    const pagination  = document.getElementById("sliderPagination");

    if (sliderEl && slides.length > 0) {
        let active = 0;

        // Buat titik pagination
        slides.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.className = `dot${i === 0 ? " active" : ""}`;
            dot.setAttribute("aria-label", `Sertifikat ${i + 1}`);
            dot.addEventListener("click", () => goTo(i));
            pagination.appendChild(dot);
        });

        const dots = () => pagination.querySelectorAll(".dot");

        const updateDots = (idx) => {
            dots().forEach((d, i) => d.classList.toggle("active", i === idx));
        };

        const updateCards = (idx) => {
            document.querySelectorAll(".merit-card").forEach((c, i) => {
                c.classList.toggle("active", i === idx);
            });
        };

        const goTo = (idx) => {
            active = Math.max(0, Math.min(slides.length - 1, idx));
            slides[active].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            updateDots(active);
            updateCards(active);
        };

        prevBtn?.addEventListener("click", () => goTo(active - 1));
        nextBtn?.addEventListener("click", () => goTo(active + 1));

        // Sinkronisasi titik saat slider discroll manual
        sliderEl.addEventListener("scroll", () => {
            const mid = sliderEl.scrollLeft + sliderEl.offsetWidth / 2;
            slides.forEach((slide, i) => {
                const left = slide.offsetLeft;
                const right = left + slide.offsetWidth;
                if (mid >= left && mid <= right) {
                    active = i;
                    updateDots(i);
                    updateCards(i);
                }
            });
        }, { passive: true });

        // Inisialisasi kartu pertama sebagai aktif
        updateCards(0);
    }

    /* ====================================================================
       LIGHTBOX SERTIFIKAT — Buka/Tutup tampilan sertifikat
    ==================================================================== */
    const lightbox    = document.getElementById("lightbox");
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

    // Tutup lightbox jika klik di luar gambar
    lightbox?.addEventListener("click", (e) => {
        if (e.target === lightbox) window.closeLightbox();
    });

    // Tutup lightbox dengan tombol Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") window.closeLightbox();
    });

});
