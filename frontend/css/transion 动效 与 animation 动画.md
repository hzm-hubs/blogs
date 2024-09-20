transion 常用用于通过某字段(主要是布尔值)来实现执行效果，以达到可以多次切换
```css
show_className {
    margin: 0 0 12px 0;
    padding: 16px 20px 10px 20px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 4px 9px 0px rgba(38, 38, 38, 0.1);
    // 可以设置多个 语句，之间用逗号链接
    // 简单可以通过 all 实现 transition: 0.3s all ease-in;
    transition: 0.3s padding-top ease-out, 0.3s padding-bottom ease-out, 0.3s transform ease-out;
}

// 当隐藏时 要设置不可见通用样式如下，
hide_className {
    margin: 0;
    padding: 0;
    width: 0;
    height: 0;
    line-height: 0;
    border: none;
    overflow: hidden;
}

// 鼠标移入时 执行 transform 效果 放大缩小旋转等
show_className:hover {
    transform: scale(1.03);
}
```
animation 动画可以设置执行一次或多次，一次用于执行突加的元素为其添加进场效果，多次用于一直展示的如图标都抖动切换
```css
// 要添加动效的元素
figurepart {
    width: 194upx;
    height: 36upx;
    animation: infiniteTurn 2.4s linear infinite;
}

// 通过 0 — 100 设置效果
@keyframes infiniteTurn {
    0% {
        transform: translateY(-36upx);
        opacity: .9;
    }

    25% {
        transform: translateY(28upx);
    }

    50% {
        transform: translateY(91upx);
        opacity: .8;
    }

    75% {
        transform: translateY(154upx);
        opacity: 0;
    }

    100% {
        transform: translateY(154upx);
        opacity: 0;
    }

}
```