grid 区域是否包含坐标轴的刻度标签。

1.containLabel 为 false 

grid.left、 grid.right、 grid.top、grid.bottom、 grid.width、 grid.height 决定的是由坐标轴形成的矩形的尺寸和位置。
这比较适用于多个 grid  进行对齐的场景，因为往往多个 grid 对齐的时候，是依据坐标轴来对齐的。如坐标轴内存在多个X轴，Y轴线，如果containLabel设置为true，整个绘画区域会以坐标轴标签在内的所有内容所形成的矩形的位置，可能不会达到设置的图表宽、高（多列柱状图表）

2.containLabel 为 true 

grid.left、 grid.right 、grid.top 、grid.bottom、 grid.width、 grid.height  决定的是包括了坐标轴标签在内的所有内容所形成的矩形的位置。
这常用于『防止标签溢出』的场景，标签溢出指的是，标签长度动态变化时，可能会溢出容器或者覆盖其他组件。