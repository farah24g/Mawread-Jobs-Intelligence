// js/app.js

import providers from './providers.js';
import keywords from './keywords.js';

// متغيرات الحالة العامة للتطبيق
let currentKeyword = "";
let currentCountry = "global";

// عناصر واجهة المستخدم (DOM Elements)
const searchInput = document.getElementById("search-input");
const countrySelect = document.getElementById("country-select");
const providersContainer = document.getElementById("providers-container");

/**
 * تهيئة التطبيق وإعداد الأحداث المباشرة
 */
function init() {
    // الاستماع لحدث الكتابة في حقل البحث
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentKeyword = e.target.value.trim();
            renderProviders();
        });
    }

    // الاستماع لحدث تغيير الدولة
    if (countrySelect) {
        countrySelect.addEventListener("change", (e) => {
            currentCountry = e.target.value;
            renderProviders();
        });
    }

    // العرض الأولي للمنصات عند تحميل الصفحة
    renderProviders();
}

/**
 * بناء وعرض كروت المنصات بناءً على حالة البحث والدولة المختارة
 */
function renderProviders() {
    if (!providersContainer) return;
    
    providersContainer.innerHTML = "";

    // تصفية المنصات التي تدعم الدولة المختارة حالياً
    const activeProviders = providers.filter(provider => 
        provider.supportedCountries.includes(currentCountry)
    );

    if (activeProviders.length === 0) {
        providersContainer.innerHTML = `<p class="no-results">لا توجد منصات تدعم الدولة المحددة حالياً.</p>`;
        return;
    }

    activeProviders.forEach(provider => {
        const card = document.createElement("div");
        card.className = "provider-card";
        
        // إذا لم يكتب المستخدم كلمة مفتاحية بعد، نجعل الكارت يبدو غير نشط أو نبهه للكتابة
        if (!currentKeyword) {
            card.classList.add("disabled");
        }

        card.innerHTML = `
            <img src="${provider.logo}" alt="${provider.name} Logo" class="provider-logo" onerror="this.src='assets/logos/default.svg'">
            <h3>${provider.name}</h3>
            <p>ابحث مباشرة في ${provider.name}</p>
            <button class="search-btn" ${!currentKeyword ? 'disabled' : ''}>ابحث الآن</button>
        `;

        // حدث النقر على الكارت لتشغيل منطق التوجيه الذكي
        card.addEventListener("click", () => {
            if (!currentKeyword) {
                searchInput.focus();
                return;
            }
            
            const finalSearchUrl = createProviderUrl(provider, currentKeyword, currentCountry);
            window.open(finalSearchUrl, "_blank");
        });

        providersContainer.appendChild(card);
    });
}

/**
 * دالة توليد روابط البحث المباشرة والذكية للمنصات
 * @param {Object} provider - كائن المنصة المختارة
 * @param {string} arabicKeyword - الكلمة المفتاحية المكتوبة
 * @param {string} selectedCountry - رمز الدولة المختار
 * @returns {string} - رابط البحث النهائي المباشر
 */
function createProviderUrl(provider, arabicKeyword, selectedCountry) {
    // 1. جلب المرادف الإنجليزي الذكي للوظيفة لضمان أفضل نتائج بحث
    const englishKeyword = keywords[arabicKeyword] || arabicKeyword;
    const encodedKeyword = encodeURIComponent(englishKeyword);
    
    // 2. معالجة اسم الدولة بما يتوافق مع معايير كل منصة بدقة
    let countryParam = "";
    if (selectedCountry && selectedCountry !== "global") {
        countryParam = encodeURIComponent(getLocalizedCountryName(selectedCountry, provider.id));
    }

    // 3. دمج المعاملات في قالب البحث الخاص بالمنصة المستهدفة
    let finalUrl = provider.searchTemplate
        .replace("{keyword}", encodedKeyword)
        .replace("{country}", countryParam);

    // 4. تنظيف الرابط في حالة البحث العالمي (بدون دولة محددة)
    if (!countryParam || selectedCountry === "global") {
        finalUrl = finalUrl
            .replace("&location=", "")
            .replace("&l=", "")
            .replace("&country=", "");
    }

    return finalUrl;
}

/**
 * دالة مساعدة لترجمة وتهيئة مسميات الدول للمنصات المختلفة
 * @param {string} countryCode - رمز الدولة الداخلي
 * @param {string} providerId - معرف المنصة
 * @returns {string} - الاسم المناسب للمنصة
 */
function getLocalizedCountryName(countryCode, providerId) {
    const countryNames = {
        egypt: { 
            linkedin: "Egypt", 
            indeed: "Egypt", 
            bayt: "egypt" 
        },
        saudi: { 
            linkedin: "Saudi Arabia", 
            indeed: "Saudi Arabia", 
            bayt: "saudi-arabia" 
        },
        uae: { 
            linkedin: "United Arab Emirates", 
            indeed: "United Arab Emirates", 
            bayt: "uae" 
        },
        qatar: { 
            linkedin: "Qatar", 
            indeed: "Qatar", 
            bayt: "qatar" 
        },
        kuwait: { 
            linkedin: "Kuwait", 
            indeed: "Kuwait", 
            bayt: "kuwait" 
        }
    };

    return countryNames[countryCode]?.[providerId] || countryCode;
}

// تشغيل التطبيق بمجرد جاهزية الصفحة
document.addEventListener("DOMContentLoaded", init);
