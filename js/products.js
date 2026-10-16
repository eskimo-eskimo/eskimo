
const MENU_DATA = [

    // ===== HOT COFFEE =====
    {
        id: "hot-coffee",
        title: "قهوة ساخنة",
        subtitle: "HOT COFFEE",
        icon: "☕",
        items: [
            { name: "تركي سنجل", image: "images/hot-coffee/turkish-single.jpg", prices: [30] },
            { name: "تركي دابل", image: "images/hot-coffee/turkish-double.jpg", prices: [40] },
            { name: "بندق", image: "images/hot-coffee/hazelnut.jpg", prices: [40] },
            { name: "فرنساوي", image: "images/hot-coffee/french.jpg", prices: [40] },
            { name: "هوت شوكليت", image: "images/hot-coffee/hot-chocolate.jpg", prices: [40] },
            { name: "كابتشينو", image: "images/hot-coffee/cappuccino.jpg", prices: [55] },
            { name: "لاتية", image: "images/hot-coffee/latte.jpg", prices: [50], isNew: true },
            { name: "فلات وايت", image: "images/hot-coffee/flat-white.jpg", prices: [60] },
            { name: "كورتادو", image: "images/hot-coffee/cortado.jpg", prices: [50], isNew: true },
            { name: "سبريسو سنجل", image: "images/hot-coffee/espresso-single.jpg", prices: [40] },
            { name: "سبريسو دبل", image: "images/hot-coffee/espresso-double.jpg", prices: [55] },
            { name: "ميكاتو سنجل", image: "images/hot-coffee/macchiato-single.jpg", prices: [55] },
            { name: "ميكاتو دبل", image: "images/hot-coffee/macchiato-double.jpg", prices: [70] },
            { name: "موكا", image: "images/hot-coffee/mocha.jpg", prices: [60] },
            { name: "وايت موكا", image: "images/hot-coffee/white-mocha.jpg", prices: [60] },
            { name: "سبانش لاتية", image: "images/hot-coffee/spanish-latte.jpg", prices: [60] },
            { name: "كراميل ميكاتو", image: "images/hot-coffee/caramel-macchiato.jpg", prices: [60] },
            { name: "نسكافيه حليب", image: "images/hot-coffee/nescafe-milk.jpg", prices: [50] },
            { name: "نسكافيه بلاك", image: "images/hot-coffee/nescafe-black.jpg", prices: [40] },
            { name: "افوجاتو", image: "images/hot-coffee/affogato.jpg", prices: [60] },
        ]
    },

    // ===== ICED COFFEE =====
    {
        id: "iced-coffee",
        title: "قهوة مثلجة",
        subtitle: "ICED COFFEE",
        icon: "🧊",
        items: [
            { name: "آيس كوفي لوتس إسكيمو", image: "images/iced-coffee/lotus-eskimo.jpg", ingredients: "آيس كريم - لوتس - اسبريسو - ثلج", prices: [100] },
            { name: "آيس كوفي إسكيمو", image: "images/iced-coffee/eskimo.jpg", ingredients: "آيس كريم - اسبريسو - ثلج", prices: [90] },
            { name: "آيس لاتيه", image: "images/iced-coffee/iced-latte.jpg", ingredients: "اسبريسو - لبن - ثلج - سيرب سكر", prices: [75], popular: true },
            { name: "آيس كابتشينو", image: "images/iced-coffee/iced-cappuccino.jpg", ingredients: "اسبريسو - لبن - فوم - سيرب سكر - ثلج", prices: [85] },
            { name: "آيس موكا", image: "images/iced-coffee/iced-mocha.jpg", ingredients: "دارك شوكلت - اسبريسو - لبن - فوم - ثلج", prices: [85] },
            { name: "آيس وايت موكا", image: "images/iced-coffee/iced-white-mocha.jpg", ingredients: "وايت شوكلت - اسبريسو - لبن - فوم - ثلج", prices: [85] },
            { name: "آيس سبانش لاتية", image: "images/iced-coffee/iced-spanish-latte.jpg", ingredients: "حليب مخلى - اسبريسو - لبن - فوم - ثلج", prices: [85] },
            { name: "آيس كراميل ميكاتو", image: "images/iced-coffee/iced-caramel-macchiato.jpg", ingredients: "كراميل - اسبريسو - لبن - فوم - ثلج", prices: [85] },
            { name: "آيس أمريكانو", image: "images/iced-coffee/iced-americano.jpg", ingredients: "اسبريسو - ثلج - ماء بارد", prices: [75] },
            { name: "آيس لاتيه فانيليا", image: "images/iced-coffee/iced-vanilla-latte.jpg", ingredients: "اسبريسو - سيرب فانيليا - لبن - ثلج", prices: [85] },
            { name: "آيس لاتيه سولت كراميل", image: "images/iced-coffee/iced-salt-caramel.jpg", ingredients: "اسبريسو - كراميل مملح - لبن - ثلج", prices: [85] },
        ]
    },

    // ===== FRESH JUICES =====
    {
        id: "fresh-juices",
        title: "عصائر فريش",
        subtitle: "FRESH JUICES",
        icon: "🥤",
        items: [
            { name: "أفوكادو", image: "images/fresh-juices/avocado.jpg", prices: [80] },
            { name: "برتقال", image: "images/fresh-juices/orange.jpg", prices: [35] },
            { name: "برتقال سكر", image: "images/fresh-juices/orange-sugar.jpg", prices: [35] },
            { name: "ليمون", image: "images/fresh-juices/lemon.jpg", prices: [35] },
            { name: "ليمون نعناع", image: "images/fresh-juices/lemon-mint.jpg", prices: [35], popular: true },
            { name: "ليمون باللبن", image: "images/fresh-juices/lemon-milk.jpg", prices: [40] },
            { name: "بطيخ", image: "images/fresh-juices/watermelon.jpg", prices: [35], isNew: true },
            { name: "بطيخ آيس", image: "images/fresh-juices/watermelon-ice.jpg", prices: [45], isNew: true },
            { name: "كيوي", image: "images/fresh-juices/kiwi.jpg", prices: [55] },
            { name: "عنب", image: "images/fresh-juices/grapes.jpg", prices: [40] },
            { name: "رمان", image: "images/fresh-juices/pomegranate.jpg", prices: [40] },
            { name: "رمان حب", image: "images/fresh-juices/pomegranate-seeds.jpg", prices: [45] },
            { name: "بلح", image: "images/fresh-juices/dates.jpg", prices: [45] },
            { name: "بلح فانيليا", image: "images/fresh-juices/dates-vanilla.jpg", prices: [45] },
            { name: "بلح شيكولاتة", image: "images/fresh-juices/dates-chocolate.jpg", prices: [50] },
            { name: "تفاح", image: "images/fresh-juices/apple.jpg", prices: [40] },
            { name: "كنتلوب", image: "images/fresh-juices/cantaloupe.jpg", prices: [50] },
            { name: "جوافة", image: "images/fresh-juices/guava.jpg", prices: [35] },
            { name: "برقوق", image: "images/fresh-juices/plum.jpg", prices: [35] },
            { name: "خوخ", image: "images/fresh-juices/peach.jpg", prices: [40] },
            { name: "دوم", image: "images/fresh-juices/doum.jpg", prices: [45] },
            { name: "دوم باللبن", image: "images/fresh-juices/doum-milk.jpg", prices: [50] },
            { name: "موز", image: "images/fresh-juices/banana.jpg", prices: [45] },
            { name: "موز ميكس", image: "images/fresh-juices/banana-mix.jpg", prices: [50] },
            { name: "فراولة", image: "images/fresh-juices/strawberry.jpg", prices: [40] },
            { name: "فراولة ميكس", image: "images/fresh-juices/strawberry-mix.jpg", prices: [45] },
            { name: "فراولة لبن", image: "images/fresh-juices/strawberry-milk.jpg", prices: [45] },
            { name: "أناناس", image: "images/fresh-juices/pineapple.jpg", prices: [60] },
            { name: "أناناس ميكس", image: "images/fresh-juices/pineapple-mix.jpg", prices: [65] },
            { name: "تين شوكي", image: "images/fresh-juices/prickly-pear.jpg", prices: [0] },
            { name: "تين برشومي", image: "images/fresh-juices/persimmon.jpg", prices: [0] },
        ]
    },

    // ===== MANGO WORLD =====
    {
        id: "mango-world",
        title: "عالم المانجو",
        subtitle: "MANGO WORLD",
        icon: "🥭",
        items: [
            { name: "مانجو", image: "images/mango-world/mango.jpg", prices: [40] },
            { name: "مانجو هاواي", image: "images/mango-world/hawaii.jpg", ingredients: "مانجو - قطع موز", prices: [45] },
            { name: "مانجو كهرمان", image: "images/mango-world/kahraman.jpg", ingredients: "مانجو - قطع خوخ", prices: [55] },
            { name: "مانجو قطر الندى", image: "images/mango-world/qatr-el-nada.jpg", ingredients: "مانجو - رمان حب", prices: [60], isNew: true },
            { name: "مانجو بري", image: "images/mango-world/berry.jpg", ingredients: "مانجو - فراولة", prices: [60] },
            { name: "مانجو أفوكادو", image: "images/mango-world/avocado.jpg", prices: [60] },
            { name: "مايو مانجو", image: "images/mango-world/mayo.jpg", ingredients: "مانجو - فواكه - موز", prices: [50] },
            { name: "شوربة عدس", image: "images/mango-world/lentil-soup.jpg", ingredients: "مانجو - ايس كريم", prices: [50], isNew: true },
            { name: "ميرت", image: "images/mango-world/meert.jpg", ingredients: "مانجو - جوافة - ايس كريم", prices: [50] },
            { name: "شجرة مانجو", image: "images/mango-world/mango-tree.jpg", prices: [75] },
        ]
    },

    // ===== VITAMIN BLENDS =====
    {
        id: "vitamin-blends",
        title: "فيتامينات",
        subtitle: "VITAMIN BLENDS",
        icon: "💪",
        items: [
            { name: "ريلاكس", image: "images/vitamin-blends/relax.jpg", ingredients: "برتقال - ليمون - عسل - نعناع", prices: [50] },
            { name: "منعش", image: "images/vitamin-blends/refreshing.jpg", ingredients: "برتقال - ليمون - يوسفي - عسل", prices: [50] },
            { name: "فيتامين سي مركز", image: "images/vitamin-blends/vitamin-c.jpg", ingredients: "برتقال - ليمون - جوافة - عسل", prices: [50] },
            { name: "جزر وبرتقال", image: "images/vitamin-blends/carrot-orange.jpg", prices: [40] },
            { name: "برتقال زنجبيل", image: "images/vitamin-blends/orange-ginger.jpg", prices: [50] },
            { name: "كيوي زنجبيل", image: "images/vitamin-blends/kiwi-ginger.jpg", prices: [55] },
            { name: "ليمون زنجبيل", image: "images/vitamin-blends/lemon-ginger.jpg", prices: [40] },
        ]
    },

    // ===== ENERGY CORNER =====
    {
        id: "energy-corner",
        title: "ركن الطاقة",
        subtitle: "ENERGY CORNER",
        icon: "⚡",
        items: [
            { name: "باور إسكيمو", image: "images/energy-corner/power-eskimo.jpg", ingredients: "مانجو - مكسرات مشكلة - ايس كريم - عسل", prices: [90] },
            { name: "سوبر باور", image: "images/energy-corner/super-power.jpg", ingredients: "كيوي - بلح - موز - جينجر", prices: [90] },
            { name: "اكسترا باور", image: "images/energy-corner/extra-power.jpg", ingredients: "ايس كريم فانيليا - عسل - مكسرات مشكلة", prices: [90] },
        ]
    },

    // ===== SMOOTHIES =====
    {
        id: "smoothies",
        title: "سموزي",
        subtitle: "SMOOTHIES",
        icon: "🍹",
        items: [
            { name: "سموزي مشكل", image: "images/smoothies/mixed.jpg", ingredients: "ايس كريم - فراولة - موز - مانجو", prices: [50] },
            { name: "سموزي بالشيكولاتة", image: "images/smoothies/chocolate.jpg", ingredients: "ايس كريم شوكلت - موز", prices: [50] },
            { name: "سموزي مانجو", image: "images/smoothies/mango.jpg", ingredients: "ايس كريم - مانجو", prices: [50] },
            { name: "سموزي فراولة", image: "images/smoothies/strawberry.jpg", ingredients: "ايس كريم - فراولة", prices: [50] },
            { name: "سموزي خوخ", image: "images/smoothies/peach.jpg", ingredients: "ايس كريم - خوخ", prices: [50] },
        ]
    },

    // ===== LOLITA =====
    {
        id: "lolita",
        title: "لوليتا",
        subtitle: "LOLITA - كلها 45",
        icon: "🍭",
        items: [
            { name: "أناناس", image: "images/lolita/pineapple.jpg", prices: [45] },
            { name: "توت", image: "images/lolita/berry.jpg", prices: [45] },
            { name: "خوخ", image: "images/lolita/peach.jpg", prices: [45] },
            { name: "يوسفي", image: "images/lolita/tangerine.jpg", prices: [45] },
            { name: "تفاح أخضر", image: "images/lolita/green-apple.jpg", prices: [45] },
            { name: "فاشون فروت", image: "images/lolita/passion-fruit.jpg", prices: [45] },
        ]
    },

    // ===== MILKSHAKES =====
    {
        id: "milkshakes",
        title: "ميلك شيك",
        subtitle: "MILKSHAKES",
        icon: "🥛",
        items: [
            { name: "فانيليا", image: "images/milkshakes/vanilla.jpg", prices: [60] },
            { name: "شيكولاتة", image: "images/milkshakes/chocolate.jpg", prices: [60] },
            { name: "فراولة", image: "images/milkshakes/strawberry.jpg", prices: [60] },
            { name: "مانجو", image: "images/milkshakes/mango.jpg", prices: [60] },
            { name: "بندق", image: "images/milkshakes/hazelnut.jpg", prices: [75] },
            { name: "أوريو", image: "images/milkshakes/oreo.jpg", prices: [65] },
            { name: "موكا", image: "images/milkshakes/mocha.jpg", prices: [65], popular: true },
            { name: "زبادي فراولة", image: "images/milkshakes/yogurt-strawberry.jpg", prices: [65] },
            { name: "ميجا", image: "images/milkshakes/mega.jpg", prices: [70] },
            { name: "كراميل", image: "images/milkshakes/caramel.jpg", prices: [65] },
            { name: "فرابتشينو", image: "images/milkshakes/frappuccino.jpg", prices: [70] },
            { name: "لوتس", image: "images/milkshakes/lotus.jpg", prices: [70] },
            { name: "سنيكرز", image: "images/milkshakes/snickers.jpg", prices: [70] },
            { name: "توت", image: "images/milkshakes/berry.jpg", prices: [65] },
            { name: "شيكوفانيليا", image: "images/milkshakes/choco-vanilla.jpg", prices: [65], isNew: true },
            { name: "جيرسي", image: "images/milkshakes/jersey.jpg", prices: [70], isNew: true },
            { name: "تويكس", image: "images/milkshakes/twix.jpg", prices: [70], isNew: true },
            { name: "ميكس رايب", image: "images/milkshakes/mix-ripe.jpg", prices: [65] },
        ]
    },

    // ===== COCKTAILS =====
    {
        id: "cocktails",
        title: "كوكتيلات",
        subtitle: "COCKTAILS",
        icon: "🍸",
        items: [
            { name: "سوبر أفوكادو", image: "images/cocktails/super-avocado.jpg", ingredients: "أفوكادو - مكسرات مشكلة - عسل", prices: [90] },
            { name: "هامر", image: "images/cocktails/hammer.jpg", ingredients: "أفوكادو - كيوي", prices: [65] },
            { name: "فرافيو", image: "images/cocktails/fravio.jpg", ingredients: "مانجو - جوز هند - ايس كريم", prices: [65] },
            { name: "بطوط", image: "images/cocktails/battout.jpg", ingredients: "فراولة - موز - ايس كريم", prices: [50] },
            { name: "فيفا", image: "images/cocktails/viva.jpg", ingredients: "موز - بلح - ايس كريم", prices: [50] },
            { name: "فرنسي", image: "images/cocktails/french.jpg", ingredients: "برتقال - مانجو - أناناس", prices: [50] },
            { name: "صاروخ", image: "images/cocktails/rocket.jpg", ingredients: "موز - مانجو - أناناس - ايس كريم", prices: [50] },
            { name: "الساحر", image: "images/cocktails/magician.jpg", ingredients: "مانجو - خوخ - فراولة - ايس كريم", prices: [50] },
            { name: "قشطة", image: "images/cocktails/ishta.jpg", ingredients: "مانجو - جوافة - بلح - ايس كريم", prices: [55] },
            { name: "مورو", image: "images/cocktails/moro.jpg", ingredients: "سوداني - كراميل - نسكافيه", prices: [60] },
            { name: "لايت", image: "images/cocktails/light.jpg", ingredients: "كيوي - أناناس", prices: [55] },
            { name: "إسكيمو", image: "images/cocktails/eskimo.jpg", ingredients: "مانجو - فراولة - موز - خوخ - ايس كريم", prices: [60] },
            { name: "كيوي كراش", image: "images/cocktails/kiwi-crush.jpg", ingredients: "كيوي - برتقال", prices: [55] },
            { name: "كيوي زست", image: "images/cocktails/kiwi-zest.jpg", ingredients: "كيوي - ليمون", prices: [55] },
            { name: "جرين جوس", image: "images/cocktails/green-juice.jpg", ingredients: "كيوي - ليمون - نعناع", prices: [55] },
        ]
    },

    // ===== BOREO & OREO =====
    {
        id: "boreo-oreo",
        title: "بوريو وأوريو",
        subtitle: "BOREO & OREO",
        icon: "🍪",
        items: [
            { name: "بوريو", image: "images/boreo-oreo/boreo.jpg", ingredients: "بوريو - لبن - ايس كريم", prices: [60] },
            { name: "سوبر بوريو", image: "images/boreo-oreo/super-boreo.jpg", ingredients: "بوريو - مانجو", prices: [60] },
            { name: "باور بوريو", image: "images/boreo-oreo/power-boreo.jpg", ingredients: "بوريو - بلح", prices: [60] },
            { name: "فتة بوريو", image: "images/boreo-oreo/fatta-boreo.jpg", ingredients: "بوريو - شوكلاتة - ايس كريم", prices: [65] },
            { name: "أوريو", image: "images/boreo-oreo/oreo.jpg", ingredients: "أوريو - لبن - ايس كريم", prices: [65] },
            { name: "فتة أوريو", image: "images/boreo-oreo/fatta-oreo.jpg", ingredients: "أوريو - شوكلاتة - ايس كريم", prices: [70] },
        ]
    },

    // ===== MOJITO =====
    {
        id: "mojito",
        title: "موخيتو",
        subtitle: "MOJITO",
        icon: "🍃",
        items: [
            { name: "موخيتو بلوبيري", image: "images/mojito/blueberry.jpg", prices: [70] },
            { name: "موخيتو كلاسيك", image: "images/mojito/classic.jpg", prices: [70] },
            { name: "موخيتو ميكس بري", image: "images/mojito/mixed-berry.jpg", prices: [70] },
            { name: "موخيتو باشون فروت", image: "images/mojito/passion-fruit.jpg", prices: [70] },
            { name: "موخيتو فراولة", image: "images/mojito/strawberry.jpg", prices: [70] },
            { name: "صن شاين", image: "images/mojito/sunshine.jpg", prices: [60] },
            { name: "صن رايز", image: "images/mojito/sunrise.jpg", prices: [65] },
            { name: "موخيتو ريد بول", image: "images/mojito/red-bull.jpg", prices: [100] },
            { name: "موخيتو بلو هاواي", image: "images/mojito/blue-hawaii.jpg", prices: [65] },
            { name: "موخيتو جرين أبل", image: "images/mojito/green-apple.jpg", prices: [70] },
            { name: "صودا إسكيمو", image: "images/mojito/soda-eskimo.jpg", prices: [80] },
        ]
    },

    // ===== FRAPPÉ =====
    {
        id: "frappe",
        title: "فرابية",
        subtitle: "FRAPPÉ (بدون كريمة / بكريمة)",
        icon: "🧋",
        items: [
            { name: "فرابية موكا", image: "images/frappe/mocha.jpg", prices: [65, 80] },
            { name: "فرابية كلاسيك", image: "images/frappe/classic.jpg", prices: [65, 80] },
            { name: "فرابية لوتس", image: "images/frappe/lotus.jpg", prices: [65, 80] },
            { name: "فرابية كراميل", image: "images/frappe/caramel.jpg", prices: [65, 80] },
            { name: "فرابية فراولة", image: "images/frappe/strawberry.jpg", prices: [65, 80] },
            { name: "فرابية فانيليا", image: "images/frappe/vanilla.jpg", prices: [60, 80] },
        ]
    },

    // ===== YOGURT =====
    {
        id: "yogurt",
        title: "زبادي",
        subtitle: "YOGURT",
        icon: "🍶",
        items: [
            { name: "زبادي سادة", image: "images/yogurt/plain.jpg", prices: [45] },
            { name: "زبادي بالفواكه", image: "images/yogurt/fruits.jpg", prices: [55] },
            { name: "زبادي ميكس", image: "images/yogurt/mix.jpg", prices: [55] },
            { name: "زبادي بالعسل", image: "images/yogurt/honey.jpg", prices: [50] },
            { name: "لبانيتا", image: "images/yogurt/labanita.jpg", ingredients: "زبادي - موز - جوز", prices: [50], isNew: true },
            { name: "زبادي توت", image: "images/yogurt/berry.jpg", prices: [55] },
            { name: "سلطة زبادي", image: "images/yogurt/salad.jpg", ingredients: "زبادي - قطع فواكه - عسل", prices: [65] },
        ]
    },

    // ===== WAFFLE =====
    {
        id: "waffle",
        title: "وافل",
        subtitle: "WAFFLE (ساندوتش / مفتوح)",
        icon: "🧇",
        items: [
            { name: "وافل نوتيلا", image: "images/waffle/nutella.jpg", prices: [40, 65] },
            { name: "وافل وايت شوكليت", image: "images/waffle/white-chocolate.jpg", prices: [45, 70] },
            { name: "وافل كراميل", image: "images/waffle/caramel.jpg", prices: [55, 80] },
            { name: "وافل عسل أبيض", image: "images/waffle/white-honey.jpg", prices: [55, 80] },
            { name: "وافل لوتس", image: "images/waffle/lotus.jpg", prices: [60, 80] },
            { name: "وافل ميكس", image: "images/waffle/mix.jpg", prices: [60, 80] },
            { name: "وافل فواكه", image: "images/waffle/fruits.jpg", prices: [55, 75] },
            { name: "وافل بستاشيو", image: "images/waffle/pistachio.jpg", prices: [100, 130] },
            { name: "وافل أوريو", image: "images/waffle/oreo.jpg", prices: [65, 85] },
            { name: "وافل هوهوز", image: "images/waffle/hohos.jpg", prices: [65, 85] },
            { name: "وافل 4 سيزون", image: "images/waffle/4-seasons.jpg", prices: [0, 120] },
            { name: "فتة وافل ساده", image: "images/waffle/fatta-plain.jpg", prices: [0, 70] },
            { name: "فتة وافل فواكه", image: "images/waffle/fatta-fruits.jpg", prices: [0, 85] },
            { name: "فتة إسكيمو", image: "images/waffle/fatta-eskimo.jpg", prices: [0, 150] },
        ]
    },

    // ===== FAKHFAKHINA =====
    {
        id: "fakhfakhina",
        title: "فخفخينا",
        subtitle: "FAKHFAKHINA",
        icon: "🍨",
        items: [
            { name: "فخفخينا آيس كريم", image: "images/fakhfakhina/ice-cream.jpg", prices: [50] },
            { name: "فخفخينا ملوكي", image: "images/fakhfakhina/royal.jpg", prices: [65] },
            { name: "فخفخينا كريمة", image: "images/fakhfakhina/cream.jpg", prices: [65] },
            { name: "فخفخينا آيس مكسرات", image: "images/fakhfakhina/ice-nuts.jpg", prices: [70] },
            { name: "فخفخينا سبيشيل", image: "images/fakhfakhina/special.jpg", prices: [60] },
            { name: "فروت سلاد آيس كريم", image: "images/fakhfakhina/fruit-ice.jpg", prices: [60] },
            { name: "فروت سلاد كريمة", image: "images/fakhfakhina/fruit-cream.jpg", prices: [60] },
            { name: "قنبلة", image: "images/fakhfakhina/bomb.jpg", prices: [100] },
        ]
    },

    // ===== FRESKA =====
    {
        id: "freska",
        title: "فريسكا",
        subtitle: "FRESKA",
        icon: "🍫",
        items: [
            { name: "فريسكا نوتيلا", image: "images/freska/nutella.jpg", prices: [25] },
            { name: "فريسكا لوتس", image: "images/freska/lotus.jpg", prices: [30] },
            { name: "فريسكا هوهوز", image: "images/freska/hohos.jpg", prices: [30] },
            { name: "فريسكا توينكيز", image: "images/freska/twinkies.jpg", prices: [30] },
            { name: "فريسكا وايت", image: "images/freska/white.jpg", prices: [30] },
            { name: "فريسكا كنافة وعسل", image: "images/freska/konafa-honey.jpg", prices: [40] },
            { name: "فريسكا جالاكسي", image: "images/freska/galaxy.jpg", prices: [30], isNew: true },
            { name: "فريسكا أوريو", image: "images/freska/oreo.jpg", prices: [50], isNew: true },
            { name: "فريسكا دبي", image: "images/freska/dubai.jpg", prices: [50], isNew: true },
        ]
    },

    // ===== BOXES =====
    {
        id: "boxes",
        title: "بوكسات",
        subtitle: "BOXES",
        icon: "📦",
        items: [
            { name: "بوكس الفريسكا", image: "images/boxes/freska-box.jpg", ingredients: "فريسكا قطع + ايس كريم + نوتيلا ميكس", prices: [70] },
            { name: "بوكس وافل إسكيمو", image: "images/boxes/waffle-eskimo.jpg", ingredients: "وافل + فاكهة + صوص نوتيلا", prices: [90] },
            { name: "بوكس الكبير", image: "images/boxes/big-box.jpg", ingredients: "وافل قطع + ميكس نوتيلا", prices: [100] },
            { name: "بوكس السعادة", image: "images/boxes/happiness-box.jpg", ingredients: "وافل + بان كيك + فريسكا + ميكس نوتيلا", prices: [100], popular: true },
            { name: "بوكس إسكيمو", image: "images/boxes/eskimo-box.jpg", ingredients: "فريسكا قطع + نوتيلا + ايس كريم", prices: [90], popular: true },
        ]
    },

    // ===== PANCAKES =====
    {
        id: "pancakes",
        title: "بان كيك",
        subtitle: "PANCAKES (12 قطعة / 24 قطعة)",
        icon: "🥞",
        items: [
            { name: "بان كيك نوتيلا", image: "images/pancakes/nutella.jpg", prices: [50, 85] },
            { name: "بان كيك لوتس", image: "images/pancakes/lotus.jpg", prices: [60, 90] },
            { name: "بان كيك كراميل", image: "images/pancakes/caramel.jpg", prices: [65, 90] },
            { name: "بان كيك فراولة", image: "images/pancakes/strawberry.jpg", prices: [60, 85] },
            { name: "بان كيك وايت شوكليت", image: "images/pancakes/white-chocolate.jpg", prices: [60, 85] },
            { name: "بان كيك ميكس", image: "images/pancakes/mix.jpg", prices: [70, 95] },
            { name: "بان كيك بستاشيو", image: "images/pancakes/pistachio.jpg", prices: [100, 150] },
        ]
    },

    // ===== ICE CREAM =====
    {
        id: "ice-cream",
        title: "آيس كريم",
        subtitle: "ICE CREAM",
        icon: "🍦",
        items: [
            { name: "آيس كريم بولة", image: "images/ice-cream/scoop.jpg", prices: [25] },
            { name: "2 بولة آيس كريم", image: "images/ice-cream/2-scoops.jpg", prices: [40] },
            { name: "آيس كريم بالفواكه", image: "images/ice-cream/fruits.jpg", prices: [60] },
        ]
    },

];

