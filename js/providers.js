// js/providers.js

window.MawreadSearchEngine = {
    PROVIDERS: {
        linkedin: {
            name: "LinkedIn",
            baseUrl: "https://www.linkedin.com/jobs/search",
            locationNames: { global: "", egypt: "Egypt", saudi: "Saudi Arabia", uae: "United Arab Emirates" },
            buildUrl: function(p) {
                const q = encodeURIComponent(p.keyword);
                const loc = encodeURIComponent(this.locationNames[p.country] || "");
                return `${this.baseUrl}/?keywords=${q}&location=${loc}`;
            }
        },
        indeed: {
            name: "Indeed",
            domains: { global: "www.indeed.com", egypt: "eg.indeed.com", saudi: "sa.indeed.com", uae: "ae.indeed.com" },
            buildUrl: function(p) {
                const q = encodeURIComponent(p.keyword);
                const domain = this.domains[p.country] || this.domains.global;
                return `https://${domain}/jobs?q=${q}`;
            }
        },
        bayt: {
            name: "Bayt.com",
            baseUrl: "https://www.bayt.com/en",
            countryPaths: { global: "international/jobs", egypt: "egypt/jobs", saudi: "saudi-arabia/jobs", uae: "uae/jobs" },
            buildUrl: function(p) {
                const path = this.countryPaths[p.country] || this.countryPaths.global;
                const kw = encodeURIComponent(p.keyword_ar);
                return `${this.baseUrl}/${path}/${kw}-jobs/`;
            }
        }
    },

    generateResults: function(params) {
        return Object.values(this.PROVIDERS).map(provider => ({
            name: provider.name,
            url: provider.buildUrl(params)
        }));
    }
};
Object.freeze(window.MawreadSearchEngine);
