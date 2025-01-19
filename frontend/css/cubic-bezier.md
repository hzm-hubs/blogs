在animation和transition两个属性中，cubic-bezier是控制变化的速度曲线，下面我们来了解下什么是cubic-bezier。
cubic-bezier称为三次贝塞尔曲线，主要是生成速度曲线的函数，规定是cubic-bezier(<x1>,<y1>,<x2>,<y2>) .

模拟地址:  http://web.chacuo.net/css3beziertool/

![alt text](./images/bezier1.png)

从上图中我们可以看到，cubic-bezier有四个点：两个默认的，即：P0(0,0)，P3(1,1)；两个控制点，即：P1(x1,y1)，P2(x2,y2)注：X轴的范围是0~1，超出cubic-bezier将失效，Y轴的取值没有规定，但是也不宜过大，最好也在0~1。我们只要调整两个控制点P1和P2的坐标，最后形成的曲线就是动画曲线。

下面以我们常用到的曲线为例：1、linear，即cubic-bezier(0,0,1,1) / cubic-bezier(1,1,0,0)，左边cubic-bezier曲线，右边浏览器动画曲线展示。下同。

![alt text](./images/bezier2.png)

2、ease，即cubic-bezier(0.25,0.1,0.25,1)。

3、ease-in，即cubic-bezier(0.42,0,1,1)。
![alt text](./images/bezier3.png)
4、ease-out，即cubic-bezier(0,0,0.58,1)。

5、ease-in-out，即这里写代码片。

6、随机示例1：cubic-bezier(0.68,-0.55,0.27,0.55)。

![alt text](./images/bezier4.png)

如：xyflow@react的工作流节点连线与俩端对应关系
```js
function generateBezierPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  curvature = 0.5,
) {
  // 控制点的偏移量，决定曲线的弯曲方向和强度
  const dx = Math.abs(x2 - x1) * curvature; // 水平方向的偏移量
  const dy = Math.abs(y2 - y1) * curvature; // 垂直方向的偏移量

  // 控制点的坐标（贝塞尔曲线需要两个控制点）
  const c1x = x1 + dx; // 起点的右偏移控制点
  const c1y = y1; // 起点保持垂直不变
  const c2x = x2 - dx; // 终点的左偏移控制点
  const c2y = y2; // 终点保持垂直不变

  // 返回路径字符串
  return `M ${x1},${y1} C ${c1x},${c1y} ${c2x},${c2y} ${x2},${y2}`;
}
```
