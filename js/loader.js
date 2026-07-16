// js/loader.js
window.MawreadLoader = {
    loadExternalScript: function(url, callback) {
        if (document.querySelector(`script[src="${url}"]`)) {
            if (callback) callback();
            return;
        }
        const script = document.createElement('script');
        script.async = true;
        script.src = url;
        if (callback) script.onload = callback;
        document.head.appendChild(script);
    }
};
Object.freeze(window.MawreadLoader);
