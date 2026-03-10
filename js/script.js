/**
 * Portfolio Remake V2 - Editorial Script
 */

document.addEventListener("DOMContentLoaded", () => {
    
    /* -------------- Loader ----------------------- */
    const initPage = () => {
        const main = document.querySelector(".main-content");
        const loader = document.querySelector(".page-loader");
        
        if (main) {
            main.classList.remove("hidden");
            if (loader) {
                loader.style.opacity = "0";
                setTimeout(() => {
                    loader.style.display = "none";
                    triggerReveal();
                }, 800);
            }
        }
    };

    window.addEventListener("load", initPage);
    setTimeout(initPage, 3000); // Fallback

    /* -------------- Navigation ----------------------- */
    const navToggler = document.querySelector(".nav-toggler");
    const header = document.querySelector(".header");
    const navLinks = document.querySelectorAll(".nav-link");

    if (navToggler) {
        navToggler.addEventListener("click", () => {
            header.classList.toggle("active");
            document.body.classList.toggle("hide-scrolling");
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            header.classList.remove("active");
            document.body.classList.remove("hide-scrolling");
        });
    });

    /* -------------- Scroll Effects ----------------------- */
    const scrollProgress = document.querySelector(".scroll-progress");
    
    window.addEventListener("scroll", () => {
        // Sticky Header
        if (window.scrollY > 80) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }

        // Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgress) scrollProgress.style.width = scrolled + "%";

        // Scroll Reveal
        triggerReveal();
    });

    function triggerReveal() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            const revealPoint = 100;

            if (revealTop < windowHeight - revealPoint) {
                el.classList.add("active");
            }
        });
    }

    /* -------------- Portfolio Modal ----------------------- */
    const workCards = document.querySelectorAll(".work-card");
    const modal = document.getElementById("project-modal");
    const modalBody = document.querySelector(".modal-body");
    const modalClose = document.querySelector(".modal-close");

    workCards.forEach(card => {
        card.addEventListener("click", () => {
            const title = card.querySelector("h3").innerText;
            const details = card.querySelector(".work-details").innerHTML;
            const img = card.querySelector("img").src;

            modalBody.innerHTML = `
                <div class="modal-editorial">
                    <img src="${img}" class="modal-hero-img" style="width:100%; margin-bottom:60px;">
                    <h2 style="font-size:clamp(2rem, 8vw, 5rem); margin-bottom:30px;">${title}</h2>
                    <div class="modal-text" style="font-size:1.5rem; color:var(--text-secondary);">
                        ${details}
                    </div>
                </div>
            `;
            
            modal.style.display = "flex";
            document.body.classList.add("hide-scrolling");
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", () => {
            modal.style.display = "none";
            document.body.classList.remove("hide-scrolling");
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal || e.target.classList.contains("modal-backdrop")) {
            modal.style.display = "none";
            document.body.classList.remove("hide-scrolling");
        }
    });

    /* -------------- Smooth Navigation ----------------------- */
    const linkItems = document.querySelectorAll(".link-item");
    linkItems.forEach(item => {
        item.addEventListener("click", (e) => {
            const hash = item.getAttribute("href");
            if (hash && hash.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(hash);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

});