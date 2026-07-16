// js/app-v2.js

const jobKeywordInput = document.getElementById("jobKeyword");
const countrySelect = document.getElementById("country");
const workplaceSelect = document.getElementById("workplace");
const jobTypeSelect = document.getElementById("jobType");
const datePostedSelect = document.getElementById("datePosted");
const resultsContainer = document.getElementById("resultsContainer");

function init() {
    // استخدام "input" بدلاً من "change" لسرعة الاستجابة أو الاكتفاء بالضغط على الزر
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

    if (!keywordValue) {
        resultsContainer.innerHTML = `<div class="no-results" style="grid-column:1/-1; text-align:center; padding:30px; background:#f8fafc; border-radius:10px; border:1px dashed #cbd5e1;">💡 اكتب المسمى الوظيفي أولاً لبدء البحث</div>`;
        return;
    }

    const providersMap = window.JobProviders || {};
    const allProviders = Object.keys(providersMap).map(key => ({ id: key, ...providersMap[key] }));

    allProviders.forEach(provider => {
        const card = document.createElement("div");
        card.className = "provider-card";
        card.innerHTML = `
            <h3>${provider.name}</h3>
            <p>بحث مخصص في ${provider.name}</p>
            <button class="search-btn">ابحث الآن</button>
        `;

        card.querySelector(".search-btn").addEventListener("click", () => {
            // الترجمة الذكية
            const translatedKeyword = window.jobKeywordsMap ? (window.jobKeywordsMap[keywordValue] || keywordValue) : keywordValue;

            const searchData = {
                keyword: translatedKeyword,   // للـ Indeed و LinkedIn
                keyword_ar: keywordValue,     // لـ Bayt.com (يفضل العربية)
                country: countrySelect.value,
                workplace: workplaceSelect.value,
                jobType: jobTypeSelect.value,
                datePosted: datePostedSelect.value
            };

            const finalURL = provider.buildUrl(searchData);
            window.open(finalURL, "_blank");
        });
        resultsContainer.appendChild(card);
    });
}
document.addEventListener("DOMContentLoaded", init);
