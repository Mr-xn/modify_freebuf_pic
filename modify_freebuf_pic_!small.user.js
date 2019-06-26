// ==UserScript==
// @name         freebuf文章图片去除!small
// @icon         https://static.freebuf.com/images/favicon.ico
// @namespace    http://tampermonkey.net/
// @version      0.3
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
function contentEval(source) {
    if ('function' == typeof source) {
        source = '(' + source + ')();'
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}

contentEval(function(){
var tma = 300; //运行间隔(毫秒)

//禁止文章页面使用lazyload功能,因为使用了lazyload后，在滚动加载的过程种有冲突，还没有解决，暂时在文中页面禁用！望有能力搞的朋友不吝赐教!
function nolazyload()
{
    try
    {
        var fb_content =document.getElementById("contenttxt");
        var imgs =fb_content.getElementsByTagName("img");
        // var imgs = document.images;
        if(imgs.length===0) //页面加载完一个图都没有就跳出
        {
            //alert(document.location.href+"nopics");
            return;
        }
        for(var i=0;i<imgs.length;i++)
        {
            if(pic_url_check(imgs[i].getAttribute("data-original"))&&imgs[i].src!=imgs[i].getAttribute("data-original"))
            {
                if(window.location.href.indexOf("image.3001.net")>=0)
                {
                    continue;
                }
                //imgs[i].src="";
                imgs[i].src=imgs[i].getAttribute("data-original");
            }
        }

    //alert("done"+"\n"+window.location.href);
    }catch(e)
    {
        console.log(e+"\n请将此错误信息发送至\n\nE-mail: admin@mrxn.net");
    }

    setTimeout(nolazyload,tma);
}
function pic_url_check(picx)
{
    if(!picx)return false;
    if(picx.length>10)
    {
        return true;
    }
    else
    {
        return false;
    }
}
//执行一次
    function once(fn, context) {
    var result;
    return function() {
        if(fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }
        return result;
    };
}
//在滚动加载的时候移除图片!small后缀,修改文章图片width属性为100%.
function new_img() {
    nolazyload();
    window.addEventListener('scroll',function(){
     var fb_content =document.getElementById("contenttxt");
     var imgs =fb_content.getElementsByTagName("img");
     for (var i=0;i<imgs.length;i++){
         // imgs[i].src==imgs[i].parentNode.href;
         if ( imgs[i].width > 680 ){//对图片宽度小于700的（比如公司logo等）不用缩放
         imgs[i].style.width="100%";
         }
     }
     fb_content.innerHTML = fb_content.innerHTML.replace(/(!small)/gi,'');
     console.log("移除!small成功！");
     },false);
}
once(new_img());
})();
