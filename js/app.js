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

    if (!keywordValue) {
        resultsContainer.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:#64748b; background:#f1f5f9; border-radius:12px; border:2px dashed #cbd5e1;">💡 اكتب مسمى الوظيفة للبدء...</div>`;
        return;
    }

    const providersMap = window.JobProviders || {};
    Object.keys(providersMap).forEach(key => {
        const provider = providersMap[key];
        const card = document.createElement("div");
        card.className = "provider-card";
        card.innerHTML = `<h3>${provider.name}</h3><p>البحث المباشر المفلتر في ${provider.name}</p><button class="search-btn">ابحث الآن</button>`;

        card.querySelector(".search-btn").addEventListener("click", () => {
            const translatedKeyword = window.jobKeywordsMap ? (window.jobKeywordsMap[keywordValue] || keywordValue) : keywordValue;
            const searchData = {
                keyword: translatedKeyword,
                keyword_ar: keywordValue,
                country: countrySelect.value,
                workplace: workplaceSelect.value,
                jobType: jobTypeSelect.value,
                datePosted: datePostedSelect.value
            };
            window.open(provider.buildUrl(searchData), "_blank");
        });
        resultsContainer.appendChild(card);
    });
}
document.addEventListener("DOMContentLoaded", init);
