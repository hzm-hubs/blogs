
在 React 中，React.FC 和 React.forwardRef 并不是完全兼容的，它们可以结合使用，但可能需要稍作调整，特别是在使用 TypeScript 时。

原因分析

- React.FC 自动添加 children 属性：
  
  React.FC 会为组件自动附加一个 children 属性，而这种属性并不总是适用于所有组件，比如 forwardRef 的组件可能不需要 children。

- React.forwardRef 的泛型签名：

  React.forwardRef 使用了特定的泛型签名（React.ForwardRefRenderFunction），它和 React.FC 的签名在某些情况下可能会产生冲突。

### 1.解决方法

 单独使用 forwardRef
```ts
import React, { forwardRef } from 'react';

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ value, onChange }, ref) => {
    return <input ref={ref} value={value} onChange={onChange} />;
});

export default Input;
```


### 2. 手动组合 React.forwardRef 和 Props 类型
```tsx
import React, { forwardRef } from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode; // 添加 children 手动支持
}

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, children }, ref) => {
    return (
      <div>
        {children}
        <input ref={ref} value={value} onChange={onChange} />
      </div>
    );
  }
);

export default Input;
```

### 3. 使用更清晰的类型定义
直接使用 React.ForwardRefRenderFunction 显式定义类型，避免使用 React.FC。
```tsx
import React, { forwardRef, ForwardRefRenderFunction } from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { value, onChange },
  ref
) => {
  return <input ref={ref} value={value} onChange={onChange} />;
};

export default forwardRef(Input);
```

- 推荐使用 React.forwardRef 和明确的泛型定义：避免使用 React.FC，因为它附带的 children 属性可能与 forwardRef 的签名冲突。
- 如果一定要结合使用 React.FC，需要手动调整 Props 类型，确保类型定义正确。


对于现代 React + TypeScript 开发，优先直接使用 forwardRef 和 ForwardRefRenderFunction 显式定义类型。这种方式更清晰、更灵活，适合大型项目中的类型管理。