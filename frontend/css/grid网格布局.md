CSS 网格布局（CSS Grid Layout）是一种强大的二维布局系统，专为处理复杂的网页布局而设计。它允许开发者将页面划分为行和列，并通过简单的 CSS 规则将元素放置到网格中。与传统的布局方式（如浮动、定位或 Flexbox）相比，网格布局更加灵活和直观。

### 1. 网格布局的核心概念

1.1 网格容器（Grid Container）

通过将元素的 display 属性设置为 grid 或 inline-grid，可以将其定义为网格容器。网格容器内的所有直接子元素会自动成为网格项（Grid Items）。

```css
.container {
  display: grid;
}
```

1.2 网格项（Grid Items）

网格容器内的直接子元素称为网格项。网格项可以放置在网格的任何位置。

1.3 网格线（Grid Lines）

网格线是划分网格的行和列的线。网格线可以是水平的（行）或垂直的（列）。网格线从 1 开始编号，也可以使用负数从末尾开始编号。

1.4 网格轨道（Grid Track）

网格轨道是两条相邻网格线之间的空间，可以是行轨道（水平）或列轨道（垂直）。

1.5 网格单元格（Grid Cell）

网格单元格是网格中两条相邻行线和两条相邻列线之间的最小单位。

1.6 网格区域（Grid Area）

网格区域是由四条网格线包围的矩形区域，可以包含一个或多个网格单元格。

### 2. 创建网格布局

2.1 定义网格的行和列

使用 grid-template-rows 和 grid-template-columns 定义网格的行和列。

```css
.container {
  display: grid;
  grid-template-rows: 100px 200px; /* 两行，高度分别为 100px 和 200px */
  grid-template-columns: 1fr 2fr; /* 两列，宽度比例为 1:2 */
}
```
fr 单位：表示剩余空间的分配比例。

repeat() 函数：用于重复定义轨道。

```css
grid-template-columns: repeat(3, 1fr); /* 3 列，每列宽度相等 */
```

自适应换行

1) repeat 函数结合 auto-fit 或 auto-fill 可以创建自适应的网格布局。


```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
repeat(auto-fit, minmax(200px, 1fr))：
```

auto-fit：自动调整列数，尽可能填充可用空间。

minmax(200px, 1fr)：每列的最小宽度为 200px，最大宽度为 1fr（等分剩余空间）。

gap: 10px：设置网格项之间的间距。

效果

当容器宽度足够时，网格项会排满一行。

当容器宽度不足时，网格项会自动换行。

2) 使用 grid-auto-flow 控制换行方向

grid-auto-flow 属性可以控制网格项的排列方式。

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: row dense; /* 按行排列，尽可能填满空白 */
  gap: 10px;
}
grid-auto-flow: row dense：
```

row：按行排列。

dense：尽可能填满空白区域。

效果

网格项会按行排列，如果某一行空间不足，会自动换行。

dense 会尝试填充空白区域，避免出现空洞。

2.2 网格间距

使用 gap 或 row-gap 和 column-gap 设置网格项之间的间距。

```css
.container {
  gap: 10px; /* 行和列的间距均为 10px */
  row-gap: 10px; /* 行间距 */
  column-gap: 20px; /* 列间距 */
}
```

### 3. 放置网格项

3.1 使用行号和列号

通过 grid-row 和 grid-column 属性将网格项放置到特定的行和列。

```css
.item {
  grid-row: 1 / 3; /* 从第 1 行到第 3 行 */
  grid-column: 2 / 4; /* 从第 2 列到第 4 列 */
}
```

可以使用 span 关键字表示跨越的行数或列数。

```css
grid-row: 1 / span 2; /* 从第 1 行开始，跨越 2 行 */
```

3.2 使用命名区域

通过 grid-template-areas 定义命名区域，并使用 grid-area 将网格项放置到指定区域。

```css
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.footer {
  grid-area: footer;
}
```

### 4. 对齐方式

4.1 网格项对齐

使用 justify-self 和 align-self 控制单个网格项在单元格内的对齐方式。

```css
.item {
  justify-self: center; /* 水平居中 */
  align-self: end; /* 垂直底部对齐 */
}
```

4.2 网格容器对齐
使用 justify-items 和 align-items 控制所有网格项在单元格内的对齐方式。

```css
.container {
  justify-items: center; /* 所有网格项水平居中 */
  align-items: end; /* 所有网格项垂直底部对齐 */
}
```

4.3 网格内容对齐

使用 justify-content 和 align-content 控制整个网格在容器内的对齐方式。

```css
.container {
  justify-content: space-between; /* 水平方向均匀分布 */
  align-content: center; /* 垂直方向居中 */
}
```

### 5. 响应式布局

网格布局非常适合响应式设计。可以通过媒体查询动态调整网格结构。

```css
.container {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 600px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 优势

二维布局：同时控制行和列，适合复杂布局。

灵活性：可以轻松实现响应式设计。

代码简洁：减少对浮动和定位的依赖。

强大的对齐功能：提供多种对齐方式，简化布局开发。