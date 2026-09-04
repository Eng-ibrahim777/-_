/* script.js */

let currentLang = localStorage.getItem("aldoctor_lang") || "ar";

// دالة التنبيه المخصص الجديدة بدلاً من الـ alert العادي
function showAlert(message) {
    const modal = document.getElementById('custom-alert-modal');
    const msgElement = document.getElementById('custom-alert-message');
    if(modal && msgElement) {
        msgElement.innerText = message;
        modal.style.display = 'flex';
        
        const btn = document.getElementById('custom-alert-btn');
        btn.onclick = function() {
            modal.style.display = 'none';
        };
    } else {
        alert(message);
    }
}

// بيانات المنتجات متعددة اللغات
const productsData = [
    {
        id: 1,
        type: "suit",
        cut: "italian",
        color: "كحلي",
        price: 185000,
        oldPrice: 210000,
        sizes: ["48","50","52"],
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
        badge: "الأكثر مبيعاً",
        title: {
            ar: "بدلة إيطالية سليم فيت كحلي",
            en: "Navy Slim Fit Italian Suit",
            ku: "قاتی ئیتاڵی سلیم فیت کەحلی"
        },
        description: {
            ar: "بدلة رسمية بقصة إيطالية عصرية، مناسبة للمناسبات الرسمية والعمل وحفلات الزفاف.",
            en: "Modern Italian cut suit, suitable for formal events, business, and weddings.",
            ku: "قاتی ڕەسمی بە ستایلی نوێی ئیتاڵی، گونجاوە بۆ بۆنە ڕەسمییەکان و کار."
        }
    },
    {
        id: 2,
        type: "suit",
        cut: "russian",
        color: "أسود",
        price: 210000,
        oldPrice: 235000,
        sizes: ["50","52","54"],
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
        badge: "مميز",
        title: {
            ar: "بدلة دبل بريستيد سوداء",
            en: "Black Double Breasted Suit",
            ku: "قاتی دبل برێستیدی ڕەش"
        },
        description: {
            ar: "تصميم دبل بريستيد فاخر يمنح مظهراً قوياً وأنيقاً.",
            en: "Luxury double-breasted design giving a powerful and bold look.",
            ku: "دیزاینی دبل برێستیدی فاخر بۆ دەرکەوتنێکی بەهێز و شیک."
        }
    },
    {
        id: 3,
        type: "suit",
        cut: "british",
        color: "رمادي",
        price: 195000,
        oldPrice: 220000,
        sizes: ["48","50","52","54"],
        image: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800",
        badge: "جديد",
        title: {
            ar: "بدلة بريطانية رمادية كلاسيكية",
            en: "Classic Grey British Suit",
            ku: "قاتی بەریتانی ڕەقەیی کلاسیك"
        },
        description: {
            ar: "قصة بريطانية أنيقة بتفاصيل كلاسيكية.",
            en: "Elegant British tailored suit with timeless classic details.",
            ku: "ستایلی بەریتانی شیک بە وردەکاری کلاسیك."
        }
    },
    {
        id: 4,
        type: "shirt",
        color: "أبيض",
        price: 25000,
        sizes: ["S","M","L","XL","XXL"],
        image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800",
        title: {
            ar: "قميص رسمي أبيض فاخر",
            en: "Luxury White Formal Shirt",
            ku: "کراسی ڕەسمی سپی فاخر"
        },
        description: {
            ar: "قميص رسمي أنيق يناسب البدلات الرسمية.",
            en: "Elegant formal shirt tailored for suits.",
            ku: "کراسی شیکی ڕەسمی گونجاو بۆ قاتی ڕەسمی."
        }
    },
    {
        id: 5,
        type: "shirt",
        color: "سمائي",
        price: 28000,
        sizes: ["S","M","L","XL","XXL"],
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
        title: {
            ar: "قميص رسمي سمائي",
            en: "Light Blue Formal Shirt",
            ku: "کراسی ڕەسمی ئاسمانی"
        },
        description: {
            ar: "قميص بلون سمائي هادئ وأنيق.",
            en: "Gentle sky blue formal shirt.",
            ku: "کراسێکی ڕەسمی بە ڕەنگی ئاسمانی هێمن."
        }
    },
    {
        id: 6,
        type: "tie",
        color: "كحلي",
        price: 10000,
        sizes: ["ONE"],
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800",
        title: {
            ar: "ربطة عنق كحلية فاخرة",
            en: "Luxury Navy Tie",
            ku: "بۆینباخی کەحلی فاخر"
        },
        description: {
            ar: "ربطة عنق كلاسيكية مناسبة للبدلات الكحلية والرمادية.",
            en: "Classic necktie perfectly suited for navy and grey suits.",
            ku: "بۆینباخی کلاسیك گونجاو بۆ قاتی کەحلی و ڕەقەیی."
        }
    },
    {
        id: 7,
        type: "shoes",
        color: "أسود",
        price: 45000,
        sizes: ["40","41","42","43","44","45"],
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800",
        title: {
            ar: "حذاء جلد كلاسيك أسود",
            en: "Black Classic Leather Shoes",
            ku: "پێڵاوی چەرمی کلاسیكی ڕەش"
        },
        description: {
            ar: "حذاء جلدي كلاسيكي مناسب للمناسبات الرسمية.",
            en: "Genuine leather classic shoes for formal occasions.",
            ku: "پێڵاوی چەرمی کلاسیك گونجاو بۆ بۆنە ڕەسمییەکان."
        }
    },
    {
        id: 8,
        type: "accessory",
        color: "أسود",
        price: 5000,
        sizes: ["ONE"],
        image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800",
        title: {
            ar: "جوارب قطنية فاخرة",
            en: "Luxury Cotton Socks",
            ku: "گۆرەوی لۆکەیی فاخر"
        },
        description: {
            ar: "جوارب قطنية مريحة بتصميم كلاسيكي.",
            en: "Comfortable classic cotton socks.",
            ku: "گۆرەوی لۆکەیی ئاسوودە بە دیزاینی کلاسیك."
        }
    }
];

