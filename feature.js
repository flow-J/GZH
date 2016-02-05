// ==UserScript==
// @name         GZH
// @namespace    
// @version      0.1
// @description  Gif for zhihu.com as new year gift
// @author       guaxiao
// @include      *://*.zhihu.com/*
// @include      *://zhihu.com/*
// @updateURL    https://raw.githubusercontent.com/guaxiao/GZH/master/gzh.meta.js
// @downloadURL  https://raw.githubusercontent.com/guaxiao/GZH/master/feature.js
// @grant        none
// ==/UserScript==

var activeImage = function() {
    var flagClass = 'gua-image-activated';
    $('a').filter(function() {
        var href = $(this).attr('href');
        var validImage = href && (href.endsWith('.gif') || href.endsWith('.jpg') || href.endsWith('.png'));
        return validImage;
    }).filter(function() {
        var self = $(this);
        var notLoaded = !self.hasClass(flagClass);
        var uneditable = !self.data('editable');
        return notLoaded && uneditable;
    }).each(function(){
        var self = $(this);
        var href = self.attr('href');
        var url = decodeURIComponent(href.split('?target=')[1]);
        self.addClass(flagClass);
        // console.log(url);
        self.empty();
        self.append($('<img>').attr('src', url));
    });
};

var hookXHRLoad = function(callback) {
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        this.addEventListener('load', function() {
            callback();
        });
        open.apply(this, arguments);
    };
};

hookXHRLoad(function(xhr) {
    activeImage();
});
