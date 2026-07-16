// js/providers-v2.js

window.jobProviders = [
    {
        name: "LinkedIn",
        supportedCountries: ["egypt", "saudi", "uae", "qatar", "kuwait", "global"],
        buildURL: function(data) {
            const keyword = window.jobKeywordsMap ? (window.jobKeywordsMap[data.keyword] || data.keyword) : data.keyword;
            const encodedKeyword = encodeURIComponent(keyword);
            
            const countryMap = {
                egypt: "Egypt",
                saudi: "Saudi Arabia",
                uae: "United Arab Emirates",
                qatar: "Qatar",
                kuwait: "Kuwait"
            };
            const countryParam = data.country !== "global" ? encodeURIComponent(countryMap[data.country] || "") : "";

            let workplaceParam = "";
            if (data.workplace !== "all") {
                const wtMap = { remote: "2", onsite: "1", hybrid: "3" };
                workplaceParam = `&f_WT=${wtMap[data.workplace]}`;
            }

            let jobTypeParam = "";
            if (data.jobType !== "all") {
                const jtMap = { fulltime: "F", parttime: "P" };
                jobTypeParam = `&f_JT=${jtMap[data.jobType]}`;
            }

            // فلتر الطزاجة (تاريخ النشر) مفعل ومبني مباشرة للينكد إن
            let dateParam = "";
            if (data.datePosted !== "all") {
                const dateMap = { "24h": "r86400", "3d": "r259200", "week": "r604800" };
                dateParam = `&f_TPR=${dateMap[data.datePosted]}`;
            }

            let url = `https://www.linkedin.com/jobs/search/?keywords=${encodedKeyword}`;
            if (countryParam) url += `&location=${countryParam}`;
            url += workplaceParam + jobTypeParam + dateParam;
            return url;
        }
    },
    {
        name: "Bayt.com",
        supportedCountries: ["egypt", "saudi", "uae", "qatar", "kuwait"],
        buildURL: function(data) {
            const keyword = window.jobKeywordsMap ? (window.jobKeywordsMap[data.keyword] || data.keyword) : data.keyword;
            const encodedKeyword = encodeURIComponent(keyword);
            
            const countryMap = {
                egypt: "egypt",
                saudi: "saudi-arabia",
                uae: "uae",
                qatar: "qatar",
                kuwait: "kuwait"
            };
            const countryParam = data.country !== "global" ? encodeURIComponent(countryMap[data.country] || "") : "";

            let workplaceParam = "";
            if (data.workplace === "remote") {
                workplaceParam = "&telecommute=1";
            }

            let jobTypeParam = "";
            if (data.jobType !== "all") {
                const jtMap = { fulltime: "1", parttime: "2" };
                jobTypeParam = `&employment_type=${jtMap[data.jobType]}`;
            }

            // منصة بيت لا تدعم فلتر الطزاجة البرمجي بشكل مستقر حالياً، لذا نتجاوزه بأمان
            let url = `https://www.bayt.com/en/jobs/?keyword=${encodedKeyword}`;
            if (countryParam) url += `&country=${countryParam}`;
            url += workplaceParam + jobTypeParam;
            return url;
        }
    },
    {
        name: "Indeed",
        supportedCountries: ["egypt", "saudi", "uae", "global"],
        buildURL: function(data) {
            const keyword = window.jobKeywordsMap ? (window.jobKeywordsMap[data.keyword] || data.keyword) : data.keyword;
            
            let jobTypeParam = "";
            if (data.jobType !== "all") {
                const jtMap = { fulltime: "fulltime", parttime: "parttime" };
                jobTypeParam = `&jt=${jtMap[data.jobType]}`;
            }

            const encodedKeyword = encodeURIComponent(keyword);

            const countryMap = {
                egypt: "Egypt",
                saudi: "Saudi Arabia",
                uae: "United Arab Emirates",
                qatar: "Qatar",
                kuwait: "Kuwait"
            };
            const countryParam = data.country !== "global" ? encodeURIComponent(countryMap[data.country] || "") : "";

            let workplaceParam = "";
            if (data.workplace === "remote") {
                workplaceParam = "&sc=0kf%3Asrch%28remote%29%3B";
            }

            // فلتر الطزاجة (تاريخ النشر) مفعل ومبني مباشرة لإنديد
            let dateParam = "";
            if (data.datePosted !== "all") {
                const dateMap = { "24h": "1", "3d": "3", "week": "7" };
                dateParam = `&fromage=${dateMap[data.datePosted]}`;
            }

            let url = `https://www.indeed.com/jobs?q=${encodedKeyword}`;
            if (countryParam) url += `&l=${countryParam}`;
            url += workplaceParam + jobTypeParam + dateParam;
            return url;
        }
    }
];
