#### 修改 tooltip 的弹窗内容

1）formatter 使用表达式

模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等。 在 trigger 为 'axis' 的时候，会有多个系列的数据，此时可以通过 {a0}, {a1}, {a2} 这种后面加索引的方式表示系列的索引。 不同图表类型下的 {a}，{b}，{c}，{d} 含义不一样。 其中变量{a}, {b}, {c}, {d}在不同图表类型下代表数据含义为：

- 折线（区域）图、柱状（条形）图、K线图 : {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）

- 散点图（气泡）图 : {a}（系列名称），{b}（数据名称），{c}（数值数组）, {d}（无）

- 地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）

- 饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）

```
formatter: '{b0}: {c0}<br />{b1}: {c1}'
```

2）formatter 使用函数格式

可以根据传进来的 data 数据，截取需要的内容添加css展示

```
tooltip: {
    show: true,
    formatter: function (params: any) {
        const contentList = params?.value?.map(
        (it: any, index: number) =>
            `<div style="display:flex"><span>${params.marker}${indicatorList[index].name}</span>:<div style="padding: 0 4px;width:50px;text-align:right;color:${params.color}">${it}</div><span>分</span></div>
            `,
        )
        return `<div style="margin-bottom:10px;font-weight:500">${params.name}:</div>${contentList.join('')}`
    },
},
```