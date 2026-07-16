/*
Mawread Jobs Intelligence
Smart Routing & Providers Config v2.1
*/

window.JobProviders = {
    indeed: {
        name: "Indeed",
        // خريطة النطاقات المخصصة لكل دولة لكسر قيود التوجيه الجغرافي
        domains: {
            global: "https://www.indeed.com/jobs",
            egypt: "https://eg.indeed.com/jobs",
            saudi: "https://sa.indeed.com/jobs",
            uae: "https://ae.indeed.com/jobs",
            qatar: "https://qa.indeed.com/jobs",
            kuwait: "https://kw.indeed.com/jobs"
        },
        // أسماء الدول بالصيغة المفضلة لمحرك بحث Indeed
        locationNames: {
            global: "",
            egypt: "Egypt",
            saudi: "Saudi Arabia",
            uae: "United Arab Emirates",
            qatar: "Qatar",
            kuwait: "Kuwait"
        },
        buildUrl: function(params) {
            // 1. اختيار الدومين المناسب للدولة أو التراجع للدومين العالمي
            const baseUrl = this.domains[params.country] || this.domains.global;
            
            const queryParams = [];
            
            // 2. إضافة مسمى الوظيفة (المترجم تلقائياً)
            if (params.keyword) {
                queryParams.push(`q=${encodeURIComponent(params.keyword)}`);
            }
            
            // 3. إضافة الموقع الجغرافي المناسب للمنصة
            const loc = this.locationNames[params.country];
            if (loc) {
                queryParams.push(`l=${encodeURIComponent(loc)}`);
            }
            
            // 4. فلترة بيئة العمل (Remote / On-site)
            if (params.workplace === "remote") {
                queryParams.push("sc=0kf%3Aattr(DS79X)%3B"); // الكود البرمجي لفلتر Remote في Indeed
            }
            
            // 5. فلترة نوع الدوام
            if (params.jobType === "fulltime") {
                queryParams.push("jt=fulltime");
            } else if (params.jobType === "parttime") {
                queryParams.push("jt=parttime");
            } else if (params.jobType === "contract") {
                queryParams.push("jt=contract");
            }
            
            // 6. تاريخ النشر (حداثة الوظيفة)
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
            
            // فلتر بيئة العمل في لينكد إن (f_WT: 1=On-site, 2=Remote, 3=Hybrid)
            if (params.workplace === "remote") {
                queryParams.push("f_WT=2");
            } else if (params.workplace === "onsite") {
                queryParams.push("f_WT=1");
            }
            
            // فلتر نوع الدوام في لينكد إن (f_JT: F=Full-time, P=Part-time, C=Contract)
            if (params.jobType === "fulltime") {
                queryParams.push("f_JT=F");
            } else if (params.jobType === "parttime") {
                queryParams.push("f_JT=P");
            } else if (params.jobType === "contract") {
                queryParams.push("f_JT=C");
            }
            
            // فلتر تاريخ النشر في لينكد إن (r604800=أسبوع، r86400=يوم)
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
        // بيت دوت كوم يعتمد على بنية روابط مجلدات متغيرة لكل دولة
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
            
            // الكلمة المفتاحية في بيت دوت كوم (تفضل العربية في دول الشرق الأوسط)
            // سنمرر الكلمة العربية لبيت دوت كوم لأنه يفهمها بشكل ممتاز جداً في النطاقات الإقليمية
            if (params.keyword_ar) {
                url += `${encodeURIComponent(params.keyword_ar)}-jobs/`;
            }
            
            // فلاتر الدوام وبيئة العمل كمعاملات استعلام
            if (params.jobType === "fulltime") {
                queryParams.push("jb_f_job_type[]=1"); // Full Time ID on Bayt
            } else if (params.jobType === "parttime") {
                queryParams.push("jb_f_job_type[]=2"); // Part Time ID on Bayt
            }
            
            // تاريخ النشر في بيت دوت كوم
            if (params.datePosted === "24h") {
                queryParams.push("minsince=1440"); // 24 hours in minutes
            } else if (params.datePosted === "3d") {
                queryParams.push("minsince=4320");
            } else if (params.datePosted === "week") {
                queryParams.push("minsince=10080");
            }
            
            return queryParams.length > 0 ? `${url}?${queryParams.join("&")}` : url;
        }
    }
};
