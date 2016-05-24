/**
 * Created by zhongyufei on 2016/4/26.
 */
require('../static/css/reset.less');
require('../static/css/app.less');
require('../../node_modules/zepto/zepto.min.js');//可以不用zepto，但是$el里的选择器方法需要更改为原生选择器

let appTemplate = require("../tmpl/appTemplate.html"),
    compile = require('./common/tmpl.js');

let App = {
    $el: $("#app"),//如不引入zepto，需修改为原生选择器

    appTemplate: compile(appTemplate),

    init: function () {
        let me = this;
        me.render({
            title:"SOFA",
            desc:"something something something..."
        });
        me.bindEvents();
        me.initDidiJsBridge();

    },

    bindEvents: function () {
        /*绑定事件*/
        /*注意：原生click事件在DidiJSBridge里失效*/
    },

    initDidiJsBridge: function () {
        /*初始化DidiJSBridgeReady*/
        window.bridge = {};

        document.addEventListener('DidiJSBridgeReady', function (event) {
            bridge = event.bridge;
            // Start using the bridge
            bridge.init(function (res, responseCallback) {
                if (responseCallback) {
                    responseCallback("Right back atcha!")
                }
            })
        }, false);
    },

    triggerEvent: function (type, options) {
        /*触发与NA通信的事件*/
        if(typeof options === "undefined"){
            options = {};//options为传给native的对象，必须是字典类型
        }
        if(typeof DidiJSBridge !== "undefined"){
            DidiJSBridge.callHandler(type, options, function (res){});
        }else {
            alert("DidiJSBridge未加载成功！")
        }
    },

    render: function (data) {
        let me = this;
        me.$el.html(me.appTemplate({data: data}));
    }

};

App.init();