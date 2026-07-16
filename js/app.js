// js/app.js
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("searchForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const kw = document.getElementById("jobKeyword").value.trim();
        const country = document.getElementById("country").value;

        if (!kw) return alert("أدخل المسمى الوظيفي أولاً");

        // استدعاء المترجم الذكي
        const translated = window.MawreadTranslator.translate(kw);
        
        if (window.CONFIG.debug) {
            console.log(`Original: ${kw} | Translated: ${translated}`);
        }

        // إرسال الكلمتين للمحرك
        const results = window.MawreadSearchEngine.generateResults(kw, translated, country);
        
        window.MawreadUI.renderResults(results);
    });

    // ربط أزرار البحث السريع
    document.querySelectorAll('.quick-search-buttons button').forEach(btn => {
        btn.addEventListener('click', () => {
            const keyword = btn.dataset.keyword;
            document.getElementById('jobKeyword').value = keyword;
            if(btn.dataset.country) document.getElementById('country').value = btn.dataset.country;
            form.dispatchEvent(new Event('submit'));
        });
    });
});