// ===== رقم الواتساب بتاع المحل =====
const WHATSAPP_NUMBER = "201008541582";

// ===== صورة افتراضية لكل قسم (لو المنتج ملوش صورة) =====
const DEFAULT_IMAGES = {
    "hot-coffee": "images/defaults/hot-coffee.jpg",
    "iced-coffee": "images/defaults/iced-coffee.jpg",
    "fresh-juices": "images/defaults/fresh-juices.jpg",
    "mango-world": "images/defaults/mango-world.jpg",
    "vitamin-blends": "images/defaults/vitamin-blends.jpg",
    "energy-corner": "images/defaults/energy-corner.jpg",
    "smoothies": "images/defaults/smoothies.jpg",
    "lolita": "images/defaults/lolita.jpg",
    "milkshakes": "images/defaults/milkshakes.jpg",
    "cocktails": "images/defaults/cocktails.jpg",
    "boreo-oreo": "images/defaults/boreo-oreo.jpg",
    "mojito": "images/defaults/mojito.jpg",
    "frappe": "images/defaults/frappe.jpg",
    "yogurt": "images/defaults/yogurt.jpg",
    "waffle": "images/defaults/waffle.jpg",
    "fakhfakhina": "images/defaults/fakhfakhina.jpg",
    "freska": "images/defaults/freska.jpg",
    "boxes": "images/defaults/boxes.jpg",
    "pancakes": "images/defaults/pancakes.jpg",
    "ice-cream": "images/defaults/ice-cream.jpg"
};


