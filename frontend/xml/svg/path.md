### 使用 path 画贝塞尔曲线
```xml
    // 起始点（fromX,fromY）终点（toX，toY）
      <svg
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ border: '1px solid' }}
      >
        <path
          d=`M ${fromX},${fromY} C ${fromX + toX * 0.25} ${fromY * 0.8} ${
        toX * 0.75
      } ${toY * 1.2} ${toX} ${toY}`
          stroke="blue"
          fill="transparent"
        />
      </svg>
```