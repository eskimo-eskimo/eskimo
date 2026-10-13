// ============================================
//  art.js - رسومات SVG لكل منتج بتتولد بالكود
//  (بتظهر لحد ما تحط صور حقيقية في images/)
// ============================================
const ART_KIND = {
    "hot-coffee": "cup", "iced-coffee": "iced", "fresh-juices": "glass", "mango-world": "glass", "vitamin-blends": "glass",
    "energy-corner": "glass", "smoothies": "glass", "lolita": "glass", "milkshakes": "shake", "cocktails": "glass",
    "boreo-oreo": "shake", "mojito": "glass", "frappe": "iced", "yogurt": "bowl", "waffle": "waffle",
    "fakhfakhina": "bowl", "freska": "bowl", "boxes": "waffle", "pancakes": "waffle", "ice-cream": "cone"
};

const ART_COLORS = [
    [/بستاشيو/, '#8DB255'], [/بلو|بلوبيري/, '#4A78E0'], [/مانجو|ميرت|قشطة|كهرمان/, '#FFB300'],
    [/فراولة|توت|بري|ريد|بطوط/, '#E8456B'], [/برتقال|جزر|يوسفي|فرنسي/, '#FB8C00'],
    [/ليمون|نعناع|كيوي|أخضر|جرين|تفاح|زست|كراش|هامر/, '#8BC34A'], [/أفوكادو/, '#9CCC65'], [/رمان/, '#C2185B'],
    [/بطيخ/, '#EF5350'], [/أناناس|باشون|صن/, '#FDD835'], [/موز/, '#FFD54F'], [/عنب|برقوق/, '#8E24AA'],
    [/جوافة/, '#F48FB1'], [/خوخ|كنتلوب/, '#FFAB76'],
    [/نوتيلا|شيكولات|شوكل|موكا|قهوة|كوفي|كراميل|تركي|نسكافيه|سبانش|لاتي|كابتشينو|ميكاتو|فرابية|بوريو|أوريو|لوتس|سنيكرز|تويكس|هوهوز|بندق|فرنساوي|كورتادو|فلات|افوجاتو|سبريسو|أمريكانو|بلح|مورو/, '#7B4A32'],
    [/فانيليا|زبادي|سادة|ايس كريم|آيس كريم|لبن/, '#F3DDA0']
];

function artMix(hex, t, to) {
    const n = parseInt(hex.slice(1), 16), m = parseInt((to || '#ffffff').slice(1), 16);
    const f = s => Math.round(((n >> s) & 255) + (((m >> s) & 255) - ((n >> s) & 255)) * t);
    return 'rgb(' + f(16) + ',' + f(8) + ',' + f(0) + ')';
}

function artColor(item) {
    for (const [re, c] of ART_COLORS) if (re.test(item.name)) return c;
    const p = ['#26A69A', '#5C6BC0', '#EC407A', '#FF7043'];
    let h = 0; for (const ch of item.name) h = (h * 31 + ch.charCodeAt(0)) % 97;
    return p[h % p.length];
}

