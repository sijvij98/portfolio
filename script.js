document.addEventListener('DOMContentLoaded', () => {

    // --- HAMBURGER MENU ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- SMOOTH SCROLLING (handled by CSS `scroll-behavior: smooth;`) ---
    // JavaScript implementation is a good fallback if CSS isn't supported,
    // but we will rely on the CSS version for simplicity as requested.

    // --- SCROLL REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- TESTIMONIAL SLIDER ---
    const testimonials = document.querySelectorAll('.testimonial-card');
    const nextBtn = document.querySelector('.slider-nav .next');
    const prevBtn = document.querySelector('.slider-nav .prev');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Initialize first testimonial
    showTestimonial(currentTestimonial);


    // --- CONTACT FORM VALIDATION ---
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        resetError(nameInput);
        resetError(emailInput);
        resetError(messageInput);

        // Validate Name
        if (nameInput.value.trim() === '') {
            setError(nameInput, 'Name is required.');
            isValid = false;
        }

        // Validate Email
        if (emailInput.value.trim() === '') {
            setError(emailInput, 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            setError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }
        
        // Validate Message
        if (messageInput.value.trim() === '') {
            setError(messageInput, 'Message is required.');
            isValid = false;
        }

        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });

    function setError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.innerText = message;
        errorMessage.style.display = 'block';
        input.style.borderColor = '#EF4444';
    }

    function resetError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.innerText = '';
        errorMessage.style.display = 'none';
        input.style.borderColor = 'var(--light-gray)';
    }

    function isValidEmail(email) {
        const re = /^(([^<>()[\\]\\.,;:\s@\"]+(\.[^<>()[\\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