const translations = {
    ar: {
        siteTitle: "أزياء الدكتور | متجر الأناقة الرجالية",
        favorites: "المفضلة",
        cart: "السلة",
        heroSubtitle: "الرقي يبدأ من التفاصيل",
        heroTitle: "أناقتك الرسمية<br><b>بمستوى مختلف</b>",
        heroDesc: "بدلات رجالية، قمصان وإكسسوارات مختارة بعناية لإطلالة استثنائية.",
        shopNow: "تسوق الآن",
        catAll: "الكل",
        catSuits: " البدلات",
        catShirts: " القمصان",
        catTies: " الربطات",
        catShoes: " الأحذية",
        catAccessories: " الإكسسوارات",
        searchPlaceholder: "ابحث عن بدلة، قميص، ربطة...",
        filterTitle: "تصفية المنتجات",
        labelCut: "القصة",
        cutAll: "جميع القصات",
        cutItalian: "إيطالي",
        cutAmerican: "أمريكي",
        cutBritish: "بريطاني",
        cutDouble: "دبل بريستيد",
        labelSize: "المقاس",
        sizeAll: "جميع القياسات",
        labelColor: "اللون",
        colorAll: "جميع الألوان",
        colorBlack: "أسود",
        colorNavy: "كحلي",
        colorGrey: "رمادي",
        colorDarkBlue: "نيلي",
        colorWhite: "أبيض",
        colorLightBlue: "سمائي",
        labelSort: "الترتيب",
        sortDefault: "الأحدث",
        sortLow: "السعر: الأقل",
        sortHigh: "السعر: الأعلى",
        sortDiscount: "الأكثر خصماً",
        btnReset: "إعادة تعيين",
        btnSizeGuide: "📏 دليل المقاسات",
        ourPicks: "اختياراتنا",
        ourProducts: "منتجاتنا",
        styleTitle: "نسّق إطلالتك كاملة",
        styleDesc: "اختر البدلة، القميص، الربطة والحذاء لتحصل على إطلالة متكاملة.",
        btnStartStyling: "ابدأ التنسيق ✨",
        address: "بغداد - الكرادة داخل - فرع مصرف الطيف",
        rights: "جميع الحقوق محفوظة 2026 ©",
        footerBrand: "أزياء الدكتور",
        whatsapp: "واتساب",
        instagram: "انستغرام",
        cartTitle: "سلة المشتريات",
        sumSubtotal: "المجموع",
        sumAddons: "الإضافات",
        sumDelivery: "التوصيل",
        sumDiscount: "الخصم",
        sumTotal: "الإجمالي",
        labelDeliveryArea: "منطقة التوصيل",
        optBaghdad: "بغداد - 5,000 د.ع",
        optProvinces: "المحافظات - 10,000 د.ع",
        labelCoupon: "كوبون الخصم",
        btnApply: "تطبيق",
        labelFullName: "الاسم الكامل",
        labelPhone: "رقم الهاتف",
        labelAddress: "العنوان",
        addressPlaceholder: "المحافظة - المنطقة - أقرب نقطة دالة",
        labelPayment: "طريقة الدفع",
        payCod: "الدفع عند الاستلام",
        payOnline: "دفع إلكتروني",
        btnConfirmOrder: "تأكيد الطلب",
        favTitle: "المنتجات المفضلة",
        sizeGuideTitle: "دليل مقاسات البدلات",
        thSize: "المقاس",
        thChest: "الصدر",
        thWaist: "الخصر",
        stylistTitle: "نسّق إطلالتك",
        labelSuit: "البدلة",
        labelShirt: "القميص",
        labelTie: "الربطة",
        labelShoes: "الحذاء",
        btnAddLookToCart: "إضافة الإطلالة للسلة 🛒",
        currency: "د.ع",
        productCount: "منتج",
        noProducts: "لا توجد منتجات مطابقة للبحث.",
        details: "التفاصيل",
        add: "🛒 إضافة",
        selectSize: "اختر القياس",
        addToCart: "إضافة إلى السلة 🛒",
        addedToCartAlert: "تمت إضافة المنتج إلى السلة 🛒",
        emptyFav: "لا توجد منتجات مفضلة.",
        emptyCart: "السلة فارغة.",
        delete: "حذف",
        couponValid: "تم تطبيق خصم 10%",
        couponInvalid: "الكوبون غير صالح",
        stylistTotal: "إجمالي الإطلالة: ",
        orderSuccess: "تم استلام طلبك بنجاح\nرقم الطلب: #",
        orderTotalMsg: "\nالإجمالي: ",
        sizeOne: "حجم موحد",
        badgeBest: "الأكثر مبيعاً",
        badgeFeatured: "مميز",
        badgeNew: "جديد",
        badgeLuxury: "منتج فاخر"
    },
    en: {
        siteTitle: "Doctor Clothes | Men's Elegance Store",
        favorites: "Favorites",
        cart: "Cart",
        heroSubtitle: "Elegance starts from details",
        heroTitle: "Your Formal Style<br><b>On Another Level</b>",
        heroDesc: "Carefully selected men's suits, shirts, and accessories for an extraordinary look.",
        shopNow: "Shop Now",
        catAll: "All",
        catSuits: "Suits",
        catShirts: "Shirts",
        catTies: "Ties",
        catShoes: "Shoes",
        catAccessories: "Accessories",
        searchPlaceholder: "Search suit, shirt, tie...",
        filterTitle: "Filter Products",
        labelCut: "Cut",
        cutAll: "All Cuts",
        cutItalian: "Italian",
        cutAmerican: "American",
        cutBritish: "British",
        cutDouble: "Double Breasted",
        labelSize: "Size",
        sizeAll: "All Sizes",
        labelColor: "Color",
        colorAll: "All Colors",
        colorBlack: "Black",
        colorNavy: "Navy",
        colorGrey: "Grey",
        colorDarkBlue: "Dark Blue",
        colorWhite: "White",
        colorLightBlue: "Light Blue",
        labelSort: "Sort By",
        sortDefault: "Latest",
        sortLow: "Price: Low to High",
        sortHigh: "Price: High to Low",
        sortDiscount: "Highest Discount",
        btnReset: "Reset",
        btnSizeGuide: "📏 Size Guide",
        ourPicks: "Our Selection",
        ourProducts: "Our Products",
        styleTitle: "Style Your Entire Look",
        styleDesc: "Choose a suit, shirt, tie, and shoes for a complete outcome.",
        btnStartStyling: "Start Styling ✨",
        address: "Baghdad - Karrada Dakhil - Taif Bank Branch",
        rights: "All Rights Reserved 2026 ©",
        footerBrand: "Doctor Fashion",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        cartTitle: "Shopping Cart",
        sumSubtotal: "Subtotal",
        sumAddons: "Add-ons",
        sumDelivery: "Delivery",
        sumDiscount: "Discount",
        sumTotal: "Total",
        labelDeliveryArea: "Delivery Region",
        optBaghdad: "Baghdad - 5,000 IQD",
        optProvinces: "Provinces - 10,000 IQD",
        labelCoupon: "Discount Coupon",
        btnApply: "Apply",
        labelFullName: "Full Name",
        labelPhone: "Phone Number",
        labelAddress: "Address",
        addressPlaceholder: "Governorate - Area - Nearest Landmark",
        labelPayment: "Payment Method",
        payCod: "Cash on Delivery",
        payOnline: "Online Payment",
        btnConfirmOrder: "Confirm Order",
        favTitle: "Favorite Products",
        sizeGuideTitle: "Suits Size Guide",
        thSize: "Size",
        thChest: "Chest",
        thWaist: "Waist",
        stylistTitle: "Style Your Outfit",
        labelSuit: "Suit",
        labelShirt: "Shirt",
        labelTie: "Tie",
        labelShoes: "Shoes",
        btnAddLookToCart: "Add Outfit to Cart 🛒",
        currency: "IQD",
        productCount: "Products",
        noProducts: "No products match your search.",
        details: "Details",
        add: "🛒 Add",
        selectSize: "Select Size",
        addToCart: "Add to Cart 🛒",
        addedToCartAlert: "Product added to cart 🛒",
        emptyFav: "No favorite products.",
        emptyCart: "Cart is empty.",
        delete: "Delete",
        couponValid: "10% discount applied",
        couponInvalid: "Invalid coupon",
        stylistTotal: "Outfit Total: ",
        orderSuccess: "Your order has been received successfully!\nOrder ID: #",
        orderTotalMsg: "\nTotal: ",
        sizeOne: "One Size",
        badgeBest: "Best Seller",
        badgeFeatured: "Featured",
        badgeNew: "New",
        badgeLuxury: "Luxury Item"
    },
    ku: {
        siteTitle: "جل و بەرگی دکتۆر | فرۆشگای شیکپۆشی پیاوان",
        favorites: "دڵخوازەکان",
        cart: "سەبەتە",
        heroSubtitle: "ڕازاوەیی لە وردەکارییەکانەوە دەست پێدەکات",
        heroTitle: "شیکپۆشی ڕەسمیت<br><b>لە ئاستێکی جیاوازدا</b>",
        heroDesc: "قاتی پیاوانە، کراس و ئێکسسوارات بە وریاییەوە هەڵبژێردراون بۆ دەرکەوتنێکی تایبەت.",
        shopNow: "ئێستا بکڕە",
        catAll: "هەموی",
        catSuits: "قاتەکان",
        catShirts: "کراسەکان",
        catTies: "بۆینباخەکان",
        catShoes: "پێڵاوەکان",
        catAccessories: "ئێکسسوارات",
        searchPlaceholder: "گەڕان بۆ قات، کراس، بۆینباخ...",
        filterTitle: "فلتەرکردنی بەرهەمەکان",
        labelCut: "ستایل",
        cutAll: "هەموو ستایلەکان",
        cutItalian: "ئیتاڵی",
        cutAmerican: "ئەمەریکی",
        cutBritish: "بەریتانی",
        cutDouble: "دبل برێستید",
        labelSize: "قەبارە (سایز)",
        sizeAll: "هەموو سایزەکان",
        labelColor: "ڕەنگ",
        colorAll: "هەموو ڕەنگەکان",
        colorBlack: "ڕەش",
        colorNavy: "کەحلی",
        colorGrey: "ڕەقەیی (خۆڵەمێشی)",
        colorDarkBlue: "نیلی",
        colorWhite: "سپی",
        colorLightBlue: "ئاسمانی",
        labelSort: "ڕیزبەندکردن",
        sortDefault: "نوێترین",
        sortLow: "نرخ: کەمترین",
        sortHigh: "نرخ: زۆرترین",
        sortDiscount: "زۆرترین دابەزین",
        btnReset: "ڕێکخستنەوە",
        btnSizeGuide: "📏 ڕێنمایی سایزەکان",
        ourPicks: "هەڵبژاردنەکانمان",
        ourProducts: "بەرهەمەکانمان",
        styleTitle: "تەواوی شێوازی جلوبەرگت ڕێکبخە",
        styleDesc: "قات، کراس، بۆینباخ و پێڵاو هەڵبژێرە بۆ بەدەستهێنانی دەرکەوتنێکی تەواو.",
        btnStartStyling: "دەستپێکردنی ڕێکخستن ✨",
        address: "بەغدا - کەڕادە داخل - لقی بانکی تەیف",
        rights: "سەرجەم مافەکانی پارێزراوە 2026 ©",
        footerBrand: "پۆشاکی دکتۆر",
        whatsapp: "واتسئەپ",
        instagram: "ئینستاگرام",
        cartTitle: "سەبەتەی کڕین",
        sumSubtotal: "کۆی گشتی",
        sumAddons: "زیادکراوەکان",
        sumDelivery: "گەیاندن",
        sumDiscount: "داشکاندن",
        sumTotal: "کۆی کۆتایی",
        labelDeliveryArea: "ناوچەی گەیاندن",
        optBaghdad: "بەغدا - 5,000 دینار",
        optProvinces: "پارێزگاکان - 10,000 دینار",
        labelCoupon: "کۆپۆنی داشکاندن",
        btnApply: "جێبەجێکردن",
        labelFullName: "ناوی تەواو",
        labelPhone: "ژمارەی تلفۆن",
        labelAddress: "ناونیشان",
        addressPlaceholder: "پارێزگا - ناوچە - نزیکترین شوێنی دیار",
        labelPayment: "ڕێگای دانانی پارە",
        payCod: "دانی پارە لەکاتی وەرگرتن",
        payOnline: "دانی پارەی ئەلیکترۆنی",
        btnConfirmOrder: "پشتڕاستکردنەوەی داواکاری",
        favTitle: "بەرهەمە دڵخوازەکان",
        sizeGuideTitle: "ڕێنمایی سایزی قاتەکان",
        thSize: "سایز",
        thChest: "سیgroup (سنگ)",
        thWaist: "کەمەر",
        stylistTitle: "ڕێکخستنی ستايلت",
        labelSuit: "قات",
        labelShirt: "کراس",
        labelTie: "بۆینباخ",
        labelShoes: "پێڵاو",
        btnAddLookToCart: "زیادکردنی ستایلەکە بۆ سەبەتە 🛒",
        currency: "د.ع",
        productCount: "بەرهەم",
        noProducts: "هیچ بەرهەمێک نەدۆزرایەوە.",
        details: "وردەکاری",
        add: "🛒 زیادکردن",
        selectSize: "سایز هەڵبژێرە",
        addToCart: "زیادکردن بۆ سەبەتە 🛒",
        addedToCartAlert: "بەرهەمەکە بۆ سەبەتە زیادکرا 🛒",
        emptyFav: "هیچ بەرهەمێکی دڵخواز نییە.",
        emptyCart: "سەبەتە بەتاڵە.",
        delete: "سڕینەوە",
        couponValid: "داشکاندنی 10% جێبەجێکرا",
        couponInvalid: "کۆپۆنەکە ڕاست نییە",
        stylistTotal: "کۆی گشتی ستایل: ",
        orderSuccess: "داواکارییەکەت بە سەرکەوتوویی وەرگیرا!\nژمارەی داواکاری: #",
        orderTotalMsg: "\nکۆی کۆتایی: ",
        sizeOne: "تەواو",
        badgeBest: "پڕفڕۆشترین",
        badgeFeatured: "تایبەت",
        badgeNew: "نوێ",
        badgeLuxury: "بەرهەمی فاخر"
    }
};

