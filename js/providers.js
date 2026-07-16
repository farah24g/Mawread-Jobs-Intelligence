/*
Mawread Jobs Intelligence
Smart Routing & Providers Config v2.3 [Final Bayt Fix]
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
        // تم التعديل بناءً على طلبك ليكون النطاق نظيفاً
        baseUrl: "https://www.bayt.com", 
        // تصحيح Slugs الدول لتطابق قاعدة بيانات بيت.كوم
        countryPaths: {
            saudi: "saudi-arabia",
            uae: "uae",
            egypt: "egypt",
            qatar: "qatar",
            kuwait: "kuwait"
        },
        buildUrl: function(params) {
            const countrySlug = this.countryPaths[params.country];
            const keyword = encodeURIComponent(params.keyword_ar || params.keyword);
            
            // الصيغة الأكثر استقراراً في "بيت.كوم" للنتائج العربية المفلترة جغرافياً
            if (countrySlug) {
                // ينتج: https://www.bayt.com/ar/saudi-arabia/jobs/محاسب-jobs/
                return `${this.baseUrl}/ar/${countrySlug}/jobs/${keyword}-jobs/`;
            } else {
                // البحث العام (عالمي)
                return `${this.baseUrl}/ar/search-jobs/?keyword=${keyword}`;
            }
        }
    }
};
