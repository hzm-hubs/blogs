引入外部 js 文件

1.通过 head 的 script 属性引入
```js
// 如 rem.js 文件
export default function() {
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
```
在需要的页面引入
```js
import rem from '@/plugins/rem.js';
export default {
    head() {
        return {
            script: [
                {
                    innerHTML: rem(),
                    type: 'text/javascript'
                }
            ],
        };
    },
    …………
};
```
2. 引入在线资源
在需要的页面引入
```js
export default {
    head() {
        return {
            script: [
                {
                    src： scriptSrcUrl
                    type: 'text/javascript'
                }
            ],
        };
    },
    …………
};
```
或者在 nuxt.config.js 中整体引入
```js
module.exports = {
    mode: 'universal',
    head: {
        script: [
            {
                src： scriptSrcUrl
                type: 'text/javascript'
            }
        ]
    },

};
```
3.在文件中通过创建标签加入
```js
const targetScript = document.createElement('script');
targetScript.src = scriptSrcUrl;
targetScript.type = 'text/javascript';
document.appendChild(targetScript)
```