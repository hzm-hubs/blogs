## BFC

[参考链接](https://juejin.cn/post/6844903855847637005?searchId=20240416152627D1BB38D7A9B7C61AE547)

BFC 这个概念来自于 视觉格式化模型(visual formatting model) 中的 正常流(Normal flow)。

定义:浮动元素、绝对定位元素，'display' 特性为 "inline-block"，"table-cell"， "table-caption" 的元素，以及 'overflow' 不是 "visible" 的元素，会创建新的 BFC(Block formatting contexts)。
注意，是这些元素创建了块格式化上下文，它们本身不是块格式化上下文。

在BFC(Block formatting contexts)中，在包含块内一个盒子一个盒子不重叠地垂直排列，两个兄弟盒子直接的垂直距离由margin决定。浮动也是如此（虽然有可能两个盒子的距离会因为floats而变小），除非该盒子再创建一个新的BFC。

#### 简单来说，BFC就是一个独立不干扰外界也不受外界干扰的盒子, 从上往下叠罗汉

### 块级相关的计算

正常流中的块级与非替换元素

```
'margin-left' + 'border-left-width' + 'padding-left' + 'width' + 'padding-right' + 'border-right-width' + 'margin-right' = 包含块的宽度
```

上面的计算法则是基于 writing-mode: ltr 而言，如果是别的书写顺序，则按照该顺序来计算。

如果'width'不是 auto 并且'border-left-width'+'padding-left'+'width'+'padding-right'+'border-right-width'（加上'margin-left'或不是'auto'的'margin-right'）大于包含块的宽度，则对于以下规则，'margin-left'或'margin-right'的任何'auto'值都将被视为零。

如果将'width'设置为 auto ，则其他所有 auto 值将变为 0。

如果宽度设置为 auto ，则任何其他 auto 值都会变为 0 ，并且宽度会跟着所以盒子的情况铺满。

如果 'margin-left' 跟 'margin-right' 都为 auto ，则会使元素相对于包含块的边缘水平居中。

### 浮动与非替换元素

如果 'margin-left' 跟 'margin-right' 都为 auto ，则它们的具体值为 0 。

如果宽度为 auto ，则使用 shrink-to-fit 的宽度计算方式（CSS 2.2没有定义精确的算法）。

然后 shrink-to-fit 大概的计算方式则是：min(max(preferred minimum width, available width), preferred width)。

### 绝对定位与非替换元素

```
'left' + 'margin-left' + 'border-left-width' + 'padding-left' + 'width' + 'padding-right' + 'border-right-width' + 'margin-right' + 'right' = 包含块的宽度
```

如果 'left'，'width' 和 'right' 都是 'auto'，则首先将 'margin-left' 和 'margin-right' 的 'auto' 值设置为 0。

如果 'left'，'width' 和 'right' 都不是 'auto'，则按照实际值来算。

如果 'margin-left' 跟 'margin-right' 都为 0 ，则根据 'left' ，'width' 和 'right' 的值是否是 'auto' 来计算。 如果 一个方向值 ，'width' 的值是 'auto'，而 '另一个一个方向值' 不是，则宽度使用 shrink-to-fit 算法计算。如果一个值为 'auto' 而另外两个值不算，则该值使用 shrink-to-fit 来计算。

上面的计算法则是基于 writing-mode: ltr 而言，如果是别的书写顺序，则按照该顺序来计算。


