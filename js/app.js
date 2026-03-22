document.addEventListener('DOMContentLoaded', () => {

    // ---- Theme Toggle ----
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved) html.setAttribute('data-theme', saved);

    toggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // ---- Nav scroll ----
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // ---- Mobile Menu ----
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }));
    }

    // ---- Hero rotating text ----
    const words = ['raw APIs', 'messy JSON', 'ad spend data', 'CRM exports', 'marketplace feeds'];
    const el = document.getElementById('heroRotate');
    let idx = 0;
    if (el) {
        setInterval(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(8px)';
            setTimeout(() => {
                idx = (idx + 1) % words.length;
                el.textContent = words[idx];
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 300);
        }, 2800);
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

    // ---- KPI counter animation ----
    const kpis = document.querySelectorAll('.kpi__number[data-count]');
    let counted = false;

    function animateCounters() {
        if (counted) return;
        counted = true;
        kpis.forEach(kpi => {
            const target = parseFloat(kpi.dataset.count);
            const isDecimal = target % 1 !== 0;
            const duration = 1600;
            const start = performance.now();

            function step(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = target * ease;
                kpi.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }

    const kpiSection = document.querySelector('.hero__kpis');
    if (kpiSection) {
        new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) animateCounters();
        }, { threshold: 0.3 }).observe(kpiSection);
    }

    // ---- Scroll reveal ----
    const reveals = document.querySelectorAll('.job, .edu-card, .skill-row, .pcard, .nda-note, .contact-card, .kpi');
    reveals.forEach(el => el.classList.add('scroll-in'));

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -30px 0px', threshold: 0.05 });

    reveals.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 4) * 0.06}s`;
        revealObs.observe(el);
    });

    // ---- Smooth scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

});