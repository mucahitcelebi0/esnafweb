// ===== AOS Init =====
document.addEventListener('DOMContentLoaded', function () {
    if (typeof AOS !== 'undefined') {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        AOS.init({
            duration: 700,
            once: true,
            offset: 60,
            easing: 'ease-out-cubic',
            disable: () => reduceMotion || window.innerWidth < 768
        });
    }

    // ===== Year =====
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ===== Header Scroll =====
    const header = document.getElementById('header');
    const onScroll = () => {
        if (window.scrollY > 60) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ===== Mobile Menu =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const closeMenu = () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
    };
    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
    };
    navToggle.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMenu(); });

    // ===== Active Nav Link on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const setActive = () => {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${id}"]`);
                if (active) active.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', setActive, { passive: true });

    // ===== Hero Slider =====
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
        let current = 0;
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 5000);
    }

    // ===== Contact Form -> WhatsApp =====
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = form.name.value.trim();
            const phone = form.phone.value.trim();
            const service = form.service.value;
            const message = form.message.value.trim();

            let text = `*Yeni Teklif Talebi*%0A%0A`;
            text += `*Ad Soyad:* ${encodeURIComponent(name)}%0A`;
            text += `*Telefon:* ${encodeURIComponent(phone)}%0A`;
            text += `*Hizmet:* ${encodeURIComponent(service)}%0A`;
            if (message) text += `*Mesaj:* ${encodeURIComponent(message)}%0A`;
            text += `%0A_Web sitesi üzerinden gönderilmiştir._`;

            window.open(`https://wa.me/905372277575?text=${text}`, '_blank');
        });
    }

    // ===== Phone Input Format =====
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '').slice(0, 11);
            if (v.length > 7) v = v.slice(0,4) + ' ' + v.slice(4,7) + ' ' + v.slice(7,9) + ' ' + v.slice(9,11);
            else if (v.length > 4) v = v.slice(0,4) + ' ' + v.slice(4,7) + ' ' + v.slice(7);
            else if (v.length > 0) v = v.slice(0,4) + ' ' + v.slice(4);
            e.target.value = v.trim();
        });
    }
});
