// js/providers.js
window.MawreadSearchEngine = {
    // قاعدة بيانات النطاقات الجغرافية لضمان التوجيه المحلي الصحيح
    GEO_DOMAINS: {
        saudi: { indeed: "sa.indeed.com", bayt: "saudi" },
        uae: { indeed: "ae.indeed.com", bayt: "uae" },
        egypt: { indeed: "eg.indeed.com", bayt: "egypt" },
        global: { indeed: "www.indeed.com", bayt: "" }
    },

    PROVIDERS: [
        {
            name: "LinkedIn",
            priority: 100,
            buildUrl: (keyword, translated, country) => {
                const query = encodeURIComponent(translated || keyword);
                let url = `https://www.linkedin.com/jobs/search/?keywords=${query}`;
                // لينكدإن يستخدم بارامتر الموقع بدلاً من الدومين
                if (country !== 'global') {
                    const locations = { saudi: "Saudi Arabia", uae: "United Arab Emirates", egypt: "Egypt" };
                    url += `&location=${encodeURIComponent(locations[country] || country)}`;
                }
                return url;
            }
        },
        {
            name: "Indeed",
            priority: 95,
            buildUrl: (keyword, translated, country, geoMap) => {
                const query = encodeURIComponent(translated || keyword);
                // ميزة التوجه الجغرافي: اختيار الدومين المحلي (sa.indeed, eg.indeed... إلخ)
                const domain = geoMap[country]?.indeed || geoMap.global.indeed;
                return `https://${domain}/jobs?q=${query}`;
            }
        },
        {
            name: "Bayt (بيت.كوم)",
            priority: 90,
            buildUrl: (keyword, translated, country, geoMap) => {
                const query = encodeURIComponent(keyword); // الكلمة العربية أفضل لـ بيت
                const location = geoMap[country]?.bayt || "";
                // التوجه الجغرافي لـ بيت: يضيف الدولة في المسار لضمان نتائج محلية دقيقة
                const path = location ? `${location}/` : "";
                return `https://www.bayt.com/ar/${path}search-jobs/?keyword=${query}`;
            }
        }
    ],

    generateResults: function(keyword, translated, country) {
        return this.PROVIDERS.map(p => ({
            name: p.name,
            url: p.buildUrl(keyword, translated, country, this.GEO_DOMAINS),
            priority: p.priority
        })).sort((a, b) => b.priority - a.priority);
    }
};
Object.freeze(window.MawreadSearchEngine);
