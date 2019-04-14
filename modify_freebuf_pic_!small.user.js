// ==UserScript==
// @name         freebuf文章图片去除!small
// @icon         https://static.freebuf.com/images/favicon.ico
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove the !small appended to the end of the image in the article section of freebuf.com and let the image display the best size instead of the reduced version. You don't need to click to zoom in to view the article.
// @author       Mrxn
// @homepage     https://mrxn.net/
// @supportURL   https://github.com/Mr-xn/modify_freebuf_pic
// @license      MIT
// @run-at       document-end
// @match        https://www.freebuf.com/*
// @grant        unsafeWindow
// ==/UserScript==

//添加按钮
window.onload = function(){
    var li = document.createElement("li");
    li.id = "fuck_small";
    li.class = "fuck_small";
    var node = document.getElementById("scrollUp");
    var pafk = node.parentNode;
    pafk.appendChild(li);
    var fktxt = document.getElementById("fuck_small");
    fktxt.innerHTML = '<a href="javascript:;" onclick="fk_small();" title="去掉!small" style="background: rgba(0, 0, 0, 0.1); color: rgb(233, 25, 25); padding: 5px; font: 600 1em normal;"><span>Fuck<br>!small</span></a>';
}();
//清除图片后面带的 !small ，使图片可以按照原来大小显示，特别是一些大图片看不清，去掉后不需要
 document.getElementById('fuck_small').addEventListener( 'click',function fk_small(){
     var fb_html_content = document.getElementById('contenttxt');
     fb_html_content.innerHTML = fb_html_content.innerHTML.replace(/(!small)/gi,'');
     console.log("移除!small成功！");
     //document.getElementById('fuck_small').removeEventListener('click',function fk_small(){});
},true)
