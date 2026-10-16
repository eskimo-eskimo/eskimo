// ===== إخفاء شاشة التحميل =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// احتياطي: لو الـ load اتأخر، اخفيها بعد 3 ثانية
setTimeout(() => {
    document.body.classList.add('loaded');
    const pre = document.getElementById('preloader');
    if (pre) pre.style.display = 'none';
}, 3000);

// ===== رقم الواتساب للمشاركة =====
const WHATSAPP_SHARE = (typeof WHATSAPP_NUMBER !== 'undefined') ? WHATSAPP_NUMBER : '201008541582';

let cart = [];

// ===== مفاتيح التخزين =====
const LS_LAST_ORDER = 'eskimo_last_order';
const LS_LAST_ORDER_TIME = 'eskimo_last_order_time';

// ===== تطبيع الأرقام العربية =====
function normalizeDigits(str) {
    if (!str) return '';
    const arabicIndic = '٠١٢٣٤٥٦٧٨٩';
    const easternArabic = '۰۱۲۳۴۵۶۷۸۹';
    return String(str)
        .replace(/[٠-٩]/g, d => arabicIndic.indexOf(d))
        .replace(/[۰-۹]/g, d => easternArabic.indexOf(d));
}

// ===== تطبيع النص العربي =====
function normalizeArabic(text) {
    return String(text || '')
        .replace(/[أإآا]/g, 'ا')
        .replace(/ى/g, 'ي')
        .replace(/ة/g, 'ه')
        .replace(/[ًٌٍَُِّْـ]/g, '')
        .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
        .toLowerCase()
        .trim();
}

// ===== مسار الصور =====
function asset(p) {
    return /^(https?:|data:|\.\.\/)/.test(p) ? p : '../' + p;
}

// ===== التشغيل =====
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderMenu();
    renderPopular();
    renderCart();
    setupImages();
    setupBackgroundPhoto();
    setupReveal();
    setupScrollSpy();
    setupSearch();
    setupLastOrder();
});

// ===== خلفية الموقع =====
function setupBackgroundPhoto() {
    const probe = new Image();
    probe.onload = () => document.body.classList.add('has-bg-photo');
    probe.src = asset('images/logo.png');
}

// ===== ظهور الكروت =====
function setupReveal() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            const el = en.target;
            el.classList.add('visible');
            io.unobserve(el);
            setTimeout(() => {
                el.classList.remove('reveal', 'visible');
                el.style.transitionDelay = '';
            }, 900);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.item-card').forEach((card, i) => {
        card.classList.add('reveal');
        card.style.transitionDelay = (i % 4) * 70 + 'ms';
        io.observe(card);
    });
}

// ===== تمييز القسم الحالي =====
function setupScrollSpy() {
    if (!('IntersectionObserver' in window)) return;
    const btns = document.querySelectorAll('.cat-btn');
    const spy = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            const idx = MENU_DATA.findIndex(c => c.id === en.target.id);
            if (idx < 0 || !btns[idx]) return;
            btns.forEach(b => b.classList.remove('active'));
            btns[idx].classList.add('active');
            btns[idx].scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
        });
    }, { rootMargin: '-35% 0px -60% 0px' });
    MENU_DATA.forEach(c => {
        const sec = document.getElementById(c.id);
        if (sec) spy.observe(sec);
    });
}

// ===== رسم الأقسام =====
function renderCategories() {
    const nav = document.getElementById('categoriesNav');
    nav.innerHTML = MENU_DATA.map((cat, idx) => `
        <button class="cat-btn ${idx === 0 ? 'active' : ''}" 
                onclick="scrollToSection('${cat.id}', this)">
            ${cat.title} <span class="cat-icon">${cat.icon}</span>
        </button>
    `).join('');
}

// ===== رسم المنيو =====
function renderMenu() {
    const container = document.getElementById('menuContainer');

    container.innerHTML = MENU_DATA
        .filter(cat => cat.id !== 'popular-cat')
        .map(cat => `
        <section id="${cat.id}">
            <h2 class="section-title">
                <span class="section-icon">${cat.icon}</span>
                <span class="section-text">${cat.title}</span>
                <small>${cat.subtitle}</small>
            </h2>
            <div class="items-grid">
                ${cat.items.map(item => renderItemCard(cat.id, item)).join('')}
            </div>
        </section>
    `).join('');
}

