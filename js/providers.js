// js/providers.js
window.MawreadSearchEngine = {
    PROVIDERS: [
        {
            name: "LinkedIn",
            priority: 100,
            buildUrl: (q, country) => {
                let url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(q)}`;
                if (country !== 'global') url += `&location=${encodeURIComponent(country)}`;
                return url;
            }
        },
        {
            name: "Indeed",
            priority: 90,
            buildUrl: (q, country) => `https://www.indeed.com/jobs?q=${encodeURIComponent(q)}&l=${country}`
        },
        {
            name: "Bayt",
            priority: 85,
            buildUrl: (q, country) => `https://www.bayt.com/ar/search-jobs/?keyword=${encodeURIComponent(q)}`
        }
    ],
    generateResults: function(keyword, translated, country) {
        const q = translated || keyword;
        return this.PROVIDERS.map(p => ({
            name: p.name,
            url: p.buildUrl(q, country),
            priority: p.priority
        })).sort((a, b) => b.priority - a.priority);
    }
};
Object.freeze(window.MawreadSearchEngine);
