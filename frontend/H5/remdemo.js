export default function () {
	return `
      !function (win) {
  
          /* 设计图文档宽度 */
          var docWidth = 750;
  
          var doc = win.document,
              docEl = doc.documentElement,
              resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
  
          var clientWidth = docEl.getBoundingClientRect().width;
          var recalc = (function refreshRem () {
              /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
              docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';
  
              return refreshRem;
          })();
  
          /* 添加倍屏标识，安卓为1 */
          docEl.setAttribute('data-dpr', win.navigator.appVersion.match(/iphone/gi) ? win.devicePixelRatio : 1);
  
          if (/iP(hone|od|ad)/.test(win.navigator.userAgent)) {
              /* 添加IOS标识 */
              doc.documentElement.classList.add('ios');
              /* IOS8以上给html添加hairline样式，以便特殊处理
              if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
                  doc.documentElement.classList.add('hairline');
                  */
          }
  
          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
  
          win.rem2px = function(num) {
              var root = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5;
              return Number((num * root).toFixed(3));
          };
  
          win.px2rem = function(num) {
              var root = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5;
              return Number((num / root).toFixed(3));
          };
  
      }(window);
      `;
}
// 可作为js文件，放入项目head头里使用