// ===== Placeholder SVG =====
function placeholderSVG(emoji) {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">' +
        '<rect width="400" height="400" fill="#eef2ff"/>' +
        '<text x="50%" y="52%" font-size="120" text-anchor="middle" dominant-baseline="middle">' + emoji + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function getCatIcon(catId) {
    const cat = MENU_DATA.find(c => c.id === catId);
    return cat && cat.icon ? cat.icon : '🍽️';
}

// ===== البحث عن الصور =====
const STOP_WORDS = ['single','double','mix','mixed','iced','ice','super','power','extra','special','big','eskimo','box','ripe','fatta'];
const wikiCache = (() => {
    try { return JSON.parse(localStorage.getItem('eskimo_wiki') || '{}'); }
    catch (e) { return {}; }
})();

function catHint(catId) {
    return (typeof CATEGORY_QUERY !== 'undefined' && CATEGORY_QUERY[catId]) || '';
}

function nameHash(item) {
    let h = 0;
    for (const ch of item.name) h = (h * 31 + ch.charCodeAt(0)) % 1000;
    return h;
}

function imageWords(item) {
    return (item.image || '').split('/').pop().replace(/\.[a-z0-9]+$/i, '').split(/[-_]/).filter(w => w && !STOP_WORDS.includes(w));
}

async function wikiSearch(q) {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=10' +
        '&gsrsearch=' + encodeURIComponent(q + ' filetype:bitmap') +
        '&prop=imageinfo&iiprop=url|mime&iiurlwidth=480&format=json&origin=*';
    const res = await fetch(url);
    if (!res.ok) throw new Error('wiki');
    const d = await res.json();
    return Object.values((d.query && d.query.pages) || {}).sort((x, y) => x.index - y.index)
        .map(p => p.imageinfo && p.imageinfo[0]).filter(i => i && /jpeg|png/.test(i.mime) && i.thumburl).map(i => i.thumburl);
}

async function wikiImage(item, catId) {
    const hint = catHint(catId);
    const specific = item.query || [...new Set([...imageWords(item), hint])].join(' ');
    for (const q of [specific, hint]) {
        if (!q) continue;
        if (!(q in wikiCache)) {
            try {
                wikiCache[q] = await wikiSearch(q);
                localStorage.setItem('eskimo_wiki', JSON.stringify(wikiCache));
            } catch (e) { return ''; }
        }
        const list = wikiCache[q];
        if (list.length) return list[q === specific ? 0 : nameHash(item) % list.length];
    }
    return '';
}

function webImage(item, catId) {
    const kw = (item.query ? item.query.trim().split(/\s+/) : [imageWords(item)[0], catHint(catId)]).filter(Boolean).join(',');
    return 'https://loremflickr.com/480/360/' + kw + '?lock=' + nameHash(item);
}

function imageSources(catId, item) {
    const list = [];
    if (item.image && (/^https?:/.test(item.image) || (typeof LOCAL_IMAGES !== 'undefined' && LOCAL_IMAGES))) {
        list.push(() => asset(item.image));
    }
    if (typeof AUTO_WEB_IMAGES !== 'undefined' && AUTO_WEB_IMAGES) {
        list.push(() => wikiImage(item, catId));
        list.push(() => webImage(item, catId));
    }
    if (typeof DEFAULT_IMAGES !== 'undefined' && DEFAULT_IMAGES[catId]) {
        list.push(() => asset(DEFAULT_IMAGES[catId]));
    }
    return list;
}

function imgFallback(img) {
    const cat = MENU_DATA.find(c => c.id === img.dataset.cat);
    const item = cat && cat.items.find(i => i.name === img.dataset.name);
    const list = item ? imageSources(cat.id, item) : [];
    const i = Number(img.dataset.i) || 0;
    img.dataset.i = i + 1;
    if (i >= list.length) {
        img.onerror = null;
        img.src = placeholderSVG(cat ? cat.icon : '🍽️');
        img.classList.add('img-fallback');
        return;
    }
    Promise.resolve(list[i]()).then(u => {
        if (u) img.src = u;
        else imgFallback(img);
    }).catch(() => imgFallback(img));
}

function setupImages() {
    const imgs = document.querySelectorAll('.item-image[data-cat]');
    if (!('IntersectionObserver' in window)) {
        imgs.forEach(imgFallback);
        return;
    }
    const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) {
            io.unobserve(e.target);
            imgFallback(e.target);
        }
    }), { rootMargin: '300px' });
    imgs.forEach(i => io.observe(i));
}