let cart = [];
let activeCategory = "all";
let appliedDiscount = 0;

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("aldoctor_lang", lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "en") ? "ltr" : "rtl";

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
        const key = el.getAttribute("data-i18n-ph");
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    applyFilters();
    updateCartTotals();
    updateCartBadge();
    updateFavoritesBadge();
    updateOrdersBadge();
}

function money(value) {
    const curr = translations[currentLang]?.currency || "د.ع";
    const locale = (currentLang === "en") ? "en-US" : "ar-IQ";
    return Number(value).toLocaleString(locale) + " " + curr;
}

function getProductTitle(product) {
    if (typeof product.title === "object") {
        return product.title[currentLang] || product.title["ar"];
    }
    return product.title;
}

function getProductDescription(product) {
    if (typeof product.description === "object") {
        return product.description[currentLang] || product.description["ar"];
    }
    return product.description || "";
}

function getColorName(color) {
    const colorKeys = {
        "أسود": "colorBlack",
        "كحلي": "colorNavy",
        "رمادي": "colorGrey",
        "نيلي": "colorDarkBlue",
        "أبيض": "colorWhite",
        "سمائي": "colorLightBlue"
    };
    const key = colorKeys[color];
    return (key && translations[currentLang][key]) ? translations[currentLang][key] : color;
}

