/*!
 * Shining★Miku - Scripts del tema
 */

window.addEventListener('DOMContentLoaded', () => {
    const CONTACT_EMAIL = 'shininghatsune@gmail.com';

    // Navbar: fondo al hacer scroll
    const nav = document.getElementById('mainNav');
    const shrinkNav = () => nav.classList.toggle('navbar-shrink', window.scrollY > 20);
    shrinkNav();
    document.addEventListener('scroll', shrinkNav, { passive: true });

    // Menú móvil
    const toggler = document.querySelector('.navbar-toggler');
    const menu = document.getElementById('navbarMenu');
    const setMenu = (open) => {
        menu.classList.toggle('open', open);
        nav.classList.toggle('menu-open', open);
        toggler.setAttribute('aria-expanded', String(open));
        toggler.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    toggler.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

    // Enlace activo según la sección visible
    const links = [...document.querySelectorAll('.nav-link')];
    const sections = links.map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
            });
        },
        { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));

    // Modal del portfolio
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        const fields = {
            image: document.getElementById('modalImage'),
            title: document.getElementById('modalTitle'),
            category: document.getElementById('modalCategory'),
            category2: document.getElementById('modalCategory2'),
            client: document.getElementById('modalClient'),
            description: document.getElementById('modalDescription'),
        };
        document.querySelectorAll('.portfolio-item').forEach((item) => {
            item.addEventListener('click', () => {
                const { image, client, category, description } = item.dataset;
                if (fields.image) {
                    fields.image.src = image;
                    fields.image.alt = 'Proyecto ' + client;
                }
                if (fields.title) fields.title.textContent = client;
                if (fields.client) fields.client.textContent = client;
                if (fields.category) fields.category.textContent = category;
                if (fields.category2) fields.category2.textContent = category;
                if (fields.description) fields.description.textContent = description;
                modal.showModal();
            });
        });
        const closeBtn = modal.querySelector('[data-close-modal]');
        if (closeBtn) closeBtn.addEventListener('click', () => modal.close());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.close();
        });
    }

    // Año del footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
