// js/providers.js

const providers = [
    {
        id: "linkedin",
        name: "LinkedIn",
        logo: "assets/logos/linkedin.svg",
        searchTemplate: "https://www.linkedin.com/jobs/search/?keywords={keyword}&location={country}",
        supportedCountries: ["egypt", "saudi", "uae", "qatar", "kuwait", "global"]
    },
    {
        id: "bayt",
        name: "Bayt.com",
        logo: "assets/logos/bayt.svg",
        searchTemplate: "https://www.bayt.com/en/jobs/?keyword={keyword}&country={country}",
        supportedCountries: ["egypt", "saudi", "uae", "qatar", "kuwait"]
    },
    {
        id: "indeed",
        name: "Indeed",
        logo: "assets/logos/indeed.svg",
        searchTemplate: "https://www.indeed.com/jobs?q={keyword}&l={country}",
        supportedCountries: ["egypt", "saudi", "uae", "global"]
    },
    {
        id: "glassdoor",
        name: "Glassdoor",
        logo: "assets/logos/glassdoor.svg",
        searchTemplate: "https://www.glassdoor.com/Job/jobs.htm?sc.keyword={keyword}",
        supportedCountries: ["global"]
    }
];

export default providers;