function productArt(catId, item) {
    const c = artColor(item), kind = ART_KIND[catId] || 'glass';
    const dark = artMix(c, .35, '#000000'), light = artMix(c, .45), gold = '#E0A84B';
    const glass = '<path d="M130 110 L270 110 L250 340 Q200 352 150 340 Z" fill="#fff" fill-opacity=".55" stroke="#fff" stroke-width="5"/>' +
        '<path d="M138 165 L262 165 L249 330 Q200 341 151 330 Z" fill="' + c + '"/>' +
        '<path d="M150 180 L158 320" stroke="#fff" stroke-opacity=".45" stroke-width="8" stroke-linecap="round"/>';
    const straw = '<path d="M232 40 L208 215" stroke="' + dark + '" stroke-width="13" stroke-linecap="round"/>';
    let art = '';
    if (kind === 'glass') art = straw + glass + '<circle cx="272" cy="112" r="27" fill="' + light + '"/><circle cx="272" cy="112" r="18" fill="' + c + '" fill-opacity=".8"/>';
    if (kind === 'iced') art = straw + glass +
        '<rect x="158" y="172" width="46" height="46" rx="9" fill="#fff" fill-opacity=".6" transform="rotate(-12 181 195)"/>' +
        '<rect x="208" y="196" width="42" height="42" rx="9" fill="#fff" fill-opacity=".5" transform="rotate(14 229 217)"/>';
    if (kind === 'shake') art = straw + glass + '<path d="M132 114 Q200 30 268 114 Z" fill="#fff"/><circle cx="200" cy="68" r="13" fill="#D32F2F"/>';
    if (kind === 'cup') art = '<ellipse cx="200" cy="318" rx="125" ry="22" fill="#fff"/>' +
        '<path d="M288 215 q52 0 42 40 q-10 32 -46 30" stroke="#fff" stroke-width="15" fill="none" stroke-linecap="round"/>' +
        '<path d="M110 190 L290 190 Q285 300 200 308 Q115 300 110 190Z" fill="#fff"/><ellipse cx="200" cy="190" rx="90" ry="17" fill="' + c + '"/>' +
        '<g stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".85"><path d="M170 150 q-15 -25 0 -45 q15 -20 0 -40"/><path d="M215 150 q-15 -25 0 -45 q15 -20 0 -40"/></g>';
    if (kind === 'bowl') art = '<circle cx="150" cy="212" r="50" fill="' + c + '"/><circle cx="218" cy="190" r="54" fill="' + light + '"/><circle cx="268" cy="224" r="40" fill="' + dark + '"/>' +
        '<path d="M85 228 Q200 350 315 228 Z" fill="#fff"/><rect x="80" y="222" width="240" height="14" rx="7" fill="#fff"/>' +
        '<g fill="#E8456B"><rect x="150" y="150" width="8" height="18" rx="4" transform="rotate(30 154 159)"/><rect x="210" y="126" width="8" height="18" rx="4" transform="rotate(-25 214 135)"/></g><circle cx="190" cy="152" r="8" fill="#FFD54F"/>';
    if (kind === 'waffle') { let g = ''; for (let i = 1; i < 4; i++) g += '<path d="M' + (110 + 45 * i) + ' 130 V310 M110 ' + (130 + 45 * i) + ' H290" stroke="#C68A2E" stroke-width="6"/>';
        art = '<ellipse cx="200" cy="318" rx="140" ry="20" fill="#fff"/><rect x="110" y="130" width="180" height="180" rx="28" fill="' + gold + '" stroke="#C68A2E" stroke-width="6"/>' + g +
        '<path d="M120 150 Q200 120 280 150 Q302 190 270 215 Q240 252 200 232 Q150 262 125 215 Q98 180 120 150Z" fill="' + c + '" fill-opacity=".92"/><circle cx="200" cy="190" r="26" fill="#fff" fill-opacity=".85"/>'; }
    if (kind === 'cone') art = '<path d="M148 205 L200 352 L252 205 Z" fill="' + gold + '"/><path d="M165 235 L235 235 M178 275 L222 275 M158 210 L228 320 M242 210 L172 320" stroke="#C68A2E" stroke-width="4"/>' +
        '<circle cx="200" cy="170" r="64" fill="' + c + '"/><circle cx="200" cy="108" r="46" fill="' + light + '"/><circle cx="200" cy="64" r="12" fill="#D32F2F"/>';
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="' + artMix(c, .88) + '"/><stop offset="1" stop-color="' + artMix(c, .62) + '"/></linearGradient></defs>' +
        '<rect width="400" height="400" fill="url(#g)"/><circle cx="335" cy="70" r="85" fill="#fff" fill-opacity=".25"/><circle cx="55" cy="340" r="60" fill="#fff" fill-opacity=".2"/>' +
        (kind === 'cup' || kind === 'waffle' ? '' : '<ellipse cx="200" cy="350" rx="105" ry="13" fill="#000" fill-opacity=".12"/>') + art + '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}