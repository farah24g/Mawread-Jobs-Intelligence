/*
Mawread Jobs Intelligence
Application Logic v1.0
*/


document.addEventListener(
"DOMContentLoaded",
function(){



const searchButton =
document.getElementById(
"searchButton"
);



searchButton.addEventListener(
"click",
performSearch
);



loadHistory();



});





function performSearch(){


const keyword =
document.getElementById(
"jobKeyword"
).value.trim();



const country =
document.getElementById(
"country"
).value;



const freshness =
document.getElementById(
"freshness"
).value;



if(!keyword){

alert(
"أدخل المسمى الوظيفي أولاً"
);

return;

}



const expandedKeywords =
expandKeyword(keyword);



const providers =
selectProviders(country);



saveSearch(keyword);



displayResults(
expandedKeywords,
providers,
country,
freshness
);



}






function expandKeyword(keyword){


if(JobKeywords[keyword]){

return JobKeywords[keyword];

}


return [
keyword
];

}





function selectProviders(country){


let providers = [];


providers =
[
...JobProviders.global,
...JobProviders.middleEast,
...JobProviders.remote
];



return providers
.sort(
(a,b)=>
b.priority-a.priority
)
.slice(0,5);



}





function displayResults(
keywords,
providers,
country,
freshness
){



const container =
document.getElementById(
"resultsContainer"
);



container.innerHTML="";



providers.forEach(
provider=>{


const searchUrl =
createSearchUrl(
provider,
keywords,
country
);



container.innerHTML +=
`

<div class="result-card">

<span class="badge">
${provider.reason}
</span>


<h3>
${provider.name}
</h3>


<p>
${keywords.join(", ")}
</p>


<p>
${country || "كل الدول"}
</p>


<a class="cta"
href="${searchUrl}"
target="_blank">

فتح النتائج

</a>


</div>

`;



});


}







function createSearchUrl(
provider,
keywords,
country
){


return (
provider.url
+
"?q="
+
encodeURIComponent(
keywords.join(" ")
+
" "
+
country
)

);

}







function saveSearch(keyword){


let history =
JSON.parse(
localStorage.getItem(
MawreadConfig.storageKey
)
)
||
[];



history.unshift(keyword);



history =
history.slice(0,5);



localStorage.setItem(
MawreadConfig.storageKey,
JSON.stringify(history)
);



}






function loadHistory(){


const history =
JSON.parse(
localStorage.getItem(
MawreadConfig.storageKey
)
)
||
[];

console.log(
"Recent Searches:",
history
);


}