function scrollToProducts() {
    document.getElementById("products-area").scrollIntoView({behavior:"smooth"});
}

function setCategory(category, button) {
    activeCategory = category;
    document.querySelectorAll(".category").forEach(x => x.classList.remove("active"));
    button.classList.add("active");
    applyFilters();
}

function applyFilters() {
    const search = document.getElementById("search-input")?.value.trim().toLowerCase() || "";
    const cut = document.getElementById("filter-cut")?.value || "all";
    const size = document.getElementById("filter-size")?.value || "all";
    const color = document.getElementById("filter-color")?.value || "all";
    const sort = document.getElementById("sort-products")?.value || "default";

    let products = productsData.filter(product => {
        const matchCategory = activeCategory === "all" || product.type === activeCategory;
        const currentTitle = getProductTitle(product).toLowerCase();
        const matchSearch = !search || currentTitle.includes(search) || (product.color || "").toLowerCase().includes(search);
        const matchCut = cut === "all" || product.cut === cut;
        const matchSize = size === "all" || (product.sizes || []).includes(size);
        const matchColor = color === "all" || product.color === color;

        return matchCategory && matchSearch && matchCut && matchSize && matchColor;
    });

    if(sort === "low") products.sort((a,b)=>a.price-b.price);
    if(sort === "high") products.sort((a,b)=>b.price-a.price);
    if(sort === "discount") {
        products.sort((a,b)=>{
            const da = a.oldPrice ? a.oldPrice-a.price : 0;
            const db = b.oldPrice ? b.oldPrice-b.price : 0;
            return db-da;
        });
    }

    displayProducts(products);
}

