// ============================================
//  motion.js - كل الحركات والتأثيرات
// ============================================
(function () {
    document.documentElement.classList.add('js');
    const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // إخفاء شاشة التحميل
    addEventListener('load', () => setTimeout(() => document.body.classList.add('loaded'), 700));
    setTimeout(() => document.body.classList.add('loaded'), 2500);


    // فقاقيع في الهيدر
    const hero = document.querySelector('.hero');
    if (hero && !calm) for (let i = 0; i < 14; i++) {
        const b = document.createElement('span'), s = 8 + Math.random() * 26;
        b.className = 'bubble';
        b.style.cssText = `width:${s}px;height:${s}px;left:${Math.random() * 100}%;animation-duration:${7 + Math.random() * 8}s;animation-delay:${-Math.random() * 12}s`;
        hero.appendChild(b);
    }

    // الشريط المتحرك
    const track = document.querySelector('.marquee-track');
    if (track) track.innerHTML += track.innerHTML + track.innerHTML;

    // شريط التقدم + حركة الهيدر مع التمرير
    const bar = document.getElementById('progress'), hc = document.querySelector('.header-content');
    function onScroll() {
        const d = document.documentElement, y = d.scrollTop;
        bar.style.transform = `scaleX(${y / ((d.scrollHeight - d.clientHeight) || 1)})`;
        if (hc && y < 800 && !calm) { hc.style.transform = `translateY(${y * 0.22}px)`; hc.style.opacity = 1 - y / 650; }
    }
    addEventListener('scroll', onScroll, { passive: true });

    // ظهور عناوين الأقسام
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.3 });
        document.querySelectorAll('.section-title').forEach(t => io.observe(t));
    }

    // تأثيرات الماوس (كمبيوتر بس)
    if (fine && !calm) {
        const fl = [...document.querySelectorAll('.float')];
        addEventListener('mousemove', e => {
            const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
            fl.forEach((f, i) => f.style.translate = `${-x * (i % 3 + 1) * 16}px ${-y * (i % 3 + 1) * 16}px`);
        });
        document.addEventListener('pointermove', e => {          // ميل 3D + لمعة على الكارت
            const c = e.target.closest && e.target.closest('.item-card');
            if (!c) return;
            const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
            c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
            c.style.setProperty('--rx', (.5 - y) * 9 + 'deg'); c.style.setProperty('--ry', (x - .5) * 9 + 'deg');
        });
        document.addEventListener('pointerout', e => {
            const c = e.target.closest && e.target.closest('.item-card');
            if (c && !c.contains(e.relatedTarget)) { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); }
        });
    }

    // موجة (Ripple) عند الضغط على الأزرار
    document.addEventListener('pointerdown', e => {
        const b = e.target.closest && e.target.closest('.add-btn,.hero-cta,.cat-btn,.checkout-btn,.submit-btn');
        if (!b || calm) return;
        const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), o = document.createElement('span');
        o.className = 'ripple';
        o.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
        b.appendChild(o); setTimeout(() => o.remove(), 650);
    });

    // الصورة بتطير للسلة عند الإضافة
    let lastBtn = null;
    document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('.add-btn'); if (b) lastBtn = b; }, true);
    const baseToast = window.showToast;
    window.showToast = function (m) { baseToast(m); fly(lastBtn); };
    function fly(btn) {
        const fab = document.getElementById('cartFab'), img = btn && btn.closest('.item-card') && btn.closest('.item-card').querySelector('.item-image');
        if (!fab || !img) return;
        if (calm) { fab.classList.add('bump'); return; }
        const a = img.getBoundingClientRect(), t = fab.getBoundingClientRect(), g = img.cloneNode();
        g.className = 'fly';
        g.style.cssText = `left:${a.left}px;top:${a.top}px;width:${a.width}px;height:${a.height}px`;
        document.body.appendChild(g);
        requestAnimationFrame(() => {
            g.style.transform = `translate(${t.left + t.width / 2 - a.left - a.width / 2}px,${t.top + t.height / 2 - a.top - a.height / 2}px) scale(.07) rotate(200deg)`;
            g.style.opacity = '.25';
        });
        setTimeout(() => { g.remove(); fab.classList.remove('bump'); void fab.offsetWidth; fab.classList.add('bump'); }, 800);
    }
})();
