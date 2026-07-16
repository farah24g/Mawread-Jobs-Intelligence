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

    if (!keywordValue) {
        resultsContainer.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 30px; color: #64748b; background-color: #f1f5f9; border-radius: 10px; border: 1px dashed #cbd5e1;">
                💡 اكتب المسمى الوظيفي أولاً في خانة البحث لاكتشاف الفرص المناسبة وتفعيل كروت المنصات.
            </div>
        `;
        return;
    }

    const providersMap = window.JobProviders || {};
    const allProviders = Object.keys(providersMap).map(key => {
        return { id: key, ...providersMap[key] };
    });

    allProviders.forEach(provider => {
        const card = document.createElement("div");
        card.className = "provider-card";

        card.innerHTML = `
            <h3>${provider.name}</h3>
            <p>البحث المباشر المفلتر في ${provider.name}</p>
            <button class="search-btn">ابحث الآن</button>
        `;

        const searchButton = card.querySelector(".search-btn");
        if (searchButton) {
            searchButton.addEventListener("click", (e) => {
                e.stopPropagation();

                // الترجمة الذكية باستخدام القاموس
                const translatedKeyword = window.jobKeywordsMap ? (window.jobKeywordsMap[keywordValue] || keywordValue) : keywordValue;

                const searchData = {
                    keyword: translatedKeyword,       // للـ Indeed و LinkedIn
                    keyword_ar: keywordValue,         // لـ Bayt.com
                    country: countryValue,
                    workplace: workplaceValue,
                    jobType: jobTypeValue,
                    datePosted: datePostedValue
                };

                const finalURL = provider.buildUrl(searchData);
                window.open(finalURL, "_blank");
            });
        }

        resultsContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", init);
