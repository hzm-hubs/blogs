```xml
<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>
    .classA { fill:red }
  </style>
  <defs>
    <g id="Port">
      <circle style="fill:inherit" r="10"/>
    </g>
  </defs>

  <text y="15">black</text>
  <use x="50" y="10" xlink:href="#Port" />
  <text y="35">red</text>
  <use x="50" y="30" xlink:href="#Port" class="classA"/>
  <text y="55">blue</text>
  <use x="50" y="50" xlink:href="#Port" style="fill:blue"/>
 </svg>
```