// ==UserScript==
// @name         GZH
// @namespace    
// @version      0.1
// @description  Gif for zhihu.com as new year gift
// @author       guaxiao
// @include      *://*.zhihu.com/*
// @include      *://zhihu.com/*
// @require      http://libs.cdnjs.net/jquery/2.1.1/jquery.min.js
// @updateURL    https://raw.githubusercontent.com/guaxiao/GZH/master/gzh.meta.js
// @downloadURL  https://raw.githubusercontent.com/guaxiao/GZH/master/feature.js
// @grant        none
// ==/UserScript==

var activeGif = function() {
    var flagClass = 'gua-image-activated';
    $('a').filter(function() {
        var href = $(this).attr('href');
        var validImage = href && (href.endsWith('.gif') || href.endsWith('.jpg') || href.endsWith('.png'));
        return validImage;
    }).filter(function() {
        var notLoaded = !$(this).hasClass(flagClass);
        return notLoaded;
    }).each(function(){
        var self = $(this);
        var href = self.attr('href');
        var url = decodeURIComponent(href.split('?target=')[1]);
        self.addClass(flagClass);
        // console.log(url);
        self.after($('<img>').attr('src', url));
    });
};

$(document).ajaxSuccess(function(event, xhr, settings) {
    activeGif();
});
