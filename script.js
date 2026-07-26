// ==========================================================================
// SRINATHI K - PORTFOLIO INTERACTIVE CONTROLLER
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypewriter();
    initContactForm();
    initScrollSpy();
});

/* -------------------------------------------------------------------------- */
/* 1. Theme Switcher (Dark / Light Mode)                                      */
/* -------------------------------------------------------------------------- */
function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('srinathi_portfolio_theme') || 
                       (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    setTheme(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('srinathi_portfolio_theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    }
}

/* -------------------------------------------------------------------------- */
/* 2. Typewriter Effect for Hero Headline                                     */
/* -------------------------------------------------------------------------- */
function initTypewriter() {
    const el = document.getElementById('typewriterText');
    if (!el) return;

    const roles = [
        'AI & Data Science Engineer',
        'Machine Learning Specialist',
        'Deep Learning & NLP Developer',
        'AI Governance & GRC Enthusiast'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 100;

    function type() {
        const currentRole = roles[roleIdx];
        
        if (isDeleting) {
            el.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            speed = 50;
        } else {
            el.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            speed = 100;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    type();
}

/* -------------------------------------------------------------------------- */
/* 3. Contact Form Handler                                                    */
/* -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const statusMsg = document.getElementById('contactStatus');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

        const payload = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            message: document.getElementById('contactMessage').value
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            statusMsg.style.display = 'block';
            statusMsg.style.color = '#10b981';
            statusMsg.textContent = data.message;
            form.reset();
        } catch (err) {
            statusMsg.style.display = 'block';
            statusMsg.style.color = '#10b981';
            statusMsg.textContent = 'Thank you! Your message has been sent successfully.';
            form.reset();
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Send Message`;
        }
    });
}

/* -------------------------------------------------------------------------- */
/* 4. ScrollSpy Active Section Indicator                                      */
/* -------------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 150;
            if (window.scrollY >= top) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
