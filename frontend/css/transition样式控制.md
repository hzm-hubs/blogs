样式控制，`默认隐藏+控制展示` 会比 `默认展示+控制关闭` 要简单一些，后者需要再写一组`样式+transition`

#### 默认隐藏+控制展示
vue内容
```vue
<div class="common-coll-main" :class="{ hide: !expand }">
    <slot></slot>
</div>
```
样式
```css
&-main {
    margin: 0 0 16px 0;
    transition: all 0.3s ease;
}

&-main.hide {
    .hide-trans();
}
```
#### 默认展示+控制关闭
vue内容
```vue
// 隐藏
<div class="tip-node-top" style="transform: translate(75px, 103px);">
</div>
// 展示
<div class="tip-node-top tip-node-visible" style="transform: translate(75px, 103px);">
</div>
```
样式
```css
.tip-node-top {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1001;
	padding: 8px;
	border-radius: 4px;
	background: rgba(0, 0, 0, 0.85);
	color: @back-color;
	box-shadow:
		0 6px 16px rgba(0, 0, 0, 0.08),
		0 3px 6px rgba(0, 0, 0, 0.12),
		0 9px 28px rgba(0, 0, 0, 0.05);
	pointer-events: none;
	opacity: 0;
	transition:
		opacity 0.2s ease-out,
		transform 0.2s ease-out;
	will-change: opacity, transform;
}
.tip-node-visible {
	opacity: 1;
}
```