// js/keywords.js
window.MawreadTranslator = {
    DICTIONARY: {
        "مبرمج": "Developer",
        "مهندس": "Engineer",
        "محاسب": "Accountant",
        "تسويق": "Marketing",
        "مصمم": "Designer",
        "موارد بشرية": "Human Resources"
    },
    translate: function(keyword) {
        return this.DICTIONARY[keyword.trim()] || keyword;
    }
};
Object.freeze(window.MawreadTranslator);