function displayProducts(products) {
    const grid = document.getElementById("products-grid");
    if(!grid) return;

    grid.innerHTML = "";

    const countText = translations[currentLang]?.productCount || "منتج";
    const locale = (currentLang === "en") ? "en-US" : "ar-IQ";
    document.getElementById("products-count").innerText = `${products.length.toLocaleString(locale)} ${countText}`;

    if(products.length === 0) {
        const noProdsText = translations[currentLang]?.noProducts || "لا توجد منتجات مطابقة للبحث.";
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:50px;">${noProdsText}</div>`;
        return;
    }

    const tDetails = translations[currentLang]?.details || "التفاصيل";
    const tAdd = translations[currentLang]?.add || "🛒 إضافة";

    products.forEach(product => {
        const favorites = getFavorites();
        const isFavorite = favorites.includes(product.id);
        const discount = product.oldPrice ? Math.round(((product.oldPrice-product.price)/product.oldPrice)*100) : 0;

        grid.innerHTML += `
            <div class="product-card">
                ${product.badge ? `<span class="badge">${getBadgeTranslation(product.badge)}</span>` : ""}
                <button class="favorite-btn" onclick="toggleFavorite(${product.id})">
                    ${isFavorite ? "♥" : "♡"}
                </button>
                <img class="product-image" src="${product.image}" onclick="openProduct(${product.id})">
                <div class="product-info">
                    <h3 class="product-title">${getProductTitle(product)}</h3>
                    <div class="product-meta">
                        ${getColorName(product.color)}
                        ${product.cut ? ` • ${cutName(product.cut)}` : ""}
                    </div>
                    <div class="price">
                        ${money(product.price)}
                        ${product.oldPrice ? `<span class="old-price">${money(product.oldPrice)}</span>` : ""}
                        ${discount ? `<span class="discount">-${discount}%</span>` : ""}
                    </div>
                    <div class="product-actions">
                        <button class="view-btn" onclick="openProduct(${product.id})">${tDetails}</button>
                        <button class="add-btn" onclick="quickAdd(${product.id})">${tAdd}</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function getBadgeTranslation(badge) {
    if (badge === "الأكثر مبيعاً") return translations[currentLang]?.badgeBest || badge;
    if (badge === "مميز") return translations[currentLang]?.badgeFeatured || badge;
    if (badge === "جديد") return translations[currentLang]?.badgeNew || badge;
    return badge;
}

function cutName(cut) {
    if (currentLang === "en") {
        const namesEn = { italian:"Italian", american:"American", british:"British", russian:"Double Breasted" };
        return namesEn[cut] || cut;
    }
    if (currentLang === "ku") {
        const namesKu = { italian:"ئیتاڵی", american:"ئەمەریکی", british:"بەریتانی", russian:"دبل برێستید" };
        return namesKu[cut] || cut;
    }
    const names = { italian:"إيطالي", american:"أمريكي", british:"بريطاني", russian:"دبل بريستيد" };
    return names[cut] || cut;
}

function quickAdd(id) {
    const product = productsData.find(p=>p.id===id);
    if(!product) return;
    const size = product.sizes?.[0] || "ONE";
    addToCart(product,size);
}

function addToCart(product,size) {
    const existing = cart.find(item => item.id===product.id && item.size===size);
    if(existing) {
        existing.quantity++;
    } else {
        cart.push({
            cartItemId: Date.now() + Math.random(),
            id: product.id,
            size: size,
            quantity: 1
        });
    }

    updateCartBadge();
    showAlert(translations[currentLang]?.addedToCartAlert || "تمت إضافة المنتج إلى السلة 🛒");
}

function openProduct(id) {
    const product = productsData.find(p=>p.id===id);
    if(!product) return;

    const sizes = (product.sizes || ["ONE"])
        .map(size => `<option value="${size}">${size === "ONE" ? (translations[currentLang]?.sizeOne || "ONE") : size}</option>`)
        .join("");

    const tSelectSize = translations[currentLang]?.selectSize || "اختر القياس";
    const tAddToCart = translations[currentLang]?.addToCart || "إضافة إلى السلة 🛒";
    const tBadge = product.badge ? getBadgeTranslation(product.badge) : (translations[currentLang]?.badgeLuxury || "منتج فاخر");

    document.getElementById("product-details").innerHTML = `
        <div class="product-detail">
            <img src="${product.image}">
            <div class="detail-info">
                <span class="product-meta">${tBadge}</span>
                <h1>${getProductTitle(product)}</h1>
                <div class="price">
                    ${money(product.price)}
                    ${product.oldPrice ? `<span class="old-price">${money(product.oldPrice)}</span>` : ""}
                </div>
                <p>${getProductDescription(product)}</p>
                <p><b>${translations[currentLang]?.labelColor || "اللون"}:</b> ${getColorName(product.color)}</p>
                ${product.cut ? `<p><b>${translations[currentLang]?.labelCut || "القصة"}:</b> ${cutName(product.cut)}</p>` : ""}
                <label><b>${tSelectSize}</b></label>
                <select id="detail-size" class="size-select">${sizes}</select>
                <button class="add-detail-btn" onclick="addDetailProduct(${product.id})">${tAddToCart}</button>
            </div>
        </div>
    `;

    document.getElementById("product-modal").style.display="flex";
}

function addDetailProduct(id) {
    const product = productsData.find(p=>p.id===id);
    const size = document.getElementById("detail-size").value;
    addToCart(product,size);
    closeModal("product-modal");
}

function getFavorites() {
    return JSON.parse(localStorage.getItem("aldoctor_favorites") || "[]");
}

function toggleFavorite(id) {
    let favorites = getFavorites();
    if(favorites.includes(id)) favorites = favorites.filter(x=>x!==id);
    else favorites.push(id);

    localStorage.setItem("aldoctor_favorites", JSON.stringify(favorites));
    updateFavoritesBadge();
    applyFilters();
}

function updateFavoritesBadge() {
    const count = getFavorites().length;
    const locale = (currentLang === "en") ? "en-US" : "ar-IQ";
    document.getElementById("favorites-badge").innerText = count.toLocaleString(locale);
}

function openFavorites() {
    const list = document.getElementById("favorites-list");
    const favorites = getFavorites();
    const products = productsData.filter(p => favorites.includes(p.id));

    list.innerHTML="";

    if(!products.length) {
        list.innerHTML = `<p>${translations[currentLang]?.emptyFav || "لا توجد منتجات مفضلة."}</p>`;
    } else {
        const tAdd = translations[currentLang]?.add || "إضافة للسلة";
        products.forEach(p=>{
            const div=document.createElement("div");
            div.innerHTML=`
                <div class="product-card">
                    <img class="product-image" src="${p.image}">
                    <div class="product-info">
                        <h3>${getProductTitle(p)}</h3>
                        <div class="price">${money(p.price)}</div>
                        <button class="add-btn" style="width:100%;padding:10px" onclick="quickAdd(${p.id})">${tAdd}</button>
                    </div>
                </div>
            `;
            list.appendChild(div);
        });
    }

    document.getElementById("favorites-modal").style.display="flex";
}

function updateCartBadge() {
    const count = cart.reduce((sum,item)=>sum+item.quantity,0);
    const locale = (currentLang === "en") ? "en-US" : "ar-IQ";
    document.getElementById("cart-badge").innerText = count.toLocaleString(locale);
}

function openCartModal() {
    renderCart();
    updateCartTotals();
    document.getElementById("cart-modal").style.display="flex";
}

function renderCart() {
    const container = document.getElementById("cart-items");
    container.innerHTML="";

    if(!cart.length) {
        container.innerHTML = `<p style="text-align:center;padding:20px">${translations[currentLang]?.emptyCart || "السلة فارغة."}</p>`;
        return;
    }

    const tDelete = translations[currentLang]?.delete || "حذف";
    const tSizeLabel = translations[currentLang]?.labelSize || "القياس";
    const locale = (currentLang === "en") ? "en-US" : "ar-IQ";

    cart.forEach(item=>{
        const product = productsData.find(p => p.id === item.id);
        if(!product) return;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}">
                <div class="cart-item-info">
                    <strong>${getProductTitle(product)}</strong>
                    <div>${tSizeLabel}: ${item.size === "ONE" ? (translations[currentLang]?.sizeOne || "ONE") : item.size}</div>
                    <b>${money(product.price*item.quantity)}</b>
                    <div class="quantity">
                        <button onclick="changeQuantity(${item.cartItemId},-1)">−</button>
                        <span>${item.quantity.toLocaleString(locale)}</span>
                        <button onclick="changeQuantity(${item.cartItemId},1)">+</button>
                    </div>
                </div>
                <button class="remove" onclick="removeCart(${item.cartItemId})">${tDelete}</button>
            </div>
        `;
    });
}

