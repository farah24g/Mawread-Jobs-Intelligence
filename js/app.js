// js/app.js
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("searchForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const kw = document.getElementById("jobKeyword").value;
        const country = document.getElementById("country").value;

        if (!kw) return alert("أدخل المسمى الوظيفي");

        const translated = window.MawreadTranslator.translate(kw);
        const results = window.MawreadSearchEngine.generateResults(kw, translated, country);
        
        window.MawreadUI.renderResults(results);
    });

    // البحث السريع
    document.querySelectorAll('.quick-search-buttons button').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('jobKeyword').value = btn.dataset.keyword;
            if(btn.dataset.country) document.getElementById('country').value = btn.dataset.country;
            form.dispatchEvent(new Event('submit'));
        });
    });
});
