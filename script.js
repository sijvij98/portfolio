document.addEventListener('DOMContentLoaded', () => {

    // --- THEME SWITCHER ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-mode') {
            themeToggle.checked = true;
        }
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // --- HAMBURGER MENU ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- SCROLL REVEAL ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- DUMMY CASE STUDY DATA ---
    const caseStudies = {
        1: {
            title: "E-commerce Scale-up",
            category: "Google Shopping & Performance Max",
            challenge: "A fashion retailer was struggling with high CPAs and low return on ad spend (ROAS) during Q4. They needed to scale revenue without bleeding profit.",
            strategy: "We restructured their Shopping feed, implemented a granular Performance Max campaign structure segmented by product margin, and utilized First-Party data for audience signals.",
            stats: [
                { label: "ROAS", value: "4.5x" },
                { label: "Revenue", value: "+150%" },
                { label: "CPA", value: "-25%" }
            ]
        },
        2: {
            title: "SaaS Lead Gen",
            category: "Search & LinkedIn Ads",
            challenge: "B2B SaaS company was getting plenty of leads, but lead quality was poor, resulting in a low sales close rate.",
            strategy: "Shifted strategy from 'maximize clicks' to 'maximize conversions' with offline conversion import (OCT). Refined keywords to exclude informational queries and focused on high-intent 'solution' keywords.",
            stats: [
                { label: "Cost/Lead", value: "-40%" },
                { label: "SQLs", value: "+85%" },
                { label: "Conv. Rate", value: "3.2%" }
            ]
        },
        3: {
            title: "Local Business Growth",
            category: "Google Maps & Local Service Ads",
            challenge: "A multi-location dental practice wasn't showing up in the 'Local Pack' for high-value terms like 'Invisalign' and 'Implants'.",
            strategy: "Optimized Google Business Profiles for all locations, launched hyper-local campaigns, and implemented call tracking to measure offline bookings.",
            stats: [
                { label: "Phone Calls", value: "+300%" },
                { label: "Bookings", value: "+120%" },
                { label: "CPC", value: "$3.50" }
            ]
        }
    };

    // --- MODAL LOGIC ---
    const modal = document.getElementById('portfolio-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            const data = caseStudies[id];

            if (data) {
                // Generate HTML for the modal
                modalBody.innerHTML = `
                    <div class="case-study-header">
                        <h2 class="case-study-title">${data.title}</h2>
                        <div class="case-study-meta">${data.category}</div>
                        <div class="cs-stat-grid">
                            ${data.stats.map(stat => `
                                <div class="cs-stat-box">
                                    <span class="val">${stat.value}</span>
                                    <span class="lbl">${stat.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="case-study-body">
                        <div class="cs-section">
                            <h4>The Challenge</h4>
                            <p>${data.challenge}</p>
                        </div>
                        <div class="cs-section">
                            <h4>The Strategy</h4>
                            <p>${data.strategy}</p>
                        </div>
                    </div>
                `;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close Modal Function
    function closePortfolioModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Close on X click
    closeModal.addEventListener('click', closePortfolioModal);

    // Close on Outside click
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closePortfolioModal();
        }
    });

    // --- CONTACT FORM VALIDATION (Simple) ---
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real scenario, you'd send data here.
            alert("Thank you! Your message has been sent. (Demo only)");
            form.reset();
        });
    }
});