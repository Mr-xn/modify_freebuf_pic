// ==UserScript==
// @name         t00ls｜棱角社区｜freebuf文章图片放大
// @icon         https://static.freebuf.com/images/favicon.ico
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  放大t00ls、棱角社区、freebuf文章中默认的图片大小，方便查看；去除freebuf文章图片的!small。
// @author       Mrxn
// @homepage     https://mrxn.net/
// @supportURL   https://github.com/Mr-xn/modify_freebuf_pic
// @license      MIT
// @run-at       document-end
// @match        https://www.freebuf.com/*/*.html
// @match        https://www.t00ls.com/*
// @match        https://forum.ywhack.com/*
// @grant        unsafeWindow
// ==/UserScript==
//thanks https://userscripts-mirror.org/scripts/review/362011

//start function

(function() {
    'use strict';

    // Your code here...
    // suuport t00ls.com thread post
    if (window.location.host == 'www.t00ls.com'){
        window.addEventListener('scroll',function(){
            var t00l_content =document.getElementById("postlist");
            var t00l_imgs =t00l_content.getElementsByTagName("img");
            for (var i=0;i<t00l_imgs.length;i++){
                // imgs[i].src==imgs[i].parentNode.href;
                t00l_imgs[i].style.zoom=1;
                t00l_imgs[i].style.maxWidth="98%";
                if ( t00l_imgs[i].width > 500 && t00l_imgs[i].currentSrc.indexOf("attachment.php") !== -1){//对图片宽度小于700的（比如公司logo等）不用缩放
                    t00l_imgs[i].style.width="88%";
                }
            }
            console.log("t00ls.com文章图片缩放至88%");
        },false);
    }else if (window.location.host == 'www.freebuf.com'){
        //freebbuf
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
    } else if (window.location.host == 'forum.ywhack.com'){
        console.log("棱角社区文章图片放大");
        // 获取所有具有 class="t_msgfont" 的元素
        var elements = document.getElementsByClassName('t_msgfont');

        // 遍历元素列表
        for (var i = 0; i < elements.length; i++) {
            var imgs = elements[i].getElementsByTagName('img');

            // 遍历当前元素下的 img 元素
            for (var j = 0; j < imgs.length; j++) {
                var src = imgs[j].getAttribute('src');
                // 判断 src 属性是否包含 "attachments"
                if (src.includes('attachments')) {
                    // 包含 "attachments"，执行相关操作
                    imgs[j].style.width = '95%';
                    imgs[j].style.height = '95%';
                }
            }
        }

    }
    else{
        console.log("暂不支持");
    }
})();