// ===== صور المنتجات =====
// الموقع بيجيب صورة لكل منتج تلقائياً من النت (LoremFlickr - من غير حساب ولا مفتاح)
// لو عندك صور حقيقية في فولدر images خلي ده true، وهتتقدم على صور النت
const LOCAL_IMAGES = true;
// صور النت التلقائية (Wikimedia/Flickr) بتطلع صور تقريبية ومش مظبوطة، فاقفلتها للموقع الحقيقي
// خليها false وحط صورك الحقيقية في images/ (استخدم get-images.html عشان تعرف كل منتج محتاج إيه)
const AUTO_WEB_IMAGES = false;
// لو منتج عاوز له صورة معينة: image: "https://..."   أو كلمات بحث إنجليزي: query: "turkish coffee"

// كلمة بحث لكل قسم
const CATEGORY_QUERY = {
    "hot-coffee": "coffee", "iced-coffee": "coffee", "fresh-juices": "juice", "mango-world": "mango",
    "vitamin-blends": "juice", "energy-corner": "smoothie", "smoothies": "smoothie", "lolita": "slushie",
    "milkshakes": "milkshake", "cocktails": "cocktail", "boreo-oreo": "oreo", "mojito": "mojito",
    "frappe": "frappe", "yogurt": "yogurt", "waffle": "waffle", "fakhfakhina": "dessert",
    "freska": "chocolate", "boxes": "dessert", "pancakes": "pancakes", "ice-cream": "icecream"
};
