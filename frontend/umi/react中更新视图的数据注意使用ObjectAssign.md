在使用 useState 对象关联input输入框时

```js
import React, { useState } from 'react';

function App() {
    const [baseInfo, setBaseInfo] = useState({ name: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const tempValue = Object.assign(baseInfo)
        const tempValue[name] = value
        setBaseInfo(tempValue)
    };

    return (
        <div>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={baseInfo.name}
                    onChange={handleInputChange}
                />
            </label>
            <p>Current Name: {baseInfo.name}</p>
        </div>
    );
}

export default App;
```

会发现，在输入框中输入与回显值不一致即视图更新异常，这是因为 Object.assign 是浅拷贝，仅复制对象的顶层属性，如果属性值是对象类型，仍然是引用关系，而 React 判断是否需要重新渲染的依据是状态对象的引用是否变化。如果引用没有变化，即使对象内部的值发生了变化，React 也不会触发组件重新渲染。

解决方法：

### 1.每次 Object.assign，务必确保创建一个新对象

```js
const handleInputChange = (event) => {
    const { name, value } = event.target;
    const tempValue = Object.assign({}, baseInfo, {
        [name]: value
    })
    setBaseInfo(tempValue); // 引用发生变化，触发重新渲染
};
```

### 2.使用展开运算符
```js
const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBaseInfo({
        ...baseInfo, // 展开原对象
        [name]: value, // 更新特定字段
    });
};
```

### 3.深拷贝，但开销极大
```js
const handleInputChange = (event) => {
    const { name, value } = event.target;
    const tempValue = JSON.parse(JSON.stringify(baseInfo))
    const tempValue[name] = value
    setBaseInfo(tempValue)
};
```

### 4.官方的钩子函数中处理
```js
const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBaseInfo((prevBaseInfo) => ({
        ...prevBaseInfo,
        [name]: value, // 对于简单字段直接更新
    }));
};
```