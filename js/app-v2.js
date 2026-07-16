// js/app-v2.js

const jobKeywordInput = document.getElementById("jobKeyword");
const countrySelect = document.getElementById("country");
const workplaceSelect = document.getElementById("workplace");
const jobTypeSelect = document.getElementById("jobType");
const datePostedSelect = document.getElementById("datePosted");
const resultsContainer = document.getElementById("resultsContainer");

function init() {
    if (jobKeywordInput) jobKeywordInput.addEventListener("input", renderProviders);
    if (countrySelect) countrySelect.addEventListener("change", renderProviders);
    if (workplaceSelect) workplaceSelect.addEventListener("change", renderProviders);
    if (jobTypeSelect) jobTypeSelect.addEventListener("change", renderProviders);
    if (datePostedSelect) datePostedSelect.addEventListener("change", renderProviders);

    renderProviders();
}

function renderProviders() {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = "";

    const keywordValue = jobKeywordInput ? jobKeywordInput.value.trim() : "";
    const countryValue = countrySelect ? countrySelect.value : "global";
    const workplaceValue = workplaceSelect ? workplaceSelect.value : "all";
    const jobTypeValue = jobTypeSelect ? jobTypeSelect.value : "all";
    const datePostedValue = datePostedSelect ? datePostedSelect.value : "all";

    // 1. عرض رسالة إرشادية للمستخدم الجديد إذا كان حقل البحث فارغاً
    if (!keywordValue) {
        resultsContainer.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 30px; color: #64748b; background-color: #f1f5f9; border-radius: 10px; border: 1px dashed #cbd5e1;">
                💡 اكتب المسمى الوظيفي أولاً في خانة البحث لاكتشاف الفرص المناسبة وتفعيل كروت المنصات.
            </div>
        `;
        return; // نتوقف هنا لمنع عرض الكروت بحالتها المعطلة ومساعدة المستخدم فوراً
    }

    // جلب كائن المنصات الجديد من window.JobProviders أو التراجع لكائن فارغ
    const providersMap = window.JobProviders || {};
    
    // تحويل كائن المنصات إلى مصفوفة للتمكن من فلترتها وعرضها
    const allProviders = Object.keys(providersMap).map(key => {
        return {
            id: key,
            ...providersMap[key]
        };
    });

    // فلترة المنصات بناءً على الدول المدعومة (إذا كانت المنصة تحتوي على محدد جغرافي خاص بها)
    // جميع منصاتنا الحالية (Indeed, LinkedIn, Bayt) تدعم الفلترة الجغرافية لهذه الدول، لذا سنعرضها مباشرة
    const activeProviders = allProviders;

    if (activeProviders.length === 0) {
        resultsContainer.innerHTML = `<p class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 20px;">لا توجد منصات تدعم الدولة المحددة حالياً.</p>`;
        return;
    }

    activeProviders.forEach(provider => {
        const card = document.createElement("div");
        card.className = "provider-card";

        card.innerHTML = `
            <h3>${provider.name}</h3>
            <p>البحث المباشر المفلتر في ${provider.name}</p>
            <button class="search-btn">ابحث الآن</button>
        `;

        // 2. التعديل الذكي: ربط حدث النقر بالزر (search-btn) وتجهيز معاملات التوجيه الجغرافي والترجمة الذكية
        const searchButton = card.querySelector(".search-btn");
        if (searchButton) {
            searchButton.addEventListener("click", (e) => {
                e.stopPropagation(); // منع حدوث أي Bubbling للحدث

                // البحث عن الترجمة الإنجليزية للكلمة المكتوبة، وإذا لم تكن مسجلة نستخدم الكلمة الأصلية
                const translatedKeyword = window.jobKeywordsMap ? (window.jobKeywordsMap[keywordValue] || keywordValue) : keywordValue;

                const searchData = {
                    keyword: translatedKeyword,       // الكلمة المترجمة للإنجليزية لـ Indeed و LinkedIn
                    keyword_ar: keywordValue,         // الكلمة العربية الأصلية لـ Bayt.com
                    country: countryValue,
                    workplace: workplaceValue,
                    jobType: jobTypeValue,
                    datePosted: datePostedValue
                };

                // استدعاء دالة بناء الرابط بالاسم الموحد الجديد
                const finalURL = provider.buildUrl(searchData);
                window.open(finalURL, "_blank");
            });
        }

        resultsContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", init);