function escAttr(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;');
}

// ===== رسم كارت المنتج =====
function renderItemCard(catId, item) {
    const pricesHtml = item.prices.map((p, i) => {
        let label = "";
        if (item.prices.length === 2) {
            if (catId === "frappe") label = i === 0 ? "بدون كريمة: " : "بكريمة: ";
            else if (catId === "pancakes") label = i === 0 ? "12 قطعة: " : "24 قطعة: ";
            else label = i === 0 ? "ساندوتش: " : "مفتوح: ";
        }
        const priceText = p > 0 ? `${label}${p} ج.م` : "غير متاح";
        return `<span class="price-tag">${priceText}</span>`;
    }).join('');

    const newBadge = item.isNew ? `<span class="new-badge">NEW</span>` : '';
    const ingredients = item.ingredients
        ? `<div class="item-ingredients">${item.ingredients}</div>`
        : `<div class="item-ingredients"></div>`;

    return `
        <div class="item-card" data-cat="${escAttr(catId)}" data-name="${escAttr(item.name)}">
            <div class="item-image-wrapper">
                <img alt="${escAttr(item.name)}"
                     class="item-image"
                     data-cat="${catId}" data-name="${escAttr(item.name)}"
                     loading="lazy"
                     onerror="imgFallback(this)">
                ${item.isNew ? '<span class="image-badge">NEW</span>' : ''}
                ${item.popular ? '<span class="popular-badge">Popular</span>' : ''}
                ${item.bestSeller ? '<span class="best-badge">🔥 الأكثر مبيعاً</span>' : ''}
                ${item.discount ? `<span class="discount-badge">خصم ${item.discount}%</span>` : ''}
            </div>
            <div class="item-body">
                <div class="item-name">${item.name} ${newBadge}</div>
                ${ingredients}
                <div class="item-prices">${pricesHtml}</div>
                <div class="item-actions">
                    <button class="add-btn" onclick="addToCart('${catId}', '${item.name.replace(/'/g, "\\'")}')">
                        + أضف للسلة
                    </button>
                    <button class="share-btn" 
                            title="شارك على واتساب"
                            aria-label="شارك على واتساب"
                            onclick="shareProduct('${catId}', '${item.name.replace(/'/g, "\\'")}')">
                        📤
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ===== التمرير لقسم =====
function scrollToSection(id, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== إضافة للسلة =====
function addToCart(catId, itemName) {
    const category = MENU_DATA.find(c => c.id === catId);
    if (!category) return;
    const item = category.items.find(i => i.name === itemName);
    if (!item) return;

    let selectedPriceIndex = 0;
    if (item.prices.filter(p => p > 0).length > 1) {
        const priceOptions = item.prices.map((p, i) => {
            if (p === 0) return null;
            let label = `سعر ${p} ج.م`;
            if (item.prices.length === 2) {
                if (catId === "frappe") label = i === 0 ? `بدون كريمة - ${p} ج.م` : `بكريمة - ${p} ج.م`;
                else if (catId === "pancakes") label = i === 0 ? `12 قطعة - ${p} ج.م` : `24 قطعة - ${p} ج.م`;
                else label = i === 0 ? `ساندوتش - ${p} ج.م` : `مفتوح - ${p} ج.م`;
            }
            return { index: i, label, price: p };
        }).filter(Boolean);

        const choice = prompt(`اختار النوع:\n${priceOptions.map((o, i) => `${i + 1}. ${o.label}`).join('\n')}`);
        if (!choice) return;
        const choiceIdx = parseInt(choice) - 1;
        if (isNaN(choiceIdx) || !priceOptions[choiceIdx]) return;
        selectedPriceIndex = priceOptions[choiceIdx].index;
    } else {
        selectedPriceIndex = item.prices.findIndex(p => p > 0);
        if (selectedPriceIndex === -1) {
            alert("هذا الصنف غير متاح حالياً");
            return;
        }
    }

    const price = item.prices[selectedPriceIndex];

    const qtyInput = prompt(`الكمية المطلوبة من "${itemName}" (${price} ج.م):`, "1");
    if (qtyInput === null) return;
    const qty = parseInt(normalizeDigits(qtyInput), 10);
    if (isNaN(qty) || qty < 1 || qty > 50) {
        alert("من فضلك اكتب كمية صحيحة (من 1 إلى 50)");
        return;
    }

    const existing = cart.find(c => c.name === itemName && c.price === price);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            name: itemName,
            price: price,
            qty: qty,
            category: category.title,
            catId: catId,
            image: item.image || '',
            query: item.query || ''
        });
    }

    renderCart();
    showToast(`✅ تمت إضافة ${qty} × ${itemName} — ${qty * price} ج.م`);
}

// ===== رسم السلة =====
function renderCart() {
    const itemsContainer = document.getElementById('cartItems');
    const badge = document.getElementById('cartBadge');
    const totalEl = document.getElementById('cartTotal');

    const totalItems = cart.length;
    const totalPrice = cart.reduce((s, i) => s + i.qty * i.price, 0);

    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
    totalEl.textContent = `${totalPrice} ج.م`;

    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="icon">🛒</div>
                <p>السلة فاضية</p>
                <p style="font-size:0.85rem;margin-top:8px">اختار من المنيو وابدأ طلبك</p>
            </div>
        `;
        return;
    }

    itemsContainer.innerHTML = cart.map((item, idx) => `
        <div class="cart-item" data-offer="${item.catId === 'offers' ? 'true' : 'false'}">
            <img class="cart-item-image"
                 alt="${escAttr(item.name)}"
                 data-cat="${item.catId}" data-name="${escAttr(item.name)}"
                 onerror="imgFallback(this)">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} ج.م × ${item.qty} = ${item.price * item.qty} ج.م</div>
            </div>
            <div class="qty-controls">
                <button class="qty-btn" onclick="changeQty(${idx}, -1)">−</button>
                <span class="qty-value">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
                <button class="remove-btn" onclick="removeItem(${idx})">🗑</button>
            </div>
        </div>
    `).join('');
    itemsContainer.querySelectorAll('img[data-cat]').forEach(imgFallback);
}

