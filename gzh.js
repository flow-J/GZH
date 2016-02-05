var hookAjax = function() {
    var node = document.createElement("script");
    node.src = chrome.extension.getURL('feature.js');
    document.head.appendChild(node);
};

var __main = function() {
    console.log('GZH.__main');

    hookAjax();
};

$(document).ready(function() {
    __main();
});