function changeQuantity(id,change) {
    const item = cart.find(x=>x.cartItemId===id);
    if(!item) return;
    item.quantity += change;
    if(item.quantity<=0) cart=cart.filter(x=>x.cartItemId!==id);

    renderCart();
    updateCartTotals();
    updateCartBadge();
}

function removeCart(id) {
    cart=cart.filter(x=>x.cartItemId!==id);
    renderCart();
    updateCartTotals();
    updateCartBadge();
}

function calculateSubtotal() {
    return cart.reduce((sum,item)=>{
        const p = productsData.find(x=>x.id===item.id);
        return sum + (p ? p.price*item.quantity : 0);
    }, 0);
}

function updateCartTotals() {
    const subtotal = calculateSubtotal();
    const delivery = cart.length ? Number(document.getElementById("delivery-location")?.value || 5000) : 0;
    const total = Math.max(0, subtotal + delivery - appliedDiscount);

    document.getElementById("summary-subtotal").innerText = money(subtotal);
    document.getElementById("summary-addons").innerText = money(0);
    document.getElementById("summary-delivery").innerText = money(delivery);
    document.getElementById("summary-total").innerText = money(total);
}

function applyCoupon() {
    const code = document.getElementById("coupon-code").value.trim().toUpperCase();
    const subtotal = calculateSubtotal();

    if(code==="DOCTOR10" && subtotal>0) {
        appliedDiscount = Math.round(subtotal*.10);
        document.getElementById("discount-row").style.display="flex";
        document.getElementById("summary-discount").innerText = "-"+money(appliedDiscount);
        showAlert(translations[currentLang]?.couponValid || "تم تطبيق خصم 10%");
    } else {
        appliedDiscount=0;
        document.getElementById("discount-row").style.display="none";
        showAlert(translations[currentLang]?.couponInvalid || "الكوبون غير صالح");
    }

    updateCartTotals();
}

