// js/ui.js
window.MawreadUI = {
    renderResults: function(results) {
        const container = document.getElementById('resultsContainer');
        const section = document.getElementById('results');
        container.innerHTML = "";
        
        section.hidden = false;
        section.setAttribute('aria-hidden', 'false');

        results.forEach(res => {
            const card = document.createElement('div');
            card.className = 'provider-card';
            card.innerHTML = `
                <h3>${res.name}</h3>
                <p>اكتشف فرص العمل كـ "${res.name}" على منصة ${res.name}.</p>
                <a href="${res.url}" target="_blank" class="search-btn">فتح النتائج</a>
            `;
            container.appendChild(card);
        });
        section.scrollIntoView({ behavior: 'smooth' });
    }
};