function changeQty(idx, delta) {
    cart[idx].qty += delta;
    if (cart[idx].qty < 1) cart[idx].qty = 1;
    renderCart();
}

function removeItem(idx) {
    cart.splice(idx, 1);
    renderCart();
}

function openCart() { document.getElementById('cartModal').classList.add('active'); }
function closeCart() { document.getElementById('cartModal').classList.remove('active'); }

function openCheckout() {
    if (cart.length === 0) {
        alert("السلة فاضية!");
        return;
    }
    closeCart();
    document.getElementById('checkoutModal').classList.add('active');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

// ===== إرسال الطلب =====
function submitOrder(e) {
    e.preventDefault();

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const notes = document.getElementById('custNotes').value.trim();

    const phoneRegex = /^01[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').textContent = "رقم الموبايل لازم يكون 11 رقم ويبدأ بـ 01";
        return;
    }
    document.getElementById('phoneError').textContent = "";

    const totalPrice = cart.reduce((s, i) => s + i.qty * i.price, 0);

    // ===== بناء الرسالة =====
    let message = '';

    message += '🍦 *ESKIMO Fresh Bar*\n';
    message += '🆕 *طلب جديد*\n';
    message += '━━━━━━━━━━━━━━━\n\n';

    message += '👤 *بيانات العميل:*\n';
    message += `• الاسم: ${name}\n`;
    message += `• الموبايل: ${phone}\n`;
    message += `• العنوان: ${address}\n`;
    if (notes) {
        message += `• ملاحظات: ${notes}\n`;
    }
    message += '\n━━━━━━━━━━━━━━━\n\n';

    message += '🛒 *تفاصيل الطلب:*\n\n';

    cart.forEach((item, idx) => {
        message += `*${idx + 1}) ${item.name}*\n`;
        message += `   الكمية: ${item.qty}\n`;
        message += `   السعر: ${item.price} ج.م\n`;
        message += `   الإجمالي: ${item.qty * item.price} ج.م\n\n`;
    });

    message += '━━━━━━━━━━━━━━━\n';
    message += `💰 *الإجمالي النهائي: ${totalPrice} ج.م*\n`;
    message += '━━━━━━━━━━━━━━━\n\n';
    message += '🙏 شكراً لاختيارك إسكيمو!';

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    saveLastOrder();

    setTimeout(() => {
        cart = [];
        renderCart();
        closeCheckout();
        updateLastOrderBtn();
        document.getElementById('customerForm').reset();
    }, 500);
}

// ===== Toast =====
function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: #25D366;
        color: #fff;
        padding: 12px 20px;
        border-radius: 12px;
        font-weight: 700;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 500;
        animation: slideUp 0.3s;
        font-family: 'Cairo', sans-serif;
        direction: rtl;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ===== غلق النوافذ عند الضغط على الخلفية =====
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// ============================================
//   1. البحث الفوري
// ============================================
let searchCache = null;

function buildSearchIndex() {
    if (searchCache) return searchCache;
    searchCache = [];
    MENU_DATA.forEach(cat => {
        cat.items.forEach(item => {
            const price = item.prices.find(p => p > 0) || 0;
            searchCache.push({
                item,
                catId: cat.id,
                catTitle: cat.title,
                catIcon: cat.icon,
                price,
                nameNorm: normalizeArabic(item.name),
                queryNorm: normalizeArabic(item.query || ''),
                ingNorm: normalizeArabic(item.ingredients || '')
            });
        });
    });
    return searchCache;
}

function doSearch(q) {
    const nq = normalizeArabic(q);
    if (!nq) return [];
    const idx = buildSearchIndex();
    const results = [];
    for (const row of idx) {
        const hay = row.nameNorm + ' ' + row.queryNorm + ' ' + row.ingNorm + ' ' + normalizeArabic(row.catTitle);
        const pos = hay.indexOf(nq);
        if (pos >= 0) {
            results.push({
                ...row,
                score: pos === 0 ? 0 : (row.nameNorm.startsWith(nq) ? 1 : (row.nameNorm.includes(nq) ? 2 : 3))
            });
        }
    }
    return results.sort((a, b) => a.score - b.score || a.item.name.localeCompare(b.item.name)).slice(0, 12);
}

function highlightMatch(text, q) {
    if (!q) return escAttr(text);
    const nText = normalizeArabic(text);
    const nQ = normalizeArabic(q);
    const pos = nText.indexOf(nQ);
    if (pos < 0) return escAttr(text);
    const before = text.slice(0, pos);
    const match = text.slice(pos, pos + q.length);
    const after = text.slice(pos + q.length);
    return escAttr(before) + '<mark>' + escAttr(match) + '</mark>' + escAttr(after);
}

function renderSuggestions(results, q) {
    const box = document.getElementById('searchSuggestions');
    if (!box) return;
    if (!results.length) {
        box.innerHTML = `
            <div class="search-empty">
                <span class="em">🔍</span>
                مفيش نتيجة لـ "<b>${escAttr(q)}</b>"
            </div>`;
        box.hidden = false;
        return;
    }
    box.innerHTML = results.map((r, i) => `
        <div class="sug-item ${i === 0 ? 'active' : ''}"
             data-cat="${r.catId}"
             data-name="${escAttr(r.item.name)}">
            <img class="sug-thumb" alt="" loading="lazy"
                 data-cat="${r.catId}" data-name="${escAttr(r.item.name)}"
                 onerror="imgFallback(this)">
            <div class="sug-info">
                <div class="sug-name">${highlightMatch(r.item.name, q)}</div>
                <div class="sug-cat">${r.catIcon} ${escAttr(r.catTitle)}</div>
            </div>
            <div class="sug-price">${r.price > 0 ? r.price + ' ج.م' : '—'}</div>
        </div>
    `).join('');
    box.hidden = false;
    box.querySelectorAll('img[data-cat]').forEach(imgFallback);
}

function closeSuggestions() {
    const box = document.getElementById('searchSuggestions');
    if (box) box.hidden = true;
}

let searchDebounce = null;
function setupSearch() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('searchClear');
    const box = document.getElementById('searchSuggestions');
    if (!input || !clearBtn || !box) return;

    input.addEventListener('input', () => {
        clearTimeout(searchDebounce);
        const q = input.value.trim();
        clearBtn.classList.toggle('show', q.length > 0);
        if (!q) { closeSuggestions(); return; }
        searchDebounce = setTimeout(() => {
            renderSuggestions(doSearch(q), q);
        }, 120);
    });

    input.addEventListener('focus', () => {
        const q = input.value.trim();
        if (q) renderSuggestions(doSearch(q), q);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { closeSuggestions(); input.blur(); return; }
        if (e.key === 'Enter') {
            const first = box.querySelector('.sug-item');
            if (first) first.click();
            return;
        }
        const items = [...box.querySelectorAll('.sug-item')];
        if (!items.length) return;
        const cur = items.findIndex(el => el.classList.contains('active'));
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            items.forEach(el => el.classList.remove('active'));
            items[(cur + 1) % items.length].classList.add('active');
            items[(cur + 1) % items.length].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            items.forEach(el => el.classList.remove('active'));
            const n = (cur - 1 + items.length) % items.length;
            items[n].classList.add('active');
            items[n].scrollIntoView({ block: 'nearest' });
        }
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.classList.remove('show');
        closeSuggestions();
        input.focus();
    });

    box.addEventListener('click', (e) => {
        const el = e.target.closest('.sug-item');
        if (!el) return;
        gotoProduct(el.dataset.cat, el.dataset.name);
        closeSuggestions();
        input.blur();
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar-wrap') && !e.target.closest('.search-suggestions')) {
            closeSuggestions();
        }
    });

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            input.focus();
            input.select();
        }
    });
}

