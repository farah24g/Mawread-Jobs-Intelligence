document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", performSearch);
    }
    
    // تفعيل منع النقرات التخريبية تلقائياً لحماية أدسينس
    setupClickDefender();
});

// وظيفة الملء التلقائي والبحث السريع
function fillQuickSearch(keyword, country, nationality) {
    document.getElementById("jobKeyword").value = keyword;
    document.getElementById("country").value = country;
    document.getElementById("nationality").value = nationality;
    performSearch();
}

function performSearch() {
    const keyword = document.getElementById("jobKeyword").value.trim();
    const country = document.getElementById("country").value;
    const nationality = document.getElementById("nationality").value;
    const freshness = document.getElementById("freshness").value;

    if (!keyword) {
        alert("أدخل المسمى الوظيفي أو المهارة أولاً");
        return;
    }

    displayResults(keyword, country, nationality, freshness);
}

function displayResults(keyword, country, nationality, freshness) {
    const container = document.getElementById("resultsContainer");
    container.innerHTML = "";

    // جلب الكلمات المرادفة للتخصص لزيادة جودة البحث الذكي
    let searchTerms = [keyword];
    if (JobKeywords[keyword]) {
        searchTerms = [...searchTerms, ...JobKeywords[keyword]];
    }

    // بناء سياق استعلام البحث الذكي للوظائف
    const termQuery = searchTerms.map(t => `"${t}"`).join(" OR ");
    
    JobProviders.engines.forEach(provider => {
        // توليد رابط البحث المفلتر من خلال Google Dorking الذكي
        let finalQuery = `${provider.queryPrefix} (${termQuery})`;

        if (country) {
            finalQuery += ` "${country}"`;
        }

        // إضافة تصفية "جنسية الباحث" بطريقة احترافية في الكود
        if (nationality) {
            if (nationality === "سوداني") {
                finalQuery += ` ("سوداني" OR "سودانيين" OR "سودانية" OR "Sudanese")`;
            } else if (nationality === "مصر") {
                finalQuery += ` ("مصري" OR "مصريين" OR "مصرية" OR "Egyptian")`;
            } else {
                finalQuery += ` "${nationality}"`;
            }
        }

        // تركيب الرابط النهائي مع محرك البحث وجوجل مع تحديد الوقت
        let searchUrl = `${provider.url}?q=${encodeURIComponent(finalQuery)}`;
        
        // ربط تصفية الوقت (آخر 24 ساعة أو آخر أسبوع)
        if (freshness === "24h") {
            searchUrl += "&tbs=qdr:d"; // آخر 24 ساعة
        } else if (freshness === "week") {
            searchUrl += "&tbs=qdr:w"; // آخر أسبوع
        }

        // توليد بطاقات النتائج
        container.innerHTML += `
            <div class="result-card">
                <div>
                    <span class="badge">${provider.name}</span>
                    <h3>البحث في منصة ${provider.name.split(' ')[0]}</h3>
                    <p><strong>التخصص:</strong> ${keyword}</p>
                    <p><strong>الدولة والفلترة:</strong> ${country || "كل الدول"} ${nationality ? `(${nationality}ين)` : ""}</p>
                    <p><strong>ميزة الفلترة:</strong> ${provider.reason}</p>
                </div>
                <a class="cta" href="${searchUrl}" target="_blank">رابط النتائج المباشر ↗</a>
            </div>
        `;
    });

    // التمرير التلقائي لقسم النتائج لرؤيتها بوضوح
    document.getElementById("results").scrollIntoView({ behavior: 'smooth' });
}

// كود حماية أدسينس الذكي لمنع النقرات المتكررة والتخريبية
function setupClickDefender() {
    let clickCount = parseInt(localStorage.getItem('ad_clicks') || '0');
    let lastClickTime = parseInt(localStorage.getItem('ad_click_time') || '0');
    const currentTime = new Date().getTime();

    // إعادة تعيين العداد إذا مر أكثر من 24 ساعة
    if (currentTime - lastClickTime > 24 * 60 * 60 * 1000) {
        clickCount = 0;
        localStorage.setItem('ad_clicks', '0');
    }

    // تتبع النقرات على صناديق الإعلانات لحماية الحساب
    document.querySelectorAll('.ad-box').forEach(adBox => {
        adBox.addEventListener('click', function() {
            clickCount++;
            localStorage.setItem('ad_clicks', clickCount.toString());
            localStorage.setItem('ad_click_time', currentTime.toString());

            if (clickCount >= 3) {
                // إخفاء الإعلانات فوراً للمستخدم التخريبي
                document.querySelectorAll('.ad-box').forEach(box => {
                    box.style.display = 'none';
                });
                console.warn("تم كشف محاولة نقر متكرر لحماية إعلانات أدسينس.");
            }
        });
    });

    // إبقاء الإعلانات مخفية إذا كان هذا المتصفح قد تم حظره مسبقاً خلال الـ 24 ساعة الماضية
    if (clickCount >= 3) {
        document.querySelectorAll('.ad-box').forEach(box => {
            box.style.display = 'none';
        });
    }
}
