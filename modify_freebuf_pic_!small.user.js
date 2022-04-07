// ==UserScript==
// @name         freebuf文章图片去除!small
// @icon         https://static.freebuf.com/images/favicon.ico
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Remove the !small appended to the end of the image in the article section of freebuf.com and let the image display the best size instead of the reduced version. You don't need to click to zoom in to view the article.
// @author       Mrxn
// @homepage     https://mrxn.net/
// @supportURL   https://github.com/Mr-xn/modify_freebuf_pic
// @license      MIT
// @run-at       document-end
// @include      http://
// @include      https://
// @match        https://www.freebuf.com/*/*.html
// @grant        unsafeWindow
// ==/UserScript==
//thanks https://userscripts-mirror.org/scripts/review/362011

//start function

(function() {
    'use strict';

    // Your code here...
    window.addEventListener('scroll',function(){
     var fb_content =document.getElementById("tinymce-editor");
     var imgs =fb_content.getElementsByTagName("img");
     for (var i=0;i<imgs.length;i++){
         // imgs[i].src==imgs[i].parentNode.href;
         imgs[i].style.zoom=1;
         imgs[i].style.maxWidth="98%";
         if ( imgs[i].width > 680 && imgs[i].currentSrc.indexOf("small") !== -1){//对图片宽度小于700的（比如公司logo等）不用缩放
         imgs[i].style.width="100%";
         }
     }
     fb_content.innerHTML = fb_content.innerHTML.replace(/(!small)/gi,'');
     console.log("移除!small成功！");
     },false);
    document.querySelector("#artical-detail-page > div.container > div.aside-left").style.display="none";
    document.querySelector("#artical-detail-page > div.container > div.aside-right").style.display="none";
    document.querySelector("#artical-detail-page > div.container > div.main > div.introduce").style.display="none";
    document.querySelector("#components-layout-demo-basic > section > footer").style.display="none";
    document.querySelector("#artical-detail-page > div.container > div.main").style.width="98%";
    document.querySelector("#tinymce-editor").style.maxWidth="98%";
    //document.querySelector("#tinymce-editor > div > p:nth-child(13) > img").style.maxWidth="98%";
})();