function openSizeGuide() {
    document.getElementById("size-modal").style.display="flex";
}

function openStylist() {
    fillStylist("stylist-suit", productsData.filter(p=>p.type==="suit"));
    fillStylist("stylist-shirt", productsData.filter(p=>p.type==="shirt"));
    fillStylist("stylist-tie", productsData.filter(p=>p.type==="tie"));
    fillStylist("stylist-shoes", productsData.filter(p=>p.type==="shoes"));

    document.getElementById("stylist-modal").style.display="flex";
    updateStylistTotal();
}

function fillStylist(id,products) {
    const select=document.getElementById(id);
    select.innerHTML="";
    products.forEach(p=>{
        select.innerHTML += `<option value="${p.id}">${getProductTitle(p)} - ${money(p.price)}</option>`;
    });
    select.onchange=updateStylistTotal;
}

function updateStylistTotal() {
    const ids=["stylist-suit", "stylist-shirt", "stylist-tie", "stylist-shoes"];
    let total=0;

    ids.forEach(id=>{
        const value = document.getElementById(id)?.value;
        const product = productsData.find(p=>p.id==value);
        if(product) total+=Number(product.price);
    });

    const prefix = translations[currentLang]?.stylistTotal || "إجمالي الإطلالة: ";
    document.getElementById("stylist-total").innerText = `${prefix}${money(total)}`;
}

function addStyledLook() {
    const ids=["stylist-suit", "stylist-shirt", "stylist-tie", "stylist-shoes"];

    ids.forEach(id=>{
        const product = productsData.find(p=>p.id==document.getElementById(id).value);
        if(product) addToCart(product, product.sizes?.[0] || "ONE");
    });

    closeModal("stylist-modal");
    openCartModal();
}

function closeModal(id) {
    document.getElementById(id).style.display="none";
}

