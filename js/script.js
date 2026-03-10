/* -------------- Loader ----------------------- */
const init = () => {
    const main = document.querySelector(".main");
    const loader = document.querySelector(".page-loader");
    if (main && main.classList.contains("hidden")) {
        main.classList.remove("hidden");
        document.querySelector(".home-section").classList.add("active");
        if (loader) {
            loader.classList.add("fade-out");
            setTimeout(() => {
                loader.style.display = "none";
            }, 600);
        }
    }
};

window.addEventListener("load", init);
// Fallback: show content after 3 seconds if load event hasn't fired
setTimeout(init, 3000);

/* -------------- Toggle Navbar ----------------------- */
const navToggler = document.querySelector(".nav-toggler");
const header = document.querySelector(".header");

navToggler.addEventListener("click", () => {
    header.classList.toggle("active");
    document.body.classList.toggle("hide-scrolling");
});

/* -------------- Active Section ----------------------- */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("link-item") && e.target.hash !== "") {
        // If clicked from nav, close nav first
        if (e.target.classList.contains("nav-item")) {
            header.classList.remove("active");
            document.body.classList.remove("hide-scrolling");
        }

        const targetSection = document.querySelector(e.target.hash);
        if (targetSection) {
            document.querySelector("section.active").classList.remove("active");
            targetSection.classList.add("active");
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
});

/* -------------- Header Scroll & Progress ----------------------- */
window.addEventListener("scroll", () => {
    // Header background
    if (window.scrollY > 50) {
        header.classList.add("header-scrolled");
    } else {
        header.classList.remove("header-scrolled");
    }

    // Scroll progress line
    const scrollLine = document.querySelector(".scroll-line");
    if (scrollLine) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        scrollLine.style.width = scrolled + "%";
    }
});

/* -------------- About Tabs ----------------------- */
const tabsContainer = document.querySelector(".about-tabs");
const aboutSection = document.querySelector(".about-section");

if (tabsContainer) {
    tabsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("tab-item") && !e.target.classList.contains("active")) {
            tabsContainer.querySelector(".active").classList.remove("active");
            e.target.classList.add("active");
            const target = e.target.getAttribute("data-target");
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
    });
}

/* -------------- Portfolio Item Popup ----------------------- */
document.addEventListener("click", (e) => {
    if (e.target.closest(".portfolio-item")) {
        const item = e.target.closest(".portfolio-item");
        portfolioItemDetails(item);
        togglePortfolioPopup();
    }
});

function togglePortfolioPopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle("hide-scrolling");
}

document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);

// Hide popup on clicking outside
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("pp-inner")) {
        togglePortfolioPopup();
    }
});

function portfolioItemDetails(portfolioItem) {
    document.querySelector(".pp-thumbnail img").src =
        portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

    document.querySelector(".pp-header h3").innerHTML =
        portfolioItem.querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML =
        portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}