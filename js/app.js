// js/app.js

document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById("searchForm");
    const jobKeywordInput = document.getElementById("jobKeyword");

    // الوظيفة المركزية لتنفيذ البحث
    function performSearch() {
        const kw = jobKeywordInput.value.trim();
        const country = document.getElementById("country").value;
        const workplace = "all"; // يمكن توسيعه لاحقاً
        const jobType = document.getElementById("jobType").value;
        const datePosted = document.getElementById("freshness").value;

        if (!kw) {
            alert("أدخل المسمى الوظيفي أولاً");
            return;
        }

        // 1. الترجمة الذكية
        const translated = window.MawreadTranslator ? window.MawreadTranslator.translate(kw) : kw;

        // 2. تجهيز البيانات للمحرك
        const searchData = {
            keyword: translated,      // للـ Indeed و LinkedIn
            keyword_ar: kw,           // لـ Bayt.com
            country: country,
            workplace: workplace,
            jobType: jobType,
            datePosted: datePosted
        };

        // 3. توليد النتائج
        const results = window.MawreadSearchEngine.generateResults(searchData);
        
        // 4. عرض النتائج في الواجهة
        window.MawreadUI.renderResults(results);
    }

    // منع المتصفح من إضافة ? وإعادة تحميل الصفحة عند الضغط على Enter أو الزر
    if (searchForm) {
        searchForm.addEventListener("submit", function(e) {
            e.preventDefault(); 
            performSearch();
        });
    }

    // ربط أزرار البحث السريع
    document.querySelectorAll('.quick-search-buttons button').forEach(btn => {
        btn.addEventListener('click', () => {
            jobKeywordInput.value = btn.dataset.keyword;
            if(btn.dataset.country) document.getElementById('country').value = btn.dataset.country;
            performSearch();
        });
    });
});