document.addEventListener("click", e=>{
    if(e.target.classList.contains("modal")) {
        e.target.style.display="none";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const selectEl = document.getElementById("lang-select");
    if(selectEl) selectEl.value = currentLang;

    changeLanguage(currentLang);

    const form = document.getElementById("checkout-form");
    form.addEventListener("submit", function(e){
        e.preventDefault();

        if(!cart.length) {
            showAlert(translations[currentLang]?.emptyCart || "السلة فارغة.");
            return;
        }

        const delivery = Number(document.getElementById("delivery-location").value);
        const subtotal = calculateSubtotal();
        const total = subtotal + delivery - appliedDiscount;
        let lastOrderId = parseInt(localStorage.getItem("aldoctor_last_order_id") || "1000");
        const orderId = lastOrderId + 1;
        localStorage.setItem("aldoctor_last_order_id", orderId);

        // تجميع عناصر السلة بالشكل الذي تتوقعه لوحة التحكم
        const orderItems = cart.map(item => {
            const p = productsData.find(x => x.id === item.id);
            return {
                id: item.id,
                title: p ? getProductTitle(p) : 'منتج',
                price: p ? p.price : 0,
                quantity: item.quantity,
                size: item.size
            };
        });

        const now = new Date();
        const timeStr = now.toLocaleTimeString("ar-IQ", { hour: '2-digit', minute: '2-digit' });
        const dateStr = now.toLocaleDateString("ar-IQ");

        // إنشاء كائن الطلب الجديد
        const newOrder = {
            id: orderId,
            customerName: document.getElementById("customer-name").value,
            name: document.getElementById("customer-name").value,
            phone: document.getElementById("customer-phone").value,
            address: document.getElementById("customer-address").value,
            payment: document.getElementById("payment-method").value,
            items: orderItems,
            total: total,
            status: "جديد",
            date: dateStr,
            time: timeStr // إضافة وقت الحجز
        };

        // حفظ الطلب في localStorage لوحة الإدارة
        const existingOrders = JSON.parse(localStorage.getItem("aldoctor_orders") || "[]");
        existingOrders.push(newOrder);
        localStorage.setItem("aldoctor_orders", JSON.stringify(existingOrders));

        const msgSuccess = translations[currentLang]?.orderSuccess || "تم استلام طلبك بنجاح\nرقم الطلب: #";
        const msgTotal = translations[currentLang]?.orderTotalMsg || "\nالإجمالي: ";

        showAlert(`${msgSuccess}${orderId}${msgTotal}${money(total)}`);

        cart = [];
        appliedDiscount = 0;
        updateCartBadge();
        updateOrdersBadge();
        this.reset();
        closeModal("cart-modal");
    });
});

// فتح نافذة المشتريات وتحديث محتواها
function openOrdersModal() {
    const ordersBody = document.getElementById("orders-modal-body");
    const existingOrders = JSON.parse(localStorage.getItem("aldoctor_orders") || "[]");

    if (existingOrders.length === 0) {
        ordersBody.innerHTML = `<p style="text-align: center; color: #777; padding: 20px;">لا توجد مشتريات أو طلبات مسجلة حتى الآن.</p>`;
    } else {
        let html = "";
        // عرض الطلبات من الأحدث للأقدم
        existingOrders.slice().reverse().forEach(order => {
            let itemsHtml = order.items.map(item => `
                <li style="margin-bottom: 5px; font-size: 0.95rem;">
                    🔹 ${item.title} (${item.size || ''}) × ${item.quantity} - ${money(item.price * item.quantity)}
                </li>
            `).join('');

            html += `
                <div style="background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 10px; font-weight: bold;">
                        <span>رقم الطلب: #${order.id}</span>
                        <span style="color: #2e7d32;">الحالة: ${order.status}</span>
                    </div>
                    <p style="margin-bottom: 5px;"><strong>📅 تاريخ الحجز:</strong> ${order.date} | <strong>⏰ الساعة:</strong> ${order.time || 'غير متوفر'}</p>
                    <p style="margin-bottom: 8px;"><strong>👤 الزبون:</strong> ${order.name} (${order.phone}) - ${order.address}</p>
                    <p style="margin-bottom: 5px;"><strong>🛒 محتويات الطلب:</strong></p>
                    <ul style="padding-right: 20px; margin-bottom: 10px;">
                        ${itemsHtml}
                    </ul>
                    <div style="text-align: left; font-weight: bold; font-size: 1.1rem; color: #b8860b; border-top: 1px solid #eee; padding-top: 5px;">
                        الإجمالي النهائي (مع التوصيل): ${money(order.total)}
                    </div>
                </div>
            `;
        });
        ordersBody.innerHTML = html;
    }

    document.getElementById("orders-modal").style.display = "flex";
    updateOrdersBadge();
}

// تحديث عداد شارة المشتريات
function updateOrdersBadge() {
    const existingOrders = JSON.parse(localStorage.getItem("aldoctor_orders") || "[]");
    const badge = document.getElementById("orders-badge");
    if (badge) {
        if (existingOrders.length > 0) {
            badge.style.display = "inline-block";
            badge.innerText = existingOrders.length;
        } else {
            badge.style.display = "none";
        }
    }
}

// استدعاء تحديث العداد عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    updateOrdersBadge();
});

function resetFilters() {
    document.getElementById("search-input").value="";
    document.getElementById("filter-cut").value="all";
    document.getElementById("filter-size").value="all";
    document.getElementById("filter-color").value="all";
    document.getElementById("sort-products").value="default";

    activeCategory="all";
    document.querySelectorAll(".category").forEach(x=>x.classList.remove("active"));
    document.querySelector(".category").classList.add("active");

    applyFilters();
}