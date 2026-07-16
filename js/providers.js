/*
Mawread Jobs Intelligence
Smart Routing & Providers Config v2.1 [Stable Release]
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
            
            if (params.keyword) {
                queryParams.push(`q=${encodeURIComponent(params.keyword)}`);
            }
            
            const loc = this.locationNames[params.country];
            if (loc) {
                queryParams.push(`l=${encodeURIComponent(loc)}`);
            }
            
            if (params.workplace === "remote") {
                queryParams.push("sc=0kf%3Aattr(DS79X)%3B");
            }
            
            if (params.jobType === "fulltime") {
                queryParams.push("jt=fulltime");
            } else if (params.jobType === "parttime") {
                queryParams.push("jt=parttime");
            } else if (params.jobType === "contract") {
                queryParams.push("jt=contract");
            }
            
            if (params.datePosted && params.datePosted !== "all") {
                if (params.datePosted === "24h") queryParams.push("fromage=1");
                else if (params.datePosted === "3d") queryParams.push("fromage=3");
                else if (params.datePosted === "week") queryParams.push("fromage=7");
            }
            
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
            
            if (params.keyword) {
                queryParams.push(`keywords=${encodeURIComponent(params.keyword)}`);
            }
            
            const loc = this.locationNames[params.country];
            if (loc) {
                queryParams.push(`location=${encodeURIComponent(loc)}`);
            }
            
            if (params.workplace === "remote") {
                queryParams.push("f_WT=2");
            } else if (params.workplace === "onsite") {
                queryParams.push("f_WT=1");
            }
            
            if (params.jobType === "fulltime") {
                queryParams.push("f_JT=F");
            } else if (params.jobType === "parttime") {
                queryParams.push("f_JT=P");
            } else if (params.jobType === "contract") {
                queryParams.push("f_JT=C");
            }
            
            if (params.datePosted === "24h") {
                queryParams.push("f_TPR=r86400");
            } else if (params.datePosted === "week" || params.datePosted === "3d") {
                queryParams.push("f_TPR=r604800");
            }
            
            return `${this.baseUrl}?${queryParams.join("&")}`;
        }
    },

    bayt: {
        name: "Bayt.com",
        baseUrl: "https://www.bayt.com/en",
        countryPaths: {
            global: "international/jobs",
            egypt: "egypt/jobs",
            saudi: "saudi-arabia/jobs",
            uae: "uae/jobs",
            qatar: "qatar/jobs",
            kuwait: "kuwait/jobs"
        },
        buildUrl: function(params) {
            const path = this.countryPaths[params.country] || this.countryPaths.global;
            let url = `${this.baseUrl}/${path}/`;
            const queryParams = [];
            
            if (params.keyword_ar) {
                url += `${encodeURIComponent(params.keyword_ar)}-jobs/`;
            }
            
            if (params.jobType === "fulltime") {
                queryParams.push("jb_f_job_type[]=1");
            } else if (params.jobType === "parttime") {
                queryParams.push("jb_f_job_type[]=2");
            }
            
            if (params.datePosted === "24h") {
                queryParams.push("minsince=1440");
            } else if (params.datePosted === "3d") {
                queryParams.push("minsince=4320");
            } else if (params.datePosted === "week") {
                queryParams.push("minsince=10080");
            }
            
            return queryParams.length > 0 ? `${url}?${queryParams.join("&")}` : url;
        }
    }
};
