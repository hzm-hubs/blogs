### 使用属性选择器模拟正则匹配

匹配开头

```javascript
// 匹配 class 以 "btn-" 开头的元素
document.querySelectorAll('[class^="btn-"]');

// 匹配 id 以 "user*" 开头的元素
document.querySelectorAll('[id^="user*"]');
```

匹配结尾

```javascript
// 匹配 class 以 "-active" 结尾的元素
document.querySelectorAll('[class$="-active"]');

// 匹配 href 以 ".pdf" 结尾的链接
document.querySelectorAll('a[href$=".pdf"]');
```

匹配包含

```javascript
// 匹配 class 包含 "modal" 的元素
document.querySelectorAll('[class*="modal"]');

// 匹配 data 属性包含 "test" 的元素
document.querySelectorAll('[data-*="test"]');
```

### 结合 CSS 选择器实现复杂匹配

多条件组合匹配

```javascript
// 匹配 class 同时包含 "btn" 和 "primary" 的元素
document.querySelectorAll('[class*="btn"][class*="primary"]');

// 匹配以 "col-" 开头且包含 "md" 的 class
document.querySelectorAll('[class^="col-"][class*="md"]');
```

特定模式的匹配

```javascript
// 匹配 data-id 为数字的元素
document.querySelectorAll('[data-id^="0"], [data-id^="1"], [data-id^="2"]');

// 匹配 UUID 格式的 data-id（简化版）
document.querySelectorAll('[data-id^="id-"]');
```

### 使用 JavaScript 过滤（最灵活）

方法 1：Array.filter() + 正则

```javascript
// 获取所有元素后用正则过滤
const allElements = Array.from(document.querySelectorAll("*"));
const regex = /^btn-.+$/;

const matchedElements = allElements.filter((element) =>
  Array.from(element.classList).some((className) => regex.test(className))
);
```

方法 2：自定义选择器函数

```javascript
function querySelectorAllRegex(selector, attribute, regex) {
  return Array.from(document.querySelectorAll(selector)).filter((element) =>
    regex.test(element.getAttribute(attribute))
  );
}

// 使用示例：匹配 class 符合正则的元素
const elements = querySelectorAllRegex("_", "class", /^grid-col-\d+$/);
```

方法 3：扩展 Document 原型

```javascript
Document.prototype.querySelectorAllRegex = function (attribute, regex) {
  return Array.from(this.querySelectorAll("_")).filter((element) =>
    regex.test(element.getAttribute(attribute))
  );
};

// 使用示例
const elements = document.querySelectorAllRegex("class", /^card-.+$/);
```

### 实际应用场景

场景 1：匹配特定模式的类名

```javascript
// 匹配 Bootstrap 样式的列：col-md-4, col-lg-6 等
const gridColumns = Array.from(
  document.querySelectorAll('[class*="col-"]')
).filter((element) =>
  Array.from(element.classList).some((className) =>
    /^col-(xs|sm|md|lg|xl)-\d+$/.test(className)
  )
);
```

场景 2：匹配动态生成的 ID

```javascript
// 匹配动态生成的用户元素：user*123, user_456
const userElements = Array.from(
  document.querySelectorAll('[id^="user*"]')
).filter((element) => /^user\_\d+$/.test(element.id));
```

场景 3：匹配数据属性

```javascript
// 匹配符合特定格式的 data 属性
const items = Array.from(document.querySelectorAll("[data-item]")).filter(
  (element) => /^item-[A-Za-z]+-\d+$/.test(element.dataset.item)
);
```

### 性能优化建议

限制搜索范围

```javascript
// 只在特定容器内搜索
const container = document.getElementById("app");
const elements = Array.from(container.querySelectorAll("[class]")).filter(
  (element) => /^module-/.test(element.className)
);
```

使用更具体的选择器

```javascript
// 不要使用通配符 _，指定标签名
document.querySelectorAll('div[class^="btn-"]'); // 比 _[class^="btn-"] 更快
```

缓存结果

```javascript
// 避免重复查询
const cachedRegexMatch = (() => {
  const elements = Array.from(document.querySelectorAll("[class]"));
  return (regex) => elements.filter((el) => regex.test(el.className));
})();

// 使用缓存
const buttons = cachedRegexMatch(/^btn-/);
```