function gotoProduct(catId, itemName) {
    const card = document.querySelector(
        `.item-card[data-cat="${CSS.escape(catId)}"][data-name="${CSS.escape(itemName)}"]`
    );
    if (!card) return;
    const cat = document.getElementById(catId);
    if (cat && cat.style.display === 'none') cat.style.display = '';

    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('highlight-pulse');
    setTimeout(() => card.classList.remove('highlight-pulse'), 1800);
}

// ============================================
//   قسم الأكثر طلباً - تصميم فخم
// ============================================
function renderPopular() {
    const popular = [];
    MENU_DATA.forEach(cat => {
        cat.items.forEach(item => {
            if (item.popular || item.bestSeller) {
                popular.push({ catId: cat.id, item });
            }
        });
    });

    if (!popular.length) return;

    const container = document.getElementById('menuContainer');
    const section = document.createElement('section');
    section.id = 'popular-section';
    section.className = 'popular-section';

    const cardsHtml = popular.map((p, idx) => {
        const price = p.item.prices.find(x => x > 0) || 0;
        return `
            <div class="popular-card rank-${idx + 1}">
                <div class="rank-badge">#${idx + 1}</div>
                <div class="popular-img-wrap">
                    <img alt="${escAttr(p.item.name)}"
                         class="item-image"
                         data-cat="${p.catId}"
                         data-name="${escAttr(p.item.name)}"
                         loading="lazy"
                         onerror="imgFallback(this)">
                </div>
                <div class="popular-body">
                    <h3 class="popular-name">${p.item.name}</h3>
                    <p class="popular-ing">${p.item.ingredients || ''}</p>
                    <div class="popular-footer">
                        <span class="popular-price">${price} ج.م</span>
                        <button class="popular-add" 
                                onclick="addToCart('${p.catId}', '${p.item.name.replace(/'/g, "\\'")}')">
                            + أضف
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    section.innerHTML = `
        <div class="popular-header">
            <span class="popular-crown">👑</span>
            <h2 class="popular-title">الأكثر طلباً</h2>
            <p class="popular-sub">المنتجات المفضلة عند عملائنا</p>
        </div>
        <div class="popular-scroll">
            ${cardsHtml}
        </div>
    `;

    container.insertBefore(section, container.firstChild);

    section.querySelectorAll('.item-image[data-cat]').forEach(imgFallback);
}

// ============================================
//   3. طلبي السابق
// ============================================
function saveLastOrder() {
    if (!cart.length) return;
    try {
        localStorage.setItem(LS_LAST_ORDER, JSON.stringify(cart));
        localStorage.setItem(LS_LAST_ORDER_TIME, String(Date.now()));
    } catch (e) {}
}

function getLastOrder() {
    try {
        const raw = localStorage.getItem(LS_LAST_ORDER);
        if (!raw) return null;
        const items = JSON.parse(raw);
        if (!Array.isArray(items) || !items.length) return null;
        return items;
    } catch (e) { return null; }
}

function updateLastOrderBtn() {
    const btn = document.getElementById('lastOrderBtn');
    if (!btn) return;
    const last = getLastOrder();
    btn.classList.toggle('hidden', !last);
}

function setupLastOrder() {
    const btn = document.getElementById('lastOrderBtn');
    if (!btn) return;

    updateLastOrderBtn();

    btn.addEventListener('click', () => {
        const last = getLastOrder();
        if (!last || !last.length) return;

        const totalItems = last.reduce((s, i) => s + i.qty, 0);
        const totalPrice = last.reduce((s, i) => s + i.qty * i.price, 0);

        if (!confirm(`عايز ترجّع آخر طلب؟\n${last.length} صنف (${totalItems} قطعة) بإجمالي ${totalPrice} ج.م`)) return;

        last.forEach(item => {
            const existing = cart.find(c => c.name === item.name && c.price === item.price);
            if (existing) existing.qty += item.qty;
            else cart.push({ ...item });
        });

        renderCart();
        openCart();
        showToast(`✅ تم استرجاع ${last.length} صنف (${totalItems} قطعة)`);
    });
}

// ============================================
//   4. مشاركة المنتج
// ============================================
function shareProduct(catId, itemName) {
    const category = MENU_DATA.find(c => c.id === catId);
    if (!category) return;
    const item = category.items.find(i => i.name === itemName);
    if (!item) return;

    const price = item.prices.find(p => p > 0) || 0;
    const pricesText = item.prices.filter(p => p > 0)
        .map((p, i, arr) => {
            if (arr.length === 1) return `${p} ج.م`;
            if (catId === 'frappe') return (i === 0 ? 'بدون كريمة: ' : 'بكريمة: ') + `${p} ج.م`;
            if (catId === 'pancakes') return (i === 0 ? '12 قطعة: ' : '24 قطعة: ') + `${p} ج.م`;
            return (i === 0 ? 'ساندوتش: ' : 'مفتوح: ') + `${p} ج.م`;
        }).join(' | ');

    let msg = `*🍦 ESKIMO Fresh Bar*\n`;
    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `*${item.name}*\n`;
    if (item.ingredients) msg += `_${item.ingredients}_\n`;
    msg += `💰 ${pricesText || (price ? price + ' ج.م' : 'غير متاح')}\n`;
    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `عايز أطلب ده من ESKIMO 🛒`;

    const url = `https://wa.me/${WHATSAPP_SHARE}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

// ============================================
//   5. عرض البان كيك ميني - إضافة للسلة
// ============================================
function addOfferToCart() {
    const offerName = 'عرض 2 بان كيك ميني';
    const offerPrice = 75;
    const offerImage = 'images/eskiom_offer.jpg';

    const existing = cart.find(c => c.name === offerName && c.price === offerPrice);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            name: offerName,
            price: offerPrice,
            qty: 1,
            category: 'عروض',
            catId: 'offers',
            image: offerImage,
            query: ''
        });
    }

    renderCart();
    showToast(`✅ تمت إضافة ${offerName} — ${offerPrice} ج.م`);

    // افتح السلة تلقائياً بعد نص ثانية عشان يشوف
    setTimeout(() => openCart(), 400);
}