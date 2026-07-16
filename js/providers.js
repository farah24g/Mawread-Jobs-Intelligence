/*
Mawread Jobs Intelligence
Smart Routing & Providers Config v2.2 [Stable Fix]
*/

window.JobProviders = {
    indeed: {
        name: "Indeed",
        domains: {
            global: "https://www.indeed.com/jobs",
            egypt: "https://eg.indeed.com/jobs",
            saudi: "https://sa.indeed.com/jobs",
            uae: "https://ae.indeed.com/jobs",
            qatar: "https://qa.indeed.com/jobs",
            kuwait: "https://kw.indeed.com/jobs"
        },
        locationNames: {
            global: "",
            egypt: "Egypt",
            saudi: "Saudi Arabia",
            uae: "United Arab Emirates",
            qatar: "Qatar",
            kuwait: "Kuwait"
        },
        buildUrl: function(params) {
            const baseUrl = this.domains[params.country] || this.domains.global;
            const queryParams = [];
            
            if (params.keyword) queryParams.push(`q=${encodeURIComponent(params.keyword)}`);
            const loc = this.locationNames[params.country];
            if (loc) queryParams.push(`l=${encodeURIComponent(loc)}`);
            
            if (params.workplace === "remote") queryParams.push("sc=0kf%3Aattr(DS79X)%3B");
            if (params.datePosted === "24h") queryParams.push("fromage=1");
            else if (params.datePosted === "week") queryParams.push("fromage=7");
            
            return `${baseUrl}?${queryParams.join("&")}`;
        }
    },

    linkedin: {
        name: "LinkedIn",
        baseUrl: "https://www.linkedin.com/jobs/search",
        locationNames: {
            global: "",
            egypt: "Egypt",
            saudi: "Saudi Arabia",
            uae: "United Arab Emirates",
            qatar: "Qatar",
            kuwait: "Kuwait"
        },
        buildUrl: function(params) {
            const queryParams = [];
            if (params.keyword) queryParams.push(`keywords=${encodeURIComponent(params.keyword)}`);
            const loc = this.locationNames[params.country];
            if (loc) queryParams.push(`location=${encodeURIComponent(loc)}`);
            
            if (params.workplace === "remote") queryParams.push("f_WT=2");
            if (params.datePosted === "24h") queryParams.push("f_TPR=r86400");
            
            return `${this.baseUrl}?${queryParams.join("&")}`;
        }
    },

    bayt: {
        name: "Bayt.com",
        baseUrl: "https://www.bayt.com/ar",
        // تم تحديث المسارات الجغرافية لتطابق بنية بيت.كوم المستقرة
        countryPaths: {
            saudi: "saudi-arabia",
            uae: "uae",
            egypt: "egypt",
            qatar: "qatar",
            kuwait: "kuwait",
            global: ""
        },
        buildUrl: function(params) {
            const countrySlug = this.countryPaths[params.country] || "";
            const keyword = encodeURIComponent(params.keyword_ar || params.keyword);
            
            if (countrySlug) {
                // الميزة الأقوى: التوجه الجغرافي لبيت (SEO Path)
                // مثال: bayt.com/ar/saudi-arabia/jobs/محاسب-jobs/
                return `${this.baseUrl}/${countrySlug}/jobs/${keyword}-jobs/`;
            } else {
                // محرك البحث العام في حال عدم اختيار دولة
                return `${this.baseUrl}/search-jobs/?keyword=${keyword}`;
            }
        }
    }
};
