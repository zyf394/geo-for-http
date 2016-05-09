//适配各种机型的rem方案，DOM元素加载结束后执行
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  recalc();
  // hack兼容某些特殊机型
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);