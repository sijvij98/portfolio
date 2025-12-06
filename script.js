document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        
        // Update icon
        if (isLight) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }

        // Save preference
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });


    // --- Mobile Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });


    // --- Modal Logic ---
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');
    const projectCards = document.querySelectorAll('.project-card');

    // Dummy data for modals
    const projectData = {
        1: {
            title: "E-commerce ROAS Amplification",
            challenge: "A mid-sized e-commerce client was struggling with declining Return On Ad Spend (ROAS) and increasing Cost Per Acquisition (CPA) on their primary Google Search campaigns despite a high budget.",
            strategy: "Conducted a full-funnel audit, identifying significant budget waste on non-converting keywords and poor landing page experience. Implemented a tiered campaign structure based on product margin, refined keyword match types, and deployed a Smart Bidding strategy focused on Target ROAS. Collaborated with the client's dev team to improve page load speed and mobile UX.",
            results: "Achieved a 150% increase in ROAS within the first quarter. Reduced CPA by 40% while maintaining conversion volume. The new structure allowed for more granular control and scalable growth."
        },
        2: {
            title: "SaaS Lead Generation Engine",
            challenge: "A B2B SaaS startup needed to build a consistent pipeline of qualified leads for their sales team but had a limited initial marketing budget.",
            strategy: "Developed a hyper-targeted search campaign focusing on long-tail, high-intent keywords specific to their niche. Utilized GA4 and GTM to set up detailed conversion tracking for demo requests and free trial sign-ups. Launched a small-scale LinkedIn Ads campaign to complement search efforts and build brand awareness among key decision-makers.",
            results: "Generated a 300% increase in qualified leads month-over-month for the first four months. The cost-per-lead was 50% lower than the initial target goal, proving the viability and efficiency of the paid search channel."
        },
        3: {
            title: "Local Service Lead-Gen Overhaul",
            challenge: "A local home services business was receiving a high volume of irrelevant calls and form submissions from their Google Ads, wasting both ad spend and administrative time.",
            strategy: "Restructured the account to focus on geo-fenced service areas and specific, high-value service keywords. Implemented extensive negative keyword lists to filter out DIY and informational searchers. Optimized ad copy to clearly state the service offered and pre-qualify potential customers.",
            results: "Decreased unqualified leads by 70%. Improved the overall lead-to-customer conversion rate by 60% as the sales team could focus on genuinely interested prospects. Overall ad spend was reduced by 25% while generating higher quality inquiries."
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const data = projectData[projectId];
            
            if (data) {
                modalBody.innerHTML = `
                    <h3>${data.title}</h3>
                    <p><strong>The Challenge:</strong> ${data.challenge}</p>
                    <p><strong>The Strategy:</strong> ${data.strategy}</p>
                    <p><strong>The Results:</strong> ${data.results}</p>
                `;
                modal.style.display = 'block';
            }
        });
    });

    // Close modal actions
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

});
