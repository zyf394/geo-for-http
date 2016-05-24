/*统计埋点初始设置
* 具体使用文档：http://docs.xiaojukeji.com/pages/viewpage.action?pageId=35104776
* */
module.exports = (function(){
    window.Omega = {};
    var script = document.createElement('script');
    script.src = "//webapp.didistatic.com/static/webapp/shield/z/omega/omega/0.1.2/omega.min.js";
    script.type = "text/javascript";
    script.onload = function(){
        Omega.setProduct('sofa-tracker');
        Omega.enableDebugMode(false);
        //Omega.enableClickAutoTracker({'attr': 'data-log'});
        //Omega.enableTouchAutoTracker({'attr': 'data-log'});
    };
    document.body.appendChild(script);
})();