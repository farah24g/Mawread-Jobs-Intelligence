// js/ui.js

window.MawreadUI = {
    renderResults: function(results) {
        const container = document.getElementById('resultsContainer');
        const section = document.getElementById('results');
        
        container.innerHTML = "";
        section.hidden = false;
        section.removeAttribute('aria-hidden');

        results.forEach(res => {
            const card = document.createElement('div');
            card.className = 'provider-card';
            card.innerHTML = `
                <h3>${res.name}</h3>
                <p>البحث المباشر المفلتر في ${res.name}</p>
                <a href="${res.url}" target="_blank" class="search-btn" style="text-decoration:none; color:white;">ابحث الآن</a>
            `;
            container.appendChild(card);
        });
        
        section.scrollIntoView({ behavior: 'smooth' });
    }
};
